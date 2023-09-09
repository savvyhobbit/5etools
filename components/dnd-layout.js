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
import { timeout } from '../js/utils.js';
import './views/dnd-backgrounds-view';
import './views/dnd-bestiary-view';
import './views/dnd-conditions-view';
import './views/dnd-feats-view';
import './views/dnd-features-view';
import './views/dnd-items-view';
import './views/dnd-races-view';
import './views/dnd-spells-view';
import './views/dnd-variantrules-view';
import "./dnd-roll-results";
import "./dnd-roller";
import { dispatchEditModeChange, getEditModeChannel, isEditMode } from '../util/editMode.js';

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
      viewHasPopup: {
        type: Boolean,
        value: false
      },
      previewHasPopup: {
        type: Boolean,
        value: false
      },
      hasPreview: {
        type: Boolean,
        value: false
      },
      isDarkMode: {
        type: Boolean
      },
      pulse: {
        type: Boolean,
        value: true
      },
      isCharacterSheetView: {
        type: Boolean,
        value: false,
      }
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
    this._initDebugmode();
    this._initSwipe();
    this._initNavDrawer();
    this._viewChangeHandler({detail: { view: readRouteView()}});
    routeEventChannel().addEventListener("view-change", this._viewChangeHandler.bind(this));

    this.addEventListener("open-preview", this._openDrawerPreview.bind(this));
    this.addEventListener("close-preview", this._closeDrawerPreview.bind(this));

    this.addEventListener("open-drawer", this._openDrawer.bind(this));
    this.addEventListener("close-drawer", this._closeDrawer.bind(this));

    routeEventChannel().addEventListener("title-change", e => {
      if (e.detail) {
        const {title} = e.detail;
        if (title !== undefined) {
          this.lastTitle = title
        }
      }
    });

    this.editModeHandler = (e) => {
      this.isEditMode = e.detail.isEditMode;
      this.pulse = false;
    };
    getEditModeChannel().addEventListener('editModeChange', this.editModeHandler.bind(this));
    this.isEditMode = isEditMode();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    routeEventChannel().removeEventListener("view-change", this._viewChangeHandler.bind(this));
    this.removeEventListener("open-preview", this._openDrawerPreview.bind(this));
    this.removeEventListener("close-preview", this._closeDrawerPreview.bind(this));
    this.removeEventListener("open-drawer", this._openDrawer.bind(this));
    getEditModeChannel().removeEventListener('editModeChange', this.editModeHandler.bind(this));
  }

  selectedTitleChange() {
    document.title = this.selectedTitle || this.header || '5e Tools';
  }

  _initDarkmode() {
    // Darkmode Switch
    const storedDarkMode = window.localStorage.getItem("darkMode") === "true";
    setDarkmode(storedDarkMode);
    this.isDarkMode = storedDarkMode;

    const darkModeSwitch = new MDCSwitch(this.shadowRoot.querySelector(".darkmode-switch"));
    darkModeSwitch.checked = storedDarkMode;

    this.shadowRoot.querySelector(".darkmode-label").addEventListener("click", () => {
      darkModeSwitch.checked = !darkModeSwitch.checked;
    });

    this.shadowRoot.querySelector(".darkmode-control").addEventListener("change", () => {
      window.localStorage.setItem("darkMode", darkModeSwitch.checked);
      setDarkmode(darkModeSwitch.checked);
      this.isDarkMode = darkModeSwitch.checked;
    });
  }

  _initDebugmode() {
    const storedDebugMode = window.localStorage.getItem("debugMode") === "true";
    this.isDebugMode = storedDebugMode;

    const debugModeSwitch = new MDCSwitch(this.shadowRoot.querySelector(".debugmode-switch"));
    debugModeSwitch.checked = storedDebugMode;

    this.shadowRoot.querySelector(".debugmode-label").addEventListener("click", () => {
      debugModeSwitch.checked = !debugModeSwitch.checked;
    });

    this.shadowRoot.querySelector(".debugmode-control").addEventListener("change", () => {
      window.localStorage.setItem("debugMode", debugModeSwitch.checked);
      this.isDebugMode = debugModeSwitch.checked;
      window.location.reload();
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
        this.drawerOpen = false;
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
  _viewChangeHandler(e) {
    const viewId = e.detail.view;
    this.isCharacterSheetView = viewId === "character-builder";
    this.drawer.open = false;
    this.drawerOpen = false;

    switch (viewId) {
      case "races":
      case "backgrounds":
      case "items":
        this.viewHasPopup = true;
        break;
      default:
        this.viewHasPopup = false;
    }
  
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

  toggleEditMode() {
    dispatchEditModeChange(!this.isEditMode);
  }

  _editIcon(isEditMode) {
    return isEditMode ? 'check' : 'edit';
  }
  
  _openDrawer(e) {
    console.error('_openDrawer', e);
    if (e && e.detail && e.detail.viewId) {
      this._openDrawerPreview(e.detail.viewId, e.detail.selectedItem, e.detail.decode);
    } else if (this.hasPreview) {
      this._adjustPreviewWidth();
    }
    this.drawer.open = true;
    this.drawerOpen = true;
    notifyPreviewOpen(this.hasPreview, this.drawer.open);
  }

  _closeDrawer() {
    if (this.drawer.open) {
      this.drawer.open = false;
      this.drawerOpen = false;
      this.$.container.style['border-left'] = null;
      this.$.breadcrumbContainer.style['padding-left'] = null;
    }
  }

  _toggleDrawer() {
    if (this.drawer.open) {
      this._closeDrawer();
    } else {
      this._openDrawer();
    }
  }

  async _openDrawerPreviewEvent(e) {
    e.preventDefault();
    e.stopPropagation();
    let viewId = new URL(e.target.closest('a').href).hash.split('/')[1];
    this._openDrawerPreview(viewId);
  }

  async _openDrawerPreview(viewId, selectedItem, decodeName) {
    switch (viewId) {
      case "races":
      case "backgrounds":
      case "items":
        this.previewHasPopup = true;
        break;
      default:
        this.previewHasPopup = false;
    }

    if (decodeName) {
      selectedItem.name = decodeURIComponent(selectedItem.name);
    }
    this.previewSelectedItemKey = selectedItem || null;
    console.error('_openDrawerPreview', { viewId, selectedItemKey: this.previewSelectedItemKey, viewIdPrevious: this.previewViewId});
    this.previewViewId = viewId;
    this.hasPreview = true;
    this._adjustPreviewWidth();
    await timeout(150);
    notifyPreviewOpen(this.hasPreview, this.drawer.open);
  }

  _closeDrawerPreview() {
    console.error('_closeDrawerPreview');
    this.$.drawer.style.width = `250px`;
    this.$.container.style['border-left'] = null;
    this.$.breadcrumbContainer.style['padding-left'] = null;
    this.hasPreview = false;
    notifyPreviewOpen(this.hasPreview, this.drawer.open);
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
      this.$.breadcrumbContainer.style['padding-left'] = `${breadcrumbWidth}px`;
      
    } else {
      this.$.container.style['border-left'] = null;
      this.$.breadcrumbContainer.style['padding-left'] = null;
    }
    this.$.drawer.scrollTop = 0;
    setTimeout(() => {
      this.$.drawer.scrollTop = 0;
    }, 100)
    setTimeout(() => {
      this.$.drawer.scrollTop = 0;
    }, 200)
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

  _moveForPopup(hasPreview, drawerOpen, viewHasPopup) {
    return (hasPreview && drawerOpen) || viewHasPopup;
  }

  _exists(a) {
    return !!a;
  }

  _or(a, b) {
    return a || b;
  }

  _and(a, b) {
    return a && b;
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
          width: 60px;
          height: 30px;
          border-radius: 20px;
          color: var(--lumo-contrast-30pct);
          background: var(--mdc-theme-surface-surface);
        }
        .preview-bar {
          display: flex;
          border-top: 1px solid var(--mdc-theme-text-divider-on-background);
        }
        .hide-me {
          background: transparent;
          border: none;
          outline: none !important;
        }

        .mdc-list-item i {
          font-size: 20px;
        }

        .mdc-top-app-bar__row {
          align-items: center;
        }

        #breadcrumbContainer {
          transition: padding-left 150ms ease-out;
          position: relative;
        }

        [truly-editing] {
          --mdc-theme-primary: var(--mdc-theme-secondary);
        }

        .debug-button {
          position: absolute;
          right: 8px;
        }

        .thumb-menu {
          position: fixed;
          bottom: 24px;
          right: 0;
          z-index: 6;
          display: flex;
          flex-direction: column-reverse;
          margin-right: auto;
          align-items: center;
          transition: bottom 0.3s;
          width: 100px;
        }
        .thumb-menu[is-character-view] {
          bottom: 88px;
        }
        .thumb-menu[higher] {
          bottom: 88px;
        }
        .thumb-menu__btn {
          border-radius: 50%;
          z-index: 2;
        }
        .edit-button {
          margin-top: 12px;
          width: 70px;
          height: 70px;
          font-size: 30px;
        }
        .drawer-btn {
          margin-top: 12px;
        }
        [pulse] {
          box-shadow: var(--pulse-shadow);
          animation: pulse 2s infinite;
        }
        dnd-roll-results[is-character-view] {
          right: 24px;
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
        @media(min-width: 500px) {
          .thumb-menu[is-character-view]:not([higher]) {
            bottom: 24px;
          }
        }

        @media(min-width: 768px) {
          .thumb-menu[higher-mobile]:not([higher]) {
            bottom: 24px;
          }
        }

        @media(min-width: 921px) {
          .page-title[hidden] {
            display: block !important;
          }
          [preview] + .mdc-drawer-scrim {
            display: none;
          }
          .edit-button {
            height: 80px;
            width: 80px;
            font-size: 36px;
          }
        }
        @media(min-width: 1321px) {
          .drawer-btn {
            display: none;
          }
        }
      </style>

      <header id="header" truly-editing$="[[_and(isEditMode, isCharacterSheetView)]]" class="mdc-top-app-bar mdc-top-app-bar--fixed mdc-theme--header-bg">
        <div class="mdc-top-app-bar__row">
          <div class="breadcrumbs">
            <div id="breadcrumbContainer" class="container breadcrumbs__list">
              <div class="breadcrumbs__crumb">
                <a class="mdc-theme--on-header" on-click="_resetHashClickHandler">[[lastTitle]]</a>
              </div>
            </div>
          </div>
          <a hidden$=[[!isDebugMode]] class="debug-button mdc-icon-button" href="#/debug"><span class="fa fa-bug"></span></a>
          <div class="nav-button">
            <button
              class="material-icons mdc-theme--on-header mdc-top-app-bar__navigation-icon hidden-desktop-up margin-left_small"
              on-click="_closeDrawerPreview"
            >
              menu
            </button>
            <a href="#/index" hidden$="[[isDarkMode]]"><div class="logo logo-white"></div></a>
            <a href="#/index" hidden$="[[!isDarkMode]]"><div class="logo"></div></a>
            <a href="#/index"
              ><span class="mdc-top-app-bar__title mdc-theme--on-header typography_mono hidden-tablet-down"
                >5e Tools</span
              ></a
            ></a>
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

              <div class="mdc-list-item mdc-theme--on-surface">
                <label class="darkmode-label" for="dark-mode-switch">Dark Mode</label>
                <div class="mdc-switch darkmode-switch mdc-list-item__meta">
                  <div class="mdc-switch__track"></div>
                  <div class="mdc-switch__thumb-underlay">
                    <div class="mdc-switch__thumb">
                      <input type="checkbox" id="dark-mode-switch" class="mdc-switch__native-control darkmode-control" role="switch" />
                    </div>
                  </div>
                </div>
              </div>

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
              <div class="mdc-list-item mdc-theme--on-surface">
                <label class="debugmode-label" for="debug-mode-switch">Debug Mode</label>
                <div class="mdc-switch debugmode-switch mdc-list-item__meta">
                  <div class="mdc-switch__track"></div>
                  <div class="mdc-switch__thumb-underlay">
                    <div class="mdc-switch__thumb">
                      <input type="checkbox" id="debug-mode-switch" class="mdc-switch__native-control debugmode-control" role="switch" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <template is="dom-if" if="[[hasPreview]]" restamp>
              <div class="preview-wrap" id="previewTarget">
                <dnd-selection-list model-id="[[previewViewId]]" selected-item-key="[[previewSelectedItemKey]]" in-sidebar></dnd-selection-list>
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

        <div class="thumb-menu" truly-editing$="[[_and(isEditMode, isCharacterSheetView)]]" higher$="[[_moveForPopup(hasPreview, drawerOpen, viewHasPopup)]]" is-character-view$="[[isCharacterSheetView]]">
          <dnd-roll-results></dnd-roll-results>
          <button hidden$="[[!isCharacterSheetView]]" class="edit-button thumb-menu__btn mdc-icon-button mdc-button--raised material-icons" pulse$="[[pulse]]" on-click="toggleEditMode">[[_editIcon(isEditMode)]]</button>
          <button class="drawer-btn thumb-menu__btn mdc-icon-button mdc-button--raised material-icons" on-click="_toggleDrawer">logout</button>
          <dnd-roller></dnd-roller>
        </div>
      </div>
    `;
  }
}

customElements.define("dnd-layout", DndLayout);