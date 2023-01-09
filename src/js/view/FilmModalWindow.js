import modalFormFilmTemplate from '../../partials/templates/modal-form-film.hbs';
import { openModalWindow } from './openModalWindow';

export class FilmModalWindow {
  constructor(targetSelector) {
    this.refs = this.getRefs(targetSelector);
    this.showNextCallbacks = new Set();
    this.showPrevCallbacks = new Set();
  }

  getRefs(targetSelector) {
    return {
      target: document.querySelector(targetSelector),
    };
  }

  drawView(data) {
    this.removeListeners();
    this.data = data;
    openModalWindow(modalFormFilmTemplate({
      ...data,
      genres: data.genres.join(", "),
      tab: data.tab || 'info',
    }));
    this.addListeners();
  }

  addListeners() {
    const tabInfoButton = document.querySelector('#tab-info');
    if (tabInfoButton) {
      tabInfoButton.addEventListener('click', this.showInfoTab);
    }

    const tabVideoButton = document.querySelector('#tab-video');
    if (tabVideoButton) {
      tabVideoButton.addEventListener('click', this.showVideoTab);
    }

    const arrowPrev = document.querySelector('#arrow-prev');
    if (arrowPrev) {
      arrowPrev.addEventListener('click', this.showPrev);
    }

    const arrowNext = document.querySelector('#arrow-next');
    if (arrowNext) {
      arrowNext.addEventListener('click', this.showNext);
    }
  }

  removeListeners() {
    const tabInfoButton = document.querySelector('#tab-info');
    if (tabInfoButton) {
      tabInfoButton.removeEventListener('click', this.showInfoTab);
    }

    const tabVideoButton = document.querySelector('#tab-video');
    if (tabVideoButton) {
      tabVideoButton.removeEventListener('click', this.showVideoTab);
    }

    const arrowPrev = document.querySelector('#arow-prev');
    if (arrowPrev) {
      arrowPrev.removeEventListener('click', this.showPrev);
    }

    const arrowNext = document.querySelector('#arow-next');
    if (arrowNext) {
      arrowNext.removeEventListener('click', this.showNext);
    }
  }

  showInfoTab = () => {
    this.data.tab = 'info';
    this.drawView(this.data);
  };

  showVideoTab = () => {
    this.data.tab = 'video';
    this.drawView(this.data);
  };

  showNext = () => {
    for (const callback of this.showNextCallbacks) {
      callback();
    }
  };

  showPrev = () => {
    for (const callback of this.showPrevCallbacks) {
      callback();
    }
  };

  addListenersOnShowNext(callback) {
    if (typeof callback === 'function') {
      this.showNextCallbacks.add(callback);
    }
  }

  addListenersOnShowPrev(callback) {
    if (typeof callback === 'function') {
      this.showPrevCallbacks.add(callback);
    }
  }
}