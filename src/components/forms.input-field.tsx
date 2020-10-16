import React, { InputHTMLAttributes } from "react";
import { Field, Form, Formik, useField } from "formik";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from "@chakra-ui/core";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  isRequired?: boolean;
  label: string;
  name: string;
  placeholder: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  isRequired = false,
  label,
  name,
  placeholder,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField({ name });
  return (
    <FormControl isRequired={props.isRequired} isInvalid={!!error}>
      {props.type === "hidden" ? null : (
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
      )}
      <Input {...field} {...props} id={field.name} placeholder={placeholder} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};
