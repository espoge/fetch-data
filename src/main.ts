class Api {
  async #getData(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }

  async #handleResponse(promise: Promise<any>): Promise<[Error | null, any?]> {
    try {
      const data = await promise;
      return [null, data];
    } catch (err) {
      return [err as Error];
    }
  }

  public async fetch(url: string): Promise<[Error | null, boolean, any?]> {
    const [error, data] = await this.#handleResponse(this.#getData(url));
    return [error, data];
  }
}
