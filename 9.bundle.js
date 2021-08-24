(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{122:function(e,t,i){"use strict";i.r(t);var a=i(7),d=i(18),o=i(108),c=i(1);class s extends a.a{static get properties(){return{selectedBackground:{type:String,value:""},backgroundSkillProfOptions:{type:Object,value:[]},defaultBackgroundSkillProf:{type:String,value:""},selectedRace:{type:String,value:""},raceAttributeOptions:{type:Object,value:[]},defaultRaceAttribute:{type:String,value:""},isEditMode:{type:Boolean,value:!1}}}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(d.F)()),Object(d.m)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(o.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(o.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(d.m)().removeEventListener("character-selected",this.characterChangeHandler),Object(o.b)().removeEventListener("editModeChange",this.editModeHandler)}async updateFromCharacter(e){this.selectedBackground=e.background,this.selectedRace=e.race;let t=await Object(d.k)();t&&t.choose?(this.backgroundSkillProfOptions=t.choose.from,this.backgroundSkillProfChoices=t.choose.count||1,this.backgroundSkillProfSelections=e.backgroundSkillProficiencies):(this.backgroundSkillProfOptions=void 0,this.backgroundSkillProfChoices=void 0,this.backgroundSkillProfSelections=void 0);let i=await Object(d.j)(t);this.defaultBackgroundSkillProf=i.map(e=>Object(c.util_capitalizeAll)(e)).join(", ");let a=await Object(d.E)();a&&a.choose?(this.raceAttributeOptions=a.choose.from.map(e=>e.toUpperCase()),this.raceAttributeChoices=a.choose.count||1,this.raceAttributeSelections=e.raceAttributes):(this.raceAttributeOptions=void 0,this.raceAttributeChoices=void 0,this.raceAttributeSelections=void 0);let o=await Object(d.D)(a);this.defaultRaceAttribute=o.map(e=>{let t=e[0].toLowerCase(),i=e[1];return t.toUpperCase()+" "+Object(c.absInt)(i)}).join(", "),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}_backgroundSkillAddCallback(e){Object(d.V)(e)}_raceAttributeAddCallback(e){Object(d.eb)(e)}_showEmpty(e,t){return!e&&!t}_exists(){for(let e of arguments)if(e&&(e.constructor!==Object||Object.entries(e).length>0)&&(!Array.isArray(e)||e.length>0))return!0;return!1}static get template(){return a.b`
      <style>
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

        @media(min-width: 921px) {
          .row-wrap {
            width: calc(50% - 10px);
          }
          .row-wrap:first-child {
            margin-bottom: 0;
          }
        }
      </style>

      <div class="col-wrap">
        <div class="row-wrap">
          <h2>Race</h2>
          <dnd-select-add model="races" value="[[selectedRace]]" placeholder="<Choose Race>" disabled$="[[!isEditMode]]" hidden$="[[_showEmpty(isEditMode, selectedRace)]]"></dnd-select-add>
          <div class="missing-text" hidden$="[[_exists(raceAttributeOptions, defaultRaceAttribute)]]">Select Race to add Attribute Bonuses</div>
          <div hidden$="[[!_exists(raceAttributeOptions, defaultRaceAttribute)]]">Attribute Bonuses from Race:</div>
          <div hidden$="[[!_exists(defaultRaceAttribute)]]" class="default-selection">Default Attributes: <span>[[defaultRaceAttribute]]</span></div>
          <dnd-select-add hidden$="[[!_exists(raceAttributeOptions)]]" choices="[[raceAttributeChoices]]" placeholder="<Choose Attribute>" label="Choosen Attribute(s)"
            options="[[raceAttributeOptions]]" value="[[raceAttributeSelections]]" add-callback="[[_raceAttributeAddCallback]]"></dnd-select-add>
        </div>

        <div class="row-wrap">
          <h2>Background</h2>
          <dnd-select-add model="backgrounds" value="[[selectedBackground]]" placeholder="<Choose Background>" disabled$="[[!isEditMode]]" hidden$="[[_showEmpty(isEditMode, selectedBackground)]]"></dnd-select-add>
          <div class="missing-text" hidden$="[[_exists(backgroundSkillProfOptions, defaultBackgroundSkillProf)]]">Select Background to add Skill Proficiencies</div>
          <div hidden$="[[!_exists(backgroundSkillProfOptions, defaultBackgroundSkillProf)]]">Skill Proficiencies from Background:</div>
          <div hidden$="[[!_exists(defaultBackgroundSkillProf)]]" class="default-selection">Default Skills: <span>[[defaultBackgroundSkillProf]]</span></div>
          <dnd-select-add hidden$="[[!_exists(backgroundSkillProfOptions)]]" choices="[[backgroundSkillProfChoices]]" placeholder="<Choose Skills>" label="Choosen Skill(s)" disabled$="[[!isEditMode]]"
            options="[[backgroundSkillProfOptions]]" value="[[backgroundSkillProfSelections]]" add-callback="[[_backgroundSkillAddCallback]]"></dnd-select-add>
        </div>
      </div>
    `}}customElements.define("dnd-character-builder-background-race",s)}}]);
//# sourceMappingURL=9.bundle.js.map