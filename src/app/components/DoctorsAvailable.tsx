import { useState, useEffect } from 'react';
import { Star, MapPin, Briefcase, Phone, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { apiGetDoctors, apiSearchDoctors } from '../lib/api';

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  hospital: string;
  location: string;
  phone: string;
  rating: number;
  reviews: number;
  isAvailable: boolean;
}

interface DoctorsAvailableProps {
  onSelectDoctor?: (doctor: Doctor) => void;
}

export default function DoctorsAvailable({ onSelectDoctor }: DoctorsAvailableProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiGetDoctors();
      setDoctors(response.doctors || []);
      setFilteredDoctors(response.doctors || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load doctors');
      console.error('Failed to load doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredDoctors(doctors);
      return;
    }

    // Filter by name, specialization, or hospital
    const filtered = doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(query.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(query.toLowerCase()) ||
      doctor.hospital.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredDoctors(filtered);
  };

  const handleSpecialtyFilter = async (specialty: string) => {
    setSpecialtyFilter(specialty);
    
    if (!specialty) {
      setFilteredDoctors(doctors);
      return;
    }

    try {
      const response = await apiSearchDoctors(specialty);
      setFilteredDoctors(response.doctors || []);
    } catch (err) {
      console.error('Failed to search doctors:', err);
      // Fallback to client-side filtering
      const filtered = doctors.filter(doctor =>
        doctor.specialization.toLowerCase().includes(specialty.toLowerCase())
      );
      setFilteredDoctors(filtered);
    }
  };

  const getUniqueSpecialties = (): string[] => {
    return Array.from(new Set(doctors.map(d => d.specialization))).sort();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-600 border-t-blue-500"></div>
              <p className="text-gray-400 mt-4">Loading doctors...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Available Doctors</h1>
          <p className="text-gray-400">Find and book an appointment with our expert eye care specialists</p>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white/6 border-white/10 mb-8" style={{ borderRadius: '8px' }}>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Search Doctors
                </label>
                <Input
                  type="text"
                  placeholder="Search by name, specialization, or hospital..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Filter by Specialization
                </label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={specialtyFilter === '' ? 'default' : 'outline'}
                    onClick={() => handleSpecialtyFilter('')}
                    className={specialtyFilter === '' ? 'bg-blue-600 text-white' : 'text-gray-300 border-gray-600'}
                    size="sm"
                  >
                    All
                  </Button>
                  {getUniqueSpecialties().map((specialty) => (
                    <Button
                      key={specialty}
                      variant={specialtyFilter === specialty ? 'default' : 'outline'}
                      onClick={() => handleSpecialtyFilter(specialty)}
                      className={specialtyFilter === specialty ? 'bg-blue-600 text-white' : 'text-gray-300 border-gray-600'}
                      size="sm"
                    >
                      {specialty}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Card className="bg-red-900/20 border-red-700 mb-8">
            <CardContent className="p-4">
              <p className="text-red-400">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Doctors Grid */}
        {filteredDoctors.length === 0 ? (
          <Card className="bg-white/6 border-white/10">
            <CardContent className="p-12 text-center">
              <p className="text-gray-400 text-lg">No doctors found matching your search criteria.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <Card
                key={doctor._id}
                className="bg-white/6 border-white/10 hover:bg-white/10 transition-colors cursor-pointer overflow-hidden"
                style={{ borderRadius: '8px' }}
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <CardTitle className="text-xl text-white">{doctor.name}</CardTitle>
                      <p className="text-sm text-blue-400 mt-1">{doctor.specialization}</p>
                    </div>
                    {doctor.isAvailable && (
                      <Badge className="bg-green-500 text-white">Available</Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(doctor.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">
                      {doctor.rating.toFixed(1)} ({doctor.reviews} reviews)
                    </span>
                  </div>

                  {/* Hospital */}
                  <div className="flex items-start gap-2 text-sm">
                    <Briefcase className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-300">{doctor.hospital}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-400">{doctor.location}</p>
                  </div>

                  {/* Phone */}
                  {doctor.phone && (
                    <div className="flex items-start gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-400">{doctor.phone}</p>
                    </div>
                  )}

                  {/* Book Button */}
                  <Button
                    onClick={() => onSelectDoctor?.(doctor)}
                    style={{ backgroundColor: '#0052CC' }}
                    className="w-full text-white hover:opacity-90 mt-4"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Results Count */}
        {filteredDoctors.length > 0 && (
          <div className="mt-6 text-center text-gray-400">
            <p>Showing {filteredDoctors.length} of {doctors.length} doctors</p>
          </div>
        )}
      </div>
    </div>
  );
}
