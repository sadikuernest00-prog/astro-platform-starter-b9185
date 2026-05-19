import Stripe from "stripe";

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
});

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

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

      mode: "payment",

      shipping_address_collection: {
        allowed_countries: ["NO", "SE", "DK", "GB", "US"],
      },

      success_url: "https://your-site.netlify.app/success",
      cancel_url: "https://your-site.netlify.app/cancel",
    });

    return new Response(
      JSON.stringify({
        id: session.id,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: "Stripe error",
      }),
      {
        status: 500,
      }
    );
  }
}
