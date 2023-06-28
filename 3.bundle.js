(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{166:function(e,t,i){"use strict";i(91),i(42);var a=i(102),n=i(56),l=i(2);
/**
 * @license
 * Copyright (c) 2021 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const s=l.b`
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
`;Object(l.c)("vaadin-number-field",[n.a,a.a,s],{moduleId:"lumo-number-field"});i(73);var o=i(3),r=i(31),d=i(32),c=i(57),h=i(101),m=i(55),p=i(74);
/**
 * @license
 * Copyright (c) 2021 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
Object(l.c)("vaadin-number-field",p.a,{moduleId:"vaadin-number-field-styles"});class u extends(Object(h.a)(Object(l.a)(Object(r.a)(o.a)))){static get is(){return"vaadin-number-field"}static get template(){return o.b`
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
    `}static get properties(){return{hasControls:{type:Boolean,value:!1,reflectToAttribute:!0},stepButtonsVisible:{type:Boolean,value:!1,reflectToAttribute:!0},min:{type:Number},max:{type:Number},step:{type:Number}}}static get observers(){return["_stepChanged(step, inputElement)"]}static get delegateProps(){return[...super.delegateProps,"min","max"]}static get constraints(){return[...super.constraints,"min","max","step"]}constructor(){super(),this._setType("number")}get slotStyles(){const e=this.localName;return[...super.slotStyles,`\n        ${e} input[type="number"]::-webkit-outer-spin-button,\n        ${e} input[type="number"]::-webkit-inner-spin-button {\n          -webkit-appearance: none;\n          margin: 0;\n        }\n\n        ${e} input[type="number"] {\n          -moz-appearance: textfield;\n        }\n\n        ${e}[dir='rtl'] input[type="number"]::placeholder {\n          direction: rtl;\n        }\n\n        ${e}[dir='rtl']:not([step-buttons-visible]):not([has-controls]) input[type="number"]::placeholder {\n          text-align: left;\n        }\n      `]}get clearElement(){return this.$.clearButton}ready(){super.ready(),this.addController(new c.a(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e})),this.addController(new m.a(this.inputElement,this._labelController)),this._tooltipController=new d.a(this),this.addController(this._tooltipController),this._tooltipController.setPosition("top")}checkValidity(){return this.inputElement?this.inputElement.checkValidity():!this.invalid}_decreaseButtonTouchend(e){e.preventDefault(),this._decreaseValue()}_increaseButtonTouchend(e){e.preventDefault(),this._increaseValue()}_decreaseValue(){this._incrementValue(-1)}_increaseValue(){this._incrementValue(1)}_incrementValue(e){if(this.disabled||this.readonly)return;const t=this.step||1;let i=parseFloat(this.value);this.value?i<this.min?(e=0,i=this.min):i>this.max&&(e=0,i=this.max):0===this.min&&e<0||0===this.max&&e>0||0===this.max&&0===this.min?(e=0,i=0):(null==this.max||this.max>=0)&&(null==this.min||this.min<=0)?i=0:this.min>0?(i=this.min,this.max<0&&e<0&&(i=this.max),e=0):this.max<0&&(i=this.max,e<0?e=0:this._getIncrement(1,i-t)>this.max?i-=2*t:i-=t);const a=this._getIncrement(e,i);this.value&&0!==e&&!this._incrementIsInsideTheLimits(e,i)||this._setValue(a)}_setValue(e){this.value=this.inputElement.value=String(parseFloat(e)),this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}_getIncrement(e,t){let i=this.step||1,a=this.min||0;const n=Math.max(this._getMultiplier(t),this._getMultiplier(i),this._getMultiplier(a));i*=n,a*=n;const l=((t=Math.round(t*n))-a)%i;return e>0?(t-l+i)/n:e<0?(t-(l||i))/n:t/n}_getDecimalCount(e){const t=String(e),i=t.indexOf(".");return-1===i?1:t.length-i-1}_getMultiplier(e){if(!isNaN(e))return 10**this._getDecimalCount(e)}_incrementIsInsideTheLimits(e,t){return e<0?null==this.min||this._getIncrement(e,t)>=this.min:e>0?null==this.max||this._getIncrement(e,t)<=this.max:this._getIncrement(e,t)<=this.max&&this._getIncrement(e,t)>=this.min}_allowed(e){const t=e*(this.step||1),i=parseFloat(this.value);return!this.value||!this.disabled&&this._incrementIsInsideTheLimits(t,i)}_stepChanged(e,t){t&&(t.step=e||"any")}_valueChanged(e,t){e&&isNaN(parseFloat(e))?this.value="":"string"!=typeof this.value&&(this.value=String(this.value)),super._valueChanged(this.value,t)}_onKeyDown(e){"ArrowUp"===e.key?(e.preventDefault(),this._increaseValue()):"ArrowDown"===e.key&&(e.preventDefault(),this._decreaseValue()),super._onKeyDown(e)}_isStepButtonVisible(e,t){return e||t}_setHasInputValue(e){const t=e.composedPath()[0];this._hasInputValue=t.value.length>0||t.validity.badInput}}customElements.define(u.is,u);
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
class v extends u{static get is(){return"vaadin-integer-field"}constructor(){super(),this.allowedCharPattern="[-+\\d]"}_valueChanged(e,t){if(""!==e&&!this.__isInteger(e))return console.warn(`Trying to set non-integer value "${e}" to <vaadin-integer-field>. Clearing the value.`),void(this.value="");super._valueChanged(e,t)}_stepChanged(e,t){if(null!=e&&!this.__hasOnlyDigits(e))return console.warn(`<vaadin-integer-field> The \`step\` property must be a positive integer but \`${e}\` was provided, so the property was reset to \`null\`.`),void(this.step=null);super._stepChanged(e,t)}__isInteger(e){return/^(-\d)?\d*$/.test(String(e))}__hasOnlyDigits(e){return/^\d+$/.test(String(e))}}customElements.define(v.is,v);console.warn('WARNING: Since Vaadin 23.2, "@vaadin/vaadin-text-field" is deprecated. Use "@vaadin/integer-field" instead.')},167:function(e,t,i){"use strict";i(125);
/**
 * @license
 * Copyright (c) 2017 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
/**
 * @license
 * Copyright (c) 2017 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
i(122).a;console.warn('WARNING: Since Vaadin 23.2, "@vaadin/vaadin-checkbox" is deprecated. Use "@vaadin/checkbox" instead.')},169:function(e,t,i){"use strict";var a=i(3),n=i(165);class l extends a.a{static get properties(){return{initialValue:{type:Boolean,value:!1,observer:"initValueChange"},checked:{type:Boolean,value:!1,reflectToAttribute:!0,notify:!0},label:{type:String,value:""},secondaryLabel:{type:String,value:""},disabled:{type:Boolean,value:!1,reflectToAttribute:!0}}}initValueChange(){this.switchEl&&(this.switchEl.checked=this.initialValue,this.checked=this.initialValue)}ready(){super.ready(),setTimeout(()=>{this.switchEl=new n.a(this.shadowRoot.querySelector(".mdc-switch")),this.switchEl.checked=this.initialValue,this.checked=this.initialValue},10)}connectedCallback(){super.connectedCallback(),this.switchEventHandler=()=>{this.checked=this.switchEl.checked,this.dispatchEvent(new CustomEvent("switch-change",{detail:{checked:this.switchEl.checked},bubbles:!0,composed:!0}))},this.shadowRoot.querySelector(".mdc-switch__native-control").addEventListener("change",this.switchEventHandler)}disconnectedCallback(){super.disconnectedCallback(),this.shadowRoot.querySelector(".mdc-switch__native-control").removeEventListener("change",this.switchEventHandler)}_switchClasses(e){return e?"mdc-switch mdc-list-item__meta mdc-switch--disabled":"mdc-switch mdc-list-item__meta"}static get template(){return a.b`
      <style include="material-styles">
        :host {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        :host([checked]) label.secondary {
          color: var(--mdc-theme-primary);
        }
        :host([checked]) label:not(.secondary) {
          color: var(--lumo-secondary-text-color);
        }
        label {
          color: var(--mdc-theme-primary);
          font-weight: 500;
          font-size: var(--lumo-font-size-s);
          margin-right: 16px;
          transition: color 0.2s;
        }
        label.secondary {
          color: var(--lumo-secondary-text-color);
          margin-right: 0;
          margin-left: 16px;
        }
        :host([extra-padding]) label.secondary {
          margin-left: 50px;
        }
      </style>
      
      <label for="switch">[[label]]</label>
      <div class$="[[_switchClasses(disabled)]]">
        <div class="mdc-switch__track"></div>
        <div class="mdc-switch__thumb-underlay">
          <div class="mdc-switch__thumb">
            <input type="checkbox" id="switch" class="mdc-switch__native-control" role="switch" disabled$="[[disabled]]" />
          </div>
        </div>
      </div>
      <label class="secondary">[[secondaryLabel]]</label>
    `}}customElements.define("dnd-switch",l)},180:function(e,t,i){"use strict";i.r(t);var a=i(3),n=(i(123),i(167),i(166),i(103),i(1)),l=i(33),s=i(0),o=i(72),r=i(104);i(169);class d extends a.a{static get properties(){return{isEditMode:{type:Boolean,value:!1},customRolls:{type:Array},rolls:{type:Array}}}connectedCallback(){super.connectedCallback(),this.damageTypes=s.k,this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(l.T)()),Object(l.q)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(o.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(o.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(l.q)().removeEventListener("character-selected",this.characterChangeHandler),Object(o.b)().removeEventListener("editModeChange",this.editModeHandler)}async updateFromCharacter(e){const t=await Object(l.ab)(e),i=Object(l.I)(e);this.customRolls=i,this.rolls=t.concat(i),console.error("rolls",this.rolls),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}__exists(){for(let e of arguments)if(e&&(e.constructor!==Object||Object.entries(e).length>0)&&(!Array.isArray(e)||e.length>0))return!0;return!1}__abs(e){return e>=0?"+"+e:e}_makeRoll(e){if(!this.isEditMode){let t=e.model.__data.item;const i=parseInt(this.$.critOn.value);let a;t.noHitRoll||(a=Object(r.d)(t.name,t.toHit,this.$.advMod.checked,this.$.disadvMod.checked,this.$.doubleAdvMod.checked,i)),t.damages.forEach(e=>{if(e.roll){const i=""+(e.type?Object(n.util_capitalize)(e.type):"Damage");Object(r.b)(t.name,e.roll,i,a)}})}}_rollChangeHandler(e){const t=Object(n.findInPath)(".roll",e).getAttribute("index"),i=parseInt(t,10);Object(l.vb)(this.customRolls[i],i)}_addRoll(){Object(l.vb)({name:"",toHit:0,noHitRoll:!1,damages:[{roll:"",type:""}]},this.customRolls.length),this.isEditMode||Object(o.a)(!0),setTimeout(()=>{const e=this.shadowRoot.querySelectorAll(".roll");e[e.length-1].scrollIntoView()},1)}_removeRoll(e){const t=Object(n.findInPath)(".roll",e).getAttribute("index"),i=parseInt(t,10);Object(l.hb)(i)}_addDamage(e){const t=Object(n.findInPath)(".roll",e).getAttribute("index"),i=parseInt(t,10),a=this.customRolls[i];a.damages.push({roll:"",type:""}),Object(l.vb)(a,i)}_removeDamage(e){const t=Object(n.findInPath)(".roll",e).getAttribute("index"),i=parseInt(t,10),a=Object(n.findInPath)(".roll__damage",e).getAttribute("index"),s=parseInt(a,10);Object(l.ib)(i,s)}_or(e,t){return e||t}_orNot(e,t){return e||!t}_isTruthy(e){return!!e}_modChange(e){"disadvMod"===e.currentTarget.id?(this.$.advMod.checked=!1,this.$.doubleAdvMod.checked=!1):this.$.disadvMod.checked=!1}_hideEditRoll(e,t){return!t||"custom"!==e.type}_hideWarning(e){return"weapon"!==e.type||e.isEquipped&&e.isProficient}_equal(e,t){return e===t}_exists(){for(let e of arguments)if(e&&(e.constructor!==Object||Object.entries(e).length>0)&&(!Array.isArray(e)||e.length>0))return!0;return!1}static get template(){return a.b`
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
        margin-bottom: var(--tab-bottom-margin);
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
      h3 {
        margin: 2px 0 4px 0;
        font-size: 20px;
        font-weight: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--mdc-theme-primary);
      }

      .rolls__add-button {
        margin-left: 16px;
      }
      .rolls {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      .roll {
        display: flex;
        flex-direction: column;
        cursor: pointer;
        border-radius: 4px;
        padding: 4px 8px;
        margin-bottom: 16px;
        background: var(--lumo-contrast-10pct);
        height: min-content;
        width: calc(100% - 16px);
        position: relative;
      }

      [edit-mode] .roll {
        padding: 16px;
      }

      .roll-header {
        display: flex;
        justify-content: space-between;
      }
      .roll-header dnd-button {
        margin-top: 25px;
      }
      .roll-header vaadin-text-field {
        padding-top: 0;
        margin-top: 4px;
        flex-grow: 1;
        margin-right: 16px;
      }
      .roll__label {
        font-size: 12px;
        background: var(--lumo-contrast-10pct);
        line-height: 1;
        border-radius: 4px;
        position: relative;
        top: -4px;
        right: -8px;
        height: 20px;
        padding: 0 6px;
        display: flex;
        align-items: center;
        text-transform: capitalize;
      }
      .roll__warning {
        font-size: 12px;
        line-height: 1.2;
        border-radius: 4px;
        position: relative;
        bottom: -4px;
        right: -8px;
        padding: 3px 6px;
        display: flex;
        align-items: center;
        text-transform: capitalize;
        flex-direction: column;
        color: var(--lumo-error-text-color);
        background: var(--lumo-error-color-10pct);
        height: fit-content;
        margin-top: auto;
        white-space: nowrap;
        margin-left: auto;
      }
      .roll__to-hit {
        display: flex;
      }
      .roll__to-hit dnd-switch {
        margin: 0 auto;
        padding: 26px 20px 20px;
      }
      .roll__to-hit vaadin-integer-field {
        width: auto;
        min-width: 6rem;
        max-width: 8rem;
      }

      .roll-footer {
        display: flex;
        flex-direction: column;
        font-size: 15px;
        line-height: 1.4;
        margin-top: auto;
      }
      [not-edit-mode] .roll-footer {
        flex-direction: row;
      }
      .roll__damages {
        display: flex;
        flex-direction: column;
      }
      .roll__damage {
        display: flex;
      }
      [not-edit-mode] .roll__damage {
        flex-wrap: wrap;
      }
      .roll__damage vaadin-text-field,
      .roll__damage vaadin-select {
        max-width: 100%;
      }
      .roll__damage-type {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .roll-footer__wrap {
        overflow: hidden;
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
      .roll__damage-damage {
        display: none;
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
      .rolls__toolbar-adv {
        display: flex;
        flex-direction: column;
      }
      #disadvMod {
        width: 100%;
      }
      #critOn {
        margin-left: auto;
        width: 95px;
      }
      .roll__add-damage {
        width: min-content;
        margin: 8px auto 0;
      }

      @media(min-width: 420px) {
        [not-edit-mode] .roll {
          width: calc(50% - 24px);
          height: auto;
        }
      }

      @media(min-width: 700px) {
        [not-edit-mode] .roll {
          width: calc(33% - 24px);
        }
        [edit-mode] .roll {
          width: calc(50% - 39px);
        }
      }

      @media(min-width: 921px) {
        .roll__damage-damage {
          display: inline;
        }
      }

      @media(min-width: 1321px) {
        [not-edit-mode] .roll {
          width: calc(33.3% - 25px);
        }
      }
    </style>
    
    <div class="col-wrap" edit-mode$="[[isEditMode]]" not-edit-mode$="[[!isEditMode]]" >
      <div class="row-wrap">
        <div class="heading">
          <h2>Rolls</h2>
          <dnd-button class="rolls__add-button" link edit-mode$="[[isEditMode]]" not-edit-mode$="[[!isEditMode]]" label="Add a Roll" icon="edit"  on-click="_addRoll"></dnd-button>
        </div>

        <div hidden$="[[isEditMode]]" class="rolls__toolbar">
          <div class="rolls__toolbar-adv">
            <vaadin-checkbox id='advMod' checked="{{advMod}}" on-change="_modChange">Advantage</vaadin-checkbox>
            <vaadin-checkbox id='doubleAdvMod' hidden$="[[!advMod]]" on-change="_modChange">Double Advantage</vaadin-checkbox>
          </div>
          <vaadin-integer-field id='critOn' no-transparent has-controls value='20' min='15' max='20' label='Crit on'></vaadin-integer-field>
          <vaadin-checkbox id='disadvMod' on-change="_modChange">Disadvantage</vaadin-checkbox>
        </div>

        <div class="rolls rolls--custom">
          <template is="dom-repeat" items="[[rolls]]">
            <div hidden$="[[isEditMode]]" class="roll" on-click="_makeRoll" index$="[[index]]">
              <div class="roll-header">
                <h3>[[item.name]]<span hidden$="[[_isTruthy(item.name)]]">&lt;No Name&gt;</span></h3>
                <span class="roll__label">[[item.type]]</span>
              </div>

              <div class="roll-footer">
                <div class="roll-footer__wrap">
                  <div class="roll__to-hit">
                    <span hidden$="[[_or(item.noHitRoll, isEditMode)]]"><span>[[__abs(item.toHit)]]</span> to hit</span>
                  </div>

                  <div class="roll__damages">
                    <template is="dom-repeat" items="[[item.damages]]" as="damage">
                      <div class="roll__damage" index$="[[index]]">
                        <span class="roll__damage-roll">[[damage.roll]]</span>
                        <span class="roll__damage-type">&nbsp;[[damage.type]]<span class="roll__damage-damage"> damage</span></span>
                      </div>
                    </template>
                  </div>
                </div>

                <div class="roll__warning" hidden$="[[_hideWarning(item)]]">
                  <div class="roll__not-equipped" hidden$="[[item.isEquipped]]">Not Equipped</div>
                  <div class="roll__not-proficient" hidden$="[[item.isProficient]]">Not Proficient</div>
                </div>
              </div>
            </div>

            <div class="roll" on-click="_makeRoll" index$="[[item.customIndex]]" hidden$="[[_hideEditRoll(item, isEditMode)]]">
              <div class="roll-header">
                <vaadin-text-field theme="label--secondary" value="{{item.name}}" on-change="_rollChangeHandler" label="Name"></vaadin-text-field>
                <dnd-button icon="delete" class="icon-only" on-click="_removeRoll"></dnd-button>
              </div>

              <div class="roll-footer">
                <div class="roll__to-hit">
                  <vaadin-integer-field theme="label--secondary" hidden$="[[_orNot(item.noHitRoll, isEditMode)]]" value="{{item.toHit}}" on-change="_rollChangeHandler" min="-20" max="20" has-controls label="To Hit"></vaadin-integer-field>
                  <dnd-switch label='Attack Roll' secondary-label='Damage Only' initial-value="[[item.noHitRoll]]" checked={{item.noHitRoll}} on-switch-change="_rollChangeHandler" ></dnd-switch>
                </div>

                <div class="roll__damages">
                  <template is="dom-repeat" items="[[item.damages]]" as="damage">
                    <div class="roll__damage" index$="[[index]]">
                      <dnd-button on-click="_removeDamage" icon="remove" class='roll__damage-remove'></dnd-button>
                      <div class="roll__damage-roll--edit">
                        <vaadin-text-field theme="label--secondary" value="{{damage.roll}}" on-change="_rollChangeHandler" label="Damage Roll"></vaadin-text-field>
                      </div>
                      <div class="roll__damage-type--edit">
                        <vaadin-select theme="label--secondary" value="{{damage.type}}" on-change="_rollChangeHandler" label="Damage Type" >
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
        </div>

      </div>
    </div>
    `}}customElements.define("dnd-character-builder-rolls",d)}}]);
//# sourceMappingURL=3.bundle.js.map