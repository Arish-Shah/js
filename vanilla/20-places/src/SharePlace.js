import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import { getAddressFromCoords, getCoordsFromAddress } from './Utility/Location';

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');
    this.shareBtn = document.getElementById('share-btn');
    this.shareLinkInputElement = document.getElementById('share-link');

    locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
    this.shareBtn.addEventListener('click', this.sharePlaceHandler.bind(this));
    addressForm.addEventListener('submit', this.findAddressHandler.bind(this));
  }

  sharePlaceHandler() {
    if (!navigator.clipboard) {
      this.shareLinkInputElement.select();
      return;
    }

    navigator.clipboard
      .writeText(this.shareLinkInputElement.value)
      .then(() => alert('Copied to clipboard'))
      .catch(error => {
        console.log(error);
        this.shareLinkInputElement.select();
      });
  }

  selectPlace(coords, address) {
    if (this.map) {
      this.map.render(coords);
    }
    this.map = new Map(coords);

    this.shareBtn.disabled = false;
    this.shareLinkInputElement.value = `${
      location.origin
    }/my-place?address=${encodeURI(address)}&lat=${coords.lat}&lng=${
      coords.lng
    }`;
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
      async successResult => {
        const coords = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude
        };
        const address = await getAddressFromCoords(coords);
        modal.hide();
        this.selectPlace(coords, address);
      },
      error => {
        modal.hide();
        alert(
          'Could not locate you unfortunately. Please enter an address manually!'
        );
      }
    );
  }

  async findAddressHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector('input').value;
    if (!address || address.trim().length === 0) {
      alert('Invalid address entered - please try again!');
      return;
    }

    const modal = new Modal(
      'loading-modal-content',
      'Loading location - please wait!'
    );
    modal.show();

    try {
      const coordinates = await getCoordsFromAddress(address);
      this.selectPlace(coordinates, address);
    } catch (err) {
      alert(err.message);
    }

    modal.hide();
  }
}

const placeFinder = new PlaceFinder();
