(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{112:function(e,t,a){"use strict";a(111),a(108)},115:function(e,t,a){"use strict";a.r(t),a.d(t,"renderSelection",(function(){return o}));var i=a(71),r=a(5),s=a(1);const n=new i.a;function o(e,t,a){(t.querySelector(".selection-wrapper")||t).innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="margin-bottom_small">\n\t\t\t<span class="type"></span><span class="rarity"></span>\n\t\t\t<span class="attunement"></span>\n\t\t</div>\n\t\t<div class="margin-bottom_small">\n\t\t\t<span class="value"></span><span class="weight"></span>\n\t\t</div>\n\t\t<div class="margin-bottom_small">\n\t\t\t<span class="damage"></span>\n\t\t\t<span class="damageType"></span>\n\t\t\t<span class="properties"></span>\n\t\t</div>\n\t\t<div class="text"></div>\n\t\t<div class="margin-bottom_small">Source: <span class="source"></span></div>\n\t</div>';const i=e.source,o=r.a.sourceJsonToFull(i);t.querySelector(".stats-wrapper .source").innerHTML=`${o}, page ${e.page}`,t.querySelector(".stats-wrapper .value").innerHTML=e.value?e.value+(e.weight?", ":""):"",t.querySelector(".stats-wrapper .weight").innerHTML=e.weight?e.weight+(1==e.weight?" lb.":" lbs."):"",t.querySelector(".stats-wrapper .rarity").innerHTML=(e.tier?", "+e.tier:"")+(e.rarity?", "+e.rarity:""),t.querySelector(".stats-wrapper .attunement").innerHTML=e.reqAttune?e.reqAttune:"",t.querySelector(".stats-wrapper .type").innerHTML=e.typeText,t.querySelector(".stats-wrapper .damage").innerHTML="",t.querySelector(".stats-wrapper .damageType").innerHTML="";const d=e.type||"";if(e.weaponCategory)e.dmg1&&(t.querySelector(".stats-wrapper .damage").innerHTML=Object(s.utils_makeRoller)(e.dmg1)),e.dmgType&&(t.querySelector(".stats-wrapper .damageType").innerHTML=r.a.dmgTypeToFull(e.dmgType));else if("LA"===d||"MA"===d||"HA"===d)t.querySelector(".stats-wrapper .damage").innerHTML="AC "+e.ac+("LA"===d?" + Dex":"MA"===d?" + Dex (max 2)":"");else if("S"===d)t.querySelector(".stats-wrapper .damage").innerHTML="AC +"+e.ac;else if("MNT"===d||"VEH"===d){const a=e.speed,i=e.carryingcapacity;a&&t.querySelector(".stats-wrapper .damage").append("Speed="+a),a&&i&&t.querySelector(".stats-wrapper .damage").append("MNT"===d?", ":"<br>"),i&&(t.querySelector(".stats-wrapper .damage").append("Carrying Capacity="+i),-1===i.indexOf("ton")&&-1===i.indexOf("passenger")&&t.querySelector(".stats-wrapper .damage").append(1==i?" lb.":" lbs."))}if(t.querySelector(".stats-wrapper .properties").innerHTML="",e.property){const a=e.property.split(",");for(let i=0;i<a.length;i++){const r=a[i];let n=window.itemPropertyList[r].name;"V"===r&&(n=`${n} (${Object(s.utils_makeRoller)(e.dmg2)})`),"T"!==r&&"A"!==r&&"AF"!==r||(n=`${n} (${e.range}ft.)`),"RLD"===r&&(n=`${n} (${e.reload} shots)`),n=(i>0?", ":e.dmg1?"- ":"")+n,t.querySelector(".stats-wrapper .properties").append(n)}}const l={type:"entries",entries:e.entries},c=[];n.recursiveEntryRender(l,c,1),t.querySelector(".stats-wrapper .text").innerHTML=Object(s.utils_makeRoller)(c.join("")).split(e.name.toLowerCase()).join("<i>"+e.name.toLowerCase()+"</i>"),a&&t.querySelector(".margin-bottom_small").remove()}},129:function(e,t,a){"use strict";a.r(t);var i=a(7),r=a(18),s=a(71),n=a(109),o=a(1),d=a(115),l=(a(112),a(120),a(45),a(13));const c=l.a`<dom-module id="lumo-grid-sorter" theme-for="vaadin-grid-sorter">
  <template>
    <style>
      :host {
        justify-content: flex-start;
        align-items: baseline;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      [part="content"] {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      [part="indicators"] {
        margin-left: var(--lumo-space-s);
      }

      :host(:not([direction])) [part="indicators"]::before {
        opacity: 0.2;
      }

      :host([direction]) {
        color: var(--lumo-primary-text-color);
      }

      [part="order"] {
        font-size: var(--lumo-font-size-xxs);
        line-height: 1;
      }

      /* RTL specific styles */

      :host([dir="rtl"]) [part="indicators"] {
        margin-right: var(--lumo-space-s);
        margin-left: 0;
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild(c.content);a(72),a(31);var p=a(19),A=a(42);
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
const m=document.createElement("template");m.innerHTML="<custom-style>\n  <style>\n    @font-face {\n      font-family: 'vaadin-grid-sorter-icons';\n      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAQwAA0AAAAABuwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAEFAAAABkAAAAcfep+mUdERUYAAAP4AAAAHAAAAB4AJwAOT1MvMgAAAZgAAAA/AAAAYA8TBPpjbWFwAAAB7AAAAFUAAAFeF1fZ4mdhc3AAAAPwAAAACAAAAAgAAAAQZ2x5ZgAAAlgAAABcAAAAnMvguMloZWFkAAABMAAAAC8AAAA2C5Ap72hoZWEAAAFgAAAAHQAAACQGbQPHaG10eAAAAdgAAAAUAAAAHAoAAABsb2NhAAACRAAAABIAAAASAIwAYG1heHAAAAGAAAAAFgAAACAACwAKbmFtZQAAArQAAAECAAACZxWCgKhwb3N0AAADuAAAADUAAABZCrApUXicY2BkYGAA4rDECVrx/DZfGbhZGEDgyqNPOxH0/wNMq5kPALkcDEwgUQBWRA0dAHicY2BkYGA+8P8AAwMLAwgwrWZgZEAFbABY4QM8AAAAeJxjYGRgYOAAQiYGEICQSAAAAi8AFgAAeJxjYGY6yziBgZWBgWkm0xkGBoZ+CM34msGYkZMBFTAKoAkwODAwvmRiPvD/AIMDMxCD1CDJKjAwAgBktQsXAHicY2GAAMZQCM0EwqshbAALxAEKeJxjYGBgZoBgGQZGBhCIAPIYwXwWBhsgzcXAwcAEhIwMCi+Z/v/9/x+sSuElA4T9/4k4K1gHFwMMMILMY2QDYmaoABOQYGJABUA7WBiGNwAAJd4NIQAAAAAAAAAACAAIABAAGAAmAEAATgAAeJyNjLENgDAMBP9tIURJwQCMQccSZgk2i5fIYBDAidJjycXr7x5EPwE2wY8si7jmyBNXGo/bNBerxJNrpxhbO3/fEFpx8ZICpV+ghxJ74fAMe+h7Ox14AbrsHB14nK2QQWrDMBRER4mTkhQK3ZRQKOgCNk7oGQqhhEIX2WSlWEI1BAlkJ5CDdNsj5Ey9Rncdi38ES+jzNJo/HwTgATcoDEthhY3wBHc4CE+pfwsX5F/hGe7Vo/AcK/UhvMSz+mGXKhZU6pww8ISz3oWn1BvhgnwTnuEJf8Jz1OpFeIlX9YULDLdFi4ASHolkSR0iuYdjLak1vAequBhj21D61Nqyi6l3qWybGPjySbPHGScGJl6dP58MYcQRI0bts7mjebBqrFENH7t3qWtj0OuqHnXcW7b0HOTZFnKryRGW2hFX1m0O2vEM3opNMfTau+CS6Z3Vx6veNnEXY6jwDxhsc2gAAHicY2BiwA84GBgYmRiYGJkZmBlZGFkZ2djScyoLMgzZS/MyDQwMwLSrpYEBlIbxjQDrzgsuAAAAAAEAAf//AA94nGNgZGBg4AFiMSBmYmAEQnYgZgHzGAAD6wA2eJxjYGBgZACCKyoz1cD0o087YTQATOcIewAAAA==) format('woff');\n      font-weight: normal;\n      font-style: normal;\n    }\n  </style>\n</custom-style>",document.head.appendChild(m.content);class h extends(Object(p.a)(Object(A.a)(i.a))){static get template(){return l.a`
    <style>
      :host {
        display: inline-flex;
        cursor: pointer;
        max-width: 100%;
      }

      [part="content"] {
        flex: 1 1 auto;
      }

      [part="indicators"] {
        position: relative;
        align-self: center;
        flex: none;
      }

      [part="order"] {
        display: inline;
        vertical-align: super;
      }

      [part="indicators"]::before {
        font-family: 'vaadin-grid-sorter-icons';
        display: inline-block;
      }

      :host(:not([direction])) [part="indicators"]::before {
        content: "\\e901";
      }

      :host([direction=asc]) [part="indicators"]::before {
        content: "\\e900";
      }

      :host([direction=desc]) [part="indicators"]::before {
        content: "\\e902";
      }
    </style>

    <div part="content">
      <slot></slot>
    </div>
    <div part="indicators">
      <span part="order">[[_getDisplayOrder(_order)]]</span>
    </div>
`}static get is(){return"vaadin-grid-sorter"}static get properties(){return{path:String,direction:{type:String,reflectToAttribute:!0,notify:!0,value:null},_order:{type:Number,value:null},_isConnected:{type:Boolean,value:!1}}}static get observers(){return["_pathOrDirectionChanged(path, direction, _isConnected)","_directionOrOrderChanged(direction, _order)"]}ready(){super.ready(),this.addEventListener("click",this._onClick.bind(this))}connectedCallback(){super.connectedCallback(),this._isConnected=!0}disconnectedCallback(){super.disconnectedCallback(),this._isConnected=!1}_pathOrDirectionChanged(e,t,a){void 0!==e&&void 0!==t&&void 0!==a&&a&&this.dispatchEvent(new CustomEvent("sorter-changed",{bubbles:!0,composed:!0}))}_getDisplayOrder(e){return null===e?"":e+1}_onClick(e){const t=this.getRootNode().activeElement;this!==t&&this.contains(t)||(e.preventDefault(),"asc"===this.direction?this.direction="desc":"desc"===this.direction?this.direction=null:this.direction="asc")}_directionOrOrderChanged(e,t){void 0!==e&&void 0!==t&&(/^((?!chrome|android).)*safari/i.test(navigator.userAgent)&&this.root&&this.root.querySelectorAll("*").forEach((function(e){e.style["-webkit-backface-visibility"]="visible",e.style["-webkit-backface-visibility"]=""})))}}customElements.define(h.is,h);var u=a(126);
/**
@license
Copyright (c) 2018 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/class g extends u.a{static get template(){return l.a`
    <template class="header" id="headerTemplate">
      <vaadin-grid-sorter path="[[path]]" direction="{{direction}}">[[_getHeader(header, path)]]</vaadin-grid-sorter>
    </template>
`}static get is(){return"vaadin-grid-sort-column"}static get properties(){return{path:String,direction:{type:String,notify:!0}}}_prepareHeaderTemplate(){const e=this._prepareTemplatizer(this.$.headerTemplate);return e.templatizer.dataHost=this,e}_getHeader(e,t){return e||this._generateHeader(t)}}customElements.define(g.is,g);class w extends i.a{static get properties(){return{classEquipment:{type:String},inventory:{type:Array},hasClass:{type:Boolean,value:!1},hasBackground:{type:Boolean,value:!1},isEditMode:{type:Boolean,value:!1}}}constructor(){super(),this.renderer=new s.a}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(r.G)()),Object(r.m)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(n.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(n.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(r.m)().removeEventListener("character-selected",this.characterChangeHandler),Object(n.b)().removeEventListener("editModeChange",this.editModeHandler)}ready(){super.ready(),setTimeout(()=>{this.$.grid.rowDetailsRenderer=((e,t,a)=>{e.firstElementChild||(e.innerHTML='<div class="details" id="stats"></div>');const i=e.querySelector(".details");Object(o.jqEmpty)(i),Object(d.renderSelection)(a.item,i,!0)}).bind(this)},0)}async updateFromCharacter(e){if(this.hasClass=!1,this.hasBackground=!1,this.$.backgroundEquipment.innerHTML="",this.$.classEquipment.innerHTML="",e){const t=await Object(r.B)(e);let a;if(e.levels&&e.levels.length>0){a=(await Object(r.s)())[e.levels[0].name],this.hasClass=!0,this.$.classEquipment.innerHTML=this.parseClassEquipment(a.startingEquipment)}else this.$.classEquipment.innerHTML="";if(!a||a.startingEquipment.additionalFromBackground){const e=await Object(r.i)();if(e){if(this.hasBackground=!0,this.$.backgroundEquipment.innerHTML=this.parseBackgroundEquipment(e.entries),e.entries){Object(o.entrySearch)("Equipment",e.entries)}}else this.$.backgroundEquipment.innerHTML=""}else this.$.backgroundEquipment.innerHTML="";this.inventory=t,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}}parseClassEquipment(e){if(e){return`${e.additionalFromBackground?"<p>You start with the following items, plus anything provided by your background.</p>":""}${0===e.default.length?"":`<ul><li>${e.default.map(e=>this.renderStr(e)).join("</li><li>")}</ul>`}${void 0===e.goldAlternative?"":`<p>Alternatively, you may start with ${this.renderStr(e.goldAlternative)} gp to buy your own equipment.</p>`}`}}parseBackgroundEquipment(e){if(e){const t=Object(o.entrySearch)("Equipment",e);return`<p>${this.renderStr(t.entry)}</p>`}}renderStr(e){let t=[];return this.renderer.recursiveEntryRender(e,t,0),t.join(" ")}_expandDetails(e){let t=e.model.__data.item,a=this.$.grid.detailsOpenedItems.indexOf(t)>-1;for(let e of this.$.grid.detailsOpenedItems)this.$.grid.closeItemDetails(e);a?this.$.grid.closeItemDetails(t):this.$.grid.openItemDetails(t),this.$.grid.notifyResize()}_flashCheckbox(e){e&&(e.classList.add("transition-bg"),e.classList.add("flash-error"),setTimeout(()=>{e.classList.remove("flash-error"),setTimeout(()=>{e.classList.remove("transition-bg")},200)},200))}_deleteItem(e){let t=e.model.__data.item&&void 0!==e.model.__data.item.id?e.model.__data.item.id:void 0;Object(r.S)(t)}async _setItemEquiped(e){e.preventDefault(),e.stopPropagation();let t=e.model.__data.item,a=t?t.id:void 0;if(!!t&&t.isEquiped)Object(r.pb)(a);else if(await Object(r.e)(t))Object(r.pb)(a);else{let t=e.target.querySelector("vaadin-checkbox");this._flashCheckbox(t)}}async _setItemAttuned(e){e.preventDefault(),e.stopPropagation();let t=e.model.__data.item,a=t?t.id:void 0;if(!!t&&t.isAttuned)Object(r.ob)(a);else if(await Object(r.d)(t))Object(r.ob)(a);else{let t=e.target.querySelector("vaadin-checkbox");this._flashCheckbox(t)}}_preventDefault(e){e.preventDefault(),e.stopPropagation()}_or(...e){for(let t of e)if(t)return!0;return!1}static get template(){return i.b`
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
          cursor: pointer;
        }
        .item-wrap__name-wrap:hover {
          color: var(--mdc-theme-secondary);
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
    `}}customElements.define("dnd-character-builder-equipment",w)}}]);
//# sourceMappingURL=9.bundle.js.map