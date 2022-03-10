let allShows;
let arrayOfEpisodes;
const mainEl = document.querySelector("main");
const divSelectShowEl = document.querySelector("#divSelectShow");
const divSelectMenuEl = document.querySelector("#divSelectMenu");
const searchBar = document.querySelector("#searchInput");
const searchShows = document.querySelector("#searchBarShows");
const displayNumberOfEpisodes = document.querySelector("#displayEpisodesText");
const selectEl = document.querySelector("#selectMenu");
const selectShowEl = document.querySelector("#selectShow");
const allShowsBtn = document.querySelector("#allShowsBtn");
const allEpisodesBtn = document.querySelector("#allEpisodesBtn");

allShowsBtn.addEventListener("click", () => setup());

const createdShowElement = (show) => {
  const showBox = document.createElement("li");
  showBox.id = show.id;
  showBox.classList.add("showBox");
  const h2Box = document.createElement("div");
  const h2El = document.createElement("h2");
  h2Box.classList.add("h2Show");
  h2El.innerText = `${show.name}`;
  h2Box.appendChild(h2El);
  const contentBox = document.createElement("div");
  //Create box for Show main content
  contentBox.classList.add("showContentBox");
  const imageBox = document.createElement("div");
  const img = document.createElement("img");
  if (show.image == null) img.src = "/img/not_found.jpg";
  else img.src = show.image.medium;
  imageBox.appendChild(img);
  const descriptionEl = document.createElement("p");
  descriptionEl.classList.add("showDescription");
  descriptionEl.innerHTML = show.summary;
  const showDetailsBox = document.createElement("div");
  //create Show detail box
  showDetailsBox.classList.add("showDetailBox");
  const ratedParEl = document.createElement("p");
  ratedParEl.innerHTML = `<b>Rated:</b> ${show.rating.average}`;
  const genresParEl = document.createElement("p");
  genresParEl.innerHTML = `<b>Genres:</b> ${show.genres.join(" | ")}`;
  const statusParEl = document.createElement("p");
  statusParEl.innerHTML = `<b>Status:</b> ${show.status}`;
  const runtimeParEl = document.createElement("p");
  runtimeParEl.innerHTML = `<b>Runtime:</b> ${show.runtime}`;
  showDetailsBox.append(ratedParEl, genresParEl, statusParEl, runtimeParEl);
  //
  contentBox.append(img, descriptionEl, showDetailsBox);
  showBox.append(h2Box, contentBox);
  showBox.addEventListener("click", () => {
    changeShow(showBox.id);
    selectShowEl.value = showBox.id;
  });
  return showBox;
};

renderAllShowsOnPage = (shows) => {
  mainEl.innerHTML = "";
  const showList = document.createElement("ul");
  shows.forEach((show) => showList.appendChild(createdShowElement(show)));
  mainEl.innerHTML = "";
  mainEl.appendChild(showList);
  displayNumberOfEpisodes.innerText = `Displaying ${shows.length}/${allShows.length} shows`;
};

const createSelectShows = (shows) => {
  searchBar.style.display = "none";
  divSelectMenuEl.style.display = "none";
  const defaultSelectShow = document.createElement("option");
  defaultSelectShow.innerText = "Select Shows";
  defaultSelectShow.value = "all";
  selectShowEl.appendChild(defaultSelectShow);
  shows.map((show) => {
    const selectOptShow = document.createElement("option");
    selectOptShow.value = `${show.id}`;
    selectOptShow.innerText = `${show.name}`;
    selectShowEl.appendChild(selectOptShow);
  });
};

selectShowEl.addEventListener("change", (e) => {
  if (e.target.value === "all") setup();
  else changeShow(e.target.value);
});

const createSearchShows = () => {
  allEpisodesBtn.style.display = "none";
  searchShows.style.display = "block";
  searchShows.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase().trim();
    const filteredShows = allShows.filter((show) => {
      return (
        show.summary.toLowerCase().includes(searchString) ||
        show.name.toLowerCase().includes(searchString)
      );
    });
    renderAllShowsOnPage(filteredShows);
    createSelectShows(filteredShows);
  });
};

//search bar Episodes
const createSearchEpisodes = () => {
  allEpisodesBtn.style.display = "block";
  searchShows.style.display = "none";
  searchBar.style.display = "block";
  searchBar.addEventListener("input", (e) => {
    const searchString = e.target.value.toLowerCase().trim();
    const filteredEpisodes = arrayOfEpisodes.filter((episode) => {
      return (
        episode.summary.toLowerCase().includes(searchString) ||
        episodeCode(episode).toLowerCase().includes(searchString) ||
        episode.name.toLowerCase().includes(searchString)
      );
    });
    loadEpisodes(filteredEpisodes);
    createSelectEpisodes(filteredEpisodes);
  });
};

//Formatting name of an episode
const episodeCode = (obj) => {
  const seasonNumber = String(obj.season).padStart(2, 0);
  const episodeNumber = String(obj.number).padStart(2, 0);
  return `S${seasonNumber}E${episodeNumber}`;
};

//Select menu for episodes
const createSelectEpisodes = (Episodes) => {
  divSelectMenuEl.style.display = "block";
  selectEl.innerHTML = "";
  const defaultSelectOption = document.createElement("option");
  defaultSelectOption.value = "";
  defaultSelectOption.innerText = "Select episodes";
  selectEl.appendChild(defaultSelectOption);
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
  const imageBox = document.createElement("div");
  const img = document.createElement("img");
  if (episode.image === null) img.src = "/img/not_found.jpg";
  else img.src = episode.image.medium;
  imageBox.appendChild(img);
  const descriptionEl = document.createElement("p");
  descriptionEl.classList.add("episodeDescription");
  descriptionEl.innerHTML = episode.summary;
  episodeBox.append(h2Box, imageBox, descriptionEl);
  return episodeBox;
};

//rendering all episodes on the page
const loadEpisodes = (episodes) => {
  mainEl.innerHTML = "";
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

const getAllEpisodesFromAPI = (showID) =>
  fetch(`https://api.tvmaze.com/shows/${showID}/episodes`)
    .then((response) => response.json())
    .then((data) => {
      arrayOfEpisodes = data;
      loadEpisodes(data);
      createSelectEpisodes(data);
      createSearchEpisodes();
    })
    .catch((err) => console.log(err));

const changeShow = (showID) => {
  selectEl.innerHTML = "";
  getAllEpisodesFromAPI(showID);
  allEpisodesBtn.addEventListener("click", () => {
    getAllEpisodesFromAPI(showID);
  });
};

//default page load
const setup = () => {
  allShows = getAllShows();
  renderAllShowsOnPage(allShows);
  createSelectShows(allShows);
  createSearchShows();
  
};

window.onload = setup;
