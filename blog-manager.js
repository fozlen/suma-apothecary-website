// Blog Management and Email Notification Helper
// Suma Apothecary Blog Sistemi

class BlogManager {
    constructor() {
        this.blogData = null;
        this.loadBlogData();
    }

    // Load existing blog data
    async loadBlogData() {
        try {
            const response = await fetch('./blog-data.json');
            this.blogData = await response.json();
        } catch (error) {
            console.error('Blog data loading error:', error);
            this.blogData = { posts: [] };
        }
    }

    // Add new blog post
    async addNewBlogPost(blogPost) {
        try {
            // Validate blog post data
            if (!this.validateBlogPost(blogPost)) {
                throw new Error('Invalid blog post data');
            }

            // Add ID and timestamp
            blogPost.id = this.generateBlogId(blogPost.title);
            blogPost.date = new Date().toISOString().split('T')[0];
            blogPost.author = 'Suma Apothecary';

            // Add to blog data
            this.blogData.posts.unshift(blogPost); // Add to beginning

            // Update blog-data.json (in real implementation)
            console.log('📝 New blog post added:', blogPost.title);
            
            // Send newsletter notification
            const emailResult = await this.sendBlogNotification(blogPost);
            
            if (emailResult.success) {
                console.log('📧 Newsletter sent successfully!');
                return {
                    success: true,
                    message: 'Blog post added and newsletter sent!',
                    blogPost: blogPost,
                    emailDetails: emailResult
                };
            } else {
                console.warn('⚠️ Blog post added but newsletter failed:', emailResult.error);
                return {
                    success: true,
                    message: 'Blog post added but newsletter failed to send',
                    blogPost: blogPost,
                    emailError: emailResult.error
                };
            }

        } catch (error) {
            console.error('Blog post creation error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Send blog notification email
    async sendBlogNotification(blogPost) {
        try {
            console.log('📧 Sending newsletter for:', blogPost.title);

            const response = await fetch('/.netlify/functions/send-blog-notification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ blogPost: blogPost })
            });

            const result = await response.json();
            
            if (response.ok && result.success) {
                return {
                    success: true,
                    message: result.message,
                    campaignId: result.campaignId,
                    details: result.details
                };
            } else {
                return {
                    success: false,
                    error: result.error || 'Email sending failed',
                    message: result.message || 'Unknown error'
                };
            }

        } catch (error) {
            console.error('Email notification error:', error);
            return {
                success: false,
                error: 'network_error',
                message: error.message
            };
        }
    }

    // Validate blog post data
    validateBlogPost(blogPost) {
        const required = ['title', 'excerpt', 'content', 'category'];
        
        for (let field of required) {
            if (!blogPost[field] || blogPost[field].trim() === '') {
                console.error(`Missing required field: ${field}`);
                return false;
            }
        }

        if (blogPost.title.length < 10) {
            console.error('Title too short (minimum 10 characters)');
            return false;
        }

        if (blogPost.excerpt.length < 50) {
            console.error('Excerpt too short (minimum 50 characters)');
            return false;
        }

        return true;
    }

    // Generate blog ID from title
    generateBlogId(title) {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single
            .trim('-'); // Remove leading/trailing hyphens
    }

    // Get all blog posts
    getAllPosts() {
        return this.blogData ? this.blogData.posts : [];
    }

    // Get blog post by ID
    getPostById(id) {
        return this.blogData ? this.blogData.posts.find(post => post.id === id) : null;
    }

    // Update blog data in JSON file (simulation)
    async updateBlogDataFile() {
        // In a real implementation, this would update the blog-data.json file
        // For now, we'll just log the updated data
        console.log('📝 Updated blog data:', JSON.stringify(this.blogData, null, 2));
        
        // You can implement file writing here if needed
        // or use a content management system
    }
}

// Blog Post Creator Interface
class BlogPostCreator {
    constructor(blogManager) {
        this.blogManager = blogManager;
        this.setupUI();
    }

    setupUI() {
        // Check if we're in admin environment
        if (window.location.pathname.includes('admin') || window.location.hash.includes('admin')) {
            this.createAdminInterface();
        }
    }

    createAdminInterface() {
        // Create admin interface for adding blog posts
        const adminHTML = `
            <div id="blog-admin" style="background: white; padding: 30px; border-radius: 15px; margin: 20px 0; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #92400e; margin-bottom: 20px;">📝 Yeni Blog Yazısı Ekle</h2>
                
                <form id="blog-form" style="display: grid; gap: 20px;">
                    <div>
                        <label style="font-weight: 600; color: #666; display: block; margin-bottom: 5px;">Başlık:</label>
                        <input type="text" id="blog-title" required style="width: 100%; padding: 12px; border: 2px solid #fed7aa; border-radius: 8px; font-size: 16px;">
                    </div>
                    
                    <div>
                        <label style="font-weight: 600; color: #666; display: block; margin-bottom: 5px;">Kategori:</label>
                        <select id="blog-category" required style="width: 100%; padding: 12px; border: 2px solid #fed7aa; border-radius: 8px; font-size: 16px;">
                            <option value="">Kategori Seçin</option>
                            <option value="Chakra Guide">Chakra Guide</option>
                            <option value="Aromatherapy">Aromatherapy</option>
                            <option value="Wellness">Wellness</option>
                            <option value="Product Care">Product Care</option>
                            <option value="Meditation">Meditation</option>
                        </select>
                    </div>
                    
                    <div>
                        <label style="font-weight: 600; color: #666; display: block; margin-bottom: 5px;">Özet (Newsletter'da görünecek):</label>
                        <textarea id="blog-excerpt" required rows="3" style="width: 100%; padding: 12px; border: 2px solid #fed7aa; border-radius: 8px; font-size: 16px; resize: vertical;"></textarea>
                    </div>
                    
                    <div>
                        <label style="font-weight: 600; color: #666; display: block; margin-bottom: 5px;">İçerik (HTML formatında):</label>
                        <textarea id="blog-content" required rows="10" style="width: 100%; padding: 12px; border: 2px solid #fed7aa; border-radius: 8px; font-size: 14px; resize: vertical; font-family: monospace;"></textarea>
                    </div>
                    
                    <button type="submit" style="background: linear-gradient(135deg, #d97706, #ea580c); color: white; padding: 15px 30px; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">
                        📧 Blog Yazısını Ekle ve Newsletter Gönder
                    </button>
                </form>
                
                <div id="blog-result" style="margin-top: 20px; padding: 15px; border-radius: 8px; display: none;"></div>
            </div>
        `;

        // Insert admin interface
        const container = document.querySelector('.container') || document.body;
        container.insertAdjacentHTML('afterbegin', adminHTML);

        // Setup form handler
        document.getElementById('blog-form').addEventListener('submit', (e) => this.handleBlogSubmission(e));
    }

    async handleBlogSubmission(event) {
        event.preventDefault();
        
        const resultDiv = document.getElementById('blog-result');
        const submitBtn = event.target.querySelector('button[type="submit"]');
        
        // Show loading
        submitBtn.innerHTML = '⏳ İşleniyor...';
        submitBtn.disabled = true;
        resultDiv.style.display = 'none';

        try {
            // Get form data
            const blogPost = {
                title: document.getElementById('blog-title').value.trim(),
                category: document.getElementById('blog-category').value.trim(),
                excerpt: document.getElementById('blog-excerpt').value.trim(),
                content: document.getElementById('blog-content').value.trim(),
                image: document.getElementById('blog-category').value.trim() // Use category as image placeholder
            };

            // Add blog post and send newsletter
            const result = await this.blogManager.addNewBlogPost(blogPost);
            
            if (result.success) {
                resultDiv.innerHTML = `
                    <div style="background: #10b981; color: white; padding: 15px; border-radius: 8px;">
                        <h3 style="margin: 0 0 10px 0;">✅ Başarılı!</h3>
                        <p style="margin: 0;">${result.message}</p>
                        ${result.emailDetails ? `<p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 14px;">Campaign ID: ${result.emailDetails.campaignId}</p>` : ''}
                    </div>
                `;
                
                // Reset form
                event.target.reset();
                
            } else {
                resultDiv.innerHTML = `
                    <div style="background: #ef4444; color: white; padding: 15px; border-radius: 8px;">
                        <h3 style="margin: 0 0 10px 0;">❌ Hata</h3>
                        <p style="margin: 0;">${result.error}</p>
                    </div>
                `;
            }
            
            resultDiv.style.display = 'block';
            
        } catch (error) {
            console.error('Blog submission error:', error);
            resultDiv.innerHTML = `
                <div style="background: #ef4444; color: white; padding: 15px; border-radius: 8px;">
                    <h3 style="margin: 0 0 10px 0;">❌ Beklenmeyen Hata</h3>
                    <p style="margin: 0;">${error.message}</p>
                </div>
            `;
            resultDiv.style.display = 'block';
        } finally {
            // Reset button
            submitBtn.innerHTML = '📧 Blog Yazısını Ekle ve Newsletter Gönder';
            submitBtn.disabled = false;
        }
    }
}

// Initialize blog management system
let blogManager, blogCreator;

document.addEventListener('DOMContentLoaded', function() {
    blogManager = new BlogManager();
    blogCreator = new BlogPostCreator(blogManager);
    
    // Make available globally for manual testing
    window.blogManager = blogManager;
    window.blogCreator = blogCreator;
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BlogManager, BlogPostCreator };
} 