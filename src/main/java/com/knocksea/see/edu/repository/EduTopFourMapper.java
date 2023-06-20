package com.knocksea.see.edu.repository;

import com.knocksea.see.edu.dto.response.EduTopFourListResponseDTO;

import java.util.List;

public interface EduTopFourMapper {
    List<EduTopFourListResponseDTO>  findLikeRank(); //좋아요가 많은 4개를 찾음


}
