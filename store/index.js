import {initializeApp} from "firebase/app";
import {firebaseConfig} from "~/scripts/Firebase";

export const actions = {
  nuxtServerInit(vuexContext, context) {
    initializeApp(firebaseConfig);
  }
}
