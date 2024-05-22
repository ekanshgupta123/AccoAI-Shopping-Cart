# Shopping Cart Context with Firebase Database

This repository contains a React context designed to manage a shopping cart system in a web application, enhanced with Firebase Database for dynamic data storage and retrieval. It includes functionality for adding items to the cart, adjusting item quantities, maintaining state persistence across browser sessions, and synchronizing state with Firebase.

## Features

- **Firebase Database Integration**: Utilizes Firebase for real-time data storage and retrieval, ensuring that cart data is consistent across devices and sessions.
- **Persistent Cart State**: Local cart data is stored in `localStorage` and synchronized with Firebase to maintain persistence across browser sessions.
- **Dynamic Cart Operations**: Supports adding items, modifying item quantities, and clearing the cart with immediate updates to the backend.
- **Context API Utilization**: Leverages React's Context API and `useReducer` to manage and provide cart state throughout the application.

## Components

### `CartContext`
A React context that holds the cart state and dispatch method, allowing it to be accessed and manipulated anywhere in the application.

### `cartReducer`
A reducer function that handles actions like adding items to the cart, incrementing or decrementing item quantities, and clearing the cart, while synchronizing changes with Firebase.

### `CartProvider`
A provider component that encapsulates the cart state logic, using `useReducer` for state management and `useEffect` to update both `localStorage` and Firebase when the cart state changes.

### `useCart`
A custom hook that provides easy access to the cart context, enabling components to interact with the cart state seamlessly.

## Firebase Setup

To integrate Firebase into your project, follow these steps:

1. **Create a Firebase Project**: Go to the Firebase console, create a new project, and configure it.
2. **Add Firebase to Your Web App**: Follow the instructions in the Firebase console to add Firebase to your web application.
3. **Initialize Firebase in Your App**: Use the configuration provided by Firebase to initialize it in your app.

## Actions

- `ADD_TO_CART`: Add new items or increase the quantity of existing items, automatically updating Firebase and the total cost.
- `INC`: Increment the quantity of an item in the cart and update Firebase.
- `DEC`: Decrement the quantity of an item in the cart. Items with a quantity of zero are removed from Firebase.
- `CLEAR_CART`: Remove all items from both the local cart and Firebase.

## Installation

To use this cart context with Firebase in your project, clone this repository and integrate it into your React application.
