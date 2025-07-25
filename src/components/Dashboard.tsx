import { Award, Users, TrendingUp, Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

const Dashboard = () => {
  // Мок данные для демонстрации
  const stats = [
    {
      title: 'Всего поощрений',
      value: '247',
      change: '+12%',
      icon: Award,
      color: 'text-primary'
    },
    {
      title: 'Сотрудников',
      value: '89',
      change: '+3',
      icon: Users,
      color: 'text-accent'
    },
    {
      title: 'За этот месяц',
      value: '23',
      change: '+18%',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Активных руководителей',
      value: '12',
      change: '+2',
      icon: Calendar,
      color: 'text-purple-600'
    }
  ]

  const recentRewards = [
    {
      id: 1,
      employee: 'Иванов Иван Иванович',
      rank: 'Старший лейтенант',
      reward: 'Благодарность',
      supervisor: 'Начальник отделения',
      date: '2024-01-20',
      status: 'active'
    },
    {
      id: 2,
      employee: 'Петрова Анна Сергеевна',
      rank: 'Капитан',
      reward: 'Грамота',
      supervisor: 'Заместитель начальника',
      date: '2024-01-19',
      status: 'active'
    },
    {
      id: 3,
      employee: 'Сидоров Петр Александрович',
      rank: 'Майор',
      reward: 'Денежное поощрение',
      supervisor: 'Начальник отделения',
      date: '2024-01-18',
      status: 'active'
    }
  ]

  const rewardTypes = [
    { name: 'Благодарность', count: 89, color: 'bg-blue-100 text-blue-800' },
    { name: 'Грамота', count: 67, color: 'bg-green-100 text-green-800' },
    { name: 'Денежное поощрение', count: 45, color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Медаль', count: 32, color: 'bg-purple-100 text-purple-800' },
    { name: 'Почетная грамота', count: 14, color: 'bg-red-100 text-red-800' }
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Главная панель</h2>
          <p className="text-muted-foreground">
            Обзор системы учёта поощрений сотрудников
          </p>
        </div>
        <Button>
          <Award className="mr-2 h-4 w-4" />
          Добавить поощрение
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> от прошлого месяца
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Rewards */}
        <Card>
          <CardHeader>
            <CardTitle>Последние поощрения</CardTitle>
            <CardDescription>
              Недавно добавленные награды сотрудников
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRewards.map((reward) => (
                <div key={reward.id} className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {reward.employee}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {reward.rank} • {reward.reward}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{reward.date}</p>
                    <p className="text-xs text-muted-foreground">
                      {reward.supervisor}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reward Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Распределение по типам</CardTitle>
            <CardDescription>
              Количество поощрений по категориям
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rewardTypes.map((type, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className={type.color}>
                      {type.name}
                    </Badge>
                  </div>
                  <div className="text-sm font-medium">{type.count}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard