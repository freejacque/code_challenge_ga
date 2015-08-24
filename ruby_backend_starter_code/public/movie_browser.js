// API Docs at:
// http://www.omdbapi.com

var domReady = function(callback) {
  document.readyState === "interactive" || document.readyState === "complete" ?
  callback() : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function(){
  console.log("running");
  var titleSearchField = document.getElementById("movie-search");
  var imdbSearchField = document.getElementById("imdb-id-search");
  var submitButton = document.getElementById("search-submit");
  submitButton.onclick = function(){
    var r = new XMLHttpRequest();
    var searchValue = titleSearchField.value;
    var searchValueID = imdbSearchField.value;
    if (searchValue != ""){
      r.open("GET", "http://www.omdbapi.com/?s=" + searchValue, true);
      alert(searchValue);
    } else if (searchValueID != "") {
      r.open("GET", "http://www.omdbapi.com/?i" + searchValueID, true);
      alert(searchValueID + " imdb");
    }
    // var data = JSON.parse(r.responseText);
    r.onload = function() {
      if (r.status >= 200 && r.status < 400) {
        var data = JSON.parse(r.responseText);
        alert(data);
        alert("success");
      } else {
        alert("no idea what this should be");
      }
    };
    // r.onerror = function() {
    //   alert("error");
    // };

    // alert(data);
    r.send();
  };
});
