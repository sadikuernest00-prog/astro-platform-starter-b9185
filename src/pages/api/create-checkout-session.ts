
import Stripe from 'stripe';

export const prerender = false;

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

export async function POST({ request }) {

  const formData = await request.formData();

  const price = formData.get('price');
  const product = formData.get('product');

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],

    shipping_address_collection: {
      allowed_countries: ['NO', 'SE', 'DK', 'GB', 'US']
    },

    line_items: [
      {
        price_data: {
          currency: 'nok',

          product_data: {
            name: String(product)
          },

          unit_amount: Number(price) * 100
        },

        quantity: 1
      }
    ],

    mode: 'payment',

    success_url: 'https://YOUR-NETLIFY-URL.netlify.app/success',

    cancel_url: 'https://YOUR-NETLIFY-URL.netlify.app/cancel'
  });

  return Response.redirect(session.url, 303);
}
