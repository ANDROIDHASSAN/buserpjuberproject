# Production Environment Variables

## 🌐 Frontend (Vercel)
**URL**: https://buserpjuberproject.vercel.app/

### Environment Variables to Add in Vercel:
```
VITE_API_URL=https://buserpjuberproject-api.onrender.com/api
```

### How to Add in Vercel:
1. Go to: https://vercel.com/dashboard
2. Select your project: `buserpjuberproject`
3. Click "Settings" → "Environment Variables"
4. Add the variable above
5. Click "Save"
6. Go to "Deployments" → Redeploy latest

---

## 🔧 Backend (Render)
**URL**: https://buserpjuberproject-api.onrender.com/

### Environment Variables to Add in Render:
```
MONGODB_URI=mongodb+srv://hassan:Hassan%401216@cluster0.7xdxg4o.mongodb.net/?appName=Cluster0
DATABASE_URL=mongodb+srv://hassan:Hassan%401216@cluster0.7xdxg4o.mongodb.net/?appName=Cluster0
PORT=10000
JWT_SECRET=superSecretKey123
JWT_REFRESH_SECRET=superRefreshSecret456
NODE_ENV=production
FRONTEND_URL=https://buserpjuberproject.vercel.app
```

### How to Add in Render:
1. Go to: https://dashboard.render.com/
2. Select your service: `buserpjuberproject-api`
3. Click "Environment" in left sidebar
4. Update `FRONTEND_URL` to: `https://buserpjuberproject.vercel.app`
5. Click "Save Changes"
6. Render will auto-redeploy

---

## 📋 Quick Setup Checklist

### ✅ Vercel Setup:
- [ ] Add `VITE_API_URL` environment variable
- [ ] Redeploy the application
- [ ] Test at https://buserpjuberproject.vercel.app/

### ✅ Render Setup:
- [ ] Update `FRONTEND_URL` to Vercel URL
- [ ] Wait for auto-redeploy (2-3 minutes)
- [ ] Verify CORS allows Vercel domain

### ✅ Testing:
- [ ] Visit https://buserpjuberproject.vercel.app/login
- [ ] Login with: admin@example.com / password123
- [ ] Verify dashboard loads
- [ ] Check all features work

---

## 🔐 Admin Credentials

**Email**: admin@example.com  
**Password**: password123

⚠️ **Important**: Change these credentials after first login!

---

## 🌍 Production URLs

| Service | URL |
|---------|-----|
| **Frontend** | https://buserpjuberproject.vercel.app/ |
| **Backend API** | https://buserpjuberproject-api.onrender.com/ |
| **API Endpoint** | https://buserpjuberproject-api.onrender.com/api |
| **MongoDB** | MongoDB Atlas (Cluster0) |

---

## 🐛 Troubleshooting

### Issue: 404 on Vercel
**Solution**: 
- Verify `client/vercel.json` exists with SPA routing
- Check build completed successfully
- Ensure root directory is set to `client`

### Issue: CORS Error
**Solution**:
- Verify `FRONTEND_URL` in Render matches Vercel URL exactly
- No trailing slash in URL
- Wait for Render to finish redeploying

### Issue: API Connection Failed
**Solution**:
- Check `VITE_API_URL` in Vercel settings
- Verify Render backend is "Live" (not "Deploying")
- Test backend directly: https://buserpjuberproject-api.onrender.com/

---

## 📊 Deployment Status

- ✅ **Backend**: Deployed to Render
- ✅ **Database**: MongoDB Atlas configured
- ✅ **Admin User**: Created
- ⏳ **Frontend**: Needs environment variable + redeploy
- ⏳ **CORS**: Needs FRONTEND_URL update in Render

---

## 🚀 Next Steps

1. **Update Render `FRONTEND_URL`** to `https://buserpjuberproject.vercel.app`
2. **Add `VITE_API_URL` in Vercel** settings
3. **Redeploy Vercel** frontend
4. **Test login** at production URL
5. **Celebrate!** 🎉
