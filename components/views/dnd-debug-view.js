import {PolymerElement, html} from '@polymer/polymer';
import "@vaadin/vaadin-grid";
import "@vaadin/vaadin-grid/vaadin-grid-column.js";
import "@vaadin/vaadin-grid/vaadin-grid-filter";
import "@vaadin/vaadin-grid/vaadin-grid-filter-column"
import "@vaadin/vaadin-grid/vaadin-grid-sorter";
import { getLog, getLoggerChannel } from '../../util/logger';
import { cloneDeep, escapeHTML, jqEmpty } from '../../js/utils';
import { createArrayPreview, createItem, createObjectPreview } from '../../util/consoleOutput';
import '../styles/console-styles.js';

class DndDebugView extends PolymerElement {
  static get properties() {
    return {
      log: {
        type: Array,
      },
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.logUpdateHandler = (e) => {
      this.log = e.detail.log;
      this.notifySplices('log', { index: e.detail.log.length - 1, removed: [], addedCount: 1, object: this.log, type: 'splice' });
    };

    this.log = getLog();
    getLoggerChannel().addEventListener("log-update", this.logUpdateHandler);
    
    this.resizeHandler = (() => {
      this._adjustHeight();
    }).bind(this);
    window.addEventListener('resize', this.resizeHandler);

    this._adjustHeight();
    setTimeout(() => {
      this._adjustHeight();
    }, 500);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    getLoggerChannel().removeEventListener("log-update", this.logUpdateHandler);
    window.removeEventListener('resize', this.resizeHandler);
  }

  _adjustHeight() {
    if (window.innerWidth < 921 || this.inSidebar) {
      const top = this.$.grid.getBoundingClientRect().top;
      if (top) {
        this.$.grid.style.height = `${window.innerHeight - top}px`;
      }
    } else {
      this.$.grid.style.height = `600px`;
    }
  }

  ready() {
    super.ready();
    
    this.$.grid.rowDetailsRenderer = (root, grid, model) => {
      const item = model.item;
      root.classList.add("content")
      root.classList.add("console-block")
      root.classList.add("content--expanded")
      root.classList.add(`content__${item.type}`);
      jqEmpty(root);
      for (let message of item.message) {
        const wrap = document.createElement("div");
        wrap.classList.add("content__object");
        if (typeof message === "object" && !!message) {
          wrap.appendChild(createItem(message, false, false));
        } else {
          wrap.innerHTML = escapeHTML(message);
        }
        root.appendChild(wrap);
      }
    };

    this.$.timestampCol.headerRenderer = (root) => {
      if (root.children.length === 0) {
        const wrapper = document.createElement('div');
        wrapper.classList.add("heading");
        wrapper.innerHTML = "Timestamp"
        root.appendChild(wrapper);
      }
    };
    this.$.timestampCol.renderer = (root, column, model) => {
      if (root.children.length !== 0) {
        root.children[0].remove();
      }
      const item = model.item;
      const wrapper = document.createElement('div');
      wrapper.classList.add("content");
      wrapper.classList.add(`content__${item.type}`);
      wrapper.innerHTML = this._timestamp(item.timestamp);
      wrapper.addEventListener("click", () => {
        this._toggleDetails(item);
      });
      root.appendChild(wrapper);
    };

    this.$.messageCol.headerRenderer = (root) => {
      if (root.children.length !== 0) {
        root.children[0].remove();
      }
      const wrapper = document.createElement('div');
      wrapper.classList.add("heading");
      wrapper.innerHTML = "Message"
      root.appendChild(wrapper);
    }
    this.$.messageCol.renderer = (root, column, model) => {
      if (root.children.length !== 0) {
        root.children[0].remove();
      }
      const item = model.item;
      const wrapper = document.createElement('div');
      wrapper.classList.add("content");
      wrapper.classList.add(`content__${item.type}`);
      wrapper.addEventListener("click", () => {
        this._toggleDetails(item);
      });
      for (let message of item.message) {
        let preview;
        if (typeof message === "object") {
          if (message instanceof Error) {
            preview = createItem(message, true, false);
          } else if (Array.isArray(message)) {
            preview = createArrayPreview(message);
          } else {
            preview = createObjectPreview(message);
          }
        } else {
          preview = createItem(message, true, false);
        }
        wrapper.appendChild(preview);
        wrapper.innerHTML += " ";
      }
      root.appendChild(wrapper);
    }
  }

  _timestamp(time) {
    const date = new Date(time);
    return `${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}.${date.getMilliseconds().toString().padStart(3, "0")}`;
  }

  _toggleDetails(item) {
    if (this.$.grid.detailsOpenedItems.includes(item)) {
      this.$.grid.closeItemDetails(item);
    } else {
      this.$.grid.openItemDetails(item);
    }
  }

  _contentClassString(type) {
    return `content content__${type}`;
  }

  static get template() {
    return html`
      <style include="material-styles my-styles console-styles">
        :host {
          display: block;
          width: calc(100% + 32px);
          margin-left: -16px;
        }
        vaadin-select {
          margin-left: 20px;
          margin-bottom: 20px;
        }
        .content {
          font-family: Monaco, monospace;
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 2px 0 2px 8px;
          margin-top: -1px;
          border-bottom: 1px solid transparent;
        }
        .heading {
          padding: 4px 8px;
        }
        .content__error {
          color: var(--mdc-theme-error-text);
          border-color: var(--mdc-theme-error-border);
          background-color: var(--mdc-theme-error-bg);
        }
        .content__warn {
          color: var(--mdc-theme-warn-text);
          border-color: var(--mdc-theme-warn-border);
          background-color: var(--mdc-theme-warn-bg);
        }
        .content--expanded {
          padding: 10px 0 10px 20px;
          border-top: 0;
          margin-top: -3px;
        }
        .content__object {
          overflow: scroll;
          max-width: calc(100% - 20px);
          margin-bottom: 8px;
        }
      </style>
      
      <vaadin-select value={{typeFilter}} label="Filter">
        <template>
          <vaadin-list-box>
            <vaadin-item value="">None</vaadin-item>
            <vaadin-item value="error">Error</vaadin-item>
            <vaadin-item value="warn">Warn</vaadin-item>
            <vaadin-item value="info">Info</vaadin-item>
            <vaadin-item value="log">Log</vaadin-item>
          </vaadin-list-box>
        </template>
      </vaadin-select>

      <vaadin-grid id="grid" items="[[log]]" theme="no-border no-row-borders no-row-padding">
        <vaadin-grid-filter path="type" value="[[typeFilter]]"></vaadin-grid-filter>

        <vaadin-grid-column id="timestampCol" width="108px" flex-grow="0"></vaadin-grid-column>

        <vaadin-grid-column id="messageCol" flex-grow="1"></vaadin-grid-column>
      </vaadin-grid>
    `;
  }
}

customElements.define('dnd-debug-view', DndDebugView);