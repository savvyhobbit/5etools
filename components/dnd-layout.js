import {PolymerElement, html} from '@polymer/polymer';
import { } from '@polymer/polymer/lib/elements/dom-if.js';
import { MDCRipple } from "@material/ripple";
import { MDCDrawer } from "@material/drawer";
import { MDCSwitch } from "@material/switch";
import "./styles/material-styles.js";
import "./styles/fa-styles.js";
import "./styles/my-styles.js";
import "./dnd-character-popup.js";
import registerSwipe from '../util/swipe.js';
import { setDarkmode } from "../util/darkmode.js";
import { clearRouteSelection, routeEventChannel, readRouteView, notifyPreviewOpen } from '../util/routing.js';
import { jqEmpty, timeout, util_capitalize } from '../js/utils.js';
import './views/dnd-backgrounds-view';
import './views/dnd-bestiary-view';
import './views/dnd-conditions-view';
import './views/dnd-feats-view';
import './views/dnd-features-view';
import './views/dnd-items-view';
import './views/dnd-races-view';
import './views/dnd-spells-view';
import './views/dnd-variantrules-view';



class DndLayout extends PolymerElement {
  static get properties() {
    return {
      header: {
        type: String
      },
      selectedTitle: {
        type: String,
        value: "",
        observer: 'selectedTitleChange'
      },
      lastTitle: {
        type: String,
      },
      selectedSource: {
        type: String,
        value: ""
      },
      hideCharacterPopup: {
        type: Boolean,
        value: true
      },
      hasPreview: {
        type: Boolean,
        value: false
      },
    };
  }

  ready() {
    super.ready();

    window.addEventListener("resize", () => {
      if (this.hasPreview) {
        this._adjustPreviewWidth();
      }
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this._initDarkmode();
    this._initSwipe();
    this._initNavDrawer();
    this._resetActiveLink({detail: { view: readRouteView()}});
    routeEventChannel().addEventListener("view-change", this._resetActiveLink.bind(this));

    this.addEventListener("open-preview", this._openDrawerPreview.bind(this));
    this.addEventListener("close-preview", this._closeDrawerPreview.bind(this));

    this.addEventListener("open-drawer", this._openDrawer.bind(this));
    this.addEventListener("close-drawer", this._closeDrawer.bind(this));

    routeEventChannel().addEventListener("title-change", e => {
      if (e.detail) {
        const {title} = e.detail;
        if (title) {
          this.lastTitle = title
        }
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    routeEventChannel().removeEventListener("view-change", this._resetActiveLink.bind(this));
    this.removeEventListener("open-preview", this._openDrawerPreview.bind(this));
    this.removeEventListener("close-preview", this._closeDrawerPreview.bind(this));
    this.removeEventListener("open-drawer", this._openDrawer.bind(this));
  }

  selectedTitleChange() {
    document.title = this.selectedTitle || this.header || '5e Tools';
  }

  _initDarkmode() {
    // Darkmode Switch
    let storedDarkMode = window.localStorage.getItem("darkMode");

    if (storedDarkMode === "true") {
      this.darkModeSwitchChecked = true;
    } else {
      this.darkModeSwitchChecked = false;
    }
    setDarkmode(this.darkModeSwitchChecked);
    const darkModeSwitch = new MDCSwitch(this.shadowRoot.querySelector(".mdc-switch"));
    darkModeSwitch.checked = this.darkModeSwitchChecked;

    if (this.darkModeSwitchChecked) {
      this.shadowRoot.querySelector("header").classList.add("dark");
    } else {
      this.shadowRoot.querySelector("header").classList.remove("dark");
    }
    this.shadowRoot.querySelector(".darkmode-label").addEventListener("click", () => {
      darkModeSwitch.checked = !darkModeSwitch.checked;
    });

    this.shadowRoot.querySelector(".mdc-switch__native-control").addEventListener("change", () => {
      window.localStorage.setItem("darkMode", darkModeSwitch.checked);
      if (darkModeSwitch.checked) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
      setDarkmode(darkModeSwitch.checked);
    });
  }

  /**
   * Adds eventing to open nav on swipe.
   */
  _initSwipe() {
    if (!this.alreadyInit) {
      this.alreadyInit = true;
      registerSwipe(document.body, "right", () => {
        if (!this.drawer.open) {
          this._openDrawer();
        }
      }, null, ".character-builder--tabs-wrapper, vaadin-grid");
      registerSwipe(document.body, "left", () => {
        this._closeDrawer();
      }, null, ".character-builder--tabs-wrapper, vaadin-grid");
    }
  }

  /**
   * Initialize Material Components JS for Nav Drawer and internals
   */
  _initNavDrawer() {
    // Nav Button
    const navButton = this.shadowRoot.querySelector(".mdc-top-app-bar__navigation-icon");
    new MDCRipple(navButton);
    this.drawer = new MDCDrawer(this.shadowRoot.querySelector(".mdc-drawer"));
    navButton.addEventListener("click", () => {
      if (this.drawer.open) {
        this.drawer.open = false;
      } else {
        this._openDrawer();
      }
    });

    // close preview when drawer scrim is clicked
    this.$.scrim.addEventListener('click', () => {
      this._closeDrawer();
    });

    // List Items
    const listItems = this.shadowRoot.querySelectorAll(".mdc-drawer .mdc-list-item");
    for (let listItem of listItems) {
      new MDCRipple(listItem);
    }
  }
  /**
   * Finds and adds CSS class to the Active Link in the nav
   */
  _resetActiveLink(e) {
    this.drawer.open = false;
    
    const activeLink = this.shadowRoot.querySelector("a.list-item--activated");
    if (activeLink) {
      activeLink.classList.remove("list-item--activated");
    }
    const links = this.shadowRoot.querySelectorAll("a.mdc-list-item");
    const view = readRouteView();

    for (let link of links) {
      if (link.getAttribute("href") === `#/${view}`) {
        link.classList.add("list-item--activated");
      }
    }
  }
  
  _openDrawer(e) {
    console.error('_openDrawer', e);
    if (e && e.detail && e.detail.viewId) {
      this._openDrawerPreview(e.detail.viewId, e.detail.selectedItem);
    } else if (this.hasPreview) {
      this._adjustPreviewWidth();
    }
    this.drawer.open = true;
    notifyPreviewOpen(this.hasPreview, this.drawer.open);
  }

  _closeDrawer() {
    if (this.drawer.open) {
      this.drawer.open = false;
      this.$.container.style['border-left'] = null;
      this.$.breadcrumbcontainer.style['padding-left'] = null;
    }
  }

  async _openDrawerPreviewEvent(e) {
    e.preventDefault();
    e.stopPropagation();
    let viewId = new URL(e.target.closest('a').href).hash.split('/')[1];
    this._openDrawerPreview(viewId);
  }

  _adjustPreviewWidth() {
    const isTablet = window.innerWidth > 920,
      isDesktop = window.innerWidth > 1320,
      tabletMaxWidth =  window.innerWidth / 2,
      mobileMaxWidth = 400,
      mobileMinWidth = window.innerWidth - 50;

    let newWidth = Math.min(mobileMinWidth, isTablet ? tabletMaxWidth : mobileMaxWidth);
    this.$.drawer.style.width = `${newWidth}px`;

    if (isTablet) {
      const containerWidth = isDesktop ? newWidth - 280 : newWidth;
      this.$.container.style['border-left'] = `${containerWidth}px solid`;

      const breadcrumbWidth = isDesktop ? newWidth + 320 : newWidth;
      this.$.breadcrumbcontainer.style['padding-left'] = `${breadcrumbWidth}px`;
      
    } else {
      this.$.container.style['border-left'] = null;
      this.$.breadcrumbcontainer.style['padding-left'] = null;
    }
    this.$.drawer.scrollTop = 0;
    setTimeout(() => {
      this.$.drawer.scrollTop = 0;
    }, 100)
    setTimeout(() => {
      this.$.drawer.scrollTop = 0;
    }, 200)
  }

  async _openDrawerPreview(viewId, selectedItem) {
    this._adjustPreviewWidth();
    console.error('_openDrawerPreview', viewId);
    await timeout(150);
    this.previewViewId = viewId;
    this.previewSelectedItem = selectedItem || null;
    this.hasPreview = true;
    notifyPreviewOpen(this.hasPreview, this.drawer.open);
  }

  async _closeDrawerPreview() {
    this.$.drawer.style.width = `250px`;
    this.$.container.style['border-left'] = null;
    this.$.breadcrumbcontainer.style['padding-left'] = null;
    this.hasPreview = false;
    notifyPreviewOpen(this.hasPreview, this.drawer.open);
  }

  /**
   * Clears routing to reset the selection and trigger an update
   */
  _resetHashClickHandler() {
    clearRouteSelection();
  }

  _selectedSourceClass(selectedSource) {
    return `asource${selectedSource}`;
  }

  _exists(a) {
    return !!a;
  }

  _or(a, b) {
    return a || b;
  }

  _same(a, b) {
    return a === b;
  }

  static get template() {
    return html`
      <style include="material-styles my-styles fa-styles">
        :host {}
        .page-title {
        }
        .title-text-wrap {
          display: flex;
          flex-direction: column;
        }
        .source-text {
          font-size: 17px;
          color: var(--lumo-contrast-70pct);
          height: 44px;
        }
        dnd-svg:not([hide]) + .title-text-wrap  {
          margin-left: 110px;
        }
        .content-wrap {
          padding-top: 16px;
        }
        .main {
          min-height: calc(var(--vh, 1vh) * 100 - 64px);
        }
        .container {
          transition: border-left 150ms ease-out;
        }
        .mdc-drawer__content {
          width: 250px;
          transition: width 200ms, opacity 200ms;
          opacity: 1;
        }
        [preview] .mdc-drawer__content {
          overflow-y: hidden;
        }
        .mdc-drawer__content.mdc-drawer__content--transition {
          opacity: 0;
        }
        .preview-wrap {
          padding: 0 14px;
          overflow: hidden;
          transition: width .5s;
        }
        .preview-link {
          margin-left: auto;
          color: var(--lumo-contrast-30pct);
        }
        .preview-bar {
          display: flex;
          border-top: 1px solid var(--mdc-theme-text-divider-on-background);
        }
        .hide-me {
          background: transparent;
          border: none;
        }

        .mdc-list-item i {
          font-size: 20px;
        }

        #breadcrumbcontainer {
          transition: padding-left 150ms ease-out;
        }

        @media(min-width: 921px) {
          .page-title[hidden] {
            display: block !important;
          }
          [preview] + .mdc-drawer-scrim {
            display: none;
          }
        }
      </style>

      <header class="mdc-top-app-bar mdc-top-app-bar--fixed mdc-theme--primary-bg mdc-theme--on-primary">
        <div class="mdc-top-app-bar__row">
          <div class="breadcrumbs mdc-theme--on-primary">
            <div id="breadcrumbcontainer" class="container breadcrumbs__list">
              <div class="breadcrumbs__crumb" >
                <a on-click="_resetHashClickHandler">[[lastTitle]]</a>
              </div>
            </div>
          </div>
          <div class="nav-button">
            <button
              class="material-icons mdc-top-app-bar__navigation-icon mdc-theme--on-primary hidden-desktop-up margin-left_small"
            >
              menu
            </button>
            <a href="#/index"><div class="logo logo-white light-only"></div></a>
            <a href="#/index"><div class="logo dark-only"></div></a>
            <a href="#/index"
              ><span class="mdc-top-app-bar__title mdc-theme--on-primary typography_mono hidden-tablet-down"
                >5e Tools</span
              ></a
            >
          </div>
        </div>
      </header>

      <aside class="mdc-drawer mdc-drawer--modal mdc-theme--surface" preview$="[[hasPreview]]">
        <div class="mdc-drawer__content" id="drawer" >
          <nav class="mdc-list">
            <div hidden$="[[hasPreview]]">
              <div class="mdc-drawer__header hidden-desktop-up">
                <a href="#/index"
                  ><h3 class="mdc-drawer__title mdc-theme--on-surface typography_mono">
                    <div class="logo margin-right_small"></div>
                    5e Tools
                  </h3>
                  <h6
                    class="mdc-drawer__subtitle mdc-theme--text-secondary-on-background margin-top_small typography_mono"
                  >
                    A D&amp;D Players Companion
                  </h6></a
                >
              </div>

              <a class="mdc-list-item mdc-theme--on-surface">
                <label class="darkmode-label" for="dark-mode-switch">Dark Mode</label>
                <div class="mdc-switch mdc-list-item__meta">
                  <div class="mdc-switch__track"></div>
                  <div class="mdc-switch__thumb-underlay">
                    <div class="mdc-switch__thumb">
                      <input type="checkbox" id="dark-mode-switch" class="mdc-switch__native-control" role="switch" />
                    </div>
                  </div>
                </div>
              </a>

              <hr class="mdc-list-divider" />
              <a class="mdc-list-item mdc-theme--on-surface" href="#/rules" tabindex="0">
                <i class="fas fa-book mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true"></i>
                <span class="mdc-list-item__text">Players Handbook</span>
              </a>
              <a class="mdc-list-item mdc-theme--on-surface" href="#/character-builder">
                <i class="fas fa-wrench mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true"></i>
                <span class="mdc-list-item__text">Character Sheets</span>
              </a>

              <hr class="mdc-list-divider" />
              <h6 class="mdc-list-group__subheader mdc-theme--on-surface">Player Options</h6>
              <a class="mdc-list-item mdc-theme--on-surface" href="#/classes">
                <i class="fas fa-award mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true"></i>
                <span class="mdc-list-item__text">Classes</span>
              </a>
              <a class="mdc-list-item mdc-theme--on-surface" href="#/spells">
                <i class="fas fa-book-spells mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true"></i>
                <span class="mdc-list-item__text">Spells</span>
                <button class="preview-link mdc-icon-button material-icons" on-click="_openDrawerPreviewEvent">login</button>
              </a>
              <a class="mdc-list-item mdc-theme--on-surface" href="#/races">
                <i class="fas fa-users mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true"></i>
                <span class="mdc-list-item__text">Races</span>
                <button class="preview-link mdc-icon-button material-icons" on-click="_openDrawerPreviewEvent">login</button>
              </a>
              <a class="mdc-list-item mdc-theme--on-surface" href="#/backgrounds">
                <i class="fas fa-globe-americas mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true"></i>
                <span class="mdc-list-item__text">Backgrounds</span>
                <button class="preview-link mdc-icon-button material-icons" on-click="_openDrawerPreviewEvent">login</button>
              </a>
              <a class="mdc-list-item mdc-theme--on-surface" href="#/feats">
                <i class="fas fa-fist-raised mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true"></i>
                <span class="mdc-list-item__text">Feats</span>
                <button class="preview-link mdc-icon-button material-icons" on-click="_openDrawerPreviewEvent">login</button>
              </a>

              <hr class="mdc-list-divider" />
              <h6 class="mdc-list-group__subheader mdc-theme--on-surface">References</h6>
              <a class="mdc-list-item mdc-theme--on-surface" href="#/bestiary">
                <i class="fas fa-dragon mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true"></i>
                <span class="mdc-list-item__text">Bestiary</span>
                <button class="preview-link mdc-icon-button material-icons" on-click="_openDrawerPreviewEvent">login</button>
              </a>
              <a class="mdc-list-item mdc-theme--on-surface" href="#/items">
                <i class="fas fa-treasure-chest  mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true"></i>
                <span class="mdc-list-item__text">Items</span>
                <button class="preview-link mdc-icon-button material-icons" on-click="_openDrawerPreviewEvent">login</button>
              </a>
              <a class="mdc-list-item mdc-theme--on-surface" href="#/features">
                <i class="fas fa-cogs mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true"></i>
                <span class="mdc-list-item__text">Class Features</span>
                <button class="preview-link mdc-icon-button material-icons" on-click="_openDrawerPreviewEvent">login</button>
              </a>
              <a class="mdc-list-item mdc-theme--on-surface" href="#/conditions">
                <i class="fas fa-skull-crossbones mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true"></i>
                <span class="mdc-list-item__text">Conditions</span>
                <button class="preview-link mdc-icon-button material-icons" on-click="_openDrawerPreviewEvent">login</button>
              </a>
              <a class="mdc-list-item mdc-theme--on-surface" href="#/variantrules">
                <i class="fas fa-file-alt mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true"></i>
                <span class="mdc-list-item__text">Variant Rules</span>
              </a>
              <!-- <a class="mdc-list-item mdc-theme--on-surface" href="#/rewards">
                <i class="material-icons mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true">toll</i>
                <span class="mdc-list-item__text">Other Rewards</span>
              </a> -->
              <!-- <a class="mdc-list-item mdc-theme--on-surface" href="#/psionics">
                <i class="material-icons mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true"
                  >record_voice_over</i
                >
                <span class="mdc-list-item__text">Psionics</span>
              </a> -->
              <!-- <a class="mdc-list-item mdc-theme--on-surface" href="#/cults">
                <i class="material-icons mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true">group</i>
                <span class="mdc-list-item__text">Cults</span>
              </a> -->

              <hr class="mdc-list-divider" />
              <h6 class="mdc-list-group__subheader mdc-theme--on-surface">Tools</h6>
              <a class="mdc-list-item mdc-theme--on-surface" href="#/dice">
                <i class="fas fa-dice mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true"></i>
                <span class="mdc-list-item__text">Dice Roller</span>
              </a>
              <a class="mdc-list-item mdc-theme--on-surface" href="#/character-builder">
                <i class="fas fa-wrench mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true"></i>
                <span class="mdc-list-item__text">Character Sheets</span>
              </a>
              <span class="version mdc-typography--caption">v2.1.0</span>

            </div>
            <template is="dom-if" if="[[hasPreview]]">
              <div class="preview-wrap" id="previewTarget">
                <dnd-selection-list model-id="[[previewViewId]]" selected-item-key="[[previewSelectedItem]]" non-global></dnd-selection-list>
              </div>
              <button class="hide-me"></button>
            </template>
            </div>
          </nav>
        </div>
      </aside>

      <div class="mdc-drawer-scrim" id="scrim"></div>

      <div
        class="main mdc-top-app-bar--fixed-adjust mdc-typography--body1 mdc-theme--background mdc-theme--text-primary-on-background"
      >
        <div class="container content-wrap" id="container">
          <slot name="default"></slot>
        </div>

        <dnd-character-popup hidden$=[[hideCharacterPopup]]></dnd-character-popup>
      </div>
    `;
  }
}

customElements.define("dnd-layout", DndLayout);