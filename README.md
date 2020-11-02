# Unity Publisher Client

A beautiful app that makes use of [Unity Publisher API](https://github.com/Kwintenvdb/unity-publisher-api) to fetch and visualize data from Unity's Asset Store Publisher management.

![screenshot](screenshot.png)

## Why?

The Unity Publisher Administration page is old, slow, lacking features, and it's quite ugly. In fact it looks like it's been abandoned for quite some time while the rest of Unity's services have been kept up to date and modernized over the years.

This means that Unity Asset Store publishers have to use this slow interface whenever they want to check their asset sales, new reviews, etc. It offers no additional features such as email notifications for new sales. We can do better than that.

## What?

This application is simple a nicer layer on top of Unity's existing APIs. It has a nicer interface, better visualizes your sales data with charts, and adds some extra features such as sales email alerts.

## Setup

This application is currently meant for **self hosting only!** It requires your Unity ID credentials in order to fetch all data, which you should never entrust to a third party. Because of this self hosting only philosophy, the application also currently allows only a single Unity account per instance. In other words, do not expose expose this application over a public network. Once you have logged in with your Unity credentials, anyone with access to the application will have access to your data.

This repository contains both an application server (Node.js / Koa) and frontend (React.js) module. Both modules need to be built before you can serve the application on your local machine. This process will be further simplified in the future.

### Building the frontend

Building for production:

```
cd frontend
npm i && npm run build
```

Starting a development build with hot reloading:

```
cd frontend
npm i && npm start
```

### Building the backend

Building for production:

```
cd server
npm i && npm run build
```

Starting a development server with hot reloading:

```
cd server
npm i && npm start
```

### Running the application

Once you are done developing, you can use a process manager like [PM2](https://pm2.keymetrics.io/) to run the application is a continuous process on your machine. There's already a PM2 ecosystem file included in the project, so you just have to run this to start the server:

```
npm i pm2 -g
cd server
pm2 start ecosystem.config.js
```

## Features
* Display sales data in a beautiful interface
   * View sales by month or total (all time) sales
   * Handy graphs for quickly viewing sales ratios and growth over time
* An overview of all your Asset Store packages and their average ratings
* An overview of all reviews for your assets
* Email alerts for new sales
* Toggle between a beautiful light or dark theme

## Roadmap

* Sales features:
   * Sales gross threshold for email alerts
* Reviews features:
   * Filter reviews by package and date
   * Email alerts for new reviews
* Using Lerna to manage dependencies properly
