import {PolymerElement, html} from '@polymer/polymer';
import '../styles/material-styles.js';
import '../styles/my-styles.js';
import '../dnd-dice';

class DndDiceView extends PolymerElement {
  static get template() {
    return html`
      <style include="material-styles my-styles"></style>

      <dnd-dice></dnd-dice>
    `;
  }
}

customElements.define('dnd-dice-view', DndDiceView);