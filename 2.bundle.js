(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{144:function(e,t,i){"use strict";i(56),i(59),i(78);const n=i(7).a`<dom-module id="lumo-number-field" theme-for="vaadin-number-field">
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
</dom-module>`;document.head.appendChild(n.content);i(77),i(3),i(43);var s=i(65),a=i(33);
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
const l=document.createElement("template");let r;l.innerHTML='<dom-module id="vaadin-number-field-template">\n  <template>\n    <style>\n      :host([readonly]) [part$="button"] {\n        pointer-events: none;\n      }\n\n      [part="decrease-button"]::before {\n        content: "−";\n      }\n\n      [part="increase-button"]::before {\n        content: "+";\n      }\n\n      [part="decrease-button"],\n      [part="increase-button"] {\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n      }\n\n      /* Hide the native arrow icons */\n      [part="value"]::-webkit-outer-spin-button,\n      [part="value"]::-webkit-inner-spin-button {\n        -webkit-appearance: none;\n        margin: 0;\n      }\n\n      [part="value"] {\n        /* Older Firefox versions (v47.0) requires !important */\n        -moz-appearance: textfield !important;\n      }\n\n      :host([dir="rtl"]) [part="input-field"] {\n        direction: ltr;\n      }\n\n      :host([dir="rtl"]) [part="value"]::placeholder {\n        direction: rtl;\n      }\n\n      :host([dir="rtl"]) [part="input-field"] ::slotted(input)::placeholder {\n        direction: rtl;\n      }\n\n      :host([dir="rtl"]) [part="value"]:-ms-input-placeholder,\n      :host([dir="rtl"]) [part="input-field"] ::slotted(input):-ms-input-placeholder {\n        direction: rtl;\n      }\n\n      :host([dir="rtl"]:not([has-controls])) [part="value"]::placeholder {\n        text-align: left;\n      }\n\n      :host([dir="rtl"]:not([has-controls])) [part="input-field"] ::slotted(input)::placeholder {\n        text-align: left;\n      }\n\n      :host([dir="rtl"]:not([has-controls])) [part="value"]:-ms-input-placeholder,\n      :host([dir="rtl"]:not([has-controls])) [part="input-field"] ::slotted(input):-ms-input-placeholder {\n        text-align: left;\n      }\n    </style>\n\n    <div disabled$="[[!_allowed(-1, value, min, max, step)]]" part="decrease-button" on-click="_decreaseValue" on-touchend="_decreaseButtonTouchend" hidden$="[[!hasControls]]">\n    </div>\n\n    <div disabled$="[[!_allowed(1, value, min, max, step)]]" part="increase-button" on-click="_increaseValue" on-touchend="_increaseButtonTouchend" hidden$="[[!hasControls]]">\n    </div>\n  </template>\n\n  \n</dom-module>',document.head.appendChild(l.content);class o extends s.a{static get is(){return"vaadin-number-field"}static get version(){return"2.6.2"}static get properties(){return{hasControls:{type:Boolean,value:!1,reflectToAttribute:!0},min:{type:Number,reflectToAttribute:!0,observer:"_minChanged"},max:{type:Number,reflectToAttribute:!0,observer:"_maxChanged"},step:{type:Number,value:1,observer:"_stepChanged"}}}ready(){super.ready(),this.__previousValidInput=this.value||"",this.inputElement.type="number",this.inputElement.addEventListener("change",this.__onInputChange.bind(this))}_decreaseButtonTouchend(e){e.preventDefault(),this._decreaseValue()}_increaseButtonTouchend(e){e.preventDefault(),this._increaseValue()}static get template(){if(!r){r=super.template.cloneNode(!0);const e=a.a.import(this.is+"-template","template"),t=e.content.querySelector('[part="decrease-button"]'),i=e.content.querySelector('[part="increase-button"]'),n=e.content.querySelector("style"),s=r.content.querySelector('[part="input-field"]'),l=r.content.querySelector('[name="prefix"]');s.insertBefore(t,l),s.appendChild(i),r.content.appendChild(n)}return r}_createConstraintsObserver(){this._createMethodObserver("_constraintsChanged(required, minlength, maxlength, pattern, min, max, step)")}_constraintsChanged(e,t,i,n,s,a,l){if(!this.invalid)return;const r=e=>!e&&0!==e;r(s)&&r(a)?super._constraintsChanged(e,t,i,n):this.validate()}_decreaseValue(){this._incrementValue(-1)}_increaseValue(){this._incrementValue(1)}_incrementValue(e){if(this.disabled||this.readonly)return;let t=parseFloat(this.value);this.value?t<this.min?(e=0,t=this.min):t>this.max&&(e=0,t=this.max):0==this.min&&e<0||0==this.max&&e>0||0==this.max&&0==this.min?(e=0,t=0):(null==this.max||this.max>=0)&&(null==this.min||this.min<=0)?t=0:this.min>0?(t=this.min,this.max<0&&e<0&&(t=this.max),e=0):this.max<0&&(t=this.max,e<0?e=0:this._getIncrement(1,t-this.step)>this.max?t-=2*this.step:t-=this.step);const i=this._getIncrement(e,t);this.value&&0!=e&&!this._incrementIsInsideTheLimits(e,t)||this._setValue(i)}_setValue(e){this.value=this.inputElement.value=String(parseFloat(e)),this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}_getIncrement(e,t){let i=this.step||1,n=this.min||0;const s=Math.max(this._getMultiplier(t),this._getMultiplier(i),this._getMultiplier(n));i*=s,n*=s;const a=((t=Math.round(t*s))-n)%i;return e>0?(t-a+i)/s:e<0?(t-(a||i))/s:t/s}_getDecimalCount(e){const t=String(e),i=t.indexOf(".");return-1===i?1:t.length-i-1}_getMultiplier(e){if(!isNaN(e))return Math.pow(10,this._getDecimalCount(e))}_incrementIsInsideTheLimits(e,t){return e<0?null==this.min||this._getIncrement(e,t)>=this.min:e>0?null==this.max||this._getIncrement(e,t)<=this.max:this._getIncrement(e,t)<=this.max&&this._getIncrement(e,t)>=this.min}_allowed(e){const t=e*(this.step||1),i=parseFloat(this.value);return!this.value||!this.disabled&&this._incrementIsInsideTheLimits(t,i)}_stepChanged(e){this.__validateByStep=this.__stepChangedCalled||null!==this.getAttribute("step"),this.inputElement.step=this.__validateByStep?e:"any",this.__stepChangedCalled=!0,this.setAttribute("step",e)}_minChanged(e){this.inputElement.min=e}_maxChanged(e){this.inputElement.max=e}_valueChanged(e,t){e&&isNaN(parseFloat(e))?this.value="":"string"!=typeof this.value&&(this.value=String(this.value)),super._valueChanged(this.value,t)}_onKeyDown(e){38==e.keyCode?(e.preventDefault(),this._increaseValue()):40==e.keyCode&&(e.preventDefault(),this._decreaseValue()),super._onKeyDown(e)}__onInputChange(){this.validate()}checkValidity(){return void 0!==this.min||void 0!==this.max||this.__validateByStep?this.inputElement.checkValidity():super.checkValidity()}}window.customElements.define(o.is,o);
/**
@license
Copyright (c) 2019 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
const d=document.createElement("template");d.innerHTML='<dom-module id="vaadin-integer-field-template">\n\n  \n</dom-module>',document.head.appendChild(d.content);class c extends o{static get is(){return"vaadin-integer-field"}static get version(){return"2.6.2"}static get properties(){return{pattern:String,preventInvalidInput:Boolean,minlength:Number,maxlength:Number}}ready(){super.ready(),this._enabledCharPattern="[-+\\d]"}_valueChanged(e,t){if(""!==e&&!this.__isInteger(e))return console.warn(`Trying to set non-integer value "${e}" to <vaadin-integer-field>. Clearing the value.`),void(this.value="");super._valueChanged(e,t)}_stepChanged(e,t){if(!this.__hasOnlyDigits(e))return console.warn(`Trying to set invalid step size "${e}", which is not a positive integer, to <vaadin-integer-field>. Resetting the default value 1.`),void(this.step=1);super._stepChanged(e,t)}__isInteger(e){return/^(-\d)?\d*$/.test(String(e))}__hasOnlyDigits(e){return/^\d*$/.test(String(e))}}window.customElements.define(c.is,c)},145:function(e,t,i){"use strict";i(91),i(106)},146:function(e,t,i){"use strict";i(77)},152:function(e,t,i){"use strict";i.r(t);var n=i(3),s=(i(145),i(146),i(144),i(89),i(88),i(32)),a=i(142),l=i(1);class r extends n.a{static get properties(){return{isEditMode:{type:Boolean,value:!1},abilities:{type:Array}}}constructor(){super(),this.resetOptions=["","Short Rest","Long Rest"]}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(s.F)()),Object(s.l)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(a.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(a.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(s.l)().removeEventListener("character-selected",this.characterChangeHandler),Object(a.b)().removeEventListener("editModeChange",this.editModeHandler)}updateFromCharacter(e){e&&e.customAbilities?this.set("abilities",Object(l.cloneDeep)(e.customAbilities)):this.set("abilities",[]),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}_addAbility(){Object(s.Z)({name:"",currentSlots:0,slots:1},this.abilities.length),this.isEditMode||Object(a.a)(!0),setTimeout(()=>{const e=this.shadowRoot.querySelectorAll(".ability");e[e.length-1].scrollIntoView()},1)}_deleteAbility(e){const t=e.model.index;Object(s.Q)(t)}_updateAbility(e){const t=e.model.index;Object(s.Z)(e.model.item,t)}_toggleSlot(e){e.preventDefault(),e.stopPropagation();const t=Object(l.findInPath)(".checkbox-wrap",e),i=e.model.item,n=i.slots,a=e.model.index;if("number"!=typeof i.currentSlots&&(i.currentSlots=parseInt(i.currentSlots,10),isNaN(i.currentSlots)&&(i.currentSlots=0)),t){!t.children[0].checked&&i.currentSlots<n?i.currentSlots=i.currentSlots+1:i.currentSlots>0&&(i.currentSlots=i.currentSlots-1)}else i.currentSlots<n?i.currentSlots=i.currentSlots+1:i.currentSlots>0&&(i.currentSlots=i.currentSlots-1);this._setSlotsChecked(i.currentSlots,Object(l.findInPath)(".ability__slots-label-wrap",e)),Object(s.Z)(i,a)}_setSlotsChecked(e,t){const i=t.querySelectorAll("vaadin-checkbox");for(let t=0;t<i.length;t++)i[t].checked=t<e}_exists(){for(let e of arguments)if(e&&(e.constructor!==Object||Object.entries(e).length>0)&&(!Array.isArray(e)||e.length>0))return!0;return!1}_countToArray(e){const t=[];for(var i=0;i<e;i++)t.push(null);return t}_shortRest(){this.abilities&&this.abilities.forEach((e,t)=>{"Short Rest"===e.reset&&(e.currentSlots=0,Object(s.Z)(e,t))})}_longRest(){this.abilities&&this.abilities.forEach((e,t)=>{"Long Rest"===e.reset&&(e.currentSlots=0,Object(s.Z)(e,t))})}_isSlotChecked(e,t){return t<e}static get template(){return n.b`
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
          margin-bottom: 200px;
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
            <dnd-button class="add-ability link" edit-mode$="[[isEditMode]]" not-edit-mode$="[[!isEditMode]]" label="Add an Ability" icon="edit"  on-click="_addAbility"></dnd-button>
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
              
              <dnd-button hidden$="[[!isEditMode]]" class="ability__delete link" icon="delete" on-click="_deleteAbility"></dnd-button>

            </div>
          </template>
        </div>
      </div>
    `}}customElements.define("dnd-character-builder-abilities",r)}}]);
//# sourceMappingURL=2.bundle.js.map