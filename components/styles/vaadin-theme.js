
import { registerStyles, css } from '@vaadin/vaadin-themable-mixin/register-styles.js';

registerStyles('vaadin-select', css`
    [part='label'] {
      color: var(--mdc-theme-primary) !important;
      -webkit-text-fill-color: unset !important;
    }

    :host([mini]) {
      width: 36px;
    }
    :host([mini]) [part="input-field"] ::slotted(*) {
      visibility: hidden;
      padding: 0;
    }

    :host([add-button]) [part="toggle-button"] {
      position: relative;
      left: -2px;
      cursor: pointer;
    }
    :host([add-button]) [part="input-field"] {
      height: 50px;
      width: 50px;
    }
    :host([add-button]) ::slotted([slot='value']) {
      visibility: hidden;
    }
    :host([add-button]) [class$='container'] {
      width: unset;
    }

    :host([tiny]) {
      height: 20px;
    }
    :host([tiny])::before {
      content: unset;
    }
    :host([tiny]) [part="toggle-button"] {
      font-size: 18px;
      margin-left: -11px !important;
    }
    :host([tiny]) [part="input-field"] {
      width: 20px;
      height: 20px;
    }

    :host([add-button]) [part="toggle-button"],
    :host([add]) [part="toggle-button"] {
      margin-left: -10px;
    }
    :host([add-button]) [part="toggle-button"]::before,
    :host([add]) [part="toggle-button"]::before {
      content: var(--lumo-icons-plus);
    }

    :host([disabled]) {
      background-color: transparent;
    }
    :host([disabled]) .prefix {
      margin: -12px;
      color: var(--lumo-body-text-color);
    }
    :host([disabled]) [part="toggle-button"] {
      display: none;
    }
    :host([disabled]) [part='input-field'] ::slotted(*) {
      color: inherit;
      -webkit-text-fill-color: unset;
    }
`);

registerStyles('vaadin-select-text-field', css`
  [part="label"] {
    color: var(--mdc-theme-primary);
  }

  :host([disabled]) [part="label"] {
    color: var(--mdc-theme-primary);;
    -webkit-text-fill-color: var(--mdc-theme-primary);
    padding-bottom: 0px;
    margin-bottom: -4px;
  }

  :host([disabled]) [part="input-field"] {
    background-color: transparent;
  }
  :host([disabled]) [part="input-field"] ::slotted(*) {
    color: var(--lumo-body-text-color);
    -webkit-text-fill-color: unset;
    position: relative;
    left: -12px;
  }
`);

registerStyles('vaadin-text-field', css`
  :host([disabled]) [part="input-field"] {
    background-color: transparent;
  }
  :host([disabled]) [part='input-field'] ::slotted(*) {
    color: var(--lumo-body-text-color);
    -webkit-text-fill-color: var(--lumo-body-text-color);
    margin-left: -16px;
  }
  :host([disabled].name) [part='input-field'] ::slotted(*) {
    font-size: 32px;
    font-weight: normal;
  }

  :host([theme~="label--secondary"]) [part="label"] {
    color: var(--mdc-theme-primary);
  }
`);

registerStyles('vaadin-text-area', css`
  :host([theme~="label--secondary"]) [part="label"] {
    color: var(--mdc-theme-primary);
  }
`);

registerStyles('vaadin-number-field', css`
  :host([theme~="label--secondary"]) [part="label"] {
    color: var(--mdc-theme-primary);
  }
`);

registerStyles('vaadin-select-overlay', css`
    :host {
      animation-duration: 0s !important;
    }
    :host [part="backdrop"] {
      opacity: 1 !important;
    }
`);

registerStyles('vaadin-dialog-overlay', css`
    [part="backdrop"] {
      background-color: var(--lumo-shade-70pct);
    }
`);

registerStyles('vaadin-list-box', css`
    [part="items"] ::slotted([focus-ring]:not([disabled])) {
      box-shadow: unset !important;
    }
`);

registerStyles('vaadin-input-container', css`
  :host([disabled]) {
    background-color: transparent;
  }
`);

registerStyles('vaadin-integer-field', css`
    :host([disabled]) ::slotted(label) {
      color: var(--mdc-theme-primary);
      -webkit-text-fill-color: var(--mdc-theme-primary);
    }
    :host([disabled]) [part="input-field"] {
      background-color: transparent;
    }
    :host([disabled]) [part='input-field'] ::slotted(input) {
      color: var(--mdc-theme-on-surface);
      -webkit-text-fill-color: color: var(--mdc-theme-on-surface);
    }
    :host([disabled]) [part="decrease-button"],
    :host([disabled]) [part="increase-button"] {
      display: none !important;
    }

    :host([theme~="label--secondary"]) [part="label"] {
      color: var(--mdc-theme-primary);
    }
  
    :host([mini-label]) ::slotted(label) {
      font-size: 12px;
    }
    :host([mini-ish-label]) ::slotted(label) {
      font-size: 13px;
    }

    :host([theme="mini"]) {
      width: 80px;
      padding: 0;
      margin: -16px 8px 7px;
    }
    @media(min-width: 920px) {
      :host([theme="mini"]) {
        width: 80px;
      }
    }
    :host([theme="mini"]) [part="decrease-button"],
    :host([theme="mini"]) [part="increase-button"] {
      width: 20px;
      height: 20px;
      background-color: transparent;
      position: relative;
      color: var(--lumo-contrast-60pct);
      opacity: 1 !important;
    }
    :host([theme="mini"]) [part="decrease-button"]::before, 
    :host([theme="mini"]) [part="increase-button"]::before {
      margin-top: 0;
    }
    :host([theme="mini"]) .vaadin-field-container {
      flex-direction: column-reverse;
    }
    :host([theme="mini"]) [part="label"] {
      padding: 0;
      width: 100%;
      -webkit-mask-image: none;
    }
    :host([theme="mini"]) ::slotted(input) {
      padding: 0;
      margin: 0;
      min-height: 0;
      min-width: 18px;
      -webkit-mask-image: none;
    }
    :host([no-transparent]) ::slotted(input) {
      -webkit-mask-image: none;
    }
    :host([theme="mini"]) ::slotted(label) {
      padding-top: 0px;
      padding-bottom: 1px;
      margin: 4px auto 0;
      color: var(--mdc-theme-primary);
      display: flex;
      justify-content: center;
    }
    :host([padded]) [part='input-field'] {
      padding: 8px 4px;
    }


    :host([theme="hp"]) {
      padding: 0;
      margin: -4px 8px 8px;
      width: 5em;
    }
    @media(min-width: 337px) {
      :host([theme="hp"]) {
        width: 6em;
      }
    }
    @media(min-width: 361px) {
      :host([theme="hp"]) {
        width: 7em;
      }
    }
    @media(min-width: 390px) {
      :host([theme="hp"]) {
        width: 8em;
      }
    }
    :host([theme="hp"]) [part="decrease-button"],
    :host([theme="hp"]) [part="increase-button"] {
      width: 20px;
      background-color: transparent;
      font-size: 20px;
      height: 100%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    :host([theme="hp"]) [part="decrease-button"]::before, 
    :host([theme="hp"]) [part="increase-button"]::before {
      margin-top: 0;
    }
    :host([theme="hp"]) .vaadin-field-container {
      flex-direction: column-reverse;
    }
    :host([theme="hp"]) [part="label"] {
      padding: 0px;
      margin: 4px auto 0;
      justify-content: center;
      display: flex;
      width: 100%;
    }
    :host([theme="hp"]) ::slotted(label) {
      color: var(--mdc-theme-primary);
      display: flex;
      justify-content: center;
    }
    :host([theme="hp"]) [part="input-field"] {
      margin-bottom: 20px;
      margin-top: 24px;
      font-size: 30px;
      height: 78px;
      background: transparent !important;
    }
    :host([theme="hp"]) [part="input-field"]::after {
      display: none;
    }
    :host([theme="hp"]) ::slotted(input) {
      -webkit-mask-image: none;
      padding: 0;
    }
`);

registerStyles('vaadin-grid', css`
  :host([theme~="no-border"]) {
    border-top: none;
  }
  [part~="cell"]:not([part~="details-cell"]) {
    align-items: flex-start;
  }
  :host([theme~="no-row-padding"]) [part~="cell"] ::slotted(vaadin-grid-cell-content) {
    padding: 0;
  }
  :host([theme~="no-row-padding"]) [part~="cell"] {
    min-height: 2px;
  }

  :host([theme~="hover"]) [part~="row"]:hover {
    color: var(--mdc-theme-primary);
  }

  :host([theme~="shaded"][overflow~='right']) #table:after {
    content: "";
    height: 100%;
    width: var(--grid-shade-spread);
    position: fixed;
    right: 0px;
    background: linear-gradient(90deg, rgba(0,0,0,0) 0%, var(--grid-shade-color) 90%);
  }
  :host([theme~="shaded"][overflow~='left']) #table:before {
    content: "";
    height: 100%;
    width: var(--grid-shade-spread);
    position: fixed;
    left: 175px;
    pointer-events: none;
    z-index: 1;
    background: linear-gradient(270deg, rgba(0,0,0,0) 0%, var(--grid-shade-color) 90%);
  }
  :host([theme~="shaded"][overflow~='bottom']) #scroller:after {
    content: "";
    height: var(--grid-shade-spread);
    width: 100%;
    left: 175px;
    position: fixed;
    bottom: 0px;
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, var(--grid-shade-color) 90%);
  }
  :host([theme~="shaded"][overflow~='top']) #scroller:before {
    content: "";
    height: var(--grid-shade-spread);
    width: 100%;
    position: fixed;
    top: 56px;
    left: 175px;
    pointer-events: none;
    z-index: 1;
    background: linear-gradient(0deg, rgba(0,0,0,0) 0%, var(--grid-shade-color) 90%);
  }
  :host([theme~="shaded"][overflow~='left'][first-col-width='300px']) #table:before {
    left: 300px;
  }
  :host([theme~="shaded"][overflow~='top'][first-col-width='300px']) #scroller:before {
    left: 300px;
  }
  :host([theme~="shaded"][overflow~='bottom'][first-col-width='300px']) #scroller:after {
    left: 300px;
  }
  
  :host([theme~="shaded"]) [part='row']:last-child [part~='header-cell'] {
    border-bottom-color: var(--_lumo-grid-border-color) !important;
  }
  :host([theme~="shaded"]) [part~='cell'][last-frozen]:not([part~='details-cell']) {
    border-right-color: var(--_lumo-grid-border-color) !important;
  }
  :host([theme~="shaded"]) {
    overflow: hidden;
  }
`);