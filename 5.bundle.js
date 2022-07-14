(window.webpackJsonp=window.webpackJsonp||[]).push([[5,9],{143:function(e,t,s){"use strict";var i=s(3),a=s(32),l=s(1),d=(s(89),s(40));class c extends i.a{static get properties(){return{test:{type:Boolean,reflectToAttribute:!0,value:!1},options:{type:Array,observer:"optionsUpdated"},model:{type:String},addCallback:{type:Function},value:{type:String,value:"",observer:"valueUpdated"},choices:{type:Number,observer:"choicesUpdated"},paren:{type:String},label:{type:String},placeholder:{type:String},multiValue:{type:String,value:""},disabled:{type:Boolean,value:!1,reflectToAttribute:!0}}}choicesUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}optionsUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}valueUpdated(){if(this.choices)if(Array.isArray(this.value)&&this.options){const e=this.value.map(e=>-1!==this.options.indexOf(e)?this.options.indexOf(e):this.options.findIndex(t=>t.name===e.name&&t.source===e.source)).filter(e=>-1!==e);this.listBox&&(this.listBox.selectedValues=e),this.multiValue=e.map(e=>{let t=this.options[e];return t.name?t.name:Object(l.util_capitalizeAll)(t)}).join(", ")}else this.listBox&&(this.listBox.selectedValues=[]),this.multiValue="";else this.value&&this.options?this.value.source?this.$.select.value=this.options.findIndex(e=>e.name===this.value.name&&e.source===this.value.source||e===this.value.name)+"":this.value.name?this.$.select.value=this.options.findIndex(e=>e.name===this.value.name||e===this.value.name)+"":this.$.select.value=this.options.findIndex(e=>e.name===this.value||e===this.value)+"":this.$.select.value=""}ready(){super.ready(),setTimeout(async()=>{this.model&&(this.options=await Object(d.b)(this.model)),this.$.select.renderer=(e,t)=>{if(!this.listBox){if(this.listBox=document.createElement("vaadin-list-box"),this.choices&&(this.listBox.setAttribute("multiple",!0),this.listBox.addEventListener("click",e=>{t.opened=!0;let s=null!==e.srcElement.getAttribute("selected");setTimeout(()=>{this.listBox.selectedValues.length>this.choices&&!s&&this.listBox.selectedValues.splice(this.listBox.selectedValues.length-2,1);let e=this.listBox.selectedValues.map(e=>this.options[e]);this.multiValue=e.map(e=>e.name?e.name:Object(l.util_capitalizeAll)(e)).join(", "),this.addCallback&&this.addCallback(e)},0)})),this.options&&this.options.length)for(let e=0;e<this.options.length;e++){const t=this.options[e],s=document.createElement("vaadin-item"),i=t.name||Object(l.util_capitalizeAll)(t);s.innerHTML=`<span>${i}</span> ${t.name?`<span style='font-size: 14px;color: var(--lumo-primary-color-50pct);'>${t.source}</span>`:""}`,s.setAttribute("value",e),this.listBox.appendChild(s)}e.appendChild(this.listBox),this.$.select._assignMenuElement(),this.valueUpdated()}}},0)}connectedCallback(){super.connectedCallback(),this.selectChangeHandler=()=>{const e=this.$.select.value;if(e&&!this.choices){const t=this.options[e];this.addCallback?this.addCallback(t,this.model):Object(a.O)(void 0,t,this.model),this.value||(this.$.select.value="")}},this.$.select.addEventListener("change",this.selectChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),this.$.select.removeEventListener("change",this.selectChangeHandler)}_exists(e){return!!e}_label(e,t,s){let i="";return e&&(i=e,t&&1!==t&&100!==t&&(i+=` (pick ${t})`),s&&(i+=` (${s})`)),i}static get template(){return i.b`
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
      
    `}}customElements.define("dnd-select-add",c)},147:function(e,t,s){"use strict";s.r(t);var i=s(3),a=s(32),l=s(142),d=s(1),c=s(40),o=(s(143),s(109));s(79);class r extends i.a{static get properties(){return{storageKey:{type:String},selectedItem:{type:Object},skillProfOptions:{type:Array,value:[]},skillProfChoices:{type:Number},selectedSkillProfs:{type:Array},defaultSkillProfs:{type:String,value:""},attributeOptions:{type:Array,value:[]},attributeChoices:{type:Number},attributeMod:{type:Number},selectedAttributes:{type:Array},defaultAttributes:{type:String,value:""},featOptions:{type:Array,value:[]},featChoices:{type:Number},selectedFeat:{type:Array},isEditMode:{type:Boolean,value:!1}}}static get observers(){return["updateOptions(selectedItem, storageKey, character)"]}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.set("character",t),this.updateOptions()},this.set("character",Object(a.F)()),Object(a.l)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(l.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(l.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(a.l)().removeEventListener("character-selected",this.characterChangeHandler),Object(l.b)().removeEventListener("editModeChange",this.editModeHandler)}async updateOptions(){if(this.character&&this.storageKey&&this.selectedItem){const e=this.storageKey.split(".");this.character.choices||(this.character.choices={});let t=this.character.choices;for(let s=0;s<e.length;s++){const i=e[s];t[i]||(e.length<s+1&&!isNaN(parseInt(e[s+1],10))?t[i]=new Array(20):t[i]={}),t=t[i]}if(this.storedItem=t,this.attributeOptions=[],this.attributeChoices=null,this.attributeMod=1,this.selectedAttributes=null,this.defaultAttributes=null,this.selectedItem.ability&&this.selectedItem.ability.length){const e=this.selectedItem.ability[0];e.choose&&(this.attributeOptions=e.choose.from.map(e=>e.toUpperCase()),this.attributeChoices=e.choose.count||1,this.attributeMod=e.choose.amount||1,this.selectedAttributes=this.storedItem.selectedAttributes?this.storedItem.selectedAttributes.split(","):null),this.defaultAttributes=Object.entries(e).map(e=>{if("choose"!==e[0]&&"any"!==e[0]){let t=e[0].toLowerCase(),s=e[1];return t.toUpperCase()+" "+Object(d.absInt)(s)}}).filter(e=>!!e).join(", "),this.storedItem.defaultAttributes=this.defaultAttributes,this.storedItem.attributeMod=this.attributeMod}if(this.skillProfOptions=[],this.skillProfChoices=null,this.selectedSkillProfs=null,this.defaultSkillProfs=null,this.selectedItem.skillProficiencies&&this.selectedItem.skillProficiencies.length){const e=this.selectedItem.skillProficiencies[0];e.choose&&(this.skillProfOptions=e.choose.from,this.skillProfChoices=e.choose.count||1,this.selectedSkillProfs=this.storedItem.selectedSkillProfs?this.storedItem.selectedSkillProfs.split(","):null),e.any&&(this.skillProfOptions=Object.keys(o.SKILL_TO_ATB_ABV),this.skillProfChoices=e.any,this.selectedSkillProfs=this.storedItem.selectedSkillProfs?this.storedItem.selectedSkillProfs.split(","):null),this.defaultSkillProfs=Object.keys(e).map(e=>{if("choose"!==e&&"any"!==e)return Object(d.util_capitalizeAll)(e)}).filter(e=>!!e).join(", "),this.storedItem.defaultSkillProfs=this.defaultSkillProfs}this.featOptions=[],this.featChoices=null,this.selectedFeat=null,this.selectedItem.feats&&(this.featOptions=await Object(c.b)("feats"),this.featChoices=this.selectedItem.feats,this.selectedFeat=this.storedItem.selectedFeat),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}}_skillProficiencyAddCallback(){return(e=>{this.storedItem.selectedSkillProfs=e.join(","),Object(a.W)(this.character)}).bind(this)}_attributeAddCallback(){return(e=>{this.storedItem.selectedAttributes=e.join(","),Object(a.W)(this.character)}).bind(this)}_featAddCallback(){return(e=>{this.storedItem.selectedFeat=e,Object(a.W)(this.character)}).bind(this)}_suboptionStorageKey(e){return e+".suboptions"}_showEmpty(e,t){return!e&&!t}_exists(){for(let e of arguments)if(e&&(e.constructor!==Object||Object.entries(e).length>0)&&(!Array.isArray(e)||e.length>0))return!0;return!1}_plusPrefix(e){return console.error(e),"+"+e}_plural(e,t){return t>1?e+"s":e}static get template(){return i.b`
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
        `}}customElements.define("dnd-character-builder-suboptions",r)},154:function(e,t,s){"use strict";s.r(t);var i=s(3),a=s(32),l=(s(147),s(142)),d=s(1);class c extends i.a{static get properties(){return{selectedBackground:{type:String,value:""},selectedBackgroundRef:{type:Object},selectedRace:{type:String,value:""},selectedRaceRef:{type:Object},isEditMode:{type:Boolean,value:!1},backgroundName:{type:String,value:""},raceName:{type:String,value:""}}}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(a.F)()),Object(a.l)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(l.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(l.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(a.l)().removeEventListener("character-selected",this.characterChangeHandler),Object(l.b)().removeEventListener("editModeChange",this.editModeHandler)}async updateFromCharacter(e){this.selectedBackground=e.background,this.selectedBackgroundRef=await Object(a.j)(),this.backgroundName=this.selectedBackground.name,this.selectedRace=e.race,this.selectedRaceRef=await Object(a.E)(),this.raceName=this.selectedRace.name,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}_getRaceLink(e){let t=[e.name];e.source&&t.push(e.source);let s=Object(d.encodeForHash)(t);return e?"#/races/"+s:"#/races"}_getBackgroundLink(e){let t=[e.name];e.source&&t.push(e.source);let s=Object(d.encodeForHash)(t);return e?"#/backgrounds/"+s:"#/backgrounds"}_linkClick(e){const t=e.target.classList.contains("background");this.dispatchEvent(new CustomEvent("open-drawer",{bubbles:!0,composed:!0,detail:{selectedItem:t?this.selectedBackground:this.selectedRace,viewId:t?"backgrounds":"races"}}))}_showEmpty(e,t){return!e&&!t}_exists(){for(let e of arguments)if(e&&(e.constructor!==Object||Object.entries(e).length>0)&&(!Array.isArray(e)||e.length>0))return!0;return!1}static get template(){return i.b`
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
      </div>
    `}}customElements.define("dnd-character-builder-background-race",c)}}]);
//# sourceMappingURL=5.bundle.js.map