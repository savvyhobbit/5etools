(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{144:function(e,t,s){"use strict";var i=s(3),l=s(32),o=s(1),a=(s(89),s(40));class r extends i.a{static get properties(){return{test:{type:Boolean,reflectToAttribute:!0,value:!1},options:{type:Array,observer:"optionsUpdated"},model:{type:String},addCallback:{type:Function},value:{type:String,value:"",observer:"valueUpdated"},choices:{type:Number,observer:"choicesUpdated"},paren:{type:String},label:{type:String},placeholder:{type:String},multiValue:{type:String,value:""},disabled:{type:Boolean,value:!1,reflectToAttribute:!0}}}choicesUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}optionsUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}valueUpdated(){if(this.choices)if(Array.isArray(this.value)&&this.options){const e=this.value.map(e=>-1!==this.options.indexOf(e)?this.options.indexOf(e):this.options.findIndex(t=>t.name===e.name&&t.source===e.source)).filter(e=>-1!==e);this.listBox&&(this.listBox.selectedValues=e),this.multiValue=e.map(e=>{let t=this.options[e];return t.name?t.name:Object(o.util_capitalizeAll)(t)}).join(", ")}else this.listBox&&(this.listBox.selectedValues=[]),this.multiValue="";else this.value&&this.options?this.value.source?this.$.select.value=this.options.findIndex(e=>e.name===this.value.name&&e.source===this.value.source||e===this.value.name)+"":this.value.name?this.$.select.value=this.options.findIndex(e=>e.name===this.value.name||e===this.value.name)+"":this.$.select.value=this.options.findIndex(e=>e.name===this.value||e===this.value)+"":this.$.select.value=""}ready(){super.ready(),setTimeout(async()=>{this.model&&(this.options=await Object(a.b)(this.model)),this.$.select.renderer=(e,t)=>{if(!this.listBox){if(this.listBox=document.createElement("vaadin-list-box"),this.choices&&(this.listBox.setAttribute("multiple",!0),this.listBox.addEventListener("click",e=>{t.opened=!0;let s=null!==e.srcElement.getAttribute("selected");setTimeout(()=>{this.listBox.selectedValues.length>this.choices&&!s&&this.listBox.selectedValues.splice(this.listBox.selectedValues.length-2,1);let e=this.listBox.selectedValues.map(e=>this.options[e]);this.multiValue=e.map(e=>e.name?e.name:Object(o.util_capitalizeAll)(e)).join(", "),this.addCallback&&this.addCallback(e)},0)})),this.options&&this.options.length)for(let e=0;e<this.options.length;e++){const t=this.options[e],s=document.createElement("vaadin-item"),i=t.name||Object(o.util_capitalizeAll)(t);s.innerHTML=`<span style='margin-left: 10px;'>${i}</span> ${t.name?`<span style='font-size: 14px;color: var(--lumo-primary-color-50pct);'>${t.source}</span>`:""}`,s.setAttribute("value",e),this.listBox.appendChild(s)}e.appendChild(this.listBox),this.$.select._assignMenuElement(),this.valueUpdated()}}},0)}connectedCallback(){super.connectedCallback(),this.selectChangeHandler=()=>{const e=this.$.select.value;if(e&&!this.choices){const t=this.options[e];this.addCallback?this.addCallback(t,this.model):Object(l.X)(void 0,t,this.model),this.value||(this.$.select.value="")}},this.$.select.addEventListener("change",this.selectChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),this.$.select.removeEventListener("change",this.selectChangeHandler)}_exists(e){return!!e}_label(e,t,s){let i="";return e&&(i=e,t&&1!==t&&100!==t&&(i+=` (pick ${t})`),s&&(i+=` (${s})`)),i}static get template(){return i.b`
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
      
    `}}customElements.define("dnd-select-add",r)},147:function(e,t,s){"use strict";s.r(t);var i=s(3),l=s(32),o=s(142),a=s(1),r=s(40),d=(s(144),s(111)),c=(s(70),s(90),s(0));class n extends i.a{static get properties(){return{storageKey:{type:String},selectedItem:{type:Object},skillProfOptions:{type:Array,value:[]},skillProfChoices:{type:Number},selectedSkillProfs:{type:Array},defaultSkillProfs:{type:String,value:""},toolProfOptions:{type:Array,value:[]},defaultToolProfs:{type:String,value:""},langProfOptions:{type:Array,value:[]},defaultLangProfs:{type:String,value:""},weaponProfOptions:{type:Array,value:[]},defaultWeaponProfs:{type:String,value:""},armorProfOptions:{type:Array,value:[]},defaultArmorProfs:{type:String,value:""},attributeOptions:{type:Array,value:[]},attributeChoices:{type:Number},attributeMod:{type:Number},selectedAttributes:{type:Array},defaultAttributes:{type:String,value:""},featOptions:{type:Array,value:[]},featChoices:{type:Number},selectedFeat:{type:Array},isEditMode:{type:Boolean,value:!1},dontCreateIfMissing:{type:Boolean,value:!1,reflectToAttribute:!0}}}static get observers(){return["updateOptions(selectedItem, storageKey, character)"]}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.set("character",t),this.updateOptions()},this.set("character",Object(l.O)()),Object(l.n)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(o.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(o.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(l.n)().removeEventListener("character-selected",this.characterChangeHandler),Object(o.b)().removeEventListener("editModeChange",this.editModeHandler)}async updateOptions(){if(this.character&&this.storageKey&&this.selectedItem){const e=this.storageKey.split(".");this.character.choices||(this.character.choices={});let t=this.character.choices;for(let s=0;s<e.length;s++){const i=e[s];if(!t[i]){if(this.dontCreateIfMissing)return void this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}));e.length<s+1&&!isNaN(parseInt(e[s+1],10))?t[i]=new Array(20):t[i]={}}t=t[i]}if(this.storedItem=t,this.attributeOptions=[],this.attributeChoices=null,this.attributeMod=1,this.selectedAttributes=null,this.defaultAttributes=null,this.selectedItem.ability&&this.selectedItem.ability.length){const e=this.selectedItem.ability[0];e.choose&&(this.attributeOptions=e.choose.from.map(e=>e.toUpperCase()),this.attributeChoices=e.choose.count||1,this.attributeMod=e.choose.amount||1,this.selectedAttributes=this.storedItem.selectedAttributes?this.storedItem.selectedAttributes.split(","):null),this.defaultAttributes=Object.entries(e).map(e=>{if("choose"!==e[0]&&"any"!==e[0]){let t=e[0].toLowerCase(),s=e[1];return t.toUpperCase()+" "+Object(a.absInt)(s)}}).filter(e=>!!e).join(", "),this.storedItem.defaultAttributes=this.defaultAttributes,this.storedItem.attributeMod=this.attributeMod}if(this.skillProfOptions=[],this.skillProfChoices=null,this.selectedSkillProfs=null,this.defaultSkillProfs=null,this.selectedItem.skillProficiencies&&this.selectedItem.skillProficiencies.length){const e=this.selectedItem.skillProficiencies[0];e.choose&&(this.skillProfOptions=e.choose.from,this.skillProfChoices=e.choose.count||1,this.selectedSkillProfs=this.storedItem.selectedSkillProfs?this.storedItem.selectedSkillProfs.split(","):null),e.any&&("Custom Lineage"===this.selectedItem.name?this.skillProfOptions=["Darkvision (60ft)"].concat(Object.keys(d.SKILL_TO_ATB_ABV)):this.skillProfOptions=Object.keys(d.SKILL_TO_ATB_ABV),this.skillProfChoices=e.any,this.selectedSkillProfs=this.storedItem.selectedSkillProfs?this.storedItem.selectedSkillProfs.split(","):null),this.defaultSkillProfs=Object.keys(e).map(e=>{if("choose"!==e&&"any"!==e)return Object(a.util_capitalizeAll)(e)}).filter(e=>!!e).join(", "),this.storedItem.defaultSkillProfs=this.defaultSkillProfs}const s=[];let i=[];if(this.selectedItem.toolProficiencies&&this.selectedItem.toolProficiencies.length)if(this.selectedItem.toolProficiencies.length>1);else{this.storedItem.selectedToolProfs&&"string"!=typeof this.storedItem.selectedToolProfs||(this.storedItem.selectedToolProfs={});const e=this.selectedItem.toolProficiencies[0];Object.entries(e).forEach(([t,l])=>{const o={key:t,toolProfOptions:Object(c.cd)(t),selectedToolProfs:this.storedItem.selectedToolProfs[t]?this.storedItem.selectedToolProfs[t].split(","):null};switch(t){case"choose":const r=e.choose.from.map(c.cd);o.toolProfOptions=r.flat(),o.toolProfChoices=e.choose.count||1,s.push(o);break;case"any":o.toolProfChoices=e.any||1,s.push(o);break;case"artisan's tools":case"musical instrument":case"gaming set":o.label="Selected "+Object(a.util_capitalizeAll)(t),o.toolProfChoices=Number.isInteger(l)?l:1,s.push(o);break;default:i.push(Object(a.util_capitalizeAll)(t))}}),i=i.filter(e=>!!e).join(", "),this.set("defaultToolProfs",i.length>0?i:null),this.storedItem.defaultToolProfs=i}this.set("toolProfOptions",s.length>0?s:null);const l=[];let o=[];this.selectedItem.languageProficiencies&&this.selectedItem.languageProficiencies.length&&(this.storedItem.selectedLangProfs&&"string"!=typeof this.storedItem.selectedLangProfs||(this.storedItem.selectedLangProfs={}),this.selectedItem.languageProficiencies.forEach(e=>{Object.entries(e).forEach(([t,s])=>{const i={key:t,langProfOptions:Object(c.cd)(t),selectedLangProfs:this.storedItem.selectedLangProfs[t]?this.storedItem.selectedLangProfs[t].split(","):null};switch(t){case"choose":i.langProfOptions=l.choose.from,i.langProfChoices=e.choose.count||1,l.push(i);break;case"any":case"anyStandard":i.langProfOptions=c.s,i.langProfChoices=Number.isInteger(s)?s:1,l.push(i);break;case"other":let r=this.selectedItem.name;r.includes("(")&&(r=r.substring(0,r.indexOf("(")).trim()),o.push(r);break;default:o.push(Object(a.util_capitalizeAll)(t))}})}),o=o.filter(e=>!!e).join(", "),this.defaultLangProfs=o.length>0?o:null,this.storedItem.defaultLangProfs=o),this.set("langProfOptions",l.length>0?l:null);const n=[];let h=[];this.selectedItem.weaponProficiencies&&this.selectedItem.weaponProficiencies.length&&(this.storedItem.selectedWeaponProfs&&"string"!=typeof this.storedItem.selectedWeaponProfs||(this.storedItem.selectedWeaponProfs={}),this.selectedItem.weaponProficiencies.forEach(e=>{Object.entries(e).forEach(([t,s])=>{const i={key:t,selectedWeaponProfs:this.storedItem.selectedWeaponProfs[t]?this.storedItem.selectedWeaponProfs[t].split(","):null};switch(t){case"any":i.weaponProfOptions=c.Zc,i.weaponProfChoices=Number.isInteger(s)?s:1,n.push(i);break;case"choose":i.weaponProfOptions="martial"===n.choose.from?c.ad:"simple"===n.choose.from?c.bd:c.Zc,i.weaponProfChoices=e.choose.count||1,n.push(i);break;default:if(t.includes("|")){const e=t.split("|")[0];h.push(Object(a.util_capitalizeAll)(e))}else h.push(Object(a.util_capitalizeAll)(t))}})}),h=h.filter(e=>!!e).join(", ")),h.length>0?(this.set("defaultWeaponProfs",h),this.storedItem.defaultWeaponProfs=h):(this.set("defaultWeaponProfs",null),this.storedItem.defaultWeaponProfs=null),this.set("defaultWeaponProfs",h.length>0?h:null),this.storedItem.defaultWeaponProfs=h,this.set("weaponProfOptions",n.length>0?n:null);const p=[];let u,f=[];this.selectedItem.armorProficiencies&&this.selectedItem.armorProficiencies.length&&(this.storedItem.selectedArmorProfs&&"string"!=typeof this.storedItem.selectedArmorProfs||(this.storedItem.selectedArmorProfs={}),this.selectedItem.armorProficiencies.forEach(e=>{Object.entries(e).forEach(([e,t])=>{const s={key:e,selectedArmorProfs:this.storedItem.selectedArmorProfs[e]?this.storedItem.selectedArmorProfs[e].split(","):null};switch(e){case"any":s.armorProfOptions=["light","medium","heavy","shield"],s.armorProfChoices=Number.isInteger(t)?t:1,p.push(s);break;default:if(e.includes("|")){const t=e.split("|")[0];f.push(Object(a.util_capitalizeAll)(t))}else f.push(Object(a.util_capitalizeAll)(e))}})}),f=f.filter(e=>!!e).join(", "),this.defaultArmorProfs=f.length>0?f:null,this.storedItem.defaultArmorProfs=f),this.set("armorProfOptions",p.length>0?p:null),this.selectedItem.entries&&this.selectedItem.entries.forEach(e=>{if(e&&e.name&&"darkvision"===e.name.toLowerCase()&&e.entries&&e.entries.length){const t=e.entries[0].includes("60"),s=e.entries[0].includes("120");u=s?120:t?60:0}}),this.storedItem.defaultDarkvision=u||null,this.defaultDarkvision=u||null,this.featOptions=[],this.featChoices=null,this.selectedFeat=null,this.selectedItem.feats&&(this.featOptions=await Object(r.b)("feats"),this.featChoices=this.selectedItem.feats,this.selectedFeat=this.storedItem.selectedFeat),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}}_skillProficiencyAddCallback(){return(e=>{this.storedItem.selectedSkillProfs=e.join(","),Object(l.fb)(this.character)}).bind(this)}_toolProficiencyAddCallback(e){return(t=>{this.storedItem.selectedToolProfs[e]=t.join(","),Object(l.fb)(this.character)}).bind(this)}_langProficiencyAddCallback(e){return(t=>{this.storedItem.selectedLangProfs[e]=t.join(","),Object(l.fb)(this.character)}).bind(this)}_armorProficiencyAddCallback(e){return(t=>{this.storedItem.selectedArmorProfs[e]=t.join(","),Object(l.fb)(this.character)}).bind(this)}_weaponProficiencyAddCallback(e){return(t=>{this.storedItem.selectedWeaponProfs[e]=t.join(","),Object(l.fb)(this.character)}).bind(this)}_attributeAddCallback(){return(e=>{this.storedItem.selectedAttributes=e.join(","),Object(l.fb)(this.character)}).bind(this)}_featAddCallback(){return(e=>{this.storedItem.selectedFeat=e,Object(l.fb)(this.character)}).bind(this)}_suboptionStorageKey(e){return e+".suboptions"}_showEmpty(e,t){return!e&&!t}_exists(){for(let e of arguments)if(e&&(e.constructor!==Object||Object.entries(e).length>0)&&(!Array.isArray(e)||e.length>0))return!0;return!1}_plusPrefix(e){return"+"+e}_plural(e,t,s){const i=s||e;return t>1?i+"s":i}_printOptions(e,t,s){let i=[];for(const l of e)i=i.concat(t[`selected${s}Profs`][l]);return i.join(", ")}static get template(){return i.b`
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
                        value="[[item.selectedArmorProfs]]" add-callback="[[_armorProficiencyAddCallback(item.key)]]">
                    </dnd-select-add>
                </template>

                <template is="dom-repeat" items="[[weaponProfOptions]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Weapon>" label='[[_plural("Selected Weapon", item.weaponProfChoices, item.label)]]'
                        choices="[[item.weaponProfChoices]]" options="[[item.weaponProfOptions]]"
                        value="[[item.selectedWeaponProfs]]" add-callback="[[_weaponProficiencyAddCallback(item.key)]]">
                    </dnd-select-add>
                </template>

                <template is="dom-repeat" items="[[toolProfOptions]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Tool>" label='[[_plural("Selected Tool", item.toolProfChoices, item.label)]]'
                        choices="[[item.toolProfChoices]]" options="[[item.toolProfOptions]]"
                        value="[[item.selectedToolProfs]]" add-callback="[[_toolProficiencyAddCallback(item.key)]]">
                    </dnd-select-add>
                </template>

                <template is="dom-repeat" items="[[langProfOptions]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Language>" label='[[_plural("Selected Language", item.langProfChoices, item.label)]]'
                        choices="[[item.langProfChoices]]" options="[[item.langProfOptions]]"
                        value="[[item.selectedLangProfs]]" add-callback="[[_langProficiencyAddCallback(item.key)]]">
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
        `}}customElements.define("dnd-character-builder-suboptions",n)}}]);
//# sourceMappingURL=0.bundle.js.map