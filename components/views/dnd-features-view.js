import {PolymerElement, html} from '@polymer/polymer';
import '../styles/material-styles.js';
import '../styles/my-styles.js';
import '../dnd-selection-list';

class DndFeaturesView extends PolymerElement {
  static get template() {
    return html`
      <style include="material-styles my-styles"></style>

      <dnd-selection-list
        enable-hash-routing
        model-id="features"
        columns='[
          {"id":"name","label":"Name"},
          {"id": "feature-type", "label":"Type"},
          {"id":"prerequisite","label":"Prerequisite"},
          {"id": "source", "label":"Source"}
        ]'
      >
      </dnd-selection-list>
    `;
  }
}

customElements.define('dnd-features-view', DndFeaturesView);