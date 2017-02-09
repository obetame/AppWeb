var gulp = require('gulp');
var path = require('path');
var webpack = require('gulp-webpack');

var uglify = require('gulp-uglify'); //js代码压缩
var sass = require('gulp-sass');
var notify = require('gulp-notify'); //通知信息
var autoprefixer = require('gulp-autoprefixer');

var rev = require('gulp-rev');
var HtmlWebpackPlugin = require('html-webpack-plugin');

let modules = {
	loaders: [{
		//这是处理es6文件
		test: /\.js$/,
		loader: 'babel-loader',
		exclude: /node_modules/,
		query: {
			presets: ['es2015'],
			plugins: ['transform-runtime']
		}
	}, {
		//这是处理scss文件
		test: /\.scss$/,
		loader: 'style!css!sass'
	}, {
		test: /\.vue$/,
		loader: "vue"
	}, {
		// 这是处理css文件
		test: /\.css$/,
		loaders: ["style", "css"]
	}, {
		test: /\.(png|jpg|gif)$/,
		loader: 'url',
		query: {
			// inline files smaller then 10kb as base64 dataURL
			limit: 10000,
			// fallback to file-loader with this naming scheme
			name: '[name].[ext]?[hash]'
		}
	}]
}

gulp.task('sass', function() {
	return gulp.src('./sass/*.scss')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'last 3 Safari versions'],
			cascade: true,
			remove: true
		}))
		.pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function() {
	gulp.watch('./sass/*.scss', ['sass']);
});

gulp.task('start', ['sass'], function() {
	return gulp.src('./src/appweb.js')
		.pipe(webpack({
			watch: true,
			output: {
				filename: 'bundle-appweb.js'
			},
			module: modules,
			resolve: {
				extensions: ['', '.js', '.jsx'],
				alias: {
					'vue$': 'vue/dist/vue.js'
				}
			},
		}))
		// .pipe(uglify())//生产的时候再启用压缩
		// .pipe(rev())
		.pipe(gulp.dest('dist/'))
		// .pipe(rev.manifest())
		// .pipe(gulp.dest('html/dist/'))
		.pipe(notify("<%= file.relative %> 成功生成!"));
});
