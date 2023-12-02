"use client";
import { Input, Selector } from "@/app/components";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { CreateUsersApi, getSectorsApi } from "@/app/services";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

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
  agreeTerms: yup.boolean().oneOf([true], "Agree Terms is required"),
});

const successNotifying = () => {
  toast.success("User Created Successfully", {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
  });
};
const errorNotifying = () => {
  toast.error("User Creating  failed", {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
  });
};

export default function Home() {
  const [getSelectedSector, setGetSelectedSector] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const queryClient = useQueryClient();

  const navigateToUserHome = () => {
    router.push("/");
  };

  const { isLoading, mutate } = useMutation(CreateUsersApi, {
    onError: (error) => {
      console.log(error);
      errorNotifying();
    },
    onSuccess: async (data) => {
      navigateToUserHome();
      await queryClient.invalidateQueries(["getUsersApi"]);
      setIsSaving(true);
    },
    retry: 0,
  });

  const { data: sectorsData } = useQuery({
    queryKey: ["getSectorsApi"],
    queryFn: getSectorsApi,
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm(
    { resolver: yupResolver(schema) },
  );

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
    mutate(requestData);
    setIsSaving(true);
    successNotifying();
  };
  return (
    <>
      <main className="min-h-screen max-w-[800px] mx-auto  text-gray-600  p-4 md:p-8">
        <p className="my-2 text-white pt-20">Create a new User here</p>

        <section className="bg-[#495F6E] text-white pb-10 pt-2 px-3 mt-4 rounded-md md:px-6">
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <p className="my-2 text-white text-[18px] md:text-[24px] font-[800]">
              Create User
            </p>
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
                    selectOption=""
                    register={{ ...register("sector") }}
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
            <div className="mb-4">
              <div >
                <input
                  type="checkbox"
                  label="Terms and Condition"
                  name="agreeTerms"
                  {...register("agreeTerms")}
                  placeholder=""
                />
                <span className="text-sm"> Agree Terms and Conditions</span>
              </div>
              <p className="text-red-500 text-[0.7rem] text-left">
                {errors?.agreeTerms?.message}
              </p>
            </div>
            <div className="flex justify-between pr-0 lg:justify-end  gap-6">
              <div
                onClick={() => {
                  router.back();
                }}
                className="cursor-pointer justify-center flex rounded-md bg-red-800 text-white p-3 w-[200px] text-center  items-center"
              >
                Cancel
              </div>
              <button
                disabled={isSaving}
                className="text-[#10172A] bg-white justify-center flex rounded-md cursor-pointer w-[200px]  p-3 text-center items-center hover:bg-[#4e6a7c] hover:border-[#10172A] hover:border-[1.2px] hover:text-white"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </section>
      </main>
      <ToastContainer />
    </>
  );
}
