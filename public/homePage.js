"use strict"

// Выход из личного кабинета

const logoutButton = new LogoutButton();

logoutButton.action = () => {
  ApiConnector.logout(responce => {
    if (responce.success) {
      location.reload();
    }
  })
};

// Получение информации о пользователе

ApiConnector.current(responce => {
  if (responce.success) {
    ProfileWidget.showProfile(responce.data);
  }
});

// Получение текущих курсов валюты

const ratesBoard = new RatesBoard();

function getStocksFromServer() {
  ApiConnector.getStocks(responce => {
    if (responce.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(responce.data);
    }
  });
}

getStocksFromServer();
setInterval(getStocksFromServer, 60000);

// Операции с деньгами

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
  ApiConnector.addMoney(data, responce => {
    if (responce.success) {
      ProfileWidget.showProfile(responce.data);
      moneyManager.setMessage(true, 'Баланс успешно пополнен');
    } else {
      moneyManager.setMessage(false, responce.error);
    }
  });
};

moneyManager.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data, responce => {
    if (responce.success) {
      ProfileWidget.showProfile(responce.data);
      moneyManager.setMessage(true, 'Конвертирование успешно выполнено');
    } else {
      moneyManager.setMessage(false, responce.error);
    }
  });
};

moneyManager.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, responce => {
    if (responce.success) {
      ProfileWidget.showProfile(responce.data);
      moneyManager.setMessage(true, 'Перевод успешно выполнен');
    } else {
      moneyManager.setMessage(false, responce.error);
    }
  });
};

// Работа с избранным

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(responce => {
  if (responce.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(responce.data);
    moneyManager.updateUsersList(responce.data);
  }
});

favoritesWidget.addUserCallback = data => {
  ApiConnector.addUserToFavorites(data, responce => {
    if (responce.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(responce.data);
      moneyManager.updateUsersList(responce.data);
      favoritesWidget.setMessage(true, 'Пользователь добавлен в избранное');
    } else {
      favoritesWidget.setMessage(false, responce.error);
    }
  });
};

favoritesWidget.removeUserCallback = data => {
  ApiConnector.removeUserFromFavorites(data, responce => {
    if (responce.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(responce.data);
      moneyManager.updateUsersList(responce.data);
      favoritesWidget.setMessage(true, 'Пользователь удален из избранного');
    } else {
      favoritesWidget.setMessage(false, responce.error);
    }
  });
};