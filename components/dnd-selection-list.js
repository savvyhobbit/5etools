import {PolymerElement, html} from '@polymer/polymer';
import "./dnd-list.js";
import "./dnd-selected-item.js";
import {loadModel} from "../util/data.js";
import { parseListData, resolveHash } from "../util/renderTable.js";
import { readRouteSelection, routeEventChannel, clearRouteSelection } from '../util/routing.js';

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
        type: Object
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
      }
    };
  }

  _loadingChange() {
    this.dispatchEvent(new CustomEvent("loading-data", {
      bubbles: true,
      composed: true,
      detail: {
        loading: this.loading
      }
    }));
  }

  /**
   * Connects to route eventing channel and checks for loaded selection
   * from hash.
   */
  connectedCallback() {
    super.connectedCallback();

    this.selectionEventHandler = (e) => {
      this._checkHashForSelection(e.detail.selection);
    };

    this.deselectionEventHandler = () => {
      this._selectedItem = undefined;
      this.hasSelection = false;
    };

    // In case the list data has already been loaded, check if the hash is there
    this._checkHashForSelection();

    routeEventChannel().addEventListener("selection-change", this.selectionEventHandler);
    routeEventChannel().addEventListener("selection-deselected", this.deselectionEventHandler);
    routeEventChannel().addEventListener("view-change", this.deselectionEventHandler);
  }

  /**
   * Disconnects from route eventing channel.
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    routeEventChannel().removeEventListener("selection-change", this.selectionEventHandler);
    routeEventChannel().removeEventListener("selection-deselected", this.deselectionEventHandler);
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

      loadModel(this.modelId)
        .then(result => {
          const filters = parseListData(result, this.columns);
          this.set("_data", result);
          this.set("_filters", filters);
          this._checkHashForSelection();
          this.loading = false;
        })
        .catch(e => {
          console.error("Model requested for list did not return.", e);
        });
    }
  }

  /**
   * Looks through the loaded Data array for an item that matches the 
   * selection string.
   * @param {String} [newSelection] Optional. If selection isn't provided,
   * checks the current hash for the second pathed variable.
   */
  _checkHashForSelection(newSelection) {
    let hashSelection = newSelection;
    if (!hashSelection) {
      hashSelection = readRouteSelection();
    }
    if (hashSelection && this.enableHashRouting && Array.isArray(this._data)) {
      const itemFromHash = resolveHash(this._data, hashSelection);
      if (itemFromHash) {
        this.set("_selectedItem", itemFromHash);
        this.hasSelection = true;
        if (!this.disableScrollBack) {
          window.scrollTo(0, 0);
        }
        this.dispatchEvent(new CustomEvent("title-change", {
          bubbles: true,
          composed: true,
          detail: itemFromHash
        }));
      } else {
        clearRouteSelection(true);
      }
    }
  }

  static get template() {
    return html`
      <style>
        :host([has-selection]) dnd-list {
          display: none;
        }
        @media(min-width: 921px) {
          dnd-list {
            display: block !important;
          }
        }
      </style>
      <dnd-selected-item model-id="[[modelId]]" selected-item="[[_selectedItem]]" all-items="[[_data]]" character-option="[[characterOption]]"></dnd-selected-item>
      <dnd-list list-items="[[_data]]" columns="[[columns]]" filters="[[_filters]]"></dnd-list>
    `;
  }
}

customElements.define('dnd-selection-list', DndSelectionList);