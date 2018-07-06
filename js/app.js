// Enemies our player must avoid
var Enemy = function(x, y, veloc) {
    this.x = x;
    this.y = y;
    this.speed = veloc;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x >= 505) {
        this.x = -100;
        this.y = initialYPosition[Math.floor(Math.random() * 3)];
        this.speed = Math.random() * 240 + 50;
    }

    if (player.y + 130 >= this.y + 90 &&
        player.x + 25 <= this.x + 88 &&
        player.y + 70 <= this.y + 135 &&
        player.x + 76 >= this.x + 10) {
        player.lives -= 1;
        player.lives < 0 ? player.lives = 0 : false;
        player.x = 200;
        player.y = 400;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(x, y, veloc) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.score = 0;
    this.lives = 3;
    this.x = x;
    this.y = y;
    this.speed = veloc;
    //sprite for char boy
    this.sprite = 'images/char-boy.png';
};

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {

    const maxBoardX = 400;
    const minBoardX = -10;
    const maxBoardY = 410;
    const minBoardY = 50;

    //If player die, all enemy stop
    if (this.lives == 0) {
        clearAll(true, false);
    }
    // Checar fronteiras
    if (this.y < minBoardY) {
        this.y = maxBoardX;
        this.score += 1
    }
    if (this.y > maxBoardY) {
        this.y = maxBoardX;
    }
    if (this.x > maxBoardY) {
        this.x = maxBoardY;
    } else if (this.x < minBoardX) {
        this.x = minBoardX;
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//A status bar on the top of canvas
Player.prototype.renderStatus = function() {
    ctx.clearRect(0, 20, 505, 25);
    ctx.font = "20px serif";
    // Draw scores on the top left
    ctx.fillText("Score: " + this.score, 0, 40);
    // Draw lives on the top right
    ctx.fillText("Lives: " + this.lives, 404, 40);
};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        player.x -= player.speed;
    }
    if (keyPress == 'up') {
        player.y -= player.speed - 20;
    }
    if (keyPress == 'right') {
        player.x += player.speed;
    }
    if (keyPress == 'down') {
        player.y += player.speed - 20;
    }
};

// This function instances a new object
var increaseLevel = function(numBugs) {
    //remove all the bugs
    allEnemies.length = 0

    for (var i = 0; i < numBugs; i++) {
        enemy = new Enemy(-100, initialYPosition[Math.floor(Math.random() * 3)], Math.random() * 256 + 40);
        allEnemies.push(enemy);
    };
};

// collectible class items on screen
function Collectible(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Key.png';
};

Collectible.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Collectible.prototype.update = function() {
    collect(this);
}

function collect(coleta){

    if (
        (player.y <= coleta.y && player.y >= coleta.y) &&
        (player.x <= coleta.x && player.x >= coleta.x)) {
        coleta.x = initialXPosition[Math.floor(Math.random() * 5)];
        coleta.y = initialYPosition[Math.floor(Math.random() * 3)];

        // ememies go to beginning X position
        (function() {
            allEnemies.pop();
            if (allEnemies.length == 0) {
                clearAll(false, true);
            }
        }());
    }
}

// Clear All
function clearAll(stop, removeKey) {
    // Para os carrinhos e os organiza
    if (stop) {
        for (var i = 0; i < allEnemies.length; i++) {
            allEnemies[i].x = 0;
            allEnemies[i].y = initialYPosition[i];
            allEnemies[i].speed = 0;
        }
        return `Cars stoped`;

    }
    // Remove a chave
    else if (removeKey) {
        allCollectible.pop();
        return `Remove Key`;
    }

}

// Place the player object in a variable called player
let player = new Player(200, 400, 105);

// Place all enemy objects in an array called allEnemies
let allEnemies = [];
let allCollectible = [];
const initialYPosition = [60, 145, 230];
const initialXPosition = [-10, 95, 200, 305, 410];
let enemy = new Enemy(-100, initialYPosition[Math.floor(Math.random() * 3)],
    initialXPosition[Math.floor(Math.random() * 4)]);
let key = new Collectible(initialXPosition[Math.floor(Math.random() * 5)],
    initialYPosition[Math.floor(Math.random() * 3)]);
allCollectible.push(key);
increaseLevel(5);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
