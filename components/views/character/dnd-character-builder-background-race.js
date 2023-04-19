import { PolymerElement, html } from "@polymer/polymer";
import {
  addAdditionalChoice,
  deleteAdditionalChoice,
  getBackgroundReference,
  getCharacterChannel,
  getRaceReference,
  getSelectedCharacter,
} from "../../../util/charBuilder";
import './dnd-character-builder-suboptions';
import "@vaadin/vaadin-select";
import { getEditModeChannel, isEditMode } from "../../../util/editMode";
import { encodeForHash } from "../../../js/utils"; 

class DndCharacterBuilderBackgroundRace extends PolymerElement {
  
  static get properties() {
    return {
      selectedBackground: {
        type: String,
        value: ""
      },
      selectedBackgroundRef: {
        type: Object,
      },
      selectedRace: {
        type: String,
        value: ""
      },
      selectedRaceRef: {
        type: Object,
      },
      isEditMode: {
        type: Boolean,
        value: false
      },
      backgroundName: {
        type: String,
        value: ''
      },
      raceName: {
        type: String,
        value: ''
      }
    };
  }

  constructor() {
    super();
    
    this.additionalOptionAddOptions = ["Feat", "Attribute +1", "Attribute +2", "Skill", "Language", "Tool", "Weapon", "Armor"];
  }

  connectedCallback() {
    super.connectedCallback();

    this.characterChangeHandler = (e) => {
      let character = e.detail.character;
      this.updateFromCharacter(character);
    };
    
    this.updateFromCharacter(getSelectedCharacter());
    getCharacterChannel().addEventListener("character-selected", this.characterChangeHandler);

    this.editModeHandler = (e) => {
      this.isEditMode = e.detail.isEditMode;
    }
    getEditModeChannel().addEventListener('editModeChange', this.editModeHandler);
    this.isEditMode = isEditMode();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    getCharacterChannel().removeEventListener("character-selected", this.characterChangeHandler);
    getEditModeChannel().removeEventListener('editModeChange', this.editModeHandler);
  }

  async updateFromCharacter(character) {
    if (character) {
      let maxAdditionalOptionsIndex = 0;
      let additionalOptions = Object.entries(character.choices)
        .filter(([key, value]) => {
          if (key.includes("additionalChoice") && !key.includes("suboptions")) {
            const index = parseInt(key.substring(key.indexOf('_') + 1));
            if (index > maxAdditionalOptionsIndex) {
              maxAdditionalOptionsIndex = index;
            }
            if (value) {
              value.index = index;
            } else {
              return false;
            }
            return true;
          }
          return false;
        })
        .map(([key, value]) => {
          value.key = key;
          return value;
        });
      this.maxAdditionalOptionsIndex = maxAdditionalOptionsIndex;
      this.set('additionalOptions', additionalOptions);

      if (character.background) {
        this.selectedBackground = character.background;
        this.selectedBackgroundRef = await getBackgroundReference();
        this.backgroundName = this.selectedBackground.name;
      } else {
        this.selectedBackground = {};
        this.selectedBackgroundRef = undefined;
        this.backgroundName = "";
      }

      if (character.race) {
        this.selectedRace = character.race;
        this.selectedRaceRef = await getRaceReference();
        this.raceName = this.selectedRace.name;
      } else {
        this.selectedRace = {};
        this.selectedRaceRef = undefined;
        this.raceName = "";
      }
    }
    
    this.dispatchEvent(new CustomEvent("loadingChange", { bubbles: true, composed: true }));
  }

  _getRaceLink(race) {
    let linkData = [race.name];
    if (race.source) {
      linkData.push(race.source);
    }
    let dataLink = encodeForHash(linkData);
    return race ? `#/races/${dataLink}` : '#/races'
  }

  _getBackgroundLink(bg) {
    let linkData = [bg.name];
    if (bg.source) {
      linkData.push(bg.source);
    }
    let dataLink = encodeForHash(linkData);
    return bg ? `#/backgrounds/${dataLink}` : '#/backgrounds'
  }

  _linkClick(e) {
    const isBackground = e.target.classList.contains('background');
    this.dispatchEvent(new CustomEvent("open-drawer", {
      bubbles: true,
      composed: true,
      detail: {
        selectedItem: isBackground ? this.selectedBackground : this.selectedRace,
        viewId: isBackground ? 'backgrounds' : 'races'
      }
    }));
  }

  _addAdditionalOption(e) {
    const optionChoice = this.$.optionAdd.value;
    addAdditionalChoice(optionChoice, this.maxAdditionalOptionsIndex + 1);
    this.$.optionAdd.value = "";
  }

  _deleteAdditionalOption(e) {
    const optionKey = e.model.__data.item.key;
    deleteAdditionalChoice(optionKey);
  }

  _showEmpty(isEditMode, value) {
    return !isEditMode && !value;
  }

  _exists() {
    for (let arg of arguments) {
      if (!!arg && (arg.constructor !== Object || Object.entries(arg).length > 0) && (!Array.isArray(arg) || arg.length > 0)) {
        return true;
      }
    }
    return false;
  }

  static get template() {
    return html`
      <style include="material-styles my-styles">
        body {}
        :host {
          display: block;
          padding: 14px;
        }
        [hidden] {
          display: none !important;
        }

        .col-wrap {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-bottom: var(--tab-bottom-margin);
        }

        .row-wrap {
          width: 100%;
          margin-bottom: 32px;
        }

        .row-wrap > *:not(h2):not(:last-child) {
          margin-bottom: 10px;
        }

        .heading {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--lumo-contrast-10pct);
        }
        .reference-link:hover {
          color: var(--mdc-theme-secondary);
        }

        .missing-text {
          font-style: italic;
          font-size: 14px;
        }

        @media(min-width: 420px) {
          .heading {
            justify-content: flex-start;
          }
          .reference-link {
            margin-left: 8px;
          }
        }

        @media(min-width: 921px) {
          .row-wrap {
            width: calc(50% - 10px);
          }
        }

        h2 {
          display: block;
          font-size: 1.5em;
          margin-block-start: 0.83em;
          margin-block-end: 0.83em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          font-weight: bold;
        }

        h3 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 8px;
        }
        .details-container  {
          background: var(--lumo-contrast-10pct);
          padding: 14px;
          border-radius: 4px;
          font-size: 14px;
        }
        .stats-wrapper.margin-bottom_large {
          margin-bottom: 0px !important;
        }
        vaadin-select {
          cursor: pointer;
          margin-left: 20px;
          --lumo-font-size-m: 20px;
          --vaadin-text-field-default-width: 0;
          position: relative;
          left: -50px;
        }
        
        dnd-select-add {
          --lumo-font-size-m: 20px;
          width: 100%;
        }

        dnd-character-builder-suboptions {
          display: block;
          margin-left: 30px;
        }

        @media(min-width: 420px) {
          vaadin-select {
            left: 0;
          }
        }
      </style>

      <div class="col-wrap">
        <div class="row-wrap">
          <div class="heading">
            <h2>Race</h2>
            <button class="mdc-icon-button material-icons" on-click="_linkClick">logout</button>
          </div>
          <div class="missing-text" hidden$="[[_exists(selectedRaceRef)]]">Enter edit mode to select a Race.</div>
          <dnd-select-add model="races" value="[[selectedRace]]" placeholder="<Choose Race>" disabled$="[[!isEditMode]]" hidden$="[[_showEmpty(isEditMode, selectedRace)]]"></dnd-select-add>
          <dnd-character-builder-suboptions label="Race" storage-key="race" selected-item="[[selectedRaceRef]]"></dnd-character-builder-suboptions>
        </div>

        <div class="row-wrap">
          <div class="heading">
            <h2>Background</h2>
            <button class="mdc-icon-button material-icons background" on-click="_linkClick">logout</button>
          </div>
          <div class="missing-text" hidden$="[[_exists(selectedBackgroundRef)]]">Enter edit mode to select a Background.</div>
          <dnd-select-add model="backgrounds" value="[[selectedBackground]]" placeholder="<Choose Background>" disabled$="[[!isEditMode]]" hidden$="[[_showEmpty(isEditMode, selectedBackground)]]"></dnd-select-add>
          <dnd-character-builder-suboptions label="Background" storage-key="background" selected-item="[[selectedBackgroundRef]]"></dnd-character-builder-suboptions>
        </div>

        <div class="row-wrap">
          <div class="heading">
            <h2>Extra Features</h2>
            <vaadin-select add-button id="optionAdd" class="label--secondary" on-change="_addAdditionalOption" placeholder="<Add Additional Feature>" disabled$="[[!isEditMode]]" hidden$="[[!isEditMode]]">
              <template>
                <vaadin-list-box>
                  <template is="dom-repeat" items="[[additionalOptionAddOptions]]">
                    <vaadin-item>[[item]]</vaadin-item>
                  </template>
                </vaadin-list-box>
              </template>
            </vaadin-select>
          </div>

          <div class="added-options">
            <template is="dom-repeat" items="[[additionalOptions]]">
              <div>
                Extra [[item.choiceKey]]
                <button class="mdc-icon-button material-icons" on-click="_deleteAdditionalOption">delete</button>
                <dnd-character-builder-suboptions label="Extra [[item.choiceKey]]" dont-create-if-missing storage-key="[[item.key]]" selected-item="[[item]]"></dnd-character-builder-suboptions>
              </div>
            </template>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("dnd-character-builder-background-race", DndCharacterBuilderBackgroundRace);