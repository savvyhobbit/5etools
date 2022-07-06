import Parser from '../util/Parser.js';
import {Filter, FilterBox} from '../util/Filter.js';
import {
  HASH_LIST_SEP,
  TYP_STRING,
  TYP_NUMBER,
  TYP_OBJECT,
  ATB_STYLE,
  STL_DISPLAY_INITIAL,
  STL_DISPLAY_NONE,
  STR_NONE,
  ABIL_CH_ANY,
  SRC_UA_PREFIX,
  SRC_PSA,
  SRC_PSK,
  SRC_EEPC,
  SRC_PSI,
  SRC_PSZ,
  SRC_PS_PREFIX,
  SRC_3PP_SUFFIX,
  STR_EMPTY,
  RNG_SPECIAL,
  RNG_POINT,
  RNG_SELF,
  RNG_TOUCH,
  RNG_LINE,
  RNG_CONE,
  RNG_RADIUS,
  RNG_HEMISPHERE,
  RNG_SPHERE,
  RNG_CUBE,
  SRC_PHB,
  SRC_SCAG
} from "../util/consts.js";
import { List } from "../lib/list";

function throttle(func, timeFrame) {
	var lastTime = 0;
	return function () {
		var now = new Date();
		if (now - lastTime >= timeFrame) {
			func();
			lastTime = now;
		}
	};
}

let debounce = (func, wait, immediate) => {
	var timeout;
	return function() {
		var context = this,
			args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

let timeout = (ms) => {
	return new Promise(resolve => { setTimeout(resolve, ms) });
}

String.prototype.formatUnicorn = String.prototype.formatUnicorn || function () {
	let str = this.toString();
	if (arguments.length) {
		const t = typeof arguments[0];
		let key;
		const args = TYP_STRING === t || TYP_NUMBER === t ?
			Array.prototype.slice.call(arguments)
			: arguments[0];

		for (key in args) {
			str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
		}
	}

	return str;
};

String.prototype.uppercaseFirst = String.prototype.uppercaseFirst || function () {
	const str = this.toString();
	if (str.length === 0) return str;
	if (str.length === 1) return str.charAt(0).toUpperCase();
	return str.charAt(0).toUpperCase() + str.slice(1);
};

function utils_joinPhraseArray(array, joiner, lastJoiner) {
	if (array.length === 0) return "";
	if (array.length === 1) return array[0];
	if (array.length === 2) return array.join(lastJoiner);
	else {
		let outStr = "";
		for (let i = 0; i < array.length; ++i) {
			outStr += array[i];
			if (i < array.length-2) outStr += joiner;
			else if (i === array.length-2) outStr += lastJoiner
		}
		return outStr;
	}
}

function uppercaseFirst(string) {
	return string.uppercaseFirst();
}

function utils_combineText(textList, tagPerItem, textBlockInlineTitle) {
	tagPerItem = tagPerItem === undefined ? null : tagPerItem;
	textBlockInlineTitle = textBlockInlineTitle === undefined ? null : textBlockInlineTitle;
	let textStack = "";
	if (typeof textList === TYP_STRING) {
		return getString(textList, true)
	}
	for (let i = 0; i < textList.length; ++i) {
		if (typeof textList[i] === TYP_OBJECT) {
			if (textList[i].islist === "YES") {
				textStack += utils_makeOldList(textList[i]);
			}
			if (textList[i].type === "list") {
				textStack += utils_makeList(textList[i]);
			}
			if (textList[i].hassubtitle === "YES") {
				// if required, add inline header before we go deeper
				if (textBlockInlineTitle !== null && i === 0) {
					textStack += textBlockInlineTitle;
				}
				textStack += utils_combineText(textList[i].text, tagPerItem, utils_makeSubHeader(textList[i].title));
			}
			if (textList[i].istable === "YES") {
				textStack += utils_makeTable(textList[i]);
			}
			if (textList[i].hassavedc === "YES") {
				textStack += utils_makeAttDc(textList[i]);
			}
			if (textList[i].hasattackmod === "YES") {
				textStack += utils_makeAttAttackMod(textList[i]);
			}
		} else {
			textStack += getString(textList[i], textBlockInlineTitle !== null && i === 0)
		}
	}
	return textStack;

	function getString(text, addTitle) {
		const openTag = tagPerItem === null ? "" : "<" + tagPerItem + ">";
		const closeTag = tagPerItem === null ? "" : "</" + tagPerItem + ">";
		const inlineTitle = addTitle ? textBlockInlineTitle : "";
		return openTag + inlineTitle + text + closeTag;
	}
}

function utils_makeTable(tableObject) {
	let tableStack = "<table class='table'>";
	if (tableObject.caption !== undefined) {
		tableStack += "<caption>" + tableObject.caption + "</caption>";
	}
	tableStack += "<thead><tr class='table-row table-row--header'>";

	for (let i = 0; i < tableObject.thead.length; ++i) {
		tableStack += "<th" + makeTableThClassText(tableObject, i) + ">" + tableObject.thead[i] + "</th>"
	}

	tableStack += "</tr></thead><tbody>";
	for (let i = 0; i < tableObject.tbody.length; ++i) {
		tableStack += "<tr class='table-row'>";
		for (let j = 0; j < tableObject.tbody[i].length; ++j) {
			tableStack += "<td" + makeTableTdClassText(tableObject, j) + ">" + tableObject.tbody[i][j] + "</td>";
		}
		tableStack += "</tr>";
	}
	tableStack += "</tbody></table>";
	return tableStack;
}

function utils_makeAttDc(attDcObj) {
	return "<p class='spellabilitysubtext'><span>" + attDcObj.name
		+ " save DC</span> = 8 + your proficiency bonus + your "
		+ utils_makeAttChoose(attDcObj.attributes) + "</p>"
}

function utils_makeAttAttackMod(attAtkObj) {
	return "<p class='spellabilitysubtext'><span>" + attAtkObj.name
		+ " attack modifier</span> = your proficiency bonus + your "
		+ utils_makeAttChoose(attAtkObj.attributes) + "</p>"
}

function utils_makeLink(linkObj) {
	let href;
	if (linkObj.href.type === "internal") {
		href = `${linkObj.href.path}#`;
		if (linkObj.href.hash !== undefined) {
			if (linkObj.href.hash.type === "constant") {
				href += linkObj.href.hash.value;
			} else if (linkObj.href.hash.type === "multipart") {
				const partStack = [];
				for (let i = 0; i < linkObj.href.hash.parts.length; i++) {
					const part = linkObj.href.hash.parts[i];
					partStack.push(`${part.key}:${part.value}`)
				}
				href += partStack.join(",");
			}
		}
	} else if (linkObj.href.type === "external") {
		href = linkObj.href.url;
	}
	return `<a href='${href}'>${linkObj.text}</a>`;
}

function utils_makeOldList(listObj) {
	let outStack = "<ul>";
	for (let i = 0; i < listObj.items.length; ++i) {
		const cur = listObj.items[i];
		outStack += "<li>";
		for (let j = 0; j < cur.entries.length; ++j) {
			if (cur.entries[j].hassubtitle === "YES") {
				outStack += "<br>" + utils_makeListSubHeader(cur.entries[j].title) + cur.entries[j].entries;
			} else {
				outStack += cur.entries[j];
			}
		}
		outStack += "</li>";
	}
	return outStack + "</ul>";
}

function utils_makeList(listObj) {
	let listTag = "ul";
	const subtype = listObj.subtype;
	let suffix = "";
	if(subtype === "ordered") {
		listTag = "ol";
		if (listObj.ordering) suffix = " type=\""+listObj.ordering+"\"";
	}//NOTE: "description" lists are more complex - can handle those later if required
	let outStack = "<"+listTag+suffix+">";
	for (let i = 0; i < listObj.items.length; ++i) {
		const listItem = listObj.items[i];
		outStack += "<li>";
		for (let j = 0; j < listItem.length; ++j) {
			if (listItem[j].type === "link") {
				outStack += utils_makeLink(listItem[j]);
			} else {
				outStack += listItem[j];
			}
		}
		outStack += "</li>";
	}
	return outStack + "</"+listTag+">";
}

function utils_makeSubHeader(text) {
	return "<span class='stats-sub-header'>" + text + ".</span> "
}

function utils_makeListSubHeader(text) {
	return "<span class='stats-list-sub-header'>" + text + ".</span> "
}

function utils_makeAttChoose(attList) {
	if (attList.length === 1) {
		return Parser.attAbvToFull(attList[0]) + " modifier";
	} else {
		const attsTemp = [];
		for (let i = 0; i < attList.length; ++i) {
			attsTemp.push(Parser.attAbvToFull(attList[i]));
		}
		return attsTemp.join(" or ") + " modifier (your choice)";
	}
}

function utils_makeRoller(text) {
	if (text) {
		const DICE_REGEX = /([1-9]\d*)?d([1-9]\d*)(\s?[+-]\s?\d+)?/g;
		return text.replace(DICE_REGEX, "<span class='roller' data-roll='$&'>$&</span>")
			.replace(/(-|\+)?\d+(?= to hit)/g, "<span class='roller' data-roll='1d20$&'>$&</span>")
			.replace(/(-|\+)?\d+(?= bonus to)/g, "<span class='roller' data-roll='1d20$&'>$&</span>")
			.replace(/(bonus of )(=?-|\+\d+)/g, "$1<span class='roller' data-roll='1d20$2'>$2</span>");
	}
}

function makeTableThClassText(tableObject, i) {
	return tableObject.thstyleclass === undefined || i >= tableObject.thstyleclass.length ? " class=\"table-cell\"" : " class=\"table-cell " + tableObject.thstyleclass[i] + "\"";
}

function makeTableTdClassText(tableObject, i) {
	if (tableObject.tdstyleclass !== undefined) {
		return tableObject.tdstyleclass === undefined || i >= tableObject.tdstyleclass.length ? " class=\"table-cell\"" : " class=\"table-cell " + tableObject.tdstyleclass[i] + "\"";
	} else {
		return makeTableThClassText(tableObject, i);
	}
}

function utils_makePrerequisite(prereqList, shorthand, makeAsArray) {
	shorthand = shorthand === undefined || shorthand === null ? false : shorthand;
	makeAsArray = makeAsArray === undefined || makeAsArray === null ? false : makeAsArray;
	const outStack = [];
	if (prereqList === undefined || prereqList === null) return "";
	for (let i = 0; i < prereqList.length; ++i) {
		const pre = prereqList[i];
		if (pre.race !== undefined) {
			for (let j = 0; j < pre.race.length; ++j) {
				if (shorthand) {
					const DASH = "-";
					const raceNameParts = pre.race[j].name.split(DASH);
					let raceName = [];
					for (let k = 0; k < raceNameParts.length; ++k) {
						raceName.push(raceNameParts[k].uppercaseFirst());
					}
					raceName = raceName.join(DASH);
					outStack.push(raceName + (pre.race[j].subrace !== undefined ? " (" + pre.race[j].subrace + ")" : ""))
				} else {
					const raceName = j === 0 ? pre.race[j].name.uppercaseFirst() : pre.race[j].name;
					outStack.push(raceName + (pre.race[j].subrace !== undefined ? " (" + pre.race[j].subrace + ")" : ""))
				}
			}
		}
		if (pre.ability !== undefined) {
			// this assumes all ability requirements are the same (13), correct as of 2017-10-06
			let attCount = 0;
			for (let j = 0; j < pre.ability.length; ++j) {
				for (const att in pre.ability[j]) {
					if (!pre.ability[j].hasOwnProperty(att)) continue;
					if (shorthand) {
						outStack.push(att.uppercaseFirst());
					} else {
						outStack.push(Parser.attAbvToFull(att) + (attCount === pre.ability.length -1 ? " 13 or higher" : ""));
					}
					attCount++;
				}
			}
		}
		if (pre.proficiency !== undefined) {
			// only handles armor proficiency requirements,
			for (let j = 0; j < pre.proficiency.length; ++j) {
				for (const type in pre.proficiency[j]) { // type is armor/weapon/etc.
					if (!pre.proficiency[j].hasOwnProperty(type)) continue;
					if (type === "armor") {
						if (shorthand) {
							outStack.push("Armor Prof: " + util_capitalizeAll(pre.proficiency[j][type]));
						} else {
							outStack.push("Proficiency with " + util_capitalizeAll(pre.proficiency[j][type]) + " Armor");
						}
					}
					if (type ===  "weapon") {
						if (shorthand) {
							outStack.push("Weapon Prof: " + Parser.armorFullToAbv(util_capitalizeAll(pre.proficiency[j][type])));
						} else {
							outStack.push("Proficiency with " + util_capitalizeAll(pre.proficiency[j][type]) + " Weapons");
						}
					}
				}
			}
		}
		if (pre.spell !== undefined) {
			for (let spell of pre.spell) {
				const spellArray = spell.split("#");
				const spellStr = spellArray[0];
				if (shorthand) {
					outStack.push(`<a href="#/spells/${spellStr}">${util_capitalizeAll(spellStr)}</a>`);
				} else {
					if (spellStr.toLowerCase() === 'hex/curse') {
						outStack.push(`<a href="#/spells/hex">Hex</a> or a warlock feature that curses`);
					} else {
						outStack.push(`<a href="#/spells/${spellStr}">${util_capitalizeAll(spellStr)}</a>`);
					}
				}
			}
		}
		if (pre.pact !== undefined) {
			if (shorthand) {
				outStack.push(pre.pact + " Pact");
			} else {
				outStack.push("Pact of the " + pre.pact);
			}
		}
		if (pre.level !== undefined) {
			if (shorthand) {
				outStack.push('Level ' + pre.level.level);
			} else {
				outStack.push(`Level ${pre.level.level} ${pre.level.class.name}`);
			}
		}
		if (pre.patron !== undefined) {
			if (shorthand) {
				outStack.push(pre.patron + " Patron");
			} else {
				outStack.push(pre.patron + " Patron");
			}
		}
		if (pre.item !== undefined) {
			for (let item of pre.item) {
				if (!shorthand) {
					outStack.push(item);
				}
			}
		}
		if (pre.otherSummary !== undefined) {
			if (shorthand) {
				outStack.push(pre.otherSummary.entrySummary);
			} else {
				outStack.push(pre.otherSummary.entry);
			}
		}
		if (pre.other) {
			outStack.push(pre.other);
		}
		if (pre.spellcasting || pre.spellcasting2020) {
			if (shorthand) {
				outStack.push("Spellcasting");
			} else {
				outStack.push("The ability to cast at least one spell");
			}
		}
		if (pre.psionics) {
			if (shorthand) {
				outStack.push("Psionics");
			} else {
				outStack.push("The ability to use Psionics");
			}
		}
	}
	if (makeAsArray) {
		return outStack;
	} else {
		if (shorthand) return outStack.join(" / ") || "--";
		else return utils_joinPhraseArray(outStack, ", ", ", ");
	}
}

function parse_backgroundSkills(skillsProf) {
	let result = "";
	for (let option of skillsProf) {
		let props = [];
		for (let key of Object.keys(option)) {
			if (key === "choose") {
				let choice = option[key],
					number = choice.count !== undefined ? choice.count : 1;
				result += `${number} of ${choice.from.map(util_capitalizeAll).join(', ')}; `
			} else {
				props.push(util_capitalizeAll(key));
			}
		}
		result += props.join(', ');
		result += " OR "
	}
	result = result.substring(0, result.length - 4);
	return result;
}

function util_capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

function util_capitalizeAll(str) {
	return str.split(' ').map(util_capitalize).join(' ');
}

function hasBeenReprinted(shortName, source) {
	return (shortName !== undefined && shortName !== null && source !== undefined && source !== null) &&
		(shortName === "Sun Soul" && source === SRC_SCAG) ||
		(shortName === "Mastermind" && source === SRC_SCAG) ||
		(shortName === "Swashbuckler" && source === SRC_SCAG) ||
		(shortName === "Storm" && source === SRC_SCAG);
}

function isNonstandardSource(source) {
	return (source !== undefined && source !== null) && (source.startsWith(SRC_UA_PREFIX) || source === SRC_PSA || source === SRC_PSK || source === SRC_EEPC || source === SRC_PSI || source === SRC_PSZ);
}

function toggleCheckBox(cb) {
	if (cb.checked === true) cb.checked = false;
	else cb.checked = true;
}

function stopEvent(event) {
	event.stopPropagation();
	event.preventDefault();
}

function toggleVisible(element) {
	if (isShowing(element)) hide(element);
	else show(element);
}

function isShowing(element) {
	return element.hasAttribute(ATB_STYLE) && element.getAttribute(ATB_STYLE).includes(STL_DISPLAY_INITIAL);
}

function show(element) {
	element.setAttribute(ATB_STYLE, STL_DISPLAY_INITIAL);
}

function hide(element) {
	element.setAttribute(ATB_STYLE, STL_DISPLAY_NONE);
}

function xor(a, b) {
	return !a !== !b;
}

function implies(a, b) {
	return (!a) || b;
}

function search(options, rootEl) {
	const list = new List(rootEl.getElementById("listcontainer"), options);
	list.sort("name");
	rootEl.getElementById("reset").addEventListener('click', function() {
		rootEl.getElementById("search-field").value = "";
		list.search();
		list.sort("name");
		list.filter();
	});
	const listWrapper = rootEl.getElementById("listcontainer");
	if (listWrapper.lists) {
		listWrapper.lists.push(list);
	} else {
		listWrapper.lists = [list];
	}
	return list
}

function getSourceFilter(options) {
	const baseOptions = {
		header: "Source",
		displayFn: Parser.sourceJsonToFullCompactPrefix,
		selFn: defaultSourceSelFn
	};
	return getFilterWithMergedOptions(baseOptions, options);
}

function defaultSourceDeselFn(val) {
	return val.startsWith(SRC_UA_PREFIX) || val.startsWith(SRC_PS_PREFIX) || val.endsWith(SRC_3PP_SUFFIX);
}

function defaultSourceSelFn(val) {
	return !defaultSourceDeselFn(val);
}

function getAsiFilter(options) {
	const baseOptions = {
		header: "Ability Bonus",
		items: [
			"str",
			"dex",
			"con",
			"int",
			"wis",
			"cha"
		],
		displayFn: Parser.attAbvToFull
	};
	return getFilterWithMergedOptions(baseOptions, options);

	function filterAsiMatch(valGroup, parsedAsi) {
		return (valGroup[STR_NONE] && parsedAsi.asText === STR_NONE)
			|| (valGroup[ABIL_CH_ANY] && parsedAsi.asText.toLowerCase().includes("choose any"))
			|| parsedAsi.asCollection.filter(a => valGroup[Parser.attAbvToFull(a)]).length > 0;
	}
	function filterAsiMatchInverted(valGroup, parsedAsi) {
		return ( implies(parsedAsi.asText === STR_NONE, valGroup[STR_NONE]) )
			&& ( implies(parsedAsi.asText.toLowerCase().includes("choose any"), valGroup[ABIL_CH_ANY]) )
			&& (parsedAsi.asCollection.filter(a => !valGroup[Parser.attAbvToFull(a)]).length === 0);
	}
}

function getFilterWithMergedOptions(baseOptions, addOptions) {
	if (addOptions) Object.assign(baseOptions, addOptions); // merge in anything we get passed
	return new Filter(baseOptions);
}

function initFilterBox(rootEl, ...filterList) {
	return new FilterBox(rootEl, filterList);
}

function encodeForHash(toEncode) {
	if (Array.isArray(toEncode)) {
		return toEncode.map(i => encodeForHashHelper(i)).join(HASH_LIST_SEP);
	} else {
		return encodeForHashHelper(toEncode);
	}
	function encodeForHashHelper(part) {
		return encodeURIComponent(part).replace("'","%27")
	}
}

function decodeForHash(toDecode) {
	if (toDecode[0] === '#') {
		toDecode = toDecode.substring(1);
	}
  if (toDecode.indexOf(HASH_LIST_SEP) > -1) {
		return toDecode.split(HASH_LIST_SEP).map(i => decodeForHashHelper(i));
  } else {
    return [decodeForHashHelper(toDecode)];
  }
  function decodeForHashHelper(part) {
    return decodeURIComponent(part).replace("%27", "'");
  }
}

function ascSort(a, b) {
	if (b === a) return 0;
	return b < a ? 1 : -1;
}

function asc_sort(a, b){
	if ($(b).text() === $(a).text()) return 0;
	return $(b).text() < $(a).text() ? 1 : -1;
}

function asc_sort_cr(a, b) {
	const aNum = Parser.crToNumber($(a).text());
	const bNum = Parser.crToNumber($(b).text());
	if (aNum === bNum) return 0;
	return bNum < aNum ? 1 : -1;
}

function compareNames(a, b) {
	if (b._values.name.toLowerCase() === a._values.name.toLowerCase()) return 0;
	else if (b._values.name.toLowerCase() > a._values.name.toLowerCase()) return 1;
	else if (b._values.name.toLowerCase() < a._values.name.toLowerCase()) return -1;
}

function getEntryName(entry) {
	if (entry.name) {
		return entry.name;
	} else if (entry[0]) {
		return getEntryName(entry[0]);
	} else if (entry.entries) {
		return getEntryName(entry.entries);
	}
}

function joinConjunct(arr, joinWith, conjunctWith) {
	return arr.length === 1 ? String(arr[0]) : arr.length === 2 ? arr.join(conjunctWith) : arr.slice(0, -1).join(joinWith) + conjunctWith + arr.slice(-1);
}

function parseHTML(str, isTable, isInner) {
	var tmp = document.implementation.createHTMLDocument();
	if (isTable) {
		tmp.body.innerHTML = "<table><tbody>" + str + "</tbody></table>";
		if (isInner) {
			return tmp.body.children[0].children[0].children[0].children.length === 1
				? tmp.body.children[0].children[0].children[0].children[0]
				: tmp.body.children[0].children[0].children[0];
		}
		return tmp.body.children[0].children[0].children.length === 1
      ? tmp.body.children[0].children[0].children[0]
      : tmp.body.children[0].children[0];
	} else {
		tmp.body.innerHTML = str;
		return tmp.body.children.length === 1 ? tmp.body.children[0] : tmp.body.children;
	}
}

function getHiddenModeList(psionic) {
  const modeList = psionic.modes;
  if (modeList === undefined) return STR_EMPTY;
  const outArray = [];
  for (let i = 0; i < modeList.length; ++i) {
    outArray.push(`"{0}"`.formatUnicorn(modeList[i].title));
    if (modeList[i].submodes !== undefined) {
      const subModes = modeList[i].submodes;
      for (let j = 0; j < subModes.length; ++j) {
        outArray.push(`"{0}"`.formatUnicorn(subModes[j].title));
      }
    }
  }
  return outArray.join(",");
}

function jqHeight(el) {
	return parseFloat(getComputedStyle(el, null).height.replace("px", ""));
}

function jqPrepend(parent, childs) {
	if (!Node.prototype.isPrototypeOf(childs)) {
		const beforeHere = parent.firstChild;
		Array.from(childs).forEach(child => {
			parent.insertBefore(child, beforeHere);
		});
  } else {
		parent.insertBefore(childs, parent.firstChild);
  }
}

function jqAfter(after, insertEl) {
	const insertBefore = after.nextSibling;
  const insertIn = insertBefore.parentElement;
  insertIn.insertBefore(insertEl, insertBefore);
}

function jqWrap(el, wrapper) {
	var temp = document.createElement("div"),
    parent = el.parentNode,
    insertWhere = el.previousSibling,
    target;

	temp.innerHTML = wrapper;
	target = temp.firstChild;

	while (target.firstChild) {
		target = target.firstChild;
	}

	target.appendChild(el);

	parent.insertBefore(temp.firstChild, (insertWhere ? insertWhere.nextSibling : parent.firstChild));
}

function jqOffset(el) {
	var rect = el.getBoundingClientRect();
	return {
		top: rect.top + document.body.scrollTop,
		left: rect.left + document.body.scrollLeft
	}
}

function jqEmpty(el) {
	while(el.firstChild) {
		el.removeChild(el.firstChild);
	}
}

function parse_psionicTypeToFull(type) {
  if (type === "T") return "Talent";
  else if (type === "D") return "Discipline";
  else return type;
}

function parse_psionicOrderToFull(order) {
  return order === undefined ? "None" : order;
}

function getTblTimeStr(time) {
  if (time.number === 1 && ["action", "bonus action", "reaction", "round"].includes(time.unit)) {
    return time.unit.uppercaseFirst();
  } else {
    return Parser.getTimeToFull(time);
  }
}

function getRangeType(range) {
  switch (range.type) {
    case RNG_SPECIAL:
      return "Special";
    case RNG_POINT:
      switch (range.distance.type) {
        case RNG_SELF:
          return "Self";
        case RNG_TOUCH:
          return "Touch";
        default:
          return "Point";
      }
    case RNG_LINE:
    case RNG_CONE:
    case RNG_RADIUS:
    case RNG_HEMISPHERE:
    case RNG_SPHERE:
    case RNG_CUBE:
      return "Area";
  }
}

function getFltrSpellLevelStr(level) {
	return level === 0 ? Parser.spLevelToFull(level) : Parser.spLevelToFull(level) + " level";
}

function getNormalisedTime(time) {
	const firstTime = time[0];
	let multiplier = 1;
	let offset = 0;
	switch (firstTime.unit) {
		case "bonus action":
			offset = 1;
			break;
		case "reaction":
			offset = 2;
			break;
		case "round":
			multiplier = 6;
			break;
		case "minute":
			multiplier = 60;
			break;
		case "hour":
			multiplier = 3600;
			break;
	}
	if (time.length > 1) offset += 1;
	return (multiplier * firstTime.number) + offset;
}

function getNormalisedRange(range) {
	let multiplier = 1;
	let distance = 0;
	let offset = 0;

	switch(range.type) {
		case RNG_SPECIAL:
			return 1000000000;
		case RNG_POINT:
			adjustForDistance();
			break;
		case RNG_LINE:
			offset = 1;
			adjustForDistance();
			break;
		case RNG_CONE:
			offset = 2;
			adjustForDistance();
			break;
		case RNG_RADIUS:
			offset = 3;
			adjustForDistance();
			break;
		case RNG_HEMISPHERE:
			offset = 4;
			adjustForDistance();
			break;
		case RNG_SPHERE:
			offset = 5;
			adjustForDistance();
			break;
		case RNG_CUBE:
			offset = 6;
			adjustForDistance();
			break;
	}

	// value in inches, to allow greater granularity
	return (multiplier * distance) + offset;

	function adjustForDistance() {
		const dist = range.distance;
		switch (dist.type) {
			case UNT_FEET:
				multiplier = 12;
				distance = dist.amount;
				break;
			case UNT_MILES:
				multiplier = 12*5280;
				distance = dist.amount;
				break;
			case RNG_SELF:
				distance = 0;
				break;
			case RNG_TOUCH:
				distance = 1;
				break;
			case RNG_SIGHT:
				multiplier = 5280*5280;
				distance = 12; // assume sight range of person ~100 ft. above the ground
				break;
			case RNG_UNLIMITED_SAME_PLANE: // from BolS, if/when it gets restored
				distance = 900000000;
				break;
			case RNG_UNLIMITED:
				distance = 900000001;
				break;
		}
	}
}

function getTimeDisplay(timeUnit) {
	const TIME_UNITS_TO_FULL = {
		"action": "Action",
		"bonus action": "Bonus Action",
		"reaction": "Reaction",
		"round": "Rounds",
		"minute": "Minutes",
		"hour": "Hours"
	};
	return TIME_UNITS_TO_FULL[timeUnit];
}

function getClassFilterStr(c) {
	const nm = c.name.split("(")[0].trim();
	return `${nm}${c.source !== SRC_PHB ? ` (${Parser.sourceJsonToAbv(c.source)})` : ""}`;
}

function selNotUaEepc(val) {
	return val !== SRC_EEPC && !val.startsWith(SRC_UA_PREFIX);
}

function getMetaFilterObj(s) {
	const out = [];
	if (s.meta && s.meta.ritual) out.push("Ritual");
	if (s.meta && s.meta.technomagic) out.push("Technomagic");
	if (s.duration.filter(d => d.concentration).length) out.push("Concentration");
	if (s.components) {
		if (s.components.v) out.push("Verbal");
		if (s.components.s) out.push("Somatic");
		if (s.components.m) out.push("Material");
	}
	return out;
}

function getRuleSearchStackNames(nameStack, entry) {
  if (entry.name) nameStack.push(entry.name);
  if (entry.entries) {
    for (const eX of entry.entries) {
      getRuleSearchStackNames(nameStack, eX);
    }
  }
  if (entry.items) {
    for (const eX of entry.items) {
      getRuleSearchStackNames(nameStack, eX);
    }
  }
}

function cloneDeep(obj) {
	return JSON.parse(JSON.stringify(obj));
}

function getFromPath(obj, pathStr) {
	let result = obj;
	let paths = pathStr.split('.');
	for (let path of paths) {
		result = result[path];
	}
	return result;
}

function initCollapseToggles(rootEl) {
	const toggles = rootEl.querySelectorAll(".collapse .collapse-toggle");
	for (let toggle of toggles) {
		
		let collapse = toggle.parentElement,
			list = collapse.querySelector(".collapse-list");

		if (!collapse.classList.contains('collapse--init')) {
			collapse.classList.add('collapse--init')
			setTimeout(() => {
				list.classList.add('no-transition');
				if (!collapse.classList.contains("open")) {
					list.style["margin-top"] = "-" + list.getBoundingClientRect().height + "px";
				} else {
					list.style["margin-top"] = "0px";
				}
				setTimeout(() => {
					list.classList.remove('no-transition');
				}, 300);
			}, 1);

			toggle.addEventListener("click", e => {
				if (collapse.classList.contains("open")) {
					list.style["margin-top"] = "-" + list.getBoundingClientRect().height + "px";
				} else {
					list.style["margin-top"] = "0px";
				}
				collapse.classList.toggle("open");
			});
		}
	}
}

function findInPath(selector, event) {
	const path = event.path || event.composedPath();
	return path.find(el => {
		return el.matches && el.matches(selector);
	});
}

function getProfBonus(level) {
	return Math.ceil(level / 4) + 1;
}

function dashToCaplital(string) {
	return string.replace( /-([a-z])/ig, function( all, letter ) {
			return " " + letter.toUpperCase();
	});
}


function absInt(int) {
	return int > 0 ? "+" + int : int;
}

function entrySearch(searchStr, entries) {
	if (Array.isArray(entries)) {
		for (const entry of entries) {
			if (entry.name === searchStr) {
				return entry;
			} else if (entry.type === "list") {
				return entrySearch(searchStr, entry.items);
			} else if (entry.entries) {
				return entrySearch(searchStr, entry.entries);
			}
		}
	}
}

function entryTextSearch(searchStr, entries) {
	if (Array.isArray(entries)) {
		for (const entry of entries) {
			if (entry.indexOf && entry.indexOf(searchStr) > -1) {
				return entry;
			} else if (entry.type === "list") {
				return entrySearch(searchStr, entry.items);
			} else if (entry.entries) {
				return entrySearch(searchStr, entry.entries);
			}
		}
	}
}

function getItemTypes(curItem) {
	const type = [];
	if (curItem.wondrous) type.push("Wondrous Item");
	if (curItem.technology) type.push(curItem.technology);
	if (curItem.age) type.push(curItem.age);
	if (curItem.weaponCategory) type.push(curItem.weaponCategory + " Weapon");
	if (curItem.type) type.push(Parser.itemTypeToAbv(curItem.type));
	return type;
}

function getItemTypeText(curItem) {
	return getItemTypes(curItem).join(',');
}

function downloadObjectAsJson(exportObj, exportName) {
	var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
	var downloadAnchorNode = document.createElement('a');
	downloadAnchorNode.setAttribute("href",     dataStr);
	downloadAnchorNode.setAttribute("download", exportName + ".json");
	document.body.appendChild(downloadAnchorNode); // required for firefox
	downloadAnchorNode.click();
	downloadAnchorNode.remove();
}

function getInnerText(str) {
	const div = document.createElement('div');
	div.innerHTML = str;
	return div.innerText;
}

function isFirstCharNum(str) {
	return str && str.match && str.match(new RegExp(/^\d/)) !== null;
}


export {
  throttle,
  debounce,
  timeout,
  utils_joinPhraseArray,
  uppercaseFirst,
  utils_combineText,
  utils_makeTable,
  utils_makeAttDc,
  utils_makeAttAttackMod,
  utils_makeLink,
  utils_makeOldList,
  utils_makeList,
  utils_makeSubHeader,
  utils_makeListSubHeader,
  utils_makeAttChoose,
  utils_makeRoller,
  makeTableThClassText,
  makeTableTdClassText,
  utils_makePrerequisite,
  hasBeenReprinted,
  isNonstandardSource,
  toggleCheckBox,
  stopEvent,
  toggleVisible,
  isShowing,
  show,
  hide,
  xor,
  implies,
  search,
  getSourceFilter,
  defaultSourceDeselFn,
  defaultSourceSelFn,
  getAsiFilter,
  getFilterWithMergedOptions,
  initFilterBox,
  encodeForHash,
  decodeForHash,
  ascSort,
  asc_sort,
  asc_sort_cr,
  compareNames,
  joinConjunct,
  parseHTML,
  jqHeight,
  jqPrepend,
  jqAfter,
	jqWrap,
	jqOffset,
	jqEmpty,
  getHiddenModeList,
  parse_psionicTypeToFull,
	parse_psionicOrderToFull,
	parse_backgroundSkills,
	util_capitalize,
	util_capitalizeAll,
  getTblTimeStr,
  getRangeType,
  getFltrSpellLevelStr,
  getNormalisedTime,
  getNormalisedRange,
  getTimeDisplay,
  getClassFilterStr,
  selNotUaEepc,
  getMetaFilterObj,
  getRuleSearchStackNames,
  cloneDeep,
  getFromPath,
	initCollapseToggles,
	findInPath,
	dashToCaplital,
	getEntryName,
	absInt,
	entrySearch,
	getProfBonus,
	entryTextSearch,
	getItemTypes,
	getItemTypeText,
	downloadObjectAsJson,
	getInnerText,
	isFirstCharNum,
};