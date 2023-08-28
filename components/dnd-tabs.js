import {PolymerElement, html} from '@polymer/polymer';
import {MDCTabBar} from '@material/tab-bar';
import {} from '@polymer/polymer/lib/elements/dom-repeat.js';
import {} from '@polymer/polymer/lib/elements/dom-if.js';
import { cloneDeep } from '../js/utils';
import { saveTabOrder } from '../util/charBuilder';

class DndTabs extends PolymerElement {
  static get properties() {
    return {
      tabs: {
        type: Array,
        observer: 'tabsChanged'
      },
      initialSelectedIndex: {
        type: Number,
        value: 0,
        observer: 'selectedIndexChange'
      }
    }
  }

  tabsChanged() {
    if (this.tabs.length) {
      if (this.tabBar) {
        this.$.tabs.removeEventListener("MDCTabBar:activated", this.handleTabChange);
      }
      // Allow tabs to be rendered
      setTimeout(() => {
        this.tabBar = new MDCTabBar(this.$.tabs);
        this.$.tabs.addEventListener("MDCTabBar:activated", this.handleTabChange);
        this.tabBar.activateTab(this.initialSelectedIndex);
      }, 10);
    }
  }

  selectedIndexChange() {
    if (this.tabBar && this.initialSelectedIndex) {
      this.tabBar.activateTab(this.initialSelectedIndex);
    }
  }

  handleTabChange(e) {
    const index = e.detail.index;
    this.dispatchEvent(new CustomEvent("tabChange",  {
      bubbles: true,
      composed: true,
      detail: {
        index
      }
    }));
  }

  _iconClass(icon) {
    return `mdc-tab__icon fas fa-${icon}`;
  }

  _disableScrolling() {
    this.scrollPosition = this.$.scrollWrap.scrollLeft;
    const wrapWidth = this.$.scrollWrap.clientWidth;
    this.maxScroll = this.$.dragWrap.clientWidth - wrapWidth;
    this.$.scrollWrap.style.width = `${wrapWidth}px`;
    this.$.dragWrap.style.position = "absolute";
    this.$.dragWrap.style.left = `-${this.scrollPosition}px`;
  }

  _enableScrolling() {
    this.$.scrollWrap.style.width = null;
    this.$.dragWrap.style.position = null;
    this.$.dragWrap.style.left = null;
    setTimeout(() => {
      this.$.scrollWrap.scrollTo(this.scrollPosition, 0);
    }, 1);
  }

  _touchstart(e) {
    const draggedTab = e.target.closest(".mdc-tab");

    if (draggedTab) {
      this.dragInitTimer = setTimeout(() => {
        window.navigator.vibrate(20);
        this.dragInitTimer = undefined;
        this._disableScrolling();
        this.draggedItem = {...e.model.__data.item, dragged: true};
        this.draggedIndex = e.model.__data.index;
        this.splice("tabs", this.draggedIndex, 1);
        this.splice("tabs", this.draggedIndex, 0, cloneDeep(this.draggedItem));
      }, 200);
    }
  }

  _touchmove(e) {
    if (this.dragInitTimer) {
      clearTimeout(this.dragInitTimer);
    } else {
      e.preventDefault();
      this.touchLocation = e.targetTouches[0].pageX;

      this._scrollIt();
      this._checkDragPosition();
    }
  }

  _scrollIt() {
    const containerBounds = this.$.tabs.getBoundingClientRect();
    const containerLeftBound = containerBounds.left;
    const containerRightBound = containerBounds.right;
    let hasScrolled = false;

    if (this.touchLocation - 75 < containerLeftBound && this.scrollPosition > 0) {
      //scrollLeft
      this.scrollPosition  = this.scrollPosition - 2;
      this.$.dragWrap.style.left = `-${this.scrollPosition}px`;
      hasScrolled = true;

    } else if (this.touchLocation + 75 > containerRightBound && this.scrollPosition < this.maxScroll) {
      //scrollRight
      this.scrollPosition  = this.scrollPosition + 2;
      this.$.dragWrap.style.left = `-${this.scrollPosition}px`;
      hasScrolled = true;
    }

    if (hasScrolled) {
      this._checkDragPosition();
      
      if (!this.scrollItInterval) {
        this.scrollItInterval = setInterval(() => {
          this._scrollIt();
        }, 20);
      }
    } else {
      clearInterval(this.scrollItInterval);
      this.scrollItInterval = null;
    }
  }

  _checkDragPosition() {
    Array.from(this.$.dragWrap.children).forEach((tab, index) => {
      const tabBounds = tab.getBoundingClientRect();
      const leftBound = tabBounds.left;
      const rightBound = tabBounds.right;

      if (leftBound < this.touchLocation && rightBound > this.touchLocation) {
        this.splice("tabs", this.draggedIndex, 1);
        this.splice("tabs", index, 0, this.draggedItem);
        this.draggedIndex = index;
      }
    });
  }

  _touchend() {
    if (this.dragInitTimer) {
      clearTimeout(this.dragInitTimer);
    } else {
      this._enableScrolling();
      this.draggedItem.dragged = false;
      console.error("TAV: draggedIndex", this.draggedIndex);
      if (this.draggedIndex !== null && this.draggedIndex !== undefined) {
        this.splice("tabs", this.draggedIndex, 1);
        this.splice("tabs", this.draggedIndex, 0, cloneDeep(this.draggedItem));
        this.draggedItem = null;
        this.draggedIndex = null;
        saveTabOrder(this.tabs);
        console.error("TAB: setting tabs", this.tabs);
      }
    }
  }

  
  static get template() {
    return html`
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
    `;
  }
  
}
customElements.define('dnd-tabs', DndTabs);