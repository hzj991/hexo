---
title: 'PHP[011]:curl'
date: '2018-10-27T17:48:44+08:00'
tags:
    - php
    - http
categories:
    - php

---



今天在研究了下 php curl cookie的使用 , 本來打算写一篇关于 php curl 的使用，主要是关于 cookie 的，但是 curl 在一定程度上相比于 socket 算是一个经过封装的扩展，所以写的过程中又引入了一个使用 socket 进行 http 请求的文章

>PHP 支持 Daniel Stenberg 创建的 libcurl 库，能够连接通讯各种服务器、使用各种协议。libcurl 目前支持的协议有 http、https、ftp、gopher、telnet、dict、file、ldap。 libcurl 同时支持 HTTPS 证书、HTTP POST、HTTP PUT、 FTP 上传(也能通过 PHP 的 FTP 扩展完成)、HTTP 基于表单的上传、代理、cookies、用户名+密码的认证

curl 基础用法
```
$ch = curl_init();
curl_setopt($ch,xxx,xxx);
curl_setopt_array($ch,[]);
curl_exec($ch);
curl_close($ch);
```

### 使用socket进行http访问 （这一部分可以跳过，之后再看）
这是一段使用 php socket 模拟 http get 请求的代码
```php
<?php
/**
 * super socket client
 */
define('GET', 'GET');
define('POST', 'POST');
define('sp', "\r\n");
$url                     = 'http://localhost:8080/';
$url                     = 'https://www.xiaozhu.com/';
$body                    = '';
$protocol                = 'HTTP/1.1';
$urlInfo                 = parse_url($url);
$host                    = $urlInfo['host'];
$port                    = $urlInfo['port'] ?? '80';
$headerArr               = [
    'Host' => $host
];
$headerArr['User-Agent'] = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36';
if (stristr($url, 'xiaozhu')) {
    $headerArr['connection'] = 'close';
}
$method                  = GET;
$requestLine             = $method . ' ' . $urlInfo['path'] . '' . '?' . ($urlInfo['query'] ?? '') . ' ' . $protocol;
$header                  = '';
foreach ($headerArr as $key => $value) {
    $header .= $header == '' ? ($key . ':' . $value) : (sp . $key . ':' . $value);
}
$requestHeader = $header . sp . sp;
$requestInfo   = $requestLine . sp . $requestHeader;
$requestInfo   .= $body;

$fp = fsockopen($host, $port, $errno, $errStr);

if (!$fp) {
    echo $errStr . '(' . $errno . ')';
    return;
}
function readByFEof($fp)
{
    $str = '';
    while (!feof($fp)) {
        $result = fread($fp, 1024);
        $str    .= $result;
    }
    return $str;
}

if (fwrite($fp, $requestInfo)) {
    $responseInfo = readByFEof($fp);
}
fclose($fp);
echo $responseInfo;
```
这是一段使用 php socket 模拟 http get 请求的代码
```php
<?php
/**
 * super socket client
 */
define('GET', 'GET');
define('POST', 'POST');
define('sp', "\r\n");
//$url = 'http://localhost:8080/';
$url                         = 'http://www.xiaozhu.com/';
$body                        = '';
$protocol                    = 'HTTP/1.1';
$urlInfo                     = parse_url($url);
$host                        = $urlInfo['host'];
$port                        = $urlInfo['port'] ?? '80';
$headerArr                   = [
    'Host' => $host
];
$postData                    = ['username' => '发一个中文', 'age' => 22];
$body                        = http_build_query($postData);
$headerArr['User-Agent']     = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36';
$headerArr['Content-Type']   = 'application/x-www-form-urlencoded';
$headerArr['Content-Length'] = strlen($body);
$headerArr['cookie']         = 'name=1417760419;';
if (stristr($url, 'xiaozhu')) {
    $headerArr['connection'] = 'close';
}
$method      = POST;
$requestLine = $method . ' ' . $urlInfo['path'] . '' . '?' . ($urlInfo['query'] ?? '') . ' ' . $protocol;
$header      = '';
foreach ($headerArr as $key => $value) {
    $header .= $header == '' ? ($key . ':' . $value) : (sp . $key . ':' . $value);
}
$requestHeader = $header . sp . sp;
$requestInfo   = $requestLine . sp . $requestHeader;
$requestInfo   .= $body;

$fp = fsockopen($host, $port, $errno, $errStr);

if (!$fp) {
    echo $errStr . '(' . $errno . ')';
    return;
}

/**
 * PHP 的 feof() 函数用于检测是否已到达文件末尾 (eof)。如果文件指针到了 EOF 或者出错时则返回 TRUE，否则返回一个错误（包括 socket 超时），其它情况则返回 FALSE。
 * while (!feof($fp)) 即当文件指针没有达到 End Of File，就循环读入数据直至读完。这是一个常见用法，我们使用fsockopen打开一个$fp来发送http头，请求后用feof判断是否读完来获取服务器响应的内容。
 * 但是这使用feof时要特别注意一点，php手册上关于feof有这样一个说明：
 * Warning：如果服务器没有关闭由 fsockopen() 所打开的连接，feof() 会一直等待直到超时而返回 TRUE。默认的超时限制是 60 秒，可以使用 stream_set_timeout() 来改变这个值。
 * 也就是一个打开的socket连接，没有在读完后关闭，feof会一直返回true直到超时。
 */
function readByFEof($fp)
{
    $str = '';
    while (!feof($fp)) {
        $result = fread($fp, 1024);
        $str .= $result;
    }
    return $str;
}

if (fwrite($fp, $requestInfo)) {
    $responseInfo = readByFEof($fp);
}

echo $responseInfo;
```

### curl 进行请求

```php
<?php
$url         = 'http://localhost:8080/';
$path        = __DIR__ . '/tmp';
$cookie_file = $path . '/cookie.txt';

if (!file_exists($cookie_file)) {
    file_put_contents($cookie_file, '');
}

// init

$ch = curl_init();

// set

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt_array($ch, [
    CURLOPT_URL            => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING       => '',
    CURLOPT_MAXREDIRS      => 10,
    CURLOPT_TIMEOUT        => 60,
    CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST  => 'POST',
    CURLOPT_COOKIEFILE     => $cookie_file,
    CURLOPT_COOKIEJAR      => $cookie_file,
]);

// $cookie = 'a=b;c=d;name=方世玉';
// curl_setopt($ch, CURLOPT_COOKIE, $cookie);
// exec

$output = curl_exec($ch);

if ($output === FALSE) {
    echo 'CURL Error:' . curl_error($ch);
}

// close

curl_close($ch);

echo $output;
```

上面就是一个带有 cookie 的 http 请求，cookie 在 php-curl 的设置中有4种

（ 我才发现我用的这个主题不支持表格md mmp)

- CURLOPT_COOKIE     
  -  包含 cookie 数据的文件名，cookie 文件的格式可以是 Netscape 格式，或者只是纯 HTTP 头部风格，存入文件。如果文件名是空的，不会加载 cookie，但 cookie 的处理仍旧启用。 
- CURLOPT_COOKIEFILE 
  -  包含 cookie 数据的文件名，cookie 文件的格式可以是 Netscape 格式，或者只是纯 HTTP 头部风格，存入文件。如果文件名是空的，不会加载 cookie，但 cookie 的处理仍旧启用。 
- CURLOPT_COOKIEJAR  
  -  连接结束后，比如，调用 curl_close 后，保存 cookie 信息的文件。                                                                                                     |

还有一种方法就是在header中直接设置

正常使用的话 CURLOPT_COOKIEFILE , CURLOPT_COOKIEJAR 这两个设置使用起来很方便如果使用其他的方式的话，那么需要自行处理 cookie 的存储

在使用 CURLOPT_COOKIEJAR 发现了一个有趣的事，相比与日常使用的浏览器（谷歌，edge等），我们使用脚本进行请求cookie请求会将cookie保存起来并不会过期这就会导致尽管cookie已经过期了但是仍然传送了过去，其实从某些方面来说也可以把这个作为一个辨别是否是爬虫的手段（手动滑稽）

在使用 socket 进行 http 模拟的时候很明显就能感觉到是字符串在通信，传过去的和传回来的都是按格式规整好的字符串

发送
```http
POST /? HTTP/1.1
Host:localhost
User-Agent:Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36
Content-Type:application/x-www-form-urlencoded
Content-Length:61
cookie:name=1417760419;

username=%E5%8F%91%E4%B8%80%E4%B8%AA%E4%B8%AD%E6%96%87&age=22
```
返回
```http
HTTP/1.1 200 OK
Host: localhost
Date: Sun, 10 Feb 2019 23:15:08 +0800
Connection: close
X-Powered-By: PHP/7.2.10-0ubuntu0.18.04.1
Set-Cookie: mc1549811708=my+cookie+value
Set-Cookie: mc=my+cookie+value; expires=Sun, 10-Feb-2019 15:15:07 GMT; Max-Age=0
Content-type: text/html; charset=UTF-8

array (
    ....//太多了省略其实也就是一堆字符串
)
```

很容易看到一些关于 http 协议的参数，其中我在测试我们公司的主站时由于公司的服务器并没有主动断开 socket ，而我是用的 feof 读取返回值就导致程序一直等啊等，这一点我没有细做调试，所以也不太清楚是出在 nginx 上还是 php， 但是确实是可以让客户端和服务端建立长久的无用链接如果在客户端设置 Connection: close，也可以解决这种问题，而这种问题出现的源头是http1.1支持相关网络请求相关的实现，有兴趣的同学可以自行研究一下（手动狗头）

