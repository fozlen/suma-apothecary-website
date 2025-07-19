// Suma Apothecary - Email Newsletter Integration
// Bu dosya email servisi entegrasyonu için kullanılacak

// Mailchimp Configuration
const MAILCHIMP_CONFIG = {
    // Bu bilgileri Mailchimp hesabınızdan alacaksınız
    audienceId: 'YOUR_AUDIENCE_ID', // Mailchimp audience ID
    serverPrefix: 'YOUR_SERVER', // örnek: us10
    apiKey: 'YOUR_API_KEY' // Mailchimp API key
};

// ConvertKit Configuration (Alternatif)
const CONVERTKIT_CONFIG = {
    apiKey: 'YOUR_CONVERTKIT_API_KEY',
    formId: 'YOUR_FORM_ID'
};

// Newsletter Subscription Functions
class NewsletterManager {
    constructor() {
        this.subscribers = [];
        this.emailService = 'mailchimp'; // 'mailchimp' veya 'convertkit'
    }

    // Subscribe user to newsletter
    async subscribe(email, firstName = '', lastName = '') {
        try {
            if (this.emailService === 'mailchimp') {
                return await this.subscribeToMailchimp(email, firstName, lastName);
            } else if (this.emailService === 'convertkit') {
                return await this.subscribeToConvertKit(email, firstName);
            }
        } catch (error) {
            console.error('Subscription error:', error);
            throw error;
        }
    }

    // Mailchimp subscription
    async subscribeToMailchimp(email, firstName, lastName) {
        const url = `https://${MAILCHIMP_CONFIG.serverPrefix}.api.mailchimp.com/3.0/lists/${MAILCHIMP_CONFIG.audienceId}/members`;
        
        const data = {
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            },
            tags: ['Website Signup', 'Suma Apothecary']
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MAILCHIMP_CONFIG.apiKey}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Mailchimp subscription failed');
        }

        return await response.json();
    }

    // ConvertKit subscription
    async subscribeToConvertKit(email, firstName) {
        const url = `https://api.convertkit.com/v3/forms/${CONVERTKIT_CONFIG.formId}/subscribe`;
        
        const data = {
            api_key: CONVERTKIT_CONFIG.apiKey,
            email: email,
            first_name: firstName,
            tags: ['Website Signup', 'Suma Apothecary']
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('ConvertKit subscription failed');
        }

        return await response.json();
    }

    // Send new blog post notification
    async sendBlogNotification(blogPost) {
        try {
            if (this.emailService === 'mailchimp') {
                return await this.sendMailchimpCampaign(blogPost);
            }
            // ConvertKit otomatik email sequences kullanır
        } catch (error) {
            console.error('Email notification error:', error);
            throw error;
        }
    }

    // Send Mailchimp campaign for new blog post
    async sendMailchimpCampaign(blogPost) {
        // Campaign oluşturma
        const campaignUrl = `https://${MAILCHIMP_CONFIG.serverPrefix}.api.mailchimp.com/3.0/campaigns`;
        
        const campaignData = {
            type: 'regular',
            recipients: {
                list_id: MAILCHIMP_CONFIG.audienceId
            },
            settings: {
                subject_line: `🌿 Yeni Blog Yazısı: ${blogPost.title}`,
                preview_text: blogPost.excerpt,
                title: `Blog: ${blogPost.title}`,
                from_name: 'Suma Apothecary',
                reply_to: 'contact@sumaapothecary.com'
            }
        };

        const campaignResponse = await fetch(campaignUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MAILCHIMP_CONFIG.apiKey}`
            },
            body: JSON.stringify(campaignData)
        });

        const campaign = await campaignResponse.json();
        
        // Email content ekleme
        const contentUrl = `https://${MAILCHIMP_CONFIG.serverPrefix}.api.mailchimp.com/3.0/campaigns/${campaign.id}/content`;
        
        const emailTemplate = this.createEmailTemplate(blogPost);
        
        await fetch(contentUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MAILCHIMP_CONFIG.apiKey}`
            },
            body: JSON.stringify({
                html: emailTemplate
            })
        });

        // Campaign'i gönder
        const sendUrl = `https://${MAILCHIMP_CONFIG.serverPrefix}.api.mailchimp.com/3.0/campaigns/${campaign.id}/actions/send`;
        
        await fetch(sendUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${MAILCHIMP_CONFIG.apiKey}`
            }
        });

        return campaign;
    }

    // Create email template for blog notification
    createEmailTemplate(blogPost) {
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
                    <h1 style="margin: 0; font-size: 24px;">🌿 Suma Apothecary</h1>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">Yeni Blog Yazısı</p>
                </div>
                
                <!-- Content -->
                <div style="padding: 30px;">
                    <h2 style="color: #92400e; margin: 0 0 15px 0; font-size: 22px;">${blogPost.title}</h2>
                    <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">${blogPost.excerpt}</p>
                    
                    <!-- CTA Button -->
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="https://sumaapothecary.com/#blog" style="background: linear-gradient(135deg, #d97706, #ea580c); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; display: inline-block;">
                            📖 Yazıyı Oku
                        </a>
                    </div>
                    
                    <!-- Footer -->
                    <div style="border-top: 2px solid #fed7aa; padding-top: 20px; margin-top: 30px; text-align: center; color: #666; font-size: 14px;">
                        <p>Handcrafted wellness products from our Turkish atelier to your sacred space.</p>
                        <p>
                            <a href="https://sumaapothecary.com" style="color: #d97706;">Website</a> | 
                            <a href="https://www.etsy.com/shop/SumaApothecary" style="color: #d97706;">Etsy Shop</a>
                        </p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        `;
    }
}

// Initialize newsletter manager
const newsletter = new NewsletterManager();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NewsletterManager;
} 