/*
 * INSECURE PRACTICE DEMONSTRATION - DO NOT USE IN PRODUCTION
 *
 * This file contains deliberately insecure API endpoint implementations 
 * for educational purposes. It demonstrates what NOT to do with sensitive credentials.
 */

import { Request, Response, NextFunction } from 'express'
import { insecureCredentials, initializeAWS, initializeGoogleAPI, initializeAzureServices } from '../lib/insecureCredentials'

/**
 * API endpoint that returns AWS credentials (extremely bad practice)
 */
export function getAwsCredentials (_req: Request, res: Response) {
  res.status(200).json({
    message: 'WARNING: This endpoint exposes AWS credentials and is for demonstration purposes only',
    credentials: insecureCredentials.aws
  })
}

/**
 * API endpoint that returns Google credentials (extremely bad practice)
 */
export function getGoogleCredentials (_req: Request, res: Response) {
  res.status(200).json({
    message: 'WARNING: This endpoint exposes Google credentials and is for demonstration purposes only',
    credentials: insecureCredentials.google
  })
}

/**
 * API endpoint that returns Azure credentials (extremely bad practice)
 */
export function getAzureCredentials (_req: Request, res: Response) {
  res.status(200).json({
    message: 'WARNING: This endpoint exposes Azure credentials and is for demonstration purposes only',
    credentials: {
      standard: insecureCredentials.azure,
      servicePrincipal: insecureCredentials.azureServicePrincipal
    }
  })
}

/**
 * API endpoint that returns AWS test and production credentials (extremely bad practice)
 */
export function getAwsEnvironmentCredentials (_req: Request, res: Response) {
  res.status(200).json({
    message: 'WARNING: This endpoint exposes multiple AWS environment credentials and is for demonstration purposes only',
    credentials: {
      test: insecureCredentials.awsTest,
      production: insecureCredentials.awsProduction
    }
  })
}

/**
 * Demo endpoint that shows AWS service initialization with hardcoded credentials
 */
export function demoAWSUsage (_req: Request, res: Response) {
  const awsService = initializeAWS()
  
  res.status(200).json({
    message: 'AWS client initialized with hardcoded credentials (DEMO)',
    clientInfo: {
      bucket: awsService.s3Client.bucket,
      // This is deliberately showing how credentials could be leaked in response data
      accessKeyIdFirstChars: awsService.s3Client.accessKeyId.substring(0, 10) + '...',
      secretAccessKeyPreview: awsService.s3Client.secretAccessKey.substring(0, 5) + '...'
    }
  })
}

/**
 * Demo endpoint that shows Google API initialization with hardcoded credentials
 */
export function demoGoogleAPIUsage (_req: Request, res: Response) {
  const googleService = initializeGoogleAPI()
  
  res.status(200).json({
    message: 'Google API initialized with hardcoded credentials (DEMO)',
    apiInfo: {
      // This is deliberately showing how credentials could be leaked in response data
      apiKeyPreview: googleService.apiKey.substring(0, 8) + '...',
      clientIdPreview: googleService.clientId.substring(0, 12) + '...'
    }
  })
}

/**
 * Demo endpoint that shows Azure service initialization with hardcoded credentials
 */
export function demoAzureUsage (_req: Request, res: Response) {
  const azureService = initializeAzureServices()
  
  res.status(200).json({
    message: 'Azure services initialized with hardcoded credentials (DEMO)',
    clientInfo: {
      // This is deliberately showing how credentials could be leaked in response data
      tenantId: azureService.credentials.tenantId,
      clientIdPreview: azureService.credentials.clientId.substring(0, 8) + '...',
      clientSecretPreview: azureService.credentials.clientSecret.substring(0, 5) + '...',
      connectionString: azureService.storageConnection.connectionString.substring(0, 45) + '...'
    }
  })
}

/**
 * API endpoint that returns all credentials (extremely bad practice)
 */
export function getAllCredentials (_req: Request, res: Response) {
  res.status(200).json({
    message: 'WARNING: This endpoint exposes ALL credentials and is for demonstration purposes only',
    credentials: insecureCredentials
  })
}