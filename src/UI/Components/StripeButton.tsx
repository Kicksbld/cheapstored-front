import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "../Design-System/Button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
const SESSION_URL = "/api/checkout";

interface CheckoutFormProps {
  name: string;
  amount: number;
  id: number;
  idCustomer: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  name,
  amount,
  id,
  idCustomer,
}) => {
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!stripe) {
    return <div>Loading payment system...</div>;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      localStorage.setItem("checkout_in_progress", "true"); // Marqueur temporaire
  
      const res = await fetch(SESSION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, amount, id, idCustomer }),
      });
  
      if (!res.ok) throw new Error("Failed to create checkout session");
  
      const session = await res.json();
  
      const result = await stripe!.redirectToCheckout({ sessionId: session.id });
  
      if (result.error) {
        setError(result.error.message || "An unknown error occurred");
        localStorage.removeItem("checkout_in_progress"); // Nettoie si erreur
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
      localStorage.removeItem("checkout_in_progress");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      {loading ? (
        <Button type="submit" size="large" variant="filled" disabled={loading}>Chargement en cours</Button>
      ) : (
        <Button type="submit" size="large" variant="filled">Payement Sécurisé -:- {amount}€</Button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
};

const CheckoutButton: React.FC<{
  name: string;
  amount: number;
  id: number;
  idCustomer: number;
}> = ({ name, amount, id, idCustomer }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm name={name} amount={amount} id={id} idCustomer={idCustomer} />
  </Elements>
);

export default CheckoutButton;