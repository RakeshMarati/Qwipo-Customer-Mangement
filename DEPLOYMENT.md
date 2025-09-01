# 🚀 Deployment Guide - Qwipo Customer Management

This guide will help you deploy the Qwipo Customer Management application to Vercel (Frontend) and Render (Backend).

## 📋 Prerequisites

- GitHub account with the repository
- Vercel account (free)
- Render account (free)

## 🎯 Deployment Steps

### **Frontend Deployment - Vercel**

#### Step 1: Deploy to Vercel
1. **Go to [Vercel](https://vercel.com)** and sign in
2. **Click "New Project"**
3. **Import your GitHub repository**: `RakeshMarati/Qwipo-Customer-Mangement`
4. **Configure the project**:
   - **Framework Preset**: Create React App
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

#### Step 2: Set Environment Variables
1. **Go to Project Settings** → **Environment Variables**
2. **Add the following variable**:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://your-render-app-name.onrender.com/api`
   - **Environment**: Production, Preview, Development

#### Step 3: Deploy
1. **Click "Deploy"**
2. **Wait for build to complete**
3. **Your app will be available at**: `https://your-app-name.vercel.app`

### **Backend Deployment - Render**

#### Step 1: Deploy to Render
1. **Go to [Render](https://render.com)** and sign in
2. **Click "New +"** → **"Web Service"**
3. **Connect your GitHub repository**: `RakeshMarati/Qwipo-Customer-Mangement`
4. **Configure the service**:
   - **Name**: `qwipo-customer-api` (or your preferred name)
   - **Root Directory**: `server`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

#### Step 2: Environment Variables (Optional)
1. **Go to Environment** tab
2. **Add variables if needed**:
   - `NODE_ENV`: `production`
   - `PORT`: `10000` (Render will set this automatically)

#### Step 3: Deploy
1. **Click "Create Web Service"**
2. **Wait for deployment to complete**
3. **Your API will be available at**: `https://your-app-name.onrender.com`

### **Step 4: Update Frontend API URL**

After getting your Render URL, update the environment variable in Vercel:

1. **Go back to Vercel** → **Project Settings** → **Environment Variables**
2. **Update `REACT_APP_API_URL`** with your actual Render URL:
   ```
   https://your-app-name.onrender.com/api
   ```
3. **Redeploy the frontend** (Vercel will auto-redeploy)

## 🔧 Configuration Files

### Frontend (client/vercel.json)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "create-react-app",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Backend (server/package.json)
```json
{
  "name": "server",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

## 🌐 Final URLs

After deployment, you'll have:

- **Frontend**: `https://your-app-name.vercel.app`
- **Backend API**: `https://your-app-name.onrender.com/api`
- **Health Check**: `https://your-app-name.onrender.com/api/health`

## 🧪 Testing Deployment

1. **Test Frontend**: Visit your Vercel URL
2. **Test API**: Visit `https://your-app-name.onrender.com/api/health`
3. **Test Full Flow**: Create a customer with address in the frontend

## 🔍 Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Ensure your Render URL is added to allowed origins in server/index.js
   - Check that environment variables are set correctly

2. **Build Failures**:
   - Check that all dependencies are in package.json
   - Verify Node.js version compatibility

3. **API Not Responding**:
   - Check Render logs for errors
   - Verify the start command is correct

4. **Database Issues**:
   - SQLite database is created automatically in `/tmp` on Render
   - Data will be reset on each deployment (use persistent storage for production)

## 📝 Notes

- **Free Tier Limitations**:
  - Vercel: 100GB bandwidth/month
  - Render: 750 hours/month, sleeps after 15 minutes of inactivity

- **Database**: SQLite is used for simplicity. For production, consider PostgreSQL or MongoDB

- **Environment Variables**: Always use environment variables for sensitive data

## 🎉 Success!

Your Qwipo Customer Management application is now deployed and accessible worldwide!

**Frontend**: https://your-app-name.vercel.app
**Backend**: https://your-app-name.onrender.com/api
