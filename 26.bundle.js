(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{103:function(e,t,a){"use strict";a.r(t);var i=a(7),s=(a(63),a(72),a(154));a(81),a(79);class n extends i.a{static get properties(){return{tabs:{type:Array,observer:"tabsChanged"},initialSelectedIndex:{type:Number,value:0,observer:"selectedIndexChange"}}}tabsChanged(){this.tabs.length&&(this.tabBar&&this.$.tabs.removeEventListener("MDCTabBar:activated",this.handleTabChange),setTimeout(()=>{this.tabBar=new s.a(this.$.tabs),this.$.tabs.addEventListener("MDCTabBar:activated",this.handleTabChange),this.tabBar.activateTab(this.initialSelectedIndex)},10))}selectedIndexChange(){this.tabBar&&this.initialSelectedIndex&&this.tabBar.activateTab(this.initialSelectedIndex)}handleTabChange(e){const t=e.detail.index;this.dispatchEvent(new CustomEvent("tabChange",{bubbles:!0,composed:!0,detail:{index:t}}))}static get template(){return i.b`
      <style include="material-styles">
        .mdc-tab-bar {
          max-width: 100vw;
          line-height: 1;
        }
        .mdc-tab__icon {
          width: unset;
          height: unset;
        }
        :host([theme="large"]) .mdc-tab {
          height: 64px;
          margin-left: -5px;
        }
        :host([theme="large"]) .mdc-tab__icon {
          font-size: 30px;
        }
        :host([theme="large"]) .mdc-tab__text-label {
          font-size: 20px;
          padding-left: 16px;
        }
        :host([theme="large"]) .mdc-tab__content {
          margin-left: 6px;
        }
        :host([theme="large"]) .mdc-tab .mdc-tab--active {
          background-color: var(--lumo-primary-color-10pct);
        }
        :host([theme="large"]) .mdc-tab-indicator .mdc-tab-indicator__content {
          border-width: 6px;
        }

        .mdc-tab-scroller__scroll-area--scroll {
          overflow-x: auto;
          background-color: var(--mdc-theme-surface);
          border: 1px solid var(--mdc-theme-text-divider-on-background);
          border-bottom: none;
        }
        .mdc-tab[hidden] {
          display: none;
        }
      </style>

      <div class="mdc-tab-bar" role="tablist" id="tabs">
        <div class="mdc-tab-scroller">
          <div class="mdc-tab-scroller__scroll-area">
            <div class="mdc-tab-scroller__scroll-content">
              
              <template is="dom-repeat" items="[[tabs]]">
                
                <button class="mdc-tab" role="tab" aria-selected="false" tabindex="[[index]]" hidden$="[[item.hidden]]">
                  <span class="mdc-tab__content">
                      <span class="mdc-tab__icon material-icons" aria-hidden="true">[[item.icon]]</span>
                    <span class="mdc-tab__text-label">[[item.label]]</span>
                  </span>
                  <span class="mdc-tab-indicator">
                    <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                  </span>
                  <span class="mdc-tab__ripple"></span>
                </button>

              </template>

            </div>
          </div>
        </div>
      </div>
    `}}customElements.define("dnd-tabs",n);a(84),a(78),a(142);var d=a(1),c=a(17),r=a(67),l=a(132),o=a(75),h=a(11),b=a(68);class m extends i.a{static get properties(){return{loading:{type:Boolean,value:!0},characterName:{type:String,value:""},initialSelectedTab:{type:Number,value:0},indexForTabs:{type:Number,value:0},isEditMode:{type:Boolean,value:!1},routeSelection:{type:String,observer:"routeSelectionChange"}}}static get observers(){return["_setName(characterName)"]}_setName(e){e&&Object(c.vb)(e)}constructor(){super(),this.tabs=this.defaultTabs()}connectedCallback(){super.connectedCallback(),this.tabChangeHandler=e=>{let t=e.detail.index,i=this.tabs[t].viewId;Object(h.f)(i),this.indexForTabs=t,void 0!==i&&(this.loading=!0,a(151)("./dnd-character-builder-"+i).then(()=>{this.updateView(document.createElement("dnd-character-builder-"+i))}))},this.addEventListener("tabChange",this.tabChangeHandler),this.loadingHandler=()=>{setTimeout(()=>{this.loading=!1},0)},this.addEventListener("loadingChange",this.loadingHandler),this.setStateFromCharacter(Object(c.F)()),this.characterChangeHandler=e=>{this.setStateFromCharacter(e.detail.character)},Object(c.l)().addEventListener("character-selected",this.characterChangeHandler),this.fixedTabsScrollHandler=()=>{if(this.$.tabs.matches(".fixed--bottom"))return;this.$.tabWrap.getBoundingClientRect().top<=104?this.$.tabs.classList.add("fixed"):this.$.tabs.classList.remove("fixed")},window.addEventListener("scroll",this.fixedTabsScrollHandler),this.$.tabs.classList.remove("fixed"),this.nameFieldFocusHandler=e=>{"New Character"===this.$.name.value&&this.$.name.inputElement.select()},this.$.name.addEventListener("focus",this.nameFieldFocusHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode,Object(b.b)(this.isEditMode,this)},Object(l.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(l.c)(),this.isLoaded||(this.isLoaded=!0,Object(r.a)(this.$.tabTarget,"right",()=>{if(this.indexForTabs>0){const e=this.indexForTabs-1;if(this.tabs[e].hidden){if(this.indexForTabs>1){const e=this.indexForTabs-2;this.$.tabs.tabBar.activateTab(e)}}else this.$.tabs.tabBar.activateTab(e)}}),Object(r.a)(this.$.tabTarget,"left",()=>{if(this.indexForTabs<this.tabs.length-1){const e=this.indexForTabs+1;if(this.tabs[e].hidden){if(this.indexForTabs<this.tabs.length-2){const e=this.indexForTabs+2;this.$.tabs.tabBar.activateTab(e)}}else this.$.tabs.tabBar.activateTab(e)}})),this.rollHandler=e=>{const{name:t,roll:a,result:i}=e.detail,s=document.createElement("div");s.classList.add("roll-result"),s.innerHTML=`${t}: ${i}`,this.$.rollContainer.appendChild(s),setTimeout(()=>{s.remove()},3900)},Object(o.c)().addEventListener("roll",this.rollHandler),this._selectionChangeHandler=e=>{e&&e.detail&&e.detail.selection&&(this.routeSelection=e.detail.selection)},Object(h.e)().addEventListener("selection-change",this._selectionChangeHandler),this.routeSelection=Object(h.c)()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("tabChange",this.tabChangeHandler),this.removeEventListener("loadingChange",this.loadingHandler),window.removeEventListener("scroll",this.fixedTabsScrollHandler),Object(c.l)().removeEventListener("character-selected",this.characterChangeHandler),this.$.name.removeEventListener("focus",this.nameFieldFocusHandler),Object(l.b)().removeEventListener("editModeChange",this.editModeHandler),Object(o.c)().removeEventListener("roll",this.rollHandler)}updateView(e){window.requestAnimationFrame(()=>{const t=window.scrollY;Object(d.jqEmpty)(this.$.tabTarget),this.$.tabTarget.appendChild(e),this.$.tabs.classList.remove("fixed"),window.scrollTo(0,t)})}routeSelectionChange(){if(this.tabs&&this.routeSelection){const e=this.tabs.findIndex(e=>e.viewId===this.routeSelection);this.initialSelectedTab=e>-1?e:0}}async setStateFromCharacter(e){this.characterName=e.name,this.classLevel=Object(c.u)(e),this.background=Object(c.x)("backgrounds",e,!0),this.race=Object(c.x)("races",e,!0);let t=!0;if(e){const a=await Object(c.s)(e),i=Object(c.r)(e);for(const[s,n]of Object.entries(i)){const i=a[s];if(i.casterProgression&&(t=!1),e.subclasses&&e.subclasses[s]&&i.subclasses&&i.subclasses.length){const a=i.subclasses.find(t=>e.subclasses[s].name===t.name);a&&a.casterProgression&&(t=!1)}}}this.wasNonCaster!==t&&(this.wasNonCaster=t,this.tabs=t?this.nonCasterTabs():this.defaultTabs())}defaultTabs(){return[{label:"",icon:"favorite",viewId:"attributes"},{label:"",icon:"class",viewId:"class"},{label:"",icon:"face",viewId:"background-race"},{label:"",icon:"flash_on",viewId:"spells"},{label:"",icon:"local_grocery_store",viewId:"equipment"},{label:"",icon:"receipt",viewId:"abilities"},{label:"",icon:"casino",viewId:"rolls"}]}nonCasterTabs(){return[{label:"",icon:"favorite",viewId:"attributes"},{label:"",icon:"class",viewId:"class"},{label:"",icon:"face",viewId:"background-race"},{label:"",icon:"flash_on",viewId:"spells",hidden:!0},{label:"",icon:"local_grocery_store",viewId:"equipment"},{label:"",icon:"receipt",viewId:"abilities"},{label:"",icon:"casino",viewId:"rolls"}]}newCharacter(){Object(c.a)()}removeCharacter(){Object(c.U)()}downloadCharacter(){const e=Object(c.F)();Object(d.downloadObjectAsJson)(e,`${e.name} - ${(new Date).toLocaleString()}`)}downloadCharacters(){const e=Object(c.p)();Object(d.downloadObjectAsJson)(e,"Character Export - "+(new Date).toLocaleString())}processUpload(e){const t=e.target.files;console.log("upload",t);const a=(new Date).toLocaleString();for(let e of t)if(e&&"application/json"===e.type){const t=new FileReader;t.addEventListener("load",e=>{const t=JSON.parse(e.target.result),i=Array.isArray(t)?t:[t];for(let e of i)e.name+=" "+a,Object(c.wb)(e)}),t.readAsText(e)}}toggleEditMode(){Object(l.a)(!this.isEditMode)}_editIcon(e){return e?"check":"edit"}_editModeClass(e){return e?"edit-mode":"not-edit-mode"}static get template(){return i.b`
      <style include="material-styles"></style>
      <style>
        :host {
          display: block;
        }
        .head-wrap {
          display: flex;
          flex-direction: column;
        }

        .char-change {
          display: flex;
          flex-wrap: wrap;
        }
        .char-change vaadin-text-field {
          font-size: 24px;
          margin: 0 8px 12px 0;
          max-width: calc(100% - 50px);
        }
        .char-change .mdc-icon-button {
          margin-left: 8px;
        }
        .char-name {
          display: flex;
          flex-direction: column;
        }
        .char-detail-edit {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .char-detail {
          font-size: 16px;
          line-height: 1.5;
          display: flex;
          flex-direction: column;
        }
        .char-detail__class {
          font-size: 17px;
        }
        .char-detail__race-background {
          font-size: 13px;
          font-style: italic;
        }
        .roll-container {
          position: relative;
        }
        .roll-result {
          animation-name: fadeOutUp;
          animation-duration: 4s;
          animation-timing-function: ease-in;
          position: absolute;
          top: -80px;
          width: calc(100vw - 50px);
          right: 0;
          font-weight: bold;
          font-size: 20px;
          color: var(--mdc-theme-secondary);
          z-index: 1000;
        }

        @media(min-width: 921px) {
          .roll-result {
            top: calc(var(--vh, 1vh) * 100 - 300px);
            right: 50px;
          }
        }

        @keyframes fadeOutUp {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(calc(var(--vh, 1vh) * -20));
          }
        }

        .thumb-menu {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 2;
          display: flex;
          flex-direction: column-reverse;
        }
        .thumb-menu__btn {
          border-radius: 50%;
        }
        .edit-mode .edit-button {
          background: var(--mdc-theme-secondary) !important;
        }
        .download-mobile {
          margin-bottom: 20px;
          background: var(--mdc-theme-secondary) !important;
        }
        .not-edit-mode .download-mobile {
          display: none;
        }

        .tab-wrap {
          background-color: var(--mdc-theme-surface);
          border: 1px solid var(--mdc-theme-text-divider-on-background);
          display: flex;
          flex-direction: column;
        }
        #tabTarget {
          flex-grow: 1;
        }

        .buttons {
          display: flex;
          margin-left: auto;
        }

        .not-edit-mode .delete-char,
        .not-edit-mode .add-char {
          display: none;
        }
        .not-edit-mode .download-char,
        .not-edit-mode .download-all-char,
        .not-edit-mode .upload-char {
          display: block;
        }
        .download-char,
        .download-all-char,
        .upload-char {
          display: none;
        }

        .upload-char input {
          display: none;
        }

        .upload-char .mdc-icon-button {
          overflow: hidden;
        }
        .upload-char .material-icons {
          position: absolute;
          left: -132px;
        }


        @media(max-width: 420px) {
          .thumb-menu {
            bottom: 90px;
          }
          #tabs.fixed {
            position: fixed;
            top: 56px;
            z-index: 2;
            box-shadow: 0px 0px 30px -5px rgba(0,0,0,0.75);
            border-bottom: 1px solid var(--mdc-theme-text-divider-on-background);
          }
          #tabs.fixed + .tab-wrap {
            margin-top: 64px;
          }
          #tabs.fixed--bottom {
            position: fixed;
            bottom: 0;
            z-index: 2;
            box-shadow: 0px 0px 30px -10px rgba(0,0,0,0.75);
            border-top: 1px solid var(--mdc-theme-text-divider-on-background);
            height: 64px
          }
          #tabs.fixed--bottom + .tab-wrap {
            margin-bottom: 94px;
          }
          .character-builder--tabs-wrapper {
            margin: 0 -16px -90px;
          }
          .tab-wrap {
            min-height: calc(var(--vh, 1vh) * 100 - 250px);
          }
        }

        @media(min-width: 921px) {
          .thumb-menu {
            position: static;
          }
          .download-char {
            display: block;
          }
          .download-mobile {
            display: none;
          }
        }
      </style>

      <div class$="[[_editModeClass(isEditMode)]]">
        <div class="head-wrap">
          <div class="char-change">
            <div class="char-name">
              <div>
                <vaadin-text-field id="name" class="name" value="{{characterName}}" disabled$="[[!isEditMode]]"></vaadin-text-field>
                <dnd-character-select mini></dnd-character-select>
              </div>

              <div class="char-detail-edit">
                <div class="char-detail">
                  <span class="char-detail__class">[[classLevel]]</span>
                  <span class="char-detail__race-background">[[race]], [[background]]</span>
                </div>
              </div>
            </div>

            <div class="buttons">
              <button class="mdc-icon-button material-icons add-char" on-click="newCharacter">person_add</button>
              <button class="mdc-icon-button material-icons delete-char" on-click="removeCharacter">delete</button>
              <button class="mdc-icon-button material-icons download-char" on-click="downloadCharacter">file_download</button>
              
              <button class="mdc-icon-button download-all-char" on-click="downloadCharacters">
                <span class=" material-icons">save</span>
              </button>

              <label class="upload-char">
                <span class="mdc-icon-button">
                  <span class=" material-icons">drive_folder_upload</span>
                </span>
                <input type="file" id="file-selector" accept=".json" on-change="processUpload" />
              </label>
            </div>
          </div>
        </div>

        <div class="thumb-menu">
          <div class="roll-container" id="rollContainer"></div>
          <button class="thumb-menu__btn edit-button mdc-icon-button mdc-button--raised material-icons"  on-click="toggleEditMode">[[_editIcon(isEditMode)]]</button>
        </div>

        <div class="character-builder--tabs-wrapper">
          <dnd-tabs id="tabs" class='fixed--bottom' theme="large" tabs="[[tabs]]" initial-selected-index="[[initialSelectedTab]]"></dnd-tabs>

          <div class="tab-wrap" id="tabWrap">
            <div id="tabTarget" hidden$="[[loading]]"></div>
            <dnd-spinner loading$="[[loading]]"></dnd-spinner>
          </div>
        </div>
      </div>
    `}}customElements.define("dnd-character-builder-view",m)},132:function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"a",(function(){return d})),a.d(t,"c",(function(){return c}));const i=document.createElement("div");let s=!1;function n(){return i}function d(e){i.dispatchEvent(new CustomEvent("editModeChange",{bubbles:!0,composed:!0,detail:{isEditMode:e}}))}function c(){return s}i.addEventListener("editModeChange",e=>{e.detail&&(s=!!e.detail.isEditMode)})},142:function(e,t,a){"use strict";var i=a(7),s=a(108);class n extends i.a{static get properties(){return{initialValue:{type:Boolean,value:!1,observer:"initValueChange"},checked:{type:Boolean,value:!1,reflectToAttribute:!0,notify:!0},label:{type:String,value:""},secondaryLabel:{type:String,value:""},disabled:{type:Boolean,value:!1,reflectToAttribute:!0}}}initValueChange(){this.switchEl&&(this.switchEl.checked=this.initialValue,this.checked=this.initialValue)}ready(){super.ready(),setTimeout(()=>{this.switchEl=new s.a(this.shadowRoot.querySelector(".mdc-switch")),this.switchEl.checked=this.initialValue,this.checked=this.initialValue},10)}connectedCallback(){super.connectedCallback(),this.switchEventHandler=()=>{this.checked=this.switchEl.checked,this.dispatchEvent(new CustomEvent("switch-change",{detail:{checked:this.switchEl.checked},bubbles:!0,composed:!0}))},this.shadowRoot.querySelector(".mdc-switch__native-control").addEventListener("change",this.switchEventHandler)}disconnectedCallback(){super.disconnectedCallback(),this.shadowRoot.querySelector(".mdc-switch__native-control").removeEventListener("change",this.switchEventHandler)}_switchClasses(e){return e?"mdc-switch mdc-list-item__meta mdc-switch--disabled":"mdc-switch mdc-list-item__meta"}static get template(){return i.b`
      <style include="material-styles">
        :host {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        :host([checked]) label.secondary {
          color: var(--mdc-theme-primary);
        }
        :host([checked]) label:not(.secondary) {
          color: var(--lumo-secondary-text-color);
        }
        label {
          color: var(--mdc-theme-primary);
          font-weight: 500;
          font-size: var(--lumo-font-size-s);
          margin-right: 16px;
          transition: color 0.2s;
        }
        label.secondary {
          color: var(--lumo-secondary-text-color);
          margin-right: 0;
          margin-left: 16px;
        }
      </style>
      
      <label for="switch">[[label]]</label>
      <div class$="[[_switchClasses(disabled)]]">
        <div class="mdc-switch__track"></div>
        <div class="mdc-switch__thumb-underlay">
          <div class="mdc-switch__thumb">
            <input type="checkbox" id="switch" class="mdc-switch__native-control" role="switch" disabled$="[[disabled]]" />
          </div>
        </div>
      </div>
      <label class="secondary">[[secondaryLabel]]</label>
    `}}customElements.define("dnd-switch",n)},151:function(e,t,a){var i={"./dnd-character-builder-abilities":[143,0,6],"./dnd-character-builder-abilities.js":[143,0,6],"./dnd-character-builder-attributes":[144,0,9],"./dnd-character-builder-attributes.js":[144,0,9],"./dnd-character-builder-background-race":[145,4,12],"./dnd-character-builder-background-race.js":[145,4,12],"./dnd-character-builder-class":[148,1,0,10],"./dnd-character-builder-class.js":[148,1,0,10],"./dnd-character-builder-equipment":[149,1,5,11],"./dnd-character-builder-equipment-item-detail":[139,5],"./dnd-character-builder-equipment-item-detail.js":[139,5],"./dnd-character-builder-equipment.js":[149,1,5,11],"./dnd-character-builder-rolls":[146,0,7],"./dnd-character-builder-rolls.js":[146,0,7],"./dnd-character-builder-spells":[147,1,0,8],"./dnd-character-builder-spells.js":[147,1,0,8],"./dnd-character-builder-suboptions":[138,4],"./dnd-character-builder-suboptions.js":[138,4]};function s(e){if(!a.o(i,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=i[e],s=t[0];return Promise.all(t.slice(1).map(a.e)).then((function(){return a(s)}))}s.keys=function(){return Object.keys(i)},s.id=151,e.exports=s}}]);
//# sourceMappingURL=26.bundle.js.map