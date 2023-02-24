package com.youssefabidi.ecommerce.dao;

import com.youssefabidi.ecommerce.entity.Product;
import com.youssefabidi.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

//collectionResourceRel Name of entry Json path /product-category
//@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel ="productCategory",path="product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Long> {
}
