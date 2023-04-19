import { PolymerElement, html } from '@polymer/polymer';

class DndIcon extends PolymerElement {
  static get properties() {
    return {
      icon: {
        type: String,
        value: ''
      },
      faType: {
        type: String,
        value: ''
      }
    }
  }

  _classString(icon, faType) {
    return `${faType || 'fa'} fa-${icon}`;
  }

  static get template() {
    return html`
      <style include="fa-styles"></style>
      <i class$="[[_classString(icon, faType)]]"></i>
    `;
  }

}
customElements.define('dnd-icon', DndIcon);
