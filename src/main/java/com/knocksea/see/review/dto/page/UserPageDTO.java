package com.knocksea.see.review.dto.page;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode
public class UserPageDTO {


    private int page;
    private int size;

    public UserPageDTO() {
        this.page = 1;
        this.size = 3;
    }
}


