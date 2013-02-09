/*
 * Presentator
 * Copyright (C) 2013  Hendrik Weiler
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @author     Hendrik Weiler
 * @license    http://www.gnu.org/licenses/gpl.html
 * @copyright  2013 Hendrik Weiler
 */

if(presentator === undefined) var presentator = {};

(function(document, window, presentator) {

	presentator.autoloader = function(element, config_path)
	{
		var config_path = config_path;

		var element = element;

		var core = null;

		this.load = function() {

			$(element).load('presentator/frame.html').css({
				position : 'relative',
				overflow : 'hidden'
			});

			$.get(config_path).done(function(config_data) {

				$(function() {

					var bootstrap;

					var environment;

					$.get('presentator/bootstrap.xml?' + new Date().getTime(), function(data) {

						bootstrap = $(data);

						environment = bootstrap.find('environment').text();

						if(environment == 'development') console.log('#### Autoloading Presentator ####');


						$.getScript($(config_data).find('vendor').text() + '/presentator/control/preloader.js', function() {

							var preloader = new presentator.control.preloader($(element).width());
							var counter = 0;
							$(element).append(preloader.html);

							var max = bootstrap.find('source').length + 2;

							function load_core()
							{
								$.ajax({
								  url: 'get_resources.php',
								  success: function(resource_data) {

									counter++;
									preloader.set_progress(counter / max);

									$.getScript($(config_data).find('vendor').text() + '/presentator/core/core.js', function() {

										if(environment == 'development') console.log('Loaded Core');

										counter++;
										preloader.set_progress(counter / max);

										if(preloader.value == 1) preloader.fade_out();

										core = new presentator.core.core(data, element, resource_data, config_data);
										core.initialize();
									});

								  },
								  async: true
								});
							}

							function load_script(source_object, index)
							{
								var href = source_object.get(index).getAttribute('href');

								$.ajax({
								  url: $(config_data).find('vendor').text() + '/' + href,
								  dataType: 'script',
								  success: function(result) {

									if(environment == 'development') console.log('Load library: ' + href);

									counter++;
									preloader.set_progress(counter / max);

									if( (counter + 2) == max)
									{
										load_core();
									}
									else
									{
										load_script(source_object, index+=1);
									}

								  },
								  error : function(data, status, error) {
								  	if(environment == 'development') console.log('## Failed to load library: ' + href + ', status:' + status);
								  	max--;

									if( (counter + 2) == max)
									{
										load_core();
									}
									else
									{
										load_script(source_object, index+=1);
									}
								  },
								  async: true
								});
							}

							console.log(bootstrap.find('source'));
							load_script(bootstrap.find('source'), 0);

						});

					});

				});

			});

		}
	}

})(document, window, presentator);