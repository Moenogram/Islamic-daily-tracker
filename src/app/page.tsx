'use client';

import { useState, useEffect } from 'react';
import { 
  Zap, ArrowRight, Dumbbell, 
  Moon, Car, BookOpen, Home, 
  Heart, Target, CheckCircle,
  Menu, X, Info, Bell, Settings,
  Plus, Clock, AlertTriangle
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

// Tagesplan Struktur
const dailySchedule = [
  {
    blockTitle: "Früher Morgen",
    activities: [
      { time: "05:00 - 05:05", title: "Aufwachen und Bittgebet (Du'a)" },
      { time: "05:05 - 05:10", title: "Kalte Dusche (Belebend, gut für den Kreislauf)" },
      { time: "05:10 - 05:15", title: "Rückenschonende Dehnübungen" },
      { time: "05:15 - 05:25", title: "Wudu (Gebetswaschung) für das Morgengebet (Fajr)" },
      { time: "05:25 - 05:35", title: "Fajr-Gebet" },
      { time: "05:35 - 05:50", title: "Koran lesen (z.B. 2 Seiten), Hadith studieren" },
      { time: "05:50 - 06:00", title: "Tagesplanung / Journaling" },
    ]
  },
  {
    blockTitle: "Vormittag",
    activities: [
      { time: "06:00 - 06:30", title: "Frühstück (bzw. Suhur, falls Ramadan)" },
      { time: "06:30 - 08:00", title: "Freizeit: Lesen, kurze Sporteinheit" },
      { time: "08:00 - 08:15", title: "Wudu oder Vorbereitung auf Arbeit" },
      { time: "08:15 - 08:30", title: "Check E-Mails / Arbeitsvorbereitung" },
    ]
  },
  {
    blockTitle: "Arbeitszeit",
    activities: [
      { time: "08:30 - 12:00", title: "Arbeit: Fokus, Aufgaben erledigen" },
      { time: "12:00 - 12:05", title: "Wudu für Dhuhr" },
      { time: "12:05 - 12:15", title: "Dhuhr-Gebet" },
      { time: "12:15 - 12:45", title: "Mittagspause - während Ramadan: Koran lesen" },
      { time: "12:45 - 13:00", title: "Dehnübungen / Spaziergang" },
      { time: "13:00 - 16:15", title: "Arbeit fortsetzen" },
      { time: "16:15 - 16:20", title: "Wudu für Asr" },
      { time: "16:20 - 16:30", title: "Asr-Gebet" },
    ]
  },
  {
    blockTitle: "Nach der Arbeit",
    activities: [
      { time: "16:30 - 17:00", title: "Tagesreview + Finanzcheck" },
      { time: "17:00 - 18:00", title: "Fitnessstudio / Sport" },
      { time: "18:00 - 18:05", title: "Wudu für Maghrib" },
      { time: "18:05 - 18:15", title: "Maghrib-Gebet" },
      { time: "18:15 - 19:00", title: "Essen / Kochen" },
      { time: "19:00 - 19:30", title: "Koran oder Hadithe lesen" },
      { time: "19:30 - 20:00", title: "Berufliche Weiterbildung" },
    ]
  },
  {
    blockTitle: "Abend",
    activities: [
      { time: "20:00 - 20:05", title: "Wudu für Isha" },
      { time: "20:05 - 20:15", title: "Isha-Gebet" },
      { time: "20:15 - 21:30", title: "Freizeit (Anime, Familie)" },
      { time: "21:30 - 22:00", title: "Rückenschonende Übungen, Dusche" },
      { time: "22:00 - 22:10", title: "Plan für morgen checken / Du'a" },
      { time: "22:10 - 05:00", title: "Schlaf (7-8 Stunden)" },
    ]
  }
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

// Helfer-Funktion für die Zeitberechnung
const getTaskStatus = (timeString: string): 'upcoming' | 'ongoing' | 'missed' | 'completed' => {
  const now = new Date();
  const [startTime, endTime] = timeString.split('-').map(t => {
    const [hours, minutes] = t.trim().split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0);
    return date;
  });

  if (now < startTime) return 'upcoming';
  if (now >= startTime && now <= endTime) return 'ongoing';
  return 'missed';
};

// TaskCard Komponente für einzelne Aufgaben
const TaskCard = ({ 
  task, 
  status 
}: { 
  task: { time: string; title: string; }; 
  status: 'upcoming' | 'ongoing' | 'missed' | 'completed';
}) => {
  const statusStyles = {
    upcoming: 'border-emerald-600/30 bg-emerald-900/10',
    ongoing: 'border-yellow-600/30 bg-yellow-900/10',
    missed: 'border-red-600/30 bg-red-900/10',
    completed: 'border-blue-600/30 bg-blue-900/10'
  };

  const statusIcons = {
    upcoming: <Clock className="w-5 h-5 text-emerald-400" />,
    ongoing: <Zap className="w-5 h-5 text-yellow-400" />,
    missed: <AlertTriangle className="w-5 h-5 text-red-400" />,
    completed: <CheckCircle className="w-5 h-5 text-blue-400" />
  };

  return (
    <div className={`p-4 rounded-lg border ${statusStyles[status]} relative group hover:scale-102 transition-all duration-200`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            {statusIcons[status]}
            <span className="font-semibold text-sm text-gray-300">{task.time}</span>
          </div>
          <p className="mt-1 text-white">{task.title}</p>
        </div>
      </div>
    </div>
  );
};

// DayProgress Komponente für die Tagesübersicht
const DayProgress = ({ 
  schedule,
  onMarkCompleted
}: { 
  schedule: typeof dailySchedule;
  onMarkCompleted: (taskId: string) => void;
}) => {
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'missed' | 'upcoming' | 'ongoing'>('all');
  
  // Berechne die Statistiken für den Tag
  const stats = schedule.reduce((acc, block) => {
    block.activities.forEach(activity => {
      const status = getTaskStatus(activity.time);
      acc[status] = (acc[status] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const filterTasks = (status: typeof selectedStatus) => {
    return schedule.flatMap(block => 
      block.activities
        .map(activity => ({
          ...activity,
          status: getTaskStatus(activity.time)
        }))
        .filter(activity => 
          status === 'all' || activity.status === status
        )
    );
  };

  return (
    <div className="bg-slate-800/50 rounded-lg p-6 backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-6 text-emerald-300">Tagesübersicht</h2>
      
      {/* Statistik-Karten */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-emerald-900/30 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-emerald-300">Anstehend</span>
            <Clock className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">{stats.upcoming || 0}</p>
        </div>
        <div className="bg-yellow-900/30 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-yellow-300">Aktuell</span>
            <Zap className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">{stats.ongoing || 0}</p>
        </div>
        <div className="bg-red-900/30 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-red-300">Verpasst</span>
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">{stats.missed || 0}</p>
        </div>
        <div className="bg-blue-900/30 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-blue-300">Erledigt</span>
            <CheckCircle className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">{stats.completed || 0}</p>
        </div>
      </div>

      {/* Filter-Tabs */}
      <div className="flex space-x-2 mb-6">
        {(['all', 'missed', 'ongoing', 'upcoming'] as const).map(status => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedStatus === status 
                ? 'bg-emerald-600 text-white' 
                : 'bg-emerald-900/30 text-emerald-200 hover:bg-emerald-800/30'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Aufgaben-Liste */}
      <div className="space-y-3">
        {filterTasks(selectedStatus).map((task, index) => (
          <TaskCard
            key={index}
            task={task}
            status={task.status}
          />
        ))}
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
        {activeTab === "home" && (
          <div className="space-y-6">
            <DayProgress 
              schedule={dailySchedule}
              onMarkCompleted={(taskId) => {
                // Implementiere die Logik für das Abhaken von Aufgaben
              }}
            />
            <HabitManager 
              habits={habits}
              setHabits={setHabits}
              newHabit={newHabit}
              setNewHabit={setNewHabit}
            />
          </div>
        )}
      </main>
    </div>
  );
}
