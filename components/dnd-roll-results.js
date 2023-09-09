import {PolymerElement, html} from '@polymer/polymer';
import "./styles/material-styles.js";
import "./styles/my-styles.js";
import { rerollDice, rollDice, rollEventChannel } from '../util/roll.js';
import { getEditModeChannel } from '../util/editMode.js';

class DndRollResults extends PolymerElement {
  
  static get properties() {
    return {
      rollResults: {
        type: Array,
        value: []
      },
      focusRoll: {
        type: Number,
        value: 0,
        observer: "focusRollChange"
      },
      isOpen: {
        type: Boolean,
        value: false
      }
    };
  }

  focusRollChange(focusRoll) {
    setTimeout(() => {
      const focusElement = this.shadowRoot.querySelector(`[index="${focusRoll}"]`);
      if (focusElement) {
        const focusDiceWrap = focusElement.querySelector('.roll-result__dice-results');
        focusDiceWrap.toggleAttribute('tooltip', focusDiceWrap.offsetWidth < focusDiceWrap.scrollWidth);
        const focusRollWrap = focusElement.querySelector('.roll-result__roll');
        focusRollWrap.toggleAttribute('tooltip', focusRollWrap.offsetWidth < focusRollWrap.scrollWidth);
        const focusTitle = focusElement.querySelector('.roll-result__title');
        focusTitle.toggleAttribute('tooltip', focusTitle.offsetWidth < focusTitle.scrollWidth || this.rollResults[focusRoll] && this.rollResults[focusRoll].isCrit);
      }
    }, 500);
  }

  
  connectedCallback() {
    super.connectedCallback();

    this.rollHandler = (e) => {
      console.error('new-roll', e.detail);
      this.push('rollResults', e.detail);
      this.focusRoll = this.rollResults.length - 1;
      this.isOpen = true;

      const scrollAtBottom = Math.abs(this.$.scrollContainer.scrollHeight - this.$.scrollContainer.clientHeight - this.$.scrollContainer.scrollTop) < 1

      setTimeout(() => {
        this.$.scrollContainer.scrollTo({top: this.$.scrollContainer.scrollHeight, behavior: scrollAtBottom ? 'instant' : 'smooth'});
      }, 0);
    };
    rollEventChannel().addEventListener('new-roll', this.rollHandler);

    this.editModeHandler = (e) => {
      if (e.detail.isEditMode) {
        this.isOpen = false;
      }
    };
    getEditModeChannel().addEventListener('editModeChange', this.editModeHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    rollEventChannel().removeEventListener('new-roll', this.rollHandler);
    getEditModeChannel().removeEventListener('editModeChange', this.editModeHandler);
  }

  _setFocusRoll(e) {
    const index = parseInt(e.target.closest('.roll-result').getAttribute('index'));
    if (this.focusRoll !== index) {
      document.activeElement.blur();
      this.animate = true;
      setTimeout(() => {
        this.animate = false;
      }, 500);
    }
    this.focusRoll = index;
  }

  _deleteRoll(e) {
    const index = parseInt(e.target.closest('.roll-result').getAttribute('index'));
    this.splice('rollResults', index, 1);
    setTimeout(() => {
      if (this.focusRoll > this.rollResults.length - 1) {
        this.focusRoll = this.rollResults.length - 1;
      }
    }, 0);
    if (this.rollResults.length === 0) {
      this.isOpen = false;
    }
  }

  _rerollRoll(e) {
    const index = parseInt(e.target.closest('.roll-result').getAttribute('index'));
    const thisRollResult = this.rollResults[index];
    rerollDice(thisRollResult);
  }

  _toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  _clearRolls() {
    this.rollResults = [];
    this.isOpen = false;
  }

  _diceIconClass(roll) {
    let rollValue = '20';
    if (roll) {
      const rollSplit = roll.match(/(?:d)(\d+)/);
      if (rollSplit && rollSplit.length > 1) {
        rollValue = rollSplit[1];
      }
    }
    return `roll-result__dice fal fa-dice-d${rollValue}`;
  }

  _equals(a, b) {
    return a === b;
  }

  _isLast(index, array) {
    return array.length && array.length - 1 === index;
  }

  _and(a, b) {
    return a && b;
  }

  _or(...bools) {
    for (let bool of bools) {
      if (bool) {
        return true;
      }
    }
    return false;
  }

  static get template() {
    return html`
      <style include="material-styles fa-styles">
        :host {
          position: relative;
          display: block;
          /* --mdc-theme-primary: #ff9800; */
        }
        [hidden] {
          display: none !important;
        }

        .roll-results__toggle-btn {
          position: absolute;
          right: 51px;
          bottom: 6px;
          height: 20px;
          border-radius: 20px;
          width: 60px;
          z-index: 3;
        }
        .roll-results__toggle-btn[open] i {
          transform: rotate(180deg);
        }
        .roll-results__toggle-btn[disabled] {
          display: none;
        }
        .roll-results__clear-btn {
          background: var(--mdc-theme-primary);
          color: var(--mdc-theme-on-primary);
          font-size: 14px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: absolute;
          bottom: 6px;
          height: 24px;
          border-radius: 20px;
          width: 60px;
          z-index: 3;
          right: 132px;
        }

        .roll-results {
          position: absolute;
          bottom: -340px;
          right: calc(100% - 20px);
          flex-direction: column;
          align-items: flex-end;
          width: 110vw;
          margin-bottom: -20px;
          margin-right: -65px;
          pointer-events: none;
          transition: bottom 0.2s;
        }
        .roll-results[open] {
          bottom: 18px;
        }
        .roll-results__mask {
          position: absolute;
          right: 32px;
          bottom: 0;
          width: 100%;
          height: 100%;
          max-width: 800px;
          max-height: 255px;
          opacity: 0;
        }
        .roll-results[open] .roll-results__mask {
          animation: reveal .3s linear;
          opacity: 1;
        }
        @keyframes reveal {
          0% {
            opacity: 0;
          }
          
          50% {
            opacity: 0;
          }
          
          100% {
            opacity: 1;
          }
        }
        .roll-results__background {
          width: 100%;
          height: 100%;
          /* background: linear-gradient(0deg, black, transparent); */
        }
        .roll-results__scroll-container {
          max-height: 198px;
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          pointer-events: all;
          padding: 0 17px 50px 0;
          box-sizing: content-box;
          width: 100%;
        }
        .roll-results__scroll-wrap {
          position: relative;
          right: 133px;
          z-index: 2;
          overflow: hidden;
          width: fit-content;
          margin-left: auto;
        }

        .roll-result {
          background: var(--mdc-theme-surface-surface);
          color: var(--mdc-theme-on-surface);
          border-radius: 6px;
          margin-bottom: 16px;
          display: flex;
          width: 225px;
          padding: 12px;
          height: 86px;
          outline: none;
          scroll-snap-align: start;
          position: relative;
          user-select: none;
        }
        .roll-result[animate] {
          transition: height 0.3s, width 0.3s;
        }
        .roll-result[crit]:before {
          content: 'CRITICAL!!!';
          color: var(--lumo-error-color);
          position: absolute;
          left: -15px;
          top: -4px;
          font-weight: bold;
          transform: rotate(-12deg);
          background: var(--mdc-theme-surface-surface);
          padding: 0 8px;
          border: 2px solid var(--lumo-error-color);
          pointer-events: none;
        }
        .roll-result[animate][crit]:before {
          transition: left 0.3s, top 0.3s, transform 0.3s;
        }
        .roll-result[crit][little]:before {
          left: 13px;
          top: 10px;
          transform: rotate(0deg);
        }
        .roll-result__summary {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding-right: 10px;
          border-right: 1px solid var(--mdc-theme-on-surface-surface);
          margin-right: 10px;
          flex-grow: 1;
        }
        .roll-result:after {
          content: '=';
          font-size: 29px;
          padding: 0px 0 3px;
          background: var(--mdc-theme-surface-surface);
          color: var(--mdc-theme-on-surface-surface);
          position: absolute;
          right: 78px;
          line-height: 1;
          top: 34px;
          opacity: 1;
        }
        .roll-result[animate]:after {
          transition: opacity 0.3s, top 0.3s, right 0.3s;
        }
        
        .roll-result__title {
          margin-top: -4px;
          margin-bottom: 4px;
          overflow: hidden;
          width: auto;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 14px;
          font-weight: bold;
        }
        .roll-result__type {
          color: var(--mdc-theme-primary);
        }
        .roll-result__type-separator {
          margin-left: -4px;
        }
        .roll-result__total {
          font-size: 32px;
          font-weight: bold;
          justify-content: center;
          display: flex;
          align-items: center;
          width: 64px;
          flex-shrink: 0;
        }
        .roll-result[animate] .roll-result__total {
          transition: width 0.3s, font-size 0.3s;
        }
        .roll-result__dice-wrap {
          display: flex;
          align-items: center;
          height: 30px;
          overflow: hidden;
        }
        .roll-result[animate] .roll-result__dice-wrap {
          transition: height 0.3s;
        }
        .roll-result__dice {
          font-size: 30px;
          margin-right: 10px;
          color: var(--mdc-theme-on-surface-surface);
        }
        .roll-result__dice-results {
          font-size: 20px;
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .roll-result__dice-results .tooltip {
          font-size: 16px;
          bottom: 30px;
          top: unset;
        }
        .roll-result__dice-results span {
          color: var(--mdc-theme-on-surface-surface);
          position: relative;
          font-size: 17px;
          bottom: 7px;
          margin: 0 2px;
        }
        .roll-result__dice-results span:after {
          display: block;
          content: '';
          position: absolute;
          left: -3px;
          bottom: 9px;
          border-bottom: 1px solid var(--mdc-theme-on-surface-surface);
          width: 150%;
          transform: rotate(-25deg);
        }
        .roll-result__roll {
          color: var(--mdc-theme-on-surface-surface);
          font-weight: bold;
          height: 28px;
          overflow: hidden;
          align-items: flex-end;
          line-height: 1;
          text-overflow: ellipsis;
        }
        .roll-result[animate] .roll-result__roll {
          transition: height 0.3s;
        }
        .roll-result__roll[flex] {
          display: flex;
        }
        .roll-result__roll:not([flex]) {
          line-height: 36px;
        }
        .roll-result__roll span {
          font-size: 10px;
          line-height: 1;
          width: min-content;
          margin-right: auto;
          display: inline-flex;
        }
        .roll-result__roll .tooltip {
          font-size: 16px;
          color: var(--mdc-theme-on-surface-surface);
          bottom: 0;
          top: unset;
        }
        .roll-result__close,
        .roll-result__reroll {
          position: absolute;
          height: 20px;
          width: 20px;
          right: 0px;
          top: 0px;
          border: 0;
          margin: 0;
          background: none;
          padding: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--mdc-theme-on-surface);
        }
        .roll-result[little] .roll-result__reroll {
          display: none;
        }
        .roll-result__reroll {
          right: 58px;
          font-size: 10px;
        }

        .roll-result[little] {
          width: 175px;
          height: 24px;
          cursor: zoom-in;
        }
        .roll-result[little] .roll-result__dice-wrap {
          height: 0;
        }
        .roll-result[little] .roll-result__roll {
          height: 0;
        }
        .roll-result[little]:after {
          opacity: 0;
          right: 47px;
          top: 7px;
        }
        .roll-result[little] .roll-result__total {
          font-size: 18px;
          width: 34px;
        }
        .roll-result[little] .roll-result__title {
          margin: 0;
        }
        .roll-result[little] .roll-result__close {
          display: none;
        }

        @media(max-width: 420px) {
          .roll-result:not([little]) .tooltip-wrap:focus .tooltip {
            display: block;
          }
        }

        .roll-result:not([little]) .tooltip-wrap:hover .tooltip {
          display: block;
        }
        .tooltip-wrap:focus {
          outline: none;
        }
        .tooltip-wrap:not([tooltip]) .tooltip {
          display: none !important;
        }
        .tooltip {
          position: absolute;
          background: var(--mdc-theme-surface-surface);
          color: var(--mdc-theme-on-surface);
          font-size: 14px;
          font-weight: bold;
          padding: 9.5px 12px;
          border-radius: 6px;
          left: 0;
          top: 0;
          display: none;
          word-wrap: break-word;
          width: calc(100% - 55px);
          z-index: 2;
          pointer-events: none;
          line-height: 1.5;
          white-space: normal;
          box-shadow:
            0px 3px 5px -1px rgba(0, 0, 0, 0.2),
            0px 6px 10px 0px rgba(0, 0, 0, 0.14),
            0px 1px 18px 0px rgba(0, 0, 0, .12);
        }
        .tooltip .roll-result__name {
          white-space: normal;
        }

        @media(min-width: 420px) {
          .roll-results__mask {
            -webkit-mask-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
            mask-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
          }
        }

        @media(min-width: 921px) {
          .roll-results {
            bottom: -450px;
          }
          .roll-results__scroll-container {
            max-height: 323px;
          }
          .roll-results__mask {
            max-height: 400px;
          }
          .roll-result {
            min-width: 250px;
            max-width: 500px;
          }
        }
      </style>
      <button class="roll-results__clear-btn mdc-icon-button mdc-button--raised" on-click="_clearRolls" hidden$=[[!isOpen]]>Clear</button>
      <button class="roll-results__toggle-btn mdc-icon-button mdc-button--raised" on-click="_toggleOpen" disabled$="[[_equals(rollResults.length, 0)]]" open$=[[isOpen]]>
        <i class="fas fa-angle-up"></i>
      </button>
      <div class="roll-results" open$="[[isOpen]]">
        <div class="roll-results__scroll-wrap">
          <div class="roll-results__scroll-container" id="scrollContainer">
            <template is="dom-repeat" items="[[rollResults]]">
              <div class="roll-result" animate$="[[animate]]" crit$="[[item.isCrit]]" little$="[[!_equals(index, focusRoll)]]" on-click="_setFocusRoll" index$="[[index]]">
                <div class="roll-result__summary">
                  <div class="roll-result__title tooltip-wrap" tabindex="0">
                    <span class="roll-result__type">[[item.type]]</span>
                    <span class="roll-result__type-separator" hidden$="[[!_and(item.name, item.type)]]">:</span>
                    <span class="roll-result__name">[[item.name]]</span>
                    <div class="tooltip">
                      <span class="roll-result__type">[[item.type]]</span>
                      <span class="roll-result__type-separator" hidden$="[[!_and(item.name, item.type)]]">:</span>
                      <span class="roll-result__name">[[item.name]]</span>
                    </div>
                  </div>
                  <div class="roll-result__dice-wrap">
                    <i class$="[[_diceIconClass(item.roll)]]"></i>
                    <div class="roll-result__dice-results tooltip-wrap" tabindex="0" inner-h-t-m-l="[[item.result]]"></div>
                  </div>
                  <div class="roll-result__roll tooltip-wrap" flex$="[[_or(item.adv, item.disadv, item.doubleAdv)]]" tabindex="0" inner-h-t-m-l="[[item.roll]]"></div>
                </div>
                <div class="roll-result__total">[[item.total]]</div>
                <button class="roll-result__close fal fa-times" on-click="_deleteRoll"></button>
                <button class="roll-result__reroll fal fa-redo" on-click="_rerollRoll"></button>
              </div>
            </template>
          </div>
        </div>
        <div class="roll-results__mask">
          <div class="roll-results__background"></div>
        </div>
      </div>
    `;
  }
}

customElements.define('dnd-roll-results', DndRollResults);