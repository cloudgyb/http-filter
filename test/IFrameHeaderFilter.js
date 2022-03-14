const HttpFilter = require("../src/index");

/**
 * 增加防止IFrame嵌套的响应头
 * @author cloudgyb
 */
class IFrameHeaderFilter extends HttpFilter.Filter {
    constructor(pattern) {
        super(pattern);
    }

    doFilter(req, resp, filterChain) {
        resp.setHeader("X-Frame-Option", "SAMEORIGIN");
        filterChain.doFilter(req, resp);
    }
}

module.exports = IFrameHeaderFilter