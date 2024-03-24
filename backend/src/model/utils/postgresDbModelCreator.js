import httpStatus from 'http-status';
import { postgresDB } from '../config/database.js';
import ApiError from '../utils/ApiError.js';

function PostgresModelCreator(name) {
  this.tableName = name;
}

PostgresModelCreator.prototype.executeQuery = async function (query, values) {
  try {
    const dbResponse = await postgresDB.query(query, values);
    return { data: dbResponse.rows, count: dbResponse.rowCount };
  } catch (error) {
    console.log(`error occurred in executing query ${error}`);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'error occurred in executing query');
  }
};

PostgresModelCreator.prototype.find = async function (params) {
  try {
    const {
      where = {}, attributes = [], limit = 0, offset = 0, orderby = '', sortorder = '',
    } = (params || {});
    let findQuery = `SELECT ${attributes?.length ? attributes.join(',') : '*'} FROM ${this.tableName}`;
    const keys = Object.keys(where);
    const values = [];
    if (keys.length) {
      findQuery += ' WHERE ';
      keys.forEach((key, index) => {
        findQuery += ` ${key} = $${index + 1}`;
        if (index < keys.length - 1) {
          findQuery += ' and ';
        }
        values.push(where[key]);
      });
    }
    if (orderby) {
      findQuery += ` ORDER BY ${orderby} `;
    }

    if (sortorder) {
      findQuery += ` ${sortorder} `;
    }

    if (limit) {
      findQuery += ` LIMIT ${limit} `;
    }
    if (offset) {
      findQuery += ` OFFSET ${offset} `;
    }
    const dbResponse = await postgresDB.query(findQuery, values);
    return {
      data: dbResponse.rows,
      count: dbResponse.rowCount,
    };
  } catch (error) {
    console.log(`error occurred in executing find query ${error}`);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'error occurred in executing find query');
  }
};

PostgresModelCreator.prototype.insert = async function (params) {
  try {
    let insertQuery = `INSERT INTO  ${this.tableName} `;
    const keys = Object.keys(params);
    const values = [];
    if (keys.length) {
      let valuesString = '';
      keys.forEach((key, index) => {
        valuesString += `$${index + 1}`;
        if (index < keys.length - 1) {
          valuesString += ',';
        }
        values.push(params[key]);
      });
      insertQuery += `(${keys.join(',')}) VALUES(${valuesString}) `;
    }

    insertQuery += ' RETURNING *; ';

    const dbResponse = await postgresDB.query(insertQuery, values);
    return {
      data: dbResponse?.rows || [],
      count: dbResponse?.rowCount || 0,
    };
  } catch (error) {
    console.log(`error occurred in executing insert query ${error}`);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'error occurred in executing insert query');
  }
};

PostgresModelCreator.prototype.update = async function (params) {
  try {
    const { where = {}, set = {} } = (params || {});
    let updateQuery = `UPDATE ${this.tableName}`;
    const whereKeys = Object.keys(where);
    const setKeys = Object.keys(set);
    const values = [];
    let valueIndex = 1;

    if (setKeys.length) {
      updateQuery += ' SET ';
      setKeys.forEach((key, index) => {
        updateQuery += ` ${key} = $${valueIndex}`;
        if (index < setKeys.length - 1) {
          updateQuery += ',';
        }
        values.push(set[key]);
        valueIndex += 1;
      });
    }

    if (whereKeys.length) {
      updateQuery += ' WHERE ';
      whereKeys.forEach((key, index) => {
        updateQuery += ` ${key} = $${valueIndex}`;
        if (index < whereKeys.length - 1) {
          updateQuery += ' and ';
        }
        values.push(where[key]);
        valueIndex += 1;
      });
    }

    updateQuery += ' RETURNING *; ';

    const dbResponse = await postgresDB.query(updateQuery, values);

    return {
      data: dbResponse?.rows || [],
      count: dbResponse?.rowCount || 0,
    };
  } catch (error) {
    console.log(`error occurred in executing update query ${error}`);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'error occurred in executing update query');
  }
};

PostgresModelCreator.prototype.delete = async function (params) {
  try {
    const { where = {} } = (params || {});
    let deleteQuery = `DELETE FROM ${this.tableName}`;
    const keys = Object.keys(where);
    const values = [];
    if (keys.length) {
      deleteQuery += ' WHERE ';
      keys.forEach((key, index) => {
        deleteQuery += ` ${key} = $${index + 1}`;
        if (index < keys.length - 1) {
          deleteQuery += ' and ';
        }
        values.push(where[key]);
      });
    }

    const dbResponse = await postgresDB.query(deleteQuery, values);
    return {
      count: dbResponse.rowCount,
    };
  } catch (error) {
    console.log(`error occurred in executing delete query ${error}`);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'error occurred in executing delete query');
  }
};

export default PostgresModelCreator;
