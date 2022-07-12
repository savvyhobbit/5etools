import { readRouteView, readRouteSelection } from "./routing";
import { loadModel } from "./data";
import { resolveHash } from './renderTable.js';
import { entryTextSearch, util_capitalize, getProfBonus, entrySearch, util_capitalizeAll, cloneDeep } from "../js/utils";
import Parser from "./Parser";

import droll from "../lib/droll";
import { emitRoll } from "./roll";
import EntryRenderer from "./entryrender";

const renderer = new EntryRenderer();
let schema = {
  name: '',
  attr: {
    str: 10,
    dex: 10,
    con: 10,
    int: 10,
    wis: 10,
    cha: 10
  },
  race: {
  },
  background: {
  },
  levels: [],
  subclasses: {},
  classSkillProficiencies: [],
  backgroundSkillProficiencies: [],
  raceAttributes: [],
  asi: [],
  featAttributeSelections: {},
  preparedSpells: {},
  preparedCantrips: {},
  hp: {},
  items: [],
  choices: {}
}

const channel = document.createElement('div');
let selectedCharacter;
let characters;

function getSelectedCharacter() {
  return selectedCharacter;
}

function getCharacterChannel() {
  return channel;
}

function initSelectedCharacter() {
  if (selectedCharacter === undefined) {
    let characters = getCharacters();
    if (characters && characters.length) {
      let defaultCharIndex;
      for (let i = 0; i < characters.length; i ++) {
        if (characters[i].isDefault) {
          defaultCharIndex = i;
          break;
        }
      }
      if (defaultCharIndex !== undefined) {
        selectCharacterFromIndex(defaultCharIndex);
      } else {
        selectCharacterFromIndex(0);
      }
    } else {
      // If no characters yet, add an empty one
      addCharacter();
    }
  } else {
    emitChangeEvent();
  }
}

function emitChangeEvent(character = selectedCharacter, characters = getCharacters()) {
  if (character === undefined && characters.length > 0) {
    selectedCharacter = characters[0];
    character = selectedCharacter;
  }
  channel.dispatchEvent(new CustomEvent("character-selected", {
    bubbles: true,
    composed: true,
    detail: {
      character,
      characters
    }
  }));
}

function getCharacters() {
  return characters || JSON.parse(window.localStorage.getItem("characters")) || [];
}

function saveCharacters(characters) {
  window.localStorage.setItem("characters", JSON.stringify(characters));
  characters = characters;
  emitChangeEvent(selectedCharacter, characters);
}

function saveCharacter(character) {
  let characterIndex = findCharacterIndex(character),
    characters = getCharacters();

  characters[characterIndex] = character;
  saveCharacters(characters);
}

function addCharacter(name, charObject) {
  let characters = getCharacters(),
    newChar = charObject ? charObject : newCharacter(name);

  characters.push(newChar);
  saveCharacters(characters);
  selectCharacter(newChar);
}

function removeSelectedCharacter() {
  let index = findCharacterIndex(selectedCharacter),
    characters = getCharacters();
  characters.splice(index, 1);
  saveCharacters(characters);
  selectCharacterFromIndex(0);
}

function newCharacter(name = "New Character") {
  let newCharacter = JSON.parse(JSON.stringify(schema));
  newCharacter.name = name;
  newCharacter.isDefault = true;
  newCharacter.id = Date.now();
  return newCharacter;
}

function uploadCharacter(uploadedChar) {
  uploadedChar.id = Date.now();
  uploadedChar.isDefault = true;
  addCharacter(uploadedChar.name, uploadedChar);
}

function findCharacterIndex(char) {
  let characters = getCharacters(),
    foundChar = characters.find(c => c.id === char.id),
    charIndex = characters.indexOf(foundChar);

  return charIndex;
}

function selectCharacter(char) {
  if (char) {
    selectedCharacter = char;
    makeDefault(selectedCharacter);
  }
}

function selectCharacterFromIndex(index) {
  let characters = getCharacters();

  if (characters[index]) {
    selectedCharacter = characters[index];
    console.log('selected character', selectedCharacter);
    makeDefault(selectedCharacter);
  } else {
    selectedCharacter = undefined;
    initSelectedCharacter();
    console.error("Selected character index not found");
  }
}

function makeDefault(char) {
  let characters = getCharacters();
  for (let character of characters) {
    if (character.id === char.id) {
      character.isDefault = true
    } else {
      character.isDefault = false;
    }
  }
  saveCharacters(characters);
}

function addFeature(type, feature, character = selectedCharacter) {
  if (feature && character) {
    mergeFeature(character, feature, type);
  }
}

async function addFeatureById(type = readRouteView(), id = readRouteSelection(), character = selectedCharacter) {
  if (character && id) {
    let truncId = id;
    if (truncId.indexOf(',') > -1) {
      truncId = truncId.substring(0, truncId.indexOf(','));
    }

    let data = await loadModel(type),
      selectedItem = resolveHash(data, truncId);

    if (selectedItem) {
      mergeFeature(character, selectedItem, type);
    } else {
      console.error("Cannont find feature to add");
    }
  }
}

function mergeFeature(character = selectedCharacter, selectedItem, type) {
  if (type === "classes" || type === "class-all") {
    mergeClass(character, selectedItem);

  } else if (type==="items") { 
    addItem(selectedItem, true, character);
    return;

  } else {
    if (type === "backgrounds" && character.choices && character.choices.background) {
      character.choices.background = {};
    }
    if (type === "races" && character.choices && character.choices.race) {
      character.choices.race = {};
    }
    // backgrounds, feats, and races, currently just have to remove the 's'
    let featureKey = transformTypeToFeatureKey(type);

    if (character[featureKey] === undefined) {
      character[featureKey] = {};
    }
    character[featureKey].name = selectedItem.name;
    character[featureKey].source = selectedItem.source;
    character[featureKey].id = selectedItem.name + '_' + selectedItem.source;
    character[featureKey].choices = findChoices(selectedItem);

    if (type === "backgrounds") {
      setItemsFromBackground(character);
    }
  }
  saveCharacter(character);
}

function transformTypeToFeatureKey(type) {
  return type.substring(0, type.length - 1);
}

function mergeClass(character, selectedItem) {
  if (character.levels === undefined) {
    character.levels = [];
  }
  if (character.levels.length === 0) {
    character.classSkillProficiencies = [];
  }
  if (character.levels.length < 20) {
    character.levels.push({
      name: selectedItem.name,
      id: selectedItem.name + '_' + selectedItem.source
    });
  }
  updateLevelHP(character, selectedItem);
  if (character.levels.length === 1) {
    setItemsFromClass(character);
  }
}

function mergeSubclass(character = selectedCharacter, className, subclass) {
  if (character) {
    if (!character.subclasses) {
      character.subclasses = {}
    }
    character.subclasses[className] = {
      name: subclass.name,
      shortName: subclass.shortName,
      source: subclass.source
    };
    saveCharacter(character);
  }
}

function addClassLevel(classLevel, character = selectedCharacter) {
  mergeClass(character, classLevel);
  saveCharacter(character);
}

function setClassLevels(levels, character = selectedCharacter) {
  character.levels = levels;
  saveCharacter(character);
}

function updateAttr(attr, character = selectedCharacter) {
  character.attr = attr;
  saveCharacter(character);
}

function updateName(name, character = selectedCharacter) {
  character.name = name;
  saveCharacter(character);
}

function findChoices(feature) {
  // todo search for 'choice' entries and build option object;
  return {};
}

function getClassLevelGroups(character = selectedCharacter) {
  let classLevels = {};
  if (character && character.levels) {
    classLevels = selectedCharacter.levels.reduce((obj, level) => {
      if (level.name) {
        if (!obj.hasOwnProperty(level.name)) {
          obj[level.name] = 1;
        } else {
          obj[level.name] ++;
        }
      }
      return obj;
    }, {});
  }
  return classLevels;
}

function getClassString(selectedCharacter) {
  if (selectedCharacter) {
    if (selectedCharacter.levels) {
      // Group all levels by class
      let classLevels = getClassLevelGroups(selectedCharacter);

      let resultStr = "",
        joinStr = " / ";

      for (const [classStr, level] of Object.entries(classLevels)) {
        resultStr += `${classStr} ${level}${joinStr}`
      }
      // Trim the last joinString from the end
      resultStr = resultStr.substring(0, resultStr.length - joinStr.length);
      return resultStr || "<No Class>";
    }
  } else {
    return "<No Class>";
  }
}

function getFeatureString(featureId, selectedCharacter, short = false) {
  if (featureId && selectedCharacter) {
    let featureName = "",
      featureVal = "";

    switch(featureId) {
      case "feats":
        featureName = "Feat";
        featureVal = selectedCharacter.feat ? selectedCharacter.feat.name : "None";
        break;
      case "classes":
        return "";
      case "backgrounds":
        featureName = "Background";
        featureVal = selectedCharacter.background ? selectedCharacter.background.name : "None";
        break;
      case "races":
        featureName = "Race";
        featureVal = selectedCharacter.race ? selectedCharacter.race.name : "None";
        break;
      default:
        return "";
    }
    if (!featureVal) {
      return `<No ${featureName}>`;
    }
    if (short) {
      return featureVal;
    }
    return featureName + ": " + featureVal;
  }
}

async function getClassReferences(char = selectedCharacter, levelIndex) {
  let classReferences = {};

  if (char.levels && char.levels.length) {
    let classData = await loadModel("class-all");

    if (levelIndex === undefined) {
      classReferences = char.levels.reduce((obj, level) => {
        if (level.name) {
          if (!obj.hasOwnProperty(level.name)) {
            obj[level.name] = resolveHash(classData, level.id);
          }
        }
        return obj;
      }, {});
    } else if (char.levels.length > levelIndex) {
      classReferences = resolveHash(classData, char.levels[levelIndex].id);
    }
  }
  return classReferences;
}

async function getTypeReference(type, char = selectedCharacter) {
  let feature = transformTypeToFeatureKey(type);

  if (char && char[feature] && char[feature].name) {
    let data = await loadModel(type);
    if (char[feature].source) {
      return resolveHash(data, `${char[feature].name}_${char[feature].source}`);
    } else {
      return resolveHash(data, char[feature].name);
    }
  }
}

async function getBackgroundReference(char = selectedCharacter) {
  return await getTypeReference("backgrounds", char);
}

async function getRaceReference(char = selectedCharacter) {
  return await getTypeReference("races", char);
}

async function getFeatReference(featId) {
  let featsData = await loadModel("feats");
  return resolveHash(featsData, featId);
}

async function getSpellReference(spellId) {
  let spellsData = await loadModel("spells");
  return resolveHash(spellsData, spellId);
}

async function getClassSaves(char = selectedCharacter) {
  if (char.levels && char.levels.length) {
    let classReferences = await getClassReferences(char),
      firstClassName = char.levels[0].name;

    if (firstClassName && classReferences[firstClassName] && classReferences[firstClassName].proficiency) {
      return classReferences[firstClassName].proficiency;
    }
  }
  return [];
}

function getSubclassChoiceLevel(classDef) {
  let subclassTitle = classDef.subclassTitle,
    subclassChoiceLevel;

  if (subclassTitle) {
    for (let i = 0; i < classDef.classFeatures.length; i++) {
      let levelFeatures = classDef.classFeatures[i];

      for (let feature of levelFeatures) {
        if (feature.name.toLowerCase() === subclassTitle.toLowerCase()) {
          subclassChoiceLevel = i + 1;
          break;
        }
      }
      if (subclassChoiceLevel !== undefined) {
        break;
      }
    }
    return subclassChoiceLevel;
  }
}

async function getClassSkillProfOptions(character = selectedCharacter) {
  let firstClass = await getClassReferences(character, 0)
  
  if (firstClass && firstClass.startingProficiencies) {
    return firstClass.startingProficiencies.skills[0].choose;
  }
}

async function getBackgroundSkillProfOptions(character = selectedCharacter) {
  let background = await getBackgroundReference(character);
  
  if (background && background.skillProficiencies) {
    return background.skillProficiencies[0];
  }
}

async function getRaceAttributeOptions(character = selectedCharacter) {
  let race = await getRaceReference(character);

  if (race && race.ability) {
    return race.ability[0];
  }
}

async function getBackgroundSkillProfDefaults(backgroundSkills) {
  let backgroundSkillz = backgroundSkills || await getBackgroundSkillProfOptions();
  if (backgroundSkillz) {
    return Object.entries(backgroundSkillz).filter(e => {return e[0] !== 'choose'}).map(e => {return e[0]});
  } else {
    return [];
  }
}

async function getRaceAttributeDefaults(raceAttr) {
  let raceAttrs = raceAttr || await getRaceAttributeOptions();
  if (raceAttrs) {
    return Object.entries(raceAttrs).filter(e => {return e[0] !== 'choose'});
  } else {
    return [];
  }
}

function setClassSkillProficiencies(skills, character = selectedCharacter) {
  if (character) {
    character.classSkillProficiencies = skills;
    saveCharacter(character);
  }
}

function setBackgroundSkillProficiencies(skills, character = selectedCharacter) {
  if (character) {
    character.backgroundSkillProficiencies = skills;
    saveCharacter(character);
  }
}

function setRaceAttributes(attr, character = selectedCharacter) {
  if (character) {
    character.raceAttributes = attr;
    saveCharacter(character);
  }
}

async function getASIForLevel(level, character = selectedCharacter) {
  const asiArray = character.asi,
    classData = await loadModel("class-all");
  let asiIndex = -1

  for (let i = 0; i <= level && i < character.levels.length; i ++) {
    const curLevel = character.levels[i],
      classLevelData = resolveHash(classData, curLevel.id);

    for (let feature of classLevelData.classFeatures[i]) {
      if (feature.name === "Ability Score Improvement") {
        asiIndex ++;
        break;
      }
    }
  }
  if (asiIndex === -1) {
    console.error("ASI not found at level");
    return { asi: undefined, index: undefined };
  }
  if (asiArray && asiArray.length > asiIndex) {
    return { asi: asiArray[asiIndex], index: asiIndex };
  }
  return { asi: undefined, index: asiIndex };
}

// function setASI(asiObj, index, character = selectedCharacter) {
//   if (!character.choices) {
//     character.choices = {};
//   }

//   character.choices[`asi_${index}`] = asiObj;

//   saveCharacter(character);
// }

function setASI(asiObj, index, character = selectedCharacter) {
  if (!character.asi) {
    character.asi = [];
  } 
  
  if (character.asi.length > index) {
    character.asi[index] = asiObj;
  } else {
    let currentLength = character.asi.length
    for (let i = currentLength; i <= index - 1; i++) {
      character.asi.push({
        ability1: '',
        ability2: '',
        feat: { name: '', source: '' },
        isFeat: false
      });
    }
    character.asi.push(asiObj);
  }

  saveCharacter(character);
}

async function getASIAndFeatAttributeData(character = selectedCharacter) {
  const asiLevels = [];
  if (character && character.levels && character.levels.length) {
    if (!character.featAttributeSelections) {
      character.featAttributeSelections = {}
    }
    let currentASIIndex = 0;
    for (let i = 0; i < character.levels.length; i++) {
      let classLevelData = await getClassReferences(character, i);

      for (let feature of classLevelData.classFeatures[i]) {
        if (feature.name === "Ability Score Improvement") {
          let asiForLevel = character.asi[currentASIIndex];
          if (asiForLevel) {
            if (asiForLevel.isFeat && asiForLevel.feat) {
              let featId = asiForLevel.feat.name + "_" + asiForLevel.feat.source,
                featReference = await getFeatReference(featId);

              if (featReference && featReference.ability && featReference.ability.length) {
                let asiLevel = {
                  levelIndex: i,
                  asiIndex: currentASIIndex,
                  featName: featReference.name,
                  featId,
                  featAttribute: featReference.ability[0],
                  featSelections: character.featAttributeSelections[featId] || ''
                }
                asiLevels.push(asiLevel);
              }
            } else {
              let asiAttributes = {};
              if (asiForLevel.ability1) {
                asiAttributes[asiForLevel.ability1] = 1;
              }
              if (asiForLevel.ability2) {
                if (asiAttributes[asiForLevel.ability2]) {
                  asiAttributes[asiForLevel.ability2] ++
                } else {
                  asiAttributes[asiForLevel.ability2] = 1;
                }
              }
              let asiLevel = {
                levelIndex: i,
                asiIndex: currentASIIndex,
                asiAttributes
              }
              asiLevels.push(asiLevel);
            }
          }
          currentASIIndex ++;
          break;
        }
      }
    }
  }
  return asiLevels;
}

function setFeatAttributeSelection(featId, selection, character = selectedCharacter) {
  if (!character.featAttributeSelections) {
    character.featAttributeSelections = {}
  }
  character.featAttributeSelections[featId] = selection;
  saveCharacter(character);
}

async function toggleCustomSkill(skill, character = selectedCharacter) {
  if (character) {
    const allSkills = await getSkillProfs(undefined, selectedCharacter);
    if (character.customSkills) {
      if (allSkills.filter(currentSkill => currentSkill === skill).length < 2) {
        character.customSkills.push(skill)
      } else {
        character.customSkills = character.customSkills.join('$%').replaceAll(skill, '').split('$%').filter((i) => !!i);
      }
    } else {
      character.customSkills = [skill];
    }
    saveCharacter(character);
  }
}

function getAllChoices(character = selectedCharacter) {
  const choices = [],
    choiceVisited = Object.values(cloneDeep(character.choices || {}));

  while (choiceVisited.length > 0) {
    const curChoice = choiceVisited.pop();
    if (curChoice) {
      choices.push(curChoice);
      if (curChoice.suboptions) {
        choiceVisited.push(curChoice.suboptions);
      }
    }
  }

  return choices;
}

function getChoiceSkillProfs(character = selectedCharacter) {
  const choices = getAllChoices(character);
  let skillProfs = [];
  for (const choice of choices) {
    if (choice.selectedSkillProfs) {
      skillProfs = skillProfs.concat(choice.selectedSkillProfs.split(','))
    }
    if (choice.defaultSkillProfs) {
      skillProfs = skillProfs.concat(choice.defaultSkillProfs.split(','));
    }
  }
  return skillProfs.map(skill => skill.toLowerCase().trim());
}

function getChoiceAttributes(character = selectedCharacter) {
  const choices = getAllChoices(character);
  let attributeAdj = {
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0
  };

  for (const choice of choices) {
    let attributes = [];
    if (choice.selectedAttributes) {
      attributes = attributes.concat(choice.selectedAttributes.toLowerCase().split(','))
    }
    if (choice.defaultAttributes) {
      attributes = attributes.concat(choice.defaultAttributes.toLowerCase().split(','));
    }
    for (const attribute of attributes) {
      const attrSplit = attribute.split(' ');
      let mod = choice.attributeMod || 1;
      if (attrSplit.length > 1) {
        try {
          mod = parseInt(attrSplit[1]);
        } catch {}
        attributeAdj[attrSplit[0]] += mod;
      } else {
        attributeAdj[attribute] += mod;
      }
    }
  }
  return attributeAdj;
}


async function getSkillProfs(attr, character = selectedCharacter) {
  let classSkills = character.classSkillProficiencies || [],
    choiceSkills = getChoiceSkillProfs(character),
    customSkills = character.customSkills || [],
    allSkills = classSkills.concat(choiceSkills).concat(customSkills);
  
  if (attr) {
    let skillsForAttr = [];
    switch(attr) {
      case 'str':
        if (allSkills.includes('athletics')) {
          skillsForAttr.push('athletics');
        }
        break;
      case 'dex':
        if (allSkills.includes('acrobatics')) {
          skillsForAttr.push('acrobatics');
        }
        if (allSkills.includes('sleight of hand')) {
          skillsForAttr.push('sleight of hand');
        }
        if (allSkills.includes('stealth')) {
          skillsForAttr.push('stealth');
        }
        break;
      case 'int':
        if (allSkills.includes('arcana')) {
          skillsForAttr.push('arcana');
        }
        if (allSkills.includes('history')) {
          skillsForAttr.push('history');
        }
        if (allSkills.includes('investigation')) {
          skillsForAttr.push('investigation');
        }
        if (allSkills.includes('nature')) {
          skillsForAttr.push('nature');
        }
        if (allSkills.includes('religion')) {
          skillsForAttr.push('religion');
        }
        break;
      case 'wis':
        if (allSkills.includes('animal handling')) {
          skillsForAttr.push('animal handling');
        }
        if (allSkills.includes('insight')) {
          skillsForAttr.push('insight');
        }
        if (allSkills.includes('medicine')) {
          skillsForAttr.push('medicine');
        }
        if (allSkills.includes('perception')) {
          skillsForAttr.push('perception');
        }
        if (allSkills.includes('survival')) {
          skillsForAttr.push('survival');
        }
        break;
      case 'cha':
        if (allSkills.includes('deception')) {
          skillsForAttr.push('deception');
        }
        if (allSkills.includes('intimidation')) {
          skillsForAttr.push('intimidation');
        }
        if (allSkills.includes('performance')) {
          skillsForAttr.push('performance');
        }
        if (allSkills.includes('persuasion')) {
          skillsForAttr.push('persuasion');
        }
        break
    }
    return skillsForAttr;
  } else {
    return allSkills;
  }
}

function getClassChoice(classs, level, feature, character = selectedCharacter) {
  if (character 
      && character.classChoices 
      && character.classChoices[classs]
      && character.classChoices[classs].class
      && character.classChoices[classs].class[level]
      && character.classChoices[classs].class[level][feature]) {
    return character.classChoices[classs].class[level][feature];
  }
}

function setClassChoice(classs, level, feature, choice, character = selectedCharacter) {
  if (character) {
    if (!character.classChoices) {
      character.classChoices = {};
    }
    if (!character.classChoices[classs]) {
      character.classChoices[classs] = { class: {}, subclass: {} };
    }
    if (!character.classChoices[classs].class[level]) {
      character.classChoices[classs].class[level] = {};
    }
    character.classChoices[classs].class[level][feature] = choice;
    saveCharacter(character);
  }
}

function getSubclassChoice(classs, subclass, level, feature, character = selectedCharacter) {
  if (character 
      && character.classChoices 
      && character.classChoices[classs]
      && character.classChoices[classs].subclass
      && character.classChoices[classs].subclass[subclass]
      && character.classChoices[classs].subclass[subclass][level]
      && character.classChoices[classs].subclass[subclass][level][feature]) {
    return character.classChoices[classs].subclass[subclass][level][feature];
  }
}

function setSubclassChoice(classs, subclass, level, feature, choice, character = selectedCharacter) {
  if (character) {
    if (!character.classChoices) {
      character.classChoices = {};
    }
    if (!character.classChoices[classs]) {
      character.classChoices[classs] = { class: {}, subclass: {} };
    }
    if (!character.classChoices[classs].subclass[subclass]) {
      character.classChoices[classs].subclass[subclass] = {};
    }
    if (!character.classChoices[classs].subclass[subclass][level]) {
      character.classChoices[classs].subclass[subclass][level] = {};
    }
    character.classChoices[classs].subclass[subclass][level][feature] = choice;
    saveCharacter(character);
  }
}

function toggleSpellPrepared(parentClass, spell, character = selectedCharacter) {
  if (character) {
    if (!character.preparedSpells) {
      character.preparedSpells = {};
    }
    if (!character.preparedSpells[parentClass]) {
      character.preparedSpells[parentClass] = {};
    }

    if (isSpellPrepared(parentClass, spell, character)) {
      delete character.preparedSpells[parentClass][spell.name];
      saveCharacter(character);
      return false;
    } else {
      character.preparedSpells[parentClass][spell.name] = {name: spell.name, source: spell.source};
      saveCharacter(character);
      return true;
    }
  }
  return false;
}

function toggleCantripPrepared(parentClass, spell, character = selectedCharacter) {
  if (character) {
    if (!character.preparedCantrips) {
      character.preparedCantrips = {};
    }
    if (!character.preparedCantrips[parentClass]) {
      character.preparedCantrips[parentClass] = {};
    }

    if (isCantripPrepared(parentClass, spell, character)) {
      delete character.preparedCantrips[parentClass][spell.name];
      saveCharacter(character);
      return false;
    } else {
      character.preparedCantrips[parentClass][spell.name] = {name: spell.name, source: spell.source};
      saveCharacter(character);
      return true;
    }
  }
  return false;
}

function isSpellPrepared(parentClass, spell, character = selectedCharacter) {
  if (character) {
    if (!character.preparedSpells) {
      character.preparedSpells = {};
    }
    return isSpellPreparedFromObj(parentClass, spell, character.preparedSpells);
  }
  return false;
}

function isSpellPreparedFromObj(parentClass, spell, obj) {
  if (obj) {
    if (!obj[parentClass]) {
      obj[parentClass] = {}
    }
    return !!(obj[parentClass][spell.name]);
  }
  return false;
}

function isCantripPrepared(parentClass, spell, character = selectedCharacter) {
  if (character) {
    if (!character.preparedCantrips) {
      character.preparedCantrips = {};
    }
    return isSpellPreparedFromObj(parentClass, spell, character.preparedCantrips);
  }
  return false;
}

async function getAttributeScoreModifiers(character = selectedCharacter) {
  // Attributes from Race
  let attributeAdj = getChoiceAttributes(character);

  let asiData = await getASIAndFeatAttributeData();
  for (let asi of asiData) {
    if (asi.featSelections) {
      attributeAdj[asi.featSelections.toLowerCase()] += 1;
    }
    if (asi.featAttribute) {
      Object.entries(asi.featAttribute).filter(e => { return e[0] !== 'choose'}).forEach(e => {
        let attribute = e[0].toLowerCase(),
        mod = e[1];
        attributeAdj[attribute] += mod;
      });
    }
    if (asi.asiAttributes) {
      Object.entries(asi.asiAttributes).forEach(e => {
        let attribute = e[0].toLowerCase(),
        mod = e[1];
        attributeAdj[attribute] += mod;
      });
    }
  }
  return attributeAdj;
}

async function getAttributeModifier(attribute, character = selectedCharacter) {
  const attributeModifiers = await getAttributeScoreModifiers();
  const attributeScore = parseInt(character.attr[attribute]) + attributeModifiers[attribute];
  const attributeModifier = Math.floor((attributeScore - 10) / 2);
  return attributeModifier;
}

function setSpellSlots(level, currentSlots, character = selectedCharacter, isWarlock) {
  if (character) {
    if (isWarlock) {
      character.warlockSpellSlots = currentSlots;
      saveCharacter(character);
    } else {
      if (!character.spellSlots) {
        character.spellSlots = {};
      }

      character.spellSlots[level] = currentSlots;
      saveCharacter(character);
    }
  }
}

function getSpellSlots(level, character = selectedCharacter) {
  if (character && character.spellSlots && character.spellSlots[level] !== undefined) {
    return character.spellSlots[level];
  }
  return 0;
}

function updateLevelHP(character, selectedItem, forceRoll) {
  const className = selectedItem.name || selectedItem;
  const newLevel = character.levels.length;
  const firstLevelRoll = newLevel === 1 ? selectedItem.hd.faces : undefined;
  const diceRoll = firstLevelRoll || forceRoll || droll.roll('1d'+selectedItem.hd.faces).total;
  if (!character.hp) {
    character.hp = {};
  }
  if (!character.hp[className]) {
    character.hp[className] = {};
  }
  if (!character.hp[className][newLevel]) {
    character.hp[className][newLevel] = diceRoll;
  }
}

function getHPRollForClassLevel(className, level, character = selectedCharacter) {
  if (character && character.hp && character.hp[className] && character.hp[className][level]) {
    return character.hp[className][level];
  }
  return 0;
}

async function getHPDiceForLevel(index, character = selectedCharacter) {
  const classRef = await getClassReferences(character, index);
  return classRef.hd.faces;
}

async function getMaxHP(character = selectedCharacter) {
  let totalHp = 0;
  const conMod = await getAttributeModifier('con', character);
  if (character && character.levels && character.levels.length) {
    character.levels.forEach((level, index) => {
      totalHp += getHPRollForClassLevel(level.name, index + 1, character);
      totalHp += conMod;
    });
  }
  return totalHp;
}

async function getCurrentHP(character = selectedCharacter) {
  return character && character.currentHp !== undefined ? character.currentHp : await getMaxHP(character);
}

async function setCurrentHp(currentHp, character = selectedCharacter) {
  if (character && typeof currentHp === 'number') {
    const prevHp = character.currentHp;
    const hpDiff = currentHp - prevHp;

    if (typeof prevHp === 'number' &&  hpDiff < 0 && character.tempHp && character.tempHp > 0)  {
      if (Math.abs(hpDiff) > character.tempHp) {
        character.currentHp += character.tempHp - Math.abs(hpDiff);
        character.tempHp = 0;
      } else {
        character.tempHp += hpDiff;
      }
    } else {
      character.currentHp = currentHp;
    }
    // maxing out health
    if (character.currentHp >= 0) {
      const maxHP = character.customHealth ? character.customHealthVal : await getMaxHP(character);
      character.currentHp = Math.min(character.currentHp, maxHP);
    } else {
      character.currentHp = Math.max(character.currentHp, 0);
    }
    saveCharacter(character);
  }
}

function getTempHp(character = selectedCharacter) {
  return character && character.tempHp !== undefined ? character.tempHp : 0;
}

function addTempHp(tempHp, character = selectedCharacter) {
  if (character) {
    const prevTempHp = character.tempHp || 0;
    character.tempHp = prevTempHp + tempHp;
    saveCharacter(character);
  }
}

function getHitDiceCount(className, character = selectedCharacter) {
  if (character && character.hitDice && character.hitDice[className] !== undefined) {
    return character.hitDice[className];
  }
  return null;
}

async function useHitDice(className, character = selectedCharacter) {
  if (character) {
    if (!character.hitDice) {
      character.hitDice = {};
    }
    if (!character.hitDice[className]) {
      const classLevel = Object.entries(getClassLevelGroups(character)).find(([classLeveName, levels]) => classLeveName === className);
      character.hitDice[className] = classLevel[1];
    }

    if (typeof character.hitDice[className] === 'number' && character.hitDice[className] > 0) {
      const classRef = (await getClassReferences(character))[className];
      const hitDie = classRef.hd.faces;
      const conMod = await getAttributeModifier('con');
      const rollForm = `1d${hitDie}+${conMod}`;
      const roll = droll.roll(rollForm);
      const rollTotal = roll.total;
      emitRoll("Hit Dice", rollForm, roll);
      const newCurrentHp = character.currentHp + rollTotal;
      setCurrentHp(newCurrentHp);
      character.hitDice[className] = character.hitDice[className] - 1;
      saveCharacter(character);
    }
  }
}

function resetHitDice(character = selectedCharacter) {
  if (character && character.hitDice && character.hitDice) {
    const classLevels = getClassLevelGroups(character);
    
    for (const key of Object.keys(classLevels)) {
      character.hitDice[key] = null;
    }

    saveCharacter(character);
  }
}

async function getHitDice(character = selectedCharacter) {
  const hitDice = [];
  if (character) {
    const classLevels = getClassLevelGroups(character);
    const classRefs = await getClassReferences(character);
    
    for (const [classStr, level] of Object.entries(classLevels)) {
      const classRef = classRefs[classStr];
      const total = level;
      const hitDiceCount = getHitDiceCount(classStr);
      const current =  hitDiceCount !== null ? hitDiceCount : total;
      const die = 'd' + classRef.hd.faces;
      hitDice.push({
        total, current, die, className: classStr
      })
    }
  }
  return hitDice;
}

function setHpRoll(className, level, roll, character = selectedCharacter) {
  if (character) {
    if (!character.hp) {
      character.hp = {};
    }
    if (!character.hp[className]) {
      character.hp[className] = {};
    }
    character.hp[className][level] = roll;
    saveCharacter(character);
  }
}

function addItem(item, isFromRef = false, character = selectedCharacter) {
  if (!character.items) {
    character.items = [];
  }

  if (!character.itemCounter) {
    character.itemCounter = 0;
  }

  if (isFromRef) {
    if (item.type !== 'GV') {
      character.items.push({
        uniqueId: character.itemCounter++,
        itemRef: {
          source: item.source,
          name: item.name
        }
      });
    }
  } else {
    character.items.push({ ...item, uniqueId: character.itemCounter++});
  }
  
  saveCharacter(character);
}

function spliceItems(index, item, character = selectedCharacter) {
  if (character && character.items) {
    if (character.items.length > index) {
      character.items.splice(index, 0, item);
    } else {
      character.items.push(item);
    }
    saveCharacter(character);
  }
} 

function setItem(item, character = selectedCharacter, skipEdited = false) {
  if (character && character.items && item.id !== undefined) {
    let currentLevel = character.items;
    const indexes = (item.id + '').split('_');
    for (let i = 0; i < indexes.length - 1; i ++) {
      const index = indexes[i];
      if (currentLevel[index] && currentLevel[index].children) {
        currentLevel = currentLevel[index].children
      } else {
        console.error('Item Set failed', item.id, character.items);
        return;
      }
    }
    const lastIndex = parseInt(indexes[indexes.length - 1], 10);
    if (currentLevel.length > lastIndex) {
      currentLevel[lastIndex] = { ...item.storedItem, isEdited: !skipEdited };
    }
    saveCharacter(character);
  }
}

async function getItems(character = selectedCharacter, isFlat = false) {
  let resultItems = [];
  if (character && character.items && character.items.length) {
    for (let index = 0; index < character.items.length; index ++) {
      const storedItem = character.items[index];
      const parsedItem = await parseItem(storedItem, index, undefined, character);
      resultItems.push(parsedItem);
    }
    resultItems = resultItems.filter(item => !!item && item.type !== 'GV');
    if (isFlat) {
      resultItems = flattenItems(resultItems);
    }
  }
  return resultItems;
}

async function parseItem(storedItem, index, parentItem, character) {
  let newItem = {};

  const itemRefs = await loadModel('items');

  // Find the itemRef if item is based on one in the data model
  if (storedItem.itemRef) {
    const itemRef = itemRefs.find(item => item.source.toLowerCase() === storedItem.itemRef.source.toLowerCase() && item.name.toLowerCase() === storedItem.itemRef.name.toLowerCase());
    if (itemRef) {
      newItem = { ...itemRef };

      // Storing Pack items
      if (!storedItem.children && itemRef.container && itemRef.name.indexOf(' Pack') > -1 && itemRef.entries && itemRef.entries.length > 1 && itemRef.entries[0] === "Includes:") {
        storedItem.children = itemRef.entries[1].items.map((includedItem) => {
          return { name: includedItem, uniqueId: character.itemCounter++ };
        });
        saveCharacter(character);
      }

    } else {
      newItem = { name: storedItem.itemRef.name, lookupFailed: true };
    }
  }

  if (storedItem.name === '') {
    delete storedItem.name;
  }

  // Item reference props are overwritten by storedItem props
  newItem = {
    ...newItem,
    ...cloneDeep(storedItem),
    storedItem: cloneDeep(storedItem),
    storedItemREF: storedItem
  };

  if (parentItem) {
    newItem.parentItemREF = parentItem;
  }

  const isShieldInherited = getIsShieldInherited(newItem);
  newItem = {
    ...newItem,
    id: index,
    type: isShieldInherited ? 'S' : newItem.type,
    canEquip: newItem.armor || newItem.weaponCategory || newItem.type === 'S' || isShieldInherited,
    typeText: getItemType(newItem)
  };
  if (newItem.container) {
    if (!newItem.children) {
      newItem.children = [];
      newItem.storedItem.children = [];
    }
    for (let childIndex = 0; childIndex < newItem.children.length; childIndex ++) {
      const storedChildItem = newItem.children[childIndex];
      const parsedItem = await parseItem(storedChildItem, `${index}_${childIndex}`, newItem, character);
      newItem.children[childIndex] = parsedItem;
    }
  }
  return newItem;
}

function getIsShieldInherited(item) {
  return item && item.requires && item.requires.type === 'S';
}

function getItemType(item) {
  const type = [];
  if (item.wondrous) type.push("Wondrous Item");
  if (item.technology) type.push(item.technology);
  if (item.age) type.push(item.age);
  if (item.weaponCategory) type.push(`Weapon (${item.weaponCategory})`);
  if (item.type) type.push(Parser.itemTypeToAbv(item.type));
  return type.join(", ");
}

function removeItem(id, character = selectedCharacter) {
  if (character && character.items && id !== undefined) {
    
    const checkItem = (item, id) => {
      const list = item.length ? item : item.children ? item.children : undefined;
      if (list) {
        const foundIndex = list.findIndex((child) => child.uniqueId === id);

        if (foundIndex > -1) {
          list.splice(foundIndex, 1);
        } else {
          list.forEach(child => checkItem(child, id));
        }
      }
    }

    checkItem(character.items, id);

    saveCharacter(character);
  }
}

function flattenItems(items, resultsArray = []) {
  if (items.length) {
    resultsArray = resultsArray.concat(items);

    for(let item of items) {
      if (item.children) {
        resultsArray = flattenItems(item.children, resultsArray);
      }
    }
  }
  return resultsArray;
}

function getItemAtId(item, id) {
  const list = item.length ? item : item.children;
  if (item.uniqueId === id) {
    return item;
  }
  let result;
  if (list && list.length) {
    for (let child of list) {
      result = getItemAtId(child, id);
      if (result) {
        break;
      }
    }
  }
  return result;
}

function toggleItemEquipped(id, character = selectedCharacter) {
  if (character && character.items) {
    const item = getItemAtId(character.items, id);
    item.isEquipped = !item.isEquipped;
    saveCharacter(character);
  }
}

function toggleItemAttuned(id, character = selectedCharacter) {
  if (character && character.items) {
    const item = getItemAtId(character.items, id);
    item.isAttuned = !item.isAttuned;
    saveCharacter(character);
  }
}

async function canEquipItem(thisItem, character = selectedCharacter) {
  if (character && character.items) {
    if (thisItem.canEquip) {
      const items = await getItems(character, true);
      const anyEquippedArmor = items.some((item) => item.isEquipped && item.armor && item.id !== thisItem.id);
      const anyEquippedShield = items.some((item) => item.type === 'S' && item.isEquipped && item.id !== thisItem.id);
      return (thisItem.armor && !anyEquippedArmor) || (thisItem.type === 'S' && !anyEquippedShield) || (!thisItem.armor && thisItem.type !== 'S');
    }
  }
  return false;
}

async function canAttuneItem(thisItem, character = selectedCharacter) {
  if (character && character.items) {
    let canEquip = await canEquipItem(thisItem, character);
    if (thisItem.reqAttune && (!thisItem.canEquip || (thisItem.canEquip && canEquip && thisItem.isEquipped))) {
      const items = await getItems(character, true);
      const allAttuned = items.filter((item) => item.isAttuned && item.reqAttune).length >= 3;
      return !allAttuned;
    }
  }
  return false;
}

async function getWeaponItems(character = selectedCharacter) {
  const items = await getItems(character, true);

  return items.filter(item => !!item.weaponCategory)
}

async function getArmorItems(character = selectedCharacter) {
  const items = await getItems(character, true);

  return items.filter(item => !!item.armor)
}

async function setItemsFromBackground(character = selectedCharacter) {
  if (character.items) {
    character.items = character.items.filter((item) => {
      return !item.fromBackground;
    });
  } else {
    character.items = [];
  }

  let background = await getBackgroundReference(character);
  const equipmentEntry = entrySearch("Equipment", background.entries);

  if (equipmentEntry) {
    let equipmentString = equipmentEntry.entry;
    if (equipmentString.indexOf('.') > -1) {
      equipmentString = equipmentString.substring(0, equipmentString.indexOf('.'));
    }
    equipmentString.split(',').forEach((itemStr) => {
      let itemStrTrimmed = itemStr.trim();
      if (itemStrTrimmed.startsWith('and')) {
        itemStrTrimmed = itemStrTrimmed.substring(3).trim();
      }
      if (itemStrTrimmed.indexOf('@item') > -1) {
        itemStrTrimmed.split('@item').forEach((itemFunc, index) => {
          if (index === 0) {
            return;
          }
          const itemParams = itemFunc.substring(0, itemFunc.indexOf('}')).split('|');
          console.error('background items', itemParams, itemStrTrimmed);
          const newItem = { 
            itemRef: {
              name: itemParams[0].trim(),
              source: itemParams[1].trim()
            },
            fromBackground: true
          };

          addItem(newItem, false, character);
        });
      } else {
        addItem({ name: util_capitalizeAll(itemStrTrimmed), fromBackground: true }, false, character);
      }
    });
  }
}

async function setItemsFromClass(character = selectedCharacter) {
  if (character.items) {
    character.items = character.items.filter((item) => {
      return !item.fromClass;
    });
  } else {
    character.items = [];
  }

  if (character.levels && character.levels.length) {
    let classReferences = await getClassReferences(character),
      firstClassName = character.levels[0].name;

    if (firstClassName && classReferences[firstClassName]) {
      const firstClass = classReferences[firstClassName];
      const startingEquipment = firstClass.startingEquipment.default

      if (startingEquipment) {
        startingEquipment.forEach((equipmentString) => {
          equipmentString.split(',').forEach((itemStr) => {
            let itemStrTrimmed = itemStr.trim();
            if (itemStrTrimmed.startsWith('and')) {
              itemStrTrimmed = itemStrTrimmed.substring(3).trim();
            }
            if (itemStrTrimmed.indexOf('@item') > -1) {
              itemStrTrimmed.split('@item').forEach((itemFunc, index) => {
                if (index === 0) {
                  return;
                }
                const itemParams = itemFunc.substring(0, itemFunc.indexOf('}')).split('|');
                console.error('class items', itemParams, itemStrTrimmed);
                const newItem = {
                  itemRef: {
                    name: itemParams[0].trim(),
                    source: itemParams[1].trim()
                  },
                  fromClass: true
                };
      
                addItem(newItem, false, character);
              });
            } else {
              addItem({ name: util_capitalizeAll(itemStrTrimmed), fromClass: true }, false, character);
            }
          });
        });
      }
    }
  }
}

function isChildItem(potentialParent, uniqueId) {
  if (potentialParent.uniqueId === uniqueId) {
    return true;
  }
  if (potentialParent.children) {
    let result;
    for (let child of potentialParent.children) {
      result = isChildItem(child, uniqueId);
      if (result) {
        break;
      }
    }
    return result;
  }
}

async function getCharacterAC(character = selectedCharacter) {
  let ac = 10;
  const items = await getItems(character, true);
  const dexMod = await getAttributeModifier('dex', character);
  const equipedArmor = items.find(item => item.isEquipped && item.armor);
  const equipedShield = items.find(item => item.type === 'S' && item.isEquipped);
  const anyACItems = items.filter(item => {
    return ((item.canEquip && item.isEquipped) || !item.canEquip) && ((item.reqAttune && item.isAttuned) || !item.reqAttune) && entryTextSearch('bonus to AC', item.entries);
  });

  if (equipedArmor) {
    const type = equipedArmor.type;
    if (type === "LA") {
      ac = parseInt(equipedArmor.ac) + dexMod;
    } else if (type === "MA") {
      ac = parseInt(equipedArmor.ac) + Math.min(dexMod, 2);
    } else if (type === "HA") {
      ac = parseInt(equipedArmor.ac);
    }

    if (equipedArmor.genericBonus) {
      ac += parseInt(equipedArmor.genericBonus)
    }
  } else {
    ac = 10 + dexMod;
  }

  let shieldAc = 0;
  if (equipedShield) {
    if (equipedShield.ac) {
      shieldAc += parseInt(equipedShield.ac);
    }

    if (Number.isNaN(shieldAc)) {
      shieldAc += 2;
    }

    if (equipedShield.inherits && equipedShield.inherits.genericBonus) {
      shieldAc += parseInt(equipedShield.inherits.genericBonus)
    }
  }

  for (const acItem of anyACItems) {
    const acEntry = entryTextSearch('bonus to AC', acItem.entries);
    const acSpots = acEntry.split('bonus to AC');
    for (let i = 0; i < acSpots.length - 1; i++) {
      const acSpot = acSpots[i].trim();
      const acThing = acSpot.substring(acSpot.lastIndexOf(' '));
      const acParsed = parseInt(acThing, 10);

      if (!Number.isNaN(acParsed)) {
        shieldAc += acParsed;
      }
    }
  }

  if (shieldAc) {
    return `${ac} + ${shieldAc}`;
  }

  return ac;
}

function toggleCustomAC(toggle, character = selectedCharacter) {
  if (toggle !== undefined) {
    character.customAC = toggle;
  } else {
    toggleCustomAC(!character.customAC, character);
    saveCharacter(character);
  }
}

function setCustomACVal(customACVal, character = selectedCharacter) {
  character.customACVal = customACVal;
  saveCharacter(character);
}

function toggleCustomHealth(toggle, character = selectedCharacter) {
  if (toggle !== undefined) {
    character.customHealth = toggle;
  } else {
    toggleCustomHealth(!character.customHealth, character);
    saveCharacter(character);
  }
}

function setCustomHealthVal(customHealthVal, character = selectedCharacter) {
  character.customHealthVal = customHealthVal;
  saveCharacter(character);
}


async function getCharacterInitiative(character = selectedCharacter) {
  if (character) {
    if (character.customInitiative) {
      return character.customInitiativeVal > 0 ? `+${character.customInitiativeVal}` : character.customInitiativeVal;
    } else {
      const dexMod = await getAttributeModifier('dex', character);
      return dexMod > 0 ? `+${dexMod}` : dexMod;
    }
  }
  return '';
}

function toggleCustomInitiative(toggle, character = selectedCharacter) {
  if (toggle !== undefined) {
    character.customInitiative = toggle;
  } else {
    toggleCustomInitiative(!character.customInitiative, character);
    saveCharacter(character);
  }
}

function setCustomInitiativeVal(customInitiativeVal, character = selectedCharacter) {
  character.customInitiativeVal = customInitiativeVal;
  saveCharacter(character);
}

async function getCharacterSpeed(character = selectedCharacter) {
  let race = await getRaceReference(character);

  if (race && race.speed) {
    if (typeof race.speed === 'number') {
      return race.speed;
    } else {
      let result = '';
      Object.entries(race.speed).forEach((entry) => {
        result += `${util_capitalize(entry[0])}: ${entry[1]}<br/>`
      });
      return result;
    }
  }
  return '';
}

function getCharacterProficiencyBonus(character = selectedCharacter) {
  if (character && character.levels) {
    return getProfBonus(character.levels.length);
  }
  return 0;
}

function getCustomRolls(character = selectedCharacter) {
  if (character && character.customRolls) {
    return character.customRolls;
  }
  return [];
}

function setCustomRoll(roll, index, character = selectedCharacter) {
  if (character) {
    if (!character.customRolls) {
      character.customRolls = [];
    }
    if (index !== undefined) {
      if (character.customRolls.length > index) {
        character.customRolls[index] = roll;
      } else {
        character.customRolls.push(roll);
      }
    }
    saveCharacter(character);
  }
}

function removeCustomRoll(index, character = selectedCharacter) {
  if (character && character.customRolls  && character.customRolls.length > index) {
    if (character.customRolls.length === 0 && index === 0) {
      character.customRolls = [];
    } else {
      character.customRolls.splice(index, 1);
    }
    saveCharacter(character);
  }
}

function removeCustomRollDamage(rollIndex, damageIndex, character = selectedCharacter) {
  if (character && character.customRolls && character.customRolls.length > rollIndex && character.customRolls[rollIndex].damages.length > damageIndex) {
    if (character.customRolls[rollIndex].damages.length === 0 && damageIndex === 0) {
      character.customRolls[rollIndex].damages = [];
    } else {
      character.customRolls[rollIndex].damages.splice(damageIndex, 1);
    }
    saveCharacter(character);
  }
}

async function getItemRolls(character = selectedCharacter) {

}

async function getSpellRolls(character = selectedCharacter) {
  const preparedCantrips = character.preparedCantrips || [];
  const preparedSpells = character.preparedSpells || [];
  const spellRolls = [];

  for (const spell of [...preparedCantrips, ...preparedSpells]) {
    const spellRef = await getSpellReference(spell.name + '_' + spell.source);
    const renderStack = []
    renderer.recursiveEntryRender({type: "entries", entries: spellRef.entries}, renderStack, 1);
    const render = renderStack.join(' ');

    render.split('@damage').forEach((str, index) => {
      if (index === 0 ) {
        return undefined;
      }
      const roll = str.substring(0, str.indexOf("}")).trim();

      spellRolls.push({ roll });
    });
  }
  return spellRolls;
}

function setAbilityUsage(ability, index, character = selectedCharacter) {
  if (character) {
    if (!character.customAbilities) {
      character.customAbilities = [];
    }
    if (typeof ability.slots !== 'number') {
      ability.slots = parseInt(ability.slots, 10);
      if (isNaN(ability.slots)) {
        ability.slots = 0;
      }
    }
    if (typeof ability.currentSlots !== 'number') {
      ability.currentSlots = parseInt(ability.currentSlots, 10);
      if (isNaN(ability.currentSlots)) {
        ability.currentSlots = 0;
      }
    }
    ability.useNumberField = ability.slots > 10;
    if (ability.currentSlots > ability.slots) {
      ability.currentSlots = ability.slots;
    }
    if (index !== undefined) {
      if (character.customAbilities.length > index) {
        character.customAbilities[index] = ability;
      } else {
        character.customAbilities.push(ability);
      }
    }
    saveCharacter(character);
  }
}

function removeAbilityUsage(index, character = selectedCharacter) {
  if (character && character.customAbilities  && character.customAbilities.length > index) {
    if (character.customAbilities.length === 0 && index === 0) {
      character.customAbilities = [];
    } else {
      character.customAbilities.splice(index, 1);
    }
    saveCharacter(character);
  }
}

export {
  getCharacters,
  addCharacter,
  uploadCharacter,
  addFeature,
  addFeatureById,
  updateAttr,
  updateName,
  removeSelectedCharacter,
  selectCharacter,
  selectCharacterFromIndex,
  getCharacterChannel,
  getSelectedCharacter,
  setClassLevels,
  addClassLevel,
  mergeFeature,
  mergeSubclass,
  getSubclassChoiceLevel,
  getClassSkillProfOptions,
  getBackgroundSkillProfOptions,
  setClassSkillProficiencies,
  setBackgroundSkillProficiencies,
  getBackgroundSkillProfDefaults,
  getRaceAttributeOptions,
  getRaceAttributeDefaults,
  setRaceAttributes,
  getASIForLevel,
  setASI,
  getASIAndFeatAttributeData,
  getSkillProfs,
  getFeatReference,
  setFeatAttributeSelection,
  initSelectedCharacter,
  getClassReferences,
  getBackgroundReference,
  getRaceReference,
  getClassLevelGroups,
  getClassString,
  getClassSaves,
  getFeatureString,
  findCharacterIndex,
  getClassChoice,
  getSubclassChoice,
  setClassChoice,
  setSubclassChoice,
  toggleSpellPrepared,
  isSpellPrepared,
  isSpellPreparedFromObj,
  toggleCantripPrepared,
  getAttributeScoreModifiers,
  getAttributeModifier,
  saveCharacter,
  setSpellSlots,
  getSpellSlots,
  getHPRollForClassLevel,
  getMaxHP,
  getCurrentHP,
  setCurrentHp,
  getTempHp,
  addTempHp,
  getHitDice,
  resetHitDice,
  useHitDice,
  getHPDiceForLevel,
  setHpRoll,
  addItem,
  setItem,
  spliceItems,
  getItems,
  removeItem,
  toggleItemEquipped,
  toggleItemAttuned,
  canEquipItem,
  canAttuneItem,
  getWeaponItems,
  getArmorItems,
  isChildItem,
  getItemAtId,
  getCharacterAC,
  toggleCustomAC,
  setCustomACVal,
  toggleCustomHealth,
  setCustomHealthVal,
  getCharacterSpeed,
  getCharacterInitiative,
  toggleCustomInitiative,
  setCustomInitiativeVal,
  getCharacterProficiencyBonus,
  getCustomRolls,
  setCustomRoll,
  removeCustomRoll,
  removeCustomRollDamage,
  getSpellRolls,
  getItemRolls,
  setAbilityUsage,
  removeAbilityUsage,
  toggleCustomSkill
};