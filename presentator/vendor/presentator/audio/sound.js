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

if(presentator.audio === undefined) presentator.audio = {};

(function(document, window, presentator, soundManager) {

	presentator.audio.current_audio = null;

	presentator.audio.onfinish_callback = function() {};

	presentator.audio.play = function(audiofile, finished_callback)
	{
		if(finished_callback !== undefined) presentator.audio.onfinish_callback = finished_callback;

		var soundObject = soundManager.createSound({
		  id: audiofile,
		  url: presentator.core.config.sites + '/' + presentator.core.config.language + '/' + presentator.core.current_content.name + '/sound/' + audiofile,
		  onfinish : presentator.audio.onfinish_callback
		});
		
		presentator.audio.current_audio = soundObject;

		soundObject.play();
	}

	presentator.audio.wait_cue_point = function(time, callback) 
	{
		presentator.audio.current_audio.onPosition(time, callback);
	}

})(document, window, presentator, soundManager);