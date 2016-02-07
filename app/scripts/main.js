var App = (function($) {
  "use strict";

  function slideNav() {

    var button = $(".menu__btn"),
        menu   = $(".navigation"),
        content = $(".content"),
        link = $('.navigation__anchor');

    button.on("click", function(e) {
      e.preventDefault();
      menu.toggleClass("js-active");
      button.toggleClass("js-active");
      content.toggleClass("js-active");
    });

    link.on("click", function(e) {

      var width = isWidthLess(1120);

      if(width) {
        menu.toggleClass("js-active");
        button.toggleClass("js-active");
        content.toggleClass("js-active");
      }
    });
  }

  function isHeightMore(height) {
    if(document.documentElement.clientHeight > height) {
      return true;
    } else {
      return false;
    }
  }

  function isWidthLess(width) {
    if(window.innerWidth < width) {
      return true;
    } else {
      return false;
    }
  }

  function isWidthMore(width) {
    if(window.innerWidth > width) {
      return true;
    } else {
      return false;
    }
  }

  function addLogo() {

    var nav = $('.navigation'),
        logo = '<a href="/index.html" class="navigation__anchor navigation__anchor--logo"><img src="images/logo/logoW-100.png" class="navigation__logo" alt=""></a>';

    if(isHeightMore(500)) {
      nav.prepend(logo);
    }
  }

    //AJAX calls and navigation
  function myAjax() {
    var link = $('.navigation__anchor');

      link.on('click', function(e) {
          e.preventDefault();

          var pageUrl = $(this).attr('href'),
              myContent = $('.content');

          myContent.css('transition', 'none');

          $.ajax({
              url:pageUrl+'?rel=tab',
              success: function(data){
                  myContent.hide();
                  var response = $(data);
                  var content  = response.filter('.content').html();
                  myContent.html(content).fadeIn(400);
              }
          });


          setTimeout(function() {
            myContent.css('transition', 'all 200ms');
          }, 300);

          if(pageUrl!=window.location){
              window.history.pushState({path:pageUrl},'',pageUrl);
          }
          windowLocation();
      });
  }

  function windowLocation() {
    var location = window.location;
    if(location.pathname === '/' || location.pathname === '/index.html') {
      $('body').addClass('body--home');
    } else {
      $('body').removeClass('body--home');
    }
  }

  function appendSong() {

    var container    = $('#song-container'),
        songContent  = '<audio id="theme" src="sounds/theme.ogg" type="audio/ogg" autoplay loop="loop"></audio>';

    if(isWidthMore(1040)) {
      container.prepend(songContent);
    }
  }

  function iconSong() {
    var theme = document.getElementById("theme"),
        icon  = $('#icon');

        (theme ? theme.volume = 0.5 : false)

    if(icon) {
      $(icon).on('click', function() {

        if (icon.hasClass('stop')){
            icon.removeClass('stop');
            theme.play();
        } else {
          icon.addClass('stop');
          theme.pause();
        }
      });
    }
  }


  return {
      slideNav: slideNav,
      addLogo: addLogo,
      myAjax: myAjax,
      appendSong: appendSong,
      iconSong: iconSong,
      windowLocation: windowLocation
  };

})(jQuery);

App.slideNav();
App.addLogo();
App.myAjax();
App.appendSong();
App.iconSong();
App.windowLocation();