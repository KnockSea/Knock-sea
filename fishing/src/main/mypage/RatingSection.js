import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import styled from "styled-components";

const RatingContainer = styled.div`
  display: flex;
  text-align: center;
  margin: 13px 0px;
  .inactive {
    color: #888888;
  }
  .active {
    color: coral;
  }
`;

const RatingStar = styled(AiFillStar)`
  cursor: pointer;
`;

const PIndex = styled.p`
  margin: 0 5px;
`;

function RatingSection({ ratingIndex, setRatingIndex }) {
  const ArrayIndexes = [1, 2, 3, 4, 5];

  return (
    <RatingContainer>
      {ArrayIndexes.map((arrayindex, index) => (
        <RatingStar
          size={35}
          key={`rating_${index}`}
          className={arrayindex <= ratingIndex ? 'active' : 'inactive'}
          onClick={() => setRatingIndex(arrayindex)}
        />
      ))}
      <PIndex>
        {ratingIndex === 5
          ? '아주 좋아요'
          : ratingIndex === 4
          ? '맘에 들어요'
          : ratingIndex === 3
          ? '보통이에요'
          : ratingIndex === 2
          ? '그냥 그래요'
          : '별로에요'}
      </PIndex>
    </RatingContainer>
  );
}

export default RatingSection;
