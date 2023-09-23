
const contenedortarjetas = document.getElementById('cards')
/*  console.log(contenedortarjetas) */

let botones = document.getElementById('botones')
let btnSig
let btnAnt
let btnPrim
let btnUlt

let cantListados = document.getElementById('cantListados')
const cantPaginas = document.getElementById('cantPaginas')

const obtenerPersonajes = () => {
    fetch("https://rickandmortyapi.com/api/character")
        .then(res => res.json())
        .then((datos) => mostrarPersonajes(datos, ""))
}

obtenerPersonajes()

const mostrarPersonajes = (datos, genero) => {

    contenedortarjetas.innerHTML = ""

    datos.results.forEach((personaje) => {
        contenedortarjetas.innerHTML +=
            `<div class="card">
            <h2>${personaje.name}</h2>
            <img src="${personaje.image}" alt="">    
            <button class="boton" onclick=verDescription("${personaje.url}")>ver mas</button>
        </div>`
    }
    );

    let totalPaginas = datos.info.pages
    let pagSigUrl = datos.info.next
    let pagAntUrl = datos.info.prev

    if(genero ===""){    
        btnSig = pagSigUrl ? `<button class="btnIni" data-url="${pagSigUrl}">Pagina siguiente </button>`: `<button disabled> Pagina siguiente</button>`
        btnAnt = pagAntUrl ? `<button class="btnIni" data-url="${pagAntUrl}">Pagina anterior </button>`: `<button disabled> Pagina anterior </button>`
        btnPrim = `<button class="btnIni" data-url="https://rickandmortyapi.com/api/character/?page=1">Primera Pagina </button>`
        btnUlt = `<button class="btnIni" data-url="https://rickandmortyapi.com/api/character/?page=${totalPaginas}">Ultima pagina Pagina </button>`
    }else{
        btnSig = pagSigUrl ? `<button class="btn" data-url="${pagSigUrl}">Pagina siguiente </button>`: `<button disabled> Pagina anterior</button>`
        btnAnt = pagAntUrl ? `<button class="btn" data-url="${pagAntUrl}">Pagina anterior </button>`: `<button disabled> Pagina anterior </button>`
        btnPrim = `<button class="btn" data-url="https://rickandmortyapi.com/api/character/?page=1&gender=${genero}">Primera Pagina </button>`
        btnUlt = `<button class="btn" data-url="https://rickandmortyapi.com/api/character/?page=${totalPaginas}&gender=${genero}">ultima Pagina </button>`
    }
    
    /* botones.innerHTML=`hola` */

    botones.innerHTML = btnPrim+ " " + btnAnt + " " + btnSig + " " + btnUlt     

    let cantPag = datos.info.pages
    let cantPerList = datos.info.count 

    cantListados.innerHTML= `<p>Cantidad de personajes listados: ${cantPerList}</p>`
    cantPaginas.innerHTML= `<p>Cantidad de paginas: ${cantPag}</p>`
   
}

const verDescription = (personajeUrl) => {
    /* var card = document.getElementById('card') */
    contenedortarjetas.innerHTML = ""
    fetch(personajeUrl)
        .then(res => res.json())
        .then((personaje) => {
            contenedortarjetas.innerHTML =
            `<div class="card" id = "card">
              <img src="${personaje.image}" alt="">    
              <h2>${personaje.name}</h2>
               <p>Estado: ${personaje.status}</p>
               <p>Especie: ${personaje.species}</p>
               <p>Genero: ${personaje.gender}</p>
               
              <button class="boton" id="volver" onclick=volverInicio()>Volver</button>
              </div>`
        });
        botones.style.display="none"
}

const volverInicio = () => {
    window.history.back()
    location.reload();
}

botones.addEventListener('click', (e) => {
    /* para cualquiera de los 4 botones que tengan la clase btniNi (que estamos mostransof cuando gender es "" (vacio) */
    if (e.target.classList.contains('btnIni')) {
        let valor = e.target.dataset.url
        
        fetch(valor)
            .then(res => res.json())
            .then((pagina) => mostrarPersonajes(pagina, ""))
    }

    /* para cualquiera de los 4 botones que tenganj la clase btn (que estamos mostransof cuando gender es male, female o unknown */
    if (e.target.classList.contains('btn')) {
        let valor = e.target.dataset.url /* recibe una url que esta en el dataurl del boton que apuntemos (culaquiera de los 4) */
        fetch(valor)
            .then(res => res.json())
            .then((pagina) => {
                /* rebe la estructura de datos que viene desde la url (ejemplo, boton siguente de genero masculino) */
                let genero = pagina.results[0].gender
                mostrarPersonajes(pagina, genero)
            })
    }
})


/* let filterCharacter = (filterParam, value) => {
    fetch(`https://rickandmortyapi.com/api/character/?${filterParam}=${value}`)
        .then(res => res.json())
        .then(datos => mostrarPersonajes(datos))
} */


const selectGender = () => {

    const valorSelect = document.getElementById('cmbGenero')
    let genero = valorSelect.value;

    switch (genero) {
        case 'Todos':
            fetch(`https://rickandmortyapi.com/api/character`)
                .then(res => res.json())
                .then((datos) => mostrarPersonajes(datos,""))
            break;
        case 'Femenino':
            fetch(`https://rickandmortyapi.com/api/character/?gender=female`)
                .then(res => res.json())
                .then((datos) => mostrarPersonajes(datos,"female"))
            break;
        case 'Masculino':
            fetch(`https://rickandmortyapi.com/api/character/?gender=male`)
                .then(res => res.json())
                .then((datos) => mostrarPersonajes(datos,"male"))
            break;
        case 'Desconocido':
            fetch(`https://rickandmortyapi.com/api/character/?gender=unknown`)
                .then(res => res.json())
                .then((datos) => mostrarPersonajes(datos,"unknown"))
            break;
    }
}