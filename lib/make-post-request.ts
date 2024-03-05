interface Details {
  chat_id: string;
  text: string;
  firstname?: string;
  username?: string;
}

export const makePostRequest = async (url: string, details: Details) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });

    return response.json();
  } catch (e) {
    console.error(e);
  }
};
