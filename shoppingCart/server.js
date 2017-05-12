var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')//webpack-hot-middleware是做热加载用的，webpack-dev-middleware是存储静态资源的，你这种方式一般都是开发环境用的，正式环境建议打包文件
var config = require('./webpack.config')
var express = require('express')
var app = new (require('express'))()
var port = 3003

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname+ '/public'))
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
