# TicTacToe Multiplayer Project

This is a full-stack multiplayer TicTacToe game, featuring real-time gameplay, user authentication, and lobby management. The project is divided into two main parts:

- **client/**: React.js frontend for user interaction and game display.
- **server/**: Node.js (TypeScript) backend for authentication, game logic, and real-time communication.

---

## Features

- User registration and login
- Lobby system for joining/creating games
- Real-time multiplayer TicTacToe gameplay
- Scoreboard and player profiles
- Socket-based communication for instant updates
- Responsive UI

---

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

### Installation

#### 1. Clone the repository

```bash
git clone <repo-url>
cd tictactoe
```

#### 2. Install dependencies

##### Client

```bash
cd client
npm install
```

##### Server

```bash
cd ../server
npm install
```

#### 3. Start the applications

##### Start the server

```bash
cd server
npm run dev
```

##### Start the client

```bash
cd ../client
npm start
```

The client will typically run on `http://localhost:3000` and the server on `http://localhost:5000` (or as configured).

---

## Usage

1. Open the client in your browser.
2. Register a new user or log in with existing credentials.
3. Join or create a game lobby.
4. Play TicTacToe in real-time with another user.

---

## Testing Multiple Games

To test multiplayer functionality:

- Open two different browsers (or use incognito/private mode for the second session).
- Log in with two different user accounts.
- Join the same lobby or create separate games.
- You can now play against yourself in real-time, verifying that moves and game state sync correctly between both browsers.

---

## Project Structure

```
tictactoe/
  client/   # React frontend
  server/   # Node.js backend (TypeScript)
```

- See each folder's README or code for more details.

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE) (or specify your license)
