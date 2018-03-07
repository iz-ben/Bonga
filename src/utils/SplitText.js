/*!
 * VERSION: 0.5.8
 * DATE: 2017-08-22
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * SplitText is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
! function(e) {
    "use strict";
    var t = e.GreenSockGlobals || e,
        i = function(e) {
            var i, n = e.split("."),
                s = t;
            for (i = 0; i < n.length; i++) s[n[i]] = s = s[n[i]] || {};
            return s
        },
        n = i("com.greensock.utils"),
        s = function(e) {
            var t = e.nodeType,
                i = "";
            if (1 === t || 9 === t || 11 === t) {
                if ("string" == typeof e.textContent) return e.textContent;
                for (e = e.firstChild; e; e = e.nextSibling) i += s(e)
            } else if (3 === t || 4 === t) return e.nodeValue;
            return i
        },
        r = document,
        l = r.defaultView ? r.defaultView.getComputedStyle : function() {},
        o = /([A-Z])/g,
        d = function(e, t, i, n) {
            var s;
            return (i = i || l(e, null)) ? (e = i.getPropertyValue(t.replace(o, "-$1").toLowerCase()), s = e || i.length ? e : i[t]) : e.currentStyle && (i = e.currentStyle, s = i[t]), n ? s : parseInt(s, 10) || 0
        },
        p = function(e) {
            return e.length && e[0] && (e[0].nodeType && e[0].style && !e.nodeType || e[0].length && e[0][0]) ? !0 : !1
        },
        a = function(e) {
            var t, i, n, s = [],
                r = e.length;
            for (t = 0; r > t; t++)
                if (i = e[t], p(i))
                    for (n = i.length, n = 0; n < i.length; n++) s.push(i[n]);
                else s.push(i);
            return s
        },
        h = /(?:\r|\n|\t\t)/g,
        u = /(?:\s\s+)/g,
        f = 55296,
        c = 56319,
        g = 56320,
        y = 127462,
        x = 127487,
        S = 127995,
        v = 127999,
        b = function(e) {
            return (e.charCodeAt(0) - f << 10) + (e.charCodeAt(1) - g) + 65536
        },
        _ = r.all && !r.addEventListener,
        m = " style='position:relative;display:inline-block;" + (_ ? "*display:inline;*zoom:1;'" : "'"),
        C = function(e, t) {
            e = e || "";
            var i = -1 !== e.indexOf("++"),
                n = 1;
            return i && (e = e.split("++").join("")),
                function() {
                    return "<" + t + m + (e ? " class='" + e + (i ? n++ : "") + "'>" : ">")
                }
        },
        T = n.SplitText = t.SplitText = function(e, t) {
            if ("string" == typeof e && (e = T.selector(e)), !e) throw "cannot split a null element.";
            this.elements = p(e) ? a(e) : [e], this.chars = [], this.words = [], this.lines = [], this._originals = [], this.vars = t || {}, this.split(t)
        },
        N = function(e, t, i) {
            var n = e.nodeType;
            if (1 === n || 9 === n || 11 === n)
                for (e = e.firstChild; e; e = e.nextSibling) N(e, t, i);
            else(3 === n || 4 === n) && (e.nodeValue = e.nodeValue.split(t).join(i))
        },
        w = function(e, t) {
            var i = t.length;
            for (; --i > -1;) e.push(t[i])
        },
        A = function(e) {
            var t, i = [],
                n = e.length;
            for (t = 0; t !== n; i.push(e[t++]));
            return i
        },
        L = function(e, t, i) {
            var n;
            for (; e && e !== t;) {
                if (n = e._next || e.nextSibling) return n.textContent.charAt(0) === i;
                e = e.parentNode || e._parent
            }
            return !1
        },
        B = function(e) {
            var t, i, n = A(e.childNodes),
                s = n.length;
            for (t = 0; s > t; t++) i = n[t], i._isSplit ? B(i) : (t && 3 === i.previousSibling.nodeType ? i.previousSibling.nodeValue += 3 === i.nodeType ? i.nodeValue : i.firstChild.nodeValue : 3 !== i.nodeType && e.insertBefore(i.firstChild, i), e.removeChild(i))
        },
        V = function(e, t, i, n, s, o, p) {
            var a, h, u, f, c, g, y, x, S, v, b, _, m = l(e),
                C = d(e, "paddingLeft", m),
                T = -999,
                A = d(e, "borderBottomWidth", m) + d(e, "borderTopWidth", m),
                V = d(e, "borderLeftWidth", m) + d(e, "borderRightWidth", m),
                W = d(e, "paddingTop", m) + d(e, "paddingBottom", m),
                H = d(e, "paddingLeft", m) + d(e, "paddingRight", m),
                E = .2 * d(e, "fontSize"),
                k = d(e, "textAlign", m, !0),
                O = [],
                R = [],
                j = [],
                M = t.wordDelimiter || " ",
                G = t.span ? "span" : "div",
                $ = t.type || t.split || "chars,words,lines",
                q = s && -1 !== $.indexOf("lines") ? [] : null,
                z = -1 !== $.indexOf("words"),
                D = -1 !== $.indexOf("chars"),
                F = "absolute" === t.position || t.absolute === !0,
                I = t.linesClass,
                P = -1 !== (I || "").indexOf("++"),
                Q = [];
            for (q && 1 === e.children.length && e.children[0]._isSplit && (e = e.children[0]), P && (I = I.split("++").join("")), h = e.getElementsByTagName("*"), u = h.length, c = [], a = 0; u > a; a++) c[a] = h[a];
            if (q || F)
                for (a = 0; u > a; a++) f = c[a], g = f.parentNode === e, (g || F || D && !z) && (_ = f.offsetTop, q && g && Math.abs(_ - T) > E && ("BR" !== f.nodeName || 0 === a) && (y = [], q.push(y), T = _), F && (f._x = f.offsetLeft, f._y = _, f._w = f.offsetWidth, f._h = f.offsetHeight), q && ((f._isSplit && g || !D && g || z && g || !z && f.parentNode.parentNode === e && !f.parentNode._isSplit) && (y.push(f), f._x -= C, L(f, e, M) && (f._wordEnd = !0)), "BR" === f.nodeName && (f.nextSibling && "BR" === f.nextSibling.nodeName || 0 === a) && q.push([])));
            for (a = 0; u > a; a++) f = c[a], g = f.parentNode === e, "BR" !== f.nodeName ? (F && (S = f.style, z || g || (f._x += f.parentNode._x, f._y += f.parentNode._y), S.left = f._x + "px", S.top = f._y + "px", S.position = "absolute", S.display = "block", S.width = f._w + 1 + "px", S.height = f._h + "px"), !z && D ? f._isSplit ? (f._next = f.nextSibling, f.parentNode.appendChild(f)) : f.parentNode._isSplit ? (f._parent = f.parentNode, !f.previousSibling && f.firstChild && (f.firstChild._isFirst = !0), f.nextSibling && " " === f.nextSibling.textContent && !f.nextSibling.nextSibling && Q.push(f.nextSibling), f._next = f.nextSibling && f.nextSibling._isFirst ? null : f.nextSibling, f.parentNode.removeChild(f), c.splice(a--, 1), u--) : g || (_ = !f.nextSibling && L(f.parentNode, e, M), f.parentNode._parent && f.parentNode._parent.appendChild(f), _ && f.parentNode.appendChild(r.createTextNode(" ")), t.span && (f.style.display = "inline"), O.push(f)) : f.parentNode._isSplit && !f._isSplit && "" !== f.innerHTML ? R.push(f) : D && !f._isSplit && (t.span && (f.style.display = "inline"), O.push(f))) : q || F ? (f.parentNode && f.parentNode.removeChild(f), c.splice(a--, 1), u--) : z || e.appendChild(f);
            for (a = Q.length; --a > -1;) Q[a].parentNode.removeChild(Q[a]);
            if (q) {
                for (F && (v = r.createElement(G), e.appendChild(v), b = v.offsetWidth + "px", _ = v.offsetParent === e ? 0 : e.offsetLeft, e.removeChild(v)), S = e.style.cssText, e.style.cssText = "display:none;"; e.firstChild;) e.removeChild(e.firstChild);
                for (x = " " === M && (!F || !z && !D), a = 0; a < q.length; a++) {
                    for (y = q[a], v = r.createElement(G), v.style.cssText = "display:block;text-align:" + k + ";position:" + (F ? "absolute;" : "relative;"), I && (v.className = I + (P ? a + 1 : "")), j.push(v), u = y.length, h = 0; u > h; h++) "BR" !== y[h].nodeName && (f = y[h], v.appendChild(f), x && f._wordEnd && v.appendChild(r.createTextNode(" ")), F && (0 === h && (v.style.top = f._y + "px", v.style.left = C + _ + "px"), f.style.top = "0px", _ && (f.style.left = f._x - _ + "px")));
                    0 === u ? v.innerHTML = "&nbsp;" : z || D || (B(v), N(v, String.fromCharCode(160), " ")), F && (v.style.width = b, v.style.height = f._h + "px"), e.appendChild(v)
                }
                e.style.cssText = S
            }
            F && (p > e.clientHeight && (e.style.height = p - W + "px", e.clientHeight < p && (e.style.height = p + A + "px")), o > e.clientWidth && (e.style.width = o - H + "px", e.clientWidth < o && (e.style.width = o + V + "px"))), w(i, O), w(n, R), w(s, j)
        },
        W = function(e, t, i, n) {
            var l, o, d, p, a, g, _, m, C, T = t.span ? "span" : "div",
                w = t.type || t.split || "chars,words,lines",
                A = -1 !== w.indexOf("chars"),
                L = "absolute" === t.position || t.absolute === !0,
                B = t.wordDelimiter || " ",
                V = " " !== B ? "" : L ? "&#173; " : " ",
                W = t.span ? "</span>" : "</div>",
                H = !0,
                E = r.createElement("div"),
                k = e.parentNode;
            for (k.insertBefore(E, e), E.textContent = e.nodeValue, k.removeChild(e), e = E, l = s(e), _ = -1 !== l.indexOf("<"), t.reduceWhiteSpace !== !1 && (l = l.replace(u, " ").replace(h, "")), _ && (l = l.split("<").join("{{LT}}")), a = l.length, o = (" " === l.charAt(0) ? V : "") + i(), d = 0; a > d; d++)
                if (g = l.charAt(d), g === B && l.charAt(d - 1) !== B && d) {
                    for (o += H ? W : "", H = !1; l.charAt(d + 1) === B;) o += V, d++;
                    d === a - 1 ? o += V : ")" !== l.charAt(d + 1) && (o += V + i(), H = !0)
                } else "{" === g && "{{LT}}" === l.substr(d, 6) ? (o += A ? n() + "{{LT}}</" + T + ">" : "{{LT}}", d += 5) : g.charCodeAt(0) >= f && g.charCodeAt(0) <= c || l.charCodeAt(d + 1) >= 65024 && l.charCodeAt(d + 1) <= 65039 ? (m = b(l.substr(d, 2)), C = b(l.substr(d + 2, 2)), p = (y > m || m > x || y > C || C > x) && (S > C || C > v) ? 2 : 4, o += A && " " !== g ? n() + l.substr(d, p) + "</" + T + ">" : l.substr(d, p), d += p - 1) : o += A && " " !== g ? n() + g + "</" + T + ">" : g;
            e.outerHTML = o + (H ? W : ""), _ && N(k, "{{LT}}", "<")
        },
        H = function(e, t, i, n) {
            var s, r, l = A(e.childNodes),
                o = l.length,
                p = "absolute" === t.position || t.absolute === !0;
            if (3 !== e.nodeType || o > 1) {
                for (t.absolute = !1, s = 0; o > s; s++) r = l[s], (3 !== r.nodeType || /\S+/.test(r.nodeValue)) && (p && 3 !== r.nodeType && "inline" === d(r, "display", null, !0) && (r.style.display = "inline-block", r.style.position = "relative"), r._isSplit = !0, H(r, t, i, n));
                return t.absolute = p, void(e._isSplit = !0)
            }
            W(e, t, i, n)
        },
        E = T.prototype;
    E.split = function(e) {
        this.isSplit && this.revert(), this.vars = e = e || this.vars, this._originals.length = this.chars.length = this.words.length = this.lines.length = 0;
        var t, i, n, s = this.elements.length,
            r = e.span ? "span" : "div",
            l = C(e.wordsClass, r),
            o = C(e.charsClass, r);
        for (; --s > -1;) n = this.elements[s], this._originals[s] = n.innerHTML, t = n.clientHeight, i = n.clientWidth, H(n, e, l, o), V(n, e, this.chars, this.words, this.lines, i, t);
        return this.chars.reverse(), this.words.reverse(), this.lines.reverse(), this.isSplit = !0, this
    }, E.revert = function() {
        if (!this._originals) throw "revert() call wasn't scoped properly.";
        var e = this._originals.length;
        for (; --e > -1;) this.elements[e].innerHTML = this._originals[e];
        return this.chars = [], this.words = [], this.lines = [], this.isSplit = !1, this
    }, T.selector = e.$ || e.jQuery || function(t) {
        var i = e.$ || e.jQuery;
        return i ? (T.selector = i, i(t)) : "undefined" == typeof document ? t : document.querySelectorAll ? document.querySelectorAll(t) : document.getElementById("#" === t.charAt(0) ? t.substr(1) : t)
    }, T.version = "0.5.8"
}(_gsScope),
    function(e) {
        var t = function() {
            return (_gsScope.GreenSockGlobals || _gsScope)[e]
        };
        if (typeof(module) !== "undefined" && module.exports) { //node
            module.exports = t();
        }
    }("SplitText");