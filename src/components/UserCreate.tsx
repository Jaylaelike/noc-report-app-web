/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/4XWYV3I282Y
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";

import { Button } from "~/components/ui/button";

import { useForm, SubmitHandler } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

import axios from "axios";
import { useState } from "react";

interface CreatUsers {
  username_reporter: string;
}

export default function UserCreate() {
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
      return axios.post("api/user_reporters/create", newRecord);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
      location.reload();
      reset();
      router.push("/usersettings");
    },
  });

  return (
    <form onSubmit={handleSubmit(handleCreatRecords)} className="space-y-4">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>เพิ่มผู้ใช้งาน</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Name</Label>
              <Input
                id="username_reporter"
                placeholder="ชื่อ-นามสกุล"
                {...register("username_reporter", { required: true })}
              />
              {errors.username_reporter && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {isSubmitting && <span>Submitting...</span>}
          {isPending && <span>Submitting...</span>}

          {!isSubmitting && (
            <Button
              type="submit"
              className="ml-auto"
              disabled={isPending}
              {...(isSubmitting ? "Submitting..." : "Submit")}
            >
              Submit
            </Button>
          )}
        </CardFooter>
      </Card>
    </form>
  );
}
