$("document").ready(function () {
  // ** Setup Arrray with superheroes as well as other variables

  var apiKey = "Fwr04TmIc9MBh8A8LAoH3pl7772huS0Z";

  var superheroes = [
    "superman",
    "thor",
    "wonder woman",
    "captain america",
    "captain marvel",
    "green arrow",
    "wolverine",
    "hulk",
    "spider man",
    "aquaman",
    "batman",
    "iron man",
    "daredevil",
    "green lantern",
    "iron fist",
    "cat woman"
  ];
  // var currentSuperHero = "";
  var newSuperHero = [];

  var startBtn = function () {

    $(".empty-buttons").empty();

    //! Dynamic superhero BUTTONS to start
    for (let j = 0; j < superheroes.length; j++) {
      var index = j;
      // console.log(index);
      var superBtn = $("<button>");
      superBtn.addClass("btn btn-primary btn-lg heroButton");
      superBtn.attr("value", superheroes[j]);
      superBtn.attr("id", "superButton");
      superBtn.text(superheroes[j]);
      $(".empty-buttons").append(superBtn);
    }

    // * function which grabs displays passes the button value to the API*
    $(".heroButton").click(function (event) {
      currentSuperHero = $(this).val();
    });
  };

  // * function for additional buttons button name *
  $("#submitNewHero").on("click", function (event) {
    event.preventDefault();

    var newHero = $("#newHero").val().trim();
    superheroes.push(newHero);
    startBtn();
  });

  // * API call which creates the GIFs based on the currentSuperHero *

  function createGif() {
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      currentSuperHero +
      "&api_key=" +
      apiKey +
      "&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      // newURL = queryURL
      var results = response.data;

      var superDiv = $("<div>");
      superDiv.addClass("row");
      for (var i = 0; i < results.length; i++) {
        // empty images container
        $(".images").empty();

        // create a div with a column for the images
        var colHolder = $("<div>");
        colHolder.addClass("col-lg-3");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);
        p.addClass("rating");

        var superImage = $("<img>");
        superImage.attr("src", results[i].images.fixed_width.url);

        // append image and rating to the column, div, and container
        colHolder.append(p, superImage);
        superDiv.append(colHolder);
        $(".images").prepend(superDiv);

      }
    });
  }
  startBtn();
  $(document).on("click", ".heroButton", createGif);
});