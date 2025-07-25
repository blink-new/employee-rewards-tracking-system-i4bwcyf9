import { useState } from 'react'
import { Plus, Save, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'

const AddReward = () => {
  const [formData, setFormData] = useState({
    employeeName: '',
    rank: '',
    rewardType: '',
    supervisor: '',
    date: '',
    description: ''
  })

  const rewardTypes = [
    'Благодарность',
    'Грамота',
    'Денежное поощрение',
    'Медаль',
    'Почетная грамота'
  ]

  const supervisorPositions = [
    'Заместитель начальника отделения',
    'Начальник отделения',
    'Заместитель начальника управления',
    'Начальник управления',
    'Заместитель директора',
    'Директор'
  ]

  const ranks = [
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
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Добавление поощрения:', formData)
    // Здесь будет логика сохранения в базу данных
    
    // Сброс формы
    setFormData({
      employeeName: '',
      rank: '',
      rewardType: '',
      supervisor: '',
      date: '',
      description: ''
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Добавить поощрение</h2>
          <p className="text-muted-foreground">
            Создание новой записи о поощрении сотрудника
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Информация о поощрении</CardTitle>
              <CardDescription>
                Заполните все необходимые поля для создания записи
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="employeeName">ФИО сотрудника *</Label>
                    <Input
                      id="employeeName"
                      placeholder="Иванов Иван Иванович"
                      value={formData.employeeName}
                      onChange={(e) => handleInputChange('employeeName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rank">Звание *</Label>
                    <Select
                      value={formData.rank}
                      onValueChange={(value) => handleInputChange('rank', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите звание" />
                      </SelectTrigger>
                      <SelectContent>
                        {ranks.map((rank) => (
                          <SelectItem key={rank} value={rank}>
                            {rank}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="rewardType">Тип поощрения *</Label>
                    <Select
                      value={formData.rewardType}
                      onValueChange={(value) => handleInputChange('rewardType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип поощрения" />
                      </SelectTrigger>
                      <SelectContent>
                        {rewardTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supervisor">Должность руководителя *</Label>
                    <Select
                      value={formData.supervisor}
                      onValueChange={(value) => handleInputChange('supervisor', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите должность" />
                      </SelectTrigger>
                      <SelectContent>
                        {supervisorPositions.map((position) => (
                          <SelectItem key={position} value={position}>
                            {position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Дата поощрения *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Описание (необязательно)</Label>
                  <Textarea
                    id="description"
                    placeholder="Дополнительная информация о поощрении..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="submit" className="flex-1">
                    <Save className="mr-2 h-4 w-4" />
                    Сохранить поощрение
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setFormData({
                      employeeName: '',
                      rank: '',
                      rewardType: '',
                      supervisor: '',
                      date: '',
                      description: ''
                    })}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Очистить
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar with Quick Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Типы поощрений</CardTitle>
              <CardDescription>
                Доступные виды наград
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {rewardTypes.map((type, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="w-full justify-center py-2"
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Быстрые действия</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Добавить новое звание
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Добавить должность
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AddReward