import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
import {showErrorToast, showSuccessToast} from "~/functions/Toast";

export const auth = getAuth();
export async function loginEmailAndPasswordAPI(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential);
    if (userCredential) return userCredential.user;
  } catch (firebaseError) {
    checkAuthErrorMessage(firebaseError);
    return null;
  }
}

export async function resetPasswordAPI(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    showSuccessToast("인증 이메일을 보냈습니다!\n메일을 확인해주세요!");
    return true;
  } catch (firebaseError) {
    checkAuthErrorMessage(firebaseError);
    return false;
  }
}

export function checkAuthErrorMessage(error: any) {
  console.error(error.code);
  switch (error.code) {
    case "auth/invalid-email":
      showErrorToast("이메일 형식이 맞지 않습니다!");
      break;
    case "auth/missing-password":
      showErrorToast("비밀번호를 입력해주십시오!");
      break;
    case "auth/invalid-login-credentials":
      showErrorToast("아이디와 비밀번호를 확인해주세요!");
      break;
    case "auth/too-many-requests":
      showErrorToast("과다한 로그인 시도입니다!");
      break;
    case "auth/missing-email":
      showErrorToast("이메일이 입력되지 않았습니다!");
      break;
    default:
      showErrorToast("알 수 없는 오류입니다!")
      break;
  }
}
