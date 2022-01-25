const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");

let frames = 0;

const imageObstacles = [
  "/assets/images/carone.png",
  "/assets/images/cartwo.png",
  "/assets/images/hole.png",
]
const obstacles= []

let requestId;

let weapons = [];

const imageRecovery = [
  "/assets/images/agua.png",
  "/assets/images/agua2.png",
]
const bottles = []

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
    }
    // Metodos
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height) 
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

// seccion de instancias

const piso = new Piso()
const city = new City()
const lines = new Lineas()
const bike = new Bike(340, 1011, 135,180)

// const obstacle = new Obstacles(340, 1011, 135,180)
// const house = new House()

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
      requestID = undefined;
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
  if (frames % 1335 === 0){
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
      requestID = undefined
    }
  })
}

function updateCanvas() {
    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    piso.draw()
    lines.draw()
    generateObstacles()
    drawObstacles()
    generateBottles()
    drawBottles()
    city.draw()
    bike.draw()
    if(requestId){
      requestId = requestAnimationFrame(updateCanvas)
    }   
    requestAnimationFrame(updateCanvas)
  }

  updateCanvas()


  // Event listener

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