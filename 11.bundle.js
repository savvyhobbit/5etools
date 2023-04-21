(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{184:function(t,e,n){(function(n){var o,i,r;i=[],void 0===(r="function"==typeof(o=function(){"use strict";function e(t,e,n){var o=new XMLHttpRequest;o.open("GET",t),o.responseType="blob",o.onload=function(){s(o.response,e,n)},o.onerror=function(){console.error("could not download file")},o.send()}function o(t){var e=new XMLHttpRequest;e.open("HEAD",t,!1);try{e.send()}catch(t){}return 200<=e.status&&299>=e.status}function i(t){try{t.dispatchEvent(new MouseEvent("click"))}catch(n){var e=document.createEvent("MouseEvents");e.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),t.dispatchEvent(e)}}var r="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof n&&n.global===n?n:void 0,a=r.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),s=r.saveAs||("object"!=typeof window||window!==r?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(t,n,a){var s=r.URL||r.webkitURL,l=document.createElement("a");n=n||t.name||"download",l.download=n,l.rel="noopener","string"==typeof t?(l.href=t,l.origin===location.origin?i(l):o(l.href)?e(t,n,a):i(l,l.target="_blank")):(l.href=s.createObjectURL(t),setTimeout((function(){s.revokeObjectURL(l.href)}),4e4),setTimeout((function(){i(l)}),0))}:"msSaveOrOpenBlob"in navigator?function(t,n,r){if(n=n||t.name||"download","string"!=typeof t)navigator.msSaveOrOpenBlob(function(t,e){return void 0===e?e={autoBom:!1}:"object"!=typeof e&&(console.warn("Deprecated: Expected third argument to be a object"),e={autoBom:!e}),e.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob(["\ufeff",t],{type:t.type}):t}(t,r),n);else if(o(t))e(t,n,r);else{var a=document.createElement("a");a.href=t,a.target="_blank",setTimeout((function(){i(a)}))}}:function(t,n,o,i){if((i=i||open("","_blank"))&&(i.document.title=i.document.body.innerText="downloading..."),"string"==typeof t)return e(t,n,o);var s="application/octet-stream"===t.type,l=/constructor/i.test(r.HTMLElement)||r.safari,c=/CriOS\/[\d]+/.test(navigator.userAgent);if((c||s&&l||a)&&"undefined"!=typeof FileReader){var d=new FileReader;d.onloadend=function(){var t=d.result;t=c?t:t.replace(/^data:[^;]*;/,"data:attachment/file;"),i?i.location.href=t:location=t,i=null},d.readAsDataURL(t)}else{var u=r.URL||r.webkitURL,h=u.createObjectURL(t);i?i.location=h:location.href=h,i=null,setTimeout((function(){u.revokeObjectURL(h)}),4e4)}});r.saveAs=s.saveAs=s,t.exports=s})?o.apply(e,i):o)||(t.exports=r)}).call(this,n(185))},185:function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},187:function(t,e,n){"use strict";n(29),n(42),n(36),n(19),n(45);var o=n(2);const i=o.b`
  :host {
    /* Sizing */
    --lumo-button-size: var(--lumo-size-m);
    min-width: calc(var(--lumo-button-size) * 2);
    height: var(--lumo-button-size);
    padding: 0 calc(var(--lumo-button-size) / 3 + var(--lumo-border-radius-m) / 2);
    margin: var(--lumo-space-xs) 0;
    box-sizing: border-box;
    /* Style */
    font-family: var(--lumo-font-family);
    font-size: var(--lumo-font-size-m);
    font-weight: 500;
    color: var(--_lumo-button-color, var(--lumo-primary-text-color));
    background-color: var(--_lumo-button-background-color, var(--lumo-contrast-5pct));
    border-radius: var(--lumo-border-radius-m);
    cursor: var(--lumo-clickable-cursor);
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Set only for the internal parts so we don't affect the host vertical alignment */
  [part='label'],
  [part='prefix'],
  [part='suffix'] {
    line-height: var(--lumo-line-height-xs);
  }

  [part='label'] {
    padding: calc(var(--lumo-button-size) / 6) 0;
  }

  :host([theme~='small']) {
    font-size: var(--lumo-font-size-s);
    --lumo-button-size: var(--lumo-size-s);
  }

  :host([theme~='large']) {
    font-size: var(--lumo-font-size-l);
    --lumo-button-size: var(--lumo-size-l);
  }

  /* For interaction states */
  :host::before,
  :host::after {
    content: '';
    /* We rely on the host always being relative */
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: currentColor;
    border-radius: inherit;
    opacity: 0;
    pointer-events: none;
  }

  /* Hover */

  @media (any-hover: hover) {
    :host(:hover)::before {
      opacity: 0.02;
    }
  }

  /* Active */

  :host::after {
    transition: opacity 1.4s, transform 0.1s;
    filter: blur(8px);
  }

  :host([active])::before {
    opacity: 0.05;
    transition-duration: 0s;
  }

  :host([active])::after {
    opacity: 0.1;
    transition-duration: 0s, 0s;
    transform: scale(0);
  }

  /* Keyboard focus */

  :host([focus-ring]) {
    box-shadow: 0 0 0 2px var(--lumo-primary-color-50pct);
  }

  :host([theme~='primary'][focus-ring]) {
    box-shadow: 0 0 0 1px var(--lumo-base-color), 0 0 0 3px var(--lumo-primary-color-50pct);
  }

  /* Types (primary, tertiary, tertiary-inline */

  :host([theme~='tertiary']),
  :host([theme~='tertiary-inline']) {
    background-color: transparent !important;
    min-width: 0;
  }

  :host([theme~='tertiary']) {
    padding: 0 calc(var(--lumo-button-size) / 6);
  }

  :host([theme~='tertiary-inline'])::before {
    display: none;
  }

  :host([theme~='tertiary-inline']) {
    margin: 0;
    height: auto;
    padding: 0;
    line-height: inherit;
    font-size: inherit;
  }

  :host([theme~='tertiary-inline']) [part='label'] {
    padding: 0;
    overflow: visible;
    line-height: inherit;
  }

  :host([theme~='primary']) {
    background-color: var(--_lumo-button-primary-background-color, var(--lumo-primary-color));
    color: var(--_lumo-button-primary-color, var(--lumo-primary-contrast-color));
    font-weight: 600;
    min-width: calc(var(--lumo-button-size) * 2.5);
  }

  :host([theme~='primary'])::before {
    background-color: black;
  }

  @media (any-hover: hover) {
    :host([theme~='primary']:hover)::before {
      opacity: 0.05;
    }
  }

  :host([theme~='primary'][active])::before {
    opacity: 0.1;
  }

  :host([theme~='primary'][active])::after {
    opacity: 0.2;
  }

  /* Colors (success, error, contrast) */

  :host([theme~='success']) {
    color: var(--lumo-success-text-color);
  }

  :host([theme~='success'][theme~='primary']) {
    background-color: var(--lumo-success-color);
    color: var(--lumo-success-contrast-color);
  }

  :host([theme~='error']) {
    color: var(--lumo-error-text-color);
  }

  :host([theme~='error'][theme~='primary']) {
    background-color: var(--lumo-error-color);
    color: var(--lumo-error-contrast-color);
  }

  :host([theme~='contrast']) {
    color: var(--lumo-contrast);
  }

  :host([theme~='contrast'][theme~='primary']) {
    background-color: var(--lumo-contrast);
    color: var(--lumo-base-color);
  }

  /* Disabled state. Keep selectors after other color variants. */

  :host([disabled]) {
    pointer-events: none;
    color: var(--lumo-disabled-text-color);
  }

  :host([theme~='primary'][disabled]) {
    background-color: var(--lumo-contrast-30pct);
    color: var(--lumo-base-color);
  }

  :host([theme~='primary'][disabled]) [part] {
    opacity: 0.7;
  }

  /* Icons */

  [part] ::slotted(vaadin-icon),
  [part] ::slotted(iron-icon) {
    display: inline-block;
    width: var(--lumo-icon-size-m);
    height: var(--lumo-icon-size-m);
  }

  /* Vaadin icons are based on a 16x16 grid (unlike Lumo and Material icons with 24x24), so they look too big by default */
  [part] ::slotted(vaadin-icon[icon^='vaadin:']),
  [part] ::slotted(iron-icon[icon^='vaadin:']) {
    padding: 0.25em;
    box-sizing: border-box !important;
  }

  [part='prefix'] {
    margin-left: -0.25em;
    margin-right: 0.25em;
  }

  [part='suffix'] {
    margin-left: 0.25em;
    margin-right: -0.25em;
  }

  /* Icon-only */

  :host([theme~='icon']:not([theme~='tertiary-inline'])) {
    min-width: var(--lumo-button-size);
    padding-left: calc(var(--lumo-button-size) / 4);
    padding-right: calc(var(--lumo-button-size) / 4);
  }

  :host([theme~='icon']) [part='prefix'],
  :host([theme~='icon']) [part='suffix'] {
    margin-left: 0;
    margin-right: 0;
  }

  /* RTL specific styles */

  :host([dir='rtl']) [part='prefix'] {
    margin-left: 0.25em;
    margin-right: -0.25em;
  }

  :host([dir='rtl']) [part='suffix'] {
    margin-left: -0.25em;
    margin-right: 0.25em;
  }

  :host([dir='rtl'][theme~='icon']) [part='prefix'],
  :host([dir='rtl'][theme~='icon']) [part='suffix'] {
    margin-left: 0;
    margin-right: 0;
  }
`;Object(o.c)("vaadin-button",i,{moduleId:"lumo-button"});const r=o.b`
  :host {
    margin: calc(var(--lumo-space-xs) / 2);
    margin-left: 0;
    border-radius: 0;
  }

  [part='label'] {
    width: 100%;
  }

  /* NOTE(web-padawan): avoid using shorthand padding property for IE11 */
  [part='label'] ::slotted(vaadin-context-menu-item) {
    justify-content: center;
    background-color: transparent;
    height: var(--lumo-button-size);
    margin: 0 calc((var(--lumo-size-m) / 3 + var(--lumo-border-radius-m) / 2) * -1);
    padding-left: calc(var(--lumo-size-m) / 3 + var(--lumo-border-radius-m) / 2);
    padding-right: calc(var(--lumo-size-m) / 3 + var(--lumo-border-radius-m) / 2);
  }

  :host([theme~='small']) [part='label'] ::slotted(vaadin-context-menu-item) {
    min-height: var(--lumo-size-s);
    margin: 0 calc((var(--lumo-size-s) / 3 + var(--lumo-border-radius-m) / 2) * -1);
    padding-left: calc(var(--lumo-size-s) / 3 + var(--lumo-border-radius-m) / 2);
    padding-right: calc(var(--lumo-size-s) / 3 + var(--lumo-border-radius-m) / 2);
  }

  :host([theme~='tertiary']) [part='label'] ::slotted(vaadin-context-menu-item) {
    margin: 0 calc((var(--lumo-button-size) / 6) * -1);
    padding-left: calc(var(--lumo-button-size) / 6);
    padding-right: calc(var(--lumo-button-size) / 6);
  }

  :host([theme~='tertiary-inline']) {
    margin-top: calc(var(--lumo-space-xs) / 2);
    margin-bottom: calc(var(--lumo-space-xs) / 2);
    margin-right: calc(var(--lumo-space-xs) / 2);
  }

  :host([theme~='tertiary-inline']) [part='label'] ::slotted(vaadin-context-menu-item) {
    margin: 0;
    padding: 0;
  }

  :host(:first-of-type) {
    border-radius: var(--lumo-border-radius-m) 0 0 var(--lumo-border-radius-m);

    /* Needed to retain the focus-ring with border-radius */
    margin-left: calc(var(--lumo-space-xs) / 2);
  }

  :host(:nth-last-of-type(2)),
  :host([part='overflow-button']) {
    border-radius: 0 var(--lumo-border-radius-m) var(--lumo-border-radius-m) 0;
  }

  :host([theme~='tertiary']),
  :host([theme~='tertiary-inline']) {
    border-radius: var(--lumo-border-radius-m);
  }

  :host([part='overflow-button']) {
    min-width: var(--lumo-button-size);
    padding-left: calc(var(--lumo-button-size) / 4);
    padding-right: calc(var(--lumo-button-size) / 4);
  }

  :host([part='overflow-button']) ::slotted(*) {
    font-size: var(--lumo-font-size-xl);
  }

  :host([part='overflow-button']) [part='prefix'],
  :host([part='overflow-button']) [part='suffix'] {
    margin-left: 0;
    margin-right: 0;
  }

  /* RTL styles */
  :host([dir='rtl']) {
    margin-left: calc(var(--lumo-space-xs) / 2);
    margin-right: 0;
    border-radius: 0;
  }

  :host([dir='rtl']:first-of-type) {
    border-radius: 0 var(--lumo-border-radius-m) var(--lumo-border-radius-m) 0;
    margin-right: calc(var(--lumo-space-xs) / 2);
  }

  :host([dir='rtl']:nth-last-of-type(2)),
  :host([dir='rtl'][part='overflow-button']) {
    border-radius: var(--lumo-border-radius-m) 0 0 var(--lumo-border-radius-m);
  }
`;Object(o.c)("vaadin-menu-bar-button",[i,r],{moduleId:"lumo-menu-bar-button"});var a=n(3),s=n(23),l=n(32),c=n(33),d=n(111);
/**
 * @license
 * Copyright (c) 2017 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class u extends(Object(d.a)(Object(l.a)(Object(o.a)(Object(s.a)(a.a))))){static get is(){return"vaadin-button"}static get template(){return a.b`
      <style>
        :host {
          display: inline-block;
          position: relative;
          outline: none;
          white-space: nowrap;
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
        }

        :host([hidden]) {
          display: none !important;
        }

        /* Aligns the button with form fields when placed on the same line.
          Note, to make it work, the form fields should have the same "::before" pseudo-element. */
        .vaadin-button-container::before {
          content: '\\2003';
          display: inline-block;
          width: 0;
          max-height: 100%;
        }

        .vaadin-button-container {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          width: 100%;
          height: 100%;
          min-height: inherit;
          text-shadow: inherit;
        }

        [part='prefix'],
        [part='suffix'] {
          flex: none;
        }

        [part='label'] {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      </style>
      <div class="vaadin-button-container">
        <span part="prefix" aria-hidden="true">
          <slot name="prefix"></slot>
        </span>
        <span part="label">
          <slot></slot>
        </span>
        <span part="suffix" aria-hidden="true">
          <slot name="suffix"></slot>
        </span>
      </div>
      <slot name="tooltip"></slot>
    `}ready(){super.ready(),this._tooltipController=new c.a(this),this.addController(this._tooltipController)}}customElements.define(u.is,u),
/**
 * @license
 * Copyright (c) 2019 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
Object(o.c)("vaadin-menu-bar-button",o.b`
    [part='label'] ::slotted(vaadin-context-menu-item) {
      position: relative;
      z-index: 1;
    }
  `,{moduleId:"vaadin-menu-bar-button-styles"});class h extends u{static get is(){return"vaadin-menu-bar-button"}}customElements.define(h.is,h),Object(o.c)("vaadin-context-menu-item",o.b`
    :host([theme='menu-bar-item']) [part='content'] {
      display: flex;
      /* tweak to inherit centering from menu bar button */
      align-items: inherit;
      justify-content: inherit;
    }

    :host([theme='menu-bar-item']) [part='content'] ::slotted(vaadin-icon),
    :host([theme='menu-bar-item']) [part='content'] ::slotted(iron-icon) {
      display: inline-block;
      width: var(--lumo-icon-size-m);
      height: var(--lumo-icon-size-m);
    }

    :host([theme='menu-bar-item']) [part='content'] ::slotted(vaadin-icon[icon^='vaadin:']),
    :host([theme='menu-bar-item']) [part='content'] ::slotted(iron-icon[icon^='vaadin:']) {
      padding: var(--lumo-space-xs);
      box-sizing: border-box !important;
    }
  `,{moduleId:"lumo-menu-bar-item"}),Object(o.c)("vaadin-context-menu-overlay",o.b`
    :host(:first-of-type) {
      padding-top: var(--lumo-space-xs);
    }
  `,{moduleId:"lumo-menu-bar-overlay"}),Object(o.c)("vaadin-menu-bar",o.b`
    :host([has-single-button]) [part$='button'] {
      border-radius: var(--lumo-border-radius-m);
    }

    :host([theme~='end-aligned']) [part$='button']:first-child,
    :host([theme~='end-aligned'][has-single-button]) [part$='button'] {
      margin-inline-start: auto;
    }
  `,{moduleId:"lumo-menu-bar"});n(51);var p=n(76);const f=o.b`
  :host([phone]) {
    top: 0 !important;
    right: 0 !important;
    bottom: var(--vaadin-overlay-viewport-bottom) !important;
    left: 0 !important;
    align-items: stretch;
    justify-content: flex-end;
  }

  /* TODO These style overrides should not be needed.
   We should instead offer a way to have non-selectable items inside the context menu. */

  :host {
    --_lumo-list-box-item-selected-icon-display: none;
    --_lumo-list-box-item-padding-left: calc(var(--lumo-space-m) + var(--lumo-border-radius-m) / 4);
  }

  [part='overlay'] {
    outline: none;
  }
`;Object(o.c)("vaadin-context-menu-overlay",[p.a,f],{moduleId:"lumo-context-menu-overlay"}),Object(o.c)("vaadin-context-menu-list-box",o.b`
    :host(.vaadin-menu-list-box) {
      --_lumo-list-box-item-selected-icon-display: block;
    }

    /* Normal item */
    [part='items'] ::slotted(.vaadin-menu-item) {
      -webkit-tap-highlight-color: var(--lumo-primary-color-10pct);
      cursor: default;
    }

    [part='items'] ::slotted(.vaadin-menu-item) {
      outline: none;
      border-radius: var(--lumo-border-radius-m);
      padding-left: var(--_lumo-list-box-item-padding-left, calc(var(--lumo-border-radius-m) / 4));
      padding-right: calc(var(--lumo-space-l) + var(--lumo-border-radius-m) / 4);
    }

    :host(.vaadin-menu-list-box) [part='items'] ::slotted(.vaadin-menu-item) {
      padding-left: calc(var(--lumo-border-radius-m) / 4);
      padding-right: calc(var(--lumo-space-l) + var(--lumo-border-radius-m) / 4);
    }

    /* Hovered item */
    /* TODO a workaround until we have "focus-follows-mouse". After that, use the hover style for focus-ring as well */
    [part='items'] ::slotted(.vaadin-menu-item:hover:not([disabled])),
    [part='items'] ::slotted(.vaadin-menu-item[expanded]:not([disabled])) {
      background-color: var(--lumo-primary-color-10pct);
    }

    /* RTL styles */
    :host([dir='rtl'])[part='items'] ::slotted(.vaadin-menu-item) {
      padding-left: calc(var(--lumo-space-l) + var(--lumo-border-radius-m) / 4);
      padding-right: var(--_lumo-list-box-item-padding-left, calc(var(--lumo-border-radius-m) / 4));
    }

    :host([dir='rtl'].vaadin-menu-list-box) [part='items'] ::slotted(.vaadin-menu-item) {
      padding-left: calc(var(--lumo-space-l) + var(--lumo-border-radius-m) / 4);
      padding-right: calc(var(--lumo-border-radius-m) / 4);
    }

    /* Focused item */
    @media (pointer: coarse) {
      [part='items'] ::slotted(.vaadin-menu-item:hover:not([expanded]):not([disabled])) {
        background-color: transparent;
      }
    }
  `,{moduleId:"lumo-context-menu-list-box"}),Object(o.c)("vaadin-context-menu-item",o.b`
    /* :hover needed to workaround https://github.com/vaadin/web-components/issues/3133 */
    :host(:hover) {
      user-select: none;
      -ms-user-select: none;
      -webkit-user-select: none;
    }

    :host(.vaadin-menu-item[menu-item-checked]) [part='checkmark']::before {
      opacity: 1;
    }

    :host(.vaadin-menu-item.vaadin-context-menu-parent-item)::after {
      font-family: lumo-icons;
      font-size: var(--lumo-icon-size-xs);
      content: var(--lumo-icons-angle-right);
      color: var(--lumo-tertiary-text-color);
    }

    :host(:not([dir='rtl']).vaadin-menu-item.vaadin-context-menu-parent-item)::after {
      margin-right: calc(var(--lumo-space-m) * -1);
      padding-left: var(--lumo-space-m);
    }

    :host([expanded]) {
      background-color: var(--lumo-primary-color-10pct);
    }

    /* RTL styles */
    :host([dir='rtl'].vaadin-menu-item.vaadin-context-menu-parent-item)::after {
      content: var(--lumo-icons-angle-left);
      margin-left: calc(var(--lumo-space-m) * -1);
      padding-right: var(--lumo-space-m);
    }
  `,{moduleId:"lumo-context-menu-item"});n(132),n(138),n(106);var m=n(18),_=n(52);
/**
 * @license
 * Copyright (c) 2016 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
Object(_.d)({name:"vaadin-contextmenu",deps:["touchstart","touchmove","touchend","contextmenu"],flow:{start:["touchstart","contextmenu"],end:["contextmenu"]},emits:["vaadin-contextmenu"],info:{sourceEvent:null},reset(){this.info.sourceEvent=null,this._cancelTimer(),this.info.touchJob=null,this.info.touchStartCoords=null},_cancelTimer(){this._timerId&&(clearTimeout(this._timerId),delete this._fired)},_setSourceEvent(t){this.info.sourceEvent=t;const e=t.composedPath();this.info.sourceEvent.__composedPath=e},touchstart(t){this._setSourceEvent(t),this.info.touchStartCoords={x:t.changedTouches[0].clientX,y:t.changedTouches[0].clientY};const e=t.composedPath()[0]||t.target;this._timerId=setTimeout(()=>{const n=t.changedTouches[0];t.shiftKey||(m.d&&(this._fired=!0,this.fire(e,n.clientX,n.clientY)),Object(_.c)("tap"))},500)},touchmove(t){const e=this.info.touchStartCoords;(Math.abs(e.x-t.changedTouches[0].clientX)>15||Math.abs(e.y-t.changedTouches[0].clientY)>15)&&this._cancelTimer()},touchend(t){this._fired&&t.preventDefault(),this._cancelTimer()},contextmenu(t){t.shiftKey||(this._setSourceEvent(t),this.fire(t.target,t.clientX,t.clientY),Object(_.c)("tap"))},fire(t,e,n){const o=this.info.sourceEvent,i=new Event("vaadin-contextmenu",{bubbles:!0,cancelable:!0,composed:!0});i.detail={x:e,y:n,sourceEvent:o},t.dispatchEvent(i),i.defaultPrevented&&o&&o.preventDefault&&o.preventDefault()}});var v=n(69),g=n(77);
/**
 * @license
 * Copyright (c) 2016 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
Object(o.c)("vaadin-context-menu-overlay",o.b`
    :host {
      align-items: flex-start;
      justify-content: flex-start;
    }

    :host([right-aligned]),
    :host([end-aligned]) {
      align-items: flex-end;
    }

    :host([bottom-aligned]) {
      justify-content: flex-end;
    }

    [part='overlay'] {
      background-color: #fff;
    }
  `,{moduleId:"vaadin-context-menu-overlay-styles"});class b extends(Object(g.a)(v.a)){static get is(){return"vaadin-context-menu-overlay"}static get properties(){return{parentOverlay:{type:Object,readOnly:!0}}}static get observers(){return["_themeChanged(_theme)"]}ready(){super.ready(),this.addEventListener("keydown",t=>{if(!t.defaultPrevented&&t.composedPath()[0]===this.$.overlay&&[38,40].indexOf(t.keyCode)>-1){const e=this.getFirstChild();e&&Array.isArray(e.items)&&e.items.length&&(t.preventDefault(),38===t.keyCode?e.items[e.items.length-1].focus():e.focus())}})}getFirstChild(){return this.content.querySelector(":not(style):not(slot)")}_themeChanged(){this.close()}getBoundaries(){const t=this.getBoundingClientRect(),e=this.$.overlay.getBoundingClientRect();let n=t.bottom-e.height;const o=this.parentOverlay;if(o&&o.hasAttribute("bottom-aligned")){const t=getComputedStyle(o);n=n-parseFloat(t.bottom)-parseFloat(t.height)}return{xMax:t.right-e.width,xMin:t.left+e.width,yMax:n}}_updatePosition(){if(super._updatePosition(),this.positionTarget&&this.parentOverlay){const t=this.$.content,e=getComputedStyle(t);!!this.style.left?this.style.left=parseFloat(this.style.left)+parseFloat(e.paddingLeft)+"px":this.style.right=parseFloat(this.style.right)+parseFloat(e.paddingRight)+"px";!!this.style.bottom?this.style.bottom=parseFloat(this.style.bottom)-parseFloat(e.paddingBottom)+"px":this.style.top=parseFloat(this.style.top)-parseFloat(e.paddingTop)+"px"}}}customElements.define(b.is,b);var y=n(112),C=n(46),E=n(107),A=n(96),O=n(95);
/**
 * @license
 * Copyright (c) 2016 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class T extends A.a{static get is(){return"vaadin-context-menu-item"}}customElements.define(T.is,T);class w extends O.a{static get is(){return"vaadin-context-menu-list-box"}}customElements.define(w.is,w);const S=t=>class extends t{static get properties(){return{items:Array}}ready(){super.ready(),this.__itemsOutsideClickListener=t=>{t.composedPath().some(t=>"vaadin-context-menu-overlay"===t.localName)||this.dispatchEvent(new CustomEvent("items-outside-click"))},this.addEventListener("items-outside-click",()=>this.items&&this.close())}connectedCallback(){super.connectedCallback(),document.documentElement.addEventListener("click",this.__itemsOutsideClickListener)}disconnectedCallback(){super.disconnectedCallback(),document.documentElement.removeEventListener("click",this.__itemsOutsideClickListener)}get __isRTL(){return"rtl"===this.getAttribute("dir")}__forwardFocus(){const t=this.$.overlay,e=t.getFirstChild();if(t.parentOverlay){const n=t.parentOverlay.querySelector("[expanded]");n&&n.hasAttribute("focused")&&e?e.focus():t.$.overlay.focus()}else e&&e.focus()}__openSubMenu(t,e){t.items=e._item.children,t.listenOn=e;const n=this.$.overlay,o=t.$.overlay;o.positionTarget=e,o.noHorizontalOverlap=!0,o._setParentOverlay(n),n.hasAttribute("theme")?t.setAttribute("theme",n.getAttribute("theme")):t.removeAttribute("theme");t.$.overlay.$.content.style.minWidth="",e.dispatchEvent(new CustomEvent("opensubmenu",{detail:{children:e._item.children}}))}__itemsRenderer(t,e,n){this.__initMenu(t,e);t.querySelector(this.constructor.is).closeOn=e.closeOn;const o=t.querySelector("vaadin-context-menu-list-box");o.innerHTML="";Array.from(n.detail.children||e.items).forEach(t=>{let e;e=t.component instanceof HTMLElement?t.component:document.createElement(t.component||"vaadin-context-menu-item"),e instanceof A.a?(e.setAttribute("role","menuitem"),e.classList.add("vaadin-menu-item")):"hr"===e.localName&&e.setAttribute("role","separator"),this._setMenuItemTheme(e,t,this._theme),e._item=t,t.text&&(e.textContent=t.text),this.__toggleMenuComponentAttribute(e,"menu-item-checked",t.checked),this.__toggleMenuComponentAttribute(e,"disabled",t.disabled),e.setAttribute("aria-haspopup","false"),e.classList.remove("vaadin-context-menu-parent-item"),t.children&&t.children.length&&(e.classList.add("vaadin-context-menu-parent-item"),e.setAttribute("aria-haspopup","true"),e.setAttribute("aria-expanded","false"),e.removeAttribute("expanded")),o.appendChild(e)})}_setMenuItemTheme(t,e,n){let o=t.getAttribute("theme")||n;null!=e.theme&&(o=Array.isArray(e.theme)?e.theme.join(" "):e.theme),o?t.setAttribute("theme",o):t.removeAttribute("theme")}__toggleMenuComponentAttribute(t,e,n){n?(t.setAttribute(e,""),t["__has-"+e]=!0):t["__has-"+e]&&(t.removeAttribute(e),t["__has-"+e]=!1)}__initMenu(t,e){if(t.firstElementChild){const e=t.querySelector("vaadin-context-menu-list-box");this._theme?e.setAttribute("theme",this._theme):e.removeAttribute("theme")}else{const n=document.createElement("vaadin-context-menu-list-box");t.appendChild(n),this._theme&&n.setAttribute("theme",this._theme),n.classList.add("vaadin-menu-list-box"),requestAnimationFrame(()=>n.setAttribute("role","menu"));const o=document.createElement(this.constructor.is);o.setAttribute("hidden",""),t.appendChild(o),o.$.overlay.modeless=!0,o.openOn="opensubmenu",e.addEventListener("opened-changed",t=>!t.detail.value&&o.close()),o.addEventListener("opened-changed",t=>{if(!t.detail.value){const t=n.querySelector("[expanded]");t&&(t.setAttribute("aria-expanded","false"),t.removeAttribute("expanded"))}}),n.addEventListener("selected-changed",t=>{if("number"==typeof t.detail.value){const o=t.target.items[t.detail.value]._item;if(!o.children){const t={value:o};e.dispatchEvent(new CustomEvent("item-selected",{detail:t}))}n.selected=null}}),o.addEventListener("item-selected",t=>{e.dispatchEvent(new CustomEvent("item-selected",{detail:t.detail}))}),o.addEventListener("close-all-menus",()=>{e.dispatchEvent(new CustomEvent("close-all-menus"))}),e.addEventListener("close-all-menus",e.close),e.addEventListener("item-selected",e.close),e.$.overlay.$.backdrop.addEventListener("click",()=>e.close()),e.$.overlay.addEventListener("keydown",t=>{const n=this.__isRTL;!n&&37===t.keyCode||n&&39===t.keyCode?(e.close(),e.listenOn.focus()):"Escape"!==t.key&&"Tab"!==t.key||e.dispatchEvent(new CustomEvent("close-all-menus"))}),requestAnimationFrame(()=>{this.__openListenerActive=!0});const i=(t,n=t.composedPath().find(t=>"vaadin-context-menu-item"===t.localName))=>{if(this.__openListenerActive)if(e.$.overlay.hasAttribute("opening"))requestAnimationFrame(()=>i(t,n));else if(n){if(o.items!==n._item.children&&o.close(),!e.opened)return;n._item.children&&n._item.children.length?(n.setAttribute("aria-expanded","true"),n.setAttribute("expanded",""),this.__openSubMenu(o,n)):o.listenOn.focus()}};e.$.overlay.addEventListener(m.f?"click":"mouseover",i),e.$.overlay.addEventListener("keydown",t=>{const e=this.__isRTL;(!e&&39===t.keyCode||e&&37===t.keyCode||13===t.keyCode||32===t.keyCode)&&i(t)})}}}
/**
 * @license
 * Copyright (c) 2016 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */;class x extends(Object(s.a)(Object(l.a)(Object(E.a)(S(a.a))))){static get template(){return a.b`
      <style>
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none !important;
        }
      </style>

      <slot id="slot"></slot>

      <vaadin-context-menu-overlay
        id="overlay"
        on-opened-changed="_onOverlayOpened"
        on-vaadin-overlay-open="_onVaadinOverlayOpen"
        with-backdrop="[[_phone]]"
        phone$="[[_phone]]"
        model="[[_context]]"
        theme$="[[_theme]]"
      >
      </vaadin-context-menu-overlay>
    `}static get is(){return"vaadin-context-menu"}static get properties(){return{selector:{type:String},opened:{type:Boolean,value:!1,notify:!0,readOnly:!0},openOn:{type:String,value:"vaadin-contextmenu"},listenOn:{type:Object,value(){return this}},closeOn:{type:String,value:"click",observer:"_closeOnChanged"},renderer:{type:Function},_context:Object,_boundClose:Object,_boundOpen:Object,_phone:{type:Boolean},_touch:{type:Boolean,value:m.f},_wide:{type:Boolean},_wideMediaQuery:{type:String,value:"(min-device-width: 750px)"}}}static get observers(){return["_openedChanged(opened)","_targetOrOpenOnChanged(listenOn, openOn)","_rendererChanged(renderer, items)","_touchOrWideChanged(_touch, _wide)"]}constructor(){super(),this._boundOpen=this.open.bind(this),this._boundClose=this.close.bind(this),this._boundOnGlobalContextMenu=this._onGlobalContextMenu.bind(this)}connectedCallback(){super.connectedCallback(),this.__boundOnScroll=this.__onScroll.bind(this),window.addEventListener("scroll",this.__boundOnScroll,!0)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("scroll",this.__boundOnScroll,!0),this.close()}ready(){super.ready(),this._overlayElement=this.$.overlay,this.addController(new y.a(this._wideMediaQuery,t=>{this._wide=t})),Object(C.a)(this)}_onOverlayOpened(t){this._setOpened(t.detail.value),this.__alignOverlayPosition()}_onVaadinOverlayOpen(){this.__alignOverlayPosition(),this.$.overlay.style.opacity="",this.__forwardFocus()}_targetOrOpenOnChanged(t,e){this._oldListenOn&&this._oldOpenOn&&(this._unlisten(this._oldListenOn,this._oldOpenOn,this._boundOpen),this._oldListenOn.style.webkitTouchCallout="",this._oldListenOn.style.webkitUserSelect="",this._oldListenOn.style.userSelect="",this._oldListenOn=null,this._oldOpenOn=null),t&&e&&(this._listen(t,e,this._boundOpen),this._oldListenOn=t,this._oldOpenOn=e)}_touchOrWideChanged(t,e){this._phone=!e&&t}_setListenOnUserSelect(t){this.listenOn.style.webkitTouchCallout=t,this.listenOn.style.webkitUserSelect=t,this.listenOn.style.userSelect=t,document.getSelection().removeAllRanges()}_closeOnChanged(t,e){e&&(this._unlisten(this.$.overlay,e,this._boundClose),this._unlisten(this.$.overlay.root,e,this._boundClose)),t?(this._listen(this.$.overlay,t,this._boundClose),this._listen(this.$.overlay.root,t,this._boundClose),this._unlisten(this.$.overlay,"vaadin-overlay-outside-click",this._preventDefault)):this._listen(this.$.overlay,"vaadin-overlay-outside-click",this._preventDefault)}_preventDefault(t){t.preventDefault()}_openedChanged(t){t?(document.documentElement.addEventListener("contextmenu",this._boundOnGlobalContextMenu,!0),this._setListenOnUserSelect("none")):(document.documentElement.removeEventListener("contextmenu",this._boundOnGlobalContextMenu,!0),this._setListenOnUserSelect("")),this.$.overlay.opened=t}requestContentUpdate(){this._overlayElement&&this.renderer&&this._overlayElement.requestContentUpdate()}_rendererChanged(t,e){if(e){if(t)throw new Error("The items API cannot be used together with a renderer");"click"===this.closeOn&&(this.closeOn=""),t=this.__itemsRenderer}this.$.overlay.setProperties({owner:this,renderer:t})}close(){this._setOpened(!1)}_contextTarget(t){if(this.selector){const e=this.listenOn.querySelectorAll(this.selector);return Array.prototype.filter.call(e,e=>t.composedPath().indexOf(e)>-1)[0]}return t.target}open(t){t&&!this.opened&&(this._context={detail:t.detail,target:this._contextTarget(t)},this._context.target&&(this._preventDefault(t),t.stopPropagation(),this.__x=this._getEventCoordinate(t,"x"),this.__pageXOffset=window.pageXOffset,this.__y=this._getEventCoordinate(t,"y"),this.__pageYOffset=window.pageYOffset,this.$.overlay.style.opacity="0",this._setOpened(!0)))}__onScroll(){if(!this.opened)return;const t=window.pageYOffset-this.__pageYOffset,e=window.pageXOffset-this.__pageXOffset;this.__adjustPosition("left",-e),this.__adjustPosition("right",e),this.__adjustPosition("top",-t),this.__adjustPosition("bottom",t),this.__pageYOffset+=t,this.__pageXOffset+=e}__adjustPosition(t,e){const n=this.$.overlay.style;n[t]=(parseInt(n[t])||0)+e+"px"}__alignOverlayPosition(){const t=this.$.overlay;if(t.positionTarget)return;const e=t.style;["top","right","bottom","left"].forEach(t=>e.removeProperty(t)),["right-aligned","end-aligned","bottom-aligned"].forEach(e=>t.removeAttribute(e));const{xMax:n,xMin:o,yMax:i}=t.getBoundaries(),r=this.__x,a=this.__y,s=document.documentElement.clientWidth,l=document.documentElement.clientHeight;this.__isRTL?r>s/2||r>o?e.right=Math.max(0,s-r)+"px":(e.left=r+"px",this._setEndAligned(t)):r<s/2||r<n?e.left=r+"px":(e.right=Math.max(0,s-r)+"px",this._setEndAligned(t)),a<l/2||a<i?e.top=a+"px":(e.bottom=Math.max(0,l-a)+"px",t.setAttribute("bottom-aligned",""))}_setEndAligned(t){t.setAttribute("end-aligned",""),this.__isRTL||t.setAttribute("right-aligned","")}_getEventCoordinate(t,e){if(!(t.detail instanceof Object)){const n="client"+e.toUpperCase(),o=t.changedTouches?t.changedTouches[0][n]:t[n];if(0===o){const n=t.target.getBoundingClientRect();return"x"===e?n.left:n.top+n.height}return o}return t.detail[e]?t.detail[e]:t.detail.sourceEvent?this._getEventCoordinate(t.detail.sourceEvent,e):void 0}_listen(t,e,n){_.b[e]?Object(_.a)(t,e,n):t.addEventListener(e,n)}_unlisten(t,e,n){_.b[e]?Object(_.e)(t,e,n):t.removeEventListener(e,n)}_onGlobalContextMenu(t){t.shiftKey||(t.preventDefault(),this.close())}}customElements.define(x.is,x);
/**
 * @license
 * Copyright (c) 2019 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class L extends x{static get is(){return"vaadin-menu-bar-submenu"}constructor(){super(),this.openOn="opensubmenu"}_openedChanged(t){this.$.overlay.opened=t}close(){super.close(),this.hasAttribute("is-root")&&this.getRootNode().host._close()}}customElements.define(L.is,L);var R=n(48),I=n(109);
/**
 * @license
 * Copyright (c) 2019 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const D=t=>class extends(Object(I.a)(t)){static get properties(){return{_hasOverflow:{type:Boolean,value:!1}}}static get observers(){return["_menuItemsChanged(items, items.splices)"]}get _observeParent(){return!0}ready(){super.ready(),this.setAttribute("role","menubar")}connectedCallback(){super.connectedCallback(),this._initButtonAttrs(this._overflow)}get _buttons(){return Array.from(this.shadowRoot.querySelectorAll('[part$="button"]'))}get _container(){return this.shadowRoot.querySelector('[part="container"]')}get _overflow(){return this.shadowRoot.querySelector('[part="overflow-button"]')}_menuItemsChanged(t){t!==this._oldItems&&(this._oldItems=t,this.__renderButtons(t))}__getOverflowCount(t){return t.item&&t.item.children&&t.item.children.length||0}__restoreButtons(t){for(let e=0;e<t.length;e++){const n=t[e];n.disabled=n.item&&n.item.disabled||this.disabled,n.style.visibility="",n.style.position="";const o=n.item&&n.item.component;o instanceof HTMLElement&&o.classList.contains("vaadin-menu-item")&&this.__restoreItem(n,o)}this.__updateOverflow([])}__restoreItem(t,e){t.appendChild(e),e.removeAttribute("aria-expanded"),e.removeAttribute("aria-haspopup"),e.removeAttribute("tabindex"),e.removeAttribute("class")}__updateOverflow(t){this._overflow.item={children:t},this._hasOverflow=t.length>0}__setOverflowItems(t,e){const n=this._container;if(n.offsetWidth<n.scrollWidth){this._hasOverflow=!0;const o="rtl"===this.getAttribute("dir");let i;for(i=t.length;i>0;i--){const r=t[i-1],a=getComputedStyle(r);if(!o&&r.offsetLeft+r.offsetWidth<n.offsetWidth-e.offsetWidth||o&&r.offsetLeft>=e.offsetWidth)break;r.disabled=!0,r.style.visibility="hidden",r.style.position="absolute",r.style.width=a.width}const r=t.filter((t,e)=>e>=i).map(t=>t.item);this.__updateOverflow(r)}}__detectOverflow(){const t=this._overflow,e=this._buttons.filter(e=>e!==t),n=this.__getOverflowCount(t);this.__restoreButtons(e),this.__setOverflowItems(e,t);const o=this.__getOverflowCount(t);n!==o&&this._subMenu.opened&&this._subMenu.close();const i=o===e.length||0===o&&1===e.length;this.toggleAttribute("has-single-button",i)}_removeButtons(){const t=this._container;for(;t.children.length>1;)t.removeChild(t.firstElementChild)}_initButton(t){const e=document.createElement("vaadin-menu-bar-button");e.setAttribute("part","menu-bar-button");const n={...t};if(e.item=n,t.component){const t=this.__getComponent(n);n.component=t,t.item=n,e.appendChild(t)}else t.text&&(e.textContent=t.text);return e}_initButtonAttrs(t){t.setAttribute("role","menuitem"),(t===this._overflow||t.item&&t.item.children)&&(t.setAttribute("aria-haspopup","true"),t.setAttribute("aria-expanded","false"))}_setButtonDisabled(t,e){t.disabled=e,t.setAttribute("tabindex",e?"-1":"0")}_setButtonTheme(t,e){let n=e;const o=t.item&&t.item.theme;null!=o&&(n=Array.isArray(o)?o.join(" "):o),n?t.setAttribute("theme",n):t.removeAttribute("theme")}_appendButton(t){this._container.insertBefore(t,this._overflow)}__getComponent(t){const e=t.component;let n;const o=e instanceof HTMLElement;if(o&&"vaadin-context-menu-item"===e.localName?n=e:(n=document.createElement("vaadin-context-menu-item"),n.appendChild(o?e:document.createElement(e))),t.text){(n.firstChild||n).textContent=t.text}return n.setAttribute("theme","menu-bar-item"),n}__renderButtons(t=[]){this._removeButtons(),0!==t.length&&(t.forEach(t=>{const e=this._initButton(t);this._appendButton(e),this._setButtonDisabled(e,t.disabled),this._initButtonAttrs(e),this._setButtonTheme(e,this._theme)}),this.__detectOverflow())}_onResize(){this.__detectOverflow()}};var z=n(59),k=n(20),P=n(110);
/**
 * @license
 * Copyright (c) 2019 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const M=t=>class extends(Object(P.a)(Object(z.a)(t))){static get properties(){return{openOnHover:{type:Boolean}}}constructor(){super(),this.__boundOnContextMenuKeydown=this.__onContextMenuKeydown.bind(this)}static get observers(){return["_itemsChanged(items, items.splices)"]}ready(){super.ready(),this.addEventListener("mousedown",()=>this._hideTooltip()),this.addEventListener("mouseleave",()=>this._hideTooltip()),this._subMenu.addEventListener("item-selected",this.__onItemSelected.bind(this)),this._subMenu.addEventListener("close-all-menus",this.__onEscapeClose.bind(this));this._subMenu.$.overlay.addEventListener("keydown",this.__boundOnContextMenuKeydown);const t=this._container;t.addEventListener("click",this.__onButtonClick.bind(this)),t.addEventListener("mouseover",t=>this._onMouseOver(t))}get focused(){return this.shadowRoot.activeElement||this._expandedButton}get _vertical(){return!1}_getItems(){return this._buttons}get __isRTL(){return"rtl"===this.getAttribute("dir")}disconnectedCallback(){super.disconnectedCallback(),this._hideTooltip(!0)}_showTooltip(t,e){const n=this._tooltipController.node;n&&n.isConnected&&(void 0===n.generator&&(n.generator=({item:t})=>t&&t.tooltip),this._subMenu.opened||(this._tooltipController.setTarget(t),this._tooltipController.setContext({item:t.item}),n._stateController.open({hover:e,focus:!e})))}_hideTooltip(t){const e=this._tooltipController.node;e&&e._stateController.close(t)}_setExpanded(t,e){t.toggleAttribute("expanded",e),t.toggleAttribute("active",e),t.setAttribute("aria-expanded",e?"true":"false")}_setTabindex(t,e){t.setAttribute("tabindex",e?"0":"-1")}_focusItem(t,e){const n=e&&this.focused===this._expandedButton;n&&this._close(),super._focusItem(t,e),this._buttons.forEach(e=>{this._setTabindex(e,e===t)}),n&&t.item&&t.item.children?this.__openSubMenu(t,!0,{keepFocus:!0}):t===this._overflow?this._hideTooltip():this._showTooltip(t)}_getButtonFromEvent(t){return Array.from(t.composedPath()).find(t=>"vaadin-menu-bar-button"===t.localName)}_setFocused(t){if(t){const t=this.shadowRoot.querySelector('[part$="button"][tabindex="0"]');t&&this._buttons.forEach(e=>{this._setTabindex(e,e===t),e===t&&e!==this._overflow&&Object(k.d)()&&this._showTooltip(e)})}else this._hideTooltip()}_onArrowDown(t){t.preventDefault();const e=this._getButtonFromEvent(t);e===this._expandedButton?this._focusFirstItem():this.__openSubMenu(e,!0)}_onArrowUp(t){t.preventDefault();const e=this._getButtonFromEvent(t);e===this._expandedButton?this._focusLastItem():this.__openSubMenu(e,!0,{focusLast:!0})}_onEscape(t){t.composedPath().includes(this._expandedButton)&&this._close(!0),this._hideTooltip(!0)}_onKeyDown(t){switch(t.key){case"ArrowDown":this._onArrowDown(t);break;case"ArrowUp":this._onArrowUp(t);break;default:super._onKeyDown(t)}}get _subMenu(){return this.shadowRoot.querySelector("vaadin-menu-bar-submenu")}_itemsChanged(){const t=this._subMenu;t&&t.opened&&t.close()}_onMouseOver(t){const e=this._getButtonFromEvent(t);if(e){if(e!==this._expandedButton){const t=this._subMenu.opened;e.item.children&&(this.openOnHover||t)?this.__openSubMenu(e,!1):t&&this._close(),e===this._overflow||this.openOnHover&&e.item.children?this._hideTooltip():this._showTooltip(e,!0)}}else this._hideTooltip()}__onContextMenuKeydown(t){const e=Array.from(t.composedPath()).find(t=>t._item);if(e){const n=e.parentNode;38===t.keyCode&&e===n.items[0]&&this._close(!0),(37===t.keyCode||39===t.keyCode&&!e._item.children)&&(t.stopImmediatePropagation(),this._onKeyDown(t))}}__fireItemSelected(t){this.dispatchEvent(new CustomEvent("item-selected",{detail:{value:t}}))}__onButtonClick(t){t.stopPropagation();const e=this._getButtonFromEvent(t);e&&this.__openSubMenu(e,!1)}__openSubMenu(t,e,n={}){const o=this._subMenu,i=t.item;if(o.opened&&(this._close(),o.listenOn===t))return;const r=i&&i.children;if(!r||0===r.length)return void this.__fireItemSelected(i);o.items=r,o.listenOn=t;const a=o.$.overlay;a.positionTarget=t,a.noVerticalOverlap=!0,this._expandedButton=t,requestAnimationFrame(()=>{t.dispatchEvent(new CustomEvent("opensubmenu",{detail:{children:r}})),this._hideTooltip(!0),this._setExpanded(t,!0)}),this.style.pointerEvents="auto",a.addEventListener("vaadin-overlay-open",()=>{n.focusLast&&this._focusLastItem(),n.keepFocus&&this._focusItem(this._expandedButton,!1),e||a.$.overlay.focus(),a._updatePosition()},{once:!0})}_focusFirstItem(){this._subMenu.$.overlay.firstElementChild.focus()}_focusLastItem(){const t=this._subMenu.$.overlay.firstElementChild,e=t.items[t.items.length-1];e&&e.focus()}__onItemSelected(t){t.stopPropagation(),this._close(),this.__fireItemSelected(t.detail.value)}__onEscapeClose(){this.__deactivateButton(!0)}__deactivateButton(t){const e=this._expandedButton;e&&e.hasAttribute("expanded")&&(this._setExpanded(e,!1),t&&this._focusItem(e,!1),this._expandedButton=null)}_close(t){this.style.pointerEvents="",this.__deactivateButton(t),this._subMenu.opened&&this._subMenu.close()}}
/**
 * @license
 * Copyright (c) 2019 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */;class j extends(D(Object(R.a)(M(Object(l.a)(Object(o.a)(Object(s.a)(a.a))))))){static get template(){return a.b`
      <style>
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none !important;
        }

        [part='container'] {
          position: relative;
          display: flex;
          width: 100%;
          flex-wrap: nowrap;
          overflow: hidden;
        }

        [part$='button'] {
          flex-shrink: 0;
        }

        [part='overflow-button'] {
          margin-right: 0;
        }

        .dots::before {
          display: block;
          content: '\\00B7\\00B7\\00B7';
          font-size: inherit;
          line-height: inherit;
        }
      </style>

      <div part="container">
        <vaadin-menu-bar-button part="overflow-button" hidden$="[[!_hasOverflow]]" aria-label$="[[i18n.moreOptions]]">
          <div class="dots"></div>
        </vaadin-menu-bar-button>
      </div>
      <vaadin-menu-bar-submenu is-root=""></vaadin-menu-bar-submenu>

      <slot name="tooltip"></slot>
    `}static get is(){return"vaadin-menu-bar"}static get properties(){return{items:{type:Array,value:()=>[]},i18n:{type:Object,value:()=>({moreOptions:"More options"})}}}static get observers(){return["_themeChanged(_theme)"]}ready(){super.ready(),this._tooltipController=new c.a(this),this._tooltipController.setManual(!0),this.addController(this._tooltipController)}_disabledChanged(t,e){super._disabledChanged(t,e),e!==t&&this.__updateButtonsDisabled(t)}_themeChanged(t){this.shadowRoot&&(this._buttons.forEach(e=>this._setButtonTheme(e,t)),this.__detectOverflow()),t?this._subMenu.setAttribute("theme",t):this._subMenu.removeAttribute("theme")}__updateButtonsDisabled(t){this._buttons.forEach(e=>{e.disabled=t||e.item&&e.item.disabled})}}customElements.define(j.is,j);console.warn('WARNING: Since Vaadin 23.2, "@vaadin/vaadin-menu-bar" is deprecated. Use "@vaadin/menu-bar" instead.')},188:function(t,e,n){"use strict";n(106),n(36);var o=n(60),i=n(2);const r=i.b`
  /* Optical centering */
  :host::before,
  :host::after {
    content: '';
    flex-basis: 0;
    flex-grow: 1;
  }

  :host::after {
    flex-grow: 1.1;
  }

  [part='overlay'] {
    border-radius: var(--lumo-border-radius-l);
    box-shadow: 0 0 0 1px var(--lumo-shade-5pct), var(--lumo-box-shadow-xl);
    background-image: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

  [part='content'] {
    padding: var(--lumo-space-l);
  }

  :host(:is([has-header], [has-title])) [part='header'] + [part='content'] {
    padding-top: 0;
  }

  [part='header'],
  [part='header-content'],
  [part='footer'] {
    gap: var(--lumo-space-xs) var(--lumo-space-s);
    line-height: var(--lumo-line-height-s);
  }

  [part='header'] {
    padding: var(--lumo-space-m);
    background-color: var(--lumo-base-color);
    border-radius: var(--lumo-border-radius-l) var(--lumo-border-radius-l) 0 0; /* Needed for Safari */
  }

  [part='footer'] {
    padding: var(--lumo-space-s) var(--lumo-space-m);
    background-color: var(--lumo-contrast-5pct);
    border-radius: 0 0 var(--lumo-border-radius-l) var(--lumo-border-radius-l); /* Needed for Safari */
  }

  [part='title'] {
    font-size: var(--lumo-font-size-xl);
    font-weight: 600;
    color: var(--lumo-header-text-color);
    margin-inline-start: calc(var(--lumo-space-l) - var(--lumo-space-m));
  }

  /* No padding */
  :host([theme~='no-padding']) [part='content'] {
    padding: 0;
  }

  @media (min-height: 320px) {
    :host([overflow~='top']) [part='header'] {
      box-shadow: 0 1px 0 0 var(--lumo-contrast-10pct);
    }
  }

  /* Animations */

  :host([opening]),
  :host([closing]) {
    animation: 0.25s lumo-overlay-dummy-animation;
  }

  :host([opening]) [part='overlay'] {
    animation: 0.12s 0.05s vaadin-dialog-enter cubic-bezier(0.215, 0.61, 0.355, 1) both;
  }

  @keyframes vaadin-dialog-enter {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
  }

  :host([closing]) [part='overlay'] {
    animation: 0.1s 0.03s vaadin-dialog-exit cubic-bezier(0.55, 0.055, 0.675, 0.19) both;
  }

  :host([closing]) [part='backdrop'] {
    animation-delay: 0.05s;
  }

  @keyframes vaadin-dialog-exit {
    100% {
      opacity: 0;
      transform: scale(1.02);
    }
  }
`;Object(i.c)("vaadin-dialog-overlay",[o.a,r],{moduleId:"lumo-dialog"});var a=n(3),s=n(32),l=n(46),c=n(69),d=n(107),u=n(18);
/**
 * @license
 * Copyright (c) 2017 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
function h(t){return t.touches?t.touches[0]:t}function p(t){return t.clientX>=0&&t.clientX<=window.innerWidth&&t.clientY>=0&&t.clientY<=window.innerHeight}
/**
 * @license
 * Copyright (c) 2017 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const f=t=>class extends t{static get properties(){return{draggable:{type:Boolean,value:!1,reflectToAttribute:!0},_touchDevice:{type:Boolean,value:u.f},__dragHandleClassName:{type:String}}}ready(){super.ready(),this._originalBounds={},this._originalMouseCoords={},this._startDrag=this._startDrag.bind(this),this._drag=this._drag.bind(this),this._stopDrag=this._stopDrag.bind(this),this.$.overlay.$.overlay.addEventListener("mousedown",this._startDrag),this.$.overlay.$.overlay.addEventListener("touchstart",this._startDrag)}_startDrag(t){if(!("touchstart"===t.type&&t.touches.length>1)&&this.draggable&&(0===t.button||t.touches)){const e=this.$.overlay.$.resizerContainer,n=t.target===e,o=t.offsetX>e.clientWidth||t.offsetY>e.clientHeight,i=t.target===this.$.overlay.$.content,r=t.composedPath().some((t,e)=>{if(!t.classList)return!1;const n=t.classList.contains(this.__dragHandleClassName||"draggable"),o=t.classList.contains("draggable-leaf-only"),i=0===e;return o&&i||n&&(!o||i)});if(n&&!o||i||r){r||t.preventDefault(),this._originalBounds=this.$.overlay.getBounds();const e=h(t);this._originalMouseCoords={top:e.pageY,left:e.pageX},window.addEventListener("mouseup",this._stopDrag),window.addEventListener("touchend",this._stopDrag),window.addEventListener("mousemove",this._drag),window.addEventListener("touchmove",this._drag),"absolute"!==this.$.overlay.$.overlay.style.position&&this.$.overlay.setBounds(this._originalBounds)}}}_drag(t){const e=h(t);if(p(e)){const t=this._originalBounds.top+(e.pageY-this._originalMouseCoords.top),n=this._originalBounds.left+(e.pageX-this._originalMouseCoords.left);this.$.overlay.setBounds({top:t,left:n})}}_stopDrag(){window.removeEventListener("mouseup",this._stopDrag),window.removeEventListener("touchend",this._stopDrag),window.removeEventListener("mousemove",this._drag),window.removeEventListener("touchmove",this._drag)}}
/**
 * @license
 * Copyright (c) 2017 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */;Object(i.c)("vaadin-dialog-overlay",i.b`
    [part='overlay'] {
      position: relative;
      overflow: visible;
      max-height: 100%;
      display: flex;
    }

    [part='content'] {
      box-sizing: border-box;
      height: 100%;
    }

    .resizer-container {
      overflow: auto;
      flex-grow: 1;
      border-radius: inherit; /* prevent child elements being drawn outside part=overlay */
    }

    [part='overlay'][style] .resizer-container {
      min-height: 100%;
      width: 100%;
    }

    :host(:not([resizable])) .resizer {
      display: none;
    }

    :host([resizable]) [part='title'] {
      cursor: move;
      -webkit-user-select: none;
      user-select: none;
    }

    .resizer {
      position: absolute;
      height: 16px;
      width: 16px;
    }

    .resizer.edge {
      height: 8px;
      width: 8px;
      top: -4px;
      right: -4px;
      bottom: -4px;
      left: -4px;
    }

    .resizer.edge.n {
      width: auto;
      bottom: auto;
      cursor: ns-resize;
    }

    .resizer.ne {
      top: -4px;
      right: -4px;
      cursor: nesw-resize;
    }

    .resizer.edge.e {
      height: auto;
      left: auto;
      cursor: ew-resize;
    }

    .resizer.se {
      bottom: -4px;
      right: -4px;
      cursor: nwse-resize;
    }

    .resizer.edge.s {
      width: auto;
      top: auto;
      cursor: ns-resize;
    }

    .resizer.sw {
      bottom: -4px;
      left: -4px;
      cursor: nesw-resize;
    }

    .resizer.edge.w {
      height: auto;
      right: auto;
      cursor: ew-resize;
    }

    .resizer.nw {
      top: -4px;
      left: -4px;
      cursor: nwse-resize;
    }
  `,{moduleId:"vaadin-dialog-resizable-overlay-styles"});const m=t=>class extends t{static get properties(){return{resizable:{type:Boolean,value:!1,reflectToAttribute:!0}}}ready(){super.ready(),this._originalBounds={},this._originalMouseCoords={},this._resizeListeners={start:{},resize:{},stop:{}},this._addResizeListeners()}_addResizeListeners(){["n","e","s","w","nw","ne","se","sw"].forEach(t=>{const e=document.createElement("div");this._resizeListeners.start[t]=e=>this._startResize(e,t),this._resizeListeners.resize[t]=e=>this._resize(e,t),this._resizeListeners.stop[t]=()=>this._stopResize(t),1===t.length&&e.classList.add("edge"),e.classList.add("resizer"),e.classList.add(t),e.addEventListener("mousedown",this._resizeListeners.start[t]),e.addEventListener("touchstart",this._resizeListeners.start[t]),this.$.overlay.$.resizerContainer.appendChild(e)})}_startResize(t,e){if(!("touchstart"===t.type&&t.touches.length>1)&&(0===t.button||t.touches)){t.preventDefault(),this._originalBounds=this.$.overlay.getBounds();const n=h(t);this._originalMouseCoords={top:n.pageY,left:n.pageX},window.addEventListener("mousemove",this._resizeListeners.resize[e]),window.addEventListener("touchmove",this._resizeListeners.resize[e]),window.addEventListener("mouseup",this._resizeListeners.stop[e]),window.addEventListener("touchend",this._resizeListeners.stop[e]),"absolute"!==this.$.overlay.$.overlay.style.position&&this.$.overlay.setBounds(this._originalBounds)}}_resize(t,e){const n=h(t);if(p(n)){const t=40;e.split("").forEach(e=>{switch(e){case"n":{const e=this._originalBounds.height-(n.pageY-this._originalMouseCoords.top),o=this._originalBounds.top+(n.pageY-this._originalMouseCoords.top);e>t&&this.$.overlay.setBounds({top:o,height:e});break}case"e":{const e=this._originalBounds.width+(n.pageX-this._originalMouseCoords.left);e>t&&this.$.overlay.setBounds({width:e});break}case"s":{const e=this._originalBounds.height+(n.pageY-this._originalMouseCoords.top);e>t&&this.$.overlay.setBounds({height:e});break}case"w":{const e=this._originalBounds.width-(n.pageX-this._originalMouseCoords.left),o=this._originalBounds.left+(n.pageX-this._originalMouseCoords.left);e>t&&this.$.overlay.setBounds({left:o,width:e});break}}})}}_stopResize(t){window.removeEventListener("mousemove",this._resizeListeners.resize[t]),window.removeEventListener("touchmove",this._resizeListeners.resize[t]),window.removeEventListener("mouseup",this._resizeListeners.stop[t]),window.removeEventListener("touchend",this._resizeListeners.stop[t]),this.dispatchEvent(new CustomEvent("resize",{detail:this._getResizeDimensions()}))}_getResizeDimensions(){const t=this.$.overlay.$.resizerContainer.scrollTop,{width:e,height:n}=getComputedStyle(this.$.overlay.$.overlay),o=this.$.overlay.$.content;o.setAttribute("style","position: absolute; top: 0; right: 0; bottom: 0; left: 0; box-sizing: content-box; height: auto;");const{width:i,height:r}=getComputedStyle(o);return o.removeAttribute("style"),this.$.overlay.$.resizerContainer.scrollTop=t,{width:e,height:n,contentWidth:i,contentHeight:r}}}
/**
 * @license
 * Copyright (c) 2017 - 2022 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */;let _;Object(i.c)("vaadin-dialog-overlay",i.b`
    [part='header'],
    [part='header-content'],
    [part='footer'] {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      flex: none;
      pointer-events: none;
      z-index: 1;
    }

    [part='header'] {
      flex-wrap: nowrap;
    }

    ::slotted([slot='header-content']),
    ::slotted([slot='title']),
    ::slotted([slot='footer']) {
      display: contents;
      pointer-events: auto;
    }

    ::slotted([slot='title']) {
      font: inherit !important;
      overflow-wrap: anywhere;
    }

    [part='header-content'] {
      flex: 1;
    }

    :host([has-title]) [part='header-content'],
    [part='footer'] {
      justify-content: flex-end;
    }

    :host(:not([has-title]):not([has-header])) [part='header'],
    :host(:not([has-header])) [part='header-content'],
    :host(:not([has-title])) [part='title'],
    :host(:not([has-footer])) [part='footer'] {
      display: none !important;
    }

    :host(:is([has-title], [has-header], [has-footer])) [part='content'] {
      height: auto;
    }

    @media (min-height: 320px) {
      :host(:is([has-title], [has-header], [has-footer])) .resizer-container {
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      :host(:is([has-title], [has-header], [has-footer])) [part='content'] {
        flex: 1;
        overflow: auto;
      }
    }

    /*
      NOTE(platosha): Make some min-width to prevent collapsing of the content
      taking the parent width, e. g., <vaadin-grid> and such.
    */
    [part='content'] {
      min-width: 12em; /* matches the default <vaadin-text-field> width */
    }

    :host([has-bounds-set]) [part='overlay'] {
      max-width: none;
    }
  `,{moduleId:"vaadin-dialog-overlay-styles"});class v extends c.a{static get is(){return"vaadin-dialog-overlay"}static get template(){if(!_){_=super.template.cloneNode(!0);const t=_.content.querySelector('[part="content"]'),e=_.content.querySelector('[part="overlay"]'),n=document.createElement("section");n.id="resizerContainer",n.classList.add("resizer-container"),n.appendChild(t),e.appendChild(n);const o=document.createElement("header");o.setAttribute("part","header"),n.insertBefore(o,t);const i=document.createElement("div");i.setAttribute("part","title"),o.appendChild(i);const r=document.createElement("slot");r.setAttribute("name","title"),i.appendChild(r);const a=document.createElement("div");a.setAttribute("part","header-content"),o.appendChild(a);const s=document.createElement("slot");s.setAttribute("name","header-content"),a.appendChild(s);const l=document.createElement("footer");l.setAttribute("part","footer"),n.appendChild(l);const c=document.createElement("slot");c.setAttribute("name","footer"),l.appendChild(c)}return _}static get observers(){return["_headerFooterRendererChange(headerRenderer, footerRenderer, opened)","_headerTitleChanged(headerTitle, opened)"]}static get properties(){return{modeless:Boolean,withBackdrop:Boolean,headerTitle:String,headerRenderer:Function,footerRenderer:Function}}ready(){super.ready(),this.__resizeObserver=new ResizeObserver(()=>{this.__updateOverflow()}),this.__resizeObserver.observe(this.$.resizerContainer),this.$.content.addEventListener("scroll",()=>{this.__updateOverflow()})}__createContainer(t){const e=document.createElement("div");return e.setAttribute("slot",t),e}__clearContainer(t){t.innerHTML="",delete t._$litPart$}__initContainer(t,e){return t?this.__clearContainer(t):t=this.__createContainer(e),t}_headerFooterRendererChange(t,e,n){const o=this.__oldHeaderRenderer!==t;this.__oldHeaderRenderer=t;const i=this.__oldFooterRenderer!==e;this.__oldFooterRenderer=e;const r=this._oldOpenedFooterHeader!==n;this._oldOpenedFooterHeader=n,this.toggleAttribute("has-header",!!t),this.toggleAttribute("has-footer",!!e),o&&(t?this.headerContainer=this.__initContainer(this.headerContainer,"header-content"):this.headerContainer&&(this.headerContainer.remove(),this.headerContainer=null,this.__updateOverflow())),i&&(e?this.footerContainer=this.__initContainer(this.footerContainer,"footer"):this.footerContainer&&(this.footerContainer.remove(),this.footerContainer=null,this.__updateOverflow())),(t&&(o||r)||e&&(i||r))&&n&&this.requestContentUpdate()}_headerTitleChanged(t,e){this.toggleAttribute("has-title",!!t),e&&(t||this._oldHeaderTitle)&&this.requestContentUpdate(),this._oldHeaderTitle=t}_headerTitleRenderer(){this.headerTitle?(this.headerTitleElement||(this.headerTitleElement=document.createElement("h2"),this.headerTitleElement.setAttribute("slot","title"),this.headerTitleElement.classList.add("draggable")),this.appendChild(this.headerTitleElement),this.headerTitleElement.textContent=this.headerTitle):this.headerTitleElement&&(this.headerTitleElement.remove(),this.headerTitleElement=null)}requestContentUpdate(){super.requestContentUpdate(),this.headerContainer&&(this.headerContainer.parentElement||this.appendChild(this.headerContainer),this.headerRenderer&&this.headerRenderer.call(this.owner,this.headerContainer,this.owner)),this.footerContainer&&(this.footerContainer.parentElement||this.appendChild(this.footerContainer),this.footerRenderer&&this.footerRenderer.call(this.owner,this.footerContainer,this.owner)),this._headerTitleRenderer(),this.__updateOverflow()}setBounds(t){const e=this.$.overlay,n={...t};"absolute"!==e.style.position&&(e.style.position="absolute",this.setAttribute("has-bounds-set",""),this.__forceSafariReflow()),Object.keys(n).forEach(t=>{"number"==typeof n[t]&&(n[t]=n[t]+"px")}),Object.assign(e.style,n)}getBounds(){const t=this.$.overlay.getBoundingClientRect(),e=this.getBoundingClientRect();return{top:t.top-e.top,left:t.left-e.left,width:t.width,height:t.height}}__forceSafariReflow(){const t=this.$.resizerContainer.scrollTop,e=this.$.overlay;e.style.display="block",requestAnimationFrame(()=>{e.style.display="",this.$.resizerContainer.scrollTop=t})}__updateOverflow(){let t="";if(this.hasAttribute("has-header")||this.hasAttribute("has-footer")||this.headerTitle){const e=this.$.content;e.scrollTop>0&&(t+=" top"),e.scrollTop<e.scrollHeight-e.clientHeight&&(t+=" bottom")}const e=t.trim();e.length>0&&this.getAttribute("overflow")!==e?this.setAttribute("overflow",e):0===e.length&&this.hasAttribute("overflow")&&this.removeAttribute("overflow")}}customElements.define(v.is,v);class g extends(Object(d.a)(Object(s.a)(f(m(a.a))))){static get template(){return a.b`
      <style>
        :host {
          display: none !important;
        }
      </style>

      <vaadin-dialog-overlay
        id="overlay"
        header-title="[[headerTitle]]"
        on-opened-changed="_onOverlayOpened"
        on-mousedown="_bringOverlayToFront"
        on-touchstart="_bringOverlayToFront"
        theme$="[[_theme]]"
        modeless="[[modeless]]"
        with-backdrop="[[!modeless]]"
        resizable$="[[resizable]]"
        focus-trap
      ></vaadin-dialog-overlay>
    `}static get is(){return"vaadin-dialog"}static get properties(){return{opened:{type:Boolean,value:!1,notify:!0},noCloseOnOutsideClick:{type:Boolean,value:!1},noCloseOnEsc:{type:Boolean,value:!1},ariaLabel:{type:String,value:""},renderer:Function,headerTitle:String,headerRenderer:Function,footerRenderer:Function,modeless:{type:Boolean,value:!1}}}static get observers(){return["_openedChanged(opened)","_ariaLabelChanged(ariaLabel, headerTitle)","_rendererChanged(renderer, headerRenderer, footerRenderer)"]}ready(){super.ready(),this.$.overlay.setAttribute("role","dialog"),this.$.overlay.addEventListener("vaadin-overlay-outside-click",this._handleOutsideClick.bind(this)),this.$.overlay.addEventListener("vaadin-overlay-escape-press",this._handleEscPress.bind(this)),Object(l.a)(this)}requestContentUpdate(){this.$&&this.$.overlay.requestContentUpdate()}_rendererChanged(t,e,n){this.$.overlay.setProperties({owner:this,renderer:t,headerRenderer:e,footerRenderer:n})}connectedCallback(){super.connectedCallback(),this.__restoreOpened&&(this.opened=!0)}disconnectedCallback(){super.disconnectedCallback(),this.__restoreOpened=this.opened,this.opened=!1}_openedChanged(t){this.$.overlay.opened=t}_ariaLabelChanged(t,e){t||e?this.$.overlay.setAttribute("aria-label",t||e):this.$.overlay.removeAttribute("aria-label")}_onOverlayOpened(t){!1===t.detail.value&&(this.opened=!1)}_handleOutsideClick(t){this.noCloseOnOutsideClick&&t.preventDefault()}_handleEscPress(t){this.noCloseOnEsc&&t.preventDefault()}_bringOverlayToFront(){this.modeless&&this.$.overlay.bringToFront()}}customElements.define(g.is,g);console.warn('WARNING: Since Vaadin 23.2, "@vaadin/vaadin-dialog" is deprecated. Use "@vaadin/dialog" instead.')},190:function(t,e,n){"use strict";n.d(e,"a",(function(){return J}));var o=n(5),i=function(){function t(t){void 0===t&&(t={}),this.adapter_=t}return Object.defineProperty(t,"cssClasses",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"strings",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"numbers",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"defaultAdapter",{get:function(){return{}},enumerable:!0,configurable:!0}),t.prototype.init=function(){},t.prototype.destroy=function(){},t}(),r=function(){function t(t,e){for(var n=[],i=2;i<arguments.length;i++)n[i-2]=arguments[i];this.root_=t,this.initialize.apply(this,Object(o.d)(n)),this.foundation_=void 0===e?this.getDefaultFoundation():e,this.foundation_.init(),this.initialSyncWithDOM()}return t.attachTo=function(e){return new t(e,new i({}))},t.prototype.initialize=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]},t.prototype.getDefaultFoundation=function(){throw new Error("Subclasses must override getDefaultFoundation to return a properly configured foundation class")},t.prototype.initialSyncWithDOM=function(){},t.prototype.destroy=function(){this.foundation_.destroy()},t.prototype.listen=function(t,e,n){this.root_.addEventListener(t,e,n)},t.prototype.unlisten=function(t,e,n){this.root_.removeEventListener(t,e,n)},t.prototype.emit=function(t,e,n){var o;void 0===n&&(n=!1),"function"==typeof CustomEvent?o=new CustomEvent(t,{bubbles:n,detail:e}):(o=document.createEvent("CustomEvent")).initCustomEvent(t,n,!1,e),this.root_.dispatchEvent(o)},t}(),a=function(){function t(t){void 0===t&&(t={}),this.adapter_=t}return Object.defineProperty(t,"cssClasses",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"strings",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"numbers",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"defaultAdapter",{get:function(){return{}},enumerable:!0,configurable:!0}),t.prototype.init=function(){},t.prototype.destroy=function(){},t}(),s=function(){function t(t,e){for(var n=[],i=2;i<arguments.length;i++)n[i-2]=arguments[i];this.root_=t,this.initialize.apply(this,Object(o.d)(n)),this.foundation_=void 0===e?this.getDefaultFoundation():e,this.foundation_.init(),this.initialSyncWithDOM()}return t.attachTo=function(e){return new t(e,new a({}))},t.prototype.initialize=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]},t.prototype.getDefaultFoundation=function(){throw new Error("Subclasses must override getDefaultFoundation to return a properly configured foundation class")},t.prototype.initialSyncWithDOM=function(){},t.prototype.destroy=function(){this.foundation_.destroy()},t.prototype.listen=function(t,e,n){this.root_.addEventListener(t,e,n)},t.prototype.unlisten=function(t,e,n){this.root_.removeEventListener(t,e,n)},t.prototype.emit=function(t,e,n){var o;void 0===n&&(n=!1),"function"==typeof CustomEvent?o=new CustomEvent(t,{bubbles:n,detail:e}):(o=document.createEvent("CustomEvent")).initCustomEvent(t,n,!1,e),this.root_.dispatchEvent(o)},t}();
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function l(t){return void 0===t&&(t=window),!!function(t){void 0===t&&(t=window);var e=!1;try{var n={get passive(){return e=!0,!1}},o=function(){};t.document.addEventListener("test",o,n),t.document.removeEventListener("test",o,n)}catch(t){e=!1}return e}
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */(t)&&{passive:!0}}function c(t,e){return(t.matches||t.webkitMatchesSelector||t.msMatchesSelector).call(t,e)}
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var d,u={ANIMATING:"mdc-tab-scroller--animating",SCROLL_AREA_SCROLL:"mdc-tab-scroller__scroll-area--scroll",SCROLL_TEST:"mdc-tab-scroller__test"},h={AREA_SELECTOR:".mdc-tab-scroller__scroll-area",CONTENT_SELECTOR:".mdc-tab-scroller__scroll-content"},p=function(t){this.adapter_=t},f=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(o.b)(e,t),e.prototype.getScrollPositionRTL=function(){var t=this.adapter_.getScrollAreaScrollLeft(),e=this.calculateScrollEdges_().right;return Math.round(e-t)},e.prototype.scrollToRTL=function(t){var e=this.calculateScrollEdges_(),n=this.adapter_.getScrollAreaScrollLeft(),o=this.clampScrollValue_(e.right-t);return{finalScrollPosition:o,scrollDelta:o-n}},e.prototype.incrementScrollRTL=function(t){var e=this.adapter_.getScrollAreaScrollLeft(),n=this.clampScrollValue_(e-t);return{finalScrollPosition:n,scrollDelta:n-e}},e.prototype.getAnimatingScrollPosition=function(t){return t},e.prototype.calculateScrollEdges_=function(){return{left:0,right:this.adapter_.getScrollContentOffsetWidth()-this.adapter_.getScrollAreaOffsetWidth()}},e.prototype.clampScrollValue_=function(t){var e=this.calculateScrollEdges_();return Math.min(Math.max(e.left,t),e.right)},e}(p),m=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(o.b)(e,t),e.prototype.getScrollPositionRTL=function(t){var e=this.adapter_.getScrollAreaScrollLeft();return Math.round(t-e)},e.prototype.scrollToRTL=function(t){var e=this.adapter_.getScrollAreaScrollLeft(),n=this.clampScrollValue_(-t);return{finalScrollPosition:n,scrollDelta:n-e}},e.prototype.incrementScrollRTL=function(t){var e=this.adapter_.getScrollAreaScrollLeft(),n=this.clampScrollValue_(e-t);return{finalScrollPosition:n,scrollDelta:n-e}},e.prototype.getAnimatingScrollPosition=function(t,e){return t-e},e.prototype.calculateScrollEdges_=function(){var t=this.adapter_.getScrollContentOffsetWidth();return{left:this.adapter_.getScrollAreaOffsetWidth()-t,right:0}},e.prototype.clampScrollValue_=function(t){var e=this.calculateScrollEdges_();return Math.max(Math.min(e.right,t),e.left)},e}(p),_=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(o.b)(e,t),e.prototype.getScrollPositionRTL=function(t){var e=this.adapter_.getScrollAreaScrollLeft();return Math.round(e-t)},e.prototype.scrollToRTL=function(t){var e=this.adapter_.getScrollAreaScrollLeft(),n=this.clampScrollValue_(t);return{finalScrollPosition:n,scrollDelta:e-n}},e.prototype.incrementScrollRTL=function(t){var e=this.adapter_.getScrollAreaScrollLeft(),n=this.clampScrollValue_(e+t);return{finalScrollPosition:n,scrollDelta:e-n}},e.prototype.getAnimatingScrollPosition=function(t,e){return t+e},e.prototype.calculateScrollEdges_=function(){return{left:this.adapter_.getScrollContentOffsetWidth()-this.adapter_.getScrollAreaOffsetWidth(),right:0}},e.prototype.clampScrollValue_=function(t){var e=this.calculateScrollEdges_();return Math.min(Math.max(e.right,t),e.left)},e}(p),v=function(t){function e(n){var i=t.call(this,Object(o.a)(Object(o.a)({},e.defaultAdapter),n))||this;return i.isAnimating_=!1,i}return Object(o.b)(e,t),Object.defineProperty(e,"cssClasses",{get:function(){return u},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return h},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{eventTargetMatchesSelector:function(){return!1},addClass:function(){},removeClass:function(){},addScrollAreaClass:function(){},setScrollAreaStyleProperty:function(){},setScrollContentStyleProperty:function(){},getScrollContentStyleValue:function(){return""},setScrollAreaScrollLeft:function(){},getScrollAreaScrollLeft:function(){return 0},getScrollContentOffsetWidth:function(){return 0},getScrollAreaOffsetWidth:function(){return 0},computeScrollAreaClientRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},computeScrollContentClientRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},computeHorizontalScrollbarHeight:function(){return 0}}},enumerable:!0,configurable:!0}),e.prototype.init=function(){var t=this.adapter_.computeHorizontalScrollbarHeight();this.adapter_.setScrollAreaStyleProperty("margin-bottom",-t+"px"),this.adapter_.addScrollAreaClass(e.cssClasses.SCROLL_AREA_SCROLL)},e.prototype.getScrollPosition=function(){if(this.isRTL_())return this.computeCurrentScrollPositionRTL_();var t=this.calculateCurrentTranslateX_();return this.adapter_.getScrollAreaScrollLeft()-t},e.prototype.handleInteraction=function(){this.isAnimating_&&this.stopScrollAnimation_()},e.prototype.handleTransitionEnd=function(t){var n=t.target;this.isAnimating_&&this.adapter_.eventTargetMatchesSelector(n,e.strings.CONTENT_SELECTOR)&&(this.isAnimating_=!1,this.adapter_.removeClass(e.cssClasses.ANIMATING))},e.prototype.incrementScroll=function(t){0!==t&&this.animate_(this.getIncrementScrollOperation_(t))},e.prototype.incrementScrollImmediate=function(t){if(0!==t){var e=this.getIncrementScrollOperation_(t);0!==e.scrollDelta&&(this.stopScrollAnimation_(),this.adapter_.setScrollAreaScrollLeft(e.finalScrollPosition))}},e.prototype.scrollTo=function(t){if(this.isRTL_())return this.scrollToRTL_(t);this.scrollTo_(t)},e.prototype.getRTLScroller=function(){return this.rtlScrollerInstance_||(this.rtlScrollerInstance_=this.rtlScrollerFactory_()),this.rtlScrollerInstance_},e.prototype.calculateCurrentTranslateX_=function(){var t=this.adapter_.getScrollContentStyleValue("transform");if("none"===t)return 0;var e=/\((.+?)\)/.exec(t);if(!e)return 0;var n=e[1],i=Object(o.c)(n.split(","),6),r=(i[0],i[1],i[2],i[3],i[4]);i[5];return parseFloat(r)},e.prototype.clampScrollValue_=function(t){var e=this.calculateScrollEdges_();return Math.min(Math.max(e.left,t),e.right)},e.prototype.computeCurrentScrollPositionRTL_=function(){var t=this.calculateCurrentTranslateX_();return this.getRTLScroller().getScrollPositionRTL(t)},e.prototype.calculateScrollEdges_=function(){return{left:0,right:this.adapter_.getScrollContentOffsetWidth()-this.adapter_.getScrollAreaOffsetWidth()}},e.prototype.scrollTo_=function(t){var e=this.getScrollPosition(),n=this.clampScrollValue_(t),o=n-e;this.animate_({finalScrollPosition:n,scrollDelta:o})},e.prototype.scrollToRTL_=function(t){var e=this.getRTLScroller().scrollToRTL(t);this.animate_(e)},e.prototype.getIncrementScrollOperation_=function(t){if(this.isRTL_())return this.getRTLScroller().incrementScrollRTL(t);var e=this.getScrollPosition(),n=t+e,o=this.clampScrollValue_(n);return{finalScrollPosition:o,scrollDelta:o-e}},e.prototype.animate_=function(t){var n=this;0!==t.scrollDelta&&(this.stopScrollAnimation_(),this.adapter_.setScrollAreaScrollLeft(t.finalScrollPosition),this.adapter_.setScrollContentStyleProperty("transform","translateX("+t.scrollDelta+"px)"),this.adapter_.computeScrollAreaClientRect(),requestAnimationFrame((function(){n.adapter_.addClass(e.cssClasses.ANIMATING),n.adapter_.setScrollContentStyleProperty("transform","none")})),this.isAnimating_=!0)},e.prototype.stopScrollAnimation_=function(){this.isAnimating_=!1;var t=this.getAnimatingScrollPosition_();this.adapter_.removeClass(e.cssClasses.ANIMATING),this.adapter_.setScrollContentStyleProperty("transform","translateX(0px)"),this.adapter_.setScrollAreaScrollLeft(t)},e.prototype.getAnimatingScrollPosition_=function(){var t=this.calculateCurrentTranslateX_(),e=this.adapter_.getScrollAreaScrollLeft();return this.isRTL_()?this.getRTLScroller().getAnimatingScrollPosition(e,t):e-t},e.prototype.rtlScrollerFactory_=function(){var t=this.adapter_.getScrollAreaScrollLeft();this.adapter_.setScrollAreaScrollLeft(t-1);var e=this.adapter_.getScrollAreaScrollLeft();if(e<0)return this.adapter_.setScrollAreaScrollLeft(t),new m(this.adapter_);var n=this.adapter_.computeScrollAreaClientRect(),o=this.adapter_.computeScrollContentClientRect(),i=Math.round(o.right-n.right);return this.adapter_.setScrollAreaScrollLeft(t),i===e?new _(this.adapter_):new f(this.adapter_)},e.prototype.isRTL_=function(){return"rtl"===this.adapter_.getScrollContentStyleValue("direction")},e}(a);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var g=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(o.b)(e,t),e.attachTo=function(t){return new e(t)},e.prototype.initialize=function(){this.area_=this.root_.querySelector(v.strings.AREA_SELECTOR),this.content_=this.root_.querySelector(v.strings.CONTENT_SELECTOR)},e.prototype.initialSyncWithDOM=function(){var t=this;this.handleInteraction_=function(){return t.foundation_.handleInteraction()},this.handleTransitionEnd_=function(e){return t.foundation_.handleTransitionEnd(e)},this.area_.addEventListener("wheel",this.handleInteraction_,l()),this.area_.addEventListener("touchstart",this.handleInteraction_,l()),this.area_.addEventListener("pointerdown",this.handleInteraction_,l()),this.area_.addEventListener("mousedown",this.handleInteraction_,l()),this.area_.addEventListener("keydown",this.handleInteraction_,l()),this.content_.addEventListener("transitionend",this.handleTransitionEnd_)},e.prototype.destroy=function(){t.prototype.destroy.call(this),this.area_.removeEventListener("wheel",this.handleInteraction_,l()),this.area_.removeEventListener("touchstart",this.handleInteraction_,l()),this.area_.removeEventListener("pointerdown",this.handleInteraction_,l()),this.area_.removeEventListener("mousedown",this.handleInteraction_,l()),this.area_.removeEventListener("keydown",this.handleInteraction_,l()),this.content_.removeEventListener("transitionend",this.handleTransitionEnd_)},e.prototype.getDefaultFoundation=function(){var t=this;return new v({eventTargetMatchesSelector:function(t,e){return c(t,e)},addClass:function(e){return t.root_.classList.add(e)},removeClass:function(e){return t.root_.classList.remove(e)},addScrollAreaClass:function(e){return t.area_.classList.add(e)},setScrollAreaStyleProperty:function(e,n){return t.area_.style.setProperty(e,n)},setScrollContentStyleProperty:function(e,n){return t.content_.style.setProperty(e,n)},getScrollContentStyleValue:function(e){return window.getComputedStyle(t.content_).getPropertyValue(e)},setScrollAreaScrollLeft:function(e){return t.area_.scrollLeft=e},getScrollAreaScrollLeft:function(){return t.area_.scrollLeft},getScrollContentOffsetWidth:function(){return t.content_.offsetWidth},getScrollAreaOffsetWidth:function(){return t.area_.offsetWidth},computeScrollAreaClientRect:function(){return t.area_.getBoundingClientRect()},computeScrollContentClientRect:function(){return t.content_.getBoundingClientRect()},computeHorizontalScrollbarHeight:function(){return function(t,e){if(void 0===e&&(e=!0),e&&void 0!==d)return d;var n=t.createElement("div");n.classList.add(u.SCROLL_TEST),t.body.appendChild(n);var o=n.offsetHeight-n.clientHeight;return t.body.removeChild(n),e&&(d=o),o}(document)}})},e.prototype.getScrollPosition=function(){return this.foundation_.getScrollPosition()},e.prototype.getScrollContentWidth=function(){return this.content_.offsetWidth},e.prototype.incrementScroll=function(t){this.foundation_.incrementScroll(t)},e.prototype.scrollTo=function(t){this.foundation_.scrollTo(t)},e}(s),b=function(){function t(t){void 0===t&&(t={}),this.adapter_=t}return Object.defineProperty(t,"cssClasses",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"strings",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"numbers",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"defaultAdapter",{get:function(){return{}},enumerable:!0,configurable:!0}),t.prototype.init=function(){},t.prototype.destroy=function(){},t}(),y=function(){function t(t,e){for(var n=[],i=2;i<arguments.length;i++)n[i-2]=arguments[i];this.root_=t,this.initialize.apply(this,Object(o.d)(n)),this.foundation_=void 0===e?this.getDefaultFoundation():e,this.foundation_.init(),this.initialSyncWithDOM()}return t.attachTo=function(e){return new t(e,new b({}))},t.prototype.initialize=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]},t.prototype.getDefaultFoundation=function(){throw new Error("Subclasses must override getDefaultFoundation to return a properly configured foundation class")},t.prototype.initialSyncWithDOM=function(){},t.prototype.destroy=function(){this.foundation_.destroy()},t.prototype.listen=function(t,e,n){this.root_.addEventListener(t,e,n)},t.prototype.unlisten=function(t,e,n){this.root_.removeEventListener(t,e,n)},t.prototype.emit=function(t,e,n){var o;void 0===n&&(n=!1),"function"==typeof CustomEvent?o=new CustomEvent(t,{bubbles:n,detail:e}):(o=document.createEvent("CustomEvent")).initCustomEvent(t,n,!1,e),this.root_.dispatchEvent(o)},t}();
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function C(t){return void 0===t&&(t=window),!!function(t){void 0===t&&(t=window);var e=!1;try{var n={get passive(){return e=!0,!1}},o=function(){};t.document.addEventListener("test",o,n),t.document.removeEventListener("test",o,n)}catch(t){e=!1}return e}
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */(t)&&{passive:!0}}function E(t,e){return(t.matches||t.webkitMatchesSelector||t.msMatchesSelector).call(t,e)}
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var A,O={BG_FOCUSED:"mdc-ripple-upgraded--background-focused",FG_ACTIVATION:"mdc-ripple-upgraded--foreground-activation",FG_DEACTIVATION:"mdc-ripple-upgraded--foreground-deactivation",ROOT:"mdc-ripple-upgraded",UNBOUNDED:"mdc-ripple-upgraded--unbounded"},T={VAR_FG_SCALE:"--mdc-ripple-fg-scale",VAR_FG_SIZE:"--mdc-ripple-fg-size",VAR_FG_TRANSLATE_END:"--mdc-ripple-fg-translate-end",VAR_FG_TRANSLATE_START:"--mdc-ripple-fg-translate-start",VAR_LEFT:"--mdc-ripple-left",VAR_TOP:"--mdc-ripple-top"},w={DEACTIVATION_TIMEOUT_MS:225,FG_DEACTIVATION_MS:150,INITIAL_ORIGIN_SCALE:.6,PADDING:10,TAP_DELAY_MS:300};
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var S=["touchstart","pointerdown","mousedown","keydown"],x=["touchend","pointerup","mouseup","contextmenu"],L=[],R=function(t){function e(n){var i=t.call(this,Object(o.a)(Object(o.a)({},e.defaultAdapter),n))||this;return i.activationAnimationHasEnded_=!1,i.activationTimer_=0,i.fgDeactivationRemovalTimer_=0,i.fgScale_="0",i.frame_={width:0,height:0},i.initialSize_=0,i.layoutFrame_=0,i.maxRadius_=0,i.unboundedCoords_={left:0,top:0},i.activationState_=i.defaultActivationState_(),i.activationTimerCallback_=function(){i.activationAnimationHasEnded_=!0,i.runDeactivationUXLogicIfReady_()},i.activateHandler_=function(t){return i.activate_(t)},i.deactivateHandler_=function(){return i.deactivate_()},i.focusHandler_=function(){return i.handleFocus()},i.blurHandler_=function(){return i.handleBlur()},i.resizeHandler_=function(){return i.layout()},i}return Object(o.b)(e,t),Object.defineProperty(e,"cssClasses",{get:function(){return O},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return T},enumerable:!0,configurable:!0}),Object.defineProperty(e,"numbers",{get:function(){return w},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},browserSupportsCssVars:function(){return!0},computeBoundingRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},containsEventTarget:function(){return!0},deregisterDocumentInteractionHandler:function(){},deregisterInteractionHandler:function(){},deregisterResizeHandler:function(){},getWindowPageOffset:function(){return{x:0,y:0}},isSurfaceActive:function(){return!0},isSurfaceDisabled:function(){return!0},isUnbounded:function(){return!0},registerDocumentInteractionHandler:function(){},registerInteractionHandler:function(){},registerResizeHandler:function(){},removeClass:function(){},updateCssVariable:function(){}}},enumerable:!0,configurable:!0}),e.prototype.init=function(){var t=this,n=this.supportsPressRipple_();if(this.registerRootHandlers_(n),n){var o=e.cssClasses,i=o.ROOT,r=o.UNBOUNDED;requestAnimationFrame((function(){t.adapter_.addClass(i),t.adapter_.isUnbounded()&&(t.adapter_.addClass(r),t.layoutInternal_())}))}},e.prototype.destroy=function(){var t=this;if(this.supportsPressRipple_()){this.activationTimer_&&(clearTimeout(this.activationTimer_),this.activationTimer_=0,this.adapter_.removeClass(e.cssClasses.FG_ACTIVATION)),this.fgDeactivationRemovalTimer_&&(clearTimeout(this.fgDeactivationRemovalTimer_),this.fgDeactivationRemovalTimer_=0,this.adapter_.removeClass(e.cssClasses.FG_DEACTIVATION));var n=e.cssClasses,o=n.ROOT,i=n.UNBOUNDED;requestAnimationFrame((function(){t.adapter_.removeClass(o),t.adapter_.removeClass(i),t.removeCssVars_()}))}this.deregisterRootHandlers_(),this.deregisterDeactivationHandlers_()},e.prototype.activate=function(t){this.activate_(t)},e.prototype.deactivate=function(){this.deactivate_()},e.prototype.layout=function(){var t=this;this.layoutFrame_&&cancelAnimationFrame(this.layoutFrame_),this.layoutFrame_=requestAnimationFrame((function(){t.layoutInternal_(),t.layoutFrame_=0}))},e.prototype.setUnbounded=function(t){var n=e.cssClasses.UNBOUNDED;t?this.adapter_.addClass(n):this.adapter_.removeClass(n)},e.prototype.handleFocus=function(){var t=this;requestAnimationFrame((function(){return t.adapter_.addClass(e.cssClasses.BG_FOCUSED)}))},e.prototype.handleBlur=function(){var t=this;requestAnimationFrame((function(){return t.adapter_.removeClass(e.cssClasses.BG_FOCUSED)}))},e.prototype.supportsPressRipple_=function(){return this.adapter_.browserSupportsCssVars()},e.prototype.defaultActivationState_=function(){return{activationEvent:void 0,hasDeactivationUXRun:!1,isActivated:!1,isProgrammatic:!1,wasActivatedByPointer:!1,wasElementMadeActive:!1}},e.prototype.registerRootHandlers_=function(t){var e=this;t&&(S.forEach((function(t){e.adapter_.registerInteractionHandler(t,e.activateHandler_)})),this.adapter_.isUnbounded()&&this.adapter_.registerResizeHandler(this.resizeHandler_)),this.adapter_.registerInteractionHandler("focus",this.focusHandler_),this.adapter_.registerInteractionHandler("blur",this.blurHandler_)},e.prototype.registerDeactivationHandlers_=function(t){var e=this;"keydown"===t.type?this.adapter_.registerInteractionHandler("keyup",this.deactivateHandler_):x.forEach((function(t){e.adapter_.registerDocumentInteractionHandler(t,e.deactivateHandler_)}))},e.prototype.deregisterRootHandlers_=function(){var t=this;S.forEach((function(e){t.adapter_.deregisterInteractionHandler(e,t.activateHandler_)})),this.adapter_.deregisterInteractionHandler("focus",this.focusHandler_),this.adapter_.deregisterInteractionHandler("blur",this.blurHandler_),this.adapter_.isUnbounded()&&this.adapter_.deregisterResizeHandler(this.resizeHandler_)},e.prototype.deregisterDeactivationHandlers_=function(){var t=this;this.adapter_.deregisterInteractionHandler("keyup",this.deactivateHandler_),x.forEach((function(e){t.adapter_.deregisterDocumentInteractionHandler(e,t.deactivateHandler_)}))},e.prototype.removeCssVars_=function(){var t=this,n=e.strings;Object.keys(n).forEach((function(e){0===e.indexOf("VAR_")&&t.adapter_.updateCssVariable(n[e],null)}))},e.prototype.activate_=function(t){var e=this;if(!this.adapter_.isSurfaceDisabled()){var n=this.activationState_;if(!n.isActivated){var o=this.previousActivationEvent_;if(!(o&&void 0!==t&&o.type!==t.type))n.isActivated=!0,n.isProgrammatic=void 0===t,n.activationEvent=t,n.wasActivatedByPointer=!n.isProgrammatic&&(void 0!==t&&("mousedown"===t.type||"touchstart"===t.type||"pointerdown"===t.type)),void 0!==t&&L.length>0&&L.some((function(t){return e.adapter_.containsEventTarget(t)}))?this.resetActivationState_():(void 0!==t&&(L.push(t.target),this.registerDeactivationHandlers_(t)),n.wasElementMadeActive=this.checkElementMadeActive_(t),n.wasElementMadeActive&&this.animateActivation_(),requestAnimationFrame((function(){L=[],n.wasElementMadeActive||void 0===t||" "!==t.key&&32!==t.keyCode||(n.wasElementMadeActive=e.checkElementMadeActive_(t),n.wasElementMadeActive&&e.animateActivation_()),n.wasElementMadeActive||(e.activationState_=e.defaultActivationState_())})))}}},e.prototype.checkElementMadeActive_=function(t){return void 0===t||"keydown"!==t.type||this.adapter_.isSurfaceActive()},e.prototype.animateActivation_=function(){var t=this,n=e.strings,o=n.VAR_FG_TRANSLATE_START,i=n.VAR_FG_TRANSLATE_END,r=e.cssClasses,a=r.FG_DEACTIVATION,s=r.FG_ACTIVATION,l=e.numbers.DEACTIVATION_TIMEOUT_MS;this.layoutInternal_();var c="",d="";if(!this.adapter_.isUnbounded()){var u=this.getFgTranslationCoordinates_(),h=u.startPoint,p=u.endPoint;c=h.x+"px, "+h.y+"px",d=p.x+"px, "+p.y+"px"}this.adapter_.updateCssVariable(o,c),this.adapter_.updateCssVariable(i,d),clearTimeout(this.activationTimer_),clearTimeout(this.fgDeactivationRemovalTimer_),this.rmBoundedActivationClasses_(),this.adapter_.removeClass(a),this.adapter_.computeBoundingRect(),this.adapter_.addClass(s),this.activationTimer_=setTimeout((function(){return t.activationTimerCallback_()}),l)},e.prototype.getFgTranslationCoordinates_=function(){var t,e=this.activationState_,n=e.activationEvent;return{startPoint:t={x:(t=e.wasActivatedByPointer?function(t,e,n){if(!t)return{x:0,y:0};var o,i,r=e.x,a=e.y,s=r+n.left,l=a+n.top;if("touchstart"===t.type){var c=t;o=c.changedTouches[0].pageX-s,i=c.changedTouches[0].pageY-l}else{var d=t;o=d.pageX-s,i=d.pageY-l}return{x:o,y:i}}(n,this.adapter_.getWindowPageOffset(),this.adapter_.computeBoundingRect()):{x:this.frame_.width/2,y:this.frame_.height/2}).x-this.initialSize_/2,y:t.y-this.initialSize_/2},endPoint:{x:this.frame_.width/2-this.initialSize_/2,y:this.frame_.height/2-this.initialSize_/2}}},e.prototype.runDeactivationUXLogicIfReady_=function(){var t=this,n=e.cssClasses.FG_DEACTIVATION,o=this.activationState_,i=o.hasDeactivationUXRun,r=o.isActivated;(i||!r)&&this.activationAnimationHasEnded_&&(this.rmBoundedActivationClasses_(),this.adapter_.addClass(n),this.fgDeactivationRemovalTimer_=setTimeout((function(){t.adapter_.removeClass(n)}),w.FG_DEACTIVATION_MS))},e.prototype.rmBoundedActivationClasses_=function(){var t=e.cssClasses.FG_ACTIVATION;this.adapter_.removeClass(t),this.activationAnimationHasEnded_=!1,this.adapter_.computeBoundingRect()},e.prototype.resetActivationState_=function(){var t=this;this.previousActivationEvent_=this.activationState_.activationEvent,this.activationState_=this.defaultActivationState_(),setTimeout((function(){return t.previousActivationEvent_=void 0}),e.numbers.TAP_DELAY_MS)},e.prototype.deactivate_=function(){var t=this,e=this.activationState_;if(e.isActivated){var n=Object(o.a)({},e);e.isProgrammatic?(requestAnimationFrame((function(){return t.animateDeactivation_(n)})),this.resetActivationState_()):(this.deregisterDeactivationHandlers_(),requestAnimationFrame((function(){t.activationState_.hasDeactivationUXRun=!0,t.animateDeactivation_(n),t.resetActivationState_()})))}},e.prototype.animateDeactivation_=function(t){var e=t.wasActivatedByPointer,n=t.wasElementMadeActive;(e||n)&&this.runDeactivationUXLogicIfReady_()},e.prototype.layoutInternal_=function(){var t=this;this.frame_=this.adapter_.computeBoundingRect();var n=Math.max(this.frame_.height,this.frame_.width);this.maxRadius_=this.adapter_.isUnbounded()?n:Math.sqrt(Math.pow(t.frame_.width,2)+Math.pow(t.frame_.height,2))+e.numbers.PADDING;var o=Math.floor(n*e.numbers.INITIAL_ORIGIN_SCALE);this.adapter_.isUnbounded()&&o%2!=0?this.initialSize_=o-1:this.initialSize_=o,this.fgScale_=""+this.maxRadius_/this.initialSize_,this.updateLayoutCssVars_()},e.prototype.updateLayoutCssVars_=function(){var t=e.strings,n=t.VAR_FG_SIZE,o=t.VAR_LEFT,i=t.VAR_TOP,r=t.VAR_FG_SCALE;this.adapter_.updateCssVariable(n,this.initialSize_+"px"),this.adapter_.updateCssVariable(r,this.fgScale_),this.adapter_.isUnbounded()&&(this.unboundedCoords_={left:Math.round(this.frame_.width/2-this.initialSize_/2),top:Math.round(this.frame_.height/2-this.initialSize_/2)},this.adapter_.updateCssVariable(o,this.unboundedCoords_.left+"px"),this.adapter_.updateCssVariable(i,this.unboundedCoords_.top+"px"))},e}(b),I=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.disabled=!1,e}return Object(o.b)(e,t),e.attachTo=function(t,n){void 0===n&&(n={isUnbounded:void 0});var o=new e(t);return void 0!==n.isUnbounded&&(o.unbounded=n.isUnbounded),o},e.createAdapter=function(t){return{addClass:function(e){return t.root_.classList.add(e)},browserSupportsCssVars:function(){return function(t,e){void 0===e&&(e=!1);var n,o=t.CSS;if("boolean"==typeof A&&!e)return A;if(!(o&&"function"==typeof o.supports))return!1;var i=o.supports("--css-vars","yes"),r=o.supports("(--css-vars: yes)")&&o.supports("color","#00000000");return n=i||r,e||(A=n),n}(window)},computeBoundingRect:function(){return t.root_.getBoundingClientRect()},containsEventTarget:function(e){return t.root_.contains(e)},deregisterDocumentInteractionHandler:function(t,e){return document.documentElement.removeEventListener(t,e,C())},deregisterInteractionHandler:function(e,n){return t.root_.removeEventListener(e,n,C())},deregisterResizeHandler:function(t){return window.removeEventListener("resize",t)},getWindowPageOffset:function(){return{x:window.pageXOffset,y:window.pageYOffset}},isSurfaceActive:function(){return E(t.root_,":active")},isSurfaceDisabled:function(){return Boolean(t.disabled)},isUnbounded:function(){return Boolean(t.unbounded)},registerDocumentInteractionHandler:function(t,e){return document.documentElement.addEventListener(t,e,C())},registerInteractionHandler:function(e,n){return t.root_.addEventListener(e,n,C())},registerResizeHandler:function(t){return window.addEventListener("resize",t)},removeClass:function(e){return t.root_.classList.remove(e)},updateCssVariable:function(e,n){return t.root_.style.setProperty(e,n)}}},Object.defineProperty(e.prototype,"unbounded",{get:function(){return Boolean(this.unbounded_)},set:function(t){this.unbounded_=Boolean(t),this.setUnbounded_()},enumerable:!0,configurable:!0}),e.prototype.activate=function(){this.foundation_.activate()},e.prototype.deactivate=function(){this.foundation_.deactivate()},e.prototype.layout=function(){this.foundation_.layout()},e.prototype.getDefaultFoundation=function(){return new R(e.createAdapter(this))},e.prototype.initialSyncWithDOM=function(){var t=this.root_;this.unbounded="mdcRippleIsUnbounded"in t.dataset},e.prototype.setUnbounded_=function(){this.foundation_.setUnbounded(Boolean(this.unbounded_))},e}(y),D=function(){function t(t){void 0===t&&(t={}),this.adapter_=t}return Object.defineProperty(t,"cssClasses",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"strings",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"numbers",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"defaultAdapter",{get:function(){return{}},enumerable:!0,configurable:!0}),t.prototype.init=function(){},t.prototype.destroy=function(){},t}(),z=function(){function t(t,e){for(var n=[],i=2;i<arguments.length;i++)n[i-2]=arguments[i];this.root_=t,this.initialize.apply(this,Object(o.d)(n)),this.foundation_=void 0===e?this.getDefaultFoundation():e,this.foundation_.init(),this.initialSyncWithDOM()}return t.attachTo=function(e){return new t(e,new D({}))},t.prototype.initialize=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]},t.prototype.getDefaultFoundation=function(){throw new Error("Subclasses must override getDefaultFoundation to return a properly configured foundation class")},t.prototype.initialSyncWithDOM=function(){},t.prototype.destroy=function(){this.foundation_.destroy()},t.prototype.listen=function(t,e,n){this.root_.addEventListener(t,e,n)},t.prototype.unlisten=function(t,e,n){this.root_.removeEventListener(t,e,n)},t.prototype.emit=function(t,e,n){var o;void 0===n&&(n=!1),"function"==typeof CustomEvent?o=new CustomEvent(t,{bubbles:n,detail:e}):(o=document.createEvent("CustomEvent")).initCustomEvent(t,n,!1,e),this.root_.dispatchEvent(o)},t}(),k={ACTIVE:"mdc-tab-indicator--active",FADE:"mdc-tab-indicator--fade",NO_TRANSITION:"mdc-tab-indicator--no-transition"},P={CONTENT_SELECTOR:".mdc-tab-indicator__content"},M=function(t){function e(n){return t.call(this,Object(o.a)(Object(o.a)({},e.defaultAdapter),n))||this}return Object(o.b)(e,t),Object.defineProperty(e,"cssClasses",{get:function(){return k},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return P},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},computeContentClientRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},setContentStyleProperty:function(){}}},enumerable:!0,configurable:!0}),e.prototype.computeContentClientRect=function(){return this.adapter_.computeContentClientRect()},e}(D),j=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(o.b)(e,t),e.prototype.activate=function(){this.adapter_.addClass(M.cssClasses.ACTIVE)},e.prototype.deactivate=function(){this.adapter_.removeClass(M.cssClasses.ACTIVE)},e}(M),B=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(o.b)(e,t),e.prototype.activate=function(t){if(t){var e=this.computeContentClientRect(),n=t.width/e.width,o=t.left-e.left;this.adapter_.addClass(M.cssClasses.NO_TRANSITION),this.adapter_.setContentStyleProperty("transform","translateX("+o+"px) scaleX("+n+")"),this.computeContentClientRect(),this.adapter_.removeClass(M.cssClasses.NO_TRANSITION),this.adapter_.addClass(M.cssClasses.ACTIVE),this.adapter_.setContentStyleProperty("transform","")}else this.adapter_.addClass(M.cssClasses.ACTIVE)},e.prototype.deactivate=function(){this.adapter_.removeClass(M.cssClasses.ACTIVE)},e}(M),F=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(o.b)(e,t),e.attachTo=function(t){return new e(t)},e.prototype.initialize=function(){this.content_=this.root_.querySelector(M.strings.CONTENT_SELECTOR)},e.prototype.computeContentClientRect=function(){return this.foundation_.computeContentClientRect()},e.prototype.getDefaultFoundation=function(){var t=this,e={addClass:function(e){return t.root_.classList.add(e)},removeClass:function(e){return t.root_.classList.remove(e)},computeContentClientRect:function(){return t.content_.getBoundingClientRect()},setContentStyleProperty:function(e,n){return t.content_.style.setProperty(e,n)}};return this.root_.classList.contains(M.cssClasses.FADE)?new j(e):new B(e)},e.prototype.activate=function(t){this.foundation_.activate(t)},e.prototype.deactivate=function(){this.foundation_.deactivate()},e}(z),N={ACTIVE:"mdc-tab--active"},H={ARIA_SELECTED:"aria-selected",CONTENT_SELECTOR:".mdc-tab__content",INTERACTED_EVENT:"MDCTab:interacted",RIPPLE_SELECTOR:".mdc-tab__ripple",TABINDEX:"tabIndex",TAB_INDICATOR_SELECTOR:".mdc-tab-indicator"},$=function(t){function e(n){var i=t.call(this,Object(o.a)(Object(o.a)({},e.defaultAdapter),n))||this;return i.focusOnActivate_=!0,i}return Object(o.b)(e,t),Object.defineProperty(e,"cssClasses",{get:function(){return N},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return H},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},setAttr:function(){},activateIndicator:function(){},deactivateIndicator:function(){},notifyInteracted:function(){},getOffsetLeft:function(){return 0},getOffsetWidth:function(){return 0},getContentOffsetLeft:function(){return 0},getContentOffsetWidth:function(){return 0},focus:function(){}}},enumerable:!0,configurable:!0}),e.prototype.handleClick=function(){this.adapter_.notifyInteracted()},e.prototype.isActive=function(){return this.adapter_.hasClass(N.ACTIVE)},e.prototype.setFocusOnActivate=function(t){this.focusOnActivate_=t},e.prototype.activate=function(t){this.adapter_.addClass(N.ACTIVE),this.adapter_.setAttr(H.ARIA_SELECTED,"true"),this.adapter_.setAttr(H.TABINDEX,"0"),this.adapter_.activateIndicator(t),this.focusOnActivate_&&this.adapter_.focus()},e.prototype.deactivate=function(){this.isActive()&&(this.adapter_.removeClass(N.ACTIVE),this.adapter_.setAttr(H.ARIA_SELECTED,"false"),this.adapter_.setAttr(H.TABINDEX,"-1"),this.adapter_.deactivateIndicator())},e.prototype.computeDimensions=function(){var t=this.adapter_.getOffsetWidth(),e=this.adapter_.getOffsetLeft(),n=this.adapter_.getContentOffsetWidth(),o=this.adapter_.getContentOffsetLeft();return{contentLeft:e+o,contentRight:e+o+n,rootLeft:e,rootRight:e+t}},e}(b),V=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(o.b)(e,t),e.attachTo=function(t){return new e(t)},e.prototype.initialize=function(t,e){void 0===t&&(t=function(t,e){return new I(t,e)}),void 0===e&&(e=function(t){return new F(t)}),this.id=this.root_.id;var n=this.root_.querySelector($.strings.RIPPLE_SELECTOR),i=Object(o.a)(Object(o.a)({},I.createAdapter(this)),{addClass:function(t){return n.classList.add(t)},removeClass:function(t){return n.classList.remove(t)},updateCssVariable:function(t,e){return n.style.setProperty(t,e)}}),r=new R(i);this.ripple_=t(this.root_,r);var a=this.root_.querySelector($.strings.TAB_INDICATOR_SELECTOR);this.tabIndicator_=e(a),this.content_=this.root_.querySelector($.strings.CONTENT_SELECTOR)},e.prototype.initialSyncWithDOM=function(){var t=this;this.handleClick_=function(){return t.foundation_.handleClick()},this.listen("click",this.handleClick_)},e.prototype.destroy=function(){this.unlisten("click",this.handleClick_),this.ripple_.destroy(),t.prototype.destroy.call(this)},e.prototype.getDefaultFoundation=function(){var t=this;return new $({setAttr:function(e,n){return t.root_.setAttribute(e,n)},addClass:function(e){return t.root_.classList.add(e)},removeClass:function(e){return t.root_.classList.remove(e)},hasClass:function(e){return t.root_.classList.contains(e)},activateIndicator:function(e){return t.tabIndicator_.activate(e)},deactivateIndicator:function(){return t.tabIndicator_.deactivate()},notifyInteracted:function(){return t.emit($.strings.INTERACTED_EVENT,{tabId:t.id},!0)},getOffsetLeft:function(){return t.root_.offsetLeft},getOffsetWidth:function(){return t.root_.offsetWidth},getContentOffsetLeft:function(){return t.content_.offsetLeft},getContentOffsetWidth:function(){return t.content_.offsetWidth},focus:function(){return t.root_.focus()}})},Object.defineProperty(e.prototype,"active",{get:function(){return this.foundation_.isActive()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"focusOnActivate",{set:function(t){this.foundation_.setFocusOnActivate(t)},enumerable:!0,configurable:!0}),e.prototype.activate=function(t){this.foundation_.activate(t)},e.prototype.deactivate=function(){this.foundation_.deactivate()},e.prototype.computeIndicatorClientRect=function(){return this.tabIndicator_.computeContentClientRect()},e.prototype.computeDimensions=function(){return this.foundation_.computeDimensions()},e.prototype.focus=function(){this.root_.focus()},e}(y),W={ARROW_LEFT_KEY:"ArrowLeft",ARROW_RIGHT_KEY:"ArrowRight",END_KEY:"End",ENTER_KEY:"Enter",HOME_KEY:"Home",SPACE_KEY:"Space",TAB_ACTIVATED_EVENT:"MDCTabBar:activated",TAB_SCROLLER_SELECTOR:".mdc-tab-scroller",TAB_SELECTOR:".mdc-tab"},U={ARROW_LEFT_KEYCODE:37,ARROW_RIGHT_KEYCODE:39,END_KEYCODE:35,ENTER_KEYCODE:13,EXTRA_SCROLL_AMOUNT:20,HOME_KEYCODE:36,SPACE_KEYCODE:32},K=new Set;K.add(W.ARROW_LEFT_KEY),K.add(W.ARROW_RIGHT_KEY),K.add(W.END_KEY),K.add(W.HOME_KEY),K.add(W.ENTER_KEY),K.add(W.SPACE_KEY);var Y=new Map;Y.set(U.ARROW_LEFT_KEYCODE,W.ARROW_LEFT_KEY),Y.set(U.ARROW_RIGHT_KEYCODE,W.ARROW_RIGHT_KEY),Y.set(U.END_KEYCODE,W.END_KEY),Y.set(U.HOME_KEYCODE,W.HOME_KEY),Y.set(U.ENTER_KEYCODE,W.ENTER_KEY),Y.set(U.SPACE_KEYCODE,W.SPACE_KEY);var q=function(t){function e(n){var i=t.call(this,Object(o.a)(Object(o.a)({},e.defaultAdapter),n))||this;return i.useAutomaticActivation_=!1,i}return Object(o.b)(e,t),Object.defineProperty(e,"strings",{get:function(){return W},enumerable:!0,configurable:!0}),Object.defineProperty(e,"numbers",{get:function(){return U},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{scrollTo:function(){},incrementScroll:function(){},getScrollPosition:function(){return 0},getScrollContentWidth:function(){return 0},getOffsetWidth:function(){return 0},isRTL:function(){return!1},setActiveTab:function(){},activateTabAtIndex:function(){},deactivateTabAtIndex:function(){},focusTabAtIndex:function(){},getTabIndicatorClientRectAtIndex:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},getTabDimensionsAtIndex:function(){return{rootLeft:0,rootRight:0,contentLeft:0,contentRight:0}},getPreviousActiveTabIndex:function(){return-1},getFocusedTabIndex:function(){return-1},getIndexOfTabById:function(){return-1},getTabListLength:function(){return 0},notifyTabActivated:function(){}}},enumerable:!0,configurable:!0}),e.prototype.setUseAutomaticActivation=function(t){this.useAutomaticActivation_=t},e.prototype.activateTab=function(t){var e,n=this.adapter_.getPreviousActiveTabIndex();this.indexIsInRange_(t)&&t!==n&&(-1!==n&&(this.adapter_.deactivateTabAtIndex(n),e=this.adapter_.getTabIndicatorClientRectAtIndex(n)),this.adapter_.activateTabAtIndex(t,e),this.scrollIntoView(t),this.adapter_.notifyTabActivated(t))},e.prototype.handleKeyDown=function(t){var e=this.getKeyFromEvent_(t);if(void 0!==e)if(this.isActivationKey_(e)||t.preventDefault(),this.useAutomaticActivation_){if(this.isActivationKey_(e))return;var n=this.determineTargetFromKey_(this.adapter_.getPreviousActiveTabIndex(),e);this.adapter_.setActiveTab(n),this.scrollIntoView(n)}else{var o=this.adapter_.getFocusedTabIndex();if(this.isActivationKey_(e))this.adapter_.setActiveTab(o);else{n=this.determineTargetFromKey_(o,e);this.adapter_.focusTabAtIndex(n),this.scrollIntoView(n)}}},e.prototype.handleTabInteraction=function(t){this.adapter_.setActiveTab(this.adapter_.getIndexOfTabById(t.detail.tabId))},e.prototype.scrollIntoView=function(t){if(this.indexIsInRange_(t))return 0===t?this.adapter_.scrollTo(0):t===this.adapter_.getTabListLength()-1?this.adapter_.scrollTo(this.adapter_.getScrollContentWidth()):this.isRTL_()?this.scrollIntoViewRTL_(t):void this.scrollIntoView_(t)},e.prototype.determineTargetFromKey_=function(t,e){var n=this.isRTL_(),o=this.adapter_.getTabListLength()-1,i=t;return e===W.END_KEY?i=o:e===W.ARROW_LEFT_KEY&&!n||e===W.ARROW_RIGHT_KEY&&n?i-=1:e===W.ARROW_RIGHT_KEY&&!n||e===W.ARROW_LEFT_KEY&&n?i+=1:i=0,i<0?i=o:i>o&&(i=0),i},e.prototype.calculateScrollIncrement_=function(t,e,n,o){var i=this.adapter_.getTabDimensionsAtIndex(e),r=i.contentLeft-n-o,a=i.contentRight-n-U.EXTRA_SCROLL_AMOUNT,s=r+U.EXTRA_SCROLL_AMOUNT;return e<t?Math.min(a,0):Math.max(s,0)},e.prototype.calculateScrollIncrementRTL_=function(t,e,n,o,i){var r=this.adapter_.getTabDimensionsAtIndex(e),a=i-r.contentLeft-n,s=i-r.contentRight-n-o+U.EXTRA_SCROLL_AMOUNT,l=a-U.EXTRA_SCROLL_AMOUNT;return e>t?Math.max(s,0):Math.min(l,0)},e.prototype.findAdjacentTabIndexClosestToEdge_=function(t,e,n,o){var i=e.rootLeft-n,r=e.rootRight-n-o,a=i+r;return i<0||a<0?t-1:r>0||a>0?t+1:-1},e.prototype.findAdjacentTabIndexClosestToEdgeRTL_=function(t,e,n,o,i){var r=i-e.rootLeft-o-n,a=i-e.rootRight-n,s=r+a;return r>0||s>0?t+1:a<0||s<0?t-1:-1},e.prototype.getKeyFromEvent_=function(t){return K.has(t.key)?t.key:Y.get(t.keyCode)},e.prototype.isActivationKey_=function(t){return t===W.SPACE_KEY||t===W.ENTER_KEY},e.prototype.indexIsInRange_=function(t){return t>=0&&t<this.adapter_.getTabListLength()},e.prototype.isRTL_=function(){return this.adapter_.isRTL()},e.prototype.scrollIntoView_=function(t){var e=this.adapter_.getScrollPosition(),n=this.adapter_.getOffsetWidth(),o=this.adapter_.getTabDimensionsAtIndex(t),i=this.findAdjacentTabIndexClosestToEdge_(t,o,e,n);if(this.indexIsInRange_(i)){var r=this.calculateScrollIncrement_(t,i,e,n);this.adapter_.incrementScroll(r)}},e.prototype.scrollIntoViewRTL_=function(t){var e=this.adapter_.getScrollPosition(),n=this.adapter_.getOffsetWidth(),o=this.adapter_.getTabDimensionsAtIndex(t),i=this.adapter_.getScrollContentWidth(),r=this.findAdjacentTabIndexClosestToEdgeRTL_(t,o,e,n,i);if(this.indexIsInRange_(r)){var a=this.calculateScrollIncrementRTL_(t,r,e,n,i);this.adapter_.incrementScroll(a)}},e}(i),X=q.strings,G=0,J=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(o.b)(e,t),e.attachTo=function(t){return new e(t)},Object.defineProperty(e.prototype,"focusOnActivate",{set:function(t){this.tabList_.forEach((function(e){return e.focusOnActivate=t}))},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"useAutomaticActivation",{set:function(t){this.foundation_.setUseAutomaticActivation(t)},enumerable:!0,configurable:!0}),e.prototype.initialize=function(t,e){void 0===t&&(t=function(t){return new V(t)}),void 0===e&&(e=function(t){return new g(t)}),this.tabList_=this.instantiateTabs_(t),this.tabScroller_=this.instantiateTabScroller_(e)},e.prototype.initialSyncWithDOM=function(){var t=this;this.handleTabInteraction_=function(e){return t.foundation_.handleTabInteraction(e)},this.handleKeyDown_=function(e){return t.foundation_.handleKeyDown(e)},this.listen($.strings.INTERACTED_EVENT,this.handleTabInteraction_),this.listen("keydown",this.handleKeyDown_);for(var e=0;e<this.tabList_.length;e++)if(this.tabList_[e].active){this.scrollIntoView(e);break}},e.prototype.destroy=function(){t.prototype.destroy.call(this),this.unlisten($.strings.INTERACTED_EVENT,this.handleTabInteraction_),this.unlisten("keydown",this.handleKeyDown_),this.tabList_.forEach((function(t){return t.destroy()})),this.tabScroller_&&this.tabScroller_.destroy()},e.prototype.getDefaultFoundation=function(){var t=this;return new q({scrollTo:function(e){return t.tabScroller_.scrollTo(e)},incrementScroll:function(e){return t.tabScroller_.incrementScroll(e)},getScrollPosition:function(){return t.tabScroller_.getScrollPosition()},getScrollContentWidth:function(){return t.tabScroller_.getScrollContentWidth()},getOffsetWidth:function(){return t.root_.offsetWidth},isRTL:function(){return"rtl"===window.getComputedStyle(t.root_).getPropertyValue("direction")},setActiveTab:function(e){return t.foundation_.activateTab(e)},activateTabAtIndex:function(e,n){return t.tabList_[e].activate(n)},deactivateTabAtIndex:function(e){return t.tabList_[e].deactivate()},focusTabAtIndex:function(e){return t.tabList_[e].focus()},getTabIndicatorClientRectAtIndex:function(e){return t.tabList_[e].computeIndicatorClientRect()},getTabDimensionsAtIndex:function(e){return t.tabList_[e].computeDimensions()},getPreviousActiveTabIndex:function(){for(var e=0;e<t.tabList_.length;e++)if(t.tabList_[e].active)return e;return-1},getFocusedTabIndex:function(){var e=t.getTabElements_(),n=document.activeElement;return e.indexOf(n)},getIndexOfTabById:function(e){for(var n=0;n<t.tabList_.length;n++)if(t.tabList_[n].id===e)return n;return-1},getTabListLength:function(){return t.tabList_.length},notifyTabActivated:function(e){return t.emit(X.TAB_ACTIVATED_EVENT,{index:e},!0)}})},e.prototype.activateTab=function(t){this.foundation_.activateTab(t)},e.prototype.scrollIntoView=function(t){this.foundation_.scrollIntoView(t)},e.prototype.getTabElements_=function(){return[].slice.call(this.root_.querySelectorAll(X.TAB_SELECTOR))},e.prototype.instantiateTabs_=function(t){return this.getTabElements_().map((function(e){return e.id=e.id||"mdc-tab-"+ ++G,t(e)}))},e.prototype.instantiateTabScroller_=function(t){var e=this.root_.querySelector(X.TAB_SCROLLER_SELECTOR);return e?t(e):null},e}(r)}}]);
//# sourceMappingURL=11.bundle.js.map