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

export default function EmailCreate() {
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
      return axios.post("api/emails/create", newRecord);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
      location.reload();
      reset();
      router.push("/sendemails");
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
           

              <select
                {...register("enterprise", { required: true })}
                defaultValue="=== กรุณาเลือก ==="
                className="input-warning w-full max-w-xs p-5 text-gray-500"
              >
                <option value="บริษัท อาร์เอส มัลติมีเดีย จำกัด">
                  บริษัท อาร์เอส มัลติมีเดีย จำกัด
                </option>
                <option value="บริษัท บีอีซี-มัลติมีเดีย จำกัด">
                  บริษัท บีอีซี-มัลติมีเดีย จำกัด
                </option>
                <option value="บริษัท เจเดเอ็น เบสท์ ไลพี จำกัด">
                  บริษัท เจเคเอ็น เบสท์ ไลพี จำกัด
                </option>
                <option value="สถานีวิทยุโทรทัศน์กองทัพบก">
                  สถานีวิทยุโทรทัศน์กองทัพบก
                </option>
                <option value="สถานีวิทยุโทรทัศน์กองทัพบก">
                  บริษัท อสมท จำกัด มหาชน
                </option>
                <option value="สถานีวิทยุโทรทัศน์กองทัพบก">
                  สถานีโทรทัศน์ไทยพีบีเอส
                </option>
                <option value="สถานีวิทยุโทรทัศน์กองทัพบก">
                สถานีโทรทัศน์ ALTV
                </option>
                <option value="กรมประชาสัมพันธ์">กรมประชาสัมพันธ์</option>
              </select>
              {errors.enterprise && <span>This field is required</span>}

              <Input
                id="customers"
                placeholder="ชื่อลูกค้า"
                {...register("customers", { required: true })}
              />
              {errors.customers && (
                <span className="text-red-500">This field is required</span>
              )}
              <Input
                id="telphone"
                placeholder="เบอร์โทร"
                {...register("telphone", { required: true })}
              />
              {errors.telphone && (
                <span className="text-red-500">This field is required</span>
              )}
              <Input
                id="emails"
                placeholder="อีเมล์"
                {...register("emails", { required: true })}
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
