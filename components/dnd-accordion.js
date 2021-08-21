import { PolymerElement, html } from '@polymer/polymer';
import {initCollapseToggles} from '../js/utils.js';

class DndAccordion extends PolymerElement {
  static get properties() {
    return {
    }
  }

  connectedCallback() {
    setTimeout(() => {
      if (!this.hasInit) {
        this.hasInit = true;
        initCollapseToggles(this.shadowRoot);
      }
    }, 1);
  }

  static get template() {
    return html`
      <style include="material-styles my-styles">
        :host() {
          display: block;
        }
        :host {
          display: block;
        }
      </style>
      
      <div class="collapse collapse--left-arrow">
        <div class="collapse-toggle">
          <div class="mdc-list-item mdc-theme--on-surface"> 
            <slot name="header"></slot>
          </div>
        </div>
        <div class="collapse-wrapper">
          <div class="collapse-list">
            <slot name="body"></slot>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('dnd-accordion', DndAccordion);