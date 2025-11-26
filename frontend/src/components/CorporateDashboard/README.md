# Corporate Dashboard Components

This directory contains all the modular components for the PLASTIFY Corporate Dashboard, designed for corporate clients to manage their ESG compliance, plastic credits, and sustainability initiatives.

## 🏗️ Component Structure

### Core Components

1. **CorporateOverview.tsx** - Main dashboard with KPIs and quick actions
2. **PlasticCreditWallet.tsx** - Blockchain wallet for managing NFT plastic credits
3. **CreditMarketplace.tsx** - Marketplace to purchase verified plastic credits
4. **UpcycledProducts.tsx** - Corporate gifting store for sustainable products
5. **ESGAnalytics.tsx** - Comprehensive analytics dashboard with charts
6. **BlockchainAudit.tsx** - Transparent blockchain transaction history
7. **MessagingCenter.tsx** - Communication hub for corporate interactions
8. **CorporateProfile.tsx** - Company profile and EPR settings management
9. **CorporateSidebar.tsx** - Navigation sidebar with MetaMask integration

### Main Dashboard

- **Corporate.tsx** - Main dashboard container that integrates all components

## 🎨 Design System

### Color Palette
- **Primary**: Royal Blue (#1E40AF) - Trust and enterprise
- **Secondary**: Teal (#06B6D4) - Blockchain verification
- **Accent**: Emerald (#10B981) - Sustainability impact
- **Background**: Cloud White (#F8FAFC) - Clean interface
- **Dark**: Navy Slate (#0F172A) - Blockchain panels
- **Highlight**: Gold (#FBBF24) - Premium KPIs

### Typography & Spacing
- Clean fintech-inspired layout
- Professional spacing and shadows
- Glassmorphism effects for modern appeal
- Responsive grid systems

## 🚀 Features

### 1. Corporate Overview
- **KPI Cards**: Animated counters for key metrics
- **Quick Actions**: Direct access to main features
- **EPR Compliance**: Real-time compliance tracking
- **Sustainability Score**: Overall ESG performance

### 2. Plastic Credit Wallet
- **MetaMask Integration**: Connect blockchain wallet
- **NFT Credit Display**: Grid view of owned credits
- **Verification Status**: Real-time verification badges
- **Transfer Functionality**: Send credits to other addresses
- **IPFS Certificates**: Access to proof documents

### 3. Credit Marketplace
- **Advanced Filtering**: Weight, price, verification status
- **Verified Recyclers**: Only certified sellers
- **Impact Categories**: Filter by environmental impact
- **Real-time Pricing**: Dynamic marketplace rates
- **Bulk Purchases**: Support for large orders

### 4. Upcycled Products
- **Corporate Gifting**: Sustainable product catalog
- **Bulk Discounts**: Volume-based pricing
- **Sample Requests**: Try before bulk ordering
- **Material Transparency**: Detailed material sourcing
- **Delivery Tracking**: Lead time management

### 5. ESG Analytics
- **Interactive Charts**: Line, bar, donut, radar charts
- **Time Range Selection**: Monthly, quarterly, yearly views
- **Material Breakdown**: Plastic type analysis
- **CO₂ Offset Tracking**: Environmental impact metrics
- **Circularity Metrics**: Recycling and reuse rates

### 6. Blockchain Audit
- **Complete Transparency**: Full transaction history
- **Search & Filter**: Find specific transactions
- **Etherscan Integration**: Direct blockchain links
- **IPFS Proof**: Document verification
- **Audit Reports**: Downloadable compliance reports

### 7. Messaging Center
- **Multi-party Chat**: Corporate, upcycler, admin communication
- **File Attachments**: Share documents and certificates
- **Real-time Updates**: Instant messaging
- **Message Status**: Sent, delivered, read indicators
- **Conversation History**: Complete chat records

### 8. Corporate Profile
- **Company Information**: Legal and contact details
- **EPR Settings**: Compliance targets and regions
- **Document Upload**: ESG reports and certificates
- **Sustainability Officer**: Primary contact management
- **ESG Summary**: Generate compliance reports

## 🛠️ Technical Implementation

### Technologies Used
- **React 18+** with functional components and hooks
- **TypeScript** for type safety
- **Tailwind CSS** for responsive styling
- **Framer Motion** for smooth animations
- **Lucide React** for consistent icons
- **Axios** for API integration (placeholders)

### Key Features
- **Fully Responsive**: Mobile, tablet, desktop optimized
- **Component-based**: Modular and reusable architecture
- **Animation-rich**: Smooth transitions and micro-interactions
- **Type-safe**: Complete TypeScript coverage
- **Accessibility**: WCAG compliant design patterns

### State Management
- Local component state with useState
- Props drilling for simple data flow
- Context ready for future scaling
- Mock data for development and testing

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (single column)
- **Tablet**: 768px - 1024px (two columns)
- **Desktop**: > 1024px (full layout)

### Adaptive Features
- Collapsible sidebar on mobile
- Touch-friendly interactions
- Optimized chart rendering
- Responsive grid systems

## 🔧 Integration Points

### API Endpoints (Placeholders)
```typescript
// Wallet endpoints
GET /api/corporate/wallet/balance
GET /api/corporate/wallet/credits
POST /api/corporate/wallet/transfer

// Marketplace endpoints
GET /api/corporate/marketplace/listings
POST /api/corporate/marketplace/purchase

// Analytics endpoints
GET /api/corporate/analytics/esg
GET /api/corporate/analytics/offset

// Profile endpoints
GET /api/corporate/profile
PUT /api/corporate/profile
POST /api/corporate/profile/documents
```

### Blockchain Integration
- **MetaMask**: Web3 wallet connection
- **Ethers.js**: Blockchain interaction library
- **IPFS**: Decentralized storage for certificates
- **Smart Contracts**: Plastic credit NFT contracts

## 🎯 User Experience

### Navigation Flow
1. **Dashboard Entry**: Overview of all metrics
2. **Wallet Management**: View and manage credits
3. **Marketplace**: Purchase additional credits
4. **Products**: Order sustainable goods
5. **Analytics**: Review ESG performance
6. **Audit**: Verify blockchain transactions
7. **Messages**: Communicate with partners
8. **Profile**: Manage company settings

### Key Interactions
- **One-click Actions**: Quick access to common tasks
- **Real-time Updates**: Live data synchronization
- **Progressive Disclosure**: Information revealed on demand
- **Visual Feedback**: Loading states and success indicators

## 🔄 Future Enhancements

### Planned Features
- **AI-powered Insights**: Predictive analytics
- **Advanced Reporting**: Custom report builder
- **Integration Hub**: Third-party system connections
- **Mobile App**: Native mobile experience
- **Multi-language Support**: Global accessibility

### Scalability Considerations
- **Microservices Ready**: Component isolation
- **Caching Strategy**: Performance optimization
- **CDN Integration**: Asset delivery
- **Database Optimization**: Query performance

## 📊 Performance Metrics

### Optimization Techniques
- **Code Splitting**: Lazy loading components
- **Image Optimization**: WebP format support
- **Bundle Analysis**: Size monitoring
- **Caching Strategy**: Browser and server caching

### Monitoring
- **Error Tracking**: Comprehensive error handling
- **Performance Metrics**: Load time tracking
- **User Analytics**: Behavior analysis
- **A/B Testing**: Feature optimization

---

## 🚀 Getting Started

1. **Install Dependencies**: `npm install`
2. **Start Development**: `npm run dev`
3. **Navigate**: `/dashboard/cume/corporate`
4. **Explore**: Click through all dashboard sections

## 📞 Support

For questions or issues regarding the Corporate Dashboard:
- Review component documentation
- Check API integration points
- Test responsive behavior
- Verify blockchain connectivity

---

*This Corporate Dashboard represents enterprise-grade sustainability management, combining cutting-edge blockchain technology with intuitive user experience design.*
