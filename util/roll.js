import droll from "../lib/droll.js";

const rollChannel = document.createElement('div');

function rollEventChannel() {
    return rollChannel;
}

function emitRoll(name, roll, result) {
    const rollEvent = new CustomEvent("roll", {
        bubbles: true,
        composed: true,
        detail: {
            name,
            roll,
            result
        }
    });
    rollChannel.dispatchEvent(rollEvent);
}

function rollDice(name, roll) {
    let rollResult = droll.roll(roll.replace(/\s/g, ""));
    emitRoll(name, roll, rollResult);
}

export {
    rollEventChannel,
    rollDice,
    emitRoll
};
