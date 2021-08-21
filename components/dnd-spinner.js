import {PolymerElement, html} from '@polymer/polymer';
import "./styles/material-styles.js";
import "./styles/my-styles.js";

class DndSpinner extends PolymerElement {
  
  static get properties() {
    return {
      loading: {
        type: Boolean,
        reflectToAttribute: true,
        value: false
      }
    };
  }

  static get template() {
    return html`
      <style include="material-styles my-styles"></style>
      <div class="spinner" hidden$="[[!loading]]"></div>
    `;
  }
}

customElements.define('dnd-spinner', DndSpinner);