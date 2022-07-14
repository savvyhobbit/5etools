(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{143:function(e,t,i){"use strict";var a=i(3),s=i(32),n=i(1),d=(i(89),i(40));class o extends a.a{static get properties(){return{test:{type:Boolean,reflectToAttribute:!0,value:!1},options:{type:Array,observer:"optionsUpdated"},model:{type:String},addCallback:{type:Function},value:{type:String,value:"",observer:"valueUpdated"},choices:{type:Number,observer:"choicesUpdated"},paren:{type:String},label:{type:String},placeholder:{type:String},multiValue:{type:String,value:""},disabled:{type:Boolean,value:!1,reflectToAttribute:!0}}}choicesUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}optionsUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}valueUpdated(){if(this.choices)if(Array.isArray(this.value)&&this.options){const e=this.value.map(e=>-1!==this.options.indexOf(e)?this.options.indexOf(e):this.options.findIndex(t=>t.name===e.name&&t.source===e.source)).filter(e=>-1!==e);this.listBox&&(this.listBox.selectedValues=e),this.multiValue=e.map(e=>{let t=this.options[e];return t.name?t.name:Object(n.util_capitalizeAll)(t)}).join(", ")}else this.listBox&&(this.listBox.selectedValues=[]),this.multiValue="";else this.value&&this.options?this.value.source?this.$.select.value=this.options.findIndex(e=>e.name===this.value.name&&e.source===this.value.source||e===this.value.name)+"":this.value.name?this.$.select.value=this.options.findIndex(e=>e.name===this.value.name||e===this.value.name)+"":this.$.select.value=this.options.findIndex(e=>e.name===this.value||e===this.value)+"":this.$.select.value=""}ready(){super.ready(),setTimeout(async()=>{this.model&&(this.options=await Object(d.b)(this.model)),this.$.select.renderer=(e,t)=>{if(!this.listBox){if(this.listBox=document.createElement("vaadin-list-box"),this.choices&&(this.listBox.setAttribute("multiple",!0),this.listBox.addEventListener("click",e=>{t.opened=!0;let i=null!==e.srcElement.getAttribute("selected");setTimeout(()=>{this.listBox.selectedValues.length>this.choices&&!i&&this.listBox.selectedValues.splice(this.listBox.selectedValues.length-2,1);let e=this.listBox.selectedValues.map(e=>this.options[e]);this.multiValue=e.map(e=>e.name?e.name:Object(n.util_capitalizeAll)(e)).join(", "),this.addCallback&&this.addCallback(e)},0)})),this.options&&this.options.length)for(let e=0;e<this.options.length;e++){const t=this.options[e],i=document.createElement("vaadin-item"),a=t.name||Object(n.util_capitalizeAll)(t);i.innerHTML=`<span>${a}</span> ${t.name?`<span style='font-size: 14px;color: var(--lumo-primary-color-50pct);'>${t.source}</span>`:""}`,i.setAttribute("value",e),this.listBox.appendChild(i)}e.appendChild(this.listBox),this.$.select._assignMenuElement(),this.valueUpdated()}}},0)}connectedCallback(){super.connectedCallback(),this.selectChangeHandler=()=>{const e=this.$.select.value;if(e&&!this.choices){const t=this.options[e];this.addCallback?this.addCallback(t,this.model):Object(s.O)(void 0,t,this.model),this.value||(this.$.select.value="")}},this.$.select.addEventListener("change",this.selectChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),this.$.select.removeEventListener("change",this.selectChangeHandler)}_exists(e){return!!e}_label(e,t,i){let a="";return e&&(a=e,t&&1!==t&&100!==t&&(a+=` (pick ${t})`),i&&(a+=` (${i})`)),a}static get template(){return a.b`
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
      
    `}}customElements.define("dnd-select-add",o)},148:function(e,t,i){"use strict";i.r(t);var a=i(3),s=i(32),n=i(142),d=i(110),o=i(0),r=i(1),l=(i(146),i(144),i(149),i(2));i(143),i(88);class m extends a.a{static get properties(){return{isEditMode:{type:Boolean,value:!1},hasRenderedOutput:{type:Boolean,value:!1},hasAC:{type:Boolean,value:!1},armorAC:{type:Number,value:0},isArmor:{type:Boolean,value:!1},isMartial:{type:Boolean,value:!1},weaponMagicModifier:{type:Number,value:0},itemRarity:{type:String},itemName:{type:String},itemWeight:{type:Number,value:0},weaponProperties:{type:Array},itemResist:{type:String},itemQuantity:{type:Number,value:0},item:{type:Object},storedItem:{type:Object},itemType:{type:String,value:""},smallRender:{type:Boolean,reflectToAttribute:!0,value:!1}}}static get observers(){return["_itemChanged(item)"]}constructor(){super(),this.itemTypes=["Currency","Armor (Light)","Armor (Medium)","Armor (Heavy)","Melee Weapon","Ranged Weapon","Shield","Adventuring Gear","Ammunition","Artisan Tool","Explosive","Gaming Set","Instrument","Mount","Potion","Rod","Ring","Scroll","Spellcasting Focus","Tool","Tack and Harness","Trade Good","Vehicle","Wand"],this.rarityTypes=o.z,this.damageTypes=o.k,this.resistTypes=["<None>",...o.k],this.weaponPropertyOptions=[{name:"Two-Handed",value:"2H"},{name:"Ammunition",value:"A"},{name:"Finesse",value:"F"},{name:"Heavy",value:"H"},{name:"Light",value:"L"},{name:"Loading",value:"LD"},{name:"Reach",value:"R"},{name:"Reload",value:"RLD"},{name:"Special",value:"S"},{name:"Thrown",value:"T"},{name:"Versatile",value:"V"}],this.weaponPropertyValues=["Two-Handed","Ammunition","Finesse","Heavy","Light","Loading","Reach","Reload","Special","Thrown","Versatile"]}connectedCallback(){super.connectedCallback(),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(n.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(n.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(n.b)().removeEventListener("editModeChange",this.editModeHandler)}_itemChanged(){if(this.item){if(console.error("itemDetail:",this.item),this.item.itemRef&&!this.item.lookupFailed?(this.hasRenderedOutput=!0,Object(d.renderSelection)(this.item,this.$.renderedOutput,void 0,this.smallRender)):this.hasRenderedOutput=!1,this.itemType=this._getItemType(),this.hasAC="S"===this.item.type||!!this.item.armor,this.hasAC&&(this.armorAC=this.item.ac),this.isArmor=!!this.item.armor,this.isMartial="Martial"===this.item.weaponCategory,this.item.weapon){this.weaponMagicModifier=parseInt(this.item.genericBonus,10);const e=this.item.property;if(e){const t=e.split(",").map(e=>{const t=this.weaponPropertyOptions.find(t=>t.value===e.trim());if(t)return t.name}).filter(e=>!!e);this.weaponProperties=t,this.item.damages||(this.item.dmg1?this.item.storedItem.damages=[{roll:this.item.dmg1,type:Object(r.util_capitalizeAll)(l.a.dmgTypeToFull(this.item.dmgType))}]:this.item.storedItem.damages=[])}}this.itemRarity=this.item.rarity,this.itemName=this.item.name,this.itemWeight=this.item.weight,this.canHaveResist=this.item.armor||"P"===this.item.type||"RG"===this.item.type,this.itemResist=this.item.resist,this.canHaveQuantity="P"===this.item.type||"A"===this.item.type||"EXP"===this.item.type,this.itemQuantity=this.item.quantity,this.canHaveSpell="SC"===this.item.type,this.item.storedItem&&(this.storedItem=this.item.storedItem)}}_getItemType(){return this.item?l.a.ITEM_TYPE_JSON_TO_ABV[this.item.type]:""}_selectItemType(){const e=this.root.querySelector("#typeSelect").value;switch(this.storedItem.armor=!1,this.storedItem.weapon=!1,this.storedItem.type="",this.storedItem.isEquipped=!1,this.storedItem.isAttuned=!1,e){case"Armor (Light)":this.storedItem.armor=!0,this.storedItem.weaponCategory=null,this.storedItem.type="LA";break;case"Armor (Medium)":this.storedItem.armor=!0,this.storedItem.weaponCategory=null,this.storedItem.type="MA";break;case"Armor (Heavy)":this.storedItem.armor=!0,this.storedItem.weaponCategory=null,this.storedItem.type="HA";break;case"Ranged Weapon":this.storedItem.weapon=!0,this.storedItem.weaponCategory="Simple",this.storedItem.type="R",this.storedItem.resist=null;break;case"Melee Weapon":this.storedItem.weapon=!0,this.storedItem.weaponCategory="Simple",this.storedItem.type="M",this.storedItem.resist=null;break;case"Shield":this.storedItem.type="S",this.storedItem.weaponCategory=null,this.storedItem.ac=2,this.storedItem.resist=null;break;case"Adventuring Gear":this.storedItem.weaponCategory=null,this.storedItem.type="G",this.storedItem.resist=null;break;case"Currency":this.storedItem.weaponCategory=null,this.storedItem.type="$",this.storedItem.resist=null,this.storedItem.quantity=1,this.storedItem.hasQuantity=!0;break;default:const t=Object.entries(l.a.ITEM_TYPE_JSON_TO_ABV).find(([t,i])=>i===e);t&&(this.storedItem.type=t[0]),"P"===e&&"RG"===e||(this.storedItem.resist=null)}"P"!==this.storedItem.type&&"A"!==this.storedItem.type&&"EXP"!==this.storedItem.type&&"$"!==this.storedItem.type&&(this.storedItem.hasQuantity=!1),Object(s.kb)(this.item)}_updateItem(){Object(s.kb)(this.item)}_addDamage(){this.storedItem.damages||(this.storedItem.damages=[]),this.storedItem.damages.push({roll:"",type:""}),Object(s.kb)(this.item)}_removeDamage(e){const t=Object(r.findInPath)(".roll__damage",e).getAttribute("index"),i=parseInt(t,10);this.storedItem.damages.splice(i,1),Object(s.kb)(this.item)}_changeWeaponType(){this.item.weapon&&(this.isMartial?this.storedItem.weaponCategory="Martial":this.storedItem.weaponCategory="Simple",Object(s.kb)(this.item))}_weaponMagicModifierChange(){let e=parseInt(this.weaponMagicModifier,10);isNaN(e)&&(e=0),this.storedItem.genericBonus=e>0?"+"+e:e,Object(s.kb)(this.item)}_itemRarityChange(){this.itemRarity&&(this.storedItem.rarity=this.itemRarity,Object(s.kb)(this.item))}_itemNameChange(){this.itemName&&(this.storedItem.name=this.itemName,Object(s.kb)(this.item))}_addWeaponProperty(){return(e=>{if(e&&e.length){const t=e.map(e=>{const t=this.weaponPropertyOptions.find(t=>t.name===e.trim());if(t)return t.value}).filter(e=>!!e);this.storedItem.property=t.join(","),Object(s.kb)(this.item)}}).bind(this)}_armorACChange(){let e=parseInt(this.armorAC,10);isNaN(e)&&(e=0),this.storedItem.ac=e,Object(s.kb)(this.item)}_itemWeightChange(){let e=parseFloat(this.itemWeight,10);isNaN(e)&&(e=0),this.storedItem.weight=e,Object(s.kb)(this.item)}_itemResistChange(){this.itemResist&&(this.storedItem.resist="<None>"===this.itemResist?null:this.itemResist,Object(s.kb)(this.item))}_itemQuantityChange(){let e=parseInt(this.itemQuantity,10);isNaN(e)&&(e=0),this.storedItem.quantity=e,this.storedItem.hasQuantity=!0,Object(s.kb)(this.item)}_or(...e){for(let t of e)if(t)return!0;return!1}static get template(){return a.b`
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
            
            <vaadin-integer-field theme="label--secondary"  hidden$="[[!item.hasQuantity]]" min="0" has-controls value="{{itemQuantity}}" label="Quantity" on-change="_itemQuantityChange"></vaadin-integer-field>

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

            <vaadin-text-area  theme="label--secondary" class="edit__notes" value="{{storedItem.notes}}" label="Notes" on-change="_updateItem"></vaadin-text-area>
          </div>
        </template>
      </div>
    `}}customElements.define("dnd-character-builder-equipment-item-detail",m)},155:function(e,t,i){"use strict";i.r(t);var a=i(3),s=i(32),n=i(142);i(145),i(108),i(150),i(162),i(148);class d extends a.a{static get properties(){return{inventory:{type:Array},isEditMode:{type:Boolean,value:!1},character:{type:Object},expandedItems:{type:Array},expandedIds:{type:Array},activeItem:{type:Object},isMobile:{type:Boolean}}}static get observers(){return["_expandedItemsChange(expandedItems.*)"]}_expandedItemsChange(){this.expandedItems&&this.expandedItems.length&&(this.expandedIds=this.expandedItems.filter(e=>!!e).map(e=>e.uniqueId),console.error(this.expandedIds),this.openedItemID&&(this.$.grid.closeItemDetails(this.openedItemID),this.openedItemID=void 0)),window.scrollTo(0,this.originalScrollHeight)}_recordScrollHeight(e){this.originalScrollHeight=window.scrollY}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(s.F)()),Object(s.l)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode,this.$.grid&&setTimeout(()=>{this.$.grid.notifyResize()},0)},Object(n.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(n.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(s.l)().removeEventListener("character-selected",this.characterChangeHandler),Object(n.b)().removeEventListener("editModeChange",this.editModeHandler)}ready(){super.ready(),this._checkBreakpoint(),window.addEventListener("resize",()=>{this._checkBreakpoint()}),setTimeout(()=>{const e=this.$.grid;let t;e.addEventListener("grid-dragstart",(function(i){t=i.detail.draggedItems[0],e.dropMode="on-top-or-between"})),e.addEventListener("grid-dragend",(function(i){t=e.dropMode=null})),e.addEventListener("grid-drop",e=>{const i=e.detail.dropTargetItem;if(t&&t!==i){const a=Object(s.M)(t,i.uniqueId);if(t.container&&a)return;const n=t.storedItem.uniqueId;if(t.storedItem.uniqueId=this.character.itemCounter++,"on-top"===e.detail.dropLocation&&i.container)return void(i.storedItem&&i.storedItem.children&&(i.storedItem.children.push(t.storedItem),Object(s.kb)(i,void 0,!0),Object(s.T)(n)));if(this.inventory){const a=""+i.id;let d=parseInt(a.substring(a.lastIndexOf("_")),10);"below"===e.detail.dropLocation&&d++,i.parentItemREF?(i.parentItemREF.storedItem.children.splice(d,0,t.storedItem),Object(s.kb)(i.parentItemREF,void 0,!0)):Object(s.nb)(d,t.storedItem),Object(s.T)(n)}}}),e.dataProvider=((e,t)=>{const i=e.page*e.pageSize;let a=e.parentItem?e.parentItem.children:this.inventory;if(a&&a.length){t(a.slice(i,i+e.pageSize),a.length)}}).bind(this)},0)}async updateFromCharacter(e){if(e){this.character=e,this.inventory=await Object(s.C)(e),console.error("inventory:",this.inventory);const t=window.scrollY;if(this.$.grid.clearCache(),this.openedItemID){const e=Object(s.B)(this.inventory,this.openedItemID.uniqueId);e&&this.$.grid.openItemDetails(e)}if(this.expandedIds){const e=this.expandedIds.map(e=>Object(s.B)(this.inventory,e));this.expandedItems=e}this.activeItem&&(this.activeItem=Object(s.B)(this.inventory,this.activeItem.uniqueId)),window.scrollTo(0,t),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}}_expandDetails(e){let t=e.model.__data.item,i=this.$.grid.detailsOpenedItems.indexOf(t)>-1;const a=window.scrollY;for(let e of this.$.grid.detailsOpenedItems)this.$.grid.closeItemDetails(e);i?(this.$.grid.closeItemDetails(t),this.openedItemID=void 0):(this.$.grid.openItemDetails(t),this.openedItemID=t),this.$.grid.notifyResize(),window.scrollTo(0,a)}_flashCheckbox(e){e&&(e.classList.add("transition-bg"),e.classList.add("flash-error"),setTimeout(()=>{e.classList.remove("flash-error"),setTimeout(()=>{e.classList.remove("transition-bg")},200)},200))}_deleteItem(e){let t=e.model.__data.item&&void 0!==e.model.__data.item.uniqueId?e.model.__data.item.uniqueId:void 0;Object(s.T)(t)}async _setItemEquipped(e){e.preventDefault(),e.stopPropagation();let t=e.model.__data.item,i=t?t.uniqueId:void 0;if(!!t&&t.isEquipped)Object(s.ub)(i);else if(await Object(s.f)(t))Object(s.ub)(i);else{let t=e.target.querySelector("vaadin-checkbox");this._flashCheckbox(t)}}async _setItemAttuned(e){e.preventDefault(),e.stopPropagation();let t=e.model.__data.item,i=t?t.uniqueId:void 0;if(!!t&&t.isAttuned)Object(s.tb)(i);else if(await Object(s.e)(t))Object(s.tb)(i);else{let t=e.target.querySelector("vaadin-checkbox");this._flashCheckbox(t)}}_quantityChange(e){const t=this.$.grid.getEventContext(e).item;let i=parseInt(t.quantity,10);isNaN(i)&&(i=0),t.storedItem.quantity=i,Object(s.kb)(t)}_addItem(){Object(s.c)({},!1)}_preventDefault(e){e.preventDefault(),e.stopPropagation()}_or(...e){for(let t of e)if(t)return!0;return!1}_noRarity(e){return!e||"None"===e}_toggleTheme(e){return e.children&&0===e.children.length?"no-children":""}_checkBreakpoint(){const e=this.$.grid;this.isMobile=window.innerWidth<921,this.isMobile?e.rowDetailsRenderer=((e,t,i)=>{i.detailsOpened&&(e.firstElementChild||(e.innerHTML='<div class="details"></div>'),this.detailEl||(this.detailEl=document.createElement("dnd-character-builder-equipment-item-detail"),this.detailEl.smallRender=!0,this.detailEl.unique=Date.now()),e.querySelector(".details").appendChild(this.detailEl),this.detailEl.item=i.item)}).bind(this):e.rowDetailsRenderer&&(console.error("removing rowDetailsRenderer"),e.rowDetailsRenderer=()=>{})}_linkClick(){this.dispatchEvent(new CustomEvent("open-drawer",{bubbles:!0,composed:!0,detail:{viewId:"items"}}))}_isActive(e,t){return e===t}static get template(){return a.b`
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
        <button class="mdc-icon-button material-icons" on-click="_linkClick">logout</button>
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
//# sourceMappingURL=7.bundle.js.map