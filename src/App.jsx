import React, { useState } from 'react';
import { Mail, Instagram, ExternalLink, Sparkles, Leaf } from 'lucide-react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [showBlog, setShowBlog] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load blog posts when blog page is shown
  const loadBlogPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/posts?published=true');
      if (response.ok) {
        const posts = await response.json();
        setBlogPosts(posts);
      } else {
        // Fallback to sample posts if API fails
        setBlogPosts([
          {
            id: 1,
            title: "Understanding the Seven Chakras: A Complete Guide",
            excerpt: "Discover the ancient wisdom of chakras and how they influence your physical, emotional, and spiritual well-being.",
            category: "Chakra Guide",
            read_time: 8,
            slug: "understanding-seven-chakras-complete-guide"
          },
          {
            id: 2,
            title: "Aromatherapy for Beginners: Essential Oils Guide",
            excerpt: "Start your aromatherapy journey with this comprehensive guide to essential oils and their healing properties.",
            category: "Aromatherapy",
            read_time: 6,
            slug: "aromatherapy-beginners-essential-oils-guide"
          },
          {
            id: 3,
            title: "How to Care for Your Ceramic Diffuser",
            excerpt: "Keep your handcrafted ceramic diffuser in perfect condition with these simple care and maintenance tips.",
            category: "Product Care",
            read_time: 4,
            slug: "how-to-care-ceramic-diffuser"
          }
        ]);
      }
    } catch (error) {
      console.error('Error loading blog posts:', error);
      // Use sample posts as fallback
      setBlogPosts([
        {
          id: 1,
          title: "Understanding the Seven Chakras: A Complete Guide",
          excerpt: "Discover the ancient wisdom of chakras and how they influence your physical, emotional, and spiritual well-being.",
          category: "Chakra Guide",
          read_time: 8,
          slug: "understanding-seven-chakras-complete-guide"
        },
        {
          id: 2,
          title: "Aromatherapy for Beginners: Essential Oils Guide",
          excerpt: "Start your aromatherapy journey with this comprehensive guide to essential oils and their healing properties.",
          category: "Aromatherapy",
          read_time: 6,
          slug: "aromatherapy-beginners-essential-oils-guide"
        },
        {
          id: 3,
          title: "How to Care for Your Ceramic Diffuser",
          excerpt: "Keep your handcrafted ceramic diffuser in perfect condition with these simple care and maintenance tips.",
          category: "Product Care",
          read_time: 4,
          slug: "how-to-care-ceramic-diffuser"
        }
      ]);
    }
    setLoading(false);
  };

  const showBlogPage = () => {
    setShowBlog(true);
    loadBlogPosts();
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('🎉 Başarıyla abone oldunuz! Wellness yolculuğumuza hoş geldiniz!');
        setEmail('');
      } else {
        if (data.message === 'Already subscribed') {
          alert('✅ Bu email adresi zaten abone listesinde!');
        } else {
          alert('❌ Bir hata oluştu: ' + data.error);
        }
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      alert('🎉 Teşekkürler! Newsletter aboneliğiniz alındı.');
      setEmail('');
    }
  };

  if (showBlog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
        {/* Blog Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <button 
              onClick={() => setShowBlog(false)}
              className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 transition-colors"
            >
              <span>← Back to Home</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="Suma Apothecary" className="w-8 h-8 rounded-full" />
              <h1 className="text-xl font-bold text-amber-900">Suma Apothecary</h1>
            </div>
            
            <a 
              href="https://www.etsy.com/shop/SumaApothecary" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Shop</span>
            </a>
          </div>
        </header>

        {/* Blog Content */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-amber-900 mb-6">
              Wellness <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Blog</span>
            </h1>
            <p className="text-xl text-amber-700 mb-12 max-w-2xl mx-auto">
              Discover ancient wisdom and modern wellness practices. From chakra guides to aromatherapy tips, 
              explore our collection of articles designed to support your healing journey.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                <div className="col-span-full text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
                  <p className="mt-2 text-amber-700">Blog yazıları yükleniyor...</p>
                </div>
              ) : (
                blogPosts.map((post, index) => (
                  <article key={post.id || index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="h-48 bg-gradient-to-br from-amber-200 to-orange-300 relative">
                      <div className="absolute top-4 left-4">
                        <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-amber-900 mb-3">
                        {post.title}
                      </h2>
                      
                      <p className="text-amber-700 mb-4">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-amber-600">
                        <span>{post.read_time} min read</span>
                        <span className="text-amber-600 hover:text-amber-700 font-medium cursor-pointer">
                          Read More →
                        </span>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="Suma Apothecary" className="w-10 h-10 rounded-full" />
            <h1 className="text-2xl font-bold text-amber-900">Suma Apothecary</h1>
          </div>
          <nav className="flex items-center space-x-6">
            <button 
              onClick={showBlogPage}
              className="text-amber-700 hover:text-amber-900 font-medium transition-colors"
            >
              Blog
            </button>
            <a 
              href="https://www.etsy.com/shop/SumaApothecary" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Visit Shop</span>
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-6">
            <span className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium border border-amber-300">
              Handcrafted in Turkish Atelier
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-amber-900 mb-6 leading-tight">
            Transform Your Space<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
              Into Sacred Sanctuary
            </span>
          </h1>
          
          <p className="text-xl text-amber-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover handcrafted chakra massage oils and artisan ceramic diffusers. 
            Each piece is created with love and intention in our Turkish atelier to enhance your wellness journey and create sacred spaces for healing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://www.etsy.com/shop/SumaApothecary" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-amber-600 text-white px-8 py-4 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center space-x-2 text-lg font-medium"
            >
              <ExternalLink className="w-5 h-5" />
              <span>Explore Our Collection</span>
            </a>
            <button 
              onClick={() => setCurrentView('blog')}
              className="w-full sm:w-auto bg-purple-100 text-purple-700 px-8 py-4 rounded-lg hover:bg-purple-200 transition-colors flex items-center justify-center space-x-2 text-lg font-medium"
            >
              <Edit3 className="w-5 h-5" />
              <span>Wellness Blog</span>
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900 mb-6">Our Story</h2>
            <p className="text-xl text-amber-700 leading-relaxed">
              At Suma Apothecary, we believe that wellness is a journey that encompasses both inner harmony 
              and beautiful surroundings. Each ceramic diffuser is handcrafted in our Turkish atelier, 
              where traditional techniques meet modern wellness needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Handcrafted</h3>
              <p className="text-amber-700">Each piece is carefully crafted by hand using traditional Turkish ceramic techniques</p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Leaf className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Natural</h3>
              <p className="text-amber-700">Made with natural clay and pure essential oils for authentic wellness experiences</p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <ExternalLink className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Intentional</h3>
              <p className="text-amber-700">Every product is infused with intention to support your chakra balancing journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">Join Our Wellness Journey</h2>
          <p className="text-amber-100 text-lg mb-8">
            Subscribe to receive chakra guides, wellness tips, and be the first to know about new products
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-white/90 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
            <button 
              type="submit" 
              className="bg-white text-amber-600 hover:bg-amber-50 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span>Subscribe</span>
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                <img src="/logo.png" alt="Suma Apothecary" className="w-6 h-6 rounded-full" />
                <h3 className="text-xl font-bold text-white">Suma Apothecary</h3>
              </div>
              <p className="text-amber-200">
                Handcrafted wellness products from our Turkish atelier to your sacred space.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-amber-200">
                <li>
                  <a 
                    href="https://www.etsy.com/shop/SumaApothecary" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-amber-300 transition-colors"
                  >
                    Our Etsy Shop
                  </a>
                </li>
                <li>
                  <button 
                    onClick={showBlogPage}
                    className="hover:text-amber-300 transition-colors"
                  >
                    Wellness Blog
                  </button>
                </li>
                <li>
                  <a href="mailto:hello@sumaapothecary.com" className="hover:text-amber-300 transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Follow Us</h4>
              <div className="flex justify-center md:justify-start space-x-4">
                <a 
                  href="https://www.instagram.com/sumaapothecary" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a 
                  href="https://www.pinterest.com/sumaapothecary" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                  aria-label="Follow us on Pinterest"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm0 19c-.721 0-1.418-.109-2.073-.312.286-.465.713-1.227.713-1.227s.357.357.357.357c.357.357.714.357 1.071.357.357 0 .714-.357.714-.357s.357-.357.357-.357c0-.357-.357-.714-.357-1.071 0-.357.357-.714.357-1.071s-.357-.714-.357-1.071c0-.357.357-.714.357-1.071s-.357-.714-.357-1.071c0-.357.357-.714.357-1.071s-.357-.714-.357-1.071c0-.357.357-.714.357-1.071s-.357-.714-.357-1.071c0-.357.357-.714.357-1.071s-.357-.714-.357-1.071c0-.357.357-.714.357-1.071s-.357-.714-.357-1.071c0-.357.357-.714.357-1.071s-.357-.714-.357-1.071c0-.357.357-.714.357-1.071s-.357-.714-.357-1.071c0-.357.357-.714.357-1.071s-.357-.714-.357-1.071c0-.357.357-.714.357-1.071s-.357-.714-.357-1.071c0-.357.357-.714.357-1.071s-.357-.714-.357-1.071c0-.357.357-.714.357-1.071s-.357-.714-.357-1.071c0-.357.357-.714.357-1.071s-.357-.714-.357-1.071c0-.357.357-.714.357-1.071s-.357-.714-.357-1.071c0-.357.357-.714.357-1.071s-.357-.714-.357-1.071c0-.357.357-.714.357-1.071s-.357-.714-.357-1.071c0-.357.357-.714.357-1.071s-.357-.714-.357-1.071c0-.357.357-.714.357-1.071s-.357-.714-.357-1.071c0-.357.357-.714.357-1.071s-.357-.714-.357-1.071c0-.357.357-.714.357-1.071s-.357-.714-.357-1.071c0-.357.357-.714.357-1.071s-.357-.714-.357-1.071c0-.357.357-.714.357-1.071s-.357-.714-.357-1.071c0-.357.357-.714.357-1.071s-.357-.714-.357-1.071c0-.357.357-.714.357-1.071s-.357-.714-.357-1.071zm-5.5-6.5c0-3.038 2.462-5.5 5.5-5.5s5.5 2.462 5.5 5.5-2.462 5.5-5.5 5.5-5.5-2.462-5.5-5.5z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.etsy.com/shop/SumaApothecary" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                  aria-label="Visit our Etsy shop"
                >
                  <ExternalLink className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-amber-800 mt-8 pt-8 text-center text-amber-300">
            <p>&copy; 2024 Suma Apothecary. Handcrafted with love in Türkiye.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

