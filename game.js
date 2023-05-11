'use strict';

(function() {
  const ARR = ['камень', 'ножницы', 'бумага'];
  const whoPlays = ['Игрок', 'Компьютер'];

  // для игры в камень-ножницы-бумага
  // ищет внутри строки (i-ый эл-т массива) нужный набор букв
  const findLetters = (arr, n) => {
    for (let i = 0; i < arr.length; ++i) {
      // если внутри строки arr[i] найдется искомая подстрока, то
      // indexOf вернет индекс этой буквы (начала подстроки) должно совпасть с 0
      if (arr[i].indexOf(n) === 0) {
        return arr[i];
      }
    }
    return false;
  };

  // подсчитывает рандомное значение (включая мин и макс)
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    // Максимум и минимум включаются
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // проверка на число
  const isNumber = str => !Number.isNaN(parseFloat(str) && isFinite(str));

  // проверка является ли число четным (возврат 1 - чет, 0- нечет)
  const isEven = n => {
    if (n % 2 === 0) {
      return 1;
    }
    return 0;
  };

  const game = () => {
  // подсчет очков и категория чисел
    const result = {
      player: 5,
      pc: 5,
      classNumber: ['нечетное', 'четное'],
      currentPlayer: null,
      // для записи кто текущий игрок
      set setPlayer(val) {
        this.currentPlayer = val;
      },
    };
    // играть в Камень-Ножницы-Бумага
    const playWhoGetFirstMove = () => {
      // функция выхода из игры
      const isEnough = () => {
        // запрос пользователя на выход из игры
        const exit = confirm('Хочешь выйти из игры?');
        // Если жмет отмену, то продолжить игру
        if (!exit) {
          return playWhoGetFirstMove();
        } else {
          alert('Игра окончена.');
        }
      };

      // возвращаем значение строки от пользователя
      // слож. задание  - отображаем массив значений через ARR.join
      const userFirstMove = prompt(`${ARR.join(', ')} ?`);
      // проверка на отмену или пустую строку
      if (!userFirstMove) {
        isEnough(); // функция выхода из игры
      } else {
        // ищет то что ввел пользователь в элементах массива ARR
        const userResult = findLetters(ARR, userFirstMove.toLowerCase());
        // возвращает рандомное значение массива игры
        const pcChoose = ARR[getRandomIntInclusive(0, 2)];
        // если результат сравнения ввода пользователя с массивом (true)
        if (userResult) {
          if (userResult === pcChoose) {
            alert(`Компьютер: ${pcChoose}
            Игрок: ${userResult} \n Ничья`);
            return playWhoGetFirstMove();
            // ветка выигрыша. для слож. задания используется элемент массива
          } else if (((userResult === ARR[0]) && (pcChoose === ARR[1])) ||
            ((userResult === ARR[1]) && (pcChoose === ARR[2])) ||
            ((userResult === ARR[2]) && (pcChoose === ARR[0]))) {
            alert(`Компьютер: ${pcChoose} 
    Игрок: ${userResult} 
    Вы выиграли`);
            result.setPlayer = whoPlays[0]; // записывает кто ходит сейчас
          } else {
            alert(`Компьютер: ${pcChoose} 
    Игрок: ${userResult} 
    Вы проиграли`);
            result.setPlayer = whoPlays[1]; // записывает кто ходит сейчас
          }
          // если результат сравнения с массивом false
        } else {
          isEnough(); // функция выхода из игры
        }
      }
      //
      // конец игры в камень-ножницы-бумага
    };

    playWhoGetFirstMove(); // запуск игры в камень-ножницы-бумага

    // игра в марблы
    return function start() {
      // Функция спрашивает по окончанию игры -
      // Хотите сыграть еще
      const playSomeMore = () => {
        // запрос пользователя на выход из игры
        const more = confirm('Хочешь сыграть еще?');
        // Если жмет отмену, то продолжить игру
        if (more) {
          return playWhoGetFirstMove();
        } else {
          alert('Игра окончена.');
        }
      };

      // бот рандомно выбирает число от 1 до кол-ва имеющихся шариков
      const pcChoose = getRandomIntInclusive(1, result.pc);
      // если ходит первыйм игрок
      if (result.currentPlayer === 'Игрок') {
        // запрашивает выбор числа у игрока
        const userChoose = prompt(`Твоё количество шариков: ${result.player}. 
        Выбери число от 1 до ${result['player']}`, '');
        // если игрок жмет отмена - то выход из игры
        if (userChoose === null) {
          alert('Игра окончена.');
        // проверяет на число и что число в рамках доступного кол-ва шариков
        } else if (!isNumber(userChoose) || (
          +userChoose > result.player) || (+userChoose < 1)) {
          alert('Вы ввели неправильное числовое значение.');
          return start();
        } else {
          // если игрок загадывает чет/нечет и бот угадывает
          if ((isEven(pcChoose) && isEven(userChoose)) || (
            !isEven(pcChoose) && !isEven(userChoose))) {
            // проигрывает игрок
            if (userChoose < result['player']) {
              alert(`Компьютер угадал, что ты загадал 
              ${result.classNumber[isEven(userChoose)]} число. 
              Шарики достаются компьютеру.`);
              result.player -= Number(userChoose);
              result.pc += Number(userChoose);
              result.setPlayer = whoPlays[1];
              return start();
            } else {
              // игра завершается когда 0 шариков у игрока
              alert(`Компьютер угадал, что ты загадал 
              ${result.classNumber[isEven(userChoose)]} число. Ты проиграл!`);
              return playSomeMore();
            }
          } else {
            // проигрывает бот
            if (userChoose < result.pc) {
              alert(`Компьютер не смог угадать, что ты загадал 
              ${result.classNumber[isEven(userChoose)]} число. 
              Шарики достаются тебе.`);
              result['pc'] -= Number(userChoose);
              result['player'] += Number(userChoose);
              result.setPlayer = whoPlays[1];
              return start();
            } else {
              // игра завершается когда 0 шариков у бота
              alert(`Компьютер не смог угадать, что ты загадал 
              ${result.classNumber[isEven(userChoose)]} число. Ты выиграл!`);
              return playSomeMore();
            }
          }
        }
      } else if (result.currentPlayer === 'Компьютер') {
        // игрок выбирает четное или нечетное число загадал бот
        const userConfirm = confirm(`Угадай, компьютер загадал четное число? 
        "ОК" - да, "ОТМЕНА" - нет.`);

        if ((userConfirm && !isEven(pcChoose)) || (
          !userConfirm && isEven(pcChoose))) {
          // проигрывает игрок
          if (pcChoose < result.player) {
            alert(`Игрок не угадал, что компьютер загадал 
            ${result.classNumber[isEven(pcChoose)]} число. 
            Шарики достаются компьютеру.`);
            result.player -= +pcChoose;
            result.pc += +pcChoose;
            result.setPlayer = whoPlays[0];
            return start();
          } else {
            // игра завершается когда 0 шариков у игрока
            alert(`Игрок не угадал, что компьютер загадал 
            ${result.classNumber[isEven(pcChoose)]} число. Ты проиграл!`);
            return playSomeMore();
          }
        } else {
          // проигрывает бот
          if (pcChoose < result['pc']) {
            alert(`Игрок угадал, что компьютер загадал 
            ${result.classNumber[isEven(pcChoose)]} число. 
            Шарики достаются тебе.`);
            result['pc'] -= Number(pcChoose);
            result['player'] += Number(pcChoose);
            result.setPlayer = whoPlays[0];
            return start();
          } else {
            // игра завершается когда 0 шариков у бота
            alert(`Игрок смог угадать, что компьютер загадал 
            ${result.classNumber[isEven(pcChoose)]} число. Ты выиграл!`);
            return playSomeMore();
          }
        }
      }
    };
  };
  window.marbleGame = game;
})();
