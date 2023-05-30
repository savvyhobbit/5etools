import { readRouteView, readRouteSelection } from "./routing";
import { loadModel } from "./data";
import { resolveHash } from './renderTable.js';
import { entryTextSearch, util_capitalize, getProfBonus, entrySearch, util_capitalizeAll, cloneDeep } from "../js/utils";
import Parser from "./Parser";

import droll from "../lib/droll";
import { emitRoll } from "./roll";
import EntryRenderer from "./entryrender";

window.saveCharacter = (char = window.character) => {
  saveCharacter(char);
};

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
      const defaultCharId = window.localStorage.getItem("defaultCharacter");
      for (let i = 0; i < characters.length; i ++) {
        if (defaultCharId && characters[i].id + "" === defaultCharId) {
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

  if (character.choices && character.choices.firstClass) {
    delete character.choices.firstClass;
  }
  if (character.backgroundSkillProficiencies) {
    delete character.backgroundSkillProficiencies;
  }
  if (character.raceAttributes) {
    delete character.raceAttributes;
  }

  window.character = character;
  characters[characterIndex] = character;
  saveCharacters(characters);
}

function addCharacter(charObject) {
  let characters = getCharacters(),
    newChar = charObject ? charObject : newCharacter();

  newChar.id = Date.now();
  characters.push(newChar);
  selectCharacter(newChar);
  saveCharacters(characters);
}

function cloneCharacter(character = selectedCharacter) {
  const clonedCharacter = cloneDeep(character);
  clonedCharacter.name = "Clone of " + clonedCharacter.name;
  addCharacter(clonedCharacter);
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
  newCharacter.id = Date.now();
  return newCharacter;
}

function uploadCharacter(uploadedChar) {
  addCharacter(uploadedChar);
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
    emitChangeEvent()
  }
}

function selectCharacterFromIndex(index) {
  let characters = getCharacters();

  if (characters[index]) {
    selectCharacter(characters[index]);
  } else {
    selectedCharacter = undefined;
    initSelectedCharacter();
    console.error("Selected character index not found");
  }
}

function makeDefault(char) {
  window.localStorage.setItem("defaultCharacter", char.id);
}

function addFeature(type, feature, character = selectedCharacter) {
  if (feature && character) {
    mergeFeature(character, feature, type);
  }
}

async function addFeatureById(type = readRouteView(), id = readRouteSelection(), character = selectedCharacter, selectedItemIn) {
  if (character && id) {
    let truncId = id;
    if (truncId.indexOf(',') > -1) {
      truncId = truncId.substring(0, truncId.indexOf(','));
    }

    let selectedItem;
    if (selectedItemIn) {
      selectedItem = selectedItemIn;
    } else {
      let data = await loadModel(type);
      selectedItem = resolveHash(data, truncId);
    }

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

function mergeSubclass(character = selectedCharacter, className, subclass, previousSubclass) {
  if (character) {
    if (!character.subclasses) {
      character.subclasses = {}
    }
    character.subclasses[className] = {
      name: subclass.name,
      shortName: subclass.shortName,
      source: subclass.source
    };
    // Removing any choices set by subclass or subclass features
    const choiceKeysToRemove = Object.keys(character.choices).filter(key => key.includes(className.toLowerCase()) && ((previousSubclass && key.includes(previousSubclass.shortName)) || key.includes('sub_feature')) );
    choiceKeysToRemove.forEach(key => {
      delete character.choices[key];
    });
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

/////////////////////
// 0 prof from choice
// empty -> + -> ++ -> empty
// 
// 1 prof from choice
// c -> +c -> - -> c
// 
// 2 prof from choice
// cc -> -c -> -- -> cc
function toggleCustomSkill(skill, character = selectedCharacter) {
  if (character) {
    if (!character.customSkills) {
      character.customSkills = [];
    }
    if (!character.negatedSkills) {
      character.negatedSkills = []
    }

    const skillCountCustom = character.customSkills.filter(currentSkill => currentSkill === skill).length;
    const skillCountNegated = character.negatedSkills.filter(currentSkill => currentSkill === skill).length;
    const skillCountChoices = getChoiceSkillProfs(character).filter(currentSkill => currentSkill === skill).length;

    switch (skillCountChoices) {
      case 0:
        // remove any stragglers from negated
        character.negatedSkills = character.negatedSkills.filter(currentSkill => currentSkill !== skill);
        if (skillCountCustom < 2) {
          character.customSkills.push(skill);
        } else {
          character.customSkills = character.customSkills.filter(currentSkill => currentSkill !== skill);
        }
        break;

      case 1:
        if (skillCountCustom === 1) {
          character.customSkills = character.customSkills.filter(currentSkill => currentSkill !== skill);
          character.negatedSkills.push(skill);
        } else if (skillCountNegated === 1) {
          character.negatedSkills = character.negatedSkills.filter(currentSkill => currentSkill !== skill);
          character.customSkills = character.customSkills.filter(currentSkill => currentSkill !== skill);

        } else {
          character.customSkills.push(skill);
        }
        break;

      case 2:
        // remove any stragglers from custom
        character.customSkills = character.customSkills.filter(currentSkill => currentSkill !== skill);
        if (skillCountNegated < 2) {
          character.negatedSkills.push(skill);
        } else {
          character.negatedSkills = character.negatedSkills.filter(currentSkill => currentSkill !== skill);
        }
        break;
    }

    saveCharacter(character);
  }
}

async function getSaves(character = selectedCharacter) {
  let classSaves = await getClassSaves(),
    customSaves = character.customSaves || [],
    negatedSaves = character.negatedSaves || [],
    allSaves = classSaves.concat(customSaves);

  negatedSaves.forEach((negatedSave) => {
    const index = allSaves.indexOf(negatedSave);
    if (index !== -1) {
      allSaves.splice(index, 1);
    }
  });
  return allSaves;
}

async function toggleCustomSave(attr, character = selectedCharacter) {
  if (!character.customSaves) {
    character.customSaves = [];
  }
  if (!character.negatedSaves) {
    character.negatedSaves = [];
  }
  const classSave = (await getClassSaves()).includes(attr),
    customSave = character.customSaves.includes(attr),
    negatedSave = character.negatedSaves.includes(attr);

  if (classSave) {
    character.customSaves = character.customSaves.filter(currentSave => currentSave !== attr);
    if (negatedSave) {
      character.negatedSaves = character.negatedSaves.filter(currentSave => currentSave !== attr);
    } else {
      character.negatedSaves.push(attr);
    }
  } else {
    character.negatedSaves = character.negatedSaves.filter(currentSave => currentSave !== attr);
    if (customSave) {
      character.customSaves = character.customSaves.filter(currentSave => currentSave !== attr);
    } else {
      character.customSaves.push(attr);
    }
  }

  saveCharacter(character);
}

function addAdditionalChoice(choiceKey, newIndex, character = selectedCharacter) {
  const newChoice = { choiceKey };
  switch (choiceKey.toLowerCase()) {
    case 'feat':
      newChoice.feats = 1;
      break;

    case 'skill':
    case 'language':
    case 'tool':
    case 'armor':
    case 'weapon':
      newChoice[`${choiceKey.toLowerCase()}Proficiencies`] = [{"any": 1}];
      break;

    case 'attribute +1':
      newChoice.ability = [{
				"choose": {
					"from": [
						"str",
						"dex",
						"con",
						"int",
						"wis",
						"cha"
					],
					"amount": 1,
				}
			}]
      break;

    case 'attribute +2':
      newChoice.ability = [{
        "choose": {
          "from": [
            "str",
            "dex",
            "con",
            "int",
            "wis",
            "cha"
          ],
          "amount": 2,
        }
      }];
      break;
  }
  if (!character.addedFeatures) {
    character.addedFeatures = {};
  }
  character.addedFeatures[`additionalChoice_${newIndex}`] = newChoice;
  saveCharacter(character);
}

function deleteAdditionalChoice(key, character = selectedCharacter) {
  for (const choiceKey in character.choices) {
    if (choiceKey.startsWith(key)) {
      delete character.choices[choiceKey];
    }
  }
  if (character && character.addedFeatures && character.addedFeatures[key]) {
    delete character.addedFeatures[key];
  }
  saveCharacter(character)
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

function getChoicesForKey(key, character = selectedCharacter) {
  const choices = getAllChoices(character);
  let skillProfs = [];
  for (const choice of choices) {
    let selectedChoices = choice[`selected${key}`];
    if (selectedChoices) {
      if (Array.isArray(selectedChoices)) {
        skillProfs = skillProfs.concat(selectedChoices);
      } else if (selectedChoices.split) {
        skillProfs = skillProfs.concat(selectedChoices.split(','));
      } else if (Object.keys(selectedChoices).length) {
        if (selectedChoices.name) {
          skillProfs = skillProfs.concat(selectedChoices.name);
        } else {
          Object.values(selectedChoices).forEach(choiceVal => {
            if (choiceVal.split) {
              skillProfs = skillProfs.concat(choiceVal.split(','));
            } else {
              skillProfs = skillProfs.concat(choiceVal)
            }
          });
        }
      }
    }
    if (choice[`default${key}`]) {
      let defaultChoices = choice[`default${key}`];
      if (defaultChoices) {
        if (Array.isArray(defaultChoices)) {
          skillProfs = skillProfs.concat(defaultChoices);
        } else if (defaultChoices.split) {
          skillProfs = skillProfs.concat(defaultChoices.split(','));
        } else if (Object.keys(defaultChoices).length) {
          if (defaultChoices.name) {
            skillProfs = skillProfs.concat(defaultChoices.name);
          } else {
            Object.values(defaultChoices).forEach(choiceVal => {
              if (choiceVal.split) {
                skillProfs = skillProfs.concat(choiceVal.split(','));
              } else {
                skillProfs = skillProfs.concat(choiceVal)
              }
            });
          }
        }
      }
    }
  }
  return skillProfs.map(skill => skill.toLowerCase().trim());
}

function getChoiceSkillProfs(character = selectedCharacter) {
  let skillProfs =  getChoicesForKey('SkillProfs', character);
  if (character.choices) {
    Object.values(character.choices).filter((choice) => !!choice.selectedSTLProfs).forEach((choice) => {
      skillProfs = skillProfs.concat(choice.selectedSTLProfs.filter(prof => prof.type === 'skill').map(prof => prof.name.toLowerCase()));
    });
  }
  return skillProfs;
}

function getChoiceWeaponProfs(character = selectedCharacter) {
  return getChoicesForKey('WeaponProfs', character);
}

function getChoiceArmorProfs(character = selectedCharacter) {
  return getChoicesForKey('ArmorProfs', character);
}

function getChoiceToolProfs(character = selectedCharacter) {
  let toolProfs = getChoicesForKey('ToolProfs', character);
  if (character.choices) {
    Object.values(character.choices).filter((choice) => !!choice.selectedSTLProfs).forEach((choice) => {
      toolProfs = toolProfs.concat(choice.selectedSTLProfs.filter(prof => prof.type === 'tool').map(prof => prof.name));
    });
  }
  return toolProfs;
}

function getChoiceLanguages(character = selectedCharacter) {
  return getChoicesForKey('LangProfs', character);
}

function getChoiceResists(character = selectedCharacter) {
  return getChoicesForKey('Resists', character);
}

function getChoiceConditionImmunes(character = selectedCharacter) {
  return getChoicesForKey('ConditionImmunes', character);
}

function getChoiceFeats(character = selectedCharacter) {
  return getChoicesForKey('Feat', character);
}

function getChoiceDarkvision(character = selectedCharacter) {
  let max = null;
  getAllChoices(character).forEach(choice => {
    if (choice.defaultDarkvision !== undefined && choice.defaultDarkvision > max) {
      max = choice.defaultDarkvision;
    }
    if (choice.selectedSkillProfs && choice.selectedSkillProfs.includes('Darkvision')) {
      const is60 = choice.selectedSkillProfs.includes('60'),
        is120 = choice.selectedSkillProfs.includes('120');
      max = is120 ? 120 : is60 ? 60 : 0
    }
  });
  return max;
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
      const attrSplit = attribute.trim().split(' ');
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


function getSkillProfs(character = selectedCharacter) {
  let choiceSkills = getChoiceSkillProfs(character),
    customSkills = character.customSkills || [],
    negatedSkills = character.negatedSkills || [],
    allSkills = choiceSkills.concat(customSkills);
  negatedSkills.forEach((negatedSkill) => {
    const index = allSkills.indexOf(negatedSkill);
    if (index !== -1) {
      allSkills.splice(index, 1);
    }
  });
  return allSkills;
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

function getOptionFeatureChoice(classs, level, feature, character = selectedCharacter) {
  if (character
      && character.classChoices
      && character.classChoices[classs]
      && character.classChoices[classs][level]
      && character.classChoices[classs][level][feature]) {
    return character.classChoices[classs][level][feature];
  }
}

function setOptionFeatureChoice(classs, level, feature, choice, character = selectedCharacter) {
  if (character) {
    if (!character.classChoices) {
      character.classChoices = {};
    }
    if (!character.classChoices[classs]) {
      character.classChoices[classs] = { class: {}, subclass: {} };
    }
    if (!character.classChoices[classs][level]) {
      character.classChoices[classs][level] = {};
    }
    character.classChoices[classs][level][feature] = choice;
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
  let attributeAdj = getChoiceAttributes(character);
  return attributeAdj;
}

async function getAttributeModifier(attribute, character = selectedCharacter) {
  const attributeModifiers = await getAttributeScoreModifiers();
  const attributeScore = parseInt(character.attr[attribute.toLowerCase()]) + attributeModifiers[attribute.toLowerCase()];
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

async function getSpellCastingStats(character = selectedCharacter) {
  if (character) {
    const classRefs = await getClassReferences(character),
      classLevels = getClassLevelGroups(character);
    // DCs and Spell Modifier
    const newSpellStats = [];
    const overallLevel = Object.entries(classLevels).reduce((total, [className, level]) => total + level, 0);
    const profBonus = getProfBonus(overallLevel);

    for (const [className, level] of Object.entries(classLevels)) {
      const classRef = classRefs[className];
      if (classRef.casterProgression) {
        const alreadyAdded = newSpellStats.find(spellMod => classRef.spellcastingAbility === spellMod.spellcastingAbility);
        if (alreadyAdded) {
          alreadyAdded.classes.push(className);
        } else {
          const attributeModifier = await getAttributeModifier(classRef.spellcastingAbility);
          const spellAttackBonus = attributeModifier + profBonus
          const dc = 8 + spellAttackBonus;
          newSpellStats.push({ classes: [className], mod: attributeModifier, spellAttackBonus, dc, spellcastingAbility: classRef.spellcastingAbility});
        }
      }
    }

    const additionalSpellsAbilities = Object.values(character.choices).filter(c => c.additionalSpells && (c.additionalSpells.defaultAbility || c.additionalSpells.selectedAbility));
    for (const choice of additionalSpellsAbilities) {
      const spellcastingAbility = choice.additionalSpells.defaultAbility || choice.additionalSpells.selectedAbility;
      const alreadyAdded = newSpellStats.find(spellMod => spellcastingAbility.toLowerCase() === spellMod.spellcastingAbility);
      if (alreadyAdded) {
        if (!alreadyAdded.classes.find((c) => c === spellcastingAbility)) {
          alreadyAdded.classes.push(spellcastingAbility);
        }
      } else {
        const attributeModifier = await getAttributeModifier(spellcastingAbility);
        const spellAttackBonus = attributeModifier + profBonus
        const dc = 8 + spellAttackBonus;
        newSpellStats.push({ classes: [spellcastingAbility], mod: attributeModifier, spellAttackBonus, dc, spellcastingAbility: spellcastingAbility});
      }
    }

    return newSpellStats;
  } else {
    return [];
  }
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
  return character.itemCounter - 1;
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
      if (!storedItem.children && (itemRef.containerCapacity || itemRef.packContents) && itemRef.name.indexOf(' Pack') > -1 && itemRef.entries && itemRef.entries.length > 1 && itemRef.entries[0] === "Includes:") {
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
    storedItem: cloneDeep(storedItem)
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
  if (newItem.containerCapacity || newItem.packContents) {
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
      if (itemStrTrimmed.indexOf('@filter') > -1) {
        itemStrTrimmed = itemStrTrimmed.replace(/{@filter\s+([^|}]+).+?}/g, (match, p1) => {
          return p1.split("|")[0];
        });
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

function toggleCustomSpeed(toggle, character = selectedCharacter) {
  if (toggle !== undefined) {
    character.customSpeed = toggle;
  } else {
    toggleCustomSpeed(!character.customSpeed, character);
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
      return dexMod > -1 ? `+${dexMod}` : dexMod;
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

  if (!character.customSpeedVal || !character.customSpeedVal.length) {
    character.customSpeedVal = [{ type: 'walk', speed: 30 }];
  }

  if (character.customSpeed) {
    return character.customSpeedVal;
  } else {
    if (race && race.speed) {
      if (typeof race.speed === 'number') {
        return [{ type: 'walk', speed: race.speed }];
      } else {
        return Object.entries(race.speed).map((entry) => {
          return { type: entry[0], speed: entry[1] }
        }).sort((speedEntry) => {
          return speedEntry.type === 'walk' ? -1 : 0;
        });
      }
    }
    return null;
  }
}

function deleteCustomSpeedItem(index, character = selectedCharacter) {
  if (character) {
    if (!character.customSpeedVal || !character.customSpeedVal.length) {
      character.customSpeedVal = [{ type: 'walk', speed: 30 }];
    }
    if (character.customSpeedVal.length > index) {
      character.customSpeedVal.splice(index, 1);
      saveCharacter(character);
    }
  }
}

function addCustomSpeedItem(item, character = selectedCharacter) {
  if (character) {
    if (!character.customSpeedVal || !character.customSpeedVal.length) {
      character.customSpeedVal = [{ type: 'walk', speed: 30 }];
    }
    character.customSpeedVal.push(item);
    saveCharacter(character);
  }
}

function editCustomSpeedItem(index, speedValue, character = selectedCharacter) {
  if (character) {
    if (!character.customSpeedVal || !character.customSpeedVal.length) {
      character.customSpeedVal = [{ type: 'walk', speed: 30 }];
    }
    if (character.customSpeedVal.length > index) {
      character.customSpeedVal[index].speed = speedValue;
      saveCharacter(character);
    }
  }
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
  cloneCharacter,
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
  getSkillProfs,
  getFeatReference,
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
  getOptionFeatureChoice,
  setOptionFeatureChoice,
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
  toggleCustomSpeed,
  setCustomACVal,
  toggleCustomHealth,
  setCustomHealthVal,
  getCharacterSpeed,
  addCustomSpeedItem,
  deleteCustomSpeedItem,
  editCustomSpeedItem,
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
  toggleCustomSkill,
  toggleCustomSave,
  getSaves,
  addAdditionalChoice,
  deleteAdditionalChoice,
  getChoiceWeaponProfs,
  getChoiceArmorProfs,
  getChoiceToolProfs,
  getChoiceLanguages,
  getChoiceResists,
  getChoiceConditionImmunes,
  getChoiceFeats,
  getChoiceDarkvision,
  getSpellCastingStats,
};