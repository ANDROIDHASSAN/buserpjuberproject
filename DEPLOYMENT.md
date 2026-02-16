# Vercel Deployment Guide

## Quick Deploy Steps

### 1. Prepare Your Repository

The code is already pushed to GitHub at: `https://github.com/ANDROIDHASSAN/buserpjuberproject.git`

### 2. Deploy Frontend to Vercel

#### Step-by-Step:

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Click "Add New" → "Project"

2. **Import Repository**
   - Select "Import Git Repository"
   - Choose `ANDROIDHASSAN/buserpjuberproject`
   - Click "Import"

3. **Configure Project**
   
   **Framework Preset**: `Vite`
   
   **Root Directory**: Click "Edit" and select `client`
   
   **Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   
   **Environment Variables** (Click "Add"):
   ```
   VITE_API_URL = https://your-backend-url.com/api
   ```
   ⚠️ You'll update this after deploying the backend

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)
   - Copy your frontend URL (e.g., `https://buserpjuberproject.vercel.app`)

### 3. Deploy Backend

You have two options:

#### Option A: Deploy Backend to Render (Recommended)

1. **Go to Render Dashboard**
   - Visit: https://render.com/
   - Sign up/Login with GitHub
   - Click "New" → "Web Service"

2. **Connect Repository**
   - Select `buserpjuberproject`
   - Click "Connect"

3. **Configure Service**
   ```
   Name: buserpjuberproject-api
   Region: Choose closest to you
   Branch: main
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Environment Variables**
   Add these in the "Environment" section:
   ```
   MONGODB_URI = mongodb+srv://hassan:Hassan%401216@cluster0.7xdxg4o.mongodb.net/?appName=Cluster0
   DATABASE_URL = mongodb+srv://hassan:Hassan%401216@cluster0.7xdxg4o.mongodb.net/?appName=Cluster0
   PORT = 10000
   JWT_SECRET = superSecretKey123
   JWT_REFRESH_SECRET = superRefreshSecret456
   NODE_ENV = production
   FRONTEND_URL = https://buserpjuberproject.vercel.app
   ```
   ⚠️ Replace `FRONTEND_URL` with your actual Vercel frontend URL from Step 2

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (3-5 minutes)
   - Copy your backend URL (e.g., `https://buserpjuberproject-api.onrender.com`)

#### Option B: Deploy Backend to Railway

1. **Go to Railway**
   - Visit: https://railway.app/
   - Sign up/Login with GitHub

2. **Create New Project**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select `buserpjuberproject`

3. **Configure**
   - Root Directory: `server`
   - Add environment variables (same as Render above)

4. **Deploy**
   - Railway will auto-deploy
   - Copy your backend URL

### 4. Update Frontend Environment Variable

1. **Go back to Vercel Dashboard**
   - Select your project
   - Go to "Settings" → "Environment Variables"
   - Edit `VITE_API_URL`
   - Set it to: `https://your-backend-url.com/api`
   - Example: `https://buserpjuberproject-api.onrender.com/api`

2. **Redeploy Frontend**
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Click "Redeploy"

### 5. Test Your Deployment

1. Visit your Vercel URL: `https://buserpjuberproject.vercel.app`
2. Try logging in with:
   - Email: `admin@example.com`
   - Password: `password123`

## Troubleshooting

### Issue: 404 Error on Vercel

**Solution**: 
- Verify `client/vercel.json` exists with SPA routing rules
- Check build logs in Vercel dashboard
- Ensure `dist` folder is being created during build

### Issue: API Connection Failed

**Solution**:
1. Check CORS settings in `server/index.js`
2. Verify `FRONTEND_URL` environment variable in backend
3. Ensure `VITE_API_URL` in Vercel matches your backend URL
4. Check backend logs for errors

### Issue: MongoDB Connection Error

**Solution**:
1. Verify MongoDB connection string is correct
2. Check MongoDB Atlas network access (allow all IPs: 0.0.0.0/0)
3. Ensure database user has proper permissions

### Issue: Build Fails

**Solution**:
```bash
# Locally test the build
cd client
npm run build

# Check for TypeScript errors
npm run build 2>&1 | grep error
```

## Environment Variables Checklist

### Frontend (Vercel)
- [ ] `VITE_API_URL` - Your backend API URL

### Backend (Render/Railway)
- [ ] `MONGODB_URI` - MongoDB connection string
- [ ] `DATABASE_URL` - Same as MONGODB_URI
- [ ] `PORT` - 10000 (Render) or auto (Railway)
- [ ] `JWT_SECRET` - Your secret key
- [ ] `JWT_REFRESH_SECRET` - Your refresh secret
- [ ] `NODE_ENV` - production
- [ ] `FRONTEND_URL` - Your Vercel frontend URL

## Post-Deployment Steps

1. **Create Admin User**
   - Use the default credentials or create via API

2. **Update CORS**
   - Verify your frontend URL is allowed in backend CORS

3. **Test All Features**
   - Login/Logout
   - Student management
   - Fee calculations
   - Reports

4. **Monitor**
   - Check Vercel Analytics
   - Monitor backend logs
   - Set up error tracking (optional: Sentry)

## Continuous Deployment

Both Vercel and Render/Railway support automatic deployments:

- **Push to GitHub** → Automatically deploys to production
- **Pull Requests** → Creates preview deployments (Vercel)

## Custom Domain (Optional)

### Add Custom Domain to Vercel:
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Add Custom Domain to Render:
1. Go to Service Settings → Custom Domain
2. Add your domain
3. Update DNS records

## Cost Estimate

- **Vercel**: Free tier (Hobby) - Perfect for this project
- **Render**: Free tier available (spins down after inactivity)
- **Railway**: $5/month credit (pay for usage)
- **MongoDB Atlas**: Free tier (512MB storage)

**Total**: $0-5/month depending on backend choice

## Support

If you encounter issues:
1. Check build logs in Vercel/Render dashboard
2. Review browser console for frontend errors
3. Check backend logs for API errors
4. Verify all environment variables are set correctly

## Next Steps

After successful deployment:
- [ ] Change default admin password
- [ ] Add more users
- [ ] Configure email notifications (optional)
- [ ] Set up monitoring and alerts
- [ ] Add custom domain
- [ ] Enable HTTPS (automatic on Vercel/Render)
