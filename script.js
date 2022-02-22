//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
let mainEl = document.querySelector("main");

function episodeName(obj) {
  let title = obj.name;
  let seasonNumber = obj.season < 10 ? `0${obj.season}` : `${obj.season}`;
  let episodeNumber = obj.number < 10 ? `0${obj.number}` : `${obj.number}`;
  return `${title} - S${seasonNumber}E${episodeNumber}`;
}
//add all episodes to the page
for (i = 0; i < allEpisodes.length; i++) {
  let episodeBox = document.createElement("div");
  episodeBox.id = allEpisodes[i].id;
  episodeBox.classList.add("episodeBox");
  let h2Box = document.createElement("div");
  let h2El = document.createElement("h2");
  h2Box.classList.add("h2BoxStyle");
  h2El.innerText = episodeName(allEpisodes[i]);
  h2Box.appendChild(h2El);
  episodeBox.appendChild(h2Box);
  let imageBox = document.createElement("div");
  let img = document.createElement("img");
  img.src = allEpisodes[i].image.medium;
  imageBox.appendChild(img);
  episodeBox.appendChild(imageBox);
  let descriptionEl = document.createElement("p");
  descriptionEl.classList.add("episodeDescription");
  descriptionEl.innerText = allEpisodes[i].summary.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "");
  episodeBox.appendChild(descriptionEl);
  mainEl.appendChild(episodeBox);
}

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
