const AntPathMatcher = require('ant-path-matcher');

class FilterChain {
    constructor(filters) {
        this.filters = filters;
        this.filtersIndex = 0;
    }

    doFilter(req, res) {
        if (this.filtersIndex === this.filters.length)
            return;
        let filter = this.filters[this.filtersIndex++];
        let matcher = new AntPathMatcher();
        let isMatch = matcher.match(filter.pattern(), req.url);
        if (isMatch) {
            filter.doFilter(req, res, this);
        }
    }
}

module.exports = FilterChain