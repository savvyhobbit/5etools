(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{110:function(e,t,a){"use strict";var o=a(7),i=a(53),n=a(19),l=a(54),d=a(41),r=a(13);
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
class s extends(Object(d.a)(Object(l.a)(Object(n.a)(Object(i.a)(o.a))))){static get template(){return r.a`
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
`}static get is(){return"vaadin-checkbox"}static get version(){return"2.5.0"}static get properties(){return{checked:{type:Boolean,value:!1,notify:!0,observer:"_checkedChanged",reflectToAttribute:!0},indeterminate:{type:Boolean,notify:!0,observer:"_indeterminateChanged",reflectToAttribute:!0,value:!1},value:{type:String,value:"on"},_nativeCheckbox:{type:Object}}}constructor(){super(),this.name}get name(){return this.checked?this._storedName:""}set name(e){this._storedName=e}ready(){super.ready(),this.setAttribute("role","checkbox"),this._nativeCheckbox=this.shadowRoot.querySelector('input[type="checkbox"]'),this.addEventListener("click",this._handleClick.bind(this)),this._addActiveListeners();const e=this.getAttribute("name");e&&(this.name=e),this.shadowRoot.querySelector('[part~="label"]').querySelector("slot").addEventListener("slotchange",this._updateLabelAttribute.bind(this)),this._updateLabelAttribute()}_updateLabelAttribute(){const e=this.shadowRoot.querySelector('[part~="label"]'),t=e.firstElementChild.assignedNodes();this._isAssignedNodesEmpty(t)?e.setAttribute("empty",""):e.removeAttribute("empty")}_isAssignedNodesEmpty(e){return 0===e.length||1==e.length&&e[0].nodeType==Node.TEXT_NODE&&""===e[0].textContent.trim()}_checkedChanged(e){this.indeterminate?this.setAttribute("aria-checked","mixed"):this.setAttribute("aria-checked",Boolean(e))}_indeterminateChanged(e){e?this.setAttribute("aria-checked","mixed"):this.setAttribute("aria-checked",this.checked)}_addActiveListeners(){this._addEventListenerToNode(this,"down",e=>{this.__interactionsAllowed(e)&&this.setAttribute("active","")}),this._addEventListenerToNode(this,"up",()=>this.removeAttribute("active")),this.addEventListener("keydown",e=>{this.__interactionsAllowed(e)&&32===e.keyCode&&(e.preventDefault(),this.setAttribute("active",""))}),this.addEventListener("keyup",e=>{this.__interactionsAllowed(e)&&32===e.keyCode&&(e.preventDefault(),this._toggleChecked(),this.removeAttribute("active"),this.indeterminate&&(this.indeterminate=!1))})}get focusElement(){return this.shadowRoot.querySelector("input")}__interactionsAllowed(e){return!this.disabled&&"a"!==e.target.localName}_handleClick(e){this.__interactionsAllowed(e)&&(this.indeterminate?(this.indeterminate=!1,e.preventDefault(),this._toggleChecked()):e.composedPath()[0]!==this._nativeCheckbox&&(e.preventDefault(),this._toggleChecked()))}_toggleChecked(){this.checked=!this.checked,this.dispatchEvent(new CustomEvent("change",{composed:!1,bubbles:!0}))}}customElements.define(s.is,s)},113:function(e,t,a){"use strict";a(45),a(30);const o=a(13).a`<dom-module id="lumo-checkbox" theme-for="vaadin-checkbox">
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
</dom-module>`;document.head.appendChild(o.content);a(110)},114:function(e,t,a){"use strict";var o=a(7),i=a(68);a(78),a(112);class n extends o.a{static get properties(){return{label:{type:String,value:""},icon:{type:String,value:""},svg:{type:String,value:""},background:{type:String,value:""},border:{type:String,value:""},svgFill:{type:String,value:""},svgStroke:{type:String,value:""}}}connectedCallback(){setTimeout(()=>{this.button=new i.a(this.$.button)},10)}_exists(e){return!!e}_styleStr(e,t){let a="";return e&&(a+=`background: ${e}; `),t&&(a+=`border: ${t}; `),a}_svgStyleStr(e,t){let a="";return e&&(a+=`fill: ${e}; `),t&&(a+=`stroke: ${t}; `),a}static get template(){return o.b`
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
    `}}customElements.define("dnd-button",n)},115:function(e,t,a){"use strict";a(113),a(110)},130:function(e,t,a){"use strict";a.r(t);var o=a(7),i=(a(77),a(115),a(114),a(1)),n=a(17),l=a(0),d=a(111),r=a(73);class s extends o.a{static get properties(){return{isEditMode:{type:Boolean,value:!1},customRolls:{type:Array}}}connectedCallback(){super.connectedCallback(),this.damageTypes=l.k,this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(n.F)()),Object(n.l)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(d.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(d.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(n.l)().removeEventListener("character-selected",this.characterChangeHandler),Object(d.b)().removeEventListener("editModeChange",this.editModeHandler)}async updateFromCharacter(e){this.customRolls=e.customRolls?Object(i.cloneDeep)(e.customRolls):[],this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}__exists(){for(let e of arguments)if(e&&(e.constructor!==Object||Object.entries(e).length>0)&&(!Array.isArray(e)||e.length>0))return!0;return!1}__abs(e){return e>=0?"+"+e:e}_makeRoll(e){if(!this.isEditMode){let t=e.model.__data.item;t.noHitRoll||Object(r.d)(t.name+" (to hit)",t.toHit,this.$.advMod.checked,this.$.disadvMod.checked),t.damages.forEach((e,a)=>{Object(r.b)(`${t.name} (${e.type} damage)`,e.roll),setTimeout(()=>{},500*(a+1))})}}_rollChangeHandler(e){const t=Object(i.findInPath)(".roll",e).getAttribute("index"),a=parseInt(t,10);Object(n.fb)(this.customRolls[a],a)}_addRoll(){Object(n.fb)({name:"",toHit:0,noHitRoll:!1,damages:[{roll:"",type:""}]},this.customRolls.length)}_removeRoll(e){const t=Object(i.findInPath)(".roll",e).getAttribute("index"),a=parseInt(t,10);Object(n.Q)(a)}_addDamage(e){const t=Object(i.findInPath)(".roll",e).getAttribute("index"),a=parseInt(t,10),o=this.customRolls[a];o.damages.push({roll:"",type:""}),Object(n.fb)(o,a)}_removeDamage(e){const t=Object(i.findInPath)(".roll",e).getAttribute("index"),a=parseInt(t,10),o=Object(i.findInPath)(".roll__damage",e).getAttribute("index"),l=parseInt(o,10);Object(n.R)(a,l)}_or(e,t){return e||t}_orNot(e,t){return e||!t}_isTruthy(e){return!!e}_modChange(e){"advMod"===e.currentTarget.id?this.$.disadvMod.checked=!1:this.$.advMod.checked=!1}static get template(){return o.b`
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
        width: 100%;
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
          margin-right: 16px;
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
//# sourceMappingURL=6.bundle.js.map