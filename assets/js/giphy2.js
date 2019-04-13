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
    "spider-man",
    "aquaman",
    "batman",
    "iron man",
    "daredevil",
    "green lantern",
    "iron fist",
    "cat woman"
  ];


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

    var newHero = $("#newHero")
      .val()
      .trim();
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
        superImage.addClass("heroImage");
        superImage.attr("src", results[i].images.fixed_width.url);

        // * append image and rating to the column, div, and container
        colHolder.append(p, superImage);
        superDiv.append(colHolder);
        $(".images").prepend(superDiv);
      }
    });
  }

  // * API call of Wikipedia using currentSuperHero *\

  function getWiki() {

    var wikiURL =
      "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
      currentSuperHero + "comic" +
      "&format=json&callback=?";

    console.log(wikiURL);
    $.ajax({
        url: wikiURL,
        method: "GET",
        dataType: "json",
        async: false
      })
      .done(function (data) {
        console.log(wikiURL);
        var name = data[1][0];
        var info = data[2][0];
        var link = data[3][0];

        console.log("wiki" + data);
        $(".info").css("visibility", "visible");
        $("#name").text(name);
        $("#info").html(info);
        $("#link").html("<a href =" + link + ">" + link + "</a>");
      })
      .fail(function () {
        console.log("couldn't find anything");
      });
  }

  // * API call of SuperHeroAPI *\

  function createhero() {
    var heroURL =
      "http://www.superheroapi.com/api.php/517817718750245/search/" + currentSuperHero;

    $.ajax({
      url: heroURL,
      method: "GET",
    }).done(function (response) {

      console.log(response);


      if (response.response == "success") {
        // $(".superinfo").empty();
        var newResponse = response.results[0];

        if ((currentSuperHero == "superman") || (currentSuperHero == "thor")) {
          newResponse = response.results[1];
        }

        var publisher = response.results[0].biography.publisher;
        var fullName = newResponse.biography["full-name"];
        var aliases = newResponse.biography.aliases;
        var base = newResponse.work.base;
        var gender = newResponse.appearance.gender;
        var height = newResponse.appearance.height;


        // $(".superAPI").css("visibility", "visible");
        $("#real-name").html("real name: " + fullName);
        $("#publisher").html("Publisher: " + publisher);
        $("#gender").html("Gender: " + gender);
        $("#height").html("Height: " + height);
        $("#base-city").html("Base City: " + base);
        $("#aliases").html("Aliases: " + aliases);


      } else if (response.response == "error") {
        $(".superinfo").empty();
        $(".superAPI").css("visibility", "hidden");
      }
    });
  }
  startBtn();
  $(document).on("click", ".heroButton", getWiki);
  $(document).on("click", ".heroButton", createGif);
  $(document).on("click", ".heroButton", createhero);
});