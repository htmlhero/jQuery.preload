**jQuery.preload** &mdash; jQuery plugin for images preloading.

##Example 1

	var images = ['img/1.jpg', 'img/2.jpg'];
	
	$.preload(images, function(){
		alert('All loaded!');
	});

Just preloading all images and alerting in the end.
	
##Example 2

	$('#elem').preload(callback);

Firing callback after all images and backgrounds preloads in #elem.