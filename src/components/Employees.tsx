import { useState } from 'react'
import { Search, Filter, Eye, Award, Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRank, setFilterRank] = useState('')
  const [filterReward, setFilterReward] = useState('')

  // Мок данные сотрудников
  const employees = [
    {
      id: 1,
      name: 'Иванов Иван Иванович',
      rank: 'Старший лейтенант',
      totalRewards: 5,
      lastReward: '2024-01-20',
      rewards: [
        { type: 'Благодарность', count: 2 },
        { type: 'Грамота', count: 2 },
        { type: 'Денежное поощрение', count: 1 }
      ]
    },
    {
      id: 2,
      name: 'Петрова Анна Сергеевна',
      rank: 'Капитан',
      totalRewards: 8,
      lastReward: '2024-01-19',
      rewards: [
        { type: 'Благодарность', count: 3 },
        { type: 'Грамота', count: 3 },
        { type: 'Медаль', count: 1 },
        { type: 'Почетная грамота', count: 1 }
      ]
    },
    {
      id: 3,
      name: 'Сидоров Петр Александрович',
      rank: 'Майор',
      totalRewards: 12,
      lastReward: '2024-01-18',
      rewards: [
        { type: 'Благодарность', count: 4 },
        { type: 'Грамота', count: 4 },
        { type: 'Денежное поощрение', count: 2 },
        { type: 'Медаль', count: 2 }
      ]
    },
    {
      id: 4,
      name: 'Козлова Елена Викторовна',
      rank: 'Подполковник',
      totalRewards: 15,
      lastReward: '2024-01-15',
      rewards: [
        { type: 'Благодарность', count: 5 },
        { type: 'Грамота', count: 5 },
        { type: 'Денежное поощрение', count: 3 },
        { type: 'Медаль', count: 1 },
        { type: 'Почетная грамота', count: 1 }
      ]
    }
  ]

  const ranks = [
    'Старший лейтенант',
    'Капитан',
    'Майор',
    'Подполковник',
    'Полковник'
  ]

  const rewardTypes = [
    'Благодарность',
    'Грамота',
    'Денежное поощрение',
    'Медаль',
    'Почетная грамота'
  ]

  const getRewardColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Благодарность': 'bg-blue-100 text-blue-800',
      'Грамота': 'bg-green-100 text-green-800',
      'Денежное поощрение': 'bg-yellow-100 text-yellow-800',
      'Медаль': 'bg-purple-100 text-purple-800',
      'Почетная грамота': 'bg-red-100 text-red-800'
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRank = !filterRank || employee.rank === filterRank
    const matchesReward = !filterReward || employee.rewards.some(r => r.type === filterReward)
    return matchesSearch && matchesRank && matchesReward
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Сотрудники</h2>
          <p className="text-muted-foreground">
            Просмотр и управление информацией о сотрудниках и их поощрениях
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Фильтры и поиск</CardTitle>
          <CardDescription>
            Найдите сотрудников по различным критериям
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Поиск по ФИО</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Введите ФИО..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Звание</label>
              <Select value={filterRank} onValueChange={setFilterRank}>
                <SelectTrigger>
                  <SelectValue placeholder="Все звания" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все звания</SelectItem>
                  {ranks.map((rank) => (
                    <SelectItem key={rank} value={rank}>
                      {rank}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Тип поощрения</label>
              <Select value={filterReward} onValueChange={setFilterReward}>
                <SelectTrigger>
                  <SelectValue placeholder="Все типы" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все типы</SelectItem>
                  {rewardTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  setFilterRank('')
                  setFilterReward('')
                }}
                className="w-full"
              >
                <Filter className="mr-2 h-4 w-4" />
                Сбросить
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employees Table */}
      <Card>
        <CardHeader>
          <CardTitle>Список сотрудников ({filteredEmployees.length})</CardTitle>
          <CardDescription>
            Информация о сотрудниках и их поощрениях
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ФИО</TableHead>
                <TableHead>Звание</TableHead>
                <TableHead>Всего поощрений</TableHead>
                <TableHead>Последнее поощрение</TableHead>
                <TableHead>Типы поощрений</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">
                    {employee.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{employee.rank}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Award className="mr-2 h-4 w-4 text-primary" />
                      {employee.totalRewards}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      {employee.lastReward}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {employee.rewards.map((reward, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className={`text-xs ${getRewardColor(reward.type)}`}
                        >
                          {reward.type} ({reward.count})
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      Подробнее
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Employees