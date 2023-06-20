package com.knocksea.see.validation.entity;

import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@ToString
@EqualsAndHashCode(of = "eduId")
@NoArgsConstructor
@AllArgsConstructor
@Builder @Entity
@Table(name="sea_validation")
public class Validation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(length =10)
    private Long validationId;

    @Column(nullable = false, length = 50)
    private String validationSerial;

    @Column(nullable = false, length = 50)
    private String validationlicense;




}
