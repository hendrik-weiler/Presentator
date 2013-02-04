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

if(presentator.control === undefined) presentator.control = {};

(function(document, window, presentator) {

	presentator.control.navigation = function() {

		this.html = $('<div>',{'class' : "navigation"});
		this.html.css({
			position : 'absolute',
			zIndex : 900
		});

		var self = this;

		this.blacklist = [];

		this.load = function() {

			var nav_list = $('<ul>');

			$(presentator.core.resource).find(presentator.core.config.language).find('site').each(function(key, obj) {

				if($.inArray($(this)[0].getAttribute('label'), self.blacklist) == -1)
				{

					var list_point = $('<li><a href="#' + $(this)[0].getAttribute('label') + '"/></li>');
					list_point.find('a').html($(this)[0].getAttribute('label'));

					if($(this)[0].getAttribute('label') == presentator.core.current_content.label) list_point.addClass('selected');

					list_point.click(function(e) {
						presentator.core.current_content = new presentator.core.content($(obj));
						nav_list.find('a').removeClass('selected');
						$(this).addClass('selected');
						e.preventDefault();
					});

					nav_list.append(list_point);

				}

			});

			this.html.append(nav_list);

			presentator.core.stage.append(this.html);
		}

	}

})(document, window, presentator);