"use client";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUsersApi } from "./services";
import { Button, TableMain } from "./components";

export default function Home() {
  const [searchFilter, setSearchFilter] = useState("");
  const router = useRouter();

  const { data: usersData, isLoading } = useQuery({
    queryKey: ["getUsersApi"],
    queryFn: getUsersApi,
  });
  
  const handleAddNewClient = () => {
    router.push("/user/add-user");
  };

  // Handle search filter change
  const handleSearchFilterChange = (event) => {
    setSearchFilter(event.target.value);
  };

  // create columnHelper
  const columnHelper = createColumnHelper();
  // Table columns
  const columns = [
    columnHelper.accessor("firstName", {
      cell: ({ row }) => (
        <div>
          {row?.original?.id && (
            <Link
              href={`/user/${row?.original?.id}`}
              className="px-4  py-4 flex items-center  cursor-pointer"
            >
              <span className="pl-4">{row?.original?.firstName}</span>
            </Link>
          )}
        </div>
      ),
      header: () => <span className="pl-4">First Name</span>,
    }),
    columnHelper.accessor("lastName", {
      cell: ({ row }) => (
        <div>
          {row?.original?.id && (
            <Link
              href={`/user/${row?.original?.id}`}
              className="px-4  py-4 flex items-center  cursor-pointer"
            >
              <span className="pl-4">{row?.original?.lastName}</span>
            </Link>
          )}
        </div>
      ),
      header: () => <span className="pl-4">Last Name</span>,
    }),

    columnHelper.accessor("email", {
      cell: ({ row }) => (
        <div>
          {row?.original?.id && (
            <Link
              href={`/user/${row?.original?.id}`}
              className="px-4  py-4 flex items-center  cursor-pointer"
            >
              <span className="pl-4">{row?.original?.email}</span>
            </Link>
          )}
        </div>
      ),
      header: () => <span className="pl-4">Email</span>,
    }),
    columnHelper.accessor("phoneNumber", {
      cell: ({ row }) => (
        <div>
          {row?.original?.id && (
            <Link
              href={`/user/${row?.original?.id}`}
              className="px-4  py-4 flex items-center cursor-pointer"
            >
              <span className="">{row?.original?.phoneNumber}</span>
            </Link>
          )}
        </div>
      ),
      header: () => <span>Phone Number</span>,
    }),
    columnHelper.accessor("sector", {
      cell: ({ row }) => (
        <div>
          {row?.original?.id && (
            <Link
              href={`/user/${row?.original?.id}`}
              className="px-4  py-4 flex items-center cursor-pointer"
            >
              <span className="">{row?.original?.sector}</span>
            </Link>
          )}
        </div>
      ),
      header: () => <span>Sectors</span>,
    }),
  ];

  const filteredClientData = usersData?.filter((item) => {
    const searchQuery = searchFilter.toLowerCase();
    return item?.firstName.toLowerCase().includes(searchQuery);
  });

  return (
    <>
      <main className="min-h-screen bg-[#10172A]  text-[#10172A] pt-[80px] px-4  max-w-[1000px] mx-auto">
        <p className="my-4 text-white">Here&apos;s the Users list</p>

        <div className="my-8 lg:flex items-center justify-between">
          <div className="mb-2 md:p-2 md:w-full md:mb-0 md:pl-0 lg:mr-6">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-3 pl-10 text-sm text-[#10172A] border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#DDAA33] focus:border-[#DDAA33] dark:bg-[#FBFBFB] dark:border-[#B2B6BA] dark:placeholder-gray-400 dark:text-[#10172A] dark:focus:ring-[#DDAA33] dark:focus:border-[#DDAA33] outline-none focus:out-none"
                placeholder="Search by Fist Name..."
                required
                onChange={handleSearchFilterChange}
              />
            </div>
          </div>
          <div onClick={handleAddNewClient}>
            <Button
              btnText="Create Users"
              className="bg-white justify-center flex text-[#10172A] font-semibold"
            />
          </div>
        </div>
        <TableMain
          data={filteredClientData ? filteredClientData : []}
          columns={columns}
          tableClass=" font-medium text-small"
          filters={{
            firstName: searchFilter,
          }}
          isLoading={isLoading}
        />
      </main>
      <ToastContainer />
    </>
  );
}
