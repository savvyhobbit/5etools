import {PolymerElement, html} from '@polymer/polymer';
import '../styles/material-styles.js';
import '../styles/my-styles.js';
import '../dnd-selection-list';

class DndVariantrulesView extends PolymerElement {
  static get properties() {
    return {
      inSidebar: {
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
        in-sidebar$="[[inSidebar]]"
        model-id="variantrules"
        columns='[
          {"id":"source","label":"Source"},
          {"id":"rules-search","label":"Rules","cssClass":"hidden"}
        ]'
      >
      </dnd-selection-list>
    `;
  }
}

customElements.define('dnd-variantrules-view', DndVariantrulesView);