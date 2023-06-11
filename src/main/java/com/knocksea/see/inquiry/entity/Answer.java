package com.knocksea.see.inquiry.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Setter
@Getter
@ToString
@EqualsAndHashCode(of = {"answerId"})
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "inquiry_answer")
@Entity
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "answer_id")
    private Long answerId;

    @Column(name = "answer_details", nullable = false)
    private String answerDetails;

    @Column(name = "answer_date_time", nullable = false)
    @CreationTimestamp
    private LocalDateTime answerDateTime;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "inquiry_id", nullable = false) // pk 컬럼명
    private Inquiry inquiry;

//    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JoinColumn(name = "user_id", nullable = false)
//    private User user;

    @Column(name = "inquiry_id", nullable = false, insertable = false, updatable = false)
    private Long inquiryId;

    @Column(name = "user_id", nullable = false)
    private Long userId;
}
