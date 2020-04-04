# revolve
Node.js Application For Reminders with React, MongoDB REST Archetype
Messaging Text Notifications using Nextmo with Verification

Features:
1. Users sign up/sign in with username or email
2. View, Add, Edit reminders(dashboard)
3. Get text notifications or emails when reminders are due
4. JWT Authentication
5. Universal Cookie with Context Provider and pseudo-hook(withCookies) as a Wrapped Higher Order Component to inject the globally accessible prop child from root App


Server localhost:3001
Client: localhost:3000

Client:
- google maps react
- moment time-zone
- HashRouter
- Context 

Cookie Tracking for Client an Server(Server Side Rendering)
Use of react-cookie(incorporates universal-cookie for react):
<CookieProvider> </CookieProvider>
Set path to "/" for global access(entry route)
Wraps the universal cookie around App(Top Level Parent Component) which reduces the need of redux to a single state handler to store User Info on Login.
Provider is also used for server(see universal-cookie-express)


Server:
-Express
-MongoDB-with pre and post mongoose hooks


Keywords: 
MERN,
node-js
axios
reactjs
react
redux
react-redux
expressjs
mongoose
mongodb
no-sql
productivity
full-stack

Testing
jest
enzyme


Deployment Forms:
Heroku
Firebase



Next To Do:
- REST to GraphQL Migration with tool: https://chrome.google.com/webstore/detail/project-artemis/gpncgocimlpojfgbphndpjgkkhdjhnpb?hl=en
-Docker Containers
-AWS
-Sharding Database
-Load Balancers
-Typescript conversion
-Rust
-Python
