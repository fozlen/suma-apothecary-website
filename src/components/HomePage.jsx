import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram, ExternalLink, Sparkles, Leaf, ArrowRight } from 'lucide-react';

const HomePage = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Newsletter signup logic would go here
    alert('Thank you for subscribing to our wellness journey!');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-amber-600" />
            </div>
            <h1 className="text-2xl font-bold text-amber-900">Suma Apothecary</h1>
          </div>
          <nav className="flex items-center space-x-6">
            <Link to="/blog" className="text-amber-800 hover:text-amber-600 transition-colors font-medium">
              Blog
            </Link>
            <a 
              href="https://www.etsy.com/shop/SumaApothecary" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <span>Visit Shop</span>
              <ArrowRight className="w-4 h-4" />
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
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a 
              href="https://www.etsy.com/shop/SumaApothecary" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg rounded-lg transition-colors flex items-center justify-center space-x-2 font-medium"
            >
              <span>Explore Our Collection</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link 
              to="/blog"
              className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-4 text-lg rounded-lg transition-colors flex items-center justify-center font-medium"
            >
              <span>Wellness Blog</span>
            </Link>
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
                  <Link to="/blog" className="hover:text-amber-300 transition-colors">
                    Wellness Blog
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Follow Us</h4>
              <div className="flex justify-center md:justify-start space-x-6">
                <a 
                  href="https://www.instagram.com/sumaapothecary" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.pinterest.com/sumaapothecary" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                  aria-label="Pinterest"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.etsy.com/shop/SumaApothecary" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                  aria-label="Etsy Shop"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.187 22c-1.25 0-2.25-1-2.25-2.25v-15.5c0-1.25 1-2.25 2.25-2.25h9.625c1.25 0 2.25 1 2.25 2.25v15.5c0 1.25-1 2.25-2.25 2.25h-9.625zm2.25-16.5v2.25h5.125v-2.25h-5.125zm0 4.5v2.25h5.125v-2.25h-5.125zm0 4.5v2.25h5.125v-2.25h-5.125z"/>
                  </svg>
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
};

export default HomePage;

