import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  sender: 'upcycler' | 'corporate' | 'admin'
  content: string
  timestamp: string
  attachment?: string
  read: boolean
}

const MessagingCenter: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'corporate',
      content: 'We are interested in bulk ordering your Eco-Tote Collection. Can you provide a quote for 100 units?',
      timestamp: '2024-01-15T10:30:00',
      read: true
    },
    {
      id: '2',
      sender: 'upcycler',
      content: 'Thank you for your interest! We can offer a special price of ₹220 per unit for bulk orders. The lead time would be 14 days.',
      timestamp: '2024-01-15T11:45:00',
      read: true
    },
    {
      id: '3',
      sender: 'corporate',
      content: 'That sounds reasonable. Can you send us some product samples for quality review?',
      timestamp: '2024-01-15T14:20:00',
      read: false,
      attachment: 'sample_request.pdf'
    },
    {
      id: '4',
      sender: 'admin',
      content: 'Your marketplace listing has been approved and is now live. You should start receiving inquiries soon.',
      timestamp: '2024-01-14T09:15:00',
      read: true
    },
    {
      id: '5',
      sender: 'corporate',
      content: 'The samples look great! We would like to proceed with the order. Please send the invoice.',
      timestamp: '2024-01-13T16:00:00',
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
        sender: 'upcycler',
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

  const unreadCount = messages.filter(msg => !msg.read && msg.sender !== 'upcycler').length

  const getSenderColor = (sender: string) => {
    switch (sender) {
      case 'upcycler':
        return 'bg-gradient-to-r from-pink-500/20 to-violet-500/20 text-pink-300 border-pink-500/30'
      case 'corporate':
        return 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30'
      case 'admin':
        return 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-300 border-emerald-500/30'
      default:
        return 'bg-slate-700/50 text-slate-300 border-slate-500/30'
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-cyber-slate rounded-2xl p-6 border border-cyan-500/30 h-[600px] flex flex-col"
      style={{
        background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(10, 15, 36, 0.9) 100%)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 0 30px rgba(0, 229, 255, 0.2), inset 0 0 20px rgba(255, 0, 127, 0.1)'
      }}
    >
      {/* Header */}
      <div className="p-4 border-b border-cyan-500/30">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-3xl">💬</span>
            Messages
            {unreadCount > 0 && (
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="px-2 py-1 bg-pink-500 text-white rounded-full text-xs font-bold"
              >
                {unreadCount}
              </motion.span>
            )}
          </h2>
          <div className="flex items-center gap-2 text-cyan-400 text-sm">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            Online
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`flex ${message.sender === 'upcycler' ? 'justify-end' : 'justify-start'}`}
              onClick={() => markAsRead(message.id)}
            >
              <div className={`max-w-lg ${message.sender === 'upcycler' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.sender === 'upcycler'
                      ? getSenderColor('upcycler')
                      : getSenderColor(message.sender)
                  }`}
                  style={{
                    backdropFilter: 'blur(10px)',
                    boxShadow: message.sender === 'upcycler' 
                      ? '0 0 15px rgba(255, 0, 127, 0.3)'
                      : '0 0 15px rgba(0, 229, 255, 0.3)'
                  }}
                >
                  {/* Sender indicator */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium opacity-70">
                      {message.sender === 'upcycler' && 'You'}
                      {message.sender === 'corporate' && 'Corporate Buyer'}
                      {message.sender === 'admin' && 'PLASTIFY Admin'}
                    </span>
                    {!message.read && message.sender !== 'upcycler' && (
                      <motion.div
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2 h-2 bg-pink-400 rounded-full"
                      />
                    )}
                  </div>

                  {/* Message content */}
                  <p className="text-sm leading-relaxed">{message.content}</p>

                  {/* Attachment */}
                  {message.attachment && (
                    <div className="mt-2 flex items-center gap-2 p-2 bg-slate-800/50 rounded-lg border border-slate-600/50">
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
      <div className="p-4 border-t border-cyan-500/30">
        {selectedFile && (
          <div className="mb-3 flex items-center gap-2 p-2 bg-slate-800/50 rounded-lg border border-slate-600/50">
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
              className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
              style={{
                backdropFilter: 'blur(10px)',
                boxShadow: 'inset 0 0 10px rgba(0, 229, 255, 0.1)'
              }}
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
              className="px-4 py-2 bg-slate-800/50 text-cyan-300 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer flex items-center justify-center border border-cyan-500/30"
              style={{
                backdropFilter: 'blur(10px)'
              }}
            >
              📎
            </label>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              disabled={!newMessage.trim() && !selectedFile}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              style={{
                boxShadow: '0 0 15px rgba(0, 229, 255, 0.3)'
              }}
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
