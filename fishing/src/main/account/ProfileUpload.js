import React, { useState, useRef } from 'react';

const ProfileUpload = () => {
  const [profileImg, setProfileImg] = useState(
    'https://cdn-icons-png.flaticon.com/128/5599/5599433.png'
  );

  const handleProfileClick = () => {
    document.getElementById('profile-img').click();
  };

  const handleFileChange = (e) => {
    const fileData = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(fileData);

    reader.onloadend = () => {
      setProfileImg(reader.result);
    };
  };

  return (
    <div>
      <div className="profile" onClick={handleProfileClick}>
        <div className="thumbnail-box">
          <img src={profileImg} alt="프로필 썸네일" />
        </div>
        <label htmlFor="profile-img">프로필 이미지</label>
      </div>
      <input
        id="profile-img"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        name="clientProfileImage"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ProfileUpload;
