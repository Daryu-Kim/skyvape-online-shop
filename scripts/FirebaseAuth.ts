import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  deleteUser
} from "firebase/auth"
import {showErrorToast, showSuccessToast} from "~/scripts/Toast";
import {app} from "~/scripts/Firebase";
import {createEmailUserDataAPI} from "~/scripts/FirebaseFirestore";

export const auth = getAuth(app);

export async function loginEmailAndPasswordAPI(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential);
    if (userCredential) return userCredential.user;
  } catch (firebaseError) {
    checkAuthErrorMessageAPI(firebaseError);
    return null;
  }
}

export async function joinEmailAndPasswordAPI(
  email: string,
  password: string,
  postalCode: string,
  address1: string,
  address2: string,
  invitor: string,
  name: string,
  phoneNumber: string
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (userCredential) {
      const isCreatedUserData = await createEmailUserDataAPI(
        email, postalCode, address1, address2, invitor, name, phoneNumber
      );
      if (isCreatedUserData) {
        return true;
      }
    }
  } catch (firebaseError) {
    checkAuthErrorMessageAPI(firebaseError);
    return false;
  }
}

export async function loginSocialAccountAPI(platform: string) {
  try {
    let provider: any;

    switch (platform) {
      case "facebook":
        provider = new FacebookAuthProvider();
        break;
      case "google":
        provider = new GoogleAuthProvider();
        break;
    }

    const userCredential = await signInWithPopup(auth, provider);
    if (userCredential) return userCredential.user;
  } catch (firebaseError) {
    checkAuthErrorMessageAPI(firebaseError);
    return false;
  }
}

// @ts-ignore
export async function loginFacebookAccountAPI() {
  try {
    const provider = new FacebookAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    if (userCredential) return userCredential.user;
  } catch (firebaseError) {
    checkAuthErrorMessageAPI(firebaseError);
    return false;
  }
}

export async function loginGoogleAccountAPI() {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    if (userCredential) return userCredential.user;
  } catch (firebaseError) {
    checkAuthErrorMessageAPI(firebaseError);
    return false;
  }
}

export async function resetPasswordAPI(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    showSuccessToast("인증 이메일을 보냈습니다!\n메일을 확인해주세요!");
    return true;
  } catch (firebaseError) {
    checkAuthErrorMessageAPI(firebaseError);
    return false;
  }
}

export function checkAuthErrorMessageAPI(error: any) {
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

export async function deleteCurrentUserAPI(type: string) {
  try {
    if (auth.currentUser) {
      switch (type) {
        case "self":
          showSuccessToast("회원 정보가 삭제되었습니다!");
          break;

      }
      await deleteUser(auth.currentUser);
    }
  } catch (firebaseError) {
    checkAuthErrorMessageAPI(firebaseError);
    return null;
  }
}
