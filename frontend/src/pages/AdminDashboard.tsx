import { useState, useEffect } from 'react'
import api from '../utils/api'

export default function AdminDashboard() {
	const [dashboard, setDashboard] = useState<any>(null)
	const [loading, setLoading] = useState(true)
	const [activeTab, setActiveTab] = useState('overview')

	useEffect(() => {
		fetchDashboard()
	}, [])

	const fetchDashboard = async () => {
		try {
			const res = await api.get('/admin/dashboard')
			setDashboard(res.data)
		} catch (err) {
			console.error('Failed to fetch dashboard:', err)
		} finally {
			setLoading(false)
		}
	}

	if (loading) return (
		<div className="loading-container">
			<div className="loading-spinner"></div>
			<p>Loading dashboard...</p>
		</div>
	)

	const tabs = [
		{ id: 'overview', label: 'Overview', icon: '📊' },
		{ id: 'users', label: 'User Management', icon: '👥' },
		{ id: 'reports', label: 'Reports', icon: '📈' },
		{ id: 'feedback', label: 'Feedback', icon: '💬' },
		{ id: 'notifications', label: 'Notifications', icon: '🔔' },
<<<<<<< HEAD
		{ id: 'analytics', label: 'Analytics', icon: '📊' },
		{ id: 'library', label: 'Library Management', icon: '📚' }

=======
		{ id: 'analytics', label: 'Analytics', icon: '📊' }
>>>>>>> 8dfc984df7925edb720360c4cd8c7229f3b9589d
	]

	return (
		<div className="dashboard-container">
			<div className="dashboard-header">
				<h1>Admin Dashboard</h1>
				<div className="user-info">
					<span className="welcome">System Administration</span>
				</div>
			</div>

			<div className="dashboard-tabs">
				{tabs.map(tab => (
					<button
						key={tab.id}
						className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
						onClick={() => setActiveTab(tab.id)}
					>
						<span className="tab-icon">{tab.icon}</span>
						{tab.label}
					</button>
				))}
			</div>

			<div className="dashboard-content">
				{activeTab === 'overview' && (
					<div className="overview-grid">
						<div className="stat-card primary">
							<div className="stat-icon">👥</div>
							<div className="stat-content">
								<h3>Total Students</h3>
								<p className="stat-value">{dashboard?.totalStudents || 0}</p>
							</div>
						</div>
						<div className="stat-card success">
							<div className="stat-icon">👨‍🏫</div>
							<div className="stat-content">
								<h3>Total Faculty</h3>
								<p className="stat-value">{dashboard?.totalFaculty || 0}</p>
							</div>
						</div>
						<div className="stat-card warning">
							<div className="stat-icon">📝</div>
							<div className="stat-content">
								<h3>Total Assignments</h3>
								<p className="stat-value">{dashboard?.totalAssignments || 0}</p>
							</div>
						</div>
						<div className="stat-card info">
							<div className="stat-icon">💰</div>
							<div className="stat-content">
								<h3>Fees Collected</h3>
								<p className="stat-value">${dashboard?.totalFeesCollected || 0}</p>
								<small>Pending: ${dashboard?.pendingFees || 0}</small>
							</div>
						</div>
						<div className="stat-card secondary">
							<div className="stat-icon">💬</div>
							<div className="stat-content">
								<h3>Pending Feedback</h3>
								<p className="stat-value">{dashboard?.pendingFeedback || 0}</p>
							</div>
						</div>
						<div className="stat-card tertiary">
							<div className="stat-icon">📚</div>
							<div className="stat-content">
								<h3>Library Books</h3>
								<p className="stat-value">{dashboard?.libraryBooks || 0}</p>
							</div>
						</div>
					</div>
				)}

				{activeTab === 'users' && <UserManagement />}
				{activeTab === 'reports' && <ReportsManagement />}
				{activeTab === 'feedback' && <FeedbackManagement />}
				{activeTab === 'notifications' && <NotificationManagement />}
				{activeTab === 'analytics' && <AnalyticsManagement />}
<<<<<<< HEAD
				{activeTab === 'library' && <LibraryManagement />}

=======
>>>>>>> 8dfc984df7925edb720360c4cd8c7229f3b9589d
			</div>
		</div>
	)
}

function UserManagement() {
<<<<<<< HEAD
  const [users, setUsers] = useState<any[]>([])
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    role: 'STUDENT'
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users')
      setUsers(res.data)
    } catch (err) {
      console.error('Failed to fetch users:', err)
    } finally {
      setLoading(false)
    }
  }

  // ✅ Correct handleSubmit for user creation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')

    if (!newUser.username.trim() || !newUser.password.trim()) {
      setMessage('Username and password cannot be empty')
      setSubmitting(false)
      return
    }

    try {
      const payload = {
        username: newUser.username.trim(),
        password: newUser.password.trim(),
        role: newUser.role
      }

      await api.post('/admin/users', payload)

      setMessage('User created successfully!')
      setNewUser({ username: '', password: '', role: 'STUDENT' })
      fetchUsers()
    } catch (err: any) {
      console.error('Error creating user:', err.response || err)
      setMessage(
        err.response?.data?.error ||
        'Failed to create user'
      )
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return

    try {
      await api.delete(`/admin/users/${id}`)
      setMessage('User deleted successfully!')
      fetchUsers()
    } catch (err: any) {
      console.error('Failed to delete user:', err.response || err)
      setMessage(err.response?.data?.error || 'Failed to delete user')
    }
  }

  if (loading) return <div className="loading">Loading users...</div>

  return (
    <div className="tab-content">
      <h2>User Management</h2>

      <div className="user-form-section">
        <h3>Create New User</h3>
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-row">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="STUDENT">Student</option>
                <option value="FACULTY">Faculty</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={submitting} className="submit-button">
            {submitting ? 'Creating...' : 'Create User'}
          </button>
          {message && <div className="message">{message}</div>}
        </form>
      </div>

      <div className="users-list">
        <h3>All Users</h3>
        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>
                    <span className={`role-badge ${user.role.toLowerCase()}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
=======
	const [users, setUsers] = useState<any[]>([])
	const [newUser, setNewUser] = useState({
		username: '',
		password: '',
		role: 'STUDENT'
	})
	const [loading, setLoading] = useState(true)
	const [submitting, setSubmitting] = useState(false)
	const [message, setMessage] = useState('')

	useEffect(() => {
		fetchUsers()
	}, [])

	const fetchUsers = async () => {
		try {
			const res = await api.get('/admin/users')
			setUsers(res.data)
		} catch (err) {
			console.error('Failed to fetch users:', err)
		} finally {
			setLoading(false)
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setSubmitting(true)
      setMessage('')

      try {
        const payload = {
          username: newUser.username,
          password: newUser.password,
          role: newUser.role
          // ✅ Do NOT include studentId
        }

        console.log('Submitting user:', newUser)
        console.log('Sending payload:', payload)

        await api.post('/admin/users', payload)
        console.log('Form submitted')


        setMessage('User created successfully!')
        setNewUser({
          username: '',
          password: '',
          role: 'STUDENT'
        })

        fetchUsers()
      } catch (err) {
        console.error('Error creating user:', err)
        setMessage('Failed to create user')
      } finally {
        setSubmitting(false)
      }
    }




	const handleDelete = async (userId: number) => {
		if (window.confirm('Are you sure you want to delete this user?')) {
			try {
				await api.delete(`/admin/users/${userId}`)
				setMessage('User deleted successfully!')
				fetchUsers()
			} catch (err) {
				setMessage('Failed to delete user')
			}
		}
	}

	if (loading) return <div className="loading">Loading users...</div>

	return (
		<div className="tab-content">
			<h2>User Management</h2>
			
			<div className="user-form-section">
				<h3>Create New User</h3>
				<form onSubmit={handleSubmit} className="user-form">
					<div className="form-row">
						<div className="form-group">
							<label>Username</label>
							<input
								type="text"
								value={newUser.username}
								onChange={(e) => setNewUser({...newUser, username: e.target.value})}
								required
							/>
						</div>
						<div className="form-group">
							<label>Password</label>
							<input
								type="password"
								value={newUser.password}
								onChange={(e) => setNewUser({...newUser, password: e.target.value})}
								required
							/>
						</div>
						<div className="form-group">
							<label>Role</label>
							<select
								value={newUser.role}
								onChange={(e) => setNewUser({...newUser, role: e.target.value})}
							>
								<option value="STUDENT">Student</option>
								<option value="FACULTY">Faculty</option>
								<option value="ADMIN">Admin</option>
							</select>
						</div>
					</div>
					<button type="submit" disabled={submitting} className="submit-button">
						{submitting ? 'Creating...' : 'Create User'}
					</button>
					{message && <div className="message">{message}</div>}
				</form>
			</div>

			<div className="users-list">
				<h3>All Users</h3>
				<div className="users-table">
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Username</th>
								<th>Role</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user, index) => (
								<tr key={index}>
									<td>{user.id}</td>
									<td>{user.username}</td>
									<td>
										<span className={`role-badge ${user.role.toLowerCase()}`}>
											{user.role}
										</span>
									</td>
									<td>
										<button
											onClick={() => handleDelete(user.id)}
											className="delete-button"
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
>>>>>>> 8dfc984df7925edb720360c4cd8c7229f3b9589d
}

function ReportsManagement() {
	const [reports, setReports] = useState<any>({})
	const [loading, setLoading] = useState(true)
	const [activeReport, setActiveReport] = useState('attendance')

	useEffect(() => {
		fetchReports()
	}, [])

	const fetchReports = async () => {
		try {
			const [attendanceRes, marksRes, feesRes, assignmentsRes] = await Promise.all([
				api.get('/admin/attendance/reports'),
				api.get('/admin/marks/reports'),
				api.get('/admin/fees/reports'),
				api.get('/admin/assignments/reports')
			])
<<<<<<< HEAD

=======
			
>>>>>>> 8dfc984df7925edb720360c4cd8c7229f3b9589d
			setReports({
				attendance: attendanceRes.data,
				marks: marksRes.data,
				fees: feesRes.data,
				assignments: assignmentsRes.data
			})
		} catch (err) {
			console.error('Failed to fetch reports:', err)
		} finally {
			setLoading(false)
		}
	}

	if (loading) return <div className="loading">Loading reports...</div>

	const reportTabs = [
		{ id: 'attendance', label: 'Attendance', icon: '📅' },
		{ id: 'marks', label: 'Marks', icon: '📈' },
		{ id: 'fees', label: 'Fees', icon: '💰' },
		{ id: 'assignments', label: 'Assignments', icon: '📝' }
	]

	return (
		<div className="tab-content">
			<h2>Reports & Analytics</h2>
<<<<<<< HEAD

=======
			
>>>>>>> 8dfc984df7925edb720360c4cd8c7229f3b9589d
			<div className="reports-tabs">
				{reportTabs.map(tab => (
					<button
						key={tab.id}
						className={`report-tab-button ${activeReport === tab.id ? 'active' : ''}`}
						onClick={() => setActiveReport(tab.id)}
					>
						<span className="tab-icon">{tab.icon}</span>
						{tab.label}
					</button>
				))}
			</div>

			<div className="report-content">
				{activeReport === 'attendance' && (
					<div className="report-section">
						<h3>Attendance Reports</h3>
						<div className="report-grid">
							{reports.attendance?.map((record: any, index: number) => (
								<div key={index} className="report-card">
									<div className="report-date">{new Date(record.date).toLocaleDateString()}</div>
									<div className="report-subject">{record.subject}</div>
									<div className={`report-status ${record.status.toLowerCase()}`}>
										{record.status}
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{activeReport === 'marks' && (
					<div className="report-section">
						<h3>Marks Reports</h3>
						<div className="report-grid">
							{reports.marks?.map((mark: any, index: number) => (
								<div key={index} className="report-card">
									<div className="report-subject">{mark.subject}</div>
									<div className="report-exam">{mark.examType}</div>
									<div className="report-score">
										{mark.marksObtained}/{mark.maxMarks}
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{activeReport === 'fees' && (
					<div className="report-section">
						<h3>Fees Reports</h3>
						<div className="report-grid">
							{reports.fees?.map((fee: any, index: number) => (
								<div key={index} className="report-card">
									<div className="report-fee-type">{fee.feeType}</div>
									<div className="report-amount">${fee.amount}</div>
									<div className={`report-status ${fee.status.toLowerCase()}`}>
										{fee.status}
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{activeReport === 'assignments' && (
					<div className="report-section">
						<h3>Assignments Reports</h3>
						<div className="report-grid">
							{reports.assignments?.map((assignment: any, index: number) => (
								<div key={index} className="report-card">
									<div className="report-title">{assignment.title}</div>
									<div className="report-subject">{assignment.subject}</div>
									<div className="report-marks">Max: {assignment.maxMarks} marks</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
<<<<<<< HEAD
function LibraryManagement() {
  const [books, setBooks] = useState<any[]>([])
  const [students, setStudents] = useState<any[]>([])
  const [newBook, setNewBook] = useState({
    title: '',
    studentId: '',
    dueDate: ''
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchBooks()
    fetchStudents()
  }, [])

  const fetchBooks = async () => {
    try {
      const res = await api.get('/admin/library/all')
      setBooks(res.data)
    } catch (err) {
      console.error('Failed to fetch books:', err)
      setMessage('Failed to load books')
    } finally {
      setLoading(false)
    }
  }

  const fetchStudents = async () => {
    try {
      const res = await api.get('/admin/users?role=STUDENT')
      setStudents(res.data)
    } catch (err) {
      console.error('Failed to fetch students:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      // Send payload matching backend
      const payload = {
        title: newBook.title,
        studentId: newBook.studentId,   // backend expects this
        dueDate: newBook.dueDate        // plain yyyy-MM-dd string
      };

       console.log("Submitting book:", payload);
      console.log("Issuing book →", payload);

      // ✅ POST should always be /admin/library (no /{id})
      await api.post('/admin/library', payload);


      setMessage('Book issued successfully!');
      setNewBook({ title: '', studentId: '', dueDate: '' });
      fetchBooks();
    } catch (err: any) {
      console.error('Error issuing book:', err.response || err);
      setMessage(
        typeof err.response?.data === 'string'
          ? err.response.data || 'Failed to issue book'
          : err.response?.data?.error || 'Failed to issue book'
      );

    } finally {
      setSubmitting(false);
    }
  };


  if (loading) return <div className="loading">Loading library...</div>

  return (
    <div className="tab-content">
      <h2>Library Management</h2>

      {/* Issue New Book */}
      <div className="card form-card">
        <h3>Issue New Book</h3>
        <form onSubmit={handleSubmit} className="library-form">
          <div className="form-row">
           <input
             type="text"
             placeholder="Book Title"
             value={newBook.title}
             onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
             required
           />

            <select
              value={newBook.studentId}
              onChange={(e) => setNewBook({ ...newBook, studentId: e.target.value })}
              required
            >
              <option value="">Select Student</option>
              {students.map((s) => (
                <option key={s.id} value={s.id.toString()}>{s.username}</option>

              ))}
            </select>

                      <input
                        type="date"
                        value={newBook.dueDate}
                        onChange={(e) => setNewBook({ ...newBook, dueDate: e.target.value })}
                        required
                      />

            <button type="submit" disabled={submitting}>
              {submitting ? 'Issuing...' : 'Issue Book'}
            </button>
          </div>
          {message && <div className="message">{message}</div>}
        </form>
      </div>

      {/* Issued Books */}
      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <h4>{book.title}</h4>
            <p>
              <strong>Student:</strong>{' '}
              {students.find((s) => s.id.toString() === book.issuedTo)?.username || book.issuedTo}

            </p>
            <p>
              <strong>Issued On:</strong> {new Date(book.issuedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
=======
>>>>>>> 8dfc984df7925edb720360c4cd8c7229f3b9589d

function FeedbackManagement() {
	const [feedback, setFeedback] = useState<any[]>([])
	const [loading, setLoading] = useState(true)
	const [selectedFeedback, setSelectedFeedback] = useState<any>(null)
	const [response, setResponse] = useState('')
	const [submitting, setSubmitting] = useState(false)
	const [message, setMessage] = useState('')

	useEffect(() => {
		fetchFeedback()
	}, [])

	const fetchFeedback = async () => {
		try {
			const res = await api.get('/admin/feedback')
			setFeedback(res.data)
		} catch (err) {
			console.error('Failed to fetch feedback:', err)
		} finally {
			setLoading(false)
		}
	}

	const handleRespond = async (feedbackId: number) => {
		if (!response.trim()) {
			setMessage('Please enter a response')
			return
		}

		setSubmitting(true)
		setMessage('')

		try {
			await api.post(`/admin/feedback/${feedbackId}/respond`, { response })
			setMessage('Response added successfully!')
			setResponse('')
			setSelectedFeedback(null)
			fetchFeedback()
		} catch (err) {
			setMessage('Failed to add response')
		} finally {
			setSubmitting(false)
		}
	}

	if (loading) return <div className="loading">Loading feedback...</div>

	return (
		<div className="tab-content">
			<h2>Feedback Management</h2>
<<<<<<< HEAD

=======
			
>>>>>>> 8dfc984df7925edb720360c4cd8c7229f3b9589d
			<div className="feedback-list">
				{feedback.map((item, index) => (
					<div key={index} className="feedback-card">
						<div className="feedback-header">
							<h3>{item.title}</h3>
							<span className={`feedback-status ${item.status.toLowerCase()}`}>
								{item.status}
							</span>
						</div>
						<div className="feedback-category">{item.category}</div>
						<p className="feedback-message">{item.message}</p>
						<div className="feedback-footer">
							<span className="feedback-date">
								{new Date(item.createdAt).toLocaleDateString()}
							</span>
							<button
								onClick={() => setSelectedFeedback(item)}
								className="respond-button"
							>
								Respond
							</button>
						</div>
<<<<<<< HEAD

=======
						
>>>>>>> 8dfc984df7925edb720360c4cd8c7229f3b9589d
						{item.adminResponse && (
							<div className="admin-response">
								<h4>Admin Response:</h4>
								<p>{item.adminResponse}</p>
								<small>By: {item.respondedBy} on {new Date(item.respondedAt).toLocaleDateString()}</small>
							</div>
						)}
					</div>
				))}
			</div>

			{selectedFeedback && (
				<div className="response-modal">
					<div className="modal-content">
						<h3>Respond to Feedback</h3>
						<div className="feedback-preview">
							<h4>{selectedFeedback.title}</h4>
							<p>{selectedFeedback.message}</p>
						</div>
						<textarea
							value={response}
							onChange={(e) => setResponse(e.target.value)}
							placeholder="Enter your response..."
							rows={4}
						/>
						<div className="modal-actions">
							<button
								onClick={() => handleRespond(selectedFeedback.id)}
								disabled={submitting}
								className="submit-button"
							>
								{submitting ? 'Responding...' : 'Send Response'}
							</button>
							<button
								onClick={() => {
									setSelectedFeedback(null)
									setResponse('')
								}}
								className="cancel-button"
							>
								Cancel
							</button>
						</div>
						{message && <div className="message">{message}</div>}
					</div>
				</div>
			)}
		</div>
	)
}
<<<<<<< HEAD
function NotificationManagement() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    targetRole: 'STUDENT' // default role
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [editingNotification, setEditingNotification] = useState<any | null>(null)

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/admin/notifications')
      setNotifications(res.data)
    } catch (err: any) {
      console.error('Fetch notifications error:', err.response?.data || err)
      setMessage('Failed to load notifications')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')

    try {
      if (editingNotification) {
        // 🔄 Update existing notification
        const res = await api.put(`/admin/notifications/${editingNotification.id}`, newNotification)
        console.log('Update response:', res.data)
        setMessage('Notification updated successfully!')
        setEditingNotification(null)
      } else {
        // ➕ Create new notification
        if (newNotification.targetRole === 'ALL') {
          // Send to all roles individually
          const roles = ['STUDENT', 'FACULTY', 'ADMIN']
          for (const role of roles) {
            const res = await api.post('/admin/notifications', { ...newNotification, targetRole: role })
            console.log(`Notification sent to ${role}:`, res.data)
          }
          setMessage('Notification sent to all users!')
        } else {
          const res = await api.post('/admin/notifications', newNotification)
          console.log('Create response:', res.data)
          setMessage('Notification created successfully!')
        }
      }

      setNewNotification({ title: '', message: '', targetRole: 'STUDENT' })
      fetchNotifications()
    } catch (err: any) {
      console.error('Notification save error:', err.response?.data || err)
      setMessage('Failed to save notification')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (notification: any) => {
    setEditingNotification(notification)
    setNewNotification({
      title: notification.title,
      message: notification.message,
      targetRole: notification.targetRole
    })
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this notification?')) return
    setSubmitting(true)
    setMessage('')

    try {
      const res = await api.delete(`/admin/notifications/${id}`)
      console.log('Delete response:', res.data)
      setMessage('Notification deleted successfully!')
      fetchNotifications()
    } catch (err: any) {
      console.error('Delete notification error:', err.response?.data || err)
      setMessage('Failed to delete notification')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="loading">Loading notifications...</div>

  return (
    <div className="tab-content">
      <h2>Notification Management</h2>

      <div className="notification-form-section">
        <h3>{editingNotification ? 'Edit Notification' : 'Create New Notification'}</h3>
        <form onSubmit={handleSubmit} className="notification-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={newNotification.title}
              onChange={(e) =>
                setNewNotification({ ...newNotification, title: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              value={newNotification.message}
              onChange={(e) =>
                setNewNotification({ ...newNotification, message: e.target.value })
              }
              rows={4}
              required
            />
          </div>
          <div className="form-group">
            <label>Target Role</label>
            <select
              value={newNotification.targetRole}
              onChange={(e) =>
                setNewNotification({ ...newNotification, targetRole: e.target.value })
              }
            >
              <option value="STUDENT">Student</option>
              <option value="FACULTY">Faculty</option>
              <option value="ADMIN">Admin</option>
              <option value="ALL">All Users</option>
            </select>
          </div>

          <button type="submit" disabled={submitting} className="submit-button">
            {submitting
              ? editingNotification
                ? 'Updating...'
                : 'Creating...'
              : editingNotification
              ? 'Update Notification'
              : 'Create Notification'}
          </button>

          {editingNotification && (
            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                setEditingNotification(null)
                setNewNotification({ title: '', message: '', targetRole: 'STUDENT' })
              }}
            >
              Cancel Edit
            </button>
          )}
          {message && <div className="message">{message}</div>}
        </form>
      </div>

      <div className="notifications-list">
        <h3>All Notifications</h3>
        {notifications.map((notification, index) => (
          <div key={index} className="notification-card">
            <div className="notification-header">
              <h4>{notification.title}</h4>
              <span className="notification-target">{notification.targetRole}</span>
            </div>
            <p className="notification-message">{notification.message}</p>
            <div className="notification-footer">
              <span className="notification-date">
                {new Date(notification.createdAt).toLocaleDateString()}
              </span>
              <span className="notification-author">By: {notification.createdBy}</span>
            </div>
            <div className="notification-actions">
              <button
                className="edit-button"
                onClick={() => handleEdit(notification)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(notification.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}



=======

function NotificationManagement() {
	const [notifications, setNotifications] = useState<any[]>([])
	const [newNotification, setNewNotification] = useState({
		title: '',
		message: '',
		targetRole: 'ALL'
	})
	const [loading, setLoading] = useState(true)
	const [submitting, setSubmitting] = useState(false)
	const [message, setMessage] = useState('')

	useEffect(() => {
		fetchNotifications()
	}, [])

	const fetchNotifications = async () => {
		try {
			const res = await api.get('/admin/notifications')
			setNotifications(res.data)
		} catch (err) {
			console.error('Failed to fetch notifications:', err)
		} finally {
			setLoading(false)
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setSubmitting(true)
		setMessage('')

		try {
			await api.post('/admin/notifications', newNotification)
			setMessage('Notification created successfully!')
			setNewNotification({
				title: '',
				message: '',
				targetRole: 'ALL'
			})
			fetchNotifications()
		} catch (err) {
			setMessage('Failed to create notification')
		} finally {
			setSubmitting(false)
		}
	}

	if (loading) return <div className="loading">Loading notifications...</div>

	return (
		<div className="tab-content">
			<h2>Notification Management</h2>
			
			<div className="notification-form-section">
				<h3>Create New Notification</h3>
				<form onSubmit={handleSubmit} className="notification-form">
					<div className="form-group">
						<label>Title</label>
						<input
							type="text"
							value={newNotification.title}
							onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
							required
						/>
					</div>
					<div className="form-group">
						<label>Message</label>
						<textarea
							value={newNotification.message}
							onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
							rows={4}
							required
						/>
					</div>
					<div className="form-group">
						<label>Target Role</label>
						<select
							value={newNotification.targetRole}
							onChange={(e) => setNewNotification({...newNotification, targetRole: e.target.value})}
						>
							<option value="STUDENT">Students</option>
							<option value="FACULTY">Faculty</option>
							<option value="ADMIN">Admin</option>
							<option value="ALL">All Users</option>
						</select>
					</div>
					<button type="submit" disabled={submitting} className="submit-button">
						{submitting ? 'Creating...' : 'Create Notification'}
					</button>
					{message && <div className="message">{message}</div>}
				</form>
			</div>

			<div className="notifications-list">
				<h3>All Notifications</h3>
				{notifications.map((notification, index) => (
					<div key={index} className="notification-card">
						<div className="notification-header">
							<h4>{notification.title}</h4>
							<span className="notification-target">{notification.targetRole}</span>
						</div>
						<p className="notification-message">{notification.message}</p>
						<div className="notification-footer">
							<span className="notification-date">
								{new Date(notification.createdAt).toLocaleDateString()}
							</span>
							<span className="notification-author">By: {notification.createdBy}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

>>>>>>> 8dfc984df7925edb720360c4cd8c7229f3b9589d
function AnalyticsManagement() {
	const [analytics, setAnalytics] = useState<any>({})
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchAnalytics()
	}, [])

	const fetchAnalytics = async () => {
		try {
			const res = await api.get('/admin/analytics')
			setAnalytics(res.data)
		} catch (err) {
			console.error('Failed to fetch analytics:', err)
		} finally {
			setLoading(false)
		}
	}

	if (loading) return <div className="loading">Loading analytics...</div>

	return (
		<div className="tab-content">
			<h2>System Analytics</h2>
<<<<<<< HEAD

=======
			
>>>>>>> 8dfc984df7925edb720360c4cd8c7229f3b9589d
			<div className="analytics-grid">
				<div className="analytics-card">
					<h3>Attendance Analytics</h3>
					<div className="analytics-metric">
						<span className="metric-label">Total Records:</span>
						<span className="metric-value">{analytics.totalAttendanceRecords || 0}</span>
					</div>
					<div className="analytics-metric">
						<span className="metric-label">Attendance %:</span>
						<span className="metric-value">{analytics.attendancePercentage?.toFixed(1) || 0}%</span>
					</div>
				</div>

				<div className="analytics-card">
					<h3>Academic Performance</h3>
					<div className="analytics-metric">
						<span className="metric-label">Average Marks:</span>
						<span className="metric-value">{analytics.averageMarks || 0}</span>
					</div>
					<div className="analytics-metric">
						<span className="metric-label">Total Students:</span>
						<span className="metric-value">{analytics.totalStudents || 0}</span>
					</div>
				</div>

				<div className="analytics-card">
					<h3>Financial Analytics</h3>
					<div className="analytics-metric">
						<span className="metric-label">Total Fees:</span>
						<span className="metric-value">${analytics.totalFees || 0}</span>
					</div>
					<div className="analytics-metric">
						<span className="metric-label">Total Faculty:</span>
						<span className="metric-value">{analytics.totalFaculty || 0}</span>
					</div>
				</div>
			</div>
		</div>
	)
}