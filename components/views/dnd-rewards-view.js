import {PolymerElement, html} from '@polymer/polymer';
import '../styles/material-styles.js';
import '../styles/my-styles.js';
import '../dnd-selection-list';

class DndRewardsView extends PolymerElement {
  static get template() {
    return html`
      <style include="material-styles my-styles"></style>

      <dnd-selection-list
        enable-hash-routing
        model-id="rewards"
        columns='[
          {"id":"source","label":"Source"}, 
          {"id":"reward-type","label":"Type","hideMobile":true}
        ]'
      >
      </dnd-selection-list>
    `;
  }
}

customElements.define('dnd-rewards-view', DndRewardsView);