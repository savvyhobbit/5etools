(window.webpackJsonp=window.webpackJsonp||[]).push([[5,11],{114:function(e,t,a){"use strict";a.r(t),a.d(t,"renderSelection",(function(){return s}));var i=a(71),r=a(5),n=a(1);const o=new i.a;function s(e,t,a){(t.querySelector(".selection-wrapper")||t).innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="margin-bottom_small">\n\t\t\t<span class="type"></span><span class="rarity"></span>\n\t\t\t<span class="attunement"></span>\n\t\t</div>\n\t\t<div class="margin-bottom_small">\n\t\t\t<span class="value"></span><span class="weight"></span>\n\t\t</div>\n\t\t<div class="margin-bottom_small">\n\t\t\t<span class="damage"></span>\n\t\t\t<span class="damageType"></span>\n\t\t\t<span class="properties"></span>\n\t\t</div>\n\t\t<div class="text"></div>\n\t\t<div class="margin-bottom_small">Source: <span class="source"></span></div>\n\t</div>';const i=e.source,s=r.a.sourceJsonToFull(i);t.querySelector(".stats-wrapper .source").innerHTML=`${s}, page ${e.page}`,t.querySelector(".stats-wrapper .value").innerHTML=e.value?e.value+(e.weight?", ":""):"",t.querySelector(".stats-wrapper .weight").innerHTML=e.weight?e.weight+(1==e.weight?" lb.":" lbs."):"",t.querySelector(".stats-wrapper .rarity").innerHTML=(e.tier?", "+e.tier:"")+(e.rarity?", "+e.rarity:""),t.querySelector(".stats-wrapper .attunement").innerHTML=e.reqAttune?e.reqAttune:"",t.querySelector(".stats-wrapper .type").innerHTML=e.typeText,t.querySelector(".stats-wrapper .damage").innerHTML="",t.querySelector(".stats-wrapper .damageType").innerHTML="";const d=e.type||"";if(e.weaponCategory)e.dmg1&&(t.querySelector(".stats-wrapper .damage").innerHTML=Object(n.utils_makeRoller)(e.dmg1)),e.dmgType&&(t.querySelector(".stats-wrapper .damageType").innerHTML=r.a.dmgTypeToFull(e.dmgType));else if("LA"===d||"MA"===d||"HA"===d)t.querySelector(".stats-wrapper .damage").innerHTML="AC "+e.ac+("LA"===d?" + Dex":"MA"===d?" + Dex (max 2)":"");else if("S"===d)t.querySelector(".stats-wrapper .damage").innerHTML="AC +"+e.ac;else if("MNT"===d||"VEH"===d){const a=e.speed,i=e.carryingcapacity;a&&t.querySelector(".stats-wrapper .damage").append("Speed="+a),a&&i&&t.querySelector(".stats-wrapper .damage").append("MNT"===d?", ":"<br>"),i&&(t.querySelector(".stats-wrapper .damage").append("Carrying Capacity="+i),-1===i.indexOf("ton")&&-1===i.indexOf("passenger")&&t.querySelector(".stats-wrapper .damage").append(1==i?" lb.":" lbs."))}if(t.querySelector(".stats-wrapper .properties").innerHTML="",e.property){const a=e.property.split(",");for(let i=0;i<a.length;i++){const r=a[i];let o=window.itemPropertyList[r].name;"V"===r&&(o=`${o} (${Object(n.utils_makeRoller)(e.dmg2)})`),"T"!==r&&"A"!==r&&"AF"!==r||(o=`${o} (${e.range}ft.)`),"RLD"===r&&(o=`${o} (${e.reload} shots)`),o=(i>0?", ":e.dmg1?"- ":"")+o,t.querySelector(".stats-wrapper .properties").append(o)}}const l={type:"entries",entries:e.entries},p=[];o.recursiveEntryRender(l,p,1),t.querySelector(".stats-wrapper .text").innerHTML=Object(n.utils_makeRoller)(p.join("")).split(e.name.toLowerCase()).join("<i>"+e.name.toLowerCase()+"</i>"),a&&t.querySelector(".margin-bottom_small").remove()}},115:function(e,t,a){"use strict";a(77)},116:function(e,t,a){"use strict";a(113),a(111)},117:function(e,t,a){"use strict";a.r(t);var i=a(7),r=a(17),n=a(110),o=a(114),s=(a(115),a(45),a(50),a(51),a(13));const d=s.a`<dom-module id="lumo-text-area" theme-for="vaadin-text-area">
  <template>
    <style include="lumo-text-field">
      [part="input-field"],
      [part="input-field"] ::slotted(textarea) {
        /* Equal to the implicit padding in vaadin-text-field */
        padding-top: calc((var(--lumo-text-field-size) - 1em * var(--lumo-line-height-s)) / 2);
        padding-bottom: calc((var(--lumo-text-field-size) - 1em * var(--lumo-line-height-s)) / 2);
        height: auto;
        box-sizing: border-box;
        transition: background-color 0.1s;
        line-height: var(--lumo-line-height-s);
      }

      :host(:not([readonly])) [part="input-field"]::after {
        display: none;
      }

      :host([readonly]) [part="input-field"] {
        border: 1px dashed var(--lumo-contrast-30pct);
      }

      :host([readonly]) [part="input-field"]::after {
        border: none;
      }

      :host(:hover:not([readonly]):not([focused])) [part="input-field"] {
        background-color: var(--lumo-contrast-20pct);
      }

      @media (pointer: coarse) {
        :host(:hover:not([readonly]):not([focused])) [part="input-field"] {
          background-color: var(--lumo-contrast-10pct);
        }

        :host(:active:not([readonly]):not([focused])) [part="input-field"] {
          background-color: var(--lumo-contrast-20pct);
        }
      }

      [part="value"],
      [part="input-field"] ::slotted(textarea) {
        line-height: inherit;
        --_lumo-text-field-overflow-mask-image: none;
      }

      /* Vertically align icon prefix/suffix with the first line of text */
      [part="input-field"] ::slotted(iron-icon) {
        margin-top: calc((var(--lumo-icon-size-m) - 1em * var(--lumo-line-height-s)) / -2);
      }

      [part="input-field"] [part="value"],
      [part="input-field"] ::slotted(textarea) {
        white-space: pre-wrap; /* override \`nowrap\` from <vaadin-text-field> */
        align-self: stretch; /* override \`baseline\` from <vaadin-text-field> */
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild(d.content);a(77);var l=a(75),p=a(41),c=a(19);
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
class m extends(Object(p.a)(Object(l.a)(Object(c.a)(i.a)))){static get template(){return s.a`
    <style include="vaadin-text-field-shared-styles">
      .vaadin-text-area-container {
        flex: auto;
        max-height: inherit; /* MSIE 11 */
        min-height: inherit; /* MSIE 11 */
      }

      /* The label and the error message should neither grow nor shrink. */
      [part="label"],
      [part="error-message"] {
        flex: none;
      }

      [part="input-field"] {
        overflow: auto;
        -webkit-overflow-scrolling: touch;
      }

      [part="value"] {
        resize: none;
      }

      [part="value"],
      [part="input-field"] ::slotted(*) {
        align-self: flex-start;
      }

      @keyframes vaadin-text-area-appear {
        to {
          opacity: 1;
        }
      }

      :host {
        animation: 1ms vaadin-text-area-appear;
      }
    </style>

    <div class="vaadin-text-area-container">

      <label part="label" on-click="focus" id="[[_labelId]]">[[label]]</label>

      <div part="input-field" id="[[_inputId]]">

        <slot name="prefix"></slot>

        <slot name="textarea">
          <textarea part="value"></textarea>
        </slot>

        <div part="clear-button" id="clearButton" role="button" aria-label\$="[[i18n.clear]]"></div>
        <slot name="suffix"></slot>

      </div>

      <div part="error-message" id="[[_errorId]]" aria-live="assertive" aria-hidden\$="[[_getErrorMessageAriaHidden(invalid, errorMessage, _errorId)]]">[[errorMessage]]</div>

    </div>
`}static get is(){return"vaadin-text-area"}static get version(){return"2.6.2"}static get observers(){return["_textAreaValueChanged(value)"]}ready(){super.ready(),this._updateHeight(),this.addEventListener("animationend",this._onAnimationEnd)}_onAnimationEnd(e){0===e.animationName.indexOf("vaadin-text-area-appear")&&this._updateHeight()}get _slottedTagName(){return"textarea"}_textAreaValueChanged(e){this._updateHeight()}_updateHeight(){const e=this.root.querySelector("[part=input-field]"),t=e.scrollTop,a=this.inputElement,i=getComputedStyle(a).width,r=this.value?this.value.length:0;this._oldValueLength>=r&&(a.style.maxWidth=i,a.style.height="auto",e.style.display="block"),this._oldValueLength=r;const n=a.scrollHeight;n>a.clientHeight&&(a.style.height=n+"px"),a.style.removeProperty("max-width"),e.style.removeProperty("display"),e.scrollTop=t,this._dispatchIronResizeEventIfNeeded("InputHeight",n)}}customElements.define(m.is,m);class h extends i.a{static get properties(){return{isEditMode:{type:Boolean,value:!1},hasRenderedOutput:{type:Boolean,value:!1},item:{type:Object},storedItem:{type:Object},itemType:{type:String,value:""}}}static get observers(){return["_itemChanged(item)"]}constructor(){super(),this.itemTypes=["Armor","Simple Weapon","Martial Weapon","Shield","Wondrous Item","Adventuring Gear","Container"]}_itemChanged(){console.error("itemDetail:",this.item),this.item.storedItem&&(this.storedItem=this.item.storedItem),this.item.itemRef&&!this.item.lookupFailed?(this.hasRenderedOutput=!0,Object(o.renderSelection)(this.item,this.$.renderedOutput,!0)):this.hasRenderedOutput=!1,this.itemType=this._getItemType()}_getItemType(){if(this.item){if(this.item.armor)return"Armor";if("Simple"===this.item.weaponCategory)return"Simple Weapon";if("Martial"===this.item.weaponCategory)return"Martial Weapon";if("S"===this.item.type)return"Shield";if(this.item.container)return"Container";if("G"===this.item.type)return"Adventuring Gear"}return""}_selectItemType(){const e=this.$.typeSelect.value;switch(this.storedItem.armor=!1,this.storedItem.weaponCategory=void 0,this.storedItem.wondrous=!1,e){case"Armor":this.storedItem.armor=!0;break;case"Simple Weapon":this.storedItem.weaponCategory="Simple";break;case"Martial Weapon":this.storedItem.weaponCategory="Martial";break;case"Shield":this.storedItem.type="S";break;case"Wondrous":this.storedItem.wondrous=!0;break;case"Adventuring Gear":this.storedItem.type="G";break;case"Container":this.storedItem.container=!0}Object(r.kb)(this.item)}connectedCallback(){super.connectedCallback(),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(n.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(n.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(n.b)().removeEventListener("editModeChange",this.editModeHandler)}_updateItem(){Object(r.kb)(this.item)}_or(...e){for(let t of e)if(t)return!0;return!1}static get template(){return i.b`
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
        h2 {
          margin-top: 0;
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
    `}}customElements.define("dnd-character-builder-equipment-item-detail",h)},125:function(e,t,a){"use strict";a(45),a(39);var i=a(13);const r=i.a`<dom-module id="lumo-grid-tree-toggle" theme-for="vaadin-grid-tree-toggle">
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
</dom-module>`;document.head.appendChild(r.content);var n=a(7),o=(a(31),a(15)),s=a(19),d=a(43),l=a(10);
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
const p=document.createElement("template");p.innerHTML="<custom-style>\n  <style>\n    @font-face {\n      font-family: \"vaadin-grid-tree-icons\";\n      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAQkAA0AAAAABrwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAECAAAABoAAAAcgHwa6EdERUYAAAPsAAAAHAAAAB4AJwAOT1MvMgAAAZQAAAA/AAAAYA8TBIJjbWFwAAAB8AAAAFUAAAFeGJvXWmdhc3AAAAPkAAAACAAAAAgAAAAQZ2x5ZgAAAlwAAABLAAAAhIrPOhFoZWFkAAABMAAAACsAAAA2DsJI02hoZWEAAAFcAAAAHQAAACQHAgPHaG10eAAAAdQAAAAZAAAAHAxVAgBsb2NhAAACSAAAABIAAAASAIAAVG1heHAAAAF8AAAAGAAAACAACgAFbmFtZQAAAqgAAAECAAACTwflzbdwb3N0AAADrAAAADYAAABZQ7Ajh3icY2BkYGAA4twv3Vfi+W2+MnCzMIDANSOmbGSa2YEZRHEwMIEoAAoiB6sAeJxjYGRgYD7w/wADAwsDCDA7MDAyoAI2AFEEAtIAAAB4nGNgZGBg4GBgZgDRDAxMDGgAAAGbABB4nGNgZp7JOIGBlYGBaSbTGQYGhn4IzfiawZiRkwEVMAqgCTA4MDA+38d84P8BBgdmIAapQZJVYGAEAGc/C54AeJxjYYAAxlAIzQTELAwMBxgZGB0ACy0BYwAAAHicY2BgYGaAYBkGRgYQiADyGMF8FgYbIM3FwMHABISMDArP9/3/+/8/WJXC8z0Q9v8nEp5gHVwMMMAIMo+RDYiZoQJMQIKJARUA7WBhGN4AACFKDtoAAAAAAAAAAAgACAAQABgAJgA0AEIAAHichYvBEYBADAKBVHBjBT4swl9KS2k05o0XHd/yW1hAfBFwCv9sIlJu3nZaNS3PXAaXXHI8Lge7DlzF7C1RgXc7xkK6+gvcD2URmQB4nK2RQWoCMRiFX3RUqtCli65yADModOMBLLgQSqHddRFnQghIAnEUvEA3vUUP0LP0Fj1G+yb8R5iEhO9/ef/7FwFwj28o9EthiVp4hBlehcfUP4Ur8o/wBAv8CU+xVFvhOR7UB7tUdUdlVRJ6HnHWTnhM/V24In8JT5j/KzzFSi2E53hUz7jCcrcIiDDwyKSW1JEct2HdIPH1DFytbUM0PofWdNk5E5oUqb/Q6HHBiVGZpfOXkyUMEj5IyBuNmYZQjBobfsuassvnkKLe1OuBBj0VQ8cRni2xjLWsHaM0jrjx3peYA0/vrdmUYqe9iy7bzrX6eNP7Jh1SijX+AaUVbB8AAHicY2BiwA84GBgYmRiYGJkZmBlZGFkZ2djScyoLMgzZS/MyDQwMwLSruZMzlHaB0q4A76kLlwAAAAEAAf//AA94nGNgZGBg4AFiMSBmYmAEQnYgZgHzGAAD6wA2eJxjYGBgZACCKxJigiD6mhFTNowGACmcA/8AAA==) format('woff');\n      font-weight: normal;\n      font-style: normal;\n    }\n  </style>\n</custom-style>",document.head.appendChild(p.content);class c extends(Object(s.a)(Object(d.a)(n.a))){static get template(){return i.a`
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
`}static get is(){return"vaadin-grid-tree-toggle"}static get properties(){return{level:{type:Number,value:0,observer:"_levelChanged"},leaf:{type:Boolean,value:!1,reflectToAttribute:!0},expanded:{type:Boolean,value:!1,reflectToAttribute:!0,notify:!0}}}ready(){super.ready(),this.addEventListener("click",e=>this._onClick(e))}_onClick(e){this.leaf||(e.preventDefault(),this.expanded=!this.expanded)}_levelChanged(e){const t=Number(e).toString();this.style["---level"]=t,this._debouncerUpdateLevel=o.a.debounce(this._debouncerUpdateLevel,l.c,()=>this.updateStyles({"---level":t}))}}customElements.define(c.is,c)},137:function(e,t,a){"use strict";a.r(t);var i=a(7),r=a(17),n=a(110);a(116),a(124),a(125),a(131),a(117);class o extends i.a{static get properties(){return{inventory:{type:Array},isEditMode:{type:Boolean,value:!1},character:{type:Object},expandedItems:{type:Array},expandedIds:{type:Array}}}static get observers(){return["_expandedItemsChange(expandedItems.*)"]}_expandedItemsChange(){this.expandedItems&&this.expandedItems.length&&(this.expandedIds=this.expandedItems.map(e=>e.uniqueId),console.error(this.expandedIds))}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(r.H)()),Object(r.m)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode,this.$.grid&&setTimeout(()=>{this.$.grid.notifyResize()},0)},Object(n.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(n.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(r.m)().removeEventListener("character-selected",this.characterChangeHandler),Object(n.b)().removeEventListener("editModeChange",this.editModeHandler)}ready(){super.ready(),setTimeout(()=>{const e=this.$.grid;let t;e.rowDetailsRenderer=((e,t,a)=>{e.firstElementChild||(e.innerHTML='<div class="details" id="stats">\n            <dnd-character-builder-equipment-item-detail></dnd-character-builder-equipment-item-detail>\n          </div>');e.querySelector("dnd-character-builder-equipment-item-detail").item=a.item}).bind(this),e.addEventListener("grid-dragstart",(function(a){t=a.detail.draggedItems[0],e.dropMode="on-top-or-between"})),e.addEventListener("grid-dragend",(function(a){t=e.dropMode=null})),e.addEventListener("grid-drop",e=>{const a=e.detail.dropTargetItem;if(t&&t!==a){const i=Object(r.O)(t,a.uniqueId);if(t.container&&i)return;const n=t.storedItem.uniqueId;if(t.storedItem.uniqueId=this.character.itemCounter++,"on-top"===e.detail.dropLocation&&a.container)return void(a.storedItem&&a.storedItem.children&&(a.storedItem.children.push(t.storedItem),Object(r.kb)(a,void 0,!0),Object(r.U)(n)));if(this.inventory){const i=""+a.id;let o=parseInt(i.substring(i.lastIndexOf("_")),10);"below"===e.detail.dropLocation&&o++,a.parentItemREF?(a.parentItemREF.storedItem.children.splice(o,0,t.storedItem),Object(r.kb)(a.parentItemREF,void 0,!0)):Object(r.ob)(o,t.storedItem),Object(r.U)(n)}}}),e.dataProvider=((e,t)=>{const a=e.page*e.pageSize;let i=e.parentItem?e.parentItem.children:this.inventory;if(i&&i.length){t(i.slice(a,a+e.pageSize),i.length)}}).bind(this)},0)}async updateFromCharacter(e){if(e){this.character=e,this.inventory=await Object(r.C)(e),console.error("inventory:",this.inventory);const t=window.scrollY;if(this.$.grid.clearCache(),this.openedItemID){const e=Object(r.B)(this.inventory,this.openedItemID);e&&this.$.grid.openItemDetails(e)}if(this.expandedIds){const e=this.expandedIds.map(e=>Object(r.B)(this.inventory,e));this.expandedItems=e}window.scrollTo(0,t),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}}_expandDetails(e){let t=e.model.__data.item,a=this.$.grid.detailsOpenedItems.indexOf(t)>-1;for(let e of this.$.grid.detailsOpenedItems)this.$.grid.closeItemDetails(e);a?this.$.grid.closeItemDetails(t):(this.$.grid.openItemDetails(t),this.openedItemID=t.uniqueId),this.$.grid.notifyResize()}_flashCheckbox(e){e&&(e.classList.add("transition-bg"),e.classList.add("flash-error"),setTimeout(()=>{e.classList.remove("flash-error"),setTimeout(()=>{e.classList.remove("transition-bg")},200)},200))}_deleteItem(e){let t=e.model.__data.item&&void 0!==e.model.__data.item.uniqueId?e.model.__data.item.uniqueId:void 0;Object(r.U)(t)}async _setItemEquipped(e){e.preventDefault(),e.stopPropagation();let t=e.model.__data.item,a=t?t.uniqueId:void 0;if(!!t&&t.isEquipped)Object(r.tb)(a);else if(await Object(r.e)(t))Object(r.tb)(a);else{let t=e.target.querySelector("vaadin-checkbox");this._flashCheckbox(t)}}async _setItemAttuned(e){e.preventDefault(),e.stopPropagation();let t=e.model.__data.item,a=t?t.uniqueId:void 0;if(!!t&&t.isAttuned)Object(r.sb)(a);else if(await Object(r.d)(t))Object(r.sb)(a);else{let t=e.target.querySelector("vaadin-checkbox");this._flashCheckbox(t)}}_preventDefault(e){e.preventDefault(),e.stopPropagation()}_or(...e){for(let t of e)if(t)return!0;return!1}_itemWrapTypeClassname(e,t){let a="item-wrap__type ";return e&&(a+="item-wrap__type--fromBackground"),t&&(a+="item-wrap__type--fromClass"),a}_itemWrapNameClassname(e){let t="item-wrap__name ";return e&&(t+="item-wrap__name--edited"),t}_noRarity(e){return!e||"None"===e}static get template(){return i.b`
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
    `}}customElements.define("dnd-character-builder-equipment",o)}}]);
//# sourceMappingURL=5.bundle.js.map