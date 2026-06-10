# RideFlow

RideFlow is a modern ride-hailing platform inspired by real-world transportation services such as Uber and Careem. The application provides an end-to-end booking experience, allowing users to search for destinations, request rides, track nearby drivers, and monitor trip progress in real time.

## Features

### Authentication & User Management

* Secure user registration and login.
* Persistent authentication state management.
* Protected routes for authenticated users.

### Interactive Maps

* Real-time user location detection.
* Google Maps integration.
* Pickup and destination search with place autocomplete.
* Route visualization between locations.

### Ride Booking System

* Ride request creation.
* Multiple ride categories and pricing options.
* Estimated trip distance and duration calculation.
* Dynamic fare estimation.

### Driver Discovery & Tracking

* Nearby drivers displayed on the map.
* Driver selection workflow.
* Live driver movement simulation and tracking.
* Real-time trip status updates.

### Trip Management

* Trip request confirmation.
* Driver arrival tracking.
* Ride start and completion flow.
* End-to-end ride lifecycle management.

## Tech Stack

* Next.js 16.2
* React 19
* TypeScript
* Redux Toolkit
* TanStack Query
* Google Maps Platform
* Tailwind CSS
* Firebase

## Architecture

The project follows a scalable and maintainable architecture with:

* Feature-based component organization.
* Service layer abstraction for API communication.
* Global state management using Redux Toolkit.
* Server and client component separation.
* Reusable custom hooks.
* Type-safe development with TypeScript.

## Project Structure

* `src/app` — Application routes and layouts
* `src/components` — Reusable UI and feature components
* `src/hooks` — Custom React hooks
* `src/services` — API and external service integrations
* `src/store` — Redux state management
* `src/providers` — Global application providers
* `src/lib` — Shared utilities and constants

