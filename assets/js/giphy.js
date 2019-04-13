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
    "iron fist",
    "supergirl",
    "marvel girl"
  ];


  var startBtn = function () {
    $(".empty-buttons").empty();

    // * Dynamic superhero BUTTONS to start

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

    ;
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
      var results = response.data;
      console.log(response.data[0].images);

      var superDiv = $("<div>");
      superDiv.addClass("row");
      for (var i = 0; i < results.length; i++) {

        $(".images").empty();

        // ! create a div with a column for the images .. you can change the size of the images by manipulating the class
        var colHolder = $("<div>");
        colHolder.addClass("col-lg-3");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);
        p.addClass("rating");

        var superImage = $("<img>");
        superImage.addClass("heroImage");
        superImage.attr("src", results[i].images.fixed_width.url);
        superImage.attr("data-still", results[i].images.fixed_width_still.url);
        superImage.attr("data-animate", results[i].images.fixed_width.url);
        superImage.attr("data-state", "animate");


        // * append image and rating to the column, div, and container
        colHolder.append(p, superImage);
        superDiv.append(colHolder);
        $(".images").prepend(superDiv);
      }

      // * This function allows for the gif animation to pause when pressed *
      $(".heroImage").on("click", function () {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");

        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });
  }

  // * API call of Wikipedia using currentSuperHero *\

  function getWiki() {

    var wikiURL =
      "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
      currentSuperHero + "comic" +
      "&format=json&callback=?";

    $.ajax({
        url: wikiURL,
        method: "GET",
        dataType: "json",
        async: false
      })
      .done(function (data) {
        var name = data[1][0];
        var info = data[2][0];
        var link = data[3][0];

        $(".info").css("visibility", "visible");
        $("#name").text(currentSuperHero);
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
      if (response.response == "success") {
        var newResponse = response.results[0];

        if ((currentSuperHero == "superman") || (currentSuperHero == "thor") || (currentSuperHero == "batman")) {
          newResponse = response.results[1];
        }

        var publisher = response.results[0].biography.publisher;
        var fullName = newResponse.biography["full-name"];
        var aliases = newResponse.biography.aliases;
        var base = newResponse.work.base;
        var gender = newResponse.appearance.gender;
        var height = newResponse.appearance.height;

        $("#real-name").html("Real Name: " + fullName);
        $("#publisher").html("Publisher: " + publisher);
        $("#gender").html("Gender: " + gender);
        $("#height").html("Height: " + height);
        $("#base-city").html("Base City: " + base);
        $("#aliases").html("Aliases: " + aliases);

      } else if (response.response == "error") {
        $("#real-name").html("<h4>We could not find this name in the superhero database. But, here is what we found in Wikipedia </h4>");
      }
    });
  }

  // ! Create buttons to start and listen for clicks
  startBtn();
  $(document).on("click", ".heroButton", getWiki);
  $(document).on("click", ".heroButton", createGif);
  $(document).on("click", ".heroButton", createhero);

});