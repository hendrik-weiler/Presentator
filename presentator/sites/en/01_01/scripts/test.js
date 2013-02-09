presentator.content_ready = function(components, audio) 
{

	$('.continue_button, .text1, .text2, .headline').hide();

	$('.headline').fadeIn();

	$('.text1').fadeIn();

	$('.continue_button').click(function(e) {
		e.preventDefault();

		components.navigation.goto_page('01_02');
	});

	audio.play('01.mp3',function() {

		$('.text2').fadeIn();

		audio.play('02.mp3',function() {

			$('.continue_button').fadeIn();

			audio.play('03.mp3',function() {
				
			});
		});
	});



}