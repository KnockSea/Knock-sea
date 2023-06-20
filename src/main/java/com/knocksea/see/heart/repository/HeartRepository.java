package com.knocksea.see.heart.repository;

import com.knocksea.see.edu.dto.response.EduTopFourListResponseDTO;
import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.heart.entity.Heart;
import com.knocksea.see.heart.entity.HeartType;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.persistence.TypedQuery;

import java.util.List;

public interface HeartRepository extends JpaRepository<Heart, Long> {
    boolean existsByUserAndHeartTypeAndEduOrProduct(User user, HeartType heartType, Edu edu, Product product);


/*    @Query(value = "SELECT edu_id FROM sea_like GROUP BY edu_id ORDER BY COUNT(edu_id) DESC)", nativeQuery = true)
    TypedQuery<Heart> findLikeRank();*/
    //제품으로 좋아요 리스트 뽑아오는 기능
    @Query("SELECT h FROM Heart h WHERE h.product = :product")
    List<Heart> findByProduct(Product product);


//    @Query(value = "SELECT distinct * FROM sea_like e JOIN sea_product_edu h GROUP BY e.edu_id ORDER BY COUNT(e.edu_id) desc limit 0,4", nativeQuery = true)
/*    @Query(value = "select count(spe.edu_id) as like_cnt,\n" +
            "\tspe.edu_id, spe.edu_full_address, spe.edu_level,\n" +
            "\tspe.edu_price, spe.edu_title, spe.user_id\n" +
            "\tfrom sea_product_edu spe  \n" +
            "\tleft join sea_like sl\n" +
            "\ton spe.edu_id = sl.edu_id group by spe.edu_id\n" +
            "\torder by like_cnt desc limit 0, 4;",nativeQuery = true)*/
    @Query(value = "SELECT COUNT(spe.edu_id) AS likeCnt,\n" +
            "    spe.edu_id, spe.edu_full_address, spe.edu_level,\n" +
            "    spe.edu_price, spe.edu_title, spe.user_id\n" +
            "FROM sea_product_edu spe\n" +
            "LEFT JOIN sea_like sl\n" +"on spe.edu_id = sl.edu_id\n"+
            "GROUP BY spe.edu_id\n" +
            "ORDER BY likeCnt DESC limit 0, 4", nativeQuery = true)
    List<EduTopFourListResponseDTO> findLikeRank();

}
