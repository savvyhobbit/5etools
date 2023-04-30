(window.webpackJsonp=window.webpackJsonp||[]).push([[2,7],{167:function(e,t,i){"use strict";var a=i(3),s=i(31),n=i(1),o=(i(102),i(37));class r extends a.a{static get properties(){return{options:{type:Array},model:{type:String},addCallback:{type:Function},value:{type:String,value:"",observer:"valueUpdated"},choices:{type:Number,observer:"choicesUpdated"},paren:{type:String},label:{type:String},placeholder:{type:String},multiValue:{type:String,value:""},disabled:{type:Boolean,value:!1,reflectToAttribute:!0}}}choicesUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.requestContentUpdate()}valueUpdated(){if(this.choices)if(Array.isArray(this.value)&&this.options){const e=this.value.map(e=>-1!==this.options.indexOf(e)?this.options.indexOf(e):this.options.findIndex(t=>t.name===e.name&&t.source===e.source)).filter(e=>-1!==e);this.listBox&&(this.listBox.selectedValues=e),this.multiValue=e.map(e=>{let t=this.options[e];return t.name?t.name:Object(n.util_capitalizeAll)(t)}).join(", ")}else this.listBox&&(this.listBox.selectedValues=[]),this.multiValue="";else this.value&&this.options?this.value.source?this.$.select.value=this.options.findIndex(e=>e.name===this.value.name&&e.source===this.value.source||e===this.value.name)+"":this.value.name?this.$.select.value=this.options.findIndex(e=>e.name===this.value.name||e===this.value.name)+"":this.$.select.value=this.options.findIndex(e=>e.name===this.value||e===this.value)+"":this.$.select.value=""}ready(){super.ready(),setTimeout(async()=>{this.model&&(this.options=await Object(o.b)(this.model));const e=this.$.select._overlayElement.shadowRoot.querySelector("#content");let t=0;e.addEventListener("scroll",i=>{t=e.scrollTop},{passive:!0}),this.$.select.renderer=(i,a)=>{if(!this.listBox){if(this.listBox=document.createElement("vaadin-list-box"),this.choices&&(this.listBox.setAttribute("multiple",!0),this.listBox.addEventListener("click",i=>{a.opened=!0;let s=null!==i.srcElement.getAttribute("selected");e.scroll(0,t),setTimeout(()=>{this.listBox.selectedValues.length>this.choices&&!s&&this.listBox.selectedValues.splice(this.listBox.selectedValues.length-2,1);let e=this.listBox.selectedValues.map(e=>this.options[e]);this.multiValue=e.map(e=>e.name?e.name:Object(n.util_capitalizeAll)(e)).join(", "),this.addCallback&&this.addCallback(e)},0)})),this.options&&this.options.length)for(let e=0;e<this.options.length;e++){const t=this.options[e],i=document.createElement("vaadin-item"),a=t.name||Object(n.util_capitalizeAll)(t);i.innerHTML=`<span style='margin-left: 10px;'>${a}</span> ${t.name?`<span style='font-size: 14px;color: var(--lumo-primary-color-50pct);'>${t.source||""}</span>`:""}`,i.setAttribute("value",e),this.listBox.appendChild(i)}i.appendChild(this.listBox),this.$.select._assignMenuElement(),this.valueUpdated()}}},0)}connectedCallback(){super.connectedCallback(),this.selectChangeHandler=()=>{const e=this.$.select.value;if(e&&!this.choices){const t=this.options[e];this.addCallback?this.addCallback(t,this.model):Object(s.Z)(void 0,t,this.model),this.value||(this.$.select.value="")}},this.$.select.addEventListener("change",this.selectChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),this.$.select.removeEventListener("change",this.selectChangeHandler)}_exists(e){return!!e}_label(e,t,i){let a="";return e&&(a=e,t&&1!==t&&100!==t&&(a+=` (pick ${t})`),i&&(a+=` (${i})`)),a}static get template(){return a.b`
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
      <vaadin-select add theme="dark add" id="select" label="[[_label(label, choices, paren)]]" placeholder="[[placeholder]]" disabled$="[[disabled]]">
        <div hidden$="[[!_exists(multiValue)]]" slot="prefix">
          <span class="prefix">[[multiValue]]</span>
        </div>
      </vaadin-select>
      
    `}}customElements.define("dnd-select-add",r)},168:function(e,t,i){"use strict";i(125);
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
i(122).a;console.warn('WARNING: Since Vaadin 23.2, "@vaadin/vaadin-checkbox" is deprecated. Use "@vaadin/checkbox" instead.')},171:function(e,t,i){"use strict";i.r(t);var a=i(3),s=i(31),n=i(72),o=i(128),r=i(0),l=i(1),d=(i(169),i(166),i(182),i(4));i(167),i(101);class c extends a.a{static get properties(){return{isEditMode:{type:Boolean,value:!1},hasRenderedOutput:{type:Boolean,value:!1},hasAC:{type:Boolean,value:!1},armorAC:{type:Number,value:0},isArmor:{type:Boolean,value:!1},isMartial:{type:Boolean,value:!1},weaponMagicModifier:{type:Number,value:0},itemRarity:{type:String},itemName:{type:String},itemWeight:{type:Number,value:0},weaponProperties:{type:Array},itemResist:{type:String},itemQuantity:{type:Number,value:0},item:{type:Object},storedItem:{type:Object},itemType:{type:String,value:""}}}static get observers(){return["_itemChanged(item)"]}constructor(){super(),this.itemTypes=["Currency","Armor (Light)","Armor (Medium)","Armor (Heavy)","Melee Weapon","Ranged Weapon","Shield","Adventuring Gear","Ammunition","Artisan Tool","Explosive","Gaming Set","Instrument","Mount","Potion","Rod","Ring","Scroll","Spellcasting Focus","Tool","Tack and Harness","Trade Good","Vehicle","Wand"],this.rarityTypes=r.z,this.damageTypes=r.k,this.resistTypes=["None",...r.k],this.weaponPropertyOptions=[{name:"Two-Handed",value:"2H"},{name:"Ammunition",value:"A"},{name:"Finesse",value:"F"},{name:"Heavy",value:"H"},{name:"Light",value:"L"},{name:"Loading",value:"LD"},{name:"Reach",value:"R"},{name:"Reload",value:"RLD"},{name:"Special",value:"S"},{name:"Thrown",value:"T"},{name:"Versatile",value:"V"}],this.weaponPropertyValues=["Two-Handed","Ammunition","Finesse","Heavy","Light","Loading","Reach","Reload","Special","Thrown","Versatile"]}connectedCallback(){super.connectedCallback(),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(n.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(n.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(n.b)().removeEventListener("editModeChange",this.editModeHandler)}_itemChanged(){if(this.item){if(console.error("itemDetail:",this.item),Object(o.renderSelection)(this.item,this.$.renderedOutput),this.itemType=this._getItemType(),this.hasAC="S"===this.item.type||!!this.item.armor,this.armorAC=this.item.ac,this.isArmor=!!this.item.armor,this.isMartial="Martial"===this.item.weaponCategory,this.weaponProperties=[],this.weaponMagicModifier=0,(this.item.weapon||this.item.weaponCategory)&&(this.weaponMagicModifier=parseInt(this.item.genericBonus,10),this.item.property)){const e=this.item.property.map(e=>{const t=this.weaponPropertyOptions.find(t=>t.value===e.trim());if(t)return t.name}).filter(e=>!!e);this.weaponProperties=e,this.item.damages||(this.item.dmg1?this.item.storedItem.damages=[{roll:this.item.dmg1,type:Object(l.util_capitalizeAll)(d.a.dmgTypeToFull(this.item.dmgType))}]:this.item.storedItem.damages=[])}this.itemRarity=this.item.rarity,this.itemName=this.item.name||"",this.itemWeight=this.item.weight||null,this.canHaveResist=this.item.armor||"P"===this.item.type||"RG"===this.item.type,this.itemResist=this.item.resist,this.canHaveQuantity="P"===this.item.type||"A"===this.item.type||"EXP"===this.item.type||"$"===this.item.type,this.itemQuantity=this.item.quantity||1,this.canHaveSpell="SC"===this.item.type,this.item.storedItem&&(this.storedItem=this.item.storedItem)}}_getItemType(){return this.item?d.a.ITEM_TYPE_JSON_TO_ABV[this.item.type]:""}_selectItemType(){const e=this.root.querySelector("#typeSelect").value;switch(this.storedItem.armor=!1,this.storedItem.weapon=!1,this.storedItem.type="",this.storedItem.isEquipped=!1,this.storedItem.isAttuned=!1,e){case"Armor (Light)":this.storedItem.armor=!0,this.storedItem.weaponCategory=null,this.storedItem.type="LA";break;case"Armor (Medium)":this.storedItem.armor=!0,this.storedItem.weaponCategory=null,this.storedItem.type="MA";break;case"Armor (Heavy)":this.storedItem.armor=!0,this.storedItem.weaponCategory=null,this.storedItem.type="HA";break;case"Ranged Weapon":this.storedItem.weapon=!0,this.storedItem.weaponCategory="Simple",this.storedItem.type="R",this.storedItem.resist=null;break;case"Melee Weapon":this.storedItem.weapon=!0,this.storedItem.weaponCategory="Simple",this.storedItem.type="M",this.storedItem.resist=null;break;case"Shield":this.storedItem.type="S",this.storedItem.weaponCategory=null,this.storedItem.ac=2,this.storedItem.resist=null;break;case"Adventuring Gear":this.storedItem.weaponCategory=null,this.storedItem.type="G",this.storedItem.resist=null;break;case"Currency":this.storedItem.weaponCategory=null,this.storedItem.type="$",this.storedItem.resist=null,this.storedItem.quantity=1,this.storedItem.hasQuantity=!0;break;default:const t=Object.entries(d.a.ITEM_TYPE_JSON_TO_ABV).find(([t,i])=>i===e);t&&(this.storedItem.type=t[0]),"P"===e&&"RG"===e||(this.storedItem.resist=null)}"P"!==this.storedItem.type&&"A"!==this.storedItem.type&&"EXP"!==this.storedItem.type&&"$"!==this.storedItem.type&&(this.storedItem.hasQuantity=!1),Object(s.sb)(this.item)}_updateItem(){Object(s.sb)(this.item)}_addDamage(){this.storedItem.damages||(this.storedItem.damages=[]),this.storedItem.damages.push({roll:"",type:""}),Object(s.sb)(this.item)}_removeDamage(e){const t=Object(l.findInPath)(".roll__damage",e).getAttribute("index"),i=parseInt(t,10);this.storedItem.damages.splice(i,1),Object(s.sb)(this.item)}_changeWeaponType(){this.item.weapon&&(this.isMartial?this.storedItem.weaponCategory="Martial":this.storedItem.weaponCategory="Simple",Object(s.sb)(this.item))}_weaponMagicModifierChange(){let e=parseInt(this.weaponMagicModifier,10);isNaN(e)&&(e=0),this.storedItem.genericBonus=e>0?"+"+e:e,Object(s.sb)(this.item)}_itemRarityChange(){this.itemRarity&&(this.storedItem.rarity=this.itemRarity,Object(s.sb)(this.item))}_itemNameChange(){this.itemName&&(this.storedItem.name=this.itemName,Object(s.sb)(this.item))}_addWeaponProperty(){return(e=>{if(e&&e.length){const t=e.map(e=>{const t=this.weaponPropertyOptions.find(t=>t.name===e.trim());if(t)return t.value}).filter(e=>!!e);this.storedItem.property=t,Object(s.sb)(this.item)}}).bind(this)}_armorACChange(){let e=parseInt(this.armorAC,10);isNaN(e)&&(e=0),this.storedItem.ac=e,Object(s.sb)(this.item)}_itemWeightChange(){let e=parseFloat(this.itemWeight,10);isNaN(e)&&(e=0),this.storedItem.weight=e,Object(s.sb)(this.item)}_itemResistChange(){this.itemResist&&(this.storedItem.resist="None"===this.itemResist?null:this.itemResist,Object(s.sb)(this.item))}_itemQuantityChange(){let e=parseInt(this.itemQuantity,10);isNaN(e)&&(e=0),this.storedItem.quantity=e,this.storedItem.hasQuantity=!0,Object(s.sb)(this.item)}_or(...e){for(let t of e)if(t)return!0;return!1}_sourceFull(e){return e&&d.a.sourceJsonToFull(e)}static get template(){return a.b`
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


        h2 {
          margin-top: 0;
          font-size: 24px;
          margin-bottom: 2px;
          line-height: 1.2;
        }
        .notes-container {
          margin-top: 16px;
          line-height: 1.4;
        }
        .notes-container__label {
          font-weight: bold;
        }

        .stats-wrapper {
          font-size: 14px;
          line-height: 1.4;
          margin-top: 16px;
        }
        .stats-wrapper > .statsBlockHead:first-child > .stat-name {
          margin-top: 0;
        }
        .stats-wrapper .statsBlockHead .stat-name {
          font-size: 22px;
          margin-bottom: 2px;
        }
        .stats-wrapper .statsBlockSubHead .stat-name {
          font-size: 18px;
        }
        .stats-wrapper .text {
          margin-top: 16px;
        }
        .stats-wrapper p {
          margin-bottom: 8px;
        }
        .stats-wrapper .statsInlineHead:last-child {
          margin-bottom: 0;
        }
        .stats-wrapper .statsInlineHead .stat-name {
          font-size: inherit;
        }
        .margin-bottom_large,
        .stats-wrapper .margin-bottom_med {
          margin-bottom: 0 !important;
        }
        .source {
          display: block !important;
          color: var(--lumo-contrast-70pct);
          font-size: 13px;
          margin-top: 0px;
          margin-bottom: 12px;
        }
      </style>

      <div hidden$="[[!item]]">
        <div hidden$="[[isEditMode]]">
          <h2>[[item.name]]</h2>
          <div hidden="[[!item.source]]" class="source">[[_sourceFull(item.source)]]</div>
          <div hidden="[[!item.notes]]" class="notes-container">
            <span class="notes-container__label">Notes.</span>
            [[item.notes]]
          </div>
          <div id="renderedOutput"></div>
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
              <vaadin-integer-field theme="label--secondary"  min="0" max="5" has-controls value="{{weaponMagicModifier}}" label="Magic Modifier" on-change="_weaponMagicModifierChange"></vaadin-integer-field>
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

            <vaadin-integer-field theme="label--secondary"  hidden$="[[!hasAC]]" min="0" max="30" has-controls value="{{armorAC}}" label="AC" on-change="_armorACChange"></vaadin-integer-field>
            
            <vaadin-integer-field theme="label--secondary"  hidden$="[[!item.hasQuantity]]" has-controls value="{{itemQuantity}}" label="Quantity" on-change="_itemQuantityChange"></vaadin-integer-field>

            <vaadin-select hidden$="[[!canHaveResist]]" value="{{itemResist}}" on-change="_itemResistChange" label="Resistance">
              <template>
                <vaadin-list-box>
                  <template is="dom-repeat" items="[[resistTypes]]">
                    <vaadin-item>[[item]]</vaadin-item>
                  </template>
                </vaadin-list-box>
              </template>
            </vaadin-select>

            <div class="edit__checkboxes">
              <vaadin-checkbox hidden$="[[!canHaveQuantity]]" checked="{{storedItem.hasQuantity}}" on-change="_updateItem" label="Has Quantity"></vaadin-checkbox>
              <vaadin-checkbox hidden$="[[!isArmor]]" checked="{{storedItem.stealth}}" on-change="_updateItem" label="Disadvantage on Stealth"></vaadin-checkbox>
              <vaadin-checkbox checked="{{storedItem.reqAttune}}" on-change="_updateItem" label="Requires Attunement"></vaadin-checkbox>
              <vaadin-checkbox checked="{{storedItem.wondrous}}" on-change="_updateItem" label="Wondrous"></vaadin-checkbox>
            </div>

            <vaadin-text-area  theme="label--secondary" class="edit__notes" value="{{storedItem.notes}}" label="Notes" on-blur="_updateItem"></vaadin-text-area>
          </div>
        </template>
      </div>
    `}}customElements.define("dnd-character-builder-equipment-item-detail",c)},172:function(e,t,i){"use strict";i(29),i(36),i(20);var a=i(2);Object(a.c)("vaadin-grid-tree-toggle",a.b`
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
  `,{moduleId:"lumo-grid-tree-toggle"});var s=i(3),n=i(25),o=i(108);
/**
 * @license
 * Copyright (c) 2016 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const r=document.createElement("template");r.innerHTML="\n  <style>\n    @font-face {\n      font-family: \"vaadin-grid-tree-icons\";\n      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAQkAA0AAAAABrwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAECAAAABoAAAAcgHwa6EdERUYAAAPsAAAAHAAAAB4AJwAOT1MvMgAAAZQAAAA/AAAAYA8TBIJjbWFwAAAB8AAAAFUAAAFeGJvXWmdhc3AAAAPkAAAACAAAAAgAAAAQZ2x5ZgAAAlwAAABLAAAAhIrPOhFoZWFkAAABMAAAACsAAAA2DsJI02hoZWEAAAFcAAAAHQAAACQHAgPHaG10eAAAAdQAAAAZAAAAHAxVAgBsb2NhAAACSAAAABIAAAASAIAAVG1heHAAAAF8AAAAGAAAACAACgAFbmFtZQAAAqgAAAECAAACTwflzbdwb3N0AAADrAAAADYAAABZQ7Ajh3icY2BkYGAA4twv3Vfi+W2+MnCzMIDANSOmbGSa2YEZRHEwMIEoAAoiB6sAeJxjYGRgYD7w/wADAwsDCDA7MDAyoAI2AFEEAtIAAAB4nGNgZGBg4GBgZgDRDAxMDGgAAAGbABB4nGNgZp7JOIGBlYGBaSbTGQYGhn4IzfiawZiRkwEVMAqgCTA4MDA+38d84P8BBgdmIAapQZJVYGAEAGc/C54AeJxjYYAAxlAIzQTELAwMBxgZGB0ACy0BYwAAAHicY2BgYGaAYBkGRgYQiADyGMF8FgYbIM3FwMHABISMDArP9/3/+/8/WJXC8z0Q9v8nEp5gHVwMMMAIMo+RDYiZoQJMQIKJARUA7WBhGN4AACFKDtoAAAAAAAAAAAgACAAQABgAJgA0AEIAAHichYvBEYBADAKBVHBjBT4swl9KS2k05o0XHd/yW1hAfBFwCv9sIlJu3nZaNS3PXAaXXHI8Lge7DlzF7C1RgXc7xkK6+gvcD2URmQB4nK2RQWoCMRiFX3RUqtCli65yADModOMBLLgQSqHddRFnQghIAnEUvEA3vUUP0LP0Fj1G+yb8R5iEhO9/ef/7FwFwj28o9EthiVp4hBlehcfUP4Ur8o/wBAv8CU+xVFvhOR7UB7tUdUdlVRJ6HnHWTnhM/V24In8JT5j/KzzFSi2E53hUz7jCcrcIiDDwyKSW1JEct2HdIPH1DFytbUM0PofWdNk5E5oUqb/Q6HHBiVGZpfOXkyUMEj5IyBuNmYZQjBobfsuassvnkKLe1OuBBj0VQ8cRni2xjLWsHaM0jrjx3peYA0/vrdmUYqe9iy7bzrX6eNP7Jh1SijX+AaUVbB8AAHicY2BiwA84GBgYmRiYGJkZmBlZGFkZ2djScyoLMgzZS/MyDQwMwLSruZMzlHaB0q4A76kLlwAAAAEAAf//AA94nGNgZGBg4AFiMSBmYmAEQnYgZgHzGAAD6wA2eJxjYGBgZACCKxJigiD6mhFTNowGACmcA/8AAA==) format('woff');\n      font-weight: normal;\n      font-style: normal;\n    }\n  </style>\n",document.head.appendChild(r.content);class l extends(Object(a.a)(Object(n.a)(s.a))){static get template(){return s.b`
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
    `}static get is(){return"vaadin-grid-tree-toggle"}static get properties(){return{level:{type:Number,value:0,observer:"_levelChanged"},leaf:{type:Boolean,value:!1,reflectToAttribute:!0},expanded:{type:Boolean,value:!1,reflectToAttribute:!0,notify:!0}}}ready(){super.ready(),this.addEventListener("click",e=>this._onClick(e))}_onClick(e){this.leaf||Object(o.b)(e.target)||e.target instanceof HTMLLabelElement||(e.preventDefault(),this.expanded=!this.expanded)}_levelChanged(e){const t=Number(e).toString();this.style.setProperty("---level",t)}}customElements.define(l.is,l)},179:function(e,t,i){"use strict";i.r(t);var a=i(3),s=i(31),n=(i(174),i(72)),o=(i(130),i(168),i(129),i(172),i(137),i(166),i(171),i(9));class r extends a.a{static get properties(){return{inventory:{type:Array},isEditMode:{type:Boolean,value:!1},character:{type:Object},expandedItems:{type:Array},expandedIds:{type:Array},activeItem:{type:Object,value:null,observer:"_activeItemChange"}}}static get observers(){return["_expandedItemsChange(expandedItems.*)"]}_activeItemChange(e,t){if(t&&this.isMobile()||!e)!e&&t&&this.previousScrollPosition&&this.isMobile()&&setTimeout(()=>{window.scrollTo(0,this.previousScrollPosition),this.previousScrollPosition=0},0);else if(this.previousScrollPosition=window.scrollY,this.getBoundingClientRect().y<0){const e=window.scrollY+this.getBoundingClientRect().y-57;setTimeout(()=>{window.scrollTo(0,e)},0)}}isMobile(){return window.innerWidth<=768}_expandedItemsChange(){this.expandedItems&&this.expandedItems.length&&(this.expandedIds=this.expandedItems.filter(e=>!!e).map(e=>e.uniqueId))}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(s.P)()),Object(s.n)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode,this.$.grid&&setTimeout(()=>{this.$.grid.notifyResize()},0)},Object(n.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(n.c)(),this.routeSubSelectionChangeHandler=(e=>{const t=e.detail.subSelection;this.inventory&&(this.activeItem=Object(s.K)(this.inventory,parseInt(t)))}).bind(this),Object(o.h)().addEventListener("sub-selection-change",this.routeSubSelectionChangeHandler),this.routeSubSelectionDeselectedHandler=(()=>{this.activeItem=void 0}).bind(this),Object(o.h)().addEventListener("sub-selection-deselected",this.routeSubSelectionDeselectedHandler)}disconnectedCallback(){super.disconnectedCallback(),Object(s.n)().removeEventListener("character-selected",this.characterChangeHandler),Object(n.b)().removeEventListener("editModeChange",this.editModeHandler),Object(o.h)().removeEventListener("selection-change",this.routeSubSelectionDeselectedHandler),Object(o.h)().removeEventListener("sub-selection-change",this.routeSubSelectionChangeHandler)}ready(){super.ready(),setTimeout(()=>{const e=this.$.grid;let t;e.addEventListener("grid-dragstart",(function(i){t=i.detail.draggedItems[0],e.dropMode="on-top-or-between"})),e.addEventListener("grid-dragend",(function(i){t=e.dropMode=null})),e.addEventListener("grid-drop",e=>{const i=e.detail.dropTargetItem;if(t&&t!==i){const a=Object(s.X)(t,i.uniqueId);if((t.containerCapacity||t.packContents)&&a)return;const n=t.storedItem.uniqueId;if(t.storedItem.uniqueId=this.character.itemCounter++,"on-top"===e.detail.dropLocation&&(i.containerCapacity||i.packContents))return void(i.storedItem&&i.storedItem.children&&(i.storedItem.children.push(t.storedItem),Object(s.sb)(i,void 0,!0),Object(s.eb)(n)));if(this.inventory){const a=""+i.id;let o=parseInt(a.substring(a.lastIndexOf("_")),10);"below"===e.detail.dropLocation&&o++,i.parentItemREF?(i.parentItemREF.storedItem.children.splice(o,0,t.storedItem),Object(s.sb)(i.parentItemREF,void 0,!0)):Object(s.wb)(o,t.storedItem),Object(s.eb)(n)}}}),e.dataProvider=((e,t)=>{const i=e.page*e.pageSize;let a=e.parentItem?e.parentItem.children:this.inventory;if(a&&a.length){t(a.slice(i,i+e.pageSize),a.length)}}).bind(this)},0)}async updateFromCharacter(e){if(e){if(this.character=e,this.inventory=await Object(s.L)(e),console.error("inventory:",this.inventory),this.$.grid.clearCache(),this.expandedIds){const e=this.expandedIds.map(e=>Object(s.K)(this.inventory,e));this.expandedItems=e}Object(o.f)()&&(this.activeItem=Object(s.K)(this.inventory,parseInt(Object(o.f)()))),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}}_expandDetails(e){let t=e.model.__data.item.uniqueId;Object(o.f)()===t?Object(o.b)():Object(o.j)(t)}_flashCheckbox(e){e&&(e.classList.add("transition-bg"),e.classList.add("flash-error"),setTimeout(()=>{e.classList.remove("flash-error"),setTimeout(()=>{e.classList.remove("transition-bg")},200)},200))}_deleteItem(e){e.preventDefault(),e.stopPropagation();let t=e.model.__data.item&&void 0!==e.model.__data.item.uniqueId?e.model.__data.item.uniqueId:void 0;Object(s.eb)(t)}async _setItemEquipped(e){e.preventDefault(),e.stopPropagation();let t=e.model.__data.item,i=t?t.uniqueId:void 0;if(!!t&&t.isEquipped)Object(s.Db)(i);else if(await Object(s.g)(t))Object(s.Db)(i);else{let t=e.target.querySelector("vaadin-checkbox");this._flashCheckbox(t)}}async _setItemAttuned(e){e.preventDefault(),e.stopPropagation();let t=e.model.__data.item,i=t?t.uniqueId:void 0;if(!!t&&t.isAttuned)Object(s.Cb)(i);else if(await Object(s.f)(t))Object(s.Cb)(i);else{let t=e.target.querySelector("vaadin-checkbox");this._flashCheckbox(t)}}_quantityChange(e){const t=this.$.grid.getEventContext(e).item;let i=parseInt(t.quantity,10);isNaN(i)&&(i=0),t.storedItem.quantity=i,Object(s.sb)(t)}_addItem(){const e=Object(s.d)({name:""},!1);Object(n.a)(!0),setTimeout(()=>{Object(o.j)(e)},0)}_preventDefault(e){e.preventDefault(),e.stopPropagation()}_or(...e){for(let t of e)if(t)return!0;return!1}_noRarity(e){return!e||"None"===e}_toggleTheme(e){return e.children&&0===e.children.length?"no-children":""}_linkClick(){this.dispatchEvent(new CustomEvent("open-drawer",{bubbles:!0,composed:!0,detail:{viewId:"items"}}))}_isActive(e,t){return e===t}_hasActive(e){return!!e}_clearSelection(){window.history.back()}_isLeaf(e){return!e.containerCapacity&&!e.packContents}static get template(){return a.b`
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
          <vaadin-grid id="grid" expanded-items="{{expandedItems}}" all-rows-visible rows-draggable theme="no-border no-row-borders no-row-padding" >
            <vaadin-grid-column>
              <template>
                <div class="item-wrap" active$="[[_isActive(activeItem, item)]]">
                  <vaadin-grid-tree-toggle level$=[[level]] leaf="[[_isLeaf(item)]]" expanded="{{expanded}}" theme$=[[_toggleTheme(item)]] on-click='_recordScrollHeight'></vaadin-grid-tree-toggle>
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
                  <button class="item-wrap__close" hidden$="[[!isEditMode]]" on-click="_deleteItem"><i class="fas fa-trash"></i></button>
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
    `}}customElements.define("dnd-character-builder-equipment",r)}}]);
//# sourceMappingURL=2.bundle.js.map