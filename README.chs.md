# URL Capture

一个给URL截图的工具（利用[PhantomJS](http://phantomjs.org/)）。

## 如何使用

1. [下载本工具](https://github.com/SilentDepth/url-capture/archive/master.zip)（一个zip文件），然后解压到任意位置。
2. [下载PhantomJS](http://phantomjs.org/download.html)并添加到`PATH`。如果你不知道怎样设置`PATH`，从`bin`目录中把可执行文件（例如`phantomjs.exe`）提取到第一步使用的位置就好了。
3. 看一下`config.js`，看看有什么需要改的。
4. 从本工具目录运行命令行，执行如下命令：
    - 如果你有很多URL要截图：`phantomjs index.js path/to/url-data-file`
    - 如果你只想截几个图：`phantomjs index.js url1 url2 ...`
5. 执行完成时你会在`screenshots`目录下看到图片。

## URL数据文件

_还没写好……_

## 有问题？

我在学习PhantomJS时做了这个工具，并没有做严谨的测试。如果你发现哪里有问题，欢迎提Issue或PR。