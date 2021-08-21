import {PolymerElement, html} from '@polymer/polymer';
import "./styles/material-styles.js";
import "./styles/my-styles.js";
import "./dnd-svg.js";
import { onLoad } from '../js/dice.js';

class DndDice extends PolymerElement {
  connectedCallback() {
    super.connectedCallback();
    onLoad(this.shadowRoot);
  }

  static get template() {
    return html`
      <style include="material-styles my-styles"></style>

      <div class="dice-wrapper">
        <div class="dice-field-container">
          <div class="mdc-text-field mdc-text-field--outlined mdc-text-field--with-leading-icon">
            <i class="material-icons mdc-text-field__icon mdc-theme--primary">casino</i>
            <input inputmode="numeric" type="tel" class="mdc-text-field__input roll-field" />
            <div class="mdc-notched-outline">
              <div class="mdc-notched-outline__leading"></div>
              <div class="mdc-notched-outline__notch">
                <label for="search-field" class="mdc-floating-label">Roll</label>
              </div>
              <div class="mdc-notched-outline__trailing"></div>
            </div>
          </div>
          <span class="dice-field-label"
            >Use period (.) or comma (,) to insert a "d".<br />Use space to insert a plus (+).</span
          >
          <button class="mdc-button mdc-button--raised roll-submit">
            <span class="mdc-button__label">Roll!</span>
          </button>
          <button class="mdc-button mdc-button--raised roll-clear" style="display: none;">
            <span class="mdc-button__label">Clear</span>
          </button>

          <div class="roll-total-wrap" style="display: none;">Total: <span id="total"></span></div>
          <div id="output"></div>
        </div>

        <div class="dice-list-container">
          <div class="dice-grid-item roll" data-roll="1d4">
            <dnd-svg id="d4" class="dice-grid-item--image"></dnd-svg>
          </div>
          <div class="dice-grid-item roll" data-roll="1d6">
            <dnd-svg id="d6" class="dice-grid-item--image"></dnd-svg>
          </div>
          <div class="dice-grid-item roll" data-roll="1d8">
            <dnd-svg id="d8" class="dice-grid-item--image"></dnd-svg>
          </div>
          <div class="dice-grid-item roll" data-roll="1d10">
            <dnd-svg id="d10" class="dice-grid-item--image"></dnd-svg>
          </div>
          <div class="dice-grid-item roll" data-roll="1d12">
            <dnd-svg id="d12" class="dice-grid-item--image"></dnd-svg>
          </div>
          <div class="dice-grid-item roll" data-roll="1d20">
            <dnd-svg id="d20" class="dice-grid-item--image"></dnd-svg>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('dnd-dice', DndDice);