const publicKey = "698b653a7a1eee859df62e7571defd4a";
const privateKey = "fc511e4a77d76be92dc9ae701d2976a9e5c48988";

const timestamp = Date.now();
const hash = md5(timestamp + privateKey + publicKey);

const characterListElement = document.querySelector("#character-list");

fetch(`https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`)
  .then(response => response.json())
  .then(response => {
    const characters = response.data.results;

    characters.forEach(character => {
      const characterElement = document.createElement("li");
      characterElement.classList.add("character-item");

      const thumbnailUrl = `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`;
      const thumbnailElement = document.createElement("img");
      thumbnailElement.src = thumbnailUrl;

      const nameElement = document.createElement("h2");
      nameElement.textContent = character.name;

      characterElement.appendChild(thumbnailElement);
      characterElement.appendChild(nameElement);
      characterListElement.appendChild(characterElement);
    });
  });
