import { useState } from 'react'
import { Plus, Edit, Trash2, Save, Settings as SettingsIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

const SettingsPage = () => {
  const [rewardTypes, setRewardTypes] = useState([
    'Благодарность',
    'Грамота',
    'Денежное поощрение',
    'Медаль',
    'Почетная грамота'
  ])

  const [supervisorPositions, setSupervisorPositions] = useState([
    'Заместитель начальника отделения',
    'Начальник отделения',
    'Заместитель начальника управления',
    'Начальник управления',
    'Заместитель директора',
    'Директор'
  ])

  const [ranks, setRanks] = useState([
    'Рядовой',
    'Ефрейтор',
    'Младший сержант',
    'Сержант',
    'Старший сержант',
    'Старшина',
    'Прапорщик',
    'Старший прапорщик',
    'Младший лейтенант',
    'Лейтенант',
    'Старший лейтенант',
    'Капитан',
    'Майор',
    'Подполковник',
    'Полковник'
  ])

  const [newRewardType, setNewRewardType] = useState('')
  const [newPosition, setNewPosition] = useState('')
  const [newRank, setNewRank] = useState('')

  const addRewardType = () => {
    if (newRewardType.trim() && !rewardTypes.includes(newRewardType.trim())) {
      setRewardTypes([...rewardTypes, newRewardType.trim()])
      setNewRewardType('')
    }
  }

  const removeRewardType = (type: string) => {
    setRewardTypes(rewardTypes.filter(t => t !== type))
  }

  const addPosition = () => {
    if (newPosition.trim() && !supervisorPositions.includes(newPosition.trim())) {
      setSupervisorPositions([...supervisorPositions, newPosition.trim()])
      setNewPosition('')
    }
  }

  const removePosition = (position: string) => {
    setSupervisorPositions(supervisorPositions.filter(p => p !== position))
  }

  const addRank = () => {
    if (newRank.trim() && !ranks.includes(newRank.trim())) {
      setRanks([...ranks, newRank.trim()])
      setNewRank('')
    }
  }

  const removeRank = (rank: string) => {
    setRanks(ranks.filter(r => r !== rank))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Настройки</h2>
          <p className="text-muted-foreground">
            Управление типами поощрений, должностями и званиями
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Reward Types Management */}
        <Card>
          <CardHeader>
            <CardTitle>Типы поощрений</CardTitle>
            <CardDescription>
              Управление доступными видами наград и поощрений
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Новый тип поощрения..."
                  value={newRewardType}
                  onChange={(e) => setNewRewardType(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addRewardType()}
                />
                <Button onClick={addRewardType}>
                  <Plus className="mr-2 h-4 w-4" />
                  Добавить
                </Button>
              </div>
              
              <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                {rewardTypes.map((type, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">{type}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRewardType(type)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Supervisor Positions Management */}
        <Card>
          <CardHeader>
            <CardTitle>Должности руководителей</CardTitle>
            <CardDescription>
              Управление должностями, которые могут выдавать поощрения
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Новая должность..."
                  value={newPosition}
                  onChange={(e) => setNewPosition(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addPosition()}
                />
                <Button onClick={addPosition}>
                  <Plus className="mr-2 h-4 w-4" />
                  Добавить
                </Button>
              </div>
              
              <div className="grid gap-2 md:grid-cols-1 lg:grid-cols-2">
                {supervisorPositions.map((position, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">{position}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePosition(position)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Military Ranks Management */}
        <Card>
          <CardHeader>
            <CardTitle>Воинские звания</CardTitle>
            <CardDescription>
              Управление доступными воинскими званиями сотрудников
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Новое звание..."
                  value={newRank}
                  onChange={(e) => setNewRank(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addRank()}
                />
                <Button onClick={addRank}>
                  <Plus className="mr-2 h-4 w-4" />
                  Добавить
                </Button>
              </div>
              
              <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-4">
                {ranks.map((rank, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium text-sm">{rank}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRank(rank)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Системные настройки</CardTitle>
            <CardDescription>
              Общие настройки системы учёта поощрений
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="organization">Название организации</Label>
                  <Input
                    id="organization"
                    placeholder="Введите название организации"
                    defaultValue="Военная часть №12345"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Подразделение</Label>
                  <Input
                    id="department"
                    placeholder="Введите название подразделения"
                    defaultValue="Отдел кадров"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Адрес</Label>
                <Input
                  id="address"
                  placeholder="Введите адрес организации"
                  defaultValue="г. Москва, ул. Примерная, д. 1"
                />
              </div>

              <div className="flex gap-3">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Сохранить настройки
                </Button>
                <Button variant="outline">
                  Экспорт данных
                </Button>
                <Button variant="outline">
                  Импорт данных
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SettingsPage