export default [
   'strapi::logger',
   'strapi::errors',
   'strapi::security',
   {
      name: 'strapi::cors',
      config: {
         origin: [
            'https://www.arpanbhandari.com.np',
            'https://arpanbhandari.com.np',
            'http://localhost:3000',
         ],
         methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
         headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
         keepHeaderOnError: true,
      },
   },
   'strapi::poweredBy',
   'strapi::query',
   'strapi::body',
   'strapi::session',
   'strapi::favicon',
   'strapi::public',
];
