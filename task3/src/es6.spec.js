const assert = require('assert');
const core = require('./es6');

describe('es6', () => {
    describe('#fioToName', () => {
        it('ФИО в Имя Фамилия корректно', () => {
            assert.strictEqual(core.fioToName('Иванов Иван Иванович'), 'Иван Иванов');
        });

        it('ФИ в Имя Фамилия', () => {
            assert.strictEqual(core.fioToName('Петров Петр'), 'Петр Петров');
        });
    });

    describe('#filterUnique', () => {
        it('массив с уникальными равен сам себе', () => {
            assert.deepStrictEqual(core.filterUnique([1, 2, 3]), [1, 2, 3]);
        });

        it('массив с неуникальными отфильтрован', () => {
            assert.deepStrictEqual(core.filterUnique([1, 1, 1, 1]), [1]);
        });

        it('пустой массив', () => {
            assert.deepStrictEqual(core.filterUnique([]), []);
        });
    });

    describe('#calculateSalaryDifference', () => {
        it('считает разницу корректно', () => {
            assert.strictEqual(core.calculateSalaryDifference([1, 2, 3]), 3);
        });

        it('на пустой массив возвращается falsy значение', () => {
            assert.strictEqual(!!core.calculateSalaryDifference([]), false);
        });
    });

    describe('#Dictionary', () => {
        it('экземпляр класса создается', () => {
            const dic = new core.Dictionary();
            assert.strictEqual(!!dic, true);
        });
        it('работает set', () => {
            const dic = new core.Dictionary();
            dic.set('key', 'word');

            assert.strictEqual(dic.get('key'), 'word');
            assert.strictEqual(dic.set(123, 'word'), false);
            assert.strictEqual(dic.set('key'), false);
        });
        it('работает get', () => {
            const dic = new core.Dictionary();
            dic.set('key', 'word');
            dic.set('newkey', 'newword');

            assert.strictEqual(dic.get('key'), 'word');
            assert.strictEqual(dic.get('newkey'), 'newword');
            assert.strictEqual(dic.get('noword'), undefined);
        });
        it('работает удаление', () => {
            const dic = new core.Dictionary();
            dic.set('key', 'word');
            dic.set('newkey', 'newword');

            assert.strictEqual(dic.delete('key'), true);
            assert.strictEqual(dic.delete('noword'), false);
            assert.strictEqual(dic.get('key'), undefined);
        });
        it('работает получение словаря', () => {
            const dic = new core.Dictionary();
            dic.set('key', 'word');
            dic.set('newkey', 'newword');

            const dictionary = dic.getDictionary();
            assert.deepStrictEqual(dictionary, ['key', 'newkey']);
        });
    });
});