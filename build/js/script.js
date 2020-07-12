(function () {
  lottie.loadAnimation({
    container: document.getElementById('animation'), // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'data.json' // the path to the animation json
  });
})();

'use strict';

(function () {
  var ReqUrl = {
    GET: 'https://split.daichicloud.ru/brands/all',
    //POST: 'https://js.dump.academy/kekstagram'
  };

  var ReqMethod = {
    GET: 'GET',
    POST: 'POST'
  };

  var ReqStatus = {
    OK: 200,
    MULTIPLE_CHOICES: 300,
  };

  var TIMEOUT = 10000;

  var isErrorStatus = function (xhr) {
    return xhr.status < ReqStatus.OK
      || xhr.status > ReqStatus.MULTIPLE_CHOICES;
  };

  var createRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.timeout = TIMEOUT;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (isErrorStatus(xhr)) {
        onError('Данные не загрузились. Причина: ' + xhr.status + ' ' + xhr.statusText);
        return;
      }

      onLoad(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var removeElement = function (element) {
    element.remove();
  };

  var onAnyError = function (message) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
    window.setTimeout(removeElement, 2000, node);
  };

  window.backend = {
    load: function (onLoad, onError) {
      var req = createRequest(onLoad, onError || onAnyError);
      req.open(ReqMethod.GET, ReqUrl.GET);
      req.send();
    },

    // save: function (data, onLoad, onError) {
    //   var req = createRequest(onLoad, onError);
    //   req.open(ReqMethod.POST, ReqUrl.POST);
    //   req.send(data);
    // }
  };
})();





// $(document).ready(function() {
//   // $('.model-choice__brand-select').select2({
//   //   minimumResultsForSearch: -1,
//   // });

//   // $('.model-choice__series-select').select2({
//   //   minimumResultsForSearch: -1,
//   // });

//   function makeSelect(element) {
//     $(element).select2({
//       minimumResultsForSearch: -1,
//     });
//   };




//   window.makeSelect = makeSelect;

//   console.log(window.makeSelect);

// });


(function($) {
  function makeSelect(elementClass) {
    $(elementClass).select2({
      minimumResultsForSearch: -1,
    });
  };

  window.makeSelect = makeSelect;
})(jQuery);

(function (makeSelect) {
  const splits = [
    {
      "id":7,
      "title":"Axioma",
      "series":[
        {
          "id":63,
          "title":"ASX_A"
        },
        {
          "id":62,
          "title":"ASX_AZ"
        }
      ]
    },
    {"id":6,"title":"Daichi","series":[{"id":45,"title":"Carbon DA_DVQ"},{"id":46,"title":"Everest DA_EVQ"},{"id":43,"title":"Peak DA_AVQS"},{"id":42,"title":"X-treme Peak DA_AVQS"}]},
    {"id":1,"title":"Daikin","series":[{"id":11,"title":"Comfora FTX-J\/GV"},{"id":26,"title":"Comfora FTXP-K3"},{"id":27,"title":"Comfora FTXP-L"},{"id":28,"title":"Comfora FTXP-M"},{"id":23,"title":"Emura FTXG-L"},{"id":18,"title":"Emura FTXJ-M"},{"id":20,"title":"FLXS-B"},{"id":16,"title":"FTXB-B"},{"id":65,"title":"FTXS-E"},{"id":64,"title":"FTXS-J\/G"},{"id":21,"title":"FVXM-F"},{"id":22,"title":"FVXS-F"},{"id":19,"title":"Nexura FVXG-K"},{"id":24,"title":"Perfera FTXM-N"},{"id":25,"title":"Perfera FTXS-K"},{"id":1,"title":"Sensira FTXB-C"}]},
    {"id":2,"title":"Kentatsu","series":[{"id":49,"title":"Bravo  KSGB_HFAN"},{"id":50,"title":"Bravo  KSGBA_HZAN"},{"id":56,"title":"KMGBA_HZAN"},{"id":57,"title":"KMGBB_HZAN"},{"id":52,"title":"Team  KSGT_HZAN"},{"id":47,"title":"Titan Genesis KSGX"},{"id":51,"title":"Turin KSGU_HZAN"}]},
    {"id":8,"title":"Midea","series":[{"id":61,"title":"Blanc MSMA"},{"id":60,"title":"Blanc MSMA ERP (MA)"},{"id":59,"title":"Mission MSMB (MB)"},{"id":58,"title":"Ultimate Comfort MSMT (MT)"}]}];

  let linkHref = '#';

  const brandClass = '.model-choice__brand-select';
  const seriesClass = '.model-choice__series-select';

  const brandSelect = document.querySelector('.model-choice__brand-select');
  const seriesWrapper = document.querySelector('.model-choice__series-wrapper');
  const seriesTemplate = document.querySelector('#series').content.querySelector('.model-choice__series-select');

  const link = document.querySelector('.model-choice__link');

  const makeOptionNode = (arr) => {
    let fragment = document.createDocumentFragment();
    let i = 0;

    arr.forEach((item) => {
      let node = document.createElement('option');
      node.setAttribute('value', item['title']);
      node.textContent = item['title'];
      node.setAttribute('data-id', i);
      i++;
      fragment.appendChild(node);

      let seriesSelect = seriesTemplate.cloneNode(true);
      seriesSelect.classList.add('hidden');
      seriesSelect.setAttribute('name', item['title']);

      item.series.forEach((serie) => {
        let node = document.createElement('option');
        node.setAttribute('value', serie['title']);
        node.textContent = serie['title'];
        seriesSelect.appendChild(node);
      });

      seriesWrapper.appendChild(seriesSelect);
    });

    brandSelect.appendChild(fragment);
  };

  //brandSelect.appendChild(makeOptionNode(splits));
  makeOptionNode(splits);

  makeSelect(brandClass);
  makeSelect(seriesClass);

  jQuery(brandClass).select2('open');
  jQuery(brandClass).select2('close');


  const seriesSelects = document.querySelectorAll('.model-choice__series-select');


  const hideSeries = () => {
    seriesSelects.forEach((select) => {
      if (!select.classList.contains('hidden')) {
        select.classList.add('hidden');
        select.removeAttribute('id');
      }
    })
  };

  const showSeries = (idx) => {
    seriesSelects[idx].classList.remove('hidden');
    seriesSelects[idx].setAttribute('id', 'series-select');
  };

  jQuery(brandClass).on('change', function (evt) {
    let idx = +jQuery('.model-choice__brand-select option:selected').attr('data-id');

    hideSeries();
    showSeries(idx + 1);

    jQuery('#series-select').select2('open');
    jQuery('#series-select').select2('close');

    jQuery('.model-choice__brand-select').addClass('selected');
    jQuery('.model-choice__series-select').removeClass('selected');
  });

  jQuery(seriesClass).on('change', function (evt) {
    if (link.classList.contains('disabled')) {
      link.classList.remove('disabled');
    }

    let value = jQuery(evt.target).children('option:selected').text();
    linkHref = value;


    link.setAttribute('href', linkHref);

    jQuery('.model-choice__series-select').addClass('selected');
  });

})(window.makeSelect);

(function () {
  const brandSelect = document.querySelector('.model-choice__brand-select');
  const seriesSelects = document.querySelectorAll('.model-choice__series-select');
  const hidingClass = 'select2-hidden-accessible';

  let idx = -1;

  const removeClass = (item) => {
    item.classList.remove(hidingClass);
    item.removeAttribute('aria-hidden');
    item.removeAttribute('tabindex');
  };

  const addClass = (item) => {
    item.classList.add(hidingClass);
    item.setAttribute('aria-hedden', 'true');
    item.setAttribute('tabindex', '-1');
  };

  const isMobile = () => {
    return  window.matchMedia('(max-width: 479px)').matches;
  };

  let isOutOfMobile = !isMobile;

  const onResize = () => {
    if (isMobile() && isOutOfMobile) {
      isOutOfMobile = false;

      removeClass(brandSelect);

      if (idx !== -1) {
        removeClass(seriesSelects[idx]);
      }

      addEventListeners();
    }

    if (!isMobile() && !isOutOfMobile) {
      isOutOfMobile = true;

      addClass(brandSelect);

      if (idx !== -1) {
        addClass(seriesSelects[idx]);
      }

      removeEventListeners();
    }
  }

  const addEventListeners = () => {
    brandSelect.addEventListener('change', onBrandChange);
  };

  const removeEventListeners = () => {
    brandSelect.removeEventListener('change', onBrandChange);
  };

  const onBrandChange = (evt) => {
    if (idx !== -1) {
      addClass(seriesSelects[idx]);
    }

    idx = evt.target.selectedIndex;

    removeClass(seriesSelects[idx]);
  };

  if (isMobile()) {
    removeClass(brandSelect);
    addEventListeners();
  }

  window.addEventListener('resize', onResize);
})();
