const server = "https://api.themoviedb.org/3/";
const apiKey = '93f8a606fa691c5c01dacbfef318a0bb';

const searchEnpoint = "search/movie"

const search = (value: string) => {
    const xhr = new XMLHttpRequest();
    const url = `${server}search/movie?api_key=${apiKey}&query=${value}`;

    xhr.open('GET', url);

    xhr.onload = function() {
        const data = JSON.parse(this.response) as SearchResult;
        if (data.results.length !== 0) {
            const resultMovie = data.results[0];
            console.log(resultMovie);
            console.log("Getting data for the movie");
            const movieXhr = new XMLHttpRequest();
            const movieUrl = `${server}movie/${resultMovie.id}?api_key=${apiKey}`;

            movieXhr.open('GET', movieUrl);
            movieXhr.onload = function () {
                const movieData: MovieResult = JSON.parse(this.response);
                console.log(movieData);
                console.log("Getting people for the movie");
                const peopleXhr = new XMLHttpRequest();
                const peopleUrl = `${server}movie/${resultMovie.id}/credits?api_key=${apiKey}`;
    
                peopleXhr.open('GET', peopleUrl);
                peopleXhr.onload = function () {
                    const data = JSON.parse(this.response) as PeopleResult;
                    console.log(data);
                    data.cast.sort((f, s) => f.order - s.order);
                    const mainActors = data.cast.slice(0, 6);
                    const characters :Character[] = mainActors.map(actor => ({
                        name: actor.character,
                        actor: actor.name,
                        image: actor.profile_path
                    }))

                    const directors = data.crew
                        .filter(person => person.department === "Directing" && person.job === "Director")
                        .map(person => person.name)
                    const directedBy = directors.join(" & ");

                    const writers = data.crew
                        .filter(person => person.department === "Writing" && person.job === "Writer")
                        .map(person => person.name);
                    const writtenBy = writers.join(" & ");

                    const movie: Movie = {
                        id: movieData.id,
                        title: movieData.title,
                        tagline: movieData.tagline,
                        releaseDate: new Date(movieData.release_date),
                        posterUrl: movieData.poster_path,
                        backdropUrl: movieData.backdrop_path,
                        overview: movieData.overview,
                        runtime: movieData.runtime,
                        characters: characters,
                        directedBy: directedBy,
                        writenBy: writtenBy
                    }

                    showResults(movie);
                }
                peopleXhr.send();
            }

            movieXhr.send();
        } else {
            console.log("not Found");
        }
    }

    xhr.send();
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search").addEventListener("click", () => {
      const movieInput = document.getElementById("title") as HTMLInputElement;
      const movieTitle = movieInput.value;
      search(movieTitle);
    });

    document.getElementById("title").addEventListener("keyup", (event) => {
      if (event.key !== "Enter") {
        return;
      }
      document.getElementById("search").click();
      event.preventDefault();
    });
});