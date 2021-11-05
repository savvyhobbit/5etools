import { PolymerElement, html } from "@polymer/polymer";
import "@polymer/polymer/lib/elements/dom-repeat.js";
import "@vaadin/vaadin-checkbox";
import "../../dnd-button";
import { cloneDeep, findInPath } from "../../../js/utils";
import {
  getCharacterChannel,
  getSelectedCharacter,
  setCustomRoll,
  removeCustomRoll,
  removeCustomRollDamage
} from "../../../util/charBuilder";
import { DAMAGE_TYPES } from "../../../util/consts";
import { getEditModeChannel, isEditMode } from "../../../util/editMode";
import { rollDice, rollHit } from "../../../util/roll";

class DndCharacterBuilderRolls extends PolymerElement {
  
  static get properties() {
    return {
      isEditMode: {
        type: Boolean,
        value: false
      },
      customRolls: {
        type: Array
      }
    };
  }
  
  connectedCallback() {
    super.connectedCallback();

    this.damageTypes = DAMAGE_TYPES;
    
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
    this.customRolls = character.customRolls ? cloneDeep(character.customRolls) : [];

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
      if (!rollModel.noHitRoll) {
        rollHit(`${rollModel.name} (to hit)`, rollModel.toHit, this.$.advMod.checked, this.$.disadvMod.checked);
      }
      rollModel.damages.forEach((damage, index) => {
        rollDice(`${rollModel.name} (${damage.type} damage)`, damage.roll);

        setTimeout(() =>{
        }, (index + 1) * 500);
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
    const newRoll = {name: "", toHit: 0, noHitRoll: false, damages: [ {roll: '', type: ''} ]};
    setCustomRoll(newRoll, this.customRolls.length);
  }

  _removeRoll(e) {
    const rollEl = findInPath('.roll', e);
    const rollIndexAttr = rollEl.getAttribute('index');
    const rollIndex = parseInt(rollIndexAttr, 10);
    removeCustomRoll(rollIndex);
  }

  _addDamage(e) {
    const rollEl = findInPath('.roll', e);
    const rollIndexAttr = rollEl.getAttribute('index');
    const rollIndex = parseInt(rollIndexAttr, 10);
    const curRoll = this.customRolls[rollIndex];
    curRoll.damages.push({roll: '', type: ''});
    setCustomRoll(curRoll, rollIndex);
  }

  _removeDamage(e) {
    const rollEl = findInPath('.roll', e);
    const rollIndexAttr = rollEl.getAttribute('index');
    const rollIndex = parseInt(rollIndexAttr, 10);
    const rollDamageEl = findInPath('.roll__damage', e);
    const rollDamageIndexAttr = rollDamageEl.getAttribute('index');
    const rollDamageIndex = parseInt(rollDamageIndexAttr, 10);
    removeCustomRollDamage(rollIndex, rollDamageIndex);
  }

  _or(a, b) {
    return a || b;
  }

  _orNot(a, b){
    return a || !b;
  }

  _isTruthy(a) {
    return !!a;
  }

  _modChange(e) {
    if (e.currentTarget.id === 'advMod') {
      this.$.disadvMod.checked = false;
    } else {
      this.$.advMod.checked = false;
    }
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
        margin-bottom: 56px;
      }
      .row-wrap {
        width: 100%;
      }

      h2 {
        margin-bottom: 24px;
      }

      .rolls__add-button {
        margin-bottom: 16px;
        display: inline-flex;
      }

      .roll {
        display: flex;
        flex-direction: column;
        cursor: pointer;
        border-radius: 4px;
        padding: 8px;
        margin-bottom: 16px;
        background: var(--lumo-contrast-10pct);
        height: min-content;
        width: 100%;
      }
      
      .rolls {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding-bottom: 60px;
      }

      @media(min-width: 500px) {
        .roll {
          width: calc(50% - 24px);
        }
      }

      @media(min-width: 921px) {
        :host {
          padding-right: 0px;
        }
        .roll {
          max-width: 380px;
          margin-right: 16px;
        }
        .rolls {
          display: flex;
          flex-wrap: wrap;
        }
      }

      @media(min-width: 1321px) {
        .roll {
          width: calc(33.3% - 32px);
        }
      }

      .roll-header {
        display: flex;
        justify-content: space-between;
      }
      .roll-header dnd-button {
        margin-top: 20px;
      }
      .roll-header vaadin-text-field {
        padding-top: 0;
      }
      h3 {
        margin: 4px 0;
      }
      .roll__to-hit {
        display: flex;
      }
      .roll__to-hit dnd-switch {
        margin: 0 auto;
        padding: 26px 20px 27px;
      }

      .roll-footer {
        display: flex;
        flex-direction: column;
      }
      .roll__damages {
        display: flex;
        flex-direction: column;
      }
      .roll__damage {
        display: flex;
      }
      .roll__damage vaadin-text-field,
      .roll__damage vaadin-select {
        max-width: 100%;
      }
      .roll__damage-roll--edit,
      .roll__damage-type--edit {
        width: calc(50% - 40px);
      }
      .roll__damage-roll--edit {
        margin-right: 16px;
      }
      .roll__damage-remove {
        margin: auto 16px 4px;
      }

      .rolls__toolbar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 20px;
      }
      .rolls__toolbar h4 {
        width: 100%;
        margin: 0;
      }
      .rolls__toolbar-reset-mods {
        display: inline-flex;
      }
      .roll__add-damage {
        width: min-content;
        margin: 8px auto 0;
      }
    </style>
    
    <div class="col-wrap">
      <div class="row-wrap">
        <h2>Rolls</h2>


        <dnd-button hidden$="[[!isEditMode]]" on-click="_addRoll" label="Add Roll" icon="add" class="rolls__add-button"></dnd-button>
        <div hidden$="[[isEditMode]]" class="rolls__toolbar">
          <h4>Roll Modifiers:</h4>
          <div>
            <vaadin-checkbox id='advMod' on-change="_modChange">Advantage</vaadin-checkbox>
            <vaadin-checkbox id='disadvMod' on-change="_modChange">Disadvantage</vaadin-checkbox>
          </div>
        </div>

        <div class="rolls rolls--custom">

          <template is="dom-repeat" items="[[customRolls]]">
            <div class="roll" on-click="_makeRoll" index$="[[index]]">
              <div class="roll-header">
                <h3 hidden$="[[isEditMode]]">[[item.name]]<span hidden$="[[_isTruthy(item.name)]]">&lt;No Name&gt;</span></h3>
                <vaadin-text-field hidden$="[[!isEditMode]]" value="{{item.name}}" on-change="_rollChangeHandler" label="Name"></vaadin-text-field>
                <dnd-button hidden$="[[!isEditMode]]" label="Remove" icon="remove" on-click="_removeRoll"></dnd-button>
              </div>

              <div class="roll-footer">
                <div class="roll__to-hit">
                  <span hidden$="[[_or(item.noHitRoll, isEditMode)]]"><span>[[__abs(item.toHit)]]</span> to hit</span>
                  <vaadin-integer-field hidden$="[[_orNot(item.noHitRoll, isEditMode)]]" value="{{item.toHit}}" on-change="_rollChangeHandler" min="-20" max="20" has-controls label="To Hit"></vaadin-integer-field>
                  <dnd-switch hidden$="[[!isEditMode]]" label='Attack Roll' secondary-label='Damage Only' initial-value="[[item.noHitRoll]]" checked={{item.noHitRoll}} on-switch-change="_rollChangeHandler" ></dnd-switch>
                </div>

                <div class="roll__damages">
                  <template is="dom-repeat" items="[[item.damages]]" as="damage">
                    <div class="roll__damage" index$="[[index]]">
                      <dnd-button hidden$="[[!isEditMode]]" on-click="_removeDamage" icon="remove" class='roll__damage-remove icon-only'></dnd-button>
                      <span class="roll__damage-roll" hidden$="[[isEditMode]]" >[[damage.roll]]</span>
                      <div class="roll__damage-roll--edit" hidden$="[[!isEditMode]]">
                        <vaadin-text-field value="{{damage.roll}}" on-change="_rollChangeHandler" label="Damage Roll"></vaadin-text-field>
                      </div>
                      <span class="roll__damage-type" hidden$="[[isEditMode]]">&nbsp;[[damage.type]] damage</span>
                      <div class="roll__damage-type--edit" hidden$="[[!isEditMode]]">
                        <vaadin-select value="{{damage.type}}" on-change="_rollChangeHandler" label="Damage Type" >
                          <template>
                            <vaadin-list-box>
                              <template is="dom-repeat" items="[[damageTypes]]">
                                <vaadin-item>[[item]]</vaadin-item>
                              </template>
                            </vaadin-list-box>
                          </template>
                        </vaadin-select>
                      </div>
                    </div>
                  </template>
                  <dnd-button hidden$="[[!isEditMode]]" on-click="_addDamage" label="Add Damage" icon="add" class="roll__add-damage"></dnd-button>
                </div>
              </div>
            </div>
          </template>
        </div>

      </div>
    </div>
    `;
  }
}

customElements.define("dnd-character-builder-rolls", DndCharacterBuilderRolls);