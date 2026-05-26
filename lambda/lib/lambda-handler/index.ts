import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import axios from 'axios';
import { trace, Span } from '@opentelemetry/api';
const tracer = trace.getTracer('my-service-tracer');

const handler = async (event : APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  
  const activeSpan = trace.getActiveSpan();
  activeSpan.setAttribute('lambda.payload', JSON.stringify(event, null, 2));

  // Start a manual span
  return await tracer.startActiveSpan('my-custom-operation', async (span: Span) => {
    try {
      // Business logic here
    span.setAttribute('custom.payload', JSON.stringify(event, null, 2));
      

        //console.log(`Context: ${JSON.stringify(context, null, 2)}`);
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const response = await axios.post(url,{'ts':new Date()});
        
    console.log('Response from API:', response.data);

    const url2 = 'https://jsonplaceholder.typicode.com/postsInvalid/1';
    
    try{
        const response2 = await axios.get(url2);
        console.log('Response from API:', response2.data);
    }catch(err){
        console.log('Error',err);
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'hello world',
        }),
    };

    } catch (error) {
      span.recordException(error as Error);
      throw error;
    } finally {
      span.end(); // Manually end the span
    }
  });
};

module.exports = { handler }