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

        //Agrego este if ya que algunas naves no poseen precio en la API
        if(item.cost_in_credits == "unknown"){
            price = Math.round(Math.random() * 100000);
            item.cost_in_credits = price;
        }

        if(item.name == "TIE/LN starfighter"){
            item.name = "TIE starfighter"
        }

        card += `<div>
            <img class="img-vehicle" src="../Imagenes/Naves/${item.name}.png" />
            <ul>
                <li>${item.manufacturer}</li>
                <li>${item.name}</li>
                <li>
                    <div>
                        <span class="crew-icon" title="Total de tripulantes"></span> ${item.crew}
                    </div>
                    <div>
                        <span class="passengers-icon" title="Total de pasajeros"></span> ${item.passengers}
                    </div>
                </li>
                <li><span class="price">$</span>${item.cost_in_credits}</li>
            </ul>
        </div>`
    });

    card += '</div>';
    content.innerHTML = card;
}

fetchVehicles();