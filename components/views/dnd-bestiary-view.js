import {PolymerElement, html} from '@polymer/polymer';
import "../styles/material-styles.js";
import "../styles/my-styles.js";
import "../dnd-layout";
import "../dnd-selection-list";

class DndBestiaryView extends PolymerElement {
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
        model-id="bestiary"
        columns='[
          {"id":"source","label":"Source"}, 
          {"id":"monster-type","label":"Type"},
          {"id":"cr","label":"CR"}
        ]'
      >
      </dnd-selection-list>
    `;
  }
}

customElements.define('dnd-bestiary-view', DndBestiaryView);