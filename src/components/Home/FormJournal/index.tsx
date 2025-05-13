"use client";
import { ButtonSubmit } from "@/components/Form/ButtonSubmit";
import { ErrorMessage, FormInput } from "@/components/Form/FormComponents";
import { fieldJournalList } from "@/components/Form/FormData";
import { JournalActionForm } from "@/lib/actions";
import { Calendar } from "lucide-react";
import React, { useActionState } from "react";
import { createPortal } from "react-dom";

export default function JournalForm() {
  const [state, formAction] = useActionState(JournalActionForm, null);

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
        {fieldJournalList.map((item, idx) => (
          <FormInput
            key={idx}
            type={item.type}
            name={item.name}
            placeholder={item.placeholder}
          />
        ))}
        {firstErrorField &&
          createPortal(
            <ErrorMessage text={firstErrorMessage} />,
            document.getElementById(`${firstErrorField}Container`)!
          )}
      </div>
      <ButtonSubmit text="Login" />
    </form>
  );
}
