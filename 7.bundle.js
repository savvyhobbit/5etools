(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{167:function(e,t,r){"use strict";r(125);
/**
 * @license
 * Copyright (c) 2017 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
/**
 * @license
 * Copyright (c) 2017 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
r(122).a;console.warn('WARNING: Since Vaadin 23.2, "@vaadin/vaadin-checkbox" is deprecated. Use "@vaadin/checkbox" instead.')},173:function(e,t,r){"use strict";r(29),r(36),r(19);var i=r(2);Object(i.c)("vaadin-grid-tree-toggle",i.b`
    :host {
      --vaadin-grid-tree-toggle-level-offset: 2em;
      align-items: center;
      vertical-align: middle;
      transform: translateX(calc(var(--lumo-space-s) * -1));
      -webkit-tap-highlight-color: transparent;
    }

    :host(:not([leaf])) {
      cursor: default;
    }

    [part='toggle'] {
      display: inline-block;
      font-size: 1.5em;
      line-height: 1;
      width: 1em;
      height: 1em;
      text-align: center;
      color: var(--lumo-contrast-50pct);
      cursor: var(--lumo-clickable-cursor);
      /* Increase touch target area */
      padding: calc(1em / 3);
      margin: calc(1em / -3);
    }

    :host(:not([dir='rtl'])) [part='toggle'] {
      margin-right: 0;
    }

    @media (hover: hover) {
      :host(:hover) [part='toggle'] {
        color: var(--lumo-contrast-80pct);
      }
    }

    [part='toggle']::before {
      font-family: 'lumo-icons';
      display: inline-block;
      height: 100%;
    }

    :host(:not([expanded])) [part='toggle']::before {
      content: var(--lumo-icons-angle-right);
    }

    :host([expanded]) [part='toggle']::before {
      content: var(--lumo-icons-angle-right);
      transform: rotate(90deg);
    }

    /* Experimental support for hierarchy connectors, using an unsupported selector */
    :host([theme~='connectors']) #level-spacer {
      position: relative;
      z-index: -1;
      font-size: 1em;
      height: 1.5em;
    }

    :host([theme~='connectors']) #level-spacer::before {
      display: block;
      content: '';
      margin-top: calc(var(--lumo-space-m) * -1);
      height: calc(var(--lumo-space-m) + 3em);
      background-image: linear-gradient(
        to right,
        transparent calc(var(--vaadin-grid-tree-toggle-level-offset) - 1px),
        var(--lumo-contrast-10pct) calc(var(--vaadin-grid-tree-toggle-level-offset) - 1px)
      );
      background-size: var(--vaadin-grid-tree-toggle-level-offset) var(--vaadin-grid-tree-toggle-level-offset);
      background-position: calc(var(--vaadin-grid-tree-toggle-level-offset) / 2 - 2px) 0;
    }

    /* RTL specific styles */

    :host([dir='rtl']) {
      margin-left: 0;
      margin-right: calc(var(--lumo-space-s) * -1);
    }

    :host([dir='rtl']) [part='toggle'] {
      margin-left: 0;
    }

    :host([dir='rtl'][expanded]) [part='toggle']::before {
      transform: rotate(-90deg);
    }

    :host([dir='rtl'][theme~='connectors']) #level-spacer::before {
      background-image: linear-gradient(
        to left,
        transparent calc(var(--vaadin-grid-tree-toggle-level-offset) - 1px),
        var(--lumo-contrast-10pct) calc(var(--vaadin-grid-tree-toggle-level-offset) - 1px)
      );
      background-position: calc(100% - (var(--vaadin-grid-tree-toggle-level-offset) / 2 - 2px)) 0;
    }

    :host([dir='rtl']:not([expanded])) [part='toggle']::before,
    :host([dir='rtl'][expanded]) [part='toggle']::before {
      content: var(--lumo-icons-angle-left);
    }
  `,{moduleId:"lumo-grid-tree-toggle"});var n=r(3),a=r(25),c=r(108);
/**
 * @license
 * Copyright (c) 2016 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const o=document.createElement("template");o.innerHTML="\n  <style>\n    @font-face {\n      font-family: \"vaadin-grid-tree-icons\";\n      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAQkAA0AAAAABrwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAECAAAABoAAAAcgHwa6EdERUYAAAPsAAAAHAAAAB4AJwAOT1MvMgAAAZQAAAA/AAAAYA8TBIJjbWFwAAAB8AAAAFUAAAFeGJvXWmdhc3AAAAPkAAAACAAAAAgAAAAQZ2x5ZgAAAlwAAABLAAAAhIrPOhFoZWFkAAABMAAAACsAAAA2DsJI02hoZWEAAAFcAAAAHQAAACQHAgPHaG10eAAAAdQAAAAZAAAAHAxVAgBsb2NhAAACSAAAABIAAAASAIAAVG1heHAAAAF8AAAAGAAAACAACgAFbmFtZQAAAqgAAAECAAACTwflzbdwb3N0AAADrAAAADYAAABZQ7Ajh3icY2BkYGAA4twv3Vfi+W2+MnCzMIDANSOmbGSa2YEZRHEwMIEoAAoiB6sAeJxjYGRgYD7w/wADAwsDCDA7MDAyoAI2AFEEAtIAAAB4nGNgZGBg4GBgZgDRDAxMDGgAAAGbABB4nGNgZp7JOIGBlYGBaSbTGQYGhn4IzfiawZiRkwEVMAqgCTA4MDA+38d84P8BBgdmIAapQZJVYGAEAGc/C54AeJxjYYAAxlAIzQTELAwMBxgZGB0ACy0BYwAAAHicY2BgYGaAYBkGRgYQiADyGMF8FgYbIM3FwMHABISMDArP9/3/+/8/WJXC8z0Q9v8nEp5gHVwMMMAIMo+RDYiZoQJMQIKJARUA7WBhGN4AACFKDtoAAAAAAAAAAAgACAAQABgAJgA0AEIAAHichYvBEYBADAKBVHBjBT4swl9KS2k05o0XHd/yW1hAfBFwCv9sIlJu3nZaNS3PXAaXXHI8Lge7DlzF7C1RgXc7xkK6+gvcD2URmQB4nK2RQWoCMRiFX3RUqtCli65yADModOMBLLgQSqHddRFnQghIAnEUvEA3vUUP0LP0Fj1G+yb8R5iEhO9/ef/7FwFwj28o9EthiVp4hBlehcfUP4Ur8o/wBAv8CU+xVFvhOR7UB7tUdUdlVRJ6HnHWTnhM/V24In8JT5j/KzzFSi2E53hUz7jCcrcIiDDwyKSW1JEct2HdIPH1DFytbUM0PofWdNk5E5oUqb/Q6HHBiVGZpfOXkyUMEj5IyBuNmYZQjBobfsuassvnkKLe1OuBBj0VQ8cRni2xjLWsHaM0jrjx3peYA0/vrdmUYqe9iy7bzrX6eNP7Jh1SijX+AaUVbB8AAHicY2BiwA84GBgYmRiYGJkZmBlZGFkZ2djScyoLMgzZS/MyDQwMwLSruZMzlHaB0q4A76kLlwAAAAEAAf//AA94nGNgZGBg4AFiMSBmYmAEQnYgZgHzGAAD6wA2eJxjYGBgZACCKxJigiD6mhFTNowGACmcA/8AAA==) format('woff');\n      font-weight: normal;\n      font-style: normal;\n    }\n  </style>\n",document.head.appendChild(o.content);class l extends(Object(i.a)(Object(a.a)(n.a))){static get template(){return n.b`
      <style>
        :host {
          display: inline-flex;
          align-items: baseline;
          max-width: 100%;

          /* CSS API for :host */
          --vaadin-grid-tree-toggle-level-offset: 1em;
          --_collapsed-icon: '\\e7be\\00a0';
        }

        :host([dir='rtl']) {
          --_collapsed-icon: '\\e7bd\\00a0';
        }

        :host([hidden]) {
          display: none !important;
        }

        :host(:not([leaf])) {
          cursor: pointer;
        }

        #level-spacer,
        [part='toggle'] {
          flex: none;
        }

        #level-spacer {
          display: inline-block;
          width: calc(var(---level, '0') * var(--vaadin-grid-tree-toggle-level-offset));
        }

        [part='toggle']::before {
          font-family: 'vaadin-grid-tree-icons';
          line-height: 1em; /* make icon font metrics not affect baseline */
        }

        :host(:not([expanded])) [part='toggle']::before {
          content: var(--_collapsed-icon);
        }

        :host([expanded]) [part='toggle']::before {
          content: '\\e7bc\\00a0'; /* icon glyph + single non-breaking space */
        }

        :host([leaf]) [part='toggle'] {
          visibility: hidden;
        }

        slot {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      </style>

      <span id="level-spacer"></span>
      <span part="toggle"></span>
      <slot></slot>
    `}static get is(){return"vaadin-grid-tree-toggle"}static get properties(){return{level:{type:Number,value:0,observer:"_levelChanged"},leaf:{type:Boolean,value:!1,reflectToAttribute:!0},expanded:{type:Boolean,value:!1,reflectToAttribute:!0,notify:!0}}}ready(){super.ready(),this.addEventListener("click",e=>this._onClick(e))}_onClick(e){this.leaf||Object(c.b)(e.target)||e.target instanceof HTMLLabelElement||(e.preventDefault(),this.expanded=!this.expanded)}_levelChanged(e){const t=Number(e).toString();this.style.setProperty("---level",t)}}customElements.define(l.is,l)},179:function(e,t,r){"use strict";r.r(t);var i=r(3),n=r(32),a=(r(174),r(73)),c=(r(129),r(167),r(128),r(173),r(137),r(166),r(172),r(9));class o extends i.a{static get properties(){return{inventory:{type:Array},isEditMode:{type:Boolean,value:!1},character:{type:Object},expandedItems:{type:Array},expandedIds:{type:Array},activeItem:{type:Object,value:null,observer:"_activeItemChange"},currencyModalOpen:{type:Boolean,value:!1},newPP:{type:Number},newGP:{type:Number},newEP:{type:Number},newSP:{type:Number},newCP:{type:Number},new$:{type:Number}}}static get observers(){return["_expandedItemsChange(expandedItems.*)"]}_activeItemChange(e,t){if(t&&this.isMobile()||!e)!e&&t&&this.previousScrollPosition&&this.isMobile()&&setTimeout(()=>{window.scrollTo(0,this.previousScrollPosition),this.previousScrollPosition=0},0);else if(this.previousScrollPosition=window.scrollY,this.getBoundingClientRect().y<0){const e=window.scrollY+this.getBoundingClientRect().y-57;setTimeout(()=>{window.scrollTo(0,e)},0)}}isMobile(){return window.innerWidth<=768}_expandedItemsChange(){this.expandedItems&&this.expandedItems.length&&(this.expandedIds=this.expandedItems.filter(e=>!!e).map(e=>e.uniqueId))}connectedCallback(){super.connectedCallback(),this.currencyTypes=["Platinum","Gold","Silver","Copper","Dollars"],this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(n.T)()),Object(n.q)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode,this.$.grid&&setTimeout(()=>{this.$.grid.notifyResize()},0)},Object(a.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(a.c)(),this.routeSubSelectionChangeHandler=(e=>{const t=e.detail.subSelection;this.inventory&&(this.activeItem=Object(n.N)(this.inventory,parseInt(t)))}).bind(this),Object(c.h)().addEventListener("sub-selection-change",this.routeSubSelectionChangeHandler),this.routeSubSelectionDeselectedHandler=(()=>{this.activeItem=void 0}).bind(this),Object(c.h)().addEventListener("sub-selection-deselected",this.routeSubSelectionDeselectedHandler)}disconnectedCallback(){super.disconnectedCallback(),Object(n.q)().removeEventListener("character-selected",this.characterChangeHandler),Object(a.b)().removeEventListener("editModeChange",this.editModeHandler),Object(c.h)().removeEventListener("selection-change",this.routeSubSelectionDeselectedHandler),Object(c.h)().removeEventListener("sub-selection-change",this.routeSubSelectionChangeHandler)}ready(){super.ready(),setTimeout(()=>{const e=this.$.grid;let t;e.addEventListener("grid-dragstart",(function(r){t=r.detail.draggedItems[0],e.dropMode="on-top-or-between"})),e.addEventListener("grid-dragend",(function(r){t=e.dropMode=null})),e.addEventListener("grid-drop",e=>{const r=e.detail.dropTargetItem;if(t&&t!==r){const i=Object(n.eb)(t,r.uniqueId);if((t.containerCapacity||t.packContents)&&i)return;const a=t.storedItem.uniqueId;if(t.storedItem.uniqueId=this.character.itemCounter++,"on-top"===e.detail.dropLocation&&(r.containerCapacity||r.packContents))return void(r.storedItem&&r.storedItem.children&&(r.storedItem.children.push(t.storedItem),Object(n.Db)(r,void 0,!0),Object(n.lb)(a)));if(this.inventory){const i=""+r.id;let c=parseInt(i.substring(i.lastIndexOf("_")),10);"below"===e.detail.dropLocation&&c++,r.parentItemREF?(r.parentItemREF.storedItem.children.splice(c,0,t.storedItem),Object(n.Db)(r.parentItemREF,void 0,!0)):Object(n.Hb)(c,t.storedItem),Object(n.lb)(a)}}}),e.dataProvider=((e,t)=>{const r=e.page*e.pageSize;let i=e.parentItem?e.parentItem.children:this.inventory;if(i&&i.length){t(i.slice(r,r+e.pageSize),i.length)}}).bind(this)},0)}async updateFromCharacter(e){if(e){if(this.character=e,this.set("currency",null),this.set("currency",e.currency),this.currencyIsDollars=!!e.currencyIsDollars,this.inventory=await Object(n.O)(e),console.error("inventory:",this.inventory),this.$.grid.clearCache(),this.expandedIds){const e=this.expandedIds.map(e=>Object(n.N)(this.inventory,e));this.expandedItems=e}Object(c.f)()&&(this.activeItem=Object(n.N)(this.inventory,parseInt(Object(c.f)()))),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}}_expandDetails(e){let t=e.model.__data.item.uniqueId;Object(c.f)()===t?Object(c.b)():Object(c.j)(t)}_flashCheckbox(e){e&&(e.classList.add("transition-bg"),e.classList.add("flash-error"),setTimeout(()=>{e.classList.remove("flash-error"),setTimeout(()=>{e.classList.remove("transition-bg")},200)},200))}_deleteItem(){Object(n.lb)(this.deleteItemId),this._closeDeleteModal()}_closeDeleteModal(){this.deleteModalOpen=!1,setTimeout(()=>{this.deleteItemId=null,this.deleteItemName=null},200)}_openDeleteModal(e){e.preventDefault(),e.stopPropagation(),e.model.__data.item&&(this.deleteItemId=e.model.__data.item.uniqueId,this.deleteItemName=e.model.__data.item.name),this.deleteModalOpen=!0}async _setItemEquipped(e){e.preventDefault(),e.stopPropagation();let t=e.model.__data.item,r=t?t.uniqueId:void 0;if(!!t&&t.isEquipped)Object(n.Tb)(r);else if(await Object(n.h)(t))Object(n.Tb)(r);else{let t=e.target.querySelector("vaadin-checkbox");this._flashCheckbox(t)}}async _setItemAttuned(e){e.preventDefault(),e.stopPropagation();let t=e.model.__data.item,r=t?t.uniqueId:void 0;if(!!t&&t.isAttuned)Object(n.Sb)(r);else if(await Object(n.g)(t))Object(n.Sb)(r);else{let t=e.target.querySelector("vaadin-checkbox");this._flashCheckbox(t)}}_quantityChange(e){const t=this.$.grid.getEventContext(e).item;let r=parseInt(t.quantity,10);isNaN(r)&&(r=0),t.storedItem.quantity=r,Object(n.Db)(t)}_addItem(){const e=Object(n.e)({name:""},!1);Object(a.a)(!0),setTimeout(()=>{Object(c.j)(e)},0)}_preventDefault(e){e.preventDefault(),e.stopPropagation()}_or(...e){for(let t of e)if(t)return!0;return!1}_noRarity(e){return!e||"None"===e}_toggleTheme(e){return e.children&&0===e.children.length?"no-children":""}_linkClick(){this.dispatchEvent(new CustomEvent("open-drawer",{bubbles:!0,composed:!0,detail:{viewId:"items"}}))}_openCurrencyModal(){this.currencyModalOpen=!0}_closeCurrencyModal(){this.newPP=null,this.newGP=null,this.newEP=null,this.newSP=null,this.newCP=null,this.new$=null,this.currencyModalOpen=!1}_addCurrency(){this.character.currency&&!Array.isArray(this.character.currency)||(this.character.currency={}),this.character.currencyIsDollars?this.character.currency.$=parseInt(this.character.currency.$||0)+parseInt(this.new$||0):(this.character.currency.pp=parseInt(this.character.currency.pp||0)+parseInt(this.newPP||0),this.character.currency.gp=parseInt(this.character.currency.gp||0)+parseInt(this.newGP||0),this.character.currency.ep=parseInt(this.character.currency.ep||0)+parseInt(this.newEP||0),this.character.currency.sp=parseInt(this.character.currency.sp||0)+parseInt(this.newSP||0),this.character.currency.cp=parseInt(this.character.currency.cp||0)+parseInt(this.newCP||0)),Object(n.ob)(this.character),this._closeCurrencyModal()}_removeCurrency(){if(this.character.currencyIsDollars){if(parseInt(this.character.currency.$||0)-parseInt(this.new$||0)<0)return!1;this.character.currency.$=parseInt(this.character.currency.$||0)-parseInt(this.new$||0)}else{if(parseInt(this.character.currency.pp||0)-parseInt(this.newPP||0)<0||parseInt(this.character.currency.gp||0)-parseInt(this.newGP||0)<0||parseInt(this.character.currency.ep||0)-parseInt(this.newEP||0)<0||parseInt(this.character.currency.sp||0)-parseInt(this.newSP||0)<0||parseInt(this.character.currency.cp||0)-parseInt(this.newCP||0)<0)return!1;this.character.currency.pp=parseInt(this.character.currency.pp||0)-parseInt(this.newPP||0),this.character.currency.gp=parseInt(this.character.currency.gp||0)-parseInt(this.newGP||0),this.character.currency.ep=parseInt(this.character.currency.ep||0)-parseInt(this.newEP||0),this.character.currency.sp=parseInt(this.character.currency.sp||0)-parseInt(this.newSP||0),this.character.currency.cp=parseInt(this.character.currency.cp||0)-parseInt(this.newCP||0)}Object(n.ob)(this.character),this._closeCurrencyModal()}_getCurrencyValue(e,t){return t&&t[e]?t[e].toLocaleString():0}_setCurrencyType(e){this.character.currencyIsDollars=e.detail.checked,Object(n.ob)(this.character)}_currencyColor(e){return e?"Dollars":"Gold"}_isActive(e,t){return e===t}_hasActive(e){return!!e}_clearSelection(){window.history.back()}_isLeaf(e){return!e.containerCapacity&&!e.packContents}static get template(){return i.b`
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
          margin-right: auto;
        }
        .mdc-icon-button:hover {
          color: var(--mdc-theme-primary);
        }
        .add-item {
          position: relative;
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
          margin: 20px 0;
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
          .reference-link {
            margin-left: 8px;
          }
        }

        @media(min-width: 921px) {
          .reference-link,
          .add-item {
            display: block !important;
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
        <button class="mdc-icon-button reference-link material-icons" hidden$="[[_hasActive(activeItem)]]" on-click="_linkClick">logout</button>
        <button class="mdc-icon-button add-item" hidden$="[[_hasActive(activeItem)]]" on-click="_addItem">
          <dnd-icon class="add-item__tiny" icon="plus"></dnd-icon>
          <dnd-icon icon="sack"></dnd-icon>
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
            <button class="currency-change mdc-icon-button" on-click="_openCurrencyModal"><dnd-icon icon="sack-dollar"></dnd-icon></button>

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
                    margin-top: 30px;
                    flex-wrap: wrap;
                  }
                  .modal-footer dnd-button:last-child {
                    /* margin: 12px auto 0; */
                    --mdc-theme-primary: var(--mdc-theme-error);
                  }
                  .modal-footer dnd-button:not(:last-child) {
                    margin-right: 12px;
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
                  <dnd-button label="Add" currency$="[[_currencyColor(currencyIsDollars)]]" border on-click="_addCurrency"></dnd-button>
                  <dnd-button label="Remove" border on-click="_removeCurrency"></dnd-button>
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
              }
              .modal-footer dnd-button:first-child {
                margin-right: 40px;
                --mdc-theme-primary: var(--mdc-theme-error);
              }
            </style>
            <div class="modal-content">Remove the item?</div>
            <div class="modal-content modal-item">[[deleteItemName]]</div>
            <div class="modal-footer">
              <dnd-button label="Delete" border on-click="_deleteItem"></dnd-button>
              <dnd-button label="Cancel" border on-click="_closeDeleteModal"></dnd-button>
            </div>
          </template>
        </vaadin-dialog>

        <div class="row-wrap details-row" hidden$="[[!_hasActive(activeItem)]]">
          <div class="details-wrap">          
            <dnd-character-builder-equipment-item-detail item="{{activeItem}}"></dnd-character-builder-equipment-item-detail>
          </div>
        </div>
      </div>
    `}}customElements.define("dnd-character-builder-equipment",o)}}]);
//# sourceMappingURL=7.bundle.js.map