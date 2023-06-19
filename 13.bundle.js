(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{158:function(e,t,a){"use strict";a.r(t);var i=a(3),s=(a(23),a(28),a(190));a(123),a(92);class n extends i.a{static get properties(){return{tabs:{type:Array,observer:"tabsChanged"},initialSelectedIndex:{type:Number,value:0,observer:"selectedIndexChange"}}}tabsChanged(){this.tabs.length&&(this.tabBar&&this.$.tabs.removeEventListener("MDCTabBar:activated",this.handleTabChange),setTimeout(()=>{this.tabBar=new s.a(this.$.tabs),this.$.tabs.addEventListener("MDCTabBar:activated",this.handleTabChange),this.tabBar.activateTab(this.initialSelectedIndex)},10))}selectedIndexChange(){this.tabBar&&this.initialSelectedIndex&&this.tabBar.activateTab(this.initialSelectedIndex)}handleTabChange(e){const t=e.detail.index;this.dispatchEvent(new CustomEvent("tabChange",{bubbles:!0,composed:!0,detail:{index:t}}))}_iconClass(e){return"mdc-tab__icon fas fa-"+e}static get template(){return i.b`
      <style include="material-styles fa-styles">
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
                      <span class$="[[_iconClass(item.icon)]]" aria-hidden="true"></span>
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
    `}}customElements.define("dnd-tabs",n);a(130),a(93),a(174);var r=a(1),d=a(183),l=a(33),o=a(98),c=a(73),b=a(105),h=a(9),m=a(99);a(187),a(186);class u extends i.a{static get properties(){return{loading:{type:Boolean,value:!0},characterName:{type:String,value:""},initialSelectedTab:{type:Number,value:0},indexForTabs:{type:Number,value:0},isEditMode:{type:Boolean,value:!1},routeSelection:{type:String,observer:"routeSelectionChange"},deleteModalOpen:{type:Boolean,value:!1},pulse:{type:Boolean,value:!0}}}static get observers(){return["_setName(characterName)"]}_setName(e){e&&Object(l.Tb)(e)}constructor(){super(),this.tabs=this.defaultTabs(),this.menuItems=this.defaultMenu()}connectedCallback(){super.connectedCallback(),this.tabChangeHandler=e=>{let t=e.detail.index,i=this.tabs[t].viewId;Object(h.i)(i),this.indexForTabs=t,void 0!==i&&(this.loading=!0,a(185)("./dnd-character-builder-"+i).then(()=>{this.updateView(document.createElement("dnd-character-builder-"+i))}))},this.addEventListener("tabChange",this.tabChangeHandler),this.loadingHandler=()=>{setTimeout(()=>{this.loading=!1},0)},this.addEventListener("loadingChange",this.loadingHandler),this.setStateFromCharacter(Object(l.T)()),this.characterChangeHandler=e=>{console.error("character_change_handler",e.detail.character),this.setStateFromCharacter(e.detail.character)},Object(l.q)().addEventListener("character-selected",this.characterChangeHandler),this.fixedTabsScrollHandler=()=>{if(this.$.tabs.matches(".fixed--bottom"))return;this.$.tabWrap.getBoundingClientRect().top<=104?this.$.tabs.classList.add("fixed"):this.$.tabs.classList.remove("fixed")},window.addEventListener("scroll",this.fixedTabsScrollHandler),this.$.tabs.classList.remove("fixed"),this.nameFieldFocusHandler=e=>{"New Character"===this.$.name.value&&this.$.name.inputElement.select()},this.$.name.addEventListener("focus",this.nameFieldFocusHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode,this.pulse=!1,Object(m.b)(this.isEditMode,this)},Object(c.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(c.c)(),this.isLoaded||(this.isLoaded=!0,Object(o.a)(this.$.tabTarget,"right",()=>{if(this.indexForTabs>0){const e=this.indexForTabs-1;if(this.tabs[e].hidden){if(this.indexForTabs>1){const e=this.indexForTabs-2;this.$.tabs.tabBar.activateTab(e)}}else this.$.tabs.tabBar.activateTab(e)}},null,".table"),Object(o.a)(this.$.tabTarget,"left",()=>{if(this.indexForTabs<this.tabs.length-1){const e=this.indexForTabs+1;if(this.tabs[e].hidden){if(this.indexForTabs<this.tabs.length-2){const e=this.indexForTabs+2;this.$.tabs.tabBar.activateTab(e)}}else this.$.tabs.tabBar.activateTab(e)}},null,".table")),this.rollHandler=e=>{const{name:t,roll:a,result:i}=e.detail,s=document.createElement("div");s.classList.add("roll-result"),s.innerHTML=`${t}: ${i}`,this.$.rollContainer.appendChild(s),setTimeout(()=>{s.remove()},3900)},Object(b.c)().addEventListener("roll",this.rollHandler),this._selectionChangeHandler=e=>{e&&e.detail&&e.detail.selection&&(this.routeSelection=e.detail.selection)},Object(h.h)().addEventListener("selection-change",this._selectionChangeHandler),this.routeSelection=Object(h.e)()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("tabChange",this.tabChangeHandler),this.removeEventListener("loadingChange",this.loadingHandler),window.removeEventListener("scroll",this.fixedTabsScrollHandler),Object(l.q)().removeEventListener("character-selected",this.characterChangeHandler),this.$.name.removeEventListener("focus",this.nameFieldFocusHandler),Object(c.b)().removeEventListener("editModeChange",this.editModeHandler),Object(b.c)().removeEventListener("roll",this.rollHandler)}updateView(e){window.requestAnimationFrame(()=>{const t=window.scrollY;Object(r.jqEmpty)(this.$.tabTarget),this.$.tabTarget.appendChild(e),this.$.tabs.classList.remove("fixed"),window.scrollTo(0,t)})}routeSelectionChange(){if(this.tabs&&this.routeSelection){const e=this.tabs.findIndex(e=>e.viewId===this.routeSelection);this.initialSelectedTab=e>-1?e:0}}async setStateFromCharacter(e){this.characterName=e.name,this.classLevel=Object(l.G)(e),this.background=Object(l.J)("backgrounds",e,!0),this.race=Object(l.J)("races",e,!0);let t=!0;if(e)if(e.choices&&Object.values(e.choices).find(e=>e.additionalSpells))t=!1;else{const a=await Object(l.F)(e),i=Object(l.E)(e);for(const[s,n]of Object.entries(i)){const i=a[s];if(i.casterProgression&&(t=!1),e.subclasses&&e.subclasses[s]&&i.subclasses&&i.subclasses.length){const a=i.subclasses.find(t=>e.subclasses[s].name===t.name);a&&a.casterProgression&&(t=!1)}}}this.wasNonCaster!==t&&(this.wasNonCaster=t,this.tabs=t?this.nonCasterTabs():this.defaultTabs())}defaultTabs(){return[{label:"",icon:"heart",viewId:"attributes"},{label:"",icon:"book-medical",viewId:"class"},{label:"",icon:"book-user",viewId:"background-race"},{label:"",icon:"book-spells",viewId:"spells"},{label:"",icon:"sack",viewId:"equipment"},{label:"",icon:"list",viewId:"abilities"},{label:"",icon:"dice",viewId:"rolls"}]}nonCasterTabs(){return[{label:"",icon:"heart",viewId:"attributes"},{label:"",icon:"book-medical",viewId:"class"},{label:"",icon:"book-user",viewId:"background-race"},{label:"",icon:"book-spells",viewId:"spells",hidden:!0},{label:"",icon:"sack",viewId:"equipment"},{label:"",icon:"list",viewId:"abilities"},{label:"",icon:"dice",viewId:"rolls"}]}defaultMenu(){return[{component:this.createMenuItem("user-plus"),key:"add",tooltip:"Create New Character"},{component:this.createMenuItem("user-slash"),key:"delete",tooltip:"Delete Character"},{component:this.createMenuItem("clone"),key:"clone",tooltip:"Clone Character"},{component:this.createMenuItem("download"),tooltip:"Download Character Data",children:[{text:"Download",key:"download"},{text:"Download All",key:"download-all"}]},{component:this.createMenuItem("upload"),tooltip:"Upload Character Data",key:"upload"}]}_menuItemSelected(e){switch(e.detail.value.key){case"add":Object(l.b)();break;case"delete":this.openDeleteModal();break;case"download":this.downloadCharacter();break;case"download-all":this.downloadCharacters();break;case"upload":this.$.fileSelector.click();break;case"clone":Object(l.i)()}}createMenuItem(e,t,a=!1){const i=document.createElement("vaadin-context-menu-item"),s=document.createElement("dnd-icon");return a&&(s.style.width="var(--lumo-icon-size-s)",s.style.height="var(--lumo-icon-size-s)",s.style.marginRight="var(--lumo-space-s)"),s.setAttribute("icon",e),i.appendChild(s),t&&i.appendChild(document.createTextNode(t)),i}removeCharacter(){Object(l.kb)(),this.deleteModalOpen=!1}openDeleteModal(){this.deleteModalOpen=!0}closeDeleteModal(){this.deleteModalOpen=!1}downloadCharacter(e){const t=Object(l.T)();Object(d.saveAs)(new Blob([JSON.stringify(t,null,2)],{type:"application/json;charset=utf-8"}),`${t.name} - ${(new Date).toLocaleString()}`)}downloadCharacters(){const e=Object(l.u)();Object(d.saveAs)(new Blob([JSON.stringify(e,null,2)],{type:"application/json;charset=utf-8"}),"Character Export - "+(new Date).toLocaleString())}processUpload(e){const t=e.target.files;console.log("upload",t);const a=(new Date).toLocaleString();for(let e of t)if(e&&"application/json"===e.type){const t=new FileReader;t.addEventListener("load",e=>{const t=JSON.parse(e.target.result),i=Array.isArray(t)?t:[t];for(let e of i)e.name+=" "+a,Object(l.Ub)(e)}),t.readAsText(e)}}toggleEditMode(){Object(c.a)(!this.isEditMode)}openDrawer(){this.dispatchEvent(new CustomEvent("open-drawer",{bubbles:!0}))}_editIcon(e){return e?"check":"edit"}_editModeClass(e){return e?"edit-mode":"not-edit-mode"}static get template(){return i.b`
      <style include="material-styles"></style>
      <style>
        :host {
          display: block;
          --tab-bottom-margin: 250px;
        }
        .head-wrap {
          display: flex;
          flex-direction: column;
        }

        vaadin-text-field {
          font-size: 24px;
          margin: 0 8px 12px 0;
          --vaadin-field-default-width: null;
          flex-grow: 1;
          max-width: 500px;
        }
        .char-input-wrap {
          display: flex;
          height: 58px;
        }
        .char-input-wrap.fixed {
          position: fixed;
          top: 0;
        }
        .char-detail {
          font-size: 16px;
          line-height: 1.5;
          display: flex;
          flex-direction: column;
        }
        .char-detail__class {
          font-size: 20px;
        }
        .char-detail__race-background {
          font-size: 16px;
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
          margin-right: auto;
        }
        .thumb-menu__btn {
          border-radius: 50%;
        }
        .drawer-btn {
          margin-bottom: 20px;
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
        #fileSelector {
          display: none;
        }

        vaadin-menu-bar {
          margin: 4px 0;
        }

        [pulse] {
          box-shadow: var(--pulse-shadow);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: var(--pulse-shadow-0);
          }
          
          70% {
            transform: scale(1);
            box-shadow: var(--pulse-shadow-70);
          }
          
          100% {
            transform: scale(0.95);
            box-shadow: var(--pulse-shadow-100);
          }
        }

        @media(max-width: 419px) {
          .thumb-menu {
            bottom: 90px;
          }
          #tabs.fixed {
            position: fixed;
            top: 56px;
            z-index: 2;
            box-shadow: 0px 0px 20px -5px var(--mdc-theme-text-primary-on-background);
            border-bottom: 1px solid var(--mdc-theme-text-divider-on-background);
          }
          #tabs.fixed + .tab-wrap {
            margin-top: 64px;
          }
          #tabs.fixed--bottom {
            position: fixed;
            bottom: 0;
            z-index: 2;
            box-shadow: 0px 0px 30px -10px var(--mdc-theme-text-primary-on-background);
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

          vaadin-menu-bar {
            margin-right: -12px;
          }
        }

        @media(min-width: 921px) {
          .thumb-menu__btn {
            margin-left: auto;
            position: relative;
            top: -10px;
          }
          .drawer-btn {
            display: none;
          }
          .edit-button {
            height: 80px;
            width: 80px;
            font-size: 36px;
            right: 36px;
          }
        }
      </style>

      <div class$="[[_editModeClass(isEditMode)]]">
        <div class="head-wrap">
          <div class="char-input-wrap">
            <vaadin-text-field id="name" class="name" value="{{characterName}}" disabled$="[[!isEditMode]]"></vaadin-text-field>
            <dnd-character-select mini></dnd-character-select>
          </div>

          <div class="char-detail">
            <span class="char-detail__class">[[classLevel]]</span>
            <span class="char-detail__race-background">[[race]], [[background]]</span>
          </div>
        </div>

        <div class="thumb-menu">
          <div class="roll-container" id="rollContainer"></div>
          <button class="edit-button thumb-menu__btn mdc-icon-button mdc-button--raised material-icons" pulse$="[[pulse]]" on-click="toggleEditMode">[[_editIcon(isEditMode)]]</button>
          <button class="drawer-btn thumb-menu__btn mdc-icon-button mdc-button--raised material-icons" on-click="openDrawer">logout</button>
        </div>

        <vaadin-menu-bar theme="end-aligned" items="[[menuItems]]" on-item-selected="_menuItemSelected"></vaadin-menu-bar>

        <input type="file" id="fileSelector" accept=".json" on-change="processUpload" />

        <div class="character-builder--tabs-wrapper">
          <dnd-tabs id="tabs" class='fixed--bottom' theme="large" tabs="[[tabs]]" initial-selected-index="[[initialSelectedTab]]"></dnd-tabs>

          <div class="tab-wrap" id="tabWrap">
            <div id="tabTarget" hidden$="[[loading]]"></div>
            <dnd-spinner loading$="[[loading]]"></dnd-spinner>
          </div>
        </div>

        <vaadin-dialog opened="{{deleteModalOpen}}">
          <template>
            <style>
              .modal-content {
                display: flex;
                justify-content: center;
              }
              .modal-footer {
                display: flex;
                justify-content: space-between;
                margin-top: 20px;
              }
              .modal-footer dnd-button:first-child {
                margin-right: 40px;
                --mdc-theme-primary: var(--mdc-theme-error);
              }
            </style>
            <div class="modal-content">Delete this character?</div>
            <div class="modal-footer">
              <dnd-button label="Delete" border on-click="removeCharacter"></dnd-button>
              <dnd-button label="Cancel" border on-click="closeDeleteModal"></dnd-button>
            </div>
          </template>
        </vaadin-dialog>
      </div>
    `}}customElements.define("dnd-character-builder-view",u)},174:function(e,t,a){"use strict";var i=a(3);class s extends i.a{static get properties(){return{icon:{type:String,value:""},faType:{type:String,value:""}}}_classString(e,t){return`${t||"fa"} fa-${e}`}static get template(){return i.b`
      <style include="fa-styles"></style>
      <i class$="[[_classString(icon, faType)]]"></i>
    `}}customElements.define("dnd-icon",s)},185:function(e,t,a){var i={"./dnd-character-builder-abilities":[175,4],"./dnd-character-builder-abilities.js":[175,4],"./dnd-character-builder-attributes":[176,6],"./dnd-character-builder-attributes.js":[176,6],"./dnd-character-builder-background-race":[177,0,8],"./dnd-character-builder-background-race.js":[177,0,8],"./dnd-character-builder-class":[182,0,9],"./dnd-character-builder-class.js":[182,0,9],"./dnd-character-builder-equipment":[179,2,1,7],"./dnd-character-builder-equipment-item-detail":[172,2,1],"./dnd-character-builder-equipment-item-detail.js":[172,2,1],"./dnd-character-builder-equipment.js":[179,2,1,7],"./dnd-character-builder-rolls":[180,3],"./dnd-character-builder-rolls.js":[180,3],"./dnd-character-builder-spells":[181,5,10],"./dnd-character-builder-spells.js":[181,5,10],"./dnd-character-builder-suboptions":[171,0],"./dnd-character-builder-suboptions.js":[171,0]};function s(e){if(!a.o(i,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=i[e],s=t[0];return Promise.all(t.slice(1).map(a.e)).then((function(){return a(s)}))}s.keys=function(){return Object.keys(i)},s.id=185,e.exports=s}}]);
//# sourceMappingURL=13.bundle.js.map