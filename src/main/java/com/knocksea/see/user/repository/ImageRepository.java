package com.knocksea.see.user.repository;

import com.knocksea.see.user.entity.SeaImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;

public interface ImageRepository extends JpaRepository<SeaImage,Long> {

}
