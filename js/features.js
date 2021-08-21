import { utils_makePrerequisite, utils_joinPhraseArray } from "../js/utils.js";
import { parse_abilityLong } from "../util/ability.js";
import Parser from '../util/Parser.js';
import EntryRenderer from "../util/entryrender.js";

const renderer = new EntryRenderer();

const stats_wrapper = `
	<div class="stats-wrapper margin-bottom_large">
    <div class="source margin-bottom_small"></div>
    <div class="type margin-bottom_small"></div>
		<div class="prerequisite margin-bottom_small"></div>
		<div class="text"></div>
	</div>`;

function renderSelection(feature, rootEl) {
	rootEl.querySelector(".selection-wrapper").innerHTML = stats_wrapper;

	let sourceEl = rootEl.querySelector('.stats-wrapper .source');
	sourceEl.classList.add(`source${feature.source}`);
	sourceEl.setAttribute("title", Parser.sourceJsonToFull(feature.source));
	sourceEl.innerHTML = `${Parser.sourceJsonToAbv(feature.source)}`;

  let typeArray = feature.featureType ? Array.isArray(feature.featureType) ? feature.featureType : [feature.featureType] : [];
	rootEl.querySelector('.stats-wrapper .type').innerHTML = utils_joinPhraseArray(typeArray.map(t => {return Parser.featureJsonToAbv(t)}), ", ", " and ")

	const prerequisite = utils_makePrerequisite(feature.prerequisite);
	rootEl.querySelector('.stats-wrapper .prerequisite').innerHTML = (prerequisite ? "Prerequisite: " + prerequisite : "");
	
	if (feature.ability) {
		for (let entry of feature.entries) { 
			// insert the new list item at the head of the first list we find list; flag with "hasabilityitem" so we don't do it more than once
			if (entry.type === "list" && !entry.hasabilityitem) {
				entry.hasabilityitem = true;
				entry.items.unshift(parse_abilityLong(feature.ability))
			}
		}
	}
	
	if (feature.entries.length) {
		let outstack = [];
		for (let entry of feature.entries) {
			renderer.recursiveEntryRender(entry, outstack, 0);
		}
		rootEl.querySelector('.stats-wrapper .text').innerHTML = outstack.join(' ');
	}
}

export { renderSelection };