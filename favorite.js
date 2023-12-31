// DOM elements
const container = document.querySelector(".item-container");
const noFavMsgContainer = document.querySelector(".no-favorite-msg-container");
const favoritesContainer = document.querySelector(".item-container");

// event listener jab pura page load ho tab
document.addEventListener("DOMContentLoaded", function () {
  console.log("local data " + localStorage.getItem("favorites"));
  // retrieve data from local storage
  var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  console.log(favorites.length);
  console.log(favorites);

  if (favorites.length === 0) {
    noFavMsgContainer.style.display = "flex";
  } else {
    // display favorites
    favorites.forEach((data) => {
      const card = document.createElement("div");
      card.classList.add("item");
      console.log(data);

      card.innerHTML = `<img src="${data.thumbnail}" alt="">
                                <p>Name: ${data.name}</p>
                                <p>ID: ${data.id}</p>                        
                                <p>Series: ${data.series}</p>
                                <p>Comic: ${data.comics}</p>
                                <div class="button-group">
                                <button class="more-detail" data-id="${data.id}" >more detail</button>
                                <button class="remove-favorites" data-id="${data.id}">remove</button>
                                </div>
                                `;

      favoritesContainer.append(card);

      //more detail button
      card.querySelectorAll(".more-detail").forEach((moreInfoBtn) => {
        moreInfoBtn.addEventListener("click", () => {
          let favid = moreInfoBtn.getAttribute("data-id");
          console.log(favid);
          let url = `./more.html?name=${data.name}&id=${data.id}&series=${
            data.series
          }&comics=${data.comics}&thumbnail=${data.thumbnail}&story=${
            data.story
          }&description=${
            data.description.length === 0 ? "No description" : data.description
          }&modified=${data.modified}`;
          window.location.assign(url);
        });
      });

      // remove favorite
      card.querySelectorAll(".remove-favorites").forEach((removeBtn) => {
        removeBtn.addEventListener("click", () => {
          let removeBtnId = JSON.parse(removeBtn.getAttribute("data-id"));
          const index = favorites.findIndex(
            (favorite) => favorite.id === removeBtnId
          );
          console.log(index); // 0
          if (index !== -1) {
            favorites.splice(index, 1);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            card.remove();
            window.location.reload();
          }
        });
      });
    });
  }


});