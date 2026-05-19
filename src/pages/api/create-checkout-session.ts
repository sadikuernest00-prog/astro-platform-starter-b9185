import Stripe from "stripe";

export async function POST({ request }) {

  try {

    const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

    const body = await request.json();

    const session = await stripe.checkout.sessions.create({

      payment_method_types: ["card"],

      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "nok",

            product_data: {
              name: body.name,
            },

            unit_amount: Number(body.price) * 100,
          },

          quantity: 1,
        },
      ],

      shipping_address_collection: {
        allowed_countries: ["NO", "SE", "DK", "GB", "US"],
      },

      success_url: `${new URL(request.url).origin}/success`,

      cancel_url: `${new URL(request.url).origin}/cancel`,
    });

    return new Response(
      JSON.stringify({
        url: session.url,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

  } catch (error) {

    console.error(error);

    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        status: 500,
      }
    );

  }

}
