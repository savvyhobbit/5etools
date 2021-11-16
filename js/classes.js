const HASH_SUBCLASS = "sub:";
const HASH_FEATURE = "f:";
const HASH_HIDE_FEATURES = "hideclassfs:";
const HASH_ALL_SOURCES = "allsrc:";

const CLSS_FEATURE_LINK = "feature-link";
const CLSS_ACTIVE = "mdc-chip--selected";
const CLSS_SUBCLASS_PILL = "mdc-chip";
const CLSS_CLASS_FEATURES_ACTIVE = "cf-active";
const CLSS_OTHER_SOURCES_ACTIVE = "os-active";
const CLSS_SUBCLASS_PREFIX = "subclass-prefix";
const CLSS_CLASS_FEATURE = "class-feature";
const CLSS_GAIN_SUBCLASS_FEATURE = "gain-subclass-feature";
const ID_CLASS_FEATURES_TOGGLE = "cf-toggle";
const ID_OTHER_SOURCES_TOGGLE = "os-toggle";

const STR_PROF_NONE = "none";

const ATB_DATA_FEATURE_LINK = "data-flink";
const ATB_DATA_FEATURE_ID = "data-flink-id";
const ATB_DATA_SC_LIST = "data-subclass-list";

import {
  jqHeight,
  parseHTML,
  ascSort,
  encodeForHash,
  jqAfter,
  jqEmpty,
  isNonstandardSource,
  joinConjunct,
  hasBeenReprinted
} from "../js/utils.js";
import {
  HASH_LIST_SEP,
  HASH_PART_SEP,
  CLSS_SUBCLASS_FEATURE,
  ATB_DATA_SC,
  ATB_DATA_SRC,
  CLSS_NON_STANDARD_SOURCE,
  ATB_DATA_PART_SEP,
  ATB_DATA_LIST_SEP,
  HASH_START
} from "../util/consts.js";
import EntryRenderer from '../util/entryrender.js';
import Parser from '../util/Parser.js';
import { setRouteSelection, readRouteSelection } from "../util/routing.js";
import renderGrid from "../util/renderGrid.js";
import renderList from "../util/renderList.js";

const renderer = new EntryRenderer();
export { onDataLoad, onClassChange, onSubChange };

function renderStr(string) {
  let renderStack = []
  renderer.recursiveEntryRender(string, renderStack, 0);
  return renderStack.join(" ");
}

function onDataLoad(classes, rootEl) {
	// alphabetically sort subclasses
	for (const c of classes) {
    if (c.subclasses) {
      c.subclasses = c.subclasses.sort((a, b) => ascSort(a.name, b.name));
    }
	}

  // store classTable template from inital dom
  window.classTableDefault = rootEl.querySelector("#classtable").innerHTML;
  
  renderList(rootEl, classes);
}

function onClassChange(curClass, rootEl) {
  rootEl.querySelector("#classtable").innerHTML = window.classTableDefault;
  rootEl.querySelector("#subclasses").classList.remove("fixed");
  rootEl.querySelector("#subclasses").classList.remove("closed");
  rootEl.querySelector("#subclasses").classList.remove("hidden");
  rootEl.querySelector(".mobile-clone-spells") && rootEl.querySelector(".mobile-clone-spells").remove();

  // SUMMARY SIDEBAR =================================================================================================
  // hit dice and HP
  if (curClass.hd) {
    rootEl.querySelector("#hp").classList.remove("hidden");
    rootEl.querySelector("#hp div#hitdice span").innerHTML = EntryRenderer.getEntryDice(curClass.hd);
    rootEl.querySelector("#hp div#hp1stlevel span").innerHTML = curClass.hd.faces + " + your Constitution modifier";
    rootEl.querySelector("#hp div#hphigherlevels span").innerHTML =
      `${EntryRenderer.getEntryDice(curClass.hd)} (or ${curClass.hd.faces / 2 + 1}) + your Constitution modifier per ${
        curClass.name
      } level after 1st`;
  } else {
    rootEl.querySelector("#hp").classList.add("hidden");
  }

  // save proficiency
  if (curClass.proficiency) {
    rootEl.querySelector("#prof").classList.remove("hidden");
    rootEl.querySelector("#prof div#saves span").innerHTML = curClass.proficiency.map(p => Parser.attAbvToFull(p)).join(", ");
  } else {
    rootEl.querySelector("#prof").classList.add("hidden");
  }

  // starting proficiencies
  const sProfs = curClass.startingProficiencies;
  if (sProfs) {
    rootEl.querySelector("#armor").classList.remove("hidden");
    rootEl.querySelector("#weapons").classList.remove("hidden");
    rootEl.querySelector("#tools").classList.remove("hidden");
    rootEl.querySelector("#skills").classList.remove("hidden");
    rootEl.querySelector("div#armor span").innerHTML =
      sProfs.armor === undefined
        ? STR_PROF_NONE
        : sProfs.armor.map(a => (a === "light" || a === "medium" || a === "heavy" ? a + " armor" : a)).join(", ");
    rootEl.querySelector("div#weapons span").innerHTML =
      sProfs.weapons === undefined
        ? STR_PROF_NONE
        : sProfs.weapons.map(w => (w === "simple" || w === "martial" ? w + " weapons" : w)).join(", ");
    rootEl.querySelector("div#tools span").innerHTML =
      sProfs.tools === undefined ? STR_PROF_NONE : sProfs.tools.join(", ");
    rootEl.querySelector("div#skills span").innerHTML =
      sProfs.skills === undefined ? STR_PROF_NONE : getSkillProfString(sProfs.skills);
  } else {
    rootEl.querySelector("#armor").classList.add("hidden");
    rootEl.querySelector("#weapons").classList.add("hidden");
    rootEl.querySelector("#tools").classList.add("hidden");
    rootEl.querySelector("#skills").classList.add("hidden");
  }

  function getSkillProfString(skills) {
    let numString, skillOptions, result = '';
    // Different data structure for v2 classes
    if (Array.isArray(skills)) {
      for (let skill of skills) {
        if (skill.choose) {
          numString = Parser.numberToString(skill.choose.count);
          skillOptions = skill.choose.from;
          result += skillOptions.length === 18
            ? `Choose any ${numString}.`
            : `Choose ${numString} from ${joinConjunct(skillOptions, ", ", ", and ")}.`;
        }
      }
    } else {
      numString = Parser.numberToString(skills.choose);
      skillOptions = skills.from;
      result += skillOptions.length === 18
        ? `Choose any ${numString}.`
        : `Choose ${numString} from ${joinConjunct(skillOptions, ", ", ", and ")}.`;
    }
    return result;
  }

  // starting equipment
  const sEquip = curClass.startingEquipment;
  if (sEquip) {
    rootEl.querySelector("#equipment").classList.remove("hidden");
    const fromBackground = sEquip.additionalFromBackground
      ? "<p>You start with the following items, plus anything provided by your background.</p>"
      : "";
    const defList = sEquip.default.length === 0 ? "" : `<ul><li>${sEquip.default.map(i => renderStr(i)).join("</li><li>")}</ul>`;
    const goldAlt =
      sEquip.goldAlternative === undefined
        ? ""
        : `<p>Alternatively, you may start with ${renderStr(sEquip.goldAlternative)} gp to buy your own equipment.</p>`;
    rootEl.querySelector("#equipment div").innerHTML = `${fromBackground}${defList}${goldAlt}`;
  } else {
    rootEl.querySelector("#equipment").classList.add("hidden");
  }

  // FEATURE TABLE ===================================================================================================
  let tData = curClass.classTableGroups || [];
  const groupHeaders = rootEl.querySelector("#groupHeaders");
  const colHeaders = rootEl.querySelector("#colHeaders");
  const levelTrs = [];
  let spellsFlag = false;
  for (let subclassDef of curClass.subclasses) {
    if (subclassDef.subclassTableGroups) {
      tData = tData.concat(subclassDef.subclassTableGroups);
    }
  }
  if (tData) {
    for (let i = 0; i < tData.length; i++) {
      const tGroup = tData[i];

      const hasTitle = tGroup.title !== undefined;
      let subclassData = "";
      if (tGroup.subclasses !== undefined) {
        subclassData = `${ATB_DATA_SC_LIST}="${tGroup.subclasses
          .map(s => s.name+ATB_DATA_PART_SEP+s.source)
          .join(ATB_DATA_LIST_SEP)}"`;
      }
      groupHeaders.append(parseHTML(
        `<th ${hasTitle ? `class="colGroupTitle table-cell"` : ""} colspan="${tGroup.colLabels.length}" ${subclassData}>${
          hasTitle ? tGroup.title : ""
        }</th>`, true, true));

      for (let j = 0; j < tGroup.colLabels.length; j++) {
        let lbl = tGroup.colLabels[j];
        if (lbl.indexOf("@") > -1) {
          let renderStack = []
          renderer.recursiveEntryRender(lbl, renderStack, 0);
          lbl = renderStack.join(" ");
        }
        colHeaders.append(parseHTML(`<th class="centred-col table-cell" ${subclassData}>${lbl}</th>`, true, true));
      }

      if (tGroup.rows) {
        for (let j = 0; j < 20; j++) {
          const tr = rootEl.querySelector(`#level${j + 1}`);
          levelTrs[j] = tr;
          for (let k = 0; k < tGroup.rows[j].length; k++) {
            let entry = tGroup.rows[j][k];
            if (entry === 0) entry = "\u2014";
            const stack = [];
            renderer.recursiveEntryRender(entry, stack, "", "");
            tr.append(parseHTML(`<td class="centred-col" ${subclassData}>${stack.join("")}</td>`, true, true));
          }
        }
      }
      if (tGroup.rowsSpellProgression) {
        for (let j = 0; j < 20; j++) {
          const tr = rootEl.querySelector(`#level${j + 1}`);
          levelTrs[j] = tr;
          for (let k = 0; k < tGroup.rowsSpellProgression[j].length; k++) {
            let entry = tGroup.rowsSpellProgression[j][k];
            if (entry === 0) entry = "\u2014";
            const stack = [];
            renderer.recursiveEntryRender(entry, stack, "", "");
            tr.append(parseHTML(`<td class="centred-col" ${subclassData}>${stack.join("")}</td>`, true, true));
          }
        }
      }
      let combinedLabels = tGroup.colLabels.join(' ');
      if (
        !spellsFlag &&
        (combinedLabels.indexOf("Spells Known") > -1 ||
          combinedLabels.indexOf("Cantrips Known") > -1 ||
          combinedLabels.indexOf("1st") > -1 ||
          combinedLabels.indexOf("Ki Points") > -1 ||
          combinedLabels.indexOf("Rages") > -1 ||
          combinedLabels.indexOf("Talents Known") > -1)
      ) {
        spellsFlag = true;
      }
    }
  // uses different data structure for Fighter, since no classTableGroups
  } else if (curClass.classFeatures.length) {
    // for each level, find and index the feature cell
    for (let i = 0; i < 20; i++) {
      const tr = rootEl.querySelector(`#level${i + 1}`);
      levelTrs[i] = tr;
    }
  }

  rootEl.querySelector("#classtable").classList.remove("mobile-clone-features");
  
  // Add second feature table for mobile
  if (spellsFlag) {
    rootEl.querySelector("#classtable").classList.add("mobile-clone-features");
		let mobileClone = parseHTML('<div class="mobile-clone-spells"></div>');
		mobileClone.append(rootEl.querySelector("#classtable").cloneNode(true));
    mobileClone.querySelector("#classtable").classList.remove("mobile-clone-features");
    mobileClone.querySelector("#groupHeaders th:not(.colGroupTitle)").remove();
    mobileClone.querySelector("#groupHeaders .colGroupTitle") &&
      mobileClone.querySelector("#groupHeaders .colGroupTitle").setAttribute("colspan", "12");
		let colHeaderEls = mobileClone.querySelectorAll("#colHeaders th");
		for (let colHeaderEl of colHeaderEls) {
      if (colHeaderEl.textContent.toLowerCase().indexOf("sneak attack") > -1) {
        colHeaderEl.innerHTML = '<span title="Sneak Attack">Snk Atk</span>';
      } else if (colHeaderEl.textContent.toLowerCase().indexOf("sorcery points") > -1) {
        colHeaderEl.innerHTML = '<span title="Sorcery Points">SP</span>';
      } else if (colHeaderEl.textContent.toLowerCase().indexOf("spells known") > -1) {
        colHeaderEl.innerHTML = '<span title="Spells Known">S</span>';
      } else if (colHeaderEl.textContent.toLowerCase().indexOf("cantrips known") > -1) {
        colHeaderEl.innerHTML = '<span title="Cantrips Known">C</span>';
      }
		}
    jqAfter(rootEl.querySelector("#classtable"), mobileClone);
  }

  // FEATURE DESCRIPTIONS ============================================================================================
  const renderStack = [];
  let subclassIndex = 0; // the subclass array is not 20 elements
  for (let i = 0; i < 20; i++) {
    // track class table feature names
    const tblLvlFeatures = levelTrs[i].querySelector(".features");
    const featureNames = [];

    // add class features to render stack
    const lvlFeatureList = curClass.classFeatures[i];
    for (let j = 0; j < lvlFeatureList.length; j++) {
      const feature = lvlFeatureList[j];
      const featureId = HASH_FEATURE + encodeForHash(feature.name) + "_" + i;
      const featureLinkPart = HASH_FEATURE + encodeForHash(feature.name) + i;
      const featureLinkClasses = [CLSS_FEATURE_LINK];
      if (isNonstandardSource(feature.source)) featureLinkClasses.push(CLSS_NON_STANDARD_SOURCE);
      const featureLink = parseHTML(
        `<a href="#${encodeForHash([curClass.name, curClass.source])}${HASH_PART_SEP}${featureLinkPart}"
          class="${featureLinkClasses.join(" ")}"
          ${ATB_DATA_FEATURE_LINK}="${featureLinkPart}"
          ${ATB_DATA_FEATURE_ID}="${featureId}">${feature.name}</a>`
      );
      featureLink.addEventListener("click", function(e) {
        e.preventDefault();
        rootEl.getElementById(featureId).scrollIntoView(true);
        let offset = -84 - jqHeight(rootEl.querySelector("#subclasses"));
        window.scrollBy(0, offset);
      });
      featureNames.push(featureLink);

      const styleClasses = [CLSS_CLASS_FEATURE];
      if (feature.gainSubclassFeature) {
        styleClasses.push(CLSS_GAIN_SUBCLASS_FEATURE);
      }

      renderer.recursiveEntryRender(
        feature,
        renderStack,
        0,
        `<div id="${featureId}" class="${styleClasses.join(" ")}">`,
        `</div>`,
        true
      );

      // add subclass features to render stack if appropriate
      if (feature.gainSubclassFeature) {
        for (const subClass of curClass.subclasses) {
          if (subClass.subclassFeatures) {
            const subFeatureList = subClass.subclassFeatures[subclassIndex];

            for (let i = 0; i < subFeatureList.length; i++) {
              const subFeature = subFeatureList[i];
              // if this is not the subclass intro, add the subclass to the feature name
              // this will only be shown if there are multiple subclasses displayed
              if (subFeature.name === undefined) {
                for (let m = 0; m < subFeature.entries.length; m++) {
                  const childEntry = subFeature.entries[m];
                  if (
                    childEntry.name !== undefined &&
                    !childEntry.name.startsWith(`<span class="${CLSS_SUBCLASS_PREFIX}">`)
                  ) {
                    childEntry.name = `<span class="${CLSS_SUBCLASS_PREFIX}">${subClass.name}: </span>${childEntry.name}`;
                  }
                }
              }

              const styleClasses = [CLSS_SUBCLASS_FEATURE];
              const hideSource =
                isNonstandardSource(subClass.source) || hasBeenReprinted(subClass.shortName, subClass.source);
              if (hideSource) styleClasses.push(CLSS_NON_STANDARD_SOURCE);
              if (i !== 0) styleClasses.push("referenced-subclass-feature");
              renderer.recursiveEntryRender(
                subFeature,
                renderStack,
                0,
                `<div class="${styleClasses.join(" ")}" ${ATB_DATA_SC}="${subClass.name}" ${ATB_DATA_SRC}="${
                  subClass.source
                }">`,
                `</div>`,
                true
              );
            }
          }
        }
        subclassIndex++;
      }
    }

    // render class table feature names
    if (featureNames.length === 0) tblLvlFeatures.innerHTML = "\u2014";
    else {
      for (let j = 0; j < featureNames.length; j++) {
        tblLvlFeatures.append(featureNames[j]);
      }
    }
  }
  rootEl.querySelector("#stats").innerHTML = renderStack.join("");

  // show UA/other features by default
  toggleUAFeatures(true);

  // CLASS FEATURE/UA/SUBCLASS PILL BUTTONS ==========================================================================
  let subclassPillWrapper = rootEl.querySelector("div#subclasses");
  // remove any from previous class
  jqEmpty(subclassPillWrapper);
  subclassPillWrapper.append(parseHTML(`<div class='title'>Subclasses</div>`));
  subclassPillWrapper.append(parseHTML(`<div class='subclass-wrapper'></div>`));
  subclassPillWrapper = subclassPillWrapper.querySelector('.subclass-wrapper');

  // show/hide UA/other sources
  const allSourcesToggle = makeGenericTogglePill(
    "Show UA",
    CLSS_OTHER_SOURCES_ACTIVE,
    ID_OTHER_SOURCES_TOGGLE,
    HASH_ALL_SOURCES,
    false,
    true
  );

  // show/hide class features pill
  makeGenericTogglePill(
    "Class Features",
    CLSS_CLASS_FEATURES_ACTIVE,
    ID_CLASS_FEATURES_TOGGLE,
    HASH_HIDE_FEATURES,
    true
  );

  // subclass pills
  if (curClass.subclasses) {
    const subClasses = curClass.subclasses
      .map(sc => ({ name: sc.name, source: sc.source, shortName: sc.shortName }))
      .sort(function(a, b) {
        return ascSort(a.shortName, b.shortName);
      });
    for (let i = 0; i < subClasses.length; i++) {
      const nonStandardSource =
        isNonstandardSource(subClasses[i].source) || hasBeenReprinted(subClasses[i].shortName, subClasses[i].source);
      const styleClasses = [CLSS_ACTIVE, CLSS_SUBCLASS_PILL];
      if (nonStandardSource) styleClasses.push(CLSS_NON_STANDARD_SOURCE);
      const pillText = hasBeenReprinted(subClasses[i].shortName, subClasses[i].source)
        ? `${subClasses[i].shortName} (${Parser.sourceJsonToAbv(subClasses[i].source)})`
        : subClasses[i].shortName;
      const pill = parseHTML(
        `<div class="${styleClasses.join(" ")}" ${ATB_DATA_SC}="${subClasses[i].name}" ${ATB_DATA_SRC}="${
          subClasses[i].source
        }" title="Source: ${Parser.sourceJsonToFull(
          subClasses[i].source
        )}"><span class='mdc-chip__text'>${pillText}</span></div>`
      );
      pill.addEventListener("click", function() {
        handleSubclassClick(pill.classList.contains(CLSS_ACTIVE), subClasses[i].name, subClasses[i].source);
      });
      if (nonStandardSource) pill.style.display = 'none';
      subclassPillWrapper.append(pill);
    }
    subclassPillWrapper.append(parseHTML(`<div class='tab material-icons'>expand_less</div>`));

    rootEl.querySelector("#subclasses .tab").addEventListener("click", () => {
      rootEl.querySelector("#subclasses").classList.toggle("closed");
    });

    // if this is a UA class, toggle the "All Sources" button
    const showUA = readRouteSelection().indexOf(HASH_ALL_SOURCES + 'true') > -1 || readRouteSelection().indexOf(HASH_ALL_SOURCES + 'false') === -1
    if (showUA) {
      allSourcesToggle.click();
    }
  } else {
    rootEl.querySelector("#subclasses").classList.add("hidden");
  }

  // helper functions
  function makeGenericTogglePill(pillText, pillActiveClass, pillId, hashKey, defaultActive, isUA) {
    const pill = parseHTML(`<div id="${pillId}" class="mdc-chip"><span class="mdc-chip__text">${pillText}</span></div>`);
    subclassPillWrapper.append(pill);
    pill.addEventListener("click", function() {
      let active = pill.classList.contains(pillActiveClass);
      if (!defaultActive) active = !active;
      handleToggleFeaturesClicks(active);
      // enable UA features
      if (isUA) {
        toggleUAFeatures(active);
        pill.querySelector('.mdc-chip__text').innerHTML = active ? "Hide UA" : "Show UA";
      }
    });
    return pill;

    function handleToggleFeaturesClicks(isPillActive) {
      const outStack = [];
      const split = readRouteSelection().split(HASH_PART_SEP);

      for (let i = 0; i < split.length; i++) {
        const hashPart = split[i];
        if (!hashPart.startsWith(hashKey)) outStack.push(hashPart);
      }
      if (isPillActive) {
        outStack.push(hashKey + "true");
      } else {
        outStack.push(hashKey + "false");
      }
      const newHash = outStack.join(HASH_PART_SEP);
      setRouteSelection(newHash, true);
    }
  }

  function handleSubclassClick(isPillActive, subclassName, subclassSource) {
    const outStack = [];
    const routeSelection = readRouteSelection();
    const split = routeSelection.split(HASH_PART_SEP);

    const encodedSubClass = encodeForHash([subclassName]);
    const subclassLink = HASH_SUBCLASS + encodedSubClass;

    if (isPillActive && routeSelection.includes(HASH_SUBCLASS)) {
      for (let i = 0; i < split.length; i++) {
        const hashPart = split[i];
        if (!hashPart.startsWith(HASH_SUBCLASS)) {
					outStack.push(hashPart);
				} else {
          const subClassStack = [];
          const subClasses = hashPart.substr(HASH_SUBCLASS.length).split(HASH_LIST_SEP);
          for (let j = 0; j < subClasses.length; j++) {
            const subClass = subClasses[j];
            if (subClass !== encodedSubClass) subClassStack.push(subClass);
          }
          if (subClassStack.length > 0) outStack.push(HASH_SUBCLASS + subClassStack.join(HASH_LIST_SEP));
        }
      }
    } else {
      let hasSubclassHash = false;

      for (let i = 0; i < split.length; i++) {
        const hashPart = split[i];
        if (!hashPart.startsWith(HASH_SUBCLASS)) outStack.push(hashPart);
        else {
          const subClassStack = [];
          const subClasses = hashPart.substr(HASH_SUBCLASS.length).split(HASH_LIST_SEP);
          for (let j = 0; j < subClasses.length; j++) {
            const subClass = subClasses[j];
            if (subClass !== encodedSubClass) subClassStack.push(subClass);
          }
          subClassStack.push(encodedSubClass);
          if (subClassStack.length > 0) outStack.push(HASH_SUBCLASS + subClassStack.join(HASH_LIST_SEP));

          hasSubclassHash = true;
        }
      }

      if (!hasSubclassHash) outStack.push(subclassLink);
    }
    const newHash = outStack.join(HASH_PART_SEP);
    setRouteSelection(newHash, true);
  }

  function toggleUAFeatures(active) {
    let nonStandardPills = rootEl.querySelectorAll(`.${CLSS_NON_STANDARD_SOURCE}`);
    for (let nonStandardPill of nonStandardPills) {
      if (!nonStandardPill.classList.contains(CLSS_SUBCLASS_PILL)) {
        nonStandardPill.style.display = active ? null : 'none';
      }
    }
  }
}

function onSubChange(sub, curHash, rootEl) {
	let subclasses = null;
	let feature = null;
	let hideClassFeatures = null;
	let showAllSources = null;

	for (let i = 0; i < sub.length; i++) {
		const hashPart = sub[i];

		if (hashPart.startsWith(HASH_SUBCLASS)) subclasses = hashPart.slice(HASH_SUBCLASS.length).split(HASH_LIST_SEP);
		if (hashPart.startsWith(HASH_FEATURE)) feature = hashPart;
		if (hashPart.startsWith(HASH_HIDE_FEATURES)) hideClassFeatures = hashPart.slice(HASH_HIDE_FEATURES.length) === "true";
		if (hashPart.startsWith(HASH_ALL_SOURCES)) showAllSources = hashPart.slice(HASH_ALL_SOURCES.length) === "true";
	}

	const hideOtherSources = showAllSources === null || showAllSources === false;

	if (subclasses !== null) {
		updateClassTableLinks();

		const $toShow = [];
		const $toHide = [];
		const $subClassSpanList = rootEl.querySelectorAll(`.${CLSS_SUBCLASS_PILL}`);
		for (let classSpan of $subClassSpanList) {
			const $this = classSpan;
      const name = $this.getAttribute(ATB_DATA_SC);
			const thisSc = encodeForHash([name]);
			let shown = false;

			for (let j = 0; j < subclasses.length; j++) {
				const sc = subclasses[j];
				if (sc.trim() === thisSc) {
					shown = true;
					break;
				}
			}
			if (shown) {
				$toShow.push($this);
			} else {
				$toHide.push($this);
			}
		}

    const otherSrcSubFeats = rootEl.querySelectorAll(`p.${CLSS_NON_STANDARD_SOURCE}`);
    const shownInTable = [];

    for (let v of $toShow) {
      v.classList.add(CLSS_ACTIVE);
      let selectedSCFeatures = rootEl.querySelectorAll(`.${CLSS_SUBCLASS_FEATURE}[${ATB_DATA_SC}="${v.getAttribute(ATB_DATA_SC)}"][${ATB_DATA_SRC}="${v.getAttribute(ATB_DATA_SRC)}"]`);
      for (let selectedSCFeature of selectedSCFeatures) {
        selectedSCFeature.style.display = null;
      }
      if (hideOtherSources) {
        for (let otherSrcSubFeat of otherSrcSubFeats) {
          if (
            otherSrcSubFeat.getAttribute(ATB_DATA_SC) === v.getAttribute(ATB_DATA_SC) &&
            otherSrcSubFeat.getAttribute(ATB_DATA_SRC) === v.getAttribute(ATB_DATA_SRC)
          ) {
            otherSrcSubFeat.style.display = "none";
          }
        }
      } else {
        for (let otherSrcSubFeat of otherSrcSubFeats) {
          if (
            otherSrcSubFeat.getAttribute(ATB_DATA_SC) === v.getAttribute(ATB_DATA_SC) &&
            otherSrcSubFeat.getAttribute(ATB_DATA_SRC) === v.getAttribute(ATB_DATA_SRC)
          ) {
            otherSrcSubFeat.style.display = null;
          }
        }
      }

      const asInTable = v.getAttribute(ATB_DATA_SC) + ATB_DATA_PART_SEP + v.getAttribute(ATB_DATA_SRC);
      shownInTable.push(asInTable);
    }

    for (let v of $toHide) {
      v.classList.remove(CLSS_ACTIVE);
      let selectedSCFeatures = rootEl.querySelectorAll(`.${CLSS_SUBCLASS_FEATURE}[${ATB_DATA_SC}="${v.getAttribute(ATB_DATA_SC)}"][${ATB_DATA_SRC}="${v.getAttribute(ATB_DATA_SRC)}"]`);
      for (let selectedSCFeature of selectedSCFeatures) {
        selectedSCFeature.style.display = 'none';
      }
      for (let otherSrcSubFeat of otherSrcSubFeats) {
        if (
          otherSrcSubFeat.getAttribute(ATB_DATA_SC) === v.getAttribute(ATB_DATA_SC) &&
          otherSrcSubFeat.getAttribute(ATB_DATA_SRC) === v.getAttribute(ATB_DATA_SRC)
        ) {
          otherSrcSubFeat.style.display = "none";
        }
      }
      v.getAttribute(ATB_DATA_SC);
    }
    
    handleTableGroups(shownInTable);

    if (hideOtherSources) {
      for (let otherSrcSubFeat of otherSrcSubFeats) {
        if (
          !otherSrcSubFeat.classList.contains(CLSS_SUBCLASS_FEATURE) &&
          otherSrcSubFeat.getAttribute(ATB_DATA_SC) === EntryRenderer.DATA_NONE &&
          otherSrcSubFeat.getAttribute(ATB_DATA_SRC) === EntryRenderer.DATA_NONE
        ) {
          otherSrcSubFeat.style.display = "none";
        }
      }
    } else {
      for (let otherSrcSubFeat of otherSrcSubFeats) {
        if (
          !otherSrcSubFeat.classList.contains(CLSS_SUBCLASS_FEATURE) &&
          otherSrcSubFeat.getAttribute(ATB_DATA_SC) === EntryRenderer.DATA_NONE &&
          otherSrcSubFeat.getAttribute(ATB_DATA_SRC) === EntryRenderer.DATA_NONE
        ) {
          otherSrcSubFeat.style.display = null;
        }
      }
    }

		// show subclass prefixes if we're displaying more than 1 subclass
		let subClassEls = rootEl.querySelectorAll(`.${CLSS_SUBCLASS_PREFIX}`);
		if ($toShow.length !== 1) {
			for (let subClassEl of subClassEls) {
				subClassEl.style.display = null;
			}
		} else {
			for (let subClassEl of subClassEls) {
				subClassEl.style.display = 'none';
			}
		}
	}

	// hide class features as required
	const cfToggle = rootEl.querySelector(`#${ID_CLASS_FEATURES_TOGGLE}`);
	const toToggleCf= rootEl.querySelectorAll(`.${CLSS_CLASS_FEATURE}`);
	if (hideClassFeatures !== null && hideClassFeatures) {
		cfToggle.classList.remove(CLSS_CLASS_FEATURES_ACTIVE);
		for (let el of toToggleCf) {
			if (!el.classList.contains(CLSS_GAIN_SUBCLASS_FEATURE)) {
        el.style.display = "none";
      }
		}
	} else {
		cfToggle.classList.add(CLSS_CLASS_FEATURES_ACTIVE);
		for (let el of toToggleCf) {
			if (!el.classList.contains(CLSS_GAIN_SUBCLASS_FEATURE)) {
        el.style.display = null;
      }
		}
	}

	// show UA/etc content as required
	const srcToggle = rootEl.querySelector(`#${ID_OTHER_SOURCES_TOGGLE}`);
	const toToggleSrc = rootEl.querySelectorAll(`.${CLSS_SUBCLASS_PILL}.${CLSS_NON_STANDARD_SOURCE}`);
	if (hideOtherSources) {
		srcToggle.classList.remove(CLSS_OTHER_SOURCES_ACTIVE);
		for (let el of toToggleSrc) {
			el.style.display = "none";
		}
	} else {
		srcToggle.classList.add(CLSS_OTHER_SOURCES_ACTIVE);
		for (let el of toToggleSrc) {
			el.style.display = null;
		}
	}

	// scroll to the linked feature if required
	if (feature !== null && (window.prevFeature === undefined || window.prevFeature !== feature)) {
		rootEl.getElementById(rootEl.querySelectorAll(`[${ATB_DATA_FEATURE_LINK}="${feature}"]`).getAttribute(ATB_DATA_FEATURE_ID)).scrollIntoView();
		window.prevFeature = feature;
	}

	updateClassTableLinks();

  function handleTableGroups(toShow) {
    let listEls = rootEl.querySelectorAll(`[${ATB_DATA_SC_LIST}]`);
    for (let el of listEls) {
      const scs = el.getAttribute(ATB_DATA_SC_LIST).split(ATB_DATA_LIST_SEP);

      for (let shown of toShow) {
        if (scs.includes(shown)) {
          el.style.display = null;
          break;
        }
          el.style.display = 'none';
        }
      }
	}

	function updateClassTableLinks () {
		const hashParts = curHash.slice(1).split(HASH_PART_SEP);
		const outParts = [];
		for (let i = 0; i < hashParts.length; i++) {
			const part = hashParts[i];
			if (!part.startsWith(HASH_FEATURE)) outParts.push(part);
		}
		let els = rootEl.querySelectorAll(`.${CLSS_FEATURE_LINK}`);
		for (let el of els) {
			el.href = HASH_START+outParts.join(HASH_PART_SEP)+HASH_PART_SEP+el.getAttribute(ATB_DATA_FEATURE_LINK);
		}
	}
}
