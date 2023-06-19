import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";

const Post = (props) => {
  const userAddress = props.userAddress;
  const setAddress = props.setAddress;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  const onCompletePost = (data) => {
    console.log("com", data.address);
    setAddress(data.address);
  };

  const postCodeStyle = {
    display: "block",
    position: "relative",
    width: "500px",
    height: "500px",
    zIndex: 100,
  };

  return (
    <>
      {isMounted && (
        <DaumPostcode
          style={postCodeStyle}
          onComplete={onCompletePost}
          autoClose
        />
      )}
    </>
  );
};

export default Post;
