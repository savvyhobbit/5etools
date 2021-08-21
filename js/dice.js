import { parseHTML, jqPrepend } from './utils.js';
import { MDCTextField } from "@material/textfield";
import { MDCNotchedOutline } from "@material/notched-outline";
import droll from "../lib/droll.js";

function onLoad(rootEl) {
  let outputEl = rootEl.querySelector("div#output");
  let total = 0,
  historyIndex = -1;
  
  let diceField = new MDCTextField(rootEl.querySelector(".mdc-text-field"));
  new MDCNotchedOutline(rootEl.querySelector(".mdc-notched-outline"));
  
  diceField.useNativeValidation = false;
  
  let outputRollResult = (roll) => {
    let rollResult = droll.roll(roll.replace(/\s/g, ""));
    if (rollResult) {
      let newOutput = parseHTML(`<div>
        <em><a class='roll' data-roll='${roll}'>${roll}</a></em> rolled for <strong>${rollResult.total}</strong>${rollResult.rolls.length > 1 ? `<br>(${rollResult.rolls.join(", ")})` : ''}
        </div>`)
      
      jqPrepend(outputEl, newOutput);
      outputEl.style.display = null;
      addRollHandler(newOutput);

      total += rollResult.total;
      rootEl.querySelector('#total').innerHTML = total;
      rootEl.querySelector(".roll-total-wrap").style.display = null;
      rootEl.querySelector(".roll-clear").style.display = null;
      diceField.value = "";
    } else {
      rootEl.querySelector(".dice-field-container .mdc-text-field").classList.add("error");
    }
  };
  
  rootEl.querySelector(".roll-clear").addEventListener("click", e => {
    e.preventDefault();
    
    historyIndex = -1;
    outputEl.innerHTML = '';
    rootEl.querySelector(".roll-total-wrap").style.display = 'none';
    rootEl.querySelector(".roll-clear").style.display = "none";
    total = 0;
  });
  
  rootEl.querySelector(".roll-submit").addEventListener("click", e => {
    e.preventDefault();
    
    historyIndex = -1;
    rootEl.querySelector(".dice-field-container .mdc-text-field").classList.remove("error");
    let roll = rootEl.querySelector(".roll-field").value;
    if (roll) {
      outputRollResult(roll);
    } else {
      rootEl.querySelector(".dice-field-container .mdc-text-field").classList.add("error");
    }
    rootEl.querySelector(".roll-field").focus();
  });
  
  rootEl.querySelector(".roll-field").addEventListener("keydown", e => {
    let keyCode = e.keyCode || e.which,
    historyCount = rootEl.querySelectorAll("#output > div").length;
    
    // up
    if (keyCode === 38) {
      e.preventDefault();
      if (historyIndex + 1 < historyCount) {
        historyIndex++;
        diceField.value = rootEl.querySelector(`#output div:eq(${historyIndex}) a.roll`).getAttribute("data-roll");
      }
      
      // down
    } else if (keyCode === 40) {
      e.preventDefault();
      if (historyIndex - 1 > -1) {
        historyIndex--;
        diceField.value = rootEl.querySelector(`#output div:eq(${historyIndex}) a.roll`).getAttribute("data-roll");
      }
      
      // enter
    } else if (keyCode === 13) {
      e.preventDefault();
      rootEl.querySelector(".roll-submit").click();
      
      // comma or period
    } else if (keyCode === 190 || keyCode === 188) {
      e.preventDefault();
      diceField.value = diceField.value + "d";
    } else if (keyCode === 32 || keyCode === 189 || keyCode === 187) {
      e.preventDefault();
      diceField.value = diceField.value + " + ";
    }
  });
  rootEl.querySelector(".roll-field").addEventListener("submit", e => {
    e.preventDefault();
    rootEl.querySelector(".roll-submit").click();
  })
  rootEl.querySelector(".roll-field").addEventListener("textInput", e => {
    var keyData = e.originalEvent.data;
    if (keyData && (keyData === "." || keyData === ",")) {
      e.preventDefault();
      diceField.value = diceField.value + "d";
    } else if (keyData && (keyData === " " || keyData === "+")) {
      e.preventDefault();
      diceField.value = diceField.value + "+";
    }
  });
  rootEl.querySelector(".roll-field").addEventListener("focus", e => {
    rootEl.querySelector(".dice-field-label").style.display = null;
  });
  rootEl.querySelector(".roll-field").addEventListener("blur", e => {
    rootEl.querySelector(".dice-field-label").style.display = 'none';
  });

  let rolls = rootEl.querySelectorAll(".roll[data-roll]");
  for (let roll of rolls) {
    addRollHandler(roll);
  }
  
  function addRollHandler(roll) {
    roll.addEventListener("click", e => {
      e.preventDefault();

      let roll = e.target.closest(".roll").getAttribute("data-roll");
      if (roll) {
        outputRollResult(roll);
      }
    });
  }
};

export { onLoad };