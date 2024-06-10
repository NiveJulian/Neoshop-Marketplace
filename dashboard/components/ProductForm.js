import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { ReactSortable } from "react-sortablejs";
import { FUNCTIONS_CONFIG_MANIFEST } from "next/dist/shared/lib/constants";
import Image from "next/image";

export default function ProductForm({
    _id,
    title:existingTitle,
    description:existingDescription,
    price:existingPrice,
    images:existingImages,
    category: assingnedCategory,
    properties: assingnedProperties,
    }){
    const [title,setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [category, setCategory] = useState(assingnedCategory || '')
    const [productProperties, setProductProperties] = useState(assingnedProperties || {})
    const [price,setPrice] = useState(existingPrice || '');
    const [images, setImages] = useState(existingImages || []);
    const [goToProduct,setGoToProduct] = useState(false);
    const [isUploading, setIsUploading]= useState(false);
    const [categories, setCategories] = useState([])
    const router = useRouter()
    useEffect(()=> {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        })
    },[])
    async function createProduct(ev){
        ev.preventDefault();
        const data = {
            title,description,price,images,category,properties:productProperties,
        };
        if(_id){
            //update
            await axios.put('/api/products', {...data,_id});
        }else{
            //create
            await axios.post('/api/products', {...data});
            setGoToProduct(true)
        }
        
        setGoToProduct(true)
    }
    if(goToProduct){
        router.push('/products')
    }
    async function uploadImages(ev){
        const files = ev.target.files;
        if(files.length > 0){
            setIsUploading(true)
            const data = new FormData();
            for (const file of files) {
                data.append('file', file)
            }
            const res = await axios.post('/api/upload', data)

            setImages(oldImages => {
                return [...oldImages, ...res.data.links];
            })
            setIsUploading(false)
        }
    }
    function updateImagesOrder(images){
        setImages(images)
    }
    function setProductProp(propName, value){
        setProductProperties(prev => {
            const newProductProps = {...prev};
            newProductProps[propName] = value;
            return newProductProps;
        })
    }

    const propertiesToFill = [];
    if(categories.length > 0 && category){
        let catInfo = categories.find(({_id}) => _id === category)
        propertiesToFill.push(...catInfo.properties)
        while(catInfo?.parent?._id){
            const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id)
            propertiesToFill.push(...parentCat.properties);
            catInfo = parentCat;
        }
    }

    return(
            <form onSubmit={createProduct}>
                <label>Product Name</label>
                <input 
                    type="text" 
                    placeholder="Product name" 
                    value={title} 
                    onChange={ev => setTitle(ev.target.value)}/>
                <label>Category</label>
                <select 
                        value={category}
                        onChange={ev => setCategory(ev.target.value)}
                        >
                    <option value="">
                            Uncategorized
                    </option>
                    {categories.length > 0 && categories.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>
                {propertiesToFill.length > 0 && propertiesToFill.map(p => (
                    <div className="" key={p._id}>
                        <div>
                            <label>{p.name[0]+p.name.substring(1)}</label>
                            <select value={productProperties[p.name]} 
                                    onChange={ev => 
                                        setProductProp(p.name, ev.target.value)
                                        }>
                                {p.values.map(val => (
                                    <option key={val._id} value={val}>{val}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}
                <label>
                    Photos
                </label>
                <div className="mb-2 flex flex-wrap gap-1">
                   <ReactSortable 
                    list={images} 
                    className="flex flex-wrap gap-1"
                    setList={updateImagesOrder}>
                    {!!images.length && images.map(link => (
                        <div key={link} className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
                            <Image src={link} alt="" className="rounded-lg" />
                        </div>
                    ))}
                   </ReactSortable>
                    {isUploading && (
                        <div className="h-24 flex items-center">
                            <Spinner />
                        </div>
                    )}
                    <label className="w-24 h-24 cursor-pointer text-center text-sm text-primary flex flex-col items-center justify-center rounded-sm bg-white gap-1 shadow-sm border border-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>

                        <div>Add image</div>
                        <input 
                            type="file" 
                            onChange={uploadImages} 
                            className="hidden"/>
                    </label>
                </div>
                
                <label>Description</label>
                <textarea 
                    placeholder="Description"
                    value={description}
                    onChange={ev => setDescription(ev.target.value)}
                />

                <label>Price in USD</label>
                <input 
                    type="text" 
                    placeholder="Price"
                    value={price}
                    onChange={ev => setPrice(ev.target.value)}
                />
                <button 
                    type="submit" 
                    className="btn-primary">
                    Save
                </button>
            </form>
    )
}