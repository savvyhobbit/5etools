import { utils_makePrerequisite } from "../js/utils.js";
import { parse_abilityLong } from "../util/ability.js";
import Parser from '../util/Parser.js';
import EntryRenderer from "../util/entryrender.js";

const renderer = new EntryRenderer();

const stats_wrapper = `
	<div class="stats-wrapper margin-bottom_large">
		<div class="source margin-bottom_small"></div>
		<div class="prerequisite margin-bottom_small"></div>
		<div class="text"></div>
	</div>`;

function renderSelection(feat, rootEl) {
	rootEl.querySelector(".selection-wrapper").innerHTML = stats_wrapper;

	let sourceEl = rootEl.querySelector('.stats-wrapper .source');
	sourceEl.classList.add(`source${feat.source}`);
	sourceEl.setAttribute("title", Parser.sourceJsonToFull(feat.source));
	sourceEl.innerHTML = `${Parser.sourceJsonToAbv(feat.source)}`;

	const prerequisite = utils_makePrerequisite(feat.prerequisite);
	rootEl.querySelector('.stats-wrapper .prerequisite').innerHTML = (prerequisite ? "Prerequisite: " + prerequisite : "");
	
	if (feat.ability) {
		for (let entry of feat.entries) { 
			// insert the new list item at the head of the first list we find list; flag with "hasabilityitem" so we don't do it more than once
			if (entry.type === "list" && !entry.hasabilityitem) {
				entry.hasabilityitem = true;
				entry.items.unshift(parse_abilityLong(feat.ability))
			}
		}
	}
	
	if (feat.entries.length) {
		let outstack = [];
		for (let entry of feat.entries) {
			renderer.recursiveEntryRender(entry, outstack, 0);
		}
		rootEl.querySelector('.stats-wrapper .text').innerHTML = outstack.join(' ');
	}
}

export { renderSelection };