import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { PlusOutlined } from "@ant-design/icons";

export default function AddList({
  placeholder,
  value,
  onChange,
  onPressEnter,
  onPressEscape,
}) {
  function onKeyPress(e) {
    if (e.key === "Enter") {
      onPressEnter();
    }

    if (e.key === "Escape") {
      onPressEscape();
    }
  }

  return (
    <AddListWrapper>
      <PlusOutlined
        style={PlusOutlinedStyled}
      />
      <InputWrapper
        placeholder={placeholder}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e)}
        onKeyPress={(e) => onKeyPress(e)}
      />
    </AddListWrapper>
  )
}

const AddListWrapper = styled.div`
  height: 40px;
  display: grid;
  grid-template-columns: 40px auto;

  &:focus-within {
    background-color: #FFFFFF;
  }
`

const InputWrapper = styled.input`
  padding: 0;
  color: #DA291C;
  background: none;
  border: none;
  font-size: 15px;

  &::placeholder {
    color: #DA291C;
  }

  &:focus {
    outline: none;
    color: #27251F;
  }
`

const PlusOutlinedStyled = {
  color: "#27251F",
  fontSize: "15px",
  margin: "12.5px",
}

AddList.propTypes = {
  placeholder: PropTypes.string,
  categories: PropTypes.array,
  onSelect: PropTypes.func,
};
