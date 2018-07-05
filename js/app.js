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
    checkCollision(this);

};

var checkCollision = function(bug) {
    // check for collision
    if (player.y + 130 >= bug.y + 90 &&
        player.x + 25 <= bug.x + 88 &&
        player.y + 70 <= bug.y + 135 &&
        player.x + 76 >= bug.x + 10) {
        console.log('Beteu!!!');
        player.lives -= 1;
        player.lives < 0 ? player.lives = 0 : false;
        player.x = 200;
        player.y = 400;
    }

    //increase score
    player.y < 50 ? player.score += 1 : false;

    // check for limits
    if (player.y < 50 || player.y > 400) {
        player.y = 400;
        console.log(player.y);
    }

    if (player.x > 410) {
        player.x = 410;
    } else if (player.x < -10) {
        player.x = -10;
    }

}

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
    // not important
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
        enemy = new Enemy(-100, initialYPosition[Math.floor(Math.random() * 3)], Math.random() * 256);
        allEnemies.push(enemy);
    };
};

// Place the player object in a variable called player
var player = new Player(200, 400, 105);

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var initialYPosition = [60, 145, 230];
var enemy = new Enemy(-100, initialYPosition[Math.floor(Math.random() * 3)], Math.random() * 256);
allEnemies.push(enemy);
increaseLevel(3);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
