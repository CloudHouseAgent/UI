import React from "react";
import { Chirie } from "../_components/Chirie";
import { getChirii } from "@/lib/actions";

export default async function Page() {
  const chirii = await getChirii();

  if (chirii.length === 0) {
    return <div>loading...</div>;
  }

  return (
    <>
      {
        chirii.map((chirie) => {
          return <Chirie chirie={chirie} key={chirie.id} />;
        })
      }
    </>
  );
}