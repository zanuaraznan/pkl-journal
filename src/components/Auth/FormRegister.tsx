"use client";
import { SignUpCredentials } from "@/lib/actions";
import React, { useActionState } from "react";
import { ButtonSubmit } from "../Form/ButtonSubmit";
import { fieldRegisterList } from "@/components/Form/FormData";
import { ErrorMessage, FormInput } from "@/components/Form/FormComponents";
import { createPortal } from "react-dom";

export default function FormRegister() {
  const [state, formAction] = useActionState(SignUpCredentials, null);

  const firstErrorField = state?.error ? Object.keys(state.error)[0] : null;
  const firstErrorMessage =
    firstErrorField && state?.error
      ? state?.error[firstErrorField as keyof typeof state.error]?.[0]
      : "";

  return (
    <form action={formAction} className="w-full flex flex-col gap-4">
      {state && state.message ? (
        <ErrorMessage
          className="w-full text-center bg-red-500/10 rounded-lg p-2"
          text={state?.message}
        />
      ) : null}

      <div className="bg-neutral-100 p-4 rounded-lg flex flex-col gap-2">
        {fieldRegisterList.map((item, idx) => (
          <React.Fragment key={idx}>
            <FormInput
              type={item.type}
              name={item.name}
              placeholder={item.placeholder}
            />
          </React.Fragment>
        ))}
        {firstErrorField &&
          createPortal(
            <ErrorMessage text={firstErrorMessage} />,
            document.getElementById(`${firstErrorField}Container`)!
          )}
      </div>
      <ButtonSubmit text="Daftar" />
    </form>
  );
}
