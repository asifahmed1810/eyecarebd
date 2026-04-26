import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, ArrowLeft, AlertTriangle, CheckCircle, Clock, Filter, Search, TrendingUp, TrendingDown, User, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

export default function DoctorPanel() {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
  const [filterRisk, setFilterRisk] = useState<string>('all');

  // Mock patient data
  const patients = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      age: 58,
      gender: 'M',
      lastScan: '2026-02-28',
      riskLevel: 'high',
      aiScore: 34,
      condition: 'Suspected Diabetic Retinopathy',
      trend: 'worsening',
      validationStatus: 'pending',
    },
    {
      id: 2,
      name: 'Fatima Begum',
      age: 62,
      gender: 'F',
      lastScan: '2026-02-27',
      riskLevel: 'high',
      aiScore: 42,
      condition: 'Glaucoma Risk Detected',
      trend: 'stable',
      validationStatus: 'pending',
    },
    {
      id: 3,
      name: 'Mohammed Hassan',
      age: 45,
      gender: 'M',
      lastScan: '2026-02-26',
      riskLevel: 'medium',
      aiScore: 61,
      condition: 'Cataracts Early Stage',
      trend: 'improving',
      validationStatus: 'pending',
    },
    {
      id: 4,
      name: 'Ayesha Rahman',
      age: 34,
      gender: 'F',
      lastScan: '2026-02-25',
      riskLevel: 'low',
      aiScore: 82,
      condition: 'Healthy - Routine Checkup',
      trend: 'stable',
      validationStatus: 'validated',
    },
    {
      id: 5,
      name: 'Kamal Hossain',
      age: 71,
      gender: 'M',
      lastScan: '2026-02-24',
      riskLevel: 'high',
      aiScore: 28,
      condition: 'Advanced Macular Degeneration',
      trend: 'worsening',
      validationStatus: 'pending',
    },
  ];

  const filteredPatients = filterRisk === 'all' 
    ? patients 
    : patients.filter(p => p.riskLevel === filterRisk);

  const stats = {
    totalPatients: patients.length,
    highRisk: patients.filter(p => p.riskLevel === 'high').length,
    pendingValidation: patients.filter(p => p.validationStatus === 'pending').length,
    todayScans: 12,
  };

  const handleValidate = (patientId: number) => {
    alert(`Validation confirmed for Patient ID: ${patientId}`);
    // In a real app, this would update the backend
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'worsening':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <div className="h-4 w-4 border-2 border-gray-400 rounded-full" />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-full px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <Eye className="h-6 w-6" style={{ color: '#0052CC' }} />
                <span className="font-semibold text-lg text-white">EyeCareBD</span>
                <Badge variant="outline" className="ml-2 text-gray-400 border-gray-600">Doctor Portal</Badge>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">Dr. Kamal Ahmed</p>
                <p className="text-xs text-gray-400">Ophthalmologist</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5" style={{ color: '#0052CC' }} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-full px-6 py-8">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card style={{ borderRadius: '8px' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Patients</p>
                  <p className="text-3xl font-bold mt-1">{stats.totalPatients}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="h-6 w-6" style={{ color: '#0052CC' }} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card style={{ borderRadius: '8px' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">High Risk Cases</p>
                  <p className="text-3xl font-bold mt-1 text-red-600">{stats.highRisk}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card style={{ borderRadius: '8px' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Validation</p>
                  <p className="text-3xl font-bold mt-1 text-yellow-600">{stats.pendingValidation}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card style={{ borderRadius: '8px' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Today's Scans</p>
                  <p className="text-3xl font-bold mt-1" style={{ color: '#0052CC' }}>{stats.todayScans}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="patients" className="space-y-6">
          <TabsList>
            <TabsTrigger value="patients">Patient Queue</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="validated">Validated Cases</TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="space-y-6">
            {/* Filters and Search */}
            <Card style={{ borderRadius: '8px' }}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search patients by name or condition..."
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterRisk} onValueChange={setFilterRisk}>
                    <SelectTrigger className="w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by risk" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Risk Levels</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                      <SelectItem value="medium">Medium Risk</SelectItem>
                      <SelectItem value="low">Low Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Patient List */}
            <Card style={{ borderRadius: '8px' }}>
              <CardHeader>
                <CardTitle>High-Risk Patients Requiring Validation</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Age/Gender</TableHead>
                      <TableHead>Last Scan</TableHead>
                      <TableHead>AI Score</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Trend</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.map((patient) => (
                      <TableRow key={patient.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5" style={{ color: '#0052CC' }} />
                            </div>
                            <span className="font-medium">{patient.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{patient.age} / {patient.gender}</TableCell>
                        <TableCell className="text-sm text-gray-600">{patient.lastScan}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className={`font-semibold ${
                              patient.aiScore < 50 ? 'text-red-600' : 
                              patient.aiScore < 70 ? 'text-yellow-600' : 
                              'text-green-600'
                            }`}>
                              {patient.aiScore}
                            </span>
                            <span className="text-xs text-gray-500">/100</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRiskBadgeColor(patient.riskLevel)}>
                            {patient.riskLevel.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{patient.condition}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {getTrendIcon(patient.trend)}
                            <span className="text-xs capitalize">{patient.trend}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedPatient(patient.id)}
                            >
                              View Details
                            </Button>
                            {patient.validationStatus === 'pending' && (
                              <Button 
                                size="sm"
                                onClick={() => handleValidate(patient.id)}
                                style={{ backgroundColor: '#0052CC' }}
                                className="text-white hover:opacity-90"
                              >
                                Validate
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card style={{ borderRadius: '8px' }}>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Analytics and trends will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="validated">
            <Card style={{ borderRadius: '8px' }}>
              <CardHeader>
                <CardTitle>Validated Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Previously validated cases will be listed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Patient Detail Modal */}
      <Dialog open={selectedPatient !== null} onOpenChange={() => setSelectedPatient(null)}>
        <DialogContent className="max-w-4xl" style={{ borderRadius: '8px' }}>
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Patient Diagnostic Details</span>
              {selectedPatient && (
                <Badge className={getRiskBadgeColor(
                  patients.find(p => p.id === selectedPatient)?.riskLevel || 'low'
                )}>
                  {patients.find(p => p.id === selectedPatient)?.riskLevel.toUpperCase()}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>

          {selectedPatient && (
            <div className="space-y-6">
              {/* Patient Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Patient Name</p>
                  <p className="font-semibold">{patients.find(p => p.id === selectedPatient)?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">AI Health Score</p>
                  <p className="font-semibold text-2xl" style={{ color: '#0052CC' }}>
                    {patients.find(p => p.id === selectedPatient)?.aiScore}/100
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Detected Condition</p>
                  <p className="font-semibold">{patients.find(p => p.id === selectedPatient)?.condition}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Scan Date</p>
                  <p className="font-semibold">{patients.find(p => p.id === selectedPatient)?.lastScan}</p>
                </div>
              </div>

              {/* AI Diagnostic Heatmap */}
              <div>
                <h4 className="font-semibold mb-4">AI Diagnostic Heatmap</h4>
                <div className="grid grid-cols-2 gap-6">
                  {/* Left Eye */}
                  <div>
                    <p className="text-sm text-gray-600 mb-2 text-center">Left Eye</p>
                    <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden border-2" style={{ borderColor: '#0052CC' }}>
                      {/* Simulated Eye Scan */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-48 h-48">
                          {/* Iris */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
                          
                          {/* Pupil */}
                          <div className="absolute inset-12 rounded-full bg-black" />
                          
                          {/* Heat overlay - problem area */}
                          <div 
                            className="absolute top-8 right-8 w-16 h-16 rounded-full opacity-70"
                            style={{ 
                              background: 'radial-gradient(circle, rgba(239, 68, 68, 0.8) 0%, rgba(239, 68, 68, 0) 70%)',
                            }}
                          />
                          
                          {/* Annotations */}
                          <div className="absolute top-4 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded">
                            Risk Area
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Eye */}
                  <div>
                    <p className="text-sm text-gray-600 mb-2 text-center">Right Eye</p>
                    <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden border-2 border-gray-300">
                      {/* Simulated Eye Scan */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-48 h-48">
                          {/* Iris */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
                          
                          {/* Pupil */}
                          <div className="absolute inset-12 rounded-full bg-black" />
                          
                          {/* No significant issues - green indicator */}
                          <div className="absolute top-4 left-0 bg-green-500 text-white text-xs px-2 py-1 rounded">
                            Normal
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Findings */}
              <div>
                <h4 className="font-semibold mb-3">AI Analysis Findings</h4>
                <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Microaneurysms detected in left eye superior temporal region</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Early signs of vascular changes consistent with diabetic retinopathy</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Right eye appears normal with no significant findings</span>
                  </div>
                </div>
              </div>

              {/* Validation Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <Button 
                  className="flex-1"
                  style={{ backgroundColor: '#0052CC' }}
                  onClick={() => {
                    handleValidate(selectedPatient);
                    setSelectedPatient(null);
                  }}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Validate & Approve Diagnosis
                </Button>
                <Button variant="outline" className="flex-1">
                  Request Additional Scans
                </Button>
                <Button variant="outline" onClick={() => setSelectedPatient(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}