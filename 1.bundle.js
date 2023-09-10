(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{177:function(e,t,i){"use strict";var a=i(2),s=i(32),l=i(1),n=(i(106),i(38));class o extends a.a{static get properties(){return{options:{type:Array},model:{type:String},addCallback:{type:Function},value:{type:String,value:"",observer:"valueUpdated"},choices:{type:Number,observer:"choicesUpdated"},paren:{type:String},label:{type:String},placeholder:{type:String},multiValue:{type:String,value:""},disabled:{type:Boolean,value:!1,reflectToAttribute:!0},theme:{reflectToAttribute:!0,type:String,value:""}}}choicesUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.requestContentUpdate()}valueUpdated(){if(this.choices)if(Array.isArray(this.value)&&this.options){const e=this.value.map(e=>-1!==this.options.indexOf(e)?this.options.indexOf(e):this.options.findIndex(t=>t.name===e.name&&t.source===e.source)).filter(e=>-1!==e);this.listBox&&(this.listBox.selectedValues=e),this.multiValue=e.map(e=>{let t=this.options[e];return t.name?t.name:Object(l.util_capitalizeAll)(t)}).join(", ")}else this.listBox&&(this.listBox.selectedValues=[]),this.multiValue="";else this.value&&this.options?this.value.source?this.$.select.value=this.options.findIndex(e=>e.name===this.value.name&&e.source===this.value.source||e===this.value.name)+"":this.value.name?this.$.select.value=this.options.findIndex(e=>e.name===this.value.name||e===this.value.name)+"":this.$.select.value=this.options.findIndex(e=>e.name===this.value||e===this.value)+"":this.$.select.value=""}ready(){super.ready(),setTimeout(async()=>{this.model&&(this.options=await Object(n.b)(this.model));const e=this.$.select._overlayElement.shadowRoot.querySelector("#content");let t=0;e.addEventListener("scroll",i=>{t=e.scrollTop},{passive:!0}),this.$.select.renderer=(i,a)=>{if(!this.listBox){if(this.listBox=document.createElement("vaadin-list-box"),this.choices&&(this.listBox.setAttribute("multiple",!0),this.listBox.addEventListener("click",i=>{a.opened=!0;let s=null!==i.srcElement.getAttribute("selected");e.scroll(0,t),setTimeout(()=>{this.listBox.selectedValues.length>this.choices&&!s&&this.listBox.selectedValues.splice(this.listBox.selectedValues.length-2,1);let e=this.listBox.selectedValues.map(e=>this.options[e]);this.multiValue=e.map(e=>e.name?e.name:Object(l.util_capitalizeAll)(e)).join(", "),this.addCallback&&this.addCallback(e)},0)})),this.options&&this.options.length)for(let e=0;e<this.options.length;e++){const t=this.options[e],i=document.createElement("vaadin-item"),a=t.name||Object(l.util_capitalizeAll)(t);i.style.setProperty("--lumo-primary-text-color","var(--mdc-theme-secondary)"),i.style.setProperty("--lumo-primary-color-10pct","var(--mdc-theme-secondary-10pct)"),i.innerHTML=`<span class="select-add__item-name" style='margin-left: 10px'>${a}</span>`,t.source&&(i.innerHTML+=` <span class="select-add__item-src" style='font-size: 14px;color: var(--lumo-primary-color-50pct);'>${t.source||""}</span>`),i.setAttribute("value",e),this.listBox.appendChild(i)}i.appendChild(this.listBox),this.$.select._assignMenuElement(),this.valueUpdated()}}},0)}connectedCallback(){super.connectedCallback(),this.selectChangeHandler=()=>{const e=this.$.select.value;if(e&&!this.choices){const t=this.options[e];this.addCallback?this.addCallback(t,this.model):Object(s.gb)(void 0,t,this.model),this.value||(this.$.select.value="")}},this.$.select.addEventListener("change",this.selectChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),this.$.select.removeEventListener("change",this.selectChangeHandler)}_exists(e){return!!e}_label(e,t,i){let a="";return e&&(a=e,t&&1!==t&&100!==t&&(a+=` (pick ${t})`),i&&(a+=` (${i})`)),a}_theme(e){return"dark add "+e}static get template(){return a.b`
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
          --lumo-primary-text-color: var(--mdc-theme-primary);
        }
        vaadin-item[selected] {

        }
        .prefix {
          white-space: normal;
          color: var(--mdc-theme-primary);
        }
        .select-add__item-name {
          color: var(--mdc-theme-primary);
        }
      </style>
      <vaadin-select id="select" add theme$="[[_theme(theme)]]" label="[[_label(label, choices, paren)]]" placeholder="[[placeholder]]" disabled$="[[disabled]]">
        <div hidden$="[[!_exists(multiValue)]]" slot="prefix">
          <span class="prefix">[[multiValue]]</span>
        </div>
      </vaadin-select>
    `}}customElements.define("dnd-select-add",o)},178:function(e,t,i){"use strict";var a=i(2),s=i(174);class l extends a.a{static get properties(){return{initialValue:{type:Boolean,value:!1,observer:"initValueChange"},checked:{type:Boolean,value:!1,reflectToAttribute:!0,notify:!0},label:{type:String,value:""},secondaryLabel:{type:String,value:""},disabled:{type:Boolean,value:!1,reflectToAttribute:!0}}}initValueChange(){this.switchEl&&(this.switchEl.checked=this.initialValue,this.checked=this.initialValue)}ready(){super.ready(),setTimeout(()=>{this.switchEl=new s.a(this.shadowRoot.querySelector(".mdc-switch")),this.switchEl.checked=this.initialValue,this.checked=this.initialValue},10)}connectedCallback(){super.connectedCallback(),this.switchEventHandler=()=>{this.checked=this.switchEl.checked,this.dispatchEvent(new CustomEvent("switch-change",{detail:{checked:this.switchEl.checked},bubbles:!0,composed:!0}))},this.shadowRoot.querySelector(".mdc-switch__native-control").addEventListener("change",this.switchEventHandler)}disconnectedCallback(){super.disconnectedCallback(),this.shadowRoot.querySelector(".mdc-switch__native-control").removeEventListener("change",this.switchEventHandler)}_switchClasses(e){return e?"mdc-switch mdc-list-item__meta mdc-switch--disabled":"mdc-switch mdc-list-item__meta"}static get template(){return a.b`
      <style include="material-styles">
        :host {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        :host([checked]) label.secondary {
          color: var(--mdc-theme-primary);
        }
        :host([checked]) label:not(.secondary) {
          color: var(--lumo-secondary-text-color);
        }
        label {
          color: var(--mdc-theme-primary);
          font-weight: 500;
          font-size: var(--lumo-font-size-s);
          margin-right: 16px;
          transition: color 0.2s;
        }
        label.secondary {
          color: var(--lumo-secondary-text-color);
          margin-right: 0;
          margin-left: 16px;
        }
        :host([extra-padding]) label.secondary {
          margin-left: 50px;
        }
        :host([no-color]) .mdc-switch.mdc-switch--checked .mdc-switch__track {
          background-color: #000;
          border-color: #000;
        }
        :host([no-color]) .mdc-switch.mdc-switch--checked .mdc-switch__thumb {
          background-color: #fff;
          border-color: #fff;
        }
        :host([no-color]) .mdc-switch.mdc-switch--checked .mdc-switch__thumb-underlay::before {
          background-color: #9e9e9e;
        }
        :host([no-color]) .mdc-switch.mdc-switch--checked .mdc-switch__thumb-underlay::after {
          background-color: #9e9e9e;
        }
      </style>
      
      <label for="switch">[[label]]<slot name="label"></slot></label>
      <div class$="[[_switchClasses(disabled)]]">
        <div class="mdc-switch__track"></div>
        <div class="mdc-switch__thumb-underlay">
          <div class="mdc-switch__thumb">
            <input type="checkbox" id="switch" class="mdc-switch__native-control" role="switch" disabled$="[[disabled]]" />
          </div>
        </div>
      </div>
      <label class="secondary">[[secondaryLabel]]<slot name="secondaryLabel"></slot></label>
    `}}customElements.define("dnd-switch",l)},181:function(e,t,i){"use strict";i.r(t);var a=i(2),s=i(32),l=i(46),n=i(136),o=i(0),d=i(1),r=(i(179),i(175),i(198),i(4));i(177),i(105),i(178);class c extends a.a{static get properties(){return{isEditMode:{type:Boolean,value:!1},hasRenderedOutput:{type:Boolean,value:!1},hasAC:{type:Boolean,value:!1},armorAC:{type:Number,value:0},isArmor:{type:Boolean,value:!1},isMartial:{type:Boolean,value:!1},weaponMagicModifier:{type:Number,value:0},itemRarity:{type:String},itemName:{type:String},itemWeight:{type:Number,value:0},weaponProperties:{type:Array},itemResist:{type:String},itemQuantity:{type:Number,value:0},item:{type:Object},storedItem:{type:Object},itemType:{type:String,value:""}}}static get observers(){return["_itemChanged(item)"]}constructor(){super(),this.itemTypes=["Currency","Armor (Light)","Armor (Medium)","Armor (Heavy)","Melee Weapon","Ranged Weapon","Shield","Adventuring Gear","Ammunition","Artisan Tool","Explosive","Gaming Set","Instrument","Mount","Potion","Rod","Ring","Scroll","Spellcasting Focus","Tool","Tack and Harness","Trade Good","Vehicle","Wand"],this.rarityTypes=o.z,this.damageTypes=o.k,this.resistTypes=["None",...o.k],this.weaponPropertyOptions=[{name:"Two-Handed",value:"2H"},{name:"Ammunition",value:"A"},{name:"Finesse",value:"F"},{name:"Heavy",value:"H"},{name:"Light",value:"L"},{name:"Loading",value:"LD"},{name:"Reach",value:"R"},{name:"Reload",value:"RLD"},{name:"Special",value:"S"},{name:"Thrown",value:"T"},{name:"Versatile",value:"V"}],this.weaponPropertyValues=["Two-Handed","Ammunition","Finesse","Heavy","Light","Loading","Reach","Reload","Special","Thrown","Versatile"]}connectedCallback(){super.connectedCallback(),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(l.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(l.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(l.b)().removeEventListener("editModeChange",this.editModeHandler)}_itemChanged(){if(this.item){if(console.error("itemDetail:",this.item),Object(n.renderSelection)(this.item,this.$.renderedOutput),this.hasDescription=!!this.item.source,this.itemType=this._getItemType(),this.hasAC="S"===this.item.type||!!this.item.armor,this.armorAC=this.item.ac,this.acLabel="Armor (Light)"===this.itemType?"AC (+DEX)":"Armor (Medium)"===this.itemType?"AC (+DEX max 2)":"AC",this.isArmor=!!this.item.armor,this.isMartial="Martial"===this.item.weaponCategory,this.weaponProperties=[],this.weaponMagicModifier=0,(this.item.weapon||this.item.weaponCategory)&&(this.weaponMagicModifier=parseInt(this.item.bonusWeapon,10),this.item.property)){const e=this.item.property.map(e=>{const t=this.weaponPropertyOptions.find(t=>t.value===e.trim());if(t)return t.name}).filter(e=>!!e);this.weaponProperties=e}this.itemRarity=this.item.rarity,this.itemName=this.item.name||"",this.itemWeight=this.item.weight||null,this.canHaveResist=this.item.armor||"P"===this.item.type||"RG"===this.item.type,this.itemResist=this.item.resist,this.canHaveQuantity=!0,this.itemQuantity=this.item.quantity||1,this.canHaveSpell="SC"===this.item.type,this.canHaveSpellMod=!0,this.spellAttack=this.item.bonusSpellAttack,this.spellDC=this.item.bonusSpellSaveDc,this.item.storedItem&&(this.storedItem=this.item.storedItem)}}_getItemType(){return this.item?r.a.ITEM_TYPE_JSON_TO_ABV[this.item.type]:""}_selectItemType(){const e=this.root.querySelector("#typeSelect").value;switch(this.storedItem.armor=!1,this.storedItem.weapon=!1,this.storedItem.type="",this.storedItem.isEquipped=!1,this.storedItem.isAttuned=!1,e){case"Armor (Light)":this.storedItem.armor=!0,this.storedItem.weaponCategory=null,this.storedItem.type="LA";break;case"Armor (Medium)":this.storedItem.armor=!0,this.storedItem.weaponCategory=null,this.storedItem.type="MA";break;case"Armor (Heavy)":this.storedItem.armor=!0,this.storedItem.weaponCategory=null,this.storedItem.type="HA";break;case"Ranged Weapon":this.storedItem.weapon=!0,this.storedItem.weaponCategory="Simple",this.storedItem.type="R",this.storedItem.resist=null;break;case"Melee Weapon":this.storedItem.weapon=!0,this.storedItem.weaponCategory="Simple",this.storedItem.type="M",this.storedItem.resist=null;break;case"Shield":this.storedItem.type="S",this.storedItem.weaponCategory=null,this.storedItem.ac=2,this.storedItem.resist=null;break;case"Adventuring Gear":this.storedItem.weaponCategory=null,this.storedItem.type="G",this.storedItem.resist=null;break;case"Currency":this.storedItem.weaponCategory=null,this.storedItem.type="$",this.storedItem.resist=null,this.storedItem.quantity=1,this.storedItem.hasQuantity=!0;break;default:const t=Object.entries(r.a.ITEM_TYPE_JSON_TO_ABV).find(([t,i])=>i===e);t&&(this.storedItem.type=t[0]),"P"===e&&"RG"===e||(this.storedItem.resist=null)}"P"!==this.storedItem.type&&"A"!==this.storedItem.type&&"EXP"!==this.storedItem.type&&"$"!==this.storedItem.type&&(this.storedItem.hasQuantity=!1),Object(s.Db)(this.item)}_updateItem(){Object(s.Db)(this.item)}_addDamage(){this.storedItem.damages||(this.storedItem.damages=[]),this.storedItem.damages.push({roll:"",type:""}),Object(s.Db)(this.item)}_removeDamage(e){const t=Object(d.findInPath)(".roll__damage",e).getAttribute("index"),i=parseInt(t,10);this.storedItem.damages.splice(i,1),Object(s.Db)(this.item)}_changeWeaponType(){this.item.weapon&&(this.isMartial?this.storedItem.weaponCategory="Martial":this.storedItem.weaponCategory="Simple",Object(s.Db)(this.item))}_weaponMagicModifierChange(){let e=parseInt(this.weaponMagicModifier,10);isNaN(e)&&(e=0),this.storedItem.bonusWeapon=e>0?"+"+e:e,Object(s.Db)(this.item)}_itemRarityChange(){this.itemRarity&&(this.storedItem.rarity=this.itemRarity,Object(s.Db)(this.item))}_itemNameChange(){this.itemName&&(this.storedItem.name=this.itemName,Object(s.Db)(this.item))}_addWeaponProperty(){return(e=>{if(e&&e.length){const t=e.map(e=>{const t=this.weaponPropertyOptions.find(t=>t.name===e.trim());if(t)return t.value}).filter(e=>!!e);this.storedItem.property=t,Object(s.Db)(this.item)}}).bind(this)}_armorACChange(){let e=parseInt(this.armorAC,10);isNaN(e)&&(e=0),this.storedItem.ac=e,Object(s.Db)(this.item)}_itemWeightChange(){let e=parseFloat(this.itemWeight,10);isNaN(e)&&(e=0),this.storedItem.weight=e,Object(s.Db)(this.item)}_itemResistChange(){this.itemResist&&(this.storedItem.resist="None"===this.itemResist?null:this.itemResist,Object(s.Db)(this.item))}_itemQuantityChange(){let e=parseInt(this.itemQuantity,10);isNaN(e)&&(e=0),this.storedItem.quantity=e,this.storedItem.hasQuantity=!0,Object(s.Db)(this.item)}_itemSpellAttackChange(){let e=parseInt(this.spellAttack,10);isNaN(e)&&(e=0),this.storedItem.bonusSpellAttack=e,Object(s.Db)(this.item)}_itemSpellDCChange(){let e=parseInt(this.spellDC,10);isNaN(e)&&(e=0),this.storedItem.bonusSpellSaveDc=e,Object(s.Db)(this.item)}_or(...e){for(let t of e)if(t)return!0;return!1}_sourceFull(e){return e&&r.a.sourceJsonToFull(e)}static get template(){return a.b`
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
          width: calc(33% - 12px);
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

        .ac-field {
          width: calc(50% - 14px);
        }
        .ac-suffix {
          font-size: 12px;
        }
        .full-width-field {
          width: calc(100% - 20px);
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

            <div class="edit__weapon" hidden$="[[!_or(item.weapon, item.weaponCategory)]]">
              <h4 class="section_heading">Weapon</h4>
              <dnd-select-add choices="100" class="full-width-field" label="Weapon Properties" options="[[weaponPropertyValues]]" value="[[weaponProperties]]" add-callback="[[_addWeaponProperty()]]"></dnd-select-add>

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

            <vaadin-integer-field class="ac-field" theme="label--secondary"  hidden$="[[!hasAC]]" min="0" max="30" has-controls value="{{armorAC}}" label="[[acLabel]]" on-change="_armorACChange"></vaadin-integer-field>

            <vaadin-integer-field theme="label--secondary" hidden$="[[!item.weapon]]" min="0" max="5" has-controls value="{{weaponMagicModifier}}" label="Weapon Mod" on-change="_weaponMagicModifierChange"></vaadin-integer-field>

            <vaadin-integer-field theme="label--secondary" hidden$="[[!canHaveSpellMod]]" min="0" max="5" has-controls value="{{spellAttack}}" label="Spell Attack" on-change="_itemSpellAttackChange"></vaadin-integer-field>

            <vaadin-integer-field theme="label--secondary" hidden$="[[!canHaveSpellMod]]" min="0" max="5" has-controls value="{{spellDC}}" label="Spell DC" on-change="_itemSpellDCChange"></vaadin-integer-field>

            <vaadin-integer-field theme="label--secondary" hidden$="[[!item.hasQuantity]]" min="0" has-controls value="{{itemQuantity}}" label="Quantity" on-change="_itemQuantityChange"></vaadin-integer-field>

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
              <vaadin-checkbox hidden$="[[!_or(item.weapon, item.weaponCategory)]]" checked="{{storedItem.forceProficient}}" on-change="_updateItem" label="Force Proficiency"></vaadin-checkbox>
              <vaadin-checkbox checked="{{storedItem.reqAttune}}" on-change="_updateItem" label="Requires Attunement"></vaadin-checkbox>
              <vaadin-checkbox checked="{{storedItem.wondrous}}" on-change="_updateItem" label="Wondrous"></vaadin-checkbox>
              <vaadin-checkbox hidden$="[[!hasDescription]]" checked="{{storedItem.hideDescription}}" on-change="_updateItem" label="Hide Description"></vaadin-checkbox>
            </div>

            <vaadin-text-area  theme="label--secondary" class="edit__notes" value="{{storedItem.notes}}" label="Notes" on-blur="_updateItem"></vaadin-text-area>
          </div>
        </template>
      </div>
    `}}customElements.define("dnd-character-builder-equipment-item-detail",c)}}]);
//# sourceMappingURL=1.bundle.js.map