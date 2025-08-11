import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Link as LinkIcon,
  Copy,
  BarChart3,
  Settings,
  LogOut,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  ExternalLink,
  Lock,
  Eye,
  Calendar,
  Filter,
  Download,
  TrendingUp,
  Globe,
  Smartphone,
  Monitor,
  QrCode,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LinkData {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  lastClicked: string | null;
  hasPassword: boolean;
  isActive: boolean;
  description: string;
  device: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  location: {
    country: string;
    clicks: number;
  }[];
}

export default function Links() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("created");
  const [filterBy, setFilterBy] = useState("all");

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
  const [links] = useState<LinkData[]>([
    {
      id: "1",
      originalUrl:
        "https://example.com/very-long-url-that-needs-shortening-for-better-sharing",
      shortCode: "abc123",
      shortUrl: "https://sh.ly/abc123",
      clicks: 1247,
      createdAt: "2024-01-15",
      lastClicked: "2024-01-20",
      hasPassword: false,
      isActive: true,
      description: "Landing page for product launch",
      device: { desktop: 800, mobile: 347, tablet: 100 },
      location: [
        { country: "US", clicks: 450 },
        { country: "UK", clicks: 280 },
        { country: "CA", clicks: 190 },
      ],
    },
    {
      id: "2",
      originalUrl: "https://github.com/user/repository/blob/main/README.md",
      shortCode: "gh456",
      shortUrl: "https://sh.ly/gh456",
      clicks: 892,
      createdAt: "2024-01-14",
      lastClicked: "2024-01-19",
      hasPassword: true,
      isActive: true,
      description: "Private project documentation",
      device: { desktop: 600, mobile: 200, tablet: 92 },
      location: [
        { country: "US", clicks: 350 },
        { country: "DE", clicks: 200 },
        { country: "FR", clicks: 150 },
      ],
    },
    {
      id: "3",
      originalUrl: "https://docs.google.com/document/d/1234567890abcdef",
      shortCode: "doc789",
      shortUrl: "https://sh.ly/doc789",
      clicks: 2156,
      createdAt: "2024-01-13",
      lastClicked: "2024-01-21",
      hasPassword: false,
      isActive: true,
      description: "Team collaboration document",
      device: { desktop: 1200, mobile: 800, tablet: 156 },
      location: [
        { country: "US", clicks: 800 },
        { country: "UK", clicks: 400 },
        { country: "IN", clicks: 350 },
      ],
    },
    {
      id: "4",
      originalUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      shortCode: "yt101",
      shortUrl: "https://sh.ly/yt101",
      clicks: 5684,
      createdAt: "2024-01-10",
      lastClicked: "2024-01-21",
      hasPassword: false,
      isActive: false,
      description: "Marketing video campaign",
      device: { desktop: 2000, mobile: 3000, tablet: 684 },
      location: [
        { country: "US", clicks: 2000 },
        { country: "UK", clicks: 1200 },
        { country: "CA", clicks: 800 },
      ],
    },
  ]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const generateQRCode = (url: string) => {
    const size = 200;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`;
    return qrUrl;
  };

  const downloadQRCode = (url: string, filename: string) => {
    const qrCodeUrl = generateQRCode(url);
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `${filename}-qr-code.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLinks = links.filter((link) => {
    const matchesSearch =
      link.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.shortUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterBy === "all" ||
      (filterBy === "active" && link.isActive) ||
      (filterBy === "inactive" && !link.isActive) ||
      (filterBy === "password" && link.hasPassword);

    return matchesSearch && matchesFilter;
  });

  const sortedLinks = [...filteredLinks].sort((a, b) => {
    switch (sortBy) {
      case "clicks":
        return b.clicks - a.clicks;
      case "created":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "url":
        return a.originalUrl.localeCompare(b.originalUrl);
      default:
        return 0;
    }
  });

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
  const activeLinks = links.filter((link) => link.isActive).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <LinkIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LinklyPro
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" onClick={() => navigate("/dashboard")} className="text-gray-700 hover:text-gray-900 hover:bg-gray-100">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
              <LinkIcon className="w-4 h-4 mr-2" />
              My Links
            </Button>
            <Button variant="ghost" onClick={() => navigate("/settings")} className="text-gray-700 hover:text-gray-900 hover:bg-gray-100">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </nav>
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">
                {userData.firstName} {userData.lastName}
              </p>
              <p className="text-xs text-gray-500">{userData.plan}</p>
            </div>
            <Avatar className="w-8 h-8">
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/login")}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Links</h1>
          <p className="text-gray-600">
            Manage and track all your shortened URLs
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Links
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {links.length}
                  </p>
                </div>
                <LinkIcon className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Links
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {activeLinks}
                  </p>
                </div>
                <Eye className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Clicks
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalClicks.toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Avg. Clicks
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(totalClicks / links.length)}
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search links..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Links</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="password">Password Protected</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="created">Date Created</SelectItem>
                    <SelectItem value="clicks">Most Clicks</SelectItem>
                    <SelectItem value="url">URL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button onClick={() => navigate("/dashboard")}>
                  <LinkIcon className="w-4 h-4 mr-2" />
                  New Link
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Links Table */}
        <Card>
          <CardHeader>
            <CardTitle>Links ({sortedLinks.length})</CardTitle>
            <CardDescription>
              All your shortened URLs with detailed analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Short URL</TableHead>
                    <TableHead>Original URL</TableHead>
                    <TableHead>Clicks</TableHead>
                    <TableHead>Device Split</TableHead>
                    <TableHead>QR Code</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedLinks.map((link) => (
                    <TableRow key={link.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-blue-600 font-medium">
                                {link.shortUrl}
                              </span>
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
                            {link.description && (
                              <p className="text-xs text-gray-500 mt-1">
                                {link.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="max-w-xs">
                          <p
                            className="text-sm text-gray-900 truncate"
                            title={link.originalUrl}
                          >
                            {link.originalUrl}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-semibold">
                            {link.clicks.toLocaleString()}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            +12%
                          </Badge>
                        </div>
                        {link.lastClicked && (
                          <p className="text-xs text-gray-500">
                            Last:{" "}
                            {new Date(link.lastClicked).toLocaleDateString()}
                          </p>
                        )}
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <div className="flex items-center text-xs text-gray-600">
                            <Monitor className="w-3 h-3 mr-1" />
                            {Math.round(
                              (link.device.desktop / link.clicks) * 100,
                            )}
                            %
                          </div>
                          <div className="flex items-center text-xs text-gray-600">
                            <Smartphone className="w-3 h-3 mr-1" />
                            {Math.round(
                              (link.device.mobile / link.clicks) * 100,
                            )}
                            %
                          </div>
                        </div>
                        <div className="flex space-x-1 mt-1">
                          <div className="flex-1 h-1 bg-blue-200 rounded">
                            <div
                              className="h-full bg-blue-600 rounded"
                              style={{
                                width: `${(link.device.desktop / link.clicks) * 100}%`,
                              }}
                            />
                          </div>
                          <div className="flex-1 h-1 bg-green-200 rounded">
                            <div
                              className="h-full bg-green-600 rounded"
                              style={{
                                width: `${(link.device.mobile / link.clicks) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              const qrWindow = window.open(
                                "",
                                "_blank",
                                "width=400,height=400",
                              );
                              if (qrWindow) {
                                qrWindow.document.write(`
                                  <html>
                                    <head><title>QR Code - ${link.shortCode}</title></head>
                                    <body style="margin:0;padding:20px;text-align:center;font-family:Arial,sans-serif;">
                                      <h3>QR Code for ${link.shortUrl}</h3>
                                      <img src="${generateQRCode(link.originalUrl)}" alt="QR Code" style="border:1px solid #ccc;border-radius:8px;" />
                                      <p style="margin-top:20px;font-size:12px;color:#666;">Scan to visit: ${link.originalUrl}</p>
                                    </body>
                                  </html>
                                `);
                              }
                            }}
                            className="flex items-center space-x-1"
                          >
                            <QrCode className="w-3 h-3" />
                            <span className="text-xs">View</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              downloadQRCode(link.originalUrl, link.shortCode)
                            }
                            className="flex items-center space-x-1 text-xs"
                          >
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div>
                          <p className="text-sm text-gray-900">
                            {new Date(link.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(link.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={link.isActive ? "default" : "secondary"}
                        >
                          {link.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <BarChart3 className="w-4 h-4 mr-2" />
                              View Analytics
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Link
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                downloadQRCode(link.originalUrl, link.shortCode)
                              }
                            >
                              <QrCode className="w-4 h-4 mr-2" />
                              Download QR Code
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Visit Link
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Link
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {sortedLinks.length === 0 && (
                <div className="text-center py-12">
                  <LinkIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No links found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm
                      ? "Try adjusting your search criteria"
                      : "Create your first short link to get started"}
                  </p>
                  <Button onClick={() => navigate("/dashboard")}>
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Create New Link
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
