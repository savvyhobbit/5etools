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
</dom-module>`;document.head.appendChild(s.content);i(78),i(3),i(43);var a=i(65),n=i(33);
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
const l=document.createElement("template");let o;l.innerHTML='<dom-module id="vaadin-number-field-template">\n  <template>\n    <style>\n      :host([readonly]) [part$="button"] {\n        pointer-events: none;\n      }\n\n      [part="decrease-button"]::before {\n        content: "−";\n      }\n\n      [part="increase-button"]::before {\n        content: "+";\n      }\n\n      [part="decrease-button"],\n      [part="increase-button"] {\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n      }\n\n      /* Hide the native arrow icons */\n      [part="value"]::-webkit-outer-spin-button,\n      [part="value"]::-webkit-inner-spin-button {\n        -webkit-appearance: none;\n        margin: 0;\n      }\n\n      [part="value"] {\n        /* Older Firefox versions (v47.0) requires !important */\n        -moz-appearance: textfield !important;\n      }\n\n      :host([dir="rtl"]) [part="input-field"] {\n        direction: ltr;\n      }\n\n      :host([dir="rtl"]) [part="value"]::placeholder {\n        direction: rtl;\n      }\n\n      :host([dir="rtl"]) [part="input-field"] ::slotted(input)::placeholder {\n        direction: rtl;\n      }\n\n      :host([dir="rtl"]) [part="value"]:-ms-input-placeholder,\n      :host([dir="rtl"]) [part="input-field"] ::slotted(input):-ms-input-placeholder {\n        direction: rtl;\n      }\n\n      :host([dir="rtl"]:not([has-controls])) [part="value"]::placeholder {\n        text-align: left;\n      }\n\n      :host([dir="rtl"]:not([has-controls])) [part="input-field"] ::slotted(input)::placeholder {\n        text-align: left;\n      }\n\n      :host([dir="rtl"]:not([has-controls])) [part="value"]:-ms-input-placeholder,\n      :host([dir="rtl"]:not([has-controls])) [part="input-field"] ::slotted(input):-ms-input-placeholder {\n        text-align: left;\n      }\n    </style>\n\n    <div disabled$="[[!_allowed(-1, value, min, max, step)]]" part="decrease-button" on-click="_decreaseValue" on-touchend="_decreaseButtonTouchend" hidden$="[[!hasControls]]">\n    </div>\n\n    <div disabled$="[[!_allowed(1, value, min, max, step)]]" part="increase-button" on-click="_increaseValue" on-touchend="_increaseButtonTouchend" hidden$="[[!hasControls]]">\n    </div>\n  </template>\n\n  \n</dom-module>',document.head.appendChild(l.content);class c extends a.a{static get is(){return"vaadin-number-field"}static get version(){return"2.6.2"}static get properties(){return{hasControls:{type:Boolean,value:!1,reflectToAttribute:!0},min:{type:Number,reflectToAttribute:!0,observer:"_minChanged"},max:{type:Number,reflectToAttribute:!0,observer:"_maxChanged"},step:{type:Number,value:1,observer:"_stepChanged"}}}ready(){super.ready(),this.__previousValidInput=this.value||"",this.inputElement.type="number",this.inputElement.addEventListener("change",this.__onInputChange.bind(this))}_decreaseButtonTouchend(e){e.preventDefault(),this._decreaseValue()}_increaseButtonTouchend(e){e.preventDefault(),this._increaseValue()}static get template(){if(!o){o=super.template.cloneNode(!0);const e=n.a.import(this.is+"-template","template"),t=e.content.querySelector('[part="decrease-button"]'),i=e.content.querySelector('[part="increase-button"]'),s=e.content.querySelector("style"),a=o.content.querySelector('[part="input-field"]'),l=o.content.querySelector('[name="prefix"]');a.insertBefore(t,l),a.appendChild(i),o.content.appendChild(s)}return o}_createConstraintsObserver(){this._createMethodObserver("_constraintsChanged(required, minlength, maxlength, pattern, min, max, step)")}_constraintsChanged(e,t,i,s,a,n,l){if(!this.invalid)return;const o=e=>!e&&0!==e;o(a)&&o(n)?super._constraintsChanged(e,t,i,s):this.validate()}_decreaseValue(){this._incrementValue(-1)}_increaseValue(){this._incrementValue(1)}_incrementValue(e){if(this.disabled||this.readonly)return;let t=parseFloat(this.value);this.value?t<this.min?(e=0,t=this.min):t>this.max&&(e=0,t=this.max):0==this.min&&e<0||0==this.max&&e>0||0==this.max&&0==this.min?(e=0,t=0):(null==this.max||this.max>=0)&&(null==this.min||this.min<=0)?t=0:this.min>0?(t=this.min,this.max<0&&e<0&&(t=this.max),e=0):this.max<0&&(t=this.max,e<0?e=0:this._getIncrement(1,t-this.step)>this.max?t-=2*this.step:t-=this.step);const i=this._getIncrement(e,t);this.value&&0!=e&&!this._incrementIsInsideTheLimits(e,t)||this._setValue(i)}_setValue(e){this.value=this.inputElement.value=String(parseFloat(e)),this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}_getIncrement(e,t){let i=this.step||1,s=this.min||0;const a=Math.max(this._getMultiplier(t),this._getMultiplier(i),this._getMultiplier(s));i*=a,s*=a;const n=((t=Math.round(t*a))-s)%i;return e>0?(t-n+i)/a:e<0?(t-(n||i))/a:t/a}_getDecimalCount(e){const t=String(e),i=t.indexOf(".");return-1===i?1:t.length-i-1}_getMultiplier(e){if(!isNaN(e))return Math.pow(10,this._getDecimalCount(e))}_incrementIsInsideTheLimits(e,t){return e<0?null==this.min||this._getIncrement(e,t)>=this.min:e>0?null==this.max||this._getIncrement(e,t)<=this.max:this._getIncrement(e,t)<=this.max&&this._getIncrement(e,t)>=this.min}_allowed(e){const t=e*(this.step||1),i=parseFloat(this.value);return!this.value||!this.disabled&&this._incrementIsInsideTheLimits(t,i)}_stepChanged(e){this.__validateByStep=this.__stepChangedCalled||null!==this.getAttribute("step"),this.inputElement.step=this.__validateByStep?e:"any",this.__stepChangedCalled=!0,this.setAttribute("step",e)}_minChanged(e){this.inputElement.min=e}_maxChanged(e){this.inputElement.max=e}_valueChanged(e,t){e&&isNaN(parseFloat(e))?this.value="":"string"!=typeof this.value&&(this.value=String(this.value)),super._valueChanged(this.value,t)}_onKeyDown(e){38==e.keyCode?(e.preventDefault(),this._increaseValue()):40==e.keyCode&&(e.preventDefault(),this._decreaseValue()),super._onKeyDown(e)}__onInputChange(){this.validate()}checkValidity(){return void 0!==this.min||void 0!==this.max||this.__validateByStep?this.inputElement.checkValidity():super.checkValidity()}}window.customElements.define(c.is,c);
/**
@license
Copyright (c) 2019 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
const r=document.createElement("template");r.innerHTML='<dom-module id="vaadin-integer-field-template">\n\n  \n</dom-module>',document.head.appendChild(r.content);class d extends c{static get is(){return"vaadin-integer-field"}static get version(){return"2.6.2"}static get properties(){return{pattern:String,preventInvalidInput:Boolean,minlength:Number,maxlength:Number}}ready(){super.ready(),this._enabledCharPattern="[-+\\d]"}_valueChanged(e,t){if(""!==e&&!this.__isInteger(e))return console.warn(`Trying to set non-integer value "${e}" to <vaadin-integer-field>. Clearing the value.`),void(this.value="");super._valueChanged(e,t)}_stepChanged(e,t){if(!this.__hasOnlyDigits(e))return console.warn(`Trying to set invalid step size "${e}", which is not a positive integer, to <vaadin-integer-field>. Resetting the default value 1.`),void(this.step=1);super._stepChanged(e,t)}__isInteger(e){return/^(-\d)?\d*$/.test(String(e))}__hasOnlyDigits(e){return/^\d*$/.test(String(e))}}window.customElements.define(d.is,d)},159:function(e,t,i){"use strict";i.r(t);var s=i(3),a=i(45),n=i(32),l=(i(108),i(145),i(152),i(88),i(1));class o extends s.a{static get properties(){return{levelIndex:{type:Number},checked:{type:Boolean,value:!1},selectedFeat:{type:Object},selectedAbility1:{type:String,value:""},selectedAbility2:{type:String,value:""},featHasAttributeChoice:{type:Boolean,value:!1},featAttributeSelection:{type:String,value:""},featAttributeOptions:{type:Array,value:[]},disabled:{type:Boolean,value:!1,reflectToAttribute:!0}}}constructor(){super(),this.attributeOptions=["STR","DEX","CON","INT","WIS","CHA"]}connectedCallback(){super.connectedCallback(),this.switchChangeHandler=e=>{this.checked=e.detail.checked,this._genASICallback()()},this.addEventListener("switch-change",this.switchChangeHandler),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(n.O)()),Object(n.n)().addEventListener("character-selected",this.characterChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("switch-change",this.switchChangeHandler),Object(n.n)().removeEventListener("character-selected",this.characterChangeHandler)}async updateFromCharacter(e){const{asi:t,index:i}=await Object(n.i)(this.levelIndex,e);if(this.featHasAttributeChoice=!1,t){if(this.selectedFeat=t.feat,this.selectedAbility1=t.ability1,this.selectedAbility2=t.ability2,this.checked=t.isFeat,t.isFeat&&t.feat&&t.feat.name&&t.feat.source){const i=`${t.feat.name}_${t.feat.source}`,s=await Object(n.E)(i);s.ability&&s.ability.length&&s.ability[0].choose&&(this.featHasAttributeChoice=!0,this.featAttributeOptions=s.ability[0].choose.from.map(e=>e.toUpperCase()),this.featAttributeSelection=e.featAttributeSelections&&e.featAttributeSelections[i]?e.featAttributeSelections[i]:"")}}else this.selectedFeat={name:"",source:""},this.selectedAbility1="",this.selectedAbility2="",this.checked=!1;this.asiIndex=i}_genASICallback(e){return t=>{Object(n.hb)({feat:"feat"===e?{name:t.name,source:t.source}:this.selectedFeat,ability1:"ability1"===e?t:this.selectedAbility1,ability2:"ability2"===e?t:this.selectedAbility2,isFeat:this.checked},this.asiIndex)}}_genFeatAbilityCallback(){return e=>{if(this.selectedFeat&&this.selectedFeat.name&&this.selectedFeat.source){const t=`${this.selectedFeat.name}_${this.selectedFeat.source}`;Object(n.rb)(t,e)}}}_disableLabel(e){return e?"Feat":"ASI"}_getFeatLink(e){let t=[e.name];e.source&&t.push(e.source);let i=Object(l.encodeForHash)(t);return i?"#/feats/"+i:"#/feats"}_linkClick(){this.dispatchEvent(new CustomEvent("open-drawer",{bubbles:!0,composed:!0,detail:{selectedItem:this.selectedFeat,viewId:"feats"}}))}static get template(){return s.b`
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
      <dnd-switch initial-value=[[checked]] label="ASI" secondary-label="Feat" disabled$="[[disabled]]" hidden$="[[disabled]]"></dnd-switch>
      <div class="abilities" hidden$=[[checked]]>
        <dnd-select-add add-callback="[[_genASICallback('ability1')]]" value="[[selectedAbility1]]" options="[[attributeOptions]]" placeholder="<ASI>" disabled$="[[disabled]]"></dnd-select-add>
        <dnd-select-add add-callback="[[_genASICallback('ability2')]]" value="[[selectedAbility2]]" options="[[attributeOptions]]" placeholder="<ASI>" disabled$="[[disabled]]"></dnd-select-add>
      </div>
      <div class="feat-pick-wrap" hidden$=[[!checked]]>
        <dnd-select-add add-callback="[[_genASICallback('feat')]]" model="feats" value="[[selectedFeat.name]]" placeholder="<Choose Feat>" disabled$="[[disabled]]"></dnd-select-add>
        <button class="reference-link mdc-icon-button material-icons" on-click="_linkClick">logout</button>
      </div>
      <div hidden$=[[!featHasAttributeChoice]]>
        <dnd-select-add test add-callback="[[_genFeatAbilityCallback()]]" value="[[featAttributeSelection]]" options="[[featAttributeOptions]]" placeholder="<Choose Attribute>" disabled$="[[disabled]]"></dnd-select-add>
      </div>
    `}}customElements.define("dnd-asi-select",o);i(107),i(148);const c={"artificer(ua)":{class:{2:{name:"Wonderous Invention",count:1,options:["{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]},5:{name:"Wonderous Invention",count:1,options:["{@item Alchemy jug}","{@item helm of comprehending languages}","{@item lantern of revealing}","{@item ring of swimming}","{@item robe of useful items}","{@item rope of climbing}","{@item wand of magic detection}","{@item wand of secrets}","{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]},10:{name:"Wonderous Invention",count:1,options:["{@item Bag of beans}","{@item chime of opening}","{@item decanter of endless water}","{@item eyes of minute seeing}","{@item folding boat}","{@item Heward's handy haversack}","{@item Alchemy jug}","{@item helm of comprehending languages}","{@item lantern of revealing}","{@item ring of swimming}","{@item robe of useful items}","{@item rope of climbing}","{@item wand of magic detection}","{@item wand of secrets}","{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]},15:{name:"Wonderous Invention",count:1,options:["{@item Boots of striding and springing}","{@item bracers of archery}","{@item brooch of shielding}","{@item broom of flying}","{@item hat of disguise}","{@item slippers of spider climbing}","{@item Bag of beans}","{@item chime of opening}","{@item decanter of endless water}","{@item eyes of minute seeing}","{@item folding boat}","{@item Heward's handy haversack}","{@item Alchemy jug}","{@item helm of comprehending languages}","{@item lantern of revealing}","{@item ring of swimming}","{@item robe of useful items}","{@item rope of climbing}","{@item wand of magic detection}","{@item wand of secrets}","{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]},20:{name:"Wonderous Invention",count:1,options:["{@item Eyes of the eagle}","{@item gem of brightness}","{@item gloves of missile snaring}","{@item gloves of swimming and climbing}","{@item ring of jumping}","{@item ring of mind shielding}","{@item wings of flying}","{@item Boots of striding and springing}","{@item bracers of archery}","{@item brooch of shielding}","{@item broom of flying}","{@item hat of disguise}","{@item slippers of spider climbing}","{@item Bag of beans}","{@item chime of opening}","{@item decanter of endless water}","{@item eyes of minute seeing}","{@item folding boat}","{@item Heward's handy haversack}","{@item Alchemy jug}","{@item helm of comprehending languages}","{@item lantern of revealing}","{@item ring of swimming}","{@item robe of useful items}","{@item rope of climbing}","{@item wand of magic detection}","{@item wand of secrets}","{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]}}},"artificer (revisited)":{class:{2:{name:"Infuse Item",count:3,type:"featureType=ai|source=UAArtificerRevisited"},4:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"},7:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"},11:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"},15:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"},19:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"}}},artificer:{class:{2:{name:"Infuse Item",count:4,type:"featureType=ai|source=TCE"},6:{name:"Infuse Item",count:2,type:"featureType=ai|source=TCE"},10:{name:"Infuse Item",count:2,type:"featureType=ai|source=TCE"},14:{name:"Infuse Item",count:2,type:"featureType=ai|source=TCE"},18:{name:"Infuse Item",count:2,type:"featureType=ai|source=TCE"}}},barbarian:{subclasses:{"Path of the Totem Warrior":{3:{name:"Totem Spirit",count:1,options:["Bear","Eagle","Elk","Tiger","Wolf"]},6:{name:"Aspect of the Beast",count:1,options:["Bear","Eagle","Elk","Tiger","Wolf"]},14:{name:"Totemic Attunement",count:1,options:["Bear","Eagle","Elk","Tiger","Wolf"]}}}},bard:{subclasses:{"College of Swords":{3:{name:"Fighting Style",count:1,type:"fs:b"}}}},fighter:{class:{1:{name:"Fighting Style",type:"fs:f",count:1}}},paladin:{class:{2:{name:"Fighting Style",type:"fs:p",count:1}}},ranger:{class:{2:{name:"Fighting Style",type:"fs:r",count:1}}},sorcerer:{class:{3:{name:"Metamagic",type:"mm",count:2},10:{name:"Metamagic",type:"mm",count:1},17:{name:"Metamagic",type:"mm",count:1}},subclasses:{"Divine Soul":{1:[{name:"Divine Magic Affinity",options:["Good (Cure Wounds)","Evil (Inflict Wounds)","Law (Bless)","Chaos (Bane)","Neutrality (Protection From Good and Evil"],count:1}]}}},warlock:{class:{2:{name:"Eldritch Invocations",type:"ei",count:2},3:{name:"Pact Boon",type:"pb",count:1},5:{name:"Eldritch Invocations",type:"ei",count:1},7:{name:"Eldritch Invocations",type:"ei",count:1},9:{name:"Eldritch Invocations",type:"ei",count:1},12:{name:"Eldritch Invocations",type:"ei",count:1},15:{name:"Eldritch Invocations",type:"ei",count:1},18:{name:"Eldritch Invocations",type:"ei",count:1}}}};var r=i(16),d=(i(70),i(90),i(143)),m=i(40);i(144);class p extends(Object(a.a)(s.a)){static get properties(){return{levels:{type:Array,value:[]},classes:{type:Object},subclasses:{type:Object,value:void 0},noContentMessage:{type:Boolean,value:!1},isEditMode:{type:Boolean,value:!1}}}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(n.O)()),Object(n.n)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode,this.$.classGrid.notifyResize()},Object(d.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(d.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(n.n)().removeEventListener("character-selected",this.characterChangeHandler),Object(d.b)().removeEventListener("editModeChange",this.editModeHandler)}ready(){super.ready();const e=new r.a;setTimeout(()=>{const t=this.$.classGrid;let i;t.rowDetailsRenderer=((t,i,s)=>{let a=[],n=this._getClassLevelFeatures(this.levels,s.index,this.classes,this.subclasses);if(n&&n.length){t.firstElementChild||(t.innerHTML='<div class="details stats-wrapper "></div>');for(let t of n){this.classChoices&&this.classChoices[s.index]&&this.classChoices[s.index].some(e=>{const i=e.selection&&(e.selection.name!==t.name||e.selection.source!==t.source),s=e.from&&e.from.some(e=>e.name===t.name&&e.source===t.source);return"replacement"===e.id&&i&&s})||e.recursiveEntryRender(t,a,0,void 0,!0)}const i=t.querySelector(".details");Object(l.jqEmpty)(i),i.innerHTML=a.join("")}}).bind(this),t.addEventListener("grid-dragstart",(function(e){i=e.detail.draggedItems[0],t.dropMode="between"})),t.addEventListener("grid-dragend",(function(e){i=t.dropMode=null})),t.addEventListener("grid-drop",(function(e){const s=e.detail.dropTargetItem;if(i&&i!==s){const a=t.items.filter((function(e){return e!==i})),l=a.indexOf(s)+("below"===e.detail.dropLocation?1:0);a.splice(l,0,i),Object(n.kb)(a)}}))},0)}async updateFromCharacter(e){if(e&&e.levels&&e.levels.length){this.noContentMessage=!1,this.character=e,this.classes=await Object(n.A)(e),this.subclasses=JSON.parse(JSON.stringify(e.subclasses)),this.classLevel=Object(n.C)(e),this.classChoices=await this._findLevelChoices(e,this.classes),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0})),this.levels=e.levels;const t=[];for(let i=0;i<e.levels.length;i++)t.push(await Object(n.G)(i));this.hitDiceMaxes=t,this.$.classGrid.clearCache()}else this.noContentMessage=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0})),this.$.classGrid.clearCache()}_getClassLevelFeatures(e,t,i,s){if(i&&e[t]&&s){const a=e[t].name,n=i[a];if(n){const i=n.classFeatures;let o=-1,c=-1;if(e.length>=t+1){for(let s=0;s<=t;s++)if(e[s].name===a){o++;const e=i[o];if(e){e.find(e=>e.gainSubclassFeature)&&c++}}const r=i[o];if(r){if(r.some(e=>e.gainSubclassFeature)&&s&&s[a]&&n.subclasses&&n.subclasses.length){const e=n.subclasses.find(e=>s[a].name===e.name);if(e&&e.subclassFeatures[c])return e.subclassFeatures[c].map(e=>(e.isSubclass=!0,e)),[...r].concat(e.subclassFeatures[c])}return r.filter(e=>{const t=Object(l.getEntryName)(e);return"Proficiency Versatility"!==t&&"Martial Versatility"!==t})}}}}}_getClassLevelFeatureStringArray(e,t,i,s,a){if(e&&void 0!==t&&i&&s){const n=this._getClassLevelFeatures(e,t,i,s);if(n)return n.map(e=>({name:Object(l.getEntryName)(e),isSubclass:e.isSubclass,source:e.source})).filter(e=>!(a&&a[t]&&a[t].some(t=>{const i=t.selection&&(t.selection.name!==e.name||t.selection.source!==e.source),s=t.from&&t.from.some(t=>t.name===e.name&&t.source===e.source);return"replacement"===t.id&&i&&s})))}}_level(e){return e+1}_deleteLevel(e){let t=e.model.__data.index,i=this.levels[0].id;this.levels.splice(t,1),Object(n.kb)(this.levels,i)}_expandDetails(e){let t=e.model.__data.item,i=this.$.classGrid.detailsOpenedItems.indexOf(t)>-1;for(let e of this.$.classGrid.detailsOpenedItems)this.$.classGrid.closeItemDetails(e);i?this.$.classGrid.closeItemDetails(t):this.$.classGrid.openItemDetails(t),this.$.classGrid.notifyResize()}async _findLevelChoices(e,t){const i=[];if(e&&e.levels&&e.levels.length)for(let s=0;s<e.levels.length;s++)i.push(await this._findChoices(e,t,s));return i}async _findChoices(e,t,i){if(t&&e.levels&&e.levels.length&&e.levels.length>i){let s=e.levels,a=e.subclasses,l=s[i].name,o=t[l];if(o){let r=[],d=0,p=Object(n.S)(o);for(let e=0;e<=i;e++){s[e].name===l&&d++}if(0===i){const e={};e.skillProficiencies=o.startingProficiencies.skills,o.startingProficiencies.armor&&(e.armorProficiencies=[{}],o.startingProficiencies.armor.forEach(t=>{let i=t.proficiency||t.toLowerCase();i=i.includes("shield")?"shield":i,e.armorProficiencies[0][i]=!0})),o.startingProficiencies.weapons&&(e.weaponProficiencies=[{}],o.startingProficiencies.weapons.forEach(t=>{let i=t.proficiency||t.toLowerCase();i.includes("@item")&&(i=i.split("@item")[1].trim().split("|")[0]),e.weaponProficiencies[0][i]=!0})),o.startingProficiencies.tools&&(e.toolProficiencies=[{}],o.startingProficiencies.tools.forEach(t=>{let i,s=t.proficiency||t.toLowerCase();i=s.includes("one ")?1:s.includes("two ")?2:s.includes("three ")?3:s.includes("four ")?4:s.includes("five ")?5:1,s.includes("@item")&&(s=s.split("@item")[1].trim().split("|")[0]),s.includes("artisan's tools")||s.includes("musical instrument")?(s=s.includes("artisan's tools")?"artisan's tools":"musical instrument",e.toolProficiencies[0].choose={from:[s],count:i}):e.toolProficiencies[0][s]=!0})),r.push({id:"firstClass",suboptions:e})}void 0!==p&&d===p&&r.push({id:"subclass",from:o.subclasses,selections:e.subclasses[l]});let u=this._getClassLevelFeatures(s,i,t,a);if(u&&u.length&&u.find(e=>"Ability Score Improvement"===e.name)&&r.push({id:"asi"}),u&&u.length&&u.forEach(e=>{if(!e.name.includes("feature")){const t={id:"replacement",from:[{name:e.name,source:e.source}],selection:Object(n.M)(l,i,e.name),class:l,level:i,feature:e.name};u.forEach(i=>{i.isClassFeatureVariant&&i.entries[0].includes("replaces")&&i.entries[0].includes(e.name)&&t.from.push({name:i.name,source:i.source})}),t.from.length>1&&(console.error(" replacement choice",t),r.push(t))}}),d){const e=c[l.toLowerCase()];if(e&&e.class&&e.class[d]){const t=[].concat(e.class[d]);for(const e of t)if(console.error("classLevelOption",e),e.options)r.push({id:"classFeature",name:e.name,from:e.options,count:e.count>1?e.count:void 0,class:l.toLowerCase(),feature:e.name,level:d,selections:Object(n.y)(l.toLowerCase(),d,e.name)});else if(e.type){const t=await Object(m.a)("features",e.type);r.push({id:"classFeature",name:e.name,from:t,count:e.count>1?e.count:void 0,class:l.toLowerCase(),feature:e.name,level:d,selections:Object(n.y)(l.toLowerCase(),d,e.name)})}}if(e&&e.subclasses&&a[l]&&e.subclasses[a[l].name]&&e.subclasses[a[l].name][d]){const t=[].concat(e.subclasses[a[l].name][d]);for(const e of t)if(e.options)r.push({id:"subclassFeature",name:e.name,from:e.options,count:e.count>1?e.count:void 0,class:l.toLowerCase(),subclass:a[l],feature:e.name,level:d,selections:Object(n.R)(l.toLowerCase(),a[l].name.toLowerCase(),d,e.name)});else if(e.type){const t=await Object(m.a)("features",e.type);r.push({id:"subclassFeature",name:e.name,from:t,count:e.count>1?e.count:void 0,class:l.toLowerCase(),subclass:a[l],feature:e.name,level:d,selections:Object(n.R)(l.toLowerCase(),a[l].name.toLowerCase(),d,e.name)})}}}return r}}return[]}_equal(e,t){return e===t}_genSubclassCallback(e){return t=>{Object(n.Y)(void 0,e.name,t)}}_genSubclassOptions(e){return this.classes[e.name].subclasses}_getSubclassSelection(e,t){return t[e.name]}_classFeatureOptionAddCallback(e,t,i){return s=>{let a;a=Array.isArray(s)?s.map(e=>e.name?{name:e.name,source:e.source}:e):s.name?{name:s.name,source:s.source}:s,Object(n.jb)(e,t,i,a)}}_subclassFeatureOptionAddCallback(e,t,i,s){return a=>{let l;l=Array.isArray(a)?a.map(e=>e.name?{...e}:e):a.name?{...a}:a,Object(n.wb)(e,t.name.toLowerCase(),i,s,l)}}_optionalFeatureAddCallback(e,t,i){return s=>{let a;a=Array.isArray(s)?s.map(e=>e.name?{...e}:e):s.name?{...s}:s,Object(n.ub)(e,t,i,a)}}_indexOfLevel(e,t){return t.indexOf(e)}_isMobile(){return window.innerWidth<921}_objArray(e){return Object.values(e)}_atIndex(e,t){return e?e[t]:null}_svgFromClass(e){return e?e.replace(/(\s|\(|\))/g,""):""}_addClassLevel(e){Object(n.X)(void 0,e.model.item,"classes")}_classSkillAddCallback(e){Object(n.lb)(e)}_levelHp(e,t){return Object(n.H)(e,t+1)}_editModeClass(e){return e?"edit-mode":"not-edit-mode"}_toggleHpField(e){const t=e.target.closest(".btn-field"),i=t.classList.contains("btn-field--open"),s=t.querySelector("vaadin-integer-field"),a=parseInt(t.dataset.level)+1,l=t.dataset.className,o=parseInt(t.dataset.max);if(i){const e=parseInt(s.value);e?e<=o&&e>0?(Object(n.sb)(l,a,e),s.value="",t.classList.toggle("btn-field--open")):(t.classList.add("btn-field--error"),setTimeout(()=>{t.classList.remove("btn-field--error")},500)):t.classList.toggle("btn-field--open")}else t.classList.toggle("btn-field--open"),s.focus()}_levelHitDice(e,t){if(t&&void 0!==e&&t[e])return t[e]}_hpDiceIconClass(e,t){return"fal fa-dice-d"+(this._levelHitDice(e,t)||"6")}static get template(){return s.b`
      <style include="material-styles my-styles fa-styles">
        .something {
          display: block;
        }

        #classGrid {
          margin-bottom: 144px;
        }

        .heading-wrap {
          display: flex;
          justify-content: space-between;
          margin: 22px 14px 12px;
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
          height: 24px;
          width: 24px;
          font-size: 18px;
          padding: 0;
          margin-right: 16px;
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
          #classGrid {
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
          <div class="no-content-message" hidden$="[[!noContentMessage]]">Enter edit mode to add classes and levels.</div>

          <vaadin-grid id="classGrid" items=[[levels]] theme="no-border" height-by-rows>
            <vaadin-grid-column flex-grow="1">
              <template>
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

                        <template is="dom-if" if="[[_equal(choice.id, 'firstClass')]]">
                          <dnd-character-builder-suboptions storage-key="firstClass" selected-item="[[choice.suboptions]]"></dnd-character-builder-suboptions>
                        </template>
          
                        <template is="dom-if" if="[[_equal(choice.id, 'replacement')]]">
                          <dnd-select-add label="Optional Features" placeholder="<Choose Option>" disabled$="[[!isEditMode]]"
                            options="[[choice.from]]" value="[[choice.selection]]" add-callback="[[_optionalFeatureAddCallback(choice.class, choice.level, choice.feature)]]"></dnd-select-add>
                        </template>

                        <template is="dom-if" if="[[_equal(choice.id, 'subclass')]]">
                          <dnd-select-add class="choices-col__subclass-choice" label="Subclass" placeholder="<Choose Subclass>" disabled$="[[!isEditMode]]"
                            options="[[choice.from]]" value="[[choice.selections]]" add-callback="[[_genSubclassCallback(item)]]"></dnd-select-add>
                        </template>
                        <template is="dom-if" if="[[_equal(choice.id, 'asi')]]">
                          <dnd-asi-select level-index="[[_indexOfLevel(item, levels)]]" character="[[character]]" disabled$="[[!isEditMode]]"></dnd-asi-select>
                        </template>
                        <template is="dom-if" if="[[_equal(choice.id, 'classFeature')]]">
                          <dnd-select-add choices="[[choice.count]]" label="[[choice.name]]" placeholder="<Choose Option>" disabled$="[[!isEditMode]]"
                            options="[[choice.from]]" value="[[choice.selections]]" add-callback="[[_classFeatureOptionAddCallback(choice.class, choice.level, choice.feature)]]"></dnd-select-add>
                        </template>
                        <template is="dom-if" if="[[_equal(choice.id, 'subclassFeature')]]">
                          <dnd-select-add choices="[[choice.count]]" label="[[choice.name]]" placeholder="<Choose Option>" disabled$="[[!isEditMode]]"
                            options="[[choice.from]]" value="[[choice.selections]]" add-callback="[[_subclassFeatureOptionAddCallback(choice.class, choice.subclass, choice.level, choice.feature)]]"></dnd-select-add>
                        </template>
                      </div>
                    </template>
                  </div>

                  <div class="hp-col">
                    <div class="delete-col">
                      <button class="delete-btn mdc-icon-button" on-click="_deleteLevel"><i class="fas fa-trash" on-click="_deleteLevel"></i></button>
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
              </template>
            </vaadin-grid-column>
          </vaadin-grid>
        </div>
      </div>
    `}}customElements.define("dnd-character-builder-class",p)}}]);
//# sourceMappingURL=8.bundle.js.map