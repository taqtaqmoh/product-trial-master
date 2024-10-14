package com.example.controllers;

import com.example.exceptions.ErrorResponse;
import com.example.exceptions.ProductNotFoundException;
import com.example.models.Product;
import com.example.services.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    /**
     * Get All products
     * @return à list of products
     */
    @GetMapping("/products")
    List<Product> GetProducts(){
        return this.productService.getProducts();
    }

    /**
     * Create a product
     * @param newProduct
     * @return the product created
     */
    @PostMapping("/products")
    Product createProduct(@RequestBody Product newProduct){
        return this.productService.createProduct(newProduct);
    }

    /**
     * Get Product by Id
     * @param id
     * @return product or ProductNotFoundException for invalid id
     */
    @GetMapping("/products/{id}")
    Product getProductById(@PathVariable Long id){
        return this.productService.getProductById(id);
    }

    /**
     * Update product using id
     * @param updatedProduct
     * @param id
     * @return product updated or ProductNotFoundException for invalid id
     */
    @PatchMapping("/products/{id}")
    Product replaceProduct(@RequestBody Product updatedProduct, @PathVariable Long id){
        return this.productService.updateProduct(updatedProduct, id);
    }

    /**
     * Delete product by id
     * @param id
     */
    @DeleteMapping("/products/{id}")
    void deleteProductById(@PathVariable Long id){
        this.productService.deleteProductById(id);
    }


    @ExceptionHandler(value = ProductNotFoundException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorResponse handleCustomerAlreadyExistsException(ProductNotFoundException ex) {
        return new ErrorResponse(HttpStatus.CONFLICT.value(), ex.getMessage());
    }
}
