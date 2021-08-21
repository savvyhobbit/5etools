import {PolymerElement, html} from '@polymer/polymer';

class DndOptionPicker extends PolymerElement {
  
  static get properties() {
    return {
      name: {
        type: String
      },
      description: {
        type: String,
      },
      options: {
        type: Array
      },
      selectionCount: {
        type: Number
      },
      selections: {
        type: Number
      }
    };
  }

  static get template() {
    return html`
      <vaadin-dialog aria-label="polymer templates">
        <template>
          
        </template>
      </vaadin-dialog>
    `;
  }
}

customElements.define('dnd-option-picker', DndOptionPicker);