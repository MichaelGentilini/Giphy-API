$('document').ready(function () {

  // ** Setup Arrray with superheroes as well as other variables

  var apiKey = "Fwr04TmIc9MBh8A8LAoH3pl7772huS0Z";



  var superheroes = ["superman", "thor", "wonder woman", "captain america", "captain marvel", "green arrow", "wolverine", "hulk", "spider-man", "aquaman", "batman", "iron man", "daredevil", "green lantern", "iron fist", "ant-man", "cat woman"];
  var currentSuperHero = '';

  var newSuperHero = [];

  console.log(newSuperHero);
  console.log(currentSuperHero);

  var startBtn = function () {
    //! Dynamic superhero BUTTONS to start
    for (let j = 0; j < superheroes.length; j++) {
      var index = j;
      // console.log(index);
      var superBtn = $('<button>');
      superBtn.addClass('btn btn-primary btn-lg heroButton');
      superBtn.attr('value', superheroes[j]);
      superBtn.attr('id', 'superButton');
      superBtn.text(superheroes[j]);
      superBtn.appendTo('.empty-buttons');

    }

    $(".heroButton").click(function (event) {
      currentSuperHero = $(this).val();
      console.log('this button says ' + currentSuperHero);

    });
  }

  $("#submitNewHero").on('click', function (value) {
    console.log('just pushed a button');
    value.preventDefault();
    var newHero = $('#newHero').val().trim();


    superheroes.push(newHero);
    alert(newHero);
    // newHero.appendTo('.empty-buttons');
    $('.empty-buttons').empty();

    startBtn();
    return false;
  });

  startBtn();


  $(".heroButton").on("click", function () {
    console.log('this button says' + superheroes);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + currentSuperHero + "&api_key=" + apiKey + "&limit=6";
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function (response) {
        // newURL = queryURL
        console.log(queryURL);
        var results = response.data;
        console.log(results.rating);

        var superDiv = $("<div>");
        superDiv.addClass("row");
        for (var i = 0; i < results.length; i++) {

          $(".images").empty();


          var colHolder = $("<div>");
          colHolder.addClass("col-lg-4");

          // var gifHolder = $("<div>");
          // gifHolder.addClass("gif-holder");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);
          p.addClass("rating");

          var superImage = $("<img>");
          superImage.attr("src", results[i].images.fixed_width.url);


          colHolder.append(p, superImage)
          // colHolder.append(gifHolder);
          superDiv.append(colHolder);
          // superDiv.prepend(superImage);


          $(".images").prepend(superDiv);

        }

      });



  });

});