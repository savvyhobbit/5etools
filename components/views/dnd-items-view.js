import {PolymerElement, html} from '@polymer/polymer';
import '../styles/material-styles.js';
import '../styles/my-styles.js';
import '../dnd-selection-list';

class DndItemsView extends PolymerElement {
  static get properties() {
    return {
      nonGlobal: {
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
        non-global$="[[nonGlobal]]"
        model-id="items"
        columns='[
          {"id":"item-type","label":"Type"}, 
          {"id":"source","label":"Source","hideMobile":true},
          {"id":"item-rarity","label":"Rarity","hideMobile":true}
        ]'
      >
      </dnd-selection-list>
    `;
  }
}

customElements.define('dnd-items-view', DndItemsView);