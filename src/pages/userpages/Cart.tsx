import CartProducts from "@/UI/Components/CartProducts";
import NavBar from "@/UI/Components/navigation/NavBar";
import { Button } from "@/UI/Design-System/Button";
import { Typographie } from "@/UI/Design-System/Typographie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface Product {
  productName: string;
  productPrice: number;
  quantity: number;
}

const Cart = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/userpages/CheckOut");
  };

  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const cartStorage = localStorage.getItem("cart");

      if (cartStorage) {
        try {
          const parsedCart = JSON.parse(cartStorage);
          if (Array.isArray(parsedCart)) {
            setCart(parsedCart);
          } else {
            console.error("Le panier dans localStorage est mal formaté.");
          }
        } catch (e) {
          console.error(
            "Erreur lors du parsing du panier depuis localStorage.",
            e
          );
        }
      }
    }
  }, []);

  const removeProduct = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);

    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const changeQuantity = (index: number, delta: number) => {
    // Prevent quantity from going below 1
    const updatedCart = cart.map((product, i) =>
      i === index
        ? {
            ...product,
            quantity: Math.max(product.quantity + delta, 1), // Ensure quantity is at least 1
          }
        : product
    );
    setCart(updatedCart);

    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  // Calculate the total price of the cart
  const getSubtotal = () => {
    return cart.reduce(
      (total, product) => total + product.productPrice * product.quantity,
      0
    );
  };

  const deliveryCost = 0; // Static delivery cost
  const taxes = 5.49; // Fixed taxes

  // Calculate total TTC (Including subtotal, delivery cost, and taxes)
  const getTotalTTC = () => {
    return getSubtotal() + deliveryCost + taxes;
  };

  return (
    <div className="container">
      <NavBar />
      <div className="mt-12 md:mt-[100px] flex flex-col lg:flex-row justify-between gap-[100px] page-container">
        <div className="space-y-[35px] flex-[2]">
          <Typographie font="cooper" variant="h2">
            Détail de votre Panier
          </Typographie>
          <div className="space-y-[15px]">
            {cart.length > 0 ? (
              cart.map((product, index) => (
                <CartProducts
                  key={index}
                  index={index} // Pass index to CartProducts
                  name={product.productName}
                  price={product.productPrice}
                  quantity={product.quantity}
                  onDelete={removeProduct} // Pass the removeProduct function
                  onQuantityChange={changeQuantity} // Pass the changeQuantity function
                />
              ))
            ) : (
              <Typographie variant="body-sm" theme="grey" font="ambit">
                Aucun produit dans le panier.
              </Typographie>
            )}
          </div>
        </div>

        {/* Summary section */}
        {cart.length > 0 ? (
          <div className="space-y-[35px] flex-1">
            <Typographie font="cooper" variant="h2">
              Récapitulatif
            </Typographie>
            <div className="space-y-[15px]">
              <div className="border border-cloud rounded-[10px] p-[20px] bg-light space-y-[15px]">
                <div className="flex justify-between items-center ">
                  <Typographie font="ambit" variant="body-sm">
                    Code activé
                  </Typographie>
                  <div className="w-max rounded-[5px] border border-[#A8F3D0] bg-[#D1FAE5] px-[7px] py-[2px]">
                    <Typographie theme="green" font="ambit" variant="body-sm">
                      NOEL20
                    </Typographie>
                  </div>
                </div>
                <Button size="large" className="w-full" variant="outline">
                  modifier code de promotion
                </Button>
              </div>
              <div className="p-[20px] border border-cloud bg-light rounded-[10px]">
                <div className="space-y-[20px] w-full">
                  <div className="flex justify-between items-center ">
                    <Typographie font="ambit" variant="body-sm">
                      Sous-total
                    </Typographie>
                    <Typographie font="ambit" variant="body-sm">
                      {getSubtotal()} €
                    </Typographie>
                  </div>
                  <div className="flex justify-between items-center">
                    <Typographie font="ambit" variant="body-sm">
                      Livraison
                    </Typographie>
                    <Typographie font="ambit" variant="body-sm">
                      {deliveryCost.toFixed(2)} €
                    </Typographie>
                  </div>
                  <div className="flex justify-between items-center">
                    <Typographie font="ambit" variant="body-sm">
                      Frais de service & Taxes
                    </Typographie>
                    <Typographie font="ambit" variant="body-sm">
                      {taxes.toFixed(2)} €
                    </Typographie>
                  </div>
                  <hr className="border border-cloud w-full" />
                  <div className="flex justify-between items-center">
                    <Typographie font="ambit" variant="body-sm">
                      Total TTC
                    </Typographie>
                    <Typographie font="ambit" variant="body-sm">
                      {getTotalTTC().toFixed(2)} €
                    </Typographie>
                  </div>
                  <hr className="border border-cloud w-full" />
                  <Button
                    onClick={handleClick}
                    size="large"
                    className="w-full"
                    variant="filled"
                  >
                    Continuer - {getTotalTTC().toFixed(2)} €
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-[35px] flex-1">
            <Typographie font="cooper" variant="h2">
              Récapitulatif
            </Typographie>
            <Typographie variant="body-sm" theme="grey" font="ambit">
                Aucun Résumé de commande.
              </Typographie>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
