(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{106:function(e,t,s){"use strict";var n=s(7),r=(s(74),s(145)),i=s(142),a=s(38),l=(s(62),s(70),s(76),s(12));class o extends n.a{static get properties(){return{columns:{type:Array},data:{type:Array,observer:"_dataChange"},view:{type:String}}}connectedCallback(){super.connectedCallback(),new r.a(this.shadowRoot.querySelector(".mdc-text-field")),new i.a(this.shadowRoot.querySelector(".mdc-notched-outline")),this.viewChangeHandler=e=>{e&&e.detail&&(this.view=e.detail.view)},Object(l.e)().addEventListener("view-change",this.viewChangeHandler),this.view=Object(l.d)()}disconnectedCallback(){super.disconnectedCallback(),Object(l.e)().removeEventListener("view-change",this.viewChangeHandler)}_dataChange(){this.data&&(Object(a.a)(this.data,this.shadowRoot,this.columns),this._setSelectionListeners())}_setSelectionListeners(){const e=this.shadowRoot.querySelectorAll(".history-link");for(let t of e)t.addEventListener("click",e=>{const t=e.target.closest(".history-link").getAttribute("data-link");Object(l.f)(t)})}_columnHeaderCssClass(e,t){return`sort ${e||""} ${t||""}`}static get template(){return n.b`
      <style include="material-styles my-styles"></style>

      <div id="listcontainer">
        <div id="filter-search-input-group" class="filter-group">
          <div class="mdc-text-field mdc-text-field--outlined mdc-text-field--with-leading-icon">
            <i class="material-icons mdc-text-field__icon mdc-theme--primary">search</i>
            <input type="search" id="search-field" class="mdc-text-field__input search" />
            <div class="mdc-notched-outline">
              <div class="mdc-notched-outline__leading"></div>
              <div class="mdc-notched-outline__notch">
                <label for="search-field" class="mdc-floating-label">Search</label>
              </div>
              <div class="mdc-notched-outline__trailing"></div>
            </div>
          </div>
          <div class="filter-group--buttons">
            <button class="mdc-button mdc-button--raised" id="reset">
              <span class="mdc-button__label">Reset</span>
            </button>
          </div>
        </div>

        <div class="table-wrap mdc-elevation--z6">
          <div class="table--scroll" view$="[[view]]">
            <table class="table">
              <thead>
                <tr class="table-row table-row--header">
                  <template is="dom-repeat" items="[[columns]]">
                    <th class$="[[_columnHeaderCssClass(item.id, item.cssClass)]]" data-sort$="[[item.id]]">
                      <div class="table-cell">[[item.label]]</div>
                    </th>
                  </template>
                </tr>
              </thead>
              <tbody class="list"></tbody>
            </table>
          </div>
        </div>
      </div>
    `}}customElements.define("dnd-list",o);var c=s(1);class d extends n.a{static get properties(){return{modelId:{type:String,observer:"_modelChange"},selectedItem:{type:Object},loading:{type:Boolean,value:!1,observer:"_loadingChange"},_modelsRenderSelection:{type:Function},characterOption:{type:Boolean,value:!1}}}static get observers(){return["__renderSelection(_modelsRenderSelection, selectedItem)"]}_loadingChange(){this.dispatchEvent(new CustomEvent("loading-render",{bubbles:!0,composed:!0,detail:{loading:this.loading}}))}__renderSelection(){this._modelsRenderSelection&&this.selectedItem&&(this._modelsRenderSelection(this.selectedItem,this.shadowRoot),Object(c.initCollapseToggles)(this.shadowRoot))}_modelChange(){this.modelId&&(this.loading=!0,this.set("_modelsRenderSelection",void 0),s(130)(`./${this.modelId}.js`).then(e=>{"function"==typeof e.renderSelection?(this._modelsRenderSelection=e.renderSelection,this.loading=!1):console.error("Model module is missing the renderSelection export.")}).catch(e=>{console.error("Model module failed to load.",e)}))}_exists(e){return!!e}_mainClass(){return this.selectedItem?"main item-opened":"main"}clearSelection(){Object(l.a)(!0)}static get template(){return n.b`
      <style include="material-styles my-styles">
        :host {
          display: block;
        }

        .main {
          max-width: 100vw;
        }
        .main.item-opened .class-container {
          display: none;
        }
        .main:not(.item-opened) .class-page--class-container {
          display: none;
        }
        .main.item-opened #listcontainer {
          display: none;
        }
        .main.item-opened .close-item {
          display: block;
        }
        .main.item-opened .rules-wrapper {
          display: none;
        }
        .main:not(.item-opened) #rulescontent {
          display: none;
        }
        .main:not(.item-opened) .selection-wrapper {
          display: none;
        }
        .close-item {
          position: absolute;
          height: 64px;
          width: 64px;
          font-size: 44px;
          display: none;
          right: 0;
          top: -4px;
          z-index: 12;
        }
      </style>

      <div class$="[[_mainClass(selectedItem)]]">
        <button class="mdc-icon-button close-item material-icons" on-click="clearSelection">close</button>
        <div class="selection-wrapper"></div>
      </div>
    `}}customElements.define("dnd-selected-item",d);var p=s(37);class u extends n.a{static get properties(){return{modelId:{type:String,observer:"_modelChange"},columns:{type:Array},enableHashRouting:{type:Boolean,value:!1,reflectToAttribute:!0},disableScrollBack:{type:Boolean,reflectToAttribute:!0,value:!1},hasSelection:{type:Boolean,reflectToAttribute:!0,value:!1},_data:{type:Array},_selectedItem:{type:Object},_selectedHash:{type:String},loading:{type:Boolean,value:!0,observer:"_loadingChange"},characterOption:{type:Boolean,value:!1}}}_loadingChange(){this.dispatchEvent(new CustomEvent("loading-data",{bubbles:!0,composed:!0,detail:{loading:this.loading}}))}connectedCallback(){super.connectedCallback(),this.selectionEventHandler=e=>{this._checkHashForSelection(e.detail.selection)},this.deselectionEventHandler=()=>{this._selectedItem=void 0,this.hasSelection=!1},this._checkHashForSelection(),Object(l.e)().addEventListener("selection-change",this.selectionEventHandler),Object(l.e)().addEventListener("selection-deselected",this.deselectionEventHandler),Object(l.e)().addEventListener("view-change",this.deselectionEventHandler)}disconnectedCallback(){super.disconnectedCallback(),Object(l.e)().removeEventListener("selection-change",this.selectionEventHandler),Object(l.e)().removeEventListener("selection-deselected",this.deselectionEventHandler)}_modelChange(){this.modelId&&(this.set("_data",void 0),this.loading=!0,Object(p.b)(this.modelId).then(e=>{this.set("_data",e),this._checkHashForSelection(),this.loading=!1}).catch(e=>{console.error("Model requested for list did not return.",e)}))}_checkHashForSelection(e){let t=e;if(t||(t=Object(l.c)()),t&&this.enableHashRouting&&Array.isArray(this._data)){const e=Object(a.b)(this._data,t);e?(this.set("_selectedItem",e),this.hasSelection=!0,this.disableScrollBack||window.scrollTo(0,0),this.dispatchEvent(new CustomEvent("title-change",{bubbles:!0,composed:!0,detail:{title:e.name}}))):Object(l.a)(!0)}}static get template(){return n.b`
      <style>
        :host([has-selection]) dnd-list {
          display: none;
        }
        @media(min-width: 921px) {
          dnd-list {
            display: block !important;
          }
        }
      </style>
      <dnd-selected-item model-id="[[modelId]]" selected-item="[[_selectedItem]]" character-option="[[characterOption]]"></dnd-selected-item>
      <dnd-list data="[[_data]]" columns="[[columns]]"></dnd-list>
    `}}customElements.define("dnd-selection-list",u)},111:function(e,t,s){"use strict";s.r(t),s.d(t,"onLoad",(function(){return l}));var n=s(1),r=s(145),i=s(142),a=s(64);function l(e){let t=e.querySelector("div#output"),s=0,l=-1,o=new r.a(e.querySelector(".mdc-text-field"));new i.a(e.querySelector(".mdc-notched-outline")),o.useNativeValidation=!1;let c=r=>{let i=a.a.roll(r.replace(/\s/g,""));if(i){let a=Object(n.parseHTML)(`<div>\n        <em><a class='roll' data-roll='${r}'>${r}</a></em> rolled for <strong>${i.total}</strong>${i.rolls.length>1?`<br>(${i.rolls.join(", ")})`:""}\n        </div>`);Object(n.jqPrepend)(t,a),t.style.display=null,p(a),s+=i.total,e.querySelector("#total").innerHTML=s,e.querySelector(".roll-total-wrap").style.display=null,e.querySelector(".roll-clear").style.display=null,o.value=""}else e.querySelector(".dice-field-container .mdc-text-field").classList.add("error")};e.querySelector(".roll-clear").addEventListener("click",n=>{n.preventDefault(),l=-1,t.innerHTML="",e.querySelector(".roll-total-wrap").style.display="none",e.querySelector(".roll-clear").style.display="none",s=0}),e.querySelector(".roll-submit").addEventListener("click",t=>{t.preventDefault(),l=-1,e.querySelector(".dice-field-container .mdc-text-field").classList.remove("error");let s=e.querySelector(".roll-field").value;s?c(s):e.querySelector(".dice-field-container .mdc-text-field").classList.add("error"),e.querySelector(".roll-field").focus()}),e.querySelector(".roll-field").addEventListener("keydown",t=>{let s=t.keyCode||t.which,n=e.querySelectorAll("#output > div").length;38===s?(t.preventDefault(),l+1<n&&(l++,o.value=e.querySelector(`#output div:eq(${l}) a.roll`).getAttribute("data-roll"))):40===s?(t.preventDefault(),l-1>-1&&(l--,o.value=e.querySelector(`#output div:eq(${l}) a.roll`).getAttribute("data-roll"))):13===s?(t.preventDefault(),e.querySelector(".roll-submit").click()):190===s||188===s?(t.preventDefault(),o.value=o.value+"d"):32!==s&&189!==s&&187!==s||(t.preventDefault(),o.value=o.value+" + ")}),e.querySelector(".roll-field").addEventListener("submit",t=>{t.preventDefault(),e.querySelector(".roll-submit").click()}),e.querySelector(".roll-field").addEventListener("textInput",e=>{var t=e.originalEvent.data;!t||"."!==t&&","!==t?!t||" "!==t&&"+"!==t||(e.preventDefault(),o.value=o.value+"+"):(e.preventDefault(),o.value=o.value+"d")}),e.querySelector(".roll-field").addEventListener("focus",t=>{e.querySelector(".dice-field-label").style.display=null}),e.querySelector(".roll-field").addEventListener("blur",t=>{e.querySelector(".dice-field-label").style.display="none"});let d=e.querySelectorAll(".roll[data-roll]");for(let e of d)p(e);function p(e){e.addEventListener("click",e=>{e.preventDefault();let t=e.target.closest(".roll").getAttribute("data-roll");t&&c(t)})}}},112:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return l}));var n=s(105),r=s(5),i=s(1);const a=new n.a;function l(e,t,s){(t.querySelector(".selection-wrapper")||t).innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="margin-bottom_small">\n\t\t\t<span class="type"></span><span class="rarity"></span>\n\t\t\t<span class="attunement"></span>\n\t\t</div>\n\t\t<div class="margin-bottom_small">\n\t\t\t<span class="value"></span><span class="weight"></span>\n\t\t</div>\n\t\t<div class="margin-bottom_small">\n\t\t\t<span class="damage"></span>\n\t\t\t<span class="damageType"></span>\n\t\t\t<span class="properties"></span>\n\t\t</div>\n\t\t<div class="text"></div>\n\t\t<div class="margin-bottom_small">Source: <span class="source"></span></div>\n\t</div>';const n=e.source,l=r.a.sourceJsonToFull(n);t.querySelector(".stats-wrapper .source").innerHTML=`${l}, page ${e.page}`,t.querySelector(".stats-wrapper .value").innerHTML=e.value?e.value+(e.weight?", ":""):"",t.querySelector(".stats-wrapper .weight").innerHTML=e.weight?e.weight+(1==e.weight?" lb.":" lbs."):"",t.querySelector(".stats-wrapper .rarity").innerHTML=(e.tier?", "+e.tier:"")+(e.rarity?", "+e.rarity:""),t.querySelector(".stats-wrapper .attunement").innerHTML=e.reqAttune?e.reqAttune:"",t.querySelector(".stats-wrapper .type").innerHTML=e.typeText,t.querySelector(".stats-wrapper .damage").innerHTML="",t.querySelector(".stats-wrapper .damageType").innerHTML="";const o=e.type||"";if(e.weaponCategory)e.dmg1&&(t.querySelector(".stats-wrapper .damage").innerHTML=Object(i.utils_makeRoller)(e.dmg1)),e.dmgType&&(t.querySelector(".stats-wrapper .damageType").innerHTML=r.a.dmgTypeToFull(e.dmgType));else if("LA"===o||"MA"===o||"HA"===o)t.querySelector(".stats-wrapper .damage").innerHTML="AC "+e.ac+("LA"===o?" + Dex":"MA"===o?" + Dex (max 2)":"");else if("S"===o)t.querySelector(".stats-wrapper .damage").innerHTML="AC +"+e.ac;else if("MNT"===o||"VEH"===o){const s=e.speed,n=e.carryingcapacity;s&&t.querySelector(".stats-wrapper .damage").append("Speed="+s),s&&n&&t.querySelector(".stats-wrapper .damage").append("MNT"===o?", ":"<br>"),n&&(t.querySelector(".stats-wrapper .damage").append("Carrying Capacity="+n),-1===n.indexOf("ton")&&-1===n.indexOf("passenger")&&t.querySelector(".stats-wrapper .damage").append(1==n?" lb.":" lbs."))}if(t.querySelector(".stats-wrapper .properties").innerHTML="",e.property){const s=e.property.split(",");for(let n=0;n<s.length;n++){const r=s[n];let a=window.itemPropertyList[r].name;"V"===r&&(a=`${a} (${Object(i.utils_makeRoller)(e.dmg2)})`),"T"!==r&&"A"!==r&&"AF"!==r||(a=`${a} (${e.range}ft.)`),"RLD"===r&&(a=`${a} (${e.reload} shots)`),a=(n>0?", ":e.dmg1?"- ":"")+a,t.querySelector(".stats-wrapper .properties").append(a)}}const c={type:"entries",entries:e.entries},d=[];a.recursiveEntryRender(c,d,1),t.querySelector(".stats-wrapper .text").innerHTML=Object(i.utils_makeRoller)(d.join("")).split(e.name.toLowerCase()).join("<i>"+e.name.toLowerCase()+"</i>"),s&&t.querySelector(".margin-bottom_small").remove()}},113:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return a})),s.d(t,"spellHtml",(function(){return l}));var n=s(105),r=s(5);const i=new n.a;function a(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t</div>';const s=l(e);t.querySelector(".stats-wrapper").innerHTML=s}function l(e){const t=[];if(t.push(`<div class="margin-bottom_med"><span class="stats-source source${e.source}" title="${r.a.sourceJsonToFull(e.source)}">${r.a.sourceJsonToAbv(e.source)}</div>`),t.push(`<div class="margin-bottom_med"><span>${r.a.spLevelSchoolMetaToFull(e.level,e.school,e.meta)}</span></div>`),t.push(`<div class="margin-bottom_med"><span class="stat-name">Casting Time: </span>${r.a.spTimeListToFull(e.time)}</div>`),t.push(`<div class="margin-bottom_med"><span class="stat-name">Range: </span>${r.a.spRangeToFull(e.range)}</div>`),t.push(`<div class="margin-bottom_med"><span class="stat-name">Components: </span>${r.a.spComponentsToFull(e.components)}</div>`),t.push(`<div class="margin-bottom_med"><span class="stat-name">Duration: </span>${r.a.spDurationToFull(e.duration)}</div>`),t.push("<div class='text'>"),i.recursiveEntryRender({type:"entries",entries:e.entries},t,1),e.entriesHigherLevel){const s={type:"entries",entries:e.entriesHigherLevel};i.recursiveEntryRender(s,t,2)}if(t.push("</div>"),t.push(`<div class="margin-bottom_med"><span class="stat-name">Classes: </span>${r.a.spMainClassesToFull(e.classes)}</div>`),e.classes.fromSubclass){const s=r.a.spSubclassesToCurrentAndLegacyFull(e.classes);t.push(`<div class="margin-bottom_med"><span class="stat-name">Subclasses: </span>${s[0]}</div>`),s[1]&&t.push(`<div class="mdc-theme--text-disabled-on-background margin-bottom_med"><span class="stat-name">Subclasses (legacy): </span>${s[1]}</div>`)}return e.scrollNote&&(t.push('<div class="mdc-theme--text-disabled-on-background">'),i.recursiveEntryRender("{@italic Note: Both the {@class Fighter (Eldritch Knight)} and the {@class Rogue (Arcane Trickster)} spell lists include all {@class Wizard} spells. Spells of 5th level or higher may be cast with the aid of a spell scroll or similar.}",t,2),t.push("</div>")),t.join("")}},130:function(e,t,s){var n={"./backgrounds.js":131,"./bestiary.js":132,"./classes.js":127,"./conditions.js":133,"./cults.js":134,"./dice.js":111,"./feats.js":135,"./features.js":136,"./items.js":112,"./psionics.js":137,"./races.js":138,"./rewards.js":139,"./spells.js":113,"./utils.js":1,"./variantrules.js":140};function r(e){return i(e).then(s)}function i(e){return Promise.resolve().then((function(){if(!s.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}))}r.keys=function(){return Object.keys(n)},r.resolve=i,r.id=130,e.exports=r},131:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return a}));var n=s(1),r=s(5);const i=new(s(105).a);function a(e,t,s){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="source margin-bottom_small"></div>\n\t\t<div class="stats margin-bottom_small"></div>\n\t\t<div class="table-container collapse collapse--left-arrow disabled">\n\t\t\t<div class="collapse-toggle">\n\t\t\t\t<div class="mdc-list-item stat-name">Suggested Characteristics</div>\n\t\t\t</div>\n\t\t\t<div class="collapse-wrapper">\n\t\t\t\t<div class="collapse-list"></div>\n\t\t\t</div>\n\t\t</div>\n\t</div>';const a=e.source,l=r.a.sourceJsonToAbv(a),o=r.a.sourceJsonToFull(a),c=t.querySelector(".stats-wrapper .source");c.classList.add("source"+l),c.setAttribute("title",o),c.innerHTML=l;const d=e.entries;if(d.length)for(let e=d.length-1;e>=0;e--){let s=d[e],r=[];i.recursiveEntryRender(s,r,0);let a=r.join(" ");if("Suggested Characteristics"===s.name){t.querySelector(".stats-wrapper .table-container").classList.remove("disabled");const e=t.querySelector(".stats-wrapper .table-container .collapse-list"),s=Object(n.parseHTML)(a);s.querySelector(".stat-name").remove(),Object(n.jqPrepend)(e,s)}else{const e=t.querySelector(".stats-wrapper .stats");Object(n.jqPrepend)(e,Object(n.parseHTML)(a))}}window.setTimeout(()=>{let e=t.querySelector(".stats-wrapper .table-container .collapse-list");e.style["margin-top"]="-"+Object(n.jqHeight)(e)+"px"},0)}},132:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return p}));var n=s(1),r=s(105),i=s(5),a=s(64);function l(e){return o[e]?o[e]:0}const o={0:2,"1/8":2,"1/4":2,"1/2":2,1:2,2:2,3:2,4:2,5:3,6:3,7:3,8:3,9:4,10:4,11:4,12:4,13:5,14:5,15:5,16:5,17:6,18:6,19:6,20:6,21:7,22:7,23:7,24:7,25:8,26:8,27:8,28:8,29:9,30:9},c={athletics:"dex",acrobatics:"dex","sleight of hand":"dex",stealth:"dex",arcana:"int",history:"int",investigation:"int",nature:"int",religion:"int","animal handling":"wis",insight:"wis",medicine:"wis",perception:"wis",survival:"wis",deception:"cha",intimidation:"cha",performance:"cha",persuasion:"cha"};const d=new r.a;function p(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="margin-bottom_large stats-wrapper">\n\t\t<div id="stats" class="monster">\n\t\t\t<div id="name">\n\t\t\t\tName <span class="source" title="Source book">SRC</span>\n\t\t\t</div>\n\t\t\t<div id="sizetypealignment">\n\t\t\t\t<span id="size">Size</span> <span id="type">type</span>, <span id="alignment">alignment</span>\n\t\t\t</div>\n\t\t\t<div class="divider"></div>\n\t\t\t<div>\n\t\t\t\t<strong>Armor Class</strong> <span id="ac">## (source)</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Hit Points</strong> <span id="hp">hp</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Speed</strong> <span id="speed">30 ft.</span>\n\t\t\t</div>\n\t\t\t<div id="abilitynames">\n\t\t\t\t<div>STR</div>\n\t\t\t\t<div>DEX</div>\n\t\t\t\t<div>CON</div>\n\t\t\t\t<div>INT</div>\n\t\t\t\t<div>WIS</div>\n\t\t\t\t<div>CHA</div>\n\t\t\t</div>\n\t\t\t<div id="abilityscores">\n\t\t\t\t<div id="str"><span class="score">10</span> (<span class="mod">0</span>)</div>\n\t\t\t\t<div id="dex"><span class="score">10</span> (<span class="mod">0</span>)</div>\n\t\t\t\t<div id="con"><span class="score">10</span> (<span class="mod">0</span>)</div>\n\t\t\t\t<div id="int"><span class="score">10</span> (<span class="mod">0</span>)</div>\n\t\t\t\t<div id="wis"><span class="score">10</span> (<span class="mod">0</span>)</div>\n\t\t\t\t<div id="cha"><span class="score">10</span> (<span class="mod">0</span>)</div>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Saving Throws</strong> <span id="saves">Str +0</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Skills</strong> <span id="skills">Perception +0</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Damage Vulnerabilities</strong> <span id="dmgvuln">fire</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Damage Resistances</strong> <span id="dmgres">cold</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Damage Immunities</strong> <span id="dmgimm">lightning</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Condition Immunities</strong> <span id="conimm">exhaustion</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Senses</strong> <span id="senses">darkvision 30 ft.</span> passive Perception <span id="pp">10</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Languages</strong> <span id="languages">Common</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Challenge</strong> <span id="cr">1</span> (<span id="xp">450</span> XP)\n\t\t\t</div>\n\t\t\t<div id="traits">\n\t\t\t</div>\n\t\t\t<div id="actions">\n\t\t\t\t<span>Actions</span>\n\t\t\t</div>\n\t\t\t<div id="reactions">\n\t\t\t\t<span>Reactions</span>\n\t\t\t</div>\n\t\t\t<div id="legendaries">\n\t\t\t\t<span>Legendary Actions</span>\n\t\t\t</div>\n\t\t\t<div id="lairactions">\n\t\t\t\t<span>Lair Actions</span>\n\t\t\t</div>\n\t\t\t<div id="regionaleffects">\n\t\t\t\t<span>Regional Effects</span>\n\t\t\t</div>\n\t\t</div>\n\t\t<div id="output"></div>\n\t</div>';let s=[],r={};var o=e.name;window.monsterName=o;var p=e.source,u=e._pTypes.asText;p=i.a.sourceJsonToAbv(p),t.querySelector("#name").innerHTML=`<span class="stats-source source${p}" title="${i.a.sourceJsonToFull(p)}">${i.a.sourceJsonToAbv(p)}</span>`,t.querySelector("#size").innerHTML=i.a.sizeAbvToFull(e.size),t.querySelector("#type").innerHTML=u,t.querySelector("#alignment").innerHTML=e.alignment,t.querySelector("#ac").innerHTML=e.ac,t.querySelector("#hp").innerHTML=e.hp,t.querySelector("#speed").innerHTML=e.speed,t.querySelector("#str span.score").innerHTML=e.str,t.querySelector("#str span.mod").innerHTML=i.a.getAbilityModifier(e.str),t.querySelector("#dex span.score").innerHTML=e.dex,t.querySelector("#dex span.mod").innerHTML=i.a.getAbilityModifier(e.dex),t.querySelector("#con span.score").innerHTML=e.con,t.querySelector("#con span.mod").innerHTML=i.a.getAbilityModifier(e.con),t.querySelector("#int span.score").innerHTML=e.int,t.querySelector("#int span.mod").innerHTML=i.a.getAbilityModifier(e.int),t.querySelector("#wis span.score").innerHTML=e.wis,t.querySelector("#wis span.mod").innerHTML=i.a.getAbilityModifier(e.wis),t.querySelector("#cha span.score").innerHTML=e.cha,t.querySelector("#cha span.mod").innerHTML=i.a.getAbilityModifier(e.cha);var m=e.save;m?(t.querySelector("#saves").parentElement.style.display="block",t.querySelector("#saves").innerHTML=m):t.querySelector("#saves").parentElement.style.display="none";var v=e.skill;let y=0;var g;v?(t.querySelector("#skills").parentElement.style.display="block",t.querySelector("#skills").innerHTML=(g=v,Object.keys(g).map((function(e){return e.uppercaseFirst()+" "+g[e]})).join(", ")),v.perception&&(y=parseInt(v.perception))):t.querySelector("#skills").parentElement.style.display="none";var b=e.vulnerable;b?(t.querySelector("#dmgvuln").parentElement.style.display="block",t.querySelector("#dmgvuln").innerHTML=b):t.querySelector("#dmgvuln").parentElement.style.display="none";var f=e.resist;f?(t.querySelector("#dmgres").parentElement.style.display="block",t.querySelector("#dmgres").innerHTML=f):t.querySelector("#dmgres").parentElement.style.display="none";var h=e.immune;h?(t.querySelector("#dmgimm").parentElement.style.display="block",t.querySelector("#dmgimm").innerHTML=h):t.querySelector("#dmgimm").parentElement.style.display="none";var S=e.conditionImmune;S?(t.querySelector("#conimm").parentElement.style.display="block",t.querySelector("#conimm").innerHTML=S):t.querySelector("#conimm").parentElement.style.display="none";var q=e.senses;t.querySelector("#senses").innerHTML=q?q+", ":"";var T=e.passive||(10+y).toString;t.querySelector("#pp").innerHTML=T;var w=e.languages;t.querySelector("#languages").innerHTML=w||"—";var L=void 0===e.cr?"Unknown":e.cr;t.querySelector("#cr").innerHTML=L,t.querySelector("#xp").innerHTML=i.a.crToXp(L);var H=e.trait;if(t.querySelector("#traits").style.display="none",H&&H.length>0){t.querySelector("#traits").style.display="block";for(var M=H.length-1;M>=0;M--){for(var _=H[M].name,j=H[M].text,$="",x=0,A=0;A<j.length;A++)if(j[A]){var O="";1===++x&&(O="first "),2===x&&(O="second ");var k="";-1!==_.indexOf("Spellcasting")&&-1!==j[A].indexOf(": ")&&(k="spells"),-1!==_.indexOf("Variant")&&-1!==_.indexOf("Coven")&&-1!==j[A].indexOf(": ")&&(k="spells"),$=$+"<p class='"+O+k+"'>"+j[A].replace(/\u2022\s?(?=C|\d|At\swill)/g,"")+"</p>"}const e=Object(n.parseHTML)("<div class='trait'><div class='trait"+M+"'><span class='name'>"+_+".</span> "+$+"</div></div>");Object(n.jqAfter)(t.querySelector("#traits"),e);const s=t.querySelectorAll(".trait div p.spells");for(let e of s){let t=e.innerHTML;if("*"===t[0])return;t=t.split(": ")[1].split(/\, (?!\+|\dd|appears|inside gems)/g);for(let e=0;e<t.length;e++)t[e]="<a href='#/spells/"+encodeURIComponent(t[e].replace(/(\*)| \(([^\)]+)\)/g,"")).toLowerCase().replace("'","%27")+"_phb'>"+t[e]+"</a>",e!==t.length-1&&(t[e]=t[e]+", ");e.innerHTML=e.innerHTML.split(": ")[0]+": "+t.join("")}}}const C=e.action;if(C&&C.length)for(let e=C.length-1;e>=0;e--){const s=C[e].name,r=C[e].text;let i="",a=0;for(let e=0;e<r.length;e++){if(!r[e])continue;a++;let t="";1===a&&(t="first "),2===a&&(t="second "),i=i+"<p class='"+t+"'>"+r[e]+"</p>"}const l=Object(n.parseHTML)("<div class='action'><div class='action"+e+"'><span class='name'>"+s+".</span> "+i+"</div></div>");Object(n.jqAfter)(t.querySelector("#actions"),l)}const E=e.reaction;if(t.querySelector("#reactions").style.display="none",E&&(E.text||E.length)){if(t.querySelector("#reactions").style.display="block",!E.length){const e=E.name,s=E.text;let r="",i=0;for(let e=0;e<s.length;e++){if(!s[e])continue;i++;let t="";1===i&&(t="first "),2===i&&(t="second "),r=r+"<p class='"+t+"'>"+s[e]+"</p>"}const a=Object(n.parseHTML)("<div class='reaction'><div class='reaction0'><span class='name'>"+e+".</span> "+r+"</div></div>");Object(n.jqAfter)(t.querySelector("#reactions"),a)}if(E.length)for(let e=E.length-1;e>=0;e--){const s=E[e].name,r=E[e].text;let i="<span>"+r+"</span>";for(let e=1;e<r.length;e++)r[e]&&(i=i+"<p>"+r[e]+"</p>");const a=Object(n.parseHTML)("<div class='reaction'><div class='reaction"+e+"'><span class='name'>"+s+".</span> "+i+"</div></div>");Object(n.jqAfter)(t.querySelector("#reactions"),a)}}const R=e.legendary;if(t.querySelector("#legendaries").style.display="none",R){t.querySelector("#legendaries").style.display="block";let s=R.length>0;for(let e=R.length-1;e>=0;e--){const r=R[e].name?R[e].name+".":"",i=R[e].text;let a="",l=0;for(let e=0;e<i.length;e++){if(!i[e])continue;l++;let t="";1===l&&(t="first "),2===l&&(t="second "),a+=`<p class='${t}'>${i[e]}</p>`}const o=Object(n.parseHTML)(`<div class='legendary'><div class='legendary'><span class='name'>${r}</span> ${a}</div></div>`);Object(n.jqAfter)(t.querySelector("#legendaries"),o),(""===r.trim()||r.indexOf("Legendary Actions")>-1)&&(s=!1)}if(s){const s=e.legendaryActions||3,r=o.split(","),i=Object(n.parseHTML)(`<div class='legendary'><div class='legendary'><span class='name'></span> <span>${r[0]} can take ${s} legendary action${s>1?"s":""}, choosing from the options below. Only one legendary action can be used at a time and only at the end of another creature's turn. ${r[0]} regains spent legendary actions at the start of its turn.</span></div></div>`);Object(n.jqAfter)(t.querySelector("#legendaries"),i)}}function F(e,i){t.querySelector(`#${e}s`).style.display="block",r={type:"entries",entries:i},s=[],d.recursiveEntryRender(r,s);const a=Object(n.parseHTML)(`<div class='${e}'><div class='legendary'>${Object(n.utils_makeRoller)(s.join(""))}</div></div>`);Object(n.jqAfter)(t.querySelector(`#${e}s`),a)}function D(e,t,s,n){return`<span class='roller' title="${e} ${n?" save":""}" data-roll-alt="1d20;${s}" data-roll='1d20${t}' mode='bonus' profDiceStr="+${s}" profBonusStr="${t}">${t}</span>`}t.querySelector("#lairactions").style.display="none",t.querySelector("#regionaleffects").style.display="none",e.lairActions&&F("lairaction",e.lairActions),e.regionalEffects&&F("regionaleffect",e.regionalEffects),e.skill&&function(t){const s=t,n=s.innerHTML.split(/,\s*(?![^()]*\))/g).map(e=>e.trim()),r=[];n.map(t=>{const s=t.match(/(\-|\+)?\d+|(?:[^\+]|\n(?!\+))+/g),n=s[0].trim();var a="";s.map(t=>{if(t.match(/(\-|\+)?\d+/)){const r=Number(t),o=i.a.getAbilityModNumber(e[(s=n,c[s.toLowerCase().trim()])]),d=r-o,p=d===2*l(e.cr)?2:1;a+=D(n,"+"+r,`${p}d${d*(3-p)}${o>=0?"+":""}${o}`,!1)}else a+=t;var s}),r.push(a)}),s.innerHTML=r.join(", ")}(t.querySelector("#skills")),e.save&&function(t){const s=t,n=s.innerHTML.split(",").map(e=>e.trim()),r=[];n.map(t=>{const s=t.split("+").map(e=>e.trim()),n=Number(s[1]),a=i.a.getAbilityModNumber(e[s[0].toLowerCase()]),o=n-a,c=o===2*l(e.cr)?2:1,d="+"+n,p=`${c}d${o*(3-c)}${a>=0?"+":""}${a}`;r.push(s[0]+" "+D(s[0],d,p,!0))}),s.innerHTML=r.join(", ")}(t.querySelector("#saves"));const I=t.querySelectorAll("#stats p");for(let t of I){J(t);const s=N(t),n="bonus";t.innerHTML=t.innerHTML.replace(/(\-|\+)?\d+(?= to hit)/g,(function(t){const r=Number(t),i=l(e.cr),a=r-i;if(i>0){const e=`1d${2*i}${a>=0?"+":""}${a}`;return`<span class='roller' ${s?`title="${s}"`:""} data-roll-alt='1d20;${e}' data-roll='1d20${t}' mode='${n}' profDiceStr="+${e}" profBonusStr="${t}">${t}</span>`}return`<span class='roller' data-roll='1d20${t}'>${t}</span>`})),t.innerHTML=t.innerHTML.replace(/DC\s*(\d+)/g,(function(t,r){const i=Number(r),a=l(e.cr);if(a>0){const e=i-a,t=`1d${2*a}${e>=0?"+":""}${e}`;return`DC <span class="dc-roller" ${s?`title="${s}"`:""} mode="${n}" data-roll-alt="${t}" data-bonus="${r}" profDiceStr="+${t}" profBonusStr="${r}">${r}</span>`}return t}))}function J(e){e.innerHTML=e.innerHTML.replace(/\d+d\d+(\s?(\-|\+)\s?\d+\s?)?/g,(function(t){const s=N(e);return`<span class='roller' ${s?`title="${s}"`:""} data-roll='${t}'>${t}</span>`}))}function N(e){let t=e.parentElement.querySelector(".name");return t&&(t=t.innerHTML,t&&(t=t.substring(0,t.length-1).trim())),t}J(t.querySelector("#stats #hp"));let P=t.querySelectorAll("#stats span.roller");for(let e of P)e.addEventListener("click",()=>{const t=e;let s,n;if("dice"===t.getAttribute("mode")){s=t.getAttribute("data-roll-alt").replace(/\s+/g,"");const e=s.split(";");s=s.replace(";","+"),n=a.a.roll(e[0]);const r=a.a.roll(e[1]);n.rolls=n.rolls.concat(r.rolls),n.total+=r.total}else s=t.getAttribute("data-roll").replace(/\s+/g,""),n=a.a.roll(s);B(t,s,n)});let z=t.querySelectorAll("#stats span.roller");for(let e of z){const t=e;let s,n;"dice"===t.getAttribute("mode")&&(s=t.getAttribute("data-roll-alt").replace(/\s+/g,""),n=a.a.roll(s),B(t,s,n))}function B(e,s,r){const i=window.monsterName,a=Object(n.parseHTML)(`<span>${i}: <em>${s}</em> rolled ${e.getAttribute("title")?e.getAttribute("title")+" ":""}for <strong>${r.total}</strong> (<em>${r.rolls.join(", ")}</em>)<br></span>`),l=t.querySelector("#output");Object(n.jqPrepend)(l,a),l.style.display="block",6===l.children.length&&l.children[5].remove()}}},133:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return r}));var n=s(1);function r(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="text"></div>\n\t</div>',t.querySelector(".stats-wrapper .text").innerHTML=Object(n.utils_combineText)(e.entries,"p")}},134:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return r}));var n=s(1);function r(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="text"></div>\n\t</div>';const s=e.text;let r="";void 0!==e.goal&&(r+=Object(n.utils_combineText)(e.goal.text,"p","<span class='stat-name'>Goals:</span> ")),void 0!==e.cultists&&(r+=Object(n.utils_combineText)(e.cultists.text,"p","<span class='stat-name'>Typical Cultist:</span> ")),void 0!==e.signaturespells&&(r+=Object(n.utils_combineText)(e.signaturespells.text,"p","<span class='stat-name'>Signature Spells:</span> ")),r+=Object(n.utils_combineText)(s,"p"),t.querySelector(".stats-wrapper .text").innerHTML=r}},135:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return l}));var n=s(1),r=s(63),i=s(5);const a=new(s(105).a);function l(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="source margin-bottom_small"></div>\n\t\t<div class="prerequisite margin-bottom_small"></div>\n\t\t<div class="text"></div>\n\t</div>';let s=t.querySelector(".stats-wrapper .source");s.classList.add("source"+e.source),s.setAttribute("title",i.a.sourceJsonToFull(e.source)),s.innerHTML=""+i.a.sourceJsonToAbv(e.source);const l=Object(n.utils_makePrerequisite)(e.prerequisite);if(t.querySelector(".stats-wrapper .prerequisite").innerHTML=l?"Prerequisite: "+l:"",e.ability)for(let t of e.entries)"list"!==t.type||t.hasabilityitem||(t.hasabilityitem=!0,t.items.unshift(Object(r.b)(e.ability)));if(e.entries.length){let s=[];for(let t of e.entries)a.recursiveEntryRender(t,s,0);t.querySelector(".stats-wrapper .text").innerHTML=s.join(" ")}}},136:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return l}));var n=s(1),r=s(63),i=s(5);const a=new(s(105).a);function l(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n    <div class="source margin-bottom_small"></div>\n    <div class="type margin-bottom_small"></div>\n\t\t<div class="prerequisite margin-bottom_small"></div>\n\t\t<div class="text"></div>\n\t</div>';let s=t.querySelector(".stats-wrapper .source");s.classList.add("source"+e.source),s.setAttribute("title",i.a.sourceJsonToFull(e.source)),s.innerHTML=""+i.a.sourceJsonToAbv(e.source);let l=e.featureType?Array.isArray(e.featureType)?e.featureType:[e.featureType]:[];t.querySelector(".stats-wrapper .type").innerHTML=Object(n.utils_joinPhraseArray)(l.map(e=>i.a.featureJsonToAbv(e)),", "," and ");const o=Object(n.utils_makePrerequisite)(e.prerequisite);if(t.querySelector(".stats-wrapper .prerequisite").innerHTML=o?"Prerequisite: "+o:"",e.ability)for(let t of e.entries)"list"!==t.type||t.hasabilityitem||(t.hasabilityitem=!0,t.items.unshift(Object(r.b)(e.ability)));if(e.entries.length){let s=[];for(let t of e.entries)a.recursiveEntryRender(t,s,0);t.querySelector(".stats-wrapper .text").innerHTML=s.join(" ")}}},137:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return i}));var n=s(1),r=s(0);function i(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="order margin-bottom_small"></div>\n\t\t<div class="duration margin-bottom_small"></div>\n\t\t<div class="text"></div>\n\t</div>';const s=t.querySelector(".stats-wrapper .order"),i=t.querySelector(".stats-wrapper .duration"),a=t.querySelector(".stats-wrapper .text");"T"===e.type?(s.innerHTML=Object(n.parse_psionicTypeToFull)(e.type),a.innerHTML=Object(n.utils_combineText)(e.text,r.k),i.innerHTML=r.pc):"D"===e.type&&function(){function t(t){const s=Object(n.utils_combineText)(e.modes[t].text,r.k,i(e.modes[t]));if(void 0===e.modes[t].submodes)return s;return`${s}${function(){const s=[],a=e.modes[t].submodes;for(let e=0;e<a.length;++e)s.push(Object(n.utils_combineText)(a[e].text,r.k,i(a[e],!0)));return s.join(r.pc)}()}`;function i(e,t){t=null!=t&&t;const s=[];s.push(e.title);const n=function(){const t=[];e.cost&&t.push(function(){const t=e.cost.min,s=e.cost.max;return(t===s?t:`${t}-${s}`)+" psi"}());e.concentration&&t.push(`conc., ${e.concentration.duration} ${e.concentration.unit}.`);return 0===t.length?null:`(${t.join("; ")})`}();return null!==n&&s.push(n),`<span class='stat-name'>${s.join(" ")}.</span> `}}s.innerHTML=`${e.order} ${Object(n.parse_psionicTypeToFull)(e.type)}`,a.innerHTML=function(){const s=[];for(let n=0;n<e.modes.length;++n)s.push(t(n));return`<p>${e.description}</p><p><span class='stat-name'>Psycic Focus.</span> ${e.focus}</p>${s.join(r.pc)}`}(),i.innerHTML=void 0===e.duration?r.pc:void 0}()}},138:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return l}));var n=s(1),r=s(105),i=s(5),a=s(63);function l(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="source margin-bottom_small"></div>\n\t\t<div class="size margin-bottom_small"></div>\n\t\t<div class="ability margin-bottom_small"></div>\n\t\t<div class="speed margin-bottom_small"></div>\n\t\t<div class="stats"></div>\n\t</div>';const s=t.querySelector(".stats-wrapper .source");s.classList.add("source"+e.source),s.setAttribute("title",i.a.sourceJsonToFull(e.source)),s.innerHTML=""+i.a.sourceJsonToAbv(e.source);const l=i.a.sizeAbvToFull(e.size);t.querySelector(".stats-wrapper .size").innerHTML=l,""===l&&(t.querySelector(".stats-wrapper .size").style.display="none");const o=Object(a.c)(e.ability);let c;t.querySelector(".stats-wrapper .ability").innerHTML=o,e.speed&&(e.speed.walk?(c=e.speed.walk+" ft.",e.speed.climb&&(c+=`, climb ${e.speed.climb} ft.`),e.speed.fly&&(c+=`, fly ${e.speed.fly} ft.`)):c=e.speed+("Varies"===e.speed?"":" ft. ")),t.querySelector(".stats-wrapper .speed").innerHTML=c,""===c&&(t.querySelector(".stats-wrapper .speed").style.display="none");const d=e.trait;if(d){let e="<div class='stat-item'>";for(let t=0;t<d.length;++t){const s=`<span class='stat-name'>${d[t].name}.</span> `;e+=Object(n.utils_combineText)(d[t].text,"p",s)}e+="</div>",t.querySelector(".stats-wrapper .stats").innerHTML=e}else if(e.entries){const s=[],n={type:"entries",entries:e.entries};(new r.a).recursiveEntryRender(n,s,1,"<div class='renderer-output'>","</div>",!0),t.querySelector(".stats-wrapper .stats").innerHTML=s.join("")}}},139:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return i}));var n=s(1),r=s(5);function i(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="source margin-bottom_small"></div>\n\t\t<div class="text"></div>\n\t</div>';const s=t.querySelector(".stats-wrapper .source");s.classList.add("source"+e.source),s.setAttribute("title",r.a.sourceJsonToFull(e.source)),s.innerHTML=""+r.a.sourceJsonToAbv(e.source);const i=e.text;let a="";void 0!==e.ability&&(a+=Object(n.utils_combineText)(e.ability.text,"p","<span class='stat-name'>Ability Score Adjustment:</span> ")),void 0!==e.signaturespells&&(a+=Object(n.utils_combineText)(e.signaturespells.text?e.signaturespells.text:"None","p","<span class='stat-name'>Signature Spells:</span> ")),a+=Object(n.utils_combineText)(i,"p"),t.querySelector(".stats-wrapper .text").innerHTML="<tr class='text'><td colspan='6'>"+a+"</td></tr>"}},140:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return a}));var n=s(105),r=s(5);const i=new n.a;function a(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="source margin-bottom_small"></div>\n\t\t<div class="text"></div>\n\t</div>';const s=t.querySelector(".stats-wrapper .source");s.classList.add("source"+e.source),s.setAttribute("title",r.a.sourceJsonToFull(e.source)),s.innerHTML=""+r.a.sourceJsonToAbv(e.source);const n=[];i.recursiveEntryRender(e,n),t.querySelector(".stats-wrapper .text").innerHTML=n.join("")}}}]);
//# sourceMappingURL=2.bundle.js.map