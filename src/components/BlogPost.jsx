import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Sparkles, ExternalLink, Share2 } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();

  // Sample blog post data - in real implementation, this would be fetched based on slug
  const blogPost = {
    title: 'Understanding the Seven Chakras: A Complete Guide to Energy Centers',
    content: `
      <p>The chakra system is an ancient framework for understanding the energy centers within our bodies. These seven spinning wheels of energy, when balanced and aligned, contribute to our overall physical, emotional, and spiritual well-being.</p>

      <h2>What Are Chakras?</h2>
      <p>Chakras, derived from the Sanskrit word meaning "wheel" or "disk," are energy centers that run along the spine from the base to the crown of the head. Each chakra corresponds to specific physical, emotional, and spiritual aspects of our being.</p>

      <h2>The Seven Main Chakras</h2>

      <h3>1. Root Chakra (Muladhara)</h3>
      <p>Located at the base of the spine, the root chakra is associated with grounding, stability, and survival instincts. When balanced, you feel secure and grounded. Essential oils like patchouli, vetiver, and cedarwood can help balance this chakra.</p>

      <h3>2. Sacral Chakra (Svadhisthana)</h3>
      <p>Positioned below the navel, this chakra governs creativity, sexuality, and emotions. Orange oils like sweet orange, tangerine, and ylang-ylang support sacral chakra healing.</p>

      <h3>3. Solar Plexus Chakra (Manipura)</h3>
      <p>Located in the upper abdomen, this chakra relates to personal power, confidence, and self-esteem. Citrus oils like lemon, grapefruit, and bergamot are excellent for solar plexus work.</p>

      <h3>4. Heart Chakra (Anahata)</h3>
      <p>At the center of the chest, the heart chakra governs love, compassion, and connection. Rose, jasmine, and green oils like eucalyptus support heart chakra balance.</p>

      <h3>5. Throat Chakra (Vishuddha)</h3>
      <p>Located at the throat, this chakra is about communication and truth. Blue oils like chamomile and eucalyptus, along with frankincense, support throat chakra healing.</p>

      <h3>6. Third Eye Chakra (Ajna)</h3>
      <p>Positioned between the eyebrows, this chakra relates to intuition and wisdom. Lavender, clary sage, and frankincense are powerful for third eye work.</p>

      <h3>7. Crown Chakra (Sahasrara)</h3>
      <p>At the top of the head, the crown chakra connects us to divine consciousness. Lotus, frankincense, and sandalwood support crown chakra alignment.</p>

      <h2>Using Essential Oils for Chakra Balancing</h2>
      <p>Essential oils can be powerful tools for chakra work. Our handcrafted ceramic diffusers provide the perfect way to disperse these healing aromas throughout your sacred space. Simply add a few drops of your chosen chakra oil to your diffuser and allow the therapeutic properties to support your energy work.</p>

      <h2>Creating Your Chakra Practice</h2>
      <p>Start by identifying which chakras feel out of balance. You might notice physical symptoms, emotional patterns, or simply an intuitive sense of which energy centers need attention. Create a daily practice that includes meditation, aromatherapy, and mindful breathing to support your chakra health.</p>

      <p>Remember, chakra balancing is a journey, not a destination. Be patient with yourself as you explore these ancient energy centers and discover what works best for your unique constitution.</p>
    `,
    date: '2024-01-15',
    readTime: '8 min read',
    author: 'Suma',
    category: 'Chakra Guide'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/blog" className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Blog</span>
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
            <ExternalLink className="w-4 h-4" />
            <span>Shop</span>
          </a>
        </div>
      </header>

      {/* Article */}
      <article className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Article Header */}
          <header className="mb-12">
            <div className="mb-4">
              <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {blogPost.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6 leading-tight">
              {blogPost.title}
            </h1>
            
            <div className="flex items-center justify-between text-amber-600 mb-6">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{blogPost.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(blogPost.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{blogPost.readTime}</span>
                </div>
              </div>
              
              <button className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg prose-amber max-w-none">
            <div 
              className="text-amber-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
              style={{
                fontSize: '1.125rem',
                lineHeight: '1.75'
              }}
            />
          </div>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-amber-200">
            <div className="bg-amber-100 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-amber-900 mb-3">About the Author</h3>
              <p className="text-amber-700">
                Suma is the founder of Suma Apothecary, a passionate wellness practitioner and ceramic artist. 
                From her Turkish atelier, she creates handcrafted diffusers and curates essential oil blends 
                to support your chakra balancing and wellness journey.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <Link 
                to="/blog"
                className="text-amber-600 hover:text-amber-700 font-medium transition-colors flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Posts</span>
              </Link>
              
              <button className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Share This Post</span>
              </button>
            </div>
          </footer>
        </div>
      </article>

      {/* Related Products CTA */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Ready to Start Your Chakra Journey?</h2>
          <p className="text-xl text-amber-700 mb-8">
            Explore our handcrafted ceramic diffusers and essential oil blends designed specifically for chakra balancing.
          </p>
          <a 
            href="https://www.etsy.com/shop/SumaApothecary" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg rounded-lg transition-colors inline-flex items-center space-x-2 font-medium"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Shop Chakra Collection</span>
          </a>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">Get More Wellness Tips</h2>
          <p className="text-amber-100 text-lg mb-8">
            Subscribe to our newsletter for weekly chakra guides, aromatherapy tips, and wellness inspiration.
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
                  <Link to="/blog" className="hover:text-amber-300 transition-colors">
                    Blog
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
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-amber-200">
                <li>
                  <a href="mailto:hello@sumaapothecary.com" className="hover:text-amber-300 transition-colors">
                    hello@sumaapothecary.com
                  </a>
                </li>
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

export default BlogPost;

