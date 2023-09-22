const contenedor = document.getElementById("contenedor-tarjetas")
console.log(contenedor)
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const btnFirst = document.querySelector(".btn-first");
const btnLast = document.querySelector(".btn-last");
const card = document.querySelector(".card.selected")
const female = document.querySelector(".btn-female")
const male = document.querySelector(".btn-male")
const less = document.querySelector(".btn-genderless")
const known = document.querySelector(".btn-unknown")
const alive = document.querySelector(".btn-alive")
const dead = document.querySelector(".btn-dead")
const idk = document.querySelector(".btn-unknow")
const Span = document.getElementById("Pags");
const totalCh = document.getElementById("totalCh");
const casita = document.getElementById("casita");


let home = 1
let total = 42
let Fgender = null
let Statu = null


const PagsNum = () => {
    Span.textContent = `Página ${home} de ${total}`;
};

const getCharacters = (PagNum, Gend, Status) => { 
    contenedor.innerHTML = "";
    console.log(PagNum, Gend, Status)
    
    if (Gend && Gend !== "null") {
    Gend = `&gender=${Gend}`;
    Status= "";
    } else if (Status && Status !=="null"){
    Status=`&status=${Status}`;
    Gend = "";
    }
    else{
      Gend = "";
      Status= "";
    }
    fetch(`https://rickandmortyapi.com/api/character/?page=${PagNum}${Gend}${Status}`)
      .then(res => res.json())
      .then((data) => {
        total = data.info.pages;
        totalCh.textContent = data.info.count;
        renderCards(data);
        updateBtn();
        PagsNum()
      })
  }


  
getCharacters();

const updateBtn = () => {
    if(home === 1){
        btnFirst.setAttribute("disabled", true)
        btnPrev.setAttribute("disabled", true)
    } else {
        btnFirst.removeAttribute("disabled");
        btnPrev.removeAttribute("disabled");
    }
    if(total === home){
        btnNext.setAttribute("disabled", true) 
        btnLast.setAttribute("disabled", true)
    } else{
        btnNext.removeAttribute("disabled");
        btnLast.removeAttribute("disabled");
    }
  };

const renderCards = (data) => {
    const dataApi = data.results;
    console.log(dataApi)
    contenedor.innerHTML = "";
    dataApi.forEach((character)=>{
        contenedor.innerHTML+= `
        <div class = "card">
        <div class ="contenedor-img">
        <img src=${character.image} alt=${character.name}>
        </div>
        <p class="tatata">${character.name}</p>
        <div class="btn-ver">
        <button class="btnV" onclick="descrip('${character.url}')">Ver</button>
        </div>
        </div>
        `;
    });
    
  };

  const descrip = (characterUrl)=>{
    if (card) {card.classList.remove('selected')}
    fetch(characterUrl)
    .then((res) => res.json())
    .then((character) => {
        contenedor.innerHTML = `
        <div class="coso-container">
        <div class="coso">
        <div class="Detalles">
        <h2>${character.name}</h2>
        <div class ="contenedor-img">
        <img src=${character.image} alt=${character.name}>
        </div>
        <div class="contenedor-detalle">
        <p> estado: ${character.status}</p>
        <p> Origen: ${character.origin.name}</p>
        <p> Especie: ${character.species}</p>
        <p> Episodios: ${character.episode.length}</p>
        </div>
        <div class="btn-ver">
        <button class="btnV" onclick="returnH()">volver</button>
        </div>
        </div>
        </div>
        </div>
        `
    })

}
 
const returnH = () =>{
    getCharacters(home, Fgender, Statu); 
}


btnFirst.addEventListener ("click", ()=>{
    if (home > 1){
        home = 1;
        getCharacters(home, Fgender, Statu);
    }
})

btnLast.addEventListener("click", ()=>{
    if (home < total) {
        home = total
        getCharacters(home, Fgender, Statu);
    } 
})

btnNext.addEventListener("click", ()=> {
    if (home < total){
        home ++
        getCharacters(home, Fgender, Statu);  
    }
})

btnPrev.addEventListener("click", ()=> {
    if (home > 1){
        home --
        getCharacters(home, Fgender, Statu);  
    } 
})



female.addEventListener("click", ()=> {
    Fgender = "female"
    home=1
    getCharacters(home, Fgender);
})

male.addEventListener("click", ()=> {
    Fgender = "male"
    home=1
    getCharacters(home, Fgender);
})

less.addEventListener("click", ()=> {
    Fgender = "genderless"
    home=1
    getCharacters(home, Fgender);
})

known.addEventListener("click", ()=> {
    Fgender = "unknown"
    home=1
    getCharacters(home, Fgender);
})

alive.addEventListener("click", ()=> {
    Statu = "alive"
    home=1
    getCharacters(home, Fgender, Statu);
})

dead.addEventListener("click", ()=> {
    Statu = "dead"
    home=1
    getCharacters(home, Fgender, Statu);
})

idk.addEventListener("click", ()=> {
    Statu = "unknown"
    home=1
    getCharacters(home, Fgender, Statu);
})



PagsNum()

let menuToggle = document.querySelector(".menuToggle");
let header = document.querySelector("header");

menuToggle.onclick = function(){
  header.classList.toggle("active")
};

//muchisimas gracias a Cristina y a Guada (por la guía con los fetch y filtros)
//pero por sobre todo, gracias a ustedes por el aguante y por extender la fecha de entrega (de lo contrario no hubiera llegado con todo)