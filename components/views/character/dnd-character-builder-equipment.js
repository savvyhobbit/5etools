import { PolymerElement, html } from "@polymer/polymer";
import { 
  getCharacterChannel, 
  getSelectedCharacter, 
  getClassReferences, 
  getBackgroundReference, 
  getItems, 
  removeItem, 
  canAttuneItem, 
  canEquipItem, 
  toggleItemEquiped, 
  toggleItemAttuned 
} from "../../../util/charBuilder";
import EntryRenderer from '../../../util/entryrender.js'
import { getEditModeChannel, isEditMode } from "../../../util/editMode";
import { jqEmpty, entrySearch } from "../../../js/utils";
import { renderSelection } from "../../../js/items";
import "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-grid";
import "@vaadin/vaadin-grid/vaadin-grid-sort-column";

class DndCharacterBuilderEquipment extends PolymerElement {
  
  static get properties() {
    return {
      classEquipment: {
        type: String,
      },
      inventory: {
        type: Array
      },
      hasClass: {
        type: Boolean,
        value: false
      },
      hasBackground: {
        type: Boolean,
        value: false
      },
      isEditMode: {
        type: Boolean,
        value: false
      }
    };
  }

  constructor() {
    super();
    
    this.renderer = new EntryRenderer();
  }

  connectedCallback() {
    super.connectedCallback();

    this.characterChangeHandler = (e) => {
      let character = e.detail.character;
      this.updateFromCharacter(character);
    };
    
    this.updateFromCharacter(getSelectedCharacter());
    getCharacterChannel().addEventListener("character-selected", this.characterChangeHandler);

    this.editModeHandler = (e) => {
      this.isEditMode = e.detail.isEditMode;
    }
    getEditModeChannel().addEventListener('editModeChange', this.editModeHandler);
    this.isEditMode = isEditMode();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    getCharacterChannel().removeEventListener("character-selected", this.characterChangeHandler);
    getEditModeChannel().removeEventListener('editModeChange', this.editModeHandler);
  }

  ready() {
    super.ready();
    
    setTimeout(() => {
      const grid = this.$.grid;

      grid.rowDetailsRenderer = ((root, grid, rowData) => {
        if (!root.firstElementChild) {
          root.innerHTML =
          '<div class="details" id="stats"></div>';
        }
        const deets = root.querySelector('.details');
        jqEmpty(deets);
        renderSelection(rowData.item, deets, true);
      }).bind(this);
    }, 0);
  }

  async updateFromCharacter(character) {
    this.hasClass = false;
    this.hasBackground = false;
    this.$.backgroundEquipment.innerHTML = "";
    this.$.classEquipment.innerHTML = "";
    if (character) {
      const inventory = await getItems(character);

      let firstClass;
      if (character.levels && character.levels.length > 0) {
        const classRefs = await getClassReferences();
        firstClass = classRefs[character.levels[0].name];
        this.hasClass = true;
        // todo Build inventory from class starting.
        this.$.classEquipment.innerHTML = this.parseClassEquipment(firstClass.startingEquipment);
      } else {
        this.$.classEquipment.innerHTML = "";
      }

      if (!firstClass || firstClass.startingEquipment.additionalFromBackground) {
        const background = await getBackgroundReference();
        if (background) {
          this.hasBackground = true;
          this.$.backgroundEquipment.innerHTML = this.parseBackgroundEquipment(background.entries)
          if (background.entries) {
            const equipmentEntry = entrySearch("Equipment", background.entries);
            // todo Build inventory from background starting.
          }
        } else {
          this.$.backgroundEquipment.innerHTML = "";
        }
      } else {
        this.$.backgroundEquipment.innerHTML = "";
      }

      this.inventory = inventory;
      this.dispatchEvent(new CustomEvent("loadingChange", { bubbles: true, composed: true }));
    }
  }

  parseClassEquipment(classEquip) {
    if (classEquip) {
      const fromBackground = classEquip.additionalFromBackground
        ? "<p>You start with the following items, plus anything provided by your background.</p>"
        : "";
      const defList = classEquip.default.length === 0 ? "" : `<ul><li>${classEquip.default.map(i => this.renderStr(i)).join("</li><li>")}</ul>`;
      const goldAlt =
        classEquip.goldAlternative === undefined
          ? ""
          : `<p>Alternatively, you may start with ${this.renderStr(classEquip.goldAlternative)} gp to buy your own equipment.</p>`;
      return `${fromBackground}${defList}${goldAlt}`;
    }
  }

  parseBackgroundEquipment(backgroundEntries) {
    if (backgroundEntries) {
      const equipmentEntry = entrySearch("Equipment", backgroundEntries);
      const renderedEquipment = this.renderStr(equipmentEntry.entry);
      return `<p>${renderedEquipment}</p>`;
    }
  }

  renderStr(string) {
    let renderStack = []
    this.renderer.recursiveEntryRender(string, renderStack, 0);
    return renderStack.join(" ");
  }

  _expandDetails(e) {
    let data = e.model.__data.item,
      stayClosed = this.$.grid.detailsOpenedItems.indexOf(data) > -1;

    for (let item of this.$.grid.detailsOpenedItems) {
      this.$.grid.closeItemDetails(item);
    }

    if (stayClosed) {
      this.$.grid.closeItemDetails(data);
    } else {
      this.$.grid.openItemDetails(data);
    }
    this.$.grid.notifyResize();
  }

  _flashCheckbox(checkboxEl) {
    if (checkboxEl) {
      checkboxEl.classList.add('transition-bg');
      checkboxEl.classList.add('flash-error');
      setTimeout(() => {
        checkboxEl.classList.remove('flash-error');
        setTimeout(() => {
          checkboxEl.classList.remove('transition-bg');
        }, 200);
      }, 200);
    }
  }

  _deleteItem(e) {
    let id = e.model.__data.item && e.model.__data.item.id !== undefined ? e.model.__data.item.id : undefined;
    removeItem(id);
  }

  async _setItemEquiped(e) {
    e.preventDefault();
    e.stopPropagation();
    let id = e.model.__data.item && e.model.__data.item.id ? e.model.__data.item.id : undefined;
    let isEquiped = e.model.__data.item && e.model.__data.item.isEquiped ? e.model.__data.item.isEquiped : false;
    
    if (isEquiped) {
      toggleItemEquiped(id);
    } else if (await canEquipItem(e.model.__data.item)) {
      toggleItemEquiped(id);
    } else {
      let checkbox = e.target.querySelector('vaadin-checkbox')
      this._flashCheckbox(checkbox)
    }
  }

  async _setItemAttuned(e) {
    e.preventDefault();
    e.stopPropagation();
    let id = e.model.__data.item && e.model.__data.item.id ? e.model.__data.item.id : undefined;
    let isAttuned = e.model.__data.item && e.model.__data.item.isAttuned ? e.model.__data.item.isAttuned : false;

    if (isAttuned) {
      toggleItemAttuned(id);
    } else if (await canAttuneItem(e.model.__data.item)) {
      toggleItemAttuned(id);
    } else {
      let checkbox = e.target.querySelector('vaadin-checkbox')
      this._flashCheckbox(checkbox)
    }
  }

  _preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  _or(...bools) {
    for (let bool of bools) {
      if (bool) {
        return true;
      }
    }
    return false;
  }

  static get template() {
    return html`
      <style include="material-styles"></style>
      <style>
        :host {
          display: block;
          padding: 14px;
        }
        [hidden] {
          display: none !important;
        }
        a {
          color: var(--mdc-theme-secondary);
        }

        .heading {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }

        .col-wrap {
          display: flex; 
          justify-content: space-between;
          flex-wrap: wrap;
        }

        .row-wrap {
          width: 100%;
        }
        .row-wrap:not(:last-child) {
          margin-bottom: 24px;
        }

        .row-wrap > *:not(h2):not(:last-child) {
          margin-bottom: 10px;
        }

        .no-content {
          font-size: 14px;
          font-style: italic;
        }

        .item-wrap {
          display: flex;
          flex-wrap: nowrap;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-start;
          padding: 10px 6px;
          min-height: 28px;
        }
        .item-wrap__name-wrap {
          flex-basis: 100%;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }
        .item-wrap__name {
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .item-wrap__type {
          font-style: italic;
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .item-wrap__close {
          font-size: 14px;
          margin-top: 6px;
          cursor: pointer;
        }
        .item-wrap__checkboxes {
          display: flex;
          flex-direction: column;
          width: 80px;
          flex-grow: 0;
          flex-shrink: 0;
        }
        .item-wrap__checkboxes > span {
          cursor: pointer;
        }
        vaadin-checkbox {
          pointer-events: none;
          font-size: 13px;
        }
        vaadin-checkbox.flash-error {
          color: var(--mdc-theme-error);
          transition: color 0.2s ease-out;
          --lumo-contrast-20pct: var(--mdc-theme-error);
        }
        vaadin-checkbox.transition-bg {
          transition: color 0.2s ease-in;
        }

        .details {
          font-size: 14px;
          width: calc(100% - 30px);
          margin: 0 auto 13px !important;
          background: var(--lumo-contrast-10pct);
          border-radius: 4px;
          padding: 14px;
        }
        #stats {
          margin-top: 24px;
          font-size: 12px;
        }
        #stats p {
          margin-top: 4px;
          margin-bottom: 16px;
        }
        #stats .table {
          margin-bottom: 24px;
          border-radius: 4px;
          box-shadow: 0 0 0 1px var(--mdc-theme-text-divider-on-background);
        }
        #stats .subclass-feature .stat-name {
          color: var(--mdc-theme-primary, '#6200ee');
        }
        #stats .statsBlockHead .stat-name {
          display: block;
          font-size: 1.6rem;
          font-weight: normal;
          line-height: 1.2;
        }
        #stats .statsBlockSubHead .stat-name {
          font-size: 1.2rem;
          font-weight: normal;
        }
        #stats .statsInlineHead {
          margin-bottom: 16px;
        }
        #stats .statsInlineHead .stat-name {
          font-size: .8rem;
          font-weight: bold;
          display: inline;
        }
        #stats .statsInlineHead .stat-name + p {
          display: inline;
        }
        #stats .spell-ability {
          margin: 0 24px;
          display: block;
        }
        #stats .subclass-feature,
        #stats .class-feature {
          padding-top: 24px;
          border-top: 1px solid var(--mdc-theme-text-divider-on-background, 'rgba(0, 0, 0, 0.12)');
        }
        #stats a {
          color: var(--mdc-theme-secondary, '#018786') !important;
        }
        #stats ul {
          padding-left: 24px;
          list-style: disc;
        }
        #stats ul li {
          margin-bottom: 8px;
        }

        @media(min-width: 921px) {
          .row-wrap {
            width: calc(50% - 10px);
          }
          .row-wrap:first-child {
            margin-bottom: 0;
          }
        }
      </style>

      <div class="col-wrap">

        <div class="row-wrap">
          <div class="heading">
            <h2>Inventory</h2>
            <a class="mdc-icon-button material-icons" href="#/items">launch</a>
          </div>
          <vaadin-grid id="grid" items="[[inventory]]" theme="no-border no-row-borders no-row-padding" >
            <vaadin-grid-sort-column path="typeText" header="Type">
              <template>
                <div class="item-wrap">
                  <div class="item-wrap__name-wrap" on-click="_expandDetails">
                    <span class="item-wrap__name">[[item.name]]</span>
                    <span class="item-wrap__type">[[item.typeText]]</span>
                  </div>
                  <div class="item-wrap__checkboxes">
                    <span on-click="_setItemEquiped">
                      <vaadin-checkbox checked="[[item.isEquiped]]" hidden$="[[!item.canEquip]]">Equip</vaadin-checkbox>
                    </span>
                    <span on-click="_setItemAttuned">
                      <vaadin-checkbox checked="[[item.isAttuned]]" hidden$="[[!item.reqAttune]]">Attune</vaadin-checkbox>
                    </span>
                  </div>
                  <div class="mdc-buttom-icon material-icons item-wrap__close" on-click="_deleteItem">close</div>
                </div>
              </template>
            </vaadin-grid-sort-column>
          </vaadin-grid>
        </div>

        <div class="row-wrap">
          <h2>From Class</h2>
          <span class="no-content" hidden$=[[hasClass]]>Select a class to see equipment</span>
          <div id="classEquipment"></div>
        </div>

        <div class="row-wrap">
          <h2>From Background</h2>
          <span class="no-content" hidden$=[[hasBackground]]>Select a background to see equipment</span>
          <div id="backgroundEquipment"></div>
        </div>
      </div>
    `;
  }
}

customElements.define("dnd-character-builder-equipment", DndCharacterBuilderEquipment);