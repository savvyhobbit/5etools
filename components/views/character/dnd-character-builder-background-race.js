import { PolymerElement, html } from "@polymer/polymer";
import {
  getCharacterChannel,
  getSelectedCharacter,
  getRaceAttributeOptions,
  getRaceAttributeDefaults,
  setRaceAttributes,
  getBackgroundSkillProfOptions,
  getBackgroundSkillProfDefaults,
  setBackgroundSkillProficiencies,
} from "../../../util/charBuilder";
import { getEditModeChannel, isEditMode } from "../../../util/editMode";
import { util_capitalizeAll, absInt, initCollapseToggles, encodeForHash } from "../../../js/utils"; 

class DndCharacterBuilderBackgroundRace extends PolymerElement {
  
  static get properties() {
    return {
      selectedBackground: {
        type: String,
        value: ""
      },
      backgroundSkillProfOptions: {
        type: Object,
        value: []
      },
      defaultBackgroundSkillProf: {
        type: String,
        value: ""
      },
      selectedRace: {
        type: String,
        value: ""
      },
      raceAttributeOptions: {
        type: Object,
        value: []
      },
      defaultRaceAttribute: {
        type: String,
        value: ""
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
    this.selectedBackground = character.background;
    this.backgroundName = this.selectedBackground.name;
    this.selectedRace = character.race;
    this.raceName = this.selectedRace.name;
    // Skills from Background
    let backgroundSkills = await getBackgroundSkillProfOptions();
    if (backgroundSkills && backgroundSkills.choose) {
      this.backgroundSkillProfOptions = backgroundSkills.choose.from;
      this.backgroundSkillProfChoices = backgroundSkills.choose.count || 1;
      this.backgroundSkillProfSelections = character.backgroundSkillProficiencies;
    } else {
      this.backgroundSkillProfOptions = undefined;
      this.backgroundSkillProfChoices = undefined;
      this.backgroundSkillProfSelections = undefined;
    }
    let defaultBackgroundSkillProf = await getBackgroundSkillProfDefaults(backgroundSkills);
    this.defaultBackgroundSkillProf = defaultBackgroundSkillProf.map(e => { return util_capitalizeAll(e) }).join(', ');

    // Attributes from Race
    let raceAttributes = await getRaceAttributeOptions();
    if (raceAttributes && raceAttributes.choose) {
      this.raceAttributeOptions = raceAttributes.choose.from.map(i => { return i.toUpperCase() });
      this.raceAttributeChoices = raceAttributes.choose.count || 1;
      this.raceAttributeSelections = character.raceAttributes;
    } else {
      this.raceAttributeOptions = undefined;
      this.raceAttributeChoices = undefined;
      this.raceAttributeSelections = undefined;
    }
    let defaultRaceAttribute = await getRaceAttributeDefaults(raceAttributes);
    this.defaultRaceAttribute = defaultRaceAttribute
      .map(e => {
        let attribute = e[0].toLowerCase(),
          mod = e[1];
        return attribute.toUpperCase() + ' ' + absInt(mod);
      }).join(', ');

    initCollapseToggles(this.shadowRoot);
    
    this.dispatchEvent(new CustomEvent("loadingChange", { bubbles: true, composed: true }));
  }

  _backgroundSkillAddCallback(skills) {
    setBackgroundSkillProficiencies(skills);
  }

  _raceAttributeAddCallback(attr) {
    setRaceAttributes(attr);
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
          margin-bottom: 200px;
        }

        .row-wrap {
          width: 100%;
        }
        .row-wrap:first-child {
          margin-bottom: 24px;
        }

        .row-wrap > *:not(h2):not(:last-child) {
          margin-bottom: 10px;
        }

        .heading {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
        .reference-link:hover {
          color: var(--mdc-theme-secondary);
        }

        .default-selection {
          font-size: 14px;
          margin-bottom: 0 !important;
        }

        .default-selection span {
          color: var(--mdc-theme-secondary)
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
          .row-wrap:first-child {
            margin-bottom: 0;
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
      </style>

      <div class="col-wrap">
        <div class="row-wrap">
          <div class="heading">
            <h2>Race</h2>
            <a class="reference-link mdc-icon-button material-icons" href="[[_getRaceLink(selectedRace)]]">launch</a>
          </div>
          <dnd-select-add model="races" value="[[selectedRace]]" placeholder="<Choose Race>" disabled$="[[!isEditMode]]" hidden$="[[_showEmpty(isEditMode, selectedRace)]]"></dnd-select-add>
          <div class="missing-text" hidden$="[[_exists(raceAttributeOptions, defaultRaceAttribute)]]">Select Race to add Attribute Bonuses</div>
          <div hidden$="[[!_exists(raceAttributeOptions, defaultRaceAttribute)]]">Attribute Bonuses from Race:</div>
          <div hidden$="[[!_exists(defaultRaceAttribute)]]" class="default-selection">Default Attributes: <span>[[defaultRaceAttribute]]</span></div>
          <dnd-select-add hidden$="[[!_exists(raceAttributeOptions)]]" disabled$="[[!isEditMode]]" choices="[[raceAttributeChoices]]" placeholder="<Choose Attribute>" label="Chosen Attribute(s)"
            options="[[raceAttributeOptions]]" value="[[raceAttributeSelections]]" add-callback="[[_raceAttributeAddCallback]]"></dnd-select-add>
        </div>

        <div class="row-wrap">
          <div class="heading">
            <h2>Background</h2>
            <a class="mdc-icon-button material-icons" href="[[_getBackgroundLink(selectedBackground)]]">launch</a>
          </div>
          <dnd-select-add model="backgrounds" value="[[selectedBackground]]" placeholder="<Choose Background>" disabled$="[[!isEditMode]]" hidden$="[[_showEmpty(isEditMode, selectedBackground)]]"></dnd-select-add>
          <div class="missing-text" hidden$="[[_exists(backgroundSkillProfOptions, defaultBackgroundSkillProf)]]">Select Background to add Skill Proficiencies</div>
          <div hidden$="[[!_exists(backgroundSkillProfOptions, defaultBackgroundSkillProf)]]">Skill Proficiencies from Background:</div>
          <div hidden$="[[!_exists(defaultBackgroundSkillProf)]]" class="default-selection">Default Skills: <span>[[defaultBackgroundSkillProf]]</span></div>
          <dnd-select-add hidden$="[[!_exists(backgroundSkillProfOptions)]]" disabled$="[[!isEditMode]]" choices="[[backgroundSkillProfChoices]]" placeholder="<Choose Skills>" label="Chosen Skill(s)" disabled$="[[!isEditMode]]"
            options="[[backgroundSkillProfOptions]]" value="[[backgroundSkillProfSelections]]" add-callback="[[_backgroundSkillAddCallback]]"></dnd-select-add>
        </div>
      </div>
    `;
  }
}

customElements.define("dnd-character-builder-background-race", DndCharacterBuilderBackgroundRace);