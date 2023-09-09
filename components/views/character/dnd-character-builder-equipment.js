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
  addItem,
  saveCharacter
} from "../../../util/charBuilder";
import "../../dnd-icon";
import { dispatchEditModeChange, getEditModeChannel, isEditMode } from "../../../util/editMode";
import '@vaadin/polymer-legacy-adapter/template-renderer.js';
import "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-grid";
import "@vaadin/vaadin-grid/vaadin-grid-tree-toggle";
import "@vaadin/vaadin-grid/vaadin-grid-column";
import "../../styles/material-styles.js";
import "../../styles/my-styles.js";
import "@vaadin/vaadin-text-field/vaadin-integer-field";
import "./dnd-character-builder-equipment-item-detail";
import { clearRouteSubSelection, readRouteSubSelection, routeEventChannel, setRouteSubSelection } from "../../../util/routing";

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
        value: null,
        observer: '_activeItemChange'
      },
      currencyModalOpen: {
        type: Boolean,
        value: false
      },
      newPP: {
        type: Number,
      },
      newGP: {
        type: Number,
      },
      newEP: {
        type: Number,
      },
      newSP: {
        type: Number,
      },
      newCP: {
        type: Number,
      },
      new$: {
        type: Number,
      },
    };
  }

  static get observers() {
    return [
      '_expandedItemsChange(expandedItems.*)'
    ]
  }

  _activeItemChange(nextActiveItem, prevActiveItem) {
    if ((!prevActiveItem || !this.isMobile() )&& nextActiveItem) {
      this.previousScrollPosition = window.scrollY;
      if (this.getBoundingClientRect().y < 0) {
        const activeItemTop = window.scrollY + this.getBoundingClientRect().y - 57;
        setTimeout(() => {
          window.scrollTo(0, activeItemTop);
        }, 0);
      }
    } else if (!nextActiveItem && prevActiveItem && this.previousScrollPosition && this.isMobile()) {
      setTimeout(() => {
        window.scrollTo(0, this.previousScrollPosition);
        this.previousScrollPosition = 0;
      }, 0);
    }
  }

  isMobile() {
    return window.innerWidth <= 768;
  }

  _expandedItemsChange() {
    if (this.expandedItems && this.expandedItems.length) {
      this.expandedIds = this.expandedItems.filter(item => !!item).map((item) => item.uniqueId);
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.currencyTypes = ["Platinum", "Gold", "Silver", "Copper", "Dollars"];

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

    this.routeSubSelectionChangeHandler = ((e) => {
      const subSelection = e.detail.subSelection;
      if (this.inventory) {
        this.activeItem = getItemAtId(this.inventory, parseInt(subSelection));
      }
    }).bind(this);
    routeEventChannel().addEventListener('sub-selection-change', this.routeSubSelectionChangeHandler);

    this.routeSubSelectionDeselectedHandler = (() => {
      this.activeItem = undefined;
    }).bind(this);
    routeEventChannel().addEventListener('sub-selection-deselected', this.routeSubSelectionDeselectedHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    getCharacterChannel().removeEventListener("character-selected", this.characterChangeHandler);
    getEditModeChannel().removeEventListener('editModeChange', this.editModeHandler);
    routeEventChannel().removeEventListener('selection-change', this.routeSubSelectionDeselectedHandler);
    routeEventChannel().removeEventListener('sub-selection-change', this.routeSubSelectionChangeHandler);
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
          if ((draggedItem.containerCapacity || draggedItem.packContents) && isChild) {
            return;
          }

          const removeId = draggedItem.storedItem.uniqueId;
          draggedItem.storedItem.uniqueId = this.character.itemCounter ++;

          // Dropping into container
          if (e.detail.dropLocation === 'on-top') {
            if (dropTargetItem.containerCapacity || dropTargetItem.packContents) {
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
      this.set('currency', null);
      this.set('currency', character.currency);
      this.currencyIsDollars = !!character.currencyIsDollars;
      this.inventory = await getItems(character);
      console.error('inventory:', this.inventory);
      this.$.grid.clearCache();
      if (this.expandedIds) {
        const expandedItems = this.expandedIds.map((id) => {
          return getItemAtId(this.inventory, id);
        });
        this.expandedItems = expandedItems;
      }
      if (readRouteSubSelection()) {
        this.activeItem = getItemAtId(this.inventory, parseInt(readRouteSubSelection()));
      }
      this.dispatchEvent(new CustomEvent("loadingChange", { bubbles: true, composed: true }));
    }
  }

  _expandDetails(e) {
    let itemId = e.model.__data.item.uniqueId,
      stayClosed = readRouteSubSelection() === itemId;
    if (stayClosed) {
      clearRouteSubSelection();
    } else {
      setRouteSubSelection(itemId);
    }
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

  _deleteItem() {
    removeItem(this.deleteItemId);
    this._closeDeleteModal();
  }

  _closeDeleteModal() {
    this.deleteModalOpen = false;
    setTimeout(() => {
      this.deleteItemId = null;
      this.deleteItemName = null;
    }, 200);
  }
  
  _openDeleteModal(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.model.__data.item) {
      this.deleteItemId = e.model.__data.item.uniqueId;
      this.deleteItemName = e.model.__data.item.name;
    }
    this.deleteModalOpen = true;
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
    const newItemId = addItem({name: ''}, false);
    dispatchEditModeChange(true);
    setTimeout(() => {
      setRouteSubSelection(newItemId);
    }, 0);
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

  _openCurrencyModal() {
    this.currencyModalOpen = true;
  }

  _closeCurrencyModal() {
    this.newPP = null;
    this.newGP = null;
    this.newEP = null;
    this.newSP = null;
    this.newCP = null;
    this.new$ = null;
    this.currencyModalOpen = false;
  }

  _addCurrency() {
    if (!this.character.currency || Array.isArray(this.character.currency)) {
      this.character.currency = {};
    }
    if (this.character.currencyIsDollars) {
      this.character.currency.$  = parseInt(this.character.currency.$ || 0)  + parseInt(this.new$ || 0);
    } else {
      this.character.currency.pp = parseInt(this.character.currency.pp || 0) + parseInt(this.newPP || 0);
      this.character.currency.gp = parseInt(this.character.currency.gp || 0) + parseInt(this.newGP || 0);
      this.character.currency.ep = parseInt(this.character.currency.ep || 0) + parseInt(this.newEP || 0);
      this.character.currency.sp = parseInt(this.character.currency.sp || 0) + parseInt(this.newSP || 0);
      this.character.currency.cp = parseInt(this.character.currency.cp || 0) + parseInt(this.newCP || 0);
    }
    saveCharacter(this.character);
    this._closeCurrencyModal();
  }

  _removeCurrency() {
    if (this.character.currencyIsDollars) {
      if (parseInt(this.character.currency.$ || 0)  - parseInt(this.new$ || 0) < 0) {
        return false;
      }
      this.character.currency.$  = parseInt(this.character.currency.$ || 0)  - parseInt(this.new$ || 0);
    } else {
      if (parseInt(this.character.currency.pp || 0) - parseInt(this.newPP || 0) < 0 ||
          parseInt(this.character.currency.gp || 0) - parseInt(this.newGP || 0) < 0 ||
          parseInt(this.character.currency.ep || 0) - parseInt(this.newEP || 0) < 0 ||
          parseInt(this.character.currency.sp || 0) - parseInt(this.newSP || 0) < 0 || 
          parseInt(this.character.currency.cp || 0) - parseInt(this.newCP || 0) < 0) {
        return false;
      }
      this.character.currency.pp = parseInt(this.character.currency.pp || 0) - parseInt(this.newPP || 0);
      this.character.currency.gp = parseInt(this.character.currency.gp || 0) - parseInt(this.newGP || 0);
      this.character.currency.ep = parseInt(this.character.currency.ep || 0) - parseInt(this.newEP || 0);
      this.character.currency.sp = parseInt(this.character.currency.sp || 0) - parseInt(this.newSP || 0);
      this.character.currency.cp = parseInt(this.character.currency.cp || 0) - parseInt(this.newCP || 0);
    }
    saveCharacter(this.character);
    this._closeCurrencyModal();
  }

  _getCurrencyValue(key, currency) {
    return currency && currency[key] ? currency[key].toLocaleString() : 0;
  }

  _setCurrencyType(val) {
    this.character.currencyIsDollars = val.detail.checked;
    saveCharacter(this.character);
  }
  
  _currencyColor(currencyIsDollars) {
    return currencyIsDollars ? "Dollars" : "Gold";
  }
  
  _isActive(activeItem, item) {
    return activeItem === item;
  }

  _hasActive(activeItem) {
    return !!activeItem;
  }

  _clearSelection() {
    window.history.back();
  }

  _isLeaf(item) {
    return !item.containerCapacity && !item.packContents;
  }

  static get template() {
    return html`
      <style include="material-styles fa-styles"></style>
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
          border-top: 1px solid var(--_lumo-grid-secondary-border-color);
        }

        .heading {
          display: flex;
          flex-direction: row;
          align-items: center;
          border-bottom: 1px solid var(--lumo-contrast-10pct);
        }
        .reference-link {
          margin-left: auto;
          margin-right: 16px;
        }
        .mdc-icon-button:hover {
          color: var(--mdc-theme-primary);
        }
        .add-item {
          position: relative;
          margin-right: 12px;
        }
        .add-item__tiny {
          position: absolute;
          font-size: 14px;
          top: 2px;
          right: 4px;
        }

        .col-wrap {
          display: flex; 
          justify-content: space-between;
          flex-wrap: wrap;
        }

        .row-wrap {
          width: 100%;
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
          align-items: center;
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
          min-height: 28px;
        }
        .item-wrap__name-wrap:hover {
          color: var(--mdc-theme-primary);
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
          cursor: pointer;
          background: none;
          border: none;
          height: 100%;
          padding: 11px;
          margin-left: 5px;
          color: var(--mdc-theme-on-surface);
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
          margin: -13px 0 5px;
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

        .currency {
          margin: 20px 12px 20px;
          display: flex;
          margin-left: auto;
          align-items: center;
          width: fit-content;
        }
        .currency-change {
          margin-left: 12px;
        }
        .currency-wrap {
          padding-left: 30px;
          display: flex;
          justify-content: flex-end;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 10px;
        }
        .currency-item {
          display: flex;
          position: relative;
          align-items: baseline;
        }
        .currency-item__value {
          font-weight: bold;
          font-size: 24px;
          margin-right: 4px;
        }
        .currency-item__label {
          color: grey;
          font-size: 16px;
          font-weight: normal;
        }
        .currency-item__icon {
          margin-right: 4px;
          font-size: 18px;
          position: relative;
          top: -2px;
        }
        .currency-item--dollars .currency-item__value {
          font-size: 32px;
          font-weight: normal;
        }
        .currency-item--dollars .currency-item__icon {
          font-size: 32px;
          font-weight: normal;
          top: 0;
        }
        [currency="Dollars"] {
          color: green;
        }
        [currency="Electrum"] {
          color: #8898A4;
        }
        [currency="Platinum"] {
          color: #B2B2B2;
        }
        [currency="Gold"] {
          color: #ECA824;
        }
        [currency="Silver"] {
          color: #CEC6BF;
        }
        [currency="Copper"] {
          color: #C2876F;
        }
        .currency-item:focus .tooltip,
        .currency-item:hover .tooltip {
          display: block;
        }
        .currency-item:focus {
          outline: none;
        }
        .tooltip {
          position: absolute;
          background: lightgray;
          color: black;
          font-size: 14px;
          padding: 2px 10px;
          border-radius: 4px;
          white-space: nowrap;
          left: 5px;
          top: -32px;
          display: none;
        }
        .tooltip::after {
          content: '';
          height: 0;
          width: 0;
          position: absolute;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid lightgray;
          bottom: -4px;
          left: 2px;
        }

        @media(min-width: 420px) {
          .heading {
            justify-content: flex-start;
          }
        }

        @media(min-width: 921px) {
          .reference-link,
          .add-item {
            display: block !important;
          }
          .add-item {
            margin-right: calc(50% + 20px);
          }
          .item-wrap[active] {
            background: var(--lumo-primary-color-10pct);
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
        <button class="mdc-icon-button reference-link" hidden$="[[_hasActive(activeItem)]]" on-click="_linkClick">
          <dnd-icon icon="logout" type="material"></dnd-icon>
        </button>
        <button class="mdc-icon-button add-item" hidden$="[[_hasActive(activeItem)]]" on-click="_addItem">
          <dnd-icon icon="sack" tiny="plus"></dnd-icon>
        </button>
        <button class="mdc-icon-button close-item material-icons mdc-theme--on-header" hidden$="[[!_hasActive(activeItem)]]" on-click="_clearSelection">close</button>
      </div>
      <div class="col-wrap">
        <div class="row-wrap item-list-row" hidden$="[[_hasActive(activeItem)]]">
          <div class="currency">
            <div hidden$=[[currencyIsDollars]] class="currency-wrap">
              <div hidden$='[[!_getCurrencyValue("pp", currency)]]' class="currency-item" tabindex="0">
                <div class="currency-item__value">[[_getCurrencyValue("pp", currency)]]</div>
                <dnd-icon class="currency-item__icon" icon="coins" currency="Platinum"></dnd-icon>
                <div class="currency-item__label">pp</div>
                <div class="tooltip">1pp = 10gp</div>
              </div>
              <div hidden$='[[!_getCurrencyValue("gp", currency)]]' class="currency-item">
                <div class="currency-item__value">[[_getCurrencyValue("gp", currency)]]</div>
                <dnd-icon class="currency-item__icon" icon="coins" currency="Gold"></dnd-icon>
                <div class="currency-item__label">gp</div>
              </div>
              <div hidden$='[[!_getCurrencyValue("ep", currency)]]' class="currency-item" tabindex="0">
                <div class="currency-item__value">[[_getCurrencyValue("ep", currency)]]</div>
                <dnd-icon class="currency-item__icon" icon="coins" currency="Electrum"></dnd-icon>
                <div class="currency-item__label">ep</div>
                <div class="tooltip">1gp = 2ep</div>
              </div>
              <div hidden$='[[!_getCurrencyValue("sp", currency)]]' class="currency-item" tabindex="0">
                <div class="currency-item__value">[[_getCurrencyValue("sp", currency)]]</div>
                <dnd-icon class="currency-item__icon" icon="coins" currency="Silver"></dnd-icon>
                <div class="currency-item__label">sp</div>
                <div class="tooltip">1gp = 10sp</div>
              </div>
              <div class="currency-item" tabindex="0">
                <div class="currency-item__value">[[_getCurrencyValue("cp", currency)]]</div>
                <dnd-icon class="currency-item__icon" icon="coins" currency="Copper"></dnd-icon>
                <div class="currency-item__label">cp</div>
                <div class="tooltip">1gp = 100cp</div>
              </div>
            </div>
            <div hidden$=[[!currencyIsDollars]] class="currency-wrap">
              <div class="currency-item currency-item--dollars">
                <dnd-icon class="currency-item__icon" icon="dollar-sign" currency="Dollars"></dnd-icon>
                <div class="currency-item__value">[[_getCurrencyValue("$", currency)]]</div>
              </div>
            </div>
            <button class="currency-change mdc-icon-button" on-click="_openCurrencyModal">
              <dnd-icon icon="sack-dollar" tiny="plus"></dnd-icon>
            </button>

            <vaadin-dialog opened="{{currencyModalOpen}}">
              <template>
                <style>
                  [hidden] {
                    display: none !important;
                  }
                  h3 {
                    margin-top: 0;
                    margin-bottom: 30px;
                    display: flex;
                    min-width: 260px;
                  }
                  dnd-switch {
                    margin-left: auto;
                  }
                  dnd-icon {
                    font-size: 18px;
                  }
                  .modal-content {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                  }
                  .modal-footer {
                    display: flex;
                    justify-content: center;
                    margin-top: 20px;
                    flex-wrap: wrap;
                    gap: 20px;
                  }
                  .modal-footer dnd-button:first-child {
                    --mdc-theme-primary: var(--mdc-theme-error);
                  }
                  [currency="Dollars"] {
                    --mdc-theme-primary: green;
                  }
                  [currency="Electrum"] {
                    --mdc-theme-primary: #8898A4;
                  }
                  [currency="Platinum"] {
                    --mdc-theme-primary: #B2B2B2;
                  }
                  [currency="Gold"] {
                    --mdc-theme-primary: #ECA824;
                  }
                  [currency="Silver"] {
                    --mdc-theme-primary: #CEC6BF;
                  }
                  [currency="Copper"] {
                    --mdc-theme-primary: #C2876F;
                  }
                  vaadin-integer-field {
                    margin-top: 0;
                    width: 90px;
                  }
                  .dollars {
                    width: 160px;
                  }
                </style>
                <h3>
                  Adjust Currency
                  <dnd-switch no-color initial-value={{currencyIsDollars}} on-switch-change="_setCurrencyType">
                    <dnd-icon icon="coins" style="color: #ECA824;" slot="label"></dnd-icon>
                    <dnd-icon icon="dollar-sign" style="color: green;" slot="secondaryLabel"></dnd-icon>
                  </dnd-switch>
                </h3>
                <div class="modal-content" hidden$=[[currencyIsDollars]]>
                  <vaadin-integer-field theme="mini" padded has-controls min="0" id="pp" value="{{newPP}}" currency="Platinum" label="Platinum (pp)"></vaadin-integer-field>
                  <vaadin-integer-field theme="mini" padded has-controls min="0" id="gp" value="{{newGP}}" currency="Gold" label="Gold (gp)"></vaadin-integer-field>
                  <vaadin-integer-field theme="mini" padded has-controls min="0" id="ep" value="{{newEP}}" currency="Electrum" label="Electrum (ep)"></vaadin-integer-field>
                  <vaadin-integer-field theme="mini" padded has-controls min="0" id="sp" value="{{newSP}}" currency="Silver" label="Silver (sp)"></vaadin-integer-field>
                  <vaadin-integer-field theme="mini" padded has-controls min="0" id="cp" value="{{newCP}}" currency="Copper" label="Copper (cp)"></vaadin-integer-field>
                </div>
                <div class="modal-content" hidden$=[[!currencyIsDollars]]>
                  <vaadin-integer-field class="dollars" theme="mini" padded has-controls min="0" id="$" value="{{new$}}" currency="Dollars" label="Currency ($)"></vaadin-integer-field>
                </div>
                <div class="modal-footer">
                  <dnd-button label="Remove" border on-click="_removeCurrency"></dnd-button>
                  <dnd-button label="Add" currency$="[[_currencyColor(currencyIsDollars)]]" border on-click="_addCurrency"></dnd-button>
                  <!-- <dnd-button label="Cancel" border on-click="_closeCurrencyModal"></dnd-button> -->
                </div>
              </template>
            </vaadin-dialog>
          </div>

          <vaadin-grid id="grid" expanded-items="{{expandedItems}}" all-rows-visible rows-draggable theme="no-border no-row-borders no-row-padding">
            <vaadin-grid-column>
              <template>
                <div class="item-wrap" active$="[[_isActive(activeItem, item)]]">
                  <vaadin-grid-tree-toggle level$=[[level]] leaf="[[_isLeaf(item)]]" expanded="{{expanded}}" theme$=[[_toggleTheme(item)]]></vaadin-grid-tree-toggle>
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
                  <button class="mdc-icon-button item-wrap__close" hidden$="[[!isEditMode]]" on-click="_openDeleteModal"><i class="fas fa-trash"></i></button>
                </div>
              </template>
            </vaadin-grid-column>
          </vaadin-grid>
        </div>

        <vaadin-dialog opened="{{deleteModalOpen}}">
          <template>
            <style>
              .modal-content {
                display: flex;
                justify-content: center;
              }
              .modal-item {
                font-weight: bold;
                font-size: 16px;
              }
              .modal-footer {
                display: flex;
                justify-content: space-between;
                margin-top: 20px;
                gap: 20px;
              }
              .modal-footer dnd-button:last-child {
                --mdc-theme-primary: var(--mdc-theme-error);
              }
            </style>
            <div class="modal-content">Drop the item?</div>
            <div class="modal-content modal-item">[[deleteItemName]]</div>
            <div class="modal-footer">
              <dnd-button label="Cancel" border on-click="_closeDeleteModal"></dnd-button>
              <dnd-button label="Drop" border on-click="_deleteItem"></dnd-button>
            </div>
          </template>
        </vaadin-dialog>

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