import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Sparkles, ExternalLink } from 'lucide-react';

const BlogPage = () => {
  // Sample blog posts - in real implementation, this would come from a CMS or API
  const blogPosts = [
    {
      id: 1,
      slug: 'understanding-seven-chakras',
      title: 'Understanding the Seven Chakras: A Complete Guide to Energy Centers',
      excerpt: 'Discover the ancient wisdom of chakras and how they influence your physical, emotional, and spiritual well-being. Learn about each energy center and how to balance them.',
      date: '2024-01-15',
      author: 'Suma',
      category: 'Chakra Guide',
      image: '/api/placeholder/600/300'
    },
    {
      id: 2,
      slug: 'aromatherapy-beginners-guide',
      title: 'Aromatherapy for Beginners: Essential Oils and Their Healing Properties',
      excerpt: 'Start your aromatherapy journey with this comprehensive guide. Learn about essential oils, their benefits, and how to use them safely in your daily wellness routine.',
      date: '2024-01-12',
      author: 'Suma',
      category: 'Aromatherapy',
      image: '/api/placeholder/600/300'
    },
    {
      id: 3,
      slug: 'ceramic-diffuser-care',
      title: 'How to Care for Your Ceramic Essential Oil Diffuser',
      excerpt: 'Keep your handcrafted ceramic diffuser in perfect condition with these simple care tips. Learn proper cleaning, maintenance, and storage techniques.',
      date: '2024-01-10',
      author: 'Suma',
      category: 'Product Care',
      image: '/api/placeholder/600/300'
    },
    {
      id: 4,
      slug: 'creating-sacred-space',
      title: 'Creating a Sacred Space for Meditation and Wellness',
      excerpt: 'Transform any corner of your home into a peaceful sanctuary. Discover how to design a sacred space that supports your meditation and wellness practices.',
      date: '2024-01-08',
      author: 'Suma',
      category: 'Wellness',
      image: '/api/placeholder/600/300'
    },
    {
      id: 5,
      slug: 'turkish-ceramic-tradition',
      title: 'The Art of Turkish Ceramic: Ancient Traditions Meet Modern Wellness',
      excerpt: 'Explore the rich history of Turkish ceramic craftsmanship and how these ancient techniques create beautiful, functional pieces for modern wellness practices.',
      date: '2024-01-05',
      author: 'Suma',
      category: 'Craftsmanship',
      image: '/api/placeholder/600/300'
    },
    {
      id: 6,
      slug: 'root-chakra-grounding',
      title: 'Root Chakra Healing: Grounding Techniques for Stability and Security',
      excerpt: 'Learn powerful grounding techniques to balance your root chakra. Discover essential oils, meditation practices, and lifestyle changes that promote stability.',
      date: '2024-01-03',
      author: 'Suma',
      category: 'Chakra Guide',
      image: '/api/placeholder/600/300'
    }
  ];

  const categories = ['All', 'Chakra Guide', 'Aromatherapy', 'Wellness', 'Product Care', 'Craftsmanship'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            <h1 className="text-xl font-bold text-amber-900">Suma Apothecary</h1>
          </div>
          
          <a 
            href="https://www.etsy.com/shop/SumaApothecary" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            <span>Visit Shop</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </header>

      {/* Blog Header */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-amber-900 mb-6">
            Wellness <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Blog</span>
          </h1>
          <p className="text-xl text-amber-700 mb-8 max-w-2xl mx-auto">
            Discover ancient wisdom and modern wellness practices. From chakra guides to aromatherapy tips, 
            explore our collection of articles designed to support your healing journey.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 mb-12">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full border border-amber-300 text-amber-700 hover:bg-amber-100 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-4 pb-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-br from-amber-200 to-orange-300 relative">
                  <div className="absolute top-4 left-4">
                    <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-bold text-amber-900 mb-3 line-clamp-2 hover:text-amber-700 transition-colors">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-amber-700 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-amber-600 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    <span>Read More</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">Never Miss a Wellness Tip</h2>
          <p className="text-amber-100 text-lg mb-8">
            Subscribe to our newsletter and get the latest wellness guides, chakra tips, and product updates delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg bg-white/90 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-white text-amber-600 hover:bg-amber-50 px-6 py-3 rounded-lg font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                <Sparkles className="w-6 h-6 text-amber-400" />
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
                  <Link to="/" className="hover:text-amber-300 transition-colors">
                    Home
                  </Link>
                </li>
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
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Categories</h4>
              <ul className="space-y-2 text-amber-200">
                <li><a href="#" className="hover:text-amber-300 transition-colors">Chakra Guides</a></li>
                <li><a href="#" className="hover:text-amber-300 transition-colors">Aromatherapy</a></li>
                <li><a href="#" className="hover:text-amber-300 transition-colors">Wellness Tips</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-amber-800 mt-8 pt-8 text-center text-amber-300">
            <p>&copy; 2024 Suma Apothecary. Handcrafted with love in Türkiye.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;

