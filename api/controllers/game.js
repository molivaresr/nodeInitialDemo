const rollDice = () => {
    const diceOne = Math.round(Math.random() * (6-1) + 1);
    const diceTwo = Math.round(Math.random() * (6-1) + 1);
    const score = diceOne + diceTwo;
    const result = score === 7 ? 'Win' : 'Loose';
    return { diceOne, diceTwo, score, result}
}
module.exports = rollDice
