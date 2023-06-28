package com.knocksea.see.validation.dto.request;

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
public class validationModifyRequestDTO {
    private String userName;

    private Long userId;

    private ValidationType validationType;

    private ValidationStatus validationStatus;
}
