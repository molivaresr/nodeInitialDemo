const throwDices = () => {
    return Math.round(Math.random() * (6-1) + 1);
}

//Nueva Partida
const diceOne = throwDices();
const diceTwo = throwDices();

const game = diceOne + diceTwo;

console.log(diceOne);
console.log(diceTwo);
console.log(game)

if(game === 7) {
    console.log('Haz Ganado')
    // Sumar a el jugador
    // Sumar a el total de jugadas
} else console.log('No haz sacado 7');