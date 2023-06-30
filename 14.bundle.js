(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{158:function(e,t,l){"use strict";l.r(t);var s=l(3),a=(l(23),l(28),l(95),l(124),l(37)),c=l(21),d=l(136),i=l(9);function o(e,t=0,l=document.scrollingElement){if(l.scrollTop===e)return;const s=(l.scrollTop-e)/2;let a=0,c=null;window.requestAnimationFrame((function d(i){if(null!==c){if(a+=Math.PI*(i-c)/t,a>=Math.PI)return l.scrollTop=e;l.scrollTop=s+e+s*Math.cos(a)}c=i,window.requestAnimationFrame(d)}))}var n=l(1),r=l(4);class b extends s.a{static get properties(){return{classes:{type:Object,observer:"_dataLoaded"},hash:{type:String,value:""},itemOpened:{value:!1},loading:{type:Boolean,value:!0,observer:"_loadingChange"},selectedTitle:{type:String,value:""},lastTitle:{type:String},selectedSource:{type:String,value:""}}}static get observers(){return["_updateClassFromHash(classes, hash)"]}constructor(){super(),this.loading=!0,Object(a.b)("class-all").then(e=>{this.set("classes",e),this.loading=!1})}connectedCallback(){super.connectedCallback(),this.populateHandlers(),Object(i.h)().addEventListener("selection-change",this.selectionChangeEventHandler),Object(i.h)().addEventListener("selection-deselected",this.deselectionChangeEventHandler),this.$.backToTop.addEventListener("click",this.backToTopEventHandler),window.addEventListener("scroll",this.subclassScrollRepositionHandler),Object(i.h)().addEventListener("title-change",e=>{if(e.detail){const{title:t}=e.detail;let l,s,a=Object(i.e)();if(a){const e=a.split("_");l=decodeURIComponent(e[0]),e.length>1&&(s=e[1].split(",")[0])}t&&(this.lastTitle=t),this.selectedTitle=l||t||"",this.selectedSource=s,this.selectedSourceFull=r.a.sourceJsonToFull(s),this.selectedSourceAbv=r.a.sourceJsonToAbv(s)}}),Object(i.h)().addEventListener("selection-change",e=>{console.error("selection-change",e.detail);const t=e.detail.selection;if(t){const e=t.split("_");this.selectedTitle=decodeURIComponent(e[0]),e.length>1&&(this.selectedSource=e[1].split(",")[0],this.selectedSourceFull=r.a.sourceJsonToFull(this.selectedSource),this.selectedSourceAbv=r.a.sourceJsonToAbv(this.selectedSource))}}),Object(i.h)().addEventListener("selection-deselected",()=>{this.selectedTitle=this.lastTitle||"",this.selectedSource="",this.selectedSourceFull="",this.selectedSourceAbv=""})}disconnectedCallback(){super.disconnectedCallback(),this.deselectionChangeEventHandler(),Object(i.h)().removeEventListener("selection-change",this.selectionChangeEventHandler),Object(i.h)().removeEventListener("selection-deselected",this.deselectionChangeEventHandler),this.$.backToTop.removeEventListener("click",this.backToTopEventHandler),window.removeEventListener("scroll",this.subclassScrollRepositionHandler,{passive:!0})}populateHandlers(){this.selectionChangeEventHandler=e=>{let t=e?e.detail.selection:Object(i.e)();t&&this.set("hash",t)},this.selectionChangeEventHandler(),this.deselectionChangeEventHandler=()=>{this.set("hash","")},this.backToTopEventHandler=()=>{!function(e=0){o(0,e,document.scrollingElement)}(400)},this.subclassScrollRepositionHandler=()=>{window.scrollY>850?this.$.backToTop.classList.remove("hidden"):this.$.backToTop.classList.add("hidden");const e=this.shadowRoot.querySelector("#subclasses"),t=this.shadowRoot.querySelector("#subclassHeight");e.classList.contains("closed")&&e.classList.contains("fixed")||(this.subclassOffsetHeight=Object(n.jqHeight)(e)+55+"px"),Object(n.jqOffset)(t).top-document.body.scrollTop<64?e.classList.contains("fixed")||(e.classList.add("fixed"),t.style.height=this.subclassOffsetHeight):(e.classList.remove("fixed"),t.style.height="0")}}_loadingChange(){this.dispatchEvent(new CustomEvent("loading-data",{bubbles:!0,composed:!0,detail:{loading:this.loading}}))}_dataLoaded(){Object(d.onDataLoad)(this.classes,this.shadowRoot)}_updateClassFromHash(){if(this.classes&&this.hash){let e,t;if(this.hash.indexOf(",")>-1){let l=this.hash.split(",");e=Object(c.b)(this.classes,l[0]),t=l.slice(1)}else e=Object(c.b)(this.classes,this.hash);if(e){this.itemOpened=!0;let l=e!==this.prevClass;this.prevClass=e,l&&(window.scrollTo(0,0),Object(d.onClassChange)(e,this.shadowRoot)),t&&Object(d.onSubChange)(t,this.hash,this.shadowRoot)}else Object(i.a)(!0)}this.hash||(this.itemOpened=!1)}_clearSelectionHandler(){Object(i.a)(!0)}_mainClass(){return this.itemOpened?"main item-opened":"main"}static get template(){return s.b`
      <style include="material-styles my-styles">
        .page-title {
          display: flex;
          align-items: center;
        }
        .page-title dnd-svg {
          position: static;
          margin-right: 20px;
        }
        .source-text {
          font-size: 18px;
          color: var(--lumo-contrast-50pct);
        }
      </style>

      <div class$="[[_mainClass(itemOpened)]]">

        <button class="mdc-icon-button close-item material-icons mdc-theme--on-header" on-click="_clearSelectionHandler">close</button>
        <button id="backToTop" class="mdc-icon-button mdc-button--raised back-to-top material-icons hidden">arrow_upward</button>

        <h1 class="page-title mdc-typography--headline2" hidden$="[[!selectedTitle]]">
          <dnd-svg id$="[[selectedTitle]]"></dnd-svg>
          <div class="title-text-wrap">
            <span class="title-text">[[selectedTitle]]</span>
            <div hidden$=[[!selectedSourceFull]] class="source-text">[[selectedSourceFull]]</div>
          </div>
        </h1>

        <div class="class-container"></div>

        <div class="class-page--class-container stats-wrapper">

          <div id="subclassHeight"></div>
          <div id="subclasses" class="closed"></div>

          <div id="classtable">
            <table class="table">
              <tr id="groupHeaders" class="table-row table-row--header">
                <th colspan="3"></th>
                <!-- spacer to match the 3 default cols (level, prof, features) -->
              </tr>
              <tr id="colHeaders" class="table-row table-row--header">
                <th class="level table-cell">Level</th>
                <th class="pb table-cell">Proficiency Bonus</th>
                <th class="features table-cell">Features</th>
              </tr>
              <tr id="level1" class="table-row">
                <td class="level table-cell">1st</td>
                <td class="pb table-cell">+2</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level2" class="table-row">
                <td class="level table-cell">2nd</td>
                <td class="pb table-cell">+2</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level3" class="table-row">
                <td class="level table-cell">3rd</td>
                <td class="pb table-cell">+2</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level4" class="table-row">
                <td class="level table-cell">4th</td>
                <td class="pb table-cell">+2</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level5" class="table-row">
                <td class="level table-cell">5th</td>
                <td class="pb table-cell">+3</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level6" class="table-row">
                <td class="level table-cell">6th</td>
                <td class="pb table-cell">+3</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level7" class="table-row">
                <td class="level table-cell">7th</td>
                <td class="pb table-cell">+3</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level8" class="table-row">
                <td class="level table-cell">8th</td>
                <td class="pb table-cell">+3</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level9" class="table-row">
                <td class="level table-cell">9th</td>
                <td class="pb table-cell">+4</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level10" class="table-row">
                <td class="level table-cell">10th</td>
                <td class="pb table-cell">+4</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level11" class="table-row">
                <td class="level table-cell">11th</td>
                <td class="pb table-cell">+4</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level12" class="table-row">
                <td class="level table-cell">12th</td>
                <td class="pb table-cell">+4</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level13" class="table-row">
                <td class="level table-cell">13th</td>
                <td class="pb table-cell">+5</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level14" class="table-row">
                <td class="level table-cell">14th</td>
                <td class="pb table-cell">+5</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level15" class="table-row">
                <td class="level table-cell">15th</td>
                <td class="pb table-cell">+5</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level16" class="table-row">
                <td class="level table-cell">16th</td>
                <td class="pb table-cell">+5</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level17" class="table-row">
                <td class="level table-cell">17th</td>
                <td class="pb table-cell">+6</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level18" class="table-row">
                <td class="level table-cell">18th</td>
                <td class="pb table-cell">+6</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level19" class="table-row">
                <td class="level table-cell">19th</td>
                <td class="pb table-cell">+6</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level20" class="table-row">
                <td class="level table-cell">20th</td>
                <td class="pb table-cell">+6</td>
                <td class="features table-cell"></td>
              </tr>
            </table>
          </div>

          <div id="statsprof" class="stats margin-bottom_large">
            <div id="hp" colspan="6">
              <h5>Hit Points</h5>
              <div id="hitdice" class="margin-bottom_small">
                <strong>Hit Dice:</strong>
                <span> </span>
              </div>
              <div id="hp1stlevel" class="margin-bottom_small">
                <strong>Hit Points at 1st Level:</strong>
                <span> </span>
              </div>
              <div id="hphigherlevels" class="margin-bottom_small">
                <strong>Hit Points at Higher Levels:</strong>
                <span> </span>
              </div>
            </div>
            <div id="prof" class="margin-bottom_small">
              <h5>Proficiencies</h5>
              <div class="margin-bottom_med">You are proficient with the following items, in addition to any proficiencies provided by your race or
                background.</div>
              <div id="armor" class="margin-bottom_small">
                <strong>Armor:</strong>
                <span> </span>
              </div>
              <div id="weapons" class="margin-bottom_small">
                <strong>Weapons:</strong>
                <span> </span>
              </div>
              <div id="tools" class="margin-bottom_small">
                <strong>Tools:</strong>
                <span> </span>
              </div>
              <div id="saves" class="margin-bottom_small">
                <strong>Saving Throws:</strong>
                <span> </span>
              </div>
              <div id="skills" class="margin-bottom_small">
                <strong>Skills:</strong>
                <span> </span>
              </div>
              <div id="equipment">
                <h5>Starting Equipment</h5>
                <div></div>
              </div>
            </div>
          </div>

          <div id="stats" class="stats">
            <!-- populate with JS -->
          </div>
        </div>
      </div>
    `}}customElements.define("dnd-classes",b);class h extends s.a{static get template(){return s.b`
      <style include="material-styles my-styles"></style>
      
      <dnd-classes></dnd-classes>
    `}}customElements.define("dnd-classes-view",h)}}]);
//# sourceMappingURL=14.bundle.js.map