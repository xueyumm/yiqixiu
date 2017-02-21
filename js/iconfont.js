;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-yinfu" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M575.125671 194.437504l320.821882 0 0 0C856.748952 116.040303 776.620233 66.518094 688.969853 66.518094L511.677643 66.518094l0 32.121076L511.677643 194.437504l0 432.778997c-58.239149-40.369319-145.802544-42.189868-221.697642 1.628158-99.062838 57.194304-140.732842 170.48178-93.07007 253.034828 47.661749 82.553048 166.606334 103.110209 265.669172 45.915905C531.448867 888.032923 572.308374 821.160749 574.968074 756.351658c0.260956-1.084757 0.157597-2.209424 0.157597-3.370932L575.125671 194.437504z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-down" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M551.219 747.372l391.876-392.261c21.657-21.655 21.657-56.784 0-78.442-21.654-21.711-56.731-21.711-78.386 0l-352.687 352.987-352.74-352.987c-21.653-21.711-56.731-21.711-78.383 0-21.658 21.658-21.658 56.786 0 78.442l391.934 392.261c21.597 21.652 56.731 21.652 78.386 0z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-up" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M472.781 276.628l-391.876 392.261c-21.657 21.655-21.657 56.784 0 78.442 21.654 21.711 56.731 21.711 78.386 0l352.687-352.987 352.74 352.987c21.653 21.711 56.731 21.711 78.383 0 21.658-21.658 21.658-56.786 0-78.442l-391.934-392.261c-21.597-21.652-56.731-21.652-78.386 0z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)