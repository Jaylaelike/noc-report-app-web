/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { SetStateAction } from "react";
import DataTableAll from "~/components/DataTableAll";

import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { DatetimeFsp } from "drizzle-orm/mysql-core/columns/datetime";
import DataTableWorks from "~/components/DataTableWorks";
import DataTableNew from "~/components/DataTableNew";
import dayjs from "dayjs";
import { useSession } from "~/components/providers/Session.provider";
import Datepicker from "react-tailwindcss-datepicker";

interface DowntimeTypes {
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

function page() {
  const [startDates, setStartDates] = useState(dayjs().format("YYYY-MM-DD"));
  const [endDates, setEndDates] = useState(dayjs().format("YYYY-MM-DD"));
  console.log("startDates", startDates);
  console.log("endDates", endDates);

  const [values, setValues] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const incrementMonth = (dateString: string): string => {
    const date = new Date(dateString);
    date.setMonth(date.getMonth() + 1);
    const year = date.getFullYear();
    const month = String(date.getMonth()); // Months are 0-based, so add 1
    const day = String(date.getDate());
    return `${year}-${month}-${day}`;
  };

  const handleValueChange = (
    newValue: SetStateAction<{ startDate: Date; endDate: Date }>,
  ) => {
    //console.log("newValue:", newValue);
    setValues(newValue);

    setStartDates(newValue.startDate as Date);
    setEndDates(newValue.endDate as Date);
  };

  const [downTimeDataFilter] =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQueries({
      queries: [
        {
          queryKey: ["", startDates, endDates],
          //http://localhost:3000/api/sessions/filter?start=2024-09-05%2000:00&end=2024-09-05%2023:59
          queryFn: (): Promise<DowntimeTypes> =>
            axios.get(
              `/api/main_data/filter?start=${incrementMonth(startDates)} 00:00&end=${incrementMonth(endDates)} 23:59`,
            ),
        },
      ],
    });

  // const isQueriesLoaded = downTimeData.isLoading;

  // // eslint-disable-next-line react-hooks/rules-of-hooks
  // const router = useRouter();

  const { user } = useSession();
  // console.log(user);

  if (!user) {
    redirect("/");
  }

  return (
    <>
      <div className="relative w-80 justify-around p-4">
        <Datepicker
          value={values}
          onChange={handleValueChange}
          primaryColor={"teal"}
        />
      </div>

      <DataTableNew data={downTimeDataFilter} />
    </>
  );
}

export default page;
