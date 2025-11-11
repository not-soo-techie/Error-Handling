# 🧩 Node.js Lab – Error Handling in Express

## 📘 Overview
In this lab, you will build a simple **Product Management API** using **Node.js and Express** that demonstrates proper **error handling practices** in backend development.

The objective is to help you understand how to:
- Handle different types of runtime and operational errors in Express.
- Structure error-handling middleware.
- Validate and manage request data properly.
- Work with asynchronous file operations using the Node.js `fs/promises` module.

---

## 🎯 Learning Objectives
By the end of this lab, you will be able to:
1. Create and use Express routes and controllers.
2. Handle errors using **custom middleware** and the built-in Express error flow.
3. Manage async errors from file operations (read/write).
4. Validate request data and return appropriate HTTP status codes.
5. Write clean and modular Node.js code.

---

## 🧠 Problem Statement

You are building a **Product Management REST API** that allows users to:
- View all products  
- View a specific product by ID  
- Add a new product  

The product data will be stored locally in a `products.json` file inside the `data` folder.

Your main focus is to **implement proper error handling** across the application.

---

## 🏗️ Project Structure

Your project should have the following folder layout:

