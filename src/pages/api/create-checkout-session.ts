
import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

export async function POST({ request }) {

  try {

    const body = await request.json();

    const session = await stripe.checkout.sessions.create({

      payment_method_types: ['card'],

      mode: 'payment',

      shipping_address_collection: {
        allowed_countries: ['NO', 'SE', 'DK', 'US', 'GB']
      },

      line_items: [
        {
          price_data: {
            currency: 'nok',

            product_data: {
              name: body.name
            },

            unit_amount: Number(body.price) * 100
          },

          quantity: 1
        }
      ],

      success_url: 'https://amicbridge.com/success',

      cancel_url: 'https://amicbridge.com/cancel'

    });

    return new Response(
      JSON.stringify({
        url: session.url
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {

    return new Response(
      JSON.stringify({
        error: error.message
      }),
      {
        status: 500
      }
    );

  }

}
