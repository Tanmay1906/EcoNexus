import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  sender: 'admin' | 'recycler'
  content: string
  timestamp: string
  attachment?: string
  read: boolean
}

const MessagingCenter: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'admin',
      content: 'Your recent PET recycling submission has been approved. Payment will be processed within 24 hours.',
      timestamp: '2024-01-15T10:30:00',
      read: true
    },
    {
      id: '2',
      sender: 'recycler',
      content: 'Thank you for the approval. I have submitted another batch of HDPE materials for verification.',
      timestamp: '2024-01-15T11:45:00',
      read: true
    },
    {
      id: '3',
      sender: 'admin',
      content: 'We noticed some quality issues in your recent LDPE submission. Please ensure better material sorting in future submissions.',
      timestamp: '2024-01-14T15:20:00',
      read: false,
      attachment: 'quality_guidelines.pdf'
    },
    {
      id: '4',
      sender: 'recycler',
      content: 'Understood. I will improve the sorting process. Can you provide specific guidelines?',
      timestamp: '2024-01-14T16:00:00',
      read: true
    },
    {
      id: '5',
      sender: 'admin',
      content: 'Great work on your compliance score! You\'ve maintained an excellent rating of 92/100 this month.',
      timestamp: '2024-01-13T09:15:00',
      read: true
    }
  ])

  const [newMessage, setNewMessage] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (newMessage.trim() || selectedFile) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'recycler',
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
        attachment: selectedFile?.name,
        read: true
      }
      
      setMessages(prev => [...prev, message])
      setNewMessage('')
      setSelectedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const markAsRead = (messageId: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      )
    )
  }

  const unreadCount = messages.filter(msg => !msg.read && msg.sender === 'admin').length

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800 rounded-xl border border-slate-700 h-[600px] flex flex-col"
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-3xl">💬</span>
            Messages
            {unreadCount > 0 && (
              <span className="px-2 py-1 bg-emerald-400 text-slate-900 rounded-full text-xs font-bold">
                {unreadCount}
              </span>
            )}
          </h2>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Online
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`flex ${message.sender === 'recycler' ? 'justify-end' : 'justify-start'}`}
              onClick={() => markAsRead(message.id)}
            >
              <div className={`max-w-lg ${message.sender === 'recycler' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.sender === 'recycler'
                      ? 'bg-blue-900 text-white ml-auto'
                      : message.read
                      ? 'bg-slate-700 text-slate-100'
                      : 'bg-emerald-400/20 text-emerald-100 border border-emerald-400/30'
                  }`}
                >
                  {/* Sender indicator */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium opacity-70">
                      {message.sender === 'admin' ? 'PLASTIFY Admin' : 'You'}
                    </span>
                    {!message.read && message.sender === 'admin' && (
                      <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                    )}
                  </div>

                  {/* Message content */}
                  <p className="text-sm leading-relaxed">{message.content}</p>

                  {/* Attachment */}
                  {message.attachment && (
                    <div className="mt-2 flex items-center gap-2 p-2 bg-slate-800/50 rounded-lg">
                      <span className="text-lg">📎</span>
                      <span className="text-xs truncate">{message.attachment}</span>
                    </div>
                  )}

                  {/* Timestamp */}
                  <div className="mt-2 text-xs opacity-50">
                    {new Date(message.timestamp).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-6 border-t border-slate-700">
        {selectedFile && (
          <div className="mb-3 flex items-center gap-2 p-2 bg-slate-700/50 rounded-lg">
            <span className="text-sm">📎</span>
            <span className="text-sm text-slate-300 truncate">{selectedFile.name}</span>
            <button
              onClick={() => {
                setSelectedFile(null)
                if (fileInputRef.current) fileInputRef.current.value = ''
              }}
              className="ml-auto text-red-400 hover:text-red-300"
            >
              ×
            </button>
          </div>
        )}

        <div className="flex gap-3">
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900 resize-none"
              rows={2}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage()
                }
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors cursor-pointer flex items-center justify-center"
            >
              📎
            </label>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              disabled={!newMessage.trim() && !selectedFile}
              className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </motion.button>
          </div>
        </div>

        <div className="mt-2 text-xs text-slate-500">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </motion.section>
  )
}

export default MessagingCenter
