import { utils_combineText, parse_psionicTypeToFull } from "../js/utils.js";
import { ELE_P, STR_EMPTY } from "../util/consts.js";

const stats_wrapper = `
	<div class="stats-wrapper margin-bottom_large">
		<div class="order margin-bottom_small"></div>
		<div class="duration margin-bottom_small"></div>
		<div class="text"></div>
	</div>`;

function renderSelection(selectedPsionic, rootEl) {
  rootEl.querySelector(".selection-wrapper").innerHTML = stats_wrapper;
  const STATS_ORDER_AND_TYPE = rootEl.querySelector(".stats-wrapper .order");
  const STATS_DURATION = rootEl.querySelector(".stats-wrapper .duration");
  const STATS_TEXT = rootEl.querySelector(".stats-wrapper .text");

  if (selectedPsionic.type === "T") loadTalent();
  else if (selectedPsionic.type === "D") loadDiscipline();

  function loadTalent() {
    STATS_ORDER_AND_TYPE.innerHTML = parse_psionicTypeToFull(selectedPsionic.type);
    STATS_TEXT.innerHTML = utils_combineText(selectedPsionic.text, ELE_P);
    STATS_DURATION.innerHTML = STR_EMPTY;
  }
  function loadDiscipline() {
    STATS_ORDER_AND_TYPE.innerHTML = `${selectedPsionic.order} ${parse_psionicTypeToFull(selectedPsionic.type)}`;
    STATS_TEXT.innerHTML = getTextString();
    STATS_DURATION.innerHTML = getDurationString();

    function getTextString() {
      const modeStringArray = [];
      for (let i = 0; i < selectedPsionic.modes.length; ++i) {
        modeStringArray.push(getModeString(i));
      }

      return `${getDescriptionString()}${getFocusString()}${modeStringArray.join(STR_EMPTY)}`;
    }
    function getDescriptionString() {
      return `<p>${selectedPsionic.description}</p>`;
    }
    function getFocusString() {
      return `<p><span class='stat-name'>Psycic Focus.</span> ${selectedPsionic.focus}</p>`;
    }
    function getModeString(modeIndex) {
      const modeString = utils_combineText(
        selectedPsionic.modes[modeIndex].text,
        ELE_P,
        getModeTitle(selectedPsionic.modes[modeIndex])
      );
      if (selectedPsionic.modes[modeIndex].submodes === undefined) return modeString;
      const subModeString = getSubModeString();
      return `${modeString}${subModeString}`;

      function getSubModeString() {
        const modeStrings = [];
        const subModes = selectedPsionic.modes[modeIndex].submodes;
        for (let i = 0; i < subModes.length; ++i) {
          modeStrings.push(utils_combineText(subModes[i].text, ELE_P, getModeTitle(subModes[i], true)));
        }
        return modeStrings.join(STR_EMPTY);
      }

      function getModeTitle(mode, subMode) {
        subMode = subMode === undefined || subMode === null ? false : subMode;
        const modeTitleArray = [];
        modeTitleArray.push(mode.title);
        const bracketPart = getModeTitleBracketPart();
        if (bracketPart !== null) modeTitleArray.push(bracketPart);
        if (subMode) return `<span class='stat-name'>${modeTitleArray.join(" ")}.</span> `;
        else return `<span class='stat-name'>${modeTitleArray.join(" ")}.</span> `;

        function getModeTitleBracketPart() {
          const modeTitleBracketArray = [];

          if (mode.cost) modeTitleBracketArray.push(getModeTitleCost());
          if (mode.concentration) modeTitleBracketArray.push(getModeTitleConcentration());

          if (modeTitleBracketArray.length === 0) return null;
          return `(${modeTitleBracketArray.join("; ")})`;

          function getModeTitleCost() {
            const costMin = mode.cost.min;
            const costMax = mode.cost.max;
            const costString = costMin === costMax ? costMin : `${costMin}-${costMax}`;
            return `${costString} psi`;
          }
          function getModeTitleConcentration() {
            return `conc., ${mode.concentration.duration} ${mode.concentration.unit}.`;
          }
        }
      }
    }
  }
  function getDurationString() {
    const duration = selectedPsionic.duration;
    if (duration === undefined) return STR_EMPTY;
    else return getDurationElement();

    function getDurationElement() {}
  }
}

export { renderSelection };
