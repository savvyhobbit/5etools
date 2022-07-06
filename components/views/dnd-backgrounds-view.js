import {PolymerElement, html} from '@polymer/polymer';
import "../styles/material-styles.js";
import "../styles/my-styles.js";
import '../dnd-selection-list';

class DndBackgroundsView extends PolymerElement {
  static get template() {
    return html`
      <style include="material-styles my-styles"></style>

      <dnd-selection-list
        enable-hash-routing
        model-id="backgrounds"
        columns='[
          {"id":"source","label":"Source","hideMobile":true},
          {"id":"proficiencies","label":"Proficiencies"}
        ]'
      >
      </dnd-selection-list>
    `;
  }
}

customElements.define('dnd-backgrounds-view', DndBackgroundsView);