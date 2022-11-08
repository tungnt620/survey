export const getGameMachine = ({version}) => {
  return {
    context: {email: '', yearOfBirth: null, fieldA: '', version, answer: [], currentQuestionNo: null},
    initial: 'intro',
    states: {
      intro: {
        on: {
          NEXT: 'playerInformation',
        }
      },
      playerInformation: {
        on: {
          NEXT: 'rule1',
        },
      },
      rule1: {
        on: {
          NEXT: 'rule2',
        },
        effect({setContext, event,}) {
          setContext((context) => ({...context, ...event.payload}));
        },
      },
      rule2: {
        on: {
          NEXT_A: {
            target: 'rule3',
            guard({context,}) {
              return context.version === 'A';
            },
          },
          NEXT_B: {
            target: 'question',
            guard({context,}) {
              return context.version === 'B';
            }
          }
        },
        effect({setContext, event,}) {
          setContext((context) => ({...context, ...event.payload}));
        },
      },
      rule3: {
        on: {
          NEXT: 'question',
        }
      },
      question: {
        on: {
          NEXT_QUESTION: {
            target: 'question',
            guard({context}) {
              return context.currentQuestionNo < 25;
            }
          },
          NEXT: {
            target: 'result',
            guard({context}) {
              return context.currentQuestionNo === 25;
            }
          }
        },
        effect({send, setContext, event, context}) {
          if (!context.currentQuestionNo) {
            setContext({currentQuestionNo: 1});
          }
          console.log('question', event, context);
          // Save answer to context
        },
      },
      result: {}
    }
  }
}