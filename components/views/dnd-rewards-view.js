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
          {"id":"name","label":"Name"},
          {"id":"source","label":"Source"}, 
          {"id":"reward-type","label":"Type","cssClass":"hidden-mobile-down"}
        ]'
      >
      </dnd-selection-list>
    `;
  }
}

customElements.define('dnd-rewards-view', DndRewardsView);