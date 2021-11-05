import {PolymerElement, html} from '@polymer/polymer';
import "./styles/material-styles.js";
import { getCharacterChannel, initSelectedCharacter, getClassString, getFeatureString, addFeatureById } from '../util/charBuilder';
import { routeEventChannel, readRouteView, readRouteSelection } from '../util/routing';
import "./dnd-character-select";
import { util_capitalize } from '../js/utils.js';

class DndCharacterPopup extends PolymerElement {
  static get properties() {
    return {
      view: {
        type: String,
        value: ''
      },
      selection: {
        type: String,
        value: ''
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

    this.viewChangeHandler = (e) => {
      if (e && e.detail) {
        this.view = e.detail.view;
      }
    };
    routeEventChannel().addEventListener("view-change", this.viewChangeHandler);
    this.view = readRouteView();

    this.selectionChangeHandler = (e) => {
      if (e && e.detail) {
        this.selection = e.detail.selection;
      }
    };
    routeEventChannel().addEventListener("selection-change", this.selectionChangeHandler);
    this.selection = readRouteSelection();

    this.deselectionHandler = () => {
      this.selection = '';
    }
    routeEventChannel().addEventListener("selection-deselected", this.deselectionHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    getCharacterChannel().removeEventListener("character-selected", this.characterChangeHandler);
    routeEventChannel().removeEventListener("view-change", this.viewChangeHandler);
    routeEventChannel().removeEventListener("selection-change", this.selectionChangeHandler);
    routeEventChannel().removeEventListener("selection-deselected", this.deselectionHandler);
  }

  classString(selectedCharacter) {
    return getClassString(selectedCharacter);
  }

  featureString(featureId, selectedCharacter) {
    return getFeatureString(featureId, selectedCharacter);
  }
  
  addFeatureToCharacter() {
    addFeatureById();
  }

  _viewString(view) {
    switch (view) {
      case "classes":
        return "Class";
      default:
        return util_capitalize(view.substring(0, view.length - 1));
    }
  }

  _charBuilderLink(view) {
    let charBuilderView;

    switch(view) {
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
        [hidden] {
          display: none !important;
        }
        .wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--mdc-theme-text-divider-on-background);
          padding: 8px;
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
          <a class="open-char-button mdc-icon-button material-icons" href="[[_charBuilderLink(view)]]">launch</a>
          <div class="char-select-wrap" smaller$="[[_exists(selection)]]">
            <dnd-character-select></dnd-character-select>
            <div class="class" hidden$="[[!_equal(view, 'classes')]]">[[classString(selectedCharacter)]]</div>
            <div class="feature" hidden$="[[_equal(view, 'classes')]]">[[featureString(view, selectedCharacter)]]</div>
          </div>
        </div>
        <div class="feature-button">
          <button class="mdc-button add-character-option" on-click="addFeatureToCharacter" hidden$="[[!_exists(selection)]]">
            <div class="mdc-button__ripple"></div>
            <i class="material-icons mdc-button__icon" aria-hidden="true">person_add</i>
            <span class="mdc-button__label">Add [[_viewString(view)]]</span>
          </button>
        </div>
      </div>
    `;
  }
  
}
customElements.define('dnd-character-popup', DndCharacterPopup);