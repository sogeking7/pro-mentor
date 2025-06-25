import React, { useState, useEffect } from "react";

// Компонент для трекера развития (как Duolingo)
const DevelopmentTracker = () => {
  const [streak, setStreak] = useState(() => {
    const saved = window.localStorage?.getItem('streak');
    return saved ? JSON.parse(saved) : 0;
  });
  
  const [todayCompleted, setTodayCompleted] = useState(() => {
    const today = new Date().toDateString();
    const lastCompleted = window.localStorage?.getItem('lastCompleted');
    return lastCompleted === today;
  });

  const [tasks, setTasks] = useState([
    { id: 1, text: "10 минут ағылшын тілін үйрену", completed: false, type: "language" },
    { id: 2, text: "Жаңа педагогикалық әдіс оқу", completed: false, type: "professional" },
    { id: 3, text: "Медитация немесе рефлексия", completed: false, type: "spiritual" },
    { id: 4, text: "Физикалық жаттығу", completed: false, type: "physical" }
  ]);

  const completeTask = (taskId) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    const allCompleted = updatedTasks.every(task => task.completed);
    if (allCompleted && !todayCompleted) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setTodayCompleted(true);
      if (window.localStorage) {
        window.localStorage.setItem('streak', JSON.stringify(newStreak));
        window.localStorage.setItem('lastCompleted', new Date().toDateString());
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl mb-6">
        <h2 className="text-2xl font-bold mb-2">🔥 Күнделікті даму трекері</h2>
        <div className="text-3xl font-bold">{streak} күн серия</div>
        <p className="opacity-90">Duolingo стилінде үздіксіз даму!</p>
      </div>

      <div className="space-y-4">
        {tasks.map(task => (
          <div key={task.id} className={`p-4 rounded-lg border-2 transition-all ${
            task.completed 
              ? 'bg-green-50 border-green-200' 
              : 'bg-white border-gray-200 hover:border-purple-300'
          }`}>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => completeTask(task.id)}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
              <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.text}
              </span>
              <span className="text-2xl">
                {task.type === 'language' && '🗣️'}
                {task.type === 'professional' && '📚'}
                {task.type === 'spiritual' && '🧘'}
                {task.type === 'physical' && '💪'}
              </span>
            </label>
          </div>
        ))}
      </div>

      {todayCompleted && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 font-semibold">🎉 Бүгінгі тапсырмалар орындалды!</p>
        </div>
      )}
    </div>
  );
};

// Компонент для авторизации
const AuthModal = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {type === 'login' ? 'Жүйеге кіру' : 'Тіркелу'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="example@email.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Пароль</label>
            <input 
              type="password" 
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {type === 'register' && (
            <div>
              <label className="block text-sm font-medium mb-1">Рөл</label>
              <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Мұғалім</option>
                <option>Директор</option>
                <option>Әдіскер</option>
                <option>Басқа</option>
              </select>
            </div>
          )}
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {type === 'login' ? 'Кіру' : 'Тіркелу'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button className="text-blue-600 hover:underline">
            Қонақ ретінде кіру
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('login');

  // Navigation function
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  // Home Page Component
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button 
              onClick={() => navigateTo('home')} 
              className="text-2xl font-bold text-blue-600"
            >
              PROmentor
            </button>
            
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => navigateTo('home')} className="text-gray-700 hover:text-blue-600">Басты бет</button>
              <button className="text-gray-700 hover:text-blue-600">Біз туралы</button>
              <button className="text-gray-700 hover:text-blue-600">Байланыс</button>
            </nav>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => {setShowModal(true); setModalType('login');}}
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
              >
                Кіру
              </button>
              <button 
                onClick={() => {setShowModal(true); setModalType('register');}}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Тіркелу
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            PROmentor
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Мұғалімдердің кәсіби дамуы үшін бірыңғай платформа
          </p>
        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button 
            onClick={() => navigateTo('teachers')}
            className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-left"
          >
            <div className="text-4xl mb-4">👨‍🏫</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600">Мұғалімдер</h3>
            <p className="text-gray-600">Заңнамалық базы, НКТ дайындық, лайфхактар</p>
          </button>

          <button 
            onClick={() => navigateTo('students')}
            className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-left"
          >
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600">Оқушылар</h3>
            <p className="text-gray-600">Дарынды балалармен жұмыс, инклюзивті білім</p>
          </button>

          <button 
            onClick={() => navigateTo('personality')}
            className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-left"
          >
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600">Тұлғалық даму</h3>
            <p className="text-gray-600">IQ, EQ, PQ, SQ дамыту және трекер</p>
          </button>

          <button 
            onClick={() => navigateTo('diagnostics')}
            className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-left"
          >
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600">Диагностика</h3>
            <p className="text-gray-600">Кәсіби диагностика және бағалау</p>
          </button>
        </div>
      </div>

      <AuthModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        type={modalType} 
      />
    </div>
  );

  // Teachers Page Component
  const TeachersPage = () => {
    const [activeSection, setActiveSection] = useState('law');

    const sections = {
      law: {
        title: '📜 Білім туралы заң',
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Қазақстан Республикасының "Білім туралы" заңы</h3>
              <p className="text-gray-700">2007 жылғы 27 шілдедегі № 319 заңы</p>
              <a 
                href="https://adilet.zan.kz/kaz/docs/Z070000319_" 
                target="_blank" 
                className="text-blue-600 hover:underline"
              >
                Толық мәтінін оқу →
              </a>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Заңның негізгі ережелері:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Білім беру жүйесінің құрылымы мен басқарылуы</li>
                <li>Педагог қызметкерлердің құқықтары мен міндеттері</li>
                <li>Білім беру стандарттары мен бағдарламалары</li>
                <li>Білім алушылардың құқықтары мен міндеттері</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Педагогтерге қатысты негізгі ережелер:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Педагогикалық еркіндік пен академиялық дербестік</li>
                <li>Кәсіби даму және біліктілікті арттыру</li>
                <li>Еңбек ақы төлеуге және әлеуметтік кепілдіктерге құқық</li>
                <li>Үздіксіз кәсіби білім алу</li>
              </ul>
            </div>
          </div>
        )
      },
      nkt: {
        title: '📋 НКТ туралы ақпарат',
        content: (
          <div className="space-y-6">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Ұлттық Құзыретті Тестілеу (НКТ)</h3>
              <p className="text-gray-700">Педагог қызметкерлердің кәсіби құзыреттілігін тексеру үшін арналған тестілеу</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Тестілеу құрылымы:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li><strong>1-блок:</strong> "Оқыту пәнінің мазмұны" - 70 тапсырма</li>
                <li><strong>2-блок:</strong> "Педагогика, оқыту әдістемесі" - 30 тапсырма</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Уақыт шектеулері:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Жалпы уақыт: 230 минут (3 сағат 50 минут)</li>
                <li>Математика, физика, химия, информатика: 230 минут</li>
                <li>Басқа пәндер: 200 минут (3 сағат 20 минут)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Тапсыру шарттары:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Әр блок бойынша 50% дұрыс жауап алу қажет</li>
                <li>Сәтсіздік жағдайында 2 айдан кейін қайта тапсыруға болады</li>
              </ul>
            </div>
          </div>
        )
      },
      lifehacks: {
        title: '💡 Лайфхактар',
        content: (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">🎯 Сабақты қызықты өткізу әдістері:</h4>
              
              <div className="grid gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">"Ыстық орындық" әдісі</h5>
                  <p className="text-sm text-gray-700">Берілген тапсырмаға байланысты сұрақтарға жылдам жауап беру. Орындық "ыстық" болған соң тез жауап беру керек.</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">"Миға шабуыл" стратегиясы</h5>
                  <p className="text-sm text-gray-700">Тақырыпқа байланысты идеяларды көп жазу. Уақыт аяқталғанда кезектесіп оқу, идеялар қайталанбау керек.</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">"Лездеме" әдісі</h5>
                  <p className="text-sm text-gray-700">Бір минутта негізгі сөздерді түсіндіру және қысқа мерзімде көп ақпарат беру.</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">📚 Интерактивті әдістер:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li><strong>"9-ромб":</strong> Маңызды тақырыптарды ромб пішінде орналастыру</li>
                <li><strong>"Атомдар мен молекулалар":</strong> Физикалық белсенділікпен білім беру</li>
                <li><strong>"Алтын балық":</strong> Топтық жұмыс пен пікірталас</li>
                <li><strong>"Өзіңізді тексеріңіз":</strong> Шындық немесе жалған әдісі</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">🎭 Дәстүрлі емес сабақ түрлері:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Сабақ-ойын, сабақ-зерттеу, сабақ-саяхат</li>
                <li>Сабақ-кездесу, сабақ-конференция</li>
                <li>Сабақ-дәріс, сабақ-семинар</li>
              </ul>
            </div>
          </div>
        )
      },
      image: {
        title: '🎭 Ұстаздық имидж',
        content: (
          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">1. Сыртқы келбет</h4>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  <li>Таза, ұқыпты киініс</li>
                  <li>Кәсіби стиль</li>
                  <li>Дұрыс денесалт</li>
                  <li>Жымиындылық</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">2. Коммуникативтік дағдылар</h4>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  <li>Анық, түсінікті сөйлеу</li>
                  <li>Тыңдай білу</li>
                  <li>Эмпатия танытуы</li>
                  <li>Конфликттерді шешу</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">3. Кәсіби сапалар</h4>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  <li>Пәндік білім</li>
                  <li>Педагогикалық шеберлік</li>
                  <li>Инновациялық тәсілдер</li>
                  <li>Үздіксіз даму</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">💡 Имиджді қалыптастыру кеңестері:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Өзіңізге сенімді болыңыз</li>
                <li>Оқушылармен ашық қарым-қатынас орнатыңыз</li>
                <li>Әділетті және объективті болыңыз</li>
                <li>Үнемі өзіңізді дамытыңыз</li>
              </ul>
            </div>
          </div>
        )
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <button 
              onClick={() => navigateTo('home')} 
              className="text-blue-600 hover:underline mb-4 inline-block"
            >
              ← Басты бетке оралу
            </button>
            <h1 className="text-3xl font-bold text-gray-900">👨‍🏫 Мұғалімдер бөлімі</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-4 shadow-lg sticky top-4">
                <h3 className="font-semibold mb-4">Бөлімшелер</h3>
                <nav className="space-y-2">
                  {Object.entries(sections).map(([key, section]) => (
                    <button
                      key={key}
                      onClick={() => setActiveSection(key)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        activeSection === key 
                          ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-6">{sections[activeSection].title}</h2>
                {sections[activeSection].content}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Students Page Component
  const StudentsPage = () => {
    const [activeSection, setActiveSection] = useState('gifted');

    const sections = {
      gifted: {
        title: '🌟 Дарынды балалармен жұмыс',
        content: (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Дарындылықтың түрлері:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">🧠 Интеллектуалды дарындылық</h5>
                  <p className="text-sm text-gray-700">Логикалық ойлау, проблемаларды шешу қабілеті</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">🎨 Шығармашылық дарындылық</h5>
                  <p className="text-sm text-gray-700">Жаңалық жасау, креативтілік</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">👑 Лидерлік дарындылық</h5>
                  <p className="text-sm text-gray-700">Басқару, ұйымдастыру қабілеті</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">🏃 Спорттық дарындылық</h5>
                  <p className="text-sm text-gray-700">Физикалық қабілеттер мен дағдылар</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Дарынды балалармен жұмыс әдістері:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li><strong>Дифференциалды оқыту:</strong> Жеке деңгейге қарай тапсырмалар</li>
                <li><strong>Проблемалық оқыту:</strong> Күрделі міндеттер қою</li>
                <li><strong>Ізденіс жұмыстары:</strong> Жобалар мен зерттеулер</li>
                <li><strong>Ментордық қолдау:</strong> Жеке жетекшілік</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Мұғалімге қойылатын талаптар:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Кең пейілді, нақты болу</li>
                <li>Интеллектуалды дамудың жоғары деңгейі</li>
                <li>Белсенді, икемді мінез</li>
                <li>Әзілдесе білу қабілеті</li>
                <li>Үздіксіз өзін-өзі дамыту</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Пайдалы ресурстар:</h4>
              <ul className="space-y-1">
                <li><a href="http://daryn.kz" target="_blank" className="text-blue-600 hover:underline">Дарын РҒПО сайты</a></li>
                <li><span className="text-blue-600">Оқушы портфолио шаблоны</span></li>
                <li><span className="text-blue-600">Қабілет диагностикасы әдістемелері</span></li>
              </ul>
            </div>
          </div>
        )
      },
      inclusive: {
        title: '🤝 Инклюзивті білім беру',
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Инклюзивті білім беру дегеніміз не?</h4>
              <p className="text-gray-700">Барлық балаларға, соның ішінде ерекше білім беру қажеттіліктері бар балаларға тең мүмкіндіктер беру жүйесі.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Негізгі принциптер:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Барлық балалар білім алу құқығына ие</li>
                <li>Әртүрлілікті құрметтеу</li>
                <li>Жеке қажеттіліктерге бейімдеу</li>
                <li>Қолдау көрсету жүйесі</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Практикалық кеңестер:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Сабақты әртүрлі деңгейде өткізу</li>
                <li>Көрнекі құралдарды қолдану</li>
                <li>Жеке көмек көрсету</li>
                <li>Позитивті орта құру</li>
              </ul>
            </div>
          </div>
        )
      },
      digital: {
        title: '💻 Цифрлы ресурстар',
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Онлайн платформалар:</h4>
              <ul className="space-y-2">
                <li><a href="https://bilimland.kz" target="_blank" className="text-blue-600 hover:underline">BilimLand.kz - Білім беру портал</a></li>
                <li><a href="https://kundelik.kz" target="_blank" className="text-blue-600 hover:underline">Kundelik.kz - Электронды күнделік</a></li>
                <li><a href="https://arta.edu.kz" target="_blank" className="text-blue-600 hover:underline">Arta.edu.kz - Сабақ материалдары</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Интерактивті құралдар:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Kahoot - Викториналар жасау</li>
                <li>Padlet - Виртуалды тақта</li>
                <li>Mentimeter - Сауалнамалар</li>
                <li>Quizizz - Интерактивті тесттер</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Мультимедиа ресурстар:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>YouTube Education каналдары</li>
                <li>Canva - Көрнекі материалдар</li>
                <li>Genially - Интерактивті презентациялар</li>
                <li>Flipgrid - Видео пікірталас</li>
              </ul>
            </div>
          </div>
        )
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <button 
              onClick={() => navigateTo('home')} 
              className="text-blue-600 hover:underline mb-4 inline-block"
            >
              ← Басты бетке оралу
            </button>
            <h1 className="text-3xl font-bold text-gray-900">👥 Оқушылар бөлімі</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-4 shadow-lg sticky top-4">
                <h3 className="font-semibold mb-4">Бөлімшелер</h3>
                <nav className="space-y-2">
                  {Object.entries(sections).map(([key, section]) => (
                    <button
                      key={key}
                      onClick={() => setActiveSection(key)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        activeSection === key 
                          ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-6">{sections[activeSection].title}</h2>
                {sections[activeSection].content}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Personality Development Page
  const PersonalityPage = () => {
    const [activeSection, setActiveSection] = useState('iq');

    const sections = {
      iq: {
        title: '🧮 IQ - Зияткерлік интеллект',
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Зияткерлік интеллект дегеніміз не?</h4>
              <p className="text-gray-700">Логикалық ойлау, талдау, жинақтау, есептеу және проблемаларды шешу қабілеті.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Дамыту жолдары:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Күнделікті кітап оқу (кемінде 30 минут)</li>
                <li>Шахмат ойнау немесе логикалық ойындар</li>
                <li>Жаңа тілдер үйрену</li>
                <li>Ғылыми мақалалар оқу</li>
                <li>Математикалық есептер шығару</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Бағалау тесттері:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Равен матрицалары</li>
                <li>Векслер шкаласы</li>
                <li>Амтхауэр тесті</li>
              </ul>
            </div>
          </div>
        )
      },
      eq: {
        title: '❤️ EQ - Эмоционалдық интеллект',
        content: (
          <div className="space-y-6">
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Эмоционалдық интеллект дегеніміз не?</h4>
              <p className="text-gray-700">Өз эмоцияларыңызды және басқалардың эмоцияларын түсіну, басқару және пайдалану қабілеті.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Негізгі компоненттер:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Өзін-өзі тану (self-awareness)</li>
                <li>Өзін-өзі басқару (self-regulation)</li>
                <li>Мотивация (motivation)</li>
                <li>Эмпатия (empathy)</li>
                <li>Әлеуметтік дағдылар (social skills)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Дамыту жаттығулары:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Күнделікті эмоция дневнигін жүргізу</li>
                <li>Медитация мен рефлексия</li>
                <li>Белсенді тыңдау дағдыларын дамыту</li>
                <li>Конфликттерді шешу тәжірибесі</li>
              </ul>
            </div>
          </div>
        )
      },
      pq: {
        title: '💪 PQ - Физикалық интеллект',
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Физикалық интеллект дегеніміз не?</h4>
              <p className="text-gray-700">Денені басқару, координация, күш, төзімділік және дене қозғалысын үйлестіру қабілеті.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Дамыту бағыттары:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Күнделікті физикалық жаттығулар</li>
                <li>Спорт түрлерімен айналысу</li>
                <li>Йога немесе пилатес</li>
                <li>Дұрыс тамақтану</li>
                <li>Ұйқы режимін сақтау</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Мұғалімдерге арналған:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Дұрыс отыру позасы</li>
                <li>Тыныс алу техникалары</li>
                <li>Көз жаттығулары</li>
                <li>Серпіну минуттары</li>
              </ul>
            </div>
          </div>
        )
      },
      sq: {
        title: '🙏 SQ - Рухани интеллект',
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Рухани интеллект дегеніміз не?</h4>
              <p className="text-gray-700">Өмірдің мағынасын табу, құндылықтарды анықтау және рухани дамуға ұмтылу қабілеті.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Дамыту жолдары:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Медитация мен рефлексия</li>
                <li>Философиялық кітаптар оқу</li>
                <li>Табиғатпен уақыт өткізу</li>
                <li>Қайырымдылық жасау</li>
                <li>Өзіндік дамуға бағытталған семинарлар</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Мұғалім үшін маңыздылығы:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Кәсіби мақсаттарды анықтау</li>
                <li>Оқушылармен рухани байланыс орнату</li>
                <li>Стресспен күресу</li>
                <li>Өмірлік тепе-теңдік сақтау</li>
              </ul>
            </div>
          </div>
        )
      },
      tracker: {
        title: '📊 Даму трекері',
        content: <DevelopmentTracker />
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <button 
              onClick={() => navigateTo('home')} 
              className="text-blue-600 hover:underline mb-4 inline-block"
            >
              ← Басты бетке оралу
            </button>
            <h1 className="text-3xl font-bold text-gray-900">🧠 Тұлғалық даму бөлімі</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-4 shadow-lg sticky top-4">
                <h3 className="font-semibold mb-4">Бөлімшелер</h3>
                <nav className="space-y-2">
                  {Object.entries(sections).map(([key, section]) => (
                    <button
                      key={key}
                      onClick={() => setActiveSection(key)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        activeSection === key 
                          ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-6">{sections[activeSection].title}</h2>
                {sections[activeSection].content}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Diagnostics Page  
  const DiagnosticsPage = () => {
    const [activeSection, setActiveSection] = useState('assessment');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [diagnosticAnswers, setDiagnosticAnswers] = useState({});
    const [showDiagnosticResults, setShowDiagnosticResults] = useState(false);
    const [currentTest, setCurrentTest] = useState(null);
    const [testQuestionIndex, setTestQuestionIndex] = useState(0);
    const [testAnswers, setTestAnswers] = useState({});
    const [showTestResults, setShowTestResults] = useState(false);

    const diagnosticQuestions = [
      {
        id: 'position',
        title: 'Қызмет ету бағыты (лауазым)',
        type: 'single',
        options: [
          'Студент/Болашақ мұғалім',
          'Бастауыш сынып мұғалімі',
          'Қазақ тілі пәні мұғалімі',
          'Математика пәні мұғалімі',
          'Ағылшын пәні мұғалімі',
          'Орыс тілі пәні мұғалімі',
          'Тарих пәні мұғалімі',
          'Физика пәні мұғалімі',
          'Химия пәні мұғалімі',
          'Биология пәні мұғалімі',
          'География пәні мұғалімі'
        ]
      },
      {
        id: 'experience',
        title: 'Жұмыс өтілі / Оқу кезеңі',
        type: 'single',
        options: [
          'Студент (1-2 курс)',
          'Студент (3-4 курс)',
          'Тәжірибе жоқ (жаңа бітірген)',
          '3 ай мен 6 ай аралығы',
          '6-12 ай аралығы',
          '1 жыл-3 жыл аралығы',
          '3 жыл - 5 жыл аралығы',
          '5 жыл-8 жыл аралығы',
          '8 жыл-10 жыл аралығы',
          '10 жылдан астам'
        ]
      },
      {
        id: 'digital_skills',
        title: 'Цифрлы технологиялармен жұмыс дағдылары',
        type: 'single',
        options: [
          'Базалық деңгей (Word, PowerPoint)',
          'Орташа деңгей (Excel, онлайн платформалар)',
          'Жақсы деңгей (интерактивті тақталар, білім беру қосымшалары)',
          'Жоғары деңгей (AI құралдар, кодтау негіздері)',
          'Эксперт деңгей (жаңа технологияларды енгізу, басқаларды үйрету)'
        ]
      },
      {
        id: 'challenges',
        title: 'Кәсіби қызметтегі негізгі қиындықтар',
        type: 'multiple',
        options: [
          'Оқушыларды мотивациялау',
          'Дисциплинаны сақтау',
          'Ата-аналармен қарым-қатынас',
          'Жаңа технологияларды меңгеру',
          'Уақытты басқару',
          'Сабақты жоспарлау',
          'Бағалау жүйесі',
          'Кәсіби құжаттама',
          'Стресс және эмоционалды жүктеме',
          'Кәсіби дамуға уақыт тапу'
        ]
      },
      {
        id: 'goals',
        title: 'Кәсіби дамудағы басым бағыттар',
        type: 'multiple',
        options: [
          'Пәндік білімді тереңдету',
          'Жаңа оқыту әдістерін меңгеру',
          'AI технологияларын қолдану',
          'Дарынды балалармен жұмыс',
          'Инклюзивті білім беру',
          'Лидерлік дағдыларды дамыту',
          'Зерттеушілік қызмет',
          'Халықаралық тәжірибе алу',
          'Санат көтеру',
          'Өз бизнесін бастау'
        ]
      },
      {
        id: 'learning_style',
        title: 'Сіз үшін тиімді оқыту форматы',
        type: 'single',
        options: [
          'Онлайн курстар (өз қарқынымен)',
          'Тікелей семинарлар мен тренингтер',
          'Менторлықпен жеке жұмыс',
          'Топтық жобалар мен тәжірибе алмасу',
          'Өзіндік зерттеу және кітап оқу',
          'Практикалық тапсырмалар мен кейстер',
          'Видео материалдар мен подкастер',
          'Конференциялар мен форумдар'
        ]
      }
    ];

    const handleDiagnosticAnswer = (questionId, answer, isMultiple = false) => {
      if (isMultiple) {
        const currentAnswers = diagnosticAnswers[questionId] || [];
        const newAnswers = currentAnswers.includes(answer)
          ? currentAnswers.filter(a => a !== answer)
          : [...currentAnswers, answer];
        setDiagnosticAnswers({ ...diagnosticAnswers, [questionId]: newAnswers });
      } else {
        setDiagnosticAnswers({ ...diagnosticAnswers, [questionId]: answer });
      }
    };

    const nextDiagnosticQuestion = () => {
      if (currentQuestionIndex < diagnosticQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowDiagnosticResults(true);
      }
    };

    const prevDiagnosticQuestion = () => {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }
    };

    const resetDiagnostic = () => {
      setCurrentQuestionIndex(0);
      setDiagnosticAnswers({});
      setShowDiagnosticResults(false);
    };

    const generateRecommendations = () => {
      const experience = diagnosticAnswers.experience;
      const position = diagnosticAnswers.position;
      const digitalSkills = diagnosticAnswers.digital_skills;
      const challenges = diagnosticAnswers.challenges || [];
      const goals = diagnosticAnswers.goals || [];

      let recommendations = [];
      
      // Experience-based recommendations
      if (experience && (experience.includes('Студент') || experience.includes('Тәжірибе жоқ'))) {
        recommendations.push({
          title: 'Базалық педагогикалық дағдылар',
          description: 'Сабақ жоспарлау, сынып басқару және бағалау негіздері',
          priority: 'Жоғары',
          icon: '📚'
        });
      }

      // Digital skills recommendations
      if (digitalSkills && digitalSkills.includes('Базалық деңгей')) {
        recommendations.push({
          title: 'Цифрлы сауаттылық',
          description: 'Заманауи білім беру технологиялары мен платформаларды меңгеру',
          priority: 'Орташа',
          icon: '💻'
        });
      }

      // Challenge-based recommendations
      if (challenges.includes('Оқушыларды мотивациялау')) {
        recommendations.push({
          title: 'Мотивация техникалары',
          description: 'Оқушылардың қызығушылығын арттыру әдістері',
          priority: 'Жоғары',
          icon: '🎯'
        });
      }

      if (challenges.includes('Стресс және эмоционалды жүктеме')) {
        recommendations.push({
          title: 'Эмоционалдық интеллект',
          description: 'Стресс менеджменті және эмоционалдық тепе-теңдік',
          priority: 'Жоғары',
          icon: '🧘'
        });
      }

      // Goals-based recommendations
      if (goals.includes('AI технологияларын қолдану')) {
        recommendations.push({
          title: 'AI білім беруде',
          description: 'Жасанды интеллект құралдарын педагогикада қолдану',
          priority: 'Жаңашыл',
          icon: '🤖'
        });
      }

      if (goals.includes('Дарынды балалармен жұмыс')) {
        recommendations.push({
          title: 'Дарынды балалар педагогикасы',
          description: 'Ерекше қабілетті оқушылармен жұмыс жасау әдістемесі',
          priority: 'Арнайы',
          icon: '⭐'
        });
      }

      return recommendations.length > 0 ? recommendations : [
        {
          title: 'Жалпы кәсіби даму',
          description: 'Педагогикалық шеберлікті жетілдіру',
          priority: 'Базалық',
          icon: '📈'
        }
      ];
    };

    const sections = {
      assessment: {
        title: '📈 Кәсіби диагностика',
        content: (
          <div className="space-y-6">
            {!showDiagnosticResults ? (
              <div>
                {currentQuestionIndex === 0 ? (
                  <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl mb-8">
                    <div className="text-4xl mb-4">🔬</div>
                    <h3 className="text-2xl font-bold mb-4">AI-негізделген кәсіби диагностика</h3>
                    <p className="text-gray-600 mb-6">
                      Жеке дамыту жоспарын алу үшін 6 сұраққа жауап беріңіз. 
                      Барлық деректер құпия сақталады.
                    </p>
                    <button
                      onClick={nextDiagnosticQuestion}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                    >
                      Диагностиканы бастау
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Прогресс</span>
                        <span>{currentQuestionIndex} / {diagnosticQuestions.length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(currentQuestionIndex / diagnosticQuestions.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl p-6">
                      <h3 className="text-xl font-bold mb-6 text-gray-800">
                        {diagnosticQuestions[currentQuestionIndex - 1]?.title}
                      </h3>

                      <div className="space-y-3 mb-6">
                        {diagnosticQuestions[currentQuestionIndex - 1]?.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleDiagnosticAnswer(
                              diagnosticQuestions[currentQuestionIndex - 1].id, 
                              option, 
                              diagnosticQuestions[currentQuestionIndex - 1].type === 'multiple'
                            )}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                              diagnosticQuestions[currentQuestionIndex - 1].type === 'multiple'
                                ? (diagnosticAnswers[diagnosticQuestions[currentQuestionIndex - 1].id]?.includes(option)
                                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50')
                                : (diagnosticAnswers[diagnosticQuestions[currentQuestionIndex - 1].id] === option
                                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50')
                            }`}
                          >
                            <div className="flex items-center">
                              <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                                diagnosticQuestions[currentQuestionIndex - 1].type === 'multiple'
                                  ? (diagnosticAnswers[diagnosticQuestions[currentQuestionIndex - 1].id]?.includes(option)
                                    ? 'border-blue-500 bg-blue-500'
                                    : 'border-gray-300')
                                  : (diagnosticAnswers[diagnosticQuestions[currentQuestionIndex - 1].id] === option
                                    ? 'border-blue-500 bg-blue-500'
                                    : 'border-gray-300')
                              }`}>
                                {((diagnosticQuestions[currentQuestionIndex - 1].type === 'multiple' && 
                                   diagnosticAnswers[diagnosticQuestions[currentQuestionIndex - 1].id]?.includes(option)) ||
                                  (diagnosticQuestions[currentQuestionIndex - 1].type === 'single' && 
                                   diagnosticAnswers[diagnosticQuestions[currentQuestionIndex - 1].id] === option)) && (
                                  <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                                )}
                              </div>
                              {option}
                            </div>
                          </button>
                        ))}
                      </div>

                      <div className="flex justify-between">
                        <button
                          onClick={prevDiagnosticQuestion}
                          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300"
                        >
                          Артқа
                        </button>
                        
                        <button
                          onClick={nextDiagnosticQuestion}
                          disabled={!diagnosticAnswers[diagnosticQuestions[currentQuestionIndex - 1]?.id]}
                          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          {currentQuestionIndex === diagnosticQuestions.length ? 'Аяқтау' : 'Келесі'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Диагностика нәтижелері</h2>
                  <p className="text-gray-600">Сіздің жауаптарыңыз негізінде құрастырылған жеке даму жоспары</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                    <h3 className="text-xl font-semibold text-blue-800 mb-4">📋 Сіздің профиліңіз</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Лауазым:</span>
                        <span className="text-gray-800">{diagnosticAnswers.position}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Тәжірибе:</span>
                        <span className="text-gray-800">{diagnosticAnswers.experience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Цифрлы дағдылар:</span>
                        <span className="text-gray-800">{diagnosticAnswers.digital_skills}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                    <h3 className="text-xl font-semibold text-green-800 mb-4">🎯 Жеке ұсыныстар</h3>
                    <div className="space-y-3">
                      {generateRecommendations().slice(0, 3).map((rec, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <span className="text-xl">{rec.icon}</span>
                          <div>
                            <div className="font-semibold text-gray-800 text-sm">{rec.title}</div>
                            <div className="text-gray-600 text-xs">{rec.description}</div>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                              rec.priority === 'Жоғары' ? 'bg-red-100 text-red-700' :
                              rec.priority === 'Орташа' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {rec.priority}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-2xl border border-purple-100 mb-8">
                  <h3 className="text-xl font-semibold text-purple-800 mb-4">📚 Ұсынылатын курстар</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {generateRecommendations().map((rec, index) => (
                      <div key={index} className="bg-white p-4 rounded-xl border border-purple-100">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-2xl">{rec.icon}</span>
                          <div>
                            <div className="font-semibold text-gray-800">{rec.title}</div>
                            <div className="text-gray-600 text-sm">{rec.description}</div>
                          </div>
                        </div>
                        <button className="w-full mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all text-sm">
                          Курсқа жазылу
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={resetDiagnostic}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 mr-4"
                  >
                    Қайтадан өту
                  </button>
                  <button
                    onClick={() => setActiveSection('tests')}
                    className="px-8 py-3 border-2 border-purple-300 text-purple-700 rounded-full font-semibold hover:bg-purple-50 transition-all duration-300"
                  >
                    Психологиялық тест өту
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      },
      tests: {
        title: '📝 Психологиялық тестілер',
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Психологиялық тестілер не үшін керек?</h4>
              <p className="text-gray-700">Жеке тұлғалық ерекшеліктерді, қабілеттерді және даму потенциалын анықтау үшін.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'MBTI - Тұлға типі',
                  description: '16 тұлға типінің біреуін анықтап, күшті және әлсіз жақтарыңызды біліңіз',
                  time: '15 минут',
                  icon: '🧠',
                  color: 'blue'
                },
                {
                  title: 'Эмоционалдық интеллект',
                  description: 'Эмоцияларды басқару және түсіну қабілетіңізді тексеріңіз',
                  time: '10 минут',
                  icon: '❤️',
                  color: 'red'
                },
                {
                  title: 'Лидерлік стильдер',
                  description: 'Сіздің басқару стиліңіз және оның тиімділігі',
                  time: '12 минут',
                  icon: '👑',
                  color: 'yellow'
                },
                {
                  title: 'Стресске төзімділік',
                  description: 'Қиын жағдайларға төтеп беру қабілетіңізді бағалаңыз',
                  time: '8 минут',
                  icon: '🛡️',
                  color: 'green'
                },
                {
                  title: 'Креативтілік деңгейі',
                  description: 'Шығармашылық қабілеттеріңіз бен инновациялық ойлауыңыз',
                  time: '20 минут',
                  icon: '🎨',
                  color: 'purple'
                },
                {
                  title: 'Командалық жұмыс',
                  description: 'Топтық жұмыстағы рөліңіз және ықпал етуші факторлар',
                  time: '10 минут',
                  icon: '🤝',
                  color: 'indigo'
                }
              ].map((test, index) => (
                <div key={index} className="bg-blue-50 border border-blue-100 p-6 rounded-2xl hover:shadow-lg transition-all">
                  <div className="text-3xl mb-4">{test.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{test.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{test.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">⏱️ {test.time}</span>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm">
                      Тест өту
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100 mt-8">
              <h4 className="font-semibold mb-2">💡 Тестілер туралы ескерту</h4>
              <p className="text-gray-700 text-sm">
                Психологиялық тестілер нәтижелері кеңес беру мақсатында ғана қолданылады. 
                Нақты диагноз қою үшін маманға жүгініңіз.
              </p>
            </div>
          </div>
        )
      },
      analysis: {
        title: '📊 Нәтижелерді талдау',
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Талдау процесі</h4>
              <p className="text-gray-700">Алынған деректерді жүйелі түрде өңдеу және даму стратегиясын құру.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Талдау кезеңдері:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Деректерді жинақтау</li>
                <li>Нәтижелерді салыстыру</li>
                <li>Үрдістерді анықтау</li>
                <li>Қорытынды жасау</li>
                <li>Ұсыныстар беру</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Даму жоспары құру:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>SMART мақсаттарын қою</li>
                <li>Қысқа және ұзақ мерзімді жоспарлар</li>
                <li>Ресурстарды анықтау</li>
                <li>Прогресті бақылау әдістері</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-2xl border border-green-100 mt-6">
              <h4 className="font-semibold mb-4 text-green-800">📈 Даму жоспары үлгісі</h4>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-gray-800">Қысқа мерзімді мақсат (1-3 ай)</h5>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Прогресс: 60%</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Цифрлы технологияларды меңгеру</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-gray-800">Орташа мерзімді мақсат (3-6 ай)</h5>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Жоспарланған</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">AI құралдарын сабақта қолдану</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '25%'}}></div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-gray-800">Ұзақ мерзімді мақсат (6-12 ай)</h5>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Стратегиялық</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Лидерлік позициясына көтерілу</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '10%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <button 
              onClick={() => navigateTo('home')} 
              className="text-blue-600 hover:underline mb-4 inline-block"
            >
              ← Басты бетке оралу
            </button>
            <h1 className="text-3xl font-bold text-gray-900">🔍 Диагностика бөлімі</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-4 shadow-lg sticky top-4">
                <h3 className="font-semibold mb-4">Бөлімшелер</h3>
                <nav className="space-y-2">
                  {Object.entries(sections).map(([key, section]) => (
                    <button
                      key={key}
                      onClick={() => setActiveSection(key)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        activeSection === key 
                          ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-6">{sections[activeSection].title}</h2>
                {sections[activeSection].content}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render the appropriate page based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'teachers':
        return <TeachersPage />;
      case 'students':
        return <StudentsPage />;
      case 'personality':
        return <PersonalityPage />;
      case 'diagnostics':
        return <DiagnosticsPage />;
      default:
        return <HomePage />;
    }
  };

  return renderPage();
};

export default App;