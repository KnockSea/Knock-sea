package com.knocksea.see.user.service;

import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.product.entity.ProductCategory;
import com.knocksea.see.user.entity.SeaImage;
import com.knocksea.see.user.entity.Ship;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.repository.ImageRepository;
import com.knocksea.see.user.repository.ShipRepository;
import com.knocksea.see.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ImageService {


    //배정보 얻기용
    private final ShipRepository shipRepository;

    //이미지 저장용
    private final ImageRepository imageRepository;
    private final UserRepository userRepository;

    @Value("${upload.path}")
    private String uploadRootPath2;

    public void saveShipImages(List<MultipartFile> shipImages, TokenUserInfo userInfo) throws IOException {

        User user = userRepository.findById(userInfo.getUserId()).orElseThrow(() -> new RuntimeException("유저 없어 새꺄"));
        Ship foundShipByUserId = shipRepository.findByUser(user);

        List<String> strings = uploadProfileImage(shipImages);

        for (String string : strings) {
            SeaImage save = imageRepository.save(SeaImage
                    .builder()
                    .imageName(string)
                    .ship(foundShipByUserId)
                    .imageType(ProductCategory.SHIP).build());
        }

    }

    public List<String> uploadProfileImage(List<MultipartFile> shipImages) throws IOException {
        //루트 디렉토리가 존재하는지 확인후 존재하지않으면 생성하는 코드
        List<String> uniqueFilenames = new ArrayList<>();

        File rootDir = new File(uploadRootPath2);
            if (!rootDir.exists()) {
                rootDir.mkdir();
            }

        for (MultipartFile shipImage : shipImages) {
            String originalFilename = shipImage.getOriginalFilename();
            String uniqueFileName = UUID.randomUUID() + "_" + originalFilename;

            // Save the file
            File uploadFile = new File(uploadRootPath2 + "/" +  "ship"  +uniqueFileName);
            shipImage.transferTo(uploadFile);

            uniqueFilenames.add(uniqueFileName);

        }


        return uniqueFilenames;

    }
}
