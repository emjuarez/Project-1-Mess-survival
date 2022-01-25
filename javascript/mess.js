const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");

let frames = 0;
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
}

class Enemies {
    constructor(){

    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height) 
    }
}


// seccion de instancias

const piso = new Piso()
const city = new City()
const lines = new Lineas()
const bike = new Bike(340, 1011, 135,180)
const house = new House()

// funciones

function updateCanvas() {
    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    piso.draw()
    lines.draw()
    city.draw()
    bike.draw()
    house.draw()
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