(window.webpackJsonp=window.webpackJsonp||[]).push([[5,9],{143:function(e,t,s){"use strict";var i=s(3),a=s(32),l=s(1),o=(s(88),s(40));class d extends i.a{static get properties(){return{test:{type:Boolean,reflectToAttribute:!0,value:!1},options:{type:Array,observer:"optionsUpdated"},model:{type:String},addCallback:{type:Function},value:{type:String,value:"",observer:"valueUpdated"},choices:{type:Number,observer:"choicesUpdated"},paren:{type:String},label:{type:String},placeholder:{type:String},multiValue:{type:String,value:""},disabled:{type:Boolean,value:!1,reflectToAttribute:!0}}}choicesUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}optionsUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}valueUpdated(){if(this.choices)if(Array.isArray(this.value)&&this.options){const e=this.value.map(e=>-1!==this.options.indexOf(e)?this.options.indexOf(e):this.options.findIndex(t=>t.name===e.name&&t.source===e.source)).filter(e=>-1!==e);this.listBox&&(this.listBox.selectedValues=e),this.multiValue=e.map(e=>{let t=this.options[e];return t.name?t.name:Object(l.util_capitalizeAll)(t)}).join(", ")}else this.listBox&&(this.listBox.selectedValues=[]),this.multiValue="";else this.value&&this.options?this.value.source?this.$.select.value=this.options.findIndex(e=>e.name===this.value.name&&e.source===this.value.source||e===this.value.name)+"":this.value.name?this.$.select.value=this.options.findIndex(e=>e.name===this.value.name||e===this.value.name)+"":this.$.select.value=this.options.findIndex(e=>e.name===this.value||e===this.value)+"":this.$.select.value=""}ready(){super.ready(),setTimeout(async()=>{this.model&&(this.options=await Object(o.b)(this.model)),this.$.select.renderer=(e,t)=>{if(!this.listBox){if(this.listBox=document.createElement("vaadin-list-box"),this.choices&&(this.listBox.setAttribute("multiple",!0),this.listBox.addEventListener("click",e=>{t.opened=!0;let s=null!==e.srcElement.getAttribute("selected");setTimeout(()=>{this.listBox.selectedValues.length>this.choices&&!s&&this.listBox.selectedValues.splice(this.listBox.selectedValues.length-2,1);let e=this.listBox.selectedValues.map(e=>this.options[e]);this.multiValue=e.map(e=>e.name?e.name:Object(l.util_capitalizeAll)(e)).join(", "),this.addCallback&&this.addCallback(e)},0)})),this.options&&this.options.length)for(let e=0;e<this.options.length;e++){const t=this.options[e],s=document.createElement("vaadin-item"),i=t.name||Object(l.util_capitalizeAll)(t);s.innerHTML=`<span>${i}</span> ${t.name?`<span style='font-size: 14px;color: var(--lumo-primary-color-50pct);'>${t.source}</span>`:""}`,s.setAttribute("value",e),this.listBox.appendChild(s)}e.appendChild(this.listBox),this.$.select._assignMenuElement(),this.valueUpdated()}}},0)}connectedCallback(){super.connectedCallback(),this.selectChangeHandler=()=>{const e=this.$.select.value;if(e&&!this.choices){const t=this.options[e];this.addCallback?this.addCallback(t,this.model):Object(a.Q)(void 0,t,this.model),this.value||(this.$.select.value="")}},this.$.select.addEventListener("change",this.selectChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),this.$.select.removeEventListener("change",this.selectChangeHandler)}_exists(e){return!!e}_label(e,t,s){let i="";return e&&(i=e,t&&1!==t&&100!==t&&(i+=` (pick ${t})`),s&&(i+=` (${s})`)),i}static get template(){return i.b`
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
      <vaadin-select test$="[[test]]" theme="dark" add id="select" label="[[_label(label, choices, paren)]]" placeholder="[[placeholder]]" disabled$="[[disabled]]">
        <div hidden$="[[!_exists(multiValue)]]" slot="prefix">
          <span class="prefix">[[multiValue]]</span>
        </div>
      </vaadin-select>
      
    `}}customElements.define("dnd-select-add",d)},147:function(e,t,s){"use strict";s.r(t);var i=s(3),a=s(32),l=s(142),o=s(1),d=s(40),c=(s(143),s(109)),n=(s(70),s(90),s(0));class r extends i.a{static get properties(){return{storageKey:{type:String},selectedItem:{type:Object},skillProfOptions:{type:Array,value:[]},skillProfChoices:{type:Number},selectedSkillProfs:{type:Array},defaultSkillProfs:{type:String,value:""},toolProfOptions:{type:Array,value:[]},defaultToolProfs:{type:String,value:""},langProfOptions:{type:Array,value:[]},defaultLangProfs:{type:String,value:""},attributeOptions:{type:Array,value:[]},attributeChoices:{type:Number},attributeMod:{type:Number},selectedAttributes:{type:Array},defaultAttributes:{type:String,value:""},featOptions:{type:Array,value:[]},featChoices:{type:Number},selectedFeat:{type:Array},isEditMode:{type:Boolean,value:!1},dontCreateIfMissing:{type:Boolean,value:!1,reflectToAttribute:!0}}}static get observers(){return["updateOptions(selectedItem, storageKey, character)"]}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.set("character",t),this.updateOptions()},this.set("character",Object(a.H)()),Object(a.n)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(l.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(l.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(a.n)().removeEventListener("character-selected",this.characterChangeHandler),Object(l.b)().removeEventListener("editModeChange",this.editModeHandler)}async updateOptions(){if(this.character&&this.storageKey&&this.selectedItem){const e=this.storageKey.split(".");this.character.choices||(this.character.choices={});let t=this.character.choices;for(let s=0;s<e.length;s++){const i=e[s];if(!t[i]){if(this.dontCreateIfMissing)return void this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}));e.length<s+1&&!isNaN(parseInt(e[s+1],10))?t[i]=new Array(20):t[i]={}}t=t[i]}if(this.storedItem=t,this.attributeOptions=[],this.attributeChoices=null,this.attributeMod=1,this.selectedAttributes=null,this.defaultAttributes=null,this.selectedItem.ability&&this.selectedItem.ability.length){const e=this.selectedItem.ability[0];e.choose&&(this.attributeOptions=e.choose.from.map(e=>e.toUpperCase()),this.attributeChoices=e.choose.count||1,this.attributeMod=e.choose.amount||1,this.selectedAttributes=this.storedItem.selectedAttributes?this.storedItem.selectedAttributes.split(","):null),this.defaultAttributes=Object.entries(e).map(e=>{if("choose"!==e[0]&&"any"!==e[0]){let t=e[0].toLowerCase(),s=e[1];return t.toUpperCase()+" "+Object(o.absInt)(s)}}).filter(e=>!!e).join(", "),this.storedItem.defaultAttributes=this.defaultAttributes,this.storedItem.attributeMod=this.attributeMod}if(this.skillProfOptions=[],this.skillProfChoices=null,this.selectedSkillProfs=null,this.defaultSkillProfs=null,this.selectedItem.skillProficiencies&&this.selectedItem.skillProficiencies.length){const e=this.selectedItem.skillProficiencies[0];e.choose&&(this.skillProfOptions=e.choose.from,this.skillProfChoices=e.choose.count||1,this.selectedSkillProfs=this.storedItem.selectedSkillProfs?this.storedItem.selectedSkillProfs.split(","):null),e.any&&("Custom Lineage"===this.selectedItem.name?this.skillProfOptions=["Darkvision (60ft)"].concat(Object.keys(c.SKILL_TO_ATB_ABV)):this.skillProfOptions=Object.keys(c.SKILL_TO_ATB_ABV),this.skillProfChoices=e.any,this.selectedSkillProfs=this.storedItem.selectedSkillProfs?this.storedItem.selectedSkillProfs.split(","):null),this.defaultSkillProfs=Object.keys(e).map(e=>{if("choose"!==e&&"any"!==e)return Object(o.util_capitalizeAll)(e)}).filter(e=>!!e).join(", "),this.storedItem.defaultSkillProfs=this.defaultSkillProfs}const s=[];let i=[];if(this.selectedItem.toolProficiencies&&this.selectedItem.toolProficiencies.length)if(this.selectedItem.toolProficiencies.length>1);else{this.storedItem.selectedToolProfs&&"string"!=typeof this.storedItem.selectedToolProfs||(this.storedItem.selectedToolProfs={});const e=this.selectedItem.toolProficiencies[0];Object.entries(e).forEach(([t,a])=>{const l={key:t,toolProfOptions:Object(n.Zc)(t),selectedToolProfs:this.storedItem.selectedToolProfs[t]?this.storedItem.selectedToolProfs[t].split(","):null};switch(t){case"choose":const d=e.choose.from.map(n.Zc);l.toolProfOptions=d.flat(),l.toolProfChoices=e.choose.count||1,s.push(l);break;case"any":l.toolProfChoices=e.any||1,s.push(l);break;case"artisan's tools":case"musical instrument":case"gaming set":l.label="Selected "+Object(o.util_capitalizeAll)(t),l.toolProfChoices=Number.isInteger(a)?a:1,s.push(l);break;default:i.push(Object(o.util_capitalizeAll)(t))}}),i=i.filter(e=>!!e).join(", "),this.defaultToolProfs=i,this.storedItem.defaultToolProfs=i}this.toolProfOptions=s;const a=[];let l=[];this.selectedItem.languageProficiencies&&this.selectedItem.languageProficiencies.length&&(this.storedItem.selectedLangProfs&&"string"!=typeof this.storedItem.selectedLangProfs||(this.storedItem.selectedLangProfs={}),this.selectedItem.languageProficiencies.forEach(e=>{Object.entries(e).forEach(([t,s])=>{const i={key:t,langProfOptions:Object(n.Zc)(t),selectedLangProfs:this.storedItem.selectedLangProfs[t]?this.storedItem.selectedLangProfs[t].split(","):null};switch(t){case"choose":i.langProfOptions=a.choose.from,i.langProfChoices=e.choose.count||1,a.push(i);break;case"any":case"anyStandard":i.langProfOptions=n.s,i.langProfChoices=Number.isInteger(s)?s:1,a.push(i);break;case"other":let d=this.selectedItem.name;d.includes("(")&&(d=d.substring(0,d.indexOf("(")).trim()),l.push(d);break;default:l.push(Object(o.util_capitalizeAll)(t))}})}),l=l.filter(e=>!!e).join(", "),console.error("defaultLangProfs",this.selectedItem.name,l),this.defaultLangProfs=l,this.storedItem.defaultLangProfs=l),this.langProfOptions=a,console.error("langProfOptions",this.selectedItem.name,a),this.featOptions=[],this.featChoices=null,this.selectedFeat=null,this.selectedItem.feats&&(this.featOptions=await Object(d.b)("feats"),this.featChoices=this.selectedItem.feats,this.selectedFeat=this.storedItem.selectedFeat),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}}_skillProficiencyAddCallback(){return(e=>{this.storedItem.selectedSkillProfs=e.join(","),Object(a.Y)(this.character)}).bind(this)}_toolProficiencyAddCallback(e){return(t=>{this.storedItem.selectedToolProfs[e]=t.join(","),Object(a.Y)(this.character)}).bind(this)}_langProficiencyAddCallback(e){return(t=>{this.storedItem.selectedLangProfs[e]=t.join(","),Object(a.Y)(this.character)}).bind(this)}_attributeAddCallback(){return(e=>{this.storedItem.selectedAttributes=e.join(","),Object(a.Y)(this.character)}).bind(this)}_featAddCallback(){return(e=>{this.storedItem.selectedFeat=e,Object(a.Y)(this.character)}).bind(this)}_suboptionStorageKey(e){return e+".suboptions"}_showEmpty(e,t){return!e&&!t}_exists(){for(let e of arguments)if(e&&(e.constructor!==Object||Object.entries(e).length>0)&&(!Array.isArray(e)||e.length>0))return!0;return!1}_plusPrefix(e){return console.error(e),"+"+e}_plural(e,t,s){const i=s||e;return t>1?i+"s":i}static get template(){return i.b`
            <style include="material-styles">
                [hidden] {
                    display: none !important;
                }
                dnd-select-add {
                    width: 100%;
                }
                @media(min-width: 420px) {
                    dnd-select-add {
                        
                    }
                }

                @media(min-width: 921px) {
                }
            </style>

            <div class="col-wrap">
                <div hidden$="[[!_exists(defaultAttributes)]]" class="default-selection">Default Attributes: <span>[[defaultAttributes]]</span></div>

                <div hidden$="[[!_exists(defaultSkillProfs)]]" class="default-selection">Default Skills: <span>[[defaultSkillProfs]]</span></div>

                <div hidden$="[[!_exists(defaultToolProfs)]]" class="default-selection">Default Tools: <span>[[defaultToolProfs]]</span></div>

                <div hidden$="[[!_exists(defaultLangProfs)]]" class="default-selection">Default Languages: <span>[[defaultLangProfs]]</span></div>

                <template is="dom-if" if="[[_exists(attributeOptions)]]">
                    <dnd-select-add disabled$="[[!isEditMode]]" 
                        placeholder="<Select Attribute>" label='[[_plural("Selected Attribute", attributeChoices)]]'
                        choices="[[attributeChoices]]" paren="[[_plusPrefix(attributeMod)]]" options="[[attributeOptions]]"
                        value="[[selectedAttributes]]" add-callback="[[_attributeAddCallback()]]">
                    </dnd-select-add>
                </template>

                <template is="dom-if" if="[[_exists(skillProfOptions)]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Skill>" label='[[_plural("Selected Skill", skillProfChoices)]]'
                        choices="[[skillProfChoices]]" options="[[skillProfOptions]]"
                        value="[[selectedSkillProfs]]" add-callback="[[_skillProficiencyAddCallback()]]">
                    </dnd-select-add>
                </template>

                <template is="dom-repeat" items="[[toolProfOptions]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Tool>" label='[[_plural("Selected Tool", item.toolProfChoices, item.label)]]'
                        choices="[[item.toolProfChoices]]" options="[[item.toolProfOptions]]"
                        value="[[item.selectedToolProfs]]" add-callback="[[_toolProficiencyAddCallback(item.key)]]">
                    </dnd-select-add>
                </template>

                <template is="dom-repeat" items="[[langProfOptions]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Language>" label='[[_plural("Selected Language", item.langProfChoices, item.label)]]'
                        choices="[[item.langProfChoices]]" options="[[item.langProfOptions]]"
                        value="[[item.selectedLangProfs]]" add-callback="[[_langProficiencyAddCallback(item.key)]]">
                    </dnd-select-add>
                </template>

                <!-- Todo: add language and tool proficiencies -->

                <template is="dom-if" if="[[_exists(featOptions)]]">
                    <dnd-select-add disabled$="[[!isEditMode]]"
                        placeholder="<Select Feat>" label="Selected Feat"
                        options="[[featOptions]]" value="[[selectedFeat]]"
                        add-callback="[[_featAddCallback()]]">
                    </dnd-select-add>
                    
                    <template is="dom-if" if="[[_exists(selectedFeat)]]"></template>
                        <dnd-character-builder-suboptions storage-key="[[_suboptionStorageKey(storageKey)]]" selected-item="[[selectedFeat]]"></dnd-character-builder-suboptions>
                    </template>
                </template>
            </div>
        `}}customElements.define("dnd-character-builder-suboptions",r)},154:function(e,t,s){"use strict";s.r(t);var i=s(3),a=s(32),l=(s(147),s(88),s(142)),o=s(1);class d extends i.a{static get properties(){return{selectedBackground:{type:String,value:""},selectedBackgroundRef:{type:Object},selectedRace:{type:String,value:""},selectedRaceRef:{type:Object},isEditMode:{type:Boolean,value:!1},backgroundName:{type:String,value:""},raceName:{type:String,value:""}}}constructor(){super(),this.additionalOptionAddOptions=["Feat","Attribute +1","Attribute +2","Skill","Language","Tool"]}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(a.H)()),Object(a.n)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(l.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(l.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(a.n)().removeEventListener("character-selected",this.characterChangeHandler),Object(l.b)().removeEventListener("editModeChange",this.editModeHandler)}async updateFromCharacter(e){let t=0,s=Object.entries(e.choices).filter(([e,s])=>{if(e.includes("additionalChoice")){const i=parseInt(e.substring(e.indexOf("_")+1));return i>t&&(t=i),s?(s.index=i,!0):!1}return!1}).map(([e,t])=>(t.key=e,t));this.maxAdditionalOptionsIndex=t,this.set("additionalOptions",s),console.error("additionalOptions",s),this.selectedBackground=e.background,this.selectedBackgroundRef=await Object(a.l)(),this.backgroundName=this.selectedBackground.name,this.selectedRace=e.race,this.selectedRaceRef=await Object(a.G)(),this.raceName=this.selectedRace.name,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}_getRaceLink(e){let t=[e.name];e.source&&t.push(e.source);let s=Object(o.encodeForHash)(t);return e?"#/races/"+s:"#/races"}_getBackgroundLink(e){let t=[e.name];e.source&&t.push(e.source);let s=Object(o.encodeForHash)(t);return e?"#/backgrounds/"+s:"#/backgrounds"}_linkClick(e){const t=e.target.classList.contains("background");this.dispatchEvent(new CustomEvent("open-drawer",{bubbles:!0,composed:!0,detail:{selectedItem:t?this.selectedBackground:this.selectedRace,viewId:t?"backgrounds":"races"}}))}_addAdditionalOption(e){const t=this.$.optionAdd.value;Object(a.a)(t,this.maxAdditionalOptionsIndex+1),this.$.optionAdd.value=""}_deleteAdditionalOption(e){const t=e.model.__data.item.key;Object(a.h)(t)}_showEmpty(e,t){return!e&&!t}_exists(){for(let e of arguments)if(e&&(e.constructor!==Object||Object.entries(e).length>0)&&(!Array.isArray(e)||e.length>0))return!0;return!1}static get template(){return i.b`
      <style include="material-styles my-styles">
        body {}
        :host {
          display: block;
          padding: 14px;
        }
        [hidden] {
          display: none !important;
        }

        .col-wrap {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-bottom: 200px;
        }

        .row-wrap {
          width: 100%;
        }
        .row-wrap:first-child {
          margin-bottom: 24px;
        }

        .row-wrap > *:not(h2):not(:last-child) {
          margin-bottom: 10px;
        }

        .heading {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--lumo-contrast-10pct);
        }
        .reference-link:hover {
          color: var(--mdc-theme-secondary);
        }

        .default-selection {
          font-size: 14px;
          margin-bottom: 0 !important;
        }

        .default-selection span {
          color: var(--mdc-theme-secondary)
        }

        .missing-text {
          font-style: italic;
          font-size: 14px;
        }

        @media(min-width: 420px) {
          .heading {
            justify-content: flex-start;
          }
          .reference-link {
            margin-left: 8px;
          }
        }

        @media(min-width: 921px) {
          .row-wrap {
            width: calc(50% - 10px);
          }
          .row-wrap:first-child {
            margin-bottom: 0;
          }
        }

        h2 {
          display: block;
          font-size: 1.5em;
          margin-block-start: 0.83em;
          margin-block-end: 0.83em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          font-weight: bold;
        }

        h3 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 8px;
        }
        .details-container  {
          background: var(--lumo-contrast-10pct);
          padding: 14px;
          border-radius: 4px;
          font-size: 14px;
        }
        .stats-wrapper.margin-bottom_large {
          margin-bottom: 0px !important;
        }
        dnd-select-add {
          --lumo-font-size-m: 20px;
          width: 100%;
        }

        dnd-character-builder-suboptions {
          display: block;
          margin-left: 30px;
        }
      </style>

      <div class="col-wrap">
        <div class="row-wrap">
          <div class="heading">
            <h2>Race</h2>
            <button class="mdc-icon-button material-icons" on-click="_linkClick">logout</button>
          </div>
          <dnd-select-add model="races" value="[[selectedRace]]" placeholder="<Choose Race>" disabled$="[[!isEditMode]]" hidden$="[[_showEmpty(isEditMode, selectedRace)]]"></dnd-select-add>
          <div class="missing-text" hidden$="[[_exists(selectedRace)]]">Select Race to add Attribute Bonuses</div>
          <dnd-character-builder-suboptions storage-key="race" selected-item="[[selectedRaceRef]]"></dnd-character-builder-suboptions>
        </div>

        <div class="row-wrap">
          <div class="heading">
            <h2>Background</h2>
            <button class="mdc-icon-button material-icons background" on-click="_linkClick">logout</button>
          </div>
          <dnd-select-add model="backgrounds" value="[[selectedBackground]]" placeholder="<Choose Background>" disabled$="[[!isEditMode]]" hidden$="[[_showEmpty(isEditMode, selectedBackground)]]"></dnd-select-add>
          <div class="missing-text" hidden$="[[_exists(selectedBackground)]]">Select Background to add Skill Proficiencies</div>
          <dnd-character-builder-suboptions storage-key="background" selected-item="[[selectedBackgroundRef]]"></dnd-character-builder-suboptions>
        </div>

        <div class="row-wrap">
          <div class="heading">
              <h2>Additional Options</h2>
          </div>
          <vaadin-select id="optionAdd" class="label--secondary" label="Add Additional Option" on-change="_addAdditionalOption" placeholder="<Add Additional Feature>" disabled$="[[!isEditMode]]" hidden$="[[!isEditMode]]">
            <template>
              <vaadin-list-box>
                <template is="dom-repeat" items="[[additionalOptionAddOptions]]">
                  <vaadin-item>[[item]]</vaadin-item>
                </template>
              </vaadin-list-box>
            </template>
          </vaadin-select>

          <div class="added-options">
            <template is="dom-repeat" items="[[additionalOptions]]">
              <div>
                Extra [[item.choiceKey]]
                <button class="mdc-icon-button material-icons" on-click="_deleteAdditionalOption">delete</button>
                <dnd-character-builder-suboptions dont-create-if-missing storage-key="[[item.key]]" selected-item="[[item]]"></dnd-character-builder-suboptions>
              </div>
            </template>
          </div>
        </div>
      </div>
    `}}customElements.define("dnd-character-builder-background-race",d)}}]);
//# sourceMappingURL=5.bundle.js.map