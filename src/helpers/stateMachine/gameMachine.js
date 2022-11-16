import { combinations, shuffle } from "../index.js";

const getInitialContextValue = (questions, version) => {
  return {
    playerId: null,
    email: "",
    yearOfBirth: null,
    sex: null,
    salary: null,
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
        effect({ setContext, event }) {
          setContext((context) => ({ ...context, ...event.payload }));
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
          console.log("question", event);

          const { amount, fieldA } = event.payload || {};
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

          if (fieldA) {
            setContext((context) => ({ ...context, fieldA }));
          }
        },
      },
      result: {
        on: {
          END: "intro",
        },
        effect({ setContext, event, context }) {
          console.log("result", event);

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
