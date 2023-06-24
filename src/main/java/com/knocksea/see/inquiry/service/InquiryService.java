package com.knocksea.see.inquiry.service;

import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.inquiry.dto.page.PageDTO;
import com.knocksea.see.inquiry.dto.page.PageResponseDTO;
import com.knocksea.see.inquiry.dto.request.InquiryCreateRequestDTO;
import com.knocksea.see.inquiry.dto.response.InquiryDetailResponseDTO;
import com.knocksea.see.inquiry.dto.response.InquiryListResponseDTO;
import com.knocksea.see.inquiry.dto.request.InquiryModifyDTO;
import com.knocksea.see.inquiry.entity.Inquiry;
import com.knocksea.see.inquiry.repository.InquiryRepository;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class InquiryService {

    private final InquiryRepository inquiryRepository;
    private final UserRepository userRepository;

    public InquiryListResponseDTO getInquiries(PageDTO dto) {

        PageRequest pageable = PageRequest.of(
                dto.getPage() - 1,
                dto.getSize(),
                Sort.by("inquiryDateTime").descending()
        );

        Page<Inquiry> inquiries = inquiryRepository.findAll(pageable);

        List<Inquiry> inquiryList = inquiries.getContent();



        List<InquiryDetailResponseDTO> detailList = inquiryList.stream()
                .map(InquiryDetailResponseDTO::new)
                .collect(Collectors.toList());

        log.info("detailList - {}", detailList);

        return InquiryListResponseDTO.builder()
                .count(inquiryList.size())
                .pageInfo(new PageResponseDTO<Inquiry>(inquiries))
                .inquiries(detailList)
                .build();
    }


    public InquiryListResponseDTO getDetail(Long tokenUserId, PageDTO pageDTO) {

        PageRequest pageable = PageRequest.of(
                pageDTO.getPage() - 1,
                pageDTO.getSize(),
                Sort.by("inquiryDateTime").descending()
        );



        User user = userRepository.findById(tokenUserId).orElseThrow(() -> {
            throw new RuntimeException("해당유저는 존재하지않습니다");
        });

            Page<Inquiry> byUser = inquiryRepository.findByUser(user, pageable);
            List<Inquiry> inquiryList = byUser.getContent();
            List<InquiryDetailResponseDTO> detailList= inquiryList.stream()
                    .map(InquiryDetailResponseDTO::new)
                    .collect(Collectors.toList());


        return InquiryListResponseDTO.builder()
                .count(inquiryList.size())
                .pageInfo(new PageResponseDTO<Inquiry>(byUser))
                .inquiries(detailList)
                .build();
    }
    private Inquiry getInquiry(Long inquiryId) {
        Inquiry inquiryEntity = inquiryRepository.findById(inquiryId)
                .orElseThrow(
                        () -> new RuntimeException(
                                inquiryId + "번 문의게시물이 존재하지 않습니다."
                        )
                );
        return inquiryEntity;
    }
    public InquiryDetailResponseDTO findByInquiry(Long inquiryId) {
        Inquiry inquiry = inquiryRepository.findById(inquiryId).orElseThrow();
        InquiryDetailResponseDTO dto = new InquiryDetailResponseDTO(inquiry);
        return dto;
    }

    public InquiryDetailResponseDTO insert(final InquiryCreateRequestDTO dto, final TokenUserInfo userInfo)
        throws RuntimeException {
        User user = userRepository.findById(userInfo.getUserId()).orElseThrow(() -> new RuntimeException("회원 정보가 없습니다."));
        Inquiry saved = inquiryRepository.save(dto.toEntity(user));

        return new InquiryDetailResponseDTO(saved);
    }

    public  InquiryDetailResponseDTO modify(final InquiryModifyDTO dto, Long userId) {

        Inquiry modifiedInquiry = null;
        User user = userRepository.findById(userId).orElseThrow();
        final Inquiry inquiryEntity = getInquiry(dto.getInquiryId());

        if (inquiryEntity.getUser().getUserId().equals(userId)){
        inquiryEntity.setUser(user);
        inquiryEntity.setInquiryDetails(dto.getInquiryDetails());
        modifiedInquiry = inquiryRepository.save(inquiryEntity);
        }

        return new InquiryDetailResponseDTO(modifiedInquiry);
    }

    public void delete(Long inquiryId, Long userId) throws RuntimeException, SQLException {

        try {
            Inquiry inquiry = inquiryRepository.findById(inquiryId).orElseThrow();
            if (inquiry.getUser().getUserId().equals(userId)){
            inquiryRepository.deleteById(inquiryId);
            }
        } catch (Exception e) {
            log.error("id가 존재하지 않아 삭제에 실패했습니다. - ID: {}, err: {}"
                , inquiryId, e.getMessage());
            throw new RuntimeException("id가 존재하지 않아 삭제에 실패했습니다.");

        }
    }


}
