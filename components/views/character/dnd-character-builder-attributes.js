import {PolymerElement, html} from "@polymer/polymer";
import "@vaadin/vaadin-text-field/vaadin-integer-field";
import "../../dnd-select-add";
import "../../dnd-button";
import "../../dnd-svg";
import { 
  getCharacterChannel,
  getSelectedCharacter,
  updateAttr,
  getClassSaves,
  getSkillProfs,
  toggleCustomSkill,
  getRaceAttributeDefaults,
  getAttributeScoreModifiers,
  getMaxHP,
  getCurrentHP, getTempHp, setCurrentHp,
  getHitDice,
  resetHitDice,
  addTempHp,
  useHitDice,
  getCharacterAC,
  getCharacterInitiative,
  getCharacterSpeed,
  getCharacterProficiencyBonus,
  toggleCustomInitiative,
  setCustomInitiativeVal,
  toggleCustomAC,
  toggleCustomHealth,
  setCustomACVal,
  setCustomHealthVal,
  getChoiceLanguages,
  getChoiceToolProfs,
  getChoiceArmorProfs,
  getChoiceWeaponProfs,
  getChoiceFeats,
  getChoiceDarkvision
} from "../../../util/charBuilder";
import { getEditModeChannel, isEditMode } from "../../../util/editMode";
import { util_capitalizeAll, absInt, findInPath } from "../../../js/utils";
import { rollDice } from "../../../util/roll";

class DndCharacterBuilderAttributes extends PolymerElement {
  
  static get properties() {
    return {
      str: {
        type: Number
      },
      dex: {
        type: Number
      },
      con: {
        type: Number
      },
      int: {
        type: Number
      },
      wis: {
        type: Number
      },
      cha: {
        type: Number
      },
      strAdj: {
        type: Number,
        value: 0
      },
      dexAdj: {
        type: Number,
        value: 0
      },
      conAdj: {
        type: Number,
        value: 0
      },
      intAdj: {
        type: Number,
        value: 0
      },
      wisAdj: {
        type: Number,
        value: 0
      },
      chaAdj: {
        type: Number,
        value: 0
      },
      skillProfs: {
        type: String,
        value: ""
      },

      saves: {
        type: Array,
        value: []
      },
      classSkillProfOptions: {
        type: Object,
        value: {}
      },
      backgroundSkillProfOptions: {
        type: Object,
        value: []
      },
      defaultBackgroundSkillProf: {
        type: String,
        value: ""
      },
      maxHP: {
        type: Number
      },
      tempHP: {
        type: Number,
        value: 0
      },
      isEditMode: {
        type: Boolean,
        value: false
      },
      initiative: {
        type: String,
        value: ""
      },
      customInitiative: {
        type: Boolean,
        value: false
      },
      customInitiativeVal: {
        type: Number
      },
      customACVal: {
        type: Number
      },
      customACHealth: {
        type: Number
      },
      otherProfsOpen: {
        type: Boolean
      },
      featuresOpen: {
        type: Boolean
      },
      languages: {
        type: String,
      },
      toolProfs: {
        type: String,
      },
      weaponProfs: {
        type: String,
      },
      armorProfs: {
        type: String,
      },
      feats: {
        type: String,
      },
      darkvision: {
        type: Number,
      },
      hasDarkvision: {
        type: Boolean,
        value: false,
      }
    };
  }

  static get observers() {
    return [
      "updateCharAttr(str, dex, con, int, wis, cha)",
      "updateCustomInitiative(customInitiativeVal)",
      "updateCustomAC(customACVal)",
      "updateCustomHealth(customHealthVal)"
    ]
  }

  updateCharAttr(str, dex, con, int, wis, cha) {
    if (str && dex && con && int && wis && cha) {
      updateAttr({str, dex, con, int, wis, cha});
    }
  }

  updateCustomInitiative(customInitiativeVal) {
    if (customInitiativeVal !== undefined && customInitiativeVal !== "") {
      setCustomInitiativeVal(customInitiativeVal);
    }
  }

  updateCustomAC(customACVal) {
    if (customACVal !== undefined && customACVal !== "") {
      setCustomACVal(customACVal);
    }
  }

  updateCustomHealth(customHealthVal) {
    if (customHealthVal !== undefined && customHealthVal !== "") {
      setCustomHealthVal(customHealthVal);
    }
  }

  hpChangeHandler(e) {
    this.$.hpField.focusElement.blur();
  }

  hpBlurHandler(e) {
    const parsedVal = parseInt(this.$.hpField.value);
    
    if (Number.isNaN(parsedVal)) {
      this.$.hpField.value = getCurrentHP;
    } else {
      setCurrentHp(parsedVal);
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.characterChangeHandler = (e) => {
      let character = e.detail.character;
      this.updateAttributesFromCharacter(character);
    };
    
    this.updateAttributesFromCharacter(getSelectedCharacter());
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

  async updateAttributesFromCharacter(character) {
    if (character && character.attr) {
      const attr = character.attr;
      if (attr.str !== this.str || attr.dex !== this.dex || attr.con !== this.con 
          || attr.int !== this.int || attr.wis !== this.wis || attr.cha !== this.cha) {
        this.setProperties({
          str: character.attr.str,
          dex: character.attr.dex,
          con: character.attr.con,
          int: character.attr.int,
          wis: character.attr.wis,
          cha: character.attr.cha
        });
      }

      this.saves = await getClassSaves();

      // Attributes from Race
      let attributeAdj = await getAttributeScoreModifiers();

      this.strAdj = attributeAdj.str;
      this.dexAdj = attributeAdj.dex;
      this.conAdj = attributeAdj.con;
      this.intAdj = attributeAdj.int;
      this.wisAdj = attributeAdj.wis;
      this.chaAdj = attributeAdj.cha;

      this.skillProfs = (await getSkillProfs()).join(',');

      this.customHealth = !!character.customHealth;
      this.customHealthVal = character.customHealthVal;
      this.maxHP = await getMaxHP();
      this.currentHP = await getCurrentHP();
      this.tempHP = await getTempHp();

      const hitDicePerClass = await getHitDice();
      const hitDicePerDice = [];
      for (let hitDiceClass of hitDicePerClass) {
        const hitDiceDice = hitDicePerDice.find(hitDiceInArray => hitDiceInArray.die === hitDiceClass.die)
        if (hitDiceDice) {
          if (hitDiceDice.current === 0) {
            hitDiceDice.className = hitDiceClass.className;
          }
          hitDiceDice.current += hitDiceClass.current;
          hitDiceDice.total += hitDiceClass.total;
        } else {
          hitDicePerDice.push(hitDiceClass);
        }
      }
      this.hitDice = hitDicePerDice.sort();

      this.customAC = !!character.customAC;
      this.customACVal = character.customACVal;
      this.ac = await getCharacterAC();

      this.customInitiative = !!character.customInitiative;
      this.customInitiativeVal = character.customInitiativeVal;
      this.initiative = await getCharacterInitiative();

      this.speed = await getCharacterSpeed();

      this.proficiencyBonus = await getCharacterProficiencyBonus();

      this.weaponProfs = getChoiceWeaponProfs().map(util_capitalizeAll).join(', ');
      this.armorProfs = getChoiceArmorProfs().map(util_capitalizeAll).join(', ');
      this.toolProfs = getChoiceToolProfs().map(util_capitalizeAll).join(', ');
      this.languages = getChoiceLanguages().map(util_capitalizeAll).join(', ');
      this.feats = getChoiceFeats().map(util_capitalizeAll).join(', ');
      this.darkvision = getChoiceDarkvision();
      this.hasDarkvision = this.darkvision !== null;
      
      console.error('blah', this.weaponProfs, this.armorProfs, this.toolProfs, this.languages);

      this.dispatchEvent(new CustomEvent("loadingChange", { bubbles: true, composed: true }));
    }
  }

  _adjustString(adj) {
    if (adj !== 0 && adj !== undefined) {
      return absInt(adj);
    }
    return "";
  }

  _total(a, b) {
    let intA = parseInt(a),
      intB = parseInt(b);

    intA = isNaN(intA) ? 0 : intA;
    intB = isNaN(intB) ? 0 : intB;

    return intA + intB;
  }

  _mod(base, adj) {
    return absInt(Math.floor((this._total(base, adj) - 10) / 2));
  }

  _contains(saves, str) {
    return saves.indexOf(str) > -1;
  }

  _exists() {
    for (let arg of arguments) {
      if (!!arg && (arg.constructor !== Object || Object.entries(arg).length > 0) && (!Array.isArray(arg) || arg.length > 0)) {
        return true;
      }
    }
    return false;
  }

  _editModeClass(isEditMode) {
    return isEditMode ? 'edit-mode' : 'not-edit-mode';
  }

  _tempHpStr(tempHP) {
    return tempHP && typeof tempHP === 'number' && tempHP > 0 ? ` + ${tempHP}` : '';
  }

  _toggleButtonField(e) {
    const element = e.target.closest('.btn-field');
    const isOpen = element.classList.contains('btn-field--open');
    const isTemp = element.classList.contains('btn-field--temp');
    const intField = element.querySelector('vaadin-integer-field');
    const buttonComp = element.querySelector('dnd-button');
    element.classList.toggle('btn-field--open');
    buttonComp.classList.toggle('icon-only');
    buttonComp.classList.toggle('hard-left');

    if (isTemp) {
      if (isOpen) {
        const changeVal = parseInt(intField.value);
        if (changeVal) {
          addTempHp(parseInt(this.tempHP) + changeVal);
          intField.value = '';
        }
      } else {
        intField.focus();
      }

    } else {
      if (isOpen) {
        const changeVal = parseInt(intField.value);
        if (changeVal) {
          const modifier = element.classList.contains('btn-field--heal') ? 1 : -1;
          setCurrentHp(parseInt(this.currentHP) + (modifier * changeVal));
          intField.value = '';
        }
      } else {
        intField.focus();
      }
    }
  }

  _submitButtonField(e) {
    if (e.key === 'Enter') {
      this._toggleButtonField(e);
    }
  }

  _blurButtonField(e) {
    this._toggleButtonField(e);
  }

  _useHitDice(e) {
    const element = e.target.closest('.hit-dice__item');
    if (e.model.__data.item.current > 0 && this.currentHP < this._maxHP(this.customHealthVal, this.maxHP, this.customHealth)) {
      const className = element.dataset.className;
      useHitDice(className);
    } else {
      // flash error
      element.classList.add('hit-dice__item--error');
      setTimeout(() => {
        element.classList.remove('hit-dice__item--error');
      }, 500);
    }
  }

  _strContains(str, search) {
    return str.indexOf(search) > -1;
  }

  _strContainsTwo(str, search) {
    const count = (str.match(new RegExp(search, 'g')) || []).length;
    return count >= 2;
  }

  _resetHitDice(e) {
    resetHitDice();
  }

  async _roll(e) {
    const profEl = findInPath('.proficiency-item', e);
    if (!this.isEditMode) {
      const attrEl = findInPath('.stat-box', e);
      const initEl = findInPath('.initiative', e);
      let mod, isProficient, name, isExpertise;

      if (profEl) {
        isProficient = profEl.hasAttribute('enabled');
        isExpertise = profEl.hasAttribute('expertise');
        mod = parseInt(profEl.closest('.attribute-wrap').querySelector('.stat-box__mod').innerText, 10);
        name = profEl.innerText;

      } else if (attrEl) {
        isProficient = attrEl.querySelector('.stat-box__save').hasAttribute('enabled');
        mod = parseInt(attrEl.querySelector('.stat-box__mod').innerText, 10);
        name = attrEl.querySelector('vaadin-integer-field').label + ' Save';

      } else if (initEl) {
        isProficient = false;
        mod = this.customInitiative ? this.customInitiativeVal : parseInt(this.initiative, 10);
        name = "Initiative";
      }

      if (name) {
        let rollForm = '1d20';
  
        if (isProficient) {
          mod = mod + this.proficiencyBonus;
        }
        if (isExpertise) {
          mod = mod + this.proficiencyBonus;
        }
        if (mod > 0) {
          rollForm += `+${mod}`
        } else if (mod < 0) {
          rollForm += mod;
        }
        rollDice(name, rollForm);
      }
    } else if (profEl) {
      await toggleCustomSkill(profEl.innerText.toLowerCase());
    }
  }

  _swapCustomInitiative(e) {
    toggleCustomInitiative();
  }

  _swapCustomAC(e) {
    toggleCustomAC();
  }

  _swapCustomHealth(e) {
    toggleCustomHealth();
  }

  _plusMinus(val) {
    if (val) {
      if (val > 0) { 
        return "+";
      }
    }
  }

  _triggerShortRest(e) {

  }

  _triggerLongRest(e) {

  }

  _maxHP(customHealthVal, maxHP, customHealth) {
    return customHealth ? customHealthVal : maxHP;
  }

  _toggleOtherProfs() {
    this.otherProfsOpen = !this.otherProfsOpen;
  }

  _toggleFeatures() {
    this.featuresOpen = !this.featuresOpen;
  }

  static get template() {
    return html`
      <style include="material-styles">
        :host {
          display: block;
          padding: 14px;
        }

        [hidden] {
          display: none !important;
        }

        .wrap {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-bottom: 50px;
          position: relative;
        }
        .attribute-wrap {
          display: flex;
          flex-direction: row;
          min-width: 0;
        }
        .health-wrap {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          min-width: 0;
          flex-shrink: 0;
          justify-content: space-between;
          max-width: 360px;
        }
        .health-wrap > div {
          width: calc(33% - 8px);
          max-width: 120px;
        }
        .health-wrap > * {
          margin-bottom: 16px;
        }

        /* Proficiencies */
        .proficiencies {
          margin-left: 8px;
          line-height: 1.4;
          min-width: 0;
          position: relative;
          top: -2px;
        }
        .proficiency-item {
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          position: relative;
          cursor: pointer;
        }

        .proficiency-item::before,
        .proficiency-item[expertise]::after {
          content: '';
          display: inline-block;
          height: 10px;
          width: 10px;
          border: 1px solid var(--mdc-theme-primary);
          border-radius: 50%;
          background-color: transparent;
          margin-right: 8px;
          position: relative;
          top: 1px;
          box-shadow: 0px 0px 10px -4px rgba(0,0,0,0.75);
        }
        .proficiency-item[expertise]::after {
          position: absolute;
          left: 13px;
          top: 3px;
          margin-right: 0;
          background-color: var(--mdc-theme-primary);
        }
        .proficiency-item[expertise]::before {
          margin-right: 20px;
        }
        .proficiency-item[enabled]::before {
          background-color: var(--mdc-theme-primary);
        }


        .stats {
          display: flex;
          flex-direction: column;
          min-width: 0;
          width: 190px;
          flex-shrink: 0;
          padding-top: 10px;
        }

        /* Other profs */
        .stats-other-wrap {
          display: flex;
          justify-content: space-between;
        }
        .others {
          margin-bottom: 120px;
        }
        .other {
          margin-left: 20px;
          font-size: 14px;
          flex-shrink: 1;
          max-width: 180px;
          height: fit-content;
          margin-bottom: 8px;
          line-height: 1.5;
        }
        .other[open]  .other__header .material-icons {
          transform: rotate(180deg);
        }
        .other__header {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-bottom: 8px;
          padding: 0;
          cursor: pointer;
          transition: color .1s ease-in;
          font-size: 18px;
          font-weight: bold;
          text-align: left;
          line-height: 1.6;
          user-select: none;
          color: var(--mdc-theme-primary);
          background: none;
          border: 0;
        }
        .other__header:hover {
          color: var(--lumo-primary-color-50pct);
        }
        .other__header .material-icons {
          font-size: 24px;
          position: relative;
          transition: transform .1s ease-in;
          margin: -2px 8px 0 0;
        }
        .other__wrap {
          opacity: 0;
          height: 0;
          overflow: hidden;
        }
        .other[open] .other__wrap {
          opacity: 1;
          height: auto;
          transform: scale(1, 1);
          animation-duration: .3s;
          animation-name: scaleIn;
          animation-timing-function: cubic-bezier(.71,.55,.62,1.57);
        }

        .other__item h4 {
          margin: 0;
          font-size: 16px;
        }
        .other__item {
          margin-bottom: 16px;
          margin-left: 16px;
        }
        .other__item div {
          margin-left: 16px;
        }

        @keyframes scaleIn {
          0% {
            height: 0;
          }
          1% {
            height: fit-content;
            opacity: 0;
            transform: scale(.9, .9);
          }
          100% {
            opacity: 1;
            height: auto;
            transform: scale(1, 1);
          }
        }
        @keyframes scaleOut {
          0% {
            opacity: 1;
            transform: scale(1, 1);
          }
          100% {
            opacity: 0;
            transform: scale(.9, .9);
          }
        }


        /* Stat Box */
        .stat-box {
          cursor: pointer;
          position: relative;
          display: inline-flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: var(--lumo-contrast-10pct);
          border-radius: 4px;
        }
        .stat-box:not(:last-child) {
          margin-bottom:16px;
        }
        .stat-box__save {
          position: absolute;
          height: 12px;
          width: 12px;
          border: 2px solid var(--mdc-theme-primary);
          border-radius: 50%;
          top: -8px;
          background-color: #33383C;
          display: none;
        }
        .stat-box__save[enabled] {
          background-color: var(--mdc-theme-primary);
          display: block;
        }
        .stat-box__mod {
          font-size: 32px;
          font-weight: normal;
          margin: 8px 8px 2px;
          line-height: 1;
          position: relative;
          left: 1px;
        }
        .stat-box__footer {
          display: inline-block;
        }
        .stat-box__adj {
          position: relative;
          right: 0px;
        }
        .not-edit-mode .stat-box__adj {
          right: 15px;
          color: var(--lumo-body-text-color);
          -webkit-text-fill-color: var(--lumo-body-text-color);
        }
        .stat-box__side {
          padding: 8px 0;
        }

        /* Stat Box HP  */
        .stat-box--hp {
          width: calc(66% - 2px) !important;
          max-width: 236px !important;
          flex-direction: row;
          min-width: 160px;
          justify-content: space-between;
          flex-wrap: wrap;
          height: fit-content;
          height: 148px;
          cursor: unset;
        }
        .stat-box__total {
          font-size: 14px;
        }
        .stat-box--hp .stat-box__adj--hp {
          position: absolute;
          bottom: -10px;
          right: 5px;
          font-size: 16px;
        }
        .stat-box--hp .stat-box__footer {
          width: 100%;
        }
        .stat-box__side {
            flex-wrap: wrap;
            justify-content: space-between;
            width: 100%;
            margin: 8px;
        }
        .stat-box--hp .btn-field {
          margin-top: 12px;
          width: auto;
        }

        .stat-box--hp .btn-field:not(:last-child) {
          margin-bottom: 0px
        }
        .stat-box__side {
          max-width: 80px;
          margin: 0 8px 0 0;
        }
        .stat-box--hp .btn-field {
          margin-top: 0;
          width: 100%;
        }
        .stat-box--hp .btn-field:not(:last-child) {
          margin-bottom: 12px
        }
        .edit-mode .stat-box--hp {
          justify-content: center;
          align-items: center;
        }
        .stat-box--hp-edit {
          height: 100%;
          width: 100%;
          margin-top: 4px;
          align-items: center;
          justify-content: center;
          display: flex;
          flex-direction: column;
          position: relative;
          font-size: 18px;
        }
        .stat-box--hp-edit .custom-val__swap {
          top: 0px;
          right: 0;
          position: absolute;
        }


        /* Button Field */
        .btn-field {
          display: inline-flex;
          flex-direction: row;
          flex-wrap: nowrap;
          width: 100%;
          height: 36px;
          background: var(--lumo-contrast-10pct);
          border-radius: 4px;
        }
        .btn-field:not(:last-child){
          margin-bottom: 12px;
        }
        .btn-field__btn {
          display: block;
          width: 100%;
        }
        .btn-field__input {
          display: none;
        }
        .btn-field .btn-field__btn-label {
          display: none;
        }
        .btn-field--open .btn-field__btn {
          width: calc(100% - 50px);
        }
        .btn-field--open .btn-field__btn-label {
          width: 0;
          overflow: hidden;
        }
        .btn-field--open .btn-field__input {
          display: block;
          width: 50px;
          margin-top: -40px;
        }
        .btn-field--heal.btn-field--open .btn-field__btn-label {
          margin-left: -16px;
        }
        .btn-field vaadin-integer-field {
          --lumo-contrast-10pct: transparent;
        }
        .btn-field__btn-label--temp,
        .btn-field__btn-label--damage {
          font-size: 12px;
        }
        .btn-field--heal dnd-button {
          --mdc-theme-primary: #83f675;
        }
        .btn-field--dmg dnd-button {
          --mdc-theme-primary: #f83c42;
        }
        .btn-field--temp dnd-button {
          --mdc-theme-primary: #2069c9;
        }


        /* Hit Dice */
        .hit-dice {
          display: flex;
          flex-direction: column;
          border-radius: 4px;
          padding: 6px 0 0;
          background: var(--lumo-contrast-10pct);
          margin-bottom: 16px;
        }
        .hit-dice__heading {
          display: inline-block;
          text-align: center;
          margin-bottom: 8px;
          color: var(--mdc-theme-primary);
          font-size: 14px;
        }
        .hit-dice__item {
          width: 100%;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
        }
        .hit-dice__item dnd-button {
          width: 100%;
        }
        .hit-dice__item--error dnd-button {
          --mdc-theme-primary: var(--lumo-error-color-50pct);
        }
        .hit-dice__item-label {
          width: 100%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 4px 0 0;
        }
        .hit-dice__item-label dnd-svg {
          stroke: var(--mdc-theme-on-primary);
          fill: var(--mdc-theme-primary);
          width: 30px;
        }
        .hit-dice__reset {
          margin-top: auto;
        }

        .basic-box__wrap {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
          max-width: 360px;
        }
        .basic-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 4px 0;
          background: var(--lumo-contrast-10pct);
          border-radius: 4px;
          height: min-content;
          width: calc(33% - 8px);
          max-width: 120px;
        }
        .basic-box--short {
          height: fit-content;
        }
        
        .basic-box__label {
          color: var(--mdc-theme-primary);
          font-size: 14px;
        }
        .basic-box__value {
          font-size: 18px;
          width: 100%;
          display: flex;
          flex-direction: column;
          text-align: center;
        }
        .not-edit-mode .initiative {
          cursor: pointer;
        }

        .custom-val__swap {
          font-size: 10px;
          margin: -4px 0 8px auto;
          background-color: var(--lumo-contrast-10pct);
          /* background-color: var(--mdc-theme-secondary-lighter); */
          padding: 4px 5px 4px;
          line-height: 1;
          border-radius: 4px;
          cursor: pointer;
        }
        .custom-val__swap .material-icons {
          font-size: 11px;
          position: relative;
          top: 1px;
        }

        /* Rest Buttons */
        .rest-btn {
          margin-bottom: 16px;
        }

        @media(min-width: 420px) {
          .wrap {
            padding-bottom: 0;
          }
        }
        @media(min-width: 505px) {
          .stats {
            width: 250px;
          }
        }
        @media(min-width: 920px) {
          .basic-box__wrap {
            position: absolute;
            right: 0;
          }
          .others {
            margin-bottom: 0;
          }
          .other .other__header .material-icons {
            display: none;
          }
          .other .other__wrap {
            opacity: 1;
            height: auto;
            transform: scale(1, 1);
          }
          .other__header {
            font-size: 18px;
          }
        }
      </style>

      <div class$="[[_editModeClass(isEditMode)]]">
        <div class="wrap">
          <div class="health-wrap">
            <!-- Hit Points -->
            <div class="stat-box stat-box--hp">

              <vaadin-integer-field hidden$=[[isEditMode]] id="hpField" theme="hp" value={{currentHP}} on-change="hpBlurHandler" on-blur="hpChangeHandler" min="0" max="[[_maxHP(customHealthVal, maxHP, customHealth)]]" has-controls label="Hit Points">
                <span class="stat-box__adj--hp" slot="suffix">/ [[_maxHP(customHealthVal, maxHP, customHealth)]] [[_tempHpStr(tempHP)]]</span>
              </vaadin-integer-field>

              <div class="stat-box--hp-edit" hidden$=[[!isEditMode]]>
                <div class="custom-val__swap" on-click="_swapCustomHealth" hidden$=[[!isEditMode]]>
                  <span class="custom-val__option" hidden$=[[customHealth]]><span class="material-icons">edit</span> Edit</span>
                  <span class="custom-val__option" hidden$=[[!customHealth]]><span class="material-icons">restart_alt</span> Use Standard</span>
                </div>
                <div class="basic-box__label">Max HP</div>

                <div hidden$=[[!customHealth]]>
                  <vaadin-integer-field  value={{customHealthVal}} min="0" has-controls hidden$="[[!isEditMode]]"></vaadin-integer-field>
                  <span hidden$="[[isEditMode]]">[[customHealthVal]]</span>
                </div>
                <div hidden$=[[customHealth]]>[[maxHP]]</div>
              </div>

              <div class="stat-box__side" hidden$=[[isEditMode]]>
                <!--  Healing / Damage -->
                <div class="btn-field btn-field--heal">
                    <dnd-button icon="favorite" background="none" class="btn-field__btn" on-click="_toggleButtonField"></dnd-button>
                    <vaadin-integer-field class="btn-field__input" min="0" on-keydown="_submitButtonField" on-blur="_blurButtonField">
                      <span slot="prefix">+</span>
                    </vaadin-integer-field>
                </div>
                <div class="btn-field btn-field--dmg">
                    <dnd-button svg="swords" background="none" class="btn-field__btn" on-click="_toggleButtonField"></dnd-button>
                    <vaadin-integer-field class="btn-field__input" min="0" on-keydown="_submitButtonField" on-blur="_blurButtonField">
                      <span slot="prefix">-</span>
                    </vaadin-integer-field>
                </div>
                <div class="btn-field btn-field--temp">
                    <dnd-button svg="paladin" background="none" class="btn-field__btn" on-click="_toggleButtonField"></dnd-button>
                    <vaadin-integer-field class="btn-field__input" min="0" on-keydown="_submitButtonField" on-blur="_blurButtonField">
                      <span slot="prefix">+</span>
                    </vaadin-integer-field>
                </div>
              </div>
            </div>


            <!--  Hit Dice -->
            <div class="hit-dice">
              <div class="hit-dice__heading">Hit Dice</div>
              <template is="dom-repeat" items="[[hitDice]]">
                <div class="hit-dice__item" data-class-name$="[[item.className]]">
                  <dnd-button on-click="_useHitDice">
                    <div class="hit-dice__item-label" slot="label">
                      <dnd-svg id="[[item.die]]"></dnd-svg>
                      <div class="hit-dice__count">[[item.current]] / [[item.total]]</div>
                    </div>
                  </dnd-button>
                </div>
              </template>
              <dnd-button class="hit-dice__reset" label="Reset" on-click="_resetHitDice"></dnd-button>
            </div>
          </div>

          <div class="basic-box__wrap">
            <div class="basic-box basic-box--short ac">
              <div class="basic-box__value">
                <div class="custom-val__swap" on-click="_swapCustomAC" hidden$=[[!isEditMode]]>
                  <span class="custom-val__option" hidden$=[[customAC]]><span class="material-icons">edit</span> Edit</span>
                  <span class="custom-val__option" hidden$=[[!customAC]]><span class="material-icons">restart_alt</span> Use Standard</span>
                </div>

                <div hidden$=[[!customAC]]>
                  <vaadin-integer-field theme="mini" value={{customACVal}} min="0" max="40" has-controls hidden$="[[!isEditMode]]"></vaadin-integer-field>
                  <div hidden$="[[isEditMode]]">[[customACVal]]</div>
                </div>
                <div hidden$=[[customAC]]>[[ac]]</div>
              </div>
              <div class="basic-box__label">AC</div>
            </div>

            <div class="basic-box basic-box--short initiative" on-click="_roll">
              <div class="basic-box__value">
                <div class="custom-val__swap" on-click="_swapCustomInitiative" hidden$=[[!isEditMode]]>
                  <span class="custom-val__option" hidden$=[[customInitiative]]><span class="material-icons">edit</span> Edit</span>
                  <span class="custom-val__option" hidden$=[[!customInitiative]]><span class="material-icons">restart_alt</span> Use Standard</span>
                </div>

                <div hidden$=[[!customInitiative]]>
                  <vaadin-integer-field theme="mini" value={{customInitiativeVal}} min="-20" max="20" has-controls hidden$="[[!isEditMode]]"></vaadin-integer-field>
                  <div hidden$="[[isEditMode]]">[[_plusMinus(customInitiativeVal)]][[customInitiativeVal]]</div>
                </div>
                <div hidden$=[[customInitiative]]>[[initiative]]</div>
              </div>
              <div class="basic-box__label">Initiative</div>
            </div>

            <div class="basic-box basic-box--short speed">
              <div class="basic-box__value" inner-h-t-m-l=[[speed]]></div>
              <div class="basic-box__label">Speed</div>
            </div>

            <!--  Short Rest -->
            <!-- <dnd-button icon="watch" class="rest-btn rest-btn--short" background="var(--lumo-contrast-10pct)" label="Short" on-click="_triggerShortRest"></dnd-button> -->

            <!--  Long Rest -->
            <!-- <dnd-button icon="watch_later" class="rest-btn rest-btn--long" background="var(--lumo-contrast-10pct)" label="Long" on-click="_triggerLongRest"></dnd-button> -->
            </div>

          <div class="stats-other-wrap">
            <div class="stats">
              <!--  Attributes -->
              <div class="attribute-wrap">
                <div class="stat-box" on-click="_roll">
                  <div class="stat-box__save" enabled$="[[_contains(saves, 'str')]]"></div>
                  <div class="stat-box__mod">[[_mod(strAdj, str)]]</div>
                  <div class="stat-box__footer">
                    <vaadin-integer-field theme="mini" value={{str}} min="1" max="20" has-controls label="Strength" disabled$="[[!isEditMode]]">
                      <span class="stat-box__adj" slot="suffix">[[_adjustString(strAdj)]]</span>
                    </vaadin-integer-field>
                  </div>
                </div>
                <div class="proficiencies">
                  <div class="proficiency-item" on-click="_roll" enabled$="[[_strContains(skillProfs, 'athletics')]]" expertise$="[[_strContainsTwo(skillProfs, 'athletics')]]">Athletics</div>
                </div>
              </div>
              <div class="attribute-wrap">
                <div class="stat-box" on-click="_roll">
                  <div class="stat-box__save" enabled$="[[_contains(saves, 'dex')]]"></div>
                  <div class="stat-box__mod">[[_mod(dexAdj, dex)]]</div>
                  <div class="stat-box__footer">
                    <vaadin-integer-field theme="mini" value={{dex}} min="1" max="20" has-controls label="Dexterity" disabled$="[[!isEditMode]]">
                      <span class="stat-box__adj" slot="suffix">[[_adjustString(dexAdj)]]</span>
                    </vaadin-integer-field>
                  </div>
                </div>
                <div class="proficiencies">
                  <div class="proficiency-item" on-click="_roll" expertise$="[[_strContainsTwo(skillProfs, 'acrobatics')]]" enabled$="[[_strContains(skillProfs, 'acrobatics')]]">Acrobatics</div>
                  <div class="proficiency-item" on-click="_roll" expertise$="[[_strContainsTwo(skillProfs, 'sleight of hand')]]" enabled$="[[_strContains(skillProfs, 'sleight of hand')]]">Sleight of Hand</div>
                  <div class="proficiency-item" on-click="_roll" expertise$="[[_strContainsTwo(skillProfs, 'stealth')]]" enabled$="[[_strContains(skillProfs, 'stealth')]]">Stealth</div>
                </div>
              </div>
              <div class="attribute-wrap">
                <div class="stat-box" on-click="_roll">
                  <div class="stat-box__save" enabled$="[[_contains(saves, 'con')]]"></div>
                  <div class="stat-box__mod">[[_mod(conAdj, con)]]</div>
                  <div class="stat-box__footer">
                    <vaadin-integer-field theme="mini" value={{con}} min="1" max="20" has-controls label="Constitution" disabled$="[[!isEditMode]]">
                      <span class="stat-box__adj" slot="suffix">[[_adjustString(conAdj)]]</span>
                    </vaadin-integer-field>
                  </div>
                </div>
                <div class="proficiencies">
                
                </div>
              </div>
              <div class="attribute-wrap">
                <div class="stat-box" on-click="_roll">
                  <div class="stat-box__save" enabled$="[[_contains(saves, 'int')]]"></div>
                  <div class="stat-box__mod">[[_mod(intAdj, int)]]</div>
                  <div class="stat-box__footer">
                    <vaadin-integer-field theme="mini" value={{int}} min="1" max="20" has-controls label="Intelligence" disabled$="[[!isEditMode]]">
                      <span class="stat-box__adj" slot="suffix">[[_adjustString(intAdj)]]</span>
                    </vaadin-integer-field>
                  </div>
                </div>
                <div class="proficiencies">
                  <div class="proficiency-item" on-click="_roll" expertise$="[[_strContainsTwo(skillProfs, 'arcana')]]" enabled$="[[_strContains(skillProfs, 'arcana')]]">Arcana</div>
                  <div class="proficiency-item" on-click="_roll" expertise$="[[_strContainsTwo(skillProfs, 'history')]]" enabled$="[[_strContains(skillProfs, 'history')]]">History</div>
                  <div class="proficiency-item" on-click="_roll" expertise$="[[_strContainsTwo(skillProfs, 'investigation')]]" enabled$="[[_strContains(skillProfs, 'investigation')]]">Investigation</div>
                  <div class="proficiency-item" on-click="_roll" expertise$="[[_strContainsTwo(skillProfs, 'nature')]]" enabled$="[[_strContains(skillProfs, 'nature')]]">Nature</div>
                  <div class="proficiency-item" on-click="_roll" expertise$="[[_strContainsTwo(skillProfs, 'religion')]]" enabled$="[[_strContains(skillProfs, 'religion')]]">Religion</div>
                </div>
              </div>
              <div class="attribute-wrap">
                <div class="stat-box" on-click="_roll">
                  <div class="stat-box__save" enabled$="[[_contains(saves, 'wis')]]"></div>
                  <div class="stat-box__mod">[[_mod(wisAdj, wis)]]</div>
                  <div class="stat-box__footer">
                    <vaadin-integer-field theme="mini" value={{wis}} min="1" max="20" has-controls label="Wisdom" disabled$="[[!isEditMode]]">
                      <span class="stat-box__adj" slot="suffix">[[_adjustString(wisAdj)]]</span>
                    </vaadin-integer-field>
                  </div>
                </div>
                <div class="proficiencies">
                  <div class="proficiency-item" on-click="_roll" expertise$="[[_strContainsTwo(skillProfs, 'animal handling')]]" enabled$="[[_strContains(skillProfs, 'animal handling')]]">Animal Handling</div>
                  <div class="proficiency-item" on-click="_roll" expertise$="[[_strContainsTwo(skillProfs, 'insight')]]" enabled$="[[_strContains(skillProfs, 'insight')]]">Insight</div>
                  <div class="proficiency-item" on-click="_roll" expertise$="[[_strContainsTwo(skillProfs, 'medicine')]]" enabled$="[[_strContains(skillProfs, 'medicine')]]">Medicine</div>
                  <div class="proficiency-item" on-click="_roll" expertise$="[[_strContainsTwo(skillProfs, 'perception')]]" enabled$="[[_strContains(skillProfs, 'perception')]]">Perception</div>
                  <div class="proficiency-item" on-click="_roll" expertise$="[[_strContainsTwo(skillProfs, 'survival')]]" enabled$="[[_strContains(skillProfs, 'survival')]]">Survival</div>
                </div>
              </div>
              <div class="attribute-wrap">
                <div class="stat-box" on-click="_roll">
                  <div class="stat-box__save" enabled$="[[_contains(saves, 'cha')]]"></div>
                  <div class="stat-box__mod">[[_mod(chaAdj, cha)]]</div>
                  <div class="stat-box__footer">
                    <vaadin-integer-field theme="mini" value={{cha}} min="1" max="20" has-controls label="Charisma" disabled$="[[!isEditMode]]">
                      <span class="stat-box__adj" slot="suffix">[[_adjustString(chaAdj)]]</span>
                    </vaadin-integer-field>
                  </div>
                </div>
                <div class="proficiencies">
                  <div class="proficiency-item" on-click="_roll" expertise$="[[_strContainsTwo(skillProfs, 'deception')]]" enabled$="[[_strContains(skillProfs, 'deception')]]">Deception</div>
                  <div class="proficiency-item" on-click="_roll" expertise$="[[_strContainsTwo(skillProfs, 'intimidation')]]" enabled$="[[_strContains(skillProfs, 'intimidation')]]">Intimidation</div>
                  <div class="proficiency-item" on-click="_roll" expertise$="[[_strContainsTwo(skillProfs, 'performance')]]" enabled$="[[_strContains(skillProfs, 'performance')]]">Performance</div>
                  <div class="proficiency-item" on-click="_roll" expertise$="[[_strContainsTwo(skillProfs, 'persuasion')]]" enabled$="[[_strContains(skillProfs, 'persuasion')]]">Persuasion</div>
                </div>
              </div>
            </div>
  
            <div class="others">
              <div class="other" open$="[[featuresOpen]]">
                <button class="other__header" on-click="_toggleFeatures">
                  <span class="material-icons">expand_more</span>
                  <span class="other__header-text">Features</span>
                </button>  

                <div class="other__wrap">
                  <div class="other__item" hidden$="[[!hasDarkvision]]">
                    <h4>Darkvision [[darkvision]] ft.</h4>
                  </div>
                  <div class="other__item" hidden$="[[!_exists(feats)]]">
                    <h4>Feats</h4>
                    <div>[[feats]]</div>
                  </div>
                  <!-- <div class="other__item">
                    <h4>Resistances</h4>
                    <div>Todo</div>
                  </div> -->
                </div>
              </div>

              <div class="other" open$="[[otherProfsOpen]]">
                <button class="other__header" on-click="_toggleOtherProfs">
                  <span class="material-icons">expand_more</span>
                  <span class="other__header-text">Proficiencies</span>
                </button>  

                <div class="other__wrap">
                  <div class="other__item" hidden$="[[!_exists(armorProfs)]]">
                    <h4>Armor</h4>
                    <div>[[armorProfs]]</div>
                  </div>
                  <div class="other__item" hidden$="[[!_exists(weaponProfs)]]">
                    <h4>Weapons</h4>
                    <div>[[weaponProfs]]</div>
                  </div>
                  <div class="other__item" hidden$="[[!_exists(toolProfs)]]">
                    <h4>Tools</h4>
                    <div>[[toolProfs]]</div>
                  </div>
                  <div class="other__item" hidden$="[[!_exists(languages)]]">
                    <h4>Languages</h4>
                    <div>[[languages]]</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("dnd-character-builder-attributes", DndCharacterBuilderAttributes);