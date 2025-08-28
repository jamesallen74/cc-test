# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This repository contains a **Financial Calculator Suite** - a modern React application built with TypeScript and Tailwind CSS. The application provides three main calculators: Loan Calculator, Mortgage Calculator, and Investment Calculator.

## Development Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm package manager

### Commands
- `cd financial-calculator` - Navigate to the project directory
- `npm install` - Install dependencies
- `npm run dev` - Start development server (runs on http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Tech Stack
- **React 18** with functional components and hooks
- **TypeScript** for type safety
- **Vite** as build tool and dev server
- **Tailwind CSS** for styling
- **@tailwindcss/postcss** for CSS processing

## Architecture

### Project Structure
```
financial-calculator/
├── src/
│   ├── components/
│   │   ├── calculators/          # Calculator components
│   │   │   ├── LoanCalculator.tsx
│   │   │   ├── MortgageCalculator.tsx
│   │   │   └── InvestmentCalculator.tsx
│   │   └── common/               # Reusable UI components
│   │       ├── InputField.tsx
│   │       └── ResultCard.tsx
│   ├── types/
│   │   └── calculator.ts         # TypeScript interfaces
│   ├── utils/
│   │   └── calculations.ts       # Financial calculation logic
│   ├── App.tsx                   # Main app component
│   └── main.tsx                  # Entry point
├── public/                       # Static assets
└── dist/                         # Build output
```

### Key Components
- **App.tsx**: Main application with navigation between calculators
- **Calculator Components**: Individual calculators with real-time calculations
- **InputField**: Reusable input component with prefix/suffix support
- **ResultCard**: Formatted display for calculation results
- **calculations.ts**: Pure functions for financial calculations

### Financial Calculations
- **Loan Calculator**: Monthly payments, total amount, and interest
- **Mortgage Calculator**: Includes property taxes and insurance
- **Investment Calculator**: Compound interest with regular contributions

## Development Notes
- Uses type-only imports for TypeScript interfaces (`import type`)
- All styling handled through Tailwind CSS classes
- Real-time calculations update as users type
- Responsive design for mobile and desktop
- Currency formatting using Intl.NumberFormat