(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{109:function(e,t,s){"use strict";s.r(t);var l=s(7),a=(s(63),s(72),s(85),s(133),s(31)),o=s(26),c=s(121),n=s(11);function r(e,t=0,s=document.scrollingElement){if(s.scrollTop===e)return;const l=(s.scrollTop-e)/2;let a=0,o=null;window.requestAnimationFrame((function c(n){if(null!==o){if(a+=Math.PI*(n-o)/t,a>=Math.PI)return s.scrollTop=e;s.scrollTop=l+e+l*Math.cos(a)}o=n,window.requestAnimationFrame(c)}))}var i=s(1);class d extends l.a{static get properties(){return{classes:{type:Object,observer:"_dataLoaded"},hash:{type:String,value:""},itemOpened:{value:!1},loading:{type:Boolean,value:!0,observer:"_loadingChange"}}}static get observers(){return["_updateClassFromHash(classes, hash)"]}constructor(){super(),this.loading=!0,Object(a.b)("class-all").then(e=>{this.set("classes",e),this.loading=!1})}connectedCallback(){super.connectedCallback(),this.populateHandlers(),Object(n.e)().addEventListener("selection-change",this.selectionChangeEventHandler),Object(n.e)().addEventListener("selection-deselected",this.deselectionChangeEventHandler),this.$.backToTop.addEventListener("click",this.backToTopEventHandler),window.addEventListener("scroll",this.subclassScrollRepositionHandler)}disconnectedCallback(){super.disconnectedCallback(),this.deselectionChangeEventHandler(),Object(n.e)().removeEventListener("selection-change",this.selectionChangeEventHandler),Object(n.e)().removeEventListener("selection-deselected",this.deselectionChangeEventHandler),this.$.backToTop.removeEventListener("click",this.backToTopEventHandler),window.removeEventListener("scroll",this.subclassScrollRepositionHandler,{passive:!0})}populateHandlers(){this.selectionChangeEventHandler=e=>{let t=e?e.detail.selection:Object(n.c)();t&&this.set("hash",t)},this.selectionChangeEventHandler(),this.deselectionChangeEventHandler=()=>{this.set("hash","")},this.backToTopEventHandler=()=>{!function(e=0){r(0,e,document.scrollingElement)}(400)},this.subclassScrollRepositionHandler=()=>{window.scrollY>850?this.$.backToTop.classList.remove("hidden"):this.$.backToTop.classList.add("hidden");const e=this.shadowRoot.querySelector("#subclasses"),t=this.shadowRoot.querySelector("#subclassHeight");e.classList.contains("closed")&&e.classList.contains("fixed")||(this.subclassOffsetHeight=Object(i.jqHeight)(e)+55+"px"),Object(i.jqOffset)(t).top-document.body.scrollTop<64?e.classList.contains("fixed")||(e.classList.add("fixed"),t.style.height=this.subclassOffsetHeight):(e.classList.remove("fixed"),t.style.height="0")}}_loadingChange(){this.dispatchEvent(new CustomEvent("loading-data",{bubbles:!0,composed:!0,detail:{loading:this.loading}}))}_dataLoaded(){Object(c.onDataLoad)(this.classes,this.shadowRoot)}_updateClassFromHash(){if(this.classes&&this.hash){let e,t;if(this.hash.indexOf(",")>-1){let s=this.hash.split(",");e=Object(o.b)(this.classes,s[0]),t=s.slice(1)}else e=Object(o.b)(this.classes,this.hash);if(e){this.itemOpened=!0;let s=e!==this.prevClass;this.prevClass=e,s&&(window.scrollTo(0,0),Object(c.onClassChange)(e,this.shadowRoot)),t&&Object(c.onSubChange)(t,this.hash,this.shadowRoot),Object(n.e)().dispatchEvent(new CustomEvent("title-change",{bubbles:!0,composed:!0,detail:e}))}else Object(n.a)(!0)}this.hash||(this.itemOpened=!1)}_clearSelectionHandler(){Object(n.a)(!0)}_mainClass(){return this.itemOpened?"main item-opened":"main"}static get template(){return l.b`
      <style include="material-styles my-styles"></style>
      <div class$="[[_mainClass(itemOpened)]]">

        <button class="mdc-icon-button close-item material-icons" on-click="_clearSelectionHandler">close</button>
        <button id="backToTop" class="mdc-icon-button mdc-button--raised back-to-top material-icons hidden">arrow_upward</button>

        <div class="class-container"></div>

        <div class="class-page--class-container stats-wrapper">

          <div id="subclassHeight"></div>
          <div id="subclasses"></div>

          <div id="classtable">
            <table class="table">
              <tr id="groupHeaders" class="table-row table-row--header">
                <th colspan="3"></th>
                <!-- spacer to match the 3 default cols (level, prof, features) -->
              </tr>
              <tr id="colHeaders" class="table-row table-row--header">
                <th class="level table-cell">Level</th>
                <th class="pb table-cell">Proficiency Bonus</th>
                <th class="features table-cell">Features</th>
              </tr>
              <tr id="level1" class="table-row">
                <td class="level table-cell">1st</td>
                <td class="pb table-cell">+2</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level2" class="table-row">
                <td class="level table-cell">2nd</td>
                <td class="pb table-cell">+2</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level3" class="table-row">
                <td class="level table-cell">3rd</td>
                <td class="pb table-cell">+2</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level4" class="table-row">
                <td class="level table-cell">4th</td>
                <td class="pb table-cell">+2</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level5" class="table-row">
                <td class="level table-cell">5th</td>
                <td class="pb table-cell">+3</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level6" class="table-row">
                <td class="level table-cell">6th</td>
                <td class="pb table-cell">+3</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level7" class="table-row">
                <td class="level table-cell">7th</td>
                <td class="pb table-cell">+3</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level8" class="table-row">
                <td class="level table-cell">8th</td>
                <td class="pb table-cell">+3</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level9" class="table-row">
                <td class="level table-cell">9th</td>
                <td class="pb table-cell">+4</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level10" class="table-row">
                <td class="level table-cell">10th</td>
                <td class="pb table-cell">+4</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level11" class="table-row">
                <td class="level table-cell">11th</td>
                <td class="pb table-cell">+4</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level12" class="table-row">
                <td class="level table-cell">12th</td>
                <td class="pb table-cell">+4</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level13" class="table-row">
                <td class="level table-cell">13th</td>
                <td class="pb table-cell">+5</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level14" class="table-row">
                <td class="level table-cell">14th</td>
                <td class="pb table-cell">+5</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level15" class="table-row">
                <td class="level table-cell">15th</td>
                <td class="pb table-cell">+5</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level16" class="table-row">
                <td class="level table-cell">16th</td>
                <td class="pb table-cell">+5</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level17" class="table-row">
                <td class="level table-cell">17th</td>
                <td class="pb table-cell">+6</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level18" class="table-row">
                <td class="level table-cell">18th</td>
                <td class="pb table-cell">+6</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level19" class="table-row">
                <td class="level table-cell">19th</td>
                <td class="pb table-cell">+6</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level20" class="table-row">
                <td class="level table-cell">20th</td>
                <td class="pb table-cell">+6</td>
                <td class="features table-cell"></td>
              </tr>
            </table>
          </div>

          <div id="statsprof" class="stats margin-bottom_large">
            <div id="hp" colspan="6">
              <h5>Hit Points</h5>
              <div id="hitdice" class="margin-bottom_small">
                <strong>Hit Dice:</strong>
                <span> </span>
              </div>
              <div id="hp1stlevel" class="margin-bottom_small">
                <strong>Hit Points at 1st Level:</strong>
                <span> </span>
              </div>
              <div id="hphigherlevels" class="margin-bottom_small">
                <strong>Hit Points at Higher Levels:</strong>
                <span> </span>
              </div>
            </div>
            <div id="prof" class="margin-bottom_small">
              <h5>Proficiencies</h5>
              <div class="margin-bottom_med">You are proficient with the following items, in addition to any proficiencies provided by your race or
                background.</div>
              <div id="armor" class="margin-bottom_small">
                <strong>Armor:</strong>
                <span> </span>
              </div>
              <div id="weapons" class="margin-bottom_small">
                <strong>Weapons:</strong>
                <span> </span>
              </div>
              <div id="tools" class="margin-bottom_small">
                <strong>Tools:</strong>
                <span> </span>
              </div>
              <div id="saves" class="margin-bottom_small">
                <strong>Saving Throws:</strong>
                <span> </span>
              </div>
              <div id="skills" class="margin-bottom_small">
                <strong>Skills:</strong>
                <span> </span>
              </div>
              <div id="equipment">
                <h5>Starting Equipment</h5>
                <div></div>
              </div>
            </div>
          </div>

          <div id="stats" class="stats">
            <!-- populate with JS -->
          </div>
        </div>
      </div>
    `}}customElements.define("dnd-classes",d);class u extends l.a{static get template(){return l.b`
      <style include="material-styles my-styles"></style>
      
      <dnd-classes></dnd-classes>
    `}}customElements.define("dnd-classes-view",u)},121:function(e,t,s){"use strict";s.r(t),s.d(t,"onDataLoad",(function(){return u})),s.d(t,"onClassChange",(function(){return b})),s.d(t,"onSubChange",(function(){return p}));var l=s(1),a=s(0),o=s(71),c=s(5),n=s(11);const r="mdc-chip--selected",i=new o.a;function d(e){let t=[];return i.recursiveEntryRender(e,t,0),t.join(" ")}function u(e,t){for(const t of e)t.subclasses&&(t.subclasses=t.subclasses.sort((e,t)=>Object(l.ascSort)(e.name,t.name)));const s=e.filter(e=>!e.name.includes("Sidekick"));window.classTableDefault=t.querySelector("#classtable").innerHTML,function(e,t){const s=e.querySelector(".class-container");s.appendChild(Object(l.parseHTML)("<div class='list-container'></div>"));const a=s.querySelector(".list-container");let o="";for(let e=0;e<t.length;e++){const s=t[e];let a=s.name.replace(/(\s|\(|\))/g,"");o+=`<div class='list-item history-link grid-item__${a}' data-link='${Object(l.encodeForHash)([s.name,s.source])}' data-title='${s.name}'>\n\t\t\t\t<div>\n\t\t\t\t\t<dnd-svg id='${a}' default-color class='list-item--image grid-item__${a}'></dnd-svg>\n\t\t\t\t\t<span class='list-item--text'>${s.name}</span>\n\t\t\t\t</div>\n\t\t\t\t<div class="list-item--subtext">${c.a.sourceJsonToFull(s.source)}</div>\n\t\t\t</div>`}let r=Object(l.parseHTML)(o);for(;r.length>0;)r[0].addEventListener("click",e=>{let t=e.target.closest(".list-item");Object(n.f)(t.getAttribute("data-link"))}),a.appendChild(r[0])}(t,s)}function b(e,t){t.querySelector("#classtable").innerHTML=window.classTableDefault,t.querySelector("#subclasses").classList.remove("fixed"),t.querySelector("#subclasses").classList.remove("closed"),t.querySelector("#subclasses").classList.remove("hidden"),t.querySelector(".mobile-clone-spells")&&t.querySelector(".mobile-clone-spells").remove(),e.hd?(t.querySelector("#hp").classList.remove("hidden"),t.querySelector("#hp div#hitdice span").innerHTML=o.a.getEntryDice(e.hd),t.querySelector("#hp div#hp1stlevel span").innerHTML=e.hd.faces+" + your Constitution modifier",t.querySelector("#hp div#hphigherlevels span").innerHTML=`${o.a.getEntryDice(e.hd)} (or ${e.hd.faces/2+1}) + your Constitution modifier per ${e.name} level after 1st`):t.querySelector("#hp").classList.add("hidden"),e.proficiency?(t.querySelector("#prof").classList.remove("hidden"),t.querySelector("#prof div#saves span").innerHTML=e.proficiency.map(e=>c.a.attAbvToFull(e)).join(", ")):t.querySelector("#prof").classList.add("hidden");const s=e.startingProficiencies;s?(t.querySelector("#armor").classList.remove("hidden"),t.querySelector("#weapons").classList.remove("hidden"),t.querySelector("#tools").classList.remove("hidden"),t.querySelector("#skills").classList.remove("hidden"),t.querySelector("div#armor span").innerHTML=void 0===s.armor?"none":s.armor.map(e=>"light"===e||"medium"===e||"heavy"===e?e+" armor":e).join(", "),t.querySelector("div#weapons span").innerHTML=void 0===s.weapons?"none":s.weapons.map(e=>"simple"===e||"martial"===e?e+" weapons":e).join(", "),t.querySelector("div#tools span").innerHTML=void 0===s.tools?"none":s.tools.join(", "),t.querySelector("div#skills span").innerHTML=void 0===s.skills?"none":function(e){let t,s,a="";if(Array.isArray(e))for(let o of e)o.choose&&(t=c.a.numberToString(o.choose.count),s=o.choose.from,a+=18===s.length?`Choose any ${t}.`:`Choose ${t} from ${Object(l.joinConjunct)(s,", ",", and ")}.`);else t=c.a.numberToString(e.choose),s=e.from,a+=18===s.length?`Choose any ${t}.`:`Choose ${t} from ${Object(l.joinConjunct)(s,", ",", and ")}.`;return a}(s.skills)):(t.querySelector("#armor").classList.add("hidden"),t.querySelector("#weapons").classList.add("hidden"),t.querySelector("#tools").classList.add("hidden"),t.querySelector("#skills").classList.add("hidden"));const u=e.startingEquipment;if(u){t.querySelector("#equipment").classList.remove("hidden");const e=u.additionalFromBackground?"<p>You start with the following items, plus anything provided by your background.</p>":"",s=0===u.default.length?"":`<ul><li>${u.default.map(e=>d(e)).join("</li><li>")}</ul>`,l=void 0===u.goldAlternative?"":`<p>Alternatively, you may start with ${d(u.goldAlternative)} gp to buy your own equipment.</p>`;t.querySelector("#equipment div").innerHTML=`${e}${s}${l}`}else t.querySelector("#equipment").classList.add("hidden");let b=e.classTableGroups||[];const p=t.querySelector("#groupHeaders"),h=t.querySelector("#colHeaders"),f=[];let v=!1;for(let t of e.subclasses)t.subclassTableGroups&&(b=b.concat(t.subclassTableGroups));if(b)for(let e=0;e<b.length;e++){const s=b[e],o=void 0!==s.title;let c="";void 0!==s.subclasses&&(c=`data-subclass-list="${s.subclasses.map(e=>e.name+a.e+e.source).join(a.d)}"`),p.append(Object(l.parseHTML)(`<th ${o?'class="colGroupTitle table-cell"':""} colspan="${s.colLabels.length}" ${c}>${o?s.title:""}</th>`,!0,!0));for(let e=0;e<s.colLabels.length;e++){let t=s.colLabels[e];if(t.indexOf("@")>-1){let e=[];i.recursiveEntryRender(t,e,0),t=e.join(" ")}h.append(Object(l.parseHTML)(`<th class="centred-col table-cell" ${c}>${t}</th>`,!0,!0))}if(s.rows)for(let e=0;e<20;e++){const a=t.querySelector("#level"+(e+1));f[e]=a;for(let t=0;t<s.rows[e].length;t++){let o=s.rows[e][t];0===o&&(o="—");const n=[];i.recursiveEntryRender(o,n,"",""),a.append(Object(l.parseHTML)(`<td class="centred-col" ${c}>${n.join("")}</td>`,!0,!0))}}if(s.rowsSpellProgression)for(let e=0;e<20;e++){const a=t.querySelector("#level"+(e+1));f[e]=a;for(let t=0;t<s.rowsSpellProgression[e].length;t++){let o=s.rowsSpellProgression[e][t];0===o&&(o="—");const n=[];i.recursiveEntryRender(o,n,"",""),a.append(Object(l.parseHTML)(`<td class="centred-col" ${c}>${n.join("")}</td>`,!0,!0))}}let n=s.colLabels.join(" ");!v&&(n.indexOf("Spells Known")>-1||n.indexOf("Cantrips Known")>-1||n.indexOf("1st")>-1||n.indexOf("Ki Points")>-1||n.indexOf("Rages")>-1||n.indexOf("Talents Known")>-1)&&(v=!0)}else if(e.classFeatures.length)for(let e=0;e<20;e++){const s=t.querySelector("#level"+(e+1));f[e]=s}if(t.querySelector("#classtable").classList.remove("mobile-clone-features"),v){t.querySelector("#classtable").classList.add("mobile-clone-features");let e=Object(l.parseHTML)('<div class="mobile-clone-spells"></div>');e.append(t.querySelector("#classtable").cloneNode(!0)),e.querySelector("#classtable").classList.remove("mobile-clone-features"),e.querySelector("#groupHeaders th:not(.colGroupTitle)").remove(),e.querySelector("#groupHeaders .colGroupTitle")&&e.querySelector("#groupHeaders .colGroupTitle").setAttribute("colspan","12");let s=e.querySelectorAll("#colHeaders th");for(let e of s)e.textContent.toLowerCase().indexOf("sneak attack")>-1?e.innerHTML='<span title="Sneak Attack">Snk Atk</span>':e.textContent.toLowerCase().indexOf("sorcery points")>-1?e.innerHTML='<span title="Sorcery Points">SP</span>':e.textContent.toLowerCase().indexOf("spells known")>-1?e.innerHTML='<span title="Spells Known">S</span>':e.textContent.toLowerCase().indexOf("cantrips known")>-1&&(e.innerHTML='<span title="Cantrips Known">C</span>');Object(l.jqAfter)(t.querySelector("#classtable"),e)}const g=[];let m=0;for(let s=0;s<20;s++){const o=f[s].querySelector(".features"),c=[],n=e.classFeatures[s];for(let o=0;o<n.length;o++){const r=n[o];console.error("feature",r);const d="f:"+Object(l.encodeForHash)(r.name)+"_"+s,u="f:"+Object(l.encodeForHash)(r.name)+s,b=["feature-link"];Object(l.isNonstandardSource)(r.source)&&b.push(a.i);const p=Object(l.parseHTML)(`<a href="#${Object(l.encodeForHash)([e.name,e.source])}${a.o}${u}"\n          class="${b.join(" ")}"\n          data-flink="${u}"\n          data-flink-id="${d}">${r.name}</a>`);p.addEventListener("click",(function(e){e.preventDefault(),t.getElementById(d).scrollIntoView(!0);let s=-84-Object(l.jqHeight)(t.querySelector("#subclasses"));window.scrollBy(0,s)})),c.push(p);const h=["class-feature"];if(r.gainSubclassFeature&&h.push("gain-subclass-feature"),i.recursiveEntryRender(r,g,0,`<div id="${d}" class="${h.join(" ")}" level="${r.level}">`,"</div>",!0),r.gainSubclassFeature){for(const t of e.subclasses)if(t.subclassFeatures){const e=t.subclassFeatures[m];for(let s=0;s<e.length;s++){const o=e[s];if(void 0===o.name)for(let e=0;e<o.entries.length;e++){const s=o.entries[e];void 0===s.name||s.name.startsWith('<span class="subclass-prefix">')||(s.name=`<span class="subclass-prefix">${t.name}: </span>${s.name}`)}const c=[a.j];(Object(l.isNonstandardSource)(t.source)||Object(l.hasBeenReprinted)(t.shortName,t.source))&&c.push(a.i),0!==s&&c.push("referenced-subclass-feature"),i.recursiveEntryRender(o,g,0,`<div class="${c.join(" ")}" ${a.f}="${t.name}" ${a.g}="${t.source}">`,"</div>",!0)}}m++}}if(0===c.length)o.innerHTML="—";else for(let e=0;e<c.length;e++)o.append(c[e])}t.querySelector("#stats").innerHTML=g.join(""),j(!0);let y=t.querySelector("div#subclasses");Object(l.jqEmpty)(y),y.append(Object(l.parseHTML)("<div class='title'>Subclasses</div>")),y.append(Object(l.parseHTML)("<div class='subclass-wrapper'></div>")),y=y.querySelector(".subclass-wrapper");const S=w("Show UA","os-active","os-toggle","allsrc:",!1,!0);if(w("Class Features","cf-active","cf-toggle","hideclassfs:",!0),e.subclasses){const s=e.subclasses.map(e=>({name:e.name,source:e.source,shortName:e.shortName})).sort((function(e,t){return Object(l.ascSort)(e.shortName,t.shortName)}));for(let e=0;e<s.length;e++){const t=Object(l.isNonstandardSource)(s[e].source)||Object(l.hasBeenReprinted)(s[e].shortName,s[e].source),o=[r,"mdc-chip"];t&&o.push(a.i);const n=Object(l.hasBeenReprinted)(s[e].shortName,s[e].source)?`${s[e].shortName} (${c.a.sourceJsonToAbv(s[e].source)})`:s[e].shortName,i=Object(l.parseHTML)(`<div class="${o.join(" ")}" ${a.f}="${s[e].name}" ${a.g}="${s[e].source}" title="Source: ${c.a.sourceJsonToFull(s[e].source)}"><span class='mdc-chip__text'>${n}</span></div>`);i.addEventListener("click",(function(){L(i.classList.contains(r),s[e].name,s[e].source)})),t&&(i.style.display="none"),y.append(i)}y.append(Object(l.parseHTML)("<div class='tab material-icons'>expand_less</div>")),t.querySelector("#subclasses .tab").addEventListener("click",()=>{t.querySelector("#subclasses").classList.toggle("closed")});(Object(n.c)().indexOf("allsrc:true")>-1||-1===Object(n.c)().indexOf("allsrc:false"))&&S.click()}else t.querySelector("#subclasses").classList.add("hidden");function w(e,t,s,o,c,r){const i=Object(l.parseHTML)(`<div id="${s}" class="mdc-chip"><span class="mdc-chip__text">${e}</span></div>`);return y.append(i),i.addEventListener("click",(function(){let e=i.classList.contains(t);c||(e=!e),function(e){const t=[],s=Object(n.c)().split(a.o);for(let e=0;e<s.length;e++){const l=s[e];l.startsWith(o)||t.push(l)}e?t.push(o+"true"):t.push(o+"false");const l=t.join(a.o);Object(n.f)(l,!0)}(e),r&&(j(e),i.querySelector(".mdc-chip__text").innerHTML=e?"Hide UA":"Show UA")})),i}function L(e,t,s){const o=[],c=Object(n.c)(),r=c.split(a.o),i=Object(l.encodeForHash)([t]),d="sub:"+i;if(e&&c.includes("sub:"))for(let e=0;e<r.length;e++){const t=r[e];if(t.startsWith("sub:")){const e=[],s=t.substr("sub:".length).split(a.n);for(let t=0;t<s.length;t++){const l=s[t];l!==i&&e.push(l)}e.length>0&&o.push("sub:"+e.join(a.n))}else o.push(t)}else{let e=!1;for(let t=0;t<r.length;t++){const s=r[t];if(s.startsWith("sub:")){const t=[],l=s.substr("sub:".length).split(a.n);for(let e=0;e<l.length;e++){const s=l[e];s!==i&&t.push(s)}t.push(i),t.length>0&&o.push("sub:"+t.join(a.n)),e=!0}else o.push(s)}e||o.push(d)}const u=o.join(a.o);Object(n.f)(u,!0)}function j(e){let s=t.querySelectorAll("."+a.i);for(let t of s)t.classList.contains("mdc-chip")||(t.style.display=e?null:"none")}}function p(e,t,s){let c=null,n=null,i=null,d=null;for(let t=0;t<e.length;t++){const s=e[t];s.startsWith("sub:")&&(c=s.slice("sub:".length).split(a.n)),s.startsWith("f:")&&(n=s),s.startsWith("hideclassfs:")&&(i="true"===s.slice("hideclassfs:".length)),s.startsWith("allsrc:")&&(d="true"===s.slice("allsrc:".length))}const u=null===d||!1===d;if(null!==c){v();const e=[],t=[],n=s.querySelectorAll(".mdc-chip");for(let s of n){const o=s,n=o.getAttribute(a.f),r=Object(l.encodeForHash)([n]);let i=!1;for(let e=0;e<c.length;e++){if(c[e].trim()===r){i=!0;break}}i?e.push(o):t.push(o)}const i=s.querySelectorAll("p."+a.i),d=[];for(let t of e){t.classList.add(r);let e=s.querySelectorAll(`.${a.j}[${a.f}="${t.getAttribute(a.f)}"][${a.g}="${t.getAttribute(a.g)}"]`);for(let t of e)t.style.display=null;if(u)for(let e of i)e.getAttribute(a.f)===t.getAttribute(a.f)&&e.getAttribute(a.g)===t.getAttribute(a.g)&&(e.style.display="none");else for(let e of i)e.getAttribute(a.f)===t.getAttribute(a.f)&&e.getAttribute(a.g)===t.getAttribute(a.g)&&(e.style.display=null);const l=t.getAttribute(a.f)+a.e+t.getAttribute(a.g);d.push(l)}for(let e of t){e.classList.remove(r);let t=s.querySelectorAll(`.${a.j}[${a.f}="${e.getAttribute(a.f)}"][${a.g}="${e.getAttribute(a.g)}"]`);for(let e of t)e.style.display="none";for(let t of i)t.getAttribute(a.f)===e.getAttribute(a.f)&&t.getAttribute(a.g)===e.getAttribute(a.g)&&(t.style.display="none");e.getAttribute(a.f)}if(function(e){let t=s.querySelectorAll("[data-subclass-list]");for(let s of t){const t=s.getAttribute("data-subclass-list").split(a.d);for(let l of e){if(t.includes(l)){s.style.display=null;break}s.style.display="none"}}}(d),u)for(let e of i)e.classList.contains(a.j)||e.getAttribute(a.f)!==o.a.DATA_NONE||e.getAttribute(a.g)!==o.a.DATA_NONE||(e.style.display="none");else for(let e of i)e.classList.contains(a.j)||e.getAttribute(a.f)!==o.a.DATA_NONE||e.getAttribute(a.g)!==o.a.DATA_NONE||(e.style.display=null);let b=s.querySelectorAll(".subclass-prefix");if(1!==e.length)for(let e of b)e.style.display=null;else for(let e of b)e.style.display="none"}const b=s.querySelector("#cf-toggle"),p=s.querySelectorAll(".class-feature");if(null!==i&&i){b.classList.remove("cf-active");for(let e of p)e.classList.contains("gain-subclass-feature")||(e.style.display="none")}else{b.classList.add("cf-active");for(let e of p)e.classList.contains("gain-subclass-feature")||(e.style.display=null)}const h=s.querySelector("#os-toggle"),f=s.querySelectorAll(".mdc-chip."+a.i);if(u){h.classList.remove("os-active");for(let e of f)e.style.display="none"}else{h.classList.add("os-active");for(let e of f)e.style.display=null}function v(){const e=t.slice(1).split(a.o),l=[];for(let t=0;t<e.length;t++){const s=e[t];s.startsWith("f:")||l.push(s)}let o=s.querySelectorAll(".feature-link");for(let e of o)e.href=a.p+l.join(a.o)+a.o+e.getAttribute("data-flink")}null===n||void 0!==window.prevFeature&&window.prevFeature===n||(s.getElementById(s.querySelectorAll(`[data-flink="${n}"]`).getAttribute("data-flink-id")).scrollIntoView(),window.prevFeature=n),v()}}}]);
//# sourceMappingURL=28.bundle.js.map