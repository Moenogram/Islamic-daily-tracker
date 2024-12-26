'use client';

import { useState, useEffect } from 'react';
import { 
  Zap, ArrowRight, Dumbbell, 
  Moon, Car, BookOpen, Home, 
  Heart, Target, CheckCircle,
  Menu, X, Info, Bell, Settings,
  Plus
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Typdefinitionen
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

// Komponenten
interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const Navigation = ({ 
  activeTab, 
  setActiveTab, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}: NavigationProps) => {
  // ... Rest des Navigation-Codes bleibt gleich ...
};

interface HabitManagerProps {
  habits: Habit[];
  setHabits: (habits: Habit[]) => void;
  newHabit: NewHabit;
  setNewHabit: (habit: NewHabit) => void;
}

const HabitManager = ({
  habits,
  setHabits,
  newHabit,
  setNewHabit
}: HabitManagerProps) => {
  // ... Rest des HabitManager-Codes bleibt gleich ...
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

  // ... Rest der Komponenten-Logik bleibt gleich ...

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 to-slate-900 text-white">
      {showOnboarding && renderOnboarding()}
      
      <Navigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="max-w-6xl mx-auto px-4 pt-20 pb-8">
        {/* Bestehende render-Funktionen bleiben gleich */}
      </main>
    </div>
  );
}
