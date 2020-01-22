    const days = [          
      {
      date: 1579738356000,    
      cloudiness: 'Ясно',
      temperatureNight: -15,
      dayTemperature: -10,
      snow: false,
      rain: false
      },
      
      {
      date: 1579824756000,
      cloudiness: 'Пасмурно',
      temperatureNight: -14,
      dayTemperature: -7,
      snow: true,
      rain: false
      },
      
      {
      date: 1579911156000,
      cloudiness: 'Ясно',
      temperatureNight: -17,
      dayTemperature: -10,
      snow: false,
      rain: false
      },
      
      {
      date: 1579997556000,
      cloudiness: 'Пасмурно',
      temperatureNight: -16,
      dayTemperature: -11,
      snow: false,
      rain: false
      },
      
      {
      date: 1580083956000,    
      cloudiness: 'Ясно',
      temperatureNight: -15,
      dayTemperature: -10,
      snow: false,
      rain: false
      },
      
      {
      date: 1580170356000,
      cloudiness: 'Пасмурно',
      temperatureNight: -14,
      dayTemperature: -7,
      snow: true,
      rain: false
      },
      
      {
      date: 1580256756000,
      cloudiness: 'Пасмурно',
      temperatureNight: -17,
      dayTemperature: -10,
      snow: true,
      rain: true
      },
      
      {
      date: 1580343156000,
      cloudiness: 'Пасмурно',
      temperatureNight: -16,
      dayTemperature: -11,
      snow: false,
      rain: true
      }

      ];
  
    const daysOfWeek = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

    const formattedMethods = {

      formatDate: function(date) {
         // Форматируем дату
        const monthNumber = date.getMonth();
        const dateNumber = date.getDate();

        return `${dateNumber} ${months[monthNumber]}`;
      },

      formatDayOfWeek: function(date) {
        // Форматируем день недели
        const dayNumber = date.getDay();

        const nowDate = new Date();
        const currentDate = new Date(date);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }

        const current = currentDate.toLocaleString("ru", options);
        const now = nowDate.toLocaleString("ru", options);

        return current === now ? 'Сегодня' : daysOfWeek[dayNumber];
      },

      checkRainfall: function (rain, snow) {
         //Форматируем осадки
         if(!rain && !snow) {
          return 'Без осадков';
        }
        if(rain && snow) {
          return 'Снег с дождём';
        }
        if(rain && !snow) {
          return 'Дождь';
        }
        if(!rain && snow) {
          return  'Снег';
        }
      }
    };

    //Создаём новый объект с отформатированными данными
    const formattedDays = days.map(day => {
      const newDay = {};

      const dateOfDay = new Date(day.date);

      newDay.date = formattedMethods.formatDate(dateOfDay);
      newDay.dayOfWeek = formattedMethods.formatDayOfWeek(dateOfDay);
      newDay.cloudiness = day.cloudiness;
      newDay.dayTemperature = `днём ${day.dayTemperature} &#176;`;
      newDay.temperatureNight = `ночью ${day.temperatureNight} &#176;`; 
      newDay.rainfall = formattedMethods.checkRainfall(day.rain, day.snow);
  
      return newDay;
    });

    //Добавляем поле image для каждого дня
    formattedDays.forEach(day => { 
      
        if(day.cloudiness === "Пасмурно" && day.rainfall === "Без осадков") {
          day.image ='<img src="images/cloud.png" alt="Пасмурно">';
          return;
         } 
        if(day.cloudiness === "Ясно") {
          day.image ='<img src="images/sun.png" alt="Ясно">';
          return;
        }
        if(day.rainfall === "Снег с дождём") {
          day.image ='<img src="images/snow-and-rain.png" alt="Снег с дождём">';
          return;
        }
        if(day.rainfall === "Снег") {
          day.image = '<img src="images/snow.png" alt="Снег">';
          return;
        }
        if(day.rainfall === "Дождь") {
          day.image ='<img src="images/rain.png" alt="Дождь">';
        }
       
    });
  
    //Наполняем блоки данными из объекта
    const allBlocks = document.querySelectorAll('.block');
    let blockNum = 0;

    formattedDays.forEach(day => { 

      const elementCloud = allBlocks[blockNum].querySelector('.cloudiness');
      elementCloud.innerHTML = day.cloudiness;

      const elementDayTemp = allBlocks[blockNum].querySelector('.day-temperature');
      elementDayTemp.innerHTML = day.dayTemperature;
           
      const elementNightTemp = allBlocks[blockNum].querySelector('.night-temperature');
      elementNightTemp.innerHTML = day.temperatureNight; 

      const dayElement = allBlocks[blockNum].querySelector('.day-of-week');
      dayElement.innerHTML = day.dayOfWeek;

      const dateElement = allBlocks[blockNum].querySelector('.date');
      dateElement.innerHTML = day.date;

      const elementRain = allBlocks[blockNum].querySelector('.rain');
      elementRain.innerHTML = day.rainfall;

      const elementImg = allBlocks[blockNum].querySelector('.img');
      elementImg.innerHTML = day.image;

      blockNum++;

    });


    //Слайдер

    const buttonPrev = document.querySelector('.slider-btn_prev');
    const buttonNext = document.querySelector('.slider-btn_next');
    const elemSlider = document.querySelector('.slider');


    let position;  // задаёт позицию блока .slider
    const blockWidth = 180;
    const blocksCount = 4;

    //Ищем индекс объекта с dayOfWeek === "Сегодня" и смещаем слайдер
    const numToday = formattedDays.findIndex(day => day.dayOfWeek === "Сегодня");

    position = numToday >= 0 ? -(numToday * blockWidth) : 0;
    elemSlider.style.marginLeft = position + 'px';
    
        
    if(position === 0) {
        buttonPrev.disabled = true; 
    }


    buttonNext.addEventListener('click', () => {
        
        /* при уменьшении значения position блок .slider 
        сдвигается влево; когда до конца массива allBlocks
        остаётся 4 блока(blocksCount), кнопка 'Вперёд' 
        блокируется */
        
        position = position - blockWidth;
        if(position === -(allBlocks.length * blockWidth - blocksCount * blockWidth)) {
          buttonNext.disabled = true;  
        }
        elemSlider.style.marginLeft = position + 'px';
        if(position < 0) {
            buttonPrev.disabled = false; 
        }
        
    });

    
    buttonPrev.addEventListener('click', () => {
        
        /* при увеличении значения position
        блок .slider сдвигается вправо */
        
        position = position + blockWidth;
        if(position === 0) {
            buttonPrev.disabled = true; 
        }
        elemSlider.style.marginLeft = position + 'px';
        
        /* если до конца массива allBlocks остаётся больше
        чем 4 блока(blocksCount), кнопка 'Вперёд' 
        разблокируется */
        
        if(position > -(allBlocks.length * blockWidth - blocksCount * blockWidth)) {
          buttonNext.disabled = false;  
        }            
    });
