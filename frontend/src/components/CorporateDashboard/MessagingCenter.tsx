import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  sender: string
  senderType: 'corporate' | 'upcycler' | 'admin'
  content: string
  timestamp: string
  status: 'sent' | 'delivered' | 'read'
  hasAttachment?: boolean
  attachmentName?: string
}

interface Chat {
  id: string
  participant: string
  participantType: 'upcycler' | 'admin'
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isActive: boolean
  messages: Message[]
}

const MessagingCenter: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      participant: 'GreenCraft Studios',
      participantType: 'upcycler',
      lastMessage: 'The corporate tote bags are ready for shipment',
      lastMessageTime: '10:30 AM',
      unreadCount: 2,
      isActive: true,
      messages: [
        {
          id: '1',
          sender: 'GreenCraft Studios',
          senderType: 'upcycler',
          content: 'Hello! We have an update on your corporate order.',
          timestamp: '2024-01-15T09:00:00Z',
          status: 'read'
        },
        {
          id: '2',
          sender: 'You',
          senderType: 'corporate',
          content: 'Great! What\'s the status of the order?',
          timestamp: '2024-01-15T09:15:00Z',
          status: 'read'
        },
        {
          id: '3',
          sender: 'GreenCraft Studios',
          senderType: 'upcycler',
          content: 'The corporate tote bags are ready for shipment',
          timestamp: '2024-01-15T10:30:00Z',
          status: 'delivered'
        }
      ]
    },
    {
      id: '2',
      participant: 'PLASTIFY Admin',
      participantType: 'admin',
      lastMessage: 'Your ESG report has been generated',
      lastMessageTime: 'Yesterday',
      unreadCount: 0,
      isActive: false,
      messages: [
        {
          id: '1',
          sender: 'PLASTIFY Admin',
          senderType: 'admin',
          content: 'Your monthly ESG report is now available',
          timestamp: '2024-01-14T14:00:00Z',
          status: 'read',
          hasAttachment: true,
          attachmentName: 'ESG_Report_January_2024.pdf'
        }
      ]
    },
    {
      id: '3',
      participant: 'EcoStationery Co',
      participantType: 'upcycler',
      lastMessage: 'Bulk discount applied to your order',
      lastMessageTime: '2 days ago',
      unreadCount: 1,
      isActive: false,
      messages: [
        {
          id: '1',
          sender: 'EcoStationery Co',
          senderType: 'upcycler',
          content: 'Thank you for your bulk order! We\'ve applied a 15% discount.',
          timestamp: '2024-01-13T11:00:00Z',
          status: 'delivered'
        }
      ]
    }
  ])

  const [activeChat, setActiveChat] = useState<Chat | null>(chats.find(c => c.isActive) || null)
  const [messageInput, setMessageInput] = useState('')
  const [showNewMessage, setShowNewMessage] = useState(false)
  const [newRecipient, setNewRecipient] = useState('')
  const [newMessageContent, setNewMessageContent] = useState('')

  const handleSendMessage = () => {
    if (!messageInput.trim() || !activeChat) return

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'You',
      senderType: 'corporate',
      content: messageInput,
      timestamp: new Date().toISOString(),
      status: 'sent'
    }

    setChats(prev => prev.map(chat => 
      chat.id === activeChat.id 
        ? {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: messageInput,
            lastMessageTime: 'Just now'
          }
        : chat
    ))

    setActiveChat(prev => prev ? {
      ...prev,
      messages: [...prev.messages, newMessage],
      lastMessage: messageInput,
      lastMessageTime: 'Just now'
    } : null)

    setMessageInput('')
  }

  const handleSelectChat = (chatId: string) => {
    const selectedChat = chats.find(c => c.id === chatId)
    if (selectedChat) {
      setActiveChat(selectedChat)
      setChats(prev => prev.map(chat => ({
        ...chat,
        isActive: chat.id === chatId,
        unreadCount: chat.id === chatId ? 0 : chat.unreadCount
      })))
    }
  }

  const handleStartNewChat = () => {
    if (!newRecipient.trim() || !newMessageContent.trim()) return

    const newChat: Chat = {
      id: Date.now().toString(),
      participant: newRecipient,
      participantType: 'upcycler',
      lastMessage: newMessageContent,
      lastMessageTime: 'Just now',
      unreadCount: 0,
      isActive: true,
      messages: [
        {
          id: '1',
          sender: 'You',
          senderType: 'corporate',
          content: newMessageContent,
          timestamp: new Date().toISOString(),
          status: 'sent'
        }
      ]
    }

    setChats(prev => [newChat, ...prev.map(c => ({ ...c, isActive: false }))])
    setActiveChat(newChat)
    setShowNewMessage(false)
    setNewRecipient('')
    setNewMessageContent('')
  }

  const getSenderColor = (senderType: string) => {
    switch (senderType) {
      case 'corporate':
        return 'bg-blue-500 text-white'
      case 'upcycler':
        return 'bg-emerald-500 text-white'
      case 'admin':
        return 'bg-teal-500 text-white'
      default:
        return 'bg-slate-500 text-white'
    }
  }

  const getParticipantIcon = (type: string) => {
    switch (type) {
      case 'upcycler':
        return '♻️'
      case 'admin':
        return '👤'
      default:
        return '🏢'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    if (diffInHours < 48) return 'Yesterday'
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Messages</h2>
        <p className="text-slate-600">Communicate with upcyclers and PLASTIFY team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="p-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-800">Conversations</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNewMessage(true)}
                  className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  +
                </motion.button>
              </div>
            </div>
            
            <div className="divide-y divide-slate-100">
              {chats.map(chat => (
                <motion.div
                  key={chat.id}
                  whileHover={{ backgroundColor: '#F8FAFC' }}
                  onClick={() => handleSelectChat(chat.id)}
                  className={`p-4 cursor-pointer transition-colors ${
                    chat.isActive ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${getSenderColor(chat.participantType)}`}>
                      {getParticipantIcon(chat.participantType)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-slate-800 truncate">{chat.participant}</p>
                        <span className="text-xs text-slate-500">{chat.lastMessageTime}</span>
                      </div>
                      <p className="text-sm text-slate-600 truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unreadCount > 0 && (
                      <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {chat.unreadCount}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-2">
          {activeChat ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${getSenderColor(activeChat.participantType)}`}>
                    {getParticipantIcon(activeChat.participantType)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{activeChat.participant}</p>
                    <p className="text-sm text-slate-600 capitalize">{activeChat.participantType}</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeChat.messages.map(message => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${message.sender === 'You' ? 'order-2' : 'order-1'}`}>
                      <div className={`px-4 py-2 rounded-lg ${
                        message.sender === 'You'
                          ? 'bg-blue-500 text-white'
                          : getSenderColor(message.senderType)
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        {message.hasAttachment && (
                          <div className="mt-2 p-2 bg-white/20 rounded-lg flex items-center gap-2">
                            <span className="text-xs">📎</span>
                            <span className="text-xs">{message.attachmentName}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-1 px-2">
                        {formatTimestamp(message.timestamp)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-slate-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Send
                  </motion.button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-[600px] flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Select a conversation</h3>
                <p className="text-slate-600">Choose a chat from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Message Modal */}
      <AnimatePresence>
        {showNewMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewMessage(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-slate-800 mb-4">Start New Conversation</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Recipient
                  </label>
                  <input
                    type="text"
                    value={newRecipient}
                    onChange={(e) => setNewRecipient(e.target.value)}
                    placeholder="Enter upcycler name or admin..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={newMessageContent}
                    onChange={(e) => setNewMessageContent(e.target.value)}
                    placeholder="Type your message..."
                    rows={4}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowNewMessage(false)}
                  className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStartNewChat}
                  disabled={!newRecipient.trim() || !newMessageContent.trim()}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Start Chat
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

export default MessagingCenter
