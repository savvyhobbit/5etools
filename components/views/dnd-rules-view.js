import {PolymerElement, html} from '@polymer/polymer';
import '../styles/material-styles.js';
import '../styles/my-styles.js';
import '../dnd-rules';

class DndRulesView extends PolymerElement {
  static get template() {
    return html`
      <style include="material-styles my-styles"></style>

      <dnd-rules></dnd-rules>
    `;
  }
}

customElements.define('dnd-rules-view', DndRulesView);