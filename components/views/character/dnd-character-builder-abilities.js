import { PolymerElement, html } from "@polymer/polymer";
import "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-text-field/vaadin-integer-field";
import "@vaadin/vaadin-select";
import "../../dnd-button";
import {
  getCharacterChannel,
  getSelectedCharacter,
  setAbilityUsage,
  removeAbilityUsage,
} from "../../../util/charBuilder";
import { getEditModeChannel, isEditMode } from "../../../util/editMode";
import { cloneDeep, findInPath } from "../../../js/utils";

class DndCharacterBuilderAbilities extends PolymerElement {
  static get properties() {
    return {
      isEditMode: {
        type: Boolean,
        value: false,
      },
      abilities: {
        type: Array
      }
    };
  }

  constructor() {
    super();

    this.resetOptions = ['', 'Short Rest', 'Long Rest'];
  }

  connectedCallback() {
    super.connectedCallback();

    this.characterChangeHandler = (e) => {
      let character = e.detail.character;
      this.updateFromCharacter(character);
    };

    this.updateFromCharacter(getSelectedCharacter());
    getCharacterChannel().addEventListener(
      "character-selected",
      this.characterChangeHandler
    );

    this.editModeHandler = (e) => {
      this.isEditMode = e.detail.isEditMode;
    };
    getEditModeChannel().addEventListener(
      "editModeChange",
      this.editModeHandler
    );
    this.isEditMode = isEditMode();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    getCharacterChannel().removeEventListener(
      "character-selected",
      this.characterChangeHandler
    );
    getEditModeChannel().removeEventListener(
      "editModeChange",
      this.editModeHandler
    );
  }

  updateFromCharacter(character) {
    if (character && character.customAbilities) {
      this.set('abilities', cloneDeep(character.customAbilities));
    } else {
      this.set('abilities', []);
    }

    this.dispatchEvent(new CustomEvent("loadingChange", { bubbles: true, composed: true }));
  }
  
  _addAbility() {
    setAbilityUsage({name: '', currentSlots: 0, slots: 1}, this.abilities.length);
  }

  _deleteAbility(e) {
    const index = e.model.index;
    removeAbilityUsage(index);
  }

  _updateAbility(e) {
    const index = e.model.index;
    setAbilityUsage(e.model.item, index);
  }

  _toggleSlot(e) {
    e.preventDefault();
    e.stopPropagation();
    const isInput = findInPath('.checkbox-wrap', e);
    const item = e.model.item;
    const maxSlots = item.slots;
    const index = e.model.index;

    if (typeof item.currentSlots !== 'number') {
      item.currentSlots = parseInt(item.currentSlots, 10);
      if (isNaN(item.currentSlots)) {
        item.currentSlots = 0;
      }
    }
    
    if (isInput) {
      const isChecked = isInput.children[0].checked;
      if (!isChecked && item.currentSlots < maxSlots) {
        item.currentSlots = item.currentSlots + 1;
  
      } else if (item.currentSlots > 0) {
        item.currentSlots = item.currentSlots - 1;
      }
    } else {
      if (item.currentSlots < maxSlots) {
        item.currentSlots = item.currentSlots + 1;

      } else if (item.currentSlots > 0) {
        item.currentSlots = item.currentSlots - 1;
      }
    }

    this._setSlotsChecked(item.currentSlots, findInPath('.ability__slots-label-wrap', e));
    setAbilityUsage(item, index);
  }

  _setSlotsChecked(count, el) {
    const checkboxes = el.querySelectorAll('vaadin-checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
      if (i < count) {
        checkboxes[i].checked = true;
      } else {
        checkboxes[i].checked = false
      }
    }
  }

  _exists() {
    for (let arg of arguments) {
      if (!!arg && (arg.constructor !== Object || Object.entries(arg).length > 0) && (!Array.isArray(arg) || arg.length > 0)) {
        return true;
      }
    }
    return false;
  }

  _countToArray(count) {
    const data = [];
    for (var i = 0; i < count; i++) {
      data.push(null);
    }
    return data;
  }

  _shortRest() {
    if (this.abilities) {
      this.abilities.forEach((item, index) => {
        if (item.reset === 'Short Rest') {
          item.currentSlots = 0;
          setAbilityUsage(item, index);
        }
      });
    }
  }

  _longRest() {
    if (this.abilities) {
      this.abilities.forEach((item, index) => {
        if (item.reset === 'Long Rest') {
          item.currentSlots = 0;
          setAbilityUsage(item, index);
        }
      });
    }
  }

  _isSlotChecked(currentSlots, index) {
    return index < currentSlots;
  }

  static get template() {
    return html`
      <style include="material-styles">
        :host {
          display: block;
          padding: 14px;
        }
        [hidden] {
          display: none !important;
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

        .col-wrap {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }

        .heading {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
        
        .rest-buttons {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }

        .short-rest { 
          margin-left: 10px;
        }

        .abilities {
          width: 100%;
        }

        .ability {
          width: 100%;
          display: flex;
          align-items: center;
          border-bottom: 1px solid var(--mdc-theme-text-divider-on-background);
          padding: 8px 0;
          position: relative;
          flex-wrap: wrap;
        }

        [edit-mode] .ability__name {
          width: 100%;
        }

        .ability__slots-label-wrap {
          display: flex;
          align-items: center;
        }

        .ability__slots-label-wrap vaadin-integer-field {
          width: 90px;
        }

        .col-wrap:not([edit-mode]) .ability__slots-wrap {
          margin-left: auto;
        }

        .ability__slots {
          cursor: pointer;
          display: flex;
          padding: 4px;
          max-width: 120px;
          flex-wrap: wrap;
        }

        .ability__slots span {
          -youbkit-touch-callout: none;
          -youbkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .ability__slots-label {
          padding-left: 8px;
          width: 80px;
          text-align: center;
          font-size: 12px;
          line-height: 1.4;
          user-select: none;
        }

        .ability__slots-label-suffix {
          user-select: none;
          font-size: 16px;
          padding-left: 6px;
        }

        .ability__delete {
          position: absolute;
          top: 0;
          right: 0;
        }

        vaadin-checkbox {
          pointer-events: none;
        }
        vaadin-select {
          margin-right: 10px;
        }

        @media (min-width: 420px) {
        }

        @media (min-width: 921px) {
        }
      </style>

      <div class="col-wrap" edit-mode$=[[isEditMode]]>
        <div class="heading">
          <h2>Abilities</h2>
          <div class='rest-buttons'>
            <!-- <dnd-button class="long-rest" label="Long Rest" on-click="_longRest"></dnd-button>
            <dnd-button class="short-rest" label="Short Rest" on-click="_shortRest"></dnd-button> -->
          </div>
        </div>

        <div class="abilities">
          <template is="dom-repeat" items="[[abilities]]">
            <div class="ability">
              <div class="ability__name">
                <span hidden$="[[isEditMode]]">[[item.name]]</span>
                <vaadin-text-field hidden$="[[!isEditMode]]" label="Name" value="{{item.name}}" on-change="_updateAbility"></vaadin-text-field>
              </div>

              <vaadin-select hidden$="[[!isEditMode]]" value="{{item.reset}}" on-change="_updateAbility" label="Reset" >
                <template>
                  <vaadin-list-box>
                    <template is="dom-repeat" items="[[resetOptions]]">
                      <vaadin-item>[[item]]</vaadin-item>
                    </template>
                  </vaadin-list-box>
                </template>
              </vaadin-select>

              <div hidden$="[[!isEditMode]]" class="ability__usage">
                <vaadin-integer-field min="1" value="{{item.slots}}" on-change="_updateAbility" has-controls label="Usages"></vaadin-integer-field>
              </div>
              
              <div class="ability__slots-wrap" hidden$="[[isEditMode]]">
                <div hidden$="[[item.useNumberField]]" on-click="_toggleSlot" class="ability__slots-label-wrap">
                  <div class="ability__slots">
                    <template is='dom-repeat' items='[[_countToArray(item.slots)]]' as="thing">
                      <span class="checkbox-wrap"><vaadin-checkbox checked="[[_isSlotChecked(item.currentSlots, index)]]"></vaadin-checkbox></span>
                    </template>
                  </div>
                  <span class="ability__slots-label">Uses <span hidden$="[[!item.reset]]"> per </span>[[item.reset]]</span>
                </div>

                <div hidden$="[[!item.useNumberField]]" class="ability__slots-label-wrap">
                  <div>
                    <vaadin-integer-field min="0" max="[[item.slots]]" value="{{item.currentSlots}}" on-change="_updateAbility" has-controls></vaadin-integer-field>
                    <span class="ability__slots-label-suffix"> / [[item.slots]]</span>
                  </div>
                  <span class="ability__slots-label">Uses <span hidden$="[[!item.reset]]"> per </span>[[item.reset]]</span>
                </div>
              </div>
              
              <dnd-button hidden$="[[!isEditMode]]" class="ability__delete link" label="Delete" icon="close" on-click="_deleteAbility"></dnd-button>

            </div>
          </template>
        </div>
        <dnd-button hidden$="[[!isEditMode]]" label="Add Ability" on-click="_addAbility"></dnd-button>
      </div>
    `;
  }
}

customElements.define(
  "dnd-character-builder-abilities",
  DndCharacterBuilderAbilities
);
