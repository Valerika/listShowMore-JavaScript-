(function() {
  'use strict';

  var inProgress = false;

  function loadList() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'src/items.json', false);
    xhr.send();

    if (xhr.status !== 200) {
      alert('Error ' + xhr.status + ': ' + xhr.statusText);
    }
    else {
      var data = JSON.parse(xhr.responseText);
      var news = document.getElementById('news');
      for (var i = 0, ln = data.length; i < ln; i += 1) {
        var article = document.createElement('div');
        article.className = 'article';
        var figure = document.createElement('figure');
        var img = document.createElement('img');
        img.setAttribute("src", 'src/' + data[i]["image"]);
        var figcaption = document.createElement('figcaption');
        var title = document.createElement('div');
        title.className = 'articleTitle';
        var span = document.createElement('span');
        span.innerHTML = (data[i]['title']);
        var p = document.createElement('p');
        p.innerHTML = (data[i]['paragraph']);

        news.appendChild(article);
        article.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(figcaption);
        figcaption.appendChild(title);
        title.appendChild(span);
        figcaption.appendChild(p);
      }
    }
    visibleToTop();
  }
  loadList();

  var Inf;

  function isVisible(e) {
    Inf = function(e) {
      var body = document.body;
      var html = document.documentElement;
      var heightDoc = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (html || body.parentNode || body).scrollTop;
      var y = scrollTop + window.innerHeight;
      //console.log('scrollTop + window.innerHeight', y+1)
      //console.log('heightDoc', heightDoc)
      if (y + 1 >= heightDoc) {
        loadList();
      }
    }
    window.addEventListener('scroll', Inf, false);
  }

  function visibleToTop(e) {
    if (pageYOffset >= 200) {
      document.getElementById('toTop').className = 'goTop';
    }
    else {
      document.getElementById('toTop').className = 'toggleHide';
    }
  }

  function changeMethodView(e) {
    var readMore = document.getElementById('readMore');
    if (inProgress === false) {
      readMore.className = 'toggleHide';
      isVisible();
      inProgress = true;
    }
    else {
      readMore.className = 'moreInfo';
      inProgress = false;
      window.removeEventListener('scroll', Inf, false);
    }
  }

  function animateToTop(e) {
    var el = document.documentElement;

    function scrollTo(element, to, duration) {
      var start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;

      var animateScroll = function() {
        currentTime += increment;
        var val = easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if (currentTime < duration) {
          setTimeout(animateScroll, increment);
        }
      };
      animateScroll();
    }

    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    if (el.scrollTop === 0) {

      var t = el.scrollTop;
      ++el.scrollTop;
      el = t + 1 === el.scrollTop-- ? el : document.body;
    }
    scrollTo(el, 0, 500);
  }

  var toggle = document.getElementById('toggleMethod');
  toggle.addEventListener('click', changeMethodView, false);

  var goTop = document.getElementById('toTop');
  goTop.addEventListener('click', animateToTop, false);

  var readMore = document.getElementById('readMore');
  readMore.addEventListener('click', loadList, false);

})();
