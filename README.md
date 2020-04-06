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

Access Rules:
1.) User starts at base level(level 0)-has generic access to their profile features-(reminders, dashboard, additional features etc)
-Users cannot access their own id, but their ids are handled by admins
2.) A system admin can promote a user to another system admin, and that user will be notified and transferred
3.) If there are no system admins present, one is selected by the machine-and that user will be notified
4.) Levels go from 1(beginning), to level 12. Other system admins can then promote other admins to a higher level or even demote another admin to a lower level of clearence in single level increments, but they cannot promote themselves.
5.) system admins can demote themselves.
6.) To follow unidirectional flow, admins cannot become users again, but they can become eliminated(using some inheritance)
7.) The system must always have at least 1 system admin that is a user, and ideally there is at least 1 system admin at each level. If all admins are stuck at level 1, the machine can promote or demote arbitrary users from the admin list to a level that is empty.
Extra : 
-all users are created(born) with their universal truth, it is a description generated using neural networks. One a user is a system admin, they can get small segements of their truth, with the rest blanked out. Each consecutive level their get promoted, they have more access to the total generated text. 
-key idea: blurring effects, not all users can be top level 12 admin, but they can shift roles, however once demoted from a level they again have more blurring of their universal truth. 

Expansion: Revolve-Socrates
Industry Attribute: Scrape relevant data to their industry(Fashion, Cryptocurrency, Music, Coding, etc)

Next To Do:
- REST to GraphQL Migration with tool: https://chrome.google.com/webstore/detail/project-artemis/gpncgocimlpojfgbphndpjgkkhdjhnpb?hl=en
-Docker Containers
-AWS
-Sharding Database
-Load Balancers
-Typescript conversion
-Rust
-Python



Compatible Browsers:
Google Chrome

Safari? Haha. Funny. 
Internet Explorer