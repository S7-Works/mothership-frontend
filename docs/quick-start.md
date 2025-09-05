# Quick Start Guide

Welcome to Mothership! This guide will walk you through the process of launching your first remote development environment in just a few minutes.

### Step 1: Install the Mothership CLI

The `mothership` CLI is the primary tool for interacting with the Mothership platform. You can install it with a single command:

```bash
npm install -g mothership-cli
```

### Step 2: Log In to Your Account

Next, you'll need to log in to your Mothership account. If you don't have one yet, you can sign up at [mothership.dev](https://mothership.dev).

```bash
mothership login
```

This will prompt you for your username and password.

### Step 3: Prepare Your Project

Navigate to the root directory of the project you want to work on. Mothership uses a standard `docker-compose.yml` file to define your development environment. If you don't have one, you can use this simple example for a Node.js project:

**`docker-compose.yml`**
```yaml
version: '3.8'
services:
  web:
    image: node:18
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    working_dir: /app
    command: npm start
```

### Step 4: Ship It!

Now, from the root of your project, run the `ship` command:

```bash
mothership ship
```

This will read your `docker-compose.yml`, provision a new remote environment in the cloud, and build your containers. This process usually takes 2-3 minutes.

### Step 5: Connect to Your Environment

Once your environment is ready, you can connect to it with the `connect` command:

```bash
mothership connect <your-environment-id>
```

This will establish a secure connection to your remote environment and forward all the necessary ports to your local machine.

**That's it!** You can now open your browser to `http://localhost:3000` and see your application running. You can also use your local editor to modify the files, and the changes will be instantly synced to the remote environment.
