import { ChirieType } from "@/types/chirie";
import axios from "axios";

const API_URL = "https://agent-vanzari-ai-api.azurewebsites.net";

export async function getChirii() {
  const response = await axios.get<ChirieType[]>(`${API_URL}/chirii`);
  return response.data;
}

export async function getChirieById(id: string) {
  const response = await axios.get<ChirieType>(`${API_URL}/chirii/${id}`);
  return response.data;
}
