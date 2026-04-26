import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Eye,
  ArrowLeft,
  User,
  Send,
  Bot,
  Sparkles,
  Clock,
  FileText,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";

interface Message {
  id: number;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

export default function Chatbot() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content:
        "Hello! I'm your EyeCareBD AI Assistant. I'm here to help you with questions about eye health, your screening results, and general guidance. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Mock AI responses based on keywords
  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes("color test") ||
      lowerMessage.includes("color blindness")
    ) {
      return `Color Vision Test (Ishihara Test):

This test checks your ability to distinguish different colors, mainly red and green.

• It helps detect color blindness
• Common in males due to genetic factors
• Uses dotted number plates hidden in colored patterns

Your result helps identify if you have any color vision deficiency.`;
    }

    if (lowerMessage.includes("amsler") || lowerMessage.includes("grid test")) {
      return `Amsler Grid Test:

This test is used to detect problems in your central vision.

• Helps identify macular degeneration
• Detects distortion, wavy lines, or missing areas
• You focus on a central dot while observing a grid

If lines appear distorted, it may indicate retinal issues.`;
    }

    if (
      lowerMessage.includes("visual acuity") ||
      lowerMessage.includes("eye test") ||
      lowerMessage.includes("snellen")
    ) {
      return `Visual Acuity Test:

This test measures how clearly you can see letters or numbers at a distance.

• Commonly uses Snellen chart (E, F, P, T letters)
• Determines clarity of vision (20/20 standard)
• Helps detect near or far-sightedness

Lower scores may indicate need for glasses or correction.`;
    }

    if (
      lowerMessage.includes("contrast") ||
      lowerMessage.includes("contrast sensitivity")
    ) {
      return `Contrast Sensitivity Test:

This test checks your ability to see objects that are not clearly defined.

• Detects low-contrast vision problems
• Important for night driving and dim light vision
• Shows fading letters or numbers

Reduced contrast sensitivity may indicate early eye disease.`;
    }

    if (lowerMessage.includes("astigmatism")) {
      return `Astigmatism Test:

This test checks irregular curvature of the eye (cornea).

• Uses radial lines or “clock-like” patterns
• Some lines may look darker or blurry
• Causes blurred or distorted vision

Astigmatism can usually be corrected with glasses or lenses.`;
    }

    if (
      lowerMessage.includes("diabetic retinopathy") ||
      lowerMessage.includes("diabetes")
    ) {
      return "Diabetic retinopathy is a diabetes complication that affects the eyes. It's caused by damage to blood vessels in the retina. Early detection is crucial. Based on your latest screening (March 10, 2026), no signs of diabetic retinopathy were detected. I recommend:\n\n• Continue monitoring blood sugar levels\n• Schedule regular eye screenings every 6 months\n• Maintain a healthy diet\n• Report any vision changes immediately\n\nWould you like to schedule a follow-up appointment?";
    }

    if (lowerMessage.includes("cataract")) {
      return "Cataracts are a clouding of the eye's natural lens. Common symptoms include:\n\n• Blurred or cloudy vision\n• Difficulty seeing at night\n• Sensitivity to light\n• Seeing halos around lights\n\nIf you're experiencing these symptoms, I recommend scheduling an examination with an ophthalmologist. Would you like me to help you book an appointment?";
    }

    if (
      lowerMessage.includes("dry eye") ||
      lowerMessage.includes("irritation")
    ) {
      return "Dry eye syndrome can cause discomfort and vision problems. Here are some tips:\n\n• Use artificial tears or lubricating eye drops\n• Take regular breaks from screens (20-20-20 rule)\n• Use a humidifier in dry environments\n• Stay hydrated\n• Avoid direct air from fans or AC\n\nIf symptoms persist, consider scheduling an appointment with an eye specialist.";
    }

    if (
      lowerMessage.includes("screen time") ||
      lowerMessage.includes("computer")
    ) {
      return "To reduce digital eye strain from screen time, follow these guidelines:\n\n• 20-20-20 Rule: Every 20 minutes, look at something 20 feet away for 20 seconds\n• Adjust screen brightness to match your surroundings\n• Position screen 20-26 inches from your eyes\n• Use artificial tears if needed\n• Enable blue light filters\n• Take regular breaks\n\nWould you like more personalized recommendations based on your screening results?";
    }

    if (
      lowerMessage.includes("appointment") ||
      lowerMessage.includes("book") ||
      lowerMessage.includes("schedule")
    ) {
      return "I can help you schedule an appointment! We have several specialists available:\n\n• Dr. Kamal Ahmed - Ophthalmologist (Available Today)\n• Dr. Ayesha Rahman - Retina Specialist (Available Tomorrow)\n• Dr. Hassan Ibrahim - Glaucoma Specialist (Available Tomorrow)\n\nWould you like me to direct you to the appointments page to book a consultation?";
    }

    if (
      lowerMessage.includes("result") ||
      lowerMessage.includes("score") ||
      lowerMessage.includes("report")
    ) {
      return "Your latest eye health screening from March 10, 2026 shows:\n\n• Overall Health Score: 87/100 ✓\n• Status: Healthy - No Issues Detected\n• Left Eye Score: 88/100\n• Right Eye Score: 86/100\n\nKey Findings:\n• No signs of diabetic retinopathy\n• Healthy optic nerve\n• Normal intraocular pressure\n\nYour next recommended checkup is in 6 months. Would you like to view your detailed report?";
    }

    if (lowerMessage.includes("glaucoma")) {
      return "Glaucoma is a group of eye conditions that damage the optic nerve, often due to high eye pressure. Key information:\n\n• Often has no early symptoms\n• Can lead to vision loss if untreated\n• Regular eye exams are crucial for early detection\n• More common in people over 60\n\nYour latest screening showed normal intraocular pressure. Continue regular checkups to monitor eye health.";
    }

    if (
      lowerMessage.includes("pain") ||
      lowerMessage.includes("hurt") ||
      lowerMessage.includes("emergency")
    ) {
      return "⚠️ If you're experiencing severe eye pain, sudden vision loss, or eye injury, please seek immediate medical attention or visit the nearest emergency room.\n\nFor non-emergency concerns, I can help you:\n• Schedule an urgent appointment\n• Provide general guidance\n• Connect you with a specialist\n\nIs this an emergency situation?";
    }

    if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hey")
    ) {
      return "Hello! I'm glad to assist you with your eye health questions. You can ask me about:\n\n• Your screening results\n• Eye conditions and symptoms\n• Appointment scheduling\n• Eye care tips and recommendations\n• Understanding your reports\n\nWhat would you like to know?";
    }

    if (lowerMessage.includes("thank")) {
      return "You're welcome! I'm here anytime you need help with your eye health. Remember:\n\n• Your next checkup is scheduled for August 28, 2026\n• Continue following your eye care routine\n• Report any vision changes promptly\n\nIs there anything else I can help you with?";
    }

    // Default response
    return "I understand you're asking about eye health. While I can provide general guidance, I recommend:\n\n• Consulting with a qualified ophthalmologist for specific medical advice\n• Reviewing your latest screening results in the Reports section\n• Scheduling an appointment if you have concerns\n\nCould you provide more details about your question, or would you like me to help you with:\n\n• Viewing your screening results\n• Booking an appointment\n• Understanding common eye conditions\n• Eye care tips and prevention";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI typing delay
    setTimeout(
      () => {
        const botResponse: Message = {
          id: messages.length + 2,
          type: "bot",
          content: getAIResponse(inputMessage),
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
      },
      1000 + Math.random() * 1000,
    );
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const quickQuestions = [
    "What are my latest screening results?",
    "How can I prevent eye strain from screens?",
    "What is diabetic retinopathy?",
    "How do I schedule an appointment?",
    "What are symptoms of cataracts?",
    "When is my next checkup?",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/dashboard")}
                className="text-gray-300 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center gap-2">
                <Eye className="h-6 w-6" style={{ color: "#0052CC" }} />
                <span className="font-semibold text-lg text-white">
                  EyeCareBD
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Welcome, Patient</span>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5" style={{ color: "#0052CC" }} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col max-w-7xl w-full mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-6 flex-shrink-0">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#0052CC" }}
            >
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                AI Health Assistant
              </h1>
              <p className="text-gray-400">
                Get instant answers to your eye health questions
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 flex-1 min-h-0">
          {/* Chat Area */}
          <div className="lg:col-span-2 flex flex-col min-h-0">
            <Card
              style={{ borderRadius: "8px" }}
              className="flex-1 flex flex-col border-white/10 min-h-0"
            >
              <CardHeader className="flex-shrink-0 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Sparkles
                      className="h-5 w-5"
                      style={{ color: "#0052CC" }}
                    />
                    Chat with AI Assistant
                  </CardTitle>
                  <Badge className="bg-green-500 text-white">
                    <div className="w-2 h-2 bg-white rounded-full mr-2" />
                    Online
                  </Badge>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      {message.type === "bot" ? (
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "#0052CC" }}
                        >
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-300" />
                        </div>
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`flex-1 max-w-2xl ${message.type === "user" ? "items-end" : "items-start"} flex flex-col`}
                    >
                      <div
                        className={`px-4 py-3 rounded-lg ${
                          message.type === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 text-gray-100"
                        }`}
                        style={
                          message.type === "user"
                            ? {
                                backgroundColor: "#0052CC",
                                borderRadius: "8px",
                              }
                            : { borderRadius: "8px" }
                        }
                      >
                        <p className="text-sm whitespace-pre-line leading-relaxed">
                          {message.content}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-1 px-1">
                        <Clock className="h-3 w-3 text-gray-500" />
                        <span className="text-xs text-gray-500">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#0052CC" }}
                    >
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div
                      className="bg-gray-700 px-4 py-3 rounded-lg"
                      style={{ borderRadius: "8px" }}
                    >
                      <div className="flex gap-1">
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input Area */}
              <div className="flex-shrink-0 border-t border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <div className="flex gap-3">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type your question about eye health..."
                    className="flex-1 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    style={{ backgroundColor: "#0052CC" }}
                    className="text-white hover:opacity-90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Questions */}
            <Card style={{ borderRadius: "8px" }} className="border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-base">
                  Quick Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md transition-colors"
                    style={{ borderRadius: "8px" }}
                  >
                    {question}
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* AI Capabilities */}
            <Card style={{ borderRadius: "8px" }} className="border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-base">
                  I Can Help With
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <FileText
                    className="h-5 w-5 flex-shrink-0 mt-0.5"
                    style={{ color: "#0052CC" }}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-200">
                      Screening Results
                    </p>
                    <p className="text-xs text-gray-400">
                      Understand your eye health reports
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle
                    className="h-5 w-5 flex-shrink-0 mt-0.5"
                    style={{ color: "#0052CC" }}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-200">
                      Symptoms & Conditions
                    </p>
                    <p className="text-xs text-gray-400">
                      Learn about eye health issues
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar
                    className="h-5 w-5 flex-shrink-0 mt-0.5"
                    style={{ color: "#0052CC" }}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-200">
                      Appointments
                    </p>
                    <p className="text-xs text-gray-400">
                      Schedule and manage visits
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles
                    className="h-5 w-5 flex-shrink-0 mt-0.5"
                    style={{ color: "#0052CC" }}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-200">
                      Prevention Tips
                    </p>
                    <p className="text-xs text-gray-400">
                      Daily eye care guidance
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <Card
              style={{ borderRadius: "8px" }}
              className="bg-yellow-900 border-yellow-700"
            >
              <CardContent className="p-4">
                <div className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-200 mb-1">
                      Medical Disclaimer
                    </p>
                    <p className="text-xs text-yellow-300 leading-relaxed">
                      This AI assistant provides general information only. For
                      medical diagnosis and treatment, always consult with a
                      qualified healthcare professional.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card style={{ borderRadius: "8px" }} className="border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-base">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600"
                  onClick={() => navigate("/screening")}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Start New Scan
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600"
                  onClick={() => navigate("/appointments")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Appointment
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600"
                  onClick={() => navigate("/reports")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
