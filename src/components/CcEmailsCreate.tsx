"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "~/components/ui/card";

import { Input } from "~/components/ui/input";

import { useForm, SubmitHandler } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

import axios from "axios";
import { useState } from "react";

interface CreatUsers {
  customers_cc: string;
  emails_cc: string;
}

export default function CCEmailCreate() {
  // Using react-hook-form to manage form state and submission
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreatRecords: SubmitHandler<CreatUsers> = async (data) => {
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // If submission is successful or you need to allow re-submission, reset the state
    } catch (error) {
      console.error(error);
    }

    // Re-enable the button after form processing
    setIsSubmitting(false);
    createRecords(data);
  };

  const router = useRouter();

  const { mutate: createRecords, isPending } = useMutation({
    mutationFn: (newRecord: CreatUsers) => {
      return axios.post("api/sendcc/create", newRecord);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
      location.reload();
      reset();
      router.push("/ccsetings");
    },
  });

  return (
    <form onSubmit={handleSubmit(handleCreatRecords)} className="space-y-4">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>เพิ่ม Emails </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input
                id="customers_cc"
                placeholder="ชื่อ"
                {...register("customers_cc", { required: true })}
              />
              {errors.customers && (
                <span className="text-red-500">This field is required</span>
              )}

              <Input
                id="emails_cc"
                placeholder="อีเมล์"
                {...register("emails_cc", { required: true })}
              />
              {errors.emails && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {isSubmitting && <span>Submitting...</span>}
          {isPending && <span>Submitting...</span>}

          {!isSubmitting && (
            <button
              type="submit"
              className="btn btn-success"
              disabled={isPending}
              {...(isSubmitting ? "Submitting..." : "Submit")}
            >
              Submit
            </button>
          )}
        </CardFooter>
      </Card>
    </form>
  );
}
