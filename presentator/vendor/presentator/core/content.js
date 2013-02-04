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

if(presentator.core === undefined) presentator.core = {};

(function(document, window, presentator) {

	presentator.core.content = function(site_instance)
	{
		presentator.content_ready = function() {};

		if(presentator.audio.current_audio != null) presentator.audio.current_audio.stop();

		presentator.core.stage.empty();

		core_instance = presentator.core.current_core_instance;

		this.name = site_instance[0].getAttribute('name');

		this.label = site_instance[0].getAttribute('label');

		if(presentator.environment == 'development') console.log('#### Load Content: ' + this.name + ' ####');

		var path = presentator.core.config.language + '/' + this.name;

		var preloader = new presentator.control.preloader(presentator.core.stage.width());
		var counter = 0;
		presentator.core.stage.append(preloader.html);

		max = site_instance.find('resource').length + 2;

		this.texts = {};

		presentator.core.current_content = this;

		var self = this;

		$.get(presentator.core.config.sites + '/' + path + '/text.xml?' + new Date().getTime(), function(text_data) {
			counter++;
			preloader.set_progress(counter / max);

			if(presentator.environment == 'development') console.log('Load resource: ' + presentator.core.config.sites + '/' + path + "/text.xml");

			self.texts = $(text_data);

			$.get(presentator.core.config.sites + '/' + path + '/content.html?' + new Date().getTime(), function(html_data) {
				counter++;
				preloader.set_progress(counter / max);


				if(presentator.environment == 'development') console.log('Load resource: ' + presentator.core.config.sites + '/' + path + "/content.html");

				var new_data = presentator.core.template.replace(html_data);

				presentator.core.stage.append($('<div>').html(new_data).fadeOut(0));

				$("link[data-type=presentator-style]").remove();
				$("head").append($("<link data-type='presentator-style' rel='stylesheet' href='" + presentator.core.config.sites + '/' + path + "/content.css?" + new Date().getTime() + "' type='text/css' media='screen' />"));
				
				if(presentator.environment == 'development') console.log('Load resource: ' + presentator.core.config.sites + '/' + path + "/content.css");

				if(preloader.value == 1) on_finished();

				// load resources

				function on_finished()
				{
					preloader.fade_out();
					$(html_data).fadeIn();
					presentator.content_ready();
				}

				site_instance.find('resource').each(function(key, obj) {

					if(obj.getAttribute('type') == 'scripts')
					{
						$.getScript(obj.getAttribute('source') + '?' + new Date().getTime(), function() {
							if(presentator.environment == 'development') console.log('Load resource: ' + obj.getAttribute('source'));
							counter++;
							preloader.set_progress(counter / max);

							if(preloader.value == 1) 
							{
								on_finished();
							}
						}).fail(function(data, status, error) {
							if(presentator.environment == 'development') console.log('## Failed to load resource: ' + obj.getAttribute('source') + ', status:' + status);
						
							var script = $('<script>', {'data-type' : 'presentator-script' ,src : obj.getAttribute('source') + '?' + new Date().getTime()});

							$(presentator.core.stage).append(script);
						});
					}

					if(obj.getAttribute('type') == 'sound')
					{
						$.ajax({
							url : obj.getAttribute('source') + '?' + new Date().getTime(),
							success : function() {
								if(presentator.environment == 'development') console.log('Load resource: ' + obj.getAttribute('source'));
								counter++;
								preloader.set_progress(counter / max);

								if(preloader.value == 1) 
								{
									on_finished();
								}
							}
						}).fail(function(data, status, error) {
							if(presentator.environment == 'development') console.log('## Failed to load resource: ' + obj.getAttribute('source') + ', status:' + status);
						});
					}

					if(obj.getAttribute('type') == 'images')
					{
						var image = $('<img>',{src: obj.getAttribute('source')+ "?" + new Date().getTime()});
						image.load(function() {
							if(presentator.environment == 'development') console.log('Load resource: ' + obj.getAttribute('source'));
							counter++;
							preloader.set_progress(counter / max);

							if(preloader.value == 1)
							{
								on_finished();
							}
						});
					}
				});
			});
		});

		core_instance.load_components();
	}

})(document, window, presentator);