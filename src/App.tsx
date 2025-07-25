import { useState } from 'react'
import { Award, Users, BarChart3, Settings, Plus, Home } from 'lucide-react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import Dashboard from './components/Dashboard'
import AddReward from './components/AddReward'
import Employees from './components/Employees'
import Statistics from './components/Statistics'
import SettingsPage from './components/Settings'

type Page = 'dashboard' | 'add-reward' | 'employees' | 'statistics' | 'settings'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')

  const navigation = [
    { id: 'dashboard', label: 'Главная панель', icon: Home },
    { id: 'add-reward', label: 'Добавить поощрение', icon: Plus },
    { id: 'employees', label: 'Сотрудники', icon: Users },
    { id: 'statistics', label: 'Статистика', icon: BarChart3 },
    { id: 'settings', label: 'Настройки', icon: Settings },
  ]

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'add-reward':
        return <AddReward />
      case 'employees':
        return <Employees />
      case 'statistics':
        return <Statistics />
      case 'settings':
        return <SettingsPage />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Award className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Система учёта поощрений
              </h1>
              <p className="text-sm text-muted-foreground">
                Управление наградами сотрудников
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card">
          <nav className="space-y-2 p-4">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setCurrentPage(item.id as Page)}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {item.label}
                </Button>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

export default App