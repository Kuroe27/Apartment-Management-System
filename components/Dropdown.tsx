"use client";
import React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

const Dropdown = ({ items, name, value, label }) => {
  return (
    <>
      <Autocomplete label="Select a status" name={name} className="max-w-xs">
        {items.map((item) => (
          <AutocompleteItem key={item[value]} value={item[value]}>
            {String(item[label])}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </>
  );
};

export default Dropdown;
