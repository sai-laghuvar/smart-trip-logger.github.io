import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import TripLogForm from "@/components/TripLogForm";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import {
  BarChart3,
  Bot,
  Car,
  Leaf,
  MapPin,
  MessageCircle,
  Plane,
  Train,
  TrendingUp,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router";

export default function Landing() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: <MapPin className="h-8 w-8 text-orange-400" />,
      title: "Easy Trip Logging",
      description: "Log your trips with just a few clicks. Track origin, destination, transport mode, and more.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-400" />,
      title: "Smart Analytics",
      description: "Get insights into your travel patterns, most used transport modes, and travel statistics.",
    },
    {
      icon: <Bot className="h-8 w-8 text-green-400" />,
      title: "WhatsApp Integration",
      description: "Log trips directly through our WhatsApp chatbot for ultimate convenience.",
    },
    {
      icon: <Leaf className="h-8 w-8 text-teal-400" />,
      title: "Sustainability Focus",
      description: "Track your carbon footprint and make more sustainable travel choices.",
    },
  ];

  const transportModes = [
    { icon: <Car className="h-6 w-6" />, name: "Car" },
    { icon: <Train className="h-6 w-6" />, name: "Train" },
    { icon: <Plane className="h-6 w-6" />, name: "Airplane" },
    { icon: <Users className="h-6 w-6" />, name: "Bus" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Log Your Trips{" "}
              <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                Effortlessly
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              Smarter Travel Insights for a Sustainable Future. Track your journeys, analyze patterns, and make eco-friendly choices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate(isAuthenticated ? "/log-trip" : "/auth")}
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 px-8 py-4 text-lg font-semibold"
              >
                Start Logging
              </Button>
              <Button
                onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth")}
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold"
              >
                {isAuthenticated ? "View Dashboard" : "Learn More"}
              </Button>
            </div>
          </motion.div>

          {/* Transport Mode Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center gap-8 mb-16"
          >
            {transportModes.map((mode, index) => (
              <motion.div
                key={mode.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-full p-4 border border-white/20"
              >
                <div className="text-white">{mode.icon}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trip Logging Form Section */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Quick Trip Logger
            </h2>
            <p className="text-xl text-white/80">
              Log your trip details in seconds with our intuitive form
            </p>
          </motion.div>
          
          {isAuthenticated ? (
            <TripLogForm onSuccess={() => navigate("/dashboard")} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
                <CardContent className="p-12 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Sign in to start logging your trips
                  </h3>
                  <p className="text-white/80 mb-6">
                    Create an account to access all features and start tracking your travel data
                  </p>
                  <Button
                    onClick={() => navigate("/auth")}
                    className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 px-8 py-3 text-lg font-semibold"
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose Smart Travel Data Logger?
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Our platform combines ease of use with powerful analytics to help you understand and optimize your travel patterns
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl h-full hover:bg-white/15 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-white text-xl">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80 text-center">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Powerful Analytics Dashboard
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Get insights into your travel patterns with our comprehensive analytics
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
                <CardHeader className="text-center">
                  <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <CardTitle className="text-white text-2xl">156</CardTitle>
                  <p className="text-white/80">Total Trips</p>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
                <CardHeader className="text-center">
                  <Car className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <CardTitle className="text-white text-2xl">Car</CardTitle>
                  <p className="text-white/80">Most Used Transport</p>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
                <CardHeader className="text-center">
                  <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <CardTitle className="text-white text-2xl">342</CardTitle>
                  <p className="text-white/80">Total Co-travelers</p>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chatbot Section */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
              <CardContent className="p-12">
                <MessageCircle className="h-16 w-16 text-green-400 mx-auto mb-6" />
                <h2 className="text-4xl font-bold text-white mb-4">
                  WhatsApp Integration
                </h2>
                <p className="text-xl text-white/80 mb-8">
                  Log your trips on the go with our WhatsApp chatbot. Simply send a message and we'll handle the rest.
                </p>
                <Button
                  onClick={() => navigate("/chatbot")}
                  className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white border-0 px-8 py-3 text-lg font-semibold"
                >
                  Try Chatbot
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 relative z-10 border-t border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img src="/logo.svg" alt="Smart Travel Data Logger" className="h-8 w-8" />
                <span className="text-xl font-bold text-white">Smart Travel Data Logger</span>
              </div>
              <p className="text-white/80 mb-4">
                Making travel data logging simple and sustainable. Track your journeys, understand your patterns, and make better choices for the environment.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="/log-trip" className="block text-white/80 hover:text-white transition-colors">Log Trip</a>
                <a href="/dashboard" className="block text-white/80 hover:text-white transition-colors">Dashboard</a>
                <a href="/chatbot" className="block text-white/80 hover:text-white transition-colors">Chatbot</a>
                <a href="/about" className="block text-white/80 hover:text-white transition-colors">About</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-white/80">
                <p>support@smarttravel.com</p>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/60">
              © 2024 Smart Travel Data Logger. All rights reserved. Built with ❤️ for sustainable travel.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
