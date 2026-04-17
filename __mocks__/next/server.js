class NextResponse {
  constructor(body, init = {}) {
    this._body = body;
    this.status = init.status || 200;
    this.headers = new Map(Object.entries(init.headers || {}));
  }

  static json(data, init = {}) {
    const res = new NextResponse(JSON.stringify(data), init);
    res._json = data;
    return res;
  }

  async json() {
    return this._json ?? JSON.parse(this._body);
  }
}

class NextRequest {
  constructor(url, init = {}) {
    this.url = url;
    const parsed = new URL(url);
    this.nextUrl = {
      pathname: parsed.pathname,
      searchParams: parsed.searchParams,
    };
    this.method = init.method || "GET";
  }

  get searchParams() {
    return new URL(this.url).searchParams;
  }
}

module.exports = { NextResponse, NextRequest };
