import {PolymerElement, html} from '@polymer/polymer';
import "../styles/material-styles.js";
import "../styles/my-styles.js";
import "../dnd-tabs.js";
import "../dnd-character-select";
import "../dnd-spinner";
import "../dnd-switch";
import { jqEmpty } from "../../js/utils.js";
import { saveAs } from 'file-saver';
import { getCharacterChannel, getSelectedCharacter, updateName, getClassString, getFeatureString, addCharacter, removeSelectedCharacter, getClassReferences, getClassLevelGroups, uploadCharacter, getCharacters } from '../../util/charBuilder.js';
import registerSwipe from '../../util/swipe.js';
import { dispatchEditModeChange, getEditModeChannel, isEditMode } from '../../util/editMode.js';
import { rollEventChannel } from '../../util/roll.js';
import { readRouteSelection, routeEventChannel, setRouteSelection } from '../../util/routing.js';
import { togglePrimarySecondary } from '../../util/darkmode.js';

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
      });
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
      });
    }

    this.rollHandler = (e) => {
      // Display Rolls
      const {name, roll, result} = e.detail;
      const newRollEl = document.createElement('div');
      newRollEl.classList.add('roll-result');
      newRollEl.innerHTML = `${name}: ${result}`;
      this.$.rollContainer.appendChild(newRollEl);
      setTimeout(() => {
        newRollEl.remove();
      }, 3900);
    }
    rollEventChannel().addEventListener('roll', this.rollHandler);

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
    rollEventChannel().removeEventListener('roll', this.rollHandler);
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

  newCharacter() {
    addCharacter();
  }

  removeCharacter() {
    removeSelectedCharacter();
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
          margin-left: 0px;
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
          margin-right: auto;
        }
        .thumb-menu__btn {
          border-radius: 50%;
          box-shadow: 0px 0px 20px -5px var(--mdc-theme-text-primary-on-background);
        }
        .edit-mode .edit-button {
          background: var(--mdc-theme-secondary) !important;
        }
        .drawer-btn {
          margin-bottom: 20px;
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
          width: 100%;
          margin-left: auto;
          margin-top: -30px;
          justify-content: flex-end;
          height: 55px;
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
        .download-all-char .material-icons {
          font-size: 16px;
          position: absolute;
          right: 4px;
          top: 8px;
        }

        .upload-char input {
          display: none;
        }

        .upload-char .mdc-icon-button {
          overflow: hidden;
        }


        @media(max-width: 420px) {
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
          .thumb-menu__btn {
            margin-left: auto;
            position: relative;
            top: -10px;
          }
          .upload-char,
          .download-char,
          .download-all-char,
          .delete-char,
          .add-char {
            display: block;
          }
          .buttons {
            margin-top: 0;
          }
          .drawer-btn {
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
          </div>
          <div class="buttons">
            <div class="thumb-menu">
              <div class="roll-container" id="rollContainer"></div>
              <button class="edit-button thumb-menu__btn mdc-icon-button mdc-button--raised material-icons"  on-click="toggleEditMode">[[_editIcon(isEditMode)]]</button>
              <button class="drawer-btn thumb-menu__btn mdc-icon-button mdc-button--raised material-icons"  on-click="openDrawer">logout</button>
            </div>
            <button class="mdc-icon-button material-icons add-char" on-click="newCharacter">person_add</button>
            <button class="mdc-icon-button material-icons delete-char" on-click="removeCharacter">delete</button>
            <button class="mdc-icon-button material-icons download-char" on-click="downloadCharacter">file_download</button>
            <button class="mdc-icon-button material-icons download-all-char" on-click="downloadCharacters">file_download <span class="material-icons">playlist_add</span></button>
            <label class="upload-char">
              <span class="mdc-icon-button">
                <span class=" material-icons">file_upload</span>
              </span>
              <input type="file" id="file-selector" accept=".json" on-change="processUpload" />
            </label>
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
    `;
  }
}
customElements.define('dnd-character-builder-view', DndCharacterBuilderView);
