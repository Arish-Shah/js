import { Modal } from './UI/Modal';

class PlaceFinder {
  constructor() {
    const form = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');

    locateUserBtn.addEventListener('click', this.locateUserHandler);
    form.addEventListener('submit', this.findAddressHandler);
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        'Location feature is not available in your browser - please use a more modern browser or enter an address.'
      );
      return;
    }

    const modal = new Modal(
      'loading-modal-content',
      'Loading location - please wait!'
    );
    modal.show();
    navigator.geolocation.getCurrentPosition(
      successResult => {
        modal.hide();
        const coords = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude
        };
        console.log(coords);
      },
      error => {
        modal.hide();
        alert(
          'Could not locate you unfortunately. Please enter an address manually!'
        );
      }
    );
  }

  findAddressHandler() {}
}

new PlaceFinder();
