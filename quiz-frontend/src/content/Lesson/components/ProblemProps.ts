export interface ProblemProps {
  index: number;
  question: string;
  choices: ChoicePropsType[];
  type: boolean;
  selectedAnswer: AnswerPropsType | undefined;
  handleAnswerChange: (questionIndex: number, newAnswers: AnswerPropsType) => void;
}

export interface ChoicePropsType {
  id: number,
  question_id: number,
  choice_text: string
}

export interface ProblemPropsType {
  id: number,
  lesson_id: number,
  question_text: string,
  is_multi: boolean,
  choice: ChoicePropsType[]
}

export interface AnswerPropsType {
  question: number,
  choices: number[]
}