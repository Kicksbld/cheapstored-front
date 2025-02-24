import React, { useState } from "react";
import { Typographie } from "../Design-System/Typographie";
import { Input } from "../Design-System/Input";
import { Button } from "../Design-System/Button";
import bcrypt from "bcryptjs"; // Change to bcrypt

const ModifyProfileInfo = ({
  setModifyProfileInfo,
  id,
  infoToModify,
}: {
  setModifyProfileInfo: (value: boolean) => void;
  infoToModify: string;
  id: number;
}) => {
  const key =
    infoToModify === "Nom"
      ? "name"
      : infoToModify === "Email"
      ? "email"
      : infoToModify === "Mot de passe"
      ? "password"
      : infoToModify === "Adresse de Facturation"
      ? "adress"
      : infoToModify === "Code postal"
      ? "postal"
      : infoToModify === "Ville"
      ? "city"
      : "";
  const [formData, setFormData] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let valueToSend = formData;
      if (infoToModify === "Mot de passe") {
        // Use bcrypt instead of JWT
        valueToSend = await bcrypt.hash(formData, 10);
      }

      const requestBody = {
        [key]: valueToSend,
        id: id,
      };

      const response = await fetch("/api/customer", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update");
      }

      console.log("Success:", data);
      setModifyProfileInfo(false);

      // Update localStorage with new data
      const storedData = localStorage.getItem("userConnectedData");
      if (storedData) {
        const userData = JSON.parse(storedData);
        const updatedData = { ...userData, [key]: valueToSend };
        localStorage.setItem("userConnectedData", JSON.stringify(updatedData));
        window.location.reload(); // Refresh to show updated data
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update. Please try again.");
    }
  };

  return (
    <>
      <div onClick={() => setModifyProfileInfo(false)} className="fixed top-0 left-0 w-full h-full bg-black/50"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center">
        <div className="md:w-[500px] w-[70vw] p-[20px] bg-white rounded-lg">
          <form
            onSubmit={handleSubmit}
            className="space-y-[30px] w-full flex items-center flex-col"
          >
            <div className="space-y-[8px] w-full">
              <Typographie variant="h3" font="ambit">
                {infoToModify} <span className="text-red">*</span>
              </Typographie>
              <Input
                required
                placeholder={`Enter votre ${infoToModify}`}
                onChange={(e) => setFormData(e.target.value)}
              />
            </div>
            <Button type="submit" variant="filled" className="w-full">
              Modifier
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ModifyProfileInfo;
