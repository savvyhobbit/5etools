(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{160:function(e,t,s){"use strict";s.r(t);var l=s(3),i=(s(23),s(28),s(123),s(37)),a=s(1),n=s(9);class r extends l.a{static get properties(){return{rules:{type:Array},selectedRule:{type:Object,value:"",observer:"_selectedRuleChange"},contentsOrder:{type:Array,value:()=>[{id:"charactercreation",title:"Character Creation"},{id:"equipment",title:"Equipment"},{id:"playingthegame",title:"Playing the Game"},{id:"runningthegame",title:"Running the Game"},{id:"setting",title:"Setting"},{id:"unearthedarcana",title:"Unearthed Arcana"}]}}}static get observers(){return["_openRuleFromHash(hash, rules)"]}_selectedRuleChange(){if(this.selectedRule&&this.selectedRule.htmlcontent){this.$.rulescontent.innerHTML=this.selectedRule.htmlcontent;let e=this.$.rulescontent.querySelectorAll("table");for(let t of e)Object(a.jqWrap)(t,'<div class="table-scroll-wrap">')}}_openRuleFromHash(){if(this.rules&&this.hash&&this.hash.length>1){let e,t=Object(a.decodeForHash)(this.hash)[0];for(let s of Object.values(this.rules)){for(let l of s)if(l.name===t){e=l;break}if(e)break}e?(this.set("selectedRule",e),window.scrollTo(0,0)):Object(n.a)(!0)}else this.set("selectedRule",void 0)}constructor(){super(),Object(i.b)("rules").then(e=>{const t={},s=e;for(let e of s)t[e.parentlist]?t[e.parentlist].push(e):t[e.parentlist]=[e];this.set("rules",t),Object(a.initCollapseToggles)(this.shadowRoot);let l=Object(n.e)();l&&(this.hash=l)})}connectedCallback(){super.connectedCallback(),this.selectionChangeHandler=e=>{e.detail&&e.detail.selection&&(this.hash=e.detail.selection)},this.deselectionChangeHandler=()=>{this.set("selectedRule",void 0)},Object(n.h)().addEventListener("selection-change",this.selectionChangeHandler),Object(n.h)().addEventListener("selection-deselected",this.deselectionChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),this.deselectionChangeHandler(),Object(n.h)().removeEventListener("selection-change",this.selectionChangeHandler),Object(n.h)().removeEventListener("selection-deselected",this.deselectionChangeHandler)}_getCategoryRules(e,t){return t?t[e]:""}_openRule(e){let t=e.target.closest(".mdc-list-item"),s=t.getAttribute("category"),l=t.getAttribute("rule"),i=Object(a.encodeForHash)(this.rules[s][l].name);Object(n.i)(i)}_exists(e){return!!e}static get template(){return l.b`
      <style include="material-styles my-styles"></style>

      <div class="rules-wrapper" hidden$="[[_exists(selectedRule)]]">
        <template is="dom-repeat" items="[[contentsOrder]]" as="category">
          <div class="collapse collapse--left-arrow open">
            <div class="collapse-toggle">
              <div class="mdc-list-item rule-title mdc-theme--on-surface">
                [[category.title]]
              </div>
            </div>
            <div class="collapse-wrapper">
              <ul class$="collapse-list rules [[category.id]]">
                <template is="dom-repeat" items="[[_getCategoryRules(category.id, rules)]]" as="rule">
                  <div
                    class="mdc-list-item mdc-theme--on-surface"
                    on-click="_openRule"
                    category$="[[category.id]]"
                    rule$="[[index]]"
                  >
                    <span class="name col-xs-12">[[rule.name]]</span>
                  </div>
                </template>
              </ul>
            </div>
          </div>
        </template>
      </div>

      <div id="rulescontent" hidden$="[[!_exists(selectedRule)]]"></div>
    `}}customElements.define("dnd-rules",r);class c extends l.a{static get template(){return l.b`
      <style include="material-styles my-styles"></style>

      <dnd-rules></dnd-rules>
    `}}customElements.define("dnd-rules-view",c)}}]);
//# sourceMappingURL=19.bundle.js.map