import { PolymerElement, html } from "@polymer/polymer";
import "@polymer/polymer/lib/elements/dom-repeat.js";
import "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-text-field/vaadin-integer-field";
import "../../dnd-button";
import { cloneDeep, findInPath } from "../../../js/utils";
import {
  getCharacterChannel,
  getSelectedCharacter,
  setCustomRoll,
  removeCustomRoll,
  removeCustomRollDamage,
  getWeaponItemRolls,
  getCustomRolls,
} from "../../../util/charBuilder";
import { DAMAGE_TYPES } from "../../../util/consts";
import { dispatchEditModeChange, getEditModeChannel, isEditMode } from "../../../util/editMode";
import { rollDice, rollHit } from "../../../util/roll";
import "../../dnd-switch";

class DndCharacterBuilderRolls extends PolymerElement {
  
  static get properties() {
    return {
      isEditMode: {
        type: Boolean,
        value: false
      },
      customRolls: {
        type: Array
      },
      rolls: {
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
    const weaponRolls = await getWeaponItemRolls(character);
    const customRolls = getCustomRolls(character);
    this.customRolls = customRolls;
    this.rolls = weaponRolls.concat(customRolls);

    console.error("rolls", this.rolls);
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
    if (!this.isEditMode) {
      dispatchEditModeChange(true);
    }
    setTimeout(() => {
      const rollEls = this.shadowRoot.querySelectorAll('.roll');
      rollEls[rollEls.length - 1].scrollIntoView();
    }, 1);
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

  _hideEditRoll(item, isEditMode) {
    return !isEditMode || item.type !== 'custom';
  }

  _hideWarning(item) {
    return item.type !== 'weapon' || (item.isEquipped && item.isProficient);
  }

  _equal(a, b) {
    return a === b;
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
        margin-bottom: var(--tab-bottom-margin);
      }
      .row-wrap {
        width: 100%;
      }

      .heading {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--lumo-contrast-10pct);
        margin-bottom: 10px;
      }

      h2 {
        margin-bottom: 24px;
      }
      h3 {
        margin: 2px 0 4px 0;
        font-size: 20px;
        font-weight: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--mdc-theme-primary);
      }

      .rolls__add-button {
        margin-left: 16px;
      }
      .rolls {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      .roll {
        display: flex;
        flex-direction: column;
        cursor: pointer;
        border-radius: 4px;
        padding: 4px 8px;
        margin-bottom: 16px;
        background: var(--lumo-contrast-10pct);
        height: min-content;
        width: calc(100% - 16px);
        position: relative;
      }

      [edit-mode] .roll {
        padding: 16px;
      }

      .roll-header {
        display: flex;
        justify-content: space-between;
      }
      .roll-header dnd-button {
        margin-top: 25px;
      }
      .roll-header vaadin-text-field {
        padding-top: 0;
        margin-top: 4px;
        flex-grow: 1;
        margin-right: 16px;
      }
      .roll__label {
        font-size: 12px;
        background: var(--lumo-contrast-10pct);
        line-height: 1;
        border-radius: 4px;
        position: relative;
        top: -4px;
        right: -8px;
        height: 20px;
        padding: 0 6px;
        display: flex;
        align-items: center;
        text-transform: capitalize;
      }
      .roll__warning {
        font-size: 12px;
        line-height: 1.2;
        border-radius: 4px;
        position: relative;
        bottom: -4px;
        right: -8px;
        padding: 3px 6px;
        display: flex;
        align-items: center;
        text-transform: capitalize;
        flex-direction: column;
        color: var(--lumo-error-text-color);
        background: var(--lumo-error-color-10pct);
        height: fit-content;
        margin-top: auto;
        white-space: nowrap;
        margin-left: auto;
      }
      .roll__to-hit {
        display: flex;
      }
      .roll__to-hit dnd-switch {
        margin: 0 auto;
        padding: 26px 20px 20px;
      }
      .roll__to-hit vaadin-integer-field {
        width: auto;
        min-width: 6rem;
        max-width: 8rem;
      }

      .roll-footer {
        display: flex;
        flex-direction: column;
        font-size: 15px;
        line-height: 1.4;
        margin-top: auto;
      }
      [not-edit-mode] .roll-footer {
        flex-direction: row;
      }
      .roll__damages {
        display: flex;
        flex-direction: column;
      }
      .roll__damage {
        display: flex;
      }
      [not-edit-mode] .roll__damage {
        flex-wrap: wrap;
      }
      .roll__damage vaadin-text-field,
      .roll__damage vaadin-select {
        max-width: 100%;
      }
      .roll__damage-type {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .roll-footer__wrap {
        overflow: hidden;
      }
      .roll__damage-roll--edit,
      .roll__damage-type--edit {
        width: calc(50% - 40px);
      }
      .roll__damage-roll--edit {
        margin: 0 16px;
      }
      .roll__damage-remove {
        margin: auto -5px 4px;
      }
      .roll__damage-damage {
        display: none;
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

      @media(min-width: 420px) {
        [not-edit-mode] .roll {
          width: calc(50% - 24px);
          height: auto;
        }
      }

      @media(min-width: 700px) {
        [not-edit-mode] .roll {
          width: calc(33% - 24px);
        }
        [edit-mode] .roll {
          width: calc(50% - 39px);
        }
      }

      @media(min-width: 921px) {
        .roll__damage-damage {
          display: inline;
        }
      }

      @media(min-width: 1321px) {
        [not-edit-mode] .roll {
          width: calc(33.3% - 25px);
        }
      }
    </style>
    
    <div class="col-wrap" edit-mode$="[[isEditMode]]" not-edit-mode$="[[!isEditMode]]" >
      <div class="row-wrap">
        <div class="heading">
          <h2>Rolls</h2>
          <dnd-button class="rolls__add-button" link edit-mode$="[[isEditMode]]" not-edit-mode$="[[!isEditMode]]" label="Add a Roll" icon="edit"  on-click="_addRoll"></dnd-button>
        </div>

        <div hidden$="[[isEditMode]]" class="rolls__toolbar">
          <h4>Roll Modifiers:</h4>
          <div>
            <vaadin-checkbox id='advMod' on-change="_modChange">Advantage</vaadin-checkbox>
            <vaadin-checkbox id='disadvMod' on-change="_modChange">Disadvantage</vaadin-checkbox>
          </div>
        </div>

        <div class="rolls rolls--custom">
          <template is="dom-repeat" items="[[rolls]]">
            <div hidden$="[[isEditMode]]" class="roll" on-click="_makeRoll" index$="[[index]]">
              <div class="roll-header">
                <h3>[[item.name]]<span hidden$="[[_isTruthy(item.name)]]">&lt;No Name&gt;</span></h3>
                <span class="roll__label">[[item.type]]</span>
              </div>

              <div class="roll-footer">
                <div class="roll-footer__wrap">
                  <div class="roll__to-hit">
                    <span hidden$="[[_or(item.noHitRoll, isEditMode)]]"><span>[[__abs(item.toHit)]]</span> to hit</span>
                  </div>

                  <div class="roll__damages">
                    <template is="dom-repeat" items="[[item.damages]]" as="damage">
                      <div class="roll__damage" index$="[[index]]">
                        <span class="roll__damage-roll">[[damage.roll]]</span>
                        <span class="roll__damage-type">&nbsp;[[damage.type]]<span class="roll__damage-damage"> damage</span></span>
                      </div>
                    </template>
                  </div>
                </div>

                <div class="roll__warning" hidden$="[[_hideWarning(item)]]">
                  <div class="roll__not-equipped" hidden$="[[item.isEquipped]]">Not Equipped</div>
                  <div class="roll__not-proficient" hidden$="[[item.isProficient]]">Not Proficient</div>
                </div>
              </div>
            </div>

            <div class="roll" on-click="_makeRoll" index$="[[item.customIndex]]" hidden$="[[_hideEditRoll(item, isEditMode)]]">
              <div class="roll-header">
                <vaadin-text-field theme="label--secondary" value="{{item.name}}" on-change="_rollChangeHandler" label="Name"></vaadin-text-field>
                <dnd-button icon="delete" class="icon-only" on-click="_removeRoll"></dnd-button>
              </div>

              <div class="roll-footer">
                <div class="roll__to-hit">
                  <vaadin-integer-field theme="label--secondary" hidden$="[[_orNot(item.noHitRoll, isEditMode)]]" value="{{item.toHit}}" on-change="_rollChangeHandler" min="-20" max="20" has-controls label="To Hit"></vaadin-integer-field>
                  <dnd-switch label='Attack Roll' secondary-label='Damage Only' initial-value="[[item.noHitRoll]]" checked={{item.noHitRoll}} on-switch-change="_rollChangeHandler" ></dnd-switch>
                </div>

                <div class="roll__damages">
                  <template is="dom-repeat" items="[[item.damages]]" as="damage">
                    <div class="roll__damage" index$="[[index]]">
                      <dnd-button on-click="_removeDamage" icon="remove" class='roll__damage-remove'></dnd-button>
                      <div class="roll__damage-roll--edit">
                        <vaadin-text-field theme="label--secondary" value="{{damage.roll}}" on-change="_rollChangeHandler" label="Damage Roll"></vaadin-text-field>
                      </div>
                      <div class="roll__damage-type--edit">
                        <vaadin-select theme="label--secondary" value="{{damage.type}}" on-change="_rollChangeHandler" label="Damage Type" >
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
                  <dnd-button on-click="_addDamage" label="Add Damage" icon="add" class="roll__add-damage"></dnd-button>
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