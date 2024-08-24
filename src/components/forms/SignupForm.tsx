"use client";

import { useFormState } from "react-dom";
import Link from "next/link";

import { signup } from "~/actions/Authentication";
import FormErrorMessage from "./FormErrorMessage";
import { useSession } from "../providers/Session.provider";
import { redirect } from "next/navigation";

export default function SignupForm() {
  const { user } = useSession();
  console.log(user);

  if (user) {
    return redirect("/");
  }
  const initialState = {
    message: "",
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [fromState, fromAction] = useFormState(signup, initialState);

  return (
    <form className=" grid grid-flow-row space-y-5 text-xl" action={fromAction}>
      <h1 className="text-3xl font-semibold">Create an account</h1>
      <label htmlFor="username">
        Username:
        <input
          className="border-indigo-400 ring-2 ring-indigo-700/border-indigo-400 w-full rounded-md text-2xl px-3 py-1.5 "
          name="username"
          id="username"
        />
      </label>

      <label htmlFor="password">
        Password:
        <input
          className="border-indigo-400 ring-2 ring-indigo-700/border-indigo-400 w-full rounded-md text-2xl px-3 py-1.5 "
          type="password"
          name="password"
          id="password"
        />
      </label>

      <div className="flex justify-end">
        <Link className=" text-base  hover:text-indigo-700" href={"/signin"}>
          Already Have An Account?
        </Link>
      </div>

      <button className="bg-indigo-600 text-indigo-50 font-semibold px-4 py-2 rounded-md hover:bg-indigo-500 transition-all">
        Continue
      </button>

      <FormErrorMessage message={fromState?.message || ""} />
    </form>
  );
}
