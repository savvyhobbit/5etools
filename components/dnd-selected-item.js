import {PolymerElement, html} from '@polymer/polymer';
import "./styles/material-styles.js";
import "./styles/my-styles.js";
import "./dnd-spinner.js";
import {initCollapseToggles} from '../js/utils.js';
import Parser from '../util/Parser.js';
import { routeEventChannel } from '../util/routing.js';

class DndSelectedItem extends PolymerElement {
  static get properties() {
    return {
      modelId: {
        type: String,
        observer: "_modelChange"
      },
      selectedItem: {
        type: Object,
        notify: true,
        observer: "_selectedItemChange"
      },
      allItems: {
        type: Array
      },
      loading: {
        type: Boolean,
        value: false,
        observer: "_loadingChange"
      },
      _modelsRenderSelection: {
        type: Function
      },
      characterOption: {
        type: Boolean,
        value: false
      },
      inSidebar: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
    };
  }

  static get observers() {
    return ["__renderSelection(_modelsRenderSelection, selectedItem)"];
  }

  connectedCallback() {
    if (!this.inSidebar) {
      routeEventChannel().addEventListener("selection-deselected", this.clearSelection.bind(this));
    }
  }

  ready() {
    super.ready();

    this._adjustHeight();
    window.addEventListener('resize', () => {
      this._adjustHeight();
    });
  }

  /**
   * Adds listeners for updating the breadcrumbs / title
   */
  _selectedItemChange() {
    if (this.selectedItem) {
      const {name, source} = this.selectedItem;
      this.selectedTitle = name;
      this.selectedSource = source;
      this.selectedSourceFull = Parser.sourceJsonToFull(source);
      this.selectedSourceAbv = Parser.sourceJsonToAbv(source);
      setTimeout(() => {
        this._adjustHeight();
      }, 200);
    } else {
      this.selectedTitle = '';
      this.selectedSource = '';
      this.selectedSourceFull = '';
      this.selectedSourceAbv = '';
    }
  }
  
  _loadingChange() {
    this.dispatchEvent(new CustomEvent("loading-render", {
      bubbles: true,
      composed: true,
      detail: {
        loading: this.loading
      }
    }));
  }

  __renderSelection() {
    if (this._modelsRenderSelection && this.selectedItem) {
      console.error('__renderSelection: Selected Item', this.selectedItem);
      this._modelsRenderSelection(this.selectedItem, this.shadowRoot, this.allItems);
      this.$.scroll.scrollTo(0, 0);
      initCollapseToggles(this.shadowRoot);
    }
  }

  _modelChange() {
    if (this.modelId) {
      this.loading = true;
      this.set("_modelsRenderSelection", undefined);

      // Dynamically load the model page's renderSelection JS
      import(/* webpackMode: "eager" */ `../js/${this.modelId}.js`)
        .then(module => {
          if (typeof module.renderSelection === "function") {
            console.error('__modelsRenderSelection: Model Renderer Set');
            this._modelsRenderSelection = module.renderSelection;
            this.loading = false;
          } else {
            console.error("Model module is missing the renderSelection export.");
          }
        })
        .catch(e => {
          console.error("Model module failed to load.", e);
        });
    }
  }

  clearSelection() {
    this.set('selectedItem', null);
  }

  _adjustHeight() {
    if (this.inSidebar) {
      const top = this.$.scroll.getBoundingClientRect().top;
      if (top) {
        this.$.scroll.style.height = `${window.innerHeight - top - 85}px`;
      }
    } else {
      this.$.scroll.style.height = null;
    }
  }

  _exists(thing) {
    return !!thing;
  }

  _mainClass(selectedItem, inSidebar) {
    let cls = selectedItem ? "main item-opened" : "main";
    cls += inSidebar ? " in-sidebar": '';
    return cls;
  }

  _selectedSourceClass(selectedSource) {
    return `asource${selectedSource}`;
  }

  _same(a, b) {
    return a === b;
  }


  static get template() {
    return html`
      <style include="material-styles my-styles">
        :host {
          display: block;
        }
        .title-text-wrap {
          display: flex;
          flex-direction: column;
        }
        .source-text {
          font-size: 17px;
          color: var(--lumo-contrast-70pct);
          height: 44px;
          line-height: 1.3;
          margin-top: 16px;
        }
        .in-sidebar .page-title {
          margin: 12px 0 0;
        }
        .in-sidebar .source-text {
          height: unset;
        }
        dnd-svg:not([hide]) + .title-text-wrap  {
          margin-left: 110px;
        }
        .main {
          max-width: 100vw;
        }
        .main.item-opened .class-container {
          display: none;
        }
        .main:not(.item-opened) .class-page--class-container {
          display: none;
        }
        .main.item-opened #listcontainer {
          display: none;
        }
        .main.item-opened .close-item {
          display: block;
        }
        .main.item-opened .rules-wrapper {
          display: none;
        }
        .main:not(.item-opened) #rulescontent {
          display: none;
        }
        .main:not(.item-opened) .selection-wrapper {
          display: none;
        }
        .main.in-sidebar .close-item {
          display: none;
        }
        .main .page-title {
          display: none;
        }
        .main.item-opened .page-title {
          display: block;
        }
        
        .close-item {
          position: fixed;
          height: 60px;
          width: 60px;
          font-size: 44px;
          display: none;
          right: 0;
          top: -4px;
          z-index: 4;
          background: var(--mdc-theme-header);
        }
        .main.item-opened:not(.in-sidebar) {
          margin-bottom: 120px;
        }
        .main.item-opened.in-sidebar .page-title {
          height: 115px;
          display: flex;
          padding: 12px;
          width: calc(100% + 4px);
          margin-left: -13px;
          border-bottom: 1px solid var(--mdc-theme-text-divider-on-background);
          align-items: center;
        }
        .in-sidebar #scroll {
          overflow: scroll;
          height: calc(100 * var(--vh) - 246px);
        }
        @media(min-width: 921px) {
          .main.item-opened {
            padding-bottom: 0;
          }
        }
      </style>

      <div class$="[[_mainClass(selectedItem, inSidebar)]]">
        <button class="mdc-icon-button close-item material-icons mdc-theme--on-header" on-click="clearSelection">close</button>
        <h1 class="page-title mdc-typography--headline2" hidden$="[[!selectedItem]]">
          <dnd-svg id$="[[selectedTitle]]"></dnd-svg>
          <div class="title-text-wrap">
            <span class="title-text">[[selectedTitle]]</span>
            <span class="source-text"><span class$="[[_selectedSourceClass(selectedSource)]]">[[selectedSourceFull]]<span hidden hiddens$="[[_same(selectedSourceFull, selectedSourceAbv)]]"> ([[selectedSourceAbv]])</span><span></span>
          </div>
        </h1>
        <div id="scroll" class="selection-wrapper"></div>
      </div>
    `;
  }
}

customElements.define('dnd-selected-item', DndSelectedItem);