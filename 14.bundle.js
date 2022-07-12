(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{160:function(e,t,i){"use strict";i.r(t);var a=i(7),n=i(17),r=i(142);i(145),i(134),i(151),i(170),i(150);class d extends a.a{static get properties(){return{inventory:{type:Array},isEditMode:{type:Boolean,value:!1},character:{type:Object},expandedItems:{type:Array},expandedIds:{type:Array},activeItem:{type:Object},isMobile:{type:Boolean}}}static get observers(){return["_expandedItemsChange(expandedItems.*)"]}_expandedItemsChange(){this.expandedItems&&this.expandedItems.length&&(this.expandedIds=this.expandedItems.filter(e=>!!e).map(e=>e.uniqueId),console.error(this.expandedIds),this.openedItemID&&(this.$.grid.closeItemDetails(this.openedItemID),this.openedItemID=void 0)),window.scrollTo(0,this.originalScrollHeight)}_recordScrollHeight(e){this.originalScrollHeight=window.scrollY}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(n.F)()),Object(n.l)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode,this.$.grid&&setTimeout(()=>{this.$.grid.notifyResize()},0)},Object(r.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(r.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(n.l)().removeEventListener("character-selected",this.characterChangeHandler),Object(r.b)().removeEventListener("editModeChange",this.editModeHandler)}ready(){super.ready(),this._checkBreakpoint(),window.addEventListener("resize",()=>{this._checkBreakpoint()}),setTimeout(()=>{const e=this.$.grid;let t;e.addEventListener("grid-dragstart",(function(i){t=i.detail.draggedItems[0],e.dropMode="on-top-or-between"})),e.addEventListener("grid-dragend",(function(i){t=e.dropMode=null})),e.addEventListener("grid-drop",e=>{const i=e.detail.dropTargetItem;if(t&&t!==i){const a=Object(n.M)(t,i.uniqueId);if(t.container&&a)return;const r=t.storedItem.uniqueId;if(t.storedItem.uniqueId=this.character.itemCounter++,"on-top"===e.detail.dropLocation&&i.container)return void(i.storedItem&&i.storedItem.children&&(i.storedItem.children.push(t.storedItem),Object(n.kb)(i,void 0,!0),Object(n.T)(r)));if(this.inventory){const a=""+i.id;let d=parseInt(a.substring(a.lastIndexOf("_")),10);"below"===e.detail.dropLocation&&d++,i.parentItemREF?(i.parentItemREF.storedItem.children.splice(d,0,t.storedItem),Object(n.kb)(i.parentItemREF,void 0,!0)):Object(n.nb)(d,t.storedItem),Object(n.T)(r)}}}),e.dataProvider=((e,t)=>{const i=e.page*e.pageSize;let a=e.parentItem?e.parentItem.children:this.inventory;if(a&&a.length){t(a.slice(i,i+e.pageSize),a.length)}}).bind(this)},0)}async updateFromCharacter(e){if(e){this.character=e,this.inventory=await Object(n.C)(e),console.error("inventory:",this.inventory);const t=window.scrollY;if(this.$.grid.clearCache(),this.openedItemID){const e=Object(n.B)(this.inventory,this.openedItemID.uniqueId);e&&this.$.grid.openItemDetails(e)}if(this.expandedIds){const e=this.expandedIds.map(e=>Object(n.B)(this.inventory,e));this.expandedItems=e}this.activeItem&&(this.activeItem=Object(n.B)(this.inventory,this.activeItem.uniqueId)),window.scrollTo(0,t),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}}_expandDetails(e){let t=e.model.__data.item,i=this.$.grid.detailsOpenedItems.indexOf(t)>-1;const a=window.scrollY;for(let e of this.$.grid.detailsOpenedItems)this.$.grid.closeItemDetails(e);i?(this.$.grid.closeItemDetails(t),this.openedItemID=void 0):(this.$.grid.openItemDetails(t),this.openedItemID=t),this.$.grid.notifyResize(),window.scrollTo(0,a)}_flashCheckbox(e){e&&(e.classList.add("transition-bg"),e.classList.add("flash-error"),setTimeout(()=>{e.classList.remove("flash-error"),setTimeout(()=>{e.classList.remove("transition-bg")},200)},200))}_deleteItem(e){let t=e.model.__data.item&&void 0!==e.model.__data.item.uniqueId?e.model.__data.item.uniqueId:void 0;Object(n.T)(t)}async _setItemEquipped(e){e.preventDefault(),e.stopPropagation();let t=e.model.__data.item,i=t?t.uniqueId:void 0;if(!!t&&t.isEquipped)Object(n.ub)(i);else if(await Object(n.f)(t))Object(n.ub)(i);else{let t=e.target.querySelector("vaadin-checkbox");this._flashCheckbox(t)}}async _setItemAttuned(e){e.preventDefault(),e.stopPropagation();let t=e.model.__data.item,i=t?t.uniqueId:void 0;if(!!t&&t.isAttuned)Object(n.tb)(i);else if(await Object(n.e)(t))Object(n.tb)(i);else{let t=e.target.querySelector("vaadin-checkbox");this._flashCheckbox(t)}}_quantityChange(e){const t=this.$.grid.getEventContext(e).item;let i=parseInt(t.quantity,10);isNaN(i)&&(i=0),t.storedItem.quantity=i,Object(n.kb)(t)}_addItem(){Object(n.c)({},!1)}_preventDefault(e){e.preventDefault(),e.stopPropagation()}_or(...e){for(let t of e)if(t)return!0;return!1}_noRarity(e){return!e||"None"===e}_toggleTheme(e){return e.children&&0===e.children.length?"no-children":""}_checkBreakpoint(){const e=this.$.grid;this.isMobile=window.innerWidth<921,this.isMobile?e.rowDetailsRenderer=((e,t,i)=>{i.detailsOpened&&(e.firstElementChild||(e.innerHTML='<div class="details"></div>'),this.detailEl||(this.detailEl=document.createElement("dnd-character-builder-equipment-item-detail"),this.detailEl.smallRender=!0,this.detailEl.unique=Date.now()),e.querySelector(".details").appendChild(this.detailEl),this.detailEl.item=i.item)}).bind(this):e.rowDetailsRenderer&&(console.error("removing rowDetailsRenderer"),e.rowDetailsRenderer=()=>{})}_isActive(e,t){return e===t}static get template(){return a.b`
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
          margin-bottom: 200px;
        }

        .heading {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--lumo-contrast-10pct);
        }
        .reference-link:hover {
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
        }

        .details-wrap {
          display: none;
          font-size: 14px;
          background: var(--lumo-contrast-10pct);
          border-radius: 4px;
          line-height: 1.5;
          padding: 14px;
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
          .details-wrap {
            display: block;
          }
        }
      </style>

      <div class="heading">
        <h2>Inventory</h2>
        <a class="reference-link mdc-icon-button material-icons" href="#/items">launch</a>
      </div>
      <div class="col-wrap">
        <div class="row-wrap">
          <vaadin-grid id="grid" expanded-items="{{expandedItems}}" active-item="{{activeItem}}" height-by-rows rows-draggable theme="no-border no-row-borders no-row-padding" >
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
                      <vaadin-checkbox checked="[[item.isEquipped]]" hidden$="[[!item.canEquip]]">Equip</vaadin-checkbox>
                    </span>
                    <span on-click="_setItemAttuned">
                      <vaadin-checkbox checked="[[item.isAttuned]]" hidden$="[[!item.reqAttune]]">Attune</vaadin-checkbox>
                    </span>
                  </div>
                  <div hidden$="[[!item.hasQuantity]]" class="item-wrap__quantity">
                    <vaadin-integer-field min="0" value="{{item.quantity}}" theme="mini" has-controls on-change="_quantityChange"></vaadin-integer-field>
                  </div>
                  <div class="mdc-buttom-icon material-icons item-wrap__close" on-click="_deleteItem">close</div>
                </div>
              </template>
            </vaadin-grid-column>
          </vaadin-grid>
        </div>
        <template is="dom-if" if="[[!isMobile]]">
          <div class="row-wrap details-row" hidden$="[[!activeItem]]">
            <div class="details-wrap">          
              <dnd-character-builder-equipment-item-detail small-render item="{{activeItem}}"></dnd-character-builder-equipment-item-detail>
            </div>
          </div>
        </template>
      </div>
    `}}customElements.define("dnd-character-builder-equipment",d)}}]);
//# sourceMappingURL=14.bundle.js.map