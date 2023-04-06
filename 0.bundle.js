(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{145:function(e,t,s){"use strict";var l=s(3),i=s(32),a=s(1),o=(s(89),s(40));class d extends l.a{static get properties(){return{test:{type:Boolean,reflectToAttribute:!0,value:!1},options:{type:Array},model:{type:String},addCallback:{type:Function},value:{type:String,value:"",observer:"valueUpdated"},choices:{type:Number,observer:"choicesUpdated"},paren:{type:String},label:{type:String},placeholder:{type:String},multiValue:{type:String,value:""},disabled:{type:Boolean,value:!1,reflectToAttribute:!0}}}choicesUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}soptionsUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}valueUpdated(){if(this.choices)if(Array.isArray(this.value)&&this.options){const e=this.value.map(e=>-1!==this.options.indexOf(e)?this.options.indexOf(e):this.options.findIndex(t=>t.name===e.name&&t.source===e.source)).filter(e=>-1!==e);this.listBox&&(this.listBox.selectedValues=e),this.multiValue=e.map(e=>{let t=this.options[e];return t.name?t.name:Object(a.util_capitalizeAll)(t)}).join(", ")}else this.listBox&&(this.listBox.selectedValues=[]),this.multiValue="";else this.value&&this.options?this.value.source?this.$.select.value=this.options.findIndex(e=>e.name===this.value.name&&e.source===this.value.source||e===this.value.name)+"":this.value.name?this.$.select.value=this.options.findIndex(e=>e.name===this.value.name||e===this.value.name)+"":this.$.select.value=this.options.findIndex(e=>e.name===this.value||e===this.value)+"":this.$.select.value=""}ready(){super.ready(),setTimeout(async()=>{this.model&&(this.options=await Object(o.b)(this.model));const e=this.$.select._overlayElement.shadowRoot.querySelector("#content");let t=0;e.addEventListener("scroll",s=>{t=e.scrollTop},{passive:!0}),this.$.select.renderer=(s,l)=>{if(!this.listBox){if(this.listBox=document.createElement("vaadin-list-box"),this.choices&&(this.listBox.setAttribute("multiple",!0),this.listBox.addEventListener("click",s=>{l.opened=!0;let i=null!==s.srcElement.getAttribute("selected");e.scroll(0,t),setTimeout(()=>{this.listBox.selectedValues.length>this.choices&&!i&&this.listBox.selectedValues.splice(this.listBox.selectedValues.length-2,1);let e=this.listBox.selectedValues.map(e=>this.options[e]);this.multiValue=e.map(e=>e.name?e.name:Object(a.util_capitalizeAll)(e)).join(", "),this.addCallback&&this.addCallback(e)},0)})),this.options&&this.options.length)for(let e=0;e<this.options.length;e++){const t=this.options[e],s=document.createElement("vaadin-item"),l=t.name||Object(a.util_capitalizeAll)(t);s.innerHTML=`<span style='margin-left: 10px;'>${l}</span> ${t.name?`<span style='font-size: 14px;color: var(--lumo-primary-color-50pct);'>${t.source||""}</span>`:""}`,s.setAttribute("value",e),this.listBox.appendChild(s)}s.appendChild(this.listBox),this.$.select._assignMenuElement(),this.valueUpdated()}}},0)}connectedCallback(){super.connectedCallback(),this.selectChangeHandler=()=>{const e=this.$.select.value;if(e&&!this.choices){const t=this.options[e];this.addCallback?this.addCallback(t,this.model):Object(i.X)(void 0,t,this.model),this.value||(this.$.select.value="")}},this.$.select.addEventListener("change",this.selectChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),this.$.select.removeEventListener("change",this.selectChangeHandler)}_exists(e){return!!e}_label(e,t,s){let l="";return e&&(l=e,t&&1!==t&&100!==t&&(l+=` (pick ${t})`),s&&(l+=` (${s})`)),l}static get template(){return l.b`
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
      
    `}}customElements.define("dnd-select-add",d)},148:function(e,t,s){"use strict";s.r(t);var l=s(3),i=s(32),a=s(143),o=s(1),d=s(40),n=(s(145),s(156),s(112)),c=(s(70),s(90),s(0)),r=s(2);class h extends l.a{static get properties(){return{storageKey:{type:String},label:{type:String},selectedItem:{type:Object},skillProfOptions:{type:Array,value:[]},skillProfChoices:{type:Number},selectedSkillProfs:{type:Array},defaultSkillProfs:{type:String,value:""},toolProfOptions:{type:Array,value:[]},defaultToolProfs:{type:String,value:""},langProfOptions:{type:Array,value:[]},defaultLangProfs:{type:String,value:""},weaponProfOptions:{type:Array,value:[]},defaultWeaponProfs:{type:String,value:""},armorProfOptions:{type:Array,value:[]},defaultArmorProfs:{type:String,value:""},defaultDarkvision:{type:String,value:""},attributeOptions:{type:Array,value:[]},attributeChoices:{type:Number},attributeMod:{type:Number},selectedAttributes:{type:Array},defaultAttributes:{type:String,value:""},resistOptions:{type:Array,value:[]},resistChoices:{type:Number},selectedResists:{type:Array},defaultResists:{type:String,value:""},conditionImmuneOptions:{type:Array,value:[]},conditionImmuneChoices:{type:Number},selectedConditionImmunes:{type:Array},defaultConditionImmunes:{type:String,value:""},featOptions:{type:Array,value:[]},featChoices:{type:Number},selectedFeat:{type:Array},sTLProfOptions:{type:Array,value:[]},sTLProfChoices:{type:Number},selectedSTLProfs:{type:Array},spellSetOptions:{type:Array},selectedSpellSet:{type:Object,value:{}},isEditMode:{type:Boolean,value:!1},dontCreateIfMissing:{type:Boolean,value:!1,reflectToAttribute:!0}}}static get observers(){return["updateOptions(selectedItem, storageKey)"]}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.set("character",t)},this.set("character",Object(i.O)()),Object(i.m)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(a.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(a.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(i.m)().removeEventListener("character-selected",this.characterChangeHandler),Object(a.b)().removeEventListener("editModeChange",this.editModeHandler)}async updateOptions(){if(this.character||this.set("character",Object(i.O)()),this.storageKey&&this.selectedItem){const e=this.storageKey.split(".");this.character.choices||(this.character.choices={});let t=this.character.choices;for(let s=0;s<e.length;s++){const l=e[s];if(!t[l]){if(this.dontCreateIfMissing)return void this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}));e.length<s+1&&!isNaN(parseInt(e[s+1],10))?t[l]=new Array(20):t[l]={}}s===e.length-1&&(t[l].selectedItemName===this.selectedItem.name&&t[l].selectedItemSource===this.selectedItem.source||(t[l]={selectedItemName:this.selectedItem.name,selectedItemSource:this.selectedItem.source,label:this.label||void 0})),t=t[l]}if(this.storedItem=t,this.label&&(this.storedItem.label=this.label),this.attributeOptions=[],this.attributeChoices=null,this.attributeMod=1,this.selectedAttributes=null,this.defaultAttributes=null,this.selectedItem.ability&&this.selectedItem.ability.length){const e=this.selectedItem.ability[0];e.choose&&(this.attributeOptions=e.choose.from.map(e=>e.toUpperCase()),this.attributeChoices=e.choose.count||1,this.attributeMod=e.choose.amount||1,this.selectedAttributes=this.storedItem.selectedAttributes?this.storedItem.selectedAttributes.split(","):null),this.defaultAttributes=this.selectedItem.ability.map(e=>Object.entries(e).map(e=>{if("choose"!==e[0]&&"any"!==e[0]){let t=e[0].toLowerCase(),s=e[1];return t.toUpperCase()+" "+Object(o.absInt)(s)}}).filter(e=>!!e).join(", ")).filter(e=>!!e).join(", "),this.storedItem.defaultAttributes=this.defaultAttributes,this.storedItem.attributeMod=this.attributeMod}if(this.skillProfOptions=[],this.skillProfChoices=null,this.selectedSkillProfs=null,this.defaultSkillProfs=null,this.selectedItem.skillProficiencies&&this.selectedItem.skillProficiencies.length){const e=this.selectedItem.skillProficiencies[0];e.choose&&(this.skillProfOptions=e.choose.from,this.skillProfChoices=e.choose.count||1,this.selectedSkillProfs=this.storedItem.selectedSkillProfs?this.storedItem.selectedSkillProfs.split(","):null),e.any&&("Custom Lineage"===this.selectedItem.name?this.skillProfOptions=["Darkvision (60ft)"].concat(Object.keys(n.SKILL_TO_ATB_ABV)):this.skillProfOptions=Object.keys(n.SKILL_TO_ATB_ABV),this.skillProfChoices=e.any,this.selectedSkillProfs=this.storedItem.selectedSkillProfs?this.storedItem.selectedSkillProfs.split(","):null),this.defaultSkillProfs=Object.keys(e).map(e=>{if("choose"!==e&&"any"!==e)return Object(o.util_capitalizeAll)(e)}).filter(e=>!!e).join(", "),this.storedItem.defaultSkillProfs=this.defaultSkillProfs}const s=[];let l=[];if(this.selectedItem.toolProficiencies&&this.selectedItem.toolProficiencies.length)if(this.selectedItem.toolProficiencies.length>1);else{this.storedItem.selectedToolProfs&&"string"!=typeof this.storedItem.selectedToolProfs||(this.storedItem.selectedToolProfs={});const e=this.selectedItem.toolProficiencies[0];Object.entries(e).forEach(([t,i])=>{const a={key:t,toolProfOptions:Object(c.dd)(t),selectedToolProfs:this.storedItem.selectedToolProfs[t]?this.storedItem.selectedToolProfs[t].split(","):null};switch(t){case"choose":const d=i.from.map(c.dd);a.toolProfOptions=d.flat(),a.toolProfChoices=i.count||1,s.push(a);break;case"any":a.toolProfChoices=e.any||1,s.push(a);break;case"artisan's tools":case"musical instrument":case"gaming set":a.label="Selected "+Object(o.util_capitalizeAll)(t),a.toolProfChoices=Number.isInteger(i)?i:1,s.push(a);break;default:l.push(Object(o.util_capitalizeAll)(t))}}),l=l.filter(e=>!!e).join(", "),this.set("defaultToolProfs",l.length>0?l:null),this.storedItem.defaultToolProfs=l}this.set("toolProfOptions",s.length>0?s:null);let i=[],a=1;if(this.selectedItem.skillToolLanguageProficiencies&&this.selectedItem.skillToolLanguageProficiencies.length){const e=this.selectedItem.skillToolLanguageProficiencies[0];e.choose&&e.choose.length&&(e.choose[0].from&&e.choose[0].from.length&&(e.choose[0].from.includes("anySkill")&&(i=i.concat(Object.keys(r.a.SKILL_JSON_TO_FULL).map(e=>({name:e,type:"skill"})))),e.choose[0].from.includes("anyTool")&&(i=i.concat(c.Ec.map(e=>({...e,type:"tool"}))))),e.choose[0].count&&(a=e.choose[0].count))}this.sTLProfChoices=a,this.set("sTLProfOptions",i.length>0?i:null),this.selectedSTLProfs=this.storedItem.selectedSTLProfs||null;let h=[],p=[],u=1;this.selectedItem.resist&&this.selectedItem.resist.length&&(this.selectedItem.resist.forEach(e=>{"string"==typeof e?h.push(e):e.choose&&(p=e.choose.from,e.choose.count&&(u=e.choose.count))}),this.set("defaultResists",h.length>0?h.map(o.util_capitalizeAll).join(", "):null),this.storedItem.defaultResists=h),this.resistChoices=u,this.set("resistOptions",p.length>0?p:null),this.selectedResists=this.storedItem.selectedResists||null;let m=[],f=[],b=1;this.selectedItem.conditionImmune&&this.selectedItem.conditionImmune.length&&(this.selectedItem.conditionImmune.forEach(e=>{"string"==typeof e?m.push(e):e.choose&&(f=e.choose.from,e.choose.count&&(b=e.choose.count))}),this.set("defaultConditionImmunes",m.length>0?m.map(o.util_capitalizeAll).join(", "):null),this.storedItem.defaultConditionImmunes=m),this.conditionImmuneChoices=b,this.set("conditionImmuneOptions",f.length>0?f:null),this.selectedConditionImmunes=this.storedItem.selectedConditionImmunes||null;const S=[];let y=[];this.selectedItem.languageProficiencies&&this.selectedItem.languageProficiencies.length&&(this.storedItem.selectedLangProfs&&"string"!=typeof this.storedItem.selectedLangProfs||(this.storedItem.selectedLangProfs={}),this.selectedItem.languageProficiencies.forEach(e=>{Object.entries(e).forEach(([e,t])=>{const s={key:e,langProfOptions:Object(c.dd)(e),selectedLangProfs:this.storedItem.selectedLangProfs[e]?this.storedItem.selectedLangProfs[e].split(","):null};switch(e){case"choose":s.langProfOptions=t.from,s.langProfChoices=t.count||1,S.push(s);break;case"any":case"anyStandard":s.langProfOptions=c.s,s.langProfChoices=Number.isInteger(t)?t:1,S.push(s);break;case"other":let l=this.selectedItem.name;l.includes("(")&&(l=l.substring(0,l.indexOf("(")).trim()),y.push(l);break;default:y.push(Object(o.util_capitalizeAll)(e))}})}),y=y.filter(e=>!!e).join(", "),this.defaultLangProfs=y.length>0?y:null,this.storedItem.defaultLangProfs=y),this.set("langProfOptions",S.length>0?S:null);const I=[];let g=[];this.selectedItem.weaponProficiencies&&this.selectedItem.weaponProficiencies.length&&(this.storedItem.selectedWeaponProfs&&"string"!=typeof this.storedItem.selectedWeaponProfs||(this.storedItem.selectedWeaponProfs={}),this.selectedItem.weaponProficiencies.forEach(e=>{Object.entries(e).forEach(([e,t])=>{const s={key:e,selectedWeaponProfs:this.storedItem.selectedWeaponProfs[e]?this.storedItem.selectedWeaponProfs[e].split(","):null};switch(e){case"any":s.weaponProfOptions=c.ad,s.weaponProfChoices=Number.isInteger(t)?t:1,I.push(s);break;case"choose":s.weaponProfOptions="martial"===t.fromFilter?c.bd:"simple"===I.choose.fromFilter?c.cd:c.ad,s.weaponProfChoices=t.count||1,I.push(s);break;default:const l=e.split("|")[0];g.push(Object(o.util_capitalizeAll)(l))}})}),g=g.filter(e=>!!e).join(", ")),g.length>0?(this.set("defaultWeaponProfs",g),this.storedItem.defaultWeaponProfs=g):(this.set("defaultWeaponProfs",null),this.storedItem.defaultWeaponProfs=null),this.set("defaultWeaponProfs",g.length>0?g:null),this.storedItem.defaultWeaponProfs=g,this.set("weaponProfOptions",I.length>0?I:null);const P=[];let k,v=[];if(this.selectedItem.armorProficiencies&&this.selectedItem.armorProficiencies.length&&(this.storedItem.selectedArmorProfs&&"string"!=typeof this.storedItem.selectedArmorProfs||(this.storedItem.selectedArmorProfs={}),this.selectedItem.armorProficiencies.forEach(e=>{Object.entries(e).forEach(([e,t])=>{const s={key:e,selectedArmorProfs:this.storedItem.selectedArmorProfs[e]?this.storedItem.selectedArmorProfs[e].split(","):null};switch(e){case"any":s.armorProfOptions=["light","medium","heavy","shield"],s.armorProfChoices=Number.isInteger(t)?t:1,P.push(s);break;default:if(e.includes("|")){const t=e.split("|")[0];v.push(Object(o.util_capitalizeAll)(t))}else v.push(Object(o.util_capitalizeAll)(e))}})}),v=v.filter(e=>!!e).join(", "),this.defaultArmorProfs=v.length>0?v:null,this.storedItem.defaultArmorProfs=v),this.set("armorProfOptions",P.length>0?P:null),this.selectedItem.entries&&this.selectedItem.entries.forEach(e=>{if(e&&e.name&&"darkvision"===e.name.toLowerCase()&&e.entries&&e.entries.length){const t=e.entries[0].includes("60"),s=e.entries[0].includes("120");k=s?120:t?60:0}}),this.storedItem.defaultDarkvision=k||null,this.defaultDarkvision=k||null,this.featOptions=[],this.featChoices=null,this.selectedFeat=null,this.selectedItem.feats&&(this.featModel&&this.featModel.length||(this.featModel=await Object(d.b)("feats")),this.featOptions=this.featModel,this.featChoices=this.selectedItem.feats,this.selectedFeat=this.featOptions.find(e=>this.storedItem.selectedFeat&&e.name===this.storedItem.selectedFeat.name&&e.source===this.storedItem.selectedFeat.source)),this.selectedItem.asi){this.hasASI=!0,this.asiChecked=!!this.storedItem.selectedFeat,this.featModel&&this.featModel.length||(this.featModel=await Object(d.b)("feats"));const e=this.storedItem.selectedFeat||this.storedItem.previouslySelectedFeat;this.asiFeat=e,this.asiFeatItem=this.featModel.find(t=>e&&t.name===e.name&&t.source===e.source);const t=this.storedItem.selectedAttributes?this.storedItem.selectedAttributes.split(","):this.storedItem.previouslySelectedAttributes?this.storedItem.previouslySelectedAttributes.split(","):[];this.asiAbility1=t.length?t[0]:null,this.asiAbility2=t.length>1?t[1]:null,this.storedItem.attributeMod=1}const O=[],A=[];this.selectedItem.additionalSpells&&this.selectedItem.additionalSpells.length&&(this.storedItem.additionalSpells?(this.storedItem.additionalSpells.defaultSpells=[],this.storedItem.additionalSpells.defaultAbility=null):this.storedItem.additionalSpells={defaultSpells:[],selectedSpells:[]},void 0===this.storedItem.additionalSpells.selectedSpellSet&&(this.storedItem.additionalSpells.selectedSpellSet=0),this.selectedItem.additionalSpells.forEach((e,t)=>{const s={defaultSpells:[],expandedSpells:[],spellChoices:[],abilityChoices:[]},l=[];Object.entries(e).forEach(([e,i])=>{switch(e){case"innate":Object.entries(i).forEach(([i,a])=>{const o=Array.isArray(a)?{will:a}:a;Object.entries(o).forEach(([a,o])=>{const n=Array.isArray(o)?{99:o}:o;Object.entries(n).forEach(([o,n])=>{const c=[t,e,i,a,o].join("."),r=a;let h=parseInt(o.split("e").join(""));h=99===h?void 0:h,n.forEach(e=>{const a="_"===i?1:parseInt(i);if(void 0!==e.choose){const t=Object(d.a)("spells",e.choose).then(t=>{const l=this.storedItem.additionalSpells.selectedSpells.find(e=>e.path===c);s.spellChoices.push({path:c,type:r,level:a,uses:h,count:e.count||1,options:t,selectedSpells:l&&l.spells?l.spells:[]})});A.push(t),l.push(t)}else{let i,o=e.split("#")[0];const n=Object(d.a)("spells","name="+o+"|").then(e=>{e.length&&(i=e[0].source,o=e[0].name),s.defaultSpells.push({name:o,source:i,type:r}),t===this.storedItem.additionalSpells.selectedSpellSet&&this.storedItem.additionalSpells.defaultSpells.push({type:r,level:a,name:o,source:i,uses:h})});A.push(n),l.push(n)}})})})});break;case"known":Object.entries(i).forEach(([i,a])=>{let o=Array.isArray(a)?a:Object.values(a)[0];const n=[t,e,i].join(".");o.forEach(e=>{const a="_"===i?1:parseInt(i);if(void 0!==e.choose){const t=Object(d.a)("spells",e.choose).then(t=>{const l=this.storedItem.additionalSpells.selectedSpells.find(e=>e.path===n);s.spellChoices.push({path:n,type:"known",level:a,count:e.count||1,options:t,selectedSpells:l&&l.spells?l.spells:[]})});A.push(t),l.push(t)}else{let i,o=e.split("#")[0];const n=Object(d.a)("spells","name="+o+"|").then(e=>{e.length&&(i=e[0].source,o=e[0].name),s.defaultSpells.push({name:o,source:i,type:"known"}),t===this.storedItem.additionalSpells.selectedSpellSet&&this.storedItem.additionalSpells.defaultSpells.push({type:"known",level:a,name:o,source:i})});A.push(n),l.push(n)}})});break;case"prepared":case"expanded":Object.entries(i).forEach(([e,i])=>{i.forEach(i=>{const a=parseInt(e.split("s").join(""));let o,n=i.split("#")[0];const c=Object(d.a)("spells","name="+n+"|").then(e=>{e.length&&(o=e[0].source,n=e[0].name);const l=s.expandedSpells.find(e=>e.level===a);l?l.spells.push({name:n,source:o}):s.expandedSpells.push({level:a,spells:[{name:n,source:o}]}),t===this.storedItem.additionalSpells.selectedSpellSet&&this.storedItem.additionalSpells.defaultSpells.push({type:"expanded",level:a,name:n,source:o})});A.push(c),l.push(c)})});break;case"ability":"inherit"===i||(i.choose?(s.abilityChoices=i.choose.map(e=>e.toUpperCase()),s.selectedAbility=this.storedItem.additionalSpells.selectedAbility):(s.defaultAbility=i,t===this.storedItem.additionalSpells.selectedSpellSet&&(this.storedItem.additionalSpells.defaultAbility=i.toUpperCase())))}}),Promise.all(l).then(()=>{s.name=e.name?e.name:s.defaultSpells.length?this._renderSpellName(s.defaultSpells[0]):t,s.expandedSpells.sort((e,t)=>e.level-t.level),O.push(s)})})),Promise.all(A).then(()=>{this.set("spellSetOptions",O),O.length?this.set("selectedSpellSet",O[this.storedItem.additionalSpells.selectedSpellSet]):this.set("selectedSpellSet",null)}),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}else this.storedItem={},this.attributeOptions=[],this.skillProfOptions=[],this.armorProfOptions=[],this.weaponProfOptions=[],this.toolProfOptions=[],this.langProfOptions=[],this.sTLProfOptions=[],this.resistOptions=[],this.conditionImmuneOptions=[],this.featOptions=[],this.spellSetOptions=[],this.defaultAttributes=null,this.defaultSkillProfs=null,this.defaultArmorProfs=null,this.defaultWeaponProfs=null,this.defaultToolProfs=null,this.defaultLangProfs=null,this.defaultDarkvision=null,this.defaultResists=null,this.defaultConditionImmunes=null}async getSpellChoiceOptions(e){return await Object(d.a)("spells",e)}_toolProficiencyAddCallback(e,t){return(s=>{this.storedItem.selectedToolProfs[e]=s.join(",");const l=Object(o.cloneDeep)(this.toolProfOptions);l[t].selectedToolProfs=s,this.set("toolProfOptions",l),Object(i.fb)(this.character)}).bind(this)}_langProficiencyAddCallback(e,t){return(s=>{this.storedItem.selectedLangProfs[e]=s.join(",");const l=Object(o.cloneDeep)(this.langProfOptions);l[t].selectedLangProfs=s,this.set("langProfOptions",l),Object(i.fb)(this.character)}).bind(this)}_armorProficiencyAddCallback(e,t){return(s=>{this.storedItem.selectedArmorProfs[e]=s.join(",");const l=Object(o.cloneDeep)(this.armorProfOptions);l[t].selectedArmorProfs=s,this.set("armorProfOptions",l),Object(i.fb)(this.character)}).bind(this)}_weaponProficiencyAddCallback(e,t){return(s=>{this.storedItem.selectedWeaponProfs[e]=s.join(",");const l=Object(o.cloneDeep)(this.weaponProfOptions);l[t].selectedWeaponProfs=s,this.set("weaponProfOptions",l),Object(i.fb)(this.character)}).bind(this)}_skillProficiencyAddCallback(){return(e=>{this.storedItem.selectedSkillProfs=e.join(","),this.selectedSkillProfs=e,Object(i.fb)(this.character)}).bind(this)}_attributeAddCallback(){return(e=>{this.storedItem.selectedAttributes=e.join(","),this.selectedAttributes=e,Object(i.fb)(this.character)}).bind(this)}_featAddCallback(){return(e=>{this.storedItem.selectedFeat={name:e.name,source:e.source},this.selectedFeat=this.featOptions.find(e=>e.name===this.storedItem.selectedFeat.name&&e.source===this.storedItem.selectedFeat.source),Object(i.fb)(this.character)}).bind(this)}_sTLProfAddCallback(){return(e=>{this.storedItem.selectedSTLProfs=e,this.selectedSTLProfs=e,Object(i.fb)(this.character)}).bind(this)}_resistAddCallback(){return(e=>{this.storedItem.selectedResists=e,this.selectedResists=e,Object(i.fb)(this.character)}).bind(this)}_conditionImmuneAddCallback(){return(e=>{this.storedItem.selectedConditionImmunes=e,this.selectedConditionImmunes=e,Object(i.fb)(this.character)}).bind(this)}_spellSetCallback(){return(e=>{this.storedItem.additionalSpells.selectedSpellSet=this.spellSetOptions.findIndex(t=>t===e),this.set("selectedSpellSet",e),this.updateOptions(),Object(i.fb)(this.character)}).bind(this)}_spellAbilityCallback(){return(e=>{this.storedItem.additionalSpells.selectedAbility=e;const t=Object(o.cloneDeep)(this.selectedSpellSet);t.selectedAbility=e,this.set("selectedSpellSet",t),Object(i.fb)(this.character)}).bind(this)}_spellChoiceCallback(e,t){return(s=>{const l=s.map(e=>({name:e.name,source:e.source}));let a=this.storedItem.additionalSpells.selectedSpells.findIndex(t=>t.path===e.path);a>-1&&this.storedItem.additionalSpells.selectedSpells.splice(a,1);let d={path:e.path,type:e.type,level:e.level,resource:e.resource,count:e.count,uses:e.uses};this.storedItem.additionalSpells.selectedSpells.push(d),d.spells=l;const n=Object(o.cloneDeep)(this.selectedSpellSet);n.spellChoices[t].selectedSpells=l,this.set("selectedSpellSet",n),Object(i.fb)(this.character)}).bind(this)}_asiChangeCallback(){return(e=>{if(e.checked)this.storedItem.selectedFeat=e.selectedFeat,this.storedItem.previouslySelectedAttributes=[e.selectedAbilityOne,e.selectedAbilityTwo].filter(e=>!!e).join(","),delete this.storedItem.selectedAttributes;else{this.storedItem.previouslySelectedFeat=e.selectedFeat,delete this.storedItem.selectedFeat;const t=Object.keys(this.character.choices).filter(e=>e.startsWith(this.storageKey+"_"));t&&t.length&&t.forEach(e=>delete this.character.choices[e]),this.asiFeatItem=null,this.storedItem.selectedAttributes=[e.selectedAbilityOne,e.selectedAbilityTwo].filter(e=>!!e).join(",")}Object(i.fb)(this.character)}).bind(this)}_suboptionStorageKey(e){return e+"_suboptions"}_showEmpty(e,t){return!e&&!t}_exists(){for(let e of arguments)if(e&&(e.constructor!==Object||Object.entries(e).length>0)&&(!Array.isArray(e)||e.length>0))return!0;return!1}_plusPrefix(e){return"+"+e}_plural(e,t,s){const l=s||e;return t>1?l+"s":l}_printOptions(e,t,s){let l=[];for(const i of e)l=l.concat(t[`selected${s}Profs`][i]);return l.join(", ")}_moreThanOne(e){return e.length>1}_renderSpellName(e){return`${Object(o.util_capitalizeAll)(e.name)}${e.source&&"phb"!==e.source.toLowerCase()?` (${e.source})`:""}`}_openSpell(e){this.dispatchEvent(new CustomEvent("open-drawer",{bubbles:!0,composed:!0,detail:{viewId:"spells",selectedItem:e.model.__data.item}}))}_spellLevel(e){switch(e){case 0:return"Cantrip";case 1:return"1st";case 2:return"2nd";case 3:return"3rd";default:return e+"th"}}_isLast(e,t){return t&&t.length&&e===t.length-1}_or(e,t){return e||t}static get template(){return l.b`
            <style include="material-styles">
                .some {}
                :host {
                    display: block;
                    white-space: initial;
                }
                .spell-link {
                    color: var(--mdc-theme-secondary);
                    cursor: pointer;
                    text-decoration: underline;
                }
                .spell-link:hover {
                }
                table {
                    line-height: 1.3;
                    margin-left: 12px;
                }
                td {
                    vertical-align: top;
                }
                td:first-child {
                    padding-right: 8px;
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
                dnd-character-builder-suboptions:not(.asi-suboption) {
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

                <template is="dom-if" if="[[_moreThanOne(spellSetOptions)]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Spell Set>" label="Selected Spell Set"
                        options="[[spellSetOptions]]" value="[[selectedSpellSet]]" 
                        add-callback="[[_spellSetCallback()]]">
                    </dnd-select-add>
                </template>

                <template is="dom-if" if="[[_exists(selectedSpellSet.abilityChoices)]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Spell Ability>" label="Selected Spell Ability"
                        options="[[selectedSpellSet.abilityChoices]]" value="[[selectedSpellSet.selectedAbility]]"
                        add-callback="[[_spellAbilityCallback()]]">
                    </dnd-select-add>
                </template>

                <template is="dom-repeat" items="[[selectedSpellSet.spellChoices]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Spells>" label="Selected Spells"
                        choices="[[item.count]]" options="[[item.options]]"
                        value="[[item.selectedSpells]]" add-callback="[[_spellChoiceCallback(item, index)]]">
                    </dnd-select-add>
                </template>

                <div hidden$="[[!_exists(selectedSpellSet.defaultSpells)]]" class="default-selection">
                    <b>Spells: </b>
                    <span>
                        <template is="dom-repeat" items="[[selectedSpellSet.defaultSpells]]">
                            <span class="spell-link" on-click="_openSpell">[[_renderSpellName(item)]]</span><span hidden$="[[_isLast(index, selectedSpellSet.defaultSpells)]]">, </span>
                        </template>
                    </span>
                </div>

                <div hidden$="[[!_exists(selectedSpellSet.expandedSpells)]]" class="default-selection">
                    <b>Expanded Spell List</b>
                    <table>
                        <template is="dom-repeat" items="[[selectedSpellSet.expandedSpells]]" as="expandedSpells">
                            <tr>
                                <td>[[_spellLevel(expandedSpells.level)]]</td>
                                <td>
                                    <template is="dom-repeat" items="[[expandedSpells.spells]]">
                                        <span class="spell-link" on-click="_openSpell">[[_renderSpellName(item)]]</span><span hidden$="[[_isLast(index, expandedSpells.spells)]]">, </span>
                                    </template>
                                </td>
                            </tr>
                        </template>
                    </table>
                </div>


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
                    
                    <template is="dom-if" if="[[_exists(selectedFeat)]]">
                        <dnd-character-builder-suboptions label="[[_or(label, 'Feat')]]" storage-key="[[_suboptionStorageKey(storageKey)]]" selected-item="[[selectedFeat]]"></dnd-character-builder-suboptions>
                    </template>
                </template>

                <template is="dom-if" if="[[hasASI]]">
                    <dnd-asi-select change-callback="[[_asiChangeCallback()]]" checked="[[asiChecked]]" selected-feat="[[asiFeat]]" selected-ability-one="[[asiAbility1]]" selected-ability-two="[[asiAbility2]]"></dnd-asi-select>

                    <template is="dom-if" if="[[asiChecked]]">
                        <dnd-character-builder-suboptions label="[[_or(label, 'ASI Feat')]]" class="asi-suboption" storage-key="[[_suboptionStorageKey(storageKey)]]" selected-item="[[asiFeatItem]]"></dnd-character-builder-suboptions>
                    </template>
                </template>
            </div>
        `}}customElements.define("dnd-character-builder-suboptions",h)},156:function(e,t,s){"use strict";var l=s(3),i=s(1),a=s(40),o=s(143);class d extends l.a{static get properties(){return{checked:{type:Boolean,value:!1},selectedFeat:{type:Object},selectedAbilityOne:{type:String},selectedAbilityTwo:{type:String},disabled:{type:Boolean,value:!1,reflectToAttribute:!0},changeCallback:{type:Function}}}constructor(){super(),this.attributeOptions=["STR","DEX","CON","INT","WIS","CHA"]}async connectedCallback(){super.connectedCallback(),this.switchChangeHandler=e=>{this.checked=e.detail.checked,this._changeHandler()()},this.addEventListener("switch-change",this.switchChangeHandler),this.editModeHandler=e=>{this.disabled=!e.detail.isEditMode},Object(o.b)().addEventListener("editModeChange",this.editModeHandler),this.disabled=!Object(o.c)()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("switch-change",this.switchChangeHandler),Object(o.b)().removeEventListener("editModeChange",this.editModeHandler)}_changeHandler(e){return async t=>{switch(e){case"a1":this.selectedAbilityOne=t;break;case"a2":this.selectedAbilityTwo=t;break;case"feat":this.featOptions||(this.featOptions=await Object(a.b)("feats")),this.selectedFeat=this.featOptions.find(e=>e.name===t.name&&e.source===t.source)}this.changeCallback({checked:this.checked,selectedFeat:this.selectedFeat?{name:this.selectedFeat.name,source:this.selectedFeat.source}:void 0,selectedAbilityOne:this.selectedAbilityOne,selectedAbilityTwo:this.selectedAbilityTwo})}}_disableLabel(e){return e?"Feat":"ASI"}_getFeatLink(e){let t=[e.name];e.source&&t.push(e.source);let s=Object(i.encodeForHash)(t);return s?"#/feats/"+s:"#/feats"}_linkClick(){this.dispatchEvent(new CustomEvent("open-drawer",{bubbles:!0,composed:!0,detail:{selectedItem:this.selectedFeat,viewId:"feats"}}))}static get template(){return l.b`
      <style include="material-styles">
        :host {
          display: flex;
          flex-direction: column;
          max-width: 192px;
        }
        [hidden] {
          display: none !important;
        }
        .abilities {
          display: flex;
          flex-wrap: wrap;
        }
        .abilities dnd-select-add {
          width: calc(50% - 8px);
        }
        dnd-select-add + dnd-select-add {
          margin-left: 16px;
        }
        dnd-select-add {
          display: block;
        }
        .disable-label {
          font-size: 14px;
          font-weight: 500;
          color: var(--mdc-theme-primary);
        }
        .reference-link {
          color: var(--lumo-body-text-color);
        }
        .reference-link:hover {
          color: var(--mdc-theme-secondary);
        }
        .feat-pick-wrap {
          display: flex;
        }
      </style>

      <div class="disable-label" hidden$="[[!disabled]]">[[_disableLabel(checked)]]</div>
      <dnd-switch initial-value=[[checked]] label="ASI" secondary-label="Feat" hidden$="[[disabled]]"></dnd-switch>
      <div class="abilities" hidden$=[[checked]]>
        <dnd-select-add add-callback="[[_changeHandler('a1')]]" value="[[selectedAbilityOne]]" options="[[attributeOptions]]" placeholder="<ASI>" disabled$="[[disabled]]"></dnd-select-add>
        <dnd-select-add add-callback="[[_changeHandler('a2')]]" value="[[selectedAbilityTwo]]" options="[[attributeOptions]]" placeholder="<ASI>" disabled$="[[disabled]]"></dnd-select-add>
      </div>
      <div class="feat-pick-wrap" hidden$=[[!checked]]>
        <dnd-select-add add-callback="[[_changeHandler('feat')]]" model="feats" value="[[selectedFeat]]" placeholder="<Choose Feat>" disabled$="[[disabled]]"></dnd-select-add>
        <button class="reference-link mdc-icon-button material-icons" on-click="_linkClick" hidden$="[[disabled]]">logout</button>
      </div>
    `}}customElements.define("dnd-asi-select",d)}}]);
//# sourceMappingURL=0.bundle.js.map