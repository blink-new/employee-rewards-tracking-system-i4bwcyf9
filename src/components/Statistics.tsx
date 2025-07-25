import { useState } from 'react'
import { BarChart3, TrendingUp, Users, Award, Calendar, Target, Filter, Download, Search } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

const Statistics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months')
  const [selectedRewardType, setSelectedRewardType] = useState('all')
  const [selectedSupervisor, setSelectedSupervisor] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Мок данные для расширенной аналитики
  const detailedRewards = [
    {
      id: 1,
      employee: 'Козлова Елена Викторовна',
      rank: 'Подполковник',
      rewardType: 'Благодарность',
      supervisor: 'Начальник отделения',
      date: '2024-01-15',
      reason: 'За отличное выполнение служебных обязанностей'
    },
    {
      id: 2,
      employee: 'Сидоров Петр Александрович',
      rank: 'Майор',
      rewardType: 'Грамота',
      supervisor: 'Заместитель начальника',
      date: '2024-01-20',
      reason: 'За профессионализм и добросовестность'
    },
    {
      id: 3,
      employee: 'Петрова Анна Сергеевна',
      rank: 'Капитан',
      rewardType: 'Денежное поощрение',
      supervisor: 'Начальник управления',
      date: '2024-01-25',
      reason: 'За успешное завершение проекта'
    },
    {
      id: 4,
      employee: 'Иванов Иван Иванович',
      rank: 'Старший лейтенант',
      rewardType: 'Медаль',
      supervisor: 'Директор',
      date: '2024-02-01',
      reason: 'За выдающиеся заслуги'
    },
    {
      id: 5,
      employee: 'Морозов Алексей Петрович',
      rank: 'Капитан',
      rewardType: 'Почетная грамота',
      supervisor: 'Заместитель директора',
      date: '2024-02-10',
      reason: 'За многолетнюю безупречную службу'
    },
    {
      id: 6,
      employee: 'Козлова Елена Викторовна',
      rank: 'Подполковник',
      rewardType: 'Грамота',
      supervisor: 'Начальник отделения',
      date: '2024-02-15',
      reason: 'За инициативность и творческий подход'
    }
  ]

  const monthlyStats = [
    { month: 'Янв', rewards: 18, благодарность: 8, грамота: 4, деньги: 3, медаль: 2, почетная: 1 },
    { month: 'Фев', rewards: 22, благодарность: 10, грамота: 5, деньги: 4, медаль: 2, почетная: 1 },
    { month: 'Мар', rewards: 25, благодарность: 12, грамота: 6, деньги: 4, медаль: 2, почетная: 1 },
    { month: 'Апр', rewards: 19, благодарность: 9, грамота: 4, деньги: 3, медаль: 2, почетная: 1 },
    { month: 'Май', rewards: 28, благодарность: 13, грамота: 7, деньги: 5, медаль: 2, почетная: 1 },
    { month: 'Июн', rewards: 31, благодарность: 15, грамота: 8, деньги: 5, медаль: 2, почетная: 1 }
  ]

  const rewardTypes = ['Благодарность', 'Грамота', 'Денежное поощрение', 'Медаль', 'Почетная грамота']
  const supervisorPositions = ['Начальник отделения', 'Заместитель начальника', 'Начальник управления', 'Заместитель директора', 'Директор']

  // Фильтрация данных
  const filteredRewards = detailedRewards.filter(reward => {
    const matchesRewardType = selectedRewardType === 'all' || reward.rewardType === selectedRewardType
    const matchesSupervisor = selectedSupervisor === 'all' || reward.supervisor === selectedSupervisor
    const matchesSearch = searchQuery === '' || 
      reward.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reward.rank.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesRewardType && matchesSupervisor && matchesSearch
  })

  // Статистика по отфильтрованным данным
  const filteredStats = {
    total: filteredRewards.length,
    byType: rewardTypes.map(type => ({
      type,
      count: filteredRewards.filter(r => r.rewardType === type).length
    })),
    bySupervisor: supervisorPositions.map(pos => ({
      position: pos,
      count: filteredRewards.filter(r => r.supervisor === pos).length
    }))
  }

  const getRewardColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Благодарность': 'bg-blue-500',
      'Грамота': 'bg-green-500',
      'Денежное поощрение': 'bg-yellow-500',
      'Медаль': 'bg-purple-500',
      'Почетная грамота': 'bg-red-500'
    }
    return colors[type] || 'bg-gray-500'
  }

  const getRewardBadgeVariant = (type: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      'Благодарность': 'default',
      'Грамота': 'secondary',
      'Денежное поощрение': 'outline',
      'Медаль': 'destructive',
      'Почетная грамота': 'secondary'
    }
    return variants[type] || 'default'
  }

  const maxMonthlyRewards = Math.max(...monthlyStats.map(s => s.rewards))

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Расширенная аналитика</h2>
          <p className="text-muted-foreground">
            Детальный анализ поощрений за выбранный период с фильтрацией
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Экспорт отчёта
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Фильтры и период анализа
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Период</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Последний месяц</SelectItem>
                  <SelectItem value="3months">Последние 3 месяца</SelectItem>
                  <SelectItem value="6months">Последние 6 месяцев</SelectItem>
                  <SelectItem value="1year">Последний год</SelectItem>
                  <SelectItem value="all">Весь период</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Тип поощрения</label>
              <Select value={selectedRewardType} onValueChange={setSelectedRewardType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все типы</SelectItem>
                  {rewardTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Руководитель</label>
              <Select value={selectedSupervisor} onValueChange={setSelectedSupervisor}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все руководители</SelectItem>
                  {supervisorPositions.map(pos => (
                    <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Поиск сотрудника</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ФИО или звание..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedRewardType('all')
                  setSelectedSupervisor('all')
                  setSearchQuery('')
                }}
                className="w-full"
              >
                Сбросить фильтры
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats for Filtered Data */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Найдено поощрений
            </CardTitle>
            <Award className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredStats.total}</div>
            <p className="text-xs text-muted-foreground">
              За выбранный период
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Уникальных сотрудников
            </CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(filteredRewards.map(r => r.employee)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              Получили поощрения
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Активных руководителей
            </CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(filteredRewards.map(r => r.supervisor)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              Выдали поощрения
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Самый популярный тип
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {filteredStats.byType.reduce((max, current) => 
                current.count > max.count ? current : max, 
                filteredStats.byType[0]
              )?.type || 'Нет данных'}
            </div>
            <p className="text-xs text-muted-foreground">
              Наиболее частое поощрение
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="detailed" className="space-y-4">
        <TabsList>
          <TabsTrigger value="detailed">Детальный список</TabsTrigger>
          <TabsTrigger value="charts">Графики и диаграммы</TabsTrigger>
          <TabsTrigger value="summary">Сводка по периоду</TabsTrigger>
        </TabsList>

        <TabsContent value="detailed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Детальный список поощрений</CardTitle>
              <CardDescription>
                Полная информация о поощрениях за выбранный период
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Сотрудник</TableHead>
                    <TableHead>Звание</TableHead>
                    <TableHead>Тип поощрения</TableHead>
                    <TableHead>Руководитель</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead>Основание</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRewards.map((reward) => (
                    <TableRow key={reward.id}>
                      <TableCell className="font-medium">{reward.employee}</TableCell>
                      <TableCell>{reward.rank}</TableCell>
                      <TableCell>
                        <Badge variant={getRewardBadgeVariant(reward.rewardType)}>
                          {reward.rewardType}
                        </Badge>
                      </TableCell>
                      <TableCell>{reward.supervisor}</TableCell>
                      <TableCell>{new Date(reward.date).toLocaleDateString('ru-RU')}</TableCell>
                      <TableCell className="max-w-xs truncate">{reward.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredRewards.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Нет данных, соответствующих выбранным фильтрам
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Monthly Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Динамика по месяцам</CardTitle>
                <CardDescription>
                  Количество поощрений за последние 6 месяцев
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyStats.map((stat, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-12 text-sm font-medium">{stat.month}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">
                            {stat.rewards} поощрений
                          </span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${(stat.rewards / maxMonthlyRewards) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Filtered Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Распределение по типам (отфильтровано)</CardTitle>
                <CardDescription>
                  Количество поощрений по типам в выбранной выборке
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStats.byType.filter(item => item.count > 0).map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.type}</span>
                        <span className="text-sm text-muted-foreground">
                          {item.count} поощрений
                        </span>
                      </div>
                      <Progress 
                        value={filteredStats.total > 0 ? (item.count / filteredStats.total) * 100 : 0} 
                        className="h-2" 
                      />
                    </div>
                  ))}
                  {filteredStats.byType.every(item => item.count === 0) && (
                    <div className="text-center py-4 text-muted-foreground">
                      Нет данных для отображения
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Сводка по руководителям</CardTitle>
                <CardDescription>
                  Количество выданных поощрений по должностям
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStats.bySupervisor.filter(item => item.count > 0).map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{item.position}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.count} поощрений выдано
                        </p>
                      </div>
                      <Badge variant="outline">
                        {filteredStats.total > 0 ? Math.round((item.count / filteredStats.total) * 100) : 0}%
                      </Badge>
                    </div>
                  ))}
                  {filteredStats.bySupervisor.every(item => item.count === 0) && (
                    <div className="text-center py-4 text-muted-foreground">
                      Нет данных для отображения
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Топ сотрудников (отфильтровано)</CardTitle>
                <CardDescription>
                  Сотрудники с наибольшим количеством поощрений в выборке
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(
                    filteredRewards.reduce((acc, reward) => {
                      const key = `${reward.employee}|${reward.rank}`
                      acc[key] = (acc[key] || 0) + 1
                      return acc
                    }, {} as Record<string, number>)
                  )
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 5)
                    .map(([employeeData, count], index) => {
                      const [name, rank] = employeeData.split('|')
                      return (
                        <div key={index} className="flex items-center space-x-4">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">{name}</p>
                            <p className="text-sm text-muted-foreground">{rank}</p>
                          </div>
                          <Badge variant="secondary">
                            {count} поощрений
                          </Badge>
                        </div>
                      )
                    })}
                  {filteredRewards.length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">
                      Нет данных для отображения
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Statistics