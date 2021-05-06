// const http = require('http');
// http.createServer(function(request, response) {
//   // 设置响应头
//   response.writeHeader(200, {
//     "Content-Type" : "text/plain"
//   });
//   // 响应主体为 "Hello world!"
//   response.write("Hello world!");
//   response.end();
// })
// // 设置监听端口为9000
// .listen(9000);

// var fs = require("fs")
// var exec = require('child_process').exec;
// function execute(cmd) {
//     exec(cmd, function (error, stdout, stderr) {
//         if (error) {
//             console.error(error);
//         }
//         else {
//             console.log("success");
//         }
//     });
// }

// var dir = './tmp'
// var filename = '/tmp.txt';
// var haveDir = false
// try {
//     var stat = fs.statSync(dir);
//     haveDir = stat.isDirectory();
// } catch (error) {

// }

// if (!haveDir) {
//     fs.mkdirSync(dir);
// }

// fs.appendFileSync(dir + filename, 'content')

// execute("code " + dir + filename);


var simpleAsyncFunction = function (say, callback) {
    setImmediate(() => {
        console.log(say);
        callback(say);
    })
}
simpleAsyncFunction('nihao',function(say){
    console.log('callback is ' + say);
})
console.log('end');
// 运行结果为，下实现了异步
// end
// nihao
// callback is nihao