(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{103:function(e,l,t){"use strict";t.r(l);var d=t(7),i=(t(63),t(70),t(111),t(118));class r extends d.a{connectedCallback(){super.connectedCallback(),Object(i.onLoad)(this.shadowRoot)}static get template(){return d.b`
      <style include="material-styles my-styles"></style>

      <div class="dice-wrapper">
        <div class="dice-field-container">
          <div class="mdc-text-field mdc-text-field--outlined mdc-text-field--with-leading-icon">
            <i class="material-icons mdc-text-field__icon mdc-theme--primary">casino</i>
            <input inputmode="numeric" type="tel" class="mdc-text-field__input roll-field" />
            <div class="mdc-notched-outline">
              <div class="mdc-notched-outline__leading"></div>
              <div class="mdc-notched-outline__notch">
                <label for="search-field" class="mdc-floating-label">Roll</label>
              </div>
              <div class="mdc-notched-outline__trailing"></div>
            </div>
          </div>
          <span class="dice-field-label"
            >Use period (.) or comma (,) to insert a "d".<br />Use space to insert a plus (+).</span
          >
          <button class="mdc-button mdc-button--raised roll-submit">
            <span class="mdc-button__label">Roll!</span>
          </button>
          <button class="mdc-button mdc-button--raised roll-clear" style="display: none;">
            <span class="mdc-button__label">Clear</span>
          </button>

          <div class="roll-total-wrap" style="display: none;">Total: <span id="total"></span></div>
          <div id="output"></div>
        </div>

        <div class="dice-list-container">
          <div class="dice-grid-item roll" data-roll="1d4">
            <dnd-svg id="d4" class="dice-grid-item--image"></dnd-svg>
          </div>
          <div class="dice-grid-item roll" data-roll="1d6">
            <dnd-svg id="d6" class="dice-grid-item--image"></dnd-svg>
          </div>
          <div class="dice-grid-item roll" data-roll="1d8">
            <dnd-svg id="d8" class="dice-grid-item--image"></dnd-svg>
          </div>
          <div class="dice-grid-item roll" data-roll="1d10">
            <dnd-svg id="d10" class="dice-grid-item--image"></dnd-svg>
          </div>
          <div class="dice-grid-item roll" data-roll="1d12">
            <dnd-svg id="d12" class="dice-grid-item--image"></dnd-svg>
          </div>
          <div class="dice-grid-item roll" data-roll="1d20">
            <dnd-svg id="d20" class="dice-grid-item--image"></dnd-svg>
          </div>
        </div>
      </div>
    `}}customElements.define("dnd-dice",r);class a extends d.a{static get template(){return d.b`
      <style include="material-styles my-styles"></style>

      <dnd-dice></dnd-dice>
    `}}customElements.define("dnd-dice-view",a)},118:function(e,l,t){"use strict";t.r(l),t.d(l,"onLoad",(function(){return s}));var d=t(1),i=t(151),r=t(148),a=t(33);function s(e){let l=e.querySelector("div#output"),t=0,s=-1,c=new i.a(e.querySelector(".mdc-text-field"));new r.a(e.querySelector(".mdc-notched-outline")),c.useNativeValidation=!1;let o=i=>{let r=a.a.roll(i.replace(/\s/g,""));if(r){let a=Object(d.parseHTML)(`<div>\n        <em><a class='roll' data-roll='${i}'>${i}</a></em> rolled for <strong>${r.total}</strong>${r.rolls.length>1?`<br>(${r.rolls.join(", ")})`:""}\n        </div>`);Object(d.jqPrepend)(l,a),l.style.display=null,u(a),t+=r.total,e.querySelector("#total").innerHTML=t,e.querySelector(".roll-total-wrap").style.display=null,e.querySelector(".roll-clear").style.display=null,c.value=""}else e.querySelector(".dice-field-container .mdc-text-field").classList.add("error")};e.querySelector(".roll-clear").addEventListener("click",d=>{d.preventDefault(),s=-1,l.innerHTML="",e.querySelector(".roll-total-wrap").style.display="none",e.querySelector(".roll-clear").style.display="none",t=0}),e.querySelector(".roll-submit").addEventListener("click",l=>{l.preventDefault(),s=-1,e.querySelector(".dice-field-container .mdc-text-field").classList.remove("error");let t=e.querySelector(".roll-field").value;t?o(t):e.querySelector(".dice-field-container .mdc-text-field").classList.add("error"),e.querySelector(".roll-field").focus()}),e.querySelector(".roll-field").addEventListener("keydown",l=>{let t=l.keyCode||l.which,d=e.querySelectorAll("#output > div").length;38===t?(l.preventDefault(),s+1<d&&(s++,c.value=e.querySelector(`#output div:eq(${s}) a.roll`).getAttribute("data-roll"))):40===t?(l.preventDefault(),s-1>-1&&(s--,c.value=e.querySelector(`#output div:eq(${s}) a.roll`).getAttribute("data-roll"))):13===t?(l.preventDefault(),e.querySelector(".roll-submit").click()):190===t||188===t?(l.preventDefault(),c.value=c.value+"d"):32!==t&&189!==t&&187!==t||(l.preventDefault(),c.value=c.value+" + ")}),e.querySelector(".roll-field").addEventListener("submit",l=>{l.preventDefault(),e.querySelector(".roll-submit").click()}),e.querySelector(".roll-field").addEventListener("textInput",e=>{var l=e.originalEvent.data;!l||"."!==l&&","!==l?!l||" "!==l&&"+"!==l||(e.preventDefault(),c.value=c.value+"+"):(e.preventDefault(),c.value=c.value+"d")}),e.querySelector(".roll-field").addEventListener("focus",l=>{e.querySelector(".dice-field-label").style.display=null}),e.querySelector(".roll-field").addEventListener("blur",l=>{e.querySelector(".dice-field-label").style.display="none"});let n=e.querySelectorAll(".roll[data-roll]");for(let e of n)u(e);function u(e){e.addEventListener("click",e=>{e.preventDefault();let l=e.target.closest(".roll").getAttribute("data-roll");l&&o(l)})}}}}]);
//# sourceMappingURL=14.bundle.js.map