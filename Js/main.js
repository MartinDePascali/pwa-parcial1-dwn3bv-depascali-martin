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
        console.log(item.cost_in_credits);

        //Agrego este if ya que algunas naves no poseen precio en la API
        if(item.cost_in_credits == "unknown"){
            price = Math.round(Math.random() * 100000);
            item.cost_in_credits = price;
        }

        card += `<div>
            <span class="photo-vehicle"></span>
            <ul>
                <li>${item.manufacturer}</li>
                <li>${item.name}</li>
                <li><span class="crew-icon" title="Total de tripulantes">${item.crew}</li>
                <li><span class="passengers-icon" title="Total de pasajeros"></span> ${item.passengers}</li>
                <li><span class="price">$</span>${item.cost_in_credits}</li>
            </ul>
        </div>`
    });

    card += '</div>';
    content.innerHTML = card;
}

fetchVehicles();