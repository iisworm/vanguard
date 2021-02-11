module.exports = [{
  script: 'bot.js',
  name: 'Vanguard',
  error_file: '../pm2 logs/error.log',
  out_file: '../pm2 logs/out.log',
  time: true,
  watch: true,
  ignore_watch: 'node_modules',

}]
