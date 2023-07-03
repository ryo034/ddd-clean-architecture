import { isLocal, firebaseConfig } from "./config";
import { initializeApp } from "firebase-admin/app";
import { MultiFactorCreateSettings, getAuth } from "firebase-admin/auth";
import { readFileSync } from "fs";


const setupForEmulator = () => {
	process.env.FIREBASE_AUTH_EMULATOR_HOST = "localhost:9099";
};

if (isLocal) {
	setupForEmulator();
}

const firebase = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebase);

export const clearFirebaseAuthUsers = async () => {
	const users = await firebaseAuth.listUsers();
	await firebaseAuth.deleteUsers(users.users.map((user) => user.uid));
}
export const clearFirebase = async () => {
	Promise.all([clearFirebaseAuthUsers()]);
};

export const setupFirebase = async () => {
	const jsonData = JSON.parse(
		readFileSync("./setup/firebase/auth/users.json", "utf8").toString(),
	);

	const us = jsonData.users as unknown[];

	for (let idx = 0; idx < us.length; idx++) {
		let mfa: MultiFactorCreateSettings | null = null
		if (us[idx]['mfaInfo']) {
			mfa = {
				enrolledFactors: []
			}
			for (const mfaInfo of us[idx]['mfaInfo']) {
				mfa.enrolledFactors.push({
					displayName: "",
					factorId: "phone",
					phoneNumber: mfaInfo["phoneInfo"],
				})
			}
		}
		await firebaseAuth.createUser({
			uid: us[idx]["localId"],
			email: us[idx]["email"],
			emailVerified: us[idx]["emailVerified"],
			phoneNumber: us[idx]["phoneNumber"],
			password: "Test123",
			displayName: us[idx]["displayName"],
			photoURL: us[idx]["photoURL"],
			disabled: us[idx]["disabled"],
			multiFactor: mfa,
		});
	}
};
