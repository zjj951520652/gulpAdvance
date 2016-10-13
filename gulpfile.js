var gulp=require("gulp");
var webserver = require("gulp-webserver");
var url = require("url");
var fs = require("fs");
var sass=require("gulp-sass");
//css 压缩
var minifyCss = require("gulp-minify-css");
//丑化
var uglify = require("gulp-uglify");
//监控模块
var watch=require("gulp-watch");
//模块化打包工具
var webpack = require("gulp-webpack");
//命名模块
var named = require("vinyl-named");

//版本模块
var rev = require("gulp-rev");
//版本控制模块
var revCollector= require("gulp-rev-collector");
//队列模块
var sequence = require("gulp-watch-sequence");

//压缩html
var minifyHTML=require("gulp-minify-html");




//开发环境为src,生产环境为www
gulp.task("copy-index",function(){
	return gulp.src("./src/index.html")
	.pipe(gulp.dest("./www"));
})

gulp.task("images",function(){
  return gulp.src("./images/**")
  .pipe(gulp.dest("./www/images"));
})

gulp.task('webserver', function() {
    gulp.src('www')       //在这指定了www 在浏览器中不需要加www
    .pipe(webserver({
      livereload: true,
      //directoryListing: true,       //显示文件列表
      open: true,
      //port:8080;   //设置端口号;

      //实现mock数据
      //1.用户在浏览器里输入url地址,例如http://localhst/queryList
      //2.系统通过判断，获取到url的地址参数，即queryList
      //3.通过地质参数queryList去查找相应的json文件
      //4.读取json文件,将其（渲染到）（写入）浏览器；
      middleware:function(req,res,next){
          
          var urlObj = url.parse(req.url,true),
          method = req.method;

          //console.log(urlObj);

          switch(urlObj.pathname){
          	case "/api/skill":
          	//设置头信息
          	res.setHeader("Content-type","application/json");
          	//读取本地json文件，并将读取的信息内容设置编码，然后将内容转化为data数据返回
          	fs.readFile("mock/skill.json","utf-8",function(err,data){
          	//res的全称是response(响应)，end是结束的意思，就是把我们的data数据渲染到浏览器上
          	res.end(data);
          	})
          	return;
          	case "/api/work":
          	//设置头信息
          	res.setHeader("Content-type","application/json");
          	//读取本地json文件，并将读取的信息内容设置编码，然后将内容转化为data数据返回
          	fs.readFile("mock/work.json","utf-8",function(err,data){
          		//res的全称是response，end是结束的意思，就是把我们的data数据渲染到浏览器上
          		res.end(data);
          	})
          	return;
          	case "/api/project":
          	//设置头信息
          	res.setHeader("Content-type","application/json");
          	//读取本地json文件，并将读取的信息内容设置编码，然后将内容转化为data数据返回
          	fs.readFile("mock/project.json","utf-8",function(err,data){
          		//res的全称是response，end是结束的意思，就是把我们的data数据渲染到浏览器上
          		res.end(data);
          	})
          	return;
          	default:
          	;
          }
          
          next();  //解决循环遍历操作  很重要;

      } //end middleware

    }));
});

//将sass进行转换
gulp.task("sass",function(){
	return gulp.src("./src/styles/**/*.scss")
	.pipe(sass())
	.pipe(gulp.dest("www/css"));
})

//js模块化管理

var jsFiles = ["src/scripts/index.js"];

//打包js

gulp.task("packjs",function(){
	return gulp.src(jsFiles)
	.pipe(named())
	.pipe(webpack())
	//.pipe(uglify())
	.pipe(gulp.dest("www/js"));
})

//版本控制
var cssDistFiles=["www/css/index.css"];
var jsDistFiles=["www/js/index.js"];

//css的ver控制
gulp.task("verCss",function(){
	return gulp.src(cssDistFiles)
	//生成一个版本
	.pipe(rev())
	//复制到指定的文件目录
	.pipe(gulp.dest("www/css"))
	//生成版本对应的映射关系
	.pipe(rev.manifest())
	//将映射文件输出到指定目录
	.pipe(gulp.dest("www/ver/css"));
})

//js的ver控制
gulp.task("verJs",function(){
	return gulp.src(jsDistFiles)
	//生成一个版本
	.pipe(rev())
	//复制到指定的文件目录
	.pipe(gulp.dest("www/js"))
	//生成版本对应的映射关系
	.pipe(rev.manifest())
	//将映射文件输出到指定目录
	.pipe(gulp.dest("www/ver/js"));
})

//对html文件的版本内容的替换
gulp.task("html",function(){
	return gulp.src(["www/ver/**/*.json","www/*.html"])
	.pipe(revCollector({replaceReved:true}))
	.pipe(gulp.dest("www/"));
})

//设置监控
gulp.task("watch",function(){
	gulp.watch("./src/*.html",["copy-index"]);
    var queue = sequence(300);
    watch("src/scripts/**/*.js",{
    	name:"JS",
    	emitOnGlob:false},queue.getHandler("packjs","verJs","html"));

    watch("src/styles/**/*.*",{
    	name:"CSS",
    	emitOnGlob:false},queue.getHandler("sass","verCss","html"));
})

gulp.task("default",["webserver","watch"]);





