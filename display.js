var getCastElements = function (movie) { return movie.characters.map(function (character) {
    var image = character.image
        ? "<img src=\"http://image.tmdb.org/t/p/w185/" + character.image + "\" class=\"image\" />"
        : "<img src=\"https://via.placeholder.com/185x277.png?text=No+Image\" class=\"image\" />";
    return "<div class=\"character\">\n        " + image + "\n        <div class=\"actor\">" + character.actor + " <br /> as " + character.name + "</div>\n    </div>";
}).join(""); };
var getRuntime = function (_a) {
    var runtime = _a.runtime;
    if (!runtime) {
        // do not display the runtime field if we don't know the runtime
        return "";
    }
    if (runtime < 60) {
        return "<div class=\"runtime\"><strong>Run time: </strong>" + runtime + "min";
    }
    var hours = (runtime / 60) | 0;
    var minutes = runtime % 60;
    return "<div class=\"runtime\"><strong>Run time: </strong>" + hours + "h " + minutes + "min";
};
var showResults = function (movie) {
    var backdropUrl = "http://image.tmdb.org/t/p/w1280/" + movie.backdropUrl;
    document.body.style.backgroundImage = "url('" + backdropUrl + "')";
    var result = document.getElementById("result");
    result.innerHTML = "<div class=\"main-part\">\n        <div class=\"title\">" + movie.title + " (" + movie.releaseDate.getFullYear() + ")</div>\n        <img src=\"http://image.tmdb.org/t/p/w500/" + movie.posterUrl + "\" class=\"poster\" />\n        <div class=\"tagline\">" + movie.tagline + "</div>\n    </div>\n    <div class=\"details-part\">\n        <div class=\"overview\"><strong>Plot summary: </strong>" + movie.overview + "</div>\n        <div class=\"director\"><strong>Directed By: </strong>" + movie.directedBy + "</div>\n        <div class=\"screenplay\"><strong>Written By: </strong>" + movie.writenBy + "</div>\n        " + getRuntime(movie) + "\n        <div class=\"cast\">\n            <div><strong>Starring:</strong></div>\n            " + getCastElements(movie) + "\n        </div>\n    </div>";
};
