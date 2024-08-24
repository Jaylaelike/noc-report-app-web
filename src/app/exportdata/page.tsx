"use client";
import React from "react";
import DataTableAll from "~/components/DataTableAll";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { DatetimeFsp } from "drizzle-orm/mysql-core/columns/datetime";
import DataTableWorks from "~/components/DataTableWorks";
import DataTableNew from "~/components/DataTableNew";

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
  const [downTimeData] =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQueries({
      queries: [
        {
          queryKey: [""],
          queryFn: (): Promise<DowntimeTypes> => axios.get("/api/main_data"),
        },
      ],
    });

  const isQueriesLoaded = downTimeData.isLoading;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();



  return (
    <>
      <DataTableNew  data={downTimeData}/>
    </>

  
   
    

   
      
  
  );
}

export default page;
