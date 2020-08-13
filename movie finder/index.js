// http://www.omdbapi.com/?i=tt3896198&apikey=
//http://www.omdbapi.com/?apikey=132e9d6b&t=frozen

var search = document.getElementById("search");
var button = document.getElementById("button");
var div1 = document.getElementById("div1");
var httpReq = new XMLHttpRequest();

httpReq.onload = function () {
    if (httpReq.readyState === XMLHttpRequest.DONE) {
        if (httpReq.status === 200) {
            var movie = JSON.parse(httpReq.responseText);
            console.log(httpReq.responseText)
            console.log(typeof movie)

            movie.Search.forEach(function (item) {
                var divtoadd = document.createElement("div");
                divtoadd.setAttribute("class", "col-lg-3 new-div")
                div1.appendChild(divtoadd)
                var title = document.createElement("div");
                title.setAttribute("class", "title");
                divtoadd.appendChild(title)
                var year = document.createElement("div");
                year.setAttribute("class", "year")
                divtoadd.appendChild(year)

                var link = document.createElement("a");
                link.innerHTML = item.Title
                link.setAttribute("href", "https://www.imdb.com/title/" + item.imdbID + "/");
                link.setAttribute("target", "_blank")


                var poster = document.createElement("div");
                poster.setAttribute("class", "poster")
                var image = document.createElement("img");
                image.setAttribute("class", "img-fluid img-thumbnail")
                poster.appendChild(image)

                divtoadd.appendChild(poster)


                title.appendChild(link);
                year.innerHTML = item.Year;
                if (item.Poster === "N/A") {
                    poster.innerHTML = "<img class='img-fluid' src=no-image.jpg>"
                } else {
                    image.src = item.Poster;
                }
            })

        } else {
            console.log(httpReq.statusText)
        }
    }
    httpReq.onerror = function () {
        console.log(httpReq.statusText)
    }
}

var searchMovie = function () {


    httpReq.open("GET", "https://www.omdbapi.com/?s=" + search.value + "&plot=short&r=json&apikey=b7da8d63")
    httpReq.send();
    search.value = "";

}

button.onclick = function () {
    console.log(div1.getElementsByTagName("div").length);
    if (div1.getElementsByTagName("div").length > 0) {
        div1.innerHTML = "";
    }
    searchMovie();

}

window.addEventListener("keyup", function (event) {
    if (event.keyCode === 13 && search.value !== "") {
        if (div1.getElementsByTagName("div").length > 0) {
            div1.innerHTML = "";
        }
        searchMovie();

    }
})