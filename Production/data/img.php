<?php
	require 'Cloudinary.php';
	require 'Uploader.php';
	require 'Api.php';

	\Cloudinary::config(array( 
		"cloud_name" => "brettgris", 
		"api_key" => "252725732535818", 
		"api_secret" => "GDKBwwVYKRvkAy1MGOH80nRM5eY" 
	));

	$rsp = \Cloudinary\Uploader::upload( 
		$_FILES['file']['tmp_name'],
		array(
			"quality"=>100, 
			"width"=>500, 
			"height"=>500, 
			"crop"=>"lfill", 
			"gravity"=>"center"
		)
	);

	echo $rsp["url"];
?>