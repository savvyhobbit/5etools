import {
  getSourceFilter,
  getAsiFilter,
  initFilterBox,
  utils_makePrerequisite,
  search,
  debounce,
  ascSort,
  parseHTML,
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
  getFromPath,
  decodeForHash,
  encodeForHash,
  getItemTypes
} from "../js/utils.js";
import { parse_abilityShort, parse_abilityCollection } from "../util/ability.js";
import {
  FLTR_ID,
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
import { Filter, FilterBox } from "./Filter.js";
import { readRouteSelection } from "./routing.js";

function renderTable(data, rootEl, columns) {
  const filters = {};

  // Generates html and filter settings for each item by each column
	for (let i = 0; i < data.length; i++) {
		const curItem = data[i];
    const name = curItem.name;
    let columnsHtmlString = '';
  
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
          columnsHtmlString += `<td class='table-cell ability ${
            ability === STR_NONE ? "list-entry-none " : ""
          } ${col.cssClass}'>${ability}</td>`;
          break;

        case "name":
          columnsHtmlString += `<td class='table-cell table-cell--border name ${col.cssClass}'>${name}</td>`;
          break;

        case "source":
          if (!filters[col.id]) {
            let sourceFilter = getSourceFilter();
            sourceFilter.metric = "source";
            filters[col.id] = sourceFilter;
          }
          filters[col.id].addIfAbsent(curItem.source);

          columnsHtmlString += `<td class='table-cell source source${curItem.source} ${
            col.cssClass
          }' title='${Parser.sourceJsonToFull(curItem.source)}'>${Parser.sourceJsonToAbv(curItem.source)}</td>`;
          break;

        case "prerequisite":
          let prereqText = utils_makePrerequisite(curItem.prerequisite, true);
          if (!prereqText) {
            prereqText = '--';
          }
          columnsHtmlString += `<td class='table-cell prerequisite ${
            prereqText === STR_NONE ? "list-entry-none " : ""
          } ${col.cssClass}'>${prereqText}</td>`;
          break;

        case "proficiencies":
          const prof = curItem.skillProficiencies && curItem.skillProficiencies.length > 0
            ? parse_backgroundSkills(curItem.skillProficiencies) : "--";
          columnsHtmlString += `<td class="table-cell proficiencies ${col.cssClass}">${prof}</td>`;
          break;

        case "psy-type":
          if (!filters[col.id]) {
            let typeFilter = new Filter({ header: "Type", items: ["D", "T"], displayFn: parse_psionicTypeToFull });
            typeFilter.metric = "type";
            filters[col.id] = typeFilter;
          }
          columnsHtmlString += `<td class='psy-type table-cell ${col.cssClass}'>${parse_psionicTypeToFull(
            curItem.type
          )}</td>`;
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
          columnsHtmlString += `<td class='psy-order table-cell  ${col.cssClass} ${
            curItem.order === STR_NONE ? "list-entry-none" : STR_EMPTY
          }'>${curItem.order}</td>`;
          break;

        case "psy-mode-list":
          columnsHtmlString += `<td class='psy-mode-list ${col.cssClass}'>${getHiddenModeList(curItem)}</td>`;
          break;

        case "size":
          if (!filters[col.id]) {
            let sizeFilter = new Filter({ header: "Size", displayFn: Parser.sizeAbvToFull });
            sizeFilter.metric = "size";
            filters[col.id] = sizeFilter;
          }
          filters[col.id].addIfAbsent(curItem.size);
          columnsHtmlString += `<td class='table-cell ${col.cssClass} size'>${Parser.sizeAbvToFull(curItem.size)}</td>`;
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
          columnsHtmlString += `<td class='table-cell type ${col.cssClass}'>${curItem.type}</td>`;
          break;

        case "level":
          if (!filters[col.id]) {
            let levelFilter = new Filter({header: "Level", displayFn: getFltrSpellLevelStr});
            levelFilter.metric = "level";
            filters[col.id] = levelFilter;
          }
          filters[col.id].addIfAbsent(curItem.level);
          columnsHtmlString += `<td class='table-cell level ${col.cssClass}'>${Parser.spLevelToFull(curItem.level)}</td>`;
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
          columnsHtmlString += `<td class='table-cell ${col.cssClass} time' title='${Parser.spTimeListToFull(curItem.time)}'>${getTblTimeStr(curItem.time[0])}</td>`;
          break;

        case "school":
          if (!filters[col.id]) {
            let schoolFilter = new Filter({ header: "School", displayFn: Parser.spSchoolAbvToFull });
            schoolFilter.metric = "school";
            filters[col.id] = schoolFilter;
          }
          filters[col.id].addIfAbsent(curItem.school);
          columnsHtmlString += `<td class='table-cell ${col.cssClass} school school_${curItem.school}' title="${Parser.spSchoolAbvToFull(curItem.school)}">${Parser.spSchoolAbvToFull(curItem.school)}</td>`;
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
          columnsHtmlString += `<td class='table-cell ${col.cssClass} range'>${Parser.spRangeToFull(curItem.range)}</td>`;
          break;

        case "classes":
          if (!filters[col.id]) {
            let classFilter = new Filter({ header: "Class" });
            classFilter.metric = "_fClasses";
            filters[col.id] = classFilter;
          }
          curItem._fClasses = curItem.classes.fromClassList ? curItem.classes.fromClassList.map(c => getClassFilterStr(c)) : [];
		      curItem._fClasses.forEach(c => filters[col.id].addIfAbsent(c));
          columnsHtmlString += `<td class='table-cell ${col.cssClass} classes'>${Parser.spClassesToFull(curItem.classes)}</td>`;
          break;

        case "subclasses":
          if (!filters[col.id]) {
            let subclassFilter = new Filter({ header: "Subclass" });
            subclassFilter.metric = "_fSubclasses";
            filters[col.id] = subclassFilter;
          }
          curItem._fSubclasses = curItem.classes.fromSubclass ? curItem.classes.fromSubclass.map(c => getClassFilterStr(c.subclass)) : [];
		      curItem._fSubclasses.forEach(sc => filters[col.id].addIfAbsent(sc));
          columnsHtmlString += `<td class='table-cell subclasses ${col.cssClass}'>${curItem._fSubclasses.join(", ")}</td>`;
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
          curItem._fMeta = getMetaFilterObj(curItem);
          columnsHtmlString += `<td class='table-cell spell-meta ${col.cssClass}'>${curItem._fMeta}</td>`;
          break;
        
        case "rules-search":
          const searchStack = [];
          for (const e1 of curItem.entries) {
            getRuleSearchStackNames(searchStack, e1);
          }
          columnsHtmlString += `<td class='table-cell rules-search ${col.cssClass}'>${searchStack.join(",")}</td>`;
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
          columnsHtmlString += `<td class='table-cell type ${col.cssClass}'>${curItem._pTypes.asText.uppercaseFirst()}</td>`;
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
            filters.sizeFilter.metric = "size";
            filters.tagFilter = new Filter({ header: "Tag", displayFn: uppercaseFirst });
            filters.tagFilter.metric = "_pTypes.tags";
            filters.miscFilter = new Filter({header: "Miscellaneous", items: ["Legendary"], displayFn: uppercaseFirst});
            filters.miscFilter.metric = "_fMisc";
          }
          curItem._fMisc = curItem.legendary || curItem.legendaryGroup ? ["Legendary"] : [];
          curItem.cr = curItem.cr === undefined ? "Unknown" : curItem.cr;
          let adjCR = curItem.cr === "Unknown" ? "--" : curItem.cr;
          filters[col.id].addIfAbsent(curItem.cr);
          columnsHtmlString += `<td class='table-cell cr ${col.cssClass}'>${adjCR}</td>`;
          break;

        case "item-type":
          if (!filters[col.id]) {
            let typeFilter = new Filter({header: "Type", deselFn: deselectFilter("type", "$")});;
            typeFilter.metric = "_fTypes";
            filters[col.id] = typeFilter;
          }
          const type = getItemTypes(curItem);
          curItem.typeText = type.join(", "); // for loadhash to use
          curItem._fTypes = type;
          type.forEach(t => filters[col.id].addIfAbsent(t));
          columnsHtmlString += `<td class='table-cell item-type ${col.cssClass}'>${type.join(", ")}</td>`;
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
          columnsHtmlString += `<td class='table-cell item-rarity ${col.cssClass}'>${curItem.rarity}</td>`;
          break;

        case "feature-type":
          if (!filters[col.id]) {
            let typeFilter = new Filter({ header: "Type" });
            typeFilter.metric = "_fType";
            filters[col.id] = typeFilter;
          }
          let typeArray = curItem.featureType ? Array.isArray(curItem.featureType) ? curItem.featureType : [curItem.featureType] : [];
          curItem._fType = typeArray.map(t => Parser.featureJsonToAbv(t));
		      curItem._fType.forEach(t => filters[col.id].addIfAbsent(t));
          columnsHtmlString += `<td class='table-cell feature-type ${col.cssClass}'>
              ${typeArray.map(t => { return `<span title="${Parser.featureJsonToAbv(t)}">${t}</span>` }).join(' ')}
            </td>`;
          break;
      } // End Column Switch
    } // End Column Loop
    let linkData = [curItem.name];
    if (curItem.source) {
      linkData.push(curItem.source);
    }
    let dataLink = encodeForHash(linkData);
		let tempString = `
			<tr class='table-row history-link' data-link='${dataLink}' data-title='${name}' ${FLTR_ID}='${i}' id='${i}'>
				${columnsHtmlString}
			</tr>`;

		const rowEl = parseHTML(tempString, true);
		rootEl.querySelector(".list").append(rowEl);
  } // End Item (row) Loop
  
  // Initialize search
	const list = search({
		valueNames: columns.map(col => col.id),
		listClass: "list"
  }, rootEl);

  // Initialize filters for table sorting
  if (Object.keys(filters).length > 0) {
    Object.values(filters).forEach(filter => {
      filter.items.sort(ascSort);
    });
    const filterBox = initFilterBox(
      rootEl,
      ...Object.values(filters)
    );

    filterBox.render();
    // Debounce this as it runs waayyy too often....TODO
    let handleFilterChange = debounce(() => {
      list.filter(function(item) {
        const f = filterBox.getValues();
        let filterId = item.elm.getAttribute(FLTR_ID);
        if (filterId) {
          const ft = data[item.elm.getAttribute(FLTR_ID)];

          for (let filter of Object.values(filters)) {
            let gfpResult = getFromPath(ft, filter.metric);
            let toDisplay = filter.toDisplay(f, gfpResult);
            if (!toDisplay) {
              return false;
            }
          }
        }
        return true;
      });
    }, 200);

    filterBox.addEventListener(FilterBox.EVNT_VALCHANGE, handleFilterChange);
    handleFilterChange();
  }
  
  function deselectFilter(deselectProperty, deselectValue) {
    return function(val) {
      let selectionHash = readRouteSelection();
      if (selectionHash.length) {
        const itemProperty = resolveHash(data, selectionHash)[deselectProperty];
        if (itemProperty === deselectValue) {
          return deselNoHash();
        } else {
          return val === deselectValue && itemProperty !== val;
        }
      } else {
        return deselNoHash();
      }

      function deselNoHash() {
        return val === deselectValue;
      }
    };
  }
}

/**
 * Breaks the hash apart and finds the matching item in 
 * data, compairing "name" and sometimes "source"
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

export {renderTable, resolveHash};