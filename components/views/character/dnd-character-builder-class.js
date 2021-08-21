import { PolymerElement, html } from "@polymer/polymer";
import { MutableData } from '@polymer/polymer/lib/mixins/mutable-data.js';
import { getCharacterChannel, getSelectedCharacter, getClassReferences, setClassLevels, mergeSubclass, setClassSkillProficiencies, getSubclassChoiceLevel, mergeFeature, setSubclassChoice, setClassChoice, getSubclassChoice, getClassChoice, getHPRollForClassLevel, getHPDiceForLevel, setHpRoll } from "../../../util/charBuilder";
import "@vaadin/vaadin-grid";
import "../../dnd-select-add";
import "../../dnd-switch";
import "../../dnd-button";
import "../../dnd-asi-select";
import "../../dnd-svg";
import { jqEmpty, getEntryName } from "../../../js/utils";
import { classOptionsMap } from "../../../data/choices";
import EntryRenderer from "../../../util/entryrender";
import { } from '@polymer/polymer/lib/elements/dom-if.js';
import { } from '@polymer/polymer/lib/elements/dom-repeat.js';
import { getEditModeChannel, isEditMode } from "../../../util/editMode";
import {filterModel} from "../../../util/data";

class DndCharacterBuilderClass extends MutableData(PolymerElement) {
  
  static get properties() {
    return {
      levels: {
        type: Array,
        value: []
      },
      classes: {
        type: Object,
      },
      subclasses: {
        type: Object,
        value: undefined
      },
      heightByRows: {
        type: Boolean,
        value: () => {
          return window.innerWidth < 900;
        }
      },
      noContentMessage: {
        type: Boolean,
        value: false
      },
      isEditMode: {
        type: Boolean,
        value: false
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.characterChangeHandler = (e) => {
      let character = e.detail.character;
      this.updateFromCharacter(character);
    };
    
    this.updateFromCharacter(getSelectedCharacter());
    getCharacterChannel().addEventListener("character-selected", this.characterChangeHandler);

    this.editModeHandler = (e) => {
      this.isEditMode = e.detail.isEditMode;
      this.$.classGrid.notifyResize();
    }
    getEditModeChannel().addEventListener('editModeChange', this.editModeHandler);
    this.isEditMode = isEditMode();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    getCharacterChannel().removeEventListener("character-selected", this.characterChangeHandler);
    getEditModeChannel().removeEventListener('editModeChange', this.editModeHandler);
  }

  ready() {
    super.ready();

    const renderer = new EntryRenderer();

    setTimeout(() => {
      const grid = this.$.classGrid;
      let draggedItem;

      grid.rowDetailsRenderer = ((root, grid, rowData) => {
        let renderStack = [],
          features = this._getClassLevelFeatures(this.levels, rowData.index, this.classes, this.subclasses);
        
        if (features && features.length) {
          if (!root.firstElementChild) {
            root.innerHTML = '<div class="details" id="stats"></div>';
          }

          for (let feature of features) {
            renderer.recursiveEntryRender(
              feature,
              renderStack,
              0,
              undefined,
              true
            );
          }
          const deets = root.querySelector('.details');
          jqEmpty(deets);
          deets.innerHTML = renderStack.join("");
        }
      }).bind(this);

      grid.addEventListener('grid-dragstart', function(e) {
        draggedItem = e.detail.draggedItems[0];
        grid.dropMode = 'between';
      });

      grid.addEventListener('grid-dragend', function(e) {
        draggedItem = grid.dropMode = null;
      });

      grid.addEventListener('grid-drop', function(e) {
        const dropTargetItem = e.detail.dropTargetItem;
        if (draggedItem && draggedItem !== dropTargetItem) {
          // Reorder the items
          const items = grid.items.filter(function(i) {
            return i !== draggedItem;
          });
          const dropIndex = items.indexOf(dropTargetItem)
            + (e.detail.dropLocation === 'below' ? 1 : 0);
          items.splice(dropIndex, 0, draggedItem);
          setClassLevels(items);
        }
      });
    }, 0);
  }

  async updateFromCharacter(character) {
    if (character && character.levels && character.levels.length) {
      this.noContentMessage = false;
      this.character = character;
      this.classes = await getClassReferences(character);
      this.subclasses = JSON.parse(JSON.stringify(character.subclasses));

      this.classChoices = await this._findLevelChoices(character, this.classes);

      this.dispatchEvent(new CustomEvent("loadingChange", { bubbles: true, composed: true }));

      this.levels = character.levels;

      const hitDiceMaxes = [];
      for (let i = 0; i < character.levels.length; i++) {
        hitDiceMaxes.push(await getHPDiceForLevel(i));
      }
      this.hitDiceMaxes = hitDiceMaxes;

      this.$.classGrid.clearCache();
    } else {
      this.noContentMessage = true;
      this.dispatchEvent(new CustomEvent("loadingChange", { bubbles: true, composed: true }));
      this.$.classGrid.clearCache();
    }
  }

  _getClassLevelFeatures(levels, index, classes, subclasses) {
    if (classes && levels[index] && subclasses) {
      const className = levels[index].name;
      const classRef = classes[className];

      if (classRef) {
        const classFeatures = classRef.classFeatures;
        let levelsInClass = -1;
        let levelsInSubclass = -1;

        if (levels.length >= index + 1) {
          for (let i = 0; i <= index; i ++) {
            if (levels[i].name === className) {
              levelsInClass ++;

              const classFeaturesForLevel = classFeatures[levelsInClass];
              if (classFeaturesForLevel) {
                const hasSubclassFeature = classFeaturesForLevel.find(i => i.gainSubclassFeature);
                if (hasSubclassFeature) {
                  levelsInSubclass ++;
                }
              }
            }
          }

          const classFeaturesForLevel = classFeatures[levelsInClass];
          if (classFeaturesForLevel) {
            const hasSubclassFeature = classFeaturesForLevel.some(i => i.gainSubclassFeature);
            if (hasSubclassFeature && subclasses && subclasses[className] && classRef.subclasses && classRef.subclasses.length) {
              const subclassDef = classRef.subclasses.find(i => subclasses[className].name === i.name);
              if (subclassDef.subclassFeatures[levelsInSubclass]) {
                subclassDef.subclassFeatures[levelsInSubclass].map((i) => { i.isSubclass = true; return i; })
                return [...classFeaturesForLevel].concat(subclassDef.subclassFeatures[levelsInSubclass]);
              }
            }
            return classFeaturesForLevel.filter((feature) => { 
              const name = getEntryName(feature);
              return name !== 'Proficiency Versatility' && name !== 'Martial Versatility';
            });
          }
        }
      }
    }
  }

  _getClassLevelFeatureStringArray(levels, index, classes, subclasses) {
    if (levels && index !== undefined && classes && subclasses) {
      const classLevelFeatures = this._getClassLevelFeatures(levels, index, classes, subclasses);

      if (classLevelFeatures) {
        return classLevelFeatures.map(f => {
          return { name: getEntryName(f), isSubclass: f.isSubclass };
        });
      }
    }
  }

  _level(index) {
    return index + 1;
  }

  _deleteLevel(e) {
    let index = e.model.__data.index;
    this.levels.splice(index, 1);
    setClassLevels(this.levels);
  }

  _expandDetails(e) {
    let data = e.model.__data.item,
      stayClosed = this.$.classGrid.detailsOpenedItems.indexOf(data) > -1;

    for (let item of this.$.classGrid.detailsOpenedItems) {
      this.$.classGrid.closeItemDetails(item);
    }

    if (stayClosed) {
      this.$.classGrid.closeItemDetails(data);
    } else {
      this.$.classGrid.openItemDetails(data);
    }
    this.$.classGrid.notifyResize();
  }

  async _findLevelChoices(character, classes) {
    const levelChoices = [];
    if (character && character.levels && character.levels.length) {
      for (let i = 0; i < character.levels.length; i++) {
        levelChoices.push(await this._findChoices(character, classes, i));
      }
    }
    return levelChoices;
  }

  async _findChoices(character, classes, levelIndex) {
    if (classes && character.levels && character.levels.length && character.levels.length > levelIndex) {
      let levels = character.levels,
        subclasses = character.subclasses,
        name = levels[levelIndex].name,
        classDef = classes[name];

      if (classDef) {
        let choices = [],
          classLevelCount = 0,
          subclassChoiceLevel = getSubclassChoiceLevel(classDef);

        for (let i = 0; i <= levelIndex; i++) {
          let level = levels[i]
          if (level.name === name) {
            classLevelCount ++;
          }
        }

        if (subclassChoiceLevel !== undefined && classLevelCount === subclassChoiceLevel) {
          choices.push({
            id: "subclass",
            from: classDef.subclasses,
            selections: character.subclasses[name]
          });
        }

        let features = this._getClassLevelFeatures(levels, levelIndex, classes, subclasses);
        if (features && features.length
            && features.find((f) => { return f.name === "Ability Score Improvement"; })) {
          choices.push({
            id: "asi"
          });
        }

        if (levelIndex === 0) {
          const classSkillOptions = classDef.startingProficiencies.skills[0].choose;
          choices.push({
            id: "profs",
            count: classSkillOptions.count,
            from: classSkillOptions.from,
            selections: character.classSkillProficiencies
          });
        }

        if (classLevelCount) {
          const classOptions = classOptionsMap[name.toLowerCase()];

          if (classOptions && classOptions.class && classOptions.class[classLevelCount]) {
            const classLevelOptions = [].concat(classOptions.class[classLevelCount]);
            
            for (const classLevelOption of classLevelOptions) {
              if (classLevelOption.options) {
                choices.push({
                  id: "classFeature",
                  name: classLevelOption.name,
                  from: classLevelOption.options,
                  count: classLevelOption.count > 1 ? classLevelOption.count : undefined,
                  class: name.toLowerCase(),
                  feature: classLevelOption.name,
                  level: classLevelCount,
                  selections: getClassChoice(name.toLowerCase(), classLevelCount, classLevelOption.name)
                });
              } else if (classLevelOption.type) {
                const options = await filterModel("features", classLevelOption.type);
                choices.push({
                  id: "classFeature",
                  name: classLevelOption.name,
                  from: options,
                  count: classLevelOption.count > 1 ? classLevelOption.count : undefined,
                  class: name.toLowerCase(),
                  feature: classLevelOption.name,
                  level: classLevelCount,
                  selections: getClassChoice(name.toLowerCase(), classLevelCount, classLevelOption.name)
                });
              }
            }
          }

          if (classOptions && classOptions.subclasses && subclasses[name] && classOptions.subclasses[subclasses[name].name] && classOptions.subclasses[subclasses[name].name][classLevelCount]) {
            const subclassLevelOptions = [].concat(classOptions.subclasses[subclasses[name].name][classLevelCount]);
            
            for (const subclassLevelOption of subclassLevelOptions) {
              if (subclassLevelOption.options) {
                choices.push({
                  id: "subclassFeature",
                  name: subclassLevelOption.name,
                  from: subclassLevelOption.options,
                  count: subclassLevelOption.count > 1 ? subclassLevelOption.count : undefined,
                  class: name.toLowerCase(),
                  subclass: subclasses[name],
                  feature: subclassLevelOption.name,
                  level: classLevelCount,
                  selections: getSubclassChoice(name.toLowerCase(), subclasses[name].name.toLowerCase(), classLevelCount, subclassLevelOption.name)
                });
              } else if (subclassLevelOption.type) {
                const options = await filterModel("features", subclassLevelOption.type);
                choices.push({
                  id: "subclassFeature",
                  name: subclassLevelOption.name,
                  from: options,
                  count: subclassLevelOption.count > 1 ? subclassLevelOption.count : undefined,
                  class: name.toLowerCase(),
                  subclass: subclasses[name],
                  feature: subclassLevelOption.name,
                  level: classLevelCount,
                  selections: getSubclassChoice(name.toLowerCase(), subclasses[name].name.toLowerCase(), classLevelCount, subclassLevelOption.name)
                });
              }
            }
          }
        }

        return choices;
      }
    }
    return [];
  }

  _equal(a, b) {
    return a === b;
  }

  _genSubclassCallback(level) {
    return (subclass) => {
      mergeSubclass(undefined, level.name, subclass);
    }
  }

  _genSubclassOptions(level) {
    return this.classes[level.name].subclasses;
  }

  _getSubclassSelection(level, subclasses) {
    return subclasses[level.name];
  }

  _classFeatureOptionAddCallback(classs, level, feature) {
    return (choice) => {
      let adjChoice;
      if (Array.isArray(choice)) {
        adjChoice = choice.map(c => {
          if (c.name) {
            return { name: c.name, source: c.source }
          } else {
            return c;
          }
        });
      } else if (choice.name) {
        adjChoice = { name: choice.name, source: choice.source };
      } else {
        adjChoice = choice;
      }
      setClassChoice(classs, level, feature, adjChoice);
    };
  }

  _subclassFeatureOptionAddCallback(classs, subclass, level, feature) {
    return (choice) => {
      let adjChoice;
      if (Array.isArray(choice)) {
        adjChoice = choice.map(c => {
          if (c.name) {
            return { ...c }
          } else {
            return c;
          }
        });
      } else if (choice.name) {
        adjChoice = { ...choice };
      } else {
        adjChoice = choice;
      }
      setSubclassChoice(classs, subclass.name.toLowerCase(), level, feature, adjChoice);
    };
  }

  _indexOfLevel(level, levels) {
    return levels.indexOf(level);
  }

  _isMobile() {
    return window.innerWidth < 921;
  }

  _objArray(obj) {
    return Object.values(obj);
  }

  _atIndex(data, index) {
    return data ? data[index] : null;
  }

  _svgFromClass(className) {
    return className ? className.replace(/(\s|\(|\))/g, "") : '';
  }

  _addClassLevel(e) {
    mergeFeature(undefined, e.model.item, "classes");
  }

  _classSkillAddCallback(skills) {
    setClassSkillProficiencies(skills);
  }

  _levelHp(className, index) {
    return getHPRollForClassLevel(className, index + 1);
  }

  _editModeClass(isEditMode) {
    return isEditMode ? 'edit-mode' : 'not-edit-mode';
  }

  _toggleHpField(e) {
    const element = e.target.closest('.btn-field');
    const isOpen = element.classList.contains('btn-field--open');
    const intField = element.querySelector('vaadin-integer-field');
    const level = parseInt(element.dataset.level) + 1;
    const className = element.dataset.className;
    const max = parseInt(element.dataset.max);
  
    if (isOpen) {
      const changeVal = parseInt(intField.value);
      if (changeVal && changeVal <= max && changeVal > 0) {
        setHpRoll(className, level, changeVal);
        intField.value = '';
        element.classList.toggle('btn-field--open');
      } else {
        element.classList.add('btn-field--error');
        setTimeout(() => {
          element.classList.remove('btn-field--error');
        }, 500);
      }
    } else {
      element.classList.toggle('btn-field--open');
      intField.focus();
    }
  }

  _levelHitDice(index, maxes) {
    if (maxes && index !== undefined && maxes[index]) {
      return maxes[index];
    }
  }

  static get template() {
    return html`
      <style include="material-styles my-styles">
        .something {
          display: block;
        }
        #stats {
          margin-top: 16px;
          line-height: 1.9;
        }
        .details {
          padding: 0 24px;
        }

        #classGrid {
          margin-bottom: 144px;
        }

        .not-edit-mode .heading-wrap {
          display: none;
        }

        .heading-wrap {
          display: flex;
          justify-content: space-between;
          margin: 22px 14px 5px;
          align-items: center;
        }

        .not-edit-mode .button-wrap {
          display: none;
        }

        .button-wrap {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          padding: 10px;
        }
        .button-wrap > * {
          margin: 4px;
        }

        .row {
          position: relative;
        }
        .row:after {
          content: "";
          display: table;
          clear: both;
        }

        .open-details {
          cursor: pointer;
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
        }
        .open-details:hover {
          color: var(--mdc-theme-secondary);
        }

        .level-col {
          width: calc(100% - 70px);
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          flex-shrink: 0;
          padding: 6px 0;
        }
        .level-col__level {
          margin-right: 10px;
          font-size: 20px;
          font-weight: bold;
        }
        .level-col__image-wrap {
          width: 30px;
          position: relative;
          height: 21px;
          display: inline-block;
        }
        .level-col__image {
          width: 30px;
          height: 30px;
          display: block;
          position: absolute;
          top: -1px;
        }
        .level-col__class {
          font-size: 20px;
          font-weight: bold;
        }

        .features-col {
          white-space: normal;
          margin: 0;
          padding: 8px 0;
          width: 100%;
          font-size: 15px;
        }
        .class-feature:not(:last-of-type)::after {
          content: ', ';
        }
        .class-feature[subclass] {
          color: var(--mdc-theme-secondary);
        }

        .choices-col {
          display: flex;
          float: left;
          flex-wrap: wrap;
        }
        .choices-col__choice {
          margin-right: 16px;
        }
        .choices-col__subclass-choice {
          display: block;
        }

        .delete-col {
          position: absolute;
          right: -8px;
          top: 4px;
        }
        .delete-btn {
          height: 24px;
          width: 24px;
          font-size: 18px;
          padding: 0;
        }
        .delete-btn:hover {
          color: var(--mdc-theme-secondary);
        }
        .not-edit-mode .delete-btn {
          display: none;
        }
        

        .btn-field {
          display: inline-flex;
          flex-direction: row;
          flex-wrap: nowrap;
          margin-bottom: 16px;
          width: 80px;
          height: 36px;
          background: var(--lumo-contrast-10pct);
          border-radius: 4px;
        }
        .btn-field--error {
          background: var(--lumo-error-color-50pct);
        }
        .btn-field__btn {
          display: block;
          width: 100%;
        }
        .btn-field__input {
          display: none;
        }
        .btn-field--open .btn-field__btn {
          width: 40px;
        }
        .btn-field__btn-label-text {
          position: relative;
          left: 4px;
          bottom: 2px;
        }
        .btn-field--open .btn-field__btn-label-text {
          display: none;
        }
        .btn-field--open .btn-field__input {
          display: block;
          width: 40px;
          margin-top: -40px;
        }
        .btn-field--open .btn-field__btn-label {
          margin-left: -20px;
        }
        .btn-field vaadin-integer-field {
          --lumo-contrast-10pct: transparent;
        }


        .hp-col {
          position: absolute;
          right: 22px;
          top: 8px;
        }
        .not-edit-mode .hp-col {
          right: 0px;
        }
        .hp-col .material-icons {
          font-size: 16px;
          position: relative;
          top: 1px;
          margin-right: 2px;
        }
        .hp-col__non-edit {
          display: block;
        }
        .edit-mode .hp-col__non-edit {
          display: none;
        }
        .hp-col__edit {
          display: none;
        }
        .edit-mode .hp-col__edit {
          display: inline-flex;
        }

        .details {
          font-size: 14px;
          width: calc(100% - 30px);
          margin: 0 auto 13px !important;
          background: var(--lumo-contrast-10pct);
          border-radius: 4px;
          white-space: pre-line;
          padding: 14px 14px 1px;
        }

        .details#stats p {
          line-height: 1.5;
        }

        @media(min-width: 921px) {
          .features-col {
            margin: 0 30px 0 12px;
            width: unset;
            font-size: 16px;
          }
          #classGrid {
            margin-bottom: 0;
          }
        }

        .no-content-message {
          padding: 20px;
          font-size: 14px;
          font-style: italic;
        }
      </style>

      <div class$="[[_editModeClass(isEditMode)]]">
        <div class="heading-wrap">
          <dnd-select-add model="classes" placeholder="Add a Class"></dnd-select-add>
        </div>
        <div class="button-wrap">
          <template is="dom-repeat" items="[[_objArray(classes)]]">
            <dnd-button icon="add" label="[[item.name]]" on-click="_addClassLevel"></dnd-button>
          </template>
        </div>

        <div class="no-content-message" hidden$="[[!noContentMessage]]">Enter edit mode to add classes and levels.</div>

        <vaadin-grid id="classGrid" items=[[levels]] theme="no-border" height-by-rows$="[[heightByRows]]">
          <vaadin-grid-column flex-grow="1">
            <template>
              <div class="row">
                <div class="open-details" on-click="_expandDetails">
                  <div class="level-col">
                    <span class="level-col__level">[[_level(index)]]</span>
                    <span class="level-col__image-wrap" ><dnd-svg class="level-col__image" default-color id="[[_svgFromClass(item.name)]]"></dnd-svg></span>
                    <span class="level-col__class">[[item.name]]</span>
                  </div>

                  <div class="features-col">
                    <template is="dom-repeat" items="[[_getClassLevelFeatureStringArray(levels, index, classes, subclasses)]]">
                      <span class="class-feature" subclass$="[[item.isSubclass]]">[[item.name]]</span>
                    </template>
                  </div>
                </div>

                <div class="choices-col">
                  <template is="dom-repeat" items="[[_atIndex(classChoices, index)]]" as="choice">
                    <div class="choices-col__choice">
                      <template is="dom-if" if="[[_equal(choice.id, 'subclass')]]">
                        <dnd-select-add class="choices-col__subclass-choice" label="Subclass" placeholder="<Choose Subclass>" disabled$="[[!isEditMode]]"
                          options="[[choice.from]]" value="[[choice.selections]]" add-callback="[[_genSubclassCallback(item)]]"></dnd-select-add>
                      </template>
                      <template is="dom-if" if="[[_equal(choice.id, 'asi')]]">
                        <dnd-asi-select level-index="[[_indexOfLevel(item, levels)]]" character="[[character]]" disabled$="[[!isEditMode]]"></dnd-asi-select>
                      </template>
                      <template is="dom-if" if="[[_equal(choice.id, 'profs')]]">
                        <dnd-select-add choices="[[choice.count]]" label="Skill Proficiency" placeholder="<Choose Skills>" disabled$="[[!isEditMode]]"
                          options="[[choice.from]]" value="[[choice.selections]]" add-callback="[[_classSkillAddCallback]]"></dnd-select-add>
                      </template>
                      <template is="dom-if" if="[[_equal(choice.id, 'classFeature')]]">
                        <dnd-select-add choices="[[choice.count]]" label="[[choice.name]]" placeholder="<Choose Option>" disabled$="[[!isEditMode]]"
                          options="[[choice.from]]" value="[[choice.selections]]" add-callback="[[_classFeatureOptionAddCallback(choice.class, choice.level, choice.feature)]]"></dnd-select-add>
                      </template>
                      <template is="dom-if" if="[[_equal(choice.id, 'subclassFeature')]]">
                        <dnd-select-add choices="[[choice.count]]" label="[[choice.name]]" placeholder="<Choose Option>" disabled$="[[!isEditMode]]"
                          options="[[choice.from]]" value="[[choice.selections]]" add-callback="[[_subclassFeatureOptionAddCallback(choice.class, choice.subclass, choice.level, choice.feature)]]"></dnd-select-add>
                      </template>
                    </div>
                  </template>
                </div>

                <div class="hp-col">
                  <div class="hp-col__non-edit"><span class="material-icons" aria-hidden="true">favorite</span> [[_levelHp(item.name, index)]]</div>

                  <div class="hp-col__edit btn-field" data-max$="[[_levelHitDice(index, hitDiceMaxes)]]" data-level$="[[index]]" data-class-name$="[[item.name]]">
                    <dnd-button background="none" class="btn-field__btn" on-click="_toggleHpField">
                      <span class="btn-field__btn-label" slot="label"><span class="material-icons" aria-hidden="true">favorite</span><span class="btn-field__btn-label-text">[[_levelHp(item.name, index)]]</span></span>
                    </dnd-button>
                    <vaadin-integer-field class="btn-field__input" min="1" max="[[_levelHitDice(index, hitDiceMaxes)]]" ></vaadin-integer-field>
                  </div>
                </div>

                <div class="delete-col">
                  <button class="mdc-icon-button material-icons delete-btn" on-click="_deleteLevel">close</button>
                </div>
              </div>
            </template>
          </vaadin-grid-column>
        </vaadin-grid>
      </div>
    `;
  }
}

customElements.define("dnd-character-builder-class", DndCharacterBuilderClass);