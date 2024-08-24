"use client";

import { DatetimeFsp } from "drizzle-orm/mysql-core/columns/datetime";
import { Download } from "lucide-react";
import { CSVLink } from "react-csv";

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
  data: any;
}

const formattedDate = new Date().toISOString().slice(0, 10);
export default function DataTableNew(props: PropsType) {
  const data = props.data;
  return (
    <div className="overscroll-x-contain">
    <div className="overflow-x-auto">
    <div className="">
    <div className="p-4">
        <button className="btn btn-accent justify-self-end">
          <Download />
          <CSVLink data={
            data?.data?.data?.map((item: Data) => ({
              FacilityProvider: item.FacilityProvider,
              EngineeringCenter: item.EngineeringCenter,
              PostingDate: item.PostingDate,
              DowntimeStart: item.DowntimeStart,
              DowntimeEnd: item.DowntimeEnd,
              DowntimeTotal: item.DowntimeTotal,
              Detail: item.Detail,
              JobTickets: item.JobTickets,
              Reporter: item.Reporter,
              Approver: item.Approver,
            })) || []
          } filename={`downtime_${formattedDate}.csv`}>
            ส่งออกข้อมูล Excel
          </CSVLink>
        </button>
      </div>

 
      

        
      <table className="w-full table-pin-rows table-pin-cols">
        <thead>
          <tr className="bg-muted text-muted-foreground">
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
          {data?.data?.data.map((item: Data) => (
            <tr
              key={item.id}
              className="border-b border-gray-200 hover:bg-gray-100 text-xs"
            >
              <td className="px-4 py-3">{item.FacilityProvider}</td>
              <td className="px-4 py-3">{item.EngineeringCenter}</td>
              <td className="px-4 py-3">{item.PostingDate}</td>
              <td className="px-4 py-3">{item.DowntimeStart}</td>
              <td className="px-4 py-3">{item.DowntimeEnd}</td>
              <td className="px-4 py-3">{item.DowntimeTotal}</td>
              <td className="px-4 py-3">{item.Detail}</td>
              <td className="px-4 py-3">{item.JobTickets}</td>
              <td className="px-4 py-3">{item.Reporter}</td>
              <td className="px-4 py-3">{item.Approver}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </div>
 

  );
}
