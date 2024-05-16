"use client";

import { Input } from "@nextui-org/react";
import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface IFormInput {
  firstName: string;
}

const TestForm = () => {
  const [myValues, setMyValues] = useState({
    firstName: "my first name",
  });
  const { control, handleSubmit } = useForm({
    defaultValues: myValues,
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // console.log(data);
  };

  return (
    <>
      <button
        onClick={() => {
            console.log("change clicked")
          setMyValues({ firstName: "mim" });
        }}
      >
        change value
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => <Input {...field} value={field.value || myValues.firstName}/>}
        />

        <input type="submit" />
      </form>
    </>
  );
};
export default TestForm;
