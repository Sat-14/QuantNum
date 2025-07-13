import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Users, CheckCircle, XCircle, Clock, RotateCcw } from 'lucide-react';

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
    let baseClass = "w-full p-4 rounded-xl border-2 transition-all duration-300 text-left hover:scale-105 transform";
    
    if (showResult) {
      if (option === correctAnswer) {
        return `${baseClass} bg-green-500 border-green-400 text-white`;
      } else if (option === selectedOption && option !== correctAnswer) {
        return `${baseClass} bg-red-500 border-red-400 text-white`;
      } else {
        return `${baseClass} bg-gray-700 border-gray-600 text-gray-300`;
      }
    } else {
      if (selectedOption === option) {
        return `${baseClass} bg-blue-500 border-blue-400 text-white`;
      } else {
        return `${baseClass} bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500`;
      }
    }
  };

  const getInputClass = () => {
    let baseClass = "w-full p-4 rounded-xl border-2 transition-all duration-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500";
    
    if (showResult) {
      if (inputValue === correctAnswer) {
        return `${baseClass} bg-green-500 border-green-400`;
      } else {
        return `${baseClass} bg-red-500 border-red-400`;
      }
    } else {
      return `${baseClass} bg-gray-800 border-gray-600 focus:border-blue-500`;
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-2xl">
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
              <div className="flex items-center">
                <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                <span>{option}</span>
                {showResult && option === correctAnswer && (
                  <CheckCircle className="w-5 h-5 ml-auto text-white" />
                )}
                {showResult && option === selectedOption && option !== correctAnswer && (
                  <XCircle className="w-5 h-5 ml-auto text-white" />
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
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
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

  const questions = [
    {
      id: 1,
      title: 'Calculus - Integration',
      difficulty: 'Medium',
      type: 'mcq',
      question: 'What is the integral of 2x with respect to x?',
      options: ['x² + C', '2x² + C', 'x²/2 + C', '2x + C'],
      correctAnswer: 'x² + C',
      iconBg: 'bg-blue-500',
      icon: <Calendar className="w-6 h-6 text-white" />
    },
    {
      id: 2,
      title: 'Algebra - Quadratic',
      difficulty: 'Easy',
      type: 'numerical',
      question: 'Find the discriminant of the quadratic equation x² - 5x + 6 = 0',
      correctAnswer: '1',
      iconBg: 'bg-purple-500',
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
      iconBg: 'bg-green-500',
      icon: <Calendar className="w-6 h-6 text-white" />
    },
    {
      id: 4,
      title: 'Combinatorics - Permutation',
      difficulty: 'Medium',
      type: 'numerical',
      question: 'How many ways can 5 people be arranged in a row?',
      correctAnswer: '120',
      iconBg: 'bg-red-500',
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
      iconBg: 'bg-yellow-500',
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

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <AnimatedSection direction="scale" delay={200}>
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-2xl max-w-md w-full text-center">
            <div className="mb-6">
              <div className="p-4 bg-blue-500 rounded-xl inline-block mb-4">
                <Calendar className="w-8 h-8 text-white" />
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
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Quiz
            </button>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection direction="up" delay={100}>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">Quiz Results</h1>
              <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-2xl">
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
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center mx-auto"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Retake Quiz
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
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <AnimatedSection direction="down" delay={100}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="p-2 bg-blue-500 rounded-xl mr-4">
                <Calendar className="w-6 h-6 text-white" />
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
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
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
                  : 'bg-gray-700 hover:bg-gray-600 text-white transform hover:scale-105'
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
                  className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                    index === currentQuestion
                      ? 'bg-blue-500 text-white'
                      : userAnswers[questions[index].id]
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
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
  );
}