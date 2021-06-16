---
title: php_parser
toc: true
date: 2021-06-11 16:18:10
thumbnail: /images/2021/岁月的童话2.jpg
tags:
  - php
  - blog
categories:
  - php

---


```php
<?php

$code = <<<'CODE'
<?php

function test($foo)
{
    var_dump($foo);
}

class Cat
{
    public int $a = 1;
    protected float $b = 2;
    public function __construct($a) {
        $this->a = $a;
    }
}
$cat = new Cat(1);
$f = function () use ($cat){
    echo $cat;
};
CODE;

/**
  * 创建一个php7的语法解析器（Parser），在没有传入词法解析器（Lexer）的时候会创建一个默认的词法分析器
  * 同时如果没有指定只使用php7的语法解析器，那么将会同时创建一个php7和一个php5的parser
  */
$parser = (new ParserFactory)->create(ParserFactory::PREFER_PHP7);

try {
    /* @var $parser Multiple */
    $ast = $parser->parse($code);
    /**
      * 解析时先使用[0]解析器，当解析存在报错时，会调用后续的解析器，直至等到一个完全没有解析错误的结果
      *
      * 上面的都不重要
      *
      */
} catch (Error $error) {
    echo "Parse error: {$error->getMessage()}\n";
    return 1;
}

$dumper = new NodeDumper;
echo $dumper->dump($ast) . "\n";
```


```php
$parser = (new ParserFactory)->create(ParserFactory::PREFER_PHP7);
```
创建一个php7的语法解析器（Parser），在没有传入词法解析器（Lexer）的时候会创建一个默认的词法分析器  
同时如果没有指定只使用php7的语法解析器，那么将会同时创建一个php7和一个php5的parser

默认lexer
```php
public function create(int $kind, Lexer $lexer = null, array $parserOptions = []) : Parser {
        if (null === $lexer) {
            $lexer = new Lexer\Emulative();
        }
```
默认parser
```php
case self::PREFER_PHP7:
      return new Parser\Multiple([
          new Parser\Php7($lexer, $parserOptions), new Parser\Php5($lexer, $parserOptions)
      ]);
```

解析时先使用\[0\]解析器，当解析存在报错时，会调用后续的解析器，直至等到一个完全没有解析错误的结果
```php
public function parse(string $code, ErrorHandler $errorHandler = null) {
    if (null === $errorHandler) {
        $errorHandler = new ErrorHandler\Throwing;
    }

    list($firstStmts, $firstError) = $this->tryParse($this->parsers[0], $errorHandler, $code);
    if ($firstError === null) {
        return $firstStmts;
    }

    for ($i = 1, $c = count($this->parsers); $i < $c; ++$i) {
        list($stmts, $error) = $this->tryParse($this->parsers[$i], $errorHandler, $code);
        if ($error === null) {
            return $stmts;
        }
    }

    throw $firstError;
}
```

**上述都不重要**

> 自己传入异常，当有错的时候抛出这个写法有点意思呀

**这个项目用的是get_token_all**研究卒
<!--more-->


