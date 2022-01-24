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
        this.heigth = 700;
        this.image = new Image();
        this.image.src = "../assets/images/piso.png"
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
        this.heigth = 1046;
        this.image = new Image();
        this.image.src = "../assets/images/fondo.png"
    }
    // Metodos
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height) 
    }
}

class Lineas {
    constructor(){
        this.x = 0;
        this.y = 500;
        this.width = canvas.width;
        this.heigth = 700;
        this.image = new Image();
        this.image.src = "../assets/images/lineas.png"
    }
    // Metodos
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height) 
    }
}





// seccion de instancias

const piso = new Piso()
const city = new City()
const lines = new Lineas

function updateCanvas() {
    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    city.draw()
    piso.draw()
    if(requestId){
      requestId = requestAnimationFrame(updateCanvas)
    }   
  }