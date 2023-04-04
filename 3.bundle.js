(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{144:function(e,t,l){"use strict";l(91),l(106)},147:function(e,t,l){"use strict";l(78)},150:function(e,t,l){"use strict";l(37),l(38);var s=l(7);const a=s.a`<dom-module id="lumo-grid-tree-toggle" theme-for="vaadin-grid-tree-toggle">
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
</dom-module>`;document.head.appendChild(a.content);var n=l(3),i=(l(43),l(10)),r=l(20),o=l(34),d=l(6);
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
const p=document.createElement("template");p.innerHTML="<custom-style>\n  <style>\n    @font-face {\n      font-family: \"vaadin-grid-tree-icons\";\n      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAQkAA0AAAAABrwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAECAAAABoAAAAcgHwa6EdERUYAAAPsAAAAHAAAAB4AJwAOT1MvMgAAAZQAAAA/AAAAYA8TBIJjbWFwAAAB8AAAAFUAAAFeGJvXWmdhc3AAAAPkAAAACAAAAAgAAAAQZ2x5ZgAAAlwAAABLAAAAhIrPOhFoZWFkAAABMAAAACsAAAA2DsJI02hoZWEAAAFcAAAAHQAAACQHAgPHaG10eAAAAdQAAAAZAAAAHAxVAgBsb2NhAAACSAAAABIAAAASAIAAVG1heHAAAAF8AAAAGAAAACAACgAFbmFtZQAAAqgAAAECAAACTwflzbdwb3N0AAADrAAAADYAAABZQ7Ajh3icY2BkYGAA4twv3Vfi+W2+MnCzMIDANSOmbGSa2YEZRHEwMIEoAAoiB6sAeJxjYGRgYD7w/wADAwsDCDA7MDAyoAI2AFEEAtIAAAB4nGNgZGBg4GBgZgDRDAxMDGgAAAGbABB4nGNgZp7JOIGBlYGBaSbTGQYGhn4IzfiawZiRkwEVMAqgCTA4MDA+38d84P8BBgdmIAapQZJVYGAEAGc/C54AeJxjYYAAxlAIzQTELAwMBxgZGB0ACy0BYwAAAHicY2BgYGaAYBkGRgYQiADyGMF8FgYbIM3FwMHABISMDArP9/3/+/8/WJXC8z0Q9v8nEp5gHVwMMMAIMo+RDYiZoQJMQIKJARUA7WBhGN4AACFKDtoAAAAAAAAAAAgACAAQABgAJgA0AEIAAHichYvBEYBADAKBVHBjBT4swl9KS2k05o0XHd/yW1hAfBFwCv9sIlJu3nZaNS3PXAaXXHI8Lge7DlzF7C1RgXc7xkK6+gvcD2URmQB4nK2RQWoCMRiFX3RUqtCli65yADModOMBLLgQSqHddRFnQghIAnEUvEA3vUUP0LP0Fj1G+yb8R5iEhO9/ef/7FwFwj28o9EthiVp4hBlehcfUP4Ur8o/wBAv8CU+xVFvhOR7UB7tUdUdlVRJ6HnHWTnhM/V24In8JT5j/KzzFSi2E53hUz7jCcrcIiDDwyKSW1JEct2HdIPH1DFytbUM0PofWdNk5E5oUqb/Q6HHBiVGZpfOXkyUMEj5IyBuNmYZQjBobfsuassvnkKLe1OuBBj0VQ8cRni2xjLWsHaM0jrjx3peYA0/vrdmUYqe9iy7bzrX6eNP7Jh1SijX+AaUVbB8AAHicY2BiwA84GBgYmRiYGJkZmBlZGFkZ2djScyoLMgzZS/MyDQwMwLSruZMzlHaB0q4A76kLlwAAAAEAAf//AA94nGNgZGBg4AFiMSBmYmAEQnYgZgHzGAAD6wA2eJxjYGBgZACCKxJigiD6mhFTNowGACmcA/8AAA==) format('woff');\n      font-weight: normal;\n      font-style: normal;\n    }\n  </style>\n</custom-style>",document.head.appendChild(p.content);class c extends(Object(r.a)(Object(o.a)(n.a))){static get template(){return s.a`
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
`}static get is(){return"vaadin-grid-tree-toggle"}static get properties(){return{level:{type:Number,value:0,observer:"_levelChanged"},leaf:{type:Boolean,value:!1,reflectToAttribute:!0},expanded:{type:Boolean,value:!1,reflectToAttribute:!0,notify:!0}}}ready(){super.ready(),this.addEventListener("click",e=>this._onClick(e))}_onClick(e){this.leaf||(e.preventDefault(),this.expanded=!this.expanded)}_levelChanged(e){const t=Number(e).toString();this.style["---level"]=t,this._debouncerUpdateLevel=i.a.debounce(this._debouncerUpdateLevel,d.c,()=>this.updateStyles({"---level":t}))}}customElements.define(c.is,c)},157:function(e,t,l){"use strict";l.r(t);var s=l(3),a=(l(109),l(150),l(32)),n=l(40),i=l(143),r=l(113),o=l(1),d=l(2);l(144),l(147),l(88);class p extends s.a{static get properties(){return{spellsKnown:{type:Object,value:{}},preparedSpells:{type:Object,value:{}},noContentMessage:{type:Boolean,value:!1},isEditMode:{type:Boolean,value:!1},filterStr:{type:String,value:"",observer:"_filterChange"},expandedItems:{type:Array}}}static get observers(){return["_expandedItemsChange(expandedItems.*)"]}_expandedItemsChange(){window.scrollTo(0,this.originalScrollHeight)}_recordScrollHeight(){this.originalScrollHeight=window.scrollY}__filterChangeThrottled(){this.filterStr.length?(this.oldExpanded||(this.oldExpanded=this.$.grid.expandedItems),this.expandAll(),this.$.grid.clearCache(),setTimeout(()=>{this.expandAll()},10)):(this.oldExpanded&&(this.$.grid.expandedItems=this.oldExpanded,this.oldExpanded=void 0),this.$.grid.clearCache())}constructor(){super(),this._filterChange=Object(o.debounce)(this.__filterChangeThrottled.bind(this),250)}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.refresh=!0,this.updateFromCharacter(Object(a.O)()),Object(a.m)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode,this.refresh=!0,this.updateFromCharacter(Object(a.O)())},Object(i.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(i.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(a.m)().removeEventListener("character-selected",this.characterChangeHandler),Object(i.b)().removeEventListener("editModeChange",this.editModeHandler)}ready(){super.ready(),this.multiclassSlotsDef=[[2],[3],[4,2],[4,3],[4,3,2],[4,3,3],[4,3,3,1],[4,3,3,2],[4,3,3,3,1],[4,3,3,3,2],[4,3,3,3,2,1],[4,3,3,3,2,1],[4,3,3,3,2,1,1],[4,3,3,3,2,1,1],[4,3,3,3,2,1,1,1],[4,3,3,3,2,1,1,1],[4,3,3,3,2,1,1,1,1],[4,3,3,3,3,1,1,1,1],[4,3,3,3,3,2,1,1,1],[4,3,3,3,3,2,2,1,1]],this.fullCasterSlotsDef=[],this.halfCasterSlotsDef=[],this.thirdCasterSlotsDef=[],setTimeout(()=>{this.$.grid.dataProvider=((e,t)=>{const l=e.page*e.pageSize;let s=e.parentItem?e.parentItem.children:this.spellDisplay;if(this.filterStr.length&&(s=s.filter(e=>this.hasDecendentWithFilter(e,this.filterStr.toLowerCase()))),s&&s.length){t(s.slice(l,l+e.pageSize),s.length)}}).bind(this)},0)}hasDecendentWithFilter(e,t){if(!e.name||e.name.toLowerCase().indexOf(t)>-1)return!0;const l=e.length?e:e.children;if(l&&l.length)for(let e of l)return this.hasDecendentWithFilter(e,t);return!1}clearFilterStr(){this.filterStr=""}expandAll(){this.$.grid.expandedItems=this.findExpandables(this.spellDisplay)}findExpandables(e,t=[]){"level"!==e.id&&"class"!==e.id||t.push(e);const l=e.length?e:e.children;if(l&&l.length)for(let e of l)this.findExpandables(e,t);return t}async updateSpellStats(e,t,l){if(t&&e&&l){const s=[],n=Object.entries(t).reduce((e,[t,l])=>e+l,0),i=Object(o.getProfBonus)(n);for(const[l,n]of Object.entries(t)){const t=e[l];if(t.casterProgression){const e=s.find(e=>t.spellcastingAbility===e.spellcastingAbility);if(e)e.classes.push(l);else{const e=await Object(a.i)(t.spellcastingAbility),n=e+i,r=8+n;s.push({classes:[l],mod:e,spellAttackBonus:n,dc:r,spellcastingAbility:t.spellcastingAbility})}}}const r=Object.values(l.choices).filter(e=>e.additionalSpells&&(e.additionalSpells.defaultAbility||e.additionalSpells.selectedAbility));for(const e of r){const t=e.additionalSpells.defaultAbility||e.additionalSpells.selectedAbility,l=s.find(e=>t.toLowerCase()===e.spellcastingAbility);if(l)l.classes.push(t);else{const e=await Object(a.i)(t),l=e+i,n=8+l;s.push({classes:[t],mod:e,spellAttackBonus:l,dc:n,spellcastingAbility:t})}}this.spellMods=s}else this.spellMods=[]}async updateFromCharacter(e){if(e&&this.refresh){this.noContentMessage=!0;const t=await Object(a.B)(e),l=Object(a.A)(e),s=[],i={};let r=[];this.updateSpellStats(t,l,e);for(const[d,p]of Object.entries(l)){const l=t[d];let c=l,h=!1,m=l.classTableGroups,u=d;if(!c.casterProgression){if(p>=Object(a.S)(l)&&e.subclasses&&e.subclasses[d]&&l.subclasses&&l.subclasses.length){const t=l.subclasses.find(t=>e.subclasses[d].name===t.name);t&&t.casterProgression&&(c=t,u=t.shortName,m=t.subclassTableGroups,h=!0)}}if(c.casterProgression){let t,g;this.noContentMessage=!1;const A=c.cantripProgression?c.cantripProgression[p-1]:0;let f,b;if(c.spellsKnownProgression)g="known",t=c.spellsKnownProgression[p-1],"pact"===c.casterProgression&&(f=[1,1,2,2,3,3,4,4,5,5,5,5,5,5,5,5,5,5,5,5][p-1],b=[1,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,4,4,4,4][p-1]);else if(c.preparedSpells){g="prepared";const e="full"===c.casterProgression?1:.51,l=await Object(a.i)(c.spellcastingAbility);t=Math.floor(p*e)+l,t=t<1?1:t}else console.error("!!! neither prepared or known spells",c);let v,x=[];if(h)v=c.shortName;else{let t=c.name.indexOf("(Revised)")>-1?"PHB":c.source,s=c.name.indexOf("(Revised)")>-1?c.name.replaceAll("(Revised)","").trim():c.name;x=await Object(n.a)("spells",{key:"classes.fromClassList",value:{name:s,source:t}});p>=Object(a.S)(l)&&(v=e.subclasses&&e.subclasses[d]?e.subclasses[d].shortName:"")}if(v&&("Eldritch Knight"===v&&(x=await Object(n.a)("spells",{key:"classes.fromClassList",value:{name:"wizard",source:"phb"}})),"Divine Soul"===v)){let e=await Object(n.a)("spells",{key:"classes.fromClassList",value:{name:"cleric",source:"phb"}});x=[...new Set(x.concat(e))]}const w=m.find(e=>"Spell Slots"===e.title);let S;if(w)S=w.rowsSpellProgression[p-1].filter(e=>0!==e);else{S=[];for(let e=0;e<f;e++)S.push(0)}const y=A?0:1;A&&(S=[0].concat(S));let C=Object(o.cloneDeep)(e.preparedSpells),k=Object(o.cloneDeep)(e.preparedCantrips);e.preparedSpells[u]={},e.preparedCantrips[u]={};const _=S.map((t,l)=>{if(-1!==t){let n=x.filter(e=>e.level===l+y).sort((e,t)=>e.name<t.name?-1:e.name>t.name?1:0).map(t=>{const s=l+y===0,n=s?Object(a.W)(u,t,k):Object(a.W)(u,t,C);return n&&(s?e.preparedCantrips[u][t.name]={name:t.name,source:t.source}:e.preparedSpells[u][t.name]={name:t.name,source:t.source}),this.isEditMode||n||t.isAlwaysPrepared?{id:"spell",name:t.name,children:[{...t,hasChildren:!1,id:"spelldef",parentClass:u,parentLevel:l+y}],hasChildren:!0,parentClass:u,parentLevel:l+y,isCantrip:s,isAlwaysPrepared:t.isAlwaysPrepared,isWarlock:!!f}:void 0}).filter(e=>void 0!==e);const i={id:"level",level:l+y,spellSlots:t,currentSlots:Object(a.Q)(l+y),children:n,hasChildren:n.length>0,parentClass:u,isWarlock:!!f};return this.$.grid.expandedItems.some(e=>"level"===e.id&&e.level===i.level&&e.parentClass===i.parentClass)&&s.push(i),i}return null}).filter(e=>null!==e);if(i[u]={current:e.preparedSpells&&e.preparedSpells[u]?Object.keys(e.preparedSpells[u]):[],max:t,type:g,maxCantrips:A,currentCantrips:e.preparedCantrips&&e.preparedCantrips[u]?Object.keys(e.preparedCantrips[u]):[]},_.length){const e={id:"class",className:u,level:p,hasCantrips:y,children:_,spellsKnown:t,hasChildren:_.length>0,spellPrepType:g,multiclassingLevels:h?0:Math.floor(("full"===l.casterProgression?1:.5)*p),isWarlock:!!f,warlockSpellLevel:f,warlockSpellSlots:b};s.push(e),r.push(e)}}}const d=Object.values(e.choices).filter(e=>!!e.additionalSpells),p=await Object(n.b)("spells"),c={};if(d.forEach(e=>{e.additionalSpells.defaultSpells.concat(e.additionalSpells.selectedSpells).forEach(t=>{(t.spells?t.spells:[t]).forEach(s=>{const a=p.find(e=>e.name.toLowerCase()===s.name.toLowerCase()&&e.source.toLowerCase()===s.source.toLowerCase());if(a){const n=a.level,i=e.label&&("expanded"===s.type||"prepared"===s.type)&&Object.keys(l).find(t=>t.toLowerCase()===e.label.toLowerCase())?e.label:"Other";c[i]||(c[i]={}),c[i][n]||(c[i][n]=[]),c[i][n].push({storedItemName:e.selectedItemName,...e.additionalSpells,...s,...t,label:e.label,spellDef:a})}})})}),console.error("addtlSpellsObj",c),Object.entries(c).forEach(([t,l])=>{if(this.noContentMessage=!1,"Other"!==t){const s=r.find(e=>e.className.toLowerCase()===t);s?Object.entries(l).forEach(([l,a])=>{let n=s.children[l]?s.children[l]:null;n&&a.forEach(s=>{const a=n.children.find(e=>e.children[0].name===s.spellDef.name&&e.children[0].source===s.spellDef.source);a?(a.isAlwaysPrepared=!0,a.spellSlots=s.uses,a.spellUseType=s.type,a.currentSlots=e.spellSlots&&e.spellSlots[s.spellDef.name]?e.spellSlots[s.spellDef.name]:0,a.ability=s.selectedAbility||s.defaultAbility,a.superLabel=[s.label,s.storedItemName].filter(e=>!!e).map(o.util_capitalize).join(": ")):(n.children.push({id:"spell",name:s.spellDef.name,children:[{...s.spellDef,hasChildren:!1,id:"spelldef",parentClass:t,parentLevel:l,uses:s.uses}],hasChildren:!0,parentClass:t,parentLevel:l,isCantrip:0===l,isAlwaysPrepared:!0,isWarlock:"warlock"===t,spellUseType:s.type,spellSlots:s.uses,ability:s.selectedAbility||s.defaultAbility,currentSlots:e.spellSlots&&e.spellSlots[s.spellDef.name]?e.spellSlots[s.spellDef.name]:0,superLabel:[s.label,s.storedItemName].filter(e=>!!e).map(o.util_capitalize).join(": ")}),n.hasChildren=!0)})}):console.error("Additional spell for class that doesnt have regular spells")}else{const t=[];Object.entries(c.Other).forEach(([l,s])=>{s.forEach(l=>{const s="will"===l.type||0===l.spellDef.level?"At Will":"Innate";let a=t.find(e=>e.level===s);a||(a={id:"level",level:s,spellSlots:0,currentSlots:0,children:[],hasChildren:!0,parentClass:"Other"},t.push(a)),a.children.push({id:"spell",name:l.spellDef.name,children:[{...l.spellDef,hasChildren:!1,id:"spelldef",parentClass:"Other",parentLevel:"Other"}],hasChildren:!0,parentClass:"Other",parentLevel:"Other",isCantrip:!1,isAlwaysPrepared:!0,isWarlock:!1,spellUseType:l.type,spellSlots:l.uses,ability:l.selectedAbility||l.defaultAbility,currentSlots:e.spellSlots&&e.spellSlots[l.spellDef.name]?e.spellSlots[l.spellDef.name]:0,superLabel:[l.label,l.storedItemName].filter(e=>!!e).map(o.util_capitalize).join(": ")})})});const l={id:"class",className:"Other",level:0,hasCantrips:!1,children:t,spellsKnown:0,hasChildren:t>0,spellPrepType:"always",multiclassingLevels:0,isWarlock:!1,warlockSpellLevel:0,warlockSpellSlots:0};r.push(l),s.push(l)}}),r.sort((e,t)=>"Other"===e.className?-1:t.children.length-e.children.length),!this.isEditMode){let t=[];if(r.length){let l,s,n,i=0,o=-1;for(let e of r)e.isWarlock?(l=e.warlockSpellLevel,s=e.warlockSpellSlots,o++):(i+=e.multiclassingLevels,o++),"Other"!==e.className?e.children.forEach((l,s)=>{const a=s+e.hasCantrips;t[a]?(t[a].children=t[a].children.concat(l.children),t[a].hasChildren=!!t[a].children.length):t[a]=l}):n=e;t=t.filter(e=>void 0!==e);const d=t.length&&0===t[0].level;if(o>0){const e=this.multiclassSlotsDef[i+1];for(let l=d?1:0;l<e.length;l++){const s=e[l-(d?1:0)];t[l]?t[l].spellSlots=s:t.push({children:[],currentSlots:Object(a.Q)(l+1-(d?1:0)),hasChildren:!1,id:"level",isWarlock:!1,level:l,spellSlots:s})}}l&&(t[l-(d?0:1)].warlockSpellSlots=s,t[l-(d?0:1)].currentWarlockSlots=e.warlockSpellSlots||0),n&&(t=n.children.concat(t))}r=t}this.refresh=!1,Object(a.fb)(e),this.spellsKnown=i,this.spellDisplay=r,this.expandedItems=s,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0})),this.$.grid.clearCache()}}_renderSpell(e){return Object(r.spellHtml)(e)}_toggleSpellPrepared(e){e.preventDefault(),e.stopPropagation();if(!e.model.item.isAlwaysPrepared&&this.isEditMode){if(e.model.item.isCantrip)this._toggleCantripPrepared(e);else{const t=e.model.item.parentClass,l=e.model.item.children[0],s=this._isPreparedSpell(this.spellsKnown,t,l.name),n=this._currentSpellsKnownCount(t,this.spellsKnown),i=this._maxSpellsKnownCount(t,this.spellsKnown);if((s||n<i)&&"spelldef"===l.id){let e=JSON.parse(JSON.stringify(this.spellsKnown));if(s){const s=e[t].current.indexOf(l.name);e[t].current.splice(s,1)}else e[t].current.push(l.name);this.spellsKnown=e,Object(a.Cb)(t,l)}else n>=i&&this._flashPreparedButton(Object(o.findInPath)("button",e))}}}_toggleCantripPrepared(e){e.preventDefault(),e.stopPropagation();const t=e.model.item.parentClass,l=e.model.item.children[0],s=this._isPreparedCantrip(this.spellsKnown,t,l.name),n=this._currentCantripsKnownCount(t,this.spellsKnown),i=this._maxCantripsKnownCount(t,this.spellsKnown);if((s||n<i)&&"spelldef"===l.id){let e=JSON.parse(JSON.stringify(this.spellsKnown));if(s){const s=e[t].currentCantrips.indexOf(l.name);e[t].currentCantrips.splice(s,1)}else e[t].currentCantrips.push(l.name);this.spellsKnown=e,Object(a.vb)(t,l)}else n>=i&&this._flashPreparedButton(Object(o.findInPath)("button",e))}_flashPreparedButton(e){e&&(e.classList.add("transition-bg"),e.classList.add("flash-error"),setTimeout(()=>{e.classList.remove("flash-error"),setTimeout(()=>{e.classList.remove("transition-bg")},200)},200))}_toggleSpellSlot(e){e.preventDefault(),e.stopPropagation();const t=Object(o.findInPath)(".checkbox-wrap",e),l=!!Object(o.findInPath)("[warlock-spell]",e),s=l?e.model.item.currentWarlockSlots:e.model.item.currentSlots,n=l?e.model.item.warlockSpellSlots:e.model.item.spellSlots,i=e.model.item.level||e.model.item.name;if(t){!t.children[0].checked&&s<n?l?e.model.item.currentWarlockSlots=s+1:e.model.item.currentSlots=s+1:s>0&&(l?e.model.item.currentWarlockSlots=s-1:e.model.item.currentSlots=s-1)}else s<n?l?e.model.item.currentWarlockSlots=s+1:e.model.item.currentSlots=s+1:s>0&&(l?e.model.item.currentWarlockSlots=s-1:e.model.item.currentSlots=s-1);l?(this._setSpellSlotsChecked(e.model.item.currentWarlockSlots,Object(o.findInPath)(".slot-checkboxes",e)),Object(a.sb)(i,e.model.item.currentWarlockSlots,void 0,!0)):(this._setSpellSlotsChecked(e.model.item.currentSlots,Object(o.findInPath)(".slot-checkboxes",e)),Object(a.sb)(i,e.model.item.currentSlots))}_setSpellSlotsChecked(e,t){const l=t.querySelectorAll("vaadin-checkbox");for(let t=0;t<l.length;t++)l[t].checked=t<e}_isPreparedClass(e,t,l){const s=t.parentClass,a=t.name,n=t.isCantrip,i=t.isAlwaysPrepared;if(i)return l?"spell-button always-prepared edit-mode":"spell-button always-prepared";return(n?this._isPreparedCantrip(e,s,a):this._isPreparedSpell(e,s,a,i))?l?"spell-prepared spell-button edit-mode":"spell-prepared spell-button":l?"spell-button edit-mode":"spell-button"}_isPreparedSpell(e,t,l,s){return s||e[t]&&e[t].current&&e[t].current.length&&e[t].current.indexOf(l)>-1}_isPreparedCantrip(e,t,l){return e[t]&&e[t].currentCantrips&&e[t].currentCantrips.length&&e[t].currentCantrips.indexOf(l)>-1}_isPreparedText(e,t){const l=t.parentClass,s=t.name,a=t.isCantrip,n=t.isAlwaysPrepared,i=e[l]?e[l].type:void 0;if(n)return"Always";return(a?this._isPreparedCantrip(e,l,s):this._isPreparedSpell(e,l,s,n))?"known"===i?"Learned":"Prepared":"known"===i?"Learn":"Prepare"}_countToArray(e){const t=[];for(var l=0;l<e;l++)t.push(null);return t}_toLevel(e){return"At Will"===e||"Innate"===e?e:0===e?d.a.spLevelToFull(e)+"s":d.a.spLevelToFull(e)+" Level"}_currentSpellsKnownCount(e,t){return t&&e&&t[e]&&t[e].current?t[e].current.length:0}_maxSpellsKnownCount(e,t){return t&&e&&t[e]?t[e].max:0}_currentCantripsKnownCount(e,t){return t&&e&&t[e]&&t[e].current?t[e].currentCantrips.length:0}_maxCantripsKnownCount(e,t){return t&&e&&t[e]?t[e].maxCantrips:0}_toggleEditMode(){Object(i.a)(!this.isEditMode)}_spellsKnownString(e){return"Spells "+Object(o.util_capitalize)(e)+":"}_isRitualSpell(e){const t=e.children[0];return t&&t.meta&&t.meta.ritual}_isConcentrationSpell(e){return e.children[0].duration.some(e=>e.concentration)}_isBonusActionSpell(e){return e.children[0].time.some(e=>"bonus"===e.unit)}_getSpellSchool(e){const t=e.children[0];return d.a.SP_SCHOOL_ABV_TO_FULL[t.school]}_hidePrepareSpellsButton(e,t){return e||!Object.values(t).some(e=>e.current.length<e.max-1||e.currentCantrips.length<e.maxCantrips-1)}_hidePreparedCountLabel(e,t){return 0===this._currentSpellsKnownCount(e,t)}_spellLevel(e){if(e&&e.children&&e.children.length&&e.children[0].level)return d.a.spLevelToFull(e.children[0].level)}_isSpellSlotChecked(e,t){return t<e}_spellClassText(e){return e}_isEmpty(e){return!e||!e.length}_hideCheckboxes(e,t,l){return!e||e>0&&this.isEditMode||"known"===l||"will"===l}_hideAbility(e){return!e}_hideAtWill(e){return"will"!==e}_hideSlotsLabel(e,t,l){return!e||0===t||"At Will"===t||"Innate"===t||"Warlock"===l}_innateUsageString(e){return"daily"===e?"<span>Long Rest</span>":"rest"===e?"<span>Short Rest</span>":e?"<span>"+Object(o.util_capitalizeAll)(e)+"</span>":void 0}_wrapClassString(e){return e?"edit-mode":"not-edit-mode"}_equal(e,t){return e===t}_hasTwo(e){return e&&e.length&&e.length>1}_join(e){return e.join(", ")}_abs(e){return e>=0?"+"+e:e}static get template(){return s.b`
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
          display: flex;
          align-items: center;
        }

        .slot-checkboxes .label {
          padding-left: 8px;
        }
        .slot-checkboxes .label span {
          font-size: 12px;
          display: inline-block;
          white-space: pre-wrap;
          text-align: center;
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
          position: relative;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          -youbkit-touch-callout: none;
          -youbkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .spell-inner-wrap[has-super] {
          padding-top: 12px;
          padding-bottom: 4px;
        }

        .spell-level {
          color: var(--mdc-theme-text-disabled-on-background);
          margin-left: 8px;
          margin-right: 4px;
          font-size: 12px;
        }

        .spell-ability {
          font-size: 12px;
          display: flex;
          align-items: center;
          color: var(--mdc-theme-text-secondary-on-background);
        }

        .spell-at-will {
          font-size: 12px;
          display: flex;
          align-items: center;
        }

        .spell-super-text {
          position: absolute;
          top: 0px;
          font-size: 10px;
          left: 0px;
          color: var(--mdc-theme-text-secondary-on-background);
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
          margin: -18px 14px 0;
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
          height: min-content;
          margin-top: auto;
          margin-bottom: auto;
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
        .class-icon[hide] {
          display: none;
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
        .mod-val:focus {
          outline: none;
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
          left: 15px;
          top: -35px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .mod-val {
          position: relative;
        }
        .mod-val:focus .tooltip,
        .mod-val:hover .tooltip {
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
          bottom: -4px;
          left: 1px;
          transform: rotate(180deg);
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
                <span class="mod-val" tabindex="0">[[_abs(item.mod)]]<span class="tooltip">[[_join(item.classes)]]</span></span>
              </template>
            </span>
            <span class="mod-label">Modifier</span>
          </div>
          <div class="mod-row">
            <span class="mod-val-wrap">
              <template is="dom-repeat" items="[[spellMods]]">
                <span class="mod-val" tabindex="0">+[[item.spellAttackBonus]]<span class="tooltip">[[_join(item.classes)]]</span></span>
              </template>
            </span>
            <span class="mod-label">Attack +</span>
          </div>
          <div class="mod-row">
            <span class="mod-val-wrap">
              <template is="dom-repeat" items="[[spellMods]]">
                <span class="mod-val" tabindex="0">[[item.dc]]<span class="tooltip">[[_join(item.classes)]]</span></span>
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
                  <div class='spells-prepared-text' hidden$="[[_hidePreparedCountLabel(item.className, spellsKnown)]]">
                    <span>[[_spellsKnownString(item.spellPrepType)]]</span>
                    <span class='prepared-count' edit-mode$=[[isEditMode]]>[[_currentSpellsKnownCount(item.className, spellsKnown)]] / [[_maxSpellsKnownCount(item.className, spellsKnown)]]</span>
                  </div>
                </div>
              </template>
  
              <template is="dom-if" if="[[_equal(item.id, 'level')]]">
                <div class="level-outer-wrap">
                  <vaadin-grid-tree-toggle leaf="[[!item.hasChildren]]" expanded="{{expanded}}" on-click='_recordScrollHeight'>
                    <h4 class="level-wrap">[[_toLevel(item.level)]]<span hidden$="[[_hideSlotsLabel(isEditMode, item.level, item.parentClass)]]" class="label">([[item.spellSlots]] Slots)</span></h4>
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
                    <div class="spell-inner-wrap" has-super$="[[!_hideAbility(item.superLabel)]]" not-edit-mode$="[[!isEditMode]]">
                      <span class=spell-super-text>[[item.superLabel]]</span>
                      [[item.name]]
                      <span class="spell-level" hidden>[[_spellLevel(item)]]</span>
                      <span class="ind rit-ind" title="Ritual" hidden$="[[!_isRitualSpell(item)]]"></span>
                      <span class="ind conc-ind" title="Concentration" hidden$="[[!_isConcentrationSpell(item)]]"></span>
                      <span class="ind bonus-ind" title="Bonus Action" hidden$="[[!_isBonusActionSpell(item)]]"></span>
                      <span class="ind school-ind" title="[[_getSpellSchool(item)]]">[[_getSpellSchool(item)]]</span>
                    </div>
                  </vaadin-grid-tree-toggle>

                  <div class="spell-ability" hidden$="[[_hideAbility(item.ability)]]">([[item.ability]])</div>

                  <div class="slot-checkboxes" hidden$="[[_hideCheckboxes(item.spellSlots, isEditMode, item.spellUseType)]]" on-click="_toggleSpellSlot">
                    <template is='dom-repeat' items='[[_countToArray(item.spellSlots)]]' as="thing">
                      <span class="checkbox-wrap"><vaadin-checkbox checked="[[_isSpellSlotChecked(item.currentSlots, index)]]"></vaadin-checkbox></span>
                    </template>
                    <span class="label" inner-h-t-m-l="[[_innateUsageString(item.spellUseType)]]"></span>
                  </div>

                  <div class="spell-at-will" hidden$="[[_hideAtWill(item.spellUseType)]]">At Will</div>
        
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
    `}}customElements.define("dnd-character-builder-spells",p)}}]);
//# sourceMappingURL=3.bundle.js.map