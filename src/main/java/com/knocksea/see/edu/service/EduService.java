package com.knocksea.see.edu.service;

import com.knocksea.see.edu.dto.response.EduModifyDTO;
import com.knocksea.see.edu.dto.request.EduCreateDTO;
import com.knocksea.see.edu.dto.response.EduDetailResponseDTO;
import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.edu.repository.EduRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class EduService {

    private final EduRepository eduRepository;

    //전체 조회
    public void getAllEdu() {
        List<Edu> allEdu = eduRepository.findAll();
    }

    //개별 조회
    public EduDetailResponseDTO getDetail(Integer eduId) {
        Edu edu = getEdu(eduId);

        return new EduDetailResponseDTO(edu);
    }

    //클래스 저장
    public EduDetailResponseDTO insert(final EduCreateDTO dto) throws RuntimeException{
        //entity로 변환해서 저장
        Edu saved = eduRepository.save(dto.toEntity());

        return new EduDetailResponseDTO(saved);
    }

    //클래스 수정
    public EduDetailResponseDTO modify(final EduModifyDTO dto) throws RuntimeException{


        final Edu eduEntity=getEdu(dto.getEduId());

        eduEntity.update(dto);

        Edu modifiedEdu = eduRepository.save(eduEntity);

        return new EduDetailResponseDTO(modifiedEdu);
    }

    private Edu getEdu(Integer eduId){
        return eduRepository.findById(eduId)
                .orElseThrow(
                        () -> new RuntimeException(
                                eduId + "번 게시물이 존재하지 않습니다!"
                        )
                );
    }

    //삭제
    public void delete(Integer eduId) throws RuntimeException{
        eduRepository.deleteById(eduId);
    }
}
