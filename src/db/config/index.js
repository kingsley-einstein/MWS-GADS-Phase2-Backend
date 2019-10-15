import env from '../../env';

export default {
  development: {
    config: {
      define: {
        underscored: true
      },
      dialect: 'postgres'
    },
    url: env.db_dev
  },
  test: {
    config: {
      define: {
        underscored: true
      },
      dialect: 'postgres'
    },
    url: env.db_test
  },
  production: {
    config: {
      define: {
        underscored: true
      },
      dialect: 'postgres'
    },
    url: env.db_prod
  }
};
