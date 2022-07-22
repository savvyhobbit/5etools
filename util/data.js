import {cloneDeep} from "../js/utils.js";
import Parser from "./Parser.js";

let cache = {};
const DATA_ROOT = './data/'

/**
 * Returns model data object, serving the cached version if already requested.
 * @param {String} modelId Model ID for the data being requested.
 */
export async function loadModel(modelId) {
	if (modelId) {
		// Checks model cache for data
		if (!cache.hasOwnProperty(modelId)) {
			if (modelId.indexOf('class-') > -1) {
				if (modelId === 'class-all') {
					cache[modelId] = loadAllNewClassModels();
				} else {
					cache[modelId] = loadNewClassModel(modelId);
				}
			} else {
				// Catch for items.json to load additional data
				switch (modelId) {
					case "items":
						cache[modelId] = await loadAllItemData();
						break;

					case "bestiary":
						cache[modelId] = await loadAllMonsterData();
						break;

					case "spells":
						cache[modelId] = await loadModelFromIndex(modelId, true);
						break;

					case "races":
						cache[modelId] = await loadRaceData();
						break;

					default:
						cache[modelId] = await loadModelFromSingleJSON(modelId);
				}
			}
		}
		return cache[modelId];
	} else {
		console.error("Missing modelID");
		return [];
	}
}

/**
 * Loads JSON from the given URL.
 * @param {String} url Makes request to specified URL, returns JSON
 */
function loadJSON(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
};

async function loadModelFromSingleJSON(modelId) {
	const modelData = await loadJSON(`${DATA_ROOT}${modelId}.json`);
	if (Array.isArray(modelData)) {
		return modelData;
	} else {
		console.error("Array data not found from model JSON");
		return [];
	}
}

async function loadModelFromIndex(modelId, isSpells) {
	const modelData = await loadJSON(`${DATA_ROOT}${modelId}/index.json`);
	if (modelData.index) {
		let promises = [];

		for (let srcURL of Object.values(modelData.index)) {
			promises.push(loadJSON(`${DATA_ROOT}${modelId}/${srcURL}`));
		}
		return Promise.all(promises).then(data => {
			let allData = [];

			for (let srcData of data) {
				allData = allData.concat(srcData.spell).map(spell => {
					if (isSpells && spell.classes && spell.classes.fromClassListVariant) {
						if (!spell.classes.fromClassList) {
							spell.classes.fromClassList = spell.classes.fromClassListVariant
						} else {
							spell.classes.fromClassList = spell.classes.fromClassList.concat(spell.classes.fromClassListVariant);
						}
						const uniqueVals = [];
						spell.classes.fromClassList = spell.classes.fromClassList.filter(clazz => {
							if (!uniqueVals.includes(clazz.name)) {
								uniqueVals.push(clazz.name);
								return true;
							}
							return false;
						});
					}
					return spell;
				});
			}

			return allData;
		});
	} else {
		console.error("Model index data not found from model JSON");
		return [];
	}
}

function loadAllNewClassModels() {
	let classModelIds = ["artificer","barbarian","bard","cleric","druid","fighter","generic","monk","mystic","paladin","pirate","ranger","rogue","sidekick","sorcerer","warlock","wizard"]
	const promises = [];

	for (let classModelId of classModelIds) {
		promises.push(loadModel(`class-${classModelId}`));
	}

	return Promise.all(promises).then(classesData => {
		let result = []
		for (let classData of classesData) {
			result = result.concat(classData.class);
		}
		return result.filter((item) => !!item);
	});
}

async function loadNewClassModel(classId) {
	const path = `${DATA_ROOT}newClasses/${classId}.json`;
	const modelData = await loadJSON(path).then((data) => {
		if (classId !== 'class-pirate') {
			return parseNewClassModel(data);
		}
		return data;
	});
	if (modelData) {
		return modelData;
	} else {
		console.error("Didn't load individual Class JSON.", path);
		return {};
	}
}

async function parseNewClassModel(classModel) {
	if (classModel.class) {
		for (const classObj of classModel.class) {
			const newClassFeatures = [];
			for (let i = 0; i < 20; i++) {
				newClassFeatures.push([])
			}

			classObj.classFeatures.forEach((key) => {
				const isSubclassGain = !!key.gainSubclassFeature;
				const featureRef = findClassRefFromKey(classModel, isSubclassGain ? key.classFeature : key);

				if (featureRef) {
					const currentLevelArray = newClassFeatures[parseInt(featureRef.level, 10) - 1];

					if (isSubclassGain) {
						currentLevelArray.push({ ...featureRef, gainSubclassFeature: true });
					} else {
						currentLevelArray.push(featureRef);
					}
				} else {
					console.error('Class feature lookup failed!!');
				}
			});
			if (classObj._copy) {
				console.error("Need to Copy Class", classObj.name);
			}
			classObj.classFeatures = newClassFeatures;
			if (classModel.subclass) {
				classObj.subclasses = classModel.subclass.filter((subclass) => subclass.className === classObj.name && subclass.classSource === classObj.source);
			}
		}
	}

	if (classModel.subclass) {
		for (const subclassObj of classModel.subclass) {
			let newSubclassFeatures = [];
			for (let i = 0; i < 20; i++) {
				newSubclassFeatures.push([])
			}

			if (subclassObj.subclassFeatures) {
				subclassObj.subclassFeatures.forEach(key => {
					const featureRef = findClassRefFromKey(classModel, key);
	
					if (featureRef) {
						const currentLevelArray = newSubclassFeatures[parseInt(featureRef.level, 10) - 1];

						currentLevelArray.push(featureRef);
						featureRef.entries.forEach((subclassEntry) => {
							if (subclassEntry.subclassFeature) {
								const subclassFeatureRef = findClassRefFromKey(classModel, subclassEntry.subclassFeature);
								currentLevelArray.push(subclassFeatureRef);
							}
						});
					} else {
						console.error('Sub Class feature lookup failed!!');
					}
				});
				newSubclassFeatures = newSubclassFeatures.filter((array) => array.length > 0)
				subclassObj.subclassFeatures = newSubclassFeatures;
			}
			if (subclassObj._copy) {
				//console.error("Need to Copy sub class", subclassObj.name);
			}
		}
	}
	return classModel;
}


// Class Keys     have 4 data points: feature name, class name, class source, level
// Subclass Keys  have 6 data points: feature name, class name, class source , subclass name, subclass source, level
function findClassRefFromKey(classModel, keyStr) {
	let keys = keyStr.split('|');

	const featureName = keys[0];
	let featureSource = keys[keys.length - 2];	
	let featureLevel;
	let isSubclass;

	if (keys.length === 7) {
		isSubclass = true;
		featureSource = keys[keys.length - 1];
		featureLevel = parseInt(keys[5], 10);
	} else  if (keys.length === 6) {
		isSubclass = true;
		featureLevel = parseInt(keys[5], 10);
	} else if (keys.length === 5) {
		isSubclass = false;
		featureSource = keys[keys.length - 1];
		featureLevel = parseInt(keys[3], 10);
	} else if (keys.length === 4) {
		isSubclass = false; 
		featureLevel = parseInt(keys[3], 10);
	} else {
		console.error('New class ref keyStr length assumption was wrong!!!', keyStr);
	}

	const searchFeatures = isSubclass ? classModel.subclassFeature : classModel.classFeature;
	const foundFeature = searchFeatures.find(feature => feature.name === featureName && (!featureSource || feature.source === featureSource) && feature.level === featureLevel);
 	return foundFeature;
}


export async function filterModel(modelId, selectorString, orOperand = false) {
	let selectors;
	
	if (typeof selectorString === "string") {
		if (selectorString.indexOf('|') > -1) {
			selectors = selectorString
				.split('|')
				.map((selectorStr) => {
					let selectorKeyValue = selectorStr.split('=');
					if (selectorKeyValue.length > 1) {
						return {
							key: selectorKeyValue[0],
							value: selectorKeyValue[1]
						};
					} else {
						return null;
					}
				})
				.filter(selector => !!selector);
		} else {
			selectors = [{key: 'featureType', value: selectorString}];
		}
	} else if (Array.isArray(selectorString)) {
		selectors = selectorString;
	} else {
		selectors = [selectorString];
	}

	return await loadModel(modelId).then((data) => {
		return selectors && selectors.length ? data.filter(item => {
			const compareFunc = orOperand ? Array.prototype.some : Array.prototype.every;
			return compareFunc.apply(selectors, [(selector => {
				const valPath = selector.key.split('.');
				let itemVal = item;
				let failedPathSearch = false;

				valPath.forEach((curKey) => {
					if (itemVal && itemVal[curKey]) {
						itemVal = itemVal[curKey];
					} else {
						failedPathSearch = true;
						return -1;
					}
				});

				if (failedPathSearch) {
					return false;
				}

				if (itemVal) {
					if (Array.isArray(selector.value)) {
						// todo

					} else if (typeof selector.value === "object") {

						if (Array.isArray(itemVal)) {
							return itemVal.some(i => {
								return Object.entries(selector.value).every(([ selKey , selVal ]) => {
									const selKeyPath = selKey.split('.');
									let singleVal = i;
									selKeyPath.forEach((curKey) => {
										if (singleVal && singleVal[curKey]) {
											singleVal = singleVal[curKey];
										}
									});
									return singleVal && singleVal.toLowerCase() === selVal.toLowerCase();
								});
							});
						} else {
							return Object.entries(selector.value).every(([ selKey , selVal ]) => {
								const selKeyPath = selKey.split('.');
								let singleVal = itemVal;
								selKeyPath.forEach((curKey) => {
									if (singleVal && singleVal[curKey]) {
										singleVal = singleVal[curKey];
									}
								});
								return singleVal && singleVal.toLowerCase() === selVal.toLowerCase();
							});
						}

					} else {					
						if (Array.isArray(itemVal)) {
							const lowerCased = itemVal.map(i => i.toLowerCase());
							return lowerCased.includes(selector.value.toLowerCase());
						} else {
							return itemVal.toLowerCase() === selector.value.toLowerCase()
						}
					}
				}
				return false;
			})]);
		}) : data;
	});
}

function loadAllMonsterData() {
	const promises = [];

	promises.push(loadJSON(`${DATA_ROOT}bestiary.json`));
	promises.push(loadJSON(`${DATA_ROOT}legendarygroups.json`));

	return Promise.all(promises).then(data => {
		return parseLegendaryMonsters(data[0], data[1]);
	});
}

function parseLegendaryMonsters(monsterData, legendaryGroupData) {
  const legendaryGroupList = {};

  for (let legendaryGroup of legendaryGroupData) {
    legendaryGroupList[legendaryGroup.name] = {
      lairActions: legendaryGroup.lairActions,
      regionalEffects: legendaryGroup.regionalEffects
    };
  }

  for (let monster of monsterData) {
    if (monster.legendaryGroup) {
      const legendaryGroup = monster.legendaryGroup;
      if (legendaryGroup) {
        const thisGroup = legendaryGroupList[legendaryGroup];
        if (thisGroup.lairActions) monster.lairaction = cloneDeep(thisGroup.lairActions);
        if (thisGroup.regionalEffects) monster.regionaleffect = cloneDeep(thisGroup.regionalEffects);
      }
    }
  }
  return monsterData;
}

async function loadRaceData() {
	let raceData = await loadModelFromSingleJSON("races");
	let newRaces = [];

	for (let race of raceData) {
		newRaces = newRaces.concat(parseSubraces(race));		
	}
	return newRaces;
}

/**
 * Loads and merges all Item data.
 */
function loadAllItemData() {
	const promises = [];

	promises.push(loadJSON(`${DATA_ROOT}items.json`));
	promises.push(loadJSON(`${DATA_ROOT}basicitems.json`));
	promises.push(loadJSON(`${DATA_ROOT}magicvariants.json`));

	return Promise.all(promises).then((data) => {
		return mergeItemsData(data[0], data[1], data[2]);
	});
}

function mergeItemsData(itemData, basicItemData, variantData) {
	const propertyList = {};
	const typeList = {};
	let itemList = itemData;

	let basicItemList = basicItemData.basicitems;
	const itemPropertyList = basicItemData.itemProperty;
	const itemTypeList = basicItemData.itemType;
	// Convert the property and type list JSONs into look-ups, i.e. use the abbreviation as a JSON property name
	for (let i = 0; i < itemPropertyList.length; i++) propertyList[itemPropertyList[i].abbreviation] = itemPropertyList[i].name ? JSON.parse(JSON.stringify(itemPropertyList[i])) : {"name": itemPropertyList[i].entries[0].name.toLowerCase(), "entries": itemPropertyList[i].entries};
	for (let i = 0; i < itemTypeList.length; i++) typeList[itemTypeList[i].abbreviation] = itemTypeList[i].name ? JSON.parse(JSON.stringify(itemTypeList[i])): {"name": itemTypeList[i].entries[0].name.toLowerCase(), "entries": itemTypeList[i].entries};

	let variantList = variantData;
	itemList = itemList.concat(basicItemList);
	for (let i = 0; i < variantList.length; i++) {
		variantList[i].tier = variantList[i].inherits.tier;
		variantList[i].rarity = variantList[i].inherits.rarity;
		variantList[i].source = variantList[i].inherits.source;
		variantList[i].page = variantList[i].inherits.page;
		if(!variantList[i].entries && variantList[i].inherits.entries) variantList[i].entries=JSON.parse(JSON.stringify(variantList[i].inherits.entries));
		if(variantList[i].requires.armor) variantList[i].armor = variantList[i].requires.armor
	}
	itemList = itemList.concat(variantList);
	for (let i = 0; i < basicItemList.length; i++) {
		const curBasicItem = basicItemList[i];
		basicItemList[i].category = "Basic";
		if(curBasicItem.entries === undefined) curBasicItem.entries=[];
		const curBasicItemName = curBasicItem.name.toLowerCase();
		for (let j = 0; j < variantList.length; j++) {
			const curVariant = variantList[j];
			const curRequires = curVariant.requires;
			let hasRequired = curBasicItemName.indexOf(" (") === -1;
			for (const requiredProperty in curRequires) if (curRequires.hasOwnProperty(requiredProperty) && curBasicItem[requiredProperty] !== curRequires[requiredProperty]) hasRequired=false;
			if (curVariant.excludes) {
				const curExcludes = curVariant.excludes;
				for (const excludedProperty in curExcludes) if (curExcludes.hasOwnProperty(excludedProperty) && curBasicItem[excludedProperty] === curExcludes[excludedProperty]) hasRequired=false;
			}
			if (hasRequired) {
				const curInherits = curVariant.inherits;
				const tmpBasicItem = JSON.parse(JSON.stringify(curBasicItem));
				delete tmpBasicItem.value; // Magic items do not inherit the value of the non-magical item
				tmpBasicItem.category = "Specific Variant";
				for (const inheritedProperty in curInherits) {
					if (curInherits.hasOwnProperty(inheritedProperty)) {
						if (inheritedProperty === "namePrefix") {
							tmpBasicItem.name = curInherits.namePrefix+tmpBasicItem.name;
						} else if (inheritedProperty === "nameSuffix") {
							tmpBasicItem.name += curInherits.nameSuffix;
						} else if (inheritedProperty === "entries") {
							for (let k = curInherits.entries.length-1; k > -1; k--) {
								let tmpText = curInherits.entries[k];
								if (typeof tmpText === "string") {
									if (tmpBasicItem.dmgType) tmpText = tmpText.replace("{@dmgType}", Parser.dmgTypeToFull(tmpBasicItem.dmgType));
									if (curInherits.genericBonus) tmpText = tmpText.replace("{@genericBonus}", curInherits.genericBonus);
									if (tmpText.indexOf("{@lowerName}") !== -1) tmpText = tmpText.split("{@lowerName}").join(curBasicItemName);
								}
								tmpBasicItem.entries.unshift(tmpText);
							}
						} else
							tmpBasicItem[inheritedProperty] = curInherits[inheritedProperty];
					}
				}
				itemList.push(tmpBasicItem);
			}
		}
	}
	window.itemPropertyList = propertyList;
	window.itemTypeList = typeList;
  	return itemList;
}

function parseSubraces(race) {
	if (race.subraces) {
		const srCopy = JSON.parse(JSON.stringify(race.subraces));
		const out = [];

		srCopy.forEach(s => {
			const cpy = JSON.parse(JSON.stringify(race));
			cpy._baseName = cpy.name;
			cpy._baseSource = cpy.source;
			delete cpy.subraces;

			// merge names, abilities, entries, tags
			if (s.name) {
				cpy.name = `${cpy.name} (${s.name})`;
				delete s.name;
			}
			if (s.ability) {
				if (s.ability.overwrite || !cpy.ability) cpy.ability = [];
				let abilityItem;
				if (Array.isArray(s.ability)) {
					abilityItem = s.ability[0];
				} else {
					abilityItem = s.ability;
				}
				cpy.ability.push(abilityItem);
				delete cpy.ability.overwrite;
				delete s.ability;
			}
			if (s.entries) {
				s.entries.forEach(e => {
					if (e.data && e.data.overwrite) {
						const toOverwrite = cpy.entries.findIndex(it => it.name.toLowerCase().trim() === e.data.overwrite.toLowerCase().trim());
						if (~toOverwrite) cpy.entries[toOverwrite] = e;
						else cpy.entries.push(e);
					} else {
						cpy.entries.push(e);
					}
				});
				delete s.entries;
			}
			// TODO needs a mechanism to allow subraces to override unwanted tags
			if (s.traitTags) {
				cpy.traitTags = (cpy.traitTags || []).concat(s.traitTags);
				delete s.traitTags;
			}
			if (s.languageTags) {
				cpy.languageTags = (cpy.languageTags || []).concat(s.languageTags);
				delete s.languageTags;
			}

			// overwrite everything else
			Object.assign(cpy, s);

			out.push(cpy);
		});
		return out;
	} else {
		return [race];
	}
}