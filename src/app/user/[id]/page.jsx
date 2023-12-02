"use client";
import { Button, UserDetails, Modal } from "@/app/components";
import { DeleteUser } from "@/app/components/user/delete-user";
import { EditUser } from "@/app/components/user/edit-user";
import { getUserDetailsApi } from "@/app/services";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = ({ params }) => {
  const [showEditUser, setShowEditUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const userID = params?.id;

  const { data: userDetails, isLoading } = useQuery({
    queryKey: ["getUserDetailsApi", userID],
    queryFn: () => (userID ? getUserDetailsApi(userID) : null),
  });

  return (
    <>
      <main className="min-h-screen max-w-[900px] mx-auto text-gray-600 pt-[120px] px-4">
        <p className="pl-4 text-white text-[24px]">User Details</p>
        <section className="bg-[#495F6E] pb-20 pt-1 px-4 md:px-6  rounded-md">
          <div className=" rounded-md pl-4  py-4 bg-gray-200/40 ">
            {/* edit button */}
            <div className=" w-full justify-between items-center flex pr-2 md:pr-10 md:pt-6">
              <div className="md:w-2/3 mb-4 text-center text-[18px] md:text-[24px] font-bold">{`${userDetails?.firstName} ${userDetails?.lastName}`}</div>

              <Button
                btnText="Edit"
                handleBtnClick={() => {
                  setShowEditUser(true);
                }}
                className="bg-white text-[#10172A] justify-center flex p-1 w-[80px] md:w-[200px] h-[50px]"
              />
            </div>
          </div>

          {/* user details */}
          <div className="ml-1 md:flex md:space-x-40 md:ml-4 my-20">
            <div className="space-y-6 md:w-1/3">
              <UserDetails
                title="First Name"
                content={`${userDetails?.firstName}`}
                focusContent=""
              />
              <UserDetails
                title="Sector"
                content={userDetails?.sector}
                focusContent=""
              />
            </div>

            <div className="mt-6 space-y-6 md:mt-0 md:w-1/3">
            <UserDetails
                title="Last Name"
                content={`${userDetails?.lastName}`}
                focusContent=""
              />
              <UserDetails
                title="Email"
                content={userDetails?.email}
                focusContent=""
              />
            </div>
            <div className="mt-6 space-y-6 md:mt-0 md:w-1/3">
              <UserDetails
                title="Phone Number"
                content={userDetails?.phoneNumber}
                focusContent=""
              />
            </div>
          </div>

          {/* Delete button */}
          <div className="justify-center md:justify-end flex pr-8">
            <Button
              btnText="Delete"
              handleBtnClick={() => {
                setShowDeleteUser(true);
              }}
              className="bg-red-700 text-white justify-center flex"
            />
          </div>
        </section>
      </main>
      <Modal show={showEditUser} onClose={() => setShowEditUser(false)}>
        <EditUser
          setShowEditUser={setShowEditUser}
          editUserID={userID}
          userDetails={userDetails}
        />
      </Modal>
      <Modal show={showDeleteUser} onClose={() => setShowDeleteUser(false)}>
        <DeleteUser
          setShowDeleteUser={setShowDeleteUser}
          deleteUserID={userID}
          userDetails={userDetails}
        />
      </Modal>

      <ToastContainer />
    </>
  );
};
export default UserProfile;
