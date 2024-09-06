"use client";
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useSession } from "~/components/providers/Session.provider";

import { Toaster, toast } from "sonner";

import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { useQueries } from "@tanstack/react-query";
import axios from "axios";

import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";

import { redirect, useRouter } from "next/navigation";
import { DatetimeFsp } from "drizzle-orm/mysql-core/columns/datetime";

import dayjs from "dayjs";

import { FaLine } from "react-icons/fa";


import { createRef } from "react";
// import emailjs from "@emailjs/browser";

// eslint-disable-next-line react-hooks/rules-of-hooks
const form = createRef();

interface StationData {
  Engineering_center: string;
  Station: string;
  Status: string;
  ip: string;
  Transmistion_Brand: string;
  No: string;
  Facility: string;
  Station_Eng: string;
  Station_Thai: string;
  Station_Type: string;
  Eng_No: number;
}

interface CreatData {
  Site: string;
  FacilityProvider: string;
  EngineeringCenter: string;
  PostingDate: DatetimeFsp;
  DowntimeStart: DatetimeFsp;
  DowntimeEnd: DatetimeFsp;
  DowntimeTotal: string;
  Detail: string;
  JobTickets: string;
  Reporter: string;
  Approver: string;
  Remark: string;
}

interface SendCEmail {
  customers_cc: string;
  enterprise_cc: string;
  emails_cc: string;
  telphone_cc: string;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MainForm() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [personNameCc, setPersonNameCc] = React.useState<string[]>([]);

  const [startTime, setStartTime] = React.useState<string>("");
  const [endTime, setEndTime] = React.useState<string>("");
  const [duration, setDuration] = React.useState<string>("");

  const [detailMessage, setDetailMessage] = React.useState<string>("");

  console.log(`emailsData`, personName);
  console.log(`cCemailsData`, personNameCc);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  const handleChangeCc = (event: SelectChangeEvent<typeof setPersonNameCc>) => {
    const {
      target: { value },
    } = event;
    setPersonNameCc(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  const calculateDuration = (start: string, end: string) => {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diff = endDate.getTime() - startDate.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setDuration(`${hours}h ${minutes}m  ${seconds}s`);
    } else {
      setDuration("");
    }
  };

  React.useEffect(() => {
    calculateDuration(startTime, endTime);
  }, [startTime, endTime]);

  console.log("startTime", startTime);
  console.log("endTime", endTime);

  // const calculateDuration = (start: string, end: string) => {
  //   if (start && end) {
  //     const startDate = new Date(start);
  //     const endDate = new Date(end);
  //     const diff = endDate.getTime() - startDate.getTime();

  //     const hours = Math.floor(diff / (1000 * 60 * 60));
  //     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  //     const seconds = (diff % (1000 * 60)) / 1000;

  //     const formattedHours = String(hours).padStart(2, '0');
  //     const formattedMinutes = String(minutes).padStart(2, '0');
  //     const formattedSeconds = seconds.toFixed(3).padStart(6, '0');

  //     setDuration(`${formattedHours}:${formattedMinutes}:${formattedSeconds}`);
  //   } else {
  //     setDuration("");
  //   }
  // };

  // React.useEffect(() => {
  //   calculateDuration(startTime, endTime);
  // }, [startTime, endTime]);

  //create state for select station name
  const [stationName, setStationName] = React.useState<string>("กรุงเทพ");
  const [userReports, setUserReports] = React.useState<string>("กรุณาเลือก");

  const [staTionData, staTionNames, emailsData, reporterUsers, cCemailsData] =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQueries({
      queries: [
        {
          queryKey: ["station", stationName],
          queryFn: (): Promise<StationData> =>
            axios.get(process.env.NEXT_PUBLIC_SERVER_STATION + stationName),
        },
        {
          queryKey: ["stationNames", stationName],
          queryFn: (): Promise<StationData> =>
            axios.get(process.env.NEXT_PUBLIC_SERVER_STATION + "all"),
        },
        {
          queryKey: ["emails"],
          queryFn: (): Promise<StationData> => axios.get(`/api/emails`),
        },
        {
          queryKey: ["users"],
          queryFn: (): Promise<StationData> => axios.get(`/api/user_reporters`),
        },
        {
          queryKey: ["cCemails"],
          queryFn: (): Promise<SendCEmail> => axios.get(`/api/sendcc`),
        },
      ],
    });

  // const isQueriesLoaded = staTionData.isLoading;

  // Using react-hook-form to manage form state and submission
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  //create state for send line notify
  const [sendLineNotify, setLineNotify] = React.useState<boolean>(false);

  //create function for send email with EmailJS
  const [sendEmail, setEmail] = React.useState<boolean>(false);

  const handleCreatRecords: SubmitHandler<CreatData> = async (data) => {
    // To change the format of the date when submitting the form
    (data.DowntimeStart = dayjs(data.DowntimeStart).format(
      "YYYY-MM-DD HH:mm:ss",
    )),
      (data.DowntimeEnd = dayjs(data.DowntimeEnd).format(
        "YYYY-MM-DD HH:mm:ss",
      ));

    if (sendLineNotify) {
      try {
        const message = `
      Hi, ${user.username} ส่งข้อมูล Downtime มาให้ตรวจสอบ
      แจ้งแหตุขัดข้องในการให้บริการฯ
      วันที่เกิดเหตุ : ${dayjs(data.DowntimeStart).format("DD-MM-YYYY")}
      Station: ${stationName}
      FacilityProvider: ${staTionData?.data?.data[0].Facility}
      EngineeringCenter: ${staTionData?.data?.data[0].Engineering_center}
      DowntimeStart: ${dayjs(data.DowntimeStart).format("DD-MM-YYYY HH:mm:ss")}
      DowntimeEnd: ${dayjs(data.DowntimeEnd).format("DD-MM-YYYY HH:mm:ss")}
      DowntimeTotal: ${duration}
      Detail: ${detailMessage}
      JobTickets: ${form.current?.JobTickets.value}
    `;
        await axios.post("/api/line", { message });
      } catch (error) {
        console.error(error);
      }
    }

    if (sendEmail) {
      try {
        await axios.post("api/sendmails", {
          posting_date: dayjs(new Date()).format("DD-MM-YYYY HH:mm:ss"),
          station_name: stationName,
          Facility_name: staTionData?.data?.data[0].Facility,
          detail_data: detailMessage,
          start_time: dayjs(new Date(startTime)).format("DD-MM-YYYY HH:mm:ss"),
          end_time: dayjs(new Date(endTime)).format("DD-MM-YYYY HH:mm:ss"),
          sum_time: duration,
          user_to: personName.map((email) => email),
          cc: personNameCc.map((email) => email),
        });
      } catch (error) {
        console.error(error);
      }

      alert("Please check your email to view the sent message.");
    }

    setIsSubmitting(true);

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

  // const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedStation = e.target.value;
  //   setStationName(selectedStation);
  //   setValue('Site', selectedStation); // Update React Hook Form state

  // };

  // const [isClient, setIsClient] = React.useState(false);

  setValue("EngineeringCenter", staTionData?.data?.data[0].Engineering_center);
  setValue("FacilityProvider", staTionData?.data?.data[0].Facility);
  setValue("DowntimeTotal", duration);

  // React.useEffect(() => {
  //   setIsClient(true);
  // }, []);

  const router = useRouter();

  const {
    mutate: createRecords,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (newRecord: CreatData) => {
      return axios.post("api/main_data/create", newRecord);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
      location.reload();
      reset();
      router.push("/");
    },
  });

  const { user } = useSession();
  // console.log(user);

  if (!user) {
    redirect("/");
  }

  //create finction for send line notify

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLineNotify(event.target.checked);
    setEmail(event.target.checked);
  };

  return (
    <form
      ref={form}
      onSubmit={handleSubmit(handleCreatRecords)}
      className="w-full"
    >
      <div className="container mx-auto my-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Downtime Report Forms</CardTitle>
            <CardDescription>ฟอร์มบันทึกข้อมูล Downtime.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">Station</Label>

                <input
                  type="hidden"
                  name="subject"
                  value={"NOCadmin@thaipbs.or.th"}
                />
                <input type="hidden" name="user_name" value={user.username} />
                <input
                  type="hidden"
                  name="user_email"
                  value={personName.map((email) => email)}
                />
                <input
                  type="hidden"
                  name="posting_date"
                  value={dayjs(new Date()).format("DD-MM-YYYY HH:mm:ss")}
                />
                <input
                  type="hidden"
                  name="start_time"
                  value={dayjs(new Date(startTime)).format(
                    "DD-MM-YYYY HH:mm:ss",
                  )}
                />
                <input
                  type="hidden"
                  name="end_time"
                  value={dayjs(new Date(endTime)).format("DD-MM-YYYY HH:mm:ss")}
                />
                <input type="hidden" name="sum_time" value={duration} />
                <input type="hidden" name="detail_data" value={detailMessage} />

                <input type="hidden" name="station_name" value={stationName} />
                <input
                  type="hidden"
                  name="Facility_name"
                  value={staTionData?.data?.data[0].Facility}
                />

                <input
                  type="hidden"
                  name="user_email_cc"
                  value={personNameCc.map((email) => email)}
                />

                {/* <select
                  {...register("Site")}
                  value={stationName}
                  onChange={ (e) => setStationName(e.target.value)}
                  className="input-warning w-full max-w-xs p-5 text-gray-500"
                >
                  {staTionNames?.data?.data.map((station: any) => (
                    <option
                      key={station.Station_Thai}
                      value={station.Station_Thai}
                    >
                      {station.Station_Thai}
                    </option>
                  ))}
                </select>

                {errors.Site && (
                  <span className="text-red-500">This field is required</span>
                )} */}

                <Controller
                  name="Site"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <select
                      {...field}
                      value={stationName}
                      onChange={(e) => {
                        field.onChange(e);
                        setStationName(e.target.value);
                      }}
                      className="input-warning w-full max-w-xs p-5 text-gray-500"
                    >
                      {staTionNames?.data?.data.map((station: any) => (
                        <option
                          key={station.Station_Thai}
                          value={station.Station_Thai}
                        >
                          {station.Station_Thai}
                        </option>
                      ))}
                    </select>
                  )}
                />

                {errors.Site && (
                  <span className="text-red-500">{errors.Site.message}</span>
                )}
              </div>

              <input
                {...register("PostingDate", { required: true })}
                type="hidden"
                value={dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")}
                className="input input-bordered input-primary w-full max-w-xs p-5 text-gray-500"
              />

              <input
                {...register("Reporter", { required: true })}
                type="hidden"
                value={user.username}
                className="input input-bordered input-primary w-full max-w-xs p-5 text-gray-500"
              />

              <div className="space-y-2">
                <Label htmlFor="FacilityProvider">Facilities Providers</Label>
                <Input
                  {...register("FacilityProvider", { required: true })}
                  placeholder={staTionData?.data?.data[0].Facility}
                />
              </div>
              {errors.FacilityProvider && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="EngineeringCenter">Engineer Center</Label>
              <Input
                {...register("EngineeringCenter", { required: true })}
                placeholder={staTionData?.data?.data[0].Engineering_center}
              />
            </div>
            {errors.EngineeringCenter && (
              <span className="text-red-500">ตรวจทาน EngineeringCenter</span>
            )}

            <div className="grid grid-cols-2 gap-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="space-y-2">
                      <DemoItem>
                        {/* <DateTimePicker
                          label="DowntimeStart"
                          views={["year", "day", "hours", "minutes", "seconds"]}
                          format="DD-MM-YYYY HH:mm:ss"
                          ampm={false}
                          value={dayjs(new Date(startTime))}
                          onChange={(newValue) => {
                            setStartTime(
                              dayjs(newValue).format("YYYY-MM-DDTHH:mm"),
                            );
                          }}
                        /> */}
                        <Controller
                          name="DowntimeStart"
                          control={control}
                          defaultValue={dayjs(new Date(startTime))}
                          render={({ field }) => (
                            <DateTimePicker
                              {...field}
                              label="DowntimeStart"
                              views={[
                                "year",
                                "day",
                                "hours",
                                "minutes",
                                "seconds",
                              ]}
                              format="DD-MM-YYYY HH:mm:ss"
                              ampm={false}
                              value={field.value}
                              onChange={(newValue) => {
                                field.onChange(newValue);
                                setStartTime(
                                  dayjs(newValue).format("YYYY-MM-DDTHH:mm:ss"),
                                );
                              }}
                            />
                          )}
                        />
                      </DemoItem>
                    </div>
                    <div className="space-y-2">
                      <DemoItem>
                        {/* <DateTimePicker
                          label="DowntimeEnd"
                          views={["year", "day", "hours", "minutes", "seconds"]}
                          format="DD-MM-YYYY HH:mm:ss"
                          ampm={false}
                          value={dayjs(new Date(endTime))}
                          onChange={(newValue) => {
                            setEndTime(
                              dayjs(newValue).format("YYYY-MM-DDTHH:mm"),
                            );
                          }}
                        /> */}
                        <Controller
                          name="DowntimeEnd"
                          control={control}
                          defaultValue={dayjs(new Date(endTime))}
                          render={({ field }) => (
                            <DateTimePicker
                              {...field}
                              label="DowntimeEnd"
                              views={[
                                "year",
                                "day",
                                "hours",
                                "minutes",
                                "seconds",
                              ]}
                              format="DD-MM-YYYY HH:mm:ss"
                              ampm={false}
                              value={field.value}
                              onChange={(newValue) => {
                                field.onChange(newValue);
                                setEndTime(
                                  dayjs(newValue).format("YYYY-MM-DDTHH:mm:ss"),
                                );
                              }}
                            />
                          )}
                        />
                      </DemoItem>
                    </div>
                  </div>
                </DemoContainer>
              </LocalizationProvider>

              {/* <div className="space-y-2">
                <Label htmlFor="DowntimeStart">DowntimeStart</Label>
                <Input
                  id="DowntimeStart"
                  {...register("DowntimeStart", { required: true })}
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              {errors.DowntimeStart && (
                <span className="text-red-500">This field is required</span>
              )}
              <div className="space-y-2">
                <Label htmlFor="DowntimeEnd">DowntimeEnd</Label>
                <Input
                  id="DowntimeEnd"
                  {...register("DowntimeEnd", { required: true })}
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
              {errors.DowntimeEnd && (
                <span className="text-red-500">This field is required</span>
              )} */}
            </div>
            <div className="space-y-2">
              <Controller
                name="DowntimeTotal"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input {...field} defaultValue={duration} />
                )}
              />
            </div>
            {errors.DowntimeTotal && (
              <span className="text-red-500">ตรวจทาน DowntimeTotal</span>
            )}

            <div className="space-y-2">
              <Label htmlFor="message">Details</Label>
              <Textarea
                id="Detail"
                {...register("Detail", { required: true })}
                placeholder="Enter your message"
                onChange={(e) => setDetailMessage(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            {errors.Detail && (
              <span className="text-red-500">This field is required</span>
            )}

            {!isSubmitting && (
              <div
                onClick={() => {
                  toast.success("ข้อมูลถูกบันทึกแล้ว", {
                    duration: 3000,
                    richColors: true,
                  });
                }}
              >
                <button
                  type="submit"
                  onClick={() =>
                    (
                      document.getElementById("my_modal_1") as HTMLDialogElement
                    )?.showModal()
                  }
                  className="btn btn-success"
                  disabled={isPending}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
                <Toaster richColors />
              </div>
            )}

            {/* {isClient && (
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <h3 className="text-lg font-bold">
                    ตั้งค่าการส่ง Line Notify หรือ Email
                  </h3>
                  <p className="py-4">อนุมัติให้ส่ง Line Notify หรือ Email?</p>
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
            {/* <div className="form-control">
                        <label className="label cursor-pointer">
                          <FaLine className="h-6 w-6 text-primary" />
                          <span className="label-text">Line Notify</span>
                          <input
                            type="checkbox"
                            defaultChecked={true}
                            disabled
                            onChange={handleCheckboxChange}
                            className="checkbox-accent checkbox"
                          />
                        </label>
                      </div>
                      <button className="btn">ok</button>
                    </form>
                  </div>
                </div>
              </dialog>
            )} */}
          </CardContent>

          {isSuccess && (
            <div
              role="alert"
              className="rounded-xl border border-gray-100 bg-white p-4"
            >
              <div className="flex items-start gap-4">
                <span className="text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>

                <div className="flex-1">
                  <strong className="block font-medium text-gray-900">
                    {" "}
                    Changes saved{" "}
                  </strong>

                  <p className="mt-1 text-sm text-gray-700">
                    ข้อมูลของคุณได้รับการบันทึกเรียบร้อยแล้ว
                  </p>
                </div>

                <button className="text-gray-500 transition hover:text-gray-600">
                  <span className="sr-only">Dismiss popup</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </Card>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Remarks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="Remark">Remarks</Label>
                <Textarea
                  id="Remark"
                  {...register("Remark", { required: true })}
                  placeholder="Enter your message"
                  className="min-h-[100px]"
                />
              </div>
              {errors.Remark && (
                <span className="text-red-500">This field is required</span>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Job Status</CardTitle>

              <select
                defaultValue="=== กรุณาเลือก ==="
                className="input-warning w-full max-w-xs p-5 text-gray-500"
              >
                <option value="open">open</option>
                <option value="close">close</option>
              </select>
            </CardHeader>

            <CardHeader>
              <CardTitle>Tickets ID</CardTitle>
              <Input
                id="JobTickets"
                placeholder="JobTickets NOC: 123456"
                {...register("JobTickets", { required: true })}
              />
            </CardHeader>
            {errors.JobTickets && (
              <span className="text-red-500">This field is required</span>
            )}

            <CardHeader>
              <CardTitle>Approver</CardTitle>

              <select
                {...register("Approver", { required: true })}
                value={userReports}
                defaultValue="=== กรุณาเลือก ==="
                onChange={(e) => setUserReports(e.target.value)}
                className="input-warning w-full max-w-xs p-5 text-gray-500"
              >
                {reporterUsers?.data?.data.map((user: any) => (
                  <option
                    key={user.username_reporter}
                    value={user.username_reporter}
                  >
                    {user.username_reporter}
                  </option>
                ))}
              </select>
            </CardHeader>
            {errors.Approver && (
              <span className="text-red-500">This field is required</span>
            )}

            <CardContent></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <MailIcon className="h-12 w-12 text-primary" />
              <CardTitle>Customers Emails</CardTitle>
            </CardHeader>

            <div className="flex flex-shrink justify-items-start gap-4 space-x-4">
              <div className="space-y-4 p-3">
                <label className="label cursor-pointer">
                  <span className="label-text">ส่งอีเมล์</span>
                  <Controller
                    name="sendEmail"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        {...field}
                        className="checkbox-secondary checkbox"
                        checked={field.value}
                        onChange={handleCheckboxChange}
                      />
                    )}
                  />
                </label>

                <label className="label cursor-pointer">
                  <span className="label-text">ส่งไลน์แจ้งเตือน</span>
                  <span><FaLine size={20} /></span>
                  <Controller
                    name="sendLine"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        {...field}
                        className="checkbox-secondary checkbox"
                        checked={field.value}
                        onChange={handleCheckboxChange}
                      />
                    )}
                  />
                </label>
              </div>
            </div>

            <CardContent>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Email</InputLabel>

                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {emailsData?.data?.data.map((email: any) => (
                    <MenuItem
                      key={email.emails}
                      value={email.emails}
                      style={getStyles(email.emails, personName, theme)}
                    >
                      {email.emails}
                    </MenuItem>
                  ))}
                </Select>
                {personName && (
                  <p style={{ color: "red" }}>
                    อีเมล์ลูกค้าที่เลือก :
                    {personName.map((email) => (
                      <span key={email}>{email}, </span>
                    ))}
                  </p>
                )}
              </FormControl>

              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">CC Email</InputLabel>

                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={personNameCc}
                  onChange={handleChangeCc}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {cCemailsData?.data?.data.map((email: any) => (
                    <MenuItem
                      key={email.emails_cc}
                      value={email.emails_cc}
                      style={getStyles(email.emails, personNameCc, theme)}
                    >
                      {email.emails_cc}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {personNameCc && (
                <p style={{ color: "red" }}>
                  อีเมล์ CC ที่เลือก :
                  {personNameCc.map((email) => (
                    <span key={email}>{email}, </span>
                  ))}
                </p>
              )}
            </CardContent>

            <input
              type="hidden"
              name="user_email"
              value={personName.map((email) => email)}
            />
          </Card>
        </div>
      </div>
    </form>
  );
}

function MailIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
