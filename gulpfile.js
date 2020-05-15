const   gulp =require("gulp");
const htmlmin=require("gulp-htmlmin");  //压缩html
const cssmin=require("gulp-clean-css");//压缩css
const jsmin=require("gulp-uglify");//压缩js
const concat=require("gulp-concat");//合并
const minimg=require("gulp-imagemin");// 压缩图片
const name =require("gulp-rename");// 更改名字
const babel = require('gulp-babel'); // es6 转es5
const ser =require("gulp-connect"); //启动简易服务器 (只做响应和请求的静态服务器)


gulp.task("default",async ()=>{


    gulp.watch("./*.html" , async ()=>{        // 监听html 并压缩 复制

        gulp.src("./*.html")
        .pipe(htmlmin({
            collapseWhitespace: true,   //压缩html
            removeComments: true , //   清除注释   
            collapseBooleanAttributes: true,  // 省略布尔属性的值
            removeEmptyAttributes: true, // 删除所有空格作为属性值得
            removeScriptTypeAttributes: true, // 删除的type="text/javascript"
            minifyJS: true,            //   压缩页面JS   
            minifyCSS: true  //  *压缩页面CSS*   
            }))
        .pipe(gulp.dest("E://phpStudy//WWW/wyyx"))

    });


    gulp.watch("./css/*.css" ,async ()=>{   //  监听css 并压缩复制 
        gulp.src("./css/*.css")
        .pipe(cssmin())
        .pipe(gulp.dest("E://phpStudy//WWW//wyyx/css"))

    });

    gulp.watch("./iconfont/**/*", async ()=>{    //复制 iconfont
        gulp.src("./iconfont/**/*")
        .pipe(gulp.dest("E://phpStudy//WWW//wyyx/iconfont"))
    });
    

    gulp.watch("./php/**/*" , async ()=>{    // 复制  php
    gulp.src("./php/**/*")
    .pipe(gulp.dest("E://phpStudy//WWW//wyyx/php"))
    });


    gulp.watch("./images/**/*" , async ()=>{   //复制图片
        gulp.src("./images/**/*")
        .pipe(gulp.dest("E://phpStudy//WWW//wyyx/images"))

    });

    gulp.watch("./img/**/*" , async ()=>{ //复制图片
        gulp.src("./img/**/*")
        .pipe(gulp.dest("E://phpStudy//WWW//wyyx//img"))

    });
    gulp.watch("./js/*.js" , async ()=>{  //  转化   压缩  复制到 js文件夹下
        gulp.src("./js/*.js")
        .pipe(babel({presets:['@babel/env']}))
        .pipe(jsmin())
        .pipe(gulp.dest("E://phpStudy//WWW//wyyx//js"))
    });



    gulp.watch("./json/**/*" , async ()=>{    // 复制  php
        gulp.src("./json/**/*")
        .pipe(gulp.dest("E://phpStudy//WWW//wyyx/json"))
        });
    



});
gulp.task('server', function () {
    ser.server({
        root: './target',
        livereload: true
    });
});
