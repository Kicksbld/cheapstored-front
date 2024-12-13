import React, { useEffect, useState } from "react";
import { Typographie } from "../Design-System/Typographie";
import Image from "next/image";

// Définition des types
type Product = {
  id: number;
  name: string;
  price: number;
};

type Error = {
  message: string;
};

const ProductCards: React.FC = () => {
  const PRODUCT_URL = "/api/products";

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [table, setTable] = useState<Product[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(PRODUCT_URL);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Product[] = await res.json();
        setTable(data);
      } catch (e) {
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex gap-4">
      {table.map((product) => (
        <div
          key={product.id}
          className="flex flex-col justify-center  p-[20px] cursor-pointer bg-light w-max gap-[20px] max-w-[313px] rounded-[10px]"
        >
          <Image src="/img/png/airpod.png" alt="Product Image" width={230} height={230} />
          <div className="space-y-[20px]">
            <div className="space-y-[6px]">
              <Typographie
                font="ambit"
                weight="bold"
                theme="secondary"
                variant="body-xs"
              >
                Livraison gratuite
              </Typographie>
              <Typographie
                font="ambit"
                weight="semibold"
                theme="primary"
                variant="body-sm"
              >
                {product.name}
              </Typographie>
            </div>
            <hr className="border-cloud" />
            <div>
              <Typographie font="ambit" className="text-black/60" variant="body-sm">
                A partir
              </Typographie>
              <Typographie
                font="ambit"
                weight="semibold"
                theme="dark"
                variant="body-xs"
              >
                {product.price} €
              </Typographie>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
