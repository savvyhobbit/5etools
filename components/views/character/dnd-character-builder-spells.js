import { PolymerElement,html } from "@polymer/polymer";
import "@vaadin/vaadin-grid";
import "@vaadin/vaadin-grid/vaadin-grid-tree-toggle";
import { getCharacterChannel, getSelectedCharacter, getClassReferences, getClassLevelGroups, toggleSpellPrepared, saveCharacter, getAttributeModifier, isSpellPreparedFromObj, setSpellSlots, getSpellSlots, toggleCantripPrepared, getSubclassChoiceLevel, getSubclassChoice } from "../../../util/charBuilder";
import { filterModel, loadModel } from "../../../util/data";
import { dispatchEditModeChange, getEditModeChannel, isEditMode } from "../../../util/editMode";
import { spellHtml } from "../../../js/spells";
import { findInPath, util_capitalize, util_capitalizeAll, getProfBonus, throttle, debounce, cloneDeep } from "../../../js/utils";
import Parser from "../../../util/Parser";
import "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-text-field";
import "../../dnd-button";

class DndCharacterBuilderSpells extends PolymerElement {
  
  static get properties() {
    return {
      spellsKnown: {
        type: Object,
        value: {}
      },
      preparedSpells: {
        type: Object,
        value: {}
      },
      noContentMessage: {
        type: Boolean,
        value: false
      },
      isEditMode: {
        type: Boolean,
        value: false
      },
      filterStr: {
        type: String,
        value: '',
        observer: '_filterChange'
      },
      expandedItems: {
        type: Array
      },
    };
  }

  static get observers() {
    return [
      '_expandedItemsChange(expandedItems.*)'
    ]
  }

  _expandedItemsChange() {
    window.scrollTo(0, this.originalScrollHeight);
  }

  _recordScrollHeight() {
    // Fix reposition issue after tree expand/collapse toggle
    this.originalScrollHeight = window.scrollY;
  }

  __filterChangeThrottled() {
    if (this.filterStr.length) {
      if (!this.oldExpanded) {
        this.oldExpanded = this.$.grid.expandedItems;
      }
      this.expandAll();
      this.$.grid.clearCache();
      setTimeout(() => {
        this.expandAll();
      }, 10);
    } else {
      if (this.oldExpanded) {
        this.$.grid.expandedItems = this.oldExpanded;
        this.oldExpanded = undefined;
      }
      this.$.grid.clearCache();
    }
  }

  constructor() {
    super();

    this._filterChange = debounce(this.__filterChangeThrottled.bind(this), 250);
  }

  connectedCallback() {
    super.connectedCallback();

    this.characterChangeHandler = (e) => {
      let character = e.detail.character;
      this.updateFromCharacter(character);
    };
    this.refresh = true;
    this.updateFromCharacter(getSelectedCharacter());
    getCharacterChannel().addEventListener("character-selected",this.characterChangeHandler);

    this.editModeHandler = (e) => {
      this.isEditMode = e.detail.isEditMode;
      this.refresh = true;
      this.updateFromCharacter(getSelectedCharacter());
    }
    getEditModeChannel().addEventListener('editModeChange', this.editModeHandler);
    this.isEditMode = isEditMode();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    getCharacterChannel().removeEventListener("character-selected",this.characterChangeHandler);
    getEditModeChannel().removeEventListener('editModeChange', this.editModeHandler);
  }

  ready() {
    super.ready();

    this.multiclassSlotsDef = [
      [2],
      [3],
      [4,2],
      [4,3],
      [4,3,2],
      [4,3,3],
      [4,3,3,1],
      [4,3,3,2],
      [4,3,3,3,1],
      [4,3,3,3,2],
      [4,3,3,3,2,1],
      [4,3,3,3,2,1],
      [4,3,3,3,2,1,1],
      [4,3,3,3,2,1,1],
      [4,3,3,3,2,1,1,1],
      [4,3,3,3,2,1,1,1],
      [4,3,3,3,2,1,1,1,1],
      [4,3,3,3,3,1,1,1,1],
      [4,3,3,3,3,2,1,1,1],
      [4,3,3,3,3,2,2,1,1]
    ];

    this.fullCasterSlotsDef = [];

    this.halfCasterSlotsDef = [];
    
    this.thirdCasterSlotsDef = [];

    setTimeout(() => {
      const grid = this.$.grid;

      grid.dataProvider = ((params, callback) => {
        const startIndex = params.page * params.pageSize;
        let children = params.parentItem ? params.parentItem.children : this.spellDisplay;
        if (this.filterStr.length) {
          children = children.filter((child) => {
            return this.hasDecendentWithFilter(child, this.filterStr.toLowerCase()) 
          });
        }
        if (children && children.length) {
          const page = children.slice(startIndex, startIndex + params.pageSize);
          callback(page, children.length);
        }
      }).bind(this);
    }, 0);
  }

  hasDecendentWithFilter(node, filterStr) {
    if (!node.name || node.name.toLowerCase().indexOf(filterStr) > -1) {
      return true;
    }
    const children = node.length ? node : node.children;
    if (children && children.length) {
      for (let child of children) {
        return this.hasDecendentWithFilter(child, filterStr);
      }
    }
    return false;
  }

  clearFilterStr() {
    this.filterStr = '';
  }

  expandAll() {
    this.$.grid.expandedItems = this.findExpandables(this.spellDisplay);
  }

  findExpandables(node, array = []) {
    if (node.id === 'level' || node.id === 'class') {
      array.push(node);
    }
    const children = node.length ? node : node.children;
    if (children && children.length) {
      for (let child of children) {
        this.findExpandables(child, array);
      }
    }
    return array;
  }

  async updateSpellStats(classRefs, classLevels) {
    if (classLevels && classRefs) {
      // DCs and Spell Modifier
      const newSpellMods = [];
      const overallLevel = Object.entries(classLevels).reduce((total, [className, level]) => total + level, 0);
      const profBonus = getProfBonus(overallLevel);

      for (const [className, level] of Object.entries(classLevels)) {
        const classRef = classRefs[className];
        if (classRef.casterProgression) {
          const alreadyAdded = newSpellMods.find(spellMod => classRef.spellcastingAbility === spellMod.spellcastingAbility);
          if (alreadyAdded) {
            alreadyAdded.classes.push(className);
          } else {
            const attributeModifier = await getAttributeModifier(classRef.spellcastingAbility);
            const spellAttackBonus = attributeModifier + profBonus
            const dc = 8 + spellAttackBonus;
            newSpellMods.push({ classes: [className], mod: attributeModifier, spellAttackBonus, dc, spellcastingAbility: classRef.spellcastingAbility});
          }
        }
      }

      this.spellMods = newSpellMods;
    } else {
      this.spellMods = [];
    }
  }

  async updateFromCharacter(character) {
    if (character && this.refresh) {
      this.noContentMessage = true;
      const classRefs = await getClassReferences(character),
        classLevels = getClassLevelGroups(character),
        expandedItems = [],
        spellsKnownObj = {};
      let spellDisplay = [];

      this.updateSpellStats(classRefs, classLevels);

      for (const [ className, classLevel ] of Object.entries(classLevels)) {
        const classRef = classRefs[className];
        let casterSourceRef = classRef;
        let isSubclass = false;
        let tableGroups = classRef.classTableGroups;
        let casterName = className;

        // Checking the class first for a caster progression, then checking subclass
        if (!casterSourceRef.casterProgression) {
          const subclassLevel = getSubclassChoiceLevel(classRef);
          if (classLevel >= subclassLevel && character.subclasses && character.subclasses[className] && classRef.subclasses && classRef.subclasses.length) {
            const subclassDef = classRef.subclasses.find(i => character.subclasses[className].name === i.name);
            if (subclassDef && subclassDef.casterProgression) {
              // replacing caster parsing references with that from subclass 
              casterSourceRef = subclassDef;
              casterName = subclassDef.shortName;
              tableGroups = subclassDef.subclassTableGroups;
              isSubclass = true;
            }
          }
        }

        if (casterSourceRef.casterProgression) {
          this.noContentMessage = false;
          let spellsKnownOrPrepared;
          let spellsKnowPreparedType;
          const cantripsKnown = casterSourceRef.cantripProgression ? casterSourceRef.cantripProgression[classLevel - 1] : 0;
          let warlockSpellLevel;
          let warlockSpellSlots;

          // Use spell known progression
          if (casterSourceRef.spellsKnownProgression) {
            spellsKnowPreparedType = 'known';
            spellsKnownOrPrepared = casterSourceRef.spellsKnownProgression[classLevel - 1];
            if (casterSourceRef.casterProgression === 'pact') {
              warlockSpellLevel = [1,1,2,2,3,3,4,4,5,5,5,5,5,5,5,5,5,5,5,5][classLevel - 1];
              warlockSpellSlots = [1,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,4,4,4,4][classLevel - 1];
            }

          // otherwise compute spells prepared
          } else if (casterSourceRef.preparedSpells) {
            spellsKnowPreparedType = 'prepared';
            // todo, check 1/3 caster progression
            const levelMultiplier = casterSourceRef.casterProgression === 'full' ? 1 : 0.51;
            const attributeModifier = await getAttributeModifier(casterSourceRef.spellcastingAbility);
            spellsKnownOrPrepared = Math.floor(classLevel * levelMultiplier) + attributeModifier;
            spellsKnownOrPrepared = spellsKnownOrPrepared < 1 ? 1 : spellsKnownOrPrepared;

          } else {
            console.error('!!! neither prepared or known spells', casterSourceRef);
          }

          /* SPELL LISTS */
          // Getting class spell list
          let classSpellList = [];
          let subclassName;
          
          if (isSubclass) {
            subclassName = casterSourceRef.shortName;
          } else {
            // Revised Ranger fix
            let searchSource = casterSourceRef.name.indexOf('(Revised)') > -1 ? 'PHB' : casterSourceRef.source;
            let searchName = casterSourceRef.name.indexOf('(Revised)') > -1 ? casterSourceRef.name.replaceAll('(Revised)', '').trim() : casterSourceRef.name;
            classSpellList = await filterModel('spells', { key: 'classes.fromClassList', value: { name: searchName, source: searchSource } } );

            const subclassLevel = getSubclassChoiceLevel(classRef);
            if (classLevel >= subclassLevel) {
              subclassName = character.subclasses && character.subclasses[className] ? character.subclasses[className].shortName : '';
            }
          }

          // Getting subclass spell list (always prepared)
          if (subclassName) {
            if (subclassName === 'Eldritch Knight') {
              classSpellList = await filterModel('spells', { key: 'classes.fromClassList', value: { name: 'wizard', source: 'phb' } } );
            }
            if (subclassName === 'Divine Soul') {
              let divineSoulSpellList = await filterModel('spells', { key: 'classes.fromClassList', value: { name: 'cleric', source: 'phb' } } );
              classSpellList = [...new Set(classSpellList.concat(divineSoulSpellList))];
            }
          }

          // Getting spell slots per level array
          const spellTable = tableGroups.find((tableGroup) => tableGroup.title === "Spell Slots");
          let spellSlotEntries;
          if (spellTable) {
            spellSlotEntries = spellTable.rowsSpellProgression[classLevel - 1].filter((spellSlots) => spellSlots !== 0);
          } else {
            // If no spell slots per level, then we're a warlock, get spell entries for
            // warlocks with zero spell slots at each level (pact slots will be added later)
            spellSlotEntries = [];
            for (let i = 0; i < warlockSpellLevel; i++) {
              spellSlotEntries.push(0);
            }
          }

          // Adding cantrips entry
          const hasCantrips = cantripsKnown ? 0 : 1;
          if (cantripsKnown) {
            spellSlotEntries = [0].concat(spellSlotEntries);
          }

          // Clearing prepared spells to filter out those that can no longer be prepared
          let oldSpellsPrepared = cloneDeep(character.preparedSpells);
          let oldCantripsPrepared = cloneDeep(character.preparedCantrips);
          character.preparedSpells[casterName] = {};
          character.preparedCantrips[casterName] = {};
          

          // Generating hierarchical structure of classes > levels > spells > spellDef
          const spellSlots = spellSlotEntries.map((spellSlots, index) => {
            if (spellSlots !== -1) {
              let spellList = classSpellList
                .filter((spell) => {
                  return spell.level === index + hasCantrips;
                })
                .sort((a, b) => {
                  if (a.name < b.name) { return -1; }
                  if (a.name > b.name) { return 1; }
                  return 0;
                })
                .map(spell => {
                  const isCantrip = index + hasCantrips === 0;
                  const isPrepared = isCantrip ? isSpellPreparedFromObj(casterName, spell, oldCantripsPrepared) : isSpellPreparedFromObj(casterName, spell, oldSpellsPrepared);
                  if (isPrepared) {
                    if (isCantrip) {
                      character.preparedCantrips[casterName][spell.name] = {name: spell.name, source: spell.source};
                    } else {
                      character.preparedSpells[casterName][spell.name] = {name: spell.name, source: spell.source};
                    }
                  }
                  if (this.isEditMode || isPrepared || spell.isAlwaysPrepared) {
                    return {
                      id: 'spell',
                      name: spell.name, 
                      children: [{...spell, hasChildren: false, id: 'spelldef', parentClass: casterName, parentLevel: index + hasCantrips} ],
                      hasChildren: true,
                      parentClass: casterName,
                      parentLevel: index + hasCantrips,
                      isCantrip,
                      isAlwaysPrepared: spell.isAlwaysPrepared,
                      isWarlock: !!warlockSpellLevel
                    };
                  } else {
                    return undefined;
                  }
                })
                .filter((spell) => spell !== undefined);

              const levelObj = {
                id: 'level',
                level: index + hasCantrips,
                spellSlots,
                currentSlots: getSpellSlots(index + hasCantrips),
                children: spellList,
                hasChildren: spellList.length > 0,
                parentClass: casterName,
                isWarlock: !!warlockSpellLevel
              };
              const isExpanded = this.$.grid.expandedItems.some(item => item.id === 'level' && item.level === levelObj.level && item.parentClass === levelObj.parentClass);
              if (isExpanded) {
                expandedItems.push(levelObj);
              }
              return levelObj;
            } else {
              return null
            }
          }).filter(slots => slots !== null);

          spellsKnownObj[casterName] = {
            current: character.preparedSpells && character.preparedSpells[casterName] ? Object.keys(character.preparedSpells[casterName]) : [],
            max: spellsKnownOrPrepared,
            type: spellsKnowPreparedType,
            maxCantrips: cantripsKnown,
            currentCantrips: character.preparedCantrips && character.preparedCantrips[casterName] ? Object.keys(character.preparedCantrips[casterName]) : []
          };

          if (spellSlots.length) {
            const classObj = {
              id: 'class',
              className: casterName,
              level: classLevel,
              hasCantrips,
              children: spellSlots,
              spellsKnown: spellsKnownOrPrepared,
              hasChildren: spellSlots.length > 0,
              spellPrepType: spellsKnowPreparedType,
              multiclassingLevels: isSubclass ? 0 : Math.floor((classRef.casterProgression === 'full' ? 1 : 0.5) * classLevel),
              isWarlock: !!warlockSpellLevel,
              warlockSpellLevel,
              warlockSpellSlots
            };
            expandedItems.push(classObj);
            spellDisplay.push(classObj);
          }
        }
      } // end level loop

      // Parsing additionalSpells
      const additionalSpellChoices = Object.values(character.choices).filter((c) => !!c.additionalSpells);
      const spellsModel = await loadModel('spells');
      const addtlSpellsObj = {};
      additionalSpellChoices.forEach(spellChoice => {
        const allAddtlSpells = spellChoice.additionalSpells.defaultSpells.concat(spellChoice.additionalSpells.selectedSpells);

        allAddtlSpells.forEach((spellChoiceEntry) => {
          const spellsForThisEntry = spellChoiceEntry.spells ? spellChoiceEntry.spells : [spellChoiceEntry];

          spellsForThisEntry.forEach((addtlSpell) => {
            const spellDef = spellsModel.find(s => s.name.toLowerCase() === addtlSpell.name.toLowerCase() && s.source.toLowerCase() === addtlSpell.source.toLowerCase());
            
            if (spellDef) {
              const spellLevel = spellDef.level;
              const spellClass = spellChoice.label && (addtlSpell.type === 'expanded' || addtlSpell.type === 'prepared') && Object.keys(classLevels).find((c) => c.toLowerCase() === spellChoice.label.toLowerCase()) ? spellChoice.label : 'Other';

              if (!addtlSpellsObj[spellClass]) {
                addtlSpellsObj[spellClass] = {};
              }
              if (!addtlSpellsObj[spellClass][spellLevel]) {
                addtlSpellsObj[spellClass][spellLevel] = [];
              }
  
              addtlSpellsObj[spellClass][spellLevel].push({...addtlSpell, ...spellChoiceEntry, label: spellChoice.label, spellDef});
            }
          })
        });
      });
      console.error('addtlSpellsObj', addtlSpellsObj);

      // Adding additional spells
      Object.entries(addtlSpellsObj).forEach(([addtlSpellsClass, addtlSpellsClassVal]) => {

        if (addtlSpellsClass !== 'Other') {
          const spellDisplayForClass = spellDisplay.find((sdClass) => sdClass.className.toLowerCase() === addtlSpellsClass);

          if (spellDisplayForClass) {
            Object.entries(addtlSpellsClassVal).forEach(([addtlSpellsClassLevel, addtlSpellsClassLevelVal]) => {
              let spellDisplayForClassLevel = spellDisplayForClass.children[addtlSpellsClassLevel] ? spellDisplayForClass.children[addtlSpellsClassLevel] : null;
              // while (!spellDisplayForClassLevel) {
              //   spellDisplayForClass.children.push({
              //     id: 'level',
              //     level: spellDisplayForClass.children.length,
              //     hasChildren: false,
              //     spellSlots: 0,
              //     currentSlots: 0,
              //     children: [],
              //     parentClass: addtlSpellsClass
              //   });
              //   spellDisplayForClassLevel = spellDisplayForClass.children[addtlSpellsClassLevel] ? spellDisplayForClass.children[addtlSpellsClassLevel] : null;
              // }

              if (spellDisplayForClassLevel) {
                addtlSpellsClassLevelVal.forEach(addtlSpell => {
                  const spellAlreadyAdded = spellDisplayForClassLevel.children.find((s) => s.children[0].name === addtlSpell.spellDef.name && s.children[0].source === addtlSpell.spellDef.source);

                  if (spellAlreadyAdded) {
                    spellAlreadyAdded.isAlwaysPrepared = true;
                    spellAlreadyAdded.spellSlots = addtlSpell.uses;
                    spellAlreadyAdded.spellUseType = addtlSpell.type;
                    spellAlreadyAdded.currentSlots = character.spellSlots && character.spellSlots[addtlSpell.spellDef.name] ? character.spellSlots[addtlSpell.spellDef.name] : 0

                  } else {
                    spellDisplayForClassLevel.children.push({
                      id: 'spell',
                      name: addtlSpell.spellDef.name,
                      children: [{...addtlSpell.spellDef, hasChildren: false, id: 'spelldef', parentClass: addtlSpellsClass, parentLevel: addtlSpellsClassLevel, uses: addtlSpell.uses} ],
                      hasChildren: true,
                      parentClass: addtlSpellsClass,
                      parentLevel: addtlSpellsClassLevel,
                      isCantrip: addtlSpellsClassLevel === 0,
                      isAlwaysPrepared: true,
                      isWarlock: addtlSpellsClass === 'warlock',
                      spellUseType: addtlSpell.type,
                      spellSlots: addtlSpell.uses,
                      currentSlots: character.spellSlots && character.spellSlots[addtlSpell.spellDef.name] ? character.spellSlots[addtlSpell.spellDef.name] : 0
                    })
                    spellDisplayForClassLevel.hasChildren = true;
                  }
                })
              }
            });
          } else {
            console.error('Additional spell for class that doesnt have regular spells');
          }

        // Other additional Spells
        } else {
          const otherSpells = [{
            id: 'level',
            level: 'At Will',
            spellSlots: 0,
            currentSlots: 0,
            children: [],
            hasChildren: true,
            parentClass: 'Other'
          }, {
            id: 'level',
            level: 'Innate',
            spellSlots: 0,
            currentSlots: 0,
            children: [],
            hasChildren: true,
            parentClass: 'Other'
          }] 
          Object.entries(addtlSpellsObj.Other).forEach(([otherSpellLevel, otherSpellList]) => {
            otherSpellList.forEach((otherSpell) => {
              const destList = otherSpell.type === 'will' || otherSpell.spellDef.level === 0 ? otherSpells[0].children : otherSpells[1].children;
              destList.push({
                id: 'spell',
                name: otherSpell.spellDef.name,
                children: [{...otherSpell.spellDef, hasChildren: false, id: 'spelldef', parentClass: "Other", parentLevel: "Other"} ],
                hasChildren: true,
                parentClass: "Other",
                parentLevel: "Other",
                isCantrip: false,
                isAlwaysPrepared: true,
                isWarlock: false,
                spellUseType: otherSpell.type,
                spellSlots: otherSpell.uses,
                currentSlots: character.spellSlots && character.spellSlots[otherSpell.spellDef.name] ? character.spellSlots[otherSpell.spellDef.name] : 0
              })
            });
          });
  
          const otherSpellsObj = {
            id: 'class',
            className: 'Other',
            level: 0,
            hasCantrips: false,
            children: otherSpells,
            spellsKnown: 0,
            hasChildren: otherSpells > 0,
            spellPrepType: 'always',
            multiclassingLevels: 0,
            isWarlock: false,
            warlockSpellLevel: 0,
            warlockSpellSlots: 0
          };
          spellDisplay.push(otherSpellsObj);
          expandedItems.push(otherSpellsObj);
        }
      });

      // sorting most levels first
      spellDisplay.sort((a, b) => {
        if (a.className === 'Other') {
          return -1
        }
        return b.children.length - a.children.length
      });

      // Changing structure for non-edit mode & multiclassing
      if (!this.isEditMode) {
        let newSpellDisplay = [];
        if (spellDisplay.length) {
          let multiclassLevel = 0,
            isMulticlass = -1,
            warlockSpellLevel,
            warlockSpellSlots,
            otherClass;

          // Combine all class spell levels into single references
          for (let spellClass of spellDisplay) {
            if (!spellClass.isWarlock) {
              multiclassLevel += spellClass.multiclassingLevels;
              isMulticlass ++;
            } else {
              warlockSpellLevel = spellClass.warlockSpellLevel;
              warlockSpellSlots = spellClass.warlockSpellSlots;
              isMulticlass ++;
            }

            if (spellClass.className !== 'Other') {
              spellClass.children.forEach((spellLevel, index) => {
                const adjIndex = index + spellClass.hasCantrips;
                if (!newSpellDisplay[adjIndex]) {
                  newSpellDisplay[adjIndex] = spellLevel;
                } else {
                  newSpellDisplay[adjIndex].children = newSpellDisplay[adjIndex].children.concat(spellLevel.children);
                  newSpellDisplay[adjIndex].hasChildren = !!newSpellDisplay[adjIndex].children.length;
                }
              });
            } else {
              otherClass = spellClass;
            }
          }

          // remove index 0 if no cantrips
          newSpellDisplay = newSpellDisplay.filter(i => i !== undefined);

          // Changing spell slots for multiclass rules
          const hasCantrips = newSpellDisplay[0].level === 0;
          if (isMulticlass > 0) {
            const multiclassSlotsArray = this.multiclassSlotsDef[multiclassLevel + 1];

            for (let i = (hasCantrips ? 1 : 0); i < multiclassSlotsArray.length; i++) {
              const spellSlots =  multiclassSlotsArray[i - (hasCantrips ? 1 : 0)];
              if (newSpellDisplay[i]) {
                newSpellDisplay[i].spellSlots = spellSlots;
              } else {
                newSpellDisplay.push({
                  children: [],
                  currentSlots: getSpellSlots(i + 1 - (hasCantrips ? 1 : 0)),
                  hasChildren: false,
                  id: "level",
                  isWarlock: false,
                  level: i,
                  spellSlots
                });
              }
            }
          }

          // Adding warlock slots
          if (warlockSpellLevel) {
            newSpellDisplay[warlockSpellLevel - (hasCantrips ? 0 : 1)].warlockSpellSlots = warlockSpellSlots;
            newSpellDisplay[warlockSpellLevel - (hasCantrips ? 0 : 1)].currentWarlockSlots = character.warlockSpellSlots || 0;

          }

          if (otherClass) {
            newSpellDisplay = otherClass.children.concat(newSpellDisplay);
          }
        }
        spellDisplay = newSpellDisplay;
      }

      this.refresh = false;
      saveCharacter(character);
      this.spellsKnown = spellsKnownObj;
      this.spellDisplay = spellDisplay;
      this.expandedItems = expandedItems;
      this.dispatchEvent(new CustomEvent("loadingChange", { bubbles: true, composed: true }));
      this.$.grid.clearCache();
    }
  }

  _renderSpell(spell) {
    return spellHtml(spell);
  }

  _toggleSpellPrepared(e) {
    e.preventDefault();
    e.stopPropagation();
    const isAlwaysPrepared = e.model.item.isAlwaysPrepared;
    if (!isAlwaysPrepared && this.isEditMode) {
      const isCantrip = e.model.item.isCantrip;
      if (isCantrip) {
        this._toggleCantripPrepared(e);
      } else {
        const className = e.model.item.parentClass;
        const spell = e.model.item.children[0];
        const isPrepared = this._isPreparedSpell(this.spellsKnown, className, spell.name);
        const currentPreparedCount = this._currentSpellsKnownCount(className, this.spellsKnown);
        const maxPreparedCount = this._maxSpellsKnownCount(className, this.spellsKnown);

        if ((isPrepared || currentPreparedCount < maxPreparedCount) && spell.id === 'spelldef') {
          let spellsKnownCopy = JSON.parse(JSON.stringify(this.spellsKnown));
          if (isPrepared) {
            const index = spellsKnownCopy[className].current.indexOf(spell.name);
            spellsKnownCopy[className].current.splice(index, 1);
          } else {
            spellsKnownCopy[className].current.push(spell.name);
          }
          this.spellsKnown = spellsKnownCopy;
          toggleSpellPrepared(className, spell);
        } else if (currentPreparedCount >= maxPreparedCount) {
          this._flashPreparedButton(findInPath('button', e));
        }
      }
    }
  }

  _toggleCantripPrepared(e) {
    e.preventDefault();
    e.stopPropagation();
    const className = e.model.item.parentClass;
    const spell = e.model.item.children[0];
    const isPrepared = this._isPreparedCantrip(this.spellsKnown, className, spell.name);
    const currentPreparedCount = this._currentCantripsKnownCount(className, this.spellsKnown);
    const maxPreparedCount = this._maxCantripsKnownCount(className, this.spellsKnown);

    if ((isPrepared || currentPreparedCount < maxPreparedCount) && spell.id === 'spelldef') {
      let spellsKnownCopy = JSON.parse(JSON.stringify(this.spellsKnown));
      if (isPrepared) {
        const index = spellsKnownCopy[className].currentCantrips.indexOf(spell.name);
        spellsKnownCopy[className].currentCantrips.splice(index, 1);
      } else {
        spellsKnownCopy[className].currentCantrips.push(spell.name);
      }
      this.spellsKnown = spellsKnownCopy;
      toggleCantripPrepared(className, spell);
    } else if (currentPreparedCount >= maxPreparedCount) {
      this._flashPreparedButton(findInPath('button', e));
    }
  }

  _flashPreparedButton(buttonEl) {
    if (buttonEl) {
      buttonEl.classList.add('transition-bg');
      buttonEl.classList.add('flash-error');
      setTimeout(() => {
        buttonEl.classList.remove('flash-error');
        setTimeout(() => {
          buttonEl.classList.remove('transition-bg');
        }, 200);
      }, 200);
    }
  }

  _toggleSpellSlot(e) {
    e.preventDefault();
    e.stopPropagation();
    const isInput = findInPath('.checkbox-wrap', e);
    const isWarlock = !!findInPath('[warlock-spell]', e);
    const currentSlots = isWarlock ? e.model.item.currentWarlockSlots : e.model.item.currentSlots;
    const maxSlots = isWarlock ? e.model.item.warlockSpellSlots : e.model.item.spellSlots;
    const level = e.model.item.level || e.model.item.name;

    if (isInput) {
      const isChecked = isInput.children[0].checked;
      if (!isChecked && currentSlots < maxSlots) {
        if (isWarlock) {
          e.model.item.currentWarlockSlots = currentSlots + 1
        } else {
          e.model.item.currentSlots = currentSlots + 1;
        }
  
      } else if (currentSlots > 0) {
        if (isWarlock) {
          e.model.item.currentWarlockSlots = currentSlots - 1;
        } else {
          e.model.item.currentSlots = currentSlots - 1;
        }
      }
    } else {
      if (currentSlots < maxSlots) {
        if (isWarlock) {
          e.model.item.currentWarlockSlots = currentSlots + 1;
        } else {
          e.model.item.currentSlots = currentSlots + 1;
        }

      } else if (currentSlots > 0) {
        if (isWarlock) {
          e.model.item.currentWarlockSlots = currentSlots - 1;
        } else {
          e.model.item.currentSlots = currentSlots - 1;
        }
      }
    }
    
    if (isWarlock) {
      this._setSpellSlotsChecked(e.model.item.currentWarlockSlots, findInPath('.slot-checkboxes', e));
      setSpellSlots(level, e.model.item.currentWarlockSlots, undefined, true);
    } else {
      this._setSpellSlotsChecked(e.model.item.currentSlots, findInPath('.slot-checkboxes', e));
      setSpellSlots(level, e.model.item.currentSlots);
    }
  }

  _setSpellSlotsChecked(count, el) {
    const checkboxes = el.querySelectorAll('vaadin-checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
      if (i < count) {
        checkboxes[i].checked = true;
      } else {
        checkboxes[i].checked = false
      }
    }
  }

  _isPreparedClass(spellsKnown, item, isEditMode) {
    const className = item.parentClass;
    const spellName = item.name;
    const isCantrip = item.isCantrip;
    const isAlwaysPrepared = item.isAlwaysPrepared;
    if (isAlwaysPrepared) {
      return isEditMode ? 'spell-button always-prepared edit-mode' : 'spell-button always-prepared';
    }
    let isPrepared = isCantrip ? this._isPreparedCantrip(spellsKnown, className, spellName) : this._isPreparedSpell(spellsKnown, className, spellName, isAlwaysPrepared);
    if (isPrepared) {
      return isEditMode ? 'spell-prepared spell-button edit-mode' : 'spell-prepared spell-button';
    }
    return isEditMode ? 'spell-button edit-mode' : 'spell-button';
  }

  _isPreparedSpell(spellsKnown, className, spellName, isAlwaysPrepared){
    return isAlwaysPrepared || spellsKnown[className] && spellsKnown[className].current && spellsKnown[className].current.length && spellsKnown[className].current.indexOf(spellName) > -1;
  }

  _isPreparedCantrip(spellsKnown, className, spellName){
    return spellsKnown[className] && spellsKnown[className].currentCantrips && spellsKnown[className].currentCantrips.length && spellsKnown[className].currentCantrips.indexOf(spellName) > -1;
  }

  _isPreparedText(spellsKnown, item) {
    const className = item.parentClass;
    const spellName = item.name;
    const isCantrip = item.isCantrip;
    const isAlwaysPrepared = item.isAlwaysPrepared;
    const prepareType = spellsKnown[className] ? spellsKnown[className].type : undefined;
    if (isAlwaysPrepared) {
      return prepareType === 'known' ? 'Always' : 'Always';
    }
    let isPrepared = isCantrip ? this._isPreparedCantrip(spellsKnown, className, spellName) : this._isPreparedSpell(spellsKnown, className, spellName, isAlwaysPrepared);
    
    if (isPrepared) {
      return prepareType === 'known' ? 'Learned' : 'Prepared';
    } else {
      return prepareType === 'known' ? 'Learn' : 'Prepare';
    }
  }

  _countToArray(count) {
    const data = [];
    for (var i = 0; i < count; i++) {
      data.push(null);
    }
    return data;
  }

  _toLevel(level) {
    if (level === 'At Will' || level === 'Innate') {
      return level;
    } else if (level === 0) {
      return Parser.spLevelToFull(level) + 's';
    } else {
      return Parser.spLevelToFull(level) + ' Level';
    }
  }
  
  _currentSpellsKnownCount(className, spellsKnown) {
    if (spellsKnown && className && spellsKnown[className] && spellsKnown[className].current) {
      return spellsKnown[className].current.length;
    }
    return 0;
  }

  _maxSpellsKnownCount(className, spellsKnown) {
    if (spellsKnown && className && spellsKnown[className]) {
      return spellsKnown[className].max;
    }
    return 0;
  }
  
  _currentCantripsKnownCount(className, spellsKnown) {
    if (spellsKnown && className && spellsKnown[className] && spellsKnown[className].current) {
      return spellsKnown[className].currentCantrips.length;
    }
    return 0;
  }

  _maxCantripsKnownCount(className, spellsKnown) {
    if (spellsKnown && className && spellsKnown[className]) {
      return spellsKnown[className].maxCantrips;
    }
    return 0;
  }

  _toggleTooltip(e) {
    const tooltipStr = e.target.dataset.tooltip;
    const hasTooltip = Array.from(e.target.children).find((childEl) => childEl.matches('.tooltip'));

    if (!window.tooltipCloseListener) {
      window.tooltipCloseListener = true;
      window.tooltips = [];
      document.addEventListener('click', () => {
        window.tooltips.forEach((tooltip) => {
          tooltip.classList.remove('tooltip--open');
          setTimeout(() => {
            tooltip.remove();
          }, 300);
        });
        window.tooltips = [];
      });
    }

    if (hasTooltip) {
      hasTooltip.classList.remove('tooltip--open');
      setTimeout(() => {
        hasTooltip.remove();
      }, 300);
    } else if (tooltipStr) {
      const tooltipEl = document.createElement('div');
      tooltipEl.innerHTML = tooltipStr;
      tooltipEl.classList.add('tooltip');
      e.target.appendChild(tooltipEl);
      setTimeout(() => {
        tooltipEl.classList.add('tooltip--open');
        window.tooltips.push(tooltipEl);
      }, 0);
    }
  }

  _toggleEditMode() {
    dispatchEditModeChange(!this.isEditMode);
  }

  _spellsKnownString(spellPrepType) {
    return 'Spells ' + util_capitalize(spellPrepType) + ':'
  }

  _isRitualSpell(spellParent) {
    const spell = spellParent.children[0];
    return spell && spell.meta && spell.meta.ritual;
  }

  _isConcentrationSpell(spellParent) {
    const spell = spellParent.children[0];
    return spell.duration.some((d) => d.concentration);
  }

  _isBonusActionSpell(spellParent) {
    const spell = spellParent.children[0];
    return spell.time.some((t) => t.unit === 'bonus');
  }

  _getSpellSchool(spellParent) {
    const spell = spellParent.children[0];
    return Parser.SP_SCHOOL_ABV_TO_FULL[spell.school];
  }

  _hidePrepareSpellsButton(isEditMode, spellsKnown) {
    return isEditMode || !Object.values(spellsKnown).some((clas) => clas.current.length < clas.max - 1 || clas.currentCantrips.length < clas.maxCantrips - 1);
  }

  _hidePreparedCountLabel(className, spellsKnown) {
    return this._currentSpellsKnownCount(className, spellsKnown) === 0
  }

  _spellLevel(item) {
    if (item && item.children && item.children.length && item.children[0].level) {
      return Parser.spLevelToFull(item.children[0].level);
    }
  }

  _isSpellSlotChecked(currentSlots, index) {
    return index < currentSlots;
  }

  _spellClassText(parentClass) {
    return parentClass;//util_capitalizeAll(parentClass);
  }

  _isEmpty(a) {
    return !a || !a.length;
  }

  _hideCheckboxes(spellSlots, isEditMode, type) {
    return !spellSlots || spellSlots > 0 && this.isEditMode || type === 'known' || type === 'will'
  }

  _hideAtWill(type) {
    return type !== 'will';
  }
  
  _hideSlotsLabel(isEditMode, level, className) {
    return !isEditMode || level === 0 || level === 'At Will' || level === 'Innate'|| className === 'Warlock';
  }

  _innateUsageString(spellUseType) {
    if (spellUseType === 'daily') {
      return '<span>Long Rest</span>'
    } else if (spellUseType === 'rest') {
      return '<span>Short Rest</span>'
    } else if (spellUseType) {
      return '<span>' + util_capitalizeAll(spellUseType) + '</span>'
    }
  }
  
  _wrapClassString(isEditMode) {
    return isEditMode ? 'edit-mode' : 'not-edit-mode';
  }

  _equal(a, b) {
    return a === b;
  }

  _hasTwo(a) {
    return a && a.length && a.length > 1;
  }

  _join(a) {
    return a.join(', ');
  }

  _abs(num) {
    return num >= 0 ? `+${num}`: num;
  }

  static get template() {
    return html`
      <style include='my-styles'>
        :host {}
        :host {
          display: block;
          padding-top: 16px;
        }
        [hidden] {
          display: none !important;
        }

        .heading {
          width: calc(100% - 32px);
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--lumo-contrast-10pct);
          margin: 0 16px;
        }

        h2 {
          display: block;
          font-size: 1.5em;
          margin: 20px 0 20px 0;
          font-weight: bold;
        }

        vaadin-grid {
          margin-bottom: 200px;
        }

        vaadin-grid-tree-toggle { 
          width: 100%;
          cursor: pointer;
        }

        .class-wrap {
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          align-items: center;
          padding-top: 4px;
          /* padding-top: 34px;
          padding-bottom: 8px; */
          -youbkit-touch-callout: none;
          -youbkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          left: -16px;
          border-bottom: 3px solid var(--_lumo-grid-secondary-border-color);;
          padding: 24px 16px 8px;
          position: relative;
        }
        .class-wrap h3 {
          font-size: 22px;
          font-weight: bold;
        }

        .spells-prepared-text {
          margin-right: 6px;
          margin-left: auto;
        }
        .prepared-count {
          color: var(--mdc-theme-primary);
          font-weight: bold;
        }
        .prepared-count[edit-mode] {
          color: var(--mdc-theme-secondary);
        }
        .cantrips-prepared {
          margin-right: 0;
        }

        .level-outer-wrap {
          border-bottom: 1px solid var(--_lumo-grid-secondary-border-color);
          padding-bottom: 8px;
          display: flex;
          height: 32px;
        }

        .level-wrap {
          width: 100%;
          -youbkit-touch-callout: none;
          -youbkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .level-wrap .label {
          padding-left: 6px;
          font-size: 12px;
          color: var(--lumo-tint-70pct);
        }

        .slot-checkboxes {
          cursor: pointer;
          display: flex;
          padding: 4px;
        }

        .slot-checkboxes span {
          -youbkit-touch-callout: none;
          -youbkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          display: flex;
          align-items: center;
        }

        .slot-checkboxes .label {
          padding-left: 8px;
        }
        .slot-checkboxes .label span {
          font-size: 12px;
          display: inline-block;
          white-space: pre-wrap;
          text-align: center;
        }

        vaadin-checkbox {
          pointer-events: none;
        }

        .spell-outer-wrap {
          display: flex;
        }

        .spell-wrap {
          width: 100%;
          margin-left: 24px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .spell-inner-wrap {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          -youbkit-touch-callout: none;
          -youbkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .spell-level {
          color: var(--mdc-theme-text-disabled-on-background);
          margin-left: 8px;
          margin-right: 4px;
          font-size: 12px;
        }

        .ind {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          color: var(--mdc-theme-on-secondary);
          background-color: var(--mdc-theme-secondary);
          font-size: 12px;
          position: relative;
          bottom: 2px;
          margin-left: 0;
          padding: 0px 4px;
          font-weight: 500;
        }

        .rit-ind::before {
          content: 'R';
        }
        .conc-ind::before {
          content: 'C';
        }
        .bonus-ind::before {
          content: 'BA';
        }
        .school-ind {
          font-size: 10px;
          height: 16px;
          bottom: 3px;
        }

        .spell-inner-wrap[not-edit-mode] .ind {
          background-color: var(--mdc-theme-primary);
        }

        .spell-def-wrap {
          font-size: 14px;
          width: calc(100% - 20px);
          margin: 0 auto;
          background: var(--lumo-contrast-10pct);
          border-radius: 4px;
          white-space: pre-line;
        }

        .spell-def-wrap .margin-bottom_med {
          margin-bottom: 0px !important;
        }

        .spell-def-wrap .text {
          margin-top: 16px;
        }

        .spell-def-wrap p {
          margin-bottom: 16px;
        }

        .stats-wrapper {
          margin: -18px 14px 0;
        }

        .spell-button {
          background-color: var(--mdc-theme-text-disabled-on-background);
          color: var(--mdc-theme-on-secondary);
          border: none;
          border-radius: 4px;
          outline: none;
          width: 80px;
          display: inline-block;
          justify-content: center;
          white-space: normal;
          font-size: 12px;
          padding: 4px 4px;
          margin-left: 8px;
        }
        .class-icon {
          border: none;
          border-radius: 4px;
          outline: none;
          width: 60px;
          display: inline-block;
          justify-content: center;
          white-space: normal;
          font-size: 12px;
          padding: 4px 4px;
          width: 20px;
        }
        .class-icon[hide] {
          display: none;
        }
        .spell-button.edit-mode {
          cursor: pointer;
        }
        .spell-button.always-prepared {
          background-color: var(--mdc-theme-secondary-lighter);
          cursor: not-allowed;
        }
        .spell-button.spell-prepared {
          background-color: var(--mdc-theme-secondary);
        }
        .spell-button.flash-error {
          background-color: var(--mdc-theme-error);
          transition: background-color 0.2s ease-out;
        }
        .spell-button.transition-bg {
          transition: background-color 0.2s ease-in;
        }

        .mods {
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-around;
          margin: 16px 0;
        }
        .mod-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 12px;
          text-align: center;
          margin: 0 4px;
          width: 130px;
        }
        .mod-val-wrap {
          font-size: 16px;
        }
        .mod-val:not(:first-child)::before {
          content: '|';
          margin-right: 4px;
          color: var(--lumo-contrast-30pct);
        }
        .mod-label {
          font-weight: bold;
          color: var(--mdc-theme-primary);
          font-size: 15px;
        }
        .edit-mode .mod-label {
          font-weight: bold;
          color: var(--mdc-theme-secondary);
        }
        @media(min-width: 420px) {
          .mods {
            justify-content: center;
          }
          .mod-row {
            font-size: 14px;
          }
          .mod-val-wrap {
            font-size: 18px;
          }
        }

        @media(min-width: 921px) {
          .mods {
            justify-content: flex-start;
          }
        }

        .filter {
          margin-left: 16px;

        }

        .tooltip {
          position: absolute;
          background: lightgray;
          color: black;
          padding: 2px 10px;
          border-radius: 4px;
          white-space: nowrap;
          left: 8px;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-top-left-radius: 0px;
        }
        .tooltip--open {
          opacity: 1;
        }
        .tooltip::after {
          content: '';
          height: 0;
          width: 0;
          position: absolute;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 5px solid lightgray;
          top: -5px;
          left: 0px;
        }
        [data-tooltip] {
          position: relative;
        }

        .no-content-message {
          font-size: 14px;
          padding: 20px;
          font-style: italic;
        }
      </style>

      <div class$="[[_wrapClassString(isEditMode)]]" hidden$="[[noContentMessage]]">
        <div class="heading">
          <h2>Spells</h2>
          <dnd-button class="prepare-spells-button link" hidden$="[[_hidePrepareSpellsButton(isEditMode, spellsKnown)]]" edit-mode$="[[isEditMode]]" not-edit-mode$="[[!isEditMode]]" label="Prepare Your Spells!" icon="edit" on-click="_toggleEditMode"></dnd-button>
        </div>

        <!-- Spell Mods -->
        <div class="mods" >
          <div class="mod-row">
            <span class="mod-val-wrap">
              <template is="dom-repeat" items="[[spellMods]]">
                <span class="mod-val" data-tooltip$="[[_join(item.classes)]]" on-mouseover="_toggleTooltip" on-mouseout="_toggleTooltip">[[_abs(item.mod)]]</span>
              </template>
            </span>
            <span class="mod-label">Modifier</span>
          </div>
          <div class="mod-row">
            <span class="mod-val-wrap">
              <template is="dom-repeat" items="[[spellMods]]">
                <span class="mod-val" data-tooltip$="[[_join(item.classes)]]" on-mouseover="_toggleTooltip" on-mouseout="_toggleTooltip">+[[item.spellAttackBonus]]</span>
              </template>
            </span>
            <span class="mod-label">Attack +</span>
          </div>
          <div class="mod-row">
            <span class="mod-val-wrap">
              <template is="dom-repeat" items="[[spellMods]]">
                <span class="mod-val" data-tooltip$="[[_join(item.classes)]]" on-mouseover="_toggleTooltip" on-mouseout="_toggleTooltip">[[item.dc]]</span>
              </template>
            </span>
            <span class="mod-label">DC</span>
          </div>
        </div>

        <div class="filter">
          <vaadin-text-field clear-button-visible value="{{filterStr}}" placeholder='Filter'></vaadin-text-field>
        </div>
      </div>

      <div class="no-content-message" hidden$="[[!noContentMessage]]">Enter edit mode to add classes and levels.</div>

      <vaadin-grid id="grid" theme="no-border no-row-borders" expanded-items="{{expandedItems}}" height-by-rows hidden$="[[noContentMessage]]">
        <vaadin-grid-column flex-grow="1">
          <template>
              <template is="dom-if" if="[[_equal(item.id, 'class')]]">
                <div class="class-wrap">
                  <h3>[[item.className]]</h3>
                  <div class='spells-prepared-text' hidden$="[[_hidePreparedCountLabel(item.className, spellsKnown)]]">
                    <span>[[_spellsKnownString(item.spellPrepType)]]</span>
                    <span class='prepared-count' edit-mode$=[[isEditMode]]>[[_currentSpellsKnownCount(item.className, spellsKnown)]] / [[_maxSpellsKnownCount(item.className, spellsKnown)]]</span>
                  </div>
                </div>
              </template>
  
              <template is="dom-if" if="[[_equal(item.id, 'level')]]">
                <div class="level-outer-wrap">
                  <vaadin-grid-tree-toggle leaf="[[!item.hasChildren]]" expanded="{{expanded}}" on-click='_recordScrollHeight'>
                    <h4 class="level-wrap">[[_toLevel(item.level)]]<span hidden$="[[_hideSlotsLabel(isEditMode, item.level, item.parentClass)]]" class="label">([[item.spellSlots]] Slots)</span></h4>
                    <div class="cantrips-prepared spells-prepared-text" hidden$="[[!_equal(item.level, 0)]]">
                      <span>Cantrips Known:</span>
                      <span class='prepared-count' edit-mode$=[[isEditMode]]>[[_currentCantripsKnownCount(item.parentClass, spellsKnown)]] / [[_maxCantripsKnownCount(item.parentClass, spellsKnown)]]</span>
                    </div>
                  </vaadin-grid-tree-toggle>

                  <div class="slot-checkboxes" hidden$="[[_hideCheckboxes(item.warlockSpellSlots, isEditMode)]]" on-click="_toggleSpellSlot" warlock-spell>
                    <template is='dom-repeat' items='[[_countToArray(item.warlockSpellSlots)]]' as="thing">
                      <span class="checkbox-wrap"><vaadin-checkbox checked="[[_isSpellSlotChecked(item.currentWarlockSlots, index)]]"></vaadin-checkbox></span>
                    </template>
                    <span class="label">Pact</span>
                  </div>

                  <div class="slot-checkboxes" hidden$="[[_hideCheckboxes(item.spellSlots, isEditMode)]]" on-click="_toggleSpellSlot">
                    <template is='dom-repeat' items='[[_countToArray(item.spellSlots)]]' as="thing">
                      <span class="checkbox-wrap"><vaadin-checkbox checked="[[_isSpellSlotChecked(item.currentSlots, index)]]"></vaadin-checkbox></span>
                    </template>
                    <span class="label">Slots</span>
                  </div>
                </div>
              </template>

              <template is="dom-if" if="[[_equal(item.id, 'spell')]]">
                <div class="spell-outer-wrap">
                  <vaadin-grid-tree-toggle leaf="[[!item.hasChildren]]" expanded="{{expanded}}" class="spell-wrap" on-click='_recordScrollHeight'>
                    <div class="spell-inner-wrap" not-edit-mode$="[[!isEditMode]]">
                      [[item.name]]
                      <span class="spell-level" hidden>[[_spellLevel(item)]]</span>
                      <span class="ind rit-ind" title="Ritual" hidden$="[[!_isRitualSpell(item)]]"></span>
                      <span class="ind conc-ind" title="Concentration" hidden$="[[!_isConcentrationSpell(item)]]"></span>
                      <span class="ind bonus-ind" title="Bonus Action" hidden$="[[!_isBonusActionSpell(item)]]"></span>
                      <span class="ind school-ind" title="[[_getSpellSchool(item)]]">[[_getSpellSchool(item)]]</span>
                    </div>
                  </vaadin-grid-tree-toggle>

                  <div class="slot-checkboxes" hidden$="[[_hideCheckboxes(item.spellSlots, isEditMode, item.spellUseType)]]" on-click="_toggleSpellSlot">
                    <template is='dom-repeat' items='[[_countToArray(item.spellSlots)]]' as="thing">
                      <span class="checkbox-wrap"><vaadin-checkbox checked="[[_isSpellSlotChecked(item.currentSlots, index)]]"></vaadin-checkbox></span>
                    </template>
                    <span class="label" inner-h-t-m-l="[[_innateUsageString(item.spellUseType)]]"></span>
                  </div>

                  <span hidden$="[[_hideAtWill(item.spellUseType)]]">At Will</span>
        
                  <button class$="[[_isPreparedClass(spellsKnown, item, isEditMode)]]" hidden$="[[!isEditMode]]" on-click="_toggleSpellPrepared">[[_isPreparedText(spellsKnown, item)]]</button>
                  <dnd-svg class="class-icon" hidden$="[[isEditMode]]" id='[[_spellClassText(item.parentClass)]]' default-color></dnd-svg>
                </div>
              </template>

              <template is="dom-if" if="[[_equal(item.id, 'spelldef')]]">
                <div class="spell-def-wrap">
                  <div class= "stats-wrapper" inner-h-t-m-l="[[_renderSpell(item)]]"></div>
                </div>
              </template>
          </template>
        </vaadin-grid-column>
      </vaadin-grid>
    `;
  }
}

customElements.define("dnd-character-builder-spells",DndCharacterBuilderSpells);
