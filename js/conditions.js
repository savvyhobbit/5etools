import { utils_combineText } from "../js/utils.js";

const stats_wrapper = `
	<div class="stats-wrapper margin-bottom_large">
		<div class="text"></div>
	</div>`;

function renderSelection(curcondition, rootEl) {
  rootEl.querySelector(".selection-wrapper").innerHTML = stats_wrapper;
  rootEl.querySelector(".stats-wrapper .text").innerHTML = utils_combineText(curcondition.entries, "p");
}

export { renderSelection };