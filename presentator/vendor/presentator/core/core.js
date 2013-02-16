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

(function(document, window, presentator, soundManager) {

	presentator.version = 0.00;

	presentator.core.stage = $('body');

	presentator.core.resource = {};

	presentator.core.config = {};

	presentator.core.current_content;

	presentator.core.current_core_instance;

	presentator.core.components = {};

	presentator.core.core = function(bootstrap_xml, stage, resource_xml, config_xml)
	{
		presentator.core.stage = stage;

		presentator.core.resource = $(resource_xml);

		presentator.core.config.vendor = $(config_xml).find('vendor').text();
		presentator.core.config.sites = $(config_xml).find('sites').text();
		presentator.core.config.interface = $(config_xml).find('interface').text();
		presentator.core.config.language = $(config_xml).find('language').text();

		var bootstrap = $(bootstrap_xml);

		presentator.environment = $(bootstrap_xml).find('environment').text();

		presentator.core.current_core_instance = this;

		this.load_components = function() {

			bootstrap.find('component').each(function(key, object) {

				var name = $(this)[0].getAttribute('name').split('.');
				var component;

				component = new presentator[name[0]][name[1]]();

				if(name.length == 2 && $(this)[0].getAttribute('active') == "true")
				{
					component.load();

					name = name[1];
				}

				presentator.core.components[name] = component;

			});


		}

		this.initialize = function()
		{
			soundManager.debugMode = (presentator.environment == 'development');
			soundManager.setup({
			  url: presentator.core.config.vendor + '/soundmanager/',
			  onready: function() {

			  	if(presentator.environment == 'development') console.log('#### Soundmanger2 finished loading ####');

				new presentator.core.content(presentator.core.resource.find(presentator.core.config.language).find('site:first'));
			  }
			});
			soundManager.ontimeout(function() {
			  	console.log('no flash');
			});
		}
	}

})(document, window, presentator, soundManager);