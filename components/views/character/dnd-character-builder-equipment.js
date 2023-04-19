import { PolymerElement, html } from "@polymer/polymer";
import { 
  getCharacterChannel,
  getSelectedCharacter,
  getItems,
  removeItem,
  canAttuneItem,
  canEquipItem,
  toggleItemEquipped,
  toggleItemAttuned,
  setItem,
  spliceItems,
  isChildItem,
  getItemAtId,
  addItem
} from "../../../util/charBuilder";
import "../../dnd-icon";
import { getEditModeChannel, isEditMode } from "../../../util/editMode";
import '@vaadin/polymer-legacy-adapter/template-renderer.js';
import "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-grid";
import "@vaadin/vaadin-grid/vaadin-grid-tree-toggle";
import "@vaadin/vaadin-grid/vaadin-grid-column";
import "@vaadin/vaadin-text-field/vaadin-integer-field";
import "./dnd-character-builder-equipment-item-detail";

class DndCharacterBuilderEquipment extends PolymerElement {
  
  static get properties() {
    return {
      inventory: {
        type: Array
      },
      isEditMode: {
        type: Boolean,
        value: false
      },
      character: {
        type: Object,
      },
      expandedItems: {
        type: Array
      },
      expandedIds: {
        type: Array
      },
      activeItem: {
        type: Object,
      },
      isMobile: {
        type: Boolean
      },
    };
  }

  static get observers() {
    return [
      '_expandedItemsChange(expandedItems.*)'
    ]
  }

  _expandedItemsChange() {
    if (this.expandedItems && this.expandedItems.length) {
      this.expandedIds = this.expandedItems.filter(item => !!item).map((item) => item.uniqueId);
      console.error(this.expandedIds);

      if (this.openedItemID) {
        this.$.grid.closeItemDetails(this.openedItemID);
        this.openedItemID = undefined;
      }
    }
    window.scrollTo(0, this.originalScrollHeight);
  }

  _recordScrollHeight(e) {
    // Fix reposition issue after tree expand/collapse toggle
    this.originalScrollHeight = window.scrollY;
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
      if (this.$.grid) {
        setTimeout(() => {
          this.$.grid.notifyResize();
        }, 0);
      }
    }
    getEditModeChannel().addEventListener('editModeChange', this.editModeHandler);
    this.isEditMode = isEditMode();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    getCharacterChannel().removeEventListener("character-selected", this.characterChangeHandler);
    getEditModeChannel().removeEventListener('editModeChange', this.editModeHandler);
  }

  ready() {
    super.ready();
    
    setTimeout(() => {
      const grid = this.$.grid;

      // Add Drag and Drop
      let draggedItem;

      grid.addEventListener('grid-dragstart', function(e) {
        draggedItem = e.detail.draggedItems[0];
        grid.dropMode = 'on-top-or-between';
      });

      grid.addEventListener('grid-dragend', function(e) {
        draggedItem = grid.dropMode = null;
      });

      grid.addEventListener('grid-drop', (e) => {
        const dropTargetItem = e.detail.dropTargetItem;
        if (draggedItem && draggedItem !== dropTargetItem) {

          // Prevent loops
          const isChild = isChildItem(draggedItem, dropTargetItem.uniqueId);
          if (draggedItem.container && isChild) {
            return;
          }

          const removeId = draggedItem.storedItem.uniqueId;
          draggedItem.storedItem.uniqueId = this.character.itemCounter ++;

          // Dropping into container
          if (e.detail.dropLocation === 'on-top') {
            if (dropTargetItem.container) {
              if (dropTargetItem.storedItem && dropTargetItem.storedItem.children) {
                // Add child item
                dropTargetItem.storedItem.children.push(draggedItem.storedItem);
                setItem(dropTargetItem, undefined, true);
                // Remove original
                removeItem(removeId);
              }
              return;
            }
          }

          // Re-ordering items, default action if 'on-top' of non-container
          if (this.inventory) {
            // Adjust final add index for dropLocation 'below' or 'above'
            const dropTargetId = `${dropTargetItem.id}`;
            let finalAddIndex = parseInt(dropTargetId.substring(dropTargetId.lastIndexOf('_')), 10);
            if (e.detail.dropLocation === 'below') {
              finalAddIndex++;
            }

            if (dropTargetItem.parentItemREF) {
              // Add child item
              dropTargetItem.parentItemREF.storedItem.children.splice(finalAddIndex, 0, draggedItem.storedItem);
              setItem(dropTargetItem.parentItemREF, undefined, true);
            } else {
              // Add top-level item
              spliceItems(finalAddIndex, draggedItem.storedItem);
            }

            // Remove original item
            removeItem(removeId);
          }
        }
      });

      // Set Data Provider
      grid.dataProvider = ((params, callback) => {
        const startIndex = params.page * params.pageSize;
        let children = params.parentItem ? params.parentItem.children : this.inventory;
        if (children && children.length) {
          const page = children.slice(startIndex, startIndex + params.pageSize);
          callback(page, children.length);
        }
      }).bind(this);
    }, 0);
    
  }

  async updateFromCharacter(character) {
    if (character) {
      this.character = character;
      this.inventory = await getItems(character);
      console.error('inventory:', this.inventory);
      const originalScrollHeight = window.scrollY;
      this.$.grid.clearCache();
      if (this.openedItemID) {
        const openedItem = getItemAtId(this.inventory, this.openedItemID.uniqueId);
        if (openedItem) {
          this.$.grid.openItemDetails(openedItem);
        }
      }
      if (this.expandedIds) {
        const expandedItems = this.expandedIds.map((id) => {
          return getItemAtId(this.inventory, id);
        });
        this.expandedItems = expandedItems;
      }
      if (this.activeItem) {
        this.activeItem = getItemAtId(this.inventory, this.activeItem.uniqueId);
      }
      window.scrollTo(0, originalScrollHeight);
      this.dispatchEvent(new CustomEvent("loadingChange", { bubbles: true, composed: true }));
    }
  }

  _expandDetails(e) {
    let data = e.model.__data.item,
      stayClosed = this.$.grid.detailsOpenedItems.indexOf(data) > -1;

    const originalScrollHeight = window.scrollY;

    for (let item of this.$.grid.detailsOpenedItems) {
      this.$.grid.closeItemDetails(item);
    }

    if (stayClosed) {
      this.$.grid.closeItemDetails(data);
      this.openedItemID = undefined;
    } else {
      this.$.grid.openItemDetails(data);
      this.openedItemID = data;
    }
    this.$.grid.notifyResize();
    window.scrollTo(0, originalScrollHeight);
  }

  _flashCheckbox(checkboxEl) {
    if (checkboxEl) {
      checkboxEl.classList.add('transition-bg');
      checkboxEl.classList.add('flash-error');
      setTimeout(() => {
        checkboxEl.classList.remove('flash-error');
        setTimeout(() => {
          checkboxEl.classList.remove('transition-bg');
        }, 200);
      }, 200);
    }
  }

  _deleteItem(e) {
    e.preventDefault();
    e.stopPropagation();
    let uniqueId = e.model.__data.item && e.model.__data.item.uniqueId !== undefined ? e.model.__data.item.uniqueId : undefined;
    removeItem(uniqueId);
  }

  async _setItemEquipped(e) {
    e.preventDefault();
    e.stopPropagation();
    let itemModel = e.model.__data.item;
    let uniqueId = itemModel ? itemModel.uniqueId : undefined;
    let isEquipped = itemModel ? itemModel.isEquipped : false;
    
    if (isEquipped) {
      toggleItemEquipped(uniqueId);
    } else if (await canEquipItem(itemModel)) {
      toggleItemEquipped(uniqueId);
    } else {
      let checkbox = e.target.querySelector('vaadin-checkbox')
      this._flashCheckbox(checkbox)
    }
  }

  async _setItemAttuned(e) {
    e.preventDefault();
    e.stopPropagation();
    let itemModel = e.model.__data.item;
    let uniqueId = itemModel ? itemModel.uniqueId : undefined;
    let isAttuned = itemModel ? itemModel.isAttuned : false;

    if (isAttuned) {
      toggleItemAttuned(uniqueId);
    } else if (await canAttuneItem(itemModel)) {
      toggleItemAttuned(uniqueId);
    } else {
      let checkbox = e.target.querySelector('vaadin-checkbox')
      this._flashCheckbox(checkbox)
    }
  }

  _quantityChange(e) {
    const item = this.$.grid.getEventContext(e).item;
    let newQuantity = parseInt(item.quantity, 10);
    if (isNaN(newQuantity)) {
      newQuantity = 0;
    }

    item.storedItem.quantity = newQuantity;
    setItem(item);
  }

  _addItem() {
    addItem({}, false);
  }

  _preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  _or(...bools) {
    for (let bool of bools) {
      if (bool) {
        return true;
      }
    }
    return false;
  }

  _noRarity(rarity) {
    return !rarity || rarity === 'None';
  }

  _toggleTheme(item) {
    return item.children && item.children.length === 0 ? 'no-children' : '';
  }

  _linkClick() {
    this.dispatchEvent(new CustomEvent("open-drawer", {
      bubbles: true,
      composed: true,
      detail: {
        viewId: 'items'
      }
    }));
  }
  
  _isActive(activeItem, item) {
    return activeItem === item;
  }

  _hasActive(activeItem) {
    return !!activeItem;
  }

  _clearSelection() {
    this.set('activeItem', null);
  }

  static get template() {
    return html`
      <style include="material-styles"></style>
      <style>
        :host {
          display: block;
          padding: 14px;
        }
        [hidden] {
          display: none !important;
        }
        a {
          color: var(--mdc-theme-secondary);
        }

        vaadin-grid {
          margin-bottom: var(--tab-bottom-margin);
        }

        .heading {
          display: flex;
          flex-direction: row;
          align-items: center;
          border-bottom: 1px solid var(--lumo-contrast-10pct);
        }
        .reference-link {
          margin-right: auto;
        }
        .mdc-icon-button:hover {
          color: var(--mdc-theme-secondary);
        }

        .col-wrap {
          display: flex; 
          justify-content: space-between;
          flex-wrap: wrap;
        }

        .row-wrap {
          width: 100%;
        }

        .row-wrap > *:not(h2):not(:last-child) {
          margin-bottom: 10px;
        }

        .no-content {
          font-size: 14px;
          font-style: italic;
        }

        .item-wrap {
          display: flex;
          flex-wrap: nowrap;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-start;
          padding: 10px 6px;
          min-height: 28px;
          border-bottom: 1px solid var(--_lumo-grid-secondary-border-color);
        }
        .item-wrap__name-wrap {
          flex-basis: 100%;
          min-width: 0;
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }
        .item-wrap__name-wrap:hover {
          color: var(--mdc-theme-secondary);
        }
        .item-wrap__name {
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          position: relative;
        }
        .item-wrap__edited,
        .item-wrap__from {
          background-color: var(--mdc-theme-text-disabled-on-background);
          color: var(--mdc-theme-on-secondary);
          border: none;
          border-radius: 4px;
          outline: none;
          display: inline-block;
          justify-content: center;
          white-space: normal;
          font-size: 10px;
          padding: 1px 4px;
          margin-right: 4px;
          font-style: italic;
        }
        .item-wrap__edited {
          top: -1px;
          position: relative;
          font-weight: normal;
        }
        .item-wrap__type {
          font-style: italic;
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          position: relative;
        }
        .item-wrap__type--fromBackground {
          padding-right: 38px;
        }
        .item-wrap__type--fromClass {
          padding-right: 50px;
        }
        .item-wrap__close {
          font-size: 14px;
          margin-top: 6px;
          cursor: pointer;
        }
        .item-wrap__checkboxes {
          display: flex;
          flex-direction: column;
          width: 80px;
          flex-grow: 0;
          flex-shrink: 0;
          margin-left: auto;
        }
        .item-wrap__checkboxes > span {
          cursor: pointer;
        }
        .item-wrap__quantity {
          display: flex;
          flex-direction: column;
          width: 80px;
          flex-grow: 0;
          flex-shrink: 0;
          margin-left: auto;
        }
        vaadin-integer-field {
          margin: -13px 0 8px;
        }
        vaadin-checkbox {
          pointer-events: none;
          font-size: 13px;
        }
        vaadin-checkbox.flash-error {
          color: var(--mdc-theme-error);
          transition: color 0.2s ease-out;
          --lumo-contrast-20pct: var(--mdc-theme-error);
        }
        vaadin-checkbox.transition-bg {
          transition: color 0.2s ease-in;
        }

        .details {
          font-size: 14px;
          width: calc(100% - 30px);
          margin: 0 auto 13px !important;
          background: var(--lumo-contrast-10pct);
          border-radius: 4px;
          padding: 14px;
        }
        
        .details-row {
          padding-top: 14px;
          position: relative;
          padding-bottom: 220px;
        }

        .details-wrap {
          font-size: 14px;
          background: var(--lumo-contrast-10pct);
          border-radius: 4px;
          line-height: 1.5;
          padding: 14px;
        }

        .close-item {
          margin-left: auto;
          font-size: 32px;
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
          .item-wrap[active] {
            background: var(--_lumo-grid-selected-row-color);
          }
          .row-wrap {
            width: calc(50% - 10px);
          }
          .row-wrap:first-child {
            margin-bottom: 0;
          }
          .details {
            display: none;
          }
          .item-list-row[hidden]{
            display: block !important;
          }
          .details-wrap {
            display: block;
          }
          .close-item {
            display: none;
          }
        }
      </style>

      <div class="heading">
        <h2>Inventory</h2>
        <button class="mdc-icon-button reference-link material-icons" hidden$="[[_hasActive(activeItem)]]" on-click="_linkClick">logout</button>
        <button class="mdc-icon-button add-item" hidden$="[[_hasActive(activeItem)]]" on-click="_addItem"><dnd-icon icon="plus"></dnd-icon></button>
        <button class="mdc-icon-button close-item material-icons" hidden$="[[!_hasActive(activeItem)]]" on-click="_clearSelection">close</button>
      </div>
      <div class="col-wrap">
        <div class="row-wrap item-list-row" hidden$="[[_hasActive(activeItem)]]">
          <vaadin-grid id="grid" expanded-items="{{expandedItems}}" active-item="{{activeItem}}" all-rows-visible rows-draggable theme="no-border no-row-borders no-row-padding" >
            <vaadin-grid-column>
              <template>
                <div class="item-wrap" active$="[[_isActive(activeItem, item)]]">
                  <vaadin-grid-tree-toggle level$=[[level]] leaf="[[!item.container]]" expanded="{{expanded}}" theme$=[[_toggleTheme(item)]] on-click='_recordScrollHeight'></vaadin-grid-tree-toggle>
                  <div class="item-wrap__name-wrap" on-click="_expandDetails">
                    <span class="item-wrap__name">[[item.name]]
                      <span hidden$="[[!item.isEdited]]" class="item-wrap__edited">Edited</span>
                    </span>
                    <span class="item-wrap__type">
                      <span class="item-wrap__from" hidden$="[[!item.fromBackground]]">BG</span>
                      <span class="item-wrap__from" hidden$="[[!item.fromClass]]">Class</span>
                      <span>[[item.typeText]]<span hidden$="[[_noRarity(item.rarity, item)]]">, [[item.rarity]]</span></span>
                    </span>
                  </div>
                  <div hidden$="[[item.hasQuantity]]" class="item-wrap__checkboxes">
                    <span on-click="_setItemEquipped">
                      <vaadin-checkbox checked="[[item.isEquipped]]" hidden$="[[!item.canEquip]]" label="Equip"></vaadin-checkbox>
                    </span>
                    <span on-click="_setItemAttuned">
                      <vaadin-checkbox checked="[[item.isAttuned]]" hidden$="[[!item.reqAttune]]" label="Attune"></vaadin-checkbox>
                    </span>
                  </div>
                  <div hidden$="[[!item.hasQuantity]]" class="item-wrap__quantity">
                    <vaadin-integer-field value="{{item.quantity}}" theme="mini" has-controls on-change="_quantityChange"></vaadin-integer-field>
                  </div>
                  <div class="mdc-buttom-icon material-icons item-wrap__close" hidden$="[[!isEditMode]]" on-click="_deleteItem">close</div>
                </div>
              </template>
            </vaadin-grid-column>
          </vaadin-grid>
        </div>

        <div class="row-wrap details-row" hidden$="[[!_hasActive(activeItem)]]">
          <div class="details-wrap">          
            <dnd-character-builder-equipment-item-detail item="{{activeItem}}"></dnd-character-builder-equipment-item-detail>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("dnd-character-builder-equipment", DndCharacterBuilderEquipment);