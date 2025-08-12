import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Link as LinkIcon,
  Check,
  X,
  Star,
  Zap,
  Shield,
  BarChart3,
  Globe,
  Users,
  Headphones,
  Crown,
  Infinity,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type BillingCycle = "monthly" | "quarterly" | "annually";

interface PricingPlan {
  name: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  limits: {
    links: string;
    clicks: string;
    qrCodes: string;
    analytics: string;
    customDomains: string;
    teamMembers: string;
  };
  pricing: {
    monthly: number;
    quarterly: number;
    annually: number;
  };
  popular?: boolean;
  buttonText: string;
  buttonVariant: "default" | "outline" | "secondary";
}

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const navigate = useNavigate();

  const plans: PricingPlan[] = [
    {
      name: "Free",
      description: "Perfect for getting started",
      icon: <LinkIcon className="w-6 h-6" />,
      features: [
        "Basic URL shortening",
        "QR code generation",
        "Basic click tracking",
        "Public links only",
        "LinklyPro subdomain",
        "Community support",
      ],
      limits: {
        links: "100 links/month",
        clicks: "1K clicks/month",
        qrCodes: "50 QR codes/month",
        analytics: "7 days retention",
        customDomains: "0 domains",
        teamMembers: "1 user",
      },
      pricing: {
        monthly: 0,
        quarterly: 0,
        annually: 0,
      },
      buttonText: "Get Started Free",
      buttonVariant: "outline",
    },
    {
      name: "Pro",
      description: "Best for professionals and small teams",
      icon: <Zap className="w-6 h-6" />,
      features: [
        "Everything in Free",
        "Password protected links",
        "Custom link aliases",
        "Advanced analytics & insights",
        "Geographic click data",
        "Device & browser tracking",
        "Bulk link management",
        "CSV/Excel export",
        "Email notifications",
        "Priority support",
      ],
      limits: {
        links: "Unlimited links",
        clicks: "100K clicks/month",
        qrCodes: "Unlimited QR codes",
        analytics: "90 days retention",
        customDomains: "3 domains",
        teamMembers: "5 users",
      },
      pricing: {
        monthly: 19,
        quarterly: 49,
        annually: 149,
      },
      popular: true,
      buttonText: "Start Pro Trial",
      buttonVariant: "default",
    },
    {
      name: "Business",
      description: "For growing businesses and teams",
      icon: <Users className="w-6 h-6" />,
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Custom branded domains",
        "Advanced QR customization",
        "API access & webhooks",
        "SSO integration",
        "Advanced user permissions",
        "White-label options",
        "Real-time notifications",
        "Dedicated account manager",
      ],
      limits: {
        links: "Unlimited links",
        clicks: "1M clicks/month",
        qrCodes: "Unlimited QR codes",
        analytics: "1 year retention",
        customDomains: "10 domains",
        teamMembers: "25 users",
      },
      pricing: {
        monthly: 49,
        quarterly: 129,
        annually: 399,
      },
      buttonText: "Start Business Trial",
      buttonVariant: "default",
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      icon: <Crown className="w-6 h-6" />,
      features: [
        "Everything in Business",
        "Unlimited team members",
        "Advanced security features",
        "Custom integrations",
        "Dedicated infrastructure",
        "24/7 phone support",
        "Custom contracts & SLA",
        "On-premise deployment",
        "Advanced compliance",
        "Training & onboarding",
      ],
      limits: {
        links: "Unlimited links",
        clicks: "Unlimited clicks",
        qrCodes: "Unlimited QR codes",
        analytics: "Unlimited retention",
        customDomains: "Unlimited domains",
        teamMembers: "Unlimited users",
      },
      pricing: {
        monthly: 199,
        quarterly: 499,
        annually: 1499,
      },
      buttonText: "Email Us",
      buttonVariant: "outline",
    },
  ];

  const getBillingLabel = (cycle: BillingCycle) => {
    switch (cycle) {
      case "monthly":
        return "month";
      case "quarterly":
        return "quarter";
      case "annually":
        return "year";
    }
  };

  const getSavings = (plan: PricingPlan) => {
    const monthly = plan.pricing.monthly;
    const quarterly = plan.pricing.quarterly;
    const annually = plan.pricing.annually;

    if (billingCycle === "quarterly" && monthly > 0) {
      const monthlyCost = monthly * 3;
      const savings = Math.round(
        ((monthlyCost - quarterly) / monthlyCost) * 100,
      );
      return savings > 0 ? `Save ${savings}%` : null;
    }

    if (billingCycle === "annually" && monthly > 0) {
      const monthlyCost = monthly * 12;
      const savings = Math.round(
        ((monthlyCost - annually) / monthlyCost) * 100,
      );
      return savings > 0 ? `Save ${savings}%` : null;
    }

    return null;
  };

  const getCurrentPrice = (plan: PricingPlan) => {
    return plan.pricing[billingCycle];
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
              <LinkIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LinklyPro
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" onClick={() => navigate("/#features")}>
              Features
            </Button>
            <Button variant="ghost" className="text-blue-600">
              Pricing
            </Button>
            <Button variant="ghost" onClick={() => navigate("/#about")}>
              About
            </Button>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button onClick={() => navigate("/signup")}>Get Started</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            💰 14-day free trial on all paid plans
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Pricing
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. Start free and upgrade as
            you grow. All plans include our core features with no hidden costs.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span
              className={`text-sm font-medium ${billingCycle === "monthly" ? "text-gray-900" : "text-gray-500"}`}
            >
              Monthly
            </span>
            <Switch
              checked={billingCycle !== "monthly"}
              onCheckedChange={(checked) => {
                if (checked) {
                  setBillingCycle("annually");
                } else {
                  setBillingCycle("monthly");
                }
              }}
            />
            <span
              className={`text-sm font-medium ${billingCycle === "annually" ? "text-gray-900" : "text-gray-500"}`}
            >
              Annual
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setBillingCycle("quarterly")}
              className={
                billingCycle === "quarterly" ? "bg-blue-100 text-blue-700" : ""
              }
            >
              Quarterly
            </Button>
            {billingCycle === "annually" && (
              <Badge variant="default" className="bg-green-100 text-green-700">
                Save up to 35%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative overflow-hidden transition-all hover:shadow-xl ${
                plan.popular
                  ? "border-2 border-blue-500 shadow-lg scale-105"
                  : "border border-gray-200 hover:border-gray-300"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-medium">
                    <Star className="w-4 h-4 inline mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <CardHeader className={plan.popular ? "pt-12" : "pt-6"}>
                <div className="flex items-center space-x-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      plan.name === "Free"
                        ? "bg-gray-100 text-gray-600"
                        : plan.name === "Pro"
                          ? "bg-blue-100 text-blue-600"
                          : plan.name === "Business"
                            ? "bg-purple-100 text-purple-600"
                            : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {plan.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {plan.description}
                    </CardDescription>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold text-gray-900">
                      ${getCurrentPrice(plan)}
                    </span>
                    <span className="text-gray-500">
                      /{getBillingLabel(billingCycle)}
                    </span>
                  </div>
                  {getSavings(plan) && (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700"
                    >
                      {getSavings(plan)}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <Button
                  className={`w-full ${
                    plan.buttonVariant === "default"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      : ""
                  }`}
                  variant={plan.buttonVariant}
                  onClick={() =>
                    plan.name === "Enterprise"
                      ? navigate("/contact")
                      : navigate("/signup")
                  }
                >
                  {plan.buttonText}
                </Button>

                {/* Usage Limits */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">
                    What's included:
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Links</span>
                      <span className="font-medium">{plan.limits.links}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Clicks</span>
                      <span className="font-medium">{plan.limits.clicks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">QR Codes</span>
                      <span className="font-medium">{plan.limits.qrCodes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Analytics</span>
                      <span className="font-medium">
                        {plan.limits.analytics}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Custom Domains</span>
                      <span className="font-medium">
                        {plan.limits.customDomains}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Team Members</span>
                      <span className="font-medium">
                        {plan.limits.teamMembers}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Features:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start space-x-2 text-sm"
                      >
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-16">
          <div className="px-6 py-4 border-b">
            <h3 className="text-2xl font-bold text-gray-900">
              Feature Comparison
            </h3>
            <p className="text-gray-600">
              Compare all features across our pricing plans
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">
                    Features
                  </th>
                  <th className="text-center px-6 py-4 font-semibold text-gray-900">
                    Free
                  </th>
                  <th className="text-center px-6 py-4 font-semibold text-gray-900">
                    Pro
                  </th>
                  <th className="text-center px-6 py-4 font-semibold text-gray-900">
                    Business
                  </th>
                  <th className="text-center px-6 py-4 font-semibold text-gray-900">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  {
                    name: "URL Shortening",
                    free: true,
                    pro: true,
                    business: true,
                    enterprise: true,
                  },
                  {
                    name: "QR Code Generation",
                    free: true,
                    pro: true,
                    business: true,
                    enterprise: true,
                  },
                  {
                    name: "Basic Analytics",
                    free: true,
                    pro: true,
                    business: true,
                    enterprise: true,
                  },
                  {
                    name: "Password Protection",
                    free: false,
                    pro: true,
                    business: true,
                    enterprise: true,
                  },
                  {
                    name: "Custom Aliases",
                    free: false,
                    pro: true,
                    business: true,
                    enterprise: true,
                  },
                  {
                    name: "Advanced Analytics",
                    free: false,
                    pro: true,
                    business: true,
                    enterprise: true,
                  },
                  {
                    name: "Team Collaboration",
                    free: false,
                    pro: false,
                    business: true,
                    enterprise: true,
                  },
                  {
                    name: "API Access",
                    free: false,
                    pro: false,
                    business: true,
                    enterprise: true,
                  },
                  {
                    name: "Custom Domains",
                    free: false,
                    pro: "3",
                    business: "10",
                    enterprise: "Unlimited",
                  },
                  {
                    name: "White-label",
                    free: false,
                    pro: false,
                    business: true,
                    enterprise: true,
                  },
                  {
                    name: "SSO Integration",
                    free: false,
                    pro: false,
                    business: true,
                    enterprise: true,
                  },
                  {
                    name: "24/7 Phone Support",
                    free: false,
                    pro: false,
                    business: false,
                    enterprise: true,
                  },
                ].map((feature, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {feature.name}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof feature.free === "boolean" ? (
                        feature.free ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-gray-600">
                          {feature.free}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof feature.pro === "boolean" ? (
                        feature.pro ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-gray-600">
                          {feature.pro}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof feature.business === "boolean" ? (
                        feature.business ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-gray-600">
                          {feature.business}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof feature.enterprise === "boolean" ? (
                        feature.enterprise ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-gray-600">
                          {feature.enterprise}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">Got questions? We've got answers.</p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "What happens when I exceed my plan limits?",
                answer:
                  "We'll notify you when you approach your limits. You can upgrade anytime to continue service without interruption.",
              },
              {
                question: "Can I change plans anytime?",
                answer:
                  "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately with prorated billing.",
              },
              {
                question: "Do you offer discounts for non-profits?",
                answer:
                  "Yes, we offer special pricing for qualified non-profit organizations. Contact our sales team for details.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept all major credit cards, PayPal, and can arrange wire transfers for Enterprise customers.",
              },
              {
                question: "Is there a free trial?",
                answer:
                  "Yes! All paid plans come with a 14-day free trial. No credit card required to start.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust LinklyPro for their URL
              shortening needs.
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
                className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600"
                onClick={() => window.open('mailto:ayushd785@gmail.com?subject=Enterprise Plan Inquiry&body=Hi, I am interested in the Enterprise plan. Please provide more details.', '_blank')}
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
