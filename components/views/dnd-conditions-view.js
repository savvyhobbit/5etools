import {PolymerElement, html} from '@polymer/polymer';
import "../styles/material-styles.js";
import "../styles/my-styles.js";
import "../dnd-layout";
import "../dnd-selection-list";

class DndConditionsView extends PolymerElement {
  static get properties() {
    return {
      nonGlobal: {
        type: Boolean,
        reflectToAttribute: true,
        value: false
      },
    }
  }

  static get template() {
    return html`
      <style include="material-styles my-styles"></style>
      
      <dnd-selection-list
        enable-hash-routing
        non-global$="[[nonGlobal]]"
        model-id="conditions"
        columns='[]'
      >
      </dnd-selection-list>
    `;
  }
}

customElements.define('dnd-conditions-view', DndConditionsView);