interface Env {
  API_URL: string;
  API_TOKEN: string;
  STOREFRONT_URL: string;
  STOREFRONT_TOKEN: string;
}

export const EnvVars: Env = {
  API_URL: 'http://localhost:1337/graphql',
  API_TOKEN:
    'a949117e1d3a7160a1ff5185bf6b7d7e8306a5f46a9f5c1fe95a4e07b18fac981409eff9f4163d714b709678c1ac3b51835e666b6ea065e6f3a18e8f540867d6f978bbdeb0aac2f727a6d8687abb26955a064313666b8b0fde3c8bf06896183286d6ec3db719be7d0310ef28300789256007c266f5bdc53fde0e9794f2e403c8',
  STOREFRONT_URL: 'https://boxxerworld-dev-2022.myshopify.com/api/2022-10/graphql.json',
  STOREFRONT_TOKEN: '76bf6996309ef6cce6b5f6c5e6dca0fe',
};
