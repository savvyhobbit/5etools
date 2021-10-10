(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{108:function(e,t,a){"use strict";var i=a(7),o=a(53),d=a(19),n=a(54),l=a(43),r=a(13);
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
class s extends(Object(l.a)(Object(n.a)(Object(d.a)(Object(o.a)(i.a))))){static get template(){return r.a`
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
`}static get is(){return"vaadin-checkbox"}static get version(){return"2.5.0"}static get properties(){return{checked:{type:Boolean,value:!1,notify:!0,observer:"_checkedChanged",reflectToAttribute:!0},indeterminate:{type:Boolean,notify:!0,observer:"_indeterminateChanged",reflectToAttribute:!0,value:!1},value:{type:String,value:"on"},_nativeCheckbox:{type:Object}}}constructor(){super(),this.name}get name(){return this.checked?this._storedName:""}set name(e){this._storedName=e}ready(){super.ready(),this.setAttribute("role","checkbox"),this._nativeCheckbox=this.shadowRoot.querySelector('input[type="checkbox"]'),this.addEventListener("click",this._handleClick.bind(this)),this._addActiveListeners();const e=this.getAttribute("name");e&&(this.name=e),this.shadowRoot.querySelector('[part~="label"]').querySelector("slot").addEventListener("slotchange",this._updateLabelAttribute.bind(this)),this._updateLabelAttribute()}_updateLabelAttribute(){const e=this.shadowRoot.querySelector('[part~="label"]'),t=e.firstElementChild.assignedNodes();this._isAssignedNodesEmpty(t)?e.setAttribute("empty",""):e.removeAttribute("empty")}_isAssignedNodesEmpty(e){return 0===e.length||1==e.length&&e[0].nodeType==Node.TEXT_NODE&&""===e[0].textContent.trim()}_checkedChanged(e){this.indeterminate?this.setAttribute("aria-checked","mixed"):this.setAttribute("aria-checked",Boolean(e))}_indeterminateChanged(e){e?this.setAttribute("aria-checked","mixed"):this.setAttribute("aria-checked",this.checked)}_addActiveListeners(){this._addEventListenerToNode(this,"down",e=>{this.__interactionsAllowed(e)&&this.setAttribute("active","")}),this._addEventListenerToNode(this,"up",()=>this.removeAttribute("active")),this.addEventListener("keydown",e=>{this.__interactionsAllowed(e)&&32===e.keyCode&&(e.preventDefault(),this.setAttribute("active",""))}),this.addEventListener("keyup",e=>{this.__interactionsAllowed(e)&&32===e.keyCode&&(e.preventDefault(),this._toggleChecked(),this.removeAttribute("active"),this.indeterminate&&(this.indeterminate=!1))})}get focusElement(){return this.shadowRoot.querySelector("input")}__interactionsAllowed(e){return!this.disabled&&"a"!==e.target.localName}_handleClick(e){this.__interactionsAllowed(e)&&(this.indeterminate?(this.indeterminate=!1,e.preventDefault(),this._toggleChecked()):e.composedPath()[0]!==this._nativeCheckbox&&(e.preventDefault(),this._toggleChecked()))}_toggleChecked(){this.checked=!this.checked,this.dispatchEvent(new CustomEvent("change",{composed:!1,bubbles:!0}))}}customElements.define(s.is,s)},111:function(e,t,a){"use strict";a(45),a(30);const i=a(13).a`<dom-module id="lumo-checkbox" theme-for="vaadin-checkbox">
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
</dom-module>`;document.head.appendChild(i.content);a(108)},112:function(e,t,a){"use strict";a(111),a(108)},127:function(e,t,a){"use strict";a.r(t);var i=a(7),o=(a(76),a(112),a(1)),d=a(18),n=a(0),l=a(109),r=a(73);class s extends i.a{static get properties(){return{isEditMode:{type:Boolean,value:!1},customRolls:{type:Array}}}connectedCallback(){super.connectedCallback(),this.damageTypes=n.k,this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(d.G)()),Object(d.m)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(l.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(l.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(d.m)().removeEventListener("character-selected",this.characterChangeHandler),Object(l.b)().removeEventListener("editModeChange",this.editModeHandler)}async updateFromCharacter(e){this.customRolls=e.customRolls?Object(o.cloneDeep)(e.customRolls):[],this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}__exists(){for(let e of arguments)if(e&&(e.constructor!==Object||Object.entries(e).length>0)&&(!Array.isArray(e)||e.length>0))return!0;return!1}__abs(e){return e>=0?"+"+e:e}_makeRoll(e){if(!this.isEditMode){let t=e.model.__data.item;t.noHitRoll||Object(r.d)(t.name+" (to hit)",t.toHit,this.$.advMod.checked,this.$.disadvMod.checked),t.damages.forEach((e,a)=>{setTimeout(()=>{Object(r.b)(`${t.name} (${e.type} damage)`,e.roll)},300*(a+1))})}}_rollChangeHandler(e){const t=Object(o.findInPath)(".roll",e).getAttribute("index"),a=parseInt(t,10);Object(d.fb)(this.customRolls[a],a)}_addRoll(){Object(d.fb)({name:"",toHit:0,noHitRoll:!1,damages:[{roll:"",type:""}]},this.customRolls.length)}_removeRoll(e){const t=Object(o.findInPath)(".roll",e).getAttribute("index"),a=parseInt(t,10);Object(d.Q)(a)}_addDamage(e){const t=Object(o.findInPath)(".roll",e).getAttribute("index"),a=parseInt(t,10),i=this.customRolls[a];i.damages.push({roll:"",type:""}),Object(d.fb)(i,a)}_removeDamage(e){const t=Object(o.findInPath)(".roll",e).getAttribute("index"),a=parseInt(t,10),i=Object(o.findInPath)(".roll__damage",e).getAttribute("index"),n=parseInt(i,10);Object(d.R)(a,n)}_or(e,t){return e||t}_orNot(e,t){return e||!t}_isTruthy(e){return!!e}_modChange(e){"advMod"===e.currentTarget.id?this.$.disadvMod.checked=!1:this.$.advMod.checked=!1}static get template(){return i.b`
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

      h2 {
        margin-bottom: 24px;
      }

      .rolls__add-button {
        margin-bottom: 16px;
        display: inline-flex;
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
      }

      @media(min-width: 921px) {
        :host {
          padding-right: 0px;
        }
        .roll {
          max-width: 380px;
          margin-right: 16px;
        }
        .rolls {
          display: flex;
          flex-wrap: wrap;
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
        <h2>Rolls</h2>


        <dnd-button hidden$="[[!isEditMode]]" on-click="_addRoll" label="Add Roll" icon="add" class="rolls__add-button"></dnd-button>
        <div hidden$="[[isEditMode]]" class="rolls__toolbar">
          <h4>Roll Modifiers:</h4>
          <div>
            <vaadin-checkbox id='advMod' on-change="_modChange">Advantage</vaadin-checkbox>
            <vaadin-checkbox id='disadvMod' on-change="_modChange">Disadvantage</vaadin-checkbox>
          </div>
        </div>

        <div class="rolls rolls--custom">

          <template is="dom-repeat" items="[[customRolls]]">
            <div class="roll" on-click="_makeRoll" index$="[[index]]">
              <div class="roll-header">
                <h3 hidden$="[[isEditMode]]">[[item.name]]<span hidden$="[[_isTruthy(item.name)]]">&lt;No Name&gt;</span></h3>
                <vaadin-text-field hidden$="[[!isEditMode]]" value="{{item.name}}" on-change="_rollChangeHandler" label="Name"></vaadin-text-field>
                <dnd-button hidden$="[[!isEditMode]]" label="Remove" icon="remove" on-click="_removeRoll"></dnd-button>
              </div>

              <div class="roll-footer">
                <div class="roll__to-hit">
                  <span hidden$="[[_or(item.noHitRoll, isEditMode)]]"><span>[[__abs(item.toHit)]]</span> to hit</span>
                  <vaadin-integer-field hidden$="[[_orNot(item.noHitRoll, isEditMode)]]" value="{{item.toHit}}" on-change="_rollChangeHandler" min="-20" max="20" has-controls label="To Hit"></vaadin-integer-field>
                  <dnd-switch hidden$="[[!isEditMode]]" label='Attack Roll' secondary-label='Damage Only' initial-value="[[item.noHitRoll]]" checked={{item.noHitRoll}} on-switch-change="_rollChangeHandler" ></dnd-switch>
                </div>

                <div class="roll__damages">
                  <template is="dom-repeat" items="[[item.damages]]" as="damage">
                    <div class="roll__damage" index$="[[index]]">
                      <dnd-button hidden$="[[!isEditMode]]" on-click="_removeDamage" icon="remove" class='roll__damage-remove icon-only'></dnd-button>
                      <span class="roll__damage-roll" hidden$="[[isEditMode]]" >[[damage.roll]]</span>
                      <div class="roll__damage-roll--edit" hidden$="[[!isEditMode]]">
                        <vaadin-text-field value="{{damage.roll}}" on-change="_rollChangeHandler" label="Damage Roll"></vaadin-text-field>
                      </div>
                      <span class="roll__damage-type" hidden$="[[isEditMode]]">&nbsp;[[damage.type]] damage</span>
                      <div class="roll__damage-type--edit" hidden$="[[!isEditMode]]">
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
                  <dnd-button hidden$="[[!isEditMode]]" on-click="_addDamage" label="Add Damage" icon="add" class="roll__add-damage"></dnd-button>
                </div>
              </div>
            </div>
          </template>
        </div>

      </div>
    </div>
    `}}customElements.define("dnd-character-builder-rolls",s)}}]);
//# sourceMappingURL=5.bundle.js.map