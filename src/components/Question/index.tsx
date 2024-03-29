import { Text, Dimensions } from 'react-native';
import Animated, { Keyframe, runOnJS } from 'react-native-reanimated';

import { Option } from '../Option';
import { styles } from './styles';
import { ExclusiveGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gestureComposition';

type QuestionProps = {
  title: string;
  alternatives: string[];
}

type Props = {
  question: QuestionProps;
  alternativeSelected?: number | null;
  setAlternativeSelected?: (value: number) => void;
  onUnmount: () => void;
}

const SCREEN_WIDTH = Dimensions.get("window").width;

export function Question({ question, alternativeSelected, setAlternativeSelected, onUnmount }: Props) {

  const enteringKeyFrame = new Keyframe({
    0: {
      opacity: 0,
      // transform: [
      //   { translateX: SCREEN_WIDTH },
      //   { rotate: '90deg' }
      // ]
      // transform: [],
    },
    70: {
      opacity: 0.3
    },
    100: {
      opacity: 1,
      // transform: [
      //   { translateX: 0 },
      //   { rotate: '0deg' }
      // ] 
    }
  });

  return (
    <Animated.View
      style={styles.container}
      entering={enteringKeyFrame}
      exiting={enteringKeyFrame.withCallback(finished => {
        'worklet';
        if (finished) {
          runOnJS(onUnmount)();
        }
      })}
    >
      <Text style={styles.title}>
        {question.title}
      </Text>

      {
        question.alternatives.map((alternative, index) => (
          <Option
            key={index}
            title={alternative}
            checked={alternativeSelected === index}
            onPress={() => setAlternativeSelected && setAlternativeSelected(index)}
          />
        ))
      }
    </Animated.View>
  );
}