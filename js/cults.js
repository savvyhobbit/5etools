import {
  utils_combineText,
} from "../js/utils.js";

const stats_wrapper = `
	<div class="stats-wrapper margin-bottom_large">
		<div class="text"></div>
	</div>`;

function renderSelection(curcult, rootEl) {
	rootEl.querySelector(".selection-wrapper").innerHTML = stats_wrapper;

  const textlist = curcult.text;
  let texthtml = "";

  if (curcult.goal !== undefined)
    texthtml += utils_combineText(curcult.goal.text, "p", "<span class='stat-name'>Goals:</span> ");
  if (curcult.cultists !== undefined)
    texthtml += utils_combineText(curcult.cultists.text, "p", "<span class='stat-name'>Typical Cultist:</span> ");
  if (curcult.signaturespells !== undefined)
    texthtml += utils_combineText(
      curcult.signaturespells.text,
      "p",
      "<span class='stat-name'>Signature Spells:</span> "
    );
  texthtml += utils_combineText(textlist, "p");

  rootEl.querySelector(".stats-wrapper .text").innerHTML = texthtml;
}

export {renderSelection};