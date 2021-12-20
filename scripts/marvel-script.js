let timeStamp = new Date().getTime();
const publicKey = "f25e03d0643493d894d96e704468de43";
const privateKey = "a0f0b6aec26a13d925709027eba857f38d8870f1";
const hash = md5(timeStamp +  privateKey + publicKey);
let dataMarvel = [];

fetch(`http://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`)
    .then(response => {
        return response.json();
    }).then(jsonResponse => {
        dataMarvel = jsonResponse.data.results;

        const charactersList = document.querySelector("#characters-list");
        let characterListCards  = "";

        dataMarvel.map(data => {
            // console.log(data.name);
            let characterCardImageSource = data.thumbnail.path + "." + data.thumbnail.extension;
            let characterCardDescription = data.description.substring(0,50) + "...";

            let characterCard = 
                                `<div class="col-lg-3 col-md-4">
                                    <div class="card character-card">
                                        <img src="${characterCardImageSource}" class="card-img-top character-card-image" alt="${data.name} Thumbnail">
                                        <div class="card-header">
                                            <h5 class="card-title">${data.name}</h5>
                                        </div>
                                        <div class="card-body">
                                            <p class="card-text">${characterCardDescription}</p>
                                            <a href="#" class="card-link">Read more</a>
                                        </div>
                                    </div>
                                </div>`;

            characterListCards += characterCard;
        })

        charactersList.innerHTML = characterListCards;

    }).catch(error  => {
        console.log('Erro:', error);
    });