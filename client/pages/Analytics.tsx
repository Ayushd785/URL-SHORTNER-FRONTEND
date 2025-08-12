import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Link as LinkIcon, 
  BarChart3, 
  Settings, 
  LogOut, 
  TrendingUp,
  TrendingDown,
  Globe,
  Smartphone,
  Monitor,
  Users,
  Eye,
  MousePointer,
  Calendar,
  Download,
  Share2
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock data based on the Links page data structure
const analyticsData = {
  overview: {
    totalLinks: 4,
    totalClicks: 10879,
    totalViews: 15420,
    conversionRate: 70.5,
    avgClicksPerLink: 2720,
    topPerformingLink: "sh.ly/yt101"
  },
  timeRange: {
    "7d": {
      clicks: [120, 132, 101, 134, 90, 230, 210],
      views: [180, 165, 142, 190, 123, 290, 267]
    },
    "30d": {
      clicks: [1200, 1320, 1010, 1340, 900, 2300, 2100, 1800, 1650, 1420],
      views: [1800, 1650, 1420, 1900, 1230, 2900, 2670, 2200, 2100, 1980]
    }
  },
  devices: {
    desktop: 3600,
    mobile: 4347,
    tablet: 932
  },
  locations: [
    { country: "United States", clicks: 3550, percentage: 32.6 },
    { country: "United Kingdom", clicks: 1880, percentage: 17.3 },
    { country: "Canada", clicks: 1340, percentage: 12.3 },
    { country: "India", clicks: 1190, percentage: 10.9 },
    { country: "Germany", clicks: 980, percentage: 9.0 },
    { country: "Others", clicks: 1939, percentage: 17.9 }
  ],
  topLinks: [
    {
      id: "4",
      shortUrl: "sh.ly/yt101",
      originalUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      clicks: 5684,
      views: 7200,
      conversionRate: 78.9,
      description: "Marketing video campaign"
    },
    {
      id: "3",
      shortUrl: "sh.ly/doc789",
      originalUrl: "https://docs.google.com/document/d/1234567890abcdef",
      clicks: 2156,
      views: 2800,
      conversionRate: 77.0,
      description: "Team collaboration document"
    },
    {
      id: "1",
      shortUrl: "sh.ly/abc123",
      originalUrl: "https://example.com/very-long-url-that-needs-shortening",
      clicks: 1247,
      views: 1620,
      conversionRate: 77.0,
      description: "Landing page for product launch"
    },
    {
      id: "2",
      shortUrl: "sh.ly/gh456",
      originalUrl: "https://github.com/user/repository/blob/main/README.md",
      clicks: 892,
      views: 1150,
      conversionRate: 77.6,
      description: "Private project documentation"
    }
  ]
};

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("7d");
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [tooltipData, setTooltipData] = useState<{device: string, count: number, percentage: string} | null>(null);
  const [userData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    avatar: "👨‍💻",
    plan: "Pro Plan"
  });

  const navigate = useNavigate();

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Calculate device percentages
  const totalDeviceClicks = analyticsData.devices.desktop + analyticsData.devices.mobile + analyticsData.devices.tablet;
  const devicePercentages = {
    desktop: ((analyticsData.devices.desktop / totalDeviceClicks) * 100).toFixed(1),
    mobile: ((analyticsData.devices.mobile / totalDeviceClicks) * 100).toFixed(1),
    tablet: ((analyticsData.devices.tablet / totalDeviceClicks) * 100).toFixed(1)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
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
            <Button variant="ghost" onClick={() => navigate("/links")} className="text-gray-700 hover:text-gray-900 hover:bg-gray-100">
              <LinkIcon className="w-4 h-4 mr-2" />
              My Links
            </Button>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            <Button variant="ghost" onClick={() => navigate("/settings")} className="text-gray-700 hover:text-gray-900 hover:bg-gray-100">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </nav>
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{userData.firstName} {userData.lastName}</p>
              <p className="text-xs text-gray-500">{userData.plan}</p>
            </div>
            <Avatar className="w-8 h-8">
              {userData.avatar && userData.avatar.startsWith('data:') ? (
                <AvatarImage src={userData.avatar} />
              ) : userData.avatar ? (
                <div className="w-full h-full flex items-center justify-center text-lg">
                  {userData.avatar}
                </div>
              ) : (
                <AvatarFallback>{getInitials(userData.firstName, userData.lastName)}</AvatarFallback>
              )}
            </Avatar>
            <Button variant="ghost" size="icon" onClick={() => navigate('/login')}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Comprehensive insights into your link performance</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Clicks</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalClicks.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">+12.5%</span>
                  </div>
                </div>
                <MousePointer className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalViews.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">+8.2%</span>
                  </div>
                </div>
                <Eye className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.conversionRate}%</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">+2.1%</span>
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Clicks/Link</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.avgClicksPerLink}</p>
                  <div className="flex items-center mt-1">
                    <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                    <span className="text-xs text-red-600">-3.1%</span>
                  </div>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Device Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Device Breakdown</CardTitle>
              <CardDescription>Traffic distribution by device type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-6">
                {/* Pie Chart */}
                <div className="relative w-48 h-48">
                  <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
                    {/* Mobile slice */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="transparent"
                      stroke="#16a34a"
                      strokeWidth="40"
                      strokeDasharray={`${(parseFloat(devicePercentages.mobile) / 100) * 502.65} 502.65`}
                      strokeDashoffset="0"
                      className="transition-all duration-300 hover:stroke-green-500"
                    />
                    {/* Desktop slice */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="transparent"
                      stroke="#2563eb"
                      strokeWidth="40"
                      strokeDasharray={`${(parseFloat(devicePercentages.desktop) / 100) * 502.65} 502.65`}
                      strokeDashoffset={`-${(parseFloat(devicePercentages.mobile) / 100) * 502.65}`}
                      className="transition-all duration-300 hover:stroke-blue-500"
                    />
                    {/* Tablet slice */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="transparent"
                      stroke="#9333ea"
                      strokeWidth="40"
                      strokeDasharray={`${(parseFloat(devicePercentages.tablet) / 100) * 502.65} 502.65`}
                      strokeDashoffset={`-${((parseFloat(devicePercentages.mobile) + parseFloat(devicePercentages.desktop)) / 100) * 502.65}`}
                      className="transition-all duration-300 hover:stroke-purple-500"
                    />
                  </svg>
                  {/* Center label */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{totalDeviceClicks.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">Total Clicks</p>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="space-y-3 w-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      <Smartphone className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">Mobile</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{analyticsData.devices.mobile.toLocaleString()}</span>
                      <span className="text-sm font-medium">{devicePercentages.mobile}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      <Monitor className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">Desktop</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{analyticsData.devices.desktop.toLocaleString()}</span>
                      <span className="text-sm font-medium">{devicePercentages.desktop}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                      <Monitor className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium">Tablet</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{analyticsData.devices.tablet.toLocaleString()}</span>
                      <span className="text-sm font-medium">{devicePercentages.tablet}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Locations */}
          <Card>
            <CardHeader>
              <CardTitle>Top Locations</CardTitle>
              <CardDescription>Geographic distribution of clicks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.locations.map((location, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">{location.country}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{location.clicks.toLocaleString()}</span>
                      <span className="text-sm font-medium">{location.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Links */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Links</CardTitle>
            <CardDescription>Your most successful shortened URLs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topLinks.map((link, index) => (
                <div key={link.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge variant="outline" className="text-xs">#{index + 1}</Badge>
                      <p className="text-sm font-medium text-blue-600 truncate">{link.shortUrl}</p>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{link.originalUrl}</p>
                    {link.description && (
                      <p className="text-xs text-gray-400 mt-1">{link.description}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-6 text-center">
                    <div>
                      <p className="text-lg font-bold text-gray-900">{link.clicks.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Clicks</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{link.views.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Views</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{link.conversionRate}%</p>
                      <p className="text-xs text-gray-500">CVR</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
