import { useMemo } from "react";

const randomVersion = ["A", "B"][Math.floor(Math.random() * 2)];

export const useGetVersion = () => {
  const currentPathName = window.location.pathname;

  return useMemo(() => {
    if (currentPathName === "/version-b") {
      return "B";
    }
    if (currentPathName === "/version-a") {
      return "A";
    }

    return randomVersion;
  }, [currentPathName]);
};

export const combinations = [
  {
    fieldM: 50,
    fieldT: 3,
  },
  {
    fieldM: 50,
    fieldT: 7,
  },
  {
    fieldM: 50,
    fieldT: 14,
  },
  {
    fieldM: 50,
    fieldT: 30,
  },
  {
    fieldM: 50,
    fieldT: 60,
  },
  {
    fieldM: 80,
    fieldT: 3,
  },
  {
    fieldM: 80,
    fieldT: 7,
  },
  {
    fieldM: 80,
    fieldT: 14,
  },
  {
    fieldM: 80,
    fieldT: 30,
  },
  {
    fieldM: 80,
    fieldT: 60,
  },
  {
    fieldM: 125,
    fieldT: 3,
  },
  {
    fieldM: 125,
    fieldT: 7,
  },
  {
    fieldM: 125,
    fieldT: 14,
  },
  {
    fieldM: 125,
    fieldT: 30,
  },
  {
    fieldM: 125,
    fieldT: 60,
  },
  {
    fieldM: 190,
    fieldT: 3,
  },
  {
    fieldM: 190,
    fieldT: 7,
  },
  {
    fieldM: 190,
    fieldT: 14,
  },
  {
    fieldM: 190,
    fieldT: 30,
  },
  {
    fieldM: 190,
    fieldT: 60,
  },
  {
    fieldM: 290,
    fieldT: 3,
  },
  {
    fieldM: 290,
    fieldT: 7,
  },
  {
    fieldM: 290,
    fieldT: 14,
  },
  {
    fieldM: 290,
    fieldT: 30,
  },
  {
    fieldM: 290,
    fieldT: 60,
  },
];

combinations.forEach((combination) => {
  combination.fieldM = combination.fieldM * 1000;
});

export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
