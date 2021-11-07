(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{114:function(e,t,i){"use strict";i(113),i(109)},124:function(e,t,i){"use strict";i(45),i(39);var a=i(13);const n=a.a`<dom-module id="lumo-grid-tree-toggle" theme-for="vaadin-grid-tree-toggle">
  <template>
    <style>
      :host {
        --vaadin-grid-tree-toggle-level-offset: 2em;
        align-items: center;
        vertical-align: middle;
        margin-left: calc(var(--lumo-space-s) * -1);
        -webkit-tap-highlight-color: transparent;
      }

      :host(:not([leaf])) {
        cursor: default;
      }

      [part="toggle"] {
        display: inline-block;
        font-size: 1.5em;
        line-height: 1;
        width: 1em;
        height: 1em;
        text-align: center;
        color: var(--lumo-contrast-50pct);
        /* Increase touch target area */
        padding: calc(1em / 3);
        margin: calc(1em / -3);
      }

      :host(:not([dir="rtl"])) [part="toggle"] {
        margin-right: 0;
      }

      @media (hover: hover) {
        :host(:hover) [part="toggle"] {
          color: var(--lumo-contrast-80pct);
        }
      }

      [part="toggle"]::before {
        font-family: "lumo-icons";
        display: inline-block;
        height: 100%;
      }

      :host(:not([expanded])) [part="toggle"]::before {
        content: var(--lumo-icons-angle-right);
      }

      :host([expanded]) [part="toggle"]::before {
        content: var(--lumo-icons-angle-right);
        transform: rotate(90deg);
      }

      /* Experimental support for hierarchy connectors, using an unsupported selector */
      :host([theme~="connectors"]) #level-spacer {
        position: relative;
        z-index: -1;
        font-size: 1em;
        height: 1.5em;
      }

      :host([theme~="connectors"]) #level-spacer::before {
        display: block;
        content: "";
        margin-top: calc(var(--lumo-space-m) * -1);
        height: calc(var(--lumo-space-m) + 3em);
        background-image: linear-gradient(to right, transparent calc(var(--vaadin-grid-tree-toggle-level-offset) - 1px), var(--lumo-contrast-10pct) calc(var(--vaadin-grid-tree-toggle-level-offset) - 1px));
        background-size: var(--vaadin-grid-tree-toggle-level-offset) var(--vaadin-grid-tree-toggle-level-offset);
        background-position: calc(var(--vaadin-grid-tree-toggle-level-offset) / 2 - 2px) 0;
      }

      /* RTL specific styles */

      :host([dir="rtl"]) {
        margin-left: 0;
        margin-right: calc(var(--lumo-space-s) * -1);
      }

      :host([dir="rtl"]) [part="toggle"] {
        margin-left: 0;
      }

      :host([dir="rtl"][expanded]) [part="toggle"]::before {
        transform: rotate(-90deg);
      }

      :host([dir="rtl"][theme~="connectors"]) #level-spacer::before {
        background-image: linear-gradient(to left, transparent calc(var(--vaadin-grid-tree-toggle-level-offset) - 1px), var(--lumo-contrast-10pct) calc(var(--vaadin-grid-tree-toggle-level-offset) - 1px));
        background-position: calc(100% - (var(--vaadin-grid-tree-toggle-level-offset) / 2 - 2px)) 0;
      }

      :host([dir="rtl"]:not([expanded])) [part="toggle"]::before,
      :host([dir="rtl"][expanded]) [part="toggle"]::before {
        content: var(--lumo-icons-angle-left);
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild(n.content);var r=i(7),o=(i(30),i(15)),s=i(19),d=i(43),l=i(9);
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
const c=document.createElement("template");c.innerHTML="<custom-style>\n  <style>\n    @font-face {\n      font-family: \"vaadin-grid-tree-icons\";\n      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAQkAA0AAAAABrwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAECAAAABoAAAAcgHwa6EdERUYAAAPsAAAAHAAAAB4AJwAOT1MvMgAAAZQAAAA/AAAAYA8TBIJjbWFwAAAB8AAAAFUAAAFeGJvXWmdhc3AAAAPkAAAACAAAAAgAAAAQZ2x5ZgAAAlwAAABLAAAAhIrPOhFoZWFkAAABMAAAACsAAAA2DsJI02hoZWEAAAFcAAAAHQAAACQHAgPHaG10eAAAAdQAAAAZAAAAHAxVAgBsb2NhAAACSAAAABIAAAASAIAAVG1heHAAAAF8AAAAGAAAACAACgAFbmFtZQAAAqgAAAECAAACTwflzbdwb3N0AAADrAAAADYAAABZQ7Ajh3icY2BkYGAA4twv3Vfi+W2+MnCzMIDANSOmbGSa2YEZRHEwMIEoAAoiB6sAeJxjYGRgYD7w/wADAwsDCDA7MDAyoAI2AFEEAtIAAAB4nGNgZGBg4GBgZgDRDAxMDGgAAAGbABB4nGNgZp7JOIGBlYGBaSbTGQYGhn4IzfiawZiRkwEVMAqgCTA4MDA+38d84P8BBgdmIAapQZJVYGAEAGc/C54AeJxjYYAAxlAIzQTELAwMBxgZGB0ACy0BYwAAAHicY2BgYGaAYBkGRgYQiADyGMF8FgYbIM3FwMHABISMDArP9/3/+/8/WJXC8z0Q9v8nEp5gHVwMMMAIMo+RDYiZoQJMQIKJARUA7WBhGN4AACFKDtoAAAAAAAAAAAgACAAQABgAJgA0AEIAAHichYvBEYBADAKBVHBjBT4swl9KS2k05o0XHd/yW1hAfBFwCv9sIlJu3nZaNS3PXAaXXHI8Lge7DlzF7C1RgXc7xkK6+gvcD2URmQB4nK2RQWoCMRiFX3RUqtCli65yADModOMBLLgQSqHddRFnQghIAnEUvEA3vUUP0LP0Fj1G+yb8R5iEhO9/ef/7FwFwj28o9EthiVp4hBlehcfUP4Ur8o/wBAv8CU+xVFvhOR7UB7tUdUdlVRJ6HnHWTnhM/V24In8JT5j/KzzFSi2E53hUz7jCcrcIiDDwyKSW1JEct2HdIPH1DFytbUM0PofWdNk5E5oUqb/Q6HHBiVGZpfOXkyUMEj5IyBuNmYZQjBobfsuassvnkKLe1OuBBj0VQ8cRni2xjLWsHaM0jrjx3peYA0/vrdmUYqe9iy7bzrX6eNP7Jh1SijX+AaUVbB8AAHicY2BiwA84GBgYmRiYGJkZmBlZGFkZ2djScyoLMgzZS/MyDQwMwLSruZMzlHaB0q4A76kLlwAAAAEAAf//AA94nGNgZGBg4AFiMSBmYmAEQnYgZgHzGAAD6wA2eJxjYGBgZACCKxJigiD6mhFTNowGACmcA/8AAA==) format('woff');\n      font-weight: normal;\n      font-style: normal;\n    }\n  </style>\n</custom-style>",document.head.appendChild(c.content);class p extends(Object(s.a)(Object(d.a)(r.a))){static get template(){return a.a`
    <style>
      :host {
        display: inline-flex;
        align-items: baseline;

        /* CSS API for :host */
        --vaadin-grid-tree-toggle-level-offset: 1em;

        /*
          ShadyCSS seems to polyfill :dir(rtl) only for :host, thus using
          a host custom CSS property for ltr/rtl toggle icon choice.
         */
        ---collapsed-icon: "\\e7be\\00a0";
      }

      :host(:dir(rtl)) {
        ---collapsed-icon: "\\e7bd\\00a0";
      }

      :host([hidden]) {
        display: none !important;
      }

      :host(:not([leaf])) {
        cursor: pointer;
      }

      #level-spacer,
      [part="toggle"] {
        flex: none;
      }

      #level-spacer {
        display: inline-block;
        width: calc(var(---level, '0') * var(--vaadin-grid-tree-toggle-level-offset));
      }

      [part="toggle"]::before {
        font-family: "vaadin-grid-tree-icons";
        line-height: 1em; /* make icon font metrics not affect baseline */
      }

      :host(:not([expanded])) [part="toggle"]::before {
        content: var(---collapsed-icon);
      }

      :host([expanded]) [part="toggle"]::before {
        content: "\\e7bc\\00a0"; /* icon glyph + single non-breaking space */
      }

      :host([leaf]) [part="toggle"] {
        visibility: hidden;
      }
    </style>

    <span id="level-spacer"></span>
    <span part="toggle"></span>
    <slot></slot>
`}static get is(){return"vaadin-grid-tree-toggle"}static get properties(){return{level:{type:Number,value:0,observer:"_levelChanged"},leaf:{type:Boolean,value:!1,reflectToAttribute:!0},expanded:{type:Boolean,value:!1,reflectToAttribute:!0,notify:!0}}}ready(){super.ready(),this.addEventListener("click",e=>this._onClick(e))}_onClick(e){this.leaf||(e.preventDefault(),this.expanded=!this.expanded)}_levelChanged(e){const t=Number(e).toString();this.style["---level"]=t,this._debouncerUpdateLevel=o.a.debounce(this._debouncerUpdateLevel,l.c,()=>this.updateStyles({"---level":t}))}}customElements.define(p.is,p)},137:function(e,t,i){"use strict";i.r(t);var a=i(7),n=i(17),r=i(111);i(114),i(121),i(124),i(132),i(123);class o extends a.a{static get properties(){return{inventory:{type:Array},isEditMode:{type:Boolean,value:!1},character:{type:Object},expandedItems:{type:Array},expandedIds:{type:Array}}}static get observers(){return["_expandedItemsChange(expandedItems.*)"]}_expandedItemsChange(){this.expandedItems&&this.expandedItems.length&&(this.expandedIds=this.expandedItems.filter(e=>!!e).map(e=>e.uniqueId),console.error(this.expandedIds),this.openedItemID&&(this.$.grid.closeItemDetails(this.openedItemID),this.openedItemID=void 0)),window.scrollTo(0,this.originalScrollHeight)}_recordScrollHeight(){this.originalScrollHeight=window.scrollY}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(n.F)()),Object(n.l)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode,this.$.grid&&setTimeout(()=>{this.$.grid.notifyResize()},0)},Object(r.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(r.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(n.l)().removeEventListener("character-selected",this.characterChangeHandler),Object(r.b)().removeEventListener("editModeChange",this.editModeHandler)}ready(){super.ready(),setTimeout(()=>{const e=this.$.grid;let t;e.rowDetailsRenderer=((e,t,i)=>{e.firstElementChild||(e.innerHTML='<div class="details" id="stats">\n            <dnd-character-builder-equipment-item-detail></dnd-character-builder-equipment-item-detail>\n          </div>');e.querySelector("dnd-character-builder-equipment-item-detail").item=i.item}).bind(this),e.addEventListener("grid-dragstart",(function(i){t=i.detail.draggedItems[0],e.dropMode="on-top-or-between"})),e.addEventListener("grid-dragend",(function(i){t=e.dropMode=null})),e.addEventListener("grid-drop",e=>{const i=e.detail.dropTargetItem;if(t&&t!==i){const a=Object(n.M)(t,i.uniqueId);if(t.container&&a)return;const r=t.storedItem.uniqueId;if(t.storedItem.uniqueId=this.character.itemCounter++,"on-top"===e.detail.dropLocation&&i.container)return void(i.storedItem&&i.storedItem.children&&(i.storedItem.children.push(t.storedItem),Object(n.kb)(i,void 0,!0),Object(n.T)(r)));if(this.inventory){const a=""+i.id;let o=parseInt(a.substring(a.lastIndexOf("_")),10);"below"===e.detail.dropLocation&&o++,i.parentItemREF?(i.parentItemREF.storedItem.children.splice(o,0,t.storedItem),Object(n.kb)(i.parentItemREF,void 0,!0)):Object(n.ob)(o,t.storedItem),Object(n.T)(r)}}}),e.dataProvider=((e,t)=>{const i=e.page*e.pageSize;let a=e.parentItem?e.parentItem.children:this.inventory;if(a&&a.length){t(a.slice(i,i+e.pageSize),a.length)}}).bind(this)},0)}async updateFromCharacter(e){if(e){this.character=e,this.inventory=await Object(n.B)(e),console.error("inventory:",this.inventory);const t=window.scrollY;if(this.$.grid.clearCache(),this.openedItemID){const e=Object(n.A)(this.inventory,this.openedItemID.uniqueId);e&&this.$.grid.openItemDetails(e)}if(this.expandedIds){const e=this.expandedIds.map(e=>Object(n.A)(this.inventory,e));this.expandedItems=e}window.scrollTo(0,t),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}}_expandDetails(e){let t=e.model.__data.item,i=this.$.grid.detailsOpenedItems.indexOf(t)>-1;const a=window.scrollY;for(let e of this.$.grid.detailsOpenedItems)this.$.grid.closeItemDetails(e);i?(this.$.grid.closeItemDetails(t),this.openedItemID=void 0):(this.$.grid.openItemDetails(t),this.openedItemID=t),this.$.grid.notifyResize(),window.scrollTo(0,a)}_flashCheckbox(e){e&&(e.classList.add("transition-bg"),e.classList.add("flash-error"),setTimeout(()=>{e.classList.remove("flash-error"),setTimeout(()=>{e.classList.remove("transition-bg")},200)},200))}_deleteItem(e){let t=e.model.__data.item&&void 0!==e.model.__data.item.uniqueId?e.model.__data.item.uniqueId:void 0;Object(n.T)(t)}async _setItemEquipped(e){e.preventDefault(),e.stopPropagation();let t=e.model.__data.item,i=t?t.uniqueId:void 0;if(!!t&&t.isEquipped)Object(n.tb)(i);else if(await Object(n.e)(t))Object(n.tb)(i);else{let t=e.target.querySelector("vaadin-checkbox");this._flashCheckbox(t)}}async _setItemAttuned(e){e.preventDefault(),e.stopPropagation();let t=e.model.__data.item,i=t?t.uniqueId:void 0;if(!!t&&t.isAttuned)Object(n.sb)(i);else if(await Object(n.d)(t))Object(n.sb)(i);else{let t=e.target.querySelector("vaadin-checkbox");this._flashCheckbox(t)}}_quantityChange(e){console.log(e);const t=this.$.grid.getEventContext(e).item;let i=parseInt(t.quantity,10);isNaN(i)&&(i=0),t.storedItem.quantity=i,Object(n.kb)(t)}_preventDefault(e){e.preventDefault(),e.stopPropagation()}_or(...e){for(let t of e)if(t)return!0;return!1}_noRarity(e){return!e||"None"===e}_toggleTheme(e){return e.children&&0===e.children.length?"no-children":""}static get template(){return a.b`
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


        @media(min-width: 420px) {
          .heading {
            justify-content: flex-start;
          }
          .reference-link {
            margin-left: 8px;
          }
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
            <a class="reference-link mdc-icon-button material-icons" href="#/items">launch</a>
          </div>
          <vaadin-grid id="grid" expanded-items="{{expandedItems}}" height-by-rows rows-draggable theme="no-border no-row-borders no-row-padding" >
            <vaadin-grid-column>
              <template>
                <div class="item-wrap">
                  <vaadin-grid-tree-toggle level$=[[level]] leaf="[[!item.container]]" expanded="{{expanded}}" theme$=[[_toggleTheme(item)]] on-click='_recordScrollHeight'></vaadin-grid-tree-toggle>
                  <div class="item-wrap__name-wrap" on-click="_expandDetails">
                    <span class="item-wrap__name">[[item.name]]
                      <span hidden$="[[!item.isEdited]]" class="item-wrap__edited">Edited</span>
                    </span>
                    <span class="item-wrap__type">
                      <span class="item-wrap__from" hidden$="[[!item.fromBackground]]">BG</span>
                      <span class="item-wrap__from" hidden$="[[!item.fromClass]]">Class</span>
                      <span>[[item.typeText]]<span hidden$="[[_noRarity(item.rarity)]]">, [[item.rarity]]</span></span>
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
      </div>
    `}}customElements.define("dnd-character-builder-equipment",o)}}]);
//# sourceMappingURL=11.bundle.js.map