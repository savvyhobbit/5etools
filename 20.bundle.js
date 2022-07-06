(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{109:function(e,t,s){"use strict";var n=s(7),r=s(69);s(79),s(125);class i extends n.a{static get properties(){return{label:{type:String,value:""},icon:{type:String,value:""},svg:{type:String,value:""},background:{type:String,value:""},border:{type:String,value:""},svgFill:{type:String,value:""},svgStroke:{type:String,value:""}}}connectedCallback(){setTimeout(()=>{this.button=new r.a(this.$.button)},10)}_exists(e){return!!e}_styleStr(e,t,s){let n="";return e&&(n+=`background: ${e}; `),t&&(n+=`border: ${t}; `),n}_svgStyleStr(e,t){let s="";return e&&(s+=`fill: ${e}; `),t&&(s+=`stroke: ${t}; `),s}static get template(){return n.b`
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
    `}}customElements.define("dnd-button",i)},110:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return p})),s.d(t,"SKILL_TO_ATB_ABV",(function(){return c}));var n=s(1),r=s(71),i=s(5),a=s(30);function l(e){return o[e]?o[e]:0}const o={0:2,"1/8":2,"1/4":2,"1/2":2,1:2,2:2,3:2,4:2,5:3,6:3,7:3,8:3,9:4,10:4,11:4,12:4,13:5,14:5,15:5,16:5,17:6,18:6,19:6,20:6,21:7,22:7,23:7,24:7,25:8,26:8,27:8,28:8,29:9,30:9},c={athletics:"dex",acrobatics:"dex","sleight of hand":"dex",stealth:"dex",arcana:"int",history:"int",investigation:"int",nature:"int",religion:"int","animal handling":"wis",insight:"wis",medicine:"wis",perception:"wis",survival:"wis",deception:"cha",intimidation:"cha",performance:"cha",persuasion:"cha"};const d=new r.a;function p(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="margin-bottom_large stats-wrapper">\n\t\t<div id="stats" class="monster">\n\t\t\t<div id="name">\n\t\t\t\tName <span class="source" title="Source book">SRC</span>\n\t\t\t</div>\n\t\t\t<div id="sizetypealignment">\n\t\t\t\t<span id="size">Size</span> <span id="type">type</span>, <span id="alignment">alignment</span>\n\t\t\t</div>\n\t\t\t<div class="divider"></div>\n\t\t\t<div>\n\t\t\t\t<strong>Armor Class</strong> <span id="ac">## (source)</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Hit Points</strong> <span id="hp">hp</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Speed</strong> <span id="speed">30 ft.</span>\n\t\t\t</div>\n\t\t\t<div id="abilitynames">\n\t\t\t\t<div>STR</div>\n\t\t\t\t<div>DEX</div>\n\t\t\t\t<div>CON</div>\n\t\t\t\t<div>INT</div>\n\t\t\t\t<div>WIS</div>\n\t\t\t\t<div>CHA</div>\n\t\t\t</div>\n\t\t\t<div id="abilityscores">\n\t\t\t\t<div id="str"><span class="score">10</span> (<span class="mod">0</span>)</div>\n\t\t\t\t<div id="dex"><span class="score">10</span> (<span class="mod">0</span>)</div>\n\t\t\t\t<div id="con"><span class="score">10</span> (<span class="mod">0</span>)</div>\n\t\t\t\t<div id="int"><span class="score">10</span> (<span class="mod">0</span>)</div>\n\t\t\t\t<div id="wis"><span class="score">10</span> (<span class="mod">0</span>)</div>\n\t\t\t\t<div id="cha"><span class="score">10</span> (<span class="mod">0</span>)</div>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Saving Throws</strong> <span id="saves">Str +0</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Skills</strong> <span id="skills">Perception +0</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Damage Vulnerabilities</strong> <span id="dmgvuln">fire</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Damage Resistances</strong> <span id="dmgres">cold</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Damage Immunities</strong> <span id="dmgimm">lightning</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Condition Immunities</strong> <span id="conimm">exhaustion</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Senses</strong> <span id="senses">darkvision 30 ft.</span> passive Perception <span id="pp">10</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Languages</strong> <span id="languages">Common</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Challenge</strong> <span id="cr">1</span> (<span id="xp">450</span> XP)\n\t\t\t</div>\n\t\t\t<div id="traits">\n\t\t\t</div>\n\t\t\t<div id="actions">\n\t\t\t\t<span>Actions</span>\n\t\t\t</div>\n\t\t\t<div id="reactions">\n\t\t\t\t<span>Reactions</span>\n\t\t\t</div>\n\t\t\t<div id="legendaries">\n\t\t\t\t<span>Legendary Actions</span>\n\t\t\t</div>\n\t\t\t<div id="lairactions">\n\t\t\t\t<span>Lair Actions</span>\n\t\t\t</div>\n\t\t\t<div id="regionaleffects">\n\t\t\t\t<span>Regional Effects</span>\n\t\t\t</div>\n\t\t</div>\n\t\t<div id="output"></div>\n\t</div>';let s=[],r={};var o=e.name;window.monsterName=o;var p=e.source,u=e._pTypes.asText;p=i.a.sourceJsonToAbv(p),t.querySelector("#name").innerHTML=`<span class="stats-source source${p}" title="${i.a.sourceJsonToFull(p)}">${i.a.sourceJsonToAbv(p)}</span>`,t.querySelector("#size").innerHTML=i.a.sizeAbvToFull(e.size),t.querySelector("#type").innerHTML=u,t.querySelector("#alignment").innerHTML=e.alignment,t.querySelector("#ac").innerHTML=e.ac,t.querySelector("#hp").innerHTML=e.hp,t.querySelector("#speed").innerHTML=e.speed,t.querySelector("#str span.score").innerHTML=e.str,t.querySelector("#str span.mod").innerHTML=i.a.getAbilityModifier(e.str),t.querySelector("#dex span.score").innerHTML=e.dex,t.querySelector("#dex span.mod").innerHTML=i.a.getAbilityModifier(e.dex),t.querySelector("#con span.score").innerHTML=e.con,t.querySelector("#con span.mod").innerHTML=i.a.getAbilityModifier(e.con),t.querySelector("#int span.score").innerHTML=e.int,t.querySelector("#int span.mod").innerHTML=i.a.getAbilityModifier(e.int),t.querySelector("#wis span.score").innerHTML=e.wis,t.querySelector("#wis span.mod").innerHTML=i.a.getAbilityModifier(e.wis),t.querySelector("#cha span.score").innerHTML=e.cha,t.querySelector("#cha span.mod").innerHTML=i.a.getAbilityModifier(e.cha);var m=e.save;m?(t.querySelector("#saves").parentElement.style.display="block",t.querySelector("#saves").innerHTML=m):t.querySelector("#saves").parentElement.style.display="none";var v=e.skill;let y=0;var g;v?(t.querySelector("#skills").parentElement.style.display="block",t.querySelector("#skills").innerHTML=(g=v,Object.keys(g).map((function(e){return e.uppercaseFirst()+" "+g[e]})).join(", ")),v.perception&&(y=parseInt(v.perception))):t.querySelector("#skills").parentElement.style.display="none";var h=e.vulnerable;h?(t.querySelector("#dmgvuln").parentElement.style.display="block",t.querySelector("#dmgvuln").innerHTML=h):t.querySelector("#dmgvuln").parentElement.style.display="none";var b=e.resist;b?(t.querySelector("#dmgres").parentElement.style.display="block",t.querySelector("#dmgres").innerHTML=b):t.querySelector("#dmgres").parentElement.style.display="none";var f=e.immune;f?(t.querySelector("#dmgimm").parentElement.style.display="block",t.querySelector("#dmgimm").innerHTML=f):t.querySelector("#dmgimm").parentElement.style.display="none";var A=e.conditionImmune;A?(t.querySelector("#conimm").parentElement.style.display="block",t.querySelector("#conimm").innerHTML=A):t.querySelector("#conimm").parentElement.style.display="none";var S=e.senses;t.querySelector("#senses").innerHTML=S?S+", ":"";var w=e.passive||(10+y).toString;t.querySelector("#pp").innerHTML=w;var T=e.languages;t.querySelector("#languages").innerHTML=T||"—";var _=void 0===e.cr?"Unknown":e.cr;t.querySelector("#cr").innerHTML=_,t.querySelector("#xp").innerHTML=i.a.crToXp(_);var q=e.trait;if(t.querySelector("#traits").style.display="none",q&&q.length>0){t.querySelector("#traits").style.display="block";for(var x=q.length-1;x>=0;x--){for(var L=q[x].name,M=q[x].text,H="",j=0,k=0;k<M.length;k++)if(M[k]){var $="";1===++j&&($="first "),2===j&&($="second ");var O="";-1!==L.indexOf("Spellcasting")&&-1!==M[k].indexOf(": ")&&(O="spells"),-1!==L.indexOf("Variant")&&-1!==L.indexOf("Coven")&&-1!==M[k].indexOf(": ")&&(O="spells"),H=H+"<p class='"+$+O+"'>"+M[k].replace(/\u2022\s?(?=C|\d|At\swill)/g,"")+"</p>"}const e=Object(n.parseHTML)("<div class='trait'><div class='trait"+x+"'><span class='name'>"+L+".</span> "+H+"</div></div>");Object(n.jqAfter)(t.querySelector("#traits"),e);const s=t.querySelectorAll(".trait div p.spells");for(let e of s){let t=e.innerHTML;if("*"===t[0])return;t=t.split(": ")[1].split(/\, (?!\+|\dd|appears|inside gems)/g);for(let e=0;e<t.length;e++)t[e]="<a href='#/spells/"+encodeURIComponent(t[e].replace(/(\*)| \(([^\)]+)\)/g,"")).toLowerCase().replace("'","%27")+"_phb'>"+t[e]+"</a>",e!==t.length-1&&(t[e]=t[e]+", ");e.innerHTML=e.innerHTML.split(": ")[0]+": "+t.join("")}}}const C=e.action;if(C&&C.length)for(let e=C.length-1;e>=0;e--){const s=C[e].name,r=C[e].text;let i="",a=0;for(let e=0;e<r.length;e++){if(!r[e])continue;a++;let t="";1===a&&(t="first "),2===a&&(t="second "),i=i+"<p class='"+t+"'>"+r[e]+"</p>"}const l=Object(n.parseHTML)("<div class='action'><div class='action"+e+"'><span class='name'>"+s+".</span> "+i+"</div></div>");Object(n.jqAfter)(t.querySelector("#actions"),l)}const E=e.reaction;if(t.querySelector("#reactions").style.display="none",E&&(E.text||E.length)){if(t.querySelector("#reactions").style.display="block",!E.length){const e=E.name,s=E.text;let r="",i=0;for(let e=0;e<s.length;e++){if(!s[e])continue;i++;let t="";1===i&&(t="first "),2===i&&(t="second "),r=r+"<p class='"+t+"'>"+s[e]+"</p>"}const a=Object(n.parseHTML)("<div class='reaction'><div class='reaction0'><span class='name'>"+e+".</span> "+r+"</div></div>");Object(n.jqAfter)(t.querySelector("#reactions"),a)}if(E.length)for(let e=E.length-1;e>=0;e--){const s=E[e].name,r=E[e].text;let i="<span>"+r+"</span>";for(let e=1;e<r.length;e++)r[e]&&(i=i+"<p>"+r[e]+"</p>");const a=Object(n.parseHTML)("<div class='reaction'><div class='reaction"+e+"'><span class='name'>"+s+".</span> "+i+"</div></div>");Object(n.jqAfter)(t.querySelector("#reactions"),a)}}const F=e.legendary;if(t.querySelector("#legendaries").style.display="none",F){t.querySelector("#legendaries").style.display="block";let s=F.length>0;for(let e=F.length-1;e>=0;e--){const r=F[e].name?F[e].name+".":"",i=F[e].text;let a="",l=0;for(let e=0;e<i.length;e++){if(!i[e])continue;l++;let t="";1===l&&(t="first "),2===l&&(t="second "),a+=`<p class='${t}'>${i[e]}</p>`}const o=Object(n.parseHTML)(`<div class='legendary'><div class='legendary'><span class='name'>${r}</span> ${a}</div></div>`);Object(n.jqAfter)(t.querySelector("#legendaries"),o),(""===r.trim()||r.indexOf("Legendary Actions")>-1)&&(s=!1)}if(s){const s=e.legendaryActions||3,r=o.split(","),i=Object(n.parseHTML)(`<div class='legendary'><div class='legendary'><span class='name'></span> <span>${r[0]} can take ${s} legendary action${s>1?"s":""}, choosing from the options below. Only one legendary action can be used at a time and only at the end of another creature's turn. ${r[0]} regains spent legendary actions at the start of its turn.</span></div></div>`);Object(n.jqAfter)(t.querySelector("#legendaries"),i)}}function B(e,i){t.querySelector(`#${e}s`).style.display="block",r={type:"entries",entries:i},s=[],d.recursiveEntryRender(r,s);const a=Object(n.parseHTML)(`<div class='${e}'><div class='legendary'>${Object(n.utils_makeRoller)(s.join(""))}</div></div>`);Object(n.jqAfter)(t.querySelector(`#${e}s`),a)}function D(e,t,s,n){return`<span class='roller' title="${e} ${n?" save":""}" data-roll-alt="1d20;${s}" data-roll='1d20${t}' mode='bonus' profDiceStr="+${s}" profBonusStr="${t}">${t}</span>`}t.querySelector("#lairactions").style.display="none",t.querySelector("#regionaleffects").style.display="none",e.lairActions&&B("lairaction",e.lairActions),e.regionalEffects&&B("regionaleffect",e.regionalEffects),e.skill&&function(t){const s=t,n=s.innerHTML.split(/,\s*(?![^()]*\))/g).map(e=>e.trim()),r=[];n.map(t=>{const s=t.match(/(\-|\+)?\d+|(?:[^\+]|\n(?!\+))+/g),n=s[0].trim();var a="";s.map(t=>{if(t.match(/(\-|\+)?\d+/)){const r=Number(t),o=i.a.getAbilityModNumber(e[(s=n,c[s.toLowerCase().trim()])]),d=r-o,p=d===2*l(e.cr)?2:1;a+=D(n,"+"+r,`${p}d${d*(3-p)}${o>=0?"+":""}${o}`,!1)}else a+=t;var s}),r.push(a)}),s.innerHTML=r.join(", ")}(t.querySelector("#skills")),e.save&&function(t){const s=t,n=s.innerHTML.split(",").map(e=>e.trim()),r=[];n.map(t=>{const s=t.split("+").map(e=>e.trim()),n=Number(s[1]),a=i.a.getAbilityModNumber(e[s[0].toLowerCase()]),o=n-a,c=o===2*l(e.cr)?2:1,d="+"+n,p=`${c}d${o*(3-c)}${a>=0?"+":""}${a}`;r.push(s[0]+" "+D(s[0],d,p,!0))}),s.innerHTML=r.join(", ")}(t.querySelector("#saves"));const I=t.querySelectorAll("#stats p");for(let t of I){R(t);const s=N(t),n="bonus";t.innerHTML=t.innerHTML.replace(/(\-|\+)?\d+(?= to hit)/g,(function(t){const r=Number(t),i=l(e.cr),a=r-i;if(i>0){const e=`1d${2*i}${a>=0?"+":""}${a}`;return`<span class='roller' ${s?`title="${s}"`:""} data-roll-alt='1d20;${e}' data-roll='1d20${t}' mode='${n}' profDiceStr="+${e}" profBonusStr="${t}">${t}</span>`}return`<span class='roller' data-roll='1d20${t}'>${t}</span>`})),t.innerHTML=t.innerHTML.replace(/DC\s*(\d+)/g,(function(t,r){const i=Number(r),a=l(e.cr);if(a>0){const e=i-a,t=`1d${2*a}${e>=0?"+":""}${e}`;return`DC <span class="dc-roller" ${s?`title="${s}"`:""} mode="${n}" data-roll-alt="${t}" data-bonus="${r}" profDiceStr="+${t}" profBonusStr="${r}">${r}</span>`}return t}))}function R(e){e.innerHTML=e.innerHTML.replace(/\d+d\d+(\s?(\-|\+)\s?\d+\s?)?/g,(function(t){const s=N(e);return`<span class='roller' ${s?`title="${s}"`:""} data-roll='${t}'>${t}</span>`}))}function N(e){let t=e.parentElement.querySelector(".name");return t&&(t=t.innerHTML,t&&(t=t.substring(0,t.length-1).trim())),t}R(t.querySelector("#stats #hp"));let J=t.querySelectorAll("#stats span.roller");for(let e of J)e.addEventListener("click",()=>{const t=e;let s,n;if("dice"===t.getAttribute("mode")){s=t.getAttribute("data-roll-alt").replace(/\s+/g,"");const e=s.split(";");s=s.replace(";","+"),n=a.a.roll(e[0]);const r=a.a.roll(e[1]);n.rolls=n.rolls.concat(r.rolls),n.total+=r.total}else s=t.getAttribute("data-roll").replace(/\s+/g,""),n=a.a.roll(s);G(t,s,n)});let P=t.querySelectorAll("#stats span.roller");for(let e of P){const t=e;let s,n;"dice"===t.getAttribute("mode")&&(s=t.getAttribute("data-roll-alt").replace(/\s+/g,""),n=a.a.roll(s),G(t,s,n))}function G(e,s,r){const i=window.monsterName,a=Object(n.parseHTML)(`<span>${i}: <em>${s}</em> rolled ${e.getAttribute("title")?e.getAttribute("title")+" ":""}for <strong>${r.total}</strong> (<em>${r.rolls.join(", ")}</em>)<br></span>`),l=t.querySelector("#output");Object(n.jqPrepend)(l,a),l.style.display="block",6===l.children.length&&l.children[5].remove()}}},111:function(e,t,s){"use strict";s.r(t),s.d(t,"onLoad",(function(){return l}));var n=s(1),r=s(155),i=s(152),a=s(30);function l(e){let t=e.querySelector("div#output"),s=0,l=-1,o=new r.a(e.querySelector(".mdc-text-field"));new i.a(e.querySelector(".mdc-notched-outline")),o.useNativeValidation=!1;let c=r=>{let i=a.a.roll(r.replace(/\s/g,""));if(i){let a=Object(n.parseHTML)(`<div>\n        <em><a class='roll' data-roll='${r}'>${r}</a></em> rolled for <strong>${i.total}</strong>${i.rolls.length>1?`<br>(${i.rolls.join(", ")})`:""}\n        </div>`);Object(n.jqPrepend)(t,a),t.style.display=null,p(a),s+=i.total,e.querySelector("#total").innerHTML=s,e.querySelector(".roll-total-wrap").style.display=null,e.querySelector(".roll-clear").style.display=null,o.value=""}else e.querySelector(".dice-field-container .mdc-text-field").classList.add("error")};e.querySelector(".roll-clear").addEventListener("click",n=>{n.preventDefault(),l=-1,t.innerHTML="",e.querySelector(".roll-total-wrap").style.display="none",e.querySelector(".roll-clear").style.display="none",s=0}),e.querySelector(".roll-submit").addEventListener("click",t=>{t.preventDefault(),l=-1,e.querySelector(".dice-field-container .mdc-text-field").classList.remove("error");let s=e.querySelector(".roll-field").value;s?c(s):e.querySelector(".dice-field-container .mdc-text-field").classList.add("error"),e.querySelector(".roll-field").focus()}),e.querySelector(".roll-field").addEventListener("keydown",t=>{let s=t.keyCode||t.which,n=e.querySelectorAll("#output > div").length;38===s?(t.preventDefault(),l+1<n&&(l++,o.value=e.querySelector(`#output div:eq(${l}) a.roll`).getAttribute("data-roll"))):40===s?(t.preventDefault(),l-1>-1&&(l--,o.value=e.querySelector(`#output div:eq(${l}) a.roll`).getAttribute("data-roll"))):13===s?(t.preventDefault(),e.querySelector(".roll-submit").click()):190===s||188===s?(t.preventDefault(),o.value=o.value+"d"):32!==s&&189!==s&&187!==s||(t.preventDefault(),o.value=o.value+" + ")}),e.querySelector(".roll-field").addEventListener("submit",t=>{t.preventDefault(),e.querySelector(".roll-submit").click()}),e.querySelector(".roll-field").addEventListener("textInput",e=>{var t=e.originalEvent.data;!t||"."!==t&&","!==t?!t||" "!==t&&"+"!==t||(e.preventDefault(),o.value=o.value+"+"):(e.preventDefault(),o.value=o.value+"d")}),e.querySelector(".roll-field").addEventListener("focus",t=>{e.querySelector(".dice-field-label").style.display=null}),e.querySelector(".roll-field").addEventListener("blur",t=>{e.querySelector(".dice-field-label").style.display="none"});let d=e.querySelectorAll(".roll[data-roll]");for(let e of d)p(e);function p(e){e.addEventListener("click",e=>{e.preventDefault();let t=e.target.closest(".roll").getAttribute("data-roll");t&&c(t)})}}},112:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return l}));var n=s(71),r=s(5),i=s(1);const a=new n.a;function l(e,t,s){!function(e){if(e.hasParsed)return;if(e.hasParsed=!0,e.noDisplay)return;"GV"===e.type&&(e.category="Generic Variant");void 0===e.category&&(e.category="Other");void 0===e.entries?e.entries=[]:e.entries=Object(i.cloneDeep)(e.entries);if(e.type&&window.itemTypeList[e.type])for(let t=0;t<window.itemTypeList[e.type].entries.length;t++)e.entries.push(window.itemTypeList[e.type].entries[t]);if(e.property){const t=e.property.split(",");for(let s=0;s<t.length;s++)if(window.itemPropertyList[t[s]].entries)for(let n=0;n<window.itemPropertyList[t[s]].entries.length;n++)e.entries.push(window.itemPropertyList[t[s]].entries[n])}e.armor?(e.resist&&e.entries.push("You have resistance to "+e.resist+" damage while you wear this armor."),e.armor&&e.stealth&&e.entries.push("The wearer has disadvantage on Stealth (Dexterity) checks."),"HA"===e.type&&e.strength&&e.entries.push("If the wearer has a Strength score lower than "+e.strength+", their speed is reduced by 10 feet.")):e.resist&&("P"===e.type&&e.entries.push("When you drink this potion, you gain resistance to "+e.resist+" damage for 1 hour."),"RG"===e.type&&e.entries.push("You have resistance to "+e.resist+" damage while wearing this ring."));"SCF"===e.type&&("arcane"===e.scfType&&e.entries.push("An arcane focus is a special item designed to channel the power of arcane spells. A sorcerer, warlock, or wizard can use such an item as a spellcasting focus, using it in place of any material component which does not list a cost."),"druid"===e.scfType&&e.entries.push("A druid can use such a druidic focus as a spellcasting focus, using it in place of any material component that does not have a cost."),"holy"===e.scfType&&(e.entries.push("A holy symbol is a representation of a god or pantheon."),e.entries.push("A cleric or paladin can use a holy symbol as a spellcasting focus, using it in place of any material components which do not list a cost. To use the symbol in this way, the caster must hold it in hand, wear it visibly, or bear it on a shield.")))}(e);(t.querySelector(".selection-wrapper")||t).innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="margin-bottom_small">\n\t\t\t<span class="type"></span><span class="rarity"></span>\n\t\t\t<span class="attunement"></span>\n\t\t</div>\n\t\t<div class="margin-bottom_small">\n\t\t\t<span class="value"></span><span class="weight"></span>\n\t\t</div>\n\t\t<div class="margin-bottom_small">\n\t\t\t<span class="damage"></span>\n\t\t\t<span class="damageType"></span>\n\t\t\t<span class="properties"></span>\n\t\t</div>\n\t\t<div class="text"></div>\n\t\t<div class="margin-bottom_small">Source: <span class="source"></span></div>\n\t</div>';const n=e.source,l=r.a.sourceJsonToFull(n);t.querySelector(".stats-wrapper .source").innerHTML=`${l}, page ${e.page}`,t.querySelector(".stats-wrapper .value").innerHTML=e.value?e.value+(e.weight?", ":""):"",t.querySelector(".stats-wrapper .weight").innerHTML=e.weight?e.weight+(1==e.weight?" lb.":" lbs."):"",t.querySelector(".stats-wrapper .rarity").innerHTML=(e.tier?", "+e.tier:"")+(e.rarity?", "+e.rarity:""),t.querySelector(".stats-wrapper .attunement").innerHTML=e.reqAttune?e.reqAttune:"",t.querySelector(".stats-wrapper .type").innerHTML=e.typeText,t.querySelector(".stats-wrapper .damage").innerHTML="",t.querySelector(".stats-wrapper .damageType").innerHTML="";const o=e.type||"";if(e.weaponCategory)if(e.damages&&e.damages.length)for(let s=0;s<e.damages.length;s++){const n=e.damages[s],a=s===e.damages.length-1;n.roll&&n.type&&(t.querySelector(".stats-wrapper .damage").innerHTML+=`<span>${Object(i.utils_makeRoller)(n.roll)} ${r.a.dmgTypeToFull(n.type)}</span>${a?"":" + "}`)}else e.dmg1&&(t.querySelector(".stats-wrapper .damage").innerHTML=Object(i.utils_makeRoller)(e.dmg1)),e.dmgType&&(t.querySelector(".stats-wrapper .damageType").innerHTML=r.a.dmgTypeToFull(e.dmgType));else if("LA"===o||"MA"===o||"HA"===o)t.querySelector(".stats-wrapper .damage").innerHTML="AC "+e.ac+("LA"===o?" + Dex":"MA"===o?" + Dex (max 2)":"");else if("S"===o)t.querySelector(".stats-wrapper .damage").innerHTML="AC +"+e.ac;else if("MNT"===o||"VEH"===o){const s=e.speed,n=e.carryingcapacity;s&&t.querySelector(".stats-wrapper .damage").append("Speed="+s),s&&n&&t.querySelector(".stats-wrapper .damage").append("MNT"===o?", ":"<br>"),n&&(t.querySelector(".stats-wrapper .damage").append("Carrying Capacity="+n),-1===n.indexOf("ton")&&-1===n.indexOf("passenger")&&t.querySelector(".stats-wrapper .damage").append(1==n?" lb.":" lbs."))}if(t.querySelector(".stats-wrapper .properties").innerHTML="",e.property){const s=e.property.split(",");for(let n=0;n<s.length;n++){const r=s[n];let i=window.itemPropertyList[r].name;"V"===r&&e.dmg2&&(i=`${i} (${e.dmg2})`),"T"!==r&&"A"!==r&&"AF"!==r||(i=`${i} (${e.range}ft.)`),"RLD"===r&&(i=`${i} (${e.reload} shots)`),i=(n>0?", ":e.dmg1?"- ":"")+i,t.querySelector(".stats-wrapper .properties").append(i)}}const c={type:"entries",entries:e.entries},d=[];a.recursiveEntryRender(c,d,1),t.querySelector(".stats-wrapper .text").innerHTML=Object(i.utils_makeRoller)(d.join("")).split(e.name.toLowerCase()).join("<i>"+e.name.toLowerCase()+"</i>"),s&&t.querySelector(".margin-bottom_small").remove()}},113:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return a})),s.d(t,"spellHtml",(function(){return l}));var n=s(71),r=s(5);const i=new n.a;function a(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t</div>';const s=l(e);t.querySelector(".stats-wrapper").innerHTML=s}function l(e){const t=[];if(t.push(`<div class="margin-bottom_med"><span class="stats-source source${e.source}" title="${r.a.sourceJsonToFull(e.source)}">${r.a.sourceJsonToAbv(e.source)}</div>`),t.push(`<div class="margin-bottom_med"><span>${r.a.spLevelSchoolMetaToFull(e.level,e.school,e.meta)}</span></div>`),t.push(`<div class="margin-bottom_med"><span class="stat-name">Casting Time: </span>${r.a.spTimeListToFull(e.time)}</div>`),t.push(`<div class="margin-bottom_med"><span class="stat-name">Range: </span>${r.a.spRangeToFull(e.range)}</div>`),t.push(`<div class="margin-bottom_med"><span class="stat-name">Components: </span>${r.a.spComponentsToFull(e.components)}</div>`),t.push(`<div class="margin-bottom_med"><span class="stat-name">Duration: </span>${r.a.spDurationToFull(e.duration)}</div>`),t.push("<div class='text'>"),i.recursiveEntryRender({type:"entries",entries:e.entries},t,1),e.entriesHigherLevel){const s={type:"entries",entries:e.entriesHigherLevel};i.recursiveEntryRender(s,t,2)}if(t.push("</div>"),t.push(`<div class="margin-bottom_med"><span class="stat-name">Classes: </span>${r.a.spMainClassesToFull(e.classes)}</div>`),e.classes.fromSubclass){const s=r.a.spSubclassesToCurrentAndLegacyFull(e.classes);t.push(`<div class="margin-bottom_med"><span class="stat-name">Subclasses: </span>${s[0]}</div>`),s[1]&&t.push(`<div class="mdc-theme--text-disabled-on-background margin-bottom_med"><span class="stat-name">Subclasses (legacy): </span>${s[1]}</div>`)}return e.scrollNote&&(t.push('<div class="mdc-theme--text-disabled-on-background">'),i.recursiveEntryRender("{@italic Note: Both the {@class Fighter (Eldritch Knight)} and the {@class Rogue (Arcane Trickster)} spell lists include all {@class Wizard} spells. Spells of 5th level or higher may be cast with the aid of a spell scroll or similar.}",t,2),t.push("</div>")),t.join("")}},114:function(e,t,s){var n={"./backgrounds.js":115,"./bestiary.js":110,"./classes.js":129,"./conditions.js":116,"./cults.js":117,"./dice.js":111,"./feats.js":118,"./features.js":119,"./items.js":112,"./psionics.js":120,"./races.js":121,"./rewards.js":122,"./spells.js":113,"./utils.js":1,"./variantrules.js":123};function r(e){return i(e).then(s)}function i(e){return Promise.resolve().then((function(){if(!s.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}))}r.keys=function(){return Object.keys(n)},r.resolve=i,r.id=114,e.exports=r},115:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return c}));var n=s(1),r=s(5),i=s(71),a=s(26);const l=new i.a,o='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="source margin-bottom_small"></div>\n\t\t<div class="stats margin-bottom_small"></div>\n\t\t<div class="table-container collapse collapse--left-arrow disabled">\n\t\t\t<div class="collapse-toggle">\n\t\t\t\t<div class="mdc-list-item stat-name">Suggested Characteristics</div>\n\t\t\t</div>\n\t\t\t<div class="collapse-wrapper">\n\t\t\t\t<div class="collapse-list"></div>\n\t\t\t</div>\n\t\t</div>\n\t</div>';function c(e,t,s){for(t.querySelector(".selection-wrapper")?t.querySelector(".selection-wrapper").innerHTML=o:t.innerHTML=o;e._copy;){e=Object(a.b)(s,Object(n.encodeForHash)([e._copy.name,e._copy.source]))}const i=e.source,c=r.a.sourceJsonToAbv(i),d=r.a.sourceJsonToFull(i),p=t.querySelector(".stats-wrapper .source");p.classList.add("source"+c),p.setAttribute("title",d),p.innerHTML=c;const u=e.entries;if(u&&u.length)for(let e=u.length-1;e>=0;e--){let s=u[e],r=[];l.recursiveEntryRender(s,r,0);let i=r.join(" ");if("Suggested Characteristics"===s.name){t.querySelector(".stats-wrapper .table-container").classList.remove("disabled");const e=t.querySelector(".stats-wrapper .table-container .collapse-list"),s=Object(n.parseHTML)(i);s.querySelector(".stat-name").remove(),Object(n.jqPrepend)(e,s)}else{const e=t.querySelector(".stats-wrapper .stats");Object(n.jqPrepend)(e,Object(n.parseHTML)(i))}}window.setTimeout(()=>{let e=t.querySelector(".stats-wrapper .table-container .collapse-list");e.style["margin-top"]="-"+Object(n.jqHeight)(e)+"px"},0)}},116:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return r}));var n=s(1);function r(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="text"></div>\n\t</div>',t.querySelector(".stats-wrapper .text").innerHTML=Object(n.utils_combineText)(e.entries,"p")}},117:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return r}));var n=s(1);function r(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="text"></div>\n\t</div>';const s=e.text;let r="";void 0!==e.goal&&(r+=Object(n.utils_combineText)(e.goal.text,"p","<span class='stat-name'>Goals:</span> ")),void 0!==e.cultists&&(r+=Object(n.utils_combineText)(e.cultists.text,"p","<span class='stat-name'>Typical Cultist:</span> ")),void 0!==e.signaturespells&&(r+=Object(n.utils_combineText)(e.signaturespells.text,"p","<span class='stat-name'>Signature Spells:</span> ")),r+=Object(n.utils_combineText)(s,"p"),t.querySelector(".stats-wrapper .text").innerHTML=r}},118:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return l}));var n=s(1),r=s(64),i=s(5);const a=new(s(71).a);function l(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="source margin-bottom_small"></div>\n\t\t<div class="prerequisite margin-bottom_small"></div>\n\t\t<div class="text"></div>\n\t</div>';let s=t.querySelector(".stats-wrapper .source");s.classList.add("source"+e.source),s.setAttribute("title",i.a.sourceJsonToFull(e.source)),s.innerHTML=""+i.a.sourceJsonToAbv(e.source);const l=Object(n.utils_makePrerequisite)(e.prerequisite);if(t.querySelector(".stats-wrapper .prerequisite").innerHTML=l?"Prerequisite: "+l:"",e.ability)for(let t of e.entries)"list"!==t.type||t.hasabilityitem||(t.hasabilityitem=!0,t.items.unshift(Object(r.b)(e.ability)));if(e.entries.length){let s=[];for(let t of e.entries)a.recursiveEntryRender(t,s,0);t.querySelector(".stats-wrapper .text").innerHTML=s.join(" ")}}},119:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return l}));var n=s(1),r=s(64),i=s(5);const a=new(s(71).a);function l(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n    <div class="source margin-bottom_small"></div>\n    <div class="type margin-bottom_small"></div>\n\t\t<div class="prerequisite margin-bottom_small"></div>\n\t\t<div class="text"></div>\n\t</div>';let s=t.querySelector(".stats-wrapper .source");s.classList.add("source"+e.source),s.setAttribute("title",i.a.sourceJsonToFull(e.source)),s.innerHTML=""+i.a.sourceJsonToAbv(e.source);let l=e.featureType?Array.isArray(e.featureType)?e.featureType:[e.featureType]:[];t.querySelector(".stats-wrapper .type").innerHTML=Object(n.utils_joinPhraseArray)(l.map(e=>i.a.featureJsonToAbv(e)),", "," and ");const o=Object(n.utils_makePrerequisite)(e.prerequisite);if(t.querySelector(".stats-wrapper .prerequisite").innerHTML=o?"Prerequisite: "+o:"",e.ability)for(let t of e.entries)"list"!==t.type||t.hasabilityitem||(t.hasabilityitem=!0,t.items.unshift(Object(r.b)(e.ability)));if(e.entries.length){let s=[];for(let t of e.entries)a.recursiveEntryRender(t,s,0);t.querySelector(".stats-wrapper .text").innerHTML=s.join(" ")}}},120:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return i}));var n=s(1),r=s(0);function i(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="order margin-bottom_small"></div>\n\t\t<div class="duration margin-bottom_small"></div>\n\t\t<div class="text"></div>\n\t</div>';const s=t.querySelector(".stats-wrapper .order"),i=t.querySelector(".stats-wrapper .duration"),a=t.querySelector(".stats-wrapper .text");"T"===e.type?(s.innerHTML=Object(n.parse_psionicTypeToFull)(e.type),a.innerHTML=Object(n.utils_combineText)(e.text,r.l),i.innerHTML=r.qc):"D"===e.type&&function(){function t(t){const s=Object(n.utils_combineText)(e.modes[t].text,r.l,i(e.modes[t]));if(void 0===e.modes[t].submodes)return s;return`${s}${function(){const s=[],a=e.modes[t].submodes;for(let e=0;e<a.length;++e)s.push(Object(n.utils_combineText)(a[e].text,r.l,i(a[e],!0)));return s.join(r.qc)}()}`;function i(e,t){t=null!=t&&t;const s=[];s.push(e.title);const n=function(){const t=[];e.cost&&t.push(function(){const t=e.cost.min,s=e.cost.max;return(t===s?t:`${t}-${s}`)+" psi"}());e.concentration&&t.push(`conc., ${e.concentration.duration} ${e.concentration.unit}.`);return 0===t.length?null:`(${t.join("; ")})`}();return null!==n&&s.push(n),`<span class='stat-name'>${s.join(" ")}.</span> `}}s.innerHTML=`${e.order} ${Object(n.parse_psionicTypeToFull)(e.type)}`,a.innerHTML=function(){const s=[];for(let n=0;n<e.modes.length;++n)s.push(t(n));return`<p>${e.description}</p><p><span class='stat-name'>Psycic Focus.</span> ${e.focus}</p>${s.join(r.qc)}`}(),i.innerHTML=void 0===e.duration?r.qc:void 0}()}},121:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return o}));var n=s(1),r=s(71),i=s(5),a=s(64);const l='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="source margin-bottom_small"></div>\n\t\t<div class="size margin-bottom_small"></div>\n\t\t<div class="ability margin-bottom_small"></div>\n\t\t<div class="speed margin-bottom_small"></div>\n\t\t<div class="stats"></div>\n\t</div>';function o(e,t){t.querySelector(".selection-wrapper")?t.querySelector(".selection-wrapper").innerHTML=l:t.innerHTML=l;const s=t.querySelector(".stats-wrapper .source");s.classList.add("source"+e.source),s.setAttribute("title",i.a.sourceJsonToFull(e.source)),s.innerHTML=""+i.a.sourceJsonToAbv(e.source);const o=i.a.sizeAbvToFull(e.size);t.querySelector(".stats-wrapper .size").innerHTML=o,""===o&&(t.querySelector(".stats-wrapper .size").style.display="none");const c=Object(a.c)(e.ability);let d;t.querySelector(".stats-wrapper .ability").innerHTML=c,e.speed&&(e.speed.walk?(d=e.speed.walk+" ft.",e.speed.climb&&(d+=`, climb ${e.speed.climb} ft.`),e.speed.fly&&(d+=`, fly ${e.speed.fly} ft.`)):d=e.speed+("Varies"===e.speed?"":" ft. ")),t.querySelector(".stats-wrapper .speed").innerHTML=d,""===d&&(t.querySelector(".stats-wrapper .speed").style.display="none");const p=e.trait;if(p){let e="<div class='stat-item'>";for(let t=0;t<p.length;++t){const s=`<span class='stat-name'>${p[t].name}.</span> `;e+=Object(n.utils_combineText)(p[t].text,"p",s)}e+="</div>",t.querySelector(".stats-wrapper .stats").innerHTML=e}else if(e.entries){const s=[],n={type:"entries",entries:e.entries};(new r.a).recursiveEntryRender(n,s,1,"<div class='renderer-output'>","</div>",!0),t.querySelector(".stats-wrapper .stats").innerHTML=s.join("")}}},122:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return i}));var n=s(1),r=s(5);function i(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="source margin-bottom_small"></div>\n\t\t<div class="text"></div>\n\t</div>';const s=t.querySelector(".stats-wrapper .source");s.classList.add("source"+e.source),s.setAttribute("title",r.a.sourceJsonToFull(e.source)),s.innerHTML=""+r.a.sourceJsonToAbv(e.source);const i=e.text;let a="";void 0!==e.ability&&(a+=Object(n.utils_combineText)(e.ability.text,"p","<span class='stat-name'>Ability Score Adjustment:</span> ")),void 0!==e.signaturespells&&(a+=Object(n.utils_combineText)(e.signaturespells.text?e.signaturespells.text:"None","p","<span class='stat-name'>Signature Spells:</span> ")),a+=Object(n.utils_combineText)(i,"p"),t.querySelector(".stats-wrapper .text").innerHTML="<tr class='text'><td colspan='6'>"+a+"</td></tr>"}},123:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return a}));var n=s(71),r=s(5);const i=new n.a;function a(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="source margin-bottom_small"></div>\n\t\t<div class="text"></div>\n\t</div>';const s=t.querySelector(".stats-wrapper .source");s.classList.add("source"+e.source),s.setAttribute("title",r.a.sourceJsonToFull(e.source)),s.innerHTML=""+r.a.sourceJsonToAbv(e.source);const n=[];i.recursiveEntryRender(e,n),t.querySelector(".stats-wrapper .text").innerHTML=n.join("")}},124:function(e,t,s){"use strict";var n=s(7),r=(s(81),s(82),s(126),s(80),s(73),s(65),s(13)),i=s(33),a=s(15),l=s(8);
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
class o extends class extends n.a{}{static get template(){return r.a`
    <style>
      :host {
        display: inline-flex;
        max-width: 100%;
      }

      #filter {
        width: 100%;
        box-sizing: border-box;
      }
    </style>
    <slot name="filter">
      <vaadin-text-field id="filter" value="{{value}}"></vaadin-text-field>
    </slot>
`}static get is(){return"vaadin-grid-filter"}static get properties(){return{path:String,value:{type:String,notify:!0},_connected:Boolean}}connectedCallback(){super.connectedCallback(),this._connected=!0}static get observers(){return["_filterChanged(path, value, _connected)"]}ready(){super.ready();const e=Object(i.a)(this).firstElementChild;e&&"filter"!==e.getAttribute("slot")&&(console.warn('Make sure you have assigned slot="filter" to the child elements of <vaadin-grid-filter>'),e.setAttribute("slot","filter"))}_filterChanged(e,t,s){void 0!==e&&void 0!==t&&s&&(void 0===this._previousValue&&""===t||(this._previousValue=t,this._debouncerFilterChanged=a.a.debounce(this._debouncerFilterChanged,l.d.after(200),()=>{this.dispatchEvent(new CustomEvent("filter-changed",{bubbles:!0}))})))}focus(){this.$.filter.focus()}}customElements.define(o.is,o);var c=s(127);
/**
@license
Copyright (c) 2018 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/class d extends c.a{static get template(){return r.a`
    <template class="header" id="headerTemplate">
      <vaadin-grid-filter path="[[path]]" value="[[_filterValue]]">
        <vaadin-text-field theme="small" focus-target="" style="max-width: 100%;" slot="filter" value="{{_filterValue}}" label="[[_getHeader(header, path)]]"></vaadin-text-field>
      </vaadin-grid-filter>
    </template>
`}static get is(){return"vaadin-grid-filter-column"}static get properties(){return{path:String,header:String}}_prepareHeaderTemplate(){const e=this._prepareTemplatizer(this.$.headerTemplate);return e.templatizer.dataHost=this,e}_getHeader(e,t){return e||this._generateHeader(t)}}customElements.define(d.is,d);s(45);const p=r.a`<dom-module id="lumo-grid-sorter" theme-for="vaadin-grid-sorter">
  <template>
    <style>
      :host {
        justify-content: flex-start;
        align-items: baseline;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      [part="content"] {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      [part="indicators"] {
        margin-left: var(--lumo-space-s);
      }

      :host(:not([direction])) [part="indicators"]::before {
        opacity: 0.2;
      }

      :host([direction]) {
        color: var(--lumo-primary-text-color);
      }

      [part="order"] {
        font-size: var(--lumo-font-size-xxs);
        line-height: 1;
      }

      /* RTL specific styles */

      :host([dir="rtl"]) [part="indicators"] {
        margin-right: var(--lumo-space-s);
        margin-left: 0;
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild(p.content);s(31);var u=s(19),m=s(41);
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
const v=document.createElement("template");v.innerHTML="<custom-style>\n  <style>\n    @font-face {\n      font-family: 'vaadin-grid-sorter-icons';\n      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAQwAA0AAAAABuwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAEFAAAABkAAAAcfep+mUdERUYAAAP4AAAAHAAAAB4AJwAOT1MvMgAAAZgAAAA/AAAAYA8TBPpjbWFwAAAB7AAAAFUAAAFeF1fZ4mdhc3AAAAPwAAAACAAAAAgAAAAQZ2x5ZgAAAlgAAABcAAAAnMvguMloZWFkAAABMAAAAC8AAAA2C5Ap72hoZWEAAAFgAAAAHQAAACQGbQPHaG10eAAAAdgAAAAUAAAAHAoAAABsb2NhAAACRAAAABIAAAASAIwAYG1heHAAAAGAAAAAFgAAACAACwAKbmFtZQAAArQAAAECAAACZxWCgKhwb3N0AAADuAAAADUAAABZCrApUXicY2BkYGAA4rDECVrx/DZfGbhZGEDgyqNPOxH0/wNMq5kPALkcDEwgUQBWRA0dAHicY2BkYGA+8P8AAwMLAwgwrWZgZEAFbABY4QM8AAAAeJxjYGRgYOAAQiYGEICQSAAAAi8AFgAAeJxjYGY6yziBgZWBgWkm0xkGBoZ+CM34msGYkZMBFTAKoAkwODAwvmRiPvD/AIMDMxCD1CDJKjAwAgBktQsXAHicY2GAAMZQCM0EwqshbAALxAEKeJxjYGBgZoBgGQZGBhCIAPIYwXwWBhsgzcXAwcAEhIwMCi+Z/v/9/x+sSuElA4T9/4k4K1gHFwMMMILMY2QDYmaoABOQYGJABUA7WBiGNwAAJd4NIQAAAAAAAAAACAAIABAAGAAmAEAATgAAeJyNjLENgDAMBP9tIURJwQCMQccSZgk2i5fIYBDAidJjycXr7x5EPwE2wY8si7jmyBNXGo/bNBerxJNrpxhbO3/fEFpx8ZICpV+ghxJ74fAMe+h7Ox14AbrsHB14nK2QQWrDMBRER4mTkhQK3ZRQKOgCNk7oGQqhhEIX2WSlWEI1BAlkJ5CDdNsj5Ey9Rncdi38ES+jzNJo/HwTgATcoDEthhY3wBHc4CE+pfwsX5F/hGe7Vo/AcK/UhvMSz+mGXKhZU6pww8ISz3oWn1BvhgnwTnuEJf8Jz1OpFeIlX9YULDLdFi4ASHolkSR0iuYdjLak1vAequBhj21D61Nqyi6l3qWybGPjySbPHGScGJl6dP58MYcQRI0bts7mjebBqrFENH7t3qWtj0OuqHnXcW7b0HOTZFnKryRGW2hFX1m0O2vEM3opNMfTau+CS6Z3Vx6veNnEXY6jwDxhsc2gAAHicY2BiwA84GBgYmRiYGJkZmBlZGFkZ2djScyoLMgzZS/MyDQwMwLSrpYEBlIbxjQDrzgsuAAAAAAEAAf//AA94nGNgZGBg4AFiMSBmYmAEQnYgZgHzGAAD6wA2eJxjYGBgZACCKyoz1cD0o087YTQATOcIewAAAA==) format('woff');\n      font-weight: normal;\n      font-style: normal;\n    }\n  </style>\n</custom-style>",document.head.appendChild(v.content);class y extends(Object(u.a)(Object(m.a)(n.a))){static get template(){return r.a`
    <style>
      :host {
        display: inline-flex;
        cursor: pointer;
        max-width: 100%;
      }

      [part="content"] {
        flex: 1 1 auto;
      }

      [part="indicators"] {
        position: relative;
        align-self: center;
        flex: none;
      }

      [part="order"] {
        display: inline;
        vertical-align: super;
      }

      [part="indicators"]::before {
        font-family: 'vaadin-grid-sorter-icons';
        display: inline-block;
      }

      :host(:not([direction])) [part="indicators"]::before {
        content: "\\e901";
      }

      :host([direction=asc]) [part="indicators"]::before {
        content: "\\e900";
      }

      :host([direction=desc]) [part="indicators"]::before {
        content: "\\e902";
      }
    </style>

    <div part="content">
      <slot></slot>
    </div>
    <div part="indicators">
      <span part="order">[[_getDisplayOrder(_order)]]</span>
    </div>
`}static get is(){return"vaadin-grid-sorter"}static get properties(){return{path:String,direction:{type:String,reflectToAttribute:!0,notify:!0,value:null},_order:{type:Number,value:null},_isConnected:{type:Boolean,value:!1}}}static get observers(){return["_pathOrDirectionChanged(path, direction, _isConnected)","_directionOrOrderChanged(direction, _order)"]}ready(){super.ready(),this.addEventListener("click",this._onClick.bind(this))}connectedCallback(){super.connectedCallback(),this._isConnected=!0}disconnectedCallback(){super.disconnectedCallback(),this._isConnected=!1}_pathOrDirectionChanged(e,t,s){void 0!==e&&void 0!==t&&void 0!==s&&s&&this.dispatchEvent(new CustomEvent("sorter-changed",{bubbles:!0,composed:!0}))}_getDisplayOrder(e){return null===e?"":e+1}_onClick(e){const t=this.getRootNode().activeElement;this!==t&&this.contains(t)||(e.preventDefault(),"asc"===this.direction?this.direction="desc":"desc"===this.direction?this.direction=null:this.direction="asc")}_directionOrOrderChanged(e,t){void 0!==e&&void 0!==t&&(/^((?!chrome|android).)*safari/i.test(navigator.userAgent)&&this.root&&this.root.querySelectorAll("*").forEach((function(e){e.style["-webkit-backface-visibility"]="visible",e.style["-webkit-backface-visibility"]=""})))}}customElements.define(y.is,y);s(63),s(72),s(78),s(109);var g=s(12),h=s(1),b=s(5),f=s(0);class A extends n.a{static get properties(){return{columns:{type:Array},listItems:{type:Array},filters:{type:Array},isMobile:{type:Boolean},searchString:{type:String},selectedFilters:{type:Object}}}ready(){super.ready(),setTimeout(()=>{this.$.grid.addEventListener("active-item-changed",e=>{const t=e.detail.value;this.$.grid.selectedItems=t?[t]:[];const s=[t.name];t.source&&s.push(t.source),Object(g.f)(Object(h.encodeForHash)(s))})},0),window.addEventListener("resize",()=>{this._checkBreakpoint(),this._adjustHeight()}),this._checkBreakpoint(),this._adjustHeight(),setInterval(()=>{this._checkBreakpoint(),this._adjustHeight()},500)}_checkBreakpoint(){this.isMobile=window.innerWidth<=920}_adjustHeight(){if(window.innerWidth<921){const e=this.$.grid.getBoundingClientRect().top;e&&(this.$.grid.style.height=window.innerHeight-e-85+"px")}else this.$.grid.style.height="600px"}_renderPath(e){return"render-"+e}_getPathValue(e,t){return e&&e["render-"+t.id]}_renderCol(e){return!this.isMobile||!e.hideMobile}_filterOptions(e,t){let s=[{label:"",value:""}],n=!1;if(e&&e.length>0)if(e=e.flat(),"proficiencies"===t){n=!0;const e=Object.keys(b.a.SKILL_JSON_TO_FULL).map(e=>({label:e,value:e}));s=s.concat(e)}else if("ability"===t){n=!0;const e=Object.keys(b.a.ATB_ABV_TO_FULL).map(e=>({label:b.a.ATB_ABV_TO_FULL[e],value:e}));s=s.concat({label:'"Any"',value:"any"},e)}else"item-rarity"===t?(n=!0,s=f.z.map(e=>({label:e,value:e}))):"source"===t?e.forEach(e=>{const n=e["render-"+t];s.some(e=>e.value===n)||s.push({label:b.a.sourceJsonToFullCompactPrefix(n)||n,value:n})}):e.forEach(e=>{const n=e["render-"+t];Array.isArray(n)?s=s.concat(n.map(e=>({label:e,value:e}))):"prerequisite"===t&&n.includes("/")?s=s.concat(n.split("/").map(e=>({label:e.trim(),value:e.trim()}))):"subclasses"!==t&&"classes"!==t||!n.includes(",")?s.push({label:n,value:n}):s=s.concat(n.split(",").map(e=>({label:e.trim(),value:e.trim()})))});const r=[];return s=s.filter(e=>!r.includes(e.value)&&(r.push(e.value),!0)),n||(s=s.sort((e,t)=>{const s=e.label,n=t.label,r=Object(h.isFirstCharNum)(s),i=Object(h.isFirstCharNum)(n);if(r&&!i)return 1;if(i&&!r)return-1;if(r&&i){const e=parseFloat(s),t=parseFloat(n);return e<t?-1:e>t?1:0}return s<n?-1:s>n?1:0})),console.error("_filterOptions",s),s}_filterValue(e,t){if(t&&t[e])return t[e]}_selectFilter(e){const t=e.model?e.model.__data.col.id:"name";console.error("_selectFilter",e);const s=this.selectedFilters?Object(h.cloneDeep)(this.selectedFilters):{};s[t]=e.target.value,this.set("selectedFilters",s)}_clearFilters(){this.root.querySelectorAll("vaadin-select, vaadin-grid-filter, vaadin-text-field").forEach(e=>{e.value=""})}_nameColWidth(e){return e?"150px":"300px"}_optionValue(e){return void 0!==e.value?e.value:e}_optionLabel(e){return void 0!==e.label?e.label:e}static get template(){return n.b`
      <style include="material-styles">
        :host {
          display: block;
        }

        .name-label {
          display: block;
          padding-top: 12px;
          font-size: 16px;
        }

        .search-wrap {
          margin-bottom: 20px;
          display: flex;
          align-items: flex-end;
        }

        .col-header-wrap {
          display: flex;
          justify-content: space-between;
        }

        .col-header-wrap--name vaadin-grid-sorter {
          margin-top: 10px;
        }

        vaadin-grid-sorter {
          margin-left: 8px;
        }

        vaadin-text-field {
          margin-bottom: -4px;
          margin-right: 16px;
        }

        vaadin-select {
          width: 120px;
        }

        vaadin-grid-filter[path="name"] {
          display: none;
        }

        @media(min-width: 921px) {
          vaadin-select {
            width: 134px;
          }
        }
      </style>

      <div class="search-wrap">
        <vaadin-text-field on-keyup="_selectFilter" label="Search"></vaadin-text-field>
        <dnd-button on-click="_clearFilters" label="Clear"></dnd-button>
      </div>

      <vaadin-grid id="grid" items="[[listItems]]" theme="no-border no-row-borders">
        <vaadin-grid-column frozen width="[[_nameColWidth(isMobile)]]">
          <template class="header">
            <div class="col-header-wrap col-header-wrap--name">
              <span class="name-label">Name</span>
              <vaadin-grid-sorter path="name" ></vaadin-grid-sorter>
              <vaadin-grid-filter path="name" value='[[_filterValue("name", selectedFilters)]]'></vaadin-grid-filter>
            </div>
          </template>
          <template>[[item.name]]</template>
        </vaadin-grid-column>

        <template is="dom-repeat" items="[[columns]]" as="col">
          <vaadin-grid-column width="175px">
            <template class="header">
              <div class="col-header-wrap">
                <vaadin-grid-filter aria-label="[[col.label]]" path="[[_renderPath(col.id)]]" value="[[_filterValue(col.id, selectedFilters)]]">
                  <vaadin-select placeholder="[[col.label]]" on-change="_selectFilter">
                    <template>
                      <vaadin-list-box>
                        <template is="dom-repeat" items="[[_filterOptions(listItems, col.id)]]" as="option">
                          <vaadin-item value="[[_optionValue(option)]]">[[_optionLabel(option)]]</vaadin-item>
                        </template>
                      </vaadin-list-box>
                    </template>
                  </vaadin-select>
                </vaadin-grid-filter>

                <vaadin-grid-sorter path="[[_renderPath(col.id)]]" ></vaadin-grid-sorter>
              </div>
            </template>
            <template>[[_getPathValue(item, col)]]</template>
          </vaadin-grid-column>
        </template>
      </vaadin-grid>
    `}}customElements.define("dnd-list",A);class S extends n.a{static get properties(){return{modelId:{type:String,observer:"_modelChange"},selectedItem:{type:Object},allItems:{type:Array},loading:{type:Boolean,value:!1,observer:"_loadingChange"},_modelsRenderSelection:{type:Function},characterOption:{type:Boolean,value:!1}}}static get observers(){return["__renderSelection(_modelsRenderSelection, selectedItem)"]}_loadingChange(){this.dispatchEvent(new CustomEvent("loading-render",{bubbles:!0,composed:!0,detail:{loading:this.loading}}))}__renderSelection(){this._modelsRenderSelection&&this.selectedItem&&(console.error("Selected Item:",this.selectedItem),this._modelsRenderSelection(this.selectedItem,this.shadowRoot,this.allItems),Object(h.initCollapseToggles)(this.shadowRoot))}_modelChange(){this.modelId&&(this.loading=!0,this.set("_modelsRenderSelection",void 0),s(114)(`./${this.modelId}.js`).then(e=>{"function"==typeof e.renderSelection?(this._modelsRenderSelection=e.renderSelection,this.loading=!1):console.error("Model module is missing the renderSelection export.")}).catch(e=>{console.error("Model module failed to load.",e)}))}_exists(e){return!!e}_mainClass(){return this.selectedItem?"main item-opened":"main"}clearSelection(){Object(g.a)(!0)}static get template(){return n.b`
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
          position: fixed;
          height: 64px;
          width: 64px;
          font-size: 44px;
          display: none;
          right: 0;
          top: -4px;
          z-index: 12;
        }
        .main.item-opened {
          margin-bottom: 120px;
        }
        @media(min-width: 921px) {
          .main.item-opened {
            padding-bottom: 0;
          }
        }
      </style>

      <div class$="[[_mainClass(selectedItem)]]">
        <button class="mdc-icon-button close-item material-icons" on-click="clearSelection">close</button>
        <div class="selection-wrapper"></div>
      </div>
    `}}customElements.define("dnd-selected-item",S);var w=s(32),T=s(26);class _ extends n.a{static get properties(){return{modelId:{type:String,observer:"_modelChange"},columns:{type:Array},enableHashRouting:{type:Boolean,value:!1,reflectToAttribute:!0},disableScrollBack:{type:Boolean,reflectToAttribute:!0,value:!1},hasSelection:{type:Boolean,reflectToAttribute:!0,value:!1},_data:{type:Array},_filters:{type:Array},_selectedItem:{type:Object},_selectedHash:{type:String},loading:{type:Boolean,value:!0,observer:"_loadingChange"},characterOption:{type:Boolean,value:!1}}}_loadingChange(){this.dispatchEvent(new CustomEvent("loading-data",{bubbles:!0,composed:!0,detail:{loading:this.loading}}))}connectedCallback(){super.connectedCallback(),this.selectionEventHandler=e=>{this._checkHashForSelection(e.detail.selection)},this.deselectionEventHandler=()=>{this._selectedItem=void 0,this.hasSelection=!1},this._checkHashForSelection(),Object(g.e)().addEventListener("selection-change",this.selectionEventHandler),Object(g.e)().addEventListener("selection-deselected",this.deselectionEventHandler),Object(g.e)().addEventListener("view-change",this.deselectionEventHandler)}disconnectedCallback(){super.disconnectedCallback(),Object(g.e)().removeEventListener("selection-change",this.selectionEventHandler),Object(g.e)().removeEventListener("selection-deselected",this.deselectionEventHandler)}_modelChange(){this.modelId&&(this.set("_data",void 0),this.set("_filters",void 0),this.loading=!0,Object(w.b)(this.modelId).then(e=>{const t=Object(T.a)(e,this.columns);this.set("_data",e),this.set("_filters",t),this._checkHashForSelection(),this.loading=!1}).catch(e=>{console.error("Model requested for list did not return.",e)}))}_checkHashForSelection(e){let t=e;if(t||(t=Object(g.c)()),t&&this.enableHashRouting&&Array.isArray(this._data)){const e=Object(T.b)(this._data,t);e?(this.set("_selectedItem",e),this.hasSelection=!0,this.disableScrollBack||window.scrollTo(0,0),this.dispatchEvent(new CustomEvent("title-change",{bubbles:!0,composed:!0,detail:e}))):Object(g.a)(!0)}}static get template(){return n.b`
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
      <dnd-selected-item model-id="[[modelId]]" selected-item="[[_selectedItem]]" all-items="[[_data]]" character-option="[[characterOption]]"></dnd-selected-item>
      <dnd-list list-items="[[_data]]" columns="[[columns]]" filters="[[_filters]]"></dnd-list>
    `}}customElements.define("dnd-selection-list",_)},96:function(e,t,s){"use strict";s.r(t);var n=s(7);s(63),s(72),s(124);class r extends n.a{static get template(){return n.b`
      <style include="material-styles my-styles"></style>

      <dnd-selection-list
        enable-hash-routing
        model-id="items"
        columns='[
          {"id":"item-type","label":"Type"}, 
          {"id":"source","label":"Source","hideMobile":true},
          {"id":"item-rarity","label":"Rarity","hideMobile":true}
        ]'
      >
      </dnd-selection-list>
    `}}customElements.define("dnd-items-view",r)}}]);
//# sourceMappingURL=20.bundle.js.map