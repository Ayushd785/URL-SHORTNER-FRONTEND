import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Link,
  Copy,
  BarChart3,
  Shield,
  Zap,
  Globe,
  QrCode,
  Users,
  Lightbulb,
  Target,
  Heart,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Coffee,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Custom hook for animated counters
const useAnimatedCounter = (end: number, duration: number = 2000, startAnimation: boolean = false) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!startAnimation) return;

    const animateCount = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4); // Smooth easing
      const currentCount = Math.floor(easeOutQuart * end);

      countRef.current = currentCount;
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(end); // Ensure we end exactly at the target
      }
    };

    // Reset for new animation
    setCount(0);
    countRef.current = 0;
    startTimeRef.current = null;

    requestAnimationFrame(animateCount);
  }, [end, duration, startAnimation]);

  return count;
};

export default function Index() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [outputType, setOutputType] = useState<"url" | "qr">("url");
  const [qrCode, setQrCode] = useState("");
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    about: false,
    developer: false,
    stats: false
  });

  // Animated counters for stats section
  const activeUsers = useAnimatedCounter(10, 2000, isVisible.stats);
  const linksCreated = useAnimatedCounter(500, 2500, isVisible.stats);
  const uptime = useAnimatedCounter(99.9, 2000, isVisible.stats);
  const countries = useAnimatedCounter(150, 1800, isVisible.stats);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll reveal animation observer
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Section visibility observer
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target.id;
            setIsVisible(prev => ({ ...prev, [section]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe scroll reveal elements
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach(el => scrollObserver.observe(el));

    // Observe sections
    const sections = ['hero', 'features', 'about', 'developer', 'stats'];
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) sectionObserver.observe(element);
    });

    // Hero is visible immediately
    setIsVisible(prev => ({ ...prev, hero: true }));

    return () => {
      scrollObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const generateQRCode = (text: string) => {
    const size = 200;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
    return qrUrl;
  };

  const handleShorten = () => {
    if (url) {
      if (outputType === "url") {
        // Generate a mock short URL for demo
        const shortCode = Math.random().toString(36).substring(2, 8);
        setShortUrl(`https://sh.ly/${shortCode}`);
        setQrCode("");
      } else {
        // Generate QR code
        setQrCode(generateQRCode(url));
        setShortUrl("");
      }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Link className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LinklyPro
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#features"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </a>
            <button
              onClick={() => navigate("/pricing")}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Pricing
            </button>
            <a
              href="#about"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button onClick={() => navigate("/signup")}>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4 animate-slide-up-delay-1">
            Not your regular Url Shortner
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-slide-up-delay-2">
            Shorten URLs &
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse-slow">
              {" "}
              Generate QR Codes
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-slide-up-delay-3">
            Create branded short links, generate QR codes, track clicks in
            real-time, and protect your URLs with passwords. The most powerful
            URL shortener and QR code generator for businesses and creators.
          </p>

          {/* URL Shortener Widget */}
          <Card className="max-w-2xl mx-auto mb-12 shadow-xl border-0 bg-white/80 backdrop-blur-sm animate-float scroll-reveal">
            <CardContent className="p-6">
              {/* Toggle between URL and QR */}
              <div className="flex justify-center mb-4">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setOutputType("url")}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                      outputType === "url"
                        ? "bg-white shadow-sm text-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Link className="w-4 h-4" />
                    <span className="text-sm font-medium">Short URL</span>
                  </button>
                  <button
                    onClick={() => setOutputType("qr")}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                      outputType === "qr"
                        ? "bg-white shadow-sm text-purple-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span className="text-sm font-medium">QR Code</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                <Input
                  placeholder="Paste your long URL here..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 h-12 text-lg border-gray-200 focus:border-blue-500"
                />
                <Button
                  onClick={handleShorten}
                  className="h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={!url}
                >
                  {outputType === "url" ? "Shorten URL" : "Generate QR"}
                </Button>
              </div>

              {shortUrl && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
                  <span className="text-blue-800 font-medium">{shortUrl}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(shortUrl)}
                    className="ml-2"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {qrCode && (
                <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex flex-col items-center space-y-3">
                    <span className="text-purple-800 font-medium text-sm">
                      Your QR Code is ready!
                    </span>
                    <img
                      src={qrCode}
                      alt="Generated QR Code"
                      className="w-32 h-32 border border-gray-200 rounded-lg"
                    />
                    <p className="text-xs text-purple-600 text-center">
                      Scan with your phone to visit the URL
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <p className="text-sm text-gray-500 mb-8">
            Free tier includes 1,000 links per month • No credit card required
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose LinklyPro?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced features designed for modern businesses and content
              creators
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow scroll-reveal stagger-1">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Real-time Analytics
                </h3>
                <p className="text-gray-600">
                  Track clicks, geographic data, referrers, and device
                  information in real-time.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow scroll-reveal stagger-2">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Password Protection
                </h3>
                <p className="text-gray-600">
                  Secure your links with custom passwords and control who can
                  access them.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow scroll-reveal stagger-3">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <QrCode className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  QR Code Generator
                </h3>
                <p className="text-gray-600">
                  Generate high-quality QR codes for any URL, perfect for print
                  materials and mobile sharing.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow scroll-reveal stagger-4">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Custom Domains</h3>
                <p className="text-gray-600">
                  Use your own domain to build trust and strengthen your brand
                  identity.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Global CDN</h3>
                <p className="text-gray-600">
                  Lightning-fast redirects with 99.9% uptime across the globe.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Link className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Bulk Management</h3>
                <p className="text-gray-600">
                  Create, edit, and manage thousands of links with our bulk
                  tools.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">API Access</h3>
                <p className="text-gray-600">
                  Integrate with your existing tools using our comprehensive
                  API.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About LinklyPro
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Born from the need for a powerful yet simple URL management
              solution, LinklyPro combines cutting-edge technology with
              intuitive design to deliver the ultimate link shortening
              experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow scroll-reveal stagger-1">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To simplify digital communication by making every link shorter,
                smarter, and more secure. We believe powerful tools should be
                accessible to everyone.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow scroll-reveal stagger-2">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-600">
                We continuously push the boundaries of what's possible with URL
                shortening, adding QR codes, advanced analytics, and smart
                features you won't find elsewhere.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow scroll-reveal stagger-3">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Community</h3>
              <p className="text-gray-600">
                Built for creators, marketers, and businesses worldwide. We're
                trusted by over 10 million users who rely on us for their most
                important campaigns.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div id="stats" className="bg-white rounded-2xl shadow-xl p-12 scroll-reveal">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {activeUsers}M+
                </div>
                <div className="text-gray-600 font-medium">Active Users</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {linksCreated}M+
                </div>
                <div className="text-gray-600 font-medium">Links Created</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {uptime}%
                </div>
                <div className="text-gray-600 font-medium">Uptime</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {countries}+
                </div>
                <div className="text-gray-600 font-medium">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Developer Section */}
      <section id="developer" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 scroll-reveal">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet the Developer
              </h2>
              <p className="text-xl text-gray-600">
                The passionate mind behind LinklyPro
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 scroll-reveal">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Profile Picture Placeholder */}
                <div className="flex-shrink-0">
                  <div className="developer-avatar w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-2xl">
                    A
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Hi, I'm Ayush! 👋
                  </h3>
                  <div className="text-lg text-gray-600 mb-6 leading-relaxed">
                    <p className="mb-4">
                      I'm a passionate full-stack developer with a love for
                      creating tools that make life easier. LinklyPro started as
                      a personal project when I needed a reliable URL shortener
                      for my own projects.
                    </p>
                    <p className="mb-4">
                      <em className="text-gray-500 text-base">
                        "I believe great software should be powerful yet simple,
                        beautiful yet functional. Every feature in LinklyPro is
                        designed with real users in mind."
                      </em>
                    </p>
                    <p>
                      When I'm not coding, you'll find me exploring new
                      technologies, contributing to open source, or sharing my
                      knowledge with the developer community.
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center md:justify-start space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <Twitter className="w-4 h-4" />
                      <span>Twitter</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Contact</span>
                    </Button>
                  </div>

                  {/* Buy me a coffee */}
                  <div className="mt-6 flex justify-center md:justify-start">
                    <Button
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-out flex items-center space-x-2"
                      onClick={() => window.open('https://buymeacoffee.com/ayush', '_blank')}
                    >
                      <Coffee className="w-4 h-4" />
                      <span className="font-medium">Buy me a coffee</span>
                      <span className="text-yellow-100">☕</span>
                    </Button>
                  </div>

                  {/* Tech Stack */}
                  <div className="mt-8">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                      Built with love using
                    </h4>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                      {[
                        "React",
                        "TypeScript",
                        "Node.js",
                        "TailwindCSS",
                        "Vite",
                        "Express",
                      ].map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-white/50"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote Section */}
              <div className="mt-12 p-6 bg-white/80 rounded-2xl border border-white/20 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <Heart className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-700 italic">
                      "Building LinklyPro has been an incredible journey. Seeing
                      millions of users create and share their content more
                      effectively drives me to keep innovating and improving the
                      platform every day."
                    </p>
                    <p className="text-sm text-gray-500 mt-2 font-medium">
                      — Ayush, Founder & Developer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Shortening?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join millions of users who trust LinklyPro for their URL shortening
            needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/signup")}
              className="text-lg px-8 py-3"
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="text-lg px-8 py-3 text-white border-2 border-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              View Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div
                className="flex items-center space-x-2 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => navigate("/")}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Link className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">LinklyPro</span>
              </div>
              <p className="text-gray-400">
                The most powerful URL shortener for businesses and creators.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LinklyPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
