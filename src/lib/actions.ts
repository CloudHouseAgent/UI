"use server";

import { ChirieType } from "@/types/chirie";
import { auth } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";
import axios from "axios";
import { redirect } from "next/navigation";

const API_URL = process.env.REST_API_URL;

export async function getChirii(detaliiChirii: string, numarChirii: number) {
  const query = new URLSearchParams();
  query.append("detaliiChirii", detaliiChirii);
  query.append("numarChirii", numarChirii.toString());

  const response = await fetch(`${API_URL}/chirii?${query.toString()}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    next: {
      tags: ["chirii"],
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Eroare la preluarea chirii");
  }

  const json = (await response.json()) as ChirieType[];
  return json;
}

export async function getChiriileMele() {
  const { getToken } = auth();
  const token = await getToken();

  const response = await fetch(`${API_URL}/chirii/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
    next: {
      tags: ["chirii"],
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Eroare la preluarea chirii");
  }

  return (await response.json()) as ChirieType[];
}

export async function createChirie(formData: FormData) {
  const { getToken } = auth();
  const token = await getToken();

  console.log("Creating chiria", formData);

  const response = await axios.post(`${API_URL}/chirii`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  if (response.status !== 200) {
    console.log(response);
    throw new Error("Eroare la crearea chirii");
  }

  revalidateTag("chirii");
  redirect("/dashboard");
}

export async function deleteChirieById(id: string) {
  const { getToken } = auth();
  const token = await getToken();

  console.log("Deleting chiria with id", id);

  const response = await fetch(`${API_URL}/chirii/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Eroare la stergere chirii");
  }

  revalidateTag("chirii");

  console.log(response);
}

export async function getChirieById(id: string) {
  const response = await fetch(`${API_URL}/chirii/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    next: {
      tags: ["chirii"],
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Eroare la preluarea chirii");
  }

  return (await response.json()) as ChirieType;
}

export async function getChirieDescriptionFromParams(data: any) {
  const { getToken } = auth();
  const token = await getToken();

  //console.log(data);
  const response = await axios.post(`${API_URL}/chirii/description`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    console.log(response);
    throw new Error("Eroare la preluarea descrierii chirii");
  }

  return response.data;
}
