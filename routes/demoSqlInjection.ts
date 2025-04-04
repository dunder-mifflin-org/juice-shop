/*
 * INSECURE PRACTICE DEMONSTRATION - DO NOT USE IN PRODUCTION
 *
 * This file contains deliberately INSECURE implementation of SQL queries
 * to demonstrate SQL injection vulnerabilities.
 * 
 * WARNING: These functions are vulnerable to SQL injection attacks!
 */

import { type Request, type Response, type NextFunction } from 'express'
import { UserModel } from '../models/user'
import { ProductModel } from '../models/product'
import models = require('../models/index')
import logger from '../lib/logger'

/**
 * VULNERABLE: Demonstrates SQL injection through string concatenation in a query
 * A simple login implementation that is vulnerable to SQL injection
 */
export function vulnerableLogin() {
  return (req: Request, res: Response) => {
    const email = req.body.email
    const password = req.body.password
    
    // VULNERABLE CODE: Direct string concatenation in SQL query
    const query = `SELECT * FROM Users WHERE email = '${email}' AND password = '${password}'`
    
    // Log the query for demonstration purposes
    logger.info(`[DEMO] Executing vulnerable query: ${query}`)
    
    // Execute the vulnerable query
    models.sequelize.query(query, { model: UserModel, plain: true })
      .then((user: any) => {
        if (user) {
          res.status(200).json({
            status: 'success',
            data: {
              id: user.id,
              email: user.email,
              message: 'VULNERABLE DEMO: Successfully logged in through SQL injection vulnerable endpoint!'
            }
          })
        } else {
          res.status(401).json({ 
            status: 'error', 
            message: 'Invalid email or password' 
          })
        }
      })
      .catch((error: Error) => {
        logger.error(`[DEMO] SQL Injection Demo Error: ${error.message}`)
        res.status(500).json({ 
          status: 'error', 
          message: 'Database error',
          technical: error.message // Intentionally revealing error details for demo purposes
        })
      })
  }
}

/**
 * VULNERABLE: Demonstrates SQL injection in a search feature
 * This endpoint allows searching products by name but is vulnerable to SQL injection
 */
export function vulnerableSearch() {
  return (req: Request, res: Response) => {
    const searchTerm = req.query.q ? req.query.q.toString() : ''
    
    // VULNERABLE CODE: Direct string concatenation in SQL query
    const query = `SELECT * FROM Products WHERE name LIKE '%${searchTerm}%' OR description LIKE '%${searchTerm}%'`
    
    // Log the query for demonstration purposes
    logger.info(`[DEMO] Executing vulnerable search query: ${query}`)
    
    models.sequelize.query(query, { model: ProductModel })
      .then((products: any) => {
        res.status(200).json({
          status: 'success',
          data: products,
          query: query // Intentionally exposing the query for demo purposes
        })
      })
      .catch((error: Error) => {
        logger.error(`[DEMO] SQL Injection Demo Error: ${error.message}`)
        res.status(500).json({ 
          status: 'error', 
          message: 'Search error',
          technical: error.message // Intentionally revealing error details for demo purposes
        })
      })
  }
}

/**
 * VULNERABLE: Demonstrates SQL injection in a user information lookup
 * This endpoint retrieves user information by ID but is vulnerable to SQL injection
 */
export function vulnerableUserDetails() {
  return (req: Request, res: Response) => {
    const userId = req.params.id
    
    // VULNERABLE CODE: Direct string concatenation in SQL query with no validation
    const query = `SELECT id, email, username, role FROM Users WHERE id = ${userId}`
    
    // Log the query for demonstration purposes
    logger.info(`[DEMO] Executing vulnerable user details query: ${query}`)
    
    models.sequelize.query(query)
      .then(([results]: any) => {
        if (results && results.length > 0) {
          res.status(200).json({
            status: 'success',
            data: results[0],
            query: query // Intentionally exposing the query for educational purposes
          })
        } else {
          res.status(404).json({
            status: 'error',
            message: 'User not found'
          })
        }
      })
      .catch((error: Error) => {
        logger.error(`[DEMO] SQL Injection Demo Error: ${error.message}`)
        res.status(500).json({ 
          status: 'error', 
          message: 'Database error',
          technical: error.message // Intentionally revealing error details for demo purposes
        })
      })
  }
}

/**
 * VULNERABLE: Demonstrates SQL injection in a product update operation
 * This endpoint updates product information but is vulnerable to SQL injection
 */
export function vulnerableProductUpdate() {
  return (req: Request, res: Response) => {
    const productId = req.params.id
    const { price } = req.body
    
    if (!price) {
      return res.status(400).json({ status: 'error', message: 'Price is required' })
    }
    
    // VULNERABLE CODE: Direct string concatenation in SQL query
    const query = `UPDATE Products SET price = ${price} WHERE id = ${productId}`
    
    // Log the query for demonstration purposes
    logger.info(`[DEMO] Executing vulnerable product update query: ${query}`)
    
    models.sequelize.query(query)
      .then(() => {
        res.status(200).json({
          status: 'success',
          message: 'Product price updated',
          query: query // Intentionally exposing the query for educational purposes
        })
      })
      .catch((error: Error) => {
        logger.error(`[DEMO] SQL Injection Demo Error: ${error.message}`)
        res.status(500).json({ 
          status: 'error', 
          message: 'Update failed',
          technical: error.message // Intentionally revealing error details for demo purposes
        })
      })
  }
}

/**
 * This function provides examples for secure alternatives to the vulnerable code above
 * It's included for educational comparison
 */
export function secureQueryExamples() {
  return (_req: Request, res: Response) => {
    const exampleEmail = 'user@example.com'
    const examplePassword = 'password123'
    const exampleSearchTerm = 'apple'
    const exampleUserId = 1
    const examplePrice = 99.99
    const exampleProductId = 1
    
    const examples = {
      login: {
        vulnerable: `SELECT * FROM Users WHERE email = '${exampleEmail}' AND password = '${examplePassword}'`,
        secure: "SELECT * FROM Users WHERE email = ? AND password = ?",
        parameters: [exampleEmail, examplePassword],
        explanation: "Use parameterized queries with placeholders (?) instead of string concatenation"
      },
      search: {
        vulnerable: `SELECT * FROM Products WHERE name LIKE '%${exampleSearchTerm}%'`,
        secure: "SELECT * FROM Products WHERE name LIKE ?",
        parameters: [`%${exampleSearchTerm}%`],
        explanation: "Use parameterized queries for search terms as well"
      },
      userDetails: {
        vulnerable: `SELECT id, email, username FROM Users WHERE id = ${exampleUserId}`,
        secure: "SELECT id, email, username FROM Users WHERE id = ?",
        parameters: [exampleUserId],
        explanation: "Always use parameters for ID lookups"
      },
      productUpdate: {
        vulnerable: `UPDATE Products SET price = ${examplePrice} WHERE id = ${exampleProductId}`,
        secure: "UPDATE Products SET price = ? WHERE id = ?",
        parameters: [examplePrice, exampleProductId],
        explanation: "Use parameters for all variables in UPDATE statements"
      },
      bestPractices: [
        "Always use parameterized queries or prepared statements",
        "Validate and sanitize all user input",
        "Use an ORM (Object-Relational Mapping) like Sequelize with its built-in protections",
        "Apply the principle of least privilege to database users",
        "Implement input validation on both client and server sides"
      ]
    }
    
    res.status(200).json({
      status: 'success',
      data: examples,
      message: 'These examples show vulnerable SQL queries and their secure alternatives'
    })
  }
}