# Lethargy
[![CDNJS](https://img.shields.io/cdnjs/v/lethargy.svg)](https://cdnjs.com/libraries/lethargy)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fd4nyll%2Flethargy.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fd4nyll%2Flethargy?ref=badge_shield)

Lethargy is a tiny (612b minified + gzipped) JavaScript library to help distinguish between scroll events initiated by the user, and those by inertial scrolling. Lethargy does ***not*** have external dependencies.

Lethargy is used in [smartscroll](https://github.com/d4nyll/smartscroll), a jQuery scroll plugin, to resolve problems with inertial scrolling.

### [Demo](http://d4nyll.github.io/lethargy/)

### Install

Download `lethargy.js` or `lethargy.min.js`

**Bower**

    bower install lethargy

**npm**

    npm install lethargy

### Use

Include `lethargy.min.js` in your document.

    <script src="./lethargy.js"></script>

Create an instance of Lethargy. You may pass in options (see below), but usually the default is good enough.

    var lethargy = new Lethargy(); // Use defaults
    var lethargy = new Lethargy(7, 100, 0.05); // Tinkering with the options

> If you found optimizations for the defaults, please share it in this [ticket](https://github.com/d4nyll/lethargy/issues/2)!

Bind the mousewheel or scroll events and pass the event to Lethargy.

    $(window).bind('mousewheel DOMMouseScroll wheel MozMousePixelScroll', function(e){
        e.preventDefault()
        e.stopPropagation();
        if(lethargy.check(e) !== false) {
            // Do something with the scroll event
        }
    });


`lethargy.check(e)` will return `1` if it is a normal scroll *up* event, `-1` if it is a normal scroll *down* event, and `false` if it is initiated by inertial scrolling.

Lethargy focus on preventing false positives (saying it's a normal scroll event when it wasn't), but tolerates false negatives (saying it's not a normal scroll event when it is).

#### Webpack

If you are using Webpack, you can use the [`exports-loader`](https://www.npmjs.com/package/exports-loader) to require the `Lethargy` constructor.

```
$ yarn add exports-loader
```

Then, to import Lethargy:

```
const Lethargy = require("exports-loader?this.Lethargy!lethargy/lethargy");
```

### Options

All options are optional.

![MacBook Air Trackpad `wheelDelta` curve](http://blog.danyll.com/content/images/2015/05/air.png)

**stability** - Specifies the length of the rolling average. In effect, the larger the value, the smoother the curve will be. This attempts to prevent anomalies from firing 'real' events. Valid values are all positive integers, but in most cases, you would need to stay between `5` and around `30`.

**sensitivity** - Specifies the minimum value for `wheelDelta` for it to register as a valid scroll event. Because the tail of the curve have low `wheelDelta` values, this will stop them from registering as valid scroll events. The unofficial standard `wheelDelta` is `120`, so valid values are positive integers below `120`.

**tolerance** - Prevent small fluctuations from affecting results. Valid values are decimals from `0`, but should ideally be between `0.05` and `0.3`.

### What problem does it solve?

Scroll plugins such as [smartscroll](https://github.com/d4nyll/smartscroll), [jquery-mousewheel](https://github.com/jquery/jquery-mousewheel) or [fullPage.js](http://alvarotrigo.com/fullPage/) work by detecting scroll events and then doing something with them, such as scroll to the next frame. However, inertial scrolling continues to emit scroll events even after the user stopped, and this can often lead to problems, such as scrolling two to three frames when the user only scrolled once.

Below charts the `wheelDelta` values of each scroll action using this [Gist](https://gist.github.com/msimpson/cd7eca7907132c984171) and [demo](http://jsfiddle.net/n7bk6pb9/1/) by [Matthew Simpson](https://github.com/msimpson).

**Desktop Mouse**

![Desktop Mouse `wheelDelta` graph](http://blog.danyll.com/content/images/2015/05/desktop.png)

**MacBook Air Trackpad**

![MacBook Air Trackpad `wheelDelta` curve](http://blog.danyll.com/content/images/2015/05/air.png)

As you can see, the Desktop Mouse emits small 

### How does it work?

Lethargy keeps a record of the last few `wheelDelta` values that is passed through it, it will then work out whether these values are decreasing (decaying), and if so, concludes that the scroll event originated from inertial scrolling, and not directly from the user.

### Limitations

Not all trackpads work the same, some trackpads do not have a decaying `wheelDelta` value, and so our method of decay detection would not work. Instead, to cater for this situation, we had to, grudgingly, set a very small time delay between when events will register. We have tested this and for normal use does not affect user experience more than usual.

**ASUS Trackpad**

![ASUS Trackpad](http://blog.danyll.com/content/images/2015/05/asus.png)


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fd4nyll%2Flethargy.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fd4nyll%2Flethargy?ref=badge_large)
