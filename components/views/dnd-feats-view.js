import {PolymerElement, html} from '@polymer/polymer';
import '../styles/material-styles.js';
import '../styles/my-styles.js';
import '../dnd-selection-list';

class DndFeatsView extends PolymerElement {
  static get template() {
    return html`
      <style include="material-styles my-styles"></style>

        <dnd-selection-list
          enable-hash-routing
          model-id="feats"
          columns='[
            {"id":"source","label":"Source"}, 
            {"id":"ability","label":"Ability"},
            {"id":"prerequisite","label":"Prerequisite","hideMobile":true}
          ]'
        >
        </dnd-selection-list>
    `;
  }
}

customElements.define('dnd-feats-view', DndFeatsView);