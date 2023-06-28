import Splide from '@splidejs/splide';
import Swiper from 'swiper';
/**
 * import main Stories Slider function
 */
import createStoriesSlider from '../../src/stories-slider.esm.js';
/**
 * import Stories Slider styles
 */
import '../../src/stories-slider.scss';

/**
 * Custom local styles
 */
import './main.scss';

/**
 * Stories Slider element
 */
const storiesSliderEl = document.querySelector('.stories-slider');

/**
 * Init Stories Slider
 *
 * argument: pass .stories-slider element and parameters
 */
const storiesSlider = createStoriesSlider(storiesSliderEl, {
  /*
   * Pass Swiper function so it can create swipers with new Swiper()
   */
  Swiper,
  /*
   * As we don't use Swiper bundle version, we need to pass Cube effect module
   */
  // EffectCube,
  /*
   * Autoplay duration to switch story every 5 seconds
   */
  autoplayDuration: 7000,
  /*
   * We pass here false as initially our stories slider is hidden and we don't need it to autoplay stories while it is hidden
   */
  enabled: false,
  /*
   * We can pass callback function that will be called on each slide change with current main slider index (index of user with stories) and current sub slider index (index of user's specific story)
   */
  onSlidesIndexesChange() {
    // eslint-disable-next-line
    // console.log({ mainIndex, subIndex });

    document.querySelectorAll('.attachment').forEach((el) => {
      el.classList.remove('active');
    });
  },
});

new Splide('.splide', {
  classes: {
    arrows: 'splide__arrows slider__arrows',
    arrow: 'splide__arrow slider__arrow',
    prev: 'splide__arrow--prev slider__arrow_prev',
    next: 'splide__arrow--next slider__arrow_next',
  },
  autoplay: true,
  autoWidth: true,
  gap: 20,
  type: 'loop',
}).mount();

document.querySelector('.slider').addEventListener('mouseenter', () => {
  storiesSlider.disable();
});

document.querySelector('#callbackForm').addEventListener('mouseenter', () => {
  storiesSlider.disable();
});

// open attachment drawer
document.querySelectorAll('.attachment-btn').forEach((el) => {
  el.addEventListener('click', (e) => {
    const drawer = e.target
      .closest('.swiper-slide')
      .querySelector('.attachment');
    drawer.classList.add('active');
    storiesSlider.disable();
  });
});

// close attachment drawer
document.querySelectorAll('.attachment-close').forEach((el) => {
  el.addEventListener('click', (e) => {
    const drawer = e.target.closest('.attachment');
    drawer.classList.remove('active');
    storiesSlider.enable();
  });
});

// next-button handler
document.querySelectorAll('.btn-next').forEach((el) => {
  el.addEventListener('click', () => {
    const storyIndex = parseInt(el.getAttribute('data-story-index'), 10);
    storiesSlider.subSwipers[storyIndex].slideNext();
  });
});

// open specific user's stories on demo app header stories click
document.querySelectorAll('.demo-stories a').forEach((userEl, userIndex) => {
  userEl.addEventListener('click', (e) => {
    e.preventDefault();
    // add "in" class (used in demo for animated appearance)
    storiesSliderEl.classList.add('stories-slider-in');
    // enable slider (as we passed enabled: false initially)
    storiesSlider.enable();
    // slide to specific user's stories
    storiesSlider.slideTo(userIndex, 0);
  });
});

// go to to form
document.querySelectorAll('.btn-form').forEach((el) => {
  el.addEventListener('click', () => {
    storiesSlider.slideTo(0, 4);
  });
});

// go to personal form
document.querySelectorAll('.btn-personal-form').forEach((el) => {
  el.addEventListener('click', () => {
    storiesSlider.slideTo(7, 4);
  });
});

// open specific user's stories on post avatar click
document.querySelectorAll('.demo-post-avatar').forEach((avatarEl) => {
  const userIndex = parseInt(avatarEl.getAttribute('data-user-index'), 10);
  avatarEl.addEventListener('click', (e) => {
    e.preventDefault();
    // add "in" class (used in demo for animated appearance)
    storiesSliderEl.classList.add('stories-slider-in');
    // enable slider (as we passed enabled: false initially)
    storiesSlider.enable();
    // slide to specific user's stories
    storiesSlider.slideTo(userIndex, 0);
  });
});

// stories slider close handler
storiesSliderEl.addEventListener('click', (e) => {  
  // if we clicked at "stories-slider-close-button"
  if (e.target.matches('.stories-slider-close-button')) {    
    // disable slider as we don't need it autoplay stories while it is hidden
    storiesSlider.disable();
    // add "out" class (used in demo for animated disappearance)
    storiesSliderEl.classList.add('stories-slider-out');
    window.top.postMessage('close-story', '*');
  }    
});

// when slider became hidden we need to remove "in" and "out" class to return it initial state
storiesSliderEl.addEventListener('animationend', () => {
  if (storiesSliderEl.classList.contains('stories-slider-out')) {
    storiesSliderEl.classList.remove('stories-slider-in');
    storiesSliderEl.classList.remove('stories-slider-out');
  }
});

window.onmessage = (e) => {
  if (typeof e.data == 'string' && e.data.slice(0, 10) == 'open-story') {
    storiesSliderEl.classList.add('stories-slider-in');
    storiesSlider.enable();  
    
    if (parseInt(e.data.slice(-2)) < 0) {
      storiesSlider.slideTo(parseInt(e.data.slice(-1), 10) - 1, 0);  
    }

    storiesSlider.slideTo(parseInt(e.data.slice(-2), 10) - 1, 0);
  } 
};
