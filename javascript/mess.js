//Conexion para canvas
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");
const buttonStart = document.getElementById("play")
// const buttonRetry = document.getElementById("retry")

//Variables globales
let frames = 0;
let requestID;

const imageObstacles = [
  "/assets/images/carone.png",
  "/assets/images/cartwo.png",
  // "/assets/images/hole.png",
]

const obstacles=[]
let weapons = [];

const imageRecovery = [
  "/assets/images/agua.png",
  "/assets/images/agua2.png",
]
const bottles = []

const imageHoles = [ "/assets/images/hole.png" ]
const holes = []

const imageFood = ["/assets/images/burger.png"]
const burgers = []

//SECCION DE CLASES

class Piso{
    constructor(){
        this.x = 0;
        this.y = 500;
        this.width = canvas.width;
        this.height = 700;
        this.image = new Image();
        this.image.src = "assets/images/piso.png"
    }
    // metodos
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height) 
    }
}
class City{
    constructor(){ 
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = 510;
        this.image = new Image();
        this.image.src = "/assets/images/ciudad.png"
        this.image2 = new Image
        this.image2.src = "/assets/images/loose.png"
        this.image3 = new Image()
        this.image3.src = "/assets/images/win.png"
    }
    // Metodos
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height) 
    }
    gameOver() {
        ctx.drawImage(this.image2, 100, 100, 570, 350)
        }
    win(){
        ctx.drawImage(this.image3, 100, 100, 570, 350)
    }

}
class House {
    constructor(){
        this.x = 340;
        this.y = 1010;
        this.width = 190 ;
        this.height = 190;
        this.image = new Image();
        this.image.src = "/assets/images/casa.png"
    }
    draw() {
        this.y --;
        if(this.y < 319) {
          this.y =319;
        }
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
}
class Lineas {
    constructor(){
        this.x = 0;
        this.y = 500;
        this.width = canvas.width;
        this.height = 700;
        this.image = new Image();
        this.image.src = "/assets/images/lineas.png"
    }
    // Metodos
    draw() {
        this.y ++;
        if(this.y > canvas.height) {
          this.y =502;
        }
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(
          this.image,
          this.x ,
          this.y - this.height, //coloca la imagen seguida de la primera
          this.width,
          this.height
      )
      }
}
class Bike {
    constructor(x,y,w,h){
        this.x= x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.life = 3
        this.hungry = 0
        this.image = new Image();
        this.image.src = "/assets/images/charone.png"
    }
    //Metodos
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
    collision(item){
      return(
        this.x < item.x + item.width &&
        this.x + this.width > item.x &&
        this.y < item.y + item.height &&
        this.y + this.height > item.y
      )
    }
}
class Obstacles {
  constructor(x,y,w,h,img){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.image = new Image();
    this.image.src = img;
  }
   // metodos
  draw(){
    this.y += 2
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
  }
  collision(item){
    return(
      this.x < item.x + item.width &&
      this.x + this.width > item.x &&
      this.y < item.y + item.height &&
      this.y + this.height > item.y
    )
  }
}
class Weapons {
  constructor (x,y){
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.image = new Image();
    this.image.src = "/assets/images/tool.png"
  }
  draw(){
    if(frames % 10 === 0){
      this.y -= 19;
    };
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}

class Holes extends Obstacles{
  constructor(x,y,w,h,img){
    super(x,y,w,h,img)
  }
}

class Recovery {
  constructor(x,y,w,h,img){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.image = new Image();
    this.image.src = img;
  }
   // metodos
  draw(){
    this.y += 2
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
  }
  collision(item){
    return(
      this.x < item.x + item.width &&
      this.x + this.width > item.x &&
      this.y < item.y + item.height &&
      this.y + this.height > item.y
    )
  }
}

class Food extends Recovery{
  constructor(x,y,w,h,img){
    super(x,y,w,h,img)
  }
}

// seccion de instancias

const piso = new Piso()
const city = new City()
const lines = new Lineas()
const bike = new Bike(340, 1011, 135,180)


// funciones

function generateObstacles(){
  if (frames % 200 === 0){
    let x = Math.floor(Math.random() * (740 - 140) + 10);
    let imgRand = Math.floor(Math.random() * imageObstacles.length);
    const obstacle = new Obstacles(x, 400,150,150 ,imageObstacles[imgRand]);
    obstacles.push(obstacle);
  }
}

function drawObstacles(){
  obstacles.forEach((obstacle, index_obstacle) =>{
    obstacle.draw();
    if(bike.collision(obstacle)){
      console.log("ouch");
      obstacles.splice(index_obstacle,1);
      bike.life -= 1;
      console.log(bike.life)
      // requestID = undefined;
      // fondo.gameOver();
    }
    weapons.forEach((weapon, index_weapon) => {
      weapon.draw();
      if(obstacle.collision(weapon)){
        obstacles.splice(index_obstacle,1);
        weapons.splice(index_weapon,1);
      }
      //sacar el arma si sale del canvas
      if(weapon.y + weapon.height <= 0){
        weapons.pop();
      }
    })
    //sacar los obstaculos cuando ya no están en el canvas
    if (obstacle.y + obstacle.height >= 1350){
      obstacles.splice(index_obstacle, 1);
    }
  })
}

function generateBottles(){
  if (frames % 1307 === 0){
    let x = Math.floor(Math.random() * (740 - 140) + 10);
    let imgRand = Math.floor(Math.random() * imageRecovery.length);
    const bottle = new Recovery(x, 400,70,150 ,imageRecovery[imgRand]);
    bottles.push(bottle);
  }
}

function drawBottles(){
  bottles.forEach((bottle, index_bottle) =>{
    bottle.draw();
    if(bike.collision(bottle)){
      console.log("glulgu");
      bottles.splice(index_bottle,1);
      bike.life += 1;
      console.log(bike.life)
      // requestID = undefined
    }
    if(bottle.y + bottle.height >= 1350){
      bottles.splice(index_bottle, 1);
    }
  })
}

function generateHoles(){
  if (frames % 700 === 0){
    let x = Math.floor(Math.random() * (740 - 140) + 10);
    let imgRand = Math.floor(Math.random() * imageHoles.length);
    const hole = new Holes(x, 400,150,90 ,imageHoles[imgRand]);
    holes.push(hole);
  }
}

function drawHoles(){
  holes.forEach((hole, index_hole) =>{
    hole.draw();
    if(bike.collision(hole)){
      console.log("ouch");
      holes.splice(index_hole,1);
      bike.life -= 2;
      console.log(bike.life)
      // requestID = undefined;
      // fondo.gameOver();
    }
    //sacar los obstaculos cuando ya no están en el canvas
    if (hole.y + hole.height >= 1350){
      holes.splice(index_hole, 1);
    }
  })
}

function generateBurgers(){
  if (frames % 1307 === 0){
    let x = Math.floor(Math.random() * (740 - 140) + 10);
    let imgRand = Math.floor(Math.random() * imageFood.length);
    const burger = new Food(x, 400,100,100 ,imageFood[imgRand]);
    burgers.push(burger);
  }
}

function drawBurger(){
  burgers.forEach((burger, index_burger) =>{
    burger.draw();
    if(bike.collision(burger)){
      console.log("ñomñom");
      burgers.splice(index_burger,1);
      bike.hungry += 1
      console.log(`${bike.hungry} hamburgesas`)
      // requestID = undefined
    }
    if(burger.y + burger.height >= 1350){
      burgers.splice(index_burger, 1);
    }
  })
}
// EMPEZAR JUEGO
function startGame(){
  console.log("start")
  requestID = requestAnimationFrame(updateCanvas)
}
// // retry
// function retry(){
//   console.log("retry")
//   requestID = requestAnimationFrame(updateCanvas)
// }


//Status vida
function checkStatus(){
  if(bike.life < 0){
    city.gameOver()
    bike.life = 0
    requestAnimationFrame = null
  }
 }

//Feedback vida
function vidas(){
 const vida = new Image()
 vida.src = "/assets/images/life.png"
 ctx.drawImage(vida,15,15,70,70)
 ctx.fillStyle = "white"
 ctx.font = "50px Arial"
 ctx.fillText(`x ${bike.life}`, 100,70)
}

function checkBurger(){
  if(bike.hungry === 10){
    city.win()
    requestAnimationFrame = null
  }
}

function burgerIcon(){
  const hamburguer = new Image()
  hamburguer.src = "/assets/images/burger.png"
  ctx.drawImage(hamburguer,710,25,70,70)
  ctx.fillStyle = "white"
  ctx.font = "50px Arial"
  ctx.fillText(`${bike.hungry} x`, 610,70)
}

function updateCanvas(){
    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    piso.draw()
    lines.draw()
    generateObstacles()
    drawObstacles()
    generateHoles()
    drawHoles()
    generateBottles()
    drawBottles()
    generateBurgers()
    drawBurger()
    city.draw()
    bike.draw()
    checkStatus()
    vidas()
    checkBurger()
    burgerIcon()


if(requestID){
    requestID = requestAnimationFrame(updateCanvas)
    }   
  }


  // Event listener Bike
  addEventListener('keydown', (event) =>{
 
    if(event.keyCode === 65){
      if (bike.x > 100){
        bike.x -=15  
      }   
    }
    if(event.keyCode === 68){
      if (bike.x < 560){
        bike.x +=15  
      }
    }
    if(event.keyCode === 32){
      const weapon = new Weapons(bike.x, bike.y)
      weapons.push(weapon)
    }
  
  })

  //Event listener Start
  // buttonStart.addEventListener("click",startGame)
  window.onload = function(){
    startGame()
  }

  // Event listener retry

  // buttonRetry.addEventListener("click",retry)