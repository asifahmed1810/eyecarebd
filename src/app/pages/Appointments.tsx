import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, ArrowLeft, Calendar, Clock, MapPin, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { apiCreateAppointment, apiDoctors, apiMyAppointments } from '../lib/api';

export default function Appointments() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDoctorData, setSelectedDoctorData] = useState<any>(null);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const [doctors, setDoctors] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const timeSlots = [
    '09:00 AM','09:30 AM','10:00 AM','10:30 AM','11:00 AM',
    '02:00 PM','02:30 PM','03:00 PM','03:30 PM','04:00 PM'
  ];

  // Load doctors
  useEffect(() => {
    (async () => {
      const res = await apiDoctors();
      setDoctors(res.doctors || []);
    })();
  }, []);

  // Load appointments
  const loadAppointments = async () => {
    setLoading(true);
    const res = await apiMyAppointments();
    setAppointments(res.appointments || []);
    setLoading(false);
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  // CLICK DOCTOR CARD → OPEN MODAL
  const handleSelectDoctor = (doctor: any) => {
    setSelectedDoctor(doctor._id);
    setSelectedDoctorData(doctor);
    setShowModal(true);
    setError('');
  };

  // BOOK APPOINTMENT
  const handleBook = async () => {
    setError('');

    if (!selectedDoctor || !selectedDate || !selectedTime) {
      setError('Please select doctor, date and time');
      return;
    }

    try {
      await apiCreateAppointment({
        doctorId: selectedDoctor,
        date: new Date(selectedDate).toISOString(),
        time: selectedTime,
        type: 'consultation'
      });

      setShowModal(false);
      setSelectedDoctor('');
      setSelectedDoctorData(null);
      setSelectedDate('');
      setSelectedTime('');

      loadAppointments();

    } catch (err: any) {
      console.error("BOOKING ERROR:", err);
      setError(err?.message || 'Booking failed');
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 bg-gray-950 text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Eye className="text-blue-500" />
          <h1 className="font-bold">EyeCareBD</h1>
        </div>

        <Button
          onClick={() => {
            if (!selectedDoctor) {
              setError("Select a doctor first");
              return;
            }
            setShowModal(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Book
        </Button>
      </div>

      {/* ERROR */}
      {error && (
        <p className="text-red-400 mb-2 text-sm">{error}</p>
      )}

      {/* DOCTOR CARDS */}
      <h2 className="text-lg font-semibold mt-4 mb-2">Select Doctor</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((d) => (
          <Card
            key={d._id}
            onClick={() => handleSelectDoctor(d)}
            className={`cursor-pointer transition border hover:border-blue-500 ${
              selectedDoctor === d._id ? 'border-blue-500 bg-blue-950' : 'border-gray-700'
            }`}
          >
            <CardContent className="p-4">
              <h3 className="font-bold text-white">{d.name}</h3>
              <p className="text-sm text-white">{d.specialty}</p>
              <p className="text-xs text-white flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {d.hospital}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* APPOINTMENTS */}
      <h2 className="text-lg font-semibold mt-6 mb-2">My Appointments</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-3">
          {appointments.map((a) => (
            <Card key={a._id}>
              <CardContent className="p-4 flex flex-col sm:flex-row justify-between gap-2">
                <p><Calendar className="inline w-4 h-4" /> {new Date(a.date).toDateString()}</p>
                <p><Clock className="inline w-4 h-4" /> {a.time}</p>
                <p><MapPin className="inline w-4 h-4" /> {a.location}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* BOOKING MODAL */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="w-full max-w-md">

          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
          </DialogHeader>

          {/* SELECTED DOCTOR INFO */}
          {selectedDoctorData && (
            <div className="p-3 mb-3 rounded-lg bg-blue-950 border border-blue-500">
              <p className="font-bold text-white">{selectedDoctorData.name}</p>
              <p className="text-sm text-white">{selectedDoctorData.specialty}</p>
              <p className="text-xs text-white">{selectedDoctorData.hospital}</p>
            </div>
          )}

          <div className="space-y-4">

            {/* DATE */}
            <div >
              <Label>Date</Label>
              <Input className='text-black'
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            {/* TIME */}
            <div>
              <Label>Time</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>

            <Button onClick={handleBook}>
              Confirm
            </Button>
          </DialogFooter>

        </DialogContent>
      </Dialog>

    </div>
  );
}