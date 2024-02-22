# route_planner (In Development)

> **Note:** This project is currently in active development and is not yet ready for production use. Features and documentation are subject to change.

Route planner for postman

## Description

The Route Planner App is a sophisticated, user-friendly web application designed to streamline the process of planning delivery routes. Aimed at businesses and individuals who require an efficient way to manage and distribute goods across a specific area, this application leverages the power of Google Maps API to provide precise, optimized routing solutions.

At its core, the Route Planner App allows users to define a delivery area on a map and automatically generates the most efficient route to cover all specified destinations. This not only saves time and resources but also significantly reduces the environmental impact by minimizing unnecessary travel.

### Key Features:

- Interactive Map Integration: Utilizes Google Maps API for easy selection of delivery areas and visualization of routes.
- Optimized Route Planning: Automatically calculates the shortest possible route to visit all addresses within the selected area, ensuring time and fuel efficiency.
- Address Import: Users can input a list of addresses, and the app will mark them on the map, including options for importing addresses from a CSV file for larger operations.
- Customizable Delivery Preferences: Supports marking addresses with specific delivery instructions, such as "No Junk Mail" or "Under Construction," to tailor the delivery process.
- User Authentication: Secure signup and login functionality, with email verification for new users to enhance security and user management.
- Responsive Design: Fully responsive web design ensures a seamless experience across all devices, from desktops to smartphones.
- Environmental Impact: By optimizing routes, the app contributes to reduced fuel consumption and lower carbon emissions.

### Technology Stack:

- Frontend: React.js for a dynamic and interactive user interface, styled with CSS3 and Bootstrap for responsiveness.
- Backend: Firebase for authentication, database management, and hosting, ensuring a scalable, serverless architecture.
- APIs: Google Maps API for map rendering, address lookup, and route optimization.

### Target Audience:

The Route Planner App is ideal for small to medium-sized businesses in the delivery industry, including food services, couriers, and e-commerce platforms. It's also a valuable tool for community organizations, event planners, and anyone needing to manage multiple delivery points efficiently.

### Vision:

Our vision is to make delivery planning as effortless and eco-friendly as possible. We aim to continuously enhance the app's features based on user feedback, integrating more customization options and advanced route optimization algorithms to meet the evolving needs of our users.

The Route Planner App stands out by offering a blend of user-friendly design, powerful functionality, and a commitment to sustainability. Whether you're managing daily deliveries for your business or planning a one-time event, our app provides the tools you need to plan routes more efficiently and effectively.

## Getting Started

### Installing

Steps to get a development environment running:

Clone the repository:

```bash
git clone git@github.com:jeffreyc2017/route-planner.git
```

Navigate to the project directory:

```bash
cd route-planner
```

Install dependencies:

```bash
npm install
```

Set up the API key for google maps API in:

```bash
src/components/map/cofnig.dev.js
```

for development, or

```bash
src/somponents/map/config.prd.js
```

for production build.

Set up the API key for Firebase API in:

```bash
src/components/signup/firebase_cofnig.dev.js
```

for development, or

```bash
src/somponents/signup/firebase_config.prd.js
```

for production build.

Build the project for development:

```bash
npm run build:dev
```

Build the project for production and deploy it:

```bash
npm run build:prd
```

Start the development server:

```bash
npm start
```

### License

This project is licensed under the GPL-3.0 License - see the LICENSE.md file for details.

### Authors

Jeffreyc2017
