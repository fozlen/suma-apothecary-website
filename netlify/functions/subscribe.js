exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { email } = JSON.parse(event.body);

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false,
          error: 'invalid_email',
          message: 'Please enter a valid email address' 
        })
      };
    }

    // Get Mailchimp configuration from environment variables
    const MAILCHIMP_CONFIG = {
      apiKey: process.env.MAILCHIMP_API_KEY,
      audienceId: process.env.MAILCHIMP_AUDIENCE_ID,
      server: process.env.MAILCHIMP_SERVER_PREFIX
    };

    // Check if all required environment variables are set
    if (!MAILCHIMP_CONFIG.apiKey || !MAILCHIMP_CONFIG.audienceId || !MAILCHIMP_CONFIG.server) {
      console.error('Missing Mailchimp configuration');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'configuration_error',
          message: 'Newsletter service is temporarily unavailable'
        })
      };
    }

    const url = `https://${MAILCHIMP_CONFIG.server}.api.mailchimp.com/3.0/lists/${MAILCHIMP_CONFIG.audienceId}/members`;
    
    const subscriberData = {
      email_address: email,
      status: 'subscribed',
      tags: ['suma-wellness', 'website-subscriber', 'newsletter-2025'],
      merge_fields: {
        SOURCE: 'Website Form',
        SIGNUP_DATE: new Date().toISOString().split('T')[0]
      },
      location: {
        latitude: 0,
        longitude: 0
      }
    };

    console.log('Subscribing email to Mailchimp:', email);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `apikey ${MAILCHIMP_CONFIG.apiKey}`
      },
      body: JSON.stringify(subscriberData)
    });

    const responseData = await response.json();
    console.log('Mailchimp response:', response.status, responseData);

    if (response.ok) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          mailchimpId: responseData.id,
          message: 'Successfully subscribed to our newsletter! Welcome to the Suma wellness community. 🌿'
        })
      };
    } else {
      // Handle specific Mailchimp errors
      let error = 'api_error';
      let message = 'Subscription failed. Please try again.';

      if (responseData.title === 'Member Exists') {
        error = 'already_subscribed';
        message = 'This email is already subscribed to our newsletter. Thank you for your interest! 💚';
      } else if (responseData.title === 'Invalid Resource') {
        error = 'invalid_email';
        message = 'Please enter a valid email address.';
      } else if (responseData.title === 'Forgotten Email Not Subscribed') {
        error = 'not_subscribed';
        message = 'This email was not found in our subscriber list.';
      }

      console.error('Mailchimp error:', responseData);

      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: error,
          message: message,
          details: responseData.detail || 'Unknown error'
        })
      };
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'network_error',
        message: 'Something went wrong. Please try again later.'
      })
    };
  }
}; 