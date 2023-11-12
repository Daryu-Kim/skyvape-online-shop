export function showSuccessToast(msg: string) {
  //@ts-ignore
  $nuxt.$toast.success(msg);
}

export function showErrorToast(msg: string) {
  //@ts-ignore
  $nuxt.$toast.error(msg);
}

export function showWarningToast(msg: string) {
  //@ts-ignore
  $nuxt.$toast.warning(msg);
}

export function showInfoToast(msg: string) {
  //@ts-ignore
  $nuxt.$toast.info(msg);
}

export function clearAllToast() {
  //@ts-ignore
  $nuxt.$toast.clear();
}
