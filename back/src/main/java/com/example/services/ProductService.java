package com.example.services;

import com.example.exceptions.ProductNotFoundException;
import com.example.models.Product;
import com.example.repositories.ProductionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductionRepository productionRepository;

    public ProductService(ProductionRepository productionRepository) {
        this.productionRepository = productionRepository;
    }

    /**
     * method to get all products
     * @return all the products
     */
    public List<Product> getProducts(){
        return this.productionRepository.findAll();
    }

    /**
     * method to create product
     * @param newProduct
     * @return new Product added
     */
    public Product createProduct(Product newProduct){
        return this.productionRepository.save(newProduct);
    }

    /**
     * method to get product by id
     * @param id
     * @return product or ProductNotFoundException for invalid id
     */
    public Product getProductById(Long id){
        return this.productionRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Aucun produit trouvé avec l'id : "+id));
    }

    /**
     * method to update project
     * @param updatedProduct
     * @param id
     * @return updatedProduct or ProductNotFoundException for invalid id
     */
    public Product updateProduct(Product updatedProduct, Long id){
        return this.productionRepository.findById(id)
                .map(product -> {
                    product.setName(updatedProduct.getName());
                    product.setDescription(updatedProduct.getDescription());
                    product.setPrice(updatedProduct.getPrice());
                    product.setCategory(updatedProduct.getCategory());
                    return this.productionRepository.save(product);
                })
                .orElseThrow(() -> new ProductNotFoundException("Ce produit n'existe pas"));
    }

    /**
     * method to delete product by id if exist or throwing a ProductNotFoundException
     * @param id
     */
    public void deleteProductById(Long id){
        if(!this.productionRepository.existsById(id)){
            throw new ProductNotFoundException("Aucun produit trouvé avec ce id");
        };
        this.productionRepository.deleteById(id);
    }
}
