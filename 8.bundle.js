(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{113:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return c}));var a=s(1),i=s(5);const r=new(s(71).a),l='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="source margin-bottom_small"></div>\n\t\t<div class="stats margin-bottom_small"></div>\n\t\t<div class="table-container collapse collapse--left-arrow disabled">\n\t\t\t<div class="collapse-toggle">\n\t\t\t\t<div class="mdc-list-item stat-name">Suggested Characteristics</div>\n\t\t\t</div>\n\t\t\t<div class="collapse-wrapper">\n\t\t\t\t<div class="collapse-list"></div>\n\t\t\t</div>\n\t\t</div>\n\t</div>';function c(e,t,s){t.querySelector(".selection-wrapper")?t.querySelector(".selection-wrapper").innerHTML=l:t.innerHTML=l;const c=e.source,o=i.a.sourceJsonToAbv(c),d=i.a.sourceJsonToFull(c),n=t.querySelector(".stats-wrapper .source");n.classList.add("source"+o),n.setAttribute("title",d),n.innerHTML=o;const p=e.entries;if(p.length)for(let e=p.length-1;e>=0;e--){let s=p[e],i=[];r.recursiveEntryRender(s,i,0);let l=i.join(" ");if("Suggested Characteristics"===s.name){t.querySelector(".stats-wrapper .table-container").classList.remove("disabled");const e=t.querySelector(".stats-wrapper .table-container .collapse-list"),s=Object(a.parseHTML)(l);s.querySelector(".stat-name").remove(),Object(a.jqPrepend)(e,s)}else{const e=t.querySelector(".stats-wrapper .stats");Object(a.jqPrepend)(e,Object(a.parseHTML)(l))}}window.setTimeout(()=>{let e=t.querySelector(".stats-wrapper .table-container .collapse-list");e.style["margin-top"]="-"+Object(a.jqHeight)(e)+"px"},0)}},116:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return o}));var a=s(1),i=s(71),r=s(5),l=s(64);const c='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="source margin-bottom_small"></div>\n\t\t<div class="size margin-bottom_small"></div>\n\t\t<div class="ability margin-bottom_small"></div>\n\t\t<div class="speed margin-bottom_small"></div>\n\t\t<div class="stats"></div>\n\t</div>';function o(e,t){t.querySelector(".selection-wrapper")?t.querySelector(".selection-wrapper").innerHTML=c:t.innerHTML=c;const s=t.querySelector(".stats-wrapper .source");s.classList.add("source"+e.source),s.setAttribute("title",r.a.sourceJsonToFull(e.source)),s.innerHTML=""+r.a.sourceJsonToAbv(e.source);const o=r.a.sizeAbvToFull(e.size);t.querySelector(".stats-wrapper .size").innerHTML=o,""===o&&(t.querySelector(".stats-wrapper .size").style.display="none");const d=Object(l.c)(e.ability);let n;t.querySelector(".stats-wrapper .ability").innerHTML=d,e.speed&&(e.speed.walk?(n=e.speed.walk+" ft.",e.speed.climb&&(n+=`, climb ${e.speed.climb} ft.`),e.speed.fly&&(n+=`, fly ${e.speed.fly} ft.`)):n=e.speed+("Varies"===e.speed?"":" ft. ")),t.querySelector(".stats-wrapper .speed").innerHTML=n,""===n&&(t.querySelector(".stats-wrapper .speed").style.display="none");const p=e.trait;if(p){let e="<div class='stat-item'>";for(let t=0;t<p.length;++t){const s=`<span class='stat-name'>${p[t].name}.</span> `;e+=Object(a.utils_combineText)(p[t].text,"p",s)}e+="</div>",t.querySelector(".stats-wrapper .stats").innerHTML=e}else if(e.entries){const s=[],a={type:"entries",entries:e.entries};(new i.a).recursiveEntryRender(a,s,1,"<div class='renderer-output'>","</div>",!0),t.querySelector(".stats-wrapper .stats").innerHTML=s.join("")}}},124:function(e,t,s){"use strict";s.r(t);var a=s(7),i=s(18),r=s(116),l=s(113),c=s(109),o=s(1);class d extends a.a{static get properties(){return{selectedBackground:{type:String,value:""},backgroundSkillProfOptions:{type:Object,value:[]},defaultBackgroundSkillProf:{type:String,value:""},selectedRace:{type:String,value:""},raceAttributeOptions:{type:Object,value:[]},defaultRaceAttribute:{type:String,value:""},isEditMode:{type:Boolean,value:!1},backgroundName:{type:String,value:""},raceName:{type:String,value:""}}}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(i.G)()),Object(i.m)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(c.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(c.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(i.m)().removeEventListener("character-selected",this.characterChangeHandler),Object(c.b)().removeEventListener("editModeChange",this.editModeHandler)}async updateFromCharacter(e){this.selectedBackground=e.background,this.backgroundName=this.selectedBackground.name,this.selectedRace=e.race,this.raceName=this.selectedRace.name;let t=await Object(i.k)();t&&t.choose?(this.backgroundSkillProfOptions=t.choose.from,this.backgroundSkillProfChoices=t.choose.count||1,this.backgroundSkillProfSelections=e.backgroundSkillProficiencies):(this.backgroundSkillProfOptions=void 0,this.backgroundSkillProfChoices=void 0,this.backgroundSkillProfSelections=void 0);let s=await Object(i.j)(t);this.defaultBackgroundSkillProf=s.map(e=>Object(o.util_capitalizeAll)(e)).join(", ");let a=await Object(i.E)();a&&a.choose?(this.raceAttributeOptions=a.choose.from.map(e=>e.toUpperCase()),this.raceAttributeChoices=a.choose.count||1,this.raceAttributeSelections=e.raceAttributes):(this.raceAttributeOptions=void 0,this.raceAttributeChoices=void 0,this.raceAttributeSelections=void 0);let c=await Object(i.D)(a);this.defaultRaceAttribute=c.map(e=>{let t=e[0].toLowerCase(),s=e[1];return t.toUpperCase()+" "+Object(o.absInt)(s)}).join(", ");const d=await Object(i.i)();d&&Object(l.renderSelection)(d,this.$.backgroundDetails);const n=await Object(i.F)();n&&Object(r.renderSelection)(n,this.$.raceDetails),Object(o.initCollapseToggles)(this.shadowRoot),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}_backgroundSkillAddCallback(e){Object(i.Y)(e)}_raceAttributeAddCallback(e){Object(i.ib)(e)}_showEmpty(e,t){return!e&&!t}_exists(){for(let e of arguments)if(e&&(e.constructor!==Object||Object.entries(e).length>0)&&(!Array.isArray(e)||e.length>0))return!0;return!1}static get template(){return a.b`
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
          <h2>Race</h2>
          <dnd-select-add model="races" value="[[selectedRace]]" placeholder="<Choose Race>" disabled$="[[!isEditMode]]" hidden$="[[_showEmpty(isEditMode, selectedRace)]]"></dnd-select-add>
          <div class="missing-text" hidden$="[[_exists(raceAttributeOptions, defaultRaceAttribute)]]">Select Race to add Attribute Bonuses</div>
          <div hidden$="[[!_exists(raceAttributeOptions, defaultRaceAttribute)]]">Attribute Bonuses from Race:</div>
          <div hidden$="[[!_exists(defaultRaceAttribute)]]" class="default-selection">Default Attributes: <span>[[defaultRaceAttribute]]</span></div>
          <dnd-select-add hidden$="[[!_exists(raceAttributeOptions)]]" choices="[[raceAttributeChoices]]" placeholder="<Choose Attribute>" label="Choosen Attribute(s)"
            options="[[raceAttributeOptions]]" value="[[raceAttributeSelections]]" add-callback="[[_raceAttributeAddCallback]]"></dnd-select-add>

          <div class="collapse collapse--left-arrow" hidden$="[[!raceName]]">
            <div class="collapse-toggle">
              <div class="mdc-list-item stat-name">Race Details</div>
            </div>
            <div class="collapse-wrapper">
              <div class="details-container collapse-list">
                <h3>[[raceName]]</h3>
                <div class="details" id="raceDetails">
                  [[raceDetails]]
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row-wrap">
          <h2>Background</h2>
          <dnd-select-add model="backgrounds" value="[[selectedBackground]]" placeholder="<Choose Background>" disabled$="[[!isEditMode]]" hidden$="[[_showEmpty(isEditMode, selectedBackground)]]"></dnd-select-add>
          <div class="missing-text" hidden$="[[_exists(backgroundSkillProfOptions, defaultBackgroundSkillProf)]]">Select Background to add Skill Proficiencies</div>
          <div hidden$="[[!_exists(backgroundSkillProfOptions, defaultBackgroundSkillProf)]]">Skill Proficiencies from Background:</div>
          <div hidden$="[[!_exists(defaultBackgroundSkillProf)]]" class="default-selection">Default Skills: <span>[[defaultBackgroundSkillProf]]</span></div>
          <dnd-select-add hidden$="[[!_exists(backgroundSkillProfOptions)]]" choices="[[backgroundSkillProfChoices]]" placeholder="<Choose Skills>" label="Choosen Skill(s)" disabled$="[[!isEditMode]]"
            options="[[backgroundSkillProfOptions]]" value="[[backgroundSkillProfSelections]]" add-callback="[[_backgroundSkillAddCallback]]"></dnd-select-add>
          
          <div class="collapse collapse--left-arrow" hidden$="[[!backgroundName]]">
            <div class="collapse-toggle">
              <div class="mdc-list-item stat-name">Background Details</div>
            </div>
            <div class="collapse-wrapper">
              <div class="details-container collapse-list">
                <h3>[[backgroundName]]</h3>
                <div class="details" id="backgroundDetails">
                  [[backgroundDetails]]
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `}}customElements.define("dnd-character-builder-background-race",d)}}]);
//# sourceMappingURL=8.bundle.js.map