# URL Capture

Capture screenshots for URLs using [PhantomJS](http://phantomjs.org/).

## What is this

Just a tool for you to put urls in, and screenshots of those out (as png-images). Technically it's a pre-written script for PhantomJS to run.

## What is PhantomJS

It's a headless browser-like program based on QtWebKit. You can find more information on it's [official website](http://phantomjs.org/).

## How to use

1. [Download this repo](https://github.com/SilentDepth/url-capture/archive/master.zip) (a zip-file) and extract the content to somewhere.
2. [Download and install PhantomJS](http://phantomjs.org/download.html).
    - Actually you're not really installing something. Just download the zip-file and extract the executable (i.e. `phantomjs.exe`) under `bin` folder to the folder you used in step 1.
    - This tool doesn't really need the executable be in the same folder, you can do as you wish if you know how to set `PATH`.
3. Check the settings in `config.json`, change anything if you need. And make sure there's a `urls.txt` besides `index.js`.
4. `cd` to the folder. Run command: `phantomjs index.js`.
5. When it is done you will see the result in `screenshots` folder.

## Anything wrong?

I made this tool to familiar with PhantomJS and I didn't test it seriously. If you find anything wrong, issues or pull requests are appreciated.