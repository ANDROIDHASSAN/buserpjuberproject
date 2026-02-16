# Bus Management SaaS Application

A comprehensive bus management system with student tracking, fees management, route planning, and driver coordination.

## 🚀 Features

- **Student Management**: Complete student profiles with family grouping
- **Fees Engine**: Automated fee calculation with family discounts
- **Route Management**: Bus routes and stop management
- **Driver Portal**: Dedicated interface for drivers
- **Parent Portal**: Parent access to student information
- **Reports & Analytics**: Comprehensive reporting dashboard
- **Role-Based Access**: Admin, Driver, and Parent roles

## 📋 Tech Stack

### Frontend
- React 19 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- React Router for navigation
- Recharts for data visualization
- Framer Motion for animations

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- bcrypt for password hashing
- Helmet for security

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/ANDROIDHASSAN/buserpjuberproject.git
cd buserpjuberproject
```

2. **Install dependencies**
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. **Environment Configuration**

Create `.env` file in the `server` directory:
```env
MONGODB_URI=your_mongodb_connection_string
DATABASE_URL=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here
NODE_ENV=development
```

Create `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

4. **Run the application**

```bash
# Terminal 1 - Start backend server
cd server
npm run dev

# Terminal 2 - Start frontend
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🚢 Deployment

### Vercel Deployment (Recommended)

#### Option 1: Deploy via Vercel Dashboard

1. **Push code to GitHub** (already done)

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Configure as follows:

3. **Project Settings**
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `cd client && npm install && npm run build`
   - **Output Directory**: `client/dist`
   - **Install Command**: `npm install`

4. **Environment Variables**
   Add these in Vercel dashboard under Settings → Environment Variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   DATABASE_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

#### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Backend Deployment Options

Since this is a full-stack application, you have two options:

#### Option A: Separate Deployments (Recommended)

**Frontend on Vercel:**
- Deploy the `client` folder as a static site
- Set `VITE_API_URL` to your backend URL

**Backend on Railway/Render:**

1. **Railway**
   ```bash
   # Install Railway CLI
   npm i -g @railway/cli
   
   # Login and deploy
   railway login
   cd server
   railway init
   railway up
   ```

2. **Render**
   - Create new Web Service
   - Connect GitHub repo
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variables

#### Option B: Monorepo on Vercel

The `vercel.json` configuration supports both frontend and backend:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "client/dist" }
    },
    {
      "src": "server/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "server/index.js" },
    { "src": "/(.*)", "dest": "client/dist/$1" }
  ]
}
```

## 🔐 Default Credentials

After deployment, create an admin user or use:
- **Email**: admin@example.com
- **Password**: password123

⚠️ **Important**: Change these credentials immediately after first login!

## 📁 Project Structure

```
buserpjuberproject/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   ├── context/       # React context
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Backend Node.js application
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Utility functions
│   └── package.json
├── docs/                 # Documentation
└── vercel.json          # Vercel configuration
```

## 🔧 Configuration

### CORS Configuration

Update `server/index.js` to allow your frontend domain:

```javascript
const corsOptions = {
  origin: ['http://localhost:5173', 'https://your-vercel-domain.vercel.app'],
  credentials: true
};
```

### API URL Configuration

Update `client/src/utils/axios.ts` with your production API URL:

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'https://your-api-domain.com/api';
```

## 🐛 Troubleshooting

### 404 Error on Vercel

If you see a 404 error:
1. Check that `client/vercel.json` has the rewrite rule for SPA routing
2. Verify build output is in `client/dist`
3. Check Vercel build logs for errors

### API Connection Issues

1. Verify CORS settings allow your frontend domain
2. Check environment variables are set correctly
3. Ensure MongoDB connection string is valid
4. Check API URL in frontend matches backend URL

### Build Failures

1. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
2. Check TypeScript errors: `npm run build`
3. Verify all dependencies are in package.json

## 📝 License

MIT License

## 👥 Support

For issues and questions:
- Create an issue on GitHub
- Contact: [Your Contact Info]

## 🎯 Roadmap

- [ ] Mobile app integration
- [ ] Real-time GPS tracking
- [ ] Push notifications
- [ ] Advanced analytics
- [ ] Multi-language support
