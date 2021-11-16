(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{112:function(e,t,i){"use strict";var s=i(7),a=i(68);i(77),i(111);class l extends s.a{static get properties(){return{label:{type:String,value:""},icon:{type:String,value:""},svg:{type:String,value:""},background:{type:String,value:""},border:{type:String,value:""},svgFill:{type:String,value:""},svgStroke:{type:String,value:""}}}connectedCallback(){setTimeout(()=>{this.button=new a.a(this.$.button)},10)}_exists(e){return!!e}_styleStr(e,t){let i="";return e&&(i+=`background: ${e}; `),t&&(i+=`border: ${t}; `),i}_svgStyleStr(e,t){let i="";return e&&(i+=`fill: ${e}; `),t&&(i+=`stroke: ${t}; `),i}static get template(){return s.b`
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
          margin-left: -18px;
          padding-left: 0;
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
      <button id="button" class="mdc-button" style$="[[_styleStr(background, border)]]">
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
    `}}customElements.define("dnd-button",l)},120:function(e,t,i){"use strict";var s=i(7),a=i(17),l=i(1),n=(i(81),i(32));class o extends s.a{static get properties(){return{test:{type:Boolean,reflectToAttribute:!0,value:!1},options:{type:Array,observer:"optionsUpdated"},model:{type:String},addCallback:{type:Function},value:{type:String,value:"",observer:"valueUpdated"},choices:{type:Number,observer:"choicesUpdated"},label:{type:String},placeholder:{type:String},multiValue:{type:String,value:""},disabled:{type:Boolean,value:!1,reflectToAttribute:!0}}}choicesUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}optionsUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}valueUpdated(){if(this.choices)if(Array.isArray(this.value)&&this.options){const e=this.value.map(e=>-1!==this.options.indexOf(e)?this.options.indexOf(e):this.options.findIndex(t=>t.name===e.name&&t.source===e.source)).filter(e=>-1!==e);this.listBox&&(this.listBox.selectedValues=e),this.multiValue=e.map(e=>{let t=this.options[e];return t.name?t.name:Object(l.util_capitalizeAll)(t)}).join(", ")}else this.listBox&&(this.listBox.selectedValues=[]),this.multiValue="";else this.value&&this.options?this.value.source?this.$.select.value=this.options.findIndex(e=>e.name===this.value.name&&e.source===this.value.source||e===this.value.name)+"":this.value.name?this.$.select.value=this.options.findIndex(e=>e.name===this.value.name||e===this.value.name)+"":this.$.select.value=this.options.findIndex(e=>e.name===this.value||e===this.value)+"":this.$.select.value=""}ready(){super.ready(),setTimeout(async()=>{this.model&&(this.options=await Object(n.b)(this.model)),this.$.select.renderer=(e,t)=>{if(!this.listBox){if(this.listBox=document.createElement("vaadin-list-box"),this.choices&&(this.listBox.setAttribute("multiple",!0),this.listBox.addEventListener("click",e=>{t.opened=!0;let i=null!==e.srcElement.getAttribute("selected");setTimeout(()=>{this.listBox.selectedValues.length>this.choices&&!i&&this.listBox.selectedValues.splice(this.listBox.selectedValues.length-2,1);let e=this.listBox.selectedValues.map(e=>this.options[e]);this.multiValue=e.map(e=>e.name?e.name:Object(l.util_capitalizeAll)(e)).join(", "),this.addCallback&&this.addCallback(e)},0)})),this.options&&this.options.length)for(let e=0;e<this.options.length;e++){const t=this.options[e],i=document.createElement("vaadin-item"),s=t.name||Object(l.util_capitalizeAll)(t);i.innerHTML=`<span>${s}</span> ${t.name?`<span style='font-size: 14px;color: var(--lumo-primary-color-50pct);'>${t.source}</span>`:""}`,i.setAttribute("value",e),this.listBox.appendChild(i)}e.appendChild(this.listBox),this.$.select._assignMenuElement(),this.valueUpdated()}}},0)}connectedCallback(){super.connectedCallback(),this.selectChangeHandler=()=>{const e=this.$.select.value;if(e&&!this.choices){const t=this.options[e];this.addCallback?this.addCallback(t,this.model):Object(a.P)(void 0,t,this.model),this.value||(this.$.select.value="")}},this.$.select.addEventListener("change",this.selectChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),this.$.select.removeEventListener("change",this.selectChangeHandler)}_exists(e){return!!e}_label(e,t){if(e)return t?`${e} (${t})`:e}static get template(){return s.b`
      <style>
        :host {
          display: inline-block;
        }
        [slot="prefix"] {
          width: calc(100% - 46px);
          padding: 12px;
          line-height: 1.4;
        }
        vaadin-select {
          width: 100%;
        }
        .prefix {
          white-space: normal;
          color: var(--lumo-body-text-color);
        }
      </style>
      <vaadin-select test$="[[test]]" theme="dark" add id="select" label="[[_label(label, choices)]]" placeholder="[[placeholder]]" disabled$="[[disabled]]">
        <div hidden$="[[!_exists(multiValue)]]" slot="prefix">
          <span class="prefix">[[multiValue]]</span>
        </div>
      </vaadin-select>
    `}}customElements.define("dnd-select-add",o)},135:function(e,t,i){"use strict";i.r(t);var s=i(7),a=i(27),l=i(17),n=(i(121),i(120),i(126),i(112),i(1));class o extends s.a{static get properties(){return{levelIndex:{type:Number},checked:{type:Boolean,value:!1},selectedFeat:{type:Object},selectedAbility1:{type:String,value:""},selectedAbility2:{type:String,value:""},featHasAttributeChoice:{type:Boolean,value:!1},featAttributeSelection:{type:String,value:""},featAttributeOptions:{type:Array,value:[]},disabled:{type:Boolean,value:!1,reflectToAttribute:!0}}}constructor(){super(),this.attributeOptions=["STR","DEX","CON","INT","WIS","CHA"]}connectedCallback(){super.connectedCallback(),this.switchChangeHandler=e=>{this.checked=e.detail.checked,this._genASICallback()()},this.addEventListener("switch-change",this.switchChangeHandler),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(l.G)()),Object(l.m)().addEventListener("character-selected",this.characterChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("switch-change",this.switchChangeHandler),Object(l.m)().removeEventListener("character-selected",this.characterChangeHandler)}async updateFromCharacter(e){const{asi:t,index:i}=await Object(l.g)(this.levelIndex,e);if(this.featHasAttributeChoice=!1,t){if(this.selectedFeat=t.feat,this.selectedAbility1=t.ability1,this.selectedAbility2=t.ability2,this.checked=t.isFeat,t.isFeat&&t.feat&&t.feat.name&&t.feat.source){const i=`${t.feat.name}_${t.feat.source}`,s=await Object(l.w)(i);s.ability&&s.ability.length&&s.ability[0].choose&&(this.featHasAttributeChoice=!0,this.featAttributeOptions=s.ability[0].choose.from.map(e=>e.toUpperCase()),this.featAttributeSelection=e.featAttributeSelections&&e.featAttributeSelections[i]?e.featAttributeSelections[i]:"")}}else this.selectedFeat={name:"",source:""},this.selectedAbility1="",this.selectedAbility2="",this.checked=!1;this.asiIndex=i}_genASICallback(e){return t=>{Object(l.Z)({feat:"feat"===e?{name:t.name,source:t.source}:this.selectedFeat,ability1:"ability1"===e?t:this.selectedAbility1,ability2:"ability2"===e?t:this.selectedAbility2,isFeat:this.checked},this.asiIndex)}}_genFeatAbilityCallback(){return e=>{if(this.selectedFeat&&this.selectedFeat.name&&this.selectedFeat.source){const t=`${this.selectedFeat.name}_${this.selectedFeat.source}`;Object(l.jb)(t,e)}}}_disableLabel(e){return e?"Feat":"ASI"}_getFeatLink(e){let t=[e.name];e.source&&t.push(e.source);let i=Object(n.encodeForHash)(t);return i?"#/feats/"+i:"#/feats"}static get template(){return s.b`
      <style include="material-styles">
        :host {
          display: flex;
          flex-direction: column;
          max-width: 192px;
        }
        [hidden] {
          display: none !important;
        }
        .abilities {
          display: flex;
          flex-wrap: wrap;
        }
        .abilities dnd-select-add {
          width: calc(50% - 8px);
        }
        dnd-select-add + dnd-select-add {
          margin-left: 16px;
        }
        dnd-select-add {
          display: block;
        }
        .disable-label {
          font-size: 14px;
          font-weight: 500;
          color: var(--mdc-theme-primary);
        }
        .reference-link {
          color: var(--lumo-body-text-color);
        }
        .reference-link:hover {
          color: var(--mdc-theme-secondary);
        }
        .feat-pick-wrap {
          display: flex;
        }
      </style>

      <div class="disable-label" hidden$="[[!disabled]]">[[_disableLabel(checked)]]</div>
      <dnd-switch initial-value=[[checked]] label="ASI" secondary-label="Feat" disabled$="[[disabled]]" hidden$="[[disabled]]"></dnd-switch>
      <div class="abilities" hidden$=[[checked]]>
        <dnd-select-add add-callback="[[_genASICallback('ability1')]]" value="[[selectedAbility1]]" options="[[attributeOptions]]" placeholder="<ASI>" disabled$="[[disabled]]"></dnd-select-add>
        <dnd-select-add add-callback="[[_genASICallback('ability2')]]" value="[[selectedAbility2]]" options="[[attributeOptions]]" placeholder="<ASI>" disabled$="[[disabled]]"></dnd-select-add>
      </div>
      <div class="feat-pick-wrap" hidden$=[[!checked]]>
        <dnd-select-add add-callback="[[_genASICallback('feat')]]" model="feats" value="[[selectedFeat.name]]" placeholder="<Choose Feat>" disabled$="[[disabled]]"></dnd-select-add>
        <a class="reference-link mdc-icon-button material-icons" href="[[_getFeatLink(selectedFeat)]]">launch</a>
      </div>
      <div hidden$=[[!featHasAttributeChoice]]>
        <dnd-select-add test add-callback="[[_genFeatAbilityCallback()]]" value="[[featAttributeSelection]]" options="[[featAttributeOptions]]" placeholder="<Choose Attribute>" disabled$="[[disabled]]"></dnd-select-add>
      </div>
    `}}customElements.define("dnd-asi-select",o);i(111);const c={"artificer(ua)":{class:{2:{name:"Wonderous Invention",count:1,options:["{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]},5:{name:"Wonderous Invention",count:1,options:["{@item Alchemy jug}","{@item helm of comprehending languages}","{@item lantern of revealing}","{@item ring of swimming}","{@item robe of useful items}","{@item rope of climbing}","{@item wand of magic detection}","{@item wand of secrets}","{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]},10:{name:"Wonderous Invention",count:1,options:["{@item Bag of beans}","{@item chime of opening}","{@item decanter of endless water}","{@item eyes of minute seeing}","{@item folding boat}","{@item Heward's handy haversack}","{@item Alchemy jug}","{@item helm of comprehending languages}","{@item lantern of revealing}","{@item ring of swimming}","{@item robe of useful items}","{@item rope of climbing}","{@item wand of magic detection}","{@item wand of secrets}","{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]},15:{name:"Wonderous Invention",count:1,options:["{@item Boots of striding and springing}","{@item bracers of archery}","{@item brooch of shielding}","{@item broom of flying}","{@item hat of disguise}","{@item slippers of spider climbing}","{@item Bag of beans}","{@item chime of opening}","{@item decanter of endless water}","{@item eyes of minute seeing}","{@item folding boat}","{@item Heward's handy haversack}","{@item Alchemy jug}","{@item helm of comprehending languages}","{@item lantern of revealing}","{@item ring of swimming}","{@item robe of useful items}","{@item rope of climbing}","{@item wand of magic detection}","{@item wand of secrets}","{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]},20:{name:"Wonderous Invention",count:1,options:["{@item Eyes of the eagle}","{@item gem of brightness}","{@item gloves of missile snaring}","{@item gloves of swimming and climbing}","{@item ring of jumping}","{@item ring of mind shielding}","{@item wings of flying}","{@item Boots of striding and springing}","{@item bracers of archery}","{@item brooch of shielding}","{@item broom of flying}","{@item hat of disguise}","{@item slippers of spider climbing}","{@item Bag of beans}","{@item chime of opening}","{@item decanter of endless water}","{@item eyes of minute seeing}","{@item folding boat}","{@item Heward's handy haversack}","{@item Alchemy jug}","{@item helm of comprehending languages}","{@item lantern of revealing}","{@item ring of swimming}","{@item robe of useful items}","{@item rope of climbing}","{@item wand of magic detection}","{@item wand of secrets}","{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]}}},"artificer (revisited)":{class:{2:{name:"Infuse Item",count:3,type:"featureType=ai|source=UAArtificerRevisited"},4:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"},7:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"},11:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"},15:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"},19:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"}}},artificer:{class:{2:{name:"Infuse Item",count:4,type:"featureType=ai|source=ERLW"},6:{name:"Infuse Item",count:2,type:"featureType=ai|source=ERLW"},10:{name:"Infuse Item",count:2,type:"featureType=ai|source=ERLW"},14:{name:"Infuse Item",count:2,type:"featureType=ai|source=ERLW"},18:{name:"Infuse Item",count:2,type:"featureType=ai|source=ERLW"}}},barbarian:{subclasses:{"Path of the Totem Warrior":{3:{name:"Totem Spirit",count:1,options:["Bear","Eagle","Elk","Wolf","Tiger"]},6:{name:"Aspect of the Beast",count:1,options:["Bear","Eagle","Elk",{name:"Tiger",options:["athletics","acrobatics","stealth","survival"],choose:2,type:"proficiency"},"Wolf"]},14:{name:"Totemic Attunement",count:1,options:["Bear","Eagle","Elk","Tiger","Wolf"]}}}},bard:{subclasses:{"College of Swords":{3:{name:"Fighting Style",count:1,type:"fs:b"}}}},paladin:{class:{2:{name:"Fighting Style",type:"fs:p",count:1}}},sorcerer:{class:{3:{name:"Metamagic",type:"mm",count:2},10:{name:"Metamagic",type:"mm",count:1},17:{name:"Metamagic",type:"mm",count:1}},subclasses:{"Divine Soul":{1:[{name:"Divine Magic Affinity",options:["Good (Cure Wounds)","Evil (Inflict Wounds)","Law (Bless)","Chaos (Bane)","Neutrality (Protection From Good and Evil"],count:1}]}}}};var d=i(71),r=(i(77),i(79),i(110)),m=i(32);class h extends(Object(a.a)(s.a)){static get properties(){return{levels:{type:Array,value:[]},classes:{type:Object},subclasses:{type:Object,value:void 0},noContentMessage:{type:Boolean,value:!1},isEditMode:{type:Boolean,value:!1}}}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(l.G)()),Object(l.m)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode,this.$.classGrid.notifyResize()},Object(r.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(r.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(l.m)().removeEventListener("character-selected",this.characterChangeHandler),Object(r.b)().removeEventListener("editModeChange",this.editModeHandler)}ready(){super.ready();const e=new d.a;setTimeout(()=>{const t=this.$.classGrid;let i;t.rowDetailsRenderer=((t,i,s)=>{let a=[],l=this._getClassLevelFeatures(this.levels,s.index,this.classes,this.subclasses);if(l&&l.length){t.firstElementChild||(t.innerHTML='<div class="details" id="stats"></div>');for(let t of l)e.recursiveEntryRender(t,a,0,void 0,!0);const i=t.querySelector(".details");Object(n.jqEmpty)(i),i.innerHTML=a.join("")}}).bind(this),t.addEventListener("grid-dragstart",(function(e){i=e.detail.draggedItems[0],t.dropMode="between"})),t.addEventListener("grid-dragend",(function(e){i=t.dropMode=null})),t.addEventListener("grid-drop",(function(e){const s=e.detail.dropTargetItem;if(i&&i!==s){const a=t.items.filter((function(e){return e!==i})),n=a.indexOf(s)+("below"===e.detail.dropLocation?1:0);a.splice(n,0,i),Object(l.db)(a)}}))},0)}async updateFromCharacter(e){if(e&&e.levels&&e.levels.length){this.noContentMessage=!1,this.character=e,this.classes=await Object(l.s)(e),this.subclasses=JSON.parse(JSON.stringify(e.subclasses)),this.classChoices=await this._findLevelChoices(e,this.classes),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0})),this.levels=e.levels;const t=[];for(let i=0;i<e.levels.length;i++)t.push(await Object(l.y)(i));this.hitDiceMaxes=t,this.$.classGrid.clearCache()}else this.noContentMessage=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0})),this.$.classGrid.clearCache()}_getClassLevelFeatures(e,t,i,s){if(i&&e[t]&&s){const a=e[t].name,l=i[a];if(l){const i=l.classFeatures;let o=-1,c=-1;if(e.length>=t+1){for(let s=0;s<=t;s++)if(e[s].name===a){o++;const e=i[o];if(e){e.find(e=>e.gainSubclassFeature)&&c++}}const d=i[o];if(d){if(d.some(e=>e.gainSubclassFeature)&&s&&s[a]&&l.subclasses&&l.subclasses.length){const e=l.subclasses.find(e=>s[a].name===e.name);if(e&&e.subclassFeatures[c])return e.subclassFeatures[c].map(e=>(e.isSubclass=!0,e)),[...d].concat(e.subclassFeatures[c])}return d.filter(e=>{const t=Object(n.getEntryName)(e);return"Proficiency Versatility"!==t&&"Martial Versatility"!==t})}}}}}_getClassLevelFeatureStringArray(e,t,i,s){if(e&&void 0!==t&&i&&s){const a=this._getClassLevelFeatures(e,t,i,s);if(a)return a.map(e=>({name:Object(n.getEntryName)(e),isSubclass:e.isSubclass}))}}_level(e){return e+1}_deleteLevel(e){let t=e.model.__data.index;this.levels.splice(t,1),Object(l.db)(this.levels)}_expandDetails(e){let t=e.model.__data.item,i=this.$.classGrid.detailsOpenedItems.indexOf(t)>-1;for(let e of this.$.classGrid.detailsOpenedItems)this.$.classGrid.closeItemDetails(e);i?this.$.classGrid.closeItemDetails(t):this.$.classGrid.openItemDetails(t),this.$.classGrid.notifyResize()}async _findLevelChoices(e,t){const i=[];if(e&&e.levels&&e.levels.length)for(let s=0;s<e.levels.length;s++)i.push(await this._findChoices(e,t,s));return i}async _findChoices(e,t,i){if(t&&e.levels&&e.levels.length&&e.levels.length>i){let s=e.levels,a=e.subclasses,n=s[i].name,o=t[n];if(o){let d=[],r=0,h=Object(l.K)(o);for(let e=0;e<=i;e++){s[e].name===n&&r++}void 0!==h&&r===h&&d.push({id:"subclass",from:o.subclasses,selections:e.subclasses[n]});let p=this._getClassLevelFeatures(s,i,t,a);if(p&&p.length&&p.find(e=>"Ability Score Improvement"===e.name)&&d.push({id:"asi"}),0===i){const t=o.startingProficiencies.skills[0].choose;d.push({id:"profs",count:t.count,from:t.from,selections:e.classSkillProficiencies})}if(r){const e=c[n.toLowerCase()];if(e&&e.class&&e.class[r]){const t=[].concat(e.class[r]);for(const e of t)if(e.options)d.push({id:"classFeature",name:e.name,from:e.options,count:e.count>1?e.count:void 0,class:n.toLowerCase(),feature:e.name,level:r,selections:Object(l.q)(n.toLowerCase(),r,e.name)});else if(e.type){const t=await Object(m.a)("features",e.type);d.push({id:"classFeature",name:e.name,from:t,count:e.count>1?e.count:void 0,class:n.toLowerCase(),feature:e.name,level:r,selections:Object(l.q)(n.toLowerCase(),r,e.name)})}}if(e&&e.subclasses&&a[n]&&e.subclasses[a[n].name]&&e.subclasses[a[n].name][r]){const t=[].concat(e.subclasses[a[n].name][r]);for(const e of t)if(e.options)d.push({id:"subclassFeature",name:e.name,from:e.options,count:e.count>1?e.count:void 0,class:n.toLowerCase(),subclass:a[n],feature:e.name,level:r,selections:Object(l.J)(n.toLowerCase(),a[n].name.toLowerCase(),r,e.name)});else if(e.type){const t=await Object(m.a)("features",e.type);d.push({id:"subclassFeature",name:e.name,from:t,count:e.count>1?e.count:void 0,class:n.toLowerCase(),subclass:a[n],feature:e.name,level:r,selections:Object(l.J)(n.toLowerCase(),a[n].name.toLowerCase(),r,e.name)})}}}return d}}return[]}_equal(e,t){return e===t}_genSubclassCallback(e){return t=>{Object(l.Q)(void 0,e.name,t)}}_genSubclassOptions(e){return this.classes[e.name].subclasses}_getSubclassSelection(e,t){return t[e.name]}_classFeatureOptionAddCallback(e,t,i){return s=>{let a;a=Array.isArray(s)?s.map(e=>e.name?{name:e.name,source:e.source}:e):s.name?{name:s.name,source:s.source}:s,Object(l.cb)(e,t,i,a)}}_subclassFeatureOptionAddCallback(e,t,i,s){return a=>{let n;n=Array.isArray(a)?a.map(e=>e.name?{...e}:e):a.name?{...a}:a,Object(l.ob)(e,t.name.toLowerCase(),i,s,n)}}_indexOfLevel(e,t){return t.indexOf(e)}_isMobile(){return window.innerWidth<921}_objArray(e){return Object.values(e)}_atIndex(e,t){return e?e[t]:null}_svgFromClass(e){return e?e.replace(/(\s|\(|\))/g,""):""}_addClassLevel(e){Object(l.P)(void 0,e.model.item,"classes")}_classSkillAddCallback(e){Object(l.eb)(e)}_levelHp(e,t){return Object(l.z)(e,t+1)}_editModeClass(e){return e?"edit-mode":"not-edit-mode"}_toggleHpField(e){const t=e.target.closest(".btn-field"),i=t.classList.contains("btn-field--open"),s=t.querySelector("vaadin-integer-field"),a=parseInt(t.dataset.level)+1,n=t.dataset.className,o=parseInt(t.dataset.max);if(i){const e=parseInt(s.value);e&&e<=o&&e>0?(Object(l.kb)(n,a,e),s.value="",t.classList.toggle("btn-field--open")):(t.classList.add("btn-field--error"),setTimeout(()=>{t.classList.remove("btn-field--error")},500))}else t.classList.toggle("btn-field--open"),s.focus()}_levelHitDice(e,t){if(t&&void 0!==e&&t[e])return t[e]}static get template(){return s.b`
      <style include="material-styles my-styles">
        .something {
          display: block;
        }
        #stats {
          margin-top: 16px;
          line-height: 1.9;
        }
        .details {
          padding: 0 24px;
        }

        #classGrid {
          margin-bottom: 144px;
        }

        .not-edit-mode .heading-wrap {
          display: none;
        }

        .heading-wrap {
          display: flex;
          justify-content: space-between;
          margin: 22px 14px 5px;
          align-items: center;
        }

        .not-edit-mode .button-wrap {
          display: none;
        }

        .button-wrap {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          padding: 10px;
        }
        .button-wrap > * {
          margin: 4px;
        }

        .row {
          position: relative;
          min-height: 80px;
        }
        .row:after {
          content: "";
          display: table;
          clear: both;
        }

        .open-details {
          cursor: pointer;
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
        }
        .open-details:hover {
          color: var(--mdc-theme-secondary);
        }

        .level-col {
          width: calc(100% - 70px);
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          flex-shrink: 0;
          padding: 6px 0;
        }
        .level-col__level {
          margin-right: 10px;
          font-size: 20px;
          font-weight: bold;
        }
        .level-col__image-wrap {
          width: 30px;
          position: relative;
          height: 21px;
          display: inline-block;
        }
        .level-col__image {
          width: 30px;
          height: 30px;
          display: block;
          position: absolute;
          top: -1px;
        }
        .level-col__class {
          font-size: 20px;
          font-weight: bold;
        }

        .features-col {
          white-space: normal;
          width: calc(100% - 70px);
          margin: 0;
          padding: 8px 0;
          font-size: 15px;
        }
        .class-feature:not(:last-of-type)::after {
          content: ', ';
        }
        .class-feature[subclass] {
          color: var(--mdc-theme-secondary);
        }

        .choices-col {
          display: flex;
          float: left;
          flex-wrap: wrap;
          width: 100%;
        }
        .choices-col__choice {
          margin-right: 16px;
          width: 100%;
        }
        .choices-col__choice dnd-select-add {
          min-width: 250px;
          width: calc(50% - 20px);
        }
        .choices-col__subclass-choice {
          display: block;
        }

        .delete-col {
          position: absolute;
          right: -8px;
          bottom: 0;
        }
        .delete-btn {
          height: 24px;
          width: 24px;
          font-size: 18px;
          padding: 0;
        }
        .delete-btn:hover {
          color: var(--mdc-theme-secondary);
        }
        .not-edit-mode .delete-btn {
          display: none;
        }
        

        .btn-field {
          display: inline-flex;
          flex-direction: row;
          flex-wrap: nowrap;
          margin-bottom: 16px;
          width: 80px;
          height: 36px;
          background: var(--lumo-contrast-10pct);
          border-radius: 4px;
        }
        .btn-field--error {
          background: var(--lumo-error-color-50pct);
        }
        .btn-field__btn {
          display: block;
          width: 100%;
        }
        .btn-field__input {
          display: none;
        }
        .btn-field--open .btn-field__btn {
          width: 40px;
        }
        .btn-field__btn-label-text {
          position: relative;
          left: 4px;
          bottom: 2px;
        }
        .btn-field--open .btn-field__btn-label-text {
          display: none;
        }
        .btn-field--open .btn-field__input {
          display: block;
          width: 40px;
          margin-top: -40px;
        }
        .btn-field--open .btn-field__btn-label {
          margin-left: -20px;
        }
        .btn-field vaadin-integer-field {
          --lumo-contrast-10pct: transparent;
        }


        .hp-col {
          position: absolute;
          right: 0;
          top: 8px;
        }
        .not-edit-mode .hp-col {
          right: 0px;
        }
        .hp-col .material-icons {
          font-size: 16px;
          position: relative;
          margin-right: 8px;
          top: 3px;
        }
        .hp-col__non-edit {
          display: block;
        }
        .edit-mode .hp-col__non-edit {
          display: none;
        }
        .hp-col__edit {
          display: none;
        }
        .edit-mode .hp-col__edit {
          display: inline-flex;
        }

        .details {
          font-size: 14px;
          width: calc(100% - 30px);
          margin: 0 auto 13px !important;
          background: var(--lumo-contrast-10pct);
          border-radius: 4px;
          white-space: pre-line;
          padding: 14px 14px 1px;
        }

        .details#stats p {
          line-height: 1.5;
        }

        @media(min-width: 921px) {
          .features-col {
            margin: 0 30px 0 12px;
            width: unset;
            font-size: 16px;
          }
          #classGrid {
            margin-bottom: 0;
          }
        }

        .no-content-message {
          padding: 20px;
          font-size: 14px;
          font-style: italic;
        }
      </style>

      <div class$="[[_editModeClass(isEditMode)]]">
        <div class="heading-wrap">
          <dnd-select-add model="class-all" placeholder="Add a Class"></dnd-select-add>
        </div>
        <div class="button-wrap">
          <template is="dom-repeat" items="[[_objArray(classes)]]">
            <dnd-button icon="add" label="[[item.name]]" on-click="_addClassLevel"></dnd-button>
          </template>
        </div>

        <div class="no-content-message" hidden$="[[!noContentMessage]]">Enter edit mode to add classes and levels.</div>

        <vaadin-grid id="classGrid" items=[[levels]] theme="no-border" height-by-rows>
          <vaadin-grid-column flex-grow="1">
            <template>
              <div class="row">
                <div class="open-details" on-click="_expandDetails">
                  <div class="level-col">
                    <span class="level-col__level">[[_level(index)]]</span>
                    <span class="level-col__image-wrap" ><dnd-svg class="level-col__image" default-color id="[[_svgFromClass(item.name)]]"></dnd-svg></span>
                    <span class="level-col__class">[[item.name]]</span>
                  </div>

                  <div class="features-col">
                    <template is="dom-repeat" items="[[_getClassLevelFeatureStringArray(levels, index, classes, subclasses)]]">
                      <span class="class-feature" subclass$="[[item.isSubclass]]">[[item.name]]</span>
                    </template>
                  </div>
                </div>

                <div class="choices-col">
                  <template is="dom-repeat" items="[[_atIndex(classChoices, index)]]" as="choice">
                    <div class="choices-col__choice">
                      <template is="dom-if" if="[[_equal(choice.id, 'subclass')]]">
                        <dnd-select-add class="choices-col__subclass-choice" label="Subclass" placeholder="<Choose Subclass>" disabled$="[[!isEditMode]]"
                          options="[[choice.from]]" value="[[choice.selections]]" add-callback="[[_genSubclassCallback(item)]]"></dnd-select-add>
                      </template>
                      <template is="dom-if" if="[[_equal(choice.id, 'asi')]]">
                        <dnd-asi-select level-index="[[_indexOfLevel(item, levels)]]" character="[[character]]" disabled$="[[!isEditMode]]"></dnd-asi-select>
                      </template>
                      <template is="dom-if" if="[[_equal(choice.id, 'profs')]]">
                        <dnd-select-add choices="[[choice.count]]" label="Skill Proficiency" placeholder="<Choose Skills>" disabled$="[[!isEditMode]]"
                          options="[[choice.from]]" value="[[choice.selections]]" add-callback="[[_classSkillAddCallback]]"></dnd-select-add>
                      </template>
                      <template is="dom-if" if="[[_equal(choice.id, 'classFeature')]]">
                        <dnd-select-add choices="[[choice.count]]" label="[[choice.name]]" placeholder="<Choose Option>" disabled$="[[!isEditMode]]"
                          options="[[choice.from]]" value="[[choice.selections]]" add-callback="[[_classFeatureOptionAddCallback(choice.class, choice.level, choice.feature)]]"></dnd-select-add>
                      </template>
                      <template is="dom-if" if="[[_equal(choice.id, 'subclassFeature')]]">
                        <dnd-select-add choices="[[choice.count]]" label="[[choice.name]]" placeholder="<Choose Option>" disabled$="[[!isEditMode]]"
                          options="[[choice.from]]" value="[[choice.selections]]" add-callback="[[_subclassFeatureOptionAddCallback(choice.class, choice.subclass, choice.level, choice.feature)]]"></dnd-select-add>
                      </template>
                    </div>
                  </template>
                </div>

                <div class="hp-col">
                  <div class="hp-col__non-edit">HP Roll: <span class="material-icons" aria-hidden="true">favorite</span> [[_levelHp(item.name, index)]]</div>
                  <div class="hp-col__edit btn-field" data-max$="[[_levelHitDice(index, hitDiceMaxes)]]" data-level$="[[index]]" data-class-name$="[[item.name]]">
                    <dnd-button background="none" class="btn-field__btn" on-click="_toggleHpField">
                      <span class="btn-field__btn-label" slot="label"><span class="material-icons" aria-hidden="true">favorite</span><span class="btn-field__btn-label-text">[[_levelHp(item.name, index)]]</span></span>
                    </dnd-button>
                    <vaadin-integer-field class="btn-field__input" min="1" max="[[_levelHitDice(index, hitDiceMaxes)]]"></vaadin-integer-field>
                  </div>
                </div>

                <div class="delete-col">
                  <dnd-button class="delete-btn link" label="Delete" icon="close" on-click="_deleteLevel"></dnd-button>
                </div>
              </div>
            </template>
          </vaadin-grid-column>
        </vaadin-grid>
      </div>
    `}}customElements.define("dnd-character-builder-class",h)}}]);
//# sourceMappingURL=10.bundle.js.map