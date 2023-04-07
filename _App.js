import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, Image, Alert} from 'react-native';
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
  return array;
}

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    resetGame();
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
    const newShuffledQuestions = shuffleArray([...questions]);
    newShuffledQuestions.forEach(
      question => (question.options = shuffleArray([...question.options])),
    );
    setShuffledQuestions(newShuffledQuestions);
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
            <Button title={choice} onPress={() => handleAnswer(choice)} />
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Finish Game"
          onPress={finishGame}
          textStyle={styles.buttonText}
          color="#DC3545"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Show Current Score"
          onPress={showCurrentScore}
          textStyle={styles.buttonText}
          color="#28A745"
        />
      </View>
    </>
  );

  const renderScore = () => (
    <View style={styles.scoreContainer}>
      <Text style={styles.scoreText}>
        You scored {score} out of {shuffledQuestions.length}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Play Again"
          onPress={resetGame}
          textStyle={styles.buttonText}
          color="#007bff"
        />
      </View>
    </View>
  );

  const showCurrentScore = () => {
    alert(`Your current score is ${score}/${currentQuestion}`);
  };

  const finishGame = () => {
    setShowScore(true);
  };

  return (
    <View
      style={[styles.container, {backgroundColor: colors[randomColorIndex()]}]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Quiz Game</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('./assets/quiz-image.jpg')}
        />
      </View>
      {shuffledQuestions.length ? (
        <>
          {showScore ? renderScore() : renderQuestion()}
          {showScore ? null : renderOptions()}
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    borderWidth: 2,
  },
  questionContainer: {
    borderWidth: 2,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
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
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#f8f9fa',
  },
  buttonContainer: {
    marginVertical: 10,
    backgroundColor: '#0275d8',
    borderRadius: 10,
    shadowColor: '#0275d8',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    margin: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
  },
  scoreContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  scoreText: {
    fontSize: 24,
    marginBottom: 20,
  },
});
