import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { GOOGLE_APPLICATION_CREDENTIALS } from "../utils/env";

const serviceAccount = JSON.parse(GOOGLE_APPLICATION_CREDENTIALS);

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: serviceAccount.project_id,
});

export const db = getFirestore(app, "default");
export const auth = admin.auth();
