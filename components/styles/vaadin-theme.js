
import { registerStyles, css } from '@vaadin/vaadin-themable-mixin/register-styles.js';

registerStyles('vaadin-select', css`
    :host([mini]) {
      width: 36px;
    }
    :host([mini]) [part="value"] {
      visibility: hidden;
      padding: 0;
    }
    :host([add]) [part="toggle-button"] {
      margin-left: -10px;
    }
    :host([add][theme~="large"]) [part="toggle-button"] {
      position: relative;
      left: -2px;
      cursor: pointer;
    }
    :host([add]) [part="toggle-button"]::before {
      content: var(--lumo-icons-plus);
    }
    :host([no-animate]) {
      animation-duration: 0s !important;
    }

    :host([disabled]) .prefix {
      margin: -12px;
      color: var(--lumo-body-text-color);
    }

    :host([disabled]) [part="toggle-button"] {
      display: none;
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

  :host([theme~="large"]) [part="input-field"] {
    height: 50px;
    width: 50px;
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
  :host([disabled]) [part="value"] {
    color: var(--lumo-body-text-color);
    -webkit-text-fill-color: var(--lumo-body-text-color);
    margin-left: -16px;
  }

  :host([disabled].name) [part="value"] {
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

registerStyles('vaadin-integer-field', css`
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

registerStyles('vaadin-integer-field', css`
    :host([focused]:not([readonly])) [part="label"] {
      color: var(--mdc-theme-primary);
    }
    [part="label"] {
      color: var(--mdc-theme-primary);
    }
    [part="value"] {
      -webkit-mask-image: none;
    }
    :host([disabled]) [part="label"] {
      color: var(--mdc-theme-primary);
      -webkit-text-fill-color: var(--mdc-theme-primary);
    }
    :host([disabled]) [part="decrease-button"],
    :host([disabled]) [part="increase-button"] {
      display: none !important;
    }
  
    :host([theme="mini"]) {
      width: 80px;
      padding: 0;
      margin: -16px 8px 8px;
    }

    :host([mini-label]) [part="label"] {
      font-size: 12px;
    }
    :host([mini-ish-label]) [part="label"] {
      font-size: 13px;
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
      top: -2px;
      position: relative;
      color: var(--lumo-contrast-60pct);
      opacity: 1 !important;
    }
    :host([theme="mini"]) [part="decrease-button"]::before, 
    :host([theme="mini"]) [part="increase-button"]::before {
      margin-top: 0;
    }
    :host([theme="mini"]) .vaadin-text-field-container {
      flex-direction: column-reverse;
    }
  
    :host([theme="mini"]) [part="value"] {
      padding: 0;
      margin: 0;
      min-height: 0;
      min-width: 18px;
    }
    :host([theme="mini"]) [part="label"] {
      padding-top: 0px;
      padding-bottom: 0;
      margin: 4px auto 0;
    }


    :host([theme="stat"]) {
      width: 80px;
      padding: 0;
      margin: -16px 8px 8px;
    }
    :host([theme="stat"]) [part="decrease-button"],
    :host([theme="stat"]) [part="increase-button"] {
      width: 20px;
      height: 20px;
      background-color: transparent;
      top: -2px;
      position: relative;
    }
    :host([theme="stat"]) [part="decrease-button"]::before, 
    :host([theme="stat"]) [part="increase-button"]::before {
      margin-top: 0;
    }
    :host([theme="stat"]) .vaadin-text-field-container {
      flex-direction: column-reverse;
    }
  
    :host([theme="stat"]) [part="value"] {
      padding: 0;
      margin: 0;
      min-height: 0;
    }
    :host([theme="stat"]) [part="label"] {
      padding-top: 0px;
      padding-bottom: 0;
      margin: 4px auto 0;
    }



    :host([theme="hp"]) {
      padding: 0;
      margin: -16px 8px 8px;
      width: 6em;
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
      top: -2px;
      position: relative;
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
    :host([theme="hp"]) .vaadin-text-field-container {
      flex-direction: column-reverse;
    }
  
    :host([theme="hp"]) [part="value"] {
      padding: 0;
      margin: 0;
      min-height: 0;
    }
    :host([theme="hp"]) [part="label"] {
      padding-top: 0px;
      padding-bottom: 0;
      margin: 4px auto 0;
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

    :host([edit-mode]) [part="input-field"] {
      background-color: var(--mdc-theme-secondary-lighter);
      color: var(--mdc-theme-on-secondary);
    }
    :host([edit-mode]) [part="decrease-button"]::before,
    :host([edit-mode]) [part="increase-button"]::before {
      color: var(--mdc-theme-on-secondary);
    }
    :host([not-edit-mode]) [part="input-field"] {
      background-color: var(--mdc-theme-primary-lighter);
      color: var(--mdc-theme-on-primary);
    }
    :host([not-edit-mode]) [part="decrease-button"]::before,
    :host([not-edit-mode]) [part="increase-button"]::before {
      color: var(--mdc-theme-on-primary);
    }
`);

registerStyles('vaadin-grid', css`
  :host([theme~="no-border"]) {
    border-top: none;//3px solid var(--mdc-theme-text-divider-on-background);
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

  :host {
    touch-action: unset !important;
  }
  #scroller {
    touch-action: unset !important;
  }
  
`);

registerStyles('vaadin-grid-tree-toggle', css`
  [part~="toggle"] {
    cursor: pointer;
  }
  :host([theme~="no-children"]) [part~="toggle"]:before {
    color: var(--lumo-tint-10pct);
  }
`);

registerStyles('vaadin-grid-outer-scroller', css`
  :host([passthrough]) {
    pointer-events: unset !important;
  }
`);