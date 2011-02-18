/* jQuery.Preload
 * Created by Andrew Motoshin (http://htmlhero.ru)
 * 
 * Version: 1.2.0
 * Requires: jQuery 1.4+
 *
 */

(function(c){c.preload=function(){var f=[],i=function(a){for(var b=0;b<f.length;b++)if(f[b][0].src===a[0].src)return f[b];f.push(a);return a},g=function(a,b,d){c.isFunction(b)&&b.call(a,d)};return function(a,b,d){if(typeof a!=="undefined"){c.isArray(a)||(a=[a]);if(c.isFunction(b)){d=b;b=0}var n=arguments.callee,h=a.length,m=0,j,e,k=function(){m++;if(m===h){g(a,d,!j);n(j,b,d)}};if(b>0&&b<h){j=a.slice(b,h);a=a.slice(0,b)}(h=a.length)||g(a,d,true);for(var l=0;l<h;l++){e=new Image;e.src=a[l];e=c(e);e= i(e);e[0].complete?k():e.bind({load:k,error:k})}}}}();c.fn.preload=function(f){var i=this,g=[],a=/url\(['"]?([^"')]*)['"]?\)/i,b,d;this.find("*").add(this).each(function(){b=c(this).css("backgroundImage");(d=a.exec(b))&&g.push(d[1]);this.nodeName==="IMG"&&g.push(this.src)});c.preload(g,function(){c.isFunction(f)&&f.call(i.get())});return this}})(jQuery);