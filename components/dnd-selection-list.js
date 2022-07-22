import {PolymerElement, html} from '@polymer/polymer';
import "./dnd-list.js";
import "./dnd-button.js";
import "./dnd-selected-item.js";
import { loadModel } from "../util/data.js";
import { parseListData, resolveHash } from "../util/renderTable.js";
import { routeEventChannel } from '../util/routing.js';
import { util_capitalize } from '../js/utils.js';

class DndSelectionList extends PolymerElement {
  static get properties() {
    return {
      modelId: {
        type: String,
        observer: "_modelChange"
      },
      columns: {
        type: Array
      },
      enableHashRouting: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      disableScrollBack: {
        type: Boolean,
        reflectToAttribute: true,
        value: false
      },
      hasSelection: {
        type: Boolean,
        reflectToAttribute: true,
        value: false
      },
      _data: {
        type: Array
      },
      _filters: {
        type: Array
      },
      selectedItem: {
        type: Object,
        observer: '_selectedItemChange'
      },
      selectedItemKey: {
        type: String,
        observer: '_selectedItemKeyChange'
      },
      _selectedHash: {
        type: String
      },
      loading: {
        type: Boolean,
        value: true,
        observer: '_loadingChange'
      },
      characterOption: {
        type: Boolean,
        value: false
      },
      viewSideBySide: {
        type: Boolean,
        value: false
      },
      nonGlobal: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      listTitle: {
        type: String,
        value: ''
      },
      hideCharacterPopup: {
        type: Boolean,
        value: false
      },
      previewOpen: {
        type: Boolean,
        value: false,
        reflectToAttribute: false
      },
      drawerOpen: {
        type: Boolean,
        value: false
      },
    };
  }

  constructor() {
    super();
    this.viewSideBySide = !!window.localStorage.getItem("viewSideBySide");
    this.colMap =  {
      backgrounds: [
        { id: "proficiencies", label: "Proficiencies" },
        { id: "source", label: "Source" },
      ],
      bestiary: [
        { id: "monster-type", label: "Type" },
        { id: "cr", label: "CR" },
        { id: "source", label: "Source" },
      ],
      conditions: [],
      feats: [
        { id: "ability", label: "Ability" },
        { id: "source", label: "Source" },
        { id: "prerequisite", label: "Prerequisite" },
      ],
      features: [
        { id: "feature-type", label: "Type" },
        { id: "prerequisite", label: "Prerequisite" },
        { id: "source", label: "Source" },
      ],
      items: [
        { id: "item-type", label: "Type" },
        { id: "item-rarity", label: "Rarity" },
        { id: "source", label: "Source" }
      ],
      races: [
        { id: "ability", label: "Ability" },
        { id: "size", label: "Size" },
        { id: "source", label: "Source" },
      ],
      spells: [
        { id: "level", label: "Level" },
        { id: "time", label: "Time" },
        { id: "spell-meta", label: "Tag", cssClass: "hidden" },
        { id: "classes", label: "Classes", cssClass: "hidden" },
        { id: "subclasses", label: "Subclasses", cssClass: "hidden" },
        { id: "range", label: "Range" },
        { id: "school", label: "School" },
        { id: "source", label: "Source" },
      ],
      variantrules: [
        { id: "source", label: "Source" },
        { id: "rules-search", label: "Rules", cssClass: "hidden" },
      ],
    };
  }

  /**
   * Connects to route eventing channel and checks for loaded selection
   * from hash.
   */
  connectedCallback() {
    super.connectedCallback();

    routeEventChannel().addEventListener("view-change", () => {
      this.hasSelection = false;
    });
    routeEventChannel().addEventListener("preview-state-change", ({ detail : {isPreviewOpen, isDrawerOpen}}) => {
      this.previewOpen = isPreviewOpen;
      this.drawerOpen = isDrawerOpen;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    console.error("selection-list disconnected");
  }

  _loadingChange() {
    if (!this.nonGlobal) {
      this.dispatchEvent(new CustomEvent("loading-data", {
        bubbles: true,
        composed: true,
        detail: {
          loading: this.loading
        }
      }));
    }
  }

  _selectedItemChange() {
    if (this.selectedItem) {
      this.hasSelection = true;
      if (!this.disableScrollBack) {
        window.scrollTo(0, 0);
      }
    } else {
      this.hasSelection = false;
    }
  }

  _selectedItemKeyChange() {
    this.set("selectedItem", )
  }

  /**
   * Loads the JSON data for the given modelId, then checks to see if 
   * the current routed selection is present in the data.
   */
  _modelChange() {
    if (this.modelId) {
      this.columns = this.colMap[this.modelId];
      this.set("_data", undefined);
      this.set("_filters", undefined);
      this.loading = true;
      let title;
  
      switch (this.modelId) {
        case 'variantrules':
          title = 'Variant Rules';
        case 'index':
          title = undefined;
        case 'dice':
          title = 'Dice Roller';
        case 'character-builder':
          title = 'Character Sheets'
        default:
          title = this.modelId ? util_capitalize(this.modelId) : '';
      }
      this.listTitle = title;

      switch (this.modelId) {
        case "feats":
        case "races":
        case "backgrounds":
        case "items":
          this.hideCharacterPopup = false;
          break;
        default:
          this.hideCharacterPopup = true;
      }

      loadModel(this.modelId)
        .then(result => {
          const filters = parseListData(result, this.columns);
          this.set("_data", result);
          this.set("_filters", filters);
          this.loading = false;
          if (this.selectedItemKey) {
            this.set("selectedItem", resolveHash(result, [this.selectedItemKey.name, this.selectedItemKey.source]));
          }
          console.error('loadedModel', result);
        })
        .catch(e => {
          console.error("Model requested for list did not return.", e);
        });
    }
  }

  _changeView() {
    this.set('viewSideBySide', !this.viewSideBySide);
    window.localStorage.setItem("viewSideBySide", this.viewSideBySide);
  }

  _viewClass(viewSideBySide, hasSelection) {
    let clas = 'list';
    if (viewSideBySide) {
      clas += ' list--sidebyside'
    }
    if (hasSelection) {
      clas += ' list--selected'
    }
    return clas;
  }

  _closeDrawerPreview(e) {
    if (this.hasSelection) {
      this.set('selectedItem', null)
    } else {
      this.dispatchEvent(new CustomEvent("close-preview", { 
        bubbles: true,
        composed: true,
        detail: {
          loading: this.loading
        }
      }));
    }
  }

  _and(a, b) {
    return a && b;
  }

  _toHideFooter(hideCharacterPopup, nonGlobal) {
    return !nonGlobal && hideCharacterPopup;
  }

  static get template() {
    return html`
      <style include="my-styles material-styles">
        :host([has-selection]) dnd-list {
          display: none;
        }
        .list {
          display: block;
        }
        .list-wrap {
          position: relative;
          flex-grow: 1;
        }
        dnd-button {
          display: none;
        }

        .preview-close {
          font-size: 36px;
          margin-right: 20px;
          margin-left: auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .footer-bar {
          display: flex;
          align-items: center;
          position: fixed;
          width: calc(100% - 48px);
          max-width: 400px;
          height: 85px;
          bottom: 0;
          margin-left: -16px;
          background: var(--mdc-theme-surface);
          overflow: hidden;
        }
        :host([non-global]) .footer-bar {
          border-top: 1px solid var(--mdc-theme-text-divider-on-background);
        }

        @media(min-width: 921px) {
          :host(:not([non-global])) dnd-list {
            display: block !important;
          }
          :host(:not([non-global])) dnd-button {
            position: absolute;
            top: 22px;
            right: 0;
            display: block;
          }
          :host(:not([non-global]):not([preview-open])) .list--sidebyside {
            display: flex;
            flex-direction: row-reverse;
          }
          :host(:not([non-global]):not([preview-open])) .list--sidebyside.list--selected .list-wrap {
            width: 50%;
            margin-right: 32px;
          }
          :host(:not([non-global]):not([preview-open])) .list--sidebyside.list--selected dnd-selected-item {
            width: 50%;
            margin-top: -24px;
          }
          :host(:not([non-global]):not([preview-open])) .list--sidebyside dnd-button {
            transform: rotate(180deg);
            z-index: 100;
          }

          :host([non-global]) .footer-bar {
            max-width: 50vw;
          }
        }
      </style>

      <div class$="[[_viewClass(viewSideBySide, hasSelection)]]">
        <dnd-selected-item non-global$="[[nonGlobal]]" model-id="[[modelId]]" selected-item="{{selectedItem}}" all-items="[[_data]]" character-option="[[characterOption]]"></dnd-selected-item>

        <div class="list-wrap">
          <dnd-button icon="launch" class="icon-only" on-click="_changeView"></dnd-button>
          <dnd-list non-global$="[[nonGlobal]]" list-title="[[listTitle]]" selected-item="{{selectedItem}}" half-width$="[[_and(viewSideBySide, hasSelection)]]" list-items="[[_data]]" columns="[[columns]]" filters="[[_filters]]"></dnd-list>
        </div>

        <div class="footer-bar" hidden$="[[_toHideFooter(hideCharacterPopup, nonGlobal)]]" >
          <dnd-character-popup hidden$="[[hideCharacterPopup]]" small$="[[nonGlobal]]" view-id="[[modelId]]" selected-item="[[selectedItem]]"></dnd-character-popup>
          <button class="preview-close mdc-icon-button material-icons" on-click="_closeDrawerPreview">arrow_back</button> 
        </div>
      </div>
    `;
  }
}

customElements.define('dnd-selection-list', DndSelectionList);