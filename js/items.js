import EntryRenderer from '../util/entryrender.js';
import Parser from '../util/Parser.js';
import { cloneDeep, utils_makeRoller } from '../js/utils.js';

const stats_wrapper = `
	<div class="stats-wrapper margin-bottom_large">
		<div class="margin-bottom_small">
			<span class="type"></span><span class="rarity"></span>
			<span class="attunement"></span>
		</div>
		<div class="margin-bottom_small">
			<span class="value"></span><span class="weight"></span>
		</div>
		<div class="margin-bottom_small">
			<span class="damage"></span>
			<span class="damageType"></span>
			<span class="properties"></span>
		</div>
		<div class="text"></div>
		<div class="margin-bottom_small">Source: <span class="source"></span></div>
	</div>`;

const renderer = new EntryRenderer();
function renderSelection(item, rootEl, hideFirstLine) {
	adjustItem(item);
	const wrap = rootEl.querySelector(".selection-wrapper") || rootEl;
	wrap.innerHTML = stats_wrapper;
	
	const source = item.source;
	const sourceFull = Parser.sourceJsonToFull(source);
	rootEl.querySelector(".stats-wrapper .source").innerHTML = (`${sourceFull}, page ${item.page}`);

	rootEl.querySelector(".stats-wrapper .value").innerHTML = (item.value ? item.value+(item.weight ? ", " : "") : "");
	rootEl.querySelector(".stats-wrapper .weight").innerHTML = (item.weight ? item.weight+(item.weight == 1 ? " lb." : " lbs.") : "");
	rootEl.querySelector(".stats-wrapper .rarity").innerHTML = ((item.tier ? ", "+item.tier : "")+(item.rarity ? ", "+item.rarity : ""));
	rootEl.querySelector(".stats-wrapper .attunement").innerHTML = (item.reqAttune ? item.reqAttune : "");
	rootEl.querySelector(".stats-wrapper .type").innerHTML = (item.typeText);

	rootEl.querySelector(".stats-wrapper .damage").innerHTML = ("");
	rootEl.querySelector(".stats-wrapper .damageType").innerHTML = ("");
	const type = item.type || "";
	if (item.weaponCategory) {
		if (item.damages && item.damages.length) {
			for (let i = 0; i < item.damages.length; i++) {
				const damage = item.damages[i];
				const isLast = i === item.damages.length - 1;
				if (damage.roll && damage.type) {
					rootEl.querySelector(".stats-wrapper .damage").innerHTML += `<span>${utils_makeRoller(damage.roll)} ${Parser.dmgTypeToFull(damage.type)}</span>${isLast ? '': ' + '}`
				}
			}
		} else {
			if(item.dmg1) rootEl.querySelector(".stats-wrapper .damage").innerHTML = (utils_makeRoller(item.dmg1));
			if(item.dmgType) rootEl.querySelector(".stats-wrapper .damageType").innerHTML = (Parser.dmgTypeToFull(item.dmgType));
		}
	} else if (type === "LA" ||type === "MA"|| type === "HA") {
		rootEl.querySelector(".stats-wrapper .damage").innerHTML = ("AC "+item.ac+(type === "LA" ? " + Dex" : type === "MA" ? " + Dex (max 2)" : ""));
	} else if (type === "S") {
		rootEl.querySelector(".stats-wrapper .damage").innerHTML = ("AC +"+item.ac);
	} else if (type === "MNT" || type === "VEH") {
		const speed=item.speed;
		const capacity=item.carryingcapacity;
		if (speed) rootEl.querySelector(".stats-wrapper .damage").append("Speed="+speed);
		if (speed && capacity) rootEl.querySelector(".stats-wrapper .damage").append(type === "MNT" ? ", " : "<br>");
		if (capacity) {
			rootEl.querySelector(".stats-wrapper .damage").append("Carrying Capacity="+capacity);
			if (capacity.indexOf("ton") === -1 && capacity.indexOf("passenger") === -1) rootEl.querySelector(".stats-wrapper .damage").append(capacity == 1 ? " lb." : " lbs.");
		}
	}

	rootEl.querySelector(".stats-wrapper .properties").innerHTML = ("");
	if (item.property) {
		const properties = item.property.split(",");
		for (let i = 0; i < properties.length; i++) {
			const prop = properties[i];
			let a = window.itemPropertyList[prop].name;
			if (prop === "V" && item.dmg2) a = `${a} (${item.dmg2})`;
			if (prop === "T" || prop === "A" || prop === "AF") a = `${a} (${item.range}ft.)`;
			if (prop === "RLD") a = `${a} (${item.reload} shots)`;
			a = (i > 0 ? ", " : item.dmg1 ? "- " : "") + a;
			rootEl.querySelector(".stats-wrapper .properties").append(a);
		}
	}

	const entryList = {type: "entries", entries: item.entries};
	const renderStack = [];
	renderer.recursiveEntryRender(entryList, renderStack, 1);
	rootEl.querySelector(".stats-wrapper .text").innerHTML = (utils_makeRoller(renderStack.join("")).split(item.name.toLowerCase()).join("<i>"+item.name.toLowerCase()+"</i>"));
	if (hideFirstLine) {
		rootEl.querySelector(".margin-bottom_small").remove();
	}
}

function adjustItem(item) {
	if (item.hasParsed) {
		return;
	}
	item.hasParsed = true;
	if (item.noDisplay) {
		return;
	}
	if (item.type === "GV") {
		item.category = "Generic Variant";
	}
	if (item.category === undefined) {
		item.category = "Other";
	}
	if (item.entries === undefined) {
		item.entries = [];
	} else {
		item.entries = cloneDeep(item.entries);
	}
	if (item.type && window.itemTypeList[item.type]) {
		for (let j = 0; j < window.itemTypeList[item.type].entries.length; j++) {
			item.entries.push(window.itemTypeList[item.type].entries[j]);
		}
	}
	if (item.property) {
		const properties = item.property.split(",");
		for (let j = 0; j < properties.length; j++) {
			if (window.itemPropertyList[properties[j]].entries) {
				for (let k = 0; k < window.itemPropertyList[properties[j]].entries.length; k++) {
					item.entries.push(window.itemPropertyList[properties[j]].entries[k]);
				}
			}
		}
	}
	//The following could be encoded in JSON, but they depend on more than one JSON property; maybe fix if really bored later
	if (item.armor) {
		if (item.resist) {
			item.entries.push("You have resistance to "+item.resist+" damage while you wear this armor.");
		}
		if (item.armor && item.stealth) {
			item.entries.push("The wearer has disadvantage on Stealth (Dexterity) checks.");
		}
		if (item.type === "HA" && item.strength) {
			item.entries.push("If the wearer has a Strength score lower than " + item.strength + ", their speed is reduced by 10 feet.");
		}
	} else if (item.resist) {
		if (item.type === "P") {
			item.entries.push("When you drink this potion, you gain resistance to "+item.resist+" damage for 1 hour.");
		}
		if (item.type === "RG") {
			item.entries.push("You have resistance to "+item.resist+" damage while wearing this ring.");
		}
	}
	if (item.type === "SCF") {
		if (item.scfType === "arcane") {
			item.entries.push("An arcane focus is a special item designed to channel the power of arcane spells. A sorcerer, warlock, or wizard can use such an item as a spellcasting focus, using it in place of any material component which does not list a cost.");
		}
		if (item.scfType === "druid") {
			item.entries.push("A druid can use such a druidic focus as a spellcasting focus, using it in place of any material component that does not have a cost.");
		}
		if (item.scfType === "holy") {
			item.entries.push("A holy symbol is a representation of a god or pantheon.");
			item.entries.push("A cleric or paladin can use a holy symbol as a spellcasting focus, using it in place of any material components which do not list a cost. To use the symbol in this way, the caster must hold it in hand, wear it visibly, or bear it on a shield.");
		}
	}
}

export { renderSelection };