import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getLocalstorage } from "~/src/utils/localstorageMethods";
import { AccountActivationAPI } from "~/src/api/AccountActivationAPI";

import Logo from "~/src/components/common/Logo";
import { useState } from "react";

export default AccountActivation = () => {
  const navigate = useNavigate();
  const fullName = getLocalstorage("fullName");
  let { uidb64, token } = useParams();
  const [isActivated, setIsActivated] = useState(false);
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["activateAccount"],
    queryFn: async () => {
      if (uidb64 && token) {
        const data = await AccountActivationAPI(uidb64, token);
        setIsActivated(true)
      }
      return data || "";
    },
  });

  if( isActivated ){
    setTimeout(3*1000)
    navigate("/account/authentication")
  }

  return (
    <div
      className={
        "min-h-screen w-full bg-baseBg flex justify-center items-center"
      }
    >
      <div className={"w-1/3 min-w-[400px] bg-white rounded-xl p-10 space-y-6"}>
        <div className="w-full flex justify-center">
          <Logo />
        </div>
        <div>
          {uidb64 && token ? (
            isActivated ? (
              <div>
                <p>
                  Hi! {fullName}, welcome to the SprintCraft. Your account has
                  been activated successfuly.
                </p>
                <br/><br/>
                <p>
                  Redirecting you to login page.
                </p>
              </div>
            ) : (
              <p>Link has been expired.</p>
            )
          ) : (
            <p>
              Hi! {fullName}, welcome to the SprintCraft. Your account has been
              registered successfuly. Account validation link has been sent to
              your registered email.
              <br />
              <br />
              Click on the link shared to activate your account.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
