const fetchNextAPI = async <T>(
   url: string,
   revalidateTime: number = 0
): Promise<T> => {
   const response = await fetch(
      `${process.env.NEXT_PUBLIC_WEBSITE_URL}${url}`,
      {
         next: {
            revalidate: revalidateTime,
         },
      }
   );
   const data = await response.json();
   return data.data as T;
};

export default fetchNextAPI;
