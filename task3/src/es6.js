"use strict";
// в данных задачах нужно использовать возможности es6
// ко всем заданиям можно (а местами и нужно) дописать свои тесты в файле es6.spec.js
// Можно менять параметры функций (например сделать им значения по умолчанию)

// Напишите функцию, которая принимает ФИО пользователя и возвращает
// строку формата Имя Фамилия
function fioToName(fio) {
    let [lastName, firstName] = fio.split(' ');
    return `${firstName} ${lastName}`;
}

// преобразуйте массив чисел так, чтобы в нем остались только
// уникальные элементы
// присмотритесь к коллекции "Set"
function filterUnique(array) {
    return Array.from(new Set(array));
}

// Задача: разница зарплат
// в функцию приходит массив из n зарплат сотрудников фирмы
// ваша задача определить, во сколько раз зарплата самого высокооплачиваемого
// сотрудника превышает зарплату самого низкооплачиваемого
function calculateSalaryDifference(array) {
    if (!array.length) {
        return 0;
    }

    if (!Math.min(...array)) {
        return Infinity;
    }

    return Math.max(...array) / Math.min(...array);
}

// Реализуйте класс "словарь слов" (как толковый словарь)
// класс должен быть безопасным и работать только со словами
// присмотритесь к коллекции "Map"
// Словарь - (string, string), и все это не null и не undefined
// * покройте класс тестами
class Dictionary {
    constructor() {
        this.wordMap = new Map();
    }

    set(key, value) {
        if (typeof key === 'string' && typeof value === 'string') {
            this.wordMap.set(key, value);
        } else return false;
    }

    get(key) {
        if (typeof key === 'string') {
            return this.wordMap.get(key);
        } else return undefined;
    }

    delete(key) {
        if (typeof key === 'string') {
            return this.wordMap.delete(key);
        } else return false;
    }

    getDictionary() {
        return Array.from(this.wordMap.keys());
    }
}

module.exports = {
    fioToName,
    filterUnique,
    Dictionary,
    calculateSalaryDifference
};
