// Define a chave da API para o OpenWeatherMap
const chave = "698c933046fecf661b395caefab54b0e";

// Seleciona vários elementos do DOM
var input = document.querySelector('#input');
var pesq = document.querySelector('#search');
const cida = document.getElementById('input');
var cidade = document.getElementById('cidade');
var ocasi = document.querySelector('#ocasi');
var temp = document.getElementById('temp');
var icon = document.querySelector('#icon');
const resultcid = document.querySelector('#imagescid')

// Adiciona um ouvinte de evento ao botão de pesquisa (pesq)
// Quando o botão é clicado, ele impede o evento de envio de formulário padrão e chama a função getApi
pesq.addEventListener('click', (event) => {
    event.preventDefault();

    getApi()
    page = 1
});

// Adiciona um ouvinte de evento ao botão de pesquisa (pesq)
// Quando o botão é clicado, ele impede o evento de envio de formulário padrão, redefine a página para 1 e chama a função imagesApi
// pesq.addEventListener('click', (e) => {
//     e.preventDefault();

// });


// Função assíncrona para buscar dados meteorológicos da API OpenWeatherMap
async function getApi() {
    // Constrói a URL da API usando a cidade inserida pelo usuário (cida.value) e a chave da API definida anteriormente (chave)
    const apilink = `https://api.openweathermap.org/data/2.5/weather?q=${cida.value}&units=metric&appid=${chave}&lang=pt_br`;
    fetch(apilink)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            if (data.cod === '404') {
                alert('cidade não encontrada')
                document.getElementById("data").classList.add("hide")
                imagesApi(true)
                return
            }
            cidade.innerHTML = data.name;
            temp.innerHTML = parseInt(data.main.temp ?? 0);
            ocasi.innerHTML = data.weather[0].description;
            umid.innerHTML = data.main.humidity
            Max.innerHTML = data.main.temp_max
            Min.innerHTML = data.main.temp_min
            vent.innerHTML = data.wind.speed

            icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);

            // Mostra as informações do clima
            document.getElementById("data").classList.remove("hide");
            document.getElementById("card").style.width = "350px";

            imagesApi(false)

            // Define a imagem de fundo do elemento body com base na condição meteorológica principal

            switch (data.weather[0].main) {
                case "Clear":
                    document.body.style.backgroundImage = "url('img/pexels-arthur-shuraev-15184711.jpg')";
                break;
                case "Clouds":
                    document.body.style.backgroundImage = "url('img/pexels-pixabay-209831.jpg')";
                break;
                case "Drizzle":
                    document.body.style.backgroundImage = "url('img/pexels-fabiano-rodrigues-2290328.jpg')";
                break;
                case "Mist":
                    document.body.style.backgroundImage = "url('img/pexels-andre-furtado-1162251.jpg')";
                break;
                case "Rain": 
                document.body.style.backgroundImage = "url('img/pexels-pixabay-459439.jpg')";
                break;
                case "Snow":
                    document.body.style.backgroundImage = "url('img/wladislaw-sokolowskij-0vw4InAC-yM-unsplash.jpg')";
                break;
                case "Fog":
                    document.body.style.backgroundImage = "url('img/jakub-kriz-arOyDPUAJzc-unsplash.jpg')";
                break;
                default:
                    document.body.style.backgroundImage = "url('img/pexels-arthur-shuraev-15184711.jpg')";
                break
            }
        })
        .catch((error) => {
            console.error('Erro ao buscar dados do clima:', error);
        });
}

// Define a chave da API para o Unsplash
const chavephoto = "IQmHoU8iYkNrme12OKVz1gMpP7CehOSo-2GusndK2ws"
const photo = document.getElementById('imagesci')
let Keyword = ""
let page = 1

// Função assíncrona para buscar imagens relacionadas à cidade inserida pelo usuário da API Unsplash
async function imagesApi(err) {
    Keyword = cida.value
    const apiurl = `https://api.unsplash.com/search/photos?page=${page}&query=${Keyword}&client_id=${chavephoto}`
    fetch(apiurl)
        .then((response) => {
            return response.json();
        })
        .then((dt) => {
            console.log(dt)
            if (err) {
                photo.innerHTML = null
                return
            }
                displayResults(dt.results)
        })
}


// Função para exibir os resultados das imagens
function displayResults(results) {
    photo.innerHTML = '';
    const resultLimit = results.slice(0, 3)
    resultLimit.forEach((result, index) => {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('box', 'animate-fade-in');

        const resultLink = document.createElement('a');
        resultLink.href = result.urls.regular;

        const resultImage = document.createElement('img');
        resultImage.src = result.urls.small;
        resultImage.alt = `Result Image ${index = 1}`;
        resultImage.style.width = '150px';
        resultImage.style.height = '200px';
        resultImage.classList.add('object-cover');
        resultLink.appendChild(resultImage);
        resultDiv.appendChild(resultLink);
        photo.appendChild(resultDiv);
        console.log(resultImage)
    });
}
// Butões com div escondida
var bt = document.querySelector('#mais')
var carac = document.querySelector('#carac')

bt.addEventListener('click', function () {
    if (carac.style.display === 'block') {
        carac.style.display = 'none'
    } else {
        carac.style.display = 'block'
    }
})
var btnn = document.querySelector('#Vento')
var cara0 = document.querySelector('#cara0')

document.addEventListener('DOMContentLoaded', function () {
    // Oculta os elementos inicialmente
    cara0.style.display = 'none';
    Mais.style.display = 'none';

    // Adiciona os event listeners aos botões
    btnn.addEventListener('click', function () {
        if (cara0.style.display === 'block') {
            cara0.style.display = 'none';
        } else {
            cara0.style.display = 'block';
        }
    });

    btn3.addEventListener('click', function () {
        if (Mais.style.display === 'block') {
            Mais.style.display = 'none';
        } else {
            Mais.style.display = 'block';
        }
    });
});

var btn3 = document.querySelector('#mais-info')
var Mais = document.querySelector('#mais-infor')

function carregar() {
    var msg = window.document.getElementById('msg')
    var data = new Date()
    var hora = data.getHours()
    var min = data.getMinutes()
    msg.innerHTML = `Agora são ${hora}:${min}h`
}