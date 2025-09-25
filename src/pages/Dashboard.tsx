import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import { BarChart3, Calendar, Car, MapPin, TrendingUp, Users } from "lucide-react";
import { Navigate } from "react-router";
import { useQuery } from "convex/react";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const { isLoading, isAuthenticated } = useAuth();
  const trips = useQuery(api.trips.getUserTrips);
  const stats = useQuery(api.trips.getTripStats);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-white mb-4">
              Your Travel Dashboard
            </h1>
            <p className="text-xl text-white/80">
              Insights and analytics from your travel data
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Badge className="bg-white/10 text-white border border-white/20">Total Distance: 0 km</Badge>
              <Badge className="bg-white/10 text-white border border-white/20">Countries Visited: 0</Badge>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
                <CardHeader className="text-center">
                  <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <CardTitle className="text-white text-3xl">
                    {stats?.totalTrips || 0}
                  </CardTitle>
                  <p className="text-white/80">Total Trips</p>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
                <CardHeader className="text-center">
                  <Car className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <CardTitle className="text-white text-2xl">
                    {stats?.mostUsedTransport || "None"}
                  </CardTitle>
                  <p className="text-white/80">Most Used Transport</p>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
                <CardHeader className="text-center">
                  <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <CardTitle className="text-white text-3xl">
                    {stats?.totalCoTravelers || 0}
                  </CardTitle>
                  <p className="text-white/80">Total Co-travelers</p>
                </CardHeader>
              </Card>
            </motion.div>
          </div>

          {/* Recent Trips */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-orange-400" />
                  Recent Trips
                </CardTitle>
              </CardHeader>
              <CardContent>
                {trips && trips.length > 0 ? (
                  <div className="space-y-4">
                    {trips.slice(0, 10).map((trip) => (
                      <div
                        key={trip._id}
                        className="bg-white/5 rounded-lg p-4 border border-white/10"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-orange-400" />
                            <div>
                              <p className="text-white font-medium">
                                {trip.origin} → {trip.destination}
                              </p>
                              <p className="text-white/60 text-sm">
                                {trip.transportMode}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-white/80 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {trip.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {trip.coTravelers} co-travelers
                            </div>
                          </div>
                        </div>
                        {trip.notes && (
                          <p className="text-white/60 text-sm mt-2 ml-8">
                            {trip.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MapPin className="h-16 w-16 text-white/40 mx-auto mb-4" />
                    <p className="text-white/80 text-lg mb-2">No trips logged yet</p>
                    <p className="text-white/60">
                      Start logging your trips to see analytics here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}