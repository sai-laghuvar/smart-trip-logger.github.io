import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { MessageCircle, Phone, QrCode } from "lucide-react";

export default function Chatbot() {
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
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-white mb-4">
              WhatsApp Chatbot
            </h1>
            <p className="text-xl text-white/80">
              Log your trips on the go with our intelligent WhatsApp integration
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* How it Works */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl h-full">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                    <MessageCircle className="h-6 w-6 text-green-400" />
                    How It Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Add Our Number</h3>
                      <p className="text-white/80">Save our WhatsApp number to your contacts</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Send Trip Details</h3>
                      <p className="text-white/80">Message us with your trip information in natural language</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Automatic Logging</h3>
                      <p className="text-white/80">Our AI processes and logs your trip automatically</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl h-full">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                    <Phone className="h-6 w-6 text-blue-400" />
                    Get Started
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="bg-white/10 rounded-lg p-6 mb-6">
                      <QrCode className="h-24 w-24 text-white mx-auto mb-4" />
                      <p className="text-white/80 text-sm">Scan QR code to add our WhatsApp</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-white/80 mb-2">WhatsApp Number:</p>
                        <p className="text-2xl font-bold text-white">+1 (555) 123-TRIP</p>
                      </div>
                      
                      <Button
                        onClick={() => window.open("https://wa.me/15551234567", "_blank")}
                        className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white border-0 py-3 text-lg font-semibold"
                      >
                        Start Chatting
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Example Messages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white text-center">
                  Example Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-green-400 font-semibold mb-2">You:</p>
                    <p className="text-white/90 italic">
                      "Just took the bus from Downtown to Airport at 2:30 PM with 2 friends"
                    </p>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-blue-400 font-semibold mb-2">Bot:</p>
                    <p className="text-white/90 italic">
                      "Trip logged! Downtown → Airport via Bus at 2:30 PM with 2 co-travelers ✅"
                    </p>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-green-400 font-semibold mb-2">You:</p>
                    <p className="text-white/90 italic">
                      "Drove from home to office this morning around 9 AM"
                    </p>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-blue-400 font-semibold mb-2">Bot:</p>
                    <p className="text-white/90 italic">
                      "Got it! Home → Office via Car at 9:00 AM. Need any details clarified?"
                    </p>
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
