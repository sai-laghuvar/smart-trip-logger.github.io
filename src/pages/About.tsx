import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { BarChart3, Globe, Leaf, Target, Users, Zap } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: <Target className="h-8 w-8 text-orange-400" />,
      title: "Our Mission",
      description: "To make travel data collection effortless and promote sustainable transportation choices through data-driven insights.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-400" />,
      title: "Smart Analytics",
      description: "Advanced analytics help you understand your travel patterns and make informed decisions about your mobility.",
    },
    {
      icon: <Leaf className="h-8 w-8 text-green-400" />,
      title: "Sustainability Focus",
      description: "Track your carbon footprint and discover eco-friendly alternatives to reduce your environmental impact.",
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-400" />,
      title: "Easy Integration",
      description: "Multiple ways to log trips - web app, WhatsApp bot, or API integration with your existing systems.",
    },
    {
      icon: <Users className="h-8 w-8 text-purple-400" />,
      title: "Community Impact",
      description: "Your data contributes to better urban planning and transportation infrastructure development.",
    },
    {
      icon: <Globe className="h-8 w-8 text-teal-400" />,
      title: "Global Reach",
      description: "Supporting sustainable mobility initiatives worldwide with comprehensive travel data insights.",
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "500K+", label: "Trips Logged" },
    { number: "50+", label: "Cities Covered" },
    { number: "25%", label: "CO₂ Reduction" },
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

      <div className="pt-24 pb-16 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-white mb-6">
              About Smart Travel Data Logger
            </h1>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              We're on a mission to revolutionize how people track and understand their travel patterns. 
              By making trip logging effortless and insights actionable, we're helping build a more 
              sustainable future for urban mobility.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-white/80">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Why Choose Our Platform?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl h-full hover:bg-white/15 transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-center mb-4">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-white text-xl text-center">
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
          </motion.div>

          {/* Impact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
              <CardContent className="p-12 text-center">
                <Leaf className="h-16 w-16 text-green-400 mx-auto mb-6" />
                <h2 className="text-4xl font-bold text-white mb-6">
                  Making a Real Impact
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      For Individuals
                    </h3>
                    <ul className="space-y-2 text-white/80">
                      <li>• Track and reduce your carbon footprint</li>
                      <li>• Discover more sustainable travel options</li>
                      <li>• Understand your mobility patterns</li>
                      <li>• Make informed transportation choices</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      For Cities
                    </h3>
                    <ul className="space-y-2 text-white/80">
                      <li>• Better urban planning with real data</li>
                      <li>• Optimize public transportation routes</li>
                      <li>• Reduce traffic congestion</li>
                      <li>• Promote sustainable mobility policies</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
