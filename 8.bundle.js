(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{154:function(e,t,a){"use strict";a.r(t);var d=a(3),i=a(32),n=(a(148),a(90),a(143)),s=a(1);class o extends d.a{static get properties(){return{selectedBackground:{type:String,value:""},selectedBackgroundRef:{type:Object},selectedRace:{type:String,value:""},selectedRaceRef:{type:Object},isEditMode:{type:Boolean,value:!1},backgroundName:{type:String,value:""},raceName:{type:String,value:""}}}constructor(){super(),this.additionalOptionAddOptions=["Feat","Attribute +1","Attribute +2","Skill","Language","Tool","Weapon","Armor"]}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(i.Q)()),Object(i.n)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(n.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(n.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(i.n)().removeEventListener("character-selected",this.characterChangeHandler),Object(n.b)().removeEventListener("editModeChange",this.editModeHandler)}async updateFromCharacter(e){if(e){let t=0,a=Object.entries(e.choices).filter(([e,a])=>{if(e.includes("additionalChoice")){const d=parseInt(e.substring(e.indexOf("_")+1));return d>t&&(t=d),a?(a.index=d,!0):!1}return!1}).map(([e,t])=>(t.key=e,t));this.maxAdditionalOptionsIndex=t,this.set("additionalOptions",a),e.background?(this.selectedBackground=e.background,this.selectedBackgroundRef=await Object(i.l)(),this.backgroundName=this.selectedBackground.name):(this.selectedBackground={},this.selectedBackgroundRef=void 0,this.backgroundName=""),e.race?(this.selectedRace=e.race,this.selectedRaceRef=await Object(i.P)(),this.raceName=this.selectedRace.name):(this.selectedRace={},this.selectedRaceRef=void 0,this.raceName="")}this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}_getRaceLink(e){let t=[e.name];e.source&&t.push(e.source);let a=Object(s.encodeForHash)(t);return e?"#/races/"+a:"#/races"}_getBackgroundLink(e){let t=[e.name];e.source&&t.push(e.source);let a=Object(s.encodeForHash)(t);return e?"#/backgrounds/"+a:"#/backgrounds"}_linkClick(e){const t=e.target.classList.contains("background");this.dispatchEvent(new CustomEvent("open-drawer",{bubbles:!0,composed:!0,detail:{selectedItem:t?this.selectedBackground:this.selectedRace,viewId:t?"backgrounds":"races"}}))}_addAdditionalOption(e){const t=this.$.optionAdd.value;Object(i.a)(t,this.maxAdditionalOptionsIndex+1),this.$.optionAdd.value=""}_deleteAdditionalOption(e){const t=e.model.__data.item.key;Object(i.h)(t)}_showEmpty(e,t){return!e&&!t}_exists(){for(let e of arguments)if(e&&(e.constructor!==Object||Object.entries(e).length>0)&&(!Array.isArray(e)||e.length>0))return!0;return!1}static get template(){return d.b`
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
        vaadin-select {
          cursor: pointer;
          margin-left: 20px;
          --lumo-font-size-m: 20px;
          --vaadin-text-field-default-width: 0;
          position: relative;
          left: -50px;
        }
        
        dnd-select-add {
          --lumo-font-size-m: 20px;
          width: 100%;
        }

        dnd-character-builder-suboptions {
          display: block;
          margin-left: 30px;
        }

        @media(min-width: 420px) {
          vaadin-select {
            left: 0;
          }
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
          <dnd-character-builder-suboptions storage-key="race" selected-item="[[selectedRaceRef]]"></dnd-character-builder-suboptions>
        </div>

        <div class="row-wrap">
          <div class="heading">
            <h2>Background</h2>
            <button class="mdc-icon-button material-icons background" on-click="_linkClick">logout</button>
          </div>
          <div class="missing-text" hidden$="[[_exists(selectedBackgroundRef)]]">Enter edit mode to select a Background.</div>
          <dnd-select-add model="backgrounds" value="[[selectedBackground]]" placeholder="<Choose Background>" disabled$="[[!isEditMode]]" hidden$="[[_showEmpty(isEditMode, selectedBackground)]]"></dnd-select-add>
          <dnd-character-builder-suboptions storage-key="background" selected-item="[[selectedBackgroundRef]]"></dnd-character-builder-suboptions>
        </div>

        <div class="row-wrap">
          <div class="heading">
            <h2>Extra Features</h2>
            <vaadin-select add theme="large" id="optionAdd" class="label--secondary" on-change="_addAdditionalOption" placeholder="<Add Additional Feature>" disabled$="[[!isEditMode]]" hidden$="[[!isEditMode]]">
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
                Extra [[item.choiceKey]]
                <button class="mdc-icon-button material-icons" on-click="_deleteAdditionalOption">delete</button>
                <dnd-character-builder-suboptions dont-create-if-missing storage-key="[[item.key]]" selected-item="[[item]]"></dnd-character-builder-suboptions>
              </div>
            </template>
          </div>
        </div>
      </div>
    `}}customElements.define("dnd-character-builder-background-race",o)}}]);
//# sourceMappingURL=8.bundle.js.map