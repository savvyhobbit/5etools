import {PolymerElement, html} from '@polymer/polymer';
import "@polymer/polymer/lib/elements/dom-repeat.js";
import '@polymer/polymer/lib/elements/dom-if.js';
import '@vaadin/polymer-legacy-adapter/template-renderer.js';
import "@vaadin/vaadin-select";
import "@vaadin/vaadin-combo-box";
import "@vaadin/vaadin-grid";
import "@vaadin/vaadin-grid/vaadin-grid-column.js";
import "@vaadin/vaadin-grid/vaadin-grid-filter";
import "@vaadin/vaadin-grid/vaadin-grid-filter-column"
import "@vaadin/vaadin-grid/vaadin-grid-sorter";
import './styles/material-styles.js';
import "./styles/my-styles.js";
import "./dnd-spinner.js";
import "./dnd-button.js";
import { clearRouteSelection, setRouteSelection, readRouteSelection, readRouteView } from '../util/routing';
import { cloneDeep, encodeForHash, isFirstCharNum } from '../js/utils.js';
import Parser from "../util/Parser.js";
import { RARITY_TYPES } from '../util/consts.js';
import { resolveHash } from '../util/renderTable.js';

class DndList extends PolymerElement {
  static get properties() {
    return {
      columns: {
        type: Array
      },
      listItems: {
        type: Array,
        observer: 'listItemsChange'
      },
      filters: {
        type: Array
      },
      isMobile: {
        type: Boolean
      },
      searchString: {
        type: String
      },
      selectedFilters: {
        type: Object,
        observer: 'selectedFiltersChange'
      },
      resultsCount: {
        type: Number
      },
      inSidebar: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      halfWidth: {
        type: Boolean,
        reflectToAttribute: true
      },
      selectedItem: {
        type: Object,
        notify: true,
        observer: 'selectedItemChange'
      },
      listTitle: {
        type: String,
        value: ''
      },
      modelId: {
        type: String,
        observer: "modelIdChange"
      }
    };
  }

  modelIdChange() {
    this._clearFilters();
  }

  listItemsChange() {
    this.resultsCount = this.listItems ? this.listItems.length : 0;
    
    if (!this.hasSetFromURL && !this.inSidebar) {
      const routeSelection = readRouteSelection();
      if (routeSelection && this.listItems) {
        this.hasSetFromURL = true;
        const selectedItem = resolveHash(this.listItems, routeSelection);
        this.set('selectedItem', selectedItem);
      }
    }
  }

  selectedFiltersChange() {
    setTimeout(() => {
      this.resultsCount = this.$.grid.__data._effectiveSize;
    }, 500);
  }

  selectedItemChange() {
    if (!this.inSidebar) {
      if (this.selectedItem) {
        const linkData = [this.selectedItem.name];
        if (this.selectedItem.source) {
          linkData.push(this.selectedItem.source);
        }
        console.error("selectedItemChange", linkData, encodeForHash(linkData));
        setRouteSelection(encodeForHash(linkData));
      } else {
        console.error("here?")
        clearRouteSelection();
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.hasSetFromURL = false;

    this.$.grid.addEventListener('active-item-changed', (e) => {
      const item = e.detail.value;
      this.$.grid.selectedItems = item ? [item] : [];
      this.set('selectedItem', item);
    });

    this.resizeHandler = (() => {
      this._checkBreakpoint();
      this._adjustHeight();
    }).bind(this);
    window.addEventListener('resize', this.resizeHandler);

    this._checkBreakpoint();
    this._adjustHeight();
    setTimeout(() => {
      this._checkBreakpoint();
      this._adjustHeight();
    }, 500);
  }
  
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.resizeHandler);
  }

  _checkBreakpoint() {
    this.isMobile = window.innerWidth <= 768;
  }

  _isPopupView() {
    switch (readRouteView()) {
      case "races":
      case "backgrounds":
      case "items":
        return true;
      default:
        return false;
    }
  }

  _adjustHeight() {
    if (window.innerWidth < 921 || this.inSidebar) {
      const top = this.$.grid.getBoundingClientRect().top;
      if (top) {
        this.$.grid.style.height = `${window.innerHeight - top - (this._isPopupView() || this.inSidebar ? 84 : 0)}px`;
      }
    } else {
      this.$.grid.style.height = `600px`;
    }
  }

  _renderPath(id) {
    return `render-${id}`;
  }

  _getPathValue(item, col) {
    return item && item[`render-${col.id}`];
  }

  _filterOptions(listItems, id) {
    let options = [{label: '', value: ''}];
    let skipSort = false;

    if (listItems && listItems.length > 0) {
      listItems = listItems.flat();
  
      // special parsing for specific filter types
      if (id === 'proficiencies') {
        skipSort = true;
        const profOptions = Object.keys(Parser.SKILL_JSON_TO_FULL)
          .map(profAbv => ({
            label: profAbv,
            value: profAbv
          }));
        options = options.concat(profOptions);
  
      } else if (id === 'ability') {
        skipSort = true;
        const abilityOptions = Object.keys(Parser.ATB_ABV_TO_FULL)
          .map(abilityAbv => ({
            label: Parser.ATB_ABV_TO_FULL[abilityAbv],
            value: abilityAbv
          }));
        options = options.concat({ label: '"Any"', value: 'any'}, abilityOptions);

      } else if (id === 'item-rarity') {
        skipSort = true;
        options = RARITY_TYPES
          .map(rarity => ({
            label: rarity,
            value: rarity
          }));
  
      } else if (id ==='source') {
        listItems.forEach(item => {
          const val = item[`render-${id}`];
          if (!options.some(option => option.value === val)) {
            options.push({
              label: Parser.sourceJsonToFullCompactPrefix(item.source) || val,
              value: val
            })
          }
        });

      } else {
        // 'general' parsing for other filter types
        listItems.forEach(item => {
          const val = item[`render-${id}`];
          if (Array.isArray(val)) {
            options = options.concat(val.map(valItem => ({label: valItem, value: valItem})));
          } else if (id === 'prerequisite' && val.includes('/')) {
            options = options.concat(val.split('/').map(i => ({label: i.trim(), value: i.trim()})));
          } else if ((id !== 'monster-type') && val.includes(',')) {
            options = options.concat(val.split(',').map(i => ({label: i.trim(), value: i.trim()})));
          } else {
            options.push({label: val, value: val});
          }
        });
      }
    }

    // De-duping options
    const uniqueVals = [];
    options = options.filter(option => {
      if (!uniqueVals.includes(option.value)) {
        uniqueVals.push(option.value);
        return true;
      }
      return false;
    });

    // Sorting options
    if (!skipSort) {
      options =  options.sort((a, b) => {
        const labelA = a.label,
          labelB = b.label,
          startsWithNumA = isFirstCharNum(labelA),
          startsWithNumB = isFirstCharNum(labelB);
        if (startsWithNumA && !startsWithNumB) {
          return 1
        }
        if (startsWithNumB && !startsWithNumA) {
          return -1
        }
        if (startsWithNumA && startsWithNumB) {
          const numA = parseFloat(labelA);
          const numB = parseFloat(labelB);
          return (numA < numB) ? -1 : (numA > numB) ? 1 : 0;
        }
        return (labelA < labelB) ? -1 : (labelA > labelB) ? 1 : 0;
      });
    }
    return options;
  }

  _filterValue(id, selectedFilters) {
    if (selectedFilters && selectedFilters[id]) {
      return selectedFilters[id];
    }
    return null;
  }

  _selectFilter(e) {
    const id = e.model ? e.model.__data.col.id : 'name';
    const newFilters = this.selectedFilters ? cloneDeep(this.selectedFilters) : {};
    newFilters[id] = e.target.value;
    this.set('selectedFilters', newFilters);
  }

  _clearFilters() {
    this.set('selectedFilters', {});
    this.$.search.value = "";
  }

  _isComboBoxFilter(colId) {
    switch (colId) {
      case 'subclasses':
      case 'source':
      case 'rules-search':
        return true;
    }
    return false;
  }

  _nameColWidth(isMobile, halfWidth, inSidebar) {
    return isMobile || halfWidth || inSidebar ? '175px' : '300px';
  }

  _flexGrow(colId) {
    switch (colId) {
      case 'cr':
      case 'source':
      case 'level':
      case 'range':
      case 'school':
      case 'time':
      case 'size':
      case 'item-rarity':
      case "prerequisite":
        return "0";
    }
    return '1';
  }

  _colWidth(index, columns, colId) {
    switch (colId) {
      case 'level':
      case 'range':
        return "135px";

      case 'cr':
      case 'source':
      case 'school':
      case 'time':
      case 'size':
        return "140px";

      case 'spell-meta':
      case 'classes':
      case 'subclasses':
      case "feature-type":
        return "250px";
    }
    if (columns.length && index === columns.length - 1) {
      return '200px';
    }
    return '175px'
  }

  _optionValue(option) {
    return option.value !== undefined ? option.value : option;
  }

  _optionLabel(option) {
    if (option.label !== undefined) {
      return option.label
    } else {
      return option;
    }
  }
  
  _optionLabelClass(option, col) {
    if (option && option.value && col && col.id === 'source') {
      return `source${option.value}`
    }
    return '';
  }

  _dataItemClass(item, col) {
    if (col && item && col.id === 'source') {
      return `source${item.source}`
    }
    return '';
  }

  _isLast(index, columns) {
    return columns.length && index === columns.length - 1
  }

  _gridTheme(modelId) {
    return `${modelId !== 'conditions' ? 'shaded' : ''} no-border no-row-borders hover`
  }

  static get template() {
    return html`
      <style include="material-styles my-styles">
        :host {
          display: block;
        }

        :host([half-width]) .search-wrap {
          width: calc(100% - 70px);
        }

        .title-text-wrap {
          display: flex;
          flex-direction: column;
        }
        .source-text {
          font-size: 17px;
          color: var(--lumo-contrast-70pct);
          height: 44px;
        }

        /* :host([in-sidebar]) .page-title {
          font-size: 24px;
          line-height: 1.5;
        }
        :host([in-sidebar]) .source-text {
          font-size: 16px;
        } */

        .search-wrap {
          margin-bottom: 20px;
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
        }
        .search-reset {
          margin-top: 16px;
        }

        .col-header-wrap {
          display: flex;
          justify-content: space-between;
          width: calc(100% - 20px);
          height: 44px;
        }

        .col-header-wrap[last-item] {
          margin-right: 40px;
        }

        .col-header-wrap--name {
          align-items: center;
          width: 100%;
        }

        .col-header-wrap--name vaadin-grid-sorter {
          position: absolute;
          right: 0px;
          top: 16px;
          padding-right: 0;
          width:100%;
        }
        .name-label {
          display: inline-flex;
          font-size: 16px;
          color: var(--lumo-secondary-text-color);
        }
        .search-count {
          color: var(--lumo-secondary-text-color);
          margin-left: auto;
          font-size: 12px;
          margin-top: 4px;
        }

        .data-item {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        vaadin-grid-sorter {
          padding: 0 8px;
        }

        vaadin-text-field {
          flex-grow: 1;
          max-width: 350px;
          margin-bottom: -4px;
          margin-right: 16px;
          padding-top: 0;
        }

        vaadin-combo-box,
        vaadin-select {
          width: 100%;
        }

        vaadin-combo-box {
          --vaadin-combo-box-overlay-width: 250px;
        }

        vaadin-grid {
          width: calc(100% + 32px);
          margin-left: -16px;
          height: calc(100 * var(--vh, 1vh) - 220px);
          --grid-shade-spread: 40px;
        }

        vaadin-grid-filter {
          display: none;
        }

        @media(min-width: 921px) {
          vaadin-grid {
            width: 100%;
            margin-left: 0;
            margin-bottom: 100px;
          }
        }
      </style>
      <div hidden$="[[selectedItem]]">
        <h1 class="page-title mdc-typography--headline2" hidden$="[[!listTitle]]">
          <div class="title-text-wrap">
            <span class="title-text">[[listTitle]]</span>
          </div>
        </h1>
      </div>

      <div class="search-wrap">
        <vaadin-text-field theme="label--secondary" id="search" on-keyup="_selectFilter" label="Search"></vaadin-text-field>
        <dnd-button class="search-reset" border on-click="_clearFilters" label="Reset"></dnd-button>
      </div>

      <vaadin-grid id="grid" items="[[listItems]]" theme$="[[_gridTheme(modelId)]]" first-col-width$="[[_nameColWidth(isMobile, halfWidth, inSidebar)]]" page-size="15">
        <vaadin-grid-column frozen flex-grow="0" width="[[_nameColWidth(isMobile, halfWidth, inSidebar)]]">
          <template class="header">
            <div class="col-header-wrap col-header-wrap--name">
              <span class="name-label">Name</span>
              <span class="search-count">[[resultsCount]] result(s)</span>
              <vaadin-grid-sorter path="name" ></vaadin-grid-sorter>
              <vaadin-grid-filter path="name" value='[[_filterValue("name", selectedFilters)]]'></vaadin-grid-filter>
            </div>
          </template>
          <template>
            <span>[[item.name]]</span>
          </template>
        </vaadin-grid-column>

        <template is="dom-repeat" items="[[columns]]" as="col">
          <vaadin-grid-column flex-grow="[[_flexGrow(col.id)]]" width="[[_colWidth(index, columns, col.id)]]" >
            <template class="header">
              <div class="col-header-wrap" last-item$="[[_isLast(index, columns)]]">
                <vaadin-grid-filter path="[[_renderPath(col.id)]]" value="[[_filterValue(col.id, selectedFilters)]]"></vaadin-grid-filter>
                    
                <template is="dom-if" if="[[!_isComboBoxFilter(col.id)]]">
                  <vaadin-select placeholder="[[col.label]]" on-change="_selectFilter" value="[[_filterValue(col.id, selectedFilters)]]">
                    <template>
                      <vaadin-list-box>
                        <template is="dom-repeat" items="[[_filterOptions(listItems, col.id)]]" as="option">
                          <vaadin-item value="[[_optionValue(option)]]">[[_optionLabel(option)]]</vaadin-item>
                        </template>
                      </vaadin-list-box>
                    </template>
                  </vaadin-select>
                </template>

                <template is="dom-if" if="[[_isComboBoxFilter(col.id)]]">
                  <vaadin-combo-box placeholder="[[col.label]]" on-change="_selectFilter" items="[[_filterOptions(listItems, col.id)]]">
                  </vaadin-combo-box>
                </template>

                <vaadin-grid-sorter path="[[_renderPath(col.id)]]" ></vaadin-grid-sorter>
              </div>
            </template>
            <template>
              <div class="data-item">
                [[_getPathValue(item, col)]]
                <!-- <span class$="[[_dataItemClass(item, col)]]">[[_getPathValue(item, col)]]</span> -->
              </div>
            </template>
          </vaadin-grid-column>
        </template>
      </vaadin-grid>
    `;
  }
}

customElements.define('dnd-list', DndList);