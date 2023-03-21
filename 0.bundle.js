(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{146:function(e,t,s){"use strict";var i=s(3),l=s(32),o=s(1),a=(s(90),s(40));class n extends i.a{static get properties(){return{test:{type:Boolean,reflectToAttribute:!0,value:!1},options:{type:Array,observer:"optionsUpdated"},model:{type:String},addCallback:{type:Function},value:{type:String,value:"",observer:"valueUpdated"},choices:{type:Number,observer:"choicesUpdated"},paren:{type:String},label:{type:String},placeholder:{type:String},multiValue:{type:String,value:""},disabled:{type:Boolean,value:!1,reflectToAttribute:!0}}}choicesUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}optionsUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}valueUpdated(){if(this.choices)if(Array.isArray(this.value)&&this.options){const e=this.value.map(e=>-1!==this.options.indexOf(e)?this.options.indexOf(e):this.options.findIndex(t=>t.name===e.name&&t.source===e.source)).filter(e=>-1!==e);this.listBox&&(this.listBox.selectedValues=e),this.multiValue=e.map(e=>{let t=this.options[e];return t.name?t.name:Object(o.util_capitalizeAll)(t)}).join(", ")}else this.listBox&&(this.listBox.selectedValues=[]),this.multiValue="";else this.value&&this.options?this.value.source?this.$.select.value=this.options.findIndex(e=>e.name===this.value.name&&e.source===this.value.source||e===this.value.name)+"":this.value.name?this.$.select.value=this.options.findIndex(e=>e.name===this.value.name||e===this.value.name)+"":this.$.select.value=this.options.findIndex(e=>e.name===this.value||e===this.value)+"":this.$.select.value=""}ready(){super.ready(),setTimeout(async()=>{this.model&&(this.options=await Object(a.b)(this.model)),this.$.select.renderer=(e,t)=>{if(!this.listBox){if(this.listBox=document.createElement("vaadin-list-box"),this.choices&&(this.listBox.setAttribute("multiple",!0),this.listBox.addEventListener("click",e=>{t.opened=!0;let s=null!==e.srcElement.getAttribute("selected");setTimeout(()=>{this.listBox.selectedValues.length>this.choices&&!s&&this.listBox.selectedValues.splice(this.listBox.selectedValues.length-2,1);let e=this.listBox.selectedValues.map(e=>this.options[e]);this.multiValue=e.map(e=>e.name?e.name:Object(o.util_capitalizeAll)(e)).join(", "),this.addCallback&&this.addCallback(e)},0)})),this.options&&this.options.length)for(let e=0;e<this.options.length;e++){const t=this.options[e],s=document.createElement("vaadin-item"),i=t.name||Object(o.util_capitalizeAll)(t);s.innerHTML=`<span style='margin-left: 10px;'>${i}</span> ${t.name?`<span style='font-size: 14px;color: var(--lumo-primary-color-50pct);'>${t.source||""}</span>`:""}`,s.setAttribute("value",e),this.listBox.appendChild(s)}e.appendChild(this.listBox),this.$.select._assignMenuElement(),this.valueUpdated()}}},0)}connectedCallback(){super.connectedCallback(),this.selectChangeHandler=()=>{const e=this.$.select.value;if(e&&!this.choices){const t=this.options[e];this.addCallback?this.addCallback(t,this.model):Object(l.Z)(void 0,t,this.model),this.value||(this.$.select.value="")}},this.$.select.addEventListener("change",this.selectChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),this.$.select.removeEventListener("change",this.selectChangeHandler)}_exists(e){return!!e}_label(e,t,s){let i="";return e&&(i=e,t&&1!==t&&100!==t&&(i+=` (pick ${t})`),s&&(i+=` (${s})`)),i}static get template(){return i.b`
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
      
    `}}customElements.define("dnd-select-add",n)},148:function(e,t,s){"use strict";s.r(t);var i=s(3),l=s(32),o=s(143),a=s(1),n=s(40),r=(s(146),s(111)),d=(s(70),s(89),s(0)),c=s(2);class h extends i.a{static get properties(){return{storageKey:{type:String},selectedItem:{type:Object},skillProfOptions:{type:Array,value:[]},skillProfChoices:{type:Number},selectedSkillProfs:{type:Array},defaultSkillProfs:{type:String,value:""},toolProfOptions:{type:Array,value:[]},defaultToolProfs:{type:String,value:""},langProfOptions:{type:Array,value:[]},defaultLangProfs:{type:String,value:""},weaponProfOptions:{type:Array,value:[]},defaultWeaponProfs:{type:String,value:""},armorProfOptions:{type:Array,value:[]},defaultArmorProfs:{type:String,value:""},defaultDarkvision:{type:String,value:""},attributeOptions:{type:Array,value:[]},attributeChoices:{type:Number},attributeMod:{type:Number},selectedAttributes:{type:Array},defaultAttributes:{type:String,value:""},resistOptions:{type:Array,value:[]},resistChoices:{type:Number},selectedResists:{type:Array},defaultResists:{type:String,value:""},conditionImmuneOptions:{type:Array,value:[]},conditionImmuneChoices:{type:Number},selectedConditionImmunes:{type:Array},defaultConditionImmunes:{type:String,value:""},featOptions:{type:Array,value:[]},featChoices:{type:Number},selectedFeat:{type:Array},sTLProfOptions:{type:Array,value:[]},sTLProfChoices:{type:Number},selectedSTLProfs:{type:Array},isEditMode:{type:Boolean,value:!1},dontCreateIfMissing:{type:Boolean,value:!1,reflectToAttribute:!0}}}static get observers(){return["updateOptions(selectedItem, storageKey)"]}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.set("character",t)},this.set("character",Object(l.Q)()),Object(l.n)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(o.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(o.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(l.n)().removeEventListener("character-selected",this.characterChangeHandler),Object(o.b)().removeEventListener("editModeChange",this.editModeHandler)}async updateOptions(){if(this.character||this.set("character",Object(l.Q)()),this.storageKey&&this.selectedItem){const e=this.storageKey.split(".");this.character.choices||(this.character.choices={});let t=this.character.choices;for(let s=0;s<e.length;s++){const i=e[s];if(!t[i]){if(this.dontCreateIfMissing)return void this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}));e.length<s+1&&!isNaN(parseInt(e[s+1],10))?t[i]=new Array(20):t[i]={}}t=t[i]}if(this.storedItem=t,this.attributeOptions=[],this.attributeChoices=null,this.attributeMod=1,this.selectedAttributes=null,this.defaultAttributes=null,this.selectedItem.ability&&this.selectedItem.ability.length){const e=this.selectedItem.ability[0];e.choose&&(this.attributeOptions=e.choose.from.map(e=>e.toUpperCase()),this.attributeChoices=e.choose.count||1,this.attributeMod=e.choose.amount||1,this.selectedAttributes=this.storedItem.selectedAttributes?this.storedItem.selectedAttributes.split(","):null),this.defaultAttributes=this.selectedItem.ability.map(e=>Object.entries(e).map(e=>{if("choose"!==e[0]&&"any"!==e[0]){let t=e[0].toLowerCase(),s=e[1];return t.toUpperCase()+" "+Object(a.absInt)(s)}}).filter(e=>!!e).join(", ")).filter(e=>!!e).join(", "),this.storedItem.defaultAttributes=this.defaultAttributes,this.storedItem.attributeMod=this.attributeMod}if(this.skillProfOptions=[],this.skillProfChoices=null,this.selectedSkillProfs=null,this.defaultSkillProfs=null,this.selectedItem.skillProficiencies&&this.selectedItem.skillProficiencies.length){const e=this.selectedItem.skillProficiencies[0];e.choose&&(this.skillProfOptions=e.choose.from,this.skillProfChoices=e.choose.count||1,this.selectedSkillProfs=this.storedItem.selectedSkillProfs?this.storedItem.selectedSkillProfs.split(","):null),e.any&&("Custom Lineage"===this.selectedItem.name?this.skillProfOptions=["Darkvision (60ft)"].concat(Object.keys(r.SKILL_TO_ATB_ABV)):this.skillProfOptions=Object.keys(r.SKILL_TO_ATB_ABV),this.skillProfChoices=e.any,this.selectedSkillProfs=this.storedItem.selectedSkillProfs?this.storedItem.selectedSkillProfs.split(","):null),this.defaultSkillProfs=Object.keys(e).map(e=>{if("choose"!==e&&"any"!==e)return Object(a.util_capitalizeAll)(e)}).filter(e=>!!e).join(", "),this.storedItem.defaultSkillProfs=this.defaultSkillProfs}const s=[];let i=[];if(this.selectedItem.toolProficiencies&&this.selectedItem.toolProficiencies.length)if(this.selectedItem.toolProficiencies.length>1);else{this.storedItem.selectedToolProfs&&"string"!=typeof this.storedItem.selectedToolProfs||(this.storedItem.selectedToolProfs={});const e=this.selectedItem.toolProficiencies[0];Object.entries(e).forEach(([t,l])=>{const o={key:t,toolProfOptions:Object(d.dd)(t),selectedToolProfs:this.storedItem.selectedToolProfs[t]?this.storedItem.selectedToolProfs[t].split(","):null};switch(t){case"choose":const n=l.from.map(d.dd);o.toolProfOptions=n.flat(),o.toolProfChoices=l.count||1,s.push(o);break;case"any":o.toolProfChoices=e.any||1,s.push(o);break;case"artisan's tools":case"musical instrument":case"gaming set":o.label="Selected "+Object(a.util_capitalizeAll)(t),o.toolProfChoices=Number.isInteger(l)?l:1,s.push(o);break;default:i.push(Object(a.util_capitalizeAll)(t))}}),i=i.filter(e=>!!e).join(", "),this.set("defaultToolProfs",i.length>0?i:null),this.storedItem.defaultToolProfs=i}this.set("toolProfOptions",s.length>0?s:null);let l=[],o=1;if(this.selectedItem.skillToolLanguageProficiencies&&this.selectedItem.skillToolLanguageProficiencies.length){const e=this.selectedItem.skillToolLanguageProficiencies[0];e.choose&&e.choose.length&&(e.choose[0].from&&e.choose[0].from.length&&(e.choose[0].from.includes("anySkill")&&(l=l.concat(Object.keys(c.a.SKILL_JSON_TO_FULL).map(e=>({name:e,type:"skill"})))),e.choose[0].from.includes("anyTool")&&(l=l.concat(d.Ec.map(e=>({...e,type:"tool"}))))),e.choose[0].count&&(o=e.choose[0].count))}this.sTLProfChoices=o,this.set("sTLProfOptions",l.length>0?l:null),this.selectedSTLProfs=this.storedItem.selectedSTLProfs||null;let h=[],u=[],p=1;this.selectedItem.resist&&this.selectedItem.resist.length&&(this.selectedItem.resist.forEach(e=>{"string"==typeof e?h.push(e):e.choose&&(u=e.choose.from,e.choose.count&&(p=e.choose.count))}),this.set("defaultResists",h.length>0?h.map(a.util_capitalizeAll).join(", "):null),this.storedItem.defaultResists=h),this.resistChoices=p,this.set("resistOptions",u.length>0?u:null),this.selectedResists=this.storedItem.selectedResists||null;let f=[],m=[],b=1;this.selectedItem.conditionImmune&&this.selectedItem.conditionImmune.length&&(this.selectedItem.conditionImmune.forEach(e=>{"string"==typeof e?f.push(e):e.choose&&(m=e.choose.from,e.choose.count&&(b=e.choose.count))}),this.set("defaultConditionImmunes",f.length>0?f.map(a.util_capitalizeAll).join(", "):null),this.storedItem.defaultConditionImmunes=f),this.conditionImmuneChoices=b,this.set("conditionImmuneOptions",m.length>0?m:null),this.selectedConditionImmunes=this.storedItem.selectedConditionImmunes||null;const P=[];let g=[];this.selectedItem.languageProficiencies&&this.selectedItem.languageProficiencies.length&&(this.storedItem.selectedLangProfs&&"string"!=typeof this.storedItem.selectedLangProfs||(this.storedItem.selectedLangProfs={}),this.selectedItem.languageProficiencies.forEach(e=>{Object.entries(e).forEach(([e,t])=>{const s={key:e,langProfOptions:Object(d.dd)(e),selectedLangProfs:this.storedItem.selectedLangProfs[e]?this.storedItem.selectedLangProfs[e].split(","):null};switch(e){case"choose":s.langProfOptions=t.from,s.langProfChoices=t.count||1,P.push(s);break;case"any":case"anyStandard":s.langProfOptions=d.s,s.langProfChoices=Number.isInteger(t)?t:1,P.push(s);break;case"other":let i=this.selectedItem.name;i.includes("(")&&(i=i.substring(0,i.indexOf("(")).trim()),g.push(i);break;default:g.push(Object(a.util_capitalizeAll)(e))}})}),g=g.filter(e=>!!e).join(", "),this.defaultLangProfs=g.length>0?g:null,this.storedItem.defaultLangProfs=g),this.set("langProfOptions",P.length>0?P:null);const y=[];let I=[];this.selectedItem.weaponProficiencies&&this.selectedItem.weaponProficiencies.length&&(this.storedItem.selectedWeaponProfs&&"string"!=typeof this.storedItem.selectedWeaponProfs||(this.storedItem.selectedWeaponProfs={}),this.selectedItem.weaponProficiencies.forEach(e=>{Object.entries(e).forEach(([e,t])=>{const s={key:e,selectedWeaponProfs:this.storedItem.selectedWeaponProfs[e]?this.storedItem.selectedWeaponProfs[e].split(","):null};switch(e){case"any":s.weaponProfOptions=d.ad,s.weaponProfChoices=Number.isInteger(t)?t:1,y.push(s);break;case"choose":s.weaponProfOptions="martial"===t.fromFilter?d.bd:"simple"===y.choose.fromFilter?d.cd:d.ad,s.weaponProfChoices=t.count||1,y.push(s);break;default:const i=e.split("|")[0];I.push(Object(a.util_capitalizeAll)(i))}})}),I=I.filter(e=>!!e).join(", ")),I.length>0?(this.set("defaultWeaponProfs",I),this.storedItem.defaultWeaponProfs=I):(this.set("defaultWeaponProfs",null),this.storedItem.defaultWeaponProfs=null),this.set("defaultWeaponProfs",I.length>0?I:null),this.storedItem.defaultWeaponProfs=I,this.set("weaponProfOptions",y.length>0?y:null);const k=[];let O,v=[];this.selectedItem.armorProficiencies&&this.selectedItem.armorProficiencies.length&&(this.storedItem.selectedArmorProfs&&"string"!=typeof this.storedItem.selectedArmorProfs||(this.storedItem.selectedArmorProfs={}),this.selectedItem.armorProficiencies.forEach(e=>{Object.entries(e).forEach(([e,t])=>{const s={key:e,selectedArmorProfs:this.storedItem.selectedArmorProfs[e]?this.storedItem.selectedArmorProfs[e].split(","):null};switch(e){case"any":s.armorProfOptions=["light","medium","heavy","shield"],s.armorProfChoices=Number.isInteger(t)?t:1,k.push(s);break;default:if(e.includes("|")){const t=e.split("|")[0];v.push(Object(a.util_capitalizeAll)(t))}else v.push(Object(a.util_capitalizeAll)(e))}})}),v=v.filter(e=>!!e).join(", "),this.defaultArmorProfs=v.length>0?v:null,this.storedItem.defaultArmorProfs=v),this.set("armorProfOptions",k.length>0?k:null),this.selectedItem.entries&&this.selectedItem.entries.forEach(e=>{if(e&&e.name&&"darkvision"===e.name.toLowerCase()&&e.entries&&e.entries.length){const t=e.entries[0].includes("60"),s=e.entries[0].includes("120");O=s?120:t?60:0}}),this.storedItem.defaultDarkvision=O||null,this.defaultDarkvision=O||null,this.featOptions=[],this.featChoices=null,this.selectedFeat=null,this.selectedItem.feats&&(this.featOptions=await Object(n.b)("feats"),this.featChoices=this.selectedItem.feats,this.selectedFeat=this.storedItem.selectedFeat),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}else this.storedItem={},this.attributeOptions=[],this.skillProfOptions=[],this.armorProfOptions=[],this.weaponProfOptions=[],this.toolProfOptions=[],this.langProfOptions=[],this.featOptions=[],this.defaultAttributes=null,this.defaultSkillProfs=null,this.defaultArmorProfs=null,this.defaultWeaponProfs=null,this.defaultToolProfs=null,this.defaultLangProfs=null,this.defaultDarkvision=null}_toolProficiencyAddCallback(e,t){return(s=>{this.storedItem.selectedToolProfs[e]=s.join(",");const i=Object(a.cloneDeep)(this.toolProfOptions);i[t].selectedToolProfs=s,this.set("toolProfOptions",i),Object(l.hb)(this.character)}).bind(this)}_langProficiencyAddCallback(e,t){return(s=>{this.storedItem.selectedLangProfs[e]=s.join(",");const i=Object(a.cloneDeep)(this.langProfOptions);i[t].selectedLangProfs=s,this.set("langProfOptions",i),Object(l.hb)(this.character)}).bind(this)}_armorProficiencyAddCallback(e,t){return(s=>{this.storedItem.selectedArmorProfs[e]=s.join(",");const i=Object(a.cloneDeep)(this.armorProfOptions);i[t].selectedArmorProfs=s,this.set("armorProfOptions",i),Object(l.hb)(this.character)}).bind(this)}_weaponProficiencyAddCallback(e,t){return(s=>{this.storedItem.selectedWeaponProfs[e]=s.join(",");const i=Object(a.cloneDeep)(this.weaponProfOptions);i[t].selectedWeaponProfs=s,this.set("weaponProfOptions",i),Object(l.hb)(this.character)}).bind(this)}_skillProficiencyAddCallback(){return(e=>{this.storedItem.selectedSkillProfs=e.join(","),this.selectedSkillProfs=e,Object(l.hb)(this.character)}).bind(this)}_attributeAddCallback(){return(e=>{this.storedItem.selectedAttributes=e.join(","),this.selectedAttributes=e,Object(l.hb)(this.character)}).bind(this)}_featAddCallback(){return(e=>{this.storedItem.selectedFeat=e,this.selectedFeat=this.storedItem.selectedFeat,Object(l.hb)(this.character)}).bind(this)}_resistAddCallback(){return(e=>{this.storedItem.selectedResists=e,this.selectedResists=e,Object(l.hb)(this.character)}).bind(this)}_conditionImmuneAddCallback(){return(e=>{this.storedItem.selectedConditionImmunes=e,this.selectedConditionImmunes=e,Object(l.hb)(this.character)}).bind(this)}_suboptionStorageKey(e){return e+".suboptions"}_showEmpty(e,t){return!e&&!t}_exists(){for(let e of arguments)if(e&&(e.constructor!==Object||Object.entries(e).length>0)&&(!Array.isArray(e)||e.length>0))return!0;return!1}_plusPrefix(e){return"+"+e}_plural(e,t,s){const i=s||e;return t>1?i+"s":i}_printOptions(e,t,s){let i=[];for(const l of e)i=i.concat(t[`selected${s}Profs`][l]);return i.join(", ")}static get template(){return i.b`
            <style include="material-styles">
                .some {}
                :host {
                    display: block;
                    white-space: initial;
                }
                [hidden] {
                    display: none !important;
                }
                dnd-character-builder-suboptions {
                    padding-left: 40px;
                    display: block;
                }
                dnd-select-add {
                    width: 100%;
                    display: block;
                }
                dnd-select-add,
                dnd-character-builder-suboptions {
                    width: var(--suboptions__width);
                    max-width: var(--suboptions__max-width);
                }
                .default-selection {
                    font-size: 14px;
                    margin-bottom: 6px;
                }
                @media(min-width: 420px) {
                    dnd-select-add {
                        
                    }
                }

                @media(min-width: 921px) {
                }
            </style>

            <div class="col-wrap">
                <div hidden$="[[!_exists(defaultAttributes)]]" class="default-selection"><b>Ability Increase: </b><span>[[defaultAttributes]]</span></div>

                <div hidden$="[[!_exists(defaultSkillProfs)]]" class="default-selection"><b>Skills: </b><span>[[defaultSkillProfs]]</span></div>
                
                <div hidden$="[[!_exists(defaultArmorProfs)]]" class="default-selection"><b>Armor: </b><span>[[defaultArmorProfs]]</span></div>

                <div hidden$="[[!_exists(defaultWeaponProfs)]]" class="default-selection"><b>Weapons: </b><span>[[defaultWeaponProfs]]</span></div>

                <div hidden$="[[!_exists(defaultToolProfs)]]" class="default-selection"><b>Tools: </b><span>[[defaultToolProfs]]</span></div>

                <div hidden$="[[!_exists(defaultLangProfs)]]" class="default-selection"><b>Languages: </b><span>[[defaultLangProfs]]</span></div>

                <div hidden$="[[!_exists(defaultDarkvision)]]" class="default-selection"><b>Darkvision: </b><span>[[defaultDarkvision]] ft.</span></div>

                <div hidden$="[[!_exists(defaultResists)]]" class="default-selection"><b>Resistances: </b><span>[[defaultResists]]</span></div>

                <div hidden$="[[!_exists(defaultConditionImmunes)]]" class="default-selection"><b>Condition Immunities: </b><span>[[defaultConditionImmunes]]</span></div>


                <template is="dom-if" if="[[_exists(attributeOptions)]]">
                    <dnd-select-add disabled$="[[!isEditMode]]" 
                        placeholder="<Select Attribute>" label='[[_plural("Selected Attribute", attributeChoices)]]'
                        choices="[[attributeChoices]]" paren="[[_plusPrefix(attributeMod)]]" options="[[attributeOptions]]"
                        value="[[selectedAttributes]]" add-callback="[[_attributeAddCallback()]]">
                    </dnd-select-add>
                </template>

                <template is="dom-if" if="[[_exists(skillProfOptions)]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Skill>" label='[[_plural("Selected Skill", skillProfChoices)]]'
                        choices="[[skillProfChoices]]" options="[[skillProfOptions]]"
                        value="[[selectedSkillProfs]]" add-callback="[[_skillProficiencyAddCallback()]]">
                    </dnd-select-add>
                </template>

                <template is="dom-repeat" items="[[armorProfOptions]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Armor>" label='[[_plural("Selected Armor", item.armorProfChoices, item.label)]]'
                        choices="[[item.armorProfChoices]]" options="[[item.armorProfOptions]]"
                        value="[[item.selectedArmorProfs]]" add-callback="[[_armorProficiencyAddCallback(item.key, index)]]">
                    </dnd-select-add>
                </template>

                <template is="dom-repeat" items="[[weaponProfOptions]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Weapon>" label='[[_plural("Selected Weapon", item.weaponProfChoices, item.label)]]'
                        choices="[[item.weaponProfChoices]]" options="[[item.weaponProfOptions]]"
                        value="[[item.selectedWeaponProfs]]" add-callback="[[_weaponProficiencyAddCallback(item.key, index)]]">
                    </dnd-select-add>
                </template>

                <template is="dom-repeat" items="[[toolProfOptions]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Tool>" label='[[_plural("Selected Tool", item.toolProfChoices, item.label)]]'
                        choices="[[item.toolProfChoices]]" options="[[item.toolProfOptions]]"
                        value="[[item.selectedToolProfs]]" add-callback="[[_toolProficiencyAddCallback(item.key, index)]]">
                    </dnd-select-add>
                </template>

                <template is="dom-repeat" items="[[langProfOptions]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Language>" label='[[_plural("Selected Language", item.langProfChoices, item.label)]]'
                        choices="[[item.langProfChoices]]" options="[[item.langProfOptions]]"
                        value="[[item.selectedLangProfs]]" add-callback="[[_langProficiencyAddCallback(item.key, index)]]">
                    </dnd-select-add>
                </template>

                <template is="dom-if" if="[[_exists(sTLProfOptions)]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Skill or Tool>" label="Selected Skill or Tool"
                        choices="[[sTLProfChoices]]" options="[[sTLProfOptions]]"
                        value="[[selectedSTLProfs]]" add-callback="[[_sTLProfAddCallback()]]">
                    </dnd-select-add>
                </template>

                <template is="dom-if" if="[[_exists(resistOptions)]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Resistance>" label="Selected Resistance"
                        choices="[[resistChoices]]" options="[[resistOptions]]"
                        value="[[selectedResists]]" add-callback="[[_resistAddCallback()]]">
                    </dnd-select-add>
                </template>

                <template is="dom-if" if="[[_exists(conditionImmuneOptions)]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Condition Immunity>" label="Selected Condition Immunity"
                        choices="[[conditionImmuneChoices]]" options="[[conditionImmuneOptions]]"
                        value="[[selectedConditionImmunes]]" add-callback="[[_conditionImmuneAddCallback()]]">
                    </dnd-select-add>
                </template>

                <template is="dom-if" if="[[_exists(featOptions)]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Feat>" label="Selected Feat"
                        options="[[featOptions]]" value="[[selectedFeat]]"
                        add-callback="[[_featAddCallback()]]">
                    </dnd-select-add>
                    
                    <template is="dom-if" if="[[_exists(selectedFeat)]]"></template>
                        <dnd-character-builder-suboptions storage-key="[[_suboptionStorageKey(storageKey)]]" selected-item="[[selectedFeat]]"></dnd-character-builder-suboptions>
                    </template>
                </template>
            </div>
        `}}customElements.define("dnd-character-builder-suboptions",h)}}]);
//# sourceMappingURL=0.bundle.js.map