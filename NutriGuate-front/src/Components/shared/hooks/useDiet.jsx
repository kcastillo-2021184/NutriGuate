import { useEffect, useState } from "react";
import axios from "axios";

export const useDiet = () => {
  const [diets, setDiets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getToken = () => localStorage.getItem("token");

  const fetchDiets = async () => {
    try {
      const token = getToken();
      const res = await axios.get("http://localhost:3616/v1/diet/getDiets", {
        headers: {
          Authorization: token
        }
      });
      setDiets(res.data.data || []);
    } catch (error) {
      console.error("Error fetching diets", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createDietPlan = async (formData) => {
    try {
      const token = getToken();
      const res = await axios.post("http://localhost:3616/v1/diet/create", formData, {
        headers: {
          Authorization: token
        }
      });
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error al crear la dieta");
    }
  };

  useEffect(() => {
    fetchDiets();
  }, []);

  return { diets, isLoading, createDietPlan };
};