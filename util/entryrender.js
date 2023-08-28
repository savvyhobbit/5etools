import { isNonstandardSource, encodeForHash, ascSort, utils_makeAttChoose } from "../js/utils.js";
import {
  CLSS_NON_STANDARD_SOURCE,
  HASH_LIST_SEP,
  ATB_DATA_SC,
  ATB_DATA_SRC,
  CLSS_SUBCLASS_FEATURE,
	SRC_MM,
	SRC_PHB,
	SRC_DMG
} from "../util/consts.js";
import Parser from "../util/Parser.js";
// ENTRY RENDERING =====================================================================================================
/*
 * // EXAMPLE USAGE //
 *
 * const entryRenderer = new EntryRenderer();
 *
 * const topLevelEntry = mydata[0];
 * // prepare an array to hold the string we collect while recursing
 * const textStack = [];
 *
 * // recurse through the entry tree
 * entryRenderer.renderEntries(topLevelEntry, textStack);
 *
 * // render the final product by joining together all the collected strings
 * $("#myElement").html(toDisplay.join(""));
 */
function EntryRenderer() {

	this.wrapperTag = "div";
	this.baseUrl = "";

	/**
	 * Set the tag used to group rendered elements
	 * @param tag to use
	 */
	this.setWrapperTag = function (tag) {
		this.wrapperTag = tag;
	};

	/**
	 * Set the base url for rendered links.
	 * Usage: `renderer.setBaseUrl("https://www.cool.site/")` (note the "http" prefix and "/" suffix)
	 * @param url to use
	 */
	this.setBaseUrl = function(url) {
		this.baseUrl = url;
	};

	/**
	 * Recursively walk down a tree of "entry" JSON items, adding to a stack of strings to be finally rendered to the
	 * page. Note that this function does _not_ actually do the rendering, see the example code above for how to display
	 * the result.
	 *
	 * @param entry An "entry" usually defined in JSON. A schema is available in tests/schema
	 * @param textStack A reference to an array, which will hold all our strings as we recurse
	 * @param depth The current recursion depth. Optional; default 0, or -1 for type "section" entries
	 * @param prefix The (optional) prefix to be added to the textStack before whatever is added by the current call
	 * @param suffix The (optional) suffix to be added to the textStack after whatever is added by the current call
	 * @param forcePrefixSuffix force the prefix and suffix to be added (useful for the first call from external code)
	 */
	this.recursiveEntryRender = function(entry, textStack, depth, prefix, suffix, forcePrefixSuffix, parentName) {
		depth = depth === undefined || depth === null ? entry.type === "section" ? -1 : 0 : depth;
		prefix = prefix === undefined || prefix === null ? null : prefix;
		suffix = suffix === undefined || suffix === null ? null : suffix;
		forcePrefixSuffix = forcePrefixSuffix === undefined || forcePrefixSuffix === null ? false : forcePrefixSuffix;

		if (forcePrefixSuffix) renderPrefix();
		if (typeof entry === "object") {
			// the root entry (e.g. "Rage" in barbarian "classFeatures") is assumed to be of type "entries"
			const type = entry.type === undefined || entry.type === "section" ? "entries" : entry.type;
			switch (type) {
				// TODO add an "insert box" type

				// recursive
				case "entries":
					handleEntries(this);
					break;
				case "options":
					handleOptions(this);
					break;
				case "list":
					if (entry.items) {
						textStack.push(`<ul ${entry.style ? `class="${entry.style}"` : ''}>`);
						console.error("hasdffd");
						for (let i = 0; i < entry.items.length; i++) {
							this.recursiveEntryRender(entry.items[i], textStack, depth + 1, `<li ${isNonstandardSource(entry.items[i].source) ? `class="${CLSS_NON_STANDARD_SOURCE}"` : ""}>`, "</li>", undefined, parentName);
						}
						textStack.push("</ul>");
					}
					break;
				case "table":
					renderTable(this);
					break;
				case "invocation":
					handleInvocation(this);
					break;
				case "patron":
					handlePatron(this);
					break;

				// block
				case "abilityDc":
					renderPrefix();
					textStack.push(`<span class='spell-ability'><span>${entry.name} save DC</span> = 8 + your proficiency bonus + your ${utils_makeAttChoose(entry.attributes)}</span>`);
					renderSuffix();
					break;
				case "abilityAttackMod":
					if (prefix !== null) textStack.push(prefix);
					textStack.push(`<span class='spell-ability'><span>${entry.name} attack modifier</span> = your proficiency bonus + your ${utils_makeAttChoose(entry.attributes)}</span>`);
					if (suffix !== null) textStack.push(suffix);
					break;

				// inline
				case "inline":
					if (entry.entries) {
						for (let i = 0; i < entry.entries.length; i++) {
							this.recursiveEntryRender(entry.entries[i], textStack, depth, undefined, undefined, undefined, parentName);
						}
					}
					break;
				case "bonus":
					textStack.push((entry.value < 0 ? "" : "+") + entry.value);
					break;
				case "bonusSpeed":
					textStack.push((entry.value < 0 ? "" : "+") + entry.value + "ft.");
					break;
				case "dice":
					textStack.push(EntryRenderer.getEntryDice(entry));
					break;
				case "link":
					renderLink(this, entry);
					break;
				case "item":
					textStack.push(`<li><b>${entry.name.endsWith(".") ? entry.name : entry.name + ":"} </b>`);
					if (entry.entry) {
						this.recursiveEntryRender(entry.entry || entry.entries, textStack, depth, undefined, undefined, undefined, parentName);
					} else if (entry.entries) {
						for (let i = 0; i < entry.entries.length; i++) {
							this.recursiveEntryRender(entry.entries[i], textStack, depth, undefined, undefined, undefined, parentName);
						}
					}
					textStack.push('</li>');
					break;
				case "print":
					textStack.push(renderString(entry.entry));
					break;
			}
		} else if (typeof entry === "string") { // block
			renderPrefix();
			renderString(this);
			renderSuffix();
		} else { // block
			// for ints or any other types which do not require specific rendering
			renderPrefix();
			textStack.push(entry);
			renderSuffix();
		}
		if (forcePrefixSuffix) renderSuffix();

		function renderPrefix() {
			if (prefix !== null) {
				textStack.push(prefix);
			}
		}
		function renderSuffix() {
			if (suffix !== null) {
				textStack.push(suffix);
			}
		}

		function renderTable(self) {
			// TODO add handling for rowLabel property

			textStack.push("<div class='entry-table__scroll-wrap'><table class='table'>");

			if (entry.caption !== undefined) {
				textStack.push(`<caption>${entry.caption}</caption>`);
			}
			textStack.push("<thead>");
			textStack.push("<tr class='table-row table-row--header'>");

			if (entry.colLabels) {
				for (let i = 0; i < entry.colLabels.length; ++i) {
					textStack.push(`<th ${getTableThClassText(i)}>${entry.colLabels[i]}</th>`);
				}
			}

			textStack.push("</tr>");
			textStack.push("</thead>");
			textStack.push("<tbody>");

			for (let i = 0; i < entry.rows.length; ++i) {
				textStack.push("<tr class='table-row'>");
				for (let j = 0; j < entry.rows[i].length; ++j) {
					textStack.push(`<td ${makeTableTdClassText(j)}>`);
					self.recursiveEntryRender(entry.rows[i][j], textStack, depth + 1, undefined, undefined, undefined, parentName);
					textStack.push("</td>");
				}
				textStack.push("</tr>");
			}

			textStack.push("</tbody>");
			textStack.push("</table></div>");

			function getTableThClassText(i) {
				return entry.colStyles === undefined || i >= entry.colStyles.length ? "class='table-cell'" :  `class="table-cell ${entry.colStyles[i]}"`;
			}

			function makeTableTdClassText(i) {
				if (entry.rowStyles !== undefined) {
					return entry.rowStyles === undefined || i >= entry.rowStyles.length ? "class='table-cell'" : `class="table-cell ${entry.rowStyles[i]}"`;
				} else {
					return getTableThClassText(i);
				}
			}
		}


		function handleEntries(self) {
			handleEntriesOptionsInvocationPatron(self, true);
		}

		function handleOptions(self) {
			if (entry.entries) {
				entry.entries = entry.entries.sort((a, b) => a.name && b.name ? ascSort(a.name, b.name) : a.name ? -1 : b.name ? 1 : 0);
				handleEntriesOptionsInvocationPatron(self, false);
			}
		}

		function handleInvocation(self) {
			handleEntriesOptionsInvocationPatron(self, true);
		}

		function handlePatron(self) {
			handleEntriesOptionsInvocationPatron(self, false);
		}

		function handleEntriesOptionsInvocationPatron(self, incDepth) {
			const inlineTitle = depth >= 2;
			const nextDepth = incDepth ? depth+1 : depth;
			const styleString = getStyleString();
			const dataString = getDataString();
			const preReqText = getPreReqText();
			const headerSpan = entry.name !== undefined ? `<span class="stat-name ${entry.subclassShortName ? 'is-subclass' : ''}">${entry.subclassShortName ? `${entry.subclassShortName}: ` : ''}${entry.name}${isNonstandardSource(entry.source) ? ' (UA)' : ''}${inlineTitle ? "." : ""}</span> ` : "";

			if (entry.entries || entry.name) {
				textStack.push(`<${self.wrapperTag} ${dataString} ${styleString}>${headerSpan}${preReqText}`);
				if (entry.entries) {
					for (let i = 0; i < entry.entries.length; i++) {
						self.recursiveEntryRender(entry.entries[i], textStack, nextDepth, "<p>", "</p>", undefined, parentName);
					}
				}
				textStack.push(`</${self.wrapperTag}>`);
			}

			function getStyleString() {
				const styleClasses = [];
				if (isNonstandardSource(entry.source)) styleClasses.push(CLSS_NON_STANDARD_SOURCE);
				if (inlineTitle && entry.name !== undefined) styleClasses.push(EntryRenderer.HEAD_2);
				else styleClasses.push(depth === -1 ? EntryRenderer.HEAD_NEG_1 : depth === 0 ? EntryRenderer.HEAD_0 : EntryRenderer.HEAD_1);
				if ((entry.type === "invocation" || entry.type === "patron") && entry.subclass !== undefined) styleClasses.push(CLSS_SUBCLASS_FEATURE);
				return styleClasses.length > 0 ? `class="${styleClasses.join(" ")}"` : "";
			}

			function getDataString() {
				let dataString = "";
				if (entry.type === "invocation" || entry.type === "patron") {
					const titleString = entry.source ? `title="Source: ${Parser.sourceJsonToFull(entry.source)}"` : "";
					if (entry.subclass !== undefined) dataString = `${ATB_DATA_SC}="${entry.subclass.name}" ${ATB_DATA_SRC}="${entry.subclass.source}" ${titleString}`;
					else dataString = `${ATB_DATA_SC}="${EntryRenderer.DATA_NONE}" ${ATB_DATA_SRC}="${EntryRenderer.DATA_NONE}" ${titleString}`;
				}
				return dataString;
			}

			function getPreReqText() {
				if (entry.prerequisite) return `<span class="prerequisite">Prerequisite: ${entry.prerequisite}</span>`;
				return "";
			}
		}

		function renderLink(self, entry) {
			let href;
			if (entry.href.type === "internal") {
				// baseURL is blank by default
				if (entry.href.hash) {
					const partMatch = entry.href.hash.match(/\/([^\/]+)\/([^_]+)_(.*)/);
					if (partMatch && partMatch.length === 4) {
						href = `javascript: (() => {
							document.body.children[0].shadowRoot.children[0].dispatchEvent(new CustomEvent("open-drawer", {
								bubbles: true,
								composed: true,
								detail: {
									decode: true,
									selectedItem: {name: "${partMatch[2].trim()}", source: "${partMatch[3].toLowerCase().trim()}"},
									viewId: "${partMatch[1].trim()}"
								}
							}));
						})();`
					} else if (entry.href.hash.includes("/")) {
						href = `javascript: (() => {
							document.body.children[0].shadowRoot.children[0].dispatchEvent(new CustomEvent("open-drawer", {
								bubbles: true,
								composed: true,
								detail: {
									viewId: "${entry.href.hash.split("/")[1]}"
								}
							}));
						})();`
					} else {
						console.error('Can\'t parse entry link!!!!', entry.href.hash);
					}
				} else {
					href = `${self.baseUrl}${entry.href.path}#`;
				}
			} else if (entry.href.type === "external") {
				href = entry.href.url;
			} else if (entry.href.type === "code") {
				href = entry.href.code;
			}
			textStack.push(`<a href='${href}'>${entry.text}</a>`);
		}

		function renderString(self) {
			const tagSplit = splitByTags();
			for (let i = 0; i < tagSplit.length; i++) {
				const s = tagSplit[i];
				if (s === undefined || s === null || s === "") continue;
				if (s.charAt(0) === "@") {
					const [tag, text] = splitFirstSpace(s);

					if (tag === "@bold" || tag === "@b" || tag === "@italic" || tag === "@i" || tag === "@skill" || tag === "@action") {
						switch (tag) {
							case "@b":
							case "@bold":
								textStack.push(`<b>`);
								self.recursiveEntryRender(text, textStack, depth, undefined, undefined, undefined, parentName);
								textStack.push(`</b>`);
								break;
							case "@i":
							case "@italic":
								textStack.push(`<i>`);
								self.recursiveEntryRender(text, textStack, depth, undefined, undefined, undefined, parentName);
								textStack.push(`</i>`);
								break;
							case "@action": // Convert this to a tag once the rules data are more navigable
								textStack.push(`<span title="${Parser.actionToExplanation(text)}" class="explanation">${text}</span>`);
								break;
							case "@skill": // Convert this to a tag once the rules data are more navigable
								textStack.push(`<span title="${Parser.skillToExplanation(text)}" class="explanation">${text}</span>`);
								break;
						}
					} else {
						const [name, source, displayText, ...others] = text.split("|");
						const hash = `${name}${source ? `${HASH_LIST_SEP}${source}` : ""}`;

						const fauxEntry = {
							"type": "link",
							"href": {
								"type": "internal",
								"path": "",
								"hash": encodeForHash(hash)
							},
							"text": (displayText ? displayText : name)
						};
						switch (tag) {
							case "@spell":
								if (!source) fauxEntry.href.hash += HASH_LIST_SEP + SRC_PHB;
								fauxEntry.href.hash = "/spells/" + fauxEntry.href.hash;
								self.recursiveEntryRender(fauxEntry, textStack, depth, undefined, undefined, undefined, parentName);
								break;
							case "@item":
								if (!source) fauxEntry.href.hash += HASH_LIST_SEP + SRC_DMG;
								fauxEntry.href.hash = "/items/" + fauxEntry.href.hash;
								self.recursiveEntryRender(fauxEntry, textStack, depth, undefined, undefined, undefined, parentName);
								break;
							case "@condition":
								if (!source) fauxEntry.href.hash += HASH_LIST_SEP + SRC_PHB;
								fauxEntry.href.hash = "/conditions/" + fauxEntry.href.hash;
								self.recursiveEntryRender(fauxEntry, textStack, depth, undefined, undefined, undefined, parentName);
								break;
							case "@class":
								const classMatch = EntryRenderer.RE_INLINE_CLASS.exec(text);
								if (classMatch) {
									fauxEntry.href.hash = classMatch[1].trim(); // TODO pass this in
									fauxEntry.href.subhashes = [{"key": "sub", "value": classMatch[2].trim() + "~phb"}] // TODO pass this in
								}
								if (!source) fauxEntry.href.hash += HASH_LIST_SEP + SRC_PHB;
								fauxEntry.href.hash = "/classes/" + fauxEntry.href.hash;
								self.recursiveEntryRender(fauxEntry, textStack, depth, undefined, undefined, undefined, parentName);
								break;
							case "@creature":
								if (!source) fauxEntry.href.hash += HASH_LIST_SEP + SRC_MM;
								fauxEntry.href.hash = "/bestiary/" + fauxEntry.href.hash;
								self.recursiveEntryRender(fauxEntry, textStack, depth, undefined, undefined, undefined, parentName);
								break;
							case "@filter":
								// todo... maybe
								textStack.push(name);
								break;
							case "@damage":
							case "@dice":
								// todo
								fauxEntry.href.type = 'code';
								const parentNameStr = parentName ? parentName.split('"').join('').split("'").join("") : "";
								fauxEntry.href.code = `javascript: (() => { window.rollDice("Link", "${name}", "${parentNameStr ? `${encodeURIComponent(parentNameStr)} ` : ''}"); })();`
								self.recursiveEntryRender(fauxEntry, textStack, depth, undefined, undefined, undefined, parentName);
								break;
							case "@book":
								//todo
								textStack.push(name);
								break;
							case "@5etools":
								if (source.indexOf(".") > -1) {
									fauxEntry.href.hash = "/" + source.substring(0, source.indexOf("."))
								} else {
									fauxEntry.href.hash = "/" + source;
								}
								self.recursiveEntryRender(fauxEntry, textStack, depth, undefined, undefined, undefined, parentName);
								break;
							default:
								textStack.push(name);
						}
					}
				} else {
					textStack.push(s);
				}
			}

			function splitFirstSpace(string) {
				return [
					string.substr(0, string.indexOf(' ')),
					string.substr(string.indexOf(' ') + 1)
				]
			}

			function splitByTags() {
				let tagDepth = 0;
				let inTag = false;
				let char, char2;
				const out = [];
				let curStr = "";
				for (let i = 0; i < entry.length; ++i) {
					char = entry.charAt(i);
					char2 = i < entry.length-1 ? entry.charAt(i+1) : null;

					switch (char) {
						case "{":
							if (char2 === "@") {
								if (tagDepth++ > 0) {
									curStr += char;
								} else {
									out.push(curStr);
									inTag = false;
									curStr = "";
								}
							} else {
								curStr += char;
							}
							break;
						case "}":
							if (--tagDepth === 0) {
								out.push(curStr);
								curStr = "";
							} else {
								curStr += char;
							}
							break;
						default:
							curStr += char;
					}
				}
				if (curStr.length > 0) out.push(curStr);

				return out;
			}
		}
	};
}

EntryRenderer.getEntryDice = function (entry) {
	// TODO make droll integration optional
	let toAdd;
	if (entry.number && entry.faces) {
		toAdd = String(entry.number) + "d" + entry.faces;
	} else if (entry.toRoll && entry.toRoll.length) {
		for (let roll of entry.toRoll) {
			toAdd = String(roll.number) + "d" + roll.faces + " + "
		}
		toAdd = toAdd.substring(0, toAdd.length - 3);
	}
	if (typeof droll !== "undefined" && entry.rollable === true) {
		// TODO output this somewhere nice
		// TODO make this less revolting

		// TODO output to small tooltip-stype bubble? Close on mouseout
		return `<span class='roller unselectable' onclick="if (this.rolled) { this.innerHTML = this.innerHTML.split('=')[0].trim()+' = '+droll.roll('${toAdd}').total; } else { this.rolled = true; this.innerHTML += ' = '+droll.roll('${toAdd}').total; }">${toAdd}</span>`;
	} else {
		return toAdd;
	}
};

EntryRenderer.RE_INLINE_CLASS = /(.*?) \((.*?)\)/;
EntryRenderer.HEAD_NEG_1 = "statsBlockSectionHead";
EntryRenderer.HEAD_0 = "statsBlockHead";
EntryRenderer.HEAD_1 = "statsBlockSubHead";
EntryRenderer.HEAD_2 = "statsInlineHead";
EntryRenderer.DATA_NONE = "data-none";

export default EntryRenderer;