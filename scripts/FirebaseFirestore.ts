import {showErrorToast, showSuccessToast} from "~/scripts/Toast";
import {auth, deleteCurrentUserAPI} from "~/scripts/FirebaseAuth";
import {getFirestore, doc, setDoc, getDoc, getDocs, collection, DocumentData, updateDoc, arrayUnion} from "firebase/firestore";
import {app} from "~/scripts/Firebase";

export const firestore = getFirestore(app);

export async function readDocumentDataOnce(collection: string, document: string) {
  console.log(collection, document)
  try {
    const documentData = await getDoc(doc(firestore, collection, document));

    if (documentData.exists()) {
      return documentData.data();
    } else {
      showErrorToast("불러올 데이터가 없습니다!");
      return false;
    }
  } catch (firebaseError) {
    console.log(firebaseError)
    checkFirestoreErrorMessage(firebaseError);
    return false;
  }
}

export async function readDocumentsDataOnce(col: string) {
  try {
    const documentsData = await getDocs(collection(firestore, col));

    if (!documentsData.empty) {
      let datas: DocumentData[] = [];
      documentsData.forEach((doc) => {
        datas.push(doc.data());
      });
      return datas;
    } else {
      showErrorToast("불러올 데이터가 없습니다!");
      return false;
    }
  } catch (firebaseError) {
    checkFirestoreErrorMessage(firebaseError);
    return false;
  }
}

export async function addToCartORPurchaseAPI(data: never[], isRedirectPurchase: boolean) {
  try {
    data.forEach(async(item: [{}]) => {
      await updateDoc(doc(firestore, "USER", auth.currentUser?.uid as string), {
        userCart: arrayUnion(item)
      });
    });

    if (isRedirectPurchase) {
      return true;
    } else {
      showSuccessToast("상품을 장바구니에 담았습니다!");
      return false;
    }
  } catch (firebaseError) {
    checkFirestoreErrorMessage(firebaseError);
    return false;
  }
}

export async function createEmailUserDataAPI(
  email: string,
  postalCode: string,
  address1: string,
  address2: string,
  invitor: string,
  name: string,
  phoneNumber: string
) {
  try {
    // @ts-ignore
    await setDoc(doc(firestore, "USER", auth.currentUser?.uid), {
      userID: auth.currentUser?.uid,
      userName: name,
      userPhoneNumber: phoneNumber,
      userEmail: email,
      userPostalCode: postalCode,
      userAddress1: address1,
      userAddress2: address2,
      userInvitor: invitor,
      isAcceptedAlert: JSON.parse(sessionStorage.getItem("ACCEPT_ALERT") as string),
      userCart: [],
      userQNA: [],
      userReview: [],
      userCoupon: [],
      userPoint: 0,
      isAdmin: false,
      userBuyedList: []
    });
    sessionStorage.removeItem("ACCEPT_ALERT");
    return true;
  } catch (firebaseError) {
    checkFirestoreErrorMessage(firebaseError);
    await deleteCurrentUserAPI("error");
    return false;
  }
}

export function checkFirestoreErrorMessage(error: any) {
  console.error(error);
  switch (error.code) {
    default:
      showErrorToast("알 수 없는 오류입니다!");
      break;
  }
}

export async function uploadProductDataAPI(data: {}) {
  try {
    // @ts-ignore
    await setDoc(doc(firestore, "SETTING/PRODUCTS/PRODUCT_TEST_LIST", data.productId), data);
    return true;
  } catch (firebaseError) {
    checkFirestoreErrorMessage(firebaseError);
    return false;
  }
}

export async function uploadHotDealProductDataAPI(data: {}) {
  try {
    // @ts-ignore
    await setDoc(doc(firestore, "SETTING/HOTDEAL_PRODUCTS/HOTDEAL_PRODUCT_TEST_LIST", data.productId), data);
    return true;
  } catch (firebaseError) {
    checkFirestoreErrorMessage(firebaseError);
    return false;
  }
}
