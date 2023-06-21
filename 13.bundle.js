(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{157:function(e,t,a){"use strict";a.r(t);var i=a(3),s=(a(23),a(28),a(190));a(123),a(92);class l extends i.a{static get properties(){return{tabs:{type:Array,observer:"tabsChanged"},initialSelectedIndex:{type:Number,value:0,observer:"selectedIndexChange"}}}tabsChanged(){this.tabs.length&&(this.tabBar&&this.$.tabs.removeEventListener("MDCTabBar:activated",this.handleTabChange),setTimeout(()=>{this.tabBar=new s.a(this.$.tabs),this.$.tabs.addEventListener("MDCTabBar:activated",this.handleTabChange),this.tabBar.activateTab(this.initialSelectedIndex)},10))}selectedIndexChange(){this.tabBar&&this.initialSelectedIndex&&this.tabBar.activateTab(this.initialSelectedIndex)}handleTabChange(e){const t=e.detail.index;this.dispatchEvent(new CustomEvent("tabChange",{bubbles:!0,composed:!0,detail:{index:t}}))}_iconClass(e){return"mdc-tab__icon fas fa-"+e}static get template(){return i.b`
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
    `}}customElements.define("dnd-tabs",l);a(130),a(93),a(174);var r=a(105),n=a(72);class o extends i.a{static get properties(){return{rollResults:{type:Array,value:[]},focusRoll:{type:Number,value:0},isOpen:{type:Boolean,value:!1}}}connectedCallback(){super.connectedCallback(),this.rollHandler=e=>{console.error("new-roll",e.detail),this.push("rollResults",e.detail),this.focusRoll=this.rollResults.length-1,this.isOpen=!0,setTimeout(()=>{this.$.rollResults.scrollTo({top:this.$.rollResults.scrollHeight,behavior:"smooth"})},500)},Object(r.c)().addEventListener("new-roll",this.rollHandler),this.$.rollResults.addEventListener("click",e=>{e.target.closest(".roll-result")||(this.isOpen=!1)}),this.editModeHandler=e=>{e.detail.isEditMode&&(this.isOpen=!1)},Object(n.b)().addEventListener("editModeChange",this.editModeHandler)}disconnectedCallback(){super.disconnectedCallback(),Object(r.c)().removeEventListener("new-roll",this.rollHandler),Object(n.b)().removeEventListener("editModeChange",this.editModeHandler)}_setFocusRoll(e){const t=parseInt(e.target.closest(".roll-result").getAttribute("index"));this.focusRoll=t}_deleteRoll(e){const t=parseInt(e.target.closest(".roll-result").getAttribute("index"));this.splice("rollResults",t,1),setTimeout(()=>{this.focusRoll>this.rollResults.length-1&&(this.focusRoll=this.rollResults.length-1),setTimeout(()=>{this.$.rollResults.scrollTo({top:this.$.rollResults.scrollHeight,behavior:"smooth"})},500)},0),0===this.rollResults.length&&(this.isOpen=!1)}_toggleOpen(){this.isOpen=!this.isOpen}_clearRolls(){this.rollResults=[],this.isOpen=!1}_diceIconClass(e){let t="20";if(e){const a=e.match(/(?:d)(\d+)/);a.length>1&&(t=a[1])}return"roll-result__dice fal fa-dice-d"+t}_equals(e,t){return e===t}_isLast(e,t){return t.length&&t.length-1===e}static get template(){return i.b`
      <style include="material-styles fa-styles">

        [hidden] {
          display: none !important;
        }

        .thumb-menu__btn {
          border-radius: 50%;
          margin-bottom: 12px;
          z-index: 1;
        }

        .roll-results__mask {
          position: fixed;
          right: 0;
          width: 100%;
          height: 100%;
          max-width: 800px;
          max-height: 236px;
        }
        .roll-results__background {
          width: 100%;
          height: 100%;
          background: linear-gradient(0deg, black, transparent);
        }

        .roll-results {
          position: absolute;
          bottom: 0;
          right: calc(100% - 20px);
          flex-direction: column;
          align-items: flex-end;
          width: 110vw;
          padding: 0 0 50px 0;
          margin-bottom: -30px;
          margin-right: -92px;
          max-height: 186px;
          overflow-y: scroll;
          display: none;
          scroll-snap-type: y mandatory;
        }
        .roll-results[open] {
          display: flex;
        }

        .roll-result {
          background: var(--mdc-theme-surface-surface);
          color: var(--mdc-theme-on-surface);
          border-radius: 6px;
          margin-top: 16px;
          display: flex;
          width: 225px;
          padding: 12px;
          position: relative;
          right: 130px;
          height: 82px;
          transition: height 0.3s, width 0.3s;
          outline: none;
          scroll-snap-align: start;
          z-index: 2;
        }
        .roll-results__clear {
          background: var(--mdc-theme-surface-surface);
          color: var(--mdc-theme-on-surface);
          border-radius: 6px;
          margin-top: 16px;
          position: relative;
          right: 130px;
          padding: 4px 12px;
          cursor: pointer;
        }
        .roll-result__summary {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding-right: 10px;
          border-right: 1px solid var(--mdc-theme-on-surface-surface);
          margin-right: 10px;
          flex-grow: 1;
        }
        .roll-result:after {
          content: '=';
          font-size: 29px;
          padding: 0px 0 3px;
          background: var(--mdc-theme-surface-surface);
          color: var(--mdc-theme-on-surface-surface);
          position: absolute;
          right: 78px;
          line-height: 1;
          top: 34px;
          opacity: 1;
          transition: opacity 0.3s, top 0.3s, right 0.3s;
        }
        .roll-result__title {
          margin-top: -4px;
          margin-bottom: 4px;
          overflow: hidden;
          width: auto;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 14px;
          font-weight: bold;
        }
        .roll-result__type {
          color: var(--mdc-theme-primary);
        }
        .roll-result__name:after {
          content: ':';
        }
        .roll-result__total {
          font-size: 32px;
          font-weight: bold;
          justify-content: center;
          display: flex;
          align-items: center;
          width: 64px;
          flex-shrink: 0;
          transition: width 0.3s, font-size 0.3s;
        }
        .roll-result__dice-wrap {
          display: flex;
          align-items: center;
          height: 30px;
          transition: height 0.3s;
          overflow: hidden;
        }
        .roll-result__dice {
          font-size: 30px;
          margin-right: 10px;
          color: var(--mdc-theme-on-surface-surface);
        }
        .roll-result__dice-results {
          font-size: 20px;
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .roll-result__dice-results span {
          color: var(--mdc-theme-on-surface-surface);
          position: relative;
          font-size: 17px;
          bottom: 7px;
          margin-right: 4px;
        }
        .roll-result__dice-results span:after {
          display: block;
          content: '';
          position: absolute;
          left: -1px;
          bottom: 8px;
          border-bottom: 1px solid var(--mdc-theme-on-surface-surface);
          width: 100%;
          transform: rotate(-25deg);
        } 
        .roll-result__roll {
          color: var(--mdc-theme-on-surface-surface);
          font-weight: bold;
          height: 28px;
          display: flex;
          align-items: flex-end;
          transition: height 0.3s;
          overflow: hidden;
        }
        .roll-result__close {
          position: absolute;
          height: 20px;
          width: 20px;
          right: 0px;
          top: 0px;
          border: 0;
          margin: 0;
          background: none;
          padding: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--mdc-theme-on-surface);
        }

        .roll-result[little] {
          width: 175px;
          height: 24px;
          cursor: zoom-in;
        }
        .roll-result[little] .roll-result__dice-wrap {
          height: 0;
        }
        .roll-result[little] .roll-result__roll {
          height: 0;
        }
        .roll-result[little]:after {
          opacity: 0;
          right: 47px;
          top: 7px;
        }
        .roll-result[little] .roll-result__total {
          font-size: 18px;
          width: 34px;
        }
        .roll-result[little] .roll-result__title {
          margin: 0;
        }
        .roll-result[little] .roll-result__close {
          display: none;
        }

        @media(min-width: 420px) {
          .roll-results__clear,
          .roll-result {
            right: 140px;
          }
          .roll-results__mask {
            -webkit-mask-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
            mask-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
          }
        }

        @media(min-width: 921px) {
          .roll-results {
            max-height: 314px;
          }
          .roll-results__mask {
            max-height: 364px;
          }
          .roll-result {
            width: min-content !important;
          }
          .thumb-menu__btn {
            margin-left: auto;
            position: relative;
            top: -10px;
          }
        }
      </style>
      <button class="thumb-menu__btn mdc-icon-button mdc-button--raised" on-click="_toggleOpen">
        <i class="fas fa-dice-d20"></i>
      </button>
      <div id="rollResults" class="roll-results" open$="[[isOpen]]">
        <template is="dom-repeat" items="[[rollResults]]">
          <div class="roll-result" little$="[[!_equals(index, focusRoll)]]" on-click="_setFocusRoll" index$="[[index]]">
            <div class="roll-result__summary">
              <div class="roll-result__title">
                <span class="roll-result__name">[[item.name]]</span>
                <span class="roll-result__type">[[item.type]]</span>
              </div>
              <div class="roll-result__dice-wrap">
                <i class$="[[_diceIconClass(item.roll)]]"></i>
                <div class="roll-result__dice-results" inner-h-t-m-l="[[item.result]]"></div>
              </div>
              <div class="roll-result__roll">[[item.roll]]</div>
            </div>
            <div class="roll-result__total">[[item.total]]</div>
            <button class="roll-result__close fal fa-times" on-click="_deleteRoll"></button>
          </div>
        </template>
        <div class="roll-results__mask">
          <div class="roll-results__background"></div>
        </div>
        <!-- <div class="roll-results__clear" on-click="_clearRolls">Clear</div> -->
      </div>
    `}}customElements.define("dnd-roll-results",o);var d=a(1),c=a(183),h=a(33),u=a(98),b=a(9),p=a(99);a(187),a(186);class m extends i.a{static get properties(){return{loading:{type:Boolean,value:!0},characterName:{type:String,value:""},initialSelectedTab:{type:Number,value:0},indexForTabs:{type:Number,value:0},isEditMode:{type:Boolean,value:!1},routeSelection:{type:String,observer:"routeSelectionChange"},deleteModalOpen:{type:Boolean,value:!1},pulse:{type:Boolean,value:!0}}}static get observers(){return["_setName(characterName)"]}_setName(e){e&&Object(h.Tb)(e)}constructor(){super(),this.tabs=this.defaultTabs(),this.menuItems=this.defaultMenu()}connectedCallback(){super.connectedCallback(),this.tabChangeHandler=e=>{let t=e.detail.index,i=this.tabs[t].viewId;Object(b.i)(i),this.indexForTabs=t,void 0!==i&&(this.loading=!0,a(185)("./dnd-character-builder-"+i).then(()=>{this.updateView(document.createElement("dnd-character-builder-"+i))}))},this.addEventListener("tabChange",this.tabChangeHandler),this.loadingHandler=()=>{setTimeout(()=>{this.loading=!1},0)},this.addEventListener("loadingChange",this.loadingHandler),this.setStateFromCharacter(Object(h.T)()),this.characterChangeHandler=e=>{console.error("character_change_handler",e.detail.character),this.setStateFromCharacter(e.detail.character)},Object(h.q)().addEventListener("character-selected",this.characterChangeHandler),this.fixedTabsScrollHandler=()=>{if(this.$.tabs.matches(".fixed--bottom"))return;this.$.tabWrap.getBoundingClientRect().top<=104?this.$.tabs.classList.add("fixed"):this.$.tabs.classList.remove("fixed")},window.addEventListener("scroll",this.fixedTabsScrollHandler),this.$.tabs.classList.remove("fixed"),this.nameFieldFocusHandler=e=>{"New Character"===this.$.name.value&&this.$.name.inputElement.select()},this.$.name.addEventListener("focus",this.nameFieldFocusHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode,this.pulse=!1,Object(p.b)(this.isEditMode,this)},Object(n.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(n.c)(),this.isLoaded||(this.isLoaded=!0,Object(u.a)(this.$.tabTarget,"right",()=>{if(this.indexForTabs>0){const e=this.indexForTabs-1;if(this.tabs[e].hidden){if(this.indexForTabs>1){const e=this.indexForTabs-2;this.$.tabs.tabBar.activateTab(e)}}else this.$.tabs.tabBar.activateTab(e)}},null,".table"),Object(u.a)(this.$.tabTarget,"left",()=>{if(this.indexForTabs<this.tabs.length-1){const e=this.indexForTabs+1;if(this.tabs[e].hidden){if(this.indexForTabs<this.tabs.length-2){const e=this.indexForTabs+2;this.$.tabs.tabBar.activateTab(e)}}else this.$.tabs.tabBar.activateTab(e)}},null,".table")),this._selectionChangeHandler=e=>{e&&e.detail&&e.detail.selection&&(this.routeSelection=e.detail.selection)},Object(b.h)().addEventListener("selection-change",this._selectionChangeHandler),this.routeSelection=Object(b.e)()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("tabChange",this.tabChangeHandler),this.removeEventListener("loadingChange",this.loadingHandler),window.removeEventListener("scroll",this.fixedTabsScrollHandler),Object(h.q)().removeEventListener("character-selected",this.characterChangeHandler),this.$.name.removeEventListener("focus",this.nameFieldFocusHandler),Object(n.b)().removeEventListener("editModeChange",this.editModeHandler)}updateView(e){window.requestAnimationFrame(()=>{const t=window.scrollY;Object(d.jqEmpty)(this.$.tabTarget),this.$.tabTarget.appendChild(e),this.$.tabs.classList.remove("fixed"),window.scrollTo(0,t)})}routeSelectionChange(){if(this.tabs&&this.routeSelection){const e=this.tabs.findIndex(e=>e.viewId===this.routeSelection);this.initialSelectedTab=e>-1?e:0}}async setStateFromCharacter(e){this.characterName=e.name,this.classLevel=Object(h.G)(e),this.background=Object(h.J)("backgrounds",e,!0),this.race=Object(h.J)("races",e,!0);let t=!0;if(e)if(e.choices&&Object.values(e.choices).find(e=>e.additionalSpells))t=!1;else{const a=await Object(h.F)(e),i=Object(h.E)(e);for(const[s,l]of Object.entries(i)){const i=a[s];if(i.casterProgression&&(t=!1),e.subclasses&&e.subclasses[s]&&i.subclasses&&i.subclasses.length){const a=i.subclasses.find(t=>e.subclasses[s].name===t.name);a&&a.casterProgression&&(t=!1)}}}this.wasNonCaster!==t&&(this.wasNonCaster=t,this.tabs=t?this.nonCasterTabs():this.defaultTabs())}defaultTabs(){return[{label:"",icon:"heart",viewId:"attributes"},{label:"",icon:"book-medical",viewId:"class"},{label:"",icon:"book-user",viewId:"background-race"},{label:"",icon:"book-spells",viewId:"spells"},{label:"",icon:"sack",viewId:"equipment"},{label:"",icon:"list",viewId:"abilities"},{label:"",icon:"dice",viewId:"rolls"}]}nonCasterTabs(){return[{label:"",icon:"heart",viewId:"attributes"},{label:"",icon:"book-medical",viewId:"class"},{label:"",icon:"book-user",viewId:"background-race"},{label:"",icon:"book-spells",viewId:"spells",hidden:!0},{label:"",icon:"sack",viewId:"equipment"},{label:"",icon:"list",viewId:"abilities"},{label:"",icon:"dice",viewId:"rolls"}]}defaultMenu(){return[{component:this.createMenuItem("user-plus"),key:"add",tooltip:"Create New Character"},{component:this.createMenuItem("user-slash"),key:"delete",tooltip:"Delete Character"},{component:this.createMenuItem("clone"),key:"clone",tooltip:"Clone Character"},{component:this.createMenuItem("download"),tooltip:"Download Character Data",children:[{text:"Download",key:"download"},{text:"Download All",key:"download-all"}]},{component:this.createMenuItem("upload"),tooltip:"Upload Character Data",key:"upload"}]}_menuItemSelected(e){switch(e.detail.value.key){case"add":Object(h.b)();break;case"delete":this.openDeleteModal();break;case"download":this.downloadCharacter();break;case"download-all":this.downloadCharacters();break;case"upload":this.$.fileSelector.click();break;case"clone":Object(h.i)()}}createMenuItem(e,t,a=!1){const i=document.createElement("vaadin-context-menu-item"),s=document.createElement("dnd-icon");return a&&(s.style.width="var(--lumo-icon-size-s)",s.style.height="var(--lumo-icon-size-s)",s.style.marginRight="var(--lumo-space-s)"),s.setAttribute("icon",e),i.appendChild(s),t&&i.appendChild(document.createTextNode(t)),i}removeCharacter(){Object(h.kb)(),this.deleteModalOpen=!1}openDeleteModal(){this.deleteModalOpen=!0}closeDeleteModal(){this.deleteModalOpen=!1}downloadCharacter(e){const t=Object(h.T)();Object(c.saveAs)(new Blob([JSON.stringify(t,null,2)],{type:"application/json;charset=utf-8"}),`${t.name} - ${(new Date).toLocaleString()}`)}downloadCharacters(){const e=Object(h.u)();Object(c.saveAs)(new Blob([JSON.stringify(e,null,2)],{type:"application/json;charset=utf-8"}),"Character Export - "+(new Date).toLocaleString())}processUpload(e){const t=e.target.files;console.log("upload",t);const a=(new Date).toLocaleString();for(let e of t)if(e&&"application/json"===e.type){const t=new FileReader;t.addEventListener("load",e=>{const t=JSON.parse(e.target.result),i=Array.isArray(t)?t:[t];for(let e of i)e.name+=" "+a,Object(h.Ub)(e)}),t.readAsText(e)}}toggleEditMode(){Object(n.a)(!this.isEditMode)}openDrawer(){this.dispatchEvent(new CustomEvent("open-drawer",{bubbles:!0}))}_editIcon(e){return e?"check":"edit"}_editModeClass(e){return e?"edit-mode":"not-edit-mode"}static get template(){return i.b`
      <style include="material-styles"></style>
      <style>
        :host {
          display: block;
          --tab-bottom-margin: 210px;
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
          align-items: center;
        }
        .thumb-menu__btn {
          border-radius: 50%;
          z-index: 2;
        }
        .edit-button {
          width: 70px;
          height: 70px;
          font-size: 30px;
        }
        .drawer-btn {
          margin-bottom: 12px;
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
          <button class="edit-button thumb-menu__btn mdc-icon-button mdc-button--raised material-icons" pulse$="[[pulse]]" on-click="toggleEditMode">[[_editIcon(isEditMode)]]</button>
          <button class="drawer-btn thumb-menu__btn mdc-icon-button mdc-button--raised material-icons" on-click="openDrawer">logout</button>
          <dnd-roll-results></dnd-roll-results>
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
    `}}customElements.define("dnd-character-builder-view",m)},174:function(e,t,a){"use strict";var i=a(3);class s extends i.a{static get properties(){return{icon:{type:String,value:""},faType:{type:String,value:""}}}_classString(e,t){return`${t||"fa"} fa-${e}`}static get template(){return i.b`
      <style include="fa-styles"></style>
      <i class$="[[_classString(icon, faType)]]"></i>
    `}}customElements.define("dnd-icon",s)},185:function(e,t,a){var i={"./dnd-character-builder-abilities":[175,4],"./dnd-character-builder-abilities.js":[175,4],"./dnd-character-builder-attributes":[176,6],"./dnd-character-builder-attributes.js":[176,6],"./dnd-character-builder-background-race":[177,0,8],"./dnd-character-builder-background-race.js":[177,0,8],"./dnd-character-builder-class":[182,0,9],"./dnd-character-builder-class.js":[182,0,9],"./dnd-character-builder-equipment":[179,2,1,7],"./dnd-character-builder-equipment-item-detail":[172,2,1],"./dnd-character-builder-equipment-item-detail.js":[172,2,1],"./dnd-character-builder-equipment.js":[179,2,1,7],"./dnd-character-builder-rolls":[180,3],"./dnd-character-builder-rolls.js":[180,3],"./dnd-character-builder-spells":[181,5,10],"./dnd-character-builder-spells.js":[181,5,10],"./dnd-character-builder-suboptions":[171,0],"./dnd-character-builder-suboptions.js":[171,0]};function s(e){if(!a.o(i,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=i[e],s=t[0];return Promise.all(t.slice(1).map(a.e)).then((function(){return a(s)}))}s.keys=function(){return Object.keys(i)},s.id=185,e.exports=s}}]);
//# sourceMappingURL=13.bundle.js.map