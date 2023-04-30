(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{166:function(e,t,a){"use strict";a(91),a(42);var i=a(104),n=a(56),l=a(2);
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
`;Object(l.c)("vaadin-number-field",[n.a,i.a,s],{moduleId:"lumo-number-field"});a(73);var o=a(3),r=a(32),d=a(33),c=a(57),h=a(103),m=a(55),p=a(74);
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
    `}static get properties(){return{hasControls:{type:Boolean,value:!1,reflectToAttribute:!0},stepButtonsVisible:{type:Boolean,value:!1,reflectToAttribute:!0},min:{type:Number},max:{type:Number},step:{type:Number}}}static get observers(){return["_stepChanged(step, inputElement)"]}static get delegateProps(){return[...super.delegateProps,"min","max"]}static get constraints(){return[...super.constraints,"min","max","step"]}constructor(){super(),this._setType("number")}get slotStyles(){const e=this.localName;return[...super.slotStyles,`\n        ${e} input[type="number"]::-webkit-outer-spin-button,\n        ${e} input[type="number"]::-webkit-inner-spin-button {\n          -webkit-appearance: none;\n          margin: 0;\n        }\n\n        ${e} input[type="number"] {\n          -moz-appearance: textfield;\n        }\n\n        ${e}[dir='rtl'] input[type="number"]::placeholder {\n          direction: rtl;\n        }\n\n        ${e}[dir='rtl']:not([step-buttons-visible]):not([has-controls]) input[type="number"]::placeholder {\n          text-align: left;\n        }\n      `]}get clearElement(){return this.$.clearButton}ready(){super.ready(),this.addController(new c.a(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e})),this.addController(new m.a(this.inputElement,this._labelController)),this._tooltipController=new d.a(this),this.addController(this._tooltipController),this._tooltipController.setPosition("top")}checkValidity(){return this.inputElement?this.inputElement.checkValidity():!this.invalid}_decreaseButtonTouchend(e){e.preventDefault(),this._decreaseValue()}_increaseButtonTouchend(e){e.preventDefault(),this._increaseValue()}_decreaseValue(){this._incrementValue(-1)}_increaseValue(){this._incrementValue(1)}_incrementValue(e){if(this.disabled||this.readonly)return;const t=this.step||1;let a=parseFloat(this.value);this.value?a<this.min?(e=0,a=this.min):a>this.max&&(e=0,a=this.max):0===this.min&&e<0||0===this.max&&e>0||0===this.max&&0===this.min?(e=0,a=0):(null==this.max||this.max>=0)&&(null==this.min||this.min<=0)?a=0:this.min>0?(a=this.min,this.max<0&&e<0&&(a=this.max),e=0):this.max<0&&(a=this.max,e<0?e=0:this._getIncrement(1,a-t)>this.max?a-=2*t:a-=t);const i=this._getIncrement(e,a);this.value&&0!==e&&!this._incrementIsInsideTheLimits(e,a)||this._setValue(i)}_setValue(e){this.value=this.inputElement.value=String(parseFloat(e)),this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}_getIncrement(e,t){let a=this.step||1,i=this.min||0;const n=Math.max(this._getMultiplier(t),this._getMultiplier(a),this._getMultiplier(i));a*=n,i*=n;const l=((t=Math.round(t*n))-i)%a;return e>0?(t-l+a)/n:e<0?(t-(l||a))/n:t/n}_getDecimalCount(e){const t=String(e),a=t.indexOf(".");return-1===a?1:t.length-a-1}_getMultiplier(e){if(!isNaN(e))return 10**this._getDecimalCount(e)}_incrementIsInsideTheLimits(e,t){return e<0?null==this.min||this._getIncrement(e,t)>=this.min:e>0?null==this.max||this._getIncrement(e,t)<=this.max:this._getIncrement(e,t)<=this.max&&this._getIncrement(e,t)>=this.min}_allowed(e){const t=e*(this.step||1),a=parseFloat(this.value);return!this.value||!this.disabled&&this._incrementIsInsideTheLimits(t,a)}_stepChanged(e,t){t&&(t.step=e||"any")}_valueChanged(e,t){e&&isNaN(parseFloat(e))?this.value="":"string"!=typeof this.value&&(this.value=String(this.value)),super._valueChanged(this.value,t)}_onKeyDown(e){"ArrowUp"===e.key?(e.preventDefault(),this._increaseValue()):"ArrowDown"===e.key&&(e.preventDefault(),this._decreaseValue()),super._onKeyDown(e)}_isStepButtonVisible(e,t){return e||t}_setHasInputValue(e){const t=e.composedPath()[0];this._hasInputValue=t.value.length>0||t.validity.badInput}}customElements.define(u.is,u);
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
class g extends u{static get is(){return"vaadin-integer-field"}constructor(){super(),this.allowedCharPattern="[-+\\d]"}_valueChanged(e,t){if(""!==e&&!this.__isInteger(e))return console.warn(`Trying to set non-integer value "${e}" to <vaadin-integer-field>. Clearing the value.`),void(this.value="");super._valueChanged(e,t)}_stepChanged(e,t){if(null!=e&&!this.__hasOnlyDigits(e))return console.warn(`<vaadin-integer-field> The \`step\` property must be a positive integer but \`${e}\` was provided, so the property was reset to \`null\`.`),void(this.step=null);super._stepChanged(e,t)}__isInteger(e){return/^(-\d)?\d*$/.test(String(e))}__hasOnlyDigits(e){return/^\d+$/.test(String(e))}}customElements.define(g.is,g);console.warn('WARNING: Since Vaadin 23.2, "@vaadin/vaadin-text-field" is deprecated. Use "@vaadin/integer-field" instead.')},168:function(e,t,a){"use strict";a(125);
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
a(122).a;console.warn('WARNING: Since Vaadin 23.2, "@vaadin/vaadin-checkbox" is deprecated. Use "@vaadin/checkbox" instead.')},180:function(e,t,a){"use strict";a.r(t);var i=a(3),n=(a(123),a(168),a(166),a(101),a(1)),l=a(31),s=a(0),o=a(72),r=a(105);class d extends i.a{static get properties(){return{isEditMode:{type:Boolean,value:!1},customRolls:{type:Array}}}connectedCallback(){super.connectedCallback(),this.damageTypes=s.k,this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(l.P)()),Object(l.n)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(o.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(o.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(l.n)().removeEventListener("character-selected",this.characterChangeHandler),Object(o.b)().removeEventListener("editModeChange",this.editModeHandler)}async updateFromCharacter(e){this.customRolls=e.customRolls?Object(n.cloneDeep)(e.customRolls):[],this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}__exists(){for(let e of arguments)if(e&&(e.constructor!==Object||Object.entries(e).length>0)&&(!Array.isArray(e)||e.length>0))return!0;return!1}__abs(e){return e>=0?"+"+e:e}_makeRoll(e){if(!this.isEditMode){let t=e.model.__data.item;t.noHitRoll||Object(r.d)(t.name+" (to hit)",t.toHit,this.$.advMod.checked,this.$.disadvMod.checked),t.damages.forEach((e,a)=>{Object(r.b)(`${t.name} (${e.type} damage)`,e.roll),setTimeout(()=>{},500*(a+1))})}}_rollChangeHandler(e){const t=Object(n.findInPath)(".roll",e).getAttribute("index"),a=parseInt(t,10);Object(l.qb)(this.customRolls[a],a)}_addRoll(){Object(l.qb)({name:"",toHit:0,noHitRoll:!1,damages:[{roll:"",type:""}]},this.customRolls.length),this.isEditMode||Object(o.a)(!0),setTimeout(()=>{const e=this.shadowRoot.querySelectorAll(".roll");e[e.length-1].scrollIntoView()},1)}_removeRoll(e){const t=Object(n.findInPath)(".roll",e).getAttribute("index"),a=parseInt(t,10);Object(l.cb)(a)}_addDamage(e){const t=Object(n.findInPath)(".roll",e).getAttribute("index"),a=parseInt(t,10),i=this.customRolls[a];i.damages.push({roll:"",type:""}),Object(l.qb)(i,a)}_removeDamage(e){const t=Object(n.findInPath)(".roll",e).getAttribute("index"),a=parseInt(t,10),i=Object(n.findInPath)(".roll__damage",e).getAttribute("index"),s=parseInt(i,10);Object(l.db)(a,s)}_or(e,t){return e||t}_orNot(e,t){return e||!t}_isTruthy(e){return!!e}_modChange(e){"advMod"===e.currentTarget.id?this.$.disadvMod.checked=!1:this.$.advMod.checked=!1}static get template(){return i.b`
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
      }

      @media(min-width: 500px) {
        .roll {
          width: calc(50% - 24px);
        }
      }

      @media(min-width: 921px) {
        :host {
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
        margin: 0 16px;
      }
      .roll__damage-remove {
        margin: auto -5px 4px;
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
          <dnd-button class="rolls__add-button" link edit-mode$="[[isEditMode]]" not-edit-mode$="[[!isEditMode]]" label="Add a Roll" icon="edit"  on-click="_addRoll"></dnd-button>
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
          </template>
        </div>

      </div>
    </div>
    `}}customElements.define("dnd-character-builder-rolls",d)}}]);
//# sourceMappingURL=6.bundle.js.map