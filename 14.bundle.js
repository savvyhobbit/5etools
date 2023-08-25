(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{165:function(e,n,t){"use strict";t.r(n);var o=t(3),l=(t(128),t(132),t(142),t(141),t(140),t(138)),a=t(1);const s="var(--console-nullish-color)",i="var(--console-punc-color)",r="abcdefghijklmnopqrstuvwxyz0123456798*!@_.()#^&%-=+";function d(e,n,t,o){let l=document.createElement("div");switch(l.classList.add("console-item"),typeof e){case"string":n?l.innerHTML=Object(a.escapeHTML)(e):(l.style.color="var(--console-string-color)",l.innerHTML=`"${Object(a.escapeHTML)(e)}"`);break;case"number":case"boolean":l.style.color="var(--console-number-color)",l.innerHTML=e.toString();break;case"object":null===e?(l.style.color=s,l.innerHTML="null"):e instanceof Error?n?l.innerHTML=Object(a.escapeHTML)(e.message):l.innerHTML+=`<pre>${Object(a.escapeHTML)(e.stack)}</pre>`:(l.style.color="var(--console-object-color)",t?l.innerHTML=`<span style="color:${i}">{&mldr;}</span>`:l.appendChild(function(e,n){const t=document.createDocumentFragment(),o="u"+Math.random().toString(36).substr(2,8),l=document.createElement("input"),a=document.createElement("label"),s=document.createElement("span"),m=document.createElement("span"),h=document.createElement("div"),b=document.createElement("div");h.classList.add("collapsible-content"),b.classList.add("content-inner"),l.classList.add("toggle"),l.type="checkbox",l.id=o,s.classList.add("label-text"),m.classList.add("label-text-short"),e instanceof Array?(n&&(s.innerHTML=`<span style="font-weight:bold">${n}</span><span style="color: ${i}">:</span> `,m.innerHTML=`<span style="font-weight:bold">${n}</span style="color: ${i}"><span>:</span> `),s.appendChild(c(e)),s.appendChild(g(e)),m.appendChild(c(e))):(n?(m.innerHTML=`<span style="font-weight:bold">${n}</span><span style="color: ${i}">:</span> `,s.innerHTML=`<span style="font-weight:bold">${n}</span style="color: ${i}"><span>:</span> `):m.appendChild(p(e)),s.appendChild(p(e)));a.classList.add("label-toggle"),a.setAttribute("for",o),a.appendChild(s),a.appendChild(m);for(let n of Object.keys(e).sort((e,n)=>{const t=r.indexOf(e[0]),o=r.indexOf(n[0]);return t===o?e<n?-1:e>n?1:0:t-o})){if(-1==Object.getOwnPropertyNames(e).indexOf(n))continue;const t=document.createElement("div");t.classList.add("console-property"),"object"!=typeof e[n]&&(t.innerHTML=`<span style="font-weight:bold">${n}</span><span style="color:${i}">: </span>`),t.appendChild(d(e[n],!1,!1,n)),b.appendChild(t)}return h.appendChild(b),t.appendChild(l),t.appendChild(a),t.appendChild(h),t}(e,o)));break;case"undefined":l.style.color="#777",l.innerHTML="undefined"}return l}function c(e){const n=document.createElement("span");return n.style.color="#aaa",n.innerHTML=`<span style="color:${s}">(${e.length}) </span>`,n}function p(e){const n=document.createDocumentFragment(),t=document.createElement("span");if(e){t.innerHTML=`<span style="color:${i}">{</span>`;let n=0;for(let o in e){if(t.innerHTML+=`<span style="color:${s}">${o}<span style="color:${i}">:</span> </span>`,t.appendChild(d(e[o],!1,!0)),n>=2||n==Object.keys(e).length-1)break;t.innerHTML+=`<span style="color:${i}">, </span>`,n++}Object.keys(e).length>3&&(t.innerHTML+=`<span style="color:${i}">, &mldr;</span>`),t.innerHTML+=`<span style="color:${i}">}</span>`}return n.appendChild(t),n}function g(e){const n=document.createDocumentFragment(),t=document.createElement("span");t.innerHTML=`<span style="color:${i}">[</span>`;for(let n=0;n<5&&n<e.length;n++)t.appendChild(d(e[n],!1,!0)),n<e.length-1&&n<4&&(t.innerHTML+=`<span style="color:${i}">, </span>`);return e.length>5&&(t.innerHTML+=`<span style="color:${i}">, &mldr;</span>`),t.innerHTML+=`<span style="color:${i}">]</span>`,n.appendChild(t),n}t(193);class m extends o.a{static get properties(){return{log:{type:Array}}}connectedCallback(){super.connectedCallback(),this.logUpdateHandler=e=>{this.log=e.detail.log,this.notifySplices("log",{index:e.detail.log.length-1,removed:[],addedCount:1,object:this.log,type:"splice"})},this.log=Object(l.a)(),Object(l.b)().addEventListener("log-update",this.logUpdateHandler),this.resizeHandler=(()=>{this._adjustHeight()}).bind(this),window.addEventListener("resize",this.resizeHandler),this._adjustHeight(),setTimeout(()=>{this._adjustHeight()},500)}disconnectedCallback(){super.disconnectedCallback(),Object(l.b)().removeEventListener("log-update",this.logUpdateHandler),window.removeEventListener("resize",this.resizeHandler)}_adjustHeight(){if(window.innerWidth<921||this.nonGlobal){const e=this.$.grid.getBoundingClientRect().top;e&&(this.$.grid.style.height=window.innerHeight-e+"px")}else this.$.grid.style.height="600px"}ready(){super.ready(),this.$.grid.rowDetailsRenderer=(e,n,t)=>{if(0===e.children.length){const n=t.item;e.classList.add("content"),e.classList.add("console-block"),e.classList.add("content--expanded"),e.classList.add("content__"+n.type);for(let t of n.message){const n=document.createElement("div");n.classList.add("content__object"),"object"==typeof t&&t?n.appendChild(d(t,!1,!1)):n.innerHTML=Object(a.escapeHTML)(t),e.appendChild(n)}}},this.$.timestampCol.headerRenderer=e=>{if(0===e.children.length){const n=document.createElement("div");n.classList.add("heading"),n.innerHTML="Timestamp",e.appendChild(n)}},this.$.timestampCol.renderer=(e,n,t)=>{0!==e.children.length&&e.children[0].remove();const o=t.item,l=document.createElement("div");l.classList.add("content"),l.classList.add("content__"+o.type),l.innerHTML=this._timestamp(o.timestamp),l.addEventListener("click",()=>{this._toggleDetails(o)}),e.appendChild(l)},this.$.messageCol.headerRenderer=e=>{0!==e.children.length&&e.children[0].remove();const n=document.createElement("div");n.classList.add("heading"),n.innerHTML="Message",e.appendChild(n)},this.$.messageCol.renderer=(e,n,t)=>{0!==e.children.length&&e.children[0].remove();const o=t.item,l=document.createElement("div");l.classList.add("content"),l.classList.add("content__"+o.type),l.addEventListener("click",()=>{this._toggleDetails(o)});for(let e of o.message){let n;n="object"==typeof e?e instanceof Error?d(e,!0,!1):Array.isArray(e)?g(e):p(e):d(e,!0,!1),l.appendChild(n),l.innerHTML+=" "}e.appendChild(l)}}_timestamp(e){const n=new Date(e);return`${n.getHours()>12?n.getHours()-12:n.getHours()}:${n.getMinutes().toString().padStart(2,"0")}:${n.getSeconds().toString().padStart(2,"0")}.${n.getMilliseconds().toString().padStart(3,"0")}`}_toggleDetails(e){this.$.grid.detailsOpenedItems.includes(e)?this.$.grid.closeItemDetails(e):this.$.grid.openItemDetails(e)}_contentClassString(e){return"content content__"+e}static get template(){return o.b`
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
    `}}customElements.define("dnd-debug-view",m)},193:function(e,n){const t=document.createElement("dom-module");t.innerHTML='\n  <template>\n    <style>\n      .console-block {\n        font-family: "SF Mono", "Monaco", "Andale Mono", "Lucida Console", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace;\n        font-size: 12px;\n        line-height: 1.4em;\n      }\n\n      .console-line {\n        border-bottom: 1px solid #dddddd;\n        padding-bottom: 7px;\n        padding-top: 7px;\n      }\n\n      .console-item {\n        display: inline;\n        vertical-align: top;\n        font-weight: normal;\n      }\n\n      .error {\n        color: red !important;\n      }\n      .console-line > .console-item {\n        margin-right: 8px;\n      }\n\n      .console-block input[type=\'checkbox\'] {\n        display: none;\n      }\n\n      .console-block .label-toggle {\n        display: block;\n        transition: all 0.25s ease-out;\n      }\n\n      .console-block .label-toggle:hover::before {\n        color: #777;\n      }\n\n      .console-block .label-toggle::before {\n        content: \' \';\n        display: inline-block;\n        border-top: 5px solid transparent;\n        border-bottom: 5px solid transparent;\n        border-left: 5px solid currentColor;\n        vertical-align: middle;\n        margin-right: 4px;\n        margin-top: 1px;\n        transform: translateY(-2px);\n        transition: transform .1s ease-out;\n        color: #aaa;\n      }\n\n      .console-block .collapsible-content .content-inner {\n        border-left: 1px solid #aaa;\n        margin-left: 2px;\n        padding-left: 6px;\n      }\n\n      .console-block .collapsible-content {\n        max-height: 0px;\n        overflow: hidden;\n      }\n\n      .console-block .toggle:checked+.label-toggle+.collapsible-content {\n        max-height: 4000px;\n      }\n\n      .console-block .toggle:checked+.label-toggle .label-text {\n        display: none;\n      }\n\n      .console-block .toggle+.label-toggle .label-text-short {\n        display: none;\n      }\n\n      .console-block .toggle:checked+.label-toggle .label-text-short {\n        display: inline;\n      }\n\n      .console-block .toggle:checked+.label-toggle::before {\n        transform: rotate(90deg) translateX(-3px);\n      }\n\n      .console-block .toggle:checked+.label-toggle {\n        border-bottom-right-radius: 0;\n        border-bottom-left-radius: 0;\n      }\n      .console-block .label-text,\n      .console-block .label-text-short {\n        font-weigt: bold;\n      }\n    </style>\n  </template>\n',t.register("console-styles")}}]);
//# sourceMappingURL=14.bundle.js.map