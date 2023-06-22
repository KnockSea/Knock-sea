package com.knocksea.see.validation.dto.response;

import com.knocksea.see.user.entity.User;
import com.knocksea.see.validation.entity.Validation;
import com.knocksea.see.validation.entity.ValidationType;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@EqualsAndHashCode
public class ValidationRegisterResponseDTO {

    private Long userId;
    private ValidationType validationType; //SHIP/SPOT
    private String validationShipRegi; //선박등록증 번호 //배 등록때만 사용
    private String validationShipLicense; //선박면허증 번호 //배 등록때만 사용
    private String validationBusinessRegi; //사업자 등록증 번호 //낚시터 등록때만 사용



    public ValidationRegisterResponseDTO(Validation savedValidation) {
        System.out.println("savedValidation : "+savedValidation);

        this.userId=savedValidation.getUser().getUserId();

        this.validationType=savedValidation.getValidationType();

        if(savedValidation.getValidationShipRegi()!=null){
            this.validationShipRegi=savedValidation.getValidationShipRegi();
        }
        if(savedValidation.getValidationShipLicense()!=null){
            this.validationShipLicense=savedValidation.getValidationShipLicense();
        }
        if(savedValidation.getValidationBusinessRegi()!=null){
            this.validationBusinessRegi=savedValidation.getValidationBusinessRegi();
        }

    }
}
