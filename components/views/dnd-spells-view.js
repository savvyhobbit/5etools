import {PolymerElement, html} from '@polymer/polymer';
import '../styles/material-styles.js';
import '../styles/my-styles.js';
import '../dnd-selection-list';

class DndSpellsView extends PolymerElement {
  static get template() {
    return html`
      <style include="material-styles my-styles"></style>

      <dnd-selection-list
        enable-hash-routing
        model-id="spells"
        columns='[
          {"id":"level","label":"Level"},
          {"id":"time","label":"Time","hideMobile":true},
          {"id":"spell-meta","label":"Tag","cssClass":"hidden"},
          {"id":"source","label":"Source"},
          {"id":"range","label":"Range","hideMobile":true},
          {"id":"school","label":"School","hideMobile":true},
          {"id":"classes","label":"Classes","cssClass":"hidden"},
          {"id":"subclasses","label":"Subclasses","cssClass":"hidden"}
        ]'
      >
      </dnd-selection-list>
    `;
  }
}

customElements.define('dnd-spells-view', DndSpellsView);