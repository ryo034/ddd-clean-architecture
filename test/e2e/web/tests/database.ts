import { readFileSync } from "fs";
import { createConnection } from "mysql2/promise";
import { dbConfig } from "./config";
import { parse } from "csv-parse/sync";

const targetTables = [
	"users"
];

export const setupDB = async () => {
	const connection = await getConnection();
	for (const table of targetTables) {
		await insertInitData(connection, table);
	}
	await connection.end();
};

export const clearDB = async () => {
	const connection = await getConnection();
	for (const table of [...targetTables].reverse()) {
		await deleteTableData(connection, table);
	}
	await connection.end();
};

const getConnection = async () => {
	return createConnection(dbConfig);
};

const deleteTableData = async (connection, tableName) => {
	const csv = parse(readFileSync(`./setup/database/${tableName}.csv`)) as string[];
	const targetPMKeys = csv.map((v) => v[0]);
	const clearAuthIncrementQuery = `ALTER TABLE \`${tableName}\` AUTO_INCREMENT=1;`;
	await connection.query(clearAuthIncrementQuery, [targetPMKeys]);
	const query = `DELETE FROM \`${tableName}\`;`;
	await connection.query(query, [targetPMKeys]);
};

const insertInitData = async (connection, tableName) => {
	const csv = parse(readFileSync(`./setup/database/${tableName}.csv`)) as string[];
	if (csv.length > 1) {
		const query = `INSERT INTO \`${tableName}\` VALUES ?`;
		await connection.query(query, [csv.slice(1)]);
	}
};
