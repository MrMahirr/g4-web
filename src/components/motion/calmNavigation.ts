/**
 * Kardeş sayfalar arası geçiş işareti (ör. hizmet detayında yan menüden başka hizmete geçiş).
 * Bağlantı tıklanınca hedef yol kaydedilir; o yolda açılan hero girişleri tam animasyon yerine
 * kısa bir belirme oynatır. İşaret ilk okumadan sonra temizlenir, başka yerden gelişte animasyon aynı kalır.
 * Yalnız istemcide yazılır; sunucu render'ında hep boştur.
 */
let calmPath: string | null = null;

export function markCalmNavigation(path: string) {
  calmPath = path;
}

export function isCalmNavigation(pathname: string) {
  return calmPath === pathname;
}

export function clearCalmNavigation(pathname: string) {
  if (calmPath === pathname) calmPath = null;
}
