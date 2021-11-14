/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import * as R from "ramda";

// isColor
const isRed = R.equals("red");
const isWhite = R.equals("white");
const isOrange = R.equals("orange");
const isGreen = R.equals("green");
const isBlue = R.equals("blue");

// isShape
const isStar = R.prop("star");
const isTriangle = R.prop("triangle");
const isSquare = R.prop("square");
const isCircle = R.prop("circle");
const len = R.prop("length");

// isRedShape
const isRedStar = R.compose(isRed, isStar);
const isRedTriangle = R.compose(isRed, isTriangle);
const isRedSquare = R.compose(isRed, isSquare);

// isBLueShape
const isBlueCircle = R.compose(isBlue, isCircle);
const isBlueSquare = R.compose(isBlue, isSquare);
const isBlueTriangle = R.compose(isBlue, isTriangle);

// isWhiteShape
const isWhiteTriangle = R.compose(isWhite, isTriangle);
const isWhiteCircle = R.compose(isWhite, isCircle);
const isWhiteStar = R.compose(isWhite, isStar);

// isOrangeShape
const isOrangeSquare = R.compose(isOrange, isSquare);
const isOrangeCircle = R.compose(isOrange, isCircle);
const isOrangeTriangle = R.compose(isOrange, isTriangle);
const isOrangeStar = R.compose(isOrange, isStar);

// isGreenShape
const isGreenSquare = R.compose(isGreen, isSquare);
const isGreenStar = R.compose(isGreen, isStar);
const isGreenCircle = R.compose(isGreen, isCircle);
const isGreenTriangle = R.compose(isGreen, isTriangle);

const triangleAndSquareGreen = R.allPass([isGreenTriangle, isGreenSquare]);
const triangleAndSquareRed = R.allPass([isRedTriangle, isRedSquare]);
const triangleAndSquareBlue = R.allPass([isBlueTriangle, isBlueSquare]);
const triangleAndSquareOrange = R.allPass([isOrangeTriangle, isOrangeSquare]);

const triangleAndSquare = R.anyPass([
  triangleAndSquareRed,
  triangleAndSquareGreen,
  triangleAndSquareBlue,
  triangleAndSquareOrange,
]);

// countShape
const countRed = R.compose(len, R.filter(isRed), R.values);
const countOrange = R.compose(len, R.filter(isOrange), R.values);
const countGreen = R.compose(len, R.filter(isGreen), R.values);
const countBlue = R.compose(len, R.filter(isBlue), R.values);

// equality
const isOne = R.equals(1);
const isTwo = R.equals(2);

const isGreaterThanOne = (value) => R.gt(value, 1);
const isGreaterOrEqualThanThree = (value) => R.gte(value, 3);

// gte
const threeOrMoreReds = R.compose(isGreaterOrEqualThanThree, countRed);
const threeOrMoreBlues = R.compose(isGreaterOrEqualThanThree, countBlue);
const threeOrMoreGreens = R.compose(isGreaterOrEqualThanThree, countGreen);
const threeOrMoreOranges = R.compose(isGreaterOrEqualThanThree, countOrange);

const oneRed = R.compose(isOne, countRed);
const twoGreens = R.compose(isTwo, countGreen);

const threeSame = R.anyPass([
  threeOrMoreReds,
  threeOrMoreBlues,
  threeOrMoreGreens,
  threeOrMoreOranges,
]);

const redAndBlueEquals = (colors) =>
  R.equals(countRed(colors), countBlue(colors));

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = R.allPass([
  isRedStar,
  isGreenSquare,
  isWhiteCircle,
  isWhiteTriangle,
]);

// 2. Как минимум две фигуры зеленые. DONE
export const validateFieldN2 = R.compose(isGreaterThanOne, countGreen);

// 3. Количество красных фигур равно кол-ву синих. DONE
export const validateFieldN3 = redAndBlueEquals;

// 4. Синий круг, красная звезда, оранжевый квадрат DONE
export const validateFieldN4 = R.allPass([
  isBlueCircle,
  isRedStar,
  isOrangeSquare,
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true). DONE
export const validateFieldN5 = threeSame;

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = R.allPass([isGreenTriangle, oneRed, twoGreens]);

// 7. Все фигуры оранжевые. DONE
export const validateFieldN7 = R.allPass([
  isOrangeCircle,
  isOrangeSquare,
  isOrangeStar,
  isOrangeTriangle,
]);

// 8. Не красная и не белая звезда. DONE
export const validateFieldN8 = R.compose(
  R.not,
  R.anyPass([isRedStar, isWhiteStar])
);

// 9. Все фигуры зеленые. DONE
export const validateFieldN9 = R.allPass([
  isGreenCircle,
  isGreenSquare,
  isGreenStar,
  isGreenTriangle,
]);

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = triangleAndSquare;
