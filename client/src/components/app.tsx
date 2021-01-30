import React, { useEffect } from "react";
import { useExamplesAPI } from "../hooks";

export const App = (): JSX.Element => {
  const { examples, getExamples, addExample, deleteExample } = useExamplesAPI();

  useEffect(() => {
    getExamples();
  }, []);

  return (
    <div>
      <ul>
        {examples.map((example: Example) => (
          <li>
            {`${example.foo} - ${example.bar}`}
          </li>
        ))}
      </ul>
    </div>
  );
};
