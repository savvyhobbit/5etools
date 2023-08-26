import {PolymerElement, html} from '@polymer/polymer';
import "./styles/material-styles.js";
import "./styles/my-styles.js";
import { rollMultipleDice } from '../util/roll.js';

class DndRoller extends PolymerElement {
  
  static get properties() {
    return {
      isOpen: {
        type: Boolean,
        value: false
      },
      d4: {
        type: Number,
        value: 0
      },
      d6: {
        type: Number,
        value: 0
      },
      d8: {
        type: Number,
        value: 0
      },
      d10: {
        type: Number,
        value: 0
      },
      d12: {
        type: Number,
        value: 0
      },
      d20: {
        type: Number,
        value: 0
      },
      d100: {
        type: Number,
        value: 0
      }
    };
  }

  _increaseRoll(e) {
    const roll = e.target.closest('.roller__btn').getAttribute("roll");
    this[roll] ++;
  }

  _toggleOpen() {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.d4 = 0;
      this.d6 = 0;
      this.d8 = 0;
      this.d10 = 0;
      this.d12 = 0;
      this.d20 = 0;
      this.d100 = 0;
    }
  }

  _rollIt() {
    const rolls = [];
    if (this.d20) {
      rolls.push(`${this.d20}d20`);
    }
    if (this.d12) {
      rolls.push(`${this.d12}d12`);
    }
    if (this.d10) {
      rolls.push(`${this.d10}d10`);
    }
    if (this.d8) {
      rolls.push(`${this.d8}d8`);
    }
    if (this.d6) {
      rolls.push(`${this.d6}d6`);
    }
    if (this.d4) {
      rolls.push(`${this.d4}d4`);
    }
    if (this.d100) {
      rolls.push(`${this.d100}d100`);
    }
    if (rolls.length) {
      rollMultipleDice('Custom', rolls);
    }
    this._toggleOpen();
  }

  _equals(a, b) {
    return a === b;
  }

  static get template() {
    return html`
      <style include="fa-styles material-styles my-styles">
        :host {
          display: block;
        }
        .roller__btn {
          border-radius: 50%;
          z-index: 2;
          margin-top: 8px;
        }
        .roller__btn-count {
          position: absolute;
          background: var(--mdc-theme-surface);
          color: var(--mdc-theme-on-surface);
          font-size: 13px;
          z-index: 23;
          right: 0px;
          border-radius: 20px;
          padding: 2px 5px;
          bottom: -2px;
          font-family: sans-serif;
          box-shadow:
            0px 3px 1px -2px rgba(0, 0, 0, 0.2), 
            0px 2px 2px 0px rgba(0, 0, 0, 0.14), 
            0px 1px 5px 0px rgba(0, 0, 0, .12);
        }
        .roller__expand-btn {
          width: 48px;
          height: 48px;
          border-radius: 40px;
          overflow: hidden;
          display: flex;
          justify-content: space-between;
          z-index: 2;
          background: transparent;
          padding: 0;
          transition: width 0.3s, right 0.3s;
        }
        [open] .roller__expand-btn {
          width: 100px;
          background: var(--mdc-theme-surface-surface);
          right: -44px;
        }
        .roller__open-btn {
          margin-top: 0;
          background: var(--mdc-theme-primary);
        }
        .roller__roll-btn {
          border: none;
          padding: 0;
          margin: 0;
          background: none;
          font-size: 16px;
          flex-grow: 1;
          padding-right: 8px;
          color: var(--mdc-theme-on-surface);
          cursor: pointer;
          display: none;
        }
        [open] .roller__roll-btn {
          display: block;
        }
        .roller__container {
          display: flex;
          flex-direction: column-reverse;
          position: relative;
        }
        .roller__additional {
          display: flex;
          flex-direction: column-reverse;
          align-items: center;
          position: absolute;
          right: -90px;
          bottom: 60px;
          transition: right 0.3s;
        }
        [open] .roller__additional {
          right: 26px;
        }
        .d100 i {
          font-size: 16px;
        }
        .d100 i:first-child {
          margin-right: 3px;
        }
      </style>

      <div class="roller__container" open$="[[isOpen]]">
        <div class="roller__expand-btn mdc-button--raised ">
          <button class="roller__open-btn roller__btn mdc-icon-button material-icons" on-click="_toggleOpen">
            <i class="fa fa-dice-d20" hidden$="[[isOpen]]"></i>
            <i class="fal fa-times" hidden$="[[!isOpen]]"></i>
          </button>
          <button class="roller__roll-btn" on-click="_rollIt">Roll!</button>
        </div>

        <div class="roller__additional">
          <button class="roller__btn mdc-icon-button mdc-button--raised material-icons" roll="d20" on-click="_increaseRoll">
            <i class="fal fa-dice-d20"></i>
            <span class="roller__btn-count" hidden$="[[_equals(d20, 0)]]">[[d20]]</span>
          </button>
          <button class="roller__btn mdc-icon-button mdc-button--raised material-icons" roll="d12" on-click="_increaseRoll">
            <i class="fal fa-dice-d12"></i>
            <span class="roller__btn-count" hidden$="[[_equals(d12, 0)]]">[[d12]]</span>
          </button>
          <button class="roller__btn mdc-icon-button mdc-button--raised material-icons" roll="d10" on-click="_increaseRoll">
            <i class="fal fa-dice-d10"></i>
            <span class="roller__btn-count" hidden$="[[_equals(d10, 0)]]">[[d10]]</span>
          </button>
          <button class="roller__btn mdc-icon-button mdc-button--raised material-icons" roll="d8" on-click="_increaseRoll">
            <i class="fal fa-dice-d8"></i>
            <span class="roller__btn-count" hidden$="[[_equals(d8, 0)]]">[[d8]]</span>
          </button>
          <button class="roller__btn mdc-icon-button mdc-button--raised material-icons" roll="d6" on-click="_increaseRoll">
            <i class="fal fa-dice-d6"></i>
            <span class="roller__btn-count" hidden$="[[_equals(d6, 0)]]">[[d6]]</span>
          </button>
          <button class="roller__btn mdc-icon-button mdc-button--raised material-icons" roll="d4" on-click="_increaseRoll">
            <i class="fal fa-dice-d4"></i>
            <span class="roller__btn-count" hidden$="[[_equals(d4, 0)]]">[[d4]]</span>
          </button>
          <button class="roller__btn mdc-icon-button mdc-button--raised material-icons d100" roll="d100" on-click="_increaseRoll">
            <i class="fal fa-dice-d10"></i>
            <i class="fal fa-dice-d10"></i>
            <span class="roller__btn-count" hidden$="[[_equals(d100, 0)]]">[[d100]]</span>
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('dnd-roller', DndRoller);