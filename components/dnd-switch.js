import { PolymerElement, html } from "@polymer/polymer";
import { MDCSwitch } from "@material/switch";

class DndSwitch extends PolymerElement {
  
  static get properties() {
    return {
      initialValue: {
        type: Boolean,
        value: false,
        observer: 'initValueChange'
      },
      checked: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      label: {
        type: String,
        value: ''
      },
      secondaryLabel: {
        type: String,
        value: ''
      },
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      }
    };
  }

  initValueChange() {
    if (this.switchEl) {
      this.switchEl.checked = this.initialValue;
      this.checked = this.initialValue;
    }
  }

  ready() {
    super.ready(); 

    setTimeout(() => {
      this.switchEl = new MDCSwitch(this.shadowRoot.querySelector(".mdc-switch"));
  
      this.switchEl.checked = this.initialValue;
      this.checked = this.initialValue;
    }, 10);
  }

  connectedCallback() {
    super.connectedCallback();

    this.switchEventHandler = () => {
      this.checked = this.switchEl.checked;
      this.dispatchEvent(new CustomEvent("switch-change", {
        detail: {
          checked: this.switchEl.checked
        },
        bubbles: true,
        composed: true
      }));
    };
    this.shadowRoot.querySelector(".mdc-switch__native-control").addEventListener("change", this.switchEventHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.shadowRoot.querySelector(".mdc-switch__native-control").removeEventListener("change", this.switchEventHandler);
  }

  _switchClasses(disabled) {
    return disabled ? "mdc-switch mdc-list-item__meta mdc-switch--disabled" : "mdc-switch mdc-list-item__meta";
  }

  static get template() {
    return html`
      <style include="material-styles">
        :host {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        :host([checked]) label.secondary {
          color: var(--mdc-theme-primary);
        }
        :host([checked]) label:not(.secondary) {
          color: var(--lumo-secondary-text-color);
        }
        label {
          color: var(--mdc-theme-primary);
          font-weight: 500;
          font-size: var(--lumo-font-size-s);
          margin-right: 16px;
          transition: color 0.2s;
        }
        label.secondary {
          color: var(--lumo-secondary-text-color);
          margin-right: 0;
          margin-left: 16px;
        }
        :host([extra-padding]) label.secondary {
          margin-left: 50px;
        }
        :host([no-color]) .mdc-switch.mdc-switch--checked .mdc-switch__track {
          background-color: #000;
          border-color: #000;
        }
        :host([no-color]) .mdc-switch.mdc-switch--checked .mdc-switch__thumb {
          background-color: #fff;
          border-color: #fff;
        }
        :host([no-color]) .mdc-switch.mdc-switch--checked .mdc-switch__thumb-underlay::before {
          background-color: #9e9e9e;
        }
        :host([no-color]) .mdc-switch.mdc-switch--checked .mdc-switch__thumb-underlay::after {
          background-color: #9e9e9e;
        }
      </style>
      
      <label for="switch">[[label]]<slot name="label"></slot></label>
      <div class$="[[_switchClasses(disabled)]]">
        <div class="mdc-switch__track"></div>
        <div class="mdc-switch__thumb-underlay">
          <div class="mdc-switch__thumb">
            <input type="checkbox" id="switch" class="mdc-switch__native-control" role="switch" disabled$="[[disabled]]" />
          </div>
        </div>
      </div>
      <label class="secondary">[[secondaryLabel]]<slot name="secondaryLabel"></slot></label>
    `;
  }
}

customElements.define("dnd-switch", DndSwitch);