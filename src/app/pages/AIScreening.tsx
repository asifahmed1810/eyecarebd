import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Eye, ArrowLeft, CheckCircle, AlertCircle, Info, ShieldCheck, Activity, Zap, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';

type ScanStage = 'preparation' | 'positioning' | 'capturing' | 'analyzing' | 'complete';

export default function AIScreening() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<ScanStage>('preparation');
  const [progress, setProgress] = useState(0);
  const [feedback, setFeedback] = useState('Ready to begin your eye health screening');
  const [eyeToTest, setEyeToTest] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    if (stage === 'preparation') {
      setFeedback('Ready to begin your eye health screening');
      setProgress(0);
    } else if (stage === 'positioning') {
      setFeedback('Follow the on-screen instructions carefully...');
      setProgress(25);
      
      const timer = setTimeout(() => {
        setStage('capturing');
      }, 3000);
      return () => clearTimeout(timer);
    } else if (stage === 'capturing') {
      setFeedback('Analyzing eye patterns and detecting anomalies...');
      setProgress(50);
      
      const timer = setTimeout(() => {
        setStage('analyzing');
      }, 2500);
      return () => clearTimeout(timer);
    } else if (stage === 'analyzing') {
      setFeedback('AI is performing comprehensive eye health assessment...');
      setProgress(75);
      
      const timer = setTimeout(() => {
        setStage('complete');
        setProgress(100);
      }, 3500);
      return () => clearTimeout(timer);
    } else if (stage === 'complete') {
      setFeedback('Screening complete! Generating your detailed report...');
      
      const timer = setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [stage, navigate]);

  const startScan = () => {
    setEyeToTest('left');
    setStage('positioning');
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
            <Badge className="bg-blue-600 text-white">
              <Activity className="h-3 w-3 mr-1" />
              AI Screening
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">AI-Powered Eye Health Screening</h1>
              <p className="text-gray-400 text-sm">Advanced technology for early detection and prevention</p>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-400">Progress</span>
              <p className="text-3xl font-bold" style={{ color: '#0052CC' }}>{progress}%</p>
            </div>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Screening Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image Card */}
            <Card className="overflow-hidden" style={{ borderRadius: '8px' }}>
              <div className="relative h-96">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1663151064065-cb334788f77d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleWUlMjBleGFtaW5hdGlvbiUyMGRvY3RvciUyMG9waHRoYWxtb2xvZ2lzdHxlbnwxfHx8fDE3NzMyOTI4ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Eye Examination"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Status Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-3 h-3 rounded-full ${
                      stage === 'complete' ? 'bg-green-500' : 
                      stage === 'analyzing' || stage === 'capturing' ? 'bg-yellow-500' : 
                      stage === 'positioning' ? 'bg-blue-500' :
                      'bg-gray-500'
                    } ${stage !== 'complete' && stage !== 'preparation' ? 'animate-pulse' : ''}`} />
                    <p className="text-white font-semibold text-lg">{feedback}</p>
                  </div>

                  {eyeToTest && stage !== 'complete' && (
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                      Testing: {eyeToTest === 'left' ? 'Left Eye' : 'Right Eye'}
                    </Badge>
                  )}
                </div>

                {/* Stage Indicator */}
                {(stage === 'positioning' || stage === 'capturing' || stage === 'analyzing') && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <div className="rounded-lg border border-white/10 bg-white/8 p-8 text-center backdrop-blur-xl">
                      {stage === 'analyzing' ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            className="mx-auto mb-4"
                          >
                            <Activity className="h-16 w-16" style={{ color: '#0052CC' }} />
                          </motion.div>
                          <p className="text-white text-xl font-semibold mb-2">Analyzing...</p>
                          <p className="text-gray-400">AI is examining your eye health</p>
                        </>
                      ) : (
                        <>
                          <Eye className="h-16 w-16 mx-auto mb-4" style={{ color: '#0052CC' }} />
                          <p className="text-white text-xl font-semibold mb-2">
                            {stage === 'positioning' ? 'Get Ready' : 'Capturing Data'}
                          </p>
                          <p className="text-gray-400">
                            {stage === 'positioning' 
                              ? 'Position yourself comfortably' 
                              : 'Recording eye characteristics'}
                          </p>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Complete Indicator */}
                {stage === 'complete' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <div className="bg-green-900/90 backdrop-blur-lg rounded-lg p-8 text-center border-2 border-green-500">
                      <CheckCircle className="h-20 w-20 mx-auto mb-4 text-green-400" />
                      <p className="text-white text-2xl font-bold mb-2">Screening Complete!</p>
                      <p className="text-green-200">Preparing your comprehensive report...</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </Card>

            {/* Control Panel */}
            <Card style={{ borderRadius: '8px' }} className="border-white/10">
              <CardContent className="p-6">
                {stage === 'preparation' && (
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-white mb-3">Ready to Begin?</h3>
                    <p className="text-gray-400 mb-6">
                      This AI-powered screening will analyze your eye health using advanced computer vision technology.
                      The process takes approximately 30 seconds.
                    </p>
                    <Button 
                      size="lg"
                      onClick={startScan}
                      style={{ backgroundColor: '#0052CC' }}
                      className="text-white hover:opacity-90 text-lg px-12"
                    >
                      <Zap className="mr-2 h-5 w-5" />
                      Start Eye Health Screening
                    </Button>
                  </div>
                )}

                {stage === 'positioning' && (
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-white mb-3">Initializing Scan</h3>
                    <p className="text-gray-400 mb-4">
                      Please sit in a well-lit area and look directly at your screen. 
                      Keep your eyes open naturally.
                    </p>
                    <div className="flex justify-center gap-3">
                      <Button 
                        variant="outline"
                        onClick={() => setStage('preparation')}
                        className="bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {(stage === 'capturing' || stage === 'analyzing') && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Retina Analysis</span>
                      <span className="text-green-400 font-medium">✓ Complete</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Vascular Pattern Detection</span>
                      <span className={stage === 'analyzing' ? "text-yellow-400 font-medium" : "text-gray-500"}>
                        {stage === 'analyzing' ? '● Processing' : '○ Pending'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Disease Markers Scan</span>
                      <span className="text-gray-500">○ Pending</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Final Report Generation</span>
                      <span className="text-gray-500">○ Pending</span>
                    </div>
                  </div>
                )}

                {stage === 'complete' && (
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-400" />
                    <h3 className="text-xl font-semibold text-white mb-2">Analysis Complete</h3>
                    <p className="text-gray-400">Redirecting to your results dashboard...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Screening Steps */}
            <Card style={{ borderRadius: '8px' }} className="border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Screening Process</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    progress >= 25 ? 'bg-green-600' : 'bg-gray-700'
                  }`}>
                    <span className="text-white text-sm font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-white mb-1">Preparation</h4>
                    <p className="text-xs text-gray-400">Ensure good lighting and comfortable position</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    progress >= 50 ? 'bg-green-600' : 'bg-gray-700'
                  }`}>
                    <span className="text-white text-sm font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-white mb-1">Data Capture</h4>
                    <p className="text-xs text-gray-400">AI captures detailed eye characteristics</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    progress >= 75 ? 'bg-green-600' : 'bg-gray-700'
                  }`}>
                    <span className="text-white text-sm font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-white mb-1">AI Analysis</h4>
                    <p className="text-xs text-gray-400">Deep learning models assess eye health</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    progress === 100 ? 'bg-green-600' : 'bg-gray-700'
                  }`}>
                    <span className="text-white text-sm font-semibold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-white mb-1">Results</h4>
                    <p className="text-xs text-gray-400">Comprehensive report with recommendations</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What We Detect */}
            <Card style={{ borderRadius: '8px' }} className="border-white/10">
              <CardHeader>
                <CardTitle className="text-white">What We Detect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Eye className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#0052CC' }} />
                  <div>
                    <p className="text-sm font-medium text-gray-200">Diabetic Retinopathy</p>
                    <p className="text-xs text-gray-400">Early signs of diabetes-related eye damage</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Eye className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#0052CC' }} />
                  <div>
                    <p className="text-sm font-medium text-gray-200">Glaucoma Markers</p>
                    <p className="text-xs text-gray-400">Optic nerve damage and pressure signs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Eye className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#0052CC' }} />
                  <div>
                    <p className="text-sm font-medium text-gray-200">Cataracts</p>
                    <p className="text-xs text-gray-400">Lens clouding and opacity detection</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Eye className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#0052CC' }} />
                  <div>
                    <p className="text-sm font-medium text-gray-200">Macular Degeneration</p>
                    <p className="text-xs text-gray-400">Age-related retinal deterioration</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Accuracy Badge */}
            <Card style={{ borderRadius: '8px' }} className="bg-gradient-to-br from-blue-900 to-blue-800 border-blue-700">
              <CardContent className="p-6 text-center">
                <ShieldCheck className="h-12 w-12 mx-auto mb-3 text-blue-300" />
                <p className="text-2xl font-bold text-white mb-1">98.5%</p>
                <p className="text-sm text-blue-200 mb-3">AI Accuracy Rate</p>
                <p className="text-xs text-blue-300">
                  Validated against 50,000+ ophthalmologist diagnoses
                </p>
              </CardContent>
            </Card>

            {/* Privacy Info */}
            <Card style={{ borderRadius: '8px' }} className="bg-yellow-900 border-yellow-700">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Info className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-200 mb-1">Privacy & Security</p>
                    <p className="text-xs text-yellow-300 leading-relaxed">
                      All scans are encrypted end-to-end. Your data is HIPAA compliant and never shared without consent.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Time Estimate */}
            <Card style={{ borderRadius: '8px' }} className="border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8" style={{ color: '#0052CC' }} />
                  <div>
                    <p className="text-sm font-medium text-white">Estimated Time</p>
                    <p className="text-2xl font-bold" style={{ color: '#0052CC' }}>30 sec</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
