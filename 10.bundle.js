(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{188:function(e,t,s){"use strict";s.r(t);var l=s(3),a=s(32),n=s(70),i=s(37),o=s(74),r=s(137),p=s(1),d=s(4);s(131),s(174),s(177),s(173),s(128),s(180),s(105);class c extends l.a{static get properties(){return{spellsKnown:{type:Object,value:{}},preparedSpells:{type:Object,value:{}},noContentMessage:{type:Boolean,value:!1},isEditMode:{type:Boolean,value:!1},filterStr:{type:String,value:"",observer:"_filterChange"},expandedItems:{type:Array}}}__filterChangeThrottled(){this.filterStr.length?(this.oldExpanded||(this.oldExpanded=this.$.grid.expandedItems),this.expandAll(),this.$.grid.clearCache(),setTimeout(()=>{this.expandAll()},10)):(this.oldExpanded&&(this.$.grid.expandedItems=this.oldExpanded,this.oldExpanded=void 0),this.$.grid.clearCache())}constructor(){super(),this._filterChange=Object(p.debounce)(this.__filterChangeThrottled.bind(this),250)}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.refresh=!0,this.updateFromCharacter(Object(a.T)()),Object(a.q)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode,this.refresh=!0,this.updateFromCharacter(Object(a.T)())},Object(o.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(o.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(a.q)().removeEventListener("character-selected",this.characterChangeHandler),Object(o.b)().removeEventListener("editModeChange",this.editModeHandler)}ready(){super.ready(),this.multiclassSlotsDef=[[2],[3],[4,2],[4,3],[4,3,2],[4,3,3],[4,3,3,1],[4,3,3,2],[4,3,3,3,1],[4,3,3,3,2],[4,3,3,3,2,1],[4,3,3,3,2,1],[4,3,3,3,2,1,1],[4,3,3,3,2,1,1],[4,3,3,3,2,1,1,1],[4,3,3,3,2,1,1,1],[4,3,3,3,2,1,1,1,1],[4,3,3,3,3,1,1,1,1],[4,3,3,3,3,2,1,1,1],[4,3,3,3,3,2,2,1,1]],this.fullCasterSlotsDef=[],this.halfCasterSlotsDef=[],this.thirdCasterSlotsDef=[],setTimeout(()=>{this.$.grid.dataProvider=((e,t)=>{const s=e.page*e.pageSize;let l=e.parentItem?e.parentItem.children:this.spellDisplay;if(this.filterStr.length&&(l=l.filter(e=>this.hasDecendentWithFilter(e,this.filterStr.toLowerCase()))),l&&l.length){t(l.slice(s,s+e.pageSize),l.length)}}).bind(this)},0)}hasDecendentWithFilter(e,t){if(!e.name||e.name.toLowerCase().indexOf(t)>-1)return!0;const s=e.length?e:e.children;if(s&&s.length)for(let e of s)return this.hasDecendentWithFilter(e,t);return!1}clearFilterStr(){this.filterStr=""}expandAll(){this.$.grid.expandedItems=this.findExpandables(this.spellDisplay)}findExpandables(e,t=[]){"level"!==e.id&&"class"!==e.id||t.push(e);const s=e.length?e:e.children;if(s&&s.length)for(let e of s)this.findExpandables(e,t);return t}async updateFromCharacter(e){if(e&&(this.customSpellMod=!!e.customSpellMod,this.customSpellModVal=e.customSpellModVal,this.customSpellDC=!!e.customSpellDC,this.customSpellDCVal=e.customSpellDCVal,this.customSpellAttackBonus=!!e.customSpellAttackBonus,this.customSpellAttackBonusVal=e.customSpellAttackBonusVal),e&&this.refresh){this.noContentMessage=!0;const t=await Object(a.F)(e),s=Object(a.E)(e),l=await Object(a.s)(),n=[],o={};let r=[];this.spellMods=await Object(a.V)(e);for(const[l,d]of Object.entries(s)){const s=t[l];let c=s,h=!1,m=s.classTableGroups,u=l;if(!c.casterProgression){if(d>=Object(a.Z)(s)&&e.subclasses&&e.subclasses[l]&&s.subclasses&&s.subclasses.length){const t=s.subclasses.find(t=>e.subclasses[l].name===t.name);t&&t.casterProgression&&(c=t,u=t.shortName,m=t.subclassTableGroups,h=!0)}}if(c.casterProgression){let t,b;this.noContentMessage=!1;const f=c.cantripProgression?c.cantripProgression[d-1]:0;let v,g;if(c.spellsKnownProgression)b="known",t=c.spellsKnownProgression[d-1],"pact"===c.casterProgression&&(v=[1,1,2,2,3,3,4,4,5,5,5,5,5,5,5,5,5,5,5,5][d-1],g=[1,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,4,4,4,4][d-1]);else if(c.preparedSpells){b="prepared";const e="full"===c.casterProgression?1:.51,s=await Object(a.m)(c.spellcastingAbility);t=Math.floor(d*e)+s,t=t<1?1:t}else console.error("!!! neither prepared or known spells",c);let x,S=[];if(h)x=c.shortName;else{let t=c.name.indexOf("(Revised)")>-1?"PHB":c.source,n=c.name.indexOf("(Revised)")>-1?c.name.replaceAll("(Revised)","").trim():c.name;S=await Object(i.a)("spells",{key:"classes.fromClassList",value:{name:n,source:t}});d>=Object(a.Z)(s)&&(x=e.subclasses&&e.subclasses[l]?e.subclasses[l].shortName:"")}if(x&&("Eldritch Knight"===x&&(S=await Object(i.a)("spells",{key:"classes.fromClassList",value:{name:"wizard",source:"phb"}})),"Divine Soul"===x)){let e=await Object(i.a)("spells",{key:"classes.fromClassList",value:{name:"cleric",source:"phb"}});S=[...new Set(S.concat(e))]}const w=m.find(e=>"Spell Slots"===e.title);let C;if(w)C=w.rowsSpellProgression[d-1].filter(e=>0!==e);else{C=[];for(let e=0;e<v;e++)C.push(0)}const _=f?0:1;f&&(C=[0].concat(C));let k=Object(p.cloneDeep)(e.preparedSpells),y=Object(p.cloneDeep)(e.preparedCantrips);e.preparedSpells[u]={},e.preparedCantrips[u]={};const O=C.map((t,s)=>{if(-1!==t){let l=S.filter(e=>e.level===s+_).sort((e,t)=>e.name<t.name?-1:e.name>t.name?1:0).map(t=>{const l=s+_===0,n=l?Object(a.fb)(u,t,y):Object(a.fb)(u,t,k);return n&&(l?e.preparedCantrips[u][t.name]={name:t.name,source:t.source}:e.preparedSpells[u][t.name]={name:t.name,source:t.source}),this.isEditMode||n||t.isAlwaysPrepared?{id:"spell",name:t.name,children:[{...t,hasChildren:!1,id:"spelldef",parentClass:u,parentLevel:s+_}],hasChildren:!0,parentClass:u,parentLevel:s+_,isCantrip:l,isAlwaysPrepared:t.isAlwaysPrepared,isWarlock:!!v}:void 0}).filter(e=>void 0!==e);const i={id:"level",level:s+_,spellSlots:t,currentSlots:Object(a.X)(s+_),children:l,hasChildren:l.length>0,parentClass:u,isWarlock:!!v};return this.$.grid.expandedItems.some(e=>"level"===e.id&&e.level===i.level&&e.parentClass===i.parentClass)&&n.push(i),i}return null}).filter(e=>null!==e);if(o[u]={current:e.preparedSpells&&e.preparedSpells[u]?Object.keys(e.preparedSpells[u]):[],max:t,type:b,maxCantrips:f,currentCantrips:e.preparedCantrips&&e.preparedCantrips[u]?Object.keys(e.preparedCantrips[u]):[]},O.length){const e={id:"class",className:u,level:d,hasCantrips:_,children:O,spellsKnown:t,hasChildren:O.length>0,spellPrepType:b,multiclassingLevels:h?0:Math.floor(("full"===s.casterProgression?1:.5)*d),isWarlock:!!v,warlockSpellLevel:v,warlockSpellSlots:g};n.push(e),r.push(e)}}}const d=Object.values(e.choices).filter(e=>!!e.additionalSpells),c=await Object(i.b)("spells"),h={};if(d.forEach(e=>{e.additionalSpells.defaultSpells.concat(e.additionalSpells.selectedSpells).forEach(t=>{(t.spells?t.spells.map(e=>({...t,...e})):[t]).forEach(l=>{const a=c.find(e=>e.name.toLowerCase()===l.name.toLowerCase()&&e.source.toLowerCase()===l.source.toLowerCase());if(a){const n=a.level,i=e.label&&("expanded"===l.type||"prepared"===l.type||"known"===l.type)&&Object.keys(s).find(t=>t.toLowerCase()===e.label.toLowerCase())?e.label:"Other";h[i]||(h[i]={}),h[i][n]||(h[i][n]=[]),h[i][n].push({storedItemName:e.selectedItemName,...e.additionalSpells,...l,...t,label:e.label,spellDef:a})}})})}),console.error("addtlSpellsObj",h,r),Object.entries(h).forEach(([t,s])=>{if(this.noContentMessage=!1,"Other"!==t){let a=r.find(e=>e.className.toLowerCase()===t),i=!1;a||(i=!0,r.push({id:"class",className:Object(p.util_capitalize)(t),level:0,hasCantrips:!1,children:[],spellsKnown:0,hasChildren:!0,spellPrepType:"always",multiclassingLevels:0,isWarlock:!1,warlockSpellLevel:0,warlockSpellSlots:0,hadToAddClass:!0}),a=r[r.length-1],n.push(a)),Object.entries(s).forEach(([s,n])=>{const o=parseInt(s);let r=a.children.find(e=>e.level===o)||null;r||0!==o&&!i||(a.children=[{id:"level",level:o,hasChildren:!0,children:[],parentClass:t}].concat(a.children),r=a.children[0],a.children.find(e=>0===e.level)&&(a.hasCantrips=0)),r&&n.forEach(a=>{const n=r.children.find(e=>e.children[0].name===a.spellDef.name&&e.children[0].source===a.spellDef.source);n?(n.isAlwaysPrepared=!0,n.spellSlots="proficiency"===a.uses?l:a.uses,n.spellUseType=a.type,n.currentSlots=e.spellSlots&&e.spellSlots[a.spellDef.name]?e.spellSlots[a.spellDef.name]:0,n.ability=a.selectedAbility||a.defaultAbility,n.superLabel=[a.label,a.storedItemName].filter(e=>!!e).map(p.util_capitalize).join(": ")):r.children.push({id:"spell",name:a.spellDef.name,children:[{...a.spellDef,hasChildren:!1,id:"spelldef",parentClass:t,parentLevel:s,uses:a.uses}],hasChildren:!0,parentClass:t,parentLevel:s,isCantrip:0===s,isAlwaysPrepared:!0,isWarlock:"warlock"===t,spellUseType:a.type,spellSlots:"proficiency"===a.uses?l:a.uses,ability:a.selectedAbility||a.defaultAbility,currentSlots:e.spellSlots&&e.spellSlots[a.spellDef.name]?e.spellSlots[a.spellDef.name]:0,superLabel:[a.label,a.storedItemName].filter(e=>!!e).map(p.util_capitalize).join(": ")})})})}else{const t=[];Object.entries(h.Other).forEach(([s,a])=>{a.forEach(s=>{const a="will"===s.type||0===s.spellDef.level?"At Will":"Innate";let n=t.find(e=>e.level===a);n||(n={id:"level",level:a,spellSlots:0,currentSlots:0,children:[],hasChildren:!0,parentClass:"Other"},t.push(n)),n.children.push({id:"spell",name:s.spellDef.name,children:[{...s.spellDef,hasChildren:!1,id:"spelldef",parentClass:"Other",parentLevel:"Other"}],hasChildren:!0,parentClass:"Other",parentLevel:"Other",isCantrip:!1,isAlwaysPrepared:!0,isWarlock:!1,spellUseType:s.type,spellSlots:"proficiency"===s.uses?l:s.uses,ability:s.selectedAbility||s.defaultAbility,currentSlots:e.spellSlots&&e.spellSlots[s.spellDef.name]?e.spellSlots[s.spellDef.name]:0,superLabel:[s.label,s.storedItemName].filter(e=>!!e).map(p.util_capitalize).join(": ")})})});const s={id:"class",className:"Other",level:0,hasCantrips:!1,children:t,spellsKnown:0,hasChildren:t>0,spellPrepType:"always",multiclassingLevels:0,isWarlock:!1,warlockSpellLevel:0,warlockSpellSlots:0};r.push(s),n.push(s)}}),r.sort((e,t)=>"Other"===e.className?-1:t.children.length-e.children.length),!this.isEditMode){let t=[];if(r.length){let s,l,n,i=0,o=-1;for(let e of r)"Other"!==e.className?(e.hadToAddClass||(e.isWarlock?(s=e.warlockSpellLevel,l=e.warlockSpellSlots,o++):(i+=e.multiclassingLevels,o++)),e.children.forEach((s,l)=>{const a=l+e.hasCantrips;t[a]?(t[a].children=t[a].children.concat(s.children),t[a].hasChildren=!!t[a].children.length):t[a]=s})):"Other"===e.className&&(n=e);t=t.filter(e=>void 0!==e);const p=t.length&&0===t[0].level;if(o>0){const e=this.multiclassSlotsDef[i-1];for(let s=0;s<e.length;s++){const l=s+1,n=e[s],i=t.find(e=>e.level===l);i?i.spellSlots=n:t.push({children:[],currentSlots:Object(a.X)(l),hasChildren:!1,id:"level",isWarlock:!1,level:l,spellSlots:n})}}s&&(t[s-(p?0:1)].warlockSpellSlots=l,t[s-(p?0:1)].currentWarlockSlots=e.warlockSpellSlots||0),n&&(t=n.children.concat(t))}r=t}console.error("spellDisplay",r),this.refresh=!1,Object(a.ob)(e),this.spellsKnown=o,this.spellDisplay=r,this.expandedItems=n,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0})),this.$.grid.clearCache()}}_renderSpell(e){return`<div class="statsBlockHead"><span class="stat-name">${e.name}</span></div>`+Object(r.spellHtml)(e)}_toggleSpellPrepared(e){e.preventDefault(),e.stopPropagation();if(!e.model.item.isAlwaysPrepared&&this.isEditMode){if(e.model.item.isCantrip)this._toggleCantripPrepared(e);else{const t=e.model.item.parentClass,s=e.model.item.children[0],l=this._isPreparedSpell(this.spellsKnown,t,s.name),n=this._currentSpellsKnownCount(t,this.spellsKnown),i=this._maxSpellsKnownCount(t,this.spellsKnown);if((l||n<i)&&"spelldef"===s.id){let e=JSON.parse(JSON.stringify(this.spellsKnown));if(l){const l=e[t].current.indexOf(s.name);e[t].current.splice(l,1)}else e[t].current.push(s.name);this.spellsKnown=e,Object(a.Ub)(t,s)}else n>=i&&this._flashPreparedButton(Object(p.findInPath)("button",e))}}}_toggleCantripPrepared(e){e.preventDefault(),e.stopPropagation();const t=e.model.item.parentClass,s=e.model.item.children[0],l=this._isPreparedCantrip(this.spellsKnown,t,s.name),n=this._currentCantripsKnownCount(t,this.spellsKnown),i=this._maxCantripsKnownCount(t,this.spellsKnown);if((l||n<i)&&"spelldef"===s.id){let e=JSON.parse(JSON.stringify(this.spellsKnown));if(l){const l=e[t].currentCantrips.indexOf(s.name);e[t].currentCantrips.splice(l,1)}else e[t].currentCantrips.push(s.name);this.spellsKnown=e,Object(a.Ib)(t,s)}else n>=i&&this._flashPreparedButton(Object(p.findInPath)("button",e))}_flashPreparedButton(e){e&&(e.classList.add("transition-bg"),e.classList.add("flash-error"),setTimeout(()=>{e.classList.remove("flash-error"),setTimeout(()=>{e.classList.remove("transition-bg")},200)},200))}_toggleSpellSlot(e){e.preventDefault(),e.stopPropagation();const t=Object(p.findInPath)(".checkbox-wrap",e),s=!!Object(p.findInPath)("[warlock-spell]",e),l=s?e.model.item.currentWarlockSlots:e.model.item.currentSlots,n=s?e.model.item.warlockSpellSlots:e.model.item.spellSlots,i=e.model.item.level||e.model.item.name;if(t){!t.children[0].checked&&l<n?s?e.model.item.currentWarlockSlots=l+1:e.model.item.currentSlots=l+1:l>0&&(s?e.model.item.currentWarlockSlots=l-1:e.model.item.currentSlots=l-1)}else l<n?s?e.model.item.currentWarlockSlots=l+1:e.model.item.currentSlots=l+1:l>0&&(s?e.model.item.currentWarlockSlots=l-1:e.model.item.currentSlots=l-1);s?(this._setSpellSlotsChecked(e.model.item.currentWarlockSlots,Object(p.findInPath)(".slot-checkboxes",e)),Object(a.Fb)(i,e.model.item.currentWarlockSlots,void 0,!0)):(this._setSpellSlotsChecked(e.model.item.currentSlots,Object(p.findInPath)(".slot-checkboxes",e)),Object(a.Fb)(i,e.model.item.currentSlots))}_setSpellSlotsChecked(e,t){const s=t.querySelectorAll("vaadin-checkbox");for(let t=0;t<s.length;t++)s[t].checked=t<e}_roll(e){if(!this.isEditMode){let t,s,l,a;if(Object(p.findInPath)(".spellAttack",e))if(s=!1,this.customSpellAttackBonus)t=this.customSpellAttackBonusVal,l="Spell Attack (Custom)";else if(e.srcElement.classList.contains("mod-val")){const s=e.srcElement.dataset.index;t=this.spellMods[s].spellAttackBonus,l=`Spell Attack (${this.spellMods[s].classes.join(", ")})`}else t=this.spellMods[0].spellAttackBonus,l=`Spell Attack (${this.spellMods[0].classes.join(", ")})`;if(l){let e="1d20";s&&(t+=this.proficiencyBonus),a&&(t+=this.proficiencyBonus),t>0?e+="+"+t:t<0&&(e+=t),Object(n.b)(l,e)}}}_isPreparedClass(e,t,s){const l=t.parentClass,a=t.name,n=t.isCantrip,i=t.isAlwaysPrepared;if(i)return s?"spell-button always-prepared edit-mode":"spell-button always-prepared";return(n?this._isPreparedCantrip(e,l,a):this._isPreparedSpell(e,l,a,i))?s?"spell-prepared spell-button edit-mode":"spell-prepared spell-button":s?"spell-button edit-mode":"spell-button"}_isPreparedSpell(e,t,s,l){return l||e[t]&&e[t].current&&e[t].current.length&&e[t].current.indexOf(s)>-1}_isPreparedCantrip(e,t,s){return e[t]&&e[t].currentCantrips&&e[t].currentCantrips.length&&e[t].currentCantrips.indexOf(s)>-1}_isPreparedText(e,t){const s=t.parentClass,l=t.name,a=t.isCantrip,n=t.isAlwaysPrepared,i=e[s]?e[s].type:void 0;if(n)return"Always";return(a?this._isPreparedCantrip(e,s,l):this._isPreparedSpell(e,s,l,n))?"known"===i?"Learned":"Prepared":"known"===i?"Learn":"Prepare"}_countToArray(e){const t=[];for(var s=0;s<e;s++)t.push(null);return t}_toLevel(e){return"At Will"===e||"Innate"===e?e:0===e?d.a.spLevelToFull(e)+"s":d.a.spLevelToFull(e)+" Level"}_currentSpellsKnownCount(e,t){return t&&e&&t[e]&&t[e].current?t[e].current.length:0}_maxSpellsKnownCount(e,t){return t&&e&&t[e]?t[e].max:0}_currentCantripsKnownCount(e,t){return t&&e&&t[e]&&t[e].current?t[e].currentCantrips.length:0}_maxCantripsKnownCount(e,t){return t&&e&&t[e]?t[e].maxCantrips:0}_toggleEditMode(){Object(o.a)(!this.isEditMode)}_updateCustomSpellMod(e){const t=parseInt(e.currentTarget.value);Object(a.Bb)(t)}_updateCustomSpellDC(e){const t=parseInt(e.currentTarget.value);Object(a.Ab)(t)}_updateCustomSpellAttackBonus(e){const t=parseInt(e.currentTarget.value);Object(a.zb)(t)}_swapCustomSpellMod(e){Object(a.Rb)()}_swapCustomSpellAttackBonus(e){Object(a.Pb)()}_swapCustomSpellDC(e){Object(a.Qb)()}_spellsKnownString(e){return"Spells "+Object(p.util_capitalize)(e)+":"}_isRitualSpell(e){const t=e.children[0];return t&&t.meta&&t.meta.ritual}_isConcentrationSpell(e){return e.children[0].duration.some(e=>e.concentration)}_isBonusActionSpell(e){return e.children[0].time.some(e=>"bonus"===e.unit)}_getSpellSchool(e){const t=e.children[0];return d.a.SP_SCHOOL_ABV_TO_FULL[t.school]}_hidePrepareSpellsButton(e,t){return e||!Object.values(t).some(e=>e.current.length<e.max-1||e.currentCantrips.length<e.maxCantrips-1)}_hidePreparedCountLabel(e,t){return 0===this._maxSpellsKnownCount(e,t)}_hideCantripsPreparedCountLabel(e,t){return 0!==e.level||!t||!e.parentClass||!t[e.parentClass]||0===t[e.parentClass].maxCantrips}_spellLevel(e){if(e&&e.children&&e.children.length&&e.children[0].level)return d.a.spLevelToFull(e.children[0].level)}_isSpellSlotChecked(e,t){return t<e}_spellClassText(e){return e}_isEmpty(e){return!e||!e.length}_hideCheckboxes(e,t,s){return!e||e>0&&this.isEditMode||"known"===s||"will"===s||"resource"===s}_hideAbility(e){return!e}_hideSlotsLabel(e,t,s){return!e||0===t||"At Will"===t||"Innate"===t||"Warlock"===s}_innateUsageString(e){return"daily"===e?"<span>Long Rest</span>":"rest"===e?"<span>Short Rest</span>":e?"<span>"+Object(p.util_capitalizeAll)(e)+"</span>":void 0}_wrapClassString(e){return e?"edit-mode":"not-edit-mode"}_equal(e,t){return e===t}_hasTwo(e){return e&&e.length&&e.length>1}_join(e){return e.join(", ")}_abs(e){return e>=0?"+"+e:e}static get template(){return l.b`
      <style include='my-styles material-styles'>
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
          margin-bottom: var(--tab-bottom-margin);
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
          user-select: none;
        }
        .prepared-count {
          color: var(--mdc-theme-primary);
          font-weight: bold;
          margin-left: 6px;
        }
        .prepared-count[edit-mode] {
          color: var(--mdc-theme-secondary);
        }
        .cantrips-prepared {
          margin-right: 0;
          display: inline-flex;
          align-items: center;
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
          margin-right: 6px;
        }

        .innate-spell-label {
          font-size: 12px;
          display: flex;
          align-items: center;
        }

        .spell-super-text {
          position: absolute;
          top: 0px;
          font-size: 11px;
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

        .details.stats-wrapper {
          margin: -8px 14px 0;
          font-size: 14px;
          line-height: 1.5;
        }
        .details > .statsBlockHead:first-child > .stat-name {
          margin-top: 0;
        }
        .details.stats-wrapper .statsBlockHead .stat-name {
          font-size: 22px;
          margin-bottom: 2px;
        }
        .details.stats-wrapper .statsBlockSubHead .stat-name {
          font-size: 18px;
        }
        .details.stats-wrapper .text {
          margin-top: 16px;
        }
        .details.stats-wrapper p {
          margin-bottom: 8px;
        }
        .details.stats-wrapper .statsInlineHead .stat-name {
          font-size: inherit;
        }
        .details.stats-wrapper .margin-bottom_med {
          margin-bottom: 0px !important;
        }
        .details.stats-wrapper .source {
          display: block !important;
          color: var(--lumo-contrast-70pct);
          font-size: 13px;
          margin-top: 0px;
          margin-bottom: 12px;
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

        .filter {
          margin-left: 16px;
        }

        .custom-val__swap {
          font-size: 10px;
          margin: -4px 0px 8px auto;
          background-color: var(--lumo-contrast-10pct);
          padding: 4px 5px 4px;
          line-height: 1;
          border-radius: 4px;
          cursor: pointer;
        }
        .custom-val__swap .material-icons {
          font-size: 11px;
          position: relative;
          top: 1px;
        }

        .basic-box__wrap-wrap {
          padding: 0 16px;
        }
        .basic-box__wrap {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin: 16px auto 40px;
          max-width: 360px;
        }
        .basic-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 4px 0;
          background: var(--lumo-contrast-10pct);
          border-radius: 4px;
          height: min-content;
          width: calc(33% - 8px);
          max-width: 120px;
        }
        .basic-box--short {
          height: fit-content;
        }
        
        .basic-box__label {
          color: var(--mdc-theme-primary);
          font-size: 14px;
          text-align: center;
        }
        .basic-box__value {
          font-size: 18px;
          width: 100%;
          display: flex;
          flex-direction: column;
          text-align: center;
        }
        .basic-box__no-flex {
          display: block;
        }

        .mod-val {
          position: relative;
        }
        .mod-val:focus .tooltip,
        .mod-val:hover .tooltip {
          display: block;
        }
        .mod-val:focus {
          outline: none;
        }
        .mod-val:not(:last-of-type)::after {
          content: '|';
          margin-left: 4px;
          color: var(--lumo-contrast-30pct);
        }
        .tooltip {
          position: absolute;
          background: lightgray;
          color: black;
          font-size: 14px;
          padding: 2px 10px;
          border-radius: 4px;
          white-space: nowrap;
          left: 5px;
          top: -32px;
          display: none;
        }
        .tooltip::after {
          content: '';
          height: 0;
          width: 0;
          position: absolute;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid lightgray;
          bottom: -4px;
          left: 2px;
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
          <dnd-button class="prepare-spells-button" link hidden$="[[_hidePrepareSpellsButton(isEditMode, spellsKnown)]]" edit-mode$="[[isEditMode]]" not-edit-mode$="[[!isEditMode]]" label="Prepare Your Spells!" icon="edit" on-click="_toggleEditMode"></dnd-button>
        </div>

        <!-- Spell Mods -->
        <div class="basic-box__wrap-wrap">
          <div class="basic-box__wrap">
            <div class="basic-box">
              <span class="basic-box__value">
                <div class="custom-val__swap" on-click="_swapCustomSpellMod" hidden$=[[!isEditMode]]>
                  <span class="custom-val__option" hidden$=[[customSpellMod]]><span class="material-icons">edit</span> Edit</span>
                  <span class="custom-val__option" hidden$=[[!customSpellMod]]><span class="material-icons">restart_alt</span> Use Standard</span>
                </div>
                <div hidden$=[[customSpellMod]]>
                  <template is="dom-repeat" items="[[spellMods]]">
                    <span class="mod-val" tabindex="0" data-index$="[[index]]">[[_abs(item.mod)]]<span class="tooltip">[[_join(item.classes)]]</span></span>
                  </template>
                </div>
                <div hidden$=[[!customSpellMod]]>
                  <vaadin-integer-field theme="mini" value=[[customSpellModVal]] on-change="_updateCustomSpellMod" min="-20" max="20" has-controls hidden$="[[!isEditMode]]"></vaadin-integer-field>
                  <span hidden$=[[isEditMode]] class="mod-val">[[_abs(customSpellModVal)]]<span class="tooltip">Custom</span></span>
                </div>
              </span>
              <span class="basic-box__label">Spell Mod</span>
            </div>
            <div class="basic-box spellAttack" on-click="_roll">
              <span class="basic-box__value">
                <div class="custom-val__swap" on-click="_swapCustomSpellAttackBonus" hidden$=[[!isEditMode]]>
                  <span class="custom-val__option" hidden$=[[customSpellAttackBonus]]><span class="material-icons">edit</span> Edit</span>
                  <span class="custom-val__option" hidden$=[[!customSpellAttackBonus]]><span class="material-icons">restart_alt</span> Use Standard</span>
                </div>
                <div hidden$=[[customSpellAttackBonus]]>
                  <template is="dom-repeat" items="[[spellMods]]">
                    <span class="mod-val" tabindex="0" data-index$="[[index]]">+[[item.spellAttackBonus]]<span class="tooltip">[[_join(item.classes)]]</span></span>
                  </template>
                </div>
                <div hidden$=[[!customSpellAttackBonus]]>
                  <vaadin-integer-field theme="mini" value=[[customSpellAttackBonusVal]] on-change="_updateCustomSpellAttackBonus" min="-20" max="20" has-controls hidden$="[[!isEditMode]]"></vaadin-integer-field>
                  <span hidden$=[[isEditMode]] class="mod-val">[[_abs(customSpellAttackBonusVal)]]<span class="tooltip">Custom</span></span>
                </div>
              </span>
              <span class="basic-box__label">Spell ATK+</span>
            </div>
            <div class="basic-box">
              <span class="basic-box__value">
                <div class="custom-val__swap" on-click="_swapCustomSpellDC" hidden$=[[!isEditMode]]>
                  <span class="custom-val__option" hidden$=[[customSpellDC]]><span class="material-icons">edit</span> Edit</span>
                  <span class="custom-val__option" hidden$=[[!customSpellDC]]><span class="material-icons">restart_alt</span> Use Standard</span>
                </div>
                <div hidden$=[[customSpellDC]]>
                  <template is="dom-repeat" items="[[spellMods]]">
                    <span class="mod-val" tabindex="0">[[item.dc]]<span class="tooltip">[[_join(item.classes)]]</span></span>
                  </template>
                </div>
                <div hidden$=[[!customSpellDC]]>
                  <vaadin-integer-field theme="mini" value=[[customSpellDCVal]] on-change="_updateCustomSpellDC" min="0" max="40" has-controls hidden$="[[!isEditMode]]"></vaadin-integer-field>
                  <span hidden$=[[isEditMode]] class="mod-val">[[customSpellDCVal]]<span class="tooltip">Custom</span></span>
                </div>
              </span>
              <span class="basic-box__label">Spell DC</span>
            </div>
          </div>
        </div>

        <div class="filter">
          <vaadin-text-field clear-button-visible value="{{filterStr}}" placeholder='Filter'></vaadin-text-field>
        </div>
      </div>

      <div class="no-content-message" hidden$="[[!noContentMessage]]">Enter edit mode to add classes and levels.</div>

      <vaadin-grid id="grid" theme="no-border no-row-borders" expanded-items="{{expandedItems}}" all-rows-visible hidden$="[[noContentMessage]]">
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
                  <vaadin-grid-tree-toggle leaf="[[!item.hasChildren]]" expanded="{{expanded}}">
                    <h4 class="level-wrap">[[_toLevel(item.level)]]<span hidden$="[[_hideSlotsLabel(isEditMode, item.level, item.parentClass)]]" class="label">([[item.spellSlots]] Slots)</span></h4>
                  </vaadin-grid-tree-toggle>

                  <div class="cantrips-prepared spells-prepared-text" hidden$="[[_hideCantripsPreparedCountLabel(item, spellsKnown)]]">
                    <span>Cantrips Known:</span>
                    <span class='prepared-count' edit-mode$=[[isEditMode]]>[[_currentCantripsKnownCount(item.parentClass, spellsKnown)]] / [[_maxCantripsKnownCount(item.parentClass, spellsKnown)]]</span>
                  </div>

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
                  <vaadin-grid-tree-toggle leaf="[[!item.hasChildren]]" expanded="{{expanded}}" class="spell-wrap">
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

                  <div class="innate-spell-label" hidden$="[[!_equal(item.spellUseType, 'will')]]">At Will</div>

                  <div class="innate-spell-label" hidden$="[[!_equal(item.spellUseType, 'ritual')]]">Ritual Only</div>

                  <div class="innate-spell-label" hidden$="[[!_equal(item.spellUseType, 'resource')]]">[[item.spellSlots]] Ki</div>
        
                  <button class$="[[_isPreparedClass(spellsKnown, item, isEditMode)]]" hidden$="[[!isEditMode]]" on-click="_toggleSpellPrepared">[[_isPreparedText(spellsKnown, item)]]</button>
                  <dnd-svg class="class-icon" hidden$="[[isEditMode]]" id='[[_spellClassText(item.parentClass)]]' default-color></dnd-svg>
                </div>
              </template>

              <template is="dom-if" if="[[_equal(item.id, 'spelldef')]]">
                <div class="spell-def-wrap">
                  <div class="details stats-wrapper" inner-h-t-m-l="[[_renderSpell(item)]]"></div>
                </div>
              </template>
          </template>
        </vaadin-grid-column>
      </vaadin-grid>
    `}}customElements.define("dnd-character-builder-spells",c)}}]);
//# sourceMappingURL=10.bundle.js.map