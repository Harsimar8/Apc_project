package com.example.campus.entity;

import jakarta.persistence.*;
<<<<<<< HEAD
=======
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
>>>>>>> 8dfc984df7925edb720360c4cd8c7229f3b9589d
import java.time.LocalDateTime;

@Entity
@Table(name = "books")
public class Book {
<<<<<<< HEAD

=======
>>>>>>> 8dfc984df7925edb720360c4cd8c7229f3b9589d
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

<<<<<<< HEAD
    @Column(nullable = false)
    private String title;

    // Made optional so frontend doesn't need to send it
    @Column(nullable = true)
    private String author;

    @Column(nullable = true)
    private String isbn;

    @Column(nullable = true)
    private String category;

    @Column(nullable = false)
    private boolean issued = false;

    @Column(name = "issued_to")
    private String issuedTo; // This will store studentId from frontend

    @Column(name = "issued_at")
    private LocalDateTime issuedAt;

    @Column(name = "due_date")
    private LocalDateTime dueDate;

    @Column(name = "created_at", nullable = false)
=======
    @NotNull
    @Size(min = 3, max = 200)
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Size(min = 3, max = 200)
    @Column(name = "author", nullable = false)
    private String author;

    @NotNull
    @Size(min = 3, max = 50)
    @Column(name = "isbn", nullable = false, unique = true)
    private String isbn;

    @NotNull
    @Size(min = 3, max = 100)
    @Column(name = "category", nullable = false)
    private String category;

    @NotNull
    @Column(name = "total_copies", nullable = false)
    private Integer totalCopies;

    @NotNull
    @Column(name = "available_copies", nullable = false)
    private Integer availableCopies;

    @Column(name = "publisher")
    private String publisher;

    @Column(name = "publication_year")
    private Integer publicationYear;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "created_at")
>>>>>>> 8dfc984df7925edb720360c4cd8c7229f3b9589d
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

<<<<<<< HEAD
    // ------------------ Constructors ------------------
    public Book() {
        this.createdAt = LocalDateTime.now();
    }

    public Book(String title, String isbn, String category) {
        this.title = title;
        this.isbn = isbn;
        this.category = category;
        this.createdAt = LocalDateTime.now();
    }

    // ------------------ Getters and Setters ------------------
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public boolean isIssued() {
        return issued;
    }

    public void setIssued(boolean issued) {
        this.issued = issued;
    }

    public String getIssuedTo() {
        return issuedTo;
    }

    public void setIssuedTo(String issuedTo) {
        this.issuedTo = issuedTo;
    }

    public LocalDateTime getIssuedAt() {
        return issuedAt;
    }

    public void setIssuedAt(LocalDateTime issuedAt) {
        this.issuedAt = issuedAt;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
=======
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (availableCopies == null) {
            availableCopies = totalCopies;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Integer getTotalCopies() { return totalCopies; }
    public void setTotalCopies(Integer totalCopies) { this.totalCopies = totalCopies; }

    public Integer getAvailableCopies() { return availableCopies; }
    public void setAvailableCopies(Integer availableCopies) { this.availableCopies = availableCopies; }

    public String getPublisher() { return publisher; }
    public void setPublisher(String publisher) { this.publisher = publisher; }

    public Integer getPublicationYear() { return publicationYear; }
    public void setPublicationYear(Integer publicationYear) { this.publicationYear = publicationYear; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
>>>>>>> 8dfc984df7925edb720360c4cd8c7229f3b9589d
}
