package com.knocksea.see.validation.dto.request;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.validation.entity.Validation;
import com.knocksea.see.validation.entity.ValidationStatus;
import com.knocksea.see.validation.entity.ValidationType;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;

import static com.knocksea.see.validation.entity.ValidationStatus.WAIT;

@Getter @Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Builder @Slf4j
public class ValidationCreateDTO {
//    private Long userId;
    private ValidationType validationType; //SHIP/SPOT
    private String validationShipRegi; //선박등록증 번호 //배 등록때만 사용
    private String validationShipLicense; //선박면허증 번호 //배 등록때만 사용
    private String validationBusinessRegi; //사업자 등록증 번호 //낚시터 등록때만 사용

    public Validation toValidationEntity(User user) {

        return Validation.builder()
                .validationType(this.validationType)
                .validationShipRegi(this.validationShipRegi)
                .validationShipLicense(this.validationShipLicense)
                .validationBusinessRegi(this.validationBusinessRegi)
                .user(user)
                .build();
    }
}
