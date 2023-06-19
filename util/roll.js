import { timeout } from "../js/utils.js";
import droll from "../lib/droll.js";

const rollChannel = document.createElement('div');

function rollEventChannel() {
    return rollChannel;
}

const EMIT_INTERVAL = 1000;
let emitQueue;
async function emitRoll(name, roll, result) {
    if (!emitQueue) {
        emitQueue = [{name, roll, result}];
        while (emitQueue.length) {
            const emitDetails = emitQueue.shift();
            const nameOut = emitDetails.name, 
                rollOut = emitDetails.roll, 
                resultOut = emitDetails.result;
            emitRollSubmit(nameOut, rollOut, resultOut);
            await timeout(EMIT_INTERVAL);
        }
        emitQueue = null;
    } else {
        emitQueue.push({name, roll, result});
    }
}

function emitRollSubmit(name, roll, result) {
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

function rollHit(name, toHit, adv, disadv) {
    let rollResult;
    const toHitNumber = parseInt(toHit, 10);
    const toHitString = (toHitNumber > 0 ? '+' + toHitNumber : toHitNumber + '');

    if (adv || disadv) {
        const roll1 = droll.roll('1d20');
        const roll2 = droll.roll('1d20');
        const roll = adv ? Math.max(roll1.total, roll2.total) : Math.min(roll1.total, roll2.total);

        rollResult = new RollResult([roll1.total, roll2.total], toHitNumber, roll + toHitNumber);
    } else {
        rollResult = droll.roll('1d20' + toHitString);
    }

    const rollText = `1d20${toHitString}${adv ? ` (Advantage)` : ''}${disadv ? ` (Disadvantage)` : ''}`;

    emitRoll(name, rollText, rollResult);
}

class RollResult {
    constructor(rolls = [], modifier = 0, total = 0) {
        this.rolls = rolls;
        this.modifier = modifier;
        this.total = total;
    }

    toString() {
        console.error(this.rolls, this.modifier, this.total);
        if (this.rolls.length === 1 && this.modifier === 0) {
            return this.rolls[0] + '';
        }
    
        if (this.rolls.length > 1 && this.modifier === 0) {
            return this.rolls.join(' + ') + ' = ' + this.total;
        }
    
        if (this.rolls.length === 1 && this.modifier > 0) {
            return this.rolls[0] + ' + ' + this.modifier + ' = ' + this.total;
        }
    
        if (this.rolls.length > 1 && this.modifier > 0) {
            return this.rolls.join(' + ') + ' + ' + this.modifier + ' = ' + this.total;
        }
    
        if (this.rolls.length === 1 && this.modifier < 0) {
            return this.rolls[0] + ' - ' + Math.abs(this.modifier) + ' = ' + this.total;
        }
    
        if (this.rolls.length > 1 && this.modifier < 0) {
            return this.rolls.join(' + ') + ' - ' + Math.abs(this.modifier) + ' = ' + this.total;
        }
    }
}

export {
    rollEventChannel,
    rollDice,
    rollHit,
    emitRoll
};
