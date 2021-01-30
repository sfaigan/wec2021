import axios, { AxiosResponse } from "axios";
import { Example, ExampleAdd, ExampleUpdate } from "./types";
import { useState } from "react";

const BASE_PATH = "/api/examples";

interface UseExamplesHook {
  examples: Example[];
  getExamples: () => Promise<void>;
  addExample: (example: ExampleAdd) => Promise<void>;
  updateExample: (exampleId: string, update: ExampleUpdate) => Promise<void>;
  deleteExample: (exampleId: string) => Promise<void>;
}

export const useExamplesAPI = (): UseExamplesHook => {
  const [examples, setExamples] = useState<Example[]>([]);

  const getExamples = async () => {
    try {
      const res: AxiosResponse<Example[]> = await axios.get(BASE_PATH);
      setExamples(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addExample = async (example: ExampleAdd) => {
    try {
      await axios.post(BASE_PATH, example);
      getExamples();
    } catch (err) {
      console.log(err);
    }
  };

  const updateExample = async (exampleId: string, update: ExampleUpdate) => {
    try {
      await axios.put(BASE_PATH + "/exampleId", update);
      getExamples();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteExample = async (exampleId: string) => {
    try {
      await axios.delete(`${BASE_PATH}/${exampleId}`);
      getExamples();
    } catch (err) {
      console.log(err);
    }
  };

  return { examples, getExamples, addExample, updateExample, deleteExample };
};
