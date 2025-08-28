self.addEventListener('push', function(event) {
  if (event.data) {
    const data = event.data.json();
    const title = data.notification?.title || "Thông báo";
    const options = {
      body: data.notification?.body,
      icon: data.notification?.icon,
      image: data.notification?.image, 
      data: data.data
    };

    // Hiện thông báo hệ thống
    event.waitUntil(self.registration.showNotification(title, options));

    // Gửi về tab đang mở để UI hiển thị
    event.waitUntil(
      self.clients.matchAll({ includeUncontrolled: true, type: 'window' })
        .then(clients => {
          clients.forEach(client => {
            client.postMessage({
              type: 'NEW_NOTIFICATION',
              payload: data
            });
          });
        })
    );
  }
});

