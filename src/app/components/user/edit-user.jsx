"use client";
import { Input, Selector } from "@/app/components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { EditUserApi } from "@/app/services";
import { useState } from "react";
import { getSectorsApi } from "@/app/services";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email(" Invalid Email format"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .min(6, "Phone number must be greater than 6 numbers")
    .max(12, "Phone number must be less than 12 numbers"),
  sector: yup.string().required("Sector is required"),
});

const successNotifying = () => {
  toast.success("User Edited Successfully", {
    position: toast.POSITION.TOP_RIGHT,
  });
};
const errorNotifying = () => {
  toast.error("User Editing  failed", {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
  });
};

export const EditUser = ({ editUserID, userDetails, setShowEditUser }) => {
  const [getSelectedSector, setGetSelectedSector] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(EditUserApi, {
    onError: (error) => {
      errorNotifying();
      console.log(error);
    },
    onSuccess: async (data) => {
      const response = data;
      successNotifying();
      setShowEditUser(false);
      await queryClient.invalidateQueries(["getUserDetailsApi"]);
    },
    retry: 0,
  });

  const { data: sectorsData } = useQuery({
    queryKey: ["getSectorsApi"],
    queryFn: getSectorsApi,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: userDetails?.firstName,
      lastName: userDetails?.lastName,
      email: userDetails?.email,
      sector: userDetails?.sector,
      phoneNumber: userDetails?.phoneNumber,
    },
  });

  const handleSelectSelector = (item) => {
    setGetSelectedSector(item?.name);
  };

  const onSubmitHandler = (data) => {
    const requestData = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      sector: getSelectedSector,
      phoneNumber: data?.phoneNumber,
    };
    mutate({ data: requestData, id: editUserID });
    setIsSaving(true);
  };
  return (
    <>
      <main className="p-4 md:pl-8  md:pt-8 bg-[#495F6E] text-white max-w-[700px] mx-auto rounded-xl">
        <p className="text-sm md:text-xl font-bold text-white">Edit User</p>
        <p className="my-2 text-white">Edit the User here</p>

        <section className="bg-[#495F6E] pb-10  px- mt-1 rounded-md md:px-">
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="mt-8 rounded-md md:pl-6 py-3 bg-gray-200/40">
              <p className="font-bold ml-0 text-center md:ml-3 md:text-left">
                {userDetails?.firstName}{" "}
                <span className="ml-2">{userDetails?.lastName}</span>
              </p>
            </div>
            {/* user details */}
            <div className="block space-y-4  mt-10 md:flex md:space-x-4 md:space-y-0 lg:space-x-10">
              <div className="w-full space-y-6 md:w-1/2">
                <div>
                  <Input
                    type="text"
                    inputName="firstName"
                    label="First Name"
                    register={{ ...register("firstName") }}
                    editInput="text-[#10172A]"
                    placeholder="Enter First Name"
                  />
                  <p className="text-red-500 text-[0.7rem] text-left">
                    {errors.firstName?.message}
                  </p>
                </div>
                <div>
                  <Input
                    type="email"
                    label="Email"
                    inputName="email"
                    register={{ ...register("email") }}
                    editInput="text-[#10172A]"
                    placeholder="Enter Email"
                  />
                  <p className="text-red-500 text-[0.7rem] text-left">
                    {errors.email?.message}
                  </p>
                </div>
                
              </div>

              <div className="w-full space-y-6 md:w-1/2">
                <div>
                  <Input
                    type="text"
                    inputName="lastName"
                    label="Last Name"
                    register={{ ...register("lastName") }}
                    editInput="text-[#10172A]"
                    placeholder="Enter Last Name"
                  />
                  <p className="text-red-500 text-[0.7rem] text-left">
                    {errors.lastName?.message}
                  </p>
                </div>

                <div>
                  <Selector
                    label="Sector"
                    focusContent=""
                    placeholder="search"
                    onSelect={handleSelectSelector}
                    inputData={sectorsData}
                    getSelectedSector={userDetails?.sector}
                  />
                  {!getSelectedSector && (
                    <p className="text-red-500 text-[0.7rem] text-left">
                      {errors.sector?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="my-6">
                  <Input
                    type="number"
                    inputName="phoneNumber"
                    label="Phone Number"
                    register={{ ...register("phoneNumber") }}
                    editInput="text-[#10172A]"
                    placeholder="Enter Phone Number"
                  />
                  <p className="text-red-500 text-[0.7rem] text-left">
                    {errors?.phoneNumber?.message}
                  </p>
                </div>
            <div className="flex justify-between pr-0 mt-8 lg:justify-end  gap-6">
              <div
                onClick={() => {
                  setShowEditUser(false);
                }}
                className="cursor-pointer justify-center flex rounded-md bg-red-700 text-white p-3 w-[200px] text-center  items-center"
              >
                Cancel
              </div>
              <button
                disabled={isSaving}
                className="text-[#10172A] justify-center flex rounded-md bg-white cursor-pointer w-[200px]  p-3 text-center items-center hover:bg-[#4e6a7c] hover:border-[#10172A] hover:border-[1.2px] hover:text-white"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};
