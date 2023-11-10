import {initializeApp} from "firebase/app";
import {firebaseConfig} from "~/functions/Firebase";

export const actions = {
  nuxtServerInit(vuexContext, context) {
    initializeApp(firebaseConfig);
  }
}
