//You can edit ALL of the code here
let arrayOfEpisodes = getAllEpisodes();
let mainEl = document.querySelector("main");
let searchBar = document.querySelector("#searchInput");
let displayNumberOfEpisodes = document.querySelector("#displayEpisodesText");
let selectEl = document.querySelector("#selectMenu");

//search bar
searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredEpisodes = arrayOfEpisodes.filter((episode) => {
    return (
      episode.summary.toLowerCase().includes(searchString) ||
      episodeName(episode).toLowerCase().includes(searchString) ||
      episode.name.toLowerCase().includes(searchString)
    );
  });
  loadEpisodes(filteredEpisodes);
  displayNumberOfEpisodes.innerText = `Displaying ${filteredEpisodes.length}/${arrayOfEpisodes.length} episodes`;
  selectMenu(filteredEpisodes);
});

//add functionality to select menu
selectEl.addEventListener("change", (e) => {
  window.location = `#${e.target.value}`;
  let allEpisodes = document.getElementsByClassName("episodeBox");
  let highlightedEl = document.getElementById(e.target.value);
  highlightedEl.style.border = "solid";
  for (let i = 0; i < allEpisodes.length; i++) {
    if (allEpisodes[i] !== highlightedEl) {
      allEpisodes[i].style.border = null;
    }
  }
});

//Formatting name of an episode
function episodeCode(obj) {
  let seasonNumber = obj.season < 10 ? `0${obj.season}` : `${obj.season}`;
  let episodeNumber = obj.number < 10 ? `0${obj.number}` : `${obj.number}`;
  return `S${seasonNumber}E${episodeNumber}`;
}

//add options in select menu
const selectMenu = (Episodes) => {
  const select = Episodes.map((episode) => {
    return `
    <option value="${episode.id}">   
      ${episodeCode(episode)} - ${episode.name}
    </option>;
`;
  }).join("");
  selectEl.innerHTML = select;
};

//add all episodes to the page
function loadEpisodes(Episodes) {
  const htmlString = Episodes.map((episode) => {
    return `
    <div id=${episode.id} class="episodeBox">
      <div>
        <h2 class="h2BoxStyle">${episode.name} - ${episodeCode(episode)}</h2>
      </div>
      <div>
        <img src=${episode.image.medium}>
      </div>
      <p class="episodeDescription">${episode.summary
        .replaceAll("<p>", "")
        .replaceAll("</p>", "")
        .replaceAll("<br>", "")}
      </p>
    </div>`;
  }).join("");
  mainEl.innerHTML = htmlString;
}

//default page display
loadEpisodes(arrayOfEpisodes);
displayNumberOfEpisodes.innerText = `Displaying ${arrayOfEpisodes.length}/${arrayOfEpisodes.length} episodes`;
selectMenu(arrayOfEpisodes);

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
