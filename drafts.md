//   for (i = 0; i < Episodes.length; i++) {
//     let episodeBox = document.createElement("div");
//     episodeBox.id = Episodes[i].id;
//     episodeBox.classList.add("episodeBox");
//     let h2Box = document.createElement("div");
//     let h2El = document.createElement("h2");
//     h2Box.classList.add("h2BoxStyle");
//     h2El.innerText = episodeName(Episodes[i]);
//     h2Box.appendChild(h2El);
//     episodeBox.appendChild(h2Box);
//     let imageBox = document.createElement("div");
//     let img = document.createElement("img");
//     img.src = Episodes[i].image.medium;
//     imageBox.appendChild(img);
//     episodeBox.appendChild(imageBox);
//     let descriptionEl = document.createElement("p");
//     descriptionEl.classList.add("episodeDescription");
//     descriptionEl.innerText = Episodes[i].summary
//       .replaceAll("<p>", "")
//       .replaceAll("</p>", "")
//       .replaceAll("<br>", "");
//     episodeBox.appendChild(descriptionEl);
//     mainEl.appendChild(episodeBox);
//   }
// }
