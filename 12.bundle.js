(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{129:function(e,t,a){"use strict";a.r(t);var i=a(7),d=a(17),c=a(110),o=a(1);class r extends i.a{static get properties(){return{selectedBackground:{type:String,value:""},backgroundSkillProfOptions:{type:Object,value:[]},defaultBackgroundSkillProf:{type:String,value:""},selectedRace:{type:String,value:""},raceAttributeOptions:{type:Object,value:[]},defaultRaceAttribute:{type:String,value:""},isEditMode:{type:Boolean,value:!1},backgroundName:{type:String,value:""},raceName:{type:String,value:""}}}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(d.G)()),Object(d.m)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(c.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(c.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(d.m)().removeEventListener("character-selected",this.characterChangeHandler),Object(c.b)().removeEventListener("editModeChange",this.editModeHandler)}async updateFromCharacter(e){this.selectedBackground=e.background,this.backgroundName=this.selectedBackground.name,this.selectedRace=e.race,this.raceName=this.selectedRace.name;let t=await Object(d.k)();t&&t.choose?(this.backgroundSkillProfOptions=t.choose.from,this.backgroundSkillProfChoices=t.choose.count||1,this.backgroundSkillProfSelections=e.backgroundSkillProficiencies):(this.backgroundSkillProfOptions=void 0,this.backgroundSkillProfChoices=void 0,this.backgroundSkillProfSelections=void 0);let a=await Object(d.j)(t);this.defaultBackgroundSkillProf=a.map(e=>Object(o.util_capitalizeAll)(e)).join(", ");let i=await Object(d.F)();i&&i.choose?(this.raceAttributeOptions=i.choose.from.map(e=>e.toUpperCase()),this.raceAttributeChoices=i.choose.count||1,this.raceAttributeSelections=e.raceAttributes):(this.raceAttributeOptions=void 0,this.raceAttributeChoices=void 0,this.raceAttributeSelections=void 0);let c=await Object(d.E)(i);this.defaultRaceAttribute=c.map(e=>{let t=e[0].toLowerCase(),a=e[1];return t.toUpperCase()+" "+Object(o.absInt)(a)}).join(", "),Object(o.initCollapseToggles)(this.shadowRoot),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}_backgroundSkillAddCallback(e){Object(d.bb)(e)}_raceAttributeAddCallback(e){Object(d.mb)(e)}_getRaceLink(e){let t=[e.name];e.source&&t.push(e.source);let a=Object(o.encodeForHash)(t);return e?"#/races/"+a:"#/races"}_getBackgroundLink(e){let t=[e.name];e.source&&t.push(e.source);let a=Object(o.encodeForHash)(t);return e?"#/backgrounds/"+a:"#/backgrounds"}_showEmpty(e,t){return!e&&!t}_exists(){for(let e of arguments)if(e&&(e.constructor!==Object||Object.entries(e).length>0)&&(!Array.isArray(e)||e.length>0))return!0;return!1}static get template(){return i.b`
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
        }

        .row-wrap {
          width: 100%;
        }
        .row-wrap:first-child {
          margin-bottom: 24px;
        }

        .row-wrap > *:not(h2):not(:last-child) {
          margin-bottom: 10px;
        }

        .heading {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
        .reference-link:hover {
          color: var(--mdc-theme-secondary);
        }

        .default-selection {
          font-size: 14px;
          margin-bottom: 0 !important;
        }

        .default-selection span {
          color: var(--mdc-theme-secondary)
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
          .row-wrap:first-child {
            margin-bottom: 0;
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
      </style>

      <div class="col-wrap">
        <div class="row-wrap">
          <div class="heading">
            <h2>Race</h2>
            <a class="reference-link mdc-icon-button material-icons" href="[[_getRaceLink(selectedRace)]]">launch</a>
          </div>
          <dnd-select-add model="races" value="[[selectedRace]]" placeholder="<Choose Race>" disabled$="[[!isEditMode]]" hidden$="[[_showEmpty(isEditMode, selectedRace)]]"></dnd-select-add>
          <div class="missing-text" hidden$="[[_exists(raceAttributeOptions, defaultRaceAttribute)]]">Select Race to add Attribute Bonuses</div>
          <div hidden$="[[!_exists(raceAttributeOptions, defaultRaceAttribute)]]">Attribute Bonuses from Race:</div>
          <div hidden$="[[!_exists(defaultRaceAttribute)]]" class="default-selection">Default Attributes: <span>[[defaultRaceAttribute]]</span></div>
          <dnd-select-add hidden$="[[!_exists(raceAttributeOptions)]]" choices="[[raceAttributeChoices]]" placeholder="<Choose Attribute>" label="Chosen Attribute(s)"
            options="[[raceAttributeOptions]]" value="[[raceAttributeSelections]]" add-callback="[[_raceAttributeAddCallback]]"></dnd-select-add>
        </div>

        <div class="row-wrap">
          <div class="heading">
            <h2>Background</h2>
            <a class="mdc-icon-button material-icons" href="[[_getBackgroundLink(selectedBackground)]]">launch</a>
          </div>
          <dnd-select-add model="backgrounds" value="[[selectedBackground]]" placeholder="<Choose Background>" disabled$="[[!isEditMode]]" hidden$="[[_showEmpty(isEditMode, selectedBackground)]]"></dnd-select-add>
          <div class="missing-text" hidden$="[[_exists(backgroundSkillProfOptions, defaultBackgroundSkillProf)]]">Select Background to add Skill Proficiencies</div>
          <div hidden$="[[!_exists(backgroundSkillProfOptions, defaultBackgroundSkillProf)]]">Skill Proficiencies from Background:</div>
          <div hidden$="[[!_exists(defaultBackgroundSkillProf)]]" class="default-selection">Default Skills: <span>[[defaultBackgroundSkillProf]]</span></div>
          <dnd-select-add hidden$="[[!_exists(backgroundSkillProfOptions)]]" choices="[[backgroundSkillProfChoices]]" placeholder="<Choose Skills>" label="Chosen Skill(s)" disabled$="[[!isEditMode]]"
            options="[[backgroundSkillProfOptions]]" value="[[backgroundSkillProfSelections]]" add-callback="[[_backgroundSkillAddCallback]]"></dnd-select-add>
        </div>
      </div>
    `}}customElements.define("dnd-character-builder-background-race",r)}}]);
//# sourceMappingURL=12.bundle.js.map