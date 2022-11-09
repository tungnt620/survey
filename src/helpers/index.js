import {useMemo} from 'react';

export const useGetVersion = () => {
  const currentPathName = window.location.pathname

  return useMemo(() => {
    if (currentPathName === '/version-b') {
      return 'B'
    }

    return 'A'
  }, [currentPathName]);
}

export const combinations = [
  {
    fieldM: 270,
    fieldT: 14
  },
  {
    fieldM: 180,
    fieldT: 3
  },
  {
    fieldM: 270,
    fieldT: 7
  },
  {
    fieldM: 180,
    fieldT: 14
  },
  {
    fieldM: 50,
    fieldT: 7
  },
  {
    fieldM: 270,
    fieldT: 30
  },
  {
    fieldM: 125,
    fieldT: 14
  },
  {
    fieldM: 50,
    fieldT: 14
  },
  {
    fieldM: 80,
    fieldT: 30
  },
  {
    fieldM: 80,
    fieldT: 3
  },
  {
    fieldM: 125,
    fieldT: 7
  },
  {
    fieldM: 180,
    fieldT: 30
  },
  {
    fieldM: 80,
    fieldT: 14
  },
  {
    fieldM: 270,
    fieldT: 60
  },
  {
    fieldM: 125,
    fieldT: 30
  },
  {
    fieldM: 180,
    fieldT: 60
  },
  {
    fieldM: 80,
    fieldT: 60
  },
  {
    fieldM: 50,
    fieldT: 60
  },
  {
    fieldM: 180,
    fieldT: 7
  },
  {
    fieldM: 50,
    fieldT: 30
  },
  {
    fieldM: 50,
    fieldT: 3
  },
  {
    fieldM: 125,
    fieldT: 60
  },
  {
    fieldM: 80,
    fieldT: 7
  },
  {
    fieldM: 125,
    fieldT: 3
  },
  {
    fieldM: 270,
    fieldT: 3
  }
]

combinations.forEach((combination) => {
  combination.fieldM = combination.fieldM * 1000;
})

export function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}