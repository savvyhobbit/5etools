(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{144:function(e,t,i){"use strict";i(56),i(59),i(79);const s=i(7).a`<dom-module id="lumo-number-field" theme-for="vaadin-number-field">
  <template>
    <style include="lumo-field-button">
      :host {
        width: 8em;
      }

      :host([has-controls]:not([theme~="align-right"])) [part="value"] {
        text-align: center;
      }

      [part="decrease-button"][disabled],
      [part="increase-button"][disabled] {
        opacity: 0.2;
      }

      :host([has-controls]) [part="input-field"] {
        padding: 0;
      }

      [part="decrease-button"],
      [part="increase-button"] {
        cursor: pointer;
        font-size: var(--lumo-icon-size-s);
        width: 1.6em;
        height: 1.6em;
      }

      [part="decrease-button"]::before,
      [part="increase-button"]::before {
        margin-top: 0.2em;
      }

      /* RTL specific styles */

      :host([dir="rtl"]) [part="value"],
      :host([dir="rtl"]) [part="input-field"] ::slotted(input) {
        --_lumo-text-field-overflow-mask-image: linear-gradient(to left, transparent, #000 1.25em);
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild(s.content);i(78),i(3),i(43);var n=i(65),a=i(33);
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
const l=document.createElement("template");let o;l.innerHTML='<dom-module id="vaadin-number-field-template">\n  <template>\n    <style>\n      :host([readonly]) [part$="button"] {\n        pointer-events: none;\n      }\n\n      [part="decrease-button"]::before {\n        content: "−";\n      }\n\n      [part="increase-button"]::before {\n        content: "+";\n      }\n\n      [part="decrease-button"],\n      [part="increase-button"] {\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n      }\n\n      /* Hide the native arrow icons */\n      [part="value"]::-webkit-outer-spin-button,\n      [part="value"]::-webkit-inner-spin-button {\n        -webkit-appearance: none;\n        margin: 0;\n      }\n\n      [part="value"] {\n        /* Older Firefox versions (v47.0) requires !important */\n        -moz-appearance: textfield !important;\n      }\n\n      :host([dir="rtl"]) [part="input-field"] {\n        direction: ltr;\n      }\n\n      :host([dir="rtl"]) [part="value"]::placeholder {\n        direction: rtl;\n      }\n\n      :host([dir="rtl"]) [part="input-field"] ::slotted(input)::placeholder {\n        direction: rtl;\n      }\n\n      :host([dir="rtl"]) [part="value"]:-ms-input-placeholder,\n      :host([dir="rtl"]) [part="input-field"] ::slotted(input):-ms-input-placeholder {\n        direction: rtl;\n      }\n\n      :host([dir="rtl"]:not([has-controls])) [part="value"]::placeholder {\n        text-align: left;\n      }\n\n      :host([dir="rtl"]:not([has-controls])) [part="input-field"] ::slotted(input)::placeholder {\n        text-align: left;\n      }\n\n      :host([dir="rtl"]:not([has-controls])) [part="value"]:-ms-input-placeholder,\n      :host([dir="rtl"]:not([has-controls])) [part="input-field"] ::slotted(input):-ms-input-placeholder {\n        text-align: left;\n      }\n    </style>\n\n    <div disabled$="[[!_allowed(-1, value, min, max, step)]]" part="decrease-button" on-click="_decreaseValue" on-touchend="_decreaseButtonTouchend" hidden$="[[!hasControls]]">\n    </div>\n\n    <div disabled$="[[!_allowed(1, value, min, max, step)]]" part="increase-button" on-click="_increaseValue" on-touchend="_increaseButtonTouchend" hidden$="[[!hasControls]]">\n    </div>\n  </template>\n\n  \n</dom-module>',document.head.appendChild(l.content);class c extends n.a{static get is(){return"vaadin-number-field"}static get version(){return"2.6.2"}static get properties(){return{hasControls:{type:Boolean,value:!1,reflectToAttribute:!0},min:{type:Number,reflectToAttribute:!0,observer:"_minChanged"},max:{type:Number,reflectToAttribute:!0,observer:"_maxChanged"},step:{type:Number,value:1,observer:"_stepChanged"}}}ready(){super.ready(),this.__previousValidInput=this.value||"",this.inputElement.type="number",this.inputElement.addEventListener("change",this.__onInputChange.bind(this))}_decreaseButtonTouchend(e){e.preventDefault(),this._decreaseValue()}_increaseButtonTouchend(e){e.preventDefault(),this._increaseValue()}static get template(){if(!o){o=super.template.cloneNode(!0);const e=a.a.import(this.is+"-template","template"),t=e.content.querySelector('[part="decrease-button"]'),i=e.content.querySelector('[part="increase-button"]'),s=e.content.querySelector("style"),n=o.content.querySelector('[part="input-field"]'),l=o.content.querySelector('[name="prefix"]');n.insertBefore(t,l),n.appendChild(i),o.content.appendChild(s)}return o}_createConstraintsObserver(){this._createMethodObserver("_constraintsChanged(required, minlength, maxlength, pattern, min, max, step)")}_constraintsChanged(e,t,i,s,n,a,l){if(!this.invalid)return;const o=e=>!e&&0!==e;o(n)&&o(a)?super._constraintsChanged(e,t,i,s):this.validate()}_decreaseValue(){this._incrementValue(-1)}_increaseValue(){this._incrementValue(1)}_incrementValue(e){if(this.disabled||this.readonly)return;let t=parseFloat(this.value);this.value?t<this.min?(e=0,t=this.min):t>this.max&&(e=0,t=this.max):0==this.min&&e<0||0==this.max&&e>0||0==this.max&&0==this.min?(e=0,t=0):(null==this.max||this.max>=0)&&(null==this.min||this.min<=0)?t=0:this.min>0?(t=this.min,this.max<0&&e<0&&(t=this.max),e=0):this.max<0&&(t=this.max,e<0?e=0:this._getIncrement(1,t-this.step)>this.max?t-=2*this.step:t-=this.step);const i=this._getIncrement(e,t);this.value&&0!=e&&!this._incrementIsInsideTheLimits(e,t)||this._setValue(i)}_setValue(e){this.value=this.inputElement.value=String(parseFloat(e)),this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}_getIncrement(e,t){let i=this.step||1,s=this.min||0;const n=Math.max(this._getMultiplier(t),this._getMultiplier(i),this._getMultiplier(s));i*=n,s*=n;const a=((t=Math.round(t*n))-s)%i;return e>0?(t-a+i)/n:e<0?(t-(a||i))/n:t/n}_getDecimalCount(e){const t=String(e),i=t.indexOf(".");return-1===i?1:t.length-i-1}_getMultiplier(e){if(!isNaN(e))return Math.pow(10,this._getDecimalCount(e))}_incrementIsInsideTheLimits(e,t){return e<0?null==this.min||this._getIncrement(e,t)>=this.min:e>0?null==this.max||this._getIncrement(e,t)<=this.max:this._getIncrement(e,t)<=this.max&&this._getIncrement(e,t)>=this.min}_allowed(e){const t=e*(this.step||1),i=parseFloat(this.value);return!this.value||!this.disabled&&this._incrementIsInsideTheLimits(t,i)}_stepChanged(e){this.__validateByStep=this.__stepChangedCalled||null!==this.getAttribute("step"),this.inputElement.step=this.__validateByStep?e:"any",this.__stepChangedCalled=!0,this.setAttribute("step",e)}_minChanged(e){this.inputElement.min=e}_maxChanged(e){this.inputElement.max=e}_valueChanged(e,t){e&&isNaN(parseFloat(e))?this.value="":"string"!=typeof this.value&&(this.value=String(this.value)),super._valueChanged(this.value,t)}_onKeyDown(e){38==e.keyCode?(e.preventDefault(),this._increaseValue()):40==e.keyCode&&(e.preventDefault(),this._decreaseValue()),super._onKeyDown(e)}__onInputChange(){this.validate()}checkValidity(){return void 0!==this.min||void 0!==this.max||this.__validateByStep?this.inputElement.checkValidity():super.checkValidity()}}window.customElements.define(c.is,c);
/**
@license
Copyright (c) 2019 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
const r=document.createElement("template");r.innerHTML='<dom-module id="vaadin-integer-field-template">\n\n  \n</dom-module>',document.head.appendChild(r.content);class d extends c{static get is(){return"vaadin-integer-field"}static get version(){return"2.6.2"}static get properties(){return{pattern:String,preventInvalidInput:Boolean,minlength:Number,maxlength:Number}}ready(){super.ready(),this._enabledCharPattern="[-+\\d]"}_valueChanged(e,t){if(""!==e&&!this.__isInteger(e))return console.warn(`Trying to set non-integer value "${e}" to <vaadin-integer-field>. Clearing the value.`),void(this.value="");super._valueChanged(e,t)}_stepChanged(e,t){if(!this.__hasOnlyDigits(e))return console.warn(`Trying to set invalid step size "${e}", which is not a positive integer, to <vaadin-integer-field>. Resetting the default value 1.`),void(this.step=1);super._stepChanged(e,t)}__isInteger(e){return/^(-\d)?\d*$/.test(String(e))}__hasOnlyDigits(e){return/^\d*$/.test(String(e))}}window.customElements.define(d.is,d)},160:function(e,t,i){"use strict";i.r(t);var s=i(3),n=i(45),a=i(32),l=(i(145),i(152),i(88),i(156),i(107),i(148),i(1));const o={"artificer(ua)":{class:{2:{name:"Wonderous Invention",count:1,options:["{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]},5:{name:"Wonderous Invention",count:1,options:["{@item Alchemy jug}","{@item helm of comprehending languages}","{@item lantern of revealing}","{@item ring of swimming}","{@item robe of useful items}","{@item rope of climbing}","{@item wand of magic detection}","{@item wand of secrets}","{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]},10:{name:"Wonderous Invention",count:1,options:["{@item Bag of beans}","{@item chime of opening}","{@item decanter of endless water}","{@item eyes of minute seeing}","{@item folding boat}","{@item Heward's handy haversack}","{@item Alchemy jug}","{@item helm of comprehending languages}","{@item lantern of revealing}","{@item ring of swimming}","{@item robe of useful items}","{@item rope of climbing}","{@item wand of magic detection}","{@item wand of secrets}","{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]},15:{name:"Wonderous Invention",count:1,options:["{@item Boots of striding and springing}","{@item bracers of archery}","{@item brooch of shielding}","{@item broom of flying}","{@item hat of disguise}","{@item slippers of spider climbing}","{@item Bag of beans}","{@item chime of opening}","{@item decanter of endless water}","{@item eyes of minute seeing}","{@item folding boat}","{@item Heward's handy haversack}","{@item Alchemy jug}","{@item helm of comprehending languages}","{@item lantern of revealing}","{@item ring of swimming}","{@item robe of useful items}","{@item rope of climbing}","{@item wand of magic detection}","{@item wand of secrets}","{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]},20:{name:"Wonderous Invention",count:1,options:["{@item Eyes of the eagle}","{@item gem of brightness}","{@item gloves of missile snaring}","{@item gloves of swimming and climbing}","{@item ring of jumping}","{@item ring of mind shielding}","{@item wings of flying}","{@item Boots of striding and springing}","{@item bracers of archery}","{@item brooch of shielding}","{@item broom of flying}","{@item hat of disguise}","{@item slippers of spider climbing}","{@item Bag of beans}","{@item chime of opening}","{@item decanter of endless water}","{@item eyes of minute seeing}","{@item folding boat}","{@item Heward's handy haversack}","{@item Alchemy jug}","{@item helm of comprehending languages}","{@item lantern of revealing}","{@item ring of swimming}","{@item robe of useful items}","{@item rope of climbing}","{@item wand of magic detection}","{@item wand of secrets}","{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]}}},"artificer (revisited)":{class:{2:{name:"Infuse Item",count:3,type:"featureType=ai|source=UAArtificerRevisited"},4:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"},7:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"},11:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"},15:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"},19:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"}}},artificer:{class:{2:{name:"Infuse Item",count:4,type:"featureType=ai|source=TCE"},6:{name:"Infuse Item",count:2,type:"featureType=ai|source=TCE"},10:{name:"Infuse Item",count:2,type:"featureType=ai|source=TCE"},14:{name:"Infuse Item",count:2,type:"featureType=ai|source=TCE"},18:{name:"Infuse Item",count:2,type:"featureType=ai|source=TCE"}}},barbarian:{subclasses:{"Path of the Totem Warrior":{3:{name:"Totem Spirit",count:1,options:["Bear","Eagle","Elk","Tiger","Wolf"]},6:{name:"Aspect of the Beast",count:1,options:["Bear","Eagle","Elk","Tiger","Wolf"]},14:{name:"Totemic Attunement",count:1,options:["Bear","Eagle","Elk","Tiger","Wolf"]}}}},bard:{subclasses:{"College of Swords":{3:{name:"Fighting Style",count:1,type:"fs:b"}}}},monk:{subclasses:{"Way of the Four Elements":{3:{name:"Elemental Discipline",count:2,type:"ed"},6:{name:"Elemental Discipline",count:1,type:"ed"},11:{name:"Elemental Discipline",count:1,type:"ed"},17:{name:"Elemental Discipline",count:1,type:"ed"}}}},fighter:{class:{1:{name:"Fighting Style",type:"fs:f",count:1}}},paladin:{class:{2:{name:"Fighting Style",type:"fs:p",count:1}}},ranger:{class:{2:{name:"Fighting Style",type:"fs:r",count:1}}},sorcerer:{class:{3:{name:"Metamagic",type:"mm",count:2},10:{name:"Metamagic",type:"mm",count:1},17:{name:"Metamagic",type:"mm",count:1}}},warlock:{class:{2:{name:"Eldritch Invocations",type:"ei",count:2},3:{name:"Pact Boon",type:"pb",count:1},5:{name:"Eldritch Invocations",type:"ei",count:1},7:{name:"Eldritch Invocations",type:"ei",count:1},9:{name:"Eldritch Invocations",type:"ei",count:1},12:{name:"Eldritch Invocations",type:"ei",count:1},15:{name:"Eldritch Invocations",type:"ei",count:1},18:{name:"Eldritch Invocations",type:"ei",count:1}}}};var c=i(16),r=(i(70),i(90),i(143)),d=i(40);i(144);class p extends(Object(n.a)(s.a)){static get properties(){return{levels:{type:Array,value:[]},classes:{type:Object},subclasses:{type:Object,value:void 0},noContentMessage:{type:Boolean,value:!1},isEditMode:{type:Boolean,value:!1}}}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(a.O)()),Object(a.m)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(r.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(r.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(a.m)().removeEventListener("character-selected",this.characterChangeHandler),Object(r.b)().removeEventListener("editModeChange",this.editModeHandler)}async updateFromCharacter(e){if(e&&e.levels&&e.levels.length){console.error("class updateFromCharacter",e),this.noContentMessage=!1,this.character=e,this.classes=await Object(a.B)(e),this.subclasses=Object(l.cloneDeep)(e.subclasses),this.classLevel=Object(a.D)(e),this.classChoices=await this._findLevelChoices(e,this.classes),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0})),this.levels=Object(l.cloneDeep)(e.levels);const t=[];for(let i=0;i<e.levels.length;i++)t.push(await Object(a.G)(i));this.hitDiceMaxes=t}else this.levels=[],this.noContentMessage=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}_getClassLevelFeatures(e,t,i,s){if(i&&e[t]&&s){const n=e[t].name,a=i[n];if(a){const i=a.classFeatures;let o=-1,c=-1;if(e.length>=t+1){for(let s=0;s<=t;s++)if(e[s].name===n){o++;const e=i[o];if(e){e.find(e=>e.gainSubclassFeature)&&c++}}const r=i[o];if(r){if(r.some(e=>e.gainSubclassFeature)&&s&&s[n]&&a.subclasses&&a.subclasses.length){const e=a.subclasses.find(e=>s[n].name===e.name);if(e&&e.subclassFeatures&&e.subclassFeatures[c])return e.subclassFeatures[c].map(e=>(e.isSubclass=!0,e)),[...r].concat(e.subclassFeatures[c])}return r.filter(e=>{const t=Object(l.getEntryName)(e);return"Proficiency Versatility"!==t&&"Martial Versatility"!==t})}}}}}_getClassLevelFeatureStringArray(e,t,i,s,n){if(e&&void 0!==t&&i&&s){const a=this._getClassLevelFeatures(e,t,i,s);if(a)return a.map(e=>({name:Object(l.getEntryName)(e),isSubclass:e.isSubclass,source:e.source})).filter(e=>!(n&&n[t]&&n[t].some(t=>{const i=t.selection&&(t.selection.name!==e.name||t.selection.source!==e.source),s=t.from&&t.from.some(t=>t.name===e.name&&t.source===e.source);return"replacement"===t.id&&i&&s})))}}_level(e){return e+1}_deleteLevel(e){const t=e.model.__data.index,i=this.levels[t].name,s=this.levels.filter(e=>e.name===i).length,n=Object.keys(this.character.choices).filter(e=>e.startsWith(i.toLowerCase()+"_"+s));this.levels.splice(t,1),n.forEach(e=>{delete this.character.choices[e]}),Object(a.jb)(this.levels)}_expandDetails(e){let t=e.model.__data.index;this.expandedIndex===t?this.expandedIndex=null:this.expandedIndex=t}_renderDetails(e,t){let i=[];if(e===t){const e=new c.a,s=this._getClassLevelFeatures(this.levels,t,this.classes,this.subclasses);if(s&&s.length)for(let n of s){this.classChoices&&this.classChoices[t]&&this.classChoices[t].some(e=>{const t=e.selection&&(e.selection.name!==n.name||e.selection.source!==n.source),i=e.from&&e.from.some(e=>e.name===n.name&&e.source===n.source);return"replacement"===e.id&&t&&i})||e.recursiveEntryRender(n,i,0,void 0,!0)}return"<div class='details stats-wrapper'>"+i.join("")+"</div>"}return""}async _findLevelChoices(e,t){const i=[];if(e&&e.levels&&e.levels.length)for(let s=0;s<e.levels.length;s++)i.push(await this._findChoices(e,t,s));return i}async _findChoices(e,t,i){if(t&&e.levels&&e.levels.length&&e.levels.length>i){let s=e.levels,n=e.subclasses,l=s[i].name,c=t[l],r=c.subclasses.find(e=>n[l]&&n[l].name===e.name);if(c){let p=[],m=0,u=Object(a.S)(c);for(let e=0;e<=i;e++){s[e].name===l&&m++}const h={};if(c.additionalSpells){let e=9;c.additionalSpells.forEach(t=>{Object.entries(t).forEach(([t,i])=>{Object.entries(i).forEach(([i,s])=>{const n=parseInt(i.split("s").join(""));n<e&&"prepared"!==t&&"expanded"!==t&&(e=n),1===c.additionalSpells.length&&n===m&&(h.additionalSpells||(h.additionalSpells=[{}]),h.additionalSpells[0][t]||(h.additionalSpells[0][t]={}),h.additionalSpells[0][t][i]=s)})})}),c.additionalSpells.length>1&&e===m&&(h.additionalSpells=c.additionalSpells)}0===i&&(h.skillProficiencies=c.startingProficiencies.skills,c.startingProficiencies.armor&&(h.armorProficiencies=[{}],c.startingProficiencies.armor.forEach(e=>{let t=e.proficiency||e.toLowerCase();t=t.includes("shield")?"shield":t,h.armorProficiencies[0][t]=!0})),c.startingProficiencies.weapons&&(h.weaponProficiencies=[{}],c.startingProficiencies.weapons.forEach(e=>{let t=e.proficiency||e.toLowerCase();t.includes("@item")&&(t=t.split("@item")[1].trim().split("|")[0]),h.weaponProficiencies[0][t]=!0})),c.startingProficiencies.tools&&(h.toolProficiencies=[{}],c.startingProficiencies.tools.forEach(e=>{let t,i=e.proficiency||e.toLowerCase();t=i.includes("one ")?1:i.includes("two ")?2:i.includes("three ")?3:i.includes("four ")?4:i.includes("five ")?5:1,i.includes("@item")&&(i=i.split("@item")[1].trim().split("|")[0]),i.includes("artisan's tools")||i.includes("musical instrument")?(i=i.includes("artisan's tools")?"artisan's tools":"musical instrument",h.toolProficiencies[0].choose={from:[i],count:t}):h.toolProficiencies[0][i]=!0}))),p.push({id:"classSubOptions",classSubOptions:h,class:l.toLowerCase(),level:m}),void 0!==u&&m===u&&p.push({id:"subclass",from:c.subclasses,selections:e.subclasses[l]});const f={};if(r&&r.additionalSpells){let e=20,t=!1;r.additionalSpells.forEach(i=>{Object.entries(i).forEach(([i,s])=>{"expanded"===i&&(t=!0),"string"==typeof s||Array.isArray(s)||Object.entries(s).forEach(([t,s])=>{const n=parseInt(t.split("s").join(""));n<e&&"prepared"!==i&&(e=n),1===r.additionalSpells.length&&"expanded"!==i&&n===m&&(f.additionalSpells||(f.additionalSpells=[{}]),f.additionalSpells[0][i]||(f.additionalSpells[0][i]={}),f.additionalSpells[0][i][t]=s)})})}),(r.additionalSpells.length>1||t)&&e===m&&(f.additionalSpells=r.additionalSpells),p.push({id:"subclassSubOptions",subclassSubOptions:f,subclass:r.shortName,class:l.toLowerCase(),level:m})}let b=this._getClassLevelFeatures(s,i,t,n);if(b&&b.length&&b.find(e=>"Ability Score Improvement"===e.name)&&(this.asiItem||(this.asiChoice={id:"asi",class:l.toLowerCase(),level:m,asiItem:{asi:!0}}),p.push(this.asiChoice)),b&&b.length&&b.forEach(e=>{if(!e.name.includes("feature")){const t={id:"replacement",from:[{name:e.name,source:e.source}],selection:Object(a.M)(l,i,e.name),class:l,level:i,feature:e.name};b.forEach(i=>{i.isClassFeatureVariant&&i.entries[0].includes("replaces")&&i.entries[0].includes(e.name)&&t.from.push({name:i.name,source:i.source})}),t.from.length>1&&p.push(t)}}),m){const e=o[l.toLowerCase()];if(e&&e.class&&e.class[m]){const t=[].concat(e.class[m]);for(const e of t)if(e.options)p.push({id:"classFeature",name:e.name,from:e.options,count:e.count>1?e.count:1,class:l.toLowerCase(),feature:e.name,level:m,selections:Object(a.z)(l.toLowerCase(),m,e.name)});else if(e.type){const t=await Object(d.a)("features",e.type);let i=Object(a.z)(l.toLowerCase(),m,e.name);i&&(i=Array.isArray(i)?i.map(e=>t.find(t=>t.name===e.name&&t.source===e.source)):t.find(e=>e.name===i.name&&e.source===i.source)),p.push({id:"classFeature",hasSubFeature:!0,name:e.name,from:t,count:e.count>1?e.count:1,class:l.toLowerCase(),feature:e.name,level:m,selections:i,selectionsArray:Array.isArray(i)?i:[i]})}}if(e&&e.subclasses&&n[l]&&e.subclasses[n[l].name]&&e.subclasses[n[l].name][m]){const t=[].concat(e.subclasses[n[l].name][m]);for(const e of t)if(e.options)p.push({id:"subclassFeature",name:e.name,from:e.options,count:e.count>1?e.count:void 0,class:l.toLowerCase(),subclass:n[l],feature:e.name,level:m,selections:Object(a.R)(l.toLowerCase(),n[l].name.toLowerCase(),m,e.name)});else if(e.type){const t=await Object(d.a)("features",e.type);let i=Object(a.R)(l.toLowerCase(),n[l].name.toLowerCase(),m,e.name);i&&(i=Array.isArray(i)?i.map(e=>t.find(t=>t.name===e.name&&t.source===e.source)):t.find(e=>e.name===i.name&&e.source===i.source)),p.push({id:"subclassFeature",hasSubFeature:!0,name:e.name,from:t,count:e.count>1?e.count:void 0,class:l.toLowerCase(),subclass:n[l],feature:e.name,level:m,selections:i,selectionsArray:Array.isArray(i)?i:[i]})}}}return p}}return[]}_equal(e,t){return e===t}_genSubclassCallback(e,t){return i=>{Object(a.Y)(void 0,e.name,i,t)}}_genSubclassOptions(e){return this.classes[e.name].subclasses}_getSubclassSelection(e,t){return t[e.name]}_classFeatureOptionAddCallback(e,t,i){return s=>{let n;n=Array.isArray(s)?s.map(e=>e.name?{name:e.name,source:e.source}:e):s.name?{name:s.name,source:s.source}:s,Object(a.ib)(e,t,i,n)}}_subclassFeatureOptionAddCallback(e,t,i,s){return n=>{let l;l=Array.isArray(n)?n.map(e=>e.name?{...e}:e):n.name?{...n}:n,Object(a.tb)(e,t.name.toLowerCase(),i,s,l)}}_optionalFeatureAddCallback(e,t,i){return s=>{let n;n=Array.isArray(s)?s.map(e=>e.name?{...e}:e):s.name?{...s}:s,Object(a.rb)(e,t,i,n)}}_indexOfLevel(e,t){return t.indexOf(e)}_isMobile(){return window.innerWidth<921}_objArray(e){return Object.values(e)}_atIndex(e,t){return e?e[t]:null}_svgFromClass(e){return e?e.replace(/(\s|\(|\))/g,""):""}_addClassLevel(e){Object(a.X)(void 0,e.model.item,"classes")}_levelHp(e,t){return Object(a.H)(e,t+1)}_editModeClass(e){return e?"edit-mode":"not-edit-mode"}_toggleHpField(e){const t=e.target.closest(".btn-field"),i=t.classList.contains("btn-field--open"),s=t.querySelector("vaadin-integer-field"),n=parseInt(t.dataset.level)+1,l=t.dataset.className,o=parseInt(t.dataset.max);if(i){const e=parseInt(s.value);e?e<=o&&e>0?(Object(a.pb)(l,n,e),s.value="",t.classList.toggle("btn-field--open")):(t.classList.add("btn-field--error"),setTimeout(()=>{t.classList.remove("btn-field--error")},500)):t.classList.toggle("btn-field--open")}else t.classList.toggle("btn-field--open"),s.focus()}_levelHitDice(e,t){if(t&&void 0!==e&&t[e])return t[e]}_hpDiceIconClass(e,t){return"fal fa-dice-d"+(this._levelHitDice(e,t)||"6")}_joinUnderscore(...e){return e.join("_")}static get template(){return s.b`
      <style include="material-styles my-styles fa-styles">
        .something {
          display: block;
        }

        .class-grid {
          margin-bottom: 200px;
        }

        .heading-wrap {
          display: flex;
          justify-content: space-between;
          margin: 22px 14px 0;
          align-items: center;
          border-bottom: 1px solid var(--lumo-contrast-10pct);
          flex-wrap: wrap;
        }
        .heading {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
        .class-levels {
          font-size: 16px;
          padding-left: 8px;
          font-weight: normal;
          display: none;
        }

        h2 {
          margin-bottom: 24px;
          display: block;
          font-size: 1.5em;
          margin: 20px 0;
          font-weight: bold;
        }

        .not-edit-mode .button-wrap {
          display: none;
        }

        .button-wrap {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          padding: 10px;
          width: 100%;
        }
        .button-wrap > * {
          margin: 4px;
        }

        .row-wrap {
          padding: 4px 16px;
        }
        .row-wrap:not(:first-child) {
          border-top: 1px solid var(--mdc-theme-text-divider-on-background);
        }
        .row {
          position: relative;
          min-height: 80px;
          padding: 12px 0 12px;
        }
        .row:after {
          content: "";
          display: table;
          clear: both;
        }

        .open-details {
          cursor: pointer;
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
        }
        .open-details:hover .level-col {
          color: var(--mdc-theme-secondary);
        }

        .level-col {
          width: calc(100% - 70px);
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          flex-shrink: 0;
          padding: 6px 0;
        }
        .level-col__level {
          margin-right: 10px;
          font-size: 20px;
          font-weight: bold;
        }
        .level-col__image-wrap {
          width: 30px;
          position: relative;
          height: 21px;
          display: inline-block;
        }
        .level-col__image {
          width: 30px;
          height: 30px;
          display: block;
          position: absolute;
          top: -1px;
        }
        .level-col__class {
          font-size: 20px;
          font-weight: bold;
        }

        .features-col {
          white-space: normal;
          width: 100%;
          margin: 0;
          padding: 16px 0 8px;
          font-size: 15px;
        }
        .class-feature:not(:last-of-type)::after {
          content: ', ';
        }
        .class-feature[subclass] {
          color: var(--mdc-theme-secondary);
        }

        .choices-col {
          display: flex;
          float: left;
          flex-wrap: wrap;
          width: 100%;
          padding-left: 30px;
        }
        .choices-col__choice {
          margin-right: 16px;
          width: 100%;
        }
        .choices-col__choice dnd-select-add {
          min-width: 250px;
          width: calc(100% - 20px);
        }
        .choices-col__choice dnd-character-builder-suboptions {
          --suboptions__min-width: 250px;
          --suboptions__width: calc(100% - 20px);
        }

        @media(min-width: 420px) {
          .choices-col__choice dnd-select-add {
            width: calc(50% - 20px);
          }
          .choices-col__choice dnd-character-builder-suboptions {
            --suboptions__width: calc(50% - 20px);
          }
        }

        .choices-col__subclass-choice {
          display: block;
        }

        .delete-col {
          margin-right: 16px;
        }
        .delete-btn {
          height: 36px;
          font-size: 18px;
          padding: 0;
          background: none !important;
        }
        .delete-btn:before,
        .delete-btn:after {
          background: none !important;
        }
        .delete-btn:hover {
          color: var(--mdc-theme-secondary);
        }
        .not-edit-mode .delete-btn {
          display: none;
        }
        

        .btn-field {
          display: inline-flex;
          flex-direction: row;
          flex-wrap: nowrap;
          margin-bottom: 16px;
          width: 80px;
          height: 36px;
          background: var(--lumo-contrast-10pct);
          border-radius: 4px;
        }
        .btn-field--error {
          background: var(--lumo-error-color-50pct);
        }
        .btn-field__btn {
          display: block;
          width: 100%;
        }
        .btn-field__input {
          display: none;
        }
        .btn-field--open .btn-field__btn {
          width: 40px;
        }
        .btn-field__btn-label-text {
          position: relative;
          left: 4px;
          bottom: 2px;
        }
        .btn-field--open .btn-field__btn-label-text {
          display: none;
        }
        .btn-field--open .btn-field__input {
          display: block;
          width: 40px;
          margin-top: -40px;
        }
        .btn-field--open .btn-field__btn-label {
          margin-left: -20px;
        }
        .btn-field vaadin-integer-field {
          --lumo-contrast-10pct: transparent;
        }


        .hp-col {
          position: absolute;
          right: 0;
          top: 8px;
          overflow: hidden;
          display: flex;
        }
        .not-edit-mode .hp-col {
          right: 0px;
        }
        .hp-col .fal {
          font-size: 20px;
          position: relative;
          margin-right: 8px;
          top: 3px;
        }
        .hp-col__non-edit {
          display: block;
        }
        .hp-col .hp-col__non-edit .hp-roll-icon {
          left: 33px;
        }
        .edit-mode .hp-col__non-edit {
          display: none;
        }
        .hp-col__edit {
          display: none;
        }
        .edit-mode .hp-col__edit {
          display: inline-flex;
        }
        .hp-col .hp-roll-icon {
          position: absolute;
          left: 18px;
          font-size: 11px;
          top: 1px;
        }
        .edit-mode .hp-roll-icon {
          left: 36px;
          top: 5px;
        }
        .btn-field--open .hp-roll-icon {
          left: 26px;
        }

        .details {
          font-size: 15px;
          width: calc(100% - 30px);
          margin: 0 auto 13px !important;
          background: var(--lumo-contrast-10pct);
          border-radius: 4px;
          white-space: pre-line;
          padding: 14px 14px 1px;
        }
        .details > .statsBlockHead:first-child > .stat-name {
          margin-top: 0;
        }

        @media(min-width: 921px) {
          .features-col {
            margin: 0 30px 0 12px;
            width: unset;
            font-size: 16px;
          }
          .class-grid {
            margin-bottom: 0;
          }
          .class-levels {
            display: inline;
          }
        }

        .no-content-message {
          padding: 20px;
          font-size: 14px;
          font-style: italic;
        }
      </style>

      <div class$="[[_editModeClass(isEditMode)]]">
        <div class="heading-wrap">
          <h2>Levels <span class="class-levels">[[classLevel]]</span></h2> 
          <dnd-select-add model="class-all" placeholder="Add a Class"></dnd-select-add>

          <div class="button-wrap">
            <template is="dom-repeat" items="[[_objArray(classes)]]">
              <dnd-button icon="add" label="[[item.name]]" on-click="_addClassLevel"></dnd-button>
            </template>
          </div>
        </div>

        <div>
          <div class="no-content-message" hidden$="[[!noContentMessage]]">Enter edit mode to add class levels.</div>

          <div class="class-grid">
            <template is="dom-repeat" items=[[levels]]>
              <div class="row-wrap">
                <div class="row">
                  <div class="open-details" on-click="_expandDetails">
                    <div class="level-col">
                      <span class="level-col__level">[[_level(index)]]</span>
                      <span class="level-col__image-wrap" ><dnd-svg class="level-col__image" default-color id="[[_svgFromClass(item.name)]]"></dnd-svg></span>
                      <span class="level-col__class">[[item.name]]</span>
                    </div>

                    <div class="features-col">
                      <template is="dom-repeat" items="[[_getClassLevelFeatureStringArray(levels, index, classes, subclasses, classChoices)]]">
                        <span class="class-feature" subclass$="[[item.isSubclass]]">[[item.name]]</span>
                      </template>
                    </div>
                  </div>

                  <div class="choices-col">
                    <template is="dom-repeat" items="[[_atIndex(classChoices, index)]]" as="choice">
                      <div class="choices-col__choice">
                        <template is="dom-if" if="[[_equal(choice.id, 'classSubOptions')]]">
                          <dnd-character-builder-suboptions label="[[choice.class]]" storage-key="[[_joinUnderscore(choice.class, choice.level)]]" selected-item="[[choice.classSubOptions]]"></dnd-character-builder-suboptions>
                        </template>

                        <template is="dom-if" if="[[_equal(choice.id, 'subclassSubOptions')]]">
                          <dnd-character-builder-suboptions label="[[choice.class]]" storage-key="[[_joinUnderscore(choice.class, choice.level, choice.subclass)]]" selected-item="[[choice.subclassSubOptions]]"></dnd-character-builder-suboptions>
                        </template>
          
                        <template is="dom-if" if="[[_equal(choice.id, 'replacement')]]">
                          <dnd-select-add label="Optional Features" placeholder="<Choose Option>" disabled$="[[!isEditMode]]"
                            options="[[choice.from]]" value="[[choice.selection]]" add-callback="[[_optionalFeatureAddCallback(choice.class, choice.level, choice.feature)]]"></dnd-select-add>
                        </template>

                        <template is="dom-if" if="[[_equal(choice.id, 'subclass')]]">
                          <dnd-select-add class="choices-col__subclass-choice" label="Subclass" placeholder="<Choose Subclass>" disabled$="[[!isEditMode]]"
                            options="[[choice.from]]" value="[[choice.selections]]" add-callback="[[_genSubclassCallback(item, choice.selections)]]"></dnd-select-add>
                        </template>

                        <template is="dom-if" if="[[_equal(choice.id, 'asi')]]">
                          <dnd-character-builder-suboptions label="ASI" storage-key="[[_joinUnderscore(choice.class, choice.level, 'asi')]]" selected-item="[[choice.asiItem]]"></dnd-asi-select>
                        </template>

                        <template is="dom-if" if="[[_equal(choice.id, 'classFeature')]]">
                          <dnd-select-add choices="[[choice.count]]" label="[[choice.name]]" placeholder="<Choose Option>" disabled$="[[!isEditMode]]"
                            options="[[choice.from]]" choices="1" value="[[choice.selections]]" add-callback="[[_classFeatureOptionAddCallback(choice.class, choice.level, choice.feature)]]"></dnd-select-add>
                          <template is="dom-repeat" items="[[choice.selectionsArray]]" as="subfeature">
                            <dnd-character-builder-suboptions label="[[choice.class]]" storage-key="[[_joinUnderscore(choice.class, choice.level, 'feature', index)]]" selected-item="[[subfeature]]"></dnd-character-builder-suboptions>
                          </template>
                        </template>

                        <template is="dom-if" if="[[_equal(choice.id, 'subclassFeature')]]">
                          <dnd-select-add choices="[[choice.count]]" label="[[choice.name]]" placeholder="<Choose Option>" disabled$="[[!isEditMode]]"
                            options="[[choice.from]]" value="[[choice.selections]]" add-callback="[[_subclassFeatureOptionAddCallback(choice.class, choice.subclass, choice.level, choice.feature)]]"></dnd-select-add>
                          <template is="dom-repeat" items="[[choice.selectionsArray]]" as="subfeature">
                            <dnd-character-builder-suboptions label="[[choice.class]]" storage-key="[[_joinUnderscore(choice.class, choice.level, 'sub', 'feature', index)]]" selected-item="[[subfeature]]"></dnd-character-builder-suboptions>
                          </template>
                        </template>
                      </div>
                    </template>
                  </div>

                  <div class="hp-col">
                    <div class="delete-col">
                      <button class="delete-btn mdc-icon-button" on-click="_deleteLevel">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                    <div class="hp-col__non-edit">
                      <i class$="[[_hpDiceIconClass(index, hitDiceMaxes)]]"></i>
                      <span class="material-icons hp-roll-icon" aria-hidden="true">favorite</span>
                      [[_levelHp(item.name, index)]]
                    </div>
                    <div class="hp-col__edit btn-field" data-max$="[[_levelHitDice(index, hitDiceMaxes)]]" data-level$="[[index]]" data-class-name$="[[item.name]]">
                      <dnd-button background="none" class="btn-field__btn" on-click="_toggleHpField">
                        <span class="btn-field__btn-label" slot="label">
                          <i class$="[[_hpDiceIconClass(index, hitDiceMaxes)]]"></i>
                          <span class="material-icons hp-roll-icon" aria-hidden="true">favorite</span>
                          <span class="btn-field__btn-label-text">[[_levelHp(item.name, index)]]</span>
                        </span>
                      </dnd-button>
                      <vaadin-integer-field class="btn-field__input" min="1" max="[[_levelHitDice(index, hitDiceMaxes)]]" on-blur="_toggleHpField"></vaadin-integer-field>
                    </div>
                  </div>
                </div>
                <div class="details-wrap" inner-h-t-m-l="[[_renderDetails(expandedIndex, index)]]"></div>
              </div>
            </template>
          </div>
        </div>
      </div>
    `}}customElements.define("dnd-character-builder-class",p)}}]);
//# sourceMappingURL=8.bundle.js.map