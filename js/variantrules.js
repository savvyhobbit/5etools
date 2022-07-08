import EntryRenderer from "../util/entryrender.js";
import Parser from "../util/Parser.js";

const entryRenderer = new EntryRenderer();
const stats_wrapper = `
	<div class="stats-wrapper margin-bottom_large">
		<div class="source margin-bottom_small"></div>
		<div class="text"></div>
	</div>`;

function renderSelection(curRule, rootEl) {
  rootEl.querySelector(".selection-wrapper").innerHTML = stats_wrapper;
  const sourceEl = rootEl.querySelector(".stats-wrapper .source");
  sourceEl.classList.add(`source${curRule.source}`);
  sourceEl.setAttribute("title", Parser.sourceJsonToAbv(curRule.source));
	sourceEl.innerHTML =  Parser.sourceJsonToFull(reward.source)

  const textStack = [];
  entryRenderer.recursiveEntryRender(curRule, textStack);
  rootEl.querySelector(".stats-wrapper .text").innerHTML = textStack.join("");
}

export { renderSelection };