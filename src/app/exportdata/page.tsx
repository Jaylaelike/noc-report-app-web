/* eslint-disable react-hooks/rules-of-hooks */
"use client";


import { redirect } from "next/navigation";


import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { DatetimeFsp } from "drizzle-orm/mysql-core/columns/datetime";

import DataTableNew from "~/components/DataTableNew";

import { useSession } from "~/components/providers/Session.provider";


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
  const [downtiemAll] =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQueries({
      queries: [
        {
          queryKey: [""],
          //http://localhost:3000/api/sessions/filter?start=2024-09-05%2000:00&end=2024-09-05%2023:59
          queryFn: (): Promise<DowntimeTypes> => axios.get(`/api/main_data`),
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
    

      <DataTableNew all={downtiemAll} />
    </>
  );
}

export default page;
