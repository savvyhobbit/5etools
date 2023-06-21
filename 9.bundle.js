(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{166:function(e,t,i){"use strict";i(91),i(42);var s=i(102),a=i(56),n=i(2);
/**
 * @license
 * Copyright (c) 2021 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const l=n.b`
  :host {
    width: 8em;
  }

  :host([step-buttons-visible]:not([theme~='align-right'])) ::slotted(input),
  :host([has-controls]:not([theme~='align-right'])) ::slotted(input) {
    text-align: center;
  }

  [part$='button'][disabled] {
    opacity: 0.2;
  }

  :host([step-buttons-visible]) [part='input-field'],
  :host([has-controls]) [part='input-field'] {
    padding: 0;
  }

  [part\$='button'] {
    cursor: pointer;
    font-size: var(--lumo-icon-size-s);
    width: 1.6em;
    height: 1.6em;
  }

  [part\$='button']::before {
    margin-top: 0.3em;
  }

  [part='decrease-button']::before {
    content: var(--lumo-icons-minus);
  }

  [part='increase-button']::before {
    content: var(--lumo-icons-plus);
  }

  /* RTL specific styles */
  :host([dir='rtl']:not([theme~='align-right'])) ::slotted(input) {
    --_lumo-text-field-overflow-mask-image: linear-gradient(to left, transparent, #000 1.25em);
  }
`;Object(n.c)("vaadin-number-field",[a.a,s.a,l],{moduleId:"lumo-number-field"});i(73);var o=i(3),c=i(31),r=i(32),d=i(57),p=i(101),u=i(55),m=i(74);
/**
 * @license
 * Copyright (c) 2021 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
Object(n.c)("vaadin-number-field",m.a,{moduleId:"vaadin-number-field-styles"});class h extends(Object(p.a)(Object(n.a)(Object(c.a)(o.a)))){static get is(){return"vaadin-number-field"}static get template(){return o.b`
      <style>
        :host([readonly]) [part$='button'] {
          pointer-events: none;
        }

        [part='decrease-button']::before {
          content: '−';
        }

        [part='increase-button']::before {
          content: '+';
        }

        [part='decrease-button'],
        [part='increase-button'] {
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
        }

        :host([dir='rtl']) [part='input-field'] {
          direction: ltr;
        }
      </style>

      <div class="vaadin-field-container">
        <div part="label">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true" on-click="focus"></span>
        </div>

        <vaadin-input-container
          part="input-field"
          readonly="[[readonly]]"
          disabled="[[disabled]]"
          invalid="[[invalid]]"
          theme$="[[_theme]]"
        >
          <div
            disabled$="[[!_allowed(-1, value, min, max, step)]]"
            part="decrease-button"
            on-click="_decreaseValue"
            on-touchend="_decreaseButtonTouchend"
            hidden$="[[!_isStepButtonVisible(hasControls, stepButtonsVisible)]]"
            aria-hidden="true"
            slot="prefix"
          ></div>
          <slot name="prefix" slot="prefix"></slot>
          <slot name="input"></slot>
          <slot name="suffix" slot="suffix"></slot>
          <div id="clearButton" part="clear-button" slot="suffix" aria-hidden="true"></div>
          <div
            disabled$="[[!_allowed(1, value, min, max, step)]]"
            part="increase-button"
            on-click="_increaseValue"
            on-touchend="_increaseButtonTouchend"
            hidden$="[[!_isStepButtonVisible(hasControls, stepButtonsVisible)]]"
            aria-hidden="true"
            slot="suffix"
          ></div>
        </vaadin-input-container>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>
      </div>

      <slot name="tooltip"></slot>
    `}static get properties(){return{hasControls:{type:Boolean,value:!1,reflectToAttribute:!0},stepButtonsVisible:{type:Boolean,value:!1,reflectToAttribute:!0},min:{type:Number},max:{type:Number},step:{type:Number}}}static get observers(){return["_stepChanged(step, inputElement)"]}static get delegateProps(){return[...super.delegateProps,"min","max"]}static get constraints(){return[...super.constraints,"min","max","step"]}constructor(){super(),this._setType("number")}get slotStyles(){const e=this.localName;return[...super.slotStyles,`\n        ${e} input[type="number"]::-webkit-outer-spin-button,\n        ${e} input[type="number"]::-webkit-inner-spin-button {\n          -webkit-appearance: none;\n          margin: 0;\n        }\n\n        ${e} input[type="number"] {\n          -moz-appearance: textfield;\n        }\n\n        ${e}[dir='rtl'] input[type="number"]::placeholder {\n          direction: rtl;\n        }\n\n        ${e}[dir='rtl']:not([step-buttons-visible]):not([has-controls]) input[type="number"]::placeholder {\n          text-align: left;\n        }\n      `]}get clearElement(){return this.$.clearButton}ready(){super.ready(),this.addController(new d.a(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e})),this.addController(new u.a(this.inputElement,this._labelController)),this._tooltipController=new r.a(this),this.addController(this._tooltipController),this._tooltipController.setPosition("top")}checkValidity(){return this.inputElement?this.inputElement.checkValidity():!this.invalid}_decreaseButtonTouchend(e){e.preventDefault(),this._decreaseValue()}_increaseButtonTouchend(e){e.preventDefault(),this._increaseValue()}_decreaseValue(){this._incrementValue(-1)}_increaseValue(){this._incrementValue(1)}_incrementValue(e){if(this.disabled||this.readonly)return;const t=this.step||1;let i=parseFloat(this.value);this.value?i<this.min?(e=0,i=this.min):i>this.max&&(e=0,i=this.max):0===this.min&&e<0||0===this.max&&e>0||0===this.max&&0===this.min?(e=0,i=0):(null==this.max||this.max>=0)&&(null==this.min||this.min<=0)?i=0:this.min>0?(i=this.min,this.max<0&&e<0&&(i=this.max),e=0):this.max<0&&(i=this.max,e<0?e=0:this._getIncrement(1,i-t)>this.max?i-=2*t:i-=t);const s=this._getIncrement(e,i);this.value&&0!==e&&!this._incrementIsInsideTheLimits(e,i)||this._setValue(s)}_setValue(e){this.value=this.inputElement.value=String(parseFloat(e)),this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}_getIncrement(e,t){let i=this.step||1,s=this.min||0;const a=Math.max(this._getMultiplier(t),this._getMultiplier(i),this._getMultiplier(s));i*=a,s*=a;const n=((t=Math.round(t*a))-s)%i;return e>0?(t-n+i)/a:e<0?(t-(n||i))/a:t/a}_getDecimalCount(e){const t=String(e),i=t.indexOf(".");return-1===i?1:t.length-i-1}_getMultiplier(e){if(!isNaN(e))return 10**this._getDecimalCount(e)}_incrementIsInsideTheLimits(e,t){return e<0?null==this.min||this._getIncrement(e,t)>=this.min:e>0?null==this.max||this._getIncrement(e,t)<=this.max:this._getIncrement(e,t)<=this.max&&this._getIncrement(e,t)>=this.min}_allowed(e){const t=e*(this.step||1),i=parseFloat(this.value);return!this.value||!this.disabled&&this._incrementIsInsideTheLimits(t,i)}_stepChanged(e,t){t&&(t.step=e||"any")}_valueChanged(e,t){e&&isNaN(parseFloat(e))?this.value="":"string"!=typeof this.value&&(this.value=String(this.value)),super._valueChanged(this.value,t)}_onKeyDown(e){"ArrowUp"===e.key?(e.preventDefault(),this._increaseValue()):"ArrowDown"===e.key&&(e.preventDefault(),this._decreaseValue()),super._onKeyDown(e)}_isStepButtonVisible(e,t){return e||t}_setHasInputValue(e){const t=e.composedPath()[0];this._hasInputValue=t.value.length>0||t.validity.badInput}}customElements.define(h.is,h);
/**
 * @license
 * Copyright (c) 2021 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
/**
 * @license
 * Copyright (c) 2021 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class f extends h{static get is(){return"vaadin-integer-field"}constructor(){super(),this.allowedCharPattern="[-+\\d]"}_valueChanged(e,t){if(""!==e&&!this.__isInteger(e))return console.warn(`Trying to set non-integer value "${e}" to <vaadin-integer-field>. Clearing the value.`),void(this.value="");super._valueChanged(e,t)}_stepChanged(e,t){if(null!=e&&!this.__hasOnlyDigits(e))return console.warn(`<vaadin-integer-field> The \`step\` property must be a positive integer but \`${e}\` was provided, so the property was reset to \`null\`.`),void(this.step=null);super._stepChanged(e,t)}__isInteger(e){return/^(-\d)?\d*$/.test(String(e))}__hasOnlyDigits(e){return/^\d+$/.test(String(e))}}customElements.define(f.is,f);console.warn('WARNING: Since Vaadin 23.2, "@vaadin/vaadin-text-field" is deprecated. Use "@vaadin/integer-field" instead.')},182:function(e,t,i){"use strict";i.r(t);var s=i(3),a=i(70),n=i(33),l=(i(168),i(103),i(178),i(124),i(171),i(1));const o={"artificer(ua)":{class:{2:{name:"Wonderous Invention",count:1,options:["{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]},5:{name:"Wonderous Invention",count:1,options:["{@item Alchemy jug}","{@item helm of comprehending languages}","{@item lantern of revealing}","{@item ring of swimming}","{@item robe of useful items}","{@item rope of climbing}","{@item wand of magic detection}","{@item wand of secrets}","{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]},10:{name:"Wonderous Invention",count:1,options:["{@item Bag of beans}","{@item chime of opening}","{@item decanter of endless water}","{@item eyes of minute seeing}","{@item folding boat}","{@item Heward's handy haversack}","{@item Alchemy jug}","{@item helm of comprehending languages}","{@item lantern of revealing}","{@item ring of swimming}","{@item robe of useful items}","{@item rope of climbing}","{@item wand of magic detection}","{@item wand of secrets}","{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]},15:{name:"Wonderous Invention",count:1,options:["{@item Boots of striding and springing}","{@item bracers of archery}","{@item brooch of shielding}","{@item broom of flying}","{@item hat of disguise}","{@item slippers of spider climbing}","{@item Bag of beans}","{@item chime of opening}","{@item decanter of endless water}","{@item eyes of minute seeing}","{@item folding boat}","{@item Heward's handy haversack}","{@item Alchemy jug}","{@item helm of comprehending languages}","{@item lantern of revealing}","{@item ring of swimming}","{@item robe of useful items}","{@item rope of climbing}","{@item wand of magic detection}","{@item wand of secrets}","{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]},20:{name:"Wonderous Invention",count:1,options:["{@item Eyes of the eagle}","{@item gem of brightness}","{@item gloves of missile snaring}","{@item gloves of swimming and climbing}","{@item ring of jumping}","{@item ring of mind shielding}","{@item wings of flying}","{@item Boots of striding and springing}","{@item bracers of archery}","{@item brooch of shielding}","{@item broom of flying}","{@item hat of disguise}","{@item slippers of spider climbing}","{@item Bag of beans}","{@item chime of opening}","{@item decanter of endless water}","{@item eyes of minute seeing}","{@item folding boat}","{@item Heward's handy haversack}","{@item Alchemy jug}","{@item helm of comprehending languages}","{@item lantern of revealing}","{@item ring of swimming}","{@item robe of useful items}","{@item rope of climbing}","{@item wand of magic detection}","{@item wand of secrets}","{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]}}},"artificer (revisited)":{class:{2:{name:"Infuse Item",count:3,type:"featureType=ai|source=UAArtificerRevisited"},4:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"},7:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"},11:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"},15:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"},19:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"}}},artificer:{class:{2:{name:"Infuse Item",count:4,type:"featureType=ai|source=TCE"},6:{name:"Infuse Item",count:2,type:"featureType=ai|source=TCE"},10:{name:"Infuse Item",count:2,type:"featureType=ai|source=TCE"},14:{name:"Infuse Item",count:2,type:"featureType=ai|source=TCE"},18:{name:"Infuse Item",count:2,type:"featureType=ai|source=TCE"}}},barbarian:{subclasses:{"Path of the Totem Warrior":{3:{name:"Totem Spirit",count:1,options:["Bear","Eagle","Elk","Tiger","Wolf"]},6:{name:"Aspect of the Beast",count:1,options:["Bear","Eagle","Elk","Tiger","Wolf"]},14:{name:"Totemic Attunement",count:1,options:["Bear","Eagle","Elk","Tiger","Wolf"]}}}},bard:{subclasses:{"College of Swords":{3:{name:"Fighting Style",count:1,type:"fs:b"}}}},monk:{subclasses:{"Way of the Four Elements":{3:{name:"Elemental Discipline",count:2,type:"ed"},6:{name:"Elemental Discipline",count:1,type:"ed"},11:{name:"Elemental Discipline",count:1,type:"ed"},17:{name:"Elemental Discipline",count:1,type:"ed"}}}},fighter:{class:{1:{name:"Fighting Style",type:"fs:f",count:1}},subclasses:{"Battle Master":{3:{name:"Maneuvers",type:"mv:b",count:3},7:{name:"Maneuvers",type:"mv:b",count:2},10:{name:"Maneuvers",type:"mv:b",count:2},15:{name:"Maneuvers",type:"mv:b",count:2}}}},paladin:{class:{2:{name:"Fighting Style",type:"fs:p",count:1}}},ranger:{class:{2:{name:"Fighting Style",type:"fs:r",count:1}}},sorcerer:{class:{3:{name:"Metamagic",type:"mm",count:2},10:{name:"Metamagic",type:"mm",count:1},17:{name:"Metamagic",type:"mm",count:1}}},warlock:{class:{2:{name:"Eldritch Invocations",type:"ei",count:2},3:{name:"Pact Boon",type:"pb",count:1},5:{name:"Eldritch Invocations",type:"ei",count:1},7:{name:"Eldritch Invocations",type:"ei",count:1},9:{name:"Eldritch Invocations",type:"ei",count:1},12:{name:"Eldritch Invocations",type:"ei",count:1},15:{name:"Eldritch Invocations",type:"ei",count:1},18:{name:"Eldritch Invocations",type:"ei",count:1}}}};var c=i(14),r=(i(92),i(123),i(72)),d=i(37);i(166);class p extends(Object(a.a)(s.a)){static get properties(){return{levels:{type:Array,value:[]},classes:{type:Object},subclasses:{type:Object,value:void 0},noContentMessage:{type:Boolean,value:!1},isEditMode:{type:Boolean,value:!1}}}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(n.T)()),Object(n.q)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(r.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(r.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(n.q)().removeEventListener("character-selected",this.characterChangeHandler),Object(r.b)().removeEventListener("editModeChange",this.editModeHandler)}async updateFromCharacter(e){if(e&&e.levels&&e.levels.length){console.error("class updateFromCharacter",e),this.noContentMessage=!1,this.character=e,this.classes=await Object(n.F)(e),this.subclasses=Object(l.cloneDeep)(e.subclasses),this.classLevel=Object(n.G)(e),this.classChoices=await this._findLevelChoices(e,this.classes),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0})),this.levels=Object(l.cloneDeep)(e.levels);const t=[];for(let i=0;i<e.levels.length;i++)t.push(await Object(n.K)(i));this.hitDiceMaxes=t}else this.levels=[],this.noContentMessage=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}_getClassLevelFeatures(e,t,i,s){if(i&&e[t]&&s){const a=e[t].name,n=i[a];if(n){const i=n.classFeatures;let o=-1,c=-1;if(e.length>=t+1){for(let s=0;s<=t;s++)if(e[s].name===a){o++;const e=i[o];if(e){e.find(e=>e.gainSubclassFeature)&&c++}}const r=i[o];if(r){if(r.some(e=>e.gainSubclassFeature)&&s&&s[a]&&n.subclasses&&n.subclasses.length){const e=n.subclasses.find(e=>s[a].name===e.name);if(e&&e.subclassFeatures&&e.subclassFeatures[c])return e.subclassFeatures[c].map(e=>(e.isSubclass=!0,e)),[...r].concat(e.subclassFeatures[c])}return r.filter(e=>{const t=Object(l.getEntryName)(e);return"Proficiency Versatility"!==t&&"Martial Versatility"!==t})}}}}}_getClassLevelFeatureStringArray(e,t,i,s,a){if(e&&void 0!==t&&i&&s){const n=this._getClassLevelFeatures(e,t,i,s);if(n)return n.map(e=>({name:Object(l.getEntryName)(e),isSubclass:e.isSubclass,source:e.source})).filter(e=>!(a&&a[t]&&a[t].some(t=>{const i=t.selection&&(t.selection.name!==e.name||t.selection.source!==e.source),s=t.from&&t.from.some(t=>t.name===e.name&&t.source===e.source);return"replacement"===t.id&&i&&s})))}}_level(e){return e+1}_deleteLevel(e){const t=e.model.__data.index,i=this.levels[t].name,s=this.levels.filter(e=>e.name===i).length,a=Object.keys(this.character.choices).filter(e=>e.startsWith(i.toLowerCase()+"_"+s));this.levels.splice(t,1),a.forEach(e=>{delete this.character.choices[e]}),Object(n.qb)(this.levels)}_expandDetails(e){let t=e.model.__data.item,i=e.model.__dataHost.__dataHost.__data.index;this.expandedIndex===i&&this.expandedFeatureName===t.name&&this.expandedFeatureSource===t.source?(this.expandedIndex=null,this.expandedFeatureName=null,this.expandedFeatureSource=null):(this.expandedIndex=i,this.expandedFeatureName=t.name,this.expandedFeatureSource=t.source)}_renderDetails(e,t,i,s){if(e===s){let e=[];const a=new c.a,n=this._getClassLevelFeatures(this.levels,s,this.classes,this.subclasses);if(n&&n.length){const s=n.find(e=>e.name===t&&e.source===i);if(s)return a.recursiveEntryRender(s,e,0,void 0,!0),"<div class='details stats-wrapper'>"+e.join("")+"</div>"}}return""}async _findLevelChoices(e,t){const i=[];if(e&&e.levels&&e.levels.length)for(let s=0;s<e.levels.length;s++)i.push(await this._findChoices(e,t,s));return i}async _findChoices(e,t,i){if(t&&e.levels&&e.levels.length&&e.levels.length>i){let s=e.levels,a=e.subclasses,l=s[i].name,c=t[l],r=c.subclasses.find(e=>a[l]&&a[l].name===e.name);if(c){let p=[],u=0,m=Object(n.Y)(c);for(let e=0;e<=i;e++){s[e].name===l&&u++}const h={};if(c.additionalSpells){let e=9;c.additionalSpells.forEach(t=>{Object.entries(t).forEach(([t,i])=>{Object.entries(i).forEach(([i,s])=>{const a=parseInt(i.split("s").join(""));a<e&&"prepared"!==t&&"expanded"!==t&&(e=a),1===c.additionalSpells.length&&a===u&&(h.additionalSpells||(h.additionalSpells=[{}]),h.additionalSpells[0][t]||(h.additionalSpells[0][t]={}),h.additionalSpells[0][t][i]=s)})})}),c.additionalSpells.length>1&&e===u&&(h.additionalSpells=c.additionalSpells)}0===i&&(h.skillProficiencies=c.startingProficiencies.skills,c.startingProficiencies.armor&&(h.armorProficiencies=[{}],c.startingProficiencies.armor.forEach(e=>{let t=e.proficiency||e.toLowerCase();t=t.includes("shield")?"shield":t,h.armorProficiencies[0][t]=!0})),c.startingProficiencies.weapons&&(h.weaponProficiencies=[{}],c.startingProficiencies.weapons.forEach(e=>{let t=e.proficiency||e.toLowerCase();t.includes("@item")&&(t=t.split("@item")[1].trim().split("|")[0]),h.weaponProficiencies[0][t]=!0})),c.startingProficiencies.tools&&(h.toolProficiencies=[{}],c.startingProficiencies.tools.forEach(e=>{let t,i=e.proficiency||e.toLowerCase();t=i.includes("one ")?1:i.includes("two ")?2:i.includes("three ")?3:i.includes("four ")?4:i.includes("five ")?5:1,i.includes("@item")&&(i=i.split("@item")[1].trim().split("|")[0]),i.includes("artisan's tools")||i.includes("musical instrument")?(i=i.includes("artisan's tools")?"artisan's tools":"musical instrument",h.toolProficiencies[0].choose={from:[i],count:t}):h.toolProficiencies[0][i]=!0}))),p.push({id:"classSubOptions",classSubOptions:h,class:l.toLowerCase(),level:u}),void 0!==m&&u===m&&p.push({id:"subclass",from:c.subclasses,selections:e.subclasses[l]});const f={};if(r&&r.additionalSpells){let e=20,t=!1;r.additionalSpells.forEach(i=>{Object.entries(i).forEach(([i,s])=>{"expanded"===i&&(t=!0),"string"==typeof s||Array.isArray(s)||Object.entries(s).forEach(([t,s])=>{const a=parseInt(t.split("s").join(""));a<e&&"prepared"!==i&&(e=a),1===r.additionalSpells.length&&"expanded"!==i&&a===u&&(f.additionalSpells||(f.additionalSpells=[{}]),f.additionalSpells[0][i]||(f.additionalSpells[0][i]={}),f.additionalSpells[0][i][t]=s)})})}),(r.additionalSpells.length>1||t)&&e===u&&(f.additionalSpells=r.additionalSpells),p.push({id:"subclassSubOptions",subclassSubOptions:f,subclass:r.shortName,class:l.toLowerCase(),level:u})}let b=this._getClassLevelFeatures(s,i,t,a);if(b&&b.length&&b.find(e=>"Ability Score Improvement"===e.name)&&(this.asiItem||(this.asiChoice={id:"asi",class:l.toLowerCase(),level:u,asiItem:{asi:!0}}),p.push(this.asiChoice)),b&&b.length&&b.forEach(e=>{if(!e.name.includes("feature")){const t={id:"replacement",from:[{name:e.name,source:e.source}],selection:Object(n.Q)(l,i,e.name),class:l,level:i,feature:e.name};b.forEach(i=>{i.isClassFeatureVariant&&i.entries[0].includes("replaces")&&i.entries[0].includes(e.name)&&t.from.push({name:i.name,source:i.source})}),t.from.length>1&&p.push(t)}}),u){const e=o[l.toLowerCase()];if(e&&e.class&&e.class[u]){const t=[].concat(e.class[u]);for(const e of t)if(e.options)p.push({id:"classFeature",name:e.name,from:e.options,count:e.count>1?e.count:1,class:l.toLowerCase(),feature:e.name,level:u,selections:Object(n.D)(l.toLowerCase(),u,e.name)});else if(e.type){const t=await Object(d.a)("features",e.type);let i=Object(n.D)(l.toLowerCase(),u,e.name);i&&(i=Array.isArray(i)?i.map(e=>t.find(t=>t.name===e.name&&t.source===e.source)):t.find(e=>e.name===i.name&&e.source===i.source)),p.push({id:"classFeature",hasSubFeature:!0,name:e.name,from:t,count:e.count>1?e.count:1,class:l.toLowerCase(),feature:e.name,level:u,selections:i,selectionsArray:Array.isArray(i)?i:[i]})}}if(e&&e.subclasses&&a[l]&&e.subclasses[a[l].name]&&e.subclasses[a[l].name][u]){const t=[].concat(e.subclasses[a[l].name][u]);for(const e of t)if(e.options)p.push({id:"subclassFeature",name:e.name,from:e.options,count:e.count>1?e.count:void 0,class:l.toLowerCase(),subclass:a[l],feature:e.name,level:u,selections:Object(n.X)(l.toLowerCase(),a[l].name.toLowerCase(),u,e.name)});else if(e.type){const t=await Object(d.a)("features",e.type);let i=Object(n.X)(l.toLowerCase(),a[l].name.toLowerCase(),u,e.name);i&&(i=Array.isArray(i)?i.map(e=>t.find(t=>t.name===e.name&&t.source===e.source)):t.find(e=>e.name===i.name&&e.source===i.source)),p.push({id:"subclassFeature",hasSubFeature:!0,name:e.name,from:t,count:e.count>1?e.count:void 0,class:l.toLowerCase(),subclass:a[l],feature:e.name,level:u,selections:i,selectionsArray:Array.isArray(i)?i:[i]})}}}return p}}return[]}_equal(e,t){return e===t}_genSubclassCallback(e,t){return i=>{Object(n.fb)(void 0,e.name,i,t)}}_genSubclassOptions(e){return this.classes[e.name].subclasses}_getSubclassSelection(e,t){return t[e.name]}_classFeatureOptionAddCallback(e,t,i){return s=>{let a;a=Array.isArray(s)?s.map(e=>e.name?{name:e.name,source:e.source}:e):s.name?{name:s.name,source:s.source}:s,Object(n.pb)(e,t,i,a)}}_subclassFeatureOptionAddCallback(e,t,i,s){return a=>{let l;l=Array.isArray(a)?a.map(e=>e.name?{...e}:e):a.name?{...a}:a,Object(n.Db)(e,t.name.toLowerCase(),i,s,l)}}_optionalFeatureAddCallback(e,t,i){return s=>{let a;a=Array.isArray(s)?s.map(e=>e.name?{...e}:e):s.name?{...s}:s,Object(n.Bb)(e,t,i,a)}}_indexOfLevel(e,t){return t.indexOf(e)}_isMobile(){return window.innerWidth<921}_objArray(e){return Object.values(e)}_atIndex(e,t){return e?e[t]:null}_svgFromClass(e){return e?e.replace(/(\s|\(|\))/g,""):""}_addClassLevel(e){Object(n.eb)(void 0,e.model.item,"classes")}_levelHp(e,t){return Object(n.L)(e,t+1)}_editModeClass(e){return e?"edit-mode":"not-edit-mode"}_toggleHpField(e){const t=e.target.closest(".btn-field"),i=t.classList.contains("btn-field--open"),s=t.querySelector("vaadin-integer-field"),a=parseInt(t.dataset.level)+1,l=t.dataset.className,o=parseInt(t.dataset.max);if(i){const e=parseInt(s.value);e?e<=o&&e>0?(Object(n.zb)(l,a,e),s.value="",t.classList.toggle("btn-field--open")):(t.classList.add("btn-field--error"),setTimeout(()=>{t.classList.remove("btn-field--error")},500)):t.classList.toggle("btn-field--open")}else t.classList.toggle("btn-field--open"),s.focus()}_levelHitDice(e,t){if(t&&void 0!==e&&t[e])return t[e]}_hpDiceIconClass(e,t){return"fal fa-dice-d"+(this._levelHitDice(e,t)||"6")}_joinUnderscore(...e){return e.join("_")}_featureLinkClick(e){const t=e.target.__dataHost.__data.item;this.dispatchEvent(new CustomEvent("open-drawer",{bubbles:!0,composed:!0,detail:{selectedItem:t,viewId:"features"}}))}static get template(){return s.b`
      <style include="material-styles my-styles fa-styles">
        .something {
          display: block;
        }

        .class-grid {
          margin-bottom: var(--tab-bottom-margin);
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
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
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
          font-size: 16px;
        }
        .class-feature__text {
          cursor: pointer;
        }
        .class-feature__text:hover {
          text-decoration: underline;
        }
        .class-feature__text[subclass] {
          color: var(--mdc-theme-secondary);
        }
        .class-feature:last-of-type .class-feature__separator {
          display: none;
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
          min-width: 250px;
          width: calc(100% - 20px);
        }
        .add-with-links dnd-select-add {
          width: calc(100% - 48px);
        }

        @media(min-width: 420px) {
          .choices-col__choice dnd-select-add {
            width: calc(50% - 20px);
          }
          .choices-col__choice dnd-character-builder-suboptions {
            width: calc(50% - 20px);
          }
          .add-with-links dnd-select-add {
            width: calc(50% - 48px);
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
          top: 15px;
          overflow: hidden;
          display: flex;
        }
        .not-edit-mode .hp-col {
          right: 0px;
          top: 18px;
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
          font-size: 14px;
          width: calc(100% - 30px);
          margin: 0 auto 13px !important;
          background: var(--lumo-contrast-10pct);
          border-radius: 4px;
          white-space: pre-line;
          padding: 14px 14px 1px;
          line-height: 1.5;
        }
        .details > .statsBlockHead:first-child > .stat-name {
          margin-top: 0;
        }
        .details.stats-wrapper .statsBlockHead .stat-name {
          font-size: 22px;
          margin-bottom: 10px;
        }
        .details.stats-wrapper .statsBlockSubHead .stat-name {
          font-size: 18px;
        }
        .details.stats-wrapper p {
          margin-bottom: 8px;
        }
        .details.stats-wrapper .statsInlineHead .stat-name {
          font-size: inherit;
        }

        .add-with-links {
          display: flex;
          align-items: flex-start;
        }

        .links-list {
          display: flex;
          flex-direction: column;
          margin-top: 34px;
          margin-left: 8px;
        }
        .links-list .mdc-icon-button {
          padding: 4px;
          height: 28px;
          width: 28px;
          font-size: 20px;
        }

        @media(min-width: 921px) {
          .features-col {
            margin: 0 30px 0 12px;
            width: unset;
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
                  <div class="open-details">
                    <div class="level-col">
                      <span class="level-col__level">[[_level(index)]]</span>
                      <span class="level-col__image-wrap" ><dnd-svg class="level-col__image" default-color id="[[_svgFromClass(item.name)]]"></dnd-svg></span>
                      <span class="level-col__class">[[item.name]]</span>
                    </div>

                    <div class="features-col">
                      <template is="dom-repeat" items="[[_getClassLevelFeatureStringArray(levels, index, classes, subclasses, classChoices)]]">
                        <span class="class-feature">
                          <span class="class-feature__text" subclass$="[[item.isSubclass]]" on-click="_expandDetails">[[item.name]]</span><span
                            class="class-feature__separator">, 
                        </span></span>
                      </template>

                    </div>
                  </div>
                  <div class="details-wrap" inner-h-t-m-l="[[_renderDetails(expandedIndex, expandedFeatureName, expandedFeatureSource, index)]]"></div>

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
                          <div class="add-with-links">
                            <dnd-select-add choices="[[choice.count]]" label="[[choice.name]]" placeholder="<Choose Option>" disabled$="[[!isEditMode]]"
                              options="[[choice.from]]" choices="1" value="[[choice.selections]]" add-callback="[[_classFeatureOptionAddCallback(choice.class, choice.level, choice.feature)]]"></dnd-select-add>
                            <div class="links-list">
                              <template is="dom-repeat" items="[[choice.selections]]">
                                <button class="mdc-icon-button material-icons" on-click="_featureLinkClick" >logout</button>
                              </template>
                            </div>
                          </div>
                          <template is="dom-repeat" items="[[choice.selectionsArray]]" as="subfeature">
                            <dnd-character-builder-suboptions label="[[choice.class]]" storage-key="[[_joinUnderscore(choice.class, choice.level, 'feature', index)]]" selected-item="[[subfeature]]"></dnd-character-builder-suboptions>
                          </template>
                        </template>

                        <template is="dom-if" if="[[_equal(choice.id, 'subclassFeature')]]">
                          <div class="add-with-links">
                            <dnd-select-add choices="[[choice.count]]" label="[[choice.name]]" placeholder="<Choose Option>" disabled$="[[!isEditMode]]"
                              options="[[choice.from]]" value="[[choice.selections]]" add-callback="[[_subclassFeatureOptionAddCallback(choice.class, choice.subclass, choice.level, choice.feature)]]"></dnd-select-add>
                            <div class="links-list">
                              <template is="dom-repeat" items="[[choice.selections]]">
                                <button class="mdc-icon-button material-icons" on-click="_featureLinkClick" >logout</button>
                              </template>
                            </div>
                          </div>
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
              </div>
            </template>
          </div>
        </div>
      </div>
    `}}customElements.define("dnd-character-builder-class",p)}}]);
//# sourceMappingURL=9.bundle.js.map