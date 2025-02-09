# Vedics App Documentation

## Project Overview
Vedics App is a modern Vedic astrology application built with React and TypeScript. It provides personalized astrological insights, daily readings, and an AI-powered chat system for spiritual guidance.

## Technical Stack
- **Frontend Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 6.1.0
- **Styling**: TailwindCSS with clsx and tailwind-merge for class composition
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion 12.3.0
- **Routing**: React Router 7.1.5
- **API Communication**: Axios 1.7.9
- **Internationalization**: i18next 24.2.2
- **Date Handling**: date-fns 4.1.0
- **Markdown Rendering**: react-markdown 9.0.3
- **Icons**: Lucide React 0.474.0
- **Testing**: Vitest with React Testing Library

## Project Structure

### Core Directories
- `/src/components/`: Reusable UI components
  - `/ui/`: Radix UI based components
  - `/navigation/`: Navigation-related components
- `/src/features/`: Feature-specific modules
  - `/auth/`: Authentication
  - `/chat/`: AI chat system
  - `/daily-stars/`: Daily readings
  - `/onboarding/`: User onboarding flow
  - `/predictions/`: Astrological predictions
  - `/profile/`: User profile management
- `/src/services/`: API services
- `/src/hooks/`: Custom React hooks
- `/src/contexts/`: React context providers
- `/src/i18n/`: Internationalization setup
- `/src/types/`: TypeScript type definitions

## Core Features

### Authentication & User Management
- Secure login system
- User profile management
- Birth details collection and storage
- Multi-language support

### Predictions System
Implements a modular prediction system that displays various types of astrological insights:
- Renders predictions in a tabbed interface
- Supports multiple prediction types
- Handles both text and structured data
- Responsive and interactive prediction cards

### Daily Stars Feature
- Fetches personalized daily readings
- Real-time updates
- Error handling and loading states
- Responsive layout for different screen sizes

### AI Chat System
Implements an interactive chat system with:
- Real-time message handling
- Session management
- Message history
- Suggested questions
- Markdown support for formatted responses
- Typing indicators

### Onboarding Flow
- Multi-step user onboarding
- Birth details collection
- Language selection
- Interest selection
- Form validation

## Development Setup

### Prerequisites
- Node.js (Latest LTS version)
- npm or yarn

### Installation
```bash
npm install
```

### Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run linting
npm run lint

# Format code
npm run format
```

### Code Quality Tools
- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks
- TypeScript for type checking

## Build and Optimization
- Optimized chunk splitting
- Modern bundle size management
- Source maps for production debugging
- TypeScript strict mode enabled

## Testing
- Unit testing with Vitest
- React Testing Library for component tests
- Jest DOM for DOM testing utilities
- User event simulation support

## Future Development
1. Enhanced prediction algorithms
2. Advanced chart visualizations
3. Offline support
4. Push notifications
5. Community features
6. Premium subscription features
7. Mobile app development

## Contributing
- Follow the established code style
- Write tests for new features
- Update documentation for significant changes
- Use conventional commits for version control


- Follow the established code style
- Write tests for new features
- Update documentation for significant changes
- Use conventional commits for version control
