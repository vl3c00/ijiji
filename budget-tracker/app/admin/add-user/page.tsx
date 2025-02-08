"use client";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons
import Papa from "papaparse"; // Import PapaParse for CSV export

type User = {
  id: number;
  username: string;
  password: string;
};

export default function AddUserPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle state
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<User[]>([]); // State to hold users
  const [viewUserId, setViewUserId] = useState<number | null>(null); // State for toggling view
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [totalUsers, setTotalUsers] = useState(0); // Total users count
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Sorting state
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  // Fetch users with pagination and sorting
  const fetchUsers = async () => {
    try {
      const response = await fetch(`/api/get-users?page=${currentPage}&limit=30&sortOrder=${sortOrder}&search=${searchQuery}`);
      const data = await response.json();
      if (data.success) {
        setUsers(data.users); // Update users state
        setTotalUsers(data.totalUsers); // Update total users count for pagination
      } else {
        setMessage("❌ Error fetching users.");
      }
    } catch {
      setMessage("❌ Error fetching users.");
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount or when pagination, sorting, or search query changes
  }, [currentPage, sortOrder, searchQuery]);

  const handleAddUser = async () => {
    setMessage(""); // Clear previous message

    if (!username || !password) {
      setMessage("❌ Please enter both Token ID and Access Token.");
      return;
    }

    try {
      const response = await fetch("/api/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      setMessage(data.success ? `✅ ${data.message}` : `❌ ${data.message}`);
      
      if (data.success) {
        // After adding the user, fetch the updated list
        fetchUsers();
      }
    } catch {
      setMessage("❌ Error adding user.");
    }
  };

  const handleDeleteUser = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const response = await fetch("/api/delete-user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      setMessage(data.success ? `✅ ${data.message}` : `❌ ${data.message}`);
      
      if (data.success) {
        // After deleting, fetch the updated list
        fetchUsers();
      }
    } catch {
      setMessage("❌ Error deleting user.");
    }
  };

  const handleEditUser = async (id: number) => {
    const newUsername = prompt("Enter new username:");
    const newPassword = prompt("Enter new password:");

    if (newUsername && newPassword) {
      try {
        const response = await fetch("/api/edit-user", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, username: newUsername, password: newPassword }),
        });

        const data = await response.json();
        setMessage(data.success ? `✅ ${data.message}` : `❌ ${data.message}`);
        
        if (data.success) {
          // After editing, fetch the updated list
          fetchUsers();
        }
      } catch {
        setMessage("❌ Error editing user.");
      }
    }
  };

  const toggleViewUser = (id: number) => {
    setViewUserId(viewUserId === id ? null : id); // Toggle visibility of user details
  };

  // Function to download users as CSV
  const downloadCSV = () => {
    // Prepare data for CSV export
    const csvData = users.map(user => ({
      ID: user.id,
      Username: user.username,
      Password: user.password,
    }));

    // Convert JSON data to CSV using PapaParse
    const csv = Papa.unparse(csvData);

    // Create a download link and trigger download
    const link = document.createElement("a");
    link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
    link.download = "users.csv";
    link.click();
  };

  // Handle sorting by username
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Pagination Controls
  const totalPages = Math.ceil(totalUsers / 30); // Calculate total pages

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Add User</h1>

      {/* Token ID Input */}
      <input
        type="text"
        placeholder="Token ID (username)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-2 w-80"
      />

      {/* Access Token Input with Show/Hide Toggle */}
      <div className="relative w-80">
        <input
          type={showPassword ? "text" : "password"} // Toggle input type
          placeholder="Access Token (password)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full pr-10"
        />
        {/* Toggle Icon */}
        <span
          className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {/* Add User Button */}
      <button
        onClick={handleAddUser}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Add User
      </button>

      {message && <p className="mt-4">{message}</p>}

      {/* CSV Download Button */}
      <button
        onClick={downloadCSV}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
      >
        Download CSV
      </button>

      {/* Search User Input */}
      <input
        type="text"
        placeholder="Search user by username"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 mb-4 w-80"
      />

      {/* Sort Button */}
      <button
        onClick={toggleSortOrder}
        className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
      >
        Sort {sortOrder === "asc" ? "Descending" : "Ascending"}
      </button>

      {/* Display List of Users */}
      {users.length > 0 && (
        <div className="mt-8 w-80">
          <h2 className="text-xl font-bold mb-2">User List</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id} className="border-b py-2 flex justify-between items-center">
                <div>
                  <span>{user.username}</span>
                  {viewUserId === user.id && (
                    <div>
                      <p>ID: {user.id}</p>
                      <p>Password: {user.password}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => handleEditUser(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => toggleViewUser(user.id)}
                  >
                    {viewUserId === user.id ? "Hide" : "View"}
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={users.length < 30} // Disable "Next" if fewer than 30 records are returned
              className={`bg-blue-500 text-white px-4 py-2 rounded ${users.length < 30 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
