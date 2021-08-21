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
          {"id":"name","label":"Name"},
          {"id":"source","label":"Source"},
          {"id":"level","label":"Level"},
          {"id":"school","label":"School","cssClass":"hidden-mobile-down"},
          {"id":"range","label":"Range","cssClass":"hidden-mobile-down"},
          {"id":"time","label":"Time","cssClass":"hidden-mobile-down"},
          {"id":"classes","label":"Classes","cssClass":"hidden"},
          {"id":"subclasses","label":"Subclasses","cssClass":"hidden"},
          {"id":"spell-meta","label":"Tag","cssClass":"hidden"}
        ]'
      >
      </dnd-selection-list>
    `;
  }
}

customElements.define('dnd-spells-view', DndSpellsView);