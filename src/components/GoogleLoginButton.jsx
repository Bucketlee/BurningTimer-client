import React from "react";
import GoogleLogin from "react-google-login";

const clientId = "356001383274-hs87hlcdvsnn20tinth6bjglq9c558rp.apps.googleusercontent.com";

export default function GoogleLoginButton({ onSocial, onFail }) {
  const onSuccess = async (response) => {
    const { googleId, profileObj : { email, name } } = response;

    await onSocial({
      socialId : googleId,
      socialType : "google",
      email,
      nickname : name,
    });
  }

  const onFailure = (err) => {
    onFail(err);
  }

  return(
    <div>
      <GoogleLogin
        clientId={clientId}
        responseType={"id_token"}
        buttonText="구글로 로그인하기"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
}
