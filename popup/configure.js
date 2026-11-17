// SPDX-FileCopyrightText: 2020 John Colagioia <john@colagioia.net>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

function saveOptions(e) {
  browser.storage.sync.set({
    dest: document.querySelector('#dest').value,
    isActive: document.querySelector('#on').checked.toString()
  });
  e.preventDefault();
}

function restoreOptions() {
  var storageItem = browser.storage.managed.get();
  storageItem.then((res) => {
    setOptions(res);
  });

  var gettingItem = browser.storage.sync.get();
  gettingItem.then((res) => {
    setOptions(res);
  });
}

function setOptions(store) {
  document.querySelector('#dest').value = store.dest;
  document.querySelector('#stored-dest').innerText = store.dest;
  document.querySelector(store.isActive === 'true' ? '#on' : '#off').checked = true;
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', saveOptions);
