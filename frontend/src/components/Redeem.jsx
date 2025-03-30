import React, { useState, useContext } from 'react';
import { CreditCard } from 'lucide-react';
import { UserTokenContext } from "../pages/DashboardLayout";

const REWARDS = [
  { id: 1, name: 'Eco-Friendly Water Bottle', description: 'Reusable water bottle made from recycled materials', tokenCost: 50, image: '🍶', category: 'Products' },
  { id: 2, name: 'Recycled Tote Bag', description: 'Sturdy tote bag created from recycled plastic', tokenCost: 10, image: '👜', category: 'Products' },
  { id: 3, name: 'Local Café Discount', description: '15% off at participating eco-friendly cafés', tokenCost: 80, image: '☕', category: 'Discounts' },
  { id: 4, name: 'Public Transit Pass', description: 'One-day pass for local public transportation', tokenCost: 20, image: '🚌', category: 'Services' },
  { id: 5, name: 'Tree Planting Donation', description: "We'll plant a tree on your behalf", tokenCost: 50, image: '🌳', category: 'Donations' },
  { id: 6, name: 'Reusable Straw Set', description: 'Set of metal straws with cleaning brush', tokenCost: 10, image: '🥤', category: 'Products' },
];

const RewardCard = ({ reward, onRedeem, userPoints }) => {
  const canRedeem = userPoints >= reward.tokenCost;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{reward.name}</h3>
          <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            {reward.category}
          </span>
        </div>
        <div className="text-4xl">{reward.image}</div>
      </div>
      <p className="mt-2 text-sm text-gray-600">{reward.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center text-green-600 font-bold">
          <CreditCard className="h-4 w-4 mr-1" />
          <span>{reward.tokenCost} tokens</span>
        </div>
        <button
          onClick={() => onRedeem(reward)}
          disabled={!canRedeem}
          className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
            canRedeem ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {canRedeem ? 'Redeem' : 'Not Enough Tokens'}
        </button>
      </div>
    </div>
  );
};

const Redeem = () => {
  const context = useContext(UserTokenContext);
  const userData = context?.userData ?? { points: 0 };
  const setUserData = context?.setUserData ?? (() => {}); // No-op function if `setUserData` is missing

  const [activeCategory, setActiveCategory] = useState('All');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);

  const categories = ['All', ...new Set(REWARDS.map(reward => reward.category))];
  const filteredRewards = activeCategory === 'All' ? REWARDS : REWARDS.filter(reward => reward.category === activeCategory);

  const handleRedeem = (reward) => {
    setSelectedReward(reward);
    setShowConfirmation(true);
  };

  const confirmRedeem = () => {
    if (!selectedReward) return;
    setUserData(prevUserData => ({
      ...prevUserData,
      points: Math.max(0, prevUserData?.points - selectedReward.tokenCost),
    }));
    setShowConfirmation(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Redeem Rewards</h1>
            <div className="bg-white px-4 py-1 rounded-full shadow-sm text-sm text-green-600 font-medium flex items-center">
              <CreditCard className="h-4 w-4 mr-1" />
              {userData?.points ?? 0} tokens available
            </div>
          </div>
          <div className="mb-6 overflow-x-auto pb-2 scrollbar-hide flex space-x-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
                  activeCategory === category ? 'bg-green-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRewards.map(reward => (
              <RewardCard key={reward.id} reward={reward} onRedeem={handleRedeem} userPoints={userData?.points ?? 0} />
            ))}
          </div>
        </div>
      </main>
      {showConfirmation && selectedReward && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Redemption</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to redeem <span className="font-medium">{selectedReward.name}</span> for {selectedReward.tokenCost} tokens?
            </p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowConfirmation(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={confirmRedeem} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Redeem;
