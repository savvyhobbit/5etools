import {PolymerElement, html} from '@polymer/polymer';
import "./styles/material-styles.js";
import "./styles/my-styles.js";
import './dnd-svg.js';
import { loadModel } from '../util/data.js';
import { resolveHash } from '../util/renderTable.js';
import { onDataLoad, onClassChange, onSubChange } from "../js/classes.js";
import { readRouteSelection, routeEventChannel, clearRouteSelection } from '../util/routing.js';
import { scrollToTop } from '../util/animateScroll.js';
import { jqOffset, jqHeight } from '../js/utils.js';


class DndClasses extends PolymerElement {
  static get properties() {
    return {
      classes: {
        type: Object,
        observer: "_dataLoaded"
      },
      hash: {
        type: String,
        value: ''
      },
      itemOpened: {
        value: false
      },
      loading: {
        type: Boolean,
        value: true,
        observer: '_loadingChange'
      }
    };
  }

  static get observers() {
    return ["_updateClassFromHash(classes, hash)"]
  }

  constructor() {
    super();
    this.loading = true;
    loadModel("class-all").then(data => {
      this.set("classes", data);
      this.loading = false;
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this.populateHandlers();

    routeEventChannel().addEventListener("selection-change", this.selectionChangeEventHandler);
    routeEventChannel().addEventListener("selection-deselected", this.deselectionChangeEventHandler);
    this.$.backToTop.addEventListener("click", this.backToTopEventHandler);
    window.addEventListener("scroll", this.subclassScrollRepositionHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.deselectionChangeEventHandler();
    routeEventChannel().removeEventListener("selection-change", this.selectionChangeEventHandler);
    routeEventChannel().removeEventListener("selection-deselected", this.deselectionChangeEventHandler);
    this.$.backToTop.removeEventListener("click", this.backToTopEventHandler);
    window.removeEventListener("scroll", this.subclassScrollRepositionHandler, {passive: true});
  }

  populateHandlers() {
    this.selectionChangeEventHandler = (e) => {
      let selection = e ? e.detail.selection : readRouteSelection();
      if (selection) {
        this.set("hash", selection);
      }
    };
    this.selectionChangeEventHandler();
    this.deselectionChangeEventHandler = () => {
      this.set("hash", "");
    }

    this.backToTopEventHandler = () => {
      scrollToTop(400);
    };
    this.subclassScrollRepositionHandler = () => {
      if (window.scrollY > 850) {
        this.$.backToTop.classList.remove("hidden");
      } else {
        this.$.backToTop.classList.add("hidden");
      }
      // setSubclassFixation
      const subclassEl = this.shadowRoot.querySelector("#subclasses"),
        subclassOffsetEl = this.shadowRoot.querySelector("#subclassHeight");

      // Stores non-closed height
      if (!subclassEl.classList.contains("closed") || !subclassEl.classList.contains("fixed")) {
        this.subclassOffsetHeight = jqHeight(subclassEl) + 55 + "px";
      }

      // When we scroll past the subclasses, sets fixed. otherwise removes it.
      if (jqOffset(subclassOffsetEl).top - document.body.scrollTop < 64) {
        if (!subclassEl.classList.contains("fixed")) {
          subclassEl.classList.add("fixed");
          subclassOffsetEl.style.height = this.subclassOffsetHeight;
        }
      } else {
        subclassEl.classList.remove("fixed");
        subclassOffsetEl.style.height = "0";
      }
    };
  }

  _loadingChange() {
    this.dispatchEvent(new CustomEvent("loading-data", {
      bubbles: true,
      composed: true,
      detail: {
        loading: this.loading
      }
    }));
  }

  _dataLoaded() {
    onDataLoad(this.classes, this.shadowRoot);
  }

  _updateClassFromHash() {
    if (this.classes && this.hash) {
      let selectedClass, selectedSubclass;

      if (this.hash.indexOf(',') > -1) {
        let hashParts = this.hash.split(',');
        selectedClass = resolveHash(this.classes, hashParts[0]);
        selectedSubclass = hashParts.slice(1);
      } else {
        selectedClass = resolveHash(this.classes, this.hash);
      }

      if (selectedClass) {
        this.itemOpened = true;

        let isNewClass = selectedClass !== this.prevClass;
        this.prevClass = selectedClass;

        // Only reload the Class
        if (isNewClass) {
          window.scrollTo(0,0);
          onClassChange(selectedClass, this.shadowRoot);
        }
        if (selectedSubclass) {
          onSubChange(selectedSubclass, this.hash, this.shadowRoot);
        }
        routeEventChannel().dispatchEvent(new CustomEvent("title-change", {
          bubbles: true,
          composed: true,
          detail: selectedClass
        }));
      } else {
        clearRouteSelection(true);
      }
    }
    if (!this.hash) {
      this.itemOpened = false;
    }
  }

  _clearSelectionHandler() {
    clearRouteSelection(true);
  }

  _mainClass() {
    return this.itemOpened ? "main item-opened" : "main";
  }

  static get template() {
    return html`
      <style include="material-styles my-styles"></style>
      <div class$="[[_mainClass(itemOpened)]]">

        <button class="mdc-icon-button close-item material-icons" on-click="_clearSelectionHandler">close</button>
        <button id="backToTop" class="mdc-icon-button mdc-button--raised back-to-top material-icons hidden">arrow_upward</button>

        <div class="class-container"></div>

        <div class="class-page--class-container">

          <div id="subclassHeight"></div>
          <div id="subclasses"></div>

          <div id="classtable">
            <table class="table">
              <tr id="groupHeaders" class="table-row table-row--header">
                <th colspan="3"></th>
                <!-- spacer to match the 3 default cols (level, prof, features) -->
              </tr>
              <tr id="colHeaders" class="table-row table-row--header">
                <th class="level table-cell">Level</th>
                <th class="pb table-cell">Proficiency Bonus</th>
                <th class="features table-cell">Features</th>
              </tr>
              <tr id="level1" class="table-row">
                <td class="level table-cell">1st</td>
                <td class="pb table-cell">+2</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level2" class="table-row">
                <td class="level table-cell">2nd</td>
                <td class="pb table-cell">+2</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level3" class="table-row">
                <td class="level table-cell">3rd</td>
                <td class="pb table-cell">+2</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level4" class="table-row">
                <td class="level table-cell">4th</td>
                <td class="pb table-cell">+2</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level5" class="table-row">
                <td class="level table-cell">5th</td>
                <td class="pb table-cell">+3</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level6" class="table-row">
                <td class="level table-cell">6th</td>
                <td class="pb table-cell">+3</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level7" class="table-row">
                <td class="level table-cell">7th</td>
                <td class="pb table-cell">+3</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level8" class="table-row">
                <td class="level table-cell">8th</td>
                <td class="pb table-cell">+3</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level9" class="table-row">
                <td class="level table-cell">9th</td>
                <td class="pb table-cell">+4</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level10" class="table-row">
                <td class="level table-cell">10th</td>
                <td class="pb table-cell">+4</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level11" class="table-row">
                <td class="level table-cell">11th</td>
                <td class="pb table-cell">+4</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level12" class="table-row">
                <td class="level table-cell">12th</td>
                <td class="pb table-cell">+4</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level13" class="table-row">
                <td class="level table-cell">13th</td>
                <td class="pb table-cell">+5</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level14" class="table-row">
                <td class="level table-cell">14th</td>
                <td class="pb table-cell">+5</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level15" class="table-row">
                <td class="level table-cell">15th</td>
                <td class="pb table-cell">+5</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level16" class="table-row">
                <td class="level table-cell">16th</td>
                <td class="pb table-cell">+5</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level17" class="table-row">
                <td class="level table-cell">17th</td>
                <td class="pb table-cell">+6</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level18" class="table-row">
                <td class="level table-cell">18th</td>
                <td class="pb table-cell">+6</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level19" class="table-row">
                <td class="level table-cell">19th</td>
                <td class="pb table-cell">+6</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level20" class="table-row">
                <td class="level table-cell">20th</td>
                <td class="pb table-cell">+6</td>
                <td class="features table-cell"></td>
              </tr>
            </table>
          </div>

          <div id="statsprof" class="stats">
            <div id="hp" colspan="6">
              <h5>Hit Points</h5>
              <div id="hitdice">
                <strong>Hit Dice:</strong>
                <span> </span>
              </div>
              <div id="hp1stlevel">
                <strong>Hit Points at 1st Level:</strong>
                <span> </span>
              </div>
              <div id="hphigherlevels">
                <strong>Hit Points at Higher Levels:</strong>
                <span> </span>
              </div>
            </div>
            <div id="prof" colspan="6">
              <h5>Proficiencies</h5>
              <span
                >You are proficient with the following items, in addition to any proficiencies provided by your race or
                background.</span
              >
              <div id="armor">
                <strong>Armor:</strong>
                <span> </span>
              </div>
              <div id="weapons">
                <strong>Weapons:</strong>
                <span> </span>
              </div>
              <div id="tools">
                <strong>Tools:</strong>
                <span> </span>
              </div>
              <div id="saves">
                <strong>Saving Throws:</strong>
                <span> </span>
              </div>
              <div id="skills">
                <strong>Skills:</strong>
                <span> </span>
              </div>
              <div id="equipment" colspan="6">
                <h5>Starting Equipment</h5>
                <div></div>
              </div>
            </div>
          </div>

          <div id="stats" class="stats">
            <!-- populate with JS -->
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('dnd-classes', DndClasses);