/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// here we declaier values





let scores, roundScore, activePlayer, dice, winScore, preDice, userScore;

init();








document.querySelector('.btn-start').addEventListener('click', () => {

    let firstplayer = document.getElementById('player1').value;
    let secondPlayer = document.getElementById('player2').value;
    if (firstplayer === '' && secondPlayer === '') {
        alert('set names')
    } else {
        document.querySelector('.ruls').style.display = 'none';
        document.getElementById('name-0').textContent = firstplayer;
        document.getElementById('name-1').textContent = secondPlayer;
    }
})




userScore = document.getElementById('SetsScorse');
userScore.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        winScore = userScore.value;
        userScore.classList.toggle('trans');
    }
});



document.querySelector('.btn-roll').addEventListener('click', () => {

    // make sure the user set a score 
    if (winScore > 0) {
        // make sure the stored score is less than the winscore 
        if (scores[activePlayer] < winScore) {

            //random number 
            //floor gives a number without desimal 
            dice = Math.floor(Math.random() * 6) + 1;
            dice1 = Math.floor(Math.random() * 6) + 1;


            // display the result 
            let diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = `dice-${dice}.png`;

            let secDiceDOM = document.querySelector('.secDice');
            secDiceDOM.style.display = 'block';
            secDiceDOM.src = `dice-${dice1}.png`;

            // update the roundScore if the rolled number was not a 1 
            // and if the player rolled 6 tiwce loss entire scores 
            if (preDice === 6 && dice === 6) {
                document.getElementById('current-' + activePlayer).textContent = '0';
                document.getElementById('score-' + activePlayer).textContent = '0';
                roundScore = 0;
                scores[activePlayer] = 0;
                nextPlayer()
                console.log('works')
                    //if the rolled number was not a 1 
            } else if (dice != 1 && dice1 != 1) {
                roundScore += dice + dice1;
                document.getElementById('current-' + activePlayer).textContent = roundScore;
            } else {
                //next player
                nextPlayer()
            }
        } else {
            alert('start new game');
        }
        preDice = dice;
    } else {
        alert('set the score and hit enter');
    }


})

document.querySelector('.btn-hold').addEventListener('click', () => {
    if (scores[activePlayer] < winScore) {

        //add current to globle score 
        scores[activePlayer] += roundScore;

        // update in UI 
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];


        // check if the palyer won the game 
        if (scores[activePlayer] >= winScore) {

            document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.secDice').style.display = 'none';


            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
        } else {
            //nextplayer trun
            nextPlayer()
        }
    } else {
        document.getElementById(`current-${activePlayer}`).textContent = "0";
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = "0";
    document.getElementById('current-1').textContent = "0";

    document.querySelector(`.player-0-panel`).classList.toggle('active');
    document.querySelector(`.player-1-panel`).classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.secDice').style.display = 'none';
}


function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.secDice').style.display = 'none';

    document.getElementById('current-0').textContent = "0";
    document.getElementById('current-1').textContent = "0";
    document.getElementById('score-0').textContent = "0";
    document.getElementById('score-1').textContent = "0";
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('active');
    document.getElementById('SetsScorse').value = '';
    document.getElementById('SetsScorse').classList.remove('trans');
    document.querySelector('.ruls').style.display = '';
    document.getElementById('player1').value = '';
    document.getElementById('player2').value = ''
}


document.querySelector('.btn-new').addEventListener('click', init);