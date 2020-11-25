
const can = document.getElementById("canvas");

player.width = 46;
player.height = 46;

let space_shooter_image;

loadResources();

function loadResources() {
  space_shooter_image = new Image();
  space_shooter_image.src = "https://nextgennathan.files.wordpress.com/2016/01/sheet.png";
}

function mainLoop() {
	const c = can.getContext('2d');

	updateGame();
	updateBackground();
	updateEnemies();
	updatePlayer();

	updatePlayerBullets();
	updateEnemyBullets();

	checkCollisions();

	drawBackground(c);
	drawEnemies(c);
	drawPlayer(c);
	drawEnemyBullets(c);
	drawPlayerBullets(c);
	drawOverlay(c);
}


// =========== player ============

function firePlayerBullet() {
	//create a new bullet
	playerBullets.push({
		x: player.x,
		y: player.y - 5,
		width: 20,
        height: 40,
        counter: 0,
	});
}

let particles = [];
function drawPlayerExplosion(c) {
    if (player.counter === 0) {
        particles = [];  // clear any old values
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: player.x + player.width / 2,
                y: player.y + player.height / 2,
                xv: (Math.random() - 0.5) * 2.0 * 5.0,  // x velocity
                yv: (Math.random() - 0.5) * 2.0 * 5.0,  // y velocity
                age: 0,
            });
        }
    } else {
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.xv;
            p.y += p.yv;
            const v = 255 - p.age * 3;
            c.fillStyle = `rgb(${v}, ${v}, ${v})`;
            c.fillRect(p.x, p.y, 3, 3);
            p.age++;
        }
    }
}

function drawPlayer(c) {
    if (player.state == "dead") return;

    if (player.state == "hit") {
        c.drawImage(space_shooter_image, 760,192, 36,36, player.x, player.y,
            player.width, player.height);
        drawPlayerExplosion(c);
    	return;
	}

  c.drawImage(space_shooter_image, 345,75, 100,75, player.x, player.y, player.
    width, player.height)
}

function drawPlayerBullets(c) {
  const bullet_coords = {
    0: {x: 854, y: 640},  // width: 9, height: 36
    1: {x: 858, y: 0},
    2: {x: 856, y: 94},
    3: {x: 858, y: 0},
  };

	c.fillStyle = "blue";

	for (let i in playerBullets) {
        const bullet = playerBullets[i];

        const coords = bullet_coords[bullet.counter % 4];
        c.drawImage(
        space_shooter_image,
        coords.x, coords.y, 20, 5,
        bullet.x, bullet.y, bullet.width, bullet.height)
    }
}


// =========== background ============

function drawBackground(c) {
	c.fillStyle = "black";
	c.fillRect(0,0,can.width,can.height);
}


// =========== enemies ===============
function drawEnemy(c, enemy, radius) {
    if (radius <= 0) radius = 1;

    const theta = enemy.counter;
    c.save();
    c.translate(0, 30);

    // draw the background circle
    circlePath(c, enemy.x, enemy.y, radius * 2);
    c.fill();

    // draw the wavy dots
    for (let i = 0; i < 10; i++) {
        const xoff = Math.sin(toRadians(theta + i * 36 * 2)) * radius;
        const yoff = Math.sin(toRadians(theta + i * 36 * 1.5)) * radius;
        circlePath(c, enemy.x + xoff, enemy.y + yoff, 3);
        c.fillStyle = 'white';
        c.fill();
    }
    c.restore();
}

function toRadians(d) {
    return d * Math.PI * 2.0 / 360.0;
}

function circlePath(c, x, y, r) {
    c.beginPath();
    c.moveTo(x, y);
    c.arc(x, y, r, 0, Math.PI * 2);
}

function drawEnemies(c) {
    for (let i in enemies) {
        const enemy = enemies[i];
        if (enemy.state == "alive") {
            c.fillStyle = 'cyan';
            drawEnemy(c, enemy, 15);
        } else if (enemy.state == "hit") {
            c.fillStyle = 'orange';
            drawEnemy(c, enemy, enemy.shrink);
        } else if (enemy.state == "dead") {
            // this probably won't ever be called.
            c.fillStyle = 'black';
            drawEnemy(c, enemy, 15);
        }
    }
}

function createEnemyBullet(enemy) {
    return {
        x:enemy.x,
        y:enemy.y+enemy.height,
        width: 15,
        height: 40,
        counter: 0,
    }
}

function drawEnemyBullets(c) {
    const bullet_coords = {
        0: {x: 827, y: 167},
        1: {x: 812, y: 250},
        2: {x: 827, y: 127},
        3: {x: 812, y: 250},
    }

    for (let i in enemyBullets) {
        const bullet = enemyBullets[i];
        const coords = bullet_coords[bullet.counter % 4];

        c.drawImage(space_shooter_image,
            coords.x, coords.y, 16, 37,
            bullet.x, bullet.y , bullet.width, bullet.height
        );
    }
}

// =========== overlay ===============

function drawOverlay(c) {
    if (overlay.counter == -1) return;

    // fade in
    const alpha = Math.min(1, overlay.counter / 50.0);
    c.globalAlpha = alpha;

    c.save();
    c.fillStyle = "white";
    c.font = "Bold 40pt Arial";
    c.fillText(overlay.title, 140, 200);
    c.font = "14pt Arial";
    c.fillText(overlay.subtitle, 190,250);
    c.restore();
}

doSetup();
setInterval(mainLoop,1000/30);
