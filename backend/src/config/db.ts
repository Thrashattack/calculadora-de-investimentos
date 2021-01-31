import { Options } from 'sequelize';

export default {
  host: process.env.PGHOST as string,
  user: process.env.PGUSER as string,
  database: process.env.PGDATABASE as string,
  password: process.env.PGPASSWORD as string,
  port: Number.parseInt(process.env.PGPORT as string),
  params: {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: 'postgres',
    logging: false,
    timezone: '-04:00',
    pool: {
      max: 50,
      min: 0,
      acquire: 30000,
      idle: 20000,
    },
    define: {
      timestamps: false,
      underscored: true,
      defaultScope: {
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
            'created_at',
            'updated_at',
            'deletedAt',
            'deleted_at',
          ],
        },
      },
    },
  } as Options,
};
