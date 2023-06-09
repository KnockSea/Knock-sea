    package com.knocksea.see.review.entity;

    import com.knocksea.see.edu.entity.Edu;
    import com.knocksea.see.product.entity.Product;
    import com.knocksea.see.user.entity.User;
    import lombok.*;
    import org.hibernate.annotations.CreationTimestamp;

    import javax.persistence.*;
    import java.time.LocalDateTime;

    @Setter
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    @EqualsAndHashCode(of = {"reviewId"})
    @Builder
    @Table(name = "review")
    @Entity
    public class Review {

        @Id
        @Column(name = "review_id")
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long reviewId;

        @Column(name = "review_rating", nullable = false)
        private Double reviewRating;

        @Column(name = "review_content", nullable = false)
        private String reviewContent;

        @Column(name = "inquiry_date_time", nullable = false)
        @CreationTimestamp
        private LocalDateTime inquiryDateTime;

        @Enumerated(EnumType.STRING)
        @Column(name = "review_type", nullable = false)
        private ReviewType reviewType;

        @ToString.Exclude
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "user_id", nullable = false)
        private User user;

        @ToString.Exclude
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "edu_id")
        private Edu edu;

        @ToString.Exclude
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "product_id")
        private Product product;
    }
