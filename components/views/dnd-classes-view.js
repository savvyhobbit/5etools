import {PolymerElement, html} from '@polymer/polymer';
import "../styles/material-styles.js";
import "../styles/my-styles.js";
import "../dnd-layout";
import "../dnd-classes";

class DndClassesView extends PolymerElement {
  static get template() {
    return html`
      <style include="material-styles my-styles"></style>
      
      <dnd-classes></dnd-classes>
    `;
  }
}

customElements.define('dnd-classes-view', DndClassesView);