import {PolymerElement, html} from '@polymer/polymer';
import "../styles/material-styles.js";
import "../styles/my-styles.js";
import "../dnd-tabs.js";
import "../dnd-character-select";
import "../dnd-spinner";
import "../dnd-switch";
import { jqEmpty } from "../../js/utils.js";
import { getCharacterChannel, getSelectedCharacter, updateName, getClassString, getFeatureString, addCharacter, removeSelectedCharacter, getClassReferences, getClassLevelGroups } from '../../util/charBuilder.js';
import registerSwipe from '../../util/swipe.js';
import { dispatchEditModeChange, getEditModeChannel, isEditMode } from '../../util/editMode.js';
import { rollEventChannel } from '../../util/roll.js';

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
    }
    getEditModeChannel().addEventListener('editModeChange', this.editModeHandler);
    this.isEditMode = isEditMode();

    if (!this.isLoaded) {
      this.isLoaded = true;
      registerSwipe(this.$.tabTarget, "right", () => {
        if (this.indexForTabs > 0) {
          const newIndex = this.indexForTabs - 1;
          this.$.tabs.tabBar.activateTab(newIndex);
        }
      });
      registerSwipe(this.$.tabTarget, "left", () => {
        if (this.indexForTabs < this.tabs.length - 1) {
          const newIndex = this.indexForTabs + 1;
          this.$.tabs.tabBar.activateTab(newIndex);
        }
      });
    }

    this.rollHandler = (e) => {
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

  setStateFromCharacter(character) {
    this.characterName = character.name;
    this.classLevel = getClassString(character);
    this.background = getFeatureString("backgrounds", character, true);
    this.race = getFeatureString("races", character, true);
  }

  defaultTabs() {
    return [
      { label: "", icon: "favorite", viewId: "attributes" },
      { label: "", icon: "flash_on", viewId: "spells" },
      { label: "", icon: "local_grocery_store", viewId: "equipment" },
      { label: "", icon: "casino", viewId: "rolls" },
      { label: "", icon: "class", viewId: "class" },
      { label: "", icon: "face", viewId: "background-race" },
    ]
  }

  nonCasterTabs() {
    return [
      { label: "", icon: "favorite", viewId: "attributes" },
      { label: "", icon: "local_grocery_store", viewId: "equipment" },
      { label: "", icon: "casino", viewId: "rolls" },
      { label: "", icon: "class", viewId: "class" },
      { label: "", icon: "face", viewId: "background-race" },
    ]
  }

  newCharacter() {
    addCharacter();
  }

  removeCharacter() {
    removeSelectedCharacter();
  }

  toggleEditMode() {
    this.$.editBtn.classList.toggle('edit-mode');
    const isEditMode = this.$.editBtn.classList.contains('edit-mode');
    dispatchEditModeChange(isEditMode);
    this.$.editBtn.innerHTML = isEditMode ? 'check' : 'edit';
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
        .roll-container {
          position: relative;
        }
        .roll-result {
          animation-name: fadeOutUp;
          animation-duration: 4s;
          animation-timing-function: ease-in;
          position: absolute;
          top: -80px;
          width: max-content;
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
            min-height: calc(var(--vh, 1vh) * 100 - 250px);
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
              <div class="roll-container" id="rollContainer"></div>
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
    `;
  }
}
customElements.define('dnd-character-builder-view', DndCharacterBuilderView);
