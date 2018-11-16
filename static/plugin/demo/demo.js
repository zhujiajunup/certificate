// Plugin
!
function(b) {
    "function" == typeof define && define.amd ? define(["jquery"], b) : "object" == typeof exports ? module.exports = b: b(jQuery)
} (function(b) {
    function h(e) {
        var a = e || window.event,
        f = k.call(arguments, 1),
        c = 0,
        d = 0,
        g = 0,
        h = 0,
        n = 0,
        q = 0;
        if (e = b.event.fix(a), e.type = "mousewheel", "detail" in a && (g = -1 * a.detail), "wheelDelta" in a && (g = a.wheelDelta), "wheelDeltaY" in a && (g = a.wheelDeltaY), "wheelDeltaX" in a && (d = -1 * a.wheelDeltaX), "axis" in a && a.axis === a.HORIZONTAL_AXIS && (d = -1 * g, g = 0), c = 0 === g ? d: g, "deltaY" in a && (g = -1 * a.deltaY, c = g), "deltaX" in a && (d = a.deltaX, 0 === g && (c = -1 * d)), 0 !== g || 0 !== d) {
            if (1 === a.deltaMode) var r = b.data(this, "mousewheel-line-height"),
            c = c * r,
            g = g * r,
            d = d * r;
            else 2 === a.deltaMode && (r = b.data(this, "mousewheel-page-height"), c *= r, g *= r, d *= r);
            if (h = Math.max(Math.abs(g), Math.abs(d)), (!p || p > h) && (p = h, l.settings.adjustOldDeltas && "mousewheel" === a.type && 0 === h % 120 && (p /= 40)), l.settings.adjustOldDeltas && "mousewheel" === a.type && 0 === h % 120 && (c /= 40, d /= 40, g /= 40), c = Math[1 <= c ? "floor": "ceil"](c / p), d = Math[1 <= d ? "floor": "ceil"](d / p), g = Math[1 <= g ? "floor": "ceil"](g / p), l.settings.normalizeOffset && this.getBoundingClientRect) a = this.getBoundingClientRect(),
            n = e.clientX - a.left,
            q = e.clientY - a.top;
            return e.deltaX = d,
            e.deltaY = g,
            e.deltaFactor = p,
            e.offsetX = n,
            e.offsetY = q,
            e.deltaMode = 0,
            f.unshift(e, c, d, g),
            m && clearTimeout(m),
            m = setTimeout(u, 200),
            (b.event.dispatch || b.event.handle).apply(this, f)
        }
    }
    function u() {
        p = null
    }
    var m, p, t = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
    q = "onwheel" in document || 9 <= document.documentMode ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
    k = Array.prototype.slice;
    if (b.event.fixHooks) for (var n = t.length; n;) b.event.fixHooks[t[--n]] = b.event.mouseHooks;
    var l = b.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener) for (var e = q.length; e;) this.addEventListener(q[--e], h, !1);
            else this.onmousewheel = h;
            b.data(this, "mousewheel-line-height", l.getLineHeight(this));
            b.data(this, "mousewheel-page-height", l.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener) for (var e = q.length; e;) this.removeEventListener(q[--e], h, !1);
            else this.onmousewheel = null;
            b.removeData(this, "mousewheel-line-height");
            b.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(e) {
            e = b(e);
            var a = e["offsetParent" in b.fn ? "offsetParent": "parent"]();
            return a.length || (a = b("body")),
            parseInt(a.css("fontSize"), 10) || parseInt(e.css("fontSize"), 10) || 16
        },
        getPageHeight: function(e) {
            return b(e).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    b.fn.extend({
        mousewheel: function(b) {
            return b ? this.bind("mousewheel", b) : this.trigger("mousewheel")
        },
        unmousewheel: function(b) {
            return this.unbind("mousewheel", b)
        }
    })
}); (function(b, h, u, m) {
    function p(a, b, c) {
        return (1 - c) * a + c * b
    }
    function t(a, f) {
        this.element = a;
        this.options = b.extend({},
        e, f);
        this._defaults = e;
        this._name = "uberZoom";
        this.img = this.obj_content = this.obj_image = this.obj = m;
        this.frameOffsetTop = this.frameOffsetLeft = this.contentHeight = this.contentWidth = this.frameHeight = this.frameWidth = 0;
        this.minZoom = 1;
        this.maxZoom = 4;
        this.targetZoom = this.currentZoom = 1;
        this.zoomStep = .25;
        this.zoomSpeed = .15;
        this.dragOutOfBoundsY = this.dragOutOfBoundsX = this.currentPosY = this.currentPosX = this.targetPosY = this.targetPosX = this.defaultPosY = this.defaultPosX = 0;
        this.intertia = .9;
        this.dragMomentumY = this.dragMomentumX = this.dragLastEventY = this.dragLastEventX = this.dragInitialPositionY = this.dragInitialPositionX = this.dragEventOriginY = this.dragEventOriginX = 0;
        this.dragMomentumCalculateTimer = 5;
        this.lastMomentumCalculateTime = this.vy = this.vx = 0;
        this.zoomTimeout = this.dragTimeout = m;
        this.lastTouchTime = 0;
        this.didDoubleTap = !1;
        this.lastZoom = this.initialZoom = this.pinchDelta = this.initialPinchDistance = this.lastTouchY = this.lastTouchX = 0;
        this.pinchZooming = !1;
        this.pinchZoomOffsetY = this.pinchZoomOffsetX = 0;
        this.dragging = !1;
        this.ui_hide_timeout = this.obj_interface = m;
        this.ui_visible = !1;
        this.obj_nav_window = this.obj_navigator = m;
        this.navigatorHeight = this.navigatorWidth = 0;
        this.navigator_dragging = !1;
        this.nav_window_height = this.nav_window_width = 0;
        this.obj_fullscreen = m;
        this.is_fullscreen = !1;
        this.init()
    }
    var q = [],
    k = m,
    n = !1,
    l = !1;
    b(h).scrollLeft();
    b(h).scrollTop();
    b(h).width();
    b(h).height(); (function() {
        b(u).on("mousemove",
        function(a) {
            k != m && k.handle_event(a)
        });
        b(u).on("mouseup",
        function(a) {
            k != m && (k.handle_event(a), k = m)
        });
        b(h).on("touchmove",
        function(a) {
            1 == a.originalEvent.touches.length && k != m && k.handle_event(a);
            2 == a.originalEvent.touches.length && (a.preventDefault(), k != m && k.handle_event(a))
        });
        b(h).on("touchend",
        function(a) {
            k != m && (k.handle_event(a), k = m)
        });
        b(h).on("resize",
        function() {
            b(h).width();
            b(h).height()
        })
    })();
    var e = {
        width: "100%",
        height: "100%",
        maxZoom: "auto",
        navigator: !1,
        navigatorImagePreview: !1,
        fullscreen: !1
    };
    t.prototype = {
        init: function() {
            var a = this;
            var windowWidth=document.body.clientWidth
            var windowHeight=document.body.clientWidth
            a.id = q.length;
            q[a.id] = a;
            a.obj_image = b(a.element);
            a.obj_image.wrap('<div class="ndd-uberzoom-container"></div>');
            a.obj_image.addClass("ndd-uberzoom-main-image");
            a.obj = b(a.element).parent();
            a.obj.attr("id", "ndd-uberzoom-container-" + a.id);
            a.obj.css({
                width: windowWidth,
                height:540
            });
            a.options.startInFullscreen && (a.is_fullscreen = !0, a.obj.addClass("ndd-uberzoom-container-fullscreen"));
            a.frameWidth = a.obj.width();
            a.frameHeight = a.obj.height();
            a.img = new Image;
            a.img.onload = function() {
                var f = a.img.width / a.img.height,
                c = a.frameWidth / a.frameHeight;
                f > c ? a.obj_image.css({
                    width: "auto",
                    height: "100%"
                }) : a.obj_image.css({
                    width: "100%",
                    height: "auto"
                });
                a.obj_image.wrap('<div class="ndd-uberzoom-content"></div>');
                a.obj_content = a.obj.find(".ndd-uberzoom-content");
                a.contentWidth = a.obj_image.width();
                a.contentHeight = a.obj_image.height();
                a.obj_content.css({
                    position: "absolute",
                    width: a.contentWidth + "px",
                    height: a.contentHeight + "px",
                    left: -a.contentWidth / 2 + a.frameWidth / 2 + "px",
                    top: -a.contentHeight / 2 + a.frameHeight / 2 + "px"
                });
                a.obj_image.css({
                    opacity: "1",
                    width: "100%",
                    height: "95%"
                });
                a.defaultPosX = a.obj_content.position().left;
                a.defaultPosY = a.obj_content.position().top;
                a.currentPosX = a.defaultPosX;
                a.currentPosY = a.defaultPosY;
                a.frameOffsetLeft = a.obj.offset().left;
                a.frameOffsetTop = a.obj.offset().top;
                a.maxZoom = "auto" == a.options.maxZoom ? f > c ? a.img.height / a.frameHeight: a.img.width / a.frameWidth: a.options.maxZoom;
                a.obj.append('<div class="ndd-uberzoom-interface"></div>');
                a.obj_interface = a.obj.find(".ndd-uberzoom-interface");
                a.options.navigator && (a.obj_interface.append('<div class="ndd-uberzoom-navigator"><div class="ndd-uberzoom-navigator-window"></div></div>'), a.obj_navigator = a.obj.find(".ndd-uberzoom-navigator"), a.obj_nav_window = a.obj.find(".ndd-uberzoom-navigator-window"), a.options.navigatorMaxWidth = a.frameWidth / 4, a.options.navigatorMaxHeight = a.frameHeight / 4, f = 1, f = a.img.width / a.img.height > a.options.navigatorMaxWidth / a.options.navigatorMaxHeight ? a.contentWidth / a.options.navigatorMaxWidth: a.contentHeight / a.options.navigatorMaxHeight, a.navigatorWidth = a.contentWidth / f, a.navigatorHeight = a.contentHeight / f, a.obj_navigator.css({
                    width: a.navigatorWidth,
                    height: a.navigatorHeight,
                    left: 10,
                    top: "100%",
                    margin: 0,
                    "margin-top": -a.navigatorHeight - 10
                }), a.options.navigatorImagePreview && a.obj_navigator.append('<img class="ndd-uberzoom-navigator-image" src="' + a.img.src + '">'), a.redraw_navigator());
                a.options.fullscreen && (a.obj_interface.append('<div class="ndd-uberzoom-fullscreen"></div'), a.obj_fullscreen = a.obj_interface.find(".ndd-uberzoom-fullscreen"), a.obj_fullscreen.css({
                    width: 44,
                    height: 44,
                    left: "100%",
                    top: "100%",
                    "margin-top": -54,
                    "margin-left": -54,
                    "margin-right": 0,
                    "margin-bottom": 0
                }), a.is_fullscreen ? a.obj_fullscreen.append('<img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RkFDRjUwRjI0QzczMTFFNEJEMURCQTlDMEQ1NjUwMjMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkFDRjUwRjM0QzczMTFFNEJEMURCQTlDMEQ1NjUwMjMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGQUNGNTBGMDRDNzMxMUU0QkQxREJBOUMwRDU2NTAyMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGQUNGNTBGMTRDNzMxMUU0QkQxREJBOUMwRDU2NTAyMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmMmKIIAAALISURBVHja7JvfTxNBEMevBF/Q8mAMf4D27/EPMD6REKI1tKVHCm3PYH9BVCoawpP2Sf4t/gNNND4R4zhL9sKx3u7Obgfbvdwk34QcM7vzgb2dZTtEABApGqHe5zynKkY99oh7gtqdY16R80R9rjrtwI31PSY5l7EbHrEbMvaTR2wvk3dDB/gC/rV9h0kGmbg1jyTXMvGHjitGtboK2AC99RzhhFU9AKvKGANCTMeQdysFHILdTMs1L54DEOTYOv8DQt4j4TgGmu3lTPJG48sFCHIOyrLMs6M0YNcDcmDw4wRUIfeIucbqJtMgBm6iXll8uAFBzrlJzLGlKxNN4LG7AARXuDxAoXbAgLGt0OcV/FAAW3njmiZ8GRBgXTfuaqS3c9QP1Ndoue056kL3zRVL8KNo+c2co2HJHAW0RCe6cXWTTQLcZMZUwFHAZWJoAxwxFdtFFvqhDnAMfLZIwFvLNR38DHht3QNwnTmHs7QOtlF15q37z3+KMZlguqyIyx784jvqN+Pgv0QFcoypoB4w5iB+eQ8r1+u0wLYSFdxKwBKwBCwBS8ASsAQsAcM1cSCtob4V8LB9Txy2BeBT1AnzD64qIV3sPuoncx5NsUSnqI9LsPS5X5eTa67MX9SHBbqySHSXTkkBABPbtWEvYMAe9eK3HyBg3/XTpdcBASauV/eptgMA3DaNa9uarwI4rFz51h5xXzoLAHAmc3X6+KwT4CbTob6D3YDLRNcGGDMV20UW+lgHSO0geobaWgDglpzbqSPLdVnuEJvhuAH3PTqyDlLAU2JA0+FYxwmY185J7ciaCucvnp2GpgM6F2Bi8Ke8Up9T52ODE6WPun8HgJSWalOX5LG6yUws75xN2fd43pbmrkNcg/IRdqp3Gae2R5JTGTtPU/rUIzbbQPjWVuhnqA/g394vJqt5xNVgvn8rOJW533r+V4ABANsFyxkv8SUEAAAAAElFTkSuQmCC" />') : a.obj_fullscreen.append('<img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTVDRDgxOTM0QzczMTFFNEE1ODBEN0VENTU4QTFBQjgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTVDRDgxOTQ0QzczMTFFNEE1ODBEN0VENTU4QTFBQjgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFNUNEODE5MTRDNzMxMUU0QTU4MEQ3RUQ1NThBMUFCOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFNUNEODE5MjRDNzMxMUU0QTU4MEQ3RUQ1NThBMUFCOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnEA7z4AAAIuSURBVHja7Jpda8IwFIajV/sB259zd+IciPWrDj87bDt1X+oYshvvZOwvDraLLgUDnbSuOTk5KSOB9zLpeUxMznkTFuG3NhcDqocdDEMe71kBTuilqIAeApzQrGiAmHBCXlEAJxrghCamAaca4YSmpgA9AjihW2rAOiGc0DUk0DKDtW9G375AvRSWqEs4ezemNpkRAdzE9DHhFXFzwT7oBxrghhQH/RVXJedYQwNwlUOMIMBkwA7hcs2bojmJPiNZwLT0q53zwysFuBUA7uRmxCRnoa85fcuTlrkys88AwXU1Zzj1E+N3ZX+kJOBYIoi0/2QVcZOp5lyWWRofA64V7YWahmOiJjlzx4qZolIcKM/Y1sD88J7rk8vXlH/OuM64hsD+bgzI/nMrs3/eLKAFtIAW0AJaQAtoAS2gBTQJ2FPoH5dZO43x7RRKubj1RcH7CigoB4mCdKOh4N0o+q5vx5bFTKKzm2IpPCLCPSnehQRZplMgOXOYluEvq0HBQQ/+sg1DRcd5rwC3V3TQw7zGrw/0ROO2VAB8yPmNfkpfX9a69wH3cx2EJdoBQAbQy5dmhkcZKfqWEN81yvBimxTXZ46GY8LBCAwDsB3puwDtmAZsEVxht0wBNggfITSgQZYimLV9yfVBnDfH33ynqiYuDBQG59TvZBaES3RpapOZE8AtTB8ToUa4u6K8kwmLCIcJiL1c51hBYT9K3yLAbTEDwgaMDnf3UDgXO5gfAQYA/kaa5uk6WEcAAAAASUVORK5CYII=" />'));
                b(a.obj).on("mousedown",
                function(b) {
                    k = a;
                    a.handle_event(b)
                });
                b(a.obj).mousewheel(function(b, c) {
                    a.handle_event(b)
                });
                b(h).on("resize",
                function(b) {
                    a.handle_event(b)
                });
                b(a.obj).on("touchstart",
                function(b) {
                    if (1 == b.originalEvent.touches.length) {
                        k = a;
                        var c = (new Date).getTime(),
                        f = b.originalEvent.touches[0].screenX,
                        e = b.originalEvent.touches[0].screenY;
                        350 > c - a.lastTouchTime && 100 < c - a.lastTouchTime && 50 > Math.abs(a.lastTouchX - f) && 50 > Math.abs(a.lastTouchY - e) ? (a.lastTouchTime = 0, a.didDoubleTap = !0) : a.lastTouchTime = c;
                        a.lastTouchX = f;
                        a.lastTouchY = e;
                        a.handle_event(b)
                    }
                    2 == b.originalEvent.touches.length && (k = a, a.handle_event(b));
                    b.preventDefault()
                })
            };
            a.img.src = a.obj_image.attr("src")
        },
        show_ui: function() {
            this.ui_visible || (this.ui_visible = !0, this.obj_interface.css({
                opacity: 1
            }))
        },
        hide_ui: function() {
            this.ui_visible && (this.obj_interface.css({
                opacity: 0
            }), this.ui_visible = !1)
        },
        schedule_hide_ui: function() {
            var a = this;
            a.ui_visible && (clearTimeout(a.ui_hide_timeout), a.ui_hide_timeout = setTimeout(function() {
                a.hide_ui()
            },
            1E3))
        },
        toggle_fullscreen: function() {
            if (this.is_fullscreen) this.obj.remove();
            else {
                b("body").prepend('<img src="' + this.img.src + '" id="ndd-uberzoom-fullscreen-temp-image">');
                var a = this.options;
                a.startInFullscreen = !0;
                a.width = "100%";
                a.height = "100%";
                b("#ndd-uberzoom-fullscreen-temp-image").uberZoom(a)
            }
        },
        handle_event: function(a) {
            a.stopPropagation();
            a.preventDefault();
            if ("mousewheel" != a.type && !n && (b(a.target).hasClass("ndd-uberzoom-fullscreen") || b(a.target).parent().hasClass("ndd-uberzoom-fullscreen") || b(a.target).hasClass("ndd-uberzoom-navigator") || b(a.target).hasClass("ndd-uberzoom-navigator-image") || b(a.target).hasClass("ndd-uberzoom-navigator-window")))"mousedown" == a.type && (l = !0, b(a.target).hasClass("ndd-uberzoom-navigator") || b(a.target).hasClass("ndd-uberzoom-navigator-image") || b(a.target).hasClass("ndd-uberzoom-navigator-window")) && (this.navigator_window_start_dragging(a.pageX, a.pageY), this.navigator_dragging = !0),
            "mouseup" == a.type && (l = !1, (b(a.target).hasClass("ndd-uberzoom-fullscreen") || b(a.target).parent().hasClass("ndd-uberzoom-fullscreen")) && this.toggle_fullscreen()),
            "mousemove" == a.type && (l = !0, this.navigator_dragging && this.navigator_window_drag(a.pageX, a.pageY)),
            "touchstart" == a.type && 1 == a.originalEvent.touches.length && (this.show_ui(), l = !0, b(a.target).hasClass("ndd-uberzoom-navigator") || b(a.target).hasClass("ndd-uberzoom-navigator-image") || b(a.target).hasClass("ndd-uberzoom-navigator-window")) && (this.navigator_window_start_dragging(a.originalEvent.touches[0].pageX, a.originalEvent.touches[0].pageY), this.navigator_dragging = !0),
            "touchmove" == a.type && 1 == a.originalEvent.touches.length && (this.show_ui(), l = !0, this.navigator_dragging && this.navigator_window_drag(a.originalEvent.touches[0].pageX, a.originalEvent.touches[0].pageY)),
            "touchend" == a.type && 0 == a.originalEvent.touches.length && (this.schedule_hide_ui(), l = !1, (b(a.target).hasClass("ndd-uberzoom-fullscreen") || b(a.target).parent().hasClass("ndd-uberzoom-fullscreen")) && this.toggle_fullscreen());
            else if (!l || "touchend" != a.type && "mouseup" != a.type || (this.schedule_hide_ui(), l = !1), l && "mousemove" == a.type && this.navigator_dragging && this.navigator_window_drag(a.pageX, a.pageY), l && "touchmove" == a.type && (this.show_ui(), this.navigator_dragging && this.navigator_window_drag(a.originalEvent.touches[0].pageX, a.originalEvent.touches[0].pageY)), !l) {
                "mousedown" == a.type && (this.dragging = n = !0, this.start_moving(a.screenX, a.screenY));
                "mousemove" == a.type && (n = !0, this.dragging && this.move(a.screenX, a.screenY));
                "mouseup" == a.type && (n = !1, this.stop_moving(), this.dragging = !1);
                "mousewheel" == a.type && (0 < a.deltaY ? this.zoom_in(a.offsetX, a.offsetY) : 0 > a.deltaY && this.zoom_out(a.offsetX, a.offsetY));
                "resize" == a.type && this.update_size();
                if ("touchstart" == a.type && 2 == a.originalEvent.touches.length) {
                    this.show_ui();
                    this.pinchZooming = n = !0;
                    var f = a.originalEvent.touches[0].screenX,
                    c = a.originalEvent.touches[0].screenY,
                    d = a.originalEvent.touches[1].screenX,
                    e = a.originalEvent.touches[1].screenY;
                    this.initialPinchDistance = Math.sqrt(Math.pow(c - e, 2) + Math.pow(f - d, 2));
                    this.initialZoom = this.currentZoom
                }
                "touchmove" == a.type && 2 == a.originalEvent.touches.length && (this.show_ui(), n = !0, f = a.originalEvent.touches[0].screenX, c = a.originalEvent.touches[0].screenY, d = a.originalEvent.touches[1].screenX, e = a.originalEvent.touches[1].screenY, this.pinchDelta = Math.sqrt(Math.pow(c - e, 2) + Math.pow(f - d, 2)) - this.initialPinchDistance, this.pinchDelta = 7 * this.pinchDelta / Math.sqrt(Math.pow(this.contentWidth, 2) + Math.pow(this.contentHeight, 2)), f = a.originalEvent.touches[0].pageX - this.obj.offset().left, c = a.originalEvent.touches[0].pageY - this.obj.offset().top, d = a.originalEvent.touches[1].pageX - this.obj.offset().left, e = a.originalEvent.touches[1].pageY - this.obj.offset().top, this.pinchZoomOffsetX = (f + d) / 2, this.pinchZoomOffsetY = (c + e) / 2, this.pinch_zoom(this.pinchZoomOffsetX, this.pinchZoomOffsetY));
                "touchstart" == a.type && (this.show_ui(), this.dragging = n = !0, this.didDoubleTap ? (f = a.originalEvent.touches[0].pageX - this.obj.offset().left, c = a.originalEvent.touches[0].pageY - this.obj.offset().top, this.currentZoom < this.maxZoom / 2 ? this.zoom_in(f, c, !0) : this.zoom_out(f, c, !0), this.didDoubleTap = !1) : this.start_moving(a.originalEvent.touches[0].screenX, a.originalEvent.touches[0].screenY));
                "touchend" == a.type && (this.schedule_hide_ui(), n = !1, this.stop_moving(), this.pinchZooming && (this.pinchZooming = !1, this.currentZoom > this.maxZoom ? this.zoom_in(this.pinchZoomOffsetX, this.pinchZoomOffsetY, !0) : this.currentZoom < this.minZoom && this.zoom_out(this.pinchZoomOffsetX, this.pinchZoomOffsetY, !0)));
                "touchmove" == a.type && (this.show_ui(), n = !0, this.dragging && this.move(a.originalEvent.touches[0].screenX, a.originalEvent.touches[0].screenY))
            }
        },
        navigator_window_start_dragging: function(a, b) {
            if (! (a > this.obj_nav_window.offset().left && a < this.obj_nav_window.offset().left + this.nav_window_width && b > this.obj_nav_window.offset().top && b < this.obj_nav_window.offset().top + this.nav_window_height)) {
                this.dragInitialPositionX = this.currentPosX;
                this.dragInitialPositionY = this.currentPosY;
                var c = this.contentWidth * this.currentZoom / this.navigatorWidth,
                d = this.obj_nav_window.offset().left + this.nav_window_width / 2,
                e = (this.obj_nav_window.offset().top + this.nav_window_height / 2 - b) * c;
                this.targetPosX = this.dragInitialPositionX + (d - a) * c;
                this.targetPosY = this.dragInitialPositionY + e;
                this.constrain_target_position();
                this.currentPosX = this.targetPosX;
                this.currentPosY = this.targetPosY;
                this.redraw();
                this.redraw_navigator()
            }
            this.dragEventOriginX = a;
            this.dragEventOriginY = b;
            this.dragInitialPositionX = this.currentPosX;
            this.dragInitialPositionY = this.currentPosY
        },
        navigator_window_drag: function(a, b) {
            var c = this.contentWidth * this.currentZoom / this.navigatorWidth,
            d = (this.dragEventOriginY - b) * c;
            this.targetPosX = this.dragInitialPositionX + (this.dragEventOriginX - a) * c;
            this.targetPosY = this.dragInitialPositionY + d;
            this.constrain_target_position();
            this.currentPosX = this.targetPosX;
            this.currentPosY = this.targetPosY;
            this.redraw();
            this.redraw_navigator()
        },
        pinch_zoom: function(a, b) {
            var c = this.initialZoom * (1 + this.pinchDelta);
            if (c > this.maxZoom) var d = 1 - (c - this.maxZoom),
            c = this.lastZoom + (c - this.lastZoom) * (0 > d ? 0 : d);
            c < this.minZoom && (d = 1 - 4 * (this.minZoom - c), d = 0 > d ? 0 : d, c = this.lastZoom + (c - this.lastZoom) * d);
            this.lastZoom = this.targetZoom = c;
            c = (b - this.currentPosY) / (this.contentHeight * this.currentZoom);
            this.targetPosX = this.currentPosX - (a - this.currentPosX) / (this.contentWidth * this.currentZoom) * this.contentWidth * (this.targetZoom - this.currentZoom);
            this.targetPosY = this.currentPosY - (this.targetZoom - this.currentZoom) * this.contentHeight * c;
            this.currentZoom = this.targetZoom;
            this.currentPosX = this.targetPosX;
            this.currentPosY = this.targetPosY;
            this.redraw()
        },
        zoom_in: function(a, b, c) {
            this.targetZoom += this.zoomStep;
            this.targetZoom = this.targetZoom < this.maxZoom ? this.targetZoom: this.maxZoom;
            this.targetZoom = this.targetZoom > this.minZoom ? this.targetZoom: this.minZoom;
            1 == c && (this.targetZoom = this.maxZoom);
            b = (b - this.currentPosY) / (this.contentHeight * this.currentZoom);
            this.targetPosX = this.currentPosX - (a - this.currentPosX) / (this.contentWidth * this.currentZoom) * this.contentWidth * (this.targetZoom - this.currentZoom);
            this.targetPosY = this.currentPosY - (this.targetZoom - this.currentZoom) * this.contentHeight * b;
            this.constrain_target_position();
            this.apply_zoom()
        },
        zoom_out: function(a, b, c) {
            this.targetZoom -= this.zoomStep;
            this.targetZoom = this.targetZoom < this.maxZoom ? this.targetZoom: this.maxZoom;
            this.targetZoom = this.targetZoom > this.minZoom ? this.targetZoom: this.minZoom;
            1 == c && (this.targetZoom = this.minZoom);
            b = (b - this.currentPosY) / (this.contentHeight * this.currentZoom);
            this.targetPosX = this.currentPosX - (a - this.currentPosX) / (this.contentWidth * this.currentZoom) * this.contentWidth * (this.targetZoom - this.currentZoom);
            this.targetPosY = this.currentPosY - (this.targetZoom - this.currentZoom) * this.contentHeight * b;
            this.constrain_target_position();
            this.apply_zoom()
        },
        apply_zoom: function() {
            var a = this;
            clearTimeout(a.dragTimeout);
            clearTimeout(a.zoomTimeout);
            a.currentZoom = p(a.currentZoom, a.targetZoom, a.zoomSpeed);
            a.currentPosX = p(a.currentPosX, a.targetPosX, a.zoomSpeed);
            a.currentPosY = p(a.currentPosY, a.targetPosY, a.zoomSpeed);
            a.redraw();.025 < Math.abs(a.currentZoom - a.targetZoom) || .5 < Math.abs(a.currentPosX - a.targetPosX) || .5 < Math.abs(a.currentPosY - a.targetPosY) ? a.zoomTimeout = setTimeout(function() {
                a.apply_zoom()
            },
            16) : (a.currentZoom = a.targetZoom, a.currentPosX = a.targetPosX, a.currentPosY = a.targetPosY, a.redraw())
        },
        start_moving: function(a, b) {
            this.dragOutOfBoundsY = this.dragOutOfBoundsX = 0;
            this.dragEventOriginX = a;
            this.dragEventOriginY = b;
            this.dragInitialPositionX = this.currentPosX;
            this.dragInitialPositionY = this.currentPosY;
            this.dragLastEventX = this.dragEventOriginX;
            this.dragLastEventY = this.dragEventOriginY;
            this.dragLastEventMomentumX = this.dragEventOriginX;
            this.dragLastEventMomentumY = this.dragEventOriginY;
            k = this;
            this.vy = this.vx = this.dragMomentumY = this.dragMomentumX = 0;
            clearTimeout(this.dragTimeout);
            clearTimeout(this.zoomTimeout)
        },
        move: function(a, b) {
            this.calculate_out_of_bounds();
            var c = 0 > 1 - Math.abs(this.dragOutOfBoundsX) / 100 ? 0 : 1 - Math.abs(this.dragOutOfBoundsX) / 100,
            d = 0 > 1 - Math.abs(this.dragOutOfBoundsY) / 100 ? 0 : 1 - Math.abs(this.dragOutOfBoundsY) / 100;
            this.vx = (a - this.dragLastEventX) * c;
            this.vy = (b - this.dragLastEventY) * d;
            c = (new Date).getTime();
            16 < c - this.lastMomentumCalculateTime && (this.dragMomentumX = a - this.dragLastEventMomentumX, this.dragMomentumY = b - this.dragLastEventMomentumY, this.dragMomentumX = 50 < this.dragMomentumX ? 50 : this.dragMomentumX, this.dragMomentumY = 50 < this.dragMomentumY ? 50 : this.dragMomentumY, this.lastMomentumCalculateTime = c, this.dragLastEventMomentumX = this.dragLastEventX, this.dragLastEventMomentumY = this.dragLastEventY);
            this.currentPosX += this.vx;
            this.currentPosY += this.vy;
            this.redraw();
            this.dragLastEventX = a;
            this.dragLastEventY = b
        },
        stop_moving: function() {
            var a = this;
            a.calculate_out_of_bounds();
            a.vx = a.dragMomentumX - a.dragOutOfBoundsX / 2;
            a.vy = a.dragMomentumY - a.dragOutOfBoundsY / 2;
            a.vx = 20 < a.vx ? 20 : a.vx;
            a.vx = -20 > a.vx ? -20 : a.vx;
            a.vy = 20 < a.vy ? 20 : a.vy;
            a.vy = -20 > a.vy ? -20 : a.vy;
            a.currentPosX += a.vx;
            a.currentPosY += a.vy;
            a.dragMomentumX *= a.intertia;
            a.dragMomentumY *= a.intertia;
            a.redraw();
            if (.15 < Math.abs(a.vx) || .15 < Math.abs(a.vy)) a.dragTimeout = setTimeout(function() {
                a.stop_moving()
            },
            16)
        },
        calculate_out_of_bounds: function() {
            var a = -this.contentWidth * this.currentZoom + this.frameWidth,
            b = -this.contentHeight * this.currentZoom + this.frameHeight;
            this.dragOutOfBoundsY = this.dragOutOfBoundsX = 0;
            0 < this.currentPosX && (this.dragOutOfBoundsX = this.currentPosX);
            0 < this.currentPosY && (this.dragOutOfBoundsY = this.currentPosY);
            this.currentPosX < a && (this.dragOutOfBoundsX = this.currentPosX - a);
            this.currentPosY < b && (this.dragOutOfBoundsY = this.currentPosY - b)
        },
        constrain_target_position: function() {
            var a = -this.contentWidth * this.targetZoom + this.frameWidth,
            b = -this.contentHeight * this.targetZoom + this.frameHeight;
            0 < this.targetPosX && (this.targetPosX = 0);
            0 < this.targetPosY && (this.targetPosY = 0);
            this.targetPosX < a && (this.targetPosX = a);
            this.targetPosY < b && (this.targetPosY = b)
        },
        redraw: function() {
            this.obj_content.css({
                width: this.contentWidth * this.currentZoom,
                height: this.contentHeight * this.currentZoom,
                left: this.currentPosX,
                top: this.currentPosY
            });
            this.options.navigator && this.redraw_navigator()
        },
        redraw_navigator: function() {
            if (this.options.navigator) {
                var a = this.contentWidth * this.currentZoom / this.navigatorWidth,
                b = -this.currentPosX / a,
                c = -this.currentPosY / a,
                d = (this.contentHeight * this.currentZoom - this.frameHeight - this.currentPosY) / a;
                this.nav_window_width = this.navigatorWidth + b - (this.contentWidth * this.currentZoom - this.frameWidth - this.currentPosX) / a;
                this.nav_window_height = this.navigatorHeight + c - d;
                this.obj_nav_window.css({
                    width: this.nav_window_width,
                    height: this.nav_window_height,
                    left: b,
                    top: c
                })
            }
        },
        update_size: function() {
            if (this.frameWidth != this.obj.width() || this.frameHeight != this.obj.height()) {
                this.frameWidth = this.obj.width();
                this.frameHeight = this.obj.height();
                var a = this.img.width / this.img.height,
                b = this.frameWidth / this.frameHeight;
                this.obj_image.unwrap();
                a > b ? this.obj_image.css({
                }) : this.obj_image.css({
                });
                this.obj_image.wrap('<div class="ndd-zoomable-content"></div>');
                this.obj_content = this.obj.find(".ndd-zoomable-content");
                this.contentWidth = this.obj_image.width();
                this.contentHeight = this.obj_image.height();
                this.obj_content.css({
                    position: "absolute",
                    width: this.contentWidth + "px",
                    height: this.contentHeight + "px",
                    left: -this.contentWidth / 2 + this.frameWidth / 2 + "px",
                    top: -this.contentHeight / 2 + this.frameHeight / 2 + "px"
                });
                this.obj_image.css({
                    opacity: "1",
                });
                this.defaultPosX = this.obj_content.position().left;
                this.defaultPosY = this.obj_content.position().top;
                this.currentPosX = this.defaultPosX;
                this.currentPosY = this.defaultPosY;
                this.targetZoom = this.currentZoom = 1;
                this.redraw_navigator()
            }
        }
    };
    b.fn.uberZoom = function(a) {
        return this.each(function() {
            b.data(this, "plugin_uberZoom") || b.data(this, "plugin_uberZoom", new t(this, a))
        })
    }
})(jQuery, window, document);




















;(function ( $, window, document, undefined ) {
    $(document).ready(function() {
    	$(".demo-1").uberZoom({
    		width : 960,
    		height : 400,
    		navigator : true,
    		navigatorImagePreview : true
    	});
    	$(".demo-2").uberZoom({
    		width : 470,
    		height : 300
    	});
    	$(".demo-3").uberZoom({
    		width : 470,
    		height : 300
    	});
    	$(".demo-4").uberZoom({
    		width : 470,
    		height : 300,
    		navigator : true
    	});
    	$(".demo-5").uberZoom({
    		navigator : true,
    		navigatorImagePreview : true
    	});
    	$(".demo-6").uberZoom({
    		width : 960,
    		height : 400,
    		fullscreen : true
    	});
    	$(".demo-7").uberZoom({
    		height : 460
    	});
    });
})( jQuery, window, document );