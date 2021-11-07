(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{115:function(t,e,i){"use strict";var n=i(7),s=i(68);i(77),i(112);class a extends n.a{static get properties(){return{label:{type:String,value:""},icon:{type:String,value:""},svg:{type:String,value:""},background:{type:String,value:""},border:{type:String,value:""},svgFill:{type:String,value:""},svgStroke:{type:String,value:""}}}connectedCallback(){setTimeout(()=>{this.button=new s.a(this.$.button)},10)}_exists(t){return!!t}_styleStr(t,e){let i="";return t&&(i+=`background: ${t}; `),e&&(i+=`border: ${e}; `),i}_svgStyleStr(t,e){let i="";return t&&(i+=`fill: ${t}; `),e&&(i+=`stroke: ${e}; `),i}static get template(){return n.b`
      <style include="material-styles">
        .mdc-tab-scroller__scroll-area--scroll {
          overflow-x: auto;
          background-color: var(--mdc-theme-surface);
          border: 1px solid var(--mdc-theme-text-divider-on-background);
          border-bottom: none;
        }
        :host {
          display: inline;
          overflow: hidden;
          white-space: nowrap;
        }
        .mdc-button {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
        .mdc-button .mdc-button__icon {
          margin-right: 0px;
          margin-left: 8px;
        }
        .mdc-button [background] {
          background: var(--lumo-contrast-10pct);
        }
        dnd-svg {
          height: 20px;
          width: 20px;
          flex-shrink: 0;
          flex-grow: 0;
          padding-left: 8px;
          fill: var(--mdc-theme-primary);
          stroke: var(--mdc-theme-primary);
        }
        i {
          flex-shrink: 0;
          flex-grow: 0;
        }

        
        :host(.btn-field__btn) dnd-svg {
          padding-left: 0;
        }
        :host(.btn-field__btn) i {
          margin-left: 0;
        }

        :host(.icon-only) dnd-svg {
          margin-left: -24px;
          padding-left: 0;
        }
        :host(.icon-only) i {
          margin-left: -18px;
          padding-left: 0;
        }

        :host(.link) .mdc-button__label {
          text-transform: none;
          color: var(--lumo-body-text-color);
          letter-spacing: normal;
        }
        :host(.link) i {
          color: var(--lumo-body-text-color);
        }
        :host(.link) button:hover::before {
          background: none;
        }
        :host(.link) button:hover i,
        :host(.link) button:hover .mdc-button__label {
          color: var(--mdc-theme-secondary);
        }
      </style>
      <button id="button" class="mdc-button" style$="[[_styleStr(background, border)]]">
        <div class="mdc-button__ripple"></div>
        <span class="mdc-button__label">[[label]]</span>
        <slot name="label"></slot>
        <template is="dom-if" if="[[_exists(icon)]]">
          <i class="material-icons mdc-button__icon" aria-hidden="true">[[icon]]</i>
        </template>
        <template is="dom-if" if="[[_exists(svg)]]">
          <dnd-svg id="[[svg]]" style$="[[_svgStyleStr(svgFill, svgStroke)]]"></dnd-svg>
        </template>
      </button>
    `}}customElements.define("dnd-button",a)},120:function(t,e,i){"use strict";var n=i(7),s=i(17),a=i(1),l=(i(81),i(32));class o extends n.a{static get properties(){return{test:{type:Boolean,reflectToAttribute:!0,value:!1},options:{type:Array,observer:"optionsUpdated"},model:{type:String},addCallback:{type:Function},value:{type:String,value:"",observer:"valueUpdated"},choices:{type:Number,observer:"choicesUpdated"},label:{type:String},placeholder:{type:String},multiValue:{type:String,value:""},disabled:{type:Boolean,value:!1,reflectToAttribute:!0}}}choicesUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}optionsUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}valueUpdated(){if(this.choices)if(Array.isArray(this.value)&&this.options){const t=this.value.map(t=>-1!==this.options.indexOf(t)?this.options.indexOf(t):this.options.findIndex(e=>e.name===t.name&&e.source===t.source)).filter(t=>-1!==t);this.listBox&&(this.listBox.selectedValues=t),this.multiValue=t.map(t=>{let e=this.options[t];return e.name?e.name:Object(a.util_capitalizeAll)(e)}).join(", ")}else this.listBox&&(this.listBox.selectedValues=[]),this.multiValue="";else this.value&&this.options?this.value.source?this.$.select.value=this.options.findIndex(t=>t.name===this.value.name&&t.source===this.value.source||t===this.value.name)+"":this.value.name?this.$.select.value=this.options.findIndex(t=>t.name===this.value.name||t===this.value.name)+"":this.$.select.value=this.options.findIndex(t=>t.name===this.value||t===this.value)+"":this.$.select.value=""}ready(){super.ready(),setTimeout(async()=>{this.model&&(this.options=await Object(l.b)(this.model)),this.$.select.renderer=(t,e)=>{if(!this.listBox){if(this.listBox=document.createElement("vaadin-list-box"),this.choices&&(this.listBox.setAttribute("multiple",!0),this.listBox.addEventListener("click",t=>{e.opened=!0;let i=null!==t.srcElement.getAttribute("selected");setTimeout(()=>{this.listBox.selectedValues.length>this.choices&&!i&&this.listBox.selectedValues.splice(this.listBox.selectedValues.length-2,1);let t=this.listBox.selectedValues.map(t=>this.options[t]);this.multiValue=t.map(t=>t.name?t.name:Object(a.util_capitalizeAll)(t)).join(", "),this.addCallback&&this.addCallback(t)},0)})),this.options&&this.options.length)for(let t=0;t<this.options.length;t++){const e=this.options[t],i=document.createElement("vaadin-item");e.name?(i.textContent=e.name,i.setAttribute("value",t)):(i.textContent=Object(a.util_capitalizeAll)(e),i.setAttribute("value",t)),this.listBox.appendChild(i)}t.appendChild(this.listBox),this.$.select._assignMenuElement(),this.valueUpdated()}}},0)}connectedCallback(){super.connectedCallback(),this.selectChangeHandler=()=>{const t=this.$.select.value;if(t&&!this.choices){const e=this.options[t];this.addCallback?this.addCallback(e,this.model):Object(s.O)(void 0,e,this.model),this.value||(this.$.select.value="")}},this.$.select.addEventListener("change",this.selectChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),this.$.select.removeEventListener("change",this.selectChangeHandler)}_exists(t){return!!t}_label(t,e){if(t)return e?`${t} (${e})`:t}static get template(){return n.b`
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
      <vaadin-select test$="[[test]]" theme="dark" add id="select" label="[[_label(label, choices)]]" placeholder="[[placeholder]]" disabled$="[[disabled]]">
        <div hidden$="[[!_exists(multiValue)]]" slot="prefix">
          <span class="prefix">[[multiValue]]</span>
        </div>
      </vaadin-select>
    `}}customElements.define("dnd-select-add",o)},122:function(t,e,i){"use strict";i(51),i(50),i(74);const n=i(13).a`<dom-module id="lumo-number-field" theme-for="vaadin-number-field">
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
</dom-module>`;document.head.appendChild(n.content);i(78),i(7),i(30);var s=i(65),a=i(20);
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
const l=document.createElement("template");let o;l.innerHTML='<dom-module id="vaadin-number-field-template">\n  <template>\n    <style>\n      :host([readonly]) [part$="button"] {\n        pointer-events: none;\n      }\n\n      [part="decrease-button"]::before {\n        content: "−";\n      }\n\n      [part="increase-button"]::before {\n        content: "+";\n      }\n\n      [part="decrease-button"],\n      [part="increase-button"] {\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n      }\n\n      /* Hide the native arrow icons */\n      [part="value"]::-webkit-outer-spin-button,\n      [part="value"]::-webkit-inner-spin-button {\n        -webkit-appearance: none;\n        margin: 0;\n      }\n\n      [part="value"] {\n        /* Older Firefox versions (v47.0) requires !important */\n        -moz-appearance: textfield !important;\n      }\n\n      :host([dir="rtl"]) [part="input-field"] {\n        direction: ltr;\n      }\n\n      :host([dir="rtl"]) [part="value"]::placeholder {\n        direction: rtl;\n      }\n\n      :host([dir="rtl"]) [part="input-field"] ::slotted(input)::placeholder {\n        direction: rtl;\n      }\n\n      :host([dir="rtl"]) [part="value"]:-ms-input-placeholder,\n      :host([dir="rtl"]) [part="input-field"] ::slotted(input):-ms-input-placeholder {\n        direction: rtl;\n      }\n\n      :host([dir="rtl"]:not([has-controls])) [part="value"]::placeholder {\n        text-align: left;\n      }\n\n      :host([dir="rtl"]:not([has-controls])) [part="input-field"] ::slotted(input)::placeholder {\n        text-align: left;\n      }\n\n      :host([dir="rtl"]:not([has-controls])) [part="value"]:-ms-input-placeholder,\n      :host([dir="rtl"]:not([has-controls])) [part="input-field"] ::slotted(input):-ms-input-placeholder {\n        text-align: left;\n      }\n    </style>\n\n    <div disabled$="[[!_allowed(-1, value, min, max, step)]]" part="decrease-button" on-click="_decreaseValue" on-touchend="_decreaseButtonTouchend" hidden$="[[!hasControls]]">\n    </div>\n\n    <div disabled$="[[!_allowed(1, value, min, max, step)]]" part="increase-button" on-click="_increaseValue" on-touchend="_increaseButtonTouchend" hidden$="[[!hasControls]]">\n    </div>\n  </template>\n\n  \n</dom-module>',document.head.appendChild(l.content);class r extends s.a{static get is(){return"vaadin-number-field"}static get version(){return"2.6.2"}static get properties(){return{hasControls:{type:Boolean,value:!1,reflectToAttribute:!0},min:{type:Number,reflectToAttribute:!0,observer:"_minChanged"},max:{type:Number,reflectToAttribute:!0,observer:"_maxChanged"},step:{type:Number,value:1,observer:"_stepChanged"}}}ready(){super.ready(),this.__previousValidInput=this.value||"",this.inputElement.type="number",this.inputElement.addEventListener("change",this.__onInputChange.bind(this))}_decreaseButtonTouchend(t){t.preventDefault(),this._decreaseValue()}_increaseButtonTouchend(t){t.preventDefault(),this._increaseValue()}static get template(){if(!o){o=super.template.cloneNode(!0);const t=a.a.import(this.is+"-template","template"),e=t.content.querySelector('[part="decrease-button"]'),i=t.content.querySelector('[part="increase-button"]'),n=t.content.querySelector("style"),s=o.content.querySelector('[part="input-field"]'),l=o.content.querySelector('[name="prefix"]');s.insertBefore(e,l),s.appendChild(i),o.content.appendChild(n)}return o}_createConstraintsObserver(){this._createMethodObserver("_constraintsChanged(required, minlength, maxlength, pattern, min, max, step)")}_constraintsChanged(t,e,i,n,s,a,l){if(!this.invalid)return;const o=t=>!t&&0!==t;o(s)&&o(a)?super._constraintsChanged(t,e,i,n):this.validate()}_decreaseValue(){this._incrementValue(-1)}_increaseValue(){this._incrementValue(1)}_incrementValue(t){if(this.disabled||this.readonly)return;let e=parseFloat(this.value);this.value?e<this.min?(t=0,e=this.min):e>this.max&&(t=0,e=this.max):0==this.min&&t<0||0==this.max&&t>0||0==this.max&&0==this.min?(t=0,e=0):(null==this.max||this.max>=0)&&(null==this.min||this.min<=0)?e=0:this.min>0?(e=this.min,this.max<0&&t<0&&(e=this.max),t=0):this.max<0&&(e=this.max,t<0?t=0:this._getIncrement(1,e-this.step)>this.max?e-=2*this.step:e-=this.step);const i=this._getIncrement(t,e);this.value&&0!=t&&!this._incrementIsInsideTheLimits(t,e)||this._setValue(i)}_setValue(t){this.value=this.inputElement.value=String(parseFloat(t)),this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}_getIncrement(t,e){let i=this.step||1,n=this.min||0;const s=Math.max(this._getMultiplier(e),this._getMultiplier(i),this._getMultiplier(n));i*=s,n*=s;const a=((e=Math.round(e*s))-n)%i;return t>0?(e-a+i)/s:t<0?(e-(a||i))/s:e/s}_getDecimalCount(t){const e=String(t),i=e.indexOf(".");return-1===i?1:e.length-i-1}_getMultiplier(t){if(!isNaN(t))return Math.pow(10,this._getDecimalCount(t))}_incrementIsInsideTheLimits(t,e){return t<0?null==this.min||this._getIncrement(t,e)>=this.min:t>0?null==this.max||this._getIncrement(t,e)<=this.max:this._getIncrement(t,e)<=this.max&&this._getIncrement(t,e)>=this.min}_allowed(t){const e=t*(this.step||1),i=parseFloat(this.value);return!this.value||!this.disabled&&this._incrementIsInsideTheLimits(e,i)}_stepChanged(t){this.__validateByStep=this.__stepChangedCalled||null!==this.getAttribute("step"),this.inputElement.step=this.__validateByStep?t:"any",this.__stepChangedCalled=!0,this.setAttribute("step",t)}_minChanged(t){this.inputElement.min=t}_maxChanged(t){this.inputElement.max=t}_valueChanged(t,e){t&&isNaN(parseFloat(t))?this.value="":"string"!=typeof this.value&&(this.value=String(this.value)),super._valueChanged(this.value,e)}_onKeyDown(t){38==t.keyCode?(t.preventDefault(),this._increaseValue()):40==t.keyCode&&(t.preventDefault(),this._decreaseValue()),super._onKeyDown(t)}__onInputChange(){this.validate()}checkValidity(){return void 0!==this.min||void 0!==this.max||this.__validateByStep?this.inputElement.checkValidity():super.checkValidity()}}window.customElements.define(r.is,r);
/**
@license
Copyright (c) 2019 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
const d=document.createElement("template");d.innerHTML='<dom-module id="vaadin-integer-field-template">\n\n  \n</dom-module>',document.head.appendChild(d.content);class c extends r{static get is(){return"vaadin-integer-field"}static get version(){return"2.6.2"}static get properties(){return{pattern:String,preventInvalidInput:Boolean,minlength:Number,maxlength:Number}}ready(){super.ready(),this._enabledCharPattern="[-+\\d]"}_valueChanged(t,e){if(""!==t&&!this.__isInteger(t))return console.warn(`Trying to set non-integer value "${t}" to <vaadin-integer-field>. Clearing the value.`),void(this.value="");super._valueChanged(t,e)}_stepChanged(t,e){if(!this.__hasOnlyDigits(t))return console.warn(`Trying to set invalid step size "${t}", which is not a positive integer, to <vaadin-integer-field>. Resetting the default value 1.`),void(this.step=1);super._stepChanged(t,e)}__isInteger(t){return/^(-\d)?\d*$/.test(String(t))}__hasOnlyDigits(t){return/^\d*$/.test(String(t))}}window.customElements.define(c.is,c)},129:function(t,e,i){"use strict";i.r(e);var n=i(7),s=(i(122),i(120),i(115),i(112),i(17)),a=i(111),l=i(1),o=i(73);class r extends n.a{static get properties(){return{str:{type:Number},dex:{type:Number},con:{type:Number},int:{type:Number},wis:{type:Number},cha:{type:Number},strAdj:{type:Number,value:0},dexAdj:{type:Number,value:0},conAdj:{type:Number,value:0},intAdj:{type:Number,value:0},wisAdj:{type:Number,value:0},chaAdj:{type:Number,value:0},attributeProfs:{type:String,value:""},saves:{type:Array,value:[]},classSkillProfOptions:{type:Object,value:{}},backgroundSkillProfOptions:{type:Object,value:[]},defaultBackgroundSkillProf:{type:String,value:""},raceAttributeOptions:{type:Object,value:[]},defaultRaceAttribute:{type:String,value:""},maxHP:{type:Number},tempHP:{type:Number,value:0},isEditMode:{type:Boolean,value:!1},initiative:{type:String,value:""},customInitiative:{type:Boolean,value:!1},customInitiativeVal:{type:Number},customACVal:{type:Number}}}static get observers(){return["updateCharAttr(str, dex, con, int, wis, cha)","updateCustomInitiative(customInitiativeVal)","updateCustomAC(customACVal)"]}updateCharAttr(t,e,i,n,a,l){t&&e&&i&&n&&a&&l&&Object(s.vb)({str:t,dex:e,con:i,int:n,wis:a,cha:l})}updateCustomInitiative(t){void 0!==t&&""!==t&&Object(s.gb)(t)}updateCustomAC(t){void 0!==t&&""!==t&&Object(s.fb)(t)}hpChangeHandler(t){this.$.hpField.focusElement.blur()}hpBlurHandler(t){const e=parseInt(this.$.hpField.value);Number.isNaN(e)?this.$.hpField.value=s.u:Object(s.eb)(e)}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=t=>{let e=t.detail.character;this.updateAttributesFromCharacter(e)},this.updateAttributesFromCharacter(Object(s.F)()),Object(s.l)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=t=>{this.isEditMode=t.detail.isEditMode},Object(a.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(a.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(s.l)().removeEventListener("character-selected",this.characterChangeHandler),Object(a.b)().removeEventListener("editModeChange",this.editModeHandler)}async updateAttributesFromCharacter(t){if(t&&t.attr){const e=t.attr;e.str===this.str&&e.dex===this.dex&&e.con===this.con&&e.int===this.int&&e.wis===this.wis&&e.cha===this.cha||this.setProperties({str:t.attr.str,dex:t.attr.dex,con:t.attr.con,int:t.attr.int,wis:t.attr.wis,cha:t.attr.cha}),this.saves=await Object(s.s)();let i=await Object(s.h)(),n=await Object(s.E)();n&&n.choose?(this.raceAttributeOptions=n.choose.from.map(t=>t.toUpperCase()),this.raceAttributeChoices=n.choose.count||1,this.raceAttributeSelections=t.raceAttributes):(this.raceAttributeOptions=void 0,this.raceAttributeChoices=void 0,this.raceAttributeSelections=void 0);let a=await Object(s.D)(n);this.defaultRaceAttribute=a.map(t=>{let e=t[0].toLowerCase(),i=t[1];return e.toUpperCase()+" "+Object(l.absInt)(i)}).join(", "),this.strAdj=i.str,this.dexAdj=i.dex,this.conAdj=i.con,this.intAdj=i.int,this.wisAdj=i.wis,this.chaAdj=i.cha,this.attributeProfs=(await Object(s.G)()).join(","),this.maxHP=await Object(s.C)(),this.currentHP=await Object(s.u)(),this.tempHP=await Object(s.K)(),this.hitDice=await Object(s.z)(),this.customAC=!!t.customAC,this.customACVal=t.customACVal,this.ac=await Object(s.k)(),this.customInitiative=!!t.customInitiative,this.customInitiativeVal=t.customInitiativeVal,this.initiative=await Object(s.m)(),this.speed=await Object(s.o)(),this.proficiencyBonus=await Object(s.n)(),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}}_adjustString(t){return 0!==t&&void 0!==t?Object(l.absInt)(t):""}_total(t,e){let i=parseInt(t),n=parseInt(e);return i=isNaN(i)?0:i,n=isNaN(n)?0:n,i+n}_mod(t,e){return Object(l.absInt)(Math.floor((this._total(t,e)-10)/2))}_contains(t,e){return t.indexOf(e)>-1}_exists(){for(let t of arguments)if(t&&(t.constructor!==Object||Object.entries(t).length>0)&&(!Array.isArray(t)||t.length>0))return!0;return!1}_editModeClass(t){return t?"edit-mode":"not-edit-mode"}_tempHpStr(t){return t&&"number"==typeof t&&t>0?" + "+t:""}_toggleButtonField(t){const e=t.target.closest(".btn-field"),i=e.classList.contains("btn-field--open"),n=e.classList.contains("btn-field--temp"),a=e.querySelector("vaadin-integer-field"),l=e.querySelector("dnd-button");if(e.classList.toggle("btn-field--open"),l.classList.toggle("icon-only"),n)if(i){const t=parseInt(a.value);t&&(Object(s.c)(parseInt(this.tempHP)+t),a.value="")}else a.focus();else if(i){const t=parseInt(a.value);if(t){const i=e.classList.contains("btn-field--heal")?1:-1;Object(s.eb)(parseInt(this.currentHP)+i*t),a.value=""}}else a.focus()}_submitButtonField(t){"Enter"===t.key&&this._toggleButtonField(t)}_blurButtonField(t){this._toggleButtonField(t)}_useHitDice(t){const e=t.target.closest(".hit-dice__item");if(this.currentHP<this.maxHP){const t=e.dataset.className;Object(s.xb)(t)}else e.classList.add("hit-dice__item--error"),setTimeout(()=>{e.classList.remove("hit-dice__item--error")},500)}_strContains(t,e){return t.indexOf(e)>-1}_resetHitDice(t){Object(s.V)()}_roll(t){if(!this.isEditMode){const e=Object(l.findInPath)(".proficiency-item",t),i=Object(l.findInPath)(".stat-box",t),n=Object(l.findInPath)(".initiative",t);let s,a,r;if(e?(a=e.hasAttribute("enabled"),s=parseInt(e.closest(".attribute-wrap").querySelector(".stat-box__mod").innerText,10),r=e.innerText):i?(a=i.querySelector(".stat-box__save").hasAttribute("enabled"),s=parseInt(i.querySelector(".stat-box__mod").innerText,10),r=i.querySelector("vaadin-integer-field").label+" Save"):n&&(a=!1,s=this.customInitiative?this.customInitiativeVal:parseInt(this.initiative,10),r="Initiative"),r){let t="1d20";a&&(s+=this.proficiencyBonus),s>0?t+="+"+s:s<0&&(t+=s),Object(o.b)(r,t)}}}_swapCustomInitiative(t){Object(s.rb)()}_swapCustomAC(t){Object(s.qb)()}_plusMinus(t){if(t&&t>0)return"+"}_triggerShortRest(t){}_triggerLongRest(t){}static get template(){return n.b`
      <style include="material-styles">
        :host {
          display: block;
          padding: 14px;
        }

        [hidden] {
          visibility: hidden;
        }

        .wrap {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-bottom: 50px;
        }

        .stats {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .attribute-wrap {
          display: flex;
          flex-direction: row;
          min-width: 0;
        }
        .health-wrap {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          min-width: 0;
          flex-shrink: 0;
          justify-content: space-between;
          margin-bottom: 16px;      
        }
        .health-wrap > div {
          width: calc(33% - 8px);
          max-width: 120px;
        }
        .health-wrap > * {
          margin-bottom: 16px;
        }


        /* Proficiencies */
        .proficiencies {
          margin-left: 8px;
          line-height: 1.4;
          min-width: 0;
          position: relative;
          top: -2px;
        }
        .proficiency-item {
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          position: relative;
          cursor: pointer;
        }

        .proficiency-item::before,
        .proficiency-item[expertise]::after {
          content: '';
          display: inline-block;
          height: 10px;
          width: 10px;
          border: 1px solid var(--mdc-theme-primary);
          border-radius: 50%;
          background-color: transparent;
          margin-right: 8px;
          position: relative;
          top: 1px;
          box-shadow: 0px 0px 10px -4px rgba(0,0,0,0.75);
        }
        .proficiency-item[expertise]::after {
          position: absolute;
          left: 10px;
          top: 5px;
          margin-right: 0;
          background-color: var(--mdc-theme-primary);
        }
        .proficiency-item[expertise]::before {
          margin-right: 14px;
        }
        .proficiency-item[enabled]::before {
          background-color: var(--mdc-theme-primary);
        }


        /* Stat Box */
        .stat-box {
          cursor: pointer;
          position: relative;
          display: inline-flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: var(--lumo-contrast-10pct);
          border-radius: 4px;
        }
        .stat-box:not(:last-child) {
          margin-bottom:16px;
        }
        .stat-box__save {
          position: absolute;
          height: 12px;
          width: 12px;
          border: 2px solid var(--mdc-theme-primary);
          border-radius: 50%;
          top: -8px;
          background-color: #33383C;
          display: none;
        }
        .stat-box__save[enabled] {
          background-color: var(--mdc-theme-primary);
          display: block;
        }
        .stat-box__mod {
          font-size: 32px;
          font-weight: normal;
          margin: 8px 8px 2px;
          line-height: 1;
          position: relative;
          left: 1px;
        }
        .stat-box__footer {
          display: inline-block;
        }
        .stat-box__adj {
          position: relative;
          right: 0px;
        }
        .not-edit-mode .stat-box__adj {
          right: 15px;
          color: var(--lumo-body-text-color);
          -webkit-text-fill-color: var(--lumo-body-text-color);
        }
        .stat-box__side {
          padding: 8px 0;
        }

        /* Stat Box HP  */
        .stat-box--hp {
          width: calc(66% - 2px) !important;
          max-width: 236px !important;
          flex-direction: row;
          min-width: 160px;
          justify-content: space-between;
          flex-wrap: wrap;
          height: fit-content;
        }
        .stat-box__total {
          font-size: 14px;
        }
        .stat-box--hp .stat-box__adj--hp {
          position: absolute;
          bottom: -10px;
          right: 5px;
          font-size: 16px;
        }
        .stat-box--hp .stat-box__footer {
          width: 100%;
        }
        .stat-box__side {
            flex-wrap: wrap;
            justify-content: space-between;
            width: 100%;
            margin: 8px;
        }
        .stat-box--hp .btn-field {
          margin-top: 12px;
          width: auto;
        }

        .stat-box--hp .btn-field:not(:last-child) {
          margin-bottom: 0px
        }
        .stat-box__side {
          max-width: 80px;
          margin: 0 8px 0 0;
        }
        .stat-box--hp .btn-field {
          margin-top: 0;
          width: 100%;
        }
        .stat-box--hp .btn-field:not(:last-child) {
          margin-bottom: 12px
        }
        




        /* Button Field */
        .btn-field {
          display: inline-flex;
          flex-direction: row;
          flex-wrap: nowrap;
          width: 100%;
          height: 36px;
          background: var(--lumo-contrast-10pct);
          border-radius: 4px;
        }
        .btn-field:not(:last-child){
          margin-bottom: 12px;
        }
        .btn-field__btn {
          display: block;
          width: 100%;
        }
        .btn-field__input {
          display: none;
        }
        .btn-field .btn-field__btn-label {
          display: none;
        }
        .btn-field--open .btn-field__btn {
          width: calc(100% - 50px);
        }
        .btn-field--open .btn-field__btn-label {
          width: 0;
          overflow: hidden;
        }
        .btn-field--open .btn-field__input {
          display: block;
          width: 50px;
          margin-top: -40px;
        }
        .btn-field--heal.btn-field--open .btn-field__btn-label {
          margin-left: -8px;
        }
        .btn-field vaadin-integer-field {
          --lumo-contrast-10pct: transparent;
        }
        .btn-field__btn-label--temp,
        .btn-field__btn-label--damage {
          font-size: 12px;
        }
        .btn-field--heal dnd-button {
          --mdc-theme-primary: #83f675;
        }
        .btn-field--dmg dnd-button {
          --mdc-theme-primary: #f83c42;
        }
        .btn-field--temp dnd-button {
          --mdc-theme-primary: #2069c9;
        }


        /* Hit Dice */
        .hit-dice {
          display: flex;
          flex-direction: column;
          border-radius: 4px;
          padding: 6px 0 0;
          background: var(--lumo-contrast-10pct);
          margin-bottom: 16px;
        }
        .hit-dice__heading {
          display: inline-block;
          text-align: center;
          margin-bottom: 8px;
          color: var(--mdc-theme-primary);
          text-transform: uppercase;
          font-size: 14px;
        }
        .hit-dice__item {
          width: 100%;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
        }
        .hit-dice__item dnd-button {
          width: 100%;
        }
        .hit-dice__item--error dnd-button {
          --mdc-theme-primary: var(--lumo-error-color-50pct);
        }
        .hit-dice__item-label {
          width: 100%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 4px 0 0;
        }
        .hit-dice__item-label dnd-svg {
          stroke: var(--mdc-theme-on-primary);
          fill: var(--mdc-theme-primary);
          width: 30px;
        }
        .hit-dice__reset {
          margin-top: auto;
        }

        .basic-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 4px 0;
          background: var(--lumo-contrast-10pct);
          border-radius: 4px;
          height: min-content;
        }
        .basic-box--short {
          height: fit-content;
        }
        .basic-box__label {
          color: var(--mdc-theme-primary);
          font-size: 14px;
        }
        .basic-box__value {
          font-size: 18px;
          width: 100%;
          display: flex;
          flex-direction: column;
          text-align: center;
        }
        .not-edit-mode .initiative {
          cursor: pointer;
        }

        .custom-val__swap {
          font-size: 10px;
          margin: -4px 0 8px auto;
          background-color: var(--lumo-contrast-10pct);
          padding: 5px 5px 4px;
          line-height: 1;
          border-radius: 4px;
          cursor: pointer;
        }

        /* Rest Buttons */
        .rest-btn {
          margin-bottom: 16px;
        }

        @media(min-width: 420px) {
          .wrap {
            padding-bottom: 0;
          }
        }
      </style>

      <div class$="[[_editModeClass(isEditMode)]]">
        <div class="wrap">
          <div class="health-wrap">
            <!-- Hit Points -->
            <div class="stat-box stat-box--hp">
              <vaadin-integer-field id="hpField" theme="hp" value={{currentHP}} on-change="hpBlurHandler" on-blur="hpChangeHandler" min="0" max="[[maxHP]]" has-controls label="Hit Points">
                <span class="stat-box__adj--hp" slot="suffix">/ [[maxHP]] [[_tempHpStr(tempHP)]]</span>
              </vaadin-integer-field>
              <div class="stat-box__side">
                <!--  Healing / Damage -->
                <div class="btn-field btn-field--heal">
                    <dnd-button icon="favorite" background="none" class="btn-field__btn" on-click="_toggleButtonField"></dnd-button>
                    <vaadin-integer-field class="btn-field__input" min="0" on-keydown="_submitButtonField" on-blur="_blurButtonField">
                      <span slot="prefix">+</span>
                    </vaadin-integer-field>
                </div>
                <div class="btn-field btn-field--dmg">
                    <dnd-button svg="swords" background="none" class="btn-field__btn" on-click="_toggleButtonField"></dnd-button>
                    <vaadin-integer-field class="btn-field__input" min="0" on-keydown="_submitButtonField" on-blur="_blurButtonField">
                      <span slot="prefix">-</span>
                    </vaadin-integer-field>
                </div>
                <div class="btn-field btn-field--temp">
                    <dnd-button svg="paladin" background="none" class="btn-field__btn" on-click="_toggleButtonField"></dnd-button>
                    <vaadin-integer-field class="btn-field__input" min="0" on-keydown="_submitButtonField" on-blur="_blurButtonField">
                      <span slot="prefix">+</span>
                    </vaadin-integer-field>
                </div>
              </div>
            </div>


            <!--  Hit Dice -->
            <div class="hit-dice">
              <div class="hit-dice__heading">Hit Dice</div>
              <template is="dom-repeat" items="[[hitDice]]">
                <div class="hit-dice__item" data-class-name$="[[item.className]]">
                  <dnd-button on-click="_useHitDice">
                    <div class="hit-dice__item-label" slot="label">
                      <dnd-svg id="[[item.die]]"></dnd-svg>
                      <div class="hit-dice__count">[[item.current]] / [[item.total]]</div>
                    </div>
                  </dnd-button>
                </div>
              </template>
              <dnd-button class="hit-dice__reset" label="Reset" on-click="_resetHitDice"></dnd-button>
            </div>

            <div class="basic-box basic-box--short ac">
              <div class="basic-box__value">
                <div class="custom-val__swap" on-click="_swapCustomAC" hidden$=[[!isEditMode]]>
                  <span hidden$=[[customAC]]>Standard</span>
                  <span hidden$=[[!customAC]]>Custom</span>
                </div>

                <div hidden$=[[!customAC]]>
                  <vaadin-integer-field theme="mini" value={{customACVal}} min="0" max="40" has-controls hidden$="[[!isEditMode]]"></vaadin-integer-field>
                  <div hidden$="[[isEditMode]]">[[customACVal]]</div>
                </div>
                <div hidden$=[[customAC]]>[[ac]]</div>
              </div>
              <div class="basic-box__label">AC</div>
            </div>

            <div class="basic-box basic-box--short initiative" on-click="_roll">
              <div class="basic-box__value">
                <div class="custom-val__swap" on-click="_swapCustomInitiative" hidden$=[[!isEditMode]]>
                  <span hidden$=[[customInitiative]]>Standard</span>
                  <span hidden$=[[!customInitiative]]>Custom</span>
                </div>

                <div hidden$=[[!customInitiative]]>
                  <vaadin-integer-field theme="mini" value={{customInitiativeVal}} min="-20" max="20" has-controls hidden$="[[!isEditMode]]"></vaadin-integer-field>
                  <div hidden$="[[isEditMode]]">[[_plusMinus(customInitiativeVal)]][[customInitiativeVal]]</div>
                </div>
                <div hidden$=[[customInitiative]]>[[initiative]]</div>
              </div>
              <div class="basic-box__label">Initiative</div>
            </div>

            <div class="basic-box basic-box--short speed">
              <div class="basic-box__value" inner-h-t-m-l=[[speed]]></div>
              <div class="basic-box__label">Speed</div>
            </div>

            <!--  Short Rest -->
            <!-- <dnd-button icon="watch" class="rest-btn rest-btn--short" background="var(--lumo-contrast-10pct)" label="Short" on-click="_triggerShortRest"></dnd-button> -->

            <!--  Long Rest -->
            <!-- <dnd-button icon="watch_later" class="rest-btn rest-btn--long" background="var(--lumo-contrast-10pct)" label="Long" on-click="_triggerLongRest"></dnd-button> -->

            
          </div>

          <div class="stats">
            <!--  Attributes -->
            <div class="attribute-wrap">
              <div class="stat-box" on-click="_roll">
                <div class="stat-box__save" enabled$="[[_contains(saves, 'str')]]"></div>
                <div class="stat-box__mod">[[_mod(strAdj, str)]]</div>
                <div class="stat-box__footer">
                  <vaadin-integer-field theme="mini" value={{str}} min="1" max="20" has-controls label="Strength" disabled$="[[!isEditMode]]">
                    <span class="stat-box__adj" slot="suffix">[[_adjustString(strAdj)]]</span>
                  </vaadin-integer-field>
                </div>
              </div>
              <div class="proficiencies">
                <div class="proficiency-item" on-click="_roll" enabled$="[[_strContains(attributeProfs, 'athletics')]]">Athletics</div>
              </div>
            </div>
            <div class="attribute-wrap">
              <div class="stat-box" on-click="_roll">
                <div class="stat-box__save" enabled$="[[_contains(saves, 'dex')]]"></div>
                <div class="stat-box__mod">[[_mod(dexAdj, dex)]]</div>
                <div class="stat-box__footer">
                  <vaadin-integer-field theme="mini" value={{dex}} min="1" max="20" has-controls label="Dexterity" disabled$="[[!isEditMode]]">
                    <span class="stat-box__adj" slot="suffix">[[_adjustString(dexAdj)]]</span>
                  </vaadin-integer-field>
                </div>
              </div>
              <div class="proficiencies">
                <div class="proficiency-item" on-click="_roll" enabled$="[[_strContains(attributeProfs, 'acrobatics')]]">Acrobatics</div>
                <div class="proficiency-item" on-click="_roll" enabled$="[[_strContains(attributeProfs, 'sleight of hand')]]">Sleight of Hand</div>
                <div class="proficiency-item" on-click="_roll" enabled$="[[_strContains(attributeProfs, 'stealth')]]">Stealth</div>
              </div>
            </div>
            <div class="attribute-wrap">
              <div class="stat-box" on-click="_roll">
                <div class="stat-box__save" enabled$="[[_contains(saves, 'con')]]"></div>
                <div class="stat-box__mod">[[_mod(conAdj, con)]]</div>
                <div class="stat-box__footer">
                  <vaadin-integer-field theme="mini" value={{con}} min="1" max="20" has-controls label="Constitution" disabled$="[[!isEditMode]]">
                    <span class="stat-box__adj" slot="suffix">[[_adjustString(conAdj)]]</span>
                  </vaadin-integer-field>
                </div>
              </div>
              <div class="proficiencies">
              
              </div>
            </div>
            <div class="attribute-wrap">
              <div class="stat-box" on-click="_roll">
                <div class="stat-box__save" enabled$="[[_contains(saves, 'int')]]"></div>
                <div class="stat-box__mod">[[_mod(intAdj, int)]]</div>
                <div class="stat-box__footer">
                  <vaadin-integer-field theme="mini" value={{int}} min="1" max="20" has-controls label="Intellegence" disabled$="[[!isEditMode]]">
                    <span class="stat-box__adj" slot="suffix">[[_adjustString(intAdj)]]</span>
                  </vaadin-integer-field>
                </div>
              </div>
              <div class="proficiencies">
                <div class="proficiency-item" on-click="_roll" enabled$="[[_strContains(attributeProfs, 'arcana')]]">Arcana</div>
                <div class="proficiency-item" on-click="_roll" enabled$="[[_strContains(attributeProfs, 'history')]]">History</div>
                <div class="proficiency-item" on-click="_roll" enabled$="[[_strContains(attributeProfs, 'investigation')]]">Investigation</div>
                <div class="proficiency-item" on-click="_roll" enabled$="[[_strContains(attributeProfs, 'nature')]]">Nature</div>
                <div class="proficiency-item" on-click="_roll" enabled$="[[_strContains(attributeProfs, 'religion')]]">Religion</div>
              </div>
            </div>
            <div class="attribute-wrap">
              <div class="stat-box" on-click="_roll">
                <div class="stat-box__save" enabled$="[[_contains(saves, 'wis')]]"></div>
                <div class="stat-box__mod">[[_mod(wisAdj, wis)]]</div>
                <div class="stat-box__footer">
                  <vaadin-integer-field theme="mini" value={{wis}} min="1" max="20" has-controls label="Wisdom" disabled$="[[!isEditMode]]">
                    <span class="stat-box__adj" slot="suffix">[[_adjustString(wisAdj)]]</span>
                  </vaadin-integer-field>
                </div>
              </div>
              <div class="proficiencies">
                <div class="proficiency-item" on-click="_roll" enabled$="[[_strContains(attributeProfs, 'animal handling')]]">Animal Handling</div>
                <div class="proficiency-item" on-click="_roll" enabled$="[[_strContains(attributeProfs, 'insight')]]">Insight</div>
                <div class="proficiency-item" on-click="_roll" enabled$="[[_strContains(attributeProfs, 'medicine')]]">Medicine</div>
                <div class="proficiency-item" on-click="_roll" enabled$="[[_strContains(attributeProfs, 'perception')]]">Perception</div>
                <div class="proficiency-item" on-click="_roll" enabled$="[[_strContains(attributeProfs, 'survival')]]">Survival</div>
              </div>
            </div>
            <div class="attribute-wrap">
              <div class="stat-box" on-click="_roll">
                <div class="stat-box__save" enabled$="[[_contains(saves, 'cha')]]"></div>
                <div class="stat-box__mod">[[_mod(chaAdj, cha)]]</div>
                <div class="stat-box__footer">
                  <vaadin-integer-field theme="mini" value={{cha}} min="1" max="20" has-controls label="Charisma" disabled$="[[!isEditMode]]">
                    <span class="stat-box__adj" slot="suffix">[[_adjustString(chaAdj)]]</span>
                  </vaadin-integer-field>
                </div>
              </div>
              <div class="proficiencies">
                <div class="proficiency-item" on-click="_roll" enabled$="[[_strContains(attributeProfs, 'deception')]]">Deception</div>
                <div class="proficiency-item" on-click="_roll" enabled$="[[_strContains(attributeProfs, 'intimidation')]]">Intimidation</div>
                <div class="proficiency-item" on-click="_roll" enabled$="[[_strContains(attributeProfs, 'performance')]]">Performance</div>
                <div class="proficiency-item" on-click="_roll" enabled$="[[_strContains(attributeProfs, 'persuasion')]]">Persuasion</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `}}customElements.define("dnd-character-builder-attributes",r)}}]);
//# sourceMappingURL=9.bundle.js.map