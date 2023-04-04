import { PolymerElement, html } from "@polymer/polymer";
import { MutableData } from '@polymer/polymer/lib/mixins/mutable-data.js';
import { getCharacterChannel, getSelectedCharacter, getClassReferences, setClassLevels, mergeSubclass, getSubclassChoiceLevel, mergeFeature, setSubclassChoice, setClassChoice, getSubclassChoice, getClassChoice, getHPRollForClassLevel, getHPDiceForLevel, setHpRoll, getClassString, getOptionFeatureChoice, setOptionFeatureChoice } from "../../../util/charBuilder";
import "../../dnd-select-add";
import "../../dnd-switch";
import "../../dnd-button";
import "../../dnd-asi-select";
import "../../dnd-svg";
import './dnd-character-builder-suboptions';
import { jqEmpty, getEntryName, cloneDeep } from "../../../js/utils";
import { classOptionsMap } from "../../../data/choices";
import EntryRenderer from "../../../util/entryrender";
import { } from '@polymer/polymer/lib/elements/dom-if.js';
import { } from '@polymer/polymer/lib/elements/dom-repeat.js';
import { getEditModeChannel, isEditMode } from "../../../util/editMode";
import { filterModel } from "../../../util/data";
import '@vaadin/vaadin-text-field/vaadin-integer-field'

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
    }
    getEditModeChannel().addEventListener('editModeChange', this.editModeHandler);
    this.isEditMode = isEditMode();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    getCharacterChannel().removeEventListener("character-selected", this.characterChangeHandler);
    getEditModeChannel().removeEventListener('editModeChange', this.editModeHandler);
  }

  async updateFromCharacter(character) {
    if (character && character.levels && character.levels.length) {
      console.error('class updateFromCharacter', character);
      this.noContentMessage = false;
      this.character = character;
      this.classes = await getClassReferences(character);
      this.subclasses = cloneDeep(character.subclasses);
      this.classLevel = getClassString(character);
      this.classChoices = await this._findLevelChoices(character, this.classes);

      this.dispatchEvent(new CustomEvent("loadingChange", { bubbles: true, composed: true }));

      this.levels = cloneDeep(character.levels);

      const hitDiceMaxes = [];
      for (let i = 0; i < character.levels.length; i++) {
        hitDiceMaxes.push(await getHPDiceForLevel(i));
      }
      this.hitDiceMaxes = hitDiceMaxes;
    } else {
      this.levels = [];
      this.noContentMessage = true;
      this.dispatchEvent(new CustomEvent("loadingChange", { bubbles: true, composed: true }));
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
              if (subclassDef && subclassDef.subclassFeatures && subclassDef.subclassFeatures[levelsInSubclass]) {
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

  _getClassLevelFeatureStringArray(levels, index, classes, subclasses, classChoices) {
    if (levels && index !== undefined && classes && subclasses) {
      const classLevelFeatures = this._getClassLevelFeatures(levels, index, classes, subclasses);

      if (classLevelFeatures) {
        return classLevelFeatures.map(f => {
          return { name: getEntryName(f), isSubclass: f.isSubclass, source: f.source };
        }).filter(feature => {
          const isUnselectedReplacementChoice = classChoices && classChoices[index] && classChoices[index].some((choice) => {
            const isNotSelectedOptionalFeature = choice.selection && (choice.selection.name !== feature.name || choice.selection.source !== feature.source);
            const isOptionalFeature = choice.from && choice.from.some((optionalFeature) => {return optionalFeature.name === feature.name && optionalFeature.source === feature.source});
            
            return choice.id === 'replacement' && isNotSelectedOptionalFeature && isOptionalFeature;
          });

          return !isUnselectedReplacementChoice;
        });
      }
    }
  }

  _level(index) {
    return index + 1;
  }

  _deleteLevel(e) {
    const index = e.model.__data.index,
      className = this.levels[index].name,
      level = this.levels.filter(lvl => lvl.name === className).length,
      choiceKeysToRemove = Object.keys(this.character.choices).filter(key => key.startsWith(className.toLowerCase() + '_' + level));
    
    this.levels.splice(index, 1);
    choiceKeysToRemove.forEach(key => {
      delete this.character.choices[key];
    });
    setClassLevels(this.levels);
  }

  _expandDetails(e) {
    let rowIndex = e.model.__data.index;
    
    if (this.expandedIndex === rowIndex) {
      this.expandedIndex = null;
    } else {
      this.expandedIndex = rowIndex;
    }
  }

  _renderDetails(expandedIndex, rowIndex) {
    let renderStack = [];
    if (expandedIndex === rowIndex) {
      const renderer = new EntryRenderer();
      const features = this._getClassLevelFeatures(this.levels, rowIndex, this.classes, this.subclasses);
      
      if (features && features.length) {
        for (let feature of features) {
          const isUnselectedReplacementChoice = this.classChoices && this.classChoices[rowIndex] && this.classChoices[rowIndex].some((choice) => {
            const isNotSelectedOptionalFeature = choice.selection && (choice.selection.name !== feature.name || choice.selection.source !== feature.source);
            const isOptionalFeature = choice.from && choice.from.some((optionalFeature) => {return optionalFeature.name === feature.name && optionalFeature.source === feature.source});
            
            return choice.id === 'replacement' && isNotSelectedOptionalFeature && isOptionalFeature;
          });
          if (!isUnselectedReplacementChoice) {
            renderer.recursiveEntryRender(
              feature,
              renderStack,
              0,
              undefined,
              true
            );
          }
        }
      }
      return "<div class='details stats-wrapper'>" + renderStack.join("") + "</div>"
    } else {
      return "";
    }
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
        className = levels[levelIndex].name,
        classDef = classes[className],
        subclassDef = classDef.subclasses.find(i => subclasses[className] && subclasses[className].name === i.name);

      if (classDef) {
        let choices = [],
          classLevelCount = 0,
          subclassChoiceLevel = getSubclassChoiceLevel(classDef);

        for (let i = 0; i <= levelIndex; i++) {
          let level = levels[i]
          if (level.name === className) {
            classLevelCount ++;
          }
        }

        
        // Class sub-option for additional spells and first level proficiencies
        const classSubOptions = {};
        // restructuring class defined additional spells
        if (classDef.additionalSpells) {
          let lowestAddtlSpellLevel = 9;
          classDef.additionalSpells.forEach((addtlSpellSetEntry) => {
            Object.entries(addtlSpellSetEntry).forEach(([addtlSpellTypeKey, addtlSpellTypeValue]) => {
              Object.entries(addtlSpellTypeValue).forEach(([addtlSpellLevelKey, addtlSpellLevelValue]) => {
                const spellGainLevel = parseInt(addtlSpellLevelKey.split('s').join(''));

                if (spellGainLevel < lowestAddtlSpellLevel && addtlSpellTypeKey !== 'prepared' && addtlSpellTypeKey !== 'expanded') {
                  lowestAddtlSpellLevel = spellGainLevel;
                }
                
                // If this level has some spell gain, recreate structure for just this level
                if (classDef.additionalSpells.length === 1 && spellGainLevel === classLevelCount) {
                  if (!classSubOptions.additionalSpells) {
                    classSubOptions.additionalSpells = [{}];
                  }
                  if (!classSubOptions.additionalSpells[0][addtlSpellTypeKey]) {
                    classSubOptions.additionalSpells[0][addtlSpellTypeKey] = {}
                  }
                  classSubOptions.additionalSpells[0][addtlSpellTypeKey][addtlSpellLevelKey] = addtlSpellLevelValue;
                }
              });
            });
          });
          // if there are multiple additional spell sets then select set (and all others) at the lowest level
          if (classDef.additionalSpells.length > 1 && lowestAddtlSpellLevel === classLevelCount) {
            classSubOptions.additionalSpells = classDef.additionalSpells;
          }
        }

        if (levelIndex === 0) {
          classSubOptions.skillProficiencies = classDef.startingProficiencies.skills;

          if (classDef.startingProficiencies.armor) {
            classSubOptions.armorProficiencies = [{}];
            classDef.startingProficiencies.armor.forEach(p => {
              let prof = p.proficiency || p.toLowerCase();
              prof = prof.includes('shield') ? 'shield' : prof;
              classSubOptions.armorProficiencies[0][prof] = true;
            });
          }
          
          if (classDef.startingProficiencies.weapons) {
            classSubOptions.weaponProficiencies = [{}];
            classDef.startingProficiencies.weapons.forEach(p => {
              let prof = p.proficiency || p.toLowerCase();
              if (prof.includes("@item")) {
                prof = prof.split("@item")[1].trim().split('|')[0];
              }
              classSubOptions.weaponProficiencies[0][prof] = true;
            });
          }

          if (classDef.startingProficiencies.tools) {
            classSubOptions.toolProficiencies = [{}];
            classDef.startingProficiencies.tools.forEach(p => {
              let count;
              let prof = p.proficiency || p.toLowerCase();
              count = prof.includes('one ') ? 1 : prof.includes('two ') ? 2 : prof.includes('three ') ? 3 :prof.includes('four ') ? 4 : prof.includes('five ') ? 5 : 1;
              if (prof.includes("@item")) {
                prof = prof.split("@item")[1].trim().split('|')[0];
              }
              if (prof.includes("artisan's tools") || prof.includes('musical instrument')) {
                prof = prof.includes("artisan's tools") ? "artisan's tools" : 'musical instrument';
                classSubOptions.toolProficiencies[0].choose = { from: [prof], count };
              } else {
                classSubOptions.toolProficiencies[0][prof] = true;
              }
            });
          }
        }
        choices.push({
          id: "classSubOptions",
          classSubOptions,
          class: className.toLowerCase(),
          level: classLevelCount
        });

        // Subclass choice
        if (subclassChoiceLevel !== undefined && classLevelCount === subclassChoiceLevel) {
          choices.push({
            id: "subclass",
            from: classDef.subclasses,
            selections: character.subclasses[className]
          });
        }

        // Subclass suboption
        const subclassSubOptions = {};
        if (subclassDef && subclassDef.additionalSpells) {
          let lowestAddtlSpellLevel = 20;
          let hasExpanded = false;
          subclassDef.additionalSpells.forEach((addtlSpellSetEntry) => {
            Object.entries(addtlSpellSetEntry).forEach(([addtlSpellTypeKey, addtlSpellTypeValue]) => {
              if (addtlSpellTypeKey === 'expanded') {
                hasExpanded = true;
              }
              if (typeof addtlSpellTypeValue !== 'string' && !Array.isArray(addtlSpellTypeValue)) {
                Object.entries(addtlSpellTypeValue).forEach(([addtlSpellLevelKey, addtlSpellLevelValue]) => {
                  const spellGainLevel = parseInt(addtlSpellLevelKey.split('s').join(''));

                  if (spellGainLevel < lowestAddtlSpellLevel && addtlSpellTypeKey !== 'prepared') {
                    lowestAddtlSpellLevel = spellGainLevel;
                  }
                  
                  // If this level has some spell gain, recreate structure for just this level
                  if (subclassDef.additionalSpells.length === 1 && addtlSpellTypeKey !== 'expanded'&& spellGainLevel === classLevelCount) {
                    if (!subclassSubOptions.additionalSpells) {
                      subclassSubOptions.additionalSpells = [{}];
                    }
                    if (!subclassSubOptions.additionalSpells[0][addtlSpellTypeKey]) {
                      subclassSubOptions.additionalSpells[0][addtlSpellTypeKey] = {}
                    }
                    subclassSubOptions.additionalSpells[0][addtlSpellTypeKey][addtlSpellLevelKey] = addtlSpellLevelValue;
                  }
                });
              }
            });
          });
          // if there are multiple additional spell sets then select set (and all others) at the lowest level
          if ((subclassDef.additionalSpells.length > 1 || hasExpanded) && lowestAddtlSpellLevel === classLevelCount) {
            subclassSubOptions.additionalSpells = subclassDef.additionalSpells;
          }
          choices.push({
            id: "subclassSubOptions",
            subclassSubOptions,
            subclass: subclassDef.shortName,
            class: className.toLowerCase(),
            level: classLevelCount
          });
        }

        // ASI choice
        let features = this._getClassLevelFeatures(levels, levelIndex, classes, subclasses);
        if (features && features.length) {
          if (features.find((f) => { return f.name === "Ability Score Improvement"; })) {
            if (!this.asiItem) {
              this.asiChoice = {
                id: "asi",
                class: className.toLowerCase(),
                level: classLevelCount,
                asiItem: {
                  asi: true
                }
              }
            }
            choices.push(this.asiChoice);
          }
        }

        // Feature replacement choice
        if (features && features.length) {
          features.forEach(feature => {
            if (!feature.name.includes("feature")) {
              const choice = {
                id: 'replacement',
                from: [{name: feature.name, source: feature.source}],
                selection: getOptionFeatureChoice(className, levelIndex, feature.name),
                class: className,
                level: levelIndex,
                feature: feature.name
              };
              features.forEach(featurei => {
                if (featurei.isClassFeatureVariant && featurei.entries[0].includes('replaces') && featurei.entries[0].includes(feature.name)) {
                  choice.from.push({name: featurei.name, source: featurei.source});
                }
              });
              if (choice.from.length > 1) {
                choices.push(choice);
              }
            }
          });
        }

        // Generating other choices from choices.js map
        if (classLevelCount) {
          const classOptions = classOptionsMap[className.toLowerCase()];

          if (classOptions && classOptions.class && classOptions.class[classLevelCount]) {
            const classLevelOptions = [].concat(classOptions.class[classLevelCount]);
            
            for (const classLevelOption of classLevelOptions) {
              if (classLevelOption.options) {
                choices.push({
                  id: "classFeature",
                  name: classLevelOption.name,
                  from: classLevelOption.options,
                  count: classLevelOption.count > 1 ? classLevelOption.count : 1,
                  class: className.toLowerCase(),
                  feature: classLevelOption.name,
                  level: classLevelCount,
                  selections: getClassChoice(className.toLowerCase(), classLevelCount, classLevelOption.name)
                });
              } else if (classLevelOption.type) {
                const options = await filterModel("features", classLevelOption.type);
                let selections = getClassChoice(className.toLowerCase(), classLevelCount, classLevelOption.name);
                if (selections) {
                  if (Array.isArray(selections)) {
                    selections = selections.map(sel => options.find(opt => opt.name === sel.name && opt.source === sel.source));
                  } else {
                    selections = options.find(opt => opt.name === selections.name && opt.source === selections.source);
                  }
                }
                choices.push({
                  id: "classFeature",
                  hasSubFeature: true,
                  name: classLevelOption.name,
                  from: options,
                  count: classLevelOption.count > 1 ? classLevelOption.count : 1,
                  class: className.toLowerCase(),
                  feature: classLevelOption.name,
                  level: classLevelCount,
                  selections,
                  selectionsArray: Array.isArray(selections) ? selections : [selections]
                });
              }
            }
          }

          if (classOptions && classOptions.subclasses && subclasses[className] && classOptions.subclasses[subclasses[className].name] && classOptions.subclasses[subclasses[className].name][classLevelCount]) {
            const subclassLevelOptions = [].concat(classOptions.subclasses[subclasses[className].name][classLevelCount]);
            
            for (const subclassLevelOption of subclassLevelOptions) {
              if (subclassLevelOption.options) {
                choices.push({
                  id: "subclassFeature",
                  name: subclassLevelOption.name,
                  from: subclassLevelOption.options,
                  count: subclassLevelOption.count > 1 ? subclassLevelOption.count : undefined,
                  class: className.toLowerCase(),
                  subclass: subclasses[className],
                  feature: subclassLevelOption.name,
                  level: classLevelCount,
                  selections: getSubclassChoice(className.toLowerCase(), subclasses[className].name.toLowerCase(), classLevelCount, subclassLevelOption.name)
                });
              } else if (subclassLevelOption.type) {
                const options = await filterModel("features", subclassLevelOption.type);
                let selections = getSubclassChoice(className.toLowerCase(), subclasses[className].name.toLowerCase(), classLevelCount, subclassLevelOption.name);
                if (selections) {
                  if (Array.isArray(selections)) {
                    selections = selections.map(sel => options.find(opt => opt.name === sel.name && opt.source === sel.source));
                  } else {
                    selections = options.find(opt => opt.name === selections.name && opt.source === selections.source);
                  }
                }
                choices.push({
                  id: "subclassFeature",
                  hasSubFeature: true,
                  name: subclassLevelOption.name,
                  from: options,
                  count: subclassLevelOption.count > 1 ? subclassLevelOption.count : undefined,
                  class: className.toLowerCase(),
                  subclass: subclasses[className],
                  feature: subclassLevelOption.name,
                  level: classLevelCount,
                  selections: selections,
                  selectionsArray: Array.isArray(selections) ? selections : [selections]
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

  _genSubclassCallback(level, previousSubclass) {
    return (subclass) => {
      mergeSubclass(undefined, level.name, subclass, previousSubclass);
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

  _optionalFeatureAddCallback(classs, level, feature) {
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
      setOptionFeatureChoice(classs, level, feature, adjChoice);
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
      if (!changeVal) {
        element.classList.toggle('btn-field--open');
      } else if (changeVal <= max && changeVal > 0) {
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

  _hpDiceIconClass(index, hitDiceMaxes) {
    const dice = this._levelHitDice(index, hitDiceMaxes);
    return `fal fa-dice-d${dice || '6'}`;
  }

  _joinUnderscore(...items) {
    return items.join('_')
  }

  static get template() {
    return html`
      <style include="material-styles my-styles fa-styles">
        .something {
          display: block;
        }

        .class-grid {
          margin-bottom: 200px;
        }

        .heading-wrap {
          display: flex;
          justify-content: space-between;
          margin: 22px 14px 0;
          align-items: center;
          border-bottom: 1px solid var(--lumo-contrast-10pct);
          flex-wrap: wrap;
        }
        .heading {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
        .class-levels {
          font-size: 16px;
          padding-left: 8px;
          font-weight: normal;
          display: none;
        }

        h2 {
          margin-bottom: 24px;
          display: block;
          font-size: 1.5em;
          margin: 20px 0;
          font-weight: bold;
        }

        .not-edit-mode .button-wrap {
          display: none;
        }

        .button-wrap {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          padding: 10px;
          width: 100%;
        }
        .button-wrap > * {
          margin: 4px;
        }

        .row-wrap {
          padding: 4px 16px;
        }
        .row-wrap:not(:first-child) {
          border-top: 1px solid var(--mdc-theme-text-divider-on-background);
        }
        .row {
          position: relative;
          min-height: 80px;
          padding: 12px 0 12px;
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
        .open-details:hover .level-col {
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
          width: 100%;
          margin: 0;
          padding: 16px 0 8px;
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
          width: 100%;
          padding-left: 30px;
        }
        .choices-col__choice {
          margin-right: 16px;
          width: 100%;
        }
        .choices-col__choice dnd-select-add {
          min-width: 250px;
          width: calc(100% - 20px);
        }
        .choices-col__choice dnd-character-builder-suboptions {
          --suboptions__min-width: 250px;
          --suboptions__width: calc(100% - 20px);
        }

        @media(min-width: 420px) {
          .choices-col__choice dnd-select-add {
            width: calc(50% - 20px);
          }
          .choices-col__choice dnd-character-builder-suboptions {
            --suboptions__width: calc(50% - 20px);
          }
        }

        .choices-col__subclass-choice {
          display: block;
        }

        .delete-col {
          margin-right: 16px;
        }
        .delete-btn {
          height: 36px;
          font-size: 18px;
          padding: 0;
          background: none !important;
        }
        .delete-btn:before,
        .delete-btn:after {
          background: none !important;
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
          right: 0;
          top: 8px;
          overflow: hidden;
          display: flex;
        }
        .not-edit-mode .hp-col {
          right: 0px;
        }
        .hp-col .fal {
          font-size: 20px;
          position: relative;
          margin-right: 8px;
          top: 3px;
        }
        .hp-col__non-edit {
          display: block;
        }
        .hp-col .hp-col__non-edit .hp-roll-icon {
          left: 33px;
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
        .hp-col .hp-roll-icon {
          position: absolute;
          left: 18px;
          font-size: 11px;
          top: 1px;
        }
        .edit-mode .hp-roll-icon {
          left: 36px;
          top: 5px;
        }
        .btn-field--open .hp-roll-icon {
          left: 26px;
        }

        .details {
          font-size: 15px;
          width: calc(100% - 30px);
          margin: 0 auto 13px !important;
          background: var(--lumo-contrast-10pct);
          border-radius: 4px;
          white-space: pre-line;
          padding: 14px 14px 1px;
        }
        .details > .statsBlockHead:first-child > .stat-name {
          margin-top: 0;
        }

        @media(min-width: 921px) {
          .features-col {
            margin: 0 30px 0 12px;
            width: unset;
            font-size: 16px;
          }
          .class-grid {
            margin-bottom: 0;
          }
          .class-levels {
            display: inline;
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
          <h2>Levels <span class="class-levels">[[classLevel]]</span></h2> 
          <dnd-select-add model="class-all" placeholder="Add a Class"></dnd-select-add>

          <div class="button-wrap">
            <template is="dom-repeat" items="[[_objArray(classes)]]">
              <dnd-button icon="add" label="[[item.name]]" on-click="_addClassLevel"></dnd-button>
            </template>
          </div>
        </div>

        <div>
          <div class="no-content-message" hidden$="[[!noContentMessage]]">Enter edit mode to add class levels.</div>

          <div class="class-grid">
            <template is="dom-repeat" items=[[levels]]>
              <div class="row-wrap">
                <div class="row">
                  <div class="open-details" on-click="_expandDetails">
                    <div class="level-col">
                      <span class="level-col__level">[[_level(index)]]</span>
                      <span class="level-col__image-wrap" ><dnd-svg class="level-col__image" default-color id="[[_svgFromClass(item.name)]]"></dnd-svg></span>
                      <span class="level-col__class">[[item.name]]</span>
                    </div>

                    <div class="features-col">
                      <template is="dom-repeat" items="[[_getClassLevelFeatureStringArray(levels, index, classes, subclasses, classChoices)]]">
                        <span class="class-feature" subclass$="[[item.isSubclass]]">[[item.name]]</span>
                      </template>
                    </div>
                  </div>

                  <div class="choices-col">
                    <template is="dom-repeat" items="[[_atIndex(classChoices, index)]]" as="choice">
                      <div class="choices-col__choice">
                        <template is="dom-if" if="[[_equal(choice.id, 'classSubOptions')]]">
                          <dnd-character-builder-suboptions label="[[choice.class]]" storage-key="[[_joinUnderscore(choice.class, choice.level)]]" selected-item="[[choice.classSubOptions]]"></dnd-character-builder-suboptions>
                        </template>

                        <template is="dom-if" if="[[_equal(choice.id, 'subclassSubOptions')]]">
                          <dnd-character-builder-suboptions label="[[choice.class]]" storage-key="[[_joinUnderscore(choice.class, choice.level, choice.subclass)]]" selected-item="[[choice.subclassSubOptions]]"></dnd-character-builder-suboptions>
                        </template>
          
                        <template is="dom-if" if="[[_equal(choice.id, 'replacement')]]">
                          <dnd-select-add label="Optional Features" placeholder="<Choose Option>" disabled$="[[!isEditMode]]"
                            options="[[choice.from]]" value="[[choice.selection]]" add-callback="[[_optionalFeatureAddCallback(choice.class, choice.level, choice.feature)]]"></dnd-select-add>
                        </template>

                        <template is="dom-if" if="[[_equal(choice.id, 'subclass')]]">
                          <dnd-select-add class="choices-col__subclass-choice" label="Subclass" placeholder="<Choose Subclass>" disabled$="[[!isEditMode]]"
                            options="[[choice.from]]" value="[[choice.selections]]" add-callback="[[_genSubclassCallback(item, choice.selections)]]"></dnd-select-add>
                        </template>

                        <template is="dom-if" if="[[_equal(choice.id, 'asi')]]">
                          <dnd-character-builder-suboptions label="ASI" storage-key="[[_joinUnderscore(choice.class, choice.level, 'asi')]]" selected-item="[[choice.asiItem]]"></dnd-asi-select>
                        </template>

                        <template is="dom-if" if="[[_equal(choice.id, 'classFeature')]]">
                          <dnd-select-add choices="[[choice.count]]" label="[[choice.name]]" placeholder="<Choose Option>" disabled$="[[!isEditMode]]"
                            options="[[choice.from]]" choices="1" value="[[choice.selections]]" add-callback="[[_classFeatureOptionAddCallback(choice.class, choice.level, choice.feature)]]"></dnd-select-add>
                          <template is="dom-repeat" items="[[choice.selectionsArray]]" as="subfeature">
                            <dnd-character-builder-suboptions label="[[choice.class]]" storage-key="[[_joinUnderscore(choice.class, choice.level, 'feature', index)]]" selected-item="[[subfeature]]"></dnd-character-builder-suboptions>
                          </template>
                        </template>

                        <template is="dom-if" if="[[_equal(choice.id, 'subclassFeature')]]">
                          <dnd-select-add choices="[[choice.count]]" label="[[choice.name]]" placeholder="<Choose Option>" disabled$="[[!isEditMode]]"
                            options="[[choice.from]]" value="[[choice.selections]]" add-callback="[[_subclassFeatureOptionAddCallback(choice.class, choice.subclass, choice.level, choice.feature)]]"></dnd-select-add>
                          <template is="dom-repeat" items="[[choice.selectionsArray]]" as="subfeature">
                            <dnd-character-builder-suboptions label="[[choice.class]]" storage-key="[[_joinUnderscore(choice.class, choice.level, 'sub', 'feature', index)]]" selected-item="[[subfeature]]"></dnd-character-builder-suboptions>
                          </template>
                        </template>
                      </div>
                    </template>
                  </div>

                  <div class="hp-col">
                    <div class="delete-col">
                      <button class="delete-btn mdc-icon-button" on-click="_deleteLevel">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                    <div class="hp-col__non-edit">
                      <i class$="[[_hpDiceIconClass(index, hitDiceMaxes)]]"></i>
                      <span class="material-icons hp-roll-icon" aria-hidden="true">favorite</span>
                      [[_levelHp(item.name, index)]]
                    </div>
                    <div class="hp-col__edit btn-field" data-max$="[[_levelHitDice(index, hitDiceMaxes)]]" data-level$="[[index]]" data-class-name$="[[item.name]]">
                      <dnd-button background="none" class="btn-field__btn" on-click="_toggleHpField">
                        <span class="btn-field__btn-label" slot="label">
                          <i class$="[[_hpDiceIconClass(index, hitDiceMaxes)]]"></i>
                          <span class="material-icons hp-roll-icon" aria-hidden="true">favorite</span>
                          <span class="btn-field__btn-label-text">[[_levelHp(item.name, index)]]</span>
                        </span>
                      </dnd-button>
                      <vaadin-integer-field class="btn-field__input" min="1" max="[[_levelHitDice(index, hitDiceMaxes)]]" on-blur="_toggleHpField"></vaadin-integer-field>
                    </div>
                  </div>
                </div>
                <div class="details-wrap" inner-h-t-m-l="[[_renderDetails(expandedIndex, index)]]"></div>
              </div>
            </template>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("dnd-character-builder-class", DndCharacterBuilderClass);