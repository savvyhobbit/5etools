import { utils_combineText } from "../js/utils.js";
import Parser from "../util/Parser.js";

const stats_wrapper = `
	<div class="stats-wrapper margin-bottom_large">
		<div class="source margin-bottom_small"></div>
		<div class="text"></div>
	</div>`;

function renderSelection(reward, rootEl) {
	rootEl.querySelector(".selection-wrapper").innerHTML = stats_wrapper;	
	const sourceEl = rootEl.querySelector('.stats-wrapper .source');
	sourceEl.classList.add(`source${reward.source}`);
	sourceEl.setAttribute('title', Parser.sourceJsonToFull(reward.source));
	sourceEl.innerHTML = `${Parser.sourceJsonToAbv(reward.source)}`;

	const textlist = reward.text;
	let texthtml = "";

	if (reward.ability !== undefined) texthtml += utils_combineText(reward.ability.text, "p", "<span class='stat-name'>Ability Score Adjustment:</span> ");
	if (reward.signaturespells !== undefined) texthtml += utils_combineText(reward.signaturespells.text ? reward.signaturespells.text : "None", "p", "<span class='stat-name'>Signature Spells:</span> ");
	texthtml += utils_combineText(textlist, "p");

	rootEl.querySelector(".stats-wrapper .text").innerHTML = "<tr class='text'><td colspan='6'>"+texthtml+"</td></tr>";
}

export { renderSelection };
