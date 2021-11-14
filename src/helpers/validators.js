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

const propIsColor = (prop, color) => R.propEq(prop, color);

const getColorsLen = ({ star, square, triangle, circle }) => {
  const colors = ["white", "red", "orange", "green", "blue"];
  let lengths = {};

  for (const color of colors) {
    lengths[color] = [star, square, triangle, circle].filter(
      (x) => x === color
    ).length;
  }

  return lengths;
};

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = (colors) =>
  R.allPass([
    propIsColor("star", "red"),
    propIsColor("square", "green"),
    propIsColor("triangle", "white"),
    propIsColor("circle", "white"),
  ])(colors);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (colors) => {
  let lengths = getColorsLen(colors);
  return lengths["green"] >= 2;
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (colors) => {
  let lengths = getColorsLen(colors);
  return lengths["red"] === lengths["blue"];
};

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = (colors) =>
  R.allPass([
    propIsColor("circle", "blue"),
    propIsColor("star", "red"),
    propIsColor("square", "orange"),
  ])(colors);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (colors) => {
  const lengths = getColorsLen(colors);
  const hasThree = Object.values(lengths).includes(3);
  const hasFour = Object.values(lengths).includes(4);
  return (hasFour || hasThree) && lengths["white"] <= 1;
};

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = (colors) => {
  let lengths = getColorsLen(colors);
  return (
    lengths["red"] === 1 &&
    lengths["green"] === 2 &&
    colors.triangle === "green"
  );
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (colors) =>
  R.allPass([
    propIsColor("square", "orange"),
    propIsColor("star", "orange"),
    propIsColor("circle", "orange"),
    propIsColor("triangle", "orange"),
  ])(colors);

// 8. Не красная и не белая звезда.
export const validateFieldN8 = (colors) =>
  !R.equals(colors.star, "red") && !R.equals(colors.star, "white");

// 9. Все фигуры зеленые.
export const validateFieldN9 = (colors) =>
  R.allPass([
    propIsColor("square", "green"),
    propIsColor("star", "green"),
    propIsColor("circle", "green"),
    propIsColor("triangle", "green"),
  ])(colors);

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = (colors) =>
  R.equals(colors.triangle, colors.square) &&
  !R.equals(colors.triangle, "white") &&
  !R.equals(colors.square, "white");
