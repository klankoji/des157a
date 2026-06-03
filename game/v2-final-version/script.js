(function () {
    'use strict';
    console.log('reading js');

    // DOM references
    const setupSection = document.querySelector('#setup');
    const gameboard = document.querySelector('#gameboard');
    const actionsSection = document.querySelector('#actions');
    const scoreSection = document.querySelector('#score');
    const startBtn = document.querySelector('#startgame');
    const rollBtn = document.querySelector('#roll');
    const passBtn = document.querySelector('#pass');
    const quitBtn = document.querySelector('#quit');
    const gameMessage = document.querySelector('#game-message');
    const die1Img = document.querySelector('#die1');
    const die2Img = document.querySelector('#die2');
    const p1Panel = document.querySelector('#player1panel');
    const p2Panel = document.querySelector('#player2panel');
    const p1ScoreEl = document.querySelector('#player1panel .total-score span');
    const p2ScoreEl = document.querySelector('#player2panel .total-score span');
    const p1NameEl = document.querySelector('#p1name');
    const p2NameEl = document.querySelector('#p2name');
    const thresholdInput = document.querySelector('#threshold');
    const thresholdDisplay = document.querySelector('#threshold-display');
    const vsComputerCheckbox = document.querySelector('#vscomputer');
    const name2Input = document.querySelector('#name2');

    // Audio files
    const sounds = {
        roll:  new Audio('audio/diceroll.mp3'),
        pass:  new Audio('audio/softclick.mp3'),
        win:   new Audio('audio/softclick.mp3'),
        snake: new Audio('audio/diceroll.mp3'),
        one:   new Audio('audio/diceroll.mp3')
    };

    // Play a sound without crashing if the file is missing
    function playSound(name) {
        try {
            sounds[name].currentTime = 0;
            sounds[name].play();
        } catch (e) {
            console.log('Sound not found: audio/' + name + '.mp3');
        }
    }

    // Game state
    const gameData = {
        dice:       ['1die.svg', '2die.svg', '3die.svg', '4die.svg', '5die.svg', '6die.svg'],
        players:    ['Player 1', 'Player 2'],
        score:      [0, 0],
        roll1:      0,
        roll2:      0,
        rollSum:    0,
        index:      0,          // 0 = player 1, 1 = player 2
        gameEnd:    30,         // win threshold
        vsComputer: false,
        turnScore:  0           // tracks points scored this turn for computer AI
    };

    // Update threshold display as slider moves
    thresholdInput.addEventListener('input', function () {
        thresholdDisplay.textContent = thresholdInput.value;
    });

    // Disable player 2 name field when vs computer is checked
    vsComputerCheckbox.addEventListener('change', function () {
        name2Input.disabled = vsComputerCheckbox.checked;
        name2Input.value = '';
        name2Input.placeholder = vsComputerCheckbox.checked ? 'Computer' : 'Enter name';
    });

    // Update score displays
    function showCurrentScore() {
        p1ScoreEl.textContent = gameData.score[0];
        p2ScoreEl.textContent = gameData.score[1];
    }

    // Highlight the active player panel
    function updateActivePanel() {
        p1Panel.classList.toggle('active', gameData.index === 0);
        p2Panel.classList.toggle('active', gameData.index === 1);
    }

    // Switch to the other player
    function switchPlayer() {
        gameData.index = gameData.index ? 0 : 1;
        gameData.turnScore = 0;
    }

    // Check if current player has won
    function checkWinningCondition() {
        if (gameData.score[gameData.index] >= gameData.gameEnd) {
            playSound('win');
            scoreSection.innerHTML = '<h2>' + gameData.players[gameData.index] +
                ' wins with ' + gameData.score[gameData.index] + ' points!</h2>';
            rollBtn.disabled = true;
            passBtn.disabled = true;
            gameMessage.textContent = 'Game over!';
            quitBtn.textContent = 'Play Again';
        } else {
            showCurrentScore();
        }
    }

    // Set up a new turn
    function setUpTurn() {
        updateActivePanel();
        showCurrentScore();
        scoreSection.innerHTML = '';
        gameMessage.textContent = gameData.players[gameData.index] + "'s turn";
        rollBtn.disabled = false;
        passBtn.disabled = true;

        if (gameData.vsComputer && gameData.index === 1) {
            rollBtn.disabled = true;
            passBtn.disabled = true;
            setTimeout(computerTurn, 1200);
        }
    }

    // Restart the dice animation
    function animateDice() {
        die1Img.classList.remove('rolling');
        die2Img.classList.remove('rolling');
        void die1Img.offsetWidth;
        void die2Img.offsetWidth;
        die1Img.classList.add('rolling');
        die2Img.classList.add('rolling');
    }

    // Roll the dice and handle the result
    function throwDice() {
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        die1Img.src = 'images/' + gameData.dice[gameData.roll1 - 1];
        die2Img.src = 'images/' + gameData.dice[gameData.roll2 - 1];
        die1Img.alt = 'Die showing ' + gameData.roll1;
        die2Img.alt = 'Die showing ' + gameData.roll2;

        animateDice();
        playSound('roll');
        rollBtn.disabled = true;
        passBtn.disabled = true;

        // Snake eyes
        if (gameData.rollSum === 2) {
            playSound('snake');
            gameData.score[gameData.index] = 0;
            gameMessage.textContent = 'Snake eyes! ' + gameData.players[gameData.index] + "'s score resets to 0.";
            showCurrentScore();
            switchPlayer();
            setTimeout(setUpTurn, 2000);

        // One die is a 1
        } else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
            playSound('one');
            switchPlayer();
            gameMessage.textContent = 'Rolled a 1 - switching to ' + gameData.players[gameData.index] + '.';
            setTimeout(setUpTurn, 2000);

        // Normal roll
        } else {
            gameData.score[gameData.index] += gameData.rollSum;
            gameData.turnScore += gameData.rollSum;
            gameMessage.textContent = gameData.players[gameData.index] + ' rolled a ' + gameData.rollSum + '!';
            rollBtn.disabled = false;
            passBtn.disabled = false;
            checkWinningCondition();
        }
    }

    // Computer AI - rolls until turn score hits 15 or close to winning
    function computerTurn() {
        if (!gameData.vsComputer || gameData.index !== 1) return;

        throwDice();

        setTimeout(function () {
            if (!gameData.vsComputer || gameData.index !== 1 || passBtn.disabled) return;

            const nearWin = gameData.score[1] >= gameData.gameEnd - 5;
            const enoughThisTurn = gameData.turnScore >= 15;

            if (nearWin || enoughThisTurn) {
                gameMessage.textContent = 'Computer passes with ' + gameData.score[1] + ' pts.';
                playSound('pass');
                setTimeout(function () {
                    switchPlayer();
                    setUpTurn();
                }, 800);
            } else {
                setTimeout(computerTurn, 1000);
            }
        }, 900);
    }

    // Start the game
    startBtn.addEventListener('click', function () {
        const name1 = document.querySelector('#name1').value.trim() || 'Player 1';
        const vsComp = vsComputerCheckbox.checked;

        gameData.players[0] = name1;
        gameData.vsComputer = vsComp;
        gameData.players[1] = vsComp ? 'Computer' : (name2Input.value.trim() || 'Player 2');

        const threshold = parseInt(thresholdInput.value);
        gameData.gameEnd = (threshold >= 10 && threshold <= 100) ? threshold : 30;

        gameData.score = [0, 0];
        gameData.turnScore = 0;
        gameData.index = Math.round(Math.random());

        p1NameEl.textContent = gameData.players[0];
        p2NameEl.textContent = gameData.players[1];

        setupSection.classList.add('hidden');
        gameboard.classList.remove('hidden');
        actionsSection.classList.remove('hidden');
        quitBtn.classList.remove('hidden');

        showCurrentScore();
        setUpTurn();
    });

    rollBtn.addEventListener('click', throwDice);

    passBtn.addEventListener('click', function () {
        playSound('pass');
        switchPlayer();
        setUpTurn();
    });

    quitBtn.addEventListener('click', function () {
        location.reload();
    });

})();