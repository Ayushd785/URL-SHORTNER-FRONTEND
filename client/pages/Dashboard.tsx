import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Link as LinkIcon,
  Copy,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  Eye,
  EyeOff,
  Lock,
  Calendar,
  ExternalLink,
  TrendingUp,
  QrCode,
  Download
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ShortLink {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  hasPassword: boolean;
  isActive: boolean;
}

export default function Dashboard() {
  const [url, setUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [usePassword, setUsePassword] = useState(false);
  const [useCustomAlias, setUseCustomAlias] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [outputType, setOutputType] = useState<"url" | "qr" | "both">("url");
  const [generatedQRCode, setGeneratedQRCode] = useState("");
  
  const navigate = useNavigate();

  // Mock data for demonstration
  const [links] = useState<ShortLink[]>([
    {
      id: "1",
      originalUrl: "https://example.com/very-long-url-that-needs-shortening",
      shortCode: "abc123",
      shortUrl: "https://sh.ly/abc123",
      clicks: 147,
      createdAt: "2024-01-15",
      hasPassword: false,
      isActive: true
    },
    {
      id: "2",
      originalUrl: "https://github.com/user/repository",
      shortCode: "gh456",
      shortUrl: "https://sh.ly/gh456",
      clicks: 89,
      createdAt: "2024-01-14",
      hasPassword: true,
      isActive: true
    },
    {
      id: "3",
      originalUrl: "https://docs.google.com/document/d/1234567890",
      shortCode: "doc789",
      shortUrl: "https://sh.ly/doc789",
      clicks: 256,
      createdAt: "2024-01-13",
      hasPassword: false,
      isActive: true
    }
  ]);

  const generateQRCode = (text: string) => {
    // Generate QR code using a simple QR code generator
    // In a real app, you'd use a proper QR code library like qrcode
    const size = 200;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
    return qrUrl;
  };

  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    // Simulate API call
    setTimeout(() => {
      if (url) {
        // Generate short URL
        const shortCode = Math.random().toString(36).substring(2, 8);
        const newShortUrl = `https://sh.ly/${shortCode}`;

        if (outputType === "url" || outputType === "both") {
          setShortUrl(newShortUrl);
        } else {
          setShortUrl("");
        }

        if (outputType === "qr" || outputType === "both") {
          const qrCodeUrl = generateQRCode(url);
          setGeneratedQRCode(qrCodeUrl);
        } else {
          setGeneratedQRCode("");
        }
      }

      setIsCreating(false);
      // Don't reset form immediately so user can see results
    }, 1000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadQRCode = () => {
    if (generatedQRCode) {
      const link = document.createElement('a');
      link.href = generatedQRCode;
      link.download = 'qr-code.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const resetForm = () => {
    setUrl("");
    setCustomAlias("");
    setPassword("");
    setDescription("");
    setUsePassword(false);
    setUseCustomAlias(false);
    setShortUrl("");
    setGeneratedQRCode("");
    setOutputType("url");
  };

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <LinkIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LinklyPro
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-gray-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            <Button variant="ghost" onClick={() => navigate('/links')}>
              <LinkIcon className="w-4 h-4 mr-2" />
              My Links
            </Button>
            <Button variant="ghost" className="text-gray-600">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </nav>
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">Pro Plan</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => navigate('/login')}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Links</p>
                  <p className="text-2xl font-bold text-gray-900">{links.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <LinkIcon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Clicks</p>
                  <p className="text-2xl font-bold text-gray-900">{totalClicks.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">+24%</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create New Link */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Create New Short Link</span>
              </CardTitle>
              <CardDescription>
                Shorten your URL and customize it with optional password protection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateLink} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url">Destination URL *</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com/your-long-url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                {/* Output Type Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">What would you like to generate?</Label>
                  <div className="grid grid-cols-1 gap-3">
                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        outputType === "url" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setOutputType("url")}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          outputType === "url" ? "bg-blue-100" : "bg-gray-100"
                        }`}>
                          <LinkIcon className={`w-5 h-5 ${outputType === "url" ? "text-blue-600" : "text-gray-600"}`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Short URL</h3>
                          <p className="text-sm text-gray-500">Generate a shortened link</p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        outputType === "qr" ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setOutputType("qr")}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          outputType === "qr" ? "bg-purple-100" : "bg-gray-100"
                        }`}>
                          <QrCode className={`w-5 h-5 ${outputType === "qr" ? "text-purple-600" : "text-gray-600"}`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">QR Code</h3>
                          <p className="text-sm text-gray-500">Generate a QR code for the URL</p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        outputType === "both" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setOutputType("both")}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          outputType === "both" ? "bg-green-100" : "bg-gray-100"
                        }`}>
                          <div className="flex space-x-1">
                            <LinkIcon className={`w-4 h-4 ${outputType === "both" ? "text-green-600" : "text-gray-600"}`} />
                            <QrCode className={`w-4 h-4 ${outputType === "both" ? "text-green-600" : "text-gray-600"}`} />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Both</h3>
                          <p className="text-sm text-gray-500">Generate both short URL and QR code</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="custom-alias" className="text-sm font-medium">
                      Custom alias (optional)
                    </Label>
                    <Switch
                      checked={useCustomAlias}
                      onCheckedChange={setUseCustomAlias}
                    />
                  </div>
                  {useCustomAlias && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">sh.ly/</span>
                      <Input
                        id="custom-alias"
                        placeholder="my-custom-link"
                        value={customAlias}
                        onChange={(e) => setCustomAlias(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password-protection" className="text-sm font-medium">
                      Password protection
                    </Label>
                    <Switch
                      checked={usePassword}
                      onCheckedChange={setUsePassword}
                    />
                  </div>
                  {usePassword && (
                    <div className="relative">
                      <Input
                        id="password-protection"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Add a note about this link..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={isCreating || !url}
                >
                  {isCreating ? "Generating..." :
                   outputType === "url" ? "Create Short Link" :
                   outputType === "qr" ? "Generate QR Code" :
                   "Generate Both"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Recent Links */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Links</CardTitle>
                  <CardDescription>Your recently created short links</CardDescription>
                </div>
                <Button variant="outline" onClick={() => navigate('/links')}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {links.slice(0, 3).map((link) => (
                  <div key={link.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          {link.shortUrl}
                        </p>
                        {link.hasPassword && (
                          <Lock className="w-3 h-3 text-gray-400" />
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(link.shortUrl)}
                          className="p-1 h-auto"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        {link.originalUrl}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-500">
                          {link.clicks} clicks
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(link.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {link.clicks}
                      </Badge>
                      <Button size="sm" variant="ghost">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {links.length === 0 && (
                  <div className="text-center py-8">
                    <LinkIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No links created yet</p>
                    <p className="text-sm text-gray-400">Create your first short link above</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your account and settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-medium">View Analytics</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Settings className="w-6 h-6 text-gray-600" />
                <span className="text-sm font-medium">Account Settings</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <LinkIcon className="w-6 h-6 text-purple-600" />
                <span className="text-sm font-medium">Bulk Import</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Calendar className="w-6 h-6 text-green-600" />
                <span className="text-sm font-medium">Schedule Links</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
