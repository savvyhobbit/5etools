import { PolymerElement, html } from "@polymer/polymer";
import "@polymer/polymer/lib/elements/dom-repeat.js";
import { findInPath } from "../../../js/utils";
import {
  getCharacterChannel,
  getSelectedCharacter,
  getCustomRolls,
  getSpellRolls,
  getItemRolls,
  setCustomRoll,
  removeCustomRoll
} from "../../../util/charBuilder";
import { getEditModeChannel, isEditMode } from "../../../util/editMode";
import { rollDice } from "../../../util/roll";

class DndCharacterBuilderRolls extends PolymerElement {
  
  static get properties() {
    return {
      isEditMode: {
        type: Boolean,
        value: false
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
    //this.customRolls = getCustom(character);
    this.customRolls = character.customRolls || [];

    //this.itemRolls = await getItemRolls();

    //this.spellRolls = await getSpellRolls();


    this.dispatchEvent(new CustomEvent("loadingChange", { bubbles: true, composed: true }));
  }
  
  __exists() {
    for (let arg of arguments) {
      if (!!arg && (arg.constructor !== Object || Object.entries(arg).length > 0) && (!Array.isArray(arg) || arg.length > 0)) {
        return true;
      }
    }
    return false;
  }

  __abs(num) {
    return num >= 0 ? `+${num}`: num;
  }
  
  _makeRoll(e) {
    if (!this.isEditMode) {
      let rollModel = e.model.__data.item;
      if (rollModel.toHit) {
        rollDice(`${rollModel.name} (to hit)`, `1d20${this.__abs(rollModel.toHit)}`);
      }
      rollModel.damages.forEach((damage, index) => {
        setTimeout(() =>{
          rollDice(`${rollModel.name} (${damage.type} damage)`, damage.roll);
        }, (index + 1) * 300);
      });
    }
  }

  _rollChangeHandler(e) {
    const rollEl = findInPath('.roll', e);
    const rollIndexAttr = rollEl.getAttribute('index');
    const rollIndex = parseInt(rollIndexAttr, 10);
    
    setCustomRoll(this.customRolls[rollIndex], rollIndex);
  }

  _addRoll() {
    const newRoll = {name: "", toHit: 0, damages: [ {roll: '', type: ''} ]};
    this.push('customRolls', newRoll);
    setCustomRoll(newRoll, this.customRolls.length - 1);
  }

  _removeRoll(e) {
    const rollEl = findInPath('.roll', e);
    const rollIndexAttr = rollEl.getAttribute('index');
    const rollIndex = parseInt(rollIndexAttr, 10);
    this.splice('customRolls', rollIndex, 1);
    removeCustomRoll(rollIndex);
  }

  _addDamage(e) {
    const rollEl = findInPath('.roll', e);
    const rollIndexAttr = rollEl.getAttribute('index');
    const rollIndex = parseInt(rollIndexAttr, 10);
    const curRoll = this.customRolls[rollIndex];

    curRoll.damages.push({roll: '', type: ''})
    this.splice('customRolls', rollIndex, 1, curRoll);
    setCustomRoll(curRoll, rollIndex);
  }
  
  static get template() {
    return html`
    <style include="material-styles">
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
      }
      .row-wrap {
        width: 100%;
      }

      h2 {
        margin-bottom: 24px;
      }

      .roll {
        display: flex;
        flex-direction: column;
        cursor: pointer;
      }
      .roll-header {
        display: flex;
        justify-content: space-between;
      }
      .roll-header dnd-button {
        margin-top: 36px;
      }
      h3 {
        margin-bottom: 4px;
      }
      .roll__to-hit {
        margin-right: 10px;
      }
      .roll-footer {
        display: flex;
      }
      .roll__damages {
        display: flex;
        flex-direction: column;
      }
      .roll__damage {
        display: flex;
      }
    </style>
    
    <div class="col-wrap">
      <div class="row-wrap">
        <h2>Rolls</h2>

        <div class="rolls rolls--custom">

          <template is="dom-repeat" items="[[customRolls]]">
            <div class="roll" on-click="_makeRoll" index$="[[index]]">
              <div class="roll-header">
                <h3 hidden$="[[isEditMode]]">[[item.name]]</h3>
                <vaadin-text-field hidden$="[[!isEditMode]]" value="{{item.name}}" on-change="_rollChangeHandler" label="Name"></vaadin-text-field>
                <dnd-button hidden$="[[!isEditMode]]" label="Remove" icon="remove" on-click="_removeRoll"></dnd-button>
              </div>

              <div class="roll-footer">
                <div class="roll__to-hit">
                  <span hidden$="[[isEditMode]]">to hit: <span>[[__abs(item.toHit)]]</span></span>
                  <vaadin-integer-field hidden$="[[!isEditMode]]" value="{{item.toHit}}" on-change="_rollChangeHandler" min="-20" max="20" has-controls label="To Hit"></vaadin-integer-field>
                </div>

                <div class="roll__damages">
                  <template is="dom-repeat" items="[[item.damages]]" as="damage">
                    <div class="roll__damage">
                      <span class="roll__damage-roll" hidden$="[[isEditMode]]" >[[damage.roll]]</span>
                      <div class="roll__damage-roll--edit" hidden$="[[!isEditMode]]">
                        <vaadin-text-field value="{{damage.roll}}" on-change="_rollChangeHandler" label="Damage Roll"></vaadin-text-field>
                      </div>
                      <span class="roll__damage-type" hidden$="[[isEditMode]]" >[[damage.type]]</span>
                      <div class="roll__damage-type--edit" hidden$="[[!isEditMode]]">
                        <vaadin-select value="{{damage.type}}" on-change="_rollChangeHandler" label="Damage Type"></vaadin-select>
                      </div>
                    </div>
                  </template>
                  <dnd-button hidden$="[[!isEditMode]]" on-click="_addDamage" label="Add Damage" icon="add"></dnd-button>
                </div>
              </div>
            </div>
          </template>

          <dnd-button hidden$="[[!isEditMode]]" on-click="_addRoll" label="Add Roll" icon="add"></dnd-button>
        </div>

      </div>
    </div>
    `;
  }
}

customElements.define("dnd-character-builder-rolls", DndCharacterBuilderRolls);