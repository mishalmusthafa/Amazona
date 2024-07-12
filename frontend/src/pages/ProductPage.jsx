import { useParams } from 'react-router-dom';

function ProductPage() {
    const params = useParams();
    return <h1>{params.slug}</h1>;
}

export default ProductPage;
