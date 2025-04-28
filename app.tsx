import React, { useState, useRef } from 'react';
import { Phone, Mail, MapPin, Brush, Home, PenTool as Tool, Users, ChevronRight, Instagram, Facebook, Twitter, ChevronLeft } from 'lucide-react';
import emailjs from '@emailjs/browser';

function App() {
  const [currentProject, setCurrentProject] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });
  const formRef = useRef<HTMLFormElement>(null);
  
  const projects = [
    {
      title: "Modern Apartment Renovation",
      description: "Complete interior painting and structural renovation of a 3BHK apartment in the city center.",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80",
      category: "Residential Painting"
    },
    {
      title: "Industrial Pen Booth Installation",
      description: "Custom-designed and constructed pen booth with CO2 welding for a manufacturing facility.",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80",
      category: "Structure Work"
    },
    {
      title: "Commercial Complex Exterior",
      description: "Large-scale exterior painting project for a five-story commercial building.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80",
      category: "Residential Painting"
    }
  ];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const formData = new FormData(formRef.current);
      const templateParams = {
        to_email: 'artistryprime5@gmail.com',
        from_name: formData.get('user_name'),
        from_email: formData.get('user_email'),
        message: formData.get('message'),
        reply_to: formData.get('user_email')
      };

      await emailjs.send(
        'service_3ul36gu',
        'template_ifx8hkg',
        templateParams,
        'DZwPBpziySQaPFuCK'
      );

      setSubmitStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully.'
      });
      formRef.current.reset();
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Sorry, something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Brush className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ArtistryPrime</span>
            </div>
            <div className="flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600">Home</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600">Services</a>
              <a href="#projects" className="text-gray-700 hover:text-blue-600">Projects</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Transform Your Space with Professional Excellence
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                We bring your vision to life with expert painting and structural work services. Quality craftsmanship that stands the test of time.
              </p>
              <a href="#contact" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </a>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80"
                alt="Professional painting service"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Home className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Residential Painting</h3>
              <p className="text-gray-600">Interior and exterior painting services for homes with premium quality paints and expert finish.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Tool className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Structure Work</h3>
              <p className="text-gray-600">Professional structural modifications, repairs, and installations for both residential and commercial spaces.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Users className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Commercial Services</h3>
              <p className="text-gray-600">Comprehensive painting and structural solutions for offices, retail spaces, and industrial facilities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Projects</h2>
          <div className="relative">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img
                src={projects[currentProject].image}
                alt={projects[currentProject].title}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-6">
                <h3 className="text-xl font-semibold mb-2">{projects[currentProject].title}</h3>
                <p className="text-sm mb-2">{projects[currentProject].description}</p>
                <span className="inline-block bg-blue-600 px-3 py-1 rounded-full text-sm">
                  {projects[currentProject].category}
                </span>
              </div>
            </div>
            <button
              onClick={prevProject}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={nextProject}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80"
                alt="Our team at work"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">A Decade of Excellence</h2>
              <p className="text-lg text-gray-600 mb-6">
                With over 10 years of industry experience, ArtistryPrime has established itself as a leading name in painting and structural work services. Our commitment to excellence and customer satisfaction has earned us a reputation for delivering exceptional results.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-3xl font-bold text-blue-600 mb-2">10+</h3>
                  <p className="text-gray-600">Years Experience</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-3xl font-bold text-blue-600 mb-2">100%</h3>
                  <p className="text-gray-600">Client Satisfaction</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-3xl font-bold text-blue-600 mb-2">500+</h3>
                  <p className="text-gray-600">Projects Completed</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-3xl font-bold text-blue-600 mb-2">50+</h3>
                  <p className="text-gray-600">Skilled Workers</p>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose Us?</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mr-3"></div>
                    Highly skilled and experienced workforce
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mr-3"></div>
                    Premium quality materials and tools
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mr-3"></div>
                    Timely project completion
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mr-3"></div>
                    Competitive pricing with no compromise on quality
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="user_name"
                    id="user_name"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="user_email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="user_email"
                    id="user_email"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                {submitStatus.type && (
                  <div className={`mt-4 p-4 rounded-lg ${
                    submitStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                  }`}>
                    {submitStatus.message}
                  </div>
                )}
              </form>
            </div>
            <div className="space-y-6">
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-blue-600 mr-4" />
                <span className="text-gray-600">+91 9380869956</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-blue-600 mr-4" />
                <span className="text-gray-600">artistryprime5@gmail.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-blue-600 mr-4" />
                <span className="text-gray-600">Bangalore, Karnataka, India</span>
              </div>
              <div className="flex flex-col items-center mt-8">
                <div className="flex space-x-4 mb-4">
                  <a href="https://www.facebook.com/profile.php?id=61575720090195" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600">
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-600">
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-600">
                    <Twitter className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
