// select all the main elements 
const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

// when start button click invoke the gamePlay function
startScreen.addEventListener('click', start);

// initilize player
let player = {speed: 5, score: 0};

// making arrowUp, arrowDown, arrowLeft, arrowRight false
let keys = {ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false}

// Invoke callback function on keyup and keydown
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// keyDown function
function keyDown(e){
	e.preventDefault();
	// making that key true which is clicked
	keys[e.key] = true;
}

// keyUp function
function keyUp(e){
	e.preventDefault();
	// making that key false when the clicked key is released
	keys[e.key] = false;
}

// gamePlay function
function gamePlay(){
	let car = document.querySelector('.car');
	let road = gameArea.getBoundingClientRect();

	if(player.start){
		moveLines();
		moveEnemy(car);
		player.score++;
		score.innerText = "Score : " + player.score;
		// moving the car
		if(keys.ArrowUp && player.y > 150){player.y -= player.speed}
		if(keys.ArrowDown && player.y < (road.bottom - 70)){player.y += player.speed}
		if(keys.ArrowLeft && player.x > 0){player.x -= player.speed}
		if(keys.ArrowRight && player.x < (road.width - 50)){player.x += player.speed}

		car.style.top = player.y + "px";
		car.style.left = player.x + "px";

		window.requestAnimationFrame(gamePlay);
	}	
}

// start function
function start(){
	gameArea.innerHTML = "";
	startScreen.classList.add('hide');
	player.start = true;
	player.score = 0;
	// invoke gamePlay function
	window.requestAnimationFrame(gamePlay); // this will invoke gamePlay at every milisecond

	for(x=0; x<5; x++){
		// create road white line
		let roadLine = document.createElement('div');
		roadLine.setAttribute('class','lines');
		roadLine.y = (x*150);
		roadLine.style.top = (x*150) + 'px';
		gameArea.appendChild(roadLine);
	}	

	// making car element
	let car = document.createElement('div');
	car.setAttribute('class', 'car');
	gameArea.appendChild(car);

	// getting exact position of car 
	player.x = car.offsetLeft;
	player.y = car.offsetTop;

	for(x=0; x<3; x++){
		// create Enemy Car
		let enemyCar = document.createElement('div');
		enemyCar.setAttribute('class','enemy');
		enemyCar.y = ((x+1) * 350) * -1;
		enemyCar.style.top = (x*100) + 'px';
		enemyCar.style.backgroundImage = 'url(images.png)';
		enemyCar.style.left = Math.floor(Math.random() * 350) + 'px';
		gameArea.appendChild(enemyCar);
	}	
}

// move lines function
function moveLines(){
	let lines = document.querySelectorAll('.lines');
	lines.forEach((v)=>{
		if(v.y >= 700){
			v.y -= 750;
		}
		v.y += player.speed;
		v.style.top = v.y + 'px';
	});
}

// move enemy car function
function moveEnemy(car){
	let enemy = document.querySelectorAll('.enemy');
	enemy.forEach((v)=>{
		if(isCollide(car, v) === false){
			endGame();
		}
		if(v.y >= 700){
			v.y = -300;
			v.style.left = Math.floor(Math.random() * 350) + 'px';
		}
		v.y += player.speed;
		v.style.top = v.y + 'px';
	});
}

// check if car is collide
function isCollide(a,b){
	let ela = {};
	let elb = {};
	ela.top = a.offsetTop;
	ela.left = a.offsetLeft;
	ela.right = Number(a.offsetLeft) + 38;
	ela.bottom = Number(a.offsetTop) + 70;

	elb.top = b.offsetTop;
	elb.left = b.offsetLeft;
	elb.right = Number(b.offsetLeft) + 38;
	elb.bottom = Number(b.offsetTop) + 70;

	if(ela.right > elb.left && ela.left < elb.right && ela.top < elb.bottom && ela.bottom > elb.top){
		return 	false;
	}
}

// endgame function
function endGame(){
	player.start = false;
	startScreen.classList.remove('hide');
	startScreen.innerHTML = `
	<p > <span class="gameOver">Game Over</span><br />
	Your Final Score is <b> ${player.score} </b> <br />
	Press here to Restart
	</p>
	`;
}