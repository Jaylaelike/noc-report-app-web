"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useQueries } from "@tanstack/react-query";
import axios from "axios";

import { useSession } from "~/components/providers/Session.provider";
import { redirect } from "next/navigation";

import { Trash2 } from "lucide-react";

import { Card, CardContent, CardTitle } from "~/components/ui/card";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "~/components/ui/table";

import EmailCreate from "~/components/EmailsCreate";

interface Users {
  id_reporter: number;
  username_reporter: string;
}

interface UserSession {
  id: number;
  username: string;
  role: string;
}

function CalendarClockIcon(props) {
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
      <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h5" />
      <path d="M17.5 17.5 16 16.3V14" />
      <circle cx="16" cy="16" r="6" />
    </svg>
  );
}

function CalendarIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function ClipboardPenIcon(props) {
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
      <rect width="8" height="4" x="8" y="2" rx="1" />
      <path d="M10.4 12.6a2 2 0 0 1 3 3L8 21l-4 1 1-4Z" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5" />
      <path d="M4 13.5V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

function DeleteIcon(props) {
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
      <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
      <line x1="18" x2="12" y1="9" y2="15" />
      <line x1="12" x2="18" y1="9" y2="15" />
    </svg>
  );
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

function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useSession();
  // console.log(user);

  const userId = user?.id;

  if (!user) {
    redirect("/");
  }

  //create state for show create user form
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showCreateUser, setShowCreateUser] = useState(false);

  const [usersData, sessionsData] =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQueries({
      queries: [
        {
          queryKey: [""],
          queryFn: (): Promise<Users> => axios.get("/api/emails"),
        },
        {
          queryKey: ["users"],
          queryFn: (): Promise<UserSession> => axios.get("/api/sessions"),
        },
      ],
    });

  const isQueriesLoaded = usersData.isLoading;

  const roleUser: UserSession = sessionsData?.data?.data.find(
    (user) => user.id === userId,
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  const handleDeleteRecord = async (itemId: number) => {
    try {
      await axios.delete(`api/emails/${itemId}`);

      // router.refresh();
      //reload page

      router.push("/sendemails");
      location.reload();
      close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {roleUser?.role === "Admin" && (
        <main className="z-10 flex min-h-screen flex-col items-center justify-center">
          <div className="space-y-8 p-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="flex items-center justify-between">
                  <div>
                    <CardTitle>Emails setting All</CardTitle>

                    <div className="text-4xl font-bold">
                      {usersData?.data?.data.length}
                    </div>
                  </div>
                  <GroupIcon className="h-12 w-12 text-primary" />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">All Leave Requests</h2>
                <div className="relative">
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowCreateUser(true)}
                  >
                    เพิ่ม Email +{" "}
                  </button>
                </div>
              </div>

              {showCreateUser && <EmailCreate />}

              {isQueriesLoaded ? (
                <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b pt-10">
                  <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
                    <span className="loading loading-lg"></span>
                  </div>
                </div>
              ) : (
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Enterprise</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>telphone</TableHead>
                        <TableHead>email</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usersData?.data?.data.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.enterprise}</TableCell>
                          <TableCell>{user.customers}</TableCell>
                          <TableCell>{user.telphone}</TableCell>
                          <TableCell>{user.emails}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <button className="btn btn-primary btn-sm">
                                <ClipboardPenIcon className="h-4 w-4" />
                              </button>

                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handleDeleteRecord(user.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              )}
            </div>
          </div>
        </main>
      )}

      {isQueriesLoaded ? (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b pt-10">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
            <span className="loading loading-lg"></span>
          </div>
        </div>
      ) : (
        <>
          {roleUser?.role !== "Admin" && (
            <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b pt-10">
              <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
                <h1 className="text-balance text-5xl font-extrabold tracking-tight text-gray-800 sm:text-[5rem]">
                  คุณไม่ใช่ Admin กรุณา{" "}
                  <span className="text-balance text-[hsl(353,93%,58%)]">
                    ติดต่อเจ้าหน้าที่
                  </span>
                </h1>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default page;
