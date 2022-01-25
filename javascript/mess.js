const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");

let frames = 0;

const imageObstacles = [
  "../assets/images/cartwo.png",
  "../assets/images/hole.png",
  "../assets/images/carone.png",
]

// const obstacles = [];
let requestId;


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
        this.image.src = "../assets/images/ciudad.png"
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
        this.image.src = "../assets/images/casa.png"
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
        this.image.src = "../assets/images/lineas.png"
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
        this.image.src = "../assets/images/charone.png"
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
    constructor(x,y,w,h){
      this.x = x;
      this.y = y;
      this.width = w;
      this.height = h;
      this.image = new Image ();

      
    }
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


// seccion de instancias

const piso = new Piso()
const city = new City()
const lines = new Lineas()
const bike = new Bike(340, 1011, 135,180)
const house = new House()
const obstacle = new Obstacles(canvas.width, 288, 50, 50, imageObstacles[2])
// funciones

// function generateObstacles() {
//   // en que intervalo de tiempo quiero que se genere mi enemigo
//   if (frames % 300 === 0 || frames % 700 === 0 || frames % 1200 === 0) {
//       let y = Math.floor(Math.random() * (280 - 10) + 10);
//       let imgRand = Math.floor(Math.random() * imageObstacles.length);
//       const obstacle = new Obstacles(canvas.width, y, 50, 50, imageObstacles[imgRand]);
//       obstacles.push(obstacle);
//   }
// }

// function drawObstacles() {
//   //iteramos en el arreglo enemies para poder utilizar el .draw de cada enemigo
//   // item = enemy, index = 0, arregloOriginal
//   obstacles.forEach((obstacle, index_obstacle) => {
//       obstacle.draw();
//       if (bike.collision(obstacle)) {
//           console.log("Me esta tocando");
//           requestID = undefined;
//           fondo.gameOver();
//       };

//       // bullets.forEach((bullet, index_bullet) => {
//       //     bullet.draw();
//       //     // validar si choca con un enemigo
//       //     if(enemy.collision(bullet){
//       //         bullets.splice(index_bullet,1)
              
//       //         enemies.splice(index_enemy,1)
//       //     })
//       //     //sacar la vala si se sale del canvas
//       //     if (bullet.x + bullet.width >= 800) {
//       //         bullets.pop();
//       //     }
//       // })

//       //eliminar al enemigo si se sale del canvas
//       if (obstacle.y + enemy.height >= 1200) {
//           obstacles.splice(index_obstacle, 1);
//       }
//   }
//   )
// }

function updateCanvas() {
    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    piso.draw()
    lines.draw()
    city.draw()
    bike.draw()
    obstacle.draw();
    // house.draw()
    // generateObstacles();
    // drawObstacles();

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
  
  })