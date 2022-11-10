import { combinations, shuffle } from "../index.js";

export const getGameMachine = ({ version }) => {
  const questions = shuffle(combinations);

  return {
    context: {
      email: "",
      yearOfBirth: null,
      fieldA: "",
      version,
      answer: [],
      questions,
      currentQuestionNo: 1,
    },
    initial: "intro",
    states: {
      intro: {
        on: {
          NEXT: "playerInformation",
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
      },
      result: {},
    },
  };
};
