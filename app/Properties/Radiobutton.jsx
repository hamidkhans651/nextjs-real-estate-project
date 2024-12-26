import React from "react";
import {Listbox, ListboxItem, RadioGroup, Radio} from "@nextui-org/react";

export default function  Radiobutto() {
  const [selectedVariant, setSelectedVariant] = React.useState("solid")
  const [selectedColor, setSelectedColor] = React.useState("default")

  const variants = ["1 bed", "2 bed",];
  const colors = ["default", "primary", "secondary", "success", "warning", "danger"];

  return (
    <div className="flex flex-col gap-4">
   
      <div className="flex flex-col gap-2">
        <RadioGroup
          label="Select bedrooms "
          orientation="horizontal"
          color={selectedVariant}
          defaultValue="solid"
          onValueChange={setSelectedVariant}
        >
          {variants.map((variant) => (
            <Radio key={variant} value={variant} className="capitalize">
              {variant}
            </Radio>
          ))}
        </RadioGroup>

      </div> 
    </div>
  );
}
