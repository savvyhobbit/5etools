import { PolymerElement, html } from "@polymer/polymer";
import { encodeForHash } from "../js/utils";
import { loadModel } from "../util/data";
import { getEditModeChannel, isEditMode } from "../util/editMode";

class DndAsiSelect extends PolymerElement {
  
  static get properties() {
    return {
      checked: {
        type: Boolean,
        value: false
      },
      selectedFeat: {
        type: Object
      },
      selectedAbilityOne: {
        type: String
      },
      selectedAbilityTwo: {
        type: String
      },
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      changeCallback: {
        type: Function
      }
    };
  }

  constructor() {
    super();
    this.attributeOptions = [
      "STR",
      "DEX",
      "CON",
      "INT",
      "WIS",
      "CHA"
    ]
  }

  async connectedCallback() {
    super.connectedCallback();

    this.switchChangeHandler = (e) => {
      this.checked = e.detail.checked;
      this._changeHandler()();
    }
    this.addEventListener("switch-change", this.switchChangeHandler);

    this.editModeHandler = (e) => {
        this.disabled = !e.detail.isEditMode;
    }
    getEditModeChannel().addEventListener('editModeChange', this.editModeHandler);
    this.disabled = !isEditMode();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("switch-change", this.switchChangeHandler);
    getEditModeChannel().removeEventListener('editModeChange', this.editModeHandler);
  }

  _changeHandler(key) {
    return (async (val) => {
      switch (key) {
        case 'a1':
          this.selectedAbilityOne = val;
          break;

        case 'a2':
          this.selectedAbilityTwo = val;
          break;

        case 'feat':
          if (!this.featOptions) {
            this.featOptions = await loadModel('feats');
          }
          this.selectedFeat = this.featOptions.find(feat => feat.name === val.name && feat.source === val.source);
          break;
      
        default:
          break;
      }
      this.changeCallback({
        checked: this.checked,
        selectedFeat: { name: this.selectedFeat.name, source: this.selectedFeat.source },
        selectedAbilityOne: this.selectedAbilityOne,
        selectedAbilityTwo: this.selectedAbilityTwo,
      });
    })
  }

  _disableLabel(checked) {
    return checked ? 'Feat' : 'ASI';
  }

  _getFeatLink(feat) {
    let linkData = [feat.name];
    if (feat.source) {
      linkData.push(feat.source);
    }
    let dataLink = encodeForHash(linkData);
    return dataLink ? `#/feats/${dataLink}` : '#/feats';
  }

  _linkClick() {
    this.dispatchEvent(new CustomEvent("open-drawer", {
      bubbles: true,
      composed: true,
      detail: {
        selectedItem: this.selectedFeat,
        viewId: 'feats'
      }
    }));
  }

  static get template() {
    return html`
      <style include="material-styles">
        :host {
          display: flex;
          flex-direction: column;
          max-width: 192px;
        }
        [hidden] {
          display: none !important;
        }
        .abilities {
          display: flex;
          flex-wrap: wrap;
        }
        .abilities dnd-select-add {
          width: calc(50% - 8px);
        }
        dnd-select-add + dnd-select-add {
          margin-left: 16px;
        }
        dnd-select-add {
          display: block;
        }
        .disable-label {
          font-size: 14px;
          font-weight: 500;
          color: var(--mdc-theme-primary);
        }
        .reference-link {
          color: var(--lumo-body-text-color);
        }
        .reference-link:hover {
          color: var(--mdc-theme-secondary);
        }
        .feat-pick-wrap {
          display: flex;
        }
      </style>

      <div class="disable-label" hidden$="[[!disabled]]">[[_disableLabel(checked)]]</div>
      <dnd-switch initial-value=[[checked]] label="ASI" secondary-label="Feat" hidden$="[[disabled]]"></dnd-switch>
      <div class="abilities" hidden$=[[checked]]>
        <dnd-select-add add-callback="[[_changeHandler('a1')]]" value="[[selectedAbilityOne]]" options="[[attributeOptions]]" placeholder="<ASI>" disabled$="[[disabled]]"></dnd-select-add>
        <dnd-select-add add-callback="[[_changeHandler('a2')]]" value="[[selectedAbilityTwo]]" options="[[attributeOptions]]" placeholder="<ASI>" disabled$="[[disabled]]"></dnd-select-add>
      </div>
      <div class="feat-pick-wrap" hidden$=[[!checked]]>
        <dnd-select-add add-callback="[[_changeHandler('feat')]]" model="feats" value="[[selectedFeat]]" placeholder="<Choose Feat>" disabled$="[[disabled]]"></dnd-select-add>
        <button class="reference-link mdc-icon-button material-icons" on-click="_linkClick" hidden$="[[disabled]]">logout</button>
      </div>
    `;
  }
}

customElements.define("dnd-asi-select", DndAsiSelect);