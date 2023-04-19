import { PolymerElement, html } from '@polymer/polymer';
import { MDCRipple } from '@material/ripple';
import { } from '@polymer/polymer/lib/elements/dom-if.js';
import "./dnd-svg";

class DndButton extends PolymerElement {
  static get properties() {
    return {
      label: {
        type: String,
        value: ''
      },
      icon: {
        type: String,
        value: ''
      },
      iconOnly: {
        type: Boolean,
        computed: '_iconOnly(icon, label)',
        reflectToAttribute: true
      },
      svg: {
        type: String,
        value: ''
      },
      background: {
        type: String,
        value: ''
      },
      border: {
        type: Boolean,
        value: false
      },
      svgFill: {
        type: String,
        value: ''
      },
      svgStroke: {
        type: String,
        value: ''
      }
    }
  }

  connectedCallback() {
    setTimeout(()=> {
      this.button = new MDCRipple(this.$.button);
    }, 10)
  }

  _iconOnly(icon, label) {
    return !!icon && !label;
  }

  _exists(i) {
    return !!i;
  }

  _styleStr(background) {
    let result = '';
    if (background) {
      result+= `background: ${background}; `
    }
    return result;
  }

  _classStr(border) {
    return `mdc-button ${border ? 'mdc-button--outlined' : ''}`;
  }

  _svgStyleStr(fill, stroke) {
    let result = '';
    if (fill) {
      result+= `fill: ${fill}; `
    }
    if (stroke) {
      result+= `stroke: ${stroke}; `
    }
    return result;
  }

  static get template() {
    return html`
      <style include="material-styles">
        .mdc-tab-scroller__scroll-area--scroll {
          overflow-x: auto;
          background-color: var(--mdc-theme-surface);
          border: 1px solid var(--mdc-theme-text-divider-on-background);
          border-bottom: none;
        }
        :host {
          display: inline;
          overflow: hidden;
          white-space: nowrap;
          border-radius: 4px;
        }
        .mdc-button {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
        .mdc-button .mdc-button__icon {
          margin-right: 0px;
          margin-left: 8px;
        }
        .mdc-button [background] {
          background: var(--lumo-contrast-10pct);
        }
        dnd-svg {
          height: 20px;
          width: 20px;
          flex-shrink: 0;
          flex-grow: 0;
          padding-left: 8px;
          fill: var(--mdc-theme-primary);
          stroke: var(--mdc-theme-primary);
        }
        i {
          flex-shrink: 0;
          flex-grow: 0;
        }

        :host(.btn-field__btn) dnd-svg {
          padding-left: 0;
        }
        :host(.btn-field__btn) i {
          margin-left: 0;
        }

        :host([icon-only]) dnd-svg {
          margin-left: -24px;
          padding-left: 0;
        }
        :host([icon-only]) i {
          margin-left: 0;
          padding-left: 0;
        }
        :host(.hard-left) i {
          margin-left: -24px;
        }

        :host([link]) .mdc-button__label {
          text-transform: none;
          color: var(--lumo-body-text-color);
          letter-spacing: normal;
        }
        :host([link]) i {
          color: var(--lumo-body-text-color);
        }
        :host([link]) button:hover::before {
          background: none;
        }
        :host([link]) button:hover i,
        :host([link]) button:hover .mdc-button__label {
          color: var(--mdc-theme-secondary);
        }

        :host([edit-mode]) button {
          background-color: var(--mdc-theme-secondary);
          color: var(--mdc-theme-on-secondary)
        }
        :host([edit-mode]) .mdc-button__label {
          color: var(--mdc-theme-on-primary);
        }
        :host([edit-mode]) i {
          color: var(--mdc-theme-on-primary);
        }
        :host([edit-mode]) button:hover i,
        :host([edit-mode]) button:hover .mdc-button__label {
          color: var(--mdc-theme-on-secondary);
        }

        :host([not-edit-mode]) button {
          background-color: var(--mdc-theme-primary);
          color: var(--mdc-theme-on-primary);
        }
        :host([not-edit-mode]) .mdc-button__label {
          color: var(--mdc-theme-on-primary);
        }
        :host([not-edit-mode]) i {
          color: var(--mdc-theme-on-primary);
        }
        :host([not-edit-mode]) button:hover i,
        :host([not-edit-mode]) button:hover .mdc-button__label {
          color: var(--mdc-theme-on-primary);
        }
      </style>

      <button id="button" class$="[[_classStr(border)]]" style$="[[_styleStr(background)]]">
        <div class="mdc-button__ripple"></div>
        <span class="mdc-button__label">[[label]]</span>
        <slot name="label"></slot>
        <template is="dom-if" if="[[_exists(icon)]]">
          <i class="material-icons mdc-button__icon" aria-hidden="true">[[icon]]</i>
        </template>
        <template is="dom-if" if="[[_exists(svg)]]">
          <dnd-svg id="[[svg]]" style$="[[_svgStyleStr(svgFill, svgStroke)]]"></dnd-svg>
        </template>
      </button>
    `;
  }

}
customElements.define('dnd-button', DndButton);