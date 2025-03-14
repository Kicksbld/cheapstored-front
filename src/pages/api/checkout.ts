import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

interface Product {
  quantity: number;
  id: number;
  amount: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("Request body:", req.body);
    const { name, idCustomer, items, customerEmail, customerName } = req.body;

    console.log("Received data:", {
      name,
      idCustomer,
      items,
      customerEmail,
      customerName,
    });

    try {
      // Création d'un client Stripe
      const customer = await stripe.customers.create({
        email: customerEmail,
        name: customerName,
      });

      // Taxe fixe
      const taxAmount = 500; // 5.00€ en centimes

      // Création des articles Stripe (sans ajouter la taxe par unité)
      const lineItems = items.map((item: Product) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: `Produit ${item.id}`,
          },
          unit_amount: Math.round(item.amount * 100), // Prix unitaire sans taxe
        },
        quantity: item.quantity,
      }));

      // Ajout de la ligne pour la taxe
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: "Taxe",
          },
          unit_amount: taxAmount,
        },
        quantity: 1,
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card", "klarna", "link", "paypal"],
        line_items: lineItems,
        customer: customer.id,
        metadata: {
          idCustomer: idCustomer,
          items: JSON.stringify(items),
        },
        mode: "payment",
        allow_promotion_codes: true,
        success_url: `${req.headers.origin}/userpages/OrderReview`,
        cancel_url: `${req.headers.origin}/userpages/Cancel`,
      });

      res.status(200).json({ id: session.id });
    } catch (err) {
      if (err instanceof Error) {
        console.error("Stripe error:", err.message);
        res.status(500).json({ error: err.message });
      } else {
        console.error("Unknown error occurred");
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
