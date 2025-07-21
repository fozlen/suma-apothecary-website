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
    const { blogPost } = JSON.parse(event.body);

    // Validate blog post data
    if (!blogPost || !blogPost.title || !blogPost.excerpt) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false,
          error: 'invalid_data',
          message: 'Blog post data is missing or incomplete' 
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
          message: 'Email service is temporarily unavailable'
        })
      };
    }

    console.log('Creating blog notification campaign for:', blogPost.title);

    // Create email campaign
    const campaignResult = await createMailchimpCampaign(MAILCHIMP_CONFIG, blogPost);
    
    if (campaignResult.success) {
      // Send the campaign
      const sendResult = await sendMailchimpCampaign(MAILCHIMP_CONFIG, campaignResult.campaignId);
      
      if (sendResult.success) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Blog notification sent successfully! 📧',
            campaignId: campaignResult.campaignId,
            details: sendResult.details
          })
        };
      } else {
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'send_failed',
            message: 'Campaign created but failed to send',
            details: sendResult.error
          })
        };
      }
    } else {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'campaign_creation_failed',
          message: 'Failed to create email campaign',
          details: campaignResult.error
        })
      };
    }

  } catch (error) {
    console.error('Blog notification error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'network_error',
        message: 'Something went wrong. Please try again later.',
        details: error.message
      })
    };
  }
};

// Create Mailchimp campaign
async function createMailchimpCampaign(config, blogPost) {
  try {
    const campaignUrl = `https://${config.server}.api.mailchimp.com/3.0/campaigns`;
    
    const campaignData = {
      type: 'regular',
      recipients: {
        list_id: config.audienceId,
        segment_opts: {
          conditions: [
            {
              condition_type: 'TextMerge',
              field: 'SOURCE',
              op: 'contains',
              value: 'Website'
            }
          ],
          match: 'any'
        }
      },
      settings: {
        subject_line: `🌿 Yeni Blog Yazısı: ${blogPost.title}`,
        preview_text: blogPost.excerpt,
        title: `Blog Notification: ${blogPost.title}`,
        from_name: 'Suma Apothecary',
        reply_to: process.env.CONTACT_EMAIL || 'contact@sumaapothecary.com',
        to_name: '*|FNAME|*',
        auto_footer: false,
        inline_css: true
      }
    };

    const response = await fetch(campaignUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `apikey ${config.apiKey}`
      },
      body: JSON.stringify(campaignData)
    });

    const responseData = await response.json();
    console.log('Campaign creation response:', response.status, responseData);

    if (response.ok) {
      // Set campaign content
      const contentResult = await setCampaignContent(config, responseData.id, blogPost);
      
      if (contentResult.success) {
        return {
          success: true,
          campaignId: responseData.id,
          details: responseData
        };
      } else {
        return {
          success: false,
          error: contentResult.error
        };
      }
    } else {
      return {
        success: false,
        error: responseData.detail || 'Campaign creation failed'
      };
    }
  } catch (error) {
    console.error('Campaign creation error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Set campaign content
async function setCampaignContent(config, campaignId, blogPost) {
  try {
    const contentUrl = `https://${config.server}.api.mailchimp.com/3.0/campaigns/${campaignId}/content`;
    
    const emailTemplate = createBlogEmailTemplate(blogPost);
    
    const response = await fetch(contentUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `apikey ${config.apiKey}`
      },
      body: JSON.stringify({
        html: emailTemplate
      })
    });

    const responseData = await response.json();
    console.log('Content setting response:', response.status, responseData);

    if (response.ok) {
      return { success: true, details: responseData };
    } else {
      return { success: false, error: responseData.detail || 'Content setting failed' };
    }
  } catch (error) {
    console.error('Content setting error:', error);
    return { success: false, error: error.message };
  }
}

// Send campaign
async function sendMailchimpCampaign(config, campaignId) {
  try {
    const sendUrl = `https://${config.server}.api.mailchimp.com/3.0/campaigns/${campaignId}/actions/send`;
    
    const response = await fetch(sendUrl, {
      method: 'POST',
      headers: {
        'Authorization': `apikey ${config.apiKey}`
      }
    });

    const responseData = await response.json();
    console.log('Campaign send response:', response.status, responseData);

    if (response.ok) {
      return { success: true, details: responseData };
    } else {
      return { success: false, error: responseData.detail || 'Campaign send failed' };
    }
  } catch (error) {
    console.error('Campaign send error:', error);
    return { success: false, error: error.message };
  }
}

// Create email template for blog notification
function createBlogEmailTemplate(blogPost) {
  const websiteUrl = process.env.WEBSITE_URL || 'https://sumaapothecary.com';
  
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${blogPost.title}</title>
  </head>
  <body style="font-family: Arial, sans-serif; background: linear-gradient(135deg, #fef7ed 0%, #fed7aa 100%); margin: 0; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #d97706, #ea580c); color: white; padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px;">🌿 Suma Apothecary</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Yeni Blog Yazısı</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
              <h2 style="color: #92400e; margin: 0 0 20px 0; font-size: 24px; line-height: 1.3;">${blogPost.title}</h2>
              
              <p style="color: #666; line-height: 1.7; margin-bottom: 25px; font-size: 16px;">${blogPost.excerpt}</p>
              
              <!-- Blog Category -->
              <div style="margin-bottom: 25px;">
                  <span style="background: #fbbf24; color: #92400e; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; display: inline-block;">
                      ${blogPost.category || 'Wellness'}
                  </span>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 40px 0;">
                  <a href="${websiteUrl}#blog" style="background: linear-gradient(135deg, #d97706, #ea580c); color: white; padding: 16px 32px; text-decoration: none; border-radius: 25px; font-weight: 600; display: inline-block; font-size: 16px; box-shadow: 0 4px 15px rgba(217, 119, 6, 0.3); transition: all 0.3s ease;">
                      📖 Yazıyı Oku
                  </a>
              </div>
              
              <!-- Divider -->
              <div style="border-top: 2px solid #fed7aa; margin: 40px 0 30px 0;"></div>
              
              <!-- Additional Content -->
              <div style="background: #fef7ed; padding: 20px; border-radius: 10px; margin: 20px 0;">
                  <h3 style="color: #92400e; margin: 0 0 10px 0; font-size: 18px;">💚 Wellness Journey'niz</h3>
                  <p style="color: #b45309; margin: 0; line-height: 1.6; font-size: 14px;">
                      Bu blog yazısında paylaştığımız bilgiler, günlük wellness rutininizi desteklemek için hazırlandı. 
                      Soma Apothecary'den handcrafted ürünlerle bu bilgileri pratikte uygulayabilirsiniz.
                  </p>
              </div>
              
              <!-- Footer -->
              <div style="text-align: center; color: #666; font-size: 14px; margin-top: 30px;">
                  <p style="margin-bottom: 15px;">Handcrafted wellness products from our Turkish atelier to your sacred space.</p>
                  
                  <div style="margin: 20px 0;">
                      <a href="${websiteUrl}" style="color: #d97706; text-decoration: none; margin: 0 10px;">🌐 Website</a>
                      <a href="https://www.etsy.com/shop/SumaApothecary" style="color: #d97706; text-decoration: none; margin: 0 10px;">🛍️ Etsy Shop</a>
                      <a href="https://www.instagram.com/sumaapothecary" style="color: #d97706; text-decoration: none; margin: 0 10px;">📸 Instagram</a>
                  </div>
                  
                  <!-- Unsubscribe -->
                  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #fed7aa; font-size: 12px; color: #999;">
                      <p>Bu newsletter'dan çıkmak istiyorsanız <a href="*|UNSUB|*" style="color: #d97706;">buraya tıklayın</a></p>
                      <p>Email ayarlarınızı güncellemek için <a href="*|UPDATE_PROFILE|*" style="color: #d97706;">buraya tıklayın</a></p>
                  </div>
              </div>
          </div>
      </div>
  </body>
  </html>
  `;
} 