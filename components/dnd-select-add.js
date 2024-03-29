import { PolymerElement, html } from '@polymer/polymer';
import { mergeFeature } from '../util/charBuilder';
import { jqEmpty, util_capitalizeAll } from "../js/utils";
import "@vaadin/vaadin-select";
import {loadModel} from "../util/data";

class DndSelectAdd extends PolymerElement {
  static get properties() {
    return {
      options: {
        type: Array
      },
      model: {
        type: String
      },
      addCallback: {
        type: Function
      },
      value: {
        type: String,
        value: "",
        observer: "valueUpdated"
      },
      choices: {
        type: Number,
        observer: "choicesUpdated"
      },
      paren: {
        type: String,
      },
      label: {
        type: String
      },
      placeholder: {
        type: String,
      },
      multiValue: {
        type: String,
        value: ""
      },
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      theme: {
        reflectToAttribute: true,
        type: String,
        value: ""
      }
    }
  }

  choicesUpdated() {
    if (this.listBox) {
      this.listBox.remove();
      delete this.listBox;
    }
    this.$.select.requestContentUpdate();
  }

  valueUpdated() {
    if (this.choices) {
      if (Array.isArray(this.value) && this.options) {
        const choiceArray = this.value
          .map(v => {
            if (this.options.indexOf(v) !== -1) {
              return this.options.indexOf(v);
            } else {
              return this.options.findIndex((o) => {
                return o.name === v.name && o.source === v.source;
              });
            }
          })
          .filter(v => { return v !== -1 });

        if (this.listBox) {
          this.listBox.selectedValues = choiceArray;
        }
        this.multiValue = choiceArray.map(i => {
          let value = this.options[i];
          return value.name ? value.name : util_capitalizeAll(value) 
        }).join(", ");
      } else {
        if (this.listBox) {
          this.listBox.selectedValues = [];
        }
        this.multiValue = "";
      }
    } else {
      if (this.value && this.options) {
        if (this.value.source) {
          this.$.select.value = this.options.findIndex(i => { return i.name === this.value.name && i.source === this.value.source || i === this.value.name }) + "";
        } else if (this.value.name) {
          this.$.select.value = this.options.findIndex(i => { return i.name === this.value.name || i === this.value.name }) + "";
        } else {
          this.$.select.value = this.options.findIndex(i => { return i.name === this.value || i === this.value }) + "";
        }
      } else {
        this.$.select.value = "";
      }
    }
  }

  ready() {
    super.ready();

    setTimeout(async () => {
      if (this.model) {
        this.options = await loadModel(this.model);
      }

      const contentEl = this.$.select._overlayElement.shadowRoot.querySelector('#content');
      let scrollHeight = 0;
      
      contentEl.addEventListener('scroll', (e) => {
        scrollHeight = contentEl.scrollTop;
      }, { passive: true });

      this.$.select.renderer = (root, select) => {
        if (!this.listBox) {
          this.listBox = document.createElement('vaadin-list-box');

          // setting up for multi-select
          if (this.choices) {
            this.listBox.setAttribute("multiple", true);

            this.listBox.addEventListener("click", (e) => {
              select.opened = true;
              let wasPreviouslySelected = e.srcElement.getAttribute("selected") !== null
              contentEl.scroll(0, scrollHeight);
              setTimeout(() => {
                if (this.listBox.selectedValues.length > this.choices
                    && !wasPreviouslySelected) {
                  this.listBox.selectedValues.splice(this.listBox.selectedValues.length - 2, 1)
                }
                let selectedOptions = this.listBox.selectedValues.map(v => { return this.options[v] });
                this.multiValue = selectedOptions.map(o => { return o.name ? o.name : util_capitalizeAll(o) }).join(', ');
                if (this.addCallback) {
                  this.addCallback(selectedOptions);
                }
              }, 0);
            });

          }

          // Adding options
          if (this.options && this.options.length) {
            for (let i = 0; i < this.options.length; i ++) {
              const option = this.options[i],
                item = document.createElement('vaadin-item');
              const optionName = option.name || util_capitalizeAll(option);
              item.style.setProperty("--lumo-primary-text-color", "var(--mdc-theme-secondary)");
              item.style.setProperty("--lumo-primary-color-10pct", "var(--mdc-theme-secondary-10pct)");
              // item.style.setProperty("--lumo-primary-color-50pct", "var(--mdc-theme-primary-50pct)");
              item.innerHTML = `<span class="select-add__item-name" style='margin-left: 10px'>${optionName}</span>`;
              if (option.source) {
                item.innerHTML += ` <span class="select-add__item-src" style='font-size: 14px;color: var(--lumo-primary-color-50pct);'>${option.source || ''}</span>`
              }
              item.setAttribute("value", i);
              this.listBox.appendChild(item);
            }
          }
          root.appendChild(this.listBox);
          this.$.select._assignMenuElement();

          this.valueUpdated();
        }
      };
    }, 0);
  }

  connectedCallback() {
    super.connectedCallback();

    this.selectChangeHandler = () => {
      const val = this.$.select.value;
      if (val) {
        if (!this.choices) {
          const selected = this.options[val];
          if (this.addCallback) {
            this.addCallback(selected, this.model);
          } else {
            mergeFeature(undefined, selected, this.model);
          }
          if (!this.value) {
            this.$.select.value = "";
          }
        }
      }
    };

    this.$.select.addEventListener("change", this.selectChangeHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.$.select.removeEventListener("change", this.selectChangeHandler);
  }

  _exists(a) {
    return !!a;
  }

  _label(label, choices, paren) {
    let result = '';
    if (label) {
      result = label;
      if (choices && choices !== 1 && choices !== 100) {
        result += ` (pick ${choices})`;
      }
      if (paren) {
        result += ` (${paren})`;
      }
    }
    return result;
  }

  _theme(theme) {
    return `dark add ${theme}`;
  }
  
  static get template() {
    return html`
      <style>
        :host {
          display: inline-block;
        }
        [slot="prefix"] {
          width: calc(100% - 46px);
          padding: 12px;
          line-height: 1.4;
        }
        vaadin-select {
          width: 100%;
          --lumo-primary-text-color: var(--mdc-theme-primary);
        }
        vaadin-item[selected] {

        }
        .prefix {
          white-space: normal;
          color: var(--mdc-theme-primary);
        }
        .select-add__item-name {
          color: var(--mdc-theme-primary);
        }
      </style>
      <vaadin-select id="select" add theme$="[[_theme(theme)]]" label="[[_label(label, choices, paren)]]" placeholder="[[placeholder]]" disabled$="[[disabled]]">
        <div hidden$="[[!_exists(multiValue)]]" slot="prefix">
          <span class="prefix">[[multiValue]]</span>
        </div>
      </vaadin-select>
    `;
  }
}
customElements.define('dnd-select-add', DndSelectAdd);