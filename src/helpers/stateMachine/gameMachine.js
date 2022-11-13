import { combinations, shuffle } from "../index.js";

const getInitialContextValue = (questions, version) => {
  return {
    email: "",
    yearOfBirth: null,
    fieldA: "",
    version,
    answer: [],
    questions,
    currentQuestionNo: 1,
  };
};

export const getGameMachine = ({ version }) => {
  const questions = shuffle(combinations);

  return {
    context: getInitialContextValue(questions, version),
    initial: "intro",
    states: {
      intro: {
        on: {
          NEXT: "playerInformation",
        },
        effect({ setContext }) {
          setContext(() => getInitialContextValue(questions, version));
        },
      },
      playerInformation: {
        on: {
          NEXT: "rule1",
        },
      },
      rule1: {
        on: {
          NEXT: "rule2",
        },
        effect({ setContext, event }) {
          setContext((context) => ({ ...context, ...event.payload }));
        },
      },
      rule2: {
        on: {
          NEXT_A: {
            target: "rule3",
            guard({ context }) {
              return context.version === "A";
            },
          },
          NEXT_B: {
            target: "question",
            guard({ context }) {
              return context.version === "B";
            },
          },
        },
        effect({ setContext, event }) {
          setContext((context) => ({ ...context, ...event.payload }));
        },
      },
      rule3: {
        on: {
          NEXT: "question",
        },
      },
      question: {
        on: {
          NEXT_QUESTION: {
            target: "question",
            guard({ context }) {
              return context.currentQuestionNo < 25;
            },
          },
          FINISH: {
            target: "result",
            guard({ context }) {
              return context.currentQuestionNo === 25;
            },
          },
        },
        effect({ setContext, event, context }) {
          const { amount } = event.payload || {};
          const currentQuestionNo = context.currentQuestionNo;

          if (amount) {
            const newAnswers = [...context.answer];
            newAnswers[currentQuestionNo - 1] = { amount };

            setContext((context) => ({
              ...context,
              answer: newAnswers,
              currentQuestionNo: currentQuestionNo + 1,
            }));
          }
        },
      },
      result: {
        on: {
          END: "intro",
        },
        effect({ setContext, event, context }) {
          const { amount } = event.payload || {};
          const currentQuestionNo = context.currentQuestionNo;

          if (amount) {
            const newAnswers = [...context.answer];
            newAnswers[currentQuestionNo - 1] = { amount };

            setContext((context) => ({
              ...context,
              answer: newAnswers,
            }));
          }
        },
      },
    },
  };
};
