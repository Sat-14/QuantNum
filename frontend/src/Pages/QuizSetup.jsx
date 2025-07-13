import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Users, CheckCircle, XCircle, Clock, RotateCcw, Menu, X, Home, BookOpen, Trophy, User, Mail } from 'lucide-react';

const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isVisible];
};

// Animation wrapper component
const AnimatedSection = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 'duration-1000',
  className = '' 
}) => {
  const [ref, isVisible] = useIntersectionObserver(0.1);
  
  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return 'translate-y-20';
      case 'down': return '-translate-y-20';
      case 'left': return 'translate-x-20';
      case 'right': return '-translate-x-20';
      case 'scale': return 'scale-95';
      default: return 'translate-y-20';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all ${duration} ease-out ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className={`transform transition-all ${duration} ease-out ${
          isVisible 
            ? 'translate-y-0 translate-x-0 scale-100 opacity-100' 
            : `${getInitialTransform()} opacity-0`
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </div>
  );
};

// Navigation Component
const Navigation = ({ onContactClick, activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'team', label: 'Team', icon: User },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-red-500/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-2">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-white">QuantNum Quiz</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-red-500 bg-red-500/10'
                    : 'text-gray-300 hover:text-red-500 hover:bg-red-500/10'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
            <button
              onClick={onContactClick}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-red-500/30">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-red-500 bg-red-500/10'
                      : 'text-gray-300 hover:text-red-500 hover:bg-red-500/10'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
              <button
                onClick={onContactClick}
                className="flex items-center space-x-2 w-full bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Footer Component
const Footer = ({ onContactClick }) => {
  return (
    <footer className="bg-black/80 backdrop-blur-sm border-t border-red-500/30 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-2">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-white">QuantNum</span>
            </div>
            <p className="text-gray-400">
              Empowering mathematical minds through interactive learning and challenging quizzes.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Events</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Resources</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Team</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">quantnum@iiitpune.ac.in</p>
            <p className="text-gray-400 mb-4">+91 XXX XXX XXXX</p>
            <button
              onClick={onContactClick}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25"
            >
              Get in Touch
            </button>
          </div>
        </div>
        
        <div className="border-t border-red-500/30 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 QuantNum. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// MCQ Card Component
const MCQCard = ({ question, onAnswer, userAnswer, showResult, correctAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(userAnswer || '');
  const [inputValue, setInputValue] = useState(userAnswer || '');

  useEffect(() => {
    setSelectedOption(userAnswer || '');
    setInputValue(userAnswer || '');
  }, [userAnswer, question.id]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onAnswer(option);
  };

  const handleInputChange = (value) => {
    setInputValue(value);
    onAnswer(value);
  };

  const getOptionClass = (option) => {
    let baseClass = "w-full p-4 rounded-xl border-2 transition-all duration-300 text-left group relative overflow-hidden";
    
    if (showResult) {
      if (option === correctAnswer) {
        return `${baseClass} bg-green-500/20 border-green-400 text-green-300 shadow-lg shadow-green-500/20`;
      } else if (option === selectedOption && option !== correctAnswer) {
        return `${baseClass} bg-red-500/20 border-red-400 text-red-300 shadow-lg shadow-red-500/20`;
      } else {
        return `${baseClass} bg-gray-800/50 border-gray-600 text-gray-300`;
      }
    } else {
      if (selectedOption === option) {
        return `${baseClass} bg-red-500/20 border-red-400 text-red-300 shadow-lg shadow-red-500/20`;
      } else {
        return `${baseClass} bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500 hover:shadow-lg hover:shadow-red-500/10 hover:scale-105 transform`;
      }
    }
  };

  const getInputClass = () => {
    let baseClass = "w-full p-4 rounded-xl border-2 transition-all duration-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-800/50";
    
    if (showResult) {
      if (inputValue === correctAnswer) {
        return `${baseClass} border-green-400 bg-green-500/20 shadow-lg shadow-green-500/20`;
      } else {
        return `${baseClass} border-red-400 bg-red-500/20 shadow-lg shadow-red-500/20`;
      }
    } else {
      return `${baseClass} border-gray-600 focus:border-red-500 hover:border-gray-500`;
    }
  };

  return (
    <div className="bg-black/80 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 shadow-2xl shadow-red-500/10">
      <div className="flex items-center mb-6">
        <div className={`p-3 rounded-xl mr-4 ${question.iconBg}`}>
          {question.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{question.title}</h3>
          <p className="text-gray-400">{question.difficulty}</p>
        </div>
      </div>
      
      <div className="mb-8">
        <p className="text-lg text-gray-300 leading-relaxed">{question.question}</p>
      </div>

      {question.type === 'mcq' ? (
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && handleOptionSelect(option)}
              className={getOptionClass(option)}
              disabled={showResult}
            >
              <div className="flex items-center relative z-10">
                <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                <span>{option}</span>
                {showResult && option === correctAnswer && (
                  <CheckCircle className="w-5 h-5 ml-auto text-green-400" />
                )}
                {showResult && option === selectedOption && option !== correctAnswer && (
                  <XCircle className="w-5 h-5 ml-auto text-red-400" />
                )}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => !showResult && handleInputChange(e.target.value)}
            placeholder="Enter your numerical answer..."
            className={getInputClass()}
            disabled={showResult}
          />
          {showResult && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Correct Answer: {correctAnswer}</span>
              {inputValue === correctAnswer ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400" />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Main Quiz Component
export default function QuizSetup() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [quizStarted, setQuizStarted] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const questions = [
    {
      id: 1,
      title: 'Calculus - Integration',
      difficulty: 'Medium',
      type: 'mcq',
      question: 'What is the integral of 2x with respect to x?',
      options: ['x² + C', '2x² + C', 'x²/2 + C', '2x + C'],
      correctAnswer: 'x² + C',
      iconBg: 'bg-red-500',
      icon: <Calendar className="w-6 h-6 text-white" />
    },
    {
      id: 2,
      title: 'Algebra - Quadratic',
      difficulty: 'Easy',
      type: 'numerical',
      question: 'Find the discriminant of the quadratic equation x² - 5x + 6 = 0',
      correctAnswer: '1',
      iconBg: 'bg-gray-500',
      icon: <Users className="w-6 h-6 text-white" />
    },
    {
      id: 3,
      title: 'Statistics - Probability',
      difficulty: 'Hard',
      type: 'mcq',
      question: 'What is the probability of getting exactly 2 heads in 4 coin tosses?',
      options: ['1/4', '3/8', '1/2', '5/8'],
      correctAnswer: '3/8',
      iconBg: 'bg-red-600',
      icon: <Calendar className="w-6 h-6 text-white" />
    },
    {
      id: 4,
      title: 'Combinatorics - Permutation',
      difficulty: 'Medium',
      type: 'numerical',
      question: 'How many ways can 5 people be arranged in a row?',
      correctAnswer: '120',
      iconBg: 'bg-gray-600',
      icon: <Users className="w-6 h-6 text-white" />
    },
    {
      id: 5,
      title: 'Geometry - Circles',
      difficulty: 'Easy',
      type: 'mcq',
      question: 'What is the area of a circle with radius 3?',
      options: ['6π', '9π', '12π', '18π'],
      correctAnswer: '9π',
      iconBg: 'bg-red-500',
      icon: <Calendar className="w-6 h-6 text-white" />
    }
  ];

  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0 && !showResults) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setShowResults(true);
    }
    return () => clearInterval(timer);
  }, [quizStarted, timeLeft, showResults]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const submitQuiz = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    setTimeLeft(1800);
    setQuizStarted(false);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / questions.length) * 100;
  };

  const getBackgroundClass = () => {
    switch (activeSection) {
      case 'hero':
        return 'bg-gradient-to-br from-black via-gray-900 to-black';
      case 'events':
        return 'bg-gradient-to-br from-gray-900 via-black to-gray-900';
      case 'team':
        return 'bg-gradient-to-br from-black via-gray-900 to-black';
      case 'footer':
        return 'bg-gradient-to-br from-gray-900 via-black to-gray-900';
      default:
        return 'bg-gradient-to-br from-black via-gray-900 to-black';
    }
  };

  if (!quizStarted) {
    return (
      <div className={`min-h-screen transition-all duration-1000 ease-in-out ${getBackgroundClass()}`}>
        <Navigation onContactClick={() => {}} activeSection={activeSection} />
        
        <div className="min-h-screen flex items-center justify-center p-4 pt-20">
          <AnimatedSection direction="scale" delay={200}>
            <div className="bg-black/80 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 shadow-2xl shadow-red-500/10 max-w-md w-full text-center">
              <div className="mb-6">
                <div className="p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl inline-block mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Math Quiz</h1>
                <p className="text-gray-400">Test your mathematical knowledge</p>
              </div>
              
              <div className="mb-8 text-left">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-300">Questions:</span>
                  <span className="text-white font-semibold">{questions.length}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-300">Time Limit:</span>
                  <span className="text-white font-semibold">30 minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Topics:</span>
                  <span className="text-white font-semibold">Mixed</span>
                </div>
              </div>
              
              <button
                onClick={() => setQuizStarted(true)}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 relative overflow-hidden group"
              >
                <span className="relative z-10">Start Quiz</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </AnimatedSection>
        </div>
        
        <Footer onContactClick={() => {}} />
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;
    
    return (
      <div className={`min-h-screen transition-all duration-1000 ease-in-out ${getBackgroundClass()}`}>
        <Navigation onContactClick={() => {}} activeSection={activeSection} />
        
        <div className="min-h-screen pt-20 pb-20">
          <div className="max-w-4xl mx-auto p-4">
            <AnimatedSection direction="up" delay={100}>
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">Quiz Results</h1>
                <div className="bg-black/80 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 shadow-2xl shadow-red-500/10">
                  <div className="mb-6">
                    <div className={`p-4 rounded-xl inline-block mb-4 ${percentage >= 70 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}>
                      {percentage >= 70 ? <CheckCircle className="w-8 h-8 text-white" /> : <XCircle className="w-8 h-8 text-white" />}
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {score}/{questions.length}
                    </h2>
                    <p className="text-xl text-gray-300">
                      {percentage.toFixed(1)}% Score
                    </p>
                  </div>
                  
                  <button
                    onClick={resetQuiz}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 flex items-center mx-auto group relative overflow-hidden"
                  >
                    <RotateCcw className="w-5 h-5 mr-2 relative z-10" />
                    <span className="relative z-10">Retake Quiz</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection direction="up" delay={200}>
              <div className="space-y-6">
                {questions.map((question, index) => (
                  <MCQCard
                    key={question.id}
                    question={question}
                    onAnswer={() => {}}
                    userAnswer={userAnswers[question.id]}
                    showResult={true}
                    correctAnswer={question.correctAnswer}
                  />
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
        
        <Footer onContactClick={() => {}} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-1000 ease-in-out ${getBackgroundClass()}`}>
      <Navigation onContactClick={() => {}} activeSection={activeSection} />
      
      <div className="min-h-screen pt-20 pb-20">
        <div className="max-w-4xl mx-auto p-4">
          {/* Header */}
          <AnimatedSection direction="down" delay={100}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-r from-red-500 to-red-600 rounded-xl mr-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Math Quiz</h1>
                  <p className="text-gray-400">Question {currentQuestion + 1} of {questions.length}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-white">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Progress Bar */}
          <AnimatedSection direction="left" delay={200}>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Progress</span>
                <span className="text-gray-400">{Math.round(getProgressPercentage())}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>
          </AnimatedSection>

          {/* Question Card */}
          <AnimatedSection direction="up" delay={300}>
            <div className="mb-8">
              <MCQCard
                question={questions[currentQuestion]}
                onAnswer={handleAnswer}
                userAnswer={userAnswers[questions[currentQuestion].id]}
                showResult={false}
                correctAnswer={questions[currentQuestion].correctAnswer}
              />
            </div>
          </AnimatedSection>

          {/* Navigation */}
          <AnimatedSection direction="up" delay={400}>
            <div className="flex items-center justify-between">
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentQuestion === 0
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-700 hover:bg-gray-600 text-white transform hover:scale-105 hover:shadow-lg hover:shadow-gray-500/25'
                }`}
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </button>

              <div className="flex space-x-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                      index === currentQuestion
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25'
                        : userAnswers[questions[index].id]
                        ? 'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/25'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:shadow-lg hover:shadow-gray-500/25'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

               {currentQuestion === questions.length - 1 ? (
              <button
                onClick={submitQuiz}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>
        </AnimatedSection>
      </div>
    </div>
  </div>
  );
}