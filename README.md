DAVE PORTFOLIO —  DOCUMENTATION
==========================================
# My Portfolio Blobs

<div align="center">

<a href="URL_TO_YOUR_PROJECTS">
  <img src="https://img.shields.io/badge/Projects-15%2B-brightgreen?style=for-the-badge&logo=appveyor" alt="Projects" />
</a>
<a href="URL_TO_YOUR_LINKEDIN">
  <img src="https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin" alt="LinkedIn" />
</a>
<a href="URL_TO_YOUR_BLOG">
  <img src="https://img.shields.io/badge/Blog-Articles-orange?style=for-the-badge&logo=hashnode" alt="Blog" />
</a>
<a href="https://github.com/yourusername">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>

</div>


### PROJECT OVERVIEW
----------------
A fully responsive, production-ready portfolio website built by Dave, a Software Engineer.
Design philosophy: achromatic luxury — deep black backgrounds, charcoal gradients, silver accents,
glassmorphism panels, and motion-heavy transitions that feel premium without any color saturation.


### FOLDER STRUCTURE
----------------
```
dave-portfolio/
├── index.html             
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── README.md             
└── src/
    ├── main.tsx           
    ├── App.tsx             
    ├── styles/
    │   └── globals.css     
    │                       
    │                       
    │                       
    ├── assets/
    │   ├── avatar1.png     
    │   └── avatar2.png     
    └── components/
        ├── CustomCursor.tsx
        ├── Navbar.tsx      
        ├── Hero.tsx        
        │                   
        ├── About.tsx       
        │                  
        ├── Services.tsx    
        ├── Projects.tsx    
        ├── Testimonials.tsx
        ├── Contact.tsx     
        └── Footer.tsx      
```

HOW TO RUN
----------
```
1. Install dependencies:
```
   npm install
```

2. Start dev server:
```
   npm run dev
   → Opens at http://localhost:5173
```

3. Build for production:
```
   npm run build
   → Output in /dist folder
```

4. Preview production build:
```
   npm run preview
```

DESIGN DECISIONS 
- No purple (original UI theme translated to full achromatic — depth via gradients not hue)
  

Built by [Dave](https://github.com/davex-ai)