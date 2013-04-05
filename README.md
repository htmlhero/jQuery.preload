# jQuery.preload
jQuery plugin for images preloading.

Usage
-----

Just include this script after jQuery. Requires jQuery 1.6+.

``` html
<script src='jquery.js'></script>
<script src='jquery.preload.js'></script>
```

Parameters
-----

There is two ways to use jQuery.preload. By passing path(s):

    $.preload(images, [part], [callback]);
    
- `images` &mdash; path to image(s), can be array and string.  
- `part` &mdash; how many images will be preloaded at one time.  
- `callback` &mdash; function to be executed after preload one part.

And using method:

	$('#elem').preload([callback]);

- `callback` &mdash; function to be executed after preload all images.

In this case will be preloaded all images and backgrounds in the `#elem`.

Examples
-----

- [Preloading array](http://dev.htmlhero.ru/jQuery.preload/examples/1.html)
- [Using data-src attribute](http://dev.htmlhero.ru/jQuery.preload/examples/2.html)
- [Preload by passing DOM-object](http://dev.htmlhero.ru/jQuery.preload/examples/3.html)

Translations
-----

Документация на русском: [http://htmlhero.ru/post/43234584604/jquery-preload](http://htmlhero.ru/post/43234584604/jquery-preload)