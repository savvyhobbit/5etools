(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{134:function(e,t,i){"use strict";i.r(t);var a=i(7),o=i(17),s=i(110),r=i(1);class d extends a.a{static get properties(){return{storageKey:{type:String},selectedItem:{type:Object},profOptions:{type:Object,value:[]},profChoices:{type:Number},profSelection:{type:Array},defaultProfs:{type:String,value:""},attributeOptions:{type:Object,value:[]},attributeChoices:{type:Number},attributeSelection:{type:Array},defaultAttributes:{type:String,value:""},featOptions:{type:Array},featChoices:{type:Number},featSelection:{type:Array},isEditMode:{type:Boolean,value:!1}}}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(o.G)()),Object(o.m)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(s.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(s.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(o.m)().removeEventListener("character-selected",this.characterChangeHandler),Object(s.b)().removeEventListener("editModeChange",this.editModeHandler)}async updateFromCharacter(e){if(e&&this.storageKey&&this.selectedItem){const t=this.storageKey.split(".");let i=e;for(let e of t)i=i[e];this.profOptions="",this.profChoices="",this.profSelection="",this.defaultProfs="",this.attributeOptions="",this.attributeChoices="",this.attributeSelection="",this.defaultAttributes="",this.featOptions="",this.featChoices="",this.featSelection="";let a=await Object(o.k)();a&&a.choose?(this.backgroundSkillProfOptions=a.choose.from,this.backgroundSkillProfChoices=a.choose.count||1,this.backgroundSkillProfSelections=e.backgroundSkillProficiencies):(this.backgroundSkillProfOptions=void 0,this.backgroundSkillProfChoices=void 0,this.backgroundSkillProfSelections=void 0);let s=await Object(o.j)(a);this.defaultBackgroundSkillProf=s.map(e=>Object(r.util_capitalizeAll)(e)).join(", ");let d=await Object(o.F)();d&&d.choose?(this.raceAttributeOptions=d.choose.from.map(e=>e.toUpperCase()),this.raceAttributeChoices=d.choose.count||1,this.raceAttributeSelections=e.raceAttributes):(this.raceAttributeOptions=void 0,this.raceAttributeChoices=void 0,this.raceAttributeSelections=void 0);let c=await Object(o.E)(d);this.defaultRaceAttribute=c.map(e=>{let t=e[0].toLowerCase(),i=e[1];return t.toUpperCase()+" "+Object(r.absInt)(i)}).join(", "),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}}_backgroundSkillAddCallback(e){Object(o.bb)(e)}_raceAttributeAddCallback(e){Object(o.mb)(e)}_getRaceLink(e){let t=[e.name];e.source&&t.push(e.source);let i=Object(r.encodeForHash)(t);return e?"#/races/"+i:"#/races"}_getBackgroundLink(e){let t=[e.name];e.source&&t.push(e.source);let i=Object(r.encodeForHash)(t);return e?"#/backgrounds/"+i:"#/backgrounds"}_showEmpty(e,t){return!e&&!t}_exists(){for(let e of arguments)if(e&&(e.constructor!==Object||Object.entries(e).length>0)&&(!Array.isArray(e)||e.length>0))return!0;return!1}static get template(){return a.b`
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
                <dnd-select-add hidden$="[[!_exists(raceAttributeOptions)]]" disabled$="[[!isEditMode]]" choices="[[raceAttributeChoices]]" placeholder="<Choose Attribute>" label="Chosen Attribute(s)"
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
                <dnd-select-add hidden$="[[!_exists(backgroundSkillProfOptions)]]" disabled$="[[!isEditMode]]" choices="[[backgroundSkillProfChoices]]" placeholder="<Choose Skills>" label="Chosen Skill(s)" disabled$="[[!isEditMode]]"
                options="[[backgroundSkillProfOptions]]" value="[[backgroundSkillProfSelections]]" add-callback="[[_backgroundSkillAddCallback]]"></dnd-select-add>
            </div>
            </div>
        `}}customElements.define("dnd-character-builder-suboptions",d)}}]);
//# sourceMappingURL=13.bundle.js.map