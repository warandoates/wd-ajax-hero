/*jshint esversion: 6 */
(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');
      $poster.attr({
        src: movie.poster,
        alt: `${movie.Poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE
  let search = document.getElementById("search");
  let searchBtn = document.getElementsByTagName("form")[0];
  let input = document.getElementsByTagName('input')[0];
  input.required = true;
  searchBtn.addEventListener("submit",(evt) => {
    evt.preventDefault();
    let searchVal = search.value;
    fetching(searchVal);
  });

  function fetching(searchVal) {
    return fetch(`http://www.omdbapi.com/?s=${searchVal}`)
    .then((responseObj) => responseObj.json()
    )
    .then((jsonObj) => {
      if(movies.length > 0) {
        movies.splice(0, movies.length);
      }
      const movieSel = jsonObj.Search;
        for (let selection of movieSel) {
          movies.push({id: selection.imdbID, poster: selection.Poster, title: selection.Title, year: selection.Year});
        }
        search.value = '';
      renderMovies();
    });
  }
})();
