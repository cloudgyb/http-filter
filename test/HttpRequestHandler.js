const HttpFilter = require("../src/index");

/**
 * 非线程安全，不要使用共享变量
 * 最后一个filter，响应一个字符串
 * @author cloudgyb
 */
class HttpRequestHandler extends HttpFilter.Filter {
    constructor(pattern) {
        super(pattern);
    }

    doFilter(req, res, filterChain) {
        res.end("Running...!");
        filterChain.doFilter(req, res);
    }
}

module.exports = HttpRequestHandler