import ResetPasswordForm from "@/components/ResetPassword/ResetPasswordForm/ResetPasswordForm";
import React from "react";

export const metadata = {
  title: "Reset Password | Ashik Hridoy Portfolio",
  description: "Software Developer",
};

const ResetPassword = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-[--dark-blue]">
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPassword;
