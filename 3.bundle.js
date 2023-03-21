(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{144:function(e,t,l){"use strict";l(91),l(106)},147:function(e,t,l){"use strict";l(78)},150:function(e,t,l){"use strict";l(37),l(38);var s=l(7);const o=s.a`<dom-module id="lumo-grid-tree-toggle" theme-for="vaadin-grid-tree-toggle">
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
</dom-module>`;document.head.appendChild(o.content);var n=l(3),i=(l(43),l(10)),r=l(20),a=l(34),d=l(6);
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
const c=document.createElement("template");c.innerHTML="<custom-style>\n  <style>\n    @font-face {\n      font-family: \"vaadin-grid-tree-icons\";\n      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAQkAA0AAAAABrwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAECAAAABoAAAAcgHwa6EdERUYAAAPsAAAAHAAAAB4AJwAOT1MvMgAAAZQAAAA/AAAAYA8TBIJjbWFwAAAB8AAAAFUAAAFeGJvXWmdhc3AAAAPkAAAACAAAAAgAAAAQZ2x5ZgAAAlwAAABLAAAAhIrPOhFoZWFkAAABMAAAACsAAAA2DsJI02hoZWEAAAFcAAAAHQAAACQHAgPHaG10eAAAAdQAAAAZAAAAHAxVAgBsb2NhAAACSAAAABIAAAASAIAAVG1heHAAAAF8AAAAGAAAACAACgAFbmFtZQAAAqgAAAECAAACTwflzbdwb3N0AAADrAAAADYAAABZQ7Ajh3icY2BkYGAA4twv3Vfi+W2+MnCzMIDANSOmbGSa2YEZRHEwMIEoAAoiB6sAeJxjYGRgYD7w/wADAwsDCDA7MDAyoAI2AFEEAtIAAAB4nGNgZGBg4GBgZgDRDAxMDGgAAAGbABB4nGNgZp7JOIGBlYGBaSbTGQYGhn4IzfiawZiRkwEVMAqgCTA4MDA+38d84P8BBgdmIAapQZJVYGAEAGc/C54AeJxjYYAAxlAIzQTELAwMBxgZGB0ACy0BYwAAAHicY2BgYGaAYBkGRgYQiADyGMF8FgYbIM3FwMHABISMDArP9/3/+/8/WJXC8z0Q9v8nEp5gHVwMMMAIMo+RDYiZoQJMQIKJARUA7WBhGN4AACFKDtoAAAAAAAAAAAgACAAQABgAJgA0AEIAAHichYvBEYBADAKBVHBjBT4swl9KS2k05o0XHd/yW1hAfBFwCv9sIlJu3nZaNS3PXAaXXHI8Lge7DlzF7C1RgXc7xkK6+gvcD2URmQB4nK2RQWoCMRiFX3RUqtCli65yADModOMBLLgQSqHddRFnQghIAnEUvEA3vUUP0LP0Fj1G+yb8R5iEhO9/ef/7FwFwj28o9EthiVp4hBlehcfUP4Ur8o/wBAv8CU+xVFvhOR7UB7tUdUdlVRJ6HnHWTnhM/V24In8JT5j/KzzFSi2E53hUz7jCcrcIiDDwyKSW1JEct2HdIPH1DFytbUM0PofWdNk5E5oUqb/Q6HHBiVGZpfOXkyUMEj5IyBuNmYZQjBobfsuassvnkKLe1OuBBj0VQ8cRni2xjLWsHaM0jrjx3peYA0/vrdmUYqe9iy7bzrX6eNP7Jh1SijX+AaUVbB8AAHicY2BiwA84GBgYmRiYGJkZmBlZGFkZ2djScyoLMgzZS/MyDQwMwLSruZMzlHaB0q4A76kLlwAAAAEAAf//AA94nGNgZGBg4AFiMSBmYmAEQnYgZgHzGAAD6wA2eJxjYGBgZACCKxJigiD6mhFTNowGACmcA/8AAA==) format('woff');\n      font-weight: normal;\n      font-style: normal;\n    }\n  </style>\n</custom-style>",document.head.appendChild(c.content);class p extends(Object(r.a)(Object(a.a)(n.a))){static get template(){return s.a`
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
`}static get is(){return"vaadin-grid-tree-toggle"}static get properties(){return{level:{type:Number,value:0,observer:"_levelChanged"},leaf:{type:Boolean,value:!1,reflectToAttribute:!0},expanded:{type:Boolean,value:!1,reflectToAttribute:!0,notify:!0}}}ready(){super.ready(),this.addEventListener("click",e=>this._onClick(e))}_onClick(e){this.leaf||(e.preventDefault(),this.expanded=!this.expanded)}_levelChanged(e){const t=Number(e).toString();this.style["---level"]=t,this._debouncerUpdateLevel=i.a.debounce(this._debouncerUpdateLevel,d.c,()=>this.updateStyles({"---level":t}))}}customElements.define(p.is,p)},156:function(e,t,l){"use strict";l.r(t);var s=l(3),o=(l(108),l(150),l(32)),n=l(40),i=l(143),r=l(113),a=l(1),d=l(2);l(144),l(147),l(88);class c extends s.a{static get properties(){return{spellsKnown:{type:Object,value:{}},preparedSpells:{type:Object,value:{}},noContentMessage:{type:Boolean,value:!1},isEditMode:{type:Boolean,value:!1},filterStr:{type:String,value:"",observer:"_filterChange"},expandedItems:{type:Array}}}static get observers(){return["_expandedItemsChange(expandedItems.*)"]}_expandedItemsChange(){window.scrollTo(0,this.originalScrollHeight)}_recordScrollHeight(){this.originalScrollHeight=window.scrollY}__filterChangeThrottled(){this.filterStr.length?(this.oldExpanded||(this.oldExpanded=this.$.grid.expandedItems),this.expandAll(),this.$.grid.clearCache(),setTimeout(()=>{this.expandAll()},10)):(this.oldExpanded&&(this.$.grid.expandedItems=this.oldExpanded,this.oldExpanded=void 0),this.$.grid.clearCache())}constructor(){super(),this._filterChange=Object(a.debounce)(this.__filterChangeThrottled.bind(this),250)}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.refresh=!0,this.updateFromCharacter(Object(o.Q)()),Object(o.n)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode,this.refresh=!0,this.updateFromCharacter(Object(o.Q)())},Object(i.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(i.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(o.n)().removeEventListener("character-selected",this.characterChangeHandler),Object(i.b)().removeEventListener("editModeChange",this.editModeHandler)}ready(){super.ready(),this.multiclassSlotsDef=[[2],[3],[4,2],[4,3],[4,3,2],[4,3,3],[4,3,3,1],[4,3,3,2],[4,3,3,3,1],[4,3,3,3,2],[4,3,3,3,2,1],[4,3,3,3,2,1],[4,3,3,3,2,1,1],[4,3,3,3,2,1,1],[4,3,3,3,2,1,1,1],[4,3,3,3,2,1,1,1],[4,3,3,3,2,1,1,1,1],[4,3,3,3,3,1,1,1,1],[4,3,3,3,3,2,1,1,1],[4,3,3,3,3,2,2,1,1]],this.fullCasterSlotsDef=[],this.halfCasterSlotsDef=[],this.thirdCasterSlotsDef=[],setTimeout(()=>{this.$.grid.dataProvider=((e,t)=>{const l=e.page*e.pageSize;let s=e.parentItem?e.parentItem.children:this.spellDisplay;if(this.filterStr.length&&(s=s.filter(e=>this.hasDecendentWithFilter(e,this.filterStr.toLowerCase()))),s&&s.length){t(s.slice(l,l+e.pageSize),s.length)}}).bind(this)},0)}hasDecendentWithFilter(e,t){if(!e.name||e.name.toLowerCase().indexOf(t)>-1)return!0;const l=e.length?e:e.children;if(l&&l.length)for(let e of l)return this.hasDecendentWithFilter(e,t);return!1}clearFilterStr(){this.filterStr=""}expandAll(){this.$.grid.expandedItems=this.findExpandables(this.spellDisplay)}findExpandables(e,t=[]){"level"!==e.id&&"class"!==e.id||t.push(e);const l=e.length?e:e.children;if(l&&l.length)for(let e of l)this.findExpandables(e,t);return t}async updateSpellStats(e,t){if(t&&e){const l=[],s=Object.entries(t).reduce((e,[t,l])=>e+l,0),n=Object(a.getProfBonus)(s);for(const[s,i]of Object.entries(t)){const t=e[s];if(t.casterProgression){const e=l.find(e=>t.spellcastingAbility===e.spellcastingAbility);if(e)e.classes.push(s);else{const e=await Object(o.j)(t.spellcastingAbility),i=e+n,r=8+i;l.push({classes:[s],mod:e,spellAttackBonus:i,dc:r,spellcastingAbility:t.spellcastingAbility})}}}this.spellMods=l}else this.spellMods=[]}async updateFromCharacter(e){if(e&&this.refresh){this.noContentMessage=!0;const t=await Object(o.C)(e),l=Object(o.B)(e),s=[],i={};let r=[];this.updateSpellStats(t,l);for(const[a,d]of Object.entries(l)){const l=t[a];let c=l,p=!1,h=l.classTableGroups,m=a;if(!c.casterProgression){const t=Object(o.U)(l);if(d>=t&&e.subclasses&&e.subclasses[a]&&l.subclasses&&l.subclasses.length){const t=l.subclasses.find(t=>e.subclasses[a].name===t.name);t&&t.casterProgression&&(c=t,m=t.shortName,h=t.subclassTableGroups,p=!0)}}if(c.casterProgression){let t;this.noContentMessage=!1;let g,u,A,f="known";if(h.forEach(e=>{if(e.colLabels&&e.colLabels.length){const l=e.colLabels.findIndex(e=>e.toLowerCase().indexOf("spells known")>-1);l>-1&&e.rows&&e.rows.length>d-1&&(t=e.rows[d-1][l]);const s=e.colLabels.findIndex(e=>e.toLowerCase().indexOf("cantrips known")>-1);s>-1&&e.rows&&e.rows.length>d-1&&(g=e.rows[d-1][s]);const o=e.colLabels.findIndex(e=>e.toLowerCase().indexOf("slot level")>-1);if(o>-1&&e.rows&&e.rows.length>d-1){const t=e.rows[d-1][o].match(/(\d+)/g);t&&t.length&&(u=parseInt(t[0]))}const n=e.colLabels.findIndex(e=>e.toLowerCase().indexOf("spell slots")>-1);n>-1&&e.rows&&e.rows.length>d-1&&(A=e.rows[d-1][n])}}),void 0===t){f="prepared";const e="full"===c.casterProgression?1:.51,l=await Object(o.j)(c.spellcastingAbility);t=Math.floor(d*e)+l,t=t<1?1:t}let b,v=[];if(p)b=c.shortName;else{let t=c.name.indexOf("(Revised)")>-1?"PHB":c.source,s=c.name.indexOf("(Revised)")>-1?c.name.replaceAll("(Revised)","").trim():c.name;v=await Object(n.a)("spells",{key:"classes.fromClassList",value:{name:s,source:t}});const i=Object(o.U)(l);d>=i&&(b=e.subclasses&&e.subclasses[a]?e.subclasses[a].shortName:"")}if(b){"Eldritch Knight"===b&&(v=await Object(n.a)("spells",{key:"classes.fromClassList",value:{name:"wizard",source:"phb"}}));let t=await Object(n.a)("spells",{key:"classes.fromSubclass",value:{"subclass.name":b,"class.name":a,"class.source":l.source}});if("Divine Soul"===b){let l=Object(o.T)(a.toLowerCase(),b.toLowerCase(),d,"Divine Magic Affinity",e);t=l?t.filter(e=>l.indexOf(e.name)>-1):[]}t=t.map(e=>({...e,isSubclassSpell:!0})),v=[...new Set(v.concat(t))]}if("Divine Soul"===b){let e=await Object(n.a)("spells",{key:"classes.fromClassList",value:{name:"cleric",source:"phb"}});v=[...new Set(v.concat(e))]}const w=h.find(e=>"Spell Slots"===e.title);let x;if(w)x=w.rowsSpellProgression[d-1].filter(e=>0!==e);else{x=[];for(let e=0;e<u;e++)x.push(0)}const S=g?0:1;g&&(x=[0].concat(x));let C=JSON.parse(JSON.stringify(e.preparedSpells)),y=JSON.parse(JSON.stringify(e.preparedCantrips));e.preparedSpells[m]={},e.preparedCantrips[m]={};const k=x.map((t,l)=>{if(-1!==t){let n=v.filter(e=>e.level===l+S).sort((e,t)=>e.name<t.name?-1:e.name>t.name?1:0).map(t=>{const s=l+S===0,n=s?Object(o.Y)(m,t,y):Object(o.Y)(m,t,C);return n&&(s?e.preparedCantrips[m][t.name]={name:t.name,source:t.source}:e.preparedSpells[m][t.name]={name:t.name,source:t.source}),this.isEditMode||n||t.isSubclassSpell?{id:"spell",name:t.name,children:[{...t,hasChildren:!1,id:"spelldef",parentClass:m,parentLevel:l+S}],hasChildren:!0,parentClass:m,parentLevel:l+S,isCantrip:s,isSubclassSpell:t.isSubclassSpell,isWarlock:!!u}:void 0}).filter(e=>void 0!==e);const i={id:"level",level:l+S,spellSlots:t,currentSlots:Object(o.S)(l+S),children:n,hasChildren:n.length>0,parentClass:m,isWarlock:!!u};return this.$.grid.expandedItems.some(e=>"level"===e.id&&e.level===i.level&&e.parentClass===i.parentClass)&&s.push(i),i}return null}).filter(e=>null!==e);if(i[m]={current:e.preparedSpells&&e.preparedSpells[m]?Object.keys(e.preparedSpells[m]):[],max:t,type:f,maxCantrips:g,currentCantrips:e.preparedCantrips&&e.preparedCantrips[m]?Object.keys(e.preparedCantrips[m]):[]},k.length){const e={id:"class",className:m,level:d,hasCantrips:S,children:k,spellsKnown:t,hasChildren:k.length>0,spellPrepType:f,multiclassingLevels:p?0:Math.floor(("full"===l.casterProgression?1:.5)*d),isWarlock:!!u,warlockSpellLevel:u,warlockSpellSlots:A};s.push(e),r.push(e)}}}if(r.sort((e,t)=>e.children.length-t.children.length),!this.isEditMode){let t=[];if(r.length){let l,s,n=0,i=-1;for(let e of r)e.isWarlock?(l=e.warlockSpellLevel,s=e.warlockSpellSlots):(n+=e.multiclassingLevels,i++),e.children.forEach((l,s)=>{const o=s+e.hasCantrips;t[o]?l.children[s]&&(t[o].children=t[o].children.concat(l.children)):t[o]=l});t=t.filter(e=>void 0!==e);const a=0===t[0].level;if(i>0){const e=this.multiclassSlotsDef[n+1];for(let l=a?1:0;l<e.length;l++){const s=e[l-(a?1:0)];t[l]?t[l].spellSlots=s:t.push({children:[],currentSlots:Object(o.S)(l+1-(a?1:0)),hasChildren:!1,id:"level",isWarlock:!1,level:l,spellSlots:s})}}l&&(t[l-(a?0:1)].warlockSpellSlots=s,t[l-(a?0:1)].currentWarlockSlots=e.warlockSpellSlots||0)}r=t}this.refresh=!1,Object(o.hb)(e),this.spellsKnown=i,this.spellDisplay=r,this.expandedItems=s,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0})),this.$.grid.clearCache()}}_renderSpell(e){return Object(r.spellHtml)(e)}_toggleSpellPrepared(e){e.preventDefault(),e.stopPropagation();if(!e.model.item.isSubclassSpell&&this.isEditMode){if(e.model.item.isCantrip)this._toggleCantripPrepared(e);else{const t=e.model.item.parentClass,l=e.model.item.children[0],s=this._isPreparedSpell(this.spellsKnown,t,l.name),n=this._currentSpellsKnownCount(t,this.spellsKnown),i=this._maxSpellsKnownCount(t,this.spellsKnown);if((s||n<i)&&"spelldef"===l.id){let e=JSON.parse(JSON.stringify(this.spellsKnown));if(s){const s=e[t].current.indexOf(l.name);e[t].current.splice(s,1)}else e[t].current.push(l.name);this.spellsKnown=e,Object(o.Hb)(t,l)}else n>=i&&this._flashPreparedButton(Object(a.findInPath)("button",e))}}}_toggleCantripPrepared(e){e.preventDefault(),e.stopPropagation();const t=e.model.item.parentClass,l=e.model.item.children[0],s=this._isPreparedCantrip(this.spellsKnown,t,l.name),n=this._currentCantripsKnownCount(t,this.spellsKnown),i=this._maxCantripsKnownCount(t,this.spellsKnown);if((s||n<i)&&"spelldef"===l.id){let e=JSON.parse(JSON.stringify(this.spellsKnown));if(s){const s=e[t].currentCantrips.indexOf(l.name);e[t].currentCantrips.splice(s,1)}else e[t].currentCantrips.push(l.name);this.spellsKnown=e,Object(o.Ab)(t,l)}else n>=i&&this._flashPreparedButton(Object(a.findInPath)("button",e))}_flashPreparedButton(e){e&&(e.classList.add("transition-bg"),e.classList.add("flash-error"),setTimeout(()=>{e.classList.remove("flash-error"),setTimeout(()=>{e.classList.remove("transition-bg")},200)},200))}_toggleSpellSlot(e){e.preventDefault(),e.stopPropagation();const t=Object(a.findInPath)(".checkbox-wrap",e),l=!!Object(a.findInPath)("[warlock-spell]",e),s=l?e.model.item.currentWarlockSlots:e.model.item.currentSlots,n=l?e.model.item.warlockSpellSlots:e.model.item.spellSlots,i=e.model.item.level;if(t){!t.children[0].checked&&s<n?l?e.model.item.currentWarlockSlots=s+1:e.model.item.currentSlots=s+1:s>0&&(l?e.model.item.currentWarlockSlots=s-1:e.model.item.currentSlots=s-1)}else s<n?l?e.model.item.currentWarlockSlots=s+1:e.model.item.currentSlots=s+1:s>0&&(l?e.model.item.currentWarlockSlots=s-1:e.model.item.currentSlots=s-1);l?(this._setSpellSlotsChecked(e.model.item.currentWarlockSlots,Object(a.findInPath)(".slot-checkboxes",e)),Object(o.xb)(i,e.model.item.currentWarlockSlots,void 0,!0)):(this._setSpellSlotsChecked(e.model.item.currentSlots,Object(a.findInPath)(".slot-checkboxes",e)),Object(o.xb)(i,e.model.item.currentSlots))}_setSpellSlotsChecked(e,t){const l=t.querySelectorAll("vaadin-checkbox");for(let t=0;t<l.length;t++)l[t].checked=t<e}_isPreparedClass(e,t,l){const s=t.parentClass,o=t.name,n=t.isCantrip,i=t.isSubclassSpell;if(i)return l?"spell-button always-prepared edit-mode":"spell-button always-prepared";return(n?this._isPreparedCantrip(e,s,o):this._isPreparedSpell(e,s,o,i))?l?"spell-prepared spell-button edit-mode":"spell-prepared spell-button":l?"spell-button edit-mode":"spell-button"}_isPreparedSpell(e,t,l,s){return s||e[t]&&e[t].current&&e[t].current.length&&e[t].current.indexOf(l)>-1}_isPreparedCantrip(e,t,l){return e[t]&&e[t].currentCantrips&&e[t].currentCantrips.length&&e[t].currentCantrips.indexOf(l)>-1}_isPreparedText(e,t){const l=t.parentClass,s=t.name,o=t.isCantrip,n=t.isSubclassSpell,i=e[l].type;if(n)return"Always";return(o?this._isPreparedCantrip(e,l,s):this._isPreparedSpell(e,l,s,n))?"known"===i?"Learned":"Prepared":"known"===i?"Learn":"Prepare"}_countToArray(e){const t=[];for(var l=0;l<e;l++)t.push(null);return t}_toLevel(e){return 0===e?d.a.spLevelToFull(e)+"s":d.a.spLevelToFull(e)+" Level"}_currentSpellsKnownCount(e,t){return t&&e&&t[e]&&t[e].current?t[e].current.length:0}_maxSpellsKnownCount(e,t){return t&&e&&t[e]?t[e].max:0}_currentCantripsKnownCount(e,t){return t&&e&&t[e]&&t[e].current?t[e].currentCantrips.length:0}_maxCantripsKnownCount(e,t){return t&&e&&t[e]?t[e].maxCantrips:0}_toggleTooltip(e){const t=e.target.dataset.tooltip,l=Array.from(e.target.children).find(e=>e.matches(".tooltip"));if(window.tooltipCloseListener||(window.tooltipCloseListener=!0,window.tooltips=[],document.addEventListener("click",()=>{window.tooltips.forEach(e=>{e.classList.remove("tooltip--open"),setTimeout(()=>{e.remove()},300)}),window.tooltips=[]})),l)l.classList.remove("tooltip--open"),setTimeout(()=>{l.remove()},300);else if(t){const l=document.createElement("div");l.innerHTML=t,l.classList.add("tooltip"),e.target.appendChild(l),setTimeout(()=>{l.classList.add("tooltip--open"),window.tooltips.push(l)},0)}}_toggleEditMode(){Object(i.a)(!this.isEditMode)}_spellsKnownString(e){return"Spells "+Object(a.util_capitalize)(e)+":"}_isRitualSpell(e){const t=e.children[0];return t&&t.meta&&t.meta.ritual}_isConcentrationSpell(e){return e.children[0].duration.some(e=>e.concentration)}_isBonusActionSpell(e){return e.children[0].time.some(e=>"bonus"===e.unit)}_getSpellSchool(e){const t=e.children[0];return d.a.SP_SCHOOL_ABV_TO_FULL[t.school]}_hidePrepareSpellsButton(e,t){return e||!Object.values(t).some(e=>e.current.length<e.max-1||e.currentCantrips.length<e.maxCantrips-1)}_spellLevel(e){if(e&&e.children&&e.children.length&&e.children[0].level)return d.a.spLevelToFull(e.children[0].level)}_isSpellSlotChecked(e,t){return t<e}_spellClassText(e){return e}_isEmpty(e){return!e||!e.length}_hideCheckboxes(e){return!e||e>0&&this.isEditMode}_hideSlotsLabel(e,t){return!e||0===t}_wrapClassString(e){return e?"edit-mode":"not-edit-mode"}_equal(e,t){return e===t}_hasTwo(e){return e&&e.length&&e.length>1}_join(e){return e.join(", ")}_abs(e){return e>=0?"+"+e:e}static get template(){return s.b`
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
//# sourceMappingURL=3.bundle.js.map