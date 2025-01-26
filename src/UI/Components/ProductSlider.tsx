import React, { useState, useEffect } from "react";
import ProductCards from "./ProductCards";
import { Typographie } from "../Design-System/Typographie";
import { Button } from "../Design-System/Button";

type Category = {
    id: number;
    name: string;
};

type Product = {
    id: number;
    category: Category; // Un seul objet Category
    name: string;
    price: number;
    quantity: number;
    categoryId: number;
    images: Image[]
};

type Image = {
    id: number;
    src: string;
}

const ProductSlider = () => {
    const [chosenCat, setChosenCat] = useState("all");
    const [categories, setCategories] = useState<string[]>([]);

    const PRODUCT_URL = `/api/products`;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(PRODUCT_URL);

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data: Product[] = await res.json();

                // Collecter les noms uniques des catégories
                const uniqueCategories = new Set<string>();

                data.forEach((product) => {
                    if (product.category && product.category.name) {
                        uniqueCategories.add(product.category.name);
                    }
                });

                setCategories(Array.from(uniqueCategories)); // Convertir le Set en tableau
            } catch (e) {
                console.error("Erreur lors de la récupération des produits :", e);
            }
        };

        fetchProduct();
    }, []);

    return (
        <div className="container">
            <div className="flex items-center flex-wrap gap-4 w-full justify-between mt-[47px] mb-[55px]">
                <Typographie variant="h3" className="uppercase" font="cooper">
                    • Le catalogue •
                </Typographie>
                <div className="flex items-center gap-[10px] overflow-x-scroll flex-row-reverse ">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            onClick={() => setChosenCat(category)}
                            variant={chosenCat === category ? "accent" : "outline"}
                        >
                            {category}
                        </Button>
                    ))}
                    <Button
                        onClick={() => setChosenCat("all")}
                        variant={chosenCat === "all" ? "accent" : "outline"}
                    >
                        Tous
                    </Button>
                </div>
            </div>
            <div className="w-full mb-[30px] grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 md:gap-[30px] gap-[15px]">
                <ProductCards chosenCat={chosenCat} />
            </div>
        </div>
    );
};

export default ProductSlider;
