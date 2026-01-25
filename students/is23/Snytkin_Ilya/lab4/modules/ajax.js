export class Ajax {
  get(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            const data = JSON.parse(xhr.responseText);
            callback(data);
          } catch (e) {
            callback({ error: { error_msg: 'Ответ не является JSON' } });
          }
        } else {
          callback({ error: { error_msg: `HTTP ${xhr.status}` } });
        }
      }
    };
  }
}

export const ajax = new Ajax();