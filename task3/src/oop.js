/**
 * Напишите класс геометрической точки, принимающей в конструкторе координаты X и Y
 * Если координаты не переданы - 0,0; Аналогично если только 1 координата.
 * Реализовать метод, который возвращает расстояние от точки до центра координат (0, 0)
 */
class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  distanceToCenter() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
}

/**
 * Напишите класс геометрической точки в трехмерном пространстве (x, y, z),
 * который будет наследоваться от точки в двумерном пространстве.
 * Реализовать статический метод, который возвращает расстояние между Point3D.
 */
class Point3D extends Point {
    constructor(x = 0, y = 0, z = 0) {
        super(x, y);
        this.z = z;
      }
    
    static vectorLength(A, B) {
        return Math.sqrt((B.x - A.x) ** 2 + (B.y - A.y) ** 2 + (B.z - A.z) ** 2);
    }
}

/**
 * Напишите класс "очередь", в котором можно добавить элемент в конец и получить из начала.
 * Предусмотреть 2 варианта инициализации - массивом в конструкторе (из него создается очередь) и без параметров.
 * Для тех, кто доверяет, но проверяет: написать тесты на методы класса (oop.spec.js)
 */

class Queue {
    constructor(elements = []) {
        this.queue = elements;
    }
    
    push(...elements) {
        this.queue.push(...elements);
    }
    
    pop() {
        return this.queue.shift();
    }
    
    get size() {
        return this.queue.length;
    }
    
    clear() {
        this.queue = [];
    }
}

module.exports = {
    Point,
    Point3D,
    Queue,
};
