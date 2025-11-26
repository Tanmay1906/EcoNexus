import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
  isSystem: boolean
  createdAt: string
}

interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'suspended'
  lastLogin: string
  permissions: string[]
}

const RolesPermissions: React.FC = () => {
  const [roles] = useState<Role[]>([
    {
      id: '1',
      name: 'Super Admin',
      description: 'Full system access and control over all features',
      permissions: ['all'],
      userCount: 2,
      isSystem: true,
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      name: 'Verification Manager',
      description: 'Manages verification workflows and approves submissions',
      permissions: ['verification.approve', 'verification.reject', 'verification.view'],
      userCount: 5,
      isSystem: false,
      createdAt: '2024-01-05T10:00:00Z'
    },
    {
      id: '3',
      name: 'Payment Processor',
      description: 'Handles payment processing and financial transactions',
      permissions: ['payments.approve', 'payments.reject', 'payments.view', 'payments.process'],
      userCount: 3,
      isSystem: false,
      createdAt: '2024-01-08T14:30:00Z'
    },
    {
      id: '4',
      name: 'Marketplace Moderator',
      description: 'Moderates marketplace listings and product approvals',
      permissions: ['marketplace.approve', 'marketplace.reject', 'marketplace.view', 'marketplace.manage'],
      userCount: 4,
      isSystem: false,
      createdAt: '2024-01-10T09:15:00Z'
    },
    {
      id: '5',
      name: 'Support Agent',
      description: 'Handles user support and dispute resolution',
      permissions: ['disputes.view', 'disputes.respond', 'disputes.assign', 'users.view'],
      userCount: 8,
      isSystem: false,
      createdAt: '2024-01-12T16:45:00Z'
    },
    {
      id: '6',
      name: 'Analytics Viewer',
      description: 'View-only access to analytics and reports',
      permissions: ['analytics.view', 'reports.view', 'dashboard.view'],
      userCount: 6,
      isSystem: false,
      createdAt: '2024-01-15T11:20:00Z'
    }
  ])

  const [adminUsers] = useState<AdminUser[]>([
    {
      id: '1',
      name: 'System Administrator',
      email: 'admin@plastify.com',
      role: 'Super Admin',
      status: 'active',
      lastLogin: '2024-01-29T16:30:00Z',
      permissions: ['all']
    },
    {
      id: '2',
      name: 'Raj Verma',
      email: 'raj.verma@plastify.com',
      role: 'Verification Manager',
      status: 'active',
      lastLogin: '2024-01-29T14:15:00Z',
      permissions: ['verification.approve', 'verification.reject', 'verification.view']
    },
    {
      id: '3',
      name: 'Priya Sharma',
      email: 'priya.sharma@plastify.com',
      role: 'Payment Processor',
      status: 'active',
      lastLogin: '2024-01-29T11:45:00Z',
      permissions: ['payments.approve', 'payments.reject', 'payments.view', 'payments.process']
    },
    {
      id: '4',
      name: 'Amit Kumar',
      email: 'amit.kumar@plastify.com',
      role: 'Marketplace Moderator',
      status: 'inactive',
      lastLogin: '2024-01-25T09:30:00Z',
      permissions: ['marketplace.approve', 'marketplace.reject', 'marketplace.view', 'marketplace.manage']
    },
    {
      id: '5',
      name: 'Sneha Reddy',
      email: 'sneha.reddy@plastify.com',
      role: 'Support Agent',
      status: 'suspended',
      lastLogin: '2024-01-20T13:20:00Z',
      permissions: ['disputes.view', 'disputes.respond', 'disputes.assign', 'users.view']
    }
  ])

  const [activeTab, setActiveTab] = useState<'roles' | 'users'>('roles')
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [showCreateRole, setShowCreateRole] = useState(false)
  const [showCreateUser, setShowCreateUser] = useState(false)

  const allPermissions = [
    { category: 'Dashboard', permissions: ['dashboard.view', 'dashboard.manage'] },
    { category: 'Users', permissions: ['users.view', 'users.create', 'users.edit', 'users.delete'] },
    { category: 'Verification', permissions: ['verification.view', 'verification.approve', 'verification.reject'] },
    { category: 'Payments', permissions: ['payments.view', 'payments.approve', 'payments.reject', 'payments.process'] },
    { category: 'Marketplace', permissions: ['marketplace.view', 'marketplace.approve', 'marketplace.reject', 'marketplace.manage'] },
    { category: 'Disputes', permissions: ['disputes.view', 'disputes.respond', 'disputes.assign', 'disputes.resolve'] },
    { category: 'Analytics', permissions: ['analytics.view', 'reports.generate', 'reports.export'] },
    { category: 'Blockchain', permissions: ['blockchain.view', 'blockchain.audit', 'blockchain.mint'] },
    { category: 'System', permissions: ['system.settings', 'system.logs', 'system.backup'] }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'inactive':
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
      case 'suspended':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
  }

  const handleEditRole = (role: Role) => {
    setSelectedRole(role)
    setShowCreateRole(true)
  }

  const handleDeleteRole = (roleId: string) => {
    alert(`Deleting role ${roleId}`)
  }

  const handleEditUser = (user: AdminUser) => {
    setSelectedUser(user)
    setShowCreateUser(true)
  }

  const handleSuspendUser = (userId: string) => {
    alert(`Suspending user ${userId}`)
  }

  const handleActivateUser = (userId: string) => {
    alert(`Activating user ${userId}`)
  }

  const handleDeleteUser = (userId: string) => {
    alert(`Deleting user ${userId}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Roles & Permissions</h2>
          <p className="text-slate-400">Manage admin roles and system permissions</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-slate-400 text-sm">Total Roles</p>
            <p className="text-2xl font-bold text-cyan-400">{roles.length}</p>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-sm">Admin Users</p>
            <p className="text-2xl font-bold text-emerald-400">{adminUsers.length}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab('roles')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            activeTab === 'roles'
              ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
              : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 border border-slate-600'
          }`}
        >
          <span className="mr-2">👥</span>
          Roles ({roles.length})
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab('users')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            activeTab === 'users'
              ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
              : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 border border-slate-600'
          }`}
        >
          <span className="mr-2">👤</span>
          Users ({adminUsers.length})
        </motion.button>
      </div>

      {/* Roles Tab */}
      {activeTab === 'roles' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">System Roles</h3>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCreateRole(true)}
              className="px-6 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors"
            >
              + Create New Role
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {roles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 0 30px rgba(14, 116, 144, 0.2)'
                }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{role.name}</h3>
                    <p className="text-slate-400 text-sm mb-2">{role.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-sm">{role.userCount} users</span>
                      {role.isSystem && (
                        <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full border border-amber-500/30">
                          SYSTEM
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Permissions */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-slate-300 mb-2">Permissions</h4>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.includes('all') ? (
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full border border-emerald-500/30">
                        Full Access
                      </span>
                    ) : (
                      role.permissions.map((permission, idx) => (
                        <span key={idx} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full border border-slate-600">
                          {permission}
                        </span>
                      ))
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleEditRole(role)}
                    disabled={role.isSystem}
                    className={`flex-1 px-3 py-2 rounded-lg font-medium transition-colors border ${
                      role.isSystem
                        ? 'bg-slate-700/50 text-slate-500 border-slate-600 cursor-not-allowed'
                        : 'bg-teal-500/20 text-teal-400 hover:bg-teal-500/30 border-teal-500/30'
                    }`}
                  >
                    {role.isSystem ? 'System Role' : 'Edit'}
                  </motion.button>
                  {!role.isSystem && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleDeleteRole(role.id)}
                      className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg font-medium hover:bg-red-500/30 transition-colors border border-red-500/30"
                    >
                      Delete
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Admin Users</h3>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCreateUser(true)}
              className="px-6 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors"
            >
              + Add New User
            </motion.button>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50 border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Permissions
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {adminUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-slate-700/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-slate-400 text-sm">{user.email}</p>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full border border-cyan-500/30">
                          {user.role}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(user.status)}`}>
                          {user.status.toUpperCase()}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4">
                        <span className="text-slate-300 text-sm">
                          {new Date(user.lastLogin).toLocaleDateString()}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {user.permissions.includes('all') ? (
                            <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full border border-emerald-500/30">
                              Full Access
                            </span>
                          ) : (
                            user.permissions.slice(0, 2).map((permission, idx) => (
                              <span key={idx} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full border border-slate-600">
                                {permission}
                              </span>
                            ))
                          )}
                          {user.permissions.length > 2 && !user.permissions.includes('all') && (
                            <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-full border border-slate-600">
                              +{user.permissions.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEditUser(user)}
                            className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-lg text-sm font-medium hover:bg-teal-500/30 transition-colors border border-teal-500/30"
                          >
                            Edit
                          </motion.button>
                          
                          {user.status === 'active' && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleSuspendUser(user.id)}
                              className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-lg text-sm font-medium hover:bg-orange-500/30 transition-colors border border-orange-500/30"
                            >
                              Suspend
                            </motion.button>
                          )}
                          
                          {user.status === 'inactive' && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleActivateUser(user.id)}
                              className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-medium hover:bg-emerald-500/30 transition-colors border border-emerald-500/30"
                            >
                              Activate
                            </motion.button>
                          )}
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDeleteUser(user.id)}
                            className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors border border-red-500/30"
                          >
                            Delete
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Role Modal */}
      <AnimatePresence>
        {showCreateRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateRole(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-slate-900 rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-6">
                {selectedRole ? 'Edit Role' : 'Create New Role'}
              </h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Role Name</label>
                    <input
                      type="text"
                      defaultValue={selectedRole?.name || ''}
                      placeholder="Enter role name"
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                    <input
                      type="text"
                      defaultValue={selectedRole?.description || ''}
                      placeholder="Enter role description"
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">Permissions</label>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {allPermissions.map((category) => (
                      <div key={category.category} className="bg-slate-800/50 rounded-lg p-3">
                        <h4 className="text-white font-medium mb-2">{category.category}</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {category.permissions.map((permission) => (
                            <label key={permission} className="flex items-center gap-2 text-slate-300 text-sm">
                              <input
                                type="checkbox"
                                defaultChecked={selectedRole?.permissions.includes(permission)}
                                className="w-4 h-4 text-teal-500 bg-slate-700 border-slate-600 rounded focus:ring-teal-500"
                              />
                              {permission}
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    alert(`${selectedRole ? 'Updating' : 'Creating'} role`)
                    setShowCreateRole(false)
                    setSelectedRole(null)
                  }}
                  className="flex-1 px-6 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors"
                >
                  {selectedRole ? 'Update Role' : 'Create Role'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowCreateRole(false)
                    setSelectedRole(null)
                  }}
                  className="px-6 py-3 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create/Edit User Modal */}
      <AnimatePresence>
        {showCreateUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateUser(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-slate-900 rounded-2xl p-6 max-w-2xl w-full border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-6">
                {selectedUser ? 'Edit User' : 'Add New User'}
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                    <input
                      type="text"
                      defaultValue={selectedUser?.name || ''}
                      placeholder="Enter user name"
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={selectedUser?.email || ''}
                      placeholder="Enter email address"
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
                  <select
                    defaultValue={selectedUser?.role || ''}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Select a role</option>
                    {roles.filter(r => !r.isSystem).map((role) => (
                      <option key={role.id} value={role.name}>{role.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                  <select
                    defaultValue={selectedUser?.status || 'active'}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    alert(`${selectedUser ? 'Updating' : 'Creating'} user`)
                    setShowCreateUser(false)
                    setSelectedUser(null)
                  }}
                  className="flex-1 px-6 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors"
                >
                  {selectedUser ? 'Update User' : 'Create User'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowCreateUser(false)
                    setSelectedUser(null)
                  }}
                  className="px-6 py-3 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default RolesPermissions
