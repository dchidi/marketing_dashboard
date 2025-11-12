// // components/UserManager.tsx
// import React, { useState } from "react";
// import {
//   useUsers,
//   useUserCreation,
//   useUserDeletion,
//   useUserSearch,
//   type CreateUser,
// } from "../hooks/use-users";
// import { useUser } from "../hooks/use-users";

// export function UserManager() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isCreating, setIsCreating] = useState(false);
//   const [editingUserId, setEditingUserId] = useState<number | null>(null);

//   // Get all users
//   const { users, isLoading, error, isEmpty } = useUsers();

//   // Get specific user for editing
//   const { user: editingUser } = useUser(editingUserId);

//   // Search users
//   const { data: searchResults } = useUserSearch(searchTerm);

//   // Create user with optimistic updates
//   const { createUser, isPending: isCreatingUser } = useUserCreation();

//   // Delete user with optimistic updates
//   const { deleteUser, isPending: isDeletingUser } = useUserDeletion();

//   const handleCreateUser = async (userData: CreateUser) => {
//     try {
//       await createUser(userData);
//       setIsCreating(false);
//     } catch (error) {
//       console.error("Failed to create user:", error);
//     }
//   };

//   const handleDeleteUser = async (userId: number) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       try {
//         await deleteUser(userId);
//       } catch (error) {
//         console.error("Failed to delete user:", error);
//       }
//     }
//   };

//   const displayUsers = searchTerm ? searchResults : users;

//   if (isLoading) return <div className="loading">Loading users...</div>;
//   if (error) return <div className="error">Error: {error.message}</div>;

//   return (
//     <div className="user-manager">
//       <h1>User Management</h1>

//       {/* Search */}
//       <div className="search-section">
//         <input
//           type="text"
//           placeholder="Search users..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="search-input"
//         />
//       </div>

//       {/* Actions */}
//       <div className="actions-section">
//         <button onClick={() => setIsCreating(true)} className="btn-primary">
//           Add New User
//         </button>
//       </div>

//       {/* Create User Form */}
//       {isCreating && (
//         <CreateUserForm
//           onSubmit={handleCreateUser}
//           onCancel={() => setIsCreating(false)}
//           isLoading={isCreatingUser}
//         />
//       )}

//       {/* Edit User Form */}
//       {editingUserId && editingUser && (
//         <EditUserForm
//           user={editingUser}
//           onCancel={() => setEditingUserId(null)}
//           onSuccess={() => setEditingUserId(null)}
//         />
//       )}

//       {/* Users List */}
//       <div className="users-list">
//         {isEmpty ? (
//           <div className="empty-state">No users found</div>
//         ) : (
//           displayUsers?.map((user) => (
//             <UserCard
//               key={user.id}
//               user={user}
//               onEdit={() => setEditingUserId(user.id)}
//               onDelete={() => handleDeleteUser(user.id)}
//               isDeleting={isDeletingUser}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// // Sub-components for better organization
// function CreateUserForm({
//   onSubmit,
//   onCancel,
//   isLoading,
// }: {
//   onSubmit: (data: CreateUser) => void;
//   onCancel: () => void;
//   isLoading: boolean;
// }) {
//   const [formData, setFormData] = useState<CreateUser>({ name: "", email: "" });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="user-form">
//       <h3>Create New User</h3>
//       <input
//         type="text"
//         placeholder="Name"
//         value={formData.name}
//         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//         required
//       />
//       <input
//         type="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//         required
//       />
//       <div className="form-actions">
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? "Creating..." : "Create"}
//         </button>
//         <button type="button" onClick={onCancel}>
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// }

// function UserCard({
//   user,
//   onEdit,
//   onDelete,
//   isDeleting,
// }: {
//   user: User;
//   onEdit: () => void;
//   onDelete: () => void;
//   isDeleting: boolean;
// }) {
//   return (
//     <div className="user-card">
//       <h3>{user.name}</h3>
//       <p>{user.email}</p>
//       <div className="user-actions">
//         <button onClick={onEdit}>Edit</button>
//         <button onClick={onDelete} disabled={isDeleting} className="btn-danger">
//           {isDeleting ? "Deleting..." : "Delete"}
//         </button>
//       </div>
//     </div>
//   );
// }
