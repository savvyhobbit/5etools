(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{114:function(e,t,a){"use strict";a.r(t),a.d(t,"renderSelection",(function(){return o}));var i=a(71),r=a(5),n=a(1);const s=new i.a;function o(e,t,a){(t.querySelector(".selection-wrapper")||t).innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="margin-bottom_small">\n\t\t\t<span class="type"></span><span class="rarity"></span>\n\t\t\t<span class="attunement"></span>\n\t\t</div>\n\t\t<div class="margin-bottom_small">\n\t\t\t<span class="value"></span><span class="weight"></span>\n\t\t</div>\n\t\t<div class="margin-bottom_small">\n\t\t\t<span class="damage"></span>\n\t\t\t<span class="damageType"></span>\n\t\t\t<span class="properties"></span>\n\t\t</div>\n\t\t<div class="text"></div>\n\t\t<div class="margin-bottom_small">Source: <span class="source"></span></div>\n\t</div>';const i=e.source,o=r.a.sourceJsonToFull(i);t.querySelector(".stats-wrapper .source").innerHTML=`${o}, page ${e.page}`,t.querySelector(".stats-wrapper .value").innerHTML=e.value?e.value+(e.weight?", ":""):"",t.querySelector(".stats-wrapper .weight").innerHTML=e.weight?e.weight+(1==e.weight?" lb.":" lbs."):"",t.querySelector(".stats-wrapper .rarity").innerHTML=(e.tier?", "+e.tier:"")+(e.rarity?", "+e.rarity:""),t.querySelector(".stats-wrapper .attunement").innerHTML=e.reqAttune?e.reqAttune:"",t.querySelector(".stats-wrapper .type").innerHTML=e.typeText,t.querySelector(".stats-wrapper .damage").innerHTML="",t.querySelector(".stats-wrapper .damageType").innerHTML="";const d=e.type||"";if(e.weaponCategory)e.dmg1&&(t.querySelector(".stats-wrapper .damage").innerHTML=Object(n.utils_makeRoller)(e.dmg1)),e.dmgType&&(t.querySelector(".stats-wrapper .damageType").innerHTML=r.a.dmgTypeToFull(e.dmgType));else if("LA"===d||"MA"===d||"HA"===d)t.querySelector(".stats-wrapper .damage").innerHTML="AC "+e.ac+("LA"===d?" + Dex":"MA"===d?" + Dex (max 2)":"");else if("S"===d)t.querySelector(".stats-wrapper .damage").innerHTML="AC +"+e.ac;else if("MNT"===d||"VEH"===d){const a=e.speed,i=e.carryingcapacity;a&&t.querySelector(".stats-wrapper .damage").append("Speed="+a),a&&i&&t.querySelector(".stats-wrapper .damage").append("MNT"===d?", ":"<br>"),i&&(t.querySelector(".stats-wrapper .damage").append("Carrying Capacity="+i),-1===i.indexOf("ton")&&-1===i.indexOf("passenger")&&t.querySelector(".stats-wrapper .damage").append(1==i?" lb.":" lbs."))}if(t.querySelector(".stats-wrapper .properties").innerHTML="",e.property){const a=e.property.split(",");for(let i=0;i<a.length;i++){const r=a[i];let s=window.itemPropertyList[r].name;"V"===r&&(s=`${s} (${Object(n.utils_makeRoller)(e.dmg2)})`),"T"!==r&&"A"!==r&&"AF"!==r||(s=`${s} (${e.range}ft.)`),"RLD"===r&&(s=`${s} (${e.reload} shots)`),s=(i>0?", ":e.dmg1?"- ":"")+s,t.querySelector(".stats-wrapper .properties").append(s)}}const l={type:"entries",entries:e.entries},p=[];s.recursiveEntryRender(l,p,1),t.querySelector(".stats-wrapper .text").innerHTML=Object(n.utils_makeRoller)(p.join("")).split(e.name.toLowerCase()).join("<i>"+e.name.toLowerCase()+"</i>"),a&&t.querySelector(".margin-bottom_small").remove()}},115:function(e,t,a){"use strict";a(77)},117:function(e,t,a){"use strict";a.r(t);var i=a(7),r=a(17),n=a(110),s=a(114),o=(a(115),a(45),a(50),a(51),a(13));const d=o.a`<dom-module id="lumo-text-area" theme-for="vaadin-text-area">
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
</dom-module>`;document.head.appendChild(d.content);a(77);var l=a(75),p=a(41),m=a(19);
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
class c extends(Object(p.a)(Object(l.a)(Object(m.a)(i.a)))){static get template(){return o.a`
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
`}static get is(){return"vaadin-text-area"}static get version(){return"2.6.2"}static get observers(){return["_textAreaValueChanged(value)"]}ready(){super.ready(),this._updateHeight(),this.addEventListener("animationend",this._onAnimationEnd)}_onAnimationEnd(e){0===e.animationName.indexOf("vaadin-text-area-appear")&&this._updateHeight()}get _slottedTagName(){return"textarea"}_textAreaValueChanged(e){this._updateHeight()}_updateHeight(){const e=this.root.querySelector("[part=input-field]"),t=e.scrollTop,a=this.inputElement,i=getComputedStyle(a).width,r=this.value?this.value.length:0;this._oldValueLength>=r&&(a.style.maxWidth=i,a.style.height="auto",e.style.display="block"),this._oldValueLength=r;const n=a.scrollHeight;n>a.clientHeight&&(a.style.height=n+"px"),a.style.removeProperty("max-width"),e.style.removeProperty("display"),e.scrollTop=t,this._dispatchIronResizeEventIfNeeded("InputHeight",n)}}customElements.define(c.is,c);class u extends i.a{static get properties(){return{isEditMode:{type:Boolean,value:!1},hasRenderedOutput:{type:Boolean,value:!1},item:{type:Object},storedItem:{type:Object},itemType:{type:String,value:""}}}static get observers(){return["_itemChanged(item)"]}constructor(){super(),this.itemTypes=["Armor","Simple Weapon","Martial Weapon","Shield","Wondrous Item","Adventuring Gear","Container"]}_itemChanged(){console.error("itemDetail:",this.item),this.item.storedItem&&(this.storedItem=this.item.storedItem),this.item.itemRef&&!this.item.lookupFailed?(this.hasRenderedOutput=!0,Object(s.renderSelection)(this.item,this.$.renderedOutput,!0)):this.hasRenderedOutput=!1,this.itemType=this._getItemType()}_getItemType(){if(this.item){if(this.item.armor)return"Armor";if("Simple"===this.item.weaponCategory)return"Simple Weapon";if("Martial"===this.item.weaponCategory)return"Martial Weapon";if("S"===this.item.type)return"Shield";if(this.item.container)return"Container";if("G"===this.item.type)return"Adventuring Gear"}return""}_selectItemType(){const e=this.$.typeSelect.value;switch(this.storedItem.armor=!1,this.storedItem.weaponCategory=void 0,this.storedItem.wondrous=!1,e){case"Armor":this.storedItem.armor=!0;break;case"Simple Weapon":this.storedItem.weaponCategory="Simple";break;case"Martial Weapon":this.storedItem.weaponCategory="Martial";break;case"Shield":this.storedItem.type="S";break;case"Wondrous":this.storedItem.wondrous=!0;break;case"Adventuring Gear":this.storedItem.type="G";break;case"Container":this.storedItem.container=!0}Object(r.kb)(this.item)}connectedCallback(){super.connectedCallback(),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(n.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(n.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(n.b)().removeEventListener("editModeChange",this.editModeHandler)}_updateItem(){Object(r.kb)(this.item)}_or(...e){for(let t of e)if(t)return!0;return!1}static get template(){return i.b`
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
    `}}customElements.define("dnd-character-builder-equipment-item-detail",u)}}]);
//# sourceMappingURL=11.bundle.js.map