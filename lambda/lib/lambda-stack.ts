import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
// Import the Lambda module
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as  lambda_nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
//Import API Gateway L2 construct
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'LambdaQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    // Define the Lambda function resource
    // const myFunction = new lambda.Function(this, "HelloWorldFunction", {
    //   runtime: lambda.Runtime.NODEJS_22_X, // Provide any supported Node.js runtime
    //   handler: "index.handler",
    //   environment: {
    //     AWS_LAMBDA_EXEC_WRAPPER: "/opt/otel-instrument",
    //     OTEL_EXPORTER_OTLP_TRACES_ENDPOINT: "http://18.217.16.250:4318/v1/traces",
    //     OTEL_SERVICE_NAME : "lambda-otel-demo",
    //     OTEL_TRACES_EXPORTER: "otlp",
    //   },
    //   tracing: lambda.Tracing.ACTIVE,
    //   layers: [
    //     lambda.LayerVersion.fromLayerVersionArn(this, "OtelLayer", "arn:aws:lambda:us-east-2:615299751070:layer:AWSOpenTelemetryDistroJs:12")
    //   ],
    //   code: lambda.Code.fromAsset("lib/lambda-handler/"), // Path to your Lambda function code
    // });

     const myFunction = new lambda_nodejs.NodejsFunction(this, "HelloWorldFunction", {
      runtime: lambda.Runtime.NODEJS_22_X, // Provide any supported Node.js runtime
      handler: "handler",
      environment: {        
        AWS_LAMBDA_EXEC_WRAPPER: "/opt/otel-instrument",        
        OTEL_SERVICE_NAME : "lambda-otel-demo2",
        OPENTELEMETRY_COLLECTOR_CONFIG_URI: 's3://lambda-collector-config/collector.yaml',
        OTEL_LAMBDA_CAPTURE_REQUEST_AND_RESPONSE:'true'
      },
      tracing: lambda.Tracing.ACTIVE,
      layers: [
        lambda.LayerVersion.fromLayerVersionArn(this, "OtelLayer", "arn:aws:lambda:us-east-2:615299751070:layer:AWSOpenTelemetryDistroJs:12")
      ],
      entry : 'lib/lambda-handler/index.ts',
    });

    // Define the Lambda function URL resource
    const myFunctionUrl = myFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    // Define a CloudFormation output for your URL
    new cdk.CfnOutput(this, "myFunctionUrlOutput", {
      value: myFunctionUrl.url,
    })

    // Define the API Gateway resource
    const api = new apigateway.LambdaRestApi(this, 'HelloWorldApi', {
      handler: myFunction,
      proxy: false,      
    });

    // Define the '/hello' resource with a GET method
    const helloResource = api.root.addResource('hello');
    helloResource.addMethod('GET');
  }
}
