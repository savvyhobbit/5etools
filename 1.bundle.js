(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{131:function(e,t,s){"use strict";s.r(t),s.d(t,"onDataLoad",(function(){return d})),s.d(t,"onClassChange",(function(){return p})),s.d(t,"onSubChange",(function(){return f}));var l=s(1),n=s(0),o=s(71),r=s(5),i=s(12);const a="mdc-chip--selected",c=new o.a;function u(e){let t=[];return c.recursiveEntryRender(e,t,0),t.join(" ")}function d(e,t){for(const t of e)t.subclasses&&(t.subclasses=t.subclasses.sort((e,t)=>Object(l.ascSort)(e.name,t.name)));window.classTableDefault=t.querySelector("#classtable").innerHTML,function(e,t){const s=e.querySelector(".class-container");s.appendChild(Object(l.parseHTML)("<div class='list-container'></div>"));const n=s.querySelector(".list-container");let o="";for(let e=0;e<t.length;e++){const s=t[e];let n=s.name.replace(/(\s|\(|\))/g,"");o+=`<div class='list-item history-link grid-item__${n}'\n\t\t\t\tdata-link='${Object(l.encodeForHash)(s.name,s.source)}' data-title='${s.name}'>\n\t\t\t\t<dnd-svg id='${n}' default-color class='asdf list-item--image grid-item__${n}'></dnd-svg>\n\t\t\t\t<span class='list-item--text'>${s.name}</span>\n\t\t\t</div>`}let r=Object(l.parseHTML)(o);for(;r.length>0;)r[0].addEventListener("click",e=>{let t=e.target.closest(".list-item");Object(i.f)(t.getAttribute("data-link"))}),n.appendChild(r[0])}(t,e)}function p(e,t){t.querySelector("#classtable").innerHTML=window.classTableDefault,t.querySelector("#subclasses").classList.remove("fixed"),t.querySelector("#subclasses").classList.remove("closed"),t.querySelector("#subclasses").classList.remove("hidden"),t.querySelector(".mobile-clone-spells")&&t.querySelector(".mobile-clone-spells").remove(),e.hd?(t.querySelector("#hp").classList.remove("hidden"),t.querySelector("#hp div#hitdice span").innerHTML=o.a.getEntryDice(e.hd),t.querySelector("#hp div#hp1stlevel span").innerHTML=e.hd.faces+" + your Constitution modifier",t.querySelector("#hp div#hphigherlevels span").innerHTML=`${o.a.getEntryDice(e.hd)} (or ${e.hd.faces/2+1}) + your Constitution modifier per ${e.name} level after 1st`):t.querySelector("#hp").classList.add("hidden"),e.proficiency?(t.querySelector("#prof").classList.remove("hidden"),t.querySelector("#prof div#saves span").innerHTML=e.proficiency.map(e=>r.a.attAbvToFull(e)).join(", ")):t.querySelector("#prof").classList.add("hidden");const s=e.startingProficiencies;s?(t.querySelector("#armor").classList.remove("hidden"),t.querySelector("#weapons").classList.remove("hidden"),t.querySelector("#tools").classList.remove("hidden"),t.querySelector("#skills").classList.remove("hidden"),t.querySelector("div#armor span").innerHTML=void 0===s.armor?"none":s.armor.map(e=>"light"===e||"medium"===e||"heavy"===e?e+" armor":e).join(", "),t.querySelector("div#weapons span").innerHTML=void 0===s.weapons?"none":s.weapons.map(e=>"simple"===e||"martial"===e?e+" weapons":e).join(", "),t.querySelector("div#tools span").innerHTML=void 0===s.tools?"none":s.tools.join(", "),t.querySelector("div#skills span").innerHTML=void 0===s.skills?"none":function(e){let t,s,n="";if(Array.isArray(e))for(let o of e)o.choose&&(t=r.a.numberToString(o.choose.count),s=o.choose.from,n+=18===s.length?`Choose any ${t}.`:`Choose ${t} from ${Object(l.joinConjunct)(s,", ",", and ")}.`);else t=r.a.numberToString(e.choose),s=e.from,n+=18===s.length?`Choose any ${t}.`:`Choose ${t} from ${Object(l.joinConjunct)(s,", ",", and ")}.`;return n}(s.skills)):(t.querySelector("#armor").classList.add("hidden"),t.querySelector("#weapons").classList.add("hidden"),t.querySelector("#tools").classList.add("hidden"),t.querySelector("#skills").classList.add("hidden"));const d=e.startingEquipment;if(d){t.querySelector("#equipment").classList.remove("hidden");const e=d.additionalFromBackground?"<p>You start with the following items, plus anything provided by your background.</p>":"",s=0===d.default.length?"":`<ul><li>${d.default.map(e=>u(e)).join("</li><li>")}</ul>`,l=void 0===d.goldAlternative?"":`<p>Alternatively, you may start with ${u(d.goldAlternative)} gp to buy your own equipment.</p>`;t.querySelector("#equipment div").innerHTML=`${e}${s}${l}`}else t.querySelector("#equipment").classList.add("hidden");let p=e.classTableGroups||[];const f=t.querySelector("#groupHeaders"),b=t.querySelector("#colHeaders"),h=[];let y=!1;for(let t of e.subclasses)t.subclassTableGroups&&(p=p.concat(t.subclassTableGroups));if(p)for(let e=0;e<p.length;e++){const s=p[e],o=void 0!==s.title;let r="";void 0!==s.subclasses&&(r=`data-subclass-list="${s.subclasses.map(e=>e.name+n.e+e.source).join(n.d)}"`),f.append(Object(l.parseHTML)(`<th ${o?'class="colGroupTitle table-cell"':""} colspan="${s.colLabels.length}" ${r}>${o?s.title:""}</th>`,!0,!0));for(let e=0;e<s.colLabels.length;e++){let t=s.colLabels[e];if(t.indexOf("@")>-1){let e=[];c.recursiveEntryRender(t,e,0),t=e.join(" ")}b.append(Object(l.parseHTML)(`<th class="centred-col table-cell" ${r}>${t}</th>`,!0,!0))}for(let e=0;e<20;e++){const n=t.querySelector("#level"+(e+1));h[e]=n;for(let t=0;t<s.rows[e].length;t++){let o=s.rows[e][t];0===o&&(o="—");const i=[];c.recursiveEntryRender(o,i,"",""),n.append(Object(l.parseHTML)(`<td class="centred-col" ${r}>${i.join("")}</td>`,!0,!0))}}let i=s.colLabels.join(" ");!y&&(i.indexOf("Spells Known")>-1||i.indexOf("Cantrips Known")>-1||i.indexOf("1st")>-1||i.indexOf("Ki Points")>-1||i.indexOf("Rages")>-1||i.indexOf("Talents Known")>-1)&&(y=!0)}else if(e.classFeatures.length)for(let e=0;e<20;e++){const s=t.querySelector("#level"+(e+1));h[e]=s}if(t.querySelector("#classtable").classList.remove("mobile-clone-features"),y){t.querySelector("#classtable").classList.add("mobile-clone-features");let e=Object(l.parseHTML)('<div class="mobile-clone-spells"></div>');e.append(t.querySelector("#classtable").cloneNode(!0)),e.querySelector("#classtable").classList.remove("mobile-clone-features"),e.querySelector("#groupHeaders th:not(.colGroupTitle)").remove(),e.querySelector("#groupHeaders .colGroupTitle")&&e.querySelector("#groupHeaders .colGroupTitle").setAttribute("colspan","12");let s=e.querySelectorAll("#colHeaders th");for(let e of s)e.textContent.toLowerCase().indexOf("sneak attack")>-1?e.innerHTML='<span title="Sneak Attack">Snk Atk</span>':e.textContent.toLowerCase().indexOf("sorcery points")>-1?e.innerHTML='<span title="Sorcery Points">SP</span>':e.textContent.toLowerCase().indexOf("spells known")>-1?e.innerHTML='<span title="Spells Known">S</span>':e.textContent.toLowerCase().indexOf("cantrips known")>-1&&(e.innerHTML='<span title="Cantrips Known">C</span>');Object(l.jqAfter)(t.querySelector("#classtable"),e)}const g=[];let m=0;for(let s=0;s<20;s++){const o=h[s].querySelector(".features"),r=[],i=e.classFeatures[s];for(let o=0;o<i.length;o++){const a=i[o],u="f:"+Object(l.encodeForHash)(a.name)+"_"+s,d="f:"+Object(l.encodeForHash)(a.name)+s,p=["feature-link"];Object(l.isNonstandardSource)(a.source)&&p.push(n.i);const f=Object(l.parseHTML)(`<a href="#${Object(l.encodeForHash)(e.name,e.source)}${n.p}${d}"\n          class="${p.join(" ")}"\n          data-flink="${d}"\n          data-flink-id="${u}">${a.name}</a>`);f.addEventListener("click",(function(e){e.preventDefault(),t.getElementById(u).scrollIntoView(!0);let s=-84-Object(l.jqHeight)(t.querySelector("#subclasses"));window.scrollBy(0,s)})),r.push(f);const b=["class-feature"];if(a.gainSubclassFeature&&b.push("gain-subclass-feature"),c.recursiveEntryRender(a,g,0,`<div id="${u}" class="${b.join(" ")}">`,"</div>",!0),a.gainSubclassFeature){for(let t=0;t<e.subclasses.length;t++){const s=e.subclasses[t];for(let e=0;e<s.subclassFeatures[m].length;e++){const t=s.subclassFeatures[m][e];if(void 0===t.name)for(let e=0;e<t.entries.length;e++){const l=t.entries[e];void 0===l.name||l.name.startsWith('<span class="subclass-prefix">')||(l.name=`<span class="subclass-prefix">${s.name}: </span>${l.name}`)}const o=[n.j];(Object(l.isNonstandardSource)(s.source)||Object(l.hasBeenReprinted)(s.shortName,s.source))&&o.push(n.i),c.recursiveEntryRender(t,g,0,`<div class="${o.join(" ")}" ${n.f}="${s.name}" ${n.g}="${s.source}">`,"</div>",!0)}}m++}}if(0===r.length)o.innerHTML="—";else for(let e=0;e<r.length;e++)o.append(r[e])}t.querySelector("#stats").innerHTML=g.join(""),j(!0);let v=t.querySelector("div#subclasses");Object(l.jqEmpty)(v),v.append(Object(l.parseHTML)("<div class='title'>Subclasses</div>")),v.append(Object(l.parseHTML)("<div class='subclass-wrapper'></div>")),v=v.querySelector(".subclass-wrapper");const S=L("Show UA","os-active","os-toggle","allsrc:",!1,!0);if(L("Class Features","cf-active","cf-toggle","hideclassfs:",!0),e.subclasses){const s=e.subclasses.map(e=>({name:e.name,source:e.source,shortName:e.shortName})).sort((function(e,t){return Object(l.ascSort)(e.shortName,t.shortName)}));for(let e=0;e<s.length;e++){const t=Object(l.isNonstandardSource)(s[e].source)||Object(l.hasBeenReprinted)(s[e].shortName,s[e].source),o=[a,"mdc-chip"];t&&o.push(n.i);const i=Object(l.hasBeenReprinted)(s[e].shortName,s[e].source)?`${s[e].shortName} (${r.a.sourceJsonToAbv(s[e].source)})`:s[e].shortName,c=Object(l.parseHTML)(`<div class="${o.join(" ")}" ${n.f}="${s[e].name}" ${n.g}="${s[e].source}" title="Source: ${r.a.sourceJsonToFull(s[e].source)}"><span class='mdc-chip__text'>${i}</span></div>`);c.addEventListener("click",(function(){q(c.classList.contains(a),s[e].name,s[e].source)})),t&&(c.style.display="none"),v.append(c)}v.append(Object(l.parseHTML)("<div class='tab material-icons'>expand_less</div>")),t.querySelector("#subclasses .tab").addEventListener("click",()=>{t.querySelector("#subclasses").classList.toggle("closed")});(Object(i.c)().indexOf("allsrc:true")>-1||-1===Object(i.c)().indexOf("allsrc:false"))&&S.click()}else t.querySelector("#subclasses").classList.add("hidden");function L(e,t,s,o,r,a){const c=Object(l.parseHTML)(`<div id="${s}" class="mdc-chip"><span class="mdc-chip__text">${e}</span></div>`);return v.append(c),c.addEventListener("click",(function(){let e=c.classList.contains(t);r||(e=!e),function(e){const t=[],s=Object(i.c)().split(n.p);for(let e=0;e<s.length;e++){const l=s[e];l.startsWith(o)||t.push(l)}e?t.push(o+"true"):t.push(o+"false");const l=t.join(n.p);Object(i.f)(l,!0)}(e),a&&(j(e),c.querySelector(".mdc-chip__text").innerHTML=e?"Hide UA":"Show UA")})),c}function q(e,t,s){const o=[],r=Object(i.c)(),a=r.split(n.p),c=Object(l.encodeForHash)(t,s),u="sub:"+c;if(e&&r.includes("sub:"))for(let e=0;e<a.length;e++){const t=a[e];if(t.startsWith("sub:")){const e=[],s=t.substr("sub:".length).split(n.o);for(let t=0;t<s.length;t++){const l=s[t];l!==c&&e.push(l)}e.length>0&&o.push("sub:"+e.join(n.o))}else o.push(t)}else{let e=!1;for(let t=0;t<a.length;t++){const s=a[t];if(s.startsWith("sub:")){const t=[],l=s.substr("sub:".length).split(n.o);for(let e=0;e<l.length;e++){const s=l[e];s!==c&&t.push(s)}t.push(c),t.length>0&&o.push("sub:"+t.join(n.o)),e=!0}else o.push(s)}e||o.push(u)}const d=o.join(n.p);Object(i.f)(d,!0)}function j(e){let s=t.querySelectorAll("."+n.i);for(let t of s)t.classList.contains("mdc-chip")||(t.style.display=e?null:"none")}}function f(e,t,s){let r=null,i=null,c=null,u=null;for(let t=0;t<e.length;t++){const s=e[t];s.startsWith("sub:")&&(r=s.slice("sub:".length).split(n.o)),s.startsWith("f:")&&(i=s),s.startsWith("hideclassfs:")&&(c="true"===s.slice("hideclassfs:".length)),s.startsWith("allsrc:")&&(u="true"===s.slice("allsrc:".length))}const d=null===u||!1===u;if(null!==r){y();const e=[],t=[],i=s.querySelectorAll(".mdc-chip");for(let s of i){const o=s,i=Object(l.encodeForHash)(o.getAttribute(n.f),o.getAttribute(n.g));let a=!1;for(let e=0;e<r.length;e++){if(r[e].trim()===i){a=!0;break}}a?e.push(o):t.push(o)}const c=s.querySelectorAll("p."+n.i),u=[];for(let t of e){t.classList.add(a);let e=s.querySelectorAll(`.${n.j}[${n.f}="${t.getAttribute(n.f)}"][${n.g}="${t.getAttribute(n.g)}"]`);for(let t of e)t.style.display=null;if(d)for(let e of c)e.getAttribute(n.f)===t.getAttribute(n.f)&&e.getAttribute(n.g)===t.getAttribute(n.g)&&(e.style.display="none");else for(let e of c)e.getAttribute(n.f)===t.getAttribute(n.f)&&e.getAttribute(n.g)===t.getAttribute(n.g)&&(e.style.display=null);const l=t.getAttribute(n.f)+n.e+t.getAttribute(n.g);u.push(l)}for(let e of t){e.classList.remove(a);let t=s.querySelectorAll(`.${n.j}[${n.f}="${e.getAttribute(n.f)}"][${n.g}="${e.getAttribute(n.g)}"]`);for(let e of t)e.style.display="none";for(let t of c)t.getAttribute(n.f)===e.getAttribute(n.f)&&t.getAttribute(n.g)===e.getAttribute(n.g)&&(t.style.display="none");e.getAttribute(n.f)}if(function(e){let t=s.querySelectorAll("[data-subclass-list]");for(let s of t){const t=s.getAttribute("data-subclass-list").split(n.d);for(let l of e){if(t.includes(l)){s.style.display=null;break}s.style.display="none"}}}(u),d)for(let e of c)e.classList.contains(n.j)||e.getAttribute(n.f)!==o.a.DATA_NONE||e.getAttribute(n.g)!==o.a.DATA_NONE||(e.style.display="none");else for(let e of c)e.classList.contains(n.j)||e.getAttribute(n.f)!==o.a.DATA_NONE||e.getAttribute(n.g)!==o.a.DATA_NONE||(e.style.display=null);let p=s.querySelectorAll(".subclass-prefix");if(1!==e.length)for(let e of p)e.style.display=null;else for(let e of p)e.style.display="none"}const p=s.querySelector("#cf-toggle"),f=s.querySelectorAll(".class-feature");if(null!==c&&c){p.classList.remove("cf-active");for(let e of f)e.classList.contains("gain-subclass-feature")||(e.style.display="none")}else{p.classList.add("cf-active");for(let e of f)e.classList.contains("gain-subclass-feature")||(e.style.display=null)}const b=s.querySelector("#os-toggle"),h=s.querySelectorAll(".mdc-chip."+n.i);if(d){b.classList.remove("os-active");for(let e of h)e.style.display="none"}else{b.classList.add("os-active");for(let e of h)e.style.display=null}function y(){const e=t.slice(1).split(n.p),l=[];for(let t=0;t<e.length;t++){const s=e[t];s.startsWith("f:")||l.push(s)}let o=s.querySelectorAll(".feature-link");for(let e of o)e.href=n.q+l.join(n.p)+n.p+e.getAttribute("data-flink")}null===i||void 0!==window.prevFeature&&window.prevFeature===i||(s.getElementById(s.querySelectorAll(`[data-flink="${i}"]`).getAttribute("data-flink-id")).scrollIntoView(),window.prevFeature=i),y()}}}]);
//# sourceMappingURL=1.bundle.js.map