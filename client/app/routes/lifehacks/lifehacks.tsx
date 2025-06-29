import "./lifehacks.css";

export default function LifeHacksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-0 font-sans leading-relaxed md:p-5">
      <div className="container mx-auto overflow-hidden bg-white shadow md:rounded-2xl">
        <div className="header relative overflow-hidden px-4 pt-24 pb-4 text-center md:p-10 md:pt-20">
          <div className="promentor-badge">PRO-mentor.kz</div>
          <p className="main-title z-[2] mb-6 text-4xl font-[800] md:text-5xl">
            20 Цифрлық лайфхактар
          </p>
          <p className="text-base text-white/70 md:text-xl">
            Заманауи мұғалімдерге арналған практикалық құралдар
          </p>
          <div className="stats-bar">
            <div className="stat-item">
              <span className="stat-number">20</span>
              <span className="stat-label">Құрал</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">⚡</span>
              <span className="stat-label">Жылдам</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">💡</span>
              <span className="stat-label">Пайдалы</span>
            </div>
          </div>
        </div>

        <div className="!px-4 md:!px-6">
          <div className="intro-section mt-6">
            <h2>🚀 Сабағыңызды жаңа деңгейге көтеріңіз!</h2>
            <p>
              Осы 20 тамаша цифрлық құрал арқылы сабақтарыңызды интерактивті,
              тиімді және қызықты етіңіз.
            </p>
          </div>

          <div className="category-header">
            📄 Құжаттармен жұмыс және ақпарат басқару
          </div>

          <div className="tools-grid">
            <div className="tool-card">
              <div className="tool-header">
                <div className="tool-icon">🌐</div>
                <div className="tool-title">
                  <div className="tool-name">DosTranslator</div>
                  <div className="tool-purpose">
                    Құжаттарды автоматты аудару
                  </div>
                </div>
              </div>
              <div className="tool-description">
                PDF, Word құжаттарын тез әрі оңай басқа тілге аударып алу үшін
                тамаша құрал.
              </div>
              <div className="guide-section">
                <h4>📋 Қолдану гайды:</h4>
                <div className="guide-steps">
                  <ol>
                    <li>Сайтқа кіріңіз</li>
                    <li>Құжатты жүктеңіз</li>
                    <li>Аударылатын тілді таңдаңыз (орысшадан қазақшаға)</li>
                    <li>«Translate» батырмасын басыңыз</li>
                    <li>Аударылған нұсқасын жүктеп алыңыз</li>
                  </ol>
                </div>
                <div className="url-box">
                  <a
                    href="https://dostranslator.com"
                    target="_blank"
                    className="url-link"
                  >
                    https://dostranslator.com
                  </a>
                </div>
                <div className="benefit-box">
                  <strong>Пайдасы:</strong> Әріптестермен немесе оқушылармен
                  құжаттарды көп тілді түрде бөлісуге ыңғайлы
                </div>
              </div>
            </div>

            <div className="tool-card">
              <div className="tool-header">
                <div className="tool-icon">📫</div>
                <div className="tool-title">
                  <div className="tool-name">Temp.Mail</div>
                  <div className="tool-purpose">Уақытша электронды пошта</div>
                </div>
              </div>
              <div className="tool-description">
                Уақытша поштамен тіркелу, спамнан сақтану үшін керемет шешім.
              </div>
              <div className="guide-section">
                <h4>📋 Қолдану гайды:</h4>
                <div className="guide-steps">
                  <ol>
                    <li>Сайтқа кіріңіз</li>
                    <li>Сізге автоматты түрде пошта мекенжайы беріледі</li>
                    <li>Сол пошта арқылы қажет платформаға тіркеліңіз</li>
                    <li>Хаттар автоматты түрде сайт бетінде көрінеді</li>
                  </ol>
                </div>
                <div className="url-box">
                  <a
                    href="https://temp-mail.org"
                    target="_blank"
                    className="url-link"
                  >
                    https://temp-mail.org
                  </a>
                </div>
                <div className="benefit-box">
                  <strong>Пайдасы:</strong> Уақытша тіркелу қажет болғанда жеке
                  поштаңызды қолданбайсыз
                </div>
              </div>
            </div>
          </div>

          <div className="category-header">
            ⏰ Уақытты басқару және мультимедиа
          </div>

          <div className="tools-grid">
            <div className="tool-card">
              <div className="tool-header">
                <div className="tool-icon">⏱</div>
                <div className="tool-title">
                  <div className="tool-name">Stopwatch & Timer</div>
                  <div className="tool-purpose">Сабақтағы уақыт бақылауы</div>
                </div>
              </div>
              <div className="tool-description">
                Таймер арқылы уақытты қадағалау (тапсырмаға бөлінген уақыт
                үшін).
              </div>
              <div className="guide-section">
                <h4>📋 Қолдану гайды:</h4>
                <div className="guide-steps">
                  <ol>
                    <li>Сайтқа кіріңіз</li>
                    <li>Қалауыңыз бойынша таймер немесе секундомер таңдаңыз</li>
                    <li>Уақытты қойып, іске қосыңыз</li>
                    <li>
                      Қоңырау дыбысы арқылы оқушыларға уақыт аяқталғанын
                      білдіріңіз
                    </li>
                  </ol>
                </div>
                <div className="url-box">
                  <a
                    href="https://www.online-stopwatch.com"
                    target="_blank"
                    className="url-link"
                  >
                    https://www.online-stopwatch.com
                  </a>
                </div>
                <div className="benefit-box">
                  <strong>Пайдасы:</strong> Уақытты тиімді басқаруға көмектеседі
                </div>
              </div>
            </div>

            <div className="tool-card">
              <div className="tool-header">
                <div className="tool-icon">🎥</div>
                <div className="tool-title">
                  <div className="tool-name">Loom</div>
                  <div className="tool-purpose">Экран және видео жазу</div>
                </div>
              </div>
              <div className="tool-description">
                Сабақ түсіндіруді экранмен бірге өзіңіздің даусыңыз және бет
                бейнеңізді жазу.
              </div>
              <div className="guide-section">
                <h4>📋 Қолдану гайды:</h4>
                <div className="guide-steps">
                  <ol>
                    <li>Сайтқа кіріңіз</li>
                    <li>Аккаунт ашыңыз (мұғалімдерге Premium)</li>
                    <li>
                      «Record» батырмасын басып, экран мен камераны таңдаңыз
                    </li>
                    <li>
                      Жазба аяқталған соң, сілтемені оқушылармен бөлісе аласыз
                    </li>
                  </ol>
                </div>
                <div className="url-box">
                  <a
                    href="https://www.loom.com"
                    target="_blank"
                    className="url-link"
                  >
                    https://www.loom.com
                  </a>
                </div>
                <div className="benefit-box">
                  <strong>Пайдасы:</strong> Қайта қарауға болатын
                  видео-нұсқаулықтар жасау оңай
                </div>
              </div>
            </div>
          </div>

          <div className="category-header">🎨 Интерактивті сабақ құралдары</div>

          <div className="tools-grid">
            <div className="tool-card">
              <div className="tool-header">
                <div className="tool-icon">🎨</div>
                <div className="tool-title">
                  <div className="tool-name">Gynzy</div>
                  <div className="tool-purpose">
                    Интерактивті сабақ құралдары
                  </div>
                </div>
              </div>
              <div className="tool-description">
                Интерактивті тақтада сабақ өткізуге арналған құралдар жиынтығы.
              </div>
              <div className="guide-section">
                <h4>📋 Қолдану гайды:</h4>
                <div className="guide-steps">
                  <ol>
                    <li>Сайтқа кіріңіз</li>
                    <li>Аккаунт ашып, панельге кіріңіз</li>
                    <li>
                      Сабаққа қажет құралдарды таңдаңыз: математикалық сызғыш,
                      тақырыптық слайдтар, ойындар
                    </li>
                    <li>
                      Барлығын бір жерде қолдана аласыз – онлайн тақта ретінде
                    </li>
                  </ol>
                </div>
                <div className="url-box">
                  <a
                    href="https://www.gynzy.com"
                    target="_blank"
                    className="url-link"
                  >
                    https://www.gynzy.com
                  </a>
                </div>
                <div className="benefit-box">
                  <strong>Пайдасы:</strong> Интерактивті, визуалды материалдар
                  сабаққа қызығушылықты арттырады
                </div>
              </div>
            </div>

            <div className="tool-card">
              <div className="tool-header">
                <div className="tool-icon">🟢</div>
                <div className="tool-title">
                  <div className="tool-name">Bouncy Balls</div>
                  <div className="tool-purpose">Шу деңгейін бақылау</div>
                </div>
              </div>
              <div className="tool-description">
                Сыныптағы шуды визуалды түрде көрсетіп, оқушыларды тәртіпке
                шақыру.
              </div>
              <div className="guide-section">
                <h4>📋 Қолдану гайды:</h4>
                <div className="guide-steps">
                  <ol>
                    <li>Сайтқа кіріп микрофонға рұқсат беріңіз</li>
                    <li>
                      Оқушылар сөйлегенде немесе шуды көтергенде шарлар секіреді
                    </li>
                    <li>Дыбыс азайса, шарлар тынышталады</li>
                  </ol>
                </div>
                <div className="url-box">
                  <a
                    href="https://bouncyballs.org"
                    target="_blank"
                    className="url-link"
                  >
                    https://bouncyballs.org
                  </a>
                </div>
                <div className="benefit-box">
                  <strong>Пайдасы:</strong> Оқушыларға визуалды кері байланыс
                  беріп, тәртіп сақтауға көмектеседі
                </div>
              </div>
            </div>

            <div className="tool-card">
              <div className="tool-header">
                <div className="tool-icon">🎯</div>
                <div className="tool-title">
                  <div className="tool-name">Baamboozle</div>
                  <div className="tool-purpose">
                    Топтық ойындар мен викториналар
                  </div>
                </div>
              </div>
              <div className="tool-description">
                Сабақта көңілді топтық жарыс ойындарын өткізу.
              </div>
              <div className="guide-section">
                <h4>📋 Қолдану гайды:</h4>
                <div className="guide-steps">
                  <ol>
                    <li>
                      Дайын ойындардан таңдаңыз немесе өз сұрақтарыңызды жасаңыз
                    </li>
                    <li>Сыныпты топқа бөліп, тақтада ойынды қосыңыз</li>
                    <li>Оқушылар жауап берген сайын ұпай беріледі</li>
                  </ol>
                </div>
                <div className="url-box">
                  <a
                    href="https://www.baamboozle.com"
                    target="_blank"
                    className="url-link"
                  >
                    https://www.baamboozle.com
                  </a>
                </div>
                <div className="benefit-box">
                  <strong>Пайдасы:</strong> Сабақта көңіл-күйді көтереді,
                  белсенділік артады
                </div>
              </div>
            </div>

            <div className="tool-card">
              <div className="tool-header">
                <div className="tool-icon">📊</div>
                <div className="tool-title">
                  <div className="tool-name">Plickers</div>
                  <div className="tool-purpose">
                    Смартфоны жоқ оқушылардан кері байланыс алу
                  </div>
                </div>
              </div>
              <div className="tool-description">
                Оқушылар смартфонсыз, мұғалімнің телефоны арқылы жауап береді.
              </div>
              <div className="guide-section">
                <h4>📋 Қолдану гайды:</h4>
                <div className="guide-steps">
                  <ol>
                    <li>
                      Оқушыларға арналған арнайы QR кодтарды басып шығарыңыз
                    </li>
                    <li>Сұрақты экраннан көрсетіңіз, оқушы кодты ұстайды</li>
                    <li>
                      Мұғалім Plickers қолданбасымен оқушылардың жауаптарын
                      сканерлейді
                    </li>
                  </ol>
                </div>
                <div className="url-box">
                  <a
                    href="https://www.plickers.com"
                    target="_blank"
                    className="url-link"
                  >
                    https://www.plickers.com
                  </a>
                </div>
                <div className="benefit-box">
                  <strong>Пайдасы:</strong> Технологиясы шектеулі сыныптар үшін
                  тиімді, интерактивті құрал
                </div>
              </div>
            </div>
          </div>

          <div className="category-header">🧠 AI және автоматтандыру</div>

          <div className="tools-grid">
            <div className="tool-card">
              <div className="tool-header">
                <div className="tool-icon">🧠</div>
                <div className="tool-title">
                  <div className="tool-name">Brained</div>
                  <div className="tool-purpose">
                    Сабақ жоспарын AI көмегімен жасау
                  </div>
                </div>
              </div>
              <div className="tool-description">
                Сабақ жоспарын автоматты түрде құру, тапсырмалар ұсыну.
              </div>
              <div className="guide-section">
                <h4>📋 Қолдану гайды:</h4>
                <div className="guide-steps">
                  <ol>
                    <li>Сабақтың тақырыбын, деңгейін, пәнін енгізіңіз</li>
                    <li>
                      Платформа сізге толық сабақ жоспарын (мақсат, материал,
                      тапсырма) ұсынады
                    </li>
                    <li>Жүктеп алып қолдануға болады</li>
                  </ol>
                </div>
                <div className="url-box">
                  <a
                    href="https://brained.ai"
                    target="_blank"
                    className="url-link"
                  >
                    https://brained.ai
                  </a>
                </div>
                <div className="benefit-box">
                  <strong>Пайдасы:</strong> Уақытты үнемдеп, тиімді жоспар
                  құруға көмек береді
                </div>
              </div>
            </div>

            <div className="tool-card">
              <div className="tool-header">
                <div className="tool-icon">🔢</div>
                <div className="tool-title">
                  <div className="tool-name">Equatio</div>
                  <div className="tool-purpose">Формулаларды цифрлы жазу</div>
                </div>
              </div>
              <div className="tool-description">
                Математика, физика сабақтарында формулаларды оңай енгізу.
              </div>
              <div className="guide-section">
                <h4>📋 Қолдану гайды:</h4>
                <div className="guide-steps">
                  <ol>
                    <li>Chrome кеңейтім ретінде орнатыңыз</li>
                    <li>Дауыспен, мәтінмен немесе қолмен формула жазыңыз</li>
                    <li>
                      Google Docs, Forms сияқты платформалармен интеграцияланады
                    </li>
                  </ol>
                </div>
                <div className="url-box">
                  <a
                    href="https://chrome.google.com/webstore/search/equatio"
                    target="_blank"
                    className="url-link"
                  >
                    Chrome Web Store: Equatio
                  </a>
                </div>
                <div className="benefit-box">
                  <strong>Пайдасы:</strong> Формула жазуды тездетеді,
                  оқушылармен цифрлы жұмыс парақтарын жасауға болады
                </div>
              </div>
            </div>
          </div>

          <div className="category-header">📚 Тапсырма және бағалау</div>

          <div className="tools-grid">
            <div className="tool-card">
              <div className="tool-header">
                <div className="tool-icon">📚</div>
                <div className="tool-title">
                  <div className="tool-name">ReadTheory</div>
                  <div className="tool-purpose">
                    Оқушыларға арналған оқу деңгейін арттыру
                  </div>
                </div>
              </div>
              <div className="tool-description">
                Ағылшын тілінде оқуды дамытатын бейімделетін тапсырмалар.
              </div>
              <div className="guide-section">
                <h4>📋 Қолдану гайды:</h4>
                <div className="guide-steps">
                  <ol>
                    <li>Мұғалім ретінде тіркеліңіз</li>
                    <li>Оқушыларға аккаунт жасаңыз немесе код жіберіңіз</li>
                    <li>
                      Сайт оқушының деңгейіне қарай мәтін мен сұрақтар береді
                    </li>
                  </ol>
                </div>
                <div className="url-box">
                  <a
                    href="https://readtheory.org"
                    target="_blank"
                    className="url-link"
                  >
                    https://readtheory.org
                  </a>
                </div>
                <div className="benefit-box">
                  <strong>Пайдасы:</strong> Дифференциалды оқытуға таптырмас
                  құрал (әсіресе тіл үйретуде)
                </div>
              </div>
            </div>

            <div className="tool-card">
              <div className="tool-header">
                <div className="tool-icon">📎</div>
                <div className="tool-title">
                  <div className="tool-name">Wizer.me</div>
                  <div className="tool-purpose">Интерактивті жұмыс парағы</div>
                </div>
              </div>
              <div className="tool-description">
                Онлайн тапсырмалар жасауды автоматтандыру (тестілеу, сәйкестік,
                ашық сұрақ).
              </div>
              <div className="guide-section">
                <h4>📋 Қолдану гайды:</h4>
                <div className="guide-steps">
                  <ol>
                    <li>
                      "Create Worksheet" → сұрақ түрлерін қосыңыз (тест, мәтін,
                      сурет)
                    </li>
                    <li>Оқушы орындаған соң, жүйе автоматты түрде бағалайды</li>
                  </ol>
                </div>
                <div className="url-box">
                  <a
                    href="https://www.wizer.me"
                    target="_blank"
                    className="url-link"
                  >
                    https://www.wizer.me
                  </a>
                </div>
                <div className="benefit-box">
                  <strong>Пайдасы:</strong> Цифрлы бағалау және тапсырма жасау
                  жеңіл әрі ыңғайлы
                </div>
              </div>
            </div>

            <div className="tool-card">
              <div className="tool-header">
                <div className="tool-icon">🎥</div>
                <div className="tool-title">
                  <div className="tool-name">Edpuzzle</div>
                  <div className="tool-purpose">Видеоға сұрақ енгізу</div>
                </div>
              </div>
              <div className="tool-description">
                YouTube видеоларына сұрақ қойып, бақылау жұмысын жасау.
              </div>
              <div className="guide-section">
                <h4>📋 Қолдану гайды:</h4>
                <div className="guide-steps">
                  <ol>
                    <li>Видео таңдаңыз (немесе жүктеңіз)</li>
                    <li>
                      Қажетті жеріне сұрақ қосыңыз (multiple choice немесе ашық)
                    </li>
                    <li>Оқушы видео көріп отырып, сұрақтарға жауап береді</li>
                  </ol>
                </div>
                <div className="url-box">
                  <a
                    href="https://edpuzzle.com"
                    target="_blank"
                    className="url-link"
                  >
                    https://edpuzzle.com
                  </a>
                </div>
                <div className="benefit-box">
                  <strong>Пайдасы:</strong> Оқушының видеоны түсіну деңгейін
                  нақты тексереді
                </div>
              </div>
            </div>
          </div>

          <div className="category-header">🎮 Қосымша пайдалы құралдар</div>

          <div className="tools-grid">
            <div className="tool-card">
              <div className="tool-header">
                <div className="tool-icon">📋</div>
                <div className="tool-title">
                  <div className="tool-name">Kahoot</div>
                  <div className="tool-purpose">Интерактивті викторина</div>
                </div>
              </div>
              <div className="tool-description">
                Сабақты қызықты етуге арналған викторина ойындары.
              </div>
              <div className="guide-section">
                <h4>📋 Қолдану гайды:</h4>
                <div className="guide-steps">
                  <ol>
                    <li>Аккаунт ашып, викторина жасаңыз</li>
                    <li>Оқушыларға PIN код беріңіз</li>
                    <li>Нақты уақытта сұрақтарға жауап береді</li>
                    <li>Рейтинг көрсетіледі</li>
                  </ol>
                </div>
                <div className="url-box">
                  <a
                    href="https://kahoot.com"
                    target="_blank"
                    className="url-link"
                  >
                    https://kahoot.com
                  </a>
                </div>
                <div className="benefit-box">
                  <strong>Пайдасы:</strong> Сабаққа серпін мен бәсекелестік
                  қосады
                </div>
              </div>
            </div>

            <div className="tool-card">
              <div className="tool-header">
                <div className="tool-icon">📊</div>
                <div className="tool-title">
                  <div className="tool-name">Mentimeter</div>
                  <div className="tool-purpose">Сұрақ-жауап және сауалнама</div>
                </div>
              </div>
              <div className="tool-description">
                Нақты уақытта пікір жинау және интерактивті презентация жасау.
              </div>
              <div className="guide-section">
                <h4>📋 Қолдану гайды:</h4>
                <div className="guide-steps">
                  <ol>
                    <li>Презентация жасап, сұрақтар қосыңыз</li>
                    <li>Оқушылар телефонмен кодты енгізеді</li>
                    <li>Нәтижелер нақты уақытта көрінеді</li>
                    <li>Сөз бұлты, дауыс беру мүмкіндіктері бар</li>
                  </ol>
                </div>
                <div className="url-box">
                  <a
                    href="https://www.mentimeter.com"
                    target="_blank"
                    className="url-link"
                  >
                    https://www.mentimeter.com
                  </a>
                </div>
                <div className="benefit-box">
                  <strong>Пайдасы:</strong> Барлық оқушының пікірін жинап,
                  талдауға болады
                </div>
              </div>
            </div>

            <div className="tool-card">
              <div className="tool-header">
                <div className="tool-icon">🎨</div>
                <div className="tool-title">
                  <div className="tool-name">Canva</div>
                  <div className="tool-purpose">
                    Презентация және постер жасау
                  </div>
                </div>
              </div>
              <div className="tool-description">
                Әдемі презентациялар, постерлер, инфографика жасау.
              </div>
              <div className="guide-section">
                <h4>📋 Қолдану гайды:</h4>
                <div className="guide-steps">
                  <ol>
                    <li>Мұғалім аккаунтын ашыңыз</li>
                    <li>Дайын үлгілерден таңдаңыз</li>
                    <li>Мәтін, сурет, элементтер қосыңыз</li>
                    <li>PDF немесе PNG форматында жүктеңіз</li>
                  </ol>
                </div>
                <div className="url-box">
                  <a
                    href="https://www.canva.com"
                    target="_blank"
                    className="url-link"
                  >
                    https://www.canva.com
                  </a>
                </div>
                <div className="benefit-box">
                  <strong>Пайдасы:</strong> Кәсіби көрінетін материалдарды
                  жылдам жасауға болады
                </div>
              </div>
            </div>

            <div className="tool-card">
              <div className="tool-header">
                <div className="tool-icon">📝</div>
                <div className="tool-title">
                  <div className="tool-name">Padlet</div>
                  <div className="tool-purpose">Бірлескен жұмыс тақтасы</div>
                </div>
              </div>
              <div className="tool-description">
                Оқушыларға идеяларын, жұмыстарын бөлісуге мүмкіндік беретін
                виртуалды тақта.
              </div>
              <div className="guide-section">
                <h4>📋 Қолдану гайды:</h4>
                <div className="guide-steps">
                  <ol>
                    <li>Тақта жасап, сілтемені оқушыларға беріңіз</li>
                    <li>Оқушылар мәтін, сурет, видео жүктей алады</li>
                    <li>Нақты уақытта бірлескен жұмыс істеуге болады</li>
                    <li>Сабақ соңында нәтижелерді сақтаңыз</li>
                  </ol>
                </div>
                <div className="url-box">
                  <a
                    href="https://padlet.com"
                    target="_blank"
                    className="url-link"
                  >
                    https://padlet.com
                  </a>
                </div>
                <div className="benefit-box">
                  <strong>Пайдасы:</strong> Топтық жұмыс пен ынтымақтастықты
                  дамытады
                </div>
              </div>
            </div>

            <div className="tool-card">
              <div className="tool-header">
                <div className="tool-icon">🔍</div>
                <div className="tool-title">
                  <div className="tool-name">Quizlet</div>
                  <div className="tool-purpose">
                    Флэш-карталар мен жаттығулар
                  </div>
                </div>
              </div>
              <div className="tool-description">
                Сөздік, терминдер мен ұғымдарды жаттауға арналған интерактивті
                карталар.
              </div>
              <div className="guide-section">
                <h4>📋 Қолдану гайды:</h4>
                <div className="guide-steps">
                  <ol>
                    <li>Терминдер мен анықтамаларды енгізіңіз</li>
                    <li>Әртүрлі ойын режимдерін таңдаңыз</li>
                    <li>Оқушылармен сетті бөлісіңіз</li>
                    <li>Прогресс пен нәтижелерді қадағалаңыз</li>
                  </ol>
                </div>
                <div className="url-box">
                  <a
                    href="https://quizlet.com"
                    target="_blank"
                    className="url-link"
                  >
                    https://quizlet.com
                  </a>
                </div>
                <div className="benefit-box">
                  <strong>Пайдасы:</strong> Сөздік пен терминдерді тиімді
                  жаттауға көмектеседі
                </div>
              </div>
            </div>

            <div className="tool-card">
              <div className="tool-header">
                <div className="tool-icon">🎯</div>
                <div className="tool-title">
                  <div className="tool-name">Classroomscreen</div>
                  <div className="tool-purpose">Виртуалды сынып тақтасы</div>
                </div>
              </div>
              <div className="tool-description">
                Интерактивті тақтада барлық қажетті құралдар бір жерде жиналған.
              </div>
              <div className="guide-section">
                <h4>📋 Қолдану гайды:</h4>
                <div className="guide-steps">
                  <ol>
                    <li>Браузерде ашып, құралдарды таңдаңыз</li>
                    <li>Таймер, дыбыс деңгейі, мәтін аймақтарын қосыңыз</li>
                    <li>QR кодтар мен сілтемелерді қосыңыз</li>
                    <li>Экранды оқушыларға көрсетіңіз</li>
                  </ol>
                </div>
                <div className="url-box">
                  <a
                    href="https://classroomscreen.com"
                    target="_blank"
                    className="url-link"
                  >
                    https://classroomscreen.com
                  </a>
                </div>
                <div className="benefit-box">
                  <strong>Пайдасы:</strong> Сабақты ұйымдастыруға көмектесетін
                  барлық құралдар бір жерде
                </div>
              </div>
            </div>

            <div className="tool-card">
              <div className="tool-header">
                <div className="tool-icon">🌐</div>
                <div className="tool-title">
                  <div className="tool-name">Flipgrid</div>
                  <div className="tool-purpose">
                    Видео дискуссиялар мен жобалар
                  </div>
                </div>
              </div>
              <div className="tool-description">
                Оқушылар видео арқылы пікірлерін, жауаптарын бөлісетін
                интерактивті платформа.
              </div>
              <div className="guide-section">
                <h4>📋 Қолдану гайды:</h4>
                <div className="guide-steps">
                  <ol>
                    <li>Топ жасап, тақырып қойыңыз</li>
                    <li>Оқушыларға қосылу кодын беріңіз</li>
                    <li>Олар қысқа видео жауаптар жасайды</li>
                    <li>Басқа оқушылар видеоларға жауап бере алады</li>
                  </ol>
                </div>
                <div className="url-box">
                  <a
                    href="https://flipgrid.com"
                    target="_blank"
                    className="url-link"
                  >
                    https://flipgrid.com
                  </a>
                </div>
                <div className="benefit-box">
                  <strong>Пайдасы:</strong> Ауызша дағдыларды дамытады, ұялшақ
                  оқушылар да белсенді болады
                </div>
              </div>
            </div>

            <div className="tool-card">
              <div className="tool-header">
                <div className="tool-icon">🎤</div>
                <div className="tool-title">
                  <div className="tool-name">Talking Code</div>
                  <div className="tool-purpose">
                    QR код арқылы дауыстық хабарлама
                  </div>
                </div>
              </div>
              <div className="tool-description">
                Дауыстық хабарламаларды QR кодқа түрлендіріп, оқушылармен
                бөлісу.
              </div>
              <div className="guide-section">
                <h4>📋 Қолдану гайды:</h4>
                <div className="guide-steps">
                  <ol>
                    <li>Дауыстық хабарламаны жазып алыңыз</li>
                    <li>Платформаға жүктеп, QR код алыңыз</li>
                    <li>QR кодты басып шығарып, оқушыларға беріңіз</li>
                    <li>Оқушылар телефонмен сканерлеп, хабарламаны тыңдайды</li>
                  </ol>
                </div>
                <div className="url-box">
                  <a
                    href="https://www.talkingcode.com"
                    target="_blank"
                    className="url-link"
                  >
                    https://www.talkingcode.com
                  </a>
                </div>
                <div className="benefit-box">
                  <strong>Пайдасы:</strong> Тыңдалым дағдыларын дамытады,
                  нұсқаулықтарды дауыспен беруге болады
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <h3>PRO-mentor.kz</h3>
          <p>Заманауи білім беру әдістемелері мен инновациялық тәсілдер</p>
          <p className="">
            Мұғалімдердің кәсіби дамуы мен сапалы білім беруге арналған
            платформа
          </p>
          <p className="copyright text-xs">
            © 2025 PROmentor. Барлық құқықтар қорғалған.
          </p>
        </div>
      </div>

      <button
        className="print-button"
        onClick={() => {
          window.print();
        }}
      >
        📄 PDF сақтау
      </button>
    </div>
  );
}
