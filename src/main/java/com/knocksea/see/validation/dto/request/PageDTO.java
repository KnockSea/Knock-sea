package com.knocksea.see.validation.dto.request;

import com.knocksea.see.validation.entity.ValidationStatus;
import com.knocksea.see.validation.entity.ValidationType;
import lombok.*;

import static com.knocksea.see.validation.entity.ValidationStatus.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode
public class PageDTO {

    private int page;
    private int size;
    private ValidationType type;
    private ValidationStatus  status;

    public PageDTO() {
        this.page = 1;
        this.size = 10;
        this.status = WAIT;
    }
}
