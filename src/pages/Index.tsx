import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const menuItems = [
    { id: 'home', label: 'Главная' },
    { id: 'video', label: 'Видео' },
    { id: 'products', label: 'Продукция' },
    { id: 'tech', label: 'Технологии' },
    { id: 'about', label: 'О заводе' },
    { id: 'contact', label: 'Контакты' }
  ];

  const [videoStats, setVideoStats] = useState({
    1: { views: 12547, duration: '5:23', publishedAt: '15 октября 2024' },
    2: { views: 8932, duration: '3:45', publishedAt: '10 октября 2024' }
  });

  const videos = [
    {
      id: 1,
      title: 'Производственная линия',
      description: 'Автоматизированные процессы нового поколения',
      thumbnail: 'https://cdn.poehali.dev/projects/bcab3a77-4471-41b6-ab21-782d49555bbf/files/5beea5be-04c7-4ef0-a4c4-67e3d4979672.jpg',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 2,
      title: 'Контроль качества AI',
      description: 'Визуальная инспекция в реальном времени',
      thumbnail: 'https://cdn.poehali.dev/projects/bcab3a77-4471-41b6-ab21-782d49555bbf/files/9d657345-0b99-468b-9645-78a75d0a88e6.jpg',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  ];

  const handleVideoPlay = (videoId: number) => {
    setVideoStats(prev => ({
      ...prev,
      [videoId]: {
        ...prev[videoId as keyof typeof prev],
        views: prev[videoId as keyof typeof prev].views + 1
      }
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-heading font-bold text-secondary">AI FACTORY</h1>
            
            <div className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.id ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-6 mt-8">
                  <h2 className="text-2xl font-heading font-bold text-secondary mb-4">Меню</h2>
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left text-lg font-medium transition-colors hover:text-primary py-2 ${
                        activeSection === item.id ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-slate-50">
          <div className="container mx-auto px-6 text-center animate-fade-in">
            <h2 className="text-6xl md:text-7xl font-heading font-bold text-secondary mb-6">
              Будущее производства
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Интеллектуальные технологии для контроля качества и оптимизации процессов
            </p>
            <Button size="lg" onClick={() => scrollToSection('video')} className="text-lg px-8 py-6">
              Узнать больше
              <Icon name="ArrowRight" className="ml-2" size={20} />
            </Button>
          </div>
        </section>

        <section id="video" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary mb-4">
                Видео
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Посмотрите, как наши технологии работают в реальном времени
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {videos.map((video, idx) => (
                <Card key={video.id} className="overflow-hidden animate-scale-in hover:shadow-lg transition-shadow" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <CardContent className="p-0">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative aspect-video bg-slate-100 cursor-pointer" onClick={() => handleVideoPlay(video.id)}>
                          <img 
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                            {videoStats[video.id as keyof typeof videoStats].duration}
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group">
                            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Icon name="Play" className="text-white ml-1" size={24} />
                            </div>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full p-0">
                        <div className="aspect-video w-full">
                          <iframe
                            src={video.url}
                            className="w-full h-full rounded-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                      <p className="text-muted-foreground mb-4">{video.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Icon name="Eye" size={16} />
                          <span>{videoStats[video.id as keyof typeof videoStats].views.toLocaleString('ru-RU')} просмотров</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Icon name="Calendar" size={16} />
                          <span>{videoStats[video.id as keyof typeof videoStats].publishedAt}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="products" className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary mb-4">
                Продукция
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Инновационные решения для промышленности
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: 'Cpu',
                  title: 'AI Модули',
                  description: 'Интеллектуальные процессоры для анализа данных в реальном времени'
                },
                {
                  icon: 'Eye',
                  title: 'Системы контроля',
                  description: 'Визуальная инспекция с точностью до 99.9%'
                },
                {
                  icon: 'Gauge',
                  title: 'Датчики IoT',
                  description: 'Умные сенсоры для мониторинга процессов'
                }
              ].map((product, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-all animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <Icon name={product.icon} className="text-primary" size={32} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{product.title}</h3>
                    <p className="text-muted-foreground">{product.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="tech" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary mb-4">
                Технологии
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                AI-аналитика для контроля качества и оптимизации процессов
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
              <div className="animate-fade-in">
                <img 
                  src="https://cdn.poehali.dev/projects/bcab3a77-4471-41b6-ab21-782d49555bbf/files/2093912b-e9fd-4fd3-a67b-8ef2966a4667.jpg"
                  alt="AI Analytics Dashboard"
                  className="rounded-lg shadow-xl"
                />
              </div>

              <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon name="Brain" className="text-primary" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Машинное обучение</h3>
                    <p className="text-muted-foreground">
                      Нейросети анализируют миллионы параметров для предсказания дефектов
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon name="BarChart3" className="text-primary" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Аналитика в реальном времени</h3>
                    <p className="text-muted-foreground">
                      Мгновенная обработка данных и визуализация показателей производства
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon name="Zap" className="text-primary" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Автоматическая оптимизация</h3>
                    <p className="text-muted-foreground">
                      Система самостоятельно корректирует параметры для максимальной эффективности
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary mb-8 text-center">
                О заводе
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  AI Factory — это инновационное производственное предприятие, специализирующееся на разработке 
                  и внедрении интеллектуальных систем для промышленности.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Мы объединяем передовые технологии машинного обучения, компьютерного зрения и IoT 
                  для создания самых эффективных решений в области автоматизации производства.
                </p>
                
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">500+</div>
                    <div className="text-muted-foreground">Установленных систем</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
                    <div className="text-muted-foreground">Точность определения</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-muted-foreground">Поддержка клиентов</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary mb-8 text-center">
                Контакты
              </h2>

              <Card>
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Имя</label>
                      <Input placeholder="Ваше имя" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input type="email" placeholder="your@email.com" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Сообщение</label>
                      <Textarea placeholder="Расскажите о вашем проекте..." rows={5} />
                    </div>
                    
                    <Button type="submit" className="w-full" size="lg">
                      Отправить
                      <Icon name="Send" className="ml-2" size={18} />
                    </Button>
                  </form>

                  <div className="mt-8 pt-8 border-t space-y-4">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Icon name="Mail" size={20} />
                      <span>info@aifactory.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Icon name="Phone" size={20} />
                      <span>+7 (495) 123-45-67</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Icon name="MapPin" size={20} />
                      <span>Москва, Инновационный бульвар, 1</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-secondary text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-heading font-bold">AI FACTORY</h3>
              <p className="text-white/70 mt-2">Будущее производства</p>
            </div>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Icon name="Linkedin" size={20} />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Icon name="Twitter" size={20} />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Icon name="Youtube" size={20} />
              </button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/70 text-sm">
            © 2024 AI Factory. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;