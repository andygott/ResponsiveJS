# ResponsiveJS

### A simple way to attach JavaScript event listeners to the window resize event for specific min-width and max-width values

Free to use for any project – licensed under the MIT license or the GPL license Version 2.

ResponsiveJS is a tiny (1.1kb minified) script that makes it really simple to call JavaScript functions at specific min-width and max-width values, using the same syntax as media queries. Your functions are bound to the window resize event, and are also called as you bind them (on page load, for example) – this functionality is optional.

This is handy for things such as conditionally loading content (for a mobile-first approach, for example), and restructuring markup (for small screen/ large screen navigation, etc). 

## Usage

```js
ResponsiveJS.bind('(min-width: 320px) and (max-width: 800px)', 
	function(dimensions) {console.log(dimensions); });
```

## bind(query, callback [, fire_now = true])

The `bind()` method takes three parameters:

### `query` string
min-width and/or max-width values using the same syntax as media queries. 

Examples:

`(min-width: 300px) and (max-width: 800px)`
`(max-width: 1024px)`
`(min-width: 500px)`

### `callback` function
A callback function to call when the browser window is resized and the new window dimensions meet the criteria set in `query`. The function is passed an object containing the new window dimensions:

```js
{
	w: window width,
	h: window height,
}
```

By default this callback function is also called as it is bound, if the current browser window dimensions meet the criteria. If, for example, you call the `bind()` method on page load, your callback will fire on page load. To switch this behaviour off see the `fire_now` param below.

### `fire_now` boolean (optional)
If true (default) the callback function is called as it is bound, if the browser dimensions meet the criteria in `query`. Set to false if you only want the function to be called when the browser is resized.

This default behaviour provides an easy way to call your function on page load as well as on browser resize.

## fire()

The `fire()` method fires the callbacks that you have assigned to any min-width and/or max-width constraints that match the current window dimensions. Useful for attaching to events other than window resize or for triggering arbitrarily from within your code.

## Without dimensional contraints

Because RespondJS uses the neat (and well documented) little `setTimeout()` trick for the window resize event, you can use it to cover all window resize events, by passing in an empty string as the `query` parameter:

```js
	ResponsiveJS.bind('', function() {do this on window resize}, false);
```

## Credits

Inspired by Scott Jehl's excellent Respond.js, from which the min- and max-width regexes are taken.
