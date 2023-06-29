//package com.knocksea.see.validation.repository;
//
//import com.knocksea.see.product.entity.ProductCategory;
//import com.knocksea.see.user.entity.User;
//import com.knocksea.see.user.repository.UserRepository;
//import com.knocksea.see.validation.dto.request.PageDTO;
//import com.knocksea.see.validation.entity.Validation;
//import com.knocksea.see.validation.entity.ValidationType;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Sort;
//import org.springframework.test.annotation.Rollback;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.List;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//@Transactional
//@Rollback(value = false)
//class ValidationRepositoryTest {
//    @Autowired
//    UserRepository userRepository;
//    @Autowired
//    ValidationRepository validationRepository;
//    @Test
//    @DisplayName("1번 유저가 예약한 타입은 SHIP 타입이어야 한다")
//    void validationTest() {
//        //given
//        User user = userRepository.findById(1L).orElseThrow();
//        validationRepository.findByUserAndValidationType(user, ValidationType.SHIP);
//        //when
//
//        //then
//    }
//    @Test
//    @DisplayName("검증상태가 WAIT인 검증리스트가 전부나와야한다")
//    void validationListTest(){
//
//        PageDTO dto = new PageDTO();
//        dto.setType(String.valueOf(ValidationType.SHIP));
//        PageRequest pageable = PageRequest.of(
//                dto.getPage()-1,
//                dto.getSize(),
//                Sort.by("createDate").descending()
//        );
//
//        Page<Validation> allByTypeAndStatus = validationRepository.findAllByTypeAndStatus(pageable, dto.getType());
//
//        List<Validation> content = allByTypeAndStatus.getContent();
//
//        System.out.println("\n\n\n\n\n\n\n\n\n\n");
//
//        System.out.println(content);
//    }
//
//
//}
