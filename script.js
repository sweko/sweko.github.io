var server = "https://api.themoviedb.org/3/";
var apiKey = '93f8a606fa691c5c01dacbfef318a0bb';
var searchEnpoint = "search/movie";
var search = function (value) {
    var xhr = new XMLHttpRequest();
    var url = server + "search/movie?api_key=" + apiKey + "&query=" + value;
    xhr.open('GET', url);
    xhr.onload = function () {
        var data = JSON.parse(this.response);
        if (data.results.length !== 0) {
            var resultMovie_1 = data.results[0];
            console.log(resultMovie_1);
            console.log("Getting data for the movie");
            var movieXhr = new XMLHttpRequest();
            var movieUrl = server + "movie/" + resultMovie_1.id + "?api_key=" + apiKey;
            movieXhr.open('GET', movieUrl);
            movieXhr.onload = function () {
                var movieData = JSON.parse(this.response);
                console.log(movieData);
                console.log("Getting people for the movie");
                var peopleXhr = new XMLHttpRequest();
                var peopleUrl = server + "movie/" + resultMovie_1.id + "/credits?api_key=" + apiKey;
                peopleXhr.open('GET', peopleUrl);
                peopleXhr.onload = function () {
                    var data = JSON.parse(this.response);
                    console.log(data);
                    data.cast.sort(function (f, s) { return f.order - s.order; });
                    var mainActors = data.cast.slice(0, 6);
                    var characters = mainActors.map(function (actor) { return ({
                        name: actor.character,
                        actor: actor.name,
                        image: actor.profile_path
                    }); });
                    var directors = data.crew
                        .filter(function (person) { return person.department === "Directing" && person.job === "Director"; })
                        .map(function (person) { return person.name; });
                    var directedBy = directors.join(" & ");
                    var writers = data.crew
                        .filter(function (person) { return person.department === "Writing" && person.job === "Writer"; })
                        .map(function (person) { return person.name; });
                    var writtenBy = writers.join(" & ");
                    var movie = {
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
                    };
                    showResults(movie);
                };
                peopleXhr.send();
            };
            movieXhr.send();
        }
        else {
            console.log("not Found");
        }
    };
    xhr.send();
};
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("search").addEventListener("click", function () {
        var movieInput = document.getElementById("title");
        var movieTitle = movieInput.value;
        search(movieTitle);
    });
    document.getElementById("title").addEventListener("keyup", function (event) {
        if (event.key !== "Enter") {
            return;
        }
        document.getElementById("search").click();
        event.preventDefault();
    });
});
