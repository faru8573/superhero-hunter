document.addEventListener("DOMContentLoaded", function () {
  

  const urlParam = new URLSearchParams(window.location.search);
  const name = urlParam.get("name")
  const id = urlParam.get("id")
  const thumbnail = urlParam.get("thumbnail")
  const description = urlParam.get("description")
  const stories = urlParam.get("stories")
  const series = urlParam.get("series")
  const modified = urlParam.get("modified")
  const comic = urlParam.get("comic")


  const itemContainer = document.querySelector(".item-container");
  const div = document.createElement('div')
  div.classList.add("item");
  div.innerHTML = `<img src="${thumbnail}" alt="">
                    <p>Name: ${name}</p>
                    <p>ID: ${id} </p>
                    <p>Description: ${description.length === 0 ? "Description not available" : description}</p>
                    <p>Series: ${series}</p>
                    <p>Comic: ${comic}</p>
                    <p>Modified: ${modified}</p>
                    <p>Story: ${stories}</p>`
  

                    itemContainer.appendChild(div)
});