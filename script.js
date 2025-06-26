// Récupérer les éléments DOM
const header = document.getElementById('header');
const daysList = document.getElementById('days');
const weekdaysList = document.getElementById('weekdays');
const datetime = document.getElementById('datetime');

// Tableau des noms des jours de la semaine
const weekdays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

// Fonction pour mettre à jour le calendrier
function updateCalendar() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currentDay = currentDate.getDate();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes().toString().padStart(2, '0');

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    // Effacer la liste des jours de la semaine et des jours du mois
    weekdaysList.innerHTML = '';
    daysList.innerHTML = '';

    // Ajouter les jours de la semaine
    weekdays.forEach(dayName => {
        const weekday = document.createElement('li');
        weekday.className = 'weekday';
        weekday.textContent = dayName;
        weekdaysList.appendChild(weekday);
    });

    // Ajouter les jours vides avant le premier jour du mois
    for (let i = 0; i < (firstDay.getDay() || 7) - 1; i++) {
        const emptyDay = document.createElement('li');
        emptyDay.className = 'day empty';
        daysList.appendChild(emptyDay);
    }

    // Ajouter les jours du mois
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const day = document.createElement('li');
        day.className = 'day';
        day.innerHTML = `<div class="day-content">${i}</div>`;

        // Mettre en surbrillance le jour actuel
        if (currentYear === currentDate.getFullYear() && currentMonth === currentDate.getMonth() && i === currentDay) {
            day.classList.add('today');
        }

        // Ajouter un événement de clic pour afficher la date sélectionnée
        day.addEventListener('click', () => {
            if (currentMonth === 11 && i === 25) {
                alert(`Joyeux Noël !\nDate sélectionnée: ${i}/${currentMonth + 1}/${currentYear} ${currentHour}:${currentMinute}`);
            } else {
                alert(`Date sélectionnée: ${i}/${currentMonth + 1}/${currentYear} ${currentHour}:${currentMinute}`);
            }
        });

        daysList.appendChild(day);
    }

    // Mettre à jour l'en-tête avec la date actuelle
    updateHeader(currentDate);

    // Mettre à jour l'heure et les minutes
    updateDatetime(currentDate);
}

// Fonction pour mettre à jour l'en-tête avec la date actuelle
function updateHeader(currentDate) {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currentDay = currentDate.getDate();

    // Renommer le calendrier en "Calendrier de l'Avent" uniquement en décembre
    if (currentMonth === 11) {
        if (currentDay === 25) {
            header.textContent = "Joyeux Noël !";
        } else {
            header.textContent = `Calendrier de l'Avent - ${currentDay}/${currentMonth + 1}/${currentYear}`;
        }
    } else {
        header.textContent = `${currentDay}/${currentMonth + 1}/${currentYear}`;
    }
}

// Fonction pour mettre à jour l'heure et les minutes
function updateDatetime(currentDate) {
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes().toString().padStart(2, '0');

    datetime.textContent = `${currentHour}:${currentMinute}`;
}

// Mettre à jour le calendrier initialement
updateCalendar();

// Rafraîchir la page chaque seconde
setInterval(updateCalendar, 1000);
