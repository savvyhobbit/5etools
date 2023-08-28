import {PolymerElement, html} from '@polymer/polymer';
import '../styles/material-styles.js';
import '../styles/my-styles.js';
import '../styles/fa-styles.js';

class DndIndexView extends PolymerElement {
  static get template() {
    return html`
      <style include="material-styles my-styles fa-styles"></style>

      <h1 class="mdc-typography--headline2 margin-bottom_large margin-top_large typography_mono">5e Tools</h1>

      <div class="grid-container">
        <a class="grid-item" href="#/character-builder">
          <i class="fas fa-wrench mdc-theme--on-surface link-grid-item--image" aria-hidden="true"></i>
          <span class="grid-item--text">Character<br/>Sheets</span>
        </a>
      </div>
      
      <h2 class="mdc-typography--headline5 margin-bottom_small margin-top_med">Character Options</h2>
      <div class="grid-container">
        <a class="grid-item" href="#/classes">
          <i class="fas fa-award mdc-theme--on-surface link-grid-item--image" aria-hidden="true"></i>
          <span class="grid-item--text">Classes</span>
        </a>
        <a class="grid-item" href="#/spells">
          <i class="fas fa-book-spells mdc-theme--on-surface link-grid-item--image" aria-hidden="true"></i>
          <span class="grid-item--text">Spells</span>
        </a>
        <a class="grid-item" href="#/races">
          <i class="fas fa-users mdc-theme--on-surface link-grid-item--image" aria-hidden="true"></i>
          <span class="grid-item--text">Races</span>
        </a>
        <a class="grid-item" href="#/backgrounds">
          <i class="fas fa-globe-americas mdc-theme--on-surface link-grid-item--image" aria-hidden="true"></i>
          <span class="grid-item--text">Backgrounds</span>
        </a>
        <a class="grid-item" href="#/feats">
          <i class="fas fa-fist-raised mdc-theme--on-surface link-grid-item--image" aria-hidden="true"></i>
          <span class="grid-item--text">Feats</span>
        </a>
      </div>

      <h2 class="mdc-typography--headline5 margin-bottom_small margin-top_med">References</h2>
      <div class="grid-container">
        <a class="grid-item" href="#/items">
          <i class="fas fa-treasure-chest mdc-theme--on-surface link-grid-item--image" aria-hidden="true"></i>
          <span class="grid-item--text">Items</span>
        </a>
        <a class="grid-item" href="#/bestiary">
          <i class="fas fa-dragon mdc-theme--on-surface link-grid-item--image" aria-hidden="true"></i>
          <span class="grid-item--text">Bestiary</span>
        </a>
        <a class="grid-item" href="#/features">
          <i class="fas fa-cogs mdc-theme--on-surface link-grid-item--image" aria-hidden="true"></i>
          <span class="grid-item--text">Class<br/>Features</span>
        </a>
        <a class="grid-item" href="#/conditions">
          <i class="fas fa-skull-crossbones mdc-theme--on-surface link-grid-item--image" aria-hidden="true"
            ></i
          >
          <span class="grid-item--text">Conditions</span>
        </a>
        <!-- <a class="grid-item" href="#/rewards">
          <i class="material-icons mdc-theme--on-surface link-grid-item--image" aria-hidden="true">toll</i>
          <span class="grid-item--text">Other Rewards</span>
        </a> -->
        <!-- <a class="grid-item" href="#/psionics">
          <i class="material-icons mdc-theme--on-surface link-grid-item--image" aria-hidden="true"
            >record_voice_over</i
          >
          <span class="grid-item--text">Psionics</span>
        </a>
        <a class="grid-item" href="#/cults">
          <i class="material-icons mdc-theme--on-surface link-grid-item--image" aria-hidden="true">group</i>
          <span class="grid-item--text">Cults</span>
        </a> -->
      </div>

      <h2 class="mdc-typography--headline5 margin-bottom_small margin-top_med">Rules</h2>
      <div class="grid-container">
        <a class="grid-item" href="#/rules">
          <i class="fas fa-book mdc-theme--on-surface link-grid-item--image" aria-hidden="true"></i>
          <span class="grid-item--text">Players Handbook</span>
        </a>
        <a class="grid-item" href="#/variantrules">
          <i class="fas fa-file-alt mdc-theme--on-surface link-grid-item--image" aria-hidden="true"></i>
          <span class="grid-item--text">Variant Rules</span>
        </a>
      </div>
    `;
  }
}

customElements.define('dnd-index-view', DndIndexView);