import { PolymerElement, html } from "@polymer/polymer";
import {
  saveCharacter,
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
import "../../dnd-switch";

////////
// Item Modifiers
// - attachedSpells: []
// - conditionImmune: []
// - resist: []
// - immune: [
//     "cold"
//   ]
// - bonusSavingThrow: "+1"
// - bonusAbilityCheck": "-2"
// - bonusWeapon: "+1"
// - bonusSpellAttack: "+1"
// - bonusSpellDC: "+1"
// - bonusAc: "+1"
// - ac: 2
// - grantsProficiency: true
// - critThreshold: 19
// - recharge: "dawn"
// - rechargeAmount: "{@dice 1d3}"
// - charges: 3
// - focus: ["Wizard"]
// - optionalfeatures: ""
// - baseItem": "longsword|phb"
// - miscTags: [
//     "CF/W"
//   ]
// - ability: {
//     "static": {
//       "con": 19
//     }
//   }
// - modifySpeed: {
//     "static": {
//       "fly": 150
//     }
//   },
// - modifySpeed: {
//   "equal": {
//     "fly": "walk"
//   }
// }
// - sentient: true
// - curse: true
// - staff: true
// - reqAttuneTags: 
// - reqAttune: true
// - value: 9000

// Ships
// - crewMin: 6,
// - crewMax: 10,
// - vehSpeed: 10,
// - capPassenger: 30,
// - capCargo: 10,
// - travelCost: 200,
// - shippingCost: 100
// - seeAlsoVehicle: ["Apparatus of Kwalish|DMG"]
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
    this.resistTypes = ['None', ...DAMAGE_TYPES];
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
    renderSelection(this.item, this.$.renderedOutput);
    this.itemType = this._getItemType();
    this.hasAC = this.item.type === 'S' || !!this.item.armor;
    this.armorAC = this.item.ac;
    this.acLabel = this.itemType === 'Armor (Light)' ? 'AC (+DEX)' : this.itemType === 'Armor (Medium)' ? 'AC (+DEX max 2)' : 'AC';
    this.isArmor = !!this.item.armor;
    this.isMartial = this.item.weaponCategory === 'Martial';
    this.weaponProperties = [];
    this.weaponMagicModifier = 0;
    if (this.item.weapon || this.item.weaponCategory) {
      this.weaponMagicModifier = parseInt(this.item.bonusWeapon, 10);
      if (this.item.property) {
        const props = this.item.property.map(prop => {
          const propObj = this.weaponPropertyOptions.find((option) => option.value === prop.trim());
          if (propObj) {
            return propObj.name;
          }
        }).filter(prop => !!prop);
        this.weaponProperties = props;
      }
    }
    this.itemRarity = this.item.rarity;
    this.itemName = this.item.name || '';
    this.itemWeight = this.item.weight || null;
    this.canHaveResist = this.item.armor || this.item.type === 'P' || this.item.type === 'RG';
    this.itemResist = this.item.resist;
    this.canHaveQuantity = true;
    this.itemQuantity = this.item.quantity || 1;
    this.canHaveSpell = this.item.type === 'SC';
    this.canHaveSpellMod = true;
    this.spellAttack = this.item.bonusSpellAttack;
    this.spellDC = this.item.bonusSpellSaveDc;

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
    this.storedItem.bonusWeapon = parsedMod > 0 ? `+${parsedMod}` : parsedMod;
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
        this.storedItem.property = propCodes;
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
      this.storedItem.resist = this.itemResist === 'None' ? null : this.itemResist;
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

  _itemSpellAttackChange() {
    let parsedSpellAttack = parseInt(this.spellAttack, 10);

    if (isNaN(parsedSpellAttack)) {
      parsedSpellAttack = 0;
    }
    this.storedItem.bonusSpellAttack = parsedSpellAttack;
    setItem(this.item);
  }

  _itemSpellDCChange() {
    let parsedSpellDC = parseInt(this.spellDC, 10);

    if (isNaN(parsedSpellDC)) {
      parsedSpellDC = 0;
    }
    this.storedItem.bonusSpellSaveDc = parsedSpellDC;
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

  _sourceFull(source) {
    return source && Parser.sourceJsonToFull(source);
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

        vaadin-checkbox {
          width: fit-content;
        }

        vaadin-select {
          max-width: calc(50% - 14px);
        }
        vaadin-number-field,
        vaadin-integer-field {
          width: calc(33% - 12px);
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

        .ac-field {
          width: calc(50% - 14px);
        }
        .ac-suffix {
          font-size: 12px;
        }
        .full-width-field {
          width: calc(100% - 20px);
        }

        h2 {
          margin-top: 0;
          font-size: 24px;
          margin-bottom: 2px;
          line-height: 1.2;
        }
        .notes-container {
          margin-top: 16px;
          line-height: 1.4;
        }
        .notes-container__label {
          font-weight: bold;
        }

        .stats-wrapper {
          font-size: 14px;
          line-height: 1.4;
          margin-top: 16px;
        }
        .stats-wrapper > .statsBlockHead:first-child > .stat-name {
          margin-top: 0;
        }
        .stats-wrapper .statsBlockHead .stat-name {
          font-size: 22px;
          margin-bottom: 2px;
        }
        .stats-wrapper .statsBlockSubHead .stat-name {
          font-size: 18px;
        }
        .stats-wrapper .text {
          margin-top: 16px;
        }
        .stats-wrapper p {
          margin-bottom: 8px;
        }
        .stats-wrapper .statsInlineHead:last-child {
          margin-bottom: 0;
        }
        .stats-wrapper .statsInlineHead .stat-name {
          font-size: inherit;
        }
        .margin-bottom_large,
        .stats-wrapper .margin-bottom_med {
          margin-bottom: 0 !important;
        }
        .source {
          display: block !important;
          color: var(--lumo-contrast-70pct);
          font-size: 13px;
          margin-top: 0px;
          margin-bottom: 12px;
        }
      </style>

      <div hidden$="[[!item]]">
        <div hidden$="[[isEditMode]]">
          <h2>[[item.name]]</h2>
          <div hidden="[[!item.source]]" class="source">[[_sourceFull(item.source)]]</div>
          <div hidden="[[!item.notes]]" class="notes-container">
            <span class="notes-container__label">Notes.</span>
            [[item.notes]]
          </div>
          <div id="renderedOutput"></div>
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

            <div class="edit__weapon" hidden$="[[!_or(item.weapon, item.weaponCategory)]]">
              <h4 class="section_heading">Weapon</h4>
              <dnd-select-add choices="100" class="full-width-field" label="Weapon Properties" options="[[weaponPropertyValues]]" value="[[weaponProperties]]" add-callback="[[_addWeaponProperty()]]"></dnd-select-add>

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

            <vaadin-integer-field class="ac-field" theme="label--secondary"  hidden$="[[!hasAC]]" min="0" max="30" has-controls value="{{armorAC}}" label="[[acLabel]]" on-change="_armorACChange"></vaadin-integer-field>

            <vaadin-integer-field theme="label--secondary" hidden$="[[!item.weapon]]" min="0" max="5" has-controls value="{{weaponMagicModifier}}" label="Weapon Mod" on-change="_weaponMagicModifierChange"></vaadin-integer-field>

            <vaadin-integer-field theme="label--secondary" hidden$="[[!canHaveSpellMod]]" min="0" max="5" has-controls value="{{spellAttack}}" label="Spell Attack" on-change="_itemSpellAttackChange"></vaadin-integer-field>

            <vaadin-integer-field theme="label--secondary" hidden$="[[!canHaveSpellMod]]" min="0" max="5" has-controls value="{{spellDC}}" label="Spell DC" on-change="_itemSpellDCChange"></vaadin-integer-field>

            <vaadin-integer-field theme="label--secondary" hidden$="[[!item.hasQuantity]]" min="0" has-controls value="{{itemQuantity}}" label="Quantity" on-change="_itemQuantityChange"></vaadin-integer-field>

            <vaadin-select hidden$="[[!canHaveResist]]" value="{{itemResist}}" on-change="_itemResistChange" label="Resistance">
              <template>
                <vaadin-list-box>
                  <template is="dom-repeat" items="[[resistTypes]]">
                    <vaadin-item>[[item]]</vaadin-item>
                  </template>
                </vaadin-list-box>
              </template>
            </vaadin-select>

            <div class="edit__checkboxes">
              <vaadin-checkbox hidden$="[[!canHaveQuantity]]" checked="{{storedItem.hasQuantity}}" on-change="_updateItem" label="Has Quantity"></vaadin-checkbox>
              <vaadin-checkbox hidden$="[[!isArmor]]" checked="{{storedItem.stealth}}" on-change="_updateItem" label="Disadvantage on Stealth"></vaadin-checkbox>
              <vaadin-checkbox hidden$="[[!_or(item.weapon, item.weaponCategory)]]" checked="{{storedItem.forceProficient}}" on-change="_updateItem" label="Force Proficiency"></vaadin-checkbox>
              <vaadin-checkbox checked="{{storedItem.reqAttune}}" on-change="_updateItem" label="Requires Attunement"></vaadin-checkbox>
              <vaadin-checkbox checked="{{storedItem.wondrous}}" on-change="_updateItem" label="Wondrous"></vaadin-checkbox>
            </div>

            <vaadin-text-area  theme="label--secondary" class="edit__notes" value="{{storedItem.notes}}" label="Notes" on-blur="_updateItem"></vaadin-text-area>
          </div>
        </template>
      </div>
    `;
  }
}

customElements.define("dnd-character-builder-equipment-item-detail", DndCharacterBuilderEquipmentItemDetail);