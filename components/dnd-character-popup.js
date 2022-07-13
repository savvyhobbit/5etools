import {PolymerElement, html} from '@polymer/polymer';
import "./styles/material-styles.js";
import { getCharacterChannel, initSelectedCharacter, getClassString, getFeatureString, addFeatureById } from '../util/charBuilder';
import { routeEventChannel, readRouteView, readRouteSelection } from '../util/routing';
import "./dnd-character-select";
import { util_capitalize } from '../js/utils.js';

class DndCharacterPopup extends PolymerElement {
  static get properties() {
    return {
      viewId: {
        type: String,
        value: ''
      },
      selectedItem: {
        type: Object
      },
      selectedCharacter: {
        type: Object,
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.characterChangeHandler = (e) => {
      this.selectedCharacter = JSON.parse(JSON.stringify(e.detail.character));
    };

    getCharacterChannel().addEventListener("character-selected", this.characterChangeHandler);
    initSelectedCharacter();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    getCharacterChannel().removeEventListener("character-selected", this.characterChangeHandler);
  }

  classString(selectedCharacter) {
    return getClassString(selectedCharacter);
  }

  featureString(featureId, selectedCharacter) {
    return getFeatureString(featureId, selectedCharacter);
  }
  
  addFeatureToCharacter() {
    console.error('addFeatureToCharacter');
    addFeatureById(this.viewId, undefined, undefined, this.selectedItem);
  }

  _viewIdString(viewId) {
    switch (viewId) {
      case "classes":
        return "Class";
      default:
        return util_capitalize(viewId.substring(0, viewId.length - 1));
    }
  }

  _charBuilderLink(viewId) {
    let charBuilderView;

    switch(viewId) {
      case 'items':
        charBuilderView = 'equipment';
        break;

      case 'backgrounds':
      case 'races':
        charBuilderView = 'background-race';
        break;

      case 'feats':
        charBuilderView = 'class';
        break;

    }

    return charBuilderView ? `#/character-builder/${charBuilderView}` : '#/character-builder'
  }

  _exists(a) {
    return !!a;
  }

  _equal(a, b) {
    return a === b;
  }
  
  static get template() {
    return html`
      <style include="material-styles"></style>
      <style>
        :host {
          position: fixed;
          width: 100%;
          bottom: 0;
          background: var(--mdc-theme-surface);
          right: 0;
          z-index: 2;
        }
        :host([small]) {
          position: static;
        }
        :host([small]) .open-char-button {
          display: none;
        }
        [hidden] {
          display: none !important;
        }
        .wrapper {
          display: flex;
          align-items: center;
          border-top: 1px solid var(--mdc-theme-text-divider-on-background);
          padding: 8px;
        }
        :host([small]) .wrapper {
          border-top: none;
        }
        .left-wrap {
          display: flex;
          align-items: center;
        }
        .open-char-button {
          margin-right: 10px;
        }
        dnd-character-select {
          width: 100%;
        }
        .char-select-wrap {
          display: flex;
          flex-direction: column;
        }
        .char-select-wrap[smaller] {
          width: 140px;
        }

        .feature-button {
          display: flex;
          align-items: center;
        }
        .class,
        .feature {
          font-size: 11px;
          font-style: italic;
          margin-left: 8px;
        }
        .add-character-option {
          border-radius: 50%;
          margin-left: 10px;
          flex-grow: 0;
          flex-shrink: 0;
        }

        @media(min-width: 420px) {
          .char-select-wrap[smaller] {
            width: auto;
          }
        }
        @media(min-width: 1321px) {
          :host {
            width: calc(100% - 256px);
          }
        }
      </style>

      <div class="wrapper">
        <div class="left-wrap">
          <a class="open-char-button mdc-icon-button material-icons" href="[[_charBuilderLink(viewId)]]">launch</a>
          <div class="char-select-wrap" smaller$="[[_exists(selectedItem)]]">
            <dnd-character-select></dnd-character-select>
            <div class="class" hidden$="[[!_equal(viewId, 'classes')]]">[[classString(selectedCharacter)]]</div>
            <div class="feature" hidden$="[[_equal(viewId, 'classes')]]">[[featureString(viewId, selectedCharacter)]]</div>
          </div>
        </div>
        <div class="feature-button">
          <button class="mdc-icon-button material-icons mdc-button--raised add-character-option" on-click="addFeatureToCharacter" hidden$="[[!_exists(selectedItem)]]">person_add</button>
        </div>
      </div>
    `;
  }
  
}
customElements.define('dnd-character-popup', DndCharacterPopup);