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
    private Long userId;
    private String heartType;
    private Long eduId;
    private Long productId;

    public Heart toEntity(User user, Edu edu, Product product) {
        return Heart.builder()
                .heartType(HeartType.valueOf(this.heartType))
                .user(user)
                .edu(edu)
                .product(product)
                .build();
    }
}
