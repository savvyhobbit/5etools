import {
  getSourceFilter,
  getAsiFilter,
  utils_makePrerequisite,
  ascSort,
  getHiddenModeList,
  parse_psionicTypeToFull,
  parse_psionicOrderToFull,
  parse_backgroundSkills,
  getTblTimeStr,
  getRangeType,
  getFltrSpellLevelStr,
  getClassFilterStr,
  getMetaFilterObj,
  getTimeDisplay,
  getRuleSearchStackNames,
  uppercaseFirst,
  decodeForHash,
  getItemTypes,
  getInnerText
} from "../js/utils.js";
import { parse_abilityShort, parse_abilityCollection } from "../util/ability.js";
import {
  STR_NONE,
  STR_EMPTY,
  SZ_FINE,
  SZ_DIMINUTIVE,
  SZ_TINY,
  SZ_SMALL,
  SZ_MEDIUM,
  SZ_LARGE,
  SZ_HUGE,
  SZ_GARGANTUAN,
  SZ_COLOSSAL,
  SZ_VARIES
} from "./consts.js";
import Parser from "./Parser.js";
import { Filter } from "./Filter.js";

function parseListData(data, columns) {
  const filters = {};

	for (let i = 0; i < data.length; i++) {
		const curItem = data[i];
  
		for (let col of columns) {
			switch (col.id) {
        case "ability":
          if (!filters[col.id]) {
            let asiFilter = getAsiFilter();
            asiFilter.metric = "_fAbility";
            filters[col.id] = asiFilter;
          }
          const ability = parse_abilityShort(curItem.ability) || STR_NONE;
          curItem._fAbility = parse_abilityCollection(curItem.ability);
          curItem['render-ability'] = ability;
          break;

        case "source":
          if (!filters[col.id]) {
            let sourceFilter = getSourceFilter();
            sourceFilter.metric = "source";
            filters[col.id] = sourceFilter;
          }
          filters[col.id].addIfAbsent(curItem.source);
          curItem['render-source'] = Parser.sourceJsonToAbv(curItem.source);
          break;

        case "prerequisite":
          let prereqText = getInnerText(utils_makePrerequisite(curItem.prerequisite, true));
          if (!prereqText) {
            prereqText = '';
          }
          curItem['render-prerequisite'] = prereqText;
          break;

        case "proficiencies":
          const prof = curItem.skillProficiencies && curItem.skillProficiencies.length > 0
            ? parse_backgroundSkills(curItem.skillProficiencies) : "";
          curItem['render-proficiencies'] = prof;
          break;

        case "psy-type":
          if (!filters[col.id]) {
            let typeFilter = new Filter({ header: "Type", items: ["D", "T"], displayFn: parse_psionicTypeToFull });
            typeFilter.metric = "type";
            filters[col.id] = typeFilter;
          }
          curItem['render-psy-type'] = parse_psionicTypeToFull(curItem.type);
          break;

        case "psy-order":
          if (!filters[col.id]) {
            let orderFilter = new Filter({
              header: "Order",
              items: ["Avatar", "Awakened", "Immortal", "Nomad", "Wu Jen", "None"]
            });
            orderFilter.metric = "order";
            filters[col.id] = orderFilter;
          }
          curItem.order = parse_psionicOrderToFull(curItem.order);
          curItem['render-order'] = curItem.order;
          break;

        case "psy-mode-list":
          curItem['render-psy-mode-list'] = getHiddenModeList(curItem);
          break;

        case "size":
          if (!filters[col.id]) {
            let sizeFilter = new Filter({ header: "Size", displayFn: Parser.sizeAbvToFull });
            sizeFilter.metric = "size";
            filters[col.id] = sizeFilter;
          }
          filters[col.id].addIfAbsent(curItem.size);
          const renderedSize = curItem.size && curItem.size.length ? Parser.sizeAbvToFull(curItem.size) : ''
          curItem['render-size'] = renderedSize
          break;

        case "reward-type":
          if (!filters[col.id]) {
            let typeFilter = new Filter({
              header: "Type",
              items: ["Blessing", "Boon", "Charm", "Demonic Boon"]
            });
            typeFilter.metric = "type";
            filters[col.id] = typeFilter;
          }
          curItem['render-reward-type'] = curItem.type;
          break;

        case "level":
          if (!filters[col.id]) {
            let levelFilter = new Filter({header: "Level", displayFn: getFltrSpellLevelStr});
            levelFilter.metric = "level";
            filters[col.id] = levelFilter;
          }
          filters[col.id].addIfAbsent(curItem.level);
          curItem['render-level'] = Parser.spLevelToFull(curItem.level);
          break;

        case "time":
          if (!filters[col.id]) {
            let timeFilter = new Filter({
              header: "Cast Time",
              items: ["action", "bonus action", "reaction", "round", "minute", "hour"],
              displayFn: getTimeDisplay
            });
            timeFilter.metric = "_fTimeType";
            filters[col.id] = timeFilter;
          }
          curItem._fTimeType = curItem.time.map(t => t.unit);
          curItem['render-time'] = getTblTimeStr(curItem.time[0]);
          break;

        case "school":
          if (!filters[col.id]) {
            let schoolFilter = new Filter({ header: "School", displayFn: Parser.spSchoolAbvToFull });
            schoolFilter.metric = "school";
            filters[col.id] = schoolFilter;
          }
          filters[col.id].addIfAbsent(curItem.school);
          curItem['render-school'] = Parser.spSchoolAbvToFull(curItem.school);
          break;

        case "range":
          if (!filters[col.id]) {
            let rangeFilter = new Filter({
              header: "Range",
              items: ["Self", "Touch", "Point", "Area", "Special"]
            });
            rangeFilter.metric = "_fRangeType";
            filters[col.id] = rangeFilter;
          }
          curItem._fRangeType = getRangeType(curItem.range);
          curItem['render-range'] = Parser.spRangeToFull(curItem.range);
          break;

        case "classes":
          if (!filters[col.id]) {
            let classFilter = new Filter({ header: "Class" });
            classFilter.metric = "_fClasses";
            filters[col.id] = classFilter;
          }
          curItem._fClasses = curItem.classes && curItem.classes.fromClassList ? curItem.classes.fromClassList.map(c => getClassFilterStr(c)) : [];
		      curItem._fClasses.forEach(c => filters[col.id].addIfAbsent(c));
          const classesEl = Parser.spMainClassesToFull(curItem.classes);
          curItem['render-classes'] = getInnerText(classesEl);
          break;

        case "subclasses":
          if (!filters[col.id]) {
            let subclassFilter = new Filter({ header: "Subclass" });
            subclassFilter.metric = "_fSubclasses";
            filters[col.id] = subclassFilter;
          }
          curItem._fSubclasses = curItem.classes && curItem.classes.fromSubclass ? curItem.classes.fromSubclass.map(c => getClassFilterStr(c.subclass)) : [];
		      curItem._fSubclasses.forEach(sc => filters[col.id].addIfAbsent(sc));
          curItem['render-subclasses'] = curItem._fSubclasses.join(", ");
          break;

        case "spell-meta":
          if (!filters[col.id]) {
            let metaFilter = new Filter({
              header: "Tag",
              items: ["Concentration", "Verbal", "Somatic", "Material", "Ritual", "Technomagic"]
            });
            metaFilter.metric = "_fMeta";
            filters[col.id] = metaFilter;
          }
          curItem._fMeta = getMetaFilterObj(curItem).join(', ');
          curItem['render-spell-meta'] = curItem._fMeta;
          break;
        
        case "rules-search":
          const searchStack = [];
          for (const e1 of curItem.entries) {
            getRuleSearchStackNames(searchStack, e1);
          }
          curItem['render-rules-search'] = searchStack.join(",");
          break;
        
        case "monster-type":
          if (!filters[col.id]) {
            let typeFilter = new Filter({
              header: "Type",
              items: ["aberration", "beast", "celestial", "construct", "dragon", "elemental", "fey", "fiend", "giant", "humanoid", "monstrosity", "ooze", "plant", "undead"],
              displayFn: uppercaseFirst
            });
            typeFilter.metric = "_pTypes.type";
            filters[col.id] = typeFilter;
          }
          curItem._pTypes = Parser.monTypeToFullObj(curItem.type);
          curItem._pTypes.tags.forEach(t => filters[col.id].addIfAbsent(t));
          curItem['render-monster-type'] = curItem._pTypes.asText.uppercaseFirst();
          break;
        

        // adds additional filters for monster table
        case "cr":
          if (!filters[col.id]) {
            let crFilter = new Filter({ header: "CR" });
            crFilter.metric = "cr";
            filters[col.id] = crFilter;
            filters.sizeFilter = new Filter({
              header: "Size",
              items: [SZ_FINE, SZ_DIMINUTIVE, SZ_TINY, SZ_SMALL, SZ_MEDIUM, SZ_LARGE, SZ_HUGE, SZ_GARGANTUAN, SZ_COLOSSAL, SZ_VARIES],
              displayFn: Parser.sizeAbvToFull
            });
            filters.sizeFilter.metric = "size.0";
            filters.tagFilter = new Filter({ header: "Tag", displayFn: uppercaseFirst });
            filters.tagFilter.metric = "_pTypes.tags";
            filters.miscFilter = new Filter({header: "Miscellaneous", items: ["Legendary"], displayFn: uppercaseFirst});
            filters.miscFilter.metric = "_fMisc";
          }
          curItem._fMisc = curItem.legendary || curItem.legendaryGroup ? ["Legendary"] : [];
          curItem.cr = curItem.cr === undefined ? "Unknown" : curItem.cr;
          let adjCR = curItem.cr === "Unknown" ? "--" : curItem.cr;
          filters[col.id].addIfAbsent(curItem.cr);
          curItem['render-cr'] = curItem.cr ;
          break;

        case "item-type":
          if (!filters[col.id]) {
            let typeFilter = new Filter({header: "Type"});;
            typeFilter.metric = "_fTypes";
            filters[col.id] = typeFilter;
          }
          const type = getItemTypes(curItem);
          curItem.typeText = type.join(", "); // for loadhash to use
          curItem._fTypes = type;
          type.forEach(t => filters[col.id].addIfAbsent(t));
          curItem['render-item-type'] = type.join(", ");
          break;

        // adds additional filters for item table
        case "item-rarity":
           if (!filters[col.id]) {
            let rarityFilter = new Filter({header: "Rarity", items: ["None", "Common", "Uncommon", "Rare", "Very Rare", "Legendary", "Artifact", "Unknown"]});
            rarityFilter.metric = "rarity";
            filters[col.id] = rarityFilter;
            // filters.tierFilter = new Filter({header: "Tier", items: ["None", "Minor", "Major"]});
            // filters.tierFilter.metric = "_fTier";
            filters.attunementFilter = new Filter({header: "Attunement", items: ["Yes", "By...", "Optional", "No"]});
            filters.attunementFilter.metric = "_fAttunement";
            // filters.categoryFilter = new Filter({header: "Category", items: ["Basic", "Generic Variant", "Specific Variant", "Other"], deselFn: deselectFilter("category", "Specific Variant")});
            // filters.categoryFilter.metric = "category";
          }
          let attunement = "No";
          if (curItem.reqAttune !== undefined) {
            if (curItem.reqAttune === "YES") {
              attunement = "Yes";
              curItem.reqAttune = "(Requires Attunement)";
            } else if (curItem.reqAttune === "OPTIONAL") {
              attunement = "Optional";
              curItem.reqAttune = "(Attunement Optional)";
            } else if (curItem.reqAttune.toLowerCase().startsWith("by")) {
              attunement = "By...";
              curItem.reqAttune = "(Requires Attunement " + curItem.reqAttune + ")";
            } else {
              attunement = "Yes"; // throw any weird ones in the "Yes" category (e.g. "outdoors at night")
              curItem.reqAttune = "(Requires Attunement " + curItem.reqAttune + ")";
            }
          }
          // const tierTags = [];
          // tierTags.push(curItem.tier ? curItem.tier : "None");
          // tierTags.forEach(tt => filters.tierFilter.addIfAbsent(tt));
          // curItem._fTier = tierTags;
          curItem._fAttunement = attunement;
          curItem['render-item-rarity'] = curItem.rarity;
          break;

        case "feature-type":
          if (!filters[col.id]) {
            let typeFilter = new Filter({ header: "Type" });
            typeFilter.metric = "_fType";
            filters[col.id] = typeFilter;
          }
          let typeArray = curItem.featureType ? Array.isArray(curItem.featureType) ? curItem.featureType : [curItem.featureType] : [];
          const typeArrayLong = typeArray.map(t => Parser.featureJsonToAbv(t));
          curItem._fType = typeArray.map(t => Parser.featureJsonToAbv(t));
		      curItem._fType.forEach(t => filters[col.id].addIfAbsent(t));
          curItem['render-feature-type'] = typeArrayLong.join(', ');
          break;
      } // End Column Switch
    } // End Column Loop
  } // End Item (row) Loop

  // Initialize filters for table sorting
  if (Object.keys(filters).length > 0) {
    Object.values(filters).forEach(filter => {
      filter.items.sort(ascSort);
    });
  }
  return filters;
}

/**
 * Breaks the hash apart and finds the matching item in 
 * data, comparing "name" and sometimes "source"
 * @param {Array} data - List of items to search
 * @param {String} hash - hash used to ID the selected item
 * @returns The found item based on hash or undefined.
 */
function resolveHash(data, hash) {
  let parts = decodeForHash(hash),
    name = parts[0],
    source = parts[1];

  for (let item of data) {
    if (
      item.name.toLowerCase() === name.toLowerCase() &&
      (!source || !item.source || item.source.toLowerCase() === source.toLowerCase())
    ) {
      return item;
    }
  }
  console.error('Hash link was not found in loaded data', hash, data);
  return undefined;
}

export {parseListData, resolveHash};
