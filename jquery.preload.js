/* jQuery.Preload
 * Created by Andrew Motoshin 2010 (http://htmlhero.ru)
 * 
 * Version: 1.1.1
 * Requires: jQuery 1.4+
 *
 */

(function($){

	$.preload = (function(sources, part, callback){

		var cache = [],
			caching = function(image){
				for (var i = 0; i < cache.length; i++) {
					if (cache[i].src === image.src) {
						return;
					}
				}
				cache.push(image);
			},
			proxy = function(sources, last, callback){
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

			var total = sources.length,
				self = arguments.callee,
				save = null,
				loaded = 0,
				image;

			var imageLoaded = function(){
				loaded++;
				if (loaded === total) {
					if (save) {
						proxy(sources, false, callback);
						self(save, part, callback);
					} else {
						proxy(sources, true, callback);
					}
				}
			};

			if (part > 0 && part < total) {
				save = sources.slice(part, total);
				sources = sources.slice(0, part);
			}

			total = sources.length;

			if (!total) {
				proxy(sources, true, callback);
			}

			for (var i = 0; i < total; i++) {

				image = new Image();
				image.src = sources[i];

				caching(image);

				if (image.complete) {
					imageLoaded();
				} else {
					image.onload = image.onerror = imageLoaded;
				}

			}

		};

	})();

	$.fn.preload = function(callback){

		var items = this,
			sources = [],
			reg = new RegExp('url\\([\'"]?([^"\'\)]*)[\'"]?\\)', 'i'),
			url;

		this.find('*').add(this).each(function(){

			url = reg.exec(this.style.backgroundImage);

			if (url) {
				// console.log(url[1]);
				sources.push(url[1]);
			}

			if (this.nodeName === 'IMG') {
				// console.log(this.src);
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