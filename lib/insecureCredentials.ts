/**
 * INSECURE PRACTICE DEMONSTRATION - DO NOT USE IN PRODUCTION
 * 
 * This file contains deliberately insecure practices for educational purposes.
 * It demonstrates what NOT to do with sensitive credentials.
 * 
 * WARNING: Never store API keys or secrets directly in your code like this!
 */

export const insecureCredentials = {
  // DO NOT COPY THIS APPROACH - Hardcoded API keys should never be in source code
  aws: {
    accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
    secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
    region: 'us-west-2'
  },
  
  // Additional AWS credentials for different environments - BAD PRACTICE!
  awsTest: {
    accessKeyId: 'AKIA4YFAKETESTABC123',
    secretAccessKey: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0',
    region: 'us-east-1'
  },
  
  awsProduction: {
    accessKeyId: 'AKIA5XPRODPROD567890',
    secretAccessKey: 'MDk3OGZkYmZiYmQ0ZDQ5OTkzM2YwYTJkZGRlZmNkMWI=', // Base64 encoded fake key
    region: 'eu-west-1',
    sessionToken: 'FwoGZXIvYXdzEMv//////////wEaDCm+7jkDU0FNUExFIiKAAV1brvjD9WGjHZdSQMJD1GPTUQIseND6FipJ3RIxEWrWW4J1SaRkSbHH6jH4MWGPqM1QhLNcO0FetJBR4fTJHwI9ILH50AQ80Wcux9iy4SAMPLE',
    bucketName: 'company-production-data'
  },
  
  google: {
    apiKey: 'AIzaSyDOCAbC123dEf456GhI789jKl012-MnO',
    clientId: '012345678901-abcdefghijklmnopqrstuvwxyz12345.apps.googleusercontent.com',
    clientSecret: 'GOCSPX-abcdefghijklmnopqrstuvwxyz12345'
  },
  
  // Azure credentials - NEVER put these in your code!
  azure: {
    tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47',
    clientId: '11111111-2222-3333-4444-555555555555',
    clientSecret: 'Lqw8Q~aAjLTNBcXdYGiXsZcLzXv3jAaeFgHijKlM',
    subscriptionId: 'a1a2a3a4-b1b2-c1c2-d1d2-e1e2f1f2g1g2',
    storageAccountKey: '8DYPTM4JrGBIc0CXvRf+7ufYxJZkGK+9v5ACESZEfGlsxMBIVh/8RxZFOcMxkQhdM5DQ2ora2JRJ8HC7Q2U8cg=='
  },
  
  // Azure Service Principal with certificate thumbprint - Insecure!
  azureServicePrincipal: {
    tenantId: '11111111-0000-0000-0000-111111111111',
    clientId: '22222222-0000-0000-0000-222222222222',
    certificateThumbprint: '0123456789ABCDEF0123456789ABCDEF01234567',
    subscriptionId: '33333333-0000-0000-0000-333333333333'
  },
  
  stripe: {
    secretKey: 'sk_test_51ABCDEFGhIjKlMnOpQrStUvWxYz0123456789abcdefghijklmnopqrstuvwxyz',
    publishableKey: 'pk_test_51ABCDEFGhIjKlMnOpQrStUvWxYz0123456789abcdefghijklmnopqrstuvwxyz'
  }
};

/**
 * INSECURE: This function demonstrates an insecure way of fetching credentials
 */
export function getCredentials(service: string) {
  return insecureCredentials[service as keyof typeof insecureCredentials];
}

/**
 * INSECURE: This function demonstrates an unsafe way to initialize AWS services
 */
export function initializeAWS() {
  console.log('Initializing AWS with hardcoded credentials (DEMO - DO NOT DO THIS)');
  console.log(`Access Key ID: ${insecureCredentials.aws.accessKeyId}`);
  console.log(`Secret Access Key: ${insecureCredentials.aws.secretAccessKey}`);
  
  return {
    s3Client: {
      // Simulating S3 client initialization with hardcoded credentials
      bucket: 'demo-bucket',
      accessKeyId: insecureCredentials.aws.accessKeyId,
      secretAccessKey: insecureCredentials.aws.secretAccessKey
    }
  };
}

/**
 * INSECURE: This function demonstrates an unsafe way to initialize Google services
 */
export function initializeGoogleAPI() {
  console.log('Initializing Google API with hardcoded API key (DEMO - DO NOT DO THIS)');
  console.log(`API Key: ${insecureCredentials.google.apiKey}`);
  
  return {
    apiKey: insecureCredentials.google.apiKey,
    clientId: insecureCredentials.google.clientId,
    clientSecret: insecureCredentials.google.clientSecret
  };
}

/**
 * INSECURE: Example of connecting to Azure services with hardcoded credentials
 */
export function initializeAzureServices() {
  console.log('Connecting to Azure with hardcoded credentials (DEMO - DO NOT DO THIS)');
  console.log(`Azure Tenant ID: ${insecureCredentials.azure.tenantId}`);
  
  return {
    credentials: {
      tenantId: insecureCredentials.azure.tenantId,
      clientId: insecureCredentials.azure.clientId,
      clientSecret: insecureCredentials.azure.clientSecret
    },
    storageConnection: {
      connectionString: `DefaultEndpointsProtocol=https;AccountName=demostorage;AccountKey=${insecureCredentials.azure.storageAccountKey};EndpointSuffix=core.windows.net`
    }
  };
}