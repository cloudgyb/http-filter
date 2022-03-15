# Http-filter

A filter is an object that performs filtering tasks on either the request to a resource,or on the response from a
resource, or both.

## Install

```shell
npm i @cloudgyb/http-filter
```

## Usage

```javascript
const HttpFilter = require('http-filter');
const http = require('http');

/**
 * Prevent IFRAME nesting by add 'X-Frame-Option' response header.
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

/**
 * ip access control, disable access to the specified IP
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

//The order in which filters are executed depends on the index of the following array elements.
const filters = []
filters.push(new IPAccessControlFilter("/**"));
filters.push(new IFrameHeaderFilter("/**"));

//create a http server and listen at 80
http.createServer((req, res) => {
    const filterChain = new HttpFilter.FilterChain(filters);
    filterChain.doFilter(req, res);
    res.writeHead(200, {'content-type': 'text/html'})
    res.end("<h2>OK!<h2>");
}).on("listening", () => {
    console.log("process listen at " + 80 + "...")
}).listen(80);
```