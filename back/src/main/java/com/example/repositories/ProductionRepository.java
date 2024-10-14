package com.example.repositories;

import com.example.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductionRepository extends JpaRepository<Product, Long> {
}
