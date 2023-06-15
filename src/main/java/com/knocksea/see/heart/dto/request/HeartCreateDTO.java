package com.knocksea.see.heart.dto.request;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.heart.entity.Heart;
import com.knocksea.see.heart.entity.HeartType;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.user.entity.User;
import lombok.*;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HeartCreateDTO {

    private String heartType;
    private User user;
    private Edu edu;
    private Product product;

    public Heart toEntity() {
        return Heart.builder()
                .heartType(HeartType.valueOf(this.heartType))
                .user(this.user)
                .edu(this.edu)
                .product(this.product)
                .build();
    }
}
