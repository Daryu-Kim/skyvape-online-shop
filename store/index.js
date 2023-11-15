import {initializeApp} from "firebase/app";
import {firebaseConfig} from "~/scripts/Firebase";
import {readDocumentDataOnce} from "~/scripts/FirebaseFirestore";

export const actions = {
  nuxtServerInit(vuexContext, context) {
    initializeApp(firebaseConfig);
  }
};
