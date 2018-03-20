function InstagramVideoControls() {
    function b(q, r) {
        return c((r || document).querySelectorAll(q))
    }

    function c(q) {
        return Array.from(q)
    }

    function d() {
        const q = b(".EmbedVideo").concat(h(document.body));
        q.forEach(r => {
            e(r), f(r)
        })
    }

    function e(q) {
        b("video", q).forEach(r => {
            r.controls = !0
        })
    }

    function f(q) {
        b(".videoSpritePlayButton", q).forEach(r => {
            j(r.parentNode)
        }), g(q).forEach(r => {
            j(r)
        })
    }

    function g(q) {
        return b("a[role=button]", q).filter(r => {
            const s = window.getComputedStyle(r);
            return "100px" <= s.width && "100px" <= s.height
        })
    }

    function h(q) {
        const r = [];
        return b(".videoSpritePlayButton", q).map(s => {
            let t = null;
            i(s, 3).forEach(u => {
                !t && b("video", u).length && g(u).length && (t = u)
            }), t ? r.push(t) : m("couldnt find parent", s)
        }), r
    }

    function i(q, r) {
        const s = [];
        for (; q && 0 <= --r;) q = q.parentNode, q && s.push(q);
        return c(s)
    }

    function j(q) {
        q.parentNode.removeChild(q)
    }

    function k() {
        document.addEventListener("visibilitychange", l)
    }

    function l() {
        m("startLookingForPlayerDomElement");
        p || document.hidden || (d(), o ? (p = !0, m(o)) : setTimeout(l, 5e3))
    }

    function m() {}
    let o, p = !1;
    this.init = function () {
        k(), l()
    }
}
const instagramVideoControls = new InstagramVideoControls;
instagramVideoControls.init(), window.instagramVideoControls = instagramVideoControls;