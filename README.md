# skills-copilot-codespaces-vscode

My clone repository

Simple MERN todo tracker (minimal, client uses React via CDN).

Run (inside the devcontainer):
1. Install server deps:
   cd server
   npm install
2. Start server:
   npm run dev
3. Open in host browser:
   $BROWSER http://localhost:5000

By default the server connects to mongodb://localhost:27017/todos. Set MONGO_URI env to override.
