import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, ArrowLeft, User, Download, FileText, Calendar, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Search, Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Progress } from '../components/ui/progress';

export default function Reports() {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const [filterType, setFilterType] = useState('all');

  // Mock reports data
  const reports = [
    {
      id: 1,
      date: '2026-03-10',
      type: 'AI Screening',
      score: 87,
      status: 'healthy',
      condition: 'Healthy - No Issues Detected',
      doctor: 'Validated by Dr. Kamal Ahmed',
      trend: 'stable',
      leftEye: { score: 88, issues: [] },
      rightEye: { score: 86, issues: [] },
    },
    {
      id: 2,
      date: '2026-02-28',
      type: 'AI Screening',
      score: 65,
      status: 'moderate',
      condition: 'Early Cataracts Detected',
      doctor: 'Validated by Dr. Ayesha Rahman',
      trend: 'stable',
      leftEye: { score: 68, issues: ['Early cataract formation'] },
      rightEye: { score: 62, issues: ['Lens opacity detected'] },
    },
    {
      id: 3,
      date: '2026-02-15',
      type: 'Full Examination',
      score: 72,
      status: 'moderate',
      condition: 'Mild Dry Eye Syndrome',
      doctor: 'Dr. Hassan Ibrahim',
      trend: 'improving',
      leftEye: { score: 70, issues: ['Reduced tear production'] },
      rightEye: { score: 74, issues: ['Mild inflammation'] },
    },
    {
      id: 4,
      date: '2026-01-20',
      type: 'AI Screening',
      score: 42,
      status: 'critical',
      condition: 'Diabetic Retinopathy Detected',
      doctor: 'Validated by Dr. Kamal Ahmed',
      trend: 'worsening',
      leftEye: { score: 38, issues: ['Microaneurysms detected', 'Vascular abnormalities'] },
      rightEye: { score: 46, issues: ['Early retinal changes'] },
    },
    {
      id: 5,
      date: '2026-01-05',
      type: 'Follow-up Screening',
      score: 78,
      status: 'healthy',
      condition: 'Post-Treatment Recovery',
      doctor: 'Dr. Fatima Khan',
      trend: 'improving',
      leftEye: { score: 80, issues: [] },
      rightEye: { score: 76, issues: [] },
    },
  ];

  const filteredReports = filterType === 'all' 
    ? reports 
    : reports.filter(r => r.type.toLowerCase().includes(filterType.toLowerCase()));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge className="bg-green-500 text-white">Healthy</Badge>;
      case 'moderate':
        return <Badge className="bg-yellow-500 text-white">Moderate Risk</Badge>;
      case 'critical':
        return <Badge className="bg-red-500 text-white">Critical</Badge>;
      default:
        return <Badge className="bg-gray-500 text-white">{status}</Badge>;
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

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleDownloadReport = (reportId: number) => {
    alert(`Downloading report #${reportId}...`);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="text-gray-300 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center gap-2">
                <Eye className="h-6 w-6" style={{ color: '#0052CC' }} />
                <span className="font-semibold text-lg text-white">EyeCareBD</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Welcome, Patient</span>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5" style={{ color: '#0052CC' }} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Medical Reports</h1>
            <p className="text-gray-400">View and download your eye health reports</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card style={{ borderRadius: '8px' }} className="border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Reports</p>
                  <p className="text-3xl font-bold text-white mt-1">{reports.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6" style={{ color: '#0052CC' }} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card style={{ borderRadius: '8px' }} className="border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Latest Score</p>
                  <p className="text-3xl font-bold text-white mt-1">{reports[0].score}</p>
                </div>
                <div className="w-12 h-12 bg-green-900 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card style={{ borderRadius: '8px' }} className="border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Average Score</p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {Math.round(reports.reduce((sum, r) => sum + r.score, 0) / reports.length)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-900 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card style={{ borderRadius: '8px' }} className="border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Critical Issues</p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {reports.filter(r => r.status === 'critical').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-900 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card style={{ borderRadius: '8px' }} className="mb-6 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Search reports by condition or date..."
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48 bg-gray-700 border-gray-600 text-white">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="ai screening">AI Screening</SelectItem>
                  <SelectItem value="full examination">Full Examination</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        <Card style={{ borderRadius: '8px' }} className="border-white/10">
          <CardHeader>
            <CardTitle className="text-white">All Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <div 
                  key={report.id} 
                  className="cursor-pointer rounded-lg border border-white/10 p-6 transition-colors hover:bg-white/5"
                  style={{ borderRadius: '8px' }}
                  onClick={() => setSelectedReport(report.id)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="h-6 w-6" style={{ color: '#0052CC' }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg text-white">{report.condition}</h3>
                          {getStatusBadge(report.status)}
                        </div>
                        <p className="text-gray-400 text-sm">{report.doctor}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(report.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            <span>{report.type}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-400 mb-1">Health Score</p>
                        <p className={`text-3xl font-bold ${getScoreColor(report.score)}`}>
                          {report.score}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(report.trend)}
                        <span className="text-xs text-gray-400 capitalize">{report.trend}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4 border-t border-white/10 pt-4">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedReport(report.id);
                      }}
                      className="bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600"
                    >
                      View Full Report
                    </Button>
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadReport(report.id);
                      }}
                      className="bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600"
                    >
                      <Download className="mr-2 h-3 w-3" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Detail Modal */}
      <Dialog open={selectedReport !== null} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-5xl border-white/10 bg-white/8 backdrop-blur-xl" style={{ borderRadius: '8px' }}>
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between text-white">
              <span>Detailed Report</span>
              {selectedReport && getStatusBadge(
                reports.find(r => r.id === selectedReport)?.status || 'healthy'
              )}
            </DialogTitle>
          </DialogHeader>

          {selectedReport && (() => {
            const report = reports.find(r => r.id === selectedReport);
            if (!report) return null;

            return (
              <div className="space-y-6">
                {/* Report Header */}
                <div className="grid grid-cols-3 gap-6 border-b border-white/10 pb-6">
                  <div>
                    <p className="text-sm text-gray-400">Report Date</p>
                    <p className="font-semibold text-white">{new Date(report.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Report Type</p>
                    <p className="font-semibold text-white">{report.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Validated By</p>
                    <p className="font-semibold text-white">{report.doctor}</p>
                  </div>
                </div>

                {/* Overall Score */}
                <div>
                  <div className="flex justify-between mb-2">
                    <h4 className="font-semibold text-white">Overall Eye Health Score</h4>
                    <span className={`text-2xl font-bold ${getScoreColor(report.score)}`}>
                      {report.score}/100
                    </span>
                  </div>
                  <Progress value={report.score} className="h-3" />
                  <p className="text-sm text-gray-400 mt-2">{report.condition}</p>
                </div>

                {/* Eye Comparison */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Left Eye */}
                  <Card style={{ borderRadius: '8px' }} className="bg-gray-700 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-white">Left Eye</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-300">Health Score</span>
                          <span className={`font-bold ${getScoreColor(report.leftEye.score)}`}>
                            {report.leftEye.score}/100
                          </span>
                        </div>
                        <Progress value={report.leftEye.score} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-300">Findings:</p>
                        {report.leftEye.issues.length > 0 ? (
                          report.leftEye.issues.map((issue, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-300">{issue}</span>
                            </div>
                          ))
                        ) : (
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-300">No issues detected</span>
                          </div>
                        )}
                      </div>

                      {/* Eye visualization */}
                      <div className="mt-4 aspect-square bg-gray-600 rounded-lg flex items-center justify-center">
                        <div className="relative w-32 h-32">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
                          <div className="absolute inset-8 rounded-full bg-black" />
                          {report.leftEye.issues.length > 0 && (
                            <div 
                              className="absolute top-4 right-4 w-8 h-8 rounded-full opacity-70"
                              style={{ 
                                background: 'radial-gradient(circle, rgba(239, 68, 68, 0.8) 0%, rgba(239, 68, 68, 0) 70%)',
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Right Eye */}
                  <Card style={{ borderRadius: '8px' }} className="bg-gray-700 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-white">Right Eye</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-300">Health Score</span>
                          <span className={`font-bold ${getScoreColor(report.rightEye.score)}`}>
                            {report.rightEye.score}/100
                          </span>
                        </div>
                        <Progress value={report.rightEye.score} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-300">Findings:</p>
                        {report.rightEye.issues.length > 0 ? (
                          report.rightEye.issues.map((issue, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-300">{issue}</span>
                            </div>
                          ))
                        ) : (
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-300">No issues detected</span>
                          </div>
                        )}
                      </div>

                      {/* Eye visualization */}
                      <div className="mt-4 aspect-square bg-gray-600 rounded-lg flex items-center justify-center">
                        <div className="relative w-32 h-32">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
                          <div className="absolute inset-8 rounded-full bg-black" />
                          {report.rightEye.issues.length > 0 && (
                            <div 
                              className="absolute top-4 left-4 w-8 h-8 rounded-full opacity-70"
                              style={{ 
                                background: 'radial-gradient(circle, rgba(239, 68, 68, 0.8) 0%, rgba(239, 68, 68, 0) 70%)',
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recommendations */}
                <Card style={{ borderRadius: '8px' }} className="bg-gray-700 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-white">Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {report.status === 'critical' && (
                        <>
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-300">Schedule immediate consultation with ophthalmologist</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-300">Avoid strain on eyes, reduce screen time</span>
                          </div>
                        </>
                      )}
                      {report.status === 'moderate' && (
                        <>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-300">Schedule follow-up screening in 3 months</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-300">Use prescribed eye drops regularly</span>
                          </div>
                        </>
                      )}
                      {report.status === 'healthy' && (
                        <>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-300">Continue regular eye health monitoring</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-300">Next routine checkup in 6 months</span>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex gap-3 border-t border-white/10 pt-4">
                  <Button 
                    className="flex-1"
                    onClick={() => handleDownloadReport(report.id)}
                    style={{ backgroundColor: '#0052CC' }}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Full Report (PDF)
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600"
                    onClick={() => navigate('/appointments')}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Follow-up Appointment
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedReport(null)}
                    className="bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600"
                  >
                    Close
                  </Button>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
