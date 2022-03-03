//You can edit ALL of the code here
let allShows;
let showID = 82;
let arrayOfEpisodes;
const mainEl = document.querySelector("main");
const searchBar = document.querySelector("#searchInput");
const displayNumberOfEpisodes = document.querySelector("#displayEpisodesText");
const selectEl = document.querySelector("#selectMenu");
const selectShowEl = document.querySelector("#selectShow");

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
  createSelectMenu(filteredEpisodes);
});

//Formatting name of an episode
const episodeCode = (obj) => {
  const seasonNumber = String(obj.season).padStart(2, 0);
  const episodeNumber = String(obj.number).padStart(2, 0);
  return `S${seasonNumber}E${episodeNumber}`;
};

//Select menu for shows
const defaultSelectShows = () => {
  const defaultSelectShow = document.createElement("option");
  defaultSelectShow.value = 82;
  defaultSelectShow.innerText = "Select show";
  selectShowEl.appendChild(defaultSelectShow);
};

const createSelectShows = (shows) => {
  shows.map((show) => {
    const selectOptShow = document.createElement("option");
    selectOptShow.value = `${show.id}`;
    selectOptShow.innerText = `${show.name}`;
    selectShowEl.appendChild(selectOptShow);
  });
};
selectShowEl.addEventListener("change", (e) => changeShow(e.target.value));

//Select menu for episodes
const defaultSelectEpisodes = () => {
  const defaultSelectOption = document.createElement("option");
  defaultSelectOption.value = "";
  defaultSelectOption.innerText = "Select episode";
  selectEl.appendChild(defaultSelectOption);
};

const createSelectEpisodes = (Episodes) => {
  Episodes.map((episode) => {
    const selectOptionEl = document.createElement("option");
    selectOptionEl.value = `${episode.id}`;
    selectOptionEl.innerText = `${episodeCode(episode)} - ${episode.name}`;
    selectEl.appendChild(selectOptionEl);
  });
};

selectEl.addEventListener("change", (e) => {
  const idSelectedEpisode = e.target.value;
  const selectedEpisode = arrayOfEpisodes.filter((el) => {
    return el.id == idSelectedEpisode;
  });
  !idSelectedEpisode
    ? loadEpisodes(arrayOfEpisodes)
    : loadEpisodes(selectedEpisode);
});

//creating episode
const createEpisodeElement = (episode) => {
  const episodeBox = document.createElement("li");
  episodeBox.id = episode.id;
  episodeBox.classList.add("episodeBox");
  const h2Box = document.createElement("div");
  const h2El = document.createElement("h2");
  h2Box.classList.add("h2BoxStyle");
  h2El.innerText = `${episode.name} - ${episodeCode(episode)}`;
  h2Box.appendChild(h2El);
  episodeBox.appendChild(h2Box);
  const imageBox = document.createElement("div");
  const img = document.createElement("img");
  if (episode.image === null) img.src = "/img/not_found.jpg";
  else img.src = episode.image.medium;
  imageBox.appendChild(img);
  episodeBox.appendChild(imageBox);
  const descriptionEl = document.createElement("p");
  descriptionEl.classList.add("episodeDescription");
  descriptionEl.innerText = episode.summary
    .replaceAll("<p>", "")
    .replaceAll("</p>", "")
    .replaceAll("<br>", "");
  episodeBox.appendChild(descriptionEl);
  return episodeBox;
};

//rendering all episodes on the page
const loadEpisodes = (episodes) => {
  const episodeList = document.createElement("ul");
  episodeList.classList.add("grid");
  episodes.forEach((episode) =>
    episodeList.appendChild(createEpisodeElement(episode))
  );
  mainEl.innerHTML = "";
  mainEl.appendChild(episodeList);
  displayNumberOfEpisodes.innerText = `Displaying ${episodes.length}/${arrayOfEpisodes.length} episodes`;
};

//Load API for episodes
const getAllEpisodesFromAPI = async (showID) =>
  fetch(`https://api.tvmaze.com/shows/${showID}/episodes`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));

const changeShow = async (showID) => {
  selectEl.innerHTML = "";
  defaultSelectEpisodes();
  arrayOfEpisodes = await getAllEpisodesFromAPI(showID);
  loadEpisodes(arrayOfEpisodes);
  createSelectEpisodes(arrayOfEpisodes);
};

//default page load
const setup = async () => {
  arrayOfEpisodes = await getAllEpisodesFromAPI(showID);
  allShows = getAllShows();
  loadEpisodes(arrayOfEpisodes);
  defaultSelectShows();
  defaultSelectEpisodes();
  createSelectShows(allShows);
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
