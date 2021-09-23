(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{127:function(e,t,a){"use strict";a.r(t);var d=a(7),l=(a(76),a(1)),i=a(18),o=a(108),s=a(73);class n extends d.a{static get properties(){return{isEditMode:{type:Boolean,value:!1}}}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(i.G)()),Object(i.m)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(o.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(o.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(i.m)().removeEventListener("character-selected",this.characterChangeHandler),Object(o.b)().removeEventListener("editModeChange",this.editModeHandler)}async updateFromCharacter(e){this.customRolls=e.customRolls||[],this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}__exists(){for(let e of arguments)if(e&&(e.constructor!==Object||Object.entries(e).length>0)&&(!Array.isArray(e)||e.length>0))return!0;return!1}__abs(e){return e>=0?"+"+e:e}_makeRoll(e){if(!this.isEditMode){let t=e.model.__data.item;t.toHit&&Object(s.b)(t.name+" (to hit)","1d20"+this.__abs(t.toHit)),t.damages.forEach((e,a)=>{setTimeout(()=>{Object(s.b)(`${t.name} (${e.type} damage)`,e.roll)},300*(a+1))})}}_rollChangeHandler(e){const t=Object(l.findInPath)(".roll",e).getAttribute("index"),a=parseInt(t,10);Object(i.eb)(this.customRolls[a],a)}_addRoll(){const e={name:"",toHit:0,damages:[{roll:"",type:""}]};this.push("customRolls",e),Object(i.eb)(e,this.customRolls.length-1)}_removeRoll(e){const t=Object(l.findInPath)(".roll",e).getAttribute("index"),a=parseInt(t,10);this.splice("customRolls",a,1),Object(i.Q)(a)}_addDamage(e){const t=Object(l.findInPath)(".roll",e).getAttribute("index"),a=parseInt(t,10),d=this.customRolls[a];d.damages.push({roll:"",type:""}),this.splice("customRolls",a,1,d),Object(i.eb)(d,a)}static get template(){return d.b`
    <style include="material-styles">
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
      }
      .row-wrap {
        width: 100%;
      }

      h2 {
        margin-bottom: 24px;
      }

      .roll {
        display: flex;
        flex-direction: column;
        cursor: pointer;
      }
      .roll-header {
        display: flex;
        justify-content: space-between;
      }
      .roll-header dnd-button {
        margin-top: 36px;
      }
      h3 {
        margin-bottom: 4px;
      }
      .roll__to-hit {
        margin-right: 10px;
      }
      .roll-footer {
        display: flex;
      }
      .roll__damages {
        display: flex;
        flex-direction: column;
      }
      .roll__damage {
        display: flex;
      }
    </style>
    
    <div class="col-wrap">
      <div class="row-wrap">
        <h2>Rolls</h2>

        <div class="rolls rolls--custom">

          <template is="dom-repeat" items="[[customRolls]]">
            <div class="roll" on-click="_makeRoll" index$="[[index]]">
              <div class="roll-header">
                <h3 hidden$="[[isEditMode]]">[[item.name]]</h3>
                <vaadin-text-field hidden$="[[!isEditMode]]" value="{{item.name}}" on-change="_rollChangeHandler" label="Name"></vaadin-text-field>
                <dnd-button hidden$="[[!isEditMode]]" label="Remove" icon="remove" on-click="_removeRoll"></dnd-button>
              </div>

              <div class="roll-footer">
                <div class="roll__to-hit">
                  <span hidden$="[[isEditMode]]">to hit: <span>[[__abs(item.toHit)]]</span></span>
                  <vaadin-integer-field hidden$="[[!isEditMode]]" value="{{item.toHit}}" on-change="_rollChangeHandler" min="-20" max="20" has-controls label="To Hit"></vaadin-integer-field>
                </div>

                <div class="roll__damages">
                  <template is="dom-repeat" items="[[item.damages]]" as="damage">
                    <div class="roll__damage">
                      <span class="roll__damage-roll" hidden$="[[isEditMode]]" >[[damage.roll]]</span>
                      <div class="roll__damage-roll--edit" hidden$="[[!isEditMode]]">
                        <vaadin-text-field value="{{damage.roll}}" on-change="_rollChangeHandler" label="Damage Roll"></vaadin-text-field>
                      </div>
                      <span class="roll__damage-type" hidden$="[[isEditMode]]" >[[damage.type]]</span>
                      <div class="roll__damage-type--edit" hidden$="[[!isEditMode]]">
                        <vaadin-select value="{{damage.type}}" on-change="_rollChangeHandler" label="Damage Type"></vaadin-select>
                      </div>
                    </div>
                  </template>
                  <dnd-button hidden$="[[!isEditMode]]" on-click="_addDamage" label="Add Damage" icon="add"></dnd-button>
                </div>
              </div>
            </div>
          </template>

          <dnd-button hidden$="[[!isEditMode]]" on-click="_addRoll" label="Add Roll" icon="add"></dnd-button>
        </div>

      </div>
    </div>
    `}}customElements.define("dnd-character-builder-rolls",n)}}]);
//# sourceMappingURL=10.bundle.js.map