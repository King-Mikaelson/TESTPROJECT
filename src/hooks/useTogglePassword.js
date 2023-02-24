import React, { useState } from "react";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";

const useTogglePassword = () => {
  const [visible, setVisibility] = useState(false);

  const Icon = visible ? (
    <AiFillEyeInvisible
      size={25}
      onClick={() => setVisibility((visiblity) => !visiblity)}
    />
  ) : (
    <AiFillEye
      size={25}
      onClick={() => setVisibility((visiblity) => !visiblity)}
    />
  );

  const InputType = visible ? "text" : "password";

  return [InputType, Icon];
};

export default useTogglePassword;
