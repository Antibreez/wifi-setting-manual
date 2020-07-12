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




