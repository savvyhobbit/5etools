(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{166:function(e,t,a){"use strict";a.r(t);var i=a(2),s=(a(19),a(20),a(200)),r=(a(125),a(94),a(1)),n=a(32);class d extends i.a{static get properties(){return{tabs:{type:Array,observer:"tabsChanged"},initialSelectedIndex:{type:Number,value:0,observer:"selectedIndexChange"}}}tabsChanged(){this.tabs.length&&(this.tabBar&&this.$.tabs.removeEventListener("MDCTabBar:activated",this.handleTabChange),setTimeout(()=>{this.tabBar=new s.a(this.$.tabs),this.$.tabs.addEventListener("MDCTabBar:activated",this.handleTabChange),this.tabBar.activateTab(this.initialSelectedIndex)},10))}selectedIndexChange(){this.tabBar&&this.initialSelectedIndex&&this.tabBar.activateTab(this.initialSelectedIndex)}handleTabChange(e){const t=e.detail.index;this.dispatchEvent(new CustomEvent("tabChange",{bubbles:!0,composed:!0,detail:{index:t}}))}_iconClass(e){return"mdc-tab__icon fas fa-"+e}_disableScrolling(){this.scrollPosition=this.$.scrollWrap.scrollLeft;const e=this.$.scrollWrap.clientWidth;this.maxScroll=this.$.dragWrap.clientWidth-e,this.$.scrollWrap.style.width=e+"px",this.$.dragWrap.style.position="absolute",this.$.dragWrap.style.left=`-${this.scrollPosition}px`}_enableScrolling(){this.$.scrollWrap.style.width=null,this.$.dragWrap.style.position=null,this.$.dragWrap.style.left=null,setTimeout(()=>{this.$.scrollWrap.scrollTo(this.scrollPosition,0)},1)}_touchstart(e){e.target.closest(".mdc-tab")&&(this.dragInitTimer=setTimeout(()=>{window.navigator.vibrate(20),this.dragInitTimer=void 0,this._disableScrolling(),this.draggedItem={...e.model.__data.item,dragged:!0},this.draggedIndex=e.model.__data.index,this.splice("tabs",this.draggedIndex,1),this.splice("tabs",this.draggedIndex,0,Object(r.cloneDeep)(this.draggedItem))},200))}_touchmove(e){this.dragInitTimer?clearTimeout(this.dragInitTimer):(e.preventDefault(),this.touchLocation=e.targetTouches[0].pageX,this._scrollIt(),this._checkDragPosition())}_scrollIt(){const e=this.$.tabs.getBoundingClientRect(),t=e.left,a=e.right;let i=!1;this.touchLocation-75<t&&this.scrollPosition>0?(this.scrollPosition=this.scrollPosition-2,this.$.dragWrap.style.left=`-${this.scrollPosition}px`,i=!0):this.touchLocation+75>a&&this.scrollPosition<this.maxScroll&&(this.scrollPosition=this.scrollPosition+2,this.$.dragWrap.style.left=`-${this.scrollPosition}px`,i=!0),i?(this._checkDragPosition(),this.scrollItInterval||(this.scrollItInterval=setInterval(()=>{this._scrollIt()},20))):(clearInterval(this.scrollItInterval),this.scrollItInterval=null)}_checkDragPosition(){Array.from(this.$.dragWrap.children).forEach((e,t)=>{const a=e.getBoundingClientRect(),i=a.left,s=a.right;i<this.touchLocation&&s>this.touchLocation&&(this.splice("tabs",this.draggedIndex,1),this.splice("tabs",t,0,this.draggedItem),this.draggedIndex=t)})}_touchend(){this.dragInitTimer?clearTimeout(this.dragInitTimer):(this._enableScrolling(),this.draggedItem.dragged=!1,console.error("draggedIndex",this.draggedIndex),null!==this.draggedIndex&&void 0!==this.draggedIndex&&(this.splice("tabs",this.draggedIndex,1),this.splice("tabs",this.draggedIndex,0,Object(r.cloneDeep)(this.draggedItem)),this.draggedItem=null,this.draggedIndex=null,Object(n.pb)(this.tabs),console.error("setting tabs",this.tabs)))}static get template(){return i.b`
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
        .mdc-tab-scroller__scroll-area {
          height: 64px;
        }
        .mdc-tab[hidden] {
          display: none;
        }
        .mdc-tab[dragged] {
          background-color: var(--lumo-primary-color-10pct);
          transform: scale(1.2);
        }
        .mdc-tab[dragged] .mdc-tab__icon {
          /* display: none; */
        }
        .mdc-tab__ripple:after,
        .mdc-tab__ripple:before {
          opacity: 0 !important;
        }
      </style>

      <div class="mdc-tab-bar" role="tablist" id="tabs">
        <div class="mdc-tab-scroller">
          <div class="mdc-tab-scroller__scroll-area" id="scrollWrap">
            <div class="mdc-tab-scroller__scroll-content" id="dragWrap">
              
              <template is="dom-repeat" items="[[tabs]]">
                
                <button class="mdc-tab" dragged$="[[item.dragged]]" role="tab" aria-selected="false" tabindex="[[index]]" hidden$="[[item.hidden]]" on-touchstart="_touchstart" on-touchmove="_touchmove" on-touchend="_touchend">
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
    `}}customElements.define("dnd-tabs",d);a(133),a(95),a(183),a(138),a(139);var l=a(192),o=a(100),c=a(46),h=a(9),b=a(101);a(197),a(196);class p extends i.a{static get properties(){return{loading:{type:Boolean,value:!0},characterName:{type:String,value:""},initialSelectedTab:{type:Number,value:0},indexForTabs:{type:Number,value:0},isEditMode:{type:Boolean,value:!1},routeSelection:{type:String,observer:"routeSelectionChange"},deleteModalOpen:{type:Boolean,value:!1},pulse:{type:Boolean,value:!0}}}static get observers(){return["_setName(characterName)"]}_setName(e){e&&Object(n.Wb)(e)}constructor(){super(),this.tabs=this.casterTabs(),this.menuItems=this.defaultMenu()}connectedCallback(){super.connectedCallback(),this.tabChangeHandler=e=>{let t=e.detail.index,i=this.tabs[t].viewId;Object(h.i)(i),this.indexForTabs=t,void 0!==i&&(this.loading=!0,a(194)("./dnd-character-builder-"+i).then(()=>{this.updateView(document.createElement("dnd-character-builder-"+i))}))},this.addEventListener("tabChange",this.tabChangeHandler),this.loadingHandler=()=>{setTimeout(()=>{this.loading=!1},0)},this.addEventListener("loadingChange",this.loadingHandler),this.setStateFromCharacter(Object(n.U)()),this.characterChangeHandler=e=>{console.error("character_change_handler",e.detail.character),this.setStateFromCharacter(e.detail.character)},Object(n.q)().addEventListener("character-selected",this.characterChangeHandler),this.fixedTabsScrollHandler=()=>{if(this.$.tabs.matches(".fixed--bottom"))return;this.$.tabWrap.getBoundingClientRect().top<=104?this.$.tabs.classList.add("fixed"):this.$.tabs.classList.remove("fixed")},window.addEventListener("scroll",this.fixedTabsScrollHandler),this.$.tabs.classList.remove("fixed"),this.nameFieldFocusHandler=e=>{"New Character"===this.$.name.value&&this.$.name.inputElement.select()},this.$.name.addEventListener("focus",this.nameFieldFocusHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode,this.pulse=!1,Object(b.b)(this.isEditMode,this)},Object(c.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(c.c)(),this.isLoaded||(this.isLoaded=!0,Object(o.a)(this.$.tabTarget,"right",()=>{if(this.indexForTabs>0){const e=this.indexForTabs-1;if(this.tabs[e].hidden){if(this.indexForTabs>1){const e=this.indexForTabs-2;this.$.tabs.tabBar.activateTab(e)}}else this.$.tabs.tabBar.activateTab(e)}},null,".table"),Object(o.a)(this.$.tabTarget,"left",()=>{if(this.indexForTabs<this.tabs.length-1){const e=this.indexForTabs+1;if(this.tabs[e].hidden){if(this.indexForTabs<this.tabs.length-2){const e=this.indexForTabs+2;this.$.tabs.tabBar.activateTab(e)}}else this.$.tabs.tabBar.activateTab(e)}},null,".table")),this._selectionChangeHandler=e=>{e&&e.detail&&e.detail.selection&&(this.routeSelection=e.detail.selection)},Object(h.h)().addEventListener("selection-change",this._selectionChangeHandler),this.routeSelection=Object(h.e)()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("tabChange",this.tabChangeHandler),this.removeEventListener("loadingChange",this.loadingHandler),window.removeEventListener("scroll",this.fixedTabsScrollHandler),Object(n.q)().removeEventListener("character-selected",this.characterChangeHandler),this.$.name.removeEventListener("focus",this.nameFieldFocusHandler),Object(c.b)().removeEventListener("editModeChange",this.editModeHandler)}updateView(e){window.requestAnimationFrame(()=>{const t=window.scrollY;Object(r.jqEmpty)(this.$.tabTarget),this.$.tabTarget.appendChild(e),this.$.tabs.classList.remove("fixed"),window.scrollTo(0,t)})}routeSelectionChange(){if(this.tabs&&this.routeSelection){const e=this.tabs.findIndex(e=>e?e.viewId===this.routeSelection:(console.error("here 3"),!1));this.initialSelectedTab=e>-1?e:0}}async setStateFromCharacter(e){this.characterName=e.name,this.classLevel=Object(n.G)(e),this.background=Object(n.J)("backgrounds",e,!0),this.race=Object(n.J)("races",e,!0);let t=!0;if(e)if(e.choices&&Object.values(e.choices).find(e=>e.additionalSpells))t=!1;else{const a=await Object(n.F)(e),i=Object(n.E)(e);for(const[s,r]of Object.entries(i)){const i=a[s];if(i.casterProgression&&(t=!1),e.subclasses&&e.subclasses[s]&&i.subclasses&&i.subclasses.length){const a=i.subclasses.find(t=>e.subclasses[s].name===t.name);a&&a.casterProgression&&(t=!1)}}}this.wasNonCaster!==t&&(this.wasNonCaster=t,this.tabs=t?this.nonCasterTabs():this.casterTabs())}casterTabs(){const e=Object(n.S)();return e.forEach(e=>{e?"spells"===e.viewId&&(e.hidden=!1):console.error("here 1")}),e}nonCasterTabs(){const e=Object(n.S)();return e.forEach(e=>{e?"spells"===e.viewId&&(e.hidden=!0):console.error("here 2")}),e}defaultMenu(){return[{component:this.createMenuItem("user-plus"),key:"add",tooltip:"Create New Character"},{component:this.createMenuItem("user-slash"),key:"delete",tooltip:"Delete Character"},{component:this.createMenuItem("clone"),key:"clone",tooltip:"Clone Character"},{component:this.createMenuItem("download"),tooltip:"Download Character Data",children:[{text:"Download",key:"download"},{text:"Download All",key:"download-all"}]},{component:this.createMenuItem("upload"),tooltip:"Upload Character Data",key:"upload"}]}_menuItemSelected(e){switch(e.detail.value.key){case"add":Object(n.b)();break;case"delete":this.openDeleteModal();break;case"download":this.downloadCharacter();break;case"download-all":this.downloadCharacters();break;case"upload":this.$.fileSelector.click();break;case"clone":Object(n.i)()}}createMenuItem(e,t,a=!1){const i=document.createElement("vaadin-context-menu-item"),s=document.createElement("dnd-icon");return a&&(s.style.width="var(--lumo-icon-size-s)",s.style.height="var(--lumo-icon-size-s)",s.style.marginRight="var(--lumo-space-s)"),s.setAttribute("icon",e),i.appendChild(s),t&&i.appendChild(document.createTextNode(t)),i}removeCharacter(){Object(n.mb)(),this.deleteModalOpen=!1}openDeleteModal(){this.deleteModalOpen=!0}closeDeleteModal(){this.deleteModalOpen=!1}downloadCharacter(e){const t=Object(n.U)();Object(l.saveAs)(new Blob([JSON.stringify(t,null,2)],{type:"application/json;charset=utf-8"}),`${t.name} - ${(new Date).toLocaleString()}`)}downloadCharacters(){const e=Object(n.u)();Object(l.saveAs)(new Blob([JSON.stringify(e,null,2)],{type:"application/json;charset=utf-8"}),"Character Export - "+(new Date).toLocaleString())}processUpload(e){const t=e.target.files;console.log("upload",t);const a=(new Date).toLocaleString();for(let e of t)if(e&&"application/json"===e.type){const t=new FileReader;t.addEventListener("load",e=>{const t=JSON.parse(e.target.result),i=Array.isArray(t)?t:[t];for(let e of i)e.name+=" "+a,Object(n.Xb)(e)}),t.readAsText(e)}}_editModeClass(e){return e?"edit-mode":"not-edit-mode"}static get template(){return i.b`
      <style include="material-styles"></style>
      <style>
        :host {
          display: block;
          --tab-bottom-margin: 270px;
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
          height: 50px;
          margin-top: -10px;
          /* z-index: 4; */
        }
        /* #nameWrapWatch.fixed {
          height: 44px;
          margin-top: -10px;
        }
        .char-input-wrap.fixed {
          position: fixed;
          top: 0;
          background-color: var(--mdc-theme-header, #fff);
          margin-top: 5px;
          margin-right: 16px;
        } */
        .char-detail {
          font-size: 16px;
          line-height: 1.5;
          display: flex;
          flex-direction: column;
        }
        .char-detail__class {
          font-size: 18px;
        }
        .char-detail__race-background {
          font-size: 14px;
          font-style: italic;
          margin-bottom: 4px;
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

        @media(max-width: 419px) {
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
          .char-detail__class {
            font-size: 20px;
          }
          .char-detail__race-background {
            font-size: 16px;
          }
        }
      </style>

      <div class$="[[_editModeClass(isEditMode)]]">
        <div class="head-wrap">
          <div id="nameWrap" class="char-input-wrap">
            <vaadin-text-field id="name" class="name" value="{{characterName}}" disabled$="[[!isEditMode]]"></vaadin-text-field>
            <dnd-character-select mini></dnd-character-select>
          </div>
          <div id="nameWrapWatch"></div>
          <div class="char-detail">
            <span class="char-detail__class">[[classLevel]]</span>
            <span class="char-detail__race-background">[[race]], [[background]]</span>
          </div>
        </div>

        <vaadin-menu-bar theme="end-aligned" items="[[menuItems]]" on-item-selected="_menuItemSelected"></vaadin-menu-bar>

        <input type="file" id="fileSelector" accept="application/JSON" on-change="processUpload" />

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
    `}}customElements.define("dnd-character-builder-view",p)},183:function(e,t,a){"use strict";var i=a(2);class s extends i.a{static get properties(){return{icon:{type:String,value:""},faType:{type:String,value:""}}}_classString(e,t){return`${t||"fa"} fa-${e}`}static get template(){return i.b`
      <style include="fa-styles"></style>
      <i class$="[[_classString(icon, faType)]]"></i>
    `}}customElements.define("dnd-icon",s)},194:function(e,t,a){var i={"./dnd-character-builder-abilities":[184,4],"./dnd-character-builder-abilities.js":[184,4],"./dnd-character-builder-attributes":[185,6],"./dnd-character-builder-attributes.js":[185,6],"./dnd-character-builder-background-race":[186,0,8],"./dnd-character-builder-background-race.js":[186,0,8],"./dnd-character-builder-class":[191,0,9],"./dnd-character-builder-class.js":[191,0,9],"./dnd-character-builder-equipment":[188,2,1,7],"./dnd-character-builder-equipment-item-detail":[181,2,1],"./dnd-character-builder-equipment-item-detail.js":[181,2,1],"./dnd-character-builder-equipment.js":[188,2,1,7],"./dnd-character-builder-rolls":[189,3],"./dnd-character-builder-rolls.js":[189,3],"./dnd-character-builder-spells":[190,5,10],"./dnd-character-builder-spells.js":[190,5,10],"./dnd-character-builder-suboptions":[180,0],"./dnd-character-builder-suboptions.js":[180,0]};function s(e){if(!a.o(i,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=i[e],s=t[0];return Promise.all(t.slice(1).map(a.e)).then((function(){return a(s)}))}s.keys=function(){return Object.keys(i)},s.id=194,e.exports=s}}]);
//# sourceMappingURL=13.bundle.js.map