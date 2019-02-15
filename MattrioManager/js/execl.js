/* xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var DO_NOT_EXPORT_CODEPAGE = true;
var DO_NOT_EXPORT_JSZIP = true;
(function(e) { if ("object" == typeof exports && "undefined" != typeof module && "undefined" == typeof DO_NOT_EXPORT_JSZIP) module.exports = e();
    else if ("function" == typeof define && define.amd) { JSZip = e();
        define([], e) } else { var r; "undefined" != typeof window ? r = window : "undefined" != typeof global ? r = global : "undefined" != typeof $ && $.global ? r = $.global : "undefined" != typeof self && (r = self), r.JSZip = e() } })(function() {
    var e, r, t;
    return function a(e, r, t) {
        function n(s, o) { if (!r[s]) { if (!e[s]) { var f = typeof require == "function" && require; if (!o && f) return f(s, !0); if (i) return i(s, !0); throw new Error("Cannot find module '" + s + "'") } var l = r[s] = { exports: {} };
                e[s][0].call(l.exports, function(r) { var t = e[s][1][r]; return n(t ? t : r) }, l, l.exports, a, e, r, t) } return r[s].exports } var i = typeof require == "function" && require; for (var s = 0; s < t.length; s++) n(t[s]); return n }({
        1: [function(e, r, t) { "use strict"; var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            t.encode = function(e, r) { var t = ""; var n, i, s, o, f, l, c; var u = 0; while (u < e.length) { n = e.charCodeAt(u++);
                    i = e.charCodeAt(u++);
                    s = e.charCodeAt(u++);
                    o = n >> 2;
                    f = (n & 3) << 4 | i >> 4;
                    l = (i & 15) << 2 | s >> 6;
                    c = s & 63; if (isNaN(i)) { l = c = 64 } else if (isNaN(s)) { c = 64 } t = t + a.charAt(o) + a.charAt(f) + a.charAt(l) + a.charAt(c) } return t };
            t.decode = function(e, r) { var t = ""; var n, i, s; var o, f, l, c; var u = 0;
                e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (u < e.length) { o = a.indexOf(e.charAt(u++));
                    f = a.indexOf(e.charAt(u++));
                    l = a.indexOf(e.charAt(u++));
                    c = a.indexOf(e.charAt(u++));
                    n = o << 2 | f >> 4;
                    i = (f & 15) << 4 | l >> 2;
                    s = (l & 3) << 6 | c;
                    t = t + String.fromCharCode(n); if (l != 64) { t = t + String.fromCharCode(i) } if (c != 64) { t = t + String.fromCharCode(s) } } return t } }, {}],
        2: [function(e, r, t) { "use strict";

            function a() { this.compressedSize = 0;
                this.uncompressedSize = 0;
                this.crc32 = 0;
                this.compressionMethod = null;
                this.compressedContent = null } a.prototype = { getContent: function() { return null }, getCompressedContent: function() { return null } };
            r.exports = a }, {}],
        3: [function(e, r, t) { "use strict";
            t.STORE = { magic: "\0\0", compress: function(e) { return e }, uncompress: function(e) { return e }, compressInputType: null, uncompressInputType: null };
            t.DEFLATE = e("./flate") }, { "./flate": 8 }],
        4: [function(e, r, t) { "use strict"; var a = e("./utils"); var n = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117];
            r.exports = function i(e, r) { if (typeof e === "undefined" || !e.length) { return 0 } var t = a.getTypeOf(e) !== "string"; if (typeof r == "undefined") { r = 0 } var i = 0; var s = 0; var o = 0;
                r = r ^ -1; for (var f = 0, l = e.length; f < l; f++) { o = t ? e[f] : e.charCodeAt(f);
                    s = (r ^ o) & 255;
                    i = n[s];
                    r = r >>> 8 ^ i } return r ^ -1 } }, { "./utils": 21 }],
        5: [function(e, r, t) { "use strict"; var a = e("./utils");

            function n(e) { this.data = null;
                this.length = 0;
                this.index = 0 } n.prototype = { checkOffset: function(e) { this.checkIndex(this.index + e) }, checkIndex: function(e) { if (this.length < e || e < 0) { throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e + "). Corrupted zip ?") } }, setIndex: function(e) { this.checkIndex(e);
                    this.index = e }, skip: function(e) { this.setIndex(this.index + e) }, byteAt: function(e) {}, readInt: function(e) { var r = 0,
                        t;
                    this.checkOffset(e); for (t = this.index + e - 1; t >= this.index; t--) { r = (r << 8) + this.byteAt(t) } this.index += e; return r }, readString: function(e) { return a.transformTo("string", this.readData(e)) }, readData: function(e) {}, lastIndexOfSignature: function(e) {}, readDate: function() { var e = this.readInt(4); return new Date((e >> 25 & 127) + 1980, (e >> 21 & 15) - 1, e >> 16 & 31, e >> 11 & 31, e >> 5 & 63, (e & 31) << 1) } };
            r.exports = n }, { "./utils": 21 }],
        6: [function(e, r, t) { "use strict";
            t.base64 = false;
            t.binary = false;
            t.dir = false;
            t.createFolders = false;
            t.date = null;
            t.compression = null;
            t.comment = null }, {}],
        7: [function(e, r, t) { "use strict"; var a = e("./utils");
            t.string2binary = function(e) { return a.string2binary(e) };
            t.string2Uint8Array = function(e) { return a.transformTo("uint8array", e) };
            t.uint8Array2String = function(e) { return a.transformTo("string", e) };
            t.string2Blob = function(e) { var r = a.transformTo("arraybuffer", e); return a.arrayBuffer2Blob(r) };
            t.arrayBuffer2Blob = function(e) { return a.arrayBuffer2Blob(e) };
            t.transformTo = function(e, r) { return a.transformTo(e, r) };
            t.getTypeOf = function(e) { return a.getTypeOf(e) };
            t.checkSupport = function(e) { return a.checkSupport(e) };
            t.MAX_VALUE_16BITS = a.MAX_VALUE_16BITS;
            t.MAX_VALUE_32BITS = a.MAX_VALUE_32BITS;
            t.pretty = function(e) { return a.pretty(e) };
            t.findCompression = function(e) { return a.findCompression(e) };
            t.isRegExp = function(e) { return a.isRegExp(e) } }, { "./utils": 21 }],
        8: [function(e, r, t) { "use strict"; var a = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Uint32Array !== "undefined"; var n = e("pako");
            t.uncompressInputType = a ? "uint8array" : "array";
            t.compressInputType = a ? "uint8array" : "array";
            t.magic = "\b\0";
            t.compress = function(e) { return n.deflateRaw(e) };
            t.uncompress = function(e) { return n.inflateRaw(e) } }, { pako: 24 }],
        9: [function(e, r, t) { "use strict"; var a = e("./base64");

            function n(e, r) { if (!(this instanceof n)) return new n(e, r);
                this.files = {};
                this.comment = null;
                this.root = ""; if (e) { this.load(e, r) } this.clone = function() { var e = new n; for (var r in this) { if (typeof this[r] !== "function") { e[r] = this[r] } } return e } } n.prototype = e("./object");
            n.prototype.load = e("./load");
            n.support = e("./support");
            n.defaults = e("./defaults");
            n.utils = e("./deprecatedPublicUtils");
            n.base64 = { encode: function(e) { return a.encode(e) }, decode: function(e) { return a.decode(e) } };
            n.compressions = e("./compressions");
            r.exports = n }, { "./base64": 1, "./compressions": 3, "./defaults": 6, "./deprecatedPublicUtils": 7, "./load": 10, "./object": 13, "./support": 17 }],
        10: [function(e, r, t) { "use strict"; var a = e("./base64"); var n = e("./zipEntries");
            r.exports = function(e, r) { var t, i, s, o;
                r = r || {}; if (r.base64) { e = a.decode(e) } i = new n(e, r);
                t = i.files; for (s = 0; s < t.length; s++) { o = t[s];
                    this.file(o.fileName, o.decompressed, { binary: true, optimizedBinaryString: true, date: o.date, dir: o.dir, comment: o.fileComment.length ? o.fileComment : null, createFolders: r.createFolders }) } if (i.zipComment.length) { this.comment = i.zipComment } return this } }, { "./base64": 1, "./zipEntries": 22 }],
        11: [function(e, r, t) {
            (function(e) { "use strict";
                r.exports = function(r, t) { return new e(r, t) };
                r.exports.test = function(r) { return e.isBuffer(r) } }).call(this, typeof Buffer !== "undefined" ? Buffer : undefined) }, {}],
        12: [function(e, r, t) { "use strict"; var a = e("./uint8ArrayReader");

            function n(e) { this.data = e;
                this.length = this.data.length;
                this.index = 0 } n.prototype = new a;
            n.prototype.readData = function(e) { this.checkOffset(e); var r = this.data.slice(this.index, this.index + e);
                this.index += e; return r };
            r.exports = n }, { "./uint8ArrayReader": 18 }],
        13: [function(e, r, t) { "use strict"; var a = e("./support"); var n = e("./utils"); var i = e("./crc32"); var s = e("./signature"); var o = e("./defaults"); var f = e("./base64"); var l = e("./compressions"); var c = e("./compressedObject"); var u = e("./nodeBuffer"); var h = e("./utf8"); var d = e("./stringWriter"); var v = e("./uint8ArrayWriter"); var p = function(e) { if (e._data instanceof c) { e._data = e._data.getContent();
                    e.options.binary = true;
                    e.options.base64 = false; if (n.getTypeOf(e._data) === "uint8array") { var r = e._data;
                        e._data = new Uint8Array(r.length); if (r.length !== 0) { e._data.set(r, 0) } } } return e._data }; var b = function(e) { var r = p(e),
                    t = n.getTypeOf(r); if (t === "string") { if (!e.options.binary) { if (a.nodebuffer) { return u(r, "utf-8") } } return e.asBinary() } return r }; var m = function(e) { var r = p(this); if (r === null || typeof r === "undefined") { return "" } if (this.options.base64) { r = f.decode(r) } if (e && this.options.binary) { r = x.utf8decode(r) } else { r = n.transformTo("string", r) } if (!e && !this.options.binary) { r = n.transformTo("string", x.utf8encode(r)) } return r }; var g = function(e, r, t) { this.name = e;
                this.dir = t.dir;
                this.date = t.date;
                this.comment = t.comment;
                this._data = r;
                this.options = t;
                this._initialMetadata = { dir: t.dir, date: t.date } };
            g.prototype = { asText: function() { return m.call(this, true) }, asBinary: function() { return m.call(this, false) }, asNodeBuffer: function() { var e = b(this); return n.transformTo("nodebuffer", e) }, asUint8Array: function() { var e = b(this); return n.transformTo("uint8array", e) }, asArrayBuffer: function() { return this.asUint8Array().buffer } }; var E = function(e, r) { var t = "",
                    a; for (a = 0; a < r; a++) { t += String.fromCharCode(e & 255);
                    e = e >>> 8 } return t }; var k = function() { var e = {},
                    r, t; for (r = 0; r < arguments.length; r++) { for (t in arguments[r]) { if (arguments[r].hasOwnProperty(t) && typeof e[t] === "undefined") { e[t] = arguments[r][t] } } } return e }; var w = function(e) { e = e || {}; if (e.base64 === true && (e.binary === null || e.binary === undefined)) { e.binary = true } e = k(e, o);
                e.date = e.date || new Date; if (e.compression !== null) e.compression = e.compression.toUpperCase(); return e }; var S = function(e, r, t) { var a = n.getTypeOf(r),
                    i;
                t = w(t); if (t.createFolders && (i = _(e))) { C.call(this, i, true) } if (t.dir || r === null || typeof r === "undefined") { t.base64 = false;
                    t.binary = false;
                    r = null } else if (a === "string") { if (t.binary && !t.base64) { if (t.optimizedBinaryString !== true) { r = n.string2binary(r) } } } else { t.base64 = false;
                    t.binary = true; if (!a && !(r instanceof c)) { throw new Error("The data of '" + e + "' is in an unsupported format !") } if (a === "arraybuffer") { r = n.transformTo("uint8array", r) } } var s = new g(e, r, t);
                this.files[e] = s; return s }; var _ = function(e) { if (e.slice(-1) == "/") { e = e.substring(0, e.length - 1) } var r = e.lastIndexOf("/"); return r > 0 ? e.substring(0, r) : "" }; var C = function(e, r) { if (e.slice(-1) != "/") { e += "/" } r = typeof r !== "undefined" ? r : false; if (!this.files[e]) { S.call(this, e, null, { dir: true, createFolders: r }) } return this.files[e] }; var B = function(e, r) { var t = new c,
                    a; if (e._data instanceof c) { t.uncompressedSize = e._data.uncompressedSize;
                    t.crc32 = e._data.crc32; if (t.uncompressedSize === 0 || e.dir) { r = l["STORE"];
                        t.compressedContent = "";
                        t.crc32 = 0 } else if (e._data.compressionMethod === r.magic) { t.compressedContent = e._data.getCompressedContent() } else { a = e._data.getContent();
                        t.compressedContent = r.compress(n.transformTo(r.compressInputType, a)) } } else { a = b(e); if (!a || a.length === 0 || e.dir) { r = l["STORE"];
                        a = "" } t.uncompressedSize = a.length;
                    t.crc32 = i(a);
                    t.compressedContent = r.compress(n.transformTo(r.compressInputType, a)) } t.compressedSize = t.compressedContent.length;
                t.compressionMethod = r.magic; return t }; var T = function(e, r, t, a) { var o = t.compressedContent,
                    f = n.transformTo("string", h.utf8encode(r.name)),
                    l = r.comment || "",
                    c = n.transformTo("string", h.utf8encode(l)),
                    u = f.length !== r.name.length,
                    d = c.length !== l.length,
                    v = r.options,
                    p, b, m = "",
                    g = "",
                    k = "",
                    w, S; if (r._initialMetadata.dir !== r.dir) { w = r.dir } else { w = v.dir } if (r._initialMetadata.date !== r.date) { S = r.date } else { S = v.date } p = S.getHours();
                p = p << 6;
                p = p | S.getMinutes();
                p = p << 5;
                p = p | S.getSeconds() / 2;
                b = S.getFullYear() - 1980;
                b = b << 4;
                b = b | S.getMonth() + 1;
                b = b << 5;
                b = b | S.getDate(); if (u) { g = E(1, 1) + E(i(f), 4) + f;
                    m += "up" + E(g.length, 2) + g } if (d) { k = E(1, 1) + E(this.crc32(c), 4) + c;
                    m += "uc" + E(k.length, 2) + k } var _ = "";
                _ += "\n\0";
                _ += u || d ? "\0\b" : "\0\0";
                _ += t.compressionMethod;
                _ += E(p, 2);
                _ += E(b, 2);
                _ += E(t.crc32, 4);
                _ += E(t.compressedSize, 4);
                _ += E(t.uncompressedSize, 4);
                _ += E(f.length, 2);
                _ += E(m.length, 2); var C = s.LOCAL_FILE_HEADER + _ + f + m; var B = s.CENTRAL_FILE_HEADER + "\0" + _ + E(c.length, 2) + "\0\0" + "\0\0" + (w === true ? "\0\0\0" : "\0\0\0\0") + E(a, 4) + f + m + c; return { fileRecord: C, dirRecord: B, compressedObject: t } }; var x = { load: function(e, r) { throw new Error("Load method is not defined. Is the file jszip-load.js included ?") }, filter: function(e) { var r = [],
                        t, a, n, i; for (t in this.files) { if (!this.files.hasOwnProperty(t)) { continue } n = this.files[t];
                        i = new g(n.name, n._data, k(n.options));
                        a = t.slice(this.root.length, t.length); if (t.slice(0, this.root.length) === this.root && e(a, i)) { r.push(i) } } return r }, file: function(e, r, t) { if (arguments.length === 1) { if (n.isRegExp(e)) { var a = e; return this.filter(function(e, r) { return !r.dir && a.test(e) }) } else { return this.filter(function(r, t) { return !t.dir && r === e })[0] || null } } else { e = this.root + e;
                        S.call(this, e, r, t) } return this }, folder: function(e) { if (!e) { return this } if (n.isRegExp(e)) { return this.filter(function(r, t) { return t.dir && e.test(r) }) } var r = this.root + e; var t = C.call(this, r); var a = this.clone();
                    a.root = t.name; return a }, remove: function(e) { e = this.root + e; var r = this.files[e]; if (!r) { if (e.slice(-1) != "/") { e += "/" } r = this.files[e] } if (r && !r.dir) { delete this.files[e] } else { var t = this.filter(function(r, t) { return t.name.slice(0, e.length) === e }); for (var a = 0; a < t.length; a++) { delete this.files[t[a].name] } } return this }, generate: function(e) { e = k(e || {}, { base64: true, compression: "STORE", type: "base64", comment: null });
                    n.checkSupport(e.type); var r = [],
                        t = 0,
                        a = 0,
                        i, o, c = n.transformTo("string", this.utf8encode(e.comment || this.comment || "")); for (var u in this.files) { if (!this.files.hasOwnProperty(u)) { continue } var h = this.files[u]; var p = h.options.compression || e.compression.toUpperCase(); var b = l[p]; if (!b) { throw new Error(p + " is not a valid compression method !") } var m = B.call(this, h, b); var g = T.call(this, u, h, m, t);
                        t += g.fileRecord.length + m.compressedSize;
                        a += g.dirRecord.length;
                        r.push(g) } var w = "";
                    w = s.CENTRAL_DIRECTORY_END + "\0\0" + "\0\0" + E(r.length, 2) + E(r.length, 2) + E(a, 4) + E(t, 4) + E(c.length, 2) + c; var S = e.type.toLowerCase(); if (S === "uint8array" || S === "arraybuffer" || S === "blob" || S === "nodebuffer") { i = new v(t + a + w.length) } else { i = new d(t + a + w.length) } for (o = 0; o < r.length; o++) { i.append(r[o].fileRecord);
                        i.append(r[o].compressedObject.compressedContent) } for (o = 0; o < r.length; o++) { i.append(r[o].dirRecord) } i.append(w); var _ = i.finalize(); switch (e.type.toLowerCase()) {
                        case "uint8array":
                            ;
                        case "arraybuffer":
                            ;
                        case "nodebuffer":
                            return n.transformTo(e.type.toLowerCase(), _);
                        case "blob":
                            return n.arrayBuffer2Blob(n.transformTo("arraybuffer", _));
                        case "base64":
                            return e.base64 ? f.encode(_) : _;
                        default:
                            return _; } }, crc32: function(e, r) { return i(e, r) }, utf8encode: function(e) { return n.transformTo("string", h.utf8encode(e)) }, utf8decode: function(e) { return h.utf8decode(e) } };
            r.exports = x }, { "./base64": 1, "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./defaults": 6, "./nodeBuffer": 11, "./signature": 14, "./stringWriter": 16, "./support": 17, "./uint8ArrayWriter": 19, "./utf8": 20, "./utils": 21 }],
        14: [function(e, r, t) { "use strict";
            t.LOCAL_FILE_HEADER = "PK";
            t.CENTRAL_FILE_HEADER = "PK";
            t.CENTRAL_DIRECTORY_END = "PK";
            t.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK";
            t.ZIP64_CENTRAL_DIRECTORY_END = "PK";
            t.DATA_DESCRIPTOR = "PK\b" }, {}],
        15: [function(e, r, t) { "use strict"; var a = e("./dataReader"); var n = e("./utils");

            function i(e, r) { this.data = e; if (!r) { this.data = n.string2binary(this.data) } this.length = this.data.length;
                this.index = 0 } i.prototype = new a;
            i.prototype.byteAt = function(e) { return this.data.charCodeAt(e) };
            i.prototype.lastIndexOfSignature = function(e) { return this.data.lastIndexOf(e) };
            i.prototype.readData = function(e) { this.checkOffset(e); var r = this.data.slice(this.index, this.index + e);
                this.index += e; return r };
            r.exports = i }, { "./dataReader": 5, "./utils": 21 }],
        16: [function(e, r, t) { "use strict"; var a = e("./utils"); var n = function() { this.data = [] };
            n.prototype = { append: function(e) { e = a.transformTo("string", e);
                    this.data.push(e) }, finalize: function() { return this.data.join("") } };
            r.exports = n }, { "./utils": 21 }],
        17: [function(e, r, t) {
            (function(e) { "use strict";
                t.base64 = true;
                t.array = true;
                t.string = true;
                t.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
                t.nodebuffer = typeof e !== "undefined";
                t.uint8array = typeof Uint8Array !== "undefined"; if (typeof ArrayBuffer === "undefined") { t.blob = false } else { var r = new ArrayBuffer(0); try { t.blob = new Blob([r], { type: "application/zip" }).size === 0 } catch (a) { try { var n = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder; var i = new n;
                            i.append(r);
                            t.blob = i.getBlob("application/zip").size === 0 } catch (a) { t.blob = false } } } }).call(this, typeof Buffer !== "undefined" ? Buffer : undefined) }, {}],
        18: [function(e, r, t) { "use strict"; var a = e("./dataReader");

            function n(e) { if (e) { this.data = e;
                    this.length = this.data.length;
                    this.index = 0 } } n.prototype = new a;
            n.prototype.byteAt = function(e) { return this.data[e] };
            n.prototype.lastIndexOfSignature = function(e) { var r = e.charCodeAt(0),
                    t = e.charCodeAt(1),
                    a = e.charCodeAt(2),
                    n = e.charCodeAt(3); for (var i = this.length - 4; i >= 0; --i) { if (this.data[i] === r && this.data[i + 1] === t && this.data[i + 2] === a && this.data[i + 3] === n) { return i } } return -1 };
            n.prototype.readData = function(e) { this.checkOffset(e); if (e === 0) { return new Uint8Array(0) } var r = this.data.subarray(this.index, this.index + e);
                this.index += e; return r };
            r.exports = n }, { "./dataReader": 5 }],
        19: [function(e, r, t) { "use strict"; var a = e("./utils"); var n = function(e) { this.data = new Uint8Array(e);
                this.index = 0 };
            n.prototype = { append: function(e) { if (e.length !== 0) { e = a.transformTo("uint8array", e);
                        this.data.set(e, this.index);
                        this.index += e.length } }, finalize: function() { return this.data } };
            r.exports = n }, { "./utils": 21 }],
        20: [function(e, r, t) { "use strict"; var a = e("./utils"); var n = e("./support"); var i = e("./nodeBuffer"); var s = new Array(256); for (var o = 0; o < 256; o++) { s[o] = o >= 252 ? 6 : o >= 248 ? 5 : o >= 240 ? 4 : o >= 224 ? 3 : o >= 192 ? 2 : 1 } s[254] = s[254] = 1; var f = function(e) { var r, t, a, i, s, o = e.length,
                    f = 0; for (i = 0; i < o; i++) { t = e.charCodeAt(i); if ((t & 64512) === 55296 && i + 1 < o) { a = e.charCodeAt(i + 1); if ((a & 64512) === 56320) { t = 65536 + (t - 55296 << 10) + (a - 56320);
                            i++ } } f += t < 128 ? 1 : t < 2048 ? 2 : t < 65536 ? 3 : 4 } if (n.uint8array) { r = new Uint8Array(f) } else { r = new Array(f) } for (s = 0, i = 0; s < f; i++) { t = e.charCodeAt(i); if ((t & 64512) === 55296 && i + 1 < o) { a = e.charCodeAt(i + 1); if ((a & 64512) === 56320) { t = 65536 + (t - 55296 << 10) + (a - 56320);
                            i++ } } if (t < 128) { r[s++] = t } else if (t < 2048) { r[s++] = 192 | t >>> 6;
                        r[s++] = 128 | t & 63 } else if (t < 65536) { r[s++] = 224 | t >>> 12;
                        r[s++] = 128 | t >>> 6 & 63;
                        r[s++] = 128 | t & 63 } else { r[s++] = 240 | t >>> 18;
                        r[s++] = 128 | t >>> 12 & 63;
                        r[s++] = 128 | t >>> 6 & 63;
                        r[s++] = 128 | t & 63 } } return r }; var l = function(e, r) { var t;
                r = r || e.length; if (r > e.length) { r = e.length } t = r - 1; while (t >= 0 && (e[t] & 192) === 128) { t-- } if (t < 0) { return r } if (t === 0) { return r } return t + s[e[t]] > r ? t : r }; var c = function(e) { var r, t, n, i, o; var f = e.length; var l = new Array(f * 2); for (n = 0, t = 0; t < f;) { i = e[t++]; if (i < 128) { l[n++] = i; continue } o = s[i]; if (o > 4) { l[n++] = 65533;
                        t += o - 1; continue } i &= o === 2 ? 31 : o === 3 ? 15 : 7; while (o > 1 && t < f) { i = i << 6 | e[t++] & 63;
                        o-- } if (o > 1) { l[n++] = 65533; continue } if (i < 65536) { l[n++] = i } else { i -= 65536;
                        l[n++] = 55296 | i >> 10 & 1023;
                        l[n++] = 56320 | i & 1023 } } if (l.length !== n) { if (l.subarray) { l = l.subarray(0, n) } else { l.length = n } } return a.applyFromCharCode(l) };
            t.utf8encode = function u(e) { if (n.nodebuffer) { return i(e, "utf-8") } return f(e) };
            t.utf8decode = function h(e) { if (n.nodebuffer) { return a.transformTo("nodebuffer", e).toString("utf-8") } e = a.transformTo(n.uint8array ? "uint8array" : "array", e); var r = [],
                    t = 0,
                    i = e.length,
                    s = 65536; while (t < i) { var o = l(e, Math.min(t + s, i)); if (n.uint8array) { r.push(c(e.subarray(t, o))) } else { r.push(c(e.slice(t, o))) } t = o } return r.join("") } }, { "./nodeBuffer": 11, "./support": 17, "./utils": 21 }],
        21: [function(e, r, t) { "use strict"; var a = e("./support"); var n = e("./compressions"); var i = e("./nodeBuffer");
            t.string2binary = function(e) { var r = ""; for (var t = 0; t < e.length; t++) { r += String.fromCharCode(e.charCodeAt(t) & 255) } return r };
            t.arrayBuffer2Blob = function(e) { t.checkSupport("blob"); try { return new Blob([e], { type: "application/zip" }) } catch (r) { try { var a = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder; var n = new a;
                        n.append(e); return n.getBlob("application/zip") } catch (r) { throw new Error("Bug : can't construct the Blob.") } } };

            function s(e) { return e }

            function o(e, r) { for (var t = 0; t < e.length; ++t) { r[t] = e.charCodeAt(t) & 255 } return r }

            function f(e) { var r = 65536; var a = [],
                    n = e.length,
                    s = t.getTypeOf(e),
                    o = 0,
                    f = true; try { switch (s) {
                        case "uint8array":
                            String.fromCharCode.apply(null, new Uint8Array(0)); break;
                        case "nodebuffer":
                            String.fromCharCode.apply(null, i(0)); break; } } catch (l) { f = false } if (!f) { var c = ""; for (var u = 0; u < e.length; u++) { c += String.fromCharCode(e[u]) } return c } while (o < n && r > 1) { try { if (s === "array" || s === "nodebuffer") { a.push(String.fromCharCode.apply(null, e.slice(o, Math.min(o + r, n)))) } else { a.push(String.fromCharCode.apply(null, e.subarray(o, Math.min(o + r, n)))) } o += r } catch (l) { r = Math.floor(r / 2) } } return a.join("") } t.applyFromCharCode = f;

            function l(e, r) { for (var t = 0; t < e.length; t++) { r[t] = e[t] } return r } var c = {};
            c["string"] = { string: s, array: function(e) { return o(e, new Array(e.length)) }, arraybuffer: function(e) { return c["string"]["uint8array"](e).buffer }, uint8array: function(e) { return o(e, new Uint8Array(e.length)) }, nodebuffer: function(e) { return o(e, i(e.length)) } };
            c["array"] = { string: f, array: s, arraybuffer: function(e) { return new Uint8Array(e).buffer }, uint8array: function(e) { return new Uint8Array(e) }, nodebuffer: function(e) { return i(e) } };
            c["arraybuffer"] = { string: function(e) { return f(new Uint8Array(e)) }, array: function(e) { return l(new Uint8Array(e), new Array(e.byteLength)) }, arraybuffer: s, uint8array: function(e) { return new Uint8Array(e) }, nodebuffer: function(e) { return i(new Uint8Array(e)) } };
            c["uint8array"] = { string: f, array: function(e) { return l(e, new Array(e.length)) }, arraybuffer: function(e) { return e.buffer }, uint8array: s, nodebuffer: function(e) { return i(e) } };
            c["nodebuffer"] = { string: f, array: function(e) { return l(e, new Array(e.length)) }, arraybuffer: function(e) { return c["nodebuffer"]["uint8array"](e).buffer }, uint8array: function(e) { return l(e, new Uint8Array(e.length)) }, nodebuffer: s };
            t.transformTo = function(e, r) { if (!r) { r = "" } if (!e) { return r } t.checkSupport(e); var a = t.getTypeOf(r); var n = c[a][e](r); return n };
            t.getTypeOf = function(e) { if (typeof e === "string") { return "string" } if (Object.prototype.toString.call(e) === "[object Array]") { return "array" } if (a.nodebuffer && i.test(e)) { return "nodebuffer" } if (a.uint8array && e instanceof Uint8Array) { return "uint8array" } if (a.arraybuffer && e instanceof ArrayBuffer) { return "arraybuffer" } };
            t.checkSupport = function(e) { var r = a[e.toLowerCase()]; if (!r) { throw new Error(e + " is not supported by this browser") } };
            t.MAX_VALUE_16BITS = 65535;
            t.MAX_VALUE_32BITS = -1;
            t.pretty = function(e) { var r = "",
                    t, a; for (a = 0; a < (e || "").length; a++) { t = e.charCodeAt(a);
                    r += "\\x" + (t < 16 ? "0" : "") + t.toString(16).toUpperCase() } return r };
            t.findCompression = function(e) { for (var r in n) { if (!n.hasOwnProperty(r)) { continue } if (n[r].magic === e) { return n[r] } } return null };
            t.isRegExp = function(e) { return Object.prototype.toString.call(e) === "[object RegExp]" } }, { "./compressions": 3, "./nodeBuffer": 11, "./support": 17 }],
        22: [function(e, r, t) { "use strict"; var a = e("./stringReader"); var n = e("./nodeBufferReader"); var i = e("./uint8ArrayReader"); var s = e("./utils"); var o = e("./signature"); var f = e("./zipEntry"); var l = e("./support"); var c = e("./object");

            function u(e, r) { this.files = [];
                this.loadOptions = r; if (e) { this.load(e) } } u.prototype = { checkSignature: function(e) { var r = this.reader.readString(4); if (r !== e) { throw new Error("Corrupted zip or bug : unexpected signature " + "(" + s.pretty(r) + ", expected " + s.pretty(e) + ")") } }, readBlockEndOfCentral: function() { this.diskNumber = this.reader.readInt(2);
                    this.diskWithCentralDirStart = this.reader.readInt(2);
                    this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
                    this.centralDirRecords = this.reader.readInt(2);
                    this.centralDirSize = this.reader.readInt(4);
                    this.centralDirOffset = this.reader.readInt(4);
                    this.zipCommentLength = this.reader.readInt(2);
                    this.zipComment = this.reader.readString(this.zipCommentLength);
                    this.zipComment = c.utf8decode(this.zipComment) }, readBlockZip64EndOfCentral: function() { this.zip64EndOfCentralSize = this.reader.readInt(8);
                    this.versionMadeBy = this.reader.readString(2);
                    this.versionNeeded = this.reader.readInt(2);
                    this.diskNumber = this.reader.readInt(4);
                    this.diskWithCentralDirStart = this.reader.readInt(4);
                    this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
                    this.centralDirRecords = this.reader.readInt(8);
                    this.centralDirSize = this.reader.readInt(8);
                    this.centralDirOffset = this.reader.readInt(8);
                    this.zip64ExtensibleData = {}; var e = this.zip64EndOfCentralSize - 44,
                        r = 0,
                        t, a, n; while (r < e) { t = this.reader.readInt(2);
                        a = this.reader.readInt(4);
                        n = this.reader.readString(a);
                        this.zip64ExtensibleData[t] = { id: t, length: a, value: n } } }, readBlockZip64EndOfCentralLocator: function() { this.diskWithZip64CentralDirStart = this.reader.readInt(4);
                    this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
                    this.disksCount = this.reader.readInt(4); if (this.disksCount > 1) { throw new Error("Multi-volumes zip are not supported") } }, readLocalFiles: function() { var e, r; for (e = 0; e < this.files.length; e++) { r = this.files[e];
                        this.reader.setIndex(r.localHeaderOffset);
                        this.checkSignature(o.LOCAL_FILE_HEADER);
                        r.readLocalPart(this.reader);
                        r.handleUTF8() } }, readCentralDir: function() { var e;
                    this.reader.setIndex(this.centralDirOffset); while (this.reader.readString(4) === o.CENTRAL_FILE_HEADER) { e = new f({ zip64: this.zip64 }, this.loadOptions);
                        e.readCentralPart(this.reader);
                        this.files.push(e) } }, readEndOfCentral: function() { var e = this.reader.lastIndexOfSignature(o.CENTRAL_DIRECTORY_END); if (e === -1) { throw new Error("Corrupted zip : can't find end of central directory") } this.reader.setIndex(e);
                    this.checkSignature(o.CENTRAL_DIRECTORY_END);
                    this.readBlockEndOfCentral(); if (this.diskNumber === s.MAX_VALUE_16BITS || this.diskWithCentralDirStart === s.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === s.MAX_VALUE_16BITS || this.centralDirRecords === s.MAX_VALUE_16BITS || this.centralDirSize === s.MAX_VALUE_32BITS || this.centralDirOffset === s.MAX_VALUE_32BITS) { this.zip64 = true;
                        e = this.reader.lastIndexOfSignature(o.ZIP64_CENTRAL_DIRECTORY_LOCATOR); if (e === -1) { throw new Error("Corrupted zip : can't find the ZIP64 end of central directory locator") } this.reader.setIndex(e);
                        this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
                        this.readBlockZip64EndOfCentralLocator();
                        this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
                        this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_END);
                        this.readBlockZip64EndOfCentral() } }, prepareReader: function(e) { var r = s.getTypeOf(e); if (r === "string" && !l.uint8array) { this.reader = new a(e, this.loadOptions.optimizedBinaryString) } else if (r === "nodebuffer") { this.reader = new n(e) } else { this.reader = new i(s.transformTo("uint8array", e)) } }, load: function(e) { this.prepareReader(e);
                    this.readEndOfCentral();
                    this.readCentralDir();
                    this.readLocalFiles() } };
            r.exports = u }, { "./nodeBufferReader": 12, "./object": 13, "./signature": 14, "./stringReader": 15, "./support": 17, "./uint8ArrayReader": 18, "./utils": 21, "./zipEntry": 23 }],
        23: [function(e, r, t) {
            "use strict";
            var a = e("./stringReader");
            var n = e("./utils");
            var i = e("./compressedObject");
            var s = e("./object");

            function o(e, r) { this.options = e;
                this.loadOptions = r } o.prototype = {
                isEncrypted: function() { return (this.bitFlag & 1) === 1 },
                useUTF8: function() { return (this.bitFlag & 2048) === 2048 },
                prepareCompressedContent: function(e, r, t) { return function() { var a = e.index;
                        e.setIndex(r); var n = e.readData(t);
                        e.setIndex(a); return n } },
                prepareContent: function(e, r, t, a, i) { return function() { var e = n.transformTo(a.uncompressInputType, this.getCompressedContent()); var r = a.uncompress(e); if (r.length !== i) { throw new Error("Bug : uncompressed data size mismatch") } return r } },
                readLocalPart: function(e) { var r, t;
                    e.skip(22);
                    this.fileNameLength = e.readInt(2);
                    t = e.readInt(2);
                    this.fileName = e.readString(this.fileNameLength);
                    e.skip(t); if (this.compressedSize == -1 || this.uncompressedSize == -1) { throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory " + "(compressedSize == -1 || uncompressedSize == -1)") } r = n.findCompression(this.compressionMethod); if (r === null) { throw new Error("Corrupted zip : compression " + n.pretty(this.compressionMethod) + " unknown (inner file : " + this.fileName + ")") } this.decompressed = new i;
                    this.decompressed.compressedSize = this.compressedSize;
                    this.decompressed.uncompressedSize = this.uncompressedSize;
                    this.decompressed.crc32 = this.crc32;
                    this.decompressed.compressionMethod = this.compressionMethod;
                    this.decompressed.getCompressedContent = this.prepareCompressedContent(e, e.index, this.compressedSize, r);
                    this.decompressed.getContent = this.prepareContent(e, e.index, this.compressedSize, r, this.uncompressedSize); if (this.loadOptions.checkCRC32) { this.decompressed = n.transformTo("string", this.decompressed.getContent()); if (s.crc32(this.decompressed) !== this.crc32) { throw new Error("Corrupted zip : CRC32 mismatch") } } },
                readCentralPart: function(e) { this.versionMadeBy = e.readString(2);
                    this.versionNeeded = e.readInt(2);
                    this.bitFlag = e.readInt(2);
                    this.compressionMethod = e.readString(2);
                    this.date = e.readDate();
                    this.crc32 = e.readInt(4);
                    this.compressedSize = e.readInt(4);
                    this.uncompressedSize = e.readInt(4);
                    this.fileNameLength = e.readInt(2);
                    this.extraFieldsLength = e.readInt(2);
                    this.fileCommentLength = e.readInt(2);
                    this.diskNumberStart = e.readInt(2);
                    this.internalFileAttributes = e.readInt(2);
                    this.externalFileAttributes = e.readInt(4);
                    this.localHeaderOffset = e.readInt(4); if (this.isEncrypted()) { throw new Error("Encrypted zip are not supported") } this.fileName = e.readString(this.fileNameLength);
                    this.readExtraFields(e);
                    this.parseZIP64ExtraField(e);
                    this.fileComment = e.readString(this.fileCommentLength);
                    this.dir = this.externalFileAttributes & 16 ? true : false },
                parseZIP64ExtraField: function(e) { if (!this.extraFields[1]) { return } var r = new a(this.extraFields[1].value); if (this.uncompressedSize === n.MAX_VALUE_32BITS) { this.uncompressedSize = r.readInt(8) } if (this.compressedSize === n.MAX_VALUE_32BITS) { this.compressedSize = r.readInt(8) } if (this.localHeaderOffset === n.MAX_VALUE_32BITS) { this.localHeaderOffset = r.readInt(8) } if (this.diskNumberStart === n.MAX_VALUE_32BITS) { this.diskNumberStart = r.readInt(4) } },
                readExtraFields: function(e) { var r = e.index,
                        t, a, n;
                    this.extraFields = this.extraFields || {}; while (e.index < r + this.extraFieldsLength) { t = e.readInt(2);
                        a = e.readInt(2);
                        n = e.readString(a);
                        this.extraFields[t] = { id: t, length: a, value: n } } },
                handleUTF8: function() { if (this.useUTF8()) { this.fileName = s.utf8decode(this.fileName);
                        this.fileComment = s.utf8decode(this.fileComment) } else { var e = this.findExtraFieldUnicodePath(); if (e !== null) { this.fileName = e } var r = this.findExtraFieldUnicodeComment(); if (r !== null) { this.fileComment = r } } },
                findExtraFieldUnicodePath: function() { var e = this.extraFields[28789]; if (e) { var r = new a(e.value); if (r.readInt(1) !== 1) { return null } if (s.crc32(this.fileName) !== r.readInt(4)) { return null } return s.utf8decode(r.readString(e.length - 5)) } return null },
                findExtraFieldUnicodeComment: function() {
                    var e = this.extraFields[25461];
                    if (e) {
                        var r = new a(e.value);
                        if (r.readInt(1) !== 1) { return null }
                        if (s.crc32(this.fileComment) !== r.readInt(4)) { return null }
                        return s.utf8decode(r.readString(e.length - 5));
                    }
                    return null
                }
            };
            r.exports = o
        }, { "./compressedObject": 2, "./object": 13, "./stringReader": 15, "./utils": 21 }],
        24: [function(e, r, t) { "use strict"; var a = e("./lib/utils/common").assign; var n = e("./lib/deflate"); var i = e("./lib/inflate"); var s = e("./lib/zlib/constants"); var o = {};
            a(o, n, i, s);
            r.exports = o }, { "./lib/deflate": 25, "./lib/inflate": 26, "./lib/utils/common": 27, "./lib/zlib/constants": 30 }],
        25: [function(e, r, t) { "use strict"; var a = e("./zlib/deflate.js"); var n = e("./utils/common"); var i = e("./utils/strings"); var s = e("./zlib/messages"); var o = e("./zlib/zstream"); var f = 0; var l = 4; var c = 0; var u = 1; var h = -1; var d = 0; var v = 8; var p = function(e) { this.options = n.assign({ level: h, method: v, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: d, to: "" }, e || {}); var r = this.options; if (r.raw && r.windowBits > 0) { r.windowBits = -r.windowBits } else if (r.gzip && r.windowBits > 0 && r.windowBits < 16) { r.windowBits += 16 } this.err = 0;
                this.msg = "";
                this.ended = false;
                this.chunks = [];
                this.strm = new o;
                this.strm.avail_out = 0; var t = a.deflateInit2(this.strm, r.level, r.method, r.windowBits, r.memLevel, r.strategy); if (t !== c) { throw new Error(s[t]) } if (r.header) { a.deflateSetHeader(this.strm, r.header) } };
            p.prototype.push = function(e, r) { var t = this.strm; var s = this.options.chunkSize; var o, h; if (this.ended) { return false } h = r === ~~r ? r : r === true ? l : f; if (typeof e === "string") { t.input = i.string2buf(e) } else { t.input = e } t.next_in = 0;
                t.avail_in = t.input.length;
                do { if (t.avail_out === 0) { t.output = new n.Buf8(s);
                        t.next_out = 0;
                        t.avail_out = s } o = a.deflate(t, h); if (o !== u && o !== c) { this.onEnd(o);
                        this.ended = true; return false } if (t.avail_out === 0 || t.avail_in === 0 && h === l) { if (this.options.to === "string") { this.onData(i.buf2binstring(n.shrinkBuf(t.output, t.next_out))) } else { this.onData(n.shrinkBuf(t.output, t.next_out)) } } } while ((t.avail_in > 0 || t.avail_out === 0) && o !== u); if (h === l) { o = a.deflateEnd(this.strm);
                    this.onEnd(o);
                    this.ended = true; return o === c } return true };
            p.prototype.onData = function(e) { this.chunks.push(e) };
            p.prototype.onEnd = function(e) { if (e === c) { if (this.options.to === "string") { this.result = this.chunks.join("") } else { this.result = n.flattenChunks(this.chunks) } } this.chunks = [];
                this.err = e;
                this.msg = this.strm.msg };

            function b(e, r) { var t = new p(r);
                t.push(e, true); if (t.err) { throw t.msg } return t.result }

            function m(e, r) { r = r || {};
                r.raw = true; return b(e, r) }

            function g(e, r) { r = r || {};
                r.gzip = true; return b(e, r) } t.Deflate = p;
            t.deflate = b;
            t.deflateRaw = m;
            t.gzip = g }, { "./utils/common": 27, "./utils/strings": 28, "./zlib/deflate.js": 32, "./zlib/messages": 37, "./zlib/zstream": 39 }],
        26: [function(e, r, t) { "use strict"; var a = e("./zlib/inflate.js"); var n = e("./utils/common"); var i = e("./utils/strings"); var s = e("./zlib/constants"); var o = e("./zlib/messages"); var f = e("./zlib/zstream"); var l = e("./zlib/gzheader"); var c = function(e) { this.options = n.assign({ chunkSize: 16384, windowBits: 0, to: "" }, e || {}); var r = this.options; if (r.raw && r.windowBits >= 0 && r.windowBits < 16) { r.windowBits = -r.windowBits; if (r.windowBits === 0) { r.windowBits = -15 } } if (r.windowBits >= 0 && r.windowBits < 16 && !(e && e.windowBits)) { r.windowBits += 32 } if (r.windowBits > 15 && r.windowBits < 48) { if ((r.windowBits & 15) === 0) { r.windowBits |= 15 } } this.err = 0;
                this.msg = "";
                this.ended = false;
                this.chunks = [];
                this.strm = new f;
                this.strm.avail_out = 0; var t = a.inflateInit2(this.strm, r.windowBits); if (t !== s.Z_OK) { throw new Error(o[t]) } this.header = new l;
                a.inflateGetHeader(this.strm, this.header) };
            c.prototype.push = function(e, r) { var t = this.strm; var o = this.options.chunkSize; var f, l; var c, u, h; if (this.ended) { return false } l = r === ~~r ? r : r === true ? s.Z_FINISH : s.Z_NO_FLUSH; if (typeof e === "string") { t.input = i.binstring2buf(e) } else { t.input = e } t.next_in = 0;
                t.avail_in = t.input.length;
                do { if (t.avail_out === 0) { t.output = new n.Buf8(o);
                        t.next_out = 0;
                        t.avail_out = o } f = a.inflate(t, s.Z_NO_FLUSH); if (f !== s.Z_STREAM_END && f !== s.Z_OK) { this.onEnd(f);
                        this.ended = true; return false } if (t.next_out) { if (t.avail_out === 0 || f === s.Z_STREAM_END || t.avail_in === 0 && l === s.Z_FINISH) { if (this.options.to === "string") { c = i.utf8border(t.output, t.next_out);
                                u = t.next_out - c;
                                h = i.buf2string(t.output, c);
                                t.next_out = u;
                                t.avail_out = o - u; if (u) { n.arraySet(t.output, t.output, c, u, 0) } this.onData(h) } else { this.onData(n.shrinkBuf(t.output, t.next_out)) } } } } while (t.avail_in > 0 && f !== s.Z_STREAM_END); if (f === s.Z_STREAM_END) { l = s.Z_FINISH } if (l === s.Z_FINISH) { f = a.inflateEnd(this.strm);
                    this.onEnd(f);
                    this.ended = true; return f === s.Z_OK } return true };
            c.prototype.onData = function(e) { this.chunks.push(e) };
            c.prototype.onEnd = function(e) { if (e === s.Z_OK) { if (this.options.to === "string") { this.result = this.chunks.join("") } else { this.result = n.flattenChunks(this.chunks) } } this.chunks = [];
                this.err = e;
                this.msg = this.strm.msg };

            function u(e, r) { var t = new c(r);
                t.push(e, true); if (t.err) { throw t.msg } return t.result }

            function h(e, r) { r = r || {};
                r.raw = true; return u(e, r) } t.Inflate = c;
            t.inflate = u;
            t.inflateRaw = h;
            t.ungzip = u }, { "./utils/common": 27, "./utils/strings": 28, "./zlib/constants": 30, "./zlib/gzheader": 33, "./zlib/inflate.js": 35, "./zlib/messages": 37, "./zlib/zstream": 39 }],
        27: [function(e, r, t) { "use strict"; var a = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Int32Array !== "undefined";
            t.assign = function(e) { var r = Array.prototype.slice.call(arguments, 1); while (r.length) { var t = r.shift(); if (!t) { continue } if (typeof t !== "object") { throw new TypeError(t + "must be non-object") } for (var a in t) { if (t.hasOwnProperty(a)) { e[a] = t[a] } } } return e };
            t.shrinkBuf = function(e, r) { if (e.length === r) { return e } if (e.subarray) { return e.subarray(0, r) } e.length = r; return e }; var n = { arraySet: function(e, r, t, a, n) { if (r.subarray && e.subarray) { e.set(r.subarray(t, t + a), n); return } for (var i = 0; i < a; i++) { e[n + i] = r[t + i] } }, flattenChunks: function(e) { var r, t, a, n, i, s;
                    a = 0; for (r = 0, t = e.length; r < t; r++) { a += e[r].length } s = new Uint8Array(a);
                    n = 0; for (r = 0, t = e.length; r < t; r++) { i = e[r];
                        s.set(i, n);
                        n += i.length } return s } }; var i = { arraySet: function(e, r, t, a, n) { for (var i = 0; i < a; i++) { e[n + i] = r[t + i] } }, flattenChunks: function(e) { return [].concat.apply([], e) } };
            t.setTyped = function(e) { if (e) { t.Buf8 = Uint8Array;
                    t.Buf16 = Uint16Array;
                    t.Buf32 = Int32Array;
                    t.assign(t, n) } else { t.Buf8 = Array;
                    t.Buf16 = Array;
                    t.Buf32 = Array;
                    t.assign(t, i) } };
            t.setTyped(a) }, {}],
        28: [function(e, r, t) { "use strict"; var a = e("./common"); var n = true; var i = true; try { String.fromCharCode.apply(null, [0]) } catch (s) { n = false } try { String.fromCharCode.apply(null, new Uint8Array(1)) } catch (s) { i = false } var o = new a.Buf8(256); for (var f = 0; f < 256; f++) { o[f] = f >= 252 ? 6 : f >= 248 ? 5 : f >= 240 ? 4 : f >= 224 ? 3 : f >= 192 ? 2 : 1 } o[254] = o[254] = 1;
            t.string2buf = function(e) { var r, t, n, i, s, o = e.length,
                    f = 0; for (i = 0; i < o; i++) { t = e.charCodeAt(i); if ((t & 64512) === 55296 && i + 1 < o) { n = e.charCodeAt(i + 1); if ((n & 64512) === 56320) { t = 65536 + (t - 55296 << 10) + (n - 56320);
                            i++ } } f += t < 128 ? 1 : t < 2048 ? 2 : t < 65536 ? 3 : 4 } r = new a.Buf8(f); for (s = 0, i = 0; s < f; i++) { t = e.charCodeAt(i); if ((t & 64512) === 55296 && i + 1 < o) { n = e.charCodeAt(i + 1); if ((n & 64512) === 56320) { t = 65536 + (t - 55296 << 10) + (n - 56320);
                            i++ } } if (t < 128) { r[s++] = t } else if (t < 2048) { r[s++] = 192 | t >>> 6;
                        r[s++] = 128 | t & 63 } else if (t < 65536) { r[s++] = 224 | t >>> 12;
                        r[s++] = 128 | t >>> 6 & 63;
                        r[s++] = 128 | t & 63 } else { r[s++] = 240 | t >>> 18;
                        r[s++] = 128 | t >>> 12 & 63;
                        r[s++] = 128 | t >>> 6 & 63;
                        r[s++] = 128 | t & 63 } } return r };

            function l(e, r) { if (r < 65537) { if (e.subarray && i || !e.subarray && n) { return String.fromCharCode.apply(null, a.shrinkBuf(e, r)) } } var t = ""; for (var s = 0; s < r; s++) { t += String.fromCharCode(e[s]) } return t } t.buf2binstring = function(e) { return l(e, e.length) };
            t.binstring2buf = function(e) { var r = new a.Buf8(e.length); for (var t = 0, n = r.length; t < n; t++) { r[t] = e.charCodeAt(t) } return r };
            t.buf2string = function(e, r) { var t, a, n, i; var s = r || e.length; var f = new Array(s * 2); for (a = 0, t = 0; t < s;) { n = e[t++]; if (n < 128) { f[a++] = n; continue } i = o[n]; if (i > 4) { f[a++] = 65533;
                        t += i - 1; continue } n &= i === 2 ? 31 : i === 3 ? 15 : 7; while (i > 1 && t < s) { n = n << 6 | e[t++] & 63;
                        i-- } if (i > 1) { f[a++] = 65533; continue } if (n < 65536) { f[a++] = n } else { n -= 65536;
                        f[a++] = 55296 | n >> 10 & 1023;
                        f[a++] = 56320 | n & 1023 } } return l(f, a) };
            t.utf8border = function(e, r) { var t;
                r = r || e.length; if (r > e.length) { r = e.length } t = r - 1; while (t >= 0 && (e[t] & 192) === 128) { t-- } if (t < 0) { return r } if (t === 0) { return r } return t + o[e[t]] > r ? t : r } }, { "./common": 27 }],
        29: [function(e, r, t) { "use strict";

            function a(e, r, t, a) { var n = e & 65535 | 0,
                    i = e >>> 16 & 65535 | 0,
                    s = 0; while (t !== 0) { s = t > 2e3 ? 2e3 : t;
                    t -= s;
                    do { n = n + r[a++] | 0;
                        i = i + n | 0 } while (--s);
                    n %= 65521;
                    i %= 65521 } return n | i << 16 | 0 } r.exports = a }, {}],
        30: [function(e, r, t) { r.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 } }, {}],
        31: [function(e, r, t) { "use strict";

            function a() { var e, r = []; for (var t = 0; t < 256; t++) { e = t; for (var a = 0; a < 8; a++) { e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1 } r[t] = e } return r } var n = a();

            function i(e, r, t, a) { var i = n,
                    s = a + t;
                e = e ^ -1; for (var o = a; o < s; o++) { e = e >>> 8 ^ i[(e ^ r[o]) & 255] } return e ^ -1 } r.exports = i }, {}],
        32: [function(e, r, t) { "use strict"; var a = e("../utils/common"); var n = e("./trees"); var i = e("./adler32"); var s = e("./crc32"); var o = e("./messages"); var f = 0; var l = 1; var c = 3; var u = 4; var h = 5; var d = 0; var v = 1; var p = -2; var b = -3; var m = -5; var g = -1; var E = 1; var k = 2; var w = 3; var S = 4; var _ = 0; var C = 2; var B = 8; var T = 9; var x = 15; var I = 8; var A = 29; var y = 256; var R = y + 1 + A; var D = 30; var O = 19; var F = 2 * R + 1; var P = 15; var N = 3; var L = 258; var M = L + N + 1; var U = 32; var H = 42; var W = 69; var V = 73; var z = 91; var X = 103; var G = 113; var j = 666; var K = 1; var Y = 2; var $ = 3; var Z = 4; var Q = 3;

            function J(e, r) { e.msg = o[r]; return r }

            function q(e) { return (e << 1) - (e > 4 ? 9 : 0) }

            function ee(e) { var r = e.length; while (--r >= 0) { e[r] = 0 } }

            function re(e) { var r = e.state; var t = r.pending; if (t > e.avail_out) { t = e.avail_out } if (t === 0) { return } a.arraySet(e.output, r.pending_buf, r.pending_out, t, e.next_out);
                e.next_out += t;
                r.pending_out += t;
                e.total_out += t;
                e.avail_out -= t;
                r.pending -= t; if (r.pending === 0) { r.pending_out = 0 } }

            function te(e, r) { n._tr_flush_block(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, r);
                e.block_start = e.strstart;
                re(e.strm) }

            function ae(e, r) { e.pending_buf[e.pending++] = r }

            function ne(e, r) { e.pending_buf[e.pending++] = r >>> 8 & 255;
                e.pending_buf[e.pending++] = r & 255 }

            function ie(e, r, t, n) { var o = e.avail_in; if (o > n) { o = n } if (o === 0) { return 0 } e.avail_in -= o;
                a.arraySet(r, e.input, e.next_in, o, t); if (e.state.wrap === 1) { e.adler = i(e.adler, r, o, t) } else if (e.state.wrap === 2) { e.adler = s(e.adler, r, o, t) } e.next_in += o;
                e.total_in += o; return o }

            function se(e, r) { var t = e.max_chain_length; var a = e.strstart; var n; var i; var s = e.prev_length; var o = e.nice_match; var f = e.strstart > e.w_size - M ? e.strstart - (e.w_size - M) : 0; var l = e.window; var c = e.w_mask; var u = e.prev; var h = e.strstart + L; var d = l[a + s - 1]; var v = l[a + s]; if (e.prev_length >= e.good_match) { t >>= 2 } if (o > e.lookahead) { o = e.lookahead } do { n = r; if (l[n + s] !== v || l[n + s - 1] !== d || l[n] !== l[a] || l[++n] !== l[a + 1]) { continue } a += 2;
                    n++;
                    do {} while (l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && a < h);
                    i = L - (h - a);
                    a = h - L; if (i > s) { e.match_start = r;
                        s = i; if (i >= o) { break } d = l[a + s - 1];
                        v = l[a + s] } } while ((r = u[r & c]) > f && --t !== 0); if (s <= e.lookahead) { return s } return e.lookahead }

            function oe(e) { var r = e.w_size; var t, n, i, s, o;
                do { s = e.window_size - e.lookahead - e.strstart; if (e.strstart >= r + (r - M)) { a.arraySet(e.window, e.window, r, r, 0);
                        e.match_start -= r;
                        e.strstart -= r;
                        e.block_start -= r;
                        n = e.hash_size;
                        t = n;
                        do { i = e.head[--t];
                            e.head[t] = i >= r ? i - r : 0 } while (--n);
                        n = r;
                        t = n;
                        do { i = e.prev[--t];
                            e.prev[t] = i >= r ? i - r : 0 } while (--n);
                        s += r } if (e.strm.avail_in === 0) { break } n = ie(e.strm, e.window, e.strstart + e.lookahead, s);
                    e.lookahead += n; if (e.lookahead + e.insert >= N) { o = e.strstart - e.insert;
                        e.ins_h = e.window[o];
                        e.ins_h = (e.ins_h << e.hash_shift ^ e.window[o + 1]) & e.hash_mask; while (e.insert) { e.ins_h = (e.ins_h << e.hash_shift ^ e.window[o + N - 1]) & e.hash_mask;
                            e.prev[o & e.w_mask] = e.head[e.ins_h];
                            e.head[e.ins_h] = o;
                            o++;
                            e.insert--; if (e.lookahead + e.insert < N) { break } } } } while (e.lookahead < M && e.strm.avail_in !== 0) }

            function fe(e, r) { var t = 65535; if (t > e.pending_buf_size - 5) { t = e.pending_buf_size - 5 } for (;;) { if (e.lookahead <= 1) { oe(e); if (e.lookahead === 0 && r === f) { return K } if (e.lookahead === 0) { break } } e.strstart += e.lookahead;
                    e.lookahead = 0; var a = e.block_start + t; if (e.strstart === 0 || e.strstart >= a) { e.lookahead = e.strstart - a;
                        e.strstart = a;
                        te(e, false); if (e.strm.avail_out === 0) { return K } } if (e.strstart - e.block_start >= e.w_size - M) { te(e, false); if (e.strm.avail_out === 0) { return K } } } e.insert = 0; if (r === u) { te(e, true); if (e.strm.avail_out === 0) { return $ } return Z } if (e.strstart > e.block_start) { te(e, false); if (e.strm.avail_out === 0) { return K } } return K }

            function le(e, r) { var t; var a; for (;;) { if (e.lookahead < M) { oe(e); if (e.lookahead < M && r === f) { return K } if (e.lookahead === 0) { break } } t = 0; if (e.lookahead >= N) { e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + N - 1]) & e.hash_mask;
                        t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h];
                        e.head[e.ins_h] = e.strstart } if (t !== 0 && e.strstart - t <= e.w_size - M) { e.match_length = se(e, t) } if (e.match_length >= N) { a = n._tr_tally(e, e.strstart - e.match_start, e.match_length - N);
                        e.lookahead -= e.match_length; if (e.match_length <= e.max_lazy_match && e.lookahead >= N) { e.match_length--;
                            do { e.strstart++;
                                e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + N - 1]) & e.hash_mask;
                                t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h];
                                e.head[e.ins_h] = e.strstart } while (--e.match_length !== 0);
                            e.strstart++ } else { e.strstart += e.match_length;
                            e.match_length = 0;
                            e.ins_h = e.window[e.strstart];
                            e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask } } else { a = n._tr_tally(e, 0, e.window[e.strstart]);
                        e.lookahead--;
                        e.strstart++ } if (a) { te(e, false); if (e.strm.avail_out === 0) { return K } } } e.insert = e.strstart < N - 1 ? e.strstart : N - 1; if (r === u) { te(e, true); if (e.strm.avail_out === 0) { return $ } return Z } if (e.last_lit) { te(e, false); if (e.strm.avail_out === 0) { return K } } return Y }

            function ce(e, r) { var t; var a; var i; for (;;) { if (e.lookahead < M) { oe(e); if (e.lookahead < M && r === f) { return K } if (e.lookahead === 0) { break } } t = 0; if (e.lookahead >= N) { e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + N - 1]) & e.hash_mask;
                        t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h];
                        e.head[e.ins_h] = e.strstart } e.prev_length = e.match_length;
                    e.prev_match = e.match_start;
                    e.match_length = N - 1; if (t !== 0 && e.prev_length < e.max_lazy_match && e.strstart - t <= e.w_size - M) { e.match_length = se(e, t); if (e.match_length <= 5 && (e.strategy === E || e.match_length === N && e.strstart - e.match_start > 4096)) { e.match_length = N - 1 } } if (e.prev_length >= N && e.match_length <= e.prev_length) { i = e.strstart + e.lookahead - N;
                        a = n._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - N);
                        e.lookahead -= e.prev_length - 1;
                        e.prev_length -= 2;
                        do { if (++e.strstart <= i) { e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + N - 1]) & e.hash_mask;
                                t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h];
                                e.head[e.ins_h] = e.strstart } } while (--e.prev_length !== 0);
                        e.match_available = 0;
                        e.match_length = N - 1;
                        e.strstart++; if (a) { te(e, false); if (e.strm.avail_out === 0) { return K } } } else if (e.match_available) { a = n._tr_tally(e, 0, e.window[e.strstart - 1]); if (a) { te(e, false) } e.strstart++;
                        e.lookahead--; if (e.strm.avail_out === 0) { return K } } else { e.match_available = 1;
                        e.strstart++;
                        e.lookahead-- } } if (e.match_available) { a = n._tr_tally(e, 0, e.window[e.strstart - 1]);
                    e.match_available = 0 } e.insert = e.strstart < N - 1 ? e.strstart : N - 1; if (r === u) { te(e, true); if (e.strm.avail_out === 0) { return $ } return Z } if (e.last_lit) { te(e, false); if (e.strm.avail_out === 0) { return K } } return Y }

            function ue(e, r) { var t; var a; var i, s; var o = e.window; for (;;) { if (e.lookahead <= L) { oe(e); if (e.lookahead <= L && r === f) { return K } if (e.lookahead === 0) { break } } e.match_length = 0; if (e.lookahead >= N && e.strstart > 0) { i = e.strstart - 1;
                        a = o[i]; if (a === o[++i] && a === o[++i] && a === o[++i]) { s = e.strstart + L;
                            do {} while (a === o[++i] && a === o[++i] && a === o[++i] && a === o[++i] && a === o[++i] && a === o[++i] && a === o[++i] && a === o[++i] && i < s);
                            e.match_length = L - (s - i); if (e.match_length > e.lookahead) { e.match_length = e.lookahead } } } if (e.match_length >= N) { t = n._tr_tally(e, 1, e.match_length - N);
                        e.lookahead -= e.match_length;
                        e.strstart += e.match_length;
                        e.match_length = 0 } else { t = n._tr_tally(e, 0, e.window[e.strstart]);
                        e.lookahead--;
                        e.strstart++ } if (t) { te(e, false); if (e.strm.avail_out === 0) { return K } } } e.insert = 0; if (r === u) { te(e, true); if (e.strm.avail_out === 0) { return $ } return Z } if (e.last_lit) { te(e, false); if (e.strm.avail_out === 0) { return K } } return Y }

            function he(e, r) { var t; for (;;) { if (e.lookahead === 0) { oe(e); if (e.lookahead === 0) { if (r === f) { return K } break } } e.match_length = 0;
                    t = n._tr_tally(e, 0, e.window[e.strstart]);
                    e.lookahead--;
                    e.strstart++; if (t) { te(e, false); if (e.strm.avail_out === 0) { return K } } } e.insert = 0; if (r === u) { te(e, true); if (e.strm.avail_out === 0) { return $ } return Z } if (e.last_lit) { te(e, false); if (e.strm.avail_out === 0) { return K } } return Y } var de = function(e, r, t, a, n) { this.good_length = e;
                this.max_lazy = r;
                this.nice_length = t;
                this.max_chain = a;
                this.func = n }; var ve;
            ve = [new de(0, 0, 0, 0, fe), new de(4, 4, 8, 4, le), new de(4, 5, 16, 8, le), new de(4, 6, 32, 32, le), new de(4, 4, 16, 16, ce), new de(8, 16, 32, 32, ce), new de(8, 16, 128, 128, ce), new de(8, 32, 128, 256, ce), new de(32, 128, 258, 1024, ce), new de(32, 258, 258, 4096, ce)];

            function pe(e) { e.window_size = 2 * e.w_size;
                ee(e.head);
                e.max_lazy_match = ve[e.level].max_lazy;
                e.good_match = ve[e.level].good_length;
                e.nice_match = ve[e.level].nice_length;
                e.max_chain_length = ve[e.level].max_chain;
                e.strstart = 0;
                e.block_start = 0;
                e.lookahead = 0;
                e.insert = 0;
                e.match_length = e.prev_length = N - 1;
                e.match_available = 0;
                e.ins_h = 0 }

            function be() { this.strm = null;
                this.status = 0;
                this.pending_buf = null;
                this.pending_buf_size = 0;
                this.pending_out = 0;
                this.pending = 0;
                this.wrap = 0;
                this.gzhead = null;
                this.gzindex = 0;
                this.method = B;
                this.last_flush = -1;
                this.w_size = 0;
                this.w_bits = 0;
                this.w_mask = 0;
                this.window = null;
                this.window_size = 0;
                this.prev = null;
                this.head = null;
                this.ins_h = 0;
                this.hash_size = 0;
                this.hash_bits = 0;
                this.hash_mask = 0;
                this.hash_shift = 0;
                this.block_start = 0;
                this.match_length = 0;
                this.prev_match = 0;
                this.match_available = 0;
                this.strstart = 0;
                this.match_start = 0;
                this.lookahead = 0;
                this.prev_length = 0;
                this.max_chain_length = 0;
                this.max_lazy_match = 0;
                this.level = 0;
                this.strategy = 0;
                this.good_match = 0;
                this.nice_match = 0;
                this.dyn_ltree = new a.Buf16(F * 2);
                this.dyn_dtree = new a.Buf16((2 * D + 1) * 2);
                this.bl_tree = new a.Buf16((2 * O + 1) * 2);
                ee(this.dyn_ltree);
                ee(this.dyn_dtree);
                ee(this.bl_tree);
                this.l_desc = null;
                this.d_desc = null;
                this.bl_desc = null;
                this.bl_count = new a.Buf16(P + 1);
                this.heap = new a.Buf16(2 * R + 1);
                ee(this.heap);
                this.heap_len = 0;
                this.heap_max = 0;
                this.depth = new a.Buf16(2 * R + 1);
                ee(this.depth);
                this.l_buf = 0;
                this.lit_bufsize = 0;
                this.last_lit = 0;
                this.d_buf = 0;
                this.opt_len = 0;
                this.static_len = 0;
                this.matches = 0;
                this.insert = 0;
                this.bi_buf = 0;
                this.bi_valid = 0 }

            function me(e) { var r; if (!e || !e.state) { return J(e, p) } e.total_in = e.total_out = 0;
                e.data_type = C;
                r = e.state;
                r.pending = 0;
                r.pending_out = 0; if (r.wrap < 0) { r.wrap = -r.wrap } r.status = r.wrap ? H : G;
                e.adler = r.wrap === 2 ? 0 : 1;
                r.last_flush = f;
                n._tr_init(r); return d }

            function ge(e) { var r = me(e); if (r === d) { pe(e.state) } return r }

            function Ee(e, r) { if (!e || !e.state) { return p } if (e.state.wrap !== 2) { return p } e.state.gzhead = r; return d }

            function ke(e, r, t, n, i, s) { if (!e) { return p } var o = 1; if (r === g) { r = 6 } if (n < 0) { o = 0;
                    n = -n } else if (n > 15) { o = 2;
                    n -= 16 } if (i < 1 || i > T || t !== B || n < 8 || n > 15 || r < 0 || r > 9 || s < 0 || s > S) { return J(e, p) } if (n === 8) { n = 9 } var f = new be;
                e.state = f;
                f.strm = e;
                f.wrap = o;
                f.gzhead = null;
                f.w_bits = n;
                f.w_size = 1 << f.w_bits;
                f.w_mask = f.w_size - 1;
                f.hash_bits = i + 7;
                f.hash_size = 1 << f.hash_bits;
                f.hash_mask = f.hash_size - 1;
                f.hash_shift = ~~((f.hash_bits + N - 1) / N);
                f.window = new a.Buf8(f.w_size * 2);
                f.head = new a.Buf16(f.hash_size);
                f.prev = new a.Buf16(f.w_size);
                f.lit_bufsize = 1 << i + 6;
                f.pending_buf_size = f.lit_bufsize * 4;
                f.pending_buf = new a.Buf8(f.pending_buf_size);
                f.d_buf = f.lit_bufsize >> 1;
                f.l_buf = (1 + 2) * f.lit_bufsize;
                f.level = r;
                f.strategy = s;
                f.method = t; return ge(e) }

            function we(e, r) { return ke(e, r, B, x, I, _) }

            function Se(e, r) { var t, a; var i, o; if (!e || !e.state || r > h || r < 0) { return e ? J(e, p) : p } a = e.state; if (!e.output || !e.input && e.avail_in !== 0 || a.status === j && r !== u) { return J(e, e.avail_out === 0 ? m : p) } a.strm = e;
                t = a.last_flush;
                a.last_flush = r; if (a.status === H) { if (a.wrap === 2) { e.adler = 0;
                        ae(a, 31);
                        ae(a, 139);
                        ae(a, 8); if (!a.gzhead) { ae(a, 0);
                            ae(a, 0);
                            ae(a, 0);
                            ae(a, 0);
                            ae(a, 0);
                            ae(a, a.level === 9 ? 2 : a.strategy >= k || a.level < 2 ? 4 : 0);
                            ae(a, Q);
                            a.status = G } else { ae(a, (a.gzhead.text ? 1 : 0) + (a.gzhead.hcrc ? 2 : 0) + (!a.gzhead.extra ? 0 : 4) + (!a.gzhead.name ? 0 : 8) + (!a.gzhead.comment ? 0 : 16));
                            ae(a, a.gzhead.time & 255);
                            ae(a, a.gzhead.time >> 8 & 255);
                            ae(a, a.gzhead.time >> 16 & 255);
                            ae(a, a.gzhead.time >> 24 & 255);
                            ae(a, a.level === 9 ? 2 : a.strategy >= k || a.level < 2 ? 4 : 0);
                            ae(a, a.gzhead.os & 255); if (a.gzhead.extra && a.gzhead.extra.length) { ae(a, a.gzhead.extra.length & 255);
                                ae(a, a.gzhead.extra.length >> 8 & 255) } if (a.gzhead.hcrc) { e.adler = s(e.adler, a.pending_buf, a.pending, 0) } a.gzindex = 0;
                            a.status = W } } else { var b = B + (a.w_bits - 8 << 4) << 8; var g = -1; if (a.strategy >= k || a.level < 2) { g = 0 } else if (a.level < 6) { g = 1 } else if (a.level === 6) { g = 2 } else { g = 3 } b |= g << 6; if (a.strstart !== 0) { b |= U } b += 31 - b % 31;
                        a.status = G;
                        ne(a, b); if (a.strstart !== 0) { ne(a, e.adler >>> 16);
                            ne(a, e.adler & 65535) } e.adler = 1 } } if (a.status === W) { if (a.gzhead.extra) { i = a.pending; while (a.gzindex < (a.gzhead.extra.length & 65535)) { if (a.pending === a.pending_buf_size) { if (a.gzhead.hcrc && a.pending > i) { e.adler = s(e.adler, a.pending_buf, a.pending - i, i) } re(e);
                                i = a.pending; if (a.pending === a.pending_buf_size) { break } } ae(a, a.gzhead.extra[a.gzindex] & 255);
                            a.gzindex++ } if (a.gzhead.hcrc && a.pending > i) { e.adler = s(e.adler, a.pending_buf, a.pending - i, i) } if (a.gzindex === a.gzhead.extra.length) { a.gzindex = 0;
                            a.status = V } } else { a.status = V } } if (a.status === V) { if (a.gzhead.name) { i = a.pending;
                        do { if (a.pending === a.pending_buf_size) { if (a.gzhead.hcrc && a.pending > i) { e.adler = s(e.adler, a.pending_buf, a.pending - i, i) } re(e);
                                i = a.pending; if (a.pending === a.pending_buf_size) { o = 1; break } } if (a.gzindex < a.gzhead.name.length) { o = a.gzhead.name.charCodeAt(a.gzindex++) & 255 } else { o = 0 } ae(a, o) } while (o !== 0); if (a.gzhead.hcrc && a.pending > i) { e.adler = s(e.adler, a.pending_buf, a.pending - i, i) } if (o === 0) { a.gzindex = 0;
                            a.status = z } } else { a.status = z } } if (a.status === z) { if (a.gzhead.comment) { i = a.pending;
                        do { if (a.pending === a.pending_buf_size) { if (a.gzhead.hcrc && a.pending > i) { e.adler = s(e.adler, a.pending_buf, a.pending - i, i) } re(e);
                                i = a.pending; if (a.pending === a.pending_buf_size) { o = 1; break } } if (a.gzindex < a.gzhead.comment.length) { o = a.gzhead.comment.charCodeAt(a.gzindex++) & 255 } else { o = 0 } ae(a, o) } while (o !== 0); if (a.gzhead.hcrc && a.pending > i) { e.adler = s(e.adler, a.pending_buf, a.pending - i, i) } if (o === 0) { a.status = X } } else { a.status = X } } if (a.status === X) { if (a.gzhead.hcrc) { if (a.pending + 2 > a.pending_buf_size) { re(e) } if (a.pending + 2 <= a.pending_buf_size) { ae(a, e.adler & 255);
                            ae(a, e.adler >> 8 & 255);
                            e.adler = 0;
                            a.status = G } } else { a.status = G } } if (a.pending !== 0) { re(e); if (e.avail_out === 0) { a.last_flush = -1; return d } } else if (e.avail_in === 0 && q(r) <= q(t) && r !== u) { return J(e, m) } if (a.status === j && e.avail_in !== 0) { return J(e, m) } if (e.avail_in !== 0 || a.lookahead !== 0 || r !== f && a.status !== j) { var E = a.strategy === k ? he(a, r) : a.strategy === w ? ue(a, r) : ve[a.level].func(a, r); if (E === $ || E === Z) { a.status = j } if (E === K || E === $) { if (e.avail_out === 0) { a.last_flush = -1 } return d } if (E === Y) { if (r === l) { n._tr_align(a) } else if (r !== h) { n._tr_stored_block(a, 0, 0, false); if (r === c) { ee(a.head); if (a.lookahead === 0) { a.strstart = 0;
                                    a.block_start = 0;
                                    a.insert = 0 } } } re(e); if (e.avail_out === 0) { a.last_flush = -1; return d } } } if (r !== u) { return d } if (a.wrap <= 0) { return v } if (a.wrap === 2) { ae(a, e.adler & 255);
                    ae(a, e.adler >> 8 & 255);
                    ae(a, e.adler >> 16 & 255);
                    ae(a, e.adler >> 24 & 255);
                    ae(a, e.total_in & 255);
                    ae(a, e.total_in >> 8 & 255);
                    ae(a, e.total_in >> 16 & 255);
                    ae(a, e.total_in >> 24 & 255) } else { ne(a, e.adler >>> 16);
                    ne(a, e.adler & 65535) } re(e); if (a.wrap > 0) { a.wrap = -a.wrap } return a.pending !== 0 ? d : v }

            function _e(e) { var r; if (!e || !e.state) { return p } r = e.state.status; if (r !== H && r !== W && r !== V && r !== z && r !== X && r !== G && r !== j) { return J(e, p) } e.state = null; return r === G ? J(e, b) : d } t.deflateInit = we;
            t.deflateInit2 = ke;
            t.deflateReset = ge;
            t.deflateResetKeep = me;
            t.deflateSetHeader = Ee;
            t.deflate = Se;
            t.deflateEnd = _e;
            t.deflateInfo = "pako deflate (from Nodeca project)" }, { "../utils/common": 27, "./adler32": 29, "./crc32": 31, "./messages": 37, "./trees": 38 }],
        33: [function(e, r, t) { "use strict";

            function a() { this.text = 0;
                this.time = 0;
                this.xflags = 0;
                this.os = 0;
                this.extra = null;
                this.extra_len = 0;
                this.name = "";
                this.comment = "";
                this.hcrc = 0;
                this.done = false } r.exports = a }, {}],
        34: [function(e, r, t) { "use strict"; var a = 30; var n = 12;
            r.exports = function i(e, r) { var t; var i; var s; var o; var f; var l; var c; var u; var h; var d; var v; var p; var b; var m; var g; var E; var k; var w; var S; var _; var C; var B; var T; var x, I;
                t = e.state;
                i = e.next_in;
                x = e.input;
                s = i + (e.avail_in - 5);
                o = e.next_out;
                I = e.output;
                f = o - (r - e.avail_out);
                l = o + (e.avail_out - 257);
                c = t.dmax;
                u = t.wsize;
                h = t.whave;
                d = t.wnext;
                v = t.window;
                p = t.hold;
                b = t.bits;
                m = t.lencode;
                g = t.distcode;
                E = (1 << t.lenbits) - 1;
                k = (1 << t.distbits) - 1;
                e: do { if (b < 15) { p += x[i++] << b;
                        b += 8;
                        p += x[i++] << b;
                        b += 8 } w = m[p & E];
                    r: for (;;) { S = w >>> 24;
                        p >>>= S;
                        b -= S;
                        S = w >>> 16 & 255; if (S === 0) { I[o++] = w & 65535 } else if (S & 16) { _ = w & 65535;
                            S &= 15; if (S) { if (b < S) { p += x[i++] << b;
                                    b += 8 } _ += p & (1 << S) - 1;
                                p >>>= S;
                                b -= S } if (b < 15) { p += x[i++] << b;
                                b += 8;
                                p += x[i++] << b;
                                b += 8 } w = g[p & k];
                            t: for (;;) { S = w >>> 24;
                                p >>>= S;
                                b -= S;
                                S = w >>> 16 & 255; if (S & 16) { C = w & 65535;
                                    S &= 15; if (b < S) { p += x[i++] << b;
                                        b += 8; if (b < S) { p += x[i++] << b;
                                            b += 8 } } C += p & (1 << S) - 1; if (C > c) { e.msg = "invalid distance too far back";
                                        t.mode = a; break e } p >>>= S;
                                    b -= S;
                                    S = o - f; if (C > S) { S = C - S; if (S > h) { if (t.sane) { e.msg = "invalid distance too far back";
                                                t.mode = a; break e } } B = 0;
                                        T = v; if (d === 0) { B += u - S; if (S < _) { _ -= S;
                                                do { I[o++] = v[B++] } while (--S);
                                                B = o - C;
                                                T = I } } else if (d < S) { B += u + d - S;
                                            S -= d; if (S < _) { _ -= S;
                                                do { I[o++] = v[B++] } while (--S);
                                                B = 0; if (d < _) { S = d;
                                                    _ -= S;
                                                    do { I[o++] = v[B++] } while (--S);
                                                    B = o - C;
                                                    T = I } } } else { B += d - S; if (S < _) { _ -= S;
                                                do { I[o++] = v[B++] } while (--S);
                                                B = o - C;
                                                T = I } } while (_ > 2) { I[o++] = T[B++];
                                            I[o++] = T[B++];
                                            I[o++] = T[B++];
                                            _ -= 3 } if (_) { I[o++] = T[B++]; if (_ > 1) { I[o++] = T[B++] } } } else { B = o - C;
                                        do { I[o++] = I[B++];
                                            I[o++] = I[B++];
                                            I[o++] = I[B++];
                                            _ -= 3 } while (_ > 2); if (_) { I[o++] = I[B++]; if (_ > 1) { I[o++] = I[B++] } } } } else if ((S & 64) === 0) { w = g[(w & 65535) + (p & (1 << S) - 1)]; continue t } else { e.msg = "invalid distance code";
                                    t.mode = a; break e } break } } else if ((S & 64) === 0) { w = m[(w & 65535) + (p & (1 << S) - 1)]; continue r } else if (S & 32) { t.mode = n; break e } else { e.msg = "invalid literal/length code";
                            t.mode = a; break e } break } } while (i < s && o < l);
                _ = b >> 3;
                i -= _;
                b -= _ << 3;
                p &= (1 << b) - 1;
                e.next_in = i;
                e.next_out = o;
                e.avail_in = i < s ? 5 + (s - i) : 5 - (i - s);
                e.avail_out = o < l ? 257 + (l - o) : 257 - (o - l);
                t.hold = p;
                t.bits = b; return } }, {}],
        35: [function(e, r, t) {
            "use strict";
            var a = e("../utils/common");
            var n = e("./adler32");
            var i = e("./crc32");
            var s = e("./inffast");
            var o = e("./inftrees");
            var f = 0;
            var l = 1;
            var c = 2;
            var u = 4;
            var h = 5;
            var d = 6;
            var v = 0;
            var p = 1;
            var b = 2;
            var m = -2;
            var g = -3;
            var E = -4;
            var k = -5;
            var w = 8;
            var S = 1;
            var _ = 2;
            var C = 3;
            var B = 4;
            var T = 5;
            var x = 6;
            var I = 7;
            var A = 8;
            var y = 9;
            var R = 10;
            var D = 11;
            var O = 12;
            var F = 13;
            var P = 14;
            var N = 15;
            var L = 16;
            var M = 17;
            var U = 18;
            var H = 19;
            var W = 20;
            var V = 21;
            var z = 22;
            var X = 23;
            var G = 24;
            var j = 25;
            var K = 26;
            var Y = 27;
            var $ = 28;
            var Z = 29;
            var Q = 30;
            var J = 31;
            var q = 32;
            var ee = 852;
            var re = 592;
            var te = 15;
            var ae = te;

            function ne(e) { return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((e & 65280) << 8) + ((e & 255) << 24) }

            function ie() { this.mode = 0;
                this.last = false;
                this.wrap = 0;
                this.havedict = false;
                this.flags = 0;
                this.dmax = 0;
                this.check = 0;
                this.total = 0;
                this.head = null;
                this.wbits = 0;
                this.wsize = 0;
                this.whave = 0;
                this.wnext = 0;
                this.window = null;
                this.hold = 0;
                this.bits = 0;
                this.length = 0;
                this.offset = 0;
                this.extra = 0;
                this.lencode = null;
                this.distcode = null;
                this.lenbits = 0;
                this.distbits = 0;
                this.ncode = 0;
                this.nlen = 0;
                this.ndist = 0;
                this.have = 0;
                this.next = null;
                this.lens = new a.Buf16(320);
                this.work = new a.Buf16(288);
                this.lendyn = null;
                this.distdyn = null;
                this.sane = 0;
                this.back = 0;
                this.was = 0 }

            function se(e) { var r; if (!e || !e.state) { return m } r = e.state;
                e.total_in = e.total_out = r.total = 0;
                e.msg = ""; if (r.wrap) { e.adler = r.wrap & 1 } r.mode = S;
                r.last = 0;
                r.havedict = 0;
                r.dmax = 32768;
                r.head = null;
                r.hold = 0;
                r.bits = 0;
                r.lencode = r.lendyn = new a.Buf32(ee);
                r.distcode = r.distdyn = new a.Buf32(re);
                r.sane = 1;
                r.back = -1; return v }

            function oe(e) { var r; if (!e || !e.state) { return m } r = e.state;
                r.wsize = 0;
                r.whave = 0;
                r.wnext = 0; return se(e) }

            function fe(e, r) { var t; var a; if (!e || !e.state) { return m } a = e.state; if (r < 0) { t = 0;
                    r = -r } else { t = (r >> 4) + 1; if (r < 48) { r &= 15 } } if (r && (r < 8 || r > 15)) { return m } if (a.window !== null && a.wbits !== r) { a.window = null } a.wrap = t;
                a.wbits = r; return oe(e) }

            function le(e, r) { var t; var a; if (!e) { return m } a = new ie;
                e.state = a;
                a.window = null;
                t = fe(e, r); if (t !== v) { e.state = null } return t }

            function ce(e) { return le(e, ae) }
            var ue = true;
            var he, de;

            function ve(e) { if (ue) { var r;
                    he = new a.Buf32(512);
                    de = new a.Buf32(32);
                    r = 0; while (r < 144) { e.lens[r++] = 8 } while (r < 256) { e.lens[r++] = 9 } while (r < 280) { e.lens[r++] = 7 } while (r < 288) { e.lens[r++] = 8 } o(l, e.lens, 0, 288, he, 0, e.work, { bits: 9 });
                    r = 0; while (r < 32) { e.lens[r++] = 5 } o(c, e.lens, 0, 32, de, 0, e.work, { bits: 5 });
                    ue = false } e.lencode = he;
                e.lenbits = 9;
                e.distcode = de;
                e.distbits = 5 }

            function pe(e, r, t, n) { var i; var s = e.state; if (s.window === null) { s.wsize = 1 << s.wbits;
                    s.wnext = 0;
                    s.whave = 0;
                    s.window = new a.Buf8(s.wsize) } if (n >= s.wsize) { a.arraySet(s.window, r, t - s.wsize, s.wsize, 0);
                    s.wnext = 0;
                    s.whave = s.wsize } else { i = s.wsize - s.wnext; if (i > n) { i = n } a.arraySet(s.window, r, t - n, i, s.wnext);
                    n -= i; if (n) { a.arraySet(s.window, r, t - n, n, 0);
                        s.wnext = n;
                        s.whave = s.wsize } else { s.wnext += i; if (s.wnext === s.wsize) { s.wnext = 0 } if (s.whave < s.wsize) { s.whave += i } } } return 0 }

            function be(e, r) {
                var t;
                var ee, re;
                var te;
                var ae;
                var ie, se;
                var oe;
                var fe;
                var le, ce;
                var ue;
                var he;
                var de;
                var be = 0;
                var me, ge, Ee;
                var ke, we, Se;
                var _e;
                var Ce;
                var Be = new a.Buf8(4);
                var Te;
                var xe;
                var Ie = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
                if (!e || !e.state || !e.output || !e.input && e.avail_in !== 0) { return m } t = e.state;
                if (t.mode === O) { t.mode = F } ae = e.next_out;
                re = e.output;
                se = e.avail_out;
                te = e.next_in;
                ee = e.input;
                ie = e.avail_in;
                oe = t.hold;
                fe = t.bits;
                le = ie;
                ce = se;
                Ce = v;
                e: for (;;) {
                    switch (t.mode) {
                        case S:
                            if (t.wrap === 0) { t.mode = F; break }
                            while (fe < 16) { if (ie === 0) { break e } ie--;
                                oe += ee[te++] << fe;
                                fe += 8 }
                            if (t.wrap & 2 && oe === 35615) { t.check = 0;
                                Be[0] = oe & 255;
                                Be[1] = oe >>> 8 & 255;
                                t.check = i(t.check, Be, 2, 0);
                                oe = 0;
                                fe = 0;
                                t.mode = _; break } t.flags = 0;
                            if (t.head) { t.head.done = false }
                            if (!(t.wrap & 1) || (((oe & 255) << 8) + (oe >> 8)) % 31) { e.msg = "incorrect header check";
                                t.mode = Q; break }
                            if ((oe & 15) !== w) { e.msg = "unknown compression method";
                                t.mode = Q; break } oe >>>= 4;
                            fe -= 4;
                            _e = (oe & 15) + 8;
                            if (t.wbits === 0) { t.wbits = _e } else if (_e > t.wbits) { e.msg = "invalid window size";
                                t.mode = Q; break } t.dmax = 1 << _e;
                            e.adler = t.check = 1;
                            t.mode = oe & 512 ? R : O;
                            oe = 0;
                            fe = 0;
                            break;
                        case _:
                            while (fe < 16) { if (ie === 0) { break e } ie--;
                                oe += ee[te++] << fe;
                                fe += 8 } t.flags = oe;
                            if ((t.flags & 255) !== w) { e.msg = "unknown compression method";
                                t.mode = Q; break }
                            if (t.flags & 57344) { e.msg = "unknown header flags set";
                                t.mode = Q; break }
                            if (t.head) { t.head.text = oe >> 8 & 1 }
                            if (t.flags & 512) { Be[0] = oe & 255;
                                Be[1] = oe >>> 8 & 255;
                                t.check = i(t.check, Be, 2, 0) } oe = 0;
                            fe = 0;
                            t.mode = C;
                        case C:
                            while (fe < 32) { if (ie === 0) { break e } ie--;
                                oe += ee[te++] << fe;
                                fe += 8 }
                            if (t.head) { t.head.time = oe }
                            if (t.flags & 512) { Be[0] = oe & 255;
                                Be[1] = oe >>> 8 & 255;
                                Be[2] = oe >>> 16 & 255;
                                Be[3] = oe >>> 24 & 255;
                                t.check = i(t.check, Be, 4, 0) } oe = 0;
                            fe = 0;
                            t.mode = B;
                        case B:
                            while (fe < 16) { if (ie === 0) { break e } ie--;
                                oe += ee[te++] << fe;
                                fe += 8 }
                            if (t.head) { t.head.xflags = oe & 255;
                                t.head.os = oe >> 8 }
                            if (t.flags & 512) { Be[0] = oe & 255;
                                Be[1] = oe >>> 8 & 255;
                                t.check = i(t.check, Be, 2, 0) } oe = 0;
                            fe = 0;
                            t.mode = T;
                        case T:
                            if (t.flags & 1024) { while (fe < 16) { if (ie === 0) { break e } ie--;
                                    oe += ee[te++] << fe;
                                    fe += 8 } t.length = oe; if (t.head) { t.head.extra_len = oe } if (t.flags & 512) { Be[0] = oe & 255;
                                    Be[1] = oe >>> 8 & 255;
                                    t.check = i(t.check, Be, 2, 0) } oe = 0;
                                fe = 0 } else if (t.head) { t.head.extra = null } t.mode = x;
                        case x:
                            if (t.flags & 1024) { ue = t.length; if (ue > ie) { ue = ie } if (ue) { if (t.head) { _e = t.head.extra_len - t.length; if (!t.head.extra) { t.head.extra = new Array(t.head.extra_len) } a.arraySet(t.head.extra, ee, te, ue, _e) } if (t.flags & 512) { t.check = i(t.check, ee, ue, te) } ie -= ue;
                                    te += ue;
                                    t.length -= ue } if (t.length) { break e } } t.length = 0;
                            t.mode = I;
                        case I:
                            if (t.flags & 2048) { if (ie === 0) { break e } ue = 0;
                                do { _e = ee[te + ue++]; if (t.head && _e && t.length < 65536) { t.head.name += String.fromCharCode(_e) } } while (_e && ue < ie); if (t.flags & 512) { t.check = i(t.check, ee, ue, te) } ie -= ue;
                                te += ue; if (_e) { break e } } else if (t.head) { t.head.name = null } t.length = 0;
                            t.mode = A;
                        case A:
                            if (t.flags & 4096) { if (ie === 0) { break e } ue = 0;
                                do { _e = ee[te + ue++]; if (t.head && _e && t.length < 65536) { t.head.comment += String.fromCharCode(_e) } } while (_e && ue < ie); if (t.flags & 512) { t.check = i(t.check, ee, ue, te) } ie -= ue;
                                te += ue; if (_e) { break e } } else if (t.head) { t.head.comment = null } t.mode = y;
                        case y:
                            if (t.flags & 512) { while (fe < 16) { if (ie === 0) { break e } ie--;
                                    oe += ee[te++] << fe;
                                    fe += 8 } if (oe !== (t.check & 65535)) { e.msg = "header crc mismatch";
                                    t.mode = Q; break } oe = 0;
                                fe = 0 }
                            if (t.head) { t.head.hcrc = t.flags >> 9 & 1;
                                t.head.done = true } e.adler = t.check = 0;
                            t.mode = O;
                            break;
                        case R:
                            while (fe < 32) { if (ie === 0) { break e } ie--;
                                oe += ee[te++] << fe;
                                fe += 8 } e.adler = t.check = ne(oe);
                            oe = 0;
                            fe = 0;
                            t.mode = D;
                        case D:
                            if (t.havedict === 0) { e.next_out = ae;
                                e.avail_out = se;
                                e.next_in = te;
                                e.avail_in = ie;
                                t.hold = oe;
                                t.bits = fe; return b } e.adler = t.check = 1;
                            t.mode = O;
                        case O:
                            if (r === h || r === d) { break e };
                        case F:
                            if (t.last) { oe >>>= fe & 7;
                                fe -= fe & 7;
                                t.mode = Y; break }
                            while (fe < 3) { if (ie === 0) { break e } ie--;
                                oe += ee[te++] << fe;
                                fe += 8 } t.last = oe & 1;
                            oe >>>= 1;
                            fe -= 1;
                            switch (oe & 3) {
                                case 0:
                                    t.mode = P; break;
                                case 1:
                                    ve(t);
                                    t.mode = W; if (r === d) { oe >>>= 2;
                                        fe -= 2; break e } break;
                                case 2:
                                    t.mode = M; break;
                                case 3:
                                    e.msg = "invalid block type";
                                    t.mode = Q; } oe >>>= 2;
                            fe -= 2;
                            break;
                        case P:
                            oe >>>= fe & 7;
                            fe -= fe & 7;
                            while (fe < 32) { if (ie === 0) { break e } ie--;
                                oe += ee[te++] << fe;
                                fe += 8 }
                            if ((oe & 65535) !== (oe >>> 16 ^ 65535)) { e.msg = "invalid stored block lengths";
                                t.mode = Q; break } t.length = oe & 65535;
                            oe = 0;
                            fe = 0;
                            t.mode = N;
                            if (r === d) { break e };
                        case N:
                            t.mode = L;
                        case L:
                            ue = t.length;
                            if (ue) { if (ue > ie) { ue = ie } if (ue > se) { ue = se } if (ue === 0) { break e } a.arraySet(re, ee, te, ue, ae);
                                ie -= ue;
                                te += ue;
                                se -= ue;
                                ae += ue;
                                t.length -= ue; break } t.mode = O;
                            break;
                        case M:
                            while (fe < 14) { if (ie === 0) { break e } ie--;
                                oe += ee[te++] << fe;
                                fe += 8 } t.nlen = (oe & 31) + 257;
                            oe >>>= 5;
                            fe -= 5;
                            t.ndist = (oe & 31) + 1;
                            oe >>>= 5;
                            fe -= 5;
                            t.ncode = (oe & 15) + 4;
                            oe >>>= 4;
                            fe -= 4;
                            if (t.nlen > 286 || t.ndist > 30) { e.msg = "too many length or distance symbols";
                                t.mode = Q; break } t.have = 0;
                            t.mode = U;
                        case U:
                            while (t.have < t.ncode) { while (fe < 3) { if (ie === 0) { break e } ie--;
                                    oe += ee[te++] << fe;
                                    fe += 8 } t.lens[Ie[t.have++]] = oe & 7;
                                oe >>>= 3;
                                fe -= 3 }
                            while (t.have < 19) { t.lens[Ie[t.have++]] = 0 } t.lencode = t.lendyn;
                            t.lenbits = 7;
                            Te = { bits: t.lenbits };
                            Ce = o(f, t.lens, 0, 19, t.lencode, 0, t.work, Te);
                            t.lenbits = Te.bits;
                            if (Ce) { e.msg = "invalid code lengths set";
                                t.mode = Q; break } t.have = 0;
                            t.mode = H;
                        case H:
                            while (t.have < t.nlen + t.ndist) { for (;;) { be = t.lencode[oe & (1 << t.lenbits) - 1];
                                    me = be >>> 24;
                                    ge = be >>> 16 & 255;
                                    Ee = be & 65535; if (me <= fe) { break } if (ie === 0) { break e } ie--;
                                    oe += ee[te++] << fe;
                                    fe += 8 } if (Ee < 16) { oe >>>= me;
                                    fe -= me;
                                    t.lens[t.have++] = Ee } else { if (Ee === 16) { xe = me + 2; while (fe < xe) { if (ie === 0) { break e } ie--;
                                            oe += ee[te++] << fe;
                                            fe += 8 } oe >>>= me;
                                        fe -= me; if (t.have === 0) { e.msg = "invalid bit length repeat";
                                            t.mode = Q; break } _e = t.lens[t.have - 1];
                                        ue = 3 + (oe & 3);
                                        oe >>>= 2;
                                        fe -= 2 } else if (Ee === 17) { xe = me + 3; while (fe < xe) { if (ie === 0) { break e } ie--;
                                            oe += ee[te++] << fe;
                                            fe += 8 } oe >>>= me;
                                        fe -= me;
                                        _e = 0;
                                        ue = 3 + (oe & 7);
                                        oe >>>= 3;
                                        fe -= 3 } else { xe = me + 7; while (fe < xe) { if (ie === 0) { break e } ie--;
                                            oe += ee[te++] << fe;
                                            fe += 8 } oe >>>= me;
                                        fe -= me;
                                        _e = 0;
                                        ue = 11 + (oe & 127);
                                        oe >>>= 7;
                                        fe -= 7 } if (t.have + ue > t.nlen + t.ndist) { e.msg = "invalid bit length repeat";
                                        t.mode = Q; break } while (ue--) { t.lens[t.have++] = _e } } }
                            if (t.mode === Q) { break }
                            if (t.lens[256] === 0) { e.msg = "invalid code -- missing end-of-block";
                                t.mode = Q; break } t.lenbits = 9;
                            Te = { bits: t.lenbits };
                            Ce = o(l, t.lens, 0, t.nlen, t.lencode, 0, t.work, Te);
                            t.lenbits = Te.bits;
                            if (Ce) { e.msg = "invalid literal/lengths set";
                                t.mode = Q; break } t.distbits = 6;
                            t.distcode = t.distdyn;
                            Te = { bits: t.distbits };
                            Ce = o(c, t.lens, t.nlen, t.ndist, t.distcode, 0, t.work, Te);
                            t.distbits = Te.bits;
                            if (Ce) { e.msg = "invalid distances set";
                                t.mode = Q; break } t.mode = W;
                            if (r === d) { break e };
                        case W:
                            t.mode = V;
                        case V:
                            if (ie >= 6 && se >= 258) { e.next_out = ae;
                                e.avail_out = se;
                                e.next_in = te;
                                e.avail_in = ie;
                                t.hold = oe;
                                t.bits = fe;
                                s(e, ce);
                                ae = e.next_out;
                                re = e.output;
                                se = e.avail_out;
                                te = e.next_in;
                                ee = e.input;
                                ie = e.avail_in;
                                oe = t.hold;
                                fe = t.bits; if (t.mode === O) { t.back = -1 } break } t.back = 0;
                            for (;;) { be = t.lencode[oe & (1 << t.lenbits) - 1];
                                me = be >>> 24;
                                ge = be >>> 16 & 255;
                                Ee = be & 65535; if (me <= fe) { break } if (ie === 0) { break e } ie--;
                                oe += ee[te++] << fe;
                                fe += 8 }
                            if (ge && (ge & 240) === 0) { ke = me;
                                we = ge;
                                Se = Ee; for (;;) { be = t.lencode[Se + ((oe & (1 << ke + we) - 1) >> ke)];
                                    me = be >>> 24;
                                    ge = be >>> 16 & 255;
                                    Ee = be & 65535; if (ke + me <= fe) { break } if (ie === 0) { break e } ie--;
                                    oe += ee[te++] << fe;
                                    fe += 8 } oe >>>= ke;
                                fe -= ke;
                                t.back += ke } oe >>>= me;
                            fe -= me;
                            t.back += me;
                            t.length = Ee;
                            if (ge === 0) { t.mode = K; break }
                            if (ge & 32) { t.back = -1;
                                t.mode = O; break }
                            if (ge & 64) { e.msg = "invalid literal/length code";
                                t.mode = Q; break } t.extra = ge & 15;
                            t.mode = z;
                        case z:
                            if (t.extra) { xe = t.extra; while (fe < xe) { if (ie === 0) { break e } ie--;
                                    oe += ee[te++] << fe;
                                    fe += 8 } t.length += oe & (1 << t.extra) - 1;
                                oe >>>= t.extra;
                                fe -= t.extra;
                                t.back += t.extra } t.was = t.length;
                            t.mode = X;
                        case X:
                            for (;;) { be = t.distcode[oe & (1 << t.distbits) - 1];
                                me = be >>> 24;
                                ge = be >>> 16 & 255;
                                Ee = be & 65535; if (me <= fe) { break } if (ie === 0) { break e } ie--;
                                oe += ee[te++] << fe;
                                fe += 8 }
                            if ((ge & 240) === 0) { ke = me;
                                we = ge;
                                Se = Ee; for (;;) { be = t.distcode[Se + ((oe & (1 << ke + we) - 1) >> ke)];
                                    me = be >>> 24;
                                    ge = be >>> 16 & 255;
                                    Ee = be & 65535; if (ke + me <= fe) { break } if (ie === 0) { break e } ie--;
                                    oe += ee[te++] << fe;
                                    fe += 8 } oe >>>= ke;
                                fe -= ke;
                                t.back += ke } oe >>>= me;
                            fe -= me;
                            t.back += me;
                            if (ge & 64) { e.msg = "invalid distance code";
                                t.mode = Q; break } t.offset = Ee;
                            t.extra = ge & 15;
                            t.mode = G;
                        case G:
                            if (t.extra) { xe = t.extra; while (fe < xe) { if (ie === 0) { break e } ie--;
                                    oe += ee[te++] << fe;
                                    fe += 8 } t.offset += oe & (1 << t.extra) - 1;
                                oe >>>= t.extra;
                                fe -= t.extra;
                                t.back += t.extra }
                            if (t.offset > t.dmax) { e.msg = "invalid distance too far back";
                                t.mode = Q; break } t.mode = j;
                        case j:
                            if (se === 0) { break e } ue = ce - se;
                            if (t.offset > ue) { ue = t.offset - ue; if (ue > t.whave) { if (t.sane) { e.msg = "invalid distance too far back";
                                        t.mode = Q; break } } if (ue > t.wnext) { ue -= t.wnext;
                                    he = t.wsize - ue } else { he = t.wnext - ue } if (ue > t.length) { ue = t.length } de = t.window } else { de = re;
                                he = ae - t.offset;
                                ue = t.length }
                            if (ue > se) { ue = se } se -= ue;
                            t.length -= ue;
                            do { re[ae++] = de[he++] } while (--ue);
                            if (t.length === 0) { t.mode = V }
                            break;
                        case K:
                            if (se === 0) { break e } re[ae++] = t.length;
                            se--;
                            t.mode = V;
                            break;
                        case Y:
                            if (t.wrap) { while (fe < 32) { if (ie === 0) { break e } ie--;
                                    oe |= ee[te++] << fe;
                                    fe += 8 } ce -= se;
                                e.total_out += ce;
                                t.total += ce; if (ce) { e.adler = t.check = t.flags ? i(t.check, re, ce, ae - ce) : n(t.check, re, ce, ae - ce) } ce = se; if ((t.flags ? oe : ne(oe)) !== t.check) { e.msg = "incorrect data check";
                                    t.mode = Q; break } oe = 0;
                                fe = 0 } t.mode = $;
                        case $:
                            if (t.wrap && t.flags) { while (fe < 32) { if (ie === 0) { break e } ie--;
                                    oe += ee[te++] << fe;
                                    fe += 8 } if (oe !== (t.total & 4294967295)) { e.msg = "incorrect length check";
                                    t.mode = Q; break } oe = 0;
                                fe = 0 } t.mode = Z;
                        case Z:
                            Ce = p;
                            break e;
                        case Q:
                            Ce = g;
                            break e;
                        case J:
                            return E;
                        case q:
                            ;
                        default:
                            return m;
                    }
                }
                e.next_out = ae;
                e.avail_out = se;
                e.next_in = te;
                e.avail_in = ie;
                t.hold = oe;
                t.bits = fe;
                if (t.wsize || ce !== e.avail_out && t.mode < Q && (t.mode < Y || r !== u)) { if (pe(e, e.output, e.next_out, ce - e.avail_out)) { t.mode = J; return E } } le -= e.avail_in;
                ce -= e.avail_out;
                e.total_in += le;
                e.total_out += ce;
                t.total += ce;
                if (t.wrap && ce) { e.adler = t.check = t.flags ? i(t.check, re, ce, e.next_out - ce) : n(t.check, re, ce, e.next_out - ce) } e.data_type = t.bits + (t.last ? 64 : 0) + (t.mode === O ? 128 : 0) + (t.mode === W || t.mode === N ? 256 : 0);
                if ((le === 0 && ce === 0 || r === u) && Ce === v) { Ce = k }
                return Ce
            }

            function me(e) { if (!e || !e.state) { return m } var r = e.state; if (r.window) { r.window = null } e.state = null; return v }

            function ge(e, r) { var t; if (!e || !e.state) { return m } t = e.state; if ((t.wrap & 2) === 0) { return m } t.head = r;
                r.done = false; return v } t.inflateReset = oe;
            t.inflateReset2 = fe;
            t.inflateResetKeep = se;
            t.inflateInit = ce;
            t.inflateInit2 = le;
            t.inflate = be;
            t.inflateEnd = me;
            t.inflateGetHeader = ge;
            t.inflateInfo = "pako inflate (from Nodeca project)"
        }, { "../utils/common": 27, "./adler32": 29, "./crc32": 31, "./inffast": 34, "./inftrees": 36 }],
        36: [function(e, r, t) { "use strict"; var a = e("../utils/common"); var n = 15; var i = 852; var s = 592; var o = 0; var f = 1; var l = 2; var c = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]; var u = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78]; var h = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0]; var d = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
            r.exports = function v(e, r, t, p, b, m, g, E) { var k = E.bits; var w = 0; var S = 0; var _ = 0,
                    C = 0; var B = 0; var T = 0; var x = 0; var I = 0; var A = 0; var y = 0; var R; var D; var O; var F; var P; var N = null; var L = 0; var M; var U = new a.Buf16(n + 1); var H = new a.Buf16(n + 1); var W = null; var V = 0; var z, X, G; for (w = 0; w <= n; w++) { U[w] = 0 } for (S = 0; S < p; S++) { U[r[t + S]]++ } B = k; for (C = n; C >= 1; C--) { if (U[C] !== 0) { break } } if (B > C) { B = C } if (C === 0) { b[m++] = 1 << 24 | 64 << 16 | 0;
                    b[m++] = 1 << 24 | 64 << 16 | 0;
                    E.bits = 1; return 0 } for (_ = 1; _ < C; _++) { if (U[_] !== 0) { break } } if (B < _) { B = _ } I = 1; for (w = 1; w <= n; w++) { I <<= 1;
                    I -= U[w]; if (I < 0) { return -1 } } if (I > 0 && (e === o || C !== 1)) { return -1 } H[1] = 0; for (w = 1; w < n; w++) { H[w + 1] = H[w] + U[w] } for (S = 0; S < p; S++) { if (r[t + S] !== 0) { g[H[r[t + S]]++] = S } } if (e === o) { N = W = g;
                    M = 19 } else if (e === f) { N = c;
                    L -= 257;
                    W = u;
                    V -= 257;
                    M = 256 } else { N = h;
                    W = d;
                    M = -1 } y = 0;
                S = 0;
                w = _;
                P = m;
                T = B;
                x = 0;
                O = -1;
                A = 1 << B;
                F = A - 1; if (e === f && A > i || e === l && A > s) { return 1 } var j = 0; for (;;) { j++;
                    z = w - x; if (g[S] < M) { X = 0;
                        G = g[S] } else if (g[S] > M) { X = W[V + g[S]];
                        G = N[L + g[S]] } else { X = 32 + 64;
                        G = 0 } R = 1 << w - x;
                    D = 1 << T;
                    _ = D;
                    do { D -= R;
                        b[P + (y >> x) + D] = z << 24 | X << 16 | G | 0 } while (D !== 0);
                    R = 1 << w - 1; while (y & R) { R >>= 1 } if (R !== 0) { y &= R - 1;
                        y += R } else { y = 0 } S++; if (--U[w] === 0) { if (w === C) { break } w = r[t + g[S]] } if (w > B && (y & F) !== O) { if (x === 0) { x = B } P += _;
                        T = w - x;
                        I = 1 << T; while (T + x < C) { I -= U[T + x]; if (I <= 0) { break } T++;
                            I <<= 1 } A += 1 << T; if (e === f && A > i || e === l && A > s) { return 1 } O = y & F;
                        b[O] = B << 24 | T << 16 | P - m | 0 } } if (y !== 0) { b[P + y] = w - x << 24 | 64 << 16 | 0 } E.bits = B; return 0 } }, { "../utils/common": 27 }],
        37: [function(e, r, t) { "use strict";
            r.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" } }, {}],
        38: [function(e, r, t) { "use strict"; var a = e("../utils/common"); var n = 4; var i = 0; var s = 1; var o = 2;

            function f(e) { var r = e.length; while (--r >= 0) { e[r] = 0 } } var l = 0; var c = 1; var u = 2; var h = 3; var d = 258; var v = 29; var p = 256; var b = p + 1 + v; var m = 30; var g = 19; var E = 2 * b + 1; var k = 15; var w = 16; var S = 7; var _ = 256; var C = 16; var B = 17; var T = 18; var x = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]; var I = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]; var A = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]; var y = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]; var R = 512; var D = new Array((b + 2) * 2);
            f(D); var O = new Array(m * 2);
            f(O); var F = new Array(R);
            f(F); var P = new Array(d - h + 1);
            f(P); var N = new Array(v);
            f(N); var L = new Array(m);
            f(L); var M = function(e, r, t, a, n) { this.static_tree = e;
                this.extra_bits = r;
                this.extra_base = t;
                this.elems = a;
                this.max_length = n;
                this.has_stree = e && e.length }; var U; var H; var W; var V = function(e, r) { this.dyn_tree = e;
                this.max_code = 0;
                this.stat_desc = r };

            function z(e) { return e < 256 ? F[e] : F[256 + (e >>> 7)] }

            function X(e, r) { e.pending_buf[e.pending++] = r & 255;
                e.pending_buf[e.pending++] = r >>> 8 & 255 }

            function G(e, r, t) { if (e.bi_valid > w - t) { e.bi_buf |= r << e.bi_valid & 65535;
                    X(e, e.bi_buf);
                    e.bi_buf = r >> w - e.bi_valid;
                    e.bi_valid += t - w } else { e.bi_buf |= r << e.bi_valid & 65535;
                    e.bi_valid += t } }

            function j(e, r, t) { G(e, t[r * 2], t[r * 2 + 1]) }

            function K(e, r) { var t = 0;
                do { t |= e & 1;
                    e >>>= 1;
                    t <<= 1 } while (--r > 0); return t >>> 1 }

            function Y(e) { if (e.bi_valid === 16) { X(e, e.bi_buf);
                    e.bi_buf = 0;
                    e.bi_valid = 0 } else if (e.bi_valid >= 8) { e.pending_buf[e.pending++] = e.bi_buf & 255;
                    e.bi_buf >>= 8;
                    e.bi_valid -= 8 } }

            function $(e, r) { var t = r.dyn_tree; var a = r.max_code; var n = r.stat_desc.static_tree; var i = r.stat_desc.has_stree; var s = r.stat_desc.extra_bits; var o = r.stat_desc.extra_base; var f = r.stat_desc.max_length; var l; var c, u; var h; var d; var v; var p = 0; for (h = 0; h <= k; h++) { e.bl_count[h] = 0 } t[e.heap[e.heap_max] * 2 + 1] = 0; for (l = e.heap_max + 1; l < E; l++) { c = e.heap[l];
                    h = t[t[c * 2 + 1] * 2 + 1] + 1; if (h > f) { h = f;
                        p++ } t[c * 2 + 1] = h; if (c > a) { continue } e.bl_count[h]++;
                    d = 0; if (c >= o) { d = s[c - o] } v = t[c * 2];
                    e.opt_len += v * (h + d); if (i) { e.static_len += v * (n[c * 2 + 1] + d) } } if (p === 0) { return } do { h = f - 1; while (e.bl_count[h] === 0) { h-- } e.bl_count[h]--;
                    e.bl_count[h + 1] += 2;
                    e.bl_count[f]--;
                    p -= 2 } while (p > 0); for (h = f; h !== 0; h--) { c = e.bl_count[h]; while (c !== 0) { u = e.heap[--l]; if (u > a) { continue } if (t[u * 2 + 1] !== h) { e.opt_len += (h - t[u * 2 + 1]) * t[u * 2];
                            t[u * 2 + 1] = h } c-- } } }

            function Z(e, r, t) { var a = new Array(k + 1); var n = 0; var i; var s; for (i = 1; i <= k; i++) { a[i] = n = n + t[i - 1] << 1 } for (s = 0; s <= r; s++) { var o = e[s * 2 + 1]; if (o === 0) { continue } e[s * 2] = K(a[o]++, o) } }

            function Q() { var e; var r; var t; var a; var n; var i = new Array(k + 1);
                t = 0; for (a = 0; a < v - 1; a++) { N[a] = t; for (e = 0; e < 1 << x[a]; e++) { P[t++] = a } } P[t - 1] = a;
                n = 0; for (a = 0; a < 16; a++) { L[a] = n; for (e = 0; e < 1 << I[a]; e++) { F[n++] = a } } n >>= 7; for (; a < m; a++) { L[a] = n << 7; for (e = 0; e < 1 << I[a] - 7; e++) { F[256 + n++] = a } } for (r = 0; r <= k; r++) { i[r] = 0 } e = 0; while (e <= 143) { D[e * 2 + 1] = 8;
                    e++;
                    i[8]++ } while (e <= 255) { D[e * 2 + 1] = 9;
                    e++;
                    i[9]++ } while (e <= 279) { D[e * 2 + 1] = 7;
                    e++;
                    i[7]++ } while (e <= 287) { D[e * 2 + 1] = 8;
                    e++;
                    i[8]++ } Z(D, b + 1, i); for (e = 0; e < m; e++) { O[e * 2 + 1] = 5;
                    O[e * 2] = K(e, 5) } U = new M(D, x, p + 1, b, k);
                H = new M(O, I, 0, m, k);
                W = new M(new Array(0), A, 0, g, S) }

            function J(e) { var r; for (r = 0; r < b; r++) { e.dyn_ltree[r * 2] = 0 } for (r = 0; r < m; r++) { e.dyn_dtree[r * 2] = 0 } for (r = 0; r < g; r++) { e.bl_tree[r * 2] = 0 } e.dyn_ltree[_ * 2] = 1;
                e.opt_len = e.static_len = 0;
                e.last_lit = e.matches = 0 }

            function q(e) { if (e.bi_valid > 8) { X(e, e.bi_buf) } else if (e.bi_valid > 0) { e.pending_buf[e.pending++] = e.bi_buf } e.bi_buf = 0;
                e.bi_valid = 0 }

            function ee(e, r, t, n) { q(e); if (n) { X(e, t);
                    X(e, ~t) } a.arraySet(e.pending_buf, e.window, r, t, e.pending);
                e.pending += t }

            function re(e, r, t, a) { var n = r * 2; var i = t * 2; return e[n] < e[i] || e[n] === e[i] && a[r] <= a[t] }

            function te(e, r, t) { var a = e.heap[t]; var n = t << 1; while (n <= e.heap_len) { if (n < e.heap_len && re(r, e.heap[n + 1], e.heap[n], e.depth)) { n++ } if (re(r, a, e.heap[n], e.depth)) { break } e.heap[t] = e.heap[n];
                    t = n;
                    n <<= 1 } e.heap[t] = a }

            function ae(e, r, t) { var a; var n; var i = 0; var s; var o; if (e.last_lit !== 0) { do { a = e.pending_buf[e.d_buf + i * 2] << 8 | e.pending_buf[e.d_buf + i * 2 + 1];
                        n = e.pending_buf[e.l_buf + i];
                        i++; if (a === 0) { j(e, n, r) } else { s = P[n];
                            j(e, s + p + 1, r);
                            o = x[s]; if (o !== 0) { n -= N[s];
                                G(e, n, o) } a--;
                            s = z(a);
                            j(e, s, t);
                            o = I[s]; if (o !== 0) { a -= L[s];
                                G(e, a, o) } } } while (i < e.last_lit) } j(e, _, r) }

            function ne(e, r) { var t = r.dyn_tree; var a = r.stat_desc.static_tree; var n = r.stat_desc.has_stree; var i = r.stat_desc.elems; var s, o; var f = -1; var l;
                e.heap_len = 0;
                e.heap_max = E; for (s = 0; s < i; s++) { if (t[s * 2] !== 0) { e.heap[++e.heap_len] = f = s;
                        e.depth[s] = 0 } else { t[s * 2 + 1] = 0 } } while (e.heap_len < 2) { l = e.heap[++e.heap_len] = f < 2 ? ++f : 0;
                    t[l * 2] = 1;
                    e.depth[l] = 0;
                    e.opt_len--; if (n) { e.static_len -= a[l * 2 + 1] } } r.max_code = f; for (s = e.heap_len >> 1; s >= 1; s--) { te(e, t, s) } l = i;
                do { s = e.heap[1];
                    e.heap[1] = e.heap[e.heap_len--];
                    te(e, t, 1);
                    o = e.heap[1];
                    e.heap[--e.heap_max] = s;
                    e.heap[--e.heap_max] = o;
                    t[l * 2] = t[s * 2] + t[o * 2];
                    e.depth[l] = (e.depth[s] >= e.depth[o] ? e.depth[s] : e.depth[o]) + 1;
                    t[s * 2 + 1] = t[o * 2 + 1] = l;
                    e.heap[1] = l++;
                    te(e, t, 1) } while (e.heap_len >= 2);
                e.heap[--e.heap_max] = e.heap[1];
                $(e, r);
                Z(t, f, e.bl_count) }

            function ie(e, r, t) { var a; var n = -1; var i; var s = r[0 * 2 + 1]; var o = 0; var f = 7; var l = 4; if (s === 0) { f = 138;
                    l = 3 } r[(t + 1) * 2 + 1] = 65535; for (a = 0; a <= t; a++) { i = s;
                    s = r[(a + 1) * 2 + 1]; if (++o < f && i === s) { continue } else if (o < l) { e.bl_tree[i * 2] += o } else if (i !== 0) { if (i !== n) { e.bl_tree[i * 2]++ } e.bl_tree[C * 2]++ } else if (o <= 10) { e.bl_tree[B * 2]++ } else { e.bl_tree[T * 2]++ } o = 0;
                    n = i; if (s === 0) { f = 138;
                        l = 3 } else if (i === s) { f = 6;
                        l = 3 } else { f = 7;
                        l = 4 } } }

            function se(e, r, t) { var a; var n = -1; var i; var s = r[0 * 2 + 1]; var o = 0; var f = 7; var l = 4; if (s === 0) { f = 138;
                    l = 3 } for (a = 0; a <= t; a++) { i = s;
                    s = r[(a + 1) * 2 + 1]; if (++o < f && i === s) { continue } else if (o < l) { do { j(e, i, e.bl_tree) } while (--o !== 0) } else if (i !== 0) { if (i !== n) { j(e, i, e.bl_tree);
                            o-- } j(e, C, e.bl_tree);
                        G(e, o - 3, 2) } else if (o <= 10) { j(e, B, e.bl_tree);
                        G(e, o - 3, 3) } else { j(e, T, e.bl_tree);
                        G(e, o - 11, 7) } o = 0;
                    n = i; if (s === 0) { f = 138;
                        l = 3 } else if (i === s) { f = 6;
                        l = 3 } else { f = 7;
                        l = 4 } } }

            function oe(e) { var r;
                ie(e, e.dyn_ltree, e.l_desc.max_code);
                ie(e, e.dyn_dtree, e.d_desc.max_code);
                ne(e, e.bl_desc); for (r = g - 1; r >= 3; r--) { if (e.bl_tree[y[r] * 2 + 1] !== 0) { break } } e.opt_len += 3 * (r + 1) + 5 + 5 + 4; return r }

            function fe(e, r, t, a) { var n;
                G(e, r - 257, 5);
                G(e, t - 1, 5);
                G(e, a - 4, 4); for (n = 0; n < a; n++) { G(e, e.bl_tree[y[n] * 2 + 1], 3) } se(e, e.dyn_ltree, r - 1);
                se(e, e.dyn_dtree, t - 1) }

            function le(e) { var r = 4093624447; var t; for (t = 0; t <= 31; t++, r >>>= 1) { if (r & 1 && e.dyn_ltree[t * 2] !== 0) { return i } } if (e.dyn_ltree[9 * 2] !== 0 || e.dyn_ltree[10 * 2] !== 0 || e.dyn_ltree[13 * 2] !== 0) { return s } for (t = 32; t < p; t++) { if (e.dyn_ltree[t * 2] !== 0) { return s } } return i } var ce = false;

            function ue(e) { if (!ce) { Q();
                    ce = true } e.l_desc = new V(e.dyn_ltree, U);
                e.d_desc = new V(e.dyn_dtree, H);
                e.bl_desc = new V(e.bl_tree, W);
                e.bi_buf = 0;
                e.bi_valid = 0;
                J(e) }

            function he(e, r, t, a) { G(e, (l << 1) + (a ? 1 : 0), 3);
                ee(e, r, t, true) }

            function de(e) { G(e, c << 1, 3);
                j(e, _, D);
                Y(e) }

            function ve(e, r, t, a) { var i, s; var f = 0; if (e.level > 0) { if (e.strm.data_type === o) { e.strm.data_type = le(e) } ne(e, e.l_desc);
                    ne(e, e.d_desc);
                    f = oe(e);
                    i = e.opt_len + 3 + 7 >>> 3;
                    s = e.static_len + 3 + 7 >>> 3; if (s <= i) { i = s } } else { i = s = t + 5 } if (t + 4 <= i && r !== -1) { he(e, r, t, a) } else if (e.strategy === n || s === i) { G(e, (c << 1) + (a ? 1 : 0), 3);
                    ae(e, D, O) } else { G(e, (u << 1) + (a ? 1 : 0), 3);
                    fe(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, f + 1);
                    ae(e, e.dyn_ltree, e.dyn_dtree) } J(e); if (a) { q(e) } }

            function pe(e, r, t) { e.pending_buf[e.d_buf + e.last_lit * 2] = r >>> 8 & 255;
                e.pending_buf[e.d_buf + e.last_lit * 2 + 1] = r & 255;
                e.pending_buf[e.l_buf + e.last_lit] = t & 255;
                e.last_lit++; if (r === 0) { e.dyn_ltree[t * 2]++ } else { e.matches++;
                    r--;
                    e.dyn_ltree[(P[t] + p + 1) * 2]++;
                    e.dyn_dtree[z(r) * 2]++ } return e.last_lit === e.lit_bufsize - 1 } t._tr_init = ue;
            t._tr_stored_block = he;
            t._tr_flush_block = ve;
            t._tr_tally = pe;
            t._tr_align = de }, { "../utils/common": 27 }],
        39: [function(e, r, t) { "use strict";

            function a() { this.input = null;
                this.next_in = 0;
                this.avail_in = 0;
                this.total_in = 0;
                this.output = null;
                this.next_out = 0;
                this.avail_out = 0;
                this.total_out = 0;
                this.msg = "";
                this.state = null;
                this.data_type = 2;
                this.adler = 0 } r.exports = a }, {}]
    }, {}, [9])(9)
});
var XLSX = {};
(function e(r) {
    r.version = "0.11.17";
    var t = 1200,
        a = 1252;
    if (typeof module !== "undefined" && typeof require !== "undefined") { if (typeof cptable === "undefined") global.cptable = undefined }
    var n = [874, 932, 936, 949, 950];
    for (var i = 0; i <= 8; ++i) n.push(1250 + i);
    var s = { 0: 1252, 1: 65001, 2: 65001, 77: 1e4, 128: 932, 129: 949, 130: 1361, 134: 936, 136: 950, 161: 1253, 162: 1254, 163: 1258, 177: 1255, 178: 1256, 186: 1257, 204: 1251, 222: 874, 238: 1250, 255: 1252, 69: 6969 };
    var o = function(e) { if (n.indexOf(e) == -1) return;
        a = s[0] = e };

    function f() { o(1252) }
    var l = function(e) { t = e;
        o(e) };

    function c() { l(1200);
        f() }

    function u(e) { var r = []; for (var t = 0, a = e.length; t < a; ++t) r[t] = e.charCodeAt(t); return r }

    function h(e) { var r = []; for (var t = 0; t < e.length >> 1; ++t) r[t] = String.fromCharCode(e.charCodeAt(2 * t) + (e.charCodeAt(2 * t + 1) << 8)); return r.join("") }

    function d(e) { var r = []; for (var t = 0; t < e.length >> 1; ++t) r[t] = String.fromCharCode(e.charCodeAt(2 * t + 1) + (e.charCodeAt(2 * t) << 8)); return r.join("") }
    var v = function(e) { var r = e.charCodeAt(0),
            t = e.charCodeAt(1); if (r == 255 && t == 254) return h(e.substr(2)); if (r == 254 && t == 255) return d(e.substr(2)); if (r == 65279) return e.substr(1); return e };
    var p = function Pb(e) { return String.fromCharCode(e) };
    if (typeof cptable !== "undefined") { l = function(e) { t = e };
        v = function(e) { if (e.charCodeAt(0) === 255 && e.charCodeAt(1) === 254) { return cptable.utils.decode(1200, u(e.substr(2))) } return e };
        p = function Nb(e) { if (t === 1200) return String.fromCharCode(e); return cptable.utils.decode(t, [e & 255, e >> 8])[0] } }
    var b = null;
    var m = true;
    var g = function Lb() { var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="; return { encode: function(r) { var t = ""; var a = 0,
                    n = 0,
                    i = 0,
                    s = 0,
                    o = 0,
                    f = 0,
                    l = 0; for (var c = 0; c < r.length;) { a = r.charCodeAt(c++);
                    n = r.charCodeAt(c++);
                    i = r.charCodeAt(c++);
                    s = a >> 2;
                    o = (a & 3) << 4 | n >> 4;
                    f = (n & 15) << 2 | i >> 6;
                    l = i & 63; if (isNaN(n)) { f = l = 64 } else if (isNaN(i)) { l = 64 } t += e.charAt(s) + e.charAt(o) + e.charAt(f) + e.charAt(l) } return t }, decode: function r(t) { var a = ""; var n = 0,
                    i = 0,
                    s = 0; var o = 0,
                    f = 0,
                    l = 0,
                    c = 0;
                t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); for (var u = 0; u < t.length;) { o = e.indexOf(t.charAt(u++));
                    f = e.indexOf(t.charAt(u++));
                    l = e.indexOf(t.charAt(u++));
                    c = e.indexOf(t.charAt(u++));
                    n = o << 2 | f >> 4;
                    i = (f & 15) << 4 | l >> 2;
                    s = (l & 3) << 6 | c;
                    a += String.fromCharCode(n); if (l !== 64) { a += String.fromCharCode(i) } if (c !== 64) { a += String.fromCharCode(s) } } return a } } }();
    var E = typeof Buffer !== "undefined" && typeof process !== "undefined" && typeof process.versions !== "undefined" && process.versions.node;

    function k(e) { return new(E ? Buffer : Array)(e) }

    function w(e) { if (E) return new Buffer(e, "binary"); return e.split("").map(function(e) { return e.charCodeAt(0) & 255 }) }

    function S(e) { if (typeof ArrayBuffer === "undefined") return w(e); var r = new ArrayBuffer(e.length),
            t = new Uint8Array(r); for (var a = 0; a != e.length; ++a) t[a] = e.charCodeAt(a) & 255; return r }

    function _(e) { if (Array.isArray(e)) return e.map(Ov).join(""); var r = []; for (var t = 0; t < e.length; ++t) r[t] = Ov(e[t]); return r.join("") }
    var C = function(e) { return [].concat.apply([], e) };
    var B = /\u0000/g,
        T = /[\u0001-\u0006]/g;
    var x = {};
    var I = function Mb(e) {
        e.version = "0.10.0";

        function r(e) { var r = "",
                t = e.length - 1; while (t >= 0) r += e.charAt(t--); return r }

        function t(e, r) { var t = ""; while (t.length < r) t += e; return t }

        function a(e, r) { var a = "" + e; return a.length >= r ? a : t("0", r - a.length) + a }

        function n(e, r) { var a = "" + e; return a.length >= r ? a : t(" ", r - a.length) + a }

        function i(e, r) { var a = "" + e; return a.length >= r ? a : a + t(" ", r - a.length) }

        function s(e, r) { var a = "" + Math.round(e); return a.length >= r ? a : t("0", r - a.length) + a }

        function o(e, r) { var a = "" + e; return a.length >= r ? a : t("0", r - a.length) + a }
        var f = Math.pow(2, 32);

        function l(e, r) { if (e > f || e < -f) return s(e, r); var t = Math.round(e); return o(t, r) }

        function c(e, r) { r = r || 0; return e.length >= 7 + r && (e.charCodeAt(r) | 32) === 103 && (e.charCodeAt(r + 1) | 32) === 101 && (e.charCodeAt(r + 2) | 32) === 110 && (e.charCodeAt(r + 3) | 32) === 101 && (e.charCodeAt(r + 4) | 32) === 114 && (e.charCodeAt(r + 5) | 32) === 97 && (e.charCodeAt(r + 6) | 32) === 108 }
        var u = [
            ["Sun", "Sunday"],
            ["Mon", "Monday"],
            ["Tue", "Tuesday"],
            ["Wed", "Wednesday"],
            ["Thu", "Thursday"],
            ["Fri", "Friday"],
            ["Sat", "Saturday"]
        ];
        var h = [
            ["J", "Jan", "January"],
            ["F", "Feb", "February"],
            ["M", "Mar", "March"],
            ["A", "Apr", "April"],
            ["M", "May", "May"],
            ["J", "Jun", "June"],
            ["J", "Jul", "July"],
            ["A", "Aug", "August"],
            ["S", "Sep", "September"],
            ["O", "Oct", "October"],
            ["N", "Nov", "November"],
            ["D", "Dec", "December"]
        ];

        function d(e) { e[0] = "General";
            e[1] = "0";
            e[2] = "0.00";
            e[3] = "#,##0";
            e[4] = "#,##0.00";
            e[9] = "0%";
            e[10] = "0.00%";
            e[11] = "0.00E+00";
            e[12] = "# ?/?";
            e[13] = "# ??/??";
            e[14] = "m/d/yy";
            e[15] = "d-mmm-yy";
            e[16] = "d-mmm";
            e[17] = "mmm-yy";
            e[18] = "h:mm AM/PM";
            e[19] = "h:mm:ss AM/PM";
            e[20] = "h:mm";
            e[21] = "h:mm:ss";
            e[22] = "m/d/yy h:mm";
            e[37] = "#,##0 ;(#,##0)";
            e[38] = "#,##0 ;[Red](#,##0)";
            e[39] = "#,##0.00;(#,##0.00)";
            e[40] = "#,##0.00;[Red](#,##0.00)";
            e[45] = "mm:ss";
            e[46] = "[h]:mm:ss";
            e[47] = "mmss.0";
            e[48] = "##0.0E+0";
            e[49] = "@";
            e[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "';
            e[65535] = "General" }
        var v = {};
        d(v);

        function p(e, r, t) { var a = e < 0 ? -1 : 1; var n = e * a; var i = 0,
                s = 1,
                o = 0; var f = 1,
                l = 0,
                c = 0; var u = Math.floor(n); while (l < r) { u = Math.floor(n);
                o = u * s + i;
                c = u * l + f; if (n - u < 5e-8) break;
                n = 1 / (n - u);
                i = s;
                s = o;
                f = l;
                l = c } if (c > r) { if (l > r) { c = f;
                    o = i } else { c = l;
                    o = s } } if (!t) return [0, a * o, c]; var h = Math.floor(a * o / c); return [h, a * o - h * c, c] }

        function b(e, r, t) { if (e > 2958465 || e < 0) return null; var a = e | 0,
                n = Math.floor(86400 * (e - a)),
                i = 0; var s = []; var o = { D: a, T: n, u: 86400 * (e - a) - n, y: 0, m: 0, d: 0, H: 0, M: 0, S: 0, q: 0 }; if (Math.abs(o.u) < 1e-6) o.u = 0; if (r && r.date1904) a += 1462; if (o.u > .9999) { o.u = 0; if (++n == 86400) { o.T = n = 0;++a;++o.D } } if (a === 60) { s = t ? [1317, 10, 29] : [1900, 2, 29];
                i = 3 } else if (a === 0) { s = t ? [1317, 8, 29] : [1900, 1, 0];
                i = 6 } else { if (a > 60) --a; var f = new Date(1900, 0, 1);
                f.setDate(f.getDate() + a - 1);
                s = [f.getFullYear(), f.getMonth() + 1, f.getDate()];
                i = f.getDay(); if (a < 60) i = (i + 6) % 7; if (t) i = C(f, s) } o.y = s[0];
            o.m = s[1];
            o.d = s[2];
            o.S = n % 60;
            n = Math.floor(n / 60);
            o.M = n % 60;
            n = Math.floor(n / 60);
            o.H = n;
            o.q = i; return o } e.parse_date_code = b;
        var m = new Date(1899, 11, 31, 0, 0, 0);
        var g = m.getTime();
        var E = new Date(1900, 2, 1, 0, 0, 0);

        function k(e, r) { var t = e.getTime(); if (r) t -= 1461 * 24 * 60 * 60 * 1e3;
            else if (e >= E) t += 24 * 60 * 60 * 1e3; return (t - (g + (e.getTimezoneOffset() - m.getTimezoneOffset()) * 6e4)) / (24 * 60 * 60 * 1e3) }

        function w(e) { return e.toString(10) } e._general_int = w;
        var S = function M() { var e = /\.(\d*[1-9])0+$/,
                r = /\.0*$/,
                t = /\.(\d*[1-9])0+/,
                a = /\.0*[Ee]/,
                n = /(E[+-])(\d)$/;

            function i(e) { var r = e < 0 ? 12 : 11; var t = f(e.toFixed(12)); if (t.length <= r) return t;
                t = e.toPrecision(10); if (t.length <= r) return t; return e.toExponential(5) }

            function s(r) { var t = r.toFixed(11).replace(e, ".$1"); if (t.length > (r < 0 ? 12 : 11)) t = r.toPrecision(6); return t }

            function o(e) { for (var r = 0; r != e.length; ++r)
                    if ((e.charCodeAt(r) | 32) === 101) return e.replace(t, ".$1").replace(a, "E").replace("e", "E").replace(n, "$10$2"); return e }

            function f(t) { return t.indexOf(".") > -1 ? t.replace(r, "").replace(e, ".$1") : t } return function l(e) { var r = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E),
                    t; if (r >= -4 && r <= -1) t = e.toPrecision(10 + r);
                else if (Math.abs(r) <= 9) t = i(e);
                else if (r === 10) t = e.toFixed(10).substr(0, 12);
                else t = s(e); return f(o(t)) } }();
        e._general_num = S;

        function _(e, r) { switch (typeof e) {
                case "string":
                    return e;
                case "boolean":
                    return e ? "TRUE" : "FALSE";
                case "number":
                    return (e | 0) === e ? w(e) : S(e);
                case "undefined":
                    return "";
                case "object":
                    if (e == null) return ""; if (e instanceof Date) return N(14, k(e, r && r.date1904), r); } throw new Error("unsupported value in General format: " + e) } e._general = _;

        function C() { return 0 }

        function B(e, r, t, n) { var i = "",
                s = 0,
                o = 0,
                f = t.y,
                l, c = 0; switch (e) {
                case 98:
                    f = t.y + 543;
                case 121:
                    switch (r.length) {
                        case 1:
                            ;
                        case 2:
                            l = f % 100;
                            c = 2; break;
                        default:
                            l = f % 1e4;
                            c = 4; break; } break;
                case 109:
                    switch (r.length) {
                        case 1:
                            ;
                        case 2:
                            l = t.m;
                            c = r.length; break;
                        case 3:
                            return h[t.m - 1][1];
                        case 5:
                            return h[t.m - 1][0];
                        default:
                            return h[t.m - 1][2]; } break;
                case 100:
                    switch (r.length) {
                        case 1:
                            ;
                        case 2:
                            l = t.d;
                            c = r.length; break;
                        case 3:
                            return u[t.q][0];
                        default:
                            return u[t.q][1]; } break;
                case 104:
                    switch (r.length) {
                        case 1:
                            ;
                        case 2:
                            l = 1 + (t.H + 11) % 12;
                            c = r.length; break;
                        default:
                            throw "bad hour format: " + r; } break;
                case 72:
                    switch (r.length) {
                        case 1:
                            ;
                        case 2:
                            l = t.H;
                            c = r.length; break;
                        default:
                            throw "bad hour format: " + r; } break;
                case 77:
                    switch (r.length) {
                        case 1:
                            ;
                        case 2:
                            l = t.M;
                            c = r.length; break;
                        default:
                            throw "bad minute format: " + r; } break;
                case 115:
                    if (r != "s" && r != "ss" && r != ".0" && r != ".00" && r != ".000") throw "bad second format: " + r; if (t.u === 0 && (r == "s" || r == "ss")) return a(t.S, r.length); if (n >= 2) o = n === 3 ? 1e3 : 100;
                    else o = n === 1 ? 10 : 1;
                    s = Math.round(o * (t.S + t.u)); if (s >= 60 * o) s = 0; if (r === "s") return s === 0 ? "0" : "" + s / o;
                    i = a(s, 2 + n); if (r === "ss") return i.substr(0, 2); return "." + i.substr(2, r.length - 1);
                case 90:
                    switch (r) {
                        case "[h]":
                            ;
                        case "[hh]":
                            l = t.D * 24 + t.H; break;
                        case "[m]":
                            ;
                        case "[mm]":
                            l = (t.D * 24 + t.H) * 60 + t.M; break;
                        case "[s]":
                            ;
                        case "[ss]":
                            l = ((t.D * 24 + t.H) * 60 + t.M) * 60 + Math.round(t.S + t.u); break;
                        default:
                            throw "bad abstime format: " + r; } c = r.length === 3 ? 1 : 2; break;
                case 101:
                    l = f;
                    c = 1; } if (c > 0) return a(l, c);
            else return "" }

        function T(e) { var r = 3; if (e.length <= r) return e; var t = e.length % r,
                a = e.substr(0, t); for (; t != e.length; t += r) a += (a.length > 0 ? "," : "") + e.substr(t, r); return a }
        var x = function U() {
            var e = /%/g;

            function s(r, a, n) { var i = a.replace(e, ""),
                    s = a.length - i.length; return x(r, i, n * Math.pow(10, 2 * s)) + t("%", s) }

            function o(e, r, t) { var a = r.length - 1; while (r.charCodeAt(a - 1) === 44) --a; return x(e, r.substr(0, a), t / Math.pow(10, 3 * (r.length - a))) }

            function f(e, r) { var t; var a = e.indexOf("E") - e.indexOf(".") - 1; if (e.match(/^#+0.0E\+0$/)) { if (r == 0) return "0.0E+0";
                    else if (r < 0) return "-" + f(e, -r); var n = e.indexOf("."); if (n === -1) n = e.indexOf("E"); var i = Math.floor(Math.log(r) * Math.LOG10E) % n; if (i < 0) i += n;
                    t = (r / Math.pow(10, i)).toPrecision(a + 1 + (n + i) % n); if (t.indexOf("e") === -1) { var s = Math.floor(Math.log(r) * Math.LOG10E); if (t.indexOf(".") === -1) t = t.charAt(0) + "." + t.substr(1) + "E+" + (s - t.length + i);
                        else t += "E+" + (s - i); while (t.substr(0, 2) === "0.") { t = t.charAt(0) + t.substr(2, n) + "." + t.substr(2 + n);
                            t = t.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.") } t = t.replace(/\+-/, "-") } t = t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(e, r, t, a) { return r + t + a.substr(0, (n + i) % n) + "." + a.substr(i) + "E" }) } else t = r.toExponential(a); if (e.match(/E\+00$/) && t.match(/e[+-]\d$/)) t = t.substr(0, t.length - 1) + "0" + t.charAt(t.length - 1); if (e.match(/E\-/) && t.match(/e\+/)) t = t.replace(/e\+/, "e"); return t.replace("e", "E") }
            var c = /# (\?+)( ?)\/( ?)(\d+)/;

            function u(e, r, i) { var s = parseInt(e[4], 10),
                    o = Math.round(r * s),
                    f = Math.floor(o / s); var l = o - f * s,
                    c = s; return i + (f === 0 ? "" : "" + f) + " " + (l === 0 ? t(" ", e[1].length + 1 + e[4].length) : n(l, e[1].length) + e[2] + "/" + e[3] + a(c, e[4].length)) }

            function h(e, r, a) { return a + (r === 0 ? "" : "" + r) + t(" ", e[1].length + 2 + e[4].length) }
            var d = /^#*0*\.([0#]+)/;
            var v = /\).*[0#]/;
            var b = /\(###\) ###\\?-####/;

            function m(e) { var r = "",
                    t; for (var a = 0; a != e.length; ++a) switch (t = e.charCodeAt(a)) {
                    case 35:
                        break;
                    case 63:
                        r += " "; break;
                    case 48:
                        r += "0"; break;
                    default:
                        r += String.fromCharCode(t); }
                return r }

            function g(e, r) { var t = Math.pow(10, r); return "" + Math.round(e * t) / t }

            function E(e, r) { if (r < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, r))).length) { return 0 } return Math.round((e - Math.floor(e)) * Math.pow(10, r)) }

            function k(e, r) { if (r < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, r))).length) { return 1 } return 0 }

            function w(e) { if (e < 2147483647 && e > -2147483648) return "" + (e >= 0 ? e | 0 : e - 1 | 0); return "" + Math.floor(e) }

            function S(e, h, _) { if (e.charCodeAt(0) === 40 && !h.match(v)) { var C = h.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, ""); if (_ >= 0) return S("n", C, _); return "(" + S("n", C, -_) + ")" } if (h.charCodeAt(h.length - 1) === 44) return o(e, h, _); if (h.indexOf("%") !== -1) return s(e, h, _); if (h.indexOf("E") !== -1) return f(h, _); if (h.charCodeAt(0) === 36) return "$" + S(e, h.substr(h.charAt(1) == " " ? 2 : 1), _); var B; var I, A, y, R = Math.abs(_),
                    D = _ < 0 ? "-" : ""; if (h.match(/^00+$/)) return D + l(R, h.length); if (h.match(/^[#?]+$/)) { B = l(_, 0); if (B === "0") B = ""; return B.length > h.length ? B : m(h.substr(0, h.length - B.length)) + B } if (I = h.match(c)) return u(I, R, D); if (h.match(/^#+0+$/)) return D + l(R, h.length - h.indexOf("0")); if (I = h.match(d)) { B = g(_, I[1].length).replace(/^([^\.]+)$/, "$1." + m(I[1])).replace(/\.$/, "." + m(I[1])).replace(/\.(\d*)$/, function(e, r) { return "." + r + t("0", m(I[1]).length - r.length) }); return h.indexOf("0.") !== -1 ? B : B.replace(/^0\./, ".") } h = h.replace(/^#+([0.])/, "$1"); if (I = h.match(/^(0*)\.(#*)$/)) { return D + g(R, I[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, I[1].length ? "0." : ".") } if (I = h.match(/^#{1,3},##0(\.?)$/)) return D + T(l(R, 0)); if (I = h.match(/^#,##0\.([#0]*0)$/)) { return _ < 0 ? "-" + S(e, h, -_) : T("" + (Math.floor(_) + k(_, I[1].length))) + "." + a(E(_, I[1].length), I[1].length) } if (I = h.match(/^#,#*,#0/)) return S(e, h.replace(/^#,#*,/, ""), _); if (I = h.match(/^([0#]+)(\\?-([0#]+))+$/)) { B = r(S(e, h.replace(/[\\-]/g, ""), _));
                    A = 0; return r(r(h.replace(/\\/g, "")).replace(/[0#]/g, function(e) { return A < B.length ? B.charAt(A++) : e === "0" ? "0" : "" })) } if (h.match(b)) { B = S(e, "##########", _); return "(" + B.substr(0, 3) + ") " + B.substr(3, 3) + "-" + B.substr(6) } var O = ""; if (I = h.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)) { A = Math.min(I[4].length, 7);
                    y = p(R, Math.pow(10, A) - 1, false);
                    B = "" + D;
                    O = x("n", I[1], y[1]); if (O.charAt(O.length - 1) == " ") O = O.substr(0, O.length - 1) + "0";
                    B += O + I[2] + "/" + I[3];
                    O = i(y[2], A); if (O.length < I[4].length) O = m(I[4].substr(I[4].length - O.length)) + O;
                    B += O; return B } if (I = h.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)) { A = Math.min(Math.max(I[1].length, I[4].length), 7);
                    y = p(R, Math.pow(10, A) - 1, true); return D + (y[0] || (y[1] ? "" : "0")) + " " + (y[1] ? n(y[1], A) + I[2] + "/" + I[3] + i(y[2], A) : t(" ", 2 * A + 1 + I[2].length + I[3].length)) } if (I = h.match(/^[#0?]+$/)) { B = l(_, 0); if (h.length <= B.length) return B; return m(h.substr(0, h.length - B.length)) + B } if (I = h.match(/^([#0?]+)\.([#0]+)$/)) { B = "" + _.toFixed(Math.min(I[2].length, 10)).replace(/([^0])0+$/, "$1");
                    A = B.indexOf("."); var F = h.indexOf(".") - A,
                        P = h.length - B.length - F; return m(h.substr(0, F) + B + h.substr(h.length - P)) } if (I = h.match(/^00,000\.([#0]*0)$/)) { A = E(_, I[1].length); return _ < 0 ? "-" + S(e, h, -_) : T(w(_)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(e) { return "00," + (e.length < 3 ? a(0, 3 - e.length) : "") + e }) + "." + a(A, I[1].length) } switch (h) {
                    case "###,##0.00":
                        return S(e, "#,##0.00", _);
                    case "###,###":
                        ;
                    case "##,###":
                        ;
                    case "#,###":
                        var N = T(l(R, 0)); return N !== "0" ? D + N : "";
                    case "###,###.00":
                        return S(e, "###,##0.00", _).replace(/^0\./, ".");
                    case "#,###.00":
                        return S(e, "#,##0.00", _).replace(/^0\./, ".");
                    default:
                        ; } throw new Error("unsupported format |" + h + "|") }

            function _(e, r, t) { var a = r.length - 1; while (r.charCodeAt(a - 1) === 44) --a; return x(e, r.substr(0, a), t / Math.pow(10, 3 * (r.length - a))) }

            function C(r, a, n) { var i = a.replace(e, ""),
                    s = a.length - i.length; return x(r, i, n * Math.pow(10, 2 * s)) + t("%", s) }

            function B(e, r) { var t; var a = e.indexOf("E") - e.indexOf(".") - 1; if (e.match(/^#+0.0E\+0$/)) { if (r == 0) return "0.0E+0";
                    else if (r < 0) return "-" + B(e, -r); var n = e.indexOf("."); if (n === -1) n = e.indexOf("E"); var i = Math.floor(Math.log(r) * Math.LOG10E) % n; if (i < 0) i += n;
                    t = (r / Math.pow(10, i)).toPrecision(a + 1 + (n + i) % n); if (!t.match(/[Ee]/)) { var s = Math.floor(Math.log(r) * Math.LOG10E); if (t.indexOf(".") === -1) t = t.charAt(0) + "." + t.substr(1) + "E+" + (s - t.length + i);
                        else t += "E+" + (s - i);
                        t = t.replace(/\+-/, "-") } t = t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(e, r, t, a) { return r + t + a.substr(0, (n + i) % n) + "." + a.substr(i) + "E" }) } else t = r.toExponential(a); if (e.match(/E\+00$/) && t.match(/e[+-]\d$/)) t = t.substr(0, t.length - 1) + "0" + t.charAt(t.length - 1); if (e.match(/E\-/) && t.match(/e\+/)) t = t.replace(/e\+/, "e"); return t.replace("e", "E") }

            function I(e, s, o) {
                if (e.charCodeAt(0) === 40 && !s.match(v)) { var f = s.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, ""); if (o >= 0) return I("n", f, o); return "(" + I("n", f, -o) + ")" }
                if (s.charCodeAt(s.length - 1) === 44) return _(e, s, o);
                if (s.indexOf("%") !== -1) return C(e, s, o);
                if (s.indexOf("E") !== -1) return B(s, o);
                if (s.charCodeAt(0) === 36) return "$" + I(e, s.substr(s.charAt(1) == " " ? 2 : 1), o);
                var l;
                var u, g, E, k = Math.abs(o),
                    w = o < 0 ? "-" : "";
                if (s.match(/^00+$/)) return w + a(k, s.length);
                if (s.match(/^[#?]+$/)) { l = "" + o; if (o === 0) l = ""; return l.length > s.length ? l : m(s.substr(0, s.length - l.length)) + l }
                if (u = s.match(c)) return h(u, k, w);
                if (s.match(/^#+0+$/)) return w + a(k, s.length - s.indexOf("0"));
                if (u = s.match(d)) { l = ("" + o).replace(/^([^\.]+)$/, "$1." + m(u[1])).replace(/\.$/, "." + m(u[1]));
                    l = l.replace(/\.(\d*)$/, function(e, r) { return "." + r + t("0", m(u[1]).length - r.length) }); return s.indexOf("0.") !== -1 ? l : l.replace(/^0\./, ".") } s = s.replace(/^#+([0.])/, "$1");
                if (u = s.match(/^(0*)\.(#*)$/)) { return w + ("" + k).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, u[1].length ? "0." : ".") }
                if (u = s.match(/^#{1,3},##0(\.?)$/)) return w + T("" + k);
                if (u = s.match(/^#,##0\.([#0]*0)$/)) { return o < 0 ? "-" + I(e, s, -o) : T("" + o) + "." + t("0", u[1].length) }
                if (u = s.match(/^#,#*,#0/)) return I(e, s.replace(/^#,#*,/, ""), o);
                if (u = s.match(/^([0#]+)(\\?-([0#]+))+$/)) { l = r(I(e, s.replace(/[\\-]/g, ""), o));
                    g = 0; return r(r(s.replace(/\\/g, "")).replace(/[0#]/g, function(e) { return g < l.length ? l.charAt(g++) : e === "0" ? "0" : "" })) }
                if (s.match(b)) {
                    l = I(e, "##########", o);
                    return "(" + l.substr(0, 3) + ") " + l.substr(3, 3) + "-" + l.substr(6)
                }
                var S = "";
                if (u = s.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)) { g = Math.min(u[4].length, 7);
                    E = p(k, Math.pow(10, g) - 1, false);
                    l = "" + w;
                    S = x("n", u[1], E[1]); if (S.charAt(S.length - 1) == " ") S = S.substr(0, S.length - 1) + "0";
                    l += S + u[2] + "/" + u[3];
                    S = i(E[2], g); if (S.length < u[4].length) S = m(u[4].substr(u[4].length - S.length)) + S;
                    l += S; return l }
                if (u = s.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)) { g = Math.min(Math.max(u[1].length, u[4].length), 7);
                    E = p(k, Math.pow(10, g) - 1, true); return w + (E[0] || (E[1] ? "" : "0")) + " " + (E[1] ? n(E[1], g) + u[2] + "/" + u[3] + i(E[2], g) : t(" ", 2 * g + 1 + u[2].length + u[3].length)) }
                if (u = s.match(/^[#0?]+$/)) { l = "" + o; if (s.length <= l.length) return l; return m(s.substr(0, s.length - l.length)) + l }
                if (u = s.match(/^([#0]+)\.([#0]+)$/)) { l = "" + o.toFixed(Math.min(u[2].length, 10)).replace(/([^0])0+$/, "$1");
                    g = l.indexOf("."); var A = s.indexOf(".") - g,
                        y = s.length - l.length - A; return m(s.substr(0, A) + l + s.substr(s.length - y)) }
                if (u = s.match(/^00,000\.([#0]*0)$/)) { return o < 0 ? "-" + I(e, s, -o) : T("" + o).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(e) { return "00," + (e.length < 3 ? a(0, 3 - e.length) : "") + e }) + "." + a(0, u[1].length) }
                switch (s) {
                    case "###,###":
                        ;
                    case "##,###":
                        ;
                    case "#,###":
                        var R = T("" + k); return R !== "0" ? w + R : "";
                    default:
                        if (s.match(/\.[0#?]*$/)) return I(e, s.slice(0, s.lastIndexOf(".")), o) + m(s.slice(s.lastIndexOf("."))); }
                throw new Error("unsupported format |" + s + "|")
            }
            return function A(e, r, t) { return (t | 0) === t ? I(e, r, t) : S(e, r, t) }
        }();

        function I(e) { var r = []; var t = false; for (var a = 0, n = 0; a < e.length; ++a) switch (e.charCodeAt(a)) {
                case 34:
                    t = !t; break;
                case 95:
                    ;
                case 42:
                    ;
                case 92:
                    ++a; break;
                case 59:
                    r[r.length] = e.substr(n, a - n);
                    n = a + 1; } r[r.length] = e.substr(n); if (t === true) throw new Error("Format |" + e + "| unterminated string "); return r } e._split = I;
        var A = /\[[HhMmSs]*\]/;

        function y(e) { var r = 0,
                t = "",
                a = ""; while (r < e.length) { switch (t = e.charAt(r)) {
                    case "G":
                        if (c(e, r)) r += 6;
                        r++; break;
                    case '"':
                        for (; e.charCodeAt(++r) !== 34 && r < e.length;) ++r;++r; break;
                    case "\\":
                        r += 2; break;
                    case "_":
                        r += 2; break;
                    case "@":
                        ++r; break;
                    case "B":
                        ;
                    case "b":
                        if (e.charAt(r + 1) === "1" || e.charAt(r + 1) === "2") return true;
                    case "M":
                        ;
                    case "D":
                        ;
                    case "Y":
                        ;
                    case "H":
                        ;
                    case "S":
                        ;
                    case "E":
                        ;
                    case "m":
                        ;
                    case "d":
                        ;
                    case "y":
                        ;
                    case "h":
                        ;
                    case "s":
                        ;
                    case "e":
                        ;
                    case "g":
                        return true;
                    case "A":
                        ;
                    case "a":
                        if (e.substr(r, 3).toUpperCase() === "A/P") return true; if (e.substr(r, 5).toUpperCase() === "AM/PM") return true;++r; break;
                    case "[":
                        a = t; while (e.charAt(r++) !== "]" && r < e.length) a += e.charAt(r); if (a.match(A)) return true; break;
                    case ".":
                        ;
                    case "0":
                        ;
                    case "#":
                        while (r < e.length && ("0#?.,E+-%".indexOf(t = e.charAt(++r)) > -1 || t == "\\" && e.charAt(r + 1) == "-" && "0#".indexOf(e.charAt(r + 2)) > -1)) {} break;
                    case "?":
                        while (e.charAt(++r) === t) {} break;
                    case "*":
                        ++r; if (e.charAt(r) == " " || e.charAt(r) == "*") ++r; break;
                    case "(":
                        ;
                    case ")":
                        ++r; break;
                    case "1":
                        ;
                    case "2":
                        ;
                    case "3":
                        ;
                    case "4":
                        ;
                    case "5":
                        ;
                    case "6":
                        ;
                    case "7":
                        ;
                    case "8":
                        ;
                    case "9":
                        while (r < e.length && "0123456789".indexOf(e.charAt(++r)) > -1) {} break;
                    case " ":
                        ++r; break;
                    default:
                        ++r; break; } } return false } e.is_date = y;

        function R(e, r, t, a) { var n = [],
                i = "",
                s = 0,
                o = "",
                f = "t",
                l, u, h; var d = "H"; while (s < e.length) { switch (o = e.charAt(s)) {
                    case "G":
                        if (!c(e, s)) throw new Error("unrecognized character " + o + " in " + e);
                        n[n.length] = { t: "G", v: "General" };
                        s += 7; break;
                    case '"':
                        for (i = "";
                            (h = e.charCodeAt(++s)) !== 34 && s < e.length;) i += String.fromCharCode(h);
                        n[n.length] = { t: "t", v: i };++s; break;
                    case "\\":
                        var v = e.charAt(++s),
                            p = v === "(" || v === ")" ? v : "t";
                        n[n.length] = { t: p, v: v };++s; break;
                    case "_":
                        n[n.length] = { t: "t", v: " " };
                        s += 2; break;
                    case "@":
                        n[n.length] = { t: "T", v: r };++s; break;
                    case "B":
                        ;
                    case "b":
                        if (e.charAt(s + 1) === "1" || e.charAt(s + 1) === "2") { if (l == null) { l = b(r, t, e.charAt(s + 1) === "2"); if (l == null) return "" } n[n.length] = { t: "X", v: e.substr(s, 2) };
                            f = o;
                            s += 2; break };
                    case "M":
                        ;
                    case "D":
                        ;
                    case "Y":
                        ;
                    case "H":
                        ;
                    case "S":
                        ;
                    case "E":
                        o = o.toLowerCase();
                    case "m":
                        ;
                    case "d":
                        ;
                    case "y":
                        ;
                    case "h":
                        ;
                    case "s":
                        ;
                    case "e":
                        ;
                    case "g":
                        if (r < 0) return ""; if (l == null) { l = b(r, t); if (l == null) return "" } i = o; while (++s < e.length && e.charAt(s).toLowerCase() === o) i += o; if (o === "m" && f.toLowerCase() === "h") o = "M"; if (o === "h") o = d;
                        n[n.length] = { t: o, v: i };
                        f = o; break;
                    case "A":
                        ;
                    case "a":
                        var m = { t: o, v: o }; if (l == null) l = b(r, t); if (e.substr(s, 3).toUpperCase() === "A/P") { if (l != null) m.v = l.H >= 12 ? "P" : "A";
                            m.t = "T";
                            d = "h";
                            s += 3 } else if (e.substr(s, 5).toUpperCase() === "AM/PM") { if (l != null) m.v = l.H >= 12 ? "PM" : "AM";
                            m.t = "T";
                            s += 5;
                            d = "h" } else { m.t = "t";++s } if (l == null && m.t === "T") return "";
                        n[n.length] = m;
                        f = o; break;
                    case "[":
                        i = o; while (e.charAt(s++) !== "]" && s < e.length) i += e.charAt(s); if (i.slice(-1) !== "]") throw 'unterminated "[" block: |' + i + "|"; if (i.match(A)) { if (l == null) { l = b(r, t); if (l == null) return "" } n[n.length] = { t: "Z", v: i.toLowerCase() };
                            f = i.charAt(1) } else if (i.indexOf("$") > -1) { i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$"; if (!y(e)) n[n.length] = { t: "t", v: i } } break;
                    case ".":
                        if (l != null) { i = o; while (++s < e.length && (o = e.charAt(s)) === "0") i += o;
                            n[n.length] = { t: "s", v: i }; break };
                    case "0":
                        ;
                    case "#":
                        i = o; while (++s < e.length && "0#?.,E+-%".indexOf(o = e.charAt(s)) > -1 || o == "\\" && e.charAt(s + 1) == "-" && s < e.length - 2 && "0#".indexOf(e.charAt(s + 2)) > -1) i += o;
                        n[n.length] = { t: "n", v: i }; break;
                    case "?":
                        i = o; while (e.charAt(++s) === o) i += o;
                        n[n.length] = { t: o, v: i };
                        f = o; break;
                    case "*":
                        ++s; if (e.charAt(s) == " " || e.charAt(s) == "*") ++s; break;
                    case "(":
                        ;
                    case ")":
                        n[n.length] = { t: a === 1 ? "t" : o, v: o };++s; break;
                    case "1":
                        ;
                    case "2":
                        ;
                    case "3":
                        ;
                    case "4":
                        ;
                    case "5":
                        ;
                    case "6":
                        ;
                    case "7":
                        ;
                    case "8":
                        ;
                    case "9":
                        i = o; while (s < e.length && "0123456789".indexOf(e.charAt(++s)) > -1) i += e.charAt(s);
                        n[n.length] = { t: "D", v: i }; break;
                    case " ":
                        n[n.length] = { t: o, v: o };++s; break;
                    default:
                        if (",$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP".indexOf(o) === -1) throw new Error("unrecognized character " + o + " in " + e);
                        n[n.length] = { t: "t", v: o };++s; break; } } var g = 0,
                E = 0,
                k; for (s = n.length - 1, f = "t"; s >= 0; --s) { switch (n[s].t) {
                    case "h":
                        ;
                    case "H":
                        n[s].t = d;
                        f = "h"; if (g < 1) g = 1; break;
                    case "s":
                        if (k = n[s].v.match(/\.0+$/)) E = Math.max(E, k[0].length - 1); if (g < 3) g = 3;
                    case "d":
                        ;
                    case "y":
                        ;
                    case "M":
                        ;
                    case "e":
                        f = n[s].t; break;
                    case "m":
                        if (f === "s") { n[s].t = "M"; if (g < 2) g = 2 } break;
                    case "X":
                        break;
                    case "Z":
                        if (g < 1 && n[s].v.match(/[Hh]/)) g = 1; if (g < 2 && n[s].v.match(/[Mm]/)) g = 2; if (g < 3 && n[s].v.match(/[Ss]/)) g = 3; } } switch (g) {
                case 0:
                    break;
                case 1:
                    if (l.u >= .5) { l.u = 0;++l.S } if (l.S >= 60) { l.S = 0;++l.M } if (l.M >= 60) { l.M = 0;++l.H } break;
                case 2:
                    if (l.u >= .5) { l.u = 0;++l.S } if (l.S >= 60) { l.S = 0;++l.M } break; } var w = "",
                S; for (s = 0; s < n.length; ++s) { switch (n[s].t) {
                    case "t":
                        ;
                    case "T":
                        ;
                    case " ":
                        ;
                    case "D":
                        break;
                    case "X":
                        n[s].v = "";
                        n[s].t = ";"; break;
                    case "d":
                        ;
                    case "m":
                        ;
                    case "y":
                        ;
                    case "h":
                        ;
                    case "H":
                        ;
                    case "M":
                        ;
                    case "s":
                        ;
                    case "e":
                        ;
                    case "b":
                        ;
                    case "Z":
                        n[s].v = B(n[s].t.charCodeAt(0), n[s].v, l, E);
                        n[s].t = "t"; break;
                    case "n":
                        ;
                    case "(":
                        ;
                    case "?":
                        S = s + 1; while (n[S] != null && ((o = n[S].t) === "?" || o === "D" || (o === " " || o === "t") && n[S + 1] != null && (n[S + 1].t === "?" || n[S + 1].t === "t" && n[S + 1].v === "/") || n[s].t === "(" && (o === " " || o === "n" || o === ")") || o === "t" && (n[S].v === "/" || n[S].v === " " && n[S + 1] != null && n[S + 1].t == "?"))) { n[s].v += n[S].v;
                            n[S] = { v: "", t: ";" };++S } w += n[s].v;
                        s = S - 1; break;
                    case "G":
                        n[s].t = "t";
                        n[s].v = _(r, t); break; } } var C = "",
                T, I; if (w.length > 0) { if (w.charCodeAt(0) == 40) { T = r < 0 && w.charCodeAt(0) === 45 ? -r : r;
                    I = x("(", w, T) } else { T = r < 0 && a > 1 ? -r : r;
                    I = x("n", w, T); if (T < 0 && n[0] && n[0].t == "t") { I = I.substr(1);
                        n[0].v = "-" + n[0].v } } S = I.length - 1; var R = n.length; for (s = 0; s < n.length; ++s)
                    if (n[s] != null && n[s].t != "t" && n[s].v.indexOf(".") > -1) { R = s; break }
                var D = n.length; if (R === n.length && I.indexOf("E") === -1) { for (s = n.length - 1; s >= 0; --s) { if (n[s] == null || "n?(".indexOf(n[s].t) === -1) continue; if (S >= n[s].v.length - 1) { S -= n[s].v.length;
                            n[s].v = I.substr(S + 1, n[s].v.length) } else if (S < 0) n[s].v = "";
                        else { n[s].v = I.substr(0, S + 1);
                            S = -1 } n[s].t = "t";
                        D = s } if (S >= 0 && D < n.length) n[D].v = I.substr(0, S + 1) + n[D].v } else if (R !== n.length && I.indexOf("E") === -1) { S = I.indexOf(".") - 1; for (s = R; s >= 0; --s) { if (n[s] == null || "n?(".indexOf(n[s].t) === -1) continue;
                        u = n[s].v.indexOf(".") > -1 && s === R ? n[s].v.indexOf(".") - 1 : n[s].v.length - 1;
                        C = n[s].v.substr(u + 1); for (; u >= 0; --u) { if (S >= 0 && (n[s].v.charAt(u) === "0" || n[s].v.charAt(u) === "#")) C = I.charAt(S--) + C } n[s].v = C;
                        n[s].t = "t";
                        D = s } if (S >= 0 && D < n.length) n[D].v = I.substr(0, S + 1) + n[D].v;
                    S = I.indexOf(".") + 1; for (s = R; s < n.length; ++s) { if (n[s] == null || "n?(".indexOf(n[s].t) === -1 && s !== R) continue;
                        u = n[s].v.indexOf(".") > -1 && s === R ? n[s].v.indexOf(".") + 1 : 0;
                        C = n[s].v.substr(0, u); for (; u < n[s].v.length; ++u) { if (S < I.length) C += I.charAt(S++) } n[s].v = C;
                        n[s].t = "t";
                        D = s } } } for (s = 0; s < n.length; ++s)
                if (n[s] != null && "n(?".indexOf(n[s].t) > -1) { T = a > 1 && r < 0 && s > 0 && n[s - 1].v === "-" ? -r : r;
                    n[s].v = x(n[s].t, n[s].v, T);
                    n[s].t = "t" }
            var O = ""; for (s = 0; s !== n.length; ++s)
                if (n[s] != null) O += n[s].v; return O } e._eval = R;
        var D = /\[[=<>]/;
        var O = /\[([=<>]*)(-?\d+\.?\d*)\]/;

        function F(e, r) { if (r == null) return false; var t = parseFloat(r[2]); switch (r[1]) {
                case "=":
                    if (e == t) return true; break;
                case ">":
                    if (e > t) return true; break;
                case "<":
                    if (e < t) return true; break;
                case "<>":
                    if (e != t) return true; break;
                case ">=":
                    if (e >= t) return true; break;
                case "<=":
                    if (e <= t) return true; break; } return false }

        function P(e, r) { var t = I(e); var a = t.length,
                n = t[a - 1].indexOf("@"); if (a < 4 && n > -1) --a; if (t.length > 4) throw new Error("cannot find right format for |" + t.join("|") + "|"); if (typeof r !== "number") return [4, t.length === 4 || n > -1 ? t[t.length - 1] : "@"]; switch (t.length) {
                case 1:
                    t = n > -1 ? ["General", "General", "General", t[0]] : [t[0], t[0], t[0], "@"]; break;
                case 2:
                    t = n > -1 ? [t[0], t[0], t[0], t[1]] : [t[0], t[1], t[0], "@"]; break;
                case 3:
                    t = n > -1 ? [t[0], t[1], t[0], t[2]] : [t[0], t[1], t[2], "@"]; break;
                case 4:
                    break; } var i = r > 0 ? t[0] : r < 0 ? t[1] : t[2]; if (t[0].indexOf("[") === -1 && t[1].indexOf("[") === -1) return [a, i]; if (t[0].match(D) != null || t[1].match(D) != null) { var s = t[0].match(O); var o = t[1].match(O); return F(r, s) ? [a, t[0]] : F(r, o) ? [a, t[1]] : [a, t[s != null && o != null ? 2 : 1]] } return [a, i] }

        function N(e, r, t) { if (t == null) t = {}; var a = ""; switch (typeof e) {
                case "string":
                    if (e == "m/d/yy" && t.dateNF) a = t.dateNF;
                    else a = e; break;
                case "number":
                    if (e == 14 && t.dateNF) a = t.dateNF;
                    else a = (t.table != null ? t.table : v)[e]; break; } if (c(a, 0)) return _(r, t); if (r instanceof Date) r = k(r, t.date1904); var n = P(a, r); if (c(n[1])) return _(r, t); if (r === true) r = "TRUE";
            else if (r === false) r = "FALSE";
            else if (r === "" || r == null) return ""; return R(n[1], r, t, n[0]) }

        function L(e, r) { if (typeof r != "number") { r = +r || -1; for (var t = 0; t < 392; ++t) { if (v[t] == undefined) { if (r < 0) r = t; continue } if (v[t] == e) { r = t; break } } if (r < 0) r = 391 } v[r] = e; return r } e.load = L;
        e._table = v;
        e.get_table = function H() { return v };
        e.load_table = function W(e) { for (var r = 0; r != 392; ++r)
                if (e[r] !== undefined) L(e[r], r) };
        e.init_table = d;
        e.format = N
    };
    I(x);
    var A = { "General Number": "General", "General Date": x._table[22], "Long Date": "dddd, mmmm dd, yyyy", "Medium Date": x._table[15], "Short Date": x._table[14], "Long Time": x._table[19], "Medium Time": x._table[18], "Short Time": x._table[20], Currency: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)', Fixed: x._table[2], Standard: x._table[4], Percent: x._table[10], Scientific: x._table[11], "Yes/No": '"Yes";"Yes";"No";@', "True/False": '"True";"True";"False";@', "On/Off": '"Yes";"Yes";"No";@' };
    var y = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;

    function R(e) { var r = typeof e == "number" ? x._table[e] : e;
        r = r.replace(y, "(\\d+)"); return new RegExp("^" + r + "$") }

    function D(e, r, t) { var a = -1,
            n = -1,
            i = -1,
            s = -1,
            o = -1,
            f = -1;
        (r.match(y) || []).forEach(function(e, r) { var l = parseInt(t[r + 1], 10); switch (e.toLowerCase().charAt(0)) {
                case "y":
                    a = l; break;
                case "d":
                    i = l; break;
                case "h":
                    s = l; break;
                case "s":
                    f = l; break;
                case "m":
                    if (s >= 0) o = l;
                    else n = l; break; } }); if (f >= 0 && o == -1 && n >= 0) { o = n;
            n = -1 } var l = ("" + (a >= 0 ? a : (new Date).getFullYear())).slice(-4) + "-" + ("00" + (n >= 1 ? n : 1)).slice(-2) + "-" + ("00" + (i >= 1 ? i : 1)).slice(-2); if (l.length == 7) l = "0" + l; if (l.length == 8) l = "20" + l; var c = ("00" + (s >= 0 ? s : 0)).slice(-2) + ":" + ("00" + (o >= 0 ? o : 0)).slice(-2) + ":" + ("00" + (f >= 0 ? f : 0)).slice(-2); if (s == -1 && o == -1 && f == -1) return l; if (a == -1 && n == -1 && i == -1) return c; return l + "T" + c }
    var O = true;
    var F = function Ub() { var e = {};
        e.version = "1.0.1";

        function r(e, r) { var t = e.split("/"),
                a = r.split("/"); for (var n = 0, i = 0, s = Math.min(t.length, a.length); n < s; ++n) { if (i = t[n].length - a[n].length) return i; if (t[n] != a[n]) return t[n] < a[n] ? -1 : 1 } return t.length - a.length }

        function t(e) { if (e.charAt(e.length - 1) == "/") return e.slice(0, -1).indexOf("/") === -1 ? e : t(e.slice(0, -1)); var r = e.lastIndexOf("/"); return r === -1 ? e : e.slice(0, r + 1) }

        function a(e) { if (e.charAt(e.length - 1) == "/") return a(e.slice(0, -1)); var r = e.lastIndexOf("/"); return r === -1 ? e : e.slice(r + 1) } var n;

        function i() { return n || (n = require("fs")) }

        function s(e, r) { var t = 3; var a = 512; var n = 0; var i = 0; var s = 0; var u = 0; var d = 0; var b = []; var m = e.slice(0, 512);
            Fr(m, 0); var g = o(m);
            t = g[0]; switch (t) {
                case 3:
                    a = 512; break;
                case 4:
                    a = 4096; break;
                default:
                    throw new Error("Major Version: Expected 3 or 4 saw " + t); } if (a !== 512) { m = e.slice(0, a);
                Fr(m, 28) } var E = e.slice(0, a);
            f(m, t); var k = m._R(4, "i"); if (t === 3 && k !== 0) throw new Error("# Directory Sectors: Expected 0 saw " + k);
            m.l += 4;
            s = m._R(4, "i");
            m.l += 4;
            m.chk("00100000", "Mini Stream Cutoff Size: ");
            u = m._R(4, "i");
            n = m._R(4, "i");
            d = m._R(4, "i");
            i = m._R(4, "i"); for (var w = -1, S = 0; S < 109; ++S) { w = m._R(4, "i"); if (w < 0) break;
                b[S] = w } var _ = l(e, a);
            h(d, i, _, a, b); var C = v(_, s, b, a);
            C[s].name = "!Directory"; if (n > 0 && u !== y) C[u].name = "!MiniFAT";
            C[b[0]].name = "!FAT";
            C.fat_addrs = b;
            C.ssz = a; var B = {},
                T = [],
                x = [],
                I = [];
            p(s, C, _, T, n, B, x, u);
            c(x, I, T);
            T.shift(); var A = { FileIndex: x, FullPaths: I }; if (r && r.raw) A.raw = { header: E, sectors: _ }; return A }

        function o(e) { e.chk(R, "Header Signature: ");
            e.chk(O, "CLSID: "); var r = e._R(2, "u"); return [e._R(2, "u"), r] }

        function f(e, r) { var t = 9;
            e.l += 2; switch (t = e._R(2)) {
                case 9:
                    if (r != 3) throw new Error("Sector Shift: Expected 9 saw " + t); break;
                case 12:
                    if (r != 4) throw new Error("Sector Shift: Expected 12 saw " + t); break;
                default:
                    throw new Error("Sector Shift: Expected 9 or 12 saw " + t); } e.chk("0600", "Mini Sector Shift: ");
            e.chk("000000000000", "Reserved: ") }

        function l(e, r) { var t = Math.ceil(e.length / r) - 1; var a = []; for (var n = 1; n < t; ++n) a[n - 1] = e.slice(n * r, (n + 1) * r);
            a[t - 1] = e.slice(t * r); return a }

        function c(e, r, t) { var a = 0,
                n = 0,
                i = 0,
                s = 0,
                o = 0,
                f = t.length; var l = [],
                c = []; for (; a < f; ++a) { l[a] = c[a] = a;
                r[a] = t[a] } for (; o < c.length; ++o) { a = c[o];
                n = e[a].L;
                i = e[a].R;
                s = e[a].C; if (l[a] === a) { if (n !== -1 && l[n] !== n) l[a] = l[n]; if (i !== -1 && l[i] !== i) l[a] = l[i] } if (s !== -1) l[s] = a; if (n !== -1) { l[n] = l[a];
                    c.push(n) } if (i !== -1) { l[i] = l[a];
                    c.push(i) } } for (a = 1; a !== f; ++a)
                if (l[a] === a) { if (i !== -1 && l[i] !== i) l[a] = l[i];
                    else if (n !== -1 && l[n] !== n) l[a] = l[n] }
            for (a = 1; a < f; ++a) { if (e[a].type === 0) continue;
                o = l[a]; if (o === 0) r[a] = r[0] + "/" + r[a];
                else
                    while (o !== 0 && o !== l[o]) { r[a] = r[o] + "/" + r[a];
                        o = l[o] } l[a] = 0 } r[0] += "/"; for (a = 1; a < f; ++a) { if (e[a].type !== 2) r[a] += "/" } }

        function u(e, r, t) { var a = e.start,
                n = e.size; var i = []; var s = a; while (t && n > 0 && s >= 0) { i.push(r.slice(s * A, s * A + A));
                n -= A;
                s = Cr(t, s * 4) } if (i.length === 0) return Nr(0); return C(i).slice(0, e.size) }

        function h(e, r, t, a, n) { var i = y; if (e === y) { if (r !== 0) throw new Error("DIFAT chain shorter than expected") } else if (e !== -1) { var s = t[e],
                    o = (a >>> 2) - 1; if (!s) return; for (var f = 0; f < o; ++f) { if ((i = Cr(s, f * 4)) === y) break;
                    n.push(i) } h(Cr(s, a - 4), r - 1, t, a, n) } }

        function d(e, r, t, a, n) { var i = [],
                s = []; if (!n) n = []; var o = a - 1,
                f = 0,
                l = 0; for (f = r; f >= 0;) { n[f] = true;
                i[i.length] = f;
                s.push(e[f]); var c = t[Math.floor(f * 4 / a)];
                l = f * 4 & o; if (a < 4 + l) throw new Error("FAT boundary crossed: " + f + " 4 " + a); if (!e[c]) break;
                f = Cr(e[c], l) } return { nodes: i, data: qe([s]) } }

        function v(e, r, t, a) { var n = e.length,
                i = []; var s = [],
                o = [],
                f = []; var l = a - 1,
                c = 0,
                u = 0,
                h = 0,
                d = 0; for (c = 0; c < n; ++c) { o = [];
                h = c + r; if (h >= n) h -= n; if (s[h]) continue;
                f = []; for (u = h; u >= 0;) { s[u] = true;
                    o[o.length] = u;
                    f.push(e[u]); var v = t[Math.floor(u * 4 / a)];
                    d = u * 4 & l; if (a < 4 + d) throw new Error("FAT boundary crossed: " + u + " 4 " + a); if (!e[v]) break;
                    u = Cr(e[v], d) } i[h] = { nodes: o, data: qe([f]) } } return i }

        function p(e, r, t, a, n, i, s, o) { var f = 0,
                l = a.length ? 2 : 0; var c = r[e].data; var h = 0,
                v = 0,
                p; for (; h < c.length; h += 128) { var m = c.slice(h, h + 128);
                Fr(m, 64);
                v = m._R(2);
                p = rr(m, 0, v - l);
                a.push(p); var g = { name: p, type: m._R(1), color: m._R(1), L: m._R(4, "i"), R: m._R(4, "i"), C: m._R(4, "i"), clsid: m._R(16), state: m._R(4, "i"), start: 0, size: 0 }; var E = m._R(2) + m._R(2) + m._R(2) + m._R(2); if (E !== 0) g.ct = b(m, m.l - 8); var k = m._R(2) + m._R(2) + m._R(2) + m._R(2); if (k !== 0) g.mt = b(m, m.l - 8);
                g.start = m._R(4, "i");
                g.size = m._R(4, "i"); if (g.size < 0 && g.start < 0) { g.size = g.type = 0;
                    g.start = y;
                    g.name = "" } if (g.type === 5) { f = g.start; if (n > 0 && f !== y) r[f].name = "!StreamData" } else if (g.size >= 4096) { g.storage = "fat"; if (r[g.start] === undefined) r[g.start] = d(t, g.start, r.fat_addrs, r.ssz);
                    r[g.start].name = g.name;
                    g.content = r[g.start].data.slice(0, g.size);
                    Fr(g.content, 0) } else { g.storage = "minifat"; if (f !== y && g.start !== y && r[f]) { g.content = u(g, r[f].data, (r[o] || {}).data);
                        Fr(g.content, 0) } } i[p] = g;
                s.push(g) } }

        function b(e, r) { return new Date((_r(e, r + 4) / 1e7 * Math.pow(2, 32) + _r(e, r) / 1e7 - 11644473600) * 1e3) }

        function m(e, r) { i(); return s(n.readFileSync(e), r) }

        function E(e, r) { switch (r && r.type || "base64") {
                case "file":
                    return m(e, r);
                case "base64":
                    return s(w(g.decode(e)), r);
                case "binary":
                    return s(w(e), r); } return s(e, r) }

        function k(e, r) { var t = r || {},
                a = t.root || "Root Entry"; if (!e.FullPaths) e.FullPaths = []; if (!e.FileIndex) e.FileIndex = []; if (e.FullPaths.length !== e.FileIndex.length) throw new Error("inconsistent CFB structure"); if (e.FullPaths.length === 0) { e.FullPaths[0] = a + "/";
                e.FileIndex[0] = { name: a, type: 5 } } if (t.CLSID) e.FileIndex[0].clsid = t.CLSID;
            S(e) }

        function S(e) { var r = "Sh33tJ5"; if (F.find(e, "/" + r)) return; var t = Nr(4);
            t[0] = 55;
            t[1] = t[3] = 50;
            t[2] = 54;
            e.FileIndex.push({ name: r, type: 2, content: t, size: 4, L: 69, R: 69, C: 69 });
            e.FullPaths.push(e.FullPaths[0] + r);
            _(e) }

        function _(e, n) { k(e); var i = false,
                s = false; for (var o = e.FullPaths.length - 1; o >= 0; --o) { var f = e.FileIndex[o]; switch (f.type) {
                    case 0:
                        if (s) i = true;
                        else { e.FileIndex.pop();
                            e.FullPaths.pop() } break;
                    case 1:
                        ;
                    case 2:
                        ;
                    case 5:
                        s = true; if (isNaN(f.R * f.L * f.C)) i = true; if (f.R > -1 && f.L > -1 && f.R == f.L) i = true; break;
                    default:
                        i = true; break; } } if (!i && !n) return; var l = new Date(1987, 1, 19),
                c = 0; var u = []; for (o = 0; o < e.FullPaths.length; ++o) { if (e.FileIndex[o].type === 0) continue;
                u.push([e.FullPaths[o], e.FileIndex[o]]) } for (o = 0; o < u.length; ++o) { var h = t(u[o][0]);
                s = false; for (c = 0; c < u.length; ++c)
                    if (u[c][0] === h) s = true; if (!s) u.push([h, { name: a(h).replace("/", ""), type: 1, clsid: O, ct: l, mt: l, content: null }]) } u.sort(function(e, t) { return r(e[0], t[0]) });
            e.FullPaths = [];
            e.FileIndex = []; for (o = 0; o < u.length; ++o) { e.FullPaths[o] = u[o][0];
                e.FileIndex[o] = u[o][1] } for (o = 0; o < u.length; ++o) { var d = e.FileIndex[o]; var v = e.FullPaths[o];
                d.name = a(v).replace("/", "");
                d.L = d.R = d.C = -(d.color = 1);
                d.size = d.content ? d.content.length : 0;
                d.start = 0;
                d.clsid = d.clsid || O; if (o === 0) { d.C = u.length > 1 ? 1 : -1;
                    d.size = 0;
                    d.type = 5 } else if (v.slice(-1) == "/") { for (c = o + 1; c < u.length; ++c)
                        if (t(e.FullPaths[c]) == v) break;
                    d.C = c >= u.length ? -1 : c; for (c = o + 1; c < u.length; ++c)
                        if (t(e.FullPaths[c]) == t(v)) break;
                    d.R = c >= u.length ? -1 : c;
                    d.type = 1 } else { if (t(e.FullPaths[o + 1] || "") == t(v)) d.R = o + 1;
                    d.type = 2 } } }

        function x(e, r) { _(e); var t = function(e) { var r = 0,
                    t = 0; for (var a = 0; a < e.FileIndex.length; ++a) { var n = e.FileIndex[a]; if (!n.content) continue; var i = n.content.length; if (i === 0) {} else if (i < 4096) r += i + 63 >> 6;
                    else t += i + 511 >> 9 } var s = e.FullPaths.length + 3 >> 2; var o = r + 7 >> 3; var f = r + 127 >> 7; var l = o + t + s + f; var c = l + 127 >> 7; var u = c <= 109 ? 0 : Math.ceil((c - 109) / 127); while (l + c + u + 127 >> 7 > c) u = ++c <= 109 ? 0 : Math.ceil((c - 109) / 127); var h = [1, u, c, f, s, t, r, 0];
                e.FileIndex[0].size = r << 6;
                h[7] = (e.FileIndex[0].start = h[0] + h[1] + h[2] + h[3] + h[4] + h[5]) + (h[6] + 7 >> 3); return h }(e); var a = Nr(t[7] << 9); var n = 0,
                i = 0; { for (n = 0; n < 8; ++n) a._W(1, D[n]); for (n = 0; n < 8; ++n) a._W(2, 0);
                a._W(2, 62);
                a._W(2, 3);
                a._W(2, 65534);
                a._W(2, 9);
                a._W(2, 6); for (n = 0; n < 3; ++n) a._W(2, 0);
                a._W(4, 0);
                a._W(4, t[2]);
                a._W(4, t[0] + t[1] + t[2] + t[3] - 1);
                a._W(4, 0);
                a._W(4, 1 << 12);
                a._W(4, t[3] ? t[0] + t[1] + t[2] - 1 : y);
                a._W(4, t[3]);
                a._W(-4, t[1] ? t[0] - 1 : y);
                a._W(4, t[1]); for (n = 0; n < 109; ++n) a._W(-4, n < t[2] ? t[1] + n : -1) } if (t[1]) { for (i = 0; i < t[1]; ++i) { for (; n < 236 + i * 127; ++n) a._W(-4, n < t[2] ? t[1] + n : -1);
                    a._W(-4, i === t[1] - 1 ? y : i + 1) } } var s = function(e) { for (i += e; n < i - 1; ++n) a._W(-4, n + 1); if (e) {++n;
                    a._W(-4, y) } };
            i = n = 0; for (i += t[1]; n < i; ++n) a._W(-4, P.DIFSECT); for (i += t[2]; n < i; ++n) a._W(-4, P.FATSECT);
            s(t[3]);
            s(t[4]); var o = 0,
                f = 0; var l = e.FileIndex[0]; for (; o < e.FileIndex.length; ++o) { l = e.FileIndex[o]; if (!l.content) continue;
                f = l.content.length; if (f < 4096) continue;
                l.start = i;
                s(f + 511 >> 9) } s(t[6] + 7 >> 3); while (a.l & 511) a._W(-4, P.ENDOFCHAIN);
            i = n = 0; for (o = 0; o < e.FileIndex.length; ++o) { l = e.FileIndex[o]; if (!l.content) continue;
                f = l.content.length; if (!f || f >= 4096) continue;
                l.start = i;
                s(f + 63 >> 6) } while (a.l & 511) a._W(-4, P.ENDOFCHAIN); for (n = 0; n < t[4] << 2; ++n) { var c = e.FullPaths[n]; if (!c || c.length === 0) { for (o = 0; o < 17; ++o) a._W(4, 0); for (o = 0; o < 3; ++o) a._W(4, -1); for (o = 0; o < 12; ++o) a._W(4, 0); continue } l = e.FileIndex[n]; if (n === 0) l.start = l.size ? l.start - 1 : y;
                f = 2 * (l.name.length + 1);
                a._W(64, l.name, "utf16le");
                a._W(2, f);
                a._W(1, l.type);
                a._W(1, l.color);
                a._W(-4, l.L);
                a._W(-4, l.R);
                a._W(-4, l.C); if (!l.clsid)
                    for (o = 0; o < 4; ++o) a._W(4, 0);
                else a._W(16, l.clsid, "hex");
                a._W(4, l.state || 0);
                a._W(4, 0);
                a._W(4, 0);
                a._W(4, 0);
                a._W(4, 0);
                a._W(4, l.start);
                a._W(4, l.size);
                a._W(4, 0) } for (n = 1; n < e.FileIndex.length; ++n) { l = e.FileIndex[n]; if (l.size >= 4096) { a.l = l.start + 1 << 9; for (o = 0; o < l.size; ++o) a._W(1, l.content[o]); for (; o & 511; ++o) a._W(1, 0) } } for (n = 1; n < e.FileIndex.length; ++n) { l = e.FileIndex[n]; if (l.size > 0 && l.size < 4096) { for (o = 0; o < l.size; ++o) a._W(1, l.content[o]); for (; o & 63; ++o) a._W(1, 0) } } while (a.l < a.length) a._W(1, 0); return a }

        function I(e, r) { var t = e.FullPaths.map(function(e) { return e.toUpperCase() }); var a = t.map(function(e) { var r = e.split("/"); return r[r.length - (e.slice(-1) == "/" ? 2 : 1)] }); var n = false; if (r.charCodeAt(0) === 47) { n = true;
                r = t[0].slice(0, -1) + r } else n = r.indexOf("/") !== -1; var i = r.toUpperCase(); var s = n === true ? t.indexOf(i) : a.indexOf(i); if (s !== -1) return e.FileIndex[s];
            i = i.replace(B, "").replace(T, "!"); for (s = 0; s < t.length; ++s) { if (t[s].replace(B, "").replace(T, "!") == i) return e.FileIndex[s]; if (a[s].replace(B, "").replace(T, "!") == i) return e.FileIndex[s] } return null } var A = 64; var y = -2; var R = "d0cf11e0a1b11ae1"; var D = [208, 207, 17, 224, 161, 177, 26, 225]; var O = "00000000000000000000000000000000"; var P = { MAXREGSECT: -6, DIFSECT: -4, FATSECT: -3, ENDOFCHAIN: y, FREESECT: -1, HEADER_SIGNATURE: R, HEADER_MINOR_VERSION: "3e00", MAXREGSID: -6, NOSTREAM: -1, HEADER_CLSID: O, EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"] };

        function N(e, r, t) { i(); var a = x(e, t);
            n.writeFileSync(r, a) }

        function L(e) { var r = new Array(e.length); for (var t = 0; t < e.length; ++t) r[t] = String.fromCharCode(e[t]); return r.join("") }

        function M(e, r) { var t = x(e, r); switch (r && r.type) {
                case "file":
                    i();
                    n.writeFileSync(r.filename, t); return t;
                case "binary":
                    return L(t);
                case "base64":
                    return g.encode(L(t)); } return t }

        function U(e) { var r = {};
            k(r, e); return r }

        function H(e, r, t, n) { k(e); var i = F.find(e, r); if (!i) { var s = e.FullPaths[0]; if (r.slice(0, s.length) == s) s = r;
                else { if (s.slice(-1) != "/") s += "/";
                    s = (s + r).replace("//", "/") } i = { name: a(r), type: 2 };
                e.FileIndex.push(i);
                e.FullPaths.push(s);
                F.utils.cfb_gc(e) } i.content = t;
            i.size = t ? t.length : 0; if (n) { if (n.CLSID) i.clsid = n.CLSID } return i }

        function W(e, r) { k(e); var t = F.find(e, r); if (t)
                for (var a = 0; a < e.FileIndex.length; ++a)
                    if (e.FileIndex[a] == t) { e.FileIndex.splice(a, 1);
                        e.FullPaths.splice(a, 1); return true }
            return false }

        function V(e, r, t) { k(e); var n = F.find(e, r); if (n)
                for (var i = 0; i < e.FileIndex.length; ++i)
                    if (e.FileIndex[i] == n) { e.FileIndex[i].name = a(t);
                        e.FullPaths[i] = t; return true }
            return false }

        function z(e) { _(e, true) } e.find = I;
        e.read = E;
        e.parse = s;
        e.write = M;
        e.writeFile = N;
        e.utils = { cfb_new: U, cfb_add: H, cfb_del: W, cfb_mov: V, cfb_gc: z, ReadShift: Ir, CheckField: Or, prep_blob: Fr, bconcat: C, consts: P }; return e }();
    if (typeof require !== "undefined" && typeof module !== "undefined" && typeof O === "undefined") { module.exports = F }

    function P(e) { return Object.keys(e) }

    function N(e, r) { var t = [],
            a = P(e); for (var n = 0; n !== a.length; ++n) t[e[a[n]][r]] = a[n]; return t }

    function L(e) { var r = [],
            t = P(e); for (var a = 0; a !== t.length; ++a) r[e[t[a]]] = t[a]; return r }

    function M(e) { var r = [],
            t = P(e); for (var a = 0; a !== t.length; ++a) r[e[t[a]]] = parseInt(t[a], 10); return r }

    function U(e) { var r = [],
            t = P(e); for (var a = 0; a !== t.length; ++a) { if (r[e[t[a]]] == null) r[e[t[a]]] = [];
            r[e[t[a]]].push(t[a]) } return r }
    var H = new Date(1899, 11, 30, 0, 0, 0);
    var W = H.getTime() + ((new Date).getTimezoneOffset() - H.getTimezoneOffset()) * 6e4;

    function V(e, r) { var t = e.getTime(); if (r) t -= 1462 * 24 * 60 * 60 * 1e3; return (t - W) / (24 * 60 * 60 * 1e3) }

    function z(e) { var r = new Date;
        r.setTime(e * 24 * 60 * 60 * 1e3 + W); return r }

    function X(e) { var r = 0,
            t = 0,
            a = false; var n = e.match(/P([0-9\.]+Y)?([0-9\.]+M)?([0-9\.]+D)?T([0-9\.]+H)?([0-9\.]+M)?([0-9\.]+S)?/); if (!n) throw new Error("|" + e + "| is not an ISO8601 Duration"); for (var i = 1; i != n.length; ++i) { if (!n[i]) continue;
            t = 1; if (i > 3) a = true; switch (n[i].substr(n[i].length - 1)) {
                case "Y":
                    throw new Error("Unsupported ISO Duration Field: " + n[i].substr(n[i].length - 1));
                case "D":
                    t *= 24;
                case "H":
                    t *= 60;
                case "M":
                    if (!a) throw new Error("Unsupported ISO Duration Field: M");
                    else t *= 60;
                case "S":
                    break; } r += t * parseInt(n[i], 10) } return r }
    var G = new Date("2017-02-19T19:06:09.000Z");
    if (isNaN(G.getFullYear())) G = new Date("2/19/17");
    var j = G.getFullYear() == 2017;

    function K(e, r) { var t = new Date(e); if (j) { if (r > 0) t.setTime(t.getTime() + t.getTimezoneOffset() * 60 * 1e3);
            else if (r < 0) t.setTime(t.getTime() - t.getTimezoneOffset() * 60 * 1e3); return t } if (e instanceof Date) return e; if (G.getFullYear() == 1917 && !isNaN(t.getFullYear())) { var a = t.getFullYear(); if (e.indexOf("" + a) > -1) return t;
            t.setFullYear(t.getFullYear() + 100); return t } var n = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"]; var i = new Date(+n[0], +n[1] - 1, +n[2], +n[3] || 0, +n[4] || 0, +n[5] || 0); if (e.indexOf("Z") > -1) i = new Date(i.getTime() - i.getTimezoneOffset() * 60 * 1e3); return i }

    function Y(e) { var r = ""; for (var t = 0; t != e.length; ++t) r += String.fromCharCode(e[t]); return r }

    function $(e) { if (typeof JSON != "undefined" && !Array.isArray(e)) return JSON.parse(JSON.stringify(e)); if (typeof e != "object" || e == null) return e; var r = {}; for (var t in e)
            if (e.hasOwnProperty(t)) r[t] = $(e[t]); return r }

    function Z(e, r) { var t = ""; while (t.length < r) t += e; return t }

    function Q(e) { var r = Number(e); if (!isNaN(r)) return r; var t = 1; var a = e.replace(/([\d]),([\d])/g, "$1$2").replace(/[$]/g, "").replace(/[%]/g, function() { t *= 100; return "" }); if (!isNaN(r = Number(a))) return r / t;
        a = a.replace(/[(](.*)[)]/, function(e, r) { t = -t; return r }); if (!isNaN(r = Number(a))) return r / t; return r }

    function J(e) { var r = new Date(e),
            t = new Date(NaN); var a = r.getYear(),
            n = r.getMonth(),
            i = r.getDate(); if (isNaN(i)) return t; if (a < 0 || a > 8099) return t; if ((n > 0 || i > 1) && a != 101) return r; if (e.toLowerCase().match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) return r; if (e.match(/[^-0-9:,\/\\]/)) return t; return r }
    var q = "abacaba".split(/(:?b)/i).length == 5;

    function ee(e, r, t) { if (q || typeof r == "string") return e.split(r); var a = e.split(r),
            n = [a[0]]; for (var i = 1; i < a.length; ++i) { n.push(t);
            n.push(a[i]) } return n }

    function re(e) { if (!e) return null; if (e.data) return v(e.data); if (e.asNodeBuffer && E) return v(e.asNodeBuffer().toString("binary")); if (e.asBinary) return v(e.asBinary()); if (e._data && e._data.getContent) return v(Y(Array.prototype.slice.call(e._data.getContent(), 0))); return null }

    function te(e) { if (!e) return null; if (e.data) return u(e.data); if (e.asNodeBuffer && E) return e.asNodeBuffer(); if (e._data && e._data.getContent) { var r = e._data.getContent(); if (typeof r == "string") return u(r); return Array.prototype.slice.call(r) } return null }

    function ae(e) { return e && e.name.slice(-4) === ".bin" ? te(e) : re(e) }

    function ne(e, r) { var t = P(e.files); var a = r.toLowerCase(),
            n = a.replace(/\//g, "\\"); for (var i = 0; i < t.length; ++i) { var s = t[i].toLowerCase(); if (a == s || n == s) return e.files[t[i]] } return null }

    function ie(e, r) { var t = ne(e, r); if (t == null) throw new Error("Cannot find file " + r + " in zip"); return t }

    function se(e, r, t) { if (!t) return ae(ie(e, r)); if (!r) return null; try { return se(e, r) } catch (a) { return null } }

    function oe(e, r, t) { if (!t) return re(ie(e, r)); if (!r) return null; try { return oe(e, r) } catch (a) { return null } }
    var fe, le;
    if (typeof JSZip !== "undefined") le = JSZip;
    if (typeof exports !== "undefined") { if (typeof module !== "undefined" && module.exports) { if (typeof le === "undefined") le = undefined; try { fe = require("fs") } catch (ce) {} } }

    function ue(e, r) { var t = r.split("/"); if (r.slice(-1) != "/") t.pop(); var a = e.split("/"); while (a.length !== 0) { var n = a.shift(); if (n === "..") t.pop();
            else if (n !== ".") t.push(n) } return t.join("/") }
    var he = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n';
    var de = /([^"\s?>\/]+)\s*=\s*((?:")([^"]*)(?:")|(?:')([^']*)(?:')|([^'">\s]+))/g;
    var ve = /<[\/\?]?[a-zA-Z0-9:]+(?:\s+[^"\s?>\/]+\s*=\s*(?:"[^"]*"|'[^']*'|[^'">\s]+))*\s?[\/\?]?>/g;
    if (!he.match(ve)) ve = /<[^>]*>/g;
    var pe = /<\w*:/,
        be = /<(\/?)\w+:/;

    function me(e, r) { var t = {}; var a = 0,
            n = 0; for (; a !== e.length; ++a)
            if ((n = e.charCodeAt(a)) === 32 || n === 10 || n === 13) break; if (!r) t[0] = e.substr(0, a); if (a === e.length) return t; var i = e.match(de),
            s = 0,
            o = "",
            f = 0,
            l = "",
            c = "",
            u = 1; if (i)
            for (f = 0; f != i.length; ++f) { c = i[f]; for (n = 0; n != c.length; ++n)
                    if (c.charCodeAt(n) === 61) break;
                l = c.substr(0, n).trim(); while (c.charCodeAt(n + 1) == 32) ++n;
                u = (a = c.charCodeAt(n + 1)) == 34 || a == 39 ? 1 : 0;
                o = c.substring(n + 1 + u, c.length - u); for (s = 0; s != l.length; ++s)
                    if (l.charCodeAt(s) === 58) break; if (s === l.length) { if (l.indexOf("_") > 0) l = l.substr(0, l.indexOf("_"));
                    t[l] = o } else { var h = (s === 5 && l.substr(0, 5) === "xmlns" ? "xmlns" : "") + l.substr(s + 1); if (t[h] && l.substr(s - 3, 3) == "ext") continue;
                    t[h] = o } }
        return t }

    function ge(e) { return e.replace(be, "<$1") }
    var Ee = { "&quot;": '"', "&apos;": "'", "&gt;": ">", "&lt;": "<", "&amp;": "&" };
    var ke = L(Ee);
    var we = function() { var e = /&(?:quot|apos|gt|lt|amp|#x?([\da-fA-F]+));/g,
            r = /_x([\da-fA-F]{4})_/g; return function t(a) { var n = a + "",
                i = n.indexOf("<![CDATA["); if (i == -1) return n.replace(e, function(e, r) { return Ee[e] || String.fromCharCode(parseInt(r, e.indexOf("x") > -1 ? 16 : 10)) || e }).replace(r, function(e, r) { return String.fromCharCode(parseInt(r, 16)) }); var s = n.indexOf("]]>"); return t(n.slice(0, i)) + n.slice(i + 9, s) + t(n.slice(s + 3)) } }();
    var Se = /[&<>'"]/g,
        _e = /[\u0000-\u0008\u000b-\u001f]/g;

    function Ce(e, r) { var t = e + ""; return t.replace(Se, function(e) { return ke[e] }).replace(_e, function(e) { return "_x" + ("000" + e.charCodeAt(0).toString(16)).slice(-4) + "_" }) }

    function Be(e) { return Ce(e).replace(/ /g, "_x0020_") }
    var Te = /[\u0000-\u001f]/g;

    function xe(e) { var r = e + ""; return r.replace(Se, function(e) { return ke[e] }).replace(Te, function(e) { return "&#x" + ("000" + e.charCodeAt(0).toString(16)).slice(-4) + ";" }) }

    function Ie(e) { var r = e + ""; return r.replace(Se, function(e) { return ke[e] }).replace(Te, function(e) { return "&#x" + e.charCodeAt(0).toString(16).toUpperCase() + ";" }) }
    var Ae = function() { var e = /&#(\d+);/g;

        function r(e, r) { return String.fromCharCode(parseInt(r, 10)) } return function t(a) { return a.replace(e, r) } }();
    var ye = function() { return function e(r) { return r.replace(/(\r\n|[\r\n])/g, "&#10;") } }();

    function Re(e, r) { switch (e) {
            case 1:
                ;
            case true:
                ;
            case "1":
                ;
            case "true":
                ;
            case "TRUE":
                return true;
            default:
                return false; } }
    var De = function Hb(e) { var r = "",
            t = 0,
            a = 0,
            n = 0,
            i = 0,
            s = 0,
            o = 0; while (t < e.length) { a = e.charCodeAt(t++); if (a < 128) { r += String.fromCharCode(a); continue } n = e.charCodeAt(t++); if (a > 191 && a < 224) { s = (a & 31) << 6;
                s |= n & 63;
                r += String.fromCharCode(s); continue } i = e.charCodeAt(t++); if (a < 240) { r += String.fromCharCode((a & 15) << 12 | (n & 63) << 6 | i & 63); continue } s = e.charCodeAt(t++);
            o = ((a & 7) << 18 | (n & 63) << 12 | (i & 63) << 6 | s & 63) - 65536;
            r += String.fromCharCode(55296 + (o >>> 10 & 1023));
            r += String.fromCharCode(56320 + (o & 1023)) } return r };
    var Oe = function(e) { var r = [],
            t = 0,
            a = 0,
            n = 0; while (t < e.length) { a = e.charCodeAt(t++); switch (true) {
                case a < 128:
                    r.push(String.fromCharCode(a)); break;
                case a < 2048:
                    r.push(String.fromCharCode(192 + (a >> 6)));
                    r.push(String.fromCharCode(128 + (a & 63))); break;
                case a >= 55296 && a < 57344:
                    a -= 55296;
                    n = e.charCodeAt(t++) - 56320 + (a << 10);
                    r.push(String.fromCharCode(240 + (n >> 18 & 7)));
                    r.push(String.fromCharCode(144 + (n >> 12 & 63)));
                    r.push(String.fromCharCode(128 + (n >> 6 & 63)));
                    r.push(String.fromCharCode(128 + (n & 63))); break;
                default:
                    r.push(String.fromCharCode(224 + (a >> 12)));
                    r.push(String.fromCharCode(128 + (a >> 6 & 63)));
                    r.push(String.fromCharCode(128 + (a & 63))); } } return r.join("") };
    if (E) {
        var Fe = function Wb(e) { var r = new Buffer(2 * e.length),
                t, a, n = 1,
                i = 0,
                s = 0,
                o; for (a = 0; a < e.length; a += n) { n = 1; if ((o = e.charCodeAt(a)) < 128) t = o;
                else if (o < 224) { t = (o & 31) * 64 + (e.charCodeAt(a + 1) & 63);
                    n = 2 } else if (o < 240) { t = (o & 15) * 4096 + (e.charCodeAt(a + 1) & 63) * 64 + (e.charCodeAt(a + 2) & 63);
                    n = 3 } else { n = 4;
                    t = (o & 7) * 262144 + (e.charCodeAt(a + 1) & 63) * 4096 + (e.charCodeAt(a + 2) & 63) * 64 + (e.charCodeAt(a + 3) & 63);
                    t -= 65536;
                    s = 55296 + (t >>> 10 & 1023);
                    t = 56320 + (t & 1023) } if (s !== 0) { r[i++] = s & 255;
                    r[i++] = s >>> 8;
                    s = 0 } r[i++] = t % 256;
                r[i++] = t >>> 8 } return r.slice(0, i).toString("ucs2") };
        var Pe = "foo bar bazâð£";
        if (De(Pe) == Fe(Pe)) De = Fe;
        var Ne = function Vb(e) { return Buffer(e, "binary").toString("utf8") };
        if (De(Pe) == Ne(Pe)) De = Ne;
        Oe = function(e) {
            return new Buffer(e, "utf8").toString("binary");
        }
    }
    var Le = function() { var e = {}; return function r(t, a) { var n = t + "|" + (a || ""); if (e[n]) return e[n]; return e[n] = new RegExp("<(?:\\w+:)?" + t + '(?: xml:space="preserve")?(?:[^>]*)>([\\s\\S]*?)</(?:\\w+:)?' + t + ">", a || "") } }();
    var Me = function() { var e = [
            ["nbsp", " "],
            ["middot", "·"],
            ["quot", '"'],
            ["apos", "'"],
            ["gt", ">"],
            ["lt", "<"],
            ["amp", "&"]
        ].map(function(e) { return [new RegExp("&" + e[0] + ";", "g"), e[1]] }); return function r(t) { var a = t.trim().replace(/\s+/g, " ").replace(/<\s*[bB][rR]\s*\/?>/g, "\n").replace(/<[^>]*>/g, ""); for (var n = 0; n < e.length; ++n) a = a.replace(e[n][0], e[n][1]); return a } }();
    var Ue = function() { var e = {}; return function r(t) { if (e[t] !== undefined) return e[t]; return e[t] = new RegExp("<(?:vt:)?" + t + ">([\\s\\S]*?)</(?:vt:)?" + t + ">", "g") } }();
    var He = /<\/?(?:vt:)?variant>/g,
        We = /<(?:vt:)([^>]*)>([\s\S]*)</;

    function Ve(e, r) { var t = me(e); var a = e.match(Ue(t.baseType)) || []; var n = []; if (a.length != t.size) { if (r.WTF) throw new Error("unexpected vector length " + a.length + " != " + t.size); return n } a.forEach(function(e) { var r = e.replace(He, "").match(We); if (r) n.push({ v: De(r[2]), t: r[1] }) }); return n }
    var ze = /(^\s|\s$|\n)/;

    function Xe(e, r) { return "<" + e + (r.match(ze) ? ' xml:space="preserve"' : "") + ">" + r + "</" + e + ">" }

    function Ge(e) { return P(e).map(function(r) { return " " + r + '="' + e[r] + '"' }).join("") }

    function je(e, r, t) { return "<" + e + (t != null ? Ge(t) : "") + (r != null ? (r.match(ze) ? ' xml:space="preserve"' : "") + ">" + r + "</" + e : "/") + ">" }

    function Ke(e, r) { try { return e.toISOString().replace(/\.\d*/, "") } catch (t) { if (r) throw t } return "" }

    function Ye(e) { switch (typeof e) {
            case "string":
                return je("vt:lpwstr", e);
            case "number":
                return je((e | 0) == e ? "vt:i4" : "vt:r8", String(e));
            case "boolean":
                return je("vt:bool", e ? "true" : "false"); } if (e instanceof Date) return je("vt:filetime", Ke(e)); throw new Error("Unable to serialize " + e) }
    var $e = { dc: "http://purl.org/dc/elements/1.1/", dcterms: "http://purl.org/dc/terms/", dcmitype: "http://purl.org/dc/dcmitype/", mx: "http://schemas.microsoft.com/office/mac/excel/2008/main", r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships", sjs: "http://schemas.openxmlformats.org/package/2006/sheetjs/core-properties", vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", xsi: "http://www.w3.org/2001/XMLSchema-instance", xsd: "http://www.w3.org/2001/XMLSchema" };
    $e.main = ["http://schemas.openxmlformats.org/spreadsheetml/2006/main", "http://purl.oclc.org/ooxml/spreadsheetml/main", "http://schemas.microsoft.com/office/excel/2006/main", "http://schemas.microsoft.com/office/excel/2006/2"];
    var Ze = { o: "urn:schemas-microsoft-com:office:office", x: "urn:schemas-microsoft-com:office:excel", ss: "urn:schemas-microsoft-com:office:spreadsheet", dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882", mv: "http://macVmlSchemaUri", v: "urn:schemas-microsoft-com:vml", html: "http://www.w3.org/TR/REC-html40" };

    function Qe(e, r) { var t = 1 - 2 * (e[r + 7] >>> 7); var a = ((e[r + 7] & 127) << 4) + (e[r + 6] >>> 4 & 15); var n = e[r + 6] & 15; for (var i = 5; i >= 0; --i) n = n * 256 + e[r + i]; if (a == 2047) return n == 0 ? t * Infinity : NaN; if (a == 0) a = -1022;
        else { a -= 1023;
            n += Math.pow(2, 52) } return t * Math.pow(2, a - 52) * n }

    function Je(e, r, t) { var a = (r < 0 || 1 / r == -Infinity ? 1 : 0) << 7,
            n = 0,
            i = 0; var s = a ? -r : r; if (!isFinite(s)) { n = 2047;
            i = isNaN(r) ? 26985 : 0 } else if (s == 0) n = i = 0;
        else { n = Math.floor(Math.log(s) / Math.LN2);
            i = s * Math.pow(2, 52 - n); if (n <= -1023 && (!isFinite(i) || i < Math.pow(2, 52))) { n = -1022 } else { i -= Math.pow(2, 52);
                n += 1023 } } for (var o = 0; o <= 5; ++o, i /= 256) e[t + o] = i & 255;
        e[t + 6] = (n & 15) << 4 | i & 15;
        e[t + 7] = n >> 4 | a }
    var qe = function(e) { var r = [],
            t = 10240; for (var a = 0; a < e[0].length; ++a)
            for (var n = 0, i = e[0][a].length; n < i; n += t) r.push.apply(r, e[0][a].slice(n, n + t)); return r };
    var er = qe;
    var rr = function(e, r, t) { var a = []; for (var n = r; n < t; n += 2) a.push(String.fromCharCode(wr(e, n))); return a.join("").replace(B, "") };
    var tr = rr;
    var ar = function(e, r, t) { var a = []; for (var n = r; n < r + t; ++n) a.push(("0" + e[n].toString(16)).slice(-2)); return a.join("") };
    var nr = ar;
    var ir = function(e, r, t) { var a = []; for (var n = r; n < t; n++) a.push(String.fromCharCode(kr(e, n))); return a.join("") };
    var sr = ir;
    var or = function(e, r) { var t = _r(e, r); return t > 0 ? ir(e, r + 4, r + 4 + t - 1) : "" };
    var fr = or;
    var lr = function(e, r) { var t = _r(e, r); return t > 0 ? ir(e, r + 4, r + 4 + t - 1) : "" };
    var cr = lr;
    var ur = function(e, r) { var t = 2 * _r(e, r); return t > 0 ? ir(e, r + 4, r + 4 + t - 1) : "" };
    var hr = ur;
    var dr, vr;
    dr = vr = function zb(e, r) { var t = _r(e, r); return t > 0 ? rr(e, r + 4, r + 4 + t) : "" };
    var pr = function(e, r) { var t = _r(e, r); return t > 0 ? ir(e, r + 4, r + 4 + t) : "" };
    var br = pr;
    var mr, gr;
    mr = gr = function(e, r) { return Qe(e, r) };
    var Er = function Xb(e) { return Array.isArray(e) };
    if (E) { rr = function(e, r, t) { if (!Buffer.isBuffer(e)) return tr(e, r, t); return e.toString("utf16le", r, t).replace(B, "") };
        ar = function(e, r, t) { return Buffer.isBuffer(e) ? e.toString("hex", r, r + t) : nr(e, r, t) };
        or = function Gb(e, r) { if (!Buffer.isBuffer(e)) return fr(e, r); var t = e.readUInt32LE(r); return t > 0 ? e.toString("utf8", r + 4, r + 4 + t - 1) : "" };
        lr = function jb(e, r) { if (!Buffer.isBuffer(e)) return cr(e, r); var t = e.readUInt32LE(r); return t > 0 ? e.toString("utf8", r + 4, r + 4 + t - 1) : "" };
        ur = function Kb(e, r) { if (!Buffer.isBuffer(e)) return hr(e, r); var t = 2 * e.readUInt32LE(r); return e.toString("utf16le", r + 4, r + 4 + t - 1) };
        dr = function Yb(e, r) { if (!Buffer.isBuffer(e)) return vr(e, r); var t = e.readUInt32LE(r); return e.toString("utf16le", r + 4, r + 4 + t) };
        pr = function $b(e, r) { if (!Buffer.isBuffer(e)) return br(e, r); var t = e.readUInt32LE(r); return e.toString("utf8", r + 4, r + 4 + t) };
        ir = function Zb(e, r, t) { return Buffer.isBuffer(e) ? e.toString("utf8", r, t) : ir(e, r, t) };
        qe = function(e) { return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0]) : er(e) };
        C = function(e) { return Buffer.isBuffer(e[0]) ? Buffer.concat(e) : [].concat.apply([], e) };
        mr = function Qb(e, r) { if (Buffer.isBuffer(e)) return e.readDoubleLE(r); return gr(e, r) };
        Er = function Jb(e) { return Buffer.isBuffer(e) || Array.isArray(e) } }
    if (typeof cptable !== "undefined") { rr = function(e, r, t) { return cptable.utils.decode(1200, e.slice(r, t)).replace(B, "") };
        ir = function(e, r, t) { return cptable.utils.decode(65001, e.slice(r, t)) };
        or = function(e, r) { var t = _r(e, r); return t > 0 ? cptable.utils.decode(a, e.slice(r + 4, r + 4 + t - 1)) : "" };
        lr = function(e, r) { var a = _r(e, r); return a > 0 ? cptable.utils.decode(t, e.slice(r + 4, r + 4 + a - 1)) : "" };
        ur = function(e, r) { var t = 2 * _r(e, r); return t > 0 ? cptable.utils.decode(1200, e.slice(r + 4, r + 4 + t - 1)) : "" };
        dr = function(e, r) { var t = _r(e, r); return t > 0 ? cptable.utils.decode(1200, e.slice(r + 4, r + 4 + t)) : "" };
        pr = function(e, r) { var t = _r(e, r); return t > 0 ? cptable.utils.decode(65001, e.slice(r + 4, r + 4 + t)) : "" } }
    var kr = function(e, r) { return e[r] };
    var wr = function(e, r) { return e[r + 1] * (1 << 8) + e[r] };
    var Sr = function(e, r) { var t = e[r + 1] * (1 << 8) + e[r]; return t < 32768 ? t : (65535 - t + 1) * -1 };
    var _r = function(e, r) { return e[r + 3] * (1 << 24) + (e[r + 2] << 16) + (e[r + 1] << 8) + e[r] };
    var Cr = function(e, r) { return e[r + 3] << 24 | e[r + 2] << 16 | e[r + 1] << 8 | e[r] };
    var Br = function(e, r) { return e[r] << 24 | e[r + 1] << 16 | e[r + 2] << 8 | e[r + 3] };
    var Tr = function(e) { return (e.match(/../g) || []).map(function(e) { return parseInt(e, 16) }) };
    var xr = typeof Buffer !== "undefined" ? function(e) { return Buffer.isBuffer(e) ? new Buffer(e, "hex") : Tr(e) } : Tr;

    function Ir(e, r) { var a = "",
            n, i, s = [],
            o, f, l, c; switch (r) {
            case "dbcs":
                c = this.l; if (E && Buffer.isBuffer(this)) a = this.slice(this.l, this.l + 2 * e).toString("utf16le");
                else
                    for (l = 0; l != e; ++l) { a += String.fromCharCode(wr(this, c));
                        c += 2 } e *= 2; break;
            case "utf8":
                a = ir(this, this.l, this.l + e); break;
            case "utf16le":
                e *= 2;
                a = rr(this, this.l, this.l + e); break;
            case "wstr":
                if (typeof cptable !== "undefined") a = cptable.utils.decode(t, this.slice(this.l, this.l + 2 * e));
                else return Ir.call(this, e, "dbcs");
                e = 2 * e; break;
            case "lpstr-ansi":
                a = or(this, this.l);
                e = 4 + _r(this, this.l); break;
            case "lpstr-cp":
                a = lr(this, this.l);
                e = 4 + _r(this, this.l); break;
            case "lpwstr":
                a = ur(this, this.l);
                e = 4 + 2 * _r(this, this.l); break;
            case "lpp4":
                e = 4 + _r(this, this.l);
                a = dr(this, this.l); if (e & 2) e += 2; break;
            case "8lpp4":
                e = 4 + _r(this, this.l);
                a = pr(this, this.l); if (e & 3) e += 4 - (e & 3); break;
            case "cstr":
                e = 0;
                a = ""; while ((o = kr(this, this.l + e++)) !== 0) s.push(p(o));
                a = s.join(""); break;
            case "_wstr":
                e = 0;
                a = ""; while ((o = wr(this, this.l + e)) !== 0) { s.push(p(o));
                    e += 2 } e += 2;
                a = s.join(""); break;
            case "dbcs-cont":
                a = "";
                c = this.l; for (l = 0; l != e; ++l) { if (this.lens && this.lens.indexOf(c) !== -1) { o = kr(this, c);
                        this.l = c + 1;
                        f = Ir.call(this, e - l, o ? "dbcs-cont" : "sbcs-cont"); return s.join("") + f } s.push(p(wr(this, c)));
                    c += 2 } a = s.join("");
                e *= 2; break;
            case "cpstr":
                if (typeof cptable !== "undefined") { a = cptable.utils.decode(t, this.slice(this.l, this.l + e)); break };
            case "sbcs-cont":
                a = "";
                c = this.l; for (l = 0; l != e; ++l) { if (this.lens && this.lens.indexOf(c) !== -1) { o = kr(this, c);
                        this.l = c + 1;
                        f = Ir.call(this, e - l, o ? "dbcs-cont" : "sbcs-cont"); return s.join("") + f } s.push(p(kr(this, c)));
                    c += 1 } a = s.join(""); break;
            default:
                switch (e) {
                    case 1:
                        n = kr(this, this.l);
                        this.l++; return n;
                    case 2:
                        n = (r === "i" ? Sr : wr)(this, this.l);
                        this.l += 2; return n;
                    case 4:
                        ;
                    case -4:
                        if (r === "i" || (this[this.l + 3] & 128) === 0) { n = (e > 0 ? Cr : Br)(this, this.l);
                            this.l += 4; return n } else { i = _r(this, this.l);
                            this.l += 4 } return i;
                    case 8:
                        ;
                    case -8:
                        if (r === "f") { if (e == 8) i = mr(this, this.l);
                            else i = mr([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0);
                            this.l += 8; return i } else e = 8;
                    case 16:
                        a = ar(this, this.l, e); break; }; } this.l += e; return a }
    var Ar = function(e, r, t) { e[t] = r & 255;
        e[t + 1] = r >>> 8 & 255;
        e[t + 2] = r >>> 16 & 255;
        e[t + 3] = r >>> 24 & 255 };
    var yr = function(e, r, t) { e[t] = r & 255;
        e[t + 1] = r >> 8 & 255;
        e[t + 2] = r >> 16 & 255;
        e[t + 3] = r >> 24 & 255 };
    var Rr = function(e, r, t) { e[t] = r & 255;
        e[t + 1] = r >>> 8 & 255 };

    function Dr(e, r, t) { var a = 0,
            n = 0; if (t === "dbcs") { for (n = 0; n != r.length; ++n) Rr(this, r.charCodeAt(n), this.l + 2 * n);
            a = 2 * r.length } else if (t === "sbcs") { r = r.replace(/[^\x00-\x7F]/g, "_"); for (n = 0; n != r.length; ++n) this[this.l + n] = r.charCodeAt(n) & 255;
            a = r.length } else if (t === "hex") { for (; n < e; ++n) { this[this.l++] = parseInt(r.slice(2 * n, 2 * n + 2), 16) || 0 } return this } else if (t === "utf16le") { var i = this.l + e; for (n = 0; n < Math.min(r.length, e); ++n) { var s = r.charCodeAt(n);
                this[this.l++] = s & 255;
                this[this.l++] = s >> 8 } while (this.l < i) this[this.l++] = 0; return this } else switch (e) {
            case 1:
                a = 1;
                this[this.l] = r & 255; break;
            case 2:
                a = 2;
                this[this.l] = r & 255;
                r >>>= 8;
                this[this.l + 1] = r & 255; break;
            case 3:
                a = 3;
                this[this.l] = r & 255;
                r >>>= 8;
                this[this.l + 1] = r & 255;
                r >>>= 8;
                this[this.l + 2] = r & 255; break;
            case 4:
                a = 4;
                Ar(this, r, this.l); break;
            case 8:
                a = 8; if (t === "f") { Je(this, r, this.l); break };
            case 16:
                break;
            case -4:
                a = 4;
                yr(this, r, this.l); break; } this.l += a; return this }

    function Or(e, r) { var t = ar(this, this.l, e.length >> 1); if (t !== e) throw new Error(r + "Expected " + e + " saw " + t);
        this.l += e.length >> 1 }

    function Fr(e, r) { e.l = r;
        e._R = Ir;
        e.chk = Or;
        e._W = Dr }

    function Pr(e, r) { e.l += r }

    function Nr(e) { var r = k(e);
        Fr(r, 0); return r }

    function Lr(e, r, t) { if (!e) return; var a, n, i;
        Fr(e, e.l || 0); var s = e.length,
            o = 0,
            f = 0; while (e.l < s) { o = e._R(1); if (o & 128) o = (o & 127) + ((e._R(1) & 127) << 7); var l = dp[o] || dp[65535];
            a = e._R(1);
            i = a & 127; for (n = 1; n < 4 && a & 128; ++n) i += ((a = e._R(1)) & 127) << 7 * n;
            f = e.l + i; var c = (l.f || Pr)(e, i, t);
            e.l = f; if (r(c, l.n, o)) return } }

    function Mr() { var e = [],
            r = E ? 256 : 2048; var t = function f(e) { var r = Nr(e);
            Fr(r, 0); return r }; var a = t(r); var n = function l() { if (!a) return; if (a.length > a.l) a = a.slice(0, a.l); if (a.length > 0) e.push(a);
            a = null }; var i = function c(e) { if (a && e < a.length - a.l) return a;
            n(); return a = t(Math.max(e + 1, r)) }; var s = function u() { n(); return qe([e]) }; var o = function h(e) { n();
            a = e;
            i(r) }; return { next: i, push: o, end: s, _bufs: e } }

    function Ur(e, r, t, a) { var n = +vp[r],
            i; if (isNaN(n)) return; if (!a) a = dp[n].p || (t || []).length || 0;
        i = 1 + (n >= 128 ? 1 : 0) + 1; if (a >= 128) ++i; if (a >= 16384) ++i; if (a >= 2097152) ++i; var s = e.next(i); if (n <= 127) s._W(1, n);
        else { s._W(1, (n & 127) + 128);
            s._W(1, n >> 7) } for (var o = 0; o != 4; ++o) { if (a >= 128) { s._W(1, (a & 127) + 128);
                a >>= 7 } else { s._W(1, a); break } } if (a > 0 && Er(t)) e.push(t) }

    function Hr(e, r, t) { var a = $(e); if (r.s) { if (a.cRel) a.c += r.s.c; if (a.rRel) a.r += r.s.r } else { if (a.cRel) a.c += r.c; if (a.rRel) a.r += r.r } if (!t || t.biff < 12) { while (a.c >= 256) a.c -= 256; while (a.r >= 65536) a.r -= 65536 } return a }

    function Wr(e, r, t) { var a = $(e);
        a.s = Hr(a.s, r.s, t);
        a.e = Hr(a.e, r.s, t); return a }

    function Vr(e) { var r = tt(e); if (e.cRel === 0) r = Jr(r); if (e.rRel === 0) r = Yr(r); return r }

    function zr(e, r) { if (e.s.r == 0 && !e.s.rRel) { if (e.e.r == (r.biff >= 12 ? 1048575 : 65535) && !e.e.rRel) { return (e.s.cRel ? "" : "$") + Qr(e.s.c) + ":" + (e.e.cRel ? "" : "$") + Qr(e.e.c) } } if (e.s.c == 0 && !e.s.cRel) { if (e.e.c == (r.biff >= 12 ? 65535 : 255) && !e.e.cRel) { return (e.s.rRel ? "" : "$") + Kr(e.s.r) + ":" + (e.e.rRel ? "" : "$") + Kr(e.e.r) } } return Vr(e.s) + ":" + Vr(e.e) }
    var Xr = {};
    var Gr = function(e, r) { var t; if (typeof r !== "undefined") t = r;
        else if (typeof require !== "undefined") { try { t = undefined } catch (a) { t = null } } e.rc4 = function(e, r) { var t = new Array(256); var a = 0,
                n = 0,
                i = 0,
                s = 0; for (n = 0; n != 256; ++n) t[n] = n; for (n = 0; n != 256; ++n) { i = i + t[n] + e[n % e.length].charCodeAt(0) & 255;
                s = t[n];
                t[n] = t[i];
                t[i] = s } n = i = 0; var o = Buffer(r.length); for (a = 0; a != r.length; ++a) { n = n + 1 & 255;
                i = (i + t[n]) % 256;
                s = t[n];
                t[n] = t[i];
                t[i] = s;
                o[a] = r[a] ^ t[t[n] + t[i] & 255] } return o };
        e.md5 = function(e) { if (!t) throw new Error("Unsupported crypto"); return t.createHash("md5").update(e).digest("hex") } };
    Gr(Xr, typeof crypto !== "undefined" ? crypto : undefined);

    function jr(e) { return parseInt($r(e), 10) - 1 }

    function Kr(e) { return "" + (e + 1) }

    function Yr(e) { return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2") }

    function $r(e) { return e.replace(/\$(\d+)$/, "$1") }

    function Zr(e) { var r = qr(e),
            t = 0,
            a = 0; for (; a !== r.length; ++a) t = 26 * t + r.charCodeAt(a) - 64; return t - 1 }

    function Qr(e) { var r = ""; for (++e; e; e = Math.floor((e - 1) / 26)) r = String.fromCharCode((e - 1) % 26 + 65) + r; return r }

    function Jr(e) { return e.replace(/^([A-Z])/, "$$$1") }

    function qr(e) { return e.replace(/^\$([A-Z])/, "$1") }

    function et(e) { return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",") }

    function rt(e) { var r = et(e); return { c: Zr(r[0]), r: jr(r[1]) } }

    function tt(e) { return Qr(e.c) + Kr(e.r) }

    function at(e) { return Jr(Yr(e)) }

    function nt(e) { return qr($r(e)) }

    function it(e) { var r = e.split(":").map(rt); return { s: r[0], e: r[r.length - 1] } }

    function st(e, r) { if (typeof r === "undefined" || typeof r === "number") { return st(e.s, e.e) } if (typeof e !== "string") e = tt(e); if (typeof r !== "string") r = tt(r); return e == r ? e : e + ":" + r }

    function ot(e) { var r = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } }; var t = 0,
            a = 0,
            n = 0; var i = e.length; for (t = 0; a < i; ++a) { if ((n = e.charCodeAt(a) - 64) < 1 || n > 26) break;
            t = 26 * t + n } r.s.c = --t; for (t = 0; a < i; ++a) { if ((n = e.charCodeAt(a) - 48) < 0 || n > 9) break;
            t = 10 * t + n } r.s.r = --t; if (a === i || e.charCodeAt(++a) === 58) { r.e.c = r.s.c;
            r.e.r = r.s.r; return r } for (t = 0; a != i; ++a) { if ((n = e.charCodeAt(a) - 64) < 1 || n > 26) break;
            t = 26 * t + n } r.e.c = --t; for (t = 0; a != i; ++a) { if ((n = e.charCodeAt(a) - 48) < 0 || n > 9) break;
            t = 10 * t + n } r.e.r = --t; return r }

    function ft(e, r) { var t = e.t == "d" && r instanceof Date; if (e.z != null) try { return e.w = x.format(e.z, t ? V(r) : r) } catch (a) {}
        try { return e.w = x.format((e.XF || {}).numFmtId || (t ? 14 : 0), t ? V(r) : r) } catch (a) { return "" + r } }

    function lt(e, r, t) { if (e == null || e.t == null || e.t == "z") return ""; if (e.w !== undefined) return e.w; if (e.t == "d" && !e.z && t && t.dateNF) e.z = t.dateNF; if (r == undefined) return ft(e, e.v); return ft(e, r) }

    function ct(e, r) { var t = r && r.sheet ? r.sheet : "Sheet1"; var a = {};
        a[t] = e; return { SheetNames: [t], Sheets: a } }

    function ut(e, r, t) { var a = t || {}; var n = e ? Array.isArray(e) : a.dense; if (b != null && n == null) n = b; var i = e || (n ? [] : {}); var s = 0,
            o = 0; if (i && a.origin != null) { if (typeof a.origin == "number") s = a.origin;
            else { var f = typeof a.origin == "string" ? rt(a.origin) : a.origin;
                s = f.r;
                o = f.c } } var l = { s: { c: 1e7, r: 1e7 }, e: { c: 0, r: 0 } }; if (i["!ref"]) { var c = ot(i["!ref"]);
            l.s.c = c.s.c;
            l.s.r = c.s.r;
            l.e.c = Math.max(l.e.c, c.e.c);
            l.e.r = Math.max(l.e.r, c.e.r); if (s == -1) l.e.r = s = c.e.r + 1 } for (var u = 0; u != r.length; ++u) { for (var h = 0; h != r[u].length; ++h) { if (typeof r[u][h] === "undefined") continue; var d = { v: r[u][h] }; if (Array.isArray(d.v)) { d.f = r[u][h][1];
                    d.v = d.v[0] } var v = s + u,
                    p = o + h; if (l.s.r > v) l.s.r = v; if (l.s.c > p) l.s.c = p; if (l.e.r < v) l.e.r = v; if (l.e.c < p) l.e.c = p; if (d.v === null) { if (d.f) d.t = "n";
                    else if (!a.cellStubs) continue;
                    else d.t = "z" } else if (typeof d.v === "number") d.t = "n";
                else if (typeof d.v === "boolean") d.t = "b";
                else if (d.v instanceof Date) { d.z = a.dateNF || x._table[14]; if (a.cellDates) { d.t = "d";
                        d.w = x.format(d.z, V(d.v)) } else { d.t = "n";
                        d.v = V(d.v);
                        d.w = x.format(d.z, d.v) } } else d.t = "s"; if (n) { if (!i[v]) i[v] = [];
                    i[v][p] = d } else { var m = tt({ c: p, r: v });
                    i[m] = d } } } if (l.s.c < 1e7) i["!ref"] = st(l); return i }

    function ht(e, r) { return ut(null, e, r) }

    function dt(e, r) { if (!r) r = Nr(4);
        r._W(4, e); return r }

    function vt(e) { var r = e._R(4); return r === 0 ? "" : e._R(r, "dbcs") }

    function pt(e, r) { var t = false; if (r == null) { t = true;
            r = Nr(4 + 2 * e.length) } r._W(4, e.length); if (e.length > 0) r._W(0, e, "dbcs"); return t ? r.slice(0, r.l) : r }

    function bt(e, r) { return { ich: e._R(2), ifnt: e._R(2) } }

    function mt(e, r) { if (!r) r = Nr(4);
        r._W(2, e.ich || 0);
        r._W(2, e.ifnt || 0); return r }

    function gt(e, r) { var t = e.l; var a = e._R(1); var n = vt(e); var i = []; var s = { t: n, h: n }; if ((a & 1) !== 0) { var o = e._R(4); for (var f = 0; f != o; ++f) i.push(bt(e));
            s.r = i } else s.r = [{ ich: 0, ifnt: 0 }];
        e.l = t + r; return s }

    function Et(e, r) { var t = false; if (r == null) { t = true;
            r = Nr(15 + 4 * e.t.length) } r._W(1, 0);
        pt(e.t, r); return t ? r.slice(0, r.l) : r }
    var kt = gt;

    function wt(e, r) { var t = false; if (r == null) { t = true;
            r = Nr(23 + 4 * e.t.length) } r._W(1, 1);
        pt(e.t, r);
        r._W(4, 1);
        mt({ ich: 0, ifnt: 0 }, r); return t ? r.slice(0, r.l) : r }

    function St(e) { var r = e._R(4); var t = e._R(2);
        t += e._R(1) << 16; var a = e._R(1); return { c: r, iStyleRef: t } }

    function _t(e, r) { if (r == null) r = Nr(8);
        r._W(-4, e.c);
        r._W(3, e.iStyleRef || e.s);
        r._W(1, 0); return r }
    var Ct = vt;
    var Bt = pt;

    function Tt(e) { var r = e._R(4); return r === 0 || r === 4294967295 ? "" : e._R(r, "dbcs") }

    function xt(e, r) { var t = false; if (r == null) { t = true;
            r = Nr(127) } r._W(4, e.length > 0 ? e.length : 4294967295); if (e.length > 0) r._W(0, e, "dbcs"); return t ? r.slice(0, r.l) : r }
    var It = vt;
    var At = pt;
    var yt = Tt;
    var Rt = xt;

    function Dt(e) { var r = e.slice(e.l, e.l + 4); var t = r[0] & 1,
            a = r[0] & 2;
        e.l += 4;
        r[0] &= 252; var n = a === 0 ? mr([0, 0, 0, 0, r[0], r[1], r[2], r[3]], 0) : Cr(r, 0) >> 2; return t ? n / 100 : n }

    function Ot(e, r) { if (r == null) r = Nr(4); var t = 0,
            a = 0,
            n = e * 100; if (e == (e | 0) && e >= -(1 << 29) && e < 1 << 29) { a = 1 } else if (n == (n | 0) && n >= -(1 << 29) && n < 1 << 29) { a = 1;
            t = 1 } if (a) r._W(-4, ((t ? n : e) << 2) + (t + 2));
        else throw new Error("unsupported RkNumber " + e) }

    function Ft(e) { var r = { s: {}, e: {} };
        r.s.r = e._R(4);
        r.e.r = e._R(4);
        r.s.c = e._R(4);
        r.e.c = e._R(4); return r }

    function Pt(e, r) { if (!r) r = Nr(16);
        r._W(4, e.s.r);
        r._W(4, e.e.r);
        r._W(4, e.s.c);
        r._W(4, e.e.c); return r }
    var Nt = Ft;
    var Lt = Pt;

    function Mt(e, r) { return e._R(8, "f") }

    function Ut(e, r) { return (r || Nr(8))._W(8, e, "f") }
    var Ht = { 0: "#NULL!", 7: "#DIV/0!", 15: "#VALUE!", 23: "#REF!", 29: "#NAME?", 36: "#NUM!", 42: "#N/A", 43: "#GETTING_DATA", 255: "#WTF?" };
    var Wt = M(Ht);

    function Vt(e, r) { var t = {}; var a = e._R(1); var n = a & 1; var i = a >>> 1; var s = e._R(1); var o = e._R(2, "i"); var f = e._R(1); var l = e._R(1); var c = e._R(1); var u = e._R(1); switch (i) {
            case 0:
                t.auto = 1; break;
            case 1:
                t.index = s; var h = va[s]; if (h) t.rgb = Oo(h); break;
            case 2:
                t.rgb = Oo([f, l, c]); break;
            case 3:
                t.theme = s; break; } if (o != 0) t.tint = o > 0 ? o / 32767 : o / 32768; return t }

    function zt(e, r) { if (!r) r = Nr(8); if (!e || e.auto) { r._W(4, 0);
            r._W(4, 0); return r } if (e.index) { r._W(1, 2);
            r._W(1, e.index) } else if (e.theme) { r._W(1, 6);
            r._W(1, e.theme) } else { r._W(1, 5);
            r._W(1, 0) } var t = e.tint || 0; if (t > 0) t *= 32767;
        else if (t < 0) t *= 32768;
        r._W(2, t); if (!e.rgb) { r._W(2, 0);
            r._W(1, 0);
            r._W(1, 0) } else { var a = e.rgb || "FFFFFF";
            r._W(1, parseInt(a.substr(0, 2), 16));
            r._W(1, parseInt(a.substr(2, 2), 16));
            r._W(1, parseInt(a.substr(4, 2), 16));
            r._W(1, 255) } return r }

    function Xt(e, r, t) { var a = e._R(1);
        e.l++; var n = { fItalic: a & 2, fStrikeout: a & 8, fOutline: a & 16, fShadow: a & 32, fCondense: a & 64, fExtend: a & 128 }; return n }

    function Gt(e, r) { if (!r) r = Nr(2); var t = (e.italic ? 2 : 0) | (e.strike ? 8 : 0) | (e.outline ? 16 : 0) | (e.shadow ? 32 : 0) | (e.condense ? 64 : 0) | (e.extend ? 128 : 0);
        r._W(1, t);
        r._W(1, 0); return r }

    function jt(e, r) { var t = { 2: "BITMAP", 3: "METAFILEPICT", 8: "DIB", 14: "ENHMETAFILE" }; var a = e._R(4); switch (a) {
            case 0:
                return "";
            case 4294967295:
                ;
            case 4294967294:
                return t[e._R(4)] || ""; } if (a > 400) throw new Error("Unsupported Clipboard: " + a.toString(16));
        e.l -= 4; return e._R(0, r == 1 ? "lpstr" : "lpwstr") }

    function Kt(e) { return jt(e, 1) }

    function Yt(e) { return jt(e, 2) }
    var $t = 2;
    var Zt = 3;
    var Qt = 11;
    var Jt = 12;
    var qt = 19;
    var ea = 21;
    var ra = 30;
    var ta = 64;
    var aa = 71;
    var na = 4096;
    var ia = 80;
    var sa = 81;
    var oa = [ia, sa];
    var fa = { 1: { n: "CodePage", t: $t }, 2: { n: "Category", t: ia }, 3: { n: "PresentationFormat", t: ia }, 4: { n: "ByteCount", t: Zt }, 5: { n: "LineCount", t: Zt }, 6: { n: "ParagraphCount", t: Zt }, 7: { n: "SlideCount", t: Zt }, 8: { n: "NoteCount", t: Zt }, 9: { n: "HiddenCount", t: Zt }, 10: { n: "MultimediaClipCount", t: Zt }, 11: { n: "Scale", t: Qt }, 12: { n: "HeadingPair", t: na | Jt }, 13: { n: "DocParts", t: na | ra }, 14: { n: "Manager", t: ia }, 15: { n: "Company", t: ia }, 16: { n: "LinksDirty", t: Qt }, 17: { n: "CharacterCount", t: Zt }, 19: { n: "SharedDoc", t: Qt }, 22: { n: "HLinksChanged", t: Qt }, 23: { n: "AppVersion", t: Zt, p: "version" }, 26: { n: "ContentType", t: ia }, 27: { n: "ContentStatus", t: ia }, 28: { n: "Language", t: ia }, 29: { n: "Version", t: ia }, 255: {} };
    var la = { 1: { n: "CodePage", t: $t }, 2: { n: "Title", t: ia }, 3: { n: "Subject", t: ia }, 4: { n: "Author", t: ia }, 5: { n: "Keywords", t: ia }, 6: { n: "Comments", t: ia }, 7: { n: "Template", t: ia }, 8: { n: "LastAuthor", t: ia }, 9: { n: "RevNumber", t: ia }, 10: { n: "EditTime", t: ta }, 11: { n: "LastPrinted", t: ta }, 12: { n: "CreatedDate", t: ta }, 13: { n: "ModifiedDate", t: ta }, 14: { n: "PageCount", t: Zt }, 15: { n: "WordCount", t: Zt }, 16: { n: "CharCount", t: Zt }, 17: { n: "Thumbnail", t: aa }, 18: { n: "ApplicationName", t: ia }, 19: { n: "DocumentSecurity", t: Zt }, 255: {} };
    var ca = { 2147483648: { n: "Locale", t: qt }, 2147483651: { n: "Behavior", t: qt }, 1919054434: {} };
    (function() { for (var e in ca)
            if (ca.hasOwnProperty(e)) fa[e] = la[e] = ca[e] })();
    var ua = { 1: "US", 2: "CA", 3: "", 7: "RU", 20: "EG", 30: "GR", 31: "NL", 32: "BE", 33: "FR", 34: "ES", 36: "HU", 39: "IT", 41: "CH", 43: "AT", 44: "GB", 45: "DK", 46: "SE", 47: "NO", 48: "PL", 49: "DE", 52: "MX", 55: "BR", 61: "AU", 64: "NZ", 66: "TH", 81: "JP", 82: "KR", 84: "VN", 86: "CN", 90: "TR", 105: "JS", 213: "DZ", 216: "MA", 218: "LY", 351: "PT", 354: "IS", 358: "FI", 420: "CZ", 886: "TW", 961: "LB", 962: "JO", 963: "SY", 964: "IQ", 965: "KW", 966: "SA", 971: "AE", 972: "IL", 974: "QA", 981: "IR", 65535: "US" };
    var ha = [null, "solid", "mediumGray", "darkGray", "lightGray", "darkHorizontal", "darkVertical", "darkDown", "darkUp", "darkGrid", "darkTrellis", "lightHorizontal", "lightVertical", "lightDown", "lightUp", "lightGrid", "lightTrellis", "gray125", "gray0625"];

    function da(e) { return e.map(function(e) { return [e >> 16 & 255, e >> 8 & 255, e & 255] }) }
    var va = da([0, 16777215, 16711680, 65280, 255, 16776960, 16711935, 65535, 0, 16777215, 16711680, 65280, 255, 16776960, 16711935, 65535, 8388608, 32768, 128, 8421376, 8388736, 32896, 12632256, 8421504, 10066431, 10040166, 16777164, 13434879, 6684774, 16744576, 26316, 13421823, 128, 16711935, 16776960, 65535, 8388736, 8388608, 32896, 255, 52479, 13434879, 13434828, 16777113, 10079487, 16751052, 13408767, 16764057, 3368703, 3394764, 10079232, 16763904, 16750848, 16737792, 6710937, 9868950, 13158, 3381606, 13056, 3355392, 10040064, 10040166, 3355545, 3355443, 16777215, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    var pa = { "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": "workbooks", "application/vnd.ms-excel.binIndexWs": "TODO", "application/vnd.ms-excel.intlmacrosheet": "TODO", "application/vnd.ms-excel.binIndexMs": "TODO", "application/vnd.openxmlformats-package.core-properties+xml": "coreprops", "application/vnd.openxmlformats-officedocument.custom-properties+xml": "custprops", "application/vnd.openxmlformats-officedocument.extended-properties+xml": "extprops", "application/vnd.openxmlformats-officedocument.customXmlProperties+xml": "TODO", "application/vnd.openxmlformats-officedocument.spreadsheetml.customProperty": "TODO", "application/vnd.ms-excel.pivotTable": "TODO", "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml": "TODO", "application/vnd.ms-office.chartcolorstyle+xml": "TODO", "application/vnd.ms-office.chartstyle+xml": "TODO", "application/vnd.ms-excel.calcChain": "calcchains", "application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml": "calcchains", "application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings": "TODO", "application/vnd.ms-office.activeX": "TODO", "application/vnd.ms-office.activeX+xml": "TODO", "application/vnd.ms-excel.attachedToolbars": "TODO", "application/vnd.ms-excel.connections": "TODO", "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": "TODO", "application/vnd.ms-excel.externalLink": "links", "application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml": "links", "application/vnd.ms-excel.sheetMetadata": "TODO", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml": "TODO", "application/vnd.ms-excel.pivotCacheDefinition": "TODO", "application/vnd.ms-excel.pivotCacheRecords": "TODO", "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml": "TODO", "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml": "TODO", "application/vnd.ms-excel.queryTable": "TODO", "application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml": "TODO", "application/vnd.ms-excel.userNames": "TODO", "application/vnd.ms-excel.revisionHeaders": "TODO", "application/vnd.ms-excel.revisionLog": "TODO", "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml": "TODO", "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml": "TODO", "application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml": "TODO", "application/vnd.ms-excel.tableSingleCells": "TODO", "application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml": "TODO", "application/vnd.ms-excel.slicer": "TODO", "application/vnd.ms-excel.slicerCache": "TODO", "application/vnd.ms-excel.slicer+xml": "TODO", "application/vnd.ms-excel.slicerCache+xml": "TODO", "application/vnd.ms-excel.wsSortMap": "TODO", "application/vnd.ms-excel.table": "TODO", "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": "TODO", "application/vnd.openxmlformats-officedocument.theme+xml": "themes", "application/vnd.openxmlformats-officedocument.themeOverride+xml": "TODO", "application/vnd.ms-excel.Timeline+xml": "TODO", "application/vnd.ms-excel.TimelineCache+xml": "TODO", "application/vnd.ms-office.vbaProject": "vba", "application/vnd.ms-office.vbaProjectSignature": "vba", "application/vnd.ms-office.volatileDependencies": "TODO", "application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml": "TODO", "application/vnd.ms-excel.controlproperties+xml": "TODO", "application/vnd.openxmlformats-officedocument.model+data": "TODO", "application/vnd.ms-excel.Survey+xml": "TODO", "application/vnd.openxmlformats-officedocument.drawing+xml": "drawings", "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": "TODO", "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": "TODO", "application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml": "TODO", "application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml": "TODO", "application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml": "TODO", "application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml": "TODO", "application/vnd.openxmlformats-officedocument.vmlDrawing": "TODO", "application/vnd.openxmlformats-package.relationships+xml": "rels", "application/vnd.openxmlformats-officedocument.oleObject": "TODO", "image/png": "TODO", sheet: "js" };
    var ba = function() { var e = { workbooks: { xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml", xlsm: "application/vnd.ms-excel.sheet.macroEnabled.main+xml", xlsb: "application/vnd.ms-excel.sheet.binary.macroEnabled.main", xlam: "application/vnd.ms-excel.addin.macroEnabled.main+xml", xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml" }, strs: { xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml", xlsb: "application/vnd.ms-excel.sharedStrings" }, comments: { xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml", xlsb: "application/vnd.ms-excel.comments" }, sheets: { xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml", xlsb: "application/vnd.ms-excel.worksheet" }, charts: { xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml", xlsb: "application/vnd.ms-excel.chartsheet" }, dialogs: { xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml", xlsb: "application/vnd.ms-excel.dialogsheet" }, macros: { xlsx: "application/vnd.ms-excel.macrosheet+xml", xlsb: "application/vnd.ms-excel.macrosheet" }, styles: { xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml", xlsb: "application/vnd.ms-excel.styles" } };
        P(e).forEach(function(r) {
            ["xlsm", "xlam"].forEach(function(t) { if (!e[r][t]) e[r][t] = e[r].xlsx }) });
        P(e).forEach(function(r) { P(e[r]).forEach(function(t) { pa[e[r][t]] = r }) }); return e }();
    var ma = U(pa);
    $e.CT = "http://schemas.openxmlformats.org/package/2006/content-types";

    function ga() { return { workbooks: [], sheets: [], charts: [], dialogs: [], macros: [], rels: [], strs: [], comments: [], links: [], coreprops: [], extprops: [], custprops: [], themes: [], styles: [], calcchains: [], vba: [], drawings: [], TODO: [], xmlns: "" } }

    function Ea(e, r) { var t = ga(); if (!e || !e.match) return t; var a = {};
        (e.match(ve) || []).forEach(function(e) { var r = me(e); switch (r[0].replace(pe, "<")) {
                case "<?xml":
                    break;
                case "<Types":
                    t.xmlns = r["xmlns" + (r[0].match(/<(\w+):/) || ["", ""])[1]]; break;
                case "<Default":
                    a[r.Extension] = r.ContentType; break;
                case "<Override":
                    if (t[pa[r.ContentType]] !== undefined) t[pa[r.ContentType]].push(r.PartName); break; } }); if (t.xmlns !== $e.CT) throw new Error("Unknown Namespace: " + t.xmlns);
        t.calcchain = t.calcchains.length > 0 ? t.calcchains[0] : "";
        t.sst = t.strs.length > 0 ? t.strs[0] : "";
        t.style = t.styles.length > 0 ? t.styles[0] : "";
        t.defaults = a;
        delete t.calcchains; return t }
    var ka = je("Types", null, { xmlns: $e.CT, "xmlns:xsd": $e.xsd, "xmlns:xsi": $e.xsi });
    var wa = [
        ["xml", "application/xml"],
        ["bin", "application/vnd.ms-excel.sheet.binary.macroEnabled.main"],
        ["vml", "application/vnd.openxmlformats-officedocument.vmlDrawing"],
        ["bmp", "image/bmp"],
        ["png", "image/png"],
        ["gif", "image/gif"],
        ["emf", "image/x-emf"],
        ["wmf", "image/x-wmf"],
        ["jpg", "image/jpeg"],
        ["jpeg", "image/jpeg"],
        ["tif", "image/tiff"],
        ["tiff", "image/tiff"],
        ["pdf", "application/pdf"],
        ["rels", ma.rels[0]]
    ].map(function(e) { return je("Default", null, { Extension: e[0], ContentType: e[1] }) });

    function Sa(e, r) { var t = [],
            a;
        t[t.length] = he;
        t[t.length] = ka;
        t = t.concat(wa); var n = function(n) { if (e[n] && e[n].length > 0) { a = e[n][0];
                t[t.length] = je("Override", null, { PartName: (a[0] == "/" ? "" : "/") + a, ContentType: ba[n][r.bookType || "xlsx"] }) } }; var i = function(a) {
            (e[a] || []).forEach(function(e) { t[t.length] = je("Override", null, { PartName: (e[0] == "/" ? "" : "/") + e, ContentType: ba[a][r.bookType || "xlsx"] }) }) }; var s = function(r) {
            (e[r] || []).forEach(function(e) { t[t.length] = je("Override", null, { PartName: (e[0] == "/" ? "" : "/") + e, ContentType: ma[r][0] }) }) };
        n("workbooks");
        i("sheets");
        i("charts");
        s("themes");
        ["strs", "styles"].forEach(n);
        ["coreprops", "extprops", "custprops"].forEach(s);
        s("vba");
        s("comments");
        s("drawings"); if (t.length > 2) { t[t.length] = "</Types>";
            t[1] = t[1].replace("/>", ">") } return t.join("") }
    var _a = { WB: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument", SHEET: "http://sheetjs.openxmlformats.org/officeDocument/2006/relationships/officeDocument", HLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", VML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing", VBA: "http://schemas.microsoft.com/office/2006/relationships/vbaProject" };

    function Ca(e) { var r = e.lastIndexOf("/"); return e.substr(0, r + 1) + "_rels/" + e.substr(r + 1) + ".rels" }

    function Ba(e, r) { if (!e) return e; if (r.charAt(0) !== "/") { r = "/" + r } var t = {}; var a = {};
        (e.match(ve) || []).forEach(function(e) { var n = me(e); if (n[0] === "<Relationship") { var i = {};
                i.Type = n.Type;
                i.Target = n.Target;
                i.Id = n.Id;
                i.TargetMode = n.TargetMode; var s = n.TargetMode === "External" ? n.Target : ue(n.Target, r);
                t[s] = i;
                a[n.Id] = i } });
        t["!id"] = a; return t } $e.RELS = "http://schemas.openxmlformats.org/package/2006/relationships";
    var Ta = je("Relationships", null, { xmlns: $e.RELS });

    function xa(e) { var r = [he, Ta];
        P(e["!id"]).forEach(function(t) { r[r.length] = je("Relationship", null, e["!id"][t]) }); if (r.length > 2) { r[r.length] = "</Relationships>";
            r[1] = r[1].replace("/>", ">") } return r.join("") }

    function Ia(e, r, t, a, n) { if (!n) n = {}; if (!e["!id"]) e["!id"] = {}; if (r < 0)
            for (r = 1; e["!id"]["rId" + r]; ++r) {} n.Id = "rId" + r;
        n.Type = a;
        n.Target = t; if (n.Type == _a.HLINK) n.TargetMode = "External"; if (e["!id"][n.Id]) throw new Error("Cannot rewrite rId " + r);
        e["!id"][n.Id] = n;
        e[("/" + n.Target).replace("//", "/")] = n; return r }
    var Aa = "application/vnd.oasis.opendocument.spreadsheet";

    function ya(e, r) { var t = Vv(e); var a; var n; while (a = zv.exec(t)) switch (a[3]) {
            case "manifest":
                break;
            case "file-entry":
                n = me(a[0], false); if (n.path == "/" && n.type !== Aa) throw new Error("This OpenDocument is not a spreadsheet"); break;
            case "encryption-data":
                ;
            case "algorithm":
                ;
            case "start-key-generation":
                ;
            case "key-derivation":
                throw new Error("Unsupported ODS Encryption");
            default:
                if (r && r.WTF) throw a; } }

    function Ra(e, r) { var t = [he];
        t.push('<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">\n');
        t.push('  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>\n'); for (var a = 0; a < e.length; ++a) t.push('  <manifest:file-entry manifest:full-path="' + e[a][0] + '" manifest:media-type="' + e[a][1] + '"/>\n');
        t.push("</manifest:manifest>"); return t.join("") }

    function Da(e, r, t) { return ['  <rdf:Description rdf:about="' + e + '">\n', '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (t || "odf") + "#" + r + '"/>\n', "  </rdf:Description>\n"].join("") }

    function Oa(e, r) { return ['  <rdf:Description rdf:about="' + e + '">\n', '    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + r + '"/>\n', "  </rdf:Description>\n"].join("") }

    function Fa(e, r) { var t = [he];
        t.push('<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">\n'); for (var a = 0; a != e.length; ++a) { t.push(Da(e[a][0], e[a][1]));
            t.push(Oa("", e[a][0])) } t.push(Da("", "Document", "pkg"));
        t.push("</rdf:RDF>"); return t.join("") }
    var Pa = function() { var e = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>Sheet' + "JS " + r.version + "</meta:generator></office:meta></office:document-meta>"; return function t(r, a) { return e } }();
    var Na = [
        ["cp:category", "Category"],
        ["cp:contentStatus", "ContentStatus"],
        ["cp:keywords", "Keywords"],
        ["cp:lastModifiedBy", "LastAuthor"],
        ["cp:lastPrinted", "LastPrinted"],
        ["cp:revision", "RevNumber"],
        ["cp:version", "Version"],
        ["dc:creator", "Author"],
        ["dc:description", "Comments"],
        ["dc:identifier", "Identifier"],
        ["dc:language", "Language"],
        ["dc:subject", "Subject"],
        ["dc:title", "Title"],
        ["dcterms:created", "CreatedDate", "date"],
        ["dcterms:modified", "ModifiedDate", "date"]
    ];
    $e.CORE_PROPS = "http://schemas.openxmlformats.org/package/2006/metadata/core-properties";
    _a.CORE_PROPS = "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties";
    var La = function() { var e = new Array(Na.length); for (var r = 0; r < Na.length; ++r) { var t = Na[r]; var a = "(?:" + t[0].substr(0, t[0].indexOf(":")) + ":)" + t[0].substr(t[0].indexOf(":") + 1);
            e[r] = new RegExp("<" + a + "[^>]*>([\\s\\S]*?)</" + a + ">") } return e }();

    function Ma(e) { var r = {};
        e = De(e); for (var t = 0; t < Na.length; ++t) { var a = Na[t],
                n = e.match(La[t]); if (n != null && n.length > 0) r[a[1]] = n[1]; if (a[2] === "date" && r[a[1]]) r[a[1]] = K(r[a[1]]) } return r }
    var Ua = je("cp:coreProperties", null, { "xmlns:cp": $e.CORE_PROPS, "xmlns:dc": $e.dc, "xmlns:dcterms": $e.dcterms, "xmlns:dcmitype": $e.dcmitype, "xmlns:xsi": $e.xsi });

    function Ha(e, r, t, a, n) { if (n[e] != null || r == null || r === "") return;
        n[e] = r;
        a[a.length] = t ? je(e, r, t) : Xe(e, r) }

    function Wa(e, r) { var t = r || {}; var a = [he, Ua],
            n = {}; if (!e && !t.Props) return a.join(""); if (e) { if (e.CreatedDate != null) Ha("dcterms:created", typeof e.CreatedDate === "string" ? e.CreatedDate : Ke(e.CreatedDate, t.WTF), { "xsi:type": "dcterms:W3CDTF" }, a, n); if (e.ModifiedDate != null) Ha("dcterms:modified", typeof e.ModifiedDate === "string" ? e.ModifiedDate : Ke(e.ModifiedDate, t.WTF), { "xsi:type": "dcterms:W3CDTF" }, a, n) } for (var i = 0; i != Na.length; ++i) { var s = Na[i]; var o = t.Props && t.Props[s[1]] != null ? t.Props[s[1]] : e ? e[s[1]] : null; if (o === true) o = "1";
            else if (o === false) o = "0";
            else if (typeof o == "number") o = String(o); if (o != null) Ha(s[0], o, null, a, n) } if (a.length > 2) { a[a.length] = "</cp:coreProperties>";
            a[1] = a[1].replace("/>", ">") } return a.join("") }
    var Va = [
        ["Application", "Application", "string"],
        ["AppVersion", "AppVersion", "string"],
        ["Company", "Company", "string"],
        ["DocSecurity", "DocSecurity", "string"],
        ["Manager", "Manager", "string"],
        ["HyperlinksChanged", "HyperlinksChanged", "bool"],
        ["SharedDoc", "SharedDoc", "bool"],
        ["LinksUpToDate", "LinksUpToDate", "bool"],
        ["ScaleCrop", "ScaleCrop", "bool"],
        ["HeadingPairs", "HeadingPairs", "raw"],
        ["TitlesOfParts", "TitlesOfParts", "raw"]
    ];
    $e.EXT_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties";
    _a.EXT_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties";

    function za(e, r, t) { var a = {}; if (!r) r = {};
        e = De(e);
        Va.forEach(function(t) { switch (t[2]) {
                case "string":
                    r[t[1]] = (e.match(Le(t[0])) || [])[1]; break;
                case "bool":
                    r[t[1]] = (e.match(Le(t[0])) || [])[1] === "true"; break;
                case "raw":
                    var n = e.match(new RegExp("<" + t[0] + "[^>]*>([\\s\\S]*?)</" + t[0] + ">")); if (n && n.length > 0) a[t[1]] = n[1]; break; } }); if (a.HeadingPairs && a.TitlesOfParts) { var n = Ve(a.HeadingPairs, t); var i = Ve(a.TitlesOfParts, t).map(function(e) { return e.v }); var s = 0,
                o = 0; if (i.length > 0)
                for (var f = 0; f !== n.length; f += 2) { o = +n[f + 1].v; switch (n[f].v) {
                        case "Worksheets":
                            ;
                        case "工作表":
                            ;
                        case "Листы":
                            ;
                        case "أوراق العمل":
                            ;
                        case "ワークシート":
                            ;
                        case "גליונות עבודה":
                            ;
                        case "Arbeitsblätter":
                            ;
                        case "Çalışma Sayfaları":
                            ;
                        case "Feuilles de calcul":
                            ;
                        case "Fogli di lavoro":
                            ;
                        case "Folhas de cálculo":
                            ;
                        case "Planilhas":
                            ;
                        case "Regneark":
                            ;
                        case "Werkbladen":
                            r.Worksheets = o;
                            r.SheetNames = i.slice(s, s + o); break;
                        case "Named Ranges":
                            ;
                        case "名前付き一覧":
                            ;
                        case "Benannte Bereiche":
                            ;
                        case "Navngivne områder":
                            r.NamedRanges = o;
                            r.DefinedNames = i.slice(s, s + o); break;
                        case "Charts":
                            ;
                        case "Diagramme":
                            r.Chartsheets = o;
                            r.ChartNames = i.slice(s, s + o); break; } s += o } } return r }
    var Xa = je("Properties", null, { xmlns: $e.EXT_PROPS, "xmlns:vt": $e.vt });

    function Ga(e, r) { var t = [],
            a = {},
            n = je; if (!e) e = {};
        e.Application = "SheetJS";
        t[t.length] = he;
        t[t.length] = Xa;
        Va.forEach(function(r) { if (e[r[1]] === undefined) return; var a; switch (r[2]) {
                case "string":
                    a = String(e[r[1]]); break;
                case "bool":
                    a = e[r[1]] ? "true" : "false"; break; } if (a !== undefined) t[t.length] = n(r[0], a) });
        t[t.length] = n("HeadingPairs", n("vt:vector", n("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + n("vt:variant", n("vt:i4", String(e.Worksheets))), { size: 2, baseType: "variant" }));
        t[t.length] = n("TitlesOfParts", n("vt:vector", e.SheetNames.map(function(e) { return "<vt:lpstr>" + Ce(e) + "</vt:lpstr>" }).join(""), { size: e.Worksheets, baseType: "lpstr" })); if (t.length > 2) { t[t.length] = "</Properties>";
            t[1] = t[1].replace("/>", ">") } return t.join("") } $e.CUST_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties";
    _a.CUST_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties";
    var ja = /<[^>]+>[^<]*/g;

    function Ka(e, r) { var t = {},
            a = ""; var n = e.match(ja); if (n)
            for (var i = 0; i != n.length; ++i) { var s = n[i],
                    o = me(s); switch (o[0]) {
                    case "<?xml":
                        break;
                    case "<Properties":
                        break;
                    case "<property":
                        a = o.name; break;
                    case "</property>":
                        a = null; break;
                    default:
                        if (s.indexOf("<vt:") === 0) { var f = s.split(">"); var l = f[0].substring(4),
                                c = f[1]; switch (l) {
                                case "lpstr":
                                    ;
                                case "bstr":
                                    ;
                                case "lpwstr":
                                    t[a] = we(c); break;
                                case "bool":
                                    t[a] = Re(c, "<vt:bool>"); break;
                                case "i1":
                                    ;
                                case "i2":
                                    ;
                                case "i4":
                                    ;
                                case "i8":
                                    ;
                                case "int":
                                    ;
                                case "uint":
                                    t[a] = parseInt(c, 10); break;
                                case "r4":
                                    ;
                                case "r8":
                                    ;
                                case "decimal":
                                    t[a] = parseFloat(c); break;
                                case "filetime":
                                    ;
                                case "date":
                                    t[a] = K(c); break;
                                case "cy":
                                    ;
                                case "error":
                                    t[a] = we(c); break;
                                default:
                                    if (l.slice(-1) == "/") break; if (r.WTF && typeof console !== "undefined") console.warn("Unexpected", s, l, f); } } else if (s.substr(0, 2) === "</") {} else if (r.WTF) throw new Error(s); } }
        return t }
    var Ya = je("Properties", null, { xmlns: $e.CUST_PROPS, "xmlns:vt": $e.vt });

    function $a(e, r) { var t = [he, Ya]; if (!e) return t.join(""); var a = 1;
        P(e).forEach(function n(r) {++a;
            t[t.length] = je("property", Ye(e[r]), { fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}", pid: a, name: r }) }); if (t.length > 2) { t[t.length] = "</Properties>";
            t[1] = t[1].replace("/>", ">") } return t.join("") }
    var Za = { Title: "Title", Subject: "Subject", Author: "Author", Keywords: "Keywords", Comments: "Description", LastAuthor: "LastAuthor", RevNumber: "Revision", Application: "AppName", LastPrinted: "LastPrinted", CreatedDate: "Created", ModifiedDate: "LastSaved", Category: "Category", Manager: "Manager", Company: "Company", AppVersion: "Version", ContentStatus: "ContentStatus", Identifier: "Identifier", Language: "Language" };
    var Qa = L(Za);

    function Ja(e, r, t) { r = Qa[r] || r;
        e[r] = t }

    function qa(e, r) { var t = [];
        P(Za).map(function(e) { for (var r = 0; r < Na.length; ++r)
                if (Na[r][1] == e) return Na[r]; for (r = 0; r < Va.length; ++r)
                if (Va[r][1] == e) return Va[r]; throw e }).forEach(function(a) { if (e[a[1]] == null) return; var n = r && r.Props && r.Props[a[1]] != null ? r.Props[a[1]] : e[a[1]]; switch (a[2]) {
                case "date":
                    n = new Date(n).toISOString().replace(/\.\d*Z/, "Z"); break; } if (typeof n == "number") n = String(n);
            else if (n === true || n === false) { n = n ? "1" : "0" } else if (n instanceof Date) n = new Date(n).toISOString().replace(/\.\d*Z/, "");
            t.push(Xe(Za[a[1]] || a[1], n)) }); return je("DocumentProperties", t.join(""), { xmlns: Ze.o }) }

    function en(e, r, t) { var a = ["Worksheets", "SheetNames"]; var n = "CustomDocumentProperties"; var i = []; if (e) P(e).forEach(function(r) { if (!e.hasOwnProperty(r)) return; for (var t = 0; t < Na.length; ++t)
                if (r == Na[t][1]) return; for (t = 0; t < Va.length; ++t)
                if (r == Va[t][1]) return; for (t = 0; t < a.length; ++t)
                if (r == a[t]) return; var n = e[r]; var s = "string"; if (typeof n == "number") { s = "float";
                n = String(n) } else if (n === true || n === false) { s = "boolean";
                n = n ? "1" : "0" } else n = String(n);
            i.push(je(Be(r), n, { "dt:dt": s })) }); if (r) P(r).forEach(function(t) { if (!r.hasOwnProperty(t)) return; if (e && e.hasOwnProperty(t)) return; var a = r[t]; var n = "string"; if (typeof a == "number") { n = "float";
                a = String(a) } else if (a === true || a === false) { n = "boolean";
                a = a ? "1" : "0" } else if (a instanceof Date) { n = "dateTime.tz";
                a = a.toISOString() } else a = String(a);
            i.push(je(Be(t), a, { "dt:dt": n })) }); return "<" + n + ' xmlns="' + Ze.o + '">' + i.join("") + "</" + n + ">" }

    function rn(e) { var r = e._R(4),
            t = e._R(4); return new Date((t / 1e7 * Math.pow(2, 32) + r / 1e7 - 11644473600) * 1e3).toISOString().replace(/\.000/, "") }

    function tn(e, r, t) { var a = e.l; var n = e._R(0, "lpstr-cp"); if (t)
            while (e.l - a & 3) ++e.l; return n }

    function an(e, r, t) { var a = e._R(0, "lpwstr"); if (t) e.l += 4 - (a.length + 1 & 3) & 3; return a }

    function nn(e, r, t) { if (r === 31) return an(e); return tn(e, r, t) }

    function sn(e, r, t) { return nn(e, r, t === false ? 0 : 4) }

    function on(e, r) { if (!r) throw new Error("VtUnalignedString must have positive length"); return nn(e, r, 0) }

    function fn(e) { var r = e._R(4); var t = []; for (var a = 0; a != r; ++a) t[a] = e._R(0, "lpstr-cp").replace(B, ""); return t }

    function ln(e) { return fn(e) }

    function cn(e) { var r = mn(e, sa); var t = mn(e, Zt); return [r, t] }

    function un(e) { var r = e._R(4); var t = []; for (var a = 0; a != r / 2; ++a) t.push(cn(e)); return t }

    function hn(e) { return un(e) }

    function dn(e, r) { var t = e._R(4); var a = {}; for (var n = 0; n != t; ++n) { var i = e._R(4); var s = e._R(4);
            a[i] = e._R(s, r === 1200 ? "utf16le" : "utf8").replace(B, "").replace(T, "!") } if (e.l & 3) e.l = e.l >> 2 + 1 << 2; return a }

    function vn(e) { var r = e._R(4); var t = e.slice(e.l, e.l + r); if ((r & 3) > 0) e.l += 4 - (r & 3) & 3; return t }

    function pn(e) { var r = {};
        r.Size = e._R(4);
        e.l += r.Size; return r }

    function bn(e, r) {}

    function mn(e, r, t) { var a = e._R(2),
            n, i = t || {};
        e.l += 2; if (r !== Jt)
            if (a !== r && oa.indexOf(r) === -1) throw new Error("Expected type " + r + " saw " + a); switch (r === Jt ? a : r) {
            case 2:
                n = e._R(2, "i"); if (!i.raw) e.l += 2; return n;
            case 3:
                n = e._R(4, "i"); return n;
            case 11:
                return e._R(4) !== 0;
            case 19:
                n = e._R(4); return n;
            case 30:
                return tn(e, a, 4).replace(B, "");
            case 31:
                return an(e);
            case 64:
                return rn(e);
            case 65:
                return vn(e);
            case 71:
                return pn(e);
            case 80:
                return sn(e, a, !i.raw).replace(B, "");
            case 81:
                return on(e, a).replace(B, "");
            case 4108:
                return hn(e);
            case 4126:
                return ln(e);
            default:
                throw new Error("TypedPropertyValue unrecognized type " + r + " " + a); } }

    function gn(e, r) { var t = e.l; var a = e._R(4); var n = e._R(4); var i = [],
            s = 0; var o = 0; var f = -1,
            c = {}; for (s = 0; s != n; ++s) { var u = e._R(4); var h = e._R(4);
            i[s] = [u, h + t] } i.sort(function(e, r) { return e[1] - r[1] }); var d = {}; for (s = 0; s != n; ++s) { if (e.l !== i[s][1]) { var v = true; if (s > 0 && r) switch (r[i[s - 1][0]].t) {
                    case 2:
                        if (e.l + 2 === i[s][1]) { e.l += 2;
                            v = false } break;
                    case 80:
                        if (e.l <= i[s][1]) { e.l = i[s][1];
                            v = false } break;
                    case 4108:
                        if (e.l <= i[s][1]) { e.l = i[s][1];
                            v = false } break; }
                if ((!r || s == 0) && e.l <= i[s][1]) { v = false;
                    e.l = i[s][1] } if (v) throw new Error("Read Error: Expected address " + i[s][1] + " at " + e.l + " :" + s) } if (r) { var p = r[i[s][0]];
                d[p.n] = mn(e, p.t, { raw: true }); if (p.p === "version") d[p.n] = String(d[p.n] >> 16) + "." + String(d[p.n] & 65535); if (p.n == "CodePage") switch (d[p.n]) {
                    case 0:
                        d[p.n] = 1252;
                    case 874:
                        ;
                    case 932:
                        ;
                    case 936:
                        ;
                    case 949:
                        ;
                    case 950:
                        ;
                    case 1250:
                        ;
                    case 1251:
                        ;
                    case 1253:
                        ;
                    case 1254:
                        ;
                    case 1255:
                        ;
                    case 1256:
                        ;
                    case 1257:
                        ;
                    case 1258:
                        ;
                    case 1e4:
                        ;
                    case 1200:
                        ;
                    case 1201:
                        ;
                    case 1252:
                        ;
                    case 65e3:
                        ;
                    case -536:
                        ;
                    case 65001:
                        ;
                    case -535:
                        l(o = d[p.n] >>> 0 & 65535); break;
                    default:
                        throw new Error("Unsupported CodePage: " + d[p.n]); } } else { if (i[s][0] === 1) { o = d.CodePage = mn(e, $t);
                    l(o); if (f !== -1) { var b = e.l;
                        e.l = i[f][1];
                        c = dn(e, o);
                        e.l = b } } else if (i[s][0] === 0) { if (o === 0) { f = s;
                        e.l = i[s + 1][1]; continue } c = dn(e, o) } else { var m = c[i[s][0]]; var g; switch (e[e.l]) {
                        case 65:
                            e.l += 4;
                            g = vn(e); break;
                        case 30:
                            e.l += 4;
                            g = sn(e, e[e.l - 4]); break;
                        case 31:
                            e.l += 4;
                            g = sn(e, e[e.l - 4]); break;
                        case 3:
                            e.l += 4;
                            g = e._R(4, "i"); break;
                        case 19:
                            e.l += 4;
                            g = e._R(4); break;
                        case 5:
                            e.l += 4;
                            g = e._R(8, "f"); break;
                        case 11:
                            e.l += 4;
                            g = _n(e, 4); break;
                        case 64:
                            e.l += 4;
                            g = K(rn(e)); break;
                        default:
                            throw new Error("unparsed value: " + e[e.l]); } d[m] = g } } } e.l = t + a; return d }

    function En(e, r) { var t = e.content; if (!t) return {};
        Fr(t, 0); var a, n, i, s, o = 0;
        t.chk("feff", "Byte Order: "); var f = t._R(2); var l = t._R(4);
        t.chk(F.utils.consts.HEADER_CLSID, "CLSID: ");
        a = t._R(4); if (a !== 1 && a !== 2) throw new Error("Unrecognized #Sets: " + a);
        n = t._R(16);
        s = t._R(4); if (a === 1 && s !== t.l) throw new Error("Length mismatch: " + s + " !== " + t.l);
        else if (a === 2) { i = t._R(16);
            o = t._R(4) } var c = gn(t, r); var u = { SystemIdentifier: l }; for (var h in c) u[h] = c[h];
        u.FMTID = n; if (a === 1) return u; if (t.l !== o) throw new Error("Length mismatch 2: " + t.l + " !== " + o); var d; try { d = gn(t, null) } catch (v) {} for (h in d) u[h] = d[h];
        u.FMTID = [n, i]; return u }

    function kn(e, r) { e._R(r); return null }

    function wn(e, r) { if (!r) r = Nr(e); for (var t = 0; t < e; ++t) r._W(1, 0); return r }

    function Sn(e, r, t) { var a = [],
            n = e.l + r; while (e.l < n) a.push(t(e, n - e.l)); if (n !== e.l) throw new Error("Slurp error"); return a }

    function _n(e, r) { return e._R(r) === 1 }

    function Cn(e, r) { if (!r) r = Nr(2);
        r._W(2, +!!e); return r }

    function Bn(e) { return e._R(2, "u") }

    function Tn(e, r) { if (!r) r = Nr(2);
        r._W(2, e); return r }

    function xn(e, r) { return Sn(e, r, Bn) }

    function In(e) { var r = e._R(1),
            t = e._R(1); return t === 1 ? r : r === 1 }

    function An(e, r, t) { if (!t) t = Nr(2);
        t._W(1, +e);
        t._W(1, r == "e" ? 1 : 0); return t }

    function yn(e, r, a) { var n = e._R(a && a.biff >= 12 ? 2 : 1); var i = 1,
            s = "sbcs-cont"; var o = t; if (a && a.biff >= 8) t = 1200; if (!a || a.biff == 8) { var f = e._R(1); if (f) { i = 2;
                s = "dbcs-cont" } } else if (a.biff == 12) { i = 2;
            s = "wstr" } var l = n ? e._R(n, s) : "";
        t = o; return l }

    function Rn(e) { var r = t;
        t = 1200; var a = e._R(2),
            n = e._R(1); var i = n & 1,
            s = n & 4,
            o = n & 8; var f = 1 + (n & 1); var l = 0,
            c; var u = {}; if (o) l = e._R(2); if (s) c = e._R(4); var h = f == 2 ? "dbcs-cont" : "sbcs-cont"; var d = a === 0 ? "" : e._R(a, h); if (o) e.l += 4 * l; if (s) e.l += c;
        u.t = d; if (!o) { u.raw = "<t>" + u.t + "</t>";
            u.r = u.t } t = r; return u }

    function Dn(e, r, t) { var a; if (t) { if (t.biff >= 2 && t.biff <= 5) return e._R(r, "sbcs-cont"); if (t.biff >= 12) return e._R(r, "dbcs-cont") } var n = e._R(1); if (n === 0) { a = e._R(r, "sbcs-cont") } else { a = e._R(r, "dbcs-cont") } return a }

    function On(e, r, t) { var a = e._R(t && t.biff == 2 ? 1 : 2); if (a === 0) { e.l++; return "" } return Dn(e, a, t) }

    function Fn(e, r, t) { if (t.biff > 5) return On(e, r, t); var a = e._R(1); if (a === 0) { e.l++; return "" } return e._R(a, t.biff == 4 ? "cpstr" : "sbcs-cont") }

    function Pn(e, r, t) { if (!t) t = Nr(3 + 2 * e.length);
        t._W(2, e.length);
        t._W(1, 1);
        t._W(31, e, "utf16le"); return t }

    function Nn(e, r, t) { var a = e._R(1);
        e.l++; var n = e._R(2);
        e.l += 2; return [a, n] }

    function Ln(e) { var r = e._R(4),
            t = e.l; var a = false; if (r > 24) { e.l += r - 24; if (e._R(16) === "795881f43b1d7f48af2c825dc4852763") a = true;
            e.l = t } var n = e._R((a ? r - 24 : r) >> 1, "utf16le").replace(B, ""); if (a) e.l += 24; return n }

    function Mn(e, r) { var t = e._R(2); var a = e._R(0, "lpstr-ansi"); var n = e._R(2); if (e._R(2) != 57005) throw new Error("Bad FileMoniker"); var i = e._R(4); if (i === 0) return a.replace(/\\/g, "/"); var s = e._R(4); if (e._R(2) != 3) throw new Error("Bad FileMoniker"); var o = e._R(s >> 1, "utf16le").replace(B, ""); return o }

    function Un(e, r) { var t = e._R(16);
        r -= 16; switch (t) {
            case "e0c9ea79f9bace118c8200aa004ba90b":
                return Ln(e, r);
            case "0303000000000000c000000000000046":
                return Mn(e, r);
            default:
                throw new Error("Unsupported Moniker " + t); } }

    function Hn(e, r) { var t = e._R(4); var a = t > 0 ? e._R(t, "utf16le").replace(B, "") : ""; return a }

    function Wn(e, r) { var t = e.l + r; var a = e._R(4); if (a !== 2) throw new Error("Unrecognized streamVersion: " + a); var n = e._R(2);
        e.l += 2; var i, s, o, f, l = "",
            c, u; if (n & 16) i = Hn(e, t - e.l); if (n & 128) s = Hn(e, t - e.l); if ((n & 257) === 257) o = Hn(e, t - e.l); if ((n & 257) === 1) f = Un(e, t - e.l); if (n & 8) l = Hn(e, t - e.l); if (n & 32) c = e._R(16); if (n & 64) u = rn(e);
        e.l = t; var h = s || o || f || ""; if (h && l) h += "#" + l; if (!h) h = "#" + l; return { Target: h } }

    function Vn(e) { var r = Nr(512),
            t = 0; var a = e.Target; var n = a.indexOf("#") > -1 ? 31 : 23; switch (a.charAt(0)) {
            case "#":
                n = 28; break;
            case ".":
                n &= ~2; break; } r._W(4, 2);
        r._W(4, n); var i = [8, 6815827, 6619237, 4849780, 83]; for (t = 0; t < i.length; ++t) r._W(4, i[t]); if (n == 28) { a = a.slice(1);
            r._W(4, a.length + 1); for (t = 0; t < a.length; ++t) r._W(2, a.charCodeAt(t));
            r._W(2, 0) } else if (n & 2) { i = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "); for (t = 0; t < i.length; ++t) r._W(1, parseInt(i[t], 16));
            r._W(4, 2 * (a.length + 1)); for (t = 0; t < a.length; ++t) r._W(2, a.charCodeAt(t));
            r._W(2, 0) } else { i = "03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" "); for (t = 0; t < i.length; ++t) r._W(1, parseInt(i[t], 16)); var s = 0; while (a.slice(s * 3, s * 3 + 3) == "../" || a.slice(s * 3, s * 3 + 3) == "..\\") ++s;
            r._W(2, s);
            r._W(4, a.length + 1); for (t = 0; t < a.length; ++t) r._W(1, a.charCodeAt(t) & 255);
            r._W(1, 0);
            r._W(2, 65535);
            r._W(2, 57005); for (t = 0; t < 6; ++t) r._W(4, 0) } return r.slice(0, r.l) }

    function zn(e, r) { var t = e._R(1),
            a = e._R(1),
            n = e._R(1),
            i = e._R(1); return [t, a, n, i] }

    function Xn(e, r) { var t = zn(e, r);
        t[3] = 0; return t }

    function Gn(e, r) { var t = e._R(2); var a = e._R(2); var n = e._R(2); return { r: t, c: a, ixfe: n } }

    function jn(e, r, t, a) { if (!a) a = Nr(6);
        a._W(2, e);
        a._W(2, r);
        a._W(2, t || 0); return a }

    function Kn(e) { var r = e._R(2); var t = e._R(2);
        e.l += 8; return { type: r, flags: t } }

    function Yn(e, r, t) { return r === 0 ? "" : Fn(e, r, t) }

    function $n(e, r, t) { var a = t.biff > 8 ? 4 : 2; var n = e._R(a),
            i = e._R(a, "i"),
            s = e._R(a, "i"); return [n, i, s] }

    function Zn(e, r) { var t = e._R(2); var a = Dt(e); return [t, a] }

    function Qn(e, r, t) { e.l += 4;
        r -= 4; var a = e.l + r; var n = yn(e, r, t); var i = e._R(2);
        a -= e.l; if (i !== a) throw new Error("Malformed AddinUdf: padding = " + a + " != " + i);
        e.l += i; return n }

    function Jn(e, r) { var t = e._R(2); var a = e._R(2); var n = e._R(2); var i = e._R(2); return { s: { c: n, r: t }, e: { c: i, r: a } } }

    function qn(e, r) { if (!r) r = Nr(8);
        r._W(2, e.s.r);
        r._W(2, e.e.r);
        r._W(2, e.s.c);
        r._W(2, e.e.c); return r }

    function ei(e, r) { var t = e._R(2); var a = e._R(2); var n = e._R(1); var i = e._R(1); return { s: { c: n, r: t }, e: { c: i, r: a } } }
    var ri = ei;

    function ti(e, r) { e.l += 4; var t = e._R(2); var a = e._R(2); var n = e._R(2);
        e.l += 12; return [a, t, n] }

    function ai(e, r) { var t = {};
        e.l += 4;
        e.l += 16;
        t.fSharedNote = e._R(2);
        e.l += 4; return t }

    function ni(e, r) { var t = {};
        e.l += 4;
        e.cf = e._R(2); return t }

    function ii(e, r) { e.l += 2;
        e.l += e._R(2) }
    var si = { 0: ii, 4: ii, 5: ii, 6: ii, 7: ni, 8: ii, 9: ii, 10: ii, 11: ii, 12: ii, 13: ai, 14: ii, 15: ii, 16: ii, 17: ii, 18: ii, 19: ii, 20: ii, 21: ti };

    function oi(e, r, t) { var a = e.l + r; var n = []; while (e.l < a) { var i = e._R(2);
            e.l -= 2; try { n.push(si[i](e, a - e.l)) } catch (s) { e.l = a; return n } } if (e.l != a) e.l = a; return n }

    function fi(e, r) { var t = { BIFFVer: 0, dt: 0 };
        t.BIFFVer = e._R(2);
        r -= 2; if (r >= 2) { t.dt = e._R(2);
            e.l -= 2 } switch (t.BIFFVer) {
            case 1536:
                ;
            case 1280:
                ;
            case 2:
                ;
            case 7:
                break;
            default:
                if (r > 6) throw new Error("Unexpected BIFF Ver " + t.BIFFVer); } e._R(r); return t }

    function li(e, r, t) { var a = 1536,
            n = 16; switch (t.bookType) {
            case "biff8":
                break;
            case "biff5":
                a = 1280;
                n = 8; break;
            case "biff4":
                a = 4;
                n = 6; break;
            case "biff3":
                a = 3;
                n = 6; break;
            case "biff2":
                a = 2;
                n = 4; break;
            case "xla":
                break;
            default:
                throw new Error("unsupported BIFF version"); } var i = Nr(n);
        i._W(2, a);
        i._W(2, r); if (n > 4) i._W(2, 29282); if (n > 6) i._W(2, 1997); if (n > 8) { i._W(2, 49161);
            i._W(2, 1);
            i._W(2, 1798);
            i._W(2, 0) } return i }

    function ci(e, r) { if (r === 0) return 1200; var t; if ((t = e._R(2)) !== 1200) {} return 1200 }

    function ui(e, r, t) { if (t.enc) { e.l += r; return "" } var a = e.l; var n = On(e, 0, t);
        e._R(r + a - e.l); return n }

    function hi(e, r) { var t = !r || r.biff == 8; var a = Nr(t ? 112 : 54);
        a._W(r.biff == 8 ? 2 : 1, 7);
        a._W(1, 0);
        a._W(4, 859007059);
        a._W(4, 5458548); while (a.l < a.length) a._W(1, 0); return a }

    function di(e, r, t) { var a = t && t.biff == 8 || r == 2 ? e._R(2) : (e.l += r, 0); return { fDialog: a & 16 } }

    function vi(e, r, t) { var a = e._R(4); var n = e._R(1) & 3; var i = e._R(1); switch (i) {
            case 0:
                i = "Worksheet"; break;
            case 1:
                i = "Macrosheet"; break;
            case 2:
                i = "Chartsheet"; break;
            case 6:
                i = "VBAModule"; break; } var s = yn(e, 0, t); if (s.length === 0) s = "Sheet1"; return { pos: a, hs: n, dt: i, name: s } }

    function pi(e, r) { var t = !r || r.biff >= 8 ? 2 : 1; var a = Nr(8 + t * e.name.length);
        a._W(4, e.pos);
        a._W(1, e.hs || 0);
        a._W(1, e.dt);
        a._W(1, e.name.length); if (r.biff >= 8) a._W(1, 1);
        a._W(t * e.name.length, e.name, r.biff < 8 ? "sbcs" : "utf16le"); return a.slice(0, a.l) }

    function bi(e, r) { var t = e.l + r; var a = e._R(4); var n = e._R(4); var i = []; for (var s = 0; s != n && e.l < t; ++s) { i.push(Rn(e)) } i.Count = a;
        i.Unique = n; return i }

    function mi(e, r) { var t = {};
        t.dsst = e._R(2);
        e.l += r - 2; return t }

    function gi(e, r) { var t = {};
        t.r = e._R(2);
        t.c = e._R(2);
        t.cnt = e._R(2) - t.c; var a = e._R(2);
        e.l += 4; var n = e._R(1);
        e.l += 3; if (n & 7) t.level = n & 7; if (n & 32) t.hidden = true; if (n & 64) t.hpt = a / 20; return t }

    function Ei(e, r) { var t = Kn(e); if (t.type != 2211) throw new Error("Invalid Future Record " + t.type); var a = e._R(4); return a !== 0 }

    function ki(e, r) { e._R(2); return e._R(4) }

    function wi(e, r, t) { var a = 0; if (!(t && t.biff == 2)) { a = e._R(2) } var n = e._R(2); if (t && t.biff == 2) { a = 1 - (n >> 15);
            n &= 32767 } var i = { Unsynced: a & 1, DyZero: (a & 2) >> 1, ExAsc: (a & 4) >> 2, ExDsc: (a & 8) >> 3 }; return [i, n] }

    function Si(e, r) { var t = e._R(2),
            a = e._R(2),
            n = e._R(2),
            i = e._R(2); var s = e._R(2),
            o = e._R(2),
            f = e._R(2); var l = e._R(2),
            c = e._R(2); return { Pos: [t, a], Dim: [n, i], Flags: s, CurTab: o, FirstTab: f, Selected: l, TabRatio: c } }

    function _i(e) { var r = Nr(18);
        r._W(2, 0);
        r._W(2, 0);
        r._W(2, 29280);
        r._W(2, 17600);
        r._W(2, 56);
        r._W(2, 0);
        r._W(2, 0);
        r._W(2, 1);
        r._W(2, 500); return r }

    function Ci(e, r, t) { if (t && t.biff >= 2 && t.biff < 8) return {}; var a = e._R(2); return { RTL: a & 64 } }

    function Bi(e) { var r = Nr(18),
            t = 1718; if (e && e.RTL) t |= 64;
        r._W(2, t);
        r._W(4, 0);
        r._W(4, 64);
        r._W(4, 0);
        r._W(4, 0); return r }

    function Ti(e, r, t) { var a = { dyHeight: e._R(2), fl: e._R(2) }; switch (t && t.biff || 8) {
            case 2:
                break;
            case 3:
                ;
            case 4:
                e.l += 2; break;
            default:
                e.l += 10; break; } a.name = yn(e, 0, t); return a }

    function xi(e, r) { var t = Gn(e);
        t.isst = e._R(4); return t }

    function Ii(e, r, t) { var a = e.l + r; var n = Gn(e, 6); if (t.biff == 2) e.l++; var i = On(e, a - e.l, t);
        n.val = i; return n }

    function Ai(e, r, t, a) { var n = !a || a.biff == 8; var i = Nr(6 + 2 + +n + (1 + n) * t.length);
        jn(e, r, 0, i);
        i._W(2, t.length); if (n) i._W(1, 1);
        i._W((1 + n) * t.length, t, n ? "utf16le" : "sbcs"); return i }

    function yi(e, r, t) { var a = e._R(2); var n = Fn(e, 0, t); return [a, n] }
    var Ri = Fn;

    function Di(e, r, t) { var a = e.l + r; var n = t.biff == 8 || !t.biff ? 4 : 2; var i = e._R(n),
            s = e._R(n); var o = e._R(2),
            f = e._R(2);
        e.l = a; return { s: { r: i, c: o }, e: { r: s, c: f } } }

    function Oi(e, r) { var t = r.biff == 8 || !r.biff ? 4 : 2; var a = Nr(2 * t + 6);
        a._W(t, e.s.r);
        a._W(t, e.e.r + 1);
        a._W(2, e.s.c);
        a._W(2, e.e.c + 1);
        a._W(2, 0); return a }

    function Fi(e, r) { var t = e._R(2),
            a = e._R(2); var n = Zn(e); return { r: t, c: a, ixfe: n[0], rknum: n[1] } }

    function Pi(e, r) { var t = e.l + r - 2; var a = e._R(2),
            n = e._R(2); var i = []; while (e.l < t) i.push(Zn(e)); if (e.l !== t) throw new Error("MulRK read error"); var s = e._R(2); if (i.length != s - n + 1) throw new Error("MulRK length mismatch"); return { r: a, c: n, C: s, rkrec: i } }

    function Ni(e, r) { var t = e.l + r - 2; var a = e._R(2),
            n = e._R(2); var i = []; while (e.l < t) i.push(e._R(2)); if (e.l !== t) throw new Error("MulBlank read error"); var s = e._R(2); if (i.length != s - n + 1) throw new Error("MulBlank length mismatch"); return { r: a, c: n, C: s, ixfe: i } }

    function Li(e, r, t, a) { var n = {}; var i = e._R(4),
            s = e._R(4); var o = e._R(4),
            f = e._R(2);
        n.patternType = ha[o >> 26]; if (!a.cellStyles) return n;
        n.alc = i & 7;
        n.fWrap = i >> 3 & 1;
        n.alcV = i >> 4 & 7;
        n.fJustLast = i >> 7 & 1;
        n.trot = i >> 8 & 255;
        n.cIndent = i >> 16 & 15;
        n.fShrinkToFit = i >> 20 & 1;
        n.iReadOrder = i >> 22 & 2;
        n.fAtrNum = i >> 26 & 1;
        n.fAtrFnt = i >> 27 & 1;
        n.fAtrAlc = i >> 28 & 1;
        n.fAtrBdr = i >> 29 & 1;
        n.fAtrPat = i >> 30 & 1;
        n.fAtrProt = i >> 31 & 1;
        n.dgLeft = s & 15;
        n.dgRight = s >> 4 & 15;
        n.dgTop = s >> 8 & 15;
        n.dgBottom = s >> 12 & 15;
        n.icvLeft = s >> 16 & 127;
        n.icvRight = s >> 23 & 127;
        n.grbitDiag = s >> 30 & 3;
        n.icvTop = o & 127;
        n.icvBottom = o >> 7 & 127;
        n.icvDiag = o >> 14 & 127;
        n.dgDiag = o >> 21 & 15;
        n.icvFore = f & 127;
        n.icvBack = f >> 7 & 127;
        n.fsxButton = f >> 14 & 1; return n }

    function Mi(e, r, t) { return Li(e, r, 0, t) }

    function Ui(e, r, t) { return Li(e, r, 1, t) }

    function Hi(e, r, t) { var a = {};
        a.ifnt = e._R(2);
        a.numFmtId = e._R(2);
        a.flags = e._R(2);
        a.fStyle = a.flags >> 2 & 1;
        r -= 6;
        a.data = Li(e, r, a.fStyle, t); return a }

    function Wi(e, r) { e.l += 4; var t = [e._R(2), e._R(2)]; if (t[0] !== 0) t[0]--; if (t[1] !== 0) t[1]--; if (t[0] > 7 || t[1] > 7) throw new Error("Bad Gutters: " + t.join("|")); return t }

    function Vi(e) { var r = Nr(8);
        r._W(4, 0);
        r._W(2, e[0] ? e[0] + 1 : 0);
        r._W(2, e[1] ? e[1] + 1 : 0); return r }

    function zi(e, r, t) { var a = Gn(e, 6); if (t.biff == 2) ++e.l; var n = In(e, 2);
        a.val = n;
        a.t = n === true || n === false ? "b" : "e"; return a }

    function Xi(e, r, t, a, n) { var i = Nr(8);
        jn(e, r, 0, i);
        An(t, n, i); return i }

    function Gi(e, r) { var t = Gn(e, 6); var a = Mt(e, 8);
        t.val = a; return t }

    function ji(e, r, t, a) { var n = Nr(14);
        jn(e, r, 0, n);
        Ut(t, n); return n }
    var Ki = Yn;

    function Yi(e, r, t) { var a = e.l + r; var n = e._R(2); var i = e._R(2);
        t.sbcch = i; if (i == 1025 || i == 14849) return [i, n]; if (i < 1 || i > 255) throw new Error("Unexpected SupBook type: " + i); var s = Dn(e, i); var o = []; while (a > e.l) o.push(On(e)); return [i, n, s, o] }

    function $i(e, r, t) { var a = e._R(2); var n; var i = { fBuiltIn: a & 1, fWantAdvise: a >>> 1 & 1, fWantPict: a >>> 2 & 1, fOle: a >>> 3 & 1, fOleLink: a >>> 4 & 1, cf: a >>> 5 & 1023, fIcon: a >>> 15 & 1 }; if (t.sbcch === 14849) n = Qn(e, r - 2, t);
        i.body = n || e._R(r - 2); if (typeof n === "string") i.Name = n; return i }
    var Zi = ["_xlnm.Consolidate_Area", "_xlnm.Auto_Open", "_xlnm.Auto_Close", "_xlnm.Extract", "_xlnm.Database", "_xlnm.Criteria", "_xlnm.Print_Area", "_xlnm.Print_Titles", "_xlnm.Recorder", "_xlnm.Data_Form", "_xlnm.Auto_Activate", "_xlnm.Auto_Deactivate", "_xlnm.Sheet_Title", "_xlnm._FilterDatabase"];

    function Qi(e, r, t) { var a = e.l + r; var n = e._R(2); var i = e._R(1); var s = e._R(1); var o = e._R(t && t.biff == 2 ? 1 : 2); var f = 0; if (!t || t.biff >= 5) { if (t.biff != 5) e.l += 2;
            f = e._R(2); if (t.biff == 5) e.l += 2;
            e.l += 4 } var l = Dn(e, s, t); if (n & 32) l = Zi[l.charCodeAt(0)]; var c = a - e.l; if (t && t.biff == 2) --c; var u = a == e.l || o === 0 ? [] : Du(e, c, t, o); return { chKey: i, Name: l, itab: f, rgce: u } }

    function Ji(e, r, t) { if (t.biff < 8) return qi(e, r, t); var a = [],
            n = e.l + r,
            i = e._R(t.biff > 8 ? 4 : 2); while (i-- !== 0) a.push($n(e, t.biff > 8 ? 12 : 6, t)); return a }

    function qi(e, r, t) { if (e[e.l + 1] == 3) e[e.l]++; var a = yn(e, r, t); return a.charCodeAt(0) == 3 ? a.slice(1) : a }

    function es(e, r, t) { if (t.biff < 8) { e.l += r; return } var a = e._R(2); var n = e._R(2); var i = Dn(e, a, t); var s = Dn(e, n, t); return [i, s] }

    function rs(e, r, t) { var a = ei(e, 6);
        e.l++; var n = e._R(1);
        r -= 8; return [Ou(e, r, t), n, a] }

    function ts(e, r, t) { var a = ri(e, 6); switch (t.biff) {
            case 2:
                e.l++;
                r -= 7; break;
            case 3:
                ;
            case 4:
                e.l += 2;
                r -= 8; break;
            default:
                e.l += 6;
                r -= 12; } return [a, yu(e, r, t, a)] }

    function as(e, r) { var t = e._R(4) !== 0; var a = e._R(4) !== 0; var n = e._R(4); return [t, a, n] }

    function ns(e, r, t) { if (t.biff < 8) return; var a = e._R(2),
            n = e._R(2); var i = e._R(2),
            s = e._R(2); var o = Fn(e, 0, t); if (t.biff < 8) e._R(1); return [{ r: a, c: n }, o, s, i] }

    function is(e, r, t) { return ns(e, r, t) }

    function ss(e, r) { var t = []; var a = e._R(2); while (a--) t.push(Jn(e, r)); return t }

    function os(e) { var r = Nr(2 + e.length * 8);
        r._W(2, e.length); for (var t = 0; t < e.length; ++t) qn(e[t], r); return r }

    function fs(e, r, t) { if (t && t.biff < 8) return cs(e, r, t); var a = ti(e, 22); var n = oi(e, r - 22, a[1]); return { cmo: a, ft: n } }
    var ls = [];
    ls[8] = function(e, r, t) { var a = e.l + r;
        e.l += 10; var n = e._R(2);
        e.l += 4; var i = e._R(2);
        e.l += 2; var s = e._R(2);
        e.l += 4; var o = e._R(1);
        e.l += o;
        e.l = a; return { fmt: n } };

    function cs(e, r, t) { var a = e._R(4); var n = e._R(2); var i = e._R(2); var s = e._R(2); var o = e._R(2); var f = e._R(2); var l = e._R(2); var c = e._R(2); var u = e._R(2); var h = e._R(2); var d = e._R(2); var v = e._R(2); var p = e._R(2);
        e.l += 6;
        r -= 36; var b = [];
        b.push((ls[n] || Pr)(e, r, t)); return { cmo: [i, n, s], ft: b } }

    function us(e, r, t) { var a = e.l; var n = ""; try { e.l += 4; var i = (t.lastobj || { cmo: [0, 0] }).cmo[1]; var s; if ([0, 5, 7, 11, 12, 14].indexOf(i) == -1) e.l += 6;
            else s = Nn(e, 6, t); var o = e._R(2); var f = e._R(2); var l = Bn(e, 2); var c = e._R(2);
            e.l += c; for (var u = 1; u < e.lens.length - 1; ++u) { if (e.l - a != e.lens[u]) throw new Error("TxO: bad continue record"); var h = e[e.l]; var d = Dn(e, e.lens[u + 1] - e.lens[u] - 1);
                n += d; if (n.length >= (h ? o : 2 * o)) break } if (n.length !== o && n.length !== o * 2) { throw new Error("cchText: " + o + " != " + n.length) } e.l = a + r; return { t: n } } catch (v) { e.l = a + r; return { t: n } } }

    function hs(e, r) { var t = Jn(e, 8);
        e.l += 16; var a = Wn(e, r - 24); return [t, a] }

    function ds(e) { var r = Nr(24); var t = rt(e[0]);
        r._W(2, t.r);
        r._W(2, t.r);
        r._W(2, t.c);
        r._W(2, t.c); var a = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "); for (var n = 0; n < 16; ++n) r._W(1, parseInt(a[n], 16)); return C([r, Vn(e[1])]) }

    function vs(e, r) { var t = e.l + r;
        e._R(2); var a = Jn(e, 8); var n = e._R((r - 10) / 2, "dbcs-cont");
        n = n.replace(B, ""); return [a, n] }

    function ps(e) { var r = e[1].Tooltip; var t = Nr(10 + 2 * (r.length + 1));
        t._W(2, 2048); var a = rt(e[0]);
        t._W(2, a.r);
        t._W(2, a.r);
        t._W(2, a.c);
        t._W(2, a.c); for (var n = 0; n < r.length; ++n) t._W(2, r.charCodeAt(n));
        t._W(2, 0); return t }

    function bs(e, r) { var t = [0, 0],
            a;
        a = e._R(2);
        t[0] = ua[a] || a;
        a = e._R(2);
        t[1] = ua[a] || a; return t }

    function ms(e) { if (!e) e = Nr(4);
        e._W(2, 1);
        e._W(2, 1); return e }

    function gs(e, r) { var t = e._R(2); var a = []; while (t-- > 0) a.push(Xn(e, 8)); return a }

    function Es(e, r) { var t = e._R(2); var a = []; while (t-- > 0) a.push(Xn(e, 8)); return a }

    function ks(e, r) { e.l += 2; var t = { cxfs: 0, crc: 0 };
        t.cxfs = e._R(2);
        t.crc = e._R(4); return t }

    function ws(e, r, t) { if (!t.cellStyles) return Pr(e, r); var a = t && t.biff >= 12 ? 4 : 2; var n = e._R(a); var i = e._R(a); var s = e._R(a); var o = e._R(a); var f = e._R(2); if (a == 2) e.l += 2; return { s: n, e: i, w: s, ixfe: o, flags: f } }

    function Ss(e, r, t) { var a = {};
        e.l += 16;
        a.header = Mt(e, 8);
        a.footer = Mt(e, 8);
        e.l += 2; return a }

    function _s(e, r, t) { var a = { area: false }; if (t.biff != 5) { e.l += r; return a } var n = e._R(1);
        e.l += 3; if (n & 16) a.area = true; return a }

    function Cs(e) { var r = Nr(2 * e); for (var t = 0; t < e; ++t) r._W(2, t + 1); return r }
    var Bs = Gn;
    var Ts = xn;
    var xs = On;

    function Is(e, r, t) {
        var a = e.l + r;
        var n = e._R(2);
        var i = e._R(2);
        var s = e._R(4);
        var o = { fmt: n, env: i, len: s, data: e.slice(e.l, e.l + s) };
        e.l += s;
        return o
    }

    function As(e) { var r = e._R(1); return e._R(r, "sbcs-cont") }

    function ys(e, r, t) { var a = Gn(e, 6);++e.l; var n = Fn(e, r - 7, t);
        a.t = "str";
        a.val = n; return a }

    function Rs(e, r, t) { var a = Gn(e, 6);++e.l; var n = Mt(e, 8);
        a.t = "n";
        a.val = n; return a }

    function Ds(e, r, t) { var a = Nr(15);
        gp(a, e, r);
        a._W(8, t, "f"); return a }

    function Os(e, r) { var t = Gn(e, 6);++e.l; var a = e._R(2);
        t.t = "n";
        t.val = a; return t }

    function Fs(e, r, t) { var a = Nr(9);
        gp(a, e, r);
        a._W(2, t); return a }

    function Ps(e, r) { var t = e._R(1); if (t === 0) { e.l++; return "" } return e._R(t, "sbcs-cont") }

    function Ns(e, r) { e.l += 6;
        e.l += 2;
        e.l += 1;
        e.l += 3;
        e.l += 1;
        e.l += r - 13 }

    function Ls(e, r, t) { var a = e.l + r; var n = Gn(e, 6); var i = e._R(2); var s = Dn(e, i, t);
        e.l = a;
        n.t = "str";
        n.val = s; return n }
    var Ms = function() { var e = { 1: 437, 2: 850, 3: 1252, 4: 1e4, 100: 852, 101: 866, 102: 865, 103: 861, 104: 895, 105: 620, 106: 737, 107: 857, 120: 950, 121: 949, 122: 936, 123: 932, 124: 874, 125: 1255, 126: 1256, 150: 10007, 151: 10029, 152: 10006, 200: 1250, 201: 1251, 202: 1254, 203: 1253, 0: 20127, 8: 865, 9: 437, 10: 850, 11: 437, 13: 437, 14: 850, 15: 437, 16: 850, 17: 437, 18: 850, 19: 932, 20: 850, 21: 437, 22: 850, 23: 865, 24: 437, 25: 437, 26: 850, 27: 437, 28: 863, 29: 850, 31: 852, 34: 852, 35: 852, 36: 860, 37: 850, 38: 866, 55: 850, 64: 852, 77: 936, 78: 949, 79: 950, 80: 874, 87: 1252, 88: 1252, 89: 1252, 255: 16969 };

        function r(r, t) { var a = []; var n = k(1); switch (t.type) {
                case "base64":
                    n = w(g.decode(r)); break;
                case "binary":
                    n = w(r); break;
                case "buffer":
                    ;
                case "array":
                    n = r; break; } Fr(n, 0); var i = n._R(1); var s = false; var o = false,
                f = false; switch (i) {
                case 2:
                    ;
                case 3:
                    break;
                case 48:
                    o = true;
                    s = true; break;
                case 49:
                    o = true; break;
                case 131:
                    s = true; break;
                case 139:
                    s = true; break;
                case 140:
                    s = true;
                    f = true; break;
                case 245:
                    s = true; break;
                default:
                    throw new Error("DBF Unsupported Version: " + i.toString(16)); } var l = new Date,
                c = 0,
                u = 0; if (i == 2) c = n._R(2);
            l = new Date(n._R(1) + 1900, n._R(1) - 1, n._R(1)); if (i != 2) c = n._R(4); if (i != 2) u = n._R(2); var h = n._R(2); var d = 0,
                v = 1252; if (i != 2) { n.l += 16;
                d = n._R(1); if (n[n.l] !== 0) v = e[n[n.l]];
                n.l += 1;
                n.l += 2 } if (f) n.l += 36; var p = [],
                b = {}; var m = u - 10 - (o ? 264 : 0),
                E = f ? 32 : 11; while (i == 2 ? n.l < n.length && n[n.l] != 13 : n.l < m) { b = {};
                b.name = cptable.utils.decode(v, n.slice(n.l, n.l + E)).replace(/[\u0000\r\n].*$/g, "");
                n.l += E;
                b.type = String.fromCharCode(n._R(1)); if (i != 2 && !f) b.offset = n._R(4);
                b.len = n._R(1); if (i == 2) b.offset = n._R(2);
                b.dec = n._R(1); if (b.name.length) p.push(b); if (i != 2) n.l += f ? 13 : 14; switch (b.type) {
                    case "B":
                        if ((!o || b.len != 8) && t.WTF) console.log("Skipping " + b.name + ":" + b.type); break;
                    case "G":
                        ;
                    case "P":
                        if (t.WTF) console.log("Skipping " + b.name + ":" + b.type); break;
                    case "C":
                        ;
                    case "D":
                        ;
                    case "F":
                        ;
                    case "I":
                        ;
                    case "L":
                        ;
                    case "M":
                        ;
                    case "N":
                        ;
                    case "O":
                        ;
                    case "T":
                        ;
                    case "Y":
                        ;
                    case "0":
                        ;
                    case "@":
                        ;
                    case "+":
                        break;
                    default:
                        throw new Error("Unknown Field Type: " + b.type); } } if (n[n.l] !== 13) n.l = u - 1;
            else if (i == 2) n.l = 521; if (i != 2) { if (n._R(1) !== 13) throw new Error("DBF Terminator not found " + n.l + " " + n[n.l]);
                n.l = u } var S = 0,
                _ = 0;
            a[0] = []; for (_ = 0; _ != p.length; ++_) a[0][_] = p[_].name; while (c-- > 0) { if (n[n.l] === 42) { n.l += h; continue }++n.l;
                a[++S] = [];
                _ = 0; for (_ = 0; _ != p.length; ++_) { var C = n.slice(n.l, n.l + p[_].len);
                    n.l += p[_].len;
                    Fr(C, 0); var B = cptable.utils.decode(v, C); switch (p[_].type) {
                        case "C":
                            a[S][_] = cptable.utils.decode(v, C);
                            a[S][_] = a[S][_].trim(); break;
                        case "D":
                            if (B.length === 8) a[S][_] = new Date(+B.substr(0, 4), +B.substr(4, 2) - 1, +B.substr(6, 2));
                            else a[S][_] = B; break;
                        case "F":
                            a[S][_] = parseFloat(B.trim()); break;
                        case "+":
                            ;
                        case "I":
                            a[S][_] = f ? C._R(-4, "i") ^ 2147483648 : C._R(4, "i"); break;
                        case "L":
                            switch (B.toUpperCase()) {
                                case "Y":
                                    ;
                                case "T":
                                    a[S][_] = true; break;
                                case "N":
                                    ;
                                case "F":
                                    a[S][_] = false; break;
                                case " ":
                                    ;
                                case "?":
                                    a[S][_] = false; break;
                                default:
                                    throw new Error("DBF Unrecognized L:|" + B + "|"); } break;
                        case "M":
                            if (!s) throw new Error("DBF Unexpected MEMO for type " + i.toString(16));
                            a[S][_] = "##MEMO##" + (f ? parseInt(B.trim(), 10) : C._R(4)); break;
                        case "N":
                            a[S][_] = +B.replace(/\u0000/g, "").trim(); break;
                        case "@":
                            a[S][_] = new Date(C._R(-8, "f") - 621356832e5); break;
                        case "T":
                            a[S][_] = new Date((C._R(4) - 2440588) * 864e5 + C._R(4)); break;
                        case "Y":
                            a[S][_] = C._R(4, "i") / 1e4; break;
                        case "O":
                            a[S][_] = -C._R(-8, "f"); break;
                        case "B":
                            if (o && p[_].len == 8) { a[S][_] = C._R(8, "f"); break };
                        case "G":
                            ;
                        case "P":
                            C.l += p[_].len; break;
                        case "0":
                            if (p[_].name === "_NullFlags") break;
                        default:
                            throw new Error("DBF Unsupported data type " + p[_].type); } } } if (i != 2)
                if (n.l < n.length && n[n.l++] != 26) throw new Error("DBF EOF Marker missing " + (n.l - 1) + " of " + n.length + " " + n[n.l - 1].toString(16)); return a }

        function t(e, t) { var a = t || {}; if (!a.dateNF) a.dateNF = "yyyymmdd"; return ht(r(e, a), a) }

        function a(e, r) { try { return ct(t(e, r), r) } catch (a) { if (r && r.WTF) throw a } return { SheetNames: [], Sheets: {} } } var n = { B: 8, C: 250, L: 1, D: 8, "?": 0, "": 0 };

        function i(e, r) { var t = r || {}; if (t.type == "string") throw new Error("Cannot write DBF to JS string"); var a = Mr(); var i = Tb(e, { header: 1, raw: true, cellDates: true }); var s = i[0],
                o = i.slice(1); var f = 0,
                l = 0,
                c = 0,
                u = 1; for (f = 0; f < s.length; ++f) { if (f == null) continue;++c; if (typeof s[f] !== "string") throw new Error("DBF Invalid column name"); if (s.indexOf(s[f]) !== f)
                    for (l = 0; l < 1024; ++l)
                        if (s.indexOf(s[f] + "_" + l) == -1) { s[f] += "_" + l; break } } var h = ot(e["!ref"]); var d = []; for (f = 0; f <= h.e.c - h.s.c; ++f) { var v = []; for (l = 0; l < o.length; ++l) { if (o[l][f] != null) v.push(o[l][f]) } if (v.length == 0 || s[f] == null) { d[f] = "?"; continue } var p = "",
                    b = ""; for (l = 0; l < v.length; ++l) { switch (typeof v[l]) {
                        case "number":
                            b = "B"; break;
                        case "string":
                            b = "C"; break;
                        case "boolean":
                            b = "L"; break;
                        case "object":
                            b = v[l] instanceof Date ? "D" : "C"; break;
                        default:
                            b = "C"; } p = p && p != b ? "C" : b; if (p == "C") break } u += n[p] || 0;
                d[f] = p } var m = a.next(32);
            m._W(4, 318902576);
            m._W(4, o.length);
            m._W(2, 296 + 32 * c);
            m._W(2, u); for (f = 0; f < 4; ++f) m._W(4, 0);
            m._W(4, 768); for (f = 0, l = 0; f < s.length; ++f) { if (s[f] == null) continue; var g = a.next(32); var E = (s[f].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
                g._W(1, E, "sbcs");
                g._W(1, d[f] == "?" ? "C" : d[f], "sbcs");
                g._W(4, l);
                g._W(1, n[d[f]] || 0);
                g._W(1, 0);
                g._W(1, 2);
                g._W(4, 0);
                g._W(1, 0);
                g._W(4, 0);
                g._W(4, 0);
                l += n[d[f]] || 0 } var k = a.next(264);
            k._W(4, 13); for (f = 0; f < 65; ++f) k._W(4, 0); for (f = 0; f < o.length; ++f) { var w = a.next(u);
                w._W(1, 0); for (l = 0; l < s.length; ++l) { if (s[l] == null) continue; switch (d[l]) {
                        case "L":
                            w._W(1, o[f][l] == null ? 63 : o[f][l] ? 84 : 70); break;
                        case "B":
                            w._W(8, o[f][l] || 0, "f"); break;
                        case "D":
                            if (!o[f][l]) w._W(8, "00000000", "sbcs");
                            else { w._W(4, ("0000" + o[f][l].getFullYear()).slice(-4), "sbcs");
                                w._W(2, ("00" + (o[f][l].getMonth() + 1)).slice(-2), "sbcs");
                                w._W(2, ("00" + o[f][l].getDate()).slice(-2), "sbcs") } break;
                        case "C":
                            var S = String(o[f][l] || "");
                            w._W(1, S, "sbcs"); for (c = 0; c < 250 - S.length; ++c) w._W(1, 32); break; } } } a.next(1)._W(1, 26); return a.end() } return { to_workbook: a, to_sheet: t, from_sheet: i } }();
    var Us = function() {
        function e(e, t) { switch (t.type) {
                case "base64":
                    return r(g.decode(e), t);
                case "binary":
                    return r(e, t);
                case "buffer":
                    return r(e.toString("binary"), t);
                case "array":
                    return r(Y(e), t); } throw new Error("Unrecognized type " + t.type) }

        function r(e, r) { var t = e.split(/[\n\r]+/),
                a = -1,
                n = -1,
                i = 0,
                s = 0,
                o = []; var f = []; var l = null; var c = {},
                u = [],
                h = [],
                d = []; var v = 0,
                p; for (; i !== t.length; ++i) { v = 0; var b = t[i].trim(); var m = b.replace(/;;/g, "").split(";").map(function(e) { return e.replace(/\u0001/g, ";") }); var g = m[0],
                    E; if (b.length > 0) switch (g) {
                    case "ID":
                        break;
                    case "E":
                        break;
                    case "B":
                        break;
                    case "O":
                        break;
                    case "P":
                        if (m[1].charAt(0) == "P") f.push(b.substr(3).replace(/;;/g, ";")); break;
                    case "C":
                        for (s = 1; s < m.length; ++s) switch (m[s].charAt(0)) {
                            case "X":
                                n = parseInt(m[s].substr(1)) - 1; break;
                            case "Y":
                                a = parseInt(m[s].substr(1)) - 1;
                                n = 0; for (p = o.length; p <= a; ++p) o[p] = []; break;
                            case "K":
                                E = m[s].substr(1); if (E.charAt(0) === '"') E = E.substr(1, E.length - 2);
                                else if (E === "TRUE") E = true;
                                else if (E === "FALSE") E = false;
                                else if (!isNaN(Q(E))) { E = Q(E); if (l !== null && x.is_date(l)) E = z(E) } else if (!isNaN(J(E).getDate())) { E = K(E) } o[a][n] = E;
                                l = null; break;
                            case "E":
                                var k = Ol(m[s].substr(1), { r: a, c: n });
                                o[a][n] = [o[a][n], k]; break;
                            default:
                                if (r && r.WTF) throw new Error("SYLK bad record " + b); }
                        break;
                    case "F":
                        var w = 0; for (s = 1; s < m.length; ++s) switch (m[s].charAt(0)) {
                            case "X":
                                n = parseInt(m[s].substr(1)) - 1;++w; break;
                            case "Y":
                                a = parseInt(m[s].substr(1)) - 1; for (p = o.length; p <= a; ++p) o[p] = []; break;
                            case "M":
                                v = parseInt(m[s].substr(1)) / 20; break;
                            case "F":
                                break;
                            case "P":
                                l = f[parseInt(m[s].substr(1))]; break;
                            case "S":
                                break;
                            case "D":
                                break;
                            case "N":
                                break;
                            case "W":
                                d = m[s].substr(1).split(" "); for (p = parseInt(d[0], 10); p <= parseInt(d[1], 10); ++p) { v = parseInt(d[2], 10);
                                    h[p - 1] = v === 0 ? { hidden: true } : { wch: v };
                                    $o(h[p - 1]) } break;
                            case "C":
                                n = parseInt(m[s].substr(1)) - 1; if (!h[n]) h[n] = {}; break;
                            case "R":
                                a = parseInt(m[s].substr(1)) - 1; if (!u[a]) u[a] = {}; if (v > 0) { u[a].hpt = v;
                                    u[a].hpx = qo(v) } else if (v === 0) u[a].hidden = true; break;
                            default:
                                if (r && r.WTF) throw new Error("SYLK bad record " + b); }
                        if (w < 1) l = null; break;
                    default:
                        if (r && r.WTF) throw new Error("SYLK bad record " + b); } } if (u.length > 0) c["!rows"] = u; if (h.length > 0) c["!cols"] = h; return [o, c] }

        function t(r, t) { var a = e(r, t); var n = a[0],
                i = a[1]; var s = ht(n, t);
            P(i).forEach(function(e) { s[e] = i[e] }); return s }

        function a(e, r) { return ct(t(e, r), r) }

        function n(e, r, t, a, n) { var i = "C;Y" + (t + 1) + ";X" + (a + 1) + ";K"; switch (e.t) {
                case "n":
                    i += e.v || 0; if (e.f && !e.F) i += ";E" + Pl(e.f, { r: t, c: a }); break;
                case "b":
                    i += e.v ? "TRUE" : "FALSE"; break;
                case "e":
                    i += e.w || e.v; break;
                case "d":
                    i += '"' + (e.w || e.v) + '"'; break;
                case "s":
                    i += '"' + e.v.replace(/"/g, "") + '"'; break; } return i }

        function i(e, r) { r.forEach(function(r, t) { var a = "F;W" + (t + 1) + " " + (t + 1) + " "; if (r.hidden) a += "0";
                else { if (typeof r.width == "number") r.wpx = Wo(r.width); if (typeof r.wpx == "number") r.wch = Vo(r.wpx); if (typeof r.wch == "number") a += Math.round(r.wch) } if (a.charAt(a.length - 1) != " ") e.push(a) }) }

        function s(e, r) { r.forEach(function(r, t) { var a = "F;"; if (r.hidden) a += "M0;";
                else if (r.hpt) a += "M" + 20 * r.hpt + ";";
                else if (r.hpx) a += "M" + 20 * Jo(r.hpx) + ";"; if (a.length > 2) e.push(a + "R" + (t + 1)) }) }

        function o(e, r) { var t = ["ID;PWXL;N;E"],
                a = []; var o = ot(e["!ref"]),
                f; var l = Array.isArray(e); var c = "\r\n";
            t.push("P;PGeneral");
            t.push("F;P0;DG0G8;M255"); if (e["!cols"]) i(t, e["!cols"]); if (e["!rows"]) s(t, e["!rows"]);
            t.push("B;Y" + (o.e.r - o.s.r + 1) + ";X" + (o.e.c - o.s.c + 1) + ";D" + [o.s.c, o.s.r, o.e.c, o.e.r].join(" ")); for (var u = o.s.r; u <= o.e.r; ++u) { for (var h = o.s.c; h <= o.e.c; ++h) { var d = tt({ r: u, c: h });
                    f = l ? (e[u] || [])[h] : e[d]; if (!f || f.v == null && (!f.f || f.F)) continue;
                    a.push(n(f, e, u, h, r)) } } return t.join(c) + c + a.join(c) + c + "E" + c } return { to_workbook: a, to_sheet: t, from_sheet: o } }();
    var Hs = function() {
        function e(e, t) { switch (t.type) {
                case "base64":
                    return r(g.decode(e), t);
                case "binary":
                    return r(e, t);
                case "buffer":
                    return r(e.toString("binary"), t);
                case "array":
                    return r(Y(e), t); } throw new Error("Unrecognized type " + t.type) }

        function r(e, r) { var t = e.split("\n"),
                a = -1,
                n = -1,
                i = 0,
                s = []; for (; i !== t.length; ++i) { if (t[i].trim() === "BOT") { s[++a] = [];
                    n = 0; continue } if (a < 0) continue; var o = t[i].trim().split(","); var f = o[0],
                    l = o[1];++i; var c = t[i].trim(); switch (+f) {
                    case -1:
                        if (c === "BOT") { s[++a] = [];
                            n = 0; continue } else if (c !== "EOD") throw new Error("Unrecognized DIF special command " + c); break;
                    case 0:
                        if (c === "TRUE") s[a][n] = true;
                        else if (c === "FALSE") s[a][n] = false;
                        else if (!isNaN(Q(l))) s[a][n] = Q(l);
                        else if (!isNaN(J(l).getDate())) s[a][n] = K(l);
                        else s[a][n] = l;++n; break;
                    case 1:
                        c = c.substr(1, c.length - 2);
                        s[a][n++] = c !== "" ? c : null; break; } if (c === "EOD") break } return s }

        function t(r, t) { return ht(e(r, t), t) }

        function a(e, r) { return ct(t(e, r), r) } var n = function() { var e = function t(e, r, a, n, i) { e.push(r);
                e.push(a + "," + n);
                e.push('"' + i.replace(/"/g, '""') + '"') }; var r = function a(e, r, t, n) { e.push(r + "," + t);
                e.push(r == 1 ? '"' + n.replace(/"/g, '""') + '"' : n) }; return function n(t, a) { var n = []; var i = ot(t["!ref"]),
                    s; var o = Array.isArray(t);
                e(n, "TABLE", 0, 1, "sheetjs");
                e(n, "VECTORS", 0, i.e.r - i.s.r + 1, "");
                e(n, "TUPLES", 0, i.e.c - i.s.c + 1, "");
                e(n, "DATA", 0, 0, ""); for (var f = i.s.r; f <= i.e.r; ++f) { r(n, -1, 0, "BOT"); for (var l = i.s.c; l <= i.e.c; ++l) { var c = tt({ r: f, c: l });
                        s = o ? (t[f] || [])[l] : t[c]; if (!s) { r(n, 1, 0, ""); continue } switch (s.t) {
                            case "n":
                                var u = m ? s.w : s.v; if (!u && s.v != null) u = s.v; if (u == null) { if (m && s.f && !s.F) r(n, 1, 0, "=" + s.f);
                                    else r(n, 1, 0, "") } else r(n, 0, u, "V"); break;
                            case "b":
                                r(n, 0, s.v ? 1 : 0, s.v ? "TRUE" : "FALSE"); break;
                            case "s":
                                r(n, 1, 0, !m || isNaN(s.v) ? s.v : '="' + s.v + '"'); break;
                            case "d":
                                if (!s.w) s.w = x.format(s.z || x._table[14], V(K(s.v))); if (m) r(n, 0, s.w, "V");
                                else r(n, 1, 0, s.w); break;
                            default:
                                r(n, 1, 0, ""); } } } r(n, -1, 0, "EOD"); var h = "\r\n"; var d = n.join(h); return d } }(); return { to_workbook: a, to_sheet: t, from_sheet: n } }();
    var Ws = function() {
        function e(e) { return e.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, "\n") }

        function r(e) { return e.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n") }

        function t(r, t) { var a = r.split("\n"),
                n = -1,
                i = -1,
                s = 0,
                o = []; for (; s !== a.length; ++s) { var f = a[s].trim().split(":"); if (f[0] !== "cell") continue; var l = rt(f[1]); if (o.length <= l.r)
                    for (n = o.length; n <= l.r; ++n)
                        if (!o[n]) o[n] = [];
                n = l.r;
                i = l.c; switch (f[2]) {
                    case "t":
                        o[n][i] = e(f[3]); break;
                    case "v":
                        o[n][i] = +f[3]; break;
                    case "vtf":
                        var c = f[f.length - 1];
                    case "vtc":
                        switch (f[3]) {
                            case "nl":
                                o[n][i] = +f[4] ? true : false; break;
                            default:
                                o[n][i] = +f[4]; break; } if (f[2] == "vtf") o[n][i] = [o[n][i], c]; } } return o }

        function a(e, r) { return ht(t(e, r), r) }

        function n(e, r) { return ct(a(e, r), r) } var i = ["socialcalc:version:1.5", "MIME-Version: 1.0", "Content-Type: multipart/mixed; boundary=SocialCalcSpreadsheetControlSave"].join("\n"); var s = ["--SocialCalcSpreadsheetControlSave", "Content-type: text/plain; charset=UTF-8"].join("\n") + "\n"; var o = ["# SocialCalc Spreadsheet Control Save", "part:sheet"].join("\n"); var f = "--SocialCalcSpreadsheetControlSave--";

        function l(e) { if (!e || !e["!ref"]) return ""; var t = [],
                a = [],
                n, i = ""; var s = it(e["!ref"]); var o = Array.isArray(e); for (var f = s.s.r; f <= s.e.r; ++f) { for (var l = s.s.c; l <= s.e.c; ++l) { i = tt({ r: f, c: l });
                    n = o ? (e[f] || [])[l] : e[i]; if (!n || n.v == null || n.t === "z") continue;
                    a = ["cell", i, "t"]; switch (n.t) {
                        case "s":
                            ;
                        case "str":
                            a.push(r(n.v)); break;
                        case "n":
                            if (!n.f) { a[2] = "v";
                                a[3] = n.v } else { a[2] = "vtf";
                                a[3] = "n";
                                a[4] = n.v;
                                a[5] = r(n.f) } break;
                        case "b":
                            a[2] = "vt" + (n.f ? "f" : "c");
                            a[3] = "nl";
                            a[4] = n.v ? "1" : "0";
                            a[5] = r(n.f || (n.v ? "TRUE" : "FALSE")); break;
                        case "d":
                            var c = V(K(n.v));
                            a[2] = "vtc";
                            a[3] = "nd";
                            a[4] = "" + c;
                            a[5] = n.w || x.format(n.z || x._table[14], c); break;
                        case "e":
                            continue; } t.push(a.join(":")) } } t.push("sheet:c:" + (s.e.c - s.s.c + 1) + ":r:" + (s.e.r - s.s.r + 1) + ":tvf:1");
            t.push("valueformat:1:text-wiki"); return t.join("\n") }

        function c(e, r) { return [i, s, o, s, l(e), f].join("\n") } return { to_workbook: n, to_sheet: a, from_sheet: c } }();
    var Vs = function() {
        function e(e, r, t, a, n) { if (n.raw) r[t][a] = e;
            else if (e === "TRUE") r[t][a] = true;
            else if (e === "FALSE") r[t][a] = false;
            else if (e === "") {} else if (!isNaN(Q(e))) r[t][a] = Q(e);
            else if (!isNaN(J(e).getDate())) r[t][a] = K(e);
            else r[t][a] = e }

        function r(r, t) { var a = t || {}; var n = []; if (!r || r.length === 0) return n; var i = r.split(/[\r\n]/); var s = i.length - 1; while (s >= 0 && i[s].length === 0) --s; var o = 10,
                f = 0; var l = 0; for (; l <= s; ++l) { f = i[l].indexOf(" "); if (f == -1) f = i[l].length;
                else f++;
                o = Math.max(o, f) } for (l = 0; l <= s; ++l) { n[l] = []; var c = 0;
                e(i[l].slice(0, o).trim(), n, l, c, a); for (c = 1; c <= (i[l].length - o) / 10 + 1; ++c) e(i[l].slice(o + (c - 1) * 10, o + c * 10).trim(), n, l, c, a) } return n } var t = { 44: ",", 9: "\t", 59: ";" }; var a = { 44: 3, 9: 2, 59: 1 };

        function n(e) { var r = {},
                n = false,
                i = 0,
                s = 0; for (; i < e.length; ++i) { if ((s = e.charCodeAt(i)) == 34) n = !n;
                else if (!n && s in t) r[s] = (r[s] || 0) + 1 } s = []; for (i in r)
                if (r.hasOwnProperty(i)) { s.push([r[i], i]) }
            if (!s.length) { r = a; for (i in r)
                    if (r.hasOwnProperty(i)) { s.push([r[i], i]) } } s.sort(function(e, r) { return e[0] - r[0] || a[e[1]] - a[r[1]] }); return t[s.pop()[1]] }

        function i(e, r) { var t = r || {}; var a = ""; if (b != null && t.dense == null) t.dense = b; var i = t.dense ? [] : {}; var s = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } }; if (e.substr(0, 4) == "sep=" && e.charCodeAt(5) == 10) { a = e.charAt(4);
                e = e.substr(6) } else a = n(e.substr(0, 1024)); var o = 0,
                f = 0,
                l = 0; var c = 0,
                u = 0,
                h = a.charCodeAt(0),
                d = false,
                v = 0;
            e = e.replace(/\r\n/gm, "\n"); var p = t.dateNF != null ? R(t.dateNF) : null;

            function m() { var r = e.slice(c, u); var a = {}; if (r.charAt(0) == '"' && r.charAt(r.length - 1) == '"') r = r.slice(1, -1).replace(/""/g, '"'); if (r.length === 0) a.t = "z";
                else if (t.raw) { a.t = "s";
                    a.v = r } else if (r.trim().length === 0) { a.t = "s";
                    a.v = r } else if (r.charCodeAt(0) == 61) { if (r.charCodeAt(1) == 34 && r.charCodeAt(r.length - 1) == 34) { a.t = "s";
                        a.v = r.slice(2, -1).replace(/""/g, '"') } else if (Ml(r)) { a.t = "n";
                        a.f = r.substr(1) } else { a.t = "s";
                        a.v = r } } else if (r == "TRUE") { a.t = "b";
                    a.v = true } else if (r == "FALSE") { a.t = "b";
                    a.v = false } else if (!isNaN(l = Q(r))) { a.t = "n"; if (t.cellText !== false) a.w = r;
                    a.v = l } else if (!isNaN(J(r).getDate()) || p && r.match(p)) { a.z = t.dateNF || x._table[14]; var n = 0; if (p && r.match(p)) { r = D(r, t.dateNF, r.match(p) || []);
                        n = 1 } if (t.cellDates) { a.t = "d";
                        a.v = K(r, n) } else { a.t = "n";
                        a.v = V(K(r, n)) } if (t.cellText !== false) a.w = x.format(a.z, a.v instanceof Date ? V(a.v) : a.v); if (!t.cellNF) delete a.z } else { a.t = "s";
                    a.v = r } if (a.t == "z") {} else if (t.dense) { if (!i[o]) i[o] = [];
                    i[o][f] = a } else i[tt({ c: f, r: o })] = a;
                c = u + 1; if (s.e.c < f) s.e.c = f; if (s.e.r < o) s.e.r = o; if (v == h) ++f;
                else { f = 0;++o } } for (; u < e.length; ++u) switch (v = e.charCodeAt(u)) {
                case 34:
                    d = !d; break;
                case h:
                    ;
                case 10:
                    ;
                case 13:
                    if (!d) m(); break;
                default:
                    break; }
            if (u - c > 0) m();
            i["!ref"] = st(s); return i }

        function s(e, t) { if (e.slice(0, 4) == "sep=") return i(e, t); if (e.indexOf("\t") >= 0 || e.indexOf(",") >= 0 || e.indexOf(";") >= 0) return i(e, t); return ht(r(e, t), t) }

        function o(e, r) { var t = "",
                a = r.type == "string" ? [0, 0, 0, 0] : ob(e, r); switch (r.type) {
                case "base64":
                    t = g.decode(e); break;
                case "binary":
                    t = e; break;
                case "buffer":
                    t = e.toString("binary"); break;
                case "array":
                    t = Y(e); break;
                case "string":
                    t = e; break;
                default:
                    throw new Error("Unrecognized type " + r.type); } if (a[0] == 239 && a[1] == 187 && a[2] == 191) t = De(t.slice(3));
            else if ((r.type == "binary" || r.type == "buffer") && typeof cptable !== "undefined" && r.codepage) t = cptable.utils.decode(r.codepage, cptable.utils.encode(1252, t)); if (t.slice(0, 19) == "socialcalc:version:") return Ws.to_sheet(r.type == "string" ? t : De(t), r); return s(t, r) }

        function f(e, r) { return ct(o(e, r), r) }

        function l(e, r) { var t = []; var a = ot(e["!ref"]),
                n; var i = Array.isArray(e); for (var s = a.s.r; s <= a.e.r; ++s) { var o = []; for (var f = a.s.c; f <= a.e.c; ++f) { var l = tt({ r: s, c: f });
                    n = i ? (e[s] || [])[f] : e[l]; if (!n || n.v == null) { o.push("          "); continue } var c = (n.w || (lt(n), n.w) || "").substr(0, 10); while (c.length < 10) c += " ";
                    o.push(c + (f === 0 ? " " : "")) } t.push(o.join("")) } return t.join("\n") } return { to_workbook: f, to_sheet: o, from_sheet: l } }();

    function zs(e, r) { var t = r || {},
            a = !!t.WTF;
        t.WTF = true; try { var n = Us.to_workbook(e, t);
            t.WTF = a; return n } catch (i) { t.WTF = a; if (!i.message.match(/SYLK bad record ID/) && a) throw i; return Vs.to_workbook(e, r) } }
    var Xs = function() {
        function e(e, r, t) { if (!e) return;
            Fr(e, e.l || 0); var a = t.Enum || E; while (e.l < e.length) { var n = e._R(2); var i = a[n] || a[255]; var s = e._R(2); var o = e.l + s; var f = (i.f || Pr)(e, s, t);
                e.l = o; if (r(f, i.n, n)) return } }

        function r(e, r) { switch (r.type) {
                case "base64":
                    return t(w(g.decode(e)), r);
                case "binary":
                    return t(w(e), r);
                case "buffer":
                    ;
                case "array":
                    return t(e, r); } throw "Unsupported type " + r.type }

        function t(r, t) { if (!r) return r; var a = t || {}; if (b != null && a.dense == null) a.dense = b; var n = a.dense ? [] : {},
                i = "Sheet1",
                s = 0; var o = {},
                f = [i]; var l = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }; if (r[2] == 2) a.Enum = E;
            else if (r[2] == 26) a.Enum = k;
            else if (r[2] == 14) { a.Enum = k;
                a.qpro = true;
                r.l = 0 } else throw new Error("Unrecognized LOTUS BOF " + r[2]);
            e(r, function(e, t, c) { if (r[2] == 2) switch (c) {
                    case 0:
                        a.vers = e; if (e >= 4096) a.qpro = true; break;
                    case 6:
                        l = e; break;
                    case 15:
                        if (!a.qpro) e[1].v = e[1].v.substr(1);
                    case 13:
                        ;
                    case 14:
                        ;
                    case 16:
                        ;
                    case 51:
                        if (c == 14 && (e[2] & 112) == 112 && (e[2] & 15) > 1 && (e[2] & 15) < 15) { e[1].z = a.dateNF || x._table[14]; if (a.cellDates) { e[1].t = "d";
                                e[1].v = z(e[1].v) } } if (a.dense) { if (!n[e[0].r]) n[e[0].r] = [];
                            n[e[0].r][e[0].c] = e[1] } else n[tt(e[0])] = e[1]; break; } else switch (c) {
                    case 22:
                        e[1].v = e[1].v.substr(1);
                    case 23:
                        ;
                    case 24:
                        ;
                    case 25:
                        ;
                    case 37:
                        ;
                    case 39:
                        ;
                    case 40:
                        if (e[3] > s) { n["!ref"] = st(l);
                            o[i] = n;
                            n = a.dense ? [] : {};
                            l = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } };
                            s = e[3];
                            i = "Sheet" + (s + 1);
                            f.push(i) } if (a.dense) { if (!n[e[0].r]) n[e[0].r] = [];
                            n[e[0].r][e[0].c] = e[1] } else n[tt(e[0])] = e[1]; if (l.e.c < e[0].c) l.e.c = e[0].c; if (l.e.r < e[0].r) l.e.r = e[0].r; break;
                    default:
                        break; } }, a);
            n["!ref"] = st(l);
            o[i] = n; return { SheetNames: f, Sheets: o } }

        function a(e, r) { var t = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
            t.s.c = e._R(2);
            t.s.r = e._R(2);
            t.e.c = e._R(2);
            t.e.r = e._R(2); if (t.s.c == 65535) t.s.c = t.e.c = t.s.r = t.e.r = 0; return t }

        function n(e, r, t) { var a = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0]; if (t.qpro && t.vers != 20768) { a[0].c = e._R(1);
                e.l++;
                a[0].r = e._R(2);
                e.l += 2 } else { a[2] = e._R(1);
                a[0].c = e._R(2);
                a[0].r = e._R(2) } return a }

        function i(e, r, t) { var a = e.l + r; var i = n(e, r, t);
            i[1].t = "s"; if (t.vers == 20768) { e.l++; var s = e._R(1);
                i[1].v = e._R(s, "utf8"); return i } if (t.qpro) e.l++;
            i[1].v = e._R(a - e.l, "cstr"); return i }

        function s(e, r, t) { var a = n(e, r, t);
            a[1].v = e._R(2, "i"); return a }

        function o(e, r, t) { var a = n(e, r, t);
            a[1].v = e._R(8, "f"); return a }

        function f(e, r, t) { var a = e.l + r; var i = n(e, r, t);
            i[1].v = e._R(8, "f"); if (t.qpro) e.l = a;
            else { var s = e._R(2);
                e.l += s } return i }

        function l(e, r) { var t = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0];
            t[0].r = e._R(2);
            t[3] = e[e.l++];
            t[0].c = e[e.l++]; return t }

        function c(e, r) { var t = l(e, r);
            t[1].t = "s";
            t[1].v = e._R(r - 4, "cstr"); return t }

        function u(e, r) { var t = l(e, r);
            t[1].v = e._R(2); var a = t[1].v >> 1; if (t[1].v & 1) { switch (a & 7) {
                    case 1:
                        a = (a >> 3) * 500; break;
                    case 2:
                        a = (a >> 3) / 20; break;
                    case 4:
                        a = (a >> 3) / 2e3; break;
                    case 6:
                        a = (a >> 3) / 16; break;
                    case 7:
                        a = (a >> 3) / 64; break;
                    default:
                        throw "unknown NUMBER_18 encoding " + (a & 7); } } t[1].v = a; return t }

        function h(e, r) { var t = l(e, r); var a = e._R(4); var n = e._R(4); var i = e._R(2); if (i == 65535) { t[1].v = 0; return t } var s = i & 32768;
            i = (i & 32767) - 16446;
            t[1].v = (i > 0 ? n << i : n >>> -i) + (i > -32 ? a << i + 32 : a >>> -(i + 32)); return t }

        function d(e, r) { var t = h(e, 14);
            e.l += r - 14; return t }

        function v(e, r) { var t = l(e, r); var a = e._R(4);
            t[1].v = a >> 6; return t }

        function p(e, r) { var t = l(e, r); var a = e._R(8, "f");
            t[1].v = a; return t }

        function m(e, r) { var t = p(e, 14);
            e.l += r - 10; return t } var E = { 0: { n: "BOF", f: Bn }, 1: { n: "EOF" }, 2: { n: "CALCMODE" }, 3: { n: "CALCORDER" }, 4: { n: "SPLIT" }, 5: { n: "SYNC" }, 6: { n: "RANGE", f: a }, 7: { n: "WINDOW1" }, 8: { n: "COLW1" }, 9: { n: "WINTWO" }, 10: { n: "COLW2" }, 11: { n: "NAME" }, 12: { n: "BLANK" }, 13: { n: "INTEGER", f: s }, 14: { n: "NUMBER", f: o }, 15: { n: "LABEL", f: i }, 16: { n: "FORMULA", f: f }, 24: { n: "TABLE" }, 25: { n: "ORANGE" }, 26: { n: "PRANGE" }, 27: { n: "SRANGE" }, 28: { n: "FRANGE" }, 29: { n: "KRANGE1" }, 32: { n: "HRANGE" }, 35: { n: "KRANGE2" }, 36: { n: "PROTEC" }, 37: { n: "FOOTER" }, 38: { n: "HEADER" }, 39: { n: "SETUP" }, 40: { n: "MARGINS" }, 41: { n: "LABELFMT" }, 42: { n: "TITLES" }, 43: { n: "SHEETJS" }, 45: { n: "GRAPH" }, 46: { n: "NGRAPH" }, 47: { n: "CALCCOUNT" }, 48: { n: "UNFORMATTED" }, 49: { n: "CURSORW12" }, 50: { n: "WINDOW" }, 51: { n: "STRING", f: i }, 55: { n: "PASSWORD" }, 56: { n: "LOCKED" }, 60: { n: "QUERY" }, 61: { n: "QUERYNAME" }, 62: { n: "PRINT" }, 63: { n: "PRINTNAME" }, 64: { n: "GRAPH2" }, 65: { n: "GRAPHNAME" }, 66: { n: "ZOOM" }, 67: { n: "SYMSPLIT" }, 68: { n: "NSROWS" }, 69: { n: "NSCOLS" }, 70: { n: "RULER" }, 71: { n: "NNAME" }, 72: { n: "ACOMM" }, 73: { n: "AMACRO" }, 74: { n: "PARSE" }, 255: { n: "", f: Pr } }; var k = { 0: { n: "BOF" }, 1: { n: "EOF" }, 3: { n: "??" }, 4: { n: "??" }, 5: { n: "??" }, 6: { n: "??" }, 7: { n: "??" }, 9: { n: "??" }, 10: { n: "??" }, 11: { n: "??" }, 12: { n: "??" }, 14: { n: "??" }, 15: { n: "??" }, 16: { n: "??" }, 17: { n: "??" }, 18: { n: "??" }, 19: { n: "??" }, 21: { n: "??" }, 22: { n: "LABEL16", f: c }, 23: { n: "NUMBER17", f: h }, 24: { n: "NUMBER18", f: u }, 25: { n: "FORMULA19", f: d }, 26: { n: "??" }, 27: { n: "??" }, 28: { n: "??" }, 29: { n: "??" }, 30: { n: "??" }, 31: { n: "??" }, 33: { n: "??" }, 37: { n: "NUMBER25", f: v }, 39: { n: "NUMBER27", f: p }, 40: { n: "FORMULA28", f: m }, 255: { n: "", f: Pr } }; return { to_workbook: r } }();
    var Gs = function qb() { var e = Le("t"),
            r = Le("rPr"),
            t = /<(?:\w+:)?r>/g,
            a = /<\/(?:\w+:)?r>/,
            n = /\r\n/g; var i = function f(e, r, t) { var a = {},
                n = 65001,
                i = ""; var o = e.match(ve),
                f = 0; if (o)
                for (; f != o.length; ++f) { var l = me(o[f]); switch (l[0].replace(/\w*:/g, "")) {
                        case "<condense":
                            break;
                        case "<extend":
                            break;
                        case "<shadow":
                            if (!l.val) break;
                        case "<shadow>":
                            ;
                        case "<shadow/>":
                            a.shadow = 1; break;
                        case "</shadow>":
                            break;
                        case "<charset":
                            if (l.val == "1") break;
                            n = s[parseInt(l.val, 10)]; break;
                        case "<outline":
                            if (!l.val) break;
                        case "<outline>":
                            ;
                        case "<outline/>":
                            a.outline = 1; break;
                        case "</outline>":
                            break;
                        case "<rFont":
                            a.name = l.val; break;
                        case "<sz":
                            a.sz = l.val; break;
                        case "<strike":
                            if (!l.val) break;
                        case "<strike>":
                            ;
                        case "<strike/>":
                            a.strike = 1; break;
                        case "</strike>":
                            break;
                        case "<u":
                            if (!l.val) break; switch (l.val) {
                                case "double":
                                    a.uval = "double"; break;
                                case "singleAccounting":
                                    a.uval = "single-accounting"; break;
                                case "doubleAccounting":
                                    a.uval = "double-accounting"; break; };
                        case "<u>":
                            ;
                        case "<u/>":
                            a.u = 1; break;
                        case "</u>":
                            break;
                        case "<b":
                            if (l.val == "0") break;
                        case "<b>":
                            ;
                        case "<b/>":
                            a.b = 1; break;
                        case "</b>":
                            break;
                        case "<i":
                            if (l.val == "0") break;
                        case "<i>":
                            ;
                        case "<i/>":
                            a.i = 1; break;
                        case "</i>":
                            break;
                        case "<color":
                            if (l.rgb) a.color = l.rgb.substr(2, 6); break;
                        case "<family":
                            a.family = l.val; break;
                        case "<vertAlign":
                            i = l.val; break;
                        case "<scheme":
                            break;
                        default:
                            if (l[0].charCodeAt(1) !== 47) throw "Unrecognized rich format " + l[0]; } }
            var c = []; if (a.u) c.push("text-decoration: underline;"); if (a.uval) c.push("text-underline-style:" + a.uval + ";"); if (a.sz) c.push("font-size:" + a.sz + ";"); if (a.outline) c.push("text-effect: outline;"); if (a.shadow) c.push("text-shadow: auto;");
            r.push('<span style="' + c.join("") + '">'); if (a.b) { r.push("<b>");
                t.push("</b>") } if (a.i) { r.push("<i>");
                t.push("</i>") } if (a.strike) { r.push("<s>");
                t.push("</s>") } if (i == "superscript") i = "sup";
            else if (i == "subscript") i = "sub"; if (i != "") { r.push("<" + i + ">");
                t.push("</" + i + ">") } t.push("</span>"); return n };

        function o(t) { var a = [
                [], "", []
            ]; var s = t.match(e),
                o = 65001; if (!s) return "";
            a[1] = s[1]; var f = t.match(r); if (f) o = i(f[1], a[0], a[2]); return a[0].join("") + a[1].replace(n, "<br/>") + a[2].join("") } return function l(e) { return e.replace(t, "").split(a).map(o).join("") } }();
    var js = /<(?:\w+:)?t[^>]*>([^<]*)<\/(?:\w+:)?t>/g,
        Ks = /<(?:\w+:)?r>/;
    var Ys = /<(?:\w+:)?rPh.*?>([\s\S]*?)<\/(?:\w+:)?rPh>/g;

    function $s(e, r) { var t = r ? r.cellHTML : true; var a = {}; if (!e) return null; var n; if (e.match(/^\s*<(?:\w+:)?t[^>]*>/)) { a.t = we(De(e.slice(e.indexOf(">") + 1).split(/<\/(?:\w+:)?t>/)[0] || ""));
            a.r = De(e); if (t) a.h = xe(a.t) } else if (n = e.match(Ks)) { a.r = De(e);
            a.t = we(De((e.replace(Ys, "").match(js) || []).join("").replace(ve, ""))); if (t) a.h = Gs(a.r) } return a }
    var Zs = /<(?:\w+:)?sst([^>]*)>([\s\S]*)<\/(?:\w+:)?sst>/;
    var Qs = /<(?:\w+:)?(?:si|sstItem)>/g;
    var Js = /<\/(?:\w+:)?(?:si|sstItem)>/;

    function qs(e, r) { var t = [],
            a = ""; if (!e) return t; var n = e.match(Zs); if (n) { a = n[2].replace(Qs, "").split(Js); for (var i = 0; i != a.length; ++i) { var s = $s(a[i].trim(), r); if (s != null) t[t.length] = s } n = me(n[1]);
            t.Count = n.count;
            t.Unique = n.uniqueCount } return t } _a.SST = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings";
    var eo = /^\s|\s$|[\t\n\r]/;

    function ro(e, r) { if (!r.bookSST) return ""; var t = [he];
        t[t.length] = je("sst", null, { xmlns: $e.main[0], count: e.Count, uniqueCount: e.Unique }); for (var a = 0; a != e.length; ++a) { if (e[a] == null) continue; var n = e[a]; var i = "<si>"; if (n.r) i += n.r;
            else { i += "<t"; if (!n.t) n.t = ""; if (n.t.match(eo)) i += ' xml:space="preserve"';
                i += ">" + Ce(n.t) + "</t>" } i += "</si>";
            t[t.length] = i } if (t.length > 2) { t[t.length] = "</sst>";
            t[1] = t[1].replace("/>", ">") } return t.join("") }

    function to(e, r) { return [e._R(4), e._R(4)] }

    function ao(e, r) { var t = []; var a = false;
        Lr(e, function n(e, i, s) { switch (s) {
                case 159:
                    t.Count = e[0];
                    t.Unique = e[1]; break;
                case 19:
                    t.push(e); break;
                case 160:
                    return true;
                case 35:
                    a = true; break;
                case 36:
                    a = false; break;
                default:
                    if (i.indexOf("Begin") > 0) {} else if (i.indexOf("End") > 0) {} if (!a || r.WTF) throw new Error("Unexpected record " + s + " " + i); } }); return t }

    function no(e, r) { if (!r) r = Nr(8);
        r._W(4, e.Count);
        r._W(4, e.Unique); return r }
    var io = Et;

    function so(e, r) { var t = Mr();
        Ur(t, "BrtBeginSst", no(e)); for (var a = 0; a < e.length; ++a) Ur(t, "BrtSSTItem", io(e[a]));
        Ur(t, "BrtEndSst"); return t.end() }

    function oo(e) { if (typeof cptable !== "undefined") return cptable.utils.encode(a, e); var r = [],
            t = e.split(""); for (var n = 0; n < t.length; ++n) r[n] = t[n].charCodeAt(0); return r }

    function fo(e, r) { var t = {};
        t.Major = e._R(2);
        t.Minor = e._R(2); if (r >= 4) e.l += r - 4; return t }

    function lo(e, r) { var t = {};
        t.id = e._R(0, "lpp4");
        t.R = fo(e, 4);
        t.U = fo(e, 4);
        t.W = fo(e, 4); return t }

    function co(e) { var r = e._R(4); var t = e.l + r - 4; var a = {}; var n = e._R(4); var i = []; while (n-- > 0) i.push({ t: e._R(4), v: e._R(0, "lpp4") });
        a.name = e._R(0, "lpp4");
        a.comps = i; if (e.l != t) throw new Error("Bad DataSpaceMapEntry: " + e.l + " != " + t); return a }

    function uo(e, r) { var t = [];
        e.l += 4; var a = e._R(4); while (a-- > 0) t.push(co(e)); return t }

    function ho(e, r) { var t = [];
        e.l += 4; var a = e._R(4); while (a-- > 0) t.push(e._R(0, "lpp4")); return t }

    function vo(e, r) { var t = {}; var a = e._R(4);
        e.l += 4;
        t.id = e._R(0, "lpp4");
        t.name = e._R(0, "lpp4");
        t.R = fo(e, 4);
        t.U = fo(e, 4);
        t.W = fo(e, 4); return t }

    function po(e, r) { var t = vo(e);
        t.ename = e._R(0, "8lpp4");
        t.blksz = e._R(4);
        t.cmode = e._R(4); if (e._R(4) != 4) throw new Error("Bad !Primary record"); return t }

    function bo(e, r) { var t = e.l + r; var a = {};
        a.Flags = e._R(4) & 63;
        e.l += 4;
        a.AlgID = e._R(4); var n = false; switch (a.AlgID) {
            case 26126:
                ;
            case 26127:
                ;
            case 26128:
                n = a.Flags == 36; break;
            case 26625:
                n = a.Flags == 4; break;
            case 0:
                n = a.Flags == 16 || a.Flags == 4 || a.Flags == 36; break;
            default:
                throw "Unrecognized encryption algorithm: " + a.AlgID; } if (!n) throw new Error("Encryption Flags/AlgID mismatch");
        a.AlgIDHash = e._R(4);
        a.KeySize = e._R(4);
        a.ProviderType = e._R(4);
        e.l += 8;
        a.CSPName = e._R(t - e.l >> 1, "utf16le");
        e.l = t; return a }

    function mo(e, r) { var t = {},
            a = e.l + r;
        e.l += 4;
        t.Salt = e.slice(e.l, e.l + 16);
        e.l += 16;
        t.Verifier = e.slice(e.l, e.l + 16);
        e.l += 16; var n = e._R(4);
        t.VerifierHash = e.slice(e.l, a);
        e.l = a; return t }

    function go(e, r) { var t = fo(e); switch (t.Minor) {
            case 2:
                return [t.Minor, Eo(e, t)];
            case 3:
                return [t.Minor, ko(e, t)];
            case 4:
                return [t.Minor, wo(e, t)]; } throw new Error("ECMA-376 Encrypted file unrecognized Version: " + t.Minor) }

    function Eo(e, r) { var t = e._R(4); if ((t & 63) != 36) throw new Error("EncryptionInfo mismatch"); var a = e._R(4); var n = e.l + a; var i = bo(e, a); var s = mo(e, e.length - e.l); return { t: "Std", h: i, v: s } }

    function ko(e, r) { throw new Error("File is password-protected: ECMA-376 Extensible") }

    function wo(e, r) { var t = ["saltSize", "blockSize", "keyBits", "hashSize", "cipherAlgorithm", "cipherChaining", "hashAlgorithm", "saltValue"];
        e.l += 4; var a = e._R(e.length - e.l, "utf8"); var n = {};
        a.replace(ve, function i(e, r) { var a = me(e); switch (ge(a[0])) {
                case "<?xml":
                    break;
                case "<encryption":
                    ;
                case "</encryption>":
                    break;
                case "<keyData":
                    t.forEach(function(e) { n[e] = a[e] }); break;
                case "<dataIntegrity":
                    n.encryptedHmacKey = a.encryptedHmacKey;
                    n.encryptedHmacValue = a.encryptedHmacValue; break;
                case "<keyEncryptors>":
                    ;
                case "<keyEncryptors":
                    n.encs = []; break;
                case "</keyEncryptors>":
                    break;
                case "<keyEncryptor":
                    n.uri = a.uri; break;
                case "</keyEncryptor>":
                    break;
                case "<encryptedKey":
                    n.encs.push(a); break;
                default:
                    throw a[0]; } }); return n }

    function So(e, r) { var t = {}; var a = t.EncryptionVersionInfo = fo(e, 4);
        r -= 4; if (a.Minor != 2) throw new Error("unrecognized minor version code: " + a.Minor); if (a.Major > 4 || a.Major < 2) throw new Error("unrecognized major version code: " + a.Major);
        t.Flags = e._R(4);
        r -= 4; var n = e._R(4);
        r -= 4;
        t.EncryptionHeader = bo(e, n);
        r -= n;
        t.EncryptionVerifier = mo(e, r); return t }

    function _o(e, r) { var t = {}; var a = t.EncryptionVersionInfo = fo(e, 4);
        r -= 4; if (a.Major != 1 || a.Minor != 1) throw "unrecognized version code " + a.Major + " : " + a.Minor;
        t.Salt = e._R(16);
        t.EncryptedVerifier = e._R(16);
        t.EncryptedVerifierHash = e._R(16); return t }

    function Co(e) { var r = 0,
            t; var a = oo(e); var n = a.length + 1,
            i, s; var o, f, l;
        t = k(n);
        t[0] = a.length; for (i = 1; i != n; ++i) t[i] = a[i - 1]; for (i = n - 1; i >= 0; --i) { s = t[i];
            o = (r & 16384) === 0 ? 0 : 1;
            f = r << 1 & 32767;
            l = o | f;
            r = l ^ s } return r ^ 52811 }
    var Bo = function() {
        var e = [187, 255, 255, 186, 255, 255, 185, 128, 0, 190, 15, 0, 191, 15, 0];
        var r = [57840, 7439, 52380, 33984, 4364, 3600, 61902, 12606, 6258, 57657, 54287, 34041, 10252, 43370, 20163];
        var t = [44796, 19929, 39858, 10053, 20106, 40212, 10761, 31585, 63170, 64933, 60267, 50935, 40399, 11199, 17763, 35526, 1453, 2906, 5812, 11624, 23248, 885, 1770, 3540, 7080, 14160, 28320, 56640, 55369, 41139, 20807, 41614, 21821, 43642, 17621, 28485, 56970, 44341, 19019, 38038, 14605, 29210, 60195, 50791, 40175, 10751, 21502, 43004, 24537, 18387, 36774, 3949, 7898, 15796, 31592, 63184, 47201, 24803, 49606, 37805, 14203, 28406, 56812, 17824, 35648, 1697, 3394, 6788, 13576, 27152, 43601, 17539, 35078, 557, 1114, 2228, 4456, 30388, 60776, 51953, 34243, 7079, 14158, 28316, 14128, 28256, 56512, 43425, 17251, 34502, 7597, 13105, 26210, 52420, 35241, 883, 1766, 3532, 4129, 8258, 16516, 33032, 4657, 9314, 18628];
        var a = function(e) { return (e / 2 | e * 128) & 255 };
        var n = function(e, r) { return a(e ^ r) };
        var i = function(e) { var a = r[e.length - 1]; var n = 104; for (var i = e.length - 1; i >= 0; --i) { var s = e[i]; for (var o = 0; o != 7; ++o) { if (s & 64) a ^= t[n];
                    s *= 2;--n } } return a };
        return function(r) {
            var t = oo(r);
            var a = i(t);
            var s = t.length;
            var o = k(16);
            for (var f = 0; f != 16; ++f) o[f] = 0;
            var l, c, u;
            if ((s & 1) === 1) { l = a >> 8;
                o[s] = n(e[0], l);--s;
                l = a & 255;
                c = t[t.length - 1];
                o[s] = n(c, l) }
            while (s > 0) {--s;
                l = a >> 8;
                o[s] = n(t[s], l);--s;
                l = a & 255;
                o[s] = n(t[s], l) } s = 15;
            u = 15 - t.length;
            while (u > 0) { l = a >> 8;
                o[s] = n(e[u], l);--s;--u;
                l = a & 255;
                o[s] = n(t[s], l);--s;--u }
            return o
        }
    }();
    var To = function(e, r, t, a, n) { if (!n) n = r; if (!a) a = Bo(e); var i, s; for (i = 0; i != r.length; ++i) { s = r[i];
            s ^= a[t];
            s = (s >> 5 | s << 3) & 255;
            n[i] = s;++t } return [n, t, a] };
    var xo = function(e) { var r = 0,
            t = Bo(e); return function(e) { var a = To("", e, r, t);
            r = a[1]; return a[0] } };

    function Io(e, r, t, a) { var n = { key: Bn(e), verificationBytes: Bn(e) }; if (t.password) n.verifier = Co(t.password);
        a.valid = n.verificationBytes === n.verifier; if (a.valid) a.insitu = xo(t.password); return n }

    function Ao(e, r, t) { var a = t || {};
        a.Info = e._R(2);
        e.l -= 2; if (a.Info === 1) a.Data = _o(e, r);
        else a.Data = So(e, r); return a }

    function yo(e, r, t) { var a = { Type: t.biff >= 8 ? e._R(2) : 0 }; if (a.Type) Ao(e, r - 2, a);
        else Io(e, r - 2, t, a); return a }
    var Ro = function() {
        function e(e, t) { switch (t.type) {
                case "base64":
                    return r(g.decode(e), t);
                case "binary":
                    return r(e, t);
                case "buffer":
                    return r(e.toString("binary"), t);
                case "array":
                    return r(Y(e), t); } throw new Error("Unrecognized type " + t.type) }

        function r(e, r) { var t = r || {}; var a = t.dense ? [] : {}; var n = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } }; if (!e.match(/\\trowd/)) throw new Error("RTF missing table");
            a["!ref"] = st(n); return a }

        function t(r, t) { return ct(e(r, t), t) }

        function a(e, r) { var t = ["{\\rtf1\\ansi"]; var a = ot(e["!ref"]),
                n; var i = Array.isArray(e); for (var s = a.s.r; s <= a.e.r; ++s) { t.push("\\trowd\\trautofit1"); for (var o = a.s.c; o <= a.e.c; ++o) t.push("\\cellx" + (o + 1));
                t.push("\\pard\\intbl"); for (o = a.s.c; o <= a.e.c; ++o) { var f = tt({ r: s, c: o });
                    n = i ? (e[s] || [])[o] : e[f]; if (!n || n.v == null && (!n.f || n.F)) continue;
                    t.push(" " + (n.w || (lt(n), n.w)));
                    t.push("\\cell") } t.push("\\pard\\intbl\\row") } return t.join("") + "}" } return { to_workbook: t, to_sheet: e, from_sheet: a } }();

    function Do(e) { var r = e.substr(e[0] === "#" ? 1 : 0, 6); return [parseInt(r.substr(0, 2), 16), parseInt(r.substr(2, 2), 16), parseInt(r.substr(4, 2), 16)] }

    function Oo(e) { for (var r = 0, t = 1; r != 3; ++r) t = t * 256 + (e[r] > 255 ? 255 : e[r] < 0 ? 0 : e[r]); return t.toString(16).toUpperCase().substr(1) }

    function Fo(e) { var r = e[0] / 255,
            t = e[1] / 255,
            a = e[2] / 255; var n = Math.max(r, t, a),
            i = Math.min(r, t, a),
            s = n - i; if (s === 0) return [0, 0, r]; var o = 0,
            f = 0,
            l = n + i;
        f = s / (l > 1 ? 2 - l : l); switch (n) {
            case r:
                o = ((t - a) / s + 6) % 6; break;
            case t:
                o = (a - r) / s + 2; break;
            case a:
                o = (r - t) / s + 4; break; } return [o / 6, f, l / 2] }

    function Po(e) { var r = e[0],
            t = e[1],
            a = e[2]; var n = t * 2 * (a < .5 ? a : 1 - a),
            i = a - n / 2; var s = [i, i, i],
            o = 6 * r; var f; if (t !== 0) switch (o | 0) {
            case 0:
                ;
            case 6:
                f = n * o;
                s[0] += n;
                s[1] += f; break;
            case 1:
                f = n * (2 - o);
                s[0] += f;
                s[1] += n; break;
            case 2:
                f = n * (o - 2);
                s[1] += n;
                s[2] += f; break;
            case 3:
                f = n * (4 - o);
                s[1] += f;
                s[2] += n; break;
            case 4:
                f = n * (o - 4);
                s[2] += n;
                s[0] += f; break;
            case 5:
                f = n * (6 - o);
                s[2] += f;
                s[0] += n; break; }
        for (var l = 0; l != 3; ++l) s[l] = Math.round(s[l] * 255); return s }

    function No(e, r) { if (r === 0) return e; var t = Fo(Do(e)); if (r < 0) t[2] = t[2] * (1 + r);
        else t[2] = 1 - (1 - t[2]) * (1 - r); return Oo(Po(t)) }
    var Lo = 6,
        Mo = 15,
        Uo = 1,
        Ho = Lo;

    function Wo(e) { return Math.floor((e + Math.round(128 / Ho) / 256) * Ho) }

    function Vo(e) { return Math.floor((e - 5) / Ho * 100 + .5) / 100 }

    function zo(e) { return Math.round((e * Ho + 5) / Ho * 256) / 256 }

    function Xo(e) { return ((e - 5) / Ho * 100 + .5) / 100 }

    function Go(e) { return (e * Ho + 5) / Ho * 256 / 256 }

    function jo(e) { return zo(Vo(Wo(e))) }

    function Ko(e) { var r = Math.abs(e - jo(e)),
            t = Ho; if (r > .005)
            for (Ho = Uo; Ho < Mo; ++Ho)
                if (Math.abs(e - jo(e)) <= r) { r = Math.abs(e - jo(e));
                    t = Ho }
        Ho = t }

    function Yo(e) { var r = Infinity,
            t = 0,
            a = Uo; for (Ho = Uo; Ho < Mo; ++Ho) { t = Go(Xo(e)) * 256;
            t = t % 1; if (t > .5) t--; if (Math.abs(t) < r) { r = Math.abs(t);
                a = Ho } } Ho = a }

    function $o(e) { if (e.width) { e.wpx = Wo(e.width);
            e.wch = Vo(e.wpx);
            e.MDW = Ho } else if (e.wpx) { e.wch = Vo(e.wpx);
            e.width = zo(e.wch);
            e.MDW = Ho } else if (typeof e.wch == "number") { e.width = zo(e.wch);
            e.wpx = Wo(e.width);
            e.MDW = Ho } if (e.customWidth) delete e.customWidth }
    var Zo = 96,
        Qo = Zo;

    function Jo(e) { return e * 96 / Qo }

    function qo(e) { return e * Qo / 96 }
    var ef = { None: "none", Solid: "solid", Gray50: "mediumGray", Gray75: "darkGray", Gray25: "lightGray", HorzStripe: "darkHorizontal", VertStripe: "darkVertical", ReverseDiagStripe: "darkDown", DiagStripe: "darkUp", DiagCross: "darkGrid", ThickDiagCross: "darkTrellis", ThinHorzStripe: "lightHorizontal", ThinVertStripe: "lightVertical", ThinReverseDiagStripe: "lightDown", ThinHorzCross: "lightGrid" };

    function rf(e, r, t, a) { r.Borders = []; var n = {},
            i = {};
        e[0].match(ve).forEach(function(e) { var t = me(e); switch (t[0]) {
                case "<borders":
                    ;
                case "<borders>":
                    ;
                case "</borders>":
                    break;
                case "<border":
                    ;
                case "<border>":
                    ;
                case "<border/>":
                    n = {}; if (t.diagonalUp) { n.diagonalUp = t.diagonalUp } if (t.diagonalDown) { n.diagonalDown = t.diagonalDown } r.Borders.push(n); break;
                case "</border>":
                    break;
                case "<left/>":
                    break;
                case "<left":
                    ;
                case "<left>":
                    break;
                case "</left>":
                    break;
                case "<right/>":
                    break;
                case "<right":
                    ;
                case "<right>":
                    break;
                case "</right>":
                    break;
                case "<top/>":
                    break;
                case "<top":
                    ;
                case "<top>":
                    break;
                case "</top>":
                    break;
                case "<bottom/>":
                    break;
                case "<bottom":
                    ;
                case "<bottom>":
                    break;
                case "</bottom>":
                    break;
                case "<diagonal":
                    ;
                case "<diagonal>":
                    ;
                case "<diagonal/>":
                    break;
                case "</diagonal>":
                    break;
                case "<horizontal":
                    ;
                case "<horizontal>":
                    ;
                case "<horizontal/>":
                    break;
                case "</horizontal>":
                    break;
                case "<vertical":
                    ;
                case "<vertical>":
                    ;
                case "<vertical/>":
                    break;
                case "</vertical>":
                    break;
                case "<start":
                    ;
                case "<start>":
                    ;
                case "<start/>":
                    break;
                case "</start>":
                    break;
                case "<end":
                    ;
                case "<end>":
                    ;
                case "<end/>":
                    break;
                case "</end>":
                    break;
                case "<color":
                    ;
                case "<color>":
                    break;
                case "<color/>":
                    ;
                case "</color>":
                    break;
                default:
                    if (a && a.WTF) throw new Error("unrecognized " + t[0] + " in borders"); } }) }

    function tf(e, r, t, a) { r.Fills = []; var n = {};
        e[0].match(ve).forEach(function(e) { var t = me(e); switch (t[0]) {
                case "<fills":
                    ;
                case "<fills>":
                    ;
                case "</fills>":
                    break;
                case "<fill>":
                    ;
                case "<fill":
                    ;
                case "<fill/>":
                    n = {};
                    r.Fills.push(n); break;
                case "</fill>":
                    break;
                case "<gradientFill>":
                    break;
                case "<gradientFill":
                    ;
                case "</gradientFill>":
                    r.Fills.push(n);
                    n = {}; break;
                case "<patternFill":
                    ;
                case "<patternFill>":
                    if (t.patternType) n.patternType = t.patternType; break;
                case "<patternFill/>":
                    ;
                case "</patternFill>":
                    break;
                case "<bgColor":
                    if (!n.bgColor) n.bgColor = {}; if (t.indexed) n.bgColor.indexed = parseInt(t.indexed, 10); if (t.theme) n.bgColor.theme = parseInt(t.theme, 10); if (t.tint) n.bgColor.tint = parseFloat(t.tint); if (t.rgb) n.bgColor.rgb = t.rgb.slice(-6); break;
                case "<bgColor/>":
                    ;
                case "</bgColor>":
                    break;
                case "<fgColor":
                    if (!n.fgColor) n.fgColor = {}; if (t.theme) n.fgColor.theme = parseInt(t.theme, 10); if (t.tint) n.fgColor.tint = parseFloat(t.tint); if (t.rgb) n.fgColor.rgb = t.rgb.slice(-6); break;
                case "<fgColor/>":
                    ;
                case "</fgColor>":
                    break;
                case "<stop":
                    ;
                case "<stop/>":
                    break;
                case "</stop>":
                    break;
                case "<color":
                    ;
                case "<color/>":
                    break;
                case "</color>":
                    break;
                default:
                    if (a && a.WTF) throw new Error("unrecognized " + t[0] + " in fills"); } }) }

    function af(e, r, t, a) { r.Fonts = []; var n = {};
        e[0].match(ve).forEach(function(e) { var i = me(e); switch (i[0]) {
                case "<fonts":
                    ;
                case "<fonts>":
                    ;
                case "</fonts>":
                    break;
                case "<font":
                    ;
                case "<font>":
                    break;
                case "</font>":
                    ;
                case "<font/>":
                    r.Fonts.push(n);
                    n = {}; break;
                case "<name":
                    if (i.val) n.name = i.val; break;
                case "<name/>":
                    ;
                case "</name>":
                    break;
                case "<b":
                    n.bold = i.val ? Re(i.val) : 1; break;
                case "<b/>":
                    n.bold = 1; break;
                case "<i":
                    n.italic = i.val ? Re(i.val) : 1; break;
                case "<i/>":
                    n.italic = 1; break;
                case "<u":
                    switch (i.val) {
                        case "none":
                            n.underline = 0; break;
                        case "single":
                            n.underline = 1; break;
                        case "double":
                            n.underline = 2; break;
                        case "singleAccounting":
                            n.underline = 33; break;
                        case "doubleAccounting":
                            n.underline = 34; break; } break;
                case "<u/>":
                    n.underline = 1; break;
                case "<strike":
                    n.strike = i.val ? Re(i.val) : 1; break;
                case "<strike/>":
                    n.strike = 1; break;
                case "<outline":
                    n.outline = i.val ? Re(i.val) : 1; break;
                case "<outline/>":
                    n.outline = 1; break;
                case "<shadow":
                    n.shadow = i.val ? Re(i.val) : 1; break;
                case "<shadow/>":
                    n.shadow = 1; break;
                case "<condense":
                    n.condense = i.val ? Re(i.val) : 1; break;
                case "<condense/>":
                    n.condense = 1; break;
                case "<extend":
                    n.extend = i.val ? Re(i.val) : 1; break;
                case "<extend/>":
                    n.extend = 1; break;
                case "<sz":
                    if (i.val) n.sz = +i.val; break;
                case "<sz/>":
                    ;
                case "</sz>":
                    break;
                case "<vertAlign":
                    if (i.val) n.vertAlign = i.val; break;
                case "<vertAlign/>":
                    ;
                case "</vertAlign>":
                    break;
                case "<family":
                    if (i.val) n.family = parseInt(i.val, 10); break;
                case "<family/>":
                    ;
                case "</family>":
                    break;
                case "<scheme":
                    if (i.val) n.scheme = i.val; break;
                case "<scheme/>":
                    ;
                case "</scheme>":
                    break;
                case "<charset":
                    if (i.val == "1") break;
                    i.codepage = s[parseInt(i.val, 10)]; break;
                case "<color":
                    if (!n.color) n.color = {}; if (i.auto) n.color.auto = Re(i.auto); if (i.rgb) n.color.rgb = i.rgb.slice(-6);
                    else if (i.indexed) { n.color.index = parseInt(i.indexed, 10); var o = va[n.color.index]; if (n.color.index == 81) o = va[1]; if (!o) throw new Error(e);
                        n.color.rgb = o[0].toString(16) + o[1].toString(16) + o[2].toString(16) } else if (i.theme) { n.color.theme = parseInt(i.theme, 10); if (i.tint) n.color.tint = parseFloat(i.tint); if (i.theme && t.themeElements && t.themeElements.clrScheme) { n.color.rgb = No(t.themeElements.clrScheme[n.color.theme].rgb, n.color.tint || 0) } } break;
                case "<color/>":
                    ;
                case "</color>":
                    break;
                default:
                    if (a && a.WTF) throw new Error("unrecognized " + i[0] + " in fonts"); } }) }

    function nf(e, r, t) { r.NumberFmt = []; var a = P(x._table); for (var n = 0; n < a.length; ++n) r.NumberFmt[a[n]] = x._table[a[n]]; var i = e[0].match(ve); if (!i) return; for (n = 0; n < i.length; ++n) { var s = me(i[n]); switch (s[0]) {
                case "<numFmts":
                    ;
                case "</numFmts>":
                    ;
                case "<numFmts/>":
                    ;
                case "<numFmts>":
                    break;
                case "<numFmt":
                    { var o = we(De(s.formatCode)),
                            f = parseInt(s.numFmtId, 10);r.NumberFmt[f] = o; if (f > 0) { if (f > 392) { for (f = 392; f > 60; --f)
                                    if (r.NumberFmt[f] == null) break;
                                r.NumberFmt[f] = o } x.load(o, f) } } break;
                case "</numFmt>":
                    break;
                default:
                    if (t.WTF) throw new Error("unrecognized " + s[0] + " in numFmts"); } } }

    function sf(e, r) { var t = ["<numFmts>"];
        [
            [5, 8],
            [23, 26],
            [41, 44],
            [50, 392]
        ].forEach(function(r) { for (var a = r[0]; a <= r[1]; ++a)
                if (e[a] != null) t[t.length] = je("numFmt", null, { numFmtId: a, formatCode: Ce(e[a]) }) }); if (t.length === 1) return "";
        t[t.length] = "</numFmts>";
        t[0] = je("numFmts", null, { count: t.length - 2 }).replace("/>", ">"); return t.join("") }
    var of = ["numFmtId", "fillId", "fontId", "borderId", "xfId"];
    var ff = ["applyAlignment", "applyBorder", "applyFill", "applyFont", "applyNumberFormat", "applyProtection", "pivotButton", "quotePrefix"];

    function lf(e, r, t) { r.CellXf = []; var a;
        e[0].match(ve).forEach(function(e) { var n = me(e),
                i = 0; switch (n[0]) {
                case "<cellXfs":
                    ;
                case "<cellXfs>":
                    ;
                case "<cellXfs/>":
                    ;
                case "</cellXfs>":
                    break;
                case "<xf":
                    ;
                case "<xf/>":
                    a = n;
                    delete a[0]; for (i = 0; i < of .length; ++i)
                        if (a[ of [i]]) a[ of [i]] = parseInt(a[ of [i]], 10); for (i = 0; i < ff.length; ++i)
                        if (a[ff[i]]) a[ff[i]] = Re(a[ff[i]], ""); if (a.numFmtId > 392) { for (i = 392; i > 60; --i)
                            if (r.NumberFmt[a.numFmtId] == r.NumberFmt[i]) { a.numFmtId = i; break } } r.CellXf.push(a); break;
                case "</xf>":
                    break;
                case "<alignment":
                    ;
                case "<alignment/>":
                    var s = {}; if (n.vertical) s.vertical = n.vertical; if (n.horizontal) s.horizontal = n.horizontal; if (n.textRotation != null) s.textRotation = n.textRotation; if (n.indent) s.indent = n.indent; if (n.wrapText) s.wrapText = n.wrapText;
                    a.alignment = s; break;
                case "</alignment>":
                    break;
                case "<protection":
                    ;
                case "</protection>":
                    ;
                case "<protection/>":
                    break;
                case "<extLst":
                    ;
                case "</extLst>":
                    break;
                case "<ext":
                    break;
                default:
                    if (t.WTF) throw new Error("unrecognized " + n[0] + " in cellXfs"); } }) }

    function cf(e) { var r = [];
        r[r.length] = je("cellXfs", null);
        e.forEach(function(e) { r[r.length] = je("xf", null, e) });
        r[r.length] = "</cellXfs>"; if (r.length === 2) return "";
        r[0] = je("cellXfs", null, { count: r.length - 2 }).replace("/>", ">"); return r.join("") }
    var uf = function em() { var e = /<numFmts([^>]*)>[\S\s]*?<\/numFmts>/; var r = /<cellXfs([^>]*)>[\S\s]*?<\/cellXfs>/; var t = /<fills([^>]*)>[\S\s]*?<\/fills>/; var a = /<fonts([^>]*)>[\S\s]*?<\/fonts>/; var n = /<borders([^>]*)>[\S\s]*?<\/borders>/; return function i(s, o, f) { var l = {}; if (!s) return l;
            s = s.replace(/<!--([\s\S]*?)-->/gm, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, ""); var c; if (c = s.match(e)) nf(c, l, f); if (c = s.match(a)) af(c, l, o, f); if (c = s.match(t)) tf(c, l, o, f); if (c = s.match(n)) rf(c, l, o, f); if (c = s.match(r)) lf(c, l, f); return l } }();
    var hf = je("styleSheet", null, { xmlns: $e.main[0], "xmlns:vt": $e.vt });
    _a.STY = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles";

    function df(e, r) { var t = [he, hf],
            a; if (e.SSF && (a = sf(e.SSF)) != null) t[t.length] = a;
        t[t.length] = '<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>';
        t[t.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>';
        t[t.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>';
        t[t.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>'; if (a = cf(r.cellXfs)) t[t.length] = a;
        t[t.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>';
        t[t.length] = '<dxfs count="0"/>';
        t[t.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>'; if (t.length > 2) { t[t.length] = "</styleSheet>";
            t[1] = t[1].replace("/>", ">") } return t.join("") }

    function vf(e, r) { var t = e._R(2); var a = vt(e, r - 2); return [t, a] }

    function pf(e, r, t) { if (!t) t = Nr(6 + 4 * r.length);
        t._W(2, e);
        pt(r, t); return t.length > t.l ? t.slice(0, t.l) : t }

    function bf(e, r, t) { var a = {};
        a.sz = e._R(2) / 20; var n = Xt(e, 2, t); if (n.fCondense) a.condense = 1; if (n.fExtend) a.extend = 1; if (n.fShadow) a.shadow = 1; if (n.fOutline) a.outline = 1; if (n.fStrikeout) a.strike = 1; if (n.fItalic) a.italic = 1; var i = e._R(2); if (i === 700) a.bold = 1; switch (e._R(2)) {
            case 1:
                a.vertAlign = "superscript"; break;
            case 2:
                a.vertAlign = "subscript"; break; } var s = e._R(1); if (s != 0) a.underline = s; var o = e._R(1); if (o > 0) a.family = o; var f = e._R(1); if (f > 0) a.charset = f;
        e.l++;
        a.color = Vt(e, 8); switch (e._R(1)) {
            case 1:
                a.scheme = "major"; break;
            case 2:
                a.scheme = "minor"; break; } a.name = vt(e, r - 21); return a }

    function mf(e, r) { if (!r) r = Nr(25 + 4 * 32);
        r._W(2, e.sz * 20);
        Gt(e, r);
        r._W(2, e.bold ? 700 : 400); var t = 0; if (e.vertAlign == "superscript") t = 1;
        else if (e.vertAlign == "subscript") t = 2;
        r._W(2, t);
        r._W(1, e.underline || 0);
        r._W(1, e.family || 0);
        r._W(1, e.charset || 0);
        r._W(1, 0);
        zt(e.color, r); var a = 0; if (e.scheme == "major") a = 1; if (e.scheme == "minor") a = 2;
        r._W(1, a);
        pt(e.name, r); return r.length > r.l ? r.slice(0, r.l) : r }
    var gf = ["none", "solid", "mediumGray", "darkGray", "lightGray", "darkHorizontal", "darkVertical", "darkDown", "darkUp", "darkGrid", "darkTrellis", "lightHorizontal", "lightVertical", "lightDown", "lightUp", "lightGrid", "lightTrellis", "gray125", "gray0625"];
    var Ef = L(gf);
    var kf = Pr;

    function wf(e, r) { if (!r) r = Nr(4 * 3 + 8 * 7 + 16 * 1); var t = Ef[e.patternType]; if (t == null) t = 40;
        r._W(4, t); var a = 0; if (t != 40) { zt({ auto: 1 }, r);
            zt({ auto: 1 }, r); for (; a < 12; ++a) r._W(4, 0) } else { for (; a < 4; ++a) r._W(4, 0); for (; a < 12; ++a) r._W(4, 0) } return r.length > r.l ? r.slice(0, r.l) : r }

    function Sf(e, r) { var t = e.l + r; var a = e._R(2); var n = e._R(2);
        e.l = t; return { ixfe: a, numFmtId: n } }

    function _f(e, r, t) { if (!t) t = Nr(16);
        t._W(2, r || 0);
        t._W(2, e.numFmtId || 0);
        t._W(2, 0);
        t._W(2, 0);
        t._W(2, 0);
        t._W(1, 0);
        t._W(1, 0);
        t._W(1, 0);
        t._W(1, 0);
        t._W(1, 0);
        t._W(1, 0); return t }

    function Cf(e, r) { if (!r) r = Nr(10);
        r._W(1, 0);
        r._W(1, 0);
        r._W(4, 0);
        r._W(4, 0); return r }
    var Bf = Pr;

    function Tf(e, r) { if (!r) r = Nr(51);
        r._W(1, 0);
        Cf(null, r);
        Cf(null, r);
        Cf(null, r);
        Cf(null, r);
        Cf(null, r); return r.length > r.l ? r.slice(0, r.l) : r }

    function xf(e, r) { if (!r) r = Nr(12 + 4 * 10);
        r._W(4, e.xfId);
        r._W(2, 1);
        r._W(1, +e.builtinId);
        r._W(1, 0);
        xt(e.name || "", r); return r.length > r.l ? r.slice(0, r.l) : r }

    function If(e, r, t) { var a = Nr(4 + 256 * 2 * 4);
        a._W(4, e);
        xt(r, a);
        xt(t, a); return a.length > a.l ? a.slice(0, a.l) : a }

    function Af(e, r, t) { var a = {};
        a.NumberFmt = []; for (var n in x._table) a.NumberFmt[n] = x._table[n];
        a.CellXf = [];
        a.Fonts = []; var i = []; var s = false;
        Lr(e, function o(e, n, f) { switch (f) {
                case 44:
                    a.NumberFmt[e[0]] = e[1];
                    x.load(e[1], e[0]); break;
                case 43:
                    a.Fonts.push(e); if (e.color.theme != null && r && r.themeElements && r.themeElements.clrScheme) { e.color.rgb = No(r.themeElements.clrScheme[e.color.theme].rgb, e.color.tint || 0) } break;
                case 1025:
                    break;
                case 45:
                    break;
                case 46:
                    break;
                case 47:
                    if (i[i.length - 1] == "BrtBeginCellXFs") { a.CellXf.push(e) } break;
                case 48:
                    ;
                case 507:
                    ;
                case 572:
                    ;
                case 475:
                    break;
                case 1171:
                    ;
                case 2102:
                    ;
                case 1130:
                    ;
                case 512:
                    ;
                case 2095:
                    break;
                case 35:
                    s = true; break;
                case 36:
                    s = false; break;
                case 37:
                    i.push(n); break;
                case 38:
                    i.pop(); break;
                default:
                    if ((n || "").indexOf("Begin") > 0) i.push(n);
                    else if ((n || "").indexOf("End") > 0) i.pop();
                    else if (!s || t.WTF) throw new Error("Unexpected record " + f + " " + n); } }); return a }

    function yf(e, r) { if (!r) return; var t = 0;
        [
            [5, 8],
            [23, 26],
            [41, 44],
            [50, 392]
        ].forEach(function(e) { for (var a = e[0]; a <= e[1]; ++a)
                if (r[a] != null) ++t }); if (t == 0) return;
        Ur(e, "BrtBeginFmts", dt(t));
        [
            [5, 8],
            [23, 26],
            [41, 44],
            [50, 392]
        ].forEach(function(t) { for (var a = t[0]; a <= t[1]; ++a)
                if (r[a] != null) Ur(e, "BrtFmt", pf(a, r[a])) });
        Ur(e, "BrtEndFmts") }

    function Rf(e, r) { var t = 1; if (t == 0) return;
        Ur(e, "BrtBeginFonts", dt(t));
        Ur(e, "BrtFont", mf({ sz: 12, color: { theme: 1 }, name: "Calibri", family: 2, scheme: "minor" }));
        Ur(e, "BrtEndFonts") }

    function Df(e, r) { var t = 2; if (t == 0) return;
        Ur(e, "BrtBeginFills", dt(t));
        Ur(e, "BrtFill", wf({ patternType: "none" }));
        Ur(e, "BrtFill", wf({ patternType: "gray125" }));
        Ur(e, "BrtEndFills") }

    function Of(e, r) { var t = 1; if (t == 0) return;
        Ur(e, "BrtBeginBorders", dt(t));
        Ur(e, "BrtBorder", Tf({}));
        Ur(e, "BrtEndBorders") }

    function Ff(e, r) { var t = 1;
        Ur(e, "BrtBeginCellStyleXFs", dt(t));
        Ur(e, "BrtXF", _f({ numFmtId: 0, fontId: 0, fillId: 0, borderId: 0 }, 65535));
        Ur(e, "BrtEndCellStyleXFs") }

    function Pf(e, r) { Ur(e, "BrtBeginCellXFs", dt(r.length));
        r.forEach(function(r) { Ur(e, "BrtXF", _f(r, 0)) });
        Ur(e, "BrtEndCellXFs") }

    function Nf(e, r) { var t = 1;
        Ur(e, "BrtBeginStyles", dt(1));
        Ur(e, "BrtStyle", xf({ xfId: 0, builtinId: 0, name: "Normal" }));
        Ur(e, "BrtEndStyles") }

    function Lf(e, r) { var t = 0;
        Ur(e, "BrtBeginDXFs", dt(t));
        Ur(e, "BrtEndDXFs") }

    function Mf(e, r) { var t = 0;
        Ur(e, "BrtBeginTableStyles", If(t, "TableStyleMedium9", "PivotStyleMedium4"));
        Ur(e, "BrtEndTableStyles") }

    function Uf(e, r) { return }

    function Hf(e, r) { var t = Mr();
        Ur(t, "BrtBeginStyleSheet");
        yf(t, e.SSF);
        Rf(t, e);
        Df(t, e);
        Of(t, e);
        Ff(t, e);
        Pf(t, r.cellXfs);
        Nf(t, e);
        Lf(t, e);
        Mf(t, e);
        Uf(t, e);
        Ur(t, "BrtEndStyleSheet"); return t.end() } _a.THEME = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme";

    function Wf(e, r, t) { r.themeElements.clrScheme = []; var a = {};
        (e[0].match(ve) || []).forEach(function(e) { var n = me(e); switch (n[0]) {
                case "<a:clrScheme":
                    ;
                case "</a:clrScheme>":
                    break;
                case "<a:srgbClr":
                    a.rgb = n.val; break;
                case "<a:sysClr":
                    a.rgb = n.lastClr; break;
                case "<a:dk1>":
                    ;
                case "</a:dk1>":
                    ;
                case "<a:lt1>":
                    ;
                case "</a:lt1>":
                    ;
                case "<a:dk2>":
                    ;
                case "</a:dk2>":
                    ;
                case "<a:lt2>":
                    ;
                case "</a:lt2>":
                    ;
                case "<a:accent1>":
                    ;
                case "</a:accent1>":
                    ;
                case "<a:accent2>":
                    ;
                case "</a:accent2>":
                    ;
                case "<a:accent3>":
                    ;
                case "</a:accent3>":
                    ;
                case "<a:accent4>":
                    ;
                case "</a:accent4>":
                    ;
                case "<a:accent5>":
                    ;
                case "</a:accent5>":
                    ;
                case "<a:accent6>":
                    ;
                case "</a:accent6>":
                    ;
                case "<a:hlink>":
                    ;
                case "</a:hlink>":
                    ;
                case "<a:folHlink>":
                    ;
                case "</a:folHlink>":
                    if (n[0].charAt(1) === "/") { r.themeElements.clrScheme.push(a);
                        a = {} } else { a.name = n[0].substring(3, n[0].length - 1) } break;
                default:
                    if (t && t.WTF) throw new Error("Unrecognized " + n[0] + " in clrScheme"); } }) }

    function Vf(e, r, t) {}

    function zf(e, r, t) {}
    var Xf = /<a:clrScheme([^>]*)>[\s\S]*<\/a:clrScheme>/;
    var Gf = /<a:fontScheme([^>]*)>[\s\S]*<\/a:fontScheme>/;
    var jf = /<a:fmtScheme([^>]*)>[\s\S]*<\/a:fmtScheme>/;

    function Kf(e, r, t) { r.themeElements = {}; var a;
        [
            ["clrScheme", Xf, Wf],
            ["fontScheme", Gf, Vf],
            ["fmtScheme", jf, zf]
        ].forEach(function(n) { if (!(a = e.match(n[1]))) throw new Error(n[0] + " not found in themeElements");
            n[2](a, r, t) }) }
    var Yf = /<a:themeElements([^>]*)>[\s\S]*<\/a:themeElements>/;

    function $f(e, r) { if (!e || e.length === 0) return $f(Zf()); var t; var a = {}; if (!(t = e.match(Yf))) throw new Error("themeElements not found in theme");
        Kf(t[0], a, r); return a }

    function Zf(e, r) { if (r && r.themeXLSX) return r.themeXLSX; var t = [he];
        t[t.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">';
        t[t.length] = "<a:themeElements>";
        t[t.length] = '<a:clrScheme name="Office">';
        t[t.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>';
        t[t.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>';
        t[t.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>';
        t[t.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>';
        t[t.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>';
        t[t.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>';
        t[t.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>';
        t[t.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>';
        t[t.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>';
        t[t.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>';
        t[t.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>';
        t[t.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>';
        t[t.length] = "</a:clrScheme>";
        t[t.length] = '<a:fontScheme name="Office">';
        t[t.length] = "<a:majorFont>";
        t[t.length] = '<a:latin typeface="Cambria"/>';
        t[t.length] = '<a:ea typeface=""/>';
        t[t.length] = '<a:cs typeface=""/>';
        t[t.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>';
        t[t.length] = '<a:font script="Hang" typeface="맑은 고딕"/>';
        t[t.length] = '<a:font script="Hans" typeface="宋体"/>';
        t[t.length] = '<a:font script="Hant" typeface="新細明體"/>';
        t[t.length] = '<a:font script="Arab" typeface="Times New Roman"/>';
        t[t.length] = '<a:font script="Hebr" typeface="Times New Roman"/>';
        t[t.length] = '<a:font script="Thai" typeface="Tahoma"/>';
        t[t.length] = '<a:font script="Ethi" typeface="Nyala"/>';
        t[t.length] = '<a:font script="Beng" typeface="Vrinda"/>';
        t[t.length] = '<a:font script="Gujr" typeface="Shruti"/>';
        t[t.length] = '<a:font script="Khmr" typeface="MoolBoran"/>';
        t[t.length] = '<a:font script="Knda" typeface="Tunga"/>';
        t[t.length] = '<a:font script="Guru" typeface="Raavi"/>';
        t[t.length] = '<a:font script="Cans" typeface="Euphemia"/>';
        t[t.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>';
        t[t.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>';
        t[t.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>';
        t[t.length] = '<a:font script="Thaa" typeface="MV Boli"/>';
        t[t.length] = '<a:font script="Deva" typeface="Mangal"/>';
        t[t.length] = '<a:font script="Telu" typeface="Gautami"/>';
        t[t.length] = '<a:font script="Taml" typeface="Latha"/>';
        t[t.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>';
        t[t.length] = '<a:font script="Orya" typeface="Kalinga"/>';
        t[t.length] = '<a:font script="Mlym" typeface="Kartika"/>';
        t[t.length] = '<a:font script="Laoo" typeface="DokChampa"/>';
        t[t.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>';
        t[t.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>';
        t[t.length] = '<a:font script="Viet" typeface="Times New Roman"/>';
        t[t.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>';
        t[t.length] = '<a:font script="Geor" typeface="Sylfaen"/>';
        t[t.length] = "</a:majorFont>";
        t[t.length] = "<a:minorFont>";
        t[t.length] = '<a:latin typeface="Calibri"/>';
        t[t.length] = '<a:ea typeface=""/>';
        t[t.length] = '<a:cs typeface=""/>';
        t[t.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>';
        t[t.length] = '<a:font script="Hang" typeface="맑은 고딕"/>';
        t[t.length] = '<a:font script="Hans" typeface="宋体"/>';
        t[t.length] = '<a:font script="Hant" typeface="新細明體"/>';
        t[t.length] = '<a:font script="Arab" typeface="Arial"/>';
        t[t.length] = '<a:font script="Hebr" typeface="Arial"/>';
        t[t.length] = '<a:font script="Thai" typeface="Tahoma"/>';
        t[t.length] = '<a:font script="Ethi" typeface="Nyala"/>';
        t[t.length] = '<a:font script="Beng" typeface="Vrinda"/>';
        t[t.length] = '<a:font script="Gujr" typeface="Shruti"/>';
        t[t.length] = '<a:font script="Khmr" typeface="DaunPenh"/>';
        t[t.length] = '<a:font script="Knda" typeface="Tunga"/>';
        t[t.length] = '<a:font script="Guru" typeface="Raavi"/>';
        t[t.length] = '<a:font script="Cans" typeface="Euphemia"/>';
        t[t.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>';
        t[t.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>';
        t[t.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>';
        t[t.length] = '<a:font script="Thaa" typeface="MV Boli"/>';
        t[t.length] = '<a:font script="Deva" typeface="Mangal"/>';
        t[t.length] = '<a:font script="Telu" typeface="Gautami"/>';
        t[t.length] = '<a:font script="Taml" typeface="Latha"/>';
        t[t.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>';
        t[t.length] = '<a:font script="Orya" typeface="Kalinga"/>';
        t[t.length] = '<a:font script="Mlym" typeface="Kartika"/>';
        t[t.length] = '<a:font script="Laoo" typeface="DokChampa"/>';
        t[t.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>';
        t[t.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>';
        t[t.length] = '<a:font script="Viet" typeface="Arial"/>';
        t[t.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>';
        t[t.length] = '<a:font script="Geor" typeface="Sylfaen"/>';
        t[t.length] = "</a:minorFont>";
        t[t.length] = "</a:fontScheme>";
        t[t.length] = '<a:fmtScheme name="Office">';
        t[t.length] = "<a:fillStyleLst>";
        t[t.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>';
        t[t.length] = '<a:gradFill rotWithShape="1">';
        t[t.length] = "<a:gsLst>";
        t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>';
        t[t.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>';
        t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
        t[t.length] = "</a:gsLst>";
        t[t.length] = '<a:lin ang="16200000" scaled="1"/>';
        t[t.length] = "</a:gradFill>";
        t[t.length] = '<a:gradFill rotWithShape="1">';
        t[t.length] = "<a:gsLst>";
        t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>';
        t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
        t[t.length] = "</a:gsLst>";
        t[t.length] = '<a:lin ang="16200000" scaled="0"/>';
        t[t.length] = "</a:gradFill>";
        t[t.length] = "</a:fillStyleLst>";
        t[t.length] = "<a:lnStyleLst>";
        t[t.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>';
        t[t.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>';
        t[t.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>';
        t[t.length] = "</a:lnStyleLst>";
        t[t.length] = "<a:effectStyleLst>";
        t[t.length] = "<a:effectStyle>";
        t[t.length] = "<a:effectLst>";
        t[t.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>';
        t[t.length] = "</a:effectLst>";
        t[t.length] = "</a:effectStyle>";
        t[t.length] = "<a:effectStyle>";
        t[t.length] = "<a:effectLst>";
        t[t.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>';
        t[t.length] = "</a:effectLst>";
        t[t.length] = "</a:effectStyle>";
        t[t.length] = "<a:effectStyle>";
        t[t.length] = "<a:effectLst>";
        t[t.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>';
        t[t.length] = "</a:effectLst>";
        t[t.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>';
        t[t.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>';
        t[t.length] = "</a:effectStyle>";
        t[t.length] = "</a:effectStyleLst>";
        t[t.length] = "<a:bgFillStyleLst>";
        t[t.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>';
        t[t.length] = '<a:gradFill rotWithShape="1">';
        t[t.length] = "<a:gsLst>";
        t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
        t[t.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
        t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>';
        t[t.length] = "</a:gsLst>";
        t[t.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>';
        t[t.length] = "</a:gradFill>";
        t[t.length] = '<a:gradFill rotWithShape="1">';
        t[t.length] = "<a:gsLst>";
        t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>';
        t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>';
        t[t.length] = "</a:gsLst>";
        t[t.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>';
        t[t.length] = "</a:gradFill>";
        t[t.length] = "</a:bgFillStyleLst>";
        t[t.length] = "</a:fmtScheme>";
        t[t.length] = "</a:themeElements>";
        t[t.length] = "<a:objectDefaults>";
        t[t.length] = "<a:spDef>";
        t[t.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>';
        t[t.length] = "</a:spDef>";
        t[t.length] = "<a:lnDef>";
        t[t.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>';
        t[t.length] = "</a:lnDef>";
        t[t.length] = "</a:objectDefaults>";
        t[t.length] = "<a:extraClrSchemeLst/>";
        t[t.length] = "</a:theme>"; return t.join("") }

    function Qf(e, r, t) { var a = e.l + r; var n = e._R(4); if (n === 124226) return; if (!t.cellStyles || !le) { e.l = a; return } var i = e.slice(e.l);
        e.l = a; var s; try { s = new le(i) } catch (o) { return } var f = oe(s, "theme/theme/theme1.xml", true); if (!f) return; return $f(f, t) }

    function Jf(e, r) { return e._R(4) }

    function qf(e, r) { var t = {};
        t.xclrType = e._R(2);
        t.nTintShade = e._R(2); switch (t.xclrType) {
            case 0:
                e.l += 4; break;
            case 1:
                t.xclrValue = el(e, 4); break;
            case 2:
                t.xclrValue = zn(e, 4); break;
            case 3:
                t.xclrValue = Jf(e, 4); break;
            case 4:
                e.l += 4; break; } e.l += 8; return t }

    function el(e, r) { return Pr(e, r) }

    function rl(e, r) { return Pr(e, r) }

    function tl(e, r) { var t = e._R(2); var a = e._R(2); var n = [t]; switch (t) {
            case 4:
                ;
            case 5:
                ;
            case 7:
                ;
            case 8:
                ;
            case 9:
                ;
            case 10:
                ;
            case 11:
                ;
            case 13:
                n[1] = qf(e, a); break;
            case 6:
                n[1] = rl(e, a); break;
            case 14:
                ;
            case 15:
                n[1] = e._R(a === 5 ? 1 : 2); break;
            default:
                throw new Error("Unrecognized ExtProp type: " + t + " " + a); } return n }

    function al(e, r) { var t = e.l + r;
        e.l += 2; var a = e._R(2);
        e.l += 2; var n = e._R(2); var i = []; while (n-- > 0) i.push(tl(e, t - e.l)); return { ixfe: a, ext: i } }

    function nl(e, r) { r.forEach(function(e) { switch (e[0]) {
                case 4:
                    break;
                case 5:
                    break;
                case 6:
                    break;
                case 7:
                    break;
                case 8:
                    break;
                case 9:
                    break;
                case 10:
                    break;
                case 11:
                    break;
                case 13:
                    break;
                case 14:
                    break;
                case 15:
                    break; } }) }

    function il(e, r, t) { var a = []; if (!e) return a; var n = 0,
            i = 1;
        (e.match(ve) || []).forEach(function(e) { var r = me(e); switch (r[0]) {
                case "<?xml":
                    break;
                case "<calcChain":
                    ;
                case "<calcChain>":
                    ;
                case "</calcChain>":
                    break;
                case "<c":
                    delete r[0]; if (r.i) i = r.i;
                    else r.i = i;
                    a.push(r); break; } }); return a }

    function sl(e, r) {}

    function ol(e, r) { var t = {};
        t.i = e._R(4); var a = {};
        a.r = e._R(4);
        a.c = e._R(4);
        t.r = tt(a); var n = e._R(1); if (n & 2) t.l = "1"; if (n & 8) t.a = "1"; return t }

    function fl(e, r, t) { var a = []; var n = false;
        Lr(e, function i(e, r, s) { switch (s) {
                case 63:
                    a.push(e); break;
                default:
                    if ((r || "").indexOf("Begin") > 0) {} else if ((r || "").indexOf("End") > 0) {} else if (!n || t.WTF) throw new Error("Unexpected record " + s + " " + r); } }); return a }

    function ll(e, r) {}

    function cl(e, r, t) { var a = t || {} }

    function ul(e, r, t) { if (!e) return e; var a = t || {}; var n = false,
            i = false;
        Lr(e, function s(e, r, t) { if (i) return; switch (t) {
                case 359:
                    ;
                case 363:
                    ;
                case 364:
                    ;
                case 366:
                    ;
                case 367:
                    ;
                case 368:
                    ;
                case 369:
                    ;
                case 370:
                    ;
                case 371:
                    ;
                case 472:
                    ;
                case 577:
                    ;
                case 578:
                    ;
                case 579:
                    ;
                case 580:
                    ;
                case 581:
                    ;
                case 582:
                    ;
                case 583:
                    ;
                case 584:
                    ;
                case 585:
                    ;
                case 586:
                    ;
                case 587:
                    break;
                case 35:
                    n = true; break;
                case 36:
                    n = false; break;
                default:
                    if ((r || "").indexOf("Begin") > 0) {} else if ((r || "").indexOf("End") > 0) {} else if (!n || a.WTF) throw new Error("Unexpected record " + t.toString(16) + " " + r); } }, a) } _a.IMG = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image";
    _a.DRAW = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing";

    function hl(e, r) { if (!e) return "??"; var t = (e.match(/<c:chart [^>]*r:id="([^"]*)"/) || ["", ""])[1]; return r["!id"][t].Target }
    var dl = 1024;

    function vl(e, r) { var t = [21600, 21600]; var a = ["m0,0l0", t[1], t[0], t[1], t[0], "0xe"].join(","); var n = [je("xml", null, { "xmlns:v": Ze.v, "xmlns:o": Ze.o, "xmlns:x": Ze.x, "xmlns:mv": Ze.mv }).replace(/\/>/, ">"), je("o:shapelayout", je("o:idmap", null, { "v:ext": "edit", data: e }), { "v:ext": "edit" }), je("v:shapetype", [je("v:stroke", null, { joinstyle: "miter" }), je("v:path", null, { gradientshapeok: "t", "o:connecttype": "rect" })].join(""), { id: "_x0000_t202", "o:spt": 202, coordsize: t.join(","), path: a })]; while (dl < e * 1e3) dl += 1e3;
        r.map(function(e) { return rt(e[0]) }).forEach(function(e, r) { n = n.concat(["<v:shape" + Ge({ id: "_x0000_s" + ++dl, type: "#_x0000_t202", style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10;visibility:hidden", fillcolor: "#ECFAD4", strokecolor: "#edeaa1" }) + ">", je("v:fill", je("o:fill", null, { type: "gradientUnscaled", "v:ext": "view" }), { color2: "#BEFF82", angle: "-180", type: "gradient" }), je("v:shadow", null, { on: "t", obscured: "t" }), je("v:path", null, { "o:connecttype": "none" }), '<v:textbox><div style="text-align:left"></div></v:textbox>', '<x:ClientData ObjectType="Note">', "<x:MoveWithCells/>", "<x:SizeWithCells/>", Xe("x:Anchor", [e.c, 0, e.r, 0, e.c + 3, 100, e.r + 5, 100].join(",")), Xe("x:AutoFill", "False"), Xe("x:Row", String(e.r)), Xe("x:Column", String(e.c)), "<x:Visible/>", "</x:ClientData>", "</v:shape>"]) });
        n.push("</xml>"); return n.join("") } _a.CMNT = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments";

    function pl(e, r, t, a, n) { for (var i = 0; i != r.length; ++i) { var s = r[i]; var o = Sv(se(e, s.replace(/^\//, ""), true), s, n); if (!o || !o.length) continue; var f = P(t); for (var l = 0; l != f.length; ++l) { var c = f[l]; var u = a[c]; if (u) { var h = u[s]; if (h) bl(c, t[c], o) } } } }

    function bl(e, r, t) { var a = Array.isArray(r); var n, i;
        t.forEach(function(e) { if (a) { i = rt(e.ref); if (!r[i.r]) r[i.r] = [];
                n = r[i.r][i.c] } else n = r[e.ref]; if (!n) { n = {}; if (a) r[i.r][i.c] = n;
                else r[e.ref] = n; var t = ot(r["!ref"] || "BDWGO1000001:A1"); var s = rt(e.ref); if (t.s.r > s.r) t.s.r = s.r; if (t.e.r < s.r) t.e.r = s.r; if (t.s.c > s.c) t.s.c = s.c; if (t.e.c < s.c) t.e.c = s.c; var o = st(t); if (o !== r["!ref"]) r["!ref"] = o } if (!n.c) n.c = []; var f = { a: e.author, t: e.t, r: e.r }; if (e.h) f.h = e.h;
            n.c.push(f) }) }

    function ml(e, r) { if (e.match(/<(?:\w+:)?comments *\/>/)) return []; var t = []; var a = []; var n = e.match(/<(?:\w+:)?authors>([\s\S]*)<\/(?:\w+:)?authors>/); if (n && n[1]) n[1].split(/<\/\w*:?author>/).forEach(function(e) { if (e === "" || e.trim() === "") return; var r = e.match(/<(?:\w+:)?author[^>]*>(.*)/); if (r) t.push(r[1]) }); var i = e.match(/<(?:\w+:)?commentList>([\s\S]*)<\/(?:\w+:)?commentList>/); if (i && i[1]) i[1].split(/<\/\w*:?comment>/).forEach(function(e, n) { if (e === "" || e.trim() === "") return; var i = e.match(/<(?:\w+:)?comment[^>]*>/); if (!i) return; var s = me(i[0]); var o = { author: s.authorId && t[s.authorId] || "sheetjsghost", ref: s.ref, guid: s.guid }; var f = rt(s.ref); if (r.sheetRows && r.sheetRows <= f.r) return; var l = e.match(/<(?:\w+:)?text>([\s\S]*)<\/(?:\w+:)?text>/); var c = !!l && !!l[1] && $s(l[1]) || { r: "", t: "", h: "" };
            o.r = c.r; if (c.r == "<t></t>") c.t = c.h = "";
            o.t = c.t.replace(/\r\n/g, "\n").replace(/\r/g, "\n"); if (r.cellHTML) o.h = c.h;
            a.push(o) }); return a }
    var gl = je("comments", null, { xmlns: $e.main[0] });

    function El(e, r) { var t = [he, gl]; var a = [];
        t.push("<authors>");
        e.map(function(e) { return e[1] }).forEach(function(e) { e.map(function(e) { return Ce(e.a) }).forEach(function(e) { if (a.indexOf(e) > -1) return;
                a.push(e);
                t.push("<author>" + e + "</author>") }) });
        t.push("</authors>");
        t.push("<commentList>");
        e.forEach(function(e) { e[1].forEach(function(r) { t.push('<comment ref="' + e[0] + '" authorId="' + a.indexOf(Ce(r.a)) + '"><text>');
                t.push(Xe("t", r.t == null ? "" : r.t));
                t.push("</text></comment>") }) });
        t.push("</commentList>"); if (t.length > 2) { t[t.length] = "</comments>";
            t[1] = t[1].replace("/>", ">") } return t.join("") }

    function kl(e, r) { var t = {};
        t.iauthor = e._R(4); var a = Nt(e, 16);
        t.rfx = a.s;
        t.ref = tt(a.s);
        e.l += 16; return t }

    function wl(e, r) { if (r == null) r = Nr(36);
        r._W(4, e[1].iauthor);
        Lt(e[0], r);
        r._W(4, 0);
        r._W(4, 0);
        r._W(4, 0);
        r._W(4, 0); return r }
    var Sl = vt;

    function _l(e) { return pt(e.slice(0, 54)) }

    function Cl(e, r) { var t = []; var a = []; var n = {}; var i = false;
        Lr(e, function s(e, o, f) { switch (f) {
                case 632:
                    a.push(e); break;
                case 635:
                    n = e; break;
                case 637:
                    n.t = e.t;
                    n.h = e.h;
                    n.r = e.r; break;
                case 636:
                    n.author = a[n.iauthor];
                    delete n.iauthor; if (r.sheetRows && r.sheetRows <= n.rfx.r) break; if (!n.t) n.t = "";
                    delete n.rfx;
                    t.push(n); break;
                case 35:
                    i = true; break;
                case 36:
                    i = false; break;
                case 37:
                    break;
                case 38:
                    break;
                default:
                    if ((o || "").indexOf("Begin") > 0) {} else if ((o || "").indexOf("End") > 0) {} else if (!i || r.WTF) throw new Error("Unexpected record " + f + " " + o); } }); return t }

    function Bl(e, r) { var t = Mr(); var a = [];
        Ur(t, "BrtBeginComments");
        Ur(t, "BrtBeginCommentAuthors");
        e.forEach(function(e) { e[1].forEach(function(e) { if (a.indexOf(e.a) > -1) return;
                a.push(e.a.slice(0, 54));
                Ur(t, "BrtCommentAuthor", _l(e.a)) }) });
        Ur(t, "BrtEndCommentAuthors");
        Ur(t, "BrtBeginCommentList");
        e.forEach(function(e) { e[1].forEach(function(r) { r.iauthor = a.indexOf(r.a); var n = { s: rt(e[0]), e: rt(e[0]) };
                Ur(t, "BrtBeginComment", wl([n, r])); if (r.t && r.t.length > 0) Ur(t, "BrtCommentText", wt(r));
                Ur(t, "BrtEndComment");
                delete r.iauthor }) });
        Ur(t, "BrtEndCommentList");
        Ur(t, "BrtEndComments"); return t.end() }

    function Tl(e) { var r = F.utils.cfb_new({ root: "R" });
        e.FullPaths.forEach(function(t, a) { if (t.slice(-1) === "/" || !t.match(/_VBA_PROJECT_CUR/)) return; var n = t.replace(/^[^\/]*/, "R").replace(/\/_VBA_PROJECT_CUR\u0000*/, "");
            F.utils.cfb_add(r, n, e.FileIndex[a].content) }); return F.write(r) }

    function xl(e, r) { r.FullPaths.forEach(function(t, a) { if (a == 0) return; var n = t.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/"); if (n.slice(-1) !== "/") F.utils.cfb_add(e, n, r.FileIndex[a].content) }) }
    var Il = ["xlsb", "xlsm", "xlam", "biff8", "xla"];
    _a.DS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/dialogsheet";
    _a.MS = "http://schemas.microsoft.com/office/2006/relationships/xlMacrosheet";

    function Al(e, r, t, a, n, i, s) { return { "!type": "dialog" } }

    function yl(e, r, t, a, n, i, s) { return { "!type": "dialog" } }

    function Rl(e, r, t, a, n, i, s) { return { "!type": "macro" } }

    function Dl(e, r, t, a, n, i, s) { return { "!type": "macro" } }
    var Ol = function() { var e = /(^|[^A-Za-z])R(\[?)(-?\d+|)\]?C(\[?)(-?\d+|)\]?/g; var r = { r: 0, c: 0 };

        function t(e, t, a, n, i, s) { var o = n.length > 0 ? parseInt(n, 10) | 0 : 0,
                f = s.length > 0 ? parseInt(s, 10) | 0 : 0; if (f < 0 && i.length === 0) f = 0; var l = false,
                c = false; if (i.length > 0 || s.length == 0) l = true; if (l) f += r.c;
            else --f; if (a.length > 0 || n.length == 0) c = true; if (c) o += r.r;
            else --o; return t + (l ? "" : "$") + Qr(f) + (c ? "" : "$") + Kr(o) } return function a(n, i) { r = i; return n.replace(e, t) } }();
    var Fl = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)([1-9]\d{0,5}|10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6])(?![_.\(A-Za-z0-9])/g;
    var Pl = function() { return function e(r, t) { return r.replace(Fl, function(e, r, a, n, i, s, o, f) { var l = Zr(n) - (a ? 0 : t.c); var c = jr(s) - (i ? 0 : t.r); var u = c == 0 ? "" : !i ? "[" + c + "]" : c + 1; var h = l == 0 ? "" : !a ? "[" + l + "]" : l + 1; return r + "R" + u + "C" + h }) } }();

    function Nl(e, r) { return e.replace(Fl, function(e, t, a, n, i, s, o, f) { return t + (a == "$" ? a + n : Qr(Zr(n) + r.c)) + (i == "$" ? i + s : Kr(jr(s) + r.r)) }) }

    function Ll(e, r, t) { var a = it(r),
            n = a.s,
            i = rt(t); var s = { r: i.r - n.r, c: i.c - n.c }; return Nl(e, s) }

    function Ml(e) { if (e.length == 1) return false; return true }

    function Ul(e) { return e.replace(/_xlfn\./g, "") }

    function Hl(e) { return function(r, t) { r.l += e; return } }

    function Wl(e) { e.l += 1; return }

    function Vl(e, r) { var t = e._R(r == 1 ? 1 : 2); return [t & 16383, t >> 14 & 1, t >> 15 & 1] }

    function zl(e, r, t) { var a = 2; if (t) { if (t.biff >= 2 && t.biff <= 5) return Xl(e, r, t);
            else if (t.biff == 12) a = 4 } var n = e._R(a),
            i = e._R(a); var s = Vl(e, 2); var o = Vl(e, 2); return { s: { r: n, c: s[0], cRel: s[1], rRel: s[2] }, e: { r: i, c: o[0], cRel: o[1], rRel: o[2] } } }

    function Xl(e) { var r = Vl(e, 2),
            t = Vl(e, 2); var a = e._R(1); var n = e._R(1); return { s: { r: r[0], c: a, cRel: r[1], rRel: r[2] }, e: { r: t[0], c: n, cRel: t[1], rRel: t[2] } } }

    function Gl(e, r) { var t = e._R(r == 12 ? 4 : 2),
            a = e._R(r == 12 ? 4 : 2); var n = Vl(e, 2); var i = Vl(e, 2); return { s: { r: t, c: n[0], cRel: n[1], rRel: n[2] }, e: { r: a, c: i[0], cRel: i[1], rRel: i[2] } } }

    function jl(e, r, t) { if (t && t.biff >= 2 && t.biff <= 5) return Kl(e, r, t); var a = e._R(t && t.biff == 12 ? 4 : 2); var n = Vl(e, 2); return { r: a, c: n[0], cRel: n[1], rRel: n[2] } }

    function Kl(e, r, t) { var a = Vl(e, 2); var n = e._R(1); return { r: a[0], c: n, cRel: a[1], rRel: a[2] } }

    function Yl(e, r, t) { var a = e._R(2); var n = e._R(2); return { r: a, c: n & 255, fQuoted: !!(n & 16384), cRel: n >> 15, rRel: n >> 15 } }

    function $l(e, r, t) { var a = t && t.biff ? t.biff : 8; if (a >= 2 && a <= 5) return Zl(e, r, t); var n = e._R(a >= 12 ? 4 : 2); var i = e._R(2); var s = (i & 16384) >> 14,
            o = (i & 32768) >> 15;
        i &= 16383; if (o == 1)
            while (n > 524287) n -= 1048576; if (s == 1)
            while (i > 8191) i = i - 16384; return { r: n, c: i, cRel: s, rRel: o } }

    function Zl(e, r) { var t = e._R(2); var a = e._R(1); var n = (t & 32768) >> 15,
            i = (t & 16384) >> 14;
        t &= 16383; if (n == 1 && t >= 8192) t = t - 16384; if (i == 1 && a >= 128) a = a - 256; return { r: t, c: a, cRel: i, rRel: n } }

    function Ql(e, r, t) { var a = (e[e.l++] & 96) >> 5; var n = zl(e, t.biff >= 2 && t.biff <= 5 ? 6 : 8, t); return [a, n] }

    function Jl(e, r, t) { var a = (e[e.l++] & 96) >> 5; var n = e._R(2, "i"); var i = 8; if (t) switch (t.biff) {
            case 5:
                e.l += 12;
                i = 6; break;
            case 12:
                i = 12; break; }
        var s = zl(e, i, t); return [a, n, s] }

    function ql(e, r, t) { var a = (e[e.l++] & 96) >> 5;
        e.l += t && t.biff > 8 ? 12 : 8; return [a] }

    function ec(e, r, t) { var a = (e[e.l++] & 96) >> 5; var n = e._R(2); var i = 8; if (t) switch (t.biff) {
            case 5:
                e.l += 12;
                i = 6; break;
            case 12:
                i = 12; break; } e.l += i; return [a, n] }

    function rc(e, r, t) { var a = (e[e.l++] & 96) >> 5; var n = Gl(e, t && t.biff > 8 ? 12 : 8, t); return [a, n] }

    function tc(e, r, t) { var a = (e[e.l++] & 96) >> 5;
        e.l += t.biff == 2 ? 6 : t.biff == 12 ? 14 : 7; return [a] }

    function ac(e, r) { var t = e[e.l + 1] & 1; var a = 1;
        e.l += 4; return [t, a] }

    function nc(e, r, t) { e.l += 2; var a = e._R(t && t.biff == 2 ? 1 : 2); var n = []; for (var i = 0; i <= a; ++i) n.push(e._R(t && t.biff == 2 ? 1 : 2)); return n }

    function ic(e, r, t) { var a = e[e.l + 1] & 255 ? 1 : 0;
        e.l += 2; return [a, e._R(t && t.biff == 2 ? 1 : 2)] }

    function sc(e, r, t) { var a = e[e.l + 1] & 255 ? 1 : 0;
        e.l += 2; return [a, e._R(t && t.biff == 2 ? 1 : 2)] }

    function oc(e, r) { var t = e[e.l + 1] & 255 ? 1 : 0;
        e.l += 2; return [t, e._R(2)] }

    function fc(e, r, t) { var a = e[e.l + 1] & 255 ? 1 : 0;
        e.l += t && t.biff == 2 ? 3 : 4; return [a] }

    function lc(e, r) { var t = e._R(1),
            a = e._R(1); return [t, a] }

    function cc(e, r) { e._R(2); return lc(e, 2) }

    function uc(e, r) { e._R(2); return lc(e, 2) }

    function hc(e, r, t) { var a = e[e.l] & 31; var n = (e[e.l] & 96) >> 5;
        e.l += 1; var i = jl(e, 0, t); return [n, i] }

    function dc(e, r, t) { var a = (e[e.l] & 96) >> 5;
        e.l += 1; var n = $l(e, 0, t); return [a, n] }

    function vc(e, r, t) { var a = (e[e.l] & 96) >> 5;
        e.l += 1; var n = e._R(2); var i = jl(e, 0, t); return [a, n, i] }

    function pc(e, r, t) { var a = e[e.l] & 31; var n = (e[e.l] & 96) >> 5;
        e.l += 1; var i = e._R(t && t.biff <= 3 ? 1 : 2); return [Xu[i], zu[i], n] }

    function bc(e, r, t) { e.l++; var a = e._R(1),
            n = t && t.biff <= 3 ? [0, e._R(1)] : mc(e); return [a, (n[0] === 0 ? zu : Vu)[n[1]]] }

    function mc(e, r) { return [e[e.l + 1] >> 7, e._R(2) & 32767] }

    function gc(e, r, t) { e.l += t && t.biff == 2 ? 3 : 4; return }
    var Ec = Wl;

    function kc(e, r, t) { e.l++; if (t && t.biff == 12) return [e._R(4, "i"), 0]; var a = e._R(2); var n = e._R(t && t.biff == 2 ? 1 : 2); return [a, n] }

    function wc(e, r) { e.l++; return Ht[e._R(1)] }

    function Sc(e, r) { e.l++; return e._R(2) }

    function _c(e, r) { e.l++; return e._R(1) !== 0 }

    function Cc(e, r) { e.l++; return Mt(e, 8) }

    function Bc(e, r, t) { e.l++; return yn(e, r - 1, t) }

    function Tc(e, r) { var t = [e._R(1)]; if (r == 12) switch (t[0]) {
            case 2:
                t[0] = 4; break;
            case 4:
                t[0] = 16; break;
            case 0:
                t[0] = 1; break;
            case 1:
                t[0] = 2; break; }
        switch (t[0]) {
            case 4:
                t[1] = _n(e, 1) ? "TRUE" : "FALSE";
                e.l += 7; break;
            case 16:
                t[1] = Ht[e[e.l]];
                e.l += 8; break;
            case 0:
                e.l += 8; break;
            case 1:
                t[1] = Mt(e, 8); break;
            case 2:
                t[1] = Fn(e, 0, { biff: r > 0 && r < 8 ? 2 : r }); break; } return t }

    function xc(e, r) { var t = e._R(2); var a = []; for (var n = 0; n != t; ++n) a.push(Jn(e, 8)); return a }

    function Ic(e, r, t) { var a = 0,
            n = 0; if (t.biff == 12) { a = e._R(4);
            n = e._R(4) } else { n = 1 + e._R(1);
            a = 1 + e._R(2) } if (t.biff >= 2 && t.biff < 8) {--a; if (--n == 0) n = 256 } for (var i = 0, s = []; i != a && (s[i] = []); ++i)
            for (var o = 0; o != n; ++o) s[i][o] = Tc(e, t.biff); return s }

    function Ac(e, r, t) { var a = e._R(1) >>> 5 & 3; var n = !t || t.biff >= 8 ? 4 : 2; var i = e._R(n); switch (t.biff) {
            case 2:
                e.l += 5; break;
            case 3:
                ;
            case 4:
                e.l += 8; break;
            case 5:
                e.l += 12; break; } return [a, 0, i] }

    function yc(e, r, t) { if (t.biff == 5) return Rc(e, r, t); var a = e._R(1) >>> 5 & 3; var n = e._R(2); var i = e._R(4); return [a, n, i] }

    function Rc(e, r, t) { var a = e._R(1) >>> 5 & 3; var n = e._R(2, "i");
        e.l += 8; var i = e._R(2);
        e.l += 12; return [a, n, i] }

    function Dc(e, r, t) { var a = e._R(1) >>> 5 & 3;
        e.l += t && t.biff == 2 ? 3 : 4; var n = e._R(t && t.biff == 2 ? 1 : 2); return [a, n] }

    function Oc(e, r, t) { var a = e._R(1) >>> 5 & 3; var n = e._R(t && t.biff == 2 ? 1 : 2); return [a, n] }

    function Fc(e, r, t) { var a = e._R(1) >>> 5 & 3;
        e.l += 4; if (t.biff == 12) e.l += 2; return [a] }

    function Pc(e, r, t) { var a = (e[e.l++] & 96) >> 5; var n = e._R(2); var i = 4; if (t) switch (t.biff) {
            case 5:
                throw new Error("PtgRefErr3d -- 5");
            case 12:
                i = 6; break; } e.l += i; return [a, n] }
    var Nc = Wl;
    var Lc = Wl;
    var Mc = Wl;
    var Uc = Wl;
    var Hc = Wl;
    var Wc = Wl;
    var Vc = Wl;
    var zc = Wl;
    var Xc = Wl;
    var Gc = Wl;
    var jc = Wl;
    var Kc = Wl;
    var Yc = Wl;
    var $c = Wl;
    var Zc = Wl;
    var Qc = Wl;
    var Jc = Wl;
    var qc = Wl;
    var eu = Wl;
    var ru = Pr;
    var tu = Pr;
    var au = Pr;

    function nu(e, r, t) { e.l += 2; return [Yl(e, 4, t)] }

    function iu(e, r, t) { e.l += 6; return [] }
    var su = nu;
    var ou = iu;
    var fu = iu;
    var lu = nu;

    function cu(e, r, t) { e.l += 2; return [Bn(e), e._R(2) & 1] }
    var uu = nu;
    var hu = cu;
    var du = iu;
    var vu = nu;
    var pu = nu;

    function bu(e, r, t) { e.l += 2; var a = e._R(2);
        e.l += 10; return {} }

    function mu(e, r, t) { e.l += 2; return [e._R(4)] }
    var gu = { 1: { n: "PtgExp", f: kc }, 2: { n: "PtgTbl", f: au }, 3: { n: "PtgAdd", f: Nc }, 4: { n: "PtgSub", f: Qc }, 5: { n: "PtgMul", f: Gc }, 6: { n: "PtgDiv", f: Lc }, 7: { n: "PtgPower", f: $c }, 8: { n: "PtgConcat", f: Ec }, 9: { n: "PtgLt", f: zc }, 10: { n: "PtgLe", f: Vc }, 11: { n: "PtgEq", f: Mc }, 12: { n: "PtgGe", f: Uc }, 13: { n: "PtgGt", f: Hc }, 14: { n: "PtgNe", f: jc }, 15: { n: "PtgIsect", f: Wc }, 16: { n: "PtgUnion", f: qc }, 17: { n: "PtgRange", f: Zc }, 18: { n: "PtgUplus", f: eu }, 19: { n: "PtgUminus", f: Jc }, 20: { n: "PtgPercent", f: Yc }, 21: { n: "PtgParen", f: Kc }, 22: { n: "PtgMissArg", f: Xc }, 23: { n: "PtgStr", f: Bc }, 28: { n: "PtgErr", f: wc }, 29: { n: "PtgBool", f: _c }, 30: { n: "PtgInt", f: Sc }, 31: { n: "PtgNum", f: Cc }, 32: { n: "PtgArray", f: tc }, 33: { n: "PtgFunc", f: pc }, 34: { n: "PtgFuncVar", f: bc }, 35: { n: "PtgName", f: Ac }, 36: { n: "PtgRef", f: hc }, 37: { n: "PtgArea", f: Ql }, 38: { n: "PtgMemArea", f: Dc }, 39: { n: "PtgMemErr", f: ru }, 40: { n: "PtgMemNoMem", f: tu }, 41: { n: "PtgMemFunc", f: Oc }, 42: { n: "PtgRefErr", f: Fc }, 43: { n: "PtgAreaErr", f: ql }, 44: { n: "PtgRefN", f: dc }, 45: { n: "PtgAreaN", f: rc }, 57: { n: "PtgNameX", f: yc }, 58: { n: "PtgRef3d", f: vc }, 59: { n: "PtgArea3d", f: Jl }, 60: { n: "PtgRefErr3d", f: Pc }, 61: { n: "PtgAreaErr3d", f: ec }, 255: {} };
    var Eu = { 64: 32, 96: 32, 65: 33, 97: 33, 66: 34, 98: 34, 67: 35, 99: 35, 68: 36, 100: 36, 69: 37, 101: 37, 70: 38, 102: 38, 71: 39, 103: 39, 72: 40, 104: 40, 73: 41, 105: 41, 74: 42, 106: 42, 75: 43, 107: 43, 76: 44, 108: 44, 77: 45, 109: 45, 89: 57, 121: 57, 90: 58, 122: 58, 91: 59, 123: 59, 92: 60, 124: 60, 93: 61, 125: 61 };
    (function() { for (var e in Eu) gu[e] = gu[Eu[e]] })();
    var ku = { 1: { n: "PtgElfLel", f: cu }, 2: { n: "PtgElfRw", f: vu }, 3: { n: "PtgElfCol", f: su }, 6: { n: "PtgElfRwV", f: pu }, 7: { n: "PtgElfColV", f: lu }, 10: { n: "PtgElfRadical", f: uu }, 11: { n: "PtgElfRadicalS", f: du }, 13: { n: "PtgElfColS", f: ou }, 15: { n: "PtgElfColSV", f: fu }, 16: { n: "PtgElfRadicalLel", f: hu }, 25: { n: "PtgList", f: bu }, 29: { n: "PtgSxName", f: mu }, 255: {} };
    var wu = { 1: { n: "PtgAttrSemi", f: fc }, 2: { n: "PtgAttrIf", f: sc }, 4: { n: "PtgAttrChoose", f: nc }, 8: { n: "PtgAttrGoto", f: ic }, 16: { n: "PtgAttrSum", f: gc }, 32: { n: "PtgAttrBaxcel", f: ac }, 64: { n: "PtgAttrSpace", f: cc }, 65: { n: "PtgAttrSpaceSemi", f: uc }, 128: { n: "PtgAttrIfError", f: oc }, 255: {} };
    wu[33] = wu[32];

    function Su(e, r, t, a) { if (a.biff < 8) return Pr(e, r); var n = e.l + r; var i = []; for (var s = 0; s !== t.length; ++s) { switch (t[s][0]) {
                case "PtgArray":
                    t[s][1] = Ic(e, 0, a);
                    i.push(t[s][1]); break;
                case "PtgMemArea":
                    t[s][2] = xc(e, t[s][1]);
                    i.push(t[s][2]); break;
                case "PtgExp":
                    if (a && a.biff == 12) { t[s][1][1] = e._R(4);
                        i.push(t[s][1]) } break;
                case "PtgList":
                    ;
                case "PtgElfRadicalS":
                    ;
                case "PtgElfColS":
                    ;
                case "PtgElfColSV":
                    throw "Unsupported " + t[s][0];
                default:
                    break; } } r = n - e.l; if (r !== 0) i.push(Pr(e, r)); return i }

    function _u(e, r, t) { var a = e.l + r; var n, i, s = []; while (a != e.l) { r = a - e.l;
            i = e[e.l];
            n = gu[i]; if (i === 24 || i === 25) { i = e[e.l + 1];
                n = (i === 24 ? ku : wu)[i] } if (!n || !n.f) { Pr(e, r) } else { s.push([n.n, n.f(e, r, t)]) } } return s }

    function Cu(e) { var r = []; for (var t = 0; t < e.length; ++t) { var a = e[t],
                n = []; for (var i = 0; i < a.length; ++i) { var s = a[i]; if (s) switch (s[0]) {
                    case 2:
                        n.push('"' + s[1].replace(/"/g, '""') + '"'); break;
                    default:
                        n.push(s[1]); } else n.push("") } r.push(n.join(",")) } return r.join(";") }
    var Bu = { PtgAdd: "+", PtgConcat: "&", PtgDiv: "/", PtgEq: "=", PtgGe: ">=", PtgGt: ">", PtgLe: "<=", PtgLt: "<", PtgMul: "*", PtgNe: "<>", PtgPower: "^", PtgSub: "-" };

    function Tu(e) { if (!e) throw new Error("empty sheet name"); if (e.indexOf(" ") > -1) return "'" + e + "'"; return e }

    function xu(e, r, t) { if (!e) return "SH33TJSERR0"; if (!e.XTI) return "SH33TJSERR6"; var a = e.XTI[r]; if (t.biff > 8 && !e.XTI[r]) return e.SheetNames[r]; if (t.biff < 8) { if (r > 1e4) r -= 65536; if (r < 0) r = -r; return r == 0 ? "" : e.XTI[r - 1] } if (!a) return "SH33TJSERR1"; var n = ""; if (t.biff > 8) switch (e[a[0]][0]) {
            case 357:
                n = a[1] == -1 ? "#REF" : e.SheetNames[a[1]]; return a[1] == a[2] ? n : n + ":" + e.SheetNames[a[2]];
            case 358:
                if (t.SID != null) return e.SheetNames[t.SID]; return "SH33TJSSAME" + e[a[0]][0];
            case 355:
                ;
            default:
                return "SH33TJSSRC" + e[a[0]][0]; }
        switch (e[a[0]][0][0]) {
            case 1025:
                n = a[1] == -1 ? "#REF" : e.SheetNames[a[1]] || "SH33TJSERR3"; return a[1] == a[2] ? n : n + ":" + e.SheetNames[a[2]];
            case 14849:
                return "SH33TJSERR8";
            default:
                if (!e[a[0]][0][3]) return "SH33TJSERR2";
                n = a[1] == -1 ? "#REF" : e[a[0]][0][3][a[1]] || "SH33TJSERR4"; return a[1] == a[2] ? n : n + ":" + e[a[0]][0][3][a[2]]; } }

    function Iu(e, r, t) { return Tu(xu(e, r, t)) }

    function Au(e, r, t, a, n) { var i = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } }; var s = [],
            o, f, l, c, u = 0,
            h = 0,
            d, v = ""; if (!e[0] || !e[0][0]) return ""; var p = -1,
            b = ""; for (var m = 0, g = e[0].length; m < g; ++m) { var E = e[0][m]; switch (E[0]) {
                case "PtgUminus":
                    s.push("-" + s.pop()); break;
                case "PtgUplus":
                    s.push("+" + s.pop()); break;
                case "PtgPercent":
                    s.push(s.pop() + "%"); break;
                case "PtgAdd":
                    ;
                case "PtgConcat":
                    ;
                case "PtgDiv":
                    ;
                case "PtgEq":
                    ;
                case "PtgGe":
                    ;
                case "PtgGt":
                    ;
                case "PtgLe":
                    ;
                case "PtgLt":
                    ;
                case "PtgMul":
                    ;
                case "PtgNe":
                    ;
                case "PtgPower":
                    ;
                case "PtgSub":
                    o = s.pop();
                    f = s.pop(); if (p >= 0) { switch (e[0][p][1][0]) {
                            case 0:
                                b = Z(" ", e[0][p][1][1]); break;
                            case 1:
                                b = Z("\r", e[0][p][1][1]); break;
                            default:
                                b = ""; if (n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][p][1][0]); } f = f + b;
                        p = -1 } s.push(f + Bu[E[0]] + o); break;
                case "PtgIsect":
                    o = s.pop();
                    f = s.pop();
                    s.push(f + " " + o); break;
                case "PtgUnion":
                    o = s.pop();
                    f = s.pop();
                    s.push(f + "," + o); break;
                case "PtgRange":
                    o = s.pop();
                    f = s.pop();
                    s.push(f + ":" + o); break;
                case "PtgAttrChoose":
                    break;
                case "PtgAttrGoto":
                    break;
                case "PtgAttrIf":
                    break;
                case "PtgAttrIfError":
                    break;
                case "PtgRef":
                    l = E[1][0];
                    c = Hr(E[1][1], i, n);
                    s.push(Vr(c)); break;
                case "PtgRefN":
                    l = E[1][0];
                    c = t ? Hr(E[1][1], t, n) : E[1][1];
                    s.push(Vr(c)); break;
                case "PtgRef3d":
                    l = E[1][0];
                    u = E[1][1];
                    c = Hr(E[1][2], i, n);
                    v = Iu(a, u, n); var k = v;
                    s.push(v + "!" + Vr(c)); break;
                case "PtgFunc":
                    ;
                case "PtgFuncVar":
                    var w = E[1][0],
                        S = E[1][1]; if (!w) w = 0; var _ = w == 0 ? [] : s.slice(-w);
                    s.length -= w; if (S === "User") S = _.shift();
                    s.push(S + "(" + _.join(",") + ")"); break;
                case "PtgBool":
                    s.push(E[1] ? "TRUE" : "FALSE"); break;
                case "PtgInt":
                    s.push(E[1]); break;
                case "PtgNum":
                    s.push(String(E[1])); break;
                case "PtgStr":
                    s.push('"' + E[1] + '"'); break;
                case "PtgErr":
                    s.push(E[1]); break;
                case "PtgAreaN":
                    l = E[1][0];
                    d = Wr(E[1][1], t ? { s: t } : i, n);
                    s.push(zr(d, n)); break;
                case "PtgArea":
                    l = E[1][0];
                    d = Wr(E[1][1], i, n);
                    s.push(zr(d, n)); break;
                case "PtgArea3d":
                    l = E[1][0];
                    u = E[1][1];
                    d = E[1][2];
                    v = Iu(a, u, n);
                    s.push(v + "!" + zr(d, n)); break;
                case "PtgAttrSum":
                    s.push("SUM(" + s.pop() + ")"); break;
                case "PtgAttrSemi":
                    break;
                case "PtgName":
                    h = E[1][2]; var C = (a.names || [])[h - 1] || (a[0] || [])[h]; var B = C ? C.Name : "SH33TJSNAME" + String(h); if (B in Gu) B = Gu[B];
                    s.push(B); break;
                case "PtgNameX":
                    var T = E[1][1];
                    h = E[1][2]; var x; if (n.biff <= 5) { if (T < 0) T = -T; if (a[T]) x = a[T][h] } else { var I = ""; if (((a[T] || [])[0] || [])[0] == 14849) {} else if (((a[T] || [])[0] || [])[0] == 1025) { if (a[T][h] && a[T][h].itab > 0) { I = a.SheetNames[a[T][h].itab - 1] + "!" } } else I = a.SheetNames[h - 1] + "!"; if (a[T] && a[T][h]) I += a[T][h].Name;
                        else if (a[0] && a[0][h]) I += a[0][h].Name;
                        else I += "SH33TJSERRX";
                        s.push(I); break } if (!x) x = { Name: "SH33TJSERRY" };
                    s.push(x.Name); break;
                case "PtgParen":
                    var A = "(",
                        y = ")"; if (p >= 0) { b = ""; switch (e[0][p][1][0]) {
                            case 2:
                                A = Z(" ", e[0][p][1][1]) + A; break;
                            case 3:
                                A = Z("\r", e[0][p][1][1]) + A; break;
                            case 4:
                                y = Z(" ", e[0][p][1][1]) + y; break;
                            case 5:
                                y = Z("\r", e[0][p][1][1]) + y; break;
                            default:
                                if (n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][p][1][0]); } p = -1 } s.push(A + s.pop() + y); break;
                case "PtgRefErr":
                    s.push("#REF!"); break;
                case "PtgRefErr3d":
                    s.push("#REF!"); break;
                case "PtgExp":
                    c = { c: E[1][1], r: E[1][0] }; var R = { c: t.c, r: t.r }; if (a.sharedf[tt(c)]) { var D = a.sharedf[tt(c)];
                        s.push(Au(D, i, R, a, n)) } else { var O = false; for (o = 0; o != a.arrayf.length; ++o) { f = a.arrayf[o]; if (c.c < f[0].s.c || c.c > f[0].e.c) continue; if (c.r < f[0].s.r || c.r > f[0].e.r) continue;
                            s.push(Au(f[1], i, R, a, n));
                            O = true; break } if (!O) s.push(E[1]) } break;
                case "PtgArray":
                    s.push("{" + Cu(E[1]) + "}"); break;
                case "PtgMemArea":
                    break;
                case "PtgAttrSpace":
                    ;
                case "PtgAttrSpaceSemi":
                    p = m; break;
                case "PtgTbl":
                    break;
                case "PtgMemErr":
                    break;
                case "PtgMissArg":
                    s.push(""); break;
                case "PtgAreaErr":
                    s.push("#REF!"); break;
                case "PtgAreaErr3d":
                    s.push("#REF!"); break;
                case "PtgMemFunc":
                    break;
                case "PtgMemNoMem":
                    throw new Error("Unrecognized Formula Token: " + String(E));
                case "PtgElfCol":
                    ;
                case "PtgElfColS":
                    ;
                case "PtgElfColSV":
                    ;
                case "PtgElfColV":
                    ;
                case "PtgElfLel":
                    ;
                case "PtgElfRadical":
                    ;
                case "PtgElfRadicalLel":
                    ;
                case "PtgElfRadicalS":
                    ;
                case "PtgElfRw":
                    ;
                case "PtgElfRwV":
                    throw new Error("Unsupported ELFs");
                case "PtgAttrBaxcel":
                    throw new Error("Unrecognized Formula Token: " + String(E));
                case "PtgSxName":
                    throw new Error("Unrecognized Formula Token: " + String(E));
                case "PtgList":
                    throw new Error("Unrecognized Formula Token: " + String(E));
                default:
                    throw new Error("Unrecognized Formula Token: " + String(E)); } var F = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"]; if (p >= 0 && F.indexOf(e[0][m][0]) == -1) { E = e[0][p]; var P = true; switch (E[1][0]) {
                    case 4:
                        P = false;
                    case 0:
                        b = Z(" ", E[1][1]); break;
                    case 5:
                        P = false;
                    case 1:
                        b = Z("\r", E[1][1]); break;
                    default:
                        b = ""; if (n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + E[1][0]); } s.push((P ? b : "") + s.pop() + (P ? "" : b));
                p = -1 } } if (s.length > 1 && n.WTF) throw new Error("bad formula stack"); return s[0] }

    function yu(e, r, t, a) { var n = e.l + r,
            i = t.biff == 2 ? 1 : 2; var s, o = e._R(i); if (o == 65535) return [
            [], Pr(e, r - 2)
        ]; var f = _u(e, o, t); if (r !== o + i) s = Su(e, r - o - i, f, t); return [f, s] }

    function Ru(e, r, t) { var a = e.l + r,
            n = t.biff == 2 ? 1 : 2; var i, s = e._R(n); if (s == 65535) return [
            [], Pr(e, r - 2)
        ]; var o = _u(e, s, t); if (r !== s + n) i = Su(e, r - s - n, o, t); return [o, i] }

    function Du(e, r, t, a) { var n = e.l + r; var i = _u(e, a, t); var s; if (n !== e.l) s = Su(e, n - e.l, i, t); return [i, s] }

    function Ou(e, r, t) { var a = e.l + r; var n, i = e._R(2); var s = _u(e, i, t); if (i == 65535) return [
            [], Pr(e, r - 2)
        ]; if (r !== i + 2) n = Su(e, a - i - 2, s, t); return [s, n] }

    function Fu(e) { var r; if (wr(e, e.l + 6) !== 65535) return [Mt(e), "n"]; switch (e[e.l]) {
            case 0:
                e.l += 8; return ["String", "s"];
            case 1:
                r = e[e.l + 2] === 1;
                e.l += 8; return [r, "b"];
            case 2:
                r = e[e.l + 2];
                e.l += 8; return [r, "e"];
            case 3:
                e.l += 8; return ["", "s"]; } return [] }

    function Pu(e, r, t) { var a = e.l + r; var n = Gn(e, 6); if (t.biff == 2) ++e.l; var i = Fu(e, 8); var s = e._R(1); if (t.biff != 2) { e._R(1); if (t.biff >= 5) { var o = e._R(4) } } var f = Ru(e, a - e.l, t); return { cell: n, val: i[0], formula: f, shared: s >> 3 & 1, tt: i[1] } }

    function Nu(e, r, t) { var a = e.l + r; var n = e._R(4); var i = _u(e, n, t); var s = e._R(4); var o = s > 0 ? Su(e, s, i, t) : null; return [i, o] }
    var Lu = Nu;
    var Mu = Nu;
    var Uu = Nu;
    var Hu = Nu;
    var Wu = { 1: "REFERENCE", 2: "VALUE", 3: "ARRAY" };
    var Vu = { 0: "BEEP", 1: "OPEN", 2: "OPEN.LINKS", 3: "CLOSE.ALL", 4: "SAVE", 5: "SAVE.AS", 6: "FILE.DELETE", 7: "PAGE.SETUP", 8: "PRINT", 9: "PRINTER.SETUP", 10: "QUIT", 11: "NEW.WINDOW", 12: "ARRANGE.ALL", 13: "WINDOW.SIZE", 14: "WINDOW.MOVE", 15: "FULL", 16: "CLOSE", 17: "RUN", 22: "SET.PRINT.AREA", 23: "SET.PRINT.TITLES", 24: "SET.PAGE.BREAK", 25: "REMOVE.PAGE.BREAK", 26: "FONT", 27: "DISPLAY", 28: "PROTECT.DOCUMENT", 29: "PRECISION", 30: "A1.R1C1", 31: "CALCULATE.NOW", 32: "CALCULATION", 34: "DATA.FIND", 35: "EXTRACT", 36: "DATA.DELETE", 37: "SET.DATABASE", 38: "SET.CRITERIA", 39: "SORT", 40: "DATA.SERIES", 41: "TABLE", 42: "FORMAT.NUMBER", 43: "ALIGNMENT", 44: "STYLE", 45: "BORDER", 46: "CELL.PROTECTION", 47: "COLUMN.WIDTH", 48: "UNDO", 49: "CUT", 50: "COPY", 51: "PASTE", 52: "CLEAR", 53: "PASTE.SPECIAL", 54: "EDIT.DELETE", 55: "INSERT", 56: "FILL.RIGHT", 57: "FILL.DOWN", 61: "DEFINE.NAME", 62: "CREATE.NAMES", 63: "FORMULA.GOTO", 64: "FORMULA.FIND", 65: "SELECT.LAST.CELL", 66: "SHOW.ACTIVE.CELL", 67: "GALLERY.AREA", 68: "GALLERY.BAR", 69: "GALLERY.COLUMN", 70: "GALLERY.LINE", 71: "GALLERY.PIE", 72: "GALLERY.SCATTER", 73: "COMBINATION", 74: "PREFERRED", 75: "ADD.OVERLAY", 76: "GRIDLINES", 77: "SET.PREFERRED", 78: "AXES", 79: "LEGEND", 80: "ATTACH.TEXT", 81: "ADD.ARROW", 82: "SELECT.CHART", 83: "SELECT.PLOT.AREA", 84: "PATTERNS", 85: "MAIN.CHART", 86: "OVERLAY", 87: "SCALE", 88: "FORMAT.LEGEND", 89: "FORMAT.TEXT", 90: "EDIT.REPEAT", 91: "PARSE", 92: "JUSTIFY", 93: "HIDE", 94: "UNHIDE", 95: "WORKSPACE", 96: "FORMULA", 97: "FORMULA.FILL", 98: "FORMULA.ARRAY", 99: "DATA.FIND.NEXT", 100: "DATA.FIND.PREV", 101: "FORMULA.FIND.NEXT", 102: "FORMULA.FIND.PREV", 103: "ACTIVATE", 104: "ACTIVATE.NEXT", 105: "ACTIVATE.PREV", 106: "UNLOCKED.NEXT", 107: "UNLOCKED.PREV", 108: "COPY.PICTURE", 109: "SELECT", 110: "DELETE.NAME", 111: "DELETE.FORMAT", 112: "VLINE", 113: "HLINE", 114: "VPAGE", 115: "HPAGE", 116: "VSCROLL", 117: "HSCROLL", 118: "ALERT", 119: "NEW", 120: "CANCEL.COPY", 121: "SHOW.CLIPBOARD", 122: "MESSAGE", 124: "PASTE.LINK", 125: "APP.ACTIVATE", 126: "DELETE.ARROW", 127: "ROW.HEIGHT", 128: "FORMAT.MOVE", 129: "FORMAT.SIZE", 130: "FORMULA.REPLACE", 131: "SEND.KEYS", 132: "SELECT.SPECIAL", 133: "APPLY.NAMES", 134: "REPLACE.FONT", 135: "FREEZE.PANES", 136: "SHOW.INFO", 137: "SPLIT", 138: "ON.WINDOW", 139: "ON.DATA", 140: "DISABLE.INPUT", 142: "OUTLINE", 143: "LIST.NAMES", 144: "FILE.CLOSE", 145: "SAVE.WORKBOOK", 146: "DATA.FORM", 147: "COPY.CHART", 148: "ON.TIME", 149: "WAIT", 150: "FORMAT.FONT", 151: "FILL.UP", 152: "FILL.LEFT", 153: "DELETE.OVERLAY", 155: "SHORT.MENUS", 159: "SET.UPDATE.STATUS", 161: "COLOR.PALETTE", 162: "DELETE.STYLE", 163: "WINDOW.RESTORE", 164: "WINDOW.MAXIMIZE", 166: "CHANGE.LINK", 167: "CALCULATE.DOCUMENT", 168: "ON.KEY", 169: "APP.RESTORE", 170: "APP.MOVE", 171: "APP.SIZE", 172: "APP.MINIMIZE", 173: "APP.MAXIMIZE", 174: "BRING.TO.FRONT", 175: "SEND.TO.BACK", 185: "MAIN.CHART.TYPE", 186: "OVERLAY.CHART.TYPE", 187: "SELECT.END", 188: "OPEN.MAIL", 189: "SEND.MAIL", 190: "STANDARD.FONT", 191: "CONSOLIDATE", 192: "SORT.SPECIAL", 193: "GALLERY.3D.AREA", 194: "GALLERY.3D.COLUMN", 195: "GALLERY.3D.LINE", 196: "GALLERY.3D.PIE", 197: "VIEW.3D", 198: "GOAL.SEEK", 199: "WORKGROUP", 200: "FILL.GROUP", 201: "UPDATE.LINK", 202: "PROMOTE", 203: "DEMOTE", 204: "SHOW.DETAIL", 206: "UNGROUP", 207: "OBJECT.PROPERTIES", 208: "SAVE.NEW.OBJECT", 209: "SHARE", 210: "SHARE.NAME", 211: "DUPLICATE", 212: "APPLY.STYLE", 213: "ASSIGN.TO.OBJECT", 214: "OBJECT.PROTECTION", 215: "HIDE.OBJECT", 216: "SET.EXTRACT", 217: "CREATE.PUBLISHER", 218: "SUBSCRIBE.TO", 219: "ATTRIBUTES", 220: "SHOW.TOOLBAR", 222: "PRINT.PREVIEW", 223: "EDIT.COLOR", 224: "SHOW.LEVELS", 225: "FORMAT.MAIN", 226: "FORMAT.OVERLAY", 227: "ON.RECALC", 228: "EDIT.SERIES", 229: "DEFINE.STYLE", 240: "LINE.PRINT", 243: "ENTER.DATA", 249: "GALLERY.RADAR", 250: "MERGE.STYLES", 251: "EDITION.OPTIONS", 252: "PASTE.PICTURE", 253: "PASTE.PICTURE.LINK", 254: "SPELLING", 256: "ZOOM", 259: "INSERT.OBJECT", 260: "WINDOW.MINIMIZE", 265: "SOUND.NOTE", 266: "SOUND.PLAY", 267: "FORMAT.SHAPE", 268: "EXTEND.POLYGON", 269: "FORMAT.AUTO", 272: "GALLERY.3D.BAR", 273: "GALLERY.3D.SURFACE", 274: "FILL.AUTO", 276: "CUSTOMIZE.TOOLBAR", 277: "ADD.TOOL", 278: "EDIT.OBJECT", 279: "ON.DOUBLECLICK", 280: "ON.ENTRY", 281: "WORKBOOK.ADD", 282: "WORKBOOK.MOVE", 283: "WORKBOOK.COPY", 284: "WORKBOOK.OPTIONS", 285: "SAVE.WORKSPACE", 288: "CHART.WIZARD", 289: "DELETE.TOOL", 290: "MOVE.TOOL", 291: "WORKBOOK.SELECT", 292: "WORKBOOK.ACTIVATE", 293: "ASSIGN.TO.TOOL", 295: "COPY.TOOL", 296: "RESET.TOOL", 297: "CONSTRAIN.NUMERIC", 298: "PASTE.TOOL", 302: "WORKBOOK.NEW", 305: "SCENARIO.CELLS", 306: "SCENARIO.DELETE", 307: "SCENARIO.ADD", 308: "SCENARIO.EDIT", 309: "SCENARIO.SHOW", 310: "SCENARIO.SHOW.NEXT", 311: "SCENARIO.SUMMARY", 312: "PIVOT.TABLE.WIZARD", 313: "PIVOT.FIELD.PROPERTIES", 314: "PIVOT.FIELD", 315: "PIVOT.ITEM", 316: "PIVOT.ADD.FIELDS", 318: "OPTIONS.CALCULATION", 319: "OPTIONS.EDIT", 320: "OPTIONS.VIEW", 321: "ADDIN.MANAGER", 322: "MENU.EDITOR", 323: "ATTACH.TOOLBARS", 324: "VBAActivate", 325: "OPTIONS.CHART", 328: "VBA.INSERT.FILE", 330: "VBA.PROCEDURE.DEFINITION", 336: "ROUTING.SLIP", 338: "ROUTE.DOCUMENT", 339: "MAIL.LOGON", 342: "INSERT.PICTURE", 343: "EDIT.TOOL", 344: "GALLERY.DOUGHNUT", 350: "CHART.TREND", 352: "PIVOT.ITEM.PROPERTIES", 354: "WORKBOOK.INSERT", 355: "OPTIONS.TRANSITION", 356: "OPTIONS.GENERAL", 370: "FILTER.ADVANCED", 373: "MAIL.ADD.MAILER", 374: "MAIL.DELETE.MAILER", 375: "MAIL.REPLY", 376: "MAIL.REPLY.ALL", 377: "MAIL.FORWARD", 378: "MAIL.NEXT.LETTER", 379: "DATA.LABEL", 380: "INSERT.TITLE", 381: "FONT.PROPERTIES", 382: "MACRO.OPTIONS", 383: "WORKBOOK.HIDE", 384: "WORKBOOK.UNHIDE", 385: "WORKBOOK.DELETE", 386: "WORKBOOK.NAME", 388: "GALLERY.CUSTOM", 390: "ADD.CHART.AUTOFORMAT", 391: "DELETE.CHART.AUTOFORMAT", 392: "CHART.ADD.DATA", 393: "AUTO.OUTLINE", 394: "TAB.ORDER", 395: "SHOW.DIALOG", 396: "SELECT.ALL", 397: "UNGROUP.SHEETS", 398: "SUBTOTAL.CREATE", 399: "SUBTOTAL.REMOVE", 400: "RENAME.OBJECT", 412: "WORKBOOK.SCROLL", 413: "WORKBOOK.NEXT", 414: "WORKBOOK.PREV", 415: "WORKBOOK.TAB.SPLIT", 416: "FULL.SCREEN", 417: "WORKBOOK.PROTECT", 420: "SCROLLBAR.PROPERTIES", 421: "PIVOT.SHOW.PAGES", 422: "TEXT.TO.COLUMNS", 423: "FORMAT.CHARTTYPE", 424: "LINK.FORMAT", 425: "TRACER.DISPLAY", 430: "TRACER.NAVIGATE", 431: "TRACER.CLEAR", 432: "TRACER.ERROR", 433: "PIVOT.FIELD.GROUP", 434: "PIVOT.FIELD.UNGROUP", 435: "CHECKBOX.PROPERTIES", 436: "LABEL.PROPERTIES", 437: "LISTBOX.PROPERTIES", 438: "EDITBOX.PROPERTIES", 439: "PIVOT.REFRESH", 440: "LINK.COMBO", 441: "OPEN.TEXT", 442: "HIDE.DIALOG", 443: "SET.DIALOG.FOCUS", 444: "ENABLE.OBJECT", 445: "PUSHBUTTON.PROPERTIES", 446: "SET.DIALOG.DEFAULT", 447: "FILTER", 448: "FILTER.SHOW.ALL", 449: "CLEAR.OUTLINE", 450: "FUNCTION.WIZARD", 451: "ADD.LIST.ITEM", 452: "SET.LIST.ITEM", 453: "REMOVE.LIST.ITEM", 454: "SELECT.LIST.ITEM", 455: "SET.CONTROL.VALUE", 456: "SAVE.COPY.AS", 458: "OPTIONS.LISTS.ADD", 459: "OPTIONS.LISTS.DELETE", 460: "SERIES.AXES", 461: "SERIES.X", 462: "SERIES.Y", 463: "ERRORBAR.X", 464: "ERRORBAR.Y", 465: "FORMAT.CHART", 466: "SERIES.ORDER", 467: "MAIL.LOGOFF", 468: "CLEAR.ROUTING.SLIP", 469: "APP.ACTIVATE.MICROSOFT", 470: "MAIL.EDIT.MAILER", 471: "ON.SHEET", 472: "STANDARD.WIDTH", 473: "SCENARIO.MERGE", 474: "SUMMARY.INFO", 475: "FIND.FILE", 476: "ACTIVE.CELL.FONT", 477: "ENABLE.TIPWIZARD", 478: "VBA.MAKE.ADDIN", 480: "INSERTDATATABLE", 481: "WORKGROUP.OPTIONS", 482: "MAIL.SEND.MAILER", 485: "AUTOCORRECT", 489: "POST.DOCUMENT", 491: "PICKLIST", 493: "VIEW.SHOW", 494: "VIEW.DEFINE", 495: "VIEW.DELETE", 509: "SHEET.BACKGROUND", 510: "INSERT.MAP.OBJECT", 511: "OPTIONS.MENONO", 517: "MSOCHECKS", 518: "NORMAL", 519: "LAYOUT", 520: "RM.PRINT.AREA", 521: "CLEAR.PRINT.AREA", 522: "ADD.PRINT.AREA", 523: "MOVE.BRK", 545: "HIDECURR.NOTE", 546: "HIDEALL.NOTES", 547: "DELETE.NOTE", 548: "TRAVERSE.NOTES", 549: "ACTIVATE.NOTES", 620: "PROTECT.REVISIONS", 621: "UNPROTECT.REVISIONS", 647: "OPTIONS.ME", 653: "WEB.PUBLISH", 667: "NEWWEBQUERY", 673: "PIVOT.TABLE.CHART", 753: "OPTIONS.SAVE", 755: "OPTIONS.SPELL", 808: "HIDEALL.INKANNOTS" };
    var zu = {
        0: "COUNT",
        1: "IF",
        2: "ISNA",
        3: "ISERROR",
        4: "SUM",
        5: "AVERAGE",
        6: "MIN",
        7: "MAX",
        8: "ROW",
        9: "COLUMN",
        10: "NA",
        11: "NPV",
        12: "STDEV",
        13: "DOLLAR",
        14: "FIXED",
        15: "SIN",
        16: "COS",
        17: "TAN",
        18: "ATAN",
        19: "PI",
        20: "SQRT",
        21: "EXP",
        22: "LN",
        23: "LOG10",
        24: "ABS",
        25: "INT",
        26: "SIGN",
        27: "ROUND",
        28: "LOOKUP",
        29: "INDEX",
        30: "REPT",
        31: "MID",
        32: "LEN",
        33: "VALUE",
        34: "TRUE",
        35: "FALSE",
        36: "AND",
        37: "OR",
        38: "NOT",
        39: "MOD",
        40: "DCOUNT",
        41: "DSUM",
        42: "DAVERAGE",
        43: "DMIN",
        44: "DMAX",
        45: "DSTDEV",
        46: "VAR",
        47: "DVAR",
        48: "TEXT",
        49: "LINEST",
        50: "TREND",
        51: "LOGEST",
        52: "GROWTH",
        53: "GOTO",
        54: "HALT",
        55: "RETURN",
        56: "PV",
        57: "FV",
        58: "NPER",
        59: "PMT",
        60: "RATE",
        61: "MIRR",
        62: "IRR",
        63: "RAND",
        64: "MATCH",
        65: "DATE",
        66: "TIME",
        67: "DAY",
        68: "MONTH",
        69: "YEAR",
        70: "WEEKDAY",
        71: "HOUR",
        72: "MINUTE",
        73: "SECOND",
        74: "NOW",
        75: "AREAS",
        76: "ROWS",
        77: "COLUMNS",
        78: "OFFSET",
        79: "ABSREF",
        80: "RELREF",
        81: "ARGUMENT",
        82: "SEARCH",
        83: "TRANSPOSE",
        84: "ERROR",
        85: "STEP",
        86: "TYPE",
        87: "ECHO",
        88: "SET.NAME",
        89: "CALLER",
        90: "DEREF",
        91: "WINDOWS",
        92: "SERIES",
        93: "DOCUMENTS",
        94: "ACTIVE.CELL",
        95: "SELECTION",
        96: "RESULT",
        97: "ATAN2",
        98: "ASIN",
        99: "ACOS",
        100: "CHOOSE",
        101: "HLOOKUP",
        102: "VLOOKUP",
        103: "LINKS",
        104: "INPUT",
        105: "ISREF",
        106: "GET.FORMULA",
        107: "GET.NAME",
        108: "SET.VALUE",
        109: "LOG",
        110: "EXEC",
        111: "CHAR",
        112: "LOWER",
        113: "UPPER",
        114: "PROPER",
        115: "LEFT",
        116: "RIGHT",
        117: "EXACT",
        118: "TRIM",
        119: "REPLACE",
        120: "SUBSTITUTE",
        121: "CODE",
        122: "NAMES",
        123: "DIRECTORY",
        124: "FIND",
        125: "CELL",
        126: "ISERR",
        127: "ISTEXT",
        128: "ISNUMBER",
        129: "ISBLANK",
        130: "T",
        131: "N",
        132: "FOPEN",
        133: "FCLOSE",
        134: "FSIZE",
        135: "FREADLN",
        136: "FREAD",
        137: "FWRITELN",
        138: "FWRITE",
        139: "FPOS",
        140: "DATEVALUE",
        141: "TIMEVALUE",
        142: "SLN",
        143: "SYD",
        144: "DDB",
        145: "GET.DEF",
        146: "REFTEXT",
        147: "TEXTREF",
        148: "INDIRECT",
        149: "REGISTER",
        150: "CALL",
        151: "ADD.BAR",
        152: "ADD.MENU",
        153: "ADD.COMMAND",
        154: "ENABLE.COMMAND",
        155: "CHECK.COMMAND",
        156: "RENAME.COMMAND",
        157: "SHOW.BAR",
        158: "DELETE.MENU",
        159: "DELETE.COMMAND",
        160: "GET.CHART.ITEM",
        161: "DIALOG.BOX",
        162: "CLEAN",
        163: "MDETERM",
        164: "MINVERSE",
        165: "MMULT",
        166: "FILES",
        167: "IPMT",
        168: "PPMT",
        169: "COUNTA",
        170: "CANCEL.KEY",
        171: "FOR",
        172: "WHILE",
        173: "BREAK",
        174: "NEXT",
        175: "INITIATE",
        176: "REQUEST",
        177: "POKE",
        178: "EXECUTE",
        179: "TERMINATE",
        180: "RESTART",
        181: "HELP",
        182: "GET.BAR",
        183: "PRODUCT",
        184: "FACT",
        185: "GET.CELL",
        186: "GET.WORKSPACE",
        187: "GET.WINDOW",
        188: "GET.DOCUMENT",
        189: "DPRODUCT",
        190: "ISNONTEXT",
        191: "GET.NOTE",
        192: "NOTE",
        193: "STDEVP",
        194: "VARP",
        195: "DSTDEVP",
        196: "DVARP",
        197: "TRUNC",
        198: "ISLOGICAL",
        199: "DCOUNTA",
        200: "DELETE.BAR",
        201: "UNREGISTER",
        204: "USDOLLAR",
        205: "FINDB",
        206: "SEARCHB",
        207: "REPLACEB",
        208: "LEFTB",
        209: "RIGHTB",
        210: "MIDB",
        211: "LENB",
        212: "ROUNDUP",
        213: "ROUNDDOWN",
        214: "ASC",
        215: "DBCS",
        216: "RANK",
        219: "ADDRESS",
        220: "DAYS360",
        221: "TODAY",
        222: "VDB",
        223: "ELSE",
        224: "ELSE.IF",
        225: "END.IF",
        226: "FOR.CELL",
        227: "MEDIAN",
        228: "SUMPRODUCT",
        229: "SINH",
        230: "COSH",
        231: "TANH",
        232: "ASINH",
        233: "ACOSH",
        234: "ATANH",
        235: "DGET",
        236: "CREATE.OBJECT",
        237: "VOLATILE",
        238: "LAST.ERROR",
        239: "CUSTOM.UNDO",
        240: "CUSTOM.REPEAT",
        241: "FORMULA.CONVERT",
        242: "GET.LINK.INFO",
        243: "TEXT.BOX",
        244: "INFO",
        245: "GROUP",
        246: "GET.OBJECT",
        247: "DB",
        248: "PAUSE",
        251: "RESUME",
        252: "FREQUENCY",
        253: "ADD.TOOLBAR",
        254: "DELETE.TOOLBAR",
        255: "User",
        256: "RESET.TOOLBAR",
        257: "EVALUATE",
        258: "GET.TOOLBAR",
        259: "GET.TOOL",
        260: "SPELLING.CHECK",
        261: "ERROR.TYPE",
        262: "APP.TITLE",
        263: "WINDOW.TITLE",
        264: "SAVE.TOOLBAR",
        265: "ENABLE.TOOL",
        266: "PRESS.TOOL",
        267: "REGISTER.ID",
        268: "GET.WORKBOOK",
        269: "AVEDEV",
        270: "BETADIST",
        271: "GAMMALN",
        272: "BETAINV",
        273: "BINOMDIST",
        274: "CHIDIST",
        275: "CHIINV",
        276: "COMBIN",
        277: "CONFIDENCE",
        278: "CRITBINOM",
        279: "EVEN",
        280: "EXPONDIST",
        281: "FDIST",
        282: "FINV",
        283: "FISHER",
        284: "FISHERINV",
        285: "FLOOR",
        286: "GAMMADIST",
        287: "GAMMAINV",
        288: "CEILING",
        289: "HYPGEOMDIST",
        290: "LOGNORMDIST",
        291: "LOGINV",
        292: "NEGBINOMDIST",
        293: "NORMDIST",
        294: "NORMSDIST",
        295: "NORMINV",
        296: "NORMSINV",
        297: "STANDARDIZE",
        298: "ODD",
        299: "PERMUT",
        300: "POISSON",
        301: "TDIST",
        302: "WEIBULL",
        303: "SUMXMY2",
        304: "SUMX2MY2",
        305: "SUMX2PY2",
        306: "CHITEST",
        307: "CORREL",
        308: "COVAR",
        309: "FORECAST",
        310: "FTEST",
        311: "INTERCEPT",
        312: "PEARSON",
        313: "RSQ",
        314: "STEYX",
        315: "SLOPE",
        316: "TTEST",
        317: "PROB",
        318: "DEVSQ",
        319: "GEOMEAN",
        320: "HARMEAN",
        321: "SUMSQ",
        322: "KURT",
        323: "SKEW",
        324: "ZTEST",
        325: "LARGE",
        326: "SMALL",
        327: "QUARTILE",
        328: "PERCENTILE",
        329: "PERCENTRANK",
        330: "MODE",
        331: "TRIMMEAN",
        332: "TINV",
        334: "MOVIE.COMMAND",
        335: "GET.MOVIE",
        336: "CONCATENATE",
        337: "POWER",
        338: "PIVOT.ADD.DATA",
        339: "GET.PIVOT.TABLE",
        340: "GET.PIVOT.FIELD",
        341: "GET.PIVOT.ITEM",
        342: "RADIANS",
        343: "DEGREES",
        344: "SUBTOTAL",
        345: "SUMIF",
        346: "COUNTIF",
        347: "COUNTBLANK",
        348: "SCENARIO.GET",
        349: "OPTIONS.LISTS.GET",
        350: "ISPMT",
        351: "DATEDIF",
        352: "DATESTRING",
        353: "NUMBERSTRING",
        354: "ROMAN",
        355: "OPEN.DIALOG",
        356: "SAVE.DIALOG",
        357: "VIEW.GET",
        358: "GETPIVOTDATA",
        359: "HYPERLINK",
        360: "PHONETIC",
        361: "AVERAGEA",
        362: "MAXA",
        363: "MINA",
        364: "STDEVPA",
        365: "VARPA",
        366: "STDEVA",
        367: "VARA",
        368: "BAHTTEXT",
        369: "THAIDAYOFWEEK",
        370: "THAIDIGIT",
        371: "THAIMONTHOFYEAR",
        372: "THAINUMSOUND",
        373: "THAINUMSTRING",
        374: "THAISTRINGLENGTH",
        375: "ISTHAIDIGIT",
        376: "ROUNDBAHTDOWN",
        377: "ROUNDBAHTUP",
        378: "THAIYEAR",
        379: "RTD",
        380: "CUBEVALUE",
        381: "CUBEMEMBER",
        382: "CUBEMEMBERPROPERTY",
        383: "CUBERANKEDMEMBER",
        384: "HEX2BIN",
        385: "HEX2DEC",
        386: "HEX2OCT",
        387: "DEC2BIN",
        388: "DEC2HEX",
        389: "DEC2OCT",
        390: "OCT2BIN",
        391: "OCT2HEX",
        392: "OCT2DEC",
        393: "BIN2DEC",
        394: "BIN2OCT",
        395: "BIN2HEX",
        396: "IMSUB",
        397: "IMDIV",
        398: "IMPOWER",
        399: "IMABS",
        400: "IMSQRT",
        401: "IMLN",
        402: "IMLOG2",
        403: "IMLOG10",
        404: "IMSIN",
        405: "IMCOS",
        406: "IMEXP",
        407: "IMARGUMENT",
        408: "IMCONJUGATE",
        409: "IMAGINARY",
        410: "IMREAL",
        411: "COMPLEX",
        412: "IMSUM",
        413: "IMPRODUCT",
        414: "SERIESSUM",
        415: "FACTDOUBLE",
        416: "SQRTPI",
        417: "QUOTIENT",
        418: "DELTA",
        419: "GESTEP",
        420: "ISEVEN",
        421: "ISODD",
        422: "MROUND",
        423: "ERF",
        424: "ERFC",
        425: "BESSELJ",
        426: "BESSELK",
        427: "BESSELY",
        428: "BESSELI",
        429: "XIRR",
        430: "XNPV",
        431: "PRICEMAT",
        432: "YIELDMAT",
        433: "INTRATE",
        434: "RECEIVED",
        435: "DISC",
        436: "PRICEDISC",
        437: "YIELDDISC",
        438: "TBILLEQ",
        439: "TBILLPRICE",
        440: "TBILLYIELD",
        441: "PRICE",
        442: "YIELD",
        443: "DOLLARDE",
        444: "DOLLARFR",
        445: "NOMINAL",
        446: "EFFECT",
        447: "CUMPRINC",
        448: "CUMIPMT",
        449: "EDATE",
        450: "EOMONTH",
        451: "YEARFRAC",
        452: "COUPDAYBS",
        453: "COUPDAYS",
        454: "COUPDAYSNC",
        455: "COUPNCD",
        456: "COUPNUM",
        457: "COUPPCD",
        458: "DURATION",
        459: "MDURATION",
        460: "ODDLPRICE",
        461: "ODDLYIELD",
        462: "ODDFPRICE",
        463: "ODDFYIELD",
        464: "RANDBETWEEN",
        465: "WEEKNUM",
        466: "AMORDEGRC",
        467: "AMORLINC",
        468: "CONVERT",
        724: "SHEETJS",
        469: "ACCRINT",
        470: "ACCRINTM",
        471: "WORKDAY",
        472: "NETWORKDAYS",
        473: "GCD",
        474: "MULTINOMIAL",
        475: "LCM",
        476: "FVSCHEDULE",
        477: "CUBEKPIMEMBER",
        478: "CUBESET",
        479: "CUBESETCOUNT",
        480: "IFERROR",
        481: "COUNTIFS",
        482: "SUMIFS",
        483: "AVERAGEIF",
        484: "AVERAGEIFS"
    };
    var Xu = { 2: 1, 3: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 0, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 26: 1, 27: 2, 30: 2, 31: 3, 32: 1, 33: 1, 38: 1, 39: 2, 40: 3, 41: 3, 42: 3, 43: 3, 44: 3, 45: 3, 47: 3, 48: 2, 53: 1, 61: 3, 65: 3, 66: 3, 67: 1, 68: 1, 69: 1, 70: 1, 71: 1, 72: 1, 73: 1, 75: 1, 76: 1, 77: 1, 79: 2, 80: 2, 83: 1, 85: 0, 86: 1, 90: 1, 97: 2, 98: 1, 99: 1, 101: 3, 102: 3, 105: 1, 111: 1, 112: 1, 113: 1, 114: 1, 117: 2, 118: 1, 119: 4, 121: 1, 126: 1, 127: 1, 128: 1, 129: 1, 130: 1, 131: 1, 133: 1, 134: 1, 135: 1, 136: 2, 137: 2, 138: 2, 140: 1, 141: 1, 142: 3, 143: 4, 144: 4, 162: 1, 163: 1, 164: 1, 165: 2, 172: 1, 175: 2, 176: 2, 177: 3, 178: 2, 179: 1, 184: 1, 189: 3, 190: 1, 195: 3, 196: 3, 197: 1, 198: 1, 199: 3, 201: 1, 207: 4, 210: 3, 211: 1, 212: 2, 213: 2, 214: 1, 215: 1, 229: 1, 230: 1, 231: 1, 232: 1, 233: 1, 234: 1, 235: 3, 244: 1, 247: 4, 252: 2, 257: 1, 261: 1, 271: 1, 273: 4, 274: 2, 275: 2, 276: 2, 277: 3, 278: 3, 279: 1, 280: 3, 281: 3, 282: 3, 283: 1, 284: 1, 285: 2, 286: 4, 287: 3, 288: 2, 289: 4, 290: 3, 291: 3, 292: 3, 293: 4, 294: 1, 295: 3, 296: 1, 297: 3, 298: 1, 299: 2, 300: 3, 301: 3, 302: 4, 303: 2, 304: 2, 305: 2, 306: 2, 307: 2, 308: 2, 309: 3, 310: 2, 311: 2, 312: 2, 313: 2, 314: 2, 315: 2, 316: 4, 325: 2, 326: 2, 327: 2, 328: 2, 331: 2, 332: 2, 337: 2, 342: 1, 343: 1, 346: 2, 347: 1, 350: 4, 351: 3, 352: 1, 353: 2, 360: 1, 368: 1, 369: 1, 370: 1, 371: 1, 372: 1, 373: 1, 374: 1, 375: 1, 376: 1, 377: 1, 378: 1, 382: 3, 385: 1, 392: 1, 393: 1, 396: 2, 397: 2, 398: 2, 399: 1, 400: 1, 401: 1, 402: 1, 403: 1, 404: 1, 405: 1, 406: 1, 407: 1, 408: 1, 409: 1, 410: 1, 414: 4, 415: 1, 416: 1, 417: 2, 420: 1, 421: 1, 422: 2, 424: 1, 425: 2, 426: 2, 427: 2, 428: 2, 430: 3, 438: 3, 439: 3, 440: 3, 443: 2, 444: 2, 445: 2, 446: 2, 447: 6, 448: 6, 449: 2, 450: 2, 464: 2, 468: 3, 476: 2, 479: 1, 480: 2, 65535: 0 };
    var Gu = { "_xlfn.ACOT": "ACOT", "_xlfn.ACOTH": "ACOTH", "_xlfn.AGGREGATE": "AGGREGATE", "_xlfn.ARABIC": "ARABIC", "_xlfn.AVERAGEIF": "AVERAGEIF", "_xlfn.AVERAGEIFS": "AVERAGEIFS", "_xlfn.BASE": "BASE", "_xlfn.BETA.DIST": "BETA.DIST", "_xlfn.BETA.INV": "BETA.INV", "_xlfn.BINOM.DIST": "BINOM.DIST", "_xlfn.BINOM.DIST.RANGE": "BINOM.DIST.RANGE", "_xlfn.BINOM.INV": "BINOM.INV", "_xlfn.BITAND": "BITAND", "_xlfn.BITLSHIFT": "BITLSHIFT", "_xlfn.BITOR": "BITOR", "_xlfn.BITRSHIFT": "BITRSHIFT", "_xlfn.BITXOR": "BITXOR", "_xlfn.CEILING.MATH": "CEILING.MATH", "_xlfn.CEILING.PRECISE": "CEILING.PRECISE", "_xlfn.CHISQ.DIST": "CHISQ.DIST", "_xlfn.CHISQ.DIST.RT": "CHISQ.DIST.RT", "_xlfn.CHISQ.INV": "CHISQ.INV", "_xlfn.CHISQ.INV.RT": "CHISQ.INV.RT", "_xlfn.CHISQ.TEST": "CHISQ.TEST", "_xlfn.COMBINA": "COMBINA", "_xlfn.CONCAT": "CONCAT", "_xlfn.CONFIDENCE.NORM": "CONFIDENCE.NORM", "_xlfn.CONFIDENCE.T": "CONFIDENCE.T", "_xlfn.COT": "COT", "_xlfn.COTH": "COTH", "_xlfn.COUNTIFS": "COUNTIFS", "_xlfn.COVARIANCE.P": "COVARIANCE.P", "_xlfn.COVARIANCE.S": "COVARIANCE.S", "_xlfn.CSC": "CSC", "_xlfn.CSCH": "CSCH", "_xlfn.DAYS": "DAYS", "_xlfn.DECIMAL": "DECIMAL", "_xlfn.ECMA.CEILING": "ECMA.CEILING", "_xlfn.ERF.PRECISE": "ERF.PRECISE", "_xlfn.ERFC.PRECISE": "ERFC.PRECISE", "_xlfn.EXPON.DIST": "EXPON.DIST", "_xlfn.F.DIST": "F.DIST", "_xlfn.F.DIST.RT": "F.DIST.RT", "_xlfn.F.INV": "F.INV", "_xlfn.F.INV.RT": "F.INV.RT", "_xlfn.F.TEST": "F.TEST", "_xlfn.FILTERXML": "FILTERXML", "_xlfn.FLOOR.MATH": "FLOOR.MATH", "_xlfn.FLOOR.PRECISE": "FLOOR.PRECISE", "_xlfn.FORECAST.ETS": "FORECAST.ETS", "_xlfn.FORECAST.ETS.CONFINT": "FORECAST.ETS.CONFINT", "_xlfn.FORECAST.ETS.SEASONALITY": "FORECAST.ETS.SEASONALITY", "_xlfn.FORECAST.ETS.STAT": "FORECAST.ETS.STAT", "_xlfn.FORECAST.LINEAR": "FORECAST.LINEAR", "_xlfn.FORMULATEXT": "FORMULATEXT", "_xlfn.GAMMA": "GAMMA", "_xlfn.GAMMA.DIST": "GAMMA.DIST", "_xlfn.GAMMA.INV": "GAMMA.INV", "_xlfn.GAMMALN.PRECISE": "GAMMALN.PRECISE", "_xlfn.GAUSS": "GAUSS", "_xlfn.HYPGEOM.DIST": "HYPGEOM.DIST", "_xlfn.IFERROR": "IFERROR", "_xlfn.IFNA": "IFNA", "_xlfn.IMCOSH": "IMCOSH", "_xlfn.IMCOT": "IMCOT", "_xlfn.IMCSC": "IMCSC", "_xlfn.IMCSCH": "IMCSCH", "_xlfn.IMSEC": "IMSEC", "_xlfn.IMSECH": "IMSECH", "_xlfn.IMSINH": "IMSINH", "_xlfn.IMTAN": "IMTAN", "_xlfn.ISFORMULA": "ISFORMULA", "_xlfn.ISO.CEILING": "ISO.CEILING", "_xlfn.ISOWEEKNUM": "ISOWEEKNUM", "_xlfn.LOGNORM.DIST": "LOGNORM.DIST", "_xlfn.LOGNORM.INV": "LOGNORM.INV", "_xlfn.MAXIFS": "MAXIFS", "_xlfn.MINIFS": "MINIFS", "_xlfn.MODE.MULT": "MODE.MULT", "_xlfn.MODE.SNGL": "MODE.SNGL", "_xlfn.MUNIT": "MUNIT", "_xlfn.NEGBINOM.DIST": "NEGBINOM.DIST", "_xlfn.NETWORKDAYS.INTL": "NETWORKDAYS.INTL", "_xlfn.NIGBINOM": "NIGBINOM", "_xlfn.NORM.DIST": "NORM.DIST", "_xlfn.NORM.INV": "NORM.INV", "_xlfn.NORM.S.DIST": "NORM.S.DIST", "_xlfn.NORM.S.INV": "NORM.S.INV", "_xlfn.NUMBERVALUE": "NUMBERVALUE", "_xlfn.PDURATION": "PDURATION", "_xlfn.PERCENTILE.EXC": "PERCENTILE.EXC", "_xlfn.PERCENTILE.INC": "PERCENTILE.INC", "_xlfn.PERCENTRANK.EXC": "PERCENTRANK.EXC", "_xlfn.PERCENTRANK.INC": "PERCENTRANK.INC", "_xlfn.PERMUTATIONA": "PERMUTATIONA", "_xlfn.PHI": "PHI", "_xlfn.POISSON.DIST": "POISSON.DIST", "_xlfn.QUARTILE.EXC": "QUARTILE.EXC", "_xlfn.QUARTILE.INC": "QUARTILE.INC", "_xlfn.QUERYSTRING": "QUERYSTRING", "_xlfn.RANK.AVG": "RANK.AVG", "_xlfn.RANK.EQ": "RANK.EQ", "_xlfn.RRI": "RRI", "_xlfn.SEC": "SEC", "_xlfn.SECH": "SECH", "_xlfn.SHEET": "SHEET", "_xlfn.SHEETS": "SHEETS", "_xlfn.SKEW.P": "SKEW.P", "_xlfn.STDEV.P": "STDEV.P", "_xlfn.STDEV.S": "STDEV.S", "_xlfn.SUMIFS": "SUMIFS", "_xlfn.T.DIST": "T.DIST", "_xlfn.T.DIST.2T": "T.DIST.2T", "_xlfn.T.DIST.RT": "T.DIST.RT", "_xlfn.T.INV": "T.INV", "_xlfn.T.INV.2T": "T.INV.2T", "_xlfn.T.TEST": "T.TEST", "_xlfn.TEXTJOIN": "TEXTJOIN", "_xlfn.UNICHAR": "UNICHAR", "_xlfn.UNICODE": "UNICODE", "_xlfn.VAR.P": "VAR.P", "_xlfn.VAR.S": "VAR.S", "_xlfn.WEBSERVICE": "WEBSERVICE", "_xlfn.WEIBULL.DIST": "WEIBULL.DIST", "_xlfn.WORKDAY.INTL": "WORKDAY.INTL", "_xlfn.XOR": "XOR", "_xlfn.Z.TEST": "Z.TEST" };

    function ju(e) { if (e.substr(0, 3) == "of:") e = e.substr(3); if (e.charCodeAt(0) == 61) { e = e.substr(1); if (e.charCodeAt(0) == 61) e = e.substr(1) } e = e.replace(/COM\.MICROSOFT\./g, "");
        e = e.replace(/\[((?:\.[A-Z]+[0-9]+)(?::\.[A-Z]+[0-9]+)?)\]/g, function(e, r) { return r.replace(/\./g, "") });
        e = e.replace(/\[.(#[A-Z]*[?!])\]/g, "$1"); return e.replace(/[;~]/g, ",").replace(/\|/g, ";") }

    function Ku(e) { var r = "of:=" + e.replace(Fl, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":"); return r.replace(/;/g, "|").replace(/,/g, ";") }

    function Yu(e) { var r = e.split(":"); var t = r[0].split(".")[0]; return [t, r[0].split(".")[1] + (r.length > 1 ? ":" + (r[1].split(".")[1] || r[1].split(".")[0]) : "")] }

    function $u(e) { return e.replace(/\./, "!") }
    var Zu = {};
    var Qu = {};
    _a.WS = ["http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet", "http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet"];

    function Ju(e, r) { for (var t = 0, a = e.length; t < a; ++t)
            if (e[t].t === r) { e.Count++; return t }
        e[a] = { t: r };
        e.Count++;
        e.Unique++; return a }

    function qu(e, r) { var t = { min: e + 1, max: e + 1 }; var a = -1; if (r.MDW) Ho = r.MDW; if (r.width != null) t.customWidth = 1;
        else if (r.wpx != null) a = Vo(r.wpx);
        else if (r.wch != null) a = r.wch; if (a > -1) { t.width = zo(a);
            t.customWidth = 1 } else if (r.width != null) t.width = r.width; if (r.hidden) t.hidden = true; return t }

    function eh(e, r) { if (!e) return; var t = [.7, .7, .75, .75, .3, .3]; if (r == "xlml") t = [1, 1, 1, 1, .5, .5]; if (e.left == null) e.left = t[0]; if (e.right == null) e.right = t[1]; if (e.top == null) e.top = t[2]; if (e.bottom == null) e.bottom = t[3]; if (e.header == null) e.header = t[4]; if (e.footer == null) e.footer = t[5] }

    function rh(e, r, t) { var a = t.revssf[r.z != null ? r.z : "General"]; var n = 60,
            i = e.length; if (a == null && t.ssf) { for (; n < 392; ++n)
                if (t.ssf[n] == null) { x.load(r.z, n);
                    t.ssf[n] = r.z;
                    t.revssf[r.z] = a = n; break } } for (n = 0; n != i; ++n)
            if (e[n].numFmtId === a) return n;
        e[i] = { numFmtId: a, fontId: 0, fillId: 0, borderId: 0, xfId: 0, applyNumberFormat: 1 }; return i }

    function th(e, r, t, a, n, i) { if (e.t === "z") return; if (e.t === "d" && typeof e.v === "string") e.v = K(e.v); try { if (a.cellNF) e.z = x._table[r] } catch (s) { if (a.WTF) throw s } if (!a || a.cellText !== false) try { if (e.t === "e") e.w = e.w || Ht[e.v];
            else if (r === 0) { if (e.t === "n") { if ((e.v | 0) === e.v) e.w = x._general_int(e.v);
                    else e.w = x._general_num(e.v) } else if (e.t === "d") { var o = V(e.v); if ((o | 0) === o) e.w = x._general_int(o);
                    else e.w = x._general_num(o) } else if (e.v === undefined) return "";
                else e.w = x._general(e.v, Qu) } else if (e.t === "d") e.w = x.format(r, V(e.v), Qu);
            else e.w = x.format(r, e.v, Qu) } catch (s) { if (a.WTF) throw s }
        if (!a.cellStyles) return; if (t != null) try { e.s = i.Fills[t]; if (e.s.fgColor && e.s.fgColor.theme && !e.s.fgColor.rgb) { e.s.fgColor.rgb = No(n.themeElements.clrScheme[e.s.fgColor.theme].rgb, e.s.fgColor.tint || 0); if (a.WTF) e.s.fgColor.raw_rgb = n.themeElements.clrScheme[e.s.fgColor.theme].rgb } if (e.s.bgColor && e.s.bgColor.theme) { e.s.bgColor.rgb = No(n.themeElements.clrScheme[e.s.bgColor.theme].rgb, e.s.bgColor.tint || 0); if (a.WTF) e.s.bgColor.raw_rgb = n.themeElements.clrScheme[e.s.bgColor.theme].rgb } } catch (s) { if (a.WTF && i.Fills) throw s } }

    function ah(e, r) { var t = ot(r); if (t.s.r <= t.e.r && t.s.c <= t.e.c && t.s.r >= 0 && t.s.c >= 0) e["!ref"] = st(t) }
    var nh = /<(?:\w:)?mergeCell ref="[A-Z0-9:]+"\s*[\/]?>/g;
    var ih = /<(?:\w+:)?sheetData>([\s\S]*)<\/(?:\w+:)?sheetData>/;
    var sh = /<(?:\w:)?hyperlink [^>]*>/gm;
    var oh = /"(\w*:\w*)"/;
    var fh = /<(?:\w:)?col[^>]*[\/]?>/g;
    var lh = /<(?:\w:)?autoFilter[^>]*([\/]|>([\s\S]*)<\/(?:\w:)?autoFilter)>/g;
    var ch = /<(?:\w:)?pageMargins[^>]*\/>/g;
    var uh = /<(?:\w:)?sheetPr(?:[^>a-z][^>]*)?\/>/;
    var hh = /<(?:\w:)?sheetViews[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetViews)>/;

    function dh(e, r, t, a, n, i, s) { if (!e) return e; if (b != null && r.dense == null) r.dense = b; var o = r.dense ? [] : {}; var f = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } }; var l = "",
            c = ""; var u = e.match(ih); if (u) { l = e.substr(0, u.index);
            c = e.substr(u.index + u[0].length) } else l = c = e; var h = l.match(uh); if (h) ph(h[0], o, n, t); var d = (l.match(/<(?:\w*:)?dimension/) || { index: -1 }).index; if (d > 0) { var v = l.substr(d, 50).match(oh); if (v) ah(o, v[1]) } var p = l.match(hh); if (p && p[1]) Bh(p[1], n); var m = []; if (r.cellStyles) { var g = l.match(fh); if (g) kh(m, g) } if (u) Ih(u[1], o, r, f, i, s); var E = c.match(lh); if (E) o["!autofilter"] = Sh(E[0]); var k = []; var w = c.match(nh); if (w)
            for (d = 0; d != w.length; ++d) k[d] = ot(w[d].substr(w[d].indexOf('"') + 1)); var S = c.match(sh); if (S) mh(o, S, a); var _ = c.match(ch); if (_) o["!margins"] = gh(me(_[0])); if (!o["!ref"] && f.e.c >= f.s.c && f.e.r >= f.s.r) o["!ref"] = st(f); if (r.sheetRows > 0 && o["!ref"]) { var C = ot(o["!ref"]); if (r.sheetRows < +C.e.r) { C.e.r = r.sheetRows - 1; if (C.e.r > f.e.r) C.e.r = f.e.r; if (C.e.r < C.s.r) C.s.r = C.e.r; if (C.e.c > f.e.c) C.e.c = f.e.c; if (C.e.c < C.s.c) C.s.c = C.e.c;
                o["!fullref"] = o["!ref"];
                o["!ref"] = st(C) } } if (m.length > 0) o["!cols"] = m; if (k.length > 0) o["!merges"] = k; return o }

    function vh(e) { if (e.length === 0) return ""; var r = '<mergeCells count="' + e.length + '">'; for (var t = 0; t != e.length; ++t) r += '<mergeCell ref="' + st(e[t]) + '"/>'; return r + "</mergeCells>" }

    function ph(e, r, t, a) { var n = me(e); if (!t.Sheets[a]) t.Sheets[a] = {}; if (n.codeName) t.Sheets[a].CodeName = n.codeName }

    function bh(e) { var r = { sheet: 1 }; var t = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"]; var a = ["formatColumns", "formatRows", "formatCells", "insertColumns", "insertRows", "insertHyperlinks", "deleteColumns", "deleteRows", "sort", "autoFilter", "pivotTables"];
        t.forEach(function(t) { if (e[t] != null && e[t]) r[t] = "1" });
        a.forEach(function(t) { if (e[t] != null && !e[t]) r[t] = "0" }); if (e.password) r.password = Co(e.password).toString(16).toUpperCase(); return je("sheetProtection", null, r) }

    function mh(e, r, t) { var a = Array.isArray(e); for (var n = 0; n != r.length; ++n) { var i = me(De(r[n]), true); if (!i.ref) return; var s = ((t || {})["!id"] || [])[i.id]; if (s) { i.Target = s.Target; if (i.location) i.Target += "#" + i.location } else { i.Target = "#" + i.location;
                s = { Target: i.Target, TargetMode: "Internal" } } i.Rel = s; if (i.tooltip) { i.Tooltip = i.tooltip;
                delete i.tooltip } var o = ot(i.ref); for (var f = o.s.r; f <= o.e.r; ++f)
                for (var l = o.s.c; l <= o.e.c; ++l) { var c = tt({ c: l, r: f }); if (a) { if (!e[f]) e[f] = []; if (!e[f][l]) e[f][l] = { t: "z", v: undefined };
                        e[f][l].l = i } else { if (!e[c]) e[c] = { t: "z", v: undefined };
                        e[c].l = i } } } }

    function gh(e) { var r = {};
        ["left", "right", "top", "bottom", "header", "footer"].forEach(function(t) { if (e[t]) r[t] = parseFloat(e[t]) }); return r }

    function Eh(e) { eh(e); return je("pageMargins", null, e) }

    function kh(e, r) { var t = false; for (var a = 0; a != r.length; ++a) { var n = me(r[a], true); if (n.hidden) n.hidden = Re(n.hidden); var i = parseInt(n.min, 10) - 1,
                s = parseInt(n.max, 10) - 1;
            delete n.min;
            delete n.max;
            n.width = +n.width; if (!t && n.width) { t = true;
                Ko(n.width) } $o(n); while (i <= s) e[i++] = $(n) } }

    function wh(e, r) { var t = ["<cols>"],
            a, n; for (var i = 0; i != r.length; ++i) { if (!(a = r[i])) continue;
            t[t.length] = je("col", null, qu(i, a)) } t[t.length] = "</cols>"; return t.join("") }

    function Sh(e) { var r = { ref: (e.match(/ref="([^"]*)"/) || [])[1] }; return r }

    function _h(e) { return je("autoFilter", null, { ref: e.ref }) }
    var Ch = /<(?:\w:)?sheetView(?:[^>a-z][^>]*)?\/>/;

    function Bh(e, r) {
        (e.match(Ch) || []).forEach(function(e) { var t = me(e); if (Re(t.rightToLeft)) { if (!r.Views) r.Views = [{}]; if (!r.Views[0]) r.Views[0] = {};
                r.Views[0].RTL = true } }) }

    function Th(e, r, t, a) { var n = { workbookViewId: "0" }; if ((((a || {}).Workbook || {}).Views || [])[0]) n.rightToLeft = a.Workbook.Views[0].RTL ? "1" : "0"; return je("sheetViews", je("sheetView", null, n), {}) }

    function xh(e, r, t, a, n, i) { if (e.v === undefined && e.f === undefined || e.t === "z") return ""; var s = ""; var o = e.t,
            f = e.v; switch (e.t) {
            case "b":
                s = e.v ? "1" : "0"; break;
            case "n":
                s = "" + e.v; break;
            case "e":
                s = Ht[e.v]; break;
            case "d":
                if (a.cellDates) s = K(e.v, -1).toISOString();
                else { e = $(e);
                    e.t = "n";
                    s = "" + (e.v = V(K(e.v))) } if (typeof e.z === "undefined") e.z = x._table[14]; break;
            default:
                s = e.v; break; } var l = Xe("v", Ce(s)),
            c = { r: r }; var u = rh(a.cellXfs, e, a); if (u !== 0) c.s = u; switch (e.t) {
            case "n":
                break;
            case "d":
                c.t = "d"; break;
            case "b":
                c.t = "b"; break;
            case "e":
                c.t = "e"; break;
            default:
                if (e.v == null) { delete e.t; break } if (a.bookSST) { l = Xe("v", "" + Ju(a.Strings, e.v));
                    c.t = "s"; break } c.t = "str"; break; } if (e.t != o) { e.t = o;
            e.v = f } if (e.f) { var h = e.F && e.F.substr(0, r.length) == r ? { t: "array", ref: e.F } : null;
            l = je("f", Ce(e.f), h) + (e.v != null ? l : "") } if (e.l) t["!links"].push([r, e.l]); if (e.c) t["!comments"].push([r, e.c]); return je("c", l, c) }
    var Ih = function() { var e = /<(?:\w+:)?c[ >]/,
            r = /<\/(?:\w+:)?row>/; var t = /r=["']([^"']*)["']/,
            a = /<(?:\w+:)?is>([\S\s]*?)<\/(?:\w+:)?is>/; var n = /ref=["']([^"']*)["']/; var i = Le("v"),
            s = Le("f"); return function o(f, l, c, u, h, d) { var v = 0,
                p = "",
                b = [],
                m = [],
                g = 0,
                E = 0,
                k = 0,
                w = "",
                S; var _, C = 0,
                B = 0; var T, I; var A = 0,
                y = 0; var R = Array.isArray(d.CellXf),
                D; var O = []; var F = []; var P = Array.isArray(l); var N = [],
                L = {},
                M = false; for (var U = f.split(r), H = 0, W = U.length; H != W; ++H) { p = U[H].trim(); var X = p.length; if (X === 0) continue; for (v = 0; v < X; ++v)
                    if (p.charCodeAt(v) === 62) break;++v;
                _ = me(p.substr(0, v), true);
                C = _.r != null ? parseInt(_.r, 10) : C + 1;
                B = -1; if (c.sheetRows && c.sheetRows < C) continue; if (u.s.r > C - 1) u.s.r = C - 1; if (u.e.r < C - 1) u.e.r = C - 1; if (c && c.cellStyles) { L = {};
                    M = false; if (_.ht) { M = true;
                        L.hpt = parseFloat(_.ht);
                        L.hpx = qo(L.hpt) } if (_.hidden == "1") { M = true;
                        L.hidden = true } if (_.outlineLevel != null) { M = true;
                        L.level = +_.outlineLevel } if (M) N[C - 1] = L } b = p.substr(v).split(e); for (v = 0; v != b.length; ++v) { p = b[v].trim(); if (p.length === 0) continue;
                    m = p.match(t);
                    g = v;
                    E = 0;
                    k = 0;
                    p = "<c " + (p.substr(0, 1) == "<" ? ">" : "") + p; if (m != null && m.length === 2) { g = 0;
                        w = m[1]; for (E = 0; E != w.length; ++E) { if ((k = w.charCodeAt(E) - 64) < 1 || k > 26) break;
                            g = 26 * g + k }--g;
                        B = g } else ++B; for (E = 0; E != p.length; ++E)
                        if (p.charCodeAt(E) === 62) break;++E;
                    _ = me(p.substr(0, E), true); if (!_.r) _.r = tt({ r: C - 1, c: B });
                    w = p.substr(E);
                    S = { t: "" }; if ((m = w.match(i)) != null && m[1] !== "") S.v = we(m[1]); if (c.cellFormula) { if ((m = w.match(s)) != null && m[1] !== "") { S.f = Ul(we(De(m[1]))); if (m[0].indexOf('t="array"') > -1) { S.F = (w.match(n) || [])[1]; if (S.F.indexOf(":") > -1) O.push([ot(S.F), S.F]) } else if (m[0].indexOf('t="shared"') > -1) { I = me(m[0]);
                                F[parseInt(I.si, 10)] = [I, Ul(we(De(m[1])))] } } else if (m = w.match(/<f[^>]*\/>/)) { I = me(m[0]); if (F[I.si]) S.f = Ll(F[I.si][1], F[I.si][0].ref, _.r) } var G = rt(_.r); for (E = 0; E < O.length; ++E)
                            if (G.r >= O[E][0].s.r && G.r <= O[E][0].e.r)
                                if (G.c >= O[E][0].s.c && G.c <= O[E][0].e.c) S.F = O[E][1] } if (_.t == null && S.v === undefined) { if (S.f || S.F) { S.v = 0;
                            S.t = "n" } else if (!c.sheetStubs) continue;
                        else S.t = "z" } else S.t = _.t || "n"; if (u.s.c > g) u.s.c = g; if (u.e.c < g) u.e.c = g; switch (S.t) {
                        case "n":
                            if (S.v == "" || S.v == null) { if (!c.sheetStubs) continue;
                                S.t = "z" } else S.v = parseFloat(S.v); break;
                        case "s":
                            if (typeof S.v == "undefined") { if (!c.sheetStubs) continue;
                                S.t = "z" } else { T = Zu[parseInt(S.v, 10)];
                                S.v = T.t;
                                S.r = T.r; if (c.cellHTML) S.h = T.h } break;
                        case "str":
                            S.t = "s";
                            S.v = S.v != null ? De(S.v) : ""; if (c.cellHTML) S.h = xe(S.v); break;
                        case "inlineStr":
                            m = w.match(a);
                            S.t = "s"; if (m != null && (T = $s(m[1]))) S.v = T.t;
                            else S.v = ""; break;
                        case "b":
                            S.v = Re(S.v); break;
                        case "d":
                            if (c.cellDates) S.v = K(S.v, 1);
                            else { S.v = V(K(S.v, 1));
                                S.t = "n" } break;
                        case "e":
                            if (!c || c.cellText !== false) S.w = S.v;
                            S.v = Wt[S.v]; break; } A = y = 0; if (R && _.s !== undefined) { D = d.CellXf[_.s]; if (D != null) { if (D.numFmtId != null) A = D.numFmtId; if (c.cellStyles) { if (D.fillId != null) y = D.fillId } } } th(S, A, y, c, h, d); if (c.cellDates && R && S.t == "n" && x.is_date(x._table[A])) { S.t = "d";
                        S.v = z(S.v) } if (P) { var j = rt(_.r); if (!l[j.r]) l[j.r] = [];
                        l[j.r][j.c] = S } else l[_.r] = S } } if (N.length > 0) l["!rows"] = N } }();

    function Ah(e, r, t, a, n) { var i = [],
            s = [],
            o = ot(e["!ref"]),
            f = "",
            l, c = "",
            u = [],
            h = 0,
            d = 0,
            v = e["!rows"]; var p = Array.isArray(e); var b = { r: c },
            m, g = -1; for (d = o.s.c; d <= o.e.c; ++d) u[d] = Qr(d); for (h = o.s.r; h <= o.e.r; ++h) { s = [];
            c = Kr(h); for (d = o.s.c; d <= o.e.c; ++d) { l = u[d] + c; var E = p ? (e[h] || [])[d] : e[l]; if (E === undefined) continue; if ((f = xh(E, l, e, r, t, a)) != null) s.push(f) } if (s.length > 0 || v && v[h]) { b = { r: c }; if (v && v[h]) { m = v[h]; if (m.hidden) b.hidden = 1;
                    g = -1; if (m.hpx) g = Jo(m.hpx);
                    else if (m.hpt) g = m.hpt; if (g > -1) { b.ht = g;
                        b.customHeight = 1 } if (m.level) { b.outlineLevel = m.level } } i[i.length] = je("row", s.join(""), b) } } if (v)
            for (; h < v.length; ++h) { if (v && v[h]) { b = { r: h + 1 };
                    m = v[h]; if (m.hidden) b.hidden = 1;
                    g = -1; if (m.hpx) g = Jo(m.hpx);
                    else if (m.hpt) g = m.hpt; if (g > -1) { b.ht = g;
                        b.customHeight = 1 } if (m.level) { b.outlineLevel = m.level } i[i.length] = je("row", "", b) } }
        return i.join("") }
    var yh = je("worksheet", null, { xmlns: $e.main[0], "xmlns:r": $e.r });

    function Rh(e, r, t, a) { var n = [he, yh]; var i = t.SheetNames[e],
            s = 0,
            o = ""; var f = t.Sheets[i]; if (f == null) f = {}; var l = f["!ref"]; if (l == null) l = "A1"; if (!a) a = {};
        f["!comments"] = [];
        f["!drawing"] = []; var c = t.SheetNames[e]; try { if (t.Workbook) c = t.Workbook.Sheets[e].CodeName || c } catch (u) {} n[n.length] = je("sheetPr", null, { codeName: Ce(c) });
        n[n.length] = je("dimension", null, { ref: l });
        n[n.length] = Th(f, r, e, t); if (r.sheetFormat) n[n.length] = je("sheetFormatPr", null, { defaultRowHeight: r.sheetFormat.defaultRowHeight || "16", baseColWidth: r.sheetFormat.baseColWidth || "10", outlineLevelRow: r.sheetFormat.outlineLevelRow || "7" }); if (f["!cols"] != null && f["!cols"].length > 0) n[n.length] = wh(f, f["!cols"]);
        n[s = n.length] = "<sheetData/>";
        f["!links"] = []; if (f["!ref"] != null) { o = Ah(f, r, e, t, a); if (o.length > 0) n[n.length] = o } if (n.length > s + 1) { n[n.length] = "</sheetData>";
            n[s] = n[s].replace("/>", ">") } if (f["!protect"] != null) n[n.length] = bh(f["!protect"]); if (f["!autofilter"] != null) n[n.length] = _h(f["!autofilter"]); if (f["!merges"] != null && f["!merges"].length > 0) n[n.length] = vh(f["!merges"]); var h = -1,
            d, v = -1; if (f["!links"].length > 0) { n[n.length] = "<hyperlinks>";
            f["!links"].forEach(function(e) { if (!e[1].Target) return;
                d = { ref: e[0] }; if (e[1].Target.charAt(0) != "#") { v = Ia(a, -1, Ce(e[1].Target).replace(/#.*$/, ""), _a.HLINK);
                    d["r:id"] = "rId" + v } if ((h = e[1].Target.indexOf("#")) > -1) d.location = Ce(e[1].Target.substr(h + 1)); if (e[1].Tooltip) d.tooltip = Ce(e[1].Tooltip);
                n[n.length] = je("hyperlink", null, d) });
            n[n.length] = "</hyperlinks>" } delete f["!links"]; if (f["!margins"] != null) n[n.length] = Eh(f["!margins"]); var p = n.length;
        n[n.length] = ""; if (f["!drawing"].length > 0) { v = Ia(a, -1, "../drawings/drawing" + (e + 1) + ".xml", _a.DRAW);
            n[n.length] = je("drawing", null, { "r:id": "rId" + v }) } else delete f["!drawing"]; if (f["!comments"].length > 0) { v = Ia(a, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", _a.VML);
            n[n.length] = je("legacyDrawing", null, { "r:id": "rId" + v });
            f["!legacy"] = v } if (n.length > 2) { n[n.length] = "</worksheet>";
            n[1] = n[1].replace("/>", ">") } return n.join("") }

    function Dh(e, r) { var t = {}; var a = e.l + r;
        t.r = e._R(4);
        e.l += 4; var n = e._R(2);
        e.l += 1; var i = e._R(1);
        e.l = a; if (i & 7) t.level = i & 7; if (i & 16) t.hidden = true; if (i & 32) t.hpt = n / 20; return t }

    function Oh(e, r, t) { var a = Nr(17 + 8 * 16); var n = (t["!rows"] || [])[e] || {};
        a._W(4, e);
        a._W(4, 0); var i = 320; if (n.hpx) i = Jo(n.hpx) * 20;
        else if (n.hpt) i = n.hpt * 20;
        a._W(2, i);
        a._W(1, 0); var s = 0; if (n.level) s |= n.level; if (n.hidden) s |= 16; if (n.hpx || n.hpt) s |= 32;
        a._W(1, s);
        a._W(1, 0); var o = 0,
            f = a.l;
        a.l += 4; var l = { r: e, c: 0 }; for (var c = 0; c < 16; ++c) { if (r.s.c > c + 1 << 10 || r.e.c < c << 10) continue; var u = -1,
                h = -1; for (var d = c << 10; d < c + 1 << 10; ++d) { l.c = d; var v = Array.isArray(t) ? (t[l.r] || [])[l.c] : t[tt(l)]; if (v) { if (u < 0) u = d;
                    h = d } } if (u < 0) continue;++o;
            a._W(4, u);
            a._W(4, h) } var p = a.l;
        a.l = f;
        a._W(4, o);
        a.l = p; return a.length > a.l ? a.slice(0, a.l) : a }

    function Fh(e, r, t, a) { var n = Oh(a, t, r); if (n.length > 17 || (r["!rows"] || [])[a]) Ur(e, "BrtRowHdr", n) }
    var Ph = Nt;
    var Nh = Lt;

    function Lh(e, r) {}

    function Mh(e, r) { var t = {};
        e.l += 19;
        t.name = Ct(e, r - 19); return t }

    function Uh(e, r) { if (r == null) r = Nr(84 + 4 * e.length); for (var t = 0; t < 3; ++t) r._W(1, 0);
        zt({ auto: 1 }, r);
        r._W(-4, -1);
        r._W(-4, -1);
        Bt(e, r); return r.slice(0, r.l) }

    function Hh(e, r) { var t = St(e); return [t] }

    function Wh(e, r, t) { if (t == null) t = Nr(8); return _t(r, t) }

    function Vh(e, r) { var t = St(e); var a = e._R(1); return [t, a, "b"] }

    function zh(e, r, t) { if (t == null) t = Nr(9);
        _t(r, t);
        t._W(1, e.v ? 1 : 0); return t }

    function Xh(e, r) { var t = St(e); var a = e._R(1); return [t, a, "e"] }

    function Gh(e, r) { var t = St(e); var a = e._R(4); return [t, a, "s"] }

    function jh(e, r, t) { if (t == null) t = Nr(12);
        _t(r, t);
        t._W(4, r.v); return t }

    function Kh(e, r) { var t = St(e); var a = Mt(e); return [t, a, "n"] }

    function Yh(e, r, t) { if (t == null) t = Nr(16);
        _t(r, t);
        Ut(e.v, t); return t }

    function $h(e, r) { var t = St(e); var a = Dt(e); return [t, a, "n"] }

    function Zh(e, r, t) { if (t == null) t = Nr(12);
        _t(r, t);
        Ot(e.v, t); return t }

    function Qh(e, r) { var t = St(e); var a = vt(e); return [t, a, "str"] }

    function Jh(e, r, t) { if (t == null) t = Nr(12 + 4 * e.v.length);
        _t(r, t);
        pt(e.v, t); return t.length > t.l ? t.slice(0, t.l) : t }

    function qh(e, r, t) { var a = e.l + r; var n = St(e);
        n.r = t["!row"]; var i = e._R(1); var s = [n, i, "b"]; if (t.cellFormula) { e.l += 2; var o = Mu(e, a - e.l, t);
            s[3] = Au(o, null, n, t.supbooks, t) } else e.l = a; return s }

    function ed(e, r, t) { var a = e.l + r; var n = St(e);
        n.r = t["!row"]; var i = e._R(1); var s = [n, i, "e"]; if (t.cellFormula) { e.l += 2; var o = Mu(e, a - e.l, t);
            s[3] = Au(o, null, n, t.supbooks, t) } else e.l = a; return s }

    function rd(e, r, t) { var a = e.l + r; var n = St(e);
        n.r = t["!row"]; var i = Mt(e); var s = [n, i, "n"]; if (t.cellFormula) { e.l += 2; var o = Mu(e, a - e.l, t);
            s[3] = Au(o, null, n, t.supbooks, t) } else e.l = a; return s }

    function td(e, r, t) { var a = e.l + r; var n = St(e);
        n.r = t["!row"]; var i = vt(e); var s = [n, i, "str"]; if (t.cellFormula) { e.l += 2; var o = Mu(e, a - e.l, t);
            s[3] = Au(o, null, n, t.supbooks, t) } else e.l = a; return s }
    var ad = Nt;
    var nd = Lt;

    function id(e, r) { if (r == null) r = Nr(4);
        r._W(4, e); return r }

    function sd(e, r, t) { var a = e.l + r; var n = Nt(e, 16); var i = Tt(e); var s = vt(e); var o = vt(e); var f = vt(e);
        e.l = a; var l = { rfx: n, relId: i, loc: s, display: f }; if (o) l.Tooltip = o; return l }

    function od(e, r) { var t = Nr(50 + 4 * (e[1].Target.length + (e[1].Tooltip || "").length));
        Lt({ s: rt(e[0]), e: rt(e[0]) }, t);
        Rt("rId" + r, t); var a = e[1].Target.indexOf("#"); var n = a == -1 ? "" : e[1].Target.substr(a + 1);
        pt(n || "", t);
        pt(e[1].Tooltip || "", t);
        pt("", t); return t.slice(0, t.l) }

    function fd(e, r, t) { var a = e.l + r; var n = Ft(e, 16); var i = e._R(1); var s = [n];
        s[2] = i; if (t.cellFormula) { var o = Lu(e, a - e.l, t);
            s[1] = o } else e.l = a; return s }

    function ld(e, r, t) { var a = e.l + r; var n = Nt(e, 16); var i = [n]; if (t.cellFormula) { var s = Hu(e, a - e.l, t);
            i[1] = s;
            e.l = a } else e.l = a; return i }

    function cd(e, r, t) { if (t == null) t = Nr(18); var a = qu(e, r);
        t._W(-4, e);
        t._W(-4, e);
        t._W(4, (a.width || 10) * 256);
        t._W(4, 0); var n = 0; if (r.hidden) n |= 1; if (typeof a.width == "number") n |= 2;
        t._W(1, n);
        t._W(1, 0); return t }
    var ud = ["left", "right", "top", "bottom", "header", "footer"];

    function hd(e, r, t) { var a = {};
        ud.forEach(function(r) { a[r] = Mt(e, 8) }); return a }

    function dd(e, r) { if (r == null) r = Nr(6 * 8);
        eh(e);
        ud.forEach(function(t) { Ut(e[t], r) }); return r }

    function vd(e, r, t) { var a = e._R(2);
        e.l += 28; return { RTL: a & 32 } }

    function pd(e, r, t) { if (t == null) t = Nr(30); var a = 924; if ((((r || {}).Views || [])[0] || {}).RTL) a |= 32;
        t._W(2, a);
        t._W(4, 0);
        t._W(4, 0);
        t._W(4, 0);
        t._W(1, 0);
        t._W(1, 0);
        t._W(2, 0);
        t._W(2, 100);
        t._W(2, 0);
        t._W(2, 0);
        t._W(2, 0);
        t._W(4, 0); return t }

    function bd(e, r) { if (r == null) r = Nr(16 * 4 + 2);
        r._W(2, e.password ? Co(e.password) : 0);
        r._W(4, 1);
        [
            ["objects", false],
            ["scenarios", false],
            ["formatCells", true],
            ["formatColumns", true],
            ["formatRows", true],
            ["insertColumns", true],
            ["insertRows", true],
            ["insertHyperlinks", true],
            ["deleteColumns", true],
            ["deleteRows", true],
            ["selectLockedCells", false],
            ["sort", true],
            ["autoFilter", true],
            ["pivotTables", true],
            ["selectUnlockedCells", false]
        ].forEach(function(t) { if (t[1]) r._W(4, e[t[0]] != null && !e[t[0]] ? 1 : 0);
            else r._W(4, e[t[0]] != null && e[t[0]] ? 0 : 1) }); return r }

    function md(e, r, t, a, n, i, s) {
        if (!e) return e;
        var o = r || {};
        if (!a) a = { "!id": {} };
        if (b != null && o.dense == null) o.dense = b;
        var f = o.dense ? [] : {};
        var l;
        var c = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } };
        var u = false,
            h = false;
        var d, v, p, m, g, E, k, w, S;
        var _ = [];
        o.biff = 12;
        o["!row"] = 0;
        var C = 0,
            B = false;
        var T = [];
        var I = {};
        var A = o.supbooks || [
            []
        ];
        A.sharedf = I;
        A.arrayf = T;
        A.SheetNames = n.SheetNames || n.Sheets.map(function(e) { return e.name });
        if (!o.supbooks) { o.supbooks = A; if (n.Names)
                for (var y = 0; y < n.Names.length; ++y) A[0][y + 1] = n.Names[y] }
        var R = [],
            D = [];
        var O = false;
        Lr(e, function P(e, r, b) {
            if (h) return;
            switch (b) {
                case 148:
                    l = e;
                    break;
                case 0:
                    d = e;
                    if (o.sheetRows && o.sheetRows <= d.r) h = true;
                    w = Kr(m = d.r);
                    o["!row"] = d.r;
                    if (e.hidden || e.hpt || e.level != null) { if (e.hpt) e.hpx = qo(e.hpt);
                        D[e.r] = e }
                    break;
                case 2:
                    ;
                case 3:
                    ;
                case 4:
                    ;
                case 5:
                    ;
                case 6:
                    ;
                case 7:
                    ;
                case 8:
                    ;
                case 9:
                    ;
                case 10:
                    ;
                case 11:
                    v = { t: e[2] };
                    switch (e[2]) {
                        case "n":
                            v.v = e[1]; break;
                        case "s":
                            k = Zu[e[1]];
                            v.v = k.t;
                            v.r = k.r; break;
                        case "b":
                            v.v = e[1] ? true : false; break;
                        case "e":
                            v.v = e[1]; if (o.cellText !== false) v.w = Ht[v.v]; break;
                        case "str":
                            v.t = "s";
                            v.v = e[1]; break; }
                    if (p = s.CellXf[e[0].iStyleRef]) th(v, p.numFmtId, null, o, i, s);
                    g = e[0].c;
                    if (o.dense) { if (!f[m]) f[m] = [];
                        f[m][g] = v } else f[Qr(g) + w] = v;
                    if (o.cellFormula) { B = false; for (C = 0; C < T.length; ++C) { var y = T[C]; if (d.r >= y[0].s.r && d.r <= y[0].e.r)
                                if (g >= y[0].s.c && g <= y[0].e.c) { v.F = st(y[0]);
                                    B = true } } if (!B && e.length > 3) v.f = e[3] }
                    if (c.s.r > d.r) c.s.r = d.r;
                    if (c.s.c > g) c.s.c = g;
                    if (c.e.r < d.r) c.e.r = d.r;
                    if (c.e.c < g) c.e.c = g;
                    if (o.cellDates && p && v.t == "n" && x.is_date(x._table[p.numFmtId])) { var F = x.parse_date_code(v.v); if (F) { v.t = "d";
                            v.v = new Date(F.y, F.m - 1, F.d, F.H, F.M, F.S, F.u) } }
                    break;
                case 1:
                    if (!o.sheetStubs || u) break;
                    v = { t: "z", v: undefined };
                    g = e[0].c;
                    if (o.dense) { if (!f[m]) f[m] = [];
                        f[m][g] = v } else f[Qr(g) + w] = v;
                    if (c.s.r > d.r) c.s.r = d.r;
                    if (c.s.c > g) c.s.c = g;
                    if (c.e.r < d.r) c.e.r = d.r;
                    if (c.e.c < g) c.e.c = g;
                    break;
                case 176:
                    _.push(e);
                    break;
                case 494:
                    var P = a["!id"][e.relId];
                    if (P) { e.Target = P.Target; if (e.loc) e.Target += "#" + e.loc;
                        e.Rel = P } else if (e.relId == "") { e.Target = "#" + e.loc }
                    for (m = e.rfx.s.r; m <= e.rfx.e.r; ++m)
                        for (g = e.rfx.s.c; g <= e.rfx.e.c; ++g) { if (o.dense) { if (!f[m]) f[m] = []; if (!f[m][g]) f[m][g] = { t: "z", v: undefined };
                                f[m][g].l = e } else { E = tt({ c: g, r: m }); if (!f[E]) f[E] = { t: "z", v: undefined };
                                f[E].l = e } }
                    break;
                case 426:
                    if (!o.cellFormula) break;
                    T.push(e);
                    S = o.dense ? f[m][g] : f[Qr(g) + w];
                    S.f = Au(e[1], c, { r: d.r, c: g }, A, o);
                    S.F = st(e[0]);
                    break;
                case 427:
                    if (!o.cellFormula) break;
                    I[tt(e[0].s)] = e[1];
                    S = o.dense ? f[m][g] : f[Qr(g) + w];
                    S.f = Au(e[1], c, { r: d.r, c: g }, A, o);
                    break;
                case 60:
                    if (!o.cellStyles) break;
                    while (e.e >= e.s) { R[e.e--] = { width: e.w / 256, hidden: !!(e.flags & 1) }; if (!O) { O = true;
                            Ko(e.w / 256) } $o(R[e.e + 1]) }
                    break;
                case 161:
                    f["!autofilter"] = { ref: st(e) };
                    break;
                case 476:
                    f["!margins"] = e;
                    break;
                case 147:
                    if (!n.Sheets[t]) n.Sheets[t] = {};
                    if (e.name) n.Sheets[t].CodeName = e.name;
                    break;
                case 137:
                    if (!n.Views) n.Views = [{}];
                    if (!n.Views[0]) n.Views[0] = {};
                    if (e.RTL) n.Views[0].RTL = true;
                    break;
                case 485:
                    ;
                case 175:
                    ;
                case 644:
                    ;
                case 625:
                    ;
                case 562:
                    ;
                case 396:
                    ;
                case 1112:
                    ;
                case 1146:
                    ;
                case 471:
                    ;
                case 1050:
                    ;
                case 649:
                    ;
                case 1105:
                    ;
                case 49:
                    ;
                case 589:
                    ;
                case 607:
                    ;
                case 564:
                    ;
                case 1055:
                    ;
                case 168:
                    ;
                case 174:
                    ;
                case 1180:
                    ;
                case 499:
                    ;
                case 64:
                    ;
                case 1053:
                    ;
                case 550:
                    ;
                case 171:
                    ;
                case 167:
                    ;
                case 1177:
                    ;
                case 169:
                    ;
                case 1181:
                    ;
                case 551:
                    ;
                case 552:
                    ;
                case 661:
                    ;
                case 639:
                    ;
                case 478:
                    ;
                case 151:
                    ;
                case 537:
                    ;
                case 477:
                    ;
                case 536:
                    ;
                case 1103:
                    ;
                case 680:
                    ;
                case 1104:
                    ;
                case 1024:
                    ;
                case 152:
                    ;
                case 663:
                    ;
                case 535:
                    ;
                case 678:
                    ;
                case 504:
                    ;
                case 1043:
                    ;
                case 428:
                    ;
                case 170:
                    ;
                case 50:
                    ;
                case 2070:
                    ;
                case 1045:
                    break;
                case 35:
                    u = true;
                    break;
                case 36:
                    u = false;
                    break;
                case 37:
                    break;
                case 38:
                    break;
                default:
                    if ((r || "").indexOf("Begin") > 0) {} else if ((r || "").indexOf("End") > 0) {} else if (!u || o.WTF) throw new Error("Unexpected record " + b + " " + r);
            }
        }, o);
        delete o.supbooks;
        delete o["!row"];
        if (!f["!ref"] && (c.s.r < 2e6 || l && (l.e.r > 0 || l.e.c > 0 || l.s.r > 0 || l.s.c > 0))) f["!ref"] = st(l || c);
        if (o.sheetRows && f["!ref"]) { var F = ot(f["!ref"]); if (o.sheetRows < +F.e.r) { F.e.r = o.sheetRows - 1; if (F.e.r > c.e.r) F.e.r = c.e.r; if (F.e.r < F.s.r) F.s.r = F.e.r; if (F.e.c > c.e.c) F.e.c = c.e.c; if (F.e.c < F.s.c) F.s.c = F.e.c;
                f["!fullref"] = f["!ref"];
                f["!ref"] = st(F) } }
        if (_.length > 0) f["!merges"] = _;
        if (R.length > 0) f["!cols"] = R;
        if (D.length > 0) f["!rows"] = D;
        return f
    }

    function gd(e, r, t, a, n, i) { if (r.v === undefined) return ""; var s = ""; switch (r.t) {
            case "b":
                s = r.v ? "1" : "0"; break;
            case "d":
                r = $(r);
                r.z = r.z || x._table[14];
                r.v = V(K(r.v));
                r.t = "n"; break;
            case "n":
                ;
            case "e":
                s = "" + r.v; break;
            default:
                s = r.v; break; } var o = { r: t, c: a };
        o.s = rh(n.cellXfs, r, n); if (r.l) i["!links"].push([tt(o), r.l]); if (r.c) i["!comments"].push([tt(o), r.c]); switch (r.t) {
            case "s":
                ;
            case "str":
                if (n.bookSST) { s = Ju(n.Strings, r.v);
                    o.t = "s";
                    o.v = s;
                    Ur(e, "BrtCellIsst", jh(r, o)) } else { o.t = "str";
                    Ur(e, "BrtCellSt", Jh(r, o)) } return;
            case "n":
                if (r.v == (r.v | 0) && r.v > -1e3 && r.v < 1e3) Ur(e, "BrtCellRk", Zh(r, o));
                else Ur(e, "BrtCellReal", Yh(r, o)); return;
            case "b":
                o.t = "b";
                Ur(e, "BrtCellBool", zh(r, o)); return;
            case "e":
                o.t = "e"; break; } Ur(e, "BrtCellBlank", Wh(r, o)) }

    function Ed(e, r, t, a, n) { var i = ot(r["!ref"] || "A1"),
            s, o = "",
            f = [];
        Ur(e, "BrtBeginSheetData"); var l = Array.isArray(r); var c = i.e.r; if (r["!rows"]) c = Math.max(i.e.r, r["!rows"].length - 1); for (var u = i.s.r; u <= c; ++u) { o = Kr(u);
            Fh(e, r, i, u); if (u <= i.e.r)
                for (var h = i.s.c; h <= i.e.c; ++h) { if (u === i.s.r) f[h] = Qr(h);
                    s = f[h] + o; var d = l ? (r[u] || [])[h] : r[s]; if (!d) continue;
                    gd(e, d, u, h, a, r) } } Ur(e, "BrtEndSheetData") }

    function kd(e, r) { if (!r || !r["!merges"]) return;
        Ur(e, "BrtBeginMergeCells", id(r["!merges"].length));
        r["!merges"].forEach(function(r) { Ur(e, "BrtMergeCell", nd(r)) });
        Ur(e, "BrtEndMergeCells") }

    function wd(e, r, t, a, n) { if (!r || !r["!cols"]) return;
        Ur(e, "BrtBeginColInfos");
        r["!cols"].forEach(function(r, t) { if (r) Ur(e, "BrtColInfo", cd(t, r)) });
        Ur(e, "BrtEndColInfos") }

    function Sd(e, r, t) { r["!links"].forEach(function(r) { if (!r[1].Target) return; var a = Ia(t, -1, r[1].Target.replace(/#.*$/, ""), _a.HLINK);
            Ur(e, "BrtHLink", od(r, a)) });
        delete r["!links"] }

    function _d(e, r, t, a) { if (r["!comments"].length > 0) { var n = Ia(a, -1, "../drawings/vmlDrawing" + (t + 1) + ".vml", _a.VML);
            Ur(e, "BrtLegacyDrawing", Rt("rId" + n));
            r["!legacy"] = n } }

    function Cd(e, r) { if (!r["!autofilter"]) return;
        Ur(e, "BrtBeginAFilter", Lt(it(r["!autofilter"].ref)));
        Ur(e, "BrtEndAFilter") }

    function Bd(e, r, t) { Ur(e, "BrtBeginWsViews"); { Ur(e, "BrtBeginWsView", pd(r, t));
            Ur(e, "BrtEndWsView") } Ur(e, "BrtEndWsViews") }

    function Td(e, r) {}

    function xd(e, r) { if (!r["!protect"]) return;
        Ur(e, "BrtSheetProtection", bd(r["!protect"])) }

    function Id(e, r, t, a) { var n = Mr(); var i = t.SheetNames[e],
            s = t.Sheets[i] || {}; var o = i; try { if (t && t.Workbook) o = t.Workbook.Sheets[e].CodeName || o } catch (f) {} var l = ot(s["!ref"] || "A1");
        s["!links"] = [];
        s["!comments"] = [];
        Ur(n, "BrtBeginSheet");
        Ur(n, "BrtWsProp", Uh(o));
        Ur(n, "BrtWsDim", Nh(l));
        Bd(n, s, t.Workbook);
        Td(n, s);
        wd(n, s, e, r, t);
        Ed(n, s, e, r, t);
        xd(n, s);
        Cd(n, s);
        kd(n, s);
        Sd(n, s, a); if (s["!margins"]) Ur(n, "BrtMargins", dd(s["!margins"]));
        _d(n, s, e, a);
        Ur(n, "BrtEndSheet"); return n.end() }

    function Ad(e) { var r = [];
        (e.match(/<c:pt idx="(\d*)">(.*?)<\/c:pt>/gm) || []).forEach(function(e) { var t = e.match(/<c:pt idx="(.*?)"><c:v>(.*)<\/c:v><\/c:pt>/); if (!t) return;
            r[+t[1]] = +t[2] }); var t = we((e.match(/<c:formatCode>([\s\S]*?)<\/c:formatCode>/) || ["", "General"])[1]); return [r, t] }

    function yd(e, r, t, a, n, i) { var s = i || { "!type": "chart" }; if (!e) return i; var o = 0,
            f = 0,
            l = "A"; var c = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } };
        (e.match(/<c:numCache>[\s\S]*?<\/c:numCache>/gm) || []).forEach(function(e) { var r = Ad(e);
            c.s.r = c.s.c = 0;
            c.e.c = o;
            l = Qr(o);
            r[0].forEach(function(e, t) { s[l + Kr(t)] = { t: "n", v: e, z: r[1] };
                f = t }); if (c.e.r < f) c.e.r = f;++o }); if (o > 0) s["!ref"] = st(c); return s } _a.CS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chartsheet";
    var Rd = je("chartsheet", null, { xmlns: $e.main[0], "xmlns:r": $e.r });

    function Dd(e, r, t, a, n, i, s) { if (!e) return e; if (!a) a = { "!id": {} }; var o = { "!type": "chart", "!chart": null, "!rel": "" }; var f; var l = e.match(uh); if (l) ph(l[0], o, n, t); if (f = e.match(/drawing r:id="(.*?)"/)) o["!rel"] = f[1]; if (a["!id"][o["!rel"]]) o["!chart"] = a["!id"][o["!rel"]]; return o }

    function Od(e, r, t, a) { var n = [he, Rd];
        n[n.length] = je("drawing", null, { "r:id": "rId1" });
        Ia(a, -1, "../drawings/drawing" + (e + 1) + ".xml", _a.DRAW); if (n.length > 2) { n[n.length] = "</chartsheet>";
            n[1] = n[1].replace("/>", ">") } return n.join("") }

    function Fd(e, r) { e.l += 10; var t = vt(e, r - 10); return { name: t } }

    function Pd(e, r, t, a, n, i, s) { if (!e) return e; if (!a) a = { "!id": {} }; var o = { "!type": "chart", "!chart": null, "!rel": "" }; var f = []; var l = false;
        Lr(e, function c(e, a, i) { switch (i) {
                case 550:
                    o["!rel"] = e; break;
                case 651:
                    if (!n.Sheets[t]) n.Sheets[t] = {}; if (e.name) n.Sheets[t].CodeName = e.name; break;
                case 562:
                    ;
                case 652:
                    ;
                case 669:
                    ;
                case 679:
                    ;
                case 551:
                    ;
                case 552:
                    ;
                case 476:
                    break;
                case 35:
                    l = true; break;
                case 36:
                    l = false; break;
                case 37:
                    f.push(a); break;
                case 38:
                    f.pop(); break;
                default:
                    if ((a || "").indexOf("Begin") > 0) f.push(a);
                    else if ((a || "").indexOf("End") > 0) f.pop();
                    else if (!l || r.WTF) throw new Error("Unexpected record " + i + " " + a); } }, r); if (a["!id"][o["!rel"]]) o["!chart"] = a["!id"][o["!rel"]]; return o }

    function Nd(e, r, t, a) { var n = Mr();
        Ur(n, "BrtBeginSheet");
        Ur(n, "BrtEndSheet"); return n.end() }
    var Ld = [
        ["allowRefreshQuery", false, "bool"],
        ["autoCompressPictures", true, "bool"],
        ["backupFile", false, "bool"],
        ["checkCompatibility", false, "bool"],
        ["CodeName", ""],
        ["date1904", false, "bool"],
        ["defaultThemeVersion", 0, "int"],
        ["filterPrivacy", false, "bool"],
        ["hidePivotFieldList", false, "bool"],
        ["promptedSolutions", false, "bool"],
        ["publishItems", false, "bool"],
        ["refreshAllConnections", false, "bool"],
        ["saveExternalLinkValues", true, "bool"],
        ["showBorderUnselectedTables", true, "bool"],
        ["showInkAnnotation", true, "bool"],
        ["showObjects", "all"],
        ["showPivotChartFilter", false, "bool"],
        ["updateLinks", "userSet"]
    ];
    var Md = [
        ["activeTab", 0, "int"],
        ["autoFilterDateGrouping", true, "bool"],
        ["firstSheet", 0, "int"],
        ["minimized", false, "bool"],
        ["showHorizontalScroll", true, "bool"],
        ["showSheetTabs", true, "bool"],
        ["showVerticalScroll", true, "bool"],
        ["tabRatio", 600, "int"],
        ["visibility", "visible"]
    ];
    var Ud = [];
    var Hd = [
        ["calcCompleted", "true"],
        ["calcMode", "auto"],
        ["calcOnSave", "true"],
        ["concurrentCalc", "true"],
        ["fullCalcOnLoad", "false"],
        ["fullPrecision", "true"],
        ["iterate", "false"],
        ["iterateCount", "100"],
        ["iterateDelta", "0.001"],
        ["refMode", "A1"]
    ];
    var Wd = [
        ["autoUpdate", "false"],
        ["changesSavedWin", "false"],
        ["includeHiddenRowCol", "true"],
        ["includePrintSettings", "true"],
        ["maximized", "false"],
        ["minimized", "false"],
        ["onlySync", "false"],
        ["personalView", "false"],
        ["showComments", "commIndicator"],
        ["showFormulaBar", "true"],
        ["showHorizontalScroll", "true"],
        ["showObjects", "all"],
        ["showSheetTabs", "true"],
        ["showStatusbar", "true"],
        ["showVerticalScroll", "true"],
        ["tabRatio", "600"],
        ["xWindow", "0"],
        ["yWindow", "0"]
    ];

    function Vd(e, r) { for (var t = 0; t != e.length; ++t) { var a = e[t]; for (var n = 0; n != r.length; ++n) { var i = r[n]; if (a[i[0]] == null) a[i[0]] = i[1];
                else switch (i[2]) {
                    case "bool":
                        if (typeof a[i[0]] == "string") a[i[0]] = Re(a[i[0]], i[0]); break;
                    case "int":
                        if (typeof a[i[0]] == "string") a[i[0]] = parseInt(a[i[0]], 10); break; } } } }

    function zd(e, r) { for (var t = 0; t != r.length; ++t) { var a = r[t]; if (e[a[0]] == null) e[a[0]] = a[1];
            else switch (a[2]) {
                case "bool":
                    if (typeof e[a[0]] == "string") e[a[0]] = Re(e[a[0]], a[0]); break;
                case "int":
                    if (typeof e[a[0]] == "string") e[a[0]] = parseInt(e[a[0]], 10); break; } } }

    function Xd(e) { zd(e.WBProps, Ld);
        zd(e.CalcPr, Hd);
        Vd(e.WBView, Md);
        Vd(e.Sheets, Ud);
        Qu.date1904 = Re(e.WBProps.date1904, "date1904") }

    function Gd(e) { if (!e.Workbook) return "false"; if (!e.Workbook.WBProps) return "false"; return Re(e.Workbook.WBProps.date1904) ? "true" : "false" }
    var jd = "][*?/\\".split("");

    function Kd(e, r) { if (e.length > 31) { if (r) return false; throw new Error("Sheet names cannot exceed 31 chars") } var t = true;
        jd.forEach(function(a) { if (e.indexOf(a) == -1) return; if (!r) throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
            t = false }); return t }

    function Yd(e) { e.forEach(function(r, t) { Kd(r); for (var a = 0; a < t; ++a)
                if (r == e[a]) throw new Error("Duplicate Sheet Name: " + r) }) }

    function $d(e) { if (!e || !e.SheetNames || !e.Sheets) throw new Error("Invalid Workbook");
        Yd(e.SheetNames) }
    var Zd = /<\w+:workbook/;

    function Qd(e, r) { if (!e) throw new Error("Could not find file"); var t = { AppVersion: {}, WBProps: {}, WBView: [], Sheets: [], CalcPr: {}, Names: [], xmlns: "" }; var a = false,
            n = "xmlns"; var i = {},
            s = 0;
        e.replace(ve, function o(f, l) { var c = me(f); switch (ge(c[0])) {
                case "<?xml":
                    break;
                case "<workbook":
                    if (f.match(Zd)) n = "xmlns" + f.match(/<(\w+):/)[1];
                    t.xmlns = c[n]; break;
                case "</workbook>":
                    break;
                case "<fileVersion":
                    delete c[0];
                    t.AppVersion = c; break;
                case "<fileVersion/>":
                    ;
                case "</fileVersion>":
                    break;
                case "<fileSharing":
                    ;
                case "<fileSharing/>":
                    break;
                case "<workbookPr":
                    ;
                case "<workbookPr/>":
                    Ld.forEach(function(e) { if (c[e[0]] == null) return; switch (e[2]) {
                            case "bool":
                                t.WBProps[e[0]] = Re(c[e[0]], e[0]); break;
                            case "int":
                                t.WBProps[e[0]] = parseInt(c[e[0]], 10); break;
                            default:
                                t.WBProps[e[0]] = c[e[0]]; } }); if (c.codeName) t.WBProps.CodeName = c.codeName; break;
                case "</workbookPr>":
                    break;
                case "<workbookProtection":
                    break;
                case "<workbookProtection/>":
                    break;
                case "<bookViews":
                    ;
                case "<bookViews>":
                    ;
                case "</bookViews>":
                    break;
                case "<workbookView":
                    delete c[0];
                    t.WBView.push(c); break;
                case "</workbookView>":
                    break;
                case "<sheets":
                    ;
                case "<sheets>":
                    ;
                case "</sheets>":
                    break;
                case "<sheet":
                    switch (c.state) {
                        case "hidden":
                            c.Hidden = 1; break;
                        case "veryHidden":
                            c.Hidden = 2; break;
                        default:
                            c.Hidden = 0; } delete c.state;
                    c.name = we(De(c.name));
                    delete c[0];
                    t.Sheets.push(c); break;
                case "</sheet>":
                    break;
                case "<functionGroups":
                    ;
                case "<functionGroups/>":
                    break;
                case "<functionGroup":
                    break;
                case "<externalReferences":
                    ;
                case "</externalReferences>":
                    ;
                case "<externalReferences>":
                    break;
                case "<externalReference":
                    break;
                case "<definedNames/>":
                    break;
                case "<definedNames>":
                    ;
                case "<definedNames":
                    a = true; break;
                case "</definedNames>":
                    a = false; break;
                case "<definedName":
                    { i = {};i.Name = c.name; if (c.comment) i.Comment = c.comment; if (c.localSheetId) i.Sheet = +c.localSheetId;s = l + f.length } break;
                case "</definedName>":
                    { i.Ref = e.slice(s, l);t.Names.push(i) } break;
                case "<definedName/>":
                    break;
                case "<calcPr":
                    delete c[0];
                    t.CalcPr = c; break;
                case "<calcPr/>":
                    delete c[0];
                    t.CalcPr = c; break;
                case "</calcPr>":
                    break;
                case "<oleSize":
                    break;
                case "<customWorkbookViews>":
                    ;
                case "</customWorkbookViews>":
                    ;
                case "<customWorkbookViews":
                    break;
                case "<customWorkbookView":
                    ;
                case "</customWorkbookView>":
                    break;
                case "<pivotCaches>":
                    ;
                case "</pivotCaches>":
                    ;
                case "<pivotCaches":
                    break;
                case "<pivotCache":
                    break;
                case "<smartTagPr":
                    ;
                case "<smartTagPr/>":
                    break;
                case "<smartTagTypes":
                    ;
                case "<smartTagTypes>":
                    ;
                case "</smartTagTypes>":
                    break;
                case "<smartTagType":
                    break;
                case "<webPublishing":
                    ;
                case "<webPublishing/>":
                    break;
                case "<fileRecoveryPr":
                    ;
                case "<fileRecoveryPr/>":
                    break;
                case "<webPublishObjects>":
                    ;
                case "<webPublishObjects":
                    ;
                case "</webPublishObjects>":
                    break;
                case "<webPublishObject":
                    break;
                case "<extLst":
                    ;
                case "<extLst>":
                    ;
                case "</extLst>":
                    ;
                case "<extLst/>":
                    break;
                case "<ext":
                    a = true; break;
                case "</ext>":
                    a = false; break;
                case "<ArchID":
                    break;
                case "<AlternateContent":
                    ;
                case "<AlternateContent>":
                    a = true; break;
                case "</AlternateContent>":
                    a = false; break;
                case "<revisionPtr":
                    break;
                default:
                    if (!a && r.WTF) throw new Error("unrecognized " + c[0] + " in workbook"); } return f }); if ($e.main.indexOf(t.xmlns) === -1) throw new Error("Unknown Namespace: " + t.xmlns);
        Xd(t); return t }
    var Jd = je("workbook", null, { xmlns: $e.main[0], "xmlns:r": $e.r });

    function qd(e, r) { var t = [he];
        t[t.length] = Jd; var a = e.Workbook && (e.Workbook.Names || []).length > 0; var n = { codeName: "ThisWorkbook" }; if (e.Workbook && e.Workbook.WBProps) { Ld.forEach(function(r) { if (e.Workbook.WBProps[r[0]] == null) return; if (e.Workbook.WBProps[r[0]] == r[1]) return;
                n[r[0]] = e.Workbook.WBProps[r[0]] }); if (e.Workbook.WBProps.CodeName) { n.codeName = e.Workbook.WBProps.CodeName;
                delete n.CodeName } } t[t.length] = je("workbookPr", null, n);
        t[t.length] = "<sheets>"; var i = e.Workbook && e.Workbook.Sheets || []; for (var s = 0; s != e.SheetNames.length; ++s) { var o = { name: Ce(e.SheetNames[s].substr(0, 31)) };
            o.sheetId = "" + (s + 1);
            o["r:id"] = "rId" + (s + 1); if (i[s]) switch (i[s].Hidden) {
                case 1:
                    o.state = "hidden"; break;
                case 2:
                    o.state = "veryHidden"; break; } t[t.length] = je("sheet", null, o) } t[t.length] = "</sheets>"; if (a) { t[t.length] = "<definedNames>"; if (e.Workbook && e.Workbook.Names) e.Workbook.Names.forEach(function(e) { var r = { name: e.Name }; if (e.Comment) r.comment = e.Comment; if (e.Sheet != null) r.localSheetId = "" + e.Sheet; if (!e.Ref) return;
                t[t.length] = je("definedName", String(e.Ref), r) });
            t[t.length] = "</definedNames>" } if (t.length > 2) { t[t.length] = "</workbook>";
            t[1] = t[1].replace("/>", ">") } return t.join("") }

    function ev(e, r) { var t = {};
        t.Hidden = e._R(4);
        t.iTabID = e._R(4);
        t.strRelID = yt(e, r - 8);
        t.name = vt(e); return t }

    function rv(e, r) { if (!r) r = Nr(127);
        r._W(4, e.Hidden);
        r._W(4, e.iTabID);
        Rt(e.strRelID, r);
        pt(e.name.substr(0, 31), r); return r.length > r.l ? r.slice(0, r.l) : r }

    function tv(e, r) { var t = {}; var a = e._R(4);
        t.defaultThemeVersion = e._R(4); var n = r > 8 ? vt(e) : ""; if (n.length > 0) t.CodeName = n;
        t.autoCompressPictures = !!(a & 65536);
        t.backupFile = !!(a & 64);
        t.checkCompatibility = !!(a & 4096);
        t.date1904 = !!(a & 1);
        t.filterPrivacy = !!(a & 8);
        t.hidePivotFieldList = !!(a & 1024);
        t.promptedSolutions = !!(a & 16);
        t.publishItems = !!(a & 2048);
        t.refreshAllConnections = !!(a & 262144);
        t.saveExternalLinkValues = !!(a & 128);
        t.showBorderUnselectedTables = !!(a & 4);
        t.showInkAnnotation = !!(a & 32);
        t.showObjects = ["all", "placeholders", "none"][a >> 13 & 3];
        t.showPivotChartFilter = !!(a & 32768);
        t.updateLinks = ["userSet", "never", "always"][a >> 8 & 3]; return t }

    function av(e, r) { if (!r) r = Nr(72); var t = 0; if (e) { if (e.filterPrivacy) t |= 8 } r._W(4, t);
        r._W(4, 0);
        Bt(e && e.CodeName || "ThisWorkbook", r); return r.slice(0, r.l) }

    function nv(e, r) { var t = {};
        e._R(4);
        t.ArchID = e._R(4);
        e.l += r - 8; return t }

    function iv(e, r, t) { var a = e.l + r; var n = e._R(4); var i = e._R(1); var s = e._R(4); var o = It(e); var f = Uu(e, 0, t); var l = Tt(e);
        e.l = a; var c = { Name: o, Ptg: f }; if (s < 268435455) c.Sheet = s; if (l) c.Comment = l; return c }

    function sv(e, r) { var t = { AppVersion: {}, WBProps: {}, WBView: [], Sheets: [], CalcPr: {}, xmlns: "" }; var a = false,
            n; if (!r) r = {};
        r.biff = 12; var i = []; var s = [
            []
        ];
        s.SheetNames = [];
        s.XTI = [];
        Lr(e, function o(e, n, f) { switch (f) {
                case 156:
                    s.SheetNames.push(e.name);
                    t.Sheets.push(e); break;
                case 153:
                    t.WBProps = e; break;
                case 39:
                    if (e.Sheet != null) r.SID = e.Sheet;
                    e.Ref = Au(e.Ptg, null, null, s, r);
                    delete r.SID;
                    delete e.Ptg;
                    i.push(e); break;
                case 1036:
                    break;
                case 357:
                    ;
                case 358:
                    ;
                case 355:
                    ;
                case 667:
                    if (!s[0].length) s[0] = [f, e];
                    else s.push([f, e]);
                    s[s.length - 1].XTI = []; break;
                case 362:
                    if (s.length === 0) { s[0] = [];
                        s[0].XTI = [] } s[s.length - 1].XTI = s[s.length - 1].XTI.concat(e);
                    s.XTI = s.XTI.concat(e); break;
                case 361:
                    break;
                case 2071:
                    ;
                case 534:
                    ;
                case 677:
                    ;
                case 158:
                    ;
                case 157:
                    ;
                case 610:
                    ;
                case 2050:
                    ;
                case 155:
                    ;
                case 548:
                    ;
                case 676:
                    ;
                case 128:
                    ;
                case 665:
                    ;
                case 2128:
                    ;
                case 2125:
                    ;
                case 549:
                    ;
                case 2053:
                    ;
                case 596:
                    ;
                case 2076:
                    ;
                case 2075:
                    ;
                case 2082:
                    ;
                case 397:
                    ;
                case 154:
                    ;
                case 1117:
                    ;
                case 553:
                    ;
                case 2091:
                    break;
                case 35:
                    a = true; break;
                case 36:
                    a = false; break;
                case 37:
                    break;
                case 38:
                    break;
                case 16:
                    break;
                default:
                    if ((n || "").indexOf("Begin") > 0) {} else if ((n || "").indexOf("End") > 0) {} else if (!a || r.WTF) throw new Error("Unexpected record " + f + " " + n); } }, r);
        Xd(t);
        t.Names = i;
        t.supbooks = s; return t }

    function ov(e, r, t) { Ur(e, "BrtBeginBundleShs"); for (var a = 0; a != r.SheetNames.length; ++a) { var n = r.Workbook && r.Workbook.Sheets && r.Workbook.Sheets[a] && r.Workbook.Sheets[a].Hidden || 0; var i = { Hidden: n, iTabID: a + 1, strRelID: "rId" + (a + 1), name: r.SheetNames[a] };
            Ur(e, "BrtBundleSh", rv(i)) } Ur(e, "BrtEndBundleShs") }

    function fv(e, t) { if (!t) t = Nr(127); for (var a = 0; a != 4; ++a) t._W(4, 0);
        pt("SheetJS", t);
        pt(r.version, t);
        pt(r.version, t);
        pt("7262", t);
        t.length = t.l; return t.length > t.l ? t.slice(0, t.l) : t }

    function lv(e, r) { if (!r) r = Nr(29);
        r._W(-4, 0);
        r._W(-4, 460);
        r._W(4, 28800);
        r._W(4, 17600);
        r._W(4, 500);
        r._W(4, e);
        r._W(4, e); var t = 120;
        r._W(1, t); return r.length > r.l ? r.slice(0, r.l) : r }

    function cv(e, r, t) { if (!r.Workbook || !r.Workbook.Sheets) return; var a = r.Workbook.Sheets; var n = 0,
            i = -1,
            s = -1; for (; n < a.length; ++n) { if (!a[n] || !a[n].Hidden && i == -1) i = n;
            else if (a[n].Hidden == 1 && s == -1) s = n } if (s > i) return;
        Ur(e, "BrtBeginBookViews");
        Ur(e, "BrtBookView", lv(i));
        Ur(e, "BrtEndBookViews") }

    function uv(e, r) { if (!r) r = Nr(26);
        r._W(4, 0);
        r._W(4, 1);
        r._W(4, 0);
        Ut(0, r);
        r._W(-4, 1023);
        r._W(1, 51);
        r._W(1, 0); return r }

    function hv(e, r) { if (!r) r = Nr(1);
        r._W(1, 0); return r }

    function dv(e, r) { var t = Mr();
        Ur(t, "BrtBeginBook");
        Ur(t, "BrtFileVersion", fv());
        Ur(t, "BrtWbProp", av(e.Workbook && e.Workbook.WBProps || null));
        cv(t, e, r);
        ov(t, e, r);
        Ur(t, "BrtEndBook"); return t.end() }

    function vv(e, r, t) { if (r.slice(-4) === ".bin") return sv(e, t); return Qd(e, t) }

    function pv(e, r, t, a, n, i, s, o) { if (r.slice(-4) === ".bin") return md(e, a, t, n, i, s, o); return dh(e, a, t, n, i, s, o) }

    function bv(e, r, t, a, n, i, s, o) { if (r.slice(-4) === ".bin") return Pd(e, a, t, n, i, s, o); return Dd(e, a, t, n, i, s, o) }

    function mv(e, r, t, a, n, i, s, o) { if (r.slice(-4) === ".bin") return Rl(e, a, t, n, i, s, o); return Dl(e, a, t, n, i, s, o) }

    function gv(e, r, t, a, n, i, s, o) { if (r.slice(-4) === ".bin") return Al(e, a, t, n, i, s, o); return yl(e, a, t, n, i, s, o) }

    function Ev(e, r, t, a) { if (r.slice(-4) === ".bin") return Af(e, t, a); return uf(e, t, a) }

    function kv(e, r, t) { return $f(e, t) }

    function wv(e, r, t) { if (r.slice(-4) === ".bin") return ao(e, t); return qs(e, t) }

    function Sv(e, r, t) { if (r.slice(-4) === ".bin") return Cl(e, t); return ml(e, t) }

    function _v(e, r, t) { if (r.slice(-4) === ".bin") return fl(e, r, t); return il(e, r, t) }

    function Cv(e, r, t) { if (r.slice(-4) === ".bin") return ul(e, r, t); return cl(e, r, t) }

    function Bv(e, r, t) { return (r.slice(-4) === ".bin" ? dv : qd)(e, t) }

    function Tv(e, r, t, a, n) { return (r.slice(-4) === ".bin" ? Id : Rh)(e, t, a, n) }

    function xv(e, r, t, a, n) { return (r.slice(-4) === ".bin" ? Nd : Od)(e, t, a, n) }

    function Iv(e, r, t) { return (r.slice(-4) === ".bin" ? Hf : df)(e, t) }

    function Av(e, r, t) { return (r.slice(-4) === ".bin" ? so : ro)(e, t) }

    function yv(e, r, t) { return (r.slice(-4) === ".bin" ? Bl : El)(e, t) }
    var Rv = /([\w:]+)=((?:")([^"]*)(?:")|(?:')([^']*)(?:'))/g;
    var Dv = /([\w:]+)=((?:")(?:[^"]*)(?:")|(?:')(?:[^']*)(?:'))/;
    var Ov = function(e) { return String.fromCharCode(e) };

    function Fv(e, r) { var t = e.split(/\s+/); var a = []; if (!r) a[0] = t[0]; if (t.length === 1) return a; var n = e.match(Rv),
            i, s, o, f; if (n)
            for (f = 0; f != n.length; ++f) { i = n[f].match(Dv); if ((s = i[1].indexOf(":")) === -1) a[i[1]] = i[2].substr(1, i[2].length - 2);
                else { if (i[1].substr(0, 6) === "xmlns:") o = "xmlns" + i[1].substr(6);
                    else o = i[1].substr(s + 1);
                    a[o] = i[2].substr(1, i[2].length - 2) } }
        return a }

    function Pv(e) { var r = e.split(/\s+/); var t = {}; if (r.length === 1) return t; var a = e.match(Rv),
            n, i, s, o; if (a)
            for (o = 0; o != a.length; ++o) { n = a[o].match(Dv); if ((i = n[1].indexOf(":")) === -1) t[n[1]] = n[2].substr(1, n[2].length - 2);
                else { if (n[1].substr(0, 6) === "xmlns:") s = "xmlns" + n[1].substr(6);
                    else s = n[1].substr(i + 1);
                    t[s] = n[2].substr(1, n[2].length - 2) } }
        return t }

    function Nv(e, r) { var t = A[e] || we(e); if (t === "General") return x._general(r); return x.format(t, r) }

    function Lv(e, r, t, a) { var n = a; switch ((t[0].match(/dt:dt="([\w.]+)"/) || ["", ""])[1]) {
            case "boolean":
                n = Re(a); break;
            case "i2":
                ;
            case "int":
                n = parseInt(a, 10); break;
            case "r4":
                ;
            case "float":
                n = parseFloat(a); break;
            case "date":
                ;
            case "dateTime.tz":
                n = K(a); break;
            case "i8":
                ;
            case "string":
                ;
            case "fixed":
                ;
            case "uuid":
                ;
            case "bin.base64":
                break;
            default:
                throw new Error("bad custprop:" + t[0]); } e[we(r)] = n }

    function Mv(e, r, t) { if (e.t === "z") return; if (!t || t.cellText !== false) try { if (e.t === "e") { e.w = e.w || Ht[e.v] } else if (r === "General") { if (e.t === "n") { if ((e.v | 0) === e.v) e.w = x._general_int(e.v);
                    else e.w = x._general_num(e.v) } else e.w = x._general(e.v) } else e.w = Nv(r || "General", e.v) } catch (a) { if (t.WTF) throw a }
        try { var n = A[r] || r || "General"; if (t.cellNF) e.z = n; if (t.cellDates && e.t == "n" && x.is_date(n)) { var i = x.parse_date_code(e.v); if (i) { e.t = "d";
                    e.v = new Date(i.y, i.m - 1, i.d, i.H, i.M, i.S, i.u) } } } catch (a) { if (t.WTF) throw a } }

    function Uv(e, r, t) { if (t.cellStyles) { if (r.Interior) { var a = r.Interior; if (a.Pattern) a.patternType = ef[a.Pattern] || a.Pattern } } e[r.ID] = r }

    function Hv(e, r, t, a, n, i, s, o, f, l) { var c = "General",
            u = a.StyleID,
            h = {};
        l = l || {}; var d = []; var v = 0; if (u === undefined && o) u = o.StyleID; if (u === undefined && s) u = s.StyleID; while (i[u] !== undefined) { if (i[u].nf) c = i[u].nf; if (i[u].Interior) d.push(i[u].Interior); if (!i[u].Parent) break;
            u = i[u].Parent } switch (t.Type) {
            case "Boolean":
                a.t = "b";
                a.v = Re(e); break;
            case "String":
                a.t = "s";
                a.r = Ae(we(e));
                a.v = e.indexOf("<") > -1 ? we(r) : a.r; break;
            case "DateTime":
                if (e.slice(-1) != "Z") e += "Z";
                a.v = (K(e) - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1e3); if (a.v !== a.v) a.v = we(e);
                else if (a.v < 60) a.v = a.v - 1; if (!c || c == "General") c = "yyyy-mm-dd";
            case "Number":
                if (a.v === undefined) a.v = +e; if (!a.t) a.t = "n"; break;
            case "Error":
                a.t = "e";
                a.v = Wt[e]; if (l.cellText !== false) a.w = e; break;
            default:
                a.t = "s";
                a.v = Ae(r || e); break; } Mv(a, c, l); if (l.cellFormula !== false) { if (a.Formula) { var p = we(a.Formula); if (p.charCodeAt(0) == 61) p = p.substr(1);
                a.f = Ol(p, n);
                delete a.Formula; if (a.ArrayRange == "RC") a.F = Ol("RC:RC", n);
                else if (a.ArrayRange) { a.F = Ol(a.ArrayRange, n);
                    f.push([ot(a.F), a.F]) } } else { for (v = 0; v < f.length; ++v)
                    if (n.r >= f[v][0].s.r && n.r <= f[v][0].e.r)
                        if (n.c >= f[v][0].s.c && n.c <= f[v][0].e.c) a.F = f[v][1] } } if (l.cellStyles) { d.forEach(function(e) { if (!h.patternType && e.patternType) h.patternType = e.patternType });
            a.s = h } if (a.StyleID !== undefined) a.ixfe = a.StyleID }

    function Wv(e) { e.t = e.v || "";
        e.t = e.t.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        e.v = e.w = e.ixfe = undefined }

    function Vv(e) { if (E && Buffer.isBuffer(e)) return e.toString("utf8"); if (typeof e === "string") return e; throw new Error("Bad input format: expected Buffer or string") }
    var zv = /<(\/?)([^\s?>!\/:]*:|)([^\s?>]*[^\s?>\/])[^>]*>/gm;

    function Xv(e, r) {
        var t = r || {};
        I(x);
        var a = v(Vv(e));
        if (t.type == "binary" || t.type == "array" || t.type == "base64") { if (typeof cptable !== "undefined") a = cptable.utils.decode(65001, u(a));
            else a = De(a) }
        var n = a.slice(0, 1024).toLowerCase(),
            i = false;
        if (n.indexOf("<?xml") == -1)["html", "table", "head", "meta", "script", "style", "div"].forEach(function(e) { if (n.indexOf("<" + e) >= 0) i = true });
        if (i) return yp.to_workbook(a, t);
        var s;
        var o = [],
            f;
        if (b != null && t.dense == null) t.dense = b;
        var l = {},
            c = [],
            h = t.dense ? [] : {},
            d = "";
        var p = {},
            m = {},
            g = {};
        var E = Fv('<Data ss:Type="String">'),
            k = 0;
        var w = 0,
            S = 0;
        var _ = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } };
        var C = {},
            B = {};
        var T = "",
            y = 0;
        var R = [];
        var D = {},
            O = {},
            F = 0,
            P = [];
        var N = [],
            L = {};
        var M = [],
            U, H = false;
        var W = [];
        var V = [],
            z = {},
            X = 0,
            G = 0;
        var j = { Sheets: [], WBProps: { date1904: false } },
            K = {};
        zv.lastIndex = 0;
        a = a.replace(/<!--([\s\S]*?)-->/gm, "");
        while (s = zv.exec(a)) switch (s[3]) {
            case "Data":
                if (o[o.length - 1][1]) break;
                if (s[1] === "/") Hv(a.slice(k, s.index), T, E, o[o.length - 1][0] == "Comment" ? L : m, { c: w, r: S }, C, M[w], g, W, t);
                else { T = "";
                    E = Fv(s[0]);
                    k = s.index + s[0].length }
                break;
            case "Cell":
                if (s[1] === "/") { if (N.length > 0) m.c = N; if ((!t.sheetRows || t.sheetRows > S) && m.v !== undefined) { if (t.dense) { if (!h[S]) h[S] = [];
                            h[S][w] = m } else h[Qr(w) + Kr(S)] = m } if (m.HRef) { m.l = { Target: m.HRef }; if (m.HRefScreenTip) m.l.Tooltip = m.HRefScreenTip;
                        delete m.HRef;
                        delete m.HRefScreenTip } if (m.MergeAcross || m.MergeDown) { X = w + (parseInt(m.MergeAcross, 10) | 0);
                        G = S + (parseInt(m.MergeDown, 10) | 0);
                        R.push({ s: { c: w, r: S }, e: { c: X, r: G } }) } if (!t.sheetStubs) { if (m.MergeAcross) w = X + 1;
                        else ++w } else if (m.MergeAcross || m.MergeDown) { for (var Y = w; Y <= X; ++Y) { for (var Z = S; Z <= G; ++Z) { if (Y > w || Z > S) { if (t.dense) { if (!h[Z]) h[Z] = [];
                                        h[Z][Y] = { t: "z" } } else h[Qr(Y) + Kr(Z)] = { t: "z" } } } } w = X + 1 } else ++w } else { m = Pv(s[0]); if (m.Index) w = +m.Index - 1; if (w < _.s.c) _.s.c = w; if (w > _.e.c) _.e.c = w; if (s[0].slice(-2) === "/>") ++w;
                    N = [] }
                break;
            case "Row":
                if (s[1] === "/" || s[0].slice(-2) === "/>") { if (S < _.s.r) _.s.r = S; if (S > _.e.r) _.e.r = S; if (s[0].slice(-2) === "/>") { g = Fv(s[0]); if (g.Index) S = +g.Index - 1 } w = 0;++S } else { g = Fv(s[0]); if (g.Index) S = +g.Index - 1;
                    z = {}; if (g.AutoFitHeight == "0" || g.Height) { z.hpx = parseInt(g.Height, 10);
                        z.hpt = Jo(z.hpx);
                        V[S] = z } if (g.Hidden == "1") { z.hidden = true;
                        V[S] = z } }
                break;
            case "Worksheet":
                if (s[1] === "/") { if ((f = o.pop())[0] !== s[3]) throw new Error("Bad state: " + f.join("|"));
                    c.push(d); if (_.s.r <= _.e.r && _.s.c <= _.e.c) h["!ref"] = st(_); if (R.length) h["!merges"] = R; if (M.length > 0) h["!cols"] = M; if (V.length > 0) h["!rows"] = V;
                    l[d] = h } else { _ = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } };
                    S = w = 0;
                    o.push([s[3], false]);
                    f = Fv(s[0]);
                    d = we(f.Name);
                    h = t.dense ? [] : {};
                    R = [];
                    W = [];
                    V = [];
                    K = { name: d, Hidden: 0 };
                    j.Sheets.push(K) }
                break;
            case "Table":
                if (s[1] === "/") { if ((f = o.pop())[0] !== s[3]) throw new Error("Bad state: " + f.join("|")) } else if (s[0].slice(-2) == "/>") break;
                else { p = Fv(s[0]);
                    o.push([s[3], false]);
                    M = [];
                    H = false }
                break;
            case "Style":
                if (s[1] === "/") Uv(C, B, t);
                else B = Fv(s[0]);
                break;
            case "NumberFormat":
                B.nf = we(Fv(s[0]).Format || "General");
                if (A[B.nf]) B.nf = A[B.nf];
                for (var Q = 0; Q != 392; ++Q)
                    if (x._table[Q] == B.nf) break;
                if (Q == 392)
                    for (Q = 57; Q != 392; ++Q)
                        if (x._table[Q] == null) { x.load(B.nf, Q); break }
                break;
            case "Column":
                if (o[o.length - 1][0] !== "Table") break;
                U = Fv(s[0]);
                if (U.Hidden) { U.hidden = true;
                    delete U.Hidden }
                if (U.Width) U.wpx = parseInt(U.Width, 10);
                if (!H && U.wpx > 10) { H = true;
                    Ho = Lo; for (var J = 0; J < M.length; ++J)
                        if (M[J]) $o(M[J]) }
                if (H) $o(U);
                M[U.Index - 1 || M.length] = U;
                for (var q = 0; q < +U.Span; ++q) M[M.length] = $(U);
                break;
            case "NamedRange":
                if (!j.Names) j.Names = [];
                var ee = me(s[0]);
                var re = { Name: ee.Name, Ref: Ol(ee.RefersTo.substr(1), { r: 0, c: 0 }) };
                if (j.Sheets.length > 0) re.Sheet = j.Sheets.length - 1;
                j.Names.push(re);
                break;
            case "NamedCell":
                break;
            case "B":
                break;
            case "I":
                break;
            case "U":
                break;
            case "S":
                break;
            case "Sub":
                break;
            case "Sup":
                break;
            case "Span":
                break;
            case "Border":
                break;
            case "Alignment":
                break;
            case "Borders":
                break;
            case "Font":
                if (s[0].slice(-2) === "/>") break;
                else if (s[1] === "/") T += a.slice(y, s.index);
                else y = s.index + s[0].length;
                break;
            case "Interior":
                if (!t.cellStyles) break;
                B.Interior = Fv(s[0]);
                break;
            case "Protection":
                break;
            case "Author":
                ;
            case "Title":
                ;
            case "Description":
                ;
            case "Created":
                ;
            case "Keywords":
                ;
            case "Subject":
                ;
            case "Category":
                ;
            case "Company":
                ;
            case "LastAuthor":
                ;
            case "LastSaved":
                ;
            case "LastPrinted":
                ;
            case "Version":
                ;
            case "Revision":
                ;
            case "TotalTime":
                ;
            case "HyperlinkBase":
                ;
            case "Manager":
                ;
            case "ContentStatus":
                ;
            case "Identifier":
                ;
            case "Language":
                ;
            case "AppName":
                if (s[0].slice(-2) === "/>") break;
                else if (s[1] === "/") Ja(D, s[3], a.slice(F, s.index));
                else F = s.index + s[0].length;
                break;
            case "Paragraphs":
                break;
            case "Styles":
                ;
            case "Workbook":
                if (s[1] === "/") { if ((f = o.pop())[0] !== s[3]) throw new Error("Bad state: " + f.join("|")) } else o.push([s[3], false]);
                break;
            case "Comment":
                if (s[1] === "/") { if ((f = o.pop())[0] !== s[3]) throw new Error("Bad state: " + f.join("|"));
                    Wv(L);
                    N.push(L) } else { o.push([s[3], false]);
                    f = Fv(s[0]);
                    L = { a: f.Author } }
                break;
            case "AutoFilter":
                if (s[1] === "/") { if ((f = o.pop())[0] !== s[3]) throw new Error("Bad state: " + f.join("|")) } else if (s[0].charAt(s[0].length - 2) !== "/") { var te = Fv(s[0]);
                    h["!autofilter"] = { ref: Ol(te.Range).replace(/\$/g, "") };
                    o.push([s[3], true]) }
                break;
            case "Name":
                break;
            case "ComponentOptions":
                ;
            case "DocumentProperties":
                ;
            case "CustomDocumentProperties":
                ;
            case "OfficeDocumentSettings":
                ;
            case "PivotTable":
                ;
            case "PivotCache":
                ;
            case "Names":
                ;
            case "MapInfo":
                ;
            case "PageBreaks":
                ;
            case "QueryTable":
                ;
            case "DataValidation":
                ;
            case "Sorting":
                ;
            case "Schema":
                ;
            case "data":
                ;
            case "ConditionalFormatting":
                ;
            case "SmartTagType":
                ;
            case "SmartTags":
                ;
            case "ExcelWorkbook":
                ;
            case "WorkbookOptions":
                ;
            case "WorksheetOptions":
                if (s[1] === "/") { if ((f = o.pop())[0] !== s[3]) throw new Error("Bad state: " + f.join("|")) } else if (s[0].charAt(s[0].length - 2) !== "/") o.push([s[3], true]);
                break;
            default:
                if (o.length == 0 && s[3] == "document") return Pp(a, t);
                if (o.length == 0 && s[3] == "UOF") return Pp(a, t);
                var ae = true;
                switch (o[o.length - 1][0]) {
                    case "OfficeDocumentSettings":
                        switch (s[3]) {
                            case "AllowPNG":
                                break;
                            case "RemovePersonalInformation":
                                break;
                            case "DownloadComponents":
                                break;
                            case "LocationOfComponents":
                                break;
                            case "Colors":
                                break;
                            case "Color":
                                break;
                            case "Index":
                                break;
                            case "RGB":
                                break;
                            case "PixelsPerInch":
                                break;
                            case "TargetScreenSize":
                                break;
                            case "ReadOnlyRecommended":
                                break;
                            default:
                                ae = false; }
                        break;
                    case "ComponentOptions":
                        switch (s[3]) {
                            case "Toolbar":
                                break;
                            case "HideOfficeLogo":
                                break;
                            case "SpreadsheetAutoFit":
                                break;
                            case "Label":
                                break;
                            case "Caption":
                                break;
                            case "MaxHeight":
                                break;
                            case "MaxWidth":
                                break;
                            case "NextSheetNumber":
                                break;
                            default:
                                ae = false; }
                        break;
                    case "ExcelWorkbook":
                        switch (s[3]) {
                            case "Date1904":
                                j.WBProps.date1904 = true; break;
                            case "WindowHeight":
                                break;
                            case "WindowWidth":
                                break;
                            case "WindowTopX":
                                break;
                            case "WindowTopY":
                                break;
                            case "TabRatio":
                                break;
                            case "ProtectStructure":
                                break;
                            case "ProtectWindows":
                                break;
                            case "ActiveSheet":
                                break;
                            case "DisplayInkNotes":
                                break;
                            case "FirstVisibleSheet":
                                break;
                            case "SupBook":
                                break;
                            case "SheetName":
                                break;
                            case "SheetIndex":
                                break;
                            case "SheetIndexFirst":
                                break;
                            case "SheetIndexLast":
                                break;
                            case "Dll":
                                break;
                            case "AcceptLabelsInFormulas":
                                break;
                            case "DoNotSaveLinkValues":
                                break;
                            case "Iteration":
                                break;
                            case "MaxIterations":
                                break;
                            case "MaxChange":
                                break;
                            case "Path":
                                break;
                            case "Xct":
                                break;
                            case "Count":
                                break;
                            case "SelectedSheets":
                                break;
                            case "Calculation":
                                break;
                            case "Uncalced":
                                break;
                            case "StartupPrompt":
                                break;
                            case "Crn":
                                break;
                            case "ExternName":
                                break;
                            case "Formula":
                                break;
                            case "ColFirst":
                                break;
                            case "ColLast":
                                break;
                            case "WantAdvise":
                                break;
                            case "Boolean":
                                break;
                            case "Error":
                                break;
                            case "Text":
                                break;
                            case "OLE":
                                break;
                            case "NoAutoRecover":
                                break;
                            case "PublishObjects":
                                break;
                            case "DoNotCalculateBeforeSave":
                                break;
                            case "Number":
                                break;
                            case "RefModeR1C1":
                                break;
                            case "EmbedSaveSmartTags":
                                break;
                            default:
                                ae = false; }
                        break;
                    case "WorkbookOptions":
                        switch (s[3]) {
                            case "OWCVersion":
                                break;
                            case "Height":
                                break;
                            case "Width":
                                break;
                            default:
                                ae = false; }
                        break;
                    case "WorksheetOptions":
                        switch (s[3]) {
                            case "Visible":
                                if (s[0].slice(-2) === "/>") {} else if (s[1] === "/") switch (a.slice(F, s.index)) {
                                    case "SheetHidden":
                                        K.Hidden = 1; break;
                                    case "SheetVeryHidden":
                                        K.Hidden = 2; break; } else F = s.index + s[0].length; break;
                            case "Header":
                                if (!h["!margins"]) eh(h["!margins"] = {}, "xlml");
                                h["!margins"].header = me(s[0]).Margin; break;
                            case "Footer":
                                if (!h["!margins"]) eh(h["!margins"] = {}, "xlml");
                                h["!margins"].footer = me(s[0]).Margin; break;
                            case "PageMargins":
                                var ne = me(s[0]); if (!h["!margins"]) eh(h["!margins"] = {}, "xlml"); if (ne.Top) h["!margins"].top = ne.Top; if (ne.Left) h["!margins"].left = ne.Left; if (ne.Right) h["!margins"].right = ne.Right; if (ne.Bottom) h["!margins"].bottom = ne.Bottom; break;
                            case "DisplayRightToLeft":
                                if (!j.Views) j.Views = []; if (!j.Views[0]) j.Views[0] = {};
                                j.Views[0].RTL = true; break;
                            case "Unsynced":
                                break;
                            case "Print":
                                break;
                            case "Panes":
                                break;
                            case "Scale":
                                break;
                            case "Pane":
                                break;
                            case "Number":
                                break;
                            case "Layout":
                                break;
                            case "PageSetup":
                                break;
                            case "Selected":
                                break;
                            case "ProtectObjects":
                                break;
                            case "EnableSelection":
                                break;
                            case "ProtectScenarios":
                                break;
                            case "ValidPrinterInfo":
                                break;
                            case "HorizontalResolution":
                                break;
                            case "VerticalResolution":
                                break;
                            case "NumberofCopies":
                                break;
                            case "ActiveRow":
                                break;
                            case "ActiveCol":
                                break;
                            case "ActivePane":
                                break;
                            case "TopRowVisible":
                                break;
                            case "TopRowBottomPane":
                                break;
                            case "LeftColumnVisible":
                                break;
                            case "LeftColumnRightPane":
                                break;
                            case "FitToPage":
                                break;
                            case "RangeSelection":
                                break;
                            case "PaperSizeIndex":
                                break;
                            case "PageLayoutZoom":
                                break;
                            case "PageBreakZoom":
                                break;
                            case "FilterOn":
                                break;
                            case "DoNotDisplayGridlines":
                                break;
                            case "SplitHorizontal":
                                break;
                            case "SplitVertical":
                                break;
                            case "FreezePanes":
                                break;
                            case "FrozenNoSplit":
                                break;
                            case "FitWidth":
                                break;
                            case "FitHeight":
                                break;
                            case "CommentsLayout":
                                break;
                            case "Zoom":
                                break;
                            case "LeftToRight":
                                break;
                            case "Gridlines":
                                break;
                            case "AllowSort":
                                break;
                            case "AllowFilter":
                                break;
                            case "AllowInsertRows":
                                break;
                            case "AllowDeleteRows":
                                break;
                            case "AllowInsertCols":
                                break;
                            case "AllowDeleteCols":
                                break;
                            case "AllowInsertHyperlinks":
                                break;
                            case "AllowFormatCells":
                                break;
                            case "AllowSizeCols":
                                break;
                            case "AllowSizeRows":
                                break;
                            case "NoSummaryRowsBelowDetail":
                                break;
                            case "TabColorIndex":
                                break;
                            case "DoNotDisplayHeadings":
                                break;
                            case "ShowPageLayoutZoom":
                                break;
                            case "NoSummaryColumnsRightDetail":
                                break;
                            case "BlackAndWhite":
                                break;
                            case "DoNotDisplayZeros":
                                break;
                            case "DisplayPageBreak":
                                break;
                            case "RowColHeadings":
                                break;
                            case "DoNotDisplayOutline":
                                break;
                            case "NoOrientation":
                                break;
                            case "AllowUsePivotTables":
                                break;
                            case "ZeroHeight":
                                break;
                            case "ViewableRange":
                                break;
                            case "Selection":
                                break;
                            case "ProtectContents":
                                break;
                            default:
                                ae = false; }
                        break;
                    case "PivotTable":
                        ;
                    case "PivotCache":
                        switch (s[3]) {
                            case "ImmediateItemsOnDrop":
                                break;
                            case "ShowPageMultipleItemLabel":
                                break;
                            case "CompactRowIndent":
                                break;
                            case "Location":
                                break;
                            case "PivotField":
                                break;
                            case "Orientation":
                                break;
                            case "LayoutForm":
                                break;
                            case "LayoutSubtotalLocation":
                                break;
                            case "LayoutCompactRow":
                                break;
                            case "Position":
                                break;
                            case "PivotItem":
                                break;
                            case "DataType":
                                break;
                            case "DataField":
                                break;
                            case "SourceName":
                                break;
                            case "ParentField":
                                break;
                            case "PTLineItems":
                                break;
                            case "PTLineItem":
                                break;
                            case "CountOfSameItems":
                                break;
                            case "Item":
                                break;
                            case "ItemType":
                                break;
                            case "PTSource":
                                break;
                            case "CacheIndex":
                                break;
                            case "ConsolidationReference":
                                break;
                            case "FileName":
                                break;
                            case "Reference":
                                break;
                            case "NoColumnGrand":
                                break;
                            case "NoRowGrand":
                                break;
                            case "BlankLineAfterItems":
                                break;
                            case "Hidden":
                                break;
                            case "Subtotal":
                                break;
                            case "BaseField":
                                break;
                            case "MapChildItems":
                                break;
                            case "Function":
                                break;
                            case "RefreshOnFileOpen":
                                break;
                            case "PrintSetTitles":
                                break;
                            case "MergeLabels":
                                break;
                            case "DefaultVersion":
                                break;
                            case "RefreshName":
                                break;
                            case "RefreshDate":
                                break;
                            case "RefreshDateCopy":
                                break;
                            case "VersionLastRefresh":
                                break;
                            case "VersionLastUpdate":
                                break;
                            case "VersionUpdateableMin":
                                break;
                            case "VersionRefreshableMin":
                                break;
                            case "Calculation":
                                break;
                            default:
                                ae = false;
                        }
                        break;
                    case "PageBreaks":
                        switch (s[3]) {
                            case "ColBreaks":
                                break;
                            case "ColBreak":
                                break;
                            case "RowBreaks":
                                break;
                            case "RowBreak":
                                break;
                            case "ColStart":
                                break;
                            case "ColEnd":
                                break;
                            case "RowEnd":
                                break;
                            default:
                                ae = false; }
                        break;
                    case "AutoFilter":
                        switch (s[3]) {
                            case "AutoFilterColumn":
                                break;
                            case "AutoFilterCondition":
                                break;
                            case "AutoFilterAnd":
                                break;
                            case "AutoFilterOr":
                                break;
                            default:
                                ae = false; }
                        break;
                    case "QueryTable":
                        switch (s[3]) {
                            case "Id":
                                break;
                            case "AutoFormatFont":
                                break;
                            case "AutoFormatPattern":
                                break;
                            case "QuerySource":
                                break;
                            case "QueryType":
                                break;
                            case "EnableRedirections":
                                break;
                            case "RefreshedInXl9":
                                break;
                            case "URLString":
                                break;
                            case "HTMLTables":
                                break;
                            case "Connection":
                                break;
                            case "CommandText":
                                break;
                            case "RefreshInfo":
                                break;
                            case "NoTitles":
                                break;
                            case "NextId":
                                break;
                            case "ColumnInfo":
                                break;
                            case "OverwriteCells":
                                break;
                            case "DoNotPromptForFile":
                                break;
                            case "TextWizardSettings":
                                break;
                            case "Source":
                                break;
                            case "Number":
                                break;
                            case "Decimal":
                                break;
                            case "ThousandSeparator":
                                break;
                            case "TrailingMinusNumbers":
                                break;
                            case "FormatSettings":
                                break;
                            case "FieldType":
                                break;
                            case "Delimiters":
                                break;
                            case "Tab":
                                break;
                            case "Comma":
                                break;
                            case "AutoFormatName":
                                break;
                            case "VersionLastEdit":
                                break;
                            case "VersionLastRefresh":
                                break;
                            default:
                                ae = false; }
                        break;
                    case "Sorting":
                        ;
                    case "ConditionalFormatting":
                        ;
                    case "DataValidation":
                        switch (s[3]) {
                            case "Range":
                                break;
                            case "Type":
                                break;
                            case "Min":
                                break;
                            case "Max":
                                break;
                            case "Sort":
                                break;
                            case "Descending":
                                break;
                            case "Order":
                                break;
                            case "CaseSensitive":
                                break;
                            case "Value":
                                break;
                            case "ErrorStyle":
                                break;
                            case "ErrorMessage":
                                break;
                            case "ErrorTitle":
                                break;
                            case "CellRangeList":
                                break;
                            case "InputMessage":
                                break;
                            case "InputTitle":
                                break;
                            case "ComboHide":
                                break;
                            case "InputHide":
                                break;
                            case "Condition":
                                break;
                            case "Qualifier":
                                break;
                            case "UseBlank":
                                break;
                            case "Value1":
                                break;
                            case "Value2":
                                break;
                            case "Format":
                                break;
                            default:
                                ae = false; }
                        break;
                    case "MapInfo":
                        ;
                    case "Schema":
                        ;
                    case "data":
                        switch (s[3]) {
                            case "Map":
                                break;
                            case "Entry":
                                break;
                            case "Range":
                                break;
                            case "XPath":
                                break;
                            case "Field":
                                break;
                            case "XSDType":
                                break;
                            case "FilterOn":
                                break;
                            case "Aggregate":
                                break;
                            case "ElementType":
                                break;
                            case "AttributeType":
                                break;
                            case "schema":
                                ;
                            case "element":
                                ;
                            case "complexType":
                                ;
                            case "datatype":
                                ;
                            case "all":
                                ;
                            case "attribute":
                                ;
                            case "extends":
                                break;
                            case "row":
                                break;
                            default:
                                ae = false; }
                        break;
                    case "SmartTags":
                        break;
                    default:
                        ae = false;
                        break;
                }
                if (ae) break;
                if (!o[o.length - 1][1]) throw "Unrecognized tag: " + s[3] + "|" + o.join("|");
                if (o[o.length - 1][0] === "CustomDocumentProperties") { if (s[0].slice(-2) === "/>") break;
                    else if (s[1] === "/") Lv(O, s[3], P, a.slice(F, s.index));
                    else { P = s;
                        F = s.index + s[0].length } break }
                if (t.WTF) throw "Unrecognized tag: " + s[3] + "|" + o.join("|");
        }
        var ie = {};
        if (!t.bookSheets && !t.bookProps) ie.Sheets = l;
        ie.SheetNames = c;
        ie.Workbook = j;
        ie.SSF = x.get_table();
        ie.Props = D;
        ie.Custprops = O;
        return ie
    }

    function Gv(e, r) { Qp(r = r || {}); switch (r.type || "base64") {
            case "base64":
                return Xv(g.decode(e), r);
            case "binary":
                ;
            case "buffer":
                ;
            case "file":
                return Xv(e, r);
            case "array":
                return Xv(_(e), r); } }

    function jv(e, r) { var t = []; if (e.Props) t.push(qa(e.Props, r)); if (e.Custprops) t.push(en(e.Props, e.Custprops, r)); return t.join("") }

    function Kv(e, r) { return "" }

    function Yv(e, r) { var t = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
        r.cellXfs.forEach(function(e, r) { var a = [];
            a.push(je("NumberFormat", null, { "ss:Format": Ce(x._table[e.numFmtId]) }));
            t.push(je("Style", a.join(""), { "ss:ID": "s" + (21 + r) })) }); return je("Styles", t.join("")) }

    function $v(e) { return je("NamedRange", null, { "ss:Name": e.Name, "ss:RefersTo": "=" + Pl(e.Ref, { r: 0, c: 0 }) }) }

    function Zv(e, r) { if (!((e || {}).Workbook || {}).Names) return ""; var t = e.Workbook.Names; var a = []; for (var n = 0; n < t.length; ++n) { var i = t[n]; if (i.Sheet != null) continue; if (i.Name.match(/^_xlfn\./)) continue;
            a.push($v(i)) } return je("Names", a.join("")) }

    function Qv(e, r, t, a) { if (!e) return ""; if (!((a || {}).Workbook || {}).Names) return ""; var n = a.Workbook.Names; var i = [];
        e: for (var s = 0; s < n.length; ++s) { var o = n[s]; if (o.Sheet != t) continue; if (o.Name.match(/^_xlfn\./)) continue;
            i.push($v(o)) }
        return i.join("") }

    function Jv(e, r, t, a) { if (!e) return ""; var n = []; if (e["!margins"]) { n.push("<PageSetup>"); if (e["!margins"].header) n.push(je("Header", null, { "x:Margin": e["!margins"].header })); if (e["!margins"].footer) n.push(je("Footer", null, { "x:Margin": e["!margins"].footer }));
            n.push(je("PageMargins", null, { "x:Bottom": e["!margins"].bottom || "0.75", "x:Left": e["!margins"].left || "0.7", "x:Right": e["!margins"].right || "0.7", "x:Top": e["!margins"].top || "0.75" }));
            n.push("</PageSetup>") } if (a && a.Workbook && a.Workbook.Sheets && a.Workbook.Sheets[t]) { if (a.Workbook.Sheets[t].Hidden) n.push(je("Visible", a.Workbook.Sheets[t].Hidden == 1 ? "SheetHidden" : "SheetVeryHidden", {}));
            else { for (var i = 0; i < t; ++i)
                    if (a.Workbook.Sheets[i] && !a.Workbook.Sheets[i].Hidden) break; if (i == t) n.push("<Selected/>") } } if (((((a || {}).Workbook || {}).Views || [])[0] || {}).RTL) n.push("<DisplayRightToLeft/>"); if (e["!protect"]) { n.push(Xe("ProtectContents", "True")); if (e["!protect"].objects) n.push(Xe("ProtectObjects", "True")); if (e["!protect"].scenarios) n.push(Xe("ProtectScenarios", "True")); if (e["!protect"].selectLockedCells != null && !e["!protect"].selectLockedCells) n.push(Xe("EnableSelection", "NoSelection"));
            else if (e["!protect"].selectUnlockedCells != null && !e["!protect"].selectUnlockedCells) n.push(Xe("EnableSelection", "UnlockedCells"));
            [
                ["formatCells", "AllowFormatCells"],
                ["formatColumns", "AllowSizeCols"],
                ["formatRows", "AllowSizeRows"],
                ["insertColumns", "AllowInsertCols"],
                ["insertRows", "AllowInsertRows"],
                ["insertHyperlinks", "AllowInsertHyperlinks"],
                ["deleteColumns", "AllowDeleteCols"],
                ["deleteRows", "AllowDeleteRows"],
                ["sort", "AllowSort"],
                ["autoFilter", "AllowFilter"],
                ["pivotTables", "AllowUsePivotTables"]
            ].forEach(function(r) { if (e["!protect"][r[0]]) n.push("<" + r[1] + "/>") }) } if (n.length == 0) return ""; return je("WorksheetOptions", n.join(""), { xmlns: Ze.x }) }

    function qv(e) { return e.map(function(e) { var r = ye(e.t || ""); var t = je("ss:Data", r, { xmlns: "http://www.w3.org/TR/REC-html40" }); return je("Comment", t, { "ss:Author": e.a }) }).join("") }

    function ep(e, r, t, a, n, i, s) { if (!e || e.v == undefined && e.f == undefined) return ""; var o = {}; if (e.f) o["ss:Formula"] = "=" + Ce(Pl(e.f, s)); if (e.F && e.F.substr(0, r.length) == r) { var f = rt(e.F.substr(r.length + 1));
            o["ss:ArrayRange"] = "RC:R" + (f.r == s.r ? "" : "[" + (f.r - s.r) + "]") + "C" + (f.c == s.c ? "" : "[" + (f.c - s.c) + "]") } if (e.l && e.l.Target) { o["ss:HRef"] = Ce(e.l.Target); if (e.l.Tooltip) o["x:HRefScreenTip"] = Ce(e.l.Tooltip) } if (t["!merges"]) { var l = t["!merges"]; for (var c = 0; c != l.length; ++c) { if (l[c].s.c != s.c || l[c].s.r != s.r) continue; if (l[c].e.c > l[c].s.c) o["ss:MergeAcross"] = l[c].e.c - l[c].s.c; if (l[c].e.r > l[c].s.r) o["ss:MergeDown"] = l[c].e.r - l[c].s.r } } var u = "",
            h = ""; switch (e.t) {
            case "z":
                return "";
            case "n":
                u = "Number";
                h = String(e.v); break;
            case "b":
                u = "Boolean";
                h = e.v ? "1" : "0"; break;
            case "e":
                u = "Error";
                h = Ht[e.v]; break;
            case "d":
                u = "DateTime";
                h = new Date(e.v).toISOString(); if (e.z == null) e.z = e.z || x._table[14]; break;
            case "s":
                u = "String";
                h = Ie(e.v || ""); break; } var d = rh(a.cellXfs, e, a);
        o["ss:StyleID"] = "s" + (21 + d);
        o["ss:Index"] = s.c + 1; var v = e.v != null ? h : ""; var p = '<Data ss:Type="' + u + '">' + v + "</Data>"; if ((e.c || []).length > 0) p += qv(e.c); return je("Cell", p, o) }

    function rp(e, r) { var t = '<Row ss:Index="' + (e + 1) + '"'; if (r) { if (r.hpt && !r.hpx) r.hpx = qo(r.hpt); if (r.hpx) t += ' ss:AutoFitHeight="0" ss:Height="' + r.hpx + '"'; if (r.hidden) t += ' ss:Hidden="1"' } return t + ">" }

    function tp(e, r, t, a) { if (!e["!ref"]) return ""; var n = ot(e["!ref"]); var i = e["!merges"] || [],
            s = 0; var o = []; if (e["!cols"]) e["!cols"].forEach(function(e, r) { $o(e); var t = !!e.width; var a = qu(r, e); var n = { "ss:Index": r + 1 }; if (t) n["ss:Width"] = Wo(a.width); if (e.hidden) n["ss:Hidden"] = "1";
            o.push(je("Column", null, n)) }); var f = Array.isArray(e); for (var l = n.s.r; l <= n.e.r; ++l) { var c = [rp(l, (e["!rows"] || [])[l])]; for (var u = n.s.c; u <= n.e.c; ++u) { var h = false; for (s = 0; s != i.length; ++s) { if (i[s].s.c > u) continue; if (i[s].s.r > l) continue; if (i[s].e.c < u) continue; if (i[s].e.r < l) continue; if (i[s].s.c != u || i[s].s.r != l) h = true; break } if (h) continue; var d = { r: l, c: u }; var v = tt(d),
                    p = f ? (e[l] || [])[u] : e[v];
                c.push(ep(p, v, e, r, t, a, d)) } c.push("</Row>"); if (c.length > 2) o.push(c.join("")) } return o.join("") }

    function ap(e, r, t) { var a = []; var n = t.SheetNames[e]; var i = t.Sheets[n]; var s = i ? Qv(i, r, e, t) : ""; if (s.length > 0) a.push("<Names>" + s + "</Names>");
        s = i ? tp(i, r, e, t) : ""; if (s.length > 0) a.push("<Table>" + s + "</Table>");
        a.push(Jv(i, r, e, t)); return a.join("") }

    function np(e, r) { if (!r) r = {}; if (!e.SSF) e.SSF = x.get_table(); if (e.SSF) { I(x);
            x.load_table(e.SSF);
            r.revssf = M(e.SSF);
            r.revssf[e.SSF[65535]] = 0;
            r.ssf = e.SSF;
            r.cellXfs = [];
            rh(r.cellXfs, {}, { revssf: { General: 0 } }) } var t = [];
        t.push(jv(e, r));
        t.push(Kv(e, r));
        t.push("");
        t.push(""); for (var a = 0; a < e.SheetNames.length; ++a) t.push(je("Worksheet", ap(a, r, e), { "ss:Name": Ce(e.SheetNames[a]) }));
        t[2] = Yv(e, r);
        t[3] = Zv(e, r); return he + je("Workbook", t.join(""), { xmlns: Ze.ss, "xmlns:o": Ze.o, "xmlns:x": Ze.x, "xmlns:ss": Ze.ss, "xmlns:dt": Ze.dt, "xmlns:html": Ze.html }) }

    function ip(e) { var r = {}; var t = e.content;
        t.l = 28;
        r.AnsiUserType = t._R(0, "lpstr-ansi");
        r.AnsiClipboardFormat = Kt(t); if (t.length - t.l <= 4) return r; var a = t._R(4); if (a == 0 || a > 40) return r;
        t.l -= 4;
        r.Reserved1 = t._R(0, "lpstr-ansi"); if (t.length - t.l <= 4) return r;
        a = t._R(4); if (a !== 1907505652) return r;
        r.UnicodeClipboardFormat = Yt(t);
        a = t._R(4); if (a == 0 || a > 40) return r;
        t.l -= 4;
        r.Reserved2 = t._R(0, "lpwstr") }

    function sp(e, r, t, a) { var n = t; var i = []; var s = r.slice(r.l, r.l + n); if (a && a.enc && a.enc.insitu) switch (e.n) {
            case "BOF":
                ;
            case "FilePass":
                ;
            case "FileLock":
                ;
            case "InterfaceHdr":
                ;
            case "RRDInfo":
                ;
            case "RRDHead":
                ;
            case "UsrExcl":
                break;
            default:
                if (s.length === 0) break;
                a.enc.insitu(s); } i.push(s);
        r.l += n; var o = pp[wr(r, r.l)]; var f = 0; while (o != null && o.n.slice(0, 8) === "Continue") { n = wr(r, r.l + 2);
            f = r.l + 4; if (o.n == "ContinueFrt") f += 4;
            else if (o.n.slice(0, 11) == "ContinueFrt") f += 12;
            i.push(r.slice(f, r.l + 4 + n));
            r.l += 4 + n;
            o = pp[wr(r, r.l)] } var l = C(i);
        Fr(l, 0); var c = 0;
        l.lens = []; for (var u = 0; u < i.length; ++u) { l.lens.push(c);
            c += i[u].length } return e.f(l, l.length, a) }

    function op(e, r, t) { if (e.t === "z") return; if (!e.XF) return; var a = 0; try { a = e.z || e.XF.numFmtId || 0; if (r.cellNF) e.z = x._table[a] } catch (n) { if (r.WTF) throw n } if (!r || r.cellText !== false) try { if (e.t === "e") { e.w = e.w || Ht[e.v] } else if (a === 0 || a == "General") { if (e.t === "n") { if ((e.v | 0) === e.v) e.w = x._general_int(e.v);
                    else e.w = x._general_num(e.v) } else e.w = x._general(e.v) } else e.w = x.format(a, e.v, { date1904: !!t }) } catch (n) { if (r.WTF) throw n }
        if (r.cellDates && a && e.t == "n" && x.is_date(x._table[a] || String(a))) { var i = x.parse_date_code(e.v); if (i) { e.t = "d";
                e.v = new Date(i.y, i.m - 1, i.d, i.H, i.M, i.S, i.u) } } }

    function fp(e, r, t) { return { v: e, ixfe: r, t: t } }

    function lp(e, r) { var t = { opts: {} }; var a = {}; if (b != null && r.dense == null) r.dense = b; var n = r.dense ? [] : {}; var i = {}; var s = {}; var o = null; var f = []; var c = ""; var u = {}; var h, d = "",
            v, p, m, g; var E = {}; var k = []; var w; var S; var _ = true; var C = []; var B = []; var T = { Sheets: [], WBProps: { date1904: false }, Views: [{}] },
            I = {}; var A = function Ee(e) { if (e < 8) return va[e]; if (e < 64) return B[e - 8] || va[e]; return va[e] }; var y = function ke(e, r, t) { var a = r.XF.data; if (!a || !a.patternType || !t || !t.cellStyles) return;
            r.s = {};
            r.s.patternType = a.patternType; var n; if (n = Oo(A(a.icvFore))) { r.s.fgColor = { rgb: n } } if (n = Oo(A(a.icvBack))) { r.s.bgColor = { rgb: n } } }; var R = function we(e, r, t) { if (z > 1) return; if (!_) return; if (t.cellStyles && r.XF && r.XF.data) y(e, r, t);
            delete r.ixfe;
            delete r.XF;
            h = e;
            d = tt(e); if (s.s) { if (e.r < s.s.r) s.s.r = e.r; if (e.c < s.s.c) s.s.c = e.c } if (s.e) { if (e.r + 1 > s.e.r) s.e.r = e.r + 1; if (e.c + 1 > s.e.c) s.e.c = e.c + 1 } if (t.cellFormula && r.f) { for (var a = 0; a < k.length; ++a) { if (k[a][0].s.c > e.c || k[a][0].s.r > e.r) continue; if (k[a][0].e.c < e.c || k[a][0].e.r < e.r) continue;
                    r.F = st(k[a][0]); if (k[a][0].s.c != e.c || k[a][0].s.r != e.r) delete r.f; if (r.f) r.f = "" + Au(k[a][1], s, e, W, D); break } } if (t.sheetRows && h.r >= t.sheetRows) _ = false;
            else { if (t.dense) { if (!n[e.r]) n[e.r] = [];
                    n[e.r][e.c] = r } else n[d] = r } }; var D = { enc: false, sbcch: 0, snames: [], sharedf: E, arrayf: k, rrtabid: [], lastuser: "", biff: 8, codepage: 0, winlocked: 0, cellStyles: !!r && !!r.cellStyles, WTF: !!r && !!r.wtf }; if (r.password) D.password = r.password; var O; var F = []; var P = []; var N = [],
            L = []; var M = 0,
            U = 0; var H = false; var W = [];
        W.SheetNames = D.snames;
        W.sharedf = D.sharedf;
        W.arrayf = D.arrayf;
        W.names = [];
        W.XTI = []; var V = ""; var z = 0; var X = 0,
            G = []; var j = []; var K;
        D.codepage = 1200;
        l(1200); var Y = false; while (e.l < e.length - 1) { var $ = e.l; var Z = e._R(2); if (Z === 0 && V === "EOF") break; var Q = e.l === e.length ? 0 : e._R(2),
                J; var q = pp[Z]; if (q && q.f) { if (r.bookSheets) { if (V === "BoundSheet8" && q.n !== "BoundSheet8") break } V = q.n; if (q.r === 2 || q.r == 12) { var ee = e._R(2);
                    Q -= 2; if (!D.enc && ee !== Z) throw new Error("rt mismatch: " + ee + "!=" + Z); if (q.r == 12) { e.l += 10;
                        Q -= 10 } } var re; if (q.n === "EOF") re = q.f(e, Q, D);
                else re = sp(q, e, Q, D); var te = q.n; if (z == 0 && te != "BOF") continue; switch (te) {
                    case "Date1904":
                        t.opts.Date1904 = T.WBProps.date1904 = re; break;
                    case "WriteProtect":
                        t.opts.WriteProtect = true; break;
                    case "FilePass":
                        if (!D.enc) e.l = 0;
                        D.enc = re; if (D.WTF) console.error(re); if (!r.password) throw new Error("File is password-protected"); if (re.valid == null) throw new Error("Encryption scheme unsupported"); if (!re.valid) throw new Error("Password is incorrect"); break;
                    case "WriteAccess":
                        D.lastuser = re; break;
                    case "FileSharing":
                        break;
                    case "CodePage":
                        switch (re) {
                            case 21010:
                                re = 1200; break;
                            case 32768:
                                re = 1e4; break;
                            case 32769:
                                re = 1252; break; } l(D.codepage = re);
                        Y = true; break;
                    case "RRTabId":
                        D.rrtabid = re; break;
                    case "WinProtect":
                        D.winlocked = re; break;
                    case "Template":
                        break;
                    case "BookBool":
                        break;
                    case "UsesELFs":
                        break;
                    case "MTRSettings":
                        break;
                    case "RefreshAll":
                        ;
                    case "CalcCount":
                        ;
                    case "CalcDelta":
                        ;
                    case "CalcIter":
                        ;
                    case "CalcMode":
                        ;
                    case "CalcPrecision":
                        ;
                    case "CalcSaveRecalc":
                        t.opts[te] = re; break;
                    case "CalcRefMode":
                        D.CalcRefMode = re; break;
                    case "Uncalced":
                        break;
                    case "ForceFullCalculation":
                        t.opts.FullCalc = re; break;
                    case "WsBool":
                        if (re.fDialog) n["!type"] = "dialog"; break;
                    case "XF":
                        C.push(re); break;
                    case "ExtSST":
                        break;
                    case "BookExt":
                        break;
                    case "RichTextStream":
                        break;
                    case "BkHim":
                        break;
                    case "SupBook":
                        W.push([re]);
                        W[W.length - 1].XTI = []; break;
                    case "ExternName":
                        W[W.length - 1].push(re); break;
                    case "Index":
                        break;
                    case "Lbl":
                        K = { Name: re.Name, Ref: Au(re.rgce, s, null, W, D) }; if (re.itab > 0) K.Sheet = re.itab - 1;
                        W.names.push(K); if (!W[0]) { W[0] = [];
                            W[0].XTI = [] } W[W.length - 1].push(re); if (re.Name == "_xlnm._FilterDatabase" && re.itab > 0)
                            if (re.rgce && re.rgce[0] && re.rgce[0][0] && re.rgce[0][0][0] == "PtgArea3d") j[re.itab - 1] = { ref: st(re.rgce[0][0][1][2]) }; break;
                    case "ExternCount":
                        D.ExternCount = re; break;
                    case "ExternSheet":
                        if (W.length == 0) { W[0] = [];
                            W[0].XTI = [] } W[W.length - 1].XTI = W[W.length - 1].XTI.concat(re);
                        W.XTI = W.XTI.concat(re); break;
                    case "NameCmt":
                        if (D.biff < 8) break; if (K != null) K.Comment = re[1]; break;
                    case "Protect":
                        n["!protect"] = re; break;
                    case "Password":
                        if (re !== 0 && D.WTF) console.error("Password verifier: " + re); break;
                    case "Prot4Rev":
                        ;
                    case "Prot4RevPass":
                        break;
                    case "BoundSheet8":
                        { i[re.pos] = re;D.snames.push(re.name) } break;
                    case "EOF":
                        { if (--z) break; if (s.e) { if (s.e.r > 0 && s.e.c > 0) { s.e.r--;
                                    s.e.c--;
                                    n["!ref"] = st(s);
                                    s.e.r++;
                                    s.e.c++ } if (F.length > 0) n["!merges"] = F; if (P.length > 0) n["!objects"] = P; if (N.length > 0) n["!cols"] = N; if (L.length > 0) n["!rows"] = L;
                                T.Sheets.push(I) } if (c === "") u = n;
                            else a[c] = n;n = r.dense ? [] : {} } break;
                    case "BOF":
                        { if (D.biff === 8) D.biff = { 9: 2, 521: 3, 1033: 4 }[Z] || { 1280: 5, 1536: 8, 2: 2, 7: 2 }[re.BIFFVer] || 8; if (z++) break;_ = true;n = r.dense ? [] : {}; if (D.biff < 8 && !Y) { Y = true;
                                l(D.codepage = r.codepage || 1252) } if (D.biff < 5) { if (c === "") c = "Sheet1";
                                s = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }; var ae = { pos: e.l - Q, name: c };
                                i[ae.pos] = ae;
                                D.snames.push(c) } else c = (i[$] || { name: "" }).name; if (re.dt == 32) n["!type"] = "chart"; if (re.dt == 64) n["!type"] = "macro";F = [];P = [];D.arrayf = k = [];N = [];L = [];M = U = 0;H = false;I = { Hidden: (i[$] || { hs: 0 }).hs, name: c } } break;
                    case "Number":
                        ;
                    case "BIFF2NUM":
                        ;
                    case "BIFF2INT":
                        { if (n["!type"] == "chart")
                                if (r.dense ? (n[re.r] || [])[re.c] : n[tt({ c: re.c, r: re.r })]) ++re.c;w = { ixfe: re.ixfe, XF: C[re.ixfe] || {}, v: re.val, t: "n" }; if (X > 0) w.z = G[w.ixfe >> 8 & 31];op(w, r, t.opts.Date1904);R({ c: re.c, r: re.r }, w, r) } break;
                    case "BoolErr":
                        { w = { ixfe: re.ixfe, XF: C[re.ixfe], v: re.val, t: re.t }; if (X > 0) w.z = G[w.ixfe >> 8 & 31];op(w, r, t.opts.Date1904);R({ c: re.c, r: re.r }, w, r) } break;
                    case "RK":
                        { w = { ixfe: re.ixfe, XF: C[re.ixfe], v: re.rknum, t: "n" }; if (X > 0) w.z = G[w.ixfe >> 8 & 31];op(w, r, t.opts.Date1904);R({ c: re.c, r: re.r }, w, r) } break;
                    case "MulRk":
                        { for (var ne = re.c; ne <= re.C; ++ne) { var ie = re.rkrec[ne - re.c][0];
                                w = { ixfe: ie, XF: C[ie], v: re.rkrec[ne - re.c][1], t: "n" }; if (X > 0) w.z = G[w.ixfe >> 8 & 31];
                                op(w, r, t.opts.Date1904);
                                R({ c: ne, r: re.r }, w, r) } } break;
                    case "Formula":
                        { if (re.val == "String") { o = re; break } w = fp(re.val, re.cell.ixfe, re.tt);w.XF = C[w.ixfe]; if (r.cellFormula) { var se = re.formula; if (se && se[0] && se[0][0] && se[0][0][0] == "PtgExp") { var oe = se[0][0][1][0],
                                        fe = se[0][0][1][1]; var le = tt({ r: oe, c: fe }); if (E[le]) w.f = "" + Au(re.formula, s, re.cell, W, D);
                                    else w.F = ((r.dense ? (n[oe] || [])[fe] : n[le]) || {}).F } else w.f = "" + Au(re.formula, s, re.cell, W, D) } if (X > 0) w.z = G[w.ixfe >> 8 & 31];op(w, r, t.opts.Date1904);R(re.cell, w, r);o = re } break;
                    case "String":
                        { if (o) { o.val = re;
                                w = fp(re, o.cell.ixfe, "s");
                                w.XF = C[w.ixfe]; if (r.cellFormula) { w.f = "" + Au(o.formula, s, o.cell, W, D) } if (X > 0) w.z = G[w.ixfe >> 8 & 31];
                                op(w, r, t.opts.Date1904);
                                R(o.cell, w, r);
                                o = null } else throw new Error("String record expects Formula") } break;
                    case "Array":
                        { k.push(re); var ce = tt(re[0].s);v = r.dense ? (n[re[0].s.r] || [])[re[0].s.c] : n[ce]; if (r.cellFormula && v) { if (!o) break; if (!ce || !v) break;
                                v.f = "" + Au(re[1], s, re[0], W, D);
                                v.F = st(re[0]) } } break;
                    case "ShrFmla":
                        { if (!_) break; if (!r.cellFormula) break; if (d) { if (!o) break;
                                E[tt(o.cell)] = re[0];
                                v = r.dense ? (n[o.cell.r] || [])[o.cell.c] : n[tt(o.cell)];
                                (v || {}).f = "" + Au(re[0], s, h, W, D) } } break;
                    case "LabelSst":
                        w = fp(f[re.isst].t, re.ixfe, "s");
                        w.XF = C[w.ixfe]; if (X > 0) w.z = G[w.ixfe >> 8 & 31];
                        op(w, r, t.opts.Date1904);
                        R({ c: re.c, r: re.r }, w, r); break;
                    case "Blank":
                        if (r.sheetStubs) { w = { ixfe: re.ixfe, XF: C[re.ixfe], t: "z" }; if (X > 0) w.z = G[w.ixfe >> 8 & 31];
                            op(w, r, t.opts.Date1904);
                            R({ c: re.c, r: re.r }, w, r) } break;
                    case "MulBlank":
                        if (r.sheetStubs) { for (var ue = re.c; ue <= re.C; ++ue) { var he = re.ixfe[ue - re.c];
                                w = { ixfe: he, XF: C[he], t: "z" }; if (X > 0) w.z = G[w.ixfe >> 8 & 31];
                                op(w, r, t.opts.Date1904);
                                R({ c: ue, r: re.r }, w, r) } } break;
                    case "RString":
                        ;
                    case "Label":
                        ;
                    case "BIFF2STR":
                        w = fp(re.val, re.ixfe, "s");
                        w.XF = C[w.ixfe]; if (X > 0) w.z = G[w.ixfe >> 8 & 31];
                        op(w, r, t.opts.Date1904);
                        R({ c: re.c, r: re.r }, w, r); break;
                    case "Dimensions":
                        { if (z === 1) s = re } break;
                    case "SST":
                        { f = re } break;
                    case "Format":
                        { if (D.biff == 4) { G[X++] = re[1]; for (var de = 0; de < X + 163; ++de)
                                    if (x._table[de] == re[1]) break; if (de >= 163) x.load(re[1], X + 163) } else x.load(re[1], re[0]) } break;
                    case "BIFF2FORMAT":
                        { G[X++] = re; for (var ve = 0; ve < X + 163; ++ve)
                                if (x._table[ve] == re) break; if (ve >= 163) x.load(re, X + 163) } break;
                    case "MergeCells":
                        F = F.concat(re); break;
                    case "Obj":
                        P[re.cmo[0]] = D.lastobj = re; break;
                    case "TxO":
                        D.lastobj.TxO = re; break;
                    case "ImData":
                        D.lastobj.ImData = re; break;
                    case "HLink":
                        { for (g = re[0].s.r; g <= re[0].e.r; ++g)
                                for (m = re[0].s.c; m <= re[0].e.c; ++m) { v = r.dense ? (n[g] || [])[m] : n[tt({ c: m, r: g })]; if (v) v.l = re[1] } } break;
                    case "HLinkTooltip":
                        { for (g = re[0].s.r; g <= re[0].e.r; ++g)
                                for (m = re[0].s.c; m <= re[0].e.c; ++m) { v = r.dense ? (n[g] || [])[m] : n[tt({ c: m, r: g })]; if (v) v.l.Tooltip = re[1] } } break;
                    case "Note":
                        { if (D.biff <= 5 && D.biff >= 2) break;v = r.dense ? (n[re[0].r] || [])[re[0].c] : n[tt(re[0])]; var pe = P[re[2]]; if (!v) break; if (!v.c) v.c = [];p = { a: re[1], t: pe.TxO.t };v.c.push(p) } break;
                    default:
                        switch (q.n) {
                            case "ClrtClient":
                                break;
                            case "XFExt":
                                nl(C[re.ixfe], re.ext); break;
                            case "DefColWidth":
                                M = re; break;
                            case "DefaultRowHeight":
                                U = re[1]; break;
                            case "ColInfo":
                                { if (!D.cellStyles) break; while (re.e >= re.s) { N[re.e--] = { width: re.w / 256 }; if (!H) { H = true;
                                            Ko(re.w / 256) } $o(N[re.e + 1]) } } break;
                            case "Row":
                                { var be = {}; if (re.level != null) { L[re.r] = be;
                                        be.level = re.level } if (re.hidden) { L[re.r] = be;
                                        be.hidden = true } if (re.hpt) { L[re.r] = be;
                                        be.hpt = re.hpt;
                                        be.hpx = qo(re.hpt) } } break;
                            case "LeftMargin":
                                ;
                            case "RightMargin":
                                ;
                            case "TopMargin":
                                ;
                            case "BottomMargin":
                                if (!n["!margins"]) eh(n["!margins"] = {});
                                n["!margins"][te.slice(0, -6).toLowerCase()] = re; break;
                            case "Setup":
                                if (!n["!margins"]) eh(n["!margins"] = {});
                                n["!margins"].header = re.header;
                                n["!margins"].footer = re.footer; break;
                            case "Window2":
                                if (re.RTL) T.Views[0].RTL = true; break;
                            case "Header":
                                break;
                            case "Footer":
                                break;
                            case "HCenter":
                                break;
                            case "VCenter":
                                break;
                            case "Pls":
                                break;
                            case "GCW":
                                break;
                            case "LHRecord":
                                break;
                            case "DBCell":
                                break;
                            case "EntExU2":
                                break;
                            case "SxView":
                                break;
                            case "Sxvd":
                                break;
                            case "SXVI":
                                break;
                            case "SXVDEx":
                                break;
                            case "SxIvd":
                                break;
                            case "SXString":
                                break;
                            case "Sync":
                                break;
                            case "Addin":
                                break;
                            case "SXDI":
                                break;
                            case "SXLI":
                                break;
                            case "SXEx":
                                break;
                            case "QsiSXTag":
                                break;
                            case "Selection":
                                break;
                            case "Feat":
                                break;
                            case "FeatHdr":
                                ;
                            case "FeatHdr11":
                                break;
                            case "Feature11":
                                ;
                            case "Feature12":
                                ;
                            case "List12":
                                break;
                            case "Country":
                                S = re; break;
                            case "RecalcId":
                                break;
                            case "DxGCol":
                                break;
                            case "Fbi":
                                ;
                            case "Fbi2":
                                ;
                            case "GelFrame":
                                break;
                            case "Font":
                                break;
                            case "XFCRC":
                                break;
                            case "Style":
                                break;
                            case "StyleExt":
                                break;
                            case "Palette":
                                B = re; break;
                            case "Theme":
                                O = re; break;
                            case "ScenarioProtect":
                                break;
                            case "ObjProtect":
                                break;
                            case "CondFmt12":
                                break;
                            case "Table":
                                break;
                            case "TableStyles":
                                break;
                            case "TableStyle":
                                break;
                            case "TableStyleElement":
                                break;
                            case "SXStreamID":
                                break;
                            case "SXVS":
                                break;
                            case "DConRef":
                                break;
                            case "SXAddl":
                                break;
                            case "DConBin":
                                break;
                            case "DConName":
                                break;
                            case "SXPI":
                                break;
                            case "SxFormat":
                                break;
                            case "SxSelect":
                                break;
                            case "SxRule":
                                break;
                            case "SxFilt":
                                break;
                            case "SxItm":
                                break;
                            case "SxDXF":
                                break;
                            case "ScenMan":
                                break;
                            case "DCon":
                                break;
                            case "CellWatch":
                                break;
                            case "PrintRowCol":
                                break;
                            case "PrintGrid":
                                break;
                            case "PrintSize":
                                break;
                            case "XCT":
                                break;
                            case "CRN":
                                break;
                            case "Scl":
                                {} break;
                            case "SheetExt":
                                {} break;
                            case "SheetExtOptional":
                                {} break;
                            case "ObNoMacros":
                                {} break;
                            case "ObProj":
                                {} break;
                            case "CodeName":
                                { if (!c) T.WBProps.CodeName = re || "ThisWorkbook";
                                    else I.CodeName = re || I.name } break;
                            case "GUIDTypeLib":
                                {} break;
                            case "WOpt":
                                break;
                            case "PhoneticInfo":
                                break;
                            case "OleObjectSize":
                                break;
                            case "DXF":
                                ;
                            case "DXFN":
                                ;
                            case "DXFN12":
                                ;
                            case "DXFN12List":
                                ;
                            case "DXFN12NoCB":
                                break;
                            case "Dv":
                                ;
                            case "DVal":
                                break;
                            case "BRAI":
                                ;
                            case "Series":
                                ;
                            case "SeriesText":
                                break;
                            case "DConn":
                                break;
                            case "DbOrParamQry":
                                break;
                            case "DBQueryExt":
                                break;
                            case "OleDbConn":
                                break;
                            case "ExtString":
                                break;
                            case "IFmtRecord":
                                break;
                            case "CondFmt":
                                ;
                            case "CF":
                                ;
                            case "CF12":
                                ;
                            case "CFEx":
                                break;
                            case "Excel9File":
                                break;
                            case "Units":
                                break;
                            case "InterfaceHdr":
                                ;
                            case "Mms":
                                ;
                            case "InterfaceEnd":
                                ;
                            case "DSF":
                                break;
                            case "BuiltInFnGroupCount":
                                break;
                            case "Window1":
                                ;
                            case "HideObj":
                                ;
                            case "GridSet":
                                ;
                            case "Guts":
                                ;
                            case "UserBView":
                                ;
                            case "UserSViewBegin":
                                ;
                            case "UserSViewEnd":
                                ;
                            case "Pane":
                                break;
                            default:
                                switch (q.n) {
                                    case "Dat":
                                        ;
                                    case "Begin":
                                        ;
                                    case "End":
                                        ;
                                    case "StartBlock":
                                        ;
                                    case "EndBlock":
                                        ;
                                    case "Frame":
                                        ;
                                    case "Area":
                                        ;
                                    case "Axis":
                                        ;
                                    case "AxisLine":
                                        ;
                                    case "Tick":
                                        break;
                                    case "AxesUsed":
                                        ;
                                    case "CrtLayout12":
                                        ;
                                    case "CrtLayout12A":
                                        ;
                                    case "CrtLink":
                                        ;
                                    case "CrtLine":
                                        ;
                                    case "CrtMlFrt":
                                        ;
                                    case "CrtMlFrtContinue":
                                        break;
                                    case "LineFormat":
                                        ;
                                    case "AreaFormat":
                                        ;
                                    case "Chart":
                                        ;
                                    case "Chart3d":
                                        ;
                                    case "Chart3DBarShape":
                                        ;
                                    case "ChartFormat":
                                        ;
                                    case "ChartFrtInfo":
                                        break;
                                    case "PlotArea":
                                        ;
                                    case "PlotGrowth":
                                        break;
                                    case "SeriesList":
                                        ;
                                    case "SerParent":
                                        ;
                                    case "SerAuxTrend":
                                        break;
                                    case "DataFormat":
                                        ;
                                    case "SerToCrt":
                                        ;
                                    case "FontX":
                                        break;
                                    case "CatSerRange":
                                        ;
                                    case "AxcExt":
                                        ;
                                    case "SerFmt":
                                        break;
                                    case "ShtProps":
                                        break;
                                    case "DefaultText":
                                        ;
                                    case "Text":
                                        ;
                                    case "CatLab":
                                        break;
                                    case "DataLabExtContents":
                                        break;
                                    case "Legend":
                                        ;
                                    case "LegendException":
                                        break;
                                    case "Pie":
                                        ;
                                    case "Scatter":
                                        break;
                                    case "PieFormat":
                                        ;
                                    case "MarkerFormat":
                                        break;
                                    case "StartObject":
                                        ;
                                    case "EndObject":
                                        break;
                                    case "AlRuns":
                                        ;
                                    case "ObjectLink":
                                        break;
                                    case "SIIndex":
                                        break;
                                    case "AttachedLabel":
                                        ;
                                    case "YMult":
                                        break;
                                    case "Line":
                                        ;
                                    case "Bar":
                                        break;
                                    case "Surf":
                                        break;
                                    case "AxisParent":
                                        break;
                                    case "Pos":
                                        break;
                                    case "ValueRange":
                                        break;
                                    case "SXViewEx9":
                                        break;
                                    case "SXViewLink":
                                        break;
                                    case "PivotChartBits":
                                        break;
                                    case "SBaseRef":
                                        break;
                                    case "TextPropsStream":
                                        break;
                                    case "LnExt":
                                        break;
                                    case "MkrExt":
                                        break;
                                    case "CrtCoopt":
                                        break;
                                    case "Qsi":
                                        ;
                                    case "Qsif":
                                        ;
                                    case "Qsir":
                                        ;
                                    case "QsiSXTag":
                                        break;
                                    case "TxtQry":
                                        break;
                                    case "FilterMode":
                                        break;
                                    case "AutoFilter":
                                        ;
                                    case "AutoFilterInfo":
                                        break;
                                    case "AutoFilter12":
                                        break;
                                    case "DropDownObjIds":
                                        break;
                                    case "Sort":
                                        break;
                                    case "SortData":
                                        break;
                                    case "ShapePropsStream":
                                        break;
                                    case "MsoDrawing":
                                        ;
                                    case "MsoDrawingGroup":
                                        ;
                                    case "MsoDrawingSelection":
                                        break;
                                    case "WebPub":
                                        ;
                                    case "AutoWebPub":
                                        break;
                                    case "HeaderFooter":
                                        ;
                                    case "HFPicture":
                                        ;
                                    case "PLV":
                                        ;
                                    case "HorizontalPageBreaks":
                                        ;
                                    case "VerticalPageBreaks":
                                        break;
                                    case "Backup":
                                        ;
                                    case "CompressPictures":
                                        ;
                                    case "Compat12":
                                        break;
                                    case "Continue":
                                        ;
                                    case "ContinueFrt12":
                                        break;
                                    case "FrtFontList":
                                        ;
                                    case "FrtWrapper":
                                        break;
                                    default:
                                        switch (q.n) {
                                            case "TabIdConf":
                                                ;
                                            case "Radar":
                                                ;
                                            case "RadarArea":
                                                ;
                                            case "DropBar":
                                                ;
                                            case "Intl":
                                                ;
                                            case "CoordList":
                                                ;
                                            case "SerAuxErrBar":
                                                break;
                                            case "BIFF2FONTCLR":
                                                ;
                                            case "BIFF2FMTCNT":
                                                ;
                                            case "BIFF2FONTXTRA":
                                                break;
                                            case "BIFF2XF":
                                                ;
                                            case "BIFF3XF":
                                                ;
                                            case "BIFF4XF":
                                                break;
                                            case "BIFF4FMTCNT":
                                                ;
                                            case "BIFF2ROW":
                                                ;
                                            case "BIFF2WINDOW2":
                                                break;
                                            case "SCENARIO":
                                                ;
                                            case "DConBin":
                                                ;
                                            case "PicF":
                                                ;
                                            case "DataLabExt":
                                                ;
                                            case "Lel":
                                                ;
                                            case "BopPop":
                                                ;
                                            case "BopPopCustom":
                                                ;
                                            case "RealTimeData":
                                                ;
                                            case "Name":
                                                break;
                                            case "LHNGraph":
                                                ;
                                            case "FnGroupName":
                                                ;
                                            case "AddMenu":
                                                ;
                                            case "LPr":
                                                break;
                                            case "ListObj":
                                                ;
                                            case "ListField":
                                                break;
                                            case "RRSort":
                                                break;
                                            case "BigName":
                                                break;
                                            case "ToolbarHdr":
                                                ;
                                            case "ToolbarEnd":
                                                break;
                                            case "DDEObjName":
                                                break;
                                            case "FRTArchId$":
                                                break;
                                            default:
                                                if (r.WTF) throw "Unrecognized Record " + q.n; }; }; }; } } else e.l += Q } var me = Object.keys(i).sort(function(e, r) { return Number(e) - Number(r) }).map(function(e) { return i[e].name }); var ge = me.slice();
        t.Directory = me;
        t.SheetNames = me; if (!r.bookSheets) t.Sheets = a; if (t.Sheets) j.forEach(function(e, r) { t.Sheets[t.SheetNames[r]]["!autofilter"] = e });
        t.Preamble = u;
        t.Strings = f;
        t.SSF = x.get_table(); if (D.enc) t.Encryption = D.enc; if (O) t.Themes = O;
        t.Metadata = {}; if (S !== undefined) t.Metadata.Country = S; if (W.names.length > 0) T.Names = W.names;
        t.Workbook = T; return t }

    function cp(e, r, t) { var a = F.find(e, "!DocumentSummaryInformation"); if (a) try { var n = En(a, fa); for (var i in n) r[i] = n[i] } catch (s) { if (t.WTF) throw s }
        var o = F.find(e, "!SummaryInformation"); if (o) try { var f = En(o, la); for (var l in f)
                if (r[l] == null) r[l] = f[l] } catch (s) { if (t.WTF) throw s } }

    function up(e, r) { if (!r) r = {};
        Qp(r);
        c(); if (r.codepage) o(r.codepage); var t, a, n; if (e.FullPaths) { if (F.find(e, "/encryption")) throw new Error("File is password-protected");
            t = F.find(e, "!CompObj");
            a = F.find(e, "!SummaryInformation");
            n = F.find(e, "/Workbook") || F.find(e, "/Book") } else { switch (r.type) {
                case "base64":
                    e = w(g.decode(e)); break;
                case "binary":
                    e = w(e); break;
                case "buffer":
                    break;
                case "array":
                    if (!Array.isArray(e)) e = Array.prototype.slice.call(e); break; } Fr(e, 0);
            n = { content: e } } var i, s, f; var l; if (t) i = ip(t); if (r.bookProps && !r.bookSheets) f = {};
        else { var u = E ? "buffer" : "array"; if (n && n.content) f = lp(n.content, r);
            else if ((l = F.find(e, "PerfectOffice_MAIN")) && l.content) f = Xs.to_workbook(l.content, (r.type = u, r));
            else if ((l = F.find(e, "NativeContent_MAIN")) && l.content) f = Xs.to_workbook(l.content, (r.type = u, r));
            else throw new Error("Cannot find Workbook stream"); if (r.bookVBA && e.FullPaths && F.find(e, "/_VBA_PROJECT_CUR/VBA/dir")) f.vbaraw = Tl(e) } var h = {}; if (e.FullPaths) cp(e, h, r);
        f.Props = f.Custprops = h; if (r.bookFiles) f.cfb = e; return f }

    function hp(e, r) { var t = r || {}; var a = F.utils.cfb_new({ root: "R" }); var n = "/Workbook"; switch (t.bookType || "xls") {
            case "xls":
                t.bookType = "biff8";
            case "xla":
                if (!t.bookType) t.bookType = "xla";
            case "biff8":
                n = "/Workbook";
                t.biff = 8; break;
            case "biff5":
                n = "/Book";
                t.biff = 5; break;
            default:
                throw new Error("invalid type " + t.bookType + " for XLS CFB"); } F.utils.cfb_add(a, n, Ap(e, t)); if (t.biff == 8 && e.vbaraw) xl(a, F.read(e.vbaraw, { type: typeof e.vbaraw == "string" ? "binary" : "buffer" })); return a }
    var dp = {
        0: { n: "BrtRowHdr", f: Dh },
        1: { n: "BrtCellBlank", f: Hh },
        2: { n: "BrtCellRk", f: $h },
        3: { n: "BrtCellError", f: Xh },
        4: { n: "BrtCellBool", f: Vh },
        5: { n: "BrtCellReal", f: Kh },
        6: { n: "BrtCellSt", f: Qh },
        7: { n: "BrtCellIsst", f: Gh },
        8: { n: "BrtFmlaString", f: td },
        9: { n: "BrtFmlaNum", f: rd },
        10: { n: "BrtFmlaBool", f: qh },
        11: { n: "BrtFmlaError", f: ed },
        16: { n: "BrtFRTArchID$", f: nv },
        19: { n: "BrtSSTItem", f: gt },
        20: { n: "BrtPCDIMissing" },
        21: { n: "BrtPCDINumber" },
        22: { n: "BrtPCDIBoolean" },
        23: { n: "BrtPCDIError" },
        24: { n: "BrtPCDIString" },
        25: { n: "BrtPCDIDatetime" },
        26: { n: "BrtPCDIIndex" },
        27: { n: "BrtPCDIAMissing" },
        28: { n: "BrtPCDIANumber" },
        29: { n: "BrtPCDIABoolean" },
        30: { n: "BrtPCDIAError" },
        31: { n: "BrtPCDIAString" },
        32: { n: "BrtPCDIADatetime" },
        33: { n: "BrtPCRRecord" },
        34: { n: "BrtPCRRecordDt" },
        35: { n: "BrtFRTBegin" },
        36: { n: "BrtFRTEnd" },
        37: { n: "BrtACBegin" },
        38: { n: "BrtACEnd" },
        39: { n: "BrtName", f: iv },
        40: { n: "BrtIndexRowBlock" },
        42: { n: "BrtIndexBlock" },
        43: { n: "BrtFont", f: bf },
        44: { n: "BrtFmt", f: vf },
        45: { n: "BrtFill", f: kf },
        46: { n: "BrtBorder", f: Bf },
        47: { n: "BrtXF", f: Sf },
        48: { n: "BrtStyle" },
        49: { n: "BrtCellMeta" },
        50: { n: "BrtValueMeta" },
        51: { n: "BrtMdb" },
        52: { n: "BrtBeginFmd" },
        53: { n: "BrtEndFmd" },
        54: { n: "BrtBeginMdx" },
        55: { n: "BrtEndMdx" },
        56: { n: "BrtBeginMdxTuple" },
        57: { n: "BrtEndMdxTuple" },
        58: { n: "BrtMdxMbrIstr" },
        59: { n: "BrtStr" },
        60: { n: "BrtColInfo", f: ws },
        62: { n: "BrtCellRString" },
        63: { n: "BrtCalcChainItem$", f: ol },
        64: { n: "BrtDVal" },
        65: { n: "BrtSxvcellNum" },
        66: { n: "BrtSxvcellStr" },
        67: { n: "BrtSxvcellBool" },
        68: { n: "BrtSxvcellErr" },
        69: { n: "BrtSxvcellDate" },
        70: { n: "BrtSxvcellNil" },
        128: { n: "BrtFileVersion" },
        129: { n: "BrtBeginSheet" },
        130: { n: "BrtEndSheet" },
        131: { n: "BrtBeginBook", f: Pr, p: 0 },
        132: { n: "BrtEndBook" },
        133: { n: "BrtBeginWsViews" },
        134: { n: "BrtEndWsViews" },
        135: { n: "BrtBeginBookViews" },
        136: { n: "BrtEndBookViews" },
        137: { n: "BrtBeginWsView", f: vd },
        138: { n: "BrtEndWsView" },
        139: { n: "BrtBeginCsViews" },
        140: { n: "BrtEndCsViews" },
        141: { n: "BrtBeginCsView" },
        142: { n: "BrtEndCsView" },
        143: { n: "BrtBeginBundleShs" },
        144: { n: "BrtEndBundleShs" },
        145: { n: "BrtBeginSheetData" },
        146: { n: "BrtEndSheetData" },
        147: { n: "BrtWsProp", f: Mh },
        148: { n: "BrtWsDim", f: Ph, p: 16 },
        151: { n: "BrtPane" },
        152: { n: "BrtSel" },
        153: { n: "BrtWbProp", f: tv },
        154: { n: "BrtWbFactoid" },
        155: { n: "BrtFileRecover" },
        156: { n: "BrtBundleSh", f: ev },
        157: { n: "BrtCalcProp" },
        158: { n: "BrtBookView" },
        159: { n: "BrtBeginSst", f: to },
        160: { n: "BrtEndSst" },
        161: { n: "BrtBeginAFilter", f: Nt },
        162: { n: "BrtEndAFilter" },
        163: { n: "BrtBeginFilterColumn" },
        164: { n: "BrtEndFilterColumn" },
        165: { n: "BrtBeginFilters" },
        166: { n: "BrtEndFilters" },
        167: { n: "BrtFilter" },
        168: { n: "BrtColorFilter" },
        169: { n: "BrtIconFilter" },
        170: { n: "BrtTop10Filter" },
        171: { n: "BrtDynamicFilter" },
        172: { n: "BrtBeginCustomFilters" },
        173: { n: "BrtEndCustomFilters" },
        174: { n: "BrtCustomFilter" },
        175: { n: "BrtAFilterDateGroupItem" },
        176: { n: "BrtMergeCell", f: ad },
        177: { n: "BrtBeginMergeCells" },
        178: { n: "BrtEndMergeCells" },
        179: { n: "BrtBeginPivotCacheDef" },
        180: { n: "BrtEndPivotCacheDef" },
        181: { n: "BrtBeginPCDFields" },
        182: { n: "BrtEndPCDFields" },
        183: { n: "BrtBeginPCDField" },
        184: { n: "BrtEndPCDField" },
        185: { n: "BrtBeginPCDSource" },
        186: { n: "BrtEndPCDSource" },
        187: { n: "BrtBeginPCDSRange" },
        188: { n: "BrtEndPCDSRange" },
        189: { n: "BrtBeginPCDFAtbl" },
        190: { n: "BrtEndPCDFAtbl" },
        191: { n: "BrtBeginPCDIRun" },
        192: { n: "BrtEndPCDIRun" },
        193: { n: "BrtBeginPivotCacheRecords" },
        194: { n: "BrtEndPivotCacheRecords" },
        195: { n: "BrtBeginPCDHierarchies" },
        196: { n: "BrtEndPCDHierarchies" },
        197: { n: "BrtBeginPCDHierarchy" },
        198: { n: "BrtEndPCDHierarchy" },
        199: { n: "BrtBeginPCDHFieldsUsage" },
        200: { n: "BrtEndPCDHFieldsUsage" },
        201: { n: "BrtBeginExtConnection" },
        202: { n: "BrtEndExtConnection" },
        203: { n: "BrtBeginECDbProps" },
        204: { n: "BrtEndECDbProps" },
        205: { n: "BrtBeginECOlapProps" },
        206: { n: "BrtEndECOlapProps" },
        207: { n: "BrtBeginPCDSConsol" },
        208: { n: "BrtEndPCDSConsol" },
        209: { n: "BrtBeginPCDSCPages" },
        210: { n: "BrtEndPCDSCPages" },
        211: { n: "BrtBeginPCDSCPage" },
        212: { n: "BrtEndPCDSCPage" },
        213: { n: "BrtBeginPCDSCPItem" },
        214: { n: "BrtEndPCDSCPItem" },
        215: { n: "BrtBeginPCDSCSets" },
        216: { n: "BrtEndPCDSCSets" },
        217: { n: "BrtBeginPCDSCSet" },
        218: { n: "BrtEndPCDSCSet" },
        219: { n: "BrtBeginPCDFGroup" },
        220: { n: "BrtEndPCDFGroup" },
        221: { n: "BrtBeginPCDFGItems" },
        222: { n: "BrtEndPCDFGItems" },
        223: { n: "BrtBeginPCDFGRange" },
        224: { n: "BrtEndPCDFGRange" },
        225: { n: "BrtBeginPCDFGDiscrete" },
        226: { n: "BrtEndPCDFGDiscrete" },
        227: { n: "BrtBeginPCDSDTupleCache" },
        228: { n: "BrtEndPCDSDTupleCache" },
        229: { n: "BrtBeginPCDSDTCEntries" },
        230: { n: "BrtEndPCDSDTCEntries" },
        231: { n: "BrtBeginPCDSDTCEMembers" },
        232: { n: "BrtEndPCDSDTCEMembers" },
        233: { n: "BrtBeginPCDSDTCEMember" },
        234: { n: "BrtEndPCDSDTCEMember" },
        235: { n: "BrtBeginPCDSDTCQueries" },
        236: { n: "BrtEndPCDSDTCQueries" },
        237: { n: "BrtBeginPCDSDTCQuery" },
        238: { n: "BrtEndPCDSDTCQuery" },
        239: { n: "BrtBeginPCDSDTCSets" },
        240: { n: "BrtEndPCDSDTCSets" },
        241: { n: "BrtBeginPCDSDTCSet" },
        242: { n: "BrtEndPCDSDTCSet" },
        243: { n: "BrtBeginPCDCalcItems" },
        244: { n: "BrtEndPCDCalcItems" },
        245: { n: "BrtBeginPCDCalcItem" },
        246: { n: "BrtEndPCDCalcItem" },
        247: { n: "BrtBeginPRule" },
        248: { n: "BrtEndPRule" },
        249: { n: "BrtBeginPRFilters" },
        250: { n: "BrtEndPRFilters" },
        251: { n: "BrtBeginPRFilter" },
        252: { n: "BrtEndPRFilter" },
        253: { n: "BrtBeginPNames" },
        254: { n: "BrtEndPNames" },
        255: { n: "BrtBeginPName" },
        256: { n: "BrtEndPName" },
        257: { n: "BrtBeginPNPairs" },
        258: { n: "BrtEndPNPairs" },
        259: { n: "BrtBeginPNPair" },
        260: { n: "BrtEndPNPair" },
        261: { n: "BrtBeginECWebProps" },
        262: { n: "BrtEndECWebProps" },
        263: { n: "BrtBeginEcWpTables" },
        264: { n: "BrtEndECWPTables" },
        265: {
            n: "BrtBeginECParams"
        },
        266: { n: "BrtEndECParams" },
        267: { n: "BrtBeginECParam" },
        268: { n: "BrtEndECParam" },
        269: { n: "BrtBeginPCDKPIs" },
        270: { n: "BrtEndPCDKPIs" },
        271: { n: "BrtBeginPCDKPI" },
        272: { n: "BrtEndPCDKPI" },
        273: { n: "BrtBeginDims" },
        274: { n: "BrtEndDims" },
        275: { n: "BrtBeginDim" },
        276: { n: "BrtEndDim" },
        277: { n: "BrtIndexPartEnd" },
        278: { n: "BrtBeginStyleSheet" },
        279: { n: "BrtEndStyleSheet" },
        280: { n: "BrtBeginSXView" },
        281: { n: "BrtEndSXVI" },
        282: { n: "BrtBeginSXVI" },
        283: { n: "BrtBeginSXVIs" },
        284: { n: "BrtEndSXVIs" },
        285: { n: "BrtBeginSXVD" },
        286: { n: "BrtEndSXVD" },
        287: { n: "BrtBeginSXVDs" },
        288: { n: "BrtEndSXVDs" },
        289: { n: "BrtBeginSXPI" },
        290: { n: "BrtEndSXPI" },
        291: { n: "BrtBeginSXPIs" },
        292: { n: "BrtEndSXPIs" },
        293: { n: "BrtBeginSXDI" },
        294: { n: "BrtEndSXDI" },
        295: { n: "BrtBeginSXDIs" },
        296: { n: "BrtEndSXDIs" },
        297: { n: "BrtBeginSXLI" },
        298: { n: "BrtEndSXLI" },
        299: { n: "BrtBeginSXLIRws" },
        300: { n: "BrtEndSXLIRws" },
        301: { n: "BrtBeginSXLICols" },
        302: { n: "BrtEndSXLICols" },
        303: { n: "BrtBeginSXFormat" },
        304: { n: "BrtEndSXFormat" },
        305: { n: "BrtBeginSXFormats" },
        306: { n: "BrtEndSxFormats" },
        307: { n: "BrtBeginSxSelect" },
        308: { n: "BrtEndSxSelect" },
        309: { n: "BrtBeginISXVDRws" },
        310: { n: "BrtEndISXVDRws" },
        311: { n: "BrtBeginISXVDCols" },
        312: { n: "BrtEndISXVDCols" },
        313: { n: "BrtEndSXLocation" },
        314: { n: "BrtBeginSXLocation" },
        315: { n: "BrtEndSXView" },
        316: { n: "BrtBeginSXTHs" },
        317: { n: "BrtEndSXTHs" },
        318: { n: "BrtBeginSXTH" },
        319: { n: "BrtEndSXTH" },
        320: { n: "BrtBeginISXTHRws" },
        321: { n: "BrtEndISXTHRws" },
        322: { n: "BrtBeginISXTHCols" },
        323: { n: "BrtEndISXTHCols" },
        324: { n: "BrtBeginSXTDMPS" },
        325: { n: "BrtEndSXTDMPs" },
        326: { n: "BrtBeginSXTDMP" },
        327: { n: "BrtEndSXTDMP" },
        328: { n: "BrtBeginSXTHItems" },
        329: { n: "BrtEndSXTHItems" },
        330: { n: "BrtBeginSXTHItem" },
        331: { n: "BrtEndSXTHItem" },
        332: { n: "BrtBeginMetadata" },
        333: { n: "BrtEndMetadata" },
        334: { n: "BrtBeginEsmdtinfo" },
        335: { n: "BrtMdtinfo" },
        336: { n: "BrtEndEsmdtinfo" },
        337: { n: "BrtBeginEsmdb" },
        338: { n: "BrtEndEsmdb" },
        339: { n: "BrtBeginEsfmd" },
        340: { n: "BrtEndEsfmd" },
        341: { n: "BrtBeginSingleCells" },
        342: { n: "BrtEndSingleCells" },
        343: { n: "BrtBeginList" },
        344: { n: "BrtEndList" },
        345: { n: "BrtBeginListCols" },
        346: { n: "BrtEndListCols" },
        347: { n: "BrtBeginListCol" },
        348: { n: "BrtEndListCol" },
        349: { n: "BrtBeginListXmlCPr" },
        350: { n: "BrtEndListXmlCPr" },
        351: { n: "BrtListCCFmla" },
        352: { n: "BrtListTrFmla" },
        353: { n: "BrtBeginExternals" },
        354: { n: "BrtEndExternals" },
        355: { n: "BrtSupBookSrc", f: yt },
        357: { n: "BrtSupSelf" },
        358: { n: "BrtSupSame" },
        359: { n: "BrtSupTabs" },
        360: { n: "BrtBeginSupBook" },
        361: { n: "BrtPlaceholderName" },
        362: { n: "BrtExternSheet", f: Ji },
        363: { n: "BrtExternTableStart" },
        364: { n: "BrtExternTableEnd" },
        366: { n: "BrtExternRowHdr" },
        367: { n: "BrtExternCellBlank" },
        368: { n: "BrtExternCellReal" },
        369: { n: "BrtExternCellBool" },
        370: { n: "BrtExternCellError" },
        371: { n: "BrtExternCellString" },
        372: { n: "BrtBeginEsmdx" },
        373: { n: "BrtEndEsmdx" },
        374: { n: "BrtBeginMdxSet" },
        375: { n: "BrtEndMdxSet" },
        376: { n: "BrtBeginMdxMbrProp" },
        377: { n: "BrtEndMdxMbrProp" },
        378: { n: "BrtBeginMdxKPI" },
        379: { n: "BrtEndMdxKPI" },
        380: { n: "BrtBeginEsstr" },
        381: { n: "BrtEndEsstr" },
        382: { n: "BrtBeginPRFItem" },
        383: { n: "BrtEndPRFItem" },
        384: { n: "BrtBeginPivotCacheIDs" },
        385: { n: "BrtEndPivotCacheIDs" },
        386: { n: "BrtBeginPivotCacheID" },
        387: { n: "BrtEndPivotCacheID" },
        388: { n: "BrtBeginISXVIs" },
        389: { n: "BrtEndISXVIs" },
        390: { n: "BrtBeginColInfos" },
        391: { n: "BrtEndColInfos" },
        392: { n: "BrtBeginRwBrk" },
        393: { n: "BrtEndRwBrk" },
        394: { n: "BrtBeginColBrk" },
        395: { n: "BrtEndColBrk" },
        396: { n: "BrtBrk" },
        397: { n: "BrtUserBookView" },
        398: { n: "BrtInfo" },
        399: { n: "BrtCUsr" },
        400: { n: "BrtUsr" },
        401: { n: "BrtBeginUsers" },
        403: { n: "BrtEOF" },
        404: { n: "BrtUCR" },
        405: { n: "BrtRRInsDel" },
        406: { n: "BrtRREndInsDel" },
        407: { n: "BrtRRMove" },
        408: { n: "BrtRREndMove" },
        409: { n: "BrtRRChgCell" },
        410: { n: "BrtRREndChgCell" },
        411: { n: "BrtRRHeader" },
        412: { n: "BrtRRUserView" },
        413: { n: "BrtRRRenSheet" },
        414: { n: "BrtRRInsertSh" },
        415: { n: "BrtRRDefName" },
        416: { n: "BrtRRNote" },
        417: { n: "BrtRRConflict" },
        418: { n: "BrtRRTQSIF" },
        419: { n: "BrtRRFormat" },
        420: { n: "BrtRREndFormat" },
        421: { n: "BrtRRAutoFmt" },
        422: { n: "BrtBeginUserShViews" },
        423: { n: "BrtBeginUserShView" },
        424: { n: "BrtEndUserShView" },
        425: { n: "BrtEndUserShViews" },
        426: { n: "BrtArrFmla", f: fd },
        427: { n: "BrtShrFmla", f: ld },
        428: { n: "BrtTable" },
        429: { n: "BrtBeginExtConnections" },
        430: { n: "BrtEndExtConnections" },
        431: { n: "BrtBeginPCDCalcMems" },
        432: { n: "BrtEndPCDCalcMems" },
        433: { n: "BrtBeginPCDCalcMem" },
        434: { n: "BrtEndPCDCalcMem" },
        435: { n: "BrtBeginPCDHGLevels" },
        436: { n: "BrtEndPCDHGLevels" },
        437: { n: "BrtBeginPCDHGLevel" },
        438: { n: "BrtEndPCDHGLevel" },
        439: { n: "BrtBeginPCDHGLGroups" },
        440: { n: "BrtEndPCDHGLGroups" },
        441: { n: "BrtBeginPCDHGLGroup" },
        442: { n: "BrtEndPCDHGLGroup" },
        443: { n: "BrtBeginPCDHGLGMembers" },
        444: { n: "BrtEndPCDHGLGMembers" },
        445: { n: "BrtBeginPCDHGLGMember" },
        446: { n: "BrtEndPCDHGLGMember" },
        447: { n: "BrtBeginQSI" },
        448: { n: "BrtEndQSI" },
        449: { n: "BrtBeginQSIR" },
        450: { n: "BrtEndQSIR" },
        451: { n: "BrtBeginDeletedNames" },
        452: { n: "BrtEndDeletedNames" },
        453: { n: "BrtBeginDeletedName" },
        454: { n: "BrtEndDeletedName" },
        455: { n: "BrtBeginQSIFs" },
        456: { n: "BrtEndQSIFs" },
        457: { n: "BrtBeginQSIF" },
        458: { n: "BrtEndQSIF" },
        459: { n: "BrtBeginAutoSortScope" },
        460: { n: "BrtEndAutoSortScope" },
        461: { n: "BrtBeginConditionalFormatting" },
        462: { n: "BrtEndConditionalFormatting" },
        463: { n: "BrtBeginCFRule" },
        464: { n: "BrtEndCFRule" },
        465: { n: "BrtBeginIconSet" },
        466: { n: "BrtEndIconSet" },
        467: { n: "BrtBeginDatabar" },
        468: { n: "BrtEndDatabar" },
        469: { n: "BrtBeginColorScale" },
        470: { n: "BrtEndColorScale" },
        471: { n: "BrtCFVO" },
        472: { n: "BrtExternValueMeta" },
        473: { n: "BrtBeginColorPalette" },
        474: { n: "BrtEndColorPalette" },
        475: { n: "BrtIndexedColor" },
        476: { n: "BrtMargins", f: hd },
        477: { n: "BrtPrintOptions" },
        478: { n: "BrtPageSetup" },
        479: { n: "BrtBeginHeaderFooter" },
        480: { n: "BrtEndHeaderFooter" },
        481: { n: "BrtBeginSXCrtFormat" },
        482: { n: "BrtEndSXCrtFormat" },
        483: { n: "BrtBeginSXCrtFormats" },
        484: { n: "BrtEndSXCrtFormats" },
        485: { n: "BrtWsFmtInfo", f: Lh },
        486: { n: "BrtBeginMgs" },
        487: { n: "BrtEndMGs" },
        488: { n: "BrtBeginMGMaps" },
        489: { n: "BrtEndMGMaps" },
        490: { n: "BrtBeginMG" },
        491: { n: "BrtEndMG" },
        492: { n: "BrtBeginMap" },
        493: { n: "BrtEndMap" },
        494: { n: "BrtHLink", f: sd },
        495: { n: "BrtBeginDCon" },
        496: { n: "BrtEndDCon" },
        497: { n: "BrtBeginDRefs" },
        498: { n: "BrtEndDRefs" },
        499: { n: "BrtDRef" },
        500: { n: "BrtBeginScenMan" },
        501: { n: "BrtEndScenMan" },
        502: { n: "BrtBeginSct" },
        503: { n: "BrtEndSct" },
        504: { n: "BrtSlc" },
        505: { n: "BrtBeginDXFs" },
        506: { n: "BrtEndDXFs" },
        507: { n: "BrtDXF" },
        508: { n: "BrtBeginTableStyles" },
        509: { n: "BrtEndTableStyles" },
        510: { n: "BrtBeginTableStyle" },
        511: { n: "BrtEndTableStyle" },
        512: { n: "BrtTableStyleElement" },
        513: { n: "BrtTableStyleClient" },
        514: { n: "BrtBeginVolDeps" },
        515: { n: "BrtEndVolDeps" },
        516: { n: "BrtBeginVolType" },
        517: { n: "BrtEndVolType" },
        518: { n: "BrtBeginVolMain" },
        519: { n: "BrtEndVolMain" },
        520: { n: "BrtBeginVolTopic" },
        521: { n: "BrtEndVolTopic" },
        522: { n: "BrtVolSubtopic" },
        523: { n: "BrtVolRef" },
        524: { n: "BrtVolNum" },
        525: { n: "BrtVolErr" },
        526: { n: "BrtVolStr" },
        527: { n: "BrtVolBool" },
        528: { n: "BrtBeginCalcChain$" },
        529: { n: "BrtEndCalcChain$" },
        530: { n: "BrtBeginSortState" },
        531: { n: "BrtEndSortState" },
        532: { n: "BrtBeginSortCond" },
        533: { n: "BrtEndSortCond" },
        534: { n: "BrtBookProtection" },
        535: { n: "BrtSheetProtection" },
        536: { n: "BrtRangeProtection" },
        537: { n: "BrtPhoneticInfo" },
        538: { n: "BrtBeginECTxtWiz" },
        539: { n: "BrtEndECTxtWiz" },
        540: { n: "BrtBeginECTWFldInfoLst" },
        541: { n: "BrtEndECTWFldInfoLst" },
        542: { n: "BrtBeginECTwFldInfo" },
        548: { n: "BrtFileSharing" },
        549: { n: "BrtOleSize" },
        550: { n: "BrtDrawing", f: yt },
        551: { n: "BrtLegacyDrawing" },
        552: { n: "BrtLegacyDrawingHF" },
        553: { n: "BrtWebOpt" },
        554: { n: "BrtBeginWebPubItems" },
        555: { n: "BrtEndWebPubItems" },
        556: { n: "BrtBeginWebPubItem" },
        557: { n: "BrtEndWebPubItem" },
        558: { n: "BrtBeginSXCondFmt" },
        559: { n: "BrtEndSXCondFmt" },
        560: { n: "BrtBeginSXCondFmts" },
        561: { n: "BrtEndSXCondFmts" },
        562: { n: "BrtBkHim" },
        564: { n: "BrtColor" },
        565: { n: "BrtBeginIndexedColors" },
        566: { n: "BrtEndIndexedColors" },
        569: { n: "BrtBeginMRUColors" },
        570: { n: "BrtEndMRUColors" },
        572: { n: "BrtMRUColor" },
        573: { n: "BrtBeginDVals" },
        574: { n: "BrtEndDVals" },
        577: { n: "BrtSupNameStart" },
        578: { n: "BrtSupNameValueStart" },
        579: { n: "BrtSupNameValueEnd" },
        580: { n: "BrtSupNameNum" },
        581: { n: "BrtSupNameErr" },
        582: { n: "BrtSupNameSt" },
        583: { n: "BrtSupNameNil" },
        584: { n: "BrtSupNameBool" },
        585: { n: "BrtSupNameFmla" },
        586: { n: "BrtSupNameBits" },
        587: { n: "BrtSupNameEnd" },
        588: { n: "BrtEndSupBook" },
        589: { n: "BrtCellSmartTagProperty" },
        590: { n: "BrtBeginCellSmartTag" },
        591: { n: "BrtEndCellSmartTag" },
        592: { n: "BrtBeginCellSmartTags" },
        593: { n: "BrtEndCellSmartTags" },
        594: { n: "BrtBeginSmartTags" },
        595: { n: "BrtEndSmartTags" },
        596: { n: "BrtSmartTagType" },
        597: { n: "BrtBeginSmartTagTypes" },
        598: { n: "BrtEndSmartTagTypes" },
        599: { n: "BrtBeginSXFilters" },
        600: { n: "BrtEndSXFilters" },
        601: { n: "BrtBeginSXFILTER" },
        602: { n: "BrtEndSXFilter" },
        603: { n: "BrtBeginFills" },
        604: { n: "BrtEndFills" },
        605: { n: "BrtBeginCellWatches" },
        606: { n: "BrtEndCellWatches" },
        607: { n: "BrtCellWatch" },
        608: { n: "BrtBeginCRErrs" },
        609: { n: "BrtEndCRErrs" },
        610: { n: "BrtCrashRecErr" },
        611: { n: "BrtBeginFonts" },
        612: { n: "BrtEndFonts" },
        613: { n: "BrtBeginBorders" },
        614: { n: "BrtEndBorders" },
        615: { n: "BrtBeginFmts" },
        616: { n: "BrtEndFmts" },
        617: { n: "BrtBeginCellXFs" },
        618: { n: "BrtEndCellXFs" },
        619: { n: "BrtBeginStyles" },
        620: { n: "BrtEndStyles" },
        625: { n: "BrtBigName" },
        626: { n: "BrtBeginCellStyleXFs" },
        627: { n: "BrtEndCellStyleXFs" },
        628: { n: "BrtBeginComments" },
        629: { n: "BrtEndComments" },
        630: { n: "BrtBeginCommentAuthors" },
        631: { n: "BrtEndCommentAuthors" },
        632: { n: "BrtCommentAuthor", f: Sl },
        633: { n: "BrtBeginCommentList" },
        634: { n: "BrtEndCommentList" },
        635: { n: "BrtBeginComment", f: kl },
        636: { n: "BrtEndComment" },
        637: { n: "BrtCommentText", f: kt },
        638: { n: "BrtBeginOleObjects" },
        639: { n: "BrtOleObject" },
        640: { n: "BrtEndOleObjects" },
        641: { n: "BrtBeginSxrules" },
        642: { n: "BrtEndSxRules" },
        643: { n: "BrtBeginActiveXControls" },
        644: { n: "BrtActiveX" },
        645: { n: "BrtEndActiveXControls" },
        646: { n: "BrtBeginPCDSDTCEMembersSortBy" },
        648: { n: "BrtBeginCellIgnoreECs" },
        649: { n: "BrtCellIgnoreEC" },
        650: { n: "BrtEndCellIgnoreECs" },
        651: { n: "BrtCsProp", f: Fd },
        652: { n: "BrtCsPageSetup" },
        653: { n: "BrtBeginUserCsViews" },
        654: { n: "BrtEndUserCsViews" },
        655: { n: "BrtBeginUserCsView" },
        656: { n: "BrtEndUserCsView" },
        657: { n: "BrtBeginPcdSFCIEntries" },
        658: { n: "BrtEndPCDSFCIEntries" },
        659: { n: "BrtPCDSFCIEntry" },
        660: { n: "BrtBeginListParts" },
        661: { n: "BrtListPart" },
        662: { n: "BrtEndListParts" },
        663: { n: "BrtSheetCalcProp" },
        664: { n: "BrtBeginFnGroup" },
        665: { n: "BrtFnGroup" },
        666: { n: "BrtEndFnGroup" },
        667: { n: "BrtSupAddin" },
        668: { n: "BrtSXTDMPOrder" },
        669: { n: "BrtCsProtection" },
        671: { n: "BrtBeginWsSortMap" },
        672: { n: "BrtEndWsSortMap" },
        673: { n: "BrtBeginRRSort" },
        674: { n: "BrtEndRRSort" },
        675: { n: "BrtRRSortItem" },
        676: { n: "BrtFileSharingIso" },
        677: { n: "BrtBookProtectionIso" },
        678: { n: "BrtSheetProtectionIso" },
        679: { n: "BrtCsProtectionIso" },
        680: { n: "BrtRangeProtectionIso" },
        1024: { n: "BrtRwDescent" },
        1025: { n: "BrtKnownFonts" },
        1026: { n: "BrtBeginSXTupleSet" },
        1027: { n: "BrtEndSXTupleSet" },
        1028: { n: "BrtBeginSXTupleSetHeader" },
        1029: { n: "BrtEndSXTupleSetHeader" },
        1030: { n: "BrtSXTupleSetHeaderItem" },
        1031: { n: "BrtBeginSXTupleSetData" },
        1032: { n: "BrtEndSXTupleSetData" },
        1033: { n: "BrtBeginSXTupleSetRow" },
        1034: { n: "BrtEndSXTupleSetRow" },
        1035: { n: "BrtSXTupleSetRowItem" },
        1036: { n: "BrtNameExt" },
        1037: { n: "BrtPCDH14" },
        1038: { n: "BrtBeginPCDCalcMem14" },
        1039: { n: "BrtEndPCDCalcMem14" },
        1040: { n: "BrtSXTH14" },
        1041: { n: "BrtBeginSparklineGroup" },
        1042: { n: "BrtEndSparklineGroup" },
        1043: { n: "BrtSparkline" },
        1044: { n: "BrtSXDI14" },
        1045: { n: "BrtWsFmtInfoEx14" },
        1046: { n: "BrtBeginConditionalFormatting14" },
        1047: { n: "BrtEndConditionalFormatting14" },
        1048: { n: "BrtBeginCFRule14" },
        1049: { n: "BrtEndCFRule14" },
        1050: { n: "BrtCFVO14" },
        1051: { n: "BrtBeginDatabar14" },
        1052: { n: "BrtBeginIconSet14" },
        1053: { n: "BrtDVal14" },
        1054: { n: "BrtBeginDVals14" },
        1055: { n: "BrtColor14" },
        1056: { n: "BrtBeginSparklines" },
        1057: { n: "BrtEndSparklines" },
        1058: { n: "BrtBeginSparklineGroups" },
        1059: { n: "BrtEndSparklineGroups" },
        1061: { n: "BrtSXVD14" },
        1062: { n: "BrtBeginSxview14" },
        1063: { n: "BrtEndSxview14" },
        1066: { n: "BrtBeginPCD14" },
        1067: { n: "BrtEndPCD14" },
        1068: { n: "BrtBeginExtConn14" },
        1069: { n: "BrtEndExtConn14" },
        1070: { n: "BrtBeginSlicerCacheIDs" },
        1071: { n: "BrtEndSlicerCacheIDs" },
        1072: { n: "BrtBeginSlicerCacheID" },
        1073: { n: "BrtEndSlicerCacheID" },
        1075: { n: "BrtBeginSlicerCache" },
        1076: { n: "BrtEndSlicerCache" },
        1077: { n: "BrtBeginSlicerCacheDef" },
        1078: { n: "BrtEndSlicerCacheDef" },
        1079: { n: "BrtBeginSlicersEx" },
        1080: { n: "BrtEndSlicersEx" },
        1081: { n: "BrtBeginSlicerEx" },
        1082: { n: "BrtEndSlicerEx" },
        1083: { n: "BrtBeginSlicer" },
        1084: { n: "BrtEndSlicer" },
        1085: { n: "BrtSlicerCachePivotTables" },
        1086: { n: "BrtBeginSlicerCacheOlapImpl" },
        1087: { n: "BrtEndSlicerCacheOlapImpl" },
        1088: { n: "BrtBeginSlicerCacheLevelsData" },
        1089: { n: "BrtEndSlicerCacheLevelsData" },
        1090: { n: "BrtBeginSlicerCacheLevelData" },
        1091: { n: "BrtEndSlicerCacheLevelData" },
        1092: { n: "BrtBeginSlicerCacheSiRanges" },
        1093: { n: "BrtEndSlicerCacheSiRanges" },
        1094: { n: "BrtBeginSlicerCacheSiRange" },
        1095: { n: "BrtEndSlicerCacheSiRange" },
        1096: { n: "BrtSlicerCacheOlapItem" },
        1097: { n: "BrtBeginSlicerCacheSelections" },
        1098: { n: "BrtSlicerCacheSelection" },
        1099: { n: "BrtEndSlicerCacheSelections" },
        1100: { n: "BrtBeginSlicerCacheNative" },
        1101: { n: "BrtEndSlicerCacheNative" },
        1102: { n: "BrtSlicerCacheNativeItem" },
        1103: { n: "BrtRangeProtection14" },
        1104: { n: "BrtRangeProtectionIso14" },
        1105: { n: "BrtCellIgnoreEC14" },
        1111: { n: "BrtList14" },
        1112: { n: "BrtCFIcon" },
        1113: { n: "BrtBeginSlicerCachesPivotCacheIDs" },
        1114: { n: "BrtEndSlicerCachesPivotCacheIDs" },
        1115: { n: "BrtBeginSlicers" },
        1116: { n: "BrtEndSlicers" },
        1117: { n: "BrtWbProp14" },
        1118: { n: "BrtBeginSXEdit" },
        1119: { n: "BrtEndSXEdit" },
        1120: { n: "BrtBeginSXEdits" },
        1121: { n: "BrtEndSXEdits" },
        1122: { n: "BrtBeginSXChange" },
        1123: { n: "BrtEndSXChange" },
        1124: { n: "BrtBeginSXChanges" },
        1125: { n: "BrtEndSXChanges" },
        1126: { n: "BrtSXTupleItems" },
        1128: { n: "BrtBeginSlicerStyle" },
        1129: { n: "BrtEndSlicerStyle" },
        1130: { n: "BrtSlicerStyleElement" },
        1131: { n: "BrtBeginStyleSheetExt14" },
        1132: { n: "BrtEndStyleSheetExt14" },
        1133: { n: "BrtBeginSlicerCachesPivotCacheID" },
        1134: { n: "BrtEndSlicerCachesPivotCacheID" },
        1135: { n: "BrtBeginConditionalFormattings" },
        1136: { n: "BrtEndConditionalFormattings" },
        1137: { n: "BrtBeginPCDCalcMemExt" },
        1138: { n: "BrtEndPCDCalcMemExt" },
        1139: { n: "BrtBeginPCDCalcMemsExt" },
        1140: { n: "BrtEndPCDCalcMemsExt" },
        1141: { n: "BrtPCDField14" },
        1142: { n: "BrtBeginSlicerStyles" },
        1143: { n: "BrtEndSlicerStyles" },
        1144: { n: "BrtBeginSlicerStyleElements" },
        1145: { n: "BrtEndSlicerStyleElements" },
        1146: { n: "BrtCFRuleExt" },
        1147: { n: "BrtBeginSXCondFmt14" },
        1148: { n: "BrtEndSXCondFmt14" },
        1149: { n: "BrtBeginSXCondFmts14" },
        1150: { n: "BrtEndSXCondFmts14" },
        1152: { n: "BrtBeginSortCond14" },
        1153: { n: "BrtEndSortCond14" },
        1154: { n: "BrtEndDVals14" },
        1155: { n: "BrtEndIconSet14" },
        1156: { n: "BrtEndDatabar14" },
        1157: { n: "BrtBeginColorScale14" },
        1158: { n: "BrtEndColorScale14" },
        1159: { n: "BrtBeginSxrules14" },
        1160: { n: "BrtEndSxrules14" },
        1161: { n: "BrtBeginPRule14" },
        1162: { n: "BrtEndPRule14" },
        1163: { n: "BrtBeginPRFilters14" },
        1164: { n: "BrtEndPRFilters14" },
        1165: { n: "BrtBeginPRFilter14" },
        1166: { n: "BrtEndPRFilter14" },
        1167: { n: "BrtBeginPRFItem14" },
        1168: { n: "BrtEndPRFItem14" },
        1169: { n: "BrtBeginCellIgnoreECs14" },
        1170: { n: "BrtEndCellIgnoreECs14" },
        1171: { n: "BrtDxf14" },
        1172: { n: "BrtBeginDxF14s" },
        1173: { n: "BrtEndDxf14s" },
        1177: { n: "BrtFilter14" },
        1178: { n: "BrtBeginCustomFilters14" },
        1180: { n: "BrtCustomFilter14" },
        1181: { n: "BrtIconFilter14" },
        1182: { n: "BrtPivotCacheConnectionName" },
        2048: { n: "BrtBeginDecoupledPivotCacheIDs" },
        2049: { n: "BrtEndDecoupledPivotCacheIDs" },
        2050: { n: "BrtDecoupledPivotCacheID" },
        2051: { n: "BrtBeginPivotTableRefs" },
        2052: { n: "BrtEndPivotTableRefs" },
        2053: { n: "BrtPivotTableRef" },
        2054: { n: "BrtSlicerCacheBookPivotTables" },
        2055: { n: "BrtBeginSxvcells" },
        2056: { n: "BrtEndSxvcells" },
        2057: { n: "BrtBeginSxRow" },
        2058: { n: "BrtEndSxRow" },
        2060: { n: "BrtPcdCalcMem15" },
        2067: { n: "BrtQsi15" },
        2068: { n: "BrtBeginWebExtensions" },
        2069: { n: "BrtEndWebExtensions" },
        2070: { n: "BrtWebExtension" },
        2071: { n: "BrtAbsPath15" },
        2072: { n: "BrtBeginPivotTableUISettings" },
        2073: { n: "BrtEndPivotTableUISettings" },
        2075: { n: "BrtTableSlicerCacheIDs" },
        2076: { n: "BrtTableSlicerCacheID" },
        2077: { n: "BrtBeginTableSlicerCache" },
        2078: { n: "BrtEndTableSlicerCache" },
        2079: { n: "BrtSxFilter15" },
        2080: { n: "BrtBeginTimelineCachePivotCacheIDs" },
        2081: { n: "BrtEndTimelineCachePivotCacheIDs" },
        2082: { n: "BrtTimelineCachePivotCacheID" },
        2083: { n: "BrtBeginTimelineCacheIDs" },
        2084: { n: "BrtEndTimelineCacheIDs" },
        2085: { n: "BrtBeginTimelineCacheID" },
        2086: { n: "BrtEndTimelineCacheID" },
        2087: { n: "BrtBeginTimelinesEx" },
        2088: { n: "BrtEndTimelinesEx" },
        2089: { n: "BrtBeginTimelineEx" },
        2090: { n: "BrtEndTimelineEx" },
        2091: { n: "BrtWorkBookPr15" },
        2092: { n: "BrtPCDH15" },
        2093: { n: "BrtBeginTimelineStyle" },
        2094: { n: "BrtEndTimelineStyle" },
        2095: { n: "BrtTimelineStyleElement" },
        2096: { n: "BrtBeginTimelineStylesheetExt15" },
        2097: { n: "BrtEndTimelineStylesheetExt15" },
        2098: { n: "BrtBeginTimelineStyles" },
        2099: { n: "BrtEndTimelineStyles" },
        2100: { n: "BrtBeginTimelineStyleElements" },
        2101: { n: "BrtEndTimelineStyleElements" },
        2102: { n: "BrtDxf15" },
        2103: { n: "BrtBeginDxfs15" },
        2104: { n: "brtEndDxfs15" },
        2105: { n: "BrtSlicerCacheHideItemsWithNoData" },
        2106: { n: "BrtBeginItemUniqueNames" },
        2107: { n: "BrtEndItemUniqueNames" },
        2108: { n: "BrtItemUniqueName" },
        2109: { n: "BrtBeginExtConn15" },
        2110: { n: "BrtEndExtConn15" },
        2111: { n: "BrtBeginOledbPr15" },
        2112: { n: "BrtEndOledbPr15" },
        2113: { n: "BrtBeginDataFeedPr15" },
        2114: { n: "BrtEndDataFeedPr15" },
        2115: { n: "BrtTextPr15" },
        2116: { n: "BrtRangePr15" },
        2117: { n: "BrtDbCommand15" },
        2118: { n: "BrtBeginDbTables15" },
        2119: { n: "BrtEndDbTables15" },
        2120: { n: "BrtDbTable15" },
        2121: { n: "BrtBeginDataModel" },
        2122: { n: "BrtEndDataModel" },
        2123: { n: "BrtBeginModelTables" },
        2124: { n: "BrtEndModelTables" },
        2125: { n: "BrtModelTable" },
        2126: { n: "BrtBeginModelRelationships" },
        2127: { n: "BrtEndModelRelationships" },
        2128: { n: "BrtModelRelationship" },
        2129: { n: "BrtBeginECTxtWiz15" },
        2130: { n: "BrtEndECTxtWiz15" },
        2131: { n: "BrtBeginECTWFldInfoLst15" },
        2132: { n: "BrtEndECTWFldInfoLst15" },
        2133: { n: "BrtBeginECTWFldInfo15" },
        2134: { n: "BrtFieldListActiveItem" },
        2135: { n: "BrtPivotCacheIdVersion" },
        2136: { n: "BrtSXDI15" },
        65535: { n: "" }
    };
    var vp = N(dp, "n");
    var pp = { 3: { n: "BIFF2NUM", f: Rs }, 4: { n: "BIFF2STR", f: ys }, 6: { n: "Formula", f: Pu }, 9: { n: "BOF", f: fi }, 10: { n: "EOF", f: kn }, 12: { n: "CalcCount", f: Bn }, 13: { n: "CalcMode", f: Bn }, 14: { n: "CalcPrecision", f: _n }, 15: { n: "CalcRefMode", f: _n }, 16: { n: "CalcDelta", f: Mt }, 17: { n: "CalcIter", f: _n }, 18: { n: "Protect", f: _n }, 19: { n: "Password", f: Bn }, 20: { n: "Header", f: Ki }, 21: { n: "Footer", f: Ki }, 23: { n: "ExternSheet", f: Ji }, 24: { n: "Lbl", f: Qi }, 25: { n: "WinProtect", f: _n }, 26: { n: "VerticalPageBreaks" }, 27: { n: "HorizontalPageBreaks" }, 28: { n: "Note", f: is }, 29: { n: "Selection" }, 34: { n: "Date1904", f: _n }, 35: { n: "ExternName", f: $i }, 38: { n: "LeftMargin", f: Mt }, 39: { n: "RightMargin", f: Mt }, 40: { n: "TopMargin", f: Mt }, 41: { n: "BottomMargin", f: Mt }, 42: { n: "PrintRowCol", f: _n }, 43: { n: "PrintGrid", f: _n }, 47: { n: "FilePass", f: yo }, 49: { n: "Font", f: Ti }, 51: { n: "PrintSize", f: Bn }, 60: { n: "Continue" }, 61: { n: "Window1", f: Si }, 64: { n: "Backup", f: _n }, 65: { n: "Pane" }, 66: { n: "CodePage", f: Bn }, 77: { n: "Pls" }, 80: { n: "DCon" }, 81: { n: "DConRef" }, 82: { n: "DConName" }, 85: { n: "DefColWidth", f: Bn }, 89: { n: "XCT" }, 90: { n: "CRN" }, 91: { n: "FileSharing" }, 92: { n: "WriteAccess", f: ui }, 93: { n: "Obj", f: fs }, 94: { n: "Uncalced" }, 95: { n: "CalcSaveRecalc", f: _n }, 96: { n: "Template" }, 97: { n: "Intl" }, 99: { n: "ObjProtect", f: _n }, 125: { n: "ColInfo", f: ws }, 128: { n: "Guts", f: Wi }, 129: { n: "WsBool", f: di }, 130: { n: "GridSet", f: Bn }, 131: { n: "HCenter", f: _n }, 132: { n: "VCenter", f: _n }, 133: { n: "BoundSheet8", f: vi }, 134: { n: "WriteProtect" }, 140: { n: "Country", f: bs }, 141: { n: "HideObj", f: Bn }, 144: { n: "Sort" }, 146: { n: "Palette", f: Es }, 151: { n: "Sync" }, 152: { n: "LPr" }, 153: { n: "DxGCol" }, 154: { n: "FnGroupName" }, 155: { n: "FilterMode" }, 156: { n: "BuiltInFnGroupCount", f: Bn }, 157: { n: "AutoFilterInfo" }, 158: { n: "AutoFilter" }, 160: { n: "Scl", f: Ts }, 161: { n: "Setup", f: Ss }, 174: { n: "ScenMan" }, 175: { n: "SCENARIO" }, 176: { n: "SxView" }, 177: { n: "Sxvd" }, 178: { n: "SXVI" }, 180: { n: "SxIvd" }, 181: { n: "SXLI" }, 182: { n: "SXPI" }, 184: { n: "DocRoute" }, 185: { n: "RecipName" }, 189: { n: "MulRk", f: Pi }, 190: { n: "MulBlank", f: Ni }, 193: { n: "Mms", f: kn }, 197: { n: "SXDI" }, 198: { n: "SXDB" }, 199: { n: "SXFDB" }, 200: { n: "SXDBB" }, 201: { n: "SXNum" }, 202: { n: "SxBool", f: _n }, 203: { n: "SxErr" }, 204: { n: "SXInt" }, 205: { n: "SXString" }, 206: { n: "SXDtr" }, 207: { n: "SxNil" }, 208: { n: "SXTbl" }, 209: { n: "SXTBRGIITM" }, 210: { n: "SxTbpg" }, 211: { n: "ObProj" }, 213: { n: "SXStreamID" }, 215: { n: "DBCell" }, 216: { n: "SXRng" }, 217: { n: "SxIsxoper" }, 218: { n: "BookBool", f: Bn }, 220: { n: "DbOrParamQry" }, 221: { n: "ScenarioProtect", f: _n }, 222: { n: "OleObjectSize" }, 224: { n: "XF", f: Hi }, 225: { n: "InterfaceHdr", f: ci }, 226: { n: "InterfaceEnd", f: kn }, 227: { n: "SXVS" }, 229: { n: "MergeCells", f: ss }, 233: { n: "BkHim" }, 235: { n: "MsoDrawingGroup" }, 236: { n: "MsoDrawing" }, 237: { n: "MsoDrawingSelection" }, 239: { n: "PhoneticInfo" }, 240: { n: "SxRule" }, 241: { n: "SXEx" }, 242: { n: "SxFilt" }, 244: { n: "SxDXF" }, 245: { n: "SxItm" }, 246: { n: "SxName" }, 247: { n: "SxSelect" }, 248: { n: "SXPair" }, 249: { n: "SxFmla" }, 251: { n: "SxFormat" }, 252: { n: "SST", f: bi }, 253: { n: "LabelSst", f: xi }, 255: { n: "ExtSST", f: mi }, 256: { n: "SXVDEx" }, 259: { n: "SXFormula" }, 290: { n: "SXDBEx" }, 311: { n: "RRDInsDel" }, 312: { n: "RRDHead" }, 315: { n: "RRDChgCell" }, 317: { n: "RRTabId", f: xn }, 318: { n: "RRDRenSheet" }, 319: { n: "RRSort" }, 320: { n: "RRDMove" }, 330: { n: "RRFormat" }, 331: { n: "RRAutoFmt" }, 333: { n: "RRInsertSh" }, 334: { n: "RRDMoveBegin" }, 335: { n: "RRDMoveEnd" }, 336: { n: "RRDInsDelBegin" }, 337: { n: "RRDInsDelEnd" }, 338: { n: "RRDConflict" }, 339: { n: "RRDDefName" }, 340: { n: "RRDRstEtxp" }, 351: { n: "LRng" }, 352: { n: "UsesELFs", f: _n }, 353: { n: "DSF", f: kn }, 401: { n: "CUsr" }, 402: { n: "CbUsr" }, 403: { n: "UsrInfo" }, 404: { n: "UsrExcl" }, 405: { n: "FileLock" }, 406: { n: "RRDInfo" }, 407: { n: "BCUsrs" }, 408: { n: "UsrChk" }, 425: { n: "UserBView" }, 426: { n: "UserSViewBegin" }, 427: { n: "UserSViewEnd" }, 428: { n: "RRDUserView" }, 429: { n: "Qsi" }, 430: { n: "SupBook", f: Yi }, 431: { n: "Prot4Rev", f: _n }, 432: { n: "CondFmt" }, 433: { n: "CF" }, 434: { n: "DVal" }, 437: { n: "DConBin" }, 438: { n: "TxO", f: us }, 439: { n: "RefreshAll", f: _n }, 440: { n: "HLink", f: hs }, 441: { n: "Lel" }, 442: { n: "CodeName", f: On }, 443: { n: "SXFDBType" }, 444: { n: "Prot4RevPass", f: Bn }, 445: { n: "ObNoMacros" }, 446: { n: "Dv" }, 448: { n: "Excel9File", f: kn }, 449: { n: "RecalcId", f: ki, r: 2 }, 450: { n: "EntExU2", f: kn }, 512: { n: "Dimensions", f: Di }, 513: { n: "Blank", f: Bs }, 515: { n: "Number", f: Gi }, 516: { n: "Label", f: Ii }, 517: { n: "BoolErr", f: zi }, 518: { n: "Formula", f: Pu }, 519: { n: "String", f: xs }, 520: { n: "Row", f: gi }, 523: { n: "Index" }, 545: { n: "Array", f: ts }, 549: { n: "DefaultRowHeight", f: wi }, 566: { n: "Table" }, 574: { n: "Window2", f: Ci }, 638: { n: "RK", f: Fi }, 659: { n: "Style" }, 1030: { n: "Formula", f: Pu }, 1048: { n: "BigName" }, 1054: { n: "Format", f: yi }, 1084: { n: "ContinueBigName" }, 1212: { n: "ShrFmla", f: rs }, 2048: { n: "HLinkTooltip", f: vs }, 2049: { n: "WebPub" }, 2050: { n: "QsiSXTag" }, 2051: { n: "DBQueryExt" }, 2052: { n: "ExtString" }, 2053: { n: "TxtQry" }, 2054: { n: "Qsir" }, 2055: { n: "Qsif" }, 2056: { n: "RRDTQSIF" }, 2057: { n: "BOF", f: fi }, 2058: { n: "OleDbConn" }, 2059: { n: "WOpt" }, 2060: { n: "SXViewEx" }, 2061: { n: "SXTH" }, 2062: { n: "SXPIEx" }, 2063: { n: "SXVDTEx" }, 2064: { n: "SXViewEx9" }, 2066: { n: "ContinueFrt" }, 2067: { n: "RealTimeData" }, 2128: { n: "ChartFrtInfo" }, 2129: { n: "FrtWrapper" }, 2130: { n: "StartBlock" }, 2131: { n: "EndBlock" }, 2132: { n: "StartObject" }, 2133: { n: "EndObject" }, 2134: { n: "CatLab" }, 2135: { n: "YMult" }, 2136: { n: "SXViewLink" }, 2137: { n: "PivotChartBits" }, 2138: { n: "FrtFontList" }, 2146: { n: "SheetExt" }, 2147: { n: "BookExt", r: 12 }, 2148: { n: "SXAddl" }, 2149: { n: "CrErr" }, 2150: { n: "HFPicture" }, 2151: { n: "FeatHdr", f: kn }, 2152: { n: "Feat" }, 2154: { n: "DataLabExt" }, 2155: { n: "DataLabExtContents" }, 2156: { n: "CellWatch" }, 2161: { n: "FeatHdr11" }, 2162: { n: "Feature11" }, 2164: { n: "DropDownObjIds" }, 2165: { n: "ContinueFrt11" }, 2166: { n: "DConn" }, 2167: { n: "List12" }, 2168: { n: "Feature12" }, 2169: { n: "CondFmt12" }, 2170: { n: "CF12" }, 2171: { n: "CFEx" }, 2172: { n: "XFCRC", f: ks, r: 12 }, 2173: { n: "XFExt", f: al, r: 12 }, 2174: { n: "AutoFilter12" }, 2175: { n: "ContinueFrt12" }, 2180: { n: "MDTInfo" }, 2181: { n: "MDXStr" }, 2182: { n: "MDXTuple" }, 2183: { n: "MDXSet" }, 2184: { n: "MDXProp" }, 2185: { n: "MDXKPI" }, 2186: { n: "MDB" }, 2187: { n: "PLV" }, 2188: { n: "Compat12", f: _n, r: 12 }, 2189: { n: "DXF" }, 2190: { n: "TableStyles", r: 12 }, 2191: { n: "TableStyle" }, 2192: { n: "TableStyleElement" }, 2194: { n: "StyleExt" }, 2195: { n: "NamePublish" }, 2196: { n: "NameCmt", f: es, r: 12 }, 2197: { n: "SortData" }, 2198: { n: "Theme", f: Qf, r: 12 }, 2199: { n: "GUIDTypeLib" }, 2200: { n: "FnGrp12" }, 2201: { n: "NameFnGrp12" }, 2202: { n: "MTRSettings", f: as, r: 12 }, 2203: { n: "CompressPictures", f: kn }, 2204: { n: "HeaderFooter" }, 2205: { n: "CrtLayout12" }, 2206: { n: "CrtMlFrt" }, 2207: { n: "CrtMlFrtContinue" }, 2211: { n: "ForceFullCalculation", f: Ei }, 2212: { n: "ShapePropsStream" }, 2213: { n: "TextPropsStream" }, 2214: { n: "RichTextStream" }, 2215: { n: "CrtLayout12A" }, 4097: { n: "Units" }, 4098: { n: "Chart" }, 4099: { n: "Series" }, 4102: { n: "DataFormat" }, 4103: { n: "LineFormat" }, 4105: { n: "MarkerFormat" }, 4106: { n: "AreaFormat" }, 4107: { n: "PieFormat" }, 4108: { n: "AttachedLabel" }, 4109: { n: "SeriesText" }, 4116: { n: "ChartFormat" }, 4117: { n: "Legend" }, 4118: { n: "SeriesList" }, 4119: { n: "Bar" }, 4120: { n: "Line" }, 4121: { n: "Pie" }, 4122: { n: "Area" }, 4123: { n: "Scatter" }, 4124: { n: "CrtLine" }, 4125: { n: "Axis" }, 4126: { n: "Tick" }, 4127: { n: "ValueRange" }, 4128: { n: "CatSerRange" }, 4129: { n: "AxisLine" }, 4130: { n: "CrtLink" }, 4132: { n: "DefaultText" }, 4133: { n: "Text" }, 4134: { n: "FontX", f: Bn }, 4135: { n: "ObjectLink" }, 4146: { n: "Frame" }, 4147: { n: "Begin" }, 4148: { n: "End" }, 4149: { n: "PlotArea" }, 4154: { n: "Chart3d" }, 4156: { n: "PicF" }, 4157: { n: "DropBar" }, 4158: { n: "Radar" }, 4159: { n: "Surf" }, 4160: { n: "RadarArea" }, 4161: { n: "AxisParent" }, 4163: { n: "LegendException" }, 4164: { n: "ShtProps", f: _s }, 4165: { n: "SerToCrt" }, 4166: { n: "AxesUsed" }, 4168: { n: "SBaseRef" }, 4170: { n: "SerParent" }, 4171: { n: "SerAuxTrend" }, 4174: { n: "IFmtRecord" }, 4175: { n: "Pos" }, 4176: { n: "AlRuns" }, 4177: { n: "BRAI" }, 4187: { n: "SerAuxErrBar" }, 4188: { n: "ClrtClient", f: gs }, 4189: { n: "SerFmt" }, 4191: { n: "Chart3DBarShape" }, 4192: { n: "Fbi" }, 4193: { n: "BopPop" }, 4194: { n: "AxcExt" }, 4195: { n: "Dat" }, 4196: { n: "PlotGrowth" }, 4197: { n: "SIIndex" }, 4198: { n: "GelFrame" }, 4199: { n: "BopPopCustom" }, 4200: { n: "Fbi2" }, 0: { n: "Dimensions", f: Di }, 2: { n: "BIFF2INT", f: Os }, 5: { n: "BoolErr", f: zi }, 7: { n: "String", f: Ps }, 8: { n: "BIFF2ROW" }, 11: { n: "Index" }, 22: { n: "ExternCount", f: Bn }, 30: { n: "BIFF2FORMAT", f: Ri }, 31: { n: "BIFF2FMTCNT" }, 32: { n: "BIFF2COLINFO" }, 33: { n: "Array", f: ts }, 37: { n: "DefaultRowHeight", f: wi }, 50: { n: "BIFF2FONTXTRA", f: Ns }, 52: { n: "DDEObjName" }, 62: { n: "BIFF2WINDOW2" }, 67: { n: "BIFF2XF" }, 69: { n: "BIFF2FONTCLR" }, 86: { n: "BIFF4FMTCNT" }, 126: { n: "RK" }, 127: { n: "ImData", f: Is }, 135: { n: "Addin" }, 136: { n: "Edg" }, 137: { n: "Pub" }, 145: { n: "Sub" }, 148: { n: "LHRecord" }, 149: { n: "LHNGraph" }, 150: { n: "Sound" }, 169: { n: "CoordList" }, 171: { n: "GCW" }, 188: { n: "ShrFmla" }, 191: { n: "ToolbarHdr" }, 192: { n: "ToolbarEnd" }, 194: { n: "AddMenu" }, 195: { n: "DelMenu" }, 214: { n: "RString", f: Ls }, 223: { n: "UDDesc" }, 234: { n: "TabIdConf" }, 354: { n: "XL5Modify" }, 421: { n: "FileSharing2" }, 521: { n: "BOF", f: fi }, 536: { n: "Lbl", f: Qi }, 547: { n: "ExternName", f: $i }, 561: { n: "Font" }, 579: { n: "BIFF3XF" }, 1033: { n: "BOF", f: fi }, 1091: { n: "BIFF4XF" }, 2157: { n: "FeatInfo" }, 2163: { n: "FeatInfo11" }, 2177: { n: "SXAddl12" }, 2240: { n: "AutoWebPub" }, 2241: { n: "ListObj" }, 2242: { n: "ListField" }, 2243: { n: "ListDV" }, 2244: { n: "ListCondFmt" }, 2245: { n: "ListCF" }, 2246: { n: "FMQry" }, 2247: { n: "FMSQry" }, 2248: { n: "PLV" }, 2249: { n: "LnExt" }, 2250: { n: "MkrExt" }, 2251: { n: "CrtCoopt" }, 2262: { n: "FRTArchId$", r: 12 }, 29282: {} };
    var bp = N(pp, "n");

    function mp(e, r, t, a) { var n = +r || +bp[r]; if (isNaN(n)) return; var i = a || (t || []).length || 0; var s = e.next(4);
        s._W(2, n);
        s._W(2, i); if (i > 0 && Er(t)) e.push(t) }

    function gp(e, r, t) { if (!e) e = Nr(7);
        e._W(2, r);
        e._W(2, t);
        e._W(2, 0);
        e._W(1, 0); return e }

    function Ep(e, r, t, a) { var n = Nr(9);
        gp(n, e, r); if (a == "e") { n._W(1, t);
            n._W(1, 1) } else { n._W(1, t ? 1 : 0);
            n._W(1, 0) } return n }

    function kp(e, r, t) { var a = Nr(8 + 2 * t.length);
        gp(a, e, r);
        a._W(1, t.length);
        a._W(t.length, t, "sbcs"); return a.l < a.length ? a.slice(0, a.l) : a }

    function wp(e, r, t, a, n) { if (r.v != null) switch (r.t) {
            case "d":
                ;
            case "n":
                var i = r.t == "d" ? V(K(r.v)) : r.v; if (i == (i | 0) && i >= 0 && i < 65536) mp(e, 2, Fs(t, a, i));
                else mp(e, 3, Ds(t, a, i)); return;
            case "b":
                ;
            case "e":
                mp(e, 5, Ep(t, a, r.v, r.t)); return;
            case "s":
                ;
            case "str":
                mp(e, 4, kp(t, a, r.v)); return; } mp(e, 1, gp(null, t, a)) }

    function Sp(e, r, t, a, n) { var i = Array.isArray(r); var s = ot(r["!ref"] || "A1"),
            o, f = "",
            l = []; for (var c = s.s.r; c <= s.e.r; ++c) { f = Kr(c); for (var u = s.s.c; u <= s.e.c; ++u) { if (c === s.s.r) l[u] = Qr(u);
                o = l[u] + f; var h = i ? (r[c] || [])[u] : r[o]; if (!h) continue;
                wp(e, h, c, u, a) } } }

    function _p(e, r) { var t = r || {}; if (b != null && t.dense == null) t.dense = b; var a = Mr(); var n = 0; for (var i = 0; i < e.SheetNames.length; ++i)
            if (e.SheetNames[i] == t.sheet) n = i; if (n == 0 && !!t.sheet && e.SheetNames[0] != t.sheet) throw new Error("Sheet not found: " + t.sheet);
        mp(a, 9, li(e, 16, t));
        Sp(a, e.Sheets[e.SheetNames[n]], n, t, e);
        mp(a, 10); return a.end() }

    function Cp(e, r) { for (var t = 0; t < r["!links"].length; ++t) { var a = r["!links"][t];
            mp(e, "HLink", ds(a)); if (a[1].Tooltip) mp(e, "HLinkTooltip", ps(a)) } delete r["!links"] }

    function Bp(e, r, t, a, n) { if (r.v != null) switch (r.t) {
            case "d":
                ;
            case "n":
                var i = r.t == "d" ? V(K(r.v)) : r.v;
                mp(e, "Number", ji(t, a, i, n)); return;
            case "b":
                ;
            case "e":
                mp(e, "BoolErr", Xi(t, a, r.v, n, r.t)); return;
            case "s":
                ;
            case "str":
                mp(e, "Label", Ai(t, a, r.v, n)); return; } mp(e, "Blank", jn(t, a)) }

    function Tp(e, r, t) { var a = Mr(); var n = t.SheetNames[e],
            i = t.Sheets[n] || {}; var s = (t || {}).Workbook || {}; var o = (s.Sheets || [])[e] || {}; var f = Array.isArray(i); var l, c = "",
            u = []; var h = ot(i["!ref"] || "A1"); var d = r.biff == 8,
            v = r.biff == 5;
        mp(a, 2057, li(t, 16, r));
        mp(a, "CalcMode", Tn(1));
        mp(a, "CalcCount", Tn(100));
        mp(a, "CalcRefMode", Cn(true));
        mp(a, "CalcIter", Cn(false));
        mp(a, "CalcDelta", Ut(.001));
        mp(a, "CalcSaveRecalc", Cn(true));
        mp(a, "PrintRowCol", Cn(false));
        mp(a, "PrintGrid", Cn(false));
        mp(a, "GridSet", Tn(1));
        mp(a, "Guts", Vi([0, 0]));
        mp(a, "HCenter", Cn(false));
        mp(a, "VCenter", Cn(false));
        mp(a, "Dimensions", Oi(h, r)); if (d) i["!links"] = []; for (var p = h.s.r; p <= h.e.r; ++p) { c = Kr(p); for (var b = h.s.c; b <= h.e.c; ++b) { if (p === h.s.r) u[b] = Qr(b);
                l = u[b] + c; var m = f ? (i[p] || [])[b] : i[l]; if (!m) continue;
                Bp(a, m, p, b, r); if (d && m.l) i["!links"].push([l, m.l]) } } var g = o.CodeName || o.name || n; if (d && s.Views) mp(a, "Window2", Bi(s.Views[0])); if (d) mp(a, "MergeCells", os(i["!merges"] || [])); if (d) Cp(a, i);
        mp(a, "CodeName", Pn(g, r));
        mp(a, "EOF"); return a.end() }

    function xp(e, r, t) { var a = Mr(); var n = (e.Workbook || {}).WBProps || {}; var i = t.biff == 8,
            s = t.biff == 5;
        mp(a, 2057, li(e, 5, t)); if (t.bookType == "xla") mp(a, "Addin");
        mp(a, "InterfaceHdr", i ? Tn(1200) : null);
        mp(a, "Mms", wn(2)); if (s) mp(a, "ToolbarHdr"); if (s) mp(a, "ToolbarEnd");
        mp(a, "InterfaceEnd");
        mp(a, "WriteAccess", hi("SheetJS", t));
        mp(a, "CodePage", Tn(i ? 1200 : 1252)); if (i) mp(a, "DSF", Tn(0));
        mp(a, "RRTabId", Cs(e.SheetNames.length)); if (i && e.vbaraw) { mp(a, "ObProj"); var o = n.CodeName || "ThisWorkbook";
            mp(a, "CodeName", Pn(o, t)) } mp(a, "BuiltInFnGroupCount", Tn(17));
        mp(a, "WinProtect", Cn(false));
        mp(a, "Protect", Cn(false));
        mp(a, "Password", Tn(0)); if (i) mp(a, "Prot4Rev", Cn(false)); if (i) mp(a, "Prot4RevPass", Tn(0));
        mp(a, "Window1", _i(t));
        mp(a, "Backup", Cn(false));
        mp(a, "HideObj", Tn(0));
        mp(a, "Date1904", Cn(Gd(e) == "true"));
        mp(a, "CalcPrecision", Cn(true)); if (i) mp(a, "RefreshAll", Cn(false));
        mp(a, "BookBool", Tn(0)); if (i) mp(a, "UsesELFs", Cn(false)); var f = a.end(); var l = Mr(); if (i) mp(l, "Country", ms());
        mp(l, "EOF"); var c = l.end(); var u = Mr(); var h = 0,
            d = 0; for (d = 0; d < e.SheetNames.length; ++d) h += (i ? 12 : 11) + (i ? 2 : 1) * e.SheetNames[d].length; var v = f.length + h + c.length; for (d = 0; d < e.SheetNames.length; ++d) { mp(u, "BoundSheet8", pi({ pos: v, hs: 0, dt: 0, name: e.SheetNames[d] }, t));
            v += r[d].length } var p = u.end(); if (h != p.length) throw new Error("BS8 " + h + " != " + p.length); var b = []; if (f.length) b.push(f); if (p.length) b.push(p); if (c.length) b.push(c); return qe([b]) }

    function Ip(e, r) { var t = r || {}; var a = []; for (var n = 0; n < e.SheetNames.length; ++n) a[a.length] = Tp(n, t, e);
        a.unshift(xp(e, a, t)); return qe([a]) }

    function Ap(e, r) { var t = r || {}; switch (t.biff || 2) {
            case 8:
                ;
            case 5:
                return Ip(e, r);
            case 4:
                ;
            case 3:
                ;
            case 2:
                return _p(e, r); } throw new Error("invalid type " + t.bookType + " for BIFF") }
    var yp = function() {
        function e(e, r) { var t = r || {}; if (b != null && t.dense == null) t.dense = b; var a = t.dense ? [] : {}; var n = e.match(/<table/i); if (!n) throw new Error("Invalid HTML: could not find <table>"); var i = e.match(/<\/table/i); var s = n.index,
                o = i && i.index || e.length; var f = ee(e.slice(s, o), /(:?<tr[^>]*>)/i, "<tr>"); var l = -1,
                c = 0,
                u = 0,
                h = 0; var d = { s: { r: 1e7, c: 1e7 }, e: { r: 0, c: 0 } }; var v = [],
                p = 0; for (s = 0; s < f.length; ++s) { var m = f[s].trim(); var g = m.substr(0, 3).toLowerCase(); if (g == "<tr") {++l;
                    c = 0; continue } if (g != "<td") continue; var E = m.split(/<\/td>/i); for (o = 0; o < E.length; ++o) { var k = E[o].trim(); if (k.substr(0, 3).toLowerCase() != "<td") continue; var w = k,
                        S = 0; while (w.charAt(0) == "<" && (S = w.indexOf(">")) > -1) w = w.slice(S + 1); var _ = me(k.slice(0, k.indexOf(">")));
                    h = _.colspan ? +_.colspan : 1; if ((u = +_.rowspan) > 0 || h > 1) v.push({ s: { r: l, c: c }, e: { r: l + (u || 1) - 1, c: c + h - 1 } }); var C = _.t || ""; if (!w.length) { c += h; continue } w = Me(we(w)); if (d.s.r > l) d.s.r = l; if (d.e.r < l) d.e.r = l; if (d.s.c > c) d.s.c = c; if (d.e.c < c) d.e.c = c; if (!w.length) continue; var B = { t: "s", v: w }; if (t.raw || !w.trim().length || C == "s") {} else if (w === "TRUE") B = { t: "b", v: true };
                    else if (w === "FALSE") B = { t: "b", v: false };
                    else if (!isNaN(Q(w))) B = { t: "n", v: Q(w) };
                    else if (!isNaN(J(w).getDate())) { B = { t: "d", v: K(w) }; if (!t.cellDates) B = { t: "n", v: V(B.v) };
                        B.z = t.dateNF || x._table[14] } if (t.dense) { if (!a[l]) a[l] = [];
                        a[l][c] = B } else a[tt({ r: l, c: c })] = B;
                    c += h } } a["!ref"] = st(d); return a }

        function r(r, t) { return ct(e(r, t), t) }

        function t(e, r, t, a) {
            var n = e["!merges"] || [];
            var i = [];
            var s = "<td>" + (a.editable ? '<span contenteditable="true"></span>' : "") + "</td>";
            for (var o = r.s.c; o <= r.e.c; ++o) {
                var f = 0,
                    l = 0;
                for (var c = 0; c < n.length; ++c) {
                    if (n[c].s.r > t || n[c].s.c > o) continue;
                    if (n[c].e.r < t || n[c].e.c < o) continue;
                    if (n[c].s.r < t || n[c].s.c < o) {
                        f = -1;
                        break
                    }
                    f = n[c].e.r - n[c].s.r + 1;
                    l = n[c].e.c - n[c].s.c + 1;
                    break
                }
                if (f < 0) continue;
                var u = tt({ r: t, c: o });
                var h = a.dense ? (e[t] || [])[o] : e[u];
                if (!h || h.v == null) { i.push(s); continue }
                var d = h.h || Ce(h.w || (lt(h), h.w) || "");
                var v = {};
                if (f > 1) v.rowspan = f;
                if (l > 1) v.colspan = l;
                v.t = h.t;
                if (a.editable) d = '<span contenteditable="true">' + d + "</span>";
                v.id = "sjs-" + u;
                i.push(je("td", d, v))
            }
            var p = "<tr>";
            return p + i.join("") + "</tr>"
        }

        function a(e, r, t) { var a = []; return a.join("") + "<table>" }
        var n = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>';
        var i = "</body></html>";

        function s(e, r, s) { var o = r || {}; var f = o.header != null ? o.header : n; var l = o.footer != null ? o.footer : i; var c = [f]; var u = it(e["!ref"]);
            o.dense = Array.isArray(e);
            c.push(a(e, u, o)); for (var h = u.s.r; h <= u.e.r; ++h) c.push(t(e, u, h, o));
            c.push("</table>" + l); return c.join("") }
        return { to_workbook: r, to_sheet: e, _row: t, BEGIN: n, END: i, _preamble: a, from_sheet: s }
    }();

    function Rp(e, r) { var t = r || {}; if (b != null) t.dense = b; var a = t.dense ? [] : {}; var n = e.getElementsByTagName("tr"); var i = { s: { r: 0, c: 0 }, e: { r: n.length - 1, c: 0 } }; var s = [],
            o = 0; var f = 0,
            l = 0,
            c = 0,
            u = 0,
            h = 0; for (; f < n.length; ++f) { var d = n[f]; var v = d.children; for (l = c = 0; l < v.length; ++l) { var p = v[l],
                    m = Me(v[l].innerHTML); for (o = 0; o < s.length; ++o) { var g = s[o]; if (g.s.c == c && g.s.r <= f && f <= g.e.r) { c = g.e.c + 1;
                        o = -1 } } h = +p.getAttribute("colspan") || 1; if ((u = +p.getAttribute("rowspan")) > 0 || h > 1) s.push({ s: { r: f, c: c }, e: { r: f + (u || 1) - 1, c: c + h - 1 } }); var E = { t: "s", v: m }; var k = p.getAttribute("t") || ""; if (m != null) { if (m.length == 0) E.t = k || "z";
                    else if (t.raw || m.trim().length == 0 || k == "s") {} else if (m === "TRUE") E = { t: "b", v: true };
                    else if (m === "FALSE") E = { t: "b", v: false };
                    else if (!isNaN(Q(m))) E = { t: "n", v: Q(m) };
                    else if (!isNaN(J(m).getDate())) { E = { t: "d", v: K(m) }; if (!t.cellDates) E = { t: "n", v: V(E.v) };
                        E.z = t.dateNF || x._table[14] } } if (t.dense) { if (!a[f]) a[f] = [];
                    a[f][c] = E } else a[tt({ c: c, r: f })] = E; if (i.e.c < c) i.e.c = c;
                c += h } } a["!merges"] = s;
        a["!ref"] = st(i); return a }

    function Dp(e, r) { return ct(Rp(e, r), r) }
    var Op = function() { var e = function(e, r) { return we(e.replace(/[\t\r\n]/g, " ").trim().replace(/ +/g, " ").replace(/<text:s\/>/g, " ").replace(/<text:s text:c="(\d+)"\/>/g, function(e, r) { return Array(parseInt(r, 10) + 1).join(" ") }).replace(/<text:tab[^>]*\/>/g, "\t").replace(/<text:line-break\/>/g, "\n").replace(/<[^>]*>/g, "")) }; var r = { day: ["d", "dd"], month: ["m", "mm"], year: ["y", "yy"], hours: ["h", "hh"], minutes: ["m", "mm"], seconds: ["s", "ss"], "am-pm": ["A/P", "AM/PM"], "day-of-week": ["ddd", "dddd"], era: ["e", "ee"], quarter: ["\\Qm", 'm\\"th quarter"'] }; return function t(a, n) { var i = n || {}; if (b != null && i.dense == null) i.dense = b; var s = Vv(a); var o = [],
                f; var l; var c = { name: "" },
                u = "",
                h = 0; var d; var v; var p = {},
                m = []; var g = i.dense ? [] : {}; var E, k; var w = { value: "" }; var S = "",
                _ = 0,
                C; var B = -1,
                T = -1,
                x = { s: { r: 1e6, c: 1e7 }, e: { r: 0, c: 0 } }; var I = 0; var A = {}; var y = [],
                R = {},
                D = 0,
                O = 0; var F = [],
                P = 1,
                N = 1; var L = []; var M = { Names: [] }; var U = {}; var H = ["", ""]; var W = [],
                z = {}; var G = "",
                j = 0; var Y = false,
                Z = false; var Q = 0;
            zv.lastIndex = 0;
            s = s.replace(/<!--([\s\S]*?)-->/gm, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, ""); while (E = zv.exec(s)) switch (E[3] = E[3].replace(/_.*$/, "")) {
                case "table":
                    ;
                case "工作表":
                    if (E[1] === "/") { if (x.e.c >= x.s.c && x.e.r >= x.s.r) g["!ref"] = st(x); if (y.length) g["!merges"] = y; if (F.length) g["!rows"] = F;
                        d.name = De(d["名称"] || d.name);
                        m.push(d.name);
                        p[d.name] = g;
                        Z = false } else if (E[0].charAt(E[0].length - 2) !== "/") { d = me(E[0], false);
                        B = T = -1;
                        x.s.r = x.s.c = 1e7;
                        x.e.r = x.e.c = 0;
                        g = i.dense ? [] : {};
                        y = [];
                        F = [];
                        Z = true } break;
                case "table-row-group":
                    if (E[1] === "/") --I;
                    else ++I; break;
                case "table-row":
                    ;
                case "行":
                    if (E[1] === "/") { B += P;
                        P = 1; break } v = me(E[0], false); if (v["行号"]) B = v["行号"] - 1;
                    else if (B == -1) B = 0;
                    P = +v["number-rows-repeated"] || 1; if (P < 10)
                        for (Q = 0; Q < P; ++Q)
                            if (I > 0) F[B + Q] = { level: I };
                    T = -1; break;
                case "covered-table-cell":
                    ++T; if (i.sheetStubs) { if (i.dense) { if (!g[B]) g[B] = [];
                            g[B][T] = { t: "z" } } else g[tt({ r: B, c: T })] = { t: "z" } } break;
                case "table-cell":
                    ;
                case "数据":
                    if (E[0].charAt(E[0].length - 2) === "/") {++T;
                        w = me(E[0], false);
                        N = parseInt(w["number-columns-repeated"] || "1", 10);
                        k = { t: "z", v: null }; if (w.formula && i.cellFormula != false) k.f = ju(we(w.formula)); if ((w["数据类型"] || w["value-type"]) == "string") { k.t = "s";
                            k.v = we(w["string-value"] || ""); if (i.dense) { if (!g[B]) g[B] = [];
                                g[B][T] = k } else { g[tt({ r: B, c: T })] = k } } T += N - 1 } else if (E[1] !== "/") {++T;
                        N = 1; if (T > x.e.c) x.e.c = T; if (B > x.e.r) x.e.r = B; if (T < x.s.c) x.s.c = T; if (B < x.s.r) x.s.r = B;
                        w = me(E[0], false);
                        W = [];
                        z = {};
                        k = { t: w["数据类型"] || w["value-type"], v: null }; if (i.cellFormula) { if (w.formula) w.formula = we(w.formula); if (w["number-matrix-columns-spanned"] && w["number-matrix-rows-spanned"]) { D = parseInt(w["number-matrix-rows-spanned"], 10) || 0;
                                O = parseInt(w["number-matrix-columns-spanned"], 10) || 0;
                                R = { s: { r: B, c: T }, e: { r: B + D - 1, c: T + O - 1 } };
                                k.F = st(R);
                                L.push([R, k.F]) } if (w.formula) k.f = ju(w.formula);
                            else
                                for (Q = 0; Q < L.length; ++Q)
                                    if (B >= L[Q][0].s.r && B <= L[Q][0].e.r)
                                        if (T >= L[Q][0].s.c && T <= L[Q][0].e.c) k.F = L[Q][1] } if (w["number-columns-spanned"] || w["number-rows-spanned"]) { D = parseInt(w["number-rows-spanned"], 10) || 0;
                            O = parseInt(w["number-columns-spanned"], 10) || 0;
                            R = { s: { r: B, c: T }, e: { r: B + D - 1, c: T + O - 1 } };
                            y.push(R) } if (w["number-columns-repeated"]) N = parseInt(w["number-columns-repeated"], 10); switch (k.t) {
                            case "boolean":
                                k.t = "b";
                                k.v = Re(w["boolean-value"]); break;
                            case "float":
                                k.t = "n";
                                k.v = parseFloat(w.value); break;
                            case "percentage":
                                k.t = "n";
                                k.v = parseFloat(w.value); break;
                            case "currency":
                                k.t = "n";
                                k.v = parseFloat(w.value); break;
                            case "date":
                                k.t = "d";
                                k.v = K(w["date-value"]); if (!i.cellDates) { k.t = "n";
                                    k.v = V(k.v) } k.z = "m/d/yy"; break;
                            case "time":
                                k.t = "n";
                                k.v = X(w["time-value"]) / 86400; break;
                            case "number":
                                k.t = "n";
                                k.v = parseFloat(w["数据数值"]); break;
                            default:
                                if (k.t === "string" || k.t === "text" || !k.t) { k.t = "s"; if (w["string-value"] != null) S = we(w["string-value"]) } else throw new Error("Unsupported value type " + k.t); } } else { Y = false; if (k.t === "s") { k.v = S || "";
                            Y = _ == 0 } if (U.Target) k.l = U; if (W.length > 0) { k.c = W;
                            W = [] } if (S && i.cellText !== false) k.w = S; if (!Y || i.sheetStubs) { if (!(i.sheetRows && i.sheetRows < B)) { for (var J = 0; J < P; ++J) { N = parseInt(w["number-columns-repeated"] || "1", 10); if (i.dense) { if (!g[B + J]) g[B + J] = [];
                                        g[B + J][T] = J == 0 ? k : $(k); while (--N > 0) g[B + J][T + N] = $(k) } else { g[tt({ r: B + J, c: T })] = k; while (--N > 0) g[tt({ r: B + J, c: T + N })] = $(k) } if (x.e.c <= T) x.e.c = T } } } N = parseInt(w["number-columns-repeated"] || "1", 10);
                        T += N - 1;
                        N = 0;
                        k = {};
                        S = "" } U = {}; break;
                case "document":
                    ;
                case "document-content":
                    ;
                case "电子表格文档":
                    ;
                case "spreadsheet":
                    ;
                case "主体":
                    ;
                case "scripts":
                    ;
                case "styles":
                    ;
                case "font-face-decls":
                    if (E[1] === "/") { if ((f = o.pop())[0] !== E[3]) throw "Bad state: " + f } else if (E[0].charAt(E[0].length - 2) !== "/") o.push([E[3], true]); break;
                case "annotation":
                    if (E[1] === "/") { if ((f = o.pop())[0] !== E[3]) throw "Bad state: " + f;
                        z.t = S;
                        z.a = G;
                        W.push(z) } else if (E[0].charAt(E[0].length - 2) !== "/") { o.push([E[3], false]) } G = "";
                    j = 0;
                    S = "";
                    _ = 0; break;
                case "creator":
                    if (E[1] === "/") { G = s.slice(j, E.index) } else j = E.index + E[0].length; break;
                case "meta":
                    ;
                case "元数据":
                    ;
                case "settings":
                    ;
                case "config-item-set":
                    ;
                case "config-item-map-indexed":
                    ;
                case "config-item-map-entry":
                    ;
                case "config-item-map-named":
                    ;
                case "shapes":
                    ;
                case "frame":
                    ;
                case "text-box":
                    ;
                case "image":
                    ;
                case "data-pilot-tables":
                    ;
                case "list-style":
                    ;
                case "form":
                    ;
                case "dde-links":
                    ;
                case "event-listeners":
                    ;
                case "chart":
                    if (E[1] === "/") { if ((f = o.pop())[0] !== E[3]) throw "Bad state: " + f } else if (E[0].charAt(E[0].length - 2) !== "/") o.push([E[3], false]);
                    S = "";
                    _ = 0; break;
                case "scientific-number":
                    break;
                case "currency-symbol":
                    break;
                case "currency-style":
                    break;
                case "number-style":
                    ;
                case "percentage-style":
                    ;
                case "date-style":
                    ;
                case "time-style":
                    if (E[1] === "/") { A[c.name] = u; if ((f = o.pop())[0] !== E[3]) throw "Bad state: " + f } else if (E[0].charAt(E[0].length - 2) !== "/") { u = "";
                        c = me(E[0], false);
                        o.push([E[3], true]) } break;
                case "script":
                    break;
                case "libraries":
                    break;
                case "automatic-styles":
                    break;
                case "master-styles":
                    break;
                case "default-style":
                    ;
                case "page-layout":
                    break;
                case "style":
                    break;
                case "map":
                    break;
                case "font-face":
                    break;
                case "paragraph-properties":
                    break;
                case "table-properties":
                    break;
                case "table-column-properties":
                    break;
                case "table-row-properties":
                    break;
                case "table-cell-properties":
                    break;
                case "number":
                    switch (o[o.length - 1][0]) {
                        case "time-style":
                            ;
                        case "date-style":
                            l = me(E[0], false);
                            u += r[E[3]][l.style === "long" ? 1 : 0]; break; } break;
                case "fraction":
                    break;
                case "day":
                    ;
                case "month":
                    ;
                case "year":
                    ;
                case "era":
                    ;
                case "day-of-week":
                    ;
                case "week-of-year":
                    ;
                case "quarter":
                    ;
                case "hours":
                    ;
                case "minutes":
                    ;
                case "seconds":
                    ;
                case "am-pm":
                    switch (o[o.length - 1][0]) {
                        case "time-style":
                            ;
                        case "date-style":
                            l = me(E[0], false);
                            u += r[E[3]][l.style === "long" ? 1 : 0]; break; } break;
                case "boolean-style":
                    break;
                case "boolean":
                    break;
                case "text-style":
                    break;
                case "text":
                    if (E[0].slice(-2) === "/>") break;
                    else if (E[1] === "/") switch (o[o.length - 1][0]) {
                        case "number-style":
                            ;
                        case "date-style":
                            ;
                        case "time-style":
                            u += s.slice(h, E.index); break; } else h = E.index + E[0].length; break;
                case "named-range":
                    l = me(E[0], false);
                    H = Yu(l["cell-range-address"]); var q = { Name: l.name, Ref: H[0] + "!" + H[1] }; if (Z) q.Sheet = m.length;
                    M.Names.push(q); break;
                case "text-content":
                    break;
                case "text-properties":
                    break;
                case "embedded-text":
                    break;
                case "body":
                    ;
                case "电子表格":
                    break;
                case "forms":
                    break;
                case "table-column":
                    break;
                case "table-header-rows":
                    break;
                case "table-rows":
                    break;
                case "table-column-group":
                    break;
                case "table-header-columns":
                    break;
                case "table-columns":
                    break;
                case "null-date":
                    break;
                case "graphic-properties":
                    break;
                case "calculation-settings":
                    break;
                case "named-expressions":
                    break;
                case "label-range":
                    break;
                case "label-ranges":
                    break;
                case "named-expression":
                    break;
                case "sort":
                    break;
                case "sort-by":
                    break;
                case "sort-groups":
                    break;
                case "tab":
                    break;
                case "line-break":
                    break;
                case "span":
                    break;
                case "p":
                    ;
                case "文本串":
                    if (E[1] === "/" && (!w || !w["string-value"])) S = (S.length > 0 ? S + "\n" : "") + e(s.slice(_, E.index), C);
                    else { C = me(E[0], false);
                        _ = E.index + E[0].length } break;
                case "s":
                    break;
                case "database-range":
                    if (E[1] === "/") break; try { H = Yu(me(E[0])["target-range-address"]);
                        p[H[0]]["!autofilter"] = { ref: H[1] } } catch (ee) {} break;
                case "date":
                    break;
                case "object":
                    break;
                case "title":
                    ;
                case "标题":
                    break;
                case "desc":
                    break;
                case "binary-data":
                    break;
                case "table-source":
                    break;
                case "scenario":
                    break;
                case "iteration":
                    break;
                case "content-validations":
                    break;
                case "content-validation":
                    break;
                case "help-message":
                    break;
                case "error-message":
                    break;
                case "database-ranges":
                    break;
                case "filter":
                    break;
                case "filter-and":
                    break;
                case "filter-or":
                    break;
                case "filter-condition":
                    break;
                case "list-level-style-bullet":
                    break;
                case "list-level-style-number":
                    break;
                case "list-level-properties":
                    break;
                case "sender-firstname":
                    ;
                case "sender-lastname":
                    ;
                case "sender-initials":
                    ;
                case "sender-title":
                    ;
                case "sender-position":
                    ;
                case "sender-email":
                    ;
                case "sender-phone-private":
                    ;
                case "sender-fax":
                    ;
                case "sender-company":
                    ;
                case "sender-phone-work":
                    ;
                case "sender-street":
                    ;
                case "sender-city":
                    ;
                case "sender-postal-code":
                    ;
                case "sender-country":
                    ;
                case "sender-state-or-province":
                    ;
                case "author-name":
                    ;
                case "author-initials":
                    ;
                case "chapter":
                    ;
                case "file-name":
                    ;
                case "template-name":
                    ;
                case "sheet-name":
                    break;
                case "event-listener":
                    break;
                case "initial-creator":
                    ;
                case "creation-date":
                    ;
                case "print-date":
                    ;
                case "generator":
                    ;
                case "document-statistic":
                    ;
                case "user-defined":
                    ;
                case "editing-duration":
                    ;
                case "editing-cycles":
                    break;
                case "config-item":
                    break;
                case "page-number":
                    break;
                case "page-count":
                    break;
                case "time":
                    break;
                case "cell-range-source":
                    break;
                case "detective":
                    break;
                case "operation":
                    break;
                case "highlighted-range":
                    break;
                case "data-pilot-table":
                    ;
                case "source-cell-range":
                    ;
                case "source-service":
                    ;
                case "data-pilot-field":
                    ;
                case "data-pilot-level":
                    ;
                case "data-pilot-subtotals":
                    ;
                case "data-pilot-subtotal":
                    ;
                case "data-pilot-members":
                    ;
                case "data-pilot-member":
                    ;
                case "data-pilot-display-info":
                    ;
                case "data-pilot-sort-info":
                    ;
                case "data-pilot-layout-info":
                    ;
                case "data-pilot-field-reference":
                    ;
                case "data-pilot-groups":
                    ;
                case "data-pilot-group":
                    ;
                case "data-pilot-group-member":
                    break;
                case "rect":
                    break;
                case "dde-connection-decls":
                    ;
                case "dde-connection-decl":
                    ;
                case "dde-link":
                    ;
                case "dde-source":
                    break;
                case "properties":
                    break;
                case "property":
                    break;
                case "a":
                    if (E[1] !== "/") { U = me(E[0], false); if (!U.href) break;
                        U.Target = U.href;
                        delete U.href; if (U.Target.charAt(0) == "#" && U.Target.indexOf(".") > -1) { H = Yu(U.Target.slice(1));
                            U.Target = "#" + H[0] + "!" + H[1] } } break;
                case "table-protection":
                    break;
                case "data-pilot-grand-total":
                    break;
                case "office-document-common-attrs":
                    break;
                default:
                    switch (E[2]) {
                        case "dc:":
                            ;
                        case "calcext:":
                            ;
                        case "loext:":
                            ;
                        case "ooo:":
                            ;
                        case "chartooo:":
                            ;
                        case "draw:":
                            ;
                        case "style:":
                            ;
                        case "chart:":
                            ;
                        case "form:":
                            ;
                        case "uof:":
                            ;
                        case "表:":
                            ;
                        case "字:":
                            break;
                        default:
                            if (i.WTF) throw new Error(E); }; }
            var re = { Sheets: p, SheetNames: m, Workbook: M }; if (i.bookSheets) delete re.Sheets; return re } }();

    function Fp(e, r) { r = r || {}; var t = !!ne(e, "objectdata"); if (t) var a = ya(se(e, "META-INF/manifest.xml"), r); var n = oe(e, "content.xml"); if (!n) throw new Error("Missing content.xml in " + (t ? "ODS" : "UOF") + " file"); var i = Op(t ? n : De(n), r); if (ne(e, "meta.xml")) i.Props = Ma(se(e, "meta.xml")); return i }

    function Pp(e, r) { return Op(e, r) }
    var Np = function() { var e = "<office:document-styles " + Ge({ "xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0", "xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0", "xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0", "xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0", "xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0", "xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0", "xmlns:xlink": "http://www.w3.org/1999/xlink", "xmlns:dc": "http://purl.org/dc/elements/1.1/", "xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0", "xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0", "xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2", "office:version": "1.2" }) + "></office:document-styles>"; return function r(t, a) { return he + e } }();
    var Lp = function() { var e = function(e) { return Ce(e).replace(/  +/g, function(e) { return '<text:s text:c="' + e.length + '"/>' }).replace(/\t/g, "<text:tab/>").replace(/\n/g, "<text:line-break/>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>") }; var r = "          <table:table-cell />\n"; var t = "          <table:covered-table-cell/>\n"; var a = function(a, n, i, s) { var o = [];
            o.push('      <table:table table:name="' + Ce(n.SheetNames[i]) + '">\n'); var f = 0,
                l = 0,
                c = it(a["!ref"]); var u = a["!merges"] || [],
                h = 0; var d = Array.isArray(a); for (f = 0; f < c.s.r; ++f) o.push("        <table:table-row></table:table-row>\n"); for (; f <= c.e.r; ++f) { o.push("        <table:table-row>\n"); for (l = 0; l < c.s.c; ++l) o.push(r); for (; l <= c.e.c; ++l) { var v = false,
                        p = {},
                        b = ""; for (h = 0; h != u.length; ++h) { if (u[h].s.c > l) continue; if (u[h].s.r > f) continue; if (u[h].e.c < l) continue; if (u[h].e.r < f) continue; if (u[h].s.c != l || u[h].s.r != f) v = true;
                        p["table:number-columns-spanned"] = u[h].e.c - u[h].s.c + 1;
                        p["table:number-rows-spanned"] = u[h].e.r - u[h].s.r + 1; break } if (v) { o.push(t); continue } var m = tt({ r: f, c: l }),
                        g = d ? (a[f] || [])[l] : a[m]; if (g && g.f) { p["table:formula"] = Ce(Ku(g.f)); if (g.F) { if (g.F.substr(0, m.length) == m) { var E = it(g.F);
                                p["table:number-matrix-columns-spanned"] = E.e.c - E.s.c + 1;
                                p["table:number-matrix-rows-spanned"] = E.e.r - E.s.r + 1 } } } if (!g) { o.push(r); continue } switch (g.t) {
                        case "b":
                            b = g.v ? "TRUE" : "FALSE";
                            p["office:value-type"] = "boolean";
                            p["office:boolean-value"] = g.v ? "true" : "false"; break;
                        case "n":
                            b = g.w || String(g.v || 0);
                            p["office:value-type"] = "float";
                            p["office:value"] = g.v || 0; break;
                        case "s":
                            ;
                        case "str":
                            b = g.v;
                            p["office:value-type"] = "string"; break;
                        case "d":
                            b = g.w || K(g.v).toISOString();
                            p["office:value-type"] = "date";
                            p["office:date-value"] = K(g.v).toISOString();
                            p["table:style-name"] = "ce1"; break;
                        default:
                            o.push(r); continue; } var k = e(b); if (g.l && g.l.Target) { var w = g.l.Target;
                        w = w.charAt(0) == "#" ? "#" + $u(w.slice(1)) : w;
                        k = je("text:a", k, { "xlink:href": w }) } o.push("          " + je("table:table-cell", je("text:p", k, {}), p) + "\n") } o.push("        </table:table-row>\n") } o.push("      </table:table>\n"); return o.join("") }; var n = function(e) { e.push(" <office:automatic-styles>\n");
            e.push('  <number:date-style style:name="N37" number:automatic-order="true">\n');
            e.push('   <number:month number:style="long"/>\n');
            e.push("   <number:text>/</number:text>\n");
            e.push('   <number:day number:style="long"/>\n');
            e.push("   <number:text>/</number:text>\n");
            e.push("   <number:year/>\n");
            e.push("  </number:date-style>\n");
            e.push('  <style:style style:name="ce1" style:family="table-cell" style:parent-style-name="Default" style:data-style-name="N37"/>\n');
            e.push(" </office:automatic-styles>\n") }; return function i(e, r) { var t = [he]; var i = Ge({ "xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0", "xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0", "xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0", "xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0", "xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0", "xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0", "xmlns:xlink": "http://www.w3.org/1999/xlink", "xmlns:dc": "http://purl.org/dc/elements/1.1/", "xmlns:meta": "urn:oasis:names:tc:opendocument:xmlns:meta:1.0", "xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0", "xmlns:presentation": "urn:oasis:names:tc:opendocument:xmlns:presentation:1.0", "xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0", "xmlns:chart": "urn:oasis:names:tc:opendocument:xmlns:chart:1.0", "xmlns:dr3d": "urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0", "xmlns:math": "http://www.w3.org/1998/Math/MathML", "xmlns:form": "urn:oasis:names:tc:opendocument:xmlns:form:1.0", "xmlns:script": "urn:oasis:names:tc:opendocument:xmlns:script:1.0", "xmlns:ooo": "http://openoffice.org/2004/office", "xmlns:ooow": "http://openoffice.org/2004/writer", "xmlns:oooc": "http://openoffice.org/2004/calc", "xmlns:dom": "http://www.w3.org/2001/xml-events", "xmlns:xforms": "http://www.w3.org/2002/xforms", "xmlns:xsd": "http://www.w3.org/2001/XMLSchema", "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance", "xmlns:sheet": "urn:oasis:names:tc:opendocument:sh33tjs:1.0", "xmlns:rpt": "http://openoffice.org/2005/report", "xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2", "xmlns:xhtml": "http://www.w3.org/1999/xhtml", "xmlns:grddl": "http://www.w3.org/2003/g/data-view#", "xmlns:tableooo": "http://openoffice.org/2009/table", "xmlns:drawooo": "http://openoffice.org/2010/draw", "xmlns:calcext": "urn:org:documentfoundation:names:experimental:calc:xmlns:calcext:1.0", "xmlns:loext": "urn:org:documentfoundation:names:experimental:office:xmlns:loext:1.0", "xmlns:field": "urn:openoffice:names:experimental:ooo-ms-interop:xmlns:field:1.0", "xmlns:formx": "urn:openoffice:names:experimental:ooxml-odf-interop:xmlns:form:1.0", "xmlns:css3t": "http://www.w3.org/TR/css3-text/", "office:version": "1.2" }); var s = Ge({ "xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0", "office:mimetype": "application/vnd.oasis.opendocument.spreadsheet" }); if (r.bookType == "fods") t.push("<office:document" + i + s + ">\n");
            else t.push("<office:document-content" + i + ">\n");
            n(t);
            t.push("  <office:body>\n");
            t.push("    <office:spreadsheet>\n"); for (var o = 0; o != e.SheetNames.length; ++o) t.push(a(e.Sheets[e.SheetNames[o]], e, o, r));
            t.push("    </office:spreadsheet>\n");
            t.push("  </office:body>\n"); if (r.bookType == "fods") t.push("</office:document>");
            else t.push("</office:document-content>"); return t.join("") } }();

    function Mp(e, r) { if (r.bookType == "fods") return Lp(e, r); var t = new le; var a = ""; var n = []; var i = [];
        a = "mimetype";
        t.file(a, "application/vnd.oasis.opendocument.spreadsheet");
        a = "content.xml";
        t.file(a, Lp(e, r));
        n.push([a, "text/xml"]);
        i.push([a, "ContentFile"]);
        a = "styles.xml";
        t.file(a, Np(e, r));
        n.push([a, "text/xml"]);
        i.push([a, "StylesFile"]);
        a = "meta.xml";
        t.file(a, Pa(e, r));
        n.push([a, "text/xml"]);
        i.push([a, "MetadataFile"]);
        a = "manifest.rdf";
        t.file(a, Fa(i, r));
        n.push([a, "application/rdf+xml"]);
        a = "META-INF/manifest.xml";
        t.file(a, Ra(n, r)); return t }

    function Up(e, r) { if (!r) return 0; var t = e.SheetNames.indexOf(r); if (t == -1) throw new Error("Sheet not found: " + r); return t }

    function Hp(e) { return function r(t, a) { var n = Up(t, a.sheet); return e.from_sheet(t.Sheets[t.SheetNames[n]], a, t) } }
    var Wp = Hp(yp);
    var Vp = Hp({ from_sheet: Ab });
    var zp = Hp(Us);
    var Xp = Hp(Hs);
    var Gp = Hp(Vs);
    var jp = Hp(Ro);
    var Kp = Hp({ from_sheet: yb });
    var Yp = Hp(Ms);
    var $p = Hp(Ws);

    function Zp(e) { return function r(t) { for (var a = 0; a != e.length; ++a) { var n = e[a]; if (t[n[0]] === undefined) t[n[0]] = n[1]; if (n[2] === "n") t[n[0]] = Number(t[n[0]]) } } }
    var Qp = Zp([
        ["cellNF", false],
        ["cellHTML", true],
        ["cellFormula", true],
        ["cellStyles", false],
        ["cellText", true],
        ["cellDates", false],
        ["sheetStubs", false],
        ["sheetRows", 0, "n"],
        ["bookDeps", false],
        ["bookSheets", false],
        ["bookProps", false],
        ["bookFiles", false],
        ["bookVBA", false],
        ["password", ""],
        ["WTF", false]
    ]);
    var Jp = Zp([
        ["cellDates", false],
        ["bookSST", false],
        ["bookType", "xlsx"],
        ["compression", false],
        ["WTF", false]
    ]);

    function qp(e) { if (_a.WS.indexOf(e) > -1) return "sheet"; if (_a.CS && e == _a.CS) return "chart"; if (_a.DS && e == _a.DS) return "dialog"; if (_a.MS && e == _a.MS) return "macro"; return e && e.length ? e : "sheet" }

    function eb(e, r) { if (!e) return 0; try { e = r.map(function a(r) { if (!r.id) r.id = r.strRelID; return [r.name, e["!id"][r.id].Target, qp(e["!id"][r.id].Type)] }) } catch (t) { return null } return !e || e.length === 0 ? null : e }

    function rb(e, r, t, a, n, i, s, o, f, l, c, u) { try { i[a] = Ba(oe(e, t, true), r); var h = se(e, r); switch (o) {
                case "sheet":
                    s[a] = pv(h, r, n, f, i[a], l, c, u); break;
                case "chart":
                    var d = bv(h, r, n, f, i[a], l, c, u);
                    s[a] = d; if (!d || !d["!chart"]) break; var v = ue(d["!chart"].Target, r); var p = Ca(v); var b = hl(oe(e, v, true), Ba(oe(e, p, true), v)); var m = ue(b, v); var g = Ca(m);
                    d = yd(oe(e, m, true), m, f, Ba(oe(e, g, true), m), l, d); break;
                case "macro":
                    s[a] = mv(h, r, n, f, i[a], l, c, u); break;
                case "dialog":
                    s[a] = gv(h, r, n, f, i[a], l, c, u); break; } } catch (E) { if (f.WTF) throw E } }
    var tb = function rm(e) { return e.slice(-1) != "/" };

    function ab(e) { return e.charAt(0) == "/" ? e.slice(1) : e }

    function nb(e, r) { I(x);
        r = r || {};
        Qp(r); if (ne(e, "META-INF/manifest.xml")) return Fp(e, r); if (ne(e, "objectdata.xml")) return Fp(e, r); if (ne(e, "Index/Document.iwa")) throw new Error("Unsupported NUMBERS file"); var t = P(e.files).filter(tb).sort(); var a = Ea(oe(e, "[Content_Types].xml"), r); var n = false; var i, s; if (a.workbooks.length === 0) { s = "xl/workbook.xml"; if (se(e, s, true)) a.workbooks.push(s) } if (a.workbooks.length === 0) { s = "xl/workbook.bin"; if (!se(e, s, true)) throw new Error("Could not find workbook");
            a.workbooks.push(s);
            n = true } if (a.workbooks[0].slice(-3) == "bin") n = true; var o = {}; var f = {}; if (!r.bookSheets && !r.bookProps) { Zu = []; if (a.sst) Zu = wv(se(e, ab(a.sst)), a.sst, r); if (r.cellStyles && a.themes.length) o = kv(oe(e, a.themes[0].replace(/^\//, ""), true) || "", a.themes[0], r); if (a.style) f = Ev(se(e, ab(a.style)), a.style, o, r) } var l = a.links.map(function(t) { return Cv(se(e, ab(t)), t, r) }); var c = vv(se(e, ab(a.workbooks[0])), a.workbooks[0], r); var u = {},
            h = ""; if (a.coreprops.length) { h = se(e, ab(a.coreprops[0]), true); if (h) u = Ma(h); if (a.extprops.length !== 0) { h = se(e, ab(a.extprops[0]), true); if (h) za(h, u, r) } } var d = {}; if (!r.bookSheets || r.bookProps) { if (a.custprops.length !== 0) { h = oe(e, ab(a.custprops[0]), true); if (h) d = Ka(h, r) } } var v = {}; if (r.bookSheets || r.bookProps) { if (c.Sheets) i = c.Sheets.map(function A(e) { return e.name });
            else if (u.Worksheets && u.SheetNames.length > 0) i = u.SheetNames; if (r.bookProps) { v.Props = u;
                v.Custprops = d } if (r.bookSheets && typeof i !== "undefined") v.SheetNames = i; if (r.bookSheets ? v.SheetNames : r.bookProps) return v } i = {}; var p = {}; if (r.bookDeps && a.calcchain) p = _v(se(e, ab(a.calcchain)), a.calcchain, r); var b = 0; var m = {}; var g, E; { var k = c.Sheets;
            u.Worksheets = k.length;
            u.SheetNames = []; for (var w = 0; w != k.length; ++w) { u.SheetNames[w] = k[w].name } } var S = n ? "bin" : "xml"; var _ = "xl/_rels/workbook." + S + ".rels"; var C = Ba(oe(e, _, true), _); if (C) C = eb(C, c.Sheets); var B = se(e, "xl/worksheets/sheet.xml", true) ? 1 : 0; for (b = 0; b != u.Worksheets; ++b) { var T = "sheet"; if (C && C[b]) { g = "xl/" + C[b][1].replace(/[\/]?xl\//, "");
                T = C[b][2] } else { g = "xl/worksheets/sheet" + (b + 1 - B) + "." + S;
                g = g.replace(/sheet0\./, "sheet.") } E = g.replace(/^(.*)(\/)([^\/]*)$/, "$1/_rels/$3.rels");
            rb(e, g, E, u.SheetNames[b], b, m, i, T, r, c, o, f) } if (a.comments) pl(e, a.comments, i, m, r);
        v = { Directory: a, Workbook: c, Props: u, Custprops: d, Deps: p, Sheets: i, SheetNames: u.SheetNames, Strings: Zu, Styles: f, Themes: o, SSF: x.get_table() }; if (r.bookFiles) { v.keys = t;
            v.files = e.files } if (r.bookVBA) { if (a.vba.length > 0) v.vbaraw = se(e, ab(a.vba[0]), true);
            else if (a.defaults && a.defaults.bin === "application/vnd.ms-office.vbaProject") v.vbaraw = se(e, "xl/vbaProject.bin", true) } return v }

    function ib(e, r) { var t = r || {}; var a = "/!DataSpaces/Version"; var n = F.find(e, a); if (!n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a); var i = lo(n.content);
        a = "/!DataSpaces/DataSpaceMap";
        n = F.find(e, a); if (!n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a); var s = uo(n.content); if (s.length !== 1 || s[0].comps.length !== 1 || s[0].comps[0].t !== 0 || s[0].name !== "StrongEncryptionDataSpace" || s[0].comps[0].v !== "EncryptedPackage") throw new Error("ECMA-376 Encrypted file bad " + a);
        a = "/!DataSpaces/DataSpaceInfo/StrongEncryptionDataSpace";
        n = F.find(e, a); if (!n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a); var o = ho(n.content); if (o.length != 1 || o[0] != "StrongEncryptionTransform") throw new Error("ECMA-376 Encrypted file bad " + a);
        a = "/!DataSpaces/TransformInfo/StrongEncryptionTransform/!Primary";
        n = F.find(e, a); if (!n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a); var f = po(n.content);
        a = "/EncryptionInfo";
        n = F.find(e, a); if (!n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a); var l = go(n.content);
        a = "/EncryptedPackage";
        n = F.find(e, a); if (!n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a); if (l[0] == 4 && typeof decrypt_agile !== "undefined") return decrypt_agile(l[1], n.content, t.password || "", t); if (l[0] == 2 && typeof decrypt_std76 !== "undefined") return decrypt_std76(l[1], n.content, t.password || "", t); throw new Error("File is password-protected") }

    function sb(e, r) { dl = 1024; if (r.bookType == "ods") return Mp(e, r); if (e && !e.SSF) { e.SSF = x.get_table() } if (e && e.SSF) { I(x);
            x.load_table(e.SSF);
            r.revssf = M(e.SSF);
            r.revssf[e.SSF[65535]] = 0;
            r.ssf = e.SSF } r.rels = {};
        r.wbrels = {};
        r.Strings = [];
        r.Strings.Count = 0;
        r.Strings.Unique = 0; var t = r.bookType == "xlsb" ? "bin" : "xml"; var a = Il.indexOf(r.bookType) > -1; var n = ga();
        Jp(r = r || {}); var i = new le; var s = "",
            o = 0;
        r.cellXfs = [];
        rh(r.cellXfs, {}, { revssf: { General: 0 } }); if (!e.Props) e.Props = {};
        s = "docProps/core.xml";
        i.file(s, Wa(e.Props, r));
        n.coreprops.push(s);
        Ia(r.rels, 2, s, _a.CORE_PROPS);
        s = "docProps/app.xml"; if (e.Props && e.Props.SheetNames) {} else if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
        else e.Props.SheetNames = e.SheetNames.map(function(r, t) { return [(e.Workbook.Sheets[t] || {}).Hidden != 2, r] }).filter(function(e) { return e[0] }).map(function(e) { return e[1] });
        e.Props.Worksheets = e.Props.SheetNames.length;
        i.file(s, Ga(e.Props, r));
        n.extprops.push(s);
        Ia(r.rels, 3, s, _a.EXT_PROPS); if (e.Custprops !== e.Props && P(e.Custprops || {}).length > 0) { s = "docProps/custom.xml";
            i.file(s, $a(e.Custprops, r));
            n.custprops.push(s);
            Ia(r.rels, 4, s, _a.CUST_PROPS) } s = "xl/workbook." + t;
        i.file(s, Bv(e, s, r));
        n.workbooks.push(s);
        Ia(r.rels, 1, s, _a.WB); for (o = 1; o <= e.SheetNames.length; ++o) { var f = { "!id": {} }; var l = e.Sheets[e.SheetNames[o - 1]]; var c = (l || {})["!type"] || "sheet"; switch (c) {
                case "chart":
                    ;
                default:
                    s = "xl/worksheets/sheet" + o + "." + t;
                    i.file(s, Tv(o - 1, s, r, e, f));
                    n.sheets.push(s);
                    Ia(r.wbrels, -1, "worksheets/sheet" + o + "." + t, _a.WS[0]); } if (l) { var u = l["!comments"]; if (u && u.length > 0) { var h = "xl/comments" + o + "." + t;
                    i.file(h, yv(u, h, r));
                    n.comments.push(h);
                    Ia(f, -1, "../comments" + o + "." + t, _a.CMNT) } if (l["!legacy"]) { i.file("xl/drawings/vmlDrawing" + o + ".vml", vl(o, l["!comments"])) } delete l["!comments"];
                delete l["!legacy"] } if (f["!id"].rId1) i.file(Ca(s), xa(f)) } if (r.Strings != null && r.Strings.length > 0) { s = "xl/sharedStrings." + t;
            i.file(s, Av(r.Strings, s, r));
            n.strs.push(s);
            Ia(r.wbrels, -1, "sharedStrings." + t, _a.SST) } s = "xl/theme/theme1.xml";
        i.file(s, Zf(e.Themes, r));
        n.themes.push(s);
        Ia(r.wbrels, -1, "theme/theme1.xml", _a.THEME);
        s = "xl/styles." + t;
        i.file(s, Iv(e, s, r));
        n.styles.push(s);
        Ia(r.wbrels, -1, "styles." + t, _a.STY); if (e.vbaraw && a) { s = "xl/vbaProject.bin";
            i.file(s, e.vbaraw);
            n.vba.push(s);
            Ia(r.wbrels, -1, "vbaProject.bin", _a.VBA) } i.file("[Content_Types].xml", Sa(n, r));
        i.file("_rels/.rels", xa(r.rels));
        i.file("xl/_rels/workbook." + t + ".rels", xa(r.wbrels));
        delete r.revssf;
        delete r.ssf; return i }

    function ob(e, r) { var t = ""; switch ((r || {}).type || "base64") {
            case "buffer":
                return [e[0], e[1], e[2], e[3]];
            case "base64":
                t = g.decode(e.substr(0, 24)); break;
            case "binary":
                t = e; break;
            case "array":
                return [e[0], e[1], e[2], e[3]];
            default:
                throw new Error("Unrecognized type " + (r && r.type || "undefined")); } return [t.charCodeAt(0), t.charCodeAt(1), t.charCodeAt(2), t.charCodeAt(3)] }

    function fb(e, r) { if (F.find(e, "EncryptedPackage")) return ib(e, r); return up(e, r) }

    function lb(e, r) { var t, a = e; var n = r || {}; if (!n.type) n.type = E && Buffer.isBuffer(e) ? "buffer" : "base64"; switch (n.type) {
            case "base64":
                t = new le(a, { base64: true }); break;
            case "binary":
                ;
            case "array":
                t = new le(a, { base64: false }); break;
            case "buffer":
                t = new le(a); break;
            default:
                throw new Error("Unrecognized type " + n.type); } return nb(t, n) }

    function cb(e, r) { var t = 0;
        e: while (t < e.length) switch (e.charCodeAt(t)) {
            case 10:
                ;
            case 13:
                ;
            case 32:
                ++t; break;
            case 60:
                return Gv(e.slice(t), r);
            default:
                break e; }
        return Vs.to_workbook(e, r) }

    function ub(e, r) { var t = "",
            a = ob(e, r); switch (r.type) {
            case "base64":
                t = g.decode(e); break;
            case "binary":
                t = e; break;
            case "buffer":
                t = e.toString("binary"); break;
            case "array":
                t = Y(e); break;
            default:
                throw new Error("Unrecognized type " + r.type); } if (a[0] == 239 && a[1] == 187 && a[2] == 191) t = De(t); return cb(t, r) }

    function hb(e, r) { var t = e; if (r.type == "base64") t = g.decode(t);
        t = cptable.utils.decode(1200, t.slice(2), "str");
        r.type = "binary"; return cb(t, r) }

    function db(e) { return !e.match(/[^\x00-\x7F]/) ? e : Oe(e) }

    function vb(e, r, t, a) { if (a) { t.type = "string"; return Vs.to_workbook(e, t) } return Vs.to_workbook(r, t) }

    function pb(e, r) { c(); if (typeof ArrayBuffer !== "undefined" && e instanceof ArrayBuffer) return pb(new Uint8Array(e), r); var t = e,
            a = [0, 0, 0, 0],
            n = false; var i = r || {};
        Qu = {}; if (i.dateNF) Qu.dateNF = i.dateNF; if (!i.type) i.type = E && Buffer.isBuffer(e) ? "buffer" : "base64"; if (i.type == "file") { i.type = "buffer";
            t = fe.readFileSync(e) } if (i.type == "string") { n = true;
            i.type = "binary";
            t = db(e) } switch ((a = ob(t, i))[0]) {
            case 208:
                return fb(F.read(t, i), i);
            case 9:
                return up(t, i);
            case 60:
                return Gv(t, i);
            case 73:
                if (a[1] === 68) return zs(t, i); break;
            case 84:
                if (a[1] === 65 && a[2] === 66 && a[3] === 76) return Hs.to_workbook(t, i); break;
            case 80:
                if (a[1] === 75 && a[2] < 32 && a[3] < 32) return lb(t, i); break;
            case 239:
                return a[3] === 60 ? Gv(t, i) : vb(e, t, i, n);
            case 255:
                if (a[1] === 254) { return hb(t, i) } break;
            case 0:
                if (a[1] === 0 && a[2] >= 2 && a[3] === 0) return Xs.to_workbook(t, i); break;
            case 3:
                ;
            case 131:
                ;
            case 139:
                ;
            case 140:
                return Ms.to_workbook(t, i);
            case 123:
                if (a[1] === 92 && a[2] === 114 && a[3] === 116) return Ro.to_workbook(t, i); break;
            case 10:
                ;
            case 13:
                ;
            case 32:
                return ub(t, i); } if (a[2] <= 12 && a[3] <= 31) return Ms.to_workbook(t, i); if (32 > a[0] || a[0] > 127) throw new Error("Unsupported file " + a.join("|")); return vb(e, t, i, n) }

    function bb(e, r) { var t = r || {};
        t.type = "file"; return pb(e, t) }

    function mb(e, r) { var t = r || {}; var a = sb(e, t); var n = {}; if (t.compression) n.compression = "DEFLATE"; switch (t.type) {
            case "base64":
                n.type = "base64"; break;
            case "binary":
                n.type = "string"; break;
            case "string":
                throw new Error("'string' output type invalid for '" + t.bookType + " files");
            case "buffer":
                ;
            case "file":
                n.type = "nodebuffer"; break;
            default:
                throw new Error("Unrecognized type " + t.type); } if (t.type === "file") return fe.writeFileSync(t.file, a.generate(n)); var i = a.generate(n); return t.type == "string" ? De(i) : i }

    function gb(e, r) { var t = r || {}; var a = hp(e, t); switch (t.type) {
            case "base64":
                ;
            case "binary":
                break;
            case "buffer":
                ;
            case "array":
                t.type = ""; break;
            case "file":
                return fe.writeFileSync(t.file, F.write(a, { type: "buffer" }));
            case "string":
                throw new Error("'string' output type invalid for '" + t.bookType + " files");
            default:
                throw new Error("Unrecognized type " + t.type); } return F.write(a, t) }

    function Eb(e, r, t) { if (!t) t = ""; var a = t + e; switch (r.type) {
            case "base64":
                return g.encode(Oe(a));
            case "binary":
                return Oe(a);
            case "string":
                return e;
            case "file":
                return fe.writeFileSync(r.file, a, "utf8");
            case "buffer":
                { if (E) return new Buffer(a, "utf8");
                    else return Eb(a, { type: "binary" }).split("").map(function(e) { return e.charCodeAt(0) }) }; } throw new Error("Unrecognized type " + r.type) }

    function kb(e, r) { switch (r.type) {
            case "base64":
                return g.encode(e);
            case "binary":
                return e;
            case "string":
                return e;
            case "file":
                return fe.writeFileSync(r.file, e, "binary");
            case "buffer":
                { if (E) return new Buffer(e, "binary");
                    else return e.split("").map(function(e) { return e.charCodeAt(0) }) }; } throw new Error("Unrecognized type " + r.type) }

    function wb(e, r) { switch (r.type) {
            case "string":
                ;
            case "base64":
                ;
            case "binary":
                var t = ""; for (var a = 0; a < e.length; ++a) t += String.fromCharCode(e[a]); return r.type == "base64" ? g.encode(t) : r.type == "string" ? De(t) : t;
            case "file":
                return fe.writeFileSync(r.file, e);
            case "buffer":
                return e;
            default:
                throw new Error("Unrecognized type " + r.type); } }

    function Sb(e, r) {
        $d(e);
        var t = r || {};
        if (t.type == "array") {
            t.type = "binary";
            var a = Sb(e, t);
            t.type = "array";
            return S(a)
        }
        switch (t.bookType || "xlsb") {
            case "xml":
                ;
            case "xlml":
                return Eb(np(e, t), t);
            case "slk":
                ;
            case "sylk":
                return Eb(zp(e, t), t);
            case "html":
                return Eb(Wp(e, t), t);
            case "txt":
                return kb(Kp(e, t), t);
            case "csv":
                return Eb(Vp(e, t), t, "\ufeff");
            case "dif":
                return Eb(Xp(e, t), t);
            case "dbf":
                return wb(Yp(e, t), t);
            case "prn":
                return Eb(Gp(e, t), t);
            case "rtf":
                return Eb(jp(e, t), t);
            case "eth":
                return Eb($p(e, t), t);
            case "fods":
                return Eb(Mp(e, t), t);
            case "biff2":
                if (!t.biff) t.biff = 2;
            case "biff3":
                if (!t.biff) t.biff = 3;
            case "biff4":
                if (!t.biff) t.biff = 4; return wb(Ap(e, t), t);
            case "biff5":
                if (!t.biff) t.biff = 5;
            case "biff8":
                ;
            case "xla":
                ;
            case "xls":
                if (!t.biff) t.biff = 8; return gb(e, t);
            case "xlsx":
                ;
            case "xlsm":
                ;
            case "xlam":
                ;
            case "xlsb":
                ;
            case "ods":
                return mb(e, t);
            default:
                throw new Error("Unrecognized bookType |" + t.bookType + "|"); }
    }

    function _b(e) { if (e.bookType) return; var r = { xls: "biff8", htm: "html", slk: "sylk", socialcalc: "eth", Sh33tJS: "WTF" }; var t = e.file.slice(e.file.lastIndexOf(".")).toLowerCase(); if (t.match(/^\.[a-z]+$/)) e.bookType = t.slice(1);
        e.bookType = r[e.bookType] || e.bookType }

    function Cb(e, r, t) { var a = t || {};
        a.type = "file";
        a.file = r;
        _b(a); return Sb(e, a) }

    function Bb(e, r, t, a) { var n = t || {};
        n.type = "file";
        n.file = e;
        _b(n);
        n.type = "buffer"; var i = a; if (!(i instanceof Function)) i = t; return fe.writeFile(e, Sb(r, n), i) }

    function Tb(e, r) { if (e == null || e["!ref"] == null) return []; var t = { t: "n", v: 0 },
            a = 0,
            n = 1,
            i = [],
            s = true,
            o = 0,
            f = ""; var l = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }; var c = r || {}; var u = c.raw; var h = c.defval; var d = c.range != null ? c.range : e["!ref"]; if (c.header === 1) a = 1;
        else if (c.header === "A") a = 2;
        else if (Array.isArray(c.header)) a = 3; switch (typeof d) {
            case "string":
                l = ot(d); break;
            case "number":
                l = ot(e["!ref"]);
                l.s.r = d; break;
            default:
                l = d; } if (a > 0) n = 0; var v = Kr(l.s.r); var p = []; var b = []; var m = 0,
            g = 0; var E = Array.isArray(e); var k = l.s.r,
            w = 0,
            S = 0; if (E && !e[k]) e[k] = []; for (w = l.s.c; w <= l.e.c; ++w) { p[w] = Qr(w);
            t = E ? e[k][w] : e[p[w] + v]; switch (a) {
                case 1:
                    i[w] = w - l.s.c; break;
                case 2:
                    i[w] = p[w]; break;
                case 3:
                    i[w] = c.header[w - l.s.c]; break;
                default:
                    if (t == null) t = { w: "__EMPTY", t: "s" };
                    f = o = lt(t, null, c);
                    g = 0; for (S = 0; S < i.length; ++S)
                        if (i[S] == f) f = o + "_" + ++g;
                    i[w] = f; } } var _ = a === 1 ? [] : {}; for (k = l.s.r + n; k <= l.e.r; ++k) { v = Kr(k);
            s = true; if (a === 1) _ = [];
            else { _ = {}; if (Object.defineProperty) try { Object.defineProperty(_, "__rowNum__", { value: k, enumerable: false }) } catch (C) { _.__rowNum__ = k } else _.__rowNum__ = k } if (!E || e[k])
                for (w = l.s.c; w <= l.e.c; ++w) { t = E ? e[k][w] : e[p[w] + v]; if (t === undefined || t.t === undefined) { if (h === undefined) continue; if (i[w] != null) { _[i[w]] = h;
                            s = false } continue } o = t.v; switch (t.t) {
                        case "z":
                            if (o == null) break; continue;
                        case "e":
                            continue;
                        case "s":
                            ;
                        case "d":
                            ;
                        case "b":
                            ;
                        case "n":
                            break;
                        default:
                            throw new Error("unrecognized type " + t.t); } if (i[w] != null) { if (o == null) { if (h !== undefined) _[i[w]] = h;
                            else if (u && o === null) _[i[w]] = null;
                            else continue } else { _[i[w]] = u ? o : lt(t, o, c) } s = false } }
            if (s === false || (a === 1 ? c.blankrows !== false : !!c.blankrows)) b[m++] = _ } b.length = m; return b }
    var xb = /"/g;

    function Ib(e, r, t, a, n, i, s, o) { var f = true; var l = [],
            c = "",
            u = Kr(t); for (var h = r.s.c; h <= r.e.c; ++h) { if (!a[h]) continue; var d = o.dense ? (e[t] || [])[h] : e[a[h] + u]; if (d == null) c = "";
            else if (d.v != null) { f = false;
                c = "" + lt(d, null, o); for (var v = 0, p = 0; v !== c.length; ++v)
                    if ((p = c.charCodeAt(v)) === n || p === i || p === 34) { c = '"' + c.replace(xb, '""') + '"'; break }
                if (c == "ID") c = '"ID"' } else if (d.f != null && !d.F) { f = false;
                c = "=" + d.f; if (c.indexOf(",") >= 0) c = '"' + c.replace(xb, '""') + '"' } else c = "";
            l.push(c) } if (o.blankrows === false && f) return null; return l.join(s) }

    function Ab(e, r) { var t = []; var a = r == null ? {} : r; if (e == null || e["!ref"] == null) return ""; var n = ot(e["!ref"]); var i = a.FS !== undefined ? a.FS : ",",
            s = i.charCodeAt(0); var o = a.RS !== undefined ? a.RS : "\n",
            f = o.charCodeAt(0); var l = new RegExp((i == "|" ? "\\|" : i) + "+$"); var c = "",
            u = [];
        a.dense = Array.isArray(e); var h = a.skipHidden && e["!cols"] || []; var d = a.skipHidden && e["!rows"] || []; for (var v = n.s.c; v <= n.e.c; ++v)
            if (!(h[v] || {}).hidden) u[v] = Qr(v); for (var p = n.s.r; p <= n.e.r; ++p) { if ((d[p] || {}).hidden) continue;
            c = Ib(e, n, p, u, s, f, i, a); if (c == null) { continue } if (a.strip) c = c.replace(l, "");
            t.push(c + o) } delete a.dense; return t.join("") }

    function yb(e, r) { if (!r) r = {};
        r.FS = "\t";
        r.RS = "\n"; var t = Ab(e, r); if (typeof cptable == "undefined" || r.type == "string") return t; var a = cptable.utils.encode(1200, t, "str"); return "ÿþ" + a }

    function Rb(e) { var r = "",
            t, a = ""; if (e == null || e["!ref"] == null) return []; var n = ot(e["!ref"]),
            i = "",
            s = [],
            o; var f = []; var l = Array.isArray(e); for (o = n.s.c; o <= n.e.c; ++o) s[o] = Qr(o); for (var c = n.s.r; c <= n.e.r; ++c) { i = Kr(c); for (o = n.s.c; o <= n.e.c; ++o) { r = s[o] + i;
                t = l ? (e[c] || [])[o] : e[r];
                a = ""; if (t === undefined) continue;
                else if (t.F != null) { r = t.F; if (!t.f) continue;
                    a = t.f; if (r.indexOf(":") == -1) r = r + ":" + r } if (t.f != null) a = t.f;
                else if (t.t == "z") continue;
                else if (t.t == "n" && t.v != null) a = "" + t.v;
                else if (t.t == "b") a = t.v ? "TRUE" : "FALSE";
                else if (t.w !== undefined) a = "'" + t.w;
                else if (t.v === undefined) continue;
                else if (t.t == "s") a = "'" + t.v;
                else a = "" + t.v;
                f[f.length] = r + "=" + a } } return f }

    function Db(e, r, t) { var a = t || {}; var n = +!a.skipHeader; var i = e || {}; var s = 0,
            o = 0; if (i && a.origin != null) { if (typeof a.origin == "number") s = a.origin;
            else { var f = typeof a.origin == "string" ? rt(a.origin) : a.origin;
                s = f.r;
                o = f.c } } var l; var c = { s: { c: 0, r: 0 }, e: { c: o, r: s + r.length - 1 + n } }; if (i["!ref"]) { var u = ot(i["!ref"]);
            c.e.c = Math.max(c.e.c, u.e.c);
            c.e.r = Math.max(c.e.r, u.e.r); if (s == -1) { s = c.e.r + 1;
                c.e.r = s + r.length - 1 + n } } var h = a.header || [],
            d = 0;
        r.forEach(function(e, r) { P(e).filter(function(r) { return e.hasOwnProperty(r) }).forEach(function(t) { if ((d = h.indexOf(t)) == -1) h[d = h.length] = t; var f = e[t]; var c = "z"; var u = ""; if (typeof f == "number") c = "n";
                else if (typeof f == "boolean") c = "b";
                else if (typeof f == "string") c = "s";
                else if (f instanceof Date) { c = "d"; if (!a.cellDates) { c = "n";
                        f = V(f) } u = a.dateNF || x._table[14] } i[tt({ c: o + d, r: s + r + n })] = l = { t: c, v: f }; if (u) l.z = u }) });
        c.e.c = Math.max(c.e.c, o + h.length - 1); var v = Kr(s); if (n)
            for (d = 0; d < h.length; ++d) i[Qr(d + o) + v] = { t: "s", v: h[d] };
        i["!ref"] = st(c); return i }

    function Ob(e, r) { return Db(null, e, r) }
    var Fb = { encode_col: Qr, encode_row: Kr, encode_cell: tt, encode_range: st, decode_col: Zr, decode_row: jr, split_cell: et, decode_cell: rt, decode_range: it, format_cell: lt, get_formulae: Rb, make_csv: Ab, make_json: Tb, make_formulae: Rb, sheet_add_aoa: ut, sheet_add_json: Db, aoa_to_sheet: ht, json_to_sheet: Ob, table_to_sheet: Rp, table_to_book: Dp, sheet_to_csv: Ab, sheet_to_txt: yb, sheet_to_json: Tb, sheet_to_html: yp.from_sheet, sheet_to_dif: Hs.from_sheet, sheet_to_slk: Us.from_sheet, sheet_to_eth: Ws.from_sheet, sheet_to_formulae: Rb, sheet_to_row_object_array: Tb };
    (function(e) { e.consts = e.consts || {};

        function r(r) { r.forEach(function(r) { e.consts[r[0]] = r[1] }) }

        function t(e, r, t) { return e[r] != null ? e[r] : e[r] = t }

        function a(e, r, t) { if (typeof r == "string") return e[r] || (e[r] = { t: "z" }); if (typeof r != "number") return a(e, tt(r)); return a(e, tt({ r: r, c: t || 0 })) }

        function n(e, r) { if (typeof r == "number") { if (r >= 0 && e.SheetNames.length > r) return r; throw new Error("Cannot find sheet # " + r) } else if (typeof r == "string") { var t = e.SheetNames.indexOf(r); if (t > -1) return t; throw new Error("Cannot find sheet name |" + r + "|") } else throw new Error("Cannot find sheet |" + r + "|") } e.book_new = function() { return { SheetNames: [], Sheets: {} } };
        e.book_append_sheet = function(e, r, t) { if (!t)
                for (var a = 1; a <= 65535; ++a)
                    if (e.SheetNames.indexOf(t = "Sheet" + a) == -1) break; if (!t) throw new Error("Too many worksheets");
            Kd(t); if (e.SheetNames.indexOf(t) >= 0) throw new Error("Worksheet with name |" + t + "| already exists!");
            e.SheetNames.push(t);
            e.Sheets[t] = r };
        e.book_set_sheet_visibility = function(e, r, a) { t(e, "Workbook", {});
            t(e.Workbook, "Sheets", []); var i = n(e, r);
            t(e.Workbook.Sheets, i, {}); switch (a) {
                case 0:
                    ;
                case 1:
                    ;
                case 2:
                    break;
                default:
                    throw new Error("Bad sheet visibility setting " + a); } e.Workbook.Sheets[i].Hidden = a };
        r([
            ["SHEET_VISIBLE", 0],
            ["SHEET_HIDDEN", 1],
            ["SHEET_VERY_HIDDEN", 2]
        ]);
        e.cell_set_number_format = function(e, r) { e.z = r; return e };
        e.cell_set_hyperlink = function(e, r, t) { if (!r) { delete e.l } else { e.l = { Target: r }; if (t) e.l.Tooltip = t } return e };
        e.cell_set_internal_link = function(r, t, a) { return e.cell_set_hyperlink(r, "#" + t, a) };
        e.cell_add_comment = function(e, r, t) { if (!e.c) e.c = [];
            e.c.push({ t: r, a: t || "SheetJS" }) };
        e.sheet_set_array_formula = function(e, r, t) { var n = typeof r != "string" ? r : ot(r); var i = typeof r == "string" ? r : st(r); for (var s = n.s.r; s <= n.e.r; ++s)
                for (var o = n.s.c; o <= n.e.c; ++o) { var f = a(e, s, o);
                    f.t = "n";
                    f.F = i;
                    delete f.v; if (s == n.s.r && o == n.s.c) f.f = t }
            return e }; return e })(Fb);
    if (E && typeof require != "undefined")(function() { var e = {}.Readable; var t = function(r, t) { var a = e(); var n = ""; var i = t == null ? {} : t; if (r == null || r["!ref"] == null) { a.push(null); return a } var s = ot(r["!ref"]); var o = i.FS !== undefined ? i.FS : ",",
                f = o.charCodeAt(0); var l = i.RS !== undefined ? i.RS : "\n",
                c = l.charCodeAt(0); var u = new RegExp((o == "|" ? "\\|" : o) + "+$"); var h = "",
                d = [];
            i.dense = Array.isArray(r); var v = i.skipHidden && r["!cols"] || []; var p = i.skipHidden && r["!rows"] || []; for (var b = s.s.c; b <= s.e.c; ++b)
                if (!(v[b] || {}).hidden) d[b] = Qr(b); var m = s.s.r;
            a._read = function() { if (m > s.e.r) return a.push(null); while (m <= s.e.r) {++m; if ((p[m - 1] || {}).hidden) continue;
                    h = Ib(r, s, m - 1, d, f, c, o, i); if (h != null) { if (i.strip) h = h.replace(u, "");
                        a.push(h + l); break } } }; return a }; var a = function(r, t) { var a = e(); var n = t || {}; var i = n.header != null ? n.header : yp.BEGIN; var s = n.footer != null ? n.footer : yp.END;
            a.push(i); var o = it(r["!ref"]);
            n.dense = Array.isArray(r);
            a.push(yp._preamble(r, o, n)); var f = o.s.r; var l = false;
            a._read = function() { if (f > o.e.r) { if (!l) { l = true;
                        a.push("</table>" + s) } return a.push(null) } while (f <= o.e.r) { a.push(yp._row(r, o, f, n));++f; break } }; return a };
        r.stream = { to_html: a, to_csv: t } })();
    r.parse_xlscfb = up;
    r.parse_ods = Fp;
    r.parse_fods = Pp;
    r.write_ods = Mp;
    r.parse_zip = nb;
    r.read = pb;
    r.readFile = bb;
    r.readFileSync = bb;
    r.write = Sb;
    r.writeFile = Cb;
    r.writeFileSync = Cb;
    r.writeFileAsync = Bb;
    r.utils = Fb;
    r.SSF = x;
    r.CFB = F
})(typeof exports !== "undefined" ? exports : XLSX);
var XLS = XLSX,
    ODS = XLSX;