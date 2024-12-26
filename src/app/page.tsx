'use client';

import { useState, useEffect } from 'react';
import { 
  Zap, ArrowRight, Dumbbell, 
  Moon, Car, BookOpen, Home, 
  Heart, Target, CheckCircle,
  Menu, X, Info, Bell, Settings,
  Plus
} from 'lucide-react';

// Einfache Alert-Komponente
const Alert = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-4 rounded-lg flex items-center space-x-2 ${className}`}>
    {children}
  </div>
);

// Rest der Typdefinitionen bleiben gleich...
interface CarOption {
  name: string;
  image: string;
  price: number;
}

interface Habit {
  id: number;
  name: string;
  cost: number;
}

interface NewHabit {
  name: string;
  cost: string;
}

// Konstanten
const carOptions: CarOption[] = [
  { 
    name: "BMW M3", 
    image: "/api/placeholder/400/300",
    price: 85000 
  },
  { 
    name: "BMW M550", 
    image: "/api/placeholder/400/300",
    price: 92000 
  },
];

const defaultHabits: Habit[] = [
  { id: 1, name: "Energy Drinks", cost: 90 },
  { id: 2, name: "Zigaretten", cost: 200 }
];

const Navigation = ({ 
  activeTab, 
  setActiveTab, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}) => (
  <header className="bg-emerald-900/50 backdrop-blur-sm fixed w-full top-0 z-50 border-b border-emerald-800/50">
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setActiveTab("home")}
        >
          <Home className="w-6 h-6 text-emerald-400" />
          <span className="font-bold text-xl text-white">Transformations-App</span>
        </div>

        <nav className="hidden md:flex space-x-4">
          {["home", "routine", "transformation"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === tab 
                  ? "bg-emerald-600 text-white" 
                  : "text-emerald-200 hover:bg-emerald-800"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>

        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-emerald-800"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <nav className="md:hidden py-4 space-y-2">
          {["home", "routine", "transformation"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full px-4 py-2 rounded-lg transition-all ${
                activeTab === tab 
                  ? "bg-emerald-600 text-white" 
                  : "text-emerald-200 hover:bg-emerald-800"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      )}
    </div>
  </header>
);

const HabitManager = ({
  habits,
  setHabits,
  newHabit,
  setNewHabit
}: {
  habits: Habit[];
  setHabits: (habits: Habit[]) => void;
  newHabit: NewHabit;
  setNewHabit: (habit: NewHabit) => void;
}) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddHabit = () => {
    if (newHabit.name && newHabit.cost) {
      setHabits([...habits, { 
        id: Date.now(),
        name: newHabit.name,
        cost: Number(newHabit.cost)
      }]);
      setNewHabit({ name: "", cost: "" });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="bg-emerald-900/30 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-emerald-300">Gewohnheiten & Ersparnisse</h3>
        <button
          className="p-2 hover:bg-emerald-800 rounded-full"
          title="Hier kannst du Gewohnheiten eintragen, die du aufgeben möchtest"
        >
          <Info className="w-5 h-5 text-emerald-400" />
        </button>
      </div>

      {showSuccess && (
        <Alert className="mb-4 bg-emerald-800/50 border border-emerald-500">
          <CheckCircle className="w-4 h-4 text-emerald-500" />
          <span>Gewohnheit erfolgreich hinzugefügt!</span>
        </Alert>
      )}
      
      <div className="space-y-3 mb-6">
        {habits.map(habit => (
          <div 
            key={habit.id} 
            className="flex items-center justify-between bg-emerald-900/20 p-4 rounded-lg
                     hover:bg-emerald-800/30 transition-colors"
          >
            <span className="text-emerald-100">{habit.name}</span>
            <div className="flex items-center space-x-4">
              <span className="text-emerald-400 font-bold">{habit.cost} €</span>
              <button 
                onClick={() => setHabits(habits.filter(h => h.id !== habit.id))}
                className="text-red-400 hover:text-red-300 p-1 rounded-full
                         hover:bg-red-900/20 transition-colors"
                title="Gewohnheit entfernen"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-emerald-300 flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Neue Gewohnheit</span>
        </h4>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            placeholder="Name der Gewohnheit"
            value={newHabit.name}
            onChange={(e) => setNewHabit({...newHabit, name: e.target.value})}
            className="flex-1 bg-emerald-900/20 p-3 rounded-lg border border-emerald-800
                     focus:border-emerald-600 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Monatliche Kosten (€)"
            value={newHabit.cost}
            onChange={(e) => setNewHabit({...newHabit, cost: e.target.value})}
            className="md:w-48 bg-emerald-900/20 p-3 rounded-lg border border-emerald-800
                     focus:border-emerald-600 focus:outline-none"
          />
        </div>
        <button
          onClick={handleAddHabit}
          disabled={!newHabit.name || !newHabit.cost}
          className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-900
                   disabled:cursor-not-allowed text-white p-3 rounded-lg transition-colors"
        >
          Hinzufügen
        </button>
      </div>

      <div className="mt-6 pt-6 border-t border-emerald-800">
        <div className="flex justify-between items-center">
          <span className="text-emerald-300">Gesamtersparnis pro Monat:</span>
          <span className="text-2xl font-bold text-emerald-400">
            {habits.reduce((sum, habit) => sum + habit.cost, 0)} €
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [prayerTimes, setPrayerTimes] = useState<Record<string, string> | null>(null);
  const [selectedCar, setSelectedCar] = useState<CarOption>(carOptions[0]);
  const [activeTab, setActiveTab] = useState<string>("home");
  const [randomAyat, setRandomAyat] = useState<any>(null);
  const [habits, setHabits] = useState<Habit[]>(defaultHabits);
  const [newHabit, setNewHabit] = useState<NewHabit>({ name: "", cost: "" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(true);

  // ... Rest der Komponenten-Logik ...

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 to-slate-900 text-white">
      {showOnboarding && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-emerald-900 rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Willkommen!</h2>
            <p className="mb-6 text-emerald-100">
              Diese App hilft dir dabei, deine Transformation zu tracken und deine Ziele zu erreichen.
            </p>
            <button
              onClick={() => setShowOnboarding(false)}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-lg"
            >
              Los geht's!
            </button>
          </div>
        </div>
      )}
      
      <Navigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="max-w-6xl mx-auto px-4 pt-20 pb-8">
        <HabitManager 
          habits={habits}
          setHabits={setHabits}
          newHabit={newHabit}
          setNewHabit={setNewHabit}
        />
      </main>
    </div>
  );
}
