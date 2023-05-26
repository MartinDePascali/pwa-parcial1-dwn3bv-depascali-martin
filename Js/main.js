if(navigator.serviceWorker){
    console.log('Usando service worker');
    navigator.serviceWorker.register('/sw.js');
}
else{
    console.log('No se puede usar el service worker, actualizar');
}

async function fetchVehicles(){
    let results = await fetch("https://swapi.dev/api/vehicles/");
    const data = await results.json();

    console.log(data);

    const content = document.querySelector('.content');
    let card = `<div class="card-vehicle">`;

    let vehicles = data.results;
    vehicles?.forEach(item => {
        console.log(item.name);

        card += `<div>
            <span class="photo-vehicle"></span>
            <ul>
                <li>Nombre: ${item.name}</li>
                <li>Fabricante: ${item.manufacturer}</li>
                <li>Tripulantes: ${item.crew}</li>
                <li>Pasajeros: ${item.passengers}</li>
                <li>Precio: ${item.cost_in_credits}</li>
            </ul>
        </div>`
    });

    card += '</div>';
    content.innerHTML = card;
}

fetchVehicles();