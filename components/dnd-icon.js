import { PolymerElement, html } from '@polymer/polymer';
import "./styles/material-styles.js";
import "./styles/my-styles.js";

class DndIcon extends PolymerElement {
  static get properties() {
    return {
      icon: {
        type: String,
        value: ''
      },
      type: {
        type: String,
        value: ''
      },
      tiny: {
        type: String,
        value: '',
      },
      tinyType: {
        type: String,
        value: '',
      }
    }
  }

  _classString(icon, type) {
    const typeClass = type === 'material' ? 'material-icons' : type || 'fa';
    const iconClass = type === 'material' ? '' : `fa-${icon}`
    return `icon ${typeClass} ${iconClass}`;
  }
  _tinyClassString(icon, type) {
    const typeClass = type === 'material' ? 'material-icons' : type || 'fa';
    const iconClass = type === 'material' ? '' : `fa-${icon}`
    return `icon--tiny ${typeClass} ${iconClass}`;
  }

  _iconContent(icon, type) {
    return type === 'material' ? icon : '';
  }

  static get template() {
    return html`
      <style include="fa-styles material-styles">
        :host {
          display: flex;
        }
        :host([tiny]) {
          position: relative;
        }
        :host([tiny]) .icon {
          font-size: 20px;
        }
        .icon--tiny {
          position: absolute;
          font-size: 12px;
          top: -2px;
          right: -6px;
        }
      </style>
      <i class$="[[_tinyClassString(tiny, tinyType)]]">[[_iconContent(tiny, tinyType)]]</i>
      <i class$="[[_classString(icon, type)]]">[[_iconContent(icon, type)]]</i>
    `;
  }

}
customElements.define('dnd-icon', DndIcon);
