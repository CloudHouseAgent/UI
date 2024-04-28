import React from "react";
import { Chirie } from "../_components/Chirie";

export default function Page() {
  return (
    <>
      {
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
          <Chirie key={index} />
        ))
      }
    </>
  );
}