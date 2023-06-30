(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{157:function(e,t,l){"use strict";l.r(t);var a=l(3),i=(l(23),l(28),l(190));l(123),l(93);class s extends a.a{static get properties(){return{tabs:{type:Array,observer:"tabsChanged"},initialSelectedIndex:{type:Number,value:0,observer:"selectedIndexChange"}}}tabsChanged(){this.tabs.length&&(this.tabBar&&this.$.tabs.removeEventListener("MDCTabBar:activated",this.handleTabChange),setTimeout(()=>{this.tabBar=new i.a(this.$.tabs),this.$.tabs.addEventListener("MDCTabBar:activated",this.handleTabChange),this.tabBar.activateTab(this.initialSelectedIndex)},10))}selectedIndexChange(){this.tabBar&&this.initialSelectedIndex&&this.tabBar.activateTab(this.initialSelectedIndex)}handleTabChange(e){const t=e.detail.index;this.dispatchEvent(new CustomEvent("tabChange",{bubbles:!0,composed:!0,detail:{index:t}}))}_iconClass(e){return"mdc-tab__icon fas fa-"+e}static get template(){return a.b`
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
    `}}customElements.define("dnd-tabs",s);l(130),l(94),l(174);var r=l(69),o=l(73);class n extends a.a{static get properties(){return{rollResults:{type:Array,value:[]},focusRoll:{type:Number,value:0,observer:"focusRollChange"},isOpen:{type:Boolean,value:!1}}}focusRollChange(e){setTimeout(()=>{const t=this.shadowRoot.querySelector(`[index="${e}"]`);if(t){const l=t.querySelector(".roll-result__dice-results");l.toggleAttribute("tooltip",l.offsetWidth<l.scrollWidth);const a=t.querySelector(".roll-result__roll");a.toggleAttribute("tooltip",a.offsetWidth<a.scrollWidth);const i=t.querySelector(".roll-result__title");i.toggleAttribute("tooltip",i.offsetWidth<i.scrollWidth||this.rollResults[e]&&this.rollResults[e].isCrit)}},500)}connectedCallback(){super.connectedCallback(),this.rollHandler=e=>{console.error("new-roll",e.detail),this.push("rollResults",e.detail),this.focusRoll=this.rollResults.length-1,this.isOpen=!0;const t=Math.abs(this.$.scrollContainer.scrollHeight-this.$.scrollContainer.clientHeight-this.$.scrollContainer.scrollTop)<1;setTimeout(()=>{this.$.scrollContainer.scrollTo({top:this.$.scrollContainer.scrollHeight,behavior:t?"instant":"smooth"})},0)},Object(r.c)().addEventListener("new-roll",this.rollHandler),this.editModeHandler=e=>{e.detail.isEditMode&&(this.isOpen=!1)},Object(o.b)().addEventListener("editModeChange",this.editModeHandler)}disconnectedCallback(){super.disconnectedCallback(),Object(r.c)().removeEventListener("new-roll",this.rollHandler),Object(o.b)().removeEventListener("editModeChange",this.editModeHandler)}_setFocusRoll(e){const t=parseInt(e.target.closest(".roll-result").getAttribute("index"));this.focusRoll!==t&&(document.activeElement.blur(),this.animate=!0,setTimeout(()=>{this.animate=!1},500)),this.focusRoll=t}_deleteRoll(e){const t=parseInt(e.target.closest(".roll-result").getAttribute("index"));this.splice("rollResults",t,1),setTimeout(()=>{this.focusRoll>this.rollResults.length-1&&(this.focusRoll=this.rollResults.length-1)},0),0===this.rollResults.length&&(this.isOpen=!1)}_toggleOpen(){this.isOpen=!this.isOpen}_clearRolls(){this.rollResults=[],this.isOpen=!1}_diceIconClass(e){let t="20";if(e){const l=e.match(/(?:d)(\d+)/);l&&l.length>1&&(t=l[1])}return"roll-result__dice fal fa-dice-d"+t}_equals(e,t){return e===t}_isLast(e,t){return t.length&&t.length-1===e}_and(e,t){return e&&t}_or(...e){for(let t of e)if(t)return!0;return!1}static get template(){return a.b`
      <style include="material-styles fa-styles">

        [hidden] {
          display: none !important;
        }

        .roll-results__toggle-btn {
          position: absolute;
          right: 90px;
          bottom: 4px;
          height: 20px;
          border-radius: 20px;
          width: 60px;
          z-index: 3;
        }
        .roll-results__toggle-btn[open] {
          transform: rotate(180deg);
        }
        .roll-results__toggle-btn[disabled] {
          display: none;
        }
        .roll-results__clear-btn {
          background: var(--mdc-theme-primary);
          color: var(--mdc-theme-on-primary);
          font-size: 14px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: absolute;
          bottom: 4px;
          height: 24px;
          border-radius: 20px;
          width: 60px;
          z-index: 3;
          right: 168px;
        }

        .roll-results {
          position: absolute;
          bottom: -250px;
          right: calc(100% - 20px);
          flex-direction: column;
          align-items: flex-end;
          width: 110vw;
          margin-bottom: -20px;
          margin-right: -92px;
          pointer-events: none;
          transition: bottom 0.2s;
        }
        .roll-results[open] {
          bottom: -4px;
        }
        .roll-results__mask {
          position: fixed;
          right: 0;
          bottom: 63px;
          width: 100%;
          height: 100%;
          max-width: 800px;
          max-height: 255px;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .roll-results[open] .roll-results__mask {
          opacity: 1;
        }
        .roll-results__background {
          width: 100%;
          height: 100%;
          background: linear-gradient(0deg, black, transparent);
        }
        .roll-results__scroll-container {
          max-height: 202px;
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          pointer-events: all;
          padding: 0 17px 50px 0;
          box-sizing: content-box;
          width: 100%;
        }
        .roll-results__scroll-wrap {
          position: relative;
          right: 133px;
          z-index: 2;
          overflow: hidden;
          width: fit-content;
          margin-left: auto;
        }

        .roll-result {
          background: var(--mdc-theme-surface-surface);
          color: var(--mdc-theme-on-surface);
          border-radius: 6px;
          margin-bottom: 16px;
          display: flex;
          width: 225px;
          padding: 12px;
          height: 82px;
          outline: none;
          scroll-snap-align: start;
          position: relative;
          user-select: none;
        }
        .roll-result[animate] {
          transition: height 0.3s, width 0.3s;
        }
        .roll-result[crit]:before {
          content: 'CRITICAL!!!';
          color: var(--lumo-error-color);
          position: absolute;
          left: -15px;
          top: -4px;
          font-weight: bold;
          transform: rotate(-12deg);
          background: var(--mdc-theme-surface-surface);
          padding: 0 8px;
          border: 2px solid var(--lumo-error-color);
          pointer-events: none;
        }
        .roll-result[animate][crit]:before {
          transition: left 0.3s, top 0.3s, transform 0.3s;
        }
        .roll-result[crit][little]:before {
          left: 13px;
          top: 10px;
          transform: rotate(0deg);
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
        }
        .roll-result[animate]:after {
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
        .roll-result__type-separator {
          margin-left: -4px;
        }
        .roll-result__total {
          font-size: 32px;
          font-weight: bold;
          justify-content: center;
          display: flex;
          align-items: center;
          width: 64px;
          flex-shrink: 0;
        }
        .roll-result[animate] .roll-result__total {
          transition: width 0.3s, font-size 0.3s;
        }
        .roll-result__dice-wrap {
          display: flex;
          align-items: center;
          height: 30px;
          overflow: hidden;
        }
        .roll-result[animate] .roll-result__dice-wrap {
          transition: height 0.3s;
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
        .roll-result__dice-results .tooltip {
          font-size: 16px;
          bottom: 30px;
          top: unset;
        }
        .roll-result__dice-results span {
          color: var(--mdc-theme-on-surface-surface);
          position: relative;
          font-size: 17px;
          bottom: 7px;
          margin: 0 2px;
        }
        .roll-result__dice-results span:after {
          display: block;
          content: '';
          position: absolute;
          left: -3px;
          bottom: 9px;
          border-bottom: 1px solid var(--mdc-theme-on-surface-surface);
          width: 150%;
          transform: rotate(-25deg);
        }
        .roll-result__roll {
          color: var(--mdc-theme-on-surface-surface);
          font-weight: bold;
          height: 28px;
          overflow: hidden;
          align-items: flex-end;
          line-height: 1;
          text-overflow: ellipsis;
        }
        .roll-result[animate] .roll-result__roll {
          transition: height 0.3s;
        }
        .roll-result__roll[flex] {
          display: flex;
        }
        .roll-result__roll:not([flex]) {
          line-height: 36px;
        }
        .roll-result__roll span {
          font-size: 10px;
          line-height: 1;
          width: min-content;
          margin-right: auto;
          display: inline-flex;
        }
        .roll-result__roll .tooltip {
          font-size: 16px;
          color: var(--mdc-theme-on-surface-surface);
          bottom: 0;
          top: unset;
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

        @media(max-width: 420px) {
          .roll-result:not([little]) .tooltip-wrap:focus .tooltip {
            display: block;
          }
        }

        .roll-result:not([little]) .tooltip-wrap:hover .tooltip {
          display: block;
        }
        .tooltip-wrap:focus {
          outline: none;
        }
        .tooltip-wrap:not([tooltip]) .tooltip {
          display: none !important;
        }
        .tooltip {
          position: absolute;
          background: var(--mdc-theme-surface-surface);
          color: var(--mdc-theme-on-surface);
          font-size: 14px;
          font-weight: bold;
          padding: 9.5px 12px;
          border-radius: 6px;
          left: 0;
          top: 0;
          display: none;
          word-wrap: break-word;
          width: calc(100% - 55px);
          z-index: 2;
          pointer-events: none;
          line-height: 1.5;
          white-space: normal;
          box-shadow:
            0px 3px 5px -1px rgba(0, 0, 0, 0.2),
            0px 6px 10px 0px rgba(0, 0, 0, 0.14),
            0px 1px 18px 0px rgba(0, 0, 0, .12);
        }
        .tooltip .roll-result__name {
          white-space: normal;
        }

        @media(min-width: 420px) {
          .roll-results__mask {
            bottom: 0;
            -webkit-mask-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
            mask-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
          }
        }

        @media(min-width: 921px) {
          .roll-results {
            bottom: -380px;
          }
          .roll-results__scroll-container {
            max-height: 330px;
          }
          .roll-results__mask {
            max-height: 400px;
          }
          .roll-results__toggle-btn {
            right: 100px;
          }
          .roll-results__clear-btn {
            right: 178px;
          }
          .roll-result {
            width: min-content !important;
          }
        }
      </style>
      <div class="roll-results__clear-btn" on-click="_clearRolls" hidden$=[[!isOpen]]>Clear</div>
      <button class="roll-results__toggle-btn mdc-icon-button mdc-button--raised" on-click="_toggleOpen" disabled$="[[_equals(rollResults.length, 0)]]" open$=[[isOpen]]>
        <i class="fas fa-angle-up"></i>
      </button>
      <div class="roll-results" open$="[[isOpen]]">
        <div class="roll-results__scroll-wrap">
          <div class="roll-results__scroll-container" id="scrollContainer">
            <template is="dom-repeat" items="[[rollResults]]">
              <div class="roll-result" animate$="[[animate]]" crit$="[[item.isCrit]]" little$="[[!_equals(index, focusRoll)]]" on-click="_setFocusRoll" index$="[[index]]">
                <div class="roll-result__summary">
                  <div class="roll-result__title tooltip-wrap" tabindex="0">
                    <span class="roll-result__type">[[item.type]]</span>
                    <span class="roll-result__type-separator" hidden$="[[!_and(item.name, item.type)]]">:</span>
                    <span class="roll-result__name">[[item.name]]</span>
                    <div class="tooltip">
                      <span class="roll-result__type">[[item.type]]</span>
                      <span class="roll-result__type-separator" hidden$="[[!_and(item.name, item.type)]]">:</span>
                      <span class="roll-result__name">[[item.name]]</span>
                    </div>
                  </div>
                  <div class="roll-result__dice-wrap">
                    <i class$="[[_diceIconClass(item.roll)]]"></i>
                    <div class="roll-result__dice-results tooltip-wrap" tabindex="0" inner-h-t-m-l="[[item.result]]"></div>
                  </div>
                  <div class="roll-result__roll tooltip-wrap" flex$="[[_or(item.adv, item.disadv, item.doubleAdv)]]" tabindex="0" inner-h-t-m-l="[[item.roll]]"></div>
                </div>
                <div class="roll-result__total">[[item.total]]</div>
                <button class="roll-result__close fal fa-times" on-click="_deleteRoll"></button>
              </div>
            </template>
          </div>
        </div>
        <div class="roll-results__mask">
          <div class="roll-results__background"></div>
        </div>
      </div>
    `}}customElements.define("dnd-roll-results",n);class d extends a.a{static get properties(){return{isOpen:{type:Boolean,value:!1},d4:{type:Number,value:0},d6:{type:Number,value:0},d8:{type:Number,value:0},d10:{type:Number,value:0},d12:{type:Number,value:0},d20:{type:Number,value:0},d100:{type:Number,value:0}}}_increaseRoll(e){this[e.target.closest(".roller__btn").getAttribute("roll")]++}_toggleOpen(){this.isOpen=!this.isOpen,this.isOpen||(this.d4=0,this.d6=0,this.d8=0,this.d10=0,this.d12=0,this.d20=0,this.d100=0)}_rollIt(){const e=[];this.d20&&e.push(this.d20+"d20"),this.d12&&e.push(this.d12+"d12"),this.d10&&e.push(this.d10+"d10"),this.d8&&e.push(this.d8+"d8"),this.d6&&e.push(this.d6+"d6"),this.d4&&e.push(this.d4+"d4"),this.d100&&e.push(this.d100+"d100"),e.length&&Object(r.e)("Custom",e),this._toggleOpen()}_equals(e,t){return e===t}static get template(){return a.b`
      <style include="fa-styles material-styles my-styles">
        :host {
          display: block;
          margin-bottom: 12px;
        }
        .roller__btn {
          border-radius: 50%;
          z-index: 2;
          margin-top: 8px;
        }
        .roller__btn-count {
          position: absolute;
          background: var(--mdc-theme-surface);
          color: var(--mdc-theme-on-surface);
          font-size: 13px;
          z-index: 23;
          right: 0px;
          border-radius: 20px;
          padding: 2px 5px;
          bottom: -2px;
          font-family: sans-serif;
          box-shadow:
            0px 3px 1px -2px rgba(0, 0, 0, 0.2), 
            0px 2px 2px 0px rgba(0, 0, 0, 0.14), 
            0px 1px 5px 0px rgba(0, 0, 0, .12);
        }
        .roller__expand-btn {
          width: 48px;
          height: 48px;
          border-radius: 40px;
          overflow: hidden;
          margin-top: 12px;
          display: flex;
          justify-content: space-between;
          z-index: 2;
          position: absolute;
          bottom: 0;
          right: -24px;
          background: transparent;
          padding: 0;
          transition: width 0.3s, right 0.3s;
        }
        [open] .roller__expand-btn {
          width: 100px;
          background: var(--mdc-theme-surface-surface);
          right: -44px;
        }
        .roller__open-btn {
          margin-top: 0;
          background: var(--mdc-theme-primary);
        }
        .roller__roll-btn {
          border: none;
          padding: 0;
          margin: 0;
          background: none;
          font-size: 16px;
          flex-grow: 1;
          padding-right: 8px;
          color: var(--mdc-theme-on-surface);
          cursor: pointer;
          display: none;
        }
        [open] .roller__roll-btn {
          display: block;
        }
        .roller__container {
          display: flex;
          flex-direction: column-reverse;
          padding-bottom: 60px;
          position: relative;
        }
        .roller__additional {
          display: flex;
          flex-direction: column-reverse;
          align-items: center;
          position: absolute;
          right: -100px;
          bottom: 60px;
          transition: right 0.3s;
        }
        [open] .roller__additional {
          right: -24px;
        }
        .d100 i {
          font-size: 16px;
        }
        .d100 i:first-child {
          margin-right: 3px;
        }

        @media(min-width: 921px) {
          :host {
            margin-bottom: 30px;
          }
        }
      </style>

      <div class="roller__container" open$="[[isOpen]]">
        <div class="roller__expand-btn mdc-button--raised ">
          <button class="roller__open-btn roller__btn mdc-icon-button material-icons" on-click="_toggleOpen">
            <i class="fa fa-dice-d20" hidden$="[[isOpen]]"></i>
            <i class="fal fa-times" hidden$="[[!isOpen]]"></i>
          </button>
          <button class="roller__roll-btn" on-click="_rollIt">Roll!</button>
        </div>

        <div class="roller__additional">
          <button class="roller__btn mdc-icon-button mdc-button--raised material-icons" roll="d20" on-click="_increaseRoll">
            <i class="fal fa-dice-d20"></i>
            <span class="roller__btn-count" hidden$="[[_equals(d20, 0)]]">[[d20]]</span>
          </button>
          <button class="roller__btn mdc-icon-button mdc-button--raised material-icons" roll="d12" on-click="_increaseRoll">
            <i class="fal fa-dice-d12"></i>
            <span class="roller__btn-count" hidden$="[[_equals(d12, 0)]]">[[d12]]</span>
          </button>
          <button class="roller__btn mdc-icon-button mdc-button--raised material-icons" roll="d10" on-click="_increaseRoll">
            <i class="fal fa-dice-d10"></i>
            <span class="roller__btn-count" hidden$="[[_equals(d10, 0)]]">[[d10]]</span>
          </button>
          <button class="roller__btn mdc-icon-button mdc-button--raised material-icons" roll="d8" on-click="_increaseRoll">
            <i class="fal fa-dice-d8"></i>
            <span class="roller__btn-count" hidden$="[[_equals(d8, 0)]]">[[d8]]</span>
          </button>
          <button class="roller__btn mdc-icon-button mdc-button--raised material-icons" roll="d6" on-click="_increaseRoll">
            <i class="fal fa-dice-d6"></i>
            <span class="roller__btn-count" hidden$="[[_equals(d6, 0)]]">[[d6]]</span>
          </button>
          <button class="roller__btn mdc-icon-button mdc-button--raised material-icons" roll="d4" on-click="_increaseRoll">
            <i class="fal fa-dice-d4"></i>
            <span class="roller__btn-count" hidden$="[[_equals(d4, 0)]]">[[d4]]</span>
          </button>
          <button class="roller__btn mdc-icon-button mdc-button--raised material-icons d100" roll="d100" on-click="_increaseRoll">
            <i class="fal fa-dice-d10"></i>
            <i class="fal fa-dice-d10"></i>
            <span class="roller__btn-count" hidden$="[[_equals(d100, 0)]]">[[d100]]</span>
          </button>
        </div>
      </div>
    `}}customElements.define("dnd-roller",d);var c=l(1),p=l(183),h=l(33),u=l(99),b=l(9),m=l(100);l(187),l(186);class x extends a.a{static get properties(){return{loading:{type:Boolean,value:!0},characterName:{type:String,value:""},initialSelectedTab:{type:Number,value:0},indexForTabs:{type:Number,value:0},isEditMode:{type:Boolean,value:!1},routeSelection:{type:String,observer:"routeSelectionChange"},deleteModalOpen:{type:Boolean,value:!1},pulse:{type:Boolean,value:!0}}}static get observers(){return["_setName(characterName)"]}_setName(e){e&&Object(h.Ub)(e)}constructor(){super(),this.tabs=this.defaultTabs(),this.menuItems=this.defaultMenu()}connectedCallback(){super.connectedCallback(),this.tabChangeHandler=e=>{let t=e.detail.index,a=this.tabs[t].viewId;Object(b.i)(a),this.indexForTabs=t,void 0!==a&&(this.loading=!0,l(185)("./dnd-character-builder-"+a).then(()=>{this.updateView(document.createElement("dnd-character-builder-"+a))}))},this.addEventListener("tabChange",this.tabChangeHandler),this.loadingHandler=()=>{setTimeout(()=>{this.loading=!1},0)},this.addEventListener("loadingChange",this.loadingHandler),this.setStateFromCharacter(Object(h.T)()),this.characterChangeHandler=e=>{console.error("character_change_handler",e.detail.character),this.setStateFromCharacter(e.detail.character)},Object(h.q)().addEventListener("character-selected",this.characterChangeHandler),this.fixedTabsScrollHandler=()=>{if(this.$.tabs.matches(".fixed--bottom"))return;this.$.tabWrap.getBoundingClientRect().top<=104?this.$.tabs.classList.add("fixed"):this.$.tabs.classList.remove("fixed")},window.addEventListener("scroll",this.fixedTabsScrollHandler),this.$.tabs.classList.remove("fixed"),this.nameFieldFocusHandler=e=>{"New Character"===this.$.name.value&&this.$.name.inputElement.select()},this.$.name.addEventListener("focus",this.nameFieldFocusHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode,this.pulse=!1,Object(m.b)(this.isEditMode,this)},Object(o.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(o.c)(),this.isLoaded||(this.isLoaded=!0,Object(u.a)(this.$.tabTarget,"right",()=>{if(this.indexForTabs>0){const e=this.indexForTabs-1;if(this.tabs[e].hidden){if(this.indexForTabs>1){const e=this.indexForTabs-2;this.$.tabs.tabBar.activateTab(e)}}else this.$.tabs.tabBar.activateTab(e)}},null,".table"),Object(u.a)(this.$.tabTarget,"left",()=>{if(this.indexForTabs<this.tabs.length-1){const e=this.indexForTabs+1;if(this.tabs[e].hidden){if(this.indexForTabs<this.tabs.length-2){const e=this.indexForTabs+2;this.$.tabs.tabBar.activateTab(e)}}else this.$.tabs.tabBar.activateTab(e)}},null,".table")),this._selectionChangeHandler=e=>{e&&e.detail&&e.detail.selection&&(this.routeSelection=e.detail.selection)},Object(b.h)().addEventListener("selection-change",this._selectionChangeHandler),this.routeSelection=Object(b.e)()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("tabChange",this.tabChangeHandler),this.removeEventListener("loadingChange",this.loadingHandler),window.removeEventListener("scroll",this.fixedTabsScrollHandler),Object(h.q)().removeEventListener("character-selected",this.characterChangeHandler),this.$.name.removeEventListener("focus",this.nameFieldFocusHandler),Object(o.b)().removeEventListener("editModeChange",this.editModeHandler)}updateView(e){window.requestAnimationFrame(()=>{const t=window.scrollY;Object(c.jqEmpty)(this.$.tabTarget),this.$.tabTarget.appendChild(e),this.$.tabs.classList.remove("fixed"),window.scrollTo(0,t)})}routeSelectionChange(){if(this.tabs&&this.routeSelection){const e=this.tabs.findIndex(e=>e.viewId===this.routeSelection);this.initialSelectedTab=e>-1?e:0}}async setStateFromCharacter(e){this.characterName=e.name,this.classLevel=Object(h.G)(e),this.background=Object(h.J)("backgrounds",e,!0),this.race=Object(h.J)("races",e,!0);let t=!0;if(e)if(e.choices&&Object.values(e.choices).find(e=>e.additionalSpells))t=!1;else{const l=await Object(h.F)(e),a=Object(h.E)(e);for(const[i,s]of Object.entries(a)){const a=l[i];if(a.casterProgression&&(t=!1),e.subclasses&&e.subclasses[i]&&a.subclasses&&a.subclasses.length){const l=a.subclasses.find(t=>e.subclasses[i].name===t.name);l&&l.casterProgression&&(t=!1)}}}this.wasNonCaster!==t&&(this.wasNonCaster=t,this.tabs=t?this.nonCasterTabs():this.defaultTabs())}defaultTabs(){return[{label:"",icon:"heart",viewId:"attributes"},{label:"",icon:"book-medical",viewId:"class"},{label:"",icon:"book-user",viewId:"background-race"},{label:"",icon:"book-spells",viewId:"spells"},{label:"",icon:"sack",viewId:"equipment"},{label:"",icon:"list",viewId:"abilities"},{label:"",icon:"dice",viewId:"rolls"}]}nonCasterTabs(){return[{label:"",icon:"heart",viewId:"attributes"},{label:"",icon:"book-medical",viewId:"class"},{label:"",icon:"book-user",viewId:"background-race"},{label:"",icon:"book-spells",viewId:"spells",hidden:!0},{label:"",icon:"sack",viewId:"equipment"},{label:"",icon:"list",viewId:"abilities"},{label:"",icon:"dice",viewId:"rolls"}]}defaultMenu(){return[{component:this.createMenuItem("user-plus"),key:"add",tooltip:"Create New Character"},{component:this.createMenuItem("user-slash"),key:"delete",tooltip:"Delete Character"},{component:this.createMenuItem("clone"),key:"clone",tooltip:"Clone Character"},{component:this.createMenuItem("download"),tooltip:"Download Character Data",children:[{text:"Download",key:"download"},{text:"Download All",key:"download-all"}]},{component:this.createMenuItem("upload"),tooltip:"Upload Character Data",key:"upload"}]}_menuItemSelected(e){switch(e.detail.value.key){case"add":Object(h.b)();break;case"delete":this.openDeleteModal();break;case"download":this.downloadCharacter();break;case"download-all":this.downloadCharacters();break;case"upload":this.$.fileSelector.click();break;case"clone":Object(h.i)()}}createMenuItem(e,t,l=!1){const a=document.createElement("vaadin-context-menu-item"),i=document.createElement("dnd-icon");return l&&(i.style.width="var(--lumo-icon-size-s)",i.style.height="var(--lumo-icon-size-s)",i.style.marginRight="var(--lumo-space-s)"),i.setAttribute("icon",e),a.appendChild(i),t&&a.appendChild(document.createTextNode(t)),a}removeCharacter(){Object(h.lb)(),this.deleteModalOpen=!1}openDeleteModal(){this.deleteModalOpen=!0}closeDeleteModal(){this.deleteModalOpen=!1}downloadCharacter(e){const t=Object(h.T)();Object(p.saveAs)(new Blob([JSON.stringify(t,null,2)],{type:"application/json;charset=utf-8"}),`${t.name} - ${(new Date).toLocaleString()}`)}downloadCharacters(){const e=Object(h.u)();Object(p.saveAs)(new Blob([JSON.stringify(e,null,2)],{type:"application/json;charset=utf-8"}),"Character Export - "+(new Date).toLocaleString())}processUpload(e){const t=e.target.files;console.log("upload",t);const l=(new Date).toLocaleString();for(let e of t)if(e&&"application/json"===e.type){const t=new FileReader;t.addEventListener("load",e=>{const t=JSON.parse(e.target.result),a=Array.isArray(t)?t:[t];for(let e of a)e.name+=" "+l,Object(h.Vb)(e)}),t.readAsText(e)}}toggleEditMode(){Object(o.a)(!this.isEditMode)}openDrawer(){this.dispatchEvent(new CustomEvent("open-drawer",{bubbles:!0}))}_editIcon(e){return e?"check":"edit"}_editModeClass(e){return e?"edit-mode":"not-edit-mode"}static get template(){return a.b`
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
          right: 10px;
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
            bottom: 75px;
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
          <dnd-roller></dnd-roller>
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
    `}}customElements.define("dnd-character-builder-view",x)},174:function(e,t,l){"use strict";var a=l(3);class i extends a.a{static get properties(){return{icon:{type:String,value:""},faType:{type:String,value:""}}}_classString(e,t){return`${t||"fa"} fa-${e}`}static get template(){return a.b`
      <style include="fa-styles"></style>
      <i class$="[[_classString(icon, faType)]]"></i>
    `}}customElements.define("dnd-icon",i)},185:function(e,t,l){var a={"./dnd-character-builder-abilities":[175,4],"./dnd-character-builder-abilities.js":[175,4],"./dnd-character-builder-attributes":[176,6],"./dnd-character-builder-attributes.js":[176,6],"./dnd-character-builder-background-race":[177,0,8],"./dnd-character-builder-background-race.js":[177,0,8],"./dnd-character-builder-class":[182,0,9],"./dnd-character-builder-class.js":[182,0,9],"./dnd-character-builder-equipment":[179,2,1,7],"./dnd-character-builder-equipment-item-detail":[172,2,1],"./dnd-character-builder-equipment-item-detail.js":[172,2,1],"./dnd-character-builder-equipment.js":[179,2,1,7],"./dnd-character-builder-rolls":[180,3],"./dnd-character-builder-rolls.js":[180,3],"./dnd-character-builder-spells":[181,5,10],"./dnd-character-builder-spells.js":[181,5,10],"./dnd-character-builder-suboptions":[171,0],"./dnd-character-builder-suboptions.js":[171,0]};function i(e){if(!l.o(a,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=a[e],i=t[0];return Promise.all(t.slice(1).map(l.e)).then((function(){return l(i)}))}i.keys=function(){return Object.keys(a)},i.id=185,e.exports=i}}]);
//# sourceMappingURL=13.bundle.js.map