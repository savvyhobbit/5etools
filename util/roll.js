import droll from "../lib/droll.js";

const rollChannel = document.createElement('div');

function rollEventChannel() {
    return rollChannel;
}

function emitRoll(name, roll, result, total, type) {
    const rollEvent = new CustomEvent("new-roll", {
        bubbles: true,
        composed: true,
        detail: {
            name,
            roll,
            result,
            total,
            type,
        }
    });
    rollChannel.dispatchEvent(rollEvent);
}

function cleanRoll(roll) {
    let adjustedRoll = roll.replace(/\s/g, "");
    adjustedRoll = adjustedRoll.split("+-").join("-").split("-+").join("-");
    return adjustedRoll;
}

function rollDice(name, rollText, type) {
    const roll = droll.roll(cleanRoll(rollText));
    let rollResult = roll.rolls.join('+');
    if (roll.modifier) {
        rollResult += roll.modifier >= 0 ? `+${roll.modifier}` : `${roll.modifier}`;
    }
    emitRoll(name, rollText, rollResult, roll.total, type);
}

function rollHit(name, toHit, adv, disadv) {
    let rollResult, total;
    const toHitNumber = parseInt(toHit, 10);
    const toHitString = (toHitNumber >= 0 ? '+' + toHitNumber : toHitNumber + '');

    if (adv || disadv) {
        const roll1 = droll.roll('1d20');
        const roll2 = droll.roll('1d20');
        const roll = adv ? Math.max(roll1.total, roll2.total) : Math.min(roll1.total, roll2.total);
        const notRoll = roll === roll1.total ? roll2.total : roll1.total;

        rollResult = `<span>${notRoll}</span>${roll}${toHitString}`; 
        total = roll + toHitNumber;
    } else {
        const roll = droll.roll('1d20' + toHitString);
        total = roll.total;
        rollResult = roll.rolls[0] + toHitString;
    }

    const rollText = `${adv ? ` (Adv.)` : ''}${disadv ? ` (Disadv.)` : ''} 1d20${toHitString}`;

    emitRoll(name, rollText, rollResult, total, "To Hit");
}

export {
    rollEventChannel,
    rollDice,
    rollHit,
    emitRoll
};
