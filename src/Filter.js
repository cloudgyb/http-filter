class Filter {
    constructor(pattern) {
        this._pattern = pattern
    }

    pattern() {
        return this._pattern;
    }

    doFilter(req, resp, filterChain) {

    }
}

module.exports = Filter