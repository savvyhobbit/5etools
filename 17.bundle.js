(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{116:function(e,t,s){"use strict";var n=s(7),r=s(69);s(80),s(133);class i extends n.a{static get properties(){return{label:{type:String,value:""},icon:{type:String,value:""},svg:{type:String,value:""},background:{type:String,value:""},border:{type:String,value:""},svgFill:{type:String,value:""},svgStroke:{type:String,value:""}}}connectedCallback(){setTimeout(()=>{this.button=new r.a(this.$.button)},10)}_exists(e){return!!e}_styleStr(e,t,s){let n="";return e&&(n+=`background: ${e}; `),t&&(n+=`border: ${t}; `),n}_svgStyleStr(e,t){let s="";return e&&(s+=`fill: ${e}; `),t&&(s+=`stroke: ${t}; `),s}static get template(){return n.b`
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
    `}}customElements.define("dnd-button",i)},117:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return a}));var n=s(71),r=s(5),i=s(1);const l=new n.a;function a(e,t,s,n){!function(e){if(e.hasParsed)return;if(e.hasParsed=!0,e.noDisplay)return;"GV"===e.type&&(e.category="Generic Variant");void 0===e.category&&(e.category="Other");void 0===e.entries?e.entries=[]:e.entries=Object(i.cloneDeep)(e.entries);if(e.type&&window.itemTypeList[e.type])for(let t=0;t<window.itemTypeList[e.type].entries.length;t++)e.entries.push(window.itemTypeList[e.type].entries[t]);if(e.property){const t=e.property.split(",");for(let s=0;s<t.length;s++)if(window.itemPropertyList[t[s]].entries)for(let n=0;n<window.itemPropertyList[t[s]].entries.length;n++)e.entries.push(window.itemPropertyList[t[s]].entries[n])}e.armor?(e.resist&&e.entries.push("You have resistance to "+e.resist+" damage while you wear this armor."),e.armor&&e.stealth&&e.entries.push("The wearer has disadvantage on Stealth (Dexterity) checks."),"HA"===e.type&&e.strength&&e.entries.push("If the wearer has a Strength score lower than "+e.strength+", their speed is reduced by 10 feet.")):e.resist&&("P"===e.type&&e.entries.push("When you drink this potion, you gain resistance to "+e.resist+" damage for 1 hour."),"RG"===e.type&&e.entries.push("You have resistance to "+e.resist+" damage while wearing this ring."));"SCF"===e.type&&("arcane"===e.scfType&&e.entries.push("An arcane focus is a special item designed to channel the power of arcane spells. A sorcerer, warlock, or wizard can use such an item as a spellcasting focus, using it in place of any material component which does not list a cost."),"druid"===e.scfType&&e.entries.push("A druid can use such a druidic focus as a spellcasting focus, using it in place of any material component that does not have a cost."),"holy"===e.scfType&&(e.entries.push("A holy symbol is a representation of a god or pantheon."),e.entries.push("A cleric or paladin can use a holy symbol as a spellcasting focus, using it in place of any material components which do not list a cost. To use the symbol in this way, the caster must hold it in hand, wear it visibly, or bear it on a shield.")))}(e);const a=t.querySelector(".selection-wrapper")||t;a.innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="margin-bottom_small">\n\t\t\t<span class="type"></span><span class="rarity"></span>\n\t\t\t<span class="attunement"></span>\n\t\t</div>\n\t\t<div class="margin-bottom_small">\n\t\t\t<span class="value"></span><span class="weight"></span>\n\t\t</div>\n\t\t<div class="margin-bottom_small">\n\t\t\t<span class="damage"></span>\n\t\t\t<span class="damageType"></span>\n\t\t\t<span class="properties"></span>\n\t\t</div>\n\t\t<div class="text"></div>\n\t</div>',n&&a.querySelector(".stats-wrapper").classList.add("small"),t.querySelector(".stats-wrapper .value").innerHTML=e.value?e.value+(e.weight?", ":""):"",t.querySelector(".stats-wrapper .weight").innerHTML=e.weight?e.weight+(1==e.weight?" lb.":" lbs."):"",t.querySelector(".stats-wrapper .rarity").innerHTML=(e.tier?", "+e.tier:"")+(e.rarity?", "+e.rarity:""),t.querySelector(".stats-wrapper .attunement").innerHTML=e.reqAttune?e.reqAttune:"",t.querySelector(".stats-wrapper .type").innerHTML=e.typeText,t.querySelector(".stats-wrapper .damage").innerHTML="",t.querySelector(".stats-wrapper .damageType").innerHTML="";const o=e.type||"";if(e.weaponCategory)if(e.damages&&e.damages.length)for(let s=0;s<e.damages.length;s++){const n=e.damages[s],l=s===e.damages.length-1;n.roll&&n.type&&(t.querySelector(".stats-wrapper .damage").innerHTML+=`<span>${Object(i.utils_makeRoller)(n.roll)} ${r.a.dmgTypeToFull(n.type)}</span>${l?"":" + "}`)}else e.dmg1&&(t.querySelector(".stats-wrapper .damage").innerHTML=Object(i.utils_makeRoller)(e.dmg1)),e.dmgType&&(t.querySelector(".stats-wrapper .damageType").innerHTML=r.a.dmgTypeToFull(e.dmgType));else if("LA"===o||"MA"===o||"HA"===o)t.querySelector(".stats-wrapper .damage").innerHTML="AC "+e.ac+("LA"===o?" + Dex":"MA"===o?" + Dex (max 2)":"");else if("S"===o)t.querySelector(".stats-wrapper .damage").innerHTML="AC +"+e.ac;else if("MNT"===o||"VEH"===o){const s=e.speed,n=e.carryingcapacity;s&&t.querySelector(".stats-wrapper .damage").append("Speed="+s),s&&n&&t.querySelector(".stats-wrapper .damage").append("MNT"===o?", ":"<br/>"),n&&(t.querySelector(".stats-wrapper .damage").append("Carrying Capacity="+n),-1===n.indexOf("ton")&&-1===n.indexOf("passenger")&&t.querySelector(".stats-wrapper .damage").append(1==n?" lb.":" lbs."))}if(t.querySelector(".stats-wrapper .properties").innerHTML="",e.property){const s=e.property.split(",");for(let n=0;n<s.length;n++){const r=s[n];let i=window.itemPropertyList[r].name;"V"===r&&e.dmg2&&(i=`${i} (${e.dmg2})`),"T"!==r&&"A"!==r&&"AF"!==r||(i=`${i} (${e.range}ft.)`),"RLD"===r&&(i=`${i} (${e.reload} shots)`),i=(n>0?", ":e.dmg1?"- ":"")+i,t.querySelector(".stats-wrapper .properties").append(i)}}const c={type:"entries",entries:e.entries},d=[];l.recursiveEntryRender(c,d,1),t.querySelector(".stats-wrapper .text").innerHTML=Object(i.utils_makeRoller)(d.join("")).split(e.name.toLowerCase()).join("<i>"+e.name.toLowerCase()+"</i>")}},118:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return u})),s.d(t,"SKILL_TO_ATB_ABV",(function(){return c}));var n=s(1),r=s(71),i=s(5),l=s(30);function a(e){return o[e]?o[e]:0}const o={0:2,"1/8":2,"1/4":2,"1/2":2,1:2,2:2,3:2,4:2,5:3,6:3,7:3,8:3,9:4,10:4,11:4,12:4,13:5,14:5,15:5,16:5,17:6,18:6,19:6,20:6,21:7,22:7,23:7,24:7,25:8,26:8,27:8,28:8,29:9,30:9},c={athletics:"dex",acrobatics:"dex","sleight of hand":"dex",stealth:"dex",arcana:"int",history:"int",investigation:"int",nature:"int",religion:"int","animal handling":"wis",insight:"wis",medicine:"wis",perception:"wis",survival:"wis",deception:"cha",intimidation:"cha",performance:"cha",persuasion:"cha"};const d=new r.a;function u(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="margin-bottom_large stats-wrapper">\n\t\t<div id="stats" class="monster">\n\t\t\t<div id="name">\n\t\t\t\tName <span class="source" title="Source book">SRC</span>\n\t\t\t</div>\n\t\t\t<div id="sizetypealignment">\n\t\t\t\t<span id="size">Size</span> <span id="type">type</span>, <span id="alignment">alignment</span>\n\t\t\t</div>\n\t\t\t<div class="divider"></div>\n\t\t\t<div>\n\t\t\t\t<strong>Armor Class</strong> <span id="ac">## (source)</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Hit Points</strong> <span id="hp">hp</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Speed</strong> <span id="speed">30 ft.</span>\n\t\t\t</div>\n\t\t\t<div id="abilitynames">\n\t\t\t\t<div>STR</div>\n\t\t\t\t<div>DEX</div>\n\t\t\t\t<div>CON</div>\n\t\t\t\t<div>INT</div>\n\t\t\t\t<div>WIS</div>\n\t\t\t\t<div>CHA</div>\n\t\t\t</div>\n\t\t\t<div id="abilityscores">\n\t\t\t\t<div id="str"><span class="score">10</span> (<span class="mod">0</span>)</div>\n\t\t\t\t<div id="dex"><span class="score">10</span> (<span class="mod">0</span>)</div>\n\t\t\t\t<div id="con"><span class="score">10</span> (<span class="mod">0</span>)</div>\n\t\t\t\t<div id="int"><span class="score">10</span> (<span class="mod">0</span>)</div>\n\t\t\t\t<div id="wis"><span class="score">10</span> (<span class="mod">0</span>)</div>\n\t\t\t\t<div id="cha"><span class="score">10</span> (<span class="mod">0</span>)</div>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Saving Throws</strong> <span id="saves">Str +0</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Skills</strong> <span id="skills">Perception +0</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Damage Vulnerabilities</strong> <span id="dmgvuln">fire</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Damage Resistances</strong> <span id="dmgres">cold</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Damage Immunities</strong> <span id="dmgimm">lightning</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Condition Immunities</strong> <span id="conimm">exhaustion</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Senses</strong> <span id="senses">darkvision 30 ft.</span> passive Perception <span id="pp">10</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Languages</strong> <span id="languages">Common</span>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<strong>Challenge</strong> <span id="cr">1</span> (<span id="xp">450</span> XP)\n\t\t\t</div>\n\t\t\t<div id="traits">\n\t\t\t</div>\n\t\t\t<div id="actions">\n\t\t\t\t<span>Actions</span>\n\t\t\t</div>\n\t\t\t<div id="reactions">\n\t\t\t\t<span>Reactions</span>\n\t\t\t</div>\n\t\t\t<div id="legendaries">\n\t\t\t\t<span>Legendary Actions</span>\n\t\t\t</div>\n\t\t\t<div id="lairactions">\n\t\t\t\t<span>Lair Actions</span>\n\t\t\t</div>\n\t\t\t<div id="regionaleffects">\n\t\t\t\t<span>Regional Effects</span>\n\t\t\t</div>\n\t\t</div>\n\t\t<div id="output"></div>\n\t</div>';let s=[],r={};var o=e.name;window.monsterName=o;var u=e.source,p=e._pTypes.asText;t.querySelector("#name").innerHTML=`<span class="source source${u}" title="${i.a.sourceJsonToAbv(u)}">${i.a.sourceJsonToFull(u)}</span>`,t.querySelector("#size").innerHTML=i.a.sizeAbvToFull(e.size),t.querySelector("#type").innerHTML=p,t.querySelector("#alignment").innerHTML=e.alignment,t.querySelector("#ac").innerHTML=e.ac,t.querySelector("#hp").innerHTML=e.hp,t.querySelector("#speed").innerHTML=e.speed,t.querySelector("#str span.score").innerHTML=e.str,t.querySelector("#str span.mod").innerHTML=i.a.getAbilityModifier(e.str),t.querySelector("#dex span.score").innerHTML=e.dex,t.querySelector("#dex span.mod").innerHTML=i.a.getAbilityModifier(e.dex),t.querySelector("#con span.score").innerHTML=e.con,t.querySelector("#con span.mod").innerHTML=i.a.getAbilityModifier(e.con),t.querySelector("#int span.score").innerHTML=e.int,t.querySelector("#int span.mod").innerHTML=i.a.getAbilityModifier(e.int),t.querySelector("#wis span.score").innerHTML=e.wis,t.querySelector("#wis span.mod").innerHTML=i.a.getAbilityModifier(e.wis),t.querySelector("#cha span.score").innerHTML=e.cha,t.querySelector("#cha span.mod").innerHTML=i.a.getAbilityModifier(e.cha);var m=e.save;m?(t.querySelector("#saves").parentElement.style.display="block",t.querySelector("#saves").innerHTML=m):t.querySelector("#saves").parentElement.style.display="none";var v=e.skill;let y=0;var h;v?(t.querySelector("#skills").parentElement.style.display="block",t.querySelector("#skills").innerHTML=(h=v,Object.keys(h).map((function(e){return e.uppercaseFirst()+" "+h[e]})).join(", ")),v.perception&&(y=parseInt(v.perception))):t.querySelector("#skills").parentElement.style.display="none";var g=e.vulnerable;g?(t.querySelector("#dmgvuln").parentElement.style.display="block",t.querySelector("#dmgvuln").innerHTML=g):t.querySelector("#dmgvuln").parentElement.style.display="none";var f=e.resist;f?(t.querySelector("#dmgres").parentElement.style.display="block",t.querySelector("#dmgres").innerHTML=f):t.querySelector("#dmgres").parentElement.style.display="none";var b=e.immune;b?(t.querySelector("#dmgimm").parentElement.style.display="block",t.querySelector("#dmgimm").innerHTML=b):t.querySelector("#dmgimm").parentElement.style.display="none";var S=e.conditionImmune;S?(t.querySelector("#conimm").parentElement.style.display="block",t.querySelector("#conimm").innerHTML=S):t.querySelector("#conimm").parentElement.style.display="none";var w=e.senses;t.querySelector("#senses").innerHTML=w?w+", ":"";var q=e.passive||(10+y).toString;t.querySelector("#pp").innerHTML=q;var L=e.languages;t.querySelector("#languages").innerHTML=L||"—";var T=void 0===e.cr?"Unknown":e.cr;t.querySelector("#cr").innerHTML=T,t.querySelector("#xp").innerHTML=i.a.crToXp(T);var _=e.trait;if(t.querySelector("#traits").style.display="none",_&&_.length>0){t.querySelector("#traits").style.display="block";for(var j=_.length-1;j>=0;j--){for(var x=_[j].name,$=_[j].text,H="",A=0,M=0;M<$.length;M++)if($[M]){var O="";1===++A&&(O="first "),2===A&&(O="second ");var k="";-1!==x.indexOf("Spellcasting")&&-1!==$[M].indexOf(": ")&&(k="spells"),-1!==x.indexOf("Variant")&&-1!==x.indexOf("Coven")&&-1!==$[M].indexOf(": ")&&(k="spells"),H=H+"<p class='"+O+k+"'>"+$[M].replace(/\u2022\s?(?=C|\d|At\swill)/g,"")+"</p>"}const e=Object(n.parseHTML)("<div class='trait'><div class='trait"+j+"'><span class='name'>"+x+".</span> "+H+"</div></div>");Object(n.jqAfter)(t.querySelector("#traits"),e);const s=t.querySelectorAll(".trait div p.spells");for(let e of s){let t=e.innerHTML;if("*"===t[0])return;t=t.split(": ")[1].split(/\, (?!\+|\dd|appears|inside gems)/g);for(let e=0;e<t.length;e++)t[e]="<a href='#/spells/"+encodeURIComponent(t[e].replace(/(\*)| \(([^\)]+)\)/g,"")).toLowerCase().replace("'","%27")+"_phb'>"+t[e]+"</a>",e!==t.length-1&&(t[e]=t[e]+", ");e.innerHTML=e.innerHTML.split(": ")[0]+": "+t.join("")}}}const C=e.action;if(C&&C.length)for(let e=C.length-1;e>=0;e--){const s=C[e].name,r=C[e].text;let i="",l=0;for(let e=0;e<r.length;e++){if(!r[e])continue;l++;let t="";1===l&&(t="first "),2===l&&(t="second "),i=i+"<p class='"+t+"'>"+r[e]+"</p>"}const a=Object(n.parseHTML)("<div class='action'><div class='action"+e+"'><span class='name'>"+s+".</span> "+i+"</div></div>");Object(n.jqAfter)(t.querySelector("#actions"),a)}const E=e.reaction;if(t.querySelector("#reactions").style.display="none",E&&(E.text||E.length)){if(t.querySelector("#reactions").style.display="block",!E.length){const e=E.name,s=E.text;let r="",i=0;for(let e=0;e<s.length;e++){if(!s[e])continue;i++;let t="";1===i&&(t="first "),2===i&&(t="second "),r=r+"<p class='"+t+"'>"+s[e]+"</p>"}const l=Object(n.parseHTML)("<div class='reaction'><div class='reaction0'><span class='name'>"+e+".</span> "+r+"</div></div>");Object(n.jqAfter)(t.querySelector("#reactions"),l)}if(E.length)for(let e=E.length-1;e>=0;e--){const s=E[e].name,r=E[e].text;let i="<span>"+r+"</span>";for(let e=1;e<r.length;e++)r[e]&&(i=i+"<p>"+r[e]+"</p>");const l=Object(n.parseHTML)("<div class='reaction'><div class='reaction"+e+"'><span class='name'>"+s+".</span> "+i+"</div></div>");Object(n.jqAfter)(t.querySelector("#reactions"),l)}}const F=e.legendary;if(t.querySelector("#legendaries").style.display="none",F){t.querySelector("#legendaries").style.display="block";let s=F.length>0;for(let e=F.length-1;e>=0;e--){const r=F[e].name?F[e].name+".":"",i=F[e].text;let l="",a=0;for(let e=0;e<i.length;e++){if(!i[e])continue;a++;let t="";1===a&&(t="first "),2===a&&(t="second "),l+=`<p class='${t}'>${i[e]}</p>`}const o=Object(n.parseHTML)(`<div class='legendary'><div class='legendary'><span class='name'>${r}</span> ${l}</div></div>`);Object(n.jqAfter)(t.querySelector("#legendaries"),o),(""===r.trim()||r.indexOf("Legendary Actions")>-1)&&(s=!1)}if(s){const s=e.legendaryActions||3,r=o.split(","),i=Object(n.parseHTML)(`<div class='legendary'><div class='legendary'><span class='name'></span> <span>${r[0]} can take ${s} legendary action${s>1?"s":""}, choosing from the options below. Only one legendary action can be used at a time and only at the end of another creature's turn. ${r[0]} regains spent legendary actions at the start of its turn.</span></div></div>`);Object(n.jqAfter)(t.querySelector("#legendaries"),i)}}function R(e,i){t.querySelector(`#${e}s`).style.display="block",r={type:"entries",entries:i},s=[],d.recursiveEntryRender(r,s);const l=Object(n.parseHTML)(`<div class='${e}'><div class='legendary'>${Object(n.utils_makeRoller)(s.join(""))}</div></div>`);Object(n.jqAfter)(t.querySelector(`#${e}s`),l)}function N(e,t,s,n){return`<span class='roller' title="${e} ${n?" save":""}" data-roll-alt="1d20;${s}" data-roll='1d20${t}' mode='bonus' profDiceStr="+${s}" profBonusStr="${t}">${t}</span>`}t.querySelector("#lairactions").style.display="none",t.querySelector("#regionaleffects").style.display="none",e.lairActions&&R("lairaction",e.lairActions),e.regionalEffects&&R("regionaleffect",e.regionalEffects),e.skill&&function(t){const s=t,n=s.innerHTML.split(/,\s*(?![^()]*\))/g).map(e=>e.trim()),r=[];n.map(t=>{const s=t.match(/(\-|\+)?\d+|(?:[^\+]|\n(?!\+))+/g),n=s[0].trim();var l="";s.map(t=>{if(t.match(/(\-|\+)?\d+/)){const r=Number(t),o=i.a.getAbilityModNumber(e[(s=n,c[s.toLowerCase().trim()])]),d=r-o,u=d===2*a(e.cr)?2:1;l+=N(n,"+"+r,`${u}d${d*(3-u)}${o>=0?"+":""}${o}`,!1)}else l+=t;var s}),r.push(l)}),s.innerHTML=r.join(", ")}(t.querySelector("#skills")),e.save&&function(t){const s=t,n=s.innerHTML.split(",").map(e=>e.trim()),r=[];n.map(t=>{const s=t.split("+").map(e=>e.trim()),n=Number(s[1]),l=i.a.getAbilityModNumber(e[s[0].toLowerCase()]),o=n-l,c=o===2*a(e.cr)?2:1,d="+"+n,u=`${c}d${o*(3-c)}${l>=0?"+":""}${l}`;r.push(s[0]+" "+N(s[0],d,u,!0))}),s.innerHTML=r.join(", ")}(t.querySelector("#saves"));const I=t.querySelectorAll("#stats p");for(let t of I){D(t);const s=P(t),n="bonus";t.innerHTML=t.innerHTML.replace(/(\-|\+)?\d+(?= to hit)/g,(function(t){const r=Number(t),i=a(e.cr),l=r-i;if(i>0){const e=`1d${2*i}${l>=0?"+":""}${l}`;return`<span class='roller' ${s?`title="${s}"`:""} data-roll-alt='1d20;${e}' data-roll='1d20${t}' mode='${n}' profDiceStr="+${e}" profBonusStr="${t}">${t}</span>`}return`<span class='roller' data-roll='1d20${t}'>${t}</span>`})),t.innerHTML=t.innerHTML.replace(/DC\s*(\d+)/g,(function(t,r){const i=Number(r),l=a(e.cr);if(l>0){const e=i-l,t=`1d${2*l}${e>=0?"+":""}${e}`;return`DC <span class="dc-roller" ${s?`title="${s}"`:""} mode="${n}" data-roll-alt="${t}" data-bonus="${r}" profDiceStr="+${t}" profBonusStr="${r}">${r}</span>`}return t}))}function D(e){e.innerHTML=e.innerHTML.replace(/\d+d\d+(\s?(\-|\+)\s?\d+\s?)?/g,(function(t){const s=P(e);return`<span class='roller' ${s?`title="${s}"`:""} data-roll='${t}'>${t}</span>`}))}function P(e){let t=e.parentElement.querySelector(".name");return t&&(t=t.innerHTML,t&&(t=t.substring(0,t.length-1).trim())),t}D(t.querySelector("#stats #hp"));let B=t.querySelectorAll("#stats span.roller");for(let e of B)e.addEventListener("click",()=>{const t=e;let s,n;if("dice"===t.getAttribute("mode")){s=t.getAttribute("data-roll-alt").replace(/\s+/g,"");const e=s.split(";");s=s.replace(";","+"),n=l.a.roll(e[0]);const r=l.a.roll(e[1]);n.rolls=n.rolls.concat(r.rolls),n.total+=r.total}else s=t.getAttribute("data-roll").replace(/\s+/g,""),n=l.a.roll(s);z(t,s,n)});let J=t.querySelectorAll("#stats span.roller");for(let e of J){const t=e;let s,n;"dice"===t.getAttribute("mode")&&(s=t.getAttribute("data-roll-alt").replace(/\s+/g,""),n=l.a.roll(s),z(t,s,n))}function z(e,s,r){const i=window.monsterName,l=Object(n.parseHTML)(`<span>${i}: <em>${s}</em> rolled ${e.getAttribute("title")?e.getAttribute("title")+" ":""}for <strong>${r.total}</strong> (<em>${r.rolls.join(", ")}</em>)<br></span>`),a=t.querySelector("#output");Object(n.jqPrepend)(a,l),a.style.display="block",6===a.children.length&&a.children[5].remove()}}},119:function(e,t,s){"use strict";s.r(t),s.d(t,"onLoad",(function(){return a}));var n=s(1),r=s(171),i=s(167),l=s(30);function a(e){let t=e.querySelector("div#output"),s=0,a=-1,o=new r.a(e.querySelector(".mdc-text-field"));new i.a(e.querySelector(".mdc-notched-outline")),o.useNativeValidation=!1;let c=r=>{let i=l.a.roll(r.replace(/\s/g,""));if(i){let l=Object(n.parseHTML)(`<div>\n        <em><a class='roll' data-roll='${r}'>${r}</a></em> rolled for <strong>${i.total}</strong>${i.rolls.length>1?`<br>(${i.rolls.join(", ")})`:""}\n        </div>`);Object(n.jqPrepend)(t,l),t.style.display=null,u(l),s+=i.total,e.querySelector("#total").innerHTML=s,e.querySelector(".roll-total-wrap").style.display=null,e.querySelector(".roll-clear").style.display=null,o.value=""}else e.querySelector(".dice-field-container .mdc-text-field").classList.add("error")};e.querySelector(".roll-clear").addEventListener("click",n=>{n.preventDefault(),a=-1,t.innerHTML="",e.querySelector(".roll-total-wrap").style.display="none",e.querySelector(".roll-clear").style.display="none",s=0}),e.querySelector(".roll-submit").addEventListener("click",t=>{t.preventDefault(),a=-1,e.querySelector(".dice-field-container .mdc-text-field").classList.remove("error");let s=e.querySelector(".roll-field").value;s?c(s):e.querySelector(".dice-field-container .mdc-text-field").classList.add("error"),e.querySelector(".roll-field").focus()}),e.querySelector(".roll-field").addEventListener("keydown",t=>{let s=t.keyCode||t.which,n=e.querySelectorAll("#output > div").length;38===s?(t.preventDefault(),a+1<n&&(a++,o.value=e.querySelector(`#output div:eq(${a}) a.roll`).getAttribute("data-roll"))):40===s?(t.preventDefault(),a-1>-1&&(a--,o.value=e.querySelector(`#output div:eq(${a}) a.roll`).getAttribute("data-roll"))):13===s?(t.preventDefault(),e.querySelector(".roll-submit").click()):190===s||188===s?(t.preventDefault(),o.value=o.value+"d"):32!==s&&189!==s&&187!==s||(t.preventDefault(),o.value=o.value+" + ")}),e.querySelector(".roll-field").addEventListener("submit",t=>{t.preventDefault(),e.querySelector(".roll-submit").click()}),e.querySelector(".roll-field").addEventListener("textInput",e=>{var t=e.originalEvent.data;!t||"."!==t&&","!==t?!t||" "!==t&&"+"!==t||(e.preventDefault(),o.value=o.value+"+"):(e.preventDefault(),o.value=o.value+"d")}),e.querySelector(".roll-field").addEventListener("focus",t=>{e.querySelector(".dice-field-label").style.display=null}),e.querySelector(".roll-field").addEventListener("blur",t=>{e.querySelector(".dice-field-label").style.display="none"});let d=e.querySelectorAll(".roll[data-roll]");for(let e of d)u(e);function u(e){e.addEventListener("click",e=>{e.preventDefault();let t=e.target.closest(".roll").getAttribute("data-roll");t&&c(t)})}}},120:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return l})),s.d(t,"spellHtml",(function(){return a}));var n=s(71),r=s(5);const i=new n.a;function l(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t</div>';const s=a(e);t.querySelector(".stats-wrapper").innerHTML=s}function a(e){const t=[];if(t.push(`<div class="margin-bottom_small"><span class="source source${e.source}" title="${r.a.sourceJsonToAbv(e.source)}">${r.a.sourceJsonToFull(e.source)}</div>`),t.push(`<div class="margin-bottom_small"><span>${r.a.spLevelSchoolMetaToFull(e.level,e.school,e.meta)}</span></div>`),t.push(`<div class="margin-bottom_small"><span class="stat-name">Casting Time: </span>${r.a.spTimeListToFull(e.time)}</div>`),t.push(`<div class="margin-bottom_small"><span class="stat-name">Range: </span>${r.a.spRangeToFull(e.range)}</div>`),t.push(`<div class="margin-bottom_small"><span class="stat-name">Components: </span>${r.a.spComponentsToFull(e.components)}</div>`),t.push(`<div class="margin-bottom_med"><span class="stat-name">Duration: </span>${r.a.spDurationToFull(e.duration)}</div>`),t.push("<div class='text'>"),i.recursiveEntryRender({type:"entries",entries:e.entries},t,1),e.entriesHigherLevel){const s={type:"entries",entries:e.entriesHigherLevel};i.recursiveEntryRender(s,t,2)}if(t.push("</div>"),t.push(`<div class="margin-bottom_med"><span class="stat-name">Classes: </span>${r.a.spMainClassesToFull(e.classes)}</div>`),e.classes&&e.classes.fromSubclass){const s=r.a.spSubclassesToCurrentAndLegacyFull(e.classes);t.push(`<div class="margin-bottom_med"><span class="stat-name">Subclasses: </span>${s[0]}</div>`),s[1]&&t.push(`<div class="mdc-theme--text-disabled-on-background margin-bottom_med"><span class="stat-name">Subclasses (legacy): </span>${s[1]}</div>`)}return e.scrollNote&&(t.push('<div class="mdc-theme--text-disabled-on-background">'),i.recursiveEntryRender("{@italic Note: Both the {@class Fighter (Eldritch Knight)} and the {@class Rogue (Arcane Trickster)} spell lists include all {@class Wizard} spells. Spells of 5th level or higher may be cast with the aid of a spell scroll or similar.}",t,2),t.push("</div>")),t.join("")}},121:function(e,t,s){"use strict";s.r(t),s.d(t,"onDataLoad",(function(){return u})),s.d(t,"onClassChange",(function(){return p})),s.d(t,"onSubChange",(function(){return m}));var n=s(1),r=s(0),i=s(71),l=s(5),a=s(11);const o="mdc-chip--selected",c=new i.a;function d(e){let t=[];return c.recursiveEntryRender(e,t,0),t.join(" ")}function u(e,t){for(const t of e)t.subclasses&&(t.subclasses=t.subclasses.sort((e,t)=>Object(n.ascSort)(e.name,t.name)));const s=e.filter(e=>!e.name.includes("Sidekick"));window.classTableDefault=t.querySelector("#classtable").innerHTML,function(e,t){const s=e.querySelector(".class-container");s.appendChild(Object(n.parseHTML)("<div class='list-container'></div>"));const r=s.querySelector(".list-container");let i="";for(let e=0;e<t.length;e++){const s=t[e];let r=s.name.replace(/(\s|\(|\))/g,"");i+=`<div class='list-item history-link grid-item__${r}' data-link='${Object(n.encodeForHash)([s.name,s.source])}' data-title='${s.name}'>\n\t\t\t\t<div>\n\t\t\t\t\t<dnd-svg id='${r}' default-color class='list-item--image grid-item__${r}'></dnd-svg>\n\t\t\t\t\t<span class='list-item--text'>${s.name}</span>\n\t\t\t\t</div>\n\t\t\t\t<div class="list-item--subtext">${l.a.sourceJsonToFull(s.source)}</div>\n\t\t\t</div>`}let o=Object(n.parseHTML)(i);for(;o.length>0;)o[0].addEventListener("click",e=>{let t=e.target.closest(".list-item");Object(a.f)(t.getAttribute("data-link"))}),r.appendChild(o[0])}(t,s)}function p(e,t){t.querySelector("#classtable").innerHTML=window.classTableDefault,t.querySelector("#subclasses").classList.remove("fixed"),t.querySelector("#subclasses").classList.remove("closed"),t.querySelector("#subclasses").classList.remove("hidden"),t.querySelector(".mobile-clone-spells")&&t.querySelector(".mobile-clone-spells").remove(),e.hd?(t.querySelector("#hp").classList.remove("hidden"),t.querySelector("#hp div#hitdice span").innerHTML=i.a.getEntryDice(e.hd),t.querySelector("#hp div#hp1stlevel span").innerHTML=e.hd.faces+" + your Constitution modifier",t.querySelector("#hp div#hphigherlevels span").innerHTML=`${i.a.getEntryDice(e.hd)} (or ${e.hd.faces/2+1}) + your Constitution modifier per ${e.name} level after 1st`):t.querySelector("#hp").classList.add("hidden"),e.proficiency?(t.querySelector("#prof").classList.remove("hidden"),t.querySelector("#prof div#saves span").innerHTML=e.proficiency.map(e=>l.a.attAbvToFull(e)).join(", ")):t.querySelector("#prof").classList.add("hidden");const s=e.startingProficiencies;s?(t.querySelector("#armor").classList.remove("hidden"),t.querySelector("#weapons").classList.remove("hidden"),t.querySelector("#tools").classList.remove("hidden"),t.querySelector("#skills").classList.remove("hidden"),t.querySelector("div#armor span").innerHTML=void 0===s.armor?"none":s.armor.map(e=>"light"===e||"medium"===e||"heavy"===e?e+" armor":e).join(", "),t.querySelector("div#weapons span").innerHTML=void 0===s.weapons?"none":s.weapons.map(e=>"simple"===e||"martial"===e?e+" weapons":e).join(", "),t.querySelector("div#tools span").innerHTML=void 0===s.tools?"none":s.tools.join(", "),t.querySelector("div#skills span").innerHTML=void 0===s.skills?"none":function(e){let t,s,r="";if(Array.isArray(e))for(let i of e)i.choose&&(t=l.a.numberToString(i.choose.count),s=i.choose.from,r+=18===s.length?`Choose any ${t}.`:`Choose ${t} from ${Object(n.joinConjunct)(s,", ",", and ")}.`);else t=l.a.numberToString(e.choose),s=e.from,r+=18===s.length?`Choose any ${t}.`:`Choose ${t} from ${Object(n.joinConjunct)(s,", ",", and ")}.`;return r}(s.skills)):(t.querySelector("#armor").classList.add("hidden"),t.querySelector("#weapons").classList.add("hidden"),t.querySelector("#tools").classList.add("hidden"),t.querySelector("#skills").classList.add("hidden"));const u=e.startingEquipment;if(u){t.querySelector("#equipment").classList.remove("hidden");const e=u.additionalFromBackground?"<p>You start with the following items, plus anything provided by your background.</p>":"",s=0===u.default.length?"":`<ul><li>${u.default.map(e=>d(e)).join("</li><li>")}</ul>`,n=void 0===u.goldAlternative?"":`<p>Alternatively, you may start with ${d(u.goldAlternative)} gp to buy your own equipment.</p>`;t.querySelector("#equipment div").innerHTML=`${e}${s}${n}`}else t.querySelector("#equipment").classList.add("hidden");let p=e.classTableGroups||[];const m=t.querySelector("#groupHeaders"),v=t.querySelector("#colHeaders"),y=[];let h=!1;for(let t of e.subclasses)t.subclassTableGroups&&(p=p.concat(t.subclassTableGroups));if(p)for(let e=0;e<p.length;e++){const s=p[e],i=void 0!==s.title;let l="";void 0!==s.subclasses&&(l=`data-subclass-list="${s.subclasses.map(e=>e.name+r.e+e.source).join(r.d)}"`),m.append(Object(n.parseHTML)(`<th ${i?'class="colGroupTitle table-cell"':""} colspan="${s.colLabels.length}" ${l}>${i?s.title:""}</th>`,!0,!0));for(let e=0;e<s.colLabels.length;e++){let t=s.colLabels[e];if(t.indexOf("@")>-1){let e=[];c.recursiveEntryRender(t,e,0),t=e.join(" ")}v.append(Object(n.parseHTML)(`<th class="centred-col table-cell" ${l}>${t}</th>`,!0,!0))}if(s.rows)for(let e=0;e<20;e++){const r=t.querySelector("#level"+(e+1));y[e]=r;for(let t=0;t<s.rows[e].length;t++){let i=s.rows[e][t];0===i&&(i="—");const a=[];c.recursiveEntryRender(i,a,"",""),r.append(Object(n.parseHTML)(`<td class="centred-col" ${l}>${a.join("")}</td>`,!0,!0))}}if(s.rowsSpellProgression)for(let e=0;e<20;e++){const r=t.querySelector("#level"+(e+1));y[e]=r;for(let t=0;t<s.rowsSpellProgression[e].length;t++){let i=s.rowsSpellProgression[e][t];0===i&&(i="—");const a=[];c.recursiveEntryRender(i,a,"",""),r.append(Object(n.parseHTML)(`<td class="centred-col" ${l}>${a.join("")}</td>`,!0,!0))}}let a=s.colLabels.join(" ");!h&&(a.indexOf("Spells Known")>-1||a.indexOf("Cantrips Known")>-1||a.indexOf("1st")>-1||a.indexOf("Ki Points")>-1||a.indexOf("Rages")>-1||a.indexOf("Talents Known")>-1)&&(h=!0)}else if(e.classFeatures.length)for(let e=0;e<20;e++){const s=t.querySelector("#level"+(e+1));y[e]=s}if(t.querySelector("#classtable").classList.remove("mobile-clone-features"),h){t.querySelector("#classtable").classList.add("mobile-clone-features");let e=Object(n.parseHTML)('<div class="mobile-clone-spells"></div>');e.append(t.querySelector("#classtable").cloneNode(!0)),e.querySelector("#classtable").classList.remove("mobile-clone-features"),e.querySelector("#groupHeaders th:not(.colGroupTitle)").remove(),e.querySelector("#groupHeaders .colGroupTitle")&&e.querySelector("#groupHeaders .colGroupTitle").setAttribute("colspan","12");let s=e.querySelectorAll("#colHeaders th");for(let e of s)e.textContent.toLowerCase().indexOf("sneak attack")>-1?e.innerHTML='<span title="Sneak Attack">Snk Atk</span>':e.textContent.toLowerCase().indexOf("sorcery points")>-1?e.innerHTML='<span title="Sorcery Points">SP</span>':e.textContent.toLowerCase().indexOf("spells known")>-1?e.innerHTML='<span title="Spells Known">S</span>':e.textContent.toLowerCase().indexOf("cantrips known")>-1&&(e.innerHTML='<span title="Cantrips Known">C</span>');Object(n.jqAfter)(t.querySelector("#classtable"),e)}const g=[];let f=0;for(let s=0;s<20;s++){const i=y[s].querySelector(".features"),l=[],a=e.classFeatures[s];for(let i=0;i<a.length;i++){const o=a[i];console.error("feature",o);const d="f:"+Object(n.encodeForHash)(o.name)+"_"+s,u="f:"+Object(n.encodeForHash)(o.name)+s,p=["feature-link"];Object(n.isNonstandardSource)(o.source)&&p.push(r.i);const m=Object(n.parseHTML)(`<a href="#${Object(n.encodeForHash)([e.name,e.source])}${r.o}${u}"\n          class="${p.join(" ")}"\n          data-flink="${u}"\n          data-flink-id="${d}">${o.name}</a>`);m.addEventListener("click",(function(e){e.preventDefault(),t.getElementById(d).scrollIntoView(!0);let s=-84-Object(n.jqHeight)(t.querySelector("#subclasses"));window.scrollBy(0,s)})),l.push(m);const v=["class-feature"];if(o.gainSubclassFeature&&v.push("gain-subclass-feature"),c.recursiveEntryRender(o,g,0,`<div id="${d}" class="${v.join(" ")}" level="${o.level}">`,"</div>",!0),o.gainSubclassFeature){for(const t of e.subclasses)if(t.subclassFeatures){const e=t.subclassFeatures[f];for(let s=0;s<e.length;s++){const i=e[s];if(void 0===i.name)for(let e=0;e<i.entries.length;e++){const s=i.entries[e];void 0===s.name||s.name.startsWith('<span class="subclass-prefix">')||(s.name=`<span class="subclass-prefix">${t.name}: </span>${s.name}`)}const l=[r.j];(Object(n.isNonstandardSource)(t.source)||Object(n.hasBeenReprinted)(t.shortName,t.source))&&l.push(r.i),0!==s&&l.push("referenced-subclass-feature"),c.recursiveEntryRender(i,g,0,`<div class="${l.join(" ")}" ${r.f}="${t.name}" ${r.g}="${t.source}">`,"</div>",!0)}}f++}}if(0===l.length)i.innerHTML="—";else for(let e=0;e<l.length;e++)i.append(l[e])}t.querySelector("#stats").innerHTML=g.join(""),L(!0);let b=t.querySelector("div#subclasses");Object(n.jqEmpty)(b),b.append(Object(n.parseHTML)("<div class='title'>Subclasses</div>")),b.append(Object(n.parseHTML)("<div class='subclass-wrapper'></div>")),b=b.querySelector(".subclass-wrapper");const S=w("Show UA","os-active","os-toggle","allsrc:",!1,!0);if(w("Class Features","cf-active","cf-toggle","hideclassfs:",!0),e.subclasses){const s=e.subclasses.map(e=>({name:e.name,source:e.source,shortName:e.shortName})).sort((function(e,t){return Object(n.ascSort)(e.shortName,t.shortName)}));for(let e=0;e<s.length;e++){const t=Object(n.isNonstandardSource)(s[e].source)||Object(n.hasBeenReprinted)(s[e].shortName,s[e].source),i=[o,"mdc-chip"];t&&i.push(r.i);const a=Object(n.hasBeenReprinted)(s[e].shortName,s[e].source)?`${s[e].shortName} (${l.a.sourceJsonToAbv(s[e].source)})`:s[e].shortName,c=Object(n.parseHTML)(`<div class="${i.join(" ")}" ${r.f}="${s[e].name}" ${r.g}="${s[e].source}" title="Source: ${l.a.sourceJsonToFull(s[e].source)}"><span class='mdc-chip__text'>${a}</span></div>`);c.addEventListener("click",(function(){q(c.classList.contains(o),s[e].name,s[e].source)})),t&&(c.style.display="none"),b.append(c)}b.append(Object(n.parseHTML)("<div class='tab material-icons'>expand_less</div>")),t.querySelector("#subclasses .tab").addEventListener("click",()=>{t.querySelector("#subclasses").classList.toggle("closed")});(Object(a.c)().indexOf("allsrc:true")>-1||-1===Object(a.c)().indexOf("allsrc:false"))&&S.click()}else t.querySelector("#subclasses").classList.add("hidden");function w(e,t,s,i,l,o){const c=Object(n.parseHTML)(`<div id="${s}" class="mdc-chip"><span class="mdc-chip__text">${e}</span></div>`);return b.append(c),c.addEventListener("click",(function(){let e=c.classList.contains(t);l||(e=!e),function(e){const t=[],s=Object(a.c)().split(r.o);for(let e=0;e<s.length;e++){const n=s[e];n.startsWith(i)||t.push(n)}e?t.push(i+"true"):t.push(i+"false");const n=t.join(r.o);Object(a.f)(n,!0)}(e),o&&(L(e),c.querySelector(".mdc-chip__text").innerHTML=e?"Hide UA":"Show UA")})),c}function q(e,t,s){const i=[],l=Object(a.c)(),o=l.split(r.o),c=Object(n.encodeForHash)([t]),d="sub:"+c;if(e&&l.includes("sub:"))for(let e=0;e<o.length;e++){const t=o[e];if(t.startsWith("sub:")){const e=[],s=t.substr("sub:".length).split(r.n);for(let t=0;t<s.length;t++){const n=s[t];n!==c&&e.push(n)}e.length>0&&i.push("sub:"+e.join(r.n))}else i.push(t)}else{let e=!1;for(let t=0;t<o.length;t++){const s=o[t];if(s.startsWith("sub:")){const t=[],n=s.substr("sub:".length).split(r.n);for(let e=0;e<n.length;e++){const s=n[e];s!==c&&t.push(s)}t.push(c),t.length>0&&i.push("sub:"+t.join(r.n)),e=!0}else i.push(s)}e||i.push(d)}const u=i.join(r.o);Object(a.f)(u,!0)}function L(e){let s=t.querySelectorAll("."+r.i);for(let t of s)t.classList.contains("mdc-chip")||(t.style.display=e?null:"none")}}function m(e,t,s){let l=null,a=null,c=null,d=null;for(let t=0;t<e.length;t++){const s=e[t];s.startsWith("sub:")&&(l=s.slice("sub:".length).split(r.n)),s.startsWith("f:")&&(a=s),s.startsWith("hideclassfs:")&&(c="true"===s.slice("hideclassfs:".length)),s.startsWith("allsrc:")&&(d="true"===s.slice("allsrc:".length))}const u=null===d||!1===d;if(null!==l){h();const e=[],t=[],a=s.querySelectorAll(".mdc-chip");for(let s of a){const i=s,a=i.getAttribute(r.f),o=Object(n.encodeForHash)([a]);let c=!1;for(let e=0;e<l.length;e++){if(l[e].trim()===o){c=!0;break}}c?e.push(i):t.push(i)}const c=s.querySelectorAll("p."+r.i),d=[];for(let t of e){t.classList.add(o);let e=s.querySelectorAll(`.${r.j}[${r.f}="${t.getAttribute(r.f)}"][${r.g}="${t.getAttribute(r.g)}"]`);for(let t of e)t.style.display=null;if(u)for(let e of c)e.getAttribute(r.f)===t.getAttribute(r.f)&&e.getAttribute(r.g)===t.getAttribute(r.g)&&(e.style.display="none");else for(let e of c)e.getAttribute(r.f)===t.getAttribute(r.f)&&e.getAttribute(r.g)===t.getAttribute(r.g)&&(e.style.display=null);const n=t.getAttribute(r.f)+r.e+t.getAttribute(r.g);d.push(n)}for(let e of t){e.classList.remove(o);let t=s.querySelectorAll(`.${r.j}[${r.f}="${e.getAttribute(r.f)}"][${r.g}="${e.getAttribute(r.g)}"]`);for(let e of t)e.style.display="none";for(let t of c)t.getAttribute(r.f)===e.getAttribute(r.f)&&t.getAttribute(r.g)===e.getAttribute(r.g)&&(t.style.display="none");e.getAttribute(r.f)}if(function(e){let t=s.querySelectorAll("[data-subclass-list]");for(let s of t){const t=s.getAttribute("data-subclass-list").split(r.d);for(let n of e){if(t.includes(n)){s.style.display=null;break}s.style.display="none"}}}(d),u)for(let e of c)e.classList.contains(r.j)||e.getAttribute(r.f)!==i.a.DATA_NONE||e.getAttribute(r.g)!==i.a.DATA_NONE||(e.style.display="none");else for(let e of c)e.classList.contains(r.j)||e.getAttribute(r.f)!==i.a.DATA_NONE||e.getAttribute(r.g)!==i.a.DATA_NONE||(e.style.display=null);let p=s.querySelectorAll(".subclass-prefix");if(1!==e.length)for(let e of p)e.style.display=null;else for(let e of p)e.style.display="none"}const p=s.querySelector("#cf-toggle"),m=s.querySelectorAll(".class-feature");if(null!==c&&c){p.classList.remove("cf-active");for(let e of m)e.classList.contains("gain-subclass-feature")||(e.style.display="none")}else{p.classList.add("cf-active");for(let e of m)e.classList.contains("gain-subclass-feature")||(e.style.display=null)}const v=s.querySelector("#os-toggle"),y=s.querySelectorAll(".mdc-chip."+r.i);if(u){v.classList.remove("os-active");for(let e of y)e.style.display="none"}else{v.classList.add("os-active");for(let e of y)e.style.display=null}function h(){const e=t.slice(1).split(r.o),n=[];for(let t=0;t<e.length;t++){const s=e[t];s.startsWith("f:")||n.push(s)}let i=s.querySelectorAll(".feature-link");for(let e of i)e.href=r.p+n.join(r.o)+r.o+e.getAttribute("data-flink")}null===a||void 0!==window.prevFeature&&window.prevFeature===a||(s.getElementById(s.querySelectorAll(`[data-flink="${a}"]`).getAttribute("data-flink-id")).scrollIntoView(),window.prevFeature=a),h()}},122:function(e,t,s){var n={"./backgrounds.js":123,"./bestiary.js":118,"./classes.js":121,"./conditions.js":124,"./cults.js":125,"./dice.js":119,"./feats.js":126,"./features.js":127,"./items.js":117,"./psionics.js":128,"./races.js":129,"./rewards.js":130,"./spells.js":120,"./utils.js":1,"./variantrules.js":131};function r(e){return i(e).then(s)}function i(e){return Promise.resolve().then((function(){if(!s.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}))}r.keys=function(){return Object.keys(n)},r.resolve=i,r.id=122,e.exports=r},123:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return c}));var n=s(1),r=s(5),i=s(71),l=s(26);const a=new i.a,o='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="source margin-bottom_small"></div>\n\t\t<div class="stats margin-bottom_small"></div>\n\t\t<div class="table-container collapse collapse--left-arrow disabled">\n\t\t\t<div class="collapse-toggle">\n\t\t\t\t<div class="mdc-list-item stat-name">Suggested Characteristics</div>\n\t\t\t</div>\n\t\t\t<div class="collapse-wrapper">\n\t\t\t\t<div class="collapse-list"></div>\n\t\t\t</div>\n\t\t</div>\n\t</div>';function c(e,t,s){for(t.querySelector(".selection-wrapper")?t.querySelector(".selection-wrapper").innerHTML=o:t.innerHTML=o;e._copy;){e=Object(l.b)(s,Object(n.encodeForHash)([e._copy.name,e._copy.source]))}const i=e.source,c=r.a.sourceJsonToAbv(i),d=r.a.sourceJsonToFull(i),u=t.querySelector(".stats-wrapper .source");u.classList.add("source"+c),u.setAttribute("title",d),u.innerHTML=d;const p=e.entries;if(p&&p.length)for(let e=p.length-1;e>=0;e--){let s=p[e],r=[];a.recursiveEntryRender(s,r,0);let i=r.join(" ");if("Suggested Characteristics"===s.name){t.querySelector(".stats-wrapper .table-container").classList.remove("disabled");const e=t.querySelector(".stats-wrapper .table-container .collapse-list"),s=Object(n.parseHTML)(i);s.querySelector(".stat-name").remove(),Object(n.jqPrepend)(e,s)}else{const e=t.querySelector(".stats-wrapper .stats");Object(n.jqPrepend)(e,Object(n.parseHTML)(i))}}window.setTimeout(()=>{let e=t.querySelector(".stats-wrapper .table-container .collapse-list");e.style["margin-top"]="-"+Object(n.jqHeight)(e)+"px"},0)}},124:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return r}));var n=s(1);function r(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="text"></div>\n\t</div>',t.querySelector(".stats-wrapper .text").innerHTML=Object(n.utils_combineText)(e.entries,"p")}},125:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return r}));var n=s(1);function r(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="text"></div>\n\t</div>';const s=e.text;let r="";void 0!==e.goal&&(r+=Object(n.utils_combineText)(e.goal.text,"p","<span class='stat-name'>Goals:</span> ")),void 0!==e.cultists&&(r+=Object(n.utils_combineText)(e.cultists.text,"p","<span class='stat-name'>Typical Cultist:</span> ")),void 0!==e.signaturespells&&(r+=Object(n.utils_combineText)(e.signaturespells.text,"p","<span class='stat-name'>Signature Spells:</span> ")),r+=Object(n.utils_combineText)(s,"p"),t.querySelector(".stats-wrapper .text").innerHTML=r}},126:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return a}));var n=s(1),r=s(64),i=s(5);const l=new(s(71).a);function a(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="source margin-bottom_small"></div>\n\t\t<div class="prerequisite margin-bottom_small"></div>\n\t\t<div class="text"></div>\n\t</div>';let s=t.querySelector(".stats-wrapper .source"),a=i.a.sourceJsonToAbv(e.source),o=i.a.sourceJsonToFull(e.source);s.classList.add("source"+e.source),s.setAttribute("title",a),s.innerHTML=o;const c=Object(n.utils_makePrerequisite)(e.prerequisite);if(t.querySelector(".stats-wrapper .prerequisite").innerHTML=c?"Prerequisite: "+c:"",e.ability)for(let t of e.entries)"list"!==t.type||t.hasabilityitem||(t.hasabilityitem=!0,t.items.unshift(Object(r.b)(e.ability)));if(e.entries.length){let s=[];for(let t of e.entries)l.recursiveEntryRender(t,s,0);t.querySelector(".stats-wrapper .text").innerHTML=s.join(" ")}}},127:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return a}));var n=s(1),r=s(64),i=s(5);const l=new(s(71).a);function a(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n    <div class="source margin-bottom_small"></div>\n    <div class="type margin-bottom_small"></div>\n\t\t<div class="prerequisite margin-bottom_small"></div>\n\t\t<div class="text"></div>\n\t</div>';const s=t.querySelector(".stats-wrapper .source"),a=i.a.sourceJsonToAbv(e.source),o=i.a.sourceJsonToFull(e.source);s.classList.add("source"+e.source),s.setAttribute("title",a),s.innerHTML=o;let c=e.featureType?Array.isArray(e.featureType)?e.featureType:[e.featureType]:[];t.querySelector(".stats-wrapper .type").innerHTML=Object(n.utils_joinPhraseArray)(c.map(e=>i.a.featureJsonToAbv(e)),", "," and ");const d=Object(n.utils_makePrerequisite)(e.prerequisite);if(t.querySelector(".stats-wrapper .prerequisite").innerHTML=d?"Prerequisite: "+d:"",e.ability)for(let t of e.entries)"list"!==t.type||t.hasabilityitem||(t.hasabilityitem=!0,t.items.unshift(Object(r.b)(e.ability)));if(e.entries.length){let s=[];for(let t of e.entries)l.recursiveEntryRender(t,s,0);t.querySelector(".stats-wrapper .text").innerHTML=s.join(" ")}}},128:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return i}));var n=s(1),r=s(0);function i(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="order margin-bottom_small"></div>\n\t\t<div class="duration margin-bottom_small"></div>\n\t\t<div class="text"></div>\n\t</div>';const s=t.querySelector(".stats-wrapper .order"),i=t.querySelector(".stats-wrapper .duration"),l=t.querySelector(".stats-wrapper .text");"T"===e.type?(s.innerHTML=Object(n.parse_psionicTypeToFull)(e.type),l.innerHTML=Object(n.utils_combineText)(e.text,r.l),i.innerHTML=r.qc):"D"===e.type&&function(){function t(t){const s=Object(n.utils_combineText)(e.modes[t].text,r.l,i(e.modes[t]));if(void 0===e.modes[t].submodes)return s;return`${s}${function(){const s=[],l=e.modes[t].submodes;for(let e=0;e<l.length;++e)s.push(Object(n.utils_combineText)(l[e].text,r.l,i(l[e],!0)));return s.join(r.qc)}()}`;function i(e,t){t=null!=t&&t;const s=[];s.push(e.title);const n=function(){const t=[];e.cost&&t.push(function(){const t=e.cost.min,s=e.cost.max;return(t===s?t:`${t}-${s}`)+" psi"}());e.concentration&&t.push(`conc., ${e.concentration.duration} ${e.concentration.unit}.`);return 0===t.length?null:`(${t.join("; ")})`}();return null!==n&&s.push(n),`<span class='stat-name'>${s.join(" ")}.</span> `}}s.innerHTML=`${e.order} ${Object(n.parse_psionicTypeToFull)(e.type)}`,l.innerHTML=function(){const s=[];for(let n=0;n<e.modes.length;++n)s.push(t(n));return`<p>${e.description}</p><p><span class='stat-name'>Psycic Focus.</span> ${e.focus}</p>${s.join(r.qc)}`}(),i.innerHTML=void 0===e.duration?r.qc:void 0}()}},129:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return o}));var n=s(1),r=s(71),i=s(5),l=s(64);const a='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="source margin-bottom_small"></div>\n\t\t<div class="size margin-bottom_small"></div>\n\t\t<div class="ability margin-bottom_small"></div>\n\t\t<div class="speed margin-bottom_small"></div>\n\t\t<div class="stats"></div>\n\t</div>';function o(e,t){t.querySelector(".selection-wrapper")?t.querySelector(".selection-wrapper").innerHTML=a:t.innerHTML=a;const s=t.querySelector(".stats-wrapper .source");s.classList.add("source"+e.source),s.setAttribute("title",i.a.sourceJsonToAbv(e.source)),s.innerHTML=i.a.sourceJsonToFull(e.source);const o=i.a.sizeAbvToFull(e.size);t.querySelector(".stats-wrapper .size").innerHTML=o,""===o&&(t.querySelector(".stats-wrapper .size").style.display="none");const c=Object(l.c)(e.ability);let d;t.querySelector(".stats-wrapper .ability").innerHTML=c,e.speed&&(e.speed.walk?(d=e.speed.walk+" ft.",e.speed.climb&&(d+=`, climb ${e.speed.climb} ft.`),e.speed.fly&&(d+=`, fly ${e.speed.fly} ft.`)):d=e.speed+("Varies"===e.speed?"":" ft. ")),t.querySelector(".stats-wrapper .speed").innerHTML=d,""===d&&(t.querySelector(".stats-wrapper .speed").style.display="none");const u=e.trait;if(u){let e="<div class='stat-item'>";for(let t=0;t<u.length;++t){const s=`<span class='stat-name'>${u[t].name}.</span> `;e+=Object(n.utils_combineText)(u[t].text,"p",s)}e+="</div>",t.querySelector(".stats-wrapper .stats").innerHTML=e}else if(e.entries){const s=[],n={type:"entries",entries:e.entries};(new r.a).recursiveEntryRender(n,s,1,"<div class='renderer-output'>","</div>",!0),t.querySelector(".stats-wrapper .stats").innerHTML=s.join("")}}},130:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return i}));var n=s(1),r=s(5);function i(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="source margin-bottom_small"></div>\n\t\t<div class="text"></div>\n\t</div>';const s=t.querySelector(".stats-wrapper .source");s.classList.add("source"+e.source),s.setAttribute("title",r.a.sourceJsonToAbv(e.source)),s.innerHTML=r.a.sourceJsonToFull(e.source);const i=e.text;let l="";void 0!==e.ability&&(l+=Object(n.utils_combineText)(e.ability.text,"p","<span class='stat-name'>Ability Score Adjustment:</span> ")),void 0!==e.signaturespells&&(l+=Object(n.utils_combineText)(e.signaturespells.text?e.signaturespells.text:"None","p","<span class='stat-name'>Signature Spells:</span> ")),l+=Object(n.utils_combineText)(i,"p"),t.querySelector(".stats-wrapper .text").innerHTML="<tr class='text'><td colspan='6'>"+l+"</td></tr>"}},131:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return l}));var n=s(71),r=s(5);const i=new n.a;function l(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t\t<div class="source margin-bottom_small"></div>\n\t\t<div class="text variantrules"></div>\n\t</div>';const s=t.querySelector(".stats-wrapper .source");s.classList.add("source"+e.source),s.setAttribute("title",r.a.sourceJsonToAbv(e.source)),s.innerHTML=r.a.sourceJsonToFull(e.source);const n=[];i.recursiveEntryRender(e,n),t.querySelector(".stats-wrapper .text").innerHTML=n.join("")}},132:function(e,t,s){"use strict";var n=s(7),r=(s(82),s(80),s(83),s(134),s(139),s(138),s(141),s(140),s(63),s(72),s(81),s(116),s(11)),i=s(1),l=s(5),a=s(0);class o extends n.a{static get properties(){return{columns:{type:Array},listItems:{type:Array},filters:{type:Array},isMobile:{type:Boolean},searchString:{type:String},selectedFilters:{type:Object},resultsCount:{type:Number}}}ready(){super.ready(),setTimeout(()=>{this.$.grid.addEventListener("active-item-changed",e=>{const t=e.detail.value;this.$.grid.selectedItems=t?[t]:[];const s=[t.name];t.source&&s.push(t.source),Object(r.f)(Object(i.encodeForHash)(s))})},0),window.addEventListener("resize",()=>{this._checkBreakpoint(),this._adjustHeight()}),this._checkBreakpoint(),this._adjustHeight(),setInterval(()=>{this._checkBreakpoint(),this._adjustHeight()},500)}_checkBreakpoint(){this.isMobile=window.innerWidth<=768}_adjustHeight(){if(window.innerWidth<921){const e=this.$.grid.getBoundingClientRect().top;e&&(this.$.grid.style.height=window.innerHeight-e-85+"px")}else this.$.grid.style.height="600px"}_renderPath(e){return"render-"+e}_getPathValue(e,t){return e&&e["render-"+t.id]}_filterOptions(e,t){let s=[{label:"",value:""}],n=!1;if(e&&e.length>0)if(e=e.flat(),"proficiencies"===t){n=!0;const e=Object.keys(l.a.SKILL_JSON_TO_FULL).map(e=>({label:e,value:e}));s=s.concat(e)}else if("ability"===t){n=!0;const e=Object.keys(l.a.ATB_ABV_TO_FULL).map(e=>({label:l.a.ATB_ABV_TO_FULL[e],value:e}));s=s.concat({label:'"Any"',value:"any"},e)}else"item-rarity"===t?(n=!0,s=a.z.map(e=>({label:e,value:e}))):"source"===t?e.forEach(e=>{const n=e["render-"+t];s.some(e=>e.value===n)||s.push({label:l.a.sourceJsonToFullCompactPrefix(n)||n,value:n})}):e.forEach(e=>{const n=e["render-"+t];Array.isArray(n)?s=s.concat(n.map(e=>({label:e,value:e}))):"prerequisite"===t&&n.includes("/")?s=s.concat(n.split("/").map(e=>({label:e.trim(),value:e.trim()}))):"monster-type"!==t&&n.includes(",")?s=s.concat(n.split(",").map(e=>({label:e.trim(),value:e.trim()}))):s.push({label:n,value:n})});const r=[];return s=s.filter(e=>!r.includes(e.value)&&(r.push(e.value),!0)),n||(s=s.sort((e,t)=>{const s=e.label,n=t.label,r=Object(i.isFirstCharNum)(s),l=Object(i.isFirstCharNum)(n);if(r&&!l)return 1;if(l&&!r)return-1;if(r&&l){const e=parseFloat(s),t=parseFloat(n);return e<t?-1:e>t?1:0}return s<n?-1:s>n?1:0})),s}_filterValue(e,t){if(t&&t[e])return t[e]}_selectFilter(e){const t=e.model?e.model.__data.col.id:"name",s=this.selectedFilters?Object(i.cloneDeep)(this.selectedFilters):{};s[t]=e.target.value,this.set("selectedFilters",s)}_clearFilters(){this.root.querySelectorAll("vaadin-select, vaadin-combo-box, vaadin-grid-filter, vaadin-text-field").forEach(e=>{e.value=""})}_isComboBoxFilter(e){switch(e){case"subclasses":case"source":case"rules-search":return!0}return!1}_nameColWidth(e){return e?"175px":"300px"}_colWidth(e,t){return t.length&&e===t.length-1?"200px":"175px"}_optionValue(e){return void 0!==e.value?e.value:e}_optionLabel(e){return void 0!==e.label?e.label:e}_optionLabelClass(e,t){return e&&e.value&&t&&"source"===t.id?"source"+e.value:""}_dataItemClass(e,t){return t&&e&&"source"===t.id?"source"+e.source:""}_isLast(e,t){return t.length&&e===t.length-1}static get template(){return n.b`
      <style include="material-styles my-styles">
        :host {
          display: block;
        }


        .search-wrap {
          margin-bottom: 20px;
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
        }
        .search-reset {
          margin-top: 16px;
        }

        .col-header-wrap {
          display: flex;
          justify-content: space-between;
          width: calc(100% - 20px);
          height: 44px;
        }

        .col-header-wrap[last-item] {
          margin-right: 40px;
        }

        .col-header-wrap--name {
          align-items: center;
          width: 100%;
        }

        .col-header-wrap--name vaadin-grid-sorter {
          position: absolute;
          right: 0px;
          top: 16px;
          padding-right: 0;
          width:100%;
        }
        .name-label {
          display: inline-flex;
          font-size: 16px;
          color: var(--lumo-secondary-text-color);
        }
        .search-count {
          color: var(--lumo-secondary-text-color);
          margin-left: auto;
          font-size: 12px;
          margin-top: 4px;
        }

        .data-item {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        vaadin-grid-sorter {
          padding: 0 8px;
        }

        vaadin-text-field {
          flex-grow: 1;
          max-width: 350px;
          margin-bottom: -4px;
          margin-right: 16px;
          padding-top: 0;
        }

        vaadin-combo-box,
        vaadin-select {
          width: 100%;
        }

        vaadin-combo-box {
          --vaadin-combo-box-overlay-width: 250px;
        }

        vaadin-grid {
          width: calc(100% + 32px);
          margin-left: -16px;
        }

        vaadin-grid-filter {
          display: none;
        }

        @media(min-width: 921px) {
          vaadin-grid {
            width: 100%;
            margin-left: 0;
          }
        }
      </style>

      <div class="search-wrap">
        <vaadin-text-field theme="label--secondary" on-keyup="_selectFilter" label="Search"></vaadin-text-field>
        <dnd-button class="search-reset" on-click="_clearFilters" label="Reset"></dnd-button>
      </div>

      <vaadin-grid id="grid" items="[[listItems]]" theme="no-border no-row-borders hover" size="{{resultsCount}}">
        <vaadin-grid-column frozen width="[[_nameColWidth(isMobile)]]">
          <template class="header">
            <div class="col-header-wrap col-header-wrap--name">
              <span class="name-label">Name</span>
              <span class="search-count">[[resultsCount]] result(s)</span>
              <vaadin-grid-sorter path="name" ></vaadin-grid-sorter>
              <vaadin-grid-filter path="name" value='[[_filterValue("name", selectedFilters)]]'></vaadin-grid-filter>
            </div>
          </template>
          <template>
            <span>[[item.name]]</span>
          </template>
        </vaadin-grid-column>

        <template is="dom-repeat" items="[[columns]]" as="col">
          <vaadin-grid-column width="[[_colWidth(index, columns)]]" >
            <template class="header">
              <div class="col-header-wrap" last-item$="[[_isLast(index, columns)]]">
                <vaadin-grid-filter path="[[_renderPath(col.id)]]" value="[[_filterValue(col.id, selectedFilters)]]"></vaadin-grid-filter>
                    
                <template is="dom-if" if="[[!_isComboBoxFilter(col.id)]]">
                  <vaadin-select placeholder="[[col.label]]" on-change="_selectFilter">
                    <template>
                      <vaadin-list-box>
                        <template is="dom-repeat" items="[[_filterOptions(listItems, col.id)]]" as="option">
                          <vaadin-item value="[[_optionValue(option)]]">[[_optionLabel(option)]]</vaadin-item>
                        </template>
                      </vaadin-list-box>
                    </template>
                  </vaadin-select>
                </template>

                <template is="dom-if" if="[[_isComboBoxFilter(col.id)]]">
                  <vaadin-combo-box placeholder="[[col.label]]" on-change="_selectFilter" items="[[_filterOptions(listItems, col.id)]]">
                  </vaadin-combo-box>
                </template>

                <vaadin-grid-sorter path="[[_renderPath(col.id)]]" ></vaadin-grid-sorter>
              </div>
            </template>
            <template>
              <div class="data-item">
                [[_getPathValue(item, col)]]
                <!-- <span class$="[[_dataItemClass(item, col)]]">[[_getPathValue(item, col)]]</span> -->
              </div>
            </template>
          </vaadin-grid-column>
        </template>
      </vaadin-grid>
    `}}customElements.define("dnd-list",o);class c extends n.a{static get properties(){return{modelId:{type:String,observer:"_modelChange"},selectedItem:{type:Object},allItems:{type:Array},loading:{type:Boolean,value:!1,observer:"_loadingChange"},_modelsRenderSelection:{type:Function},characterOption:{type:Boolean,value:!1}}}static get observers(){return["__renderSelection(_modelsRenderSelection, selectedItem)"]}_loadingChange(){this.dispatchEvent(new CustomEvent("loading-render",{bubbles:!0,composed:!0,detail:{loading:this.loading}}))}__renderSelection(){this._modelsRenderSelection&&this.selectedItem&&(console.error("Selected Item:",this.selectedItem),this._modelsRenderSelection(this.selectedItem,this.shadowRoot,this.allItems),Object(i.initCollapseToggles)(this.shadowRoot))}_modelChange(){this.modelId&&(this.loading=!0,this.set("_modelsRenderSelection",void 0),s(122)(`./${this.modelId}.js`).then(e=>{"function"==typeof e.renderSelection?(this._modelsRenderSelection=e.renderSelection,this.loading=!1):console.error("Model module is missing the renderSelection export.")}).catch(e=>{console.error("Model module failed to load.",e)}))}_exists(e){return!!e}_mainClass(){return this.selectedItem?"main item-opened":"main"}clearSelection(){Object(r.a)(!0)}static get template(){return n.b`
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
    `}}customElements.define("dnd-selected-item",c);var d=s(31),u=s(26);class p extends n.a{static get properties(){return{modelId:{type:String,observer:"_modelChange"},columns:{type:Array},enableHashRouting:{type:Boolean,value:!1,reflectToAttribute:!0},disableScrollBack:{type:Boolean,reflectToAttribute:!0,value:!1},hasSelection:{type:Boolean,reflectToAttribute:!0,value:!1},_data:{type:Array},_filters:{type:Array},_selectedItem:{type:Object},_selectedHash:{type:String},loading:{type:Boolean,value:!0,observer:"_loadingChange"},characterOption:{type:Boolean,value:!1}}}_loadingChange(){this.dispatchEvent(new CustomEvent("loading-data",{bubbles:!0,composed:!0,detail:{loading:this.loading}}))}connectedCallback(){super.connectedCallback(),this.selectionEventHandler=e=>{this._checkHashForSelection(e.detail.selection)},this.deselectionEventHandler=()=>{this._selectedItem=void 0,this.hasSelection=!1},this._checkHashForSelection(),Object(r.e)().addEventListener("selection-change",this.selectionEventHandler),Object(r.e)().addEventListener("selection-deselected",this.deselectionEventHandler),Object(r.e)().addEventListener("view-change",this.deselectionEventHandler)}disconnectedCallback(){super.disconnectedCallback(),Object(r.e)().removeEventListener("selection-change",this.selectionEventHandler),Object(r.e)().removeEventListener("selection-deselected",this.deselectionEventHandler)}_modelChange(){this.modelId&&(this.set("_data",void 0),this.set("_filters",void 0),this.loading=!0,Object(d.b)(this.modelId).then(e=>{const t=Object(u.a)(e,this.columns);this.set("_data",e),console.error("loadedModel",t),this.set("_filters",t),this._checkHashForSelection(),this.loading=!1}).catch(e=>{console.error("Model requested for list did not return.",e)}))}_checkHashForSelection(e){let t=e;if(t||(t=Object(r.c)()),t&&this.enableHashRouting&&Array.isArray(this._data)){const e=Object(u.b)(this._data,t);e?(this.set("_selectedItem",e),this.hasSelection=!0,this.disableScrollBack||window.scrollTo(0,0),Object(r.e)().dispatchEvent(new CustomEvent("title-change",{bubbles:!0,composed:!0,detail:e}))):Object(r.a)(!0)}}static get template(){return n.b`
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
    `}}customElements.define("dnd-selection-list",p)},98:function(e,t,s){"use strict";s.r(t);var n=s(7);s(63),s(72),s(85),s(132);class r extends n.a{static get template(){return n.b`
      <style include="material-styles my-styles"></style>
      
      <dnd-selection-list
        enable-hash-routing
        model-id="conditions"
        columns='[]'
      >
      </dnd-selection-list>
    `}}customElements.define("dnd-conditions-view",r)}}]);
//# sourceMappingURL=17.bundle.js.map