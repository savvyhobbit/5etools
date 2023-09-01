(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{163:function(e,s,i){"use strict";i.r(s);var t=i(2);i(19),i(20),i(44);class l extends t.a{static get properties(){return{inSidebar:{type:Boolean,reflectToAttribute:!0,value:!1}}}static get template(){return t.b`
      <style include="material-styles my-styles"></style>

      <dnd-selection-list
        enable-hash-routing
        in-sidebar$="[[inSidebar]]"
        model-id="psionics"
        columns='[
          {"id":"source","label":"Source"}, 
          {"id":"psy-type","label":"Type"},
          {"id":"psy-order","label":"Order","hideMobile":true},
          {"id":"psy-mode-list","label":"Mode List","cssClass":"hidden"}
        ]'
      >
      </dnd-selection-list>
    `}}customElements.define("dnd-psionics-view",l)}}]);
//# sourceMappingURL=19.bundle.js.map