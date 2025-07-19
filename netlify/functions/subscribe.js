exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const { email } = JSON.parse(event.body);

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid email address' })
    };
  }

  const MAILCHIMP_CONFIG = {
    apiKey: 'dcc614d574530ffbf68fade943db223e-us1',
    audienceId: '32ca44bb77',
    server: 'us1'
  };

  const url = `https://${MAILCHIMP_CONFIG.server}.api.mailchimp.com/3.0/lists/${MAILCHIMP_CONFIG.audienceId}/members`;
  
  const data = {
    email_address: email,
    status: 'subscribed',
    tags: ['suma-wellness', 'website-subscriber'],
    merge_fields: {
      SOURCE: 'Website Form'
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `apikey ${MAILCHIMP_CONFIG.apiKey}`
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (response.ok) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify({
          success: true,
          mailchimpId: responseData.id,
          message: 'Successfully subscribed!'
        })
      };
    } else {
      // Handle Mailchimp errors
      let error = 'api_error';
      if (responseData.title === 'Member Exists') {
        error = 'already_subscribed';
      } else if (responseData.title === 'Invalid Resource') {
        error = 'invalid_email';
      }

      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify({
          success: false,
          error: error,
          message: responseData.detail || 'Subscription failed'
        })
      };
    }
  } catch (error) {
    console.error('Mailchimp API Error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({
        success: false,
        error: 'network_error',
        message: 'Internal server error'
      })
    };
  }
}; 