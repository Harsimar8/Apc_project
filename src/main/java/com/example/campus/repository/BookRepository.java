package com.example.campus.repository;

import com.example.campus.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    // Find books by issued status
    List<Book> findByIssued(boolean issued);

    // Find books issued to a specific student or user
    List<Book> findByIssuedTo(String issuedTo);


}
