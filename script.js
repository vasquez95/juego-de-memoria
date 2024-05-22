/* contenedor tablero de juego*/
const gameBoard = document.getElementById('game-board');
/*mezcla la tarjeta*/
/*define el numero de cartas*/ 
const NUM_CARDS = 18;
/**crea un array de numeros 1 a 8 */
const cards = Array.from({ length: NUM_CARDS / 2 }, (_, i) => i + 1).flatMap(i => [i, i]);
/**mezcla cartas */
cards.sort(() => Math.random() - 0.5);

/* variable de estado de juego*/ 
/**almacena las tarjetas que voltea  */
let flippedCards = [];
/**cuenta el numero de pares encontrados */
let matchedPairs = 0;

/* crea tarjeta en el */
/** itera sobre cada numero en el array */
cards.forEach((num, i) => {
    /**crea un nuevo elemento */
    const card = document.createElement('div');
    /**añade la clase a cada tarjeta */
    card.classList.add('card');
    /**almacena el numero de la tarjeta en un atributo personalizado */
    card.dataset.num = num;
    /**añade un evento de clic a cada tarjeta  */
    card.addEventListener('click', () => flipCard(card));
    /**añade la tarjeta al tablero */
    gameBoard.appendChild(card);
});

/*funcion voltear las tarjetas */
function flipCard(card) {
    /**no se volteara mas de ods tarjetas a la vez que no se vuelva a voltear una tarjeta ya volteada */
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        /**muestra el numero de la tarjeta */
        card.textContent = card.dataset.num;
        /**añade la clase a la tarjeta  */
        card.classList.add('flipped');
        /**añade la tarjeta al array */
        flippedCards.push(card);
           /**verifica si hay dos tarjetas volteadas  */
        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

/**funcion si hay par */
function checkForMatch() {
    const [card1, card2] = flippedCards;
     /**obtiene las dos tarjetas volteadas  */
    if (card1.dataset.num === card2.dataset.num) {
        matchedPairs++;
        flippedCards = [];

        if (matchedPairs === NUM_CARDS / 2) {
            setTimeout(() => alert('¡Has ganado!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.textContent = '';
            card1.classList.remove('flipped');
            card2.textContent = '';
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}
