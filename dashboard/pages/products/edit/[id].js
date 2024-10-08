import Layout from "../../../components/Layout";
import ProductForm from "../../../components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProductPage(){
    const [productInfo, setProductInfo] = useState(null);
    const router = useRouter();
    const {id}= router.query;
    const {product}= router.query;
    useEffect(()=>{
        if(!product){
            return;
        }
            axios.get('https://neoshop-backend.vercel.app/product/id/'+product).then(response => {
            setProductInfo(response.data)
        })
    },[product])

    // console.log(productInfo)
    return (
        <Layout userId={id}>
            <h1>Edit Product</h1>
            {productInfo && (
                <ProductForm {...productInfo} />
            )}
        </Layout>
    )
}