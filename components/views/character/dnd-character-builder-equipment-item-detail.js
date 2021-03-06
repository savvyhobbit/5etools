import { PolymerElement, html } from "@polymer/polymer";
import {
  setItem
} from "../../../util/charBuilder";
import { getEditModeChannel, isEditMode } from "../../../util/editMode";
import { renderSelection } from "../../../js/items";
import { DAMAGE_TYPES, RARITY_TYPES } from "../../../util/consts";
import { findInPath, util_capitalizeAll } from "../../../js/utils";
import "@vaadin/vaadin-text-field/vaadin-text-field";
import "@vaadin/vaadin-text-field/vaadin-integer-field";
import "@vaadin/vaadin-text-field/vaadin-text-area";
import Parser from '../../../util/Parser';
import "../../dnd-select-add";
import "../../dnd-button";


//// BOONS
// Resistance
// DC+
// Proficiency?
// Spells known
class DndCharacterBuilderEquipmentItemDetail extends PolymerElement {
  
  static get properties() {
    return {
      isEditMode: {
        type: Boolean,
        value: false
      },
      hasRenderedOutput: {
        type: Boolean,
        value: false
      },
      hasAC: {
        type: Boolean,
        value: false
      },
      armorAC: {
        type: Number,
        value: 0
      },
      isArmor: {
        type: Boolean,
        value: false
      },
      isMartial: {
        type: Boolean,
        value: false
      },
      weaponMagicModifier: {
        type: Number,
        value: 0
      },
      itemRarity: {
        type: String,
      },
      itemName: {
        type: String,
      },
      itemWeight: {
        type: Number,
        value: 0
      },
      weaponProperties: {
        type: Array,
      },
      itemResist: {
        type: String,
      },
      itemQuantity: {
        type: Number,
        value: 0
      },
      item: {
        type: Object
      },
      storedItem: {
        type: Object
      },
      itemType: {
        type: String,
        value: ''
      },
      smallRender: {
        type: Boolean,
        reflectToAttribute: true,
        value: false
      }
    };
  }

  static get observers() {
    return [
      '_itemChanged(item)'
    ]
  }

  constructor() {
    super();

    this.itemTypes = [
      'Currency',
      'Armor (Light)',
      'Armor (Medium)',
      'Armor (Heavy)',
      'Melee Weapon',
      'Ranged Weapon',
      'Shield',
      'Adventuring Gear',
      'Ammunition',
      'Artisan Tool',
      'Explosive',
      'Gaming Set',
      'Instrument',
      'Mount',
      'Potion',
      'Rod',
      'Ring',
      'Scroll',
      'Spellcasting Focus',
      'Tool',
      'Tack and Harness',
      'Trade Good',
      'Vehicle',
      'Wand'
    ];

    this.rarityTypes = RARITY_TYPES;
    this.damageTypes = DAMAGE_TYPES;
    this.resistTypes = ['<None>', ...DAMAGE_TYPES];
    this.weaponPropertyOptions = [
      { name: 'Two-Handed', value: '2H' },
      { name: 'Ammunition', value: 'A' },
      { name: 'Finesse', value: 'F' },
      { name: 'Heavy', value: 'H' },
      { name: 'Light', value: 'L' },
      { name: 'Loading', value: 'LD' },
      { name: 'Reach', value: 'R' },
      { name: 'Reload', value: 'RLD' },
      { name: 'Special', value: 'S' },
      { name: 'Thrown', value: 'T' },
      { name: 'Versatile', value: 'V' },
    ]
    this.weaponPropertyValues = [
      'Two-Handed',
      'Ammunition',
      'Finesse',
      'Heavy',
      'Light',
      'Loading',
      'Reach',
      'Reload',
      'Special',
      'Thrown',
      'Versatile'
    ]
  }

  connectedCallback() {
    super.connectedCallback();

    this.editModeHandler = (e) => {
      this.isEditMode = e.detail.isEditMode;
    }
    getEditModeChannel().addEventListener('editModeChange', this.editModeHandler);
    this.isEditMode = isEditMode();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    getEditModeChannel().removeEventListener('editModeChange', this.editModeHandler);
  }

  _itemChanged() {
    if (!this.item) {
      return;
    }
    console.error('itemDetail:', this.item);

    if (this.item.itemRef && !this.item.lookupFailed) {
      this.hasRenderedOutput = true;
      renderSelection(this.item, this.$.renderedOutput, undefined, this.smallRender);
    } else {
      this.hasRenderedOutput = false;
    }
    this.itemType = this._getItemType();
    this.hasAC = this.item.type === 'S' || !!this.item.armor;
    if (this.hasAC) {
      this.armorAC = this.item.ac;
    }
    this.isArmor = !!this.item.armor;
    this.isMartial = this.item.weaponCategory === 'Martial';
    if (this.item.weapon) {
      this.weaponMagicModifier = parseInt(this.item.genericBonus, 10);
      const propStr = this.item.property;
      if (propStr) {
        const props = propStr.split(',').map(prop => {
          const propObj = this.weaponPropertyOptions.find((option) => option.value === prop.trim());
          if (propObj) {
            return propObj.name;
          }
        }).filter(prop => !!prop);
        this.weaponProperties = props;
        if (!this.item.damages) {
          if (this.item.dmg1) {
            this.item.storedItem.damages = [{roll: this.item.dmg1, type: util_capitalizeAll(Parser.dmgTypeToFull(this.item.dmgType))}];
          } else {
            this.item.storedItem.damages = [];
          }
        }
      }
    }
    this.itemRarity = this.item.rarity;
    this.itemName = this.item.name;
    this.itemWeight = this.item.weight;
    this.canHaveResist = this.item.armor || this.item.type === 'P' || this.item.type === 'RG';
    this.itemResist = this.item.resist;
    this.canHaveQuantity = this.item.type === 'P' || this.item.type === 'A' || this.item.type === 'EXP' || this.item.type === '$';
    this.itemQuantity = this.item.quantity;
    this.canHaveSpell = this.item.type === 'SC';

    if (this.item.storedItem) {
      this.storedItem = this.item.storedItem;
    }
  }

  _getItemType() {
    if (this.item) {
      return Parser.ITEM_TYPE_JSON_TO_ABV[this.item.type];  
    }
    return '';
  }

  _selectItemType() {
    const newType = this.root.querySelector('#typeSelect').value
    this.storedItem.armor = false;
    this.storedItem.weapon = false;
    this.storedItem.type = '';
    this.storedItem.isEquipped = false;
    this.storedItem.isAttuned = false;

    switch (newType) {
      case 'Armor (Light)':
        this.storedItem.armor = true;
        this.storedItem.weaponCategory = null;
        this.storedItem.type = 'LA';
        break;
      case 'Armor (Medium)':
        this.storedItem.armor = true;
        this.storedItem.weaponCategory = null;
        this.storedItem.type = 'MA';
        break;
      case 'Armor (Heavy)':
        this.storedItem.armor = true;
        this.storedItem.weaponCategory = null;
        this.storedItem.type = 'HA';
        break;
      case 'Ranged Weapon':
        this.storedItem.weapon = true;
        this.storedItem.weaponCategory = 'Simple';
        this.storedItem.type = 'R';
        this.storedItem.resist = null;
        break;
      case 'Melee Weapon':
        this.storedItem.weapon = true;
        this.storedItem.weaponCategory = 'Simple';
        this.storedItem.type = 'M';
        this.storedItem.resist = null;
        break;
      case 'Shield':
        this.storedItem.type = 'S';
        this.storedItem.weaponCategory = null;
        this.storedItem.ac = 2;
        this.storedItem.resist = null;
        break;
      case 'Adventuring Gear':
        this.storedItem.weaponCategory = null;
        this.storedItem.type = 'G';
        this.storedItem.resist = null;
        break;
      case 'Currency':
        this.storedItem.weaponCategory = null;
        this.storedItem.type = '$'
        this.storedItem.resist = null;
        this.storedItem.quantity = 1;
        this.storedItem.hasQuantity = true;
        break;
      default:
        const typeVal = Object.entries(Parser.ITEM_TYPE_JSON_TO_ABV).find(([key, value]) => value === newType);
        if (typeVal) {
          this.storedItem.type = typeVal[0];
        }
        if (newType !== 'P' || newType !== 'RG') {
          this.storedItem.resist = null;
        }
        break;
    }
    if (!(this.storedItem.type === 'P' || this.storedItem.type === 'A' || this.storedItem.type === 'EXP' || this.storedItem.type === '$')) {
      this.storedItem.hasQuantity = false;
    }
    setItem(this.item);
  }

  _updateItem() {
    setItem(this.item);
  }

  _addDamage() {
    if (!this.storedItem.damages) {
      this.storedItem.damages = [];
    }
    this.storedItem.damages.push({roll: '', type: ''});
    setItem(this.item);
  }

  _removeDamage(e) {
    const rollDamageEl = findInPath('.roll__damage', e);
    const rollDamageIndexAttr = rollDamageEl.getAttribute('index');
    const rollDamageIndex = parseInt(rollDamageIndexAttr, 10);
    this.storedItem.damages.splice(rollDamageIndex, 1);
    setItem(this.item);
  }

  _changeWeaponType() {
    if (this.item.weapon) {
      if (this.isMartial) {
        this.storedItem.weaponCategory = 'Martial';
      } else {
        this.storedItem.weaponCategory = 'Simple';
      }
      setItem(this.item);
    }
  }

  _weaponMagicModifierChange() {
    let parsedMod = parseInt(this.weaponMagicModifier, 10);

    if (isNaN(parsedMod)) {
      parsedMod = 0;
    }
    this.storedItem.genericBonus = parsedMod > 0 ? `+${parsedMod}` : parsedMod;
    setItem(this.item);
  }

  _itemRarityChange() {
    if (this.itemRarity) {
      this.storedItem.rarity = this.itemRarity;
      setItem(this.item);
    }
  }

  _itemNameChange() {
    if (this.itemName) {
      this.storedItem.name = this.itemName;
      setItem(this.item);
    }
  }

  _addWeaponProperty() {
    return ((props) => {
      if (props && props.length) {
        const propCodes = props.map((prop) => {
          const propObj = this.weaponPropertyOptions.find((option) => option.name === prop.trim());
          if (propObj) {
            return propObj.value;
          }
        }).filter(prop => !!prop);
        this.storedItem.property = propCodes.join(',');
        setItem(this.item);
      }
    }).bind(this);
  }

  _armorACChange() {
    let parsedAC = parseInt(this.armorAC, 10);

    if (isNaN(parsedAC)) {
      parsedAC = 0;
    }
    this.storedItem.ac = parsedAC;
    setItem(this.item);
  }

  _itemWeightChange() {
    let parsedWeight = parseFloat(this.itemWeight, 10);

    if (isNaN(parsedWeight)) {
      parsedWeight = 0;
    }
    this.storedItem.weight = parsedWeight;
    setItem(this.item);

  }

  _itemResistChange() {
    if (this.itemResist) {
      this.storedItem.resist = this.itemResist === '<None>' ? null : this.itemResist;
      setItem(this.item);
    }
  }

  _itemQuantityChange() {
    let parsedQuantity = parseInt(this.itemQuantity, 10);

    if (isNaN(parsedQuantity)) {
      parsedQuantity = 0;
    }
    this.storedItem.quantity = parsedQuantity;
    this.storedItem.hasQuantity = true;
    setItem(this.item);
  }

  _or(...bools) {
    for (let bool of bools) {
      if (bool) {
        return true;
      }
    }
    return false;
  }

  static get template() {
    return html`
      <style include="material-styles my-styles"></style>
      <style>
        :host {}
        [hidden] {
          display: none !important;
        }

        .edit__wrap {
          margin-right: -10px;
        }
        .edit__name {
          width: calc(65% - 10px);
          padding-top: 0;
        }
        .edit__notes {
          width: calc(100% - 10px);
          min-height: 200px;
        }
        .edit__checkboxes {
          display: flex;
          flex-direction: column;
          margin: 10px 10px 0 0;
        }

        .section_heading {
          margin: 16px 0 0px;
          font-size: 17px;
          color: var(--mdc-theme-secondary);
        }

        .roll__damages {
          display: flex;
          flex-direction: column;
        }
        .roll__damage {
          display: flex;
          margin-right: 10px;
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
          margin: 0 16px;
        }
        .roll__damage-remove {
          margin: auto -5px 4px;
        }

        dnd-switch {
          margin: 10px auto 0;
          display: block;
        }

        h2 {
          margin-top: 0;
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 8px;
        }

        vaadin-checkbox {
          width: fit-content;
        }

        vaadin-select {
          max-width: calc(50% - 14px);
        }
        vaadin-number-field,
        vaadin-integer-field {
          width: calc(33% - 10px);
        }
        vaadin-text-field,
        vaadin-text-area,
        vaadin-integer-field,
        vaadin-number-field,
        vaadin-select {
          margin-right: 10px;
        }
        dnd-select-add {
          width: calc(66% - 22px);
          margin-right: 10px;
          margin-left: 10px;
        }

        .margin-bottom_large {
          margin-bottom: 0 !important;
        }

        @media(min-width: 921px) {
          h2 {
            font-size: 24px;
          }
        }
      </style>

      <div hidden$="[[!item]]">
        <div hidden$="[[isEditMode]]">
          <div hidden$="[[!hasRenderedOutput]]">
            <h2>[[item.name]]</h4>
            <div>[[item.notes]]</div>
            <div hidden$="[[item.hideRef]]" id="renderedOutput"></div>
          </div>

          <div hidden$="[[hasRenderedOutput]]">
            <h2>[[item.name]]</h4>
            <div>[[item.notes]]</div>
          </div>
        </div>

        <template is="dom-if" if="[[isEditMode]]">
          <div class="edit__wrap">
            <vaadin-text-field class="edit__name" theme="label--secondary" value="{{itemName}}" label="Name" on-change="_itemNameChange"></vaadin-text-field>
            <vaadin-number-field theme="label--secondary" has-controls value="{{itemWeight}}" label="Weight" min="0" on-change="_itemWeightChange"></vaadin-number-field>

            <vaadin-select id="typeSelect" value="[[itemType]]" on-change="_selectItemType" label="Type" >
              <template>
                <vaadin-list-box>
                  <template is="dom-repeat" items="[[itemTypes]]">
                    <vaadin-item>[[item]]</vaadin-item>
                  </template>
                </vaadin-list-box>
              </template>
            </vaadin-select>

            <vaadin-select id="raritySelect" value="{{itemRarity}}" on-change="_itemRarityChange" label="Rarity" >
              <template>
                <vaadin-list-box>
                  <template is="dom-repeat" items="[[rarityTypes]]">
                    <vaadin-item>[[item]]</vaadin-item>
                  </template>
                </vaadin-list-box>
              </template>
            </vaadin-select>

            <div class="edit__weapon" hidden$="[[!item.weapon]]">
              <h4 class="section_heading">Weapon</h4>
              <dnd-select-add choices="100" label="Weapon Properties" options="[[weaponPropertyValues]]" value="[[weaponProperties]]" add-callback="[[_addWeaponProperty()]]"></dnd-select-add>
              <vaadin-integer-field theme="label--secondary"  min="0" max="5" has-controls value="{{weaponMagicModifier}}" label="Magic Modifier" on-change="_weaponMagicModifierChange"></vaadin-integer-field>
              <dnd-switch label='Simple Weapon' secondary-label='Martial Weapon' initial-value="[[isMartial]]" checked={{isMartial}} on-switch-change="_changeWeaponType" ></dnd-switch>

              <template is="dom-repeat" items="[[storedItem.damages]]" as="damage">
                <div class="roll__damage" index$="[[index]]">
                  <dnd-button on-click="_removeDamage" icon="remove" class='roll__damage-remove icon-only'></dnd-button>
                  <div class="roll__damage-roll--edit">
                    <vaadin-text-field theme="label--secondary" value="{{damage.roll}}" on-change="_updateItem" label="Damage Roll"></vaadin-text-field>
                  </div>
                  <div class="roll__damage-type--edit">
                    <vaadin-select value="{{damage.type}}" on-change="_updateItem" label="Damage Type" >
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

            <vaadin-integer-field theme="label--secondary"  hidden$="[[!hasAC]]" min="0" max="30" has-controls value="{{armorAC}}" label="AC" on-change="_armorACChange"></vaadin-integer-field>
            
            <vaadin-integer-field theme="label--secondary"  hidden$="[[!item.hasQuantity]]" min="0" has-controls value="{{itemQuantity}}" label="Quantity" on-change="_itemQuantityChange"></vaadin-integer-field>

            <!-- <vaadin-select hidden$="[[!canHaveResist]]" value="{{itemResist}}" on-change="_itemResistChange" label="Resistance">
              <template>
                <vaadin-list-box>
                  <template is="dom-repeat" items="[[resistTypes]]">
                    <vaadin-item>[[item]]</vaadin-item>
                  </template>
                </vaadin-list-box>
              </template>
            </vaadin-select> -->

            <div class="edit__checkboxes">
              <vaadin-checkbox hidden$="[[!canHaveQuantity]]" checked="{{storedItem.hasQuantity}}" on-change="_updateItem">Has Quantity</vaadin-checkbox>
              <vaadin-checkbox hidden$="[[!isArmor]]" checked="{{storedItem.stealth}}" on-change="_updateItem">Disadvantage on Stealth</vaadin-checkbox>
              <vaadin-checkbox checked="{{storedItem.reqAttune}}" on-change="_updateItem">Requires Attunement</vaadin-checkbox>
              <vaadin-checkbox checked="{{storedItem.wondrous}}" on-change="_updateItem">Wondrous</vaadin-checkbox>
              <vaadin-checkbox hidden$="[[!storedItem.itemRef]]" checked="{{storedItem.hideRef}}" on-change="_updateItem">Hide Reference</vaadin-checkbox>
            </div>

            <vaadin-text-area  theme="label--secondary" class="edit__notes" value="{{storedItem.notes}}" label="Notes" on-change="_updateItem"></vaadin-text-area>
          </div>
        </template>
      </div>
    `;
  }
}

customElements.define("dnd-character-builder-equipment-item-detail", DndCharacterBuilderEquipmentItemDetail);