/*
const BASEURL= 'https://images-api.nasa.gov/search?q=';

const contenedor = document.getElementById('contenedor');
const form = document.getElementById('form');

let jsonData;

function setBusqueda() {
    let busqueda = document.getElementById('inputBuscar').value ;
    localStorage.setItem('busqueda', busqueda);
}

form.addEventListener('submit',function(e){
    setBusqueda();
    let searchTerm = localStorage.getItem('busqueda');
    const url = `https://images-api.nasa.gov/search?q=${searchTerm}`;
    
        try {
            const response =  fetch(url);
            if(!response.ok){
                throw new Error('Error fetching')
            }
            jsonData =  response.json();
            const elementos = jsonData.collection.items;
        
            elementos.forEach(elemento=>{
                let content='';
                const metaData = elemento.data[0];
                const imageUrl = elemento.links[0].href;
                content += `
                <div class="col-md-4">
                    <div class="card mb-4 shadow-sm">
                        <img src="${imageUrl}" class="card-img-top" alt="${metaData.title}">
                        <div class="card-body">
                            <h5 class="card-title">${metaData.title}</h5>
                            <p class="card-text">${metaData.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">Fecha: ${metaData.date_created}</small>
                    </div>
                    </div>
                </div>
                
                `
                contenedor.innerHTML = content;


            })
    
            } catch (error) {
            console.error('Error:', error);
            
        }



})


*/

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
                    <div class="info-container">
                        <img src="${imageUrl}" alt="${metaData.title}">
                        <div>
                            <h5>${metaData.title}</h5>
                            <p>${metaData.description}</p>
                        <div>
                        <small>Fecha: ${metaData.date_created}</small>
                    </div>
                    </div>
                </div>
                
                `;

                contenedor.innerHTML = content;
        })
        

    })
        .catch(error=> {console.error(error)});
});
