const HttpFilter = require("../src/index");

/**
 * ip访问控制
 * @author cloudgyb
 */
class IPAccessControlFilter extends HttpFilter.Filter {
    constructor(pattern) {
        super(pattern);
    }

    doFilter(req, resp, filterChain) {
        let remoteAddress = req.socket.remoteAddress;
        if (remoteAddress === "192.168.1.121") {
            resp.writeHead(400);
            resp.write("  ");
            resp.end();
            return;
        }
        filterChain.doFilter(req, resp);
    }
}

module.exports = IPAccessControlFilter