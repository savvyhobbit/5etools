(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{100:function(e,t,a){"use strict";a.r(t);var i=a(7),s=(a(62),a(70),a(144));a(74),a(75);class d extends i.a{static get properties(){return{tabs:{type:Array,observer:"tabsChanged"},initialSelectedIndex:{type:Number,value:0}}}tabsChanged(){this.tabs.length&&setTimeout(()=>{this.tabBar=new s.a(this.$.tabs),this.$.tabs.addEventListener("MDCTabBar:activated",e=>{this.handleTabChange(e.detail.index)}),this.tabBar.activateTab(this.initialSelectedIndex)},0)}handleTabChange(e){this.dispatchEvent(new CustomEvent("tabChange",{bubbles:!0,composed:!0,detail:{index:e}}))}static get template(){return i.b`
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
      </style>

      <div class="mdc-tab-bar" role="tablist" id="tabs">
        <div class="mdc-tab-scroller">
          <div class="mdc-tab-scroller__scroll-area">
            <div class="mdc-tab-scroller__scroll-content">
              
              <template is="dom-repeat" items="[[tabs]]">
                
                <button class="mdc-tab" role="tab" aria-selected="false" tabindex="[[index]]">
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
    `}}customElements.define("dnd-tabs",d);a(80),a(76),a(120);var n=a(1),c=a(18),r=a(67),l=a(107);class o extends i.a{static get properties(){return{loading:{type:Boolean,value:!0},characterName:{type:String,value:""},initialSelectedTab:{type:Number,value:0},indexForTabs:{type:Number,value:0},isEditMode:{type:Boolean,value:!1}}}static get observers(){return["_setName(characterName)"]}_setName(e){e&&Object(c.jb)(e)}constructor(){super(),this.tabs=[{label:"",icon:"favorite",viewId:"attributes"},{label:"",icon:"class",viewId:"class"},{label:"",icon:"face",viewId:"background-race"},{label:"",icon:"flash_on",viewId:"spells"},{label:"",icon:"local_grocery_store",viewId:"equipment"}]}connectedCallback(){super.connectedCallback(),this.tabChangeHandler=e=>{let t=e.detail.index,i=this.tabs[t].viewId;this.indexForTabs=t,void 0!==i&&(this.loading=!0,a(141)("./dnd-character-builder-"+i).then(()=>{this.updateView(document.createElement("dnd-character-builder-"+i))}))},this.addEventListener("tabChange",this.tabChangeHandler),this.loadingHandler=()=>{setTimeout(()=>{this.loading=!1},0)},this.addEventListener("loadingChange",this.loadingHandler),this.setStateFromCharacter(Object(c.E)()),this.characterChangeHandler=e=>{this.setStateFromCharacter(e.detail.character)},Object(c.m)().addEventListener("character-selected",this.characterChangeHandler),this.fixedTabsScrollHandler=()=>{if(this.$.tabs.matches(".fixed--bottom"))return;this.$.tabWrap.getBoundingClientRect().top<=104?this.$.tabs.classList.add("fixed"):this.$.tabs.classList.remove("fixed")},window.addEventListener("scroll",this.fixedTabsScrollHandler),this.$.tabs.classList.remove("fixed"),this.nameFieldFocusHandler=e=>{"New Character"===this.$.name.value&&this.$.name.inputElement.select()},this.$.name.addEventListener("focus",this.nameFieldFocusHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(l.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(l.c)(),this.isLoaded||(this.isLoaded=!0,Object(r.a)(this.$.tabTarget,"right",()=>{if(this.indexForTabs>0){const e=this.indexForTabs-1;this.$.tabs.tabBar.activateTab(e)}}),Object(r.a)(this.$.tabTarget,"left",()=>{if(this.indexForTabs<this.tabs.length-1){const e=this.indexForTabs+1;this.$.tabs.tabBar.activateTab(e)}}))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("tabChange",this.tabChangeHandler),this.removeEventListener("loadingChange",this.loadingHandler),window.removeEventListener("scroll",this.fixedTabsScrollHandler),Object(c.m)().removeEventListener("character-selected",this.characterChangeHandler),this.$.name.removeEventListener("focus",this.nameFieldFocusHandler),Object(l.b)().removeEventListener("editModeChange",this.editModeHandler)}updateView(e){window.requestAnimationFrame(()=>{const t=window.scrollY;Object(n.jqEmpty)(this.$.tabTarget),this.$.tabTarget.appendChild(e),this.$.tabs.classList.remove("fixed"),window.scrollTo(0,t)})}setStateFromCharacter(e){this.characterName=e.name,this.classLevel=Object(c.t)(e),this.background=Object(c.w)("backgrounds",e,!0),this.race=Object(c.w)("races",e,!0)}newCharacter(){Object(c.a)()}removeCharacter(){Object(c.P)()}toggleEditMode(){this.$.editBtn.classList.toggle("edit-mode");const e=this.$.editBtn.classList.contains("edit-mode");Object(l.a)(e),this.$.editBtn.innerHTML=e?"check":"edit"}_editModeClass(e){return e?"edit-mode":"not-edit-mode"}static get template(){return i.b`
      <style include="material-styles"></style>
      <style>
        :host {
          display: block;
        }
        .head-wrap {
          display: flex;
          flex-direction: column;
          margin-bottom: 16px;
        }

        .char-change {
          display: flex;
        }
        .char-change vaadin-text-field {
          font-size: 24px;
          margin: 0 8px 12px 0;
          max-width: calc(100% - 140px);
        }
        .char-change .mdc-icon-button {
          margin-left: 8px;
        }
        .char-detail-edit {
          display: flex;
          justify-content: space-between;
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
        #editBtn.edit-mode {
          background: var(--mdc-theme-secondary) !important;
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

        .not-edit-mode .delete-char,
        .not-edit-mode .add-char {
          display: none;
        }
        .not-edit-mode .char-change vaadin-text-field {
          max-width: calc(100% - 50px);
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
            min-height: calc(var(--vh, 1vh) * 100 - 256px);
          }
        }

        @media(min-width: 921px) {
          .thumb-menu {
            position: static;
          }
        }
      </style>

      <div class$="[[_editModeClass(isEditMode)]]">
        <div class="head-wrap">
          <div class="char-change">
            <vaadin-text-field id="name" class="name" value="{{characterName}}" disabled$="[[!isEditMode]]"></vaadin-text-field>
            <dnd-character-select mini></dnd-character-select>
            <button class="mdc-icon-button material-icons add-char" on-click="newCharacter">person_add</button>
            <button class="mdc-icon-button material-icons delete-char" on-click="removeCharacter">delete</button>
          </div>

          <div class="char-detail-edit">
            <div class="char-detail">
              <span class="char-detail__class">[[classLevel]]</span>
              <span class="char-detail__race-background">[[race]], [[background]]</span>
            </div>

            <div class="thumb-menu">
              <button class="thumb-menu__btn mdc-icon-button mdc-button--raised material-icons" id="editBtn" on-click="toggleEditMode">edit</button>
            </div>
          </div>
        </div>

        <div class="character-builder--tabs-wrapper">
          <dnd-tabs id="tabs" class='fixed--bottom' theme="large" tabs="[[tabs]]" initial-selected-index="[[initialSelectedTab]]"></dnd-tabs>

          <div class="tab-wrap" id="tabWrap">
            <div id="tabTarget" hidden$="[[loading]]"></div>
            <dnd-spinner loading$="[[loading]]"></dnd-spinner>
          </div>
        </div>
      </div>
    `}}customElements.define("dnd-character-builder-view",o)},107:function(e,t,a){"use strict";a.d(t,"b",(function(){return d})),a.d(t,"a",(function(){return n})),a.d(t,"c",(function(){return c}));const i=document.createElement("div");let s=!1;function d(){return i}function n(e){i.dispatchEvent(new CustomEvent("editModeChange",{bubbles:!0,composed:!0,detail:{isEditMode:e}}))}function c(){return s}i.addEventListener("editModeChange",e=>{e.detail&&(s=!!e.detail.isEditMode)})},120:function(e,t,a){"use strict";var i=a(7),s=a(104);class d extends i.a{static get properties(){return{initialValue:{type:Boolean,value:!1,observer:"initValueChange"},checked:{type:Boolean,value:!1,reflectToAttribute:!0},label:{type:String,value:""},secondaryLabel:{type:String,value:""},disabled:{type:Boolean,value:!1,reflectToAttribute:!0}}}initValueChange(){this.switchEl&&(this.switchEl.checked=this.initialValue,this.checked=this.initialValue)}ready(){super.ready(),setTimeout(()=>{this.switchEl=new s.a(this.shadowRoot.querySelector(".mdc-switch")),this.switchEl.checked=this.initialValue,this.checked=this.initialValue},10)}connectedCallback(){super.connectedCallback(),this.switchEventHandler=()=>{this.checked=this.switchEl.checked,this.dispatchEvent(new CustomEvent("switch-change",{detail:{checked:this.switchEl.checked},bubbles:!0,composed:!0}))},this.shadowRoot.querySelector(".mdc-switch__native-control").addEventListener("change",this.switchEventHandler)}disconnectedCallback(){super.disconnectedCallback(),this.shadowRoot.querySelector(".mdc-switch__native-control").removeEventListener("change",this.switchEventHandler)}_switchClasses(e){return e?"mdc-switch mdc-list-item__meta mdc-switch--disabled":"mdc-switch mdc-list-item__meta"}static get template(){return i.b`
      <style include="material-styles">
        :host {
          display: inline-block;
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
      
      <label for="swich">[[label]]</label>
      <div class$="[[_switchClasses(disabled)]]">
        <div class="mdc-switch__track"></div>
        <div class="mdc-switch__thumb-underlay">
          <div class="mdc-switch__thumb">
            <input type="checkbox" id="swich" class="mdc-switch__native-control" role="switch" disabled$="[[disabled]]" />
          </div>
        </div>
      </div>
      <label class="secondary">[[secondaryLabel]]</label>
    `}}customElements.define("dnd-switch",d)},141:function(e,t,a){var i={"./dnd-character-builder-attributes":[125,4,8],"./dnd-character-builder-attributes.js":[125,4,8],"./dnd-character-builder-background-race":[121,9],"./dnd-character-builder-background-race.js":[121,9],"./dnd-character-builder-class":[128,3,4,5],"./dnd-character-builder-class.js":[128,3,4,5],"./dnd-character-builder-equipment":[124,3,6],"./dnd-character-builder-equipment.js":[124,3,6],"./dnd-character-builder-spells":[126,3,7],"./dnd-character-builder-spells.js":[126,3,7]};function s(e){if(!a.o(i,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=i[e],s=t[0];return Promise.all(t.slice(1).map(a.e)).then((function(){return a(s)}))}s.keys=function(){return Object.keys(i)},s.id=141,e.exports=s}}]);
//# sourceMappingURL=11.bundle.js.map