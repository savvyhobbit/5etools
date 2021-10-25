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
  getItemAtId
} from "../../../util/charBuilder";
import { getEditModeChannel, isEditMode } from "../../../util/editMode";
import "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-grid";
import "@vaadin/vaadin-grid/vaadin-grid-tree-toggle";
import "@vaadin/vaadin-grid/vaadin-grid-column";
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
      }
    };
  }

  static get observers() {
    return [
      '_expandedItemsChange(expandedItems.*)'
    ]
  }

  _expandedItemsChange() {
    if (this.expandedItems && this.expandedItems.length) {
      this.expandedIds = this.expandedItems.map((item) => item.uniqueId);
      console.error(this.expandedIds);
    }
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

      // Define Row Details
      grid.rowDetailsRenderer = ((root, grid, rowData) => {
        if (!root.firstElementChild) {
          root.innerHTML =
          `<div class="details" id="stats">
            <dnd-character-builder-equipment-item-detail></dnd-character-builder-equipment-item-detail>
          </div>`;
        }
        const detailEl = root.querySelector('dnd-character-builder-equipment-item-detail');
        detailEl.item = rowData.item;
      }).bind(this);

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
        const openedItem = getItemAtId(this.inventory, this.openedItemID);
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
      window.scrollTo(0, originalScrollHeight);
      this.dispatchEvent(new CustomEvent("loadingChange", { bubbles: true, composed: true }));
    }
  }

  _expandDetails(e) {
    let data = e.model.__data.item,
      stayClosed = this.$.grid.detailsOpenedItems.indexOf(data) > -1;

    for (let item of this.$.grid.detailsOpenedItems) {
      this.$.grid.closeItemDetails(item);
    }

    if (stayClosed) {
      this.$.grid.closeItemDetails(data);
    } else {
      this.$.grid.openItemDetails(data);
      this.openedItemID = data.uniqueId;
    }
    this.$.grid.notifyResize();
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
  
  _itemWrapTypeClassname(fromBackground, fromClass) {
    let className = 'item-wrap__type ';
    if (fromBackground) {
      className += 'item-wrap__type--fromBackground'
    }
    if (fromClass) {
      className += 'item-wrap__type--fromClass'
    }
    return className;
  }
  
  _itemWrapNameClassname(isEdited) {
    let className = 'item-wrap__name '
    if (isEdited) {
      className += 'item-wrap__name--edited'
    }
    return className;
  }

  _noRarity(rarity) {
    return !rarity || rarity === 'None';
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

        .heading {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }

        .col-wrap {
          display: flex; 
          justify-content: space-between;
          flex-wrap: wrap;
        }

        .row-wrap {
          width: 100%;
        }
        .row-wrap:not(:last-child) {
          margin-bottom: 24px;
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
        .item-wrap__name--edited {
          padding-right: 58px;
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
          top: 3px;
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
        #stats {
          margin-top: 24px;
          font-size: 12px;
        }
        #stats p {
          margin-top: 4px;
          margin-bottom: 16px;
        }
        #stats .table {
          margin-bottom: 24px;
          border-radius: 4px;
          box-shadow: 0 0 0 1px var(--mdc-theme-text-divider-on-background);
        }
        #stats .subclass-feature .stat-name {
          color: var(--mdc-theme-primary, '#6200ee');
        }
        #stats .statsBlockHead .stat-name {
          display: block;
          font-size: 1.6rem;
          font-weight: normal;
          line-height: 1.2;
        }
        #stats .statsBlockSubHead .stat-name {
          font-size: 1.2rem;
          font-weight: normal;
        }
        #stats .statsInlineHead {
          margin-bottom: 16px;
        }
        #stats .statsInlineHead .stat-name {
          font-size: .8rem;
          font-weight: bold;
          display: inline;
        }
        #stats .statsInlineHead .stat-name + p {
          display: inline;
        }
        #stats .spell-ability {
          margin: 0 24px;
          display: block;
        }
        #stats .subclass-feature,
        #stats .class-feature {
          padding-top: 24px;
          border-top: 1px solid var(--mdc-theme-text-divider-on-background, 'rgba(0, 0, 0, 0.12)');
        }
        #stats a {
          color: var(--mdc-theme-secondary, '#018786') !important;
        }
        #stats ul {
          padding-left: 24px;
          list-style: disc;
        }
        #stats ul li {
          margin-bottom: 8px;
        }

        @media(min-width: 921px) {
          .row-wrap {
            width: calc(50% - 10px);
          }
          .row-wrap:first-child {
            margin-bottom: 0;
          }
        }
      </style>

      <div class="col-wrap">

        <div class="row-wrap">
          <div class="heading">
            <h2>Inventory</h2>
            <a class="mdc-icon-button material-icons" href="#/items">launch</a>
          </div>
          <vaadin-grid id="grid" expanded-items="{{expandedItems}}" height-by-rows rows-draggable theme="no-border no-row-borders no-row-padding" >
            <vaadin-grid-column>
              <template>
                <div class="item-wrap">
                  <vaadin-grid-tree-toggle level$=[[level]] leaf="[[!item.container]]" expanded="{{expanded}}"></vaadin-grid-tree-toggle>
                  <div class="item-wrap__name-wrap">
                    <span class$="[[_itemWrapNameClassname(item.isEdited)]]" on-click="_expandDetails">[[item.name]]
                      <span hidden$="[[!item.isEdited]]" class="item-wrap__edited">Edited</span>
                    </span>
                    <span class$="[[_itemWrapTypeClassname(item.fromBackground, item.fromClass)]]">
                      <span class="item-wrap__from" hidden$="[[!item.fromBackground]]">BG</span>
                      <span class="item-wrap__from" hidden$="[[!item.fromClass]]">Class</span>
                      <span>[[item.typeText]]<span hidden$="[[_noRarity(item.rarity)]]">, [[item.rarity]]</span></span>
                    </span>
                  </div>
                  <div class="item-wrap__checkboxes">
                    <span on-click="_setItemEquipped">
                      <vaadin-checkbox checked="[[item.isEquipped]]" hidden$="[[!item.canEquip]]">Equip</vaadin-checkbox>
                    </span>
                    <span on-click="_setItemAttuned">
                      <vaadin-checkbox checked="[[item.isAttuned]]" hidden$="[[!item.reqAttune]]">Attune</vaadin-checkbox>
                    </span>
                  </div>
                  <div class="mdc-buttom-icon material-icons item-wrap__close" on-click="_deleteItem">close</div>
                </div>
              </template>
            </vaadin-grid-column>
          </vaadin-grid>
        </div>
      </div>
    `;
  }
}

customElements.define("dnd-character-builder-equipment", DndCharacterBuilderEquipment);