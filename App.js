import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {questions} from './questions';

const colors = [
  '#E6EFF1',
  '#F5E5D9',
  '#EAD5E5',
  '#D6E3F8',
  '#F3D3D3',
  '#C9DCEB',
  '#E8D0CB',
  '#F5F5F5',
  '#EBF5E8',
  '#F2E9E4',
]; // Array of colors for each question

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export default function App() {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    const newQuestions = [...questions];
    newQuestions.forEach(q => shuffleArray(q.options));
    shuffleArray(newQuestions);
    setShuffledQuestions(newQuestions);
  }, []);

  const randomColorIndex = () => {
    const rand = Math.floor(Math.random() * colors.length);
    return rand;
  };

  const handleAnswer = choice => {
    if (choice === shuffledQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
    nextQuestion();
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  const nextQuestion = () => {
    if (currentQuestion === shuffledQuestions.length - 1) {
      setShowScore(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const renderQuestion = () => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>
        {shuffledQuestions[currentQuestion].question}
      </Text>
    </View>
  );

  const renderOptions = () => (
    <>
      <View style={styles.optionsContainer}>
        {shuffledQuestions[currentQuestion].options.map((choice, index) => (
          <View style={styles.buttonContainer} key={index}>
            <CustomPressable
              title={choice}
              onPress={() => handleAnswer(choice)}
              bgColor="#0275d8"
            />
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <CustomPressable
          title="Finish Game"
          onPress={finishGame}
          bgColor="#DC3545"
        />
      </View>
    </>
  );

  const renderScore = () => (
    <View style={styles.scoreContainer}>
      <Text style={styles.scoreText}>
        You scored {score} out of {currentQuestion}
      </Text>
      <View style={styles.buttonContainer}>
        <CustomPressable
          title="Play Again"
          onPress={resetGame}
          bgColor="#007bff"
        />
      </View>
    </View>
  );

  const finishGame = () => {
    setShowScore(true);
  };

  const CustomPressable = ({title, onPress, bgColor}) => (
    <Pressable
      style={({pressed}) => [
        styles.pressable,
        {backgroundColor: pressed ? '#9ac8f8' : bgColor},
      ]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView
        overScrollMode="always"
        contentContainerStyle={styles.scrollContentContainer}>
        <View
          style={[
            styles.container,
            {backgroundColor: colors[randomColorIndex()]},
          ]}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Get Quizzical</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('./assets/neonQuiz.jpg')}
            />
          </View>
          {shuffledQuestions.length ? (
            <>
              {!showScore && (
                <View style={styles.scoreDisplay}>
                  <Text style={styles.scoreDisplayText}>
                    Current Score: {score}/{currentQuestion}
                  </Text>
                </View>
              )}
              {showScore ? renderScore() : renderQuestion()}
              {showScore ? null : renderOptions()}
            </>
          ) : (
            <Text>Loading...</Text>
          )}
          <View style={styles.creditContainer}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  'https://www.freepik.com/free-vector/quiz-neon-sign_4553888.htm#query=quiz%20neon&position=0&from_view=search&track=ais',
                );
              }}>
              <Text style={styles.creditText}>
                Image by katemangostar on Freepik
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    flexShrink: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: '2%',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: '2%',
    marginBottom: '2%',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    borderWidth: 2,
  },
  questionContainer: {
    borderWidth: 2,
    borderColor: '#ccc',
    padding: '2%',
    marginBottom: '2%',
    borderRadius: 10,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  optionsContainer: {
    borderWidth: 2,
    borderColor: '#ccc',
    padding: '2%',
    borderRadius: 10,
    marginTop: '2%',
    backgroundColor: '#f8f9fa',
  },
  buttonContainer: {
    marginVertical: '2%',
    margin: '2%',
  },
  pressable: {
    borderRadius: 10,
    paddingVertical: '2%',
    paddingHorizontal: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    marginBottom: '2%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: '2%',
  },
  scoreContainer: {
    alignItems: 'center',
    marginTop: '2%',
  },
  scoreText: {
    fontSize: 24,
    marginBottom: '2%',
  },
  scoreDisplay: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2%',
    marginTop: '2%',
  },
  scoreDisplayText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  creditContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
  },
  creditText: {
    fontSize: 8,
    color: '#333',
  },
});
