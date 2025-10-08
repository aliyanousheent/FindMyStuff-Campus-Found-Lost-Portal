// Firebase config
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

let currentFilter = 'lost';

// Add item
addItemForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('itemName').value.trim();
  const type = document.getElementById('itemType').value;
  const location = document.getElementById('itemLocation').value.trim();
  const contact = document.getElementById('contactInfo').value.trim();

  if(!name || !type || !location || !contact) {
    alert('Please fill all fields!');
    return;
  }

  db.collection('items').add({
    name,
    type,
    location,
    contact,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

  addItemForm.reset();
});

// Display items
function displayItems(filter) {
  db.collection('items')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      itemList.innerHTML = '';
      snapshot.docs.forEach(doc => {
        const item = doc.data();
        if(item.type === filter) {
          const li = document.createElement('li');
          const date = item.timestamp ? item.timestamp.toDate().toLocaleString() : '';

          li.innerHTML = `
            <strong>${item.name}</strong> (${item.type})<br>
            Location: ${item.location}<br>
            Contact: ${item.contact}<br>
            Added: ${date}
          `;

          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Delete';
          deleteBtn.className = 'delete';
          deleteBtn.onclick = () => db.collection('items').doc(doc.id).delete();
          li.appendChild(deleteBtn);

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

// Initial display
displayItems(currentFilter);
