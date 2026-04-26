import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, Home, Calendar, FileText, MessageSquare, ArrowLeft, AlertCircle, User, MapPin, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { apiDoctors, type Doctor } from '../lib/api';

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [specialists, setSpecialists] = useState<Doctor[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await apiDoctors();
        if (mounted) setSpecialists(data.doctors ?? []);
      } catch {
        if (mounted) setSpecialists([]);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <Eye className="h-6 w-6" style={{ color: '#0052CC' }} />
                <span className="font-semibold text-lg text-white">EyeCareBD</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/80">Welcome, Patient</span>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5" style={{ color: '#0052CC' }} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <button className="py-4 px-2 border-b-2 font-medium text-sm flex items-center gap-2" style={{ borderColor: '#0052CC', color: '#0052CC' }}>
              <Home className="h-4 w-4" />
              Dashboard
            </button>
            <button onClick={() => navigate('/appointments')} className="py-4 px-2 text-white/70 hover:text-white flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Appointments
            </button>
            <button onClick={() => navigate('/reports')} className="py-4 px-2 text-white/70 hover:text-white flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Reports
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/* ✅ Eye Tests Section */}
          <Card>
            <CardHeader>
              <CardTitle className='text-white'>Eye Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">

                {/* Vision Test */}
                <div className="p-4 border rounded-lg text-center hover:shadow-md hover:scale-105 transition">
                  <Eye className="h-10 w-10 mx-auto mb-3" style={{ color: '#0052CC' }} />
                  <h4 className="font-bold text-white mb-2">Vision Test</h4>
                  <p className="text-sm text-white mb-4">
                    Check your visual clarity and sharpness.
                  </p>
                  <Button
                    className="w-full text-white"
                    style={{ backgroundColor: '#0052CC' }}
                    onClick={() => navigate('/vision-test')}
                  >
                    Start Test
                  </Button>
                </div>

                {/* Color Blindness */}
                <div className="p-4 border rounded-lg text-center hover:shadow-md hover:scale-105 transition">
                  <Star className="h-10 w-10 mx-auto mb-3" style={{ color: '#0052CC' }} />
                  <h4 className="font-bold  text-white mb-2">Color Blindness</h4>
                  <p className="text-sm text-white mb-4">
                    Detect color vision deficiency.
                  </p>
                  <Button
                    className="w-full text-white"
                    style={{ backgroundColor: '#0052CC' }}
                    onClick={() => navigate('/color-test')}
                  >
                    Start Test
                  </Button>
                </div>

                {/* Eye Pressure */}
                <div className="p-4 border rounded-lg text-center hover:shadow-md hover:scale-105 transition">
                  <AlertCircle className="h-10 w-10 mx-auto mb-3" style={{ color: '#0052CC' }} />
                  <h4 className="font-bold text-white mb-2">Amsler Grid Test</h4>
                  <p className="text-sm text-white mb-4">
                     Detect central vision distortion or macular issues.
                  </p>
                  <Button
                    className="w-full text-white"
                    style={{ backgroundColor: '#0052CC' }}
                    onClick={() => navigate('/pressure-test')}
                  >
                    Start Test
                  </Button>
                </div>

              </div>
            </CardContent>
          </Card>

          {/* Specialists */}
          <Card>
            <CardHeader>
              <CardTitle className='text-white'>Recommended Specialists</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {specialists.map((doc) => (
                <div key={doc._id} className="flex justify-between p-4 border rounded-lg">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{doc.name}</h4>
                      <p className="text-sm text-white">{doc.specialty ?? 'Ophthalmologist'}</p>
                      <p className="text-sm text-white">{doc.hospital ?? 'EyeCareBD Medical Center'}</p>
                      <div className="flex gap-3 text-xs mt-1">
                        <span className="flex text-white items-center gap-1">
                          <MapPin className="h-3 w-3" /> {doc.location ?? 'Dhaka'}
                        </span>
                        <span className="flex text-white items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400" /> {doc.rating ?? 4.5}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <Badge>{doc.available ?? 'Available'}</Badge>
                    <Button className="mt-2 w-full text-white" style={{ backgroundColor: '#0052CC' }}>
                      Book
                    </Button>
                  </div>
                </div>
              ))}
              {specialists.length === 0 && (
                <p className="text-sm text-white/70">No doctors found in database.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* AI Assistant */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-white mb-2">AI Assistant</h3>
              <p className="text-sm text-white/70 mb-4">
                Ask questions about your eye health.
              </p>
              <Button className="w-full text-white" style={{ backgroundColor: '#0052CC' }} onClick={() => navigate('/chatbot')}>
                Chat Now
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={() => navigate('/vision-test')} className="w-full justify-start">Start Vision Test</Button>
              <Button onClick={() => navigate('/appointments')} className="w-full justify-start">Appointments</Button>
              <Button onClick={() => navigate('/reports')} className="w-full justify-start">Reports</Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}