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

(function(document, window, presentator, soundManager) {

	presentator.control.mute = function() {

		if(presentator.is_muted === undefined) presentator.is_muted = false;

		this.html = $('<div>',{'class' : "mute"});
		this.html.css({
			position : 'absolute',
			zIndex : 900,
			cursor : 'pointer'
		});

		this.html.append($('<img>',{
			src : 'presentator/img/mute-off.png'
		}));

		var self = this;

		function check_mute(is_muted) {

			if(is_muted)
			{
				soundManager.mute();

				self.html.addClass('is_muted');

				self.html.empty();
				self.html.append($('<img>',{
					src : 'presentator/img/mute-on.png'
				}));

			}
			else
			{
				soundManager.unmute();

				self.html.removeClass('is_muted');

				self.html.empty();
				self.html.append($('<img>',{
					src : 'presentator/img/mute-off.png'
				}));

				
			}

		}

		this.set_mute = function(value) {

			presentator.is_muted = value;
			check_mute(presentator.is_muted);

		}

		this.load = function() {

			this.html.click(function() {

				presentator.is_muted = !presentator.is_muted;
				check_mute(presentator.is_muted);

			});

			check_mute(presentator.is_muted);

			presentator.core.stage.append(this.html);
		}

	}


})(document, window, presentator, soundManager);