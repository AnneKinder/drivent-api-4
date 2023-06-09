// import dotenv from 'dotenv';
// import dotenvExpand from 'dotenv-expand';

// export function loadEnv() {
//   const path =
//     process.env.NODE_ENV === 'test'
//       ? '.env.test'
//       : process.env.NODE_ENV === 'development'
//       ? '.env.development'
//       : '.env';

//   const currentEnvs = dotenv.config({ path });
//   dotenvExpand.expand(currentEnvs);
// }

import dotenv from 'dotenv';

export function loadEnv() {
  let path = '.env';

  if (process.env.NODE_ENV === 'test') {
    path = '.env.test';
  }

  dotenv.config({ path });
}
