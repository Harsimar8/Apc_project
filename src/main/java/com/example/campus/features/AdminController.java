package com.example.campus.features;

import com.example.campus.entity.*;
import com.example.campus.repository.*;
import com.example.campus.user.User;
import com.example.campus.user.UserRepository;
import com.example.campus.user.Role;
<<<<<<< HEAD

import com.example.campus.entity.Book;
import com.example.campus.repository.BookRepository;
=======
>>>>>>> 8dfc984df7925edb720360c4cd8c7229f3b9589d
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

<<<<<<< HEAD

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalDate;
=======
import java.math.BigDecimal;
import java.time.LocalDateTime;
>>>>>>> 8dfc984df7925edb720360c4cd8c7229f3b9589d
import java.util.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;
<<<<<<< HEAD

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private AssignmentSubmissionRepository submissionRepository;

    @Autowired
    private MarkRepository markRepository;

    private final BookRepository bookRepository;

    public AdminController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }
    @Autowired
    private FeeRepository feeRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private FeedbackRepository feedbackRepository;



=======
    
    @Autowired
    private AttendanceRepository attendanceRepository;
    
    @Autowired
    private AssignmentRepository assignmentRepository;
    
    @Autowired
    private AssignmentSubmissionRepository submissionRepository;
    
    @Autowired
    private MarkRepository markRepository;
    
    @Autowired
    private FeeRepository feeRepository;
    
    @Autowired
    private NotificationRepository notificationRepository;
    
    @Autowired
    private FeedbackRepository feedbackRepository;
    
>>>>>>> 8dfc984df7925edb720360c4cd8c7229f3b9589d
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            // System statistics
            long totalStudents = userRepository.findAll().stream().filter(u -> u.getRole() == Role.STUDENT).count();
            long totalFaculty = userRepository.findAll().stream().filter(u -> u.getRole() == Role.FACULTY).count();
            long totalAssignments = assignmentRepository.count();
            long pendingFeedback = feedbackRepository.findPendingFeedback().size();
<<<<<<< HEAD

=======
            
>>>>>>> 8dfc984df7925edb720360c4cd8c7229f3b9589d
            // Fee statistics
            BigDecimal totalFeesCollected = feeRepository.findAll().stream()
                .filter(f -> f.getStatus() == Fee.PaymentStatus.PAID)
                .map(Fee::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
<<<<<<< HEAD

=======
            
>>>>>>> 8dfc984df7925edb720360c4cd8c7229f3b9589d
            BigDecimal pendingFees = feeRepository.findAll().stream()
                .filter(f -> f.getStatus() == Fee.PaymentStatus.PENDING)
                .map(Fee::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

            Map<String, Object> dashboard = new HashMap<>();
            dashboard.put("totalStudents", totalStudents);
            dashboard.put("totalFaculty", totalFaculty);
            dashboard.put("totalAssignments", totalAssignments);
            dashboard.put("pendingFeedback", pendingFeedback);
            dashboard.put("totalFeesCollected", totalFeesCollected);
            dashboard.put("pendingFees", pendingFees);
            dashboard.put("libraryBooks", 120); // Mock data
            dashboard.put("activeNotifications", notificationRepository.count());

            return ResponseEntity.ok(dashboard);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            List<User> users = userRepository.findAll();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    private String generateStudentId() {
        String year = String.valueOf(java.time.Year.now().getValue()).substring(2);
        long count = userRepository.count() + 1;
        return "STU" + year + String.format("%04d", count);
    }

<<<<<<< HEAD
    // ------------------ Library Management ------------------
    // ------------------ Library Management ------------------
    @GetMapping("/library/all")
    public ResponseEntity<List<Book>> getAllLibraryBooks() {
        try {
            return ResponseEntity.ok(bookRepository.findAll());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @PostMapping("/library")
    public ResponseEntity<?> issueBook(@RequestBody Map<String, Object> request) {

        System.out.println("Received payload: " + request);
        try {
            Book book = new Book();
            book.setTitle(request.get("title").toString());
            book.setIssued(true);
            book.setIssuedTo(request.get("studentId").toString());

            // ✅ Accept yyyy-MM-dd from frontend safely
            String dueDateStr = request.get("dueDate").toString();
            LocalDate dueDate = LocalDate.parse(dueDateStr);
            book.setDueDate(dueDate.atStartOfDay());

            book.setIssuedAt(LocalDateTime.now());
            book.setCreatedAt(LocalDateTime.now());
            book.setUpdatedAt(LocalDateTime.now());

            Book savedBook = bookRepository.save(book);
            return ResponseEntity.ok(Map.of("message", "Book issued successfully!", "book", savedBook));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/library/issued")
    public ResponseEntity<?> getIssuedBooks(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            User user = userRepository.findByUsername(userDetails.getUsername()).orElse(null);
            if (user == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "User not found"));
            }

            List<Book> issuedBooks = bookRepository.findByIssuedTo(String.valueOf(user.getId()));
            return ResponseEntity.ok(issuedBooks);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/library/{id}")
    public ResponseEntity<?> returnBook(@PathVariable Long id) {
        try {
            bookRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("message", "Book returned successfully!"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/notifications/{id}")
    public ResponseEntity<?> updateNotification(
            @PathVariable Long id,
            @RequestBody Notification request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return notificationRepository.findById(id).map(notification -> {
            notification.setTitle(request.getTitle());
            notification.setMessage(request.getMessage());
            notification.setTargetRole(request.getTargetRole());
            notification.setCreatedBy(userDetails.getUsername());
            notificationRepository.save(notification);
            return ResponseEntity.ok(Map.of("message", "Notification updated successfully"));
        }).orElse(ResponseEntity.status(404).body(Map.of("error", "Notification not found")));
    }

    @DeleteMapping("/notifications/{id}")
    public ResponseEntity<?> deleteNotification(@PathVariable Long id) {
        return notificationRepository.findById(id).map(notification -> {
            notificationRepository.delete(notification);
            return ResponseEntity.ok(Map.of("message", "Notification deleted successfully"));
        }).orElse(ResponseEntity.status(404).body(Map.of("error", "Notification not found")));
    }
=======
>>>>>>> 8dfc984df7925edb720360c4cd8c7229f3b9589d


    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody Map<String, Object> userData, @AuthenticationPrincipal UserDetails userDetails) {
        try {
            System.out.println("Incoming userData: " + userData);

            if (userRepository.existsByUsername(userData.get("username").toString())) {
                return ResponseEntity.badRequest().body(Map.of("error", "Username already exists"));
            }

            User user = new User();
            user.setUsername(userData.get("username").toString());
            user.setPassword(passwordEncoder.encode(userData.get("password").toString()));

            String roleStr = userData.get("role").toString().toUpperCase();
            Role role = Role.valueOf(roleStr);
            user.setRole(role);

            if (role == Role.STUDENT && (user.getStudentId() == null || user.getStudentId().isEmpty())) {
                String studentId = generateStudentId();
                user.setStudentId(studentId);
                System.out.println("Generated studentId: " + studentId);
            }


            userRepository.save(user);
            return ResponseEntity.ok(Map.of("message", "User created successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }



    @PutMapping("/users/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable Long userId, @RequestBody Map<String, Object> userData, @AuthenticationPrincipal UserDetails userDetails) {
        try {
            User user = userRepository.findById(userId).orElse(null);
            if (user == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "User not found"));
            }

            if (userData.get("username") != null) {
                user.setUsername(userData.get("username").toString());
            }
            if (userData.get("password") != null) {
                user.setPassword(passwordEncoder.encode(userData.get("password").toString()));
            }
            if (userData.get("role") != null) {
                user.setRole(Role.valueOf(userData.get("role").toString()));
            }

            userRepository.save(user);
            return ResponseEntity.ok(Map.of("message", "User updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId, @AuthenticationPrincipal UserDetails userDetails) {
        try {
            User user = userRepository.findById(userId).orElse(null);
            if (user == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "User not found"));
            }

            userRepository.delete(user);
            return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/attendance/reports")
    public ResponseEntity<?> getAttendanceReports(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            List<Attendance> allAttendance = attendanceRepository.findAll();
            return ResponseEntity.ok(allAttendance);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/marks/reports")
    public ResponseEntity<?> getMarksReports(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            List<Mark> allMarks = markRepository.findAll();
            return ResponseEntity.ok(allMarks);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/fees/reports")
    public ResponseEntity<?> getFeesReports(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            List<Fee> allFees = feeRepository.findAll();
            return ResponseEntity.ok(allFees);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/assignments/reports")
    public ResponseEntity<?> getAssignmentsReports(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            List<Assignment> allAssignments = assignmentRepository.findAll();
            return ResponseEntity.ok(allAssignments);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/feedback")
    public ResponseEntity<?> getAllFeedback(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            List<Feedback> allFeedback = feedbackRepository.findAll();
            return ResponseEntity.ok(allFeedback);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/feedback/{feedbackId}/respond")
    public ResponseEntity<?> respondToFeedback(@PathVariable Long feedbackId, @RequestBody Map<String, String> response, @AuthenticationPrincipal UserDetails userDetails) {
        try {
            Feedback feedback = feedbackRepository.findById(feedbackId).orElse(null);
            if (feedback == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Feedback not found"));
            }

            feedback.setAdminResponse(response.get("response"));
            feedback.setRespondedBy(userDetails.getUsername());
            feedback.setRespondedAt(LocalDateTime.now());
            feedback.setStatus(Feedback.Status.RESOLVED);

            feedbackRepository.save(feedback);
            return ResponseEntity.ok(Map.of("message", "Response added successfully"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/notifications")
    public ResponseEntity<?> createNotification(@RequestBody Map<String, Object> notificationData, @AuthenticationPrincipal UserDetails userDetails) {
        try {
            Notification notification = new Notification();
            notification.setTitle(notificationData.get("title").toString());
            notification.setMessage(notificationData.get("message").toString());
            notification.setCreatedBy(userDetails.getUsername());
            notification.setTargetRole(Notification.TargetRole.valueOf(notificationData.get("targetRole").toString()));

            notificationRepository.save(notification);
            return ResponseEntity.ok(Map.of("message", "Notification created successfully"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/notifications")
    public ResponseEntity<?> getAllNotifications(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            List<Notification> notifications = notificationRepository.findAll();
            return ResponseEntity.ok(notifications);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/fees")
    public ResponseEntity<?> createFee(@RequestBody Map<String, Object> feeData, @AuthenticationPrincipal UserDetails userDetails) {
        try {
            Fee fee = new Fee();
            fee.setStudentId(Long.valueOf(feeData.get("studentId").toString()));
            fee.setFeeType(Fee.FeeType.valueOf(feeData.get("feeType").toString()));
            fee.setAmount(new BigDecimal(feeData.get("amount").toString()));
            fee.setDueDate(LocalDateTime.parse(feeData.get("dueDate").toString()));

            feeRepository.save(fee);
            return ResponseEntity.ok(Map.of("message", "Fee created successfully"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/analytics")
    public ResponseEntity<?> getAnalytics(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            Map<String, Object> analytics = new HashMap<>();
<<<<<<< HEAD

=======
            
>>>>>>> 8dfc984df7925edb720360c4cd8c7229f3b9589d
            // Attendance analytics
            long totalAttendanceRecords = attendanceRepository.count();
            long presentCount = attendanceRepository.findAll().stream()
                .filter(a -> a.getStatus() == Attendance.AttendanceStatus.PRESENT)
                .count();
<<<<<<< HEAD

=======
            
>>>>>>> 8dfc984df7925edb720360c4cd8c7229f3b9589d
            // Marks analytics
            List<Mark> allMarks = markRepository.findAll();
            double averageMarks = allMarks.stream()
                .mapToInt(Mark::getMarksObtained)
                .average()
                .orElse(0.0);
<<<<<<< HEAD

=======
            
>>>>>>> 8dfc984df7925edb720360c4cd8c7229f3b9589d
            // Fee analytics
            BigDecimal totalFees = feeRepository.findAll().stream()
                .map(Fee::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
<<<<<<< HEAD

=======
            
>>>>>>> 8dfc984df7925edb720360c4cd8c7229f3b9589d
            analytics.put("totalAttendanceRecords", totalAttendanceRecords);
            analytics.put("attendancePercentage", totalAttendanceRecords > 0 ? (presentCount * 100.0 / totalAttendanceRecords) : 0.0);
            analytics.put("averageMarks", Math.round(averageMarks * 100.0) / 100.0);
            analytics.put("totalFees", totalFees);
            analytics.put("totalStudents", userRepository.findAll().stream().filter(u -> u.getRole() == Role.STUDENT).count());
            analytics.put("totalFaculty", userRepository.findAll().stream().filter(u -> u.getRole() == Role.FACULTY).count());

            return ResponseEntity.ok(analytics);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }
}


