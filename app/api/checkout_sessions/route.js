import Stripe from "stripe"
import { NextResponse } from "next/server"



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const formatAmountForStripe = (amount) => {
    return Math.round(amount * 100)
}



export async function GET(req)
{
    const searchParams = req.nextUrl.searchParams
    const session_id = searchParams.get('session_id')

    try {
        const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
        return NextResponse.json(checkoutSession)
    }
    catch(error){
        console.error('Error retrieving checkout session:', error)
        return NextResponse.json({error: {message: error.message}}, {status: 500})
    }
}


export async function POST(req) {
    // Parse the request to determine the subscription type
    const { subscriptionType} = await req.json();

    // Set the price and description based on the subscription type
    const price = subscriptionType === 'Pro' ? 10 : 5; // Assuming Basic is $5 and Pro is $10
    const productName = subscriptionType === 'Pro' ? 'Pro Subscription' : 'Basic Subscription';

    const params = {
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        // name: 'Pro Subscription',
                        name: productName,
                    },
                    // unit_amount: formatAmountForStripe(10),
                    unit_amount: formatAmountForStripe(price),
                    recurring: {
                        interval: 'month',
                        interval_count: 1,

                    },

                },
                quantity: 1,
            },
        ],
        success_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}&subscriptionType=${subscriptionType}`,
        cancel_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}&subscriptionType=${subscriptionType}`,
        metadata: {
            subscriptionType: subscriptionType, // Add subscription type metadata
        },

    };
    const checkoutSession = await stripe.checkout.sessions.create(params);
    return NextResponse.json(checkoutSession, {
        status: 200,

    })

}