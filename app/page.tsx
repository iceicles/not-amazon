'use client';
export default function Home() {
  const fetchProducts = async () => {
    const res = await fetch('http://localhost:4000/api/v1/products');
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <button className='p-4' onClick={() => fetchProducts()}>
        fetch products
      </button>
    </div>
  );
}
