export default function addYandexMetrics(window, document) {
  // eslint-disable-next-line dot-notation
  window['ym'] =
    (50545570,
    'init',
    {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      trackHash: true,
      ecommerce: 'dataLayer',
    });

  // eslint-disable-next-line dot-notation
  window['ym'] = (50545570, 'reachGoal', 'form_send_stories');

  // eslint-disable-next-line dot-notation
  window['ym'] =
    // eslint-disable-next-line dot-notation
    window['ym'] ||
    function () {
      // eslint-disable-next-line prefer-rest-params, dot-notation
      (window['ym'].a = window['ym'].a || []).push(arguments);
    };
  // eslint-disable-next-line dot-notation
  // window['ym'].l = 1 * new Date();

  // eslint-disable-next-line no-plusplus
  for (let j = 0; j < document.scripts.length; j++) {
    if (document.scripts[j].src === 'https://mc.yandex.ru/metrika/tag.js') {
      return;
    }
  }

  const k = document.createElement('script');
  // const a = document.getElementsByTagName('script')[0];
  k.async = 1;
  k.src = 'https://mc.yandex.ru/metrika/tag.js';
  document.head.appendChild(k);
}
