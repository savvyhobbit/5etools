(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{116:function(e,t,s){"use strict";var l=s(7),o=s(69);s(81),s(133);class n extends l.a{static get properties(){return{label:{type:String,value:""},icon:{type:String,value:""},svg:{type:String,value:""},background:{type:String,value:""},border:{type:String,value:""},svgFill:{type:String,value:""},svgStroke:{type:String,value:""}}}connectedCallback(){setTimeout(()=>{this.button=new o.a(this.$.button)},10)}_exists(e){return!!e}_styleStr(e,t,s){let l="";return e&&(l+=`background: ${e}; `),t&&(l+=`border: ${t}; `),l}_svgStyleStr(e,t){let s="";return e&&(s+=`fill: ${e}; `),t&&(s+=`stroke: ${t}; `),s}static get template(){return l.b`
      <style include="material-styles">
        .mdc-tab-scroller__scroll-area--scroll {
          overflow-x: auto;
          background-color: var(--mdc-theme-surface);
          border: 1px solid var(--mdc-theme-text-divider-on-background);
          border-bottom: none;
        }
        :host {
          display: inline;
          overflow: hidden;
          white-space: nowrap;
          border-radius: 6px;
        }
        .mdc-button {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
        .mdc-button .mdc-button__icon {
          margin-right: 0px;
          margin-left: 8px;
        }
        .mdc-button [background] {
          background: var(--lumo-contrast-10pct);
        }
        dnd-svg {
          height: 20px;
          width: 20px;
          flex-shrink: 0;
          flex-grow: 0;
          padding-left: 8px;
          fill: var(--mdc-theme-primary);
          stroke: var(--mdc-theme-primary);
        }
        i {
          flex-shrink: 0;
          flex-grow: 0;
        }

        
        :host(.btn-field__btn) dnd-svg {
          padding-left: 0;
        }
        :host(.btn-field__btn) i {
          margin-left: 0;
        }

        :host(.icon-only) dnd-svg {
          margin-left: -24px;
          padding-left: 0;
        }
        :host(.icon-only) i {
          margin-left: 0;
          padding-left: 0;
        }
        :host(.hard-left) i {
          margin-left: -24px;
        }

        :host(.link) .mdc-button__label {
          text-transform: none;
          color: var(--lumo-body-text-color);
          letter-spacing: normal;
        }
        :host(.link) i {
          color: var(--lumo-body-text-color);
        }
        :host(.link) button:hover::before {
          background: none;
        }
        :host(.link) button:hover i,
        :host(.link) button:hover .mdc-button__label {
          color: var(--mdc-theme-secondary);
        }

        :host([edit-mode]) button {
          background-color: var(--mdc-theme-secondary);
          color: var(--mdc-theme-on-secondary)
        }
        :host([edit-mode]) .mdc-button__label {
          color: var(--mdc-theme-on-primary);
        }
        :host([edit-mode]) i {
          color: var(--mdc-theme-on-primary);
        }
        :host([edit-mode]) button:hover i,
        :host([edit-mode]) button:hover .mdc-button__label {
          color: var(--mdc-theme-on-secondary);
        }

        :host([not-edit-mode]) button {
          background-color: var(--mdc-theme-primary);
          color: var(--mdc-theme-on-primary);
        }
        :host([not-edit-mode]) .mdc-button__label {
          color: var(--mdc-theme-on-primary);
        }
        :host([not-edit-mode]) i {
          color: var(--mdc-theme-on-primary);
        }
        :host([not-edit-mode]) button:hover i,
        :host([not-edit-mode]) button:hover .mdc-button__label {
          color: var(--mdc-theme-on-primary);
        }

      </style>
      <button id="button" class="mdc-button" style$="[[_styleStr(background, border, label)]]">
        <div class="mdc-button__ripple"></div>
        <span class="mdc-button__label">[[label]]</span>
        <slot name="label"></slot>
        <template is="dom-if" if="[[_exists(icon)]]">
          <i class="material-icons mdc-button__icon" aria-hidden="true">[[icon]]</i>
        </template>
        <template is="dom-if" if="[[_exists(svg)]]">
          <dnd-svg id="[[svg]]" style$="[[_svgStyleStr(svgFill, svgStroke)]]"></dnd-svg>
        </template>
      </button>
    `}}customElements.define("dnd-button",n)},120:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return r})),s.d(t,"spellHtml",(function(){return a}));var l=s(71),o=s(5);const n=new l.a;function r(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t</div>';const s=a(e);t.querySelector(".stats-wrapper").innerHTML=s}function a(e){const t=[];if(t.push(`<div class="margin-bottom_small"><span class="source source${e.source}" title="${o.a.sourceJsonToAbv(e.source)}">${o.a.sourceJsonToFull(e.source)}</div>`),t.push(`<div class="margin-bottom_small"><span>${o.a.spLevelSchoolMetaToFull(e.level,e.school,e.meta)}</span></div>`),t.push(`<div class="margin-bottom_small"><span class="stat-name">Casting Time: </span>${o.a.spTimeListToFull(e.time)}</div>`),t.push(`<div class="margin-bottom_small"><span class="stat-name">Range: </span>${o.a.spRangeToFull(e.range)}</div>`),t.push(`<div class="margin-bottom_small"><span class="stat-name">Components: </span>${o.a.spComponentsToFull(e.components)}</div>`),t.push(`<div class="margin-bottom_med"><span class="stat-name">Duration: </span>${o.a.spDurationToFull(e.duration)}</div>`),t.push("<div class='text'>"),n.recursiveEntryRender({type:"entries",entries:e.entries},t,1),e.entriesHigherLevel){const s={type:"entries",entries:e.entriesHigherLevel};n.recursiveEntryRender(s,t,2)}if(t.push("</div>"),t.push(`<div class="margin-bottom_med"><span class="stat-name">Classes: </span>${o.a.spMainClassesToFull(e.classes)}</div>`),e.classes&&e.classes.fromSubclass){const s=o.a.spSubclassesToCurrentAndLegacyFull(e.classes);t.push(`<div class="margin-bottom_med"><span class="stat-name">Subclasses: </span>${s[0]}</div>`),s[1]&&t.push(`<div class="mdc-theme--text-disabled-on-background margin-bottom_med"><span class="stat-name">Subclasses (legacy): </span>${s[1]}</div>`)}return e.scrollNote&&(t.push('<div class="mdc-theme--text-disabled-on-background">'),n.recursiveEntryRender("{@italic Note: Both the {@class Fighter (Eldritch Knight)} and the {@class Rogue (Arcane Trickster)} spell lists include all {@class Wizard} spells. Spells of 5th level or higher may be cast with the aid of a spell scroll or similar.}",t,2),t.push("</div>")),t.join("")}},145:function(e,t,s){"use strict";s(144),s(135)},147:function(e,t,s){"use strict";s(85)},151:function(e,t,s){"use strict";s(45),s(39);var l=s(13);const o=l.a`<dom-module id="lumo-grid-tree-toggle" theme-for="vaadin-grid-tree-toggle">
  <template>
    <style>
      :host {
        --vaadin-grid-tree-toggle-level-offset: 2em;
        align-items: center;
        vertical-align: middle;
        margin-left: calc(var(--lumo-space-s) * -1);
        -webkit-tap-highlight-color: transparent;
      }

      :host(:not([leaf])) {
        cursor: default;
      }

      [part="toggle"] {
        display: inline-block;
        font-size: 1.5em;
        line-height: 1;
        width: 1em;
        height: 1em;
        text-align: center;
        color: var(--lumo-contrast-50pct);
        /* Increase touch target area */
        padding: calc(1em / 3);
        margin: calc(1em / -3);
      }

      :host(:not([dir="rtl"])) [part="toggle"] {
        margin-right: 0;
      }

      @media (hover: hover) {
        :host(:hover) [part="toggle"] {
          color: var(--lumo-contrast-80pct);
        }
      }

      [part="toggle"]::before {
        font-family: "lumo-icons";
        display: inline-block;
        height: 100%;
      }

      :host(:not([expanded])) [part="toggle"]::before {
        content: var(--lumo-icons-angle-right);
      }

      :host([expanded]) [part="toggle"]::before {
        content: var(--lumo-icons-angle-right);
        transform: rotate(90deg);
      }

      /* Experimental support for hierarchy connectors, using an unsupported selector */
      :host([theme~="connectors"]) #level-spacer {
        position: relative;
        z-index: -1;
        font-size: 1em;
        height: 1.5em;
      }

      :host([theme~="connectors"]) #level-spacer::before {
        display: block;
        content: "";
        margin-top: calc(var(--lumo-space-m) * -1);
        height: calc(var(--lumo-space-m) + 3em);
        background-image: linear-gradient(to right, transparent calc(var(--vaadin-grid-tree-toggle-level-offset) - 1px), var(--lumo-contrast-10pct) calc(var(--vaadin-grid-tree-toggle-level-offset) - 1px));
        background-size: var(--vaadin-grid-tree-toggle-level-offset) var(--vaadin-grid-tree-toggle-level-offset);
        background-position: calc(var(--vaadin-grid-tree-toggle-level-offset) / 2 - 2px) 0;
      }

      /* RTL specific styles */

      :host([dir="rtl"]) {
        margin-left: 0;
        margin-right: calc(var(--lumo-space-s) * -1);
      }

      :host([dir="rtl"]) [part="toggle"] {
        margin-left: 0;
      }

      :host([dir="rtl"][expanded]) [part="toggle"]::before {
        transform: rotate(-90deg);
      }

      :host([dir="rtl"][theme~="connectors"]) #level-spacer::before {
        background-image: linear-gradient(to left, transparent calc(var(--vaadin-grid-tree-toggle-level-offset) - 1px), var(--lumo-contrast-10pct) calc(var(--vaadin-grid-tree-toggle-level-offset) - 1px));
        background-position: calc(100% - (var(--vaadin-grid-tree-toggle-level-offset) / 2 - 2px)) 0;
      }

      :host([dir="rtl"]:not([expanded])) [part="toggle"]::before,
      :host([dir="rtl"][expanded]) [part="toggle"]::before {
        content: var(--lumo-icons-angle-left);
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild(o.content);var n=s(7),r=(s(31),s(15)),a=s(19),i=s(42),d=s(9);
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
const c=document.createElement("template");c.innerHTML="<custom-style>\n  <style>\n    @font-face {\n      font-family: \"vaadin-grid-tree-icons\";\n      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAQkAA0AAAAABrwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAECAAAABoAAAAcgHwa6EdERUYAAAPsAAAAHAAAAB4AJwAOT1MvMgAAAZQAAAA/AAAAYA8TBIJjbWFwAAAB8AAAAFUAAAFeGJvXWmdhc3AAAAPkAAAACAAAAAgAAAAQZ2x5ZgAAAlwAAABLAAAAhIrPOhFoZWFkAAABMAAAACsAAAA2DsJI02hoZWEAAAFcAAAAHQAAACQHAgPHaG10eAAAAdQAAAAZAAAAHAxVAgBsb2NhAAACSAAAABIAAAASAIAAVG1heHAAAAF8AAAAGAAAACAACgAFbmFtZQAAAqgAAAECAAACTwflzbdwb3N0AAADrAAAADYAAABZQ7Ajh3icY2BkYGAA4twv3Vfi+W2+MnCzMIDANSOmbGSa2YEZRHEwMIEoAAoiB6sAeJxjYGRgYD7w/wADAwsDCDA7MDAyoAI2AFEEAtIAAAB4nGNgZGBg4GBgZgDRDAxMDGgAAAGbABB4nGNgZp7JOIGBlYGBaSbTGQYGhn4IzfiawZiRkwEVMAqgCTA4MDA+38d84P8BBgdmIAapQZJVYGAEAGc/C54AeJxjYYAAxlAIzQTELAwMBxgZGB0ACy0BYwAAAHicY2BgYGaAYBkGRgYQiADyGMF8FgYbIM3FwMHABISMDArP9/3/+/8/WJXC8z0Q9v8nEp5gHVwMMMAIMo+RDYiZoQJMQIKJARUA7WBhGN4AACFKDtoAAAAAAAAAAAgACAAQABgAJgA0AEIAAHichYvBEYBADAKBVHBjBT4swl9KS2k05o0XHd/yW1hAfBFwCv9sIlJu3nZaNS3PXAaXXHI8Lge7DlzF7C1RgXc7xkK6+gvcD2URmQB4nK2RQWoCMRiFX3RUqtCli65yADModOMBLLgQSqHddRFnQghIAnEUvEA3vUUP0LP0Fj1G+yb8R5iEhO9/ef/7FwFwj28o9EthiVp4hBlehcfUP4Ur8o/wBAv8CU+xVFvhOR7UB7tUdUdlVRJ6HnHWTnhM/V24In8JT5j/KzzFSi2E53hUz7jCcrcIiDDwyKSW1JEct2HdIPH1DFytbUM0PofWdNk5E5oUqb/Q6HHBiVGZpfOXkyUMEj5IyBuNmYZQjBobfsuassvnkKLe1OuBBj0VQ8cRni2xjLWsHaM0jrjx3peYA0/vrdmUYqe9iy7bzrX6eNP7Jh1SijX+AaUVbB8AAHicY2BiwA84GBgYmRiYGJkZmBlZGFkZ2djScyoLMgzZS/MyDQwMwLSruZMzlHaB0q4A76kLlwAAAAEAAf//AA94nGNgZGBg4AFiMSBmYmAEQnYgZgHzGAAD6wA2eJxjYGBgZACCKxJigiD6mhFTNowGACmcA/8AAA==) format('woff');\n      font-weight: normal;\n      font-style: normal;\n    }\n  </style>\n</custom-style>",document.head.appendChild(c.content);class p extends(Object(a.a)(Object(i.a)(n.a))){static get template(){return l.a`
    <style>
      :host {
        display: inline-flex;
        align-items: baseline;

        /* CSS API for :host */
        --vaadin-grid-tree-toggle-level-offset: 1em;

        /*
          ShadyCSS seems to polyfill :dir(rtl) only for :host, thus using
          a host custom CSS property for ltr/rtl toggle icon choice.
         */
        ---collapsed-icon: "\\e7be\\00a0";
      }

      :host(:dir(rtl)) {
        ---collapsed-icon: "\\e7bd\\00a0";
      }

      :host([hidden]) {
        display: none !important;
      }

      :host(:not([leaf])) {
        cursor: pointer;
      }

      #level-spacer,
      [part="toggle"] {
        flex: none;
      }

      #level-spacer {
        display: inline-block;
        width: calc(var(---level, '0') * var(--vaadin-grid-tree-toggle-level-offset));
      }

      [part="toggle"]::before {
        font-family: "vaadin-grid-tree-icons";
        line-height: 1em; /* make icon font metrics not affect baseline */
      }

      :host(:not([expanded])) [part="toggle"]::before {
        content: var(---collapsed-icon);
      }

      :host([expanded]) [part="toggle"]::before {
        content: "\\e7bc\\00a0"; /* icon glyph + single non-breaking space */
      }

      :host([leaf]) [part="toggle"] {
        visibility: hidden;
      }
    </style>

    <span id="level-spacer"></span>
    <span part="toggle"></span>
    <slot></slot>
`}static get is(){return"vaadin-grid-tree-toggle"}static get properties(){return{level:{type:Number,value:0,observer:"_levelChanged"},leaf:{type:Boolean,value:!1,reflectToAttribute:!0},expanded:{type:Boolean,value:!1,reflectToAttribute:!0,notify:!0}}}ready(){super.ready(),this.addEventListener("click",e=>this._onClick(e))}_onClick(e){this.leaf||(e.preventDefault(),this.expanded=!this.expanded)}_levelChanged(e){const t=Number(e).toString();this.style["---level"]=t,this._debouncerUpdateLevel=r.a.debounce(this._debouncerUpdateLevel,d.c,()=>this.updateStyles({"---level":t}))}}customElements.define(p.is,p)},162:function(e,t,s){"use strict";s.r(t);var l=s(7),o=(s(134),s(151),s(17)),n=s(32),r=s(142),a=s(120),i=s(1),d=s(5);s(145),s(147),s(116);class c extends l.a{static get properties(){return{spellsKnown:{type:Object,value:{}},preparedSpells:{type:Object,value:{}},noContentMessage:{type:Boolean,value:!1},isEditMode:{type:Boolean,value:!1},filterStr:{type:String,value:"",observer:"_filterChange"},expandedItems:{type:Array}}}static get observers(){return["_expandedItemsChange(expandedItems.*)"]}_expandedItemsChange(){window.scrollTo(0,this.originalScrollHeight)}_recordScrollHeight(){this.originalScrollHeight=window.scrollY}__filterChangeThrottled(){this.filterStr.length?(this.oldExpanded||(this.oldExpanded=this.$.grid.expandedItems),this.expandAll(),this.$.grid.clearCache(),setTimeout(()=>{this.expandAll()},10)):(this.oldExpanded&&(this.$.grid.expandedItems=this.oldExpanded,this.oldExpanded=void 0),this.$.grid.clearCache())}constructor(){super(),this._filterChange=Object(i.debounce)(this.__filterChangeThrottled.bind(this),250)}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.refresh=!0,this.updateFromCharacter(Object(o.F)()),Object(o.l)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode,this.refresh=!0,this.updateFromCharacter(Object(o.F)())},Object(r.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(r.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(o.l)().removeEventListener("character-selected",this.characterChangeHandler),Object(r.b)().removeEventListener("editModeChange",this.editModeHandler)}ready(){super.ready(),this.multiclassSlotsDef=[[2],[3],[4,2],[4,3],[4,3,2],[4,3,3],[4,3,3,1],[4,3,3,2],[4,3,3,3,1],[4,3,3,3,2],[4,3,3,3,2,1],[4,3,3,3,2,1],[4,3,3,3,2,1,1],[4,3,3,3,2,1,1],[4,3,3,3,2,1,1,1],[4,3,3,3,2,1,1,1],[4,3,3,3,2,1,1,1,1],[4,3,3,3,3,1,1,1,1],[4,3,3,3,3,2,1,1,1],[4,3,3,3,3,2,2,1,1]],this.fullCasterSlotsDef=[],this.halfCasterSlotsDef=[],this.thirdCasterSlotsDef=[],setTimeout(()=>{this.$.grid.dataProvider=((e,t)=>{const s=e.page*e.pageSize;let l=e.parentItem?e.parentItem.children:this.spellDisplay;if(this.filterStr.length&&(l=l.filter(e=>this.hasDecendentWithFilter(e,this.filterStr.toLowerCase()))),l&&l.length){t(l.slice(s,s+e.pageSize),l.length)}}).bind(this)},0)}hasDecendentWithFilter(e,t){if(!e.name||e.name.toLowerCase().indexOf(t)>-1)return!0;const s=e.length?e:e.children;if(s&&s.length)for(let e of s)return this.hasDecendentWithFilter(e,t);return!1}clearFilterStr(){this.filterStr=""}expandAll(){this.$.grid.expandedItems=this.findExpandables(this.spellDisplay)}findExpandables(e,t=[]){"level"!==e.id&&"class"!==e.id||t.push(e);const s=e.length?e:e.children;if(s&&s.length)for(let e of s)this.findExpandables(e,t);return t}async updateSpellStats(e,t){if(t&&e){const s=[],l=Object.entries(t).reduce((e,[t,s])=>e+s,0),n=Object(i.getProfBonus)(l);for(const[l,r]of Object.entries(t)){const t=e[l];if(t.casterProgression){const e=s.find(e=>t.spellcastingAbility===e.spellcastingAbility);if(e)e.classes.push(l);else{const e=await Object(o.h)(t.spellcastingAbility),r=e+n,a=8+r;s.push({classes:[l],mod:e,spellAttackBonus:r,dc:a,spellcastingAbility:t.spellcastingAbility})}}}this.spellMods=s}else this.spellMods=[]}async updateFromCharacter(e){if(e&&this.refresh){this.noContentMessage=!0;const t=await Object(o.s)(e),s=Object(o.r)(e),l=[],r={};let a=[];this.updateSpellStats(t,s);for(const[i,d]of Object.entries(s)){const s=t[i];let c=s,p=!1,m=s.classTableGroups,h=i;if(!c.casterProgression){const t=Object(o.J)(s);if(d>=t&&e.subclasses&&e.subclasses[i]&&s.subclasses&&s.subclasses.length){const t=s.subclasses.find(t=>e.subclasses[i].name===t.name);t&&t.casterProgression&&(c=t,h=t.shortName,m=t.subclassTableGroups,p=!0)}}if(c.casterProgression){let t;this.noContentMessage=!1;let u,g,b,f="known";if(m.forEach(e=>{if(e.colLabels&&e.colLabels.length){const s=e.colLabels.findIndex(e=>e.toLowerCase().indexOf("spells known")>-1);s>-1&&e.rows&&e.rows.length>d-1&&(t=e.rows[d-1][s]);const l=e.colLabels.findIndex(e=>e.toLowerCase().indexOf("cantrips known")>-1);l>-1&&e.rows&&e.rows.length>d-1&&(u=e.rows[d-1][l]);const o=e.colLabels.findIndex(e=>e.toLowerCase().indexOf("slot level")>-1);if(o>-1&&e.rows&&e.rows.length>d-1){const t=e.rows[d-1][o].match(/(\d+)/g);t&&t.length&&(g=parseInt(t[0]))}const n=e.colLabels.findIndex(e=>e.toLowerCase().indexOf("spell slots")>-1);n>-1&&e.rows&&e.rows.length>d-1&&(b=e.rows[d-1][n])}}),void 0===t){f="prepared";const e="full"===c.casterProgression?1:.51,s=await Object(o.h)(c.spellcastingAbility);t=Math.floor(d*e)+s,t=t<1?1:t}let v,A=[];if(p)v=c.shortName;else{let t=c.name.indexOf("(Revised)")>-1?"PHB":c.source,l=c.name.indexOf("(Revised)")>-1?c.name.replaceAll("(Revised)","").trim():c.name;A=await Object(n.a)("spells",{key:"classes.fromClassList",value:{name:l,source:t}});const r=Object(o.J)(s);d>=r&&(v=e.subclasses&&e.subclasses[i]?e.subclasses[i].shortName:"")}if(v){"Eldritch Knight"===v&&(A=await Object(n.a)("spells",{key:"classes.fromClassList",value:{name:"wizard",source:"phb"}}));let t=await Object(n.a)("spells",{key:"classes.fromSubclass",value:{"subclass.name":v,"class.name":i,"class.source":s.source}});if("Divine Soul"===v){let s=Object(o.I)(i.toLowerCase(),v.toLowerCase(),d,"Divine Magic Affinity",e);t=s?t.filter(e=>s.indexOf(e.name)>-1):[]}t=t.map(e=>({...e,isSubclassSpell:!0})),A=[...new Set(A.concat(t))]}if("Divine Soul"===v){let e=await Object(n.a)("spells",{key:"classes.fromClassList",value:{name:"cleric",source:"phb"}});A=[...new Set(A.concat(e))]}const x=m.find(e=>"Spell Slots"===e.title);let w;if(x)w=x.rowsSpellProgression[d-1].filter(e=>0!==e);else{w=[];for(let e=0;e<g;e++)w.push(0)}const S=u?0:1;u&&(w=[0].concat(w));let y=JSON.parse(JSON.stringify(e.preparedSpells)),C=JSON.parse(JSON.stringify(e.preparedCantrips));e.preparedSpells[h]={},e.preparedCantrips[h]={};const _=w.map((t,s)=>{if(-1!==t){let n=A.filter(e=>e.level===s+S).sort((e,t)=>e.name<t.name?-1:e.name>t.name?1:0).map(t=>{const l=s+S===0,n=l?Object(o.N)(h,t,C):Object(o.N)(h,t,y);return n&&(l?e.preparedCantrips[h][t.name]={name:t.name,source:t.source}:e.preparedSpells[h][t.name]={name:t.name,source:t.source}),this.isEditMode||n||t.isSubclassSpell?{id:"spell",name:t.name,children:[{...t,hasChildren:!1,id:"spelldef",parentClass:h,parentLevel:s+S}],hasChildren:!0,parentClass:h,parentLevel:s+S,isCantrip:l,isSubclassSpell:t.isSubclassSpell,isWarlock:!!g}:void 0}).filter(e=>void 0!==e);const r={id:"level",level:s+S,spellSlots:t,currentSlots:Object(o.H)(s+S),children:n,hasChildren:n.length>0,parentClass:h,isWarlock:!!g};return this.$.grid.expandedItems.some(e=>"level"===e.id&&e.level===r.level&&e.parentClass===r.parentClass)&&l.push(r),r}return null}).filter(e=>null!==e);if(r[h]={current:e.preparedSpells&&e.preparedSpells[h]?Object.keys(e.preparedSpells[h]):[],max:t,type:f,maxCantrips:u,currentCantrips:e.preparedCantrips&&e.preparedCantrips[h]?Object.keys(e.preparedCantrips[h]):[]},_.length){const e={id:"class",className:h,level:d,hasCantrips:S,children:_,spellsKnown:t,hasChildren:_.length>0,spellPrepType:f,multiclassingLevels:p?0:Math.floor(("full"===s.casterProgression?1:.5)*d),isWarlock:!!g,warlockSpellLevel:g,warlockSpellSlots:b};l.push(e),a.push(e)}}}if(a.sort((e,t)=>e.children.length-t.children.length),!this.isEditMode){let t=[];if(a.length){let s,l,n=0,r=-1;for(let e of a)e.isWarlock?(s=e.warlockSpellLevel,l=e.warlockSpellSlots):(n+=e.multiclassingLevels,r++),e.children.forEach((s,l)=>{const o=l+e.hasCantrips;t[o]?s.children[l]&&(t[o].children=t[o].children.concat(s.children)):t[o]=s});t=t.filter(e=>void 0!==e);const i=0===t[0].level;if(r>0){const e=this.multiclassSlotsDef[n+1];for(let s=i?1:0;s<e.length;s++){const l=e[s-(i?1:0)];t[s]?t[s].spellSlots=l:t.push({children:[],currentSlots:Object(o.H)(s+1-(i?1:0)),hasChildren:!1,id:"level",isWarlock:!1,level:s,spellSlots:l})}}s&&(t[s-(i?0:1)].warlockSpellSlots=l,t[s-(i?0:1)].currentWarlockSlots=e.warlockSpellSlots||0)}a=t}this.refresh=!1,Object(o.W)(e),this.spellsKnown=r,this.spellDisplay=a,this.expandedItems=l,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0})),this.$.grid.clearCache()}}_renderSpell(e){return Object(a.spellHtml)(e)}_toggleSpellPrepared(e){e.preventDefault(),e.stopPropagation();if(!e.model.item.isSubclassSpell&&this.isEditMode){if(e.model.item.isCantrip)this._toggleCantripPrepared(e);else{const t=e.model.item.parentClass,s=e.model.item.children[0],l=this._isPreparedSpell(this.spellsKnown,t,s.name),n=this._currentSpellsKnownCount(t,this.spellsKnown),r=this._maxSpellsKnownCount(t,this.spellsKnown);if((l||n<r)&&"spelldef"===s.id){let e=JSON.parse(JSON.stringify(this.spellsKnown));if(l){const l=e[t].current.indexOf(s.name);e[t].current.splice(l,1)}else e[t].current.push(s.name);this.spellsKnown=e,Object(o.vb)(t,s)}else n>=r&&this._flashPreparedButton(Object(i.findInPath)("button",e))}}}_toggleCantripPrepared(e){e.preventDefault(),e.stopPropagation();const t=e.model.item.parentClass,s=e.model.item.children[0],l=this._isPreparedCantrip(this.spellsKnown,t,s.name),n=this._currentCantripsKnownCount(t,this.spellsKnown),r=this._maxCantripsKnownCount(t,this.spellsKnown);if((l||n<r)&&"spelldef"===s.id){let e=JSON.parse(JSON.stringify(this.spellsKnown));if(l){const l=e[t].currentCantrips.indexOf(s.name);e[t].currentCantrips.splice(l,1)}else e[t].currentCantrips.push(s.name);this.spellsKnown=e,Object(o.ob)(t,s)}else n>=r&&this._flashPreparedButton(Object(i.findInPath)("button",e))}_flashPreparedButton(e){e&&(e.classList.add("transition-bg"),e.classList.add("flash-error"),setTimeout(()=>{e.classList.remove("flash-error"),setTimeout(()=>{e.classList.remove("transition-bg")},200)},200))}_toggleSpellSlot(e){e.preventDefault(),e.stopPropagation();const t=Object(i.findInPath)(".checkbox-wrap",e),s=!!Object(i.findInPath)("[warlock-spell]",e),l=s?e.model.item.currentWarlockSlots:e.model.item.currentSlots,n=s?e.model.item.warlockSpellSlots:e.model.item.spellSlots,r=e.model.item.level;if(t){!t.children[0].checked&&l<n?s?e.model.item.currentWarlockSlots=l+1:e.model.item.currentSlots=l+1:l>0&&(s?e.model.item.currentWarlockSlots=l-1:e.model.item.currentSlots=l-1)}else l<n?s?e.model.item.currentWarlockSlots=l+1:e.model.item.currentSlots=l+1:l>0&&(s?e.model.item.currentWarlockSlots=l-1:e.model.item.currentSlots=l-1);s?(this._setSpellSlotsChecked(e.model.item.currentWarlockSlots,Object(i.findInPath)(".slot-checkboxes",e)),Object(o.lb)(r,e.model.item.currentWarlockSlots,void 0,!0)):(this._setSpellSlotsChecked(e.model.item.currentSlots,Object(i.findInPath)(".slot-checkboxes",e)),Object(o.lb)(r,e.model.item.currentSlots))}_setSpellSlotsChecked(e,t){const s=t.querySelectorAll("vaadin-checkbox");for(let t=0;t<s.length;t++)s[t].checked=t<e}_isPreparedClass(e,t,s){const l=t.parentClass,o=t.name,n=t.isCantrip,r=t.isSubclassSpell;if(r)return s?"spell-button always-prepared edit-mode":"spell-button always-prepared";return(n?this._isPreparedCantrip(e,l,o):this._isPreparedSpell(e,l,o,r))?s?"spell-prepared spell-button edit-mode":"spell-prepared spell-button":s?"spell-button edit-mode":"spell-button"}_isPreparedSpell(e,t,s,l){return l||e[t]&&e[t].current&&e[t].current.length&&e[t].current.indexOf(s)>-1}_isPreparedCantrip(e,t,s){return e[t]&&e[t].currentCantrips&&e[t].currentCantrips.length&&e[t].currentCantrips.indexOf(s)>-1}_isPreparedText(e,t){const s=t.parentClass,l=t.name,o=t.isCantrip,n=t.isSubclassSpell,r=e[s].type;if(n)return"Always";return(o?this._isPreparedCantrip(e,s,l):this._isPreparedSpell(e,s,l,n))?"known"===r?"Learned":"Prepared":"known"===r?"Learn":"Prepare"}_countToArray(e){const t=[];for(var s=0;s<e;s++)t.push(null);return t}_toLevel(e){return 0===e?d.a.spLevelToFull(e)+"s":d.a.spLevelToFull(e)+" Level"}_currentSpellsKnownCount(e,t){return t&&e&&t[e]&&t[e].current?t[e].current.length:0}_maxSpellsKnownCount(e,t){return t&&e&&t[e]?t[e].max:0}_currentCantripsKnownCount(e,t){return t&&e&&t[e]&&t[e].current?t[e].currentCantrips.length:0}_maxCantripsKnownCount(e,t){return t&&e&&t[e]?t[e].maxCantrips:0}_toggleTooltip(e){const t=e.target.dataset.tooltip,s=Array.from(e.target.children).find(e=>e.matches(".tooltip"));if(window.tooltipCloseListener||(window.tooltipCloseListener=!0,window.tooltips=[],document.addEventListener("click",()=>{window.tooltips.forEach(e=>{e.classList.remove("tooltip--open"),setTimeout(()=>{e.remove()},300)}),window.tooltips=[]})),s)s.classList.remove("tooltip--open"),setTimeout(()=>{s.remove()},300);else if(t){const s=document.createElement("div");s.innerHTML=t,s.classList.add("tooltip"),e.target.appendChild(s),setTimeout(()=>{s.classList.add("tooltip--open"),window.tooltips.push(s)},0)}}_toggleEditMode(){Object(r.a)(!this.isEditMode)}_spellsKnownString(e){return"Spells "+Object(i.util_capitalize)(e)+":"}_isRitualSpell(e){const t=e.children[0];return t&&t.meta&&t.meta.ritual}_isConcentrationSpell(e){return e.children[0].duration.some(e=>e.concentration)}_isBonusActionSpell(e){return e.children[0].time.some(e=>"bonus"===e.unit)}_getSpellSchool(e){const t=e.children[0];return d.a.SP_SCHOOL_ABV_TO_FULL[t.school]}_hidePrepareSpellsButton(e,t){return e||!Object.values(t).some(e=>e.current.length<e.max-1||e.currentCantrips.length<e.maxCantrips-1)}_spellLevel(e){if(e&&e.children&&e.children.length&&e.children[0].level)return d.a.spLevelToFull(e.children[0].level)}_isSpellSlotChecked(e,t){return t<e}_spellClassText(e){return e}_isEmpty(e){return!e||!e.length}_hideCheckboxes(e){return!e||e>0&&this.isEditMode}_hideSlotsLabel(e,t){return!e||0===t}_wrapClassString(e){return e?"edit-mode":"not-edit-mode"}_equal(e,t){return e===t}_hasTwo(e){return e&&e.length&&e.length>1}_join(e){return e.join(", ")}_abs(e){return e>=0?"+"+e:e}static get template(){return l.b`
      <style include='my-styles'>
        :host {}
        :host {
          display: block;
          padding-top: 16px;
        }
        [hidden] {
          display: none !important;
        }

        .heading {
          width: calc(100% - 32px);
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--lumo-contrast-10pct);
          margin: 0 16px;
        }

        h2 {
          display: block;
          font-size: 1.5em;
          margin: 20px 0 20px 0;
          font-weight: bold;
        }

        vaadin-grid {
          margin-bottom: 200px;
        }

        vaadin-grid-tree-toggle { 
          width: 100%;
          cursor: pointer;
        }

        .class-wrap {
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          align-items: center;
          padding-top: 4px;
          /* padding-top: 34px;
          padding-bottom: 8px; */
          -youbkit-touch-callout: none;
          -youbkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          left: -16px;
          border-bottom: 3px solid var(--_lumo-grid-secondary-border-color);;
          padding: 24px 16px 8px;
          position: relative;
        }
        .class-wrap h3 {
          font-size: 22px;
          font-weight: bold;
        }

        .spells-prepared-text {
          margin-right: 6px;
          margin-left: auto;
        }
        .prepared-count {
          color: var(--mdc-theme-primary);
          font-weight: bold;
        }
        .prepared-count[edit-mode] {
          color: var(--mdc-theme-secondary);
        }
        .cantrips-prepared {
          margin-right: 0;
        }

        .level-outer-wrap {
          border-bottom: 1px solid var(--_lumo-grid-secondary-border-color);
          padding-bottom: 8px;
          display: flex;
          height: 32px;
        }

        .level-wrap {
          width: 100%;
          -youbkit-touch-callout: none;
          -youbkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .level-wrap .label {
          padding-left: 6px;
          font-size: 12px;
          color: var(--lumo-tint-70pct);
        }

        .slot-checkboxes {
          cursor: pointer;
          display: flex;
          padding: 4px;
        }

        .slot-checkboxes span {
          -youbkit-touch-callout: none;
          -youbkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .slot-checkboxes .label {
          padding-left: 8px;
        }

        vaadin-checkbox {
          pointer-events: none;
        }

        .spell-outer-wrap {
          display: flex;
        }

        .spell-wrap {
          width: 100%;
          margin-left: 24px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .spell-inner-wrap {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          -youbkit-touch-callout: none;
          -youbkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .spell-level {
          color: var(--mdc-theme-text-disabled-on-background);
          margin-left: 8px;
          margin-right: 4px;
          font-size: 12px;
        }

        .ind {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          color: var(--mdc-theme-on-secondary);
          background-color: var(--mdc-theme-secondary);
          font-size: 12px;
          position: relative;
          bottom: 2px;
          margin-left: 0;
          padding: 0px 4px;
          font-weight: 500;
        }

        .rit-ind::before {
          content: 'R';
        }
        .conc-ind::before {
          content: 'C';
        }
        .bonus-ind::before {
          content: 'BA';
        }
        .school-ind {
          font-size: 10px;
          height: 16px;
          bottom: 3px;
        }

        .spell-inner-wrap[not-edit-mode] .ind {
          background-color: var(--mdc-theme-primary);
        }

        .spell-def-wrap {
          font-size: 14px;
          width: calc(100% - 20px);
          margin: 0 auto;
          background: var(--lumo-contrast-10pct);
          border-radius: 4px;
          white-space: pre-line;
        }

        .spell-def-wrap .margin-bottom_med {
          margin-bottom: 0px !important;
        }

        .spell-def-wrap .text {
          margin-top: 16px;
        }

        .spell-def-wrap p {
          margin-bottom: 16px;
        }

        .stats-wrapper {
          margin: 0 14px;
        }

        .spell-button {
          background-color: var(--mdc-theme-text-disabled-on-background);
          color: var(--mdc-theme-on-secondary);
          border: none;
          border-radius: 4px;
          outline: none;
          width: 80px;
          display: inline-block;
          justify-content: center;
          white-space: normal;
          font-size: 12px;
          padding: 4px 4px;
          margin-left: 8px;
        }
        .class-icon {
          border: none;
          border-radius: 4px;
          outline: none;
          width: 60px;
          display: inline-block;
          justify-content: center;
          white-space: normal;
          font-size: 12px;
          padding: 4px 4px;
          width: 20px;
        }
        .spell-button.edit-mode {
          cursor: pointer;
        }
        .spell-button.always-prepared {
          background-color: var(--mdc-theme-secondary-lighter);
          cursor: not-allowed;
        }
        .spell-button.spell-prepared {
          background-color: var(--mdc-theme-secondary);
        }
        .spell-button.flash-error {
          background-color: var(--mdc-theme-error);
          transition: background-color 0.2s ease-out;
        }
        .spell-button.transition-bg {
          transition: background-color 0.2s ease-in;
        }

        .mods {
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-around;
          margin: 16px 0;
        }
        .mod-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 12px;
          text-align: center;
          margin: 0 4px;
          width: 130px;
        }
        .mod-val-wrap {
          font-size: 16px;
        }
        .mod-val:not(:first-child)::before {
          content: '|';
          margin-right: 4px;
          color: var(--lumo-contrast-30pct);
        }
        .mod-label {
          font-weight: bold;
          color: var(--mdc-theme-primary);
          font-size: 15px;
        }
        .edit-mode .mod-label {
          font-weight: bold;
          color: var(--mdc-theme-secondary);
        }
        @media(min-width: 420px) {
          .mods {
            justify-content: center;
          }
          .mod-row {
            font-size: 14px;
          }
          .mod-val-wrap {
            font-size: 18px;
          }
        }

        @media(min-width: 921px) {
          .mods {
            justify-content: flex-start;
          }
        }

        .filter {
          margin-left: 16px;

        }

        .tooltip {
          position: absolute;
          background: lightgray;
          color: black;
          padding: 2px 10px;
          border-radius: 4px;
          white-space: nowrap;
          left: 8px;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-top-left-radius: 0px;
        }
        .tooltip--open {
          opacity: 1;
        }
        .tooltip::after {
          content: '';
          height: 0;
          width: 0;
          position: absolute;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 5px solid lightgray;
          top: -5px;
          left: 0px;
        }
        [data-tooltip] {
          position: relative;
        }

        .no-content-message {
          font-size: 14px;
          padding: 20px;
          font-style: italic;
        }
      </style>

      <div class$="[[_wrapClassString(isEditMode)]]" hidden$="[[noContentMessage]]">

        <div class="heading">
          <h2>Spells</h2>

          <dnd-button class="prepare-spells-button link" hidden$="[[_hidePrepareSpellsButton(isEditMode, spellsKnown)]]" edit-mode$="[[isEditMode]]" not-edit-mode$="[[!isEditMode]]" label="Prepare Your Spells!" icon="edit" on-click="_toggleEditMode"></dnd-button>
        </div>

        <!-- Spell Mods -->
        <div class="mods" >
          <div class="mod-row">
            <span class="mod-val-wrap">
              <template is="dom-repeat" items="[[spellMods]]">
                <span class="mod-val" data-tooltip$="[[_join(item.classes)]]" on-mouseover="_toggleTooltip" on-mouseout="_toggleTooltip">[[_abs(item.mod)]]</span>
              </template>
            </span>
            <span class="mod-label">Modifier</span>
          </div>
          <div class="mod-row">
            <span class="mod-val-wrap">
              <template is="dom-repeat" items="[[spellMods]]">
                <span class="mod-val" data-tooltip$="[[_join(item.classes)]]" on-mouseover="_toggleTooltip" on-mouseout="_toggleTooltip">+[[item.spellAttackBonus]]</span>
              </template>
            </span>
            <span class="mod-label">Attack +</span>
          </div>
          <div class="mod-row">
            <span class="mod-val-wrap">
              <template is="dom-repeat" items="[[spellMods]]">
                <span class="mod-val" data-tooltip$="[[_join(item.classes)]]" on-mouseover="_toggleTooltip" on-mouseout="_toggleTooltip">[[item.dc]]</span>
              </template>
            </span>
            <span class="mod-label">DC</span>
          </div>
        </div>

        <div class="filter">
          <vaadin-text-field clear-button-visible value="{{filterStr}}" placeholder='Filter'></vaadin-text-field>
        </div>
      </div>

      <div class="no-content-message" hidden$="[[!noContentMessage]]">Enter edit mode to add classes and levels.</div>

      <vaadin-grid id="grid" theme="no-border no-row-borders" expanded-items="{{expandedItems}}" height-by-rows hidden$="[[noContentMessage]]">
        <vaadin-grid-column flex-grow="1">
          <template>
              <template is="dom-if" if="[[_equal(item.id, 'class')]]">
                <div class="class-wrap">
                  <h3>[[item.className]]</h3>
                  <div class='spells-prepared-text'>
                    <span>[[_spellsKnownString(item.spellPrepType)]]</span>
                    <span class='prepared-count' edit-mode$=[[isEditMode]]>[[_currentSpellsKnownCount(item.className, spellsKnown)]] / [[_maxSpellsKnownCount(item.className, spellsKnown)]]</span>
                  </div>
                </div>
              </template>
  
              <template is="dom-if" if="[[_equal(item.id, 'level')]]">
                <div class="level-outer-wrap">
                  <vaadin-grid-tree-toggle leaf="[[!item.hasChildren]]" expanded="{{expanded}}" on-click='_recordScrollHeight'>
                    <h4 class="level-wrap">[[_toLevel(item.level)]]<span hidden$="[[_hideSlotsLabel(isEditMode, item.level)]]" class="label">([[item.spellSlots]] Slots)</span></h4>
                    <div class="cantrips-prepared spells-prepared-text" hidden$="[[!_equal(item.level, 0)]]">
                      <span>Cantrips Known:</span>
                      <span class='prepared-count' edit-mode$=[[isEditMode]]>[[_currentCantripsKnownCount(item.parentClass, spellsKnown)]] / [[_maxCantripsKnownCount(item.parentClass, spellsKnown)]]</span>
                    </div>
                  </vaadin-grid-tree-toggle>

                  <div class="slot-checkboxes" hidden$="[[_hideCheckboxes(item.warlockSpellSlots, isEditMode)]]" on-click="_toggleSpellSlot" warlock-spell>
                    <template is='dom-repeat' items='[[_countToArray(item.warlockSpellSlots)]]' as="thing">
                      <span class="checkbox-wrap"><vaadin-checkbox checked="[[_isSpellSlotChecked(item.currentWarlockSlots, index)]]"></vaadin-checkbox></span>
                    </template>
                    <span class="label">Pact</span>
                  </div>

                  <div class="slot-checkboxes" hidden$="[[_hideCheckboxes(item.spellSlots, isEditMode)]]" on-click="_toggleSpellSlot">
                    <template is='dom-repeat' items='[[_countToArray(item.spellSlots)]]' as="thing">
                      <span class="checkbox-wrap"><vaadin-checkbox checked="[[_isSpellSlotChecked(item.currentSlots, index)]]"></vaadin-checkbox></span>
                    </template>
                    <span class="label">Slots</span>
                  </div>
                </div>
              </template>

              <template is="dom-if" if="[[_equal(item.id, 'spell')]]">
                <div class="spell-outer-wrap">
                  <vaadin-grid-tree-toggle leaf="[[!item.hasChildren]]" expanded="{{expanded}}" class="spell-wrap" on-click='_recordScrollHeight'>
                    <div class="spell-inner-wrap" not-edit-mode$="[[!isEditMode]]">
                      [[item.name]]
                      <span class="spell-level" hidden>[[_spellLevel(item)]]</span>
                      <span class="ind rit-ind" title="Ritual" hidden$="[[!_isRitualSpell(item)]]"></span>
                      <span class="ind conc-ind" title="Concentration" hidden$="[[!_isConcentrationSpell(item)]]"></span>
                      <span class="ind bonus-ind" title="Bonus Action" hidden$="[[!_isBonusActionSpell(item)]]"></span>
                      <span class="ind school-ind" title="[[_getSpellSchool(item)]]">[[_getSpellSchool(item)]]</span>
                    </div>
                  </vaadin-grid-tree-toggle>
                  <button class$="[[_isPreparedClass(spellsKnown, item, isEditMode)]]" hidden$="[[!isEditMode]]" on-click="_toggleSpellPrepared">[[_isPreparedText(spellsKnown, item)]]</button>
                  <dnd-svg class="class-icon" hidden$="[[isEditMode]]" id='[[_spellClassText(item.parentClass)]]' default-color></dnd-svg>
                </div>
              </template>

              <template is="dom-if" if="[[_equal(item.id, 'spelldef')]]">
                <div class="spell-def-wrap">
                  <div class= "stats-wrapper" inner-h-t-m-l="[[_renderSpell(item)]]"></div>
                </div>
              </template>
          </template>
        </vaadin-grid-column>
      </vaadin-grid>
    `}}customElements.define("dnd-character-builder-spells",c)}}]);
//# sourceMappingURL=8.bundle.js.map