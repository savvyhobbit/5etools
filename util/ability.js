import Parser from "../util/Parser.js";
import { utils_joinPhraseArray, util_capitalize } from "../js/utils.js";

export {
	parse_abilityLong,
	parse_abilityShort,
	parse_abilityCollection
};

function parse_abilityLong(abilityObj) {
	const TO_MAX_OF_TWENTY = ", to a maximum of 20.";
	const abbArr = [];
	if (abilityObj) {
		for (const abilityItem of abilityObj) {
			for (let [key, value] of Object.entries(abilityItem)) {
				if (key !== "choose" && key !== "hidden") {
					let mod = parseInt(value) > 0 ? "+" + value : value || "+1",
						ability = key;
						abbArr.push("Increase your " + Parser.attAbvToFull(ability) + " score by " + mod + TO_MAX_OF_TWENTY);
				}
			}
			if (abilityItem.choose) {	
				let options = abilityItem.choose.from,
					mod = abilityItem.choose.amount;
				
					mod = parseInt(mod) > 0 ? "+" + mod : mod || "+1";

				if (options.length === 6) {
					if (abilityItem.choose.entry) { // only used in "Resilient"
						abbArr.push(abilityItem.choose.entry);
					} else {
						abbArr.push("Increase one ability score of your choice by " + mod + TO_MAX_OF_TWENTY);
					}
				} else {
					const abbChoices = [];
					for (let option of options) {
						abbChoices.push(util_capitalize(option));
					}
					const abbChoicesText = utils_joinPhraseArray(abbChoices, ", ", " or ");
					abbArr.push("Increase your " + abbChoicesText + " by " + mod + TO_MAX_OF_TWENTY);
				}
			}
		}
	}
	return abbArr.join(" ");
}

function parse_abilityShort(abilityObj) {
	const abbArr = [];
	if (abilityObj) {
		for (const abilityItem of abilityObj) {
			for (let [key, value] of Object.entries(abilityItem)) {
				if (key !== "choose" && key !== "hidden") {
					let mod = parseInt(value) > 0 ? "+" + value : value || "+1",
						ability = key;
					abbArr.push(util_capitalize(ability) + " " + mod);
				}
			}
			if (abilityItem.choose) {	
				let options = abilityItem.choose.from,
					mod = abilityItem.choose.amount,
					count = abilityItem.choose.count,
					countStr = count !== undefined && count !== 1 ? `${count} from ` : "";
				
					mod = parseInt(mod) > 0 ? "+" + mod : mod || "+1";

				if (options.length === 6) {
					abbArr.push("Choose " + countStr + "any " + mod);
				} else if (options.length + abbArr.length === 6) {
					abbArr.push("Any other " + mod);
				} else {
					const abbChoices = [];
					for (let option of options) {
						abbChoices.push(util_capitalize(option));
					}
					const abbChoicesText = utils_joinPhraseArray(abbChoices, ", ", " or ");
					abbArr.push("Choose " + countStr + abbChoicesText + " " + mod);
				}
			} 
		}
	}
	return abbArr.join("; ");
}

function parse_abilityCollection(abilityObj) {
	const abbArr = [];
	if (abilityObj) {
		for (const abilityItem of abilityObj) {
			if (abilityItem.choose) {
				const options = abilityItem.choose.from;
				
				for (let option of options) {
					abbArr.push(option);
				}
			} else {
				for (let [ability, mod] of Object.entries(abilityItem)) {
					abbArr.push(ability);
				}
			}
		}
	}
	return abbArr;
}