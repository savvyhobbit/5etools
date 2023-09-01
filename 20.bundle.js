(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{164:function(e,t,s){"use strict";s.r(t);var i=s(2);s(19),s(20),s(44);class r extends i.a{static get properties(){return{inSidebar:{type:Boolean,reflectToAttribute:!0,value:!1}}}static get template(){return i.b`
      <style include="material-styles my-styles"></style>

      <dnd-selection-list
        enable-hash-routing
        in-sidebar$="[[inSidebar]]"
        model-id="rewards"
        columns='[
          {"id":"source","label":"Source"}, 
          {"id":"reward-type","label":"Type","hideMobile":true}
        ]'
      >
      </dnd-selection-list>
    `}}customElements.define("dnd-rewards-view",r)}}]);
//# sourceMappingURL=20.bundle.js.map