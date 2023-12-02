"use client";
interface deleteProps {
  deleteUserID?: string;
  userDetails?: any;
  setShowDeleteUser?: any;
}
import { GrFormClose } from "react-icons/gr";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { DeleteUserApi } from "@/app/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const successNotifying = () => {
  toast.success("Client Deleted Successfully", {
    position: toast.POSITION.TOP_RIGHT,
  });
};
const errorNotifying = () => {
  toast.error("Client deleting  failed", {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const DeleteUser = ({
  setShowDeleteUser,
  userDetails,
  deleteUserID,
}: deleteProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const navigateToClientHome = () => {
    router.push("/");
  };

  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation(DeleteUserApi, {
    onError: (error) => {
      errorNotifying();
      console.log(error);
    },
    onSuccess: async (data) => {
      const response = data;
      successNotifying();
      setShowDeleteUser(false);
      navigateToClientHome();
      await queryClient.invalidateQueries(["getUsersApi"]);
    },
    retry: 0,
  });

  const onSubmitHandler = () => {
    mutate({ data: {}, id: deleteUserID });
    setIsDeleting(true);
  };

  return (
    <>
      <div className="bg-white p-8 rounded-[0.63rem] -z-50 lg:w-[70%] mx-auto">
        <div className="flex justify-end mb-3">
          <span
            className="cursor-pointer  font-bold"
            onClick={() => {
              setShowDeleteUser(false);
            }}
          >
            <GrFormClose size={30} />
          </span>
        </div>

        <h2 className="text-xl mb-2 text-[#D92D20]">Delete User</h2>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet.
        </p>

        <div className="text-sm mt-8">
          Do you really want to delete{" "}
          <span className="ml-2">
            <span className="text-[#D92D20]">{userDetails?.firstName} </span>
            <span className="mx-2 text-[#D92D20]">
              {userDetails?.lastName} ?
            </span>
            If you proceed, this cannot be reversed
          </span>
        </div>
        {/* buttons */}
        <div className="mt-12">
          <button
            type="button"
            className={
              "bg-[#D92D20] rounded-[8px] text-white px-[28px] cursor-pointer py-[12px]  text-center  w-full"
            }
            onClick={onSubmitHandler}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>

          <div
            className="rounded-[8px] px-[28px] py-[12px] cursor-pointer text-center text-[#D92D20] w-full"
            onClick={() => setShowDeleteUser(false)}
          >
            Close   
          </div>
        </div>
      </div>
    </>
  );
};
