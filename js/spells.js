import EntryRenderer from "../util/entryrender.js";
import Parser from "../util/Parser.js";

const renderer = new EntryRenderer();
const stats_wrapper = `
	<div class="stats-wrapper margin-bottom_large">
	</div>`;

function renderSelection(spell, rootEl) {
	rootEl.querySelector(".selection-wrapper").innerHTML = stats_wrapper;

	const spellHtmlString = spellHtml(spell);

	rootEl.querySelector(".stats-wrapper").innerHTML = spellHtmlString;
}

function spellHtml(spell) {
	const renderStack = [];
	renderStack.push(`<div class="margin-bottom_small"><span class="stats-source source${spell.source}" title="${Parser.sourceJsonToFull(spell.source)}">${Parser.sourceJsonToAbv(spell.source)}</div>`);
	renderStack.push(`<div class="margin-bottom_small"><span>${Parser.spLevelSchoolMetaToFull(spell.level, spell.school, spell.meta)}</span></div>`);
	renderStack.push(`<div class="margin-bottom_small"><span class="stat-name">Casting Time: </span>${Parser.spTimeListToFull(spell.time)}</div>`);
	renderStack.push(`<div class="margin-bottom_small"><span class="stat-name">Range: </span>${Parser.spRangeToFull(spell.range)}</div>`);
	renderStack.push(`<div class="margin-bottom_small"><span class="stat-name">Components: </span>${Parser.spComponentsToFull(spell.components)}</div>`);
	renderStack.push(`<div class="margin-bottom_med"><span class="stat-name">Duration: </span>${Parser.spDurationToFull(spell.duration)}</div>`);
	renderStack.push(`<div class='text'>`);

	renderer.recursiveEntryRender({type: "entries", entries: spell.entries}, renderStack, 1);

	if (spell.entriesHigherLevel) {
		const higherLevelsEntryList = {type: "entries", entries: spell.entriesHigherLevel};
		renderer.recursiveEntryRender(higherLevelsEntryList, renderStack, 2);
	}

	renderStack.push(`</div>`);
	renderStack.push(`<div class="margin-bottom_med"><span class="stat-name">Classes: </span>${Parser.spMainClassesToFull(spell.classes)}</div>`);

	if (spell.classes.fromSubclass) {
		const currentAndLegacy = Parser.spSubclassesToCurrentAndLegacyFull(spell.classes);
		renderStack.push(`<div class="margin-bottom_med"><span class="stat-name">Subclasses: </span>${currentAndLegacy[0]}</div>`);
		if (currentAndLegacy[1]) {
			renderStack.push(`<div class="mdc-theme--text-disabled-on-background margin-bottom_med"><span class="stat-name">Subclasses (legacy): </span>${currentAndLegacy[1]}</div>`);
		}
	}

	if (spell.scrollNote) {
		renderStack.push(`<div class="mdc-theme--text-disabled-on-background">`);
		renderer.recursiveEntryRender(
			`{@italic Note: Both the {@class ${"Fighter"} (${"Eldritch Knight"})} and the {@class ${"Rogue"} (${"Arcane Trickster"})} spell lists include all {@class ${"Wizard"}} spells. Spells of 5th level or higher may be cast with the aid of a spell scroll or similar.}`
			, renderStack, 2);
		renderStack.push(`</div>`);
	}

	return renderStack.join('');
}

export { renderSelection, spellHtml };