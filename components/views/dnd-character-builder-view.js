import {PolymerElement, html} from '@polymer/polymer';
import "../styles/material-styles.js";
import "../styles/my-styles.js";
import "../dnd-tabs.js";
import "../dnd-character-select";
import "../dnd-spinner";
import "../dnd-icon";
import "../dnd-roll-results";
import { jqEmpty } from "../../js/utils.js";
import { saveAs } from 'file-saver';
import { getCharacterChannel, getSelectedCharacter, updateName, getClassString, getFeatureString, addCharacter, removeSelectedCharacter, getClassReferences, getClassLevelGroups, uploadCharacter, getCharacters, cloneCharacter } from '../../util/charBuilder.js';
import registerSwipe from '../../util/swipe.js';
import { dispatchEditModeChange, getEditModeChannel, isEditMode } from '../../util/editMode.js';
import { rollEventChannel } from '../../util/roll.js';
import { readRouteSelection, routeEventChannel, setRouteSelection } from '../../util/routing.js';
import { togglePrimarySecondary } from '../../util/darkmode.js';
import '@vaadin/vaadin-dialog';
import '@vaadin/vaadin-menu-bar';

class DndCharacterBuilderView extends PolymerElement {
  static get properties() {
    return {
      loading: {
        type: Boolean,
        value: true
      },
      characterName: {
        type: String,
        value: ''
      },
      initialSelectedTab: {
        type: Number,
        value: 0
      },
      indexForTabs: {
        type: Number,
        value: 0
      },
      isEditMode: {
        type: Boolean,
        value: false
      },
      routeSelection: {
        type: String,
        observer: 'routeSelectionChange'
      },
      deleteModalOpen: {
        type: Boolean,
        value: false
      },
      pulse: {
        type: Boolean,
        value: true
      }
    }
  }

  static get observers() {
    return ['_setName(characterName)']
  }

  _setName(characterName) {
    if (characterName) {
      updateName(characterName);
    }
  }

  constructor() {
    super();

    // this.tabs = [
    //   { label: "Attributes & Proficiencies", icon: "favorite", viewId: "attributes" },
    //   { label: "Class Levels", icon: "class", viewId: "class" },
    //   { label: "Race & Background", icon: "face", viewId: "background-race" },
    //   { label: "Spells", icon: "flash_on", viewId: "spells" },
    //   { label: "Equipment", icon: "local_grocery_store", viewId: "equipment" },
    // ]
    
    this.tabs = this.defaultTabs();
    this.menuItems = this.defaultMenu();
  }

  connectedCallback() {
    super.connectedCallback();

    this.tabChangeHandler = (e) => {
      let newTabIndex = e.detail.index,
        newViewId = this.tabs[newTabIndex].viewId;

      setRouteSelection(newViewId);

      this.indexForTabs = newTabIndex;
      if (newViewId !== undefined) {
        this.loading = true;
        import(`./character/dnd-character-builder-${newViewId}`)
          .then(() => {
            this.updateView(document.createElement(`dnd-character-builder-${newViewId}`));
          });
      }
    };
    this.addEventListener("tabChange", this.tabChangeHandler);

    this.loadingHandler = () => {
      setTimeout(() => {
        this.loading = false;
      }, 0);
    };
    this.addEventListener("loadingChange", this.loadingHandler);

    this.setStateFromCharacter(getSelectedCharacter());
    this.characterChangeHandler = (e) => {
      console.error('character_change_handler', e.detail.character);
      this.setStateFromCharacter(e.detail.character);
    };
    getCharacterChannel().addEventListener("character-selected", this.characterChangeHandler);

    this.fixedTabsScrollHandler = () => {
      const isBottomFixed = this.$.tabs.matches('.fixed--bottom');

      if (isBottomFixed) {
        return;
      }
      
      const heightDiff = this.$.tabWrap.getBoundingClientRect().top;

      if (heightDiff <= 104) {
        this.$.tabs.classList.add('fixed');
      } else {
        this.$.tabs.classList.remove('fixed');
      }
    };
    window.addEventListener('scroll', this.fixedTabsScrollHandler);
    this.$.tabs.classList.remove('fixed');

    this.nameFieldFocusHandler = (e) => {
      if (this.$.name.value === "New Character") {
        this.$.name.inputElement.select();
      }
    }
    this.$.name.addEventListener("focus", this.nameFieldFocusHandler);

    this.editModeHandler = (e) => {
      this.isEditMode = e.detail.isEditMode;
      this.pulse = false;
      togglePrimarySecondary(this.isEditMode, this);
    }
    getEditModeChannel().addEventListener('editModeChange', this.editModeHandler);
    this.isEditMode = isEditMode();

    if (!this.isLoaded) {
      this.isLoaded = true;
      registerSwipe(this.$.tabTarget, "right", () => {
        if (this.indexForTabs > 0) {
          const newIndex = this.indexForTabs - 1;
          if (!this.tabs[newIndex].hidden) {
            this.$.tabs.tabBar.activateTab(newIndex);
          } else if (this.indexForTabs > 1) {
            const newIndex = this.indexForTabs - 2;
            this.$.tabs.tabBar.activateTab(newIndex);
          }
        }
      },null, ".table");
      registerSwipe(this.$.tabTarget, "left", () => {
        if (this.indexForTabs < this.tabs.length - 1) {
          const newIndex = this.indexForTabs + 1;
          if (!this.tabs[newIndex].hidden) {
            this.$.tabs.tabBar.activateTab(newIndex);
          } else if (this.indexForTabs < this.tabs.length - 2) {
            const newIndex = this.indexForTabs + 2;
            this.$.tabs.tabBar.activateTab(newIndex);
          }
        }
      }, null, ".table");
    }

    this._selectionChangeHandler = (e) => {
      if (e && e.detail && e.detail.selection) {
        this.routeSelection = e.detail.selection;
      }
    };
    routeEventChannel().addEventListener("selection-change", this._selectionChangeHandler);
    this.routeSelection = readRouteSelection();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("tabChange", this.tabChangeHandler);
    this.removeEventListener("loadingChange", this.loadingHandler);
    window.removeEventListener('scroll', this.fixedTabsScrollHandler);
    getCharacterChannel().removeEventListener("character-selected", this.characterChangeHandler);
    this.$.name.removeEventListener("focus", this.nameFieldFocusHandler);
    getEditModeChannel().removeEventListener('editModeChange', this.editModeHandler);
  }

  updateView(el) {
    window.requestAnimationFrame(() => {
      const scrollHeight = window.scrollY;
      jqEmpty(this.$.tabTarget);
      this.$.tabTarget.appendChild(el);
      this.$.tabs.classList.remove('fixed');
      window.scrollTo(0, scrollHeight);
    });
  }
  
  routeSelectionChange() {
    if (this.tabs && this.routeSelection) {
      const newViewId = this.tabs.findIndex((tab) => tab.viewId === this.routeSelection);
      if (newViewId > -1) {
        this.initialSelectedTab = newViewId;
      } else {
        this.initialSelectedTab = 0;
      }
    }
  }

  async setStateFromCharacter(character) {
    this.characterName = character.name;
    this.classLevel = getClassString(character);
    this.background = getFeatureString("backgrounds", character, true);
    this.race = getFeatureString("races", character, true);

    // Set Tabs order based on tab order
    let isNonCaster = true;
    if (character) {
      if (character.choices && Object.values(character.choices).find(c => c.additionalSpells)) {
        isNonCaster = false;
      } else {
        const classRefs = await getClassReferences(character),
          classLevels = getClassLevelGroups(character);

        for (const [ className, level ] of Object.entries(classLevels)) {
          const classRef = classRefs[className];

          if (classRef.casterProgression) {
            isNonCaster = false;
          }

          if (character.subclasses && character.subclasses[className] && classRef.subclasses && classRef.subclasses.length) {
            const subclassDef = classRef.subclasses.find(i => character.subclasses[className].name === i.name);

            if (subclassDef && subclassDef.casterProgression) {
              isNonCaster = false;
            }
          }
        }
      }
    }

    if (this.wasNonCaster !== isNonCaster) {
      this.wasNonCaster = isNonCaster;
      if (isNonCaster) {
        this.tabs = this.nonCasterTabs();
      } else {
        this.tabs = this.defaultTabs();
      }
    }
  }

  defaultTabs() {
    return [
      { label: "", icon: "heart", viewId: "attributes" },
      { label: "", icon: "book-medical", viewId: "class" },
      { label: "", icon: "book-user", viewId: "background-race" },
      { label: "", icon: "book-spells", viewId: "spells" },
      { label: "", icon: "sack", viewId: "equipment" },
      { label: "", icon: "list", viewId: "abilities" },
      { label: "", icon: "dice", viewId: "rolls" },
    ]
  }

  nonCasterTabs() {
    return [
      { label: "", icon: "heart", viewId: "attributes" },
      { label: "", icon: "book-medical", viewId: "class" },
      { label: "", icon: "book-user", viewId: "background-race" },
      { label: "", icon: "book-spells", viewId: "spells", hidden: true},
      { label: "", icon: "sack", viewId: "equipment" },
      { label: "", icon: "list", viewId: "abilities" },
      { label: "", icon: "dice", viewId: "rolls" },
    ]
  }
  
  defaultMenu() {
    return [
      { component: this.createMenuItem('user-plus'), key: 'add', tooltip: 'Create New Character'},
      { component: this.createMenuItem('user-slash'), key: 'delete' , tooltip: 'Delete Character'},
      { component: this.createMenuItem('clone'), key: 'clone' , tooltip: 'Clone Character'},
      { component: this.createMenuItem('download'), tooltip: 'Download Character Data', children: [
        { text: 'Download', key: 'download' },
        { text: 'Download All', key: 'download-all' }
      ]},
      { component: this.createMenuItem('upload'), tooltip: 'Upload Character Data', key: 'upload' }
    ];
  }

  _menuItemSelected(e) {
    switch(e.detail.value.key) {
      case 'add':
        addCharacter();
        break;

      case 'delete':
        this.openDeleteModal();
        break;

      case 'download':
        this.downloadCharacter();
        break;

      case 'download-all':
        this.downloadCharacters();
        break;

      case 'upload':
        this.$.fileSelector.click();
        break;

      case 'clone':
        cloneCharacter();
        break;
    }
  }

  createMenuItem(iconName, text, isChild = false) {
    const item = document.createElement('vaadin-context-menu-item');
    const icon = document.createElement('dnd-icon');

    if (isChild) {
      icon.style.width = 'var(--lumo-icon-size-s)';
      icon.style.height = 'var(--lumo-icon-size-s)';
      icon.style.marginRight = 'var(--lumo-space-s)';
    }

    icon.setAttribute('icon', iconName);
    item.appendChild(icon);
    if (text) {
      item.appendChild(document.createTextNode(text));
    }
    return item;
  }

  removeCharacter() {
    removeSelectedCharacter();
    this.deleteModalOpen = false;
  }
  
  openDeleteModal() {
    this.deleteModalOpen = true;
  }

  closeDeleteModal() {
    this.deleteModalOpen = false;
  }

  downloadCharacter(e) {
    const char = getSelectedCharacter();
    saveAs(new Blob([JSON.stringify(char, null, 2)], {type: "application/json;charset=utf-8"}), `${char.name} - ${new Date().toLocaleString()}`);
  }
  
  downloadCharacters() {
    const chars = getCharacters();
    saveAs(new Blob([JSON.stringify(chars, null, 2)], {type: "application/json;charset=utf-8"}), `Character Export - ${new Date().toLocaleString()}`);
  }

  processUpload(event) {
    const fileList = event.target.files;
    console.log('upload', fileList);
    const timestamp = new Date().toLocaleString();

    for (let file of fileList) {
      if (file && file.type === "application/json") {
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
          const readFile = JSON.parse(event.target.result);
          const readArray = Array.isArray(readFile) ? readFile : [readFile];

          for (let readObject of readArray) {
            readObject.name += ` ${timestamp}`;
            uploadCharacter(readObject);
          }
        });
        reader.readAsText(file);
      }
    }
  }

  toggleEditMode() {
    dispatchEditModeChange(!this.isEditMode);
  }

  openDrawer() {
    this.dispatchEvent(new CustomEvent("open-drawer", { bubbles: true }));
  }

  _editIcon(isEditMode) {
    return isEditMode ? 'check' : 'edit';
  }

  _editModeClass(isEditMode) {
    return isEditMode ? 'edit-mode' : 'not-edit-mode';
  }
  
  static get template() {
    return html`
      <style include="material-styles"></style>
      <style>
        :host {
          display: block;
          --tab-bottom-margin: 425px;
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
    `;
  }
}
customElements.define('dnd-character-builder-view', DndCharacterBuilderView);
