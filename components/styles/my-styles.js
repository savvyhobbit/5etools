const styleElement = document.createElement("dom-module");

styleElement.innerHTML = `
  <template>
    <style>
      /*
        http://meyerweb.com/eric/tools/css/reset/ 
        v2.0 | 20110126
        License: none (public domain)
      */
      html, body, div, span, applet, object, iframe,
      h1, h2, h3, h4, h5, h6, p, blockquote, pre,
      a, abbr, acronym, address, big, cite, code,
      del, dfn, em, img, ins, kbd, q, s, samp,
      small, strike, strong, sub, sup, tt, var,
      b, u, i, center,
      dl, dt, dd, ol, ul, li,
      fieldset, form, label, legend,
      table, caption, tbody, tfoot, thead, tr, th, td,
      article, aside, canvas, details, embed, 
      figure, figcaption, footer, header, hgroup, 
      menu, nav, output, ruby, section, summary,
      time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
      }
      /* HTML5 display-role reset for older browsers */
      article, aside, details, figcaption, figure, 
      footer, header, hgroup, menu, nav, section {
        display: block;
      }
      body {
        line-height: 1;
        --mdc-theme-link: #2196f3;
      }
      ol, ul {
        list-style: none;
      }
      blockquote, q {
        quotes: none;
      }
      blockquote:before, blockquote:after,
      q:before, q:after {
        content: '';
        content: none;
      }
      table {
        border-collapse: collapse;
        border-spacing: 0;
      }
      /* Reset end */

      [hidden] {
        display: none !important;
      }
      [visible] {
        display: block !important;
      }
      .hidden-easy {
        display: none;
      }
      b {
        font-weight: bold;
      }
      body {
        min-height: var(--vh, 1vh) * 100;
        display: flex;
        flex-direction: column;
        font-family: Roboto, sans-serif;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        background-color: #fff;
        background-color: var(--mdc-theme-background, #fff);
        overflow-x: hidden;
      }
      input[type=number]::-webkit-inner-spin-button, 
      input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
      }
      .nav-button .logo {
        margin-left: 8px;
      }
      .logo {
        width: 32px;
        height: 32px;
        background-image: url("./img/android-chrome-192x192.png");
        background-size: contain;
        background-position: 50%;
        background-repeat: no-repeat;
        display: inline-block;
        vertical-align: -9px;
      }
      .logo-white {
        background-image: url("./img/logo-white-192x192.png");
      }
      .nav-button {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 57px;
      }
      .nav-button a {
        text-decoration: none;
      }
      a {
        color: var(--mdc-theme-link, #018786);
      }

      .mdc-top-app-bar--fixed-adjust {
        flex-grow: 1;
      }
      .mdc-top-app-bar__title {
        font-weight: bold;
      }

      .typography_mono {
        font-family: "Roboto Mono", monospace;
        text-transform: uppercase;
      }

      .mdc-top-app-bar {
        border-bottom: 1px solid;
        border-color: rgba(0, 0, 0, .12);
        border-color: var(--mdc-theme-text-divider-on-background, rgba(0, 0, 0, .12));
      }

      .mdc-theme--header-bg {
        background-color: var(--mdc-theme-header, #fff) !important;
      }

      .mdc-theme--on-header {
        color: var(--mdc-theme-on-header, #000) !important
      }

      .container {
        margin: 0 auto;
        padding: 0 16px;
        max-width: 100vw;
        overflow-x: hidden;
      }
      .page-title {
        font-size: 2rem;
        padding-right: 44px;
        line-height: 1.4;
        margin: 24px 0 24px;
        position: relative;
      }
      .page-title dnd-svg {
        display: inline-block;
        width: 60px;
        position: absolute;
        top: -5px;
      }
      .main.item-opened .class-icon {
        display: block;
        width: 40px;
        height: 40px;
        margin-bottom: 24px;
      }
      .main .class-icon {
        display: none;
      }
      .main.item-opened .class-icon + .page-title {
        display: inline-block;
        padding-right: 0;
      }
      .landing-page .mdc-typography--headline5 {
        color: var(--mdc-theme-primary);
      }

      .darkmode-label {
        cursor: pointer;
      }

      /* Spinner */
      .spinner,
      .spinner:after {
        border-radius: 50%;
        width: 10em;
        height: 10em;
      }
      .spinner {
        margin: 60px auto;
        font-size: 10px;
        position: relative;
        text-indent: -9999em;
        border-top: 1.1em solid rgba(255, 255, 255, 0.2);
        border-right: 1.1em solid rgba(255, 255, 255, 0.2);
        border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
        border-left: 1.1em solid var(--mdc-theme-secondary);
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-animation: load8 1.1s infinite linear;
        animation: load8 1.1s infinite linear;
        overflow: hidden;
      }
      @-webkit-keyframes load8 {
        0% {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }
      @keyframes load8 {
        0% {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }
      .hidden {
        display: none !important;
      }
      .main-spinner:not(.hidden) ~ * {
        display: none;
      }

      /* Drawer */
      .mdc-drawer__header a {
        text-decoration: none;
        outline: none !important;
      }
      .mdc-drawer__title {
        font-weight: bold;
      }
      .mdc-drawer--modal {
        border-color: rgba(0, 0, 0, .12) !important;
        border-color: var(--mdc-theme-text-divider-on-background, rgba(0,0,0,.12)) !important;
      }
      .mdc-list-divider {
        border-color: rgba(0, 0, 0, .12) !important;
        border-color: var(--mdc-theme-text-divider-on-background, rgba(0,0,0,.12)) !important;
      }
      .mdc-drawer .mdc-list-item {
        margin: 8px 0;
        border-radius: 0px;
        padding: 0 16px;
      }
      .mdc-list-item.rule-title {
        padding-left: 48px;
      }
      .rules .mdc-list-item {
        padding-left: 72px;
        margin: 0 !important;
        height: 48px;
      }
      .classes .mdc-list-item {
        padding-left: 48px;
        margin: 0 !important;
        height: 48px;
      }
      .rules-page-variant {
        padding-left: 48px !important;
      }
      .mdc-drawer__content > nav.mdc-list {
        position: relative;
      }
      .version {
        position: absolute;
        bottom: 6px;
        right: 20px;
      }

      /* Tables */
      .entry-table__scroll-wrap {
        overflow-x: scroll;
      }
      .table-wrap {
        border-radius: 4px;
        display: inline-block;
        margin-top: 8px;
        position: relative;
        width: calc(100% + 32px);
        max-width: unset;
        margin-left: -16px;
      }
      .table-wrap:before {
        content: '';
        display: block;
        width: 100%;
        position: absolute;
        height: 46px;
        background-color: var(--mdc-theme-surface);
        top: 0;
        z-index: 1;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border-bottom: 1px solid var(--mdc-theme-text-divider-on-background);
      }
      thead:last-child {
        min-width: 100%;
      }
      .table {
        font-size: 14px;
        background-color: var(--mdc-theme-surface);
        width: 100%;
      }
      .table--scroll {
        overflow-x: auto;
        overflow-y: auto;
        padding-top: 44px;
        border-radius: 4px;
        box-shadow: 0 0 0 1px var(--mdc-theme-text-divider-on-background);
        background-color: var(--mdc-theme-surface);
      }
      .table--scroll .table-row--header {
        border-bottom: none;
      }
      .table--scroll .table-row--header .table-cell {
        position: absolute;
        top: 0;
        z-index: 2;
        white-space: nowrap;
      }
      .table--scroll .table-row--header .asc .table-cell,
      .table--scroll .table-row--header .desc .table-cell {
        top: -6px;
      }
      .table-cell div {
        display: inline-block;
      }
      .table-row:not(:last-child) {
        border-bottom: 1px solid;
        border-color: var(--mdc-theme-text-divider-on-background);
      }
      .table-row:not(.table-row--header):not(.selected):hover {
        background-color: var(--mdc-theme-text-light-hover-on-background)
      }
      .table-row.selected {
        background-color: var(--mdc-theme-text-light-primary-on-background);
      }
      .table-row.selected .source {
        color: var(--mdc-theme-on-surface) !important;
      }
      .table-cell {
        padding: 12px 20px 8px;
        color: var(--mdc-theme-on-surface);
      }
      .table-cell.source {
        max-width: 70px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .table-row--header .table-cell {
        color: var(--mdc-theme-text-disabled-on-background);
        text-align: start;
        font-weight: 400;
      }
      .table-row--header .table-cell:hover {
        color: var(--mdc-theme-on-surface);
      }
      .table-cell--border {
        border-right: 1px solid;
        border-color: var(--mdc-theme-text-divider-on-background);
      }
      .table.conditions,
      .table.cults {
        min-width: 300px;
      }
      .table.spells .name {
        max-width: 84px;
      }

      .sort {
        cursor: pointer;
      }
      .sort:not(.asc):not(.desc) .table-cell {
        padding-right: 45px;
      }
      .sort.asc .table-cell:before, 
      .sort.desc .table-cell:before {
        font-family: 'Material Icons';
        position: relative;
        width: 20px;
        font-size: 18px;
        margin-right: 4px;
        top: 6px;
        display: inline-block;
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
        line-height: 1;
        letter-spacing: normal;
        text-transform: none;
        white-space: nowrap;
        word-wrap: normal;
        direction: ltr;
        -moz-font-feature-settings: 'liga';
        -moz-osx-font-smoothing: grayscale;
      }
      .sort.asc .table-cell:before {
        content: 'arrow_drop_down';
      }
      .sort.desc .table-cell:before {
        content: 'arrow_drop_up';
      }

      /* Breadcrumbs */
      .breadcrumbs {
        width: 100%;
        overflow: hidden;
      }
      .breadcrumbs__list {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
        height: 57px;
        font-size: 20px;
        padding: 0 64px;
        overflow: hidden;
      }
      .breadcrumbs__crumb {
        white-space: nowrap;
        display: flex;
        align-items: center;
      }
      .breadcrumbs__crumb span,
      .breadcrumbs__crumb a {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .breadcrumbs__crumb a {
        text-decoration: none;
        cursor: pointer;
        transition: color .2s;
      }
      .breadcrumbs__crumb a:hover {
        color: var(--mdc-theme-link, #018786);
      }

      .mdc-notched-outline__leading {
        border-color: var(--mdc-theme-primary) !important;
      }
      .mdc-notched-outline__notch {
        border-color: var(--mdc-theme-primary) !important;
      }
      .mdc-notched-outline__trailing {
        border-color: var(--mdc-theme-primary) !important;
      }
      .mdc-floating-label {
        color: var(--mdc-theme-primary) !important;
      }
      .mdc-text-field__input {
        color: var(--mdc-theme-primary) !important;
      }


      /* Filter List */
      .filter-group {
        display: flex;
        flex-wrap: wrap;
      }
      .filter-group > * {
        margin-right: 8px;
        margin-bottom: 8px;
      }
      .filter-group--buttons {
        display: flex;
      }
      .filter-group--buttons > *:not(:last-child) {
        margin-right: 8px;
      }
      .filter-menu {
        display: inline-flex;
      }
      .filter-menu .close-menu {
        position: sticky;
        top: 0;
        right: 0;
        z-index: 1;
        margin-left: 100vw;
      }
      .filter-menu .filter-button {
        font-family: Roboto, sans-serif;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        font-size: .875rem;
        line-height: 2.25rem;
        font-weight: 500;
        letter-spacing: .0892857143em;
        text-decoration: none;
        text-transform: uppercase;
        padding: 0 8px 0 8px;
        display: inline-flex;
        position: relative;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        min-width: 64px;
        height: 36px;
        border: none;
        outline: none;
        line-height: inherit;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-appearance: none;
        overflow: hidden;
        vertical-align: middle;
        border-radius: 4px;
        color: var(--mdc-theme-primary, #6200ee);
        cursor: pointer;
      }
      .filter-menu .filter-button:hover {
        background-color: rgba(0, 0, 0, .04);
      }
      .filter-menu .mdc-menu-surface {
        border: 1px solid var(--mdc-theme-text-divider-on-background);
        width: 100vw;
        overflow-x: hidden;
      }
      .filter-menu-divider {
        width: 100%;
        border-bottom: 1px solid;
        border-color: rgba(0, 0, 0, .12) !important;
        border-color: var(--mdc-theme-text-divider-on-background, rgba(0,0,0,.12)) !important;
      }
      .filter-menu-row {
        padding: 12px;
      }
      .filter-menu-row:first-of-type {
        margin-top: -44px;
      }
      .filter-menu-row__heading {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
      }
      .filter-menu-row__heading-label {
        padding-left: 4px;
      }
      .mini-view.mdc-chip-set {
        padding: 0px;
      }
      .filter-menu-grid.mdc-chip-set {
        padding: 0px;
      }
      .filter-menu-row__heading-buttons {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
      .filter-pill.mdc-fab--extended,
      .mini-pill.mdc-fab--extended {
        font-size: .7rem;
        height: 34px;
        padding: 0 10px;
        margin: 2px;
      }
      .filter-pill[state=no],
      .mini-pill[state=no],
      .filter-pill[state=no]:hover,
      .mini-pill[state=no]:hover {
        color: #fff;
        color: var(--mdc-theme-on-error, #fff) !important;
        background-color: #b00020;
        background-color: var(--mdc-theme-error, #b00020) !important;
      }
      .filter-pill[state=yes],
      .mini-pill[state=yes],
      .filter-pill[state=yes]:hover,
      .mini-pill[state=yes]:hover {
        color: #fff;
        color: var(--mdc-theme-on-secondary, #fff) !important;
        background-color: #018786;
        background-color: var(--mdc-theme-link, #018786) !important;
      }
      .filter-pill[state=ignore],
      .filter-pill[state=ignore]:hover {
        color: rgba(0, 0, 0, 0.38);
        color: var(--mdc-theme-text-disabled-on-background, rgba(0, 0, 0, 0.38)) !important;
        background-color: #fff;
        background-color: var(--mdc-theme-background, #fff) !important;
      }
      .mini-pill[state=ignore] {
        -webkit-transform: scale(0);
        transform: scale(0);
        opacity: 0;
        transition: opacity 15ms linear 150ms, -webkit-transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1), background-color 15ms linear 200ms;
        transition: opacity 15ms linear 150ms, transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1), background-color 15ms linear 200ms;
        transition: opacity 15ms linear 150ms, transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1), -webkit-transform 180ms cubic-bezier(0.4, 0, 1, 1), background-color 15ms linear 200ms
      }
      .filter-group .mdc-text-field {
        width: 100%;
        margin-right: 0;
      }


      /* Statblocks */
      .main {
        max-width: 100vw;
      }
      .main.item-opened .class-container {
        display: none;
      }
      .main:not(.item-opened) .class-page--class-container {
        display: none;
      }
      .main.item-opened #listcontainer {
        display: none;
      }
      .main.item-opened .close-item {
        display: block;
      }
      .main.item-opened .rules-wrapper {
        display: none;
      }
      .main:not(.item-opened) #rulescontent {
        display: none;
      }
      .main:not(.item-opened) .selection-wrapper {
        display: none;
      }
      .close-item {
        position: fixed;
        height: 60px;
        width: 64px;
        font-size: 44px;
        display: none;
        right: 0;
        top: -4px;
        z-index: 4;
        background: var(--mdc-theme-header);
      }
      .stats-wrapper p,
      .stats-wrapper ul {
        margin-bottom: 24px;
      }
      .stats-wrapper ul {
        padding-left: 16px;
        list-style: unset;
      }
      .stats-wrapper h5 {
        margin-top: 34px;
        display: block;
        font-size: 1.8rem;
        font-weight: normal;
        margin-bottom: 22px;
      }
      .stats-wrapper.small-font h5 {
        font-size: 1.5rem;
      }
      .stats-wrapper .prerequisite {
        font-weight: bold;
      }
      .stats-wrapper .type {
        font-weight: bold;
      }
      .stats-wrapper .source {
        display: none;
      }

      .variantrules .statsBlockHead:first-child > .stat-name {
        display: none;
      }

      ul.list-hang-notitle {
        padding-left: 0;
        list-style: none;
      }

      ul.list-hang-notitle li {
        margin-bottom: 16px;
      }

      .stat-name {
        font-weight: bold;
      }
      .explanation {
        //margin-right: -4px;
      }
      .stats-sub-header {
        font-weight: bold;
      }
      .stats-wrapper .table {
        margin-bottom: 24px;
      }

      .sourcePHB {
        color: #4a6898;
      }

      .sourceDMG {
        color: purple;
      }

      .sourceMM {
        color: green;
      }

      .sourceSCAG {
        color: #76af76;
      }

      .sourceVGM {
        color: grey;
      }

      .sourceXGE {
        color: #ba7c00;
      }

      .sourceToD {
        color: orangered;
      }

      .sourceCoS {
        color: purple;
      }

      .sourceOotA {
        color: grey;
      }

      .sourceSKT {
        color: darkcyan;
      }

      .sourcePotA {
        color: blue;
      }

      .sourceLMoP {
        color: lightgreen;
      }

      .sourceTYP {
        color: red;
      }

      .sourceEEPC {
        color: #57b6c6;
      }

      .sourceMOT {
        color: #556b2e;
      }

      .sourceBGDIA {
        color: #752418;
      }

      .sourceGGR {
        color: #bfa76c;
      }

      .sourceAI {
        color: #5baf04;
      }

      .sourceEGW {
        color: #855a6e;
      }

      .sourceERLW {
        color: #983426;
      }

      .sourceGoS {
        color: #3d695a;
      }

      .sourceMTF {
        color: #1f6e7b;
      }

      /* Collapse */
      .collapse .collapse-toggle {
        height: 48px;
        cursor: pointer;
        position: relative;
      }
      .collapse .collapse-wrapper {
        overflow: hidden;
      }
      .collapse .collapse-toggle:after {
        content: 'expand_more';
        font-family: 'Material Icons';
        top: 8px;
        position: absolute;
        font-size: 24px;
        display: block;
        right: 8px;
        transition: transform 235ms cubic-bezier(.4,0,.2,1);
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
        line-height: 1;
        letter-spacing: normal;
        text-transform: none;
        white-space: nowrap;
        word-wrap: normal;
        direction: ltr;
        -moz-font-feature-settings: 'liga';
        -moz-osx-font-smoothing: grayscale;
      }
      .collapse.open .collapse-toggle:after {
        transform: rotateZ(180deg);
      }
      .collapse.collapse--left-arrow .collapse-toggle > *:first-child {
        padding-left: 48px;
      }
      .collapse.collapse--left-arrow .collapse-toggle:after {
        left: 12px;
        top: 11px;
        right: unset;
      }
      .collapse-toggle.mdc-list-item {
        height: 46px;
      }
      .collapse-toggle:hover {
        color: var(--mdc-theme-link);
      }
      .collapse .collapse-list {
        height: auto;
        transition: margin-top 235ms cubic-bezier(.4,0,.2,1);
      }
      .collapse.open .collapse-list {
        margin-top: 0px;
        height: auto;
        transition: margin-top 235ms cubic-bezier(.4,0,.2,1);
      }
      .collapse .collapse-list.no-transition {
        transition: none !important;
      }

      /* Rules page content */
      #rulescontent {
        padding-bottom: 24px;
      }
      #rulescontent h1 {
        font-family: Roboto, sans-serif;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        font-size: 2.125rem;
        line-height: 2.5rem;
        font-weight: bold;
        letter-spacing: .0073529412em;
        text-decoration: inherit;
        text-transform: inherit;
        margin-top: 16px;
        margin-bottom: 8px;
      }
      #rulescontent h2 {
        font-family: Roboto, sans-serif;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        font-size: 1.5rem;
        line-height: 2rem;
        font-weight: bold;
        letter-spacing: normal;
        text-decoration: inherit;
        text-transform: inherit;
        margin-top: 16px;
        margin-bottom: 8px;
      }
      #rulescontent h3 {
        font-family: Roboto, sans-serif;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        font-size: 1.25rem;
        line-height: 2rem;
        font-weight: bold;
        letter-spacing: .0125em;
        text-decoration: inherit;
        text-transform: inherit;
        margin-top: 16px;
        margin-bottom: 8px;
      }
      #rulescontent h4 {
        font-family: Roboto, sans-serif;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        font-size: 1rem;
        line-height: 1.6rem;
        font-weight: bold;
        letter-spacing: .0125em;
        text-decoration: inherit;
        text-transform: inherit;
        margin-top: 16px;
        margin-bottom: 8px;
      }
      #rulescontent h5 {
        font-family: Roboto, sans-serif;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        font-size: 1rem;
        line-height: 1.6rem;
        font-weight: bold;
        letter-spacing: .0125em;
        text-decoration: inherit;
        text-transform: inherit;
        margin-top: 16px;
        margin-bottom: 8px;
      }
      #rulescontent strong {
        font-weight: bold;
      }
      #rulescontent em {
        font-style: italic;
      }
      #rulescontent ul {
        padding-left: 48px;
        list-style-type: disc;
      }
      #rulescontent ol {
        padding-left: 48px;
        list-style-type: disc;
      }
      #rulescontent p {
        margin-bottom: 8px;
      }
      #rulescontent caption {
        font-family: Roboto, sans-serif;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        font-size: .75rem;
        line-height: 1.25rem;
        font-weight: 400;
        letter-spacing: .0333333333em;
        text-decoration: inherit;
        text-transform: inherit
      }
      #rulescontent .table-scroll-wrap {
        max-width: 100%;
        overflow-x: auto;
        padding: 1px;
      }
      #rulescontent table {
        font-size: 14px;
        background-color: var(--mdc-theme-surface);
        border-radius: 4px;
        box-shadow: 0 0 0 1px var(--mdc-theme-text-divider-on-background);
        margin-top: 24px;
        margin: 0 1px 1px 0;
        display: inline-block;
      }
      #rulescontent tr:not(:last-child) {
        border-bottom: 1px solid;
        border-color: var(--mdc-theme-text-divider-on-background);
      }
      #rulescontent tbody tr:hover {
        background-color: var(--mdc-theme-text-light-hover-on-background)
      }
      #rulescontent tbody td {
        padding: 12px 20px 8px;
        color: var(--mdc-theme-on-surface);
      }
      #rulescontent thead th,
      #rulescontent thead td {
        color: var(--mdc-theme-text-disabled-on-background);
        text-align: start;
        font-weight: 400;
        padding: 12px 20px 8px;
        color: var(--mdc-theme-on-surface);
      }
      #rulescontent table caption {
        font-weight: bold;
      }
      #rulescontent thead td {
        font-weight: bold;
      }

      /* Grid Container */
      .grid-container {
        display: flex;
        flex-wrap: wrap;
      }
      .grid-item {
        width: calc(100% / 2 - 34px);
        height: 150px;
        padding: 8px;
        margin: 8px;
        border-radius: 4px;
        background-color: var(--mdc-theme-surface);
        font-size: 20px;
        cursor: pointer;
        border: 1px solid var(--mdc-theme-text-divider-on-background);
        position: relative;
        text-decoration: none;
      }
      .grid-item.grid-item--wide {
        width: 100%;
      }
      .grid-item .grid-item--text {
        position: absolute;
        bottom: 5px;
        width: 100%;
        left: 0;
        text-align: center;
        z-index: 1;
        color: var(--mdc-theme-on-surface) !important;
        height: 75px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .grid-item:hover .grid-item--image {
        transform: scale(1.8);
      }
      .grid-item .grid-item--image {
        display: block;
        transition: transform 100ms 0ms cubic-bezier(0.4, 0, 1, 1);
        fill: var(--mdc-theme-text-disabled-on-background);
        height: 107px;
        width: 80px;
        margin: 8px auto 0;
        padding-left: 2px;
      }
      .grid-item .link-grid-item--image {
        width: 100%;
        display: block;
        transition: transform 100ms 0ms cubic-bezier(0.4, 0, 1, 1);
        text-align: center;
        font-size: 44px;
        border-bottom: 3px solid var(--mdc-theme-secondary, '#018786');
        margin: auto;
        padding-bottom: 6px;
        width: 50px;
        margin-top: 25px;
      }
      .grid-item:hover .link-grid-item--image {
        transform: scale(1.4);
      }
      .grid-item.list-item--activated .grid-item--image {
        fill: var(--mdc-theme-primary, #6200ee);
      }

      .list-container {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        margin-top: 40px;
      }
      .list-item {
        cursor: pointer;
        padding-bottom: 40px;
        padding-left: 55px;
        position: relative;
        width: 80%
        transform: color .2s;
      }
      .list-item:hover {
        color: var(--mdc-theme-link);
      }
      .list-item dnd-svg {
        display: block;
        position: absolute;
        left: -2px;
        top: -2px;
        width: 42px;
      }
      .list-item--text {
        font-size: 20px;
      }
      .list-item--subtext {
        font-size: 15px;
        color: var(--lumo-contrast-50pct);
      }
      /* Tablet and up */
      @media(min-width: 921px) {
        .list-item {
          width: calc(50 - 38px);
        }
        .list-container {
          height: 120vh;
        }
      }

      .dice-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: flex-start;
        margin-top: 24px;
      }
      .dice-field-container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
      }
      .dice-list-container {
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-end;
        flex-direction: column;
      }
      .dice-field-container .mdc-text-field {
        width: calc(100% - 4px);
      }
      .dice-field-label {
        font-size: 11px;
        line-height: 1.6;
        width: 100%;
        display: none;
        margin-top: 5px;
      }
      .roll-submit {
        margin: 8px;
      }
      .mdc-text-field.error .mdc-notched-outline__trailing,
      .mdc-text-field.error .mdc-notched-outline__notch,
      .mdc-text-field.error .mdc-notched-outline__leading {
        border-color: var(--mdc-theme-error) !important;
      }
      .mdc-text-field.error .mdc-text-field__icon,
      .mdc-text-field.error label,
      .mdc-text-field.error input {
        color: var(--mdc-theme-error) !important;
      }
      .roll-clear {
        margin: 8px 0;
      }
      .dice-grid-item {
        cursor: pointer;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid var(--mdc-theme-text-divider-on-background);
        margin: 0 0 4px 4px;
        background-color: var(--mdc-theme-surface);
      }
      .dice-grid-item--image {
        stroke: var(--mdc-theme-on-surface);
        fill: var(--mdc-theme-primary);
        display: block;
        width: 30px;
        height: 30px;
      }
      .roll-total-wrap {
        width: 100%;
        border-bottom: 1px solid var(--mdc-theme-text-disabled-on-background);
        margin-bottom: 12px;
        margin-right: 4px;
      }
      .roll-total-wrap #total {
        font-weight: bold;
      }
      .dice-field-container #output {
        max-height: calc(var(--vh, 1vh) * 100 - 340px);
        overflow-y: auto;
        width: 100%;
      }
      .dice-field-container #output > div {
        margin-bottom: 8px;
      }
      .dice-field-container #output a.roll {
        cursor: pointer;
      }

      .back-to-top {
        position: fixed;
        bottom: 84px;
        right: 24px;
        border-radius: 32px;
        z-index: 2;
      }

      .mobile-clone-features .centred-col {
        display: none;
      }
      .mobile-clone-features #groupHeaders {
        display: none;
      }
      .mobile-clone-spells .pb,
      .mobile-clone-spells .features {
        display: none;
      }
      .mobile-clone-spells #nameTable {
        display: none;
      }

      .feature-link {
        color: var(--mdc-theme-link, '#018786');
      }
      .stats-wrapper a.subclass-feature-link {
        color: var(--mdc-theme-primary, '#018786') !important;
      }
      .feature-link + .feature-link:before {
        content: ', ';
        display: inline-block;
        margin-right: 4px;
      }
      .subclass-feature-link + .feature-link:before {
        color: var(--mdc-theme-primary, '#018786') !important;
      }
      .mobile-clone-spells {
        margin-top: 24px;
      }
      .class-page--class-container .table-row--header .table-cell {
        font-weight: bold;
        color: var(--mdc-theme-text-primary-on-background, '#000');
      }
      .centred-col {
        text-align: center;
      }
      #groupHeaders.table-row.table-row--header {
        border-bottom: none;
      }
      #groupHeaders .colGroupTitle {
        padding-bottom: 0 !important;
      }
      #colHeaders .features {
        text-align: center;
      }
      #classtable {
        margin-top: 40px;
      }
      #classtable .table {
        border-radius: 4px;
        box-shadow: 0 0 0 1px var(--mdc-theme-text-divider-on-background);
        background-color: var(--mdc-theme-surface);
        margin-bottom: 50px;
      }
      #classtable .table-cell {
        font-size: 16px;
      }
      #classtable .centred-col {
        text-align: center;
        min-width: 1em;
        font-size: 16px;
      }
      #classtable table .pb {
        text-align: center;
        width: 1.5em;
        padding: 1px 0.5em;
      }
      #classtable table .level {
        text-align: center;
        width: 1.5em;
      }
      #classtable .colGroupTitle {
        text-align: center;
      }
      #classtable .table {
        min-width: 100%;
      }
      .class-page--class-container table#stats table {
        width: unset;
        margin-top: 24px;
      }
      .class-page--class-container table#stats th {
        color: var(--mdc-theme-secondary, '#018786');
        padding: 12px 20px 8px;
      }
      .class-page--class-container table#stats td {
        padding: 12px 20px 8px;
      }
      .class-page--class-container #stats b {
        font-weight: bold;
      }
      .mobile-clone-spells .level.table-cell {
        padding: 8px;
      }
      #classtable .table-row--header .table-cell {
        padding: 8px 3px;
        max-width: 52px;
        font-size: 14px;
        line-height: 1.2;
      }
      .mobile-clone-spells #classtable .table-row--header .table-cell {
        padding: 8px 1px;
      }
      #subclasses {
        position: relative;
        margin-top: 6px;
        padding-top: 24px;
        padding-bottom: 26px;
        border-top: 1px solid var(--mdc-theme-text-divider-on-background, rgba(0, 0, 0, 0.12));
      }
      #subclasses .title {
        text-align: center;
        font-weight: normal;
        font-size: 16px;
        margin-bottom: 16px;
      }
      #subclasses .mdc-chip {
        margin-right: 8px;
        margin-bottom: 8px;
      }
      #subclasses .tab {
        display: none;
        position: absolute;
        bottom: 0;
        left: 0;
        height: 28px;
        width: 100vw;
        text-align: center;
        padding-bottom: 0;
        cursor: pointer;
        padding-top: 4px;
      }
      #subclasses.fixed {
        background: var(--mdc-theme-surface, #fff) !important;
        border-bottom: 1px solid var(--mdc-theme-text-divider-on-background);
        position: fixed;
        top: 40px;
        left: 0;
        overflow: hidden;
        padding: 16px 16px 24px;
        width: calc(100% - 22px);
        left: -8px;
        padding-top: 16px;
      }
      #subclasses.fixed .tab {
        display: block;
      }
      #subclasses.fixed.closed {
        height: 24px;
      }
      #subclasses.fixed.closed .title {
        margin-bottom: 60px;
      }
      #subclasses.fixed.closed .tab {
        transform: rotateZ(180deg);
        height: 58px;
      }
      #subclasses.fixed:after:hover {
        cursor: pointer;
      }
      #subclasses.fixed.closed #os-toggle {
        display: none;
      }
      #subclasses.fixed .subclass-wrapper {
        overflow-y: auto;
        max-height: 60vh;
      }
      #subclasses.fixed:not(.closed) {
        padding-bottom: 28px;
      }
      #subclasses #os-toggle {
        position: absolute;
        top: 11px;
        background: none;
        color: var(--mdc-theme-link);
      }
      #subclasses #os-toggle.os-active.mdc-chip::before {
        opacity: .12;
      }
      .mdc-chip:not(.mdc-chip--selected):not(.cf-active):not(.os-active):hover {
        color:  #000;
        background-color: #c8c8c8;
      }
      .mdc-chip:hover {
        color: var(--mdc-theme-on-primary);
        background-color: var(--mdc-theme-primary-darker);
      }
      .mdc-chip--selected {
        color: var(--mdc-theme-on-primary, #fff);
        background-color: var(--mdc-theme-primary, #6200ee);
      }
      .cf-active,
      .os-active {
        color: var(--mdc-theme-on-primary, #fff);
        background-color: var(--mdc-theme-primary, #6200ee);
      }
      
      .stats-wrapper {
        margin-top: 24px;
        font-size: 16px;
      }
      .stats-wrapper.small {
        font-size: 12.8px;
      }
      .stats-wrapper p {
        margin-top: 4px;
        margin-bottom: 16px;
      }
      .stats-wrapper i {
        font-style: italic;
      }
      .stats-wrapper .table {
        margin-bottom: 24px;
        border-radius: 4px;
        box-shadow: 0 0 0 1px var(--mdc-theme-text-divider-on-background);
      }

      .non-standard-source .stat-name {
        color: var(--mdc-theme-secondary);
      }
      .stats-wrapper .subclass-feature .stat-name {
        color: var(--mdc-theme-primary, '#6200ee');
      }
      .stats-wrapper .statsBlockHead .stat-name {
        display: block;
        font-size: 1.4rem;
        font-weight: normal;
        line-height: 1.2;
        margin: 24px 0 16px;
      }
      .stats-wrapper.small .statsBlockHead .stat-name {
        font-size: 1.6rem;
        margin: 16px 0;
      }
      .stats-wrapper .statsBlockSubHead .stat-name {
        font-size: 1.5rem;
        font-weight: normal;
        margin-bottom: 12px;
      }
      .stats-wrapper.small .statsBlockSubHead .stat-name {
        font-size: 1.2rem;
      }
      .stats-wrapper .statsInlineHead {
        margin-bottom: 16px;
      }
      .stats-wrapper .statsInlineHead .stat-name {
        font-size: 1rem;
        font-weight: bold;
        display: inline;
      }
      .stats-wrapper.small .statsInlineHead .stat-name {
        font-size: 12.8px;
      }
      .stats-wrapper .statsInlineHead .stat-name + p {
        display: inline;
      }
      .stats-wrapper .spell-ability {
        margin: 0 24px;
        display: block;
      }
      .stats-wrapper .subclass-feature,
      .stats-wrapper .class-feature {
        padding: 24px 0;
        border-top: 1px solid var(--lumo-contrast-50pct);
      }

      .stats-wrapper .subclass-feature.referenced-subclass-feature {
        padding-top: 8px;
        border-top: none;
      }
      .stats-wrapper .subclass-feature.referenced-subclass-feature .stat-name {
        font-size: 1.4rem;
      }
      .stats-wrapper.small .subclass-feature.referenced-subclass-feature .stat-name {
        font-size: 1rem;
      }
      .stats-wrapper .subclass-feature.referenced-subclass-feature .statsBlockSubHead  .stat-name {
        font-size: 1.2rem;
        font-weight: normal;
      }
      .stats-wrapper.small .subclass-feature.referenced-subclass-feature .statsBlockSubHead  .stat-name {
        font-size: 1.2rem;
      }
      .stats-wrapper a {
        color: var(--mdc-theme-link, '#018786') !important;
      }
      .stats-wrapper ul {
        padding-left: 24px;
        list-style: disc;
      }
      .stats-wrapper ul li {
        margin-bottom: 8px;
      }
      .roller {
        cursor: pointer;
        color: var(--mdc-theme-link, '#018786') !important;
      }
      /* Monster stats */
      .list.monsters .table-cell--border {
        padding-right: 18px;
      }
      #stats.monster .name {
        display: inline;
        font-weight: bold;
      }
      #stats.monster p.first {
        display: inline;
      }
      #stats.monster p.spells {
        display: block;
        margin: 0;
      }
      #stats.monster p.second {
        margin-top: 16px;
      }
      #stats.monster .stats-source {
        font-size: 14px;
      }
      #stats.monster #sizetypealignment {
        font-size: 14px;
        font-style: italic;
      }
      #stats.monster #abilitynames,
      #stats.monster #abilityscores {
        max-width: 400px;
        display: flex;
        justify-content: space-between;
        width: 100%;
      }
      #stats.monster #abilitynames div,
      #stats.monster #abilityscores div {
        width: 60px;
        display: inline-flex;
        justify-content: center;
      }
      #stats.monster #abilitynames,
      #stats.monster #abilityscores {
        justify-content: space-around;
      }
      #stats.monster #abilitynames {
        border-top: 1px solid var(--mdc-theme-text-primary-on-background, #000);
        padding-top: 4px;
        margin-top: 8px;
        font-weight: bold;
      }
      #stats.monster #abilityscores {
        border-bottom: 1px solid var(--mdc-theme-text-primary-on-background, #000);
        padding-bottom: 4px;
        margin-bottom: 8px;
        font-size: 14px;
      }
      #stats.monster #traits {
        border-top: 1px solid var(--mdc-theme-text-primary-on-background, #000);
        padding-top: 4px;
        margin-top: 8px;
      }
      #stats.monster #actions {
        border-top: 1px solid var(--mdc-theme-text-primary-on-background, #000);
        padding-top: 24px;
        margin-top: 4px;
        font-size: 24px;
      }
      #stats.monster #reactions {
        border-top: 1px solid var(--mdc-theme-text-primary-on-background, #000);
        padding-top: 24px;
        margin-top: 4px;
        font-size: 24px;
      }
      #stats.monster #legendaries {
        border-top: 1px solid var(--mdc-theme-text-primary-on-background, #000);
        padding-top: 24px;
        margin-top: 4px;
        font-size: 24px;
      }
      #stats.monster #lairactions {
        border-top: 1px solid var(--mdc-theme-text-primary-on-background, #000);
        padding-top: 24px;
        margin-top: 4px;
        font-size: 24px;
      }
      #stats.monster #regionaleffects {
        border-top: 1px solid var(--mdc-theme-text-primary-on-background, #000);
        padding-top: 24px;
        margin-top: 4px;
        font-size: 24px;
      }
      #stats.monster .trait,
      #stats.monster .action,
      #stats.monster .legendary,
      #stats.monster .lairaction,
      #stats.monster .regionaleffect,
      #stats.monster .reaction {
        margin: 16px 0;
      }

      .builder-name-wrapper {
        height: 66px;
        margin: 48px 0 24px;
        background-color: var(--mdc-theme-background, #fff) !important;
      }
      .builder-name-wrapper input {
        font-size: 26px;
      }
      .class-add-button {
        margin: 24px 0;
      }

      /* Breakpoints */
      @media(min-width: 428px) {
        #subclasses.fixed {
          width: 392px;
          padding-left: calc((100vw - 392px) / 2);
          padding-right: 1000px;
        }
      }

      /* Big Phone and up */
      @media(min-width: 599px) {
        .breadcrumbs__list {
          height: 64px;
          padding: 0;
        }
        .breadcrumbs__crumb:last-of-type {
          display: flex;
        }
        .nav-button {
          height: 64px;
        }
        .page-title {
          font-size: 2.75rem;
          line-height: 2.75rem;
          margin: 24px 0 24px;
          padding-right: 0;
        }
        .page-title dnd-svg {
          width: 75px;
          top: -10px;
        }
        .stats-wrapper .statsBlockHead .stat-name {
          font-size: 2rem;
        }
        .grid-item {
          width: calc(100% / 3 - 34px);
        }
        .dice-grid-item {
          padding: 12px;
        }
        .dice-grid-item--image {
          width: 50px;
          height: 50px;
        }
      }

      /* Tablet and up */
      @media(min-width: 921px) {
        .nav-button .logo {
          margin-left: 24px;
        }
        .close-item {
          top: 57px;
        }
        .container {
          padding: 0 80px;
        }
        .hidden-tablet-up {
          display: none !important;
        }
        .breadcrumbs__list {
          height: 64px;
          padding: 0;
        // }
        // .breadcrumbs__crumb:last-of-type::before {
        //   content: 'chevron_right';
        //   font-family: 'Material Icons';
        //   font-weight: normal;
        //   font-style: normal;
        //   font-size: 24px;
        //   line-height: 1;
        //   letter-spacing: normal;
        //   text-transform: none;
        //   white-space: nowrap;
        //   word-wrap: normal;
        //   direction: ltr;
        //   -moz-font-feature-settings: 'liga';
        //   -moz-osx-font-smoothing: grayscale;
        //   left: -2px;
        //   margin: 0 .5em;
        //   position: relative;
        //   display: inline;
        // }
        .main.item-opened #listcontainer {
          display: block !important;
        }
        .close-item {
          display: none !important;
        }
        .page-title {
          display: block;
          margin-right: 0 !important;
          margin: 24px 0 24px;
        }
        .page-title dnd-svg {
          width: 90px;
          top: -15px;
        }
        .filter-group {
          padding-top: 0;
        }
        .filter-group .mdc-text-field {
          width: unset !important;
          margin-right: 10px !important;
        }
        
        .mobile-clone-features .centred-col {
          display: table-cell;
        }
        .mobile-clone-features #groupHeaders {
          display: table-row;
        }
        .mobile-clone-spells {
          display: none;
        }
        .grid-item {
          width: calc(100% / 5 - 34px);
        }
        .table--scroll {
          min-height: 404px;
        }
        .table-wrap {
          max-width: 100%;
          width: 100%;
        }
        #subclasses.fixed {
          width: 840px;
          padding-left: calc((100vw - 840px) / 2);
          padding-right: 1000px;
        }
        .table.spells .name {
          max-width: unset;
        }
        
        .filter-menu-row:first-of-type {
          margin-top: 0;
        }
        .filter-menu .close-menu {
          display: none;
        }
        .dice-list-container {
          display: flex;
          flex-wrap: wrap;
          width: 50%;
          justify-content: flex-end;
          flex-direction: row;
        }
        .dice-grid-item {
          padding: 16px;
          margin: 4px;
        }
        .dice-grid-item--image {
          width: 100px;
          height: 100px;
        }
        .dice-field-container .mdc-text-field {
          width: unset;
        }
        .dice-field-container {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          width: 468px;
        }
        .roll-total-wrap {
          margin-top: 16px;
        }
        .dice-field-container #output {
          max-height: calc(var(--vh, 1vh) * 100 - 340px);
        }
        .main.item-opened .class-icon {
          height: 64px;
          width: 64px;
        }
      }

      /* Desktop and up */
      @media(min-width: 1321px) {
        .container {
          max-width: 1120px;
          padding-left: 320px;
        }
        .mdc-top-app-bar__row .logo {
          margin-left: 16px;
        }
        .mdc-drawer {
          display: flex;
          top: 65px;
        }
        .mdc-drawer + .mdc-drawer-scrim {
          display: none;
        }
        .mdc-drawer--modal {
          box-shadow: none;
        }
        .mdc-list {
          margin-bottom: 65px;
        }
        .hidden-desktop-up {
          display: none !important;
        }
        .breadcrumbs__list {
          justify-content: flex-start;
        }
        .breadcrumbs__crumb {
          font-size: 20px;
        }
        .grid-item {
          width: calc(100% / 6 - 34px);
        }
        #subclasses.fixed {
          padding-left: calc(((100vw - 320px - 1160px) / 2) + 320px);
          padding-right: 1000px;
          width: 1120px;
          top: 48px;
        }
        #subclasses.fixed .tab {
          padding: 0 calc(((100vw - 320px - 1160px) / 2) + 320px);
          width: 1120px;
        }
      }

      /* Below Big Phone */
      @media(max-width: 598px) {
        .hidden-big-mobile-down {
          display: none !important;
        }
      }
      /* Below Tablet */
      @media(max-width: 920px) {
        .hidden-mobile-down {
          display: none !important;
        }
        .breadcrumbs__crumb {
          flex: 1;
          justify-content: center;
          position: relative;
          left: -8px;
        }
      }
      /* Below Desktop */
      @media(max-width: 1320px) {
        .hidden-tablet-down {
          display: none !important;
        }
      }

      .mdc-drawer .list-item--activated .mdc-list-item__graphic {
        color: #6200ee
      }
      .mdc-drawer .list-item--activated {
        color: rgba(98, 0, 238, .87)
      }
      .list-item--activated {
        color: #6200ee;
        color: var(--mdc-theme-primary, #6200ee)
      }

      .mdc-list-item--selected .mdc-list-item__graphic,
      .list-item--activated .mdc-list-item__graphic {
        color: #6200ee;
        color: var(--mdc-theme-primary, #6200ee)
      }

      :not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).list-item--activated::before {
        opacity: .12
      }

      :not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).list-item--activated::before,
      :not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).list-item--activated::after {
        background-color: #6200ee
      }

      @supports not (-ms-ime-align: auto) {
        
        :not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).list-item--activated::before,
        :not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).list-item--activated::after {
          background-color: var(--mdc-theme-primary, #6200ee)
        }
      }

      :not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).list-item--activated:hover::before {
        opacity: .16
      }

      :not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).list-item--activated:not(.mdc-ripple-upgraded):focus::before,
      :not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).list-item--activated.mdc-ripple-upgraded--background-focused::before {
        transition-duration: 75ms;
        opacity: .24
      }

      :not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).list-item--activated:not(.mdc-ripple-upgraded)::after {
        transition: opacity 150ms linear
      }

      :not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).list-item--activated:not(.mdc-ripple-upgraded):active::after {
        transition-duration: 75ms;
        opacity: .24
      }

      :not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).list-item--activated.mdc-ripple-upgraded {
        --mdc-ripple-fg-opacity: 0.24
      }

      /* Fixers */
      .full-width {
        width: 100% !important;
      }
      .hidden, .disabled {
        display: none !important;
      }

      .margin-top_none {
        margin-top: 0px !important;
      }
      .margin-top_small {
        margin-top: 8px !important;
      }
      .margin-top_med {
        margin-top: 24px !important;
      }
      .margin-top_large {
        margin-top: 48px !important;
      }

      .margin-right_none {
        margin-right: 0px !important;
      }
      .margin-right_small {
        margin-right: 8px !important;
      }
      .margin-right_medl {
        margin-right: 24px !important;
      }
      .margin-right_large {
        margin-right: 48px !important;
      }

      .margin-left_none {
        margin-left: 0px !important;
      }
      .margin-left_small {
        margin-left: 8px !important;
      }
      .margin-left_med {
        margin-left: 24px !important;
      }
      .margin-left_large {
        margin-left: 48px !important;
      }

      .margin-bottom_none {
        margin-bottom: 0px !important;
      }
      .margin-bottom_small {
        margin-bottom: 8px !important;
      }
      .margin-bottom_med {
        margin-bottom: 24px !important;
      }
      .margin-bottom_large {
        margin-bottom: 48px !important;
      }

      strong {
        font-weight: bold;
      }

      em {
        font-style: italic;
      }

      .class-tabs {
        display: flex;

      }
    </style>
  </template
`;

styleElement.register("my-styles");