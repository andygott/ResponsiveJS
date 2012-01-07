
/*
*	A simple way to add javascript listeners to the window 
*	resize event for specific min- and max-width values.
*
*	Usage:
*	ResponsiveJS.bind('(min-width: 320px) and (max-width: 800px)', 
*		function(dimensions) {console.log(dimensions); });
*/

(function(win) {
	
	win.ResponsiveJS = {
	
		listeners: [],
		
		bind: function(query, callback, fire_now) {
			fire_now = (typeof fire_now === 'undefined') ? true : fire_now;
			var minw = 
				(query.match(/\(min\-width:[\s]*([\s]*[0-9]+)px[\s]*\)/) && parseFloat(RegExp.$1)) || 0;
			var maxw = 
				(query.match(/\(max\-width:[\s]*([\s]*[0-9]+)px[\s]*\)/) 
					&& parseFloat(RegExp.$1)) || 1000000;
			this.listeners.push({
				minw: minw,
				maxw: maxw,
				callback: callback
			});
			if (fire_now) {
				return this._fire(this._getDims(), callback);
			}
		},
		
		_getDims: function() {
			var e = win, a = 'inner';
			if (!('innerWidth' in win)) {
				a = 'client';
				e = document.documentElement || document.body;
			}
			return {w : e[a + 'Width'], h: e[a + 'Height']}
		},
		
		_fire: function(dims, listener) {
			if (dims.w >= listener.minw && 
				dims.w <= listener.maxw) {
					return listener.callback(dims);
			}
		}
		
	};

	var timer;
	resizeFunc = function() {
		if (timer) {clearTimeout(timer); }
		timer = setTimeout(function() {
			var dims = ResponsiveJS._getDims();
			for (var i = 0, len = win.ResponsiveJS.listeners.length; i < len; i ++) {
				ResponsiveJS._fire(dims, win.ResponsiveJS.listeners[i]);
			}
		}, 100);
	};
	if (win.addEventListener) {
		win.addEventListener("resize", resizeFunc, false);
	}
	else if (win.attachEvent) {
		win.attachEvent("onresize", resizeFunc);
	}
		
})(this);