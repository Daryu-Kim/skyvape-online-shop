export default async function({ app }) {
  if (process.client) {
    const iamportScript = document.createElement('script');
    iamportScript.src = 'https://cdn.iamport.kr/v1/iamport.js';
    iamportScript.type = 'text/javascript';
    document.head.appendChild(iamportScript);
  }
}
