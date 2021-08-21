(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{105:function(e,t,s){"use strict";var a=s(1),r=s(0),i=s(5);function n(){this.wrapperTag="div",this.baseUrl="",this.setWrapperTag=function(e){this.wrapperTag=e},this.setBaseUrl=function(e){this.baseUrl=e},this.recursiveEntryRender=function(e,t,s,o,l,c){if(s=null==s?"section"===e.type?-1:0:s,o=null==o?null:o,l=null==l?null:l,(c=null!=c&&c)&&d(),"object"==typeof e){switch(void 0===e.type||"section"===e.type?"entries":e.type){case"entries":h(this,!0);break;case"options":!function(t){e.entries&&(e.entries=e.entries.sort((e,t)=>e.name&&t.name?Object(a.ascSort)(e.name,t.name):e.name?-1:t.name?1:0),h(t,!1))}(this);break;case"list":if(e.items){t.push(`<ul ${e.style?`class="${e.style}"`:""}>`);for(let i=0;i<e.items.length;i++)this.recursiveEntryRender(e.items[i],t,s+1,`<li ${Object(a.isNonstandardSource)(e.items[i].source)?`class="${r.i}"`:""}>`,"</li>");t.push("</ul>")}break;case"table":!function(a){t.push("<table class='table'>"),void 0!==e.caption&&t.push(`<caption>${e.caption}</caption>`);if(t.push("<thead>"),t.push("<tr class='table-row table-row--header'>"),e.colLabels)for(let s=0;s<e.colLabels.length;++s)t.push(`<th ${r(s)}>${e.colLabels[s]}</th>`);t.push("</tr>"),t.push("</thead>"),t.push("<tbody>");for(let r=0;r<e.rows.length;++r){t.push("<tr class='table-row'>");for(let n=0;n<e.rows[r].length;++n)t.push(`<td ${i(n)}>`),a.recursiveEntryRender(e.rows[r][n],t,s+1),t.push("</td>");t.push("</tr>")}function r(t){return void 0===e.colStyles||t>=e.colStyles.length?"class='table-cell'":`class="table-cell ${e.colStyles[t]}"`}function i(t){return void 0!==e.rowStyles?void 0===e.rowStyles||t>=e.rowStyles.length?"class='table-cell'":`class="table-cell ${e.rowStyles[t]}"`:r(t)}t.push("</tbody>"),t.push("</table>")}(this);break;case"invocation":!function(e){h(e,!0)}(this);break;case"patron":!function(e){h(e,!1)}(this);break;case"abilityDc":d(),t.push(`<span class='spell-ability'><span>${e.name} save DC</span> = 8 + your proficiency bonus + your ${Object(a.utils_makeAttChoose)(e.attributes)}</span>`),p();break;case"abilityAttackMod":null!==o&&t.push(o),t.push(`<span class='spell-ability'><span>${e.name} attack modifier</span> = your proficiency bonus + your ${Object(a.utils_makeAttChoose)(e.attributes)}</span>`),null!==l&&t.push(l);break;case"inline":if(e.entries)for(let a=0;a<e.entries.length;a++)this.recursiveEntryRender(e.entries[a],t,s);break;case"bonus":t.push((e.value<0?"":"+")+e.value);break;case"bonusSpeed":t.push((e.value<0?"":"+")+e.value+"ft.");break;case"dice":t.push(n.getEntryDice(e));break;case"link":!function(e,s){let r;if("internal"===s.href.type){if(r=`${e.baseUrl}${s.href.path}#`,void 0!==s.href.hash&&(r+=s.href.hash,void 0!==s.href.subhashes))for(let e=0;e<s.href.subhashes.length;e++){const t=s.href.subhashes[e];r+=`,${Object(a.encodeForHash)(t.key)}:${Object(a.encodeForHash)(t.value)}`}}else"external"===s.href.type&&(r=s.href.url);t.push(`<a href='${r}'>${s.text}</a>`)}(this,e);break;case"item":t.push(`<li><b>${e.name}: </b>`),this.recursiveEntryRender(e.entry,t,s),t.push("</li>");break;case"print":t.push(u(e.entry))}}else"string"==typeof e?(d(),u(this),p()):(d(),t.push(e),p());function d(){null!==o&&t.push(o)}function p(){null!==l&&t.push(l)}function h(o,l){const c=s>=2,d=l?s+1:s,p=function(){const t=[];Object(a.isNonstandardSource)(e.source)&&t.push(r.i);c&&void 0!==e.name?t.push(n.HEAD_2):t.push(-1===s?n.HEAD_NEG_1:0===s?n.HEAD_0:n.HEAD_1);"invocation"!==e.type&&"patron"!==e.type||void 0===e.subclass||t.push(r.j);return t.length>0?`class="${t.join(" ")}"`:""}(),h=function(){let t="";if("invocation"===e.type||"patron"===e.type){const s=e.source?`title="Source: ${i.a.sourceJsonToFull(e.source)}"`:"";t=void 0!==e.subclass?`${r.f}="${e.subclass.name}" ${r.g}="${e.subclass.source}" ${s}`:`${r.f}="${n.DATA_NONE}" ${r.g}="${n.DATA_NONE}" ${s}`}return t}(),u=e.prerequisite?`<span class="prerequisite">Prerequisite: ${e.prerequisite}</span>`:"",A=void 0!==e.name?`<span class="stat-name">${e.name}${Object(a.isNonstandardSource)(e.source)?" (UA)":""}${c?".":""}</span> `:"";if(e.entries||e.name){if(t.push(`<${o.wrapperTag} ${h} ${p}>${A}${u}`),e.entries)for(let s=0;s<e.entries.length;s++)o.recursiveEntryRender(e.entries[s],t,d,"<p>","</p>");t.push(`</${o.wrapperTag}>`)}}function u(o){const l=function(){let t,s,a=0,r=!1;const i=[];let n="";for(let o=0;o<e.length;++o)switch(t=e.charAt(o),s=o<e.length-1?e.charAt(o+1):null,t){case"{":"@"===s?a++>0?n+=t:(i.push(n),r=!1,n=""):n+=t;break;case"}":0==--a?(i.push(n),n=""):n+=t;break;default:n+=t}n.length>0&&i.push(n);return i}();for(let e=0;e<l.length;e++){const d=l[e];if(null!=d&&""!==d)if("@"===d.charAt(0)){const[e,l]=[(c=d).substr(0,c.indexOf(" ")),c.substr(c.indexOf(" ")+1)];if("@bold"===e||"@b"===e||"@italic"===e||"@i"===e||"@skill"===e||"@action"===e)switch(e){case"@b":case"@bold":t.push("<b>"),o.recursiveEntryRender(l,t,s),t.push("</b>");break;case"@i":case"@italic":t.push("<i>"),o.recursiveEntryRender(l,t,s),t.push("</i>");break;case"@action":t.push(`<span title="${i.a.actionToExplanation(l)}" class="explanation">${l}</span>`);break;case"@skill":t.push(`<span title="${i.a.skillToExplanation(l)}" class="explanation">${l}</span>`)}else{const[i,c,d,...p]=l.split("|"),h=`${i}${c?`${r.n}${c}`:""}`,u={type:"link",href:{type:"internal",path:"",hash:Object(a.encodeForHash)(h)},text:d||i};switch(e){case"@spell":c||(u.href.hash+=r.n+r.hb),u.href.hash="/spells/"+u.href.hash,o.recursiveEntryRender(u,t,s);break;case"@item":c||(u.href.hash+=r.n+r.T),u.href.hash="/items/"+u.href.hash,o.recursiveEntryRender(u,t,s);break;case"@condition":c||(u.href.hash+=r.n+r.hb),u.href.hash="/conditions/"+u.href.hash,o.recursiveEntryRender(u,t,s);break;case"@class":const e=n.RE_INLINE_CLASS.exec(l);e&&(u.href.hash=e[1].trim(),u.href.subhashes=[{key:"sub",value:e[2].trim()+"~phb"}]),c||(u.href.hash+=r.n+r.hb),u.href.hash="/classes/"+u.href.hash,o.recursiveEntryRender(u,t,s);break;case"@creature":c||(u.href.hash+=r.n+r.cb),u.href.hash="/bestiary/"+u.href.hash,o.recursiveEntryRender(u,t,s);break;case"@filter":t.push(i);break;case"@damage":case"@dice":case"@book":t.push(i);break;case"@5etools":c.indexOf(".")>-1?u.href.hash="/"+c.substring(0,c.indexOf(".")):u.href.hash="/"+c,o.recursiveEntryRender(u,t,s)}}}else t.push(d)}var c}c&&p()}}n.getEntryDice=function(e){let t;if(e.number&&e.faces)t=String(e.number)+"d"+e.faces;else if(e.toRoll&&e.toRoll.length){for(let s of e.toRoll)t=String(s.number)+"d"+s.faces+" + ";t=t.substring(0,t.length-3)}return"undefined"!=typeof droll&&!0===e.rollable?`<span class='roller unselectable' onclick="if (this.rolled) { this.innerHTML = this.innerHTML.split('=')[0].trim()+' = '+droll.roll('${t}').total; } else { this.rolled = true; this.innerHTML += ' = '+droll.roll('${t}').total; }">${t}</span>`:t},n.RE_INLINE_CLASS=/(.*?) \((.*?)\)/,n.HEAD_NEG_1="statsBlockSectionHead",n.HEAD_0="statsBlockHead",n.HEAD_1="statsBlockSubHead",n.HEAD_2="statsInlineHead",n.DATA_NONE="data-none",t.a=n},112:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return o}));var a=s(105),r=s(5),i=s(1);const n=new a.a;function o(e,t,s){(t.querySelector(".selection-wrapper")||t).innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="margin-bottom_small">\n\t\t\t<span class="type"></span><span class="rarity"></span>\n\t\t\t<span class="attunement"></span>\n\t\t</div>\n\t\t<div class="margin-bottom_small">\n\t\t\t<span class="value"></span><span class="weight"></span>\n\t\t</div>\n\t\t<div class="margin-bottom_small">\n\t\t\t<span class="damage"></span>\n\t\t\t<span class="damageType"></span>\n\t\t\t<span class="properties"></span>\n\t\t</div>\n\t\t<div class="text"></div>\n\t\t<div class="margin-bottom_small">Source: <span class="source"></span></div>\n\t</div>';const a=e.source,o=r.a.sourceJsonToFull(a);t.querySelector(".stats-wrapper .source").innerHTML=`${o}, page ${e.page}`,t.querySelector(".stats-wrapper .value").innerHTML=e.value?e.value+(e.weight?", ":""):"",t.querySelector(".stats-wrapper .weight").innerHTML=e.weight?e.weight+(1==e.weight?" lb.":" lbs."):"",t.querySelector(".stats-wrapper .rarity").innerHTML=(e.tier?", "+e.tier:"")+(e.rarity?", "+e.rarity:""),t.querySelector(".stats-wrapper .attunement").innerHTML=e.reqAttune?e.reqAttune:"",t.querySelector(".stats-wrapper .type").innerHTML=e.typeText,t.querySelector(".stats-wrapper .damage").innerHTML="",t.querySelector(".stats-wrapper .damageType").innerHTML="";const l=e.type||"";if(e.weaponCategory)e.dmg1&&(t.querySelector(".stats-wrapper .damage").innerHTML=Object(i.utils_makeRoller)(e.dmg1)),e.dmgType&&(t.querySelector(".stats-wrapper .damageType").innerHTML=r.a.dmgTypeToFull(e.dmgType));else if("LA"===l||"MA"===l||"HA"===l)t.querySelector(".stats-wrapper .damage").innerHTML="AC "+e.ac+("LA"===l?" + Dex":"MA"===l?" + Dex (max 2)":"");else if("S"===l)t.querySelector(".stats-wrapper .damage").innerHTML="AC +"+e.ac;else if("MNT"===l||"VEH"===l){const s=e.speed,a=e.carryingcapacity;s&&t.querySelector(".stats-wrapper .damage").append("Speed="+s),s&&a&&t.querySelector(".stats-wrapper .damage").append("MNT"===l?", ":"<br>"),a&&(t.querySelector(".stats-wrapper .damage").append("Carrying Capacity="+a),-1===a.indexOf("ton")&&-1===a.indexOf("passenger")&&t.querySelector(".stats-wrapper .damage").append(1==a?" lb.":" lbs."))}if(t.querySelector(".stats-wrapper .properties").innerHTML="",e.property){const s=e.property.split(",");for(let a=0;a<s.length;a++){const r=s[a];let n=window.itemPropertyList[r].name;"V"===r&&(n=`${n} (${Object(i.utils_makeRoller)(e.dmg2)})`),"T"!==r&&"A"!==r&&"AF"!==r||(n=`${n} (${e.range}ft.)`),"RLD"===r&&(n=`${n} (${e.reload} shots)`),n=(a>0?", ":e.dmg1?"- ":"")+n,t.querySelector(".stats-wrapper .properties").append(n)}}const c={type:"entries",entries:e.entries},d=[];n.recursiveEntryRender(c,d,1),t.querySelector(".stats-wrapper .text").innerHTML=Object(i.utils_makeRoller)(d.join("")).split(e.name.toLowerCase()).join("<i>"+e.name.toLowerCase()+"</i>"),s&&t.querySelector(".margin-bottom_small").remove()}},116:function(e,t,s){"use strict";s(110),s(109)},124:function(e,t,s){"use strict";s.r(t);var a=s(7),r=s(18),i=s(105),n=s(107),o=s(1),l=s(112),c=(s(116),s(117),s(44),s(13));const d=c.a`<dom-module id="lumo-grid-sorter" theme-for="vaadin-grid-sorter">
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
</dom-module>`;document.head.appendChild(d.content);s(71),s(29);var p=s(19),h=s(41);
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
const u=document.createElement("template");u.innerHTML="<custom-style>\n  <style>\n    @font-face {\n      font-family: 'vaadin-grid-sorter-icons';\n      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAQwAA0AAAAABuwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAEFAAAABkAAAAcfep+mUdERUYAAAP4AAAAHAAAAB4AJwAOT1MvMgAAAZgAAAA/AAAAYA8TBPpjbWFwAAAB7AAAAFUAAAFeF1fZ4mdhc3AAAAPwAAAACAAAAAgAAAAQZ2x5ZgAAAlgAAABcAAAAnMvguMloZWFkAAABMAAAAC8AAAA2C5Ap72hoZWEAAAFgAAAAHQAAACQGbQPHaG10eAAAAdgAAAAUAAAAHAoAAABsb2NhAAACRAAAABIAAAASAIwAYG1heHAAAAGAAAAAFgAAACAACwAKbmFtZQAAArQAAAECAAACZxWCgKhwb3N0AAADuAAAADUAAABZCrApUXicY2BkYGAA4rDECVrx/DZfGbhZGEDgyqNPOxH0/wNMq5kPALkcDEwgUQBWRA0dAHicY2BkYGA+8P8AAwMLAwgwrWZgZEAFbABY4QM8AAAAeJxjYGRgYOAAQiYGEICQSAAAAi8AFgAAeJxjYGY6yziBgZWBgWkm0xkGBoZ+CM34msGYkZMBFTAKoAkwODAwvmRiPvD/AIMDMxCD1CDJKjAwAgBktQsXAHicY2GAAMZQCM0EwqshbAALxAEKeJxjYGBgZoBgGQZGBhCIAPIYwXwWBhsgzcXAwcAEhIwMCi+Z/v/9/x+sSuElA4T9/4k4K1gHFwMMMILMY2QDYmaoABOQYGJABUA7WBiGNwAAJd4NIQAAAAAAAAAACAAIABAAGAAmAEAATgAAeJyNjLENgDAMBP9tIURJwQCMQccSZgk2i5fIYBDAidJjycXr7x5EPwE2wY8si7jmyBNXGo/bNBerxJNrpxhbO3/fEFpx8ZICpV+ghxJ74fAMe+h7Ox14AbrsHB14nK2QQWrDMBRER4mTkhQK3ZRQKOgCNk7oGQqhhEIX2WSlWEI1BAlkJ5CDdNsj5Ey9Rncdi38ES+jzNJo/HwTgATcoDEthhY3wBHc4CE+pfwsX5F/hGe7Vo/AcK/UhvMSz+mGXKhZU6pww8ISz3oWn1BvhgnwTnuEJf8Jz1OpFeIlX9YULDLdFi4ASHolkSR0iuYdjLak1vAequBhj21D61Nqyi6l3qWybGPjySbPHGScGJl6dP58MYcQRI0bts7mjebBqrFENH7t3qWtj0OuqHnXcW7b0HOTZFnKryRGW2hFX1m0O2vEM3opNMfTau+CS6Z3Vx6veNnEXY6jwDxhsc2gAAHicY2BiwA84GBgYmRiYGJkZmBlZGFkZ2djScyoLMgzZS/MyDQwMwLSrpYEBlIbxjQDrzgsuAAAAAAEAAf//AA94nGNgZGBg4AFiMSBmYmAEQnYgZgHzGAAD6wA2eJxjYGBgZACCKyoz1cD0o087YTQATOcIewAAAA==) format('woff');\n      font-weight: normal;\n      font-style: normal;\n    }\n  </style>\n</custom-style>",document.head.appendChild(u.content);class A extends(Object(p.a)(Object(h.a)(a.a))){static get template(){return c.a`
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
`}static get is(){return"vaadin-grid-sorter"}static get properties(){return{path:String,direction:{type:String,reflectToAttribute:!0,notify:!0,value:null},_order:{type:Number,value:null},_isConnected:{type:Boolean,value:!1}}}static get observers(){return["_pathOrDirectionChanged(path, direction, _isConnected)","_directionOrOrderChanged(direction, _order)"]}ready(){super.ready(),this.addEventListener("click",this._onClick.bind(this))}connectedCallback(){super.connectedCallback(),this._isConnected=!0}disconnectedCallback(){super.disconnectedCallback(),this._isConnected=!1}_pathOrDirectionChanged(e,t,s){void 0!==e&&void 0!==t&&void 0!==s&&s&&this.dispatchEvent(new CustomEvent("sorter-changed",{bubbles:!0,composed:!0}))}_getDisplayOrder(e){return null===e?"":e+1}_onClick(e){const t=this.getRootNode().activeElement;this!==t&&this.contains(t)||(e.preventDefault(),"asc"===this.direction?this.direction="desc":"desc"===this.direction?this.direction=null:this.direction="asc")}_directionOrOrderChanged(e,t){void 0!==e&&void 0!==t&&(/^((?!chrome|android).)*safari/i.test(navigator.userAgent)&&this.root&&this.root.querySelectorAll("*").forEach((function(e){e.style["-webkit-backface-visibility"]="visible",e.style["-webkit-backface-visibility"]=""})))}}customElements.define(A.is,A);var m=s(123);
/**
@license
Copyright (c) 2018 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/class b extends m.a{static get template(){return c.a`
    <template class="header" id="headerTemplate">
      <vaadin-grid-sorter path="[[path]]" direction="{{direction}}">[[_getHeader(header, path)]]</vaadin-grid-sorter>
    </template>
`}static get is(){return"vaadin-grid-sort-column"}static get properties(){return{path:String,direction:{type:String,notify:!0}}}_prepareHeaderTemplate(){const e=this._prepareTemplatizer(this.$.headerTemplate);return e.templatizer.dataHost=this,e}_getHeader(e,t){return e||this._generateHeader(t)}}customElements.define(b.is,b);class f extends a.a{static get properties(){return{classEquipment:{type:String},inventory:{type:Array},hasClass:{type:Boolean,value:!1},hasBackground:{type:Boolean,value:!1},isEditMode:{type:Boolean,value:!1}}}constructor(){super(),this.renderer=new i.a}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(r.E)()),Object(r.m)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(n.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(n.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(r.m)().removeEventListener("character-selected",this.characterChangeHandler),Object(n.b)().removeEventListener("editModeChange",this.editModeHandler)}ready(){super.ready(),setTimeout(()=>{this.$.grid.rowDetailsRenderer=((e,t,s)=>{e.firstElementChild||(e.innerHTML='<div class="details" id="stats"></div>');const a=e.querySelector(".details");Object(o.jqEmpty)(a),Object(l.renderSelection)(s.item,a,!0)}).bind(this)},0)}async updateFromCharacter(e){if(this.hasClass=!1,this.hasBackground=!1,this.$.backgroundEquipment.innerHTML="",this.$.classEquipment.innerHTML="",e){const t=await Object(r.A)(e);let s;if(e.levels&&e.levels.length>0){s=(await Object(r.r)())[e.levels[0].name],this.hasClass=!0,this.$.classEquipment.innerHTML=this.parseClassEquipment(s.startingEquipment)}else this.$.classEquipment.innerHTML="";if(!s||s.startingEquipment.additionalFromBackground){const e=await Object(r.i)();if(e){if(this.hasBackground=!0,this.$.backgroundEquipment.innerHTML=this.parseBackgroundEquipment(e.entries),e.entries){Object(o.entrySearch)("Equipment",e.entries)}}else this.$.backgroundEquipment.innerHTML=""}else this.$.backgroundEquipment.innerHTML="";this.inventory=t,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}}parseClassEquipment(e){if(e){return`${e.additionalFromBackground?"<p>You start with the following items, plus anything provided by your background.</p>":""}${0===e.default.length?"":`<ul><li>${e.default.map(e=>this.renderStr(e)).join("</li><li>")}</ul>`}${void 0===e.goldAlternative?"":`<p>Alternatively, you may start with ${this.renderStr(e.goldAlternative)} gp to buy your own equipment.</p>`}`}}parseBackgroundEquipment(e){if(e){const t=Object(o.entrySearch)("Equipment",e);return`<p>${this.renderStr(t.entry)}</p>`}}renderStr(e){let t=[];return this.renderer.recursiveEntryRender(e,t,0),t.join(" ")}_expandDetails(e){let t=e.model.__data.item,s=this.$.grid.detailsOpenedItems.indexOf(t)>-1;for(let e of this.$.grid.detailsOpenedItems)this.$.grid.closeItemDetails(e);s?this.$.grid.closeItemDetails(t):this.$.grid.openItemDetails(t),this.$.grid.notifyResize()}_flashCheckbox(e){e&&(e.classList.add("transition-bg"),e.classList.add("flash-error"),setTimeout(()=>{e.classList.remove("flash-error"),setTimeout(()=>{e.classList.remove("transition-bg")},200)},200))}_deleteItem(e){let t=e.model.__data.item&&void 0!==e.model.__data.item.id?e.model.__data.item.id:void 0;Object(r.O)(t)}async _setItemEquiped(e){e.preventDefault(),e.stopPropagation();let t=e.model.__data.item&&e.model.__data.item.id?e.model.__data.item.id:void 0;if(!(!e.model.__data.item||!e.model.__data.item.isEquiped)&&e.model.__data.item.isEquiped)Object(r.gb)(t);else if(await Object(r.e)(e.model.__data.item))Object(r.gb)(t);else{let t=e.target.querySelector("vaadin-checkbox");this._flashCheckbox(t)}}async _setItemAttuned(e){e.preventDefault(),e.stopPropagation();let t=e.model.__data.item&&e.model.__data.item.id?e.model.__data.item.id:void 0;if(!(!e.model.__data.item||!e.model.__data.item.isAttuned)&&e.model.__data.item.isAttuned)Object(r.fb)(t);else if(await Object(r.d)(e.model.__data.item))Object(r.fb)(t);else{let t=e.target.querySelector("vaadin-checkbox");this._flashCheckbox(t)}}_preventDefault(e){e.preventDefault(),e.stopPropagation()}_or(...e){for(let t of e)if(t)return!0;return!1}static get template(){return a.b`
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
    `}}customElements.define("dnd-character-builder-equipment",f)}}]);
//# sourceMappingURL=6.bundle.js.map