import gulp from 'gulp';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import cssmin from 'gulp-minify-css';
import rename from 'gulp-rename';
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

/**
 * 定义less编译任务
 */
gulp.task('less', () => {
    gulp.src(['src/flex.less', 'src/data-flex.less']) //需要编译的less文件
        .pipe(less())
        .pipe(autoprefixer({ //添加浏览器兼容的前缀
            browsers: [
                'ie >= 8',
                'ie_mob >= 10',
                'ff >= 26',
                'chrome >= 30',
                'safari >= 6',
                'opera >= 23',
                'ios >= 5',
                'android >= 2.3',
                'bb >= 10'
            ]
        }))
        .pipe(cssmin()) //压缩css
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist')); //编译后输出目录
});


// 静态服务器 + 监听 less/html 文件
gulp.task('dev', ['less'], () => {

    browserSync.init({
        server: './'
    });

    // 看守.less 档
    gulp.watch('src/*.less', ['sass']);

    gulp.watch('./*.html').on('change', reload);;

});

gulp.task('default', ['dev']);