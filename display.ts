const getCastElements = (movie: Movie) => movie.characters.map(character => {
      const image = character.image
        ? `<img src="http://image.tmdb.org/t/p/w185/${character.image}" class="image" />`
        : `<img src="https://via.placeholder.com/185x277.png?text=No+Image" class="image" />`;

      return `<div class="character">
        ${image}
        <div class="actor">${character.actor} <br /> as ${character.name}</div>
    </div>`;
}).join("");

const getRuntime = ({ runtime }: Movie) => {
  if (!runtime) {
    // do not display the runtime field if we don't know the runtime
    return "";
  }

  if (runtime < 60) {
    return `<div class="runtime"><strong>Run time: </strong>${runtime}min`;
  }
  const hours = (runtime / 60) | 0;
  const minutes = runtime % 60;
  return `<div class="runtime"><strong>Run time: </strong>${hours}h ${minutes}min`;
};

const showResults = (movie: Movie) => {
  const backdropUrl = `http://image.tmdb.org/t/p/w1280/${movie.backdropUrl}`;
  document.body.style.backgroundImage = `url('${backdropUrl}')`;

  const result = document.getElementById("result");
  result.innerHTML = `<div class="main-part">
        <div class="title">${movie.title} (${movie.releaseDate.getFullYear()})</div>
        <img src="http://image.tmdb.org/t/p/w500/${movie.posterUrl}" class="poster" />
        <div class="tagline">${movie.tagline}</div>
    </div>
    <div class="details-part">
        <div class="overview"><strong>Plot summary: </strong>${movie.overview}</div>
        <div class="director"><strong>Directed By: </strong>${movie.directedBy}</div>
        <div class="screenplay"><strong>Written By: </strong>${movie.writenBy}</div>
        ${getRuntime(movie)}
        <div class="cast">
            <div><strong>Starring:</strong></div>
            ${getCastElements(movie)}
        </div>
    </div>`;
};