# The Juggling Company Dashboard

A web application for tracking juggling practice, progress, and learning.

## Project Structure

- `/webapp` - React frontend application
- `/terraform` - Infrastructure as Code using Terraform

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- AWS CLI configured with appropriate credentials
- Terraform (v1.2.0+)

### Deploying the Infrastructure

1. Navigate to the terraform directory:
   ```
   cd terraform
   ```

2. Initialize Terraform:
   ```
   terraform init
   ```

3. Apply the Terraform configuration:
   ```
   terraform apply
   ```

4. Update the webapp environment variables:
   ```
   chmod +x update_env.sh
   ./update_env.sh
   ```

### Running the Web Application Locally

1. Navigate to the webapp directory:
   ```
   cd webapp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The web application is automatically deployed to AWS Amplify when changes are pushed to the main branch.

## Infrastructure Components

- **AWS Amplify**: Hosts the React web application
- **Amazon Cognito**: Handles user authentication
- **Amazon DynamoDB**: Stores user data, modules, and practice sessions
- **Amazon S3**: Stores media files (videos, images)
- **AWS Lambda**: Provides backend API functionality
- **Amazon API Gateway**: Exposes Lambda functions as RESTful APIs

## Replacing Dummy Data with Real Data

1. Create initial data in DynamoDB tables using the AWS Console or CLI
2. Update the React components to fetch data from the API instead of using hardcoded values
3. Implement proper authentication and authorization

## License

This project is licensed under the MIT License - see the LICENSE file for details.
