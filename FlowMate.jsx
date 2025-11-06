import React, { useState } from 'react';
import { Heart, MessageCircle, Calendar, Sparkles, Apple, Activity, Phone, AlertCircle, Lock, CreditCard, Menu, X, Send, ChevronLeft, ChevronRight } from 'lucide-react';

const FlowMate = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [showLogin, setShowLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState('menstrual');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hi! I am FlowMate, your personal wellness companion. How are you feeling today? 💕' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [showEmergency, setShowEmergency] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [trackedDates, setTrackedDates] = useState({
    periodDays: [1, 2, 3, 4, 5],
    symptoms: {},
    notes: {}
  });

  const cyclePhases = {
    menstrual: {
      name: 'Menstrual Phase',
      icon: '🌙',
      color: 'from-pink-400 to-pink-600',
      days: 'Day 1-5',
      description: 'Your period days - time for rest and self-care'
    },
    follicular: {
      name: 'Follicular Phase',
      icon: '🌱',
      color: 'from-green-400 to-green-600',
      days: 'Day 6-14',
      description: 'Energy rising - great time for new projects'
    },
    ovulation: {
      name: 'Ovulation Phase',
      icon: '☀️',
      color: 'from-yellow-400 to-orange-500',
      days: 'Day 15-17',
      description: 'Peak energy and confidence - you are glowing!'
    },
    luteal: {
      name: 'Luteal Phase',
      icon: '🍂',
      color: 'from-purple-400 to-pink-500',
      days: 'Day 18-28',
      description: 'Winding down - time for comfort and care'
    }
  };

  const affirmations = {
    menstrual: [
      'I honor my body need for rest 🌙',
      'I am gentle and patient with myself 💕',
      'This is a time of renewal and reflection ✨',
      'My body is doing amazing work right now 🌸'
    ],
    follicular: [
      'I am full of creative energy 🌟',
      'New opportunities are coming my way 🌱',
      'I embrace this fresh start with confidence 💪',
      'My energy is growing stronger each day ✨'
    ],
    ovulation: [
      'I am radiant and powerful ☀️',
      'I communicate my needs with clarity 💬',
      'I am at my peak and I shine bright ⭐',
      'I am confident and unstoppable 🔥'
    ],
    luteal: [
      'I listen to what my body needs 🍂',
      'I give myself permission to slow down 💜',
      'I am worthy of comfort and care 🤗',
      'I honor my emotions and feelings 💕'
    ]
  };

  const foodRecommendations = {
    menstrual: [
      { name: 'Dark Chocolate', benefit: 'Reduces cramps & boosts mood', icon: '🍫' },
      { name: 'Leafy Greens', benefit: 'Replenishes iron', icon: '🥬' },
      { name: 'Ginger Tea', benefit: 'Eases bloating & nausea', icon: '🫖' },
      { name: 'Salmon', benefit: 'Anti-inflammatory omega-3', icon: '🐟' }
    ],
    follicular: [
      { name: 'Berries', benefit: 'Antioxidants for energy', icon: '🫐' },
      { name: 'Eggs', benefit: 'Protein for muscle building', icon: '🥚' },
      { name: 'Whole Grains', benefit: 'Sustained energy', icon: '🌾' },
      { name: 'Avocado', benefit: 'Healthy fats', icon: '🥑' }
    ],
    ovulation: [
      { name: 'Raw Vegetables', benefit: 'Support detoxification', icon: '🥕' },
      { name: 'Citrus Fruits', benefit: 'Vitamin C boost', icon: '🍊' },
      { name: 'Nuts & Seeds', benefit: 'Energy & fiber', icon: '🌰' },
      { name: 'Quinoa', benefit: 'Complete protein', icon: '🍚' }
    ],
    luteal: [
      { name: 'Sweet Potato', benefit: 'Stable blood sugar', icon: '🍠' },
      { name: 'Bananas', benefit: 'Reduces bloating', icon: '🍌' },
      { name: 'Herbal Tea', benefit: 'Calming & soothing', icon: '☕' },
      { name: 'Pumpkin Seeds', benefit: 'Magnesium for mood', icon: '🎃' }
    ]
  };

  const activities = {
    menstrual: [
      { name: 'Gentle Yoga', benefit: 'Relieves cramps', icon: '🧘‍♀️' },
      { name: 'Light Walking', benefit: 'Boosts circulation', icon: '🚶‍♀️' },
      { name: 'Meditation', benefit: 'Reduces stress', icon: '🌸' },
      { name: 'Warm Bath', benefit: 'Muscle relaxation', icon: '🛁' }
    ],
    follicular: [
      { name: 'Cardio Workout', benefit: 'Peak energy use', icon: '🏃‍♀️' },
      { name: 'Dance Class', benefit: 'Fun & energizing', icon: '💃' },
      { name: 'Hiking', benefit: 'Connect with nature', icon: '⛰️' },
      { name: 'Strength Training', benefit: 'Build muscle', icon: '💪' }
    ],
    ovulation: [
      { name: 'HIIT Training', benefit: 'Maximum performance', icon: '🔥' },
      { name: 'Social Activities', benefit: 'You are glowing!', icon: '👯‍♀️' },
      { name: 'Challenging Workout', benefit: 'Push your limits', icon: '🏋️‍♀️' },
      { name: 'Group Sports', benefit: 'Team energy', icon: '⚽' }
    ],
    luteal: [
      { name: 'Pilates', benefit: 'Gentle strength', icon: '🤸‍♀️' },
      { name: 'Stretching', benefit: 'Flexibility & calm', icon: '🧘‍♀️' },
      { name: 'Swimming', benefit: 'Low-impact cardio', icon: '🏊‍♀️' },
      { name: 'Journaling', benefit: 'Emotional release', icon: '📝' }
    ]
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('suicid') || message.includes('kill myself') || message.includes('end it') || message.includes('die')) {
      setShowEmergency(true);
      return 'I am really concerned about you. You are not alone, and help is available. I am connecting you with a crisis counselor right now. Please click the "Get Immediate Help" button below. Your life matters. 💕';
    }
    
    if (message.includes('sad') || message.includes('depressed') || message.includes('down')) {
      return 'I hear you, and your feelings are valid. 💙 Would you like to talk to a counselor? Or would some calming activities help? Remember, it is okay not to be okay.';
    }
    
    if (message.includes('anxious') || message.includes('worried') || message.includes('scared')) {
      return 'It sounds like you are feeling anxious. Let us try some deep breathing together. 🌬️ Would you like me to guide you through a calming exercise? Or connect you with support?';
    }
    
    if (message.includes('cramp') || message.includes('pain') || message.includes('hurt')) {
      return 'I am sorry you are experiencing pain. 💕 Try: \n• Heating pad on your lower abdomen\n• Gentle stretching or yoga\n• Ginger tea\n• Ibuprofen if needed\nWould you like more pain management tips?';
    }
    
    if (message.includes('food') || message.includes('eat') || message.includes('hungry')) {
      return 'Great question! Based on your current cycle phase, I recommend checking the "Healthy Foods" section. 🍎 Would you like specific meal ideas for today?';
    }
    
    if (message.includes('exercise') || message.includes('workout') || message.includes('activity')) {
      return 'Movement is wonderful! Check out the Activities section for phase-specific recommendations. 💪 What type of exercise do you enjoy?';
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
      return 'You are so welcome! I am here for you anytime. 💕 Is there anything else I can help you with?';
    }
    
    return 'I am here to support you! 💕 You can ask me about:\n• Cycle symptoms & advice\n• Food recommendations\n• Exercise ideas\n• Emotional support\n• Or just chat - I am listening! 🌸';
  };

  const handleChatSend = () => {
    if (chatInput.trim()) {
      const userMsg = { sender: 'user', text: chatInput };
      setChatMessages([...chatMessages, userMsg]);
      
      setTimeout(() => {
        const botResponse = { sender: 'bot', text: getBotResponse(chatInput) };
        setChatMessages(prev => [...prev, botResponse]);
      }, 1000);
      
      setChatInput('');
    }
  };

  const LoginForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-pink-600">
            {isSignUp ? 'Join FlowMate' : 'Welcome Back'}
          </h2>
          <button onClick={() => setShowLogin(false)} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-4">
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none"
          />
          
          <button
            onClick={() => {
              setIsLoggedIn(true);
              setShowLogin(false);
            }}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
          
          <p className="text-center text-gray-600">
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-pink-500 font-semibold hover:underline"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  const EmergencyModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={40} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">We are Here For You</h2>
          <p className="text-gray-600">You don't have to go through this alone</p>
        </div>
        
        <div className="space-y-4">
          <button className="w-full bg-red-500 text-white py-4 rounded-xl font-semibold hover:bg-red-600 transition-all flex items-center justify-center gap-2">
            <Phone size={20} />
            Call Crisis Counselor Now
          </button>
          
          <button className="w-full bg-purple-500 text-white py-4 rounded-xl font-semibold hover:bg-purple-600 transition-all flex items-center justify-center gap-2">
            <MessageCircle size={20} />
            Start Confidential Chat
          </button>
          
          <div className="bg-pink-50 p-4 rounded-xl">
            <p className="text-sm text-gray-700 mb-2 font-semibold">24/7 Crisis Hotlines (Kenya):</p>
            <p className="text-sm text-gray-600 mb-1">🇰🇪 Emergency Medicine Kenya Foundation (EMKF)</p>
            <p className="text-sm font-bold text-pink-600 mb-3">📞 0800 723 253</p>
            
            <p className="text-sm text-gray-600 mb-1">💭 Mental 360 - Conversations save lives</p>
            <p className="text-sm font-bold text-pink-600 mb-3">📞 +254 710 360 360</p>
            
            <p className="text-sm text-gray-600 mb-1">👶 Childline Kenya (for children & youth)</p>
            <p className="text-sm font-bold text-pink-600 mb-3">📞 116</p>
            
            <p className="text-sm text-gray-600 mb-1">🇺🇸 International: 988 Suicide & Crisis Lifeline</p>
            <p className="text-sm text-gray-600">📱 Crisis Text: HOME to 741741</p>
          </div>
          
          <button
            onClick={() => setShowEmergency(false)}
            className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all"
          >
            Return to App
          </button>
        </div>
      </div>
    </div>
  );

  const HomeView = () => (
    <div className="space-y-6">
      <div className={`bg-gradient-to-r ${cyclePhases[selectedCycle].color} rounded-3xl p-8 text-white shadow-xl`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">{cyclePhases[selectedCycle].name}</h2>
            <p className="text-white/90">{cyclePhases[selectedCycle].days}</p>
          </div>
          <div className="text-6xl">{cyclePhases[selectedCycle].icon}</div>
        </div>
        <p className="text-white/90 text-lg">{cyclePhases[selectedCycle].description}</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {Object.keys(cyclePhases).map((phase) => (
          <button
            key={phase}
            onClick={() => setSelectedCycle(phase)}
            className={`p-3 rounded-xl text-center transition-all ${
              selectedCycle === phase
                ? 'bg-pink-500 text-white shadow-lg scale-105'
                : 'bg-white text-gray-600 hover:bg-pink-50'
            }`}
          >
            <div className="text-2xl mb-1">{cyclePhases[phase].icon}</div>
            <div className="text-xs font-semibold capitalize">{phase}</div>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Sparkles className="text-pink-500" /> Daily Affirmations
        </h3>
        <div className="space-y-3">
          {affirmations[selectedCycle].map((affirmation, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl border-l-4 border-pink-400 hover:shadow-md transition-all cursor-pointer"
            >
              <p className="text-gray-700 font-medium">{affirmation}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setCurrentView('chat')}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-center"
        >
          <MessageCircle size={32} className="text-pink-500 mx-auto mb-2" />
          <p className="font-semibold text-gray-800">Chat with FlowMate</p>
        </button>
        <button
          onClick={() => setShowEmergency(true)}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-center"
        >
          <Phone size={32} className="text-purple-500 mx-auto mb-2" />
          <p className="font-semibold text-gray-800">Need Support?</p>
        </button>
      </div>
    </div>
  );

  const FoodsView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Apple className="text-pink-500" /> Recommended Foods
        </h2>
        <p className="text-gray-600 mb-6">For your {cyclePhases[selectedCycle].name.toLowerCase()}</p>
        
        <div className="grid gap-4">
          {foodRecommendations[selectedCycle].map((food, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl hover:shadow-md transition-all">
              <div className="text-4xl">{food.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{food.name}</h3>
                <p className="text-sm text-gray-600">{food.benefit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ActivitiesView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Activity className="text-pink-500" /> Suggested Activities
        </h2>
        <p className="text-gray-600 mb-6">Perfect for your {cyclePhases[selectedCycle].name.toLowerCase()}</p>
        
        <div className="grid gap-4">
          {activities[selectedCycle].map((activity, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl hover:shadow-md transition-all cursor-pointer">
              <div className="text-4xl">{activity.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{activity.name}</h3>
                <p className="text-sm text-gray-600">{activity.benefit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ChatView = () => (
    <div className="bg-white rounded-3xl shadow-lg flex flex-col h-[600px]">
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-6 rounded-t-3xl text-white">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MessageCircle size={28} />
          Chat with FlowMate AI
        </h2>
        <p className="text-sm text-white/80 mt-1">I am here to listen and support you 💕</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {chatMessages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${
              msg.sender === 'user'
                ? 'bg-pink-500 text-white rounded-br-none'
                : 'bg-gray-100 text-gray-800 rounded-bl-none'
            }`}>
              <p className="whitespace-pre-line">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t-2 border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none"
          />
          <button
            onClick={handleChatSend}
            className="bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600 transition-all"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );

  const PremiumView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-8 text-white shadow-xl">
        <div className="text-center">
          <Sparkles size={48} className="mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">FlowMate Premium</h2>
          <p className="text-white/90 mb-6">Unlock advanced features for complete wellness</p>
          <div className="text-5xl font-bold mb-2">$9.99<span className="text-2xl">/month</span></div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Premium Features:</h3>
        <div className="space-y-4">
          {[
            '24/7 Access to Licensed Therapists',
            'Advanced AI Emotional Analysis',
            'Personalized Meal Plans & Recipes',
            'Custom Workout Programs',
            'Fertility Tracking & Insights',
            'Partner Cycle Sync',
            'Ad-Free Experience',
            'Priority Support',
            'Export Health Reports'
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-pink-50 rounded-xl">
              <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
              <p className="text-gray-700 font-medium">{feature}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsPremium(true)}
          className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
        >
          Upgrade to Premium
        </button>
      </div>
    </div>
  );

  const CalendarView = () => {
    const getDaysInMonth = (date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];

    const previousMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const nextMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const getCyclePhase = (day) => {
      if (day >= 1 && day <= 5) return 'menstrual';
      if (day >= 6 && day <= 14) return 'follicular';
      if (day >= 15 && day <= 17) return 'ovulation';
      if (day >= 18 && day <= 28) return 'luteal';
      return null;
    };

    const getPhaseColor = (phase) => {
      const colors = {
        menstrual: 'bg-pink-200 border-pink-400',
        follicular: 'bg-green-200 border-green-400',
        ovulation: 'bg-yellow-200 border-yellow-400',
        luteal: 'bg-purple-200 border-purple-400'
      };
      return colors[phase] || 'bg-white';
    };

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const phase = getCyclePhase(day);
      const isToday = day === new Date().getDate() && 
                      currentDate.getMonth() === new Date().getMonth() &&
                      currentDate.getFullYear() === new Date().getFullYear();

      days.push(
        <div
          key={day}
          className={`p-2 min-h-20 border-2 rounded-lg cursor-pointer hover:shadow-md transition-all ${
            phase ? getPhaseColor(phase) : 'bg-white border-gray-200'
          } ${isToday ? 'ring-2 ring-pink-500' : ''}`}
        >
          <div className="font-bold text-gray-800 mb-1">{day}</div>
          {phase && (
            <div className="text-xs">
              {cyclePhases[phase].icon}
            </div>
          )}
          {trackedDates.periodDays.includes(day) && (
            <div className="text-xs text-pink-600 font-semibold">Period</div>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-pink-50 rounded-full transition-all"
            >
              <ChevronLeft size={24} className="text-pink-500" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-pink-50 rounded-full transition-all"
            >
              <ChevronRight size={24} className="text-pink-500" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-semibold text-gray-600 text-sm p-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="text-pink-500" /> Cycle Legend
          </h3>
          <div className="space-y-3">
            {Object.entries(cyclePhases).map(([key, phase]) => (
              <div key={key} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="text-3xl">{phase.icon}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">{phase.name}</h4>
                  <p className="text-sm text-gray-600">{phase.days} - {phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl p-6 text-white shadow-lg">
          <h3 className="text-xl font-bold mb-3">Quick Tips for Tracking:</h3>
          <ul className="space-y-2 text-sm">
            <li>✓ Log your period start date each month</li>
            <li>✓ Track symptoms and mood changes</li>
            <li>✓ Note physical changes throughout your cycle</li>
            <li>✓ Average cycle is 28 days (yours may vary)</li>
            <li>✓ Predict your next period for better planning</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200">
      {showLogin && <LoginForm />}
      {showEmergency && <EmergencyModal />}

      <div className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                F
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">FlowMate</h1>
                <p className="text-xs text-gray-500">Your Wellness Companion</p>
              </div>
            </div>
            
            {!isLoggedIn ? (
              <button
                onClick={() => setShowLogin(true)}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Sign In
              </button>
            ) : (
              <div className="flex items-center gap-2">
                {isPremium && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ⭐ PREMIUM
                  </span>
                )}
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {!isLoggedIn ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-6xl mx-auto mb-6">
              💕
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to FlowMate</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Your AI-powered companion for menstrual wellness, emotional support, and holistic health
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-12 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
            >
              Get Started <Heart size={24} />
            </button>
          </div>
        ) : (
          <>
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {[
                { id: 'home', label: 'Home', icon: Heart },
                { id: 'calendar', label: 'Calendar', icon: Calendar },
                { id: 'foods', label: 'Foods', icon: Apple },
                { id: 'activities', label: 'Activities', icon: Activity },
                { id: 'chat', label: 'Chat', icon: MessageCircle },
                { id: 'premium', label: 'Premium', icon: Sparkles }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCurrentView(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                    currentView === tab.id
                      ? 'bg-pink-500 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-pink-50'
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>

            {currentView === 'home' && <HomeView />}
            {currentView === 'calendar' && <CalendarView />}
            {currentView === 'foods' && <FoodsView />}
            {currentView === 'activities' && <ActivitiesView />}
            {currentView === 'chat' && <ChatView />}
            {currentView === 'premium' && <PremiumView />}
          </>
        )}
      </div>
    </div>
  );
};

export default FlowMate;