import { Animation } from './animation';
import '../styles/app.scss';


(function () {
  const animation = new Animation();
  const app = document.getElementById('app');
  let container = document.querySelector('.AnimationContainer__animation');
  let animationContainer = document.querySelector('.AnimationContainer');

  // Get dimensions of animation container since it is based off 400vh
  function setAnimationContainerDimensions() {
    let { height, bottom } = animationContainer.getBoundingClientRect();
    animation.setAnimationContainerDimensions(bottom);
  }

  function initializeEventListeners() {
    let jumpToCardsButton = document.querySelector(
      '.TopContainer__buttonContainer'
    );
    let gridContainer = document.querySelector('.BottomContainer__box');

    // Edge case: On page refresh, if the user is scrolled past the bottom of the 400vh animation container, bottom gets set to a negative value.
    // Could do some crazy math to get the bottom of the animation container relative to the top of the page, or just point them to the top of the page instead
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };

    window.addEventListener('scroll', (event) => {
      const { scrollY } = window;
      animation.setScrollPosition(scrollY);
    });

    // When resizing, we should recalculate the animation container dimensions so the ball is based on the new 400vh size
    window.addEventListener('resize', (event) => {
      let { bottom } = animationContainer.getBoundingClientRect();
      setAnimationContainerDimensions(bottom);
    });

    jumpToCardsButton.addEventListener('click', (event) => {
      const { top } = gridContainer.getBoundingClientRect();
      const offset = 25;
      // Scroll slightly above it
      const position = top + window.pageYOffset - offset;
      const options = {
        top: position,
        behavior: 'smooth',
      };
      window.scrollTo(options);
    });
  }

  if (app) {
    setAnimationContainerDimensions();
    initializeEventListeners();
    animation.start(container);
  }
})();