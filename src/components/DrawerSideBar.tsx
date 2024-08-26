"use client";
import React from "react";
import Link from "next/link";
// import { useSession } from "./providers/Session.provider";
// import { useQueries } from "@tanstack/react-query";
// import axios from "axios";

// interface Users {
//   id: number;
//   username: string;
//   role: string;
// }

function DrawerSideBar() {
  // const { user } = useSession();
  // console.log(user?.id);

  // const userId = user?.id;

  // const [sessionsData] =
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   useQueries({
  //     queries: [
  //       {
  //         queryKey: ["users"],
  //         queryFn: (): Promise<Users> => axios.get("/api/sessions"),
  //       },
  //     ],
  //   });

  // console.log(sessionsData?.data?.data);

  // const roleUser: Users = sessionsData?.data?.data.find(
  //   (user) => user.id === userId
  // );

  return (
    <div className="drawer-start drawer">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-4" className="btn drawer-button bg-red-400">
          NOC Operator Report
        </label>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        {/* Sidebar content here */}

        <ul className="menu min-h-full w-80 space-y-6 bg-base-200 p-6 text-base-content">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src="https://res.cloudinary.com/satjay/image/upload/v1705293483/ptzmq3vg2zb4i9wqi8xy.jpg" />
            </div>
          </div>

          {/* Sidebar content here */}

     
           
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/usersettings">Create Approver</Link>
              </li>
              <li>
                <Link href="/sendemails">Create Send Emails Users</Link>
              </li>

              <li>
                <Link href="/ccsetings">Create CC Emails Users</Link>
              </li>

              <li>
                <Link href="/exportdata">Export Data to Excel</Link>
              </li>
           



       
        </ul>
      </div>
    </div>
  );
}

export default DrawerSideBar;
