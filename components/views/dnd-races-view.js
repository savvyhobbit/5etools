import {PolymerElement, html} from '@polymer/polymer';
import '../styles/material-styles.js';
import '../styles/my-styles.js';
import '../dnd-selection-list';

class DndRacesView extends PolymerElement {
  static get template() {
    return html`
      <style include="material-styles my-styles"></style>

      <dnd-selection-list
        enable-hash-routing
        model-id="races"
        columns='[
          {"id":"name","label":"Name"},
          {"id":"ability","label":"Ability"},
          {"id":"source","label":"Source","cssClass":"hidden-mobile-down"},
          {"id":"size","label":"Size","cssClass":"hidden-mobile-down"}
        ]'
      >
      </dnd-selection-list>
    `;
  }
}

customElements.define('dnd-races-view', DndRacesView);