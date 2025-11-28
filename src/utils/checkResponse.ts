export function checkResponse(response: Response): Promise<any> {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(new Error(`Ошибка ${response.status}`));
}
