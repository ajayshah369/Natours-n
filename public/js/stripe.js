/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51HvLxvEE2P6DBPHpDWahWhgnMeH7Ovpi2AQZ2ggXLuSBbOdLbh5OvZyQ0Q6WnY2VKzUiieY7Diin9lxrJYYM0RtV00ZyweIwGy'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
