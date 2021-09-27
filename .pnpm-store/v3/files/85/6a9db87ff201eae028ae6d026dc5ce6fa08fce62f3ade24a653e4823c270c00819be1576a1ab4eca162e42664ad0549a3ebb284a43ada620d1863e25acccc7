import * as React from "react";
import { Input } from "reakit/Input";
import { Button } from "reakit/Button";

export default function InputWithPasswordToggle() {
  const [inputType, setInputType] = React.useState("password");

  const buttonText = inputType === "password" ? "Show" : "Hide";

  const handleToggle = () => {
    setInputType((prevInputType) =>
      prevInputType === "password" ? "text" : "password"
    );
  };

  return (
    <>
      <link
        href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <label
        className="block text-sm font-bold text-gray-700 mb-2"
        htmlFor="password"
      >
        Password
      </label>
      <div className="relative h-10 max-w-sm">
        <Input
          id="password"
          name="password"
          className="rounded border border-gray-400 h-full w-full pl-2 pr-20 focus:outline-none focus:shadow-outline focus:border-blue-600"
          placeholder="Enter password"
          type={inputType}
        />
        <div className="absolute top-0 right-0 bottom-0 flex items-center pr-2">
          <Button
            onClick={handleToggle}
            className="text-xs rounded bg-gray-300 font-medium h-6 px-4 border border-transparent focus:outline-none focus:shadow-outline focus:border-blue-600"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </>
  );
}
