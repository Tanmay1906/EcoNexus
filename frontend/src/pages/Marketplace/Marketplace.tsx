import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Navbar, 
  FilterRow, 
  CreditCard, 
  ProductCard, 
  RightInsightsPanel, 
  BottomAnalyticsBar, 
  CreditDetails 
} from '../../components/marketplace'

const Marketplace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'credits' | 'products'>('credits')
  const [selectedCredit, setSelectedCredit] = useState<any>(null)
  const [showInsights, setShowInsights] = useState(true)

  // Mock data for plastic credits
  const credits = [
    {
      id: 'PC-2024-001',
      weight: 500,
      price: 1250,
      change: 5.2,
      verificationStatus: 'verified' as const,
      recycler: 'GreenTech Recycling',
      esgScore: 92,
      sparkline: [1200, 1180, 1190, 1210, 1230, 1220, 1250],
      issuedOn: '2024-01-15',
      verifiedBy: 'EcoVerify Agency',
      ipfsHash: 'QmXxx...123',
      blockchainTx: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
    },
    {
      id: 'PC-2024-002',
      weight: 750,
      price: 1875,
      change: -2.1,
      verificationStatus: 'verified' as const,
      recycler: 'Circular Solutions',
      esgScore: 88,
      sparkline: [1900, 1880, 1860, 1850, 1865, 1870, 1875],
      issuedOn: '2024-01-14',
      verifiedBy: 'EcoVerify Agency',
      ipfsHash: 'QmYyy...456',
      blockchainTx: '0x8b9c5d2e7f1a3b4c6d8e9f0a1b2c3d4e5f6a7b8'
    },
    {
      id: 'PC-2024-003',
      weight: 300,
      price: 825,
      change: 8.7,
      verificationStatus: 'pending' as const,
      recycler: 'EcoWaste Management',
      esgScore: 85,
      sparkline: [750, 760, 780, 790, 800, 815, 825],
      issuedOn: '2024-01-13',
      verifiedBy: 'EcoVerify Agency',
      ipfsHash: 'QmZzz...789',
      blockchainTx: '0x9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e'
    }
  ]

  // Mock data for upcycled products with real images
  const products = [
    {
      id: 'UP-2024-001',
      name: 'Eco-Friendly Laptop Stand',
      price: 899,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop',
      upcycler: 'EcoCraft Studio',
      material: 'Recycled PET',
      esgRating: 'A',
      demandTrend: [85, 88, 92, 90, 94, 96, 98],
      availability: 'In Stock',
      deliveryTime: '3-5 days',
      description: 'Sustainable laptop stand made from 100% recycled PET bottles. Ergonomic design with adjustable height.',
      specifications: ['100% Recycled PET', 'Adjustable Height', 'Weight Capacity: 10kg', 'Non-slip base'],
      reviews: 127,
      rating: 4.8
    },
    {
      id: 'UP-2024-002',
      name: 'Sustainable Office Chair',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
      upcycler: 'GreenDesign Works',
      material: 'Mixed Recycled Plastics',
      esgRating: 'A+',
      demandTrend: [92, 94, 93, 95, 97, 99, 101],
      availability: 'Limited Stock',
      deliveryTime: '5-7 days',
      description: 'Premium ergonomic office chair crafted from mixed recycled plastics. Features lumbar support and breathable mesh back.',
      specifications: ['Mixed Recycled Materials', 'Ergonomic Design', 'Lumbar Support', '5-Year Warranty'],
      reviews: 89,
      rating: 4.9
    },
    {
      id: 'UP-2024-003',
      name: 'Recycled Plastic Planters',
      price: 299,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
      upcycler: 'Urban Eco',
      material: 'HDPE Recycled',
      esgRating: 'B+',
      demandTrend: [78, 80, 82, 85, 88, 90, 93],
      availability: 'In Stock',
      deliveryTime: '2-3 days',
      description: 'Set of 3 decorative planters made from recycled HDPE. Perfect for indoor and outdoor gardening.',
      specifications: ['100% Recycled HDPE', 'Set of 3', 'Drainage Holes', 'UV Resistant'],
      reviews: 203,
      rating: 4.6
    },
    {
      id: 'UP-2024-004',
      name: 'Upcycled Backpack',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop',
      upcycler: 'ReThread Fashion',
      material: 'Recycled Polyester',
      esgRating: 'A',
      demandTrend: [88, 90, 87, 91, 94, 96, 99],
      availability: 'In Stock',
      deliveryTime: '4-6 days',
      description: 'Stylish and durable backpack made from recycled polyester bottles. Multiple compartments and laptop sleeve.',
      specifications: ['Recycled Polyester', '25L Capacity', 'Water-resistant', 'Padded Laptop Sleeve'],
      reviews: 156,
      rating: 4.7
    },
    {
      id: 'UP-2024-005',
      name: 'Eco Storage Bins',
      price: 499,
      image: 'https://images.unsplash.com/photo-1595428779288-5f7986d6b67e?w=300&h=200&fit=crop',
      upcycler: 'PlasticRevive',
      material: 'Recycled PP',
      esgRating: 'B+',
      demandTrend: [75, 78, 82, 85, 87, 89, 91],
      availability: 'In Stock',
      deliveryTime: '3-4 days',
      description: 'Set of 4 stackable storage bins made from recycled polypropylene. Perfect for home organization.',
      specifications: ['Recycled PP', 'Set of 4', 'Stackable Design', 'Lids Included'],
      reviews: 94,
      rating: 4.5
    },
    {
      id: 'UP-2024-006',
      name: 'Sustainable Desk Organizer',
      price: 399,
      image: 'https://images.unsplash.com/photo-1554189243-4f1a895a13d3?w=300&h=200&fit=crop',
      upcycler: 'OfficeGreen',
      material: 'Recycled ABS',
      esgRating: 'A-',
      demandTrend: [82, 84, 86, 88, 90, 92, 94],
      availability: 'Limited Stock',
      deliveryTime: '2-3 days',
      description: 'Multi-functional desk organizer made from recycled ABS plastic. Includes pen holder, phone stand, and document tray.',
      specifications: ['Recycled ABS', 'Multi-compartment', 'Non-slip Base', 'Modern Design'],
      reviews: 67,
      rating: 4.4
    },
    {
      id: 'UP-2024-007',
      name: 'Recycled Garden Furniture Set',
      price: 3999,
      image: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=300&h=200&fit=crop',
      upcycler: 'OutdoorEco',
      material: 'Recycled HDPE',
      esgRating: 'A+',
      demandTrend: [95, 97, 96, 98, 101, 103, 105],
      availability: 'Pre-order',
      deliveryTime: '2-3 weeks',
      description: 'Complete outdoor furniture set including table and 4 chairs made from weather-resistant recycled HDPE.',
      specifications: ['Weather-resistant HDPE', '4 Chairs + Table', 'UV Protected', '5-Year Warranty'],
      reviews: 42,
      rating: 4.9
    },
    {
      id: 'UP-2024-008',
      name: 'Eco Phone Cases',
      price: 199,
      image: 'https://images.unsplash.com/photo-1596458131634-cbb1e0c221b5?w=300&h=200&fit=crop',
      upcycler: 'TechEco',
      material: 'Recycled TPU',
      esgRating: 'B+',
      demandTrend: [70, 73, 76, 79, 82, 85, 88],
      availability: 'In Stock',
      deliveryTime: '2-3 days',
      description: 'Protective phone cases made from recycled TPU. Available for multiple phone models with various designs.',
      specifications: ['Recycled TPU', 'Shock-resistant', 'Wireless Charging Compatible', 'Multiple Designs'],
      reviews: 234,
      rating: 4.3
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <Navbar />

      {/* Filter Row */}
      <FilterRow activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <div className="flex">
        {/* Main Market Area */}
        <div className={`flex-1 transition-all duration-300 ${showInsights ? 'mr-80' : ''}`}>
          <div className="p-6">
            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'credits' ? (
                <motion.div
                  key="credits"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Plastic Credits Market</h2>
                    <p className="text-gray-600">Trade verified plastic carbon credits on the blockchain</p>
                  </div>

                  {/* Credit Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {credits.map((credit, index) => (
                      <CreditCard
                        key={credit.id}
                        credit={credit}
                        onClick={() => setSelectedCredit(credit)}
                        index={index}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="products"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Upcycled Products</h2>
                    <p className="text-gray-600">Premium products made from recycled materials</p>
                  </div>

                  {/* Product Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        index={index}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Insights Panel */}
        <AnimatePresence>
          {showInsights && (
            <RightInsightsPanel
              onClose={() => setShowInsights(false)}
              credits={credits}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Analytics Bar */}
      <BottomAnalyticsBar credits={credits} />

      {/* Credit Details Modal */}
      <AnimatePresence>
        {selectedCredit && (
          <CreditDetails
            credit={selectedCredit}
            onClose={() => setSelectedCredit(null)}
          />
        )}
      </AnimatePresence>

      {/* Floating Insights Toggle */}
      {!showInsights && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowInsights(true)}
          className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-l-lg shadow-lg z-40"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </motion.button>
      )}
    </div>
  )
}

export default Marketplace
