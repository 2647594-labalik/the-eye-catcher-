let state = 'start';
let duration = 20;
let startTime;
let score = 0;
let ghost;
let spawnEvery = 60;
function spawnGhost() {
  ghost = { x: random(40, width - 40), y: random(40, height - 40) };
}



function drawGhost(x, y) {
  noStroke();
  fill("#d9ef34");
  ellipse(x, y, 60, 60);

  fill(20);
  ellipse(x - 12, y - 5, 10);
  ellipse(x + 12, y - 5, 10);
}

// FLYING EYEBALL CATCHER - Simple Custom p5.js Game

let gameState = 'START'; // 'START', 'PLAY', 'GAMEOVER

// 1. YOUR OWN RULES: 20-second timer, jump speed, size, points
let timer = 20;
let eyeX, eyeY;
let eyeSize = 50; 
let jumpTimer = 0;
let jumpInterval = 40; // Jumps every 40 frames (~0.6s)

function setup() {
  createCanvas(600, 400);
  
  // 2. YOUR OWN FONT
  textFont('Trebuchet MS');
  
  resetTarget();
}

function draw() {
  // 3. YOUR OWN SCENE & COLORS: Eerie Graveyard with Blood-Red Moon
  background(20, 10, 30); // Deep night sky

  // Draw Stars
  fill(255, 255, 200);
  noStroke();
  ellipse(80, 50, 3, 3);
  ellipse(180, 80, 2, 2);
  ellipse(320, 40, 3, 3);
  ellipse(450, 70, 2, 2);
  ellipse(540, 30, 3, 3);

  // Blood-Red Moon
  fill(200, 30, 30);
  stroke(100, 10, 10);
  strokeWeight(3);
  ellipse(500, 90, 90, 90);

  // Graveyard Ground
  fill(15, 35, 20);
  noStroke();
  rect(0, 300, width, 100);

  // Tombstones (rect with arc top)
  fill(80, 85, 95);
  stroke(40);
  strokeWeight(2);
  rect(100, 260, 40, 50);
  arc(120, 260, 40, 30, PI, 0);
  rect(320, 250, 45, 60);
  arc(342, 250, 45, 35, PI, 0);

  // GAME STATES
  if (gameState === 'START') {
    // 4. YOUR OWN STORY & START SCREEN
    fill(0, 190);
    rect(0, 0, width, height);

    textAlign(CENTER, CENTER);
    fill(255, 60, 60);
    textSize(32);
    text("FLYING EYEBALL CATCHER", width / 2, 120);

    fill(220);
    textSize(16);
    text("Catch the spooky eyeballs floating over the graveyard\nbefore the blood moon sets!", width / 2, 190);

    fill(100, 255, 100);
    textSize(18);
    text("[ CLICK ANYWHERE TO START ]", width / 2, 270);

  } else if (gameState === 'PLAY') {
    // Timer Countdown
    if (frameCount % 60 === 0 && timer > 0) {
      timer--;
    }
    if (timer <= 0) {
      gameState = 'GAMEOVER';
    }

    // Auto-Jump Timer
    jumpTimer++;
    if (jumpTimer >= jumpInterval) {
      resetTarget();
    }

    // 5. YOUR OWN ENEMY: Draw Eyeball Creature
    drawEyeball(eyeX, eyeY);

    // Score & Timer Display
    fill(255);
    noStroke();
    textSize(18);
    textAlign(LEFT, TOP);
    text("Score: " + score, 20, 20);
    textAlign(RIGHT, TOP);
    text("Time: " + timer + "s", width - 20, 20);

  } else if (gameState === 'GAMEOVER') {
    fill(0, 200);
    rect(0, 0, width, height);

    textAlign(CENTER, CENTER);
    fill(255, 80, 80);
    textSize(36);
    text("TIME'S UP!", width / 2, 140);

    fill(255);
    textSize(22);
    text("Eyeballs Caught: " + score, width / 2, 200);

    fill(100, 255, 100);
    textSize(18);
    text("[ CLICK TO PLAY AGAIN ]", width / 2, 270);
  }
}

// Custom Creature: Flying Eyeball
function drawEyeball(x, y) {
  // Outer Eyeball
  fill(240);
  stroke(100, 0, 0);
  strokeWeight(3);
  ellipse(x, y, eyeSize, eyeSize);

  // Red Veins
  stroke(200, 20, 20);
  strokeWeight(2);
  line(x - 20, y - 5, x - 10, y);
  line(x + 20, y + 5, x + 10, y);

  // Iris & Pupil
  fill(20, 180, 200); // Electric Cyan
  noStroke();
  ellipse(x, y, 24, 24);
  fill(0);
  ellipse(x, y, 10, 10);

  // Glint
  fill(255);
  ellipse(x - 4, y - 4, 5, 5);
}

function resetTarget() {
  eyeX = random(60, width - 60);
  eyeY = random(60, 240);
  jumpTimer = 0;
}

function mousePressed() {
  if (gameState === 'START' || gameState === 'GAMEOVER') {
    score = 0;
    timer = 20;
    resetTarget();
    gameState = 'PLAY';
    return;
  }

  if (gameState === 'PLAY') {
    // Check if clicked on the eyeball
    let d = dist(mouseX, mouseY, eyeX, eyeY);
    if (d < eyeSize / 2) {
      score += 10; // +10 points per click
      resetTarget();
    }
  }
}