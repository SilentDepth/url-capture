# URL Capture

Capture screenshots for URLs using [PhantomJS](http://phantomjs.org/).

使用[PhantomJS](http://phantomjs.org/)对URL截图。

## How to use 使用方法

1. [Download this script](https://raw.githubusercontent.com/SilentDepth/url-capture/master/dist/url-capture.js).
2. [Download PhantomJS](http://phantomjs.org/download.html) and add it into `PATH`. If you don't know how to set `PATH`, just extract the executable (i.e. `phantomjs.exe`) under `bin` folder to the place where the script from step 1 exists.
3. Launch cmd/terminal from the script folder. Run command: `phantomjs url-capture.js <url>`.
4. When it is done you will see the images in `screenshots` folder. (Or any other place. See below for detail).

---

1. [下载这个脚本](https://raw.githubusercontent.com/SilentDepth/url-capture/master/dist/url-capture.js)。
2. [下载PhantomJS](http://phantomjs.org/download.html)，然后把它添加到`PATH`。如果你不知道什么是`PATH`，从下载得到的压缩包中把`bin`目录下的可执行文件（例如`phantomjs.exe`）解压到下载第1步的脚本的相同目录就可以了。
3. 从那个脚本所在目录启动命令行或终端，执行命令：`phantomjs url-capture.js <url>`。
4. 程序执行完成后你会在`screenshots`目录看到截图文件。（或者其他位置，详见下文。）

## CLI

`phantomjs url-capture.js [ -s | -v ] [ <url> | -u <url1> <url2> ... ] [ [ -o ] <output> ]`

- `-s`
    - Silent mode. Almost no log will be printed.
    - 安静模式。基本不会输出日志。
- `-v`
    - Debug mode. Will print debug info.
    - 调试模式。会输出调试信息。
- `-u`
    - Multi-URL mode. Use it when you want to capture more URLs at one time.
    - 多URL模式。想一次截图多个URL时需要设定这个。
- `-o`
    - Output path. Use it when you want to set another place to save the images. If only one URL is given, this stands for the image path, or it stands for the folder which stores images. The `-o` can be omitted only when it is not ambiguous. The default path is `./screenshots`.
    - 截图位置。想指定截图位置时需要设定这个。如果只提供了一个URL，这个参数表示截图文件的路径；否则这个参数表示存放截图文件的目录路径。`-o`只可以在不造成歧义时被省略。默认位置是`./screenshots`。
    