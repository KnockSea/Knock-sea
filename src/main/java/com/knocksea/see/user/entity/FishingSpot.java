package com.knocksea.see.user.entity;


import lombok.*;

import javax.persistence.*;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Builder
@Entity
@ToString(exclude = "user")
@Table(name = "fishing_spot")
public class FishingSpot {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "spot_id")
    private Long spotId;

    @Column(name = "spot_name", nullable = false)
    private String spotName;

    @Column(name = "spot_location", nullable = false)
    private String spotLocation;

    @Column(name = "spot_description", nullable = false)
    private String spotDescription;

    @Column(name = "spot_serial_number", nullable = false)
    private String spotSerialNumber;

    @Column(name = "spot_heart_count", nullable = false, columnDefinition = "int default 0")
    private int spotHeartCount;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
