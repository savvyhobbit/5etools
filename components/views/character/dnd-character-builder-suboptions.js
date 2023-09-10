import { PolymerElement, html } from "@polymer/polymer";
import {
    getCharacterChannel,
    getSelectedCharacter,
    saveCharacter,
} from "../../../util/charBuilder";
import { getEditModeChannel, isEditMode } from "../../../util/editMode";
import { util_capitalizeAll, absInt, cloneDeep } from "../../../js/utils"; 
import { filterModel, loadModel } from "../../../util/data";
import '../../dnd-select-add';
import '../../dnd-asi-select';
import { SKILL_TO_ATB_ABV } from "../../../js/bestiary";
import { } from '@polymer/polymer/lib/elements/dom-if.js';
import { } from '@polymer/polymer/lib/elements/dom-repeat.js';
import { LANGUAGES_ALL, toolsListFromCategory, TOOLS_ALL, WEAPON_ALL, WEAPON_MARTIAL, WEAPON_SIMPLE } from "../../../util/consts";
import Parser from "../../../util/Parser";


// TODO parsing
//// "expertise"
//// class entry parsing - "gain proficiency" - {@item brewer's supplies|phb}, martial weapons, {@skill Performance}, or, choose one, 
///

class DndCharacterBuilderSuboptions extends PolymerElement {
    static get properties() {
        return {
            storageKey: {
                type: String
            },
            label: {
                type: String
            },
            // This selectedItem provided is used to populate the sub option fields using the option data structure setup in data
            selectedItem: {
                type: Object
            },

            skillProfOptions: {
                type: Array,
                value: []
            },
            skillProfChoices: {
                type: Number,
            },
            selectedSkillProfs: {
                type: Array,
            },
            defaultSkillProfs: {
                type: String,
                value: ""
            },

            toolProfOptions: {
                type: Array,
                value: []
            },
            defaultToolProfs: {
                type: String,
                value: ""
            },

            langProfOptions: {
                type: Array,
                value: []
            },
            defaultLangProfs: {
                type: String,
                value: ""
            },

            weaponProfOptions: {
                type: Array,
                value: []
            },
            defaultWeaponProfs: {
                type: String,
                value: ""
            },

            armorProfOptions: {
                type: Array,
                value: []
            },
            defaultArmorProfs: {
                type: String,
                value: ""
            },
            defaultDarkvision: {
                type: String,
                value: ""
            },

            attributeOptions: {
                type: Array,
                value: []
            },
            attributeChoices: {
                type: Number,
            },
            attributeMod: {
                type: Number,
            },
            selectedAttributes: {
                type: Array,
            },
            defaultAttributes: {
                type: String,
                value: ""
            },

            resistOptions: {
                type: Array,
                value: []
            },
            resistChoices: {
                type: Number,
            },
            selectedResists: {
                type: Array,
            },
            defaultResists: {
                type: String,
                value: ""
            },

            conditionImmuneOptions: {
                type: Array,
                value: []
            },
            conditionImmuneChoices: {
                type: Number,
            },
            selectedConditionImmunes: {
                type: Array,
            },
            defaultConditionImmunes: {
                type: String,
                value: ""
            },

            featOptions: {
                type: Array,
                value: []
            },
            featChoices: {
                type: Number
            },
            selectedFeat: {
                type: Array,
            },

            sTLProfOptions: {
                type: Array,
                value: []
            },
            sTLProfChoices: {
                type: Number
            },
            selectedSTLProfs: {
                type: Array,
            },

            spellSetOptions: {
                type: Array,
            },
            selectedSpellSet: {
                type: Object,
                value: {}
            },

            isEditMode: {
                type: Boolean,
                value: false
            },
        };
    }

    static get observers() {
        return ['updateOptions(selectedItem, storageKey)']
    }

    connectedCallback() {
        super.connectedCallback();

        this.characterChangeHandler = (e) => {
            // let character = cloneDeep(e.detail.character);
            let character = e.detail.character;
            this.set('character', character);
        };
        
        this.set('character', getSelectedCharacter());
        getCharacterChannel().addEventListener("character-selected", this.characterChangeHandler);

        this.editModeHandler = (e) => {
            this.isEditMode = e.detail.isEditMode;
        }
        getEditModeChannel().addEventListener('editModeChange', this.editModeHandler);
        this.isEditMode = isEditMode();
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        getCharacterChannel().removeEventListener("character-selected", this.characterChangeHandler);
        getEditModeChannel().removeEventListener('editModeChange', this.editModeHandler);
    }

    async updateOptions() {
        if (!this.character) {
            this.set('character', getSelectedCharacter());
        }
        if (this.storageKey && this.selectedItem) {
            // Finding the storedItem from the character's choices at storageKey 
            const storageKeys = this.storageKey.split('.');
            if (!this.character.choices) {
                this.character.choices = {};
            }
            let storedItem = this.character.choices;

            for (let i = 0; i < storageKeys.length; i++) {
                const storageKey = storageKeys[i];
                if (!storedItem[storageKey]) {
                    if (storageKeys.length < i + 1 && !isNaN(parseInt(storageKeys[i + 1], 10))) {
                        storedItem[storageKey] = new Array(20);
                    } else {
                        storedItem[storageKey] = {};
                    }
                }
                if (i === storageKeys.length - 1) {
                    // Clearing out all stored choices if the selected item has changed from what was previously selected and options chosen for
                    if (storedItem[storageKey].selectedItemName !== this.selectedItem.name || storedItem[storageKey].selectedItemSource !== this.selectedItem.source) {
                        storedItem[storageKey] = {
                            selectedItemName: this.selectedItem.name,
                            selectedItemSource: this.selectedItem.source,
                            label: this.label || undefined
                        }
                    }
                }
                storedItem = storedItem[storageKey];
            }
            this.storedItem = storedItem;
            if (this.label) {
                this.storedItem.label = this.label;
            }

            // Retrieving the selected choices for attribute, feat, or proficiency off of the storedItem

            // Populating Attribute choice field
            this.attributeOptions = [];
            this.attributeChoices = null;
            this.attributeMod = 1;
            this.selectedAttributes = null;
            this.defaultAttributes = null;
            if (this.selectedItem.ability && this.selectedItem.ability.length) {
                const ability = this.selectedItem.ability[0];
                if (ability.choose) {
                    this.attributeOptions = ability.choose.from.map(i => { return i.toUpperCase() });
                    this.attributeChoices = ability.choose.count || 1;
                    this.attributeMod = ability.choose.amount || 1;
                    this.selectedAttributes = this.storedItem.selectedAttributes ? this.storedItem.selectedAttributes.split(',') : null;
                }
                this.defaultAttributes = this.selectedItem.ability.map((abilityObj) => {
                    return Object.entries(abilityObj).map(e => {
                        if (e[0] !== 'choose' && e[0] !== 'any') {
                            let attribute = e[0].toLowerCase(),
                                mod = e[1];
                            return attribute.toUpperCase() + ' ' + absInt(mod);
                        }
                    }).filter(e => !!e).join(', ');
                }).filter(e => !!e).join(', ');

                // store defaults on character to avoid future look-ups
                this.storedItem.defaultAttributes = this.defaultAttributes;
                this.storedItem.attributeMod = this.attributeMod;
            }

            // Populating Skill Proficiency choice field
            this.skillProfOptions = [];
            this.skillProfChoices = null;
            this.selectedSkillProfs = null;
            this.defaultSkillProfs = null;
            if (this.selectedItem.skillProficiencies && this.selectedItem.skillProficiencies.length) {
                const skillProficiency = this.selectedItem.skillProficiencies[0];
                if (skillProficiency.choose) {
                    this.skillProfOptions = skillProficiency.choose.from;
                    this.skillProfChoices = skillProficiency.choose.count || 1;
                    this.selectedSkillProfs = this.storedItem.selectedSkillProfs ? this.storedItem.selectedSkillProfs.split(',') : null;
                }
                if (skillProficiency.any) {
                    if (this.selectedItem.name === "Custom Lineage") {
                        this.skillProfOptions = ["Darkvision (60ft)"].concat(Object.keys(SKILL_TO_ATB_ABV));
                    } else {
                        this.skillProfOptions = Object.keys(SKILL_TO_ATB_ABV);
                    }
                    this.skillProfChoices = skillProficiency.any;
                    this.selectedSkillProfs = this.storedItem.selectedSkillProfs ? this.storedItem.selectedSkillProfs.split(',') : null;
                }
                this.defaultSkillProfs = Object.keys(skillProficiency).map(e => {
                    if (e !== 'choose' && e !== 'any') {
                        return util_capitalizeAll(e) 
                    }
                }).filter(e => !!e).join(', ');
                // store defaults on character to avoid future look-ups
                this.storedItem.defaultSkillProfs = this.defaultSkillProfs;
            }


            // "toolProficiencies" (Dragon Casualty)
            //     tool list special keys - artisan's tools, musical instruments, gaming set, any, choose.from
            //     values usually === true or 2
            const toolProfOptions = []
            let defaultToolProfs = [];
            if (this.selectedItem.toolProficiencies && this.selectedItem.toolProficiencies.length) {
                if (this.selectedItem.toolProficiencies.length > 1) {
                    // TODO: generated a dropdown for choosing index and add additional suboption components for each choice.
                    // path of nested suboptions should use an indexed key
                    // test with "Dragon Causualty"
                } else {
                    if (!this.storedItem.selectedToolProfs || typeof this.storedItem.selectedToolProfs === 'string') {
                        this.storedItem.selectedToolProfs = {};
                    }
                    const toolProficiency = this.selectedItem.toolProficiencies[0];

                    Object.entries(toolProficiency).forEach(([toolKey, toolVal]) => {
                        const newToolProfOption = {
                            key: toolKey,
                            toolProfOptions: toolsListFromCategory(toolKey),
                            selectedToolProfs: this.storedItem.selectedToolProfs[toolKey] ? this.storedItem.selectedToolProfs[toolKey].split(',') : null
                        };
                        switch (toolKey) {
                            case 'choose':
                                const toolListsMapped = toolVal.from.map(toolsListFromCategory);
                                newToolProfOption.toolProfOptions = toolListsMapped.flat();
                                newToolProfOption.toolProfChoices = toolVal.count || 1;
                                toolProfOptions.push(newToolProfOption);
                                break;
    
                            case 'any':
                                newToolProfOption.toolProfChoices = toolProficiency.any || 1;
                                toolProfOptions.push(newToolProfOption);
                                break;
    
                            case "artisan's tools":
                            case 'musical instrument':
                            case 'gaming set':
                                newToolProfOption.label = `Selected ${util_capitalizeAll(toolKey)}`;
                                newToolProfOption.toolProfChoices = Number.isInteger(toolVal) ? toolVal : 1;
                                toolProfOptions.push(newToolProfOption);
                                break;
                        
                            default:
                                defaultToolProfs.push(util_capitalizeAll(toolKey))
                                break;
                        }

                    })
                    defaultToolProfs = defaultToolProfs.filter(e => !!e).join(', ');
                    // store defaults on character to avoid future look-ups
                    this.set('defaultToolProfs', defaultToolProfs.length > 0 ? defaultToolProfs : null);
                    this.storedItem.defaultToolProfs = defaultToolProfs;
                }
            }
            this.set('toolProfOptions', toolProfOptions.length > 0 ? toolProfOptions : null);


            // "skillToolLanguageProficiencies"
            let sTLProfOptions = [];
            let sTLProfChoices = 1;
            if (this.selectedItem.skillToolLanguageProficiencies && this.selectedItem.skillToolLanguageProficiencies.length) {
                const sTLDef = this.selectedItem.skillToolLanguageProficiencies[0];
                if (sTLDef.choose && sTLDef.choose.length) {
                    if (sTLDef.choose[0].from && sTLDef.choose[0].from.length) {
                        if (sTLDef.choose[0].from.includes("anySkill")) {
                            sTLProfOptions = sTLProfOptions.concat(Object.keys(Parser.SKILL_JSON_TO_FULL).map(skill => { return {name: skill, type: 'skill'} }));
                        }
                        if (sTLDef.choose[0].from.includes("anyTool")) {
                            sTLProfOptions = sTLProfOptions.concat(TOOLS_ALL.map((tool) => { return {...tool, type: "tool"} }));
                        }
                    }
                    if (sTLDef.choose[0].count) {
                        sTLProfChoices = sTLDef.choose[0].count;
                    }
                }
            }
            this.sTLProfChoices = sTLProfChoices;
            this.set('sTLProfOptions', sTLProfOptions.length > 0 ? sTLProfOptions : null);
            this.selectedSTLProfs = this.storedItem.selectedSTLProfs || null;


            // "resist"
            let defaultResists = [];
            let resistOptions = [];
            let resistChoices = 1;
            if (this.selectedItem.resist && this.selectedItem.resist.length) {
                this.selectedItem.resist.forEach((resist) => {
                    if (typeof resist === 'string') {
                        defaultResists.push(resist);
                    } else if (resist.choose) {
                        resistOptions = resist.choose.from;
                        if (resist.choose.count) {
                            resistChoices = resist.choose.count;
                        }
                    }
                });
                this.set('defaultResists', defaultResists.length > 0 ? defaultResists.map(util_capitalizeAll).join(', ') : null);
                this.storedItem.defaultResists = defaultResists;
            }
            this.resistChoices = resistChoices;
            this.set('resistOptions', resistOptions.length > 0 ? resistOptions : null);
            this.selectedResists = this.storedItem.selectedResists || null;


            // "conditionImmune"
            let defaultConditionImmunes = [];
            let conditionImmuneOptions = [];
            let conditionImmuneChoices = 1;
            if (this.selectedItem.conditionImmune && this.selectedItem.conditionImmune.length) {
                this.selectedItem.conditionImmune.forEach((conditionImmune) => {
                    if (typeof conditionImmune === 'string') {
                        defaultConditionImmunes.push(conditionImmune);
                    } else if (conditionImmune.choose) {
                        conditionImmuneOptions = conditionImmune.choose.from;
                        if (conditionImmune.choose.count) {
                            conditionImmuneChoices = conditionImmune.choose.count;
                        }
                    }
                });
                this.set('defaultConditionImmunes', defaultConditionImmunes.length > 0 ? defaultConditionImmunes.map(util_capitalizeAll).join(', ') : null);
                this.storedItem.defaultConditionImmunes = defaultConditionImmunes;
            }
            this.conditionImmuneChoices = conditionImmuneChoices;
            this.set('conditionImmuneOptions', conditionImmuneOptions.length > 0 ? conditionImmuneOptions : null);
            this.selectedConditionImmunes = this.storedItem.selectedConditionImmunes || null;


            // "languageProficiencies" 
            //      any: #, anyStandard: #, dwarvish, choose:from, other (this usually? indicates race's own language)
            // test with  Vedalken
            const langProfOptions = []
            let defaultLangProfs = [];
            if (this.selectedItem.languageProficiencies && this.selectedItem.languageProficiencies.length) {
                if (!this.storedItem.selectedLangProfs || typeof this.storedItem.selectedLangProfs === 'string') {
                    this.storedItem.selectedLangProfs = {};
                }
                this.selectedItem.languageProficiencies.forEach(langProficiency => {
                    Object.entries(langProficiency).forEach(([langKey, langVal]) => {
                        const newLangProfOption = {
                            key: langKey,
                            langProfOptions: toolsListFromCategory(langKey),
                            selectedLangProfs: this.storedItem.selectedLangProfs[langKey] ? this.storedItem.selectedLangProfs[langKey].split(',') : null
                        };
                        switch (langKey) {
                            case 'choose':
                                newLangProfOption.langProfOptions = langVal.from;
                                newLangProfOption.langProfChoices = langVal.count || 1;
                                langProfOptions.push(newLangProfOption);
                                break;

                            case 'any':
                            case 'anyStandard':
                                newLangProfOption.langProfOptions = LANGUAGES_ALL;
                                newLangProfOption.langProfChoices = Number.isInteger(langVal) ? langVal : 1;
                                langProfOptions.push(newLangProfOption);
                                break;

                            case "other":
                                let name = this.selectedItem.name;
                                if (name.includes("(")) {
                                    name = name.substring(0, name.indexOf('(')).trim();
                                }
                                defaultLangProfs.push(name);
                                break;
                        
                            default:
                                defaultLangProfs.push(util_capitalizeAll(langKey))
                                break;
                        }
                    });
                });
                defaultLangProfs = defaultLangProfs.filter(e => !!e).join(', ');
                this.defaultLangProfs = defaultLangProfs.length > 0 ? defaultLangProfs : null;
                // store defaults on character to avoid future look-ups
                this.storedItem.defaultLangProfs = defaultLangProfs;
            }
            this.set('langProfOptions', langProfOptions.length > 0 ? langProfOptions : null);

            // "weaponProficiencies"
            //     martial, simple
            // 
            //     "longsword|phb": true,
            //
            //     "choose": {
            //         	"fromFilter": "type=martial weapon|miscellaneous=mundane",
            //         	"count": 2
            //      }
            const weaponProfOptions = []
            let defaultWeaponProfs = [];
            if (this.selectedItem.weaponProficiencies && this.selectedItem.weaponProficiencies.length) {
                if (!this.storedItem.selectedWeaponProfs || typeof this.storedItem.selectedWeaponProfs === 'string') {
                    this.storedItem.selectedWeaponProfs = {};
                }
                this.selectedItem.weaponProficiencies.forEach(weaponProficiency => {
                    Object.entries(weaponProficiency).forEach(([weaponKey, weaponVal]) => {
                        const newWeaponProfOption = {
                            key: weaponKey,
                            selectedWeaponProfs: this.storedItem.selectedWeaponProfs[weaponKey] ? this.storedItem.selectedWeaponProfs[weaponKey].split(',') : null
                        };
                        switch (weaponKey) {
                            case 'any':
                                newWeaponProfOption.weaponProfOptions = WEAPON_ALL;
                                newWeaponProfOption.weaponProfChoices = Number.isInteger(weaponVal) ? weaponVal : 1;
                                weaponProfOptions.push(newWeaponProfOption);
                                break;

                            case 'choose':
                                newWeaponProfOption.weaponProfOptions = weaponVal.fromFilter === "martial" ? WEAPON_MARTIAL : weaponProfOptions.choose.fromFilter === "simple" ? WEAPON_SIMPLE : WEAPON_ALL;
                                newWeaponProfOption.weaponProfChoices = weaponVal.count || 1;
                                weaponProfOptions.push(newWeaponProfOption);
                                break;
                        
                            default:
                                const weaponName = weaponKey.split('|')[0];
                                defaultWeaponProfs.push(util_capitalizeAll(weaponName));
                                break;
                        }
                    });
                });
                defaultWeaponProfs = defaultWeaponProfs.filter(e => !!e).join(', ');
            }
            if (defaultWeaponProfs.length > 0) {
                this.set("defaultWeaponProfs", defaultWeaponProfs);
                this.storedItem.defaultWeaponProfs = defaultWeaponProfs;

            } else {
                this.set("defaultWeaponProfs", null);
                this.storedItem.defaultWeaponProfs = null;
            }
            this.set("defaultWeaponProfs", defaultWeaponProfs.length > 0 ? defaultWeaponProfs : null);
            // store defaults on character to avoid future look-ups
            this.storedItem.defaultWeaponProfs = defaultWeaponProfs;
            this.set('weaponProfOptions', weaponProfOptions.length > 0 ? weaponProfOptions : null);


            // "armorProficiencies"
            //
            const armorProfOptions = []
            let defaultArmorProfs = [];
            if (this.selectedItem.armorProficiencies && this.selectedItem.armorProficiencies.length) {
                if (!this.storedItem.selectedArmorProfs || typeof this.storedItem.selectedArmorProfs === 'string') {
                    this.storedItem.selectedArmorProfs = {};
                }
                this.selectedItem.armorProficiencies.forEach(armorProficiency => {
                    Object.entries(armorProficiency).forEach(([armorKey, armorVal]) => {
                        const newArmorProfOption = {
                            key: armorKey,
                            selectedArmorProfs: this.storedItem.selectedArmorProfs[armorKey] ? this.storedItem.selectedArmorProfs[armorKey].split(',') : null
                        };
                        switch (armorKey) {
                            case 'any':
                                newArmorProfOption.armorProfOptions = ["light", "medium", "heavy", "shield"];
                                newArmorProfOption.armorProfChoices = Number.isInteger(armorVal) ? armorVal : 1;
                                armorProfOptions.push(newArmorProfOption);
                                break;
                        
                            default:
                                if (armorKey.includes('|')) {
                                    const armorName = armorKey.split('|')[0];
                                    defaultArmorProfs.push(util_capitalizeAll(armorName))
                                } else {
                                    defaultArmorProfs.push(util_capitalizeAll(armorKey));
                                }
                                break;
                        }
                    });
                });
                defaultArmorProfs = defaultArmorProfs.filter(e => !!e).join(', ');
                this.defaultArmorProfs = defaultArmorProfs.length > 0 ? defaultArmorProfs : null;
                // store defaults on character to avoid future look-ups
                this.storedItem.defaultArmorProfs = defaultArmorProfs;
            }
            this.set('armorProfOptions', armorProfOptions.length > 0 ? armorProfOptions : null);


            // Dark Vision 
            //   uses entry names, only one depth.
            let defaultDarkvision;
            if (this.selectedItem.entries) {
                this.selectedItem.entries
                    .forEach((entry) => {
                        if (entry && entry.name && entry.name.toLowerCase() === 'darkvision' 
                                && entry.entries && entry.entries.length) {
                            const is60 = entry.entries[0].includes('60'),
                                is120 = entry.entries[0].includes('120');
                                defaultDarkvision = is120 ? 120 : is60 ? 60 : 0;
                        }
                    })
            }

            this.storedItem.defaultDarkvision = defaultDarkvision || null;
            this.defaultDarkvision = defaultDarkvision || null;

            // Feats
            //  can populate a nested suboption component entry 
            this.featOptions = [];
            this.featChoices = null;
            this.selectedFeat = null;
            if (this.selectedItem.feats) {
                if (!this.featModel || !this.featModel.length) {
                    this.featModel = await loadModel('feats');
                }
                this.featOptions = this.featModel;
                this.featChoices = this.selectedItem.feats;
                this.selectedFeat = this.featOptions.find(feat => this.storedItem.selectedFeat && feat.name === this.storedItem.selectedFeat.name && feat.source === this.storedItem.selectedFeat.source);
            }

            // ASI
            if (this.selectedItem.asi) {
                this.hasASI = true;
                this.asiChecked = !!this.storedItem.selectedFeat;
                if (!this.featModel || !this.featModel.length) {
                    this.featModel = await loadModel('feats');
                }
                const asiFeatStored = this.storedItem.selectedFeat || this.storedItem.previouslySelectedFeat;
                this.asiFeat = asiFeatStored;
                this.asiFeatItem = this.featModel.find(feat => asiFeatStored && feat.name === asiFeatStored.name && feat.source === asiFeatStored.source);
                const attributes = this.storedItem.selectedAttributes ? this.storedItem.selectedAttributes.split(',') : this.storedItem.previouslySelectedAttributes ? this.storedItem.previouslySelectedAttributes.split(',') : [];
                this.asiAbility1 = attributes.length ? attributes[0] : null;
                this.asiAbility2 = attributes.length > 1 ? attributes[1] : null;
                this.storedItem.attributeMod = 1;
            }

            // Additional Spells: []
            //     Ritual Caster  -  multiple top-level options
            //     Breath of Winter  -  ki resource
            //     Eldritch Sight, Far Scribe  -  innate: -: [] with unique structure (should be will?)
            //     Astral Elf  -  multiple top-level, multiple ability choose
            //     Mark of Shadow  -  innate, known and expanded
            //     Shadar-kai  -  standard choose implemented as a top-level options
            //     race "name": "Green",  - known with additional level
            //     Drow High Magic - innate with "1e" usage (1 for each spell)
            // {
            const spellSetOptions = [];
            const spellLookupPromises = [];
            if (this.selectedItem.additionalSpells && this.selectedItem.additionalSpells.length) {
                if (!this.storedItem.additionalSpells) {
                    this.storedItem.additionalSpells = {
                        defaultSpells: [],
                        selectedSpells: []
                    };
                } else {
                    this.storedItem.additionalSpells.defaultSpells = [];
                    this.storedItem.additionalSpells.defaultAbility = null;
                }
                if (this.storedItem.additionalSpells.selectedSpellSet === undefined) {
                    this.storedItem.additionalSpells.selectedSpellSet = 0;
                }

                this.selectedItem.additionalSpells.forEach((addtlSpellSet, addtlSpellSetIndex) => {
                    const spellSetOption = {
                        defaultSpells: [],
                        expandedSpells: [],
                        spellChoices: [],
                        abilityChoices: []
                    };
                    const spellSetPromises = [];

                    Object.entries(addtlSpellSet).forEach(([addtlSpellTypeKey, addtlSpellTypeValue]) => {
                        
                        switch (addtlSpellTypeKey) {
                            //type    innate: 
                            //level     <character level> - or 1, 2, 3, 4, 5, 6, 7, 8, 9:
                            //reset       <cost or reset type> rest, daily, will, ritual, resource:
                            //                      rest (eg once per short rest)
                            //                      daily (eg once per long rest)
                            //                      will (eg cast it without spending a spell slot)
                            //                      ritual (eg only cast as a ritual, infinite uses)
                            //                      resource
                            //                      - n/a : if character level value is an array (not object), then treat as "will"
                            //count         <cost or reset value> 1: 
                            //                      - n/a for ritual and will
                            //                <spell list or choose> ["speak with animals", {choose: "level=1|class=Sorcerer", count: 2}]
                            //  issues: Furbolg & Variant; Mark of Detection  -  cast count shared across multiple spells
                            //
                            case 'innate':
                                Object.entries(addtlSpellTypeValue).forEach(([addtlSpellLevelKey, addtlSpellLevelValue]) => {
                                    const adjAddtlSpellLevelValue = Array.isArray(addtlSpellLevelValue) ? { will: addtlSpellLevelValue } : addtlSpellLevelValue;

                                    Object.entries(adjAddtlSpellLevelValue).forEach(([addtlSpellResetKey, addtlSpellResetValue]) => {
                                        const adjAddtlSpellResetValue = Array.isArray(addtlSpellResetValue) ? { '99': addtlSpellResetValue } : addtlSpellResetValue;

                                        Object.entries(adjAddtlSpellResetValue).forEach(([addtlSpellCountKey, addtlSpellCountValue]) => {
                                            const path = [addtlSpellSetIndex, addtlSpellTypeKey, addtlSpellLevelKey, addtlSpellResetKey, addtlSpellCountKey].join('.');
                                            const type = addtlSpellResetKey;
                                            let uses = addtlSpellCountKey === 'proficiency' ? addtlSpellCountKey : parseInt(addtlSpellCountKey.split('e').join(''));
                                            uses = uses === 99 ? undefined : uses;

                                            addtlSpellCountValue.forEach( (spellEntry) => {
                                                // This is the level in class, not spell level
                                                const level = addtlSpellLevelKey === '_' ? 1 : parseInt(addtlSpellLevelKey);
                                                if (spellEntry.choose !== undefined) {
                                                    const spellLookupPromise = filterModel('spells', spellEntry.choose).then((options) => {
                                                        const spellChoiceAtPath = this.storedItem.additionalSpells.selectedSpells.find((selected) => selected.path === path);
                                                        spellSetOption.spellChoices.push({
                                                            path,
                                                            type,
                                                            level,
                                                            uses,
                                                            count: spellEntry.count || 1,
                                                            options,
                                                            selectedSpells: spellChoiceAtPath && spellChoiceAtPath.spells ? spellChoiceAtPath.spells : []
                                                        });
                                                    });
                                                    spellLookupPromises.push(spellLookupPromise);
                                                    spellSetPromises.push(spellLookupPromise);
                                                } else {
                                                    let name = spellEntry.split('#')[0];
                                                    let source;
                                                    const spellLookupPromise = filterModel('spells', 'name='+name+'|').then((spellResult) => {
                                                        if (spellResult.length) {
                                                            source = spellResult[0].source;
                                                            name = spellResult[0].name;
                                                        }
                                                        spellSetOption.defaultSpells.push({name, source, type});
                                                        // defaults get stored if this is the selected spell set
                                                        if (addtlSpellSetIndex === this.storedItem.additionalSpells.selectedSpellSet) {
                                                            this.storedItem.additionalSpells.defaultSpells.push({
                                                                type,
                                                                level,
                                                                name,
                                                                source,
                                                                uses,
                                                            });
                                                        }
                                                    });
                                                    spellLookupPromises.push(spellLookupPromise);
                                                    spellSetPromises.push(spellLookupPromise);
                                                }
                                            });
                                        });
                                    });
                                });
                                break;


                            //type    known:
                            //level     <character level> - or 1, 2, 3, 4, 5, 6, 7, 8, 9:
                            //            <spell list or choose> ["prestidigitation#c", {choose: "level=0|class=Sorcerer", count: 2}]
                            //                  - if character level is an object (not array), take first key's array (test with race High; Valena)
                            //
                            case 'known':
                                Object.entries(addtlSpellTypeValue).forEach(([addtlSpellLevelKey, addtlSpellLevelValue]) => {
                                    let adjAddtlSpellLevelValue = Array.isArray(addtlSpellLevelValue)
                                        ? addtlSpellLevelValue
                                        : Object.values(addtlSpellLevelValue)[0];
                                    const path = [addtlSpellSetIndex, addtlSpellTypeKey, addtlSpellLevelKey].join('.');

                                    adjAddtlSpellLevelValue.forEach((spellEntry) => {
                                        const level = addtlSpellLevelKey === '_' ? 1 : parseInt(addtlSpellLevelKey);
                                        if (spellEntry.choose !== undefined) {
                                            const spellLookupPromise = filterModel('spells', spellEntry.choose).then((options) => {
                                                const spellChoiceAtPath = this.storedItem.additionalSpells.selectedSpells.find((selected) => selected.path === path);
                                                spellSetOption.spellChoices.push({
                                                    path,
                                                    type: 'known',
                                                    level,
                                                    count: spellEntry.count || 1,
                                                    options,
                                                    selectedSpells: spellChoiceAtPath && spellChoiceAtPath.spells ? spellChoiceAtPath.spells : []
                                                });
                                            });
                                            spellLookupPromises.push(spellLookupPromise);
                                            spellSetPromises.push(spellLookupPromise);
                                        } else {
                                            let name = spellEntry.split('#')[0];
                                            let source;
                                            const spellLookupPromise = filterModel('spells', 'name='+name+'|').then((spellResult) => {
                                                if (spellResult.length) {
                                                    source = spellResult[0].source;
                                                    name = spellResult[0].name;
                                                }
                                                spellSetOption.defaultSpells.push({name, source, type: 'known'});
                                                // defaults get stored if this is the selected spell set
                                                if (addtlSpellSetIndex === this.storedItem.additionalSpells.selectedSpellSet) {
                                                    this.storedItem.additionalSpells.defaultSpells.push({
                                                        type: 'known',
                                                        level,
                                                        name,
                                                        source
                                                    });
                                                }
                                            });
                                            spellLookupPromises.push(spellLookupPromise);
                                            spellSetPromises.push(spellLookupPromise);
                                        }
                                    });
                                });

                                break;

                            //   expanded: If you have spellcasting or pact magic, add these spells to your class spell list
                            //      <spell level> s1, s2, s3, s5, s5, 9
                            //         <spell list>
                            case 'prepared':
                            case 'expanded':
                                Object.entries(addtlSpellTypeValue).forEach(([addtlSpellLevelKey, addtlSpellLevelValue]) => {
                                    addtlSpellLevelValue.forEach((spellEntry) => {
                                        const level = parseInt(addtlSpellLevelKey.split('s').join(''));
                                        let name = spellEntry.split('#')[0];
                                        let source;
                                        const spellLookupPromise = filterModel('spells', 'name='+name+'|').then((spellResult) => {
                                            if (spellResult.length) {
                                                source = spellResult[0].source;
                                                name = spellResult[0].name;
                                            }
                                            const foundExpandedSpellsLevel = spellSetOption.expandedSpells.find((es) => es.level === level);
                                            if (foundExpandedSpellsLevel) {
                                                foundExpandedSpellsLevel.spells.push({name, source});
                                            } else {
                                                spellSetOption.expandedSpells.push({level, spells: [{name, source}]});
                                            }
                                            
                                            // defaults get stored if this is the selected spell set
                                            if (addtlSpellSetIndex === this.storedItem.additionalSpells.selectedSpellSet) {
                                                this.storedItem.additionalSpells.defaultSpells.push({
                                                    type: 'expanded',
                                                    level,
                                                    name,
                                                    source
                                                });
                                            }
                                        });
                                        spellLookupPromises.push(spellLookupPromise);
                                        spellSetPromises.push(spellLookupPromise);
                                    });
                                });
                                break;

                            
                            case 'ability': 
                                if (addtlSpellTypeValue === "inherit") {
                                    // todo, get from selected ability. example: feat Telekinetic
                                } else if (addtlSpellTypeValue.choose){
                                    spellSetOption.abilityChoices = addtlSpellTypeValue.choose.map((v) => v.toUpperCase());
                                    spellSetOption.selectedAbility = this.storedItem.additionalSpells.selectedAbility;
                                } else {
                                    spellSetOption.defaultAbility = addtlSpellTypeValue;
                                    // defaults get stored if this is the selected spell set
                                    if (addtlSpellSetIndex === this.storedItem.additionalSpells.selectedSpellSet) {
                                        this.storedItem.additionalSpells.defaultAbility = addtlSpellTypeValue.toUpperCase();
                                    }
                                }
                                break;

                            default:
                                break;
                        }
                    });

                    Promise.all(spellSetPromises).then(() => {
                        spellSetOption.name = addtlSpellSet.name ? addtlSpellSet.name : spellSetOption.defaultSpells.length ? this._renderSpellName(spellSetOption.defaultSpells[0]) : addtlSpellSetIndex;
                        spellSetOption.expandedSpells.sort((es1, es2) => es1.level - es2.level);
                        spellSetOptions.push(spellSetOption);
                    })
                });
            }

            Promise.all(spellLookupPromises).then(() => {
                this.set('spellSetOptions', spellSetOptions);
                if (spellSetOptions.length) {
                    this.set('selectedSpellSet', spellSetOptions[this.storedItem.additionalSpells.selectedSpellSet]);
                } else {
                    this.set('selectedSpellSet', null);
                }
            });
            
            this.dispatchEvent(new CustomEvent("loadingChange", { bubbles: true, composed: true }));
        } else {
            this.storedItem = {}
            this.attributeOptions = [];
            this.skillProfOptions = [];
            this.armorProfOptions = [];
            this.weaponProfOptions = [];
            this.toolProfOptions = [];
            this.langProfOptions = [];
            this.sTLProfOptions = [];
            this.resistOptions = [];
            this.conditionImmuneOptions = [];
            this.featOptions = [];
            this.spellSetOptions = [];
            this.defaultAttributes = null;
            this.defaultSkillProfs = null;
            this.defaultArmorProfs = null;
            this.defaultWeaponProfs = null;
            this.defaultToolProfs = null;
            this.defaultLangProfs = null;
            this.defaultDarkvision = null;
            this.defaultResists = null;
            this.defaultConditionImmunes = null;
        }
    }

    async getSpellChoiceOptions(chooseString) {
        return await filterModel('spells', chooseString);
    }

    _toolProficiencyAddCallback(key, index) {
        return ((skills) => {
            this.storedItem.selectedToolProfs[key] = skills.join(',');
            const newToolProfOptions = cloneDeep(this.toolProfOptions);
            newToolProfOptions[index].selectedToolProfs = skills;
            this.set('toolProfOptions', newToolProfOptions);
            saveCharacter(this.character);
        }).bind(this);
    }

    _langProficiencyAddCallback(key, index) {
        return ((skills) => {
            this.storedItem.selectedLangProfs[key] = skills.join(',');
            const newLangProfOptions = cloneDeep(this.langProfOptions);
            newLangProfOptions[index].selectedLangProfs = skills;
            this.set('langProfOptions', newLangProfOptions);
            saveCharacter(this.character);
        }).bind(this);
    }

    _armorProficiencyAddCallback(key, index) {
        return ((skills) => {
            this.storedItem.selectedArmorProfs[key] = skills.join(',');
            const newArmorProfOptions = cloneDeep(this.armorProfOptions);
            newArmorProfOptions[index].selectedArmorProfs = skills;
            this.set('armorProfOptions', newArmorProfOptions);
            saveCharacter(this.character);
        }).bind(this);
    }

    _weaponProficiencyAddCallback(key, index) {
        return ((skills) => {
            this.storedItem.selectedWeaponProfs[key] = skills.join(',');
            const newWeaponProfOptions = cloneDeep(this.weaponProfOptions);
            newWeaponProfOptions[index].selectedWeaponProfs = skills;
            this.set('weaponProfOptions', newWeaponProfOptions);
            saveCharacter(this.character);
        }).bind(this);
    }

    _skillProficiencyAddCallback() {
        return ((skills) => {
            this.storedItem.selectedSkillProfs = skills.join(',');
            this.selectedSkillProfs = skills;
            saveCharacter(this.character);
        }).bind(this);
    }

    _attributeAddCallback() {
        return ((attr) => {
            this.storedItem.selectedAttributes = attr.join(',');
            this.selectedAttributes = attr;
            saveCharacter(this.character);
        }).bind(this);
    }

    _featAddCallback() {
        return ((feat) => {
            this.storedItem.selectedFeat = { name: feat.name, source: feat.source };
            this.selectedFeat = this.featOptions.find(feat => feat.name === this.storedItem.selectedFeat.name && feat.source === this.storedItem.selectedFeat.source);
            saveCharacter(this.character);
        }).bind(this);
    }

    _sTLProfAddCallback() {
        return ((profs) => {
            this.storedItem.selectedSTLProfs = profs;
            this.selectedSTLProfs = profs;
            saveCharacter(this.character);
        }).bind(this)
    }

    _resistAddCallback() {
        return ((resists) => {
            this.storedItem.selectedResists = resists;
            this.selectedResists = resists;
            saveCharacter(this.character);
        }).bind(this)
    }

    _conditionImmuneAddCallback() {
        return ((conditionImmunes) => {
            this.storedItem.selectedConditionImmunes = conditionImmunes;
            this.selectedConditionImmunes = conditionImmunes;
            saveCharacter(this.character);
        }).bind(this)
    }

    _spellSetCallback() {
        return ((spellSet) => {
            this.storedItem.additionalSpells.selectedSpellSet = this.spellSetOptions.findIndex((spellSetOption) => spellSetOption === spellSet);;
            this.set('selectedSpellSet', spellSet);
            this.updateOptions();
            saveCharacter(this.character);
        }).bind(this);
    }

    _spellAbilityCallback() {
        return ((ability) => {
            this.storedItem.additionalSpells.selectedAbility = ability;
            const newSelectedSpellSet = cloneDeep(this.selectedSpellSet);
            newSelectedSpellSet.selectedAbility = ability;
            this.set('selectedSpellSet', newSelectedSpellSet);
            saveCharacter(this.character);
        }).bind(this);
    }

    _spellChoiceCallback(choice, index) {
        return ((spells) => {
            const mappedSpells = spells.map((spell) => { return { name: spell.name, source: spell.source } });
            let spellChoiceAtPathIndex = this.storedItem.additionalSpells.selectedSpells.findIndex((selected) => selected.path === choice.path);
            if (spellChoiceAtPathIndex > -1) {
                this.storedItem.additionalSpells.selectedSpells.splice(spellChoiceAtPathIndex, 1);
            }
            let spellChoiceAtPath = { path: choice.path, type: choice.type, level: choice.level, resource: choice.resource, resourceName: this.selectedSpellSet.resourceName, count: choice.count, uses: choice.uses };
            this.storedItem.additionalSpells.selectedSpells.push(spellChoiceAtPath);
            spellChoiceAtPath.spells = mappedSpells;
            const newSelectedSpellSet = cloneDeep(this.selectedSpellSet);
            newSelectedSpellSet.spellChoices[index].selectedSpells = mappedSpells;
            this.set('selectedSpellSet', newSelectedSpellSet);
            saveCharacter(this.character);
        }).bind(this);
    }

    _asiChangeCallback() {
        return ((asi) => {
            if (asi.checked) {
                this.storedItem.selectedFeat = asi.selectedFeat;
                this.storedItem.previouslySelectedAttributes = [asi.selectedAbilityOne, asi.selectedAbilityTwo].filter(a => !!a).join(',');
                delete this.storedItem.selectedAttributes;
            } else {
                this.storedItem.previouslySelectedFeat = asi.selectedFeat;
                delete this.storedItem.selectedFeat;
                const suboptionKeys = Object.keys(this.character.choices).filter(ck => ck.startsWith(this.storageKey + '_'));
                if (suboptionKeys && suboptionKeys.length) {
                    suboptionKeys.forEach((removalKey) => delete this.character.choices[removalKey]);
                }
                this.asiFeatItem = null;
                this.storedItem.selectedAttributes = [asi.selectedAbilityOne, asi.selectedAbilityTwo].filter(a => !!a).join(',')
            }
            saveCharacter(this.character);
        }).bind(this);
    }

    _suboptionStorageKey(storageKey) {
        return `${storageKey}_suboptions`
    }

    _showEmpty(isEditMode, value) {
        return !isEditMode && !value;
    }

    _exists() {
        for (let arg of arguments) {
            if (!!arg && (arg.constructor !== Object || Object.entries(arg).length > 0) && (!Array.isArray(arg) || arg.length > 0)) {
                return true;
            }
        }
        return false;
    }

    _plusPrefix(num) {
        return `+${num}`
    }

    _plural(str, num, overrideLabel) {
        const newStr = overrideLabel || str;
        if (num > 1) {
            return newStr + 's'
        }
        return newStr;
    }

    _printOptions(selectedOptions, storedItem, key) {
        let out = []
        for (const option of selectedOptions) {
            out = out.concat(storedItem[`selected${key}Profs`][option])
        }
        return out.join(', ');
    }

    _moreThanOne(list) {
        return list.length > 1;
    }

    _renderSpellName(s) {
        return `${util_capitalizeAll(s.name)}${s.source && s.source.toLowerCase() !== 'phb' ? ` (${s.source})` : ''}`;
    }

    _openSpell(e) {
        this.dispatchEvent(new CustomEvent("open-drawer", {
            bubbles: true,
            composed: true,
            detail: {
                viewId: "spells",
                selectedItem: e.model.__data.item
            }
        }));
    }

    _featLinkClick(e) {
        this.dispatchEvent(new CustomEvent("open-drawer", {
            bubbles: true,
            composed: true,
            detail: {
                selectedItem: e.target.__dataHost.__data.selectedFeat,
                viewId: 'feats'
            }
        }));
    }

    _spellLevel(level) {
        switch (level) {
            case 0:
                return 'Cantrip';
            case 1:
                return '1st';
            case 2:
                return '2nd';
            case 3:
                return '3rd';
            default:
                return level + 'th';
        }
    }

    _isLast(index, list) {
        return list && list.length && index === list.length - 1;
    }

    _or(a, b) {
        return a || b
    }

    static get template() {
        return html`
            <style include="material-styles">
                .some {}
                :host {
                    display: block;
                    white-space: initial;
                }
                .spell-link {
                    color: var(--mdc-theme-link);
                    cursor: pointer;
                    text-decoration: underline;
                }
                .spell-link:hover {
                }
                .feat-wrap {
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                    align-items: flex-end;
                }
                table {
                    line-height: 1.3;
                    margin-left: 12px;
                }
                td {
                    vertical-align: top;
                }
                td:first-child {
                    padding-right: 8px;
                }
                [hidden] {
                    display: none !important;
                }
                dnd-character-builder-suboptions {
                    padding-left: 40px;
                    display: block;
                }
                dnd-select-add {
                    width: 100%;
                    display: block;
                }
                /* dnd-select-add {
                    width: var(--suboptions__width, 100%);
                    max-width: var(--suboptions__max-width, unset);
                } */
                .default-selection {
                    font-size: 14px;
                    margin-bottom: 6px;
                }
                .default-selection span {
                    color: var(--mdc-theme-primary);
                }
                @media(min-width: 420px) {
                    dnd-select-add {
                        
                    }
                }

                @media(min-width: 921px) {
                }
            </style>

            <div class="col-wrap">

                <div hidden$="[[!_exists(defaultAttributes)]]" class="default-selection"><b>Ability Increase: </b><span>[[defaultAttributes]]</span></div>

                <div hidden$="[[!_exists(defaultSkillProfs)]]" class="default-selection"><b>Skills: </b><span>[[defaultSkillProfs]]</span></div>
                
                <div hidden$="[[!_exists(defaultArmorProfs)]]" class="default-selection"><b>Armor: </b><span>[[defaultArmorProfs]]</span></div>

                <div hidden$="[[!_exists(defaultWeaponProfs)]]" class="default-selection"><b>Weapons: </b><span>[[defaultWeaponProfs]]</span></div>

                <div hidden$="[[!_exists(defaultToolProfs)]]" class="default-selection"><b>Tools: </b><span>[[defaultToolProfs]]</span></div>

                <div hidden$="[[!_exists(defaultLangProfs)]]" class="default-selection"><b>Languages: </b><span>[[defaultLangProfs]]</span></div>

                <div hidden$="[[!_exists(defaultDarkvision)]]" class="default-selection"><b>Darkvision: </b><span>[[defaultDarkvision]] ft.</span></div>

                <div hidden$="[[!_exists(defaultResists)]]" class="default-selection"><b>Resistances: </b><span>[[defaultResists]]</span></div>

                <div hidden$="[[!_exists(defaultConditionImmunes)]]" class="default-selection"><b>Condition Immunities: </b><span>[[defaultConditionImmunes]]</span></div>

                <template is="dom-if" if="[[_moreThanOne(spellSetOptions)]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Spell Set>" label="Selected Spell Set"
                        options="[[spellSetOptions]]" value="[[selectedSpellSet]]" 
                        add-callback="[[_spellSetCallback()]]">
                    </dnd-select-add>
                </template>

                <template is="dom-if" if="[[_exists(selectedSpellSet.abilityChoices)]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Spell Ability>" label="Selected Spell Ability"
                        options="[[selectedSpellSet.abilityChoices]]" value="[[selectedSpellSet.selectedAbility]]"
                        add-callback="[[_spellAbilityCallback()]]">
                    </dnd-select-add>
                </template>

                <template is="dom-repeat" items="[[selectedSpellSet.spellChoices]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Spells>" label="Selected Spells"
                        choices="[[item.count]]" options="[[item.options]]"
                        value="[[item.selectedSpells]]" add-callback="[[_spellChoiceCallback(item, index)]]">
                    </dnd-select-add>
                </template>

                <div hidden$="[[!_exists(selectedSpellSet.defaultSpells)]]" class="default-selection">
                    <b>Spells: </b>
                    <span>
                        <template is="dom-repeat" items="[[selectedSpellSet.defaultSpells]]">
                            <span class="spell-link" on-click="_openSpell">[[_renderSpellName(item)]]</span><span hidden$="[[_isLast(index, selectedSpellSet.defaultSpells)]]">, </span>
                        </template>
                    </span>
                </div>

                <div hidden$="[[!_exists(selectedSpellSet.expandedSpells)]]" class="default-selection">
                    <b>Expanded Spell List</b>
                    <table>
                        <template is="dom-repeat" items="[[selectedSpellSet.expandedSpells]]" as="expandedSpells">
                            <tr>
                                <td>[[_spellLevel(expandedSpells.level)]]</td>
                                <td>
                                    <template is="dom-repeat" items="[[expandedSpells.spells]]">
                                        <span class="spell-link" on-click="_openSpell">[[_renderSpellName(item)]]</span><span hidden$="[[_isLast(index, expandedSpells.spells)]]">, </span>
                                    </template>
                                </td>
                            </tr>
                        </template>
                    </table>
                </div>


                <template is="dom-if" if="[[_exists(attributeOptions)]]">
                    <dnd-select-add disabled$="[[!isEditMode]]" 
                        placeholder="<Select Attribute>" label='[[_plural("Selected Attribute", attributeChoices)]]'
                        choices="[[attributeChoices]]" paren="[[_plusPrefix(attributeMod)]]" options="[[attributeOptions]]"
                        value="[[selectedAttributes]]" add-callback="[[_attributeAddCallback()]]">
                    </dnd-select-add>
                </template>

                <template is="dom-if" if="[[_exists(skillProfOptions)]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Skill>" label='[[_plural("Selected Skill", skillProfChoices)]]'
                        choices="[[skillProfChoices]]" options="[[skillProfOptions]]"
                        value="[[selectedSkillProfs]]" add-callback="[[_skillProficiencyAddCallback()]]">
                    </dnd-select-add>
                </template>

                <template is="dom-repeat" items="[[armorProfOptions]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Armor>" label='[[_plural("Selected Armor", item.armorProfChoices, item.label)]]'
                        choices="[[item.armorProfChoices]]" options="[[item.armorProfOptions]]"
                        value="[[item.selectedArmorProfs]]" add-callback="[[_armorProficiencyAddCallback(item.key, index)]]">
                    </dnd-select-add>
                </template>

                <template is="dom-repeat" items="[[weaponProfOptions]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Weapon>" label='[[_plural("Selected Weapon", item.weaponProfChoices, item.label)]]'
                        choices="[[item.weaponProfChoices]]" options="[[item.weaponProfOptions]]"
                        value="[[item.selectedWeaponProfs]]" add-callback="[[_weaponProficiencyAddCallback(item.key, index)]]">
                    </dnd-select-add>
                </template>

                <template is="dom-repeat" items="[[toolProfOptions]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Tool>" label='[[_plural("Selected Tool", item.toolProfChoices, item.label)]]'
                        choices="[[item.toolProfChoices]]" options="[[item.toolProfOptions]]"
                        value="[[item.selectedToolProfs]]" add-callback="[[_toolProficiencyAddCallback(item.key, index)]]">
                    </dnd-select-add>
                </template>

                <template is="dom-repeat" items="[[langProfOptions]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Language>" label='[[_plural("Selected Language", item.langProfChoices, item.label)]]'
                        choices="[[item.langProfChoices]]" options="[[item.langProfOptions]]"
                        value="[[item.selectedLangProfs]]" add-callback="[[_langProficiencyAddCallback(item.key, index)]]">
                    </dnd-select-add>
                </template>

                <template is="dom-if" if="[[_exists(sTLProfOptions)]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Skill or Tool>" label="Selected Skill or Tool"
                        choices="[[sTLProfChoices]]" options="[[sTLProfOptions]]"
                        value="[[selectedSTLProfs]]" add-callback="[[_sTLProfAddCallback()]]">
                    </dnd-select-add>
                </template>

                <template is="dom-if" if="[[_exists(resistOptions)]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Resistance>" label="Selected Resistance"
                        choices="[[resistChoices]]" options="[[resistOptions]]"
                        value="[[selectedResists]]" add-callback="[[_resistAddCallback()]]">
                    </dnd-select-add>
                </template>

                <template is="dom-if" if="[[_exists(conditionImmuneOptions)]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Condition Immunity>" label="Selected Condition Immunity"
                        choices="[[conditionImmuneChoices]]" options="[[conditionImmuneOptions]]"
                        value="[[selectedConditionImmunes]]" add-callback="[[_conditionImmuneAddCallback()]]">
                    </dnd-select-add>
                </template>

                <template is="dom-if" if="[[_exists(featOptions)]]">
                    <div class="feat-wrap">
                        <dnd-select-add disabled$="[[!isEditMode]]"
                            placeholder="<Select Feat>" label="Selected Feat"
                            options="[[featOptions]]" value="[[selectedFeat]]"
                            add-callback="[[_featAddCallback()]]">
                        </dnd-select-add>
                        <button hidden$="[[!_exists(selectedFeat)]]" class="mdc-icon-button material-icons" on-click="_featLinkClick">logout</button>
                    </div>

                    <template is="dom-if" if="[[_exists(selectedFeat)]]">
                        <dnd-character-builder-suboptions label="[[_or(label, 'Feat')]]" storage-key="[[_suboptionStorageKey(storageKey)]]" selected-item="[[selectedFeat]]"></dnd-character-builder-suboptions>
                    </template>
                </template>

                <template is="dom-if" if="[[hasASI]]">
                    <dnd-asi-select change-callback="[[_asiChangeCallback()]]" checked="[[asiChecked]]" selected-feat="[[asiFeat]]" selected-ability-one="[[asiAbility1]]" selected-ability-two="[[asiAbility2]]"></dnd-asi-select>

                    <template is="dom-if" if="[[asiChecked]]">
                        <dnd-character-builder-suboptions label="[[_or(label, 'ASI Feat')]]" class="asi-suboption" storage-key="[[_suboptionStorageKey(storageKey)]]" selected-item="[[asiFeatItem]]"></dnd-character-builder-suboptions>
                    </template>
                </template>
            </div>
        `;
    }
}

customElements.define("dnd-character-builder-suboptions", DndCharacterBuilderSuboptions);
