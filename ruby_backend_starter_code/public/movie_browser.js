// API Docs at:
// http://www.omdbapi.com

$(function(){
  console.log("running");

  var $searchField = $("#movie-search");
  var $selectField = $("#movie-select");
  var $submitButton = $("#search input").eq(1);
  $submitButton.on('click', function(event){
    event.preventDefault();
    var searchValue = $searchField.val();
    $.ajax({
      url: "http://www.omdbapi.com/?s=" + searchValue,
      dataType: "json"
    }).done(function(data){
      var movies = data["Search"];
      $selectField.removeClass("hidden");
      options = "<option value='x'>Movies matching " +  searchValue + "</option>";
      for(var i = 0; i < movies.length; i++){
        var option = '<option value="' + movies[i]["imdbID"] + '">' + movies[i]["Title"] + '</option>';
        options += option;
      }
      $selectField.html(options);
    });
  });

  $selectField.on('change', function(event){
    var movieID = $(this).val();
    $.ajax({
      url: "http://www.omdbapi.com/?i=" + movieID,
      dataType: "json"
    }).done(function(data){
      $("#movie-detail").html('');
      var $title = $("<h1>" + data["Title"] + "</h1>");
      var poster = data["Poster"];
      var $img = $('<img src="' + poster + '">');
      $("#movie-detail").append($title);
      $("#movie-detail").append($img);
    });
  });

});
