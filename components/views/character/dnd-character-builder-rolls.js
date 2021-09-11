import { PolymerElement, html } from "@polymer/polymer";
import "@polymer/polymer/lib/elements/dom-repeat.js";
import {
  getCharacterChannel,
  getSelectedCharacter,
  getCustomRolls,
  getSpellRolls,
  getItemRolls
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
    this.customRolls = [
      {
        name:"Some Spell",
        toHit: 9,
        damages: [{roll: '2d8+ 5', type: 'fire'},{roll: '2d6', type: 'necrotic'}]
      },
      {
        name: "Great Sword",
        toHit: 5,
        damages: [{roll: '2d6+ 5', type: 'slashing'}]
      },
      {
        name: "Cannon Fire",
        damages: [{roll: '3d10', type: 'bludgeoning'}]
      }
    ]

    this.itemRolls = await getItemRolls();

    this.spellRolls = await getSpellRolls();


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
        cursor: pointer;
      }
      .roll__to-hit {
        margin-right: 10px;
      }
      .roll__damages {
        display: flex;
        flex-direction: column;
      }
      h3 {
        margin-bottom: 4px;
      }
    </style>
    
    <div class="col-wrap">
      <div class="row-wrap">
        <h2>Rolls</h2>

        <div class="rolls rolls--custom">

          <template is="dom-repeat" items="[[customRolls]]">
            <h3>[[item.name]]</h3>
            <div class="roll" on-click="_makeRoll">
              <div class="roll__to-hit" hidden$="[[!item.toHit]]">to hit: <span>[[__abs(item.toHit)]]</span></div>

              <div class="roll__damages">
                <template is="dom-repeat" items="[[item.damages]]" as="damage">
                  <div class="roll__damage">
                    <span class="roll__damage-roll">[[damage.roll]]</span>
                    <span class="roll__damage-type">[[damage.type]]</span>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>


        <h2>Spells</h2>

        <div class="rolls rolls--spells">
          <template is="dom-repeat" items="[[customRolls]]">
            <h3>[[item.name]]</h3>
            <div class="roll" on-click="_makeRoll">
              <div class="roll__to-hit" hidden$="[[!item.toHit]]">to hit: <span>[[__abs(item.toHit)]]</span></div>

              <div class="roll__damages">
                <template is="dom-repeat" items="[[item.damages]]" as="damage">
                  <div class="roll__damage">
                    <span class="roll__damage-roll">[[damage.roll]]</span>
                    <span class="roll__damage-type">[[damage.type]]</span>
                  </div>
                </template>
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