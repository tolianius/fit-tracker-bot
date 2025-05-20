export async function fetchProduct(barcode: string) {
  const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);

  if (!res.ok) {
    throw new Error('Ошибка запроса к Open Food Facts');
  }

  const data = await res.json();

  if (data.status === 0) {
    return null;
  }

  return data.product;
}
