let dataFiltered=[];
let data=[];

let favorites = JSON.parse(localStorage.getItem("favoritospage")) || [];
const inputSearch = document.getElementById("search");
const btnSearch = document.getElementById("btnSearch");
const containerCards = document.getElementById("containerCards");

const getData = async () =>{
    const URL_API="http://localhost:3000/inmuebles";
    const response = await fetch(URL_API);
    data = await response.json();
    dataFiltered=data;
    console.log(data);
};
getData();

const handleSearch = () => {
    let query = inputSearch.value;
    filterArray(query);
    renderData();
  };
  
  btnSearch.addEventListener("click", handleSearch);
  
  const filterArray = (word) => {
    dataFiltered = data.filter((item) =>
      item.place.toLowerCase().includes(word.toLowerCase()) || item.type.toLowerCase().includes(word.toLowerCase())
    );
    console.log(dataFiltered);
  };
  
  const renderData = () => {
    containerCards.innerHTML = "";
    dataFiltered.forEach((element) => {
      containerCards.innerHTML += `
          <article>
            <figure>
              <img src="${element.image_main}" alt="${element.type}">
            </figure>
            <p>Precio: ${element.price}</p>
            <p>Tipo: ${element.type}</p>
            <p>Lugar: ${element.place}</p>
            <p>Area: ${element.area}</p>
            <p>Habitaciones: ${element.bedrooms}</p>
            <p>Baños: ${element.bathrooms}</p>
            <p>Estado: ${element.status}</p>
            <p>Parqueadero: ${element.parking}</p>
            <p>Propietario: ${element.owner}</p>
            <p>Descripción: ${element.description}</p>
            <button class="btnFavorites" name="${element.id}">Añadir a favoritos</button>
          </article>
          `;
    });
  };


document.addEventListener("click", ({target}) => {
    if (target.classList.contains('btnShow')) {
      localStorage.setItem('idVer', JSON.stringify(target.id))
      window.location.href = "../pages/details.html";
  }
    if (target.classList.contains('btnFavorites')){
        const savefav=dataFiltered.find(item => item.id==target.getAttribute('name'));
        const elementExist = favorites.some(item => item.id === savefav.id);
        if (elementExist == false){
            favorites.push(savefav);
            localStorage.setItem('favoritospage', JSON.stringify(favorites));
        }
        console.log(favorites);
    }
  });


