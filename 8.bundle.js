(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{175:function(e,t,i){"use strict";i(93),i(43);var a=i(104),n=i(58),l=i(3);
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
`;Object(l.c)("vaadin-number-field",[n.a,a.a,s],{moduleId:"lumo-number-field"});i(75);var d=i(2),o=i(31),r=i(33),c=i(59),p=i(103),u=i(57),h=i(76);
/**
 * @license
 * Copyright (c) 2021 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
Object(l.c)("vaadin-number-field",h.a,{moduleId:"vaadin-number-field-styles"});class m extends(Object(p.a)(Object(l.a)(Object(o.a)(d.a)))){static get is(){return"vaadin-number-field"}static get template(){return d.b`
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
    `}static get properties(){return{hasControls:{type:Boolean,value:!1,reflectToAttribute:!0},stepButtonsVisible:{type:Boolean,value:!1,reflectToAttribute:!0},min:{type:Number},max:{type:Number},step:{type:Number}}}static get observers(){return["_stepChanged(step, inputElement)"]}static get delegateProps(){return[...super.delegateProps,"min","max"]}static get constraints(){return[...super.constraints,"min","max","step"]}constructor(){super(),this._setType("number")}get slotStyles(){const e=this.localName;return[...super.slotStyles,`\n        ${e} input[type="number"]::-webkit-outer-spin-button,\n        ${e} input[type="number"]::-webkit-inner-spin-button {\n          -webkit-appearance: none;\n          margin: 0;\n        }\n\n        ${e} input[type="number"] {\n          -moz-appearance: textfield;\n        }\n\n        ${e}[dir='rtl'] input[type="number"]::placeholder {\n          direction: rtl;\n        }\n\n        ${e}[dir='rtl']:not([step-buttons-visible]):not([has-controls]) input[type="number"]::placeholder {\n          text-align: left;\n        }\n      `]}get clearElement(){return this.$.clearButton}ready(){super.ready(),this.addController(new c.a(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e})),this.addController(new u.a(this.inputElement,this._labelController)),this._tooltipController=new r.a(this),this.addController(this._tooltipController),this._tooltipController.setPosition("top")}checkValidity(){return this.inputElement?this.inputElement.checkValidity():!this.invalid}_decreaseButtonTouchend(e){e.preventDefault(),this._decreaseValue()}_increaseButtonTouchend(e){e.preventDefault(),this._increaseValue()}_decreaseValue(){this._incrementValue(-1)}_increaseValue(){this._incrementValue(1)}_incrementValue(e){if(this.disabled||this.readonly)return;const t=this.step||1;let i=parseFloat(this.value);this.value?i<this.min?(e=0,i=this.min):i>this.max&&(e=0,i=this.max):0===this.min&&e<0||0===this.max&&e>0||0===this.max&&0===this.min?(e=0,i=0):(null==this.max||this.max>=0)&&(null==this.min||this.min<=0)?i=0:this.min>0?(i=this.min,this.max<0&&e<0&&(i=this.max),e=0):this.max<0&&(i=this.max,e<0?e=0:this._getIncrement(1,i-t)>this.max?i-=2*t:i-=t);const a=this._getIncrement(e,i);this.value&&0!==e&&!this._incrementIsInsideTheLimits(e,i)||this._setValue(a)}_setValue(e){this.value=this.inputElement.value=String(parseFloat(e)),this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}_getIncrement(e,t){let i=this.step||1,a=this.min||0;const n=Math.max(this._getMultiplier(t),this._getMultiplier(i),this._getMultiplier(a));i*=n,a*=n;const l=((t=Math.round(t*n))-a)%i;return e>0?(t-l+i)/n:e<0?(t-(l||i))/n:t/n}_getDecimalCount(e){const t=String(e),i=t.indexOf(".");return-1===i?1:t.length-i-1}_getMultiplier(e){if(!isNaN(e))return 10**this._getDecimalCount(e)}_incrementIsInsideTheLimits(e,t){return e<0?null==this.min||this._getIncrement(e,t)>=this.min:e>0?null==this.max||this._getIncrement(e,t)<=this.max:this._getIncrement(e,t)<=this.max&&this._getIncrement(e,t)>=this.min}_allowed(e){const t=e*(this.step||1),i=parseFloat(this.value);return!this.value||!this.disabled&&this._incrementIsInsideTheLimits(t,i)}_stepChanged(e,t){t&&(t.step=e||"any")}_valueChanged(e,t){e&&isNaN(parseFloat(e))?this.value="":"string"!=typeof this.value&&(this.value=String(this.value)),super._valueChanged(this.value,t)}_onKeyDown(e){"ArrowUp"===e.key?(e.preventDefault(),this._increaseValue()):"ArrowDown"===e.key&&(e.preventDefault(),this._decreaseValue()),super._onKeyDown(e)}_isStepButtonVisible(e,t){return e||t}_setHasInputValue(e){const t=e.composedPath()[0];this._hasInputValue=t.value.length>0||t.validity.badInput}}customElements.define(m.is,m);
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
class g extends m{static get is(){return"vaadin-integer-field"}constructor(){super(),this.allowedCharPattern="[-+\\d]"}_valueChanged(e,t){if(""!==e&&!this.__isInteger(e))return console.warn(`Trying to set non-integer value "${e}" to <vaadin-integer-field>. Clearing the value.`),void(this.value="");super._valueChanged(e,t)}_stepChanged(e,t){if(null!=e&&!this.__hasOnlyDigits(e))return console.warn(`<vaadin-integer-field> The \`step\` property must be a positive integer but \`${e}\` was provided, so the property was reset to \`null\`.`),void(this.step=null);super._stepChanged(e,t)}__isInteger(e){return/^(-\d)?\d*$/.test(String(e))}__hasOnlyDigits(e){return/^\d+$/.test(String(e))}}customElements.define(g.is,g);console.warn('WARNING: Since Vaadin 23.2, "@vaadin/vaadin-text-field" is deprecated. Use "@vaadin/integer-field" instead.')},186:function(e,t,i){"use strict";i.r(t);var a=i(2),n=i(32),l=(i(180),i(106),i(175),i(46)),s=i(1),d=i(4);i(178);class o extends a.a{static get properties(){return{selectedBackground:{type:String,value:""},selectedBackgroundRef:{type:Object},selectedRace:{type:String,value:""},selectedRaceRef:{type:Object},isEditMode:{type:Boolean,value:!1},backgroundName:{type:String,value:""},raceName:{type:String,value:""}}}constructor(){super(),this.additionalOptionAddOptions=["Feat","Spell","Attribute +1","Attribute +2","Skill","Language","Tool","Weapon","Armor"]}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(n.U)()),Object(n.q)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(l.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(l.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(n.q)().removeEventListener("character-selected",this.characterChangeHandler),Object(l.b)().removeEventListener("editModeChange",this.editModeHandler)}async updateFromCharacter(e){if(e){this.character=e;let t=0,i=e.addedFeatures?Object.entries(e.addedFeatures).filter(([e,i])=>{if(e.includes("additionalChoice")&&!e.includes("suboptions")){const a=parseInt(e.substring(e.indexOf("_")+1));return a>t&&(t=a),i?(i.index=a,!0):!1}return!1}).map(([e,t])=>(t.key=e,t)):[];this.maxAdditionalOptionsIndex=t,this.set("additionalOptions",i),e.background?(this.selectedBackground=e.background,this.selectedBackgroundRef=await Object(n.o)(),this.backgroundName=this.selectedBackground.name):(this.selectedBackground={},this.selectedBackgroundRef=void 0,this.backgroundName=""),e.race?(this.selectedRace=e.race,this.selectedRaceRef=await Object(n.R)(),this.raceName=this.selectedRace.name):(this.selectedRace={},this.selectedRaceRef=void 0,this.raceName="")}this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}_getRaceLink(e){let t=[e.name];e.source&&t.push(e.source);let i=Object(s.encodeForHash)(t);return e?"#/races/"+i:"#/races"}_getBackgroundLink(e){let t=[e.name];e.source&&t.push(e.source);let i=Object(s.encodeForHash)(t);return e?"#/backgrounds/"+i:"#/backgrounds"}_linkClick(e){const t=e.target.classList.contains("background");this.dispatchEvent(new CustomEvent("open-drawer",{bubbles:!0,composed:!0,detail:{selectedItem:t?this.selectedBackground:this.selectedRace,viewId:t?"backgrounds":"races"}}))}_addAdditionalOption(e){const t=this.$.optionAdd.value;"Spell"!==t?Object(n.a)(t,this.maxAdditionalOptionsIndex+1):this.openAdditionalSpellModal(),this.$.optionAdd.value=""}_deleteAdditionalOption(e){const t=e.model.__data.item.key;Object(n.j)(t)}openAdditionalSpellModal(){this.addtlSpellUsageType="At Will",this.addtlSpellUsageCount=1,this.addtlSpellCastingAbility="inherit",this.addtlSpellUsageProficiency=!1,this.additionalSpellModalOpened=!0}closeAdditionalSpellModal(){this.additionalSpellModalOpened=!1}addAdditionalSpell(){const e={choiceKey:"Spell",addtlSpellUsageType:this.addtlSpellUsageType,addtlSpellUsageProficiency:this.addtlSpellUsageProficiency,addtlSpellUsageCount:this.addtlSpellUsageCount,addtlSpellCastingAbility:this.addtlSpellCastingAbility};switch(this.addtlSpellUsageType){case"At Will":e.additionalSpells=[{innate:{_:[{choose:"level=1;2;3;4;5;6;7;8;9"}]}}];break;case"Known":e.additionalSpells=[{known:{_:[{choose:"level=1;2;3;4;5;6;7;8;9"}]}}];break;case"Long Rest":e.additionalSpells=[{innate:{_:{daily:{}}}}],e.additionalSpells[0].innate._.daily[""+(this.addtlSpellUsageProficiency?"proficiency":this.addtlSpellUsageCount||1)]=[{choose:"level=1;2;3;4;5;6;7;8;9"}];break;case"Short Rest":e.additionalSpells=[{innate:{_:{rest:{}}}}],e.additionalSpells[0].innate._.rest[""+(this.addtlSpellUsageProficiency?"proficiency":this.addtlSpellUsageCount||1)]=[{choose:"level=1;2;3;4;5;6;7;8;9"}];break;case"Ritual":e.additionalSpells=[{innate:{_:{ritual:[{choose:"level=1;2;3;4;5;6;7;8;9|components & miscellaneous=ritual"}]}}}]}e.additionalSpells&&(this.addtlSpellCastingAbility&&"inherit"!==this.addtlSpellCastingAbility&&(e.additionalSpells[0].ability=this.addtlSpellCastingAbility),this.character.addedFeatures||(this.character.addedFeatures={}),this.character.addedFeatures["additionalChoice_"+(this.maxAdditionalOptionsIndex+1)]=e,saveCharacter(this.character)),this.closeAdditionalSpellModal()}_showEmpty(e,t){return!e&&!t}_spellUsageText(e){let t="";return this._dailyOrRest(e.addtlSpellUsageType)?(e.addtlSpellUsageProficiency?t+="Proficiency Bonus times":"1"===e.addtlSpellUsageCount?t+="Once":t+=e.addtlSpellUsageCount+" times",t+=" per "+e.addtlSpellUsageType):"Ritual"===e.addtlSpellUsageType?t+="Ritual only":t+=e.addtlSpellUsageType,t+=".","inherit"!==e.addtlSpellCastingAbility&&(t+=` ${d.a.ATB_ABV_TO_FULL[e.addtlSpellCastingAbility]} is your spellcasting ability.`),t}_exists(){for(let e of arguments)if(e&&(e.constructor!==Object||Object.entries(e).length>0)&&(!Array.isArray(e)||e.length>0))return!0;return!1}_equal(e,t){return e===t}_dailyOrRest(e){return"Long Rest"===e||"Short Rest"===e}static get template(){return a.b`
      <style include="material-styles my-styles">
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
          margin-bottom: 32px;
        }

        .row-wrap > *:not(h2):not(:last-child) {
          margin-bottom: 10px;
        }

        .heading {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--lumo-contrast-10pct);
        }
        .reference-link:hover {
          color: var(--mdc-theme-secondary);
        }

        .missing-text {
          font-style: italic;
          font-size: 14px;
        }

        @media(min-width: 420px) {
          .heading {
            justify-content: flex-start;
          }
          .reference-link {
            margin-left: 8px;
          }
        }

        @media(min-width: 921px) {
          .row-wrap {
            width: calc(50% - 10px);
          }
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
        .details-container  {
          background: var(--lumo-contrast-10pct);
          padding: 14px;
          border-radius: 4px;
          font-size: 14px;
        }
        .stats-wrapper.margin-bottom_large {
          margin-bottom: 0px !important;
        }
        .spell-usage-text {
          font-size: 14px;
          margin-left: 30px;
          font-style: italic;
          margin-bottom: -10px;
        }
        .extra-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;
          height: 48px;
        }
        vaadin-select[add-button] {
          cursor: pointer;
          margin-left: 20px;
          --lumo-font-size-m: 20px;
          --vaadin-text-field-default-width: 0;
        }
        
        dnd-select-add {
          --lumo-font-size-m: 20px;
          width: 100%;
        }

        dnd-character-builder-suboptions {
          display: block;
          margin-left: 30px;
        }
      </style>

      <div class="col-wrap">
        <div class="row-wrap">
          <div class="heading">
            <h2>Race</h2>
            <button class="mdc-icon-button material-icons" on-click="_linkClick">logout</button>
          </div>
          <div class="missing-text" hidden$="[[_exists(selectedRaceRef)]]">Enter edit mode to select a Race.</div>
          <dnd-select-add model="races" value="[[selectedRace]]" placeholder="<Choose Race>" disabled$="[[!isEditMode]]" hidden$="[[_showEmpty(isEditMode, selectedRace)]]"></dnd-select-add>
          <dnd-character-builder-suboptions label="Race" storage-key="race" selected-item="[[selectedRaceRef]]"></dnd-character-builder-suboptions>
        </div>

        <div class="row-wrap">
          <div class="heading">
            <h2>Background</h2>
            <button class="mdc-icon-button material-icons background" on-click="_linkClick">logout</button>
          </div>
          <div class="missing-text" hidden$="[[_exists(selectedBackgroundRef)]]">Enter edit mode to select a Background.</div>
          <dnd-select-add model="backgrounds" value="[[selectedBackground]]" placeholder="<Choose Background>" disabled$="[[!isEditMode]]" hidden$="[[_showEmpty(isEditMode, selectedBackground)]]"></dnd-select-add>
          <dnd-character-builder-suboptions label="Background" storage-key="background" selected-item="[[selectedBackgroundRef]]"></dnd-character-builder-suboptions>
        </div>

        <div class="row-wrap">
          <div class="heading">
            <h2>Extra Features</h2>
            <vaadin-select add-button id="optionAdd" class="label--secondary" on-change="_addAdditionalOption" placeholder="<Add Additional Feature>" disabled$="[[!isEditMode]]" hidden$="[[!isEditMode]]">
              <template>
                <vaadin-list-box>
                  <template is="dom-repeat" items="[[additionalOptionAddOptions]]">
                    <vaadin-item>[[item]]</vaadin-item>
                  </template>
                </vaadin-list-box>
              </template>
            </vaadin-select>
          </div>

          <div class="added-options">
            <template is="dom-repeat" items="[[additionalOptions]]">
              <div>
                <div class="extra-title">
                  Extra [[item.choiceKey]]
                  <button hidden$="[[!isEditMode]]" class="mdc-icon-button material-icons" on-click="_deleteAdditionalOption">delete</button>
                </div>
                <div class="spell-usage-text" hidden="[[!_equal(item.choiceKey, 'Spell')]]" inner-h-t-m-l="[[_spellUsageText(item)]]"></div>
                <dnd-character-builder-suboptions label="Extra [[item.choiceKey]]" storage-key="[[item.key]]" selected-item="[[item]]"></dnd-character-builder-suboptions>
              </div>
            </template>
          </div>
        </div>

        <vaadin-dialog opened="[[additionalSpellModalOpened]]">
          <template>
            <style>
              h2 {
                margin: 0;
              }
              .modal-content {
                display: flex;
                justify-content: center;
                flex-direction: column;
              }
              .modal-footer {
                display: flex;
                justify-content: space-between;
                margin-top: 20px;
              }
              .modal-footer dnd-button:last-child {
                --mdc-theme-primary: var(--mdc-theme-error);
              }
              .modal-footer dnd-button:first-child {
                margin-right: 40px;
              }
              .use-wrap {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-top: 10px;
              }
              [hidden] {
                display: none !important;
              }
            </style>
            <div class="modal-content">
              <h2>Additional Spell Options</h2>
              
              <vaadin-select label="Spell Usage" value="{{addtlSpellUsageType}}">
                <template>
                  <vaadin-list-box>
                    <vaadin-item>At Will</vaadin-item>
                    <vaadin-item>Long Rest</vaadin-item>
                    <vaadin-item>Short Rest</vaadin-item>
                    <vaadin-item>Known</vaadin-item>
                    <vaadin-item>Ritual</vaadin-item>
                  </vaadin-list-box>
                </template>
              </vaadin-select>

              <div class="use-wrap" hidden$="[[!_dailyOrRest(addtlSpellUsageType)]]">
                <dnd-switch label='Set Usage' secondary-label='Proficiency Usage' checked={{addtlSpellUsageProficiency}}></dnd-switch>
                <vaadin-integer-field hidden$="[[addtlSpellUsageProficiency]]" has-controls label="Uses" min="1" max="10" value="{{addtlSpellUsageCount}}"></vaadin-integer-field>
              </div>

              <vaadin-select value="{{addtlSpellCastingAbility}}" label="Spellcasting Ability">
                <template>
                  <vaadin-list-box>
                    <vaadin-item value='inherit'>Inherit</vaadin-item>
                    <vaadin-item value='str'>Strength</vaadin-item>
                    <vaadin-item value='dex'>Dexterity</vaadin-item>
                    <vaadin-item value='con'>Constitution</vaadin-item>
                    <vaadin-item value='wis'>Wisdom</vaadin-item>
                    <vaadin-item value='int'>Intelligence</vaadin-item>
                    <vaadin-item value='cha'>Charisma</vaadin-item>
                  </vaadin-list-box>
                </template>
              </vaadin-select>
            </div>
            <div class="modal-footer">
              <dnd-button label="Add Spell" border on-click="addAdditionalSpell"></dnd-button>
              <dnd-button label="Cancel" border on-click="closeAdditionalSpellModal"></dnd-button>
            </div>
          </template>
        </vaadin-dialog>
      </div>
    `}}customElements.define("dnd-character-builder-background-race",o)}}]);
//# sourceMappingURL=8.bundle.js.map