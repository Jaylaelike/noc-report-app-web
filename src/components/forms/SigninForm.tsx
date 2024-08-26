"use client";
import { useFormState } from "react-dom";
import Link from "next/link";

import { signin } from "~/actions/Authentication";
import FormErrorMessage from "./FormErrorMessage";

import { redirect } from "next/navigation";
import { useSession } from "../providers/Session.provider";

export default function SigninForm() {
  const { user } = useSession();
  console.log(user);

  if (user) {
    return redirect("/");
  }

  const initialState = {
    message: "",
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [fromState, fromAction] = useFormState(signin, initialState);
  return (
    <form className="grid grid-flow-row space-y-5 text-xl" action={fromAction}>
      <div className="grid grid-cols-1 justify-items-center">
      <h1>NOC Operation Report</h1>
      <br />
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
            <img src="https://res.cloudinary.com/satjay/image/upload/v1705293483/ptzmq3vg2zb4i9wqi8xy.jpg" />
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-semibold">Sign In</h1>
      <label htmlFor="username">
        Username:
        <input
          className="ring-indigo-700/border-indigo-400 w-full rounded-md border-indigo-400 px-3 py-1.5 text-2xl ring-2"
          name="username"
          id="username"
        />
      </label>

      <label htmlFor="password">
        Password:
        <input
          className="ring-indigo-700/border-indigo-400 w-full rounded-md border-indigo-400 px-3 py-1.5 text-2xl ring-2"
          type="password"
          name="password"
          id="password"
        />
      </label>
      <div className="flex justify-end">
        <Link className="text-base hover:text-indigo-700" href={"/signup"}>
          Don&apos;t have an account?
        </Link>
      </div>
      <button className="rounded-md bg-indigo-600 px-4 py-2 font-semibold text-indigo-50 transition-all hover:bg-indigo-500">
        Continue
      </button>
      <FormErrorMessage message={fromState?.message || ""} />
    </form>
  );
}
