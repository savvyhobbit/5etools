const styleElement = document.createElement("dom-module");

styleElement.innerHTML = `
  <template>
    <style>
      .console-block {
        font-family: "SF Mono", "Monaco", "Andale Mono", "Lucida Console", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace;
        font-size: 12px;
        line-height: 1.4em;
      }

      .console-line {
        border-bottom: 1px solid #dddddd;
        padding-bottom: 7px;
        padding-top: 7px;
      }

      .console-item {
        display: inline;
        vertical-align: top;
        font-weight: normal;
      }

      .error {
        color: red !important;
      }
      .console-line > .console-item {
        margin-right: 8px;
      }

      .console-block input[type='checkbox'] {
        display: none;
      }

      .console-block .label-toggle {
        display: block;
        transition: all 0.25s ease-out;
      }

      .console-block .label-toggle:hover::before {
        color: #777;
      }

      .console-block .label-toggle::before {
        content: ' ';
        display: inline-block;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 5px solid currentColor;
        vertical-align: middle;
        margin-right: 4px;
        margin-top: 1px;
        transform: translateY(-2px);
        transition: transform .1s ease-out;
        color: #aaa;
      }

      .console-block .collapsible-content .content-inner {
        border-left: 1px solid #aaa;
        margin-left: 2px;
        padding-left: 6px;
      }

      .console-block .collapsible-content {
        max-height: 0px;
        overflow: hidden;
      }

      .console-block .toggle:checked+.label-toggle+.collapsible-content {
        max-height: 4000px;
      }

      .console-block .toggle:checked+.label-toggle .label-text {
        display: none;
      }

      .console-block .toggle+.label-toggle .label-text-short {
        display: none;
      }

      .console-block .toggle:checked+.label-toggle .label-text-short {
        display: inline;
      }

      .console-block .toggle:checked+.label-toggle::before {
        transform: rotate(90deg) translateX(-3px);
      }

      .console-block .toggle:checked+.label-toggle {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
      }
      .console-block .label-text,
      .console-block .label-text-short {
        font-weigt: bold;
      }
    </style>
  </template>
`;
  
styleElement.register("console-styles");