import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Link as LinkIcon,
  Lock,
  Eye,
  EyeOff,
  Shield,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function VerifyLink() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [linkInfo, setLinkInfo] = useState({
    shortCode: "",
    originalUrl: "",
    description: "",
    createdAt: "",
    isValid: true,
  });

  const navigate = useNavigate();
  const { shortCode } = useParams();

  useEffect(() => {
    // Simulate fetching link information
    if (shortCode) {
      // In real app, this would be an API call to get link info
      setLinkInfo({
        shortCode: shortCode,
        originalUrl: "https://example.com/some-protected-content",
        description: "Protected content requiring password verification",
        createdAt: "2024-01-15",
        isValid: true,
      });
    }
  }, [shortCode]);

  const handleVerifyPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsVerifying(true);

    // Simulate password verification
    setTimeout(() => {
      setIsVerifying(false);

      // Demo password for testing - in real app, this would be an API call
      if (password === "demo123" || password === "password") {
        // Success - redirect to original URL
        window.location.href = linkInfo.originalUrl;
      } else {
        setError("Incorrect password. Please try again.");
        setAttempts((prev) => prev + 1);
        setPassword("");
      }
    }, 1000);
  };

  const isBlocked = attempts >= 3;

  if (!linkInfo.isValid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Link Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              This link doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/")} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="flex items-center justify-center space-x-2 mb-6 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <LinkIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LinklyPro
            </span>
          </div>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-1">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-yellow-600" />
            </div>
            <CardTitle className="text-xl">Protected Link</CardTitle>
            <CardDescription>
              This link is password protected. Enter the password to continue.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Link Information */}
            <div className="p-4 bg-gray-50 rounded-lg space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Short Link:</span>
                <span className="font-mono text-blue-600">
                  sh.ly/{linkInfo.shortCode}
                </span>
              </div>
              {linkInfo.description && (
                <div className="flex items-start justify-between text-sm">
                  <span className="text-gray-500">Description:</span>
                  <span className="text-gray-700 text-right max-w-48">
                    {linkInfo.description}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Created:</span>
                <span className="text-gray-700">
                  {new Date(linkInfo.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Block Alert */}
            {isBlocked && (
              <Alert className="border-red-200 bg-red-50">
                <Lock className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  Too many failed attempts. This link has been temporarily
                  blocked for security.
                </AlertDescription>
              </Alert>
            )}

            {/* Password Form */}
            {!isBlocked && (
              <form onSubmit={handleVerifyPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Enter Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter the link password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-11 pr-10"
                      disabled={isVerifying}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isVerifying}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  {attempts > 0 && attempts < 3 && (
                    <p className="text-sm text-orange-600">
                      {3 - attempts} attempt{3 - attempts !== 1 ? "s" : ""}{" "}
                      remaining
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={isVerifying || !password.trim()}
                >
                  {isVerifying ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Access Link
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* Demo Instructions */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-blue-800 font-medium mb-1">Demo Mode</p>
                  <p className="text-blue-700">
                    Use password{" "}
                    <code className="bg-blue-100 px-1 rounded">demo123</code> or{" "}
                    <code className="bg-blue-100 px-1 rounded">password</code>{" "}
                    to test this feature.
                  </p>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                This link is protected for your security. Only users with the
                correct password can access the content.
              </p>
            </div>

            {/* Back Button */}
            <div className="text-center pt-4 border-t">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to LinklyPro
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 Your security is our priority. All password verification is
            encrypted and secure.
          </p>
        </div>
      </div>
    </div>
  );
}
