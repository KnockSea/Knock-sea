import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";

const Post = ({getAddress}) => {
  // const userAddress = props.userAddress;
  // const setAddress = props.setAddress;

  const [address, setAddress] = useState('');
    const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  const onCompletePost = (data) => {
    // console.log("com", data.address);
    getAddress(data.address);
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
      <div>
      {isMounted && (
        <DaumPostcode
          style={postCodeStyle}
          onComplete={onCompletePost}
          autoClose
        />
        )}
        </div>
    </>
  );
};

export default Post;