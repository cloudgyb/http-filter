const http = require('http')
const HttpFilter = require("../src/index");

const IPAccessControlFilter = require('./IPAccessControlFilter');
const iFrameHeaderFilter = require('./IFrameHeaderFilter');
const HttpRequestHandler = require('./HttpRequestHandler');

const filters = []
filters.push(new IPAccessControlFilter("/**"));
filters.push(new iFrameHeaderFilter("/**"));
filters.push(new HttpRequestHandler("/**"));

//创建http server并监听在80端口
http.createServer((req, res) => {
    const filterChain = new HttpFilter.FilterChain(filters);
    filterChain.doFilter(req, res);
}).on("listening", () => {
    console.log("process listen at " + 80 + "...")
}).listen(80);