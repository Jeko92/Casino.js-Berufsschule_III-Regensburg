function playRoulette3(moneyToPlay, rounds, min, max, chosCol) {
    const MONEY_TO_PLAY = moneyToPlay;
    const ROUNDS = rounds;
    const MIN_BET = min;
    const MAX_BET = max;
    const CHOSEN_COLOR = chosCol;

    let sum = MONEY_TO_PLAY;
    let playedRounds = 0;
    let currBet = MIN_BET;
    let winRate = 0;

    if (sum < MIN_BET) {
        console.log(`Your current balance is too low (${sum}). Try next time with a minimum bet of ${MIN_BET}`);
    } else {
        for (let i = 1; i <= ROUNDS; i++) {
            let currRoundRes = winLoseChecker();
            updatePlayerBalance(currRoundRes);
            defineNextBet(currRoundRes);
            playedRounds++
            if (sum === 0) break;
        }
        if (sum > MONEY_TO_PLAY) {
            console.log(`Yay you have won!! You have played ${playedRounds} round and your current balance is ${sum.toFixed(2)} €. You multiplied your balance x${(sum / MONEY_TO_PLAY).toFixed(2)} times 🎉❤️.
            Winning rate: ${(winRate / ROUNDS * 100).toFixed(2)} %`);
            return {sum, playedRounds}
        } else if (sum > 0) {
            console.log(`Yay you have finished!!! You have played ${playedRounds} round and your current balance is ${sum.toFixed(2)} €. 🎉❤️. You lost ${MONEY_TO_PLAY - sum.toFixed(2)} €. Winning rate: ${(winRate / ROUNDS * 100).toFixed(2)} %`)
            return {sum, playedRounds}

        } else {
            console.log(`You have played ${playedRounds} rounds and your current balance is : ${sum.toFixed(2)} €. We wish you best of luck next time 🍀❤️. Winning rate: ${(winRate / ROUNDS * 100).toFixed(2)} %`);
            return {sum, playedRounds}
        }
    }

    function defineNextBet(roundResult) {
        if (roundResult === 'WIN') {
            currBet = MIN_BET;
            winRate++;
        } else {
            if (sum > 2 * currBet && MAX_BET > currBet * 2) {
                currBet = 2 * currBet;
            } else if (sum > MAX_BET && sum > 2 * currBet) {
                currBet = MAX_BET;
            } else {
                currBet = sum;
            }
        }
        return currBet
    }

    function winLoseChecker() {
        let winningColor = Math.floor(Math.random() * 37) + 1;
        //let winningColor = Math.floor(Math.random() * (37 - 19)) + 19;
         let roundColor;
        if (winningColor <= 18) roundColor = CHOSEN_COLOR
        let roundRes = roundColor === CHOSEN_COLOR ? 'WIN' : 'LOSE';
        return roundRes;
    }

    function updatePlayerBalance(roundResult) {
        roundResult === 'WIN' ? sum += currBet : sum -= currBet;
        return sum;
    }
}

let loseCounter = 0;
let statistics = 100;
let sequence_played_Rounds = 0;
playRoulette3(200, 500, 2, 100, 'black');
for (let i = 0; i < statistics; i++) {
    let result = playRoulette3(200, 500, 2, 100, 'red');
    let played_Rounds = result.playedRounds;
    if (result.sum === 0) {
        loseCounter++;
        sequence_played_Rounds += played_Rounds;

    }
}
console.log(`You lose whole your money average in a ${(loseCounter/ statistics * 100).toFixed(2)} %, when you play '500 round games' ${statistics} times`);
console.log(`In a loosing set you play average ${Math.floor(sequence_played_Rounds / loseCounter)} rounds`)

