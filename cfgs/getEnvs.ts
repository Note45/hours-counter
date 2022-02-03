export const envPrototypes = {
  PORT: Number(),
  DB_HOST: String(),
  DB_NAME: String(),
  DB_USER: String(),
  DB_PASS: String(),
  DB_PORT: String(),
  EXP_TIME_JWT_TOKEN: String(),
  JWT_TOKEN_SECRET: String(),
};

type IEnv = typeof envPrototypes;

export const getEnvs = (env: Record<string, string>) => {
  const envPrototypeKeys = Object.keys(envPrototypes);
  const envObj = {} as IEnv;
  const missingEnvs = [];
  const wrongTypeEnvs = {};

  envPrototypeKeys.forEach((k) => {
    const envValue = env[k];

    if (!envValue) {
      missingEnvs.push(k);
    } else if (typeof envPrototypes[k] === 'number') {
      const numEnvValue = Number(envValue);
      if (Number.isNaN(numEnvValue)) {
        wrongTypeEnvs[k] = { expected: 'Number' };
      } else {
        envObj[k] = numEnvValue;
      }
    } else if (typeof envPrototypes[k] === 'boolean') {
      if (
        envPrototypes[k] === '0' ||
        envPrototypes[k] === '1' ||
        envPrototypes[k] === 'false' ||
        envPrototypes[k] === 'true'
      ) {
        envObj[k] = Boolean(envValue);
      } else {
        wrongTypeEnvs[k] = { expected: 'Boolean' };
      }
    } else {
      envObj[k] = envValue;
    }
  });
  if (missingEnvs.length > 0) {
    throw new Error(
      `As seguintes vars de ambiente não foram definidas: [${missingEnvs}]`,
    );
  }
  const wrongTypeEnvKeys = Object.keys(wrongTypeEnvs);
  if (wrongTypeEnvKeys.length > 0) {
    throw new Error(
      `As seguintes vars de ambiente não podem ser convertidas para o tipo desejado: ${JSON.stringify(
        wrongTypeEnvs,
      )}`,
    );
  }
  return envObj;
};
