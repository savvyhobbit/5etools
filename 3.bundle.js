(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{166:function(e,t,i){"use strict";i(91),i(42);var s=i(104),n=i(56),a=i(2);
/**
 * @license
 * Copyright (c) 2021 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const l=a.b`
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
`;Object(a.c)("vaadin-number-field",[n.a,s.a,l],{moduleId:"lumo-number-field"});i(73);var r=i(3),o=i(32),d=i(33),c=i(57),u=i(103),h=i(55),p=i(74);
/**
 * @license
 * Copyright (c) 2021 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
Object(a.c)("vaadin-number-field",p.a,{moduleId:"vaadin-number-field-styles"});class m extends(Object(u.a)(Object(a.a)(Object(o.a)(r.a)))){static get is(){return"vaadin-number-field"}static get template(){return r.b`
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
    `}static get properties(){return{hasControls:{type:Boolean,value:!1,reflectToAttribute:!0},stepButtonsVisible:{type:Boolean,value:!1,reflectToAttribute:!0},min:{type:Number},max:{type:Number},step:{type:Number}}}static get observers(){return["_stepChanged(step, inputElement)"]}static get delegateProps(){return[...super.delegateProps,"min","max"]}static get constraints(){return[...super.constraints,"min","max","step"]}constructor(){super(),this._setType("number")}get slotStyles(){const e=this.localName;return[...super.slotStyles,`\n        ${e} input[type="number"]::-webkit-outer-spin-button,\n        ${e} input[type="number"]::-webkit-inner-spin-button {\n          -webkit-appearance: none;\n          margin: 0;\n        }\n\n        ${e} input[type="number"] {\n          -moz-appearance: textfield;\n        }\n\n        ${e}[dir='rtl'] input[type="number"]::placeholder {\n          direction: rtl;\n        }\n\n        ${e}[dir='rtl']:not([step-buttons-visible]):not([has-controls]) input[type="number"]::placeholder {\n          text-align: left;\n        }\n      `]}get clearElement(){return this.$.clearButton}ready(){super.ready(),this.addController(new c.a(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e})),this.addController(new h.a(this.inputElement,this._labelController)),this._tooltipController=new d.a(this),this.addController(this._tooltipController),this._tooltipController.setPosition("top")}checkValidity(){return this.inputElement?this.inputElement.checkValidity():!this.invalid}_decreaseButtonTouchend(e){e.preventDefault(),this._decreaseValue()}_increaseButtonTouchend(e){e.preventDefault(),this._increaseValue()}_decreaseValue(){this._incrementValue(-1)}_increaseValue(){this._incrementValue(1)}_incrementValue(e){if(this.disabled||this.readonly)return;const t=this.step||1;let i=parseFloat(this.value);this.value?i<this.min?(e=0,i=this.min):i>this.max&&(e=0,i=this.max):0===this.min&&e<0||0===this.max&&e>0||0===this.max&&0===this.min?(e=0,i=0):(null==this.max||this.max>=0)&&(null==this.min||this.min<=0)?i=0:this.min>0?(i=this.min,this.max<0&&e<0&&(i=this.max),e=0):this.max<0&&(i=this.max,e<0?e=0:this._getIncrement(1,i-t)>this.max?i-=2*t:i-=t);const s=this._getIncrement(e,i);this.value&&0!==e&&!this._incrementIsInsideTheLimits(e,i)||this._setValue(s)}_setValue(e){this.value=this.inputElement.value=String(parseFloat(e)),this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}_getIncrement(e,t){let i=this.step||1,s=this.min||0;const n=Math.max(this._getMultiplier(t),this._getMultiplier(i),this._getMultiplier(s));i*=n,s*=n;const a=((t=Math.round(t*n))-s)%i;return e>0?(t-a+i)/n:e<0?(t-(a||i))/n:t/n}_getDecimalCount(e){const t=String(e),i=t.indexOf(".");return-1===i?1:t.length-i-1}_getMultiplier(e){if(!isNaN(e))return 10**this._getDecimalCount(e)}_incrementIsInsideTheLimits(e,t){return e<0?null==this.min||this._getIncrement(e,t)>=this.min:e>0?null==this.max||this._getIncrement(e,t)<=this.max:this._getIncrement(e,t)<=this.max&&this._getIncrement(e,t)>=this.min}_allowed(e){const t=e*(this.step||1),i=parseFloat(this.value);return!this.value||!this.disabled&&this._incrementIsInsideTheLimits(t,i)}_stepChanged(e,t){t&&(t.step=e||"any")}_valueChanged(e,t){e&&isNaN(parseFloat(e))?this.value="":"string"!=typeof this.value&&(this.value=String(this.value)),super._valueChanged(this.value,t)}_onKeyDown(e){"ArrowUp"===e.key?(e.preventDefault(),this._increaseValue()):"ArrowDown"===e.key&&(e.preventDefault(),this._decreaseValue()),super._onKeyDown(e)}_isStepButtonVisible(e,t){return e||t}_setHasInputValue(e){const t=e.composedPath()[0];this._hasInputValue=t.value.length>0||t.validity.badInput}}customElements.define(m.is,m);
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
class b extends m{static get is(){return"vaadin-integer-field"}constructor(){super(),this.allowedCharPattern="[-+\\d]"}_valueChanged(e,t){if(""!==e&&!this.__isInteger(e))return console.warn(`Trying to set non-integer value "${e}" to <vaadin-integer-field>. Clearing the value.`),void(this.value="");super._valueChanged(e,t)}_stepChanged(e,t){if(null!=e&&!this.__hasOnlyDigits(e))return console.warn(`<vaadin-integer-field> The \`step\` property must be a positive integer but \`${e}\` was provided, so the property was reset to \`null\`.`),void(this.step=null);super._stepChanged(e,t)}__isInteger(e){return/^(-\d)?\d*$/.test(String(e))}__hasOnlyDigits(e){return/^\d+$/.test(String(e))}}customElements.define(b.is,b);console.warn('WARNING: Since Vaadin 23.2, "@vaadin/vaadin-text-field" is deprecated. Use "@vaadin/integer-field" instead.')},168:function(e,t,i){"use strict";i(125);
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
i(122).a;console.warn('WARNING: Since Vaadin 23.2, "@vaadin/vaadin-checkbox" is deprecated. Use "@vaadin/checkbox" instead.')},169:function(e,t,i){"use strict";i(126);
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
i(100).a;console.warn('WARNING: Since Vaadin 23.2, "@vaadin/vaadin-text-field" is deprecated. Use "@vaadin/text-field" instead.')},175:function(e,t,i){"use strict";i.r(t);var s=i(3),n=(i(168),i(169),i(166),i(102),i(101),i(31)),a=i(72),l=i(1);class r extends s.a{static get properties(){return{isEditMode:{type:Boolean,value:!1},abilities:{type:Array}}}constructor(){super(),this.resetOptions=["","Short Rest","Long Rest"]}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(n.O)()),Object(n.m)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(a.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(a.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(n.m)().removeEventListener("character-selected",this.characterChangeHandler),Object(a.b)().removeEventListener("editModeChange",this.editModeHandler)}updateFromCharacter(e){e&&e.customAbilities?this.set("abilities",Object(l.cloneDeep)(e.customAbilities)):this.set("abilities",[]),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}_addAbility(){Object(n.ib)({name:"",currentSlots:0,slots:1},this.abilities.length),this.isEditMode||Object(a.a)(!0),setTimeout(()=>{const e=this.shadowRoot.querySelectorAll(".ability");e[e.length-1].scrollIntoView()},1)}_deleteAbility(e){const t=e.model.index;Object(n.ab)(t)}_updateAbility(e){const t=e.model.index;Object(n.ib)(e.model.item,t)}_toggleSlot(e){e.preventDefault(),e.stopPropagation();const t=Object(l.findInPath)(".checkbox-wrap",e),i=e.model.item,s=i.slots,a=e.model.index;if("number"!=typeof i.currentSlots&&(i.currentSlots=parseInt(i.currentSlots,10),isNaN(i.currentSlots)&&(i.currentSlots=0)),t){!t.children[0].checked&&i.currentSlots<s?i.currentSlots=i.currentSlots+1:i.currentSlots>0&&(i.currentSlots=i.currentSlots-1)}else i.currentSlots<s?i.currentSlots=i.currentSlots+1:i.currentSlots>0&&(i.currentSlots=i.currentSlots-1);this._setSlotsChecked(i.currentSlots,Object(l.findInPath)(".ability__slots-label-wrap",e)),Object(n.ib)(i,a)}_setSlotsChecked(e,t){const i=t.querySelectorAll("vaadin-checkbox");for(let t=0;t<i.length;t++)i[t].checked=t<e}_exists(){for(let e of arguments)if(e&&(e.constructor!==Object||Object.entries(e).length>0)&&(!Array.isArray(e)||e.length>0))return!0;return!1}_countToArray(e){const t=[];for(var i=0;i<e;i++)t.push(null);return t}_shortRest(){this.abilities&&this.abilities.forEach((e,t)=>{"Short Rest"===e.reset&&(e.currentSlots=0,Object(n.ib)(e,t))})}_longRest(){this.abilities&&this.abilities.forEach((e,t)=>{"Long Rest"===e.reset&&(e.currentSlots=0,Object(n.ib)(e,t))})}_isSlotChecked(e,t){return t<e}static get template(){return s.b`
      <style include="material-styles">
        :host {
          display: block;
          padding: 14px;
        }
        [hidden] {
          display: none !important;
        }

        h2 {
          display: block;
          font-size: 1.5em;
          margin-block-start: 0.83em;
          margin-block-end: 0.83em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          font-weight: bold;
        }

        h3 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 8px;
        }

        .col-wrap {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }

        .heading {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--lumo-contrast-10pct);
        }
        
        .rest-buttons {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }

        .short-rest { 
          margin-left: 10px;
        }

        .abilities {
          width: 100%;
          margin-bottom: var(--tab-bottom-margin);
        }

        .ability {
          width: 100%;
          display: flex;
          align-items: center;
          border-bottom: 1px solid var(--mdc-theme-text-divider-on-background);
          padding: 8px 0;
          position: relative;
          flex-wrap: wrap;
        }

        [edit-mode] .ability__name {
          width: 100%;
        }

        .ability__slots-label-wrap {
          display: flex;
          align-items: center;
        }

        .ability__slots-label-wrap vaadin-integer-field {
          width: 90px;
        }

        .col-wrap:not([edit-mode]) .ability__slots-wrap {
          margin-left: auto;
        }

        .ability__slots {
          cursor: pointer;
          display: flex;
          padding: 4px;
          max-width: 120px;
          flex-wrap: wrap;
        }

        .ability__slots span {
          -youbkit-touch-callout: none;
          -youbkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .ability__slots-label {
          padding-left: 8px;
          width: 64px;
          text-align: center;
          font-size: 12px;
          line-height: 1.4;
          user-select: none;
        }

        .ability__slots-label-suffix {
          user-select: none;
          font-size: 16px;
          padding-left: 6px;
        }

        .ability__delete {
          position: absolute;
          top: 0;
          right: 0;
        }

        .add-ability {
          display: inline-flex;
        }

        vaadin-checkbox {
          pointer-events: none;
        }
        vaadin-select {
          margin-right: 10px;
        }

        @media (min-width: 420px) {
        }

        @media (min-width: 921px) {
        }
      </style>

      <div class="col-wrap" edit-mode$=[[isEditMode]]>
        <div class="heading">
          <h2>Abilities</h2>
          <div class='rest-buttons'>
            <!-- <dnd-button class="long-rest" label="Long Rest" on-click="_longRest"></dnd-button>
            <dnd-button class="short-rest" label="Short Rest" on-click="_shortRest"></dnd-button> -->
            <dnd-button class="add-ability" link edit-mode$="[[isEditMode]]" not-edit-mode$="[[!isEditMode]]" label="Add an Ability" icon="edit"  on-click="_addAbility"></dnd-button>
          </div>
        </div>

        <div class="abilities">
          <template is="dom-repeat" items="[[abilities]]">
            <div class="ability">
              <div class="ability__name">
                <span hidden$="[[isEditMode]]">[[item.name]]<span hidden$="[[_exists(item.name)]]">&lt;No Name&gt;</span></span>
                <vaadin-text-field theme="label--secondary" hidden$="[[!isEditMode]]" label="Name" value="{{item.name}}" on-change="_updateAbility"></vaadin-text-field>
              </div>

              <vaadin-select hidden$="[[!isEditMode]]" value="{{item.reset}}" on-change="_updateAbility" label="Reset" >
                <template>
                  <vaadin-list-box>
                    <template is="dom-repeat" items="[[resetOptions]]">
                      <vaadin-item>[[item]]</vaadin-item>
                    </template>
                  </vaadin-list-box>
                </template>
              </vaadin-select>

              <div hidden$="[[!isEditMode]]" class="ability__usage">
                <vaadin-integer-field min="1" value="{{item.slots}}" on-change="_updateAbility" has-controls label="Usages"></vaadin-integer-field>
              </div>
              
              <div class="ability__slots-wrap" hidden$="[[isEditMode]]">
                <div hidden$="[[item.useNumberField]]" on-click="_toggleSlot" class="ability__slots-label-wrap">
                  <div class="ability__slots">
                    <template is='dom-repeat' items='[[_countToArray(item.slots)]]' as="thing">
                      <span class="checkbox-wrap"><vaadin-checkbox checked="[[_isSlotChecked(item.currentSlots, index)]]"></vaadin-checkbox></span>
                    </template>
                  </div>
                  <span class="ability__slots-label">Uses <span hidden$="[[!item.reset]]"> per </span>[[item.reset]]</span>
                </div>

                <div hidden$="[[!item.useNumberField]]" class="ability__slots-label-wrap">
                  <div>
                    <vaadin-integer-field min="0" max="[[item.slots]]" value="{{item.currentSlots}}" on-change="_updateAbility" has-controls></vaadin-integer-field>
                    <span class="ability__slots-label-suffix"> / [[item.slots]]</span>
                  </div>
                  <span class="ability__slots-label">Uses <span hidden$="[[!item.reset]]"> per </span>[[item.reset]]</span>
                </div>
              </div>
              
              <dnd-button hidden$="[[!isEditMode]]" class="ability__delete" link icon="delete" on-click="_deleteAbility"></dnd-button>

            </div>
          </template>
        </div>
      </div>
    `}}customElements.define("dnd-character-builder-abilities",r)}}]);
//# sourceMappingURL=3.bundle.js.map