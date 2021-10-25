(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{115:function(e,t,s){"use strict";s(77)},116:function(e,t,s){"use strict";s(113),s(111)},121:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return o})),s.d(t,"spellHtml",(function(){return r}));var l=s(71),n=s(5);const a=new l.a;function o(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t</div>';const s=r(e);t.querySelector(".stats-wrapper").innerHTML=s}function r(e){const t=[];if(t.push(`<div class="margin-bottom_med"><span class="stats-source source${e.source}" title="${n.a.sourceJsonToFull(e.source)}">${n.a.sourceJsonToAbv(e.source)}</div>`),t.push(`<div class="margin-bottom_med"><span>${n.a.spLevelSchoolMetaToFull(e.level,e.school,e.meta)}</span></div>`),t.push(`<div class="margin-bottom_med"><span class="stat-name">Casting Time: </span>${n.a.spTimeListToFull(e.time)}</div>`),t.push(`<div class="margin-bottom_med"><span class="stat-name">Range: </span>${n.a.spRangeToFull(e.range)}</div>`),t.push(`<div class="margin-bottom_med"><span class="stat-name">Components: </span>${n.a.spComponentsToFull(e.components)}</div>`),t.push(`<div class="margin-bottom_med"><span class="stat-name">Duration: </span>${n.a.spDurationToFull(e.duration)}</div>`),t.push("<div class='text'>"),a.recursiveEntryRender({type:"entries",entries:e.entries},t,1),e.entriesHigherLevel){const s={type:"entries",entries:e.entriesHigherLevel};a.recursiveEntryRender(s,t,2)}if(t.push("</div>"),t.push(`<div class="margin-bottom_med"><span class="stat-name">Classes: </span>${n.a.spMainClassesToFull(e.classes)}</div>`),e.classes.fromSubclass){const s=n.a.spSubclassesToCurrentAndLegacyFull(e.classes);t.push(`<div class="margin-bottom_med"><span class="stat-name">Subclasses: </span>${s[0]}</div>`),s[1]&&t.push(`<div class="mdc-theme--text-disabled-on-background margin-bottom_med"><span class="stat-name">Subclasses (legacy): </span>${s[1]}</div>`)}return e.scrollNote&&(t.push('<div class="mdc-theme--text-disabled-on-background">'),a.recursiveEntryRender("{@italic Note: Both the {@class Fighter (Eldritch Knight)} and the {@class Rogue (Arcane Trickster)} spell lists include all {@class Wizard} spells. Spells of 5th level or higher may be cast with the aid of a spell scroll or similar.}",t,2),t.push("</div>")),t.join("")}},125:function(e,t,s){"use strict";s(45),s(39);var l=s(13);const n=l.a`<dom-module id="lumo-grid-tree-toggle" theme-for="vaadin-grid-tree-toggle">
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
</dom-module>`;document.head.appendChild(n.content);var a=s(7),o=(s(31),s(15)),r=s(19),i=s(43),c=s(10);
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
const p=document.createElement("template");p.innerHTML="<custom-style>\n  <style>\n    @font-face {\n      font-family: \"vaadin-grid-tree-icons\";\n      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAQkAA0AAAAABrwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAECAAAABoAAAAcgHwa6EdERUYAAAPsAAAAHAAAAB4AJwAOT1MvMgAAAZQAAAA/AAAAYA8TBIJjbWFwAAAB8AAAAFUAAAFeGJvXWmdhc3AAAAPkAAAACAAAAAgAAAAQZ2x5ZgAAAlwAAABLAAAAhIrPOhFoZWFkAAABMAAAACsAAAA2DsJI02hoZWEAAAFcAAAAHQAAACQHAgPHaG10eAAAAdQAAAAZAAAAHAxVAgBsb2NhAAACSAAAABIAAAASAIAAVG1heHAAAAF8AAAAGAAAACAACgAFbmFtZQAAAqgAAAECAAACTwflzbdwb3N0AAADrAAAADYAAABZQ7Ajh3icY2BkYGAA4twv3Vfi+W2+MnCzMIDANSOmbGSa2YEZRHEwMIEoAAoiB6sAeJxjYGRgYD7w/wADAwsDCDA7MDAyoAI2AFEEAtIAAAB4nGNgZGBg4GBgZgDRDAxMDGgAAAGbABB4nGNgZp7JOIGBlYGBaSbTGQYGhn4IzfiawZiRkwEVMAqgCTA4MDA+38d84P8BBgdmIAapQZJVYGAEAGc/C54AeJxjYYAAxlAIzQTELAwMBxgZGB0ACy0BYwAAAHicY2BgYGaAYBkGRgYQiADyGMF8FgYbIM3FwMHABISMDArP9/3/+/8/WJXC8z0Q9v8nEp5gHVwMMMAIMo+RDYiZoQJMQIKJARUA7WBhGN4AACFKDtoAAAAAAAAAAAgACAAQABgAJgA0AEIAAHichYvBEYBADAKBVHBjBT4swl9KS2k05o0XHd/yW1hAfBFwCv9sIlJu3nZaNS3PXAaXXHI8Lge7DlzF7C1RgXc7xkK6+gvcD2URmQB4nK2RQWoCMRiFX3RUqtCli65yADModOMBLLgQSqHddRFnQghIAnEUvEA3vUUP0LP0Fj1G+yb8R5iEhO9/ef/7FwFwj28o9EthiVp4hBlehcfUP4Ur8o/wBAv8CU+xVFvhOR7UB7tUdUdlVRJ6HnHWTnhM/V24In8JT5j/KzzFSi2E53hUz7jCcrcIiDDwyKSW1JEct2HdIPH1DFytbUM0PofWdNk5E5oUqb/Q6HHBiVGZpfOXkyUMEj5IyBuNmYZQjBobfsuassvnkKLe1OuBBj0VQ8cRni2xjLWsHaM0jrjx3peYA0/vrdmUYqe9iy7bzrX6eNP7Jh1SijX+AaUVbB8AAHicY2BiwA84GBgYmRiYGJkZmBlZGFkZ2djScyoLMgzZS/MyDQwMwLSruZMzlHaB0q4A76kLlwAAAAEAAf//AA94nGNgZGBg4AFiMSBmYmAEQnYgZgHzGAAD6wA2eJxjYGBgZACCKxJigiD6mhFTNowGACmcA/8AAA==) format('woff');\n      font-weight: normal;\n      font-style: normal;\n    }\n  </style>\n</custom-style>",document.head.appendChild(p.content);class d extends(Object(r.a)(Object(i.a)(a.a))){static get template(){return l.a`
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
`}static get is(){return"vaadin-grid-tree-toggle"}static get properties(){return{level:{type:Number,value:0,observer:"_levelChanged"},leaf:{type:Boolean,value:!1,reflectToAttribute:!0},expanded:{type:Boolean,value:!1,reflectToAttribute:!0,notify:!0}}}ready(){super.ready(),this.addEventListener("click",e=>this._onClick(e))}_onClick(e){this.leaf||(e.preventDefault(),this.expanded=!this.expanded)}_levelChanged(e){const t=Number(e).toString();this.style["---level"]=t,this._debouncerUpdateLevel=o.a.debounce(this._debouncerUpdateLevel,c.c,()=>this.updateStyles({"---level":t}))}}customElements.define(d.is,d)},133:function(e,t,s){"use strict";s.r(t);var l=s(7),n=(s(124),s(125),s(17)),a=s(32),o=s(110),r=s(121),i=s(1),c=s(5);s(116),s(115);class p extends l.a{static get properties(){return{spellsKnown:{type:Object,value:{}},preparedSpells:{type:Object,value:{}},noContentMessage:{type:Boolean,value:!1},isEditMode:{type:Boolean,value:!1},filterStr:{type:String,value:"",observer:"_filterChange"}}}_filterChange(){this.filterStr.length?(this.oldExpanded||(this.oldExpanded=this.$.grid.expandedItems),this.expandAll(),this.$.grid.clearCache(),setTimeout(()=>{this.expandAll()},10)):(this.oldExpanded&&(this.$.grid.expandedItems=this.oldExpanded,this.oldExpanded=void 0),this.$.grid.clearCache())}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.refresh=!0,this.updateFromCharacter(Object(n.H)()),Object(n.m)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode,this.refresh=!0,this.updateFromCharacter(Object(n.H)())},Object(o.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(o.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(n.m)().removeEventListener("character-selected",this.characterChangeHandler),Object(o.b)().removeEventListener("editModeChange",this.editModeHandler)}ready(){super.ready(),this.multiclassSlotsDef=[[2],[3],[4,2],[4,3],[4,3,2],[4,3,3],[4,3,3,1],[4,3,3,2],[4,3,3,3,1],[4,3,3,3,2],[4,3,3,3,2,1],[4,3,3,3,2,1],[4,3,3,3,2,1,1],[4,3,3,3,2,1,1],[4,3,3,3,2,1,1,1],[4,3,3,3,2,1,1,1],[4,3,3,3,2,1,1,1,1],[4,3,3,3,3,1,1,1,1],[4,3,3,3,3,2,1,1,1],[4,3,3,3,3,2,2,1,1]],setTimeout(()=>{this.$.grid.dataProvider=((e,t)=>{const s=e.page*e.pageSize;let l=e.parentItem?e.parentItem.children:this.spellDisplay;if(this.filterStr.length&&(l=l.filter(e=>this.hasDecendentWithFilter(e,this.filterStr.toLowerCase()))),l&&l.length){t(l.slice(s,s+e.pageSize),l.length)}}).bind(this)},0)}hasDecendentWithFilter(e,t){if(!e.name||e.name.toLowerCase().indexOf(t)>-1)return!0;const s=e.length?e:e.children;if(s&&s.length)for(let e of s)return this.hasDecendentWithFilter(e,t);return!1}clearFilterStr(){this.filterStr=""}expandAll(){this.$.grid.expandedItems=this.findExpandables(this.spellDisplay)}findExpandables(e,t=[]){"level"!==e.id&&"class"!==e.id||t.push(e);const s=e.length?e:e.children;if(s&&s.length)for(let e of s)this.findExpandables(e,t);return t}async updateSpellStats(e,t){if(t&&e){const s=[],l=Object.entries(t).reduce((e,[t,s])=>e+s,0),a=Object(i.getProfBonus)(l);for(const[l,o]of Object.entries(t)){const t=e[l];if(t.casterProgression){const e=s.find(e=>t.spellcastingAbility===e.spellcastingAbility);if(e)e.classes.push(l);else{const e=await Object(n.g)(t.spellcastingAbility),o=e+a,r=8+o;s.push({classes:[l],mod:e,spellAttackBonus:o,dc:r,spellcastingAbility:t.spellcastingAbility})}}}this.spellMods=s}else this.spellMods=[]}async updateFromCharacter(e){if(e&&this.refresh){this.noContentMessage=!0;const t=await Object(n.s)(e),s=Object(n.r)(e),l=[],o={};let r=[];this.updateSpellStats(t,s);for(const[i,c]of Object.entries(s)){const s=t[i];if(s.casterProgression){let t;this.noContentMessage=!1;let p,d,m,h="known";if(s.classTableGroups.forEach(e=>{if(e.colLabels&&e.colLabels.length){const s=e.colLabels.findIndex(e=>e.toLowerCase().indexOf("spells known")>-1);s>-1&&e.rows&&e.rows.length>c-1&&(t=e.rows[c-1][s]);const l=e.colLabels.findIndex(e=>e.toLowerCase().indexOf("cantrips known")>-1);l>-1&&e.rows&&e.rows.length>c-1&&(p=e.rows[c-1][l]);const n=e.colLabels.findIndex(e=>e.toLowerCase().indexOf("slot level")>-1);if(n>-1&&e.rows&&e.rows.length>c-1){const t=e.rows[c-1][n].match(/(\d+)/g);t&&t.length&&(d=parseInt(t[0]))}const a=e.colLabels.findIndex(e=>e.toLowerCase().indexOf("spell slots")>-1);a>-1&&e.rows&&e.rows.length>c-1&&(m=e.rows[c-1][a])}}),void 0===t){h="prepared";const e="full"===s.casterProgression?1:.5,l=await Object(n.g)(s.spellcastingAbility);t=Math.floor(c*e)+l,t=t<1?1:t}let u=await Object(a.a)("spells",{key:"classes.fromClassList",value:{name:i,source:s.source}});const g=Object(n.L)(s);if(c>=g){const t=e.subclasses&&e.subclasses[i]?e.subclasses[i].shortName:"";if(t){let l=await Object(a.a)("spells",{key:"classes.fromSubclass",value:{"subclass.name":t,"class.name":i,"class.source":s.source}});if("Divine Soul"===t){let s=Object(n.K)(i.toLowerCase(),t.toLowerCase(),c,"Divine Magic Affinity",e);l=s?l.filter(e=>s.indexOf(e.name)>-1):[]}l=l.map(e=>({...e,isSubclassSpell:!0})),u=[...new Set(u.concat(l))]}if("Divine Soul"===t){let e=await Object(a.a)("spells",{key:"classes.fromClassList",value:{name:"cleric",source:"phb"}});u=[...new Set(u.concat(e))]}}const A=s.classTableGroups.find(e=>"Spell Slots per Spell Level"===e.title);let f;if(A)f=A.rows[c-1].filter(e=>0!==e);else{f=[];for(let e=0;e<d;e++)f.push(0)}const v=p?0:1;p&&(f=[0].concat(f));let b=JSON.parse(JSON.stringify(e.preparedSpells)),w=JSON.parse(JSON.stringify(e.preparedCantrips));e.preparedSpells[i]={},e.preparedCantrips[i]={};const x=f.map((t,s)=>{if(-1!==t){let a=u.filter(e=>e.level===s+v).sort((e,t)=>e.name<t.name?-1:e.name>t.name?1:0).map(t=>{const l=s+v===0,a=l?Object(n.P)(i,t,w):Object(n.P)(i,t,b);return a&&(l?e.preparedCantrips[i][t.name]={name:t.name,source:t.source}:e.preparedSpells[i][t.name]={name:t.name,source:t.source}),this.isEditMode||a||t.isSubclassSpell?{id:"spell",name:t.name,children:[{...t,hasChildren:!1,id:"spelldef",parentClass:i,parentLevel:s+v}],hasChildren:!0,parentClass:i,parentLevel:s+v,isCantrip:l,isSubclassSpell:t.isSubclassSpell,isWarlock:!!d}:void 0}).filter(e=>void 0!==e);const o={id:"level",level:s+v,spellSlots:t,currentSlots:Object(n.J)(s+v),children:a,hasChildren:a.length>0,parentClass:i,isWarlock:!!d};return this.$.grid.expandedItems.some(e=>"level"===e.id&&e.level===o.level&&e.parentClass===o.parentClass)&&l.push(o),o}return null}).filter(e=>null!==e);if(o[i]={current:e.preparedSpells&&e.preparedSpells[i]?Object.keys(e.preparedSpells[i]):[],max:t,type:h,maxCantrips:p,currentCantrips:e.preparedCantrips&&e.preparedCantrips[i]?Object.keys(e.preparedCantrips[i]):[]},x.length){const e={id:"class",className:i,level:c,hasCantrips:v,children:x,spellsKnown:t,hasChildren:x.length>0,spellPrepType:h,multiclassingLevels:Math.floor(("full"===s.casterProgression?1:.5)*c),isWarlock:!!d,warlockSpellLevel:d,warlockSpellSlots:m};l.push(e),r.push(e)}}}if(r.sort((e,t)=>e.children.length-t.children.length),!this.isEditMode){let t=[];if(r.length){let s,l,a=0,o=-1;for(let e of r)e.isWarlock?(s=e.warlockSpellLevel,l=e.warlockSpellSlots):(a+=e.multiclassingLevels,o++),e.children.forEach((s,l)=>{const n=l+e.hasCantrips;t[n]?s.children[l]&&(t[n].children=t[n].children.concat(s.children)):t[n]=s});t=t.filter(e=>void 0!==e);const i=0===t[0].level;if(o>0){const e=this.multiclassSlotsDef[a+1];for(let s=i?1:0;s<e.length;s++){const l=e[s-(i?1:0)];t[s]?t[s].spellSlots=l:t.push({children:[],currentSlots:Object(n.J)(s+1-(i?1:0)),hasChildren:!1,id:"level",isWarlock:!1,level:s,spellSlots:l})}}s&&(t[s-(i?0:1)].warlockSpellSlots=l,t[s-(i?0:1)].currentWarlockSlots=e.warlockSpellSlots||0)}r=t}this.refresh=!1,Object(n.X)(e),this.spellsKnown=o,this.spellDisplay=r,this.expandedItems=l,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0})),this.$.grid.clearCache()}}_renderSpell(e){return Object(r.spellHtml)(e)}_toggleSpellPrepared(e){e.preventDefault(),e.stopPropagation();if(!e.model.item.isSubclassSpell&&this.isEditMode){if(e.model.item.isCantrip)this._toggleCantripPrepared(e);else{const t=e.model.item.parentClass,s=e.model.item.children[0],l=this._isPreparedSpell(this.spellsKnown,t,s.name),a=this._currentSpellsKnownCount(t,this.spellsKnown),o=this._maxSpellsKnownCount(t,this.spellsKnown);if((l||a<o)&&"spelldef"===s.id){let e=JSON.parse(JSON.stringify(this.spellsKnown));if(l){const l=e[t].current.indexOf(s.name);e[t].current.splice(l,1)}else e[t].current.push(s.name);this.spellsKnown=e,Object(n.ub)(t,s)}else a>=o&&this._flashPreparedButton(Object(i.findInPath)("button",e))}}}_toggleCantripPrepared(e){e.preventDefault(),e.stopPropagation();const t=e.model.item.parentClass,s=e.model.item.children[0],l=this._isPreparedCantrip(this.spellsKnown,t,s.name),a=this._currentCantripsKnownCount(t,this.spellsKnown),o=this._maxCantripsKnownCount(t,this.spellsKnown);if((l||a<o)&&"spelldef"===s.id){let e=JSON.parse(JSON.stringify(this.spellsKnown));if(l){const l=e[t].currentCantrips.indexOf(s.name);e[t].currentCantrips.splice(l,1)}else e[t].currentCantrips.push(s.name);this.spellsKnown=e,Object(n.pb)(t,s)}else a>=o&&this._flashPreparedButton(Object(i.findInPath)("button",e))}_flashPreparedButton(e){e&&(e.classList.add("transition-bg"),e.classList.add("flash-error"),setTimeout(()=>{e.classList.remove("flash-error"),setTimeout(()=>{e.classList.remove("transition-bg")},200)},200))}_toggleSpellSlot(e){e.preventDefault(),e.stopPropagation();const t=Object(i.findInPath)(".checkbox-wrap",e),s=!!Object(i.findInPath)("[warlock-spell]",e),l=s?e.model.item.currentWarlockSlots:e.model.item.currentSlots,a=s?e.model.item.warlockSpellSlots:e.model.item.spellSlots,o=e.model.item.level;if(t){!t.children[0].checked&&l<a?s?e.model.item.currentWarlockSlots=l+1:e.model.item.currentSlots=l+1:l>0&&(s?e.model.item.currentWarlockSlots=l-1:e.model.item.currentSlots=l-1)}else l<a?s?e.model.item.currentWarlockSlots=l+1:e.model.item.currentSlots=l+1:l>0&&(s?e.model.item.currentWarlockSlots=l-1:e.model.item.currentSlots=l-1);s?(this._setSpellSlotsChecked(e.model.item.currentWarlockSlots,Object(i.findInPath)(".slot-checkboxes",e)),Object(n.mb)(o,e.model.item.currentWarlockSlots,void 0,!0)):(this._setSpellSlotsChecked(e.model.item.currentSlots,Object(i.findInPath)(".slot-checkboxes",e)),Object(n.mb)(o,e.model.item.currentSlots))}_setSpellSlotsChecked(e,t){const s=t.querySelectorAll("vaadin-checkbox");for(let t=0;t<s.length;t++)s[t].checked=t<e}_isPreparedClass(e,t,s){const l=t.parentClass,n=t.name,a=t.isCantrip,o=t.isSubclassSpell;if(o)return s?"spell-button always-prepared edit-mode":"spell-button always-prepared";return(a?this._isPreparedCantrip(e,l,n):this._isPreparedSpell(e,l,n,o))?s?"spell-prepared spell-button edit-mode":"spell-prepared spell-button":s?"spell-button edit-mode":"spell-button"}_isPreparedSpell(e,t,s,l){return l||e[t]&&e[t].current&&e[t].current.length&&e[t].current.indexOf(s)>-1}_isPreparedCantrip(e,t,s){return e[t]&&e[t].currentCantrips&&e[t].currentCantrips.length&&e[t].currentCantrips.indexOf(s)>-1}_isPreparedText(e,t){const s=t.parentClass,l=t.name,n=t.isCantrip,a=t.isSubclassSpell,o=e[s].type;if(a)return"Always";return(n?this._isPreparedCantrip(e,s,l):this._isPreparedSpell(e,s,l,a))?"known"===o?"Learned":"Prepared":"known"===o?"Learn":"Prepare"}_countToArray(e){const t=[];for(var s=0;s<e;s++)t.push(null);return t}_toLevel(e){return 0===e?c.a.spLevelToFull(e)+"s":c.a.spLevelToFull(e)+" Level"}_currentSpellsKnownCount(e,t){return t&&e&&t[e]&&t[e].current?t[e].current.length:0}_maxSpellsKnownCount(e,t){return t&&e&&t[e]?t[e].max:0}_currentCantripsKnownCount(e,t){return t&&e&&t[e]&&t[e].current?t[e].currentCantrips.length:0}_maxCantripsKnownCount(e,t){return t&&e&&t[e]?t[e].maxCantrips:0}_toggleTooltip(e){const t=e.target.dataset.tooltip,s=Array.from(e.target.children).find(e=>e.matches(".tooltip"));if(window.tooltipCloseListener||(window.tooltipCloseListener=!0,window.tooltips=[],document.addEventListener("click",()=>{window.tooltips.forEach(e=>{e.classList.remove("tooltip--open"),setTimeout(()=>{e.remove()},300)}),window.tooltips=[]})),s)s.classList.remove("tooltip--open"),setTimeout(()=>{s.remove()},300);else if(t){const s=document.createElement("div");s.innerHTML=t,s.classList.add("tooltip"),e.target.appendChild(s),setTimeout(()=>{s.classList.add("tooltip--open"),window.tooltips.push(s)},0)}}_spellsKnownString(e){return"Spells "+Object(i.util_capitalize)(e)+":"}_isRitualSpell(e){const t=e.children[0];return t&&t.meta&&t.meta.ritual}_isConcentrationSpell(e){return e.children[0].duration.some(e=>e.concentration)}_spellLevel(e){if(e&&e.children&&e.children.length&&e.children[0].level)return c.a.spLevelToFull(e.children[0].level)}_isSpellSlotChecked(e,t){return t<e}_spellClassText(e){return Object(i.util_capitalizeAll)(e)}_isEmpty(e){return!e||!e.length}_hideCheckboxes(e){return!e||e>0&&this.isEditMode}_equal(e,t){return e===t}_hasTwo(e){return e&&e.length&&e.length>1}_join(e){return e.join(", ")}static get template(){return l.b`
      <style include='my-styles'>
        :host {}
        :host {
          display: block;
        }
        [hidden] {
          display: none !important;
        }

        h2 {
          font-size: 24px;
          font-weight: bold;
          margin: 34px 14px 24px;
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
          color: var(--mdc-theme-secondary);
          font-weight: bold;
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

        vaadin-checkbox {
          pointer-events: none;
        }

        .spell-wrap {
          width: calc(100% - 100px);
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

        .rit-ind,
        .conc-ind {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          color: var(--mdc-theme-on-secondary);
          background-color: var(--mdc-theme-secondary);
          font-size: 10px;
          position: relative;
          bottom: 1px;
          margin-left: 4px;
        }

        .rit-ind::before {
          content: 'R';
        }

        .conc-ind::before {
          content: 'C';
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

        .spell-button,
        .class-icon {
          background-color: var(--mdc-theme-text-disabled-on-background);
          color: var(--mdc-theme-on-secondary);
          border: none;
          border-radius: 4px;
          outline: none;
          width: 60px;
          display: inline-block;
          justify-content: center;
          white-space: normal;
          font-size: 12px;
          padding: 1px 4px;
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
        .class-icon {
          width: auto;
        }

        .mods {
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-around;
          margin: 16px 0 8px;
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
        }
        .mod-label {
          font-weight: bold;
        }
        @media(min-width: 420px) {
          .mods {
            justify-content: flex-start;
          }
          .mod-row {
            font-size: 14px;
          }
          .mod-val-wrap {
            font-size: 18px;
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

      <div class="header-wrap" hidden$="[[noContentMessage]]">

        <!-- Spell Mods -->
        <div class="mods" >
          <div class="mod-row">
            <span class="mod-val-wrap">
              <template is="dom-repeat" items="[[spellMods]]">
                <span class="mod-val" data-tooltip$="[[_join(item.classes)]]" on-mouseover="_toggleTooltip" on-mouseout="_toggleTooltip">+[[item.mod]]</span>
              </template>
            </span>
            <span class="mod-label">Spell Mod</span>
          </div>
          <div class="mod-row">
            <span class="mod-val-wrap">
              <template is="dom-repeat" items="[[spellMods]]">
                <span class="mod-val" data-tooltip$="[[_join(item.classes)]]" on-mouseover="_toggleTooltip" on-mouseout="_toggleTooltip">+[[item.spellAttackBonus]]</span>
              </template>
            </span>
            <span class="mod-label">Spell Atk +</span>
          </div>
          <div class="mod-row">
            <span class="mod-val-wrap">
              <template is="dom-repeat" items="[[spellMods]]">
                <span class="mod-val" data-tooltip$="[[_join(item.classes)]]" on-mouseover="_toggleTooltip" on-mouseout="_toggleTooltip">[[item.dc]]</span>
              </template>
            </span>
            <span class="mod-label">Spell DC</span>
          </div>
        </div>

        <div class="filter">
          <vaadin-text-field clear-button-visible value="{{filterStr}}" placeholder='Filter'></vaadin-text-field>
        </div>
      </div>

      <div class="no-content-message" hidden$="[[!noContentMessage]]">Enter edit mode to add classes and levels.</div>

      <vaadin-grid id="grid" theme="no-border no-row-borders" expanded-items="[[expandedItems]]" height-by-rows hidden$="[[noContentMessage]]">
        <vaadin-grid-column flex-grow="1">
          <template>
              <template is="dom-if" if="[[_equal(item.id, 'class')]]">
                <div class="class-wrap">
                  <h3>[[item.className]]</h3>
                  <div class='spells-prepared-text'>
                    <span>[[_spellsKnownString(item.spellPrepType)]]</span>
                    <span class='prepared-count'>[[_currentSpellsKnownCount(item.className, spellsKnown)]] / [[_maxSpellsKnownCount(item.className, spellsKnown)]]</span>
                  </div>
                </div>
              </template>
  
              <template is="dom-if" if="[[_equal(item.id, 'level')]]">
                <div class="level-outer-wrap">
                  <vaadin-grid-tree-toggle leaf="[[!item.hasChildren]]" expanded="{{expanded}}">
                    <h4 class="level-wrap">[[_toLevel(item.level)]]</h4>
                    <div class="cantrips-prepared spells-prepared-text" hidden$="[[!_equal(item.level, 0)]]">
                      <span>Cantrips Known:</span>
                      <span class='prepared-count'>[[_currentCantripsKnownCount(item.parentClass, spellsKnown)]] / [[_maxCantripsKnownCount(item.parentClass, spellsKnown)]]</span>
                    </div>
                  </vaadin-grid-tree-toggle>

                  <div class="slot-checkboxes" hidden$="[[_hideCheckboxes(item.warlockSpellSlots, isEditMode)]]" on-click="_toggleSpellSlot" warlock-spell>
                    <template is='dom-repeat' items='[[_countToArray(item.warlockSpellSlots)]]' as="thing">
                      <span class="checkbox-wrap"><vaadin-checkbox checked="[[_isSpellSlotChecked(item.currentWarlockSlots, index)]]"></vaadin-checkbox></span>
                    </template>
                    <span>Pact</span>
                  </div>

                  <div class="slot-checkboxes" hidden$="[[_hideCheckboxes(item.spellSlots, isEditMode)]]" on-click="_toggleSpellSlot">
                    <template is='dom-repeat' items='[[_countToArray(item.spellSlots)]]' as="thing">
                      <span class="checkbox-wrap"><vaadin-checkbox checked="[[_isSpellSlotChecked(item.currentSlots, index)]]"></vaadin-checkbox></span>
                    </template>
                    <span>Slots</span>
                  </div>
                </div>
              </template>

              <template is="dom-if" if="[[_equal(item.id, 'spell')]]">
                <div class="spell-outer-wrap">
                  <vaadin-grid-tree-toggle leaf="[[!item.hasChildren]]" expanded="{{expanded}}" class="spell-wrap">
                    <span class="spell-inner-wrap">[[item.name]]<span class="spell-level" hidden>[[_spellLevel(item)]]</span><span class="rit-ind" title="Ritual" hidden$="[[!_isRitualSpell(item)]]"></span><span class="conc-ind" title="Concentration" hidden$="[[!_isConcentrationSpell(item)]]"></span></span>
                  </vaadin-grid-tree-toggle>
                  <button class$="[[_isPreparedClass(spellsKnown, item, isEditMode)]]" hidden$="[[!isEditMode]]" on-click="_toggleSpellPrepared">[[_isPreparedText(spellsKnown, item)]]</button>
                  <span class="class-icon" hidden$="[[isEditMode]]">[[_spellClassText(item.parentClass)]]</span>
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
    `}}customElements.define("dnd-character-builder-spells",p)}}]);
//# sourceMappingURL=6.bundle.js.map