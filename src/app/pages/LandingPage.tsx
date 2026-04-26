import { useNavigate } from "react-router";
import {
  Eye,
  Camera,
  Brain,
  MessageSquare,
  CheckCircle,
  Star,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden text-white">

      {/* Glow Background */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-blue-600 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-purple-600 opacity-20 blur-3xl rounded-full"></div>

      {/* NAV */}
      <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Eye className="h-8 w-8 text-blue-500" />
              <span className="font-semibold text-xl">EyeCareBD</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-gray-300 hover:text-white">
                How it Works
              </a>
              <a href="#testimonials" className="text-gray-300 hover:text-white">
                Testimonials
              </a>

             

              <Button
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h1 className="text-5xl font-bold mb-6 text-blue-500">
            Eye Screening & Vision Assessment
            </h1>

            <p className="text-xl text-gray-300 mb-8">
              Perform clinically inspired eye tests online to help identify
              potential vision issues early and take informed steps toward eye care.
            </p>

            <div className="flex gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6"
              >
                <Camera className="mr-2 h-5 w-5" />
                Start Free Eye Test
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-6 flex-wrap">
              {["Free & Secure", "Clinically Inspired", "For Screening Use"].map(
                (item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* HERO CARD */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-5">
              <div className="h-80 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl flex items-center justify-center">
                <Eye className="h-20 w-20 text-blue-400 opacity-40" />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="font-bold text-lg text-blue-400">10K+</p>
                  <p className="text-xs text-gray-400">Screenings</p>
                </div>
                <div>
                  <p className="font-bold text-lg text-blue-400">Fast</p>
                  <p className="text-xs text-gray-400">Assessment</p>
                </div>
                <div>
                  <p className="font-bold text-lg text-blue-400">Online</p>
                  <p className="text-xs text-gray-400">Access</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-500 mb-4">
              How It Works
            </h2>
            <p className="text-white text-lg">
              A structured digital eye screening process for early detection support
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              {
                icon: Camera,
                title: "Visual Screening",
                desc:
                  "Perform structured eye tests designed to evaluate visual performance and detect possible irregularities.",
              },
              {
                icon: Brain,
                title: "Result Analysis",
                desc:
                  "Your responses are evaluated to identify potential vision concerns and highlight abnormal patterns.",
              },
              {
                icon: MessageSquare,
                title: "Professional Advice",
                desc:
                  "Get guidance based on your results and consult an eye care professional if further evaluation is needed.",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="bg-white/5 backdrop-blur-lg border border-white/10 hover:scale-[1.03] transition-all rounded-2xl"
              >
                <CardContent className="p-8">
                  <item.icon className="h-10 w-10 text-blue-400 mb-4" />
                  <h3 className="text-xl text-white font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white
                  leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}

          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">

          <h2 className="text-4xl font-bold text-blue-500 mb-12">
            User Feedback
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {[1, 2, 3].map((_, i) => (
              <Card
                key={i}
                className="bg-white/5 backdrop-blur-lg border border-white/10"
              >
                <CardContent className="p-6">

                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-gray-300 mb-4">
                    Helpful for a quick vision check at home. Easy to use and informative.
                  </p>

                  <p className="text-sm text-gray-400">User #{i + 1}</p>

                </CardContent>
              </Card>
            ))}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center relative z-10">
        <h2 className="text-4xl font-bold text-blue-500 mb-4">
          Start Your Vision Screening
        </h2>

        <p className="text-gray-400 mb-8">
          Take a quick eye test and gain awareness about your visual health
        </p>

        <Button
          size="lg"
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 text-lg"
        >
          Start Free Test
        </Button>
      </section>

      {/* DISCLAIMER */}
      <section className="py-10 text-center text-sm text-gray-500 px-4">
        <p className="max-w-2xl mx-auto">
          ⚠️ This platform provides preliminary eye screening tools only and does not replace
          professional medical diagnosis or treatment. Please consult a qualified eye care
          specialist for accurate evaluation.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-gray-500">
        © 2026 EyeCareBD. All rights reserved.
      </footer>

    </div>
  );
}