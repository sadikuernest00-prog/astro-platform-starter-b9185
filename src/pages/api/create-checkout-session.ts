import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

export async function POST({ request }) {

  const body = await request.json();

  const session = await stripe.checkout.sessions.create({

    payment_method_types: ['card'],

    line_items: [
      {
        price_data: {
          currency: 'nok',

          product_data: {
            name: body.name
          },

          unit_amount: body.price * 100
        },

        quantity: 1
      }
    ],

    mode: 'payment',

    shipping_address_collection: {
      allowed_countries: ['NO','SE','DK','GB','US']
    },

    success_url: 'https://your-site.netlify.app/success',

    cancel_url: 'https://your-site.netlify.app/cancel'
  });

  return new Response(
    JSON.stringify({
      url: session.url
    }),
    {
      status:200,
      headers:{
        'Content-Type':'application/json'
      }
    }
  );
}
