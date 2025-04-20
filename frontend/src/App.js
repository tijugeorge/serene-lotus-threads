import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import CheckoutPage from './pages/CheckoutPage';
import PaymentResult from './pages/PaymentResult';
import LotusSilkVideoPlaceholder from './assets/lotus-silk-video.mp4'; // Your video file
import TombRaiderPlaceholder from './assets/tomb-raider-lotus.jpg'; // Placeholder image
import './App.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import image1 from './assets/lotus-silk-1.jpg'; // Your image paths
import image2 from './assets/lotus-silk-2.jpg';
import image3 from './assets/lotus-silk-3.jpg';

function App() {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/checkout">Checkout</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={
                    <div>
                        {/* Hero Section with Carousel */}
                        <section className="hero">
                            <Carousel
                                autoPlay={true} // Keep autoplay for images
                                infiniteLoop={true}
                                showThumbs={false}
                                interval={5000} // Adjust autoplay interval for images (in milliseconds)
                                stopOnHover={false} // Continue autoplay when mouse hovers
                            >
                                {/* First item: Video */}
                                <div className="carousel-item">
                                    <video src={LotusSilkVideoPlaceholder} loop autoPlay muted poster="video-poster.jpg" style={{ width: '100%', display: 'block' }} controls // Add controls for manual navigation
                                    />
                                </div>
                                {/* Next items: Images */}
                                <div className="carousel-item">
                                    <img src={image1} alt="Lotus Silk Apparel 1" style={{ width: '100%', display: 'block' }} />
                                </div>
                                <div className="carousel-item">
                                    <img src={image2} alt="Lotus Silk Apparel 2" style={{ width: '100%', display: 'block' }} />
                                </div>
                                <div className="carousel-item">
                                    <img src={image3} alt="Lotus Silk Apparel 3" style={{ width: '100%', display: 'block' }} />
                                </div>
                            </Carousel>
                            <h1>Elegance, Royalty, Health & Wellbeing</h1>
                            <p>Experience the care, health benefits, and shared beauty of ethically sourced lotus silk.</p>
                            <button>Shop New Gym Wear</button>
                            {/* <button>Our Story</button> */}
                        </section>

                        {/* Featured Gym Wear */}
                        <section className="featured-gym-wear">
                            <h2>Featured Gym Wear</h2>
                            <div className="product-grid">
                                {/* Replace placeholders with actual product components/images */}
                                <div className="product">[Image + Women's Gym T-shirt]</div>
                                <div className="product">[Image + Men's Gym T-shirt]</div>
                                <div className="product">[Image + Gym Shorts]</div>
                                <div className="product">[Image + Gym Bra]</div>
                            </div>
                        </section>

                        {/* Our Story Snippet */}
                        <section className="our-story-snippet">
                            <img src={TombRaiderPlaceholder} alt="Evocative Image" style={{ maxWidth: '300px', float: 'left', marginRight: '20px' }} />
                            <h3>The Sacred Thread: From Cambodian Lotus</h3>
                            <p>Discover the careful processing of lotus stems, the natural skincare abilities of the fiber, the skilled Cambodian artisans who craft our garments, and our commitment to sustainability, all with a touch of serene strength.</p>
                            <Link to="/our-story">Learn Our Story</Link>
                        </section>

                        {/* Key Benefits */}
                        <section className="key-benefits">
                            <h2>Key Benefits</h2>
                            <div className="benefits-grid">
                                <div className="benefit">[Icon] <strong>Antibacterial</strong> [Gentle on skin]</div>
                                <div className="benefit">[Icon] <strong>Sun Protection</strong> [Shielded naturally]</div>
                                <div className="benefit">[Icon] <strong>Breathable</strong> [Comfort in motion]</div>
                                <div className="benefit">[Icon] <strong>Sustainable</strong> [Kind to the Earth]</div>
                            </div>
                        </section>

                        {/* Optional Instagram Feed (Placeholder) */}
                        {/* <section className="instagram-feed">
                            <h2>[Optional] Instagram Feed</h2>
                            <div className="thumbnails">[Placeholder for Thumbnails]</div>
                        </section> */}

                        {/* Footer */}
                        <footer>
                            <p>&copy; {new Date().getFullYear()} Serene Lotus Threads</p>
                            {/* Add social media icons, contact info, newsletter later */}
                        </footer>
                    </div>
                } />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/payment-result" element={<PaymentResult />} />
            </Routes>
        </div>
    );
}

export default App;