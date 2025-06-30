# Frontend Assessment Project

A modern Next.js application built as a frontend assessment, featuring a custom landing page template with modular component architecture.

## 🚀 Technologies Used

- **Next.js 15** - React framework with App Router
- **React 18** - Frontend library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting and formatting

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── templates/
│   │   └── LandingPage/
│   │       └── LandingPageTemplate.tsx
│   └── organisms/
│       └── LandingPage/
│           └── LandingPageMainView.tsx
└── lib/
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/zohaib68-adly/frontendassessment.git
cd frontendassessment/my-nextjs-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🧩 Component Architecture

The project follows a modular component architecture:

- **Templates**: High-level page layouts (`LandingPageTemplate`)
- **Organisms**: Complex UI components (`LandingPageMainView`)
- **App Router**: Modern Next.js routing in the `app/` directory

## 🎨 Styling

This project uses Tailwind CSS for styling with:
- Responsive design principles
- Dark mode support
- Custom font integration (Geist)
- Utility-first approach

## 📱 Features

- ✅ Responsive landing page design
- ✅ TypeScript for type safety
- ✅ Modern Next.js App Router
- ✅ Component-based architecture
- ✅ Tailwind CSS styling
- ✅ ESLint configuration

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com/new)
3. Vercel will automatically deploy your app

### Other Deployment Options

- **Netlify**: Connect your GitHub repository
- **AWS Amplify**: Deploy with AWS services
- **Static Export**: Use `npm run build` for static hosting

## 📚 Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Documentation](https://react.dev) - Learn React fundamentals
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/docs) - TypeScript documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Development Notes

- The main page component is located in `src/app/page.tsx`
- Custom components are organized in `src/components/`
- Global styles are in `src/app/globals.css`
- The app auto-updates as you edit files during development

---

Built with ❤️ for frontend assessment
