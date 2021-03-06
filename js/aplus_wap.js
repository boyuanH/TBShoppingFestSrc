/* 2017-02-21 16:34:49 */
!function e(t, a, n) {
    function r(i, s) {
        if (!a[i]) {
            if (!t[i]) {
                var l = "function" == typeof require && require;
                if (!s && l)
                    return l(i, !0);
                if (o)
                    return o(i, !0);
                throw new Error("Cannot find module '" + i + "'")
            }
            var u = a[i] = {
                exports: {}
            };
            t[i][0].call(u.exports, function(e) {
                var a = t[i][1][e];
                return r(a ? a : e)
            }, u, u.exports, e, t, a, n)
        }
        return a[i].exports
    }
    for (var o = "function" == typeof require && require, i = 0; i < n.length; i++)
        r(n[i]);
    return r
}({
    1: [function(require, module, exports) {
        !function() {
            function isStartWith(e, t) {
                return 0 === e.indexOf(t)
            }
            function isEndWith(e, t) {
                var a = e.length
                  , n = t.length;
                return a >= n && e.indexOf(t) == a - n
            }
            function trim(e) {
                return isString(e) ? e.replace(/^\s+|\s+$/g, "") : ""
            }
            function tryToDecodeURIComponent(e, t) {
                var a = t || "";
                if (e)
                    try {
                        a = decodeURIComponent(e)
                    } catch (n) {}
                return a
            }
            function obj2param(e) {
                var t, a, n = [];
                for (t in e)
                    e.hasOwnProperty(t) && (a = "" + e[t],
                    n.push(isStartWith(t, s_plain_obj) ? a : t + "=" + encodeURIComponent(a)));
                return n.join("&")
            }
            function param2arr(e) {
                for (var t, a = e.split("&"), n = 0, r = a.length, o = []; r > n; n++)
                    t = a[n].split("="),
                    o.push([t.shift(), t.join("=")]);
                return o
            }
            function arr2param(e) {
                var t, a, n, r = [], o = e.length;
                for (n = 0; o > n; n++)
                    t = e[n][0],
                    a = e[n][1],
                    r.push(isStartWith(t, s_plain_obj) ? a : t + "=" + encodeURIComponent(a));
                return r.join("&")
            }
            function arr2obj(e) {
                var t, a, n, r = {}, o = e.length;
                for (n = 0; o > n; n++)
                    t = e[n][0],
                    a = e[n][1],
                    r[t] = a;
                return r
            }
            function isNumber(e) {
                return "number" == typeof e
            }
            function isUnDefined(e) {
                return "undefined" == typeof e
            }
            function isString(e) {
                return "string" == typeof e
            }
            function isArray(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            }
            function tryToGetAttribute(e, t) {
                return e && e.getAttribute ? e.getAttribute(t) || "" : ""
            }
            function tryToGetHref(e) {
                var t;
                try {
                    t = trim(e.getAttribute("href", 2))
                } catch (a) {}
                return t || ""
            }
            function getExParams() {
                var e = doc.getElementById("tb-beacon-aplus");
                return tryToGetAttribute(e, "exparams").replace(/&amp;/g, "&").replace(/\buserid=/, "uidaplus=")
            }
            function getMetaTags() {
                return _head_node = _head_node || doc.getElementsByTagName("head")[0],
                _meta_nodes || (_head_node ? _meta_nodes = _head_node.getElementsByTagName("meta") : [])
            }
            function parseMetaContent(e, t) {
                var a, n, r, o = e.split(";"), i = o.length;
                for (a = 0; i > a; a++)
                    n = o[a].split("="),
                    r = trim(n[0]),
                    r && (t[r] = tryToDecodeURIComponent(trim(n[1])))
            }
            function getCookie(e) {
                var t = doc.cookie.match(new RegExp("\\b" + e + "=([^;]+)"));
                return t ? t[1] : ""
            }
            function getSPMFromUrl(e) {
                var t, a = e.match(new RegExp("\\?.*spm=([\\w\\.\\-\\*/]+)"));
                return a && (t = a[1]) && 4 == t.split(".").length ? t : null
            }
            function makeCacheNum() {
                return Math.floor(268435456 * Math.random()).toString(16)
            }
            function makePVId() {
                for (var e = "", t = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; e.length < 6; )
                    e += t.substr(Math.floor(62 * Math.random()), 1);
                return win[s_pv_id_key] = e,
                e
            }
            function getMetaAtpData() {
                var e, t, a, n = getMetaTags(), r = n.length;
                for (e = 0; r > e; e++)
                    t = n[e],
                    "atp-beacon" == tryToGetAttribute(t, "name") && (a = tryToGetAttribute(t, "content"),
                    parseMetaContent(a, _atp_beacon_data));
                _atp_beacon_data_params = obj2param(_atp_beacon_data)
            }
            function getMetaWaiting() {
                return util.getMetaCnt("aplus-waiting")
            }
            function isOnePage() {
                return util.getMetaCnt("isonepage") || "-1"
            }
            function makeChkSum(e) {
                e = (e || "").split("#")[0].split("?")[0];
                var t = e.length
                  , a = function(e) {
                    var t, a = e.length, n = 0;
                    for (t = 0; a > t; t++)
                        n = 31 * n + e.charCodeAt(t);
                    return n
                };
                return t ? a(t + "#" + e.charCodeAt(t - 1)) : -1
            }
            function onDOMReady(e) {
                var t = win.KISSY;
                t ? t.ready(e) : win.jQuery ? jQuery(doc).ready(e) : "complete" === doc.readyState ? e() : addEventListener(win, "load", e)
            }
            function recordValInWindowName() {
                var e, t;
                !is_in_iframe && is_https && (is_login_page && page_referrer ? (e = page_referrer,
                t = nameStorage.getItem(KEY.NAME_STORAGE.REFERRER_PV_ID)) : (e = page_url,
                t = pvid),
                nameStorage.setItem(KEY.NAME_STORAGE.REFERRER, e),
                nameStorage.setItem(KEY.NAME_STORAGE.REFERRER_PV_ID, t))
            }
            function addEventListener(e, t, a) {
                e[onevent]((atta ? "on" : "") + t, function(e) {
                    e = e || win.event;
                    var t = e.target || e.srcElement;
                    a(e, t)
                }, s_false)
            }
            function atp_inIframeException() {
                var e, t, a = [];
                for (e = 0,
                t = a.length; t > e; e++)
                    if (-1 != pathname.indexOf(a[e]))
                        return s_true;
                var n = /^https?:\/\/[\w\.]+\.(taobao|tmall|etao|tao123|juhuasuan)\.com/i;
                return !n.test(page_referrer)
            }
            function cleanParams(e) {
                var t, a, n, r, o = [], i = {};
                for (t = e.length - 1; t >= 0; t--)
                    a = e[t],
                    n = a[0],
                    n != s_plain_obj && i.hasOwnProperty(n) || (r = a[1],
                    ("aplus" == n || r || 0 === r) && (o.unshift([n, r]),
                    i[n] = 1));
                return o
            }
            function cleanParamsForWindvane(e) {
                var t, a, n, r, o = [], i = {
                    logtype: !0,
                    cache: !0,
                    scr: !0,
                    "spm-cnt": !0
                };
                for (t = e.length - 1; t >= 0; t--)
                    if (a = e[t],
                    n = a[0],
                    r = a[1],
                    !(isStartWith(n, s_plain_obj) && !isStartWith(n, mkPlainKeyForExparams()) || i[n]))
                        if (isStartWith(n, mkPlainKeyForExparams())) {
                            var s = param2arr(r);
                            if ("object" == typeof s && s.length > 0)
                                for (var l = s.length - 1; l >= 0; l--) {
                                    var u = s[l];
                                    u && u[1] && o.unshift([u[0], u[1]])
                                }
                        } else
                            o.unshift([n, r]);
                return o
            }
            function tblogSend(e, t) {
                var a, n, r;
                if (t) {
                    if (t = cleanParams(t),
                    isWindVane) {
                        r = cleanParamsForWindvane(t);
                        var o, i = {}, s = getSPMFromUrl(page_referrer), l = isOnePage(), u = l.split("|"), c = u[0], g = u[1] ? u[1] : "";
                        try {
                            n = arr2obj(r),
                            o = JSON.stringify(n),
                            "{}" == o && (o = "")
                        } catch (d) {
                            o = ""
                        }
                        i.functype = "2001",
                        i.urlpagename = g,
                        i.url = loc.href,
                        i.spmcnt = (spm_ab || "0.0") + ".0.0",
                        i.spmpre = s || "",
                        i.lzsid = "",
                        i.cna = acookie_cna || "",
                        i.extendargs = o,
                        i.isonepage = c,
                        WindVane.call("WVTBUserTrack", "toUT", i),
                        win[s_goldlog].windVaneData = i
                    }
                    return win._ua_popLayer && t.push(["ispop", 1]),
                    isWindVane && is_ali_app_tb || (a = goldlog.send(e, t)),
                    a
                }
            }
            function mkPlainKey() {
                return s_plain_obj + Math.random()
            }
            function mkPlainKeyForExparams() {
                return s_plain_obj + "exparams"
            }
            function getSPMProtocolFromMeta() {
                var e, t, a, n, r = getMetaTags();
                for (e = 0,
                t = r.length; t > e; e++)
                    a = r[e],
                    n = tryToGetAttribute(a, "name"),
                    n == s_SPM_ATTR_NAME && (spm_protocol = tryToGetAttribute(a, s_SPM_DATA_PROTOCOL))
            }
            function getMetaSPMData(e) {
                var t, a, n, r, o, i, s = getMetaTags();
                if (s)
                    for (t = 0,
                    a = s.length; a > t; t++)
                        if (r = s[t],
                        o = tryToGetAttribute(r, "name"),
                        o == e)
                            return page_global_spm_id_origin = tryToGetAttribute(r, "content"),
                            page_global_spm_id_origin.indexOf(":") >= 0 && (n = page_global_spm_id_origin.split(":"),
                            spm_protocol = "i" == n[0] ? "i" : "u",
                            page_global_spm_id_origin = n[1]),
                            i = tryToGetAttribute(r, s_SPM_DATA_PROTOCOL),
                            i && (spm_protocol = "i" == i ? "i" : "u"),
                            spm_ab = page_global_spm_id_origin,
                            s_true;
                return s_false
            }
            function ifAdd(e, t) {
                var a, n, r, o, i = t.length;
                for (a = 0; i > a; a++)
                    n = t[a],
                    r = n[0],
                    o = n[1],
                    o && e.push([r, o])
            }
            function compareVersion(e, t) {
                e = e.toString().split("."),
                t = t.toString().split(".");
                for (var a = 0; a < e.length || a < t.length; a++) {
                    var n = parseInt(e[a], 10)
                      , r = parseInt(t[a], 10);
                    if (window.isNaN(n) && (n = 0),
                    window.isNaN(r) && (r = 0),
                    r > n)
                        return -1;
                    if (n > r)
                        return 1
                }
                return 0
            }
            function callback(e, t) {
                isAndroid && compareVersion(osVersion, "2.4.0") < 0 ? setTimeout(function() {
                    e && e(t)
                }, 1) : e && e(t)
            }
            function init_getGlobalSPMId() {
                if (!isUnDefined(spm_ab))
                    return spm_ab;
                if (spm_a && spm_b)
                    return spm_a = spm_a.replace(/^{(\w+)}$/g, "$1"),
                    spm_b = spm_b.replace(/^{(\w+)}$/g, "$1"),
                    wh_in_page = s_true,
                    spm_ab = spm_a + "." + spm_b,
                    getSPMProtocolFromMeta(),
                    goldlog.spm_ab = [spm_a, spm_b],
                    spm_ab;
                var e;
                if (getMetaSPMData(s_SPM_ATTR_NAME) || getMetaSPMData("spm-id"),
                spm_ab = spm_ab || default_ab,
                !spm_ab)
                    return spm_ab;
                var t, a = doc.getElementsByTagName("body");
                return e = spm_ab.split("."),
                goldlog.spm_ab = e,
                a = a && a.length ? a[0] : null,
                a && (t = tryToGetAttribute(a, s_SPM_ATTR_NAME),
                t ? (spm_ab = e[0] + "." + t,
                goldlog.spm_ab = [e[0], t]) : 1 == e.length && (spm_ab = default_ab)),
                spm_ab
            }
            function addScript(e, t) {
                var a = "script"
                  , n = doc.createElement(a);
                n.type = "text/javascript",
                n.async = !0,
                n.src = is_https ? t || e : e;
                var r = doc.getElementsByTagName(a)[0];
                r.parentNode.insertBefore(n, r)
            }
            function init_windVane() {
                var WV_Core = {
                    call: function(e, t, a, n, r, o) {
                        var i, s;
                        lib.promise && ("function" == typeof lib.promise.deferred ? s = lib.promise.deferred() : "function" == typeof lib.promise.defer && (s = lib.promise.defer())),
                        i = WV_Private.getSid();
                        var l = {
                            success: n,
                            failure: r,
                            deferred: s
                        };
                        if (o > 0 && (l.timeout = setTimeout(function() {
                            WV_Core.onFailure(i, {
                                ret: "TIMEOUT"
                            })
                        }, o)),
                        a.sid = i,
                        WV_Private.registerCall(i, l),
                        isAndroid ? compareVersion(wvVersion, "2.7.0") >= 0 ? WV_Private.callMethodByPrompt(e, t, WV_Private.buildParam(a), i + "") : WindVane_Native && WindVane_Native.callMethod && WindVane_Native.callMethod(e, t, WV_Private.buildParam(a), i + "") : isIOS && WV_Private.callMethodByIframe(e, t, WV_Private.buildParam(a), i + ""),
                        s) {
                            if ("function" == typeof lib.promise.deferred)
                                return s.promise();
                            if ("function" == typeof lib.promise.defer)
                                return s.promise
                        }
                    },
                    fireEvent: function(e, t) {
                        var a = doc.createEvent("HTMLEvents");
                        a.initEvent(e, !1, !0),
                        a.param = WV_Private.parseParam(t),
                        doc.dispatchEvent(a)
                    },
                    getParam: function(e) {
                        return WV_Private.params[PARAM_PREFIX + e] || ""
                    },
                    onSuccess: function(e, t) {
                        var a = WV_Private.unregisterCall(e)
                          , n = a.success
                          , r = a.deferred
                          , o = a.timeout;
                        o && clearTimeout(o);
                        var i = WV_Private.parseParam(t);
                        callback(function(e) {
                            n && n(e),
                            r && r.resolve(e)
                        }, i.value || i),
                        WV_Private.onComplete(e)
                    },
                    onFailure: function(e, t) {
                        var a = WV_Private.unregisterCall(e)
                          , n = a.failure
                          , r = a.deferred
                          , o = a.timeout;
                        o && clearTimeout(o);
                        var i = WV_Private.parseParam(t);
                        callback(function(e) {
                            n && n(e),
                            r && r.reject(e)
                        }, i),
                        WV_Private.onComplete(e)
                    }
                }
                  , WV_Private = {
                    params: {},
                    buildParam: function(e) {
                        return e && "object" == typeof e ? JSON.stringify(e) : e || ""
                    },
                    parseParam: function(str) {
                        var obj;
                        if (str && "string" == typeof str)
                            try {
                                obj = JSON.parse(str)
                            } catch (e) {
                                obj = eval("(" + str + ")")
                            }
                        else
                            obj = str || {};
                        return obj
                    },
                    getSid: function() {
                        return (sidBase + inc++) % 65536 + ""
                    },
                    registerCall: function(e, t) {
                        callbackMap[e] = t
                    },
                    unregisterCall: function(e) {
                        var t = {};
                        return callbackMap[e] && (t = callbackMap[e],
                        delete callbackMap[e]),
                        t
                    },
                    useIframe: function(e, t) {
                        var a = IFRAME_PREFIX + e
                          , n = iframePool.pop();
                        n || (n = doc.createElement("iframe"),
                        n.setAttribute("frameborder", "0"),
                        n.style.cssText = "width:0;height:0;border:0;display:none;"),
                        n.setAttribute("id", a),
                        n.setAttribute("src", t),
                        n.parentNode || setTimeout(function() {
                            doc.body.appendChild(n)
                        }, 5)
                    },
                    retrieveIframe: function(e) {
                        var t = IFRAME_PREFIX + e
                          , a = doc.querySelector("#" + t);
                        iframePool.length >= iframeLimit ? doc.body.removeChild(a) : iframePool.push(a)
                    },
                    callMethodByIframe: function(e, t, a, n) {
                        var r = {
                            "selfParam=1": 1,
                            sid: this.parseParam(a).sid
                        };
                        r = this.buildParam(r);
                        var o = LOCAL_PROTOCOL + "://" + e + ":" + n + "/" + t + "?" + r;
                        this.params[PARAM_PREFIX + n] = a,
                        this.useIframe(n, o)
                    },
                    callMethodByPrompt: function(e, t, a, n) {
                        var r = LOCAL_PROTOCOL + "://" + e + ":" + n + "/" + t + "?" + a
                          , o = WV_PROTOCOL + ":";
                        this.params[PARAM_PREFIX + n] = a,
                        window.prompt(r, o)
                    },
                    onComplete: function(e) {
                        isIOS && this.retrieveIframe(e),
                        delete this.params[PARAM_PREFIX + e]
                    }
                };
                for (var key in WV_Core)
                    win[s_goldlog][key] = WindVane[key] = WV_Core[key]
            }
            function sendPV(e) {
                var t, a, n = getSPMFromUrl(page_url), r = getSPMFromUrl(page_referrer), o = getCookie("tracknick"), i = getExParams();
                if (i || (i = "aplus"),
                loc_hash && 0 === loc_hash.indexOf("#") && (loc_hash = loc_hash.substr(1)),
                (!is_in_iframe || atp_inIframeException()) && (a = 1 == waitingMeta ? 7 : VERSION,
                t = [[mkPlainKey(), "title=" + escape(doc.title)], ["pre", page_referrer], ["cache", makeCacheNum()], ["scr", screen.width + "x" + screen.height], ["isbeta", a], ["lver", goldlog.lver]],
                acookie_cna && t.push([mkPlainKey(), "cna=" + acookie_cna]),
                o && t.push([mkPlainKey(), "nick=" + o]),
                t.push(["spm-cnt", (spm_ab || "0.0") + ".0.0"]),
                ifAdd(t, [["spm-url", n], ["spm-pre", r]]),
                tblog_data = tblog_data.concat(t),
                7 == a ? setTimeout(function() {
                    goldlog.launch({
                        isWait: !0
                    })
                }, 6e3) : (tblog_data.push([mkPlainKeyForExparams(), i]),
                ifAdd(tblog_data, [["urlokey", loc_hash], ["aunbid", cookie_unb]]),
                e || ifAdd(tblog_data, [["auto", "0"]]),
                win.g_aplus_pv_req = tblogSend(tblog_beacon_url, tblog_data))),
                is_in_iframe) {
                    getMetaAtpData();
                    var s, l = _atp_beacon_data.on, u = "1" == l ? "//ac.mmstat.com/y.gif" : tblog_beacon_url;
                    "1" != l && "2" != l || !(s = _atp_beacon_data.chksum) || s !== makeChkSum(page_url).toString() || tblogSend(u, tblog_data)
                }
                addEventListener(win, "beforeunload", function() {
                    recordValInWindowName()
                })
            }
            var win = window
              , doc = document
              , _k = "g_tb_aplus_loaded"
              , _launch = "g_tb_aplus_launch";
            if (!doc.getElementsByTagName("body").length)
                return void setTimeout(arguments.callee, 50);
            if (!win[_k]) {
                win[_k] = 1;
                var personality = require("./lib/personality/index.js")
                  , windvaneParams = personality.windvaneParams
                  , util = require("./lib/util")
                  , s_goldlog = "goldlog"
                  , goldlog = win[s_goldlog] || {};
                win[s_goldlog] = goldlog;
                var KEY = {
                    NAME_STORAGE: {
                        REFERRER: "wm_referrer",
                        REFERRER_PV_ID: "refer_pv_id"
                    }
                }, VERSION = "9", loc = location, is_https = "https:" == loc.protocol, is_in_iframe = parent !== win.self, pathname = loc.pathname, use_protocol = is_https ? "https://" : "http://", tblog_beacon_base = use_protocol + "log.mmstat.com/", tblog_beacon_url = tblog_beacon_base + "m.gif", tblog_data = [["logtype", is_in_iframe ? 0 : 1]], page_url = loc.href, page_url_constant = page_url.replace(/[\?#].*/g, ""), s_pv_id_key = "g_aplus_pv_id", pvid = makePVId(), loc_hash = loc.hash, ua = navigator.userAgent, lib = win.lib || (win.lib = {}), isIOS = /iPhone|iPad|iPod/i.test(ua), isAndroid = /Android/i.test(ua), isWindVane = /WindVane/i.test(ua), osVersion = ua.match(/(?:OS|Android)[\/\s](\d+[._]\d+(?:[._]\d+)?)/i), wvVersion = ua.match(/WindVane[\/\s](\d+[._]\d+[._]\d+)/), WindVane = {}, WindVane_Native = win.WindVane_Native, callbackMap = {}, inc = 1, iframePool = [], iframeLimit = 3, LOCAL_PROTOCOL = "hybrid", WV_PROTOCOL = "wv_hybrid", IFRAME_PREFIX = "iframe_", PARAM_PREFIX = "param_", page_referrer = doc.referrer, sidBase = Math.floor(65536 * Math.random()), is_login_page = is_https && (page_url.indexOf("login.m.taobao.com") >= 0 || page_url.indexOf("login.m.tmall.com") >= 0), atta = !!doc.attachEvent, s_attachEvent = "attachEvent", s_addEventListener = "addEventListener", onevent = atta ? s_attachEvent : s_addEventListener, s_false = !1, s_true = !0, s_plain_obj = "::-plain-::", refer_pv_id, _head_node, _meta_nodes, acookie_cna = getCookie("cna"), cookie_unb = getCookie("unb"), s_SPM_ATTR_NAME = "data-spm", s_SPM_DATA_PROTOCOL = "data-spm-protocol", wh_in_page = s_false, default_ab = "0.0", page_global_spm_id_origin, spm_protocol, spm_a = win._SPM_a, spm_b = win._SPM_b, spm_ab, _microscope_data = {}, _atp_beacon_data = {}, _atp_beacon_data_params, waitingMeta = getMetaWaiting(), m_log = require("./lib/log"), is_ali_app_tb, matched;
                (matched = ua.match(/AliApp\(([A-Z\-]+)\/([\d\.]+)\)/i)) && (is_ali_app_tb = "TB" == matched[1]);
                var Tracker = require("./lib/monitor/tracker.js")
                  , tracker = new Tracker({
                    ratio: 5,
                    logkey: "/aplus.99.4",
                    chksum: "H46747616"
                })
                  , nameStorage = function() {
                    function e() {
                        var e, t = [], o = !0;
                        for (var c in g)
                            g.hasOwnProperty(c) && (o = !1,
                            e = g[c] || "",
                            t.push(u(c) + s + u(e)));
                        a.name = o ? n : r + u(n) + i + t.join(l)
                    }
                    function t(e, t, a) {
                        e && (e.addEventListener ? e.addEventListener(t, a, !1) : e.attachEvent && e.attachEvent("on" + t, function(t) {
                            a.call(e, t)
                        }))
                    }
                    var a = window;
                    if (a.nameStorage)
                        return a.nameStorage;
                    var n, r = "nameStorage:", o = /^([^=]+)(?:=(.*))?$/, i = "?", s = "=", l = "&", u = encodeURIComponent, c = decodeURIComponent, g = {}, d = {};
                    return function(e) {
                        if (e && 0 === e.indexOf(r)) {
                            var t = e.split(/[:?]/);
                            t.shift(),
                            n = c(t.shift()) || "";
                            for (var a, i, s, u = t.join(""), d = u.split(l), p = 0, _ = d.length; _ > p; p++)
                                a = d[p].match(o),
                                a && a[1] && (i = c(a[1]),
                                s = c(a[2]) || "",
                                g[i] = s)
                        } else
                            n = e || ""
                    }(a.name),
                    d.setItem = function(t, a) {
                        t && "undefined" != typeof a && (g[t] = String(a),
                        e())
                    }
                    ,
                    d.getItem = function(e) {
                        return g.hasOwnProperty(e) ? g[e] : null
                    }
                    ,
                    d.removeItem = function(t) {
                        g.hasOwnProperty(t) && (g[t] = null,
                        delete g[t],
                        e())
                    }
                    ,
                    d.clear = function() {
                        g = {},
                        e()
                    }
                    ,
                    d.valueOf = function() {
                        return g
                    }
                    ,
                    d.toString = function() {
                        var e = a.name;
                        return 0 === e.indexOf(r) ? e : r + e
                    }
                    ,
                    t(a, "beforeunload", function() {
                        e()
                    }),
                    d
                }();
                page_referrer = doc.referrer || nameStorage.getItem(KEY.NAME_STORAGE.REFERRER) || "",
                osVersion = osVersion ? (osVersion[1] || "0.0.0").replace(/\_/g, ".") : "0.0.0",
                wvVersion = wvVersion ? (wvVersion[1] || "0.0.0").replace(/\_/g, ".") : "0.0.0",
                goldlog.lver = "0.4.8",
                goldlog.is_wap = 1,
                goldlog.version = VERSION,
                goldlog.referrer = page_referrer,
                goldlog._d = {},
                goldlog._microscope_data = _microscope_data,
                goldlog.getCookie = getCookie,
                goldlog.tryToGetAttribute = tryToGetAttribute,
                goldlog.tryToGetHref = tryToGetHref,
                goldlog.isNumber = isNumber,
                goldlog.nameStorage = nameStorage,
                goldlog.launch = function(e, t) {
                    if (!win[_launch] || t) {
                        win[_launch] = s_true;
                        var a, n, r, o, i = getExParams(), s = 1 == waitingMeta, l = tblog_data.slice(0);
                        e && e.isWait && s ? (r = 7,
                        delete e.isWait) : s ? r = 8 : s || (r = 5);
                        for (a in e)
                            e.hasOwnProperty(a) && (n = e[a]) && l.push([a, n]);
                        var u = makeCacheNum();
                        if (m_log.updateKey(l, "cache", u),
                        l.push(["isbeta", r]),
                        t || l.push([mkPlainKeyForExparams(), i]),
                        ifAdd(l, [["urlokey", loc_hash], ["aunbid", cookie_unb]]),
                        t) {
                            l.push(["isbeta", r]),
                            l.push([s_plain_obj, t.gokey]),
                            m_log.updateSPMCnt(l, t.page_id),
                            m_log.updateSPMUrl(l),
                            o = t.page_id;
                            var c = goldlog.spm_ab ? goldlog.spm_ab[1] : "";
                            c && (c = o ? c.split("/")[0] + "/" + o : c.split("/")[0],
                            spm_ab = goldlog.spm_ab[0] + "." + c,
                            goldlog.spm_ab[1] = c)
                        }
                        page_url != location.href && (page_referrer = page_url,
                        page_url = location.href),
                        t && t.referrer && (page_referrer = t.referrer),
                        page_referrer && m_log.updateKey(l, "pre", page_referrer),
                        goldlog.req = win.g_aplus_pv_req = tblogSend(tblog_beacon_url, l)
                    }
                }
                ,
                goldlog.send = function(e, t) {
                    var a, n = new Image, r = "_img_" + Math.random(), o = -1 == e.indexOf("?") ? "?" : "&", i = t ? isArray(t) ? arr2param(t) : obj2param(t) : "";
                    return win[r] = n,
                    n.onload = n.onerror = function() {
                        win[r] = null
                    }
                    ,
                    n.src = a = i ? e + o + i : e,
                    n = null,
                    a
                }
                ;
                var isSingleSendLog = function(e) {
                    return !(!isWindVane || "function" != typeof WindVane.call || !windvaneParams.isSingleSendLog(e))
                };
                goldlog.record = function(e, t, a, n) {
                    n = arguments[3] || "";
                    var r, o, i = "?", s = s_false, l = "//wgo.mmstat.com/", u = "//wgm.mmstat.com/", c = makeCacheNum(), g = "", d = (spm_ab || "0.0") + ".0.0";
                    if ("ac" == e)
                        r = "//ac.mmstat.com/1.gif",
                        s = isStartWith(n, "A") && n.substring(1) == makeChkSum(t);
                    else if (isStartWith(e, "/"))
                        s = isStartWith(n, "H") && n.substring(1) == makeChkSum(e),
                        r = l + e.substring(1),
                        o = 2,
                        g += "&spm-cnt=" + d;
                    else if (isEndWith(e, ".gif"))
                        r = tblog_beacon_base + e;
                    else {
                        if ("aplus" != e)
                            return s_false;
                        r = u + "mx.gif",
                        o = 1
                    }
                    if (!s && "%" != n && makeChkSum(page_url_constant) != n)
                        return s_false;
                    a = (a || "") + (loc_hash ? "&urlokey=" + encodeURIComponent(loc_hash) : "") + (cookie_unb ? "&aunbid=" + encodeURIComponent(cookie_unb) : ""),
                    0 === a.indexOf("&") && (a = a.substr(1)),
                    r += i + "cache=" + c + "&gmkey=" + encodeURIComponent(t) + "&gokey=" + encodeURIComponent(a) + "&cna=" + acookie_cna + "&isbeta=" + VERSION + g,
                    o && (r += "&logtype=" + o);
                    var p = isSingleSendLog({
                        logkey: e,
                        gmkey: t,
                        spm_ab: spm_ab
                    })
                      , _ = {
                        gmkey: t,
                        gokey: a,
                        isbeta: VERSION
                    }
                      , m = {}
                      , f = function(a) {
                        var n = isOnePage()
                          , r = n.split("|")
                          , o = r[0]
                          , i = r[1] ? r[1] : ""
                          , s = _;
                        p && (s._is_g2u_ = 1);
                        try {
                            s.version = "v20161028",
                            s = JSON.stringify(s),
                            "{}" == s && (s = "")
                        } catch (l) {
                            s = ""
                        }
                        m.functype = windvaneParams.getFunctypeValue({
                            logkey: e,
                            gmkey: t,
                            spm_ab: goldlog.spm_ab
                        }),
                        m.logkey = e,
                        m.logkeyargs = s,
                        m.urlpagename = i,
                        m.url = loc.href,
                        m.cna = acookie_cna || "",
                        m.extendargs = "",
                        m.isonepage = o,
                        WindVane.call("WVTBUserTrack", "toUT", m, function() {
                            a({
                                isSuccess: !0
                            })
                        }, function(e) {
                            a({
                                isSuccess: !1,
                                msg: e
                            })
                        }, 5e3)
                    };
                    return isWindVane && "function" == typeof WindVane.call && !/^\/aplus\.99\.(\d)+$/.test(e) && f(function(e) {
                        e && !e.isSuccess && tracker.run({
                            isSingleSend: p,
                            userAgent: navigator.userAgent,
                            url: location.href,
                            windVaneData: m
                        })
                    }),
                    p ? goldlog.useDebug ? m : r : goldlog.send(r)
                }
                ,
                goldlog.sendPV = m_log.sendPV,
                win[s_goldlog] = goldlog,
                init_getGlobalSPMId(),
                isWindVane && init_windVane();
                var etag = require("./lib/etag");
                etag.init(acookie_cna),
                tblogSend = etag.inject(tblogSend, mkPlainKey),
                sendPV(!0)
            }
        }()
    }
    , {
        "./lib/etag": 2,
        "./lib/log": 3,
        "./lib/monitor/tracker.js": 4,
        "./lib/personality/index.js": 5,
        "./lib/util": 8
    }],
    2: [function(e, t, a) {
        function n(e, t) {
            var a = new Date;
            a.setTime(a.getTime() + 31536e7),
            t += "; expires=" + a.toUTCString(),
            t += "; domain=" + o.getDomain(location.hostname),
            t += "; path=/",
            i.cookie = e + "=" + t
        }
        function r(e, t) {
            function a(e) {
                n.onreadystatechange = n.onload = n.onerror = null,
                n = null,
                t(e)
            }
            var n = i.createElement("script");
            if (n.async = !0,
            "onload"in n)
                n.onload = a;
            else {
                var r = function() {
                    /loaded|complete/.test(n.readyState) && a()
                };
                n.onreadystatechange = r,
                r()
            }
            n.onerror = function() {
                a(1)
            }
            ,
            n.src = e,
            s.appendChild(n)
        }
        var o = e("./tld")
          , i = document
          , s = i.head || i.getElementsByTagName("head")[0]
          , l = 0
          , u = -1
          , c = ""
          , g = !1;
        t.exports = {
            init: function(e) {
                if (e)
                    return void (l = 1);
                var t = null;
                g = !0,
                r("https://log.mmstat.com/eg.js", function(e) {
                    e && (u = -3),
                    g && (g = !1,
                    goldlog.Etag && (c = goldlog.Etag,
                    n("cna", c)),
                    "undefined" != typeof goldlog.stag && (u = goldlog.stag),
                    clearTimeout(t))
                }),
                t = setTimeout(function() {
                    g = !1,
                    u = -2
                }, 1e3)
            },
            inject: function(e, t, a) {
                var n = function(r, o) {
                    return o ? !l && g ? (setTimeout(function() {
                        n(r, o)
                    }, 50),
                    r) : (o.push(["tag", l]),
                    o.push(["stag", u]),
                    !l && c && o.unshift([t(), "cna=" + c]),
                    e(r, o, a)) : r
                };
                return n
            }
        }
    }
    , {
        "./tld": 7
    }],
    3: [function(e, t, a) {
        "use strict";
        function n() {
            var e = l.getMetaCnt("aplus-ajax")
              , t = goldlog.spm_ab;
            return t && l.makeChkSum([t[0], (t[1] || "").split("/")[0]].join(".")) == e ? !0 : l.makeChkSum(location.href) == e ? !0 : !1
        }
        function r(e, t, a) {
            i(e, "spm-cnt", function(e) {
                var n = e.split(".");
                return t ? n[1] = n[1].split("/")[0] + "/" + t : n[1] = n[1].split("/")[0],
                a && (n[4] = a),
                n.join(".")
            })
        }
        function o(e, t) {
            var a = g_SPM._current_spm;
            a && i(e, "spm-url", function() {
                return [a.a, a.b, a.c, a.d].join(".") + (t ? "." + t : "")
            }, "spm-cnt")
        }
        function i(e, t, a, n) {
            var r, o, i = e.length, s = -1, l = "function" == typeof a;
            for (r = 0; i > r; r++) {
                if (o = e[r],
                o[0] === t)
                    return void (l ? o[1] = a(o[1]) : o[1] = a);
                n && o[0] === n && (s = r)
            }
            n && (l && (a = a()),
            s > -1 ? e.splice(s, 0, [t, a]) : e.push([t, a]))
        }
        function s(e) {
            n() && goldlog.launch({}, e || {})
        }
        var l = e("./util");
        t.exports = {
            sendPV: s,
            checkIfSendPV: n,
            updateSPMCnt: r,
            updateSPMUrl: o,
            updateKey: i
        }
    }
    , {
        "./util": 8
    }],
    4: [function(e, t, a) {
        "use strict";
        var n = {
            ratio: 10,
            logkey: "/aplus.99.3",
            gmkey: "",
            chksum: "H46747615"
        }
          , r = function(e) {
            e && "object" == typeof e || (e = n),
            this.opts = e,
            this.opts.ratio = e.ratio || n.ratio,
            this.opts.logkey = e.logkey || n.logkey,
            this.opts.gmkey = e.gmkey || n.gmkey,
            this.opts.chksum = e.chksum || n.chksum
        }
          , o = r.prototype;
        o.getRandom = function() {
            return Math.floor(100 * Math.random()) + 1
        }
        ,
        o.run = function(e) {
            var t, a, n;
            try {
                t = this.opts,
                n = this.getRandom(),
                "object" == typeof e ? (e.lver = goldlog.lver,
                a = JSON.stringify(e)) : (e += "&lver=" + goldlog.lver,
                a = e)
            } catch (r) {
                a += "&trackerJsError=" + r.message
            } finally {
                try {
                    goldlog && "function" == typeof goldlog.record && n <= t.ratio && goldlog.record(t.logkey, t.gmkey, a, t.chksum)
                } catch (o) {}
            }
        }
        ,
        t.exports = r
    }
    , {}],
    5: [function(e, t, a) {
        "use strict";
        a.windvaneParams = e("./windvaneParams.js")
    }
    , {
        "./windvaneParams.js": 6
    }],
    6: [function(e, t, a) {
        "use strict";
        var n = function(e) {
            var t = e.logkey.toLowerCase();
            0 === t.indexOf("/") && (t = t.substr(1));
            var a = e.gmkey.toUpperCase();
            switch (a) {
            case "EXP":
                return "2201";
            case "CLK":
                return "2101";
            case "SLD":
                return "19999";
            case "OTHER":
            default:
                return "19999"
            }
        }
          , r = function() {
            for (var e = navigator.userAgent, t = [{
                matchValue: "5.11.7",
                matchRule: e.match(/AliApp\(TB\/(\d+[._]\d+[._]\d+)/i)
            }, {
                matchValue: "5.24.1",
                matchRule: e.match(/AliApp\(TM\/(\d+[._]\d+[._]\d+)/i)
            }], a = 0; a < t.length; a++) {
                var n = t[a].matchRule
                  , r = t[a].matchValue;
                if (n && 2 === n.length && n[1] >= r)
                    return !0
            }
            return !1
        };
        a.isSingleSendLog = function(e) {
            return e && /^\/aplus\.99\.(\d)+$/.test(e.logkey) ? !1 : !!(e && e.logkey && e.gmkey && r() === !0)
        }
        ,
        a.getFunctypeValue = function(e) {
            return a.isSingleSendLog(e) ? n(e) : "2101"
        }
    }
    , {}],
    7: [function(e, t, a) {
        "use strict";
        function n(e) {
            var t, a = e.split("."), n = a.length;
            return t = r.any(o, function(t) {
                return r.isEndWith(e, t)
            }) ? a.slice(n - 3) : a.slice(n - 2),
            t.join(".")
        }
        var r = e("./util")
          , o = [".com.cn", ".net.cn"];
        a.getDomain = n
    }
    , {
        "./util": 8
    }],
    8: [function(e, t, a) {
        "use strict";
        function n(e, t) {
            return e && e.getAttribute ? e.getAttribute(t) || "" : ""
        }
        function r(e) {
            var t = document;
            return p = p || t.getElementsByTagName("head")[0],
            _ && !e ? _ : p ? _ = p.getElementsByTagName("meta") : []
        }
        function o(e) {
            var t, a, o, i = r(), s = i.length;
            for (t = 0; s > t; t++)
                a = i[t],
                n(a, "name") === e && (o = n(a, "content"));
            return o || ""
        }
        function i(e) {
            e = (e || "").split("#")[0].split("?")[0];
            var t = e.length
              , a = function(e) {
                var t, a = e.length, n = 0;
                for (t = 0; a > t; t++)
                    n = 31 * n + e.charCodeAt(t);
                return n
            };
            return t ? a(t + "#" + e.charCodeAt(t - 1)) : -1
        }
        function s(e, t) {
            return e.indexOf(t) > -1
        }
        function l(e, t) {
            return 0 === e.indexOf(t)
        }
        function u(e, t) {
            var a = e.length
              , n = t.length;
            return a >= n && e.indexOf(t) == a - n
        }
        function c(e) {
            return "function" == typeof e
        }
        function g(e) {
            return "string" == typeof e ? e.replace(/^\s+|\s+$/g, "") : ""
        }
        function d(e, t) {
            var a, n = e.length;
            for (a = 0; n > a; a++)
                if (t(e[a]))
                    return !0;
            return !1
        }
        var p, _;
        a.tryToGetAttribute = n,
        a.getMetaTags = r,
        a.getMetaCnt = o,
        a.makeChkSum = i,
        a.isContain = s,
        a.isStartWith = l,
        a.isEndWith = u,
        a.isFunction = c,
        a.trim = g,
        a.rndInt32 = function() {
            return Math.round(2147483647 * Math.random())
        }
        ,
        a.any = d
    }
    , {}]
}, {}, [1]);
/* 2017-02-21 16:34:49 */
!function t(e, n, r) {
    function o(i, u) {
        if (!n[i]) {
            if (!e[i]) {
                var c = "function" == typeof require && require;
                if (!u && c)
                    return c(i, !0);
                if (a)
                    return a(i, !0);
                throw new Error("Cannot find module '" + i + "'")
            }
            var s = n[i] = {
                exports: {}
            };
            e[i][0].call(s.exports, function(t) {
                var n = e[i][1][t];
                return o(n ? n : t)
            }, s, s.exports, t, e, n, r)
        }
        return n[i].exports
    }
    for (var a = "function" == typeof require && require, i = 0; i < r.length; i++)
        o(r[i]);
    return o
}({
    1: [function(t, e, n) {
        !function() {
            function e(t) {
                var e, n;
                try {
                    return e = [].slice.call(t)
                } catch (r) {
                    e = [],
                    n = t.length;
                    for (var o = 0; n > o; o++)
                        e.push(t[o]);
                    return e
                }
            }
            function n(t, e) {
                return t && t.getAttribute ? t.getAttribute(e) || "" : ""
            }
            function r(t, e, n) {
                if (t && t.setAttribute)
                    try {
                        t.setAttribute(e, n)
                    } catch (r) {}
            }
            function o(t, e) {
                if (t && t.removeAttribute)
                    try {
                        t.removeAttribute(e)
                    } catch (n) {
                        r(t, e, "")
                    }
            }
            function a(t, e) {
                return 0 == t.indexOf(e)
            }
            function i(t) {
                for (var e = ["javascript:", "tel:", "sms:", "mailto:", "tmall://"], n = 0, r = e.length; r > n; n++)
                    if (a(t, e[n]))
                        return !0
            }
            function u(t) {
                return "string" == typeof t
            }
            function c(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            }
            function s(t) {
                return "number" == typeof t
            }
            function l(t, e) {
                return t.indexOf(e) >= 0
            }
            function f(t, e) {
                return t.indexOf(e) > -1
            }
            function m(t, e) {
                for (var n = 0, r = e.length; r > n; n++)
                    if (f(t, e[n]))
                        return yt;
                return bt
            }
            function g(t) {
                return u(t) ? t.replace(/^\s+|\s+$/g, "") : ""
            }
            function p(t) {
                return "undefined" == typeof t
            }
            function d(t, e) {
                var n = e || "";
                if (t)
                    try {
                        n = decodeURIComponent(t)
                    } catch (r) {}
                return n
            }
            function h() {
                return ft = ft || ht.getElementsByTagName("head")[0],
                mt || (ft ? mt = ft.getElementsByTagName("meta") : [])
            }
            function v(t, e) {
                var n, r, o = t.split(";"), a = o.length;
                for (n = 0; a > n; n++)
                    r = o[n].split("="),
                    e[g(r[0]) || Ct] = d(g(r.slice(1).join("=")))
            }
            function y() {
                var t, e, r, o, a = h();
                for (t = 0,
                e = a.length; e > t; t++)
                    r = a[t],
                    o = n(r, "name"),
                    o == qt && (gt = n(r, zt))
            }
            function b(t) {
                var e, r, o, i, u, c, s = h();
                if (s)
                    for (e = 0,
                    r = s.length; r > e; e++)
                        if (i = s[e],
                        u = n(i, "name"),
                        u == t)
                            return ct = n(i, "content"),
                            ct.indexOf(":") >= 0 && (o = ct.split(":"),
                            gt = "i" == o[0] ? "i" : "u",
                            ct = o[1]),
                            c = n(i, zt),
                            c && (gt = "i" == c ? "i" : "u"),
                            st = a(ct, "110"),
                            ut = st ? Mt : ct,
                            yt;
                return bt
            }
            function k() {
                var t, e, r, o = h(), a = o.length;
                for (t = 0; a > t; t++)
                    if (e = o[t],
                    "aplus-touch" == n(e, "name")) {
                        r = n(e, "content");
                        break
                    }
                return r
            }
            function w() {
                return Math.floor(268435456 * Math.random()).toString(16)
            }
            function _(t) {
                var e, n, r = [];
                for (e in t)
                    t.hasOwnProperty(e) && (n = "" + t[e],
                    r.push(a(e, Ct) ? n : e + "=" + encodeURIComponent(n)));
                return r.join("&")
            }
            function A(t) {
                var e, n, r, o = [], i = t.length;
                for (r = 0; i > r; r++)
                    e = t[r][0],
                    n = t[r][1],
                    o.push(a(e, Ct) ? n : e + "=" + encodeURIComponent(n));
                return o.join("&")
            }
            function j(t) {
                var e;
                try {
                    e = g(t.getAttribute("href", 2))
                } catch (n) {}
                return e || ""
            }
            function N(t, e, n) {
                return "tap" == e ? void x(t, n) : void t[Vt](($t ? "on" : "") + e, function(t) {
                    t = t || dt.event;
                    var e = t.target || t.srcElement;
                    n(e)
                }, bt)
            }
            function x(t, e) {
                var n = "ontouchend"in document.createElement("div")
                  , r = n ? "touchstart" : "mousedown"
                  , o = dt.KISSY;
                o && o.__touchModAdded && o.one && n ? o.one(t).on("tap", function(t) {
                    e && e(t.target)
                }) : N(t, r, function(t) {
                    e && e(t)
                })
            }
            function S(t) {
                var e = dt.KISSY;
                e ? e.ready(t) : dt.jQuery ? jQuery(ht).ready(t) : "complete" === ht.readyState ? t() : N(dt, "load", t)
            }
            function E(t, e) {
                var n, r = new Image, o = "_img_" + Math.random(), a = -1 == t.indexOf("?") ? "?" : "&", i = e ? c(e) ? A(e) : _(e) : "";
                return dt[o] = r,
                r.onload = r.onerror = function() {
                    dt[o] = null
                }
                ,
                r.src = n = i ? t + a + i : t,
                r = null,
                n
            }
            function O() {
                if (goldlog.spm_ab)
                    return ut = goldlog.spm_ab.join(".");
                if (!p(ut))
                    return ut;
                var t;
                if (Ot && !Wt && (t = kt.match(/^[^?]+\?[^?]*spm=([^&#?]+)/),
                t && (Wt = t[1] + "_")),
                dt._SPM_a && dt._SPM_b)
                    return at = dt._SPM_a.replace(/^{(\w+\/)}$/g, "$1"),
                    it = dt._SPM_b.replace(/^{(\w+\/)}$/g, "$1"),
                    Ut = yt,
                    ut = at + "." + it,
                    y(),
                    ut;
                if (b(qt) || b("spm-id"),
                !ut)
                    return Pt = !0,
                    ut = Mt,
                    Mt;
                var e, r, o = ht.getElementsByTagName("body");
                return o = o && o.length ? o[0] : null,
                o && (e = n(o, qt),
                e && (r = ut.split("."),
                ut = r[0] + "." + e)),
                f(ut, ".") || (Pt = !0,
                ut = Mt),
                ut
            }
            function T(t) {
                var e, n, r, o, a, i, u = ht.getElementsByTagName("*");
                for (e = []; t && 1 == t.nodeType; t = t.parentNode)
                    if (i = t.id) {
                        for (o = 0,
                        n = 0; n < u.length; n++)
                            if (a = u[n],
                            a.id == i) {
                                o++;
                                break
                            }
                        if (e.unshift(t.tagName.toLowerCase() + '[@id="' + i + '"]'),
                        1 == o)
                            return e.unshift("/"),
                            e.join("/")
                    } else {
                        for (n = 1,
                        r = t.previousSibling; r; r = r.previousSibling)
                            r.tagName == t.tagName && n++;
                        e.unshift(t.tagName.toLowerCase() + "[" + n + "]")
                    }
                return e.length ? "/" + e.join("/") : null
            }
            function M(t) {
                var e = Dt[T(t)];
                return e ? e.spmc : ""
            }
            function P(t, r) {
                var o, a, i, u, c, s, l, f, m, g = [];
                for (o = e(t.getElementsByTagName("a")),
                a = e(t.getElementsByTagName("area")),
                u = o.concat(a),
                l = 0,
                f = u.length; f > l; l++) {
                    for (s = !1,
                    c = i = u[l]; (c = c.parentNode) && c != t; )
                        if (n(c, qt)) {
                            s = !0;
                            break
                        }
                    s || (m = n(i, Yt),
                    r || "t" == m ? r && "t" == m && g.push(i) : g.push(i))
                }
                return g
            }
            function C(t, e, r, o) {
                var i, c, f, m, g, p, d, h, v, y, b, k, w, _, A;
                if (n(t, "data-spm-delay"))
                    return void t.setAttribute("data-spm-delay", "");
                if (e = e || t.getAttribute(qt) || "",
                e && (i = P(t, o),
                0 !== i.length)) {
                    if (f = e.split("."),
                    w = a(e, "110") && 3 == f.length,
                    w && (_ = f[2],
                    f[2] = "w" + (_ || "0"),
                    e = f.join(".")),
                    u(v = O()) && v.match(/^[\w\-\*]+(\.[\w\-\*\/]+)?$/))
                        if (l(e, ".")) {
                            if (!a(e, v)) {
                                for (m = v.split("."),
                                f = e.split("."),
                                b = 0,
                                y = m.length; y > b; b++)
                                    f[b] = m[b];
                                e = f.join(".")
                            }
                        } else
                            l(v, ".") || (v += ".0"),
                            e = v + "." + e;
                    if (e.match && e.match(/^[\w\-\*]+\.[\w\-\*\/]+\.[\w\-\*\/]+$/)) {
                        var N = o ? Qt : Ft;
                        for (A = parseInt(n(t, N)) || 0,
                        k = 0,
                        g = A,
                        y = i.length; y > k; k++)
                            c = i[k],
                            p = j(c),
                            (o || p) && (w && c.setAttribute(Xt, _),
                            (d = c.getAttribute(Gt)) ? U(c, d, r) : (g++,
                            h = H(c) || g,
                            o && (h = "at" + ((s(h) ? 1e3 : "") + h)),
                            d = e + "." + h,
                            U(c, d, r)));
                        t.setAttribute(N, g)
                    }
                }
            }
            function B(t) {
                var e, n = ["mclick.simba.taobao.com", "click.simba.taobao.com", "click.tanx.com", "click.mz.simba.taobao.com", "click.tz.simba.taobao.com", "redirect.simba.taobao.com", "rdstat.tanx.com", "stat.simba.taobao.com", "s.click.taobao.com"], r = n.length;
                for (e = 0; r > e; e++)
                    if (-1 != t.indexOf(n[e]))
                        return !0;
                return !1
            }
            function L(t) {
                return t ? !!t.match(/^[^\?]*\balipay\.(?:com|net)\b/i) : bt
            }
            function $(t) {
                return t ? !!t.match(/^[^\?]*\balipay\.(?:com|net)\/.*\?.*\bsign=.*/i) : bt
            }
            function R(t) {
                for (var e; (t = t.parentNode) && t.tagName != Lt; )
                    if (e = n(t, zt))
                        return e;
                return ""
            }
            function I(t, e) {
                if (t && /&?\bspm=[^&#]*/.test(t) && (t = t.replace(/&?\bspm=[^&#]*/g, "").replace(/&{2,}/g, "&").replace(/\?&/, "?").replace(/\?$/, "")),
                !e)
                    return t;
                var n, r, o, a, i, u, c, s = "&";
                if (-1 != t.indexOf("#") && (o = t.split("#"),
                t = o.shift(),
                r = o.join("#")),
                a = t.split("?"),
                i = a.length - 1,
                o = a[0].split("//"),
                o = o[o.length - 1].split("/"),
                u = o.length > 1 ? o.pop() : "",
                i > 0 && (n = a.pop(),
                t = a.join("?")),
                n && i > 1 && -1 == n.indexOf("&") && -1 != n.indexOf("%") && (s = "%26"),
                t = t + "?spm=" + Wt + e + (n ? s + n : "") + (r ? "#" + r : ""),
                c = f(u, ".") ? u.split(".").pop().toLowerCase() : "") {
                    if ({
                        png: 1,
                        jpg: 1,
                        jpeg: 1,
                        gif: 1,
                        bmp: 1,
                        swf: 1
                    }.hasOwnProperty(c))
                        return 0;
                    !n && 1 >= i && (r || {
                        htm: 1,
                        html: 1,
                        php: 1
                    }.hasOwnProperty(c) || (t += "&file=" + u))
                }
                return t
            }
            function V(t) {
                return t && kt.split("#")[0] == t.split("#")[0]
            }
            function U(t, e, r) {
                if (t.setAttribute(Gt, e),
                !r && !n(t, Kt)) {
                    var o = j(t)
                      , u = "i" == (n(t, zt) || R(t) || gt)
                      , c = St + "tbspm.1.1?logtype=2&spm=";
                    o && !B(o) && (u || !(a(o, "#") || V(o) || i(o.toLowerCase()) || L(o) || $(o))) && (u ? (c += e + "&url=" + encodeURIComponent(o) + "&cache=" + w(),
                    pt == t && E(c)) : r || (o = I(o, e)) && D(t, o))
                }
            }
            function D(t, e) {
                var n, r = t.innerHTML;
                r && -1 == r.indexOf("<") && (n = ht.createElement("b"),
                n.style.display = "none",
                t.appendChild(n)),
                t.href = e,
                n && t.removeChild(n)
            }
            function H(t) {
                var e, r, o;
                return Pt ? e = "0" : Ut ? (r = T(t),
                o = Dt[r],
                o && (e = o.spmd)) : (e = n(t, qt),
                e && e.match(/^d\w+$/) || (e = "")),
                e
            }
            function q(t) {
                for (var e, n, r = t; t && t.tagName != Bt && t.tagName != Lt && t.getAttribute; ) {
                    if (n = Ut ? M(t) : t.getAttribute(qt)) {
                        e = n,
                        r = t;
                        break
                    }
                    if (!(t = t.parentNode))
                        break
                }
                return e && !/^[\w\-\.\/]+$/.test(e) && (e = "0"),
                {
                    spm_c: e,
                    el: r
                }
            }
            function z(t) {
                var e;
                return t && (e = t.match(/&?\bspm=([^&#]*)/)) ? e[1] : ""
            }
            function J(t, e) {
                var n = j(t)
                  , r = z(n)
                  , o = null
                  , a = ut && 2 == ut.split(".").length;
                return a ? (o = [ut, 0, H(t) || 0],
                void U(t, o.join("."), e)) : void (n && r && (n = n.replace(/&?\bspm=[^&#]*/g, "").replace(/&{2,}/g, "&").replace(/\?&/, "?").replace(/\?$/, "").replace(/\?#/, "#"),
                D(t, n)))
            }
            function K(t, e) {
                pt = t;
                var r, o, a = n(t, Gt);
                if (a)
                    U(t, a, e);
                else {
                    if (r = q(t.parentNode),
                    o = r.spm_c,
                    !o)
                        return void J(t, e);
                    Pt && (o = "0"),
                    C(r.el, o, e),
                    C(r.el, o, e, !0)
                }
            }
            function Y(t) {
                if (t && 1 == t.nodeType) {
                    o(t, Ft),
                    o(t, Qt);
                    var n, r = e(t.getElementsByTagName("a")), a = e(t.getElementsByTagName("area")), i = r.concat(a), u = i.length;
                    for (n = 0; u > n; n++)
                        o(i[n], Gt)
                }
            }
            function F(t) {
                var e = t.parentNode;
                if (!e)
                    return "";
                var n = t.getAttribute(qt)
                  , r = q(e)
                  , o = r.spm_c || 0;
                o && -1 != o.indexOf(".") && (o = o.split("."),
                o = o[o.length - 1]);
                var a = ut + "." + o
                  , i = Tt[a] || 0;
                return i++,
                Tt[a] = i,
                n = n || i,
                a + ".i" + n
            }
            function Q(t) {
                var e, r = t.tagName;
                return lt = dt.g_aplus_pv_id,
                "A" != r && "AREA" != r ? e = F(t) : (K(t, yt),
                e = n(t, Gt)),
                e = (e || "0.0.0.0").split("."),
                {
                    a: e[0],
                    b: e[1],
                    c: e[2],
                    d: e[3]
                }
            }
            function W(t) {
                var e = Q(t);
                return e.a + "." + e.b + "." + e.c + "." + e.d
            }
            function X() {
                if (!Ht) {
                    if (!dt.spmData)
                        return void (Et || setTimeout(arguments.callee, 100));
                    Ht = yt;
                    var t, e, n, r, o = dt.spmData.data;
                    if (o && c(o))
                        for (t = 0,
                        e = o.length; e > t; t++)
                            n = o[t],
                            r = n.xpath,
                            Dt[r] = {
                                spmc: n.spmc,
                                spmd: n.spmd
                            }
                }
            }
            function G() {
                var t, e, r, o, a = ht.getElementsByTagName("iframe"), i = a.length;
                for (e = 0; i > e; e++)
                    t = a[e],
                    !t.src && (r = n(t, Jt)) && (o = Q(t),
                    o ? (o = [o.a, o.b, o.c, o.d, o.e].join("."),
                    t.src = I(r, o)) : t.src = r)
            }
            function Z() {
                function t() {
                    e++,
                    e > 10 && (n = 3e3),
                    G(),
                    setTimeout(t, n)
                }
                var e = 0
                  , n = 500;
                t()
            }
            function tt(t) {
                return !(!dt.goldlog || "function" != typeof dt.goldlog.call || !xt.isSingleSendLog(t))
            }
            function et(t, e) {
                var n, r, o, i = "gostr", u = "locaid", c = "gmkey", s = {};
                if (v(e, s),
                n = s[i],
                r = s[u],
                o = s[c],
                n && r) {
                    a(n, "/") && (n = n.substr(1));
                    var l, f = Q(t), m = [f.a, f.b, f.c, r].join("."), g = n + "." + m, p = ["logtype=2", "cache=" + Math.random(), "autosend=1"];
                    for (l in s)
                        s.hasOwnProperty(l) && l != i && l != u && p.push(l + "=" + s[l]);
                    p.length > 0 && (g += "?" + p.join("&"));
                    var d, h = {
                        gmkey: o,
                        gokey: p.length > 0 ? p.join("&") : ""
                    }, y = tt({
                        logkey: n,
                        gmkey: o,
                        spm_ab: goldlog.spm_ab
                    }), b = function(t) {
                        y && (h._is_g2u_ = 1),
                        h.version = "v20161028";
                        try {
                            h = JSON.stringify(h),
                            "{}" == h && (h = "")
                        } catch (e) {
                            h = ""
                        }
                        d.functype = xt.getFunctypeValue({
                            logkey: n,
                            gmkey: o,
                            spm_ab: goldlog.spm_ab
                        }),
                        d.logkey = "/" + n + "." + m,
                        d.logkeyargs = h,
                        d.extendargs = "",
                        delete d.spmcnt,
                        delete d.spmpre,
                        delete d.lzsid,
                        dt.goldlog.call("WVTBUserTrack", "toUT", d, function() {
                            t({
                                isSuccess: !0
                            })
                        }, function(e) {
                            t({
                                isSuccess: !1,
                                msg: e
                            })
                        }, 5e3)
                    }, k = function() {
                        E(St + g),
                        t.setAttribute(Gt, m)
                    }, w = "/" + n + "." + m;
                    dt.goldlog && dt.goldlog.call && (d = dt.goldlog.windVaneData) && !/^\/aplus\.99\.(\d)+$/.test(w) && b(function(t) {
                        t && !t.isSuccess && te.run({
                            isSingleSend: y,
                            userAgent: navigator.userAgent,
                            url: location.href,
                            windVaneData: d
                        })
                    }),
                    y || k()
                }
            }
            function nt(t) {
                for (var e; t && t.tagName != Bt; ) {
                    e = n(t, Kt);
                    {
                        if (e) {
                            et(t, e);
                            break
                        }
                        t = t.parentNode
                    }
                }
            }
            function rt() {
                At ? N(ht, "tap", nt) : N(ht, "mousedown", nt)
            }
            function ot(t) {
                for (var e; t && (e = t.tagName); ) {
                    if ("A" == e || "AREA" == e) {
                        K(t, bt);
                        break
                    }
                    if (e == Lt || e == Bt)
                        break;
                    t = t.parentNode
                }
            }
            var at, it, ut, ct, st, lt, ft, mt, gt, pt, dt = window, ht = document, vt = location, yt = !0, bt = !1, kt = vt.href, wt = vt.protocol, _t = "https:" == wt, At = k(), jt = _t ? "https:" : "http:", Nt = t("./lib/personality/index.js"), xt = Nt.windvaneParams, St = jt + "//wgo.mmstat.com/", Et = bt, Ot = parent !== self, Tt = {}, Mt = "0.0", Pt = !1, Ct = "::-plain-::", Bt = "HTML", Lt = "BODY", $t = !!ht.attachEvent, Rt = "attachEvent", It = "addEventListener", Vt = $t ? Rt : It, Ut = bt, Dt = {}, Ht = bt, qt = "data-spm", zt = "data-spm-protocol", Jt = "data-spm-src", Kt = "data-spm-click", Yt = "data-auto-spmd", Ft = "data-spm-max-idx", Qt = "data-auto-spmd-max-idx", Wt = "", Xt = "data-spm-wangpu-module-id", Gt = "data-spm-anchor-id", Zt = t("./lib/monitor/tracker.js"), te = new Zt({
                ratio: 5,
                logkey: "/aplus.99.4",
                chksum: "H46747616"
            });
            m(kt, ["xiaobai.com", "admin.taobao.org"]) || (S(function() {
                Et = yt
            }),
            O(),
            X(),
            Z(),
            rt(),
            At ? N(ht, "tap", ot) : (N(ht, "mousedown", ot),
            N(ht, "keydown", ot)),
            dt.g_SPM = {
                resetModule: Y,
                anchorBeacon: K,
                getParam: Q,
                spm: W
            })
        }()
    }
    , {
        "./lib/monitor/tracker.js": 2,
        "./lib/personality/index.js": 3
    }],
    2: [function(t, e, n) {
        "use strict";
        var r = {
            ratio: 10,
            logkey: "/aplus.99.3",
            gmkey: "",
            chksum: "H46747615"
        }
          , o = function(t) {
            t && "object" == typeof t || (t = r),
            this.opts = t,
            this.opts.ratio = t.ratio || r.ratio,
            this.opts.logkey = t.logkey || r.logkey,
            this.opts.gmkey = t.gmkey || r.gmkey,
            this.opts.chksum = t.chksum || r.chksum
        }
          , a = o.prototype;
        a.getRandom = function() {
            return Math.floor(100 * Math.random()) + 1
        }
        ,
        a.run = function(t) {
            var e, n, r;
            try {
                e = this.opts,
                r = this.getRandom(),
                "object" == typeof t ? (t.lver = goldlog.lver,
                n = JSON.stringify(t)) : (t += "&lver=" + goldlog.lver,
                n = t)
            } catch (o) {
                n += "&trackerJsError=" + o.message
            } finally {
                try {
                    goldlog && "function" == typeof goldlog.record && r <= e.ratio && goldlog.record(e.logkey, e.gmkey, n, e.chksum)
                } catch (a) {}
            }
        }
        ,
        e.exports = o
    }
    , {}],
    3: [function(t, e, n) {
        "use strict";
        n.windvaneParams = t("./windvaneParams.js")
    }
    , {
        "./windvaneParams.js": 4
    }],
    4: [function(t, e, n) {
        "use strict";
        var r = function(t) {
            var e = t.logkey.toLowerCase();
            0 === e.indexOf("/") && (e = e.substr(1));
            var n = t.gmkey.toUpperCase();
            switch (n) {
            case "EXP":
                return "2201";
            case "CLK":
                return "2101";
            case "SLD":
                return "19999";
            case "OTHER":
            default:
                return "19999"
            }
        }
          , o = function() {
            for (var t = navigator.userAgent, e = [{
                matchValue: "5.11.7",
                matchRule: t.match(/AliApp\(TB\/(\d+[._]\d+[._]\d+)/i)
            }, {
                matchValue: "5.24.1",
                matchRule: t.match(/AliApp\(TM\/(\d+[._]\d+[._]\d+)/i)
            }], n = 0; n < e.length; n++) {
                var r = e[n].matchRule
                  , o = e[n].matchValue;
                if (r && 2 === r.length && r[1] >= o)
                    return !0
            }
            return !1
        };
        n.isSingleSendLog = function(t) {
            return t && /^\/aplus\.99\.(\d)+$/.test(t.logkey) ? !1 : !!(t && t.logkey && t.gmkey && o() === !0)
        }
        ,
        n.getFunctypeValue = function(t) {
            return n.isSingleSendLog(t) ? r(t) : "2101"
        }
    }
    , {}]
}, {}, [1]);
/* 2017-02-21 16:34:49 */
!function t(e, r, n) {
    function i(a, c) {
        if (!r[a]) {
            if (!e[a]) {
                var f = "function" == typeof require && require;
                if (!c && f)
                    return f(a, !0);
                if (o)
                    return o(a, !0);
                throw new Error("Cannot find module '" + a + "'")
            }
            var p = r[a] = {
                exports: {}
            };
            e[a][0].call(p.exports, function(t) {
                var r = e[a][1][t];
                return i(r ? r : t)
            }, p, p.exports, t, e, r, n)
        }
        return r[a].exports
    }
    for (var o = "function" == typeof require && require, a = 0; a < n.length; a++)
        i(n[a]);
    return i
}({
    1: [function(t, e, r) {
        !function() {
            function t(t, e, r) {
                t[x]((v ? "on" : "") + e, function(t) {
                    t = t || p.event;
                    var e = t.target || t.srcElement;
                    r(t, e)
                }, !1)
            }
            function e() {
                return /&?\bspm=[^&#]*/.test(location.href) ? location.href.match(/&?\bspm=[^&#]*/gi)[0].split("=")[1] : ""
            }
            function r(t, e) {
                if (t && /&?\bspm=[^&#]*/.test(t) && (t = t.replace(/&?\bspm=[^&#]*/g, "").replace(/&{2,}/g, "&").replace(/\?&/, "?").replace(/\?$/, "")),
                !e)
                    return t;
                var r, n, i, o, a, c, f, p = "&";
                if (-1 != t.indexOf("#") && (i = t.split("#"),
                t = i.shift(),
                n = i.join("#")),
                o = t.split("?"),
                a = o.length - 1,
                i = o[0].split("//"),
                i = i[i.length - 1].split("/"),
                c = i.length > 1 ? i.pop() : "",
                a > 0 && (r = o.pop(),
                t = o.join("?")),
                r && a > 1 && -1 == r.indexOf("&") && -1 != r.indexOf("%") && (p = "%26"),
                t = t + "?spm=" + e + (r ? p + r : "") + (n ? "#" + n : ""),
                f = c.indexOf(".") > -1 ? c.split(".").pop().toLowerCase() : "") {
                    if ({
                        png: 1,
                        jpg: 1,
                        jpeg: 1,
                        gif: 1,
                        bmp: 1,
                        swf: 1
                    }.hasOwnProperty(f))
                        return 0;
                    !r && 1 >= a && (n || {
                        htm: 1,
                        html: 1,
                        php: 1
                    }.hasOwnProperty(f) || (t += "&file=" + c))
                }
                return t
            }
            function n(t) {
                function e(t) {
                    return t = t.replace(/refpos[=(%3D)]\w*/gi, c).replace(o, "%3D" + n + "%26" + i.replace("=", "%3D")).replace(a, n),
                    i.length > 0 && (t += "&" + i),
                    t
                }
                var r = window.location.href
                  , n = r.match(/mm_\d{0,24}_\d{0,24}_\d{0,24}/i)
                  , i = r.match(/[&\?](pvid=[^&]*)/i)
                  , o = new RegExp("%3Dmm_\\d+_\\d+_\\d+","ig")
                  , a = new RegExp("mm_\\d+_\\d+_\\d+","ig");
                i = i && i[1] ? i[1] : "";
                var c = r.match(/(refpos=(\d{0,24}_\d{0,24}_\d{0,24})?(,[a-z]+)?)(,[a-z]+)?/i);
                return c = c && c[0] ? c[0] : "",
                n ? (n = n[0],
                e(t)) : t
            }
            function i(e) {
                var r = p.KISSY;
                r ? r.ready(e) : p.jQuery ? jQuery(m).ready(e) : "complete" === m.readyState ? e() : t(p, "load", e)
            }
            function o(t, e) {
                return t && t.getAttribute ? t.getAttribute(e) || "" : ""
            }
            function a(t) {
                if (t) {
                    var e, r = b.length;
                    for (e = 0; r > e; e++)
                        if (t.indexOf(b[e]) > -1)
                            return !0;
                    return !1
                }
            }
            function c(t, e) {
                if (t && /&?\bspm=[^&#]*/.test(t) && (t = t.replace(/&?\bspm=[^&#]*/g, "").replace(/&{2,}/g, "&").replace(/\?&/, "?").replace(/\?$/, "")),
                !e)
                    return t;
                var r, n, i, o, a, c, f, p = "&";
                if (-1 != t.indexOf("#") && (i = t.split("#"),
                t = i.shift(),
                n = i.join("#")),
                o = t.split("?"),
                a = o.length - 1,
                i = o[0].split("//"),
                i = i[i.length - 1].split("/"),
                c = i.length > 1 ? i.pop() : "",
                a > 0 && (r = o.pop(),
                t = o.join("?")),
                r && a > 1 && -1 == r.indexOf("&") && -1 != r.indexOf("%") && (p = "%26"),
                t = t + "?spm=" + e + (r ? p + r : "") + (n ? "#" + n : ""),
                f = c.indexOf(".") > -1 ? c.split(".").pop().toLowerCase() : "") {
                    if ({
                        png: 1,
                        jpg: 1,
                        jpeg: 1,
                        gif: 1,
                        bmp: 1,
                        swf: 1
                    }.hasOwnProperty(f))
                        return 0;
                    !r && 1 >= a && (n || {
                        htm: 1,
                        html: 1,
                        php: 1
                    }.hasOwnProperty(f) || (t += "&__file=" + c))
                }
                return t
            }
            function f(t) {
                if (a(t.href)) {
                    var r = o(t, g);
                    if (!r) {
                        if (!u)
                            return;
                        var n = u(t)
                          , i = [n.a, n.b, n.c, n.d, n.e].join(".");
                        h && (i = [n.a || "0", n.b || "0", n.c || "0", n.d || "0"].join("."),
                        i = (e() || "0.0.0.0.0") + "_" + i);
                        var f = c(t.href, i);
                        t.href = f,
                        t.setAttribute(g, i)
                    }
                }
                t = void 0
            }
            var p = window
              , m = document
              , s = location
              , l = (s.href,
            p._alimm_spmact_on_);
            if ("undefined" == typeof l && (l = 1),
            1 == l && (l = 1),
            0 == l && (l = 0),
            l) {
                var u;
                try {
                    u = p.g_SPM.getParam
                } catch (d) {
                    u = function() {
                        return {
                            a: 0,
                            b: 0,
                            c: 0,
                            d: 0,
                            e: 0
                        }
                    }
                }
                var h = !0;
                try {
                    h = self.location != top.location
                } catch (d) {}
                var g = "data-spm-act-id"
                  , b = ["mclick.simba.taobao.com", "click.simba.taobao.com", "click.tanx.com", "click.mz.simba.taobao.com", "click.tz.simba.taobao.com", "redirect.simba.taobao.com", "rdstat.tanx.com", "stat.simba.taobao.com", "s.click.taobao.com"]
                  , v = !!m.attachEvent
                  , w = "attachEvent"
                  , _ = "addEventListener"
                  , x = v ? w : _;
                t(m, "mousedown", function(t, e) {
                    for (var r, n = 0; e && (r = e.tagName) && 5 > n; ) {
                        if ("A" == r || "AREA" == r) {
                            f(e);
                            break
                        }
                        if ("BODY" == r || "HTML" == r)
                            break;
                        e = e.parentNode,
                        n++
                    }
                }),
                i(function() {
                    for (var t, i, a = document.getElementsByTagName("iframe"), c = 0; c < a.length; c++) {
                        t = o(a[c], "mmsrc"),
                        i = o(a[c], "mmworked");
                        var f = u(a[c])
                          , p = [f.a || "0", f.b || "0", f.c || "0", f.d || "0", f.e || "0"].join(".");
                        t && !i ? (h && (p = [f.a || "0", f.b || "0", f.c || "0", f.d || "0"].join("."),
                        p = e() + "_" + p),
                        a[c].src = r(n(t), p),
                        a[c].setAttribute("mmworked", "mmworked")) : a[c].setAttribute(g, p)
                    }
                })
            }
        }()
    }
    , {}]
}, {}, [1]);
