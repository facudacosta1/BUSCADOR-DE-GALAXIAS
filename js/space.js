

const contenedor = document.getElementById('contenedor');
const inputBuscar = document.getElementById('inputBuscar');
const btnBuscar = document.getElementById('btnBuscar');
const BASE_URL= 'https://images-api.nasa.gov/search?q=';

btnBuscar.addEventListener('click',function(e){
    e.preventDefault();
    const url = BASE_URL + inputBuscar.value ;
    fetch(url)
    .then ((response)=>response.json())
    .then ((data)=>{
        const elementos = data.collection.items;
            let content='';
            elementos.forEach(elemento=>{
                const metaData = elemento.data[0];
                const imageUrl = elemento.links[0].href;
                content += `
                <div>
                    <div class="info-container w-auto container-fluid mb-5 mt-2 p-3">
                        <img class="w-100" src="${imageUrl}" alt="${metaData.title}">
                        <div>
                            <h5>${metaData.title}</h5>
                            <p>${metaData.description}</p>
                        <div>
                        <small>Fecha: ${metaData.date_created}</small> <br>
                        <button class="btn btn-success" onclick="addToCart('${metaData.title}')" >Comprar artículo</button>
                    </div>
                    </div>
                </div>
                
                `;

                contenedor.innerHTML = content;
        })
        

    })
        .catch(error=> {console.error(error)});
});


function addToCart(title) {
    // Verificar si el "carrito" ya existe en el Local Storage
    if (localStorage.getItem("carrito")) {
        // Obtener el "carrito" actual del Local Storage
        let carrito = JSON.parse(localStorage.getItem("carrito"));

        // Agregar el nuevo elemento al "carrito"
        carrito.push(title);

        // Guardar el "carrito" actualizado en el Local Storage
        localStorage.setItem('carrito', JSON.stringify(carrito));
    } else {
        // Si el "carrito" no existe, crear un nuevo arreglo con el elemento
        let agregar = [title];

        // Guardar el nuevo "carrito" en el Local Storage
        localStorage.setItem("carrito", JSON.stringify(agregar));
    }
    displayCarrito();
}

function vaciarCarrito(){
    localStorage.setItem('carrito', JSON.stringify([]));
    displayCarrito();
}

function displayCarrito(){
    
    let contenedor = document.querySelector('#carritoContainer');
    let carrito = localStorage.getItem('carrito');
    contenedor.innerHTML='';
    let carritoJSON=JSON.parse(carrito);
    
    carritoJSON.forEach(producto=>{
        let lista = document.createElement('li');
        lista.textContent = producto;
        contenedor.appendChild(lista);
    })
}

displayCarrito();

