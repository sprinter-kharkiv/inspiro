/* Masonry grid initial function */
function mansoryGrid() {
	if ($(window).width() < 767) {
    $('.grid-floatet').masonry( 'destroy' );
  } else {
		$('.grid-floatet').masonry({
		  // options
		  itemSelector: '.grid-floatet__item',
			columnWidth: 5,
			percentPosition: true
		});
	}
}
/* ScrollTrigger animation */
function ScrollTriggerInitial() {
	if ($(window).width() > 767) {
		document.addEventListener('DOMContentLoaded', function(){
			var trigger = new ScrollTrigger({
				addHeight: true
			});
		});
  }
}
/* ScrollTrigger animation initial */
ScrollTriggerInitial();


$(document).ready(function(){
	
	/* Collapsed section action */
	$('.collapse-btn').on('click', function(event) {
		event.preventDefault();
		$(this).toggleClass('active');
		$('.collapsed-holder').slideToggle(500);
	})
	
	/* Masonry grid initial */
	mansoryGrid();
	

	/* Slick carousel initial */
	$('.grid-floatet__carousel').slick({
		arrows: false,
		draggable: false,
		fade: true,
		speed: 1000,
		pauseOnFocus: false,
		pauseOnHover: false,
		swipe: false,
		touchMove: false,
		infinite: true,
  	slidesToShow: 1,
  	slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000
	});
	
	
	//Floatet label in form action
	$('.form-control').focusout(function() {
    $('.form-group').removeClass('focus');
  });
  $('.form-control').focus(function() {
    $(this).closest('.form-group').addClass('focus');
  });
	$('select.form-control').change(function() {
    $(this).closest('.form-group').addClass('filled');
  });
	

  /// Input Kepress Filled  Focus
  $('.form-control').keyup(function() {
    if($(this).val().length > 0){
      $(this).closest('.form-group').addClass('filled');
    }

    else{
      $(this).closest('.form-group').removeClass('filled');
    }
  });

  /// Input Check Filled Focus
  var $formControl = $('.form-control');
  var values = {};
  var validate =    $formControl.each(function() {
    if($(this).val().length > 0){
      $(this).closest('.form-group').addClass('filled');
    }
    else{
      $(this).closest('.form-group').removeClass('filled');
    }
  });
	

});

$(window).resize(function() {
	/* Masonry grid initial */
	mansoryGrid();
	
	/* ScrollTrigger animation initial */
	ScrollTriggerInitial();
});
