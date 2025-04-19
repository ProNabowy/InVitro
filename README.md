# Doctor Booking UI Module

A responsive and accessible appointment booking UI for a healthcare platform. This project focuses on front-end implementation with React, including layout, interaction, accessibility, and code quality.

## Features

- **Doctor Directory View**: Browse and filter doctors by specialty and availability
- **Booking Modal**: Select time slots and book appointments with doctors
- **Appointments Summary**: View and manage your booked appointments
- **Responsive Design**: Works seamlessly across mobile, tablet, and desktop
- **Accessibility**: Keyboard navigable with proper ARIA attributes

## Tech Stack

- **Frontend**: React, JavaScript
- **Styling**: TailwindCSS
- **State Management**: React Context API
- **Testing**: Cypress for end-to-end testing

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd doctor-booking-ui
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Run tests:

   ```bash
   npm run test
   ```

5. Run Cypress tests:
   ```bash
   npm run cypress:open
   ```

## AI Tools Usage

This project was developed with assistance from AI tools:

- **Cursor IDE**: Used for code generation, refactoring, and optimization
- **AI Pair Programming**: Leveraged AI to:
  - Scaffold components and structure
  - Generate mock data
  - Optimize accessibility features
  - Create and improve test cases
  - Implement performance optimizations (React.memo, useMemo)
  - Fix bugs and improve code quality

## Known Limitations

- No backend integration - all data is mocked
- No authentication system
- No persistent storage (appointments reset on page refresh)
- Limited error handling for edge cases
- No offline support

## Next Steps

- Implement backend integration for real data
- Add user authentication
- Implement persistent storage for appointments
- Enhance error handling for all edge cases
- Add more comprehensive accessibility features
- Improve test coverage for all components
- Add unit tests for individual components
- Implement offline support with service workers

## Accessibility

This application has been designed with accessibility in mind:

- Keyboard navigation support
- ARIA attributes for screen readers
- Semantic HTML structure
- Sufficient color contrast
- Responsive design for all screen sizes

## Performance Optimizations

Several performance optimizations have been implemented:

- React.memo for components that don't need frequent re-renders
- useMemo for expensive computations
- Lazy loading for images
- Optimized rendering cycles

## Project Structure

```
src/
├── assets/          # Static assets and styles
├── components/      # Reusable UI components
├── context/         # React Context for state management
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── db/             # Mock data
└── utils/          # Utility functions
```

## Development Environment

- Node.js v18+
- npm v9+
- Vite for development and building
- ESLint for code linting
- Prettier for code formatting

## Code Quality

- ESLint configuration for code quality
- Prettier for consistent code formatting
- PropTypes for type checking
- Comprehensive component documentation
- Performance optimizations with React.memo and custom hooks

## License

MIT
