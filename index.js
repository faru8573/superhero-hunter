// Marvel API URL format: https://gateway.marvel.com:443/v1/public/characters?ts=<time-stamp>&apikey=<public-key>&hash=<md5(ts+privateKey+publicKey)>

// API keys and timestamp for Marvel API authentication
let publicKey = "e9f999192c53e6fb11aed09efbd78cad";
let privateKey = "cb0cdda4fad3fbcf80f3394a5b8a9e32e003cd89";
let ts = new Date().getTime();
let hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
// DOM elements
const textInput = document.querySelector(".textInput");
const itemContainer = document.querySelector(".item-container");
textInput.addEventListener("keyup", async (e) => {
  e.preventDefault();
  itemContainer.innerHTML = "";

  const query = e.target.value.trim();
  console.log(query);
  if (query.length < 1) {
    window.alert("Search can not be empty!!");
  }
  if (query.length >= 3) {
    searchCharacter(query);
  }
});

async function searchCharacter(query) {
  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${query}`;
  const response = await fetch(url);
  const jsonData = await response.json();
  const data = jsonData.data.results;
  console.log(data);
  displayCharacter(data);
}

function displayCharacter(data) {
  console.log(data);
  itemContainer.innerHTML = ""; // clear previous list
  data.forEach((character) => {
    const li = document.createElement("div");
    li.classList.add("item");
    const thumbnail = `${character.thumbnail.path}.${character.thumbnail.extension}`;
    li.innerHTML = `<img src=${thumbnail} alt="No Image">
                        <p>Name: ${character.name}</p>
                        <p>Stories: ${character.stories.available}</p>
                        <p>Stories: ${character.description}</p>
                        <button class="more_info_btn" data-id="${character.id}" data-name="${character.name}" data-thumbnail="${thumbnail}" data-modified="${character.modified}" data-series="${character.series.available}" data-stories="${character.stories.available}" data-description="${character.description}" data-comic="${character.comics.available}">More-info</button>

                        <button class="add_to_fav_button" data-name="${character.name}" data-id="${character.id}">Favorite</button>`;

    itemContainer.append(li);
    //add to fav button listener
    li.querySelectorAll(".add_to_fav_button").forEach((button) => {
      button.addEventListener("click", () => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const rawFavoriteData = localStorage.getItem("favorites");
        const superHero = data.find(
          (hero) => hero.id === JSON.parse(button.getAttribute("data-id"))
        );
        // create a superhero object with relevant details
        const heroObj = {
          name: superHero.name,
          id: superHero.id,
          thumbnail: `${superHero.thumbnail.path}.${superHero.thumbnail.extension}`,
          series: `${superHero.series.available}`,
          comics: `${superHero.comics.available}`,
          story: `${superHero.stories.available}`,
          modified: `${superHero.modified}`,
          description: `${superHero.description}`,
        };

        if (!favorites.find((fav) => fav.id === heroObj.id)) {
          favorites.push(heroObj);
          localStorage.setItem("favorites", JSON.stringify(favorites));
        }
      });
    });

    // more info button listener
    li.querySelectorAll(".more_info_btn").forEach((button) => {
      button.addEventListener("click", () => {
        let charName = button.getAttribute("data-name");
        let charId = button.getAttribute("data-id");
        let charThumbnail = button.getAttribute("data-thumbnail");
        let charDescription = button.getAttribute("data-description");
        let charStories = button.getAttribute("data-stories");
        let charSeries = button.getAttribute("data-series");
        let charModified = button.getAttribute("data-modified");
        let charComics = button.getAttribute("data-comic");
        const url = `./more.html?name=${charName}&id=${charId}&thumbnail=${charThumbnail}&description=${charDescription}&stories=${charStories}&series=${charSeries}&modified=${charModified}&comic=${charComics}`;
        window.location.assign(url);
      });
    });
  });
}
