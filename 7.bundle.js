(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{109:function(e,t,i){"use strict";var n=i(7),a=i(69);i(79),i(125);class o extends n.a{static get properties(){return{label:{type:String,value:""},icon:{type:String,value:""},svg:{type:String,value:""},background:{type:String,value:""},border:{type:String,value:""},svgFill:{type:String,value:""},svgStroke:{type:String,value:""}}}connectedCallback(){setTimeout(()=>{this.button=new a.a(this.$.button)},10)}_exists(e){return!!e}_styleStr(e,t,i){let n="";return e&&(n+=`background: ${e}; `),t&&(n+=`border: ${t}; `),n}_svgStyleStr(e,t){let i="";return e&&(i+=`fill: ${e}; `),t&&(i+=`stroke: ${t}; `),i}static get template(){return n.b`
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

        :host([edit-mode]) button {
          background-color: var(--mdc-theme-secondary);
          color: var(--mdc-theme-on-secondary)
        }
        :host([edit-mode]) .mdc-button__label {
          color: var(--mdc-theme-on-primary);
        }
        :host([edit-mode]) i {
          color: var(--mdc-theme-on-primary);
        }
        :host([edit-mode]) button:hover i,
        :host([edit-mode]) button:hover .mdc-button__label {
          color: var(--mdc-theme-on-secondary);
        }

        :host([not-edit-mode]) button {
          background-color: var(--mdc-theme-primary);
          color: var(--mdc-theme-on-primary);
        }
        :host([not-edit-mode]) .mdc-button__label {
          color: var(--mdc-theme-on-primary);
        }
        :host([not-edit-mode]) i {
          color: var(--mdc-theme-on-primary);
        }
        :host([not-edit-mode]) button:hover i,
        :host([not-edit-mode]) button:hover .mdc-button__label {
          color: var(--mdc-theme-on-primary);
        }

      </style>
      <button id="button" class="mdc-button" style$="[[_styleStr(background, border, label)]]">
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
    `}}customElements.define("dnd-button",o)},128:function(e,t,i){"use strict";var n=i(7),a=i(53),o=i(19),r=i(54),l=i(42),s=i(13);
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
class d extends(Object(l.a)(Object(r.a)(Object(o.a)(Object(a.a)(n.a))))){static get template(){return s.a`
    <style>
      :host {
        display: inline-block;
      }

      :host([hidden]) {
        display: none !important;
      }

      label {
        display: inline-flex;
        align-items: baseline;
        outline: none;
      }

      [part="checkbox"] {
        position: relative;
        display: inline-block;
        flex: none;
      }

      input[type="checkbox"] {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: inherit;
        margin: 0;
      }

      :host([disabled]) {
        -webkit-tap-highlight-color: transparent;
      }
    </style>

    <label>
      <span part="checkbox">
        <input type="checkbox" checked="{{checked::change}}" disabled\$="[[disabled]]" indeterminate="{{indeterminate::change}}" role="presentation" tabindex="-1">
      </span>

      <span part="label">
        <slot></slot>
      </span>
    </label>
`}static get is(){return"vaadin-checkbox"}static get version(){return"2.5.0"}static get properties(){return{checked:{type:Boolean,value:!1,notify:!0,observer:"_checkedChanged",reflectToAttribute:!0},indeterminate:{type:Boolean,notify:!0,observer:"_indeterminateChanged",reflectToAttribute:!0,value:!1},value:{type:String,value:"on"},_nativeCheckbox:{type:Object}}}constructor(){super(),this.name}get name(){return this.checked?this._storedName:""}set name(e){this._storedName=e}ready(){super.ready(),this.setAttribute("role","checkbox"),this._nativeCheckbox=this.shadowRoot.querySelector('input[type="checkbox"]'),this.addEventListener("click",this._handleClick.bind(this)),this._addActiveListeners();const e=this.getAttribute("name");e&&(this.name=e),this.shadowRoot.querySelector('[part~="label"]').querySelector("slot").addEventListener("slotchange",this._updateLabelAttribute.bind(this)),this._updateLabelAttribute()}_updateLabelAttribute(){const e=this.shadowRoot.querySelector('[part~="label"]'),t=e.firstElementChild.assignedNodes();this._isAssignedNodesEmpty(t)?e.setAttribute("empty",""):e.removeAttribute("empty")}_isAssignedNodesEmpty(e){return 0===e.length||1==e.length&&e[0].nodeType==Node.TEXT_NODE&&""===e[0].textContent.trim()}_checkedChanged(e){this.indeterminate?this.setAttribute("aria-checked","mixed"):this.setAttribute("aria-checked",Boolean(e))}_indeterminateChanged(e){e?this.setAttribute("aria-checked","mixed"):this.setAttribute("aria-checked",this.checked)}_addActiveListeners(){this._addEventListenerToNode(this,"down",e=>{this.__interactionsAllowed(e)&&this.setAttribute("active","")}),this._addEventListenerToNode(this,"up",()=>this.removeAttribute("active")),this.addEventListener("keydown",e=>{this.__interactionsAllowed(e)&&32===e.keyCode&&(e.preventDefault(),this.setAttribute("active",""))}),this.addEventListener("keyup",e=>{this.__interactionsAllowed(e)&&32===e.keyCode&&(e.preventDefault(),this._toggleChecked(),this.removeAttribute("active"),this.indeterminate&&(this.indeterminate=!1))})}get focusElement(){return this.shadowRoot.querySelector("input")}__interactionsAllowed(e){return!this.disabled&&"a"!==e.target.localName}_handleClick(e){this.__interactionsAllowed(e)&&(this.indeterminate?(this.indeterminate=!1,e.preventDefault(),this._toggleChecked()):e.composedPath()[0]!==this._nativeCheckbox&&(e.preventDefault(),this._toggleChecked()))}_toggleChecked(){this.checked=!this.checked,this.dispatchEvent(new CustomEvent("change",{composed:!1,bubbles:!0}))}}customElements.define(d.is,d)},133:function(e,t,i){"use strict";i(45),i(34);const n=i(13).a`<dom-module id="lumo-checkbox" theme-for="vaadin-checkbox">
  <template>
    <style include="lumo-checkbox-style lumo-checkbox-effects">
      /* IE11 only */
      ::-ms-backdrop,
      [part="checkbox"] {
        line-height: 1;
      }
    </style>
  </template>
</dom-module><dom-module id="lumo-checkbox-style">
  <template>
    <style>
      :host {
        -webkit-tap-highlight-color: transparent;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: default;
        outline: none;
      }

      [part="label"]:not([empty]) {
        margin: 0.1875em 0.875em 0.1875em 0.375em;
      }

      [part="checkbox"] {
        width: calc(1em + 2px);
        height: calc(1em + 2px);
        margin: 0.1875em;
        position: relative;
        border-radius: var(--lumo-border-radius-s);
        background-color: var(--lumo-contrast-20pct);
        transition: transform 0.2s cubic-bezier(.12, .32, .54, 2), background-color 0.15s;
        pointer-events: none;
        line-height: 1.2;
      }

      :host([indeterminate]) [part="checkbox"],
      :host([checked]) [part="checkbox"] {
        background-color: var(--lumo-primary-color);
      }

      /* Needed to align the checkbox nicely on the baseline */
      [part="checkbox"]::before {
        content: "\\2003";
      }

      /* Checkmark */
      [part="checkbox"]::after {
        content: "";
        display: inline-block;
        width: 0;
        height: 0;
        border: 0 solid var(--lumo-primary-contrast-color);
        border-width: 0.1875em 0 0 0.1875em;
        box-sizing: border-box;
        transform-origin: 0 0;
        position: absolute;
        top: 0.8125em;
        left: 0.5em;
        transform: scale(0.55) rotate(-135deg);
        opacity: 0;
      }

      :host([checked]) [part="checkbox"]::after {
        opacity: 1;
        width: 0.625em;
        height: 1.0625em;
      }

      /* Indeterminate checkmark */

      :host([indeterminate]) [part="checkbox"]::after {
        transform: none;
        opacity: 1;
        top: 45%;
        height: 10%;
        left: 22%;
        right: 22%;
        width: auto;
        border: 0;
        background-color: var(--lumo-primary-contrast-color);
        transition: opacity 0.25s;
      }

      /* Focus ring */

      :host([focus-ring]) [part="checkbox"] {
        box-shadow: 0 0 0 3px var(--lumo-primary-color-50pct);
      }

      /* Disabled */

      :host([disabled]) {
        pointer-events: none;
        color: var(--lumo-disabled-text-color);
      }

      :host([disabled]) [part="label"] ::slotted(*) {
        color: inherit;
      }

      :host([disabled]) [part="checkbox"] {
        background-color: var(--lumo-contrast-10pct);
      }

      :host([disabled]) [part="checkbox"]::after {
        border-color: var(--lumo-contrast-30pct);
      }

      :host([indeterminate][disabled]) [part="checkbox"]::after {
        background-color: var(--lumo-contrast-30pct);
      }

      /* RTL specific styles */

      :host([dir="rtl"]) [part="label"]:not([empty]) {
        margin: 0.1875em 0.375em 0.1875em 0.875em;
      }
    </style>
  </template>
</dom-module><dom-module id="lumo-checkbox-effects">
  <template>
    <style>
      /* Transition the checkmark if activated with the mouse (disabled for grid select-all this way) */
      :host(:hover) [part="checkbox"]::after {
        transition: width 0.1s, height 0.25s;
      }

      /* Used for activation "halo" */
      [part="checkbox"]::before {
        color: transparent;
        display: inline-block;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        background-color: inherit;
        transform: scale(1.4);
        opacity: 0;
        transition: transform 0.1s, opacity 0.8s;
      }

      /* Hover */

      :host(:not([checked]):not([indeterminate]):not([disabled]):hover) [part="checkbox"] {
        background-color: var(--lumo-contrast-30pct);
      }

      /* Disable hover for touch devices */
      @media (pointer: coarse) {
        :host(:not([checked]):not([indeterminate]):not([disabled]):hover) [part="checkbox"] {
          background-color: var(--lumo-contrast-20pct);
        }
      }

      /* Active */

      :host([active]) [part="checkbox"] {
        transform: scale(0.9);
        transition-duration: 0.05s;
      }

      :host([active][checked]) [part="checkbox"] {
        transform: scale(1.1);
      }

      :host([active]:not([checked])) [part="checkbox"]::before {
        transition-duration: 0.01s, 0.01s;
        transform: scale(0);
        opacity: 0.4;
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild(n.content);i(128)},134:function(e,t,i){"use strict";i(133),i(128)},137:function(e,t,i){"use strict";i(51),i(50),i(74);const n=i(13).a`<dom-module id="lumo-number-field" theme-for="vaadin-number-field">
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
</dom-module>`;document.head.appendChild(n.content);i(80),i(7),i(31);var a=i(65),o=i(20);
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
const r=document.createElement("template");let l;r.innerHTML='<dom-module id="vaadin-number-field-template">\n  <template>\n    <style>\n      :host([readonly]) [part$="button"] {\n        pointer-events: none;\n      }\n\n      [part="decrease-button"]::before {\n        content: "−";\n      }\n\n      [part="increase-button"]::before {\n        content: "+";\n      }\n\n      [part="decrease-button"],\n      [part="increase-button"] {\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n      }\n\n      /* Hide the native arrow icons */\n      [part="value"]::-webkit-outer-spin-button,\n      [part="value"]::-webkit-inner-spin-button {\n        -webkit-appearance: none;\n        margin: 0;\n      }\n\n      [part="value"] {\n        /* Older Firefox versions (v47.0) requires !important */\n        -moz-appearance: textfield !important;\n      }\n\n      :host([dir="rtl"]) [part="input-field"] {\n        direction: ltr;\n      }\n\n      :host([dir="rtl"]) [part="value"]::placeholder {\n        direction: rtl;\n      }\n\n      :host([dir="rtl"]) [part="input-field"] ::slotted(input)::placeholder {\n        direction: rtl;\n      }\n\n      :host([dir="rtl"]) [part="value"]:-ms-input-placeholder,\n      :host([dir="rtl"]) [part="input-field"] ::slotted(input):-ms-input-placeholder {\n        direction: rtl;\n      }\n\n      :host([dir="rtl"]:not([has-controls])) [part="value"]::placeholder {\n        text-align: left;\n      }\n\n      :host([dir="rtl"]:not([has-controls])) [part="input-field"] ::slotted(input)::placeholder {\n        text-align: left;\n      }\n\n      :host([dir="rtl"]:not([has-controls])) [part="value"]:-ms-input-placeholder,\n      :host([dir="rtl"]:not([has-controls])) [part="input-field"] ::slotted(input):-ms-input-placeholder {\n        text-align: left;\n      }\n    </style>\n\n    <div disabled$="[[!_allowed(-1, value, min, max, step)]]" part="decrease-button" on-click="_decreaseValue" on-touchend="_decreaseButtonTouchend" hidden$="[[!hasControls]]">\n    </div>\n\n    <div disabled$="[[!_allowed(1, value, min, max, step)]]" part="increase-button" on-click="_increaseValue" on-touchend="_increaseButtonTouchend" hidden$="[[!hasControls]]">\n    </div>\n  </template>\n\n  \n</dom-module>',document.head.appendChild(r.content);class s extends a.a{static get is(){return"vaadin-number-field"}static get version(){return"2.6.2"}static get properties(){return{hasControls:{type:Boolean,value:!1,reflectToAttribute:!0},min:{type:Number,reflectToAttribute:!0,observer:"_minChanged"},max:{type:Number,reflectToAttribute:!0,observer:"_maxChanged"},step:{type:Number,value:1,observer:"_stepChanged"}}}ready(){super.ready(),this.__previousValidInput=this.value||"",this.inputElement.type="number",this.inputElement.addEventListener("change",this.__onInputChange.bind(this))}_decreaseButtonTouchend(e){e.preventDefault(),this._decreaseValue()}_increaseButtonTouchend(e){e.preventDefault(),this._increaseValue()}static get template(){if(!l){l=super.template.cloneNode(!0);const e=o.a.import(this.is+"-template","template"),t=e.content.querySelector('[part="decrease-button"]'),i=e.content.querySelector('[part="increase-button"]'),n=e.content.querySelector("style"),a=l.content.querySelector('[part="input-field"]'),r=l.content.querySelector('[name="prefix"]');a.insertBefore(t,r),a.appendChild(i),l.content.appendChild(n)}return l}_createConstraintsObserver(){this._createMethodObserver("_constraintsChanged(required, minlength, maxlength, pattern, min, max, step)")}_constraintsChanged(e,t,i,n,a,o,r){if(!this.invalid)return;const l=e=>!e&&0!==e;l(a)&&l(o)?super._constraintsChanged(e,t,i,n):this.validate()}_decreaseValue(){this._incrementValue(-1)}_increaseValue(){this._incrementValue(1)}_incrementValue(e){if(this.disabled||this.readonly)return;let t=parseFloat(this.value);this.value?t<this.min?(e=0,t=this.min):t>this.max&&(e=0,t=this.max):0==this.min&&e<0||0==this.max&&e>0||0==this.max&&0==this.min?(e=0,t=0):(null==this.max||this.max>=0)&&(null==this.min||this.min<=0)?t=0:this.min>0?(t=this.min,this.max<0&&e<0&&(t=this.max),e=0):this.max<0&&(t=this.max,e<0?e=0:this._getIncrement(1,t-this.step)>this.max?t-=2*this.step:t-=this.step);const i=this._getIncrement(e,t);this.value&&0!=e&&!this._incrementIsInsideTheLimits(e,t)||this._setValue(i)}_setValue(e){this.value=this.inputElement.value=String(parseFloat(e)),this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}_getIncrement(e,t){let i=this.step||1,n=this.min||0;const a=Math.max(this._getMultiplier(t),this._getMultiplier(i),this._getMultiplier(n));i*=a,n*=a;const o=((t=Math.round(t*a))-n)%i;return e>0?(t-o+i)/a:e<0?(t-(o||i))/a:t/a}_getDecimalCount(e){const t=String(e),i=t.indexOf(".");return-1===i?1:t.length-i-1}_getMultiplier(e){if(!isNaN(e))return Math.pow(10,this._getDecimalCount(e))}_incrementIsInsideTheLimits(e,t){return e<0?null==this.min||this._getIncrement(e,t)>=this.min:e>0?null==this.max||this._getIncrement(e,t)<=this.max:this._getIncrement(e,t)<=this.max&&this._getIncrement(e,t)>=this.min}_allowed(e){const t=e*(this.step||1),i=parseFloat(this.value);return!this.value||!this.disabled&&this._incrementIsInsideTheLimits(t,i)}_stepChanged(e){this.__validateByStep=this.__stepChangedCalled||null!==this.getAttribute("step"),this.inputElement.step=this.__validateByStep?e:"any",this.__stepChangedCalled=!0,this.setAttribute("step",e)}_minChanged(e){this.inputElement.min=e}_maxChanged(e){this.inputElement.max=e}_valueChanged(e,t){e&&isNaN(parseFloat(e))?this.value="":"string"!=typeof this.value&&(this.value=String(this.value)),super._valueChanged(this.value,t)}_onKeyDown(e){38==e.keyCode?(e.preventDefault(),this._increaseValue()):40==e.keyCode&&(e.preventDefault(),this._decreaseValue()),super._onKeyDown(e)}__onInputChange(){this.validate()}checkValidity(){return void 0!==this.min||void 0!==this.max||this.__validateByStep?this.inputElement.checkValidity():super.checkValidity()}}window.customElements.define(s.is,s);
/**
@license
Copyright (c) 2019 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
const d=document.createElement("template");d.innerHTML='<dom-module id="vaadin-integer-field-template">\n\n  \n</dom-module>',document.head.appendChild(d.content);class c extends s{static get is(){return"vaadin-integer-field"}static get version(){return"2.6.2"}static get properties(){return{pattern:String,preventInvalidInput:Boolean,minlength:Number,maxlength:Number}}ready(){super.ready(),this._enabledCharPattern="[-+\\d]"}_valueChanged(e,t){if(""!==e&&!this.__isInteger(e))return console.warn(`Trying to set non-integer value "${e}" to <vaadin-integer-field>. Clearing the value.`),void(this.value="");super._valueChanged(e,t)}_stepChanged(e,t){if(!this.__hasOnlyDigits(e))return console.warn(`Trying to set invalid step size "${e}", which is not a positive integer, to <vaadin-integer-field>. Resetting the default value 1.`),void(this.step=1);super._stepChanged(e,t)}__isInteger(e){return/^(-\d)?\d*$/.test(String(e))}__hasOnlyDigits(e){return/^\d*$/.test(String(e))}}window.customElements.define(c.is,c)},146:function(e,t,i){"use strict";i.r(t);var n=i(7),a=(i(81),i(134),i(137),i(109),i(1)),o=i(17),r=i(0),l=i(132),s=i(75);class d extends n.a{static get properties(){return{isEditMode:{type:Boolean,value:!1},customRolls:{type:Array}}}connectedCallback(){super.connectedCallback(),this.damageTypes=r.k,this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(o.F)()),Object(o.l)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(l.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(l.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(o.l)().removeEventListener("character-selected",this.characterChangeHandler),Object(l.b)().removeEventListener("editModeChange",this.editModeHandler)}async updateFromCharacter(e){this.customRolls=e.customRolls?Object(a.cloneDeep)(e.customRolls):[],this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}__exists(){for(let e of arguments)if(e&&(e.constructor!==Object||Object.entries(e).length>0)&&(!Array.isArray(e)||e.length>0))return!0;return!1}__abs(e){return e>=0?"+"+e:e}_makeRoll(e){if(!this.isEditMode){let t=e.model.__data.item;t.noHitRoll||Object(s.d)(t.name+" (to hit)",t.toHit,this.$.advMod.checked,this.$.disadvMod.checked),t.damages.forEach((e,i)=>{Object(s.b)(`${t.name} (${e.type} damage)`,e.roll),setTimeout(()=>{},500*(i+1))})}}_rollChangeHandler(e){const t=Object(a.findInPath)(".roll",e).getAttribute("index"),i=parseInt(t,10);Object(o.gb)(this.customRolls[i],i)}_addRoll(){Object(o.gb)({name:"",toHit:0,noHitRoll:!1,damages:[{roll:"",type:""}]},this.customRolls.length),this.isEditMode||Object(l.a)(!0),setTimeout(()=>{const e=this.shadowRoot.querySelectorAll(".roll");e[e.length-1].scrollIntoView()},1)}_removeRoll(e){const t=Object(a.findInPath)(".roll",e).getAttribute("index"),i=parseInt(t,10);Object(o.R)(i)}_addDamage(e){const t=Object(a.findInPath)(".roll",e).getAttribute("index"),i=parseInt(t,10),n=this.customRolls[i];n.damages.push({roll:"",type:""}),Object(o.gb)(n,i)}_removeDamage(e){const t=Object(a.findInPath)(".roll",e).getAttribute("index"),i=parseInt(t,10),n=Object(a.findInPath)(".roll__damage",e).getAttribute("index"),r=parseInt(n,10);Object(o.S)(i,r)}_or(e,t){return e||t}_orNot(e,t){return e||!t}_isTruthy(e){return!!e}_modChange(e){"advMod"===e.currentTarget.id?this.$.disadvMod.checked=!1:this.$.advMod.checked=!1}static get template(){return n.b`
    <style include="material-styles">
      body {}
      :host {
        display: block;
        padding: 14px;
      }
      [hidden] {
        display: none !important;
      }
      
      .col-wrap {
        display: flex; 
        justify-content: space-between;
        flex-wrap: wrap;
        margin-bottom: 56px;
      }
      .row-wrap {
        width: 100%;
      }

      .heading {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--lumo-contrast-10pct);
        margin-bottom: 10px;
      }

      h2 {
        margin-bottom: 24px;
      }

      .rolls__add-button {
        margin-left: 16px;
      }

      .roll {
        display: flex;
        flex-direction: column;
        cursor: pointer;
        border-radius: 4px;
        padding: 8px;
        margin-bottom: 16px;
        background: var(--lumo-contrast-10pct);
        height: min-content;
        width: calc(100% - 16px);
      }
      
      .rolls {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding-bottom: 60px;
      }

      @media(min-width: 500px) {
        .roll {
          width: calc(50% - 24px);
        }
      }

      @media(min-width: 921px) {
        :host {
          padding-right: 0px;
        }
        .roll {
          max-width: 380px;
          margin-right: 15px;
        }
        .rolls {
          display: flex;
          flex-wrap: wrap;
        }
      }

      @media(min-width: 1321px) {
        .roll {
          width: calc(33.3% - 32px);
        }
      }

      .roll-header {
        display: flex;
        justify-content: space-between;
      }
      .roll-header dnd-button {
        margin-top: 20px;
      }
      .roll-header vaadin-text-field {
        padding-top: 0;
      }
      h3 {
        margin: 4px 0;
      }
      .roll__to-hit {
        display: flex;
      }
      .roll__to-hit dnd-switch {
        margin: 0 auto;
        padding: 26px 20px 27px;
      }

      .roll-footer {
        display: flex;
        flex-direction: column;
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

      .rolls__toolbar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 20px;
      }
      .rolls__toolbar h4 {
        width: 100%;
        margin: 0;
      }
      .rolls__toolbar-reset-mods {
        display: inline-flex;
      }
      .roll__add-damage {
        width: min-content;
        margin: 8px auto 0;
      }
    </style>
    
    <div class="col-wrap">
      <div class="row-wrap">
        <div class="heading">
          <h2>Rolls</h2>
          <dnd-button class="rolls__add-button link" edit-mode$="[[isEditMode]]" not-edit-mode$="[[!isEditMode]]" label="Add a Roll" icon="edit"  on-click="_addRoll"></dnd-button>
        </div>

        <div hidden$="[[isEditMode]]" class="rolls__toolbar">
          <h4>Roll Modifiers:</h4>
          <div>
            <vaadin-checkbox id='advMod' on-change="_modChange">Advantage</vaadin-checkbox>
            <vaadin-checkbox id='disadvMod' on-change="_modChange">Disadvantage</vaadin-checkbox>
          </div>
        </div>

        <div class="rolls rolls--custom">

          <template is="dom-repeat" items="[[customRolls]]">
            <template is="dom-if" if="[[!isEditMode]]">
              <div class="roll" on-click="_makeRoll" index$="[[index]]">
                <div class="roll-header">
                  <h3>[[item.name]]<span hidden$="[[_isTruthy(item.name)]]">&lt;No Name&gt;</span></h3>
                </div>

                <div class="roll-footer">
                  <div class="roll__to-hit">
                    <span hidden$="[[_or(item.noHitRoll, isEditMode)]]"><span>[[__abs(item.toHit)]]</span> to hit</span>
                  </div>

                  <div class="roll__damages">
                    <template is="dom-repeat" items="[[item.damages]]" as="damage">
                      <div class="roll__damage" index$="[[index]]">
                        <span class="roll__damage-roll" >[[damage.roll]]</span>
                        <span class="roll__damage-type">&nbsp;[[damage.type]] damage</span>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </template>

            <template is="dom-if" if="[[isEditMode]]">
              <div class="roll" on-click="_makeRoll" index$="[[index]]">
                <div class="roll-header">
                  <vaadin-text-field value="{{item.name}}" on-change="_rollChangeHandler" label="Name"></vaadin-text-field>
                  <dnd-button label="Remove" icon="remove" on-click="_removeRoll"></dnd-button>
                </div>

                <div class="roll-footer">
                  <div class="roll__to-hit">
                    <vaadin-integer-field hidden$="[[_orNot(item.noHitRoll, isEditMode)]]" value="{{item.toHit}}" on-change="_rollChangeHandler" min="-20" max="20" has-controls label="To Hit"></vaadin-integer-field>
                    <dnd-switch label='Attack Roll' secondary-label='Damage Only' initial-value="[[item.noHitRoll]]" checked={{item.noHitRoll}} on-switch-change="_rollChangeHandler" ></dnd-switch>
                  </div>

                  <div class="roll__damages">
                    <template is="dom-repeat" items="[[item.damages]]" as="damage">
                      <div class="roll__damage" index$="[[index]]">
                        <dnd-button on-click="_removeDamage" icon="remove" class='roll__damage-remove icon-only'></dnd-button>
                        <div class="roll__damage-roll--edit">
                          <vaadin-text-field value="{{damage.roll}}" on-change="_rollChangeHandler" label="Damage Roll"></vaadin-text-field>
                        </div>
                        <div class="roll__damage-type--edit">
                          <vaadin-select value="{{damage.type}}" on-change="_rollChangeHandler" label="Damage Type" >
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
                </div>
              </div>
            </template>
          </template>
        </div>

      </div>
    </div>
    `}}customElements.define("dnd-character-builder-rolls",d)}}]);
//# sourceMappingURL=7.bundle.js.map