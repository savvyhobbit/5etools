import { PolymerElement, html } from "@polymer/polymer";
import {
  setItem
} from "../../../util/charBuilder";
import { getEditModeChannel, isEditMode } from "../../../util/editMode";
import { renderSelection } from "../../../js/items";
import "@vaadin/vaadin-text-field/vaadin-text-field";
import "@vaadin/vaadin-text-field/vaadin-text-area";

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
      'Armor',
      'Simple Weapon',
      'Martial Weapon',
      'Shield',
      'Wondrous Item',
      'Adventuring Gear',
      'Container'
    ];
  }

  _itemChanged() {
    console.error('itemDetail:', this.item);

    if (this.item.storedItem) {
      this.storedItem = this.item.storedItem;
    }

    if (this.item.itemRef && !this.item.lookupFailed) {
      this.hasRenderedOutput = true;
      renderSelection(this.item, this.$.renderedOutput, true);
    } else {
      this.hasRenderedOutput = false;
    }
    this.itemType = this._getItemType();
  }

  _getItemType() {
    if (this.item) {
      if (this.item.armor) {
        return 'Armor'
      }
      if (this.item.weaponCategory === 'Simple') {
        return 'Simple Weapon'
      }
      if (this.item.weaponCategory === 'Martial') {
        return 'Martial Weapon'
      }
      if (this.item.type === 'S') {
        return 'Shield'
      }
      if (this.item.container) {
        return 'Container'
      }
      if (this.item.type === 'G') {
        return 'Adventuring Gear'
      }
    }
    return '';
  }

  _selectItemType() {
    const newType = this.$.typeSelect.value;
    this.storedItem.armor = false;
    this.storedItem.weaponCategory = undefined;
    this.storedItem.wondrous = false;

    switch (newType) {
      case 'Armor':
        this.storedItem.armor = true;
        break;
      case 'Simple Weapon':
        this.storedItem.weaponCategory = 'Simple';
        break;
      case 'Martial Weapon':
        this.storedItem.weaponCategory = 'Martial';
        break;
      case 'Shield':
        this.storedItem.type = 'S'
        break;
      case 'Wondrous':
        this.storedItem.wondrous = true;
        break;
      case 'Adventuring Gear':
        this.storedItem.type = 'G';
        break;
      case 'Container':
        this.storedItem.container = true;
        break;
    }
    setItem(this.item);
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

  _updateItem() {
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
      <style include="material-styles"></style>
      <style>
        :host {}
        [hidden] {
          display: none !important;
        }

        .edit__name {
          width: 100%;
        }
        .edit__notes {
          width: 100%;
          min-height: 200px;
        }        

        @media(min-width: 921px) {
        }
      </style>

      <div>
        <div hidden$="[[isEditMode]]">
          <div hidden$="[[!hasRenderedOutput]]">
            <h2>[[item.name]]</h4>
            <div>[[item.notes]]</div>
            <div id="renderedOutput"></div>
          </div>

          <div hidden$="[[hasRenderedOutput]]">
            <h2>[[item.name]]</h4>
            <div>[[item.notes]]</div>
          </div>
        </div>

        <div hidden$="[[!isEditMode]]">
          <vaadin-text-field class="edit__name" value="{{storedItem.name}}" label="Name" on-change="_updateItem"></vaadin-text-field>
          
          <vaadin-select id="typeSelect" value="[[itemType]]" on-change="_selectItemType" label="Item Type" >
            <template>
              <vaadin-list-box>
                <template is="dom-repeat" items="[[itemTypes]]">
                  <vaadin-item>[[item]]</vaadin-item>
                </template>
              </vaadin-list-box>
            </template>
          </vaadin-select>

          <vaadin-checkbox checked="{{item.reqAttune}}" on-change="_updateItem">Requires Attunement?</vaadin-checkbox>

          <vaadin-text-area class="edit__notes" value="{{storedItem.notes}}" label="Notes" on-change="_updateItem"></vaadin-text-area>
        </div>
        
      </div>
    `;
  }
}

customElements.define("dnd-character-builder-equipment-item-detail", DndCharacterBuilderEquipmentItemDetail);