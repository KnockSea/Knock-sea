package com.knocksea.see.inquiry.service;

import com.knocksea.see.inquiry.dto.page.PageDTO;
import com.knocksea.see.inquiry.dto.page.PageResponseDTO;
import com.knocksea.see.inquiry.dto.request.InquiryCreateRequestDTO;
import com.knocksea.see.inquiry.dto.response.InquiryDetailResponseDTO;
import com.knocksea.see.inquiry.dto.response.InquiryListResponseDTO;
import com.knocksea.see.inquiry.dto.response.InquiryModifyDTO;
import com.knocksea.see.inquiry.entity.Inquiry;
import com.knocksea.see.inquiry.repository.InquiryRepository;
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

    public InquiryDetailResponseDTO getDetail(int inquiryId) {
        Inquiry inquiryEntity = getInquiry(inquiryId);

        return new InquiryDetailResponseDTO(inquiryEntity);
    }
    private Inquiry getInquiry(int inquiryId) {
        Inquiry inquiryEntity = inquiryRepository.findById(inquiryId)
                .orElseThrow(
                        () -> new RuntimeException(
                                inquiryId + "번 문의게시물이 존재하지 않습니다."
                        )
                );
        return inquiryEntity;
    }

    public InquiryDetailResponseDTO insert(final InquiryCreateRequestDTO dto)
        throws RuntimeException {

        Inquiry saved = inquiryRepository.save(dto.toEntity());


        return null;
    }

    public  InquiryDetailResponseDTO modify(final InquiryModifyDTO dto) {

        final Inquiry inquiryEntity = getInquiry(dto.getInquiryId());

        inquiryEntity.setInquiryDetails(dto.getInquiryDetails());

        Inquiry modifiedInquiry = inquiryRepository.save(inquiryEntity);

        return new InquiryDetailResponseDTO(modifiedInquiry);
    }

    public void delete(int inquiryId) throws RuntimeException, SQLException {
        inquiryRepository.deleteById(inquiryId);
    }
}
