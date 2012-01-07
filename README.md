# ResponsiveJS

#### A simple way to attach javascript event listeners to the window resize event for specific min-width and max-width values

Free to use for any project – licensed under the MIT license or the GPL license Version 2.

## Usage

```js
ResponsiveJS.bind('(min-width: 320px) and (max-width: 800px)', 
	function(dimensions) {console.log(dimensions); });
```

## `bind(query, callback [, fire_now])`

The `bind()` method has takes three paramters:

#### `query` string
min-width and/or max-width values using the same syntax as media queries. 

Examples:

`(min-width: 300px) and (max-width: 800px)`
`(max-width: 1024px)`
`(min-width: 500px)`

#### `callback` function
A callback function to call when the browser window is resized and the new window dimensions meet the criteria set in `query`. The function is passed an object containing the new window dimensions:

```js
{
	w: window width,
	h: window height,
}
```

By default this callback function is also called as it is bound, if the current browser window dimensions meet the criteria. If, for example, you call the `bind()` method on page load, your callback will fire on page load. To switch this behaviour off see the `fire_now` param below.

#### `fire_now` boolean
If true (default) the callback function is called as it is bound, if the browser dimensions meet the criteria in `query`. Set to false if you only want the function to be called when the browser is resized.

This default behaviour provides an easy way to call your function on page load as well as on browser resize.