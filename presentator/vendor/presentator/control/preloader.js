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

	presentator.control.preloaders = [];

	presentator.control.preloader = function(width) {

		this.id = presentator.control.preloaders.length;

		this.value = 0;

		var self = this;

		presentator.control.preloaders.push(this);

		this.html = $('<div>',{'class' : "preloader"});
		this.html.css({
			width : width,
			position : 'absolute',
			zIndex : 1000
		});
		this.html.append($('<div>',{'class' : "preloader-bar"}));

		this.set_progress = function(procent) {

			var progress_bar_width = this.html.width() * procent;

			this.html.find('.preloader-bar').css({
				width : progress_bar_width
			});

			this.value = procent;

		}

		this.fade_out = function() {

			this.html.fadeOut(function() {
				self.html.remove();
			});
		}

		this.set_progress(0);

	}

})(document, window, presentator);