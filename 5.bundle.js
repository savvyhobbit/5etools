(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{115:function(e,t,a){"use strict";a(78)},118:function(e,t,a){"use strict";a.r(t),a.d(t,"renderSelection",(function(){return o}));var i=a(71),s=a(5),r=a(1);const n=new i.a;function o(e,t,a){!function(e){if(e.hasParsed)return;if(e.hasParsed=!0,e.noDisplay)return;"GV"===e.type&&(e.category="Generic Variant");void 0===e.category&&(e.category="Other");void 0===e.entries?e.entries=[]:e.entries=Object(r.cloneDeep)(e.entries);if(e.type&&window.itemTypeList[e.type])for(let t=0;t<window.itemTypeList[e.type].entries.length;t++)e.entries.push(window.itemTypeList[e.type].entries[t]);if(e.property){const t=e.property.split(",");for(let a=0;a<t.length;a++)if(window.itemPropertyList[t[a]].entries)for(let i=0;i<window.itemPropertyList[t[a]].entries.length;i++)e.entries.push(window.itemPropertyList[t[a]].entries[i])}e.armor?(e.resist&&e.entries.push("You have resistance to "+e.resist+" damage while you wear this armor."),e.armor&&e.stealth&&e.entries.push("The wearer has disadvantage on Stealth (Dexterity) checks."),"HA"===e.type&&e.strength&&e.entries.push("If the wearer has a Strength score lower than "+e.strength+", their speed is reduced by 10 feet.")):e.resist&&("P"===e.type&&e.entries.push("When you drink this potion, you gain resistance to "+e.resist+" damage for 1 hour."),"RG"===e.type&&e.entries.push("You have resistance to "+e.resist+" damage while wearing this ring."));"SCF"===e.type&&("arcane"===e.scfType&&e.entries.push("An arcane focus is a special item designed to channel the power of arcane spells. A sorcerer, warlock, or wizard can use such an item as a spellcasting focus, using it in place of any material component which does not list a cost."),"druid"===e.scfType&&e.entries.push("A druid can use such a druidic focus as a spellcasting focus, using it in place of any material component that does not have a cost."),"holy"===e.scfType&&(e.entries.push("A holy symbol is a representation of a god or pantheon."),e.entries.push("A cleric or paladin can use a holy symbol as a spellcasting focus, using it in place of any material components which do not list a cost. To use the symbol in this way, the caster must hold it in hand, wear it visibly, or bear it on a shield.")))}(e);(t.querySelector(".selection-wrapper")||t).innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="margin-bottom_small">\n\t\t\t<span class="type"></span><span class="rarity"></span>\n\t\t\t<span class="attunement"></span>\n\t\t</div>\n\t\t<div class="margin-bottom_small">\n\t\t\t<span class="value"></span><span class="weight"></span>\n\t\t</div>\n\t\t<div class="margin-bottom_small">\n\t\t\t<span class="damage"></span>\n\t\t\t<span class="damageType"></span>\n\t\t\t<span class="properties"></span>\n\t\t</div>\n\t\t<div class="text"></div>\n\t\t<div class="margin-bottom_small">Source: <span class="source"></span></div>\n\t</div>';const i=e.source,o=s.a.sourceJsonToFull(i);t.querySelector(".stats-wrapper .source").innerHTML=`${o}, page ${e.page}`,t.querySelector(".stats-wrapper .value").innerHTML=e.value?e.value+(e.weight?", ":""):"",t.querySelector(".stats-wrapper .weight").innerHTML=e.weight?e.weight+(1==e.weight?" lb.":" lbs."):"",t.querySelector(".stats-wrapper .rarity").innerHTML=(e.tier?", "+e.tier:"")+(e.rarity?", "+e.rarity:""),t.querySelector(".stats-wrapper .attunement").innerHTML=e.reqAttune?e.reqAttune:"",t.querySelector(".stats-wrapper .type").innerHTML=e.typeText,t.querySelector(".stats-wrapper .damage").innerHTML="",t.querySelector(".stats-wrapper .damageType").innerHTML="";const d=e.type||"";if(e.weaponCategory)if(e.damages&&e.damages.length)for(let a=0;a<e.damages.length;a++){const i=e.damages[a],n=a===e.damages.length-1;i.roll&&i.type&&(t.querySelector(".stats-wrapper .damage").innerHTML+=`<span>${Object(r.utils_makeRoller)(i.roll)} ${s.a.dmgTypeToFull(i.type)}</span>${n?"":" + "}`)}else e.dmg1&&(t.querySelector(".stats-wrapper .damage").innerHTML=Object(r.utils_makeRoller)(e.dmg1)),e.dmgType&&(t.querySelector(".stats-wrapper .damageType").innerHTML=s.a.dmgTypeToFull(e.dmgType));else if("LA"===d||"MA"===d||"HA"===d)t.querySelector(".stats-wrapper .damage").innerHTML="AC "+e.ac+("LA"===d?" + Dex":"MA"===d?" + Dex (max 2)":"");else if("S"===d)t.querySelector(".stats-wrapper .damage").innerHTML="AC +"+e.ac;else if("MNT"===d||"VEH"===d){const a=e.speed,i=e.carryingcapacity;a&&t.querySelector(".stats-wrapper .damage").append("Speed="+a),a&&i&&t.querySelector(".stats-wrapper .damage").append("MNT"===d?", ":"<br>"),i&&(t.querySelector(".stats-wrapper .damage").append("Carrying Capacity="+i),-1===i.indexOf("ton")&&-1===i.indexOf("passenger")&&t.querySelector(".stats-wrapper .damage").append(1==i?" lb.":" lbs."))}if(t.querySelector(".stats-wrapper .properties").innerHTML="",e.property){const a=e.property.split(",");for(let i=0;i<a.length;i++){const s=a[i];let r=window.itemPropertyList[s].name;"V"===s&&e.dmg2&&(r=`${r} (${e.dmg2})`),"T"!==s&&"A"!==s&&"AF"!==s||(r=`${r} (${e.range}ft.)`),"RLD"===s&&(r=`${r} (${e.reload} shots)`),r=(i>0?", ":e.dmg1?"- ":"")+r,t.querySelector(".stats-wrapper .properties").append(r)}}const l={type:"entries",entries:e.entries},m=[];n.recursiveEntryRender(l,m,1),t.querySelector(".stats-wrapper .text").innerHTML=Object(r.utils_makeRoller)(m.join("")).split(e.name.toLowerCase()).join("<i>"+e.name.toLowerCase()+"</i>"),a&&t.querySelector(".margin-bottom_small").remove()}},122:function(e,t,a){"use strict";a.r(t);var i=a(7),s=a(17),r=a(110),n=a(118),o=a(0),d=a(1),l=(a(115),a(45),a(50),a(52),a(13));const m=l.a`<dom-module id="lumo-text-area" theme-for="vaadin-text-area">
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
</dom-module>`;document.head.appendChild(m.content);a(78);var p=a(75),h=a(41),c=a(19);
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
class u extends(Object(h.a)(Object(p.a)(Object(c.a)(i.a)))){static get template(){return l.a`
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
`}static get is(){return"vaadin-text-area"}static get version(){return"2.6.2"}static get observers(){return["_textAreaValueChanged(value)"]}ready(){super.ready(),this._updateHeight(),this.addEventListener("animationend",this._onAnimationEnd)}_onAnimationEnd(e){0===e.animationName.indexOf("vaadin-text-area-appear")&&this._updateHeight()}get _slottedTagName(){return"textarea"}_textAreaValueChanged(e){this._updateHeight()}_updateHeight(){const e=this.root.querySelector("[part=input-field]"),t=e.scrollTop,a=this.inputElement,i=getComputedStyle(a).width,s=this.value?this.value.length:0;this._oldValueLength>=s&&(a.style.maxWidth=i,a.style.height="auto",e.style.display="block"),this._oldValueLength=s;const r=a.scrollHeight;r>a.clientHeight&&(a.style.height=r+"px"),a.style.removeProperty("max-width"),e.style.removeProperty("display"),e.scrollTop=t,this._dispatchIronResizeEventIfNeeded("InputHeight",r)}}customElements.define(u.is,u);var g=a(5);class y extends i.a{static get properties(){return{isEditMode:{type:Boolean,value:!1},hasRenderedOutput:{type:Boolean,value:!1},hasAC:{type:Boolean,value:!1},armorAC:{type:Number,value:0},isArmor:{type:Boolean,value:!1},isMartial:{type:Boolean,value:!1},weaponMagicModifier:{type:Number,value:0},itemRarity:{type:String},itemName:{type:String},itemWeight:{type:Number,value:0},weaponProperties:{type:Array},itemResist:{type:String},itemQuantity:{type:Number,value:0},item:{type:Object},storedItem:{type:Object},itemType:{type:String,value:""}}}static get observers(){return["_itemChanged(item)"]}constructor(){super(),this.itemTypes=["Armor (Light)","Armor (Medium)","Armor (Heavy)","Melee Weapon","Ranged Weapon","Shield","Adventuring Gear","Ammunition","Artisan Tool","Explosive","Gaming Set","Instrument","Mount","Potion","Rod","Ring","Scroll","Spellcasting Focus","Tool","Tack and Harness","Trade Good","Vehicle","Wand"],this.rarityTypes=["None","Common","Uncommon","Rare","Very Rare","Legendary","Artifact"],this.damageTypes=o.k,this.resistTypes=["<None>",...o.k],this.weaponPropertyOptions=[{name:"Two-Handed",value:"2H"},{name:"Ammunition",value:"A"},{name:"Finesse",value:"F"},{name:"Heavy",value:"H"},{name:"Light",value:"L"},{name:"Loading",value:"LD"},{name:"Reach",value:"R"},{name:"Reload",value:"RLD"},{name:"Special",value:"S"},{name:"Thrown",value:"T"},{name:"Versatile",value:"V"}],this.weaponPropertyValues=["Two-Handed","Ammunition","Finesse","Heavy","Light","Loading","Reach","Reload","Special","Thrown","Versatile"]}connectedCallback(){super.connectedCallback(),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(r.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(r.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(r.b)().removeEventListener("editModeChange",this.editModeHandler)}_itemChanged(){if(console.error("itemDetail:",this.item),this.item.itemRef&&!this.item.lookupFailed?(this.hasRenderedOutput=!0,Object(n.renderSelection)(this.item,this.$.renderedOutput,!0)):this.hasRenderedOutput=!1,this.itemType=this._getItemType(),this.hasAC="S"===this.item.type||!!this.item.armor,this.hasAC&&(this.armorAC=this.item.ac),this.isArmor=!!this.item.armor,this.isMartial="Martial"===this.item.weaponCategory,this.item.weapon){this.weaponMagicModifier=parseInt(this.item.genericBonus,10);const e=this.item.property;if(e){const t=e.split(",").map(e=>{const t=this.weaponPropertyOptions.find(t=>t.value===e.trim());if(t)return t.name}).filter(e=>!!e);this.weaponProperties=t,this.item.damages||(this.item.dmg1?this.item.storedItem.damages=[{roll:this.item.dmg1,type:Object(d.util_capitalizeAll)(g.a.dmgTypeToFull(this.item.dmgType))}]:this.item.storedItem.damages=[])}}this.itemRarity=this.item.rarity,this.itemName=this.item.name,this.itemWeight=this.item.weight,this.canHaveResist=this.item.armor||"P"===this.item.type||"RG"===this.item.type,this.itemResist=this.item.resist,this.canHaveQuantity="P"===this.item.type||"A"===this.item.type||"EXP"===this.item.type,this.itemQuantity=this.item.quantity,this.canHaveSpell="SC"===this.item.type,this.item.storedItem&&(this.storedItem=this.item.storedItem)}_getItemType(){return this.item?g.a.ITEM_TYPE_JSON_TO_ABV[this.item.type]:""}_selectItemType(){const e=this.$.typeSelect.value;switch(this.storedItem.armor=!1,this.storedItem.weapon=!1,this.storedItem.type="",this.storedItem.isEquipped=!1,this.storedItem.isAttuned=!1,e){case"Armor (Light)":this.storedItem.armor=!0,this.storedItem.weaponCategory=null,this.storedItem.type="LA";break;case"Armor (Medium)":this.storedItem.armor=!0,this.storedItem.weaponCategory=null,this.storedItem.type="MA";break;case"Armor (Heavy)":this.storedItem.armor=!0,this.storedItem.weaponCategory=null,this.storedItem.type="HA";break;case"Ranged Weapon":this.storedItem.weapon=!0,this.storedItem.weaponCategory="Simple",this.storedItem.type="R",this.storedItem.resist=null;break;case"Melee Weapon":this.storedItem.weapon=!0,this.storedItem.weaponCategory="Simple",this.storedItem.type="M",this.storedItem.resist=null;break;case"Shield":this.storedItem.type="S",this.storedItem.weaponCategory=null,this.storedItem.ac=2,this.storedItem.resist=null;break;case"Adventuring Gear":this.storedItem.weaponCategory=null,this.storedItem.type="G",this.storedItem.resist=null;break;default:const t=Object.entries(g.a.ITEM_TYPE_JSON_TO_ABV).find(([t,a])=>a===e);t&&(this.storedItem.type=t[0]),"P"===e&&"RG"===e||(this.storedItem.resist=null)}"P"!==this.storedItem.type&&"A"!==this.storedItem.type&&"EXP"!==this.storedItem.type&&(this.storedItem.hasQuantity=!1),Object(s.lb)(this.item)}_updateItem(){Object(s.lb)(this.item)}_addDamage(){this.storedItem.damages||(this.storedItem.damages=[]),this.storedItem.damages.push({roll:"",type:""}),Object(s.lb)(this.item)}_removeDamage(e){const t=Object(d.findInPath)(".roll__damage",e).getAttribute("index"),a=parseInt(t,10);this.storedItem.damages.splice(a,1),Object(s.lb)(this.item)}_changeWeaponType(){this.item.weapon&&(this.isMartial?this.storedItem.weaponCategory="Martial":this.storedItem.weaponCategory="Simple",Object(s.lb)(this.item))}_weaponMagicModifierChange(){let e=parseInt(this.weaponMagicModifier,10);isNaN(e)&&(e=0),this.storedItem.genericBonus=e>0?"+"+e:e,Object(s.lb)(this.item)}_itemRarityChange(){this.itemRarity&&(this.storedItem.rarity=this.itemRarity,Object(s.lb)(this.item))}_itemNameChange(){this.itemName&&(this.storedItem.name=this.itemName,Object(s.lb)(this.item))}_addWeaponProperty(){return(e=>{if(e&&e.length){const t=e.map(e=>{const t=this.weaponPropertyOptions.find(t=>t.name===e.trim());if(t)return t.value}).filter(e=>!!e);this.storedItem.property=t.join(","),Object(s.lb)(this.item)}}).bind(this)}_armorACChange(){let e=parseInt(this.armorAC,10);isNaN(e)&&(e=0),this.storedItem.ac=e,Object(s.lb)(this.item)}_itemWeightChange(){let e=parseFloat(this.itemWeight,10);isNaN(e)&&(e=0),this.storedItem.weight=e,Object(s.lb)(this.item)}_itemResistChange(){this.itemResist&&(this.storedItem.resist="<None>"===this.itemResist?null:this.itemResist,Object(s.lb)(this.item))}_itemQuantityChange(){let e=parseInt(this.itemQuantity,10);isNaN(e)&&(e=0),this.storedItem.quantity=e,this.storedItem.hasQuantity=!0,Object(s.lb)(this.item)}_or(...e){for(let t of e)if(t)return!0;return!1}static get template(){return i.b`
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
        .edit__weapon {
          margin-right: 10px;
        }

        .roll__damages {
          display: flex;
          flex-direction: column;
        }
        .roll__damage {
          display: flex;
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
          margin-right: 16px;
        }
        .roll__damage-remove {
          margin: auto 16px 4px;
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
          max-width: calc(50% - 12px);
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

        .margin-bottom_large {
          margin-bottom: 0 !important;
        }

        @media(min-width: 921px) {
        }
      </style>

      <div>
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
            <vaadin-text-field class="edit__name" value="{{itemName}}" label="Name" on-change="_itemNameChange"></vaadin-text-field>
            <vaadin-number-field has-controls value="{{itemWeight}}" label="Weight" min="0" on-change="_itemWeightChange"></vaadin-number-field>

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
              <vaadin-integer-field  min="0" max="5" has-controls value="{{weaponMagicModifier}}" label="Magic Modifier" on-change="_weaponMagicModifierChange"></vaadin-integer-field>

              <dnd-select-add choices="100" label="Weapon Properties" options="[[weaponPropertyValues]]" value="[[weaponProperties]]" add-callback="[[_addWeaponProperty()]]"></dnd-select-add>

              <dnd-switch label='Simple Weapon' secondary-label='Martial Weapon' initial-value="[[isMartial]]" checked={{isMartial}} on-switch-change="_changeWeaponType" ></dnd-switch>

              <template is="dom-repeat" items="[[storedItem.damages]]" as="damage">
                <div class="roll__damage" index$="[[index]]">
                  <dnd-button on-click="_removeDamage" icon="remove" class='roll__damage-remove icon-only'></dnd-button>
                  <div class="roll__damage-roll--edit">
                    <vaadin-text-field value="{{damage.roll}}" on-change="_updateItem" label="Damage Roll"></vaadin-text-field>
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

            <vaadin-integer-field hidden$="[[!hasAC]]" min="0" max="30" has-controls value="{{armorAC}}" label="AC" on-change="_armorACChange"></vaadin-integer-field>
            
            <vaadin-integer-field hidden$="[[!item.hasQuantity]]" min="0" has-controls value="{{itemQuantity}}" label="Quantity" on-change="_itemQuantityChange"></vaadin-integer-field>

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
              <vaadin-checkbox hidden$="[[!canHaveQuantity]]" checked="{{storedItem.hasQuantity}}" on-change="_updateItem">Has Quantity?</vaadin-checkbox>
              <vaadin-checkbox hidden$="[[!isArmor]]" checked="{{storedItem.stealth}}" on-change="_updateItem">Disadvantage on Stealth?</vaadin-checkbox>
              <vaadin-checkbox checked="{{storedItem.reqAttune}}" on-change="_updateItem">Requires Attunement?</vaadin-checkbox>
              <vaadin-checkbox checked="{{storedItem.wondrous}}" on-change="_updateItem">Wondrous?</vaadin-checkbox>
              <vaadin-checkbox hidden$="[[!storedItem.itemRef]]" checked="{{storedItem.hideRef}}" on-change="_updateItem">Hide Reference?</vaadin-checkbox>
            </div>

            <vaadin-text-area class="edit__notes" value="{{storedItem.notes}}" label="Notes" on-change="_updateItem"></vaadin-text-area>
          </div>
        </template>
      </div>
    `}}customElements.define("dnd-character-builder-equipment-item-detail",y)}}]);
//# sourceMappingURL=5.bundle.js.map