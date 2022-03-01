//You can edit ALL of the code here
let arrayOfEpisodes;
let mainEl = document.querySelector("main");
let searchBar = document.querySelector("#searchInput");
let displayNumberOfEpisodes = document.querySelector("#displayEpisodesText");
let selectEl = document.querySelector("#selectMenu");

//search bar
searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase().trim();
  const filteredEpisodes = arrayOfEpisodes.filter((episode) => {
    return (
      episode.summary.toLowerCase().includes(searchString) ||
      episodeCode(episode).toLowerCase().includes(searchString) ||
      episode.name.toLowerCase().includes(searchString)
    );
  });
  loadEpisodes(filteredEpisodes);
  selectMenu(filteredEpisodes);
});

//add functionality to select menu
selectEl.addEventListener("change", (e) => {
  let idSelectedEpisode = e.target.value;
  let selectedEpisode = arrayOfEpisodes.filter((el) => {
    return el.id == idSelectedEpisode;
  });
  !idSelectedEpisode
    ? loadEpisodes(arrayOfEpisodes)
    : loadEpisodes(selectedEpisode);
});

//Formatting name of an episode
function episodeCode(obj) {
  let seasonNumber = String(obj.season).padStart(2, 0);
  let episodeNumber = String(obj.number).padStart(2, 0);
  return `S${seasonNumber}E${episodeNumber}`;
}

//add options in select menu

let defaultSelectOption = document.createElement("option");
defaultSelectOption.value = "";
defaultSelectOption.innerText = "Select episode";
selectEl.appendChild(defaultSelectOption);
const selectMenu = (Episodes) => {
  Episodes.map((episode) => {
    let selectOptionEl = document.createElement("option");
    selectOptionEl.value = `${episode.id}`;
    selectOptionEl.innerText = `${episodeCode(episode)} - ${episode.name}`;
    selectEl.appendChild(selectOptionEl);
  });
};

function createdEpisodeElement(episode) {
  let episodeBox = document.createElement("li");
  episodeBox.id = episode.id;
  episodeBox.classList.add("episodeBox");
  let h2Box = document.createElement("div");
  let h2El = document.createElement("h2");
  h2Box.classList.add("h2BoxStyle");
  h2El.innerText = `${episode.name} - ${episodeCode(episode)}`;
  h2Box.appendChild(h2El);
  episodeBox.appendChild(h2Box);
  let imageBox = document.createElement("div");
  let img = document.createElement("img");
  img.src = episode.image.medium;
  imageBox.appendChild(img);
  episodeBox.appendChild(imageBox);
  let descriptionEl = document.createElement("p");
  descriptionEl.classList.add("episodeDescription");
  descriptionEl.innerText = episode.summary
    .replaceAll("<p>", "")
    .replaceAll("</p>", "")
    .replaceAll("<br>", "");
  episodeBox.appendChild(descriptionEl);
  return episodeBox;
}

function loadEpisodes(episodes) {
  let episodeList = document.createElement("ul");
  episodeList.classList.add("grid");
  episodes.forEach((episode) =>
    episodeList.appendChild(createdEpisodeElement(episode))
  );
  mainEl.innerHTML = "";
  mainEl.appendChild(episodeList);
  displayNumberOfEpisodes.innerText = `Displaying ${episodes.length}/${arrayOfEpisodes.length} episodes`;
}

//default page display
const getAllEpisodesFromAPI = async () =>
  fetch("https://api.tvmaze.com/shows/82/episodes")
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));

const setup = async () => {
  arrayOfEpisodes = await getAllEpisodesFromAPI();
  loadEpisodes(arrayOfEpisodes);
  selectMenu(arrayOfEpisodes);
};
window.onload = setup;

/*{
    id: 4952,
    url:
      "http://www.tvmaze.com/episodes/4952/game-of-thrones-1x01-winter-is-coming",
    name: "Winter is Coming",
    season: 1,
    number: 1,
    airdate: "2011-04-17",
    airtime: "21:00",
    airstamp: "2011-04-18T01:00:00+00:00",
    runtime: 60,
    image: {
      medium:
        "http://static.tvmaze.com/uploads/images/medium_landscape/1/2668.jpg",
      original:
        "http://static.tvmaze.com/uploads/images/original_untouched/1/2668.jpg",
    },
    summary:
      "<p>Lord Eddard Stark, ruler of the North, is summoned to court by his old friend, King Robert Baratheon, to serve as the King's Hand. Eddard reluctantly agrees after learning of a possible threat to the King's life. Eddard's bastard son Jon Snow must make a painful decision about his own future, while in the distant east Viserys Targaryen plots to reclaim his father's throne, usurped by Robert, by selling his sister in marriage.</p>",
    _links: {
      self: {
        href: "http://api.tvmaze.com/episodes/4952",
      },
    },
  };*/
