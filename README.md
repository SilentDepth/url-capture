_中文版见[README.chs.md](https://github.com/SilentDepth/url-capture/blob/master/README.chs.md)_

# URL Capture

Capture screenshots for URLs using [PhantomJS](http://phantomjs.org/).

## How to use

1. [Download this tool](https://github.com/SilentDepth/url-capture/archive/master.zip) (a zip-file) and extract the content to somewhere.
2. [Download PhantomJS](http://phantomjs.org/download.html) and add it into `PATH`. If you don't know how to set `PATH`, just extract the executable (i.e. `phantomjs.exe`) under `bin` folder to the place from step 1.
3. Look at the `config.js` and change anything you need.
4. Launch terminal from the folder you extract this tool to. Run command:
    - If you have lots of URL to capture: `phantomjs index.js path/to/url-data-file`
    - If you just want to capture some: `phantomjs index.js url1 url2 ...`
5. When it is done you will see the images in `screenshots` folder.

## URL Data File

_to be written..._

## Anything wrong?

I made this tool as a PhantomJS practice and I didn't test it seriously. If you find anything wrong, issues or pull requests are appreciated.