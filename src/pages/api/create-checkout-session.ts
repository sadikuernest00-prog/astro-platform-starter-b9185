import Stripe from "stripe";

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

export async function POST() {

  const session = await stripe.checkout.sessions.create({

    payment_method_types: ["card"],

    mode: "payment",

    shipping_address_collection: {
      allowed_countries: ["NO", "SE", "DK", "GB", "US"],
    },

    line_items: [
      {
        price_data: {
          currency: "nok",

          product_data: {
            name: "AmicUnderwear Product",
          },

          unit_amount: 59900,
        },

        quantity: 1,
      },
    ],

    success_url: "https://amicbridge.com/success",
    cancel_url: "https://amicbridge.com/cancel",

  });

  return new Response(
    JSON.stringify({
      id: session.id,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
