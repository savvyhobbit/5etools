import { PolymerElement, html } from "@polymer/polymer";
import { encodeForHash } from "../js/utils";
import { getSelectedCharacter, getASIForLevel, getCharacterChannel, setASI, getFeatReference, setFeatAttributeSelection } from "../util/charBuilder";

class DndAsiSelect extends PolymerElement {
  
  static get properties() {
    return {
      levelIndex: {
        type: Number
      },
      checked: {
        type: Boolean,
        value: false
      },
      selectedFeat: {
        type: Object
      },
      selectedAbility1: {
        type: String,
        value: ''
      },
      selectedAbility2: {
        type: String,
        value: ''
      },
      featHasAttributeChoice: {
        type: Boolean,
        value: false
      },
      featAttributeSelection: {
        type: String,
        value: ''
      },
      featAttributeOptions: {
        type: Array,
        value: []
      },
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
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

  connectedCallback() {
    super.connectedCallback();

    this.switchChangeHandler = (e) => {
      this.checked = e.detail.checked;
      this._genASICallback()();
    }
    this.addEventListener("switch-change", this.switchChangeHandler);

    this.characterChangeHandler = (e) => {
      let character = e.detail.character;
      this.updateFromCharacter(character);
    };
    
    this.updateFromCharacter(getSelectedCharacter());
    getCharacterChannel().addEventListener("character-selected", this.characterChangeHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("switch-change", this.switchChangeHandler);
    getCharacterChannel().removeEventListener("character-selected", this.characterChangeHandler);
  }

  async updateFromCharacter(character) {
    const { asi, index } = await getASIForLevel(this.levelIndex, character);

    this.featHasAttributeChoice = false;
    if (asi) {
      this.selectedFeat = asi.feat;
      this.selectedAbility1 = asi.ability1;
      this.selectedAbility2 = asi.ability2;
      this.checked = asi.isFeat;

      if (asi.isFeat && asi.feat && asi.feat.name && asi.feat.source) {
        const featId = `${asi.feat.name}_${asi.feat.source}`;
        const featRef = await getFeatReference(featId);

        if (featRef.ability && featRef.ability.length && featRef.ability[0].choose) {
          this.featHasAttributeChoice = true;
          this.featAttributeOptions = featRef.ability[0].choose.from.map(i => { return i.toUpperCase() });
          this.featAttributeSelection = character.featAttributeSelections && character.featAttributeSelections[featId] 
            ? character.featAttributeSelections[featId] : '';
        }
      }
    } else {
      this.selectedFeat = { name: '', source: '' };
      this.selectedAbility1 = '';
      this.selectedAbility2 = '';
      this.checked = false;
    }
    this.asiIndex = index;
  }

  _genASICallback(keyForChange) {
    return (newVal) => {
      setASI({
        feat: keyForChange === 'feat' ? { name: newVal.name, source: newVal.source } : this.selectedFeat,
        ability1: keyForChange === 'ability1' ? newVal : this.selectedAbility1,
        ability2: keyForChange === 'ability2' ? newVal : this.selectedAbility2,
        isFeat: this.checked
      }, this.asiIndex);
    }
  }

  _genFeatAbilityCallback() {
    return (newVal) => {
      if (this.selectedFeat && this.selectedFeat.name && this.selectedFeat.source) {
        const featId = `${this.selectedFeat.name}_${this.selectedFeat.source}`;
        setFeatAttributeSelection(featId, newVal);
      }
    }
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
      <dnd-switch initial-value=[[checked]] label="ASI" secondary-label="Feat" disabled$="[[disabled]]" hidden$="[[disabled]]"></dnd-switch>
      <div class="abilities" hidden$=[[checked]]>
        <dnd-select-add add-callback="[[_genASICallback('ability1')]]" value="[[selectedAbility1]]" options="[[attributeOptions]]" placeholder="<ASI>" disabled$="[[disabled]]"></dnd-select-add>
        <dnd-select-add add-callback="[[_genASICallback('ability2')]]" value="[[selectedAbility2]]" options="[[attributeOptions]]" placeholder="<ASI>" disabled$="[[disabled]]"></dnd-select-add>
      </div>
      <div class="feat-pick-wrap" hidden$=[[!checked]]>
        <dnd-select-add add-callback="[[_genASICallback('feat')]]" model="feats" value="[[selectedFeat.name]]" placeholder="<Choose Feat>" disabled$="[[disabled]]"></dnd-select-add>
        <button class="reference-link mdc-icon-button material-icons" on-click="_linkClick">logout</button>
      </div>
      <div hidden$=[[!featHasAttributeChoice]]>
        <dnd-select-add test add-callback="[[_genFeatAbilityCallback()]]" value="[[featAttributeSelection]]" options="[[featAttributeOptions]]" placeholder="<Choose Attribute>" disabled$="[[disabled]]"></dnd-select-add>
      </div>
    `;
  }
}

customElements.define("dnd-asi-select", DndAsiSelect);