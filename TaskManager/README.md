# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



# Task Manager Application

A React-based task management application with authentication, drag-and-drop functionality, and local storage persistence.

## Features

- 🔐 User Authentication with OTP verification
- 📋 Kanban-style task management
- 🔄 Drag and drop tasks between columns
- 📊 Task statistics dashboard
- 👤 User profile management
- 💾 Local storage persistence
- 📱 Responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Krish40savadhi/ClickUp.git
cd TaskManager
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## Usage

### Authentication

1. Navigate to the login page
2. Enter your email and password
3. Enter the OTP sent to your email (simulated in this version)
4. Upon successful verification, you'll be redirected to the dashboard

### Task Management

- **Create Task**: Click the "+" button in the bottom right corner
- **Edit Task**: Click the "Edit" button on any task card
- **Delete Task**: Click the "Delete" button on any task card
- **Move Task**: Drag and drop tasks between columns (Todo, In Progress, Done)

### Profile Management

1. Click on "Profile" in the navigation bar
2. Update your personal information
3. Click "Save Changes" to update your profile

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── TaskCard
│   ├── Column
│   ├── TaskForm
│   └── Modal
├── context/         # Global state management
│   ├── AuthenticationContext
│   └── TaskContent
├── pages/          # Route components
│   ├── Login
│   ├── Dashboard
│   ├── Boards
│   └── Profile
└── hooks/          # Custom hooks
```

## Features in Detail

### Task Management
- Create, edit, and delete tasks
- Set task status (Todo, In Progress, Done)
- Add due dates to tasks
- View days remaining until deadline

### Dashboard
- Overview of all tasks
- Task statistics by status
- Quick access to task management
- Profile settings

### Authentication
- Email/Password login
- OTP verification
- Persistent login state
- Secure logout

## Local Storage

The application uses browser's localStorage for:
- User authentication state
- Task data persistence
- Profile information

Data is automatically cleared upon logout.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Technologies Used

- React 18
- React Router v6
- Tailwind CSS
- date-fns
- Local Storage API

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments

- React Documentation
- Tailwind CSS
- React Router
- date-fns library

## Support

For support, email your.email@example.com or open an issue in the repository.