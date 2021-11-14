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

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({ star, square, triangle, circle }) => {
  if (triangle !== "white" || circle !== "white") {
    return false;
  }

  return star === "red" && square === "green";
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = ({ star, square, triangle, circle }) => {
  return (
    [star, square, triangle, circle].filter((x) => x === "green").length > 1
  );
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = ({ star, square, triangle, circle }) => {
  return (
    [star, square, triangle, circle].filter((x) => x === "red").length ===
    [star, square, triangle, circle].filter((x) => x === "blue").length
  );
};

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = ({ star, square, triangle, circle }) => {
  return circle === "blue" && star === "red" && square === "orange";
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = ({ star, square, triangle, circle }) => {};

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = () => false;

// 7. Все фигуры оранжевые.
export const validateFieldN7 = ({ star, square, triangle, circle }) => {
  return (
    [star, square, triangle, circle].filter((x) => x === "orange").length === 4
  );
};

// 8. Не красная и не белая звезда.
export const validateFieldN8 = ({ star, square, triangle, circle }) => {
  return star !== "red" || star !== "white";
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = () => false;

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = () => false;
