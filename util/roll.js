import droll from "../lib/droll.js";

window.rollDice = rollDice;

const rollChannel = document.createElement('div');

function rollEventChannel() {
    return rollChannel;
}

function emitRoll(name, roll, result, total, type, doubleForCrit, isCrit, adv, disadv, doubleAdv, toHit, critOn, rollTextPlain, rolls) {
    const rollEvent = new CustomEvent("new-roll", {
        bubbles: true,
        composed: true,
        detail: {
            name,
            roll: `${roll}<div class="tooltip">${roll}</div>`,
            result: `${result}<div class="tooltip">${result}</div>`,
            total,
            type,
            isCrit,
            adv,
            disadv,
            doubleAdv,
            critOn,
            rollTextPlain: rollTextPlain || roll,
            toHit,
            doubleForCrit,
            rolls
        }
    });
    rollChannel.dispatchEvent(rollEvent);
}

function cleanRoll(roll) {
    let adjustedRoll = roll.replace(/\s/g, "");
    adjustedRoll = adjustedRoll.split("+-").join("-").split("-+").join("-");
    return adjustedRoll;
}

function rollMultipleDice(name, rolls) {
    let total = 0,
        allRolls = [];
    for (let roll of rolls) {
        const result = droll.roll(cleanRoll(roll));
        total += result.total;
        allRolls = allRolls.concat(result.rolls);
    }
    emitRoll(name, rolls.join('+'), allRolls.join('+'), total, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, rolls);
}

function rollDice(name, rollText, type, doubleForCrit) {
    const roll = droll.roll(cleanRoll(rollText));
    let rollResult = doubleForCrit ? `2(${roll.rolls.join('+')})`: roll.rolls.join('+');
    if (roll.modifier) {
        rollResult += roll.modifier >= 0 ? `+${roll.modifier}` : `${roll.modifier}`;
    }
    const total = doubleForCrit ? roll.rolls.reduce((total, roll) => total + (2 * roll), 0) + roll.modifier : roll.total;
    emitRoll(name, rollText, rollResult, total, type, doubleForCrit);
}

function rerollDice(rollResult) {
    if (rollResult.type === "To Hit") {
        rollHit(rollResult.name, rollResult.toHit, rollResult.adv, rollResult.disadv, rollResult.doubleAdv, rollResult.critOn);
    } else if (rollResult.rollTextPlain.split('d').length > 2){
        rollMultipleDice(rollResult.name, rollResult.rolls);
    } else {
        rollDice(rollResult.name, rollResult.rollTextPlain, rollResult.type, rollResult.doubleForCrit);
    }
}

function rollHit(name, toHit, adv, disadv, doubleAdv, critOn = 20) {
    let rollResult, total, isCrit;
    const toHitNumber = parseInt(toHit, 10);
    const toHitString = (toHitNumber >= 0 ? '+' + toHitNumber : toHitNumber + '');

    if (adv || disadv) {
        const roll1 = droll.roll('1d20').total;
        let roll2 = droll.roll('1d20').total;
        let roll3, notRoll2
        if (adv && doubleAdv) {
            roll3 = droll.roll('1d20').total;
            roll2 = Math.max(roll2, roll3);
            notRoll2 = Math.min(roll2, roll3);
        }
        const roll = adv ? Math.max(roll1, roll2) : Math.min(roll1, roll2);
        const notRoll = roll === roll1 ? roll2 : roll1;

        rollResult = `<span>${notRoll}</span>${doubleAdv ? `<span>${notRoll2}</span>` : ''}${roll}${toHitString}`; 
        total = roll + toHitNumber;
        isCrit = roll >= critOn;
    } else {
        const roll = droll.roll('1d20' + toHitString);
        total = roll.total;
        rollResult = roll.rolls[0] + toHitString;
        isCrit = roll.rolls[0] >= critOn;
    }

    const rollText = `${doubleAdv ? '<span>Double Advantage</span>' : ''}${adv && !doubleAdv ? ` <span>Advantage</span>` : ''}${disadv ? `<span>Disadvantage</span>` : ''} 1d20${toHitString}`;

    emitRoll(name, rollText, rollResult, total, "To Hit", undefined, isCrit, adv, disadv, doubleAdv, toHit, critOn);

    return isCrit
}

export {
    rollEventChannel,
    rollDice,
    rollMultipleDice,
    rollHit,
    rerollDice,
    emitRoll,
};
