import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      description: 'Perfect for getting started',
      features: ['Up to 50 menu items', '1 QR code', 'Basic analytics', 'Email support'],
      cta: 'Start Free Trial',
      popular: false
    },
    {
      name: 'Professional',
      price: '₨2,999',
      period: '/month',
      description: 'Most popular for growing restaurants',
      features: ['Unlimited menu items', 'Unlimited QR codes', 'Advanced analytics', 'Up to 3 staff accounts', 'Priority support', 'Custom branding'],
      cta: 'Get Started',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large restaurant chains',
      features: ['Everything in Professional', 'Multi-branch management', 'API access', 'Dedicated account manager', '24/7 phone support', 'Custom integrations'],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600">Choose the perfect plan for your restaurant</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-md overflow-hidden transition transform hover:scale-105 ${
                plan.popular ? 'ring-2 ring-red-600 md:scale-105' : ''
              } bg-white`}
            >
              {plan.popular && (
                <div className="bg-red-600 text-white py-2 px-4 text-center text-sm font-bold">
                  MOST POPULAR
                </div>
              )}
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h2>
                <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="text-gray-600">{plan.period}</span>}
                </div>
                <Link
                  to="/register"
                  className={`block text-center py-3 rounded-lg font-bold mb-8 transition ${
                    plan.popular
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'border-2 border-red-600 text-red-600 hover:bg-red-50'
                  }`}
                >
                  {plan.cta}
                </Link>
                <div className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center">
                      <Check className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-md p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Have questions about pricing?</h2>
          <p className="text-gray-600 mb-6">Contact our sales team for a custom quote or to discuss your specific needs.</p>
          <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 font-bold">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;