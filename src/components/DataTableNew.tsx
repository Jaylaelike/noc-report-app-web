/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { DatetimeFsp } from "drizzle-orm/mysql-core/columns/datetime";
import { Download } from "lucide-react";
import { useState, SetStateAction, useEffect } from "react";
import { CSVLink } from "react-csv";
import { Input } from "./ui/input";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "dayjs";
import AlertDialogDelButton from "./AlertDeleteDialog";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import AlertDialogEditButton from "./AlertEditeDialog";

interface Data {
  id: number;
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

interface PropsType {
  all: any;
}

function GroupIcon(props) {
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
      <path d="M3 7V5c0-1.1.9-2 2-2h2" />
      <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
      <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
      <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
      <rect width="7" height="5" x="7" y="7" rx="1" />
      <rect width="7" height="5" x="10" y="12" rx="1" />
    </svg>
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

const formattedDate = new Date().toISOString().slice(0, 10);

export default function DataTableNew(props: PropsType) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = props.all?.data?.data.filter((item: Data) => {
    const term = searchTerm?.toLowerCase() || "";
    return (
      (item.Site?.toLowerCase() || "").includes(term) ||
      (item.FacilityProvider?.toLowerCase() || "").includes(term) ||
      (item.EngineeringCenter?.toLowerCase() || "").includes(term) ||
      (item.DowntimeTotal?.toLowerCase() || "").includes(term) ||
      (item.Detail?.toLowerCase() || "").includes(term) ||
      (item.JobTickets?.toLowerCase() || "").includes(term) ||
      (item.Reporter?.toLowerCase() || "").includes(term) ||
      (item.Approver?.toLowerCase() || "").includes(term)
    );
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const allData = props.all?.data?.data;

  // const dateFilterDataProps = props.dataFilterDate?.data?.data || [];

  const [startDates, setStartDates] = useState("");
  const [endDates, setEndDates] = useState("");
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

  const [downTimeDateFilter] =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQueries({
      queries: [
        {
          queryKey: ["", startDates, endDates],
          //http://localhost:3000/api/sessions/filter?start=2024-09-05%2000:00&end=2024-09-05%2023:59
          queryFn: (): Promise<Data> =>
            axios.get(
              `/api/main_data/filter?start=${incrementMonth(startDates)} 00:00&end=${incrementMonth(endDates)} 23:59`,
            ),
        },
      ],
    });

  //create useEffect to set new downTimeDateFilter to dataFilterDate when startDates, endDates change value

  const newDownTimeDateFiltering = downTimeDateFilter?.data?.data || [];

  //creat set data to use in csv export data when all filter newDownTimeDateFiltering and searchTerm
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    if (searchTerm === null) {
      setData(filteredData as Data[]);
    } else if (startDates !== "" && endDates !== "") {
      setData(newDownTimeDateFiltering as Data[]);
    } else {
      setData(allData as Data[]);
    }
  }, [
    searchTerm,
    startDates,
    endDates,
    allData,
    filteredData,
    newDownTimeDateFiltering,
  ]);

  const formattedData = data?.map((item) => ({
    Site: item.Site,
    FacilityProvider: item.FacilityProvider,
    EngineeringCenter: item.EngineeringCenter,
    PostingDate: dayjs(item.PostingDate).format("DD-MM-YYYY"),
    DowntimeStart: dayjs(item.DowntimeStart).format("DD-MM-YYYY HH:mm:ss"),
    DowntimeEnd: dayjs(item.DowntimeEnd).format("DD-MM-YYYY HH:mm:ss"),
    DowntimeTotal: item.DowntimeTotal,
    Detail: item.Detail,
    JobTickets: item.JobTickets,
    Reporter: item.Reporter,
    Approver: item.Approver,
    Remark: item.Remark,
  }));

  // const [usersData] =
  // // eslint-disable-next-line react-hooks/rules-of-hooks
  // useQueries({
  //   queries: [
  //     {
  //       queryKey: [""],
  //       queryFn: (): Promise<Data> => axios.get("/api/main_data"),
  //     },
  //   ],
  // });

  //convert formattedData to array of object to use in csv export

  return (
    <div className="overscroll-x-contain">
      <div className="overflow-x-auto">
        <div className="">
          <div className="absolute top-20 w-80 p-4 pb-32">
            <Datepicker
              popoverDirection="down"
              value={values}
              onChange={handleValueChange}
              primaryColor={"teal"}
            />
          </div>

          <div className="grid grid-cols-1 justify-end p-4">
            {startDates !== "" && endDates !== "" && (
              <div className="grid grid-cols-1 gap-4">
                <Card>
                  <CardContent className="flex items-center justify-end">
                    <div>
                      <CardTitle>Event All</CardTitle>

                      <div className="text-4xl font-bold">
                        {newDownTimeDateFiltering?.length}
                      </div>
                    </div>
                    <GroupIcon className="h-12 w-12 text-primary" />
                  </CardContent>
                </Card>
              </div>
            )}
            {startDates === "" && endDates === "" && (
              <div className="grid grid-cols-1 gap-4 p-2">
                <Card>
                  <CardContent className="flex items-center justify-end">
                    <div>
                      <CardTitle>Event All</CardTitle>

                      <div className="text-4xl font-bold">
                        {allData?.length}
                      </div>
                    </div>
                    <GroupIcon className="h-12 w-12 text-primary" />
                  </CardContent>
                </Card>
              </div>
            )}

            <button className="btn btn-accent z-0 justify-self-end">
              <Download />
              <CSVLink
                data={formattedData || []}
                filename={`downtime_${formattedDate}.csv`}
              >
                ส่งออกข้อมูล Excel
              </CSVLink>
            </button>
          </div>

          <div className="">
            <Input
              type="search"
              placeholder="ค้นหา..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <table className="table-pin-rows table-pin-cols w-full">
            <thead>
              <tr className="bg-muted text-muted-foreground">
                <th className="px-4 py-3 text-left">Delete</th>
                <th className="px-4 py-3 text-left">Edit</th>
                <th className="px-4 py-3 text-left">Site</th>
                <th className="px-4 py-3 text-left">FacilityProvider</th>
                <th className="px-4 py-3 text-left">EngineeringCenter</th>
                <th className="px-4 py-3 text-left">PostingDate</th>
                <th className="px-4 py-3 text-left">DowntimeStart</th>
                <th className="px-4 py-3 text-left">DowntimeEnd</th>
                <th className="px-4 py-3 text-left">DowntimeTotal</th>
                <th className="px-4 py-3 text-left">Detail</th>
                <th className="px-4 py-3 text-left">JobTickets</th>
                <th className="px-4 py-3 text-left">Reporter</th>
                <th className="px-4 py-3 text-left">Approver</th>
              </tr>
            </thead>
            <tbody>
              {!searchTerm && startDates === "" && endDates === ""
                ? allData?.map((item: Data) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 text-xs hover:bg-gray-100"
                    >
                      <td className="px-4 py-3">
                        <button className="btn btn-error">
                          <AlertDialogDelButton alertId={item.id} />
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <button className="btn btn-warning">
                          <AlertDialogEditButton alertId={item.id} />
                        </button>
                      </td>
                      <td className="px-4 py-3">{item.Site}</td>
                      <td className="px-4 py-3">{item.FacilityProvider}</td>
                      <td className="px-4 py-3">{item.EngineeringCenter}</td>
                      <td className="px-4 py-3">
                        {dayjs(item.PostingDate)
                          .subtract(7, "hour")
                          .format("DD-MM-YYYY")}
                      </td>
                      <td className="px-4 py-3">
                        {dayjs(item.DowntimeStart)
                          .subtract(7, "hour")
                          .format("DD-MM-YYYY HH:mm:ss")}
                      </td>
                      <td className="px-4 py-3">
                        {dayjs(item.DowntimeEnd)
                          .subtract(7, "hour")
                          .format("DD-MM-YYYY HH:mm:ss")}
                      </td>
                      <td className="px-4 py-3">{item.DowntimeTotal}</td>
                      <td className="px-4 py-3">{item.Detail}</td>
                      <td className="px-4 py-3">{item.JobTickets}</td>
                      <td className="px-4 py-3">{item.Reporter}</td>
                      <td className="px-4 py-3">{item.Approver}</td>
                    </tr>
                  ))
                : searchTerm !== null && startDates === "" && endDates === ""
                  ? filteredData?.map((item: Data) => (
                      <tr
                        key={item.id}
                        className="border-b border-gray-200 text-xs hover:bg-gray-100"
                      >
                        <td className="px-4 py-3">
                          <button className="btn btn-error">
                            <AlertDialogDelButton alertId={item.id} />
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <button className="btn btn-warning">
                            <AlertDialogEditButton alertId={item.id} />
                          </button>
                        </td>
                        <td className="px-4 py-3">{item.Site}</td>
                        <td className="px-4 py-3">{item.FacilityProvider}</td>
                        <td className="px-4 py-3">{item.EngineeringCenter}</td>
                        <td className="px-4 py-3">
                          {dayjs(item.PostingDate)
                            .subtract(7, "hour")
                            .format("DD-MM-YYYY")}
                        </td>
                        <td className="px-4 py-3">
                          {dayjs(item.DowntimeStart)
                            .subtract(7, "hour")
                            .format("DD-MM-YYYY HH:mm:ss")}
                        </td>
                        <td className="px-4 py-3">
                          {dayjs(item.DowntimeEnd)
                            .subtract(7, "hour")
                            .format("DD-MM-YYYY HH:mm:ss")}
                        </td>
                        <td className="px-4 py-3">{item.DowntimeTotal}</td>
                        <td className="px-4 py-3">{item.Detail}</td>
                        <td className="px-4 py-3">{item.JobTickets}</td>
                        <td className="px-4 py-3">{item.Reporter}</td>
                        <td className="px-4 py-3">{item.Approver}</td>
                      </tr>
                    ))
                  : startDates !== "" && endDates !== ""
                    ? newDownTimeDateFiltering?.map((item: Data) => (
                        <tr
                          key={item.id}
                          className="border-b border-gray-200 text-xs hover:bg-gray-100"
                        >
                          <td className="px-4 py-3">
                            <button className="btn btn-error">
                              <AlertDialogDelButton alertId={item.id} />
                            </button>
                          </td>
                          <td className="px-4 py-3">
                            <button className="btn btn-warning">
                              <AlertDialogEditButton alertId={item.id} />
                            </button>
                          </td>
                          <td className="px-4 py-3">{item.Site}</td>
                          <td className="px-4 py-3">{item.FacilityProvider}</td>
                          <td className="px-4 py-3">
                            {item.EngineeringCenter}
                          </td>
                          <td className="px-4 py-3">
                            {dayjs(item.PostingDate)
                              .subtract(7, "hour")
                              .format("DD-MM-YYYY")}
                          </td>
                          <td className="px-4 py-3">
                            {dayjs(item.DowntimeStart)
                              .subtract(7, "hour")
                              .format("DD-MM-YYYY HH:mm:ss")}
                          </td>
                          <td className="px-4 py-3">
                            {dayjs(item.DowntimeEnd)
                              .subtract(7, "hour")
                              .format("DD-MM-YYYY HH:mm:ss")}
                          </td>
                          <td className="px-4 py-3">{item.DowntimeTotal}</td>
                          <td className="px-4 py-3">{item.Detail}</td>
                          <td className="px-4 py-3">{item.JobTickets}</td>
                          <td className="px-4 py-3">{item.Reporter}</td>
                          <td className="px-4 py-3">{item.Approver}</td>
                        </tr>
                      ))
                    : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
