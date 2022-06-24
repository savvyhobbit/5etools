import { PolymerElement, html } from "@polymer/polymer";
import {
    getCharacterChannel,
    getSelectedCharacter,
    saveCharacter,
} from "../../../util/charBuilder";
import { getEditModeChannel, isEditMode } from "../../../util/editMode";
import { util_capitalizeAll, absInt, cloneDeep } from "../../../js/utils"; 
import { loadModel } from "../../../util/data";
import '../../dnd-select-add';
import { SKILL_TO_ATB_ABV } from "../../../js/bestiary";
import { } from '@polymer/polymer/lib/elements/dom-if.js';
    
class DndCharacterBuilderSuboptions extends PolymerElement {
    static get properties() {
        return {
            storageKey: {
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

            isEditMode: {
                type: Boolean,
                value: false
            },
        };
    }

    static get observers() {
        return ['updateOptions(selectedItem, storageKey, character)']
    }

    connectedCallback() {
        super.connectedCallback();

        this.characterChangeHandler = (e) => {
            // let character = cloneDeep(e.detail.character);
            let character = e.detail.character;
            this.set('character', character);
            this.updateOptions();
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
        if (this.character && this.storageKey && this.selectedItem) {
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
                storedItem = storedItem[storageKey];
            }
            this.storedItem = storedItem;


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
                this.defaultAttributes = Object.entries(ability).map(e => {
                    if (e[0] !== 'choose' && e[0] !== 'any') {
                        let attribute = e[0].toLowerCase(),
                            mod = e[1];
                        return attribute.toUpperCase() + ' ' + absInt(mod);
                    }
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
                    this.skillProfOptions = Object.keys(SKILL_TO_ATB_ABV);
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

            // Populating Feat choice field
            this.featOptions = [];
            this.featChoices = null;
            this.selectedFeat = null;
            if (this.selectedItem.feats) {
                this.featOptions = await loadModel('feats');
                this.featChoices = this.selectedItem.feats;
                this.selectedFeat = this.storedItem.selectedFeat;
            }
            
            this.dispatchEvent(new CustomEvent("loadingChange", { bubbles: true, composed: true }));
        }
    }

    _skillProficiencyAddCallback() {
        return ((skills) => {
            this.storedItem.selectedSkillProfs = skills.join(',');
            saveCharacter(this.character);
        }).bind(this);
    }

    _attributeAddCallback() {
        return ((attr) => {
            this.storedItem.selectedAttributes = attr.join(',');
            saveCharacter(this.character);
        }).bind(this);
    }

    _featAddCallback() {
        return ((feat) => {
            this.storedItem.selectedFeat = feat;
            saveCharacter(this.character);
        }).bind(this);
    }

    _suboptionStorageKey(storageKey) {
        return `${storageKey}.suboptions`
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
        console.error(num)
        return `+${num}`
    }

    _plural(str, num) {
        if (num > 1) {
            return str + 's'
        }
        return str;
    }

    static get template() {
        return html`
            <style include="material-styles">
                [hidden] {
                    display: none !important;
                }
                dnd-select-add {
                    width: 100%;
                }
                @media(min-width: 420px) {
                    dnd-select-add {
                        width: calc(50% - 20px);
                    }
                }

                @media(min-width: 921px) {
                }
            </style>

            <div class="col-wrap">
                <div hidden$="[[!_exists(defaultAttributes)]]" class="default-selection">Default Attributes: <span>[[defaultAttributes]]</span></div>

                <div hidden$="[[!_exists(defaultSkillProfs)]]" class="default-selection">Default Skill Proficiencies: <span>[[defaultSkillProfs]]</span></div>

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

                <!-- Todo: add language and tool proficiencies -->

                <template is="dom-if" if="[[_exists(featOptions)]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Feat>" label="Selected Feat"
                        options="[[featOptions]]" value="[[selectedFeat]]"
                        add-callback="[[_featAddCallback()]]">
                    </dnd-select-add>
                    
                    <template is="dom-if" if="[[_exists(selectedFeat)]]"></template>
                        <dnd-character-builder-suboptions storage-key="[[_suboptionStorageKey(storageKey)]]" selected-item="[[selectedFeat]]"></dnd-character-builder-suboptions>
                    </template>
                </template>
            </div>
        `;
    }
}

customElements.define("dnd-character-builder-suboptions", DndCharacterBuilderSuboptions);
