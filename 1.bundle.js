(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{146:function(e,t,i){"use strict";var a=i(3),s=i(32),n=i(1),l=(i(90),i(40));class o extends a.a{static get properties(){return{test:{type:Boolean,reflectToAttribute:!0,value:!1},options:{type:Array,observer:"optionsUpdated"},model:{type:String},addCallback:{type:Function},value:{type:String,value:"",observer:"valueUpdated"},choices:{type:Number,observer:"choicesUpdated"},paren:{type:String},label:{type:String},placeholder:{type:String},multiValue:{type:String,value:""},disabled:{type:Boolean,value:!1,reflectToAttribute:!0}}}choicesUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}optionsUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}valueUpdated(){if(this.choices)if(Array.isArray(this.value)&&this.options){const e=this.value.map(e=>-1!==this.options.indexOf(e)?this.options.indexOf(e):this.options.findIndex(t=>t.name===e.name&&t.source===e.source)).filter(e=>-1!==e);this.listBox&&(this.listBox.selectedValues=e),this.multiValue=e.map(e=>{let t=this.options[e];return t.name?t.name:Object(n.util_capitalizeAll)(t)}).join(", ")}else this.listBox&&(this.listBox.selectedValues=[]),this.multiValue="";else this.value&&this.options?this.value.source?this.$.select.value=this.options.findIndex(e=>e.name===this.value.name&&e.source===this.value.source||e===this.value.name)+"":this.value.name?this.$.select.value=this.options.findIndex(e=>e.name===this.value.name||e===this.value.name)+"":this.$.select.value=this.options.findIndex(e=>e.name===this.value||e===this.value)+"":this.$.select.value=""}ready(){super.ready(),setTimeout(async()=>{this.model&&(this.options=await Object(l.b)(this.model)),this.$.select.renderer=(e,t)=>{if(!this.listBox){if(this.listBox=document.createElement("vaadin-list-box"),this.choices&&(this.listBox.setAttribute("multiple",!0),this.listBox.addEventListener("click",e=>{t.opened=!0;let i=null!==e.srcElement.getAttribute("selected");setTimeout(()=>{this.listBox.selectedValues.length>this.choices&&!i&&this.listBox.selectedValues.splice(this.listBox.selectedValues.length-2,1);let e=this.listBox.selectedValues.map(e=>this.options[e]);this.multiValue=e.map(e=>e.name?e.name:Object(n.util_capitalizeAll)(e)).join(", "),this.addCallback&&this.addCallback(e)},0)})),this.options&&this.options.length)for(let e=0;e<this.options.length;e++){const t=this.options[e],i=document.createElement("vaadin-item"),a=t.name||Object(n.util_capitalizeAll)(t);i.innerHTML=`<span style='margin-left: 10px;'>${a}</span> ${t.name?`<span style='font-size: 14px;color: var(--lumo-primary-color-50pct);'>${t.source}</span>`:""}`,i.setAttribute("value",e),this.listBox.appendChild(i)}e.appendChild(this.listBox),this.$.select._assignMenuElement(),this.valueUpdated()}}},0)}connectedCallback(){super.connectedCallback(),this.selectChangeHandler=()=>{const e=this.$.select.value;if(e&&!this.choices){const t=this.options[e];this.addCallback?this.addCallback(t,this.model):Object(s.X)(void 0,t,this.model),this.value||(this.$.select.value="")}},this.$.select.addEventListener("change",this.selectChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),this.$.select.removeEventListener("change",this.selectChangeHandler)}_exists(e){return!!e}_label(e,t,i){let a="";return e&&(a=e,t&&1!==t&&100!==t&&(a+=` (pick ${t})`),i&&(a+=` (${i})`)),a}static get template(){return a.b`
      <style>
        :host {
          display: inline-block;
        }
        [slot="prefix"] {
          width: calc(100% - 46px);
          padding: 12px;
          line-height: 1.4;
        }
        vaadin-select {
          width: 100%;
        }
        .prefix {
          white-space: normal;
          color: var(--lumo-body-text-color);
        }
      </style>
      <vaadin-select test$="[[test]]" theme="dark" add id="select" label="[[_label(label, choices, paren)]]" placeholder="[[placeholder]]" disabled$="[[disabled]]">
        <div hidden$="[[!_exists(multiValue)]]" slot="prefix">
          <span class="prefix">[[multiValue]]</span>
        </div>
      </vaadin-select>
      
    `}}customElements.define("dnd-select-add",o)},147:function(e,t,i){"use strict";i(78)},149:function(e,t,i){"use strict";i.r(t);var a=i(3),s=i(32),n=i(143),l=i(112),o=i(0),d=i(1),r=(i(147),i(37),i(59),i(60),i(7));const m=r.a`<dom-module id="lumo-text-area" theme-for="vaadin-text-area">
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
</dom-module>`;document.head.appendChild(m.content);i(78);var h=i(95),c=i(35),p=i(20);
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
class u extends(Object(c.a)(Object(h.a)(Object(p.a)(a.a)))){static get template(){return r.a`
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
`}static get is(){return"vaadin-text-area"}static get version(){return"2.6.2"}static get observers(){return["_textAreaValueChanged(value)"]}ready(){super.ready(),this._updateHeight(),this.addEventListener("animationend",this._onAnimationEnd)}_onAnimationEnd(e){0===e.animationName.indexOf("vaadin-text-area-appear")&&this._updateHeight()}get _slottedTagName(){return"textarea"}_textAreaValueChanged(e){this._updateHeight()}_updateHeight(){const e=this.root.querySelector("[part=input-field]"),t=e.scrollTop,i=this.inputElement,a=getComputedStyle(i).width,s=this.value?this.value.length:0;this._oldValueLength>=s&&(i.style.maxWidth=a,i.style.height="auto",e.style.display="block"),this._oldValueLength=s;const n=i.scrollHeight;n>i.clientHeight&&(i.style.height=n+"px"),i.style.removeProperty("max-width"),e.style.removeProperty("display"),e.scrollTop=t,this._dispatchIronResizeEventIfNeeded("InputHeight",n)}}customElements.define(u.is,u);var v=i(2);i(146),i(88);class g extends a.a{static get properties(){return{isEditMode:{type:Boolean,value:!1},hasRenderedOutput:{type:Boolean,value:!1},hasAC:{type:Boolean,value:!1},armorAC:{type:Number,value:0},isArmor:{type:Boolean,value:!1},isMartial:{type:Boolean,value:!1},weaponMagicModifier:{type:Number,value:0},itemRarity:{type:String},itemName:{type:String},itemWeight:{type:Number,value:0},weaponProperties:{type:Array},itemResist:{type:String},itemQuantity:{type:Number,value:0},item:{type:Object},storedItem:{type:Object},itemType:{type:String,value:""},smallRender:{type:Boolean,reflectToAttribute:!0,value:!1}}}static get observers(){return["_itemChanged(item)"]}constructor(){super(),this.itemTypes=["Currency","Armor (Light)","Armor (Medium)","Armor (Heavy)","Melee Weapon","Ranged Weapon","Shield","Adventuring Gear","Ammunition","Artisan Tool","Explosive","Gaming Set","Instrument","Mount","Potion","Rod","Ring","Scroll","Spellcasting Focus","Tool","Tack and Harness","Trade Good","Vehicle","Wand"],this.rarityTypes=o.A,this.damageTypes=o.k,this.resistTypes=["<None>",...o.k],this.weaponPropertyOptions=[{name:"Two-Handed",value:"2H"},{name:"Ammunition",value:"A"},{name:"Finesse",value:"F"},{name:"Heavy",value:"H"},{name:"Light",value:"L"},{name:"Loading",value:"LD"},{name:"Reach",value:"R"},{name:"Reload",value:"RLD"},{name:"Special",value:"S"},{name:"Thrown",value:"T"},{name:"Versatile",value:"V"}],this.weaponPropertyValues=["Two-Handed","Ammunition","Finesse","Heavy","Light","Loading","Reach","Reload","Special","Thrown","Versatile"]}connectedCallback(){super.connectedCallback(),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(n.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(n.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(n.b)().removeEventListener("editModeChange",this.editModeHandler)}_itemChanged(){if(this.item){if(console.error("itemDetail:",this.item),this.item.itemRef&&!this.item.lookupFailed?(this.hasRenderedOutput=!0,Object(l.renderSelection)(this.item,this.$.renderedOutput,void 0,this.smallRender)):this.hasRenderedOutput=!1,this.itemType=this._getItemType(),this.hasAC="S"===this.item.type||!!this.item.armor,this.hasAC&&(this.armorAC=this.item.ac),this.isArmor=!!this.item.armor,this.isMartial="Martial"===this.item.weaponCategory,this.item.weapon){this.weaponMagicModifier=parseInt(this.item.genericBonus,10);const e=this.item.property;if(e){const t=e.split(",").map(e=>{const t=this.weaponPropertyOptions.find(t=>t.value===e.trim());if(t)return t.name}).filter(e=>!!e);this.weaponProperties=t,this.item.damages||(this.item.dmg1?this.item.storedItem.damages=[{roll:this.item.dmg1,type:Object(d.util_capitalizeAll)(v.a.dmgTypeToFull(this.item.dmgType))}]:this.item.storedItem.damages=[])}}this.itemRarity=this.item.rarity,this.itemName=this.item.name,this.itemWeight=this.item.weight,this.canHaveResist=this.item.armor||"P"===this.item.type||"RG"===this.item.type,this.itemResist=this.item.resist,this.canHaveQuantity="P"===this.item.type||"A"===this.item.type||"EXP"===this.item.type||"$"===this.item.type,this.itemQuantity=this.item.quantity||1,this.canHaveSpell="SC"===this.item.type,this.item.storedItem&&(this.storedItem=this.item.storedItem)}}_getItemType(){return this.item?v.a.ITEM_TYPE_JSON_TO_ABV[this.item.type]:""}_selectItemType(){const e=this.root.querySelector("#typeSelect").value;switch(this.storedItem.armor=!1,this.storedItem.weapon=!1,this.storedItem.type="",this.storedItem.isEquipped=!1,this.storedItem.isAttuned=!1,e){case"Armor (Light)":this.storedItem.armor=!0,this.storedItem.weaponCategory=null,this.storedItem.type="LA";break;case"Armor (Medium)":this.storedItem.armor=!0,this.storedItem.weaponCategory=null,this.storedItem.type="MA";break;case"Armor (Heavy)":this.storedItem.armor=!0,this.storedItem.weaponCategory=null,this.storedItem.type="HA";break;case"Ranged Weapon":this.storedItem.weapon=!0,this.storedItem.weaponCategory="Simple",this.storedItem.type="R",this.storedItem.resist=null;break;case"Melee Weapon":this.storedItem.weapon=!0,this.storedItem.weaponCategory="Simple",this.storedItem.type="M",this.storedItem.resist=null;break;case"Shield":this.storedItem.type="S",this.storedItem.weaponCategory=null,this.storedItem.ac=2,this.storedItem.resist=null;break;case"Adventuring Gear":this.storedItem.weaponCategory=null,this.storedItem.type="G",this.storedItem.resist=null;break;case"Currency":this.storedItem.weaponCategory=null,this.storedItem.type="$",this.storedItem.resist=null,this.storedItem.quantity=1,this.storedItem.hasQuantity=!0;break;default:const t=Object.entries(v.a.ITEM_TYPE_JSON_TO_ABV).find(([t,i])=>i===e);t&&(this.storedItem.type=t[0]),"P"===e&&"RG"===e||(this.storedItem.resist=null)}"P"!==this.storedItem.type&&"A"!==this.storedItem.type&&"EXP"!==this.storedItem.type&&"$"!==this.storedItem.type&&(this.storedItem.hasQuantity=!1),Object(s.tb)(this.item)}_updateItem(){Object(s.tb)(this.item)}_addDamage(){this.storedItem.damages||(this.storedItem.damages=[]),this.storedItem.damages.push({roll:"",type:""}),Object(s.tb)(this.item)}_removeDamage(e){const t=Object(d.findInPath)(".roll__damage",e).getAttribute("index"),i=parseInt(t,10);this.storedItem.damages.splice(i,1),Object(s.tb)(this.item)}_changeWeaponType(){this.item.weapon&&(this.isMartial?this.storedItem.weaponCategory="Martial":this.storedItem.weaponCategory="Simple",Object(s.tb)(this.item))}_weaponMagicModifierChange(){let e=parseInt(this.weaponMagicModifier,10);isNaN(e)&&(e=0),this.storedItem.genericBonus=e>0?"+"+e:e,Object(s.tb)(this.item)}_itemRarityChange(){this.itemRarity&&(this.storedItem.rarity=this.itemRarity,Object(s.tb)(this.item))}_itemNameChange(){this.itemName&&(this.storedItem.name=this.itemName,Object(s.tb)(this.item))}_addWeaponProperty(){return(e=>{if(e&&e.length){const t=e.map(e=>{const t=this.weaponPropertyOptions.find(t=>t.name===e.trim());if(t)return t.value}).filter(e=>!!e);this.storedItem.property=t.join(","),Object(s.tb)(this.item)}}).bind(this)}_armorACChange(){let e=parseInt(this.armorAC,10);isNaN(e)&&(e=0),this.storedItem.ac=e,Object(s.tb)(this.item)}_itemWeightChange(){let e=parseFloat(this.itemWeight,10);isNaN(e)&&(e=0),this.storedItem.weight=e,Object(s.tb)(this.item)}_itemResistChange(){this.itemResist&&(this.storedItem.resist="<None>"===this.itemResist?null:this.itemResist,Object(s.tb)(this.item))}_itemQuantityChange(){let e=parseInt(this.itemQuantity,10);isNaN(e)&&(e=0),this.storedItem.quantity=e,this.storedItem.hasQuantity=!0,Object(s.tb)(this.item)}_or(...e){for(let t of e)if(t)return!0;return!1}static get template(){return a.b`
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

        h2 {
          margin-top: 0;
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 8px;
        }

        vaadin-checkbox {
          width: fit-content;
        }

        vaadin-select {
          max-width: calc(50% - 14px);
        }
        vaadin-number-field,
        vaadin-integer-field {
          width: calc(33% - 10px);
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

        .margin-bottom_large {
          margin-bottom: 0 !important;
        }

        @media(min-width: 921px) {
          h2 {
            font-size: 24px;
          }
        }
      </style>

      <div hidden$="[[!item]]">
        <div hidden$="[[isEditMode]]">
          <div hidden$="[[!hasRenderedOutput]]">
            <h2>[[item.name]]</h4>
            <div>[[item.notes]]</div>
            <div hidden$="[[item.hideRef]]" id="renderedOutput"></div>
          </div>

          <div hidden$="[[hasRenderedOutput]]">
            <h2>[[item.name]]</h4>
            <div>[[item.notes]]</div>
          </div>
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

            <div class="edit__weapon" hidden$="[[!item.weapon]]">
              <h4 class="section_heading">Weapon</h4>
              <dnd-select-add choices="100" label="Weapon Properties" options="[[weaponPropertyValues]]" value="[[weaponProperties]]" add-callback="[[_addWeaponProperty()]]"></dnd-select-add>
              <!-- <vaadin-integer-field theme="label--secondary"  min="0" max="5" has-controls value="{{weaponMagicModifier}}" label="Magic Modifier" on-change="_weaponMagicModifierChange"></vaadin-integer-field> -->
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

            <!-- <vaadin-integer-field theme="label--secondary"  hidden$="[[!hasAC]]" min="0" max="30" has-controls value="{{armorAC}}" label="AC" on-change="_armorACChange"></vaadin-integer-field>
            
            <vaadin-integer-field theme="label--secondary"  hidden$="[[!item.hasQuantity]]" min="0" has-controls value="{{itemQuantity}}" label="Quantity" on-change="_itemQuantityChange"></vaadin-integer-field> -->

            <!-- <vaadin-select hidden$="[[!canHaveResist]]" value="{{itemResist}}" on-change="_itemResistChange" label="Resistance">
              <template>
                <vaadin-list-box>
                  <template is="dom-repeat" items="[[resistTypes]]">
                    <vaadin-item>[[item]]</vaadin-item>
                  </template>
                </vaadin-list-box>
              </template>
            </vaadin-select> -->

            <div class="edit__checkboxes">
              <vaadin-checkbox hidden$="[[!canHaveQuantity]]" checked="{{storedItem.hasQuantity}}" on-change="_updateItem">Has Quantity</vaadin-checkbox>
              <vaadin-checkbox hidden$="[[!isArmor]]" checked="{{storedItem.stealth}}" on-change="_updateItem">Disadvantage on Stealth</vaadin-checkbox>
              <vaadin-checkbox checked="{{storedItem.reqAttune}}" on-change="_updateItem">Requires Attunement</vaadin-checkbox>
              <vaadin-checkbox checked="{{storedItem.wondrous}}" on-change="_updateItem">Wondrous</vaadin-checkbox>
              <vaadin-checkbox hidden$="[[!storedItem.itemRef]]" checked="{{storedItem.hideRef}}" on-change="_updateItem">Hide Reference</vaadin-checkbox>
            </div>

            <vaadin-text-area  theme="label--secondary" class="edit__notes" value="{{storedItem.notes}}" label="Notes" on-blur="_updateItem"></vaadin-text-area>
          </div>
        </template>
      </div>
    `}}customElements.define("dnd-character-builder-equipment-item-detail",g)}}]);
//# sourceMappingURL=1.bundle.js.map