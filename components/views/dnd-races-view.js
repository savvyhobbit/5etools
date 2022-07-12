import {PolymerElement, html} from '@polymer/polymer';
import '../styles/material-styles.js';
import '../styles/my-styles.js';
import '../dnd-selection-list';

class DndRacesView extends PolymerElement {
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
        model-id="races"
        columns='[
          {"id":"ability","label":"Ability"},
          {"id":"source","label":"Source","hideMobile":true},
          {"id":"size","label":"Size","hideMobile":true}
        ]'
      >
      </dnd-selection-list>
    `;
  }
}

customElements.define('dnd-races-view', DndRacesView);