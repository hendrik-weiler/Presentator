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

	presentator.core.template = {
		replace : function(data) {

			data.replace(/\#\{([\w\_\:\.]+)\}/g, function(m, key, value){

				var cmd = key.split(':');

				if(cmd.length == 2)
				{

					var path = presentator.core.config.sites + '/' + presentator.core.config.language + '/' + presentator.core.current_content.name;
					if(cmd[0] == 'img')
					{
						data = data.replace('#{' + key + '}', path + '/images/' + cmd[1]);
					}
				} 
				else
				{
					data = data.replace('#{' + key + '}', presentator.core.current_content.texts.find(cmd[0]).text());
				}
			});		

			return data;

		}
	}

})(document, window, presentator);