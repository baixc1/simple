var cheerio = require('cheerio');
var http = require('http');
var iconv = require('iconv-lite');

var index = 1; //页面数控制
var url = 'http://www.ygdy8.net/html/gndy/dyzz/list_23_';
var titles = []; //用于保存title

function getTitle(url, i) {
	http.get(url + i + '.html', function(sres) {
		var chunks = [];
		sres.on('data', function(chunk) {
			chunks.push(chunk);
		});
		// chunks里面存储着网页的 html 内容，将它zhuan ma传给 cheerio.load 之后
		// 就可以得到一个实现了 jQuery 接口的变量，将它命名为 `$`
		// 剩下就都是 jQuery 的内容了
		sres.on('end', function() {
			var titles = [];
			//由于咱们发现此网页的编码格式为gb2312，所以需要对其进行转码，否则乱码
			//依据：“<meta http-equiv="Content-Type" content="text/html; charset=gb2312">”
			var html = iconv.decode(Buffer.concat(chunks), 'gb2312');

			var $ = cheerio.load(html, {
				decodeEntities: false
			});
			$('.co_content8 .ulink').each(function(idx, element) {
				var $element = $(element);
				titles.push({
					title: $element.text(),
					url: $element.attr('href')
				});
			});
			
			getBtLink(titles, i)
//			if(i < 1) {
//				getTitle(url, ++index);
//			}

		});
	});
}
getTitle(url, index);

var btLink = [];
function getBtLink(urls, n) { //urls里面包含着所有详情页的地址
	console.log(urls[n].url);
  http.get('http://www.ygdy8.net' + urls[n].url, function(sres) {
    var chunks = [];
    sres.on('data', function(chunk) {
      chunks.push(chunk);
    });
    sres.on('end', function() {
      var html = iconv.decode(Buffer.concat(chunks), 'gb2312'); //进行转码
      var $ = cheerio.load(html, {decodeEntities: false});
      $('#Zoom td').children('a').each(function (idx, element) {
        var $element = $(element);
        btLink.push({
          bt: $element.attr('href')
        })
      })
      
      if(n < urls.length - 1) {
        getBtLink(urls, ++n); //递归
      } else {
        console.log(btLink);   
      }
    });
  });
}

function mysql(){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '123456',
	  database : 'test'
	});
	 
	connection.connect();
	 
	connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
	  if (error) throw error;
	  console.log('The solution is: ', results[0].solution);
	});
}
