"use client";
import React from "react";
import Link from "next/link";

function DrawerSideBar() {
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
        <ul className="menu min-h-full w-80 bg-base-200 text-base-content p-6 space-y-6">
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
            <Link href="/usersettings">Create Reports User</Link>
          </li>
          <li>
            <Link href="/sendemails">Create Send Emails Users</Link>
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
