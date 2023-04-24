(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{155:function(e,s,l){"use strict";l.r(s);var t=l(3);l(23),l(28),l(43);class i extends t.a{static get properties(){return{nonGlobal:{type:Boolean,reflectToAttribute:!0,value:!1}}}static get template(){return t.b`
      <style include="material-styles my-styles"></style>

      <dnd-selection-list
        enable-hash-routing
        non-global$="[[nonGlobal]]"
        model-id="psionics"
        columns='[
          {"id":"source","label":"Source"}, 
          {"id":"psy-type","label":"Type"},
          {"id":"psy-order","label":"Order","hideMobile":true},
          {"id":"psy-mode-list","label":"Mode List","cssClass":"hidden"}
        ]'
      >
      </dnd-selection-list>
    `}}customElements.define("dnd-psionics-view",i)}}]);
//# sourceMappingURL=17.bundle.js.map