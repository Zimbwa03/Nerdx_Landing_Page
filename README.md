# NerdX Landing Page

A stunning, professional landing page for the NerdX mobile application - an AI-powered study companion for ZIMSEC & Cambridge O-Level and A-Level students.

## 🎯 Features

- **Premium Design** - Glassmorphism effects, gradient backgrounds, smooth animations
- **Scroll-Based Frame Animation** - 240 frames that animate as you scroll
- **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- **Interactive Elements** - FAQ accordion, smooth scrolling, form validation
- **SEO Optimized** - Meta tags, semantic HTML, proper structure
- **Dual Curriculum Focus** - ZIMSEC & Cambridge emphasized throughout

## 🚀 Getting Started

### Prerequisites

- Python 3.x (for local development server)
- Modern web browser

### Running Locally

1. Clone the repository:
```bash
git clone https://github.com/ngonizimbwa2003-design/Nerdx_Landing_Page.git
cd Nerdx_Landing_Page
```

2. Start a local server:
```bash
python -m http.server 8000
```

3. Open your browser and navigate to:
```
http://localhost:8000
```

## 📁 Project Structure

```
nerdx-landing-page/
├── index.html          # Main landing page
├── styles.css          # Complete CSS styling
├── script.js           # JavaScript functionality
├── test-frames.html    # Frame animation test page
├── neuronet-logo.jpg   # Company logo
├── images/             # Feature images
│   ├── hero_student_nerdx_*.png
│   ├── feature_quiz_interface_*.png
│   ├── feature_ai_teacher_*.png
│   └── ...
└── frames/             # 240 animation frames
    ├── ezgif-frame-001.jpg
    ├── ezgif-frame-002.jpg
    └── ...
```

## 🎨 Key Sections

1. **Hero Section** - Compelling headline with animated background
2. **Features** - 6 key features with generated mockup images
3. **How It Works** - 4-step process guide
4. **Subject Coverage** - O-Level and A-Level subjects
5. **Pricing** - 5 subscription tiers
6. **FAQ** - Interactive accordion
7. **Download** - App store buttons
8. **Contact** - Form and company information

## 📞 Contact Information

- **Company**: Neuronet AI Solutions Pvt Ltd
- **Registration**: 51491A0272025
- **Phone**: +263 78544595
- **Email**: info@neuronet.co.zw
- **Address**: Karimapondo Corner Robert and L Takawira, Harare, Zimbabwe
- **Website**: www.neuronet.co.zw

## 🛠️ Technologies Used

- HTML5
- CSS3 (Glassmorphism, Flexbox, Grid)
- Vanilla JavaScript
- Canvas API (for frame animation)
- Google Fonts (Inter)

## 📱 Responsive Breakpoints

- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+

## 🎬 Frame Animation

The landing page features a unique scroll-based frame animation with 240 frames that creates a dynamic, cinematic background effect. The animation progresses based on scroll position.

## 🚀 Deployment

This site can be deployed to:
- Netlify (configured with `netlify.toml`)
- Vercel (configured with `vercel.json`)
- GitHub Pages
- Any static hosting service

### Deploying to Vercel

The project is pre-configured for Vercel deployment with `vercel.json`. You can deploy using one of the following methods:

#### Method 1: Vercel CLI (Recommended)

1. Install Vercel CLI globally:
```bash
npm i -g vercel
```

2. Navigate to the project directory:
```bash
cd Nerdx_Landing_Page
```

3. Deploy to Vercel:
```bash
vercel
```

4. Follow the prompts to link your project or create a new one.

5. For production deployment:
```bash
vercel --prod
```

#### Method 2: Git Integration (Automatic Deployments)

1. Push your code to GitHub, GitLab, or Bitbucket.

2. Go to [vercel.com](https://vercel.com) and sign in.

3. Click "Add New Project" and import your repository.

4. Vercel will automatically detect the static site configuration:
   - **Framework Preset**: Other (or leave as auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: Leave empty (no build needed)
   - **Output Directory**: `.` (serves from root)

5. Click "Deploy" and Vercel will automatically deploy your site.

6. Your site will be live at `https://your-project-name.vercel.app`

#### Method 3: Drag & Drop

1. Go to [vercel.com](https://vercel.com) and sign in.

2. Drag and drop the project folder onto the Vercel dashboard.

3. Vercel will automatically deploy your site.

#### Vercel Configuration

The `vercel.json` file includes:
- **Clean URLs**: Removes `.html` extensions from URLs
- **Caching Headers**: Optimized caching for static assets (images, CSS, JS)
- **Security Headers**: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
- **SPA Routing**: All routes redirect to `index.html` for client-side routing support

#### Custom Domain

To add a custom domain:
1. Go to your project settings on Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## 📄 License

© 2026 Neuronet AI Solutions Pvt Ltd. All rights reserved.

## 👨‍💻 Developer

Developed by Neuronet AI Solutions team.
