/////////////////////// ready
$(document).ready(function() {
  /*----------------------------------------------------*/
  // Superfish menu.
  /*----------------------------------------------------*/
  $('.sf-menu').superfish();

  /*----------------------------------------------------*/
  // Superslides
  /*----------------------------------------------------*/
  var height = $(window).height();
  $('#home').height(height);

  $('#slides').superslides({
    play: 7000,
    animation: 'fade', // slide
    pagination: true,
    inherit_height_from: '#home',
  });

  /*----------------------------------------------------*/
  // Fancybox
  /*----------------------------------------------------*/
  $("a.fancybox").fancybox();

  /*----------------------------------------------------*/
  // Scroll
  /*----------------------------------------------------*/
  $(".scroll-to").bind('click',function(event){

      $("html, body").animate({
        scrollTop: $($(this).attr("href")).offset().top
      }, {
          duration: 1200,
          easing: "easeInOutExpo"
      });

      event.preventDefault();
  });

  // Animate distance
  var o = $('.animated-distance');
  if (o.length > 0) {
    o.appear(function() {
      var elem = $(this);
      var b = elem.data('num');
      var d = elem.data('duration');
      var animationDelay = elem.data('animation-delay');
      if ( !animationDelay ) { animationDelay = 0; }
      elem.find('span').text("0" + '%');

      setTimeout(function(){
        elem.animate({ num: b }, {
          duration: d,
          // easing: 'easeOutExpo',
          step: function (num){
            a = (num).toFixed(0) + '%';
            elem.find('span').text(a);
            elem.css("width", a);
          }
        });
      }, animationDelay);
    });
  }

  /*----------------------------------------------------*/
  // owlCarousel
  /*----------------------------------------------------*/
  $('.owl-carousel-team').owlCarousel({
    center: false,
    items: 1,
    loop: true,
    margin: 30,
    autoplay: true,
    autoplayTimeout: 7000,
    responsive: {
      576: {
        items: 2
      },
      768: {
        items: 3
      },
      992: {
        items: 4
      }
    }
  });

  /*----------------------------------------------------*/
  // Fancybox
  /*----------------------------------------------------*/
  $("a.fancybox").fancybox();

  /*----------------------------------------------------*/
  // IZOTOPE
  /*----------------------------------------------------*/
  // Home.
  var o = $('#container');
  if (o.length > 0) {
    var $container = o;

    $container.isotope({
        itemSelector: '.element',
        // layoutMode: 'masonry',
        masonry: {
          columnWidth: '.grid-sizer',
          gutter: '.gutter-sizer'
        },
        percentPosition: true,
        transitionDuration: '0.8s'
    });

    // layout Isotope after each image loads
    $container.imagesLoaded().progress( function() {
      $container.isotope('layout');
    });

    refreshIsotope();

    var $optionSets = $('#options .option-set'),
        $optionLinks = $optionSets.find('a');

    $optionLinks.click(function(){
      var $this = $(this);
      // don't proceed if already selected
      if ( $this.hasClass('selected') ) {
        return false;
      }
      var $optionSet = $this.parents('.option-set');
      $optionSet.find('.selected').removeClass('selected');
      $this.addClass('selected');

      // make option object dynamically, i.e. { filter: '.my-filter-class' }
      var options = {},
          key = $optionSet.attr('data-option-key'),
          value = $this.attr('data-option-value');
      // parse 'false' as false boolean
      value = value === 'false' ? false : value;
      options[ key ] = value;
      if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
        // changes in layout modes need extra logic
        changeLayoutMode( $this, options )
      } else {
        // otherwise, apply new options
        $container.isotope( options );
      }

      return false;
    });

    function refreshIsotope() {
      $container.isotope('layout');
    }
  }

  // Portfolio.
  var o = $('#container2');
  if (o.length > 0) {
    var $container = o;

    $container.isotope({
        itemSelector: '.element',
        // layoutMode: 'masonry',
        masonry: {
          columnWidth: '.grid-sizer',
          gutter: '.gutter-sizer'
        },
        percentPosition: true,
        transitionDuration: '0.8s'
    });

    // layout Isotope after each image loads
    $container.imagesLoaded().progress( function() {
      $container.isotope('layout');
    });

    refreshIsotope();

    var $optionSets = $('#options2 .option-set'),
        $optionLinks = $optionSets.find('a');

    $optionLinks.click(function(){
      var $this = $(this);
      // don't proceed if already selected
      if ( $this.hasClass('selected') ) {
        return false;
      }
      var $optionSet = $this.parents('.option-set');
      $optionSet.find('.selected').removeClass('selected');
      $this.addClass('selected');

      // make option object dynamically, i.e. { filter: '.my-filter-class' }
      var options = {},
          key = $optionSet.attr('data-option-key'),
          value = $this.attr('data-option-value');
      // parse 'false' as false boolean
      value = value === 'false' ? false : value;
      options[ key ] = value;
      if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
        // changes in layout modes need extra logic
        changeLayoutMode( $this, options )
      } else {
        // otherwise, apply new options
        $container.isotope( options );
      }

      return false;
    });

    function refreshIsotope() {
      $container.isotope('layout');
    }
  }









});

/////////////////////// load
$(window).on('load', function () {






});