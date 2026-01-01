import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Download, 
  Key, 
  Code, 
  Zap, 
  Shield, 
  Globe,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: <Download className="w-8 h-8" />,
      title: "YouTube Video Download",
      description: "Download any YouTube video in multiple formats and qualities with a single API call."
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: "Secure API Keys",
      description: "Generate secure API keys with rate limiting and detailed usage tracking."
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "REST API",
      description: "Clean, well-documented REST API that's easy to integrate into any application."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fast & Reliable",
      description: "Built on scalable infrastructure ensuring high availability and fast response times."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Proxy",
      description: "Your API keys and requests are securely proxied, protecting your privacy."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Access",
      description: "Accessible from anywhere in the world with automatic content optimization."
    }
  ];

  const stats = [
    { label: "API Requests/Day", value: "10K+" },
    { label: "Active Users", value: "500+" },
    { label: "Videos Downloaded", value: "100K+" },
    { label: "Uptime", value: "99.9%" }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">YouTube Downloader</span>
            <br />
            <span className="text-4xl md:text-6xl">API as a Service</span>
          </h1>
          <p className="text-xl text-dark-300 mb-8 max-w-2xl mx-auto">
            Powerful, secure, and reliable API for downloading YouTube videos. 
            Built for developers who need robust video download capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/generate-key" className="btn-primary inline-flex items-center justify-center">
              Get Free API Key
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link to="/docs" className="btn-secondary inline-flex items-center justify-center">
              View Documentation
              <Code className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card text-center"
            >
              <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-dark-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Our API?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card group"
            >
              <div className="text-primary-500 mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-dark-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <div className="card max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-dark-300 mb-8">
            Join thousands of developers using our YouTube Downloader API
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Free tier available</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Get started in 2 minutes</span>
            </div>
          </div>
          <Link 
            to="/generate-key" 
            className="btn-primary inline-flex items-center justify-center mt-8 w-full"
          >
            Generate Your Free API Key Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
