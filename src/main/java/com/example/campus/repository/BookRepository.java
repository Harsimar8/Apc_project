package com.example.campus.repository;

import com.example.campus.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD
=======
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
>>>>>>> 8dfc984df7925edb720360c4cd8c7229f3b9589d
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
<<<<<<< HEAD

    // Find books by issued status
    List<Book> findByIssued(boolean issued);

    // Find books issued to a specific student or user
    List<Book> findByIssuedTo(String issuedTo);


=======
    List<Book> findByTitleContainingIgnoreCase(String title);
    List<Book> findByAuthorContainingIgnoreCase(String author);
    List<Book> findByCategory(String category);
    List<Book> findByIsbn(String isbn);
    
    @Query("SELECT b FROM Book b WHERE b.availableCopies > 0")
    List<Book> findAvailableBooks();
    
    @Query("SELECT b FROM Book b WHERE b.title LIKE %:search% OR b.author LIKE %:search% OR b.isbn LIKE %:search%")
    List<Book> searchBooks(@Param("search") String search);
>>>>>>> 8dfc984df7925edb720360c4cd8c7229f3b9589d
}
