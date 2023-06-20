import {PolymerElement, html} from '@polymer/polymer';
import "./styles/material-styles.js";
import "./styles/my-styles.js";
import { rollEventChannel } from '../util/roll.js';

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
      }, 0);
    };
    rollEventChannel().addEventListener('new-roll', this.rollHandler);

    this.$.rollResults.addEventListener('click', (e) => {
      if (!e.target.closest('.roll-result')) {
        this.isOpen = false;
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    rollEventChannel().removeEventListener('new-roll', this.rollHandler);
  }

  _setFocusRoll(e) {
    const index = parseInt(e.target.closest('.roll-result').getAttribute('index'));
    this.focusRoll = index;
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

        .roll-results {
          position: absolute;
          bottom: 0;
          right: calc(100% - 20px);
          flex-direction: column;
          align-items: flex-end;
          background: linear-gradient(0deg, black, transparent);
          width: 110vw;
          padding: 0 0 50px 0;
          margin-bottom: -30px;
          margin-right: -92px;
          /* pointer-events: none; */
          max-height: 314px;
          overflow-y: scroll;
          display: none;
        }
        .roll-results:before {
          display: block;
          content: '';
          mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
          width: 225px;
          height: 50px;
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
          pointer-events: all;
          height: 82px;
          transition: height 0.3s, width 0.3s;
          outline: none;
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

        .roll-result[little] {
          width: 175px;
          height: 24px;
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

        @media(min-width: 420px) {
          .roll-results__clear,
          .roll-result {
            right: 140px;
          }
        }

        @media(min-width: 921px) {
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
          </div>
        </template>
        <!-- <div class="roll-results__clear" on-click="_clearRolls">Clear</div> -->
      </div>
    `;
  }
}

customElements.define('dnd-roll-results', DndRollResults);