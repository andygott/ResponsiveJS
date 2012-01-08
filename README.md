# ResponsiveJS

### A simple way to attach JavaScript listeners to browser window width ranges, using the same syntax as media queries.

Free to use for any project – licensed under the MIT license or the GPL license Version 2.

ResponsiveJS is a tiny (1.6kb minified) script that makes it really simple to call JavaScript functions when the browser window width falls within certain dimensions, which are set using the same min-width and max-width syntax as CSS media queries. By default, your functions are bound to the window resize event, and are also called as you bind them (on page load, for example) – both of these are optional.

This is handy for things such as conditionally loading content (for a mobile-first approach, for example), and restructuring markup (for small screen/ large screen navigation, etc). 

ResponsiveJS is written in native JavaScript, so you can use it with your framework of choice.

## Usage

A very simple use case looks like this:

```js
ResponsiveJS.bind('(min-width: 320px) and (max-width: 800px)', 
	function() {…do something… });
```

The above will trigger the callback function if the window width is currently between 320px and 800px, and will trigger it again every time the browser window is resized (if the new window width meets the criteria).

## The bind() Method

`bind(query, callback [, {fire_now: true, fire_once: false}])`

The `bind()` method takes three parameters:

### `query` string
min-width and/or max-width values using the same syntax as media queries. 

Examples:

- `(min-width: 300px) and (max-width: 800px)`
- `(max-width: 1024px)`
- `(min-width: 500px)`

### `callback` function
A callback function to call when the window width meets the criteria set in `query`. The function is passed an object containing the new window dimensions:

```js
{
	w: window width,
	h: window height,
}
```

By default this callback function is called at the same time as it is bound, if the current browser window width meets the criteria. If, for example, you call the `bind()` method on page load, your callback will fire on page load. To switch this behaviour off see the `fire_now` option below.

Also by default, this callback is triggered when the browser window is resized (if the new window width meets the `query` criteria). See the sections on namespaces and further examples below for altering this behaviour.

### Options object (optional)

Defaults:

```js
{
	fire_now: true,
	fire_once: false
}
```

`fire_now` boolean (optional) default: `true`

If `true` (default) the callback function is called as it is bound, if the browser dimensions meet the criteria in `query`. Set to `false` to prevent this behaviour.

`fire_once` boolean (optional) default: `false`

If this is `true`, the callback will only be fired once and then the listener will be detached.

See the below example for conditionally loading content for a use case.

## The fire() Method

`fire([namespace])`

The `fire()` method fires the callbacks that you have assigned to any min-width and/or max-width constraints that match the current window dimensions. Useful for attaching to events other than window resize or for triggering arbitrarily from within your code.

See below for usage of the optional `namespace` parameter.

## Using Namespaces

`bind(namespace, query, callback[, options])`

Namespaces can be used to group your callback functions and attach them to different events. For example, you might want to set a callback to fire when the user clicks on a link, rather than on the window resize event. Here’s how you’d do that (if you’re using jQuery):

```js
ResponsiveJS.bind('my-namespace', '(min-width: 500px)', 
	function(dimensions, namespace) {
		console.log('The browser window is at least 500px wide and you did something to fire callback functions in the "my-namespace" namespace'); 
	},
	{fire_now: false}); // false prevents the function from firing as it is bound
$('#click-me').click(function(e) {
	e.preventDefault();
	ResponsiveJS.fire('my-namespace');
});
```

Using a namespace prevents the default behaviour of automatically firing callbacks on window resize.

## Example Use Cases

These examples use jQuery for brevity but ResponsiveJS works with any framework, or just native JS.

### Conditionally loading content

The following will load content from `/my-additional-content.html` into the element with `id="sidebar"` only if the window width is 600px or more. This will happen on page load (if the window width meets the criteria), or on browser resize (if the new width meets the criteria). The `fire_once: true` setting means that, no matter when the content is loaded, it is only loaded once.

```js

ResponsiveJS.bind('(min-width: 600px)', function() {
	$('#sidebar').load('/my-additional-content.html');
}, {fire_once: true});
```

### Restructuring markup

Sometimes CSS media queries aren’t quite enough to make the necessary alterations for varying window sizes. For those occasions, ResponsiveJS can help. The following will trigger one callback for window widths of 500px and over, and another for sizes narrower than 500px:

```js
ResponsiveJS.bind('(max-width: 499px)', function() {
	…restructure navigation for small screens here…
});
ResponsiveJS.bind('(min-width: 500px)', function() {
	…restructure navigation for large screens here…
});
```

## Without width constraints

Because RespondJS uses the neat (and well documented) little `setTimeout()` trick for the window resize event, you can use it to cover all window resize events, by passing in an empty string as the `query` parameter:

```js
	ResponsiveJS.bind('', function() {do this on every window resize}, {fire_now: false});
```

## Credits

Inspired by Scott Jehl's excellent Respond.js, from which the min- and max-width regexes are taken.
