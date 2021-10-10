(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{100:function(e,t,l){"use strict";l.r(t);var s=l(7),a=(l(63),l(70),l(79),l(110),l(32)),d=l(28),c=l(131),i=l(12);function n(e,t=0,l=document.scrollingElement){if(l.scrollTop===e)return;const s=(l.scrollTop-e)/2;let a=0,d=null;window.requestAnimationFrame((function c(i){if(null!==d){if(a+=Math.PI*(i-d)/t,a>=Math.PI)return l.scrollTop=e;l.scrollTop=s+e+s*Math.cos(a)}d=i,window.requestAnimationFrame(c)}))}var o=l(1);class r extends s.a{static get properties(){return{classes:{type:Object,observer:"_dataLoaded"},hash:{type:String,value:""},itemOpened:{value:!1},loading:{type:Boolean,value:!0,observer:"_loadingChange"}}}static get observers(){return["_updateClassFromHash(classes, hash)"]}constructor(){super(),this.loading=!0,Object(a.b)("classes").then(e=>{this.set("classes",e),this.loading=!1})}connectedCallback(){super.connectedCallback(),this.populateHandlers(),Object(i.e)().addEventListener("selection-change",this.selectionChangeEventHandler),Object(i.e)().addEventListener("selection-deselected",this.deselectionChangeEventHandler),this.$.backToTop.addEventListener("click",this.backToTopEventHandler),window.addEventListener("scroll",this.subclassScrollRepositionHandler)}disconnectedCallback(){super.disconnectedCallback(),this.deselectionChangeEventHandler(),Object(i.e)().removeEventListener("selection-change",this.selectionChangeEventHandler),Object(i.e)().removeEventListener("selection-deselected",this.deselectionChangeEventHandler),this.$.backToTop.removeEventListener("click",this.backToTopEventHandler),window.removeEventListener("scroll",this.subclassScrollRepositionHandler,{passive:!0})}populateHandlers(){this.selectionChangeEventHandler=e=>{let t=e?e.detail.selection:Object(i.c)();t&&this.set("hash",t)},this.selectionChangeEventHandler(),this.deselectionChangeEventHandler=()=>{this.set("hash","")},this.backToTopEventHandler=()=>{!function(e=0){n(0,e,document.scrollingElement)}(400)},this.subclassScrollRepositionHandler=()=>{window.scrollY>850?this.$.backToTop.classList.remove("hidden"):this.$.backToTop.classList.add("hidden");const e=this.shadowRoot.querySelector("#subclasses"),t=this.shadowRoot.querySelector("#subclassHeight");e.classList.contains("closed")&&e.classList.contains("fixed")||(this.subclassOffsetHeight=Object(o.jqHeight)(e)+55+"px"),Object(o.jqOffset)(t).top-document.body.scrollTop<64?e.classList.contains("fixed")||(e.classList.add("fixed"),t.style.height=this.subclassOffsetHeight):(e.classList.remove("fixed"),t.style.height="0")}}_loadingChange(){this.dispatchEvent(new CustomEvent("loading-data",{bubbles:!0,composed:!0,detail:{loading:this.loading}}))}_dataLoaded(){Object(c.onDataLoad)(this.classes,this.shadowRoot)}_updateClassFromHash(){if(this.classes&&this.hash){let e,t;if(this.hash.indexOf(",")>-1){let l=this.hash.split(",");e=Object(d.b)(this.classes,l[0]),t=l.slice(1)}else e=Object(d.b)(this.classes,this.hash);if(e){this.itemOpened=!0;let l=e!==this.prevClass;this.prevClass=e,l&&(window.scrollTo(0,0),Object(c.onClassChange)(e,this.shadowRoot)),t&&Object(c.onSubChange)(t,this.hash,this.shadowRoot),this.dispatchEvent(new CustomEvent("title-change",{bubbles:!0,composed:!0,detail:{title:e.name}}))}else Object(i.a)(!0)}this.hash||(this.itemOpened=!1)}_clearSelectionHandler(){Object(i.a)(!0)}_mainClass(){return this.itemOpened?"main item-opened":"main"}static get template(){return s.b`
      <style include="material-styles my-styles"></style>
      <div class$="[[_mainClass(itemOpened)]]">

        <button class="mdc-icon-button close-item material-icons" on-click="_clearSelectionHandler">close</button>
        <button id="backToTop" class="mdc-icon-button mdc-button--raised back-to-top material-icons hidden">arrow_upward</button>

        <div class="class-container"></div>

        <div class="class-page--class-container">

          <div id="subclassHeight"></div>
          <div id="subclasses"></div>

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

          <div id="statsprof" class="stats">
            <div id="hp" colspan="6">
              <h5>Hit Points</h5>
              <div id="hitdice">
                <strong>Hit Dice:</strong>
                <span> </span>
              </div>
              <div id="hp1stlevel">
                <strong>Hit Points at 1st Level:</strong>
                <span> </span>
              </div>
              <div id="hphigherlevels">
                <strong>Hit Points at Higher Levels:</strong>
                <span> </span>
              </div>
            </div>
            <div id="prof" colspan="6">
              <h5>Proficiencies</h5>
              <span
                >You are proficient with the following items, in addition to any proficiencies provided by your race or
                background.</span
              >
              <div id="armor">
                <strong>Armor:</strong>
                <span> </span>
              </div>
              <div id="weapons">
                <strong>Weapons:</strong>
                <span> </span>
              </div>
              <div id="tools">
                <strong>Tools:</strong>
                <span> </span>
              </div>
              <div id="saves">
                <strong>Saving Throws:</strong>
                <span> </span>
              </div>
              <div id="skills">
                <strong>Skills:</strong>
                <span> </span>
              </div>
              <div id="equipment" colspan="6">
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
    `}}customElements.define("dnd-classes",r);class b extends s.a{static get template(){return s.b`
      <style include="material-styles my-styles"></style>
      
      <dnd-classes></dnd-classes>
    `}}customElements.define("dnd-classes-view",b)}}]);
//# sourceMappingURL=16.bundle.js.map