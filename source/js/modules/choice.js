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

  const seriesSelects = document.querySelectorAll('.model-choice__series-select');

  console.log(seriesSelects);


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
