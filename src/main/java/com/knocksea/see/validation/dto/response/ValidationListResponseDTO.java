package com.knocksea.see.validation.dto.response;

import com.knocksea.see.user.entity.User;
import com.knocksea.see.validation.entity.Validation;
import com.knocksea.see.validation.entity.ValidationStatus;
import com.knocksea.see.validation.entity.ValidationType;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Slf4j

public class ValidationListResponseDTO {
    private ValidationType validationType; //SHIP/SPOT

    private String validationShipRegi; //선박등록증 번호 //배 등록때만 사용

    private String validationShipLicense; //선박면허증 번호 //배 등록때만 사용

    private String validationBusinessRegi; //사업자 등록증 번호 //낚시터 등록때만 사용

    private ValidationStatus validationStatus; //YES,NO,WAIT

    private String userName;

    public ValidationListResponseDTO(Validation validation) {
        this.validationType=validation.getValidationType();
        this.validationShipRegi=validation.getValidationShipRegi();
        this.validationShipLicense=validation.getValidationShipLicense();
        this.validationBusinessRegi=validation.getValidationBusinessRegi();
        this.validationStatus=validation.getValidationStatus();
        this.userName=validation.getUser().getUserName();
    }
}
