package com.knocksea.see.product.repository;

import com.knocksea.see.product.entity.Category;
import com.knocksea.see.product.entity.ProductCategory;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback(false)
class CategoryRepositoryTest {

    @Autowired
    CategoryRepository categoryRepository;


    @Test
    @DisplayName("카테고리 입력")
    void addCategory() {

        Category c1 = Category.builder()
                .categoryType(ProductCategory.SHIP)
                .build();

        Category c2 = Category.builder()
                .categoryType(ProductCategory.SPOT)
                .build();

        Category c3 = Category.builder()
                .categoryType(ProductCategory.EDU)
                .build();


        categoryRepository.save(c1);
        categoryRepository.save(c2);
        categoryRepository.save(c3);

    }

}