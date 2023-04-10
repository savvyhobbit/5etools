import {PolymerElement, html} from '@polymer/polymer';
import { getCharacterChannel, initSelectedCharacter, selectCharacter } from '../util/charBuilder';
import { jqEmpty } from "../js/utils.js";
import "@vaadin/vaadin-select";

class DndCharacterSelect extends PolymerElement {
  static get properties() {
    return {
      selectedCharacter: {
        type: Object,
      },
      characterOptions: {
        type: Array
      },
      label: {
        value: String
      },
      placeholder: {
        value: String
      },
      mini: {
        type: Boolean,
        reflectToAttribute: true
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.characterChangeHandler = (e) => {
      this.selectedCharacter = JSON.parse(JSON.stringify(e.detail.character));
      this.characterOptions = e.detail.characters;
      this.$.select.value = this.selectedCharacter && this.selectedCharacter.id + "";
      this.$.select.render();
    };

    getCharacterChannel().addEventListener("character-selected", this.characterChangeHandler);
    initSelectedCharacter();

    this.$.select.addEventListener("change", () => {
      const selectedChar = this.characterOptions.find(c => c.id == this.$.select.value);
      selectCharacter(selectedChar);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    getCharacterChannel().removeEventListener("character-selected", this.characterChangeHandler);
  }

  ready() {
    super.ready();

    // Setting item renderer for vaadin-select
    setTimeout(() => {
      this.$.select.renderer = (root) => {
        if (root.firstChild) {
          let optionsCopy = JSON.parse(JSON.stringify(this.characterOptions)),
            extraOptions = [];

          // If the name of the selected character changes, update the dropdown
          Array.from(root.firstChild.children).forEach((e) => {
            const elementId = e.getAttribute("value");

            if (e.getAttribute("selected") !== null && elementId == this.selectedCharacter.id) {
              e.textContent = this.selectedCharacter.name;
            }
            // Finding any missing or extra options
            let foundOption = optionsCopy.find((c) => {return c.id == elementId});
            if (foundOption) {
              foundOption.isOption = true;
            } else {
              extraOptions.push(e)
            }
          });
          // removing any extra options
          for (let extraOption of extraOptions) {
            extraOption.remove();
          }
          // inserting any missing options
          const missingOptions = optionsCopy.filter((c) => {return !c.isOption});
          if (missingOptions.length) {
            for (let i = 0; i < missingOptions.length; i ++) {
              let char = missingOptions[i];
              const item = this.__generateOptionForCharacter(char, optionsCopy.length - 1 + i);
              root.firstChild.appendChild(item);
            }
          }
        } else {
          const listBox = document.createElement('vaadin-list-box');

          for (let i = 0; i < this.characterOptions.length; i ++) {
            let char = this.characterOptions[i];
            const item = this.__generateOptionForCharacter(char, i);
            listBox.appendChild(item);
          }

          // update the content
          jqEmpty(root);
          root.appendChild(listBox);
        }
      };
    }, 0);
  }

  __generateOptionForCharacter(char) {
    const item = document.createElement('vaadin-item');
    item.textContent = char.name;
    item.setAttribute("value", char.id);
    return item;
  }
  
  static get template() {
    return html`
      <style>
        :host {
          display: inline-block;
        }
        :host(:not([mini])) vaadin-select {
          width: 100%;
        }
      </style>
      <vaadin-select mini$="[[mini]]" label="[[label]]" id="select"></vaadin-select>
    `;
  }
}
customElements.define('dnd-character-select', DndCharacterSelect);