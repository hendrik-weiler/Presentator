presentator.content_ready = function(components, audio) {

	$('.fiddle_image, .headline, .border, .fiddle_button, .continue_button, .text1, .text2').hide();

	$('.headline').fadeIn();

	$('.fiddle_button').click(function(e) {
		e.preventDefault();

		window.open('http://jsfiddle.net/','_newtab');

		$('.fiddle_button, .text1, .text2').fadeOut();

		audio.play('03.mp3',function() {

			$('.fiddle_image').fadeIn(function() {
				$(this).animate({
					top : -200,
					left : -220
				},500, function() {
						
						$('.border').fadeIn(function() {
							$(this).animate({
								top : 60,
								width : 610,
								height : 400
							}, function() {

								audio.play('04.mp3',function() {


									$('.fiddle_image').animate({
										top : 100,
										left : -220
									},500, function() {

										$('.border').animate({
											top : 145,
											left : 0,
											width : 610,
											height : 205
										},500, function() {

											audio.play('05.mp3',function() {

												$('.continue_button').fadeIn();

												audio.play('06.mp3',function() {

													
													
													
												});

											});

										});

									});

								});

							});
						});


				});

			});

		});

	});

	$('.continue_button').click(function(e) {
		e.preventDefault();

		components.navigation.goto_page('02_01');
	});

	$('.text1').fadeIn();

	audio.play('01.mp3',function() {

		$('.text2').fadeIn();

		audio.play('02.mp3',function() {
			$('.fiddle_button').fadeIn();
		});

	});

}