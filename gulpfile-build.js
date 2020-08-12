// 加载模块
const {task,src,dest,watch,series,parallel} = require('gulp');
// 用于加载其他gulp插件
const load = require('gulp-load-plugins')();
// nodejs的del模块用于删除文件
const del = require('del');

// 删除dist目录
task('delDist',async ()=>{
  await del('./dist');
})

// 处理图片
task('image', async ()=>{
  src('./img/*.*')
  .pipe(dest('./dist/img'))
})

// 处理scss
task('style', async ()=>{
  src('./scss/*.scss')
  .pipe(load.sassChina())
  .pipe(load.rev())
  .pipe(load.minifyCss())
  .pipe(dest('./dist/css'))
  .pipe(load.rev.manifest())
  .pipe(dest('./rev/css'))
})

// 处理js
task('script', async ()=>{
  src('./js/*.js')
  .pipe(load.rev())
  .pipe(load.babel({presets: ['@babel/env']}))
  .pipe(load.uglify())
  .pipe(dest('./dist/js'))
  .pipe(load.rev.manifest())
  .pipe(dest('./rev/js'))
})

// 处理html
task('html', async ()=>{
  setTimeout(()=>{
    src(['./rev/**/*.json','./html/*.html'])
    .pipe(load.revCollector({replaceReved:true}))
    .pipe(load.minifyHtml())
    .pipe(dest('./dist/html'))
  },2000);
})

// 监听文件变化
// task('watch',async ()=>{
//   watch('./img/*.*',series('image'));
//   watch('./css/*.css',series('style'));
//   watch('./js/*.js',series('script'));
//   watch('./html/*.html',series('html'));
// })

// 启动服务，自动刷新
task('connect',async ()=>{
  load.connect.server({
    root: './dist',
    livereload: true,
    port: 3001
  });
})

// 构建生产包
task('build',series('delDist','image','style','script','html','connect'))
