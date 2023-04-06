import React, {useState} from 'react';
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

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const randomColorIndex = () => {
    const rand = Math.floor(Math.random() * colors.length);
    return rand;
  };

  const handleAnswer = choice => {
    if (choice === questions[currentQuestion].answer) {
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
    if (currentQuestion === questions.length - 1) {
      setShowScore(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const renderQuestion = () => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>
        {questions[currentQuestion].question}
      </Text>
    </View>
  );

  const renderOptions = () => (
    <>
      <View style={styles.optionsContainer}>
        {questions[currentQuestion].options.map((choice, index) => (
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
    </>
  );

  const renderScore = () => (
    <View style={styles.scoreContainer}>
      <Text style={styles.scoreText}>
        You scored {score} out of {questions.length}
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
    alert(`Your current score is ${score}/${questions.length}`);
  };

  const finishGame = () => {
    setShowScore(true);
  };

  return (
    <View
      style={[styles.container, {backgroundColor: colors[randomColorIndex()]}]}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('./assets/quiz-image.jpg')}
        />
      </View>
      {showScore ? renderScore() : renderQuestion()}
      {showScore ? null : renderOptions()}
      <View style={styles.buttonContainer}>
        <Button
          title="Show Current Score"
          onPress={showCurrentScore}
          textStyle={styles.buttonText}
          color="#28A745"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  optionsContainer: {
    borderWidth: 2,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
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
