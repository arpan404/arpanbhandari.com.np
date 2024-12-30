'use server';

const sendContactMessage = async (data: {
  name: string;
  email: string;
  contact?: string;
  subject: string;
  message: string;
  user_details: string;
}): Promise<boolean> => {
  try {
    const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL + '/api/contacts';
    const token = process.env.NEXT_API_TOKEN;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        data: data,
      }),
    });
    console.log(response);
    if (!response.ok) {
      return false;
    }
    return true;
  } catch (error: unknown) {
    console.error(error);
    return false;
  }
};
export default sendContactMessage;
