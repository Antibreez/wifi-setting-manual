(function () {
  const brandSelect = document.querySelector('.model-choice__brand-select');
  const seriesSelects = document.querySelectorAll('.model-choice__series-select');
  const hidingClass = 'select2-hidden-accessible';

  let idx = -1;

  const removeClass = (item) => {
    item.classList.remove(hidingClass);
    item.removeAttribute('aria-hidden');
  };

  const addClass = (item) => {
    item.classList.add(hidingClass);
    item.setAttribute('aria-hedden', 'true');
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
