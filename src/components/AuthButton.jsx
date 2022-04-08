import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

export default function AuthButton({ text, type, onClick, color, backgroundColor }) {
  return (
    <AuthButtonWrapper color={color} backgroundColor={backgroundColor}
      type={type}
      onSubmit={(e) => {
        e.preventDefault();
        onClick();
      }}
      onClick={() => onClick()}
    >
      {text}
    </AuthButtonWrapper>
  );
};

const AuthButtonWrapper = styled.button`
  padding: 0;
  border: none;
  font-size: 20px;
  font-weight: 600;
  width: 100%;
  max-width: 535px;
  height: 70px;
  color: ${props => props.color ? props.color : "#FFFFFF" };
  background-color: ${props => props.backgroundColor ? props.backgroundColor : "#DA291C" };

  @media screen and (max-width:1023px) {
    font-size: 18px;
    height: 60px;
  }

  @media screen and (max-width:767px) {
    font-size: 16px;
    height: 50px;
  }
`

AuthButton.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
};
