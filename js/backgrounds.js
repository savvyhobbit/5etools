import {parseHTML, jqHeight, jqPrepend, encodeForHash } from "../js/utils.js";
import Parser from "../util/Parser.js";
import EntryRenderer from "../util/entryrender.js";
import { resolveHash } from "../util/renderTable.js";

const renderer = new EntryRenderer();

const stats_wrapper = `
	<div class="stats-wrapper margin-bottom_large">
		<div class="source margin-bottom_small"></div>
		<div class="stats margin-bottom_small"></div>
		<div class="table-container collapse collapse--left-arrow disabled">
			<div class="collapse-toggle">
				<div class="mdc-list-item stat-name">Suggested Characteristics</div>
			</div>
			<div class="collapse-wrapper">
				<div class="collapse-list"></div>
			</div>
		</div>
	</div>`;

function renderSelection(curbg, rootEl, allBgs) {
  if (rootEl.querySelector(".selection-wrapper")) {
    rootEl.querySelector(".selection-wrapper").innerHTML = stats_wrapper;
  } else {
    rootEl.innerHTML = stats_wrapper;
  }
  while (curbg._copy) {
    const foundCopy = resolveHash(allBgs, encodeForHash([curbg._copy.name, curbg._copy.source]));
    curbg = foundCopy;
  }
  const source = curbg.source;
  const sourceAbv = Parser.sourceJsonToAbv(source);
  const sourceFull = Parser.sourceJsonToFull(source);

  const sourceEl = rootEl.querySelector(".stats-wrapper .source");
  sourceEl.classList.add(`source${sourceAbv}`);
	sourceEl.setAttribute("title", sourceFull);
	sourceEl.innerHTML = sourceAbv;

  const entries = curbg.entries;

  if (entries && entries.length) {
    for (let n = entries.length - 1; n >= 0; n--) {
      let entry = entries[n],
        outStack = [];
      renderer.recursiveEntryRender(entry, outStack, 0);
      let texthtml = outStack.join(' ');

      if (entry.name === "Suggested Characteristics") {
        rootEl.querySelector(".stats-wrapper .table-container").classList.remove("disabled");
        const collapseList = rootEl.querySelector(".stats-wrapper .table-container .collapse-list");
        const traitTables = parseHTML(texthtml);
        traitTables.querySelector(".stat-name").remove();
        jqPrepend(collapseList, traitTables);
      } else {
        const statsEl = rootEl.querySelector(".stats-wrapper .stats");
        jqPrepend(statsEl, parseHTML(texthtml));
      }
    }
  }

  window.setTimeout(() => {
    let list = rootEl.querySelector(".stats-wrapper .table-container .collapse-list");
    list.style["margin-top"] = "-" + jqHeight(list) + "px";
  }, 0);
}

export { renderSelection };
