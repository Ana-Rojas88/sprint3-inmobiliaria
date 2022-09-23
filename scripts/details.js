const getData = (url) => {
    const data = fetch(url) //Devuelve una promesa. Resultado de esta promesa es otra promesa 
        .then(resp => {
            const response = resp.json() // Esta es la otra promesa que resulta de resolver la promesa del fetch.
                .then(resp => {
                    return resp.results
                })
                .catch(error => {
                    console.log('problemas en la promesa resp.json()', error);
                    return []
                })
            return response
        })
        .catch(error => {
            console.log('problemas en la promesa fetch(url)', error);
            return null
        })
    return data
}

let details = JSON.parse(localStorage.getItem("idVer")) || [];

  const printCards = (data, container) => {
    //Primero debemos limpiar lo que sea que se encuentre en el contenedor
    container.innerHTML = '';

    //recorre el array data para pintar las cards dinámicamente
    data.forEach(element => {
        //podemos desestructurar el objeto element para trabajar directamente con las propiedades de cada objeto.
        const { id, type, price, image_main, place, area, bedrooms, bathrooms, status, parking, owner } = element;

        //Creamos el elemento principal de la Card
        const article = document.createElement('article');

        //Debemos agregarle la clase card al nuevo elemento para que conserven los estilos
        article.classList.add('containerCards');

        //al elemento article se le debe insertar todo el contenido de las cards
        article.innerHTML += `
        <figure>
            <img src="${image_main}" alt="${type}">
        </figure>
        <section>
            <h2>${place}</h2>
            
            <h3>${status}</h3>
            
            
        </section> 
        `
        //Insertar los elementos hijos al contenedor principal
        container.appendChild(article);
    });
}
const urlApi = "http://localhost:3000/living";

//Capturamos los elementos del HTML
const main = document.getElementById('main');

document.addEventListener('DOMContentLoaded', () => {
    getData(urlApi)
        .then(resp => {
            const details = resp.find(item => item.id === parseInt(idVer));
            printCards(details, main)
        })
        .catch(error => console.log(error))

})