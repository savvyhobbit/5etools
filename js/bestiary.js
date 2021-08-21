import { parseHTML, utils_makeRoller, jqAfter, jqPrepend} from "../js/utils.js";
import EntryRenderer from "../util/entryrender.js";
import Parser from "../util/Parser.js"
import droll from "../lib/droll.js"

const MAX_ROLLS = 5

const stats_wrapper = `
	<div class="margin-bottom_large stats-wrapper">
		<div id="stats" class="monster">
			<div id="name">
				Name <span class="source" title="Source book">SRC</span>
			</div>
			<div id="sizetypealignment">
				<span id="size">Size</span> <span id="type">type</span>, <span id="alignment">alignment</span>
			</div>
			<div class="divider"></div>
			<div>
				<strong>Armor Class</strong> <span id="ac">## (source)</span>
			</div>
			<div>
				<strong>Hit Points</strong> <span id="hp">hp</span>
			</div>
			<div>
				<strong>Speed</strong> <span id="speed">30 ft.</span>
			</div>
			<div id="abilitynames">
				<div>STR</div>
				<div>DEX</div>
				<div>CON</div>
				<div>INT</div>
				<div>WIS</div>
				<div>CHA</div>
			</div>
			<div id="abilityscores">
				<div id="str"><span class="score">10</span> (<span class="mod">0</span>)</div>
				<div id="dex"><span class="score">10</span> (<span class="mod">0</span>)</div>
				<div id="con"><span class="score">10</span> (<span class="mod">0</span>)</div>
				<div id="int"><span class="score">10</span> (<span class="mod">0</span>)</div>
				<div id="wis"><span class="score">10</span> (<span class="mod">0</span>)</div>
				<div id="cha"><span class="score">10</span> (<span class="mod">0</span>)</div>
			</div>
			<div>
				<strong>Saving Throws</strong> <span id="saves">Str +0</span>
			</div>
			<div>
				<strong>Skills</strong> <span id="skills">Perception +0</span>
			</div>
			<div>
				<strong>Damage Vulnerabilities</strong> <span id="dmgvuln">fire</span>
			</div>
			<div>
				<strong>Damage Resistances</strong> <span id="dmgres">cold</span>
			</div>
			<div>
				<strong>Damage Immunities</strong> <span id="dmgimm">lightning</span>
			</div>
			<div>
				<strong>Condition Immunities</strong> <span id="conimm">exhaustion</span>
			</div>
			<div>
				<strong>Senses</strong> <span id="senses">darkvision 30 ft.</span> passive Perception <span id="pp">10</span>
			</div>
			<div>
				<strong>Languages</strong> <span id="languages">Common</span>
			</div>
			<div>
				<strong>Challenge</strong> <span id="cr">1</span> (<span id="xp">450</span> XP)
			</div>
			<div id="traits">
			</div>
			<div id="actions">
				<span>Actions</span>
			</div>
			<div id="reactions">
				<span>Reactions</span>
			</div>
			<div id="legendaries">
				<span>Legendary Actions</span>
			</div>
			<div id="lairactions">
				<span>Lair Actions</span>
			</div>
			<div id="regionaleffects">
				<span>Regional Effects</span>
			</div>
		</div>
		<div id="output"></div>
	</div>`;

function objToTitleCaseStringWithCommas(obj) {
  return Object.keys(obj)
    .map(function(k) {
      return k.uppercaseFirst() + " " + obj[k];
    })
    .join(", ");
}
const ATB_PROF_MODE = "mode";
const ATB_PROF_BONUS_STR = "profBonusStr";
const ATB_PROF_DICE_STR = "profDiceStr";
const PROF_MODE_BONUS = "bonus";
const PROF_MODE_DICE = "dice";
function getProfBonusFromCr(cr) {
  if (CR_TO_PROF[cr]) return CR_TO_PROF[cr];
  return 0;
}
const CR_TO_PROF = {
  "0": 2,
  "1/8": 2,
  "1/4": 2,
  "1/2": 2,
  "1": 2,
  "2": 2,
  "3": 2,
  "4": 2,
  "5": 3,
  "6": 3,
  "7": 3,
  "8": 3,
  "9": 4,
  "10": 4,
  "11": 4,
  "12": 4,
  "13": 5,
  "14": 5,
  "15": 5,
  "16": 5,
  "17": 6,
  "18": 6,
  "19": 6,
  "20": 6,
  "21": 7,
  "22": 7,
  "23": 7,
  "24": 7,
  "25": 8,
  "26": 8,
  "27": 8,
  "28": 8,
  "29": 9,
  "30": 9
};
const SKILL_TO_ATB_ABV = {
  athletics: "dex",
  acrobatics: "dex",
  "sleight of hand": "dex",
  stealth: "dex",
  arcana: "int",
  history: "int",
  investigation: "int",
  nature: "int",
  religion: "int",
  "animal handling": "wis",
  insight: "wis",
  medicine: "wis",
  perception: "wis",
  survival: "wis",
  deception: "cha",
  intimidation: "cha",
  performance: "cha",
  persuasion: "cha"
};
function getAttribute(skill) {
  return SKILL_TO_ATB_ABV[skill.toLowerCase().trim()];
}

const renderer = new EntryRenderer();
function renderSelection(mon, rootEl) {
  rootEl.querySelector(".selection-wrapper").innerHTML = stats_wrapper;
	let renderStack = [];
	let entryList = {};
	var name = mon.name;
	window.monsterName = name;
	var source = mon.source;
	var type = mon._pTypes.asText;
	source = Parser.sourceJsonToAbv(source);

	rootEl.querySelector("#name").innerHTML = (
		`<span class="stats-source source${source}" title="${Parser.sourceJsonToFull(source)}">${Parser.sourceJsonToAbv(source)}</span>`
	);
	rootEl.querySelector("#size").innerHTML = (Parser.sizeAbvToFull(mon.size));
	rootEl.querySelector("#type").innerHTML = (type);
	rootEl.querySelector("#alignment").innerHTML = (mon.alignment);
	rootEl.querySelector("#ac").innerHTML = (mon.ac);
	rootEl.querySelector("#hp").innerHTML = (mon.hp);
	rootEl.querySelector("#speed").innerHTML = (mon.speed);
	rootEl.querySelector("#str span.score").innerHTML = (mon.str);
	rootEl.querySelector("#str span.mod").innerHTML = (Parser.getAbilityModifier(mon.str));
	rootEl.querySelector("#dex span.score").innerHTML = (mon.dex);
	rootEl.querySelector("#dex span.mod").innerHTML = (Parser.getAbilityModifier(mon.dex));
	rootEl.querySelector("#con span.score").innerHTML = (mon.con);
	rootEl.querySelector("#con span.mod").innerHTML = (Parser.getAbilityModifier(mon.con));
	rootEl.querySelector("#int span.score").innerHTML = (mon.int);
	rootEl.querySelector("#int span.mod").innerHTML = (Parser.getAbilityModifier(mon.int));
	rootEl.querySelector("#wis span.score").innerHTML = (mon.wis);
	rootEl.querySelector("#wis span.mod").innerHTML = (Parser.getAbilityModifier(mon.wis));
	rootEl.querySelector("#cha span.score").innerHTML = (mon.cha);
	rootEl.querySelector("#cha span.mod").innerHTML = (Parser.getAbilityModifier(mon.cha));

	var saves = mon.save;
	if (saves) {
		rootEl.querySelector("#saves").parentElement.style.display = 'block';
		rootEl.querySelector("#saves").innerHTML = (saves);
	} else {
		rootEl.querySelector("#saves").parentElement.style.display = 'none';
	}

	var skills = mon.skill;
	let perception = 0;
	if (skills) {
		rootEl.querySelector("#skills").parentElement.style.display = 'block';
		rootEl.querySelector("#skills").innerHTML = (objToTitleCaseStringWithCommas(skills));
		if (skills.perception) perception = parseInt(skills.perception);
	} else {
		rootEl.querySelector("#skills").parentElement.style.display = 'none';
	}

	var dmgvuln = mon.vulnerable;
	if (dmgvuln) {
		rootEl.querySelector("#dmgvuln").parentElement.style.display = 'block';
		rootEl.querySelector("#dmgvuln").innerHTML = (dmgvuln);
	} else {
		rootEl.querySelector("#dmgvuln").parentElement.style.display = 'none';
	}

	var dmgres = mon.resist;
	if (dmgres) {
		rootEl.querySelector("#dmgres").parentElement.style.display = 'block';
		rootEl.querySelector("#dmgres").innerHTML = (dmgres);
	} else {
		rootEl.querySelector("#dmgres").parentElement.style.display = 'none';
	}

	var dmgimm = mon.immune;
	if (dmgimm) {
		rootEl.querySelector("#dmgimm").parentElement.style.display = 'block';
		rootEl.querySelector("#dmgimm").innerHTML = (dmgimm);
	} else {
		rootEl.querySelector("#dmgimm").parentElement.style.display = 'none';
	}

	var conimm = mon.conditionImmune;
	if (conimm) {
		rootEl.querySelector("#conimm").parentElement.style.display = 'block';
		rootEl.querySelector("#conimm").innerHTML = (conimm);
	} else {
		rootEl.querySelector("#conimm").parentElement.style.display = 'none';
	}

	var senses = mon.senses;
	if (senses) {
		rootEl.querySelector("#senses").innerHTML = (senses + ", ");
	} else {
		rootEl.querySelector("#senses").innerHTML = ("");
	}

	var passive = mon.passive || (10 + perception).toString;
	rootEl.querySelector("#pp").innerHTML = (passive)

	var languages = mon.languages;
	if (languages) {
		rootEl.querySelector("#languages").innerHTML = (languages);
	} else {
		rootEl.querySelector("#languages").innerHTML = ("\u2014");
	}

	var cr = mon.cr === undefined ? "Unknown" : mon.cr;
	rootEl.querySelector("#cr").innerHTML = (cr);
	rootEl.querySelector("#xp").innerHTML = (Parser.crToXp(cr));

	var traits = mon.trait;
	rootEl.querySelector("#traits").style.display = 'none';

	if (traits && traits.length > 0) {
		rootEl.querySelector("#traits").style.display = 'block';
		for (var i = traits.length - 1; i >= 0; i--) {
			var traitname = traits[i].name;
			var traittext = traits[i].text;
			var traittexthtml = "";
			var renderedcount = 0;
			for (var n = 0; n < traittext.length; n++) {
				if (!traittext[n]) continue;

				renderedcount++;
				var firstsecond = "";
				if (renderedcount === 1) firstsecond = "first ";
				if (renderedcount === 2) firstsecond = "second ";

				var spells = "";
				if (traitname.indexOf("Spellcasting") !== -1 && traittext[n].indexOf(": ") !== -1) spells = "spells";
				if (traitname.indexOf("Variant") !== -1 && traitname.indexOf("Coven") !== -1 && traittext[n].indexOf(": ") !== -1) spells = "spells";

				traittexthtml = traittexthtml + "<p class='" + firstsecond + spells + "'>" + traittext[n].replace(/\u2022\s?(?=C|\d|At\swill)/g, "")+"</p>";
			}
			const newTrait = parseHTML("<div class='trait'><div class='trait" + i + "'><span class='name'>" + traitname + ".</span> " + traittexthtml + "</div></div>");
			jqAfter(rootEl.querySelector("#traits"), newTrait);

			// parse spells, make hyperlinks
			const spellLinks = rootEl.querySelectorAll('.trait div p.spells');
			for (let spellLink of spellLinks) {
				let spellslist = spellLink.innerHTML;
				if (spellslist[0] === "*") return;
				spellslist = spellslist.split(": ")[1].split(/\, (?!\+|\dd|appears|inside gems)/g);
				for (let i = 0; i < spellslist.length; i++) {
					spellslist[i] = "<a href='#/spells/" + encodeURIComponent((spellslist[i].replace(/(\*)| \(([^\)]+)\)/g, ""))).toLowerCase().replace("'", "%27") + "_" + "phb'>" + spellslist[i] + "</a>";
					if (i !== spellslist.length - 1) spellslist[i] = spellslist[i] + ", ";
				}

				spellLink.innerHTML = (spellLink.innerHTML.split(": ")[0] + ": " + spellslist.join(""));
			}
		}
	}

	const actions = mon.action;

	if (actions && actions.length) for (let i = actions.length - 1; i >= 0; i--) {
		const actionname = actions[i].name;
		const actiontext = actions[i].text;
		let actiontexthtml = "";
		let renderedcount = 0;
		for (let n = 0; n < actiontext.length; n++) {
			if (!actiontext[n]) continue;

			renderedcount++;
			let firstsecond = "";
			if (renderedcount === 1) firstsecond = "first ";
			if (renderedcount === 2) firstsecond = "second ";

			actiontexthtml = actiontexthtml + "<p class='"+firstsecond+"'>"+actiontext[n]+"</p>";
		}
		const newAction = parseHTML("<div class='action'><div class='action"+i+"'><span class='name'>"+actionname+".</span> "+actiontexthtml+"</div></div>")
		jqAfter(rootEl.querySelector('#actions'), newAction);
	}

	const reactions = mon.reaction;
	rootEl.querySelector("#reactions").style.display = 'none';

	if (reactions && (reactions.text || reactions.length)) {

		rootEl.querySelector("#reactions").style.display = 'block';

		if (!reactions.length) {
			const reactionname = reactions.name;
			const reactiontext = reactions.text;
			let reactiontexthtml = "";
			let renderedcount = 0;
			for (let n = 0; n < reactiontext.length; n++) {
				if (!reactiontext[n]) continue;

				renderedcount++;
				let firstsecond = "";
				if (renderedcount === 1) firstsecond = "first ";
				if (renderedcount === 2) firstsecond = "second ";

				reactiontexthtml = reactiontexthtml + "<p class='" + firstsecond + "'>" + reactiontext[n] + "</p>";
			}

			const newNonReaction = parseHTML("<div class='reaction'><div class='reaction0'><span class='name'>" + reactionname + ".</span> " + reactiontexthtml + "</div></div>")
			jqAfter(rootEl.querySelector("#reactions"), newNonReaction);
		}

		if (reactions.length) for (let i = reactions.length - 1; i >= 0; i--) {
			const reactionname = reactions[i].name;

			const reactiontext = reactions[i].text;
			let reactiontexthtml = "<span>" + reactiontext + "</span>";
			for (let n = 1; n < reactiontext.length; n++) {
				if (!reactiontext[n]) continue;
				reactiontexthtml = reactiontexthtml + "<p>" + reactiontext[n] + "</p>";
			}

			const newReaction = parseHTML("<div class='reaction'><div class='reaction" + i + "'><span class='name'>" + reactionname + ".</span> " + reactiontexthtml + "</div></div>")
			jqAfter(rootEl.querySelector("#reactions"), newReaction);
		}
	}

	const legendaries = mon.legendary;
	rootEl.querySelector("#legendaries").style.display = 'none';
	if (legendaries) {
		rootEl.querySelector("#legendaries").style.display = 'block';
		let shouldAddCap = legendaries.length > 0;
		for (let i = legendaries.length - 1; i >= 0; i--) {
			const legendaryname = legendaries[i].name ? legendaries[i].name + "." : "";
			const legendarytext = legendaries[i].text;
			let legendarytexthtml = "";
			let renderedcount = 0;
			for (let n = 0; n < legendarytext.length; n++) {
				if (!legendarytext[n]) continue;
				renderedcount++;
				let firstsecond = "";
				if (renderedcount === 1) firstsecond = "first ";
				if (renderedcount === 2) firstsecond = "second ";
				legendarytexthtml += `<p class='${firstsecond}'>${legendarytext[n]}</p>`;
			}
			const newLegendary = parseHTML(`<div class='legendary'><div class='legendary'><span class='name'>${legendaryname}</span> ${legendarytexthtml}</div></div>`)
			jqAfter(rootEl.querySelector("#legendaries"), newLegendary);
			if (legendaryname.trim() === '' || legendaryname.indexOf('Legendary Actions') > -1) {
				shouldAddCap = false;
			}
		}
		if (shouldAddCap) {
			const legendaryActions = mon.legendaryActions || 3;
			const legendaryName = name.split(",");
			const newLegendaryCap = parseHTML(`<div class='legendary'><div class='legendary'><span class='name'></span> <span>${legendaryName[0]} can take ${legendaryActions} legendary action${legendaryActions > 1 ? "s" : ""}, choosing from the options below. Only one legendary action can be used at a time and only at the end of another creature's turn. ${legendaryName[0]} regains spent legendary actions at the start of its turn.</span></div></div>`)
			jqAfter(rootEl.querySelector("#legendaries"), newLegendaryCap);
		}
	}

	rootEl.querySelector("#lairactions").style.display = 'none';
	rootEl.querySelector("#regionaleffects").style.display = 'none';
	if (mon.lairActions) renderSection("lairaction", mon.lairActions);
	if (mon.regionalEffects) renderSection("regionaleffect", mon.regionalEffects);

	function renderSection(sectionClass, sectionEntries) {
		rootEl.querySelector(`#${sectionClass}s`).style.display = 'block';
		entryList = {type: "entries", entries: sectionEntries};
		renderStack = [];
		renderer.recursiveEntryRender(entryList, renderStack);
		const newThing = parseHTML(`<div class='${sectionClass}'><div class='legendary'>${utils_makeRoller(renderStack.join(""))}</div></div>`)
		jqAfter(rootEl.querySelector(`#${sectionClass}s`), newThing);
	}

	if (mon.skill) {
		makeSkillRoller(rootEl.querySelector("#skills"));
	}
	if (mon.save) {
		makeSaveRoller(rootEl.querySelector("#saves"));
	}
	function makeSkillRoller(element) {
		const $this = element;

		const re = /,\s*(?![^()]*\))/g; // Don't split commas within parentheses
		const skills = $this.innerHTML.split(re).map(s => s.trim());
		const out = [];

		skills.map(s => {
			const re = /(\-|\+)?\d+|(?:[^\+]|\n(?!\+))+/g; // Split before and after each bonus
			const spl = s.match(re);

			const skillName = spl[0].trim();

			var skillString = "";
			spl.map(b => {
				const re = /(\-|\+)?\d+/;

				if (b.match(re)){
					const bonus = Number(b);
					const fromAbility = Parser.getAbilityModNumber(mon[getAttribute(skillName)]);
					const expectedPB = getProfBonusFromCr(mon.cr);
					const pB = bonus - fromAbility;
		
					const expert = (pB === expectedPB * 2) ? 2 : 1;
					const pBonusStr = `+${bonus}`;
					const pDiceStr = `${expert}d${pB*(3-expert)}${fromAbility >= 0 ? "+" : ""}${fromAbility}`;
		
					skillString += renderSkillOrSaveRoller(skillName, pBonusStr, pDiceStr, false);
				} else {
					skillString += b;
				}				
			});

			out.push(skillString);
		});		

		$this.innerHTML = (out.join(", "));
	}
	function makeSaveRoller(element) {
		const $this = element;
		const saves = $this.innerHTML.split(",").map(s => s.trim());
		const out = [];
		saves.map(s => {
			const spl = s.split("+").map(s => s.trim());
			const bonus = Number(spl[1]);
			const fromAbility = Parser.getAbilityModNumber(mon[spl[0].toLowerCase()]);
			const expectedPB = getProfBonusFromCr(mon.cr);
			const pB = bonus - fromAbility;

			const expert = (pB === expectedPB * 2) ? 2 : 1;
			const pBonusStr = `+${bonus}`;
			const pDiceStr = `${expert}d${pB*(3-expert)}${fromAbility >= 0 ? "+" : ""}${fromAbility}`;

			out.push(spl[0] + ' ' + renderSkillOrSaveRoller(spl[0], pBonusStr, pDiceStr, true));
		});
		$this.innerHTML = (out.join(", "));
	}
	function renderSkillOrSaveRoller(itemName, profBonusString, profDiceString, isSave) {
		const mode = PROF_MODE_BONUS;
		return `<span class='roller' title="${itemName} ${isSave ? " save" : ""}" data-roll-alt="1d20;${profDiceString}" data-roll='1d20${profBonusString}' ${ATB_PROF_MODE}='${mode}' ${ATB_PROF_DICE_STR}="+${profDiceString}" ${ATB_PROF_BONUS_STR}="${profBonusString}">${profBonusString}</span>`;
	}

	// inline rollers
	const statPEls = rootEl.querySelectorAll("#stats p");
	for (let statPEl of statPEls) {
		addNonD20Rollers(statPEl);

		// add proficiency dice stuff for attack rolls, since those _generally_ have proficiency
		// this is not 100% accurate; for example, ghouls don't get their prof bonus on bite attacks
		// fixing it would probably involve machine learning though; we need an AI to figure it out on-the-fly
		// (Siri integration forthcoming)
		const titleMaybe = attemptToGetTitle(statPEl);
		const mode = PROF_MODE_BONUS;

		statPEl.innerHTML = (statPEl.innerHTML.replace(/(\-|\+)?\d+(?= to hit)/g, function(match) {
			const bonus = Number(match);

			const expectedPB = getProfBonusFromCr(mon.cr);
			const withoutPB = bonus - expectedPB;

			if (expectedPB > 0) {
				const profDiceString = `1d${expectedPB*2}${withoutPB >= 0 ? "+" : ""}${withoutPB}`;

				return `<span class='roller' ${titleMaybe ? `title="${titleMaybe}"` : ""} data-roll-alt='1d20;${profDiceString}' data-roll='1d20${match}' ${ATB_PROF_MODE}='${mode}' ${ATB_PROF_DICE_STR}="+${profDiceString}" ${ATB_PROF_BONUS_STR}="${match}">${match}</span>`
			} else {
				return `<span class='roller' data-roll='1d20${match}'>${match}</span>`; // if there was no proficiency bonus to work with, fall back on this
			}
		}));

		statPEl.innerHTML = (statPEl.innerHTML.replace(/DC\s*(\d+)/g, function(match, capture) {
			const dc = Number(capture);

			const expectedPB = getProfBonusFromCr(mon.cr);

			if (expectedPB > 0) {
				const withoutPB = dc - expectedPB;
				const profDiceString = `1d${(expectedPB*2)}${withoutPB >= 0 ? "+" : ""}${withoutPB}`;

				return `DC <span class="dc-roller" ${titleMaybe ? `title="${titleMaybe}"` : ""} ${ATB_PROF_MODE}="${mode}" data-roll-alt="${profDiceString}" data-bonus="${capture}" ${ATB_PROF_DICE_STR}="+${profDiceString}" ${ATB_PROF_BONUS_STR}="${capture}">${capture}</span>`;
			} else {
				return match; // if there was no proficiency bonus to work with, fall back on this
			}
		}));
	}
	addNonD20Rollers(rootEl.querySelector("#stats #hp"));
	function addNonD20Rollers (ele) {
		ele.innerHTML = ele.innerHTML.replace(/\d+d\d+(\s?(\-|\+)\s?\d+\s?)?/g, function(match) {
      const titleMaybe = attemptToGetTitle(ele);
      return `<span class='roller' ${titleMaybe ? `title="${titleMaybe}"` : ""} data-roll='${match}'>${match}</span>`;
    });
	}
	function attemptToGetTitle(ele) {
		let titleMaybe = ele.parentElement.querySelector(".name");
		if (titleMaybe) {
			titleMaybe = titleMaybe.innerHTML;
			if (titleMaybe) {
				titleMaybe = titleMaybe.substring(0, titleMaybe.length-1).trim();
			}
		}
		return titleMaybe;
	}

	//$(".spells span.roller").contents().unwrap();
	let statsRollerEls = rootEl.querySelectorAll("#stats span.roller");
	for (let statsRollerEl of statsRollerEls) {
		statsRollerEl.addEventListener('click', () => {
			const $this = statsRollerEl;
			let roll;
			let rollResult;
			if ($this.getAttribute(ATB_PROF_MODE) === PROF_MODE_DICE) {
				roll = $this.getAttribute("data-roll-alt").replace(/\s+/g, "");
				// hacks because droll doesn't support e.g. "1d20+1d4+2" :joy: :ok_hand:
				const multi = roll.split(";");
				roll = roll.replace(";", "+");
				rollResult = droll.roll(multi[0]);
				const res2 = droll.roll(multi[1]);
				rollResult.rolls = rollResult.rolls.concat(res2.rolls);
				rollResult.total += res2.total;
			} else {
				roll = $this.getAttribute("data-roll").replace(/\s+/g, "");
				rollResult = droll.roll(roll);
			}
			outputRollResult($this, roll, rollResult);
		});
	}
	
	let statsDCRollerEls = rootEl.querySelectorAll("#stats span.roller");
	for (let statsDCRollerEl of statsDCRollerEls) {
		const $this = statsDCRollerEl;
    let roll;
    let rollResult;
    if ($this.getAttribute(ATB_PROF_MODE) === PROF_MODE_DICE) {
      roll = $this.getAttribute("data-roll-alt").replace(/\s+/g, "");
      rollResult = droll.roll(roll);
      outputRollResult($this, roll, rollResult);
    }
	}

	function outputRollResult($ele, roll, rollResult) {
		const name = window.monsterName;
		const newResult = parseHTML(
      `<span>${name}: <em>${roll}</em> rolled ${
        $ele.getAttribute("title") ? `${$ele.getAttribute("title")} ` : ""
      }for <strong>${rollResult.total}</strong> (<em>${rollResult.rolls.join(", ")}</em>)<br></span>`
		);
		const outputEl = rootEl.querySelector("#output");
		jqPrepend(outputEl, newResult);
		outputEl.style.display = 'block';
		if (outputEl.children.length === MAX_ROLLS + 1) {
			outputEl.children[MAX_ROLLS].remove();
		}
	}
}

export { renderSelection };
