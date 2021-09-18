
export const forEachUniquePair = <T>(array: T[], func: (a: T, b: T) => void): void => {
    for (let i = 0; i < array.length - 1; i++)
        for (let j = i + 1; j < array.length; j++)
            func(array[i], array[j]);
};
