import {PolymerElement, html} from '@polymer/polymer';
import "./styles/material-styles.js";
import "./styles/my-styles.js";
import { rollEventChannel } from '../util/roll.js';
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
        value: 0
      },
      isOpen: {
        type: Boolean,
        value: false
      }
    };
  }

  
  connectedCallback() {
    super.connectedCallback();

    this.rollHandler = (e) => {
      console.error('new-roll', e.detail);
      this.push('rollResults', e.detail);
      this.focusRoll = this.rollResults.length - 1;
      this.isOpen = true;

      setTimeout(() => {
        this.$.rollResults.scrollTo({top: this.$.rollResults.scrollHeight, behavior: 'smooth'});
      }, 500);
    };
    rollEventChannel().addEventListener('new-roll', this.rollHandler);

    this.$.rollResults.addEventListener('click', (e) => {
      if (!e.target.closest('.roll-result')) {
        this.isOpen = false;
      }
    });

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
    this.focusRoll = index;
  }

  _deleteRoll(e) {
    const index = parseInt(e.target.closest('.roll-result').getAttribute('index'));
    this.splice('rollResults', index, 1);
    setTimeout(() => {
      if (this.focusRoll > this.rollResults.length - 1) {
        this.focusRoll = this.rollResults.length - 1;
      }
      setTimeout(() => {
        this.$.rollResults.scrollTo({top: this.$.rollResults.scrollHeight, behavior: 'smooth'});
      }, 500);
    }, 0);
    if (this.rollResults.length === 0) {
      this.isOpen = false;
    }
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
      if (rollSplit.length > 1) {
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

  static get template() {
    return html`
      <style include="material-styles fa-styles">

        [hidden] {
          display: none !important;
        }

        .thumb-menu__btn {
          border-radius: 50%;
          margin-bottom: 12px;
          z-index: 1;
        }

        .roll-results__mask {
          position: fixed;
          right: 0;
          width: 100%;
          height: 100%;
          max-width: 800px;
          max-height: 236px;
        }
        .roll-results__background {
          width: 100%;
          height: 100%;
          background: linear-gradient(0deg, black, transparent);
        }

        .roll-results {
          position: absolute;
          bottom: 0;
          right: calc(100% - 20px);
          flex-direction: column;
          align-items: flex-end;
          width: 110vw;
          padding: 0 0 50px 0;
          margin-bottom: -30px;
          margin-right: -92px;
          max-height: 186px;
          overflow-y: scroll;
          display: none;
          scroll-snap-type: y mandatory;
        }
        .roll-results[open] {
          display: flex;
        }

        .roll-result {
          background: var(--mdc-theme-surface-surface);
          color: var(--mdc-theme-on-surface);
          border-radius: 6px;
          margin-top: 16px;
          display: flex;
          width: 225px;
          padding: 12px;
          position: relative;
          right: 130px;
          height: 82px;
          transition: height 0.3s, width 0.3s;
          outline: none;
          scroll-snap-align: start;
          z-index: 2;
        }
        .roll-results__clear {
          background: var(--mdc-theme-surface-surface);
          color: var(--mdc-theme-on-surface);
          border-radius: 6px;
          margin-top: 16px;
          position: relative;
          right: 130px;
          padding: 4px 12px;
          cursor: pointer;
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
        .roll-result__name:after {
          content: ':';
        }
        .roll-result__total {
          font-size: 32px;
          font-weight: bold;
          justify-content: center;
          display: flex;
          align-items: center;
          width: 64px;
          flex-shrink: 0;
          transition: width 0.3s, font-size 0.3s;
        }
        .roll-result__dice-wrap {
          display: flex;
          align-items: center;
          height: 30px;
          transition: height 0.3s;
          overflow: hidden;
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
        .roll-result__dice-results span {
          color: var(--mdc-theme-on-surface-surface);
          position: relative;
          font-size: 17px;
          bottom: 7px;
          margin-right: 4px;
        }
        .roll-result__dice-results span:after {
          display: block;
          content: '';
          position: absolute;
          left: -1px;
          bottom: 8px;
          border-bottom: 1px solid var(--mdc-theme-on-surface-surface);
          width: 100%;
          transform: rotate(-25deg);
        } 
        .roll-result__roll {
          color: var(--mdc-theme-on-surface-surface);
          font-weight: bold;
          height: 28px;
          display: flex;
          align-items: flex-end;
          transition: height 0.3s;
          overflow: hidden;
        }
        .roll-result__close {
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

        @media(min-width: 420px) {
          .roll-results__clear,
          .roll-result {
            right: 140px;
          }
          .roll-results__mask {
            -webkit-mask-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
            mask-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
          }
        }

        @media(min-width: 921px) {
          .roll-results {
            max-height: 314px;
          }
          .roll-results__mask {
            max-height: 364px;
          }
          .roll-result {
            width: min-content !important;
          }
          .thumb-menu__btn {
            margin-left: auto;
            position: relative;
            top: -10px;
          }
        }
      </style>
      <button class="thumb-menu__btn mdc-icon-button mdc-button--raised" on-click="_toggleOpen">
        <i class="fas fa-dice-d20"></i>
      </button>
      <div id="rollResults" class="roll-results" open$="[[isOpen]]">
        <template is="dom-repeat" items="[[rollResults]]">
          <div class="roll-result" little$="[[!_equals(index, focusRoll)]]" on-click="_setFocusRoll" index$="[[index]]">
            <div class="roll-result__summary">
              <div class="roll-result__title">
                <span class="roll-result__name">[[item.name]]</span>
                <span class="roll-result__type">[[item.type]]</span>
              </div>
              <div class="roll-result__dice-wrap">
                <i class$="[[_diceIconClass(item.roll)]]"></i>
                <div class="roll-result__dice-results" inner-h-t-m-l="[[item.result]]"></div>
              </div>
              <div class="roll-result__roll">[[item.roll]]</div>
            </div>
            <div class="roll-result__total">[[item.total]]</div>
            <button class="roll-result__close fal fa-times" on-click="_deleteRoll"></button>
          </div>
        </template>
        <div class="roll-results__mask">
          <div class="roll-results__background"></div>
        </div>
        <!-- <div class="roll-results__clear" on-click="_clearRolls">Clear</div> -->
      </div>
    `;
  }
}

customElements.define('dnd-roll-results', DndRollResults);