(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{105:function(e,t,s){"use strict";var i=s(1),a=s(0),l=s(5);function n(){this.wrapperTag="div",this.baseUrl="",this.setWrapperTag=function(e){this.wrapperTag=e},this.setBaseUrl=function(e){this.baseUrl=e},this.recursiveEntryRender=function(e,t,s,o,c,r){if(s=null==s?"section"===e.type?-1:0:s,o=null==o?null:o,c=null==c?null:c,(r=null!=r&&r)&&d(),"object"==typeof e){switch(void 0===e.type||"section"===e.type?"entries":e.type){case"entries":u(this,!0);break;case"options":!function(t){e.entries&&(e.entries=e.entries.sort((e,t)=>e.name&&t.name?Object(i.ascSort)(e.name,t.name):e.name?-1:t.name?1:0),u(t,!1))}(this);break;case"list":if(e.items){t.push(`<ul ${e.style?`class="${e.style}"`:""}>`);for(let l=0;l<e.items.length;l++)this.recursiveEntryRender(e.items[l],t,s+1,`<li ${Object(i.isNonstandardSource)(e.items[l].source)?`class="${a.i}"`:""}>`,"</li>");t.push("</ul>")}break;case"table":!function(i){t.push("<table class='table'>"),void 0!==e.caption&&t.push(`<caption>${e.caption}</caption>`);if(t.push("<thead>"),t.push("<tr class='table-row table-row--header'>"),e.colLabels)for(let s=0;s<e.colLabels.length;++s)t.push(`<th ${a(s)}>${e.colLabels[s]}</th>`);t.push("</tr>"),t.push("</thead>"),t.push("<tbody>");for(let a=0;a<e.rows.length;++a){t.push("<tr class='table-row'>");for(let n=0;n<e.rows[a].length;++n)t.push(`<td ${l(n)}>`),i.recursiveEntryRender(e.rows[a][n],t,s+1),t.push("</td>");t.push("</tr>")}function a(t){return void 0===e.colStyles||t>=e.colStyles.length?"class='table-cell'":`class="table-cell ${e.colStyles[t]}"`}function l(t){return void 0!==e.rowStyles?void 0===e.rowStyles||t>=e.rowStyles.length?"class='table-cell'":`class="table-cell ${e.rowStyles[t]}"`:a(t)}t.push("</tbody>"),t.push("</table>")}(this);break;case"invocation":!function(e){u(e,!0)}(this);break;case"patron":!function(e){u(e,!1)}(this);break;case"abilityDc":d(),t.push(`<span class='spell-ability'><span>${e.name} save DC</span> = 8 + your proficiency bonus + your ${Object(i.utils_makeAttChoose)(e.attributes)}</span>`),h();break;case"abilityAttackMod":null!==o&&t.push(o),t.push(`<span class='spell-ability'><span>${e.name} attack modifier</span> = your proficiency bonus + your ${Object(i.utils_makeAttChoose)(e.attributes)}</span>`),null!==c&&t.push(c);break;case"inline":if(e.entries)for(let i=0;i<e.entries.length;i++)this.recursiveEntryRender(e.entries[i],t,s);break;case"bonus":t.push((e.value<0?"":"+")+e.value);break;case"bonusSpeed":t.push((e.value<0?"":"+")+e.value+"ft.");break;case"dice":t.push(n.getEntryDice(e));break;case"link":!function(e,s){let a;if("internal"===s.href.type){if(a=`${e.baseUrl}${s.href.path}#`,void 0!==s.href.hash&&(a+=s.href.hash,void 0!==s.href.subhashes))for(let e=0;e<s.href.subhashes.length;e++){const t=s.href.subhashes[e];a+=`,${Object(i.encodeForHash)(t.key)}:${Object(i.encodeForHash)(t.value)}`}}else"external"===s.href.type&&(a=s.href.url);t.push(`<a href='${a}'>${s.text}</a>`)}(this,e);break;case"item":t.push(`<li><b>${e.name}: </b>`),this.recursiveEntryRender(e.entry,t,s),t.push("</li>");break;case"print":t.push(p(e.entry))}}else"string"==typeof e?(d(),p(this),h()):(d(),t.push(e),h());function d(){null!==o&&t.push(o)}function h(){null!==c&&t.push(c)}function u(o,c){const r=s>=2,d=c?s+1:s,h=function(){const t=[];Object(i.isNonstandardSource)(e.source)&&t.push(a.i);r&&void 0!==e.name?t.push(n.HEAD_2):t.push(-1===s?n.HEAD_NEG_1:0===s?n.HEAD_0:n.HEAD_1);"invocation"!==e.type&&"patron"!==e.type||void 0===e.subclass||t.push(a.j);return t.length>0?`class="${t.join(" ")}"`:""}(),u=function(){let t="";if("invocation"===e.type||"patron"===e.type){const s=e.source?`title="Source: ${l.a.sourceJsonToFull(e.source)}"`:"";t=void 0!==e.subclass?`${a.f}="${e.subclass.name}" ${a.g}="${e.subclass.source}" ${s}`:`${a.f}="${n.DATA_NONE}" ${a.g}="${n.DATA_NONE}" ${s}`}return t}(),p=e.prerequisite?`<span class="prerequisite">Prerequisite: ${e.prerequisite}</span>`:"",m=void 0!==e.name?`<span class="stat-name">${e.name}${Object(i.isNonstandardSource)(e.source)?" (UA)":""}${r?".":""}</span> `:"";if(e.entries||e.name){if(t.push(`<${o.wrapperTag} ${u} ${h}>${m}${p}`),e.entries)for(let s=0;s<e.entries.length;s++)o.recursiveEntryRender(e.entries[s],t,d,"<p>","</p>");t.push(`</${o.wrapperTag}>`)}}function p(o){const c=function(){let t,s,i=0,a=!1;const l=[];let n="";for(let o=0;o<e.length;++o)switch(t=e.charAt(o),s=o<e.length-1?e.charAt(o+1):null,t){case"{":"@"===s?i++>0?n+=t:(l.push(n),a=!1,n=""):n+=t;break;case"}":0==--i?(l.push(n),n=""):n+=t;break;default:n+=t}n.length>0&&l.push(n);return l}();for(let e=0;e<c.length;e++){const d=c[e];if(null!=d&&""!==d)if("@"===d.charAt(0)){const[e,c]=[(r=d).substr(0,r.indexOf(" ")),r.substr(r.indexOf(" ")+1)];if("@bold"===e||"@b"===e||"@italic"===e||"@i"===e||"@skill"===e||"@action"===e)switch(e){case"@b":case"@bold":t.push("<b>"),o.recursiveEntryRender(c,t,s),t.push("</b>");break;case"@i":case"@italic":t.push("<i>"),o.recursiveEntryRender(c,t,s),t.push("</i>");break;case"@action":t.push(`<span title="${l.a.actionToExplanation(c)}" class="explanation">${c}</span>`);break;case"@skill":t.push(`<span title="${l.a.skillToExplanation(c)}" class="explanation">${c}</span>`)}else{const[l,r,d,...h]=c.split("|"),u=`${l}${r?`${a.n}${r}`:""}`,p={type:"link",href:{type:"internal",path:"",hash:Object(i.encodeForHash)(u)},text:d||l};switch(e){case"@spell":r||(p.href.hash+=a.n+a.hb),p.href.hash="/spells/"+p.href.hash,o.recursiveEntryRender(p,t,s);break;case"@item":r||(p.href.hash+=a.n+a.T),p.href.hash="/items/"+p.href.hash,o.recursiveEntryRender(p,t,s);break;case"@condition":r||(p.href.hash+=a.n+a.hb),p.href.hash="/conditions/"+p.href.hash,o.recursiveEntryRender(p,t,s);break;case"@class":const e=n.RE_INLINE_CLASS.exec(c);e&&(p.href.hash=e[1].trim(),p.href.subhashes=[{key:"sub",value:e[2].trim()+"~phb"}]),r||(p.href.hash+=a.n+a.hb),p.href.hash="/classes/"+p.href.hash,o.recursiveEntryRender(p,t,s);break;case"@creature":r||(p.href.hash+=a.n+a.cb),p.href.hash="/bestiary/"+p.href.hash,o.recursiveEntryRender(p,t,s);break;case"@filter":t.push(l);break;case"@damage":case"@dice":case"@book":t.push(l);break;case"@5etools":r.indexOf(".")>-1?p.href.hash="/"+r.substring(0,r.indexOf(".")):p.href.hash="/"+r,o.recursiveEntryRender(p,t,s)}}}else t.push(d)}var r}r&&h()}}n.getEntryDice=function(e){let t;if(e.number&&e.faces)t=String(e.number)+"d"+e.faces;else if(e.toRoll&&e.toRoll.length){for(let s of e.toRoll)t=String(s.number)+"d"+s.faces+" + ";t=t.substring(0,t.length-3)}return"undefined"!=typeof droll&&!0===e.rollable?`<span class='roller unselectable' onclick="if (this.rolled) { this.innerHTML = this.innerHTML.split('=')[0].trim()+' = '+droll.roll('${t}').total; } else { this.rolled = true; this.innerHTML += ' = '+droll.roll('${t}').total; }">${t}</span>`:t},n.RE_INLINE_CLASS=/(.*?) \((.*?)\)/,n.HEAD_NEG_1="statsBlockSectionHead",n.HEAD_0="statsBlockHead",n.HEAD_1="statsBlockSubHead",n.HEAD_2="statsInlineHead",n.DATA_NONE="data-none",t.a=n},114:function(e,t,s){"use strict";var i=s(7),a=s(18),l=s(1),n=(s(78),s(37));class o extends i.a{static get properties(){return{test:{type:Boolean,reflectToAttribute:!0,value:!1},options:{type:Array,observer:"optionsUpdated"},model:{type:String},addCallback:{type:Function},value:{type:String,value:"",observer:"valueUpdated"},choices:{type:Number,observer:"choicesUpdated"},label:{type:String},placeholder:{type:String},multiValue:{type:String,value:""},disabled:{type:Boolean,value:!1,reflectToAttribute:!0}}}choicesUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}optionsUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}valueUpdated(){if(this.choices)if(Array.isArray(this.value)&&this.options){const e=this.value.map(e=>-1!==this.options.indexOf(e)?this.options.indexOf(e):this.options.findIndex(t=>t.name===e.name&&t.source===e.source)).filter(e=>-1!==e);this.listBox&&(this.listBox.selectedValues=e),this.multiValue=e.map(e=>{let t=this.options[e];return t.name?t.name:Object(l.util_capitalizeAll)(t)}).join(", ")}else this.listBox&&(this.listBox.selectedValues=[]),this.multiValue="";else this.value&&this.options?this.value.name?this.$.select.value=this.options.findIndex(e=>e.name===this.value.name||e===this.value.name)+"":this.$.select.value=this.options.findIndex(e=>e.name===this.value||e===this.value)+"":this.$.select.value=""}ready(){super.ready(),setTimeout(async()=>{this.model&&(this.options=await Object(n.b)(this.model)),this.$.select.renderer=(e,t)=>{if(!this.listBox){if(this.listBox=document.createElement("vaadin-list-box"),this.choices&&(this.listBox.setAttribute("multiple",!0),this.listBox.addEventListener("click",e=>{t.opened=!0;let s=null!==e.srcElement.getAttribute("selected");setTimeout(()=>{this.listBox.selectedValues.length>this.choices&&!s&&this.listBox.selectedValues.splice(this.listBox.selectedValues.length-2,1);let e=this.listBox.selectedValues.map(e=>this.options[e]);this.multiValue=e.map(e=>e.name?e.name:Object(l.util_capitalizeAll)(e)).join(", "),this.addCallback&&this.addCallback(e)},0)})),this.options&&this.options.length)for(let e=0;e<this.options.length;e++){const t=this.options[e],s=document.createElement("vaadin-item");t.name?(s.textContent=t.name,s.setAttribute("value",e)):(s.textContent=Object(l.util_capitalizeAll)(t),s.setAttribute("value",e)),this.listBox.appendChild(s)}e.appendChild(this.listBox),this.$.select._assignMenuElement(),this.valueUpdated()}}},0)}connectedCallback(){super.connectedCallback(),this.selectChangeHandler=()=>{const e=this.$.select.value;if(e&&!this.choices){const t=this.options[e];this.addCallback?this.addCallback(t,this.model):Object(a.M)(void 0,t,this.model),this.value||(this.$.select.value="")}},this.$.select.addEventListener("change",this.selectChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),this.$.select.removeEventListener("change",this.selectChangeHandler)}_exists(e){return!!e}_label(e,t){if(e)return t?`${e} (${t})`:e}static get template(){return i.b`
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
    `}}customElements.define("dnd-select-add",o)},115:function(e,t,s){"use strict";var i=s(7),a=s(68);s(75),s(108);class l extends i.a{static get properties(){return{label:{type:String,value:""},icon:{type:String,value:""},svg:{type:String,value:""},background:{type:String,value:""},border:{type:String,value:""},svgFill:{type:String,value:""},svgStroke:{type:String,value:""}}}connectedCallback(){setTimeout(()=>{this.button=new a.a(this.$.button)},10)}_exists(e){return!!e}_styleStr(e,t){let s="";return e&&(s+=`background: ${e}; `),t&&(s+=`border: ${t}; `),s}_svgStyleStr(e,t){let s="";return e&&(s+=`fill: ${e}; `),t&&(s+=`stroke: ${t}; `),s}static get template(){return i.b`
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
    `}}customElements.define("dnd-button",l)},128:function(e,t,s){"use strict";s.r(t);var i=s(7),a=s(27),l=s(18);s(117),s(114),s(120),s(115);class n extends i.a{static get properties(){return{levelIndex:{type:Number},checked:{type:Boolean,value:!1},selectedFeat:{type:Object},selectedAbility1:{type:String,value:""},selectedAbility2:{type:String,value:""},featHasAttributeChoice:{type:Boolean,value:!1},featAttributeSelection:{type:String,value:""},featAttributeOptions:{type:Array,value:[]},disabled:{type:Boolean,value:!1,reflectToAttribute:!0}}}constructor(){super(),this.attributeOptions=["STR","DEX","CON","INT","WIS","CHA"]}connectedCallback(){super.connectedCallback(),this.switchChangeHandler=e=>{this.checked=e.detail.checked,this._genASICallback()()},this.addEventListener("switch-change",this.switchChangeHandler),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(l.E)()),Object(l.m)().addEventListener("character-selected",this.characterChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("switch-change",this.switchChangeHandler),Object(l.m)().removeEventListener("character-selected",this.characterChangeHandler)}async updateFromCharacter(e){const{asi:t,index:s}=await Object(l.f)(this.levelIndex,e);if(this.featHasAttributeChoice=!1,t){if(this.selectedFeat=t.feat,this.selectedAbility1=t.ability1,this.selectedAbility2=t.ability2,this.checked=t.isFeat,t.isFeat&&t.feat&&t.feat.name&&t.feat.source){const s=`${t.feat.name}_${t.feat.source}`,i=await Object(l.v)(s);i.ability&&i.ability.length&&i.ability[0].choose&&(this.featHasAttributeChoice=!0,this.featAttributeOptions=i.ability[0].choose.from.map(e=>e.toUpperCase()),this.featAttributeSelection=e.featAttributeSelections&&e.featAttributeSelections[s]?e.featAttributeSelections[s]:"")}}else this.selectedFeat={name:"",source:""},this.selectedAbility1="",this.selectedAbility2="",this.checked=!1;this.asiIndex=s}_genASICallback(e){return t=>{Object(l.T)({feat:"feat"===e?{name:t.name,source:t.source}:this.selectedFeat,ability1:"ability1"===e?t:this.selectedAbility1,ability2:"ability2"===e?t:this.selectedAbility2,isFeat:this.checked},this.asiIndex)}}_genFeatAbilityCallback(){return e=>{if(this.selectedFeat&&this.selectedFeat.name&&this.selectedFeat.source){const t=`${this.selectedFeat.name}_${this.selectedFeat.source}`;Object(l.Z)(t,e)}}}_disableLabel(e){return e?"Feat":"ASI"}static get template(){return i.b`
      <style>
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
      </style>

      <div class="disable-label" hidden$="[[!disabled]]">[[_disableLabel(checked)]]</div>
      <dnd-switch initial-value=[[checked]] label="ASI" secondary-label="Feat" disabled$="[[disabled]]" hidden$="[[disabled]]"></dnd-switch>
      <div class="abilities" hidden$=[[checked]]>
        <dnd-select-add add-callback="[[_genASICallback('ability1')]]" value="[[selectedAbility1]]" options="[[attributeOptions]]" placeholder="<ASI>" disabled$="[[disabled]]"></dnd-select-add>
        <dnd-select-add add-callback="[[_genASICallback('ability2')]]" value="[[selectedAbility2]]" options="[[attributeOptions]]" placeholder="<ASI>" disabled$="[[disabled]]"></dnd-select-add>
      </div>
      <div hidden$=[[!checked]]>
        <dnd-select-add add-callback="[[_genASICallback('feat')]]" model="feats" value="[[selectedFeat.name]]" placeholder="<Choose Feat>" disabled$="[[disabled]]"></dnd-select-add>
      </div>
      <div hidden$=[[!featHasAttributeChoice]]>
        <dnd-select-add test add-callback="[[_genFeatAbilityCallback()]]" value="[[featAttributeSelection]]" options="[[featAttributeOptions]]" placeholder="<Choose Attribute>" disabled$="[[disabled]]"></dnd-select-add>
      </div>
    `}}customElements.define("dnd-asi-select",n);s(108);var o=s(1);const c={"artificer(ua)":{class:{2:{name:"Wonderous Invention",count:1,options:["{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]},5:{name:"Wonderous Invention",count:1,options:["{@item Alchemy jug}","{@item helm of comprehending languages}","{@item lantern of revealing}","{@item ring of swimming}","{@item robe of useful items}","{@item rope of climbing}","{@item wand of magic detection}","{@item wand of secrets}","{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]},10:{name:"Wonderous Invention",count:1,options:["{@item Bag of beans}","{@item chime of opening}","{@item decanter of endless water}","{@item eyes of minute seeing}","{@item folding boat}","{@item Heward's handy haversack}","{@item Alchemy jug}","{@item helm of comprehending languages}","{@item lantern of revealing}","{@item ring of swimming}","{@item robe of useful items}","{@item rope of climbing}","{@item wand of magic detection}","{@item wand of secrets}","{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]},15:{name:"Wonderous Invention",count:1,options:["{@item Boots of striding and springing}","{@item bracers of archery}","{@item brooch of shielding}","{@item broom of flying}","{@item hat of disguise}","{@item slippers of spider climbing}","{@item Bag of beans}","{@item chime of opening}","{@item decanter of endless water}","{@item eyes of minute seeing}","{@item folding boat}","{@item Heward's handy haversack}","{@item Alchemy jug}","{@item helm of comprehending languages}","{@item lantern of revealing}","{@item ring of swimming}","{@item robe of useful items}","{@item rope of climbing}","{@item wand of magic detection}","{@item wand of secrets}","{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]},20:{name:"Wonderous Invention",count:1,options:["{@item Eyes of the eagle}","{@item gem of brightness}","{@item gloves of missile snaring}","{@item gloves of swimming and climbing}","{@item ring of jumping}","{@item ring of mind shielding}","{@item wings of flying}","{@item Boots of striding and springing}","{@item bracers of archery}","{@item brooch of shielding}","{@item broom of flying}","{@item hat of disguise}","{@item slippers of spider climbing}","{@item Bag of beans}","{@item chime of opening}","{@item decanter of endless water}","{@item eyes of minute seeing}","{@item folding boat}","{@item Heward's handy haversack}","{@item Alchemy jug}","{@item helm of comprehending languages}","{@item lantern of revealing}","{@item ring of swimming}","{@item robe of useful items}","{@item rope of climbing}","{@item wand of magic detection}","{@item wand of secrets}","{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]}}},"artificer (revisited)":{class:{2:{name:"Infuse Item",count:3,type:"featureType=ai|source=UAArtificerRevisited"},4:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"},7:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"},11:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"},15:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"},19:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"}}},artificer:{class:{2:{name:"Infuse Item",count:4,type:"featureType=ai|source=ERLW"},6:{name:"Infuse Item",count:2,type:"featureType=ai|source=ERLW"},10:{name:"Infuse Item",count:2,type:"featureType=ai|source=ERLW"},14:{name:"Infuse Item",count:2,type:"featureType=ai|source=ERLW"},18:{name:"Infuse Item",count:2,type:"featureType=ai|source=ERLW"}}},barbarian:{subclasses:{"Path of the Totem Warrior":{3:{name:"Totem Spirit",count:1,options:["Bear","Eagle","Elk","Wolf","Tiger"]},6:{name:"Aspect of the Beast",count:1,options:["Bear","Eagle","Elk",{name:"Tiger",options:["athletics","acrobatics","stealth","survival"],choose:2,type:"proficiency"},"Wolf"]},14:{name:"Totemic Attunement",count:1,options:["Bear","Eagle","Elk","Tiger","Wolf"]}}}},bard:{subclasses:{"College of Swords":{3:{name:"Fighting Style",count:1,type:"fs:b"}}}},paladin:{class:{2:{name:"Fighting Style",type:"fs:p",count:1}}},sorcerer:{class:{3:{name:"Metamagic",type:"mm",count:2},10:{name:"Metamagic",type:"mm",count:1},17:{name:"Metamagic",type:"mm",count:1}},subclasses:{"Divine Soul":{1:[{name:"Divine Magic Affinity",options:["Good (Cure Wounds)","Evil (Inflict Wounds)","Law (Bless)","Chaos (Bane)","Neutrality (Protection From Good and Evil"],count:1}]}}}};var r=s(105),d=(s(75),s(74),s(107)),h=s(37);class u extends(Object(a.a)(i.a)){static get properties(){return{levels:{type:Array,value:[]},classes:{type:Object},subclasses:{type:Object,value:void 0},heightByRows:{type:Boolean,value:()=>window.innerWidth<900},noContentMessage:{type:Boolean,value:!1},isEditMode:{type:Boolean,value:!1}}}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(l.E)()),Object(l.m)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode,this.$.classGrid.notifyResize()},Object(d.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(d.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(l.m)().removeEventListener("character-selected",this.characterChangeHandler),Object(d.b)().removeEventListener("editModeChange",this.editModeHandler)}ready(){super.ready();const e=new r.a;setTimeout(()=>{const t=this.$.classGrid;let s;t.rowDetailsRenderer=((t,s,i)=>{let a=[],l=this._getClassLevelFeatures(this.levels,i.index,this.classes,this.subclasses);if(l&&l.length){t.firstElementChild||(t.innerHTML='<div class="details" id="stats"></div>');for(let t of l)e.recursiveEntryRender(t,a,0,void 0,!0);const s=t.querySelector(".details");Object(o.jqEmpty)(s),s.innerHTML=a.join("")}}).bind(this),t.addEventListener("grid-dragstart",(function(e){s=e.detail.draggedItems[0],t.dropMode="between"})),t.addEventListener("grid-dragend",(function(e){s=t.dropMode=null})),t.addEventListener("grid-drop",(function(e){const i=e.detail.dropTargetItem;if(s&&s!==i){const a=t.items.filter((function(e){return e!==s})),n=a.indexOf(i)+("below"===e.detail.dropLocation?1:0);a.splice(n,0,s),Object(l.W)(a)}}))},0)}async updateFromCharacter(e){if(e&&e.levels&&e.levels.length){this.noContentMessage=!1,this.character=e,this.classes=await Object(l.r)(e),this.subclasses=JSON.parse(JSON.stringify(e.subclasses)),this.classChoices=await this._findLevelChoices(e,this.classes),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0})),this.levels=e.levels;const t=[];for(let s=0;s<e.levels.length;s++)t.push(await Object(l.x)(s));this.hitDiceMaxes=t,this.$.classGrid.clearCache()}else this.noContentMessage=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0})),this.$.classGrid.clearCache()}_getClassLevelFeatures(e,t,s,i){if(s&&e[t]&&i){const a=e[t].name,l=s[a];if(l){const s=l.classFeatures;let n=-1,c=-1;if(e.length>=t+1){for(let i=0;i<=t;i++)if(e[i].name===a){n++;const e=s[n];if(e){e.find(e=>e.gainSubclassFeature)&&c++}}const r=s[n];if(r){if(r.some(e=>e.gainSubclassFeature)&&i&&i[a]&&l.subclasses&&l.subclasses.length){const e=l.subclasses.find(e=>i[a].name===e.name);if(e.subclassFeatures[c])return e.subclassFeatures[c].map(e=>(e.isSubclass=!0,e)),[...r].concat(e.subclassFeatures[c])}return r.filter(e=>{const t=Object(o.getEntryName)(e);return"Proficiency Versatility"!==t&&"Martial Versatility"!==t})}}}}}_getClassLevelFeatureStringArray(e,t,s,i){if(e&&void 0!==t&&s&&i){const a=this._getClassLevelFeatures(e,t,s,i);if(a)return a.map(e=>({name:Object(o.getEntryName)(e),isSubclass:e.isSubclass}))}}_level(e){return e+1}_deleteLevel(e){let t=e.model.__data.index;this.levels.splice(t,1),Object(l.W)(this.levels)}_expandDetails(e){let t=e.model.__data.item,s=this.$.classGrid.detailsOpenedItems.indexOf(t)>-1;for(let e of this.$.classGrid.detailsOpenedItems)this.$.classGrid.closeItemDetails(e);s?this.$.classGrid.closeItemDetails(t):this.$.classGrid.openItemDetails(t),this.$.classGrid.notifyResize()}async _findLevelChoices(e,t){const s=[];if(e&&e.levels&&e.levels.length)for(let i=0;i<e.levels.length;i++)s.push(await this._findChoices(e,t,i));return s}async _findChoices(e,t,s){if(t&&e.levels&&e.levels.length&&e.levels.length>s){let i=e.levels,a=e.subclasses,n=i[s].name,o=t[n];if(o){let r=[],d=0,u=Object(l.I)(o);for(let e=0;e<=s;e++){i[e].name===n&&d++}void 0!==u&&d===u&&r.push({id:"subclass",from:o.subclasses,selections:e.subclasses[n]});let p=this._getClassLevelFeatures(i,s,t,a);if(p&&p.length&&p.find(e=>"Ability Score Improvement"===e.name)&&r.push({id:"asi"}),0===s){const t=o.startingProficiencies.skills[0].choose;r.push({id:"profs",count:t.count,from:t.from,selections:e.classSkillProficiencies})}if(d){const e=c[n.toLowerCase()];if(e&&e.class&&e.class[d]){const t=[].concat(e.class[d]);for(const e of t)if(e.options)r.push({id:"classFeature",name:e.name,from:e.options,count:e.count>1?e.count:void 0,class:n.toLowerCase(),feature:e.name,level:d,selections:Object(l.p)(n.toLowerCase(),d,e.name)});else if(e.type){const t=await Object(h.a)("features",e.type);r.push({id:"classFeature",name:e.name,from:t,count:e.count>1?e.count:void 0,class:n.toLowerCase(),feature:e.name,level:d,selections:Object(l.p)(n.toLowerCase(),d,e.name)})}}if(e&&e.subclasses&&a[n]&&e.subclasses[a[n].name]&&e.subclasses[a[n].name][d]){const t=[].concat(e.subclasses[a[n].name][d]);for(const e of t)if(e.options)r.push({id:"subclassFeature",name:e.name,from:e.options,count:e.count>1?e.count:void 0,class:n.toLowerCase(),subclass:a[n],feature:e.name,level:d,selections:Object(l.H)(n.toLowerCase(),a[n].name.toLowerCase(),d,e.name)});else if(e.type){const t=await Object(h.a)("features",e.type);r.push({id:"subclassFeature",name:e.name,from:t,count:e.count>1?e.count:void 0,class:n.toLowerCase(),subclass:a[n],feature:e.name,level:d,selections:Object(l.H)(n.toLowerCase(),a[n].name.toLowerCase(),d,e.name)})}}}return r}}return[]}_equal(e,t){return e===t}_genSubclassCallback(e){return t=>{Object(l.N)(void 0,e.name,t)}}_genSubclassOptions(e){return this.classes[e.name].subclasses}_getSubclassSelection(e,t){return t[e.name]}_classFeatureOptionAddCallback(e,t,s){return i=>{let a;a=Array.isArray(i)?i.map(e=>e.name?{name:e.name,source:e.source}:e):i.name?{name:i.name,source:i.source}:i,Object(l.V)(e,t,s,a)}}_subclassFeatureOptionAddCallback(e,t,s,i){return a=>{let n;n=Array.isArray(a)?a.map(e=>e.name?{...e}:e):a.name?{...a}:a,Object(l.db)(e,t.name.toLowerCase(),s,i,n)}}_indexOfLevel(e,t){return t.indexOf(e)}_isMobile(){return window.innerWidth<921}_objArray(e){return Object.values(e)}_atIndex(e,t){return e?e[t]:null}_svgFromClass(e){return e?e.replace(/(\s|\(|\))/g,""):""}_addClassLevel(e){Object(l.M)(void 0,e.model.item,"classes")}_classSkillAddCallback(e){Object(l.X)(e)}_levelHp(e,t){return Object(l.y)(e,t+1)}_editModeClass(e){return e?"edit-mode":"not-edit-mode"}_toggleHpField(e){const t=e.target.closest(".btn-field"),s=t.classList.contains("btn-field--open"),i=t.querySelector("vaadin-integer-field"),a=parseInt(t.dataset.level)+1,n=t.dataset.className,o=parseInt(t.dataset.max);if(s){const e=parseInt(i.value);e&&e<=o&&e>0?(Object(l.ab)(n,a,e),i.value="",t.classList.toggle("btn-field--open")):(t.classList.add("btn-field--error"),setTimeout(()=>{t.classList.remove("btn-field--error")},500))}else t.classList.toggle("btn-field--open"),i.focus()}_levelHitDice(e,t){if(t&&void 0!==e&&t[e])return t[e]}static get template(){return i.b`
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
          margin: 0;
          padding: 8px 0;
          width: 100%;
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
        }
        .choices-col__choice {
          margin-right: 16px;
        }
        .choices-col__subclass-choice {
          display: block;
        }

        .delete-col {
          position: absolute;
          right: -8px;
          top: 4px;
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
          right: 22px;
          top: 8px;
        }
        .not-edit-mode .hp-col {
          right: 0px;
        }
        .hp-col .material-icons {
          font-size: 16px;
          position: relative;
          top: 1px;
          margin-right: 2px;
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
          <dnd-select-add model="classes" placeholder="Add a Class"></dnd-select-add>
        </div>
        <div class="button-wrap">
          <template is="dom-repeat" items="[[_objArray(classes)]]">
            <dnd-button icon="add" label="[[item.name]]" on-click="_addClassLevel"></dnd-button>
          </template>
        </div>

        <div class="no-content-message" hidden$="[[!noContentMessage]]">Enter edit mode to add classes and levels.</div>

        <vaadin-grid id="classGrid" items=[[levels]] theme="no-border" height-by-rows$="[[heightByRows]]">
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
                  <div class="hp-col__non-edit"><span class="material-icons" aria-hidden="true">favorite</span> [[_levelHp(item.name, index)]]</div>

                  <div class="hp-col__edit btn-field" data-max$="[[_levelHitDice(index, hitDiceMaxes)]]" data-level$="[[index]]" data-class-name$="[[item.name]]">
                    <dnd-button background="none" class="btn-field__btn" on-click="_toggleHpField">
                      <span class="btn-field__btn-label" slot="label"><span class="material-icons" aria-hidden="true">favorite</span><span class="btn-field__btn-label-text">[[_levelHp(item.name, index)]]</span></span>
                    </dnd-button>
                    <vaadin-integer-field class="btn-field__input" min="1" max="[[_levelHitDice(index, hitDiceMaxes)]]" ></vaadin-integer-field>
                  </div>
                </div>

                <div class="delete-col">
                  <button class="mdc-icon-button material-icons delete-btn" on-click="_deleteLevel">close</button>
                </div>
              </div>
            </template>
          </vaadin-grid-column>
        </vaadin-grid>
      </div>
    `}}customElements.define("dnd-character-builder-class",u)}}]);
//# sourceMappingURL=5.bundle.js.map