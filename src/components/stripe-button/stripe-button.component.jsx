import React from 'react';
// About component: https://www.npmjs.com/package/react-stripe-checkout
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  // Because price has to be in cents/pence
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_Wi0mpmvdsesHlr5S0FspXiMQ00TU8juLMW';

  const onToken = (token) => {
    console.log(token);
    alert('Payment is Successful');
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='e-asy-shop'
      billingAddress
      shippingAddress
      image='http://svgshare.com/i/CUz.svg'
      description={`Your total is £${price}`}
      amout={priceForStripe}
      panelLabel='Pay Now'
      // Stripe needs token to create a charge in the backend
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
