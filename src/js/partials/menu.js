jQuery(document).ready(function($) {
	$('body').on('click', 'li span', function(event) {
		event.preventDefault();

		$(this).closest('li').siblings('li').children('ul').removeClass('open');
		$(this).next('ul').toggleClass('open');
	});

	$('body').on('click', '#collapseButton', function(event) {
		event.preventDefault();
		
		$('#collapseMenu').toggleClass('open');
	});
});