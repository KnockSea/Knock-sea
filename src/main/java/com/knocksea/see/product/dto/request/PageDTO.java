package com.knocksea.see.product.dto.request;

import lombok.*;

@Setter @Getter
@AllArgsConstructor
@Builder
@ToString @EqualsAndHashCode
public class PageDTO {

    private int page;
    private int size;

    public PageDTO() {
        this.page = 1;
        this.size = 10;
    }
}
