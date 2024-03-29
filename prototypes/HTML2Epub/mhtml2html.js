!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.mhtml2html = t())
    : (e.mhtml2html = t());
})("undefined" != typeof self ? self : this, function () {
  return (function (e) {
    var t = {};
    function n(r) {
      if (t[r]) return t[r].exports;
      var o = (t[r] = { i: r, l: !1, exports: {} });
      return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }
    return (
      (n.m = e),
      (n.c = t),
      (n.d = function (e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
      }),
      (n.r = function (e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (n.t = function (e, t) {
        if ((1 & t && (e = n(e)), 8 & t)) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (
          (n.r(r),
          Object.defineProperty(r, "default", { enumerable: !0, value: e }),
          2 & t && "string" != typeof e)
        )
          for (var o in e)
            n.d(
              r,
              o,
              function (t) {
                return e[t];
              }.bind(null, o)
            );
        return r;
      }),
      (n.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return n.d(t, "a", t), t;
      }),
      (n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (n.p = ""),
      n((n.s = 2))
    );
  })([
    function (e, t) {
      e.exports = function (e) {
        return (
          e.webpackPolyfill ||
            ((e.deprecate = function () {}),
            (e.paths = []),
            e.children || (e.children = []),
            Object.defineProperty(e, "loaded", {
              enumerable: !0,
              get: function () {
                return e.l;
              },
            }),
            Object.defineProperty(e, "id", {
              enumerable: !0,
              get: function () {
                return e.i;
              },
            }),
            (e.webpackPolyfill = 1)),
          e
        );
      };
    },
    function (e, t) {
      var n;
      n = (function () {
        return this;
      })();
      try {
        n = n || new Function("return this")();
      } catch (e) {
        "object" == typeof window && (n = window);
      }
      e.exports = n;
    },
    function (e, t, n) {
      const r = n(3),
        o = n(4);
      function i(e, t) {
        if (!e) throw new Error(t);
        return !0;
      }
      function a(e) {
        return (
          i("undefined" != typeof DOMParser, "No DOM parser available"),
          {
            window: {
              document: new DOMParser().parseFromString(e, "text/html"),
            },
          }
        );
      }
      function c(e, t) {
        if (0 === t.indexOf("http://") || 0 === t.indexOf("https://")) return t;
        const n = e.split("/"),
          r = t.split("/");
        n.pop();
        for (let e = 0; e < r.length; e++)
          "." != r[e] && (".." == r[e] ? n.pop() : n.push(r[e]));
        return n.join("/");
      }
      function d(e, t, n) {
        let r, i;
        for (i = 0; (i = n.indexOf("url(", i)) > 0; i += r.length) {
          i += "url(".length;
          const a = c(
            t,
            (r = n.substring(i, n.indexOf(")", i))).replace(/(\"|\')/g, "")
          );
          if (null != e[a]) {
            "text/css" === e[a].type && (e[a].data = d(e, t, e[a].data));
            try {
              const t = `'data:${e[a].type};base64,${
                "base64" === e[a].encoding ? e[a].data : o.encode(e[a].data)
              }'`;
              n = `${n.substring(0, i)}${t}${n.substring(i + r.length)}`;
            } catch (e) {
              console.warn(e);
            }
          }
        }
        return n;
      }
      function s(e) {
        switch (e.encoding) {
          case "quoted-printable":
            return `data:${e.type};utf8,${escape(r.decode(e.data))}`;
          case "base64":
            return `data:${e.type};base64,${e.data}`;
          default:
            return `data:${e.type};base64,${o.encode(e.data)}`;
        }
      }
      const u = {
        parse: (e, { htmlOnly: t = !1, parseDOM: n = a } = {}) => {
          const o = 0,
            c = 1,
            d = 2,
            s = 3;
          let u, l, f, p, h, g, b, y, m, v, x, w, A, C, $, M;
          function O() {
            for (; i(C < e.length - 1, "Unexpected EOF") && /\s/.test(e[C]); )
              "\n" == e[++C] && $++;
          }
          function T(t) {
            const n = C;
            for (; "\n" !== e[C] && i(C++ < e.length - 1, "Unexpected EOF"); );
            C++, $++;
            const o = e.substring(n, C);
            return "quoted-printable" === t
              ? r.decode(o)
              : "base64" === t
              ? o.trim()
              : o;
          }
          function j(e, t) {
            const n = e.indexOf(":");
            n > -1
              ? (t[(x = e.substring(0, n).trim())] = e
                  .substring(n + 1, e.length)
                  .trim())
              : (i(void 0 !== x, `Missing MHTML headers; Line ${$}`),
                (t[x] += e.trim()));
          }
          for (l = {}, f = {}, p = {}, h = {}, v = o, C = $ = 0; v != s; )
            switch (v) {
              case o:
                if (0 != (w = T()) && "\n" != w) j(w, l);
                else {
                  i(
                    void 0 !== l["Content-Type"],
                    `Missing document content type; Line ${$}`
                  );
                  const e = l["Content-Type"].match(/boundary=(.*)/m);
                  i(
                    null != e,
                    `Missing boundary from document headers; Line ${$}`
                  ),
                    (M = e[1].replace(/\"/g, "")),
                    O(),
                    i((w = T()).includes(M), `Expected boundary; Line ${$}`),
                    (f = {}),
                    (v = c);
                }
                break;
              case c:
                0 != (w = T()) && "\n" != w
                  ? j(w, f)
                  : ((b = f["Content-Transfer-Encoding"]),
                    (y = f["Content-Type"]),
                    (m = f["Content-ID"]),
                    (g = f["Content-Location"]),
                    void 0 === A &&
                      i(
                        void 0 !== (A = g) && "text/html" === y,
                        `Index not found; Line ${$}`
                      ),
                    i(
                      void 0 !== m || void 0 !== g,
                      `ID or location header not provided;  Line ${$}`
                    ),
                    i(
                      void 0 !== b,
                      `Content-Transfer-Encoding not provided;  Line ${$}`
                    ),
                    i(void 0 !== y, `Content-Type not provided; Line ${$}`),
                    (u = { encoding: b, type: y, data: "", id: m }),
                    void 0 !== m && (h[m] = u),
                    void 0 !== g && void 0 === p[g] && (p[g] = u),
                    O(),
                    (f = {}),
                    (v = d));
                break;
              case d:
                for (w = T(b); !w.includes(M); ) (u.data += w), (w = T(b));
                try {
                  u.data = decodeURIComponent(escape(u.data));
                } catch (e) {}
                if (!0 === t && void 0 !== A) return n(u.data);
                v = C >= e.length - 1 ? s : c;
            }
          return { frames: h, media: p, index: A };
        },
        convert: (e, { convertIframes: t = !1, parseDOM: n = a } = {}) => {
          let r, o, c, l, f, p, h, g;
          "string" == typeof e
            ? (e = u.parse(e))
            : i(
                "object" == typeof e,
                "Expected argument of type string or object"
              ),
            (c = e.frames),
            (o = e.media),
            (r = e.index),
            i("object" == typeof c, "MHTML error: invalid frames"),
            i("object" == typeof o, "MHTML error: invalid media"),
            i("string" == typeof r, "MHTML error: invalid index"),
            i(o[r] && "text/html" === o[r].type, "MHTML error: invalid index");
          const b = n(o[r].data),
            y = b.window.document,
            m = [y];
          for (; m.length; ) {
            const e = m.shift();
            e.childNodes.forEach(function (i) {
              switch (
                (i.getAttribute &&
                  ((h = i.getAttribute("href")), (g = i.getAttribute("src"))),
                i.removeAttribute && i.removeAttribute("integrity"),
                i.tagName)
              ) {
                case "HEAD":
                  (f = y.createElement("base")).setAttribute(
                    "target",
                    "_parent"
                  ),
                    i.insertBefore(f, i.firstChild);
                  break;
                case "LINK":
                  void 0 !== o[h] &&
                    "text/css" === o[h].type &&
                    (((l = y.createElement("style")).type = "text/css"),
                    (o[h].data = d(o, h, o[h].data)),
                    l.appendChild(y.createTextNode(o[h].data)),
                    e.replaceChild(l, i));
                  break;
                case "STYLE":
                  ((l = y.createElement("style")).type = "text/css"),
                    l.appendChild(y.createTextNode(d(o, r, i.innerHTML))),
                    e.replaceChild(l, i);
                  break;
                case "IMG":
                  if (
                    ((p = null), void 0 !== o[g] && o[g].type.includes("image"))
                  ) {
                    try {
                      p = s(o[g]);
                    } catch (e) {
                      console.warn(e);
                    }
                    null !== p && i.setAttribute("src", p);
                  }
                  i.style.cssText = d(o, r, i.style.cssText);
                  break;
                case "IFRAME":
                  if (!0 === t && g) {
                    const e = `<${g.split("cid:")[1]}>`,
                      r = c[e];
                    if (r && "text/html" === r.type) {
                      const a = u.convert(
                        {
                          media: Object.assign({}, o, { [e]: r }),
                          frames: c,
                          index: e,
                        },
                        { convertIframes: t, parseDOM: n }
                      );
                      i.src = `data:text/html;charset=utf-8,${encodeURIComponent(
                        a.window.document.documentElement.outerHTML
                      )}`;
                    }
                  }
                  break;
                default:
                  i.style && (i.style.cssText = d(o, r, i.style.cssText));
              }
              m.push(i);
            });
          }
          return b;
        },
      };
      e.exports = u;
    },
    function (e, t, n) {
      (function (e, r) {
        var o;
        /*! https://mths.be/quoted-printable v1.0.1 by @mathias | MIT license */ !(function (
          i
        ) {
          var a = t,
            c = (e && e.exports, "object" == typeof r && r);
          c.global !== c && c.window;
          var d = String.fromCharCode,
            s = function (e) {
              return e.replace(/\x20$/, "=20").replace(/\t$/, "=09");
            },
            u = /[\0-\x08\n-\x1F=\x7F-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
            l = {
              encode: function (e) {
                for (
                  var t = e.replace(u, function (e) {
                      if (e > "ÿ")
                        throw RangeError(
                          "`quotedPrintable.encode()` expects extended ASCII input only. Don’t forget to encode the input first using a character encoding like UTF-8."
                        );
                      return (
                        "=" +
                        (
                          "0" + e.charCodeAt(0).toString(16).toUpperCase()
                        ).slice(-2)
                      );
                    }),
                    n = t.split(/\r\n?|\n/g),
                    r = -1,
                    o = n.length,
                    i = [];
                  ++r < o;

                )
                  for (var a = 75, c = 0, d = n[r].length; c < d; ) {
                    var l = t.slice(c, c + a);
                    /=$/.test(l)
                      ? ((l = l.slice(0, a - 1)), (c += a - 1))
                      : /=[A-F0-9]$/.test(l)
                      ? ((l = l.slice(0, a - 2)), (c += a - 2))
                      : (c += a),
                      i.push(l);
                  }
                var f = l.length;
                return (
                  /[\t\x20]$/.test(l) &&
                    (i.pop(),
                    f + 2 <= a + 1
                      ? i.push(s(l))
                      : i.push(l.slice(0, f - 1), s(l.slice(f - 1, f)))),
                  i.join("=\r\n")
                );
              },
              decode: function (e) {
                return e
                  .replace(/[\t\x20]$/gm, "")
                  .replace(/=(?:\r\n?|\n|$)/g, "")
                  .replace(/=([a-fA-F0-9]{2})/g, function (e, t) {
                    var n = parseInt(t, 16);
                    return d(n);
                  });
              },
              version: "1.0.1",
            };
          void 0 ===
            (o = function () {
              return l;
            }.call(t, n, t, e)) || (e.exports = o);
        })();
      }.call(this, n(0)(e), n(1)));
    },
    function (e, t, n) {
      (function (e, r) {
        var o;
        /*! http://mths.be/base64 v0.1.0 by @mathias | MIT license */ !(function (
          i
        ) {
          var a = t,
            c = (e && e.exports, "object" == typeof r && r);
          c.global !== c && c.window;
          var d = function (e) {
            this.message = e;
          };
          (d.prototype = new Error()).name = "InvalidCharacterError";
          var s = function (e) {
              throw new d(e);
            },
            u =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            l = /[\t\n\f\r ]/g,
            f = {
              encode: function (e) {
                (e = String(e)),
                  /[^\0-\xFF]/.test(e) &&
                    s(
                      "The string to be encoded contains characters outside of the Latin1 range."
                    );
                for (
                  var t,
                    n,
                    r,
                    o,
                    i = e.length % 3,
                    a = "",
                    c = -1,
                    d = e.length - i;
                  ++c < d;

                )
                  (t = e.charCodeAt(c) << 16),
                    (n = e.charCodeAt(++c) << 8),
                    (r = e.charCodeAt(++c)),
                    (a +=
                      u.charAt(((o = t + n + r) >> 18) & 63) +
                      u.charAt((o >> 12) & 63) +
                      u.charAt((o >> 6) & 63) +
                      u.charAt(63 & o));
                return (
                  2 == i
                    ? ((t = e.charCodeAt(c) << 8),
                      (n = e.charCodeAt(++c)),
                      (a +=
                        u.charAt((o = t + n) >> 10) +
                        u.charAt((o >> 4) & 63) +
                        u.charAt((o << 2) & 63) +
                        "="))
                    : 1 == i &&
                      ((o = e.charCodeAt(c)),
                      (a += u.charAt(o >> 2) + u.charAt((o << 4) & 63) + "==")),
                  a
                );
              },
              decode: function (e) {
                var t = (e = String(e).replace(l, "")).length;
                t % 4 == 0 && (t = (e = e.replace(/==?$/, "")).length),
                  (t % 4 == 1 || /[^+a-zA-Z0-9\/]/.test(e)) &&
                    s(
                      "Invalid character: the string to be decoded is not correctly encoded."
                    );
                for (var n, r, o = 0, i = "", a = -1; ++a < t; )
                  (r = u.indexOf(e.charAt(a))),
                    (n = o % 4 ? 64 * n + r : r),
                    o++ % 4 &&
                      (i += String.fromCharCode(255 & (n >> ((-2 * o) & 6))));
                return i;
              },
              version: "0.1.0",
            };
          void 0 ===
            (o = function () {
              return f;
            }.call(t, n, t, e)) || (e.exports = o);
        })();
      }.call(this, n(0)(e), n(1)));
    },
  ]);
});
