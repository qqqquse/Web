type Callback<T> = (data: T) => void;

export class Ajax {
  post<T>(url: string, callback: Callback<T>): void {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            const data = JSON.parse(xhr.responseText) as T;
            callback(data);
          } catch (e) {
            console.error('Ошибка парсинга JSON:', e);
          }
        } else {
          console.error('Ошибка запроса:', xhr.status, xhr.statusText);
        }
      }
    };

    xhr.send();
  }
}

export const ajax = new Ajax();