<?php
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

$config = simplexml_load_file("presentator/config.xml");

if(isset($config->path->sites))
{
	$resource_xml = new SimpleXMLElement("<resources></resources>");
	foreach (scandir($config->path->sites) as $lang_prefix) 
	{
		if(!in_array($lang_prefix , array('.','..','.DS_Store')))
		{

			$language = $resource_xml->addChild($lang_prefix);

			foreach (scandir($config->path->sites . '/' . $lang_prefix) as $site_folder) 
			{
				if(!in_array($site_folder , array('.','..','.DS_Store')))
				{

					$info = simplexml_load_file($config->path->sites . '/' . $lang_prefix . '/' . $site_folder . "/info.xml");

					$site = $language->addChild('site');
					$site->addAttribute('name', $site_folder);
					$site->addAttribute('label', $info->label);

					foreach (scandir($config->path->sites . '/' . $lang_prefix . '/' . $site_folder) as $in_site_folder) 
					{

						if($in_site_folder == 'images')
						{

							foreach (scandir($config->path->sites . '/' . $lang_prefix . '/' . $site_folder . '/images') as $file) 
							{
								if(!in_array($file , array('.','..','.DS_Store')))
								{
									$resource = $site->addChild('resource');
									$resource->addAttribute('type', 'images');
									$resource->addAttribute('source', $config->path->sites . '/' . $lang_prefix . '/' . $site_folder . '/images/' . $file);
									$resource->addAttribute('name', $file);
								}
							}

						}

						if($in_site_folder == 'sound')
						{

							foreach (scandir($config->path->sites . '/' . $lang_prefix . '/' . $site_folder . '/sound') as $file) 
							{
								if(!in_array($file , array('.','..','.DS_Store')))
								{
									$resource = $site->addChild('resource');
									$resource->addAttribute('type', 'sound');
									$resource->addAttribute('source', $config->path->sites . '/' . $lang_prefix . '/' . $site_folder . '/sound/' . $file);
									$resource->addAttribute('name', $file);
								}
							}

						}

						if($in_site_folder == 'scripts')
						{

							foreach (scandir($config->path->sites . '/' . $lang_prefix . '/' . $site_folder . '/scripts') as $file) 
							{
								if(!in_array($file , array('.','..','.DS_Store')))
								{
									$resource = $site->addChild('resource');
									$resource->addAttribute('type', 'scripts');
									$resource->addAttribute('source', $config->path->sites . '/' . $lang_prefix . '/' . $site_folder . '/scripts/' . $file);
									$resource->addAttribute('name', $file);
								}
							}

						}

					}

				}
			}
		}
	}

	header('Content-type: text/xml');
	print $resource_xml->asXML();
}
else
{
	print 'No sites path defined.';
}