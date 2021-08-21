import EntryRenderer from '../util/entryrender.js';
import Parser from '../util/Parser.js';
import { utils_makeRoller } from '../js/utils.js';

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
		if(item.dmg1) rootEl.querySelector(".stats-wrapper .damage").innerHTML = (utils_makeRoller(item.dmg1));
		if(item.dmgType) rootEl.querySelector(".stats-wrapper .damageType").innerHTML = (Parser.dmgTypeToFull(item.dmgType));
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
			if (prop === "V") a = `${a} (${utils_makeRoller(item.dmg2)})`;
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

export { renderSelection };