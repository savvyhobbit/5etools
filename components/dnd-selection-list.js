import {PolymerElement, html} from '@polymer/polymer';
import "./dnd-list.js";
import "./dnd-button.js";
import "./dnd-selected-item.js";
import { loadModel } from "../util/data.js";
import { parseListData } from "../util/renderTable.js";
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
      _selectedItem: {
        type: Object,
        observer: '_selectedItemChange'
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
      }
    };
  }

  constructor() {
    super();
    this.viewSideBySide = !!window.localStorage.getItem("viewSideBySide");
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
    this.addEventListener("asdf", (e) => {
      console.error('asdf', e);
    } )
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
    console.error('_selectedItemChange', this._selectedItem)
    if (this._selectedItem) {
      this.hasSelection = true;
      if (!this.disableScrollBack) {
        window.scrollTo(0, 0);
      }
    } else {
      this.hasSelection = false;
    }
  }

  /**
   * Loads the JSON data for the given modelId, then checks to see if 
   * the current routed selection is present in the data.
   */
  _modelChange() {
    if (this.modelId) {
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
          console.error('loadedModel', filters);
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
    console.error('_closeDrawerPreview click');
    if (this.hasSelection) {
      this.set('_selectedItem', null)
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
          :host(:not([non-global])) .list--sidebyside {
            display: flex;
            flex-direction: row;
          }
          :host(:not([non-global])) .list--sidebyside.list--selected .list-wrap {
            width: 50%;
            margin-left: 32px;
          }
          :host(:not([non-global])) .list--sidebyside.list--selected dnd-selected-item {
            width: 50%;
            margin-top: -24px;
          }

          :host(:not([non-global])) .list--sidebyside dnd-button {
            transform: rotate(180deg);
          }
          :host([non-global]) .footer-bar {
            max-width: 670px;
          }
        }
      </style>

      <div class$="[[_viewClass(viewSideBySide, hasSelection)]]">
        <dnd-selected-item non-global$="[[nonGlobal]]" model-id="[[modelId]]" selected-item="{{_selectedItem}}" all-items="[[_data]]" character-option="[[characterOption]]"></dnd-selected-item>

        <div class="list-wrap">
          <dnd-button icon="launch" class="icon-only" on-click="_changeView"></dnd-button>
          <dnd-list non-global$="[[nonGlobal]]" list-title="[[listTitle]]" selected-item="{{_selectedItem}}" half-width$="[[_and(viewSideBySide, hasSelection)]]" list-items="[[_data]]" columns="[[columns]]" filters="[[_filters]]"></dnd-list>
        </div>

        <div class="footer-bar" hidden$="[[_toHideFooter(hideCharacterPopup, nonGlobal)]]" >
          <dnd-character-popup hidden$="[[hideCharacterPopup]]" small$="[[nonGlobal]]" view-id="[[modelId]]" selected-item="[[_selectedItem]]"></dnd-character-popup>
          <button class="preview-close mdc-icon-button material-icons" on-click="_closeDrawerPreview">arrow_back</button> 
        </div>
      </div>
    `;
  }
}

customElements.define('dnd-selection-list', DndSelectionList);