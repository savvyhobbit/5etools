import {PolymerElement, html} from '@polymer/polymer';
import '../styles/material-styles.js';
import '../styles/my-styles.js';
import '../dnd-selection-list';

class DndItemsView extends PolymerElement {
  static get template() {
    return html`
      <style include="material-styles my-styles"></style>

      <dnd-selection-list
        enable-hash-routing
        model-id="items"
        columns='[
          {"id":"name","label":"Name"},
          {"id":"item-type","label":"Type"}, 
          {"id":"source","label":"Source","cssClass":"hidden-mobile-down"},
          {"id":"item-rarity","label":"Rarity","cssClass":"hidden-mobile-down"}
        ]'
      >
      </dnd-selection-list>
    `;
  }
}

customElements.define('dnd-items-view', DndItemsView);