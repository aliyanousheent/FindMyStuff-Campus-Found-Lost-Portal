// Replace this with your Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyAo-zDHdbxTWwmoW2hVoBgMne6B14kUnQs",
    authDomain: "findmystuff-fedac.firebaseapp.com",
    projectId: "findmystuff-fedac",
    storageBucket: "findmystuff-fedac.firebasestorage.app",
    messagingSenderId: "129985105045",
    appId: "1:129985105045:web:34f5b9f29dc0a920f99f9c",
    measurementId: "G-NTSWSKCL4B"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// DOM elements
const addItemForm = document.getElementById('addItemForm');
const itemList = document.getElementById('itemList');
const showLost = document.getElementById('showLost');
const showFound = document.getElementById('showFound');

let currentFilter = 'lost'; // default filter

// Add item to Firestore
addItemForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('itemName').value;
  const type = document.getElementById('itemType').value;

  db.collection('items').add({
    name,
    type,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    addItemForm.reset();
  });
});

// Display items in real-time
function displayItems(filter) {
  itemList.innerHTML = '';
  db.collection('items')
    .orderBy('timestamp', 'desc')
    .onSnapshot((snapshot) => {
      itemList.innerHTML = '';
      snapshot.docs.forEach(doc => {
        const item = doc.data();
        if(item.type === filter){
          const li = document.createElement('li');
          li.textContent = `${item.name} (${item.type})`;
          itemList.appendChild(li);
        }
      });
    });
}

// Filter buttons
showLost.addEventListener('click', () => {
  currentFilter = 'lost';
  displayItems(currentFilter);
});

showFound.addEventListener('click', () => {
  currentFilter = 'found';
  displayItems(currentFilter);
});

// Initially show lost items
displayItems(currentFilter);
