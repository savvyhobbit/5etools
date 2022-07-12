(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{159:function(e,t,a){"use strict";a.r(t);var d=a(7),c=a(17),r=(a(149),a(142)),i=a(1);class n extends d.a{static get properties(){return{selectedBackground:{type:String,value:""},selectedBackgroundRef:{type:Object},selectedRace:{type:String,value:""},selectedRaceRef:{type:Object},isEditMode:{type:Boolean,value:!1},backgroundName:{type:String,value:""},raceName:{type:String,value:""}}}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(c.F)()),Object(c.l)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(r.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(r.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(c.l)().removeEventListener("character-selected",this.characterChangeHandler),Object(r.b)().removeEventListener("editModeChange",this.editModeHandler)}async updateFromCharacter(e){this.selectedBackground=e.background,this.selectedBackgroundRef=await Object(c.j)(),this.backgroundName=this.selectedBackground.name,this.selectedRace=e.race,this.selectedRaceRef=await Object(c.E)(),this.raceName=this.selectedRace.name,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}_getRaceLink(e){let t=[e.name];e.source&&t.push(e.source);let a=Object(i.encodeForHash)(t);return e?"#/races/"+a:"#/races"}_getBackgroundLink(e){let t=[e.name];e.source&&t.push(e.source);let a=Object(i.encodeForHash)(t);return e?"#/backgrounds/"+a:"#/backgrounds"}_showEmpty(e,t){return!e&&!t}_exists(){for(let e of arguments)if(e&&(e.constructor!==Object||Object.entries(e).length>0)&&(!Array.isArray(e)||e.length>0))return!0;return!1}static get template(){return d.b`
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
          margin-bottom: 200px;
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
          border-bottom: 1px solid var(--lumo-contrast-10pct);
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
            <a class="reference-link mdc-icon-button material-icons" href="[[_getRaceLink(selectedRace)]]">launch</a>
          </div>
          <dnd-select-add model="races" value="[[selectedRace]]" placeholder="<Choose Race>" disabled$="[[!isEditMode]]" hidden$="[[_showEmpty(isEditMode, selectedRace)]]"></dnd-select-add>
          <div class="missing-text" hidden$="[[_exists(selectedRace)]]">Select Race to add Attribute Bonuses</div>
          <dnd-character-builder-suboptions storage-key="race" selected-item="[[selectedRaceRef]]"></dnd-character-builder-suboptions>
        </div>

        <div class="row-wrap">
          <div class="heading">
            <h2>Background</h2>
            <a class="mdc-icon-button material-icons" href="[[_getBackgroundLink(selectedBackground)]]">launch</a>
          </div>
          <dnd-select-add model="backgrounds" value="[[selectedBackground]]" placeholder="<Choose Background>" disabled$="[[!isEditMode]]" hidden$="[[_showEmpty(isEditMode, selectedBackground)]]"></dnd-select-add>
          <div class="missing-text" hidden$="[[_exists(selectedBackground)]]">Select Background to add Skill Proficiencies</div>
          <dnd-character-builder-suboptions storage-key="background" selected-item="[[selectedBackgroundRef]]"></dnd-character-builder-suboptions>
        </div>
      </div>
    `}}customElements.define("dnd-character-builder-background-race",n)}}]);
//# sourceMappingURL=13.bundle.js.map