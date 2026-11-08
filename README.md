# 📚 Knowledge Hub - Personal Workspace

A modern, responsive web application for capturing ideas, managing projects, and organizing study materials. Built with Next.js, Tailwind CSS, and Firebase.

![Knowledge Hub](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Firebase](https://img.shields.io/badge/Firebase-Ready-orange?style=for-the-badge&logo=firebase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?style=for-the-badge&logo=tailwindcss)

## ✨ Features

- 📝 **Quick Notes** - Instantly capture ideas and thoughts
- 🚀 **Project Tracking** - Manage and monitor project progress
- 📚 **Study Materials** - Organize textbooks, papers, and courses
- 📱 **Mobile Responsive** - Works seamlessly on phone and desktop
- 🌙 **Dark Theme** - Easy on the eyes with modern UI
- ☁️ **Cloud Ready** - Firebase integration for sync across devices
- 🔐 **Secure** - User authentication (when Firebase is configured)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A web browser

### Installation

1. **Navigate to the project directory:**
```bash
cd knowledge-hub
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

🎉 **That's it!** Your Knowledge Hub is now running locally with browser localStorage.

## 🔥 Firebase Setup (Optional - For Cloud Sync)

Follow these steps to enable cloud synchronization and authentication:

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter a project name (e.g., "knowledge-hub")
4. Disable Google Analytics (optional) and click **"Create project"**

### Step 2: Register Your Web App

1. In your Firebase project dashboard, click the **Web icon** (</>) under "Get started by adding Firebase to your app"
2. Register app with a nickname (e.g., "Knowledge Hub Web")
3. **Don't check** "Also set up Firebase Hosting"
4. Click **"Register app"**

### Step 3: Copy Firebase Configuration

You'll see a configuration object like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### Step 4: Configure Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### Step 5: Enable Firestore Database

1. In Firebase Console, go to **"Build" > "Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Select a location (closest to you)
5. Click **"Enable"**

### Step 6: Enable Authentication (Optional)

1. Go to **"Build" > "Authentication"**
2. Click **"Get started"**
3. Enable **"Email/Password"** sign-in method
4. Save

### Step 7: Set Firestore Security Rules

In Firestore Database, go to the **"Rules"** tab and add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Step 8: Restart Development Server

```bash
# Stop the server (Ctrl+C) and restart
npm run dev
```

✅ **Firebase is now configured!** Your data will sync across devices.

## 🌐 Deploy to Vercel (Free Hosting)

### Step 1: Push to GitHub

1. Create a new repository on [GitHub](https://github.com)
2. Push your code:

```bash
cd knowledge-hub
git init
git add .
git commit -m "Initial commit: Knowledge Hub"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/knowledge-hub.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Import your `knowledge-hub` repository
5. **Configure Environment Variables:**
   - Click **"Environment Variables"**
   - Add each variable from your `.env.local` file:
     - `NEXT_PUBLIC_FIREBASE_API_KEY`
     - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
     - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
     - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
     - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
     - `NEXT_PUBLIC_FIREBASE_APP_ID`

6. Click **"Deploy"**

### Step 3: Access Your App

After deployment (1-2 minutes), you'll get a URL like:
```
https://knowledge-hub-abc123.vercel.app
```

🎉 **Your Knowledge Hub is now live and accessible from anywhere!**

### Step 4: Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click **"Settings" > "Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions

## 📱 Mobile Access

### Add to Home Screen (iOS)

1. Open your deployed app in Safari
2. Tap the **Share** button
3. Scroll and tap **"Add to Home Screen"**
4. Tap **"Add"**

### Add to Home Screen (Android)

1. Open your deployed app in Chrome
2. Tap the menu (three dots)
3. Tap **"Add to Home screen"**
4. Tap **"Add"**

Now your Knowledge Hub is a quick-launch app icon!

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **Storage:** Firebase Storage
- **Hosting:** Vercel

## 📁 Project Structure

```
knowledge-hub/
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Dashboard homepage
│   ├── notes/
│   │   └── page.tsx        # Quick notes page
│   ├── projects/
│   │   └── page.tsx        # Projects management
│   ├── study/
│   │   └── page.tsx        # Study materials
│   └── settings/
│       └── page.tsx        # Settings & data export
├── components/
│   ├── Sidebar.tsx         # Desktop navigation
│   ├── MobileNav.tsx       # Mobile navigation drawer
│   ├── QuickNoteCard.tsx   # Note card component
│   ├── ProjectCard.tsx     # Project card component
│   └── StudyCard.tsx       # Study material card
├── lib/
│   └── firebase.ts         # Firebase configuration
└── .env.local              # Environment variables
```

## 💾 Data Management

### Current Storage (Default)
- Uses browser `localStorage` for data persistence
- Data stays on your device
- Works offline

### With Firebase (After Setup)
- Data syncs across all your devices
- Access from phone, tablet, and PC
- Automatic backups
- Real-time updates

### Export/Import Data

Go to **Settings** page to:
- **Export:** Download all data as JSON backup
- **Import:** Restore from backup file
- **Clear:** Delete all local data

## 🔒 Security Notes

- Never commit `.env.local` to GitHub (it's in `.gitignore`)
- Update Firebase security rules for production
- Use Firebase Authentication before deploying publicly
- Regular backups recommended

## 🎨 Customization

### Change Theme Colors

Edit `app/globals.css` to customize colors:

```css
/* Example: Change primary color */
.bg-blue-600 { background-color: #your-color; }
```

### Add New Sections

1. Create new page: `app/your-section/page.tsx`
2. Add route to navigation in `components/Sidebar.tsx` and `components/MobileNav.tsx`

## 🐛 Troubleshooting

### Port 3000 already in use?
```bash
# Use a different port
npm run dev -- -p 3001
```

### Firebase errors?
- Check that all environment variables are set correctly
- Verify Firebase project is active
- Ensure Firestore is enabled

### Build errors?
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💡 Future Enhancements

- [ ] Firebase authentication UI
- [ ] File upload support
- [ ] Tags and categories
- [ ] Search functionality
- [ ] Markdown support in notes
- [ ] Calendar view for projects
- [ ] Collaboration features
- [ ] Mobile app (React Native)

## 📞 Support

If you have questions or need help:
- Check the troubleshooting section
- Review Firebase documentation
- Open an issue on GitHub

---

**Made with ❤️ using Next.js and Firebase**

Happy learning and organizing! 🚀
