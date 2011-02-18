/* jQuery.Preload
 * Created by Andrew Motoshin (http://htmlhero.ru)
 *
 * Version: 1.2.0
 * Requires: jQuery 1.4+
 *
 */

(function($){

	$.preload = (function(sources, part, callback){

		var cache = [],
			caching = function(image){
				for (var i = 0; i < cache.length; i++) {
					if (cache[i][0].src === image[0].src) {
						return cache[i];
					}
				}
				cache.push(image);
				return image;
			},
			proxy = function(sources, callback, last){
				if ($.isFunction(callback)) {
					callback.call(sources, last);
				}
			};

		return function(sources, part, callback){

			if (typeof sources === 'undefined') {
				return;
			}

			if (!$.isArray(sources)) {
				sources = [sources];
			}

			if ($.isFunction(part)) {
				callback = part;
				part = 0;
			}

			var self = arguments.callee,
				total = sources.length,
				loaded = 0,
				next, image;

			var imageLoaded = function(){
				loaded++;
				if (loaded === total) {
					proxy(sources, callback, !next);
					self(next, part, callback);
				}
			};

			if (part > 0 && part < total) {
				next = sources.slice(part, total);
				sources = sources.slice(0, part);
			}

			total = sources.length;

			if (!total) {
				proxy(sources, callback, true);
			}

			for (var i = 0; i < total; i++) {

				image = new Image();
				image.src = sources[i];

				image = $(image);
				image = caching(image);

				if (image[0].complete) {
					imageLoaded();
				} else {
					image.bind({
						load: imageLoaded,
						error: imageLoaded
					});
				}

			}

		};

	})();

	$.fn.preload = function(callback){

		var items = this,
			sources = [],
			reg = new RegExp('url\\([\'"]?([^"\'\)]*)[\'"]?\\)', 'i'),
			background, url;

		this.find('*').add(this).each(function(){

			background = $(this).css('backgroundImage');
			url = reg.exec(background);

			if (url) {
				sources.push(url[1]);
			}

			if (this.nodeName === 'IMG') {
				sources.push(this.src);
			}

		});

		$.preload(sources, function(){

			if ($.isFunction(callback)) {
				callback.call(items.get());
			}

		});

		return this;

	};

})(jQuery);