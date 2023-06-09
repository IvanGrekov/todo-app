import { Sequelize, DataTypes, Model } from 'sequelize';

import { ITodo } from '../../types';

const sequelize = new Sequelize('postgres', 'postgres', 'Cosonic56', {
    host: 'localhost',
    dialect: 'postgres',
});

const TodoModel = sequelize.define<Model<ITodo>>(
    'Todo',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: 'todos',
        createdAt: false,
        updatedAt: false,
    },
);

export default TodoModel;
