import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { toast } from "sonner";

interface TripLogFormProps {
  onSuccess?: () => void;
}

export default function TripLogForm({ onSuccess }: TripLogFormProps) {
  const createTrip = useMutation(api.trips.createTrip);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    transportMode: "",
    date: "",
    time: "",
    coTravelers: 0,
    notes: "",
  });

  const transportModes = [
    "Car",
    "Bus",
    "Metro/Subway",
    "Train",
    "Airplane",
    "Bicycle",
    "Walking",
    "Motorcycle",
    "Taxi/Rideshare",
    "Boat/Ferry",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.origin || !formData.destination || !formData.transportMode || !formData.date || !formData.time) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      await createTrip(formData);
      toast.success("Trip logged successfully!");
      setFormData({
        origin: "",
        destination: "",
        transportMode: "",
        date: "",
        time: "",
        coTravelers: 0,
        notes: "",
      });
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to log trip. Please try again.");
      console.error("Error creating trip:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <MapPin className="h-6 w-6 text-orange-400" />
            Log Your Trip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="origin" className="text-white/90">
                  Origin *
                </Label>
                <Input
                  id="origin"
                  value={formData.origin}
                  onChange={(e) => handleInputChange("origin", e.target.value)}
                  placeholder="Starting location"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination" className="text-white/90">
                  Destination *
                </Label>
                <Input
                  id="destination"
                  value={formData.destination}
                  onChange={(e) => handleInputChange("destination", e.target.value)}
                  placeholder="End location"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transportMode" className="text-white/90">
                Mode of Transport *
              </Label>
              <Select
                value={formData.transportMode}
                onValueChange={(value) => handleInputChange("transportMode", value)}
                required
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select transport mode" />
                </SelectTrigger>
                <SelectContent>
                  {transportModes.map((mode) => (
                    <SelectItem key={mode} value={mode}>
                      {mode}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-white/90 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time" className="text-white/90 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Time *
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coTravelers" className="text-white/90 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Number of Co-travelers
              </Label>
              <Input
                id="coTravelers"
                type="number"
                min="0"
                value={formData.coTravelers}
                onChange={(e) => handleInputChange("coTravelers", parseInt(e.target.value) || 0)}
                placeholder="0"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-white/90">
                Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Any additional details about your trip..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[100px]"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 py-3 text-lg font-semibold"
            >
              {isLoading ? "Logging Trip..." : "Log Trip"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
