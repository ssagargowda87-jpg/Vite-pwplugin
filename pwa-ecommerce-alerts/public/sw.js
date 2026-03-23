// public/sw.js

// 1️⃣ Listen for background push events
self.addEventListener('push', function (event) {
  console.log('[Service Worker] Push Message Received.');

  // Default payload if server sends an empty message
  let pushData = {
    title: 'Flash Deal!',
    body: 'A new deal just dropped. Click to view.',
    image: 'https://cdn-icons-png.flaticon.com/512/1163/1163337.png'
  };

  // 2️⃣ Extract JSON payload sent from server
  if (event.data) {
    try {
      pushData = event.data.json();
    } catch (e) {
      pushData.body = event.data.text();
    }
  }

  // 3️⃣ Configure the notification appearance
  const options = {
    body: pushData.body,
    icon: pushData.image,
    badge: 'https://cdn-icons-png.flaticon.com/512/1163/1163337.png', // Android status bar icon

    data: {
      url: 'http://localhost:5173' // URL to open when notification is clicked
    }
  };

  // 4️⃣ Show the notification
  event.waitUntil(
    self.registration.showNotification(pushData.title, options)
  );
});


// 5️⃣ Handle notification click
self.addEventListener('notificationclick', function (event) {
  event.notification.close(); // Close the notification

  // Open the application in a new browser tab
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
