  // for (let episode of Episodes) {
  //   let episodeBox = document.createElement("div");
  //   episodeBox.id = episode.id;
  //   episodeBox.classList.add("episodeBox");
  //   let h2Box = document.createElement("div");
  //   let h2El = document.createElement("h2");
  //   h2Box.classList.add("h2BoxStyle");
  //   h2El.innerText = `${episode.name} - ${episodeCode(episode)}`;
  //   h2Box.appendChild(h2El);
  //   episodeBox.appendChild(h2Box);
  //   let imageBox = document.createElement("div");
  //   let img = document.createElement("img");
  //   img.src = episode.image.medium;
  //   imageBox.appendChild(img);
  //   episodeBox.appendChild(imageBox);
  //   let descriptionEl = document.createElement("p");
  //   descriptionEl.classList.add("episodeDescription");
  //   descriptionEl.innerText = episode.summary
  //     .replaceAll("<p>", "")
  //     .replaceAll("</p>", "")
  //     .replaceAll("<br>", "");
  //   episodeBox.appendChild(descriptionEl);
  //   mainEl.appendChild(episodeBox);
  // }

  //  window.location = `#${e.target.value}`;
  //  let allEpisodes = document.getElementsByClassName("episodeBox");
  //  let highlightedEl = document.getElementById(e.target.value);
  //  highlightedEl.style.border = "solid";
  //  for (let i = 0; i < allEpisodes.length; i++) {
  //    if (allEpisodes[i] !== highlightedEl) {
  //      allEpisodes[i].style.border = null;
  //    }
  //  }



  //      const select = Episodes.map((episode) => {
  //      return `
  //      <option value="${episode.id}">
  //        ${episodeCode(episode)} - ${episode.name}
  //      </option>;
  //  `;
  //    }).join("");
  //    selectEl.innerHTML = select;