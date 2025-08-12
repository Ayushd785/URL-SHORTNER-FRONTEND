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
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Download,
  User,
  Mail,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  const [shortUrl, setShortUrl] = useState("");
  const [generatedQRCode, setGeneratedQRCode] = useState("");

  // User data (in real app, this would come from context/state management)
  const [userData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    avatar: "👨‍💻",
    plan: "Pro Plan",
  });

  const navigate = useNavigate();

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

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
      isActive: true,
    },
    {
      id: "2",
      originalUrl: "https://github.com/user/repository",
      shortCode: "gh456",
      shortUrl: "https://sh.ly/gh456",
      clicks: 89,
      createdAt: "2024-01-14",
      hasPassword: true,
      isActive: true,
    },
    {
      id: "3",
      originalUrl: "https://docs.google.com/document/d/1234567890",
      shortCode: "doc789",
      shortUrl: "https://sh.ly/doc789",
      clicks: 256,
      createdAt: "2024-01-13",
      hasPassword: false,
      isActive: true,
    },
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
      const link = document.createElement("a");
      link.href = generatedQRCode;
      link.download = "qr-code.png";
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
        <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <div
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate("/")}
          >
            <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <LinkIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LinklyPro
            </span>
          </div>
          <nav className="hidden lg:flex items-center space-x-6">
            <Button
              variant="ghost"
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 min-h-[44px]"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/links")}
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 min-h-[44px]"
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              My Links
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/analytics")}
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 min-h-[44px]"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/settings")}
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 min-h-[44px]"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </nav>
          <div className="flex items-center space-x-3">
            <div className="text-right hidden md:block">
              <p className="text-xs md:text-sm font-medium text-gray-900">
                {userData.firstName} {userData.lastName}
              </p>
              <p className="text-xs text-gray-500">{userData.plan}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-8 h-8 md:w-9 md:h-9 cursor-pointer hover:ring-2 hover:ring-blue-200 transition-all min-h-[44px] min-w-[44px]">
                  {userData.avatar && userData.avatar.startsWith("data:") ? (
                    <AvatarImage src={userData.avatar} />
                  ) : userData.avatar ? (
                    <div className="w-full h-full flex items-center justify-center text-lg">
                      {userData.avatar}
                    </div>
                  ) : (
                    <AvatarFallback>
                      {getInitials(userData.firstName, userData.lastName)}
                    </AvatarFallback>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">
                        {userData.firstName} {userData.lastName}
                      </p>
                      <p className="text-xs text-gray-500">{userData.plan}</p>
                    </div>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <div>
                    <p className="text-sm">{userData.email}</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate("/settings")}
                  className="flex items-center space-x-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>Account Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/login")}
                  className="flex items-center space-x-2 text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">
                    Total Links
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900">
                    {links.length}
                  </p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <LinkIcon className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">
                    Total Clicks
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900">
                    {totalClicks.toLocaleString()}
                  </p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">
                    This Month
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900">+24%</p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Create New Link */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
                <Plus className="w-5 h-5" />
                <span>Create New Short Link</span>
              </CardTitle>
              <CardDescription className="text-sm md:text-base">
                Shorten your URL and customize it with optional password
                protection
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <form onSubmit={handleCreateLink} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url" className="text-sm md:text-base">Destination URL *</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com/your-long-url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    className="h-11 text-base"
                  />
                </div>

                {/* Output Type Selection */}
                <div className="space-y-3">
                  <Label className="text-sm md:text-base font-medium">
                    What would you like to generate?
                  </Label>
                  <div className="grid grid-cols-1 gap-3">
                    <div
                      className={`p-3 md:p-4 border-2 rounded-lg cursor-pointer transition-all min-h-[44px] ${
                        outputType === "url"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setOutputType("url")}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center ${
                            outputType === "url" ? "bg-blue-100" : "bg-gray-100"
                          }`}
                        >
                          <LinkIcon
                            className={`w-4 h-4 md:w-5 md:h-5 ${outputType === "url" ? "text-blue-600" : "text-gray-600"}`}
                          />
                        </div>
                        <div>
                          <h3 className="text-sm md:text-base font-medium text-gray-900">
                            Short URL
                          </h3>
                          <p className="text-xs md:text-sm text-gray-500">
                            Generate a shortened link
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`p-3 md:p-4 border-2 rounded-lg cursor-pointer transition-all min-h-[44px] ${
                        outputType === "qr"
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setOutputType("qr")}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center ${
                            outputType === "qr"
                              ? "bg-purple-100"
                              : "bg-gray-100"
                          }`}
                        >
                          <QrCode
                            className={`w-4 h-4 md:w-5 md:h-5 ${outputType === "qr" ? "text-purple-600" : "text-gray-600"}`}
                          />
                        </div>
                        <div>
                          <h3 className="text-sm md:text-base font-medium text-gray-900">QR Code</h3>
                          <p className="text-xs md:text-sm text-gray-500">
                            Generate a QR code for the URL
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`p-3 md:p-4 border-2 rounded-lg cursor-pointer transition-all min-h-[44px] ${
                        outputType === "both"
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setOutputType("both")}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center ${
                            outputType === "both"
                              ? "bg-green-100"
                              : "bg-gray-100"
                          }`}
                        >
                          <div className="flex space-x-1">
                            <LinkIcon
                              className={`w-3 h-3 md:w-4 md:h-4 ${outputType === "both" ? "text-green-600" : "text-gray-600"}`}
                            />
                            <QrCode
                              className={`w-3 h-3 md:w-4 md:h-4 ${outputType === "both" ? "text-green-600" : "text-gray-600"}`}
                            />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm md:text-base font-medium text-gray-900">Both</h3>
                          <p className="text-xs md:text-sm text-gray-500">
                            Generate both short URL and QR code
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="custom-alias"
                      className="text-sm md:text-base font-medium"
                    >
                      Custom alias (optional)
                    </Label>
                    <Switch
                      checked={useCustomAlias}
                      onCheckedChange={setUseCustomAlias}
                    />
                  </div>
                  {useCustomAlias && (
                    <div className="flex items-center space-x-2 flex-wrap">
                      <span className="text-xs md:text-sm text-gray-500">sh.ly/</span>
                      <Input
                        id="custom-alias"
                        placeholder="my-custom-link"
                        value={customAlias}
                        onChange={(e) => setCustomAlias(e.target.value)}
                        className="flex-1 min-w-0 text-base"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="password-protection"
                      className="text-sm md:text-base font-medium"
                    >
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
                        className="pr-10 text-base"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent min-h-[44px] min-w-[44px]"
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
                  <Label htmlFor="description" className="text-sm md:text-base">Description (optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Add a note about this link..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="text-base"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 min-h-[44px] text-sm md:text-base"
                  disabled={isCreating || !url}
                >
                  {isCreating
                    ? "Generating..."
                    : outputType === "url"
                      ? "Create Short Link"
                      : outputType === "qr"
                        ? "Generate QR Code"
                        : "Generate Both"}
                </Button>
              </form>

              {/* Results Display */}
              {(shortUrl || generatedQRCode) && (
                <div className="mt-4 md:mt-6 space-y-4 border-t pt-4 md:pt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900">
                      Generated Results
                    </h3>
                    <Button size="sm" variant="outline" onClick={resetForm} className="min-h-[44px]">
                      Create Another
                    </Button>
                  </div>

                  {shortUrl && (
                    <div className="p-3 md:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <LinkIcon className="w-4 h-4 text-blue-600" />
                        <span className="text-xs md:text-sm font-medium text-blue-800">
                          Short URL
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <span className="text-sm md:text-base text-blue-800 font-medium break-all">
                          {shortUrl}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(shortUrl)}
                          className="ml-0 sm:ml-2 flex-shrink-0 min-h-[44px] self-end sm:self-auto"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {generatedQRCode && (
                    <div className="p-3 md:p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-3">
                        <QrCode className="w-4 h-4 text-purple-600" />
                        <span className="text-xs md:text-sm font-medium text-purple-800">
                          QR Code
                        </span>
                      </div>
                      <div className="flex flex-col items-center space-y-3">
                        <img
                          src={generatedQRCode}
                          alt="Generated QR Code"
                          className="w-32 h-32 md:w-48 md:h-48 border border-gray-200 rounded-lg"
                        />
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={downloadQRCode}
                            className="flex items-center justify-center space-x-2 min-h-[44px]"
                          >
                            <Download className="w-4 h-4" />
                            <span>Download</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(url)}
                            className="flex items-center justify-center space-x-2 min-h-[44px]"
                          >
                            <Copy className="w-4 h-4" />
                            <span>Copy URL</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Links */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <CardTitle className="text-lg md:text-xl">Recent Links</CardTitle>
                  <CardDescription className="text-sm md:text-base">
                    Your recently created short links
                  </CardDescription>
                </div>
                <Button variant="outline" onClick={() => navigate("/links")} className="min-h-[44px] self-start sm:self-auto">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-4">
                {links.slice(0, 3).map((link) => (
                  <div
                    key={link.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 md:p-4 border rounded-lg hover:bg-gray-50 transition-colors gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="text-xs md:text-sm font-medium text-blue-600 truncate">
                          {link.shortUrl}
                        </p>
                        {link.hasPassword && (
                          <Lock className="w-3 h-3 text-gray-400" />
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(link.shortUrl)}
                          className="p-1 h-auto min-h-[44px] min-w-[44px]"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-xs md:text-sm text-gray-500 truncate">
                        {link.originalUrl}
                      </p>
                      <div className="flex items-center space-x-3 md:space-x-4 mt-2">
                        <span className="text-xs text-gray-500">
                          {link.clicks} clicks
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(link.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 self-end sm:self-auto">
                      <Badge variant="outline" className="text-xs">
                        {link.clicks}
                      </Badge>
                      <Button size="sm" variant="ghost" className="min-h-[44px] min-w-[44px]">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}

                {links.length === 0 && (
                  <div className="text-center py-6 md:py-8">
                    <LinkIcon className="w-10 h-10 md:w-12 md:h-12 text-gray-300 mx-auto mb-3 md:mb-4" />
                    <p className="text-sm md:text-base text-gray-500">No links created yet</p>
                    <p className="text-xs md:text-sm text-gray-400">
                      Create your first short link above
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6 md:mt-8">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Quick Actions</CardTitle>
            <CardDescription className="text-sm md:text-base">Manage your account and settings</CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <Button
                variant="outline"
                className="h-auto p-3 md:p-4 flex flex-col items-center space-y-2 min-h-[80px] md:min-h-[100px]"
              >
                <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                <span className="text-xs md:text-sm font-medium text-center">View Analytics</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/settings")}
                className="h-auto p-3 md:p-4 flex flex-col items-center space-y-2 min-h-[80px] md:min-h-[100px]"
              >
                <Settings className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                <span className="text-xs md:text-sm font-medium text-center">Account Settings</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-3 md:p-4 flex flex-col items-center space-y-2 min-h-[80px] md:min-h-[100px]"
              >
                <LinkIcon className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                <span className="text-xs md:text-sm font-medium text-center">Bulk Import</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-3 md:p-4 flex flex-col items-center space-y-2 min-h-[80px] md:min-h-[100px]"
              >
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                <span className="text-xs md:text-sm font-medium text-center">Schedule Links</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
